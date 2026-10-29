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
HOST = ROOT / "src/OurbitesHost.tsx"
STAGE = ROOT / "src/CharacterStage.tsx"


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


def layout_value(source: str, name: str) -> int:
    match = re.search(r"\b" + re.escape(name) + r"\s*:\s*(\d+)\b", source)
    require(match is not None, f"Missing numeric sceneLayout.{name}")
    return int(match.group(1))


def check_sources(kit: str, preview: str, host: str, stage: str) -> None:
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
    # Fail closed if the host's SVG leg geometry changes: a constant-only
    # actorY check cannot notice when the actual foot endpoints move.
    viewbox = re.search(r'viewBox="0 0 (\\d+) (\\d+)"', host)
    require(viewbox is not None, "Missing numeric host SVG viewBox")
    svg_width, svg_height = (int(v) for v in viewbox.groups())
    legs = re.search(
        r'<path\\s+d="M\\d+\\s+\\d+\\s+L\\d+\\s+(\\d+)\\s+H\\d+\\s+'
        r'M\\d+\\s+\\d+\\s+L\\d+\\s+(\\d+)\\s+H\\d+"\\s+fill="none"',
        host,
    )
    require(legs is not None, "Host leg path changed: review grounding geometry")
    left_foot_y, right_foot_y = (int(v) for v in legs.groups())
    require(left_foot_y == right_foot_y, "Host feet must be level before anchoring")

    scale = re.search(r'height=\\{size\\s*\\*\\s*(\\d+)\\s*/\\s*(\\d+)\\}', stage)
    require(scale is not None, "StageActor host height scale changed: review grounding")
    require(tuple(int(v) for v in scale.groups()) == (svg_height, svg_width),
            "StageActor height ratio must match the host SVG viewBox")

    anchor = re.search(r"actorY\\s*:\\s*(\\d+)\\s*-\\s*(\\d+)\\s*\\*\\s*(\\d+)\\s*/\\s*(\\d+)", kit)
    require(anchor is not None, "Host actorY must explicitly anchor SVG feet to the floor")
    floor, foot_y, actor_size, width = (int(v) for v in anchor.groups())
    require((floor, foot_y, actor_size, width) ==
            (values["floorY"], left_foot_y, values["actorSize"], svg_width),
            "Host feet-to-floor anchor disagrees with sceneLayout or actual host SVG")
    require("sceneLayout.actorY" in preview and "sceneLayout.captionY" in preview
            and "sceneLayout.labelY" in preview,
            "Fixture must consume shared actor, caption and label anchors")
    require("SceneEnvironment preset={environment}" in preview,
            "Both fixtures must use the shared environment interface")
    print("PASS: shared scene geometry, actual host feet grounding and two-preset contracts")
    print("LIMIT: no pixel collision, continuous motion, audio or retention verification")



def check() -> None:
    check_sources(
        KIT.read_text(encoding="utf-8"),
        PREVIEW.read_text(encoding="utf-8"),
        HOST.read_text(encoding="utf-8"),
        STAGE.read_text(encoding="utf-8"),
    )


if __name__ == "__main__":
    try:
        check()
    except (AssertionError, OSError) as error:
        print(f"FAIL: {error}", file=sys.stderr)
        sys.exit(1)
