# Plan: ESS Termination Request — wire `/resignation` ผ่าน humi-profile-slice

## Prior Knowledge (read before any builder action)

ก่อน build ต้องเข้าใจ context นี้ — มิเช่นนั้นจะ duplicate state mechanism + เกิด C10 violation ซ้ำ

### Repo conventions (mandatory)
- **Convention C10 — Thai-primary labels** ทุก label ต้องเป็นภาษาไทยล้วน เลี่ยง bilingual SF-style ในวงเล็บ. **Allowed**: locale codes `(TH)/(EN)/(VN)` + role acronyms (HRBP/SPD)
- **Lucide-react no-emoji** icons ใช้ `lucide-react` ห้าม raw emoji ใน JSX (rule sweep 2026-04-23)
- **Design tokens** ใช้ `text-ink`, `text-ink-muted`, `bg-surface`, `border-hairline` — ห้าม Tailwind raw color (`text-gray-500`, `bg-white`)

### C10 anti-patterns พบใน prior PR-extractor (ห้ามเขียนซ้ำ)
- `อบหมายปฏิบัติการรักษาการตำแหน่ง (Archetype B contextual action)` ← engineering jargon ในวงเล็บ
- `ย้ายข้อมูล (Data Migration)` ← bilingual duplicate
- `ส่วนงาน (Division)` / `ฝ่ายงาน (Function)` ← English-in-paren ที่ไม่ใช่ locale code

### Anchor lines ของ prior art (Phase 0.6 interview Q3)
- `src/frontend/src/stores/humi-profile-slice.ts:41,92-143,266-296` — `SectionKey` discriminator (line 38), `PendingChange` interface (92-104), `submitChangeRequest` action (202-217), Zustand persist v2 + `migrate()` (266-296)
- `src/frontend/src/components/resignation/resignation-page.tsx:14-106` — เดิม 230 LOC form + 3-tab UI (recording/clearance/settlement) ครบ ขาดแค่ persist
- `src/frontend/src/hooks/use-resignation.ts:1-113` — เดิม mock-only `useState` ต้อง replace ด้วย humi-profile-slice subscription
- `src/frontend/src/app/[locale]/admin/employees/[id]/terminate/page.tsx:418-426,535-544` — `<ReasonPicker event="5597">` + `<AttachmentDropzone>` primitives
- `src/frontend/src/components/admin/lifecycle/ReasonPicker.tsx:17-37,42-46,49-50` — ปัจจุบันมี 17 TERM_* codes; **EVENT_REASONS['5597'] ไม่มี RESIGN_* subset** ต้อง extend

## Task Description

EXTEND existing 912-LOC prior art (resignation-page.tsx 230 + use-resignation.ts 113 + humi-profile-slice 569) เพื่อให้ ESS termination request flow ของ employee submit ผ่าน humi-profile-slice `PendingChange` SSoT (replacing mock `useState`) + แสดง 4 voluntary reason codes (Ken U2) + link จาก `/profile/me` Employment tab (Ken U1).

Target builder write ≈ 150 LOC (extend, ไม่ใช่ rewrite).

## Objective

After this run:
1. Employee submit ที่ `/resignation` → record persists ใน Zustand `humi-profile-slice.pendingChanges[]` ด้วย `sectionKey: 'termination'`
2. Refresh หน้า → record รอด (localStorage) — ไม่ใช่ mock data หาย
3. Reason picker แสดง 4 voluntary codes เท่านั้น (ไม่ใช่ 17 admin codes)
4. `/profile/me` Employment tab มี link ไป `/resignation` (Ken U1 keep separate)
5. All unit tests green + Phase 4.5 Validator Triad APPROVE

## Tech Stack

- **Language**: TypeScript
- **Framework**: Next.js 16 (App Router)
- **State**: Zustand 4 + `persist` middleware (existing humi-profile-slice)
- **UI Primitives**: existing `<ReasonPicker>`, `<AttachmentDropzone>`, `<Card>`, `<Button>` from `src/frontend/src/components`
- **i18n**: `next-intl` (existing `resignation` namespace)
- **Testing**: vitest + @testing-library/react + jsdom

