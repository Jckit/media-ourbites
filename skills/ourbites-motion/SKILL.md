---
name: ourbites-motion
description: Design, implement and review reusable Ourbites 2D-first motion components, paper-collage cutout sequences, kinetic typography, object interactions and motivated modern transitions within Remotion. Use after production has chosen a shot treatment; do not invent episode facts, alter canonical characters or approve final art.
---

# Ourbites motion authoring

## Current visual contract — 80% reference editorial motion, 20% Ourbites identity

Read the [revised canonical style](../../styles/OURBITES-HYBRID-EDITORIAL.md) **first**. The older October 29 combined hybrid/scenic/paper-room treatment was superseded by November 1 human review: its rendered result remains too PowerPoint-like. **Use the supplied editorial-montage reference for roughly 80% of the visual/motion vocabulary** and retain the unchanged recognizable Ourbites host/colors as roughly 20% supporting identity. The sample's animated typographic rhythm, evidence/UI choreography, motivated visual match cuts and multiple velocity profiles matter more than graphic complexity. No fixed setting or folio in every shot. Prior `DocumentFocus` and `HybridEditorialPrototype` are technical/baseline evidence only; never confuse CI or a merged prototype with a human-approved look. Strategy: a visually convincing reference-led 10s prototype → actual continuous review and human approval → reusable motion components in a different mechanism → FW-08. Do not authorize character redesign, publication or a reusable library entry on this direction alone.


## Authority and inputs

Start from the **latest current repository/branch**, read `ROADMAP.md`, [the editorial paper-collage motion language](../../styles/OURBITES-EDITORIAL-PAPER-MOTION.md), [Ourbites hybrid/2.5D identity](../../styles/OURBITES-HYBRID-2.5D.md), [Ourbites production](../ourbites-production/SKILL.md) and any current scene/PR review. Honor file owners, the existing viewer-loop lock and pending dependencies. **FW-06 was accepted by the user on 2026-10-29 for the corrected scenic framework prototype** ([evidence](../../reviews/20261029-fw06-human-acceptance.md)); **FW-07 is ready**, but must be claimed on an independent branch before editing. Do **not** modify that accepted Anthropic episode as a prerequisite to new paper-motion fixtures or treat a recurring automation as fresh aesthetic approval.

**Purpose:** make visual ideas reusable across episodes and scenes. A shot may choose `scenic`, `editorial-paper` or `precise-data`. This skill governs how motion is implemented once the shot plan establishes **what the viewer needs to learn**; it does not prescribe a story formula or force motion into every shot.

## Keep the channel recognizable

The recurring host stays the existing cream circular head, angular navy tuft, teal torso and thin ink limbs, with deliberate face/gaze/gesture. This user direction adds a **paper/collage motion treatment**, not new permission for repeated subjective protagonist redesign. Preserve current hand/grip continuity, Dario's silence, narration at original-pitch `am_puck` Voice A / 1.1x, actual word-caption timing, precise business values and caveats, source/rights gates and human final-media review.

The Instagram reference is provided only as observed stylistic inspiration; **never** copy or redistribute its original graphics, branded images, typography layouts, textures or audio.

For authored curves, contact, paths, masks or camera continuity, selectively load the [motion craft adapter](../../.agents/skills/ourbites-motion-craft/SKILL.md). It provides design techniques; this skill retains architecture and reuse gates.

## Editorial-first and captions (2026-11-01)

The user's actual visual judgment of merged FW-07B was **directionally positive but not style approval**: transitions and animated graphics still feel too PowerPoint-like. The primary target is now the supplied editorial motion reference, not a compulsory illustrated-room composition. Preserve the canonical host as one supporting instrument. Use distinct spatial/temporal Bézier curves, offset staging and continuity of velocity, not a shared smoothstep or generic growing rectangle. See `styles/OURBITES-HYBRID-EDITORIAL.md`.

