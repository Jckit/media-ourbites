---
name: ourbites-production
description: Produce and refine Ourbites business explainer scripts, sourced episode manifests, storyboards, and reusable Remotion animation. Use for Ourbites content production or its human-reviewed pipeline; not generic video tasks.
---

# Ourbites production

## Start with the existing project

Canonical workspace: `C:/Users/Justin/Documents/ChatGPT/Businesses/business-and-chats`.
Read its `SOP.md`, `WORKFLOW.md`, and current episode manifest before changing production work. If moved, locate the project rather than scaffold a duplicate. Preserve existing user edits.

Brand: **Ourbites**. Promise: bite-sized explanations of business. Explain one business move, its mechanism, and why it matters to a beginner. Use clear language and original reasoning. Avoid generic news recaps and investment predictions.

## Voice and engagement

Justin wants playful, engaging explanations with slight banter. Use a curious, lightly cheeky host with dry observations and expressive reactions. Treat the viewer as smart but new to the subject.

- Open with a concrete puzzle or consequence, then pay it off. Humor should help the explanation move forward.
- Aim for one or two short comic beats in a minute as a starting point, not a quota. A raised eyebrow or visual reaction can replace extra dialogue.
- Direct jokes at business jargon, hype, or the absurdity of a situation; never mock viewers for not understanding. Avoid invented motives, factual exaggeration, forced slang and constant sarcasm.
- Keep uncertainty and numerical explanations clear. Do not put a punchline over the key calculation or imply a possible deal is confirmed.
- Example tone: "Same shares. Smaller percentage. Rude." Follow it with the explanation of why a lower percentage does not automatically mean lost value.
- Read the script aloud. Cut any joke that delays the answer, requires explanation, or sounds like a presenter trying too hard. Playfulness is a voice preference, not a promise of retention.

## Produce one reviewable episode

1. Find a primary source for the actual event. Record URL, publisher, precise locator, and real check time. Corroborate disputed interpretations. Never change freshness timestamps without checking evidence.
2. Separate facts, illustrative scenarios, and analysis in the manifest. Avoid implying an explored transaction is an agreed or completed deal. Keep example numbers visibly labeled as examples.
3. Draft a 45–60 second story: question, confirmed event, concrete mechanism, consequence, takeaway. Target 120–145 words initially; final timing follows actual narration.
4. Reuse the manifest shape in `examples/merger.json`; keep draft true until human review. Add a shot plan explaining what changes on screen and what it teaches. Do not confuse written direction with implemented animation.
5. Run `python pipeline.py validate <manifest>` and `python pipeline.py review <manifest> --out <review.md>`. Resolve errors; surface source warnings honestly. The validator checks structure, not semantic truth.
6. Use official Remotion skills for rendering implementation. Use frame-driven motion, modular SVG characters and reusable diagrams. Avoid generated video for routine scenes. Use image generation for concept exploration or occasional assets, with prompts saved.
7. Human editorial review precedes production lock. Create narration, align captions to its real word timings, then retime scenes. Check mobile readability, mathematical proportions, audio, rights and visual implications.
8. Preserve the human final-media gate. Never fabricate Justin's approval, auto-approve your output, or upload without authorization. Manifest/media changes invalidate previous receipts.

## Sustainable defaults

- One recognizable character, fixed palette, limited gestures; provisional hybrid direction until Justin chooses.
- Characters demonstrate the business mechanism through actions, props and reactions. Use charts when a scene cannot communicate a precise relationship clearly. Avoid a small mascot beside a large slide.
- For each character-led beat specify actor, action, prop, visible change and takeaway. Keep faces readable on mobile; connect scenes through a prop handoff, motivated camera move or character action. Reuse fixed character geometry and interpolate gestures.
- Keep subtitles separate from titles and diagrams. Limit simultaneous reading demands.
- Record hands-on minutes, rendering time, cost and correction count per episode. Repeat on three topics before building a scheduler or bulk generator.
- State what actually exists: concept, script, storyboard, narrated draft, or reviewed master. Skills guide execution; they are not a production pipeline by themselves.