## Technical Design

### Architecture

```
/resignation route
   ↓
ResignationPage (extend submitResignation handler)
   ↓
useResignation hook (replace useState with useHumiProfileStore subscription)
   ↓
humi-profile-slice.submitChangeRequest({sectionKey:'termination', ...})
   ↓
PendingChange[] (Zustand persist v2 → localStorage)
   ↑
/profile/me Employment tab → <Link href="/resignation"> (Ken U1)
```

### Key Design Decisions

1. **EXTEND not BUILD** — Phase 0.6 interview confirmed 912 LOC prior art ครบ ขาดแค่ wiring. ห้าม invent new state mechanism (C3 simplicity, C7 SSoT)
2. **`SectionKey` extension** — current type union (`'emergencyContact' | 'address' | 'contact' | 'bank' | 'personal'`) เพิ่ม `'termination'` member; bump persist `version: 3` + add migrate fn (no-op สำหรับ v2→v3 เพราะ pendingChanges schema ไม่เปลี่ยน เพิ่มแค่ enum value)
3. **ReasonPicker subset prop** — แทนที่จะ hard-code subset ใน ResignationPage ให้ extend ReasonPicker ด้วย optional prop `mode?: 'admin' | 'ess-voluntary'`; default `'admin'` (preserve existing /admin/terminate behavior). `ess-voluntary` filter EVENT_REASONS['5597'] ↓ 4 codes
4. **4 voluntary RESIGN_* codes** — เพิ่มใน `EVENT_REASON_LABELS` (Thai-primary):
   - `RESIGN_PERSONAL` = `'ลาออกด้วยเหตุส่วนตัว'`
   - `RESIGN_STUDY` = `'ลาออกเพื่อศึกษาต่อ'`
   - `RESIGN_FAMILY` = `'ลาออกด้วยเหตุครอบครัว'`
   - `RESIGN_OTHER` = `'ลาออกด้วยเหตุอื่น'`
5. **useResignation rewrite** — read from `useHumiProfileStore.pendingChanges.find(pc => pc.sectionKey === 'termination')`; `submitResignation` calls `submitChangeRequest({sectionKey:'termination', field:'employmentStatus', oldValue:'active', newValue:'pending_termination', effectiveDate: lastWorkingDate, attachmentIds: []})`
6. **Profile link** — เพิ่ม `<Link href={`/${locale}/resignation`}>` ใน profile/me Employment tab panel (panelKey `'job'`); ใช้ design tokens + lucide icon (`<FileX>`)

