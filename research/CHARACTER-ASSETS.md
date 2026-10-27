# Character asset system — Ourbites and reusable media engine

Introduced: 2026-10-27. **Current status:** process and reusable SVG host prototype are implemented; final visual identity and individual real-person likenesses still require human approval.

## Why characters exist

Use **three complementary visual layers**:
1. **Recurring protagonist:** the fictional Ourbites guide, present in every Ourbites video. Distinct from narrator audio, real CEOs and investors. Holds the channel's visual identity.
2. **Real-person editorial representations:** a stylized likeness of a verified person such as Dario Amodei, clearly contextualized and drawn from reliable reference photos; never a fake photo, quotation, speech, or historical scene.
3. **Original information visuals and cleared real media:** diagrams, tables, source excerpts, real footage, licensing reviewed separately under [VISUAL-EVIDENCE.md](VISUAL-EVIDENCE.md).

A character is useful when it asks the viewer's question, makes a relationship visible, identifies a decision-maker, reacts to a contradiction, or guides the payoff. It must not obscure the actual evidence. Use the fictional host consistently **without turning each scene into a cartoon about the host**.

## Production stages (between evidence packet and finalized storyboard)

**C1 — Character casting (editorial)**
- Research who matters in the story and why. Mark `protagonist` as required for every Ourbites episode.
- Only add an illustrated real person when identification is genuinely relevant; use clear on-screen names. For other people use generic supporting figures not misleadingly portrayed as an identifiable individual.
- Choose 1–3 narrative beats for the protagonist, generally an opening question, explanation or reaction, and closing takeaway. A recurring small visual can be used where full-body staging would hurt comprehension.

**C2 — Reference capture (research)**
- Keep source links, publisher, verified subject identity, visual reference date, and original portrait provenance in `characters/<slug>/references.md`.
- Distinguish authentic reference photos from generated *interpretations*. Copyright permission to distribute a photo is distinct from using it privately as visual research. Do not check third-party portraits into Git without clearance.
- Observe actual identifiable traits (hair/glasses/face shape/dress); do not invent a person's emotional state, quotations, financial motives, or appearance at an event.

**C3 — Base design (concept)**
- Reuse the existing Ourbites color system (cream `#F4F0E6`, ink `#142B38`, teal `#087E83`, orange `#E97F48`).
- The recurring host's **existing hybrid design** is the current provisional candidate, using [the source prompts](../styles/CHARACTER-PROMPTS.md). It has a cream round head, one angular ink hair tuft, tiny expressive brows and eyes, compact teal torso, thin navy limbs and mitten hands.
- Real people are stylized in matching 2D editorial flat shapes, but must be unmistakably different from the fictional protagonist.
- Keep a base design and reusable poses; avoid per-shot text-to-image re-generation.

**C4 — Pose sheet and rig (asset prep)**
- At minimum: `neutral`, `explain`, `think`, `point`, `react`. Preserve face, silhouette, palette, and scale.
- Prefer modular SVG/React frame-driven motion for the host. Approved real-person art may instead use separately controlled layers, with fixed base/master assets, rather than recreating the face on every frame.
- Track source URLs, generator/model version (if applicable), seed or prompt, revision and hash of the approved image, rights/credits for incorporated source material, and the human reviewer.

**C5 — Human Gate: design and factual representation**
- Check identity readability at actual phone scale, similarity to reference without fabricated detail, style consistency, poses, legibility around captions and source visuals.
- A real-person animated depiction must read as an **illustration**. Do not attribute fictional facial expressions, decisions or speech as historical fact. If a depiction is a reconstruction, label it.
- A generated draft becomes `approved` only on a human decision recorded with specific version/hash. A file named `base.png` by itself does not constitute approval.
- Changing the character base/pose or depicted identity requires re-review of affected scenes and final export.

**C6 — Scene integration**
- Use the shared `OurbitesHost` Remotion component; include it in all new Ourbites compositions. Draw it in a safe zone and adjust its size/position around the information.
- Use illustrated real-person figures only where named in the shot plan and matched to the approved exact asset.
- Mix character continuity with sourced real media and original data diagrams. A photo, clip or source document still goes through the independent media-rights gate.

## Approval checklist

- [ ] Recurring protagonist present in each published Ourbites video, using the approved character version.
- [ ] Script and scene plan identify where the host appears and what it adds; not merely random decoration.
- [ ] No real person's illustrative likeness is presented as documentary footage or a direct quote.
- [ ] Base character design + each pose reviewed against the same reference set; no face drift.
- [ ] Appearance, clothing and recognizable traits checked; prompts and generations recorded; image licensing verified where needed.
- [ ] Mobile safe areas, numerical clarity, captions, and real event footage not obscured.
- [ ] Exact final-media export reviewed; asset version changes invalidate prior signoff.

## Current implementation and limitations

- [characters/protagonist/profile.json](../characters/protagonist/profile.json): reusable host design contract. The provisional hybrid is **not yet selected as the final official identity**.
- [src/OurbitesHost.tsx](../src/OurbitesHost.tsx): modular vector prototype with five poses; shared among Remotion compositions, building on the earlier `OwnershipProof` character. SVG drawings are illustrations, not copyrighted external footage.
- [characters/dario-amodei/profile.json](../characters/dario-amodei/profile.json): pending real-person identity and asset approvals; [references](../characters/dario-amodei/references.md) point to original primary sources.
- No automatic likeness detector, image generation orchestration, pose interpolation/rig editor, asset SHA review service, or universal audio lip-sync exists. Do not claim otherwise.

## Repeatability across future channels

Store actor and character *assets* separately from the channel branding. Another channel can share the same evidence, research and animation pipeline while selecting a different on-screen presenter. Ourbites should have exactly **one** recurring fictional protagonist design, not a random new mascot per episode. Pilot review decides the final look.
