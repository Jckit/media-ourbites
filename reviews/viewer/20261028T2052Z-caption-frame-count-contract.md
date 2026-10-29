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

## Verified outcome — 2026-10-28, same bounded QA repair

**Implementation:** `scripts/verify_caption_windows.py` now accepts optional `--expected-frames` while retaining the legacy manifest-derived default and strict exact-count rejection. It records `expected_video_frames` and `expected_frames_source` in the JSON evidence. The PR workflow explicitly passes **475**, matching its existing stream probe and `AnthropicCharacter.CHARACTER_FRAMES`; new Python unit tests cover legacy 500, trimmed 475 and invalid overrides. No source edit to animation, financials, cast, timing or narration.

**Source Git blob IDs:** verifier `56b35bfef07eccaa034216b9d00e855c96a3f2d6`; workflow `064d7668b1ed62c0d0d240699acf159cad0b7987`; new test `0ecbd494bc8019f689f86d3519b7ead493075e19`. Code/test commit `29a418803c5d37f79cd99dbec8d78d45fff5f57b`.

**GitHub Actions on exact tested code/test commit:**
- [Production before/after and caption QA run 40767344645](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40767344645) **passed** all steps: TypeScript, Python tests, 15 matched before/after stills, encoded H.264/AAC 475-frame 432×768 draft, four decoded narration-signal windows and **caption visibility**. Artifact [12851900175](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40767344645/artifacts/12851900175), downloaded ZIP SHA-256 `69600e4d11ecd36b4ad0272be660ee74ad7b90f680650c9f877ec14864fa16e8`.
- [Framework fixture run 40767344612](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40767344612) **passed**; [artifact 12851250635](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40767344612/artifacts/12851250635) ZIP SHA-256 `a705bcec26d962d92ead96762c2b3bc08f7adf1323b1445bac1ea81d7f8a3be3`. Independently verified all six office/storefront 432×768 fixture PNGs are byte-identical to prior run 40760553577's artifact 12846734934.
- [Standard validation run 40767344627](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40767344627) **passed**.

**Independently decoded/inspected actual outputs:** new candidate MP4 SHA-256 `9da80f6c95cb60f360a085e61651e677200a92af4b53ea683123957242fe5ac5`, 475 frames, 432×768, 15.851s, H.264/AAC. Its decoded 16-kHz mono PCM SHA-256 `f7e6c2eed3d358823b07cee88c5e88ac5a846c5512d3c6e231a4e22b5dd90a` **exactly matches** the earlier failed-gate render's decoded PCM. The new MP4 container hash differs, but the sampled rendered image files at frames **18,30,100,150,220,310,311,325,450,474** are **pixel-identical** to that earlier PR10 candidate at each same timestamp. Inspected a new actual before/after contact sheet at frames **30,100,220,311,450,474**: wall-plane addition is behind the unchanged host/Dario/financial props; no new collision detected in these stills. All ten tested frame pairs preserve the lower 432×768 reading strip **y=595–767** pixel-identically before/after. This is sampled-still evidence, not a full playback judgment.

**New passing caption report:** SHA-256 `f6d076eab9bdf9d059441a300ac7966c0e9442f0b96bd485f181c392ca567148`; expected frames=475 from `composition_argument`, actual frames=475, **449 visible / 26 absent**, **0 tolerated and 0 untolerated mismatches**. Per-clip visible/expected frames **81/81, 93/93, 111/111, 164/164**. Independently decoded the previous candidate's caption strip and also found zero mismatches. Reported MP4 hash agrees with independently calculated output hash. The frame-count gate was repaired **without suppressing caption-window validation**.

**Result:** the precise FW-06 automated caption-QA blocker is resolved and the existing draft PR #10 is technically green. The shared `RoomShell` integration remains a **review candidate**, not a final art or media approval. Outstanding: human review of style balance, continuous playback and actual voice listening (including original pitch/intelligibility/word-level timing), factual/rights/likeness checks, and final release decision. No YouTube Studio retention data or measured uplift; no merge or publishing. Do not reopen FW-07 until FW-06 is accepted through its own gate.
