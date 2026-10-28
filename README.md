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

## Asset research CLI — working metadata-only MVP

The new `asset_research.py` reads a structured episode JSON manifest and scene-linked media research plan, producing a candidate asset register and Markdown shot list. Offline mode uses curated official links; optional `--commons` searches Wikimedia Commons **metadata** (requires internet). Nothing is downloaded, licensed, or approved automatically.

```powershell
python asset_research.py build --episode examples/merger-v2.json --plan examples/merger-media-plan.json --out out/media-research/001
# Optional live search:
python asset_research.py build --episode examples/merger-v2.json --plan examples/merger-media-plan.json --out out/media-research/001 --commons --limit 3
# Preflight only after human selection and rights/fact review:
python asset_research.py check --packet out/media-research/001/assets.json
python -m unittest discover -s tests -v
```

The outputs are `out/media-research/001/assets.json` and `shot-list.md`. Assets default to `unreviewed` and `unverified`. Failed network searches are logged. The `check` command fails when no final asset has been selected, or when selected files lack necessary human review/evidence fields. Passing it is not copyright clearance or publication authorization. No live Commons integration test, automatic download, or Remotion asset importer has yet been run. See [visual sourcing policy](research/VISUAL-EVIDENCE.md).

## Episode 002 — Anthropic IPO (2026-10-27)

**Real implemented draft:** [episodes/002/episode.json](episodes/002/episode.json) (82-second estimated, six-scene sourced narration), [financials.json](episodes/002/financials.json) (S-1 accounting figures, USD millions), [SHOT-PLAN.md](episodes/002/SHOT-PLAN.md), [media-plan.json](episodes/002/media-plan.json), and the independent, source-driven Remotion `AnthropicShort` composition in `src/AnthropicShort.tsx`. Joseph Carlson's Oct. 26 Anthropic commentary was used as a *secondary editorial lens*, not footage or data authority. The reported company-wide Korea market-size comparison is **not asserted** in the episode because IPO terms remain unpriced and Korea's combined market is larger than speculative Anthropic valuations.

```powershell
git pull origin main
npm ci --ignore-scripts
python -m unittest discover -s tests -v
python pipeline.py validate episodes/002/episode.json
python pipeline.py review episodes/002/episode.json --out out/anthropic-editorial-review.md
python asset_research.py build --episode episodes/002/episode.json --plan episodes/002/media-plan.json --out out/media-research/002
python scripts/verify_anthropic_media.py
npm run typecheck
npm run still:anthropic
npm run render:anthropic:storyboard
```

The Remotion export is a **silent editorial storyboard with draft script visible**, **not** a completed video. `src/anthropic-approved-media.json` begins with zero approved third-party inserts, so the animation falls back to code-drawn explanatory visuals. The curated source plan includes genuine [CBS Dario Amodei interview](https://www.youtube.com/watch?v=hQR_VJF6ukk) and [Claude product video](https://www.youtube.com/watch?v=MhfnicQVkgY) candidates, but public clips are **not cleared for reuse**. Do not manually populate approved-media JSON until rights, factual date/context and file hashes are reviewed. The private `public/approved/` folder is ignored by Git.

Local Kokoro voice audition paths:

```powershell
.venv-voice/Scripts/python scripts/audition-anthropic.py --mode compare
# After choosing and listening to a specific voice:
.venv-voice/Scripts/python scripts/audition-anthropic.py --mode full --voice am_liam
```

The chosen voice above is only an **illustrative command argument**, not a recommendation or approval. These scripts create ignored local WAVs and measured scene durations; a human must choose a voice, listen, retime, and align captions before final production. Rendering, media rights, and publication remain gated by the existing SOP.

## Reusable character system — recurring Ourbites host + real-person illustrations

The character stage is documented in [research/CHARACTER-ASSETS.md](research/CHARACTER-ASSETS.md), with machine-readable [protagonist](characters/protagonist/profile.json) and [Dario Amodei](characters/dario-amodei/profile.json) profiles. The **existing hybrid host** has been extracted into [src/OurbitesHost.tsx](src/OurbitesHost.tsx): one fictional face/silhouette with `neutral`, `explain`, `think`, `point`, and `react` poses. The owner can approve or revise its final appearance later; **provisional is not approved**.

This shared character is present in the existing `OwnershipProof`, generic `BusinessShort`, and Anthropic `AnthropicShort` storyboards. The Anthropic host currently appears in `hook`, `operations`, and `payoff` scenes. A **Dario Amodei illustrated character is only planned**: no likeness/illustration is marked approved or shown in the renderer. Character-asset research belongs beside source/media research before final scene approval.

```powershell
python scripts/validate_character_cast.py episodes/002/episode.json
python scripts/validate_character_cast.py examples/merger-v2.json
# For final production, stricter gate: expected to reject the current provisional host
python scripts/validate_character_cast.py episodes/002/episode.json --release
npm run typecheck
```

This Python guard validates scene/cast metadata, but does not inspect rendered pixels, validate a likeness, approve a face, or waive source-media rights. Final-release asset and editorial signoffs remain human.

## Scheduled viewer improvement loop (20-minute local Windows option)

The repo has a dedicated [viewer skill](skills/ourbites-viewer/SKILL.md), [protagonist-specific research rules](skills/ourbites-viewer/references/protagonist.md), [Codex cycle prompt](scripts/viewer-loop-prompt.md), and a guarded [Windows runner](scripts/viewer-loop-20m.ps1). The loop is **implementation-first**: one verified, bounded Remotion improvement per cycle (or an explicitly logged blocker), before/after phone-size review, hashes and no silent approvals. It preserves the hybrid character, Kokoro `am_puck` voice A and 1.1x playback. It won't push or publish.

**Activation on your PC is required:** this GitHub commit does NOT install a task remotely. In your existing Windows PowerShell checkout, after reviewing local edits and pulling compatible latest commits:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\install-viewer-loop-task.ps1
Get-ScheduledTaskInfo -TaskName 'Ourbites Viewer Loop'
```

This configures a current-user 20-minute Task Scheduler recurrence while your PC is on and you are signed in. Full setup, pause/resume/remove commands, concurrency safeguards and limitations: [viewer scheduling guide](skills/ourbites-viewer/SCHEDULING.md). ChatGPT's in-chat scheduler currently cannot create sub-hourly tasks; don't confuse a prepared local installer with an active cloud task.

## Animation direction: illustrated stories, not perpetual infographics

The 28 October 2026 creative direction is to show **characters performing events inside coherent 2D worlds** (e.g. office, storefront, factory) with contact, reactions, motivated camera movement and visible consequences. Keep exact business calculations as brief clear graphic beats. See [research/SCENIC-ANIMATION-STYLE.md](research/SCENIC-ANIMATION-STYLE.md) for reference research and a rendered baseline comparison.

A first unapproved [`OfficeWorld` pilot](src/BusinessWorld.tsx) adds a layered business-office environment and filing-impact paper reaction to `AnthropicCharacter`. This is an original simplified 2D approach, not a licensed excerpt of another YouTube animation. It does **not** replace existing dialogue, Kokoro Voice A, financial numbers, the hybrid cast or human publication gates. Review the draft PR and actual frame comparisons before adopting it across episodes.
