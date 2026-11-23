# M1 representative press/ledger scene

Alex · November 23, 2026 · base 8bcbebe · candidate awaiting Justin's visual review.

Justin approved the six-shot script and visual direction in this chat. The [issue decision record](https://github.com/Jckit/media-ourbites/issues/8#issuecomment-7095857443) links that decision to the nine-month packet.

## Review artifact

[Silent 10-second MP4](media/m1-press-ledger.mp4), H.264, 432×768, 30fps, 300 frames.

SHA-256 DB7278F893D78FBAD9F5E7BC41078792EDE5F6B326F37D031F0822DB8360DD66.

One financing slip feeds into the press. A single output sheet carries the $94.32B fair-value charge into the $104.04B net-loss statement. The host's right hand shares the crank anchor during operation, releases before the press leaves, then points toward the cash caveat. The receiving ledger acknowledges other entries. All numbers refer to the nine months ended September 30, 2026.

The new entry point keeps the review scene independent of the historical H1 narration and data. The host gains an optional right-hand prop target. Existing default poses produce identical SVG markup in the regression check.

## Reproduce and checks

Run from the repository root.

```powershell
npm ci --ignore-scripts
npm run typecheck
node tests/test_m1_motion.cjs
npx remotion render src/m1-film.tsx M1PressLedgerReview out/m1-press-ledger.mp4 --scale=0.4 --concurrency=2
npx remotion still src/m1-film.tsx M1PressLedgerReview out/m1-frame120.png --frame=120 --scale=0.4
```

Typecheck and default-host parity, crank contact, release continuity, adjacent-frame speed/direction and settled-landing checks pass. The first adjacent-frame inspection exposed an incorrect cubic coefficient, which was corrected before this export.

Actual encoded opening, frames around release 101–103 and landing 173–175 were inspected at 432×768. The early receipt reveal and right-edge title crowding were corrected. A fresh Remotion still at frame 120 / 4.0s matches the encoded shot and layout. Mean RGB channel differences against its H.264-decoded counterpart were 2.695, 2.037 and 3.586 on the 0–255 scale. This is a compressed-image comparison.

## Remaining review

The live Studio URL timed out in the in-app browser. Native-player launch then failed with an expired computer-use continuation. Continuous 1× playback is unverified. This scene is silent, and the bottom lines are explanatory review text. Voice audition and measured word captions follow separately.

The press is schematic and the final ledger has a deliberate reading hold. Justin should judge whether the object transfer and staged focus establish the desired visual direction before full-film expansion. This scene uses original graphics and plain company identification.
