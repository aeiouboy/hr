# Wave 9 Design System Fix

**Audit date:** 2026-04-26
**Auditor:** architect-audit (Wave 9.1)
**Goal:** unify three surfaces on the canonical Humi design system. Two tracks of inconsistency exist:

1. **React-primitive track** — `Card`, `CardTitle`, `Button`, `Modal` from `@/components/humi` (token-based, Tailwind classes only, no inline `style`).
2. **CSS-class track** — `humi-card`, `humi-tag`, `humi-input`, `humi-btn`, `humi-label`, `humi-eyebrow`, `humi-row` defined in `src/app/globals.css` (also canonical, used by ESS pages built earlier in Phase-1).

Both tracks are **legitimate** Humi usage. The smell flagged by the user as "old design" is **inline `style={{...}}` blocks for layout, padding, typography, and color** — these bypass tokens and produce the visual divergence. The fix swaps inline style → Tailwind utility classes that already exist in the codebase, plus translates English-only literal strings to Thai.

---

## Surface 1 — `/th/quick-approve` (`src/components/manager/quick-approve-page.tsx`)

**Status:** Top half (lines 175–276) was rebuilt in Wave 8 / Track C and is HUMI_OK. Bottom half (lines 278–718) is the original Phase-3 layer — uses `Card` + `Button` correctly but is **English-only** in user-visible labels, which violates the Thai-primary constraint visible side-by-side with the new Thai header above.

| Section | Lines | Verdict | Refactor target | Effort |
|---|---|---|---|---|
| Pending termination card | 176–226 | HUMI_OK | none | 0 |
| Pending leave card | 229–276 | HUMI_OK | none | 0 |
| Page header (h1 + subtitle + delegation button) | 279–292 | MIXED | translate subtitle + Badge labels + Delegations button to Thai | XS |
| Stats strip (chip row) | 295–308 | MIXED | translate chip labels (Leave/Expense/…) to Thai via existing `LEAVE_TYPE_LABEL` pattern | XS |
| Filter bar — search + date range | 311–343 | MIXED | translate placeholder + `to` separator + aria-labels to Thai (Card primitive itself is fine) | XS |
| Filter bar — type/urgency chips + bulk actions | 345–402 | MIXED | translate `TYPE_LABELS` map values + urgency `All/Urgent/Normal/Low` + bulk `Select All / N selected / Approve All / Reject All` | S |
| Approval list cards | 406–474 | HUMI_OK | none (Badge + Card + tokens already used) | 0 |
| Slide-over preview panel | 477–587 | MIXED | translate eyebrow labels (`Summary / Details / Amount / Dates / Approval Timeline / Attachments / Submitted / Notes / Request Details`) to Thai; one **bug** to fix while in the file: line 532 `bg-success-tint0` and line 532 `bg-danger-tint0` are typos (trailing `0`) — should be `bg-success` / `bg-danger` | S |
| Sticky bulk action bar | 591–608 | MIXED | translate `N items selected / Approve All / Reject All / Clear` to Thai | XS |
| Confirmation modal | 611–649 | MIXED | translate title + body + textarea label/placeholder + button labels (`Cancel` etc.) — note `t('messages.confirmApprove')` already used for single-item path; extend the same i18n key pattern to bulk path | S |
| Delegation modal | 652–718 | MIXED | translate the entire dialog (title, headers, all field labels, button text). Uses `Modal` primitive already, only literal strings need replacement | M |

### Top-3 violations
1. **English-only subtitle directly under Thai header** (line 282): `"Review and process pending approvals"` renders immediately under `tQuick('title')` which is Thai. Highest visual jarring — this is what the user flagged as "two design systems on one page".
2. **English-only filter chips and bulk-action labels** (lines 295–402): `Leave / Expense / Overtime / Claim / Transfer / All / Urgent / Normal / Low / Select All / Deselect All / N selected / Approve All / Reject All`. Thai-primary violation across the entire filter strip.
3. **English-only Delegation modal** (lines 652–718): an entire dialog has zero Thai. Manage Delegations / Active Delegations / Create New Delegation / Delegate To / Start Date / End Date / Workflow Types / Create Delegation / Creating… — every label is English. Largest single block of policy violation.

