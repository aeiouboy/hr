# Plan: Humi Profile Edit FE E2E (Sprint 3 — Full Edit Form + Attachments + Admin Mock)

## Task Description

ขยาย Humi `/profile/me` edit form จาก 4 fields (nickname/phone/email/address) → 15+ fields ครอบคลุม 4 sections (Personal Info / Marital / Contact / Advanced) พร้อม FileUploadField สำหรับแนบเอกสารตามกฎหมายไทย (พ.ร.บ. คุ้มครองแรงงาน + PDPA) และ Admin mock approval flow.

Sprint นี้ต่อยอดจาก `humi/effective-date-gate-issue-9` ซึ่งวางโครง `EffectiveDateGate.tsx` 2-step state machine ไว้แล้ว (date → form) — sprint นี้จะ wire `onConfirm(date, values)` กลับเข้า Zustand store เป็นครั้งแรก + สร้าง pending change + attachment + admin approve loop แบบ FE-only (mock ทั้งหมด ไม่มี backend).

Humi = FE-first prototype — state อยู่ใน Zustand + localStorage, attachments เก็บเป็น base64 string. **Zero backend required.**

## Objective

ผู้ใช้ `/profile/me` สามารถ:
1. แก้ไขได้ 15+ fields (ไม่ใช่แค่ 4)
2. แนบเอกสาร (.pdf/.jpg/.png ≤ 5MB) เมื่อเปลี่ยน name / marital / NationalID / dependent
3. เห็น pending badge + Activity log ทันทีหลัง submit
4. Admin mode toggle → approve/reject → value updates live
5. Playwright E2E `profile-edit-e2e.spec.ts` pass ครบ 8 ขั้น (navigate → edit → upload → submit → approve → verify)
6. 410+ existing tests ยังผ่าน zero regression

## Tech Stack

- **Language**: TypeScript strict
- **Framework**: React 18 + Next.js 16 (App Router, `[locale]` segment)
- **Runtime**: Node.js (Next dev server)
- **State**: Zustand (extend existing `humi-profile-slice.ts`) + localStorage persist
- **Styling**: Tailwind v4 (preflight only — ห้าม global `*` reset per Rule 26b)
- **i18n**: next-intl (existing `messages/th.json` + `messages/en.json`)
- **File handling**: native FileReader API → base64 string (NO new deps)
- **Testing**: vitest + jsdom (existing config) + Playwright (existing)

## Technical Design

### Architecture

```
User clicks "แก้ไข" pencil
  → Section opens inline edit form (15+ fields across 4 sub-sections)
  → User changes field + EffectiveDateGate.tsx asks for date
  → onConfirm(date, values) → submitChangeRequest() action
  → Zustand store.pendingChanges.push({id, field, oldValue, newValue, effectiveDate, attachments[], status:'pending'})
  → localStorage persist
  → Toast "ส่งคำขออนุมัติแล้ว"
  → Field shows badge "รออนุมัติ"

Admin mode toggle (topbar)
  → Each pending change renders "อนุมัติ"/"ปฏิเสธ" buttons
  → adminApprove(id) → flips pendingChanges[i].status='approved' + mutates displayed field
  → Toast "อนุมัติแล้ว"

FileUploadField (atom)
  → drag-drop OR click-to-browse
  → validate mime + size (≤ 5MB)
  → FileReader.readAsDataURL() → base64
  → Store in Zustand pendingChanges[i].attachments[]
  → Preview: filename + size + remove button
```

### Key Design Decisions

