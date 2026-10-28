# Repository hygiene audit — state and documentation reconciliation

Recorded 2026-10-28 against exact `main` `bd5cca9ea90ff2e34e666820dc709361d01e1482`. Review-only maintenance branch `maintenance/reconcile-state-docs-20261028`. No access to Windows local checkout, lock, uncommitted Codex media, or unpublished WAVs; do not alter them.

## Verified facts
- PR [#9](https://github.com/jcbandc-arch/media-creator-outbites/pull/9) merged 2026-10-28 20:02 UTC. Framework fixture QA merged; [main Actions 40771802212](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40771802212) passed.
- PR [#10](https://github.com/jcbandc-arch/media-creator-outbites/pull/10) merged 2026-10-28 21:24 UTC; automated 475-frame caption/audio/visual gates passed prior PR runs, but no independent human *final* visual/audio, rights, factual or publication approval. **FW-06 remains `review`, not `done`; FW-07 remains `blocked`.**
- PR [#11](https://github.com/jcbandc-arch/media-creator-outbites/pull/11) merged 2026-10-28 21:25 UTC, user explicitly approved the **documentation PR**. Both Actions on the exact merged main (40771802365 standard validation and 40771802212 framework fixtures) passed. **FW-M00 documentation can be `done`; no approval for future art and no 3/3 protagonist revision-cap reset.**
- FW-09's source guard and fixture CI are complete and merged; `review` status remains appropriate for still-incomplete **continuous** motion/audio and other human inspection scope.
- `reviews/viewer-loop.json` `last_review`/`latest_draft`/`last_verified_frame`/`input_hashes`/`output_hashes` refer to **historical local-run evidence**. They may not be globally current but must **not** be overwritten with cloud-only paths or fictitious media. Reconcile prose notes/backlog and add explicit remote-framework status, retaining the creative revision counters (3/3).
- Root README incorrectly says Dario illustration not implemented and PR #2 still draft, and its audition example `am_liam` is easily mistaken for selected voice. The recorded selected production voice is `am_puck`, original pitch, with 1.1× composition playback; not permission to resynthesize.
- `out/` is ignored, so ROADMAP's `out/framework-batch1/{office,storefront}.mp4` links are not portable GitHub evidence. Prefer committed reviews and Actions run links.
- **No production files, narrations, financial source data or SVG assets will change** in this PR.

## Acceptance
1. Roadmap shows merged provenance accurately; FW-M00 done for documentation only; FW-06 and FW-09 human/QA status and dependent FW-07 remain unchanged.
2. README and framework README reflect existing code, narrator choice and future paper-motion implementation, with no fictitious visual or release approval.
3. Viewer-loop's protected counters, lock and local artifact pointers are byte-for-byte unmodified; current remote backlog and approvals described without being mistaken for fresh human feedback each automated run.
4. GitHub Actions standard validation succeeds; no art rendering changes or release/merge in this maintenance run.

## Excluded / follow-up
- CI frame-count consolidation, path triggers and ignore-file rule are handled independently.
- 12 currently listed remote branches are not automatically deleted from this connector: merged-PR branch history, unknown local checkouts, and PR #5's unmerged state must be checked before any destructive branch cleanup.
- No User YouTube retention statistics are available; maintenance has no retention impact claim.
