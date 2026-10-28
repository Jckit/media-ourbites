# Ourbites reusable animation framework

Canonical shared task board. Goal: expressive existing hybrid characters with restrained low-poly environment/prop depth, reusable across future episodes. No simulation requirement or fixed story formula.

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
| FW-06 | Adapt production office to shared kit without changing episode timing/claims | FW-05 | review | Cloud implementation ownership released; draft [PR #10](https://github.com/jcbandc-arch/media-creator-outbites/pull/10) from `5d847ca3`; no merge/final approval | Shared `RoomShell` production integration, 475-frame render and paired phone-size images verified. Separate caption-QA frame-count contract repair passed [CI 40767344645](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40767344645): 449 visible caption frames, zero mismatches; six framework fixture PNGs byte-identical; [frozen repair and output hashes](reviews/viewer/20261028T2052Z-caption-frame-count-contract.md). Await human visual/audio/rights/factual review; FW-07 remains blocked |
| FW-07 | Reusable actor/prop actions: look, point, hold, handoff with explicit anchors | FW-06 | blocked | unclaimed | Demonstrate same action in two distinct mechanisms; no episode timestamps inside library |
| FW-08 | Episode scene configuration and narration-driven beat adapter | FW-07 | blocked | unclaimed | New fixture changes data/config only; voice A, original pitch, 1.1x retained; captions tied to real word times |
| FW-09 | Repeatable QA command and CI coverage for shared scene library | FW-04 | review | CI implementation ownership released; independent PR #9 `review/fw09-fixture-ci-20261028` from `a2f23775`; reviewer read-only | CI [run 40757354494](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40757354494) passed six 432×768 PNG renders, layout guard, typecheck, 0/120/239 cross-preset reading-strip checks; [hashes/review](reviews/viewer/20261028T1945Z-fw09-fixture-ci.md); manual visual signoff and full-motion coverage pending |
| FW-10 | Document authoring recipe and prove reuse on a second business topic | FW-06, FW-08, FW-09 | blocked | unclaimed | Record configuration/code effort, render evidence and remaining exceptions; no forced narrative structure |
| FW-M00 | Document optional editorial paper-collage motion language and map into FW-07/FW-08; no runtime changes | — | review | Cloud doc owner released; `design/editorial-paper-motion-20261028` from `5d847ca3`; scope: this roadmap, style spec, production/viewer/motion skills, framework README | [Style contract](styles/OURBITES-EDITORIAL-PAPER-MOTION.md), [authoring skill](skills/ourbites-motion/SKILL.md), production/viewer routing and roadmap mapping drafted from user-supplied 9.731s reel; documentation/CI checks pending; human signoff for future art remains independent |

## Current batch boundaries

First implementation is a reviewable scene-library prototype, not a replacement of existing episodes. Preserve `OurbitesHost`, `DarioIllustration`, production narration and numerical claims. Keep synthetic fixture labels visible. Next batches depend on evidence and human style direction, not an automatic mandate to redesign.

No purchase, publication, push, merge or final-media approval is implied by a completed roadmap task.

## Batch 1 evidence

FW-02–04: [review](reviews/viewer/20261028-framework-batch1.md), [office](out/framework-batch1/office.mp4), [storefront](out/framework-batch1/storefront.mp4). Six phone-size stills inspected; TypeScript and exports passed. Continuous motion remains unreviewed; fixtures are silent. Implementation ownership released after validation.


## New optional motion language: editorial paper collage (2026-10-28)

Justin supplied a screen recording of an animated editorial collage reel and explicitly clarified that **3D is not required**. The intended motion vocabulary is layered paper cards, evidence/photo layouts, magnifier focus, fold/torn-edge reveals, kinetic typography and **smooth, object-led transitions**. It is a **selectable 2D-first shot treatment** alongside existing scenic hybrid illustration and precise financial charts, **not** a new protagonist design, default template for every episode, new retention claim or media release approval.

Canonical references:
- **Creative contract / motion and transition rules:** [styles/OURBITES-EDITORIAL-PAPER-MOTION.md](styles/OURBITES-EDITORIAL-PAPER-MOTION.md)
- **How to implement/review reusable actions:** [skills/ourbites-motion/SKILL.md](skills/ourbites-motion/SKILL.md), routed through production and viewer skills.
- **Code/API ownership:** [src/framework/README.md](src/framework/README.md), with prospective modules clearly marked *not implemented*.

**Implementation order:** finish FW-06's existing production and caption-verification gate (separate [draft PR #10](https://github.com/jcbandc-arch/media-creator-outbites/pull/10)); during **FW-07**, build a minimal anchored document/focus/reveal action and demonstrate it on two distinct objects/scenarios without changing the canonical host; during **FW-08**, add declarative beat timing and two purposeful transition types, retiming to actual narration; extend **FW-09** to inspect adjacent transition frames and safe areas; use **FW-10** to test scenic + paper-collage + precise-data shots in a second business topic.

**Initial visual acceptance:** at 432×768, inspect entry/focus/reveal/exit *and adjacent frames*, show no object/hand discontinuity, preserve caption/source safe areas and recognizable actor identity, and use original/rights-cleared paper graphics. Continuous playback and audio listening remain separately required on narrated drafts. New motion-art direction is for human review; the old 3/3 protagonist subjective-revision cap is not reset.
