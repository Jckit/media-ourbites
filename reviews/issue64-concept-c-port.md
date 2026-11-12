# Concept C — isolated port and second acting proof

Date: 2026-11-12. Temporary repository until 2026-12-01: Jckit/media-ourbites.
Origin: [source draft PR #65](https://github.com/jcbandc-arch/media-creator-outbites/pull/65), exact head `4e0d6c28833b7a9a4e895bfaa7f93df7b756cd06`.

Human selection: **C rather than D**. This port intentionally excludes historical A/B/D explorations and never replaces the existing production host.

This change provides:
- Selected 2D Concept C presenter, preserving its existing five authored poses;
- 5-second matched-pose current/C comparison and fictional price-tag cameo;
- 4-second fictional €20 → €40 test with synchronous amount and before/after label;
- **NEW 5-second receipt test** with a different scene-scale target (actor space x325,y224), gaze-before-reach, delayed value change, and a visible 28-frame arm release;
- Two-target regression exercises of the shared `pointTarget` actor coordinate. No copy/paste of a separate host design, no 3D.
- Dedicated temporary-repository Actions CI: typecheck, layout, phone-scale H.264 render/probe and artifacts.

Creative limitations: The second test is a synthetic scene. A rendered pass does not establish natural live playback, source-media rights, audience retention or readiness to replace the canonical host. Review at 1×, looking for arm/hand pops, collisions with fee value and unreadable labels. Production `src/OurbitesHost.tsx`, episode, approved finance and narration remain untouched.

Do not merge or publish without human character/motion approval. Source PR #65 remains unmodified. Move future development through this temporary draft PR until original Actions allowance resets.

## 2026-11-12 rendered frame review and layout repair

First successful temporary-repo CI: [run 43223725907](https://github.com/Jckit/media-ourbites/actions/runs/43223725907), [artifact 13946279516](https://github.com/Jckit/media-ourbites/actions/runs/43223725907/artifacts/13946279516). TypeScript/layout and the 4s+5s+5s Remotion proofs passed. Encoded video frames were inspected at f10/35/60/78/89/90/109 for the price interaction and f10/35/60/85/94/110/130 for the receipt interaction. Price before/after labels change atomically, and the selected character remains intact.

**Observed defects in new receipt proof:** subtitle collides with three-line heading, and pointing finger intersects "SERVICE FEE" text. Corrected subtitle top coordinate (478 → 572) and target (x325,y266 → x325,y224) to contact the receipt's dashed separator rather than the text. Re-render and inspect the repaired frames before creative approval; actual full-speed animation and narration remain unassessed.

**Re-render QA:** [temp Actions run 43224255863](https://github.com/Jckit/media-ourbites/actions/runs/43224255863) succeeded after the repair, [artifact 13947755995](https://github.com/Jckit/media-ourbites/actions/runs/43224255863/artifacts/13947755995). The encoded receipt f35/f60/f85/f94/f130 confirms the subtitle now sits below the heading, the hand acts near the dashed separator, the fee amount/label change together at f94, and the arm retracts by f130. **Residual visual critique:** at f85 the palm still crowds the left edge of the fee row, and the scene still reads as an isolated infographic rather than an accepted cinematic shot. Keep draft and do not promote to canonical. This is sampled-frame QA, not 1× full-speed motion approval.
