# Ourbites reusable animation framework

Canonical shared task board. Goal: expressive existing hybrid characters with restrained low-poly environment/prop depth, reusable across future episodes. No simulation requirement or fixed story formula.

**Status reconciliation 2026-10-28:** merged code or passing CI is not a final episode approval. The optional paper-collage motion *documentation* is approved; implementing it remains FW-07/FW-08 work. See [audit rationale](reviews/REPO-CLEANUP-2026-10-28.md).

## Coordination

- Status: `ready`, `active`, `blocked`, `review`, `done`. `done` requires linked acceptance evidence; human style approval is separate.
- Claim a task here before editing: record owner, UTC claim time, branch/base and exact file scope. One owner per file; reviewers stay read-only. Check current remote revisions first.
- Shared checkout writers must coordinate through the owner of `reviews/viewer-loop.lock`; independent editors should use separate branches/checkouts. Do not steal a live lock or erase unrelated changes.
- Owner updates this board after validation, includes handoff/blocker, and releases the lock. A stale claim requires checking the owner/process before reassignment.
- The scheduled loop selects the next authorized ready task. Repeated wakeups do not grant additional subjective design revisions.

## Tasks

| ID | Deliverable / acceptance | Depends on | Status | Owner / files | Evidence or handoff |
|---|---|---|---|---|---|
| FW-01 | Establish current merged baseline without losing local work | — | done | root | `feb6307`; scenic, caption and ending work merged upstream; local fast-forward preserved dirty review files |
| FW-02 | Shared palette, depth primitive, floor/reading zones; no episode timing or facts | FW-01 | done | scene_kit; `src/framework/*` | First batch; root owns integration; claim 2026-10-28 |
| FW-03 | Office and storefront presets use same character, prop and camera interfaces | FW-02 | done | scene_kit; `src/framework/*` | Two synthetic silent fixtures; inspect neutral/gesture/camera-extreme at phone size |
| FW-04 | Register/render both previews, typecheck, save hashes and visual evidence | FW-03 | done | root; `src/index.tsx`, package scripts, review evidence | Reject overlaps/foot floating/character redesign; disclose motion/audio coverage |
| FW-05 | Human choice of dimensionality and scene balance | FW-04 | done | Justin; review only | Justin explicitly approved FW-05 in ChatGPT on 2026-10-28; approval covers framework dimensionality and scene balance only, not final episode media |
| FW-06 | Adapt production office to shared kit without changing episode timing/claims | FW-05 | review | Production RoomShell integration merged [PR #10](https://github.com/jcbandc-arch/media-creator-outbites/pull/10); user-feedback corrective implementation in [draft PR #21](https://github.com/jcbandc-arch/media-creator-outbites/pull/21), cloud source ownership released 2026-10-29; human playback review pending | User identified stray orange connector at 4s and overlong subtitles. [Before/after review](reviews/viewer/20261029T0817Z-fw06-orange-line-short-captions.md): pointer removed, 12 shorter caption cues preserve original narration words, [CI 40841376909](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40841376909) passed 475 frames, identical decoded audio, 449 caption-visible / zero mismatches; same 432×768 scenes, footer and finance. **Not paper-collage FW-07 implementation.** User has NOT approved corrected video; FW-07 remains blocked by FW-06 human acceptance and final release still requires factual/rights/likeness gates |
| FW-07 | Reusable actor/prop actions: look, point, hold, handoff with explicit anchors | FW-06 | blocked | unclaimed | Demonstrate same action in two distinct mechanisms; no episode timestamps inside library |
| FW-08 | Episode scene configuration and narration-driven beat adapter | FW-07 | blocked | unclaimed | New fixture changes data/config only; voice A, original pitch, 1.1x retained; captions tied to real word times |
| FW-09 | Repeatable QA command and CI coverage for shared scene library | FW-04 | review | Source guard [PR #8](https://github.com/jcbandc-arch/media-creator-outbites/pull/8) and six-frame fixture CI [PR #9](https://github.com/jcbandc-arch/media-creator-outbites/pull/9) both merged; implementation ownership released | [CI 40771802212](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40771802212) passed on current merged main; six phone-size stills / PNG hashes and matched lower-strip checks documented in [review](reviews/viewer/20261028T1945Z-fw09-fixture-ci.md). Continuous scene-motion and narrated audiovisual QA still require separate review; no final-media approval |
| FW-10 | Document authoring recipe and prove reuse on a second business topic | FW-06, FW-08, FW-09 | blocked | unclaimed | Record configuration/code effort, render evidence and remaining exceptions; no forced narrative structure |
| FW-M00 | Document optional editorial paper-collage motion language and map into FW-07/FW-08; no runtime changes | — | done | User approved documentation PR [#11](https://github.com/jcbandc-arch/media-creator-outbites/pull/11), merged 2026-10-28; ownership released | [Creative contract](styles/OURBITES-EDITORIAL-PAPER-MOTION.md), [motion skill](skills/ourbites-motion/SKILL.md), production/viewer skill routing and framework roadmap documented; [main CI 40771802365](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40771802365) passed. **Documentation complete**, new runtime paper-motion primitives and human animation/art approvals remain pending |

## Current batch boundaries

First implementation is a reviewable scene-library prototype, not a replacement of existing episodes. Preserve `OurbitesHost`, `DarioIllustration`, production narration and numerical claims. Keep synthetic fixture labels visible. Next batches depend on evidence and human style direction, not an automatic mandate to redesign.

No purchase, publication, push, merge or final-media approval is implied by a completed roadmap task.

## Batch 1 evidence

FW-02–04: [frozen framework review](reviews/viewer/20261028-framework-batch1.md); the two original office/storefront MP4s were generated under Git-ignored `out/framework-batch1/` and are **local outputs, not portable GitHub links**. Reproduce previews with `npm run render:framework:office` and `npm run render:framework:storefront`; [fixture CI on merged main](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40771802212) provides six 432×768 PNGs and checks. Original six phone-size stills inspected; continuous motion remains a separate review item; synthetic fixtures are silent. Implementation ownership released.


## New optional motion language: editorial paper collage (2026-10-28)

Justin supplied a screen recording of an animated editorial collage reel and explicitly clarified that **3D is not required**. The intended motion vocabulary is layered paper cards, evidence/photo layouts, magnifier focus, fold/torn-edge reveals, kinetic typography and **smooth, object-led transitions**. It is a **selectable 2D-first shot treatment** alongside existing scenic hybrid illustration and precise financial charts, **not** a new protagonist design, default template for every episode, new retention claim or media release approval.

Canonical references:
- **Creative contract / motion and transition rules:** [styles/OURBITES-EDITORIAL-PAPER-MOTION.md](styles/OURBITES-EDITORIAL-PAPER-MOTION.md)
- **How to implement/review reusable actions:** [skills/ourbites-motion/SKILL.md](skills/ourbites-motion/SKILL.md), routed through production and viewer skills.
- **Code/API ownership:** [src/framework/README.md](src/framework/README.md), with prospective modules clearly marked *not implemented*.

**Implementation order:** FW-06's production adapter and caption CI have merged in [PR #10](https://github.com/jcbandc-arch/media-creator-outbites/pull/10), but its **human final visual/audio review is still pending**. After that gate, during **FW-07**, build a minimal anchored document/focus/reveal action and demonstrate it on two distinct objects/scenarios without changing the canonical host; during **FW-08**, add declarative beat timing and two purposeful transition types, retiming to actual narration; extend **FW-09** to inspect adjacent transition frames and safe areas; use **FW-10** to test scenic + paper-collage + precise-data shots in a second business topic.

**Initial visual acceptance:** at 432×768, inspect entry/focus/reveal/exit *and adjacent frames*, show no object/hand discontinuity, preserve caption/source safe areas and recognizable actor identity, and use original/rights-cleared paper graphics. Continuous playback and audio listening remain separately required on narrated drafts. New motion-art direction is for human review; the old 3/3 protagonist subjective-revision cap is not reset.
