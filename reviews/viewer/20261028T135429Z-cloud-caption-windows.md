# Viewer cycle — 2026-10-28T13:54:29Z — caption-window verification (frozen before change)

**Immutable baseline:** main `dcbbeb76e396f7a62e30b5f0b074aa27fc7af674` (PR #1 merged at 13:15:48Z). The previously logged `viewer-loop.json.cloud_review.merged_to_main=false` is stale metadata, **not** evidence the PR remains open. The October 28 protagonist direction was consumed once by the gaze patch, and the independent creative cap remains 3/3. **No new subjective character iteration authorized.**

## Direct media inspection and finding

Downloaded successful [Actions artifact 12816778529](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40691160665/artifacts/12816778529) and inspected the *actual* 432×768 H.264/AAC video at 2 fps in a 34-frame contact sheet; this is sampled visual inspection, **not** continuous playback or listening. Artifact ZIP SHA-256 `a87d5eeb7edfb7dcc75002edc993bc24e1965fb3516a8c4dcadf47de4f083068`, MP4 SHA-256 `793f48ccfbe36e0ab92605275eb19c9abf4db280e0eda6e294152c71d2efb568`. The Dario/card/grip/payoff and hybrid host remain visible in sampled moments; no new observed defect authorizes art edits.

**One technical coverage gap:** existing GitHub CI checks four decoded narration *signal* windows, but does not verify that the burned-in caption region is visible during the corresponding narration windows and absent in the pauses. A caption omission or gross offset could pass the current checks. This is a **verified test omission**, not a claim that the existing video has incorrect captions. From a separate full-frame raw-video scan of the real artifact, the bottom caption region (x=0..431, y=638..709 at 432×768) has >500 dark pixels on expected narrated frames and zero during pauses; all 500 frames match the four manifest windows. This confirms caption *presence*, not words, phonemes or heard sync.

**Chosen feature:** add a dependency-free caption-window presence check to the existing PR render-evidence workflow. The check decodes the final 432×768 MP4 and compares the caption-only region against each manifest interval at the fixed 1.1× rate. It must fail on missing or materially shifted captions, write per-clip evidence and the inspected source/video hashes, and run alongside existing TypeScript, Python, still, audio-signal and stream checks. Keep the region tied to this specific composition, not a universal layout rule.

## Frozen acceptance criteria

1. The exact existing media content, `src/AnthropicCharacter.tsx`, `OurbitesHost`, Dario/grip, WAV files, narration manifest, financials, source/caveats and playback speed are unchanged.
2. Script independently decodes *actual rendered pixels*, verifies expected captions at all non-boundary frames and gaps (tolerance at most one frame per boundary), reports frame counts, source/video SHA-256 and any mismatches, and fails if the caption region is missing or shifted. A deliberate manifest-shift negative control must fail.
3. A reviewable draft PR from current main runs the existing nine phone-sized same-frame comparison and full MP4 render; TypeScript, Python, audio signal and caption checks pass. Inspect matching phone-sized frames for regressions; no subjective design approval.
4. If cloud rendering/CI is unavailable, record the precise blocker, do not call the feature verified or update accepted art counts.
5. Do **not** equate caption-window presence with word-level subtitle alignment, voice identity, original pitch, intelligibility, continuous listening, rights or human final approval. No retention improvement claim.

Official sources checked 2026-10-28: [YouTube retention moments](https://support.google.com/youtube/answer/9314415?hl=en), [Shorts feed analytics](https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en), and [Remotion audio guidance](https://www.remotion.dev/docs/using-audio). They motivate reviewing the opening and audio/caption experience, but do not establish a causal retention benefit from this QA test.

**Result:** pending branch implementation and CI. No media or art approval is implied.

## Verified outcome — 2026-10-28T13:59Z

**One bounded technical QA feature verified on draft [PR #3](https://github.com/jcbandc-arch/media-creator-outbites/pull/3), not merged.** [Actions run 40701177180](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40701177180) completed **success** on head commit `1b01863274d37958f38fcb318f1ba10a993b7dc7`. TypeScript, **33 Python tests**, nine paired baseline/PR 432×768 stills, full **500-frame H.264/AAC** review export and all four prior decoded audio-signal checks passed. The new `scripts/verify_caption_windows.py` check decoded the **actual output MP4** and found **454 caption-visible frames, 46 caption-absent frames, zero mismatches**, with clip coverages **81/81, 93/93, 111/111 and 169/169**. It records every interval, SHA-256 and strict boundary tolerance in `review-caption-windows.json`.

[Verified artifact 12821782168](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40701177180/artifacts/12821782168) downloaded and inspected:
- ZIP SHA-256: `4b1eecf53a0198d9daf6ba5e89cee51de741ae5453e5f57d0d36724b2bdf7f4b`.
- Exact rendered MP4 SHA-256: `19031ae17ffb1d2840c3c432a84dad3968ce2e9a8af404c0b84628fe2ec9b4a7` (not bit-identical to prior render; no media code changed).
- Audio manifest SHA-256: `e2845dadb80c423ed07676d6eda12ce10809764b3cc90f5102a2502a57fb2e3c`.
- New script Git blob SHA: `f41e17c9e1f71130b3bea8033d1e98c854251775`; workflow Git blob `5b68df3113571b70513569c412396e50956645e3`.
- Existing source baseline main `dcbbeb76e396f7a62e30b5f0b074aa27fc7af674`, no `src/*.tsx`, WAV, narration manifest, financial or character design changes.

Downloaded **new** 432×768 frame pairs and inspected matched frames **30,100,150,220,310,311,325,450,499**. Eight pairs are pixel-identical; frame **311** has minor render-raster differences around filing/card/host, but a full-size side-by-side inspection found no meaningful geometry, caption, grip or financial text change. Also visually inspected 34 decoded 2-fps MP4 frames from the new render. **No continuous real-time playback or listening** occurred. The deliberate *local* negative-control manifest shift (first clip start +0.25 story seconds) produced **12 untolerated mismatches** and exit code 1, while the original prior MP4 passed 500/500 frames. This verifies the detector catches that gross offset; it does not certify all timing faults.

**Remaining backlog unchanged in substance:** listen to exact rendered audio against original Kokoro `am_puck` Voice A for intelligibility/pitch and word-level caption alignment; watch continuous hand/prop/gaze motion; assess secondary caveat legibility and human likeness/financial-source/rights/final-media approval. The standing October 28 protagonist feedback is **not** re-consumed, the 3/3 subjective cap remains, and no release, publish or approval is authorized. YouTube retention uplift is unknown.
