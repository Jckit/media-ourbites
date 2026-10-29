# FW-06 user review: stray orange pointer and oversized subtitles

**Frozen on 2026-10-29 08:17 UTC before runtime edits.** Review branch `review/fw06-caption-orange-pointer-20261029` from the latest `main` `2c6a8daa84ea4f17ec9474d3a07c9c290dcdd992`. No access to the local Windows Codex checkout, live lock, dirty files or its exclusive ownership. PR #16 edits a different generic-storyboard scene and is not part of this patch.

## User feedback / observed evidence

The user's direct review of the real video says: "**At 4 seconds there is a weird orange line from Darios hand to the net loss. The subtitles are still too long. And this not the paper style we talked about yet.**" This is explicit NEW targeted corrective feedback on FW-06 media, **not acceptance**, permission to redesign the host, or human approval for a rendered episode.

I inspected the actual 432×768 30fps H.264/AAC, 475-frame, 15.851s Actions review MP4 extracted from PR #20's current review artifact; local file SHA-256 `18ca11f60c20f4d531e7033e6423d52fc2f21eab0f376607a0bbb74de6d122d6`. Sampled times 2.8, 3.3, 3.7, 4.0, 4.3, 4.7, 5.3, 6.1, 6.7, 7.3, 9, 11, 13.2, 15 seconds. Contact sheet SHA-256 `03019f1e49320be951d66cfbf2ced34f10e65c1b95011632e4f6879b07e275d6`. At 4.0s a long orange straight diagonal line crosses the frame from the number area to Dario's outstretched hand, incongruent with the character/prop. Source explanation (high confidence): `src/AnthropicCharacter.tsx` contains a floating SVG pointer path `M720 1110 L570 510` and endpoint circle, with `opacity={pointing}`. It is **not** Dario's arm anatomy. The pale orange highlight behind `REPORTED NET LOSS` already provides intended emphasis.

At the same moments, captions show the complete clip text for the full 3.4s segment, and another complete clip has a 6.23s sentence. Current source `caption=narration.clips.find(...)` displays `caption?.text` rather than shorter visual phrases. This creates an avoidable dense block. There are exactly four original narrator clips (0.wav–3.wav) with fixed real durations; no permission to regenerate, retime or edit them.

**Existing approved architecture versus requested style:** the episode is a previous scenic-office hybrid, **not** the subsequently documented editorial paper-collage / kinetic typography style in `styles/OURBITES-EDITORIAL-PAPER-MOTION.md`. The style is only a documented optional direction, not implemented as reusable FW-07/FW-08 components. Do not mislabel this correction as the paper-style rollout or bypass FW-06 human review.

## One bounded correction batch (two related user-observed readability defects)

1. Remove **only** the orphaned 600-world-pixel diagonal orange pointer and endpoint circle from the production scene. Keep its net-loss text highlight and the Dario/host pose, gaze, grip, props, factual source and camera intact. No new connector gimmick.
2. Replace full-sentence simultaneous burned-in captions with short, manually authored, **one/two-line phrase cues** mapped to each existing narration clip. Keep every spoken word and punctuation **in the same order** in the aggregate; choose cue boundaries strictly inside existing clip timing without changing `src/anthropic-character-audio.json`, WAVs, `CHARACTER_FRAMES`, or play speed. Short cue timing fractions are a first-pass approximate alignment; **only listening can validate exact spoken transitions**. Increased type size only if 432×768 readability stays within the protected caption area.
3. Add independent editorial tests that reject missing/changed narration wording, too-long cues, nonmonotonic cue boundaries, missing coverage or incorrect clip count. Keep the existing caption **presence** pixel QA on the exported media (449/475 historical). Its presence test is not word/speech sync.

**Out of scope:** new paper-collage animation engine, moving typography, new art, protagonist redesign, Dario voice/likeness revision, financial adjustments, source facts, narration, release/publishing and arbitrary transition effects. Target changes only `src/AnthropicCharacter.tsx`, new cue data, tests, this frozen review and FW-06 roadmap row.

## Acceptance to verify on actual outputs

- At same real times, especially **3.3, 3.7, 4.0, 4.3, 4.7, 5.3, 6.1** seconds, no diagonal orange line or endpoint circle; original document highlight remains. Dario's hand/arm and accounting-grip handoff at frames 310/311/325 remain intact.
- All four clip captions appear as short readable phrase cues with no blank gap *within* each clip. Strict concatenation exactly reproduces 4 existing narration texts, with each phrase at most **36 characters**; visual layout aims for one or two lines at 432×768. Caption starts and ends stay tied to their original clips.
- Compare actual before/after stills around the line, cue boundaries, handoff and payoff; inspect exact after 432×768 475-frame video. Verify caption pixel QA, decoded audio windows and original soundtrack identity where possible. Do not claim full listening from automated audio-signal tests.
- All source/financial/voice manifests remain at exact base hashes, TypeScript and Python tests pass. No return of hidden title/likeness-review metadata; protected lower footer remains legible. No unapproved paper-style rollout.
- Human review of the corrected media remains necessary. Do not mark FW-06 done or unblock FW-07 until the viewer accepts it; final release has additional separate rights/factual/likeness gates.

**Frozen base blob IDs:** `src/AnthropicCharacter.tsx=0077c1188ab7f45920f353a6fb1a2fab29daaf61`; `src/anthropic-character-audio.json=58465eb9e82f4000e050484c01b486261790eeb4`; `src/CharacterStage.tsx=98fbdc6ad5c5f4934975fb1a0d39186475af1827`; `ROADMAP.md=024c871e70455dc424b152747259ffbed709691a`.

## Result

Pending actual implementation, test results and user viewing decision. This is a reviewable technical correction, not a claimed retention improvement.
