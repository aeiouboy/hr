# Humi Design System — Token Reference

> Central Group HR (Humi) design tokens — Tailwind v4 `@theme` SSOT ที่
> `src/frontend/src/app/globals.css`. Reference สำหรับ component builders
> + screen builders ใน Sprint Adapt from Shelfly Bundle.
>
> Ref: `specs/humi-frontend-redesign.md` · `docs/shelfly-hr-design-research.md`

## ปรัชญา

- **Cream canvas + navy ink** — ไม่ใช่ stark white + pure black. อบอุ่นแบบ editorial HR ไม่ใช่ retail POS dashboard.
- **Teal เป็นสัญญาณหลัก, indigo เป็นทางเลือก** — accent มีแค่ 2 ตัว ผู้ใช้เลือกได้ใน Settings แต่ clay/coral ถูกตัดออก (NO-RED guardrail).
- **Shadow-based elevation** — card ไม่พึ่ง border หนา ใช้ `--shadow-sm` / `--shadow-md` บน cream background.
- **CPN display + CPN body** — family เดียวให้ทั้ง headline และ paragraph มี character ชัด Anuphan รับ Thai glyph ที่ CPN ไม่มี.

## สีหลัก (Primary Palette)

| Token | Hex | ใช้เมื่อไหร่ |
|---|---|---|
| `--color-accent` | `#1FA8A0` | teal — primary brand accent, focus ring, active state, primary CTA background |
| `--color-accent-soft` | `#D6EEEC` | card variant, tag.accent, focus ring halo 4px |
| `--color-accent-alt` | `#5B6CE0` | indigo — second option ใน Settings/Tweaks, info state |
| `--color-accent-alt-soft` | `#E1E4FB` | info tag, indigo card variant |
| `--color-canvas` | `#F6F1E8` | cream — body background, sidebar wrapper บน light mode |
| `--color-canvas-soft` | `#FCFAF5` | cream-2 — inset cards, tab track |
| `--color-surface` | `#FFFFFF` | paper — card body, input background |
| `--color-ink` | `#0E1B2C` | navy — primary text, sidebar background (dark panel) |
| `--color-ink-soft` | `#243447` | secondary text, ghost button text |
| `--color-ink-muted` | `#5A6A7E` | placeholder, helper text |
| `--color-ink-faint` | `#8A97A8` | disabled, day-off in calendar |
| `--color-hairline` | `#E7DFD1` | 1px divider บน cream, card border |
| `--color-hairline-soft` | `#EFE9DC` | row divider in list |

### Brand legacy alias

- `--color-brand` = `#1FA8A0` (alias ของ teal) — replace `#C8102E` (Central retail red) ที่ Precision Cool ใช้. Sprint 1 backend ไม่ได้ผูกกับ var นี้ จึงปลอดภัย.

## Secondary Palette (Warm, NO-RED)

| Token | Hex | ใช้เมื่อไหร่ |
|---|---|---|
| `--color-sage` | `#9BB5A0` | avatar gradient, success-leaning tag |
| `--color-sage-soft` | `#DDE7DE` | tag.sage background |
| `--color-butter` | `#E8C46B` | avatar gradient, highlight accent |
| `--color-butter-soft` | `#F4E4B8` | tag.butter background |

## Semantic Status

> **NO-RED rule**: ไม่มี `#C8553D` / `#E08864` / `#C8102E` / `#DC2626` / `#EF4444` ทุก danger/error ใช้ pumpkin orange `#FB923C` (orange-leaning) เพื่อยัง convey error แต่ไม่ clash กับ cream + teal identity.

| Token | Hex | Use case |
|---|---|---|
| `--color-success` | `#10B981` | emerald — checkmark, approved state |
| `--color-success-soft` | `#D1FAE5` | success tag background |
| `--color-warning` | `#F59E0B` | amber — pending, attention (swap ของ coral) |
| `--color-warning-soft` | `#FEF3C7` | warning tag background |
| `--color-danger` | `#FB923C` | pumpkin — error/destructive (swap ของ clay) |
| `--color-danger-soft` | `#FFEDD5` | danger tag background, input error halo |
| `--color-danger-ink` | `#9A3412` | readable ink บน danger-soft |
| `--color-info` | `#5B6CE0` | indigo — info, link |
| `--color-info-soft` | `#E1E4FB` | info tag background |

## Typography

### Font stacks

