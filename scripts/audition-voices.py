"""Generate comparable local voice auditions; run with .venv-voice/Scripts/python."""
from pathlib import Path
import hashlib
import json
import time
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parents[1]
TEXT = "You kept every share. So why do you own less? Imagine you own ten of one hundred shares. The company issues twenty-five more to someone else. Your ten shares now represent eight percent. Rude. But hold on. A smaller percentage does not automatically mean less value. What did the company get in return? That is the question worth asking."
CANDIDATES = [('A', 'am_puck', 'en-us'), ('B', 'af_heart', 'en-us'), ('C', 'bm_george', 'en-gb'), ('D', 'bf_emma', 'en-gb')]

def main():
    destination = ROOT / 'auditions'
    destination.mkdir(exist_ok=True)
    (destination / 'script.txt').write_text(TEXT + '\n', encoding='utf-8')
    model = ROOT / 'models/kokoro/kokoro-v1.0.onnx'
    voices = ROOT / 'models/kokoro/voices-v1.0.bin'
    engine = Kokoro(str(model), str(voices))
    results = []
    for label, voice, language in CANDIDATES:
        start = time.perf_counter()
        samples, rate = engine.create(TEXT, voice=voice, speed=1.0, lang=language)
        samples = np.asarray(samples)
        if not len(samples) or not np.isfinite(samples).all():
            raise ValueError(f'Invalid output for {voice}')
        # Equal peak ceiling, not perceptual loudness normalization.
        peak = float(np.max(np.abs(samples)))
        if peak < 1e-5:
            raise ValueError(f'Silent output for {voice}')
        samples = samples * (0.89 / peak)
        output = destination / f'{label}.wav'
        sf.write(output, samples, rate, subtype='PCM_16')
        result = dict(label=label, voice=voice, language=language, speed=1.0,
                      seconds=round(len(samples)/rate, 2), generation_seconds=round(time.perf_counter()-start, 2),
                      sample_rate=rate, sha256=hashlib.sha256(output.read_bytes()).hexdigest())
        results.append(result)
        print(json.dumps(result), flush=True)
    metadata = dict(engine='kokoro-onnx', model='Kokoro v1.0',
                    model_sha256=hashlib.sha256(model.read_bytes()).hexdigest(),
                    voices_sha256=hashlib.sha256(voices.read_bytes()).hexdigest(),
                    candidates=results)
    (destination / 'manifest.json').write_text(json.dumps(metadata, indent=2), encoding='utf-8')

if __name__ == '__main__':
    main()
