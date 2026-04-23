# Plan: HR Phase 1 D1 Foundation — Factory Context + Orphan Cleanup + Shared Extensions

## Task Description

Phase 1 D1 is the sequential foundation cluster that unlocks all Archetype B (contextual lifecycle) work in the HR Platform replacement. It bundles five tightly-coupled changes that must land together so the factory, route taxonomy, and shared contract are consistent before any D2 builder starts.

Context (from `HR-UI-PROGRESSIVE-PLAN.md` v2 §8):
- Plan §0.3 Archetype rule — **Hire is the only Archetype A (standalone `/admin/hire`)**. All other lifecycle actions (probation / rehire / terminate / transfer) are **Archetype B** and must live under `/employees/[id]/<action>`.
- Phase 0 audit found 4 orphan standalone routes violating the archetype rule, the shared wizard factory cannot accept an employee context, `@hrms/shared` lacks `TimelineEvent` + `YES_NO`, `StepBiographical` renders without the `PICKLIST_MARITAL_STATUS` wiring shipped in Phase 0 F2, and 21 test files break on imports after the F4 restructure.
- RIS commitment: EC-Core batch 1 UI drop due **Apr W4 (4 days from today, 2026-04-23)** — D1 is the blocker; slip D1 = cascade slip.

Source plan: `/Users/tachongrak/stark/projects/hr-platform-replacement/HR-UI-PROGRESSIVE-PLAN.md` §8 "Phase 1 Kickoff Checklist — D1".

## Objective

When D1 is complete:
1. `createClusterWizard` accepts `employeeId?` + `preloadedEmployee?` so Archetype B wizards (Probation/Transfer/Terminate/Rehire in D2+) can contextualize off an existing employee.
2. The route tree has zero orphan standalone lifecycle routes — only `/admin/hire` remains at admin level; all other lifecycle moves into `/employees/[id]/<action>` in later phases.
3. `@hrms/shared` exports the `TimelineEvent` type union and `YES_NO` picklist; `StepBiographical` renders the MARITAL picklist wired from Phase 0 F2.
4. `npm test` (frontend) has zero import-resolution errors (the Phase 0 known regression).
5. A single commit on `master` moves `pipeline-state.json` from phase 1 to phase 2, unblocking the D2 parallel batch.

Measurable: validator commands at bottom return expected empty/zero outputs.

## Tech Stack

- **Language**: TypeScript 5.x
- **Framework**: Next.js 16 (App Router) + React 19
- **Styling**: Tailwind CSS v4 (preflight only — no global `*` reset per rule 26b)
- **State**: Zustand with `persist` + `createJSONStorage` middleware
- **Validation**: zod
- **Runtime**: Node.js (Next dev/build); Bun reserved for scripts
- **Workspace**: npm workspaces — `@hrms/shared` at `src/services/shared/`
- **Testing**: Vitest + jsdom + @testing-library/react (vitest.config.ts mandatory per rule 93)
- **Required reading for all FE agents** (inject into every FE agent dispatch prompt per `feedback_fe_agents_must_read_vercel_skills.md`):
  - Vercel skill `react-best-practices`
  - Vercel skill `composition-patterns`
  - Vercel skill `web-design-guidelines`

## Technical Design

### Architecture

```
src/frontend/src/
├── app/[locale]/admin/
│   ├── hire/                    # KEEP — only Archetype A (standalone new record)
│   ├── probation/               # DELETE — orphan (D1.1)
│   ├── rehire/                  # DELETE — orphan (D1.1)
│   ├── terminate/               # DELETE — orphan (D1.1)
│   └── transfer/                # DELETE — orphan (D1.1)
├── lib/admin/wizard-template/
│   └── createClusterWizard.ts   # REFACTOR — add employeeId + preloadedEmployee (D1.2)
└── lib/admin/wizard-template/__tests__/
    └── createClusterWizard.test.ts  # EXTEND — cover both context modes

src/services/shared/src/
├── types/
│   └── timeline.ts              # NEW — TimelineEvent union (D1.3)
├── picklists/
│   └── yes-no.ts                # NEW — YES_NO picklist (D1.3)
└── index.ts                     # EXPORT — new types + picklist

src/frontend/src/app/[locale]/admin/hire/steps/StepBiographical.tsx
                                  # WIRE — import + render PICKLIST_MARITAL_STATUS (D1.3)
```

