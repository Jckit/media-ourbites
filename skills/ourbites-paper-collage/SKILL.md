---
name: ourbites-paper-collage
description: Author original Ourbites editorial paper-collage scenes and reusable Remotion motion recipes, including composition, evidence focus, shared-object extraction, paper reveals and expressive typography. Use when a shot selects editorial-paper; not for generic reference-video analysis or forcing every episode into one template.
---

# Ourbites paper-collage authoring

## Optional shot treatment

Use this skill only when the director ticket selects paper. The [canonical visual contract](../../styles/OURBITES-HYBRID-EDITORIAL.md) owns channel direction and host policy; neither an illustrated room nor paper handling is mandatory.

Make original paper objects behave as connected editorial cutouts. Explain a business idea through a composed scene, focal hierarchy and purposeful object movement. Tape and torn edges alone do not establish the style. This is a production recipe; no sample video, fixed duration or exact imitation is required.

## Choose the explanation before the effect

Read the current [roadmap](../../ROADMAP.md), active branch/PR ownership, [production skill](../ourbites-production/SKILL.md), [motion implementation skill](../ourbites-motion/SKILL.md) and [style vocabulary](../../styles/OURBITES-EDITORIAL-PAPER-MOTION.md). Reuse existing work before adding components. Status and approval live in current review records, not in this skill.

Specify the reading goal, focal object, information that changes, destination of attention and protected overlays. Select only the actions that express that change:

| Reading goal | Possible composition and action |
| --- | --- |
| Find an important qualification | Evidence stack → focus a named row → lift its excerpt into explanation |
| Compare two offers or costs | Two paper exhibits → align comparable rows → reveal the difference |
| Explain a process | Envelope or folder → unfold ordered cards → emphasize the relevant step |
| Show a relationship | Related exhibits → anchored connector or shared label → consolidated takeaway |

These are alternatives, not mandatory plots. A precise chart or a still reading hold may be clearer. Keep facts, qualifications, examples and source provenance episode-owned. Label invented documents as illustrative; do not present an authored cutout as an authentic scan.

## Compose the whole scene

- Establish one dominant focal object with quieter supporting exhibits. Use overlap, scale and authored placement to suggest a coherent evidence board, desk or clean paper field. Each supporting exhibit must add context rather than decorative density.
- Plan the initial arrangement, information-changing moment and payoff together. For a new visual direction, render representative style frames first; inspect their hierarchy before building transitions. Do not mistake an isolated component demo for proof of the full scene style.
- Preserve the existing cream face, navy tuft, teal torso and ink limbs of the hybrid host. Give it a deliberate scale and role: inspect, react, point or explain. It can lead a composition or support a reading moment; avoid a permanently small mascot stuck beside every scene.
- Use existing brand tokens: warm ivory, restrained tan paper backing, navy type, teal focus and selective orange emphasis. Optional material details include offset sheets, tape, folds, pins and cut edges. Keep contrast clear; avoid global texture obscuring text.
- Use a stable layer hierarchy: background/board → supporting papers → source → focus/extracted object → purposeful foreground/host → independent titles, captions and source labels. Adjust occlusion deliberately when an object passes in front of another.
- Let typography carry emphasis: a large question or claim, quieter evidence text, and a concise payoff. Animate selected words or emphasis only when their appearance advances meaning. Kinetic titles are not narration captions.

## Implement object continuity

Use deterministic Remotion frame-driven transforms with clamped interpolation/easing. No CSS animation, runtime randomness or unrelated renderer is needed. Maintain one logical content ID and named bounds for each semantic object.

### Focus on evidence

Derive the target from the row's current rendered bounds, including parent translation, scale and rotation. Define whether bounds are document-local, world-space or screen-space, and convert once. A focus viewport must reveal or enlarge information; a decorative ring around unchanged readable words is insufficient when the scene promises discovery. If implementing optical magnification, clip a transformed copy of the source into the lens; otherwise label the behavior an authored focus/reveal.

