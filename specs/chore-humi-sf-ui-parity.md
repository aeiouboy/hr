# Plan: Humi UI Parity with SF EC Core

## Task Description

Add missing fields + sidebar menu items to Humi that match what CENTRAL's SF (SuccessFactors) users currently see at `/sf/liveprofile` and the SF main sidebar. Scope is **UI-only** — no backend/Prisma schema changes, no effective-date UX gate. Target: users demo Humi and recognize the field catalog + menu parity vs their current SF experience, then validate field list before we lock the backend schema in Sprint 2.

Source of truth: the SF extraction artifact at `chat-assist/projects/hr-platform-replacement/sf-extract/ec-core/EC_CORE_SCHEMA.md` (ground-truth field catalog harvested via browser-harness Phase 1-3, PII-scrubbed).

## Objective

Humi users opening `/th/profile/me` see 14 new fields across Personal Info + Employment Info + Organization sections (all SF-equivalent labels with TH/EN i18n). Humi sidebar shows 16 total nav items (existing 10 + 6 new SF modules + 1 external T&A link). All new routes render placeholder pages without error. Existing 410-test suite still passes — zero regressions.

## Tech Stack

- **Language**: TypeScript
- **Framework**: Next.js 16 App Router
- **Runtime**: Bun (dev) / Node (prod)
- **Key libraries**: Tailwind v4, shadcn/ui, react-hook-form, zod, next-intl, lucide-react, Zustand
- **Testing**: Vitest + @testing-library/react (unit/component), Playwright (E2E), jsdom environment

## Technical Design

### Architecture

Existing Humi frontend under `src/frontend/` is a Next.js app with `[locale]` routing, shadcn/ui primitives, and a dedicated `humi/shell` layout (Sidebar + AppShell drawer). Profile page is a tabbed view built from `components/profile/tabs/*.tsx`. Changes are additive — extend existing components + add new placeholder routes + extend sidebar NAV array. No shared data layer changes.

### Key Design Decisions

1. **Add fields as form inputs, but don't wire to API yet** — local state only (react-hook-form). Sprint 2 backend will add fields to Prisma + API; until then UI uses local form state. New fields render disabled-ish or "not yet saved" where it matters.
2. **Placeholder pages use existing `AppShell`** — reuse not duplicate. Minimal "Coming Soon — Sprint 2+" card using existing Tailwind tokens.
3. **External T&A link opens in new tab with `rel="noopener noreferrer"`** — security + UX standard for cross-domain external links.
4. **Sidebar keeps 3-group structure** (พื้นที่ทำงานของฉัน / บุคลากร / บริษัท) — don't restructure, just extend each group.
5. **i18n discipline** — every new label has TH + EN entries in `messages/{th,en}.json`. Reviewer blocks PR if any missing.

## Relevant Files

- `src/frontend/src/components/profile/tabs/personal-info.tsx` — Personal Information tab; add 6 fields (salutation EN/TH, other title TH, middle name EN, last name TH, marital status since)
- `src/frontend/src/components/profile/tabs/ec-personal-info.tsx` — sibling tab (may need same fields if it mirrors); inspect + align if needed
- `src/frontend/src/components/profile/tabs/employment.tsx` — Employment Info tab; add 4 date/text fields + Organization sub-section (4 retail-org fields)
- `src/frontend/src/components/humi/shell/Sidebar.tsx` — add 6 new `NavItem` entries + 1 external T&A link; update NAV array + `NavSection` groups
- `src/frontend/src/app/[locale]/(routes)/performance-form/page.tsx` — NEW placeholder page (ประเมินผลงาน)
- `src/frontend/src/app/[locale]/(routes)/development/page.tsx` — NEW placeholder page (การพัฒนา)
- `src/frontend/src/app/[locale]/(routes)/succession/page.tsx` — NEW placeholder page (สายการสืบทอด)
- `src/frontend/src/app/[locale]/(routes)/careers/page.tsx` — NEW placeholder page (ตำแหน่งว่างภายใน)
- `src/frontend/src/app/[locale]/(routes)/recruiting/page.tsx` — NEW placeholder page (สรรหา)
- `src/frontend/src/app/[locale]/(routes)/reports/page.tsx` — NEW placeholder page (รายงาน)
- `src/frontend/messages/th.json` — add Thai labels for all new fields + nav items + placeholder copy
- `src/frontend/messages/en.json` — mirror English labels
- `src/frontend/src/components/__tests__/profile-fields.test.tsx` — NEW component tests (one file covering AC-1..3)
- `src/frontend/src/components/__tests__/sidebar-nav.test.tsx` — NEW sidebar test (AC-4..5)
- `src/frontend/e2e/sf-parity.spec.ts` — NEW Playwright E2E (AC-6, placeholder routing + T&A external link)
- Reference (read-only): `/Users/tachongrak/stark/projects/hr-platform-replacement/sf-extract/ec-core/EC_CORE_SCHEMA.md`, `GAP_REPORT.md`, `sf-modules.json`

