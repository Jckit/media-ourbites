# Ourbites production pilot

A research-backed, local code foundation for original business explainers. Current public channel: https://www.youtube.com/@Ourbites. Confirmed brand: **Ourbites**. Editorial promise: **Bite-sized explanations of business.** Each episode explains one business move, how it works and why it matters. Earlier image drafts retain superseded branding and are visual references only.

## Deliverables

- `WORKFLOW.md`: current production loop, installed skills, and next implementation slice.
- `episodes/001/editorial-review.md`: revised 139-word, 60-second pilot script; `SHOT-PLAN.md` specifies the animation.
- `styles/character-*.png`: three Ourbites character concepts (stickman, minimalist cartoon, hybrid).
- `skills/ourbites-production/SKILL.md`: reusable project production instructions, also installed in Codex.

- `RESEARCH.md`: channel observations, PDF implications, monetization corrections, $500/month scenarios, verified tool/skill shortlist and 30-day test.
- `SOP.md`: repeatable workflow and three human gates.
- `styles/`: four generated visual directions and their exact prompts.
- `pipeline.py`: dependency-free Python editorial validation, review packet generation and hash-bound local approval receipts.
- `examples/merger.json`: sourced Tesla/SpaceX scenario and six scenes.
- `src/index.tsx`: functioning Remotion diagram storyboard driven by the manifest.
- `tests/test_pipeline.py`: guardrail tests.

## Run

Python 3.10+ and Node.js 22+ recommended. Dependencies are pinned in `package-lock.json`; installed here using `--ignore-scripts`. The first headless render may download Remotion's browser. Review the Remotion license for the legal entity using it.

```powershell
cd 'C:\Users\Justin\Documents\ChatGPT\Businesses\business-and-chats'
npm ci --ignore-scripts
python -m unittest discover -s tests -v
npm run typecheck
python pipeline.py validate examples/merger.json
python pipeline.py review examples/merger.json --out out/editorial-review.md
npm run studio
```

The example sources were actually checked on 26 October 2026. Validation intentionally fails after the 72-hour freshness limit. Re-read the evidence and update `checked_at` only after a real check. Never automatically refresh timestamps to silence validation.

The Studio preview is a **silent 60-second storyboard**, not a finished video. The still-render check is:

```powershell
npm run still
```

To explicitly export a draft later:

```powershell
npm run render:draft
```

## Human approval examples

Only a human reviewer should use `approve` after reading/watching the artifacts. Replace the explanatory notes with the actual review outcome. The tool never authenticates identity or proves the factual accuracy of a claim.

```powershell
python pipeline.py approve examples/merger.json --receipt out/editorial-approval.json --reviewer Justin --notes 'Describe actual editorial review and single-source exceptions'
python pipeline.py verify examples/merger.json --receipt out/editorial-approval.json
```

For a completed master, use a separate receipt and `--media path/to/final.mp4`. Changing any manifest byte or the media bytes invalidates that receipt. Receipts are created without overwriting existing decisions. The draft renderer deliberately remains available without approval for iteration. **There is no publication or automatic upload path.**

## What is implemented versus pending

| Implemented and checked | Pending production work |
|---|---|
| Source/claim/scene structure and unknown-reference checks | Automatic source collection and semantic fact checking |
| 72-hour volatile-source check and one-publisher warnings | Publication-day manual recheck and independent corroboration where needed |
| Script review artifact, editorial/final media receipts | Authenticated multiuser review, if a team eventually needs it |
| Frame-driven diagrams, text and scene timing | Chosen illustrated style, layered assets and character system |
| Pinned renderer dependencies; test-frame export | Final narration, audio mix, word alignment and synchronized captions |
| Four independent style draft images | WanGP/ComfyUI/TTS model benchmarks and adapters |
| Inspected existing FilmCraft caption interface | A business-specific FilmCraft base/template integration |
| SOP and measurement specification | OAuth analytics, upload/scheduling, retry queue and dashboards |

Do not add all pending work at once. Next build batch: selected style + one approved script + actual narration + one finished pilot. Measure the production effort before automating source ingestion or upload.

## Local validation

Nine Python tests passed, TypeScript passed, Remotion bundled and rendered four test stills covering the diagram types; these were visually inspected. Headless rendering needed execution outside the Codex process sandbox. The Studio server built successfully, but the in-app browser could not reach its localhost preview, so interactive preview verification remains incomplete. The tests cover stale/future sources, unsourced facts, unknown/duplicate claims, bad timings and invalidation after script/media edits. The model/backends were reviewed from documentation, not benchmarked. No paid APIs or model weights were installed. No real human approval receipt was fabricated.

Keep secrets, private analytics, media masters and generated scratch files out of Git. The profile PDF remains in Downloads; the repository contains only task-relevant analysis rather than a copied personal dossier.

## Editorial evolution: news as an entry, explanation as the product (2026-10-27)

**Ourbites:** *the business behind the headline*. The channel combines timely company news (IPOs, financing, earnings, mergers, strategic moves) with deeper economic explanation. The event is the hook; the mechanism, tradeoff, and takeaway deliver lasting value. It is **not** a headline-reading or automated mass-news channel. See [competitor and narrative research](research/COMPETITOR-FORMATS.md), [real-event visual sourcing policy](research/VISUAL-EVIDENCE.md), and [the S-1 episode research brief](episodes/002/RESEARCH-BRIEF.md).

**Visual strategy:** look for genuinely relevant, verifiable photographs, official announcements, archival footage, product clips, and filing excerpts *during research*, and plan original Remotion visualizations around them. Public availability is not a reuse license. Rights/provenance assessment and human approval precede their insertion in any final video. These are editorial requirements, not implemented automatic asset retrieval or legal clearance.

**Reusable framework ambition:** preserve a shared research → narrative → asset-provenance → production → review → measurement engine for eventual additional channels and client projects. For now, Ourbites is the only configured channel; don't split the working pilot into a large multi-channel platform before the pilot demonstrates repeatability.
