# ESS Self-Service Personal Data Edit — Change Request Flow

**Tracking**: aeiouboy/hr#53
**Seed**: `specs/ess-personal-data-edit.seed.json` (G1 PASS 0.0% ambiguity, 2026-04-24)
**Sibling**: aeiouboy/hr#54 (approver UI — out of scope here)

---

## Task Description

ปัจจุบัน `/employees/me` เป็นหน้า **read-only** (การ์ด 3 ส่วน: contact / job / personal) — ไม่มีปุ่มแก้ไข ไม่มี change-request flow.

ต้องเปิดให้พนักงานแก้ไขข้อมูลส่วนตัว 5 ส่วน (Emergency Contact / Address / Contact Info / Bank / Personal Info) โดยทุก save **ไม่แตะ master record ตรง ๆ** — ต้อง route ผ่าน Change Request submit → HR approval → apply ในวันที่มีผล (BRD SH6-SH8).

งานนี้ครอบคลุมฝั่ง **submit ของพนักงาน** เท่านั้น; approver UI (รวมถึงหน้าอนุมัติของ HR) แยกไปอยู่ที่ #54.

## Objective

ส่งมอบ 5 section edit flows + shared ChangeRequestSubmitModal + pending-state chip + Zustand draft store ที่ผ่าน G3 gate 10/10 ACs และ vitest suite green, โดยเฉพาะ:

- ลด gap ESS ที่ใหญ่ที่สุดของ Phase 1 (ปัจจุบัน user ทำ self-service ไม่ได้เลย)
- สร้าง shared primitives ที่ sibling #54 (approver UI) จะ consume ต่อ
- ยืนยัน pattern BRD SH6-SH8 (submit → approve → effective-date apply) ทำงานจริงใน Humi UI

## Tech Stack

- **Framework**: Next.js 16 App Router (hr repo: `src/frontend/`)
- **Runtime**: React 19 + TypeScript 5
- **State**: Zustand 4 + persist middleware (must bump `version` + provide `migrate()` on shape change — ref `feedback_zustand_persist_version_migrate.md`)
- **UI primitives**: `@/components/humi` (Button / Card / FormField) — **ห้ามใช้ raw Tailwind** สำหรับ action components
- **Attachments**: `@/components/admin/AttachmentDropzone` (reusable drop-zone, expertise pattern) — ห้ามใช้ raw `<input type=file>`
- **i18n**: next-intl (`messages/th.json` + `messages/en.json` — `changeRequests` / `workflows` keys already scaffolded)
- **Tests**: vitest + @testing-library/react + jsdom
- **Lookups**: existing picklist pipeline for MARITAL / BANK / province-district-subdistrict cascade

## Relevant Files

