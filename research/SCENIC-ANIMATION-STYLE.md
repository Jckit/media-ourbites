# Scenario-led animated scenes: from moving infographics to a living story world

Research and implementation brief — **2026-10-28**. User direction: use more **illustrated action, environmental animation and physical cause/effect** in the spirit of science "what if" videos ("what happens if oxygen disappears for a minute"), while retaining a **simpler 2D Ourbites hybrid** rather than hiring a 3D animation studio. This is fresh *animation-language feedback*, distinct from the previously consumed protagonist-gaze revision; it does not authorize changing financial facts, Voice A, third-party clip licensing or publication approvals.

## Best-matching public references / limitations

- [The Infographics Show: *What If the World Lost Oxygen for 60 Seconds* (YouTube, 2022)](https://www.youtube.com/watch?v=QlMRwhPiwyw) is a close title/topic match. This source verifies the topic and premise; the full source video was **not** watched frame-by-frame in this research. Its publicly available channel imagery and independent descriptions support studying flat 2D recurring characters and scenes, not copying a specific shot or claiming measured viewer retention.
- [The Infographics Show: animation series listing](https://tv.apple.com/us/episode/what-if-the-world-lost-oxygen-for-60-seconds/umc.cmc.6hva84m30m0ea3cga6tjbb8s5) lists an animation/documentary episode and supports this as a real animated science-explainer reference. The storefront listing is not a production breakdown.
- [What If Show: *What If the World Lost Oxygen for Five Seconds?*](https://whatifshow.com/what-if-the-world-lost-oxygen-for-five-seconds/) demonstrates an *event → consequence → next consequence* thought-experiment story structure. Scientific claims in this article have not been independently audited; we use **narrative technique only**.
- [The Infographics Show channel format analysis](https://www.reelpantry.com/teardown/theinfographicsshow) is a **small, third-party eight-video TikTok sample** (different catalog from the cited YouTube oxygen episode). Its reported editing speed/cut rate is neither the YouTube video's verified pace nor an optimal formula. It may motivate comparing story beats; do **not** impose every-three-second cuts or faster narration.
- [YouTube retention reports](https://support.google.com/youtube/answer/9314415) distinguish top moments, dips and spikes; spikes may indicate **confusion**, and private audience behavior is unavailable for competitor channels. No specific "scenic animation" uplift is proven.
- [Remotion interpolation](https://www.remotion.dev/docs/interpolate), [spring](https://www.remotion.dev/docs/spring) and [compositions](https://www.remotion.dev/docs/composition) allow deterministic 2D layered actions without new heavyweight 3D or external art software.

**Style inference, not verified timing analysis of the exact video:** 2D scenarios explain by staging people, buildings and consequences in connected spaces. A small narrative state change (object hits table, character reaches, machine responds) can communicate more than a row of animated text boxes. Ourbites can adopt *that grammar* without reproducing the competitor's drawings, palette, characters, timing or soundtrack.

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

**Diagnosis:** the problem is primarily **staging and world reaction**, not a lack of physics simulation or the number of animated elements.

## Proposed Ourbites animation grammar

| Production layer | Existing tendency | New default where narratively justified |
| --- | --- | --- |
| Story space | Clean background and chart/title panels | A simple reusable place (office, trading desk, factory, product interface, storefront), with floor, foreground, background and depth |
| Action | Numbers reveal; character occasionally points | Actor wants something → interacts with a prop → prop changes state → other actor responds |
| Camera | Mostly static, one mild zoom | Motivate slow push/tracking by the character's discovery or a moving object; keep mobile-safe reading zones |
| Environments | Nearly blank, generic | 2–4 original SVG environment modules with subtle depth and grounded objects; no expensive 3D requirement |
| Physicality | Filing floats, shapes appear | Attach objects to surfaces, indicate contact/impact, grounded shadows, subtle reaction and settling; **no gratuitous perpetual bouncing** |
| Data | Large cards with captions | Use original, precise charts only at the moment an equation must be clear, then return to visible character consequences |
| Transitions | Cut/title fade | Prop handoff, object match cut, camera follows a consequential object or character look |
| Real media | Candidate external footage | Actual historic moments if verified/cleared; avoid using generated reenactments as fake actual footage |

**Practical 2D/2.5D recipe:** flat vectors + layered perspective/parallax + frames that establish place + one contact/reaction + tight close-up for the relevant fact. This is *limited animation* with purposeful action, not elaborate rotoscoping, 3D simulation or imported footage.

## Pilot: office world reacts to the S-1

**One bounded implementation**, no audio or financial changes: add original reusable `src/BusinessWorld.tsx` and use its `OfficeWorld` in the existing `AnthropicCharacter` stage. Establish an office environment, illustrated window/city, a desk/plant/background depth, and a small sheet/desktop reaction exactly when the filing drops. The filing and existing voices/characters/props remain the narrative focus. Preserve mobile readability and source labels. This scene should feel like an *event taking place somewhere*, not a decorative office still.

**Not in this initial iteration:** extra 3D assets, new camera math, replacing the Dario likeness, rewriting the script, remaking all 82-second scenes, making bogus financial cash effects, creating unlicensed AI video, or resetting completed Codex reviews. Those require separate evidence/approval.

## Acceptance criteria before declaring the new layer successful

1. Compare exactly the approved baseline frames at **0.6, 1.8, 3.2, 4.8, 6.6, 8.4, 10.2, 12.6 and 15.6 seconds** to the new full-rendered `AnthropicCharacter` at 432×768, and inspect video around the actual paper impact.
2. Scene has unmistakable place/depth and a **causal** reaction to the filing entering; no text/face/caption overlap, no claim implied by added decoration.
3. New backdrop is drawn with local original vectors and does not compete visually with the numbers, silhouette or captions.
4. Original finance dataset, Voice A audio/1.1x playback, full 500 frames, animation timings, Dario's silent role, and human source/likeness/rights/publication gates stay unchanged.
5. Run npm typecheck and Python tests; compare actual render frames and ideally the full MP4 (do not claim an actual retention uplift or human approval).
6. Any automated style test is a design hypothesis; measure viewer impact only with a comparable published YouTube Studio test after human approval.

## Future development priorities, not automatically approved

1. **Scene templates**: 2D office, storefront, server center, factory, boardroom; each needs actor/prop/environment/effect anchors and safe-area checks.
2. **Actor rigs**: reusable look-at, reach, grip, walk, seated and react actions as *stable state machines*; avoid changing faces between render frames.
3. **Motivated multi-shot staging**: wide establish → medium action → close mechanism → medium consequence; never random cutting quota.
4. **Better sonic storytelling**: licensed prop impacts and room tone, optional; keep original voice and audio approvals intact.
5. **Storyboards must specify**: who does what to which object, how the world changes, why the change teaches the viewer, then whether a chart is actually necessary.

No imitation of copyrighted clips or scene assets. Reference URLs are for editorial research, not permission to reuse them.

## First actual preview and one repair finding (frozen 2026-10-28)

Reviewed full actual 432×768 output from [GitHub Actions 40696289269](https://github.com/jcbandc-arch/media-creator-outbites/actions/runs/40696289269), artifact `viewer-protagonist-before-after` (ID 12820225204). Encoded 500 frames, H.264/AAC, 16.683 seconds; MP4 SHA-256 `0b6126877bbb3c630126f415ed5c42719861be58f8e5c2b72e57466f0e9cdd7c`. Python tests, TS checks and four decoded voice-signal checks passed; these don't constitute attentive human voice listening. Sampled actual MP4 at 0.6,1.8,3.2,4.8,6.6,8.4,10.2,12.6,15.6s.

**Confirmed improvement:** characters now occupy a legible office space with window, desk, city depth and associated props while the filing remains the foreground focus. The original S-1 lines and financing card remain legible at sampled phone scale. This is a **simple animated backdrop**, not yet a fully cinematic multi-location story.

**Observed visual defect that requires one repair:** the two new loose sheets remain suspended, unchanged in the space between host and Dario at 3.2s through 15.6s. They also appear during the filing's approach rather than only after the impact. This is accidental **perpetual decorative clutter** and contradicts the causal-animation goal. Fix only this new paper timeline: no pages before contact; brief ballistic arc after filing contact; settle visually toward desk and disappear by ~2s, leaving static table stack. Verify at t=0.6/1.8/3.2/12.6 and transition frames; other cast, props, audio, finance and captions must stay identical. At most one repair on this PR iteration.

**Hold:** no measured improvement to viewer retention, no license/likeness/final-media approval, no guarantee this single room fully meets desired animation language. Future multi-shot character mechanics need separate review.
