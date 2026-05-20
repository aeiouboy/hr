# Humi Design Tokens Compact

> Compact Markdown reference สำหรับ agent และ frontend builders. Source of truth คือ `src/frontend/src/app/globals.css`; เอกสารนี้สรุป token ที่ต้องใช้ใน UI โดยไม่ hardcode สีใน component.

## Design Intent

- **Cream canvas + navy ink** เป็น baseline; หลีกเลี่ยง stark white/black admin UI
- **Teal primary + indigo secondary** สำหรับ action, focus, active และ info state
- **No red family**: danger/error ใช้ pumpkin orange เท่านั้น
- **CPN + Anuphan** สำหรับ Latin/Thai, Geist Mono สำหรับตัวเลข
- **Soft radius + shadow elevation** บน cream canvas แทน border หนา

## Color Tokens

### Foundation

| Token | Value | Usage |
|---|---:|---|
| `--color-canvas` | `#F6F1E8` | Page/body background |
| `--color-canvas-soft` | `#FCFAF5` | Inset cards, tab tracks |
| `--color-surface` | `#FFFFFF` | Card body, input background |
| `--color-surface-raised` | `#FCFAF5` | Raised surface variant |
| `--color-ink` | `#0E1B2C` | Primary text, dark rail |
| `--color-ink-soft` | `#243447` | Secondary text |
| `--color-ink-muted` | `#5A6A7E` | Helper text, placeholder |
| `--color-ink-faint` | `#8A97A8` | Disabled/hint text |
| `--color-hairline` | `#E7DFD1` | Card border, divider |
| `--color-hairline-soft` | `#EFE9DC` | Row/list divider |

### Accent

| Token | Value | Usage |
|---|---:|---|
| `--color-accent` | `#1FA8A0` | Primary CTA, active state, focus |
| `--color-accent-soft` | `#D6EEEC` | Focus halo, accent tag/card |
| `--color-accent-ink` | `#0E1B2C` | Text on accent surfaces |
| `--color-accent-alt` | `#5B6CE0` | Indigo secondary/info accent |
| `--color-accent-alt-soft` | `#E1E4FB` | Indigo soft surface |
| `--color-brand` | `#1FA8A0` | Legacy brand alias mapped to teal |
| `--color-brand-tint` | `#D6EEEC` | Legacy brand tint alias |
| `--color-brand-hover` | `#188A83` | Brand/teal hover state |

### Warm Secondary

| Token | Value | Usage |
|---|---:|---|
| `--color-sage` | `#9BB5A0` | Avatar gradient, soft positive accent |
| `--color-sage-soft` | `#DDE7DE` | Sage tag background |
| `--color-butter` | `#E8C46B` | Highlight accent |
| `--color-butter-soft` | `#F4E4B8` | Butter tag background |

### Semantic

| Token | Value | Usage |
|---|---:|---|
| `--color-success` | `#10B981` | Approved/checkmark state |
| `--color-success-soft` | `#D1FAE5` | Success tag background |
| `--color-warning` | `#F59E0B` | Pending/attention state |
| `--color-warning-soft` | `#FEF3C7` | Warning tag background |
| `--color-danger` | `#FB923C` | Error/destructive state, pumpkin only |
| `--color-danger-soft` | `#FFEDD5` | Error halo/tag background |
| `--color-danger-tint` | `#FFEDD5` | Legacy alias for danger soft |
| `--color-danger-ink` | `#9A3412` | Text on danger soft |
| `--color-info` | `#5B6CE0` | Info/link state |
| `--color-info-soft` | `#E1E4FB` | Info tag background |

## Typography Tokens

| Token | Value | Usage |
|---|---|---|
| `--font-sans` | CPN, Anuphan, system sans | Body and general UI |
| `--font-display` | CPN Condensed, CPN, Anuphan, system sans | Headline, KPI, nav brand |
| `--font-mono` | Geist Mono, system mono | Numeric/table values |
| `--text-display-h1` | `32px / 40px` | Page hero |
| `--text-display-h2` | `24px / 32px` | Section title |
| `--text-display-h3` | `20px / 28px` | Card title |
| `--text-body` | `15px / 24px` | Default body |
| `--text-small` | `13px / 20px` | Helper, metadata |
| `--text-eyebrow` | `11px / 16px`, `0.14em` | Uppercase eyebrow label |

## Layout, Radius, Shadow, Motion

| Token | Value | Usage |
|---|---:|---|
| `--max-width-page` | `1680px` | Main page content max width |
| `--radius-xs` | `6px` | Tiny controls |
| `--radius-sm` | `10px` | Tags, inner icon buttons |
| `--radius-md` | `14px` | Inputs, medium cards |
| `--radius-lg` | `20px` | Large cards, tiles |
| `--radius-xl` | `28px` | Hero/login panels |
| `--radius-2xl` | `18px` | Legacy compatibility radius |
| `--radius-full` | `9999px` | Pills |
| `--shadow-sm` | Warm navy low elevation | Default card |
| `--shadow-md` | Warm navy medium elevation | Dropdown/popover |
| `--shadow-lg` | Warm navy high elevation | Modal/drawer |
| `--shadow-card` | `var(--shadow-sm)` | Card alias |
| `--dur-fast` | `120ms` | Hover transition |
| `--dur-base` | `220ms` | Expand/collapse |
| `--dur-slow` | `380ms` | Modal/drawer enter-exit |
| `--ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default soft motion |

## Component Usage Rules

### Button

- Primary: `bg-accent`, text on accent, focus `ring-4 ring-accent-soft`
- Secondary/Ghost: surface or transparent with `text-ink-soft`
- Danger: use `bg-danger` or `bg-danger-soft text-danger-ink`; never red utilities

### Card

- Use Humi `Card` primitive before route-local surfaces
- Default surface: `bg-surface`, `rounded-[var(--radius-lg)]`, `shadow-[var(--shadow-card)]`
- Flat/table cards may use `border border-hairline`

### Form Field

- Inputs use `bg-surface`, `border-hairline`, `rounded-[var(--radius-md)]`
- Focus state uses teal ring only
- Error helper uses pumpkin danger tokens, not red

### Table/List

- Header and row text use ink tokens
- Dividers use `border-hairline-soft`
- Hover/selected row uses accent soft or canvas soft

## Do / Don’t

### Do

- Use Tailwind token utilities: `bg-canvas`, `bg-surface`, `text-ink`, `border-hairline`, `ring-accent-soft`
- Use existing Humi primitives from `src/frontend/src/components/humi`
- Keep cream canvas and navy ink as visual baseline
- Use teal for primary interactions and indigo for info/secondary accents

### Don’t

- Do not hardcode hex in route/component code
- Do not use red color utilities or red-family custom colors
- Do not import fonts by CDN; use `next/font/local` and existing font variables
- Do not expose internal source/mapping notes in product UI
- Do not add global reset rules; Tailwind preflight already handles reset

## Source of Truth

- Tokens: `src/frontend/src/app/globals.css`
- Token reference: `docs/design-system-humi.md`
- Components: `src/frontend/src/components/humi`
- Component reference: `docs/humi-components.md`
