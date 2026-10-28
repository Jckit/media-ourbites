# Running the Ourbites implementation loop every 20 minutes (Windows)

Prepared: 2026-10-28. **The task is not installed merely because these files exist on GitHub.** It must be registered **once in your own Windows session** using the installer below. It runs on the existing local Codex checkout, preserving the user's unrelated files and review history. GitHub/ChatGPT cloud schedules do **not** have access to `C:\Users\Justin\Documents\ChatGPT\Businesses\business-and-chats` by default.

## Install and test locally

Open Windows PowerShell **as your normal account**, with Codex CLI and Git already installed and Codex logged in.

```powershell
cd C:\Users\Justin\Documents\ChatGPT\Businesses\business-and-chats
git status --short
git fetch origin main
# Reconcile your own dirty work before updating if your branch is behind:
git pull --ff-only origin main
# The above --ff-only command may fail with local dirty/conflicting changes:
# NEVER stash/reset/discard them automatically. Resolve that situation manually.

# One-time registration (first run about 20 min after installation)
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\scripts\install-viewer-loop-task.ps1

# Inspect that a real task was created and its next run time
Get-ScheduledTask -TaskName 'Ourbites Viewer Loop'
Get-ScheduledTaskInfo -TaskName 'Ourbites Viewer Loop'

# Optional: manually trigger the first actual implementation cycle for testing
Start-ScheduledTask -TaskName 'Ourbites Viewer Loop'
```

The installer creates an interactive **current-user** scheduled task recurring every 20 minutes for 3650 days (~10 years). It intentionally doesn't start it immediately or overwrite an existing same-named task unless you run it with `-ReplaceExisting` after checking the existing configuration. The computer must be **on and the user signed in** for that interactive task to work; missed runs and exact execution times are subject to Task Scheduler behavior. You do not need to expose tokens or a GitHub PAT. This uses Codex's existing authenticated login and plan limits; activity still consumes eligible usage, and additional billing depends on the user's Codex authentication/configuration.

## What each wake actually does

1. `scripts/viewer-loop-20m.ps1` obtains exclusive `reviews/viewer-loop.lock` (owner/PID/UTC timestamp). If already locked, it refuses to run; never overrides another actor's lock. The parent owns/releases the lock; Codex does not acquire another.
2. Checks `git` and `codex`. Fetches `origin/main` without a pull, merge or rebase. If local HEAD is behind the remote, aborts **without editing**, rather than overwrite local dirty files. Read and preserve the current worktree.
3. Loads `scripts/viewer-loop-prompt.md`, which requires the *latest* `skills/ourbites-viewer/SKILL.md`, production skill, latest reviews and state, plus relevant Remotion instructions.
4. Codex selects **one actionable, evidence-supported feature**, initially the fictional hybrid protagonist's expressiveness and meaningful interaction; avoids reimplementing the Dario financing-card handoff already recorded as done.
5. Freezes the finding, makes **one coherent local Remotion edit**, renders and inspects the same before/after moments at phone size, runs appropriate checks, and logs output hashes. Allow one repair. Only count an issue done with actual evidence; log unsupported audio/full-motion inspection honestly.
6. Preserves `am_puck` voice A at **original pitch**, 1.1× playback, actual financials and caveats, silent Dario, rights and human publication gates. **No purchases, pushing, publishing, destructive git commands or fabricated approvals.**
7. Writes runner log/metadata under ignored `out/viewer-task-runs/` plus the skill-directed reviews in `reviews/viewer/` and state in `reviews/viewer-loop.json`. Releases the lock in `finally`.

The **three accepted self-directed subjective revisions** cap still applies. This user's October 28 feedback authorizes **one additional protagonist-specific** direction, not limitless changes; verified defects may still be repaired. A no-change run is valid when justified by completed backlog, genuine blocker, creative cap or insufficient evidence—not because source hashes are unchanged.

## Review, stop or remove

```powershell
# Read last-run status
Get-ScheduledTaskInfo -TaskName 'Ourbites Viewer Loop'
# Temporarily pause
Disable-ScheduledTask -TaskName 'Ourbites Viewer Loop'
# Resume
Enable-ScheduledTask -TaskName 'Ourbites Viewer Loop'
# Remove if no longer needed
Unregister-ScheduledTask -TaskName 'Ourbites Viewer Loop' -Confirm:$false
```

**Do not delete a live lock manually.** If a PC crash leaves a lock behind, inspect `reviews/viewer-loop.lock` for owner/PID/start time and confirm there is no live Codex process before manually recovering it.

## Scheduling distinctions and limitations

- ChatGPT scheduled tasks created directly in this chat currently support **at most hourly** recurrence; therefore an exact 20-minute ChatGPT task cannot be created here.
- This repository's Windows Task Scheduler setup supports the requested **20-minute local interval**, but GitHub edits cannot activate it on your PC. The installer above requires your action.
- A GitHub Actions cron could trigger every 20 minutes, but it runs in a remote GitHub checkout **without your uncommitted Windows files, local Voice A models or already logged-in Codex**, and would need separately provisioned credentials/usage and permissions. It is not substituted for this local task.
- The separate official ChatGPT desktop **Scheduled** UI may support custom local-project recurrences in eligible installations; if using it instead, point it to this exact checkout and skill and do not schedule **both** loops against the same branch simultaneously.
- The scripts are not yet proven in the user's Windows environment. `CI` can syntax-check PowerShell and run Python/TypeScript tests, but cannot prove that Task Scheduler registration or local voice/render tools actually work. Inspect the first run and its artifacts.
