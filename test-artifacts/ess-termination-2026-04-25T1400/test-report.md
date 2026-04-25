# Test Report — ESS Termination Request (hr#74)

- **Run ID**: ess-termination-2026-04-25T1400
- **Sprint**: Phase 3a (Test Writer — MK VI)
- **Date**: 2026-04-25
- **Commits tested against**: c823ef1 / 373cee6 / 8d72d44

## AC → Test Mapping

| AC | Description | Test File | Test Count | Status |
|----|-------------|-----------|-----------|--------|
| AC-1 | submitResignation → PendingChange sectionKey='termination' ใน store | `__tests__/use-resignation.submit.test.ts` | 4 | ⏳ |
| AC-2 | useResignation ไม่ใช้ useState<ResignationRecord> (C7 SSoT) | `__tests__/use-resignation.ssot.test.ts` | 5 | ⏳ |
| AC-3 | ReasonPicker mode='ess-voluntary' แสดง 4 RESIGN_* codes เท่านั้น | `__tests__/ReasonPicker.modes.test.tsx` | 5 | ⏳ |
| AC-4 | หลัง submit → ResignationPage timeline แสดง 'submitted' step active | `__tests__/resignation-page.timeline.test.tsx` | 3 | ⏳ |
| AC-5 | profile/me Employment tab มี link ไปยัง /resignation + Thai label | `__tests__/profile-me.resign-link.test.tsx` | 3 | ⏳ |
| AC-6 | v2→v3 persist migration ไม่ทำให้ข้อมูลสูญหาย + version=3 | `__tests__/humi-profile-slice.v3-migration.test.ts` | 5 | ⏳ |

**Total expected**: 25 tests

## Test Files

| File | Lines | AC |
|------|-------|----|
| `use-resignation.submit.test.ts` | ~115 | AC-1 |
| `use-resignation.ssot.test.ts` | ~120 | AC-2 |
| `ReasonPicker.modes.test.tsx` | ~90 | AC-3 |
| `resignation-page.timeline.test.tsx` | ~130 | AC-4 |
| `profile-me.resign-link.test.tsx` | ~145 | AC-5 |
| `humi-profile-slice.v3-migration.test.ts` | ~160 | AC-6 |

## Notes

- Status ⏳ = รอ JARVIS รัน Phase 3b (`npm test -- --run`)
- JARVIS จะอัปเดต column Status เป็น ✅/❌ หลัง Phase 3b complete
- AC-2 รวม static source-code check (grep) + runtime reactive test
- AC-5 ใช้ dynamic import เพื่อหลีกเลี่ยง circular dependency กับ component ที่ใหญ่มาก
- AC-6 test version fallback ผ่าน source grep ถ้า persist middleware ไม่ write ใน jsdom
