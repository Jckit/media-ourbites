---
name: ourbites-viewer
description: Critically review an Ourbites video draft as a new business-curious viewer, then guide and verify a bounded Remotion improvement. Use for viewer feedback and the scheduled retention review loop; not for predicting analytics or approving publication.
---

# Ourbites critical viewer

Use the canonical project at `C:/Users/Justin/Documents/ChatGPT/Businesses/business-and-chats`. Read `reviews/viewer-loop.json`, the latest review, and [research](references/retention.md). Use ourbites-production for editorial constraints and relevant Remotion skills for implementation. Preserve Justin's hybrid character style, friendly American Voice A, playful banter and 1.1x playback. Do not spawn agents unless separately authorized.

## Inspect before judging

Resolve the target composition from viewer-loop.json; initially AnthropicCharacter. The live source composition is newer than old MP4s: never choose a stale export by filename. Record source/input hashes and git status, including existing dirty changes. Inspect the latest draft with available browser/media tools. Inspect the opening, every beat/transition and payoff at phone size. Play and listen where supported; otherwise sample frames around actions and compare narration timings, explicitly marking motion/audio review partial. Reading TSX or a screenshot is not watching a video. Do not claim observation of audio or continuous motion without access. If media cannot be inspected, log the blocker and avoid speculative creative edits.

First-pass viewer questions: What is happening? Why should I care? What am I waiting to learn? What did I actually learn? Where would I become confused or leave? Separate observed defects from hypotheses about attention.

## Review rubric

Rate each applicable dimension 0–4 (0 broken, 1 weak, 2 serviceable, 3 strong, 4 unusually clear). Use N/A where unobserved. These are subjective editorial scores, never retention predictions; no fabricated overall percentage.

- Opening promise: first frames establish a concrete business puzzle without greetings or a title-card delay. Test the first 1–3 seconds for Shorts as a local heuristic, not a universal platform rule.
- Comprehension: beginner can follow one causal mechanism; distinguish loss, valuation, cash and illustrative numbers.
- Characters: recognizable figures perform meaningful actions on props; no decorative mascot beside a slide. Faces and reactions remain readable.
- Progression/payoff: each beat changes understanding, resolves an earlier question, or introduces a necessary complication. End after delivering the promised answer; never hide caveats to keep suspense.
- Motion: motivated handoff, gesture or camera movement connects beats; no arbitrary cut-frequency quota, perpetual bouncing or speed increase to mask weak storytelling.
- Reading load: captions, source text and numbers do not compete; inspect safe areas, overlaps and sufficient reading time at phone scale.
- Voice/personality: conversational, intelligible, friendly; humor supports explanation, not invented facts or motives. Mark unassessed if not heard.
- Trust: source scope, uncertainty, illustrations and mathematical states remain accurate. Never convert draft status into approval.

For each finding record timestamp/frame range, observed evidence, viewer consequence, severity, proposed fix and confidence. Freeze this review before implementation so the code change cannot rewrite its own rationale.

## One bounded feedback cycle

1. Review previous unresolved findings and input hashes. Do not reverse earlier choices without new evidence. If unchanged and the previous review has no actionable findings, do a cheap no-change check and stop.
2. Save `reviews/viewer/<UTC-run-id>.md`: target and hashes, inspection coverage, ratings, up to three prioritized findings, and one selected change hypothesis.
3. Implement one coherent improvement with existing Remotion components. Local draft renders and necessary local narration regeneration are authorized by this scheduled loop. Do not purchase services, change voice identity/speed, rewrite financial claims without verifying sources, publish, push, or fabricate approvals. Keep unrelated edits intact.
4. Run TypeScript and relevant existing numerical/asset checks. Render affected frames and a local draft when needed to judge motion; inspect the same timestamps before and after. State untested aspects. Only accept a patch with evidence of the intended change and no detected regression. On failure, restore only this run's edits; never reset the user's working tree.
5. Append the actual result, checks, output paths/hashes, limitations and next unresolved issue to that review; update viewer-loop.json's last_review and latest_draft. Save concrete framework lessons only when reusable and demonstrated. Do not expand skills with every subjective preference.

Allow at most one revision batch and one repair attempt per wake. No concurrent review of the same target: use an exclusive lock file with owner/time, release in finally; never override an unknown live lock. If source files change during inspection, defer edits and review the new revision next run. After three consecutive accepted revisions without human feedback, continue checks but hold further subjective creative changes for Justin's review; verified technical defects may still be fixed. This prevents self-reinforcing taste drift, not future scheduled checks.

If nothing justified improves the draft, log no change. If audio/video inspection is incomplete, do not label a candidate fully reviewed. Actual retention validation requires Ourbites Studio data after publication: compare similar lengths and audiences, engaged views, stayed-to-watch, average view duration/percentage and retention curves. A spike may indicate confusion; do not assume success.
