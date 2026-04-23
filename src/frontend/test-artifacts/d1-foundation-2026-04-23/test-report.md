# Test Report — HR Phase 1 D1 Foundation

**Run ID**: d1-foundation-2026-04-23
**Spec**: specs/hr-phase-1-d1-foundation.md
**Generated**: 2026-04-23

## Test Run Summary

**Executed**: 2026-04-23T19:30:00Z
**Result**: 1098 pass / 10 fail / 0 skipped (frontend exit 1 / shared exit 0)
**Duration**: frontend 15.69s + shared 8.87s
**Runners**: Vitest (frontend) + Jest (shared package — different test runner)

Full output:
- `test-artifacts/d1-foundation-2026-04-23/test-output.txt` (frontend 941 tests)
- `test-artifacts/d1-foundation-2026-04-23/shared-test-output.txt` (shared 167 tests)

## AC to Test Mapping

| AC | Description | Test File | Count | Status |
|----|-------------|-----------|-------|--------|
| AC-1 | Factory accepts employeeId + preloadedEmployee; both context modes covered | `src/frontend/src/lib/admin/wizard-template/__tests__/createClusterWizard.test.ts` | 10 | ✅ 10/10 |
| AC-2 | 4 orphan dirs deleted + zero refs | (JARVIS verified via `find` → empty) | 1 | ✅ |
| AC-3 | @hrms/shared exports TimelineEvent + YES_NO + MARITAL wire | `timeline.test.ts` + `yes-no.test.ts` + `StepBiographical-marital.test.tsx` | 41 (16+12+13) | ✅ 41/41 |
| AC-4 | 0 import errors in npm test | `grep -cE "Cannot find\|Module not found" = 0` | 1 | ✅ |
| AC-5 | Single commit + pipeline-state to phase 2 | (pending Phase 5 commit step) | 1 | ⏳ |

## D1 New Tests (MK VI)

| File | Tests | Runner | Verdict |
|------|-------|--------|---------|
| `services/shared/src/types/__tests__/timeline.test.ts` | 16 | Jest | ✅ |
| `services/shared/src/picklists/__tests__/yes-no.test.ts` | 12 | Jest | ✅ |
| `frontend/src/__tests__/admin/StepBiographical-marital.test.tsx` | 13 | Vitest | ✅ |
| `frontend/src/lib/admin/wizard-template/__tests__/createClusterWizard.test.ts` (extended by Forge FE) | 10 | Vitest | ✅ |

**Total D1 new/extended: 51 tests, 51 PASS**

## JARVIS Self-Heals (Phase 2.5 + 3b)

| # | File:line | Before | After | Why builder missed |
|---|-----------|--------|-------|---------------------|
| 1 | `createClusterWizard.ts:27` + `:142` | `ReturnType<typeof create<...>>` (curried fn) | `UseBoundStore<StoreApi<...>>` + type imports | Zustand v4 currying trick — 20+ TS errors in test file |
| 2 | `timeline.test.ts:9` + `yes-no.test.ts:8` | `import { describe, it, expect } from 'vitest'` | removed (jest globals) | MK VI defaulted to vitest despite shared package using jest |
| 3 | `StepBiographical-marital.test.tsx:90-94` | no `beforeEach` for DOB seed | added DOB seed in `describe` block | Component gates setStepData behind validation (requires dateOfBirth) — 4 tests failed |

## Pre-existing failures (out of D1 scope per AC-4)

| Test file | Failures | Root cause |
|-----------|----------|------------|
| `useHireWizard.test.ts` | 2 | Option-1 restructure (commit `7e984ac`) made Step 1 multi-slice; tests still assume single-slice Step 1 |
| `SystemIntegration.test.tsx` | 1 | TC-INT-5 Teams Viva — BA spec pending (Q10) |
| `SystemReports.test.tsx` | 3 | Reports hub scaffolds not rendering expected headings |
| `SystemSecurity.test.tsx` | 3 | Security hub scaffolds not rendering expected cards/badges |
| `sf-parity-sidebar.test.tsx` | 1 | Nav count drift (expected 17 got 18 — sidebar item added after test written) |

