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
