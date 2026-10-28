# Viewer cycle — 2026-10-28T12:49:31Z — encoded narration signal coverage

**Frozen before this cycle's code change.** Main `db6ce1fd08568281fbeb700152fda84fd334e570`; existing draft PR #1 head `3ed5562c0761ce0636a88a3531e43e075d68764a`. The October 28 protagonist-specific design feedback has already been consumed once; independent subjective cap remains 3/3. No new art, Dario/card/grip/payoff, finance, narration, voice, playback-speed or release change is authorized.

## Actual media and finding

Downloaded the exact successful GitHub Actions [artifact 12813693441](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40683964231/artifacts/12813693441). ZIP SHA-256 `f838d5483f478ee2e4c61efed64c847987e23e372d01a426329d1aba6fb6b9b3`; extracted MP4 SHA-256 `e470d7478284b39253f942a63d8494d60287a491e71d852cc6358210aba66cf6`. Decoded video samples at 25 times from 0.0 to 16.5 seconds into a 5×5 phone-sized contact sheet; also compared original and PR 432×768 PNGs at matched frames. The visible Dario card interaction, preserved cream/navy/teal host, and final takeaway appear in sampled decoded frames. **This is sampled frame inspection, not continuous watching or audio listening.**

`ffprobe` confirms 500 H.264 frames, 432×768, AAC stereo at 48 kHz, 16.683s container. Decoded the actual audio to mono 16 kHz PCM; `volumedetect` reports mean -22.6 dBFS and peak -4.0 dBFS. Measured four source-manifest clip windows at locked 1.1×: RMS approximately -20.8, -20.6, -24.0, -23.2 dBFS. The waveform contains signal in each window; **this cannot establish that the words, voice identity, original pitch, intelligibility or subtitle sync are correct**. The last ~1.1s falls below -42 dBFS in a silence detector; that alone is not a proven defect or authorization for creative trimming.

**Selected technical coverage defect:** current PR CI only asserts that an AAC stream exists. An entirely silent stream, or a missing individual narration clip, could satisfy the existing check. This is an observed **test gap**, not an observed silent video. Severity medium for review reliability; confidence high from workflow source and decoded artifact. No audience retention outcome is available.

## One bounded technical improvement and frozen acceptance criteria

Add one **decoded, per-clip audio-signal sanity check** to the existing draft PR's evidence workflow. After render and stream probe, decode to 16 kHz mono PCM and use the committed four-clip narration manifest to measure RMS and peak over each expected 1.1× playback window. Fail on missing/near-silent clip (conservative RMS below -45 dBFS or peak below -30 dBFS), write measured per-clip dBFS and timing to a JSON artifact. Thresholds are technical presence checks, not loudness/mastering approval.

Accept only if the same branch's GitHub CI passes TypeScript, 33 Python tests, nine paired before/after phone-size renders, 500-frame MP4 export and **all four decoded audio windows**; log source/output hashes and exact run. The original audio manifest, WAV files, financials, host/Dario code, speed and review approvals must remain unchanged. This does not count as a subjective protagonist revision. One repair at most; if unsupported, report the blocker without claiming success.

Official references rechecked 2026-10-28: [YouTube retention](https://support.google.com/youtube/answer/9314415?hl=en), [Shorts chose-to-view](https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en), [Remotion render CLI](https://www.remotion.dev/docs/render). Neither source suggests waveform checks prove viewer retention.

## Result

Pending code change and fresh CI; append actual outcome only after checks. Full audio listening, continuous playback and human editorial/factual/rights approval remain pending.
