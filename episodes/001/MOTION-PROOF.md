# Ownership motion proof

Implemented in `src/OwnershipProof.tsx`, registered as `OwnershipProof`. Modular SVG host has neutral, pointing and skeptical poses. Twenty tokens represent 100 shares; five more represent 25 newly issued shares. Two teal tokens remain the viewer's 10 shares throughout. The displayed ownership switches from 10% to 8% after issuance.

This standalone illustrative clip contains no current-news assertions. It is approximately 16 seconds, retimed to actual local Windows speech output rather than forced into the initial 12-second estimate. Narration is a placeholder, not the final Ourbites voice. Captions are phrase-level and timed from individual WAV durations; they are not word-level forced alignment. No music or external assets are used.

Regenerate audio on Windows with `powershell -File scripts/generate-proof-voice.ps1`. The default installed Windows voice may differ across machines. Then run `npm run typecheck` and `npx remotion render src/index.tsx OwnershipProof out/ourbites-ownership-proof.mp4 --concurrency=2`.

Code controls SVG body parts, gestures, token entry, numerical labels, caption timing, audio placement and export. The original generic BusinessShort composition remains available. This is an isolated production proof, not an approved full episode.
