#!/usr/bin/env python3
"""Report low-motion intervals in a rendered video; never score artistic quality.

Only the upper scene region is sampled: persistent narration captions and footer
are excluded so their text changes cannot masquerade as scene animation. This
is a diagnostic for a human viewer review, not a retention or pass/fail gate.
Requires ffmpeg and ffprobe; no Python third-party packages.
"""
from __future__ import annotations

import argparse
from fractions import Fraction
import hashlib
import json
import math
from pathlib import Path
import subprocess

DEFAULT_TOP_FRACTION = 592 / 768


def file_sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def find_spans(changes: list[int], fps: float, max_changed_pixels: int,
               min_seconds: float) -> list[dict]:
    """changes[i] counts changed pixels between source frames i and i+1."""
    spans: list[dict] = []
    start: int | None = None
    for i, changed in enumerate(changes):
        if changed <= max_changed_pixels:
            if start is None:
                start = i
        elif start is not None:
            duration = (i - start) / fps
            if duration >= min_seconds:
                spans.append({'start_frame': start, 'end_frame': i,
                              'duration_seconds': round(duration, 3)})
            start = None
    if start is not None:
        duration = (len(changes) - start) / fps
        if duration >= min_seconds:
            spans.append({'start_frame': start, 'end_frame': len(changes),
                          'duration_seconds': round(duration, 3)})
    return spans


def inspect(video: Path, top_fraction: float = DEFAULT_TOP_FRACTION,
            analysis_width: int = 216, analysis_height: int = 296,
            pixel_delta: int = 3, max_changed_pixels: int = 10,
            min_seconds: float = 1.0) -> dict:
    if not (0 < top_fraction <= 1) or analysis_width < 1 or analysis_height < 1:
        raise ValueError('Invalid analysis crop or dimensions')
    if not (0 <= pixel_delta <= 255) or max_changed_pixels < 0 or min_seconds <= 0:
        raise ValueError('Invalid pixel/interval thresholds')
    probe = json.loads(subprocess.check_output([
        'ffprobe', '-v', 'error', '-select_streams', 'v:0',
        '-show_entries', 'stream=width,height,r_frame_rate', '-of', 'json', str(video)
    ], text=True))['streams'][0]
    width, height = int(probe['width']), int(probe['height'])
    fps = float(Fraction(probe['r_frame_rate']))
    if fps <= 0:
        raise ValueError('Invalid video frame rate')
    crop_height = max(1, min(height, math.floor(height * top_fraction)))
    command = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-i', str(video),
               '-vf', f'crop={width}:{crop_height}:0:0,scale={analysis_width}:{analysis_height}:flags=area,format=gray',
               '-f', 'rawvideo', '-']
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    assert process.stdout is not None and process.stderr is not None
    frame_bytes = analysis_width * analysis_height
    previous: bytes | None = None
    changes: list[int] = []
    frame_count = 0
    try:
        while True:
            frame = process.stdout.read(frame_bytes)
            if not frame:
                break
            if len(frame) != frame_bytes:
                raise ValueError('Incomplete decoded video frame')
            if previous is not None:
                changes.append(sum(abs(a - b) > pixel_delta
                                   for a, b in zip(frame, previous)))
            previous = frame
            frame_count += 1
    finally:
        process.stdout.close()
    error = process.stderr.read().decode('utf-8', errors='replace')
    if process.wait() != 0:
        raise RuntimeError('ffmpeg decode failed: ' + error.strip())
    if frame_count < 2:
        raise ValueError('Need at least two decoded frames')
    spans = find_spans(changes, fps, max_changed_pixels, min_seconds)
    return {
        'video_sha256': file_sha256(video),
        'source_dimensions': [width, height], 'fps': fps, 'decoded_frames': frame_count,
        'crop_xywh': [0, 0, width, crop_height],
        'analysis_dimensions': [analysis_width, analysis_height],
        'gray_pixel_delta_threshold': pixel_delta,
        'max_changed_pixels_per_pair': max_changed_pixels,
        'minimum_span_seconds': min_seconds,
        'low_motion_spans': spans,
        'limitations': ('Low-motion is measured after grayscale downsampling, excluding the lower reading zone. '
                        'Compression noise and crop/threshold choices affect spans. This does not assess '
                        'storytelling, movement quality, voice, or audience retention.'),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--video', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--top-fraction', type=float, default=DEFAULT_TOP_FRACTION)
    parser.add_argument('--analysis-width', type=int, default=216)
    parser.add_argument('--analysis-height', type=int, default=296)
    parser.add_argument('--pixel-delta', type=int, default=3)
    parser.add_argument('--max-changed-pixels', type=int, default=10)
    parser.add_argument('--min-seconds', type=float, default=1.0)
    args = parser.parse_args()
    report = inspect(args.video, args.top_fraction, args.analysis_width,
                     args.analysis_height, args.pixel_delta,
                     args.max_changed_pixels, args.min_seconds)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    print(f"Sampled {report['decoded_frames']} frames; "
          f"{len(report['low_motion_spans'])} low-motion intervals (not a quality score).")


if __name__ == '__main__':
    main()
