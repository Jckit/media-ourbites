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
| FW-06 | Adapt production office to shared kit without changing episode timing/claims | FW-05 | ready | unclaimed | Matched Anthropic before/after; retain narration, captions, feet, labels and payoff |
| FW-07 | Reusable actor/prop actions: look, point, hold, handoff with explicit anchors | FW-06 | blocked | unclaimed | Demonstrate same action in two distinct mechanisms; no episode timestamps inside library |
| FW-08 | Episode scene configuration and narration-driven beat adapter | FW-07 | blocked | unclaimed | New fixture changes data/config only; voice A, original pitch, 1.1x retained; captions tied to real word times |
| FW-09 | Repeatable QA command and CI coverage for shared scene library | FW-04 | active | cloud viewer cycle 2026-10-28T19:45Z; branch `review/fw09-fixture-ci-20261028` from `a2f23775`; owns `.github/workflows/framework-fixtures.yml`, `ROADMAP.md`, `reviews/viewer/20261028T1945Z-fw09-fixture-ci.md` | Existing source guard merged via PR #8; adding PR-triggered 432x768 fixture renders and shared caption/label-strip regression, pending CI results and manual review |
| FW-10 | Document authoring recipe and prove reuse on a second business topic | FW-06, FW-08, FW-09 | blocked | unclaimed | Record configuration/code effort, render evidence and remaining exceptions; no forced narrative structure |

## Current batch boundaries

First implementation is a reviewable scene-library prototype, not a replacement of existing episodes. Preserve `OurbitesHost`, `DarioIllustration`, production narration and numerical claims. Keep synthetic fixture labels visible. Next batches depend on evidence and human style direction, not an automatic mandate to redesign.

No purchase, publication, push, merge or final-media approval is implied by a completed roadmap task.

## Batch 1 evidence

FW-02–04: [review](reviews/viewer/20261028-framework-batch1.md), [office](out/framework-batch1/office.mp4), [storefront](out/framework-batch1/storefront.mp4). Six phone-size stills inspected; TypeScript and exports passed. Continuous motion remains unreviewed; fixtures are silent. Implementation ownership released after validation.

