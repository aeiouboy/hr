# Ken OMX Workflow — HR

Purpose: keep the Agent OS workflow clear: Ouroboros is the first layer for requirements/seed/contracts; OMX is the execution engine after scope is defined; JARVIS verifies and reports. Keep commands direct; no extra wrapper unless it clearly adds value.

## Project

- Root: `/Users/tachongrak/Projects/hr`
- Main code path: `src/frontend`
- Stack: Next.js 16, React 19, TypeScript, Vitest/Playwright
- Canonical repo guidance: `AGENTS.md`

## Layered routing

1. **Ouroboros / Agent OS** — interview, clarify requirements, generate Seed Contract / Acceptance Criteria.
2. **OMX** — execute the approved Seed/AC against the repo.
3. **JARVIS** — interface, memory, independent verification, Discord reporting.

Use JARVIS direct only for small bounded work where an Ouroboros interview would be heavier than the change.

## Execution routing

### JARVIS direct
Use for small, bounded, verified work:

- inspect files and git status
- explain existing behavior
- make small targeted edits
- run focused tests/builds
- verify results and report back in Discord

### Ouroboros first layer
Use when the task is not already a small, obvious edit, especially when requirements, acceptance criteria, or cross-team meaning matter.

```bash
ouroboros init start --llm-backend codex "HR task: <context>"
```

The output Seed/AC becomes the contract for execution.

### OMX scout
Use after/alongside Ouroboros when repo context is unclear. Must be read-only.

```bash
cd /Users/tachongrak/Projects/hr
omx explore "map the affected files for <task>; do not modify files"
omx sparkshell git status --short
```

### OMX team
Use only after Ouroboros/Seed scope or a JARVIS-approved plan exists and the task is large enough to split.

```bash
cd /Users/tachongrak/Projects/hr
omx team "Implement the approved HR task. Keep diffs surgical, preserve existing dirty work, run focused tests, and report evidence."
```

### OMX ultragoal
Use for multi-milestone HR work where checkpoint/evidence matters more than a single code change.

```bash
omx ultragoal create-goals --brief-file docs/plans/<brief>.md
omx ultragoal status --json
```

## HR guardrails

- Preserve existing dirty worktree changes unless the task explicitly owns them.
- Product work normally targets `src/frontend`, not legacy static app paths.
- Use existing Humi primitives and design tokens.
- Keep TH/EN locale files aligned when UI copy changes.
- Use focused Vitest tests first; broaden to build or Playwright based on risk.

## Recommended command sequence

1. If the task is not a small obvious edit, start with Ouroboros and generate Seed/AC.
2. Scout repo impact only when file/test context is unclear:
   ```bash
   cd /Users/tachongrak/Projects/hr
   omx explore "identify files/tests for <task>; read-only"
   ```
3. Draft/approve plan in Discord with JARVIS.
4. Execute large approved work through OMX team:
   ```bash
   cd /Users/tachongrak/Projects/hr
   omx team "<approved task>"
   ```
5. JARVIS verifies independently against the Seed/AC:
   ```bash
   cd /Users/tachongrak/Projects/hr
   omx sparkshell git status --short
   cd /Users/tachongrak/Projects/hr/src/frontend && npm test -- --run <focused-test>
   ```

## Do not use by default

- `omx adapt hermes` — observation only, not useful for HR delivery
- deprecated OMX workflows (`swarm`, `ecomode`, `deepsearch`, old direct `autoresearch`)
- `--madmax` unless explicitly approved
