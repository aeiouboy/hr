# Test Report — ESS Termination Request (hr#74)

- **Run ID**: ess-termination-2026-04-25T1400
- **Phase**: Phase 4 (Code Review) + Phase 5 (Validate) — dual-role
- **Date**: 2026-04-25
- **Commits tested**: c823ef1 / 373cee6 / 8d72d44 / 9629cb6 (tests+patches)
- **Self-heal commit**: pending (locale fix on profile/me)
- **Validator**: MK IV — Validator

---

## Phase 4 — Code Review Findings

### C1 Surgical
- ✅ 5 target files เท่านั้น: `humi-profile-slice.ts`, `ReasonPicker.tsx`, `use-resignation.ts`, `resignation-page.tsx`, `profile/me/page.tsx`
- ✅ Builder diff = 146 LOC (≤ 150 budget)
- ✅ i18n message files (en.json/th.json) เพิ่ม keys ที่จำเป็น — ไม่แตะ keys เดิม
- ✅ ทุก change trace กลับ AC ได้

### C3 Simplicity
- ✅ useResignation reuse PendingChange pattern — ไม่สร้าง state mechanism ใหม่
- ✅ ESS_VOLUNTARY_CODES constant แยกไว้ชัดเจน ไม่ duplicate inline
- ✅ ReasonPicker extend ด้วย optional prop `mode` — no breaking change ต่อ admin caller

### C7 SSoT
- ✅ `grep "useState.*ResignationRecord" src/hooks/use-resignation.ts` → 0 matches
- ✅ useResignation subscribe `useHumiProfileStore.pendingChanges` ตรง
- ✅ submitResignation calls `submitChangeRequest({sectionKey:'termination', ...})`

### C8 Source-Grounding
- ✅ 4 RESIGN_* codes trace กลับ spec section "4 voluntary RESIGN_* codes — เพิ่มใน EVENT_REASON_LABELS (Thai-primary)"
- ✅ ESS_VOLUNTARY_CODES filter EVENT_REASONS['5597'] correctly
- ✅ ไม่ invent codes นอก spec

### C10 Thai-Primary
- ✅ 4 RESIGN_* labels: Thai-only (no bilingual paren)
  - `RESIGN_PERSONAL: 'ลาออกด้วยเหตุส่วนตัว'`
  - `RESIGN_STUDY: 'ลาออกเพื่อศึกษาต่อ'`
  - `RESIGN_FAMILY: 'ลาออกด้วยเหตุครอบครัว'`
  - `RESIGN_OTHER: 'ลาออกด้วยเหตุอื่น'`
- ✅ Pre-existing TERM_* bilingual labels ไม่ถูกแตะ (C1 compliant — ไม่ใช่ builder write)
- ✅ resignation-page.tsx + use-resignation.ts → C10 grep 0 matches (builder scope)

### Style Match
- ✅ Lucide icons: `FileX`, `CheckCircle`, `Clock`, `Circle` — ไม่มี emoji
- ✅ Design tokens: `text-ink`, `text-ink-muted`, `bg-surface`, `border-hairline`, `text-accent`

### Self-Heal Applied (Phase 4)
- **SH-1**: `profile/me/page.tsx` hardcoded `/th/resignation` แทน `/${locale}/resignation`
  - Fix: เพิ่ม `useParams` import + `const locale = (params?.locale as string) ?? 'th'`
  - แก้ href เป็น template literal `/${locale}/resignation`
  - Build pass ✅, Tests 25/25 ✅ (ไม่กระทบ)

---

## Phase 5 — Validation Results

### Build
- ✅ `npm run build` exits 0 — no TS errors, no build errors
- `/[locale]/resignation` route compiled ✅
- `/[locale]/profile/me` route compiled ✅

### Tests
```
 RUN  v2.1.9 /Users/tachongrak/Projects/hr/src/frontend

 ✓ src/__tests__/humi-profile-slice.v3-migration.test.ts (5 tests) 4ms
 ✓ src/__tests__/use-resignation.ssot.test.ts (5 tests) 10ms
 ✓ src/__tests__/use-resignation.submit.test.ts (4 tests) 19ms
 ✓ src/__tests__/ReasonPicker.modes.test.tsx (5 tests) 58ms
 ✓ src/__tests__/resignation-page.timeline.test.tsx (3 tests) 28ms
 ✓ src/__tests__/profile-me.resign-link.test.tsx (3 tests) 239ms

 Test Files  6 passed (6)
      Tests  25 passed (25)
   Start at  14:29:06
   Duration  992ms
```

**25/25 pass** — 0 net-new failures vs baseline (10 pre-existing failures ใน unrelated test files)

### AC Verification Table

| AC | Description | Test | Evidence | Status |
|----|-------------|------|----------|--------|
| AC-1 | submitResignation persists ผ่าน PendingChange sectionKey='termination' | `use-resignation.submit.test.ts` 4/4 | store.pendingChanges[0].sectionKey === 'termination' assert ✅ | ✅ PASS |
| AC-2 | useResignation ห้ามใช้ useState — C7 SSoT | `use-resignation.ssot.test.ts` 5/5 + grep 0 | grep returns 0, hook subscribes store reactive ✅ | ✅ PASS |
| AC-3 | ReasonPicker mode='ess-voluntary' แสดง 4 codes เท่านั้น | `ReasonPicker.modes.test.tsx` 5/5 | RTL options count === 4 assert + screenshot ✅ | ✅ PASS |
| AC-4 | หลัง submit → timeline step 1 'submitted' active | `resignation-page.timeline.test.tsx` 3/3 | timeline text contains 'submitted', bg-brand step badge present ✅ | ✅ PASS |
| AC-5 | profile/me Employment tab มี link /resignation + Thai label | `profile-me.resign-link.test.tsx` 3/3 + screenshot | href="/th/resignation", text="ดูคำขอลาออก" ✅ | ✅ PASS |
| AC-6 | All tests green + build exits 0 + v2→v3 migrate no-op | `humi-profile-slice.v3-migration.test.ts` 5/5 | 25/25 pass, build 0 errors, version=3 in localStorage ✅ | ✅ PASS |

**Verdict: 6/6 AC PASS**

### Screenshots

| Screenshot | Path | Evidence |
|-----------|------|---------|
| /resignation empty state | `screenshots/ac3-resignation-empty.png` | หน้า "ไม่มีการลาออกที่ใช้งานอยู่" + ปุ่ม "เริ่มลาออก" |
| /resignation form + ReasonPicker | `screenshots/ac3-resignation-form-reasonpicker.png` | form แสดง 4 reason options (Thai labels) |
| /profile/me Employment tab + resign link | `screenshots/ac5-profile-me-employment-resign-link.png` | section "การลาออก" + link "ดูคำขอลาออก" visible |
