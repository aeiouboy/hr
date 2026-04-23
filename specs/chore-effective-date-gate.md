# Plan: Effective-Date UX Gate — overlay pattern for Profile edits

## Task Description

เพิ่ม edit affordance + EffectiveDateGate overlay pattern บน Humi Profile sections เพื่อ replicate SF EC Core data integrity pattern ที่บังคับกรอก "When should these changes take effect?" **ก่อน** เปิด field อื่น. SF extraction Phase 3 พบว่านี่เป็น **data integrity contract** ไม่ใช่ UX choice — ถ้าไม่มี users จะแก้ข้อมูลปัจจุบันเป็นข้อมูลย้อนหลังได้ผิดพลาด → audit fail. Sprint นี้ scope = **frontend-only** (mock onSubmit; Sprint 2 backend จะ persist effective_start_date column ใน Sprint 3).

## Objective

User คลิก edit pencil บน Personal Info section → modal overlay เปิดด้วย date picker เป็น field เดียวที่ active. Save button disabled จนกว่าจะเลือก valid date (min=today). หลัง date valid + click "Continue" → form fields ของจริงแสดงพร้อม Save/Cancel. Cancel ที่ขั้นไหนก็ปิด overlay ไม่ persist ใดๆ. Pattern reusable สำหรับ Employment Info section + future entities ใน Sprint 3+. 10/10 ACs PASS + visual evidence ผ่าน browser-harness.

## Tech Stack

- **Language**: TypeScript
- **Framework**: Next.js 16 App Router (existing Humi)
- **Runtime**: Bun (dev) / Node (prod)
- **Key libraries**: shadcn/ui (Dialog + DatePicker + Button), Tailwind v4, react-hook-form (form mode), zod (date validation), next-intl (TH+EN), lucide-react (Pencil + ExternalLink icons)
- **Testing**: Vitest + @testing-library/react (jsdom environment), Playwright (E2E)

## Technical Design

### Architecture

New `<EffectiveDateGate>` component = controlled modal overlay wrapper. Composition pattern:

```tsx
<EffectiveDateGate
  open={isEditing}
  onClose={() => setIsEditing(false)}
  onConfirm={(effectiveDate, formValues) => persistChanges(effectiveDate, formValues)}
  sectionTitle={t('personal.basicInfo')}
>
  {(effectiveDate) => (
    <PersonalInfoForm initialValues={info} effectiveDate={effectiveDate} />
  )}
</EffectiveDateGate>
```

Two-step internal state machine:
1. **Step 1 (Date)**: only date picker visible + Continue button (disabled until valid)
2. **Step 2 (Form)**: render-prop children with `effectiveDate` arg, Save + Back + Cancel buttons

### Key Design Decisions

1. **Modal overlay (not inline expansion)** — matches SF behavior, full-screen focus, prevents accidental edit of unrelated sections
2. **Calendar date picker (shadcn DatePicker)** — better UX than typed input; min=today (no backdating in MVP)
3. **Render-prop API for children** — gives child form access to `effectiveDate` without lifting state
4. **Cancel = close + discard** — never persists; matches SF semantics
5. **Mock onSubmit logs to console** — Sprint 3 backend will replace with API call; no API change in this sprint

## Relevant Files

- `src/frontend/src/components/profile/EffectiveDateGate.tsx` — NEW main component
- `src/frontend/src/components/profile/EditPencilButton.tsx` — NEW small icon button (top-right of section)
- `src/frontend/src/components/profile/tabs/personal-info.tsx` — wire edit pencil + gate
- `src/frontend/src/components/profile/tabs/employment.tsx` — wire edit pencil + gate
- `src/frontend/messages/th.json` + `messages/en.json` — add `gate.*` i18n keys (5+)
- `src/frontend/src/components/__tests__/effective-date-gate.test.tsx` — NEW component test
- `src/frontend/e2e/effective-date-gate.spec.ts` — NEW E2E gate flow
- Reference (read-only): `chat-assist/projects/hr-platform-replacement/sf-extract/ec-core/finding-effective-dating-ui.json`

## Team Orchestration

JARVIS orchestrates. Single Forge Frontend agent handles all UI work (component scope ~5 files), then MK VI tests, then MK IV dual-role review+validate.

### Team Members