## Team Orchestration

JARVIS orchestrates — never touches code directly (except Phase 2.5 import fixes + Phase 3b test runs per /ironteam policy). Each task assigned to one Mark.

### Team Members

- **Frontend Builder**
  - Name: humi-ui-builder
  - Agent: Forge Frontend — UI Builder
  - Role: Extend 2 profile tabs with new fields + extend Sidebar NAV + create 6 placeholder pages + update i18n files. Match existing Humi styles.

- **Test Writer**
  - Name: humi-test-writer
  - Agent: MK VI — Test Writer
  - Role: Write Vitest component tests (AC-1..5) + Playwright E2E (AC-6 placeholder routing + external link rel/target). Tests include traceability comments `// AC-N`.

- **Code Reviewer / Validator**
  - Name: humi-validator
  - Agent: MK IV — Validator
  - Role: Dual-role review + validate. Run full test suite, verify 10 ACs, capture viewport screenshots (375/768/1280 px) via browser-harness primary, commit evidence.

## Step by Step Tasks

### 1. Extend Personal Info tab (6 new fields)
- **Task ID**: personal-info-fields
- **Depends On**: none
- **Assigned To**: humi-ui-builder
- **Parallel**: true
- **Files**: `src/frontend/src/components/profile/tabs/personal-info.tsx`, `src/frontend/src/components/profile/tabs/ec-personal-info.tsx` (if sibling needs same fields — inspect first), `messages/{th,en}.json`
- **Actions**:
  - Add picklist `salutation_en` (Mr/Mrs/Ms/Dr/Prof) + `salutation_th` (นาย/นาง/นางสาว/ดร./ศ.)
  - Add text `other_title_th` (พ.อ., ร.อ., อ.)
  - Add text `middle_name_en`
  - Add text `last_name_th`
  - Add date `marital_status_since`
  - Add i18n keys in th.json + en.json (prefix `profile.personal.*`)
  - Match existing field styling (shadcn Input + Label pattern)

### 2. Extend Employment Info tab (4 fields + Organization sub-section)
- **Task ID**: employment-fields
- **Depends On**: none
- **Assigned To**: humi-ui-builder
- **Parallel**: true
- **Files**: `src/frontend/src/components/profile/tabs/employment.tsx`, `messages/{th,en}.json`
- **Actions**:
  - Add date fields: `original_start_date`, `seniority_start_date`, `pass_probation_date`
  - Add text `corporate_title` (separate from job_title)
  - Add sub-section heading "Organization Information" / "ข้อมูลองค์กร" with 4 fields: `store_branch_code`, `hr_district`, `cost_centre`, `work_location`
  - Add i18n keys prefix `profile.employment.*` + `profile.employment.organization.*`