New narrated scenes use **true measured word-level timing**, reveal individual words on their utterance and apply selectively authored person/company/emphasis treatments through `src/framework/captions/`. The existing phrase-level source cues do not meet this contract and must not be relabeled as word-aligned. Licensed local company logos only; styled text otherwise. Seed only non-semantic background irregularities and optional decorative motion offsets; renders must be deterministic.

## Implementation boundary

- Reuse `src/framework/scene-kit.tsx`, `src/CharacterStage.tsx` and `src/OurbitesHost.tsx` rather than writing a new unrelated graphics pipeline. The proposed `src/framework/motion`, `src/framework/visuals` and `src/framework/transitions` modules in the style document **do not yet exist**; create only the minimum that a claimed roadmap task needs.
- Split **graphic primitives** (e.g., a paper card or circle), **frame-driven behaviors** (enter, focus, hold, unfold, exit), **anchors/ownership** (which object a hand or focus follows), and **episode beats** (the authored what/when). Avoid embedding topic data, script wording, source timestamps or branded assets inside shared primitives.
- Choose a single focal target and keep foreground, caption and source safe areas outside unstable scene camera transforms. Define parent-child coordinates and z-order explicitly to prevent object/hand teleportation and label collisions.
- Build smooth, **motivated** transitions such as focus-to-document, paper-edge reveal, shared-card morph, directional slide or short dissolve. Do not use random transitions, constant jitter, indiscriminate spring bounce, ungrounded 3D or artificial cut-frequency quotas.
- Implement deterministic animation in Remotion using `useCurrentFrame()`, `interpolate()`, `Easing` or `spring()`. Respect installed package versions and licenses. If introducing `@remotion/transitions`, verify availability first; **scene overlaps shorten total timeline duration** and require explicit narrated timing treatment.

## Delivery contract for a small batch

1. **Freeze** the source/visual finding, exact branch/source hashes, user direction and acceptance before changing code. This skill itself is not a new subjective revision permit.
2. Add **one coherent reusable motion primitive or transition** with typed props and a clearly documented API. Keep episode facts and identity outside the library.
3. Demonstrate **two meaningfully different uses** (e.g. an accounting filing and a shop receipt), using existing synthetic fixtures or safe new synthetic compositions. Do not merely recolor the identical example.
4. Render matched **432×768** preview frames before, during and after action boundaries, including adjacent frames; inspect actual animations in continuous playback when possible. Run typecheck, existing numerical/audio/source guards and relevant fixture regression CI. Log source/output hashes, open QA gaps and reviewer decision. A still proves a sampled frame, not easing or playback quality.
5. Preserve human art, likeness, rights, factual and publication gates. Technical success or pleasing movement is **not measured Shorts retention improvement**. Report unverified aspects honestly and leave the task in `review` if needed.

## First candidate batch (not yet implemented)

Propose a **document → magnifier focus → excerpt card** interaction on a paper/evidence-board setting, sharing anchor and camera intent. Prove the same motion with two different kinds of content, then add paper-edge or shared-element transitions only if the first action reads well on a phone.

**FW-07 is ready, not yet implemented**: it owns reusable actions/attachment anchors and the first paper-motion component. **FW-08** owns narration-driven choreography, treatment selection and smooth transitions; **FW-09** expands QA; **FW-10** proves reuse in a second real business mechanism. FW-06's scenic production integration is **complete and human accepted only within its framework gate**; it is not a release approval or fresh subjective protagonist redesign authorization.

For exact aesthetic terms, focal hierarchy, suggested prototype timings, transition types and prohibited imitations, follow the canonical [style spec](../../styles/OURBITES-EDITORIAL-PAPER-MOTION.md).

## Paper-collage authoring route

For editorial-paper shots, use [ourbites-paper-collage](../ourbites-paper-collage/SKILL.md) for composition and adaptable animation recipes. It does not require a sample clip or a fixed seven-second sequence. This motion skill retains responsibility for implementation, anchors and verification.
