# Ourbites production pilot

A research-backed, local code foundation for original business explainers. Current public channel: https://www.youtube.com/@Ourbites. Confirmed brand: **Ourbites**. Editorial promise: **Bite-sized explanations of business.** Each episode explains one business move, how it works and why it matters. Earlier image drafts retain superseded branding and are visual references only.

## Current status — 2026-10-29

The production framework includes a recurring **hybrid fictional host** ([source](src/OurbitesHost.tsx)), the shared 2D/2.5D office/storefront scene kit ([framework](src/framework/README.md)) and the **AnthropicCharacter** 475-frame narrated scenic prototype. The production RoomShell integration [PR #10](https://github.com/jcbandc-arch/media-creator-outbites/pull/10) and corrected pointer/short, pause-timed captions [PR #21](https://github.com/jcbandc-arch/media-creator-outbites/pull/21) are merged; **the user explicitly approved that corrected animation as FW-06 on 2026-10-29** ([scope and recorded evidence](reviews/20261029-fw06-human-acceptance.md)). **FW-07 is ready** for new reusable paper-collage animation work. This animation/framework approval does **not** clear the Anthropic story's financial/source accuracy, Dario likeness, third-party media rights, final export or publication.

**FW-07 visual direction (2026-10-29):** The user rejected the standalone paper-focus examples as too slide-like and directed **one unified [Ourbites Hybrid Editorial Animation](styles/OURBITES-HYBRID-EDITORIAL.md)**: our existing hybrid host acts in an illustrated setting, with tactile paper/cutout motions leading the explanation and transitions. [Draft PR #30](https://github.com/jcbandc-arch/media-creator-outbites/pull/30) contains an isolated 10-second silent synthetic style prototype for human review; it is not a new final episode or an approved reusable visual system. FW-07B must pass actual visual/pacing approval before FW-07C generalized components or FW-08 narration/scene choreography. Technical tests cannot approve style.

The optional **editorial paper-collage / digital cutout motion language** is documented in the [style guide](styles/OURBITES-EDITORIAL-PAPER-MOTION.md) and [motion skill](skills/ourbites-motion/SKILL.md), approved as *documentation* in [PR #11](https://github.com/jcbandc-arch/media-creator-outbites/pull/11). The paper-motion components, scene-director and modern transition primitives described there are **planned, not implemented**. [ROADMAP.md](ROADMAP.md) is the current task and gate tracker; the [repository cleanup audit](reviews/REPO-CLEANUP-2026-10-28.md) describes status reconciliation. Preserve local Codex work and reviewer decisions.

The selected lead voice for new Ourbites protagonist narration is **Justin’s local Qwen3-TTS clone**, using the Audio 1_59 reference, light cleanup and 4% pitch reduction at 1.0× playback. Existing rendered demonstrations retain their historical Kokoro audio and timing. Use `python scripts/generate_lead_voice.py --text "Your narration" --output out/voice-auditions/new-take.wav`. Private `out/voice-local.json` supplies `cli`, `model`, `reference_audio`, `reference_text`, and `ffmpeg`; use absolute paths for the executable, model, reference WAV and ffmpeg, and the exact spoken reference transcript for `reference_text`. Voice selection: [selected-voice.json](auditions/selected-voice.json).

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

## Start an episode workspace

```powershell
python scripts/create_episode_workspace.py --id 003 --slug coffee-subscriptions --dry-run
python scripts/create_episode_workspace.py --id 003 --slug coffee-subscriptions
python scripts/create_episode_workspace.py --id 004 --slug warehouse-returns
```

These are example topics, not researched stories. IDs are exactly three ASCII digits
(`001`–`999`); slugs start with a lowercase letter and use lowercase letters/digits
separated by single hyphens (maximum 64 characters). The script resolves the repo
from its own location, so it can run from another working directory.

Each command creates only `episodes/<id>/workspace.json` and `PRODUCTION.md`, plus
empty local media directories under `out/episodes/<id>/`. Dry-run prints the same
planned manifest without writing. Existing IDs or local media, invalid names and
linked/junction output parents are refused. On an I/O failure, inspect any retained
partial output; retry never overwrites it. Run in a trusted checkout without another
process replacing directory links while creation is in progress.

| Ownership | Contents |
|---|---|
| Episode, tracked | Workspace/handoff; research brief, episode.json (claims + scene narration), shot plan, animation tickets and asset manifests **when actually produced** |
| Shared, referenced | Existing `src/framework`, host/characters, production/director/viewer skills and `motion-library/catalog.json`; no component copies |
| Local, ignored | `out/episodes/<id>/{assets/originals,assets/working,audio,captions,renders,reviews}`; source bytes separate from derivatives |

The motion catalog currently has `accepted: []`; references do not approve candidate
recipes. This command scaffolds paths only: it does not write claims/scripts, invoke
agents, download assets, register compositions, render video or approve any gate.
Issue #43 owns director execution/assets; #45 owns visual tickets. Follow
[WORKFLOW.md](WORKFLOW.md) and the generated handoff for those later stages.

Offline proof: `python -m unittest discover -s tests -p test_episode_workspace.py -v`
creates two synthetic workspaces (003 coffee subscriptions / 004 warehouse returns)
in temporary repositories, checks common shared references and zero cloned code,
exercises the CLI from another directory, and verifies no-write/no-overwrite behavior.
The test also checks actual Git ignore rules for working media versus tracked config.

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
| Frame-driven diagrams, hybrid host/illustrated Dario, shared environment kit and staged review drafts | Reusable actor/prop action system and paper-motion primitives; production human art/rights approvals |
| Pinned Remotion; 475-frame narrated AnthropicCharacter prototype with source-WAV pause-timed short captions, reviewed and accepted for FW-06 | Final word-level alignment if required for release, comprehensive factual/rights/likeness approval, final media signoff and publishing |
| Four independent style draft images | WanGP/ComfyUI/TTS model benchmarks and adapters |
| Inspected existing FilmCraft caption interface | A business-specific FilmCraft base/template integration |
| SOP and measurement specification | OAuth analytics, upload/scheduling, retry queue and dashboards |

Do not add all pending work at once. **FW-06 is complete for its animation integration/review gate. FW-07 is ready:** claim one isolated reusable paper-document/character action + anchored focus and smooth transition, demonstrate it on **two distinct mechanisms** (filing and receipt) before generalizing to FW-08, and leave the approved scenic Anthropic draft unchanged. Preserve the selected voice, sourced financial distinctions and separate publication gates. Measure production effort before automating source ingestion or upload.

## Local validation

The corrected [475-frame production video/caption/audio CI](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40843248112) and [standard TypeScript/Python validation](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40843248143) passed on the PR #21 implementation; [merged-main standard validation](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40844414020) also passed on 2026-10-29. Earlier [shared office/storefront fixture CI](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40771802212) passed. The fixture job renders six 432×768 office/storefront PNGs and compares shared lower reading zones, but cannot approve full-motion, audio, copyright or real-person likeness. The earlier pilot's four inspected diagram stills and browser limitation remain historical evidence; they are not the complete current validation scope. Actual local Windows render/Codex/voice environment must be checked separately. Human FW-06 animation acceptance was explicitly recorded, but **no final factual/rights/likeness/media release approval** is inferred.

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
.venv-voice/Scripts/python scripts/audition-anthropic.py --mode full --voice am_liam  # optional DIFFERENT voice audition only; never overwrite selected Voice A
```

The command above is an **optional historical audition example for an alternative voice**, not the selected episode voice. The selected voice is **Kokoro `am_puck` (A), original pitch, 1.1× video playback**, as recorded in [auditions/selected-voice.json](auditions/selected-voice.json). This cleanup does not rerender or resynthesize audio. Actual final voice listening/word-level sync, media rights, and publication remain gated by the SOP.

## Local lead-voice generation

For a private voice-clone audition, `scripts/generate_qwen_voice.py` wraps the local audio.cpp CLI and Qwen3-TTS 0.6B Base GGUF. It runs on your machine (Vulkan is the recommended backend for the tested GTX 1080 setup), then applies light noise reduction, loudness normalization, a 4% pitch reduction with formants preserved, and exports mono 48 kHz / 24-bit WAV. This processing is the selected Justin voice preset for new narration.

Keep the reference recording, transcript, model and output on your computer. The helper does not upload them. `out/` is ignored by Git, and the GitHub Actions workflows do not download models or synthesize audio. Do not place voice recordings in tracked folders or commit generated WAVs.

```powershell
$cli = 'C:\path\to\audio.cpp\vulkan\audiocpp_cli.exe'
$model = 'C:\path\to\models\Qwen3-TTS-12Hz-0.6B-Base-GGUF\qwen3-tts-12hz-0.6b-base-q8_0.gguf'
$reference = 'C:\private\voice-reference.wav'
$ffmpeg = 'C:\path\to\audio.cpp\ffmpeg.exe'
python scripts/generate_qwen_voice.py `
  --cli $cli `
  --model $model `
  --reference-audio $reference `
  --reference-text 'The exact words spoken in the reference recording.' `
  --text-file episodes/002/narration.txt `
  --ffmpeg $ffmpeg `
  --output out/voice-auditions/episode-002-qwen.wav
```

The script also accepts `--text '...'` instead of `--text-file`, and `--no-polish` to retain raw model output. Listen to the result and check names, numbers, pacing and caption alignment before considering any production use. Justin selected this voice for the protagonist; each final episode still needs listening and caption alignment.

## Reusable character system — recurring Ourbites host + real-person illustrations

The character stage is documented in [research/CHARACTER-ASSETS.md](research/CHARACTER-ASSETS.md), with machine-readable [protagonist](characters/protagonist/profile.json) and [Dario Amodei](characters/dario-amodei/profile.json) profiles. The **existing hybrid host** has been extracted into [src/OurbitesHost.tsx](src/OurbitesHost.tsx): one fictional face/silhouette with `neutral`, `explain`, `think`, `point`, and `react` poses. The owner can approve or revise its final appearance later; **provisional is not approved**.

This shared character is present in the existing `OwnershipProof`, generic `BusinessShort`, and Anthropic `AnthropicShort` storyboards. The Anthropic host currently appears in `hook`, `operations`, and `payoff` scenes. A **silent illustrated Dario Amodei component is implemented** in [src/DarioIllustration.tsx](src/DarioIllustration.tsx) and appears in the `AnthropicCharacter` review draft, including the existing accounting-card handoff. **His final likeness and publication use are not approved**; the implementation is not historical footage or his real voice. Character-asset research belongs beside source/media research before final scene approval.

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

## Animation direction: coherent illustrated 2D worlds and optional editorial paper motion

Ourbites is moving beyond a mostly infographic appearance toward the **illustration and character-animation style** of accessible 2D explainers. This means consistent character designs, grounded visual settings, layered depth, uncluttered phone-size compositions and purposeful animation. The science "what-if" reference is **visual inspiration**, not a mandate for simulated consequences, multiple locations, rapid cuts or new editorial formats. Exact diagrams and financial labels remain important. See [research/SCENIC-ANIMATION-STYLE.md](research/SCENIC-ANIMATION-STYLE.md).

The draft [`OfficeWorld` pilot](src/BusinessWorld.tsx) gives `AnthropicCharacter` a simple illustrated office instead of a blank cream stage. Optional loose-paper motion illustrates what Remotion can do, but isn't a requirement for other videos. PR #2 review identified furniture perspective and an illustrated-person label collision; both are subject to phone-size visual verification before merge. No changes to the chosen voice, financial values, cast, historic evidence or publication approvals are implied.

**Optional visual blend (PR #2):** the requested reference is **low-poly animation**, but the intended Ourbites aesthetic is still the established flat 2D hybrid. We are testing small 2.5D/faceted-shading touches on scenery and props—not replacing the host, forcing 3D, or requiring event simulations. See [Ourbites Hybrid 2.5D](styles/OURBITES-HYBRID-2.5D.md). [PR #2](https://github.com/jcbandc-arch/media-creator-outbites/pull/2) was merged after its visual integration checks; the later [FW-06 production integration](https://github.com/jcbandc-arch/media-creator-outbites/pull/10) was merged as well. The framework's visual dimensionality has been approved as an experiment, **not** as final episode media. Open human art/audio/factual/rights gates remain tracked in the roadmap.

**New optional motion vocabulary:** [editorial paper-collage / mixed-media cutout animation](styles/OURBITES-EDITORIAL-PAPER-MOTION.md) with motivated object focus, layered evidence cards, kinetic typography, and smooth transitions is now documented. Use [ourbites-motion](skills/ourbites-motion/SKILL.md) for future implementations; this is **not** already a functional motion library, nor a required treatment for every scene. The protagonist identity, selected Voice A, 1.1× playback, source accuracy and final approval gates remain unchanged.
