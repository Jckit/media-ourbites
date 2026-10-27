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
- Character explains; the business diagram carries the information. Use motion to reveal a relationship, not fill every second.
- Keep subtitles separate from titles and diagrams. Limit simultaneous reading demands.
- Record hands-on minutes, rendering time, cost and correction count per episode. Repeat on three topics before building a scheduler or bulk generator.
- State what actually exists: concept, script, storyboard, narrated draft, or reviewed master. Skills guide execution; they are not a production pipeline by themselves.
