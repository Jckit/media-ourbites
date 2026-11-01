# Ourbites Hybrid Editorial Animation — revised editorial-first creative contract

**UPDATED HUMAN STYLE WEIGHT — 2026-11-01: 80% supplied reference, 20% original Ourbites hybrid.** This is an art-direction weighting, **not an 80/20 frame quota or permission to duplicate the reference's assets**. Spend roughly 80% of visual decision-making on the reference's editorial grammar: strong open-space typographic hierarchy, alternating composed layouts, editorial evidence and UI fragments, selective hand-drawn emphasis, **finely authored graphic choreography**, speed changes, stagger, continuity of position *and velocity*, match cuts and motivated masks. Spend roughly 20% on legacy Ourbites identity: recurring cream/navy/teal host in purposeful cameo/acting, a few palette accents and optional physical paper or dimensionality. **Do not force the illustrated shop/office room, folio, cutout cards or protagonist into every frame.** Graphic illustrations may be extremely simple; motion/editing polish must not be simplified.

**What the approved direction is NOT:** reusing the 10s shop-board/expanding-notebook prototype with new easing. That prototype was reviewed and **still rejected as too 50/50 and PowerPoint-like**. The mandatory next test is a *materially new* editorial-first shot treatment inspired by the user's 25s reference recording: clean title fields and contrasting italics, a few original UI/evidence objects, an original red annotation, anchored transitions with differentiated accelerations, negative space, and a small but purposeful host. Judge the continuous video at natural speed against the reference, not just against our previous attempts. A technically correct Bézier curve is not a substitute for editorial choreography.

**Direction correction — 2026-11-01 (supersedes the 2026-10-29 style hierarchy):** Justin reviewed the current actual animation and said it is moving in the right direction but still too PowerPoint-like, especially graphics and transitions. The supplied Instagram recording is now the **primary visual-design and motion reference**. The original hybrid illustrative world is a **secondary tool**, not the default composition. Preserve the recognizable Ourbites host and channel's factual standards, but favor distinctive editorial typography, evidence/screen layouts, carefully layered graphic elements, visual variety and authored motion. This is an instruction to improve the prototype, **not** acceptance of FW-07B, any particular render or an entire motion library. The original reference is private and not committed. Do not copy its protected graphics/audio.

**Animation corrective rule:** Do not interpolate each keyframe using the same smoothstep and accidentally stop at intermediate waypoints. Specify **spatial Bézier handles separately from temporal easing**, velocity direction through joins, purposeful acceleration/deceleration, anticipation and follow-through. Let background, hero object, typography and character have different onset, duration and motion curves. Prefer the same object moving through an editorial match-cut to a growing rectangular screen wipe. "Auto Bézier" is a motion-design analogy, not a runtime toggle; inspect the rendered velocity and continuity.

**Status (2026-10-29):** Newly directed by user; **visual system and first motion prototype are subject to explicit human review**. This document is the canonical art-direction *hypothesis*, not proof of retention or approval to publish. It supersedes treating `scenic` and `editorial-paper` as competing channel identities; historical [hybrid 2.5D](OURBITES-HYBRID-2.5D.md) and [paper-motion](OURBITES-EDITORIAL-PAPER-MOTION.md) specifications remain supporting vocabularies. No forced 3D, new character or compulsory paper evidence-board template.

## One authored editorial film, not one illustrated room

The **editorial motion language is primary**: clean off-white/white reading fields, high-contrast headlines, selective italic serif emphasis, original UI/evidence compositions, annotation and paper/screen elements with kinetic relationships. Draw on the supplied reference's *design principles*, not its actual art. A darker textured evidence board may establish a mystery before a clean editorial explanation. Alternate composition types when the script warrants it, not on a fixed beat quota.

