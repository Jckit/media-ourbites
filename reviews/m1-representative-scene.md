# M1 representative press/ledger scene

Alex · November 23, 2026 · base 8bcbebe · candidate awaiting Justin's visual review.

Justin approved the six-shot script and visual direction in this chat. The [issue decision record](https://github.com/Jckit/media-ourbites/issues/8#issuecomment-7095857443) links that decision to the nine-month packet.

## Review artifact

[Silent 10-second MP4](media/m1-press-ledger.mp4), H.264, 432×768, 30fps, 300 frames.

SHA-256 18ACC8F746F86D334272DC0C266C2EED134C97F80429EB871329260793B989A5.

One financing slip feeds into the press. A single output sheet carries the $94.32B fair-value charge into the $104.04B net-loss statement. Justin accepted the ledger and requested removal of the protagonist's graphic interactions. The revised host observes the mechanism and transitions from thinking to explaining. The receiving ledger acknowledges other entries. All numbers refer to the nine months ended September 30, 2026.

The scene uses the standard host pose API. The optional right-hand prop target has been removed. The ledger, press and sheet retain identical motion values at every frame compared with the prior candidate.

## Reproduce and checks

Run from the repository root.

```powershell
npm ci --ignore-scripts
npm run typecheck
node tests/test_m1_motion.cjs
npx remotion render src/m1-film.tsx M1PressLedgerReview out/m1-press-ledger.mp4 --scale=0.4 --concurrency=2
npx remotion still src/m1-film.tsx M1PressLedgerReview out/m1-frame120.png --frame=120 --scale=0.4
```

Typecheck, default-host parity, all-frame graphic-motion parity, release continuity, adjacent-frame speed/direction and settled-landing checks pass. The first candidate's cubic coefficient correction is retained.

The revised encoded opening at 1s, transfer at 4s and ending at 8s were inspected at 432×768. The host's hands stay near its own body, with a curious reaction followed by a small explanatory gesture. The prior candidate's release/landing frame inspection and frame-120 reproducibility comparison remain historical evidence. Graphics motion parity is checked across all 300 revised frames.

## Remaining review

The live Studio URL timed out in the in-app browser. Native-player launch then failed with an expired computer-use continuation. Continuous 1× playback is unverified. This scene is silent, and the bottom lines are explanatory review text. Voice audition and measured word captions follow separately.

The press is schematic and the final ledger has a deliberate reading hold. Justin should judge whether the object transfer and staged focus establish the desired visual direction before full-film expansion. This scene uses original graphics and plain company identification.
