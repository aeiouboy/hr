# STA-116 — Reposition sections & actions on Employee detail page

**Status:** APPROVED (ralplan consensus — iteration 2; Critic ACCEPT after 3 amendments: scoped `dense` prop for height, button-only `onClick` nav, preserved `change_type` gate) — pending implementation by /linear-implement
**Linear:** STA-116 "[BE] reposition section and action in 'employee'" (High, Benefit)
**Surface:** `admin/employees/[id]` detail hub — demo `/admin/employees/EMP-0002`
**Phase:** UI mockup (no backend). Humi tokens, NO-RED, TH/EN parity, larger text, no dev-internal copy.

---

## Context

The employee detail page is one long Client Component:
`src/frontend/src/app/[locale]/admin/employees/[id]/page.tsx` (1900 lines).

It renders, top→bottom in JSX source order:
1. Person snapshot card (NOT in scope — keep first).
2. **Employment** → "Employment information" — `CollapsibleSectionCard` @ **page.tsx:1007** (`id="emp-employment"`).
3. Workflow-status snapshot block (conditional, NOT one of the 5 cards) @ page.tsx:1341.
4. **Special Privilege** → "Special privileges" — `CollapsibleSectionCard` @ **page.tsx:1399** (`id="emp-special-privilege"`).
5. **Budget Reallocation** → "Reallocation log" — `CollapsibleSectionCard` @ **page.tsx:1509** (`id="emp-budget-reallocation"`).
6. **Benefits** → "Current Benefits" — `CollapsibleSectionCard` @ **page.tsx:1555** (`id="emp-current-benefits"`).
7. **Benefits** → "Benefit enrollment" — `CollapsibleSectionCard` @ **page.tsx:1614** (`id="emp-benefit-enrollment"`).
8. Modals (detail/enroll/claim), HRBP PerPersonal block, Timeline, CompensationHistory.
9. **Action menu** ("การดำเนินการ") grid @ **page.tsx:1812-1896** — renders `ACTION_CARDS[]` (defined page.tsx:830-922) as large tiles.

**Critical finding — the "2 large action buttons" are ACTION_CARDS tiles, not standalone buttons.**
Screenshot `/tmp/sta116/02-buttons.png` shows them at the bottom of the page; they are the last two tiles of the Action-menu grid:
- "Add / adjust individual benefit" = the `tSpecial('cardLabel')` card @ **page.tsx:904-912** → `href` `/${locale}/admin/employees/${empId}/special-privilege`.
- "Allocate Entitlement amount" = the `tReallocate('cardLabel')` card @ **page.tsx:913-921** → `href` `/${locale}/admin/employees/${empId}/reallocate-budget`.

Both are navigation tiles in the `ACTION_CARDS` grid, each gated by the `avail.change_type.ok` lock (`locked: !avail.change_type.ok`, page.tsx:910/:919) → greyed for terminated/inactive employees. BA wants these two pulled OUT of the grid and placed as **small buttons in the matching section headers, to the LEFT of the Expand button** — the `change_type` gate is preserved on the new buttons (see c5).

The shared card component is `CollapsibleSectionCard`:
`src/frontend/src/components/admin/wizard/CollapsibleSectionCard.tsx`.
- Card shell @ CollapsibleSectionCard.tsx:42 — `className="humi-card rounded-[22px] p-[22px] shadow-[0_1px_0_rgba(14,27,44,0.03)]"` → **p-[22px] is the "too tall" padding** (22px all sides on the collapsed header).
- Header row @ :45 — `flex items-start justify-between gap-4`; left = `SectionHeader`, right = the Expand `<button>` @ :52.
- The Expand button is the slot the small action button must sit to the LEFT of.
- All 5 sections share this ONE component, so height + a header-action slot are single-place changes.

