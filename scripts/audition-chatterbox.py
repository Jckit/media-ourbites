"""Audition the bundled Chatterbox voice, without cloning a person."""
import os
from pathlib import Path
import time
import json

ROOT = Path(__file__).resolve().parents[1]
os.environ['HF_HOME'] = str(ROOT / 'models/huggingface')
import torch
import soundfile as sf
import numpy as np
from chatterbox.tts import ChatterboxTTS

torch.manual_seed(42)
torch.set_num_threads(4)
start = time.perf_counter()
model = ChatterboxTTS.from_pretrained(device='cpu')
text = (ROOT / 'auditions/script.txt').read_text(encoding='utf-8')
samples = model.generate(text, exaggeration=0.35, cfg_weight=0.5).squeeze().numpy()
if not np.isfinite(samples).all() or np.max(np.abs(samples)) < 1e-5:
    raise ValueError('Invalid or silent synthesis')
samples *= 0.89 / np.max(np.abs(samples))
sf.write(ROOT / 'auditions/G-chatterbox.wav', samples, model.sr, subtype='PCM_16')
result = dict(voice='bundled Chatterbox default', device='cpu', seed=42,
              exaggeration=0.35, cfg_weight=0.5, seconds=len(samples)/model.sr,
              elapsed_seconds=time.perf_counter()-start)
(ROOT / 'auditions/chatterbox.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(result)
