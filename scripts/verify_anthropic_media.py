"""Validate locally obtained Anthropic video/photo files against reviewed asset records.

Not legal advice, a rights decision or an editorial approval. Passes an empty
registry for a graphics-only draft; use --require-media for a mixed-media cut.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
ALLOWED_STATUSES = {'licensed', 'permitted_public_domain', 'exception_reviewed'}
ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp', '.mp4', '.webm'}


def verify(approved: dict, scenes: set[str], public_root: Path,
           require_media: bool = False) -> list[str]:
    problems: list[str] = []
    assets = approved.get('assets', [])
    if not isinstance(assets, list):
        return ['assets must be an array']
    if require_media and not assets:
        return ['No approved media selected: graphics-only draft is not a mixed-media master']
    seen = set()
    base = (public_root / 'approved').resolve()
    for i, item in enumerate(assets):
        tag = 'asset ' + str(i + 1)
        if not isinstance(item, dict):
            problems.append(tag + ': must be object')
            continue
        scene_id = item.get('scene_id')
        if scene_id not in scenes:
            problems.append(tag + ': unknown scene_id')
        if scene_id in seen:
            problems.append(tag + ': only one approved media insert per scene is supported')
        seen.add(scene_id)
        if item.get('rights_status') not in ALLOWED_STATUSES:
            problems.append(tag + ': rights review not completed')
        if item.get('factual_status') != 'verified':
            problems.append(tag + ': factual relevance not verified')
        for field in ('reviewer','review_date','permission_evidence','credit','original_source_url'):
            if not isinstance(item.get(field), str) or not item[field].strip():
                problems.append(tag + ': missing ' + field)
        if not str(item.get('original_source_url','')).startswith('https://'):
            problems.append(tag + ': original source must use HTTPS')
        kind = item.get('kind')
        if kind not in {'photograph', 'video_clip'}:
            problems.append(tag + ': unsupported kind')
        rel = item.get('file')
        if not isinstance(rel, str) or not rel.startswith('approved/'):
            problems.append(tag + ': approved file must be under public/approved/')
            continue
        file = (public_root / rel).resolve()
        if not file.is_relative_to(base) or file.suffix.lower() not in ALLOWED_EXTENSIONS:
            problems.append(tag + ': unsafe path or unsupported extension')
            continue
        if not file.is_file():
            problems.append(tag + ': reviewed local file not found')
            continue
        expected = item.get('sha256','')
        if not isinstance(expected,str) or not re.fullmatch('[0-9a-f]{64}',expected):
            problems.append(tag + ': invalid SHA-256')
            continue
        actual = hashlib.sha256(file.read_bytes()).hexdigest()
        if actual != expected:
            problems.append(tag + ': file was modified after human review')
    return problems


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--manifest', type=Path,
                        default=ROOT / 'src/anthropic-approved-media.json')
    parser.add_argument('--episode', type=Path, default=ROOT / 'episodes/002/episode.json')
    parser.add_argument('--public-root', type=Path, default=ROOT / 'public')
    parser.add_argument('--require-media', action='store_true')
    args = parser.parse_args()
    approved = json.loads(args.manifest.read_text(encoding='utf-8'))
    episode = json.loads(args.episode.read_text(encoding='utf-8'))
    problems = verify(approved, {scene['id'] for scene in episode['scenes']},
                      args.public_root, args.require_media)
    if problems:
        parser.exit(1, 'STOP:\n- ' + '\n- '.join(problems) + '\n')
    if not approved['assets']:
        print('PASS: no approved third-party media; storyboard uses original graphics only')
    else:
        print('PASS: asset hashes/review metadata consistent; human legal and final-media approval still required')


if __name__ == '__main__':
    main()
