# Ourbites editorial paper-collage motion language

> **Style direction update 2026-10-29:** This document retains paper-motion vocabulary as a **supporting reference**, not an independent full-channel or PowerPoint-like slide style. The primary unified direction is [Ourbites Hybrid Editorial Animation](OURBITES-HYBRID-EDITORIAL.md): preserve the existing animated hybrid host **inside the environment**, have physical-ish paper objects be handled, opened, separated and carry the explanation between scenes. The earlier document-focus preview was rejected by the user as too slide-like. Do not mistake its technical success for artistic acceptance.


**Status:** user-requested **optional art and motion direction**, documented 2026-10-28 for future review and implementation. **Not implemented**, not a replacement brand identity, not approval of any new artwork/episode, and not a demonstrated retention method.

**Working name:** **Editorial Paper-Collage Motion** (also: *digital cutout / mixed-media editorial motion graphics* with *kinetic typography*). "Paper animation" is a useful shorthand. **Do not call this literal stop-motion animation** unless it is actually photographed frame by frame; the reference is a screen-rendered collage/cutout treatment. It is **2D-first**; simple planar depth is optional, not a 3D conversion.

## Evidence: the user-supplied reference, not a generic assumption

On 2026-10-28 Justin uploaded a **9.731-second Instagram screen recording** of [this reel](https://www.instagram.com/reel/De_3hwXIBYi/). Local recording `Screen_Recording_20261028_215713_Instagram.mp4`; SHA-256 `f55b6eb6708d5b245ad45326854d32858747596c3816ffae909a4e4476a63b4b`. The recording is **reference-only**, not licensed source footage/assets and must not be included in public Ourbites renders or committed to the repo. Phone-screen Instagram UI obscures some content.

Actually observed in sampled frames from the recording (approximate times, not a frame-by-frame motion/curve measurement):

- **0–3.5 s:** warm textured corkboard; paper/photo cards pinned and layered at slight angles; magnifier tracks particular exhibit details; editorial titles and a persistent illustrated speaker anchor.
- **4–5.2 s:** a lined, pinned/torn-edge note overlays the board; black type and one oversized red question create the focal hierarchy.
- **5.3–6.8 s:** transition to a light clean paper field; envelope, question marks, seal, popping/red circular emphasis; title words appear/change in emphasis.
- **7–9 s:** six numbered paper-like checklist tiles; red hand-drawn circle/connector guides the viewer across specific tiles; closing device-like black panel.

This is **evidence of the sampled graphic vocabulary**, not a measured analysis of easing, exact sound sync, animation FPS, editing software, creator intent or performance. We can borrow general techniques, never recreate the exact composition, words, logos, branded photographs, voice or graphic assets.

## What stays invariant

1. **Host identity:** keep the existing fictional Ourbites guide's round cream face, single angular navy hair tuft, teal body, thin ink limbs and adult editorial tone. Characters may act or remain a secondary anchor; **never** turn them into a permanent lower-third sticker by default. Use `OurbitesHost`; do not invent a replacement or alter its likeness without a new human decision.
2. **Business explanation:** actual source documents, numeric labels, time periods and qualifications must remain accurate. Paper is a visual container, **not** permission to imply a reconstructed document is real historical footage.
3. **Voice & captions:** retain original-pitch Kokoro `am_puck` Voice A, established 1.1x playback, narration-aligned captions and explicit source/footer. Kinetic title text is **not** a substitute for accessible spoken-word captions.
4. **Hybrid flexibility:** scenic illustration, paper-collage investigation and precise numeric chart can coexist in **one** episode. A complex scene need not use every collage effect. A deliberate still frame is fine.
5. **Human gates:** no source-media reuse without rights/provenance review; no real-person illustration or publication approval inferred from a render, style spec or passing CI.

## Three complementary shot treatments (not competing channel styles)

| Shot treatment | When useful | Motion priority |
| --- | --- | --- |
| `scenic` | Office, storefront, supply chain, product setting, character stakes | Grounded actors, prop choreography, restrained camera |
| `editorial-paper` | Investigate a filing, connect evidence, compare claims, reveal a mechanism | Layered paper objects, focus tools, kinetic typography, paper/object-led transitions |
| `precise-data` | Exact numerical relationships, time-series, cash vs accounting | Flat readable chart and deliberately restrained numeric changes |

The **visual brand** remains hybrid cream/navy/teal/orange. The **paper-collage treatment** is an optional motion/graphic vocabulary shared across topics. Do not install a full episode-wide paper texture or force an evidence board into every scene.

## Design grammar

### Layers and staging

- **World layers, back to front:** (1) paper/corkboard/base surface, (2) background evidence/decor, (3) interactive cards/photos/documents with modest shadow and slight authored rotation, (4) temporary focus effects such as a magnifier, underline, circle or spotlight, (5) character and foreground props where justified, (6) persistent brand/captions/source/safety text **outside** moving camera/group transforms.
- Default to **original SVG/HTML/CSS** cards, paper edges, shadows, pins, tape and shapes; use a small licensed/original low-opacity texture only if it survives phone-size inspection. Keep the text itself crisp; don't rasterize claims into a blurry texture.
- Create depth with overlap, shadow, scale and precise z-order; subtle planar/paper rotation is enough. No 3D or physics dependency required. Avoid fake paper noise that competes with financial numbers.
- Prefer **one focal target at a time**. A background collage is context, not a simultaneous reading assignment.

### Reusable object/animation vocabulary (future library, not available yet)

| Primitive | Action/state contract | Examples |
| --- | --- | --- |
| `PaperCard`, `DocumentSheet` | enter → settle → reveal/highlight → exit | Filing extract, quote, financial component |
| `PhotoEvidence`, `Pin`, `Tape` | place → connect → emphasize | Investigation board or source provenance |
| `MagnifierFocus`, `FocusRing` | move to **object anchor** → hold → release | Point at a particular amount, not a random zoom |
| `MarkerStroke`, `Underline` | draw from start to end at given time | One highlighted phrase or red circled step |
| `Envelope`, `Fold`, `TearReveal` | closed → opening → content reveal | Answer card; source remains clearly illustrated |
| `KineticTitle` | words/segments enter → emphasis changes → exit | Hook or key distinction, **separate** from captions |
| `NumberTile`, `EvidenceConnector` | appear → focus → progress | Checklists or causal/comparison steps |
| `SharedPropAnchor` | world-space position/scale/rotation + attachments | Host reaches for a document; no grip discontinuity |

Each primitive owns **rendering and deterministic state**; it must not hard-code a particular company's name, source facts, episode timestamp or subtitle words. Content and action times belong to the beat configuration. Use explicit anchor coordinates and parent transforms, not unrelated absolute-position animation.

### Smooth modern transition grammar

A modern transition should **carry attention and meaning** from the outgoing focus to the incoming focus. Default motion is restrained, crisp and continuous—not a generic effect between every two cards.

| Transition | Motivated use | Test requirement |
| --- | --- | --- |
| **Object match-cut / camera follow** | Magnifier moves to a document excerpt; the excerpt grows into the next explanation | Anchor continuity; no size/position teleport |
| **Paper-edge masked reveal** | A page or envelope opens into a clean new working surface | Mask edge stays coherent; no text clipped mid-read |
| **Shared-element card morph** | Filing line becomes a labeled component card | Amount, sign, unit and source persist across state |
| **Directional slide/push** | Follow material moving left/right through an explanation | Direction follows story movement; not arbitrary swipes |
| **Short dissolve or purposeful hard cut** | Change context or indicate a genuine beat boundary | Text remains readable before and after |
| **Draw-on connector/highlight** | Guide eye among numbered evidence tiles | Starts and ends at correct element anchors |

Timing guidance for **first prototypes at 30fps**, subject to actual viewing—not retention rules: object arrival/reveal approximately **8–18 frames**; a meaningful shared-element transition **10–22 frames**; an emphasis stroke **8–16 frames**. Allow longer when the wording/data requires reading. Focus on **ease-out** when entering, **ease-in-out** for an anchored move, and **critically damped spring** for settling. Do not add bounce to every element, excessive overshoot, perpetual drift, arbitrary zoom or flashing.

For Remotion, implement motion using frame-driven `interpolate()`, `Easing` and `spring()`; prefer a small approved shared set of easing curves. Optionally use `@remotion/transitions` / `TransitionSeries` for scene handoffs **after checking the installed package version, compatibility and any licensing constraints**. **Important:** `TransitionSeries` overlaps adjacent scenes and **shortens the total duration** by the transition overlap; narration/synced captions must be retimed deliberately. For object match cuts, a custom shared-element transform may be more reliable than a stock full-frame transition. No third-party asset/effect dependency is assumed installed.

Primary technical references (checked 2026-10-28):
- [Remotion core APIs](https://www.remotion.dev/docs/api): `useCurrentFrame`, `interpolate`, `spring`, `Easing`, `Sequence`.
- [Remotion transitions](https://www.remotion.dev/docs/transitions/transitionseries): overlapping durations, layouts and requirements.
- [YouTube retention moments](https://support.google.com/youtube/answer/9314415): audience analytics needed to assess any eventual viewer benefit.

## Where it lives in the framework

**Current working modules:** `src/framework/scene-kit.tsx` for shared environments and palette, `src/CharacterStage.tsx` / `src/OurbitesHost.tsx` for character/world behavior, and `src/framework/FrameworkPreview.tsx` for synthetic previews. The FW-06 room-shell candidate is in [draft PR #10](https://github.com/jcbandc-arch/media-creator-outbites/pull/10); do **not** bypass its caption-verifier CI blocker or silently merge it.

**Proposed future structure (paths not yet created):**
```text
styles/OURBITES-EDITORIAL-PAPER-MOTION.md   ← this creative contract
src/framework/motion/tokens.ts              ← easing, focus/settle curves, defaults
src/framework/motion/primitives.tsx         ← frame-driven reusable paper/object actions
src/framework/motion/anchors.ts             ← object and hand attachment coordinates
src/framework/visuals/paper.tsx             ← original cards, torn edges, markers, envelopes
src/framework/transitions/director.tsx      ← match cut, paper reveal, slide, dissolve
src/framework/SceneDirector.tsx             ← consume scene+beat data; no episode facts
src/framework/fixtures/PaperMotionDemo.tsx  ← silent storyboard, two distinct scenarios
```

**Task mapping:**
- **FW-06 (already ongoing):** keep production room integration independent; do not restyle the Anthropic animation while its technical blocker is open.
- **FW-07:** build the shared object anchor/action contract and a *small* first paper-motion primitive batch. Prove one multi-step action in two meaningfully different situations; retain host face and hand grip.
- **FW-08:** configuration-driven shot treatment, object beats, transition director, data-driven narration timing. Keep content claims in episode data, not library components.
- **FW-09:** expand QA to pairwise transition-frame continuity and title/caption safe areas; no automated assertion of tasteful/modern motion.
- **FW-10:** prove both paper and scenic shots in a second business subject and measure code reuse and manual production time.

### Proposed beat-data interface (illustrative, not executable today)

```json
{
  "treatment": "editorial-paper",
  "set": "evidence-board",
  "focus": "operating-loss",
  "objects": [
    {"id": "filing", "kind": "document", "sourceClaimId": "s1"},
    {"id": "operating-loss", "kind": "number-card", "sourceClaimId": "s1"}
  ],
  "actions": [
    {"atSourceSeconds": 0.6, "type": "focus", "target": "filing"},
    {"atSourceSeconds": 1.3, "type": "reveal", "target": "operating-loss"}
  ],
  "transitionOut": {"type": "shared-element", "target": "operating-loss"}
}
```

This example indicates structure only. Real narration and word timings must drive the final frame mapping. The numerical meanings and disclosable sources are not supplied by the animation library.

## First controlled implementation and acceptance

**Suggested first batch:** one original document → focused excerpt → clean explanatory card transition, with a reversible paper reveal and restrained kinetic title. Build it as a **silent synthetic fixture**, without changing the approved protagonist or Anthropic accounting visuals. Demonstrate on two distinct data examples (e.g. a business filing and a store receipt), **not two recolored copies of the same shot**.

Check:
1. Both fixtures show object identity preserved across the transition; no jump, disappearing prop or incorrect attachment. Same story action, different content.
2. Before, transition middle and after frames are inspected at **432×768**, plus adjacent frames and playback for actual easing. Preserve face/gaze, safe-area, source/amount, caption hierarchy and paper/graphic contrast.
3. TypeScript, render and deterministic frame/output hashes logged; audio remains unreviewed in deliberately silent previews. On narrated episodes, independently verify original-pitch Voice A @ 1.1x and real word timing.
4. Record implementation effort, reused primitives and exceptions. Style motion is **subjective and requires human review** before using it as a production default. No retention uplift claim without Ourbites Studio data.

## Style anti-patterns

- Not full 3D, low-poly character redesign or photographic stop-motion.
- Not the exact Instagram creator's cards, photographs, logos, font layout, paper textures or sound effects.
- Not every beat an evidence board; not perpetual paper shaking, bounce, flying objects, gratuitous transitions or mandatory fast edits.
- Not turning a financial statement into a visually attractive but false reconciliation.
- Not a new human approval for protagonist redesign, a reset of the viewer's 3/3 cap or authorization for final publication.
