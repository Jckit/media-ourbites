# Shared scene prototype

`SceneEnvironment` owns scenery only. Choose `preset="office"` or `preset="storefront"` inside the existing `CharacterStage`, behind actors and props. It contains no narration, business facts or episode timestamps. Both presets reuse `PlanarBox`, a front/top/side SVG primitive with one depth direction.

`scenePalette` and `sceneLayout` define the provisional style and 1080×1920 anchors. The actor anchor assumes the existing host at width430; its feet meet floorY1420. Other character sizes require recomputing the anchor from the host's feet at SVG y475. Identity labels and captions stay outside camera transforms. Current prototype camera range is1–1.045; other framing requires visual validation.

`FrameworkPreview` accepts `{environment: 'office' | 'storefront'}` and is intended for240frames at30fps. Both fixtures use exactly the same unchanged host, parcel and 1.1x story clock. Frames0,120,239 cover neutral, gesture and camera extreme. They are deliberately silent synthetic style tests, not factual episode drafts or approved brand masters.

No SVG definitions/IDs are used, so simultaneous instances have no clip-path collisions. Production episode adapters, richer actor actions, and real narration integration remain separate roadmap work.