1. **Base64 in localStorage** — FE-only prototype. 5MB cap prevents quota overflow (localStorage ~5-10MB). No Blob URL, no IndexedDB — simplest path (C3).
2. **Attachment required = FE validation only** — Submit button disabled until required category has ≥1 file. No backend enforcement.
3. **Admin mode = Zustand boolean** — no role system, just a toggle. Topbar button visible always (Humi prototype convention).
4. **EffectiveDateGate reused, not re-built** — only wire `onConfirm` to store. Preserve 2-step state machine + 77 existing tests.
5. **Pending changes = separate array** — don't mutate field directly. `pendingChanges[]` holds all requests, field display checks `pendingChanges.find(pc => pc.field === X && pc.status === 'pending')` for badge.
6. **Rule 26b guard** — audit `globals.css` before commit, reject any `* { margin: 0; padding: 0 }` introduced by auto-format.

## Relevant Files

**NEW (2 files)**
- `src/frontend/src/components/humi/FileUploadField.tsx` (~150 LOC) — atom: drag-drop zone + click-browse + base64 conversion + preview + remove. Props: `{value: Attachment[], onChange, accept, maxSizeMB, required?}`.
- `src/frontend/e2e/profile-edit-e2e.spec.ts` — Playwright 8-step scenario (AC-10).

**EDIT (5 files)**
- `src/frontend/src/stores/humi-profile-slice.ts` — add types `Attachment`, `PendingChange`; add state `pendingChanges[]`, `adminMode: boolean`; add actions `submitChangeRequest`, `adminApprove`, `adminReject`, `toggleAdminMode`, `addAttachment`, `removeAttachment`. Preserve existing draft/persistence.
- `src/frontend/src/app/[locale]/profile/me/page.tsx` — expand edit sections (4 sub-sections with 15+ fields), add Admin mode toggle in topbar, wire toast (existing `useToast`).
- `src/frontend/src/components/profile/EffectiveDateGate.tsx` — keep 2-step state machine; change `onConfirm(date, values)` to dispatch `submitChangeRequest` via new prop `onSubmit`.
- `src/frontend/src/components/profile/tabs/personal-info.tsx` — remove "Sprint 3 coming" placeholder, render full 15+ field edit form grouped in 4 sub-sections.
- `src/frontend/messages/th.json` + `src/frontend/messages/en.json` — new keys under `profile.edit.*`, `profile.attachment.*`, `profile.pending.*`, `profile.admin.*`.

**DO NOT TOUCH (C1)**
- ที่เหลือทั้งหมดของ Humi 11 screens (employment-info, leave, payroll, etc.)
- AppShell, theme, locale switcher
- Existing 410+ tests (must stay green)

## Team Orchestration

JARVIS orchestrates — never touches code directly. Each task assigned to one Mark.

### Team Members

- **Frontend Builder A (Foundation)**
  - Name: frontend-builder-a
  - Agent: Forge Frontend — UI Builder
  - Role: Store slice + FileUploadField atom (2 files, foundation layer)

