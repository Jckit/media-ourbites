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
