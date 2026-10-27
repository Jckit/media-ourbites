$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
New-Item -ItemType Directory -Force public/proof | Out-Null
Add-Type -AssemblyName System.Speech
$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer
$speaker.Rate = 1
$lines = @('You own ten of one hundred shares.', 'The company issues twenty-five more.', 'Your ten shares now represent eight percent.', 'Rude.', 'Same shares. Smaller percentage. Not necessarily less value.')
try {
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $speaker.SetOutputToWaveFile((Join-Path (Get-Location) "public/proof/voice-$i.wav"))
        $speaker.Speak($lines[$i])
        $speaker.SetOutputToNull()
    }
    $speaker.SetOutputToWaveFile((Join-Path (Get-Location) 'public/proof/hook.wav'))
    $speaker.Speak('You kept every share. So why do you own less?')
    $speaker.SetOutputToNull()
} finally { $speaker.Dispose() }
@'
import json, wave
from pathlib import Path
lines = ['You own ten of one hundred shares.', 'The company issues twenty-five more.', 'Your ten shares now represent eight percent.', 'Rude.', 'Same shares. Smaller percentage. Not necessarily less value.']
offset = 0
clips = []
for i, text in enumerate(lines):
    with wave.open(f'public/proof/voice-{i}.wav') as stream:
        duration = stream.getnframes() / stream.getframerate()
    clips.append(dict(text=text, start=offset, duration=duration, file=f'proof/voice-{i}.wav'))
    offset += duration + 0.18
Path('src/proof-audio.json').write_text(json.dumps(dict(clips=clips, duration=offset+0.4), indent=2), encoding='utf-8')
'@ | python
if ($LASTEXITCODE -ne 0) { throw 'Audio timing extraction failed' }
