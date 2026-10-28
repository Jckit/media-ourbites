# Shared scene prototype

`SceneEnvironment` owns scenery only. Choose `preset="office"` or `preset="storefront"` inside the existing `CharacterStage`, behind actors and props. It contains no narration, business facts or episode timestamps. Both presets reuse `PlanarBox`, a front/top/side SVG primitive with one depth direction.

`scenePalette` and `sceneLayout` define the provisional style and 1080×1920 anchors. The actor anchor assumes the existing host at width430; its feet meet floorY1420. Other character sizes require recomputing the anchor from the host's feet at SVG y475. Identity labels and captions stay outside camera transforms. Current prototype camera range is1–1.045; other framing requires visual validation.

`FrameworkPreview` accepts `{environment: 'office' | 'storefront'}` and is intended for240frames at30fps. Both fixtures use exactly the same unchanged host, parcel and 1.1x story clock. Frames0,120,239 cover neutral, gesture and camera extreme. They are deliberately silent synthetic style tests, not factual episode drafts or approved brand masters.

No SVG definitions/IDs are used, so simultaneous instances have no clip-path collisions. Production episode adapters, richer actor actions, and real narration integration remain separate roadmap work.

## Visual treatments and motion roadmap

The **existing** shared kit owns restrained scenic environment geometry and camera/actor placement; it is **not yet** a full choreography engine. Production `OfficeWorld` now consumes the shared `RoomShell` following the merge of [PR #10](https://github.com/jcbandc-arch/media-creator-outbites/pull/10); the before/after production render and caption QA passed, but **human full-motion/audio/style/factual/rights signoff remains open** under FW-06 in [ROADMAP.md](../../ROADMAP.md). Do not confuse a merged implementation with final episode approval.

The **new optional** [editorial paper-collage motion treatment](../../styles/OURBITES-EDITORIAL-PAPER-MOTION.md) covers evidence boards, cutout cards, magnifiers, kinetic titles, paper reveals and **smooth, motivated scene transitions**. Follow [ourbites-motion skill](../../skills/ourbites-motion/SKILL.md) for authoring and QA. This treatment can coexist shot-by-shot with `scenic` and `precise-data` visualizations while preserving the same recurring host, palette and source/reading safeguards.

### Separation of responsibility (planned, not yet shipped)

- **Visuals:** simple reusable original SVG/HTML paper objects, pins, focus marks and optional quiet textures. No episode facts embedded.
- **Motion:** frame-driven easing/settling, named object/hand/focus anchors and reusable actions; same API across scenes.
- **Transitions:** shared-element move, paper-edge mask, slide or short dissolve, selected for an explanatory reason; explicit safe-area and duration handling. Do not add package dependencies without checking current pinned Remotion versions and licensing.
- **Scene director:** episode-supplied beat timing and object IDs select a treatment and actions. Narration/word timing remains the source of truth; `TransitionSeries` scene overlap, if used, changes total duration.
- **QA:** typecheck, repeatable sample renders, adjacent transition-frame inspection and actual playback when available; separate caption/financial/audio guards and human approval. A fixture render does not verify retention.

**Roadmap ownership:** FW-07 remains blocked by FW-06 human acceptance, then adds anchors/actions plus a minimal paper-graphic primitive; FW-08 connects scene timing and transition choreography; FW-09 extends transition regression QA; FW-10 demonstrates reuse on a distinct business subject. Do **not** alter the approved protagonist to implement the motion treatment or bypass the existing FW-06 technical blocker. Suggested future module paths are listed in the canonical style spec and **do not exist yet**.