Travel to the target, settle, then allow reading. Release the lens near extraction start so it does not remain attached to an empty row. Keep its outline/handle outside key text.

### Lift a shared excerpt

At extraction start, the card must exactly match the source row's rendered rectangle. Interpolate center, size and rotation to the destination anchor while keeping text, units, period and qualifiers intact. Use one owned object or a precisely coordinated visibility switch; never show duplicate statements during reparenting. Add a small shadow/tilt to explain separation, not arbitrary bounce.

Hands, connectors and gaze follow named object anchors. Do not separately hardcode points that drift as the source or camera moves.

### Hand off a paper surface

Place the incoming page behind the outgoing board. Use a progressive full-surface clip/mask for a torn, folded or sliding paper edge. Derive edge geometry from the live sheet dimensions; it must cover the full revealed surface throughout scaling. Keep the shared excerpt above both surfaces so the viewer can follow it into the explanation. Protect important text from the moving mask.

Choose this transition only when moving to the new surface helps the explanation. A document extraction does not always need an additional scene reveal.

### Settle and explain

Let the destination stabilize before drawing an underline or revealing the takeaway. Anchor emphasis to the actual text/shape bounds. Preserve reading time; do not add idle bobbing to fill a hold.

## Timing and reuse

At 30 fps, useful starting trials are 8–18 frames for a small sheet entrance, 12–24 for focus travel, 20–45 for excerpt extraction and 12–22 for a paper reveal. These are tuning ranges, not measured properties of a reference or mandatory cadence. Readability, travel distance and real narration determine timing.

For narrated production, use approved audio and measured word/phrase cues. Preserve established original-pitch am_puck Voice A and 1.1× playback. Do not squeeze narration into a seven-second fixture. Account explicitly for sequence overlaps and resulting composition duration.

Keep content/layout/timing configuration outside primitives. Conceptual responsibilities may include paper stack, named document row, focus viewport, excerpt transform, paper-edge mask and marker stroke. These names are not promised exports; inspect the active repository and [framework documentation](../../src/framework/README.md). Create only the minimum abstraction demonstrated by the current scene.

Prove reuse with two materially different mechanisms and configurations: for example a wide filing and a tall receipt, or a comparison board and an ordered process. Vary text length, target position, document proportions and timing. Renaming or recoloring one example is not sufficient.

## Verify the result

1. Claim ownership and use the documented exclusive lock. Freeze the finding, source hashes and acceptance criteria before editing; preserve unrelated work.
2. Render at 432×768. Inspect initial/focal/payoff layouts and adjacent frames at focus release, extraction/reparenting and reveal boundaries. Compare matching before/after moments for revisions.
3. Watch the full preview at normal speed to judge hierarchy, reading time, rhythm and continuity. If only stills were inspected, explicitly leave motion quality unassessed. Silent fixtures cannot establish voice/caption synchronization.
4. Run TypeScript and relevant existing source, geometry and caption guards. Inspect actual text clipping, duplication, host/prop collisions and protected overlays; green CI is not visual approval.
5. Record implemented interfaces, two scenario outputs/hashes, inspection coverage, tests and unresolved issues. Seek human visual judgment when establishing or correcting the style. Do not mark the framework feature complete from one isolated effect.

When a result feels like a slide deck, revisit scene composition, object continuity, hierarchy and the information change before adding texture. When a focus reveals nothing, change the viewport or information scale. When a handoff jumps, fix coordinate conversion/ownership before tuning easing. When a cue drifts, use measured audio timing rather than percentages.

## Scope and authority

This skill describes how to author the treatment; production decides what the episode teaches, and viewer review assesses the actual media. Reference clips may inform vocabulary but are not choreography mandates or licensed assets. Use original or cleared graphics and never trace third-party layouts.

Human style acceptance is distinct from factual, likeness, rights and publication approval. Reading this skill or a repeated scheduled prompt does not reset creative caps, approve an artifact, authorize a push or permit release. Follow the current task's authorization and review state.
