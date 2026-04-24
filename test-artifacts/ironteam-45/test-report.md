# Test Report — HR Phase 1 RIS Finish

**Run ID**: ironteam-45
**Spec**: `specs/hr-phase1-ris-finish.md`
**Generated**: 2026-04-24
**Executed**: 2026-04-24T14:30:23 (Bangkok)

## Test Run Summary

**Result**: 9 pass / 0 fail / 0 skipped (exit 0)
**Duration**: 0.997s
**Test Files**: 2 passed (2)
Full output: `test-artifacts/ironteam-45/test-output.txt`

## AC → Test Mapping

| AC | Description | Test File | Count | Status |
|----|-------------|-----------|-------|--------|
| AC-3 | R1 DOB<HireDate (Zod .refine) | `hireSchema.test.ts` | 2 | ✅ PASS |
| AC-4 | R2 maritalStatusSince conditional (Zod superRefine) | `hireSchema.test.ts` | 4 | ✅ PASS |
| AC-5 | R3 VN Issue Place conditional render (RTL) | `StepIdentity.vn-issue-place.test.tsx` | 3 | ✅ PASS |
| AC-6 | `npx tsc --noEmit` 0 error | baseline pre-existing errors only | — | 🟡 NET-ZERO REGRESSION |
| AC-7 | SF-drift grep gate | `hireSchema.ts` + `StepIdentity.tsx` diff clean | — | ✅ PASS |

## Test Cases by Category

### Zod validation (6 tests)
- ✅ R1 — hireDate > dateOfBirth → safeParse success
- ✅ R1 — hireDate <= dateOfBirth → error at path `['dateOfBirth']`
- ✅ R2 — SINGLE+empty → no superRefine message (only .min(1) triggers)
- ✅ R2 — MARRIED+empty → error with Thai message "กรุณาระบุวันที่เปลี่ยนสถานภาพสมรส (ยกเว้นโสด)"
- ✅ R2 — MARRIED+valid → success
- ✅ R2 — SINGLE+valid → success

### React Testing Library (3 tests)
- ✅ R3 — nationality='VN' → VN Issue Place visible
- ✅ R3 — nationality='TH' → VN Issue Place hidden
- ✅ R3 — country='VN' + nationality='TH' (OR condition) → still visible

## Screenshots (Phase 5 — MK IV)

| File | Description | AC |
|------|-------------|-----|
| `screenshots/ac-5-hire-wizard-entry.png` | Wizard entry — full page, default state (VN Issue Place hidden) | AC-5 |
| `screenshots/ac-5-vn-field-hidden.png` | ข้อมูลส่วนตัว section — สัญชาติ field visible, VN Issue Place hidden (TH/empty nationality) | AC-5 |

**หมายเหตุ AC-5**: VN visible case ใช้ RTL tests (3/3 pass) เป็น primary evidence เนื่องจาก React controlled component ไม่ respond ต่อ Playwright DOM event injection — ตาม pattern `source-plus-test-combo` (mk4-validator expertise)

## Known Issues (non-blocking)

- **tsc baseline**: 5 pre-existing errors in `src/__tests__/` (unchanged test files — `useLifecycleWizard.test.ts`, `UsersRoleGroups.test.tsx`, `humi-phase-b.test.tsx`). Existed at commit `107d2a9` before this run. Our 2-file diff introduced 0 new tsc errors.
