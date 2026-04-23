# Plan: HR Phase 1 Build — Hiring + Probation + Employee Data Journey

> **GitHub Issue**: aeiouboy/hr#17
> **Precursor**: `specs/hr-phase-1-d1-foundation.md` (COMPLETE, commit `e73be2f` — `createClusterWizard` factory + `@hrms/shared` TimelineEvent + picklists F1-F5)
> **Mental Model**: `projects/hr-platform-replacement/HR-UI-PROGRESSIVE-PLAN.md` §0 (4 archetypes) + §1 (URL architecture)
> **Ken's DoD (verbatim 2026-04-23 evening, LOAD-BEARING)**: "Sprint velocity ต้องดีกว่านี้. พยายามอัปโหลดงาน Ken ให้หมด — Hiring, Probation และ Employee Data ต้องเสร็จภายในวันนี้. Definition of Done คือต้องร้อย Journey ให้เห็นแด่งหน้า UI ห้ามสร้างหน้าลอยๆ. Field Validation ต่างๆ ต้องตรง BRD และข้อมูลที่ BA ให้มา. ใช้ Tesla KM ช่วย + ไดอะแกรมที่เราเคยทำ"

## Task Description

Ship the first production journey in the HR platform: **Admin can see 1,000 employees → click one → view detail hub → run Probation assessment OR edit Personal Info → see timeline update**. Every route wires through `/admin` sidebar navigation — no orphan pages. Every field validates against the BA Source of Truth sheet (`projects/hr-platform-replacement/ba-source/BA-EC-SUMMARY.md`) and BRD #109 / #117 / #12.

Phase 1 expands current 13-field Hire wizard to full **37 BA fields** across 3 clusters, and makes the D1 factory `createClusterWizard` prove itself by powering the first real contextual (Archetype B) actions: Probation (`/admin/employees/[id]/probation`) and Edit (`/admin/employees/[id]/edit`).

## Objective

By end of day 2026-04-23:
1. **Hire** wizard covers all 37 BA Employee-file fields with picklist + cross-field validation traced to BRD.
2. **Employees List** page renders 1,000 mock employees with virtualized scroll + search, navigable from Admin Sidebar.
3. **Employee Detail** hub shows Snapshot + Timeline + 5-action menu per Plan v2 §1.
4. **Probation** action (Archetype B, first factory consumer) records Pass/NoPass/Extend per BRD #117.
5. **Employee Data Edit** (Archetype B, second factory consumer) allows editing 23 Personal Info fields per BRD #12.
6. **E2E journey** (browser-harness): List → Detail → Probation → submit → Detail.timeline updated — screenshots captured at 4 stages.

## Tech Stack

- **Language**: TypeScript (strict)
- **Framework**: Next.js 15 App Router (existing `src/frontend/`) + React 19
- **Styling**: Tailwind v4 + Humi re-skin via `.humi-step-section` CSS overrides (existing pattern)
- **State**: Zustand with `persist` middleware (existing `useHireWizard` pattern for wizards; in-memory store for employees fixture)
- **Validation**: Zod schemas + `@hrms/shared/validation` toolkit (F3 — 7 validators + DOB cross-field)
- **Virtualization**: `@tanstack/react-virtual` (Cashflow project reference pattern)
- **Picklists**: `@hrms/shared/picklists/*` (extend D1.3 pattern — PICKLIST_YES_NO + PICKLIST_MARITAL_STATUS already shipped)
- **Runtime**: Node 22 / pnpm (repo root uses pnpm workspaces)
- **Testing**: vitest + @testing-library/react + jsdom (unit); browser-harness (E2E via real Chrome + CDP, per GUIDE rule 30 — primary)
- **No backend**: All employee data is in-memory fixture at `src/frontend/src/mocks/employees.ts` (Phase 2 adds API)

## Technical Design

### Architecture

```
Admin Sidebar
  └─ "พนักงาน / Employees" ─→ /admin/employees (S2: List)
         ↓ row click
      /admin/employees/[id] (S3: Detail hub)
         ├─ Snapshot card (name, empID, class, hireDate, position, status)
         ├─ Timeline (TimelineEvent[] — hire + runtime-appended)
         └─ Action Menu (5 cards)
              ├─ Probation → /admin/employees/[id]/probation (S4: factory consumer #1)
              ├─ Edit      → /admin/employees/[id]/edit      (S5: factory consumer #2)
              ├─ Transfer  → /admin/employees/[id]/transfer  (Phase 2 placeholder page)
              ├─ Terminate → /admin/employees/[id]/terminate (Phase 2 placeholder page)
              └─ Rehire    → /admin/employees/[id]/rehire    (Phase 2 placeholder page)

Admin Sidebar (separate from Detail)
  └─ "Hire New Employee" ─→ /admin/hire (S1: Archetype A — standalone new-record wizard)
```

