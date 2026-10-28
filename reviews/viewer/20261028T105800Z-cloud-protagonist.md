# Viewer cycle — 2026-10-28T10:58Z (cloud PR, frozen before implementation)

**Status at creation:** baseline observed; selected finding and acceptance criteria frozen; **code not yet changed**. Branch `viewer/20261028-protagonist-gaze-v1` forked from immutable main commit `db6ce1fd08568281fbeb700152fda84fd334e570`. This is a cloud pull-request worktree, **not** Justin's private Windows checkout. No local dirty files were accessed or modified. PR: [#1](https://github.com/jcbandc-arch/media-creator-outbites/pull/1).

## Required context consulted

- Latest main branch/tree and viewer/production skills, including `reviews/HUMAN-DIRECTION-2026-10-28-PROTAGONIST.md`, `reviews/viewer-loop.json`, and `reviews/viewer/20261028T094251Z.md`.
- Existing closed items: purposeful Dario/accounting-card handoff, large payoff, and 310→311 grip jump repair. **Do not revisit these** without new regression evidence.
- Existing 3/3 independent subjective revision cap: Justin's 2026-10-28 explicit protagonist feedback allows **one additional** protagonist-specific bounded iteration, not repeated creative permission.
- Primary platform guidance accessed 2026-10-28: [YouTube retention moments](https://support.google.com/youtube/answer/9314415?hl=en) and [Shorts viewed vs swiped](https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en). These **do not prove** gaze animation raises retention; the choice is based on the observed character-action mismatch.

## Real baseline visual evidence

[GitHub Actions run 40675887094](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40675887094) rendered `AnthropicCharacter` from **current main source** as nine exact original 432×768 frames: `30,100,150,220,310,311,325,450,499`. The before/after artifact was inspected in the cloud at the exact frame sizes; initial paired images intentionally match source.

Observed: at frames **100 and 150**, host's eyebrows/question reaction and wallet coexist with Dario's orange pointer to the filing, but host's eye positions remain the fixed SVG centers. At **220**, host's pointing arm leads toward the right, but eyes remain forward. At **450/499**, the host points while the payoff `Reported loss is not cash spent` is visible, yet the expression/eyes don't register a change in attention toward that explanation or back to the viewer. This is an *observed expression-direction mismatch*, not measured audience churn. The hybrid face, Dario's silent illustration, financial props, and legible headline remain intact.

- **One selected finding:** fixed host gaze dilutes motivated attention direction in the verified character-led story. Severity low-to-medium, confidence high **for the sampled frames only**.
- Editorial rubrics (not retention): character visual identity **3/4**; purposeful eye/prop attention **2/4**; full-motion **N/A**; audio **N/A**; measured retention **N/A**.
- Unchanged code base: `src/OurbitesHost.tsx` Git blob `2b5808d9d7e429ccf422c4f863fc3d3e343d8cf6`, `src/CharacterStage.tsx` blob `f55a70595d456e4731fdfacfca379ccbd4322745`, `src/AnthropicCharacter.tsx` blob `6dcbb7a887a738f03b2a35acff9fae6a1257999d`. Other source/voice/finances unchanged. Baseline artifact contains per-frame SHA-256 in `frame-sha256.txt`.

## Frozen hypothesis / acceptance criteria

**Make one bounded expressive feature:** host pupils (and optionally minor eyebrow pose only if required) smoothly direct attention **toward the real filing and Dario's accounting card** during questioning and explanation, then return forward at the closing takeaway. Preserve original head geometry, ink hair tuft, cream head, teal shirt, limbs, size, outlines and all other actors. Use existing story time and `tween` interpolation instead of arbitrary autonomous animation. No hand grip changes.

Accept only if:
1. Host's changed eye direction is **visibly readable** on newly rendered 432×768 frames **100/150/220** compared with same baseline moments; target is filing/Dario, not a random glance.
2. During payoff **450/499**, pupils return to a forward-facing settled expression; no sudden cut at sampled handoff frames **310/311/325**.
3. No new overlap with legal/disclosure text, source numbers, captions or Dario's face/arm; accounting amounts and caveat intact. Face design clearly still hybrid.
4. `npm run typecheck`, existing Python unit checks and the isolated GitHub before-vs-after frame comparison pass; no changed narration, Voice A, `playbackSpeed=1.1`, sourced financial JSON or rights metadata.
5. Review and hash real output frames, not code-only inspection. If comparison shows no convincing improvement or a defect, allow one repair attempt, then restore **only** the cycle's patch. **Do not mark a subjective art approval or actual retention improvement.**

## Unresolved historical backlog (held, not reset)

1. Continuous motion/audio listening review of `AnthropicCharacter`, including 1.1× original-pitch `am_puck`, remains unverified by sampled stills.
2. Phone-sized secondary caveat/prop text hierarchy requires a concrete visual defect before further changes.
3. Once this user-directed protagonist-specific change is reviewed, additional self-directed subjective iterations remain capped until fresh human feedback.

**Implementation results and output hashes:** append after CI rerender and inspected artifacts, never beforehand.

## Implemented and actually verified — 2026-10-28T11:02Z

**Change batch (one coherent feature, three related files):**
- `src/OurbitesHost.tsx`: add optional bounded `gazeX/gazeY` values (±12/±9 SVG units), moving both existing pupils only; **no** change to face outline, eyebrows, hair, clothing or pose/silhouette.
- `src/CharacterStage.tsx`: pass these optional values through existing shared `StageActor` (default zero means other videos render unchanged).
- `src/AnthropicCharacter.tsx`: interpolate host gaze up/right toward the S-1 during questioning, right/level toward Dario's accounting explanation, and smoothly return to forward-facing attention before the closing payoff. No edits to shared grip, Dario, captions, narration, finance, audio or voice settings.

**Cloud verification:** [GitHub Actions #40676453311](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40676453311), commit `98000a836e1c51456b981873b8228ccefe89f813`, **success**. Python unit tests, character checks and `npm run typecheck` passed. The same workflow used isolated `git show` of **base SHA** for the before render, restored the branch sources for after, and rendered nine equal timestamps for each at **432×768** with exact source and output hashes in artifact `viewer-protagonist-before-after`. Isolated runner did not touch a personal workstation or push an export.

The actual PNG artifacts were downloaded and **visually inspected** side-by-side, including close-ups of the fictional host's face. At frames 30, 100 and 150 the host's pupils visibly move up/right toward the filing; at frame 220 they remain rightward toward the explanation; at 310, 311 and 325 gaze stays steady through the original financing card interaction; at 450 and 499 pupils return to the exact pre-change forward positions. No new face/prop/source-caption overlap is visible in these sampled frames. Original financial labels and payoff remain on screen. No repair was needed.

**Limited pixel-level comparison:** changes at frames 30/100/150/220/310/325 are localized to the host's eyes (approx. 257–312 changed pixels per frame, within host face). Frames **450 and 499 are byte-identical** before versus after, confirming restored forward gaze and unchanged payoff. Frame **311** has some additional raster differences outside the face (including the fading finance card), so no claim of full frame-by-frame motion identity is made there; the grip visually remains in position in the sample. Actual video continuous motion and audio **were not reviewed** by this CI pipeline, which produced phone-size stills only. This is visual/structural evidence, not a tested retention uplift or a fully approved master.

Example exact SHA-256 output hashes (all nine in the artifact's `frame-sha256.txt`):
- before/100: `ddf75838c31bc02968a12b23702c710800811680df9fbad974aa854cdcfb7d2f`; after/100: `ebe85974383d083082a5eef07ad1a6542d68eab26182d5da7e7465eb2b7f2412`
- before/220: `7558a74f67e95d1c2e43c0ebef85170f94a4c9fc49c4f5633d4f7ff684dcc8bd`; after/220: `e73941af292f531bb7f7044a25262d24958b2e86182c9e211aa34e009b145099`
- before/450 = after/450: `8a75f9eb215cb2feabeac5d86ecb6866565bda0a592ac5d42b09560c2bc08375`
- before/499 = after/499: `3ba0993453c4455985c499aac9be2e86e6a5a44e85ac7596ce0a16d2a14e4f0`

Result: **one human-directed protagonist expression/gaze refinement accepted for branch review**, not merged to main. Character visual attention is editorially estimated 3/4 in inspected moments (from prior 2/4), not a performance metric. The protagonist design and Dario likeness remain unapproved; their rights and final-media gates are untouched.

**Cap accounting:** consume this October 28 explicit protagonist refinement direction once. Keep prior 3/3 independently accepted revisions; do not treat the hourly task prompt or this review as fresh human approval for further subjective changes. Technical defects may still be addressed if proven.

**Backlog after implementation:** (1) continuous playback/Voice A listening and actual caption sync on local original audio, (2) verified phone-size legibility of remaining secondary financing caveat/prop, (3) any additional subjective host redesign requires fresh user response. Do not repeat the completed gaze, Dario interaction, payoff or grip work.
