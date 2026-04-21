# Humi Shell Port Notes — Task A1

**Scope:** Port `docs/design-ref/shelfly-bundle/project/shell.jsx` → Next.js AppShell + Sidebar + Topbar. 1:1 replica; replaces earlier invented 6-item AppShell.

**Commit:** ironteam Phase A Task A1 (aeiouboy/hr#2)

---

## Files

| File | Change |
|------|--------|
| `src/frontend/src/components/humi/shell/Sidebar.tsx` | NEW — 3-section × 10-item nav + brand + user footer |
| `src/frontend/src/components/humi/shell/Topbar.tsx` | NEW — eyebrow + h2 title + search (visual) + bell |
| `src/frontend/src/components/humi/shell/AppShell.tsx` | NEW — composes Sidebar + Topbar + children |
| `src/frontend/src/components/humi/AppShell.tsx` | REWRITE — re-export from `./shell` so `layout.tsx` import stays stable |
| `src/frontend/src/app/globals.css` | APPEND — ported `.humi-*` classes from reference `styles.css` |
| `docs/humi-shell-port-notes.md` | NEW — this file |

Top-level `layout.tsx` and `src/components/humi/index.ts` are **unchanged** (`AppShell` import path is preserved via re-export).

---

## Nav 1:1 (reference `shell.jsx` NAV array → our Sidebar)

| # | Section | Reference label | Reference icon | Route | Lucide icon | Badge |
|---|---------|-----------------|----------------|-------|-------------|-------|
| 1 | พื้นที่ทำงานของฉัน | หน้าหลัก | `home` | `/th/home` | `Home` | — |
| 2 | พื้นที่ทำงานของฉัน | โปรไฟล์ของฉัน | `people` | `/th/profile/me` | `User` | — |
| 3 | พื้นที่ทำงานของฉัน | ลางาน | `calendar` | `/th/timeoff` | `Calendar` | `2` |
| 4 | พื้นที่ทำงานของฉัน | เงินเดือนและสวัสดิการ | `heart` | `/th/benefits-hub` | `Heart` | `1` |
| 5 | พื้นที่ทำงานของฉัน | คำร้องและแบบฟอร์ม | `doc` | `/th/requests` | `FileText` | `1` |
| 6 | บุคลากร | เป้าหมายและผลงาน | `shield` | `/th/goals` | `Target` | — |
| 7 | บุคลากร | การเรียนรู้ | `book` | `/th/learning-directory` | `BookOpen` | — |
| 8 | บุคลากร | ผังองค์กร | `globe` | `/th/org-chart` | `Network` | — |
| 9 | บริษัท | ประกาศ | `mega` | `/th/announcements` | `Megaphone` | — |
| 10 | บริษัท | จัดการระบบ | `plug` | `/th/integrations` | `Plug` | — |

All 10 Thai labels preserved verbatim from reference. 3 section headers verbatim too.

---

## Icon mapping decisions (reference custom SVG → lucide-react)

Reference ships a hand-drawn 1.5px stroke icon set (`icons.jsx`). We map 1:1 to the closest lucide semantic equivalent per task-spec approval:

- `home` → `Home`
- `people` → `User` *(reference `people` is a couple glyph; task instruction pins `User` for profile item)*
- `calendar` → `Calendar`
- `heart` → `Heart`
- `doc` → `FileText`
- `shield` → `Target` *(goals & performance = target, reads better for HR context; task spec explicitly lists Target here)*
- `book` → `BookOpen`
- `globe` → `Network` *(org chart = organizational graph, not earth)*
- `mega` → `Megaphone`
- `plug` → `Plug`
- `search` → `Search`
- `bell` → `Bell`

**Brand mark:** Reference `<ShelflyMark>` is a gumdrop/person silhouette. We keep the exact SVG shape (two paths — circle head + rounded body) but rename to `<HumiMark>` and inline it in `Sidebar.tsx` so the wordmark renders as `Hum` + mark — matching reference visual 1:1. Color uses `var(--color-accent)` (teal) per token palette. Wordmark text is `Hum` (with mark completing the word visually, per reference line 26).

---

## Copy adaptations (retail → generic HR)

| Location | Reference | Our value |
|----------|-----------|-----------|
| Sidebar footer name | `จงรักษ์ ทานากะ` | `จงรักษ์ ทานากะ` *(unchanged — Ken is the signed-in persona)* |
| Sidebar footer role | `ผู้จัดการร้าน · สาขาฮัมเบอร์` | `ผู้จัดการฝ่ายบุคคล · สำนักงานใหญ่` *(per task spec — HR generic)* |
| Topbar greeting | `สวัสดีตอนเช้าค่ะ คุณจงรักษ์` | `สวัสดีตอนเช้าค่ะ คุณจงรักษ์` *(unchanged — reference default)* |
| Search placeholder | `ค้นหาพนักงาน เอกสาร…` | `ค้นหาพนักงาน เอกสาร…` *(unchanged)* |

---

## CSS strategy — utilities vs ported classes

Rule 26b forbids a global `*` reset. We keep Tailwind preflight as the reset, and port the reference's component-level classes into a `humi-*` namespace so they live alongside existing tokens without clashing with `components/humi/Nav.tsx` (which is a different, earlier primitive).

**Classes ported as custom CSS** (each annotated with `/* Ported from styles.css:NN */`):

| Humi class | Reference selector | Why custom CSS, not utilities |
|------------|--------------------|-------------------------------|
| `.humi-app` | `.app` | grid-template-columns with fixed sidebar ratio |
| `.humi-sidebar` | `.sidebar` | sticky + full-height + dark ink bg |
| `.humi-brand`, `.humi-wordmark` | `.sidebar .brand`, `.sidebar .brand .wordmark` | display font + mark-inline |
| `.humi-nav-label` | `.nav-label` | uppercase eyebrow inside dark sidebar (rgba text on ink) |
| `.humi-nav-item` + `.active` + `:hover` | `.nav-item`, `.nav-item.active`, `.nav-item:hover` | pseudo-class variants, rgba bg overlays on dark surface |
| `.humi-nav-icon` | `.nav-icon` | descendant styling via `.humi-nav-item.active .humi-nav-icon` |
| `.humi-pill` | `.nav-item.active .pill` *(generalized to all items with badge)* | pill chip w/ margin-left:auto inside nav row |
| `.humi-sidebar-foot` | `.sidebar-foot` | top border + margin-top:auto push-to-bottom |
| `.humi-avatar`, `.humi-avatar.coral` | `.avatar`, `.avatar.coral` | gradient backgrounds w/ variant modifier |
| `.humi-user-meta`, `.humi-user-name`, `.humi-user-role` | `shell.jsx:48-51` inline styles | converted inline-style-on-divs into named classes for a11y + reuse |
| `.humi-main` | `.main` | 36px side gutter + min-width:0 |
| `.humi-topbar` | `.topbar` | sticky + gradient fade + z-index over sidebar content |
| `.humi-search`, `.humi-search kbd` | `.search`, `.search kbd` | composite input-look surface + kbd chip |
| `.humi-icon-btn` | `.icon-btn` | 40×40 chip with positioned dot-badge child |
| `.humi-dot-badge` | `.icon-btn .dot-badge` | absolute-positioned indicator |
| `.humi-eyebrow` | `.eyebrow` | scoped local duplicate used inside Topbar |
| `.humi-spacer` | `.spacer` | local duplicate (existing `.spacer` in styles.css:395 — easier to reason when fully namespaced) |

**Token substitutions:** Reference references `var(--ink)`, `var(--paper)`, `var(--cream)`, `var(--accent)`, `var(--coral)`, `var(--line)` etc. Humi token names differ by design — so every raw reference var was rewritten to the Humi equivalent:

| Reference token | Humi token |
|-----------------|-----------|
| `--ink` | `--color-ink` |
| `--ink-2` | `--color-ink-soft` |
| `--ink-3` | `--color-ink-muted` |
| `--paper` | `--color-surface` |
| `--cream` | `--color-canvas` |
| `--cream-2` | `--color-canvas-soft` |
| `--line` | `--color-hairline` |
| `--accent` | `--color-accent` |
| `--coral` (dot-badge) | `--color-warning` *(amber — per NO-RED guardrail; Humi palette has no coral token)* |

No raw hex remains inside the ported classes **except** the avatar gradients (`#E08864`, `#E8C46B`, `#F4E4B8`, `#E7E3D8`) which are reference-specific warm palette and have no Humi token equivalent — kept literal and documented here. Revisit when Humi extends its avatar-gradient tokens.

---

## A11y uplift vs reference

The reference uses `<div onClick>` on every nav item and a `<button>` only for the bell. We upgraded:

- Nav items → `<Link href>` (real routing + Enter/Space native + `aria-current="page"` on active).
- Bell → `<button type="button" aria-label="การแจ้งเตือน">` (unchanged from reference but with `aria-label` so AT reads "การแจ้งเตือน" not just the icon title tooltip).
- Badges → `aria-label="{n} รายการใหม่"` (so AT announces count+units, not a bare number).
- Search → `role="search"` on the container so the visual pill is discoverable as a landmark; kbd chip is purely decorative (visual only — not hooked to a real ⌘K handler this task).
- Focus states → `:focus-visible` outline with `var(--color-accent)` on both nav-item and icon-btn.

---

## Ambiguities + how resolved

1. **Brand wordmark text — "Hum" vs "Humi"?** Reference says literal `Hum` followed by `<ShelflyMark>` so the mark reads as the `i`-dot. Kept `Hum` + mark — reads as "Humi" visually and is a true 1:1 port. Documented here so future editors don't "fix" it to the full word `Humi` and break the visual.
2. **Greeting default** — Reference defaults subtitle to `"สวัสดีตอนเช้าค่ะ คุณจงรักษ์"` with no time-of-day awareness. Kept as-is; time-aware greeting is out of scope for A1.
3. **Badge visibility** — Reference CSS (`styles.css:220` `.nav-item.active .pill`) styles pill only inside active items, but JSX (`shell.jsx:40`) always renders `<span class="pill">` when `item.badge` is set. We follow the JSX intent (badge always visible when set) and style `.humi-pill` unconditionally.
4. **Icon for `goals`** — Reference uses `shield` glyph; task spec lists `Target` as the lucide equivalent. Target is semantically closer to "เป้าหมาย" (target). Chose `Target` per task spec; noted for PO review.
5. **Coral dot-badge → amber** — Humi token palette has no coral per NO-RED guardrail. Substituted `var(--color-warning)` (amber). Visual difference is minor; aligns with Humi semantic colors.

---

## Out of scope (A1 does **not** touch)

- 11 screens (home, profile, timeoff, benefits-hub, requests, goals, learning-directory, announcements, integrations — those are A4–A14).
- Existing `src/components/humi/Nav.tsx` primitive (unused by the new AppShell but kept for backwards compat with any page that still imports it).
- Existing non-ref screens under `src/app/[locale]/*` — no deletions, no edits; route archive is task A15.
- Dark-mode tuning of ported `.humi-*` classes (sidebar is already dark ink; rest uses Humi tokens which re-theme via `.dark`, so dark-mode is "mostly free" but not explicitly verified).