### English-only labels found (line: text → Thai replacement)
- 282: `Review and process pending approvals` → `ตรวจสอบและดำเนินการคำขอที่รออนุมัติ`
- 285: `${stats.urgent} urgent` → `เร่งด่วน ${stats.urgent}`
- 286: `${stats.total} total` → `ทั้งหมด ${stats.total}`
- 289: `Delegations` → `มอบหมายสิทธิ์อนุมัติ`
- 297–302: `Leave / Expense / Overtime / Claim / Transfer / Changes` → `ลา / เบิกค่าใช้จ่าย / โอที / เคลม / ย้าย / เปลี่ยนข้อมูล`
- 321: `Search by name or description...` → `ค้นหาด้วยชื่อหรือคำอธิบาย...`
- 332: aria-label `Date from` → `วันที่เริ่มต้น`; 334 separator `to` → `ถึง`; 340 aria-label `Date to` → `วันที่สิ้นสุด`
- 33–42 `TYPE_LABELS`: `All / Leave / Expense / Overtime / Change Request / Claim / Transfer` → `ทั้งหมด / ลา / เบิกค่าใช้จ่าย / โอที / คำขอเปลี่ยนข้อมูล / เคลม / ย้าย`
- 374: `All / Urgent / Normal / Low` → `ทั้งหมด / เร่งด่วน / ปกติ / ต่ำ`
- 386: `Deselect All / Select All` → `ยกเลิกเลือกทั้งหมด / เลือกทั้งหมด`
- 390: `${selectedIds.size} selected` → `เลือก ${selectedIds.size} รายการ`
- 412: `t('approvals.noApprovals')` already i18n — confirm Thai value exists in `messages/th.json`
- 433: aria-label `Select ${item.employeeName}` → `เลือก ${item.employeeName}`
- 466 / 467 / 468: aria-labels `Preview / Approve / Reject` → `ดูตัวอย่าง / อนุมัติ / ปฏิเสธ`
- 479: `Request Details` + aria `Close` → `รายละเอียดคำขอ` + `ปิด`
- 500 / 506 / 513 / 519 / 527 / 550 / 563 / 570: eyebrow labels `Summary / Details / Amount / Dates / Approval Timeline / Attachments / Submitted / Notes` → `สรุป / รายละเอียด / จำนวนเงิน / วันที่ / ขั้นตอนการอนุมัติ / เอกสารแนบ / ส่งเมื่อ / หมายเหตุ`
- 594: `${selectedIds.size} items selected` → `เลือก ${selectedIds.size} รายการ`
- 597 / 600 / 603: `Approve All / Reject All / Clear` → `อนุมัติทั้งหมด / ปฏิเสธทั้งหมด / ล้าง`
- 614: title `Confirm Approval / Confirm Rejection` → `ยืนยันการอนุมัติ / ยืนยันการปฏิเสธ`
- 621–622: bulk-confirm body → `คุณยืนยันที่จะอนุมัติ ${count} รายการหรือไม่?` / `คุณยืนยันที่จะปฏิเสธ ${count} รายการหรือไม่?`
- 627: `Comment (optional) / Reason (required)` → `ความเห็น (ไม่จำเป็น) / เหตุผล (จำเป็น)`
- 634: placeholder `Optional comment... / Please provide a reason...` → `ความเห็นเพิ่มเติม... / กรุณาระบุเหตุผล...`
- 639: `Cancel` → `ยกเลิก`
- 646: `Processing...` → `กำลังดำเนินการ...`
- 655: Modal title `Manage Delegations` → `จัดการการมอบหมายสิทธิ์อนุมัติ`
- 660: `Active Delegations` → `การมอบหมายที่ใช้งานอยู่`
- 662: `No active delegations` → `ยังไม่มีการมอบหมายสิทธิ์`
- 675: aria `Revoke` → `ยกเลิกการมอบหมาย`
- 686: `Create New Delegation` → `สร้างการมอบหมายใหม่`
- 688: `Delegate To (Employee ID)` → `มอบหมายให้ (รหัสพนักงาน)`; 689 placeholder `e.g. EMP005` → `เช่น EMP005`
- 693 / 697: `Start Date / End Date` → `วันที่เริ่ม / วันที่สิ้นสุด`
- 702: `Workflow Types` → `ประเภทคำขอ`
- 713: `Create Delegation / Creating...` → `สร้างการมอบหมาย / กำลังสร้าง...`

### Refactor target for W9.2
- **No structural rewrite needed** — Card/Button/Modal/Badge usage is already correct.
- **Single concern: Thai-primary i18n.** Replace literal English strings inline (or add keys to `messages/th.json` + `messages/en.json` and route through `tQuick`/`t`). Either approach is acceptable; inline is faster and matches the local `TYPE_LABELS` const pattern at lines 33–42.
- **One bug fix while in the file:** correct `bg-success-tint0`/`bg-danger-tint0` typos at line 532.

---

## Surface 2 — `/th/me/documents` (`src/app/[locale]/me/documents/page.tsx`)

**Status:** entire 148-line file is one inline-style block. Uses `humi-card`, `humi-row`, `humi-tag` class tokens (good) but mixes them with raw `style={{...}}` for **every** layout/typography/color decision. This is the "old design" smell flagged by Wave 8.

