from pathlib import Path
import json,numpy as np,soundfile as sf
from kokoro_onnx import Kokoro
root=Path.cwd(); out=root/'public/anthropic-character';out.mkdir(exist_ok=True)
lines=['Eighty billion dollars. That is a lot of zeros.','But wait. This is reported net loss, not a cash receipt.','The operating loss? Six hundred ninety-three million. Still serious.','Most of the gap comes from accounting changes on financing. Read the pieces, not just the headline.']
k=Kokoro('models/kokoro/kokoro-v1.0.onnx','models/kokoro/voices-v1.0.bin');clips=[];t=0
for i,line in enumerate(lines):
 x,sr=k.create(line,voice='am_puck',speed=1.0,lang='en-us'); x=np.asarray(x);sf.write(out/f'{i}.wav',x*(0.89/np.max(np.abs(x))),sr,subtype='PCM_16');d=len(x)/sr;clips.append(dict(text=line,start=t,duration=d,file=f'anthropic-character/{i}.wav'));t+=d+0.3
(root/'src/anthropic-character-audio.json').write_text(json.dumps(dict(clips=clips,duration=t+0.4),indent=2),encoding='utf-8');print(t)
