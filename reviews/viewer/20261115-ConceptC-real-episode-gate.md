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
