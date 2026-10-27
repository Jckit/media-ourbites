"""Local editorial checkpoints. No external services or publishing side effects."""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import hashlib
import json
import math
from pathlib import Path
import re
import sys
from urllib.parse import urlparse


class ReviewError(ValueError):
    pass


def load(path: Path) -> dict:
    value = json.loads(path.read_text(encoding="utf-8-sig"))
    if not isinstance(value, dict):
        raise ReviewError("Episode must be a JSON object")
    return value


def digest(path: Path) -> str:
    sha = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            sha.update(chunk)
    return sha.hexdigest()


def unique_index(rows: list, name: str) -> dict:
    if not isinstance(rows, list):
        raise ReviewError(f"{name} must be a list")
    result = {}
    for row in rows:
        if not isinstance(row, dict) or not isinstance(row.get("id"), str) or not row["id"].strip():
            raise ReviewError(f"Every {name} entry needs a nonempty id")
        if row["id"] in result:
            raise ReviewError(f"Duplicate {name} id: {row['id']}")
        result[row["id"]] = row
    return result


def validate(episode: dict, now: datetime | None = None) -> list[str]:
    now = now or datetime.now(timezone.utc)
    if not re.fullmatch(r"[a-z0-9][a-z0-9-]{0,79}", episode.get("id", "")):
        raise ReviewError("Episode id must be a safe lowercase slug")
    if not isinstance(episode.get("title"), str) or not episode["title"].strip():
        raise ReviewError("A title is required")
    sources = unique_index(episode.get("sources", []), "sources")
    claims = unique_index(episode.get("claims", []), "claims")
    scenes = unique_index(episode.get("scenes", []), "scenes")
    if not scenes or not claims:
        raise ReviewError("At least one scene and one claim are required")
    for source in sources.values():
        url = urlparse(source.get("url", ""))
        if url.scheme != "https" or not url.netloc:
            raise ReviewError(f"Source {source['id']} requires an HTTPS URL")
        for field in ("publisher", "locator", "note"):
            if not isinstance(source.get(field), str) or not source[field].strip():
                raise ReviewError(f"Source {source['id']} requires {field}")
        if source.get("kind") not in {"primary", "secondary"}:
            raise ReviewError("Source kind must be primary or secondary")
        try:
            checked = datetime.fromisoformat(source["checked_at"])
        except (KeyError, ValueError, TypeError) as exc:
            raise ReviewError("Sources require an ISO checked_at timestamp") from exc
        if checked.tzinfo is None or checked > now:
            raise ReviewError("Source check must have a timezone and cannot be in the future")
    warnings = []
    for claim in claims.values():
        if claim.get("kind") not in {"fact", "analysis", "scenario"}:
            raise ReviewError("Claim kind must be fact, analysis, or scenario")
        if not isinstance(claim.get("text"), str) or not claim["text"].strip():
            raise ReviewError("Claims require text")
        refs = claim.get("source_ids", [])
        if not isinstance(refs, list) or any(ref not in sources for ref in refs):
            raise ReviewError(f"Unknown source on claim {claim['id']}")
        if claim["kind"] == "fact" and not refs:
            raise ReviewError(f"Unsourced fact: {claim['id']}")
        if claim.get("volatile"):
            if not refs:
                raise ReviewError("Volatile claims require sources")
            for ref in refs:
                age = now - datetime.fromisoformat(sources[ref]["checked_at"])
                if age.total_seconds() > 72 * 3600:
                    raise ReviewError(f"Recheck source {ref}: older than the 72-hour editorial limit")
        if claim["kind"] == "fact" and len({sources[ref]["publisher"] for ref in refs}) < 2:
            warnings.append(f"{claim['id']}: one publisher; reviewer must justify authority or add corroboration")
    total = 0
    for scene in scenes.values():
        duration = scene.get("duration")
        if isinstance(duration, bool) or not isinstance(duration, (float, int)) or not math.isfinite(duration) or duration <= 0:
            raise ReviewError("Scene durations must be positive finite numbers")
        total += duration
        for field in ("title", "kicker", "narration"):
            if not isinstance(scene.get(field), str) or not scene[field].strip():
                raise ReviewError(f"Scene {scene['id']} needs {field}")
        refs = scene.get("claim_ids")
        if not isinstance(refs, list) or not refs or any(ref not in claims for ref in refs):
            raise ReviewError(f"Scene {scene['id']} has missing or unknown claims")
        counts = {"combination": 3, "ownership": 0, "balance": 1, "steps": 3}
        if scene.get("visual") not in counts:
            raise ReviewError(f"Unsupported visual: {scene.get('visual')}")
        labels = scene.get("labels")
        if not isinstance(labels, list) or len(labels) != counts[scene["visual"]] or any(not isinstance(x, str) for x in labels):
            raise ReviewError(f"Incorrect labels for {scene['visual']}")
        if len(scene["narration"].split()) / duration * 60 > 180:
            warnings.append(f"{scene['id']}: narration exceeds 180 words/minute; retime after voiceover")
    if total > 180:
        raise ReviewError("This starter composition supports Shorts up to 180 seconds")
    return warnings


