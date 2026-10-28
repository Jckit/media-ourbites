# FW-06 — production office adopts shared room shell

**Frozen review before source edit:** 2026-10-28. Branch `review/fw06-production-office-shell-20261028` from exact `main` commit `5d847ca373a3def7ff7f0f23a54d431dd072b7f7`. Task claimed in ROADMAP.md. Cloud work only; no access to Justin's private Windows checkout, Codex dirty worktree or its exclusive lock.

## Current evidence / selected finding

- **Observed architectural gap (high confidence from source):** `src/BusinessWorld.tsx` independently paints the office floor/horizon and window/decor, while `src/framework/scene-kit.tsx` separately paints the approved room shell for both synthetic presets. A future floor/palette/layout change could drift between real episodes and fixtures. This is a **maintainability/reuse defect, not measured retention or a claimed visible flaw**.
- **Actually inspected pre-change video:** accessible 432×768 H.264/AAC draft `/mnt/data/ourbites-scenic-short-ending-draft.mp4`, SHA-256 `5b5414bf012318b0c8b36b732e83de922bdb6223c3841fc818dfb6c8989b03b2`, 475 frames, 15.851 seconds. Verified digest against previous exact production review. Decoded frames **0, 30, 100, 150, 220, 310, 311, 325, 450, 474** to actual before contact sheet. At those samples the cream/navy/teal host, Dario, filing, grip, caption and final payoff are staged; no new observed defect justifies redesign. This is sampled frames, not complete continuous playback or audio listening.
- Existing FW-02–FW-05 built and human-approved shared office/storefront look; FW-09 QA has been merged, roadmap review state retained. Existing subjective protagonist cap is 3/3, and the one October 28 direction was consumed by the prior gaze implementation. This change is structural, not a new subjective character iteration.

## One bounded implementation

Extract the shared *SVG room shell* from `SceneEnvironment` to a reusable `RoomShell` primitive; both synthetic environment presets and the production `OfficeWorld` consume it. Keep the production-specific window, decorated office desk, notice-board, planted prop, impact paper, camera and original cast intact. Preserve production's existing ink horizon line weight via shell parameters; only the shared low-contrast wall plane / recessed left wall is newly introduced in the production stage. Fixture look stays unchanged. No episode narration or business facts enter the scene library.

**Pre-change exact git blob IDs:**
- `src/BusinessWorld.tsx`: `073753daf34842016e15c6fedbeb3759c9ff88b2`
- `src/framework/scene-kit.tsx`: `949a26567365adf63aec84844cc2b23efeabdbd7`
- `src/AnthropicCharacter.tsx`: `784895e3b01b6cd94a1ce76d55d6f5514edb754e`
- `src/OurbitesHost.tsx`: unchanged `e8065f5080b95e3a17c5d76dcf4e5a9cadd0e260`
- `src/anthropic-character-audio.json`: `58465eb9e82f4000e050484c01b486261790eeb4`
- `episodes/002/financials.json`: `5af2c4ec3810e5b14672afe0489af03e5c5ca53a`
- `src/framework/FrameworkPreview.tsx`: `aee34cf4f6d736ffb9234f1f675b47a8433117bb`

## Acceptance / regression criteria (frozen)

1. At **the same** 432×768 frames **0, 30, 100, 150, 220, 310, 311, 325, 450, 474**, compare actual baseline and candidate. Intended difference confined to backdrop wall plane/column and any associated behind-actor antialiasing. No new face, document, Dario label, narration caption or payoff occlusion; no floating feet or layer intrusion. The hand/card interaction at 310/311/325 stays continuous.
2. Fixture office/storefront frames **0, 120, 239** preserve the approved visual language; existing framework CI runs and guarded lower reading-zone equality passes.
3. `npm run typecheck`, Python editorial tests, source guard, review workflow, full 475-frame 432×768 H.264/AAC render, video frame count and decoded narration signal checks pass; exact source/output hashes logged. Only narrow audio-signal coverage is possible without listening to clips.
4. Do **not** change existing production script, timing, `am_puck` original-pitch Voice A at 1.1×, cash/net loss/fair-value distinctions and other charges, Dario silent, rights/likeness or final publication gates.
5. Record evidence and route to human review. If media cannot be downloaded/inspected, leave FW-06 in `review` not `done`. No retention improvement is inferred.

## Research/evidence boundary

