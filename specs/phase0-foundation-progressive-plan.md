# Plan: Phase 0 Foundation — Progressive Plan

> **Tracking issue**: [aeiouboy/hr#14](https://github.com/aeiouboy/hr/issues/14)
> **Created**: 2026-04-23
> **Runs before**: Phase 1 (EC-Core Batch 1 UI drop — due Apr 27)

## Prior Knowledge

### Related Memory Documents
- `project_hr_hire_wizard_option1_2026-04-23.md` — current Hire Option-1 (3-cluster + persist + Humi skin) = source for F4 template extraction
- `project_hr_ui_delivery_timeline_2026-04-23.md` — RIS-locked 4-batch timeline; this Phase 0 must finish before Apr 27 UI drop
- `feedback_wizard_structure_before_skin.md` — collapse multi-step BEFORE skinning (already applied to Hire)
- `feedback_css_child_vs_descendant_trap.md` — CSS override pattern used in `.humi-step-section` re-skin
- `ironteam_run_1981_ec_admin_portal_phase1.md` — EC Admin Portal Phase 1 setup patterns (mocks, stores)
- `ironteam_run_3_hr_continue_functional.md` — Zustand stores + shell integration patterns

### Related Files (source of truth)
- `projects/hr-platform-replacement/BRD-EC-summary.md` (3,883 lines, 207 requirements + 28 reports, 11 flows)
- `projects/hr-platform-replacement/ec-admin-portal/ADMIN-WORKFLOW-MASTER.md` (629 lines, 46+ flows)
- `projects/hr-platform-replacement/docs/entity-schemas/` (69 SF entities across employment_information, foundation, payment_information, personal_information, position)
- `projects/hr-platform-replacement/HR-UI-PROGRESSIVE-PLAN.md` — the 4-phase master plan this Phase 0 bootstraps
- `src/frontend/src/lib/admin/store/useHireWizard.ts` (currently ~13 fields across 8 slices) — reference implementation
- `src/frontend/src/lib/admin/validation/hireSchema.ts` (currently 8 fields, presence-only) — reference schema
- `src/frontend/src/data/admin/FOCompany.json` (164 companies), `FOEventReason.json` (53 event reasons), `FOBusinessUnit.json` — existing picklist JSONs

### Past ironteam runs on same topic
- #11 HR desktop UAT hotfix — regression test patterns for UI bugs
- #5 HR mobile responsive — drawer + nav patterns

---

## Task Description

Phase 0 of the Progressive Delivery Plan: produce the reusable substrate (5 deliverables F1–F5) so Phases 1–4 scale to 13 flows without rewriting field types, validation logic, picklist wiring, or wizard scaffolding. Current state: Hire wizard has ~13/50 fields and presence-only validation — insufficient for RIS-locked Apr 27 UI drop with "attribute + validation ต้องครบตาม SAP".

**Scope clarification (2026-04-23 Ken alignment)**: Backend (15 NestJS microservices in `src/services/*`) is scaffold-only — NestJS modules + Prisma schema skeletons exist, no business logic yet. Phase 0 must deliver **shared contract artifacts** in `@hrms/shared` workspace (already configured at `src/services/shared/`) so when backend gets built later, it imports the same field definitions, picklist values, and validators without rework. Frontend is the only consumer today; backend is a planned consumer that the contract must be shaped for.

## Objective

Ship 5 foundation artifacts that (a) mirror SAP SuccessFactors EC field-by-field, (b) adjust to BRD EC v1.0 (207 fields), (c) enable any flow (Hire/Rehire/Transfer/Terminate/Probation/Emp-Data/etc.) to be scaffolded with full field coverage + validation in <1 day by composing existing primitives, **(d) shaped as a workspace-shared contract so future NestJS services consume the same types + picklists + validators with zero rework**.

**Measurable outcome**:
- Field Catalog in `@hrms/shared` has ≥ 80% of BRD 207 rows typed (≥165 entries)
- ≥ 10 picklists in `@hrms/shared` with generated TS enums (consumable by frontend + future backend)
- 7 framework-agnostic validators in `@hrms/shared` with 100% unit test coverage (no NestJS/Next deps)
- Prisma schema snippets emitted per entity (ready to merge into `employee-center/prisma/schema.prisma` later)
- DTO class-validator skeletons emitted (ready to place in `employee-center/src/employee/dto/` later)
- 1 new frontend flow (Probation) scaffolded from cluster template as proof
- `PRE-DROP-AUDIT-phase0.md` auto-generated showing coverage FE + future BE readiness

## Tech Stack

- **Language**: TypeScript 5.x
- **Framework**: Next.js 16 App Router + React 19
- **Runtime**: Node 20 + npm
- **State**: Zustand 5 with `persist` middleware (localStorage)
- **Validation**: Zod v3
- **Testing**: Vitest + @testing-library/react + jsdom (existing setup)
- **Design system**: Humi tokens (cream/teal/navy, NO-RED) — CSS classes + Tailwind v4 utilities
- **Build tooling**: TS compiler + custom Node script (scripts/audit-field-coverage.ts)

## Technical Design

### Architecture

Shared contract layer in `@hrms/shared` (workspace lib) — consumed by frontend today, backend tomorrow:

```
┌───────────────────────────────────────────────────────────────┐
│  SHARED WORKSPACE (@hrms/shared) — FE + BE consume            │
│  src/services/shared/src/                                     │
│  ├── field-catalog/                                           │
│  │  ├── types.ts           (FieldDef type)                    │
│  │  ├── ec-core.ts         (~165 entries, flowsUsedIn tagged) │  F1
│  │  └── index.ts           (getFieldsByFlow, bySection)       │
│  ├── picklists/                                               │
│  │  ├── data/*.json        (10+ picklist JSONs)               │
│  │  ├── generate.ts        (JSON→TS enum emitter)             │  F2
│  │  └── index.ts           (GENERATED — PICKLIST_* exports)   │
│  ├── validation/                                              │
│  │  ├── toolkit.ts         (7 validators, zero framework deps)│  F3
│  │  └── toolkit.test.ts    (32+ unit tests)                   │
│  └── index.ts              (re-export all)                    │
├───────────────────────────────────────────────────────────────┤
│  BACKEND EMIT TARGETS (scripts generate; future backend uses) │
│  src/services/shared/generated/                               │
│  ├── prisma-snippets/*.prisma   (field lists per model)       │
│  └── dto-skeletons/*.dto.ts     (class-validator DTOs)        │
├───────────────────────────────────────────────────────────────┤
│  FRONTEND-ONLY CONSUMER LAYER                                 │
│  src/frontend/src/lib/admin/wizard-template/                  │  F4
│  ├── createClusterWizard.ts  (Zustand factory, UI-specific)   │
│  └── README.md                                                │
│  src/frontend/src/app/[locale]/admin/probation/               │
│  └── (probation flow scaffolded from template — proof)        │
├───────────────────────────────────────────────────────────────┤
│  AUDIT TOOLING                                                │
│  scripts/audit-field-coverage.ts                              │  F5
│  └── outputs: test-artifacts/phase0-foundation/               │
│              PRE-DROP-AUDIT-phase0.md                         │
└───────────────────────────────────────────────────────────────┘

Import paths:
  Frontend:  import { getFieldsByFlow, thaiNationalId, PICKLIST_EMPLOYEE_CLASS } from '@hrms/shared'
  Backend:   import { FieldDef, thaiNationalId, PICKLIST_EMPLOYEE_CLASS } from '@hrms/shared'
             // + copy generated/prisma-snippets/*.prisma into employee-center/prisma/schema.prisma
             // + copy generated/dto-skeletons/*.dto.ts into employee-center/src/employee/dto/

Downstream consumers (Phase 1 onward):
  field-catalog → frontend Zustand slices + Zod schemas; backend Prisma models + DTOs
  picklists → frontend dropdown <option>; backend DB seed + API enum validation
  validation toolkit → frontend Zod .refine(); backend class-validator @Validate()
  cluster template → Probation/EmpData/Rehire/Transfer/Terminate wizard scaffolds (FE only)
  audit script → PRE-DROP-AUDIT-phase1..4.md per RIS drop gate
```

### Key Design Decisions

1. **Catalog as TS module, not JSON**: TypeScript gives compile-time enum binding + IDE autocomplete. JSON would require parse-time validation.
2. **Picklist generator script, not hand-maintained enums**: SF picklists change; regenerating from JSON = zero drift between source + code.
3. **Validation toolkit functions are Zod-compatible refinements, not standalone validators**: so schemas can chain `.refine(toolkit.thaiNationalId)` fluently.
4. **Cluster template = factory function, not class or HOC**: simpler composition, easier tests, matches existing Hire Option-1 code style.
5. **Audit script = Node TS, not separate language**: reuses existing TS types for BRD ↔ catalog diffing.
6. **F1 = single EC-Core catalog for Phase 0; EC-FO + Benefit deferred to later phases**: scope Phase 0 to the batches shipping in Phase 1 (EC-Core flows).

## Relevant Files

### New files (Phase 0 deliverables)

- `src/frontend/src/lib/admin/field-catalog/types.ts` — `FieldDef` interface (id, brdRow, sfEntity, sfField, labelTh/En, type, required, readOnly, maxLength, regex, picklistId, defaultValue, visibleWhen, mandatoryWhen, section, flowsUsedIn)
- `src/frontend/src/lib/admin/field-catalog/ec-core.ts` — ~165 entries lifted from BRD-EC rows for Hire + Rehire + Transfer + Terminate + Contract Renewal + Probation + Employee Data
- `src/frontend/src/lib/admin/field-catalog/index.ts` — export + `getFieldsByFlow(flow)`, `getFieldsBySection(section)` helpers
- `src/frontend/src/data/admin/picklists/` — 10+ JSON files (EmployeeClass.json, MaritalStatus.json, Nationality.json, Religion.json, BloodType.json, Gender.json, EventReasonHire.json, EventReasonTerm.json, EventReasonTrans.json, Currency.json)
- `src/frontend/src/lib/admin/picklists/generate.ts` — Node script: read JSONs → emit TS enum file
- `src/frontend/src/lib/admin/picklists/index.ts` — **generated** — exports `PICKLIST_EMPLOYEE_CLASS`, etc.
- `src/frontend/src/lib/admin/validation/toolkit.ts` — 7 validators: `thaiNationalId`, `thaiPhone`, `email`, `dobBeforeHire`, `salaryCurrencyPair`, `contractEndDateRequired`, `nameNoDigits`
- `src/frontend/src/lib/admin/validation/toolkit.test.ts` — 32+ test cases (checksum valid/invalid/non-13-digit/foreigner; phone ^(\+66|0)\d{8,9}$; email RFC 5322-lite; etc.)
- `src/frontend/src/lib/admin/wizard-template/createClusterWizard.ts` — factory returning `{ Store, Shell, useWizard }` from config
- `src/frontend/src/lib/admin/wizard-template/README.md` — usage guide
- `src/frontend/src/app/[locale]/admin/probation/` — probation flow scaffolded from template (page.tsx + clusters/ + store)
- `src/frontend/scripts/audit-field-coverage.ts` — script: read BRD rows + catalog → emit coverage report
- `src/frontend/test-artifacts/phase0-foundation/PRE-DROP-AUDIT-phase0.md` — coverage output artifact

### Existing files to read (reference, DO NOT modify in Phase 0)

- `src/frontend/src/lib/admin/store/useHireWizard.ts` — template source for cluster factory
- `src/frontend/src/components/admin/wizard/{WizardShell,Stepper,WizardFooter}.tsx` — shell components reused
- `src/frontend/src/app/[locale]/admin/hire/clusters/{ClusterWho,ClusterJob,ClusterReview}.tsx` — composition reference
- `projects/hr-platform-replacement/BRD-EC-summary.md` — BRD source of truth for field lifting
- `projects/hr-platform-replacement/docs/entity-schemas/**/*.md` — SF field definitions for cross-ref

## Team Orchestration

JARVIS orchestrates — never touches code directly (except Phase 2.5 dry-run fixes + Phase 3b test runs). Each deliverable assigned to one Mark.

### Team Members

- **Field Catalog Builder** (F1)
  - Name: field-catalog-builder
  - Agent: MK V — Researcher (because this is BRD-reading + synthesis, not pure coding)
  - Role: Read BRD-EC + SF entity schemas → emit `field-catalog/types.ts` + `ec-core.ts` + `index.ts`. Target ≥165 entries covering EC-Core flows.

- **Picklist Builder** (F2)
  - Name: picklist-builder
  - Agent: MK III — Builder
  - Role: Lift picklists from SF extract + BRD + existing JSON → emit 10+ JSON + generator script + generated enum file. Wire 3 into Hire wizard as proof.

- **Validation Toolkit Builder** (F3)
  - Name: validation-toolkit-builder
  - Agent: MK VI — Test Writer (test-first, then impl)
  - Role: Write `toolkit.test.ts` with 32+ test cases first, then `toolkit.ts` implementations. Thai National ID checksum algorithm documented in BRD Appendix 5.

- **Cluster Template Builder** (F4)
  - Name: cluster-template-builder
  - Agent: MK III — Builder
  - Role: Extract Hire Option-1 pattern into `wizard-template/createClusterWizard.ts` factory + README. Scaffold Probation flow as proof-of-reusability.

- **Audit Script Builder** (F5)
  - Name: audit-script-builder
  - Agent: MK III — Builder
  - Role: Write `scripts/audit-field-coverage.ts` + generate initial `PRE-DROP-AUDIT-phase0.md`.

- **Validator**
  - Name: validator
  - Agent: MK IV — Validator
  - Role: Run all Phase 0 tests, verify 6 acceptance criteria, capture evidence + screenshots (toolkit test output, audit report rendering, probation scaffold page).

## Step by Step Tasks

### 1. Build Field Catalog
- **Task ID**: build-field-catalog
- **Depends On**: none
- **Assigned To**: field-catalog-builder (MK V)
- **Parallel**: true
- **Files**: `src/frontend/src/lib/admin/field-catalog/types.ts`, `ec-core.ts`, `index.ts` (3 files)
- **Actions**:
  - Define `FieldDef` interface
  - Read BRD-EC §flow-09 (Hire Lifecycle, 9 reqs) + §flow-06 (Personal Info, 23 reqs) + §flow-08 (Employment Info, 24 reqs) + §flow-10 (Compensation, 3 reqs)
  - Cross-reference SF entity schemas in `docs/entity-schemas/`
  - Emit ≥165 field entries with flowsUsedIn tags
  - Export `getFieldsByFlow('hire' | 'rehire' | 'transfer' | 'terminate' | 'probation' | 'empData' | 'contractRenewal')` + `getFieldsBySection(section)` helpers

### 2. Build Picklist Pipeline
- **Task ID**: build-picklist-pipeline
- **Depends On**: none
- **Assigned To**: picklist-builder (MK III)
- **Parallel**: true
- **Files**: `src/frontend/src/data/admin/picklists/*.json` (10+), `src/frontend/src/lib/admin/picklists/generate.ts`, `src/frontend/src/lib/admin/picklists/index.ts` (generated), plus wiring in 3 Hire dropdowns
- **Actions**:
  - Lift picklists from `sf-extract/ec-core/` + BRD appendix → create 10 JSON files
  - Write generator script that reads all picklist JSONs + emits a single `index.ts` with type-safe exports
  - Wire `PICKLIST_EMPLOYEE_CLASS`, `PICKLIST_MARITAL_STATUS`, `PICKLIST_NATIONALITY` into Hire wizard step components

### 3. Build Validation Toolkit (test-first)
- **Task ID**: build-validation-toolkit
- **Depends On**: none (F1 types nice-to-have but not blocking)
- **Assigned To**: validation-toolkit-builder (MK VI)
- **Parallel**: true
- **Files**: `src/frontend/src/lib/admin/validation/toolkit.ts`, `toolkit.test.ts` (2 files, 32+ test cases)
- **Actions**:
  - Write tests first (32+ cases) for 7 validators
  - Implement validators:
    - `thaiNationalId(value)` — BRD Appendix 5 algorithm: 13 digits, last digit = mod-11 checksum of first 12 × descending weights
    - `thaiPhone(value)` — regex `^(\+66|0)[0-9]{8,9}$`
    - `email(value)` — RFC 5322-lite regex
    - `dobBeforeHire(dob, hireDate, minAge=15)` — cross-field
    - `salaryCurrencyPair(amount, ccy)` — amount > 0 + ccy in Currency enum
    - `contractEndDateRequired(employeeClass, endDate)` — if class='CONTRACT' then endDate required
    - `nameNoDigits(value)` — regex `^[^\d]+$`
  - All return `{ ok: boolean; message?: string }` for Zod `.refine` compatibility

### 4. Build Cluster Template + Probation scaffold
- **Task ID**: build-cluster-template
- **Depends On**: F1 (field catalog), F2 (picklists), F3 (toolkit)
- **Assigned To**: cluster-template-builder (MK III)
- **Parallel**: false (depends on F1+F2+F3)
- **Files**: `src/frontend/src/lib/admin/wizard-template/createClusterWizard.ts`, `README.md`, `src/frontend/src/app/[locale]/admin/probation/page.tsx` + `clusters/ClusterProbation.tsx` + store (4 files total)
- **Actions**:
  - Extract Hire Option-1 wizard shape (Zustand persist store + ClusterWho/Job/Review pattern + WizardShell)
  - Factory signature: `createClusterWizard({ name, storeKey, clusters, steps, validators })`
  - Scaffold Probation flow via factory → proves reusability
  - README covers: how to scaffold a new flow in 30 minutes, field-catalog binding, picklist wiring, validation composition

### 5. Build Audit Script
- **Task ID**: build-audit-script
- **Depends On**: F1 (field catalog must exist for BRD ↔ catalog diff)
- **Assigned To**: audit-script-builder (MK III)
- **Parallel**: false (depends on F1)
- **Files**: `src/frontend/scripts/audit-field-coverage.ts`, `src/frontend/test-artifacts/phase0-foundation/PRE-DROP-AUDIT-phase0.md` (2 files)
- **Actions**:
  - Parse BRD-EC-summary.md rows (regex extraction)
  - Cross-ref with field-catalog/ec-core.ts entries (by brdRow field)
  - Output Markdown table per flow: BRD rows covered / BRD rows total / missing field list
  - Usage: `npm run audit:fields -- --phase 0` (add script to package.json)

### 6. Wire 3 picklists + fix existing Hire wizard dropdowns
- **Task ID**: wire-picklists-to-hire
- **Depends On**: F2 (picklists generated)
- **Assigned To**: picklist-builder (MK III) — same agent continues
- **Parallel**: false
- **Files**: `src/frontend/src/app/[locale]/admin/hire/steps/StepEmployeeInfo.tsx` (use PICKLIST_EMPLOYEE_CLASS), `StepBiographical.tsx` (use PICKLIST_MARITAL_STATUS — add marital field to store first), `StepIdentity.tsx` (Nationality if visible)
- **Actions**:
  - Replace hard-coded dropdown options with picklist enum rendering
  - Verify no regression: `npm run build` + Vitest

## Pipeline

```
Phase 0  → create issue #14 (done)
Phase 0.5 → context gather (done — KM 404, memory grep found 8 relevant)
Phase 1  → spec written by JARVIS directly (this file)
Phase 1.5 → validate_ironteam_spec.py (next step)
Phase 2  → dispatch 4 builders parallel (F1 + F2 + F3 + audit later);
           F4 sequential (after F1+F2+F3)
Phase 2.5 → dry-run validate (npm run build + tsc)
Phase 3a → MK VI writes toolkit tests (part of F3 already)
Phase 3b → JARVIS runs tests via Bash
Phase 4  → Code Review (MK IV dual-role)
Phase 5  → Validate Final (MK IV runs probation scaffold in browser)
Phase 5b → close issue #14
Phase 6b → learn + update expertise.yaml
```

## Acceptance Criteria

- **AC-1**: `src/frontend/src/lib/admin/field-catalog/ec-core.ts` has ≥ 165 `FieldDef` entries (80% of 207). Each entry has non-null `id`, `type`, `labelTh`, `labelEn`, `section`, `flowsUsedIn`.
- **AC-2**: `src/frontend/src/lib/admin/picklists/index.ts` exports ≥ 10 TS enums generated from JSON. 3 of them are wired into Hire wizard dropdowns replacing hard-coded options.
- **AC-3**: `src/frontend/src/lib/admin/validation/toolkit.ts` exports 7 validators. `toolkit.test.ts` has ≥ 32 test cases, 100% pass, line coverage ≥ 95% for toolkit.ts.
- **AC-4**: `src/frontend/src/lib/admin/wizard-template/createClusterWizard.ts` factory exists + README. `/th/admin/probation` route renders a working 3-step cluster wizard with persist middleware wired.
- **AC-5**: `npm run audit:fields -- --phase 0` generates `test-artifacts/phase0-foundation/PRE-DROP-AUDIT-phase0.md` with per-flow coverage table. Report shows ≥ 80% overall coverage.
- **AC-6**: All existing 485 tests still pass. New toolkit tests pass. `tsc --noEmit` clean. `npm run build` succeeds.

## Validation Commands

```bash
# Dry-run (Phase 2.5)
cd src/frontend && npm run build 2>&1 | tail -10
cd src/frontend && npx tsc --noEmit 2>&1 | tail -10

# Tests (Phase 3b)
cd src/frontend && npx vitest run 2>&1 | tail -30
cd src/frontend && npx vitest run src/lib/admin/validation/toolkit.test.ts --coverage 2>&1 | tail -20

# Audit (AC-5)
cd src/frontend && npm run audit:fields -- --phase 0

# Probation scaffold smoke (AC-4)
cd src/frontend && npm run dev &
sleep 5
curl -s http://localhost:3000/th/admin/probation -o /tmp/probation.html
grep -q 'ทดลองงาน' /tmp/probation.html && echo "probation scaffold renders"

# Code Review checklist
# - C1 surgical: no touch to existing Hire wizard files except picklist wiring
# - C3 simplicity: no abstractions beyond what is stated
# - C7 single source of truth: field catalog is THE source; picklist JSON is THE source
# - C8 source-grounding: every field has BRD row reference
# - C10 Thai-primary: labelTh required, labelEn optional
```

## Code Review Notes

All agents must follow:
- **C1 Surgical**: Phase 0 is foundation — do NOT refactor existing Hire wizard beyond picklist wiring (Task 6).
- **C3 Simplicity**: Factory in F4 should be <200 lines; resist builder pattern + fluent API + plugins.
- **C6 No silent catch**: every try/catch must log or throw — especially in picklist generator script.
- **C7 Single source of truth**: field-catalog/ec-core.ts IS the catalog. Do not duplicate field defs in stores/schemas.
- **C8 Source-grounding**: every FieldDef entry must have `brdRow` or `sfEntity/sfField` reference — no invented fields.
- **C10 Thai-primary**: labelTh mandatory; labelEn optional for technical fields.
- **Humi tokens**: probation scaffold must use existing `.humi-step-section`, `.humi-card`, `.humi-eyebrow`, `.humi-section-title` classes from `globals.css`.

## Frontend Skill Requirements (MANDATORY)

Every frontend-facing agent (F4 cluster template + Probation scaffold, future Phase 1+ flow builders) MUST read these Vercel Agent-Skills before writing/refactoring code:

| Skill | Path | Rules | When to apply |
|-------|------|-------|---------------|
| **react-best-practices** | `src/frontend/.skills/react-best-practices/SKILL.md` + `rules/` | 70 across 8 categories | Every React component / Next.js page / data fetching / bundle concern. Priority 1-2 (waterfalls + bundle size) = CRITICAL |
| **web-design-guidelines** | `src/frontend/.skills/web-design-guidelines/SKILL.md` | 100+ via WebFetch to upstream | Every UI audit, accessibility check, form pattern, animation, focus-visible |
| **composition-patterns** | `src/frontend/.skills/composition-patterns/SKILL.md` + `rules/` | React 19 API + compound components | Every component API design, refactor of boolean-prop-heavy components |

**Specific Phase 0 implications**:
- **F4 cluster template factory**: MUST follow `composition-patterns` (compound components > boolean props). `createClusterWizard({ clusters, steps, validators })` config object = right pattern; avoid `createClusterWizard(hasPersist, hasAutoSave, stepCount, …)` boolean hell.
- **F4 Probation wizard**: MUST pass `react-best-practices` priority 1-2 (no data-fetching waterfalls, no barrel imports, `next/dynamic` for heavy sections).
- **Validation toolkit tests**: no UI impact — skill not required for F3 specifically.
- **Field catalog + picklists**: shared lib, no React — skill not required for F1/F2.

**How JARVIS injects into agent prompts**: agent footer (Phase 0.5 onward) includes:
```
## Required reading
Before writing any frontend code, read:
1. src/frontend/.skills/react-best-practices/SKILL.md + any relevant rules/ file
2. src/frontend/.skills/composition-patterns/SKILL.md
Apply rules in order of priority (CRITICAL → HIGH → MEDIUM). Cite rule IDs in PR/commit comments when following non-obvious rules.
```

## Validate Final

MK IV in Phase 5 runs:

1. Full test suite: `npx vitest run` — must pass all, including 32+ new toolkit tests
2. Build: `npm run build` — no errors
3. TypeScript: `tsc --noEmit` — zero errors
4. Audit script: `npm run audit:fields -- --phase 0` — coverage ≥ 80%
5. Browser-harness visit `/th/admin/probation` — wizard renders 3 clusters, persist works on reload
6. Commit all Phase 0 files + `PRE-DROP-AUDIT-phase0.md` screenshot/table
7. Post `## 🧪 Phase 3 — Test Evidence` + `## 📸 Phase 5 — AC Verification` comments to #14

Verdict: PASS if all 6 ACs met, FAIL otherwise (trigger Phase 6 retry).
