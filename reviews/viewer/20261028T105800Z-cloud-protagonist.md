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
