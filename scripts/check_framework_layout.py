#!/usr/bin/env python3
"""FW-09: fast, dependency-free guard for shared scene-layout contracts.

This checks source-level layout assumptions, NOT actual visual safe areas.
Rendered frame comparisons and human audiovisual review remain mandatory.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
KIT = ROOT / "src/framework/scene-kit.tsx"
PREVIEW = ROOT / "src/framework/FrameworkPreview.tsx"


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def layout_value(source: str, name: str) -> int:
    match = re.search(r"\b" + re.escape(name) + r"\s*:\s*(\d+)\b", source)
    require(match is not None, f"Missing numeric sceneLayout.{name}")
    return int(match.group(1))


def check() -> None:
    kit = KIT.read_text(encoding="utf-8")
    preview = PREVIEW.read_text(encoding="utf-8")
    require("export const sceneLayout" in kit, "Shared layout contract missing")
    require("export type EnvironmentPreset = 'office' | 'storefront'" in kit,
            "Both reusable fixture presets must remain available")
    values = {key: layout_value(kit, key) for key in
              ("width", "height", "floorY", "labelY", "captionY", "actorX", "actorSize")}
    require((values["width"], values["height"]) == (1080, 1920),
            "Scene kit expects the approved vertical 1080x1920 coordinate system")
    require(0 < values["floorY"] < values["labelY"] < values["captionY"] < values["height"],
            "Floor, identity and caption zones must be vertically ordered")
    require(values["captionY"] + 170 <= values["height"],
            "Reserve at least 170 world pixels beneath caption anchor")
    require(0 <= values["actorX"] and
            values["actorX"] + values["actorSize"] <= values["width"],
            "Host bounding box must fit within the frame")
    require(re.search(r"actorY\s*:\s*1420\s*-\s*475\s*\*\s*430\s*/\s*360", kit)
            is not None,
            "Host feet-to-floor anchor changed: update grounding proof and this guard")
    require("sceneLayout.actorY" in preview and "sceneLayout.captionY" in preview
            and "sceneLayout.labelY" in preview,
            "Fixture must consume shared actor, caption and label anchors")
    require("SceneEnvironment preset={environment}" in preview,
            "Both fixtures must use the shared environment interface")
    print("PASS: shared scene geometry and two-preset source contracts")
    print("LIMIT: no pixel collision, continuous motion, audio or retention verification")


if __name__ == "__main__":
    try:
        check()
    except (AssertionError, OSError) as error:
        print(f"FAIL: {error}", file=sys.stderr)
        sys.exit(1)