- **Frontend Builder**
  - Name: gate-builder
  - Agent: Forge Frontend — UI Builder
  - Role: Build EffectiveDateGate + EditPencilButton + integrate into 2 profile tabs + i18n + commit per sub-task

- **Test Writer**
  - Name: gate-test-writer
  - Agent: MK VI — Test Writer
  - Role: Write Vitest tests (gate state machine + edit pencil click) + Playwright E2E (full edit flow). DO NOT run tests.

- **Code Reviewer / Validator**
  - Name: gate-validator
  - Agent: MK IV — Validator
  - Role: Dual-role. Run all tests via JARVIS Bash, capture screenshots at 3 viewports (375/768/1280), verify 10 ACs, commit evidence.

## Step by Step Tasks

### 1. Build EffectiveDateGate component
- **Task ID**: gate-component
- **Depends On**: none
- **Assigned To**: gate-builder
- **Parallel**: false
- **Files**: `src/frontend/src/components/profile/EffectiveDateGate.tsx`, `src/frontend/messages/{th,en}.json`
- **Actions**:
  - Use shadcn `<Dialog>` for modal, `<Calendar>` for date picker (or composed DatePicker)
  - Internal `useState<'date' | 'form'>('date')` for step machine
  - Date validation: min=today, format dd MMM yyyy
  - Step 1 UI: section title (h2) + date picker + Continue button (disabled if !valid) + Cancel
  - Step 2 UI: render children(effectiveDate) + Back + Save + Cancel
  - Add 6 i18n keys: `gate.title`, `gate.continue`, `gate.save`, `gate.cancel`, `gate.back`, `gate.invalidDate`

### 2. Build EditPencilButton component
- **Task ID**: edit-pencil
- **Depends On**: none
- **Assigned To**: gate-builder
- **Parallel**: true (with task 1 — independent file)
- **Files**: `src/frontend/src/components/profile/EditPencilButton.tsx`
- **Actions**:
  - Small icon button using lucide `Pencil` (h-4 w-4)
  - Variant: ghost, hover state with brand color
  - aria-label from i18n `gate.editAria`
  - Position helper: `absolute top-2 right-2` (consumer applies to relative parent)

### 3. Integrate into Personal Info tab
- **Task ID**: integrate-personal
- **Depends On**: gate-component, edit-pencil
- **Assigned To**: gate-builder
- **Parallel**: false
- **Files**: `src/frontend/src/components/profile/tabs/personal-info.tsx`
- **Actions**:
  - Add `useState` for `editingSection: string | null`
  - Add EditPencilButton to Personal Information FieldGroup top-right
  - Wrap Personal Info section in EffectiveDateGate when editingSection === 'personal-info'
  - Render `<PersonalInfoForm>` placeholder inside gate (Sprint 3 will build real form; for now show simple read-only echo of effectiveDate + "Form coming in Sprint 3")
  - Mock onSubmit: console.log + close gate

### 4. Integrate into Employment Info tab
- **Task ID**: integrate-employment
- **Depends On**: gate-component, edit-pencil
- **Assigned To**: gate-builder
- **Parallel**: true (with task 3 — independent file)
- **Files**: `src/frontend/src/components/profile/tabs/employment.tsx`
- **Actions**:
  - Same pattern as task 3 for Employment Details FieldGroup
  - Mock onSubmit logs effectiveDate

### 5. Write Tests
- **Task ID**: write-tests
- **Depends On**: integrate-personal, integrate-employment
- **Assigned To**: gate-test-writer
- **Parallel**: false
- **Files**: `src/frontend/src/components/__tests__/effective-date-gate.test.tsx`, `src/frontend/e2e/effective-date-gate.spec.ts`
- **Actions**:
  - Component test: render gate alone, verify Step 1 shows date picker, Continue disabled when no date, Continue enabled with valid date, click Continue → Step 2 visible
  - Component test: edit pencil click on Personal Info → gate opens
  - Component test: Cancel button at any step closes gate without onConfirm call
  - Component test: invalid date (yesterday) shows error
  - E2E: navigate to profile → click edit pencil → pick date → continue → see form → cancel
  - DO NOT RUN TESTS — JARVIS runs them in Phase 3b

