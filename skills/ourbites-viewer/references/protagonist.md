# Recurring protagonist: readable, purposeful, emotionally legible

Updated 2026-10-28. Research-to-design heuristics for the **Ourbites fictional hybrid guide**. This is an operational rubric, **not** an empirically proven formula for improved retention.

## First distinguish evidence levels

- **Observed:** frame-accurate / heard in a current draft, with precise timestamp and render hash. Evidence for overlapping expressions, an invisible handoff, text too small, unnatural motion, delayed context.
- **Research-supported general guidance:** YouTube's own retention report explains patterns (intro expectations, top moments, dips, spikes), but doesn't claim a given facial feature improves retention.
- **Hypothesis only:** making an eyebrow/gesture more expressive might improve instant comprehension or recognition; validate with phone-scale renders and ultimately YouTube Studio, not a made-up retention estimate.

Primary platform references:
- [YouTube: Key moments for audience retention](https://support.google.com/youtube/answer/9314415). Spikes may signal engagement **or confusion**, dips may signal skip/abandon. Strong later moments may be moved earlier. Do not map its **30-second intro** metric onto a 16-second draft.
- [YouTube: Shorts feed analytics](https://support.google.com/youtube/answer/12942217?co=YOUTUBE._YTVideoType%3Dshorts&hl=en). *How many chose to view* compares viewed versus swiped-away opportunities.
- [YouTube: Shorts view counting](https://support.google.com/youtube/answer/10059070). Views count starts/replays since 2025-03-31; engaged views are separately available. Neither public views nor static art proves retention.

## Locked identity — improve, don't replace

Based on `styles/CHARACTER-PROMPTS.md#hybrid`, `characters/protagonist/profile.json` and `src/OurbitesHost.tsx`:
- Cream circular head with **one angular navy tuft** (recognizable even in silhouette).
- Dot eyes + distinct eyebrows, compact teal torso, thin ink arms and legs, simplified mitt hands.
- Adult, intelligent, curious, lightly skeptical; humorous reaction is an **interpretation**, not evidence of an event.
- Keep palette, approximate head/body proportions and consistent face geometry across poses. Avoid drift into childish chibi, photorealistic, 3D or a different mascot without user approval.
- Treat this as a **provisional canonical prototype** pending human design approval; a render success is not design approval.

## What a stronger host actually does

1. **Triggers a question:** the face/hand looks toward the *same thing the viewer needs to notice*. A reaction without an identifiable object/prop is decoration.
2. **Makes a mistake the viewer may make:** e.g., sees `$80.75B NET LOSS` and reaches for a wallet. A second character/financial visual corrects the *interpretation*, never a fake quote or a false claim that GAAP operating loss is cash burn.
3. **Participates in explanation:** holds, points, sorts or moves a card so the visual relationship changes as facts are spoken. The prop is anchored to hand-world coordinates across the entire animation, not teleported between poses.
4. **Registers the payoff:** attention changes from headline amount to the distinction `reported net loss ≠ cash operating spending`. Recognizable skeptical-to-understanding facial transition rather than adding more on-screen words.
5. **Leaves room for reading:** protect faces, filing numbers, caveat text, source and captions. Test at a realistic **432×768 or smaller** review render, including adjacent frames on both sides of handoffs and the final few frames.

## Candidate improvement priorities (not a design approval)

- **P1: protagonist expressivity / attention direction.** The existing silhouette is recognizable but the face is nearly identical between `neutral`, `explain`, `think`, and `point`. If actual current renders confirm that a change would clarify the story, improve **one** expression or gaze/eyebrow micro-gesture tied to a meaningful object. Keep the tuft, proportions, palette, voice, and Dario's own established role. Show **before and after** at matching frames in at least opening, explanatory beat and payoff. Use 0–4 rubric scores as editorial assessment only. New human direction on 2026-10-28 explicitly supports refining this provisional protagonist while retaining the hybrid style; it is **not final art approval**.
- **P2: face–prop continuity.** Follow gaze or pointing finger to the highlighted number; no broken limb geometry at motion boundaries, avoid holding a static point through an unrelated beat. Inspect consecutive frames and actual playback where available.
- **P3: simplify secondary text and strengthen visible takeaway.** Do not remove necessary caveats or imply that the $72.388B fair-value line alone reconciles all of the $80.748B net loss; show relationship with an original sourced diagram.
- **P4: camera and beat handoff.** Prefer an object/gesture motivating a transition over arbitrary velocity, constant bounces or excessive cuts.

**The Codex history already reports the requested Dario role was implemented** in `AnthropicCharacter` and the pointer/grip jump repaired. Inspect **latest repo and review state first**; do not repeat those changes when already present. The newest logged review (2026-10-28 09:42Z) sampled still frames and explicitly left continuous playback/audio review open.

## One-feature acceptance template

Before editing freeze:
- Exact composition, source hash, affected seconds/frames, source of criticism, 0–4 rating if observed.
- Proposed **single behavior change** in one or a very small number of related files.
- Keep unchanged: figure meaning, voice A `am_puck` original pitch, 1.1x playback, narration timing, Dario silent, human art/media/publication approvals.
- Same frames **before / after** at phone resolution; adjacent frames for any moving hands/props; corresponding audio/motion inspection or clearly state unsupported coverage.
- Typecheck, relevant numerical checks, error handling; successful local draft; output hash and no critical overlap in hook, middle and payoff.
- Accept only when the intended behavior is actually visible. Otherwise repair once, or restore **only the cycle's patch** and record why it failed.
- A change in character code must not silently declare the protagonist's design `approved` or infer actual retention improvement.

Use this as a *testable* hypothesis bank, not a monthly list of recommendations. Once an item has been validated, select the next unresolved actionable finding from `reviews/viewer-loop.json`, not the same suggestion again.