i18n (messages live at `src/frontend/messages/{en,th}.json`, NOT under `src/`):
- `admin.specialPrivilege.cardLabel` — EN:4300 "Add / adjust individual benefit" · TH:4179 "เพิ่ม/ปรับสวัสดิการรายคน".
- `admin.reallocateBudget.cardLabel` — EN:4357 "Allocate Entitlement amount" · TH:4236 "จัดสรรจำนวนสิทธิ".
- Both keys exist with TH/EN parity → **no new copy needed.**

Humi `Button` (`src/components/humi/Button.tsx:48-52`) supports `size="sm"` (`h-8 px-3 text-small`) and `variant="secondary"` (teal outline — NO-RED safe).

---

## Work Objectives

1. Reorder the 5 collapsible section cards to BA target order.
2. Shrink the collapsed card vertical padding once in `CollapsibleSectionCard` (keep width).
3. Add an optional header-action slot to `CollapsibleSectionCard` (left of Expand); slot the two small buttons into Special Privileges + Reallocation log; remove their two large tiles from the Action-menu grid.
4. No label changes, no new i18n.

## Guardrails

**Must have**
- Exactly the 5 target section cards in the new order; person snapshot stays first; Timeline / CompensationHistory / Action-menu stay after the 5 cards.
- Height reduction applied once on the shared component; **width unchanged** (only the vertical padding / header height changes).
- Both small buttons preserve the exact navigation target of the tiles they replace.
- Humi tokens only; `variant="secondary"` (no red/danger); TH/EN parity; `npm run build` green.

