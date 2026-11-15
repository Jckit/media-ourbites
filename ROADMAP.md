# Ourbites — Outcome-led production roadmap
**Updated:** 15 November 2026 · **Status:** active strategic direction · **Owner of quality gate:** Justin

> **North star:** build a repeatable system that produces compelling, professionally edited, evidence-led business Shorts. Success is judged by the **complete video a viewer sees**, and then by whether the same quality is reproducible on a different story. A higher component count, a passing build or another polished 5-second fixture is not a milestone.

This is the canonical **forward-looking plan**. The historical FW-01–FW-10 board, task claims and experiments are preserved in [the archived roadmap](reviews/ROADMAP-ARCHIVE-2026-11-15.md); they are evidence, **not the current priority queue**. Follow the [editorial-first style contract](styles/OURBITES-HYBRID-EDITORIAL.md) and [viewer skill](skills/ourbites-viewer/SKILL.md) for creative criteria, while applying the **milestone-sized work policy below**.

## Executive decision: stop micro-iteration as the strategy

Our technical foundation is ahead of the creative output. We have real Remotion builds, editorial depth, an accounting press, reusable actor gestures, scene direction tickets, CI and source reviews. But too many cycles have improved a hand, an outfit seam, a paper flip, or a single shot without proving a **cohesive, genuinely engaging finished Short**. Full-speed motion, final sound, true word captions, visual evidence and a second-topic demonstration remain uneven or unapproved.

**New operating rule:** work on a **whole viewer-visible outcome** with a clearly different before/after, not a succession of isolated animation fixes. Small corrections are allowed *inside* a milestone delivery when they remove actual defects. They are not separate roadmap milestones or automatic new PRs. No more outfit-polish loops, decorative background redesigns, random movement primitives or silent 5-second fixtures masquerading as a leap in video quality.

**Target creative standard:** editorial motion and cutting comparable in *grammar* to the supplied references (roughly 90% reference influence / 10% Ourbites identity, not copying assets). Modern After Effects-like timing, varied shot scales, cohesive paper/hybrid world, limited useful 2.5D, context-specific visual assets, motivated object/character actions, readable numbers and subtitles, strong cause-and-effect. Professional polish does **not** mean more detailed backgrounds or 3D everywhere.

## Current baseline (verified 15 November 2026)