## News-first but mechanism-led editorial system (2026-10-27)

Read [research/COMPETITOR-FORMATS.md](../../research/COMPETITOR-FORMATS.md) and [research/VISUAL-EVIDENCE.md](../../research/VISUAL-EVIDENCE.md) for any news-led episode or production using third-party media. The channel remains **Ourbites**, *Bite-sized explanations of business*. Working positioning: *the business behind the headline*. Use a dated event (IPO, earnings, acquisition, financing, strategic decision) as a hook **only if** the video teaches an economic mechanism, reveals incentives or resolves a substantive question beyond the news recap. Show a credible counterpoint/unknown. Where material depth cannot fit into a Short, propose a separate 4–8 minute companion rather than remove essential nuance.

For scene planning, research genuine, source-attributed photos, video clips, historical records, product demonstrations and on-the-record footage alongside primary documents. Label candidates **unreviewed** until factual provenance and reuse permission/license or a specific exception analysis have been reviewed by a human. Do not treat public access, credit, short duration, or 'educational' purpose as automatic permission. A photo/video is not evidence of a different event merely because it depicts the same company. Never create fake archival footage or depict speculative scenarios as real.

For each planned real media shot, record claim IDs, source URL, event date, creator/publisher, exact timestamp/page, proposed use, rights/attribution notes, local hash for final file, and fallback original diagram. Prefer authentic context mixed with Remotion-coded charts, labels and financial relationships; not endless generic AI B-roll. Remotion timing and licensing checks remain manual. If evidence or rights cannot be established, use the fallback and disclose limitations. No new automation may bypass editorial/final review gates.

Competitor channel view counts do **not** reveal retention or a hidden AI workflow. Use public video breakdowns as hypotheses; validate hooks and narrative design only against Ourbites's own Studio audience-retention and Shorts stayed-to-watch reports. Keep creative variety; avoid turning the editorial five-beat outline into a formulaic mass-upload factory.

## Executable visual research step

The metadata-only MVP lives at `asset_research.py`. For pilot 001, run `python asset_research.py build --episode examples/merger-v2.json --plan examples/merger-media-plan.json --out out/media-research/001`. Online Commons metadata search is optional with `--commons --limit 3`. Read `shot-list.md`, independently verify each source and license, and plan specific Remotion shots. Keep unreviewed/unverified candidate media out of final renders. `asset_research.py check` checks manually selected asset fields but **does not grant copyright clearance**. No automatic video search, download or media assembly has been implemented. See `auditions/VOICE-SHORTLIST.md` for committed TTS tests; do not pick a final voice without listening to uncommitted WAVs.

## Canonical Ourbites character layer

Read [research/CHARACTER-ASSETS.md](../../research/CHARACTER-ASSETS.md) and the two profiles [protagonist](../../characters/protagonist/profile.json) and [Dario example](../../characters/dario-amodei/profile.json) before writing a character-heavy shot plan. **Ourbites videos must have the same recurring fictional protagonist**, currently represented by a **provisional hybrid SVG**: a round cream face, navy hair tuft and brows, teal torso, thin ink limbs, mild skeptical humor. Reuse [src/OurbitesHost.tsx](../../src/OurbitesHost.tsx) and its five poses; no new host concept is silently declared canonical or approved.

Every new episode's `character_cast` identifies the host's scene beats and any named real-person illustrations. The host should function as a curious guide, not displace the data or tell a fake historical story. For people like Dario Amodei, verify source identity and appearance via credible original photos, then create one base illustrated likeness with pose variants. **Never publish an unapproved real-person asset**. When Justin requests a design iteration, a clearly labeled draft preview may show the proposed likeness for review; this does not approve it or pretend AI art is a historical photo or someone's real voice. Media sources, credits, potential depiction/disclosure and human approvals still apply. Validate cast with `python scripts/validate_character_cast.py episodes/002/episode.json`. A passing draft cast means structurally ready for **review**, not approved for publishing.

