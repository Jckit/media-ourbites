# Dario Amodei — character generation brief

This is a reproducible **concept prompt**, not an approved likeness or a license to reproduce photographs. See [profile.json](profile.json), [references.md](references.md), and [our character workflow](../../research/CHARACTER-ASSETS.md).

## Source of identity

Use [Anthropic's official leadership page](https://www.anthropic.com/company/leadership) for the verified identity and current company role. Review at least one actual sourced portrait immediately before making or approving a character. This official page is not a cleared media asset. Record portrait date and any changes in visible hair, eyewear and clothing.

## Base portrait prompt for animation

> Create a flat 2D editorial character portrait of **Dario Amodei, Anthropic co-founder and CEO**, using the attached **verified photographic identity reference** strictly to establish a recognizable illustrated likeness. Match the Ourbites style: paper cream #F4F0E6, ink/navy #142B38, teal #087E83, sparing orange #E97F48, bold simple vector shapes, minimal flat shading, crisp contours, restrained facial details, sophisticated business explainer rather than childish cartoon. Full-body and waist-up variants of the **same** identifiable adult subject. Preserve the reference-confirmed hair, face structure, eyewear and dress; avoid invented facial accessories. Make a calm neutral pose first, clearly illustrated, centered on a plain background, separate clean layers for face, torso, arms, and hands where possible. No logo, text, financial chart, speech bubble, background event, fake photograph, watermark or added people.

**Negative prompt:** photorealistic face swap, 3D Pixar look, anime caricature, exaggerated surprise, fabricated historical event, invented company presentation, name written inside illustration, extra hands or fingers, poster typography.

## Variant generation

Approve one **base** before any variants. Generate poses by editing the same approved character, not redrawing a different actor each time:

- `neutral`: calm, front or 3/4 view.
- `explain`: one hand gently gesturing, unchanged facial identity.
- `thinking`: reflective expression, mild head tilt, no invented distress.
- `point`: directs attention to an **original** explanatory diagram.
- `react` only when narratively appropriate; do not imply this reaction occurred in an actual filmed event.

Keep hairstyle, face shape, skin palette, eyewear, silhouette, outfit and model proportions stable. Compare side-by-side at 1080x1920 and phone-sized scale.

## Delivery contract

Place **approved** assets and master design metadata here only after human decision, with provenance, license/terms of generated output, `reviewer`, timestamp, exact asset revision and SHA-256. Keep third-party portrait references outside Git unless rights permit committing them. Update `profile.json` and the episode's `character_cast.real_people[].appearance_scene_ids` only after design approval.

An unapproved image generated during chat remains a **concept** and is not represented as the current canonical Dario portrayal in the Remotion renderer.
