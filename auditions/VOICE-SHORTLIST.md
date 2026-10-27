# Ourbites voice audition

## Current casting brief

Justin wants a natural American male voice: friendly, conversational and engaging. Avoid radio-announcer delivery, exaggerated bass, sales-pitch enthusiasm and overly polished cadence. Naturalness matters more than depth. A minus one was a pitch preference, not a final voice selection. British candidates are no longer in contention. H (am_liam) and I (am_eric) are additional unshifted American presets to audition, not endorsed matches until heard.

Checked 27 October 2026. Recommendation: audition local Kokoro first; use a paid hosted comparison if the delivery is not expressive enough. No subscription or paid API call was made. No voice was cloned.

## Listen before reading the identities

Play A.wav through D.wav using the same headphones and volume. Same script, model, speed=1.0 and peak ceiling. These are peak-normalized, not perceptually loudness-matched. Score each 1–5 for clarity (30%), naturalness (30%), restrained playfulness (25%) and listening comfort (15%). Reject candidates that misread numbers, skip words or make the banter sound hostile. Do not infer quality from generation speed.

These files are actual local synthesis, not downloaded vendor demo audio. Automated checks confirm finite non-silent output; listening and transcript accuracy still require review. Keep the existing video voice until a candidate is chosen. Generate the final narration at the intended speed and retime the animation; do not stack an unnecessary 1.1x acceleration on top.

## Shortlist

| Option | Fit and limits | Licensing/cost evidence |
|---|---|---|
| Kokoro 82M + ONNX | Preset voices, CPU execution; four candidates generated locally. Good first test with no per-character fees. Expressiveness must be judged by ear. | Model Apache-2.0, wrapper MIT. https://huggingface.co/hexgrad/Kokoro-82M and https://github.com/thewh1teagle/kokoro-onnx |
| Chatterbox | Expressive delivery and cloning; Turbo/Nano support non-speech tags. Requires another installation and a reference clip for Turbo/Nano. Not benchmarked here. | MIT project; use only authorized reference recordings. https://github.com/resemble-ai/chatterbox |
| Qwen3-TTS 0.6B Base | Alternative for cloning an authorized recording. Heavier setup; GTX1080 performance not established. Base checkpoint is not the voice-design model. | Apache-2.0 model card. https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-Base |
| Cartesia | Hosted comparison candidate; account/API access required. No connected synthesis tool available in this session. | Pro $5/month, 100K credits; commercial license listed under Pro. Free tier does not list it. https://www.cartesia.ai/pricing |
| ElevenLabs | Hosted voice-library comparison candidate; account/API access required. | Starter lists commercial license, 30K credits; page showed $6 regular and $1 introductory first month. Confirm checkout; promotional banners vary. https://elevenlabs.io/pricing |
| F5-TTS standard pretrained models | Exclude from this commercial pipeline unless a separately licensed checkpoint is verified. | Code MIT but standard pretrained weights CC-BY-NC. https://github.com/SWivid/F5-TTS |

Permissive code/model licensing does not clear arbitrary third-party voice recordings or identity rights. Preserve license notices when distributing model/code. Voice-source notes: https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md

## Reproduce

The isolated `.venv-voice` uses the packages in `requirements-lock.txt`. Model assets are in `models/kokoro/`, downloaded from the wrapper's documented model-files-v1.1 release. The manifest records SHA256 checksums and per-file durations. These hashes record the downloaded versions; they are not an independent authenticity audit.

```powershell
cd 'C:\Users\Justin\Documents\ChatGPT\Businesses\business-and-chats'
.venv-voice/Scripts/python scripts/audition-voices.py
```

Windows may require execution outside the process sandbox for the bundled eSpeak library. This script overwrites A.wav–D.wav and the audition manifest; it does not change production audio.

## Identity key

A: am_puck (US male). B: af_heart (US female). C: bm_george (British male). D: bf_emma (British female). Same preset names can sound different with another model version or phonemizer, so keep the saved environment and model manifest.

## Round two
Justin preferred A minus one semitone for pitch but found its delivery insufficiently natural. E (am_onyx) and F (am_michael) use the same script and speed=1.0, without pitch shifting. Their identities are candidates, not a claim of verified perceived depth or quality. See round2.json for measured durations. Chatterbox is being evaluated separately using its bundled default voice; production voice remains unchanged.