Data flow for B-actions:
```
Detail page → Link to /admin/employees/[id]/<action>
          → <action>/page.tsx reads [id] from route param
          → loads employee from fixture (buildEmployeeLookup())
          → mounts createClusterWizard({ employeeId, preloadedEmployee, readOnlyKeys: ['employee_id'] })
          → on submit: append TimelineEvent to in-memory store + navigate back to Detail with ?banner=...
```

### Key Design Decisions

1. **Journey-first, not page-first** (Ken DoD): Every page built in Phase 1 is REACHABLE from another page built in Phase 1 — no orphan routes. S3 action menu cards for Transfer/Terminate/Rehire link to placeholder pages (single H1 + "Phase 2 — Coming soon" card), NOT 404 / dead links.
2. **Factory proves itself in production** (D1 acceptance gate): Probation (S4) is the first real-world B-action using `createClusterWizard`. If factory API is wrong, S4 reveals it here — cheaper than waiting for Transfer/Terminate.
3. **Fixture is single-source-of-truth for 5 pages**: S2 (list), S3 (detail), S4 (probation preload), S5 (edit preload), and the E2E test all consume `src/frontend/src/mocks/employees.ts`. Any field drift breaks type check immediately.
4. **Timeline is in-memory-mutable but fixture-seeded**: Each fixture employee seeded with exactly 1 `HireEvent`. Probation/Edit append to `window.__empTimelines` (or zustand store without persist — survives route nav, resets on reload). No backend yet.
5. **C8 source-grounding**: Every field in Hire (S1) and Edit (S5) has a source column in spec. NO invented fields. If BA sheet doesn't list it, it's not in the form.
6. **Picklist lookup is deterministic**: Picklist IDs come from `ba-source/` EC Picklist tab (78,388 rows). Spec lists exact Picklist IDs — builder MUST NOT fuzzy-match.
7. **Cross-field validation is a zod refine, not a manual check**: DOB < HireDate uses `z.object(...).refine(...)` pattern — reuses F3 toolkit convention so Phase 2 backend can consume same schema.
8. **Probation validation is BRD-exact (BRD #117)**: effectiveDate ∈ [HireDate, HireDate + 119 days]. NOT inferred from general probation patterns — cited from BRD text.

## Relevant Files

### Existing (must read before build)
- `src/frontend/src/app/[locale]/admin/hire/page.tsx` + `steps/Step*.tsx` — current 13-field 3-cluster wizard (Option-1 shape from `project_hr_hire_wizard_option1_2026-04-23.md`) — S1 expands these
- `src/frontend/src/app/[locale]/admin/hire/useHireWizard.ts` — Zustand store with `persist` key `hire-wizard-draft`
- `src/frontend/src/components/humi/shell/Sidebar.tsx` — Admin Sidebar nav (S2 adds entry)
- `src/frontend/src/components/humi/WizardShell.tsx` — Humi re-skin wizard shell (S4 + S5 reuse)
- `packages/shared/src/factory/createClusterWizard.ts` — D1 factory (S4 + S5 consumers)
- `packages/shared/src/types/timeline.ts` — `TimelineEvent` union (7 variants), S5 MAY need `employee_data_edit` variant — **first check if it exists; if not in Plan v2 §4, use generic `update` variant documented in D1**
- `packages/shared/src/picklists/index.ts` — export surface for `PICKLIST_YES_NO`, `PICKLIST_MARITAL_STATUS`
- `packages/shared/src/validation/index.ts` — F3 toolkit (7 validators + 38 tests)
- `projects/hr-platform-replacement/ba-source/BA-EC-SUMMARY.md` — **BA Source of Truth** (37 Hire fields + EC Picklist sheet)
- `projects/hr-platform-replacement/BRD-ec-summary.md` — BRD #109 (Hire), #117 (Probation verbatim below), #12 (Employee Data)
- `projects/hr-platform-replacement/HR-UI-PROGRESSIVE-PLAN.md` — §0 archetypes, §1 URL architecture, §4 timeline variants
- `projects/hr-platform-replacement/diagrams/flow-09-ec-employee-lifecycle.drawio` — lifecycle overview
- `projects/hr-platform-replacement/diagrams/BRD-ec-flow-06-personal-info.excalidraw` — Personal Info wireframe reference for S5
- `projects/hr-platform-replacement/diagrams/all-sequences.drawio` — Seq #06 Hire + Seq #09 Pass Probation SW4

### To Create (Wave 1)
- `src/frontend/src/mocks/employees.ts` — 1,000-row fixture + `buildEmployeeLookup()` + `buildInitialTimeline(empId)` helper
- `src/frontend/src/app/[locale]/admin/employees/page.tsx` — virtualized list (S2)
- `src/frontend/src/app/[locale]/admin/employees/[id]/page.tsx` — detail hub (S3)
- `src/frontend/src/app/[locale]/admin/employees/[id]/{transfer,terminate,rehire}/page.tsx` — 3 Phase-2 placeholder pages
- `src/frontend/src/components/employee/EmployeeSnapshotCard.tsx` — presentational snapshot (S3)
- `src/frontend/src/components/employee/EmployeeTimeline.tsx` — presentational timeline (S3)
- `src/frontend/src/components/employee/EmployeeActionMenu.tsx` — 5-card action grid (S3)
- `src/frontend/src/stores/useEmployeesStore.ts` — zustand (no persist) for runtime timeline mutations (S3/S4/S5)
- Extensions to `src/frontend/src/app/[locale]/admin/hire/steps/Step*.tsx` + `hireSchema.ts` + `useHireWizard.ts` (S1 — expand 13→37 fields)
- NEW picklist files if not yet in `@hrms/shared/picklists/`: `COUNTRY_ISO.ts`, `ID_TYPE.ts`, `EVENT_REASON_HIRE.ts`, `COMPANY.ts`, `SALUTATION_EN.ts`, `NATIONALITY.ts`, `RELIGION.ts`, `GENDER.ts`, `BLOOD.ts`, `MILITARY.ts` (S1 — exact Picklist IDs from BA EC Picklist tab)

### To Create (Wave 2)
- `src/frontend/src/app/[locale]/admin/employees/[id]/probation/page.tsx` + `schema.ts` (S4)
- `src/frontend/src/app/[locale]/admin/employees/[id]/edit/page.tsx` + `schema.ts` (S5)

### BRD #117 Probation — verbatim (embed in S4 actions)

```
1. Pass Probation: เมื่อพนักงานผ่านทดลองงาน
2. Auto Pass Probation เมื่ออายุงาน 119 วัน
3. Direct Manager ต้องเข้ามา Action ในระบบ ให้ Pass / No Pass / Extend
   - ถ้าผ่านทดลองงาน อาจจะได้ Allowance เพิ่มเติม ตาม Contract ให้ส่งมาที่ Payroll
   - ถ้าไม่มี Action ให้ Auto Pass Probation
4. การแจ้งเตือนทั้งเมลล์และ To do บนระบบ
Reminders: Day 30, 75, 90 → Direct Manager + HRBP
```

## Team Orchestration

JARVIS orchestrates — never touches code directly. Each task assigned to one Mark. Wave 1 (S1/S2/S3) dispatched in parallel; Wave 2 (S4/S5) depends on Wave 1 completion (specifically S3 fixture + detail route).

### Team Members

- **Frontend Builder**
  - Name: frontend-builder
  - Agent: Forge Frontend — UI Builder
  - Role: Next.js pages, React components, Zustand stores, zod schemas, picklist wiring. Executes S1, S2, S3 (Wave 1, parallel 3x) + S4, S5 (Wave 2, parallel 2x). Must inject 3 Vercel skills (react-best-practices + composition-patterns + web-design-guidelines) per `feedback_fe_agents_must_read_vercel_skills.md`.

- **Test Writer**
  - Name: test-writer
  - Agent: MK VI — Test Writer
  - Role: Unit tests per cluster (S1 schema, S2 list filter, S3 detail render, S4 probation submit, S5 edit submit) + mandatory browser-harness E2E journey test (AC-6). Writes tests only — does not run. Each test has traceability comment referencing AC-N.

- **Code Reviewer / Validator (dual-role)**
  - Name: validator
  - Agent: MK IV — Validator
  - Role: (a) Code Review — C1 surgical changes + C3 simplicity + C6 no silent catch + C8 source-grounding audit; fix blockers directly. (b) Validate Final — run full test suite, capture actual terminal output (C2), run E2E journey via browser-harness, zoom-verify screenshots (GUIDE rule 62). Dual-role per Phase 4 + Phase 5 pipeline.

- **Orchestrator** (not an agent, listed for traceability)
  - JARVIS — dispatches Wave 1 in parallel, gates Wave 2 on Wave 1 fixture ready, posts progress to #17, handles retry/escalate.

## Step by Step Tasks

### 1. S1 — Hire Wizard Gap Close (13 → 37 BA fields)
- **Task ID**: s1-hire-37-fields
- **Depends On**: none
- **Assigned To**: frontend-builder
- **Parallel**: true
- **Wave**: 1
- **Files**:
  - `src/frontend/src/app/[locale]/admin/hire/steps/StepWho.tsx`
  - `src/frontend/src/app/[locale]/admin/hire/steps/StepJob.tsx`
  - `src/frontend/src/app/[locale]/admin/hire/steps/StepReview.tsx`
  - `src/frontend/src/app/[locale]/admin/hire/useHireWizard.ts`
  - `src/frontend/src/app/[locale]/admin/hire/hireSchema.ts`
  - `packages/shared/src/picklists/{COUNTRY_ISO,ID_TYPE,EVENT_REASON_HIRE,COMPANY,SALUTATION_EN,NATIONALITY,RELIGION,GENDER,BLOOD,MILITARY}.ts` (create only if missing)
  - `packages/shared/src/picklists/index.ts` (update exports)
- **Actions**:
  - Read `projects/hr-platform-replacement/ba-source/BA-EC-SUMMARY.md` — identify all 37 Employee-file Hiring fields (Identity 19 + Personal Info 18; 27 mandatory). Enumerate exact field names + BA row numbers in schema comments.
  - Look up Picklist IDs from BA EC Picklist tab: `ISOCountryList`, `idType_ID_Card`, `EventReasonHire`, `Company`, `Salutation EN`, `Nationality`, `Religion`, `Gender`, `Blood`, `Military`, `MARITAL_STATUS` (already D1.3). For each, create/extend `packages/shared/src/picklists/<name>.ts` with exact `{ label_en, label_th, value, picklist_id }` rows. C8: NO fuzzy-match — picklist_id must be verbatim from BA sheet.
  - Distribute 37 fields across 3 clusters: **Who** (identity 19 — salutation/names/DOB/country of birth/ID/nationality/religion/gender/blood/marital) / **Job** (employment 18 — company/hire date/position/org unit/contract type/Permanent+Partime toggles/event reason/allowance/work location/phone/email) / **Review** (read-only summary + submit).
  - Cross-field validator: `hireSchema.refine((data) => data.dateOfBirth < data.hireDate, { message: "Recent Date should be greater than Date of Birth", path: ["hireDate"] })` — exact BA cross-field flag verbatim.
  - Wire `Permanent` vs `Partime` toggle visibility (BA cols F/G): if `contractType === 'Permanent'` hide `endDate`, etc. — follow BA sheet exactly.
  - Zustand store `useHireWizard` extended: add all 37 fields with sensible defaults. `persist` key unchanged (`hire-wizard-draft`).
  - Preserve existing Humi re-skin via `.humi-step-section` — do NOT edit step component structure beyond adding new `<Field>` rows in appropriate cluster.
  - **C1**: Do not refactor unrelated code. Do not change WizardShell or Option-1 3-cluster shape.
  - **C8 source-grounding**: Every new `<Field>` has a JSDoc comment `/** BA row X — <field name> */` above it.

### 2. S2 — Employees List page (1,000-row virtualized)
- **Task ID**: s2-employees-list
- **Depends On**: none
- **Assigned To**: frontend-builder
- **Parallel**: true
- **Wave**: 1
- **Files**:
  - `src/frontend/src/app/[locale]/admin/employees/page.tsx`
  - `src/frontend/src/mocks/employees.ts` (shared with S3/S4/S5 — S2 owns creation)
  - `src/frontend/src/components/humi/shell/Sidebar.tsx` (add nav entry)
  - `src/frontend/src/components/employee/EmployeeListTable.tsx`
- **Actions**:
  - Create `mocks/employees.ts` exporting `EMPLOYEES: Employee[]` — 1,000 rows with realistic Thai names, employee_id (`emp-0001`..`emp-1000`), class (A/B/C/D), dob (1960-2000 range), hire_date (2015-2025 range), org_unit (5 hardcoded: HR / IT / Finance / Operations / Sales), position (per org_unit, 3-4 each), probation_status (`in-probation` | `passed` | `extended` | `failed`), phone, email. Seed deterministic (fixed seed) so tests are stable.
  - Export `buildEmployeeLookup()` returning `Map<string, Employee>` keyed by `employee_id` (consumed by S3/S4/S5).
  - Export `buildInitialTimeline(empId): TimelineEvent[]` returning `[{ type: 'hire', effectiveDate: hireDate, ... }]` for each employee.
  - Page renders virtualized table via `@tanstack/react-virtual`: columns = ID / Name / Class / Hire Date / Position / Status badge. 1,000 rows scroll smoothly < 1s.
  - Search input: prefix match on name (Thai + EN) OR employee_id. Debounce 150ms.
  - Row click → `router.push('/th/admin/employees/' + empId)` (preserve locale).
  - Admin Sidebar: add nav entry `{ href: '/admin/employees', labelTh: 'พนักงาน', labelEn: 'Employees', icon: <UsersIcon /> }` — **C1: single entry addition, no sidebar refactor**.
  - Empty-state: if search returns 0 matches, render "ไม่พบพนักงาน / No employees found".

### 3. S3 — Employee Detail hub page
- **Task ID**: s3-employee-detail
- **Depends On**: none (fixture is owned by S2, but both builders agree on schema exported from `mocks/employees.ts` — coordinate shared contract ahead)
- **Assigned To**: frontend-builder
- **Parallel**: true
- **Wave**: 1
- **Files**:
  - `src/frontend/src/app/[locale]/admin/employees/[id]/page.tsx`
  - `src/frontend/src/app/[locale]/admin/employees/[id]/transfer/page.tsx` (placeholder)
  - `src/frontend/src/app/[locale]/admin/employees/[id]/terminate/page.tsx` (placeholder)
  - `src/frontend/src/app/[locale]/admin/employees/[id]/rehire/page.tsx` (placeholder)
  - `src/frontend/src/components/employee/EmployeeSnapshotCard.tsx`
  - `src/frontend/src/components/employee/EmployeeTimeline.tsx`
  - `src/frontend/src/components/employee/EmployeeActionMenu.tsx`
  - `src/frontend/src/stores/useEmployeesStore.ts`
- **Actions**:
  - Route `app/[locale]/admin/employees/[id]/page.tsx` reads `id` from `params`, looks up via `buildEmployeeLookup()`. If not found → 404.
  - **Snapshot card**: Name / EmpID / Class badge / HireDate (localized) / Current Position / Probation status badge with color.
  - **Timeline**: consumes `useEmployeesStore.getTimeline(id)` (seeded from `buildInitialTimeline` on first read). Renders `TimelineEvent[]` as vertical timeline (latest first). Each event type has icon + Thai/EN label from Plan v2 §4 (hire / probation_assess / transfer / terminate / rehire / contract_renewal / promotion).
  - **Action menu**: 5 `<ActionCard>` — Probation / Edit / Transfer / Terminate / Rehire. Each card: icon + Thai label + EN label + short description + `<Link>` to `/admin/employees/[id]/<action>`. Transfer/Terminate/Rehire cards show subtle "Phase 2" badge but are still navigable.
  - Placeholder pages: `<h1>{actionName} — Phase 2</h1><p>Feature coming in Phase 2.</p><Link to="..">← Back to Employee</Link>` — C3: do not over-build.
  - `useEmployeesStore`: zustand (no persist), state shape `{ timelines: Record<string, TimelineEvent[]> }`, actions `getTimeline(id)` (lazy-seed from fixture) + `appendEvent(id, event)`. S4/S5 dispatch into this.
  - Banner support: read `?banner=<key>` from `searchParams`, render success banner at top if present (e.g. `?banner=probation-recorded` → "บันทึก Probation สำเร็จ / Probation recorded").

### 4. S4 — Probation Action (first factory consumer)
- **Task ID**: s4-probation-action
- **Depends On**: s2-employees-list, s3-employee-detail (needs fixture + store)
- **Assigned To**: frontend-builder
- **Parallel**: true (within Wave 2 — with S5)
- **Wave**: 2
- **Files**:
  - `src/frontend/src/app/[locale]/admin/employees/[id]/probation/page.tsx`
  - `src/frontend/src/app/[locale]/admin/employees/[id]/probation/schema.ts`
- **Actions**:
  - Route reads `id`, looks up employee via `buildEmployeeLookup()`, 404 if missing.
  - Mount `createClusterWizard({ employeeId: id, preloadedEmployee: { employee_id, name_th, name_en, class, hire_date }, readOnlyKeys: ['employee_id'], clusters: [AssessmentCluster] })`. **This is the first production B-action consumer — if factory API is wrong, discover here.**
  - `AssessmentCluster` fields (per BRD #117):
    - `outcome`: radio `Pass` | `NoPass` | `Extend` (required)
    - `effectiveDate`: date picker (required, validated)
    - `allowance`: text input (optional, shown only when `outcome === 'Pass'`) — BRD #117 "ถ้าผ่าน อาจจะได้ Allowance"
    - `note`: textarea (optional, multiline)
  - **BRD #117 validation** (zod refine): `effectiveDate >= hireDate && effectiveDate <= hireDate + 119 days`. Error message (Thai): "วันที่มีผลต้องอยู่ในช่วงทดลองงาน (วันเริ่มงาน ถึง วันเริ่มงาน + 119 วัน)".
  - Submit action:
    - Build `ProbationEvent: TimelineEvent` (type `probation_assess`) with outcome/effectiveDate/allowance/note.
    - Call `useEmployeesStore.appendEvent(id, event)`.
    - `router.push('/th/admin/employees/' + id + '?banner=probation-recorded')`.
  - Auto-pass-at-day-119 logic is OUT of scope (Phase 2 background job) — do not build cron/scheduler.
  - Allowance payroll forwarding is OUT of scope — capture note only.
  - **C8**: Do NOT invent fields beyond BRD #117. No "reviewerId" unless BRD says so (it doesn't).

### 5. S5 — Employee Data Edit Action (second factory consumer, 23 Personal Info fields)
- **Task ID**: s5-employee-data-edit
- **Depends On**: s2-employees-list, s3-employee-detail
- **Assigned To**: frontend-builder
- **Parallel**: true (within Wave 2 — with S4)
- **Wave**: 2
- **Files**:
  - `src/frontend/src/app/[locale]/admin/employees/[id]/edit/page.tsx`
  - `src/frontend/src/app/[locale]/admin/employees/[id]/edit/schema.ts`
- **Actions**:
  - Route reads `id`, looks up via `buildEmployeeLookup()`, 404 if missing.
  - Mount `createClusterWizard({ employeeId: id, preloadedEmployee: <23 Personal Info fields from fixture>, readOnlyKeys: ['employee_id'], clusters: [PersonalInfoCluster] })`.
  - **23 Personal Info fields** (from BA Personal Info section + BRD #12 subset, D1.5 edit scope — exact list):
    1. Salutation (Local/Thai)
    2. Salutation EN
    3. First Name Local
    4. Middle Name Local
    5. Last Name Local
    6. First Name EN
    7. Middle Name EN
    8. Last Name EN
    9. Nickname
    10. Military Status (picklist PICKLIST_MILITARY)
    11. Gender (picklist PICKLIST_GENDER)
    12. Nationality (picklist PICKLIST_NATIONALITY)
    13. Foreigner flag (picklist PICKLIST_YES_NO)
    14. Blood Type (picklist PICKLIST_BLOOD)
    15. Marital Status (picklist PICKLIST_MARITAL_STATUS)
    16. Marital Since (date — required if marital ≠ Single)
    17. Attachment (file URL — optional)
    18. Phone
    19. Email (format validation)
    20. Address Line 1
    21. Address Line 2 (optional)
    22. Postal Code
    23. Country of Residence (picklist ISOCountryList)
  - Fixture provides initial values; form is pre-filled for user to edit.
  - Mandatory fields per BA sheet: items 1, 3, 5, 6, 8, 10, 11, 12, 14, 15, 18, 19, 20, 22, 23 (others optional). Spec MUST list explicit mandatory set in schema comments.
  - Cross-field: if `marital !== 'Single'` then `marital_since` required.
  - Submit action:
    - Update employee record in-memory via `useEmployeesStore.updateEmployee(id, changedFields)` (add this action to S3's store — S5 builder coordinates with S3).
    - Append `TimelineEvent` with type per Plan v2 §4 (check which variant — if `employee_data_edit` exists use it; else use generic `update` variant per D1 docs).
    - `router.push('/th/admin/employees/' + id + '?banner=personal-info-updated')`.
  - **C8**: ONLY these 23 fields. Do not add Work Permit / Tax / Dependents (those are separate BRD sections, Phase 2+).

### 6. Write Tests
- **Task ID**: write-tests
- **Depends On**: s1-hire-37-fields, s2-employees-list, s3-employee-detail, s4-probation-action, s5-employee-data-edit
- **Assigned To**: test-writer
- **Parallel**: false
- **Files**:
  - `src/frontend/src/app/[locale]/admin/hire/hireSchema.test.ts` (extend existing)
  - `src/frontend/src/app/[locale]/admin/employees/page.test.tsx`
  - `src/frontend/src/app/[locale]/admin/employees/[id]/page.test.tsx`
  - `src/frontend/src/app/[locale]/admin/employees/[id]/probation/page.test.tsx`
  - `src/frontend/src/app/[locale]/admin/employees/[id]/edit/page.test.tsx`
  - `src/frontend/tests/e2e/phase1-journey.harness.ts` (browser-harness E2E — NEW)
- **Actions**:
  - Unit tests (vitest + @testing-library/react + jsdom):
    - S1 hire schema: DOB < HireDate validation, 27 mandatory fields, picklist value validation. Traceability comment `// AC-1`.
    - S2 list: renders 1000 rows virtualized, search filters by prefix match, row click navigates. `// AC-2`.
    - S3 detail: renders 3 sections, 404 on missing id, timeline seeds from fixture. `// AC-3`.
    - S4 probation: effectiveDate boundary (hireDate-1 fails, hireDate+120 fails, hireDate+60 passes), submit appends event. `// AC-4`.
    - S5 edit: renders 23 pre-filled fields, marital-since-required cross-field, submit updates employee. `// AC-5`.
  - **E2E journey test (MANDATORY, browser-harness primary per GUIDE rule 30)**: `phase1-journey.harness.ts` walks:
    1. new_tab("http://localhost:3000/th/admin/employees") → screenshot → `test-artifacts/phase1-build-2026-04-23/screenshots/journey-stage-1-list.png`
    2. click row for `emp-0001` → wait_for_load → screenshot → `journey-stage-2-detail.png`
    3. click Probation action card → wait_for_load → fill outcome=Pass, effectiveDate=hireDate+60, note="ผ่านทดลองงาน" → submit → screenshot BEFORE submit → `journey-stage-3-probation.png`
    4. on redirect back to detail → assert timeline has 2 events (hire + probation_assess) → screenshot → `journey-stage-4-detail-after.png`
  - Each screenshot saved to `test-artifacts/phase1-build-2026-04-23/screenshots/` with traceability `// AC-6`.
  - Test writer does NOT run tests — hands off to Validator.

### 7. Code Review
- **Task ID**: code-review
- **Depends On**: write-tests
- **Assigned To**: validator
- **Parallel**: false
- **Actions**:
  - Audit all S1-S5 files for:
    - **C1 surgical changes**: every line traces to spec — no drive-by refactors.
    - **C3 simplicity**: no abstraction for single-use (e.g. no `<GenericFormField>` wrapper if 1 usage).
    - **C6 no silent catch**: every `try/catch` logs or rethrows.
    - **C8 source-grounding audit**: every Hire (S1) + Edit (S5) field has JSDoc `/** BA row X */` comment. Spot-check 5 random fields against BA sheet.
    - **Tailwind reset check**: no `* { padding:0; margin:0 }` in new CSS (GUIDE rule 26b).
  - Fix blockers directly via Edit tool (not just report) — dual-role.
  - Post review comment to #17 summarizing: files reviewed, issues fixed inline, issues deferred with reasoning.

### 8. Validate Final Output
- **Task ID**: validate-all
- **Depends On**: code-review
- **Assigned To**: validator
- **Parallel**: false
- **Actions**:
  - Run `cd src/frontend && npx vitest run` — capture ACTUAL terminal output (C2). Expect 0 new failures vs D1 baseline (10 pre-existing test file import errors allowed — same list as D1).
  - Run `cd src/frontend && npx tsc --noEmit` — capture output. Expect 0 new errors (filter out placeholder-page warnings for transfer/terminate/rehire if any).
  - Dev-serve: `cd src/frontend && npm run dev` in background. Wait port 3000 ready.
  - Run E2E journey via browser-harness: `browser-harness <<'PY' ...` executing `phase1-journey.harness.ts` steps.
  - Zoom-verify screenshots (GUIDE rule 62) — open each of 4 PNGs, check pixel-level: text not overlapping, timeline events visible, probation banner rendered.
  - Evidence bundle: paste terminal output + list screenshot paths + 1-line pass/fail per AC-1..AC-8 into PR comment on #17.
  - If any AC fails → send back to builder, max 2 retries, then escalate to Ken.

## Pipeline

```
Wave 1 (parallel, 3 builders):
  S1 Hire-37-fields ────┐
  S2 Employees-list ────┼──→ all 3 complete
  S3 Employee-detail ───┘         │
                                  ▼
Wave 2 (parallel, 2 builders, Depends On Wave 1):
  S4 Probation-action ──┐
  S5 Employee-edit ─────┘──→ both complete
                                  │
                                  ▼
  Write Tests (MK VI) ──→ Code Review (MK IV) ──→ Validate Final (MK IV)
                                                        │
                                                        ▼
                                                   FAIL? → fix → re-review → re-validate
                                                         (max 2 retries → escalate to Ken)
```

If validator fails → Builder fixes the specific S# → re-run Code Review → Validate.
After 2 failed retries → JARVIS escalates to Ken with full context + ACTUAL terminal output.

## Acceptance Criteria

- **AC-1**: S1 Hire wizard expanded to 37 BA fields with ≥ 5 picklists wired. Verify: `grep -cE "PICKLIST_|picklist_id" src/frontend/src/app/\[locale\]/admin/hire/steps/*.tsx` ≥ 5. Count `<Field>` or `register(...)` occurrences across 3 step files ≥ 37. DOB < HireDate zod refine present in `hireSchema.ts`.
- **AC-2**: S2 `/admin/employees` renders 1000 rows virtualized, scroll to bottom < 1s, search filters. Verify: browser-harness loads page, `page_info()` shows at least 50 visible rows (virtualized), scroll to row 999, search "emp-0500" shows exactly 1 row.
- **AC-3**: S3 `/admin/employees/emp-001` renders 3 sections (Snapshot / Timeline / ActionMenu). Verify: harness screenshot shows all 3 card regions, `getByTestId('snapshot-card')` + `getByTestId('timeline')` + `getByTestId('action-menu')` present.
- **AC-4**: S4 Probation submit appends `probation_assess` event to timeline and redirects to detail with banner. Verify: vitest unit test confirms `useEmployeesStore.appendEvent` called with correct event shape; BRD #117 effectiveDate boundary tests pass.
- **AC-5**: S5 Edit renders 23 pre-filled fields, readOnlyKeys contains `employee_id`, submit updates store. Verify: vitest test counts 23 `<input>`/`<select>` + asserts `employee_id` field disabled. Marital-since cross-field validated.
- **AC-6 (E2E JOURNEY — load-bearing)**: browser-harness walks List → Detail → Probation → submit → Detail-with-new-event. 4 screenshots saved to `test-artifacts/phase1-build-2026-04-23/screenshots/journey-stage-{1,2,3,4}-*.png`. Zoom verify: no text overlap, timeline shows 2 events (hire + probation_assess) on stage 4.
- **AC-7**: `cd src/frontend && npx vitest run` — 0 new failures beyond D1 baseline (10 pre-existing test file import errors allowed). `npx tsc --noEmit` — 0 new errors (ignore 3 Phase-2 placeholder pages if harmless).
- **AC-8 (NO ORPHAN ROUTES — Ken DoD)**: Admin Sidebar has nav entry to `/admin/employees`. `grep -rn '/admin/employees' src/frontend/src/components/humi/shell/Sidebar.tsx` ≥ 1 match. All 5 action-menu cards link to real routes (Probation + Edit = functional; Transfer/Terminate/Rehire = placeholder pages, but reachable with working back-link). Manual check: clicking each card never 404s.

## Validation Commands

```bash
# Unit + type check (from repo root /Users/tachongrak/Projects/hr)
cd src/frontend && npx vitest run 2>&1 | tee /tmp/phase1-build-test.log | tail -40
cd src/frontend && grep -cE "Cannot find module|Failed to resolve import" /tmp/phase1-build-test.log  # ≤ 10 (D1 baseline)
cd src/frontend && npx tsc --noEmit 2>&1 | grep -v "probation\|rehire\|terminate\|transfer/page" | head -20

# AC-1 checks
grep -cE "PICKLIST_|picklist_id" /Users/tachongrak/Projects/hr/src/frontend/src/app/\[locale\]/admin/hire/steps/*.tsx
grep -E "refine.*dateOfBirth.*hireDate|DOB.*hireDate" /Users/tachongrak/Projects/hr/src/frontend/src/app/\[locale\]/admin/hire/hireSchema.ts

# AC-8 sidebar nav check
grep -rn '/admin/employees' /Users/tachongrak/Projects/hr/src/frontend/src/components/humi/shell/Sidebar.tsx

# Dev server for E2E
cd /Users/tachongrak/Projects/hr/src/frontend && npm run dev &
sleep 8

# AC-6 E2E journey (browser-harness primary — GUIDE rule 30)
browser-harness <<'PY'
new_tab("http://localhost:3000/th/admin/employees")
wait_for_load()
screenshot("/Users/tachongrak/Projects/hr/test-artifacts/phase1-build-2026-04-23/screenshots/journey-stage-1-list.png")
# ... (see phase1-journey.harness.ts for full 4-stage walk)
PY

# Zoom-verify (GUIDE rule 62) — open each screenshot in Preview, pixel-level check
open /Users/tachongrak/Projects/hr/test-artifacts/phase1-build-2026-04-23/screenshots/journey-stage-*.png
```

## Out of Scope

- **Real backend / API wiring** — all employee data in-memory fixture. Phase 2 wires NestJS + Prisma.
- **Authentication / RBAC enforcement** — admin role assumed. BRD #184-186 field-level RBAC is Phase 3+.
- **Transfer / Terminate / Rehire / Contract Renewal / Promotion forms** — Phase 2. Phase 1 ships placeholder pages only (per AC-8 no-orphan rule).
- **Auto-pass Probation at Day 119 background job** — UI only. Phase 2 adds scheduler.
- **Probation allowance → Payroll integration** — capture note field only. Phase 2+.
- **Email / To-Do / reminder notifications (Day 30/75/90 per BRD #117)** — UI only. Phase 2 adds notifier.
- **Password / Login flow** — Phase 3 (Azure B2C per `project_oms_login_b2c.md` reference pattern).
- **Humi full re-skin beyond `.humi-step-section` overrides** — Phase 2.5 design system sweep.
- **Mobile responsive testing** — covered by separate sprint per `ironteam_run_5_hr_mobile_responsive.md`.
- **Dark theme** — separate spec `2026-03-27-dark-theme-support.md`.
