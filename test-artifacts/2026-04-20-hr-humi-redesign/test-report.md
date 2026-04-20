# Test Report — HR Humi Redesign

**Run ID**: 2026-04-20-hr-humi-redesign
**Spec**: specs/humi-frontend-redesign.md
**Generated**: 2026-04-20 (MK VI — Test Writer)
**Status**: WRITTEN — awaiting MK IV (Validator) to run

---

## AC → Test Mapping

| AC | Description | Test Files | Count | Status |
|----|-------------|------------|-------|--------|
| AC-1 | Design tokens centralized in globals.css | Button.test.tsx (bg-accent, bg-danger class assertions) | 2 | ⏳ |
| AC-2 | 5+ screens render + visual match | screens.smoke.test.tsx | 15 | ⏳ |
| AC-3 | 0 RED in palette (danger = pumpkin, ไม่ใช่ #C8553D) | Button.test.tsx (danger variant assertion) | 1 | ⏳ |
| AC-4 | 0 "Shelfly" occurrences | manual grep by MK IV: `rg -n 'Shelfly' src/frontend/src/` | — | ⏳ |
| AC-5 | 0 retail copy | manual grep by MK IV: `rg -n -i 'store\|cashier\|POS\|inventory'` | — | ⏳ |
| AC-6 | Thai-primary nav/headings | screens.smoke.test.tsx (Thai-primary sweep, h1 assertions) | 7 | ⏳ |
| AC-7 | A11y (role="switch", aria-current, keyboard, focus-visible) | Button.test.tsx + Toggle.test.tsx + Nav.test.tsx + DataTable.test.tsx | 28 | ⏳ |
| AC-8 | Component library reusable + typed | DataTable.test.tsx + Nav.test.tsx + Toggle.test.tsx | 14 | ⏳ |
| AC-9 | Dev server + build + tests clean | MK IV Phase 3b: `npm run build` + `npm test` | — | ⏳ |
| AC-10 | Screenshots + computed-style check | MK IV Phase 5: Playwright screenshots + getComputedStyle | — | ⏳ |

---

## Test Files Summary

| File | Tests | AC Coverage | Notes |
|------|-------|-------------|-------|
| `src/components/humi/__tests__/Button.test.tsx` | 17 | AC-1, AC-3, AC-7 | forwardRef, variants, keyboard, loading, focus ring |
| `src/components/humi/__tests__/Toggle.test.tsx` | 13 | AC-7, AC-8 | role=switch, aria-checked, Space/Enter, disabled, label/description |
| `src/components/humi/__tests__/DataTable.test.tsx` | 14 | AC-7, AC-8 | columns, rows, empty state, sortable, generic typing |
| `src/components/humi/__tests__/Nav.test.tsx` | 13 | AC-7, AC-8 | sections, aria-current, Link not div, icon+label, badge |
| `src/app/[locale]/__tests__/screens.smoke.test.tsx` | 20 | AC-2, AC-6 | 5 screens render no throw + Thai-primary headings sweep |

**Total automated test cases**: ~77

---

## Test Cases by Category

### Primitives — Button (AC-1, AC-3, AC-7)

- [ ] Button renders as `<button>` element ไม่ใช่ `<div>` — AC-7
- [ ] Button type="button" โดย default — AC-7
- [ ] Button รับ type="submit" ได้ — AC-7
- [ ] Button primary variant มี bg-accent class (teal token) — AC-1
- [ ] Button danger variant มี bg-danger class (pumpkin — ไม่ใช่ red) — AC-3
- [ ] Button danger class ไม่มี hex red (#C8553D/#C8102E/#E08864) — AC-3
- [ ] Button secondary มี border-accent — AC-1
- [ ] Button ghost มี bg-transparent — AC-1
- [ ] Button loading=true → disabled — AC-7
- [ ] Button loading=true → aria-busy="true" — AC-7
- [ ] Button loading=true → spinner animate-spin + aria-hidden — AC-7
- [ ] Button disabled=true → disabled — AC-7
- [ ] Button กด Enter → เรียก onClick — AC-7
- [ ] Button กด Space → เรียก onClick — AC-7
- [ ] Button disabled → ไม่เรียก onClick — AC-7
- [ ] Button focus-visible:ring-2 ใน className — AC-7
- [ ] Button focus-visible:ring-accent ใน className — AC-7
- [ ] Button size sm/md/lg มี class h-8/h-10/h-12 — AC-1
- [ ] Button displayName = "HumiButton" — AC-8

### Primitives — Toggle (AC-7, AC-8)

- [ ] Toggle renders เป็น `<button>` ไม่ใช่ `<div>` — AC-7
- [ ] Toggle มี role="switch" — AC-7
- [ ] Toggle มี type="button" — AC-7
- [ ] Toggle checked=false → aria-checked="false" — AC-7
- [ ] Toggle checked=true → aria-checked="true" — AC-7
- [ ] Toggle controlled: rerender เปลี่ยน aria-checked — AC-7
- [ ] Toggle กด Space → เรียก onChange(true) เมื่อ false — AC-7
- [ ] Toggle กด Space → เรียก onChange(false) เมื่อ true — AC-7
- [ ] Toggle กด Enter → เรียก onChange — AC-7
- [ ] Toggle disabled=true → button disabled — AC-7
- [ ] Toggle disabled → ไม่เรียก onChange เมื่อคลิก — AC-7
- [ ] Toggle disabled → ไม่เรียก onChange เมื่อ Space — AC-7
- [ ] Toggle แสดง label text เมื่อส่ง label prop — AC-8
- [ ] Toggle label ใช้ `<label htmlFor>` ที่ตรงกับ button id — AC-7
- [ ] Toggle แสดง description text — AC-8
- [ ] Toggle มี aria-describedby ชี้ไป description element — AC-7
- [ ] Toggle ไม่มี label/description → outer เป็น `<span>` — AC-8
- [ ] Toggle displayName = "HumiToggle" — AC-8

### Primitives — DataTable (AC-7, AC-8)

- [ ] DataTable render column headers ครบ — AC-8
- [ ] DataTable ใช้ `<table>/<thead>/<tbody>` จริง — AC-7
- [ ] DataTable column headers ใน `<th scope="col">` — AC-7
- [ ] DataTable render cell content ทุก row — AC-8
- [ ] DataTable จำนวน `<tr>` ตรงกับ rows — AC-8
- [ ] DataTable render row ค่า 0 (falsy edge case) — AC-8
- [ ] DataTable แสดง emptyState เมื่อ rows=[] — AC-8
- [ ] DataTable ไม่มี `<table>` เมื่อ emptyState render — AC-8
- [ ] DataTable rows=[] โดยไม่มี emptyState → ไม่ crash — AC-8
- [ ] DataTable column sortable แสดง `<button>` ใน header — AC-8
- [ ] DataTable column ไม่ sortable ไม่แสดง sort button — AC-8
- [ ] DataTable th sortable มี aria-sort="none" ก่อนคลิก — AC-7
- [ ] DataTable คลิกครั้งแรก → aria-sort="ascending" — AC-7
- [ ] DataTable คลิกครั้งที่ 2 → aria-sort="descending" — AC-7
- [ ] DataTable sort ascending เรียงข้อมูลถูกต้อง — AC-8
- [ ] DataTable generic typing ทำงานกับ custom interface — AC-8
- [ ] DataTable displayName = "HumiDataTable" — AC-8
- [ ] DataTable render `<caption>` element — AC-7

### Primitives — Nav (AC-7, AC-8)

- [ ] Nav render section labels ครบ 3 sections — AC-8
- [ ] Nav render nav items ทุกรายการ — AC-8
- [ ] Nav render ใน `<nav>` พร้อม aria-label — AC-7
- [ ] Nav section ไม่มี label → ไม่ render eyebrow — AC-8
- [ ] Nav active item มี aria-current="page" — AC-7
- [ ] Nav inactive item ไม่มี aria-current — AC-7
- [ ] Nav มีเพียง 1 item active พร้อมกัน — AC-7
- [ ] Nav items render เป็น `<a>` element — AC-7
- [ ] Nav items ไม่มี `<div onclick>` — AC-7
- [ ] Nav link มี href ถูกต้อง — AC-7
- [ ] Nav render label text ทุก item — AC-8
- [ ] Nav render icon SVG elements — AC-8
- [ ] Nav icon มี aria-hidden — AC-7
- [ ] Nav badge แสดง count — AC-8
- [ ] Nav badge มี aria-label — AC-7
- [ ] Nav render brand slot — AC-8
- [ ] Nav render footer slot — AC-8
- [ ] Nav displayName = "HumiNav" — AC-8

### Screens — Smoke Tests (AC-2, AC-6)

- [ ] Dashboard render ไม่ crash — AC-2
- [ ] Dashboard h1 = "ภาพรวม" — AC-6
- [ ] Dashboard KPI cards ≥ 3 — AC-2
- [ ] Dashboard "คำขอที่ต้องอนุมัติ" section — AC-2
- [ ] Dashboard h1 มี Thai characters — AC-6
- [ ] Employee List render ไม่ crash — AC-2
- [ ] Employee List h1 = "พนักงาน" — AC-6
- [ ] Employee List DataTable present — AC-2
- [ ] Employee List column headers ภาษาไทย — AC-6
- [ ] Employee List h1 มี Thai characters — AC-6
- [ ] Employee Detail render ไม่ crash — AC-2
- [ ] Employee Detail back link to employees — AC-2
- [ ] Employee Detail tab group present — AC-2
- [ ] Employee Detail มี Thai text — AC-2
- [ ] Org Chart render ไม่ crash — AC-2
- [ ] Org Chart แสดง "สำนักงานใหญ่" root node — AC-2
- [ ] Org Chart detail panel ฝั่งขวา — AC-2
- [ ] Org Chart expand/collapse buttons — AC-2
- [ ] Settings render ไม่ crash — AC-2
- [ ] Settings h1 = "ตั้งค่าระบบ" — AC-6
- [ ] Settings sidebar sections ≥ 3 — AC-2
- [ ] Settings default panel "ข้อมูลองค์กร" — AC-2
- [ ] Settings h1 มี Thai characters — AC-6
- [ ] All 5 screens render ไม่ throw (batch) — AC-2
- [ ] Dashboard h1 Thai sweep — AC-6
- [ ] Employee List h1 Thai sweep — AC-6
- [ ] Settings h1 Thai sweep — AC-6

---

## Manual Checks (MK IV Phase 3b+)

| Check | Command | Expected |
|-------|---------|----------|
| AC-3: 0 RED hex | `rg -n '#C8553D\|#E08864\|#C8102E' src/frontend/src/` | 0 matches |
| AC-4: 0 Shelfly | `rg -n 'Shelfly' src/frontend/src/ src/frontend/public/` | 0 matches |
| AC-5: 0 retail copy | `rg -n -i 'store\|cashier\|POS\|inventory' src/frontend/src/app/\[locale\]/home src/frontend/src/app/\[locale\]/employees` | 0 matches |
| AC-7: 0 div onClick | `rg -n '<div[^>]*onClick' src/frontend/src/components/humi/` | 0 matches |
| Rule 26b: 0 global * reset | `rg '^\s*\*\s*\{' src/frontend/src/app/globals.css` | 0 matches |
| AC-9: build clean | `cd src/frontend && npm run build` | exit 0 |
| AC-9: tests pass | `cd src/frontend && npm test` | 0 failures |

---

## Deps Required (JARVIS install Phase 3b)

ถ้า package.json ยังไม่มี dependencies เหล่านี้:

```bash
cd src/frontend && npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

ตรวจสอบก่อน: `cat src/frontend/package.json | grep testing-library`

---

## Screenshots

_(populated by MK IV in Phase 5 — Playwright 1920x1080 capture)_

- `screenshots/dashboard.png` — /th/home
- `screenshots/employees.png` — /th/employees
- `screenshots/employee-detail.png` — /th/employees/E-0101
- `screenshots/org-chart.png` — /th/org-chart
- `screenshots/settings.png` — /th/settings

---

## Known Limitations / Issues

1. **screens.smoke.test.tsx**: ใช้ `beforeEach` dynamic import เพราะ vi.mock ต้อง hoist ก่อน module load — ถ้า test runner ไม่ support dynamic import ใน beforeEach อาจต้อง restructure เป็น top-level import หลัง vi.mock
2. **Employee Detail page.tsx**: มี mock data inline (ไม่ได้ import จาก humi-mock-data.ts) — useParams mock ส่ง id='E-0101' ซึ่ง match กับ EMPLOYEES record ใน page
3. **Org Chart page.tsx**: ใช้ useParams สำหรับ selected node — mock ส่ง id='E-0101' ซึ่ง match ได้
4. **next-intl mock**: ใช้ flat key lookup (dot-notation string) แทน nested object — ถ้า useTranslations ใช้ nested access pattern อาจต้องปรับ mock ให้ deep-traverse
