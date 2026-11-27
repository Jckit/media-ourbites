"""Generate new narration with the selected local Ourbites voice preset."""
from __future__ import annotations

import argparse
import json
import math
import re
import subprocess
import sys
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCAL_KEYS = ("cli", "model", "reference_audio", "reference_text", "ffmpeg")
PROCESSING_KEYS = ("tempo_scale", "pitch_scale", "noise_reduction_db", "noise_floor_db")
EMOTION_PATH = ROOT / "auditions/voice-emotion.json"


def narration_sections(text: str, max_words: int, max_sentences: int = 2) -> list[str]:
    """Pack complete sentences; never rewrite copy or cut a number mid-sentence."""
    if not text.strip():
        raise ValueError("Narration cannot be empty")
    sections = []
    for paragraph in re.split(r"\n\s*\n", text.strip()):
        paragraph = paragraph.strip()
        sentences = []
        start = 0
        for boundary in re.finditer(r'(?<=[.!?])\s+(?=[A-Z0-9“\"])', paragraph):
            prefix = paragraph[:boundary.start()]
            if re.search(r'\b(?:Mr|Mrs|Ms|Dr|Prof|Inc|Ltd|vs|e\.g|i\.e)\.$|(?:\b[A-Z]\.){2,}$', prefix):
                continue
            sentences.append(paragraph[start:boundary.start()])
            start = boundary.end()
        sentences.append(paragraph[start:])
        current = ""
        count = 0
        for sentence in sentences:
            sentence = " ".join(sentence.split())
            if len(sentence.split()) > max_words:
                raise ValueError(
                    f"Dense sentence exceeds {max_words} words: {sentence!r}. "
                    "Rewrite as shorter spoken sentences; keep the facts and numbers."
                )
            combined = f"{current} {sentence}".strip()
            if current and (len(combined.split()) > max_words or count >= max_sentences):
                sections.append(current)
                current = sentence
                count = 1
            else:
                current = combined
                count += 1
        if current:
            sections.append(current)
    return sections


