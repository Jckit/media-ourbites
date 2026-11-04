"""Create an empty episode workspace; never generate story content or approvals."""
import argparse
import json
from pathlib import Path
import re
import stat
import sys


SHARED = {
    "framework": "src/framework",
    "host": "src/OurbitesHost.tsx",
    "characters": "src/CharacterStage.tsx",
    "motion_catalog": "motion-library/catalog.json",
    "production_skill": "skills/ourbites-production/SKILL.md",
    "director_skill": "skills/ourbites-creative-director/SKILL.md",
    "viewer_skill": "skills/ourbites-viewer/SKILL.md",
}
MEDIA = ("assets/originals", "assets/working", "audio", "captions", "renders", "reviews")


def safe_path(root: Path, relative: str) -> Path:
    """Reject existing symlinks/junctions, including broken links, along a target."""
    path = root
    for part in Path(relative).parts:
        if part in ("..", ".") or Path(part).is_absolute():
            raise ValueError(f"Unsafe path: {relative}")
        path = path / part
        try:
            info = path.lstat()
        except FileNotFoundError:
            continue
        if stat.S_ISLNK(info.st_mode) or getattr(info, "st_file_attributes", 0) & 0x400:
            raise ValueError(f"Linked/reparse path is not allowed: {path}")
    if not path.resolve().is_relative_to(root):
        raise ValueError(f"Path escapes repository: {relative}")
    return path


def plan_workspace(root: Path, episode_id: str, slug: str) -> dict:
    root = root.resolve(strict=True)
    if not re.fullmatch(r"[0-9]{3}", episode_id) or episode_id == "000":
        raise ValueError("ID must be exactly three ASCII digits, 001–999")
    if len(slug) > 64 or not re.fullmatch(r"[a-z][a-z0-9]*(?:-[a-z0-9]+)*", slug):
        raise ValueError("Slug must be 1–64 lowercase letters/digits with single hyphens; start with a letter")
    episode = f"episodes/{episode_id}"
    media = f"out/episodes/{episode_id}"
    for relative in (episode, media):
        if safe_path(root, relative).exists():
            raise ValueError(f"Refusing preexisting output: {relative}")
    for reference in SHARED.values():
        if not (root / reference).exists():
            raise ValueError(f"Missing shared reference: {reference}")
    # Local media must inherit the repository's existing broad out/ exclusion.
    if "out/" not in (root / ".gitignore").read_text(encoding="utf-8").splitlines():
        raise ValueError("Repository must ignore out/ before creating working media")
    return {
        "schema_version": 1,
        "episode_id": episode_id,
        "slug": slug,
        "stage": "draft",
        "path_base": "repository-root",
        "planned_inputs": {
            "source_ledger": f"{episode}/RESEARCH-BRIEF.md",
            "episode_manifest": f"{episode}/episode.json",
            "shot_plan": f"{episode}/SHOT-PLAN.md",
            "animation_tickets": f"{episode}/animation-tickets.json",
            "asset_requests": f"{episode}/asset-requirements.json",
            "asset_manifest": f"{episode}/asset-manifest.json",
        },
        "shared_references": dict(SHARED),
        "local_media": {name: f"{media}/{name}" for name in MEDIA},
    }


def production_notes(workspace: dict) -> str:
    episode_id = workspace["episode_id"]
    return f"""# Episode {episode_id}: {workspace['slug']}

Empty draft workspace. Paths in workspace.json are repository-relative.
`planned_inputs` lists future outputs, not files or completed stages.

1. Research: select the business question (human Gate A), then produce
   RESEARCH-BRIEF.md and the sourced claim ledger in episode.json.
2. Copy: write scene narration in episode.json, the single script source;
   validate/review with pipeline.py and obtain human editorial Gate B.
3. Creative Director: read the production/director skills, produce SHOT-PLAN.md,
   animation-tickets.json and actual asset requirements. Direction remains
   provisional until Gate B. This generator does not invoke a director.
4. Assets: record rights, provenance and exact local versions in asset-manifest.json.
   Keep source bytes in assets/originals and derivatives in assets/working.
   No downloader, rights approval or renderer integration is installed by this shell.
5. Motion/narration: reference existing src/framework and character components;
   keep episode facts, geometry and timing in episode-owned inputs. Consult
   motion-library/catalog.json: candidates are not human-accepted recipes.
   Preserve selected am_puck Voice A, original pitch and 1.1x playback;
   estimated caption timings must remain marked provisional.
6. Render/review: save working exports, audio, captions and review evidence under
   out/episodes/{episode_id}; inspect actual media before human Gate C.
   Nothing here approves facts, style, rights, likeness or publication.

Track workspace.json, this handoff and real episode-owned inputs when produced.
The existing out/ exclusion keeps local media untracked. Do not commit media,
credentials or private research accidentally. Shared libraries are references;
never copy them into this episode. No placeholder script or claims were created.

Workflow boundaries: #45 owns visual/ticket contracts; #43 owns director invocation
and asset acquisition. Use their current contracts when implemented; these paths
do not claim those stages execute automatically. See ../../WORKFLOW.md and
../../SOP.md for existing production and approval procedures.
"""


def create_workspace(root: Path, episode_id: str, slug: str, dry_run: bool = False) -> dict:
    root = root.resolve(strict=True)
    workspace = plan_workspace(root, episode_id, slug)
    if dry_run:
        return workspace
    episode = safe_path(root, f"episodes/{episode_id}")
    media = safe_path(root, f"out/episodes/{episode_id}")
    episode.parent.mkdir(parents=True, exist_ok=True)
    media.parent.mkdir(parents=True, exist_ok=True)
    # Exclusive mkdir reserves the ID against another generator process.
    episode.mkdir()
    try:
        media.mkdir()
    except OSError:
        episode.rmdir()  # Still empty and owned by this invocation; no recursive cleanup.
        raise
    # On an I/O failure, leave partial output for inspection; never overwrite on retry.
    with (episode / "workspace.json").open("x", encoding="utf-8", newline="\n") as output:
        output.write(json.dumps(workspace, indent=2) + "\n")
    with (episode / "PRODUCTION.md").open("x", encoding="utf-8", newline="\n") as output:
        output.write(production_notes(workspace))
    for name in MEDIA:
        (media / name).mkdir(parents=True, exist_ok=True)
    return workspace


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--id", required=True, dest="episode_id")
    parser.add_argument("--slug", required=True)
    parser.add_argument("--dry-run", action="store_true", help="Validate and print planned paths without writing")
    args = parser.parse_args()
    try:
        workspace = create_workspace(Path(__file__).resolve().parents[1], args.episode_id, args.slug, args.dry_run)
    except (OSError, ValueError) as error:
        print(f"Workspace not created: {error}. Any partial output is retained; nothing is overwritten.", file=sys.stderr)
        return 1
    print(json.dumps({"action": "dry-run" if args.dry_run else "created", "workspace": workspace}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