```css
--font-sans:    var(--font-cpn), var(--font-anuphan), ui-sans-serif, system-ui, sans-serif;
--font-display: var(--font-cpn-condensed), var(--font-cpn), var(--font-anuphan), ui-sans-serif, system-ui, sans-serif;
--font-mono:    var(--font-geist-mono), ui-monospace, 'Courier New', monospace;
```

- **CPN** — Latin-only OTF (`public/fonts/cpn/`, 10 weights). โหลดผ่าน `next/font/local` ใน `src/frontend/src/app/fonts.ts`.
- **Anuphan** — Thai fallback (Google font). Browser จะเลือกตัวที่ render glyph ได้ในแต่ละ character range.
- **Geist Mono** — numerics เท่านั้น (table cells, metric cards).

### Type scale

| Role | Token | Size/Line-height | Weight |
|---|---|---|---|
| H1 (page hero) | `text-display-h1` | 32 / 40 | 700 (CPN Condensed Bold) |
| H2 (section) | `text-display-h2` | 24 / 32 | 600 |
| H3 (card title) | `text-display-h3` | 20 / 28 | 600 |
| Body | `text-body` | 15 / 24 | 400 |
| Small | `text-small` | 13 / 20 | 400–500 |
| Eyebrow | `text-eyebrow` | 11 / 16, tracking 0.14em | 600 uppercase |

## Radius

| Token | Value | ใช้เมื่อไหร่ |
|---|---|---|
| `--radius-sm` | 10px | tag pill, icon button inner |
| `--radius-md` | 14px | input, icon-button wrapper, tweaks swatch |
| `--radius-lg` | 20px | card, feature tile |
| `--radius-xl` | 28px | hero card, login art panel |

## Shadows (elevation)

Warm navy-tinted shadow บน cream canvas ไม่ใช่ cool blue-gray.

| Token | Preview use |
|---|---|
| `--shadow-sm` | card default elevation |
| `--shadow-md` | dropdown, popover, sticky topbar on scroll |
| `--shadow-lg` | modal, Tweaks panel (fixed bottom-right) |
| `--shadow-card` | alias ของ `--shadow-sm` สำหรับ clarity ใน component code |

## Motion

| Token | Value | ใช้เมื่อไหร่ |
|---|---|---|
| `--dur-fast` | 120ms | hover color transition |
| `--dur-base` | 220ms | expand/collapse, sidebar toggle |
| `--dur-slow` | 380ms | modal enter/exit |
| `--ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` | default easing — snappy แต่นุ่ม |

## Do / Don't

### Do
- ใช้ `bg-canvas` + `text-ink` เป็น page baseline (ไม่ใช่ `bg-white text-black`)
- Focus ring = `ring-4 ring-accent-soft` รอบ input
- Avatar gradient ใช้ sage/teal/butter/ink — **ห้าม** coral/clay
- ใช้ `font-display` สำหรับ headline และ numeric KPI, `font-sans` สำหรับ body

### Don't
- **ห้าม** ใส่ `* { margin: 0; padding: 0 }` (Rule 26b) — Tailwind preflight จัดการให้แล้ว
- **ห้าม** hardcode hex ใน component — ต้อง reference token ผ่าน Tailwind utility (`bg-accent`, `text-ink-soft`)
- **ห้าม** import CPN ผ่าน `<link>` CDN — layout shift. ใช้ `next/font/local` เสมอ
- **ห้าม** ใช้ red family (`#DC2626`, `#EF4444`, `#C8102E`, `#C8553D`, `#E08864`) ทุกที่ใน `src/frontend/`

## ไฟล์ที่เกี่ยวข้อง

- `src/frontend/src/app/globals.css` — `@theme` SSOT (token หลัก)
- `src/frontend/src/app/fonts.ts` — next/font loaders
- `src/frontend/src/app/layout.tsx` — wire font variables เข้า `<html className>`
- `src/frontend/public/fonts/cpn/*.otf` — CPN Latin font files (10 weights)

## Verification

```bash
# NO-RED grep — ต้อง return 0
grep -iE '#(C8553D|E08864|C8102E|DC2626|EF4444)' src/frontend/src/app/globals.css

# AC-1: 4 primary colors present
grep -E '#1FA8A0|#5B6CE0|#F6F1E8|#0E1B2C' src/frontend/src/app/globals.css
# expect: 4 matches

# AC-7 Rule 26b: NO global * reset
grep '^\s*\*\s*{' src/frontend/src/app/globals.css
# expect: 0 matches
```