| Area | What actually exists | Gap / decision |
| --- | --- | --- |
| Production baseline | Temporary repo `main` at `22b2599` (original PR55 accounting-proof work included); evidence such as [issue50 proof](reviews/issue50-proof.md), editorial depth, hybrid host and CI | Working technical source is **not** a reviewed release master |
| New protagonist | [Temporary PR #1](https://github.com/Jckit/media-ourbites/pull/1) is **draft**, includes Concept C selected candidate, physical interaction, synthetic proof and matching ~7s real Anthropic A/B excerpt | Test in **complete narrative**, not another costume study. Canonical host remains unchanged until explicitly accepted |
| Lead voice | [Temporary PR #2](https://github.com/Jckit/media-ourbites/pull/2) is **open**, local Qwen3 clone plus scene-emotion controls | Human listening, private asset handling and final measured word alignment are pending; older rendered Kokoro proofs remain valid baselines |
| Direction | [Editorial style contract](styles/OURBITES-HYBRID-EDITORIAL.md), creative-director tickets, viewer skill and historical reference-led proofs | A contract is **not** a high-quality finished example; selective prototypes are not style-approved |
| Real assets & publish | Research / asset discovery and media-manifest checks exist; historic Anthropic rights/official-mark and voice/caption gates remain open | No automatic clearance, publication or retention conclusion |
| Prior work | Original-repo [open issues](https://github.com/jcbandc-arch/media-creator-outbites/issues) and PRs #59–#65 contain valuable candidate work | **Read-only until Dec 1**. Do not restart separate action-heavy micro-branches or lose unresolved work |

The canonical full-video output is the benchmark; Anthropic is a test case, **not** the sole intended video style or a fixed story structure.

## Milestones and gates (in priority order)

| Milestone | Outcome / evidence to deliver | Status | Advance only when… |
| --- | --- | --- | --- |
| **M1 — Reference-quality story** | One **complete narrated business Short** with a compelling hook, causal explanation, edited multi-shot progression and actual payoff; downloadable playback and before/after video evidence | **NEXT — active priority** | Justin watches at normal speed on phone, finds the visual grammar materially better, and approves the overall style direction. A green CI is insufficient |
| **M2 — Prove visual reuse** | A **different business story** built with accepted M1 behaviors, not cloned graphics; demonstrate shared/configured/bespoke effort | **Blocked on M1 acceptance** | Both complete videos look coherent; common behavior works without copying a bespoke Anthropic shot |
| **M3 — End-to-end production path** | One reliable workflow from research/script → director/asset selection → animation → approved voice/sound/word captions → export → thumbnail/title/description/review | **Not yet integrated**; can prepare interfaces during M1/M2 | Reproduce an episode from documented inputs, pass factual/rights/technical gates and produce human-reviewable master + packaging |
| **M4 — Limited channel pilot & learning** | Three approved Shorts on distinct business mechanisms, documented effort/cost and first genuine YouTube audience signals after authorized release | **Future / human-gated** | Production quality is repeatable; lessons are based on actual Studio metrics and viewer feedback, not guessed retention |

### M1 — Make one finished Short genuinely good (the next implementation brief)

**Deliverable:** one complete self-contained story, preferably using episode 002 Anthropic **only where its claims and source records remain valid**. Let editorial logic determine length (roughly 25–50 seconds is a planning range, not a forced cut); it must answer the question it opens. Deliver a continuous narrated MP4 at phone-friendly review resolution and full-quality final-size render where practical, plus a visible baseline-vs-new comparison and short director review. A 5–8s clip can be used as a *calibration artifact* but **cannot close M1**.

**Work as one integrated film pass**, not separate PRs for each effect:
1. Lock the business question, verified claims and a tight script with hook → mechanism → payoff. Choose a visual hero for the causal change. Make a compact beat/shot plan with explicit source and audio needs; avoid mandatory story formulas.
2. Design and animate the **entire sequence**: useful real-context photos/video/official branding only where source/rights allow; original graphics when not. Preserve strong existing fire/accounting/physical actions rather than regressing to title cards. Distinct shots should relate by object continuity, purposeful cuts, framing and staggered timing rather than repeated slide wipes. Character appears at a consistent useful anchor and **causes or reacts to the mechanism**; it is not decorative.
3. Compose an actual narration/caption/sound experience. Use the existing approved-sounding voice baseline until PR #2's clone is **heard and approved**. Time per-word fades to the final audio, not estimated phrases. Protect data/captions and avoid making the viewer read two competing narratives.
4. Render a **single full video** and review at 1× with sound, phone-size, alongside the prior best available video. Include opening, every shot handoff, causal action, payoff and closing loop if genuinely useful; sample adjacent frames for technical discontinuities.

**Acceptance evidence:** a stable downloadable MP4/artifact link; scene timestamps; comparisons against the earlier version and supplied style references if accessible; viewer rubric for opening promise, comprehension, actor purpose, motion, reading load and payoff; factual/source and rights exceptions separately marked; baseline vs revised audio/caption notes. The goal is clear perceptual improvement across **the whole piece** (aspirational ~8/10 viewer-facing direction), **not** an invented retention increase or a self-certified 10/10.

**Stop rule:** if M1 still looks like an infographic after a coherent first complete pass, revise the **visual concept/shot choreography**, not yet another isolated hand curve, font ornament or paper edge.

### M2 — Turn the approved film language into a real reusable framework

Only after M1's whole-video style is approved, extract the **minimum useful** accepted scene behaviors (e.g. editorial reveal/handoff, actor-object contact/reaction, coherent camera/depth relationship). Reuse these on a different, source-verified business explanation with different props, layout and timing. Track what is parameterized, what requires direction per story, and what remains bespoke; record actual manual and render effort. No forced generic template that flattens narrative variety.

**Acceptance evidence:** two viewable Shorts, one shared component/API map, comparable visual quality, tested source/config inputs and a clear list of unavoidable manual decisions. A pair of renamed synthetic fixtures is not enough.

### M3 — Integrate the production and packaging workflow

Bring existing candidates together without rebuilding already-working modules: [original issue #43](https://github.com/jcbandc-arch/media-creator-outbites/issues/43) director-to-asset handoff, [#47](https://github.com/jcbandc-arch/media-creator-outbites/issues/47) copywriting, [#51](https://github.com/jcbandc-arch/media-creator-outbites/issues/51) story angles, [#53/#54](https://github.com/jcbandc-arch/media-creator-outbites/issues/53) hooks/pacing, [#56](https://github.com/jcbandc-arch/media-creator-outbites/issues/56) captions/audio, [#58](https://github.com/jcbandc-arch/media-creator-outbites/issues/58) whole-video pilot and [PR #60](https://github.com/jcbandc-arch/media-creator-outbites/pull/60) packaging. References are **existing historical work**, not new action requests to the original repository.

Output should be a demonstrable **single episode command/workflow with explicit human gates** for editorial claims, likeness/voice, authentic asset rights, exact MP4 playback and final publication. Produce final word-level captions from measured approved audio, restrained sound mix, consistent graphics, export QA, and thumbnail/title/description variants derived from genuine story assets. Never treat a synthetic TTS pass, metadata validation, or green CI as editorial/rights acceptance. Do not automatically publish.

### M4 — Release controlled pilots, then evaluate

Once M1–M3 gates are satisfied and Justin authorizes publication, release a small three-story batch. Record effort, edits, delivery cost, click-through context, engaged views, stayed-to-watch, average view duration/percentage and retention curves for reasonably comparable uploads. No target percentages without a defensible channel baseline. Decide whether to invest in ongoing automation (including original [issue #52](https://github.com/jcbandc-arch/media-creator-outbites/issues/52)) **after** validating repeatable quality and audience response.

## What happens to existing PRs and small tasks?

- **Preserve rather than discard:** existing approved work, issue history, PR review comments, asset provenance and source evidence are inputs to the milestones. The old [FW board](reviews/ROADMAP-ARCHIVE-2026-11-15.md) is frozen historical context.
- **Temp PR #1 (Concept C):** a **candidate within M1**, not a separate endless character-design stream. Freeze costume detailing; choose canonical vs Concept C by comparing real footage at actual episode size and normal playback. Keep draft/no automatic merge.
- **Temp PR #2 (cloned voice):** a **candidate within M1/M3**, not a prerequisite for beginning visual direction. Local voice is private; human normal-speed listening and aligned captions gate adoption.
- **Original PRs #59–#65:** no new original Actions/commits/merges until Dec 1. Reconcile their useful assets and open gates with milestone work; do not recreate identical micro-issues on the temporary repo.
- **FW-07/FW-08/FW-09/FW-10:** intent maps into M1 (whole-film quality), M2 (reusable scene behavior) and M3 (config/audio/QA). The previous narrow blocking chain no longer dictates project execution; none is silently marked done by this mapping.

## Execution policy — fewer, meaningful changes

1. **One active viewer-visible milestone at a time.** Each substantive PR should deliver a whole coherent sequence or complete second-story/prod-workflow outcome; isolated bug fixes travel within the milestone PR. Infrastructure fixes are exceptions only if they block the deliverable.
2. **One umbrella work item / clear owner** per milestone. Split internal coding into tasks as necessary, but do not create dozens of independently approved micro-PRs. No more speculative motion-library expansion before real style approval.
3. **Evidence first, then judgment:** preserve factual inputs, baseline asset hashes and best existing visuals; compare final encoded videos at the same moments. State what was actually watched/listened to versus frame-sampled. Provide an artifact the human can open, not only an ignored `out/` path.
4. **Quality over churn:** an improvement should be obvious in story comprehension, edit rhythm, visual action, consistent identity, or production reuse. If the viewer would not notice, defer it unless it fixes correctness/rights/accessibility.
5. **Keep approvals distinct:** CI/test success, creative direction, factual verification, voice/rights, release and measured audience retention are separate decisions. Never auto-approve or auto-publish.

## Repository transition: temporary until 1 December 2026

- **Through 30 Nov:** all new commits, PRs, CI, renders and issue execution in [Jckit/media-ourbites](https://github.com/Jckit/media-ourbites); the original [jcbandc-arch/media-creator-outbites](https://github.com/jcbandc-arch/media-creator-outbites) is read-only for development and Actions.
- **On/after 1 Dec:** verify the original Actions allowance has actually reset **before running anything**. Inventory temporary milestone commits, branch heads, PR discussions and any original open PR changes. Transfer/reconcile approved work safely (merge/cherry-pick as appropriate), avoiding duplicate or overwritten commits. Only then resume original-repo development and update canonical links/status.
- No automatic Actions trigger on the original repository during the temporary routing period.

## Next action (not another micro task)

**Start M1 as an integrated production brief.** Audit the strongest existing episode 002 footage and latest candidate PR renders, pick the story question and visual hero, then produce a **complete reference-led, narrated Short** whose edits, characters, captions and payoff can be judged together. Stop presenting individual outfit, elbow or paper-turn improvements as project milestones.

*Roadmap review cadence: update only at a milestone delivery, gate decision, material scope change or repository transition—not after every small code edit.*
