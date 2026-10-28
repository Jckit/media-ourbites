# Scenario-led animated scenes: from moving infographics to a living story world

Research and implementation brief — **2026-10-28**. User direction: adopt the **illustrated 2D animation style and feel** of accessible science "what if" explainers (e.g. what happens if oxygen disappears), while retaining a simpler Ourbites hybrid design. **Clarification from PR #2:** this is an animation STYLE reference, not a requirement to simulate events, tell cause/effect stories, or use multiple locations. This is fresh *animation-language feedback*, distinct from the previously consumed protagonist-gaze revision; it does not authorize changing financial facts, Voice A, third-party clip licensing or publication approvals.

## Best-matching public references / limitations

- [The Infographics Show: *What If the World Lost Oxygen for 60 Seconds* (YouTube, 2022)](https://www.youtube.com/watch?v=QlMRwhPiwyw) is a close title/topic match. This source verifies the topic and premise; the full source video was **not** watched frame-by-frame in this research. Its publicly available channel imagery and independent descriptions support studying flat 2D recurring characters and scenes, not copying a specific shot or claiming measured viewer retention.
- [The Infographics Show: animation series listing](https://tv.apple.com/us/episode/what-if-the-world-lost-oxygen-for-60-seconds/umc.cmc.6hva84m30m0ea3cga6tjbb8s5) lists an animation/documentary episode and supports this as a real animated science-explainer reference. The storefront listing is not a production breakdown.
- [What If Show: *What If the World Lost Oxygen for Five Seconds?*](https://whatifshow.com/what-if-the-world-lost-oxygen-for-five-seconds/) demonstrates an *event → consequence → next consequence* thought-experiment story structure. Scientific claims in this article have not been independently audited; we use **narrative technique only**.
- [The Infographics Show channel format analysis](https://www.reelpantry.com/teardown/theinfographicsshow) is a **small, third-party eight-video TikTok sample** (different catalog from the cited YouTube oxygen episode). Its reported editing speed/cut rate is neither the YouTube video's verified pace nor an optimal formula. It may motivate comparing story beats; do **not** impose every-three-second cuts or faster narration.
- [YouTube retention reports](https://support.google.com/youtube/answer/9314415) distinguish top moments, dips and spikes; spikes may indicate **confusion**, and private audience behavior is unavailable for competitor channels. No specific "scenic animation" uplift is proven.
- [Remotion interpolation](https://www.remotion.dev/docs/interpolate), [spring](https://www.remotion.dev/docs/spring) and [compositions](https://www.remotion.dev/docs/composition) allow deterministic 2D layered actions without new heavyweight 3D or external art software.

**Style inference, not verified timing analysis of the exact video:** cohesive 2D illustration uses stable character designs, understandable spaces, foreground/background depth, readable acting and intentional transitions. Prop interactions and reactions are one useful option when they fit the script—not a required story structure. Ourbites can adopt this *visual language* without reproducing the competitor's specific artwork, narrative formula, camera timing or soundtrack.

## What the current Ourbites video actually shows

**Inspected real artifact:** 16.683s `AnthropicCharacter`, 432×768, AAC/H.264, MP4 SHA-256 `793f48ccfbe36e0ab92605275eb19c9abf4db280e0eda6e294152c71d2efb568` from the approved PR's GitHub Actions review (artifact 12816778529). Extracted nine phone-scale frames at **0.6, 1.8, 3.2, 4.8, 6.6, 8.4, 10.2, 12.6, 15.6 seconds**, visually inspected a contact sheet. This is **sampled real media**, not a proof of full continuous-motion or narration quality.

What already works:
- Filing physically drops; fictional hybrid host reacts and pulls out a wallet; Dario silently points to the income-statement distinction.
- Original SVG actors have matching visual language; a financing accounting card joins their hands.
- Script correctly distinguishes $80.75B reported net loss, $693M operating loss and a $72.39B financing fair-value change; remaining items are **not** claimed zero.
- Short, conversational Voice A narration exists. Its encoded signal was tested by prior workflows; listening still needs human judgment.

What feels more like an infographic:
- Characters remain **against a nearly blank cream plane with a thick baseline** for the entire 16.7 seconds. There is no illustrated room, perspective, interacting furniture or identifiable business location.
- The filing hangs in an otherwise empty world. As soon as the initial drop ends, the central visual relationship is mostly **characters + text panel**.
- Camera zoom and small gesture changes are not complemented by environmental action. The audience reads rather than watches causes unfold.
- The bright empty vertical background emphasizes isolated information cards, not a setting where the filing has consequences.

**Diagnosis:** the problem is primarily **thin spatial staging and limited character/world design**, not a lack of simulation, extra physics or faster editing.

## Proposed Ourbites animation grammar

| Production layer | Existing tendency | Optional scenic-style treatment |
| --- | --- | --- |
| Story space | Clean background and chart/title panels | A simple reusable place (office, trading desk, factory, product interface, storefront), with floor, foreground, background and depth |
| Action | Numbers reveal; character occasionally points | More expressive but stable characters; hand/object interactions only where they help illustrate the narration |
| Camera | Mostly static, one mild zoom | Stable framing or a subtle motivated camera move; maintain mobile-safe reading zones during zoom |
| Environments | Nearly blank, generic | Reuse original SVG environments when useful; no required number of rooms, locations or 3D assets |
| Physicality | Filing floats, shapes appear | Plausible feet/furniture placement, spatial layers and grounding; incidental impact/reaction motion is **optional**, never obligatory |
| Data | Large cards with captions | Keep exact, prominent charts/text whenever the explanation needs precision; balance with illustrated context rather than banning cards |
| Transitions | Cut/title fade | Static transitions, prop handoffs and camera moves are all acceptable; pick the least distracting approach for the explanation |
| Real media | Candidate external footage | Actual historic moments if verified/cleared; avoid using generated reenactments as fake actual footage |

**Practical 2D/2.5D options:** flat vectors, consistent palettes, layered depth, clean silhouettes, and restrained frame-driven gestures; optionally add parallax, prop contact or a close-up when it improves clarity. This is *limited illustration animation*, with no required simulated reactions, 3D or multi-location structure.

## Pilot: office world reacts to the S-1

**One bounded implementation**, no audio or financial changes: add original reusable `src/BusinessWorld.tsx` and use its `OfficeWorld` in the existing `AnthropicCharacter` stage. Establish an office environment, illustrated window/city, a desk/plant/background depth, and a small sheet/desktop reaction exactly when the filing drops. The filing and existing voices/characters/props remain the narrative focus. Preserve mobile readability and source labels. This scene should feel like an *event taking place somewhere*, not a decorative office still.

**Not in this initial iteration:** extra 3D assets, new camera math, replacing the Dario likeness, rewriting the script, remaking all 82-second scenes, making bogus financial cash effects, creating unlicensed AI video, or resetting completed Codex reviews. Those require separate evidence/approval.

## Acceptance criteria before declaring the new layer successful

1. Compare exactly the approved baseline frames at **0.6, 1.8, 3.2, 4.8, 6.6, 8.4, 10.2, 12.6 and 15.6 seconds** to the new full-rendered `AnthropicCharacter` at 432×768, and inspect video around the actual paper impact.
2. Scene has coherent illustrated depth; the **optional** filing-paper reaction in this particular pilot is brief and readable. No furniture/feet identity confusion, text/face/caption overlap or claim implied by decoration.
3. New backdrop is drawn with local original vectors and does not compete visually with the numbers, silhouette or captions.
4. Original finance dataset, Voice A audio/1.1x playback, full 500 frames, animation timings, Dario's silent role, and human source/likeness/rights/publication gates stay unchanged.
5. Run npm typecheck and Python tests; compare actual render frames and ideally the full MP4 (do not claim an actual retention uplift or human approval).
6. Any automated style test is a design hypothesis; measure viewer impact only with a comparable published YouTube Studio test after human approval.

## Future development priorities, not automatically approved

1. **Optional reusable scene templates**: 2D office, storefront, server center, factory, boardroom; use only as many as an episode needs and check actor/label safe areas.
2. **Actor rigs**: reusable look-at, reach, grip, walk, seated and react actions as *stable state machines*; avoid changing faces between render frames.
3. **Optional shot variation**: wide/medium/close-up as beneficial for viewer comprehension; one coherent location and held shots are also valid.
4. **Better sonic storytelling**: licensed prop impacts and room tone, optional; keep original voice and audio approvals intact.
5. **Storyboard shot planning**: identify illustration/background, focal actor or fact, action *if any*, mobile-safe labels, and the communication goal. State a physical reaction only if the scene actually uses one.

No imitation of copyrighted clips or scene assets. Reference URLs are for editorial research, not permission to reuse them.

## First actual preview and one repair finding (frozen 2026-10-28)

Reviewed full actual 432×768 output from [GitHub Actions 40696289269](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40696289269), artifact `viewer-protagonist-before-after` (ID 12820225204). Encoded 500 frames, H.264/AAC, 16.683 seconds; MP4 SHA-256 `0b6126877bbb3c630126f415ed5c42719861be58f8e5c2b72e57466f0e9cdd7c`. Python tests, TS checks and four decoded voice-signal checks passed; these don't constitute attentive human voice listening. Sampled actual MP4 at 0.6,1.8,3.2,4.8,6.6,8.4,10.2,12.6,15.6s.

**Confirmed improvement:** characters now occupy a legible office space with window, desk, city depth and associated props while the filing remains the foreground focus. The original S-1 lines and financing card remain legible at sampled phone scale. This is a **simple animated backdrop**, not yet a fully cinematic multi-location story.

**Observed visual defect that requires one repair:** the two new loose sheets remain suspended, unchanged in the space between host and Dario at 3.2s through 15.6s. They also appear during the filing's approach rather than only after the impact. This is accidental **perpetual decorative clutter** and contradicts the causal-animation goal. Fix only this new paper timeline: no pages before contact; brief ballistic arc after filing contact; settle visually toward desk and disappear by ~2s, leaving static table stack. Verify at t=0.6/1.8/3.2/12.6 and transition frames; other cast, props, audio, finance and captions must stay identical. At most one repair on this PR iteration.

**Hold:** no measured improvement to viewer retention, no license/likeness/final-media approval, no guarantee this single room fully meets desired animation language. Future multi-shot character mechanics need separate review.

## Repaired proof checked in actual media — 2026-10-28

After the single bounded causal-paper repair, [GitHub Actions run 40696947388](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40696947388) passed TypeScript, Python unit tests, paired phone-sized frame renders, 500-frame H.264/AAC video export, audio-stream probe and all four **signal-presence** checks. Verified output at `c3a2289c56304364727a398e27e14cd7da0b0213`, artifact `viewer-protagonist-before-after`, ID `12820111309`, original 432×768 MP4 SHA-256 `c5dd62ef7f713caea2079e591de0a63cabe462bb936a769237ab75fc22611e83`. The subsequent `9cf248f` revision only removed an unused constant, and `1bd63767` expanded PR frame checks; those do not change the animated scene calculation.

**Real decoded-media inspection:** sampled the repaired full MP4 at **0.60, 0.95, 1.25, 1.80, 2.25, 3.20, 6.60, 12.60 and 15.60 seconds** at 432×768 (reduced to a visual contact sheet). The sheets are **absent before impact**, show briefly alongside the host's recoil at 0.95–1.25s, and are **gone by 1.80s and all following sampled moments**. The initial accidental perpetual floating-sheet defect has been corrected. The added physical office environment is visibly behind characters and financial props, with no observed text, face or caption occlusion in sampled views. Long-term character silhouette and Dario's separate quiet role are preserved.

**Important qualification:** this completes one **scenic set dressing + causal environmental response** proof, but the actual Anthropic short is still a **single-room, mostly explanatory interaction**. This is one stage toward the requested richer scene-led format, **not equivalent** to a professionally produced multi-scene 2D/3D what-if episode. No exact-source video was copied, no visitor-retention improvement proven, no independent listen-through verified original voice identity/pitch, no character likeness/final-media/publication approval obtained. Future meaningful upgrades should improve consistent 2D illustration, spatial clarity and readable acting, using extra locations or prop reactions **only when helpful**, not as a success requirement.

**Remaining:** review full playback and voice/captions with human eyes and ears, consider further illustrative 2D settings only if the pilot is approved and a later story benefits from them, and preserve source/rights gates. The PR remains a **draft** for Justin's review, not merged automatically.

## PR #2 reviewer clarification — 2026-10-28 16:11 UTC

The [requested-changes review](https://github.com/jcbandc-arch/media-creator-outbites/pull/2#pullrequestreview-5685881194) explicitly distinguishes **animation style** from simulated physical consequences. The normative guidance and table above now reflect that clarification. Older prototype observations below remain a factual record of what was originally tested, **not a requirement for future episodes**. Coherent illustrated 2D staging, stable characters, perspective, and readable source/identity labels through zoom are the evaluation criteria; contact/impact/camera movement is optional.

The reviewer also found a genuine perspective collision at phone-size frames 100 and 220: the desktop appeared level with Dario's shoes and the right desk leg interfered with the `DARIO · ILLUSTRATION` label. The repair moves only the furniture and its on-surface props into a recessed background plane (plus sheet landing coordination), without moving actors, changing voice, changing financials or creating new scenes. Verification criteria and timestamped evidence are frozen in [reviews/viewer/20261028T161108Z-pr2-review-fixes.md](../reviews/viewer/20261028T161108Z-pr2-review-fixes.md). Do not merge until the revised same-frame render has been inspected.

## Explicit low-poly clarification and restrained first implementation (2026-10-28)

Justin clarified that the intended reference is **low-poly animation**, but not as an all-or-nothing aesthetic. Low-poly usually means economical polygonal geometry and deliberately visible flat-shaded facets; the relevant transferable elements for Ourbites are **geometric clarity, two-tone planes and subtle spatial depth**, not necessarily polygonal human heads or 3D renders. See the dedicated [hybrid 2.5D art spec](../styles/OURBITES-HYBRID-2.5D.md) and [low-poly style explanation](https://hermoso.ai/recipes/explainer-styles/low-poly/). This is a *style reference*, distinct from the science video's literal scenario and not a claim about actual channel retention.

In PR #2's existing `BusinessWorld`, the optional first experiment adds only four planar accents on a distant office skyline and recessed desk. We intentionally **do not touch** the fictional protagonist, Dario likeness, script, charts, audio, or timing. Inspect the exact latest PR render in the same 432×768 shots; verify that the desk remains behind Dario's shoes and outside the illustrated-identity label, and that the facets don't distract from net/operating-loss figures. No new forced simulated events or multiple-location requirement.
