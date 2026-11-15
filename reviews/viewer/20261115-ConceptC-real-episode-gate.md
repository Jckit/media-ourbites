# Concept C editorial gate — real Anthropic episode excerpt (2026-11-15)

**Pre-implementation source:** temporary `Jckit/media-ourbites` PR #1 head `ca45df4cb994b8346cd1d56cb78c3283149c7ef9`. User asked for a critical "as me" review and implementation.

## Actual pre-change evidence and scores (0–4, subjective)

Inspected the exact prior 432×768 Concept C workwear pose sheet, its original scene-scale `HostConceptCCameo`, acted fictional price/receipt stills, and the real project sources `src/framework/AnthropicEditorialDepth.tsx`, `src/AnthropicCharacter.tsx`, plus the viewer skill and contract. **Not full original playback.**

| Dimension | Score | Evidence |
|---|---|---|
| Brand/costume identification | 3 | Teal + cream recognizably consistent in full pose sheet |
| Character personality at episode size | 1 | 278-wide presenter becomes tiny beside large editorial hero graphics; not yet seen with a real episode |
| Mechanical acting (fixture only) | 2 | Continuous reach and paper hinge are present, but actions only demonstrated with synthetic price props |
| Actual episode integration | 0 | No before/after in an actual Anthropic scene; existing cameo is a fictional `€20→€40` title card |
| Full-story retention/audio signoff | N/A | No audience data or attentive human audio playback |

## Findings (priority ranked)

**P1 — Missing actual episode proof (confirmed):** sample is a stand-alone graphic, not the project's multi-layer Anthropic scene. Result: impossible to evaluate the real-scale host or outfit against graphics and captions. **Change:** matched 213-frame excerpt of the *existing* Anthropic editorial-depth episode with only host switched; keep canonical original and compare time-matched renders.

**P2 — Mechanical risk at pose boundaries (risk, not yet verified in scene):** Concept C has authored static poses rather than the canonical host's interpolated `poseFrom/poseBlend`. Popping between poses can look like PowerPoint editing. **Mitigation within this test:** single continuous point-rig actor with eyes leading the reach and hand releasing; no crossfade between unrelated full-body drawings.

**P3 — Motion-style floor (hypothesis):** clothing detail remains relatively flat. Do **not** respond with more seams/3D shading before assessing at 432px with existing depth, props and source lower-third.

## Single implementation and acceptance

- **Preserve:** financial data, factual caveats, Voice A WAVs/1.1× playback, interim word cues, Dario, original visual layers, source attribution and canonical host selection.
- **Edit:** isolated `AnthropicEditorialDepth` host-variant hook; source-timed proof compositions; temporary-repo CI rendered A/B comparison.
- **Review:** same 213 relative source frames, exact scene anchor and figures, expected audio streams and no new protected-zone overlap.
- **Hold:** no merge or production replacement, no invented retention results or "watched" claim from stills alone.

## Post-change verification — exact source head `cacb02c365b558c4d0c0da33b23484e8074693b2`

