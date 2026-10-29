# Ourbites Hybrid Editorial Animation — unified creative contract

**Status (2026-10-29):** Newly directed by user; **visual system and first motion prototype are subject to explicit human review**. This document is the canonical art-direction *hypothesis*, not proof of retention or approval to publish. It supersedes treating `scenic` and `editorial-paper` as competing channel identities; historical [hybrid 2.5D](OURBITES-HYBRID-2.5D.md) and [paper-motion](OURBITES-EDITORIAL-PAPER-MOTION.md) specifications remain supporting vocabularies. No forced 3D, new character or compulsory paper evidence-board template.

## One world, not two styles

The existing Ourbites **hybrid 2D/2.5D character** is the recurring guide inside a living illustrated world. Paper-collage is the **material and motion language inside that same world**: a desk can hold a folded invoice; the invoice unfolds to become an explanatory surface; its sections physically lift, rotate, overlap and carry into the next scene. Clean precise charts remain usable where exact numerical understanding requires them.

**Desired feel:** smart, warm, graphic, tactile, surprisingly connected and confidently paced. **Reject:** generic presentations and rectangles labeled "paper," endless static evidence boards, a tiny mascot stuck in the corner, a moving spotlight that reveals nothing, unmotivated wipes, identical layouts with different words.

### Identity to preserve

- **Character:** same Ourbites host: rounded cream head, angular navy hair tuft, teal torso, thin ink limbs, curious facial responses and established poses. No redesign, morphing or reference character replacement.
- **Palette:** warm ivory paper, navy ink, teal emphasis, sparing orange for reaction/change. Restrained 2.5D faceting applies to *environments and props*, not faces.
- **Voice and facts:** original-pitch `am_puck` Voice A at the established 1.1× playback for narrated episodes, short speech-aligned captions, sourced claims and qualifiers. An original synthetic silent motion test is **not** a narrated episode.
- **Rights:** only original or specifically cleared visual assets; a reconstructed illustration is not real documentary evidence. The user-supplied Instagram reel is reference-only, not a copy-paste asset.

## Composition and depth grammar

Build one cohesive **scene** with foreground/background relationships, not a slide full of labels. Draw physical-ish materials from a limited authored toolkit:

| Layer | Role | What it should do |
| --- | --- | --- |
| Illustrated place | Desk, counter, office/storefront, paper backdrop, scenery planes | Gives actors a place to stand, props a surface and the camera context |
| Host and supporting people | Same stable hybrid art | **Meaningful** gaze, grip, reach, recoil and reaction tied to objects |
| Physical paper objects | Document, envelope, folded folio, receipt, cutout, pinned photo, note | Enter from an actual place, pivot at hinges, fold, travel, occlude and settle |
| Meaningful information | Named document sections, precise amounts, excerpts, annotation | Emerges from or remains attached to the object; one main reading task at a time |
| Protected overlays | Subtitles, source status, honest synthetic labels | Stay outside unstable camera/object transforms, readable on a phone |

Keep dimensions and parent/child transforms explicit. A card released from a hand or separated from a folio begins at the **same anchor**, not at an unrelated absolute position. A paper fold needs a hinge and occluding front/back, not only `opacity` changes. Use subtle shadow and one authored angular facet; don't attempt to simulate 3D or jitter every sheet.

## Animation grammar: world → prop → idea → new world

1. **Establish stakes and a prop.** The host notices, holds or reaches for an object in a real illustrated place. The prop is not an infographic already hovering in open space.
2. **Let the object perform the reveal.** The hand, fold, envelope, turning page, lifted excerpt or open receipt reveals information. The information stays readable and semantically grounded.
3. **Move the explanation through space.** Separate parts or animate the comparison as cutouts **derived from the same source object**. Some elements can remain still; avoid moving all text simultaneously.
4. **Use one object to bridge the scene.** A lifted card, page-turn, shared mark, folding flap or edge of paper becomes the next working surface. Carry focal identity through z-order/scale/position continuity.
5. **Land a real takeaway.** The character or object resolves the question. Pause to read before exit; the takeaway should not be simultaneously competing with captions.

**Protagonist is not mandatory in every close-up** but must have an active purpose across the sequence. A clean chart may temporarily take the foreground and the character can return at the payoff.

### Timing and motion

Use Remotion deterministic frame functions, `interpolate()`, `Easing`, restrained `spring()`; clamp ranges. Start with eased object arrivals, motivated pivots and an explicit reading hold. Avoid rapid arbitrary cuts, perpetual bobbing, identical spring bounces or decorative effects with no information gain.

At mobile review **432×768** test the whole arc, not only final screenshots: host→prop grip, fold/face occlusion, card release, comparison and transition middle, final read. Inspect adjacent frames at attachment and mask boundaries plus actual playback when accessible. Caption/source safe strips are independent of scene camera transforms.

## Distinguish acceptable from slide-like

| Presentation-looking failure | Hybrid-editorial correction |
| --- | --- |
| Static board plus moving circle | Character handles object; the surface opens and changes what can be seen |
| Floating flat rectangles | Tangible paper cutouts with hinge, shadow, rotation and occlusion |
| Character permanently parked below slide | Host is compositional actor who triggers/affects the reveal |
| Fade from panel A to panel B | The same physical object or cutout motivates the change of scene |
| Lots of little facts simultaneously | One question, one visible action, one interpretable payoff |
| Pure art texture over a slide | Material movement first; readable type and clean contrast |

## Development gate for FW-07

**FW-07A — unified style contract:** record this creative direction, preserve older specs as technical references, update skills and roadmap. **FW-07B — one polished, isolated prototype:** original **9–11s** synthetic paper/character mechanism in one scene; a shop receipt may open and split into sales, costs and remaining profit, then fold into the next explanation. **No full library before human style approval.** **FW-07C — extract reusable code:** only after human accepts the visual prototype, separate validated paper/anchor/motion components and prove them on a second distinct business mechanism. **FW-08** can integrate approved choreography and real measured narration timing after FW-07.

**Prototype acceptance is a human judgment** of an actual continuous video: not too PowerPoint-like; recognizably the established host; folded/lifted paper looks connected, tactile and purposeful; transitions feel smooth without teleport; reading hierarchy works at phone size. Passing code/CI or inspecting keyframes does **not** constitute this judgment, final-media release or copyright/likeness clearance.

This direction was created from the user's explicit 2026-10-29 rejection of the previous slide-like FW-07 previews and preference to unify **hybrid + paper-collage**. See [frozen human direction and scoped implementation](../reviews/viewer/20261029-fw07-unified-hybrid-editorial-direction.md).
