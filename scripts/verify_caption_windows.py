#!/usr/bin/env python3
"""Check burned-in AnthropicCharacter caption presence against narration windows.

This is a pixel-presence QA gate for the phone-sized review export. It does
NOT read caption words, hear speech, or verify phoneme-level synchronization.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path
import subprocess
import sys

FPS = 30
SPEED = 1.1
# Phone-size (432x768) AnthropicCharacter: caption-only strip, no source footer.
CROP = (0, 638, 432, 72)
DARK_LUMA = 175
MIN_DARK_PIXELS = 500
BOUNDARY_TOLERANCE_FRAMES = 1


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def check(video, manifest_path):
    manifest = json.loads(Path(manifest_path).read_text(encoding='utf-8'))
    clips = manifest['clips']
    if not clips or any(c['duration'] <= 0 for c in clips):
        raise ValueError('Expected positive-duration narration clips')
    for prev, curr in zip(clips, clips[1:]):
        if prev['start'] + prev['duration'] > curr['start']:
            raise ValueError('Narration clips overlap')
    probe = json.loads(subprocess.check_output([
        'ffprobe', '-v', 'error', '-select_streams', 'v:0',
        '-show_entries', 'stream=width,height,r_frame_rate', '-of', 'json', str(video)
    ], text=True))['streams'][0]
    if (probe['width'], probe['height'], probe['r_frame_rate']) != (432, 768, '30/1'):
        raise ValueError(f'Unexpected review video format: {probe}')
    x, y, w, h = CROP
    raw = subprocess.check_output([
        'ffmpeg', '-hide_banner', '-loglevel', 'error', '-i', str(video),
        '-vf', f'crop={w}:{h}:{x}:{y},format=gray', '-f', 'rawvideo', '-'
    ])
    frame_bytes = w * h
    if len(raw) % frame_bytes:
        raise ValueError('Incomplete decoded caption frames')
    frame_count = len(raw) // frame_bytes
    expected_count = math.ceil(manifest['duration'] * FPS / SPEED)
    if frame_count != expected_count:
        raise ValueError(f'Unexpected frame count {frame_count} != {expected_count}')
    boundaries = [v * FPS / SPEED for c in clips for v in (c['start'], c['start'] + c['duration'])]
    visible = []
    dark_counts = []
    for frame in range(frame_count):
        chunk = raw[frame * frame_bytes:(frame + 1) * frame_bytes]
        dark = sum(value < DARK_LUMA for value in chunk)
        dark_counts.append(dark)
        visible.append(dark > MIN_DARK_PIXELS)
    mismatches = []
    tolerated = []
    for frame, observed in enumerate(visible):
        story_t = frame / FPS * SPEED
        expected = any(c['start'] <= story_t < c['start'] + c['duration'] for c in clips)
        if observed != expected:
            item = {'frame': frame, 'seconds': round(frame / FPS, 4),
                    'expected_caption': expected, 'observed_caption': observed,
                    'dark_pixels': dark_counts[frame]}
            if min(abs(frame - b) for b in boundaries) <= BOUNDARY_TOLERANCE_FRAMES:
                tolerated.append(item)
            else:
                mismatches.append(item)
    windows = []
    for i, clip in enumerate(clips):
        frames = [f for f in range(frame_count)
                  if clip['start'] <= f / FPS * SPEED < clip['start'] + clip['duration']]
        windows.append({'clip_index': i, 'file': clip.get('file'),
                        'expected_frames': len(frames),
                        'observed_visible_frames': sum(visible[f] for f in frames),
                        'first_frame': frames[0], 'last_frame': frames[-1]})
    report = {
        'video_sha256': sha256(video), 'manifest_sha256': sha256(manifest_path),
        'video_frames': frame_count, 'fps': FPS, 'playback_speed': SPEED,
        'crop_xywh': list(CROP), 'dark_luma_below': DARK_LUMA,
        'min_dark_pixels': MIN_DARK_PIXELS,
        'boundary_tolerance_frames': BOUNDARY_TOLERANCE_FRAMES,
        'caption_visible_frames': sum(visible),
        'caption_absent_frames': frame_count - sum(visible),
        'clips': windows, 'tolerated_boundary_mismatches': tolerated,
        'untolerated_mismatches': mismatches,
        'passed': not mismatches and all(w['observed_visible_frames'] > 0 for w in windows),
        'limitations': 'Pixel presence only; not words, intelligibility, pitch, or word-level sync.'
    }
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--video', type=Path, required=True)
    parser.add_argument('--manifest', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    try:
        report = check(args.video, args.manifest)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
        print(f"Caption presence: {report['caption_visible_frames']} visible / "
              f"{report['video_frames']} frames; "
              f"{len(report['untolerated_mismatches'])} untolerated mismatches")
        if not report['passed']:
            print('FAIL: caption presence does not match narration windows', file=sys.stderr)
            return 1
        print('PASS: caption-window presence only (NOT word-level or audible sync)')
        return 0
    except (OSError, ValueError, KeyError, subprocess.CalledProcessError) as exc:
        print(f'Caption QA error: {exc}', file=sys.stderr)
        return 2


if __name__ == '__main__':
    raise SystemExit(main())
