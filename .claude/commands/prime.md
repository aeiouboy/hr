# Prime
Execute the `Run`, `Read`, and `Report` sections to understand the codebase **and recover any prior-session handoff context** from `.omc/` (oh-my-claudecode) and `.omx/` (oh-my-codex) memory surfaces, then summarize your understanding.

## Run
Run these in parallel — they are independent:

- `git ls-files | head -200` and `git ls-files | wc -l` (repo shape)
- `git status --short` and `git log --oneline -10` (in-flight work + recent history)
- `ls -1t .omc/handoffs/ 2>/dev/null | head -5` (newest OMC handoff notes)
- `ls -1t .omc/SESSION-HANDOFF-*.md 2>/dev/null | head -3` (top-level session handoff docs)
- `ls -1t .omc/sessions/*.json 2>/dev/null | head -3` (most recent OMC session snapshots)
- `ls -1t .omx/context/ 2>/dev/null | head -5` and `ls -1t .omx/state/ 2>/dev/null | head -5` (OMX context + state surfaces)
- `ls -1t .omx/plans/ 2>/dev/null | head -5` and `ls -1t .omx/team/ 2>/dev/null | head -5` (OMX active plans + team panes)
- `ls -1t .omx/logs/ 2>/dev/null | head -5` (latest OMX run logs)

## Read
Read these in parallel. Skip silently if a path does not exist — none are required.

**Codebase baseline:**
- `README.md`
- `CLAUDE.md`
- `AGENTS.md` (if present — OMX top-level operating contract)

**OMC handoff memory (oh-my-claudecode):**
- The newest file in `.omc/handoffs/` (most recent handoff note from the prior session)
- The newest `.omc/SESSION-HANDOFF-*.md` at the repo root of `.omc/`
- `.omc/notepad.md` (if present — short-lived working notes)
- `.omc/project-memory.json` (durable project memory — scan, do not dump)
- `.omc/wiki/index.md` (if present — wiki entry points)

**OMX handoff memory (oh-my-codex):**
- `.omx/notepad.md` (if present)
- `.omx/project-memory.json` (if present — scan for active goals/decisions)
- The newest file in `.omx/context/` (most recent OMX context dump)
- The newest plan in `.omx/plans/` (active OMX plan, if any)
- `.omx/metrics.json` and `.omx/setup-scope.json` (current OMX scope, if present)

**Live state (only if non-empty):**
- `.omc/state/run-state.json`, `.omc/state/ralph-state.json`, `.omc/state/autopilot-state.json` — flag any active modes
- `.omx/state/` equivalents — flag any in-flight OMX team/ralph/autopilot

## Report
Summarize in this order — keep it tight, one short section each:

1. **Codebase** — stack, structure, current phase from `CLAUDE.md`.
2. **In-flight work** — uncommitted changes + recent commits + any branches/PRs mentioned in handoff notes.
3. **Prior-session handoff** — the single most recent OMC and OMX handoff: what was being worked on, what's done, what's next, any blockers. Cite the file path you read it from.
4. **Active modes** — call out any non-empty ralph/autopilot/team/ultrawork state files (OMC or OMX) so the user knows a loop may still be live; recommend `/oh-my-claudecode:cancel` if appropriate.
5. **Open questions** — anything the handoff left ambiguous that the user should clarify before resuming.

If no handoff memory exists in either `.omc/` or `.omx/`, say so explicitly under section 3 ("no prior handoff found") rather than omitting it — that itself is useful signal.
