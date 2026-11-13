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

## 2026-11-12 — acting-rig repair after PR #1 review

At source head `7a9ce95b`, the review identified a single interpolated arm bend, a fixed final finger angle in intermediate path math, hardcoded receipt gaze and receipt-label occlusion. Implemented one reusable bounded rig change: `ConceptCPointRig.ts` now solves a per-frame fingertip curve, backs out the wrist at the current hand angle/extension and bends the sleeve through an articulated elbow. Both proof timelines drive gaze from the same actor-space target. The price proof retracts after the reveal; the receipt moves to x510/y910/530w with a later/lower evidence target (375,260), keeping its text column separate from the hand's travel.

Contract tests in `tests/concept-c-rig.test.mjs` check exact endpoint contact, continuous path, two joint lengths at contact, target-dependent gaze and pessimistic receipt text-column clearance. CI additionally renders both 432×768 clips. **Human visual review remains necessary**: tests cannot determine professional acting quality, media rights, comprehension or audience response. Production host and all other episode content remain unchanged.

## 2026-11-12 — object-led paper reveal (review → bounded implementation)

**Before-review evidence:** exact-head `3ecaeaac93e917ffa9d3aedc5700be1e08607d8d` encoded `acting.mp4` f0/18/35/45/60/75/84/90/102/118 and `receipt.mp4` f0/18/35/45/60/75/84/90/102/118 at 432×768. The selected Concept C is recognizable and its fingertip no longer occludes important text, but paper cards are immobile after their entrance; values simply substitute on a fixed graphic. This is a *motion storytelling* weakness, not proof of viewer abandonment. Existing typography remains legible.

**One coherent hypothesis:** keep the original persistent ticket/receipt and selected rig, but make the paper itself react after the contact beat. A reusable `PaperHingeReveal` rotates an *inset paper face* around its left edge (simple 2.5D). Before amount+status depart together, then after amount+status enter together; no overlapping contradictory pairs, replacement asset, background clutter, new character or generic full-screen wipe. Reuse the same component in price and receipt synthetic fixtures at different dimensions and states. Timing follows the existing fingertip approach/hold, then delayed facial recognition and return. `paper-hinge-motion.ts` owns pure, frame-deterministic state and separate tests check face coherence at every frame and the midpoint.

**Review gate:** check f84–101 price and f88–105 receipt from *new encoded MP4*, especially paper hinge edge-on, hands/ink contact, semantic pairing, mobile font legibility and frame discontinuities. Do not claim acceptance from passing CI, nor full-speed motion/retention from sampled frames. Production host, financial episode and original PR #65 remain untouched. The fixture still intentionally lacks narration, a verified business mechanism and a final editorial environment.

## 2026-11-12 — user elbow-motion correction (source head f8812328)

**Human review:** "The elbow animation does not look right." This supersedes automatic geometric approval of the old rig's visual bend, not the Concept C appearance selection. Before editing, inspected the latest actual 432×768 price and receipt encoded videos, including elbow crops f37/49/61/72/79/86, f96/110/118 and equivalent receipt frames. The elbow was a **hard SVG corner** from `M243 276 L elbow L wrist`. The fixed two 72-unit segment IK placed the elbow far above the shoulder-wrist axis: ~87° turn at final price contact and ~93° turn at receipt contact. This made a sharp, puppet-like triangle; the early price fingertip control point also pulled the wrist upward prematurely.

**One bounded fix:** `ConceptCPointRig.ts` now uses a small 11.5→14-unit screen-up elbow offset around the shoulder–wrist midpoint and draws the sleeve through the computed elbow using two cubic Bézier segments sharing the exact tangent at the join (C1 continuity). The fingertip follows the same target but takes a restrained, midpoint-directed arc that avoids mid-reach forearm folding. Existing facial acting, target/gaze contract, paper hinge, receipts/prices and static pose silhouettes are preserved. No new style or episode.

**Automated regression:** `tests/concept-c-rig.test.mjs` now samples 101 normalized frames for **both** targets, checking elbow angular bounds, segment length bounds, elbow/fingertip frame-to-frame continuity, curved SVG sleeve path, exact final contact, gaze and text clearance. Workflow renders targeted before/after elbow frames for human QA. A geometry test or green CI is not a claim that motion feels natural; compare actual encoded frames and 1× playback before promotion.

## 2026-11-12 — outfit refinement (selected Concept C)

**Review before edits:** inspected the latest exact-head `2746d29e` pose-0 432×768 comparison, matched scene-scale cameo and host SVG. The prior overshirt is visually a heavy blazer: a high-contrast white wedge runs from neckline to bottom hem and reads like a tie; oversized V-lapels/pocket/button details compete in the tiny host silhouette. The ink-black sneakers blend into equally dark trousers. These are visual hierarchy concerns, not evidence of viewer retention.

**Bounded implementation:** preserve the user's selected Concept C face, head, ink/cream/teal palette, jacket outline, trouser/foot coordinates, sleeves/hands, rig and all five pose compositions. Replace the long white V with a short cream crew neckline; simplify the oversized lapels into compact tonal overshirt collar tabs; replace multiple strong seams with a narrow placket and quiet shirt/pocket/hem details. Contrast the existing trainer shapes with a light fill and ink outline, keeping the exact shoe geometry. The single orange stitch tab is a restrained existing-brand accent, not a new graphic layer. No 3D shading or animation is added to clothing and the active arm path remains identical.

**Validation gate:** compare the same 5 poses and cameo at 432×768, inspect price/receipt contact and arm release, and verify cloth lines remain legible without covering the face or moving forearm. Typecheck, render and layout checks cannot prove the wardrobe is creatively approved. Keep PR draft until the user chooses the outfit visually.

## 2026-11-13 — selected Concept C final workwear direction (human request)

**New explicit direction:** reverse-engineer a distinct 10/10 Ourbites outfit: modern editorial workwear, proper layered warm-cream crewneck beneath an open cropped teal overshirt, more cloth structure but not more ornament, asymmetrical placket and exactly one chest pocket with a small orange accent, tapered navy trousers and restrained off-white/navy shoes, cuffs attached to the moving wrists. This is an outfit iteration, **not approval of full character, episode integration or publication**.

**Frozen visual diagnosis:** the preceding smart-casual attempt (`6e62bb4f`) simplified the jacket to an almost uniformly teal rectangle; its tiny white collar looked detached from an undershirt, and white shoes competed with the face. In scene-scale cameo, stitching, neckline and materials became ambiguous. Preserve current head/face/hair silhouette, character proportions, five poses, gaze, target-locked elbow and wrist geometry, paper hinge, characters/episode outside this proof.

**Implementation:** replaced only the existing Concept C outfit SVG layers. Shortened jacket hem without moving shoulders, leg paths or actor anchors; gave the cream T-shirt its own continuous front panel and true crewneck, then overlaid split workwear fronts and a compact collar. Added one darker side plane, a small asymmetrical front seam, one pocket and pocket-attached orange tab. Both cuffs are projected from actual shoulder-to-wrist positions (including target-following wrist), not painted to the static torso. Changed trousers to ink-edged navy and cream-white shoes to muted stone with restrained navy uppers. This is all code-driven 2D vector styling, no image bake, animation library change or outfit randomness.

**Acceptance gate:** compare five matched poses and scene-scale cameo against the prior successful candidate, inspect both evidence interactions with moving cuffs at 432×768. Check no head/neckline collision or detached cuffs, sleeves/hand remain coherent and the shoes are visually distinct but not bright. Technically passing tests does not equal human approval; PR remains draft and original PR #65 untouched.
