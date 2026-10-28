# FW-09 — scene-motion hold diagnostic (frozen before repository source edit)

**Frozen:** 2026-10-28 21:59 UTC. Latest verified `main` `8733f54b6b704ffd1331f5c5639f09567a5f61af` (PR #12/#13 merged). Separate branch `review/fw09-visual-hold-diagnostic-20261028`; no Windows checkout, Codex lock, uncommitted local media, or unpublished approvals accessed. This is **one non-creative QA feature**, not a protagonist redesign or FW-07 implementation.

## Actual-media observation, not a retention claim

Downloaded actual [GitHub Actions review artifact 12854262986](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40774726165/artifacts/12854262986), from tested PR #13 head `791027c461d232d08b47f623e7894333313e49dc`. ZIP SHA-256 `c98738d95b83b3d97c3d1bd17df5faaa1cf854faa622d44eb9ea5c40b5d4266d`, **matches GitHub artifact digest**. Actual encoded MP4 SHA-256 `98bbc179695fa4a5c2a0a486107f157a2b6128ccf26fb7ca92f18cf650258ccf`: 475 frames, 30fps, 432×768, H.264/AAC, container duration 15.851s. The only changes since the earlier `bd5cca9` baseline are docs/CI/ignore files; no production scene/voice/financial source edits.

Independently extracted 0.5-second contact sheet and frames 300, 310, 311, 315, 320, 325, 330, 335, 340, 345, 350, 355, 360, 365, 375, 390, 474. A read-only grayscale scene-only frame-difference probe (crop x0–431, y0–591; downscale 216×296; absolute gray difference >3, at most 10 changed pixels per consecutive pair) found four low-motion intervals: **frames 114–190 (2.533s), 206–249 (1.433s), 259–293 (1.133s), 357–474 (3.900s)**. The final hold is **observed from decoded frames** and can help a future editor select a purposeful action, but **stillness is not itself a defect** and these intervals do not prove low retention. Caption/source strip excluded from motion measurement. This is sampled image inspection and frame analysis, **not human continuous playback or voice listening**.

The PR #13 production caption report remains 449 visible frames / 475, zero untolerated mismatches; signal in four voice windows. The host stays cream/navy/teal; Dario/card payoff and existing grip correction are untouched. The subjective 3/3 cap is not reset. FW-06 remains **review** pending human full-media approval, and FW-07 remains **blocked**.

## Selected improvement / acceptance frozen before code

**Technical gap:** FW-09 has deterministic six-still fixtures and a caption-presence probe, but no reusable *scene-motion hold diagnostic* that distinguishes upper-scene movement from subtitle/footer changes. The user asked for more purposeful animation, so a measured timeline is more actionable than repeated subjective critique. This is an analysis tool, not a demand for arbitrary movement or a motion quota.

1. Add one standalone stdlib Python + ffmpeg/ffprobe CLI `scripts/report_visual_holds.py` with configurable crop, downsampling, thresholds, and minimum span. Produce a JSON report with source SHA-256, frame rate/count, exact analysis settings, intervals and explicit limitations. No automatic pass/fail or creative judgment.
2. Add unit tests for contiguous intervals, boundaries, short holds, and threshold behavior; run them plus the existing repository Python/typecheck validation via CI.
3. Run on the **same** downloaded 475-frame phone-sized MP4 and reproduce the four intervals above, with report SHA-256 logged. Inspect the same relevant frame ranges. Because the source change is **diagnostic-only**, the existing rendered video is unchanged; do not claim a new before/after animation, motion fix or audio verification.
4. Keep all Remotion scene/host/Dario/financials/narration/voice files and workflow triggers untouched, avoiding conflicts with just-merged PR #13. No publication, purchases, auto-merge or human final approval.
5. Leave one unresolved editorial action: once FW-06 human approval allows FW-07, consider a purposeful **anchored** focus/prop motion during a measured hold and verify same timestamps before/after. Do not add motion just to defeat the detector.

**Source identifiers:** `src/AnthropicCharacter.tsx` blob `784895e3b01b6cd94a1ce76d55d6f5514edb754e`; `src/OurbitesHost.tsx` `e8065f5080b95e3a17c5d76dcf4e5a9cadd0e260`; `src/anthropic-character-audio.json` `58465eb9e82f4000e050484c01b486261790eeb4`; `episodes/002/financials.json` `5af2c4ec3810e5b14672afe0489af03e5c5ca53a`.

**Research checked 2026-10-28:** [official YouTube retention guidance](https://support.google.com/youtube/answer/9314415) describes dips/spikes and their ambiguity; [Shorts feed analytics](https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en) defines viewed versus swiped. Neither supports claiming that reducing a static hold will increase retention. [Remotion render documentation](https://www.remotion.dev/docs/render) supports frame-accurate preview exports.

## Outcome

Pending implementation, tests and exact source/output hashes. Append results; do not rewrite the frozen rationale.
