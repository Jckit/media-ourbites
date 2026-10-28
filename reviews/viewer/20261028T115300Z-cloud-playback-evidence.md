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