### Key Design Decisions

1. **Factory signature is additive, not breaking** — both new params are optional. Hire (Archetype A) continues to work without them; B-archetype wizards opt in. Rationale: avoid refactoring all 6 existing factory callers.
2. **Preloaded fields are read-only, not disabled** — UI hint only (e.g. `readOnly` prop + subdued style). Employee context is truth; editing it belongs in the master Employee edit flow, not a lifecycle action. Source: Plan §4.2.
3. **Submit payload shape** — when `employeeId` is present, submit posts `{ employee_id, action, payload }` to the action endpoint; without `employeeId` it posts the legacy flat payload. The wizard does not decide which endpoint — `sliceValid`/`onSubmit` callers do.
4. **Orphan deletion is irreversible-but-safe** — no code references these routes (Phase 0 audit confirmed). Deletion + single commit; if rollback needed, git revert one commit.
5. **21 test-import fix is mechanical only** — fix paths, do NOT touch test logic. If a test fails for non-import reasons post-fix, document in test-report.md, do not fix in D1 (scope).

## Relevant Files

- `src/frontend/src/lib/admin/wizard-template/createClusterWizard.ts` — factory config object + return type; current signature lacks employee context hooks. Refactored in D1.2.
- `src/frontend/src/lib/admin/wizard-template/__tests__/createClusterWizard.test.ts` — existing factory tests; extend to cover both context modes (D1.2 + test-writer).
- `src/frontend/src/app/[locale]/admin/probation/` — orphan dir deleted in D1.1.
- `src/frontend/src/app/[locale]/admin/rehire/` — orphan dir deleted in D1.1.
- `src/frontend/src/app/[locale]/admin/terminate/` — orphan dir deleted in D1.1.
- `src/frontend/src/app/[locale]/admin/transfer/` — orphan dir deleted in D1.1.
- `src/services/shared/src/` — `@hrms/shared` package root; add timeline.ts + yes-no.ts (D1.3).
- `src/services/shared/src/index.ts` — barrel export; wire new symbols (D1.3).
- `src/frontend/src/app/[locale]/admin/hire/steps/StepBiographical.tsx` — import + render `PICKLIST_MARITAL_STATUS` (D1.3).
- `pipeline-state.json` (repo root) — update `phase` from 1 → 2 + append D1 tasks to `completed_phases` (D1.5).
- `test-report.md` (repo root) — record import-error count before/after + note any pre-existing logic failures.

## Team Orchestration

JARVIS orchestrates — never touches code directly. Each task assigned to one Mark. FE agents must read the 3 Vercel skills listed in Tech Stack before coding.

### Team Members

- **Builder (Mechanical)**
  - Name: mk3-builder
  - Agent: MK III — Builder
  - Role: Delete orphan dirs (D1.1), fix 21 mechanical test imports (D1.4)

- **Frontend Builder**
  - Name: frontend-builder
  - Agent: Forge Frontend — UI Builder
  - Role: Refactor `createClusterWizard` to accept `employeeId` + `preloadedEmployee` (D1.2); must read the 3 Vercel skills per `feedback_fe_agents_must_read_vercel_skills.md`

- **Backend Builder**
  - Name: backend-builder
  - Agent: Forge Backend — API Builder
  - Role: Extend `@hrms/shared` with `TimelineEvent` + `YES_NO`; wire `PICKLIST_MARITAL_STATUS` into `StepBiographical` (D1.3)

- **Test Writer**
  - Name: test-writer
  - Agent: MK VI — Test Writer
  - Role: Factory tests covering both context modes (with `employeeId` / without); traceability comments referencing AC-1

- **Code Reviewer**
  - Name: code-reviewer
  - Agent: MK II — Code Reviewer
  - Role: Quality, security, 30-second readability; fix inline, not just report

- **Validator**
  - Name: validator
  - Agent: MK IV — Validator
  - Role: Run all validation commands, verify ACs, capture actual terminal output (C2)

## Step by Step Tasks

### 1. Delete 4 Orphan Standalone Routes

- **Task ID**: d1-1-delete-orphans
- **Depends On**: none
- **Assigned To**: mk3-builder
- **Parallel**: true (with D1.4)
- **Files**:
  - `src/frontend/src/app/[locale]/admin/probation/` (DELETE recursively)
  - `src/frontend/src/app/[locale]/admin/rehire/` (DELETE recursively)
  - `src/frontend/src/app/[locale]/admin/terminate/` (DELETE recursively)
  - `src/frontend/src/app/[locale]/admin/transfer/` (DELETE recursively)
