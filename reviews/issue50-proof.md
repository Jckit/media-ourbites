# Issue 50 — accounting press calibration

Status: owned by Codex, 2026-11-05; base 7dc9bcb. Candidate only; no accepted recipe.

## Frozen direction (before implementation)
Preserve: Voice A, 1.1x, fixed hybrid host, silent Dario, cash distinction and existing fire compositions. Improve: PR41 e64f5c0's ~11.6–15.8s floating note/stamp and static final arrangement, observed in actual adjacent phone frames. Replace only this isolated proof's staging. Select clip3, source 11.3686667–17.5986667s (5.664s at 1.1x), input hashes alongside evidence. Concept A: stamp and ledger close-up; economical but retains the rejected stationery hold. Concept B: Dario turns a small accounting press; a financing slip feeds between rollers and a reported-loss record advances, while separate cash remains unchanged. Choose B for visible contact, mechanical causality and independently moving objects. This is an explanatory metaphor, not historical footage or a real accounting machine.

## Acceptance criteria
- 170 frames, 432x768, 30fps, complete original clip3 narration at 1.1x.
- Hand and crank share one projected anchor; rollers advance with feed; paper occludes behind the roller, and the result emerges continuously.
- Show a financing fair-value accounting component entering the reported-loss record, not cash spending, an invented starting value, or a full reconciliation.
- Cash stays unchanged; host anchor and captions stay in screen space; readable component/cash caveats.
- Matched PR41 source interval plus adjacent render frames inspected. Human natural-speed playback/art acceptance remains open.
- Plain-text company identification only: official logo permission/asset unavailable. No fabricated mark.

## Coverage before change
Actual out/issue44/contact-final.png inspected (352–388 frame samples). Submitted review 5764136441 supplies broader findings and is attributed, not claimed as my playback. In-app Studio access timed out at localhost:3000; no uninterrupted playback/audio review. Existing input hashes frozen in out/issue50/input-hashes.json.

## Implemented result and review coverage

[New narrated proof](media/issue50-proof.mp4) · [matched PR41 excerpt](media/issue50-before-pr41.mp4) · [A/B frames](media/issue50-ab.png) · [adjacent frames](media/issue50-adjacent.png) · [hashes/checks](issue50-hashes.json).

PR41 input bytes match its tracked issue44 media blob (`102943c3e064294307ba94dfe41e7104292db9eb`). Comparison starts at playback10.33515s / source11.36867s. PR41 ends roughly0.15s before the full original clip3 tail; comparison is limited to the shared interval, not padded or claimed duration-identical. New candidate includes the full original WAV clip at1.1x (170frames,5.667s video; AAC container5.68s).

Observed actual output: 0–1.17s financing slip above roller, crank winds back and drives forward; 1.23–1.53s adjacent frames37–39/44–46 show slip feeding behind the housing without a pop; 1.67–3.33s record emerges carrying the selected financing charge; 3.25–4.55s camera widens; final cash remains unchanged and host changes from reaction to explanation. One repair corrected clipped arm geometry and brought the crank within reach; adjacent frames67–69 retain contact. Header distinguishes Anthropic in ordinary text, not an official mark. Claimed gain: more explicit object action/contact than the prior note/stamp, not proven retention or reference-quality acceptance.

The actual train/ticket contact sheet was inspected this run: train traverses/exits/returns and ticket reframes, with compact recognisable object silhouettes. This candidate borrows distinct object motion and independent framing, not source artwork. The25s original editorial reel was not independently available/replayed; its observations remain attributed to review5764136441. No continuous1x playback/listening was completed: local Studio started, in-app localhost navigation timed out, and native inventory contained no player window. Frames do not certify natural-speed motion or audio sync.

## Validation and practical limits

TypeScript, new deterministic movement/contact/ordering checks, inherited depth/caption checks and ticket validation passed. Python:82 tests,81 passed, one existing Windows symlink-privilege skip. Local ffmpeg decoded170frames and identified H.264432x76830fps plus AAC48k stereo. Local ffprobe is unavailable; CI explicitly checks frame count, fps, duration and AAC with ffprobe. No financial/audio/base-animation files changed; frozen input hashes matched after inspection.

Reused: depthPath/projectDepth, EditorialGrid, StageActor/DarioIllustration, phrase-derived word captions and original narration. Configured: amber grid, clip3 clock, actor anchors, independent spatial/time curves. Bespoke/provisional: isolated press drawing and choreography. No duplicate full episode, new runtime dependency, accepted recipe or second-topic reuse claim. No change to canonical viewer-loop target or PR41. This proof is intentionally prior to reusable recipe extraction under issue50.

Still unresolved: the press is schematic and retains large upper negative space after feeding; it shows the accounting component being posted, not the mathematics of its revaluation. Lettering/caveats need human phone playback review; small source/footer copy remains supporting text. Original logo permission/asset unavailable; no mark fabricated. Word timings remain provisional. The paper mechanism may still feel too diagrammatic versus the train reference. Human decides whether to accept, revise or reject before any expansion/extraction. Issues45/44 and PR41 remain unapproved/open.

Owner released after verification. Draft only; no merge/publication/art approval.
