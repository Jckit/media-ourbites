# FW-09 — relocate hidden production disclosure to static footer safe-area

**Frozen before edit:** 2026-10-29T06:50Z. Connected GitHub main `8733f54b6b704ffd1331f5c5639f09567a5f61af`; `src/AnthropicCharacter.tsx` blob `784895e3b01b6cd94a1ce76d55d6f5514edb754e`. Independent cloud branch `review/fw09-production-footer-safe-area-20261029`; no access to Justin's Windows checkout or uncommitted Codex changes.

## One observed defect, prior failure, and scope

I independently inspected the **actual** existing 475-frame 432×768 H.264/AAC draft (`sha256:9da80f6c95cb60f360a085e61651e677200a92af4b53ea683123957242fe5ac5`) at frames 0, 8, 12, 18, 24, 30, 36, 45, 60, 90, 120, 220, 310 and 474. Its `OURBITES` title and `ILLUSTRATIVE SCENE · LIKENESS REVIEW PENDING` label are hidden behind the opaque `RoomShell`. Source shows both text nodes render **before** the opaque `CharacterStage`. This is a visibility defect in rendered media, not a retention measurement.

The **previous** PR #19 was closed and rolled back after moving the overlays to upper-left and upper-right caused a collision with the descending S-1 filing at frame 18. Its exact failed outcomes and hashes are recorded in `reviews/viewer/20261029T0552Z-production-overlay-visibility.md` on that closed branch. Do not reuse those placements.

## New single-feature acceptance criteria

1. Move only the two **existing, verbatim** review labels **after** the camera/world layer, into the persistent bottom metadata band, outside the filing trajectory, Dario's name, financial props, and narration captions. Retain their original colors and font sizes; preserve source footer. At 432×768, expected placement is approximately y=707–723 pixels, below the longest visible caption (around y=699) and above source footer (around y=730). Keep the long disclosure on one line within x≈122–390 px.
2. Render exact same 432×768 frames **before and after**: 18, 25, 30, 45, 60, 100, 150, 220, 310, 311, 325, 450, 465, 470, 474, plus inspect the opening and full falling-paper interval in the candidate MP4. Labels must be legible at phone size, never collide with captions/footer, and be visible while the filing falls. Outside the new metadata strip, preserve the previous picture within encoding/raster tolerance.
3. Pass `npm run typecheck`, existing Python tests, exact 475-frame render, all four audio-signal windows and strict caption-window verifier. Compare decoded audio against the existing baseline and record source/output hashes. Audio signal or PCM equality is **not** human listening, pitch, or voice approval.
4. No change to protagonist, Dario, grip, payoff, camera, scene, financials, narration, `am_puck` original pitch, 1.1× speed, 475-frame duration, or any factual/rights/approval gate. The previous 3/3 subjective protagonist cap stays exhausted and FW-07 stays blocked pending FW-06 human approval.
5. One implementation plus at most one repair; if collision or verification failure remains, restore only this run's source change and report rejection. Draft PR only; no merge, release or publication.

**Research context (checked 2026-10-29):** YouTube's [audience-retention documentation](https://support.google.com/youtube/answer/9314415) and [Shorts feed analytics](https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en) distinguish actual measured viewer behavior from this observed layout defect. The video is unpublished, so no retention improvement is claimed. [Remotion's layer guidance](https://www.remotion.dev/docs/layers) explains later elements paint above earlier ones.

## Outcome

Pending exact candidate CI render and independent matched-frame inspection. Do not mark verified or accepted from source alone.
