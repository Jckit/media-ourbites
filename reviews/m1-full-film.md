# M1 full-film working cut · November 27, 2026

Alex · `codex/m1-full-short` · starts at `a85cc21` · draft PR #25.

The November 26 visual feedback and November 27 #9/#23 handoff authorize expanding the accepted press scene into the complete film. This delivers all six shots in one continuous 33.7-second composition. It is a working cut, awaiting final narration performance, measured word captions and Justin's whole-film decision.

## Review media

- [Complete silent visual cut](media/m1-full-film-silent.mp4), H.264, 432×768, 30fps, 1,011 frames. This portable repository asset contains no cloned-voice audio.
- [Prior 10-second scene](media/m1-press-ledger.mp4) remains the matching press baseline. The isolated review composition and its motion geometry are preserved. The full film maps that scene's ten local seconds into a provisional 5.4-second accounting beat.
- A private narrated MP4 combines the existing November 26 short-section take with this complete visual cut. It stays in ignored local outputs and is presented in Alex's chat. No fresh synthesis or new voice approval is implied. Private input/output hashes remain in the ignored local receipt.

There is no same-copy six-shot full-film baseline in this branch. The before/after comparison is therefore an isolated accepted scene versus its full narrative context, not a claimed like-for-like retention improvement. Older films use different scripts/figures and are not relabeled as matching baselines.

## Sequence and reading purpose

| Review time | Shot | What changes |
| --- | --- | --- |
| 0–4.9s | Close loss statement | The binder establishes $104.04B reported net loss, its nine-month period and the cash question. A financing tab motivates the cut. |
| 4.9–8.9s | Funding slip | The binder moves behind the financing slip. The slip lifts into focus independently of the observer host. |
| 8.9–14.9s | Valuation insert | Unscaled direction markers show company value rising before note fair value. The same slip reveals the $94.32B charge and moves toward the press. No invented starting valuation is plotted. |
| 14.9–20.3s | Press → ledger | Existing press and sheet paths post the charge into reported net loss. Other entries and the absence of an equivalent cash payment remain explicit. |
| 20.3–26.6s | Compute counterpoint | An original server rack introduces $18.81B compute/infrastructure expense for the same period. Restrained heat is an illustration. |
| 26.6–33.7s | Binder callback | The report returns, then reveals the lasting-profit question and a settled final hold. |

The host keeps its established lower-right anchor and standard geometry. It observes and reacts; no physical graphic coupling or Concept C integration is introduced. Framing, independent prop timing, depth, cuts and the binder callback supply variety. All factual amounts are static values, not counters passing through unsupported intermediate amounts.

## Checks and actual coverage

- `npm run typecheck` passes.
- `node tests/test_m1_motion.cjs` passes host parity, all 300 original press-motion frames, sheet release/landing checks, all 1,011 full-film frame assignments and exact cue-boundary transitions.
- `python scripts/validate_animation_tickets.py episodes/002/m1-animation-tickets.json` validates six scene tickets against the existing M1 claims and protected reading regions.
- Actual encoded frames were inspected across every shot. Adjacent encoded frames were inspected on both sides of all five cuts. This exposed an opening-number overflow, heat crossing the period label, and a funding-slip approach too close to the host; these were corrected in the delivered export.
- FFmpeg decodes the private narrated MP4 without errors. Source geometry, caption/source bounds and frame coverage checks support technical correctness; they do not establish voice quality or editorial acceptance.
- Continuous 1× playback and listening remain **unverified**. No browser surface was available; the native-player continuation expired. The audio is a preserved audition, scene boundaries are explicitly provisional, and the lower text is explanatory review copy rather than measured word captions. No word timings were fabricated.

This pass changes the film assembly, not the historical source verification dates or approval state. Existing nine-month claims, cash caveats and original-asset fallbacks remain. Final fact/rights checks, final voice choice, measured captions, whole-film acceptance and publication remain separate gates.

## Reproduce

```powershell
npm run typecheck
node tests/test_m1_motion.cjs
python scripts/validate_animation_tickets.py episodes/002/m1-animation-tickets.json
# Use a workspace temp directory if the Windows sandbox temp path contains '!'.
New-Item -ItemType Directory -Force out/render-temp | Out-Null
$env:TEMP = (Resolve-Path out/render-temp).Path
$env:TMP = $env:TEMP
npx remotion render src/m1-film.tsx M1FullFilmReview out/m1-full-film/new-visual-cut.mp4 --scale=0.4 --concurrency=2
```

The composition defaults to silent. Optional `audioSrc` refers only to an explicitly supplied local public-directory asset; no private reference paths or voice bytes are tracked. The `cues` prop owns seven configurable scene boundaries. Align against the accepted final processed WAV before replacing provisional scene/caption timing.

## Public render inputs

- `src/M1AnthropicFilm.tsx`: SHA-256 `459c6bf9a19da6196ee6c1fd17a8d26813048943e30a7da2fb5758dbcc75c75e`.
- `src/m1-film.tsx`: SHA-256 `28eb7c7645661b5fbb1eecccdcedf0773f6f1b83093ac16c00fae4db3a244cf5`.
- `episodes/002/m1-animation-tickets.json`: SHA-256 `e57969b58e967c632e0e0fcb95e0972d76dd33fd08ca65c6f67ac7fefcb27206`.
- `reviews/media/m1-full-film-silent.mp4`: SHA-256 `1fcb5b7115d18b0dff75881f6b0df54f5e6f4a775e675e382065bc99b85af144`.
