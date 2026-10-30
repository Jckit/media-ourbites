# FW-07B — folio source-label release during cutout extraction

**Frozen before implementation:** 2026-10-30 ~02:50 UTC. **Base:** latest checked `main` 8a0e634a0ff9bfb857ceca887f4dbf7979fc501e; stacked on isolated `review/fw07b-pose-boundary-qa-20261030` (PR #32), itself stacked on PRs #31/#30. **No Windows checkout or uncommitted Codex files accessible.**

## Actual observed finding, not a retention prediction

Independently decoded the user-attached current PR #31 `fw07b-pose-continuity-preview.mp4`, SHA-256 `86a46cbf155680e0d69e1f0245fb423cb1c66cb7367b3c28032697173d5b10e8`, H.264, 432×768, 30fps, 300 frames, 10s, silent. The PR #32 verified CI video uses unchanged runtime code (its source SHA-256 `HybridEditorialPrototype.tsx=ee5b888527ce7c6ba4900260417249cd0da047cc18718ec812ece9d1d9ebc513`).

At actual frames **104–120 (3.47–4.00s)**, the physical folio remains semitransparent and the original printed `SHOP NOTES / HOW MUCH REMAINS?` and `SALES RECEIPTS +120 / COSTS · 85` remain readable **behind** the separately emerging `SALES +120` and `COSTS −85` cutouts. This creates multiple simultaneously readable representations of the same explanation; particularly visible at frames **108, 112, 116, 120**. These are actual decoded images, not inference from TSX. The original folio/paper can remain visible, but source words should relinquish reading priority when the detached slips take over.

Source confirmation: `src/framework/HybridEditorialPrototype.tsx` blob `6bef106feda4e2613fbed5101c79886703e2b05c`, existing folio group fades `1-curve(t,3.1,4.45)`, while the detached sales/cost slips fade in during `3.0–4.15` and `3.55–4.65`. The long overlap creates ghosted text.

## One bounded change / acceptance criteria

**Only** shorten the fade of the *printed information within the existing folio* as the slips emerge; preserve the folio's physical paper, hinge, shared grip, source card positions, existing host poses/gaze, scene duration, colors, synthetic 120−85=35, typography, final payoff and source/caption/footer overlays. No protagonist subjective redesign or new art. No change to accepted FW-06, Dario, audio or finance.

Acceptance: matched actual 432×768 frames at 90, 100, 104, 108, 112, 116, 120, 124, 128, 136 and 150 show (1) original folio printing visible before extraction, (2) old source words no longer compete after the slips become the focal read, (3) physical folio and two cutout identities still continuous, (4) no newly blank/abrupt distracting frame or loss of the question, (5) no host, footer or label collision. Render and inspect the **complete 300-frame** silent candidate, run existing TypeScript/layout/Python and artifact hash checks. If candidate fails, one repair at most; no merge/approval.

**Evidence tier:** observed technical duplicate reading at exact frames; reducing reading competition is an editorial *hypothesis*, not a measured YouTube retention effect. Official [YouTube retention](https://support.google.com/youtube/answer/9314415) and [Shorts analytics](https://support.google.com/youtube/answer/12942217) require published-video data. Remotion [frame-driven rendering](https://www.remotion.dev/docs/flickering) is the technical basis for deterministic comparison.

**Gates:** FW-07B still needs human style, readability and pacing approval against the Instagram reference. FW-07C and FW-08 remain blocked; protagonist 3/3 subjective cap unchanged. Keep original-pitch Kokoro am_puck Voice A at 1.1x, silent illustrated Dario, net loss ≠ cash spending, operating loss ≠ cash burn, other charges, rights, likeness and human final-media/publication gates. No release.
