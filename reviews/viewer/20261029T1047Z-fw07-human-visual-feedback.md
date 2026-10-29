# FW-07 human visual review — filing and receipt paper-focus previews

**Recorded:** 2026-10-29 10:47 UTC. **Authority:** direct human feedback in ChatGPT on the two Codex FW-07 synthetic silent previews. **Disposition:** visual treatment **not accepted**; keep FW-07 in `review`. This is **not** final artwork, production, rights, factual, likeness or publication approval.

## Exact feedback

> FW-07 animation review: Smooth movement: yes. Readability: unsure. Paper-collage style: no. Notes: None. Please record this feedback and determine the next implementation step without treating it as publication approval.

This review applies to both `out/paper-focus/filing.mp4` and `out/paper-focus/receipt.mp4`, which the user uploaded and discussed. Do **not** infer a measured retention effect or more specific aesthetic complaints from the three answers. The user previously described these previews as "too basic"; that is human editorial feedback, not a newly measured engineering defect.

## Provenance and inspection limits

- Implementation branch: `codex/fw07-paper-focus-20261029`; main comparison base at recording: `7d08fb1d4a97458c817301acf5e3d284fa5d6174`, branch two commits ahead with no reported behind commits.
- Implemented source: `src/framework/DocumentFocus.tsx` and `src/framework/PaperFocusPreview.tsx`. The focus is currently an illustrated outline, **not optical magnification**. The source excerpt is already rendered inside the target before the focus motion.
- Prior Codex evidence: `reviews/viewer/20261029T094712Z-paper-focus.md`, plus `20261029T094712Z-inputs.json` and `20261029T094712Z-outputs.json`. The earlier run reported two 210-frame, 432×768 silent exports, sampled decoded-frame inspection, passing TypeScript, 50 Python tests and layout guard; it explicitly did **not** verify continuous playback.
- This feedback-recording run inspected the GitHub source/review and the user's stated assessment. It did **not** independently re-render or play the local Windows MP4s, verify easing, or validate new output hashes. Preserve the prior output hashes as historical evidence; do not call this a new rendered implementation.
- Official YouTube guidance checked 2026-10-29: [retention moments](https://support.google.com/youtube/answer/9314415) and [Shorts feed metrics](https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en). These define future measurements, not a prediction of benefit from this design change.

## Decision and single next implementation feature

**Preserve:** existing deterministic, smooth document-local anchor movement, focus/extraction timing, single-target ownership, and the two different filing/receipt fixtures.

**Change next:** one bounded **tactile paper-focus reveal** revision of the existing `DocumentFocus` primitive. Replace the flat outlined-rectangle presentation with an original layered-paper document (subtle edges, authored overlap/shadow, crisp type) and a focus lens that **actually reveals or enlarges the selected row's information**, rather than merely encircling already-readable excerpt text. The highlighted paper row should remain the same anchored object as it lifts/transforms into the excerpt card. Keep the composition clean enough that one focal item is readable at a time. Avoid adding arbitrary effects, fake scanned evidence, new external assets or a global paper texture.

This is **one cohesive FW-07 visual-treatment feature**, not permission to redesign the host, add unrelated animated props, redo Dario's approved interaction, or advance FW-08.

### Acceptance criteria for Codex's next isolated pass

1. Freeze the existing two source and MP4 hashes and a timestamped before-view finding; use the current Codex branch without overwriting newer work. Claim a fresh isolated branch/file scope per `ROADMAP.md`.
2. Use the same reusable typed primitive in both filing and receipt fixtures, with distinct target geometry and timing. No episode-specific facts or synthetic evidence misrepresented as a real filing/receipt.
3. The focus action reveals/enlarges a previously hard-to-read target, makes the excerpt readable at **432×768**, and preserves document/row/card identity across adjacent extraction frames. Avoid duplicated text at the transition or competing focal areas.
4. Paper layers have restrained visible depth, overlap and authored motion; text stays crisp, no collision with host, caption/source/footer safe zones. The existing cream/navy/teal fictional host remains recognizable and may guide attention using existing poses/gaze; **no new subjective protagonist redesign**.
5. Render the **same moments before and after** in both 432×768 exports, inspect sampled and adjacent frames **and continuous playback**, log source and MP4 SHA-256 hashes, and run TypeScript, layout, and relevant production/source guards. Report missing audio verification honestly: these fixtures are silent.
6. Return a reviewable preview and request fresh human judgment on **readability** and **paper-collage match**. Do not declare FW-07 complete until accepted; no merge/release/publication from this review alone.

## Gates and remaining work

- `FW-07 = review / visual revision required`; `FW-08` remains blocked on FW-07. Existing FW-06 scenic acceptance remains valid.
- The protagonist's **3/3 self-directed subjective-revision cap stays unchanged**; this specific FW-07 feedback is not a blanket cap reset.
- Preserve original-pitch Kokoro `am_puck` Voice A at 1.1x, silent illustrated Dario, net loss vs cash spending, operating loss vs cash burn, remaining accounting charges, and independent rights/factual/human release gates.
- No new media was generated, no existing production source was changed, no approval was fabricated and nothing was published in this review-recording pass.
