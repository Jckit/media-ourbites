# FW-06 human feedback follow-up — subtitle cue drift after shortening

**Frozen 2026-10-29 before edits** to the existing open [PR #21](https://github.com/jcbandc-arch/media-creator-outbites/pull/21), branch `review/fw06-caption-orange-pointer-20261029`, currently based on unchanged main `2c6a8daa84ea4f17ec9474d3a07c9c290dcdd992`. This user review supersedes the earlier *subjective timing estimate* but does **not** approve FW-06 or reopen the 3/3 character-design cap. No changes to the pending separate PR #16.

## Direct new user feedback

> "A little better but the subtitles seem out ofp sync now"

The orange connector and shortened text are improvements worth retaining, but the subtitle **cue boundaries** need a technical timing correction. The user has **not** approved PR #21.

## Reproduced cause, exact audio evidence

The current PR renders four original Kokoro `am_puck` 1.1× WAV clips without transcription-based alignment. Its 12 burned-in phrases switch at **fractions of whole source-clip duration**, e.g. `0.66` and `0.79`. The current caption-presence CI only checks text pixels exist whenever narration audio exists; it **does not** check the words being spoken at each change.

Analyzed the **actual prior PR #21 H.264/AAC review MP4** with FFmpeg: `b0a74e927c1b2fcc200b8359e7e79d36d684a124605e92cb7bd69cb9554dbeab`, 475 frames at 30fps, 432×768, duration 15.851s. Decoded 16-kHz mono PCM to inspect 20ms RMS/voice-activity windows. Strong audible-level gaps in the speech envelope include:

| Clip | Apparent phrase separation in exported **playback seconds** | Existing caption switch | New candidate switch | Difference |
| --- | --- | --- | --- | --- |
| 0, "dollars." → "That..." | silence ~0.92–1.32s | 1.483s | 1.300s | -183ms |
| 1, "wait." → "This..." | short gap ~3.37–3.49s | 3.528s | 3.470s | -58ms |
| 1, "loss," → "not..." | short gap ~4.67–4.79s | 5.016s | 4.779s | -237ms |
| 2, "loss?" → "Six..." | pause ~7.18–7.40s | 7.347s | 7.398s | +51ms |
| 2, "million." → "Still..." | long gap ~8.52–9.02s | 9.281s | 8.979s | -302ms |
| 3, "from" → "accounting" | phrase transition ~11.98–12.10s | 12.091s | 12.099s | +8ms |
| 3, "financing." → "Read..." | long gap ~13.40–13.80s | 14.017s | 13.790s | -227ms |
| 3, "pieces," → "not..." | slight gap ~14.75–14.83s | 14.866s | 14.826s | -40ms |

**Evidence limitation:** this is an *acoustic pause-based* timing correction from actual encoded audio, not an ASR transcript/forced word alignment or human listening confirmation. It provides stronger measured cue boundaries than dividing entire clips proportionally but does **not** prove exact word-onsets, pronunciation or word-level sync. Keep cue timing explicitly marked `audio_pause_measured_review`; request human watch/listen for final approval.

## One scoped revision

- Replace `until` percentages with `startSourceSeconds`: offset relative to the **actual source WAV timeline**, not whole-clip percentages. First caption starts at zero; each following phrase starts near a detected natural pause. On-screen time maps to source time via the unchanged established 1.1× story clock (`t = frame/fps*playbackSpeed`).
- Preserve the complete exact narration wording, the same 12 short phrases, all financial facts, cast, visuals, 475-frame duration, text placement and voice assets. Do not introduce the still-unimplemented paper collage style.
- Strengthen tests: exact text concatenation, monotonic onsets within each manifest clip, each cue on source-timeline frames and end coverage, and **pause-boundary regression**: cue switches should land close to the measured reviewed audio gaps, not arbitrary fractions. Add QA evidence of actual new cue frames and unchanged decoded audio. Do not pass off pixel presence as voice synchronization.

## Acceptance

1. On real new exported 432×768 475-frame MP4, transitions at expected playback frames ~39, 104, 143/144, 222, 269, 363, 414, 445, with no blank cue during a spoken phrase. Compare adjacent frames at these eight points, not just earlier fixed staging frames.
2. Audio PCM must remain byte-equivalent; narration manifest, cast, financials and camera must not change. Caption presence CI still passes. New tests fail if anyone brings back whole-clip percentages.
3. User checks the new video **with sound** for genuinely acceptable timing. No audio listening, word-level forced alignment, release, FW-06 acceptance or FW-07 unblock is inferred from automated media checks.

**Before-change Git blobs:** `src/anthropic-caption-cues.json=f09641c02b298c6b61e69935f5954733b415274b`, `src/AnthropicCharacter.tsx=c1bd8a3e7caf11fc464da2eb1a3c257dc0ff4ba1`, `tests/test_anthropic_caption_cues.py=1e18e82923d4bccbbf8951541be3d8305d46e032`, `src/anthropic-character-audio.json=58465eb9e82f4000e050484c01b486261790eeb4`.

## Result

Pending new code/CI and verified playback samples.


## Further source-WAV check, before runtime edit

Read the **four exact committed 24kHz mono PCM WAVs** through GitHub's base64 source blobs (not re-encoding or resynthesizing), and measured 20ms RMS envelopes around each proposed cut. Source Git blobs: `0.wav=51fd2ced`, `1.wav=064cd6e2`, `2.wav=873cb5fe`, `3.wav=bba669bf`. The originally selected 1.94 source-seconds for clip 3 fell into active speech (-17dBFS), so the more reliable targets below are in the *actual quiet inter-phrase regions* (around -28dBFS or lower). Use these **refined** source-WAV pause boundaries rather than the initial approximate frame candidates above:

| Clip | New phrase start offsets in **source WAV seconds**, relative to clip start | Approx displayed frame at 30fps/1.1× |
| --- | --- | --- |
| 0 | 0, **1.42** | 0, 39 |
| 1 | 0, **0.50**, **1.94** | clip start, ~103, ~142 |
| 2 | 0, **1.10**, **2.90** | clip start, ~220, ~269 |
| 3 | 0, **1.87**, **3.78**, **4.90** | clip start, ~361, ~413, ~444 |

Cue starts align with quiet audio gaps rather than active voiced peaks; the *actual* rendered frame threshold is `ceil((manifestClipStart + cueStartSourceSeconds)*30 / 1.1)` for the first frame at or after source cue time. Tests should check exact numbers from each original WAV, ensure near-silent intervals (20ms RMS <= -24dBFS) and preserve words without altering narration. These are phonetic **pause approximations**, not a transcript-timing model. The source WAV is the stronger evidence than the compressed AAC envelope, hence this refinement *before code edits*.