**Executed:** [temporary repo render run 43729511879](https://github.com/Jckit/media-ourbites/actions/runs/43729511879) **passed**. [Exact render artifact 14167657938](https://github.com/Jckit/media-ourbites/actions/runs/43729511879/artifacts/14167657938), `anthropic-current.mp4` SHA-256 `6fb3ae934a0d45b2c9e23ea0e5704735695771a43b4934f6246858f82e45178e`, `anthropic-concept-c.mp4` SHA-256 `c6218ffb8c620481e5a04570fe997c594f2972d963037914a5eb92b39ba67f0b`. Both 213 frames, 30fps, 432×768, 7.104s, H.264 video and AAC audio. Decoding both audio streams to mono 22.05-kHz PCM produced the **identical** SHA-256 `6ffb0d7981198d0a6f2c3cfc74af4ecbc8d0d84e039ff9be84ea2cbddfcc5487`. This verifies signal identity, **not attentive listening**.

**Visual inspection:** matched f0/29/60/90/120/164/208 for baseline and Concept C, plus actual consecutive Concept C f121/127/134/142/150/158/166/178/192/202/210, in a real Anthropic financial explanation (not the previous illustrative `€20→€40` screenshot). The host remains at the existing lower-left anchor, with the business comparison, word captions, data labels and source visible. He begins with an appropriately skeptical expression, looks toward the operating-loss comparison, reaches up-right during the actual balance explanation and releases before the scene transition. The drawing does not visibly pop in inspected contiguous-frame samples; the forearm/body remains simplified 2D. No sampled-frame face/source/caption collision found. The finger touches close to a small red explanatory annotation at f164; screen-space micro-legibility and continuous natural hand motion require attentive 1× playback by a human.

**Post-change rubric (0–4 subjective, from sampled frames):** comprehension 3; brand/color identity 3; protagonist recognizable at phone size 2; meaningful acting 2; motion hierarchy 2; protected text/figure readability 3; attentive voice assessment N/A; retention N/A. The original round-head host has a stronger simple silhouette at this size; Concept C has richer adult proportions but some costume details disappear. The desired professional editing grammar is not yet proven by a single gesture. **This is a modest integration improvement, not a 10/10 design or final acceptance.**

**Review decision:** retain Concept C as the selected *candidate* outfit and preserve this episode-scale regression fixture; do not merge PR #1, replace the canonical host or claim a retention uplift. Next bounded step (requires human assessment): give the actor meaningful ownership of a part of the explanatory business mechanism, without adding decorative texture or conflicting with financial text. Do not polish outfit seams further without a new observed issue. Confirm actual 1× playback and audio review before style signoff.

## New user-requested iteration — 2026-11-15, physical balance contact

**Frozen finding:** in previous exact-head `cacb02c3` encoded Concept C Anthropic `f120/f164/f208`, the fingertip hovers below the black fulcrum-base bar and near the red `reported net ≠ operating` annotation, without physically causing the comparison. That is the remaining PowerPoint-like gesture. Face/collar are already clearer at phone size. The change must be one *physical* interaction, not more text, clothing or unrelated motion.

**Hypothesis:** the host presses a small, original teal control mechanically connected to the existing balance base at precisely the same world/actor coordinate as the rig's moving fingertip; the beam responds **after** the contact to reveal the contrast already stated in narration. Keep balance geometry, numeric labels, original word timing, Dario, original scene anchor and Voice A identical; the control is an illustrative interaction, not a claim about finance. Original canonical version remains unchanged.

**Implementation:** `balance-contact.ts` owns contact, press, beam response and release in source-audio seconds. The actor's target and the control are both derived from the same coordinate space. At t7.45–8.02 reach, t8.05–8.32 small input travel, t8.10–8.59 beam changes, t9.18–10.05 settle, t10.2–10.8 release; the original case retains its previous independently animated angle. A short socket line tethers the control to the *existing base* rather than creating a new standalone information panel.

**Acceptance:** exact-head narrated 213f A/B 432×768 clips, matched f120/124/131/139/146/156/164/172/188/206/208 visual checks, no new overlap with source/amounts/captions, hand/contact alignment and release, same PCM audio, and pure geometry regression tests. Still only a candidate until human 1× acting review. No editing of source claims or production composition.

### Post-render outcome — physical balance press

**Code/render head:** `c5b34be8ba705bbb875502fee55fea6c8db4481d`. [GitHub Actions run 43734563232](https://github.com/Jckit/media-ourbites/actions/runs/43734563232) **passed**, artifact [14170395824](https://github.com/Jckit/media-ourbites/actions/runs/43734563232/artifacts/14170395824).

**Media:** final narrated Concept C export `anthropic-concept-c.mp4` 432×768/30fps/213f, SHA256 `240eaca30abcd20914a7f4db8f159d72911239574cb20a5a62859faa4814b2eb`. Matched canonical `anthropic-current.mp4` SHA256 `b2875e0d97a58fb1398cfacb79ac614032018139c440a3d515ef845107a44acd`; note re-encoding across CI runs can alter H264 bytes even when canonical source does not change. Decoded Concept C old/new mono 22.05kHz PCM both SHA256 `6ffb0d7981198d0a6f2c3cfc74af4ecbc8d0d84e039ff9be84ea2cbddfcc5487`: verified same narration track but not attentive listening. `AnthropicEditorialDepth` still defaults to canonical and the only new overlay/beam response is conditional on `hostVariant==='concept-c'`.

**What was directly inspected:** decoded frame sequence f124/131/139/146/156/172/188/206 of the latest 213-frame real-excerpt render and old Concept C f120/f164/f208, at the same 432×768 source resolution, plus actual actor-and-prop crops. In the new frame range: (1) f124 fingertip anticipates the attached scale control below the black base while the beam stays level; (2) by f131–139 finger reaches the teal cap, cap compresses and the beam begins a visible tilt; (3) f146–172 the beam settles while the green operating figure and existing red distinction remain legible; (4) f188–206 hand releases back to neutral and the face registers understanding. No text/safe-area collision detected in those samples, no sampled-frame elbow snap. A small dark rail visibly ties the switch to the existing balance base; not a floating card.

**Creative verdict:** modest improvement over pointing-only because the host now visibly changes the original scale's behavior. The control is small at phone resolution and the hand still has a stylized pointing silhouette; a fully natural, reference-level physical interaction is **not** demonstrated. Viewer rubric (subjective, 0–4): purposeful action 2→3, protagonist legibility 2, motion hierarchy 2→3, trust 3, comprehension 3, audio listening N/A, retention N/A. A test pass is not human approval.

**Unresolved:** one full attentive 1× audio/motion review, ideally on the user's device, and a stronger actor-owned physical mechanism in a production-like multi-shot context if still judged too flat. Preserve original channel host, A/B fixture, financial claim ledger and narration. Keep PR #1 **draft**. No edits/Actions in original repo.