### 3. Extend Sidebar with 6 SF-equivalent items + external T&A
- **Task ID**: sidebar-nav
- **Depends On**: none
- **Assigned To**: humi-ui-builder
- **Parallel**: true
- **Files**: `src/frontend/src/components/humi/shell/Sidebar.tsx`, `messages/{th,en}.json`
- **Actions**:
  - Add to 'บุคลากร': `performance-form` (Activity icon), `development` (TrendingUp), `succession` (Users2)
  - Add to 'บริษัท': `careers` (Search), `recruiting` (UserPlus, admin-only if role-gated), `reports` (BarChart3)
  - Add external link to 'พื้นที่ทำงานของฉัน' footer: `time-attendance` → `https://cnext-time.centralgroup.com` with `target="_blank"` + `rel="noopener noreferrer"` + ExternalLink icon from lucide
  - Use i18n keys for all labels (nav.performanceForm, nav.development, nav.succession, nav.careers, nav.recruiting, nav.reports, nav.timeAttendance)

### 4. Create 6 placeholder pages
- **Task ID**: placeholder-pages
- **Depends On**: none
- **Assigned To**: humi-ui-builder
- **Parallel**: true
- **Files**: 6 new `src/frontend/src/app/[locale]/(routes)/*/page.tsx` files (one per new sidebar item, except time-attendance which is external)
- **Actions**:
  - Each page exports default component wrapped in existing `AppShell`
  - Renders a centered card: title (from i18n), subtitle "ฟีเจอร์นี้อยู่ระหว่างพัฒนา — Sprint 2+" / "Coming in Sprint 2+"
  - Accepts `{ params: { locale } }` per Next.js 16 App Router conventions
  - No data fetching, no forms — minimum implementation

### 5. Write Tests
- **Task ID**: write-tests
- **Depends On**: personal-info-fields, employment-fields, sidebar-nav, placeholder-pages
- **Assigned To**: humi-test-writer
- **Parallel**: false
- **Files**: `src/frontend/src/components/__tests__/profile-fields.test.tsx`, `src/frontend/src/components/__tests__/sidebar-nav.test.tsx`, `src/frontend/e2e/sf-parity.spec.ts`
- **Actions**:
  - Component test: render Personal Info tab with i18n provider → assert 6 new labels visible (AC-1)
  - Component test: render Employment Info tab → assert 4 new fields + 4 org sub-section fields (AC-2, AC-3)
  - Component test: render Sidebar → assert 16 NAV items across 3 groups (AC-4); T&A link has `target="_blank"` and `rel` includes `noopener` (AC-5)
  - E2E: visit each of 6 new routes → assert HTTP 200 + placeholder card visible (AC-6)
  - Each test includes `// AC-N` traceability comment
  - **DO NOT RUN TESTS** — JARVIS runs them in Phase 3b

### 6. Code Review + Validate Final Output
- **Task ID**: review-and-validate
- **Depends On**: write-tests
- **Assigned To**: humi-validator
- **Parallel**: false
- **Actions**:
  - Run full test suite (`cd src/frontend && bun run test` + `npx playwright test e2e/sf-parity.spec.ts`) — capture actual terminal output to `test-artifacts/<runId>/test-output.txt`
  - Start dev server + use browser-harness PRIMARY (CDP via real Chrome, `browser-harness <<'PY' ... PY`) to verify all 10 ACs
  - Capture screenshots at 3 viewports (375/768/1280 px) for:
    - Personal Info tab with new fields (`ac-1-personal-info.png`)
    - Employment Info tab (`ac-2-employment.png`)
    - Organization sub-section (`ac-3-organization.png`)
    - Sidebar with 16 items (`ac-4-sidebar.png`)
    - T&A external link hover/attributes (`ac-5-tanda-external.png`)
    - At least 2 placeholder pages rendering (`ac-6-placeholder.png`)
  - Save screenshots to `test-artifacts/<runId>/screenshots/`
  - Write `test-artifacts/<runId>/test-report.md` with AC→test mapping + actual pass/fail
  - Fix trivial issues in-place (typos, missing i18n keys) — disclose in self-heal table
  - If structural issues → flag + re-dispatch humi-ui-builder (C1 surgical rule)
  - Post close comment to issue #7 with screenshots + test evidence + self-heal table

