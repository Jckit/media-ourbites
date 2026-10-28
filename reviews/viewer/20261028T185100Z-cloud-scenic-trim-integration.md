# Viewer cycle — 2026-10-28T18:51Z — scenic draft ending integration (frozen before patch)

## Baseline and evidence
Latest main checked: `dcbbeb76e396f7a62e30b5f0b074aa27fc7af674`; PR #2 scenic head: `a5f5dad45e90f077cf46af9ad969996035eaf48e`. Existing independent PR #5 has already verified an ending trim on the non-scenic draft; do not modify PRs #2–#5 or main. The October 28 protagonist direction remains consumed once; subjective revision cap 3/3.

Actual accessible PR #2 scenic MP4: SHA-256 `0da9741296a14f7ae77a1f3ddccc0365e5bb6ae9626ad2a02e82b53a215ebab4`, 432x768, 500 H.264 frames, AAC, 16.683s. Decoded a 2fps contact sheet and exact frames 474/499. Frame 474 retains the final caption; frame 499 has identical static character/financial payoff but no caption. FFmpeg `silencedetect=noise=-38dB:d=0.25` on the actual scenic MP4 shows final silence 15.576646–16.682667s (1.106021s). This is an observed technical timing defect, not a retention claim or audio listening.

## Selected single bounded change
Port **only** the previously verified 0.9 source-second final-silence trim from PR #5 into a new branch based on PR #2's scenic draft; preserve the office world, host/Dario geometry, voice manifest, original pitch, 1.1x playback, financial figures, captions, rights and human approval gates. Adapt the review workflow's expected frame count, sample list and tail-signal checks to 475 frames.

## Acceptance criteria
1. Fresh CI exports 475 frames at 432x768 and about 15.83s, H.264/AAC. All four decoded narration windows have signal and final tail <0.5s at -38 dBFS.
2. TypeScript and Python tests pass. Match frames 18, 25, 30, 45, 60, 100, 150, 220, 310, 311, 325, 450, 465, 470, 474 against the **existing scenic baseline MP4** at the same indices. No unintended scenery, character, caption, or financial change. Inspect frames around 474/499 to confirm removal of only silent hold.
3. Log actual output SHA-256 and evidence links. If CI/render/inspection is unavailable, leave verification pending; do not mark complete.
4. No new subjective character revision, retention claim, merge, release, publication or final-media approval.

Research checked 2026-10-28: YouTube retention https://support.google.com/youtube/answer/9314415 (not directly measurable on this unpublished 16s draft); Shorts viewed/swiped https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en; Remotion CLI https://www.remotion.dev/docs/render. These do not prescribe a specific tail length.

## Pending outcome
Unverified until new branch CI and actual encoded media are inspected. Remaining backlog: continuous playback/listening and original-pitch Voice A comparison, word-level subtitle sync, phone-size caveat legibility, PR integration decisions and human rights/factual/likeness/final approval.

## Verified outcome — 2026-10-28T18:58Z

**One bounded technical integration accepted for draft review, not human media approval.** Draft [PR #6](https://github.com/jcbandc-arch/media-creator-outbites/pull/6) branched from the exact PR #2 scenic head, without modifying main or PRs #2–#5. Code changes: `src/AnthropicCharacter.tsx` source blob `784895e3b01b6cd94a1ce76d55d6f5514edb754e` (only the final frame budget) and review workflow blob `a6df622e06860cfe1b6cfd23c629ab570175d0b0` (475-frame, per-clip audio and final-tail QA). The `BusinessWorld` scenery, host/Dario poses, source financials `5af2c4ec3810e5b14672afe0489af03e5c5ca53a` and narration manifest `58465eb9e82f4000e050484c01b486261790eeb4` are unchanged.

[GitHub Actions run 40749327217](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40749327217) **passed** TypeScript, 33 Python tests, frame renders, full MP4 export/probe and decoded narration checks. [Artifact 12843216964](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40749327217/artifacts/12843216964) ZIP SHA-256 `0e69da9ee1a890da415f71d62313bf4eb4716b581f17538383fc1aec184747d8`. Actual encoded MP4 SHA-256 `5b5414bf012318b0c8b36b732e83de922bdb6223c3841fc818dfb6c8989b03b2`; 475 H.264 frames at 432x768, AAC, 15.851s. Four decoded narration windows passed signal presence with RMS -20.82, -20.60, -23.99, -23.23 dBFS; computed final-tail upper bound 0.301s.

**Independent media inspection:** downloaded the exact new CI MP4 and decoded 15 matching frame indices `18,25,30,45,60,100,150,220,310,311,325,450,465,470,474` from the 500-frame PR #2 scenic baseline and 475-frame integrated candidate. All sampled frames remain visually equivalent at phone size, including the filing drop, host reaction, Dario hand/grip, financing card and payoff. Video decoding differences have maximum frame mean absolute channel delta 0.654/255 (small codec/raster differences, not bit-for-bit identity). Side-by-side eight-pair contact sheet SHA-256 `db8076033fda8cead8e0462ba9424d2365a0950f8516eb40a7b970417149adf8`. The prior scenic frame 499 has the same static payoff with the caption absent, whereas retained frame 474 still has the full final caption. FFmpeg `silencedetect=-38dB` on the **actual encoded outputs** shows final silence reduced from 1.106021s (15.576646–16.682667) to 0.274021s (15.576646–15.850667). Decoded PCM samples match **exactly** through 15.8129375s; only 309 samples differ near the new encoded tail (15.813–15.851s), maximum PCM amplitude difference 42/32768. This is a source-preserving trim, not an audio listening verification.

**Limits and backlog:** No claim of watching full continuous playback or hearing Kokoro Voice A; original-pitch identity, intelligibility and word-level caption synchronization remain unverified. Final character/likeness, accounting interpretation, source recency, rights and publication require human review. PR #6 remains draft and unmerged; original PR #2 remains unchanged. October 28 protagonist direction remains consumed once, independent cap remains 3/3. No actual audience retention improvement is asserted.