### Read-only (understand existing shape)
- `src/frontend/app/employees/me/**` — current read-only view (exact path may be `src/frontend/app/(authed)/employees/me/page.tsx` or similar; Builder must locate)
- `src/frontend/components/humi/*` — Button/Card/FormField/Modal primitives
- `src/frontend/components/admin/AttachmentDropzone/AttachmentDropzone.tsx` — attachment drop-zone
- `src/frontend/messages/th.json` + `en.json` — existing `changeRequests` / `workflows` i18n keys
- `src/frontend/hooks/useProfileEdit.ts` (if present from run #12) — prior profile-edit hook to reuse

### New files (to be created)
- `src/frontend/store/profile-edit-draft.ts` — Zustand store (5 sections + pending CR map) with `version: 2` + `migrate()`
- `src/frontend/lib/change-request/submit.ts` — mock fetch wrapper returning `{ id, status: 'pending', ... }`
- `src/frontend/components/ess/ChangeRequestSubmitModal.tsx` — shared submit modal (effective date + note + diff summary)
- `src/frontend/components/ess/PendingChangeChip.tsx` — shared pending-state chip + cancel affordance
- `src/frontend/components/ess/sections/EmergencyContactEdit.tsx`
- `src/frontend/components/ess/sections/AddressEdit.tsx`
- `src/frontend/components/ess/sections/ContactInfoEdit.tsx`
- `src/frontend/components/ess/sections/BankEdit.tsx`
- `src/frontend/components/ess/sections/PersonalInfoEdit.tsx`
- `src/frontend/app/employees/me/page.tsx` — wire edit buttons into existing section cards (surgical edit — preserve read view)
- Test files mirroring the above under `__tests__/`

### i18n keys to add (th + en)
- `ess.sections.emergencyContact`, `ess.sections.address`, `ess.sections.contact`, `ess.sections.bank`, `ess.sections.personal`
- `ess.changeRequest.submit`, `ess.changeRequest.pending`, `ess.changeRequest.cancel`, `ess.changeRequest.effectiveDate`, `ess.changeRequest.note`, `ess.changeRequest.diffTitle`

## Team Orchestration

### Team Members

| Mark | Phase | Deliverable |
|---|---|---|
| **MK III — Builder** | T1 store & lib | Zustand draft store + mock CR submit wrapper |
| **Forge Frontend — UI Builder** | T2 shared UI | ChangeRequestSubmitModal + PendingChangeChip + i18n keys |
| **Forge Frontend — UI Builder** (2nd dispatch) | T3 section forms | 5 section edit components + /employees/me wiring |
| **MK VI — Test Writer** | T4 tests | Vitest AC-1..AC-8 + i18n smoke (write only — no execution) |
| **MK IV — Validator** | T5 review + validate | Code Review + run tests + screenshots + AC verdicts + Validate Final |

Agent footer mandatory on every dispatch (Phase 0 contract — status/files/commit/next fields → posted to #53).

## Step by Step Tasks

| Task ID | Description | Depends On | Assigned To | Parallel |
|---|---|---|---|---|
| T1 | Create Zustand `profile-edit-draft` store with 5-section shape, `version: 2`, `migrate()` from v1; add `lib/change-request/submit.ts` mock wrapper returning `{id, status:'pending', effectiveDate, submittedAt}`; emit TS types for `Section`, `ChangeRequest`, `CRStatus`. Max 3 files. | — | MK III — Builder | false |
| T2 | Build shared UI: `ChangeRequestSubmitModal` (effective date picker, note textarea, diff summary — reads from store), `PendingChangeChip` (Thai `รอการอนุมัติ` label, click → detail popover + cancel-own-CR), and add i18n keys to `messages/th.json` + `en.json`. Max 4 files. | T1 | Forge Frontend — UI Builder | true (with T3) |
| T3 | Build 5 section edit components (EmergencyContact, Address 8-field + cascade, ContactInfo multi-value phone/email, Bank with AttachmentDropzone, PersonalInfo with marital-change effective-date prompt); wire edit buttons into `src/frontend/app/employees/me/page.tsx`; preserve read view (C1 surgical). Max 6 files edited/created. | T1 | Forge Frontend — UI Builder | true (with T2) |
| T4 | Write vitest tests covering AC-1..AC-8 (min 1 passing assertion per AC) + i18n smoke (no missing TH key in new strings). Write only — no execution. Max 6 test files. | T2, T3 | MK VI — Test Writer | false |
| T5 | Code Review (C1/C3/C6/C7/C8/C10 checklist) + run vitest via JARVIS Bash + capture test-output.txt + capture screenshots for AC-1..AC-7 via browser-harness (dev server port 3000) + emit outcomes.json for G3 gate + Validate Final verdict. | T4 | MK IV — Validator | false |

## Pipeline

1. **Phase 0** — GitHub issue #53 is the tracking issue (already open, labeled `autopilot:in-progress`)
2. **Phase 0.5** — Prior Knowledge injected in seed `brownfieldContext.contextReferences`
3. **Phase 1 / 1.5 / 1.6** — spec + G1 complete (this document + G1 PASS 0.0%)
4. **Phase 2 Build** — T1 (MK III, solo) → then T2 + T3 (Forge Frontend, parallel wave)
5. **Phase 2.5 Dry-run** — JARVIS runs `bun run build` + C10 grep sweep; fixes import errors directly
6. **Phase 3 Test** — T4 MK VI writes tests (no execution); JARVIS runs `bun run test` via Bash (Step 3b)
7. **Phase 3c Evidence** — capture `test-artifacts/ironteam-53/test-output.txt` + post Phase 3 comment to #53
8. **Phase 4 Code Review** — MK IV dual-role (reviewer mindset) per checklist
9. **Phase 5 Validate Final** — MK IV runs validation + screenshots via browser-harness (primary) + emits `outcomes.json`
10. **Phase 5a G3 Gate** — `gate-g3.ts` over outcomes.json; exit 1 → retry loop Phase 6
11. **Phase 5b Close** — append sprint-log.md row + `gh issue close #53` with Phase 5 AC table
12. **Phase 6b Learn** — JARVIS memory write + trigger Self-Improve on MK III / Forge Frontend / MK IV / MK VI

## Acceptance Criteria

See `specs/ess-personal-data-edit.seed.json` `acceptanceCriteria` (10 ACs, AC-6 / AC-7 / AC-8 / AC-9 tagged `invariant: true`). Summary:

- **AC-1** — Emergency Contact edit form + multi-row support + submit validation
- **AC-2** — Address edit with 8 structured Thai fields + cascade lookup
- **AC-3** — Contact Info multi-value phone + email with primary flag
- **AC-4** — Bank edit with lookup + AttachmentDropzone
- **AC-5** — Personal Info edit + spouse-name-conditional + marital-status effective-date prompt
- **AC-6** — Shared ChangeRequestSubmitModal (effective date / note / diff) (invariant)
- **AC-7** — Pending-state chip blocks duplicate edit + cancel own CR (invariant)
- **AC-8** — Zustand persist with `version` bump + `migrate()` (invariant)
- **AC-9** — C10 Thai-primary; zero bilingual duplicates (invariant)
- **AC-10** — Vitest suite green 0 fail / 0 unintended skip

## Validation Commands

```bash
# Dry-run (Phase 2.5)
cd /Users/tachongrak/Projects/hr && bun run build 2>&1 | tail -20
grep -rnE '[A-Z][a-z]+([ -][A-Z][a-z]+){1,}' src/frontend/components/ess/ src/frontend/app/employees/me/ 2>&1 | grep -v '//' | grep -v 'import ' | head -30

# Tests (Phase 3b — JARVIS runs)
bun run test -- --reporter=default 2>&1 | tee test-artifacts/ironteam-53/test-output.txt

# G3 (Phase 5a)
bun run /Users/tachongrak/stark/core/gate/bin/gate-g3.ts specs/ess-personal-data-edit.seed.json test-artifacts/ironteam-53/outcomes.json

# Close gate (Phase 5b)
# Only if all previous commands exit 0
gh issue close 53 --repo aeiouboy/hr --comment "..."
```

## Out of Scope

- Approver UI and approval decision flow — sibling #54
- Real backend persistence / Prisma migration — mock only
- Push/email notifications — #54 or later
- Bulk edit / HR admin override — not ESS
- Profile photo or legal-name change — separate BRD
- Document viewer for attached bank book — read path is #54