### Out-of-scope reaffirmation
- ห้ามแตะ `/admin/employees/[id]/terminate` (HR Admin path — #18 ship แล้ว)
- ห้าม fold ResignationPage เข้า profile/me (Ken U1 keep separate)
- ห้าม implement SPD approval lane / payroll cron / e-signing (separate BRDs)
- ห้าม backend resignation API (mock OK for MVP — humi-profile-slice = FE-only SSoT)

## Relevant Files

- `src/frontend/src/components/resignation/resignation-page.tsx` — extend handleSubmitResignation; swap `<textarea reason>` → `<ReasonPicker mode="ess-voluntary">`; keep existing 3-tab UI
- `src/frontend/src/hooks/use-resignation.ts` — rewrite ~70 LOC: replace `useState` with `useHumiProfileStore` subscription; map `PendingChange.newValue/effectiveDate/sectionKey='termination'` → `ResignationRecord` shape for backward-compat with existing 3-tab render
- `src/frontend/src/stores/humi-profile-slice.ts` — extend `SectionKey` union ด้วย `'termination'` (line 38); bump persist `version: 2 → 3`; add `migrate()` v2→v3 no-op branch
- `src/frontend/src/components/admin/lifecycle/ReasonPicker.tsx` — add 4 RESIGN_* entries to `EVENT_REASON_LABELS` (lines 16-35); add `mode?: 'admin' | 'ess-voluntary'` prop; when mode='ess-voluntary' filter EVENT_REASONS['5597'] → 4 codes
- `src/frontend/src/app/[locale]/profile/me/page.tsx` — add `<Link>` ใน Employment tab (panelKey `'job'`) ไปยัง `/${locale}/resignation`; reuse `<FileX>` lucide icon + design tokens

## Team Orchestration

JARVIS orchestrates — never touches code directly. Each task assigned to one Mark.

### Team Members

- **Frontend Builder**
  - Name: frontend-builder
  - Agent: MK III — Builder (Forge Frontend specialty)
  - Role: Extend humi-profile-slice + useResignation + ResignationPage + ReasonPicker + profile/me link (~150 LOC)

- **Test Writer**
  - Name: test-writer
  - Agent: MK VI — Test Writer
  - Role: vitest unit tests สำหรับ AC-1..AC-6 + RTL render tests + Zustand persist round-trip test

- **Code Reviewer**
  - Name: code-reviewer
  - Agent: MK II — Code Reviewer
  - Role: C1 surgical, C3 simplicity, C7 SSoT, C10 Thai-primary sweep, 30-second readability

- **Validator**
  - Name: validator
  - Agent: MK IV — Validator
  - Role: รัน vitest + npm run build; verify ทุก AC; capture terminal output

## Step by Step Tasks

### 1. Extend humi-profile-slice + ReasonPicker primitives (foundation)
- **Task ID**: extend-store-and-picker
- **Depends On**: none
- **Assigned To**: frontend-builder
- **Parallel**: false
- **Files**:
  - `src/frontend/src/stores/humi-profile-slice.ts`
  - `src/frontend/src/components/admin/lifecycle/ReasonPicker.tsx`
- **Actions**:
  - Add `'termination'` to `SectionKey` type union (line 38)
  - Bump persist `version: 2 → 3` (line 267); add v2→v3 no-op branch ใน `migrate()`
  - Add 4 RESIGN_* entries to `EVENT_REASON_LABELS` (Thai-primary, NO bilingual)
  - Add optional `mode?: 'admin' | 'ess-voluntary'` to `ReasonPickerProps`; default `'admin'`
  - When `mode === 'ess-voluntary'` + `event === '5597'`, filter `EVENT_REASONS['5597']` to `['RESIGN_PERSONAL','RESIGN_STUDY','RESIGN_FAMILY','RESIGN_OTHER']`
  - Preserve existing /admin/terminate caller behavior (no breaking change)

### 2. Rewrite useResignation hook + extend ResignationPage submit
- **Task ID**: wire-hook-and-page
- **Depends On**: extend-store-and-picker
- **Assigned To**: frontend-builder
- **Parallel**: false
- **Files**:
  - `src/frontend/src/hooks/use-resignation.ts`
  - `src/frontend/src/components/resignation/resignation-page.tsx`
- **Actions**:
  - useResignation: replace `useState<ResignationRecord>` ด้วย `useHumiProfileStore((s) => s.pendingChanges.find(pc => pc.sectionKey === 'termination'))`
  - Map `PendingChange { newValue, effectiveDate, requestedAt }` → `ResignationRecord` shape (เก็บ clearanceItems mock ไว้ — out of scope ที่จะ persist)
  - `submitResignation`: call `useHumiProfileStore.getState().submitChangeRequest({ sectionKey:'termination', field:'employmentStatus', oldValue:'active', newValue: reasonCode, effectiveDate: lastWorkingDate, attachmentIds: [] })`
  - ResignationPage: swap `<textarea reason>` → `<ReasonPicker event="5597" mode="ess-voluntary" value={formData.reason} onChange={(code) => setFormData(p => ({...p, reason: code}))} required />`
  - Preserve existing 3-tab UI (recording/clearance/settlement) — ไม่แตะ
  - Keep handover textarea + lastWorkingDate input
  - Replace English labels (`Last Working Date`, `Submit Resignation`, `Cancel`, `Start Resignation Process`, `Reason`, `Handover Notes`, `Please provide your reason...`, `Notes about knowledge...`) ด้วย Thai-primary i18n keys (use existing `resignation` namespace + add missing keys)

### 3. Add `/resignation` link from profile/me Employment tab
- **Task ID**: link-from-profile
- **Depends On**: wire-hook-and-page
- **Assigned To**: frontend-builder
- **Parallel**: false
- **Files**:
  - `src/frontend/src/app/[locale]/profile/me/page.tsx`
- **Actions**:
  - Locate Employment tab panel (slice tab `'employment'` → panelKey `'job'`, ดู line 41 + line 174)
  - Add card/section ใน job panel: Thai label "การลาออก" + lucide `<FileX>` icon + `<Link href={\`/${locale}/resignation\`}>` ปุ่ม "ดูคำขอลาออก / ส่งคำขอลาออก"
  - Use design tokens (`text-ink`, `bg-surface`, `border-hairline`) — NO Tailwind raw colors
  - C1 surgical: ห้ามแตะ panel อื่น

### 4. Write Tests (MANDATORY)
- **Task ID**: write-tests
- **Depends On**: extend-store-and-picker, wire-hook-and-page, link-from-profile
- **Assigned To**: test-writer
- **Parallel**: false
- **Files**:
  - `src/frontend/src/stores/__tests__/humi-profile-slice.termination.test.ts` (new)
  - `src/frontend/src/hooks/__tests__/use-resignation.test.tsx` (new or extend)
  - `src/frontend/src/components/resignation/__tests__/resignation-page.test.tsx` (new or extend)
- **Actions**:
  - Unit: `submitChangeRequest({sectionKey:'termination', ...})` round-trip — pendingChanges array ได้ entry ใหม่ + `sectionKey === 'termination'`
  - Unit: persist version bump (v3) + migrate v2→v3 no-op (existing v2 state survives)
  - Unit: ReasonPicker `mode='ess-voluntary'` แสดงเฉพาะ 4 RESIGN_* codes; `mode='admin'` (default) ยังคง 17 codes
  - RTL: ResignationPage submit form → useHumiProfileStore.getState().pendingChanges has 1 entry with sectionKey='termination'
  - RTL: ResignationPage ReasonPicker dropdown displays 4 Thai labels (no English in paren beyond locale codes)
  - RTL: profile/me Employment tab renders link with href `/${locale}/resignation`
  - Add traceability comment: `// AC-1..AC-6 from spec ess-termination-request.md`

### 5. Code Review (MANDATORY)
- **Task ID**: code-review
- **Depends On**: write-tests
- **Assigned To**: code-reviewer
- **Parallel**: false
- **Actions**:
  - C1 surgical: ทุกบรรทัดที่เปลี่ยน trace กลับ AC ได้
  - C3 simplicity: ≤ 150 LOC builder write — ถ้าเกิน flag scope creep
  - C7 SSoT: `useResignation` ห้ามมี `useState` สำหรับ termination state (ต้อง subscribe humi-profile-slice เท่านั้น)
  - C10 grep gate: `grep -niE "\\([A-Z][a-zA-Z ]+\\)" src/frontend/src/components/resignation src/frontend/src/components/admin/lifecycle/ReasonPicker.tsx src/frontend/src/hooks/use-resignation.ts` → จับ SF-bilingual; reject ถ้าเจอ (allow only `(TH)/(EN)/(VN)` + acronyms)
  - 30-second readability: ResignationPage submit handler อ่านเข้าใจใน 30 วินาที
  - Fix issues directly — ห้าม just-report

### 6. Validate Final Output (MANDATORY)
- **Task ID**: validate-all
- **Depends On**: code-review
- **Assigned To**: validator
- **Parallel**: false
- **Actions**:
  - Run `cd src/frontend && npm test -- --run` — paste actual terminal output (Rule C2)
  - Run `cd src/frontend && npm run build` — verify 0 TS errors
  - Verify ทุก 6 AC ผ่าน + 0 net-new failing tests vs baseline
  - browser-harness screenshot ของ `/resignation` แสดง 4 RESIGN_* labels + `/profile/me` Employment tab link visible (Rule 30)
  - If fail → ส่งกลับ frontend-builder (max 2 retries → escalate Ken)

## Pipeline

```
Build (extend store + picker → wire hook + page → link profile)
   → Write Tests (vitest + RTL)
   → Code Review (MK II — C1/C3/C7/C10 sweep)
   → Validate Final (MK IV — npm test + build + screenshots)
       ↓
   FAIL? → fix → re-review → re-validate
        (max 2 retries → escalate)
```

## Acceptance Criteria

ทุก AC trace กลับ Phase 0.6 interview Q4 / Ken U1+U2 / BRD #172.

- **AC-1**: `/resignation` submission persists ผ่าน `useHumiProfileStore.submitChangeRequest({sectionKey:'termination', ...})` — `pendingChanges[]` array ได้ entry ใหม่ที่ `sectionKey === 'termination'` (ref: interview Q4 item 1)
- **AC-2**: `useResignation` hook อ่านจาก `useHumiProfileStore.pendingChanges` ไม่ใช่ local `useState` — `git grep -nE "useState.*ResignationRecord" src/frontend/src/hooks/use-resignation.ts` returns 0 matches (ref: interview Q4 item 2 + C7 SSoT)
- **AC-3**: ReasonPicker `mode='ess-voluntary'` แสดงเฉพาะ 4 codes (`RESIGN_PERSONAL`, `RESIGN_STUDY`, `RESIGN_FAMILY`, `RESIGN_OTHER`) — RTL test counts dropdown options === 4 (ref: Ken U2 voluntary subset)
- **AC-4**: หลัง submit สำเร็จ → ResignationPage status timeline แสดง state `'submitted'` step active (ref: interview Q4 item 4 + existing line 142-152 timeline render)
- **AC-5**: `/profile/me` Employment tab มี link ไปยัง `/${locale}/resignation` — RTL `getByRole('link')` matches href pattern + visible Thai label (ref: Ken U1 keep separate + link from profile)
- **AC-6**: All unit tests green + `npm run build` exits 0 + Phase 4.5 Validator Triad APPROVE — captured terminal output ใน validator report (ref: interview Q4 item 6 + Rule C2)

## Validation Commands

- `cd src/frontend && npm test -- --run` — vitest 0 failures
- `cd src/frontend && npm run build` — 0 TS errors, 0 build errors
- `cd src/frontend && grep -nE "\\([A-Z][a-zA-Z ]+\\)" src/components/resignation src/components/admin/lifecycle/ReasonPicker.tsx src/hooks/use-resignation.ts` — 0 matches (C10 gate)
- Manual (browser-harness): นำเข้า `/resignation` → กรอกฟอร์ม → submit → refresh → record รอด → กลับ `/profile/me` Employment tab → link visible

## Out of Scope

(ตาม Phase 0.6 interview Q5 + Ken decisions)

- HR Admin terminate path (`/admin/employees/[id]/terminate`) — ship แล้ว #18, ห้ามแตะ
- SPD approval lane (separate BRD)
- Payroll cutoff cron (BRD #117 family — Sprint 2)
- E-signing (BRD #197 — Sprint 2)
- 17-canonical reason code parity ใน ESS — Ken U2: voluntary subset 4 codes only
- Fold ResignationPage เข้า /profile/me tab — Ken U1: keep separate
- Backend resignation API — humi-profile-slice = FE-only SSoT, mock OK สำหรับ MVP
- Persist clearanceItems / settlement ใน Zustand — เก็บ mock state สำหรับ 3-tab render (Sprint 2 wire to backend)
