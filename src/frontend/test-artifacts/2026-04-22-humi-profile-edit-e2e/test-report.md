# Test Report — Humi Profile Edit FE E2E

**Run ID**: 2026-04-22-humi-profile-edit-e2e
**Issue**: https://github.com/aeiouboy/hr/issues/12
**Spec**: specs/humi-profile-edit-e2e.md
**Branch**: humi/profile-edit-e2e
**Generated**: 2026-04-22 (skeleton — populated by JARVIS Phase 3b)

## AC → Test Mapping

| AC | Description | Test File | Count | Status |
|----|-------------|-----------|-------|--------|
| AC-1 | 15+ fields across 4 sections | humi-profile-slice.test.ts (draft fields via submitChangeRequest) | 4 | ⏳ |
| AC-2 | FileUploadField component | FileUploadField.test.tsx | 14 | ⏳ |
| AC-3 | Attachment required enforcement (submit disabled) | profile-edit-e2e.spec.ts (AC-3 describe block) | 1 | ⏳ |
| AC-4 | EffectiveDateGate → submitChangeRequest | humi-profile-slice.test.ts (submitChangeRequest tests) | 5 | ⏳ |
| AC-5 | Pending badge + Activity log | profile-edit-e2e.spec.ts (steps 8-10) | 1 (embedded in AC-10) | ⏳ |
| AC-6 | Admin mock approval (approve/reject) | humi-profile-slice.test.ts (adminApprove/adminReject) + e2e steps 11-15 | 6 | ⏳ |
| AC-7 | Toast notifications | profile-edit-e2e.spec.ts (AC-7 describe block + e2e steps 8,13) | 2 | ⏳ |
| AC-8 | Mobile responsive (<768px) | profile-edit-e2e.spec.ts (AC-8 describe block) | 2 | ⏳ |
| AC-9 | i18n TH/EN parity (no raw keys rendered) | profile-edit-e2e.spec.ts (AC-9 describe block) | 2 | ⏳ |
| AC-10 | Full E2E 15-step scenario | profile-edit-e2e.spec.ts (AC-10 describe block) | 1 | ⏳ |
| AC-11 | Zero regression (≥410 existing tests pass) | full vitest suite | N/A | ⏳ |

## Test File Summary

| File | Type | Cases | Notes |
|------|------|-------|-------|
| `src/__tests__/humi-profile-slice.test.ts` | vitest unit | 18 | store actions + persistence roundtrip |
| `src/__tests__/FileUploadField.test.tsx` | vitest + testing-library | 14 | component: render/drag-drop/validation/preview/remove |
| `e2e/profile-edit-e2e.spec.ts` | Playwright | 7 (5 describes) | AC-10 full scenario + AC-3/7/8/9 |
| `e2e/fixtures/test-doc.pdf` | fixture | — | minimal valid PDF 594 bytes |

**Total new test cases**: 39

## Test Run Summary

_(populated by JARVIS Phase 3b after running vitest + playwright)_

```
vitest run output:
  ...

playwright test e2e/profile-edit-e2e.spec.ts output:
  ...
```

## Screenshots

_(populated by MK IV in Phase 5 — browser-harness primary, Rule 30)_

Planned captures:
- `375-profile-me-default.png` — /th/profile/me at 375px
- `768-profile-me-default.png` — /th/profile/me at 768px
- `1440-profile-me-default.png` — /th/profile/me at 1440px
- `1440-edit-form-open.png` — ชื่อ-นามสกุล section edit open
- `1440-file-upload-preview.png` — FileUploadField after upload (preview visible)
- `1440-pending-badge.png` — pending badge "รออนุมัติ" next to firstName
- `1440-admin-mode-on.png` — Admin mode ON with approve/reject buttons
- `375-mobile-drawer.png` — mobile drawer edit form at 375px

## Validation Commands (Phase 3b)

```bash
# Unit tests
cd /Users/tachongrak/Projects/hr/src/frontend && npx vitest run 2>&1 | tee /tmp/humi-vitest.log
grep -E "Tests|passed|failed" /tmp/humi-vitest.log

# E2E
cd /Users/tachongrak/Projects/hr/src/frontend && npx playwright test e2e/profile-edit-e2e.spec.ts 2>&1 | tee /tmp/humi-e2e.log

# Rule 26b guard — no global * reset
grep -rn "^\* {" /Users/tachongrak/Projects/hr/src/frontend/src/**/*.css && echo "FAIL: global reset found" || echo "PASS: no global reset"
```
