# FW-07 new human creative direction — unify hybrid + editorial paper motion

**Date:** 2026-10-29 (new user instruction). **Frozen before implementation** on branch `design/fw07-hybrid-editorial-prototype-20261029` from verified main `8a0e634a0ff9bfb857ceca887f4dbf7979fc501e`.

## Exact latest user direction

> "Not desired, its too powerpointy indeed. Its like we need to start over and pick a style."

> "Because we started with the hybrid style, I think we just need to level it out and go with the hybrid and paper collage animation style."

> "Execute."

This is a **fresh, explicit style-direction request**: retain the recognizable hybrid protagonist and dimensional illustrated world, **unify** paper collage as the material/object-motion language, stop making isolated slide/infographic evidence boards. It is **not** approval of the latest FW-07 synthetic art, protagonist redesign, media rights or publication. "Start over" applies to the **creative staging** for a fresh test, *not* destructive removal of proven code, approved FW-06 or other work.

## Observed prior failure and technical baseline

- The user's previous human review of the two FW-07 7-second paper-focus examples: motion smooth **yes**; readability **unsure**; paper-collage resemblance **no**. Updated paper handoff still judged too like PowerPoint. This is explicit human negative style evidence, not proof of poor retention.
- Current main at `8a0e634` contains `DocumentFocus.tsx`, `PaperFocusPreview.tsx`, the original hybrid host, `scene-kit.tsx` and newly merged `skills/ourbites-paper-collage/SKILL.md`; exact-code main CI #40948398465 and fixture run #40948398487 succeeded.
- PRs #25–#28 were closed/merged **into stacked feature branches**, not merged as content into main. Final development branch `review/fw07-note-tear-continuity-20261029` diverges (25 ahead, 3 behind main), with `PaperSceneHandoff.tsx` and a paper mask, but its last human style gate is **still open**; do not simply merge it or call it the accepted style. Preserve as historical, optional components pending reuse decision.
- Separate open PR #16 concerns a silent generic storyboard footer and is outside this task.
- Original reference's documented observable motion vocabulary: layered evidence, magnifier, paper/photo cutouts, moving/folding notes, envelope, connected hand-drawn emphasis, change in scene composition and object-led transitions. No literal cloning of reference assets/composition.

## One new style hypothesis

A deliberately **character-led, spatially continuous, warm illustrative environment** with paper/card cutouts behaving as real objects (unfold, peel, slide, occlude, settle) will read as a cohesive **hybrid editorial animated world**, not a PowerPoint slide. Keep original host recognizable, original paper palette, restrained 2.5D scenery, and exactly readable economic math. **The paper objects are inside the world and the host interacts with them**, rather than the host sitting permanently beside a board.

Creative contract to freeze: `styles/OURBITES-HYBRID-EDITORIAL.md`. The older `styles/OURBITES-HYBRID-2.5D.md` and `styles/OURBITES-EDITORIAL-PAPER-MOTION.md` remain background references, not conflicting primary styles. The skill `ourbites-paper-collage` remains a production recipe guided by the new unified contract; avoid adding redundant skills or installing new software for this first prototype.

## Scoped implementation / ownership

**Owner:** this branch's hybrid-editorial FW-07 style/prototype implementer; no shared Windows worktree lock acquired because remote isolated GitHub branch is used. **Exclusive files on this branch:** new `styles/OURBITES-HYBRID-EDITORIAL.md`, new `src/framework/HybridEditorialPrototype.tsx`, `src/index.tsx` for one isolated composition registration, new `.github/workflows/hybrid-editorial-review.yml`, `ROADMAP.md`, `src/framework/README.md`, `skills/ourbites-paper-collage/SKILL.md`, `skills/ourbites-motion/SKILL.md`, `reviews/viewer-loop.json` (only explicit status/human direction while maintaining local pointers, protected cap/locks), this review document and minimal reproducible QA tests. Check source SHA before each edit. No edits to `AnthropicCharacter`, `OurbitesHost`, Dario, WAVs, finances, original story/script or completed PRs.

