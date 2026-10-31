# Ourbites editorial motion library — REVIEW INTAKE ONLY

Status: **candidate intake; no animation approved for the production library**. Owner: human art direction. Last checked: 2026-10-31. Branch based on main `8a0e634a0ff9bfb857ceca887f4dbf7979fc501e`; this proposal intentionally does not modify FW-07B/PR #30–35 or existing host and episode code.

## Purpose

Curate **actual, authored, reviewed** motion recipes instead of accumulating generic scene templates. A skill describes how to produce a style; a library entry is an original, reusable animation with verified code, rendered evidence and human acceptance. Never confuse an attractive still with motion approval. Maintain the hybrid fictional host (cream round head, navy angular tuft, teal torso, thin limbs) and original-pitch Kokoro am_puck Voice A at 1.1×, exact financial distinctions, and rights/factual/likeness/final approval gates.

## External technique donors (reference only, not installed or vendored)

1. [charlie947/motion-graphics-skills](https://github.com/charlie947/motion-graphics-skills) — MIT per its public README; examine `vox-explainer`, `motion-effects`, `reference-to-motion`, `brand-intake`. Adopt source-first editorial composition, intentional kinetic hierarchy, anti-generic design critique. **Do not import its sample brand, copy or scene layout.** Its HTML/HyperFrames workflow is not an automatic replacement for pinned Remotion.
2. [Barty-Bart/motion-graphics](https://github.com/Barty-Bart/motion-graphics) — MIT per its public README; examine `explainer-engaging`, a single hero element travelling between stations. Adopt shared-object continuity and camera/anchor logic; not its generic product-demo UI or synthetic music. Its browser/Playwright/ffmpeg renderer is a separate implementation choice.

Upstream licenses and exact versions must be checked before copying any code/assets; this proposal imports **no third-party code**. Do not blindly install all skills into the project or local Codex directory; choose minimal relevant skills after code/security/dependency review. Existing canonical Ourbites skills: `skills/ourbites-motion/SKILL.md`, `skills/ourbites-paper-collage/SKILL.md`, `skills/ourbites-viewer/SKILL.md`.

## Candidate samples for first review (NOT accepted library entries)

**A. Object-led continuity:** receipt/filing becomes the result. The object remains spatially identifiable from source to destination, with readable source → motion → landing, occlusion and actor attention. Inspired by the *technique* of `explainer-engaging`. 5–8 s, 9:16, original synthetic `120 - 85 = 35` shop numbers only.

**B. Editorial number reveal:** typography, red annotation and grouped values reveal a business mechanism in meaningful sequence; no generic slide wipe, arbitrary random spring or floating text. Inspired by `vox-explainer` and `motion-effects`. 5–8 s, 9:16, same explicitly synthetic numbers.

The **initial low-fidelity 5-second review sketches** were generated outside the repo in ChatGPT on 2026-10-31 as `ourbites-motion-study-continuity.mp4` (SHA256 `6b58cd1f19baf8cee23bb6d04e76ae8a40226851911d1f40f1a4dafc50cd1ae9`) and `ourbites-motion-study-editorial.mp4` (SHA256 `903d76db66a35eff9383b7bf02e2cb9eca37db2802de5592abc6b04a446b652e`). Both are 432×768, 24fps, 120-frame silent **design sketches** drawn with Pillow/OpenCV, not Remotion/Claude skill execution, not licensed sample re-creations and **not production-ready**. These media files are conversation artifacts, not committed repo files or verified portable CI artifacts. The host drawing is a rough identity placeholder, not a replacement for `OurbitesHost.tsx`. Do not accept them into the production library without a proper Remotion build and explicit human review.

## Review protocol — one candidate at a time

1. Select one candidate and freeze a creative brief: lesson, focal target, layout, three key poses, anchors, choreography, typography and material hierarchy. Preserve existing protagonist identity. Do not code a generic template first.
2. Produce an **original** 432×768 Remotion draft, with three keyframes and a 5–8-second continuous MP4. Compare actual normal-speed playback and phone-size adjacent frames against the brief. Log source and output hashes and relevant TS/numerical/layout tests. No generic AI-generated claims, no copied media.
3. Ask Justin **for each sample separately**: **Accept into library / Revise sample / Reject sample**, plus optional notes on craftsmanship, natural motion, graphics and transition quality. **No response means pending**, not approval.
4. Only on explicit **Accept**: extract a typed reusable primitive into `src/framework/motion-library/<id>/` with sample adapter, metadata, accepted render hash, owner/date, safe areas, dependencies, and two distinct fixtures. Add entry to `catalog.json` with `status: accepted`. Keep human art approval distinct from final episode publishing.
5. On **Revise**: keep in `candidates/` or separate PR, iterate one design issue and re-render; on **Reject**: log reason in review register and do not merge candidate into library. Rejection is useful feedback, not a license to add another automatically.
6. Never auto-merge a draft; the library is a controlled set of approved techniques, not a dump of experiments. Respect FW-07B current PR #30–35 and its existing approval gate; FW-08 remains blocked until authorized.

## Design bar

Prioritize distinctive art-directed layouts, designed typography, character/object causal action, intentionally varied timing, material-aware layering, source/destination object continuity, meaningful transitions and clean mobile reading. Reject: uniform rectangular UI cards, full-screen wipes independent of scene objects, incidental paper textures, indiscriminate springs and random bounces, and unmotivated rapid cuts. The paper collage is an optional treatment; clean editorial motion is equally valid.

## First action

Justin reviews A and B **as directions, not production samples**. Choose one to develop into a fully rendered Remotion candidate before accepting any library implementation. Existing FW-07B draft art is still under human review; no pre-existing PR is implicitly approved.
