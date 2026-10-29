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

## Verified technical outcome — 2026-10-29T06:55Z

**One source change accepted for technical review, not final art approval.** Moved the two unchanged authored labels from behind the opaque stage to a static bottom metadata strip **after** `CharacterStage` at world-space y=1768/1775. Retained original font sizes, colors, literal text, footer, camera, actors, finances, audio and narration. New `src/AnthropicCharacter.tsx` Git blob `0077c1188ab7f45920f353a6fb1a2fab29daaf61` (from `784895e3b01b6cd94a1ce76d55d6f5514edb754e`); code commit `4193174992fcc80c35ac3b5d14716b473d4d25ae`.

**CI on exact source commit:** [production before/after review run 40831683118](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40831683118) **passed** TypeScript, Python tests, 15 paired Remotion stills, 475-frame 432×768 H.264/AAC render, all four encoded audio signal windows, exact length and caption verification. [Standard validation run 40831683059](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40831683059) **passed**. [Review artifact 12878064785](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40831683118/artifacts/12878064785) ZIP SHA-256 `914dbc927b070fd66803055584a80745844016f1b6b5c92006ca2f981e61c4f8`, matching GitHub's recorded artifact digest.

**Independent media inspection:** downloaded the exact artifact and independently inspected actual before/after 432×768 PNG pairs at frames 18,25,30,45,60,100,150,220,310,311,325,450,465,470,474, including the previous collision frame 18 and payoff frame 474. The restored metadata is **visible and legible**, x=34–388, y=709–719; it is below the baseline's last dark caption row y=701 (measured across all 475 decoded baseline frames), and above the source footer beginning around y=729. The moving filing, Dario, host and caption content are not obscured. In **13/15** exact Remotion still pairs, all pixels outside the new y=705–726 metadata strip are identical; frames 25 and 30 have 703 and 70 tiny off-strip pixel changes, respectively, with 90 and zero pixels exceeding 24/255 channel difference, limited to thin moving-object edges (rasterization). No authored off-strip change or visible regression detected.

Decoded and compared **all 475 frames** of baseline/candidate MP4s with a >40/255 per-channel threshold: only 370 off-strip pixel differences across 89 frames (max 23 in any frame), scattered codec/raster noise; no sustained off-strip visual change. This framewise computation **does not substitute for human continuous playback**.

- Baseline MP4 SHA-256: `9da80f6c95cb60f360a085e61651e677200a92af4b53ea683123957242fe5ac5`.
- Candidate MP4 SHA-256: `de07f7a1e688de54b0c915c0ce38713404694b1fba6382efab6da714ad60e8b5`; 475 frames / 30 fps / 15.851 s / 432×768.
- Independently decoded both to mono 16-kHz signed 16-bit PCM; SHA-256 **identical** `f7e6c2eed3d358823b07cee88c5e88ac5a846c5512d3c6e231a4e22b5dded90a`. Audio content not changed, but voice identity, intelligibility, pitch and audiovisual sync **not verified by listening**.
- Caption checker: **449 expected visible frames, 26 absent frames, zero mismatches**. Its pixel crop extends through y=709, so the metadata does not spuriously trigger missing-window captions.

**Review boundary:** The metadata now occupies the static lower footer rather than a top-of-frame brand header. This resolves the observed invisibility/collision defect without claiming a final approved graphic treatment. The labels are review notices, not approval receipts. Human judgment may prefer a different eventual placement, but the prior upper-corner variants failed and were not reused. The protagonist's subjective cap remains 3/3; no protagonist design or Dario interaction was edited.

**Unresolved backlog:** FW-06 requires human full audiovisual playback/listening, style/likeness, factual and rights acceptance; FW-07 actor/prop primitives remain blocked until that gate. Further work on continuous-motion QA and existing independent FW-09 draft PRs #14–#18 stays separate. No measured retention gain, merge, release or YouTube publishing. Draft [PR #20](https://github.com/jcbandc-arch/media-creator-outbites/pull/20) remains open for human review.
