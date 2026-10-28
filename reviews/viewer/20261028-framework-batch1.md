# Reusable environment prototype — batch 1

Human direction: execute reusable hybrid + low-poly framework roadmap, with shared task ownership for agents/editors.

Baseline: live fetch and safe fast-forward to `feb6307`, preserving unrelated dirty review direction/state. Existing production scenery is now merged; do not redo PR2. Original host/stage/episode/scenery hashes saved in `out/framework-batch1/baseline-hashes.json`.

Frozen criticism before new implementation: current `OfficeWorld` mixes reusable scenery with Anthropic-specific paper-impact and cloud timing. It supplies no second environment using the same interface. This is an architectural reuse gap, not evidence of poor retention.

Selected batch: add an independent minimal scene kit and two silent synthetic previews. Preserve production scenes and audio. One preset switch changes environment, retaining the same actor, prop, camera and reading zones.

Acceptance: unchanged host identity; front/top/side geometry with consistent depth direction; no episode facts/timing in scenery; phone-readable foreground; grounded feet; no face/label/caption overlap at neutral, gesture and camera-extreme frames. Export both presets and typecheck. Human review still chooses the style balance. Full motion/audio claims require actual playback, not stills or source review.

Coordination: root owns integration, roadmap and evidence; scene_kit owns new framework modules. Baseline/style reviewers are read-only. Canonical task board: `ROADMAP.md`.

Result: FW-02–04 implemented. Shared palette/layout, planar box, office/storefront environments and a single configurable preview now exist in `src/framework/`. Registered `FrameworkOffice` and `FrameworkStorefront`; package render commands documented. Production host, stage, Anthropic and BusinessWorld baseline hashes remain unchanged.

Validation: TypeScript and `git diff --check` passed. Both 240-frame 432×768 MP4 exports completed. Inspected actual frames 0,120,239 for both environments. Same host/prop/reading areas survive preset changes and maximum camera zoom. One repair: initial desk legs/counter stopped above the floor; extended them to ground level, rerendered both exports and all six frames, and inspected matched results. Initial frame120 evidence retained as `before-grounding-*.png`.

Evidence: `out/framework-batch1/{office,storefront}.mp4`, six named frame PNGs, initial grounding PNGs; source/output SHA256 manifests stored beside this review. Sources checked after rendering; no unexpected production edits. New library files authored by one assigned worker, root integrated registrations and task/state tracking.

Coverage limitation: sampled stills only, not continuous playback. Both fixtures intentionally silent; no audio assessment. These demonstrate reuse across two synthetic settings, not yet two complete business episodes. Human style approval, real episode adaptation, reusable actor actions, narration timing and CI remain separate roadmap tasks. No claim of retention gain, final style approval or publication readiness.
