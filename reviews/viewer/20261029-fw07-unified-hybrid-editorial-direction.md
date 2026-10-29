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
