# Authored movement in Remotion

Adapted from HyperFrames motion guidance; examples below are Remotion translations, not upstream runtime code. Prerequisites: an approved shot purpose, existing coordinate/anchor ownership, known composition fps, source and destination bounds, and protected caption/evidence regions.

## Pose before curve

Author anticipation/lift → travel → contact → reading hold. Specify position, rotation, scale and elevation at each meaningful pose. Give each property one transform owner; separate camera and local object wrappers. Keep the same logical object alive during a handoff; copy neither its text nor its identity into a second overlapping substitute.

Use a long-tail ease-out for decisive arrival, ease-in-out for a camera reposition, and ease-in for an accelerating departure. Do not assign one spring to everything. Opacity and color should remain bounded; settled text stays still. Upstream's shorter exits and stagger ranges are starting hypotheses, not mandatory timing or cut quotas. Actual narration and reading tests win.

```tsx
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
const frame = useCurrentFrame();
const {fps} = useVideoConfig();
const start = Math.round(2 * fps);
const end = Math.round(3.2 * fps); // require end > start
const progress = interpolate(frame, [start, end], [0, 1], {
  extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  easing: Easing.bezier(0.22, 0, 0.32, 1),
});
const x = source.x + (destination.x - source.x) * progress;
const y = source.y + (destination.y - source.y) * progress
  - arcHeight * Math.sin(Math.PI * progress);
```

`source`, `destination` and `arcHeight` are shot-owned inputs in the same coordinate space. Check the rotated/scaled **bounding box**, not just the center, against protected text. An arc controls geometry; easing controls speed along it. Large curved paths need extra midpoint checks. For nonuniform path speed, use existing path utilities with distance-based sampling rather than assuming path parameter equals traveled distance. Do not introduce a general path engine for one shot.

## Contact is a state

Tie shadow offset/blur and lift/scale to the same elevation envelope. For clamped 0–1 lift and landing progress, `elevation = lift * (1 - landing)` returns to zero. Interpolate between grounded and elevated shadow values with that envelope; do not leave a blurred floating shadow after contact. Contact rotation/scale must settle before the reading hold. Reuse a single prop anchor for gaze, reach and grip; account for parent camera transforms before computing hands.

For a restrained spring, Remotion `spring` takes physical damping, not damping ratio: `damping = 2 * zeta * Math.sqrt(stiffness * mass)`; zeta around 0.7–0.85 is a starting point, not a guarantee. Sample overshoot and avoid it on exact data, masks or opacity. Prefer a bounded authored curve when no bounce is intended.

## Transitions and camera

A mask/reveal should originate from the object or edge that motivates it. Keep content inside a clipping wrapper and animate the wrapper/mask in frame time; protect evidence labels until they can be read. Put camera motion on the world wrapper, leaving captions/source overlays in their established screen-space layer. Do not accidentally restart media by moving it into a new Sequence.

At cuts or ownership transfers, match position **and velocity/direction**, plus scale and rotation; inspect frames on both sides. Independent eases often stop at the seam even when endpoints match. An overlap can preserve momentum, but never duplicate a claim or hide a caveat. Do not impose a transition variety quota.

## Word-level typography and seeded art direction

Narrated subtitles are not a sentence fading in: words each have measured source-clock entry and end; each word fades in on its own cue. A consistent screen-space baseline carries semantic exceptions—person names get a restrained italic/underline; company terms may include a verified and cleared local logo, otherwise typographic differentiation. Protect complete line bounds during design. Do not fabricate timings by dividing a phrase's duration.

Small seeded graphic variations may prevent cloned backgrounds or perfectly repeated paper ornaments, but keep the random-looking variation **deterministic** via stable element IDs and seeds. Never use `Math.random`, the wall clock or seed-dependent changes to the source evidence, meaning, hero anchor, factual chart, subtitle timing or identity. Natural pacing comes primarily from distinct temporal curves, continuity of velocity, anticipation and follow-through—not ambient jitter.

## Verification

Render the current composition with real assets; inspect launch, path midpoint, frames around contact, and final hold at phone size. Compare adjacent-frame displacement at seams and ensure settled properties stop changing. Then review normal-speed playback separately. Deterministic frame functions only: no CSS animation, wall clock, unseeded randomness, runtime fetch or GSAP timelines. HyperFrames data attributes, CLI keyframe inspection and motion-blur hooks are not Remotion APIs.
