"""Generate a local protagonist preview with captions timed to individual audio clips."""
import json
import math
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LINES = [
    'You kept every share. So why do you own less?',
    'Imagine you own ten of one hundred shares.',
    'The company issues twenty-five more.',
    'Your ten shares now represent eight percent.',
    "Well, that's rude.",
    'Same shares. Smaller percentage. But not necessarily less value.',
    'That depends on what the company does with the new money.',
]


def main():
    dest = ROOT / 'out/lead-voice-preview'
    dest.mkdir(parents=True, exist_ok=True)
    config = json.loads((ROOT / 'out/voice-local.json').read_text(encoding='utf-8-sig'))
    ffprobe = Path(config['ffmpeg']).with_name('ffprobe.exe')
    clips = []
    frame = 15
    for index, text in enumerate(LINES):
        wav = dest / f'clip-{index}.wav'
        if wav.exists():
            raise SystemExit(f'Existing take: {wav}. Choose a fresh output folder before regeneration.')
        subprocess.run([sys.executable, str(ROOT / 'scripts/generate_lead_voice.py'), '--text', text, '--output', str(wav)], check=True)
        duration = float(subprocess.check_output([str(ffprobe), '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', str(wav)], text=True).strip())
        frames = math.ceil(duration * 30)
        clips.append(dict(text=text, file=wav.name, startFrame=frame, durationInFrames=frames))
        # Shorten the intentional pauses by 40% while retaining a readable beat.
        frame += frames + (6 if index in (0, 3, 4) else 3)
    manifest = dict(clips=clips, durationInFrames=frame + 15)
    (dest / 'props.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    print(f'Preview props: {dest / "props.json"}; duration {manifest["durationInFrames"] / 30:.2f}s')


if __name__ == '__main__':
    main()
