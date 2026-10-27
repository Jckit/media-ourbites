# Ourbites working flow

Updated 27 October 2026. We will refine this against actual episodes.

## Current batch

Revision v4: native 1.1x timing in both Ownership compositions and exports, using `playbackSpeed` / `useStoryClock` in `story-motion.tsx`. Three beats: hook, explanation, payoff. Audio/captions stay outside outgoing visual scenes so narration survives transitions. Export: `out/ourbites-story-v4.mp4`. Manual workflow: `SCRIPT-TO-VIDEO.md`. Generic BusinessShort remains a separate silent storyboard path.

Story revision v3: `src/story-motion.tsx` provides reusable story-beat entry/exit motion with overlap that does not shorten the narration timeline. The ownership composition now opens with five seconds of setup, issuance, a percentage change and character reaction, followed by a opaque push into the explanation. Original explanatory audio starts at five seconds. Both scenarios derive opening values from their scenario data. Export: `out/ourbites-story-v3.mp4` (about 21 seconds). Hook voice is 3.73 seconds, fitting its five-second beat. This is an opening/transition proof, not yet a full multi-scene episode or a persistent-object transition system.

Framework revision: `src/ownership-state.ts` now derives tile count, total shares and ownership percentage from one discrete issuance state. `OwnershipProof.tsx` separates diagram, host, audio and captions; character gestures interpolate between poses. The original narration is unchanged. `OwnershipSecondScenario` exercises 15 owned shares out of 50 becoming 75 (30% to 20%), without reusing incompatible narration. Export: `out/ourbites-framework-v2.mp4`.

Validation: TypeScript passed; `node --experimental-strip-types tests/ownership-state.test.mjs` checks 954 frames across both scenarios, endpoints and an invalid configuration. Visual review includes an intermediate issuance frame. This validates numerical state, not audience engagement. Voice remains a placeholder and captions remain phrase-level. The tile layout currently supports at most 25 tiles and whole units; it explicitly rejects unsupported inputs.

- Three generated character sheets: `styles/character-stickman.png`, `character-minimal-cartoon.png`, `character-hybrid.png`. Exact prompts: `styles/CHARACTER-PROMPTS.md`.
- Provisional recommendation: hybrid. It combines a recognizable teal body with simple stick limbs. These are concept sheets, not animation-ready rigs or approved designs.
- Official Remotion skills installed from `remotion-dev/skills`, pinned commit `30d4553ecd46fbc5212fd0ff006ae43af522158b`, version 4.0.539. Installed: best-practices, create, markup, render, captions, studio, multimedia, docs, interactivity, maps, saas, upgrade. Only relevant skills should be loaded for a task; no SaaS infrastructure is needed for this pilot.
- Project-specific skill source: `skills/ourbites-production/SKILL.md`. Installed copy lives in Justin's Codex skills directory. Keep copies synchronized when revising the workflow.
- Revised pilot: `examples/merger-v2.json`; review packet: `episodes/001/editorial-review.md`; animation direction: `episodes/001/SHOT-PLAN.md`.

## Small production loop

| Step | Output | Human input |
|---|---|---|
| Select story and check evidence | Claim ledger with dated sources | Correct the angle if needed |
| Write and storyboard | Script, timings, visual mechanism | Editorial gate before production lock |
| Build reusable character and diagrams | SVG components and frame-driven motion | Choose or adjust character appearance |
| Record or synthesize narration | Audio with usage rights and word timings | Voice/tone review |
| Assemble and retime | Narrated draft, captions and mix | Final-media review |
| Publish and measure | Published episode and production log | Authorized publication |

Next implementation slice: recreate the preferred character as SVG, implement neutral/point/question gestures, and animate one 10–15 second ownership scene. Test the same components with a second topic before extending them. Character choice can change without rewriting the research pipeline.

Voice selection and audio alignment remain pending. Durations in the manifest are storyboard estimates. No human approval or finished video is claimed.

## Pilot success criteria

Track actual hands-on time, render time, cash cost and revision count. Initial operational target after the reusable assets exist: under 45 hands-on minutes per short. This is a target to test, not an achieved benchmark. Compare audience retention and subscriber response with the channel's recent comparable uploads; do not use historic viral outliers as the baseline.

The $500 monthly goal still needs a separate revenue test. Production automation alone does not establish demand or monetization eligibility. Keep the pilot inexpensive and use its outputs as examples of the media company's explainer service as well as channel content.

## Next research/editorial slice (27 October 2026)

New research policy: [competitor formats](research/COMPETITOR-FORMATS.md), [authentic event imagery/footage + rights](research/VISUAL-EVIDENCE.md), and [Anthropic IPO episode 002 research candidate](episodes/002/RESEARCH-BRIEF.md). Ourbites keeps the confirmed *Bite-sized explanations of business* promise; news items are timely entry points for durable business-mechanism explanations. The wider goal is eventually to reuse this pipeline for other channels, **without prematurely restructuring current working code**.

Update the editorial loop to create **two parallel packets** before production: (1) source/claim ledger with fact versus analysis versus scenario and (2) scene-linked *candidate* visual evidence covering genuine photos, video, official records, links, rights status and original-diagram fallbacks. Clearance and asset acquisition are separate from search. Then script and shot-plan a purposeful mix of authentic scenes and original Remotion explanation, and retain all existing approval gates. This is **documentation / process design**, not an implemented asset-ingestion worker or automatic rights verifier.

Priorities: finish pilot 001 with a proper voice and consistent animation; use episode 002 to test a current-event / financial contradiction structure; use pilot 003 for evergreen economics. Measure audience response and production costs before implementing background news ingestion, bulk generation, or a multichannel scheduler. The previous 'next implementation slice' paragraph above is historical and partially superseded by these priorities; the hybrid SVG proof already exists.

## Media discovery milestone (27 October 2026)

Implemented in `asset_research.py`: scene-aware candidate metadata, manually curated official links, optional Wikimedia Commons search, candidate deduplication, logged failures, Markdown/JSON packet export and fail-closed preliminary checks for selected media. Seed plan: `examples/merger-media-plan.json`; unit tests: `tests/test_asset_research.py`. Nine standalone tests and a curated offline end-to-end packet ran successfully in the implementation workspace; the online Commons branch was mocked, not live network-tested. No media was downloaded, licensed or incorporated in Remotion.

The production loop should now place media candidate research **alongside primary-source research** and require human rights/factual verification before a candidate is used. Next steps: validate real Commons results from a connected local runtime, examine candidates visually and clear individual rights, choose the final voice by listening to auditions, then implement and review one mixed-media pilot. Avoid platform-wide automation until that milestone.
