"""Generate a local Qwen3-TTS voice clone without adding audio to the repository."""

from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cli", type=Path, required=True, help="Path to audio.cpp audiocpp_cli.exe")
    parser.add_argument("--model", type=Path, required=True, help="Path to the local Qwen3-TTS GGUF model")
    parser.add_argument("--reference-audio", type=Path, required=True, help="Clean local voice reference WAV")
    parser.add_argument("--reference-text", required=True, help="Exact words spoken in the reference WAV")
    text = parser.add_mutually_exclusive_group(required=True)
    text.add_argument("--text", help="Narration to synthesize")
    text.add_argument("--text-file", type=Path, help="UTF-8 file containing narration to synthesize")
    parser.add_argument("--output", type=Path, required=True, help="Final WAV path; use an ignored out/ path")
    parser.add_argument("--ffmpeg", default="ffmpeg", help="ffmpeg executable or path (default: PATH)")
    parser.add_argument("--backend", choices=("vulkan", "cpu", "cuda"), default="vulkan")
    parser.add_argument("--threads", type=int, default=4)
    parser.add_argument("--no-polish", action="store_true", help="Keep the raw model output (PCM 24-bit)")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    cli = args.cli.resolve()
    model = args.model.resolve()
    reference = args.reference_audio.resolve()
    output = args.output.resolve()
    missing = [str(path) for path in (cli, model, reference) if not path.is_file()]
    if missing:
        raise SystemExit("Required local file not found:\n  " + "\n  ".join(missing))
    narration = args.text if args.text is not None else args.text_file.read_text(encoding="utf-8").strip()
    if not narration:
        raise SystemExit("Narration is empty")
    output.parent.mkdir(parents=True, exist_ok=True)
    raw = output.with_name(output.stem + ".raw.wav") if not args.no_polish else output

    command = [
        str(cli), "--task", "clon", "--family", "qwen3_tts", "--model", str(model),
        "--backend", args.backend, "--threads", str(args.threads),
        "--voice-ref", str(reference), "--reference-text", args.reference_text,
        "--text", narration, "--out", str(raw), "--out-format", "pcm24",
    ]
    subprocess.run(command, check=True)
    if args.no_polish:
        print(f"Wrote {output}")
        return 0

    ffmpeg = shutil.which(args.ffmpeg) if not Path(args.ffmpeg).is_file() else str(Path(args.ffmpeg).resolve())
    if ffmpeg is None:
        raw.unlink(missing_ok=True)
        raise SystemExit("ffmpeg was not found; install it or pass --ffmpeg <path>")
    filters = "highpass=f=75,afftdn=nf=-25:tn=1,loudnorm=I=-19:TP=-1.5:LRA=11,rubberband=pitch=0.96:formant=preserved,volume=0.96"
    try:
        subprocess.run([
            ffmpeg, "-y", "-i", str(raw), "-af", filters, "-ar", "48000",
            "-ac", "1", "-c:a", "pcm_s24le", str(output),
        ], check=True)
    finally:
        raw.unlink(missing_ok=True)
    print(f"Wrote polished voice clone to {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

