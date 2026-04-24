# Test Report — HR Phase 1 RIS Finish

**Run ID**: ironteam-45
**Spec**: specs/hr-phase1-ris-finish.md
**Generated**: 2026-04-24

## AC to Test Mapping

| AC | Description | Test File | Count | Status |
|----|-------------|-----------|-------|--------|
| AC-3 | R1 DOB<HireDate cross-field refine | `src/lib/admin/validation/__tests__/hireSchema.test.ts` | 2 | pending |
| AC-4 | R2 maritalStatusSince conditional superRefine | `src/lib/admin/validation/__tests__/hireSchema.test.ts` | 4 | pending |
| AC-5 | R3 VN Issue Place conditional render | `src/app/[locale]/admin/hire/steps/__tests__/StepIdentity.vn-issue-place.test.tsx` | 3 | pending |

## Test Files Created

### File 1: hireSchema.test.ts
Path: `src/frontend/src/lib/admin/validation/__tests__/hireSchema.test.ts`

**AC-3 R1 cases (2)**:
- PASS: hireDate > dateOfBirth
- FAIL: hireDate <= dateOfBirth — path ['dateOfBirth'] + message มี "วันที่เริ่มงาน"

**AC-4 R2 cases (4)**:
- PASS: SINGLE + empty since — superRefine ไม่ trigger (ยกเว้นโสด message ไม่ปรากฏ)
- FAIL: MARRIED + empty since — error path ['maritalStatusSince'] + message "กรุณาระบุวันที่เปลี่ยนสถานภาพสมรส (ยกเว้นโสด)"
- PASS: MARRIED + valid since — ผ่านทั้ง .min(1) และ superRefine
- PASS: SINGLE + valid since — superRefine ไม่ trigger

### File 2: StepIdentity.vn-issue-place.test.tsx
Path: `src/frontend/src/app/[locale]/admin/hire/steps/__tests__/StepIdentity.vn-issue-place.test.tsx`

**AC-5 R3 cases (3)**:
- Case 1: nationality='VN' → getByLabelText(/สถานที่ออกบัตร/) ไม่ null
- Case 2: nationality='TH' → queryByLabelText(/สถานที่ออกบัตร/) = null
- Case 3 (bonus): country='VN' + nationality='TH' → OR condition → field แสดง

## Notes

- `hireSchema.test.ts` ใหม่แยกจาก `src/__tests__/admin/hireSchema.test.ts` (existing) ตาม spec path
- Existing file ครอบคลุม required fields + DOB < HireDate แล้ว — ไฟล์ใหม่เพิ่มเฉพาะ AC-3/AC-4 traceability
- AC-4 Case 1 (SINGLE+empty): `.min(1)` ยังคง trigger error แต่ superRefine message "(ยกเว้นโสด)" ไม่ปรากฏ — test verify behavior นี้

## Screenshots

_(populated by MK IV in Phase 5)_