**Must NOT have**
- No per-card duplicated markup for the reorder (move whole `<CollapsibleSectionCard>…</CollapsibleSectionCard>` blocks; don't fork the component per card).
- No change to card width, to the inner section bodies, to eyebrow/title labels, or to the other 9 action tiles.
- No new dependency, no backend wiring, no STA-internal copy in UI.
- Don't move the Workflow-status snapshot, HRBP block, Timeline, or CompensationHistory.

---

## File-by-file plan

### (a) Reorder the 5 section cards — `page.tsx`

Move the 5 whole `<CollapsibleSectionCard …>…</CollapsibleSectionCard>` JSX blocks into BA target order. Current source order → target order:

| Slot | Target card (`id`) | Currently at | Action |
|------|--------------------|--------------|--------|
| 1 | Employment info (`emp-employment`) | 1007 | stays first |
| 2 | Current Benefits (`emp-current-benefits`) | 1555 | move UP |
| 3 | Benefit enrollment (`emp-benefit-enrollment`) | 1614 | move UP |
| 4 | Special privileges (`emp-special-privilege`) | 1399 | move DOWN |
| 5 | Reallocation log (`emp-budget-reallocation`) | 1509 | move DOWN |

Mechanics (pure JSX reordering — no logic/state/hook changes; all four state flags + selectors stay where they are):
- Keep `emp-employment` (1007-1339) in place.
- Leave the Workflow-status snapshot (1341-1396) where it is (after Employment) OR move it below the 5 cards — **see Open Question Q3**; default = leave in place (smallest diff). If left in place it sits between slot-1 and slot-2; that is acceptable since it's a conditional, non-collapsible status block, not one of the 5.
- Reorder the four benefit/privilege/realloc blocks so the emitted order is: Current Benefits → Benefit enrollment → Special privileges → Reallocation log.
- The 3 modals (1649-1699) are unaffected by reorder (rendered after the cards); keep them after slot 5.

### (b) Shrink collapsed card height — `CollapsibleSectionCard.tsx` (SCOPED via a `dense?` prop)

⚠️ **Blast radius (Critic MAJOR):** `CollapsibleSectionCard` is NOT employee-page-only — it is also rendered by `admin/benefits/page.tsx:199`, `admin/hire/clusters/ClusterWho.tsx` (8 instances), and `admin/hire/clusters/ClusterJob.tsx` (3 instances). A blanket `p-[22px]→py-[14px]` change at :42 would silently restyle those screens too. **Decision: SCOPE the height change to the employee page only via an opt-in `dense?: boolean` prop** — do NOT change the default padding. (Global tightening was considered and rejected: it touches the hire wizard + benefits page with no BA ask and no test coverage there.)

```tsx
// CollapsibleSectionCard.tsx — add prop, default false (all existing callers unchanged)
dense?: boolean;
// shell className (:42): keep horizontal 22px always; cut vertical only when dense
className={`humi-card rounded-[22px] px-[22px] ${dense ? 'py-[14px]' : 'py-[22px]'} shadow-[0_1px_0_rgba(14,27,44,0.03)]`}
```
Then pass `dense` on ONLY the 5 employee-page `<CollapsibleSectionCard>` instances. The 12 hire-wizard + benefits instances omit it → render byte-identically (`py-[22px]`).

- Horizontal padding stays `22px` → **card width and inner content width unchanged**.
- Vertical padding `22px → 14px` **on the 5 employee cards only**; net collapsed-header height drop ≈ 16px per card (8px top + 8px bottom), ~80px total. Other surfaces unaffected.
- The Expand button (`min-h-9` = 36px) still defines the minimum header height, so cards remain tappable; `items-start` keeps icon/label alignment.
- SectionHeader has `mb-4` (16px) below the title; in collapsed state the body is `hidden`, so that margin currently adds nothing visible below — no change needed. (If the collapsed card still reads tall in review, the secondary lever is `SectionHeader` `mb-4`→`mb-0` — note as Open Question Q1, do not pre-apply.)

### (c) Move 2 action buttons into section headers; remove the 2 large tiles

**c1 — add an optional header-action slot to `CollapsibleSectionCard.tsx`** (single place, used by 2 callers):

- Add prop `headerAction?: React.ReactNode` to `CollapsibleSectionCardProps`.
- In the header row (`:45 flex items-start justify-between gap-4`), render `headerAction` immediately BEFORE the Expand `<button>` so it sits to the button's left. Wrap the two in a right-aligned cluster, e.g.:

```tsx
<div className="flex shrink-0 items-center gap-2">
  {headerAction}
  {isValid === true && (<CheckCircle2 … />)}
  <button …>{collapsed ? expandLabel : collapseLabel} <ChevronDown … /></button>
</div>
```

(Keeps the existing `isValid` check next to the toggle; `headerAction` defaults undefined → all other callers of `CollapsibleSectionCard` render identically.)

**c2 — Special privileges card** (`emp-special-privilege`, now slot 4): add
```tsx
// Button is forwardRef<HTMLButtonElement> + ButtonHTMLAttributes ONLY — NO as/href/asChild
// (Button.tsx:66-77). Do NOT use <Button as={Link}> — it will not compile.
// Use onClick + the already-imported router (page.tsx:17, :634). Preserve the change_type gate (c5).
headerAction={
  <Button variant="secondary" size="sm"
          disabled={!avail.change_type.ok}
          onClick={() => router.push(`/${locale}/admin/employees/${empId}/special-privilege`)}>
    {tSpecial('cardLabel')}
  </Button>
}
```
**Navigation target must stay `/special-privilege`.** (Alternative: wrap a `Link` around a non-disabled button; but the gate (c5) makes `onClick`+`disabled` the cleaner form.)

**c3 — Reallocation log card** (`emp-budget-reallocation`, now slot 5): same `onClick`+`disabled={!avail.change_type.ok}` pattern with
`tReallocate('cardLabel')` → `router.push('/${locale}/admin/employees/${empId}/reallocate-budget')`.

**c5 — preserve the `change_type` gate (remove-not-hide, Critic Q2).** The two original `ACTION_CARDS` tiles carried `locked: !avail.change_type.ok` (page.tsx:910, :919) so they grey out for terminated/inactive employees. The new header buttons MUST keep that gate via `disabled={!avail.change_type.ok}` (shown in c2/c3) so behaviour is preserved — do not drop it. On the active demo employee (EMP-0002) both buttons are enabled, so the demo path is unaffected; on a terminated employee they correctly disable, matching the old tiles.

**c4 — remove the 2 large tiles from `ACTION_CARDS`**: delete the two objects at page.tsx:904-912 (specialPrivilege card) and 913-921 (reallocateBudget card). The grid (1822) then renders the remaining 9 lifecycle tiles. Leave the `BadgePlus` / `ArrowLeftRight` imports if still used (they ARE — used as the section-card `icon` props at 1401 and 1511 — so keep both imports). `tSpecial`/`tReallocate` stay (still used by the sections).

### (d) i18n

**None.** Both labels (`admin.specialPrivilege.cardLabel`, `admin.reallocateBudget.cardLabel`) already exist with TH/EN parity. The reorder + resize need no copy.

---

## Acceptance Criteria

1. **Order** — On `/admin/employees/EMP-0002`, the 5 collapsible cards render top→bottom as: Employment information → Current Benefits → Benefit enrollment → Special privileges → Reallocation log. (Person snapshot remains above; Timeline/Comp/Action-menu remain below.)
2. **Height** — Collapsed card vertical padding is `py-[14px]` (down from `p-[22px]`); collapsed-header height is visibly shorter (~16px/card less) with **width and horizontal padding unchanged** vs. before. Same width verified by eye + DOM (no change to the card's left/right box).
3. **Special privileges button** — A small (`size="sm"`) secondary button labelled by `specialPrivilege.cardLabel` ("Add / adjust individual benefit" / "เพิ่ม/ปรับสวัสดิการรายคน") sits to the LEFT of that section's Expand button and navigates to `/admin/employees/EMP-0002/special-privilege`.
4. **Reallocation button** — Likewise a small secondary button labelled by `reallocateBudget.cardLabel` ("Allocate Entitlement amount" / "จัดสรรจำนวนสิทธิ") left of the Reallocation log Expand button → `/admin/employees/EMP-0002/reallocate-budget`.
5. **No large tiles** — The Action-menu grid no longer contains those two tiles (9 remaining tiles); no large standalone "Add/adjust…" or "Allocate…" buttons anywhere on the page.
6. **Design** — Humi tokens only; buttons are teal `secondary` (NO-RED); TH and EN both render correct labels (parity).
7. **Gate** — `npm run build` passes (TS typecheck) and `npm run lint` clean for the two edited files. (Implementer gate.)

---

## Playwright test outline

New spec `e2e/sta-116-employee-reposition.spec.ts` (model on `e2e/sta-55-acting-card.spec.ts`):

- Seed an admin/HRBP+ persona (so action surfaces + sections render) and null `/api/auth/session` per the persona-session recipe; navigate `/{locale}/admin/employees/EMP-0002`.
- **Order assert:** query all `section[id^="emp-"]` headings in DOM order (read each card's title text), expect array == `['Employment information','Current Benefits','Benefit enrollment','Special privileges','Reallocation log']` (EN locale) — proves source reorder.
- **Header-button assert (Special Privileges):** within `#emp-special-privilege`'s header, assert a button/link with `cardLabel` text exists AND its position is left of the Expand control (e.g. it precedes the `Expand` button in DOM, or compare boundingBox.x). Click it → URL becomes `…/special-privilege`.
- **Header-button assert (Reallocation log):** same within `#emp-budget-reallocation` → `…/reallocate-budget`.
- **Removal assert:** in the Action-menu grid (`การดำเนินการ`), assert NO element with `specialPrivilege.cardLabel` or `reallocateBudget.cardLabel` text remains; assert the grid tile count dropped by 2.
- **Height assert (optional):** read `#emp-employment` computed `padding-top` == `14px` (proves the resize landed) and the card's `clientWidth` matches a reference card to prove width unchanged.
- Screenshot the full page (EN + TH) for BA eyeball; attach to the Linear ticket.

---

## RALPLAN-DR

**Principles**
1. One shared component owns reorder-affecting layout — change height/header in ONE place, not per card.
2. Preserve behaviour: the two buttons must navigate to exactly what the tiles navigated to.
3. Minimal reversible diff — JSX block moves + a className tweak + an optional prop; no logic/state churn.
4. Mockup-phase fidelity: Humi tokens, NO-RED, TH/EN parity, no STA-internal copy.

**Decision drivers (top 3)**
1. Single-place height/header change (DRY) vs. per-card overrides.
2. Keep card width invariant while cutting height (split padding, not uniform shrink).
3. Reuse existing i18n keys + existing nav targets (zero copy, zero handler rewrite).

**Viable options**

- **Option A — Reorder JSX blocks in place + split padding on shared component + `headerAction` prop slot (CHOSEN).**
  Pros: smallest diff; height fixed once for all 5 cards; width guaranteed unchanged (horizontal padding untouched); both buttons reuse existing keys + nav; no new abstraction. Cons: the 5 cards are ~600 lines of JSX, so the move is a careful copy-paste (mitigated by moving whole delimited blocks + the order Playwright assert).

- **Option B — Extract a `SECTIONS` config array and render the 5 cards from a `.map()` in target order.**
  Pros: future reorders become a 1-line array change; declarative. Cons: over-engineering for a one-time reposition; each card body is bespoke (tables, stores, modals, selectors) so the config entries would carry render-prop closures — larger, riskier diff; fights the "minimal reversible" principle. Invalidated for THIS ticket (revisit only if reorder recurs).

- **Option C — Leave tiles in the Action menu, just duplicate small buttons into the headers.**
  Invalidated: BA explicitly says *remove* the two large buttons; duplicating violates the requirement and the unified-action intent.

**Decision:** Option A. Low architectural risk, implementation-ready.

---

## ADR

- **Decision:** Reorder the 5 `CollapsibleSectionCard` JSX blocks in place; add an opt-in `dense?` prop to `CollapsibleSectionCard` (vertical padding `22px→14px`, horizontal/width unchanged) and pass it on ONLY the 5 employee-page cards (the 12 hire-wizard + benefits-page instances stay `py-[22px]` — no blast radius); add an optional `headerAction` slot and slot the two existing action labels (as `size="sm"` secondary buttons, `onClick` router nav, `disabled` on the preserved `change_type` gate) into the Special Privileges and Reallocation log headers; delete those two tiles from `ACTION_CARDS`.
- **Drivers:** DRY single-place height/header change; width-invariant resize; reuse existing i18n + nav targets; minimal reversible diff.
- **Alternatives considered:** config-array `.map()` render (B — over-engineered for a one-off); duplicate-not-move (C — violates BA "remove").
- **Why chosen:** Option A meets every BA requirement with the smallest, lowest-risk change and no new copy or handlers.
- **Consequences:** `CollapsibleSectionCard` gains a backward-compatible optional prop (all other call sites unchanged). Action-menu grid shrinks from 11→9 tiles. Collapsed page is ~80px shorter.
- **Follow-ups:** If reorder requirements recur, revisit Option B. If the collapsed card still reads tall, apply the `SectionHeader mb-4`→`mb-0` secondary lever (Q1).

---

## Open Questions

- **Q1 — exact collapsed height:** screenshot `/tmp/sta116/01-order.png` shows tall cards but no pixel spec. Plan proposes `py-[14px]` (≈16px/card reduction). If BA wants tighter, the secondary lever is `SectionHeader` `mb-4`→`mb-2/0`. Confirm target feel at review.
- **Q2 — RBAC on the two header buttons:** RESOLVED in-plan (c5) — preserve the original `change_type` gate via `disabled={!avail.change_type.ok}` (remove-not-hide convention; matches the tiles). No BA decision needed; noted only in case BA wants the buttons fully hidden (vs disabled) for inactive employees.
- **Q3 — Workflow-status snapshot placement:** it currently sits between Employment and the benefit sections. After reorder it would land between slot 1 (Employment) and slot 2 (Current Benefits). Confirm that's fine, or move it below the 5 cards. Default: leave in place (smallest diff).
- **Q4 — relation to STA-115:** "Add / adjust individual benefit" navigates to the per-employee `/special-privilege` route; this is the single-employee action and is **separate** from STA-115's bulk design. No coupling; noting to prevent scope bleed.
