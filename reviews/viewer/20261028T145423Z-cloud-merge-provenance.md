# Viewer cycle — 2026-10-28T14:54:23Z — merge-state provenance (frozen before change)

**Baseline:** newest connected GitHub `main` at `dcbbeb76e396f7a62e30b5f0b074aa27fc7af674`, confirmed from current commit search. Composition remains `AnthropicCharacter`. The private Windows checkout and local renders/WAVs are not accessible in this run.

## Directly observed, actionable technical finding

Current GitHub PR #1 metadata reports **closed and merged** at `2026-10-28T13:15:48Z`, merge commit `dcbbeb76e396f7a62e30b5f0b074aa27fc7af674`. However, current `reviews/viewer-loop.json` still reports `cloud_review.merged_to_main=false` and its top-level `notes` call PR #1 a draft. The discrepancy was already noted in PR #3's frozen review; it is now independently confirmed against GitHub's live PR state. This is an **observed state-tracking defect**, not a defect in the rendered video or evidence of retention change.

**Impact:** Future autonomous review cycles may misinterpret the accepted gaze work as pending and repeat an already completed subjective character revision. The October 28 protagonist direction is already consumed once, and the separate subjective cap remains 3/3. PR #2 (scenic-animation pilot) and PR #3 (caption-window QA) are separate open draft proposals and must not be overwritten or treated as merged.

## One bounded improvement and acceptance criteria

Correct only the stale merge provenance in `reviews/viewer-loop.json`: set `cloud_review.merged_to_main=true`, record PR #1's actual merge commit and timestamp, and update the stale explanatory `notes`. Do **not** modify review history, revision counters, source/financials, Dario/host animation, audio, WAVs, 1.1x speed, caption implementation, approval fields, or pending PR branches.

Acceptance: (1) JSON parses; (2) all fields other than the explicit provenance fields and explanatory notes remain identical; (3) the new values match GitHub's PR #1 metadata; (4) the change is isolated on a reviewable draft branch/PR and is **not** merged or published; (5) record original and updated blob/commit hashes. Since this is **metadata-only**, same-frame render comparisons are not applicable; do not claim new media rendering, continuous playback, listening, art approval, or actual retention improvement. No subjective character revision is authorized by this cycle.

## Evidence context

Read viewer/production skills, October 28 human direction, retention and protagonist references, main's recent review logs, the AnthropicCharacter and host source, financial dataset, narration manifest, SOP/WORKFLOW, and the current PR #2/#3 descriptions and relevant source. Official [YouTube Shorts performance metrics](https://support.google.com/youtube/answer/12220281) distinguish engaged views and stayed-to-watch from raw views, while [retention guidance](https://support.google.com/youtube/answer/9314415) warns that replay spikes may indicate confusion. Neither provides data about this unpublished Ourbites draft. Official [Remotion audio/video guidance](https://www.remotion.dev/docs/using-audio) was consulted; no rendering settings are changed.

**Status at freeze:** finding confirmed, source change not yet made. Append verified result and unresolved backlog after the GitHub write.
