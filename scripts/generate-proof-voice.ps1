$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
& .venv-voice/Scripts/python scripts/generate-selected-voice.py
if ($LASTEXITCODE -ne 0) { throw 'Selected-voice generation failed' }
