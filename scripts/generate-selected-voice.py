"""Generate pilot narration using the selected Ourbites preset and measured timings."""
from pathlib import Path
import json
if json.loads((Path(__file__).resolve().parents[1] / 'auditions/selected-voice.json').read_text(encoding='utf-8-sig'))['provider'] != 'kokoro-onnx':
    raise SystemExit('The lead voice is now Justin. Use scripts/generate_lead_voice.py for new narration; existing proof timings require realignment before replacing audio.')
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

root=Path(__file__).resolve().parents[1]
preset=json.loads((root/'auditions/selected-voice.json').read_text())
engine=Kokoro(str(root/'models/kokoro/kokoro-v1.0.onnx'),str(root/'models/kokoro/voices-v1.0.bin'))
lines=['You own ten of one hundred shares.','The company issues twenty-five more.','Your ten shares now represent eight percent.','Rude.','Same shares. Smaller percentage. Not necessarily less value.']
clips=[]
offset=0
for i,text in enumerate(lines+['You kept every share. So why do you own less?']):
    samples,rate=engine.create(text,voice=preset['voice'],speed=preset['synthesis_speed'],lang=preset['language'])
    samples=np.asarray(samples)
    peak=float(np.max(np.abs(samples)))
    if not np.isfinite(samples).all() or peak<1e-5:
        raise ValueError('Invalid generated audio')
    samples=samples*(0.89/peak)
    name=f'voice-{i}.wav' if i<len(lines) else 'hook.wav'
    sf.write(root/'public/proof'/name,samples,rate,subtype='PCM_16')
    duration=len(samples)/rate
    if i<len(lines):
        clips.append(dict(text=text,start=offset,duration=duration,file='proof/'+name))
        offset+=duration+0.18
    else:
        hook_duration=duration
manifest=dict(clips=clips,duration=offset+0.4,hook_duration=hook_duration,voice=preset)
(root/'src/proof-audio.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(f'Generated am_puck; narration {offset:.2f}s, hook {hook_duration:.2f}s')