## First creative prototype and acceptance

- New **9–11s silent synthetic** hybrid-paper narrative in a distinct original example: **a shop's revenue vs cost vs profit**, using obviously illustrative whole-number amounts (e.g. 120−85=35), *not* an assertion about an actual business.
- Demonstrate **one coherent scene evolving**: host inside illustrated environment handles a folio → paper opens physically into two graphic layers → tangible sales and cost cutouts separate/rearrange into a result → object/physical paper wipe motivates a distinct clean-note payoff. Have the host point/react or interact with the prop (shared anchor while held); no parked mini-mascot and no stacked slide deck replacing each other without material continuity.
- Visual grammar: authored warm ivory/teal/navy/orange brand; purposeful layered paper shadows, folds/tape accents, changing spatial composition and controlled 2.5D shading. No mandatory 3D, stock zooms, physics, generated visual assets, rewritten host or third-party fragments.
- Implement one reviewable isolated `HybridEditorialPrototype` composition in Remotion: **30 fps, 1080×1920 source / 432×768 review**, with ~300 deterministic frames; silent and synthetic clearly labeled.
- **Before scaling into reusable libraries**, inspect actual **full exported MP4**, sampled/adjacent frames across folding, semantic paper/card transitions and the handoff (and, if possible, continuous playback). Check no paper/host disconnection while hand holds; protect label/reading zones; no disappearing overlapping text mid-read, unsupported claims, clipped letters, stray artifacts. Test exact arithmetic, no forbidden editing of production.
- Add a small dedicated GitHub review workflow to render **actual** MP4 and keyframes, verify codec/frame/duration and attach artifacts; run existing TypeScript/Python/layout/source tests and preserve protected files.
- **Human style review required**. Technical acceptance is not evidence of editorial quality or retention. FW-07A (direction) may be documented, FW-07B (prototype) stays `review` until the user accepts look and pacing; FW-07C (extract proven shared components + second-mechanism reuse) stays `blocked` on that visual gate. FW-08 remains blocked.

## Evidence status

**Frozen before new code; output video/hash/CI and observations to be appended only after verified export.** No media signoff claimed.

## Implementation and media-first visual correction trail

- **First prototype source:** original `HybridEditorialPrototype` had 300 frame/30fps 1080×1920 composition, actual CI silent 432×768 output. Initial media SHA-256 `84d74d7eebd308b018ff69689efe48963a2778d3f9ebe39d13c0d40adc94246d`, inspected actual 20-frame timeline, not claimed continuous human playback. **Observed:** a largely blank beige folio cover and an excessively large ruled-note sheet made the visual look like a presentation. The first review workflow also failed its media probe because GitHub's runner did not have `ffprobe`; rendering and standard validation completed. Fixed by explicitly installing FFmpeg/ffprobe as needed; no new npm or generative dependency.
- **Second candidate:** original branded cover text, quieter backplate and a visibly illustrated shop/counter payoff (not full-screen slide). The `9d77411` rendered candidate from [successful exact-code media CI 40952781712](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40952781712), SHA-256 `235fba27efd30a7ec1418bf981efa27e4465efd531c30ea95134f79b968ed36e`, inspected at all 20 timeline points and full phone-size frame **151**. **Observed remaining readability defect:** at frame 151 the floating sales and cost cards overlay the still-readable original folio headline, creating competing `HOW MUCH REMAINS?`/row text. Also the cutouts went nearly invisible before the paper wipe. This violates the new one-focal-target contract. Corrected source-only with: folio opacity releasing from about 3.1–4.45 seconds as content detaches, a convergent position for both source cutouts around 5.55–6.55 seconds, a final result card emerging from their combined position and no additional `WHAT IS LEFT?` rounded presentation pill. The short paper marker stroke retains the focal relationship.
- **Third candidate:** commit `6e33a2faa3fa49f667a7d2119476071366200391`, exact-code render/QA pending at time of this append. Must inspect actual rendered frame ~151 and wipe/stack ~185–220 before calling the visual defect resolved.

