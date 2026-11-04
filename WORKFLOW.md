# Ourbites working flow

## Shared framework task tracking

Use [ROADMAP.md](ROADMAP.md) as the canonical reusable-animation task board. Agents and editors claim an ID and file scope before editing, follow its dependency/status rules, and attach render/check evidence before marking implementation done. Read it alongside `reviews/viewer-loop.json`; a scheduled wake does not reopen completed work or bypass a pending human style review.

Updated 27 October 2026. We will refine this against actual episodes.

## New episode shell

Run `python scripts/create_episode_workspace.py --id 003 --slug example-topic --dry-run`,
then omit `--dry-run` to create the empty workspace. See [usage and ownership](README.md#start-an-episode-workspace).
This provides paths and a manual handoff, not automatic director/asset orchestration.
Author real research and copy in the existing episode manifest format; preserve human
Gates A/B/C. Each episode references the shared engine and candidate motion catalog.

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

## Anthropic news pilot — actual implemented draft (27 October 2026)

Episode 002 is now tracked with a dated SEC source ledger and original 82-second draft, math in `episodes/002/financials.json`, licensed-media candidate plan, shot plan, and a functioning-code **Remotion composition `AnthropicShort`** (not claimed locally exported or visually reviewed yet). Render via `npm run render:anthropic:storyboard`; start with `npm run still:anthropic` and `npm run typecheck`. Voice comparison/per-scene drafts are enabled by `scripts/audition-anthropic.py`, but actual voice and narration are **not selected or synchronized**. Raw official/CBS/Claude URLs remain uncleared and are **not** downloaded; guard/import verified local files using `scripts/verify_anthropic_media.py`. All output is intentionally unapproved.

This is a distinct narrative test from Tesla ownership: rapid revenue growth → GAAP operating/net loss mismatch → convertible financing fair-value accounting → real compute expense → still-unpriced IPO and investment-economic question. Joseph Carlson's recent episode is a secondary perspective, not borrowed narration. No multi-channel architecture refactor, media publication, or autonomous upload has occurred.

## Character workflow and protagonist integration (2026-10-27)

**New stage after evidence/visual media research, before final scene design:** (C1) identify people and cast the channel's fictional host, (C2) collect sourced reference imagery for real figures, (C3) produce one stable base likeness/design, (C4) create five compatible poses and layers, (C5) human identity/style review, (C6) insert the approved illustration into Remotion and the final media review. Refer to [research/CHARACTER-ASSETS.md](research/CHARACTER-ASSETS.md) and [the host profile](characters/protagonist/profile.json).

**Implemented now:** the former ownership proof's hybrid host is a shared `src/OurbitesHost.tsx` SVG prototype, with expressive poses. It is reused by the generic `BusinessShort`, `OwnershipProof` and `AnthropicShort`. Anthropic has a `character_cast` entry requiring the host in its hook, financial explanation, and payoff; Dario is recorded as a concept only, with **no rendered or approved likeness**. The `scripts/validate_character_cast.py` check validates cast/scene IDs and blocks unapproved real-person assets or a final release with an unapproved protagonist. This is a metadata gate, not full pixel inspection or copyright clearance.

**Still pending:** the user's design selection, visual review of actual host scenes after render, a final approved stable protagonist version, review of generated Dario art and facial consistency before insertion, and synchronizing host gestures with approved narration. Never upgrade provisional character status automatically from passing CI.

## Character-led preview v2 (2026-10-27)
AnthropicCharacter now stages the recurring host and a provisional Dario SVG together. The filing falls between them; host reacts, Dario gestures, then a financing prop moves into their shared space. Voice A and 1.1x timing remain. Dario design is an original interpretation of Justin's supplied concept, not verified historical imagery. Likeness/final media approval remain pending. This preview does not change the separate AnthropicShort episode cast or authorize publication.

## Illustrated 2D animation style direction (28 October 2026; clarified in PR #2)

After PR #1 merged, Justin requested that Ourbites feel closer to the **illustrated animation style** of a "what-if oxygen disappears" video, with more coherent drawn environments and motion than plain infographic cards. [The style study](research/SCENIC-ANIMATION-STYLE.md) records the reference and limits.

**Review clarification on PR #2:** this is a VISUAL STYLE reference, **not** a request for simulation, mandatory cause/effect stories, or multiple locations in every Short. The Ourbites news-led business narrative, factual graphics and pacing remain as before. Build a consistent hybrid visual world using clean 2D backgrounds, readable props, dimensional layering and meaningful movement only when it helps. Static scenes and exact-number charts are still valid.

The draft PR adds a reusable original `OfficeWorld` to `AnthropicCharacter`, with optional paper motion at the filing drop. The reviewer also identified desk depth and Dario label interference; the revised furniture now sits behind the characters, above their feet and away from the label. Verify new phone-sized frames at 30,100,220,450,499 and through the zoom. Never infer performance, art approval or licensing rights from successful CI.
