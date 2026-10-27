import importlib.util,json,time
from pathlib import Path
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro
root=Path.cwd(); engine=Kokoro('models/kokoro/kokoro-v1.0.onnx','models/kokoro/voices-v1.0.bin'); text=Path('auditions/script.txt').read_text()
results=[]
for label,voice in [('H','am_liam'),('I','am_eric')]:
 start=time.perf_counter(); samples,rate=engine.create(text,voice=voice,speed=1.0,lang='en-us'); samples=np.asarray(samples)
 assert np.isfinite(samples).all() and np.max(np.abs(samples))>0
 samples=samples*(0.89/np.max(np.abs(samples))); sf.write(f'auditions/{label}.wav',samples,rate,subtype='PCM_16')
 row=dict(label=label,voice=voice,speed=1.0,seconds=len(samples)/rate,generation_seconds=time.perf_counter()-start);results.append(row);print(row,flush=True)
Path('auditions/american-conversational.json').write_text(json.dumps(results,indent=2))