def write_review(path: Path, output: Path) -> None:
    episode = load(path)
    warnings = validate(episode)
    lines = [f"# {episode['title']}", "", "DRAFT: source checks do not prove the narration is accurate.",
             "Review every sentence, number, visual implication, and omission manually.", "",
             f"Manifest SHA-256: `{digest(path)}`", "", "## Review warnings", ""]
    lines.extend(f"- {warning}" for warning in warnings)
    lines.extend(["", "## Script and scene plan", ""])
    offset = 0
    for scene in episode["scenes"]:
        lines.extend([f"### {offset:g}-{offset+scene['duration']:g}s: {scene['title']}", "", scene["narration"], "",
                      f"Visual: {scene['visual']}; claim references: {', '.join(scene['claim_ids'])}.", ""])
        offset += scene["duration"]
    lines.extend(["## Claim ledger", ""])
    for claim in episode["claims"]:
        lines.extend([f"- **{claim['id']} / {claim['kind']}**: {claim['text']} Sources: {', '.join(claim['source_ids']) or 'author reasoning / illustrative assumptions'}."])
    lines.extend(["", "## Sources", ""])
    for source in episode["sources"]:
        lines.extend([f"- [{source['id']}]({source['url']}) — {source['locator']}. Checked {source['checked_at']}. {source['note']}"])
    lines.extend(["", "## Human review", "", "- [ ] Title and all claims match evidence; scenarios are explicit.",
                  "- [ ] Original explanation adds value beyond a source summary.",
                  "- [ ] Visuals, music, voice and font rights recorded.",
                  "- [ ] Source freshness and single-source exceptions checked.",
                  "- [ ] Final voiceover, captions, mobile framing and disclosures reviewed.",
                  "", "The local approval receipt is an attestation, not authenticated identity or automatic fact-checking."])
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text("\n".join(lines)+"\n", encoding="utf-8")


def approve(path: Path, receipt: Path, reviewer: str, notes: str, media: Path | None = None) -> None:
    validate(load(path))
    if not reviewer.strip() or not notes.strip():
        raise ReviewError("A human reviewer name and review notes are required")
    record = {"manifest_sha256": digest(path), "reviewer": reviewer, "notes": notes,
              "approved_at": datetime.now(timezone.utc).isoformat(),
              "stage": "final-media" if media else "editorial"}
    if media:
        record["media_sha256"] = digest(media)
    receipt.parent.mkdir(parents=True, exist_ok=True)
    with receipt.open("x", encoding="utf-8") as stream:
        json.dump(record, stream, indent=2)


def verify(path: Path, receipt: Path, media: Path | None = None) -> None:
    validate(load(path))
    record = load(receipt)
    if not record.get("reviewer") or not record.get("notes"):
        raise ReviewError("Invalid review receipt")
    if record.get("manifest_sha256") != digest(path):
        raise ReviewError("Episode changed after review: approval is invalid")
    if media and (record.get("stage") != "final-media" or record.get("media_sha256") != digest(media)):
        raise ReviewError("Final media is unapproved or changed after review")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    for name in ("validate", "review", "approve", "verify"):
        command = sub.add_parser(name)
        command.add_argument("episode", type=Path)
        if name == "review":
            command.add_argument("--out", type=Path, required=True)
        if name in {"approve", "verify"}:
            command.add_argument("--receipt", type=Path, required=True)
            command.add_argument("--media", type=Path)
        if name == "approve":
            command.add_argument("--reviewer", required=True)
            command.add_argument("--notes", required=True)
    args = parser.parse_args()
    try:
        if args.command == "validate":
            for warning in validate(load(args.episode)):
                print("REVIEW:", warning)
        elif args.command == "review":
            write_review(args.episode, args.out)
        elif args.command == "approve":
            approve(args.episode, args.receipt, args.reviewer, args.notes, args.media)
        else:
            verify(args.episode, args.receipt, args.media)
        print(f"OK: {args.command}")
    except (ReviewError, OSError, ValueError, TypeError, KeyError) as exc:
        print(f"STOP: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
