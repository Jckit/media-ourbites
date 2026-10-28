# FW-09 — adjacent transition-frame fixture QA (frozen before implementation)

**UTC finding frozen:** 2026-10-28T22:57Z. **Exact latest main:** `8733f54b6b704ffd1331f5c5639f09567a5f61af`; independent branch `review/fw09-transition-boundary-fixtures-20261028`. No access to Justin's private Windows worktree, local WAVs or uncommitted Codex edits. PR #14 already owns a separate rendered-video motion-hold diagnostic; this change does not modify it.

## Evidence and one selected feature

**Observed source/CI coverage gap (not an observed video defect):** `src/framework/FrameworkPreview.tsx` changes its parcel label from ORDER to READY at `t >= 3.1` with `t = frame / 30 * 1.1`, so the first READY frame is **85**. Existing `.github/workflows/framework-fixtures.yml` renders only frames **0, 120, 239**, missing the adjacent frames **84, 85, 86** around this deterministic text/prop state boundary. Its existing cross-preset lower-strip comparison is valid for the sampled frames but cannot detect problems during that boundary. Existing fixture PNGs were visually reviewed at 0/120/239 in `reviews/viewer/20261028T1945Z-fw09-fixture-ci.md`; no current 84–86 images have been inspected, so this is a **QA blind spot**, not a claimed discontinuity or retention problem.

**Selected one bounded technical change:** extend the *existing* fixture workflow's shared frame sample list from `0 120 239` to `0 84 85 86 120 239` for both office/storefront. Reuse exactly the same Remotion still, dimensions, lower reading-zone equality and artifact hash checks; no new animation, narrator, visual identity, financials, caption or media-rights logic. The three adjacent frames form a minimal before/boundary/after sequence, not a cut-frequency target.

**Source inputs:** `.github/workflows/framework-fixtures.yml` blob `1f8d98cb5c01d9a3555366a6dca39884285f1a7e`; `src/framework/FrameworkPreview.tsx` `aee34cf4f6d736ffb9234f1f675b47a8433117bb`; `src/framework/scene-kit.tsx` `37e012b7c0e523d3e9a855c93077eea163f2c0ec`; `src/OurbitesHost.tsx` `e8065f5080b95e3a17c5d76dcf4e5a9cadd0e260`; finance `5af2c4ec3810e5b14672afe0489af03e5c5ca53a`; narration manifest `58465eb9e82f4000e050484c01b486261790eeb4`.

## Acceptance criteria

1. A PR from exact main changes only the fixture CI workflow and this review; `src/**`, audio and financial source blobs unchanged.
2. Passing Actions fixture run renders **12 PNGs** at 432×768, two presets × frames `0,84,85,86,120,239`; all images and SHA-256 manifest uploaded.
3. Existing lower-zone cross-preset equality checks pass for all six frames, with no weakening of existing gates. Standard validation remains green.
4. Inspect **both** 84/85/86 phone-size sequences from the actual artifact for intended ORDER→READY label change, stable host identity and no visible jump/collision in sampled frames. If artifact download/inspection is unavailable, mark only code/CI verification, not visual acceptance.
5. Record actual run IDs, artifact/output hashes, inspected coverage, unresolved continuous playback/audio and human media/rights/style/factual gates. No invented retention uplift or final art approval.

**Primary guidance checked 2026-10-28:** [YouTube retention moments](https://support.google.com/youtube/answer/9314415) and [Shorts feed viewed-versus-swiped](https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en) require actual audience data; neither makes stillness or a one-frame label change inherently bad. [Remotion `--frame`](https://www.remotion.dev/docs/options/frame) and [`--scale`](https://www.remotion.dev/docs/options/scale) document exact deterministic still sampling.

## Result

Pending implementation, CI, artifact inspection. FW-06 remains in human media review, FW-07 blocked; 3/3 protagonist subjective revision cap unchanged. No new protagonist design permission inferred.
