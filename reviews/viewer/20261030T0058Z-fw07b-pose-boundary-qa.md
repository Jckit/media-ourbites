# FW-07B — protect the verified host pose fix with actual boundary-frame QA

**Frozen UTC:** 2026-10-30 00:58Z, before workflow edit. **Most recent `main` checked:** `8a0e634a0ff9bfb857ceca887f4dbf7979fc501e`. **Isolated parent:** `review/fw07b-pose-continuity-20261029` (draft PR #31, stacked on #30). No private Windows checkout, dirty local Codex state, WAVs or uncommitted files were accessed. This is one QA feature, **not** another subjective protagonist revision.

## Evidence, not a retention or style claim

- Actual attached corrected synthetic video `fw07b-pose-continuity-preview.mp4`: SHA-256 `86a46cbf155680e0d69e1f0245fb423cb1c66cb7367b3c28032697173d5b10e8`, matching PR #31's independently verified media record. Independently probed H.264, 432×768, 30 fps, 300 frames, 10.0 s, silent. Sampled 24 frames across opening, folio, cutouts, wipe and payoff; the host retains cream head/navy tuft/teal body/thin limbs.
- PR #31's [frozen finding](20261029T2256Z-fw07b-pose-continuity.md) identified **four observed original jumps** at frames 34→35, 67→68, 167→168 and 223→224; PR #31's corrected media was independently checked at those pairs. The current video decodes without error. A simple full-frame pixel-delta diagnostic on the current video gave pixels changing >100 in any channel of 404, 700, 513, 2892 respectively; these numbers are **not** a visual quality score and include unrelated scene movement.
- Source-only reproducible **QA gap** in `.github/workflows/hybrid-editorial-review.yml` (Git blob `b6bc4fbb47c3d116aa7f5221345b58206869dd36`): its `pull_request.paths` includes the prototype and tests, but **not** `src/OurbitesHost.tsx` or `src/CharacterStage.tsx`, even though PR #31's fix changed both. A future host-only change could avoid this exact video workflow. Its sampled frame list `0 12 26 40 54 65 82 96 111 122 137 151 168 185 196 205 219 232 247 260 274 299` misses complete adjacent pairs at all four confirmed boundaries.

## One bounded source change and acceptance

Update **only** the existing review workflow: (1) trigger when either shared host/stage file changes, and (2) export before/after and neighboring **actual 432×768 decoded frames** around each of the four documented pose boundaries. Preserve the complete 300-frame H.264 render, exact synthetic 120−85=35, host geometry, shot timing, captions/source strip, all existing fixture checks, artifact retention and source/media SHA manifests. No runtime source or user art changes.

**Pass criteria:** workflow YAML remains valid; its path filter covers host/stage; frame export includes 33–36, 66–69, 166–169 and 222–225; exact-code GitHub CI renders/exports the complete silent MP4 and all boundary PNGs; all expected output hashes recorded and sampled same phone-size before/after frames inspected (unchanged render expected, allowing encoding variance). If CI is inaccessible, report partial validation and leave the patch unverified; do not claim a new visible animation improvement.

**Human gates:** PR #31's technical pose fix remains under review; FW-07B overall **style, pacing and readability not approved**. FW-07C and FW-08 blocked. FW-06 framework acceptance stays valid; protagonist subjective cap 3/3 remains consumed. No change to Anthropic financial meanings, Dario, original-pitch Kokoro am_puck Voice A / 1.1×, actual narration/captions, rights, likeness or release. Official YouTube [retention](https://support.google.com/youtube/answer/9314415) and [Shorts metrics](https://support.google.com/youtube/answer/12942217) require actual published-viewer data, not synthetic-video CI. Remotion [frame-driven APIs](https://www.remotion.dev/docs/api) support deterministic inspection.

## Outcome

Pending exact-code CI and artifact inspection. Do not mark this QA task verified until those checks complete.