### 6. Code Review and Validate Final Output
- **Task ID**: review-validate
- **Depends On**: write-tests
- **Assigned To**: gate-validator
- **Parallel**: false
- **Actions**:
  - Run full test suite (`bun run test`) capture to test-output.txt
  - Run new E2E (`npx playwright test e2e/effective-date-gate.spec.ts`)
  - Start dev server + browser-harness verify flow at 3 viewports (375/768/1280)
  - Capture screenshots: `ac-1-edit-pencil-visible.png`, `ac-2-gate-step-1-date.png`, `ac-3-continue-disabled.png`, `ac-4-step-2-form.png`, `ac-5-cancel-closes.png`, `ac-8-mobile-gate.png`
  - Save to `test-artifacts/2026-04-22-effective-date-gate-issue-9/`
  - Write test-report.md with AC mapping + actual results + self-heal table
  - Commit screenshots + test-report + test-output (explicit paths only — no `git add .`)
  - Post close comment to issue #9 in Thai

## Pipeline

```
Build (parallel: gate-component + edit-pencil) → integrate-personal + integrate-employment (parallel)
  → Write Tests → Code Review (MK IV dual-role) → Validate Final (MK IV)
                                                        ↓
                                                    FAIL? → fix → re-review → re-validate
                                                            (max 2 retries → escalate to Ken)
```

If MK IV returns FAIL → JARVIS dispatches gate-builder with specific fix instructions → re-runs MK IV. After 2 failed attempts → escalate.

## Acceptance Criteria

- AC-1: Personal Info section has visible edit pencil button (top-right) — clicks open gate
- AC-2: Employment Info section has visible edit pencil button — clicks open gate
- AC-3: Gate Step 1 shows ONLY date picker + section title + Continue button + Cancel button (no other form fields visible)
- AC-4: Continue button is `disabled` when no date selected — `aria-disabled="true"` or `disabled` attribute
- AC-5: Selecting valid date (today or future) enables Continue button
- AC-6: Clicking Continue transitions to Step 2 — form fields/placeholder render
- AC-7: Cancel button at any step closes gate AND does NOT invoke onConfirm callback
- AC-8: Mobile responsive at 375/768/1280 — gate adapts to viewport, no horizontal scroll
- AC-9: i18n TH + EN parity for all new keys (`gate.title`, `gate.continue`, `gate.save`, `gate.cancel`, `gate.back`, `gate.invalidDate`, `gate.editAria`) — both files have all keys
- AC-10: No regression on existing 522-test baseline (sf-parity + topbar + others) — new tests count goes UP, no existing fails introduced
- AC-11: All new tests pass (`bun run test` returns 0 fail for new test file)
- AC-12: `bun run build` exit 0 + no console errors

## Validation Commands

- `cd /Users/tachongrak/Projects/hr/src/frontend && bun install --silent && bun run test 2>&1 | tee test-artifacts/2026-04-22-effective-date-gate-issue-9/test-output.txt` — Vitest full suite
- `cd /Users/tachongrak/Projects/hr/src/frontend && npx playwright test e2e/effective-date-gate.spec.ts 2>&1 | tee -a test-artifacts/2026-04-22-effective-date-gate-issue-9/test-output.txt` — E2E
- `cd /Users/tachongrak/Projects/hr/src/frontend && bun run build 2>&1 | tail -10` — production build
- `grep -c "gate.title\|gate.continue\|gate.save\|gate.cancel\|gate.back\|gate.invalidDate\|gate.editAria" messages/th.json messages/en.json` — i18n parity (both should return 7)
- Manual via browser-harness: navigate http://localhost:3000/th/profile/me → click edit pencil → verify gate flow

## Out of Scope

Explicitly deferred to Sprint 3 backend issue (will be #10 or later):
- Backend `effective_start_date` column on Employee/Employment Prisma models
- API endpoint to PUT changes with effective_date
- EmploymentState time-travel table
- Real form rendering in Step 2 (this sprint just shows placeholder text in Step 2; Sprint 3 builds actual editable form)
- Permission gating (always show edit pencil in this sprint; Sprint 3 add role check)
- Effective-date business rules beyond min=today (Sprint 3 add max=fiscal_year_end, no overlapping windows, etc.)
- Multi-section edit (one section at a time only)
- Bilingual input-pair component (Sprint 3 backend will define schema then UI follows)
