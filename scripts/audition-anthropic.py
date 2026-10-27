"""Generate local Anthropic narration tests using the existing Kokoro setup.

Produces audition or rough full-length per-scene WAVs under ignored out/.
This does NOT select a winning voice, perform word alignment, or grant final approval.
Example:
  .venv-voice/Scripts/python scripts/audition-anthropic.py --mode compare
  .venv-voice/Scripts/python scripts/audition-anthropic.py --mode full --voice am_liam
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import time

ROOT = Path(__file__).resolve().parents[1]
MODEL = ROOT / 'models/kokoro/kokoro-v1.0.onnx'
VOICES = ROOT / 'models/kokoro/voices-v1.0.bin'
EPISODE = ROOT / 'episodes/002/episode.json'
CANDIDATES = [('A', 'am_puck'), ('E', 'am_onyx'), ('F', 'am_michael'),
              ('H', 'am_liam'), ('I', 'am_eric')]
SAMPLE = (
    "Anthropic just filed to go public. Its prospectus shows an eighty-billion-dollar "
    "loss in six months. Wait—what? Around seventy-two-point-four billion was a "
    "fair-value change on convertible financing and related instruments. "
    "That's an accounting charge, not the same as spending that amount in cash."
)


def synthesize(engine, text: str, voice: str, output: Path, speed: float) -> dict:
    import numpy as np
    import soundfile as sf

    started = time.perf_counter()
    samples, rate = engine.create(text, voice=voice, speed=speed, lang='en-us')
    samples = np.asarray(samples, dtype=np.float32)
    if samples.size == 0 or not np.isfinite(samples).all():
        raise ValueError('Voice generation returned invalid audio')
    peak = float(np.max(np.abs(samples)))
    if peak <= 1e-5:
        raise ValueError('Voice generation returned silent audio')
    output.parent.mkdir(parents=True, exist_ok=True)
    sf.write(output, samples * (0.89 / peak), rate, subtype='PCM_16')
    return {
        'voice': voice, 'file': output.relative_to(ROOT).as_posix(),
        'sample_rate': int(rate), 'seconds': round(len(samples) / rate, 3),
        'generation_seconds': round(time.perf_counter() - started, 3),
        'sha256': hashlib.sha256(output.read_bytes()).hexdigest(),
        'text': text, 'speed': speed,
        'status': 'audition_only_not_approved',
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--mode', choices=['compare', 'full'], default='compare')
    parser.add_argument('--voice', choices=[name for _, name in CANDIDATES],
                        help='Required for full mode; never infer a human preference')
    parser.add_argument('--speed', type=float, default=1.0,
                        help='Synthesis speed, not a post-render speed multiplier')
    args = parser.parse_args()
    if args.mode == 'full' and not args.voice:
        parser.error('--voice must be specified for --mode full')
    if not 0.7 <= args.speed <= 1.3:
        parser.error('--speed must be within 0.7–1.3')
    if not MODEL.is_file() or not VOICES.is_file():
        parser.error('Kokoro weights missing under models/kokoro; see auditions/VOICE-SHORTLIST.md')
    from kokoro_onnx import Kokoro

    engine = Kokoro(str(MODEL), str(VOICES))
    out = ROOT / 'out/voice-auditions/002'
    out.mkdir(parents=True, exist_ok=True)
    results = []
    if args.mode == 'compare':
        for label, voice in CANDIDATES:
            result = synthesize(engine, SAMPLE, voice, out / (label + '-' + voice + '.wav'), args.speed)
            results.append(result)
            print(label, voice, result['seconds'])
    else:
        episode = json.loads(EPISODE.read_text(encoding='utf-8'))
        for scene in episode['scenes']:
            result = synthesize(engine, scene['narration'], args.voice,
                                out / ('full-' + args.voice) / (scene['id'] + '.wav'), args.speed)
            result['scene_id'] = scene['id']
            result['storyboard_duration_seconds'] = scene['duration']
            results.append(result)
            print(scene['id'], 'actual seconds', result['seconds'],
                  'estimated', scene['duration'])
    manifest = {
        'episode_id': 'ourbites-anthropic-ipo-accounting',
        'mode': args.mode, 'engine': 'kokoro-onnx',
        'model_sha256': hashlib.sha256(MODEL.read_bytes()).hexdigest(),
        'voice_bundle_sha256': hashlib.sha256(VOICES.read_bytes()).hexdigest(),
        'results': results,
        'notice': 'Audition only. Human must listen, approve, retime, align word captions and review rights.',
    }
    output = out / ('full-' + args.voice + '.json' if args.mode == 'full' else 'compare.json')
    output.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    print('Saved', output)


if __name__ == '__main__':
    main()
