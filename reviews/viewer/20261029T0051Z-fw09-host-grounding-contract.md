# FW-09 — source-level host feet/grounding regression guard

**Finding frozen before implementation:** 2026-10-29T00:51:37Z. Fresh GitHub `main` commit `8733f54b6b704ffd1331f5c5639f09567a5f61af` (merged PR #13). Separate review branch `review/fw09-host-grounding-contract-20261029`; private Windows checkout, Codex dirty files, local WAVs and media are inaccessible. Existing draft PRs #14 (motion-hold diagnostic), #15 (fixture boundary sampling) and #16 (storyboard footer) remain untouched.

## One observed source-level QA gap (not an observed video defect)

`scripts/check_framework_layout.py` blob `316264d06423a527854c076c0e811dd1e9f99cbf` asserts that `sceneLayout.actorY` literally contains `1420 - 475 * 430 / 360`, but does **not** inspect `src/OurbitesHost.tsx` blob `e8065f5080b95e3a17c5d76dcf4e5a9cadd0e260`. If a future protagonist pose or SVG edit moves the leg/foot endpoints away from SVG y=475, the guard can remain green while the feet no longer meet the scene floor. This is a concrete source-guard blind spot, **not** proof of current foot floating or viewer retention harm. The synthetic preview currently uses `sceneLayout.actorY` and `StageActor`.

## Acceptance criteria (pre-change)

1. Guard derives/checks the **actual two SVG foot endpoint heights** and SVG viewBox width from the existing hybrid host, and verifies both feet are level and the `actorY` grounding formula uses the current shared `floorY`, `actorSize`, foot height and SVG width. Keep approved scene/host geometry and palette unchanged; no creative revision.
2. Unit-test the current contract and mutations that move one foot, both feet or the scene floor without adjusting the anchor. These must fail with clear diagnostic messages. No new dependency or episode-specific facts.
3. Run Python unit tests, existing layout guard, TypeScript and CI fixture renders. Where accessible, compare the **same** 432×768 fixture frames 0/120/239 before and after; unchanged source visuals should be pixel-identical. If artifact inspection is unavailable, report that limitation and do not mark visual verification complete.
4. Log exact source/commit/output hashes that can actually be verified. No changes to `AnthropicCharacter`, Dario/hand-grip, financials, narration `am_puck` Voice A at 1.1x, caption timing, final rights/approval gates, or release/publishing. No retention claim.

## Research boundary

Official YouTube audience retention (https://support.google.com/youtube/answer/9314415) and Shorts feed choice (https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en), rechecked 2026-10-29, measure audience behavior after publishing; they do not prove that a geometry guard improves retention. Official Remotion render instructions (https://www.remotion.dev/docs/render), updated 2026-10-28, permit still-image and Actions-based review. This batch is technical regression prevention.

## Outcome

Pending implementation and verification. FW-06 human full playback/voice/factual/rights/style acceptance remains outstanding; FW-07 subjective motion work remains blocked. The October 28 direction is already consumed, and the 3/3 subjective revision cap is unchanged.