- **Frontend Builder B (Integration)**
  - Name: frontend-builder-b
  - Agent: Forge Frontend — UI Builder
  - Role: Profile page + EffectiveDateGate wire + personal-info section + i18n (5 files, depends on Builder A's Zustand interface)

- **Test Writer**
  - Name: test-writer
  - Agent: MK VI — Test Writer
  - Role: vitest unit (store actions + FileUploadField) + Playwright E2E (`profile-edit-e2e.spec.ts`)

- **Code Reviewer**
  - Name: code-reviewer
  - Agent: MK II — Code Reviewer
  - Role: Quality + security + 30-second readability + C1/C3/C6/Rule 26b audit

- **Validator**
  - Name: validator
  - Agent: MK IV — Validator
  - Role: Run vitest + Playwright + browser-harness screenshots (375/768/1440) + zero-regression check (410+ tests)

## Step by Step Tasks

### 1. Extend Zustand Store + FileUploadField Atom

- **Task ID**: build-foundation
- **Depends On**: none
- **Assigned To**: frontend-builder-a
- **Parallel**: true
- **Files**:
  - `src/frontend/src/stores/humi-profile-slice.ts`
  - `src/frontend/src/components/humi/FileUploadField.tsx`
- **Actions**:
  - Define types in slice: `Attachment = {id, filename, size, base64, mime}`, `PendingChange = {id, field, oldValue, newValue, effectiveDate, attachments: Attachment[], status: 'pending'|'approved'|'rejected', createdAt}`
  - Add state: `pendingChanges: PendingChange[]`, `adminMode: boolean`
  - Add actions: `submitChangeRequest(payload)`, `adminApprove(id)`, `adminReject(id)`, `toggleAdminMode()`, `addAttachment(changeId, file)`, `removeAttachment(changeId, attachmentId)`
  - Preserve existing `draft` + localStorage persist
  - Build FileUploadField:
    - Props `{value, onChange, accept='.pdf,.jpg,.png', maxSizeMB=5, required=false}`
    - Drag-drop zone + `<input type=file>` fallback
    - Validate mime + size → FileReader.readAsDataURL → base64
    - Preview list: filename + KB + remove (×) button
    - Error states → surface via toast (C6: no silent catch)
    - NO global CSS reset (Rule 26b)

### 2. Wire Profile Page + EffectiveDateGate + Personal Info + i18n

- **Task ID**: build-integration
- **Depends On**: build-foundation
- **Assigned To**: frontend-builder-b
- **Parallel**: false
- **Files**:
  - `src/frontend/src/app/[locale]/profile/me/page.tsx`
  - `src/frontend/src/components/profile/EffectiveDateGate.tsx`
  - `src/frontend/src/components/profile/tabs/personal-info.tsx`
  - `src/frontend/messages/th.json`
  - `src/frontend/messages/en.json`
- **Actions**:
  - Expand `personal-info.tsx` edit form from 4 → 15+ fields in 4 sub-sections:
    - **Personal Info**: salutation, firstName TH/EN, lastName TH/EN, nickname, dob, nationality
    - **Marital**: maritalStatus, maritalStatusSince, dependents[] (name, relation, dob)
    - **Contact**: phone, email, address
    - **Advanced**: nationalID, nationalIDExpiry
  - Update `EffectiveDateGate`: replace existing `onConfirm` internal completion with new prop `onSubmit({field, newValue, effectiveDate, attachments})` that calls `submitChangeRequest` via store hook
  - On page.tsx topbar: add Admin mode toggle (Switch component), when ON → render approve/reject buttons per pending change
  - Wire toast: `"profile.toast.submitted"`, `"profile.toast.approved"`, `"profile.toast.rejected"`
  - Change category → attachment required mapping (FE validation — disable submit until file present):
    - name change (salutation/firstName/lastName TH+EN) → requires ช.3
    - maritalStatus/maritalStatusSince → requires ทะเบียนสมรส/หย่า
    - nationalID → requires บัตรใหม่
    - dependents add → requires สูติบัตร
  - Activity tab entry: timestamp + field label + attachment thumbnail (click → open base64 in new tab)
  - i18n parity: every new key in both th.json + en.json
  - Mobile: `<768px` → edit form renders in full-height drawer (slide-up)
  - Remove "Sprint 3 coming" placeholder

### 3. Write Tests

- **Task ID**: write-tests
- **Depends On**: build-foundation, build-integration
- **Assigned To**: test-writer
- **Parallel**: false
- **Files**:
  - `src/frontend/src/stores/__tests__/humi-profile-slice.test.ts` (extend)
  - `src/frontend/src/components/humi/__tests__/FileUploadField.test.tsx` (NEW)
  - `src/frontend/e2e/profile-edit-e2e.spec.ts` (NEW)
- **Actions**:
  - Unit (vitest + jsdom, reuse existing config per Rule 93):
    - `submitChangeRequest` creates pending record with attachments (AC-4)
    - `adminApprove` flips status + mutates field (AC-6)
    - `adminReject` flips status, does NOT mutate field
    - `addAttachment` validates ≤ 5MB, rejects oversize with error
    - FileUploadField renders preview after upload
    - FileUploadField drag-drop triggers onChange
    - localStorage persist roundtrip for `pendingChanges`
  - Playwright E2E `profile-edit-e2e.spec.ts` — 8 steps exactly per AC-10:
    1. Navigate `/th/profile/me`
    2. Click Edit pencil on "ชื่อ-นามสกุล"
    3. Change firstName TH, effective date = today
    4. Upload mock `.pdf` fixture via FileUploadField
    5. Submit → assert toast "ส่งคำขออนุมัติแล้ว" + pending badge
    6. Toggle Admin mode → click "อนุมัติ"
    7. Assert toast "อนุมัติแล้ว" + firstName display updated
    8. Navigate Activity tab → assert log entry + thumbnail
  - Traceability: every test block has comment `// AC-N` referencing acceptance ID

### 4. Code Review

- **Task ID**: code-review
- **Depends On**: write-tests
- **Assigned To**: code-reviewer
- **Parallel**: false
- **Actions**:
  - C1 audit: diff limited to 7 files (no bleed into other Humi screens)
  - C3 audit: FileUploadField ≤ 150 LOC, no premature abstraction
  - C6 audit: every `catch` has `console.warn` or toast surfacing
  - Rule 26b: grep `globals.css` for `\* {` — reject any global reset
  - Rule 93: verify test files exist in existing vitest config path
  - 30-second readability: each function self-explanatory without scrolling
  - i18n parity: th.json + en.json key count matches (no orphan EN keys)
  - Fix issues directly (don't just report)

### 5. Validate Final Output

- **Task ID**: validate-all
- **Depends On**: code-review
- **Assigned To**: validator
- **Parallel**: false
- **Actions**:
  - Run `cd src/frontend && npm run build 2>&1 | tail -5` — must show 0 errors (Rule 92 dry-run)
  - Run `cd src/frontend && npx vitest run 2>&1` — capture actual output, total must be ≥ 410+ tests passing (zero regression)
  - Run `cd src/frontend && npx playwright test e2e/profile-edit-e2e.spec.ts 2>&1` — capture pass/fail
  - browser-harness screenshots at 375 / 768 / 1440 px (Rule 30 — browser-harness PRIMARY):
    - `/th/profile/me` default view
    - Edit form open (ชื่อ-นามสกุล section)
    - FileUploadField after upload (shows preview)
    - Pending badge visible
    - Admin mode ON — approve/reject buttons
    - Mobile drawer 375px
  - Zoom-verify screenshots pixel-level (Rule 62) — no overlap, Thai text whitespace-nowrap applied
  - Paste actual terminal output in issue #12 comment (C2 — no fabrication)
  - If fail → send back to Builder (max 2 retries per Rule)

## Pipeline

```
Build-A (foundation) ──┐
                        ├─→ Build-B (integration) → Write Tests → Code Review (MK II) → Validate Final (MK IV)
                        │                                                                       ↓
                        │                                                          FAIL? → fix → re-review → re-validate
                        │                                                                  (max 2 retries → escalate)
                        └─ (Test Writer may draft test skeletons in parallel with Build-B once Build-A store interface is exported)
```

If validator fails → Builder fixes → re-run Code Review → Validate Final.
After 2 failed retries → JARVIS escalates to Ken with full terminal output + screenshots.

## Acceptance Criteria

- **AC-1**: Edit form expanded from 4 → 15+ fields across 4 sub-sections (Personal Info / Marital / Contact / Advanced). All typed into Zustand `draft` state, persisted via localStorage.
- **AC-2**: FileUploadField atom component supports drag-drop + click-to-browse, accepts `.pdf`/`.jpg`/`.png`, max 5MB validation, preview shows filename + size + remove button. Stored as base64 string in Zustand.
- **AC-3**: Change categories requiring attachment (FE validation — submit disabled without):
  - Name change (salutation, firstName, lastName, TH+EN) → ช.3 หนังสือสำคัญเปลี่ยนชื่อ
  - Marital status + maritalStatusSince → ทะเบียนสมรส/หย่า
  - NationalID re-issue → บัตรประชาชนใหม่
  - Add dependent → สูติบัตร
- **AC-4**: `EffectiveDateGate.tsx` `onConfirm(date, values)` wired to new Zustand action `submitChangeRequest({field, newValue, effectiveDate, attachments[]})`. Creates pending record in store.
- **AC-5**: Pending changes show badge "รออนุมัติ" next to field + entry in Activity/Docs tab with timestamp + uploaded file preview (click to preview).
- **AC-6**: Admin mock approval — toggle "โหมด Admin" in topbar. When ON, each pending change shows "อนุมัติ" + "ปฏิเสธ" buttons. Click approve → pending flipped to approved + displayed field value updated.
- **AC-7**: Toast notifications:
  - Submit: "ส่งคำขออนุมัติแล้ว — รอ HR ตรวจสอบ"
  - Admin approve: "อนุมัติแล้ว"
  - Admin reject: "ปฏิเสธแล้ว"
- **AC-8**: Mobile responsive — edit form renders in drawer (full-height slide-up) สำหรับ `<768px`. Attachment preview adapts narrow viewport.
- **AC-9**: i18n parity — all new strings in `messages/th.json` + `messages/en.json`. Key naming: `profile.edit.{field}`, `profile.attachment.{action}`, `profile.pending.{state}`, `profile.admin.{action}`.
- **AC-10**: Playwright E2E scenario `e2e/profile-edit-e2e.spec.ts` passes all 8 steps (navigate → edit → upload → submit → pending badge → admin approve → verify display update → Activity log).
- **AC-11**: Zero regression — `npx vitest run` shows ≥ 410 tests passing (current baseline from inherited branch).
- **AC-12**: Rule 26b compliance — no global `* { margin: 0; padding: 0 }` in any CSS file; `grep -r "^\* {" src/frontend/**/*.css` returns empty.
- **AC-13**: Code review approved (no blocker comments from MK II).

## Validation Commands

```bash
# Phase 2.5 — dry-run build
cd src/frontend && npm run build 2>&1 | tail -5

# Phase 3b — unit tests (zero regression = 410+ passing)
cd src/frontend && npx vitest run 2>&1 | tee /tmp/humi-vitest.log
grep -E "Tests|passed|failed" /tmp/humi-vitest.log

# Phase 3b — E2E
cd src/frontend && npx playwright test e2e/profile-edit-e2e.spec.ts 2>&1 | tee /tmp/humi-e2e.log

# Phase 3b — Rule 26b guard
grep -rn "^\* {" src/frontend/**/*.css && echo "FAIL: global reset found" || echo "PASS: no global reset"

# Phase 5 — browser-harness screenshots (Rule 30 PRIMARY)
# Validator crafts harness python script at Phase 5 time for:
#   /th/profile/me at 375 / 768 / 1440
#   Edit form open / FileUploadField preview / Pending badge / Admin mode buttons / Mobile drawer
# Save to: screenshots/humi-profile-edit-e2e/<viewport>-<state>.png

# Manual check: localStorage roundtrip
#   1. Submit a change in dev server
#   2. Refresh page
#   3. Verify pending badge still visible + attachment still previews (base64 persisted)
```

## Out of Scope

- Real backend persistence (Humi = FE prototype — backend epic in separate sprint)
- HR workflow engine (multi-level approval, escalation rules) — Admin mock is single-click approve only
- Other 11 Humi screens (employment-info edit, leave request form, payroll, performance, etc.)
- File upload to real storage (S3/Azure Blob) — base64 in localStorage only
- OCR / document validation — upload accepts any matching mime, no content inspection
- Email notifications on approval/rejection
- Audit log export / PDPA data subject request flow
- Password / 2FA / role-based access control
- Analytics events (mixpanel/GA) on submit/approve
