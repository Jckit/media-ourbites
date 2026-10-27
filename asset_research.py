"""Research-only media candidate discovery for Ourbites.

No downloads, approvals, license decisions, video exports or publishing. Standard
library only; Wikimedia Commons searches require an internet connection.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import urlencode
from urllib.request import Request, urlopen

COMMONS_API = "https://commons.wikimedia.org/w/api.php"
RIGHTS_STATES = {"unreviewed", "permission_requested", "licensed", "permitted_public_domain", "exception_reviewed", "rejected"}
FACT_STATES = {"unverified", "verified", "disputed"}
MEDIA_TYPES = {"photograph", "video_clip", "official_demo", "document_excerpt", "chart", "original_animation", "generated_asset"}
USER_AGENT = "OurbitesAssetResearch/0.1 (https://github.com/jcbandc-arch/media-creator-outbites; metadata only)"


class ResearchError(ValueError):
    pass


class _PlainText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        self.parts.append(data)


def plain(value: object) -> str:
    if isinstance(value, dict):
        value = value.get("value", "")
    if not isinstance(value, str):
        return ""
    parser = _PlainText()
    parser.feed(value)
    return html.unescape("".join(parser.parts)).strip()


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def safe_id(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:70] or "candidate"


def require_https(value: str, what: str) -> None:
    if not isinstance(value, str) or not value.startswith("https://") or any(c.isspace() for c in value):
        raise ResearchError(f"{what} must be an HTTPS URL")


def validate_plan(episode: dict, plan: dict) -> None:
    if episode.get("id") != plan.get("episode_id"):
        raise ResearchError("Plan episode_id differs from episode manifest id")
    scenes = {x["id"]: set(x["claim_ids"]) for x in episode.get("scenes", [])}
    if not scenes:
        raise ResearchError("Episode must contain scenes")
    for scene_id, config in plan.get("scenes", {}).items():
        if scene_id not in scenes:
            raise ResearchError(f"Unknown scene in media plan: {scene_id}")
        if not isinstance(config, dict):
            raise ResearchError(f"Plan for {scene_id} must be an object")
        if not isinstance(config.get("fallback"), str) or not config["fallback"].strip():
            raise ResearchError(f"Plan for {scene_id} needs an original-visual fallback")
        for lead in config.get("leads", []):
            if not isinstance(lead, dict):
                raise ResearchError(f"Lead in {scene_id} must be an object")
            require_https(lead.get("url"), f"Lead in {scene_id}")
            if lead.get("kind", "document_excerpt") not in MEDIA_TYPES:
                raise ResearchError(f"Invalid media type in {scene_id}")
            if not set(lead.get("claim_ids", scenes[scene_id])).issubset(scenes[scene_id]):
                raise ResearchError(f"Lead claims not in manifest scene: {scene_id}")
        for search in config.get("commons_searches", []):
            if not isinstance(search, str) or not search.strip():
                raise ResearchError(f"Invalid Commons search in {scene_id}")


def candidate_base(scene_id: str, claim_ids: list[str], fallback: str, purpose: str) -> dict:
    return {
        "id": "", "scene_id": scene_id, "claim_ids": claim_ids,
        "narrative_purpose": purpose, "asset_kind": "photograph", "subject": "",
        "event_date": None, "capture_context": None, "source_url": "",
        "source_title": "", "publisher": "", "creator": None,
        "retrieved_at": utc_now(), "original_locator": None,
        "candidate_media_url": None, "target_start_seconds": None,
        "target_end_seconds": None, "in_video_seconds": None,
        "crop_or_annotation_plan": None, "on_screen_credit": None,
        "rights_status": "unreviewed", "license_url": None,
        "license_hint": None, "permission_evidence": None,
        "required_attribution": None, "territory_restrictions": None,
        "reviewer": None, "review_date": None,
        "rights_notes": "Candidate only; manual provenance and use-rights review required.",
        "factual_status": "unverified", "local_file": None, "sha256": None,
        "selected_for_final": False, "fallback": fallback,
    }


def manual_candidate(scene_id: str, claims: list[str], fallback: str, lead: dict, index: int) -> dict:
    item = candidate_base(scene_id, lead.get("claim_ids", claims), fallback,
                          lead.get("purpose", "Establish the authentic event or primary evidence."))
    item.update(
        id=f"{safe_id(scene_id)}-lead-{index}", asset_kind=lead.get("kind", "document_excerpt"),
        source_url=lead["url"], source_title=lead.get("title") or lead["url"],
        subject=lead.get("subject") or lead.get("title") or "Research lead",
        publisher=lead.get("publisher") or "Publisher not reviewed",
        creator=lead.get("creator"), event_date=lead.get("event_date"),
        original_locator=lead.get("locator"), capture_context=lead.get("context"),
        candidate_media_url=lead.get("media_url"),
    )
    return item


def commons_search(query: str, limit: int = 4, timeout: int = 12) -> list[dict]:
    """Fetch metadata, not file bytes. May raise network/JSON errors."""
    params = {
        "action": "query", "format": "json", "formatversion": "2",
        "generator": "search", "gsrsearch": query, "gsrnamespace": "6",
        "gsrlimit": min(max(limit, 1), 10), "prop": "imageinfo",
        "iiprop": "url|mime|extmetadata", "iiextmetadatalanguage": "en",
    }
    req = Request(COMMONS_API + "?" + urlencode(params), headers={"User-Agent": USER_AGENT})
    with urlopen(req, timeout=timeout) as response:
        payload = json.load(response)
    if "error" in payload:
        raise ResearchError(f"Commons API: {payload['error'].get('info', 'unknown error')}")
    return payload.get("query", {}).get("pages", [])


def commons_candidate(scene_id: str, claims: list[str], fallback: str,
                      query: str, page: dict) -> dict | None:
    info = (page.get("imageinfo") or [{}])[0]
    mime = info.get("mime", "")
    if not (mime.startswith("image/") or mime.startswith("video/")):
        return None
    title = page.get("title", "")
    if not title.startswith("File:"):
        return None
    source_url = info.get("descriptionurl")
    if not source_url or not source_url.startswith("https://commons.wikimedia.org/"):
        return None
    metadata = info.get("extmetadata") or {}
    item = candidate_base(scene_id, claims, fallback, f"Possible authentic illustration for search: {query}")
    item.update(
        id=f"{safe_id(scene_id)}-commons-{page.get('pageid', safe_id(title))}",
        asset_kind="video_clip" if mime.startswith("video/") else "photograph",
        subject=title.removeprefix("File:").replace("_", " "),
        source_url=source_url, source_title=title, publisher="Wikimedia Commons",
        creator=plain(metadata.get("Artist")) or None,
        capture_context=plain(metadata.get("ImageDescription"))[:700] or None,
        event_date=plain(metadata.get("DateTimeOriginal")) or None,
        candidate_media_url=info.get("url"),
        license_hint=plain(metadata.get("LicenseShortName")) or None,
        license_url=plain(metadata.get("LicenseUrl")) or None,
        required_attribution=plain(metadata.get("Attribution")) or None,
        rights_notes="Commons metadata only; original source, creator authority, consent, license and modifications require manual verification. NOT cleared.",
    )
    return item


def build(episode: dict, plan: dict, use_commons: bool = False, limit: int = 4,
          search_fn=commons_search) -> dict:
    validate_plan(episode, plan)
    scene_index = {s["id"]: s for s in episode["scenes"]}
    packet = {"schema_version": "0.1", "episode_id": episode["id"], "created_at": utc_now(),
              "discovery": "commons+curated" if use_commons else "curated-offline",
              "assets": [], "search_log": [], "warnings": []}
    seen = set()
    for scene_id, config in plan.get("scenes", {}).items():
        claims = scene_index[scene_id]["claim_ids"]
        fallback = config["fallback"]
        for ix, lead in enumerate(config.get("leads", []), 1):
            item = manual_candidate(scene_id, claims, fallback, lead, ix)
            key = (scene_id, item["source_url"])
            if key not in seen:
                packet["assets"].append(item)
                seen.add(key)
        for query in config.get("commons_searches", []):
            if not use_commons:
                packet["search_log"].append({"scene_id": scene_id, "query": query, "status": "skipped_offline"})
                continue
            try:
                results = search_fn(query, limit)
                accepted = 0
                for page in results:
                    item = commons_candidate(scene_id, claims, fallback, query, page)
                    if item is None:
                        continue
                    key = (scene_id, item["source_url"])
                    if key not in seen:
                        packet["assets"].append(item)
                        seen.add(key)
                        accepted += 1
                packet["search_log"].append({"scene_id": scene_id, "query": query, "status": "ok", "accepted": accepted})
            except (OSError, ValueError, KeyError, TypeError) as exc:
                packet["search_log"].append({"scene_id": scene_id, "query": query, "status": "failed"})
                packet["warnings"].append(f"Commons lookup failed for {scene_id}/{query}: {type(exc).__name__}: {exc}")
    return packet


def release_issues(packet: dict) -> list[str]:
    """Candidate packet review—not a replacement for human or legal approval."""
    problems = []
    selected = [item for item in packet.get("assets", []) if item.get("selected_for_final")]
    if not selected:
        return ["No assets selected_for_final; this packet is research, not a cleared production package"]
    for item in selected:
        tag = item.get("id", "unknown")
        if item.get("rights_status") not in {"licensed", "permitted_public_domain", "exception_reviewed"}:
            problems.append(f"{tag}: rights not cleared")
        if item.get("factual_status") != "verified":
            problems.append(f"{tag}: factual provenance unverified")
        if not item.get("reviewer") or not item.get("review_date"):
            problems.append(f"{tag}: missing human review signoff")
        if not item.get("local_file") or not re.fullmatch(r"[0-9a-f]{64}", item.get("sha256") or ""):
            problems.append(f"{tag}: missing versioned local file and SHA-256")
        if item.get("asset_kind") != "original_animation" and not (item.get("permission_evidence") or item.get("license_url") or item.get("rights_status") == "exception_reviewed"):
            problems.append(f"{tag}: no license/permission/exception evidence")
    return problems


def markdown(packet: dict, episode: dict) -> str:
    scenes = {s["id"]: s for s in episode["scenes"]}
    lines = [f"# Asset research packet — {episode.get('title', packet['episode_id'])}", "",
             f"Created: {packet['created_at']}; discovery: {packet['discovery']}.", "",
             "**CANDIDATES ONLY — no footage rights, factual authenticity, download, or final use is approved.**", "",
             "All third-party media require human review and specific rights or exception evidence. These candidate URLs must not be rendered automatically.", ""]
    for scene_id in scenes:
        items = [x for x in packet["assets"] if x["scene_id"] == scene_id]
        lines += [f"## {scene_id}: {scenes[scene_id]['title']}", "", f"Claims: {', '.join(scenes[scene_id]['claim_ids'])}", ""]
        if not items:
            lines += ["No candidate found; use the approved original-animation fallback.", ""]
        for item in items:
            label = item["source_title"].replace("[", "\\[").replace("]", "\\]")
            url = item["source_url"]
            lines += [f"- **{item['asset_kind']}** [{label}]({url}) — {item['narrative_purpose']}",
                      f"  - Rights: **{item['rights_status']}**; factual: **{item['factual_status']}**; source: {item['publisher']}.",
                      f"  - License metadata hint: {item.get('license_hint') or 'none — not assessed'}. Exact source: {item.get('original_locator') or 'to verify'}.",
                      f"  - Fallback: {item['fallback']}"]
        lines.append("")
    if packet["warnings"]:
        lines += ["## Discovery warnings", ""] + [f"- {w}" for w in packet["warnings"]] + [""]
    lines += ["## Next human tasks", "", "1. Confirm each candidate depicts the specific subject/date/event intended.",
              "2. Record original rights holder and verify commercial reuse/license or a reviewed legal exception.",
              "3. Select shots only after editorial and rights checks; store cleared file hashes and credits.",
              "4. Use original sourced charts and illustrations when rights cannot be cleared.", ""]
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="action", required=True)
    create = sub.add_parser("build", help="build a candidate packet without downloading media")
    create.add_argument("--episode", type=Path, required=True)
    create.add_argument("--plan", type=Path, required=True)
    create.add_argument("--out", type=Path, required=True, help="output directory, preferably ignored out/")
    create.add_argument("--commons", action="store_true", help="search Wikimedia Commons metadata over HTTPS")
    create.add_argument("--limit", type=int, default=4, help="max Commons hits per search, 1-10")
    check = sub.add_parser("check", help="check selected assets for missing review evidence")
    check.add_argument("--packet", type=Path, required=True)
    args = parser.parse_args()
    try:
        if args.action == "build":
            if not 1 <= args.limit <= 10:
                raise ResearchError("--limit must be 1 to 10")
            episode = json.loads(args.episode.read_text(encoding="utf-8-sig"))
            plan = json.loads(args.plan.read_text(encoding="utf-8-sig"))
            packet = build(episode, plan, args.commons, args.limit)
            args.out.mkdir(parents=True, exist_ok=True)
            (args.out / "assets.json").write_text(json.dumps(packet, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            (args.out / "shot-list.md").write_text(markdown(packet, episode), encoding="utf-8")
            print(f"Generated {len(packet['assets'])} candidates; {len(packet['warnings'])} lookup warnings in {args.out}")
        else:
            packet = json.loads(args.packet.read_text(encoding="utf-8-sig"))
            failures = release_issues(packet)
            if failures:
                raise ResearchError("\n".join(failures))
            print("Selected-asset fields pass preliminary checks; human copyright/editorial review still required.")
    except (ResearchError, OSError, ValueError, KeyError, TypeError) as exc:
        parser.exit(1, f"STOP: {exc}\n")


if __name__ == "__main__":
    main()
