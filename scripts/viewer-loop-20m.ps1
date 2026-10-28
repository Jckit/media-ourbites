# Local Codex viewer loop runner for Windows Task Scheduler.
# Existing authenticated Codex CLI only. Does not push, publish, or install dependencies.
[CmdletBinding()]
param([string]$RepoRoot = (Join-Path $PSScriptRoot '..'))
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath $RepoRoot).Path
$lockPath = Join-Path $root 'reviews\viewer-loop.lock'
$logDir = Join-Path $root 'out\viewer-task-runs'
$promptFile = Join-Path $root 'scripts\viewer-loop-prompt.md'
$stamp = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$logPath = Join-Path $logDir "$stamp.log"
$metadataPath = Join-Path $logDir "$stamp-run.json"
$lastMessagePath = Join-Path $logDir "$stamp-last-message.txt"
$owner = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$lock = $null
$exitCode = 1
$head = ''
$remote = ''
$detail = 'Not started'
$before = @{}
$after = @{}
$tracked = @('src/OurbitesHost.tsx','src/AnthropicCharacter.tsx',
             'src/DarioIllustration.tsx','reviews/viewer-loop.json')
try {
    # Atomic CreateNew + exclusive file share prevents overlapping manual/scheduled runs.
    # Never override an existing lock belonging to another actor.
    try {
        $lock = [System.IO.File]::Open($lockPath,
            [System.IO.FileMode]::CreateNew,
            [System.IO.FileAccess]::ReadWrite,
            [System.IO.FileShare]::None)
    }
    catch [System.IO.IOException] {
        throw 'Viewer loop already locked; skipped rather than deleting another actor lock'
    }
    $identity = @{
        owner = $owner
        pid = $PID
        started_at_utc = (Get-Date).ToUniversalTime().ToString('o')
        runner = 'scripts/viewer-loop-20m.ps1'
    } | ConvertTo-Json -Compress
    $bytes = [Text.Encoding]::UTF8.GetBytes($identity)
    $lock.Write($bytes,0,$bytes.Length)
    $lock.Flush()
    if (-not (Test-Path -LiteralPath $promptFile)) { throw "Missing $promptFile" }

    $codex = Get-Command codex -ErrorAction Stop
    $git = Get-Command git -ErrorAction Stop
    $gitRoot = (& $git.Source -C $root rev-parse --show-toplevel)
    if ($LASTEXITCODE -ne 0) { throw 'Not a Git repository' }
    if ([IO.Path]::GetFullPath($gitRoot.Trim()) -ne [IO.Path]::GetFullPath($root)) {
        throw 'Unexpected checkout root: aborting'
    }

    # Read latest remote before reading/editing; never auto-pull across dirty changes.
    $oldPrompt = $env:GIT_TERMINAL_PROMPT
    $env:GIT_TERMINAL_PROMPT = '0'
    try {
        & $git.Source -C $root fetch --quiet origin main 2>&1 |
            Out-File -FilePath $logPath -Append -Encoding UTF8
        if ($LASTEXITCODE -ne 0) { throw 'Git fetch failed; cannot confirm remote freshness' }
    }
    finally { $env:GIT_TERMINAL_PROMPT = $oldPrompt }

    $head = (& $git.Source -C $root rev-parse HEAD).Trim()
    $remote = (& $git.Source -C $root rev-parse origin/main).Trim()
    $behind = [int]((& $git.Source -C $root rev-list --count HEAD..origin/main).Trim())
    if ($behind -gt 0) {
        throw "Local checkout is $behind commits behind origin/main. Do not discard dirty changes; reconcile manually and retry."
    }
    foreach ($path in $tracked) {
        $full = Join-Path $root $path
        if (Test-Path -LiteralPath $full) {
            $before[$path] = (Get-FileHash -LiteralPath $full -Algorithm SHA256).Hash
        }
    }
    $prompt = (Get-Content -LiteralPath $promptFile -Encoding UTF8 -Raw).Trim()
    $prompt += [Environment]::NewLine + [Environment]::NewLine +
        "PARENT LOCK OWNER: $owner PID $PID $stamp. Runner owns reviews/viewer-loop.lock. Do not acquire a second lock or remove this one."

    Push-Location $root
    try {
        # Avoid retired --full-auto and unsafe network/file privileges.
        $originalPreference = $ErrorActionPreference
        $ErrorActionPreference = 'Continue' # PS5: CLI stderr should not trigger a premature terminating error.
        try {
            & $codex.Source exec --sandbox workspace-write --output-last-message $lastMessagePath $prompt 2>&1 |
                Out-File -FilePath $logPath -Append -Encoding UTF8
            $exitCode = $LASTEXITCODE
        }
        finally { $ErrorActionPreference = $originalPreference }
    }
    finally { Pop-Location }
    $detail = if ($exitCode -eq 0) { 'Codex completed; inspect its logged visual evidence' }
              else { "Codex failed, exit code $exitCode" }
}
catch {
    $detail = 'BLOCKED: ' + $_.Exception.Message
    Add-Content -LiteralPath $logPath -Value $detail -Encoding UTF8
}
finally {
    foreach ($path in $tracked) {
        $full = Join-Path $root $path
        if (Test-Path -LiteralPath $full) {
            $after[$path] = (Get-FileHash -LiteralPath $full -Algorithm SHA256).Hash
        }
    }
    $record = [ordered]@{
        run_utc = $stamp
        owner = $owner
        pid = $PID
        local_head_sha = $head
        origin_main_sha = $remote
        exit_code = $exitCode
        result = $detail
        input_hashes = $before
        output_hashes = $after
        log_path = $logPath
        last_message_path = $lastMessagePath
        limitations = 'Wrapper hashes are not evidence of rendered media; see reviews/viewer for actual frame/output verification.'
    }
    try { $record | ConvertTo-Json -Depth 7 | Set-Content -LiteralPath $metadataPath -Encoding UTF8 }
    catch { Write-Warning ('Could not record run details: ' + $_.Exception.Message) }
    if ($null -ne $lock) {
        $lock.Dispose()
        # Remove only this runner's lock, never a pre-existing foreign lock.
        try { Remove-Item -LiteralPath $lockPath -Force -ErrorAction Stop }
        catch { Write-Warning 'Own lock could not be removed; inspect before next run' }
    }
}
Write-Output "$detail ($logPath)"
if ($exitCode -ne 0) { exit $exitCode }
