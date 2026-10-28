# Ourbites Hybrid 2.5D: optional low-poly influence

**Status:** design experiment awaiting visual approval (2026-10-28). **Not** a mandate to convert the channel to low-poly/3D or re-illustrate the recurring host.

## Creative brief

Justin's correction: the animation reference is **low-poly animation**. He wants to *borrow selected aspects of the style*, not fully commit to it. Ourbites should remain the existing recognizable **hybrid 2D** business-explainer language: round cream head, one navy angular tuft, teal torso, thin ink limbs, readable card illustrations and accurately sourced financial figures.

Conventional **low-poly** describes relatively simple polygonal geometry, often with intentionally visible **flat-shaded facets** on 3D forms. We can adopt *its aesthetic* using original flat Remotion/SVG layers, without building complex 3D models, simulations, a new renderer or AI-generated footage. This is a design hypothesis, **not** a verified mechanism for higher YouTube retention.

## Design mix: 80% Ourbites, 20% polygonal dimensionality

| Keep from existing hybrid | Borrow selectively from low-poly |
| --- | --- |
| Human-readable cartoon faces and eyebrows, stable poses | A few flat planes describing **furniture**, architecture or machines |
| Cream/navy/teal/orange palette | Two or three related tints for front/top/side surfaces |
| Strong outlines and simple shapes | Angled silhouettes, subtle light/shadow planes to establish depth |
| Flat explanatory numerals and charts | A box, office set or prop can have an original faceted 2.5D form |
| Clear reading zones, sincere documentary labels | Optional parallax/motivated turns when they improve spatial understanding |
| Source-verified economic mechanics | **No** ungrounded visual event or simulation just to create movement |

**Never** introduce faceted heads/faces, forced 3D, random camera spins, a polygon count target, persistent particle effects, borrowed graphics, or mandatory consequence/action sequences. A still shot or exact finance chart is acceptable when it helps the viewer.

## First test — PR #2

The office environment in `src/BusinessWorld.tsx` already creates a simple illustrated space. This iteration tests **very restrained planar shading** on the recessed desk and two distant skyline shapes. The hybrid protagonist and Dario remain unchanged. The appearance should be subtle enough that viewers notice a place with depth rather than thinking "we switched to 3D."

### Visual acceptance criteria

1. Compare after/frame-30, -100, -220, -450, and -499 from the same GitHub Actions review against the approved main baseline; inspect the actual 432×768 frames.
2. **Dario's shoes must rest on the floor**, not appear atop the desk. The `DARIO · ILLUSTRATION` label must stay unobstructed through zoom. This was the blocking PR review finding; don't accidentally reintroduce it while changing shading.
3. No new text contrast loss, face overlays, obscured operating/net-loss figures or budget-like cards. No more than a few subtle facets on surroundings.
4. Keep the source claims, Voice A narration, 1.1× playback and provisional likeness/publication gates untouched; run TypeScript and the media comparison workflow.
5. If shading makes the phone-sized layout busier without adding useful spatial clarity, remove the facets. Do not count unapproved art as finalized style.

### References (style background, not proof of retention)

- [Hermoso's explanation of low-poly visual style](https://hermoso.ai/recipes/explainer-styles/low-poly/) describes simplified faceted geometry and flat shading.
- [Remotion transforms](https://www.remotion.dev/docs/transforms) describes combining scale, position, rotation and related properties for frame-based scenes.
- [Ourbites scenic study](../research/SCENIC-ANIMATION-STYLE.md) records the broader real video comparison and the explicit **style-only** PR feedback.

The user—not automated creative cycles—decides whether this balance should become the channel's approved art direction.
