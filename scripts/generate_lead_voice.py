"""Generate new narration with the selected local Ourbites voice preset."""
from __future__ import annotations

import argparse
import json
import math
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCAL_KEYS = ("cli", "model", "reference_audio", "reference_text", "ffmpeg")
PROCESSING_KEYS = ("tempo_scale", "pitch_scale", "noise_reduction_db", "noise_floor_db")


def selected_voice_command(args, preset: dict, config: dict) -> list[str]:
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
    args = parser.parse_args()
    preset = json.loads((ROOT / "auditions/selected-voice.json").read_text(encoding="utf-8-sig"))
    if preset.get("provider") != "audio.cpp":
        parser.error("Selected voice is not the local audio.cpp voice")
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
        command = selected_voice_command(args, preset, config)
    except (KeyError, ValueError) as exc:
        parser.error(f"Invalid selected voice preset: {exc}")
    subprocess.run(command, check=True)


if __name__ == "__main__":
    main()
