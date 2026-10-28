# FW-06 gate repair — caption QA composition frame-count contract

**Frozen before source edit:** 2026-10-28 20:52 UTC. Target draft PR [#10](https://github.com/jcbandc-arch/media-creator-outbites/pull/10), branch `review/fw06-production-office-shell-20261028`, verified head `7b03abf338c685a3f6004b15b60b46dec69752a2` based on main `5d847ca373a3def7ff7f0f23a54d431dd072b7f7`. Cloud GitHub branch only: no access to the private Windows checkout, local Codex lock, uncommitted files or local WAVs.

## One selected observed failure, not a retention hypothesis

Actual [Actions run 40761621387](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40761621387) failed at **Verify caption visibility against narration windows** after TypeScript/tests, matched before/after still renders, 475-frame encoded video and narration signal probes succeeded. Prior independent media evidence in [FW-06 frozen review](20261028T2005Z-fw06-office-shell.md) confirms the 432×768 475-frame candidate, identical decoded PCM, six matching framework fixtures, and sampled before/after office images.

The source-level root cause is exact: `scripts/verify_caption_windows.py` blob `f41e17c9e1f71130b3bea8033d1e98c854251775` assumes `ceil(manifest.duration * 30 / 1.1) = 500` frames, whereas `AnthropicCharacter.CHARACTER_FRAMES` deliberately subtracts 0.9 source seconds and exports **475** frames. The verifier rejects frame count before testing pixel captions. Workflow blob `f049208e41ef1ed9e1e4a0d4c8e3eea4654d8687` already independently checks 475 frames. This is a **technical QA false failure**, not evidence of missing captions, motion problems, or audience drop-off.

## Acceptance criteria frozen before implementation

1. Add an **optional explicit expected composition frame count** to the caption verifier, retaining the old manifest-derived default for older untrimmed media. Reject zero/negative expected counts; preserve strict exact frame-count rejection, clip windows, pixel thresholds, boundary tolerance, and all per-clip caption-presence checks.
2. Set `--expected-frames 475` in the existing PR workflow's caption-verification command, matching its already-locked 475-frame stream probe and `CHARACTER_FRAMES`. Record the chosen expected count and its source in the JSON report. This is a review-time contract, **not** permission to accept any video length.
3. Unit-test legacy 500, explicit 475, and invalid overrides. Rerun the full PR workflow: TypeScript, editorial tests, exact paired 432×768 frames, encoded H.264/AAC, four signal windows, and the caption verifier must pass. Independently inspect the caption report and relevant matched stills if artifacts can be obtained.
4. Do not touch `AnthropicCharacter.tsx`, `OurbitesHost.tsx`, `BusinessWorld.tsx`, `RoomShell`, `DarioIllustration`, audio manifest/WAV, 1.1× `am_puck` original-pitch Voice A, financial data, source caveats, or human approval gates. No publication, merge or release.
5. Do not mark FW-06 complete from a green CI alone; media comparison evidence and human art/audio/rights/factual final approval remain separate. No retention gain inferred.

**Input identifiers:** `main=5d847ca373a3def7ff7f0f23a54d431dd072b7f7`; `PR10=7b03abf338c685a3f6004b15b60b46dec69752a2`; `verifier=f41e17c9e1f71130b3bea8033d1e98c854251775`; `workflow=f049208e41ef1ed9e1e4a0d4c8e3eea4654d8687`; `audio-manifest=58465eb9e82f4000e050484c01b486261790eeb4`; `composition=784895e3b01b6cd94a1ce76d55d6f5514edb754e`.

## Outcome

Pending implementation and fresh CI/media evidence. Append factual results below; preserve this frozen rationale.