| Section | Lines | Verdict | Refactor target | Effort |
|---|---|---|---|---|
| Page wrapper | 33 | LEGACY | `style={{ padding, maxWidth, margin }}` → wrap in standard ESS page-shell or use Tailwind `max-w-3xl mx-auto px-7 py-6` | XS |
| Header (h1 + subtitle) | 34–44 | LEGACY | `<header style={{ marginBottom: 24 }}>` + h1 with inline `fontSize/fontWeight/color` → swap to Tailwind `mb-6` + `text-2xl font-semibold text-ink font-display` and subtitle `text-sm text-ink-muted` | XS |
| Filter chip row | 47–74 | LEGACY | inline `style` on every chip → use existing `humi-tag` modifiers (`humi-tag--accent` for active state) + Tailwind `flex flex-wrap gap-2 mb-5 items-center`. Drop the inline `background/color/border/padding/fontSize/borderRadius` block at 60–68 | S |
| Empty state | 78–89 | LEGACY | inline `style={{ padding: '48px 24px', textAlign: 'center', color }}` on `humi-card` → Tailwind `p-12 text-center text-ink-muted` | XS |
| Document table | 91–144 | LEGACY | wholesale rebuild: replace raw `<table>` with **`DataTable` from `@/components/humi`** which already handles header bg, cell padding, typography, hover, keyboard nav. All 30+ inline `style` props at lines 92–143 collapse into `<DataTable columns={...} rows={filtered} />` | M |

### Top-3 violations
1. **Raw `<table>` with hand-rolled inline styling** (91–144): the codebase already exports `DataTable` from `@/components/humi/DataTable`. Reinventing the table here is the largest LOC liability and the most visually divergent piece — the new ESS pages render via `DataTable`, so this row-strip looks foreign next to them.
2. **Inline `style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-ink)' }}` on h1** (35–38): the canonical pattern is `font-display` + Tailwind size class. The Wave-8 ESS reference uses `<CardTitle>` or `text-2xl font-semibold font-display text-ink`.
3. **Inline `style` per filter chip** (60–68): `humi-tag` already encodes the chip shape. Active state should use `humi-tag--accent` (defined in globals.css:806). Current code re-implements that with inline `background: var(--color-accent-soft)` + `color: var(--color-accent)` — same tokens, just the long way.

### English-only labels found
None. All user-visible text already in Thai (เอกสารส่วนบุคคล / ดูและดาวน์โหลด... / ทั้งหมด / ไม่พบเอกสาร / ชื่อเอกสาร / ประเภท / วันที่ออก / ดาวน์โหลด).

### Refactor target for W9.3
- Replace inline `style` with Tailwind utility classes (no logic changes).
- Replace raw table with `DataTable` from `@/components/humi`. Column shape:
  ```ts
  [
    { key: 'name', header: 'ชื่อเอกสาร', cell: (d) => d.name },
    { key: 'type', header: 'ประเภท', cell: (d) => HR_DOC_TYPE_LABELS[d.type] },
    { key: 'issuedDate', header: 'วันที่ออก', cell: (d) => formatDate(d.issuedDate, 'medium', 'th') },
    { key: 'download', header: 'ดาวน์โหลด', align: 'right', cell: (d) => <a href={d.downloadUrl}>...</a> },
  ]
  ```
- Preserve all `data-testid` attributes (`me-documents-page`, `docs-filter`, `docs-filter-${value}`, `docs-empty`, `docs-list`, `doc-row-${id}`, `doc-download-${id}`) — Wave-8 e2e tests depend on them.

**LOC delta estimate:** −60 / +25 (net −35).

---

## Surface 3 — `/th/resignation` (`src/components/resignation/resignation-page.tsx`)

**Status:** Phase-2 / BRD #172 page. Heavy inline `style` for layout (gap, padding, marginBottom, maxWidth) on top of correct `humi-card`, `humi-input`, `humi-label`, `humi-btn`, `humi-eyebrow`, `humi-tag` class tokens. Form behavior is correct and recently fixed (banner-above-form pattern, BRD #172, see commits `7b08daf` / `c39fdbf`) — **must not regress.**