def join_sections(paths: list[Path], output: Path, pause_ms: int) -> list[dict]:
    """Trim only quiet edges, retain 40ms handles, and insert a measured join gap.

    Interior pauses are preserved. RMS detection is deliberately conservative and
    does not claim to detect bad pronunciation or robotic performance.
    """
    timings = []
    cursor = 0
    with wave.open(str(output), "wb") as writer:
        format_key = None
        for index, path in enumerate(paths):
            with wave.open(str(path), "rb") as reader:
                key = (reader.getnchannels(), reader.getsampwidth(), reader.getframerate())
                if key[0] != 1 or key[1] not in (2, 3, 4):
                    raise ValueError("Expected mono 16/24/32-bit PCM section audio")
                if format_key is None:
                    format_key = key
                    writer.setparams(reader.getparams())
                elif key != format_key:
                    raise ValueError("Section WAV formats must match")
                data = reader.readframes(reader.getnframes())
            _, width, rate = key
            window = max(1, rate // 100)  # 10ms
            threshold = (2 ** (8 * width - 1)) * 10 ** (-50 / 20)
            active = []
            for start in range(0, len(data), window * width):
                block = data[start:start + window * width]
                samples = [int.from_bytes(block[j:j + width], "little", signed=True)
                           for j in range(0, len(block), width)]
                rms = math.sqrt(sum(s * s for s in samples) / len(samples))
                if rms > threshold:
                    active.append(start // width)
            if not active:
                raise ValueError(f"Section {index + 1} contains no audible speech; inspect the raw take")
            frames = len(data) // width
            handle = round(rate * 0.04)
            first = max(0, active[0] - handle)
            last = min(frames, active[-1] + window + handle)
            if index:
                gap = round(rate * pause_ms / 1000)
                writer.writeframes(b"\0" * (gap * width))
                cursor += gap
            kept = last - first
            writer.writeframes(data[first * width:last * width])
            timings.append({"section": index + 1, "start_seconds": cursor / rate,
                            "end_seconds": (cursor + kept) / rate})
            cursor += kept
    return timings


def generate_sections(args, preset: dict, config: dict, sections: list[str],
                      instruction: str | None) -> None:
    """Synthesize short raw takes, join, then polish once across the whole film."""
    output = args.output.resolve()
    parts = output.with_name(output.stem + ".sections")
    raw = output.with_name(output.stem + ".raw.wav")
    if output.exists() or raw.exists() or parts.exists():
        raise ValueError("Take or section sidecars already exist; choose a new output filename")
    parts.mkdir(parents=True)
    plan = {"sections": sections, "preset": preset, "instruction": instruction,
            "join_pause_ms": args.join_pause_ms, "timing_basis": "raw joined audio"}
    # No private model/reference paths or reference transcript in the receipt.
    receipt = parts / "generation.json"
    receipt.write_text(json.dumps(plan, indent=2) + "\n", encoding="utf-8")
    paths = []
    for index, text in enumerate(sections):
        part = parts / f"{index + 1:03d}.wav"
        section_args = argparse.Namespace(processing="raw", output=part, text=text, text_file=None)
        subprocess.run(selected_voice_command(section_args, preset, config, instruction), check=True)
        paths.append(part)
    plan["raw_section_timings"] = join_sections(paths, raw, args.join_pause_ms)
    receipt.write_text(json.dumps(plan, indent=2) + "\n", encoding="utf-8")
    command = [sys.executable, str(ROOT / "scripts/generate_qwen_voice.py"),
               "--raw-input", str(raw), "--output", str(output),
               "--processing", args.processing, "--ffmpeg", config["ffmpeg"]]
    for key in PROCESSING_KEYS:
        command.extend(["--" + key.replace("_", "-"), str(preset[key])])
    subprocess.run(command, check=True)

def emotion_instruction(scene: str | None, emotion: str | None, intensity: float | None) -> str | None:
    if not scene and not emotion:
        return None
    data = json.loads(EMOTION_PATH.read_text(encoding="utf-8-sig"))
    scene_data = data["scenes"].get(scene, {}) if scene else {}
    name = emotion or scene_data.get("profile")
    if name not in data["profiles"]:
        raise ValueError(f"Unknown emotion profile: {name}")
    level = intensity if intensity is not None else scene_data.get("intensity", 0.5)
    cap = data["intensity_cap"]
    if not 0 <= level <= cap:
        raise ValueError(f"Emotion intensity must be between 0 and {cap}")
    profile = data["profiles"][name]
    return f"{profile['instruction']} Emotional intensity: {level:.2f} on a restrained 0–{cap:.2f} scale."





def selected_voice_command(args, preset: dict, config: dict, instruction: str | None = None) -> list[str]:
    """Build the exact command from tracked preset + private file locations."""
    command = [
        sys.executable, str(ROOT / "scripts/generate_qwen_voice.py"),
        "--backend", str(preset["backend"]), "--processing", args.processing,
    ]
    for key in LOCAL_KEYS:
        command.extend(["--" + key.replace("_", "-"), str(config[key])])
    for key in PROCESSING_KEYS:
        value = preset[key]
        if isinstance(value, bool) or not isinstance(value, (float, int)) or not math.isfinite(value):
            raise ValueError(f"Selected voice field {key} must be a finite number")
        command.extend(["--" + key.replace("_", "-"), str(value)])
    if instruction:
        command.extend(["--instruct", instruction])
    command.extend(["--output", str(args.output.resolve())])
    if args.text is not None:
        command.extend(["--text", args.text])
    else:
        command.extend(["--text-file", str(args.text_file.resolve())])
    return command


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, default=ROOT / "out/voice-local.json")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--text")
    group.add_argument("--text-file", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--processing", choices=("raw", "clean", "selected"), default="selected")
    parser.add_argument("--scene", choices=("hook", "growth", "operations", "accounting", "cost", "payoff"))
    parser.add_argument("--emotion", help="Named profile from auditions/voice-emotion.json")
    parser.add_argument("--emotion-intensity", type=float)
    parser.add_argument("--dry-run", action="store_true", help="Inspect section plan without loading the model")
    args = parser.parse_args()
    preset = json.loads((ROOT / "auditions/selected-voice.json").read_text(encoding="utf-8-sig"))
    if preset.get("provider") != "audio.cpp":
        parser.error("Selected voice is not the local audio.cpp voice")
    try:
        generation = preset["generation"]
        for key, lo, hi in (("max_section_words", 8, 60),
                            ("max_section_sentences", 1, 3), ("join_pause_ms", 0, 1000)):
            value = generation[key]
            if type(value) is not int or not lo <= value <= hi:
                raise ValueError(f"Generation setting {key} must be an integer within {lo}..{hi}")
        args.join_pause_ms = generation["join_pause_ms"]
        text = args.text if args.text is not None else args.text_file.read_text(encoding="utf-8-sig")
        sections = narration_sections(text, generation["max_section_words"], generation["max_section_sentences"])
        instruction = emotion_instruction(args.scene, args.emotion, args.emotion_intensity)
        if args.emotion_intensity is not None and not (args.scene or args.emotion):
            raise ValueError("Emotion intensity requires --scene or --emotion")
    except (OSError, ValueError, KeyError) as exc:
        parser.error(str(exc))
    if args.dry_run:
        print(json.dumps({"sections": sections, "instruction": instruction,
                          "join_pause_ms": args.join_pause_ms}, indent=2))
        return
    if not args.config.is_file():
        parser.error("Missing private out/voice-local.json; see README")
    config = json.loads(args.config.read_text(encoding="utf-8-sig"))
    missing = [key for key in LOCAL_KEYS if not isinstance(config.get(key), str) or not config[key].strip()]
    if missing:
        parser.error("Private voice configuration is missing: " + ", ".join(missing))
    output = args.output.resolve()
    if not output.is_relative_to((ROOT / "out").resolve()):
        parser.error("Voice outputs must remain inside this checkout's ignored out/ directory")
    if output.exists():
        parser.error("Output exists; choose a new filename to preserve the previous take")
    if args.text is not None and not args.text.strip():
        parser.error("Narration cannot be empty")
    if args.text_file is not None and not args.text_file.is_file():
        parser.error("Narration text file does not exist")
    try:
        # Validate tracked processing fields before creating any files or running TTS.
        selected_voice_command(args, preset, config, instruction)
        generate_sections(args, preset, config, sections, instruction)
    except (KeyError, ValueError) as exc:
        parser.error(f"Invalid selected voice preset: {exc}")


if __name__ == "__main__":
    main()
