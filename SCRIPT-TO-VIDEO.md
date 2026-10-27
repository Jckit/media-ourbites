# Create a video from your script

## What works today

Two paths exist. `BusinessShort` reads episode JSON and produces a **silent diagram storyboard**. `OwnershipProof` has custom animated scenes, narration and phrase captions. A script alone does not automatically produce custom animation yet. The production pipeline validates editorial structure; it does not verify truth or generate narration.

## 1. Open the project

```powershell
cd 'C:\Users\Justin\Documents\ChatGPT\Businesses\business-and-chats'
# Only on a fresh checkout:
npm ci --ignore-scripts
```

## 2. Break your script into beats

Use one central question. Split into hook, confirmed context, explanation, consequence and payoff. For each beat record spoken text, visible action, source references and estimated duration. Keep factual assertions separate from examples. Review the script before spending time animating it.

## 3. Create the manifest

```powershell
Copy-Item examples/merger-v2.json examples/my-episode.json
```

Edit the new file: replace ID, title, dates, sources, claims and scenes. Do not retain Tesla claims for an unrelated script. Record `checked_at` only after actually reading the source. Each scene needs `id`, `duration`, `kicker`, `title`, `narration`, `visual`, `labels`, `claim_ids`. Supported storyboard visuals and required label counts:

| Visual | Labels |
|---|---|
| combination | Three: left object, right object, relationship |
| ownership | Empty array; this legacy diagram uses fixed example numbers |
| balance | One explanatory label |
| steps | Three steps |

Do not use the legacy ownership visual for other numbers without changing its code. The newer `ownership-state.ts` is the parameterized ownership component's calculation source.

## 4. Validate and review

```powershell
python pipeline.py validate examples/my-episode.json
python pipeline.py review examples/my-episode.json --out out/my-episode-review.md
```

Read the review packet. Fix stale sources, unsupported claims and timing warnings. Passing validation is not editorial approval.

## 5. Preview a quick storyboard

```powershell
npx remotion studio src/index.tsx --props=examples/my-episode.json
```

Select **BusinessShort**. This composition uses your manifest. Selecting OwnershipProof instead shows the separate custom pilot, not your new script.

## 6. Record narration

Record one WAV per beat or create speech using a voice whose terms allow your use. Put files under `public/my-episode/`. Measure the actual durations before locking scene timing. The current Windows demo generator is `powershell -File scripts/generate-proof-voice.ps1`; it generates only the fixed pilot script and overwrites its demo audio. Copy and adapt it for another episode instead of overwriting the pilot.

## 7. Build the animated version

Create `src/MyEpisode.tsx` and register a new Composition in `src/index.tsx`. Reuse:

- `StoryBeat` from `src/story-motion.tsx` for scene entry/exit.
- `HybridHost` from `src/OwnershipProof.tsx` for the character.
- `ownershipState` from `src/ownership-state.ts` for supported ownership scenarios.
- Remotion `Sequence`, `Audio` and `staticFile` for audio placement.

Follow OwnershipProof's timeline pattern. Keep captions in a separate overlay above transitions. Show each caption for its measured audio clip duration. These are phrase captions; word highlighting requires word timestamps from alignment/transcription.

The current shared speed is `playbackSpeed=1.1` in `src/story-motion.tsx`. `useStoryClock()` returns effective frames per source second. Use it consistently for animation, scene starts and audio durations, and set Audio `playbackRate` to the same value. Composition duration is `ceil(sourceSeconds * outputFps / playbackSpeed)`. Do not speed the resulting export again. The older BusinessShort composition does not use this speed setting.

## 8. Inspect and export

```powershell
npm run typecheck
# Silent storyboard:
npx remotion render src/index.tsx BusinessShort out/my-storyboard.mp4 --props=examples/my-episode.json --concurrency=2
# Current narrated pilot:
npx remotion render src/index.tsx OwnershipProof out/my-pilot.mp4 --concurrency=2
# After registering your custom MyEpisode composition:
# npx remotion render src/index.tsx MyEpisode out/my-episode.mp4 --concurrency=2
```