**Art-direction honesty:** This first isolated prototype demonstrates the requested *character + illustrated environment + tactile paper-motion approach* but is not a recreation of the original Instagram reel, and the prior user evaluation was negative on style. Even if this code passes and obvious text overlap is repaired, **FW-07B remains for human style, pacing and readability evaluation**, not automatic artistic acceptance. No code change was made to the canonical host, Dario, original Anthropic composition, narration, original audio, financial claims, rights/likeness or release. The synthetic amounts `120−85=35` are original fictional props and captions are explicitly absent.

## Final scoped technical candidate — verified render, human style decision outstanding

**Visual implementation head:** `6e33a2faa3fa49f667a7d2119476071366200391`. Later commit `288812cc628a90a17d8f41b564865db4d42c5d7c` updated this review document only. **All three exact-head checks passed:**
- [Production synthetic render and media QA #40953258396](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40953258396), [complete downloadable artifact #12932571845](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40953258396/artifacts/12932571845), ZIP SHA-256 `0afc3b430effb9f9ad01e73a20676614b41898a72ef4425eb19598511dd58123`.
- [Normal TypeScript/Python/storyboard validation #40953258551](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40953258551), **success**.
- [Shared framework fixtures #40953258685](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40953258685), **success**. All three repeated successfully after the review-document-only commit (review #40953353677, standard #40953353695, fixtures #40953353897).

**Actual candidate MP4:** `hybrid-editorial-prototype.mp4` SHA-256 `0d0cac9255f37f35b9d87255013a461e0316d3edef1567d31b3ec1ad73699348`; H.264, **432×768 / 30fps / 300 frames / 10.000s**, **no audio streams**. Exact source SHA-256 for `src/framework/HybridEditorialPrototype.tsx`: `10e8faf17cde46010036ccc0a98478ff8105d35662ae076f16476147977c5aaf`; unchanged host `src/OurbitesHost.tsx` SHA-256 `594aa8fac10712ce8fae691ef67bbbd8d839154c73fa837bf163d29034bda1b5`, unchanged Anthropic composition `src/AnthropicCharacter.tsx` SHA-256 `622f74288d69f820dbc9dfc96dfa7ad0516e7e5d3e596a64663290c9dcf4c089`. Independent ZIP extraction and SHA-256 calculation matched the CI output.

**Inspection:** source-independent actual decoded phone-sized MP4 timeline and keyframes, including precise frames **0, 65, 96, 122, 151, 185, 205, 219, 247, 260, 299**. All **22/22** attached PNG manifest hashes verified. Actual final frame **151** shows the old folio's duplicate underlying heading absent, with only the independent **SALES +120 / COSTS −85** physical cutouts above the desk; the host is present and pointing. At frame **205** the same result cutout survives as a branded paper object while a paper-edge wipe changes the background to a counter/note; **the changing mask is intentionally mid-wipe**. At frame **260** the host points at **35 LEFT** on an illustrated shop counter with a calculator, independent title **SALES ARE NOT PROFIT**, and the clear synthetic text `120 sales − 85 costs = 35 left`. Original proposal artifacts remain historical, not substitutes for the final candidate.

**Remaining limitations, deliberately not claimed:** this visual candidate is **not automatically comparable in aesthetic polish** to the original higher-energy Instagram reel; it is more restrained and may still look illustrated/static to the reviewer. Human must watch the real video at normal speed and judge rhythm, host involvement, physical paper feel, scene continuity and mobile readability. The inspected samples plus technical render do **not** establish continuous human visual approval, real narrator-caption sync, or YouTube retention performance. **FW-07B status: `review` awaiting user style judgment**, FW-07C remains blocked, FW-08 remains blocked. No original person likeness, sourced production assets, media rights or publication approvals are inferred.

**Next authorized step:** user reviews the 10-second silent file; either accepts this style foundation (then FW-07C extracts the behavior for a second distinct mechanism) or identifies the highest-priority visual mismatch (then one new bounded review iteration). Do not generalize the old slide-look into a library by default.
