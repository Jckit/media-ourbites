---
name: ourbites-motion
description: Design, implement and review reusable Ourbites 2D-first motion components, paper-collage cutout sequences, kinetic typography, object interactions and motivated modern transitions within Remotion. Use after production has chosen a shot treatment; do not invent episode facts, alter canonical characters or approve final art.
---

# Ourbites motion authoring

Read the [canonical visual contract](../../styles/OURBITES-HYBRID-EDITORIAL.md) and the selected [animation ticket](../ourbites-creative-director/references/animation-tickets.md). Validate the ticket before implementation. Use its separate spatial/time controls, contact anchor, camera owner and reading regions; render deviations must be recorded for the viewer.

## Implementation boundary

- Reuse `src/framework/scene-kit.tsx`, `src/CharacterStage.tsx` and `src/OurbitesHost.tsx` rather than writing a new unrelated graphics pipeline. Inspect existing `src/framework/motion` helpers before adding anything; no speculative engine.
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

## Paper-collage authoring route

For editorial-paper shots, use [ourbites-paper-collage](../ourbites-paper-collage/SKILL.md) for composition and adaptable animation recipes. It does not require a sample clip or a fixed seven-second sequence. This motion skill retains responsibility for implementation, anchors and verification.

## Controlled editorial 2.5D (2026-11-03)

Preserve the latest working mechanisms before adding depth. V2 replaced static filing/value cards with independently moving notes, flames/embers, a tilting balance and drawn accounting trajectory; its persistent host/Dario make the explanation more active. This is an observed design difference, not measured engagement improvement.

Use `motion/depth-motion.ts` for pure projection, spatial cubic paths and elevation/contact; `DepthPlane` for a single camera owner. Example: `depthPath(easedProgress, [start, control1, control2, end])` → `projectDepth(point, camera)`. Geometry controls the route; independently authored time easing controls speed. Units are composition pixels, positive z nearer, focal length defaults to1600. Avoid z >= 0.75*focalLength (throws). Sibling order explicitly controls occlusion; do not imply a full 3D scene or automatic depth sorting.

Assign background/midground/foreground and a focal object per shot. Start with 2–4% camera push, small pan and shallow tilt; these are authoring defaults, not quotas. Ground contact with an elevation-driven shadow; render near/far overlap to prove depth. Keep host home position, evidence caveats and word captions in screen space. Tilt mechanisms, not essential reading copy. Match adjacent transition poses; do not replace existing expressive timing with one universal ease.

Avoid: multiplying identical transforms onto every layer (no parallax), perpetual floating shadows, large camera moves that clip values, moving captions with the world, card entrances disguised by perspective, or new graphic detail as a substitute for movement. Validate matched encoded media and a distinct fixture. Current depth study remains human-review-only; provisional phrase-derived words remain explicitly unaligned.

Human correction (2026-11-03): subtle shadows alone did not deliver enough difference from V2. Use supplied grid assets as a separately moving rear plane when selected; pick color for the beat, reduce opacity behind reading zones, and verify phone readability. For mechanical comparisons, render factual values and category labels in protected foreground space, clear of pivots, beams and suspension lines throughout motion. An object being drawn last does not prevent visual collisions.
