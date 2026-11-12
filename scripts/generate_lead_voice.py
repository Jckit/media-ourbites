"""Generate narration using the selected protagonist voice and private local inputs."""
import argparse
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--config', type=Path, default=ROOT / 'out/voice-local.json')
    text = parser.add_mutually_exclusive_group(required=True)
    text.add_argument('--text')
    text.add_argument('--text-file', type=Path)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    preset = json.loads((ROOT / 'auditions/selected-voice.json').read_text(encoding='utf-8-sig'))
    if preset['provider'] != 'audio.cpp':
        parser.error('Selected voice is not the local audio.cpp voice')
    if not args.config.is_file():
        parser.error('Create out/voice-local.json with cli, model, reference_audio, reference_text and ffmpeg paths; see README')
    config = json.loads(args.config.read_text(encoding='utf-8-sig'))
    output = args.output.resolve()
    if not output.is_relative_to((ROOT / 'out').resolve()):
        parser.error('Voice outputs must be inside this checkout\'s ignored out/ directory')
    if output.exists():
        parser.error('Output exists; choose a new filename to preserve the previous take')
    command = [sys.executable, str(ROOT / 'scripts/generate_qwen_voice.py'), '--backend', preset['backend']]
    for key in ('cli', 'model', 'reference_audio', 'reference_text', 'ffmpeg'):
        command.extend(['--' + key.replace('_', '-'), str(config[key])])
    command.extend(['--output', str(output)])
    command.extend(['--text', args.text] if args.text is not None else ['--text-file', str(args.text_file.resolve())])
    subprocess.run(command, check=True)


if __name__ == '__main__':
    main()