| Section | Lines | Verdict | Refactor target | Effort |
|---|---|---|---|---|
| Success view wrapper | 76–84 | MIXED | `style={{ display: 'flex', flexDirection: 'column', gap: 20 }}` → Tailwind `flex flex-col gap-5` | XS |
| Success view card | 85–148 | MIXED | inline `style={{ padding: 24 }}` on `humi-card` + 4 inline `marginBottom: 4` on eyebrows + flex-row inline style at 87–93 → Tailwind `p-6` + drop margin overrides (eyebrow has its own bottom margin token) + Tailwind `flex items-center gap-3 mb-5` | S |
| Form-page wrapper | 154 | MIXED | same inline flex → Tailwind `flex flex-col gap-5 pb-8` | XS |
| Status banners (pending_manager / pending_spd / approved / rejected) | 162–196 | MIXED | inline `style={{ padding: 16 }}` on each `humi-card` variant → Tailwind `p-4` (uses canonical card padding scale) + drop inline `marginBottom: 4` on eyebrows | S |
| Form card | 199–292 | MIXED | inline `style={{ padding: 24 }}` outer + 6 inline `marginBottom: 16/20/24` on field groups + inline `maxWidth` on each input + inline submit-row `justifyContent/gap` → Tailwind `p-6` + `space-y-5` on field stack + `max-w-[220px]` / `max-w-[360px]` / `max-w-[520px]` Tailwind classes + footer row `flex justify-end gap-2` | M |
| Info note card | 295–299 | MIXED | inline `style={{ padding: '12px 16px' }}` → Tailwind `px-4 py-3` | XS |

### Top-3 violations
1. **`style={{ display: 'flex', flexDirection: 'column', gap: 20 }}` on the page wrappers** (77, 154): Tailwind `flex flex-col gap-5` is the codebase standard; using inline style here defeats responsive utilities and conflicts with `pb-8` already on the same element.
2. **`style={{ padding: 24 }}` repeated on every `humi-card`** (85, 199): the `humi-card` token already has a default padding (`var(--space-card)`); inline override re-defines it inconsistently across the page. Replace with `p-6` Tailwind utility — or better, accept the default by removing the override and verify visual parity in W9.4.
3. **Inline `marginBottom` on every `humi-eyebrow`** (108, 114, 121, 126, 138, 164, 173, 182, 191, 200): scattered margin overrides. The `humi-eyebrow` class already sets its own bottom spacing in globals.css:724. Drop the override; if a tighter look is needed in one place, use Tailwind `mb-1`.

### English-only labels found
None. All Thai-primary (คำขอลาออก / ยื่นคำขอลาออก... / กรอกข้อมูลการลาออก / วันทำงานวันสุดท้าย / ส่งคำขอลาออก / etc.).

### Refactor target for W9.3
- Pure visual cleanup — replace `style={{...}}` with Tailwind utility classes. **No JSX restructuring, no behavior change.**
- Keep all form state, validation logic, banner conditions, `myRequest.status` branching, BRD #172 reason-code mapping — exactly as-is.
- Keep the success view as a separate render branch (do not merge with form view).
- Keep all i18n / date formatting / store wiring untouched.

**LOC delta estimate:** −25 / +10 (net −15).

---

## Refactor plan summary

- **Files modified:** 3
  - `src/components/manager/quick-approve-page.tsx` (W9.2)
  - `src/app/[locale]/me/documents/page.tsx` (W9.3)
  - `src/components/resignation/resignation-page.tsx` (W9.3)
- **Sections to rewrite:** 11 MIXED + 4 LEGACY = 15 sections total. **Zero structural rewrites** — all are token swaps, i18n string replacement, or inline-style → Tailwind migrations.
- **Estimated LOC delta:** −80 / +50 (net **−30 LOC**, smaller surface).
- **Behavioral risk:** **low** for both workers. No router, store, validation, hook, or RBAC edits. Worker-pages must preserve all `data-testid` attributes for Wave 8 e2e regression suite.
- **One opportunistic bug fix in scope for W9.2:** `bg-success-tint0` / `bg-danger-tint0` typo at quick-approve-page.tsx:532 (broken Tailwind class — currently renders no color).

### Worker assignment
- **W9.2 (worker-quickapprove):** `/th/quick-approve` only. Scope = Thai-primary i18n pass + tint typo fix. Approx 50 string replacements concentrated in lines 33–42, 282–308, 321–397, 479–582, 594–603, 614–646, 655–714. **Effort: M** (1 file, mechanical, ~2h).
- **W9.3 (worker-pages):** `/th/me/documents` + `/th/resignation`. Scope = inline-style → Tailwind on documents (with table → `DataTable` swap) + inline-style → Tailwind on resignation. Preserve all behavior + test IDs. **Effort: M+** (2 files, one of them includes a `DataTable` swap, ~3h).

### Hand-off checklist for both workers
- [ ] Dev server runs and renders all three routes (`/th/quick-approve`, `/th/me/documents`, `/th/resignation`) without console errors
- [ ] All existing `data-testid` attributes preserved
- [ ] No new component primitives introduced (adopt-not-reinvent)
- [ ] Thai-primary: no English-only user-visible labels remaining (W9.2)
- [ ] No inline `style={{...}}` blocks remaining for layout/typography/color (W9.3) — except where genuinely dynamic (computed pixel values driven by state)
- [ ] `npm test` and `npx tsc --noEmit` clean before hand-off to W9.4
