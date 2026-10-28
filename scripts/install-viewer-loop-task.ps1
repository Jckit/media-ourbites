# One-time Windows Task Scheduler installer.
# Local user, twenty-minute cadence, no stored password or API secret.
[CmdletBinding()]
param(
    [string]$RepoRoot = (Join-Path $PSScriptRoot '..'),
    [string]$TaskName = 'Ourbites Viewer Loop',
    [switch]$ReplaceExisting
)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
if ($env:OS -ne 'Windows_NT') { throw 'Windows Task Scheduler is required' }
$root = (Resolve-Path -LiteralPath $RepoRoot).Path
$runner = Join-Path $root 'scripts\viewer-loop-20m.ps1'
$prompt = Join-Path $root 'scripts\viewer-loop-prompt.md'
if (-not (Test-Path -LiteralPath $runner)) { throw "Missing runner: $runner" }
if (-not (Test-Path -LiteralPath $prompt)) { throw "Missing prompt: $prompt" }
if (-not (Get-Command codex -ErrorAction SilentlyContinue)) {
    throw 'Codex CLI not in PATH. Login/install for this Windows account first.'
}
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Git not in PATH' }
$existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
if ($null -ne $existing -and -not $ReplaceExisting) {
    throw "Task '$TaskName' already exists. Use -ReplaceExisting only after reviewing it."
}
$ps = Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe'
$argsForTask = '-NoProfile -NonInteractive -ExecutionPolicy Bypass -File "' +
    $runner + '" -RepoRoot "' + $root + '"'
$action = New-ScheduledTaskAction -Execute $ps -Argument $argsForTask
$triggerArgs = @{
    Once = $true
    At = (Get-Date).AddMinutes(20)
    RepetitionInterval = (New-TimeSpan -Minutes 20)
    RepetitionDuration = (New-TimeSpan -Days 3650)
}
$trigger = New-ScheduledTaskTrigger @triggerArgs
$user = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
$principalArgs = @{UserId=$user;LogonType='Interactive';RunLevel='Limited'}
$principal = New-ScheduledTaskPrincipal @principalArgs
$settings = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -StartWhenAvailable
$registerArgs = @{
    TaskName = $TaskName
    Action = $action
    Trigger = $trigger
    Principal = $principal
    Settings = $settings
    Description = 'Local Ourbites viewer implementation cycle, every 20 min; no push or publish'
    Force = [bool]$ReplaceExisting
}
$null = Register-ScheduledTask @registerArgs
$task = Get-ScheduledTask -TaskName $TaskName -ErrorAction Stop
$info = Get-ScheduledTaskInfo -TaskName $TaskName
Write-Host ('Registered: ' + $task.TaskName)
Write-Host ('Current user: ' + $user)
Write-Host ('Status: ' + $task.State)
Write-Host ('Next run: ' + $info.NextRunTime)
Write-Host ('Workspace: ' + $root)
Write-Host ('Logs: ' + (Join-Path $root 'out\viewer-task-runs'))
Write-Host 'PC must be on, user signed in, Codex CLI authenticated. Review first run before relying on it.'