## Pipeline

```
Build → Write Tests → Code Review (MK IV dual-role) → Validate Final (MK IV)
                                                            ↓
                                                        FAIL? → fix → re-review → re-validate
                                                                (max 2 retries → escalate to Ken)
```

All 4 Build tasks (#1-#4) run in parallel via single Agent dispatch message (Frontend Builder handles all four sequentially within one agent). Write Tests runs after Build completes. Code Review and Validate Final Output merge into one MK IV dual-role dispatch — efficient for UI-only scope.

If MK IV returns FAIL → JARVIS dispatches humi-ui-builder with specific fix instructions → re-runs MK IV. After 2 failed attempts, escalate to Ken with full context (Phase 6).

## Acceptance Criteria

- AC-1: Personal Info tab renders 6 new fields (salutation EN, salutation TH, other title TH, middle name EN, last name TH, marital status since) with visible TH+EN labels via i18n
- AC-2: Employment Info tab renders 4 new fields (original_start_date, seniority_start_date, pass_probation_date, corporate_title) with TH+EN labels
- AC-3: Organization sub-section under Employment Info renders 4 fields (store_branch_code, hr_district, cost_centre, work_location) with TH+EN labels
- AC-4: Sidebar shows 16 total items across 3 groups (existing 10 + 6 new SF-equivalent modules + 1 external T&A link)
- AC-5: "เวลา & การเข้างาน" T&A link opens `https://cnext-time.centralgroup.com` in a new tab — assert DOM has `target="_blank"` + `rel` attribute containing `noopener`
- AC-6: All 6 new routes (/performance-form, /development, /succession, /careers, /recruiting, /reports) render placeholder card without console errors
- AC-7: Existing Humi test suite passes — Vitest count at parity or higher than pre-change baseline (was 410+), zero regression in existing specs
- AC-8: Mobile responsive at 375 px: sidebar drawer opens correctly + all new fields stack without horizontal scroll. Tablet (768) + desktop (1280) also verified
- AC-9: i18n TH + EN entries exist for every new label — grep messages/th.json and messages/en.json for each new key returns a match
- AC-10: No console errors during `bun run dev` render + `bun run build` completes with exit 0

## Validation Commands

- `cd /Users/tachongrak/Projects/hr/src/frontend && bun install --silent && bun run test 2>&1 | tee test-artifacts/<runId>/test-output.txt` — run Vitest, capture output
- `cd /Users/tachongrak/Projects/hr/src/frontend && npx playwright test e2e/sf-parity.spec.ts 2>&1 | tee -a test-artifacts/<runId>/test-output.txt` — E2E
- `cd /Users/tachongrak/Projects/hr/src/frontend && bun run build 2>&1 | tail -20` — production build exits 0
- `cd /Users/tachongrak/Projects/hr/src/frontend && grep -c "profile.personal.salutationEn" messages/th.json messages/en.json` — confirm i18n keys exist (both files should return 1)
- Manual check via browser-harness: navigate to http://localhost:3000/th/profile/me → screenshot → verify 6 new Personal Info fields visible

## Out of Scope

- Backend Prisma schema changes (Employee/Employment models) — target: Sprint 2
- Effective-date UI gate overlay pattern (SF enforces date picker step 1 before reveal) — target: Sprint 2
- 5-tier organization hierarchy refactor (Company/Group/BU/Function/Organization + Store/Branch + HR District as entities) — target: Sprint 2
- Field persistence to API (new fields are form-local state this sprint) — target: Sprint 2
- Bilingual input-pair component redesign (`<BilingualNameInput>` helper) — target: Sprint 2
- Implementing actual Performance/Development/Succession/Careers/Recruiting/Reports business logic — separate epics
