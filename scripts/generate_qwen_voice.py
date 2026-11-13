"""Generate a private Qwen3-TTS narration or process an existing raw take.

No model/audio files are added to Git. Use --raw-input to compare raw,
cleaned and selected processing using one identical synthesis take.
"""
from __future__ import annotations

import argparse
import math
import shutil
import subprocess
from pathlib import Path


def parse_args(argv=None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cli", type=Path, help="Local audio.cpp audiocpp_cli.exe")
    parser.add_argument("--model", type=Path, help="Local Qwen3-TTS GGUF model")
    parser.add_argument("--reference-audio", type=Path, help="Private voice-reference WAV")
    parser.add_argument("--reference-text", help="Exact spoken reference transcript")
    text = parser.add_mutually_exclusive_group()
    text.add_argument("--text", help="Narration to synthesize")
    text.add_argument("--text-file", type=Path, help="UTF-8 narration script")
    parser.add_argument("--raw-input", type=Path, help="Reprocess an existing raw WAV; skips synthesis")
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--ffmpeg", default="ffmpeg", help="FFmpeg executable or PATH entry")
    parser.add_argument("--backend", choices=("vulkan", "cpu", "cuda"), default="vulkan")
    parser.add_argument("--threads", type=int, default=4)
    parser.add_argument("--processing", choices=("raw", "clean", "selected"), default="selected")
    parser.add_argument("--no-polish", action="store_true", help="Legacy alias for --processing raw")
    parser.add_argument("--tempo-scale", type=float, default=1.06, help=">1 is faster, <1 slower")
    parser.add_argument("--pitch-scale", type=float, default=0.96, help="0.96 lowers frequency by 4%%")
    parser.add_argument("--noise-reduction-db", type=float, default=3, help="FFmpeg afftdn nr")
    parser.add_argument("--noise-floor-db", type=float, default=-40, help="FFmpeg afftdn nf")
    args = parser.parse_args(argv)
    if args.no_polish:
        if args.processing != "selected":
            parser.error("--no-polish cannot be combined with --processing")
        args.processing = "raw"
    if args.raw_input is not None:
        if any(getattr(args, k) is not None for k in
               ("cli", "model", "reference_audio", "reference_text", "text", "text_file")):
            parser.error("--raw-input must not be combined with synthesis arguments")
    elif any(getattr(args, k) is None for k in
             ("cli", "model", "reference_audio", "reference_text")) or (
                 args.text is None and args.text_file is None):
        parser.error("Synthesis requires --cli, --model, --reference-audio, "
                     "--reference-text and --text or --text-file")
    if args.threads < 1:
        parser.error("--threads must be positive")
    for key, lo, hi in (
        ("tempo_scale", 0.5, 2.0),
        ("pitch_scale", 0.5, 2.0),
        ("noise_reduction_db", 0.0, 50.0),
        ("noise_floor_db", -80.0, -20.0),
    ):
        value = getattr(args, key)
        if not math.isfinite(value) or not lo <= value <= hi:
            parser.error(f"--{key.replace('_', '-')} must be finite and within {lo}..{hi}")
    return args


def audio_filters(args) -> str:
    """Return a deterministic FFmpeg filter graph, or empty string for raw."""
    if args.processing == "raw":
        return ""
    filters = [
        "highpass=f=75",
        f"afftdn=nr={args.noise_reduction_db:g}:nf={args.noise_floor_db:g}:tn=1",
    ]
    if args.processing == "selected":
        filters.append(
            f"rubberband=tempo={args.tempo_scale:g}:pitch={args.pitch_scale:g}:formant=preserved"
        )
    filters += ["loudnorm=I=-19:TP=-1.5:LRA=11", "volume=0.96"]
    return ",".join(filters)


def main() -> int:
    args = parse_args()
    output = args.output.resolve()
    if output.exists():
        raise SystemExit(f"Refusing to overwrite existing voice take: {output}")
    output.parent.mkdir(parents=True, exist_ok=True)

    if args.raw_input is not None:
        raw = args.raw_input.resolve()
        if not raw.is_file():
            raise SystemExit(f"Raw WAV not found: {raw}")
        if raw == output:
            raise SystemExit("Input and output must differ")
    else:
        cli, model, reference = (p.resolve() for p in
                                  (args.cli, args.model, args.reference_audio))
        missing = [str(p) for p in (cli, model, reference) if not p.is_file()]
        if missing:
            raise SystemExit("Required local file not found:\n  " + "\n  ".join(missing))
        narration = args.text if args.text is not None else args.text_file.read_text(encoding="utf-8").strip()
        if not narration.strip():
            raise SystemExit("Narration is empty")
        raw = output if args.processing == "raw" else output.with_name(output.stem + ".raw.wav")
        if raw.exists():
            raise SystemExit(f"Refusing to overwrite existing raw take: {raw}")

    if args.processing != "raw":
        ffmpeg = shutil.which(str(args.ffmpeg)) if not Path(args.ffmpeg).is_file() else str(Path(args.ffmpeg).resolve())
        if ffmpeg is None:
            raise SystemExit("ffmpeg not found; pass --ffmpeg <path>")

    if args.raw_input is None:
        command = [
            str(cli), "--task", "clon", "--family", "qwen3_tts",
            "--model", str(model), "--backend", args.backend,
            "--threads", str(args.threads), "--voice-ref", str(reference),
            "--reference-text", args.reference_text, "--text", narration,
            "--out", str(raw), "--out-format", "pcm24",
        ]
        subprocess.run(command, check=True)

    if args.processing == "raw":
        if args.raw_input is not None:
            shutil.copyfile(raw, output)
        print(f"Raw voice take: {output}")
        return 0

    try:
        subprocess.run([
            ffmpeg, "-n", "-i", str(raw), "-af", audio_filters(args),
            "-ar", "48000", "-ac", "1", "-c:a", "pcm_s24le", str(output),
        ], check=True)
    finally:
        # Never delete the original raw take; it is needed for matched A/B listening.
        print(f"Original raw take retained at {raw}")
    print(f"Processed ({args.processing}) voice take: {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
