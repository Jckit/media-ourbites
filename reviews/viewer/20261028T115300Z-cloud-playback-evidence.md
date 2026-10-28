# Viewer evidence-coverage cycle — 2026-10-28T11:53Z (cloud PR)

**Frozen before code change.** Baseline: main `db6ce1fd08568281fbeb700152fda84fd334e570`; existing draft PR #1 head `28c8a02e8c38805b43a10fe5bb1621c1729f6210`. This run has no access to Justin's private Windows checkout, uncommitted work, or local MP4. Do not touch main, previous Dario/card/grip work, or the already visually verified October 28 protagonist-gaze iteration.

## Selected technical finding (not a claim about a defective video)

The latest [phone-frame comparison](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40677078839) passes, but its review artifact contains only nine before/after PNG pairs. The prior review explicitly leaves **continuous motion and narration playback** unassessed. This is a verified **review-coverage gap**, not evidence that the actual motion or audio is wrong. The standing October 28 protagonist feedback has already been consumed; no new subjective redesign is authorized.

**One bounded improvement:** extend the existing draft PR's evidence workflow to render a **full phone-sized H.264/AAC review MP4**, probe the audio/video streams and duration, record SHA-256, and upload that artifact alongside the stills. This makes continuous review possible without changing the content or implying that an automated probe heard the voice.

## Frozen acceptance criteria

1. The workflow renders the exact `AnthropicCharacter` composition at scale 0.4 (432×768), all 500 frames at 30 fps, from the PR head, with no edit to any character, narration, financial, source, rights, or approval file.
2. The encoded file has a video stream and an audio stream, with duration approximately 16.67 seconds; `ffprobe` metadata and SHA-256 are preserved with the artifact.
3. Existing same-frame baseline/PR comparison, TypeScript and Python checks continue to pass. The artifact is accessible for later *actual* playback/listening.
4. **Do not** mark full motion, caption sync, `am_puck` original pitch, or intelligibility verified merely from a successful export or probe. No retention or design approval claim. If CI fails, use at most one bounded repair and leave the previous successful protagonist patch intact.

Primary references checked 2026-10-28: [YouTube retention](https://support.google.com/youtube/answer/9314415), [Shorts chose-to-view](https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en), [Remotion render CLI](https://www.remotion.dev/docs/render), [Remotion codec](https://www.remotion.dev/docs/options/codec), and [scale](https://www.remotion.dev/docs/options/scale). Platform metrics do not establish whether a draft animation is successful.

**Outcome:** pending CI. Append observed run, commit, media hash, probe result, remaining limitation after verification.

## Actual outcome — 2026-10-28T12:01Z

**Technical improvement verified, not a new creative revision.** On draft PR #1, workflow source was changed at `d81d5dd94a09e3a6c2c9698da0db8633953dd02e`. Main remains `db6ce1fd08568281fbeb700152fda84fd334e570`. Only the existing review workflow and this review log were modified in this cycle; no Remotion scene, audio, figures, rights or approval fields changed.

- First CI attempt [40683638033](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40683638033) successfully exported the MP4, but the metadata step failed because hosted Ubuntu did **not** provide `ffprobe` (exit 127). One bounded repair added conditional installation of `ffmpeg` only when `ffprobe` is absent.
- Repaired [GitHub Actions run 40683964231](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40683964231) **passed**: 33 Python tests, TypeScript, existing nine-pair before/after 432×768 still comparison, and full MP4 export/probe. Probe confirmed **500 H.264 frames at 432×768**, **AAC audio stream**, and **16.683 seconds** duration. This confirms an encoded track exists, **not** its audibility, voice identity/pitch or caption synchronization.
- Artifact: [viewer-protagonist-before-after, ID 12813693441](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40683964231/artifacts/12813693441). It contains `after/anthropic-character-review.mp4`, all paired PNGs, `frame-sha256.txt`, `review-probe.json` and `review-sha256.txt` (the exact MP4 SHA-256 is recorded in the latter). GitHub logged uploaded **ZIP** SHA-256 `f838d5483f478ee2e4c61efed64c847987e23e372d01a426329d1aba6fb6b9b3`; this is **not** the MP4 hash. Artifact retention is 14 days.
- Render CLI, hash generation, metadata probe and artifact upload were actually executed in CI. The **continuous video was not played or listened to in this ChatGPT runtime**, and no additional visual art acceptance was performed. Prior protagonist gaze has already been compared in nine real phone-size frames; this run did not introduce new character geometry.

**Remaining backlog:** A human/local Codex playback and listening pass on the exact MP4 should check the Dario-to-card motion, facial gaze timing, intelligibility of original-pitch `am_puck` Voice A at 1.1×, subtitle timing and secondary caveat legibility. This is a review requirement, not a new subjective redesign request. No publishing or final-art/rights/factual approval.