In Studio, inspect scene starts, mid-transition frames and endings. Confirm visible numbers match diagrams at every step; captions do not overlap visuals; narration finishes before scene changes; and the payoff answers the hook. Watch and listen to the exported MP4 before release. Keep publication manual until the full media is approved.

## Authentic footage and archival assets (added 27 October 2026)

During research, create a separate **shot-linked candidate media register** (see [research/VISUAL-EVIDENCE.md](research/VISUAL-EVIDENCE.md)). For each proposed visual, tie it to a specific sentence/claim, preserve the official source and exact moment, state the factual value, rights and credit conditions, and a clean illustrated fallback. A public news/YouTube URL is a research lead, **not** a license. Do not add unreviewed third-party media to the final composition. If permission/exception cannot be substantiated, render the equivalent event/context with original text and code-native animation.

When an asset has been cleared, place the exact approved local file under your **private production asset store**, record its hash, then incorporate the local still or video into Remotion with correct cropping and attributions. Keep borrowed soundtrack, embedded branding, people and editorial-only licensing under separate review where applicable. A film-like sequence should alternate **real event/context → sourced financial visualization → explanatory host/diagram → payoff** based on the needs of the story, not on fixed quotas. Preserve the existing human final-media approval and verify the actual exported media.

## Anthropic financial-news episode (example implementation)

Episode 002 now has its **own `AnthropicShort` Remotion composition** instead of reusing the Tesla-focused generic ownership diagram. Its figures come from [episodes/002/financials.json](episodes/002/financials.json); its narration/claim ledger come from [episodes/002/episode.json](episodes/002/episode.json). Build visual candidate metadata using `python asset_research.py build --episode episodes/002/episode.json --plan episodes/002/media-plan.json --out out/media-research/002`.

```powershell
npm run still:anthropic
npm run render:anthropic:storyboard
```

**Important:** the result is silent and visibly marked `EDITORIAL STORYBOARD · SILENT · UNAPPROVED`. Its text is a script preview, **not** timed subtitles. To add reviewed photographs/video, copy properly licensed exact files into ignored `public/approved/`, record provenance/human review/real SHA256 in `src/anthropic-approved-media.json`, and run `python scripts/verify_anthropic_media.py --require-media`; passing hash/field checks alone does not replace legal clearance. The renderer only considers locally referenced approved-media records and uses original graphics otherwise. No remote media is embedded by source URL.

Run Kokoro auditions with `.venv-voice/Scripts/python scripts/audition-anthropic.py --mode compare`. Select and listen to one voice *first*, then use `--mode full --voice VOICE_ID` to generate per-scene drafts and measured timing metadata under ignored `out/`. Retiming and word-level caption alignment remain manual/pending; do **not** represent the silent storyboard as a publishable master.

## Character stage: reusable guide and named real-world figures

Before finalizing the shot plan, read [research/CHARACTER-ASSETS.md](research/CHARACTER-ASSETS.md) and add the fictional guide to `character_cast`; cast named real people only if they make the business decision easier to understand. For episode 002 the host is implemented in `hook`, `operations`, and `payoff`; the Dario Amodei illustration remains an unapproved concept and is not rendered. Never substitute stylized fiction for source media when the historical moment itself is evidence.

The canonical React vector character is `src/OurbitesHost.tsx`. It supports `neutral`, `explain`, `think`, `point`, `react` poses and a small `OurbitesHostCameo` overlay. Prefer those components over generating a new face every scene. Place the host in a safe area clear of document excerpts, financial numbers, and word-aligned subtitles. Original `OwnershipProof` now aliases this shared component to retain its previous `HybridHost` behavior while the visual design awaits approval.

Draft preflight: `python scripts/validate_character_cast.py episodes/002/episode.json`; stricter proposed release gate adds `--release` and must stay blocked until the owner approves the final version with exact asset revision. This is **not** a substitute for listening, watching the exact render, or clearing real photographs and other rights.