## New Test Files (MK VI — D1)

| File | Tests | Coverage |
|------|-------|----------|
| `src/services/shared/src/types/__tests__/timeline.test.ts` | 15 | AC-3: 7 variant shapes, base fields, discriminated union narrowing, exhaustive switch |
| `src/services/shared/src/picklists/__tests__/yes-no.test.ts` | 11 | AC-3: PicklistItem shape, YES/NO content, labels th+en, active filter, lookup patterns |
| `src/frontend/src/__tests__/admin/StepBiographical-marital.test.tsx` | 13 | AC-3: picklist renders, 4 required options, store update on select, active filter |
| `src/frontend/src/lib/admin/wizard-template/__tests__/createClusterWizard.test.ts` | 10 | AC-1: Archetype A (no context), Archetype B (with employeeId + preloadedEmployee), return shape |

**Total new tests**: 49

## Pre-existing failures (out of D1 scope — documented per AC-4)

| Test file | Failures (est.) | Root cause (best guess) |
|-----------|-----------------|-------------------------|
| `useHireWizard.test.ts` | 2 | Option-1 restructure (commit 7e984ac) made Step 1 multi-slice; tests still assume single-slice Step 1 |
| `SystemIntegration.test.tsx` | 1 | BA spec pending (TC-INT-5 waiting on Q10) |
| `SystemReports.test.tsx` | 3 | Reports hub scaffolds not rendering expected headings |
| `SystemSecurity.test.tsx` | 3 | Security hub scaffolds not rendering expected cards/badges |
| `sf-parity-sidebar.test.tsx` | 1 | Nav count drift (expected 17 got 18 — sidebar item added after test written) |

> Note: Failure counts above are estimates from Phase 0 audit. JARVIS fills actual counts after running `npm test` in Phase 3c.

## Validation Commands (for JARVIS to run)

```bash
# AC-3: timeline + yes-no tests (from shared package root — uses jest)
cd /Users/tachongrak/Projects/hr/src/services/shared
npx jest src/types/__tests__/timeline.test.ts src/picklists/__tests__/yes-no.test.ts

# AC-3: StepBiographical marital test (from frontend root — uses vitest)
cd /Users/tachongrak/Projects/hr/src/frontend
npx vitest run src/__tests__/admin/StepBiographical-marital.test.tsx

# AC-1: factory tests (frontend vitest)
cd /Users/tachongrak/Projects/hr/src/frontend
npx vitest run src/lib/admin/wizard-template/__tests__/createClusterWizard.test.ts

# AC-4: import resolution clean
cd /Users/tachongrak/Projects/hr/src/frontend
npm test 2>&1 | grep -E "Cannot find|Module not found"
# Expected: empty output

# AC-2: orphan dirs deleted
find /Users/tachongrak/Projects/hr/src/frontend/src/app/\[locale\]/admin -type d \( -name probation -o -name rehire -o -name terminate -o -name transfer \)
# Expected: empty output

# AC-3: shared TypeScript compile
cd /Users/tachongrak/Projects/hr
npx tsc --noEmit -p src/services/shared/tsconfig.json
# Expected: zero errors
```

## Notes

- `timeline.test.ts` และ `yes-no.test.ts` อยู่ใน `@hrms/shared` package ซึ่งใช้ **jest** (package.json: `"test": "jest"`) ไม่ใช่ vitest — JARVIS ต้องรันแยกจาก frontend
- `StepBiographical-marital.test.tsx` และ `createClusterWizard.test.ts` อยู่ใน frontend package ซึ่งใช้ **vitest** + jsdom
- Test files ทั้งหมดใช้ pattern เดียวกับ existing tests (StepIdentity.test.tsx, useHireWizard.test.ts) — match style C1
- ห้าม run vitest/jest เอง — JARVIS รัน Phase 3c

---

*Generated by MK VI — Test Writer | Run ID: d1-foundation-2026-04-23*