The existing Ourbites hybrid 2D/2.5D character remains recognizable but may be a smaller commentator, an active prop partner or briefly absent from a close-up; it must still appear meaningfully in every episode. Scenic office/storefront environments and paper folds remain optional supporting treatments. An entire episode need not take place in one illustrated room, nor must every transition unfold a card into a larger card. A purposeful match-cut, tracked graphic, annotation or sharp but motivated cut is often better than a presentation wipe.

**Desired feel:** smart, warm, graphic, tactile, surprisingly connected and confidently paced. **Reject:** generic presentations and rectangles labeled "paper," endless static evidence boards, a tiny mascot stuck in the corner, a moving spotlight that reveals nothing, unmotivated wipes, identical layouts with different words.

### Identity to preserve

- **Character:** same Ourbites host: rounded cream head, angular navy hair tuft, teal torso, thin ink limbs, curious facial responses and established poses. No redesign, morphing or reference character replacement.
- **Palette:** reference-led ivory/white fields and assertive dark type; one restrained warm red/orange annotation accent, using teal where it supports the Ourbites identity or meaning. Keep the existing host colors unchanged; do not force every editorial graphic into the old scenic palette. Low-poly facets remain optional on backgrounds/props, not faces.
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

## Animation grammar: idea → authored movement → editorial change

1. **Establish a visual question.** Use authored typography, evidence, a real graphic element, or a meaningful character action. A host in a scenic room is only one option; no fixed opening template.
2. **Reveal with the mechanism.** A receipt can lift, a document can disclose a row, an annotated word can change meaning, or a screen can recompose around evidence. Preserve factual labels, original assets and meaningful reading time.
3. **Differentiate movement.** Keep the hero object continuous when useful; use a hand-authored cubic path and distinct timing per action. Typography may snap then hold while a graphic travels; a character can react later. Some elements remain still.
4. **Edit through continuity.** Object-match cuts, tracked camera shifts, evidence extraction and purposeful negative space can connect different editorial compositions. Avoid enlarging an entire full-screen rectangle just to reveal another slide. At a cut, match screen-space position, direction and velocity where a continuous object is implied.
5. **Give the payoff a deliberate hold.** Let the result become the dominant composition, without the character, source caveat, screenshot or captions competing for the same space.

**Protagonist is not mandatory in every close-up** but must have an active purpose across the sequence. A clean chart may temporarily take the foreground and the character can return at the payoff.

### Timing and motion

Use Remotion deterministic frame functions with explicit spatial paths, temporal Bézier curves, stagger, overshoot only when materially justified, and settling holds. Specify at least the anticipation, travel and contact timing *when an object physically moves*. Spatial handles shape the trajectory; time curves shape speed. Avoid repeatedly applying the same ease-in-out at every intermediate waypoint, which forces unnatural stops. Don't add wiggles or springs merely for activity. Verify varying speeds at actual frame spacing and normal playback.

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

**FW-07A — unified style contract:** record this creative direction, preserve older specs as technical references, update skills and roadmap. **FW-07B — one polished, isolated prototype:** original **9–11s** synthetic editorial mechanism with connected graphic scenes; a shop receipt may open and split into sales, costs and remaining profit, then fold into the next explanation. **No full library before human style approval.** **FW-07C — extract reusable code:** only after human accepts the visual prototype, separate validated paper/anchor/motion components and prove them on a second distinct business mechanism. **FW-08** can integrate approved choreography and real measured narration timing after FW-07.

**Prototype acceptance is a human judgment** of an actual continuous video: not too PowerPoint-like; recognizably the established host; folded/lifted paper looks connected, tactile and purposeful; transitions feel smooth without teleport; reading hierarchy works at phone size. Passing code/CI or inspecting keyframes does **not** constitute this judgment, final-media release or copyright/likeness clearance.

This direction was created from the user's explicit 2026-10-29 rejection of the previous slide-like FW-07 previews and preference to unify **hybrid + paper-collage**. See [frozen human direction and scoped implementation](../reviews/viewer/20261029-fw07-unified-hybrid-editorial-direction.md).