- **Actions**:
  - Verify no active entry points link to these routes: `grep -r "admin/probation\|admin/rehire\|admin/terminate\|admin/transfer" src/frontend/src/ --include="*.tsx" --include="*.ts"` — should return zero hits (Phase 0 already removed entry points)
  - `rm -rf` each of the 4 dirs
  - If any factory test file references these paths, update references to point at `/employees/[id]/<action>` placeholders or remove the obsolete test case (document rationale in test-report.md)
  - Enforces Plan §0.3 archetype rule + `feedback_no_orphaned_routes.md`

### 2. Fix 21 Broken Test Imports

- **Task ID**: d1-4-fix-test-imports
- **Depends On**: none
- **Assigned To**: mk3-builder
- **Parallel**: true (with D1.1)
- **Files**:
  - Files determined at runtime by command below (estimated ~21 test files under `src/frontend/src/**/__tests__/`)
- **Actions**:
  - Run `cd src/frontend && npm test 2>&1 | grep -E "Cannot find|Module not found"` to enumerate broken import paths
  - For each: update import specifier to correct relative/alias path; do NOT modify test logic or assertions (C1 surgical)
  - Re-run `npm test 2>&1 | grep -E "Cannot find|Module not found"` — must be empty
  - Record before/after count in `test-report.md`

### 3. Refactor createClusterWizard for Employee Context

- **Task ID**: d1-2-factory-refactor
- **Depends On**: d1-1-delete-orphans (avoid test/route conflict during edit)
- **Assigned To**: frontend-builder
- **Parallel**: true (with D1.3)
- **Files**:
  - `src/frontend/src/lib/admin/wizard-template/createClusterWizard.ts`
