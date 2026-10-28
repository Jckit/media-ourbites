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
