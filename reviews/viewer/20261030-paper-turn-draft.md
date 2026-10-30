# Paper-turn draft direction

Based on PR34 e6dff7b; preserves PR30–34 pose and label repairs. Fresh user request authorizes a new sample, not publication or style acceptance.

PR30 feedback diagnosis: the independent full-scene wipe and generic rectilinear cards undermine authored craft. Selected change: one anchored 35 LEFT slip opens the incoming paper surface with distinct lift, unfold and landing rhythms. No new fonts, particles, character redraw or dependency.

Three style poses planned before motion implementation (1080x1920 coordinates; render at432x768):
- Departure 6.2s: slip at595,795, angle8deg; receipt is sole reading target; background holds.
- In flight 6.9s: slip at430,620, angle-12deg; a folded sheet opens behind it from the slip anchor. Page edge/shadow share that transform. Host remains foreground, protected title/footer independent.
- Landing 8.1s: slip at548,896, angle-4deg; incoming notebook fully revealed; type/marker enter after arrival. No independent sweeping edge.

Acceptance: continuous named source/destination anchors, single semantic result, no source/result text overlap, distinct lift/unfold/settle timing, readable landing. Small draft only; human direction checkpoint still required before library expansion. Validate matched moments and adjacent boundaries, preserve synthetic120-85=35. Continuous motion/audio limits must be disclosed.

## Draft delivered

Implemented a small `PaperFlightPlan` (ordered world-space poses and unfold interval) with `samplePaperFlight(time, plan)`. The shop owns its 6.2s departure, 6.95s apex and 8.1s landing values. Incoming paper bounds derive from the same live slip anchor; surface, crease and cast shadow share the transform. Title waits for landing. Removed the independent jagged full-screen mask. Prior pose tween and source-label-release fixes retained.

Review files: `out/paper-turn/after.mp4`, matched `comparison.png`, `adjacent.png`, before.mp4. Existing CI exports current draft video. Source/media SHA256 in adjacent JSON. TypeScript, 55 Python tests, layout guard and new trajectory tests pass. The trajectory test varies anchors/timing in two numeric plans and validates endpoints, continuity and invalid ordering; it is NOT visual second-scenario evidence.

Actual media: before/after decoded 300 frames each; inspected 6.2,6.7,6.9,7.4,8.1s and adjacent190/191,230/231,242/243. Final H264432x768,300frames,10s,silent. Continuous normal-speed motion and audio perception remain unassessed; no human approval recorded. Three planned poses are now rendered for the direction checkpoint; no large reusable-library expansion or FW-07C completion claimed.

Remaining aesthetic question: does the expanding paper plane feel tactile enough, or still like a scaled panel? This is explicitly a small draft for human assessment. Source sample graphics and opening retain the previous candidate; only the requested transition was reauthored. Style frames were planned in the frozen brief and rendered via this bounded prototype, not separately human-approved before coding. No publication, merge, factual or likeness approval. Automation remains paused.