- **Actions**:
  - **Pre-work (MANDATORY)**: Read Vercel skills `react-best-practices`, `composition-patterns`, `web-design-guidelines` before coding (per `feedback_fe_agents_must_read_vercel_skills.md`)
  - Extend config type: add `employeeId?: string` and `preloadedEmployee?: Partial<Employee>` (import `Employee` type from `@hrms/shared`)
  - When `preloadedEmployee` is provided, deep-merge its fields into `initialFormData` at store init (preloaded values win) and expose a `readOnlyFields: string[]` selector derived from `Object.keys(preloadedEmployee)` for UI consumption
  - When `employeeId` is present, the `Shell` component passes `{ employee_id, action, payload }` envelope to the caller-provided submit handler; without it, passes flat `payload` (current behavior). Do not hard-code endpoints in the factory — callers decide.
  - Backwards-compat: Hire wizard (no context params) must render identically to current behavior — snapshot test or explicit assertion in factory tests
  - Strip inner step-component submit/nav ownership hints in JSDoc (reference `feedback_wizard_collapse_strip_inner_submit.md` so D2 builders don't regress)
  - Export updated types from factory module's public surface

### 4. Extend @hrms/shared + Wire MARITAL Picklist

- **Task ID**: d1-3-shared-extensions
- **Depends On**: d1-1-delete-orphans
- **Assigned To**: backend-builder
- **Parallel**: true (with D1.2)
- **Files**:
  - `src/services/shared/src/types/timeline.ts` (NEW)
  - `src/services/shared/src/picklists/yes-no.ts` (NEW)
  - `src/services/shared/src/index.ts` (EDIT — add exports)
  - `src/frontend/src/app/[locale]/admin/hire/steps/StepBiographical.tsx` (EDIT — import + render MARITAL picklist)
- **Actions**:
  - **Pre-work (MANDATORY)**: Read Vercel skills `react-best-practices`, `composition-patterns`, `web-design-guidelines` before the `StepBiographical` edit
  - Create `TimelineEvent` as a discriminated union: `HireEvent | ProbationEvent | TransferEvent | TerminateEvent | RehireEvent | ContractRenewalEvent`; each variant has `{ type: string, employee_id: string, timestamp: string, ...eventPayload }`. **Types only — no runtime logic, no schema, no handlers**.
  - Create `YES_NO` picklist matching Phase 0 F2 pipeline shape: `{ value: boolean, label_th: string, label_en: string }[]` → `[{value: true, label_th: 'ใช่', label_en: 'Yes'}, {value: false, label_th: 'ไม่ใช่', label_en: 'No'}]`
  - Update `src/services/shared/src/index.ts` barrel to re-export both
  - In `StepBiographical.tsx`: import `PICKLIST_MARITAL_STATUS` from `@hrms/shared`, render as `<Select>` (or existing picklist component) bound to the `maritalStatus` field; follow existing picklist rendering pattern in neighboring Step files for consistency (C1 match style)
  - Enforces Phase 0 audit gap + memory `ironteam_run_14_phase0_foundation.md` Phase 1 backlog item

### 5. Write Tests

- **Task ID**: write-tests
- **Depends On**: d1-2-factory-refactor, d1-3-shared-extensions, d1-4-fix-test-imports
- **Assigned To**: test-writer
- **Parallel**: false
- **Files**:
  - `src/frontend/src/lib/admin/wizard-template/__tests__/createClusterWizard.test.ts`
  - `src/services/shared/src/__tests__/timeline.test.ts` (NEW — type-level assertions via `expectTypeOf`)
  - `src/services/shared/src/__tests__/yes-no.test.ts` (NEW)
- **Actions**:
  - Factory: test with `employeeId + preloadedEmployee` (AC-1: envelope shape on submit, preloaded fields present in initial store state, readOnlyFields selector correct)
  - Factory: test without params — Hire-style (AC-1: flat payload on submit, backwards compatibility)
  - `YES_NO`: shape + labels th/en
  - `TimelineEvent`: `expectTypeOf` assertions for each variant + discriminator narrowing
  - Every test body starts with a comment `// AC-<N>: <criterion text>` (traceability — C8)

### 6. Code Review

- **Task ID**: code-review
- **Depends On**: write-tests
- **Assigned To**: code-reviewer
- **Parallel**: false
- **Actions**:
  - Review all files modified in D1.1–D1.4 for quality, security, 30-sec readability
  - Check C1 surgical: every changed line traceable to a D1 task (no drive-by refactors)
  - Check C3 simplicity: factory additions are minimal; no speculative flexibility
  - Check C6 no silent catch; no hardcoded paths (use rule 54/55 where relevant)
  - Check C8 source-grounding: every field in `TimelineEvent` variants must map to a Plan §4 event type — reject invented properties
  - Fix inline if minor; post blocker comment if significant; coordinate with original builder if scope unclear
  - Approve = zero blocker comments

### 7. Validate Final Output

- **Task ID**: validate-all
- **Depends On**: code-review
- **Assigned To**: validator
- **Parallel**: false
- **Actions**:
  - Run all commands from Validation Commands section; capture actual terminal output (C2)
  - Verify each AC-1 through AC-5 individually with evidence
  - For AC-3 MARITAL picklist render: browser-harness screenshot of `/admin/hire` at StepBiographical (rule 30 primary, real Chrome via CDP) + zoom-verify pixel level (rule 62)
  - If any AC fails → return to responsible builder (max 2 retries) → re-run code review → re-validate
  - On pass → proceed to D1.5 commit

### 8. Commit + Pipeline State Update (JARVIS — not delegated)

- **Task ID**: d1-5-commit
- **Depends On**: validate-all
- **Assigned To**: jarvis
- **Parallel**: false
- **Files**:
  - `pipeline-state.json`
  - `test-report.md`
  - all D1.1–D1.4 changed paths (explicit, not `git add -A`)
- **Actions**:
  - Update `pipeline-state.json`: set `phase: 2`, append `d1-1-delete-orphans`, `d1-2-factory-refactor`, `d1-3-shared-extensions`, `d1-4-fix-test-imports` to `completed_phases`
  - Stage explicit paths only (sensitive files guard)
  - Single commit on `master`:
    ```
    feat(phase-1): D1 foundation — factory employeeId + shared TimelineEvent + delete orphans
    ```
  - Do NOT push — hand off to Ken for push decision

## Pipeline

```
Build batch 1 (parallel):
  D1.1 delete-orphans  ──┐
  D1.4 fix-test-imports ─┤
                         │
Build batch 2 (parallel, after batch 1):
  D1.2 factory-refactor  ──┐
  D1.3 shared-extensions ──┤
                           │
                           ▼
                      Write Tests (MK VI)
                           │
                           ▼
                      Code Review (MK II)
                           │
                           ▼
                      Validate Final (MK IV)
                           │
                   PASS?  ─┴─  FAIL?
                    │           │
                    ▼           ▼
               D1.5 commit   fix → re-review → re-validate
                             (max 2 retries → escalate to Ken)
```

If validator fails → responsible Builder fixes → re-run Code Review → Validate Final.
After 2 failed retries → JARVIS escalates to Ken with full context.

## Acceptance Criteria

- **AC-1**: `createClusterWizard` accepts `employeeId?: string` and `preloadedEmployee?: Partial<Employee>`; factory tests cover both "with context" and "without context" modes; existing Hire wizard renders identically (backwards compatibility) — testable via `npm test src/lib/admin/wizard-template`
- **AC-2**: Zero orphan lifecycle dirs under `admin/`; `find src/frontend/src/app/[locale]/admin -type d \( -name probation -o -name rehire -o -name terminate -o -name transfer \)` returns no results
- **AC-3**: `@hrms/shared` exports `TimelineEvent` and `YES_NO` (verified via `import { TimelineEvent, YES_NO } from '@hrms/shared'` compiling); `StepBiographical` renders the MARITAL picklist (browser-harness screenshot + pixel-zoom verification per rules 30 + 62)
- **AC-4**: `cd src/frontend && npm test 2>&1 | grep -E "Cannot find|Module not found"` returns empty output; any remaining test failures are pre-existing logic failures (documented in `test-report.md` with before/after delta)
- **AC-5**: Single commit on `master` with conventional message `feat(phase-1): D1 foundation — factory employeeId + shared TimelineEvent + delete orphans`; `pipeline-state.json` shows `phase: 2` with D1.1–D1.4 task IDs in `completed_phases`

## Validation Commands

Run from repo root unless stated otherwise. Each command's expected output documented inline.

```bash
# AC-2: orphan route deletion
cd /Users/tachongrak/Projects/hr
find src/frontend/src/app/\[locale\]/admin -type d \( -name probation -o -name rehire -o -name terminate -o -name transfer \)
# Expected: empty output

# AC-4: import resolution clean
cd /Users/tachongrak/Projects/hr/src/frontend
npm test 2>&1 | tee /tmp/d1-test.log
grep -E "Cannot find|Module not found" /tmp/d1-test.log
# Expected: empty output (zero matches)

# AC-1: factory tests pass (both context modes)
cd /Users/tachongrak/Projects/hr/src/frontend
npm test -- src/lib/admin/wizard-template
# Expected: all tests green, including 2+ new tests for employeeId/preloadedEmployee modes

# AC-3: shared exports compile
cd /Users/tachongrak/Projects/hr
npx tsc --noEmit -p src/services/shared/tsconfig.json
# Expected: zero TypeScript errors

# AC-3: MARITAL picklist visual verification
# Using browser-harness (rule 30 primary):
#   browser-harness <<'PY'
#   new_tab("http://localhost:3000/th/admin/hire")
#   wait_for_load()
#   # navigate to StepBiographical, screenshot MARITAL dropdown
#   PY
# Expected: dropdown renders with Phase 0 F2 picklist values (th + en)

# AC-5: commit + pipeline state
cd /Users/tachongrak/Projects/hr
git log -1 --format=%s
# Expected: "feat(phase-1): D1 foundation — factory employeeId + shared TimelineEvent + delete orphans"
cat pipeline-state.json | jq '.phase, .completed_phases[-4:]'
# Expected: 2 and the 4 D1 task IDs
```

## Out of Scope

Explicitly NOT in D1 (prevents scope creep — these ship in D2+ per Plan §8):

- Creating new `/employees/[id]/<action>` route files (D2 responsibility — each action gets its own wizard)
- Implementing new Archetype B wizards (Probation/Transfer/Terminate/Rehire flows) — D2+
- Migrating existing orphan-route form logic into new locations (orphan routes confirmed unused in Phase 0 audit — nothing to migrate)
- Fixing pre-existing test logic failures (scope: import errors only; logic failures documented, not fixed)
- Timeline UI component (consumes `TimelineEvent` type but lives in D3 per Plan §8)
- `YES_NO` picklist field wiring into any specific step (types + picklist only; field-level wiring per-step is D2+)
- Backend endpoints for `{ employee_id, action, payload }` envelope — factory emits the shape, backend catches up in separate sprint
- Any change to Phase 0 F1–F5 deliverables (frozen contract)
