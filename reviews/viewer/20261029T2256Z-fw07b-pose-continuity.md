# FW-07B — frame-boundary host pose continuity (frozen before code change)

**UTC inspection:** 2026-10-29 22:56Z (approximate). **Scope:** one deterministic transition of the **existing** hybrid host's already-authored poses in the *silent synthetic* `HybridEditorialPrototype`, not a new character design or episode.

## Exact evidence and provenance

- Latest remote `main` observed at `8a0e634a0ff9bfb857ceca887f4dbf7979fc501e`; PR #30 code/head at `dfe2f62fb6dee19e6be5eb3ffead3378af3704ea` when claimed. No Windows worktree or uncommitted Codex files accessible.
- Source `src/framework/HybridEditorialPrototype.tsx` blob `013724b7030961725c3aeaf064889023ce7a5b22`; canonical `src/OurbitesHost.tsx` main blob `e8065f5080b95e3a17c5d76dcf4e5a9cadd0e260`.
- **Actual encoded source:** GitHub Actions `40957425676`, artifact `12933074907`, ZIP SHA-256 `c0f77b8032e73140381f7eb355d1301d3cc057e6fded40ae425e6213d398e6e3`, MP4 SHA-256 `232fd096318ff1791dfbd61435663a80a0489d4d150052aae806ea6ea1d8783a`. H.264, 432×768, 300 frames, 30fps, 10.0s, intentionally silent.
- Decoded **adjacent actual video frames** at 33–36, 66–69, 166–169 and 222–225 (not inferred from TSX). At **34→35** the host's raised left arm, face and reaction glyph appear in one frame; at **67→68** they disappear and the point pose returns; at **167→168** the right arm changes from raised point to down/think; at **223→224** the point arm jumps back. These are hard pose switches, distinct from the smooth folio/card transforms.
- Source confirmation: the `StageActor` pose is chosen by chained `t < 1.15 / 2.25 / 5.6 / 7.45` conditions. Eye gaze also switches instantly at `t=3` and `t=7`.
- Previous PR #30 art feedback and 3/3 self-directed subjective protagonist cap remain unchanged. This is a **verified mechanical discontinuity** in existing poses, not an authorization for a new expression or new design.

## Single selected technical change and acceptance

Introduce an **optional, deterministic, short blend between existing pose endpoints** in the shared host/stage interface, used **only by this prototype**. Keep the cream head, navy tuft, teal torso, exact limb proportions, all five existing poses and the current episode untouched. Keep source objects, folio timing/anchor, synthetic arithmetic (120−85=35), title/footer and the 300-frame duration unchanged.

Pass if: (1) the same four boundaries show **intermediate limb/face states**, not instantaneous arm teleports; (2) full head/torso remain opaque and no double-character ghost; (3) the same 432×768 frames (including adjacent pairs) and complete MP4 are decoded and inspected; (4) TypeScript, layout and Python checks pass; (5) hashes, regressions and limitations are appended. One repair maximum. **If render/inspection is unavailable or worsens the visual, leave the patch unapproved and do not merge.**

Human style/readability and continuous-viewer-motion review are **not** supplied by this engineering fix. FW-07B remains in review; FW-07C and FW-08 blocked. No changes to Kokoro am_puck Voice A at 1.1×, Dario, Anthropic claims, third-party media, rights or release approval. Official YouTube retention guidance: https://support.google.com/youtube/answer/9314415 and Shorts analytics: https://support.google.com/youtube/answer/12942217 — neither measures this unpublished synthetic animation.