## Illustrated 2D animation style (user direction; PR #2 clarification 2026-10-28)

Read [research/SCENIC-ANIMATION-STYLE.md](../../research/SCENIC-ANIMATION-STYLE.md). Justin likes the accessible **animation STYLE** of science "what-if" explainers, but Ourbites remains a news-and-business explanation channel. **Do not require physical simulation, event→consequence plotting, multiple settings, forced interactions or a specific number of cuts.** Preserve the hybrid cream/navy/teal identity and stable character proportions.

For every shot, choose the visual treatment that best clarifies its fact or idea: a coherent illustrated place, a character interaction, a focused document, or an exact financial graphic. Where a setting is used, keep background elements in a genuinely recessed plane, with consistent perspective, foreground silhouettes, leg/foot grounding, no clutter over names/caveats/captions, and predictable layout under zoom. Pose, camera, ambient movement and object reactions should be **purposeful options**, never quotas.

Use reusable original SVG environment layers, modest parallax where useful, and selectively animated actors and props. Avoid random background movement, cheap depth illusions, unnecessary noise, or claiming a cartoon shows actual historical footage. Review actual rendered frames at mobile resolution, including the whole zoom range. Human likeness, sourcing and final-media rights gates remain independent.

**Feedback scope:** this is one separate visual-style pilot and PR-specific correction, not renewed authorization for unlimited protagonist-design changes. Code/test success alone does not prove viewer retention or visual signoff.

## Optional low-poly visual influence, not a 3D conversion (2026-10-28)

Read [styles/OURBITES-HYBRID-2.5D.md](../../styles/OURBITES-HYBRID-2.5D.md) before experimenting with faceted illustration. Justin clarified that **low-poly animation is his reference**, but he does **not** want a fully low-poly channel. Preserve the **hybrid 2D host and facial identity**. Borrow a limited number of flat-shaded polygonal planes for office furniture, skyline buildings or technical machinery, using the existing cream/navy/teal/orange palette. **Do not** add mandatory physics, event simulation, polygonized faces, camera spins or a Three.js dependency. Financial charts remain flat and legible. Judge each optional facet at 432×768; if it's just visual noise, omit it. This is art direction subject to human approval, not a proven retention technique.

## Optional editorial paper-collage motion (new human reference, 2026-10-28)

Justin supplied a ~9.7-second Instagram reel recording showing **digital paper-cutout / mixed-media editorial motion graphics**: layered evidence cards, a moving magnifier, torn-edge paper reveal, an envelope, red draw-on emphasis, kinetic type and a six-step checklist. He explicitly clarified **this does not need to be 3D**. The canonical shot-treatment and transition specification is [styles/OURBITES-EDITORIAL-PAPER-MOTION.md](../../styles/OURBITES-EDITORIAL-PAPER-MOTION.md); for implementation use [ourbites-motion](../ourbites-motion/SKILL.md).

Use `scenic`, `editorial-paper` or `precise-data` **per beat according to clarity**, optionally mixing treatments in one episode. The channel's host/palette remains unchanged, as do current narration, captions, source/factual gates and final-media approval. A paper graphic is an authored illustration, not genuine scanned footage by default. **Do not** recreate the reference reel or use its textures, logos or art without rights clearance.

In the shot plan, name the **focal object, visual change, reading goal and intended transition into the next beat**. Prefer a document-to-highlight-to-explanation transition or a meaningful shared object handoff to decorative animation. Transitions must have eased continuity, avoid visual jump/caption collisions and use explicit anchors when sharing objects across shots. Add timing only after real voice timings are known; stock `TransitionSeries` overlap changes composition duration. Avoid arbitrary zooms, bounce, cut quotas or adding a paper board to every shot.

**Status/feedback scope:** this document records a new visual-motion *direction*, not finished components, a final character redesign or a reset of the existing 3/3 viewer subjective-revision cap. FW-07 owns motion/prop primitives and anchors; FW-08 owns configurable scene choreography and transitions. Follow roadmap ownership and obtain genuine 432×768 evidence before calling an implementation verified.