Current official YouTube [audience retention](https://support.google.com/youtube/answer/9314415) and [Shorts viewed vs swiped](https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en) (accessed 2026-10-28) tell us how to eventually measure viewer response; they do **not** establish that a shared wall plane improves retention. [Remotion CLI rendering](https://www.remotion.dev/docs/render) specifies the supported render approach. No speculative creator analytics used.

## Result

**Pending implementation and checks.** Future entries below must document actual CI/render hashes, inspection coverage, remaining blockers and handoff without rewriting this frozen finding.


## Implemented source / bounded repair

PR [#10](https://github.com/jcbandc-arch/media-creator-outbites/pull/10), base `5d847ca3`, candidate `8f8e36ef4e2a44f0674ae77077986b2cfdf6e759`. Added exported `RoomShell` in `src/framework/scene-kit.tsx` (blob `37e012b7c0e523d3e9a855c93077eea163f2c0ec`) and used it as a backmost SVG group in `src/BusinessWorld.tsx` (blob `128dfc82dd57070c2b6b764ce5adc0f2102711dd`). The existing wall accents/window/desk/plant/impact props stay present. The shared wall recess is the deliberate backdrop-level difference. Production code for host, Dario, captions, financial source, narration and timing was not edited. The existing comparison workflow now restores both changed source files to the exact base for its before render.

**One repair used:** the first [viewer CI run 40760553560](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40760553560) failed because an old workflow requested frame 499 although the current verified 475-frame composition ends at frame 474. Removed only that obsolete baseline sample (workflow blob `f049208e41ef1ed9e1e4a0d4c8e3eea4654d8687`). No further source/workflow repair is authorized in this cycle.

## Verified outputs / exact evidence

- [Standard validation run 40760789770](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40760789770): **success**. TypeScript, editorial/Python and existing registry checks.
- [Shared fixture run 40760553577](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40760553577) and rerun 40760789764: **success**. Downloaded first run's artifact 12846734934 (zip digest `sha256:06e18c66fddab876fe0dc7fa4406cdd61225b65039554e7f003dffa8165a7c6c`). **All six** 432×768 office/storefront PNGs and `sha256.txt` were independently byte-identical to the exact prior approved FW-09 CI fixture artifact (original digest `sha256:2ffb1100773b88c47c0de9f10b87de3f175e844ca160925a45639e2f4ada58de`). No synthetic preset regression detected in those samples.
- [Production comparison run 40760789843](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40760789843): **failure at the caption verifier, not at rendering**. It passed Python tests/TypeScript, rendered 15 matched before and after still frames from the exact main baseline and candidate, encoded an actual phone-sized MP4 and passed its audio-signal and frame/stream checks. [Artifact 12848461718](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40760789843/artifacts/12848461718) downloaded and SHA-256 verified as `1e050361c4602167fce344f8fc07a850b8151dca15d1f84a53aced1a47156f28`; candidate MP4 SHA-256 `12a639d63a9ed112490d35314e2ee6c279f500dd74fac315e8035689c9ee253b`.
- Independently decoded actual candidate: **475 frames at 432×768, H.264/AAC, 15.851 seconds**, same as baseline. Decoded 16-kHz mono PCM SHA-256 `f7e6c2eed3d358823b07cee88c5e88ac5a846c5512d3c6e231a4e22b5dded90a`, **exact match** to verified baseline. Four narration windows contain signal (RMS -20.82, -20.60, -23.99, -23.23 dBFS); estimated final silence upper bound 0.301s. This proves decoded audio signal equivalence, **not auditory approval of the original-pitch voice, intelligibility or word timing**.
- Independently visually inspected phone-size paired images at frames **30, 100, 220, 311, 450 and 474**, with numeric difference analysis also sampling **18, 150, 310 and 325**. New pale/recessed wall is visible behind exactly the retained office props and actors. Existing host face/hair/teal silhouette, document amounts, Dario label, hand/card interaction and final payoff remain readable; no observed new collisions in the sampled images. The protected lower caption/footer region y=595–767 at 432×768 is **pixel-identical before/after** in all ten sampled frames. Difference areas are in the intended backdrop and its wall boundary; no evidence of unrelated text or character edit. The contact sheet SHA-256 is `a2e0de1ef4a56f3f1494cad15e5cceda58843f941c028c42269c215b32a8e895`. Continuous full-motion viewing or listening is **not** claimed.
- **Diagnostic caption presence independent of the failing existing validator:** direct FFmpeg grayscale count on the actual candidate strip (x=0,y=638,w=432,h=72) with the unchanged historical thresholds and real narration windows found **449 visible frames of 475, zero mismatches and zero boundary exceptions**. All four clip windows have visible captions (81/81, 93/93, 111/111, 164/164). This is a read-only diagnostic, not a substitute for a passing repository QA gate, word-level subtitles or playback/listening.

## Exact remaining blocker and handoff

`scripts/verify_caption_windows.py` (current main blob `f41e17c9e1f71130b3bea8033d1e98c854251775`) computes `expected_count = math.ceil(manifest['duration'] * FPS / SPEED)`, which expects the **old 500-frame** untrimmed duration. Production now intentionally uses `CHARACTER_FRAMES = ceil((narration.duration - 0.9)*30/1.1) = 475` after the earlier verified final-silence trim. Thus the current caption QA exits **2** with `Caption QA error: Unexpected frame count 475 != 500` **before checking captions**. Fix in a separate authorized cycle: align verifier's expected frame-count input with `AnthropicCharacter.CHARACTER_FRAMES` (and the verified trim), without weakening its per-frame caption presence/mismatch checks; then rerun the full Actions gate. No second repair was attempted here due the one-repair-per-cycle contract.

**Status: FW-06 blocked pending a green complete CI review and human visual decision.** This draft is a rendered, sampled and source-isolated candidate, **not fully verified**, not a human-approved style revision, and not releasable. Ownership is released; independent branch/PR remains reviewable. FW-07 remains dependency-blocked. Viewer-loop.json's stale FW-05 note can be reconciled separately; don't overwrite unknown Codex audit changes. Human factual, real-person likeness, media-rights and final-publication gates remain in force. No retention improvement claimed.
