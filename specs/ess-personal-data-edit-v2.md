# ESS Self-Service Personal Data Edit — v2 (extend humi-profile-slice)

**Tracking**: aeiouboy/hr#53
**Seed**: `specs/ess-personal-data-edit-v2.seed.json`
**Supersedes**: `specs/ess-personal-data-edit.md` (v1 — halted per C7 SSoT: duplicated humi-profile-slice that already exists from ironteam #12)
**Sibling**: aeiouboy/hr#54 (approver UI — out of scope)

---

## Task Description

Issue body ของ #53 บอกว่า `/employees/me` เป็น READ-ONLY. ของจริง (2026-04-25 grep):

- `/employees/me` = redirect 15 บรรทัดไปที่ `/profile/me`
- `/profile/me` = หน้า canonical 1385 บรรทัดจาก ironteam #12 ที่ **edit + CR submit ทำงานอยู่แล้ว** ผ่าน `useHumiProfileStore` (Zustand persist, name `humi-profile-v1`)
- Existing store มี `submitChangeRequest(SubmitChangePayload)`, `addAttachment`, `adminApprove/Reject`, `toggleAdminMode` ครบ
- Existing form รองรับ 21 personal-info fields (salutationTh/En, firstNameTh/En, lastNameTh/En, DOB, nationalId, maritalStatus + spouseName, religion, bloodType, militaryStatus ฯลฯ)

**Real gap ที่ #53 ยังไม่ครอบคลุม** (เทียบ issue body vs ของจริง):

| Section (#53 คำขอ) | สถานะปัจจุบัน | ต้องทำอะไร |
|---|---|---|
| Personal Info (marital/spouse/religion/etc) | ✅ DONE (via #12) | — no-op |
| Emergency Contact (multi-row) | ❌ ไม่มีเลย | **new** — multi-row list (name / relation / phones[]) |
| Address | 🟡 flat string `draft.address` | **refactor** — split เป็น 8 structured Thai fields (houseNo/village/soi/road/subdistrict/district/province/postalCode) + migrate |
| Contact Info (multi-value phone + email) | 🟡 flat `phone`, `personalMobile`, `businessPhone`, `homePhone`, `personalEmail` | **upgrade** — array model `Phone[]` + `Email[]` with primary flag |
| Bank / Payment | ❌ ไม่มีเลย | **new** — bankCode/accountNo/holderName/bookAttachment |

งานนี้ = **extend existing humi-profile-slice + existing /profile/me/page.tsx**. ห้ามสร้าง parallel store, parallel modal, parallel pending-change type. **C7 SSoT สำคัญกว่าทุกอย่างใน spec นี้**.

Approver UI (หน้า HR อนุมัติ CR) = out of scope, ไปที่ #54.

## Objective

ส่งมอบ 3 new sections + 2 refactors บน `/profile/me` ที่ extend humi-profile-slice ผ่าน `version: 2` + `migrate()`, ผ่าน G3 gate 10/10 ACs, vitest green, โดย:

- ไม่สร้าง store / modal / type ใหม่ที่ซ้ำกับ `humi-profile-slice` / `PendingChange` / Modal in page
- Migrate flat `address` → structured 8 fields โดยไม่ทำ hydration crash (feedback_zustand_persist_version_migrate.md)
- Reuse existing `submitChangeRequest()` + `FileUploadField` + `AttachmentDropzone` (ใหม่ = AttachmentDropzone; แต่ allow fall back ใช้ FileUploadField ถ้า AttachmentDropzone integration cost > threshold — ตัดสินใจที่ Phase 2.5)

## Tech Stack

- **Framework**: Next.js 16 App Router (`src/frontend/`)
- **Runtime**: React 19 + TypeScript 5
- **State**: Zustand 4 + persist (existing `humi-profile-slice.ts` — bump `version: 2` + `migrate()`)
- **UI primitives**: `@/components/humi` (Button/Card/Modal/FormField)
- **Attachments**: `@/components/humi/FileUploadField` (existing, in-use) OR `@/components/admin/AttachmentDropzone` (newer Ken directive 2026-04-24). Builder picks one per section; spec v2 allows either but demands ONE consistent choice per section + rationale comment.
- **i18n**: next-intl via `messages/th.json` + `messages/en.json` (append new keys only; don't touch existing `humiProfile.*`, `profileEdit.*`, `pending.*` keys)
- **Tests**: vitest + @testing-library/react + jsdom

## Relevant Files

### Read-only (understand shape before editing)
- `src/frontend/src/stores/humi-profile-slice.ts` — existing store (line 7-13 ProfileDraft flat shape; line 137-153 submitChangeRequest; line 189-200 persist config name `humi-profile-v1`)
- `src/frontend/src/app/[locale]/profile/me/page.tsx` — existing 1385-line profile page (uses `useHumiProfileStore`, `FileUploadField`, 5-tab switcher with SLICE_TO_PANEL map)
- `src/frontend/src/app/[locale]/employees/me/page.tsx` — 15-line redirect (do not touch)
- `src/frontend/src/components/humi/FileUploadField.tsx` — existing attachment primitive
- `src/frontend/src/components/admin/AttachmentDropzone/AttachmentDropzone.tsx` — newer attachment primitive (Ken 2026-04-24)

### Files to EDIT (surgical)
- `src/frontend/src/stores/humi-profile-slice.ts` — extend `ProfileDraft` shape, bump `version: 2`, add `migrate()`, extend `PendingChange` with optional `sectionKey?: SectionKey`. ~60 lines added, ~4 lines touched. Max 1 file.
- `src/frontend/src/app/[locale]/profile/me/page.tsx` — add 3 new section render blocks (Emergency Contact multi-row, Address 8-field grid, Bank), refactor Contact Info render to use multi-value arrays, wire each into existing `submitChangeRequest()` flow. ~200 lines added, ~40 lines touched in existing render. Max 1 file.
- `src/frontend/messages/th.json` — append `ess` branch with new keys (existing keys untouched)
- `src/frontend/messages/en.json` — mirror `ess` keys

### Files to CREATE (new, small)
- `src/frontend/src/components/profile/EmergencyContactList.tsx` — multi-row editor (reusable). ~120 lines.
- `src/frontend/src/components/profile/Address8Editor.tsx` — 8 structured fields + cascade (or simple dropdowns if cascade hook absent). ~100 lines.
- `src/frontend/src/components/profile/BankDetailsEditor.tsx` — bankCode/accountNo/holderName + attachment. ~80 lines.
- `src/frontend/src/components/profile/ContactArrayEditor.tsx` — shared multi-value editor (one primary flag), used by Contact Info Phone[] + Email[]. ~90 lines.
- Tests: mirror under `__tests__/profile/` (4 test files)

### Files NOT touched (out of scope)
- `humi-profile-v1` consumer components OTHER than /profile/me/page.tsx (don't refactor globally)
- Approver UI — #54
- `AttachmentDropzone` itself — reuse as-is; don't modify

## Team Orchestration

### Team Members

| Mark | Phase | Deliverable |
|---|---|---|
| **MK III — Builder** | T1 | Extend humi-profile-slice (shape + migrate + sectionKey); edit /profile/me to render 3 new section blocks + upgrade Contact Info |
| **Forge Frontend — UI Builder** | T2 | Create 4 new profile/* components (EmergencyContactList, Address8Editor, BankDetailsEditor, ContactArrayEditor) + i18n keys |
| **MK VI — Test Writer** | T3 | Vitest tests for migration smoke (v1→v2 draft shape), Emergency multi-row, Address 8-field validation, Contact Info primary-flag invariant, Bank digits-only accountNo. ≥1 passing test per AC. |
| **MK IV — Validator** | T4 | Code Review + run vitest via JARVIS Bash + screenshots via browser-harness for AC-1..AC-7 + emit outcomes.json for G3 + Validate Final |

## Step by Step Tasks

| Task ID | Description | Depends On | Assigned To | Parallel |
|---|---|---|---|---|
| T1 | Extend `humi-profile-slice.ts`: add nested `emergencyContacts: EmergencyContactRow[]`, `addressStructured: Address8`, `phones: Phone[]`, `emails: Email[]`, `bank: BankDetails` to `ProfileDraft`. Add `version: 2` + `migrate(persistedState, version)` that splits flat `address` string into `addressStructured.houseNo` (best-effort) + fills other 7 fields empty. Extend `PendingChange` with optional `sectionKey?: 'emergencyContact'\|'address'\|'contact'\|'bank'\|'personal'`. Update DRAFT_DEFAULTS. Max 1 file. | — | MK III — Builder | false |
| T2 | Create 4 profile/* components: EmergencyContactList (add/remove rows; validate each row name+phone), Address8Editor (8 fields with required-markers; no cascade for now — simple province dropdown from static list OR existing picklist hook if `rg -l PROVINCE src/frontend/src/hooks` hits), BankDetailsEditor (bankCode lookup from inlined BANK list e.g. KBANK/SCB/BBL/KTB/BAY; accountNo 10-12 digits; holderName default from employee; optional attachment via FileUploadField or AttachmentDropzone — document choice in file header), ContactArrayEditor (shared multi-value — Phone[] or Email[]; primary flag invariant: one primary, can't remove last primary). Add i18n keys under `ess.*` branch. Max 4 new files + 2 i18n edits. | T1 | Forge Frontend | false (sequential — T2 wires /profile/me/page.tsx to use T1's new draft shape) |
| T3 | In same dispatch as T2 OR follow-on: edit `/profile/me/page.tsx` to render 3 new section blocks (import the 4 new components) + refactor Contact Info render to use ContactArrayEditor over arrays. Wire each section's save button to existing `submitChangeRequest()` with `sectionKey` + constructed SubmitChangePayload. Preserve all existing personal-info tabs/render (C1). ~200 lines added. Max 1 file edit. | T2 | Forge Frontend (may bundle into T2 dispatch if file budget allows) | false |
| T4 | Vitest tests: (a) migration smoke — seed `localStorage` with v1 shape, load store, assert addressStructured populated; (b) EmergencyContactList add/remove/validation; (c) Address8 required-field validation; (d) ContactArrayEditor primary-flag invariant; (e) BankDetailsEditor accountNo regex; (f) /profile/me integration — submitting one section creates one PendingChange with sectionKey. Write only — no execution. Max 6 test files. | T3 | MK VI — Test Writer | false |
| T5 | Code Review (C1 surgical — verify no parallel store/modal/type; C3 — no new abstractions over existing humi-profile-slice; C7 — single source; C10 — Thai labels). Run `bun run test` via JARVIS Bash. Capture `test-artifacts/ironteam-53-v2/test-output.txt`. Start dev server + browser-harness screenshots for AC-1..AC-7 on `/profile/me`. Emit `outcomes.json` for G3 gate. Validate Final verdict. | T4 | MK IV — Validator | false |

## Pipeline

1. **Phase 0** — issue #53 already open; we post a fresh kickoff comment marking v2 start
2. **Phase 0.5** — Prior Knowledge injected (this spec + seed v2 carries real context from grep'd existing store)
3. **Phase 1 / 1.5 / 1.6** — spec v2 valid + G1 gate PASS (this doc + seed v2)
4. **Phase 2 Build** — T1 (MK III, solo) → T2 (Forge Frontend, creates 4 components) → T3 (Forge Frontend, edits /profile/me/page.tsx — likely bundled with T2 dispatch if file budget allows)
5. **Phase 2.5 Dry-run** — JARVIS runs `bun run build` + `bunx tsc --noEmit` + C10 grep sweep; fixes import errors directly
6. **Phase 3 Test** — T4 MK VI writes tests; JARVIS runs `bun run test` via Bash
7. **Phase 3c Evidence** — capture `test-artifacts/ironteam-53-v2/test-output.txt` + post Phase 3 comment
8. **Phase 4 Code Review** — MK IV dual-role per checklist
9. **Phase 5 Validate Final** — MK IV runs validation + screenshots via browser-harness (primary) + emits `outcomes.json`
10. **Phase 5a G3 Gate** — `gate-g3.ts`; exit 1 → retry Phase 6
11. **Phase 5b Close** — sprint-log row + `gh issue close #53` with Phase 5 AC table
12. **Phase 6b Learn** — JARVIS memory write + Self-Improve on MK III/Forge Frontend/MK IV/MK VI

## Acceptance Criteria

See `specs/ess-personal-data-edit-v2.seed.json` `acceptanceCriteria`. 10 ACs:

- **AC-1** — Emergency Contact section at /profile/me renders multi-row list + add/remove + validation
- **AC-2** — Address renders 8 structured Thai fields; flat v1 `address` string migrates to `addressStructured.houseNo` best-effort
- **AC-3** — Contact Info renders multi-value Phone[] + Email[] with primary flag invariant (one primary, can't remove last primary)
- **AC-4** — Bank section renders with bankCode dropdown + digits-only accountNo + holderName + optional attachment
- **AC-5** — Personal Info tab unchanged (no regression from #12's 21-field form)
- **AC-6** — Each new section's save routes through existing `submitChangeRequest()` with `sectionKey` populated; creates exactly ONE PendingChange entry per section submit (invariant)
- **AC-7** — Pending-state UI on section header reflects existing PendingChange with matching sectionKey (reuse existing pending render pattern if present; else minimal `รอการอนุมัติ` chip)
- **AC-8** — Persist `version: 2` bump + `migrate()` runs cleanly on v1-persisted state (no hydration crash; tested via pre-seeded localStorage)
- **AC-9** — C10 Thai-primary on every new string (no SF-paren / em-dash bilingual)
- **AC-10** — Vitest suite green on new tests + no regression on existing humi tests (compare pass count before/after)

## Validation Commands

```bash
# Dry-run (Phase 2.5)
cd /Users/tachongrak/Projects/hr/src/frontend && bun run build 2>&1 | tail -20
cd /Users/tachongrak/Projects/hr/src/frontend && bunx tsc --noEmit 2>&1 | grep -v "^\.next" | head -20

# C10 sweep on touched files
grep -rnE '[A-Z][a-z]+([ -][A-Z][a-z]+){1,}' src/frontend/src/components/profile/ 2>&1 | grep -v '//' | grep -v 'import ' | head -20

# Tests (Phase 3b — JARVIS runs)
cd /Users/tachongrak/Projects/hr && mkdir -p test-artifacts/ironteam-53-v2
cd /Users/tachongrak/Projects/hr/src/frontend && bun run test 2>&1 | tee ../../test-artifacts/ironteam-53-v2/test-output.txt

# G3 (Phase 5a)
bun run /Users/tachongrak/stark/core/gate/bin/gate-g3.ts specs/ess-personal-data-edit-v2.seed.json test-artifacts/ironteam-53-v2/outcomes.json

# Close gate (Phase 5b — only if all above exit 0)
gh issue close 53 --repo aeiouboy/hr --comment "..."
```

## Out of Scope

- Approver UI / HR approval decision flow — sibling #54
- Real backend persistence / Prisma migration — existing FE mock via humi-profile-slice
- Push/email notifications — #54 or later
- Bulk edit / HR admin override — not ESS
- Global refactor of other consumers of humi-profile-slice — surgical to /profile/me only
- Replace `FileUploadField` globally with AttachmentDropzone — separate consolidation task (notes in T2 file headers)
- Province-district-subdistrict live cascade — static list in v2; real picklist pipeline is sibling task
