# Shelfly HR Design Research

> MK V — Researcher report สำหรับ Humi HR (Central Group HR platform replacement).
> Source: handoff bundle จาก Claude Design (claude.ai/design) → extract จาก tar.gz API response.

## Source

- **URL**: https://api.anthropic.com/v1/design/h/LzUlfr53JDndAM1vL5mIiw?open_file=Shelfly+HR.html
- **Fetched**: 2026-04-20T17:27+07:00
- **Fetch method**: `curl` → ไฟล์ที่ได้เป็น `gzip → tar archive` (Content-Type: `application/gzip`, 2.27 MB) — ไม่ใช่ HTML ตรงๆ. Firecrawl/WebFetch จะ fail เพราะ endpoint serve binary bundle
- **Extract flow**: `gunzip` → `.tar` → `tar -xf` → ได้ `hrms/` directory (README + project/ + chats/)
- **README found**: ✅ มี `hrms/README.md` — อธิบายว่าเป็น "Claude Design handoff bundle" พร้อม instruction ให้อ่าน chat transcript + `Shelfly HR.html` เต็มไฟล์ก่อน implement
- **Chat transcript**: ✅ `hrms/chats/chat1.md` (876 บรรทัด) — มี full design journey: brief → iteration → Thai translation → font swap (Bricolage/Inter → CPN) → product pivot (marketing site → real HRIS) → bug fixes
- **Primary HTML**: `hrms/project/Shelfly HR.html` (20,864 บรรทัด, 1.5 MB — inline Babel compiled output + 10 screen jsx sources loaded via `<script type="text/babel" src=...>`)
- **Source directory**: `/tmp/shelfly_extract/hrms/project/` (readable source files: `styles.css`, `shell.jsx`, `icons.jsx`, `screens/*.jsx`)

## Brand Context Note (สำคัญ)

Design file ชื่อ "Shelfly" เป็น placeholder ที่ Claude Design ตั้งในรอบแรก (เพราะ "Humi" เป็นบริษัท HR จริงในแคนาดา). หลังจากนั้น user instruct ให้ rename กลับเป็น **"Humi"** — ทุก screen + login + sidebar ใช้ wordmark `Humi` แล้ว. รอบ final ของ bundle นี้คือ Humi branding ไม่ใช่ Shelfly. ชื่อไฟล์ยังค้าง `Shelfly HR.html` ไว้เฉยๆ.

> **Implication for Humi HR project**: design นี้ถูก tailor ให้เป็น "Humi" อยู่แล้ว (wordmark + sidebar brand mark "Hum" + gumdrop `i`). Asset reuse ได้ตรงโดยไม่ต้อง rebrand.

## Design Language Overview

- **Overall aesthetic**: **Warm, human, professional** — ไม่ corporate แข็ง, ไม่ playful เกินไป. วางตัวเองเป็น "modern retail HR" (ลูกค้าเป้าหมายในต้นฉบับ: store managers + hourly retail staff)
- **Design era reference**: Notion / Linear / Basecamp hybrid — generous radius, soft shadows, cream background เป็น base (ไม่ใช่ cold-white), มี blob decoration + grain overlay แบบ Stripe Press / Linear landing
- **Emotional tone**: เชื่อใจได้ (trustworthy), ไม่ cold, เน้นคำพูดเป็นกันเอง ("ยินดีต้อนรับกลับมา คุณอวา", "ทีมพร้อมทำงาน") พูดกับผู้ใช้โดยตรง
- **Brand archetype**: "Caregiver + Creator" — human-centric copy + illustration blobs

## Color Palette

### Base palette (from `styles.css` `:root`)

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0E1B2C` | Deep navy — primary foreground, sidebar bg, ink cards |
| `--ink-2` | `#243447` | Secondary ink |
| `--ink-3` | `#5A6A7E` | Muted ink (body copy) |
| `--ink-4` | `#8A97A8` | Placeholder / day-off |
| `--line` | `#E7DFD1` | Warm cream border |
| `--line-2` | `#EFE9DC` | Lighter divider |
| `--cream` | `#F6F1E8` | App background (WARM, not white) |
| `--cream-2` | `#FCFAF5` | Secondary cream |
| `--paper` | `#FFFFFF` | Card background |
| `--accent` | `#1FA8A0` | **Teal** — default accent |
| `--accent-soft` | `#D6EEEC` | Teal tint for backgrounds |
| `--coral` | `#E08864` | Warning / attention |
| `--coral-soft` | `#F6DDCE` | Coral tint |
| `--sage` | `#9BB5A0` | OK / healthy |
| `--sage-soft` | `#DDE7DE` | Sage tint |
| `--butter` | `#E8C46B` | Pending / soon |
| `--butter-soft` | `#F4E4B8` | Butter tint |
| `--danger` | `#C8553D` | Error (RED-adjacent) |
| `--ok` | `#2F8A6B` | Success |

### Tweaks panel — Accent theme switcher (from HTML `ACCENTS` map)

ผู้ใช้ swap accent ได้ 6 ตัวเลือก ผ่าน Tweaks floating panel:

| Key | Hex | Soft | Display name |
|---|---|---|---|
| `teal` | `#1FA8A0` | `#D6EEEC` | Shelfly teal |
| `indigo` | `#5B6CE0` | `#E0E4FA` | Indigo (← **current default** ในรอบล่าสุด, เห็นใน `html style="--accent: #5B6CE0"`) |
| `plum` | `#8E4E90` | `#EEDDEF` | Plum |
| `forest` | `#2F8A6B` | `#D4ECDF` | Forest |
| `clay` | `#C8553D` | `#F4D9D1` | Clay |
| `mustard` | `#C99A2E` | `#F4E4B8` | Mustard |

### 🔴 NO-RED audit (Humi constraint check)

| Color | Hex | RED concern? |
|---|---|---|
| `--danger` | `#C8553D` | ⚠️ **RED-orange** — ใช้เฉพาะ error state, intensity ต่ำ (ไม่ใช่ pure red) แต่ยังอยู่ใน red family |
| `clay` accent | `#C8553D` | ⚠️ เหมือน `--danger` — เป็น accent option → **ต้องตัดทิ้งถ้าใช้กับ Humi** (Rungrote = NO RED) |
| `--coral` | `#E08864` | ✅ **Coral/peach** — warm แต่ไม่ใช่ red (ต้องให้ Rungrote confirm เคสนี้; technically `#E08864` = RGB(224,136,100) ออกส้มมากกว่าแดง) |
| อื่นๆ | ทั้งหมด | ✅ ไม่ใช่ red |

**Recommendation สำหรับ Humi**:
- ลบ `clay` ออกจาก accent options
- Map `--danger` ไป `#C99A2E` (mustard) หรือ `#8A4A2F` (burnt brown) แทน
- ยืน `--coral` ไว้ได้ (peach/salmon) แต่ต้อง double-check กับ Rungrote — ถ้าไม่โอเค swap เป็น `#D8A15C` (caramel) หรือใช้ Humi palette ตรงจาก logo decks (teal/emerald/indigo/plum/amber ที่ recolor script ทำไว้แล้ว)

## Typography

### Font stack (ปัจจุบัน Humi branding ใน bundle)

- **Display (headings + KPI numbers)**: `'CPN Condensed', 'CPN', ui-sans-serif, system-ui` → **CPN Condensed** (Central Pattana proprietary font) เป็น primary display
- **Body**: `'CPN', ui-sans-serif, system-ui` → **CPN Regular** (weights 300/400/700 + italics)
- **Mono / eyebrow** (ใช้น้อย): `'CPN Compressed', ui-monospace, monospace`
- **Thai fallback** (loaded ในไฟล์ HTML): `IBM Plex Sans Thai` + `Noto Sans Thai` (weights 400/500/600/700) — ผ่าน Google Fonts preconnect
- **Override ใน HTML inline style**: `body, button, input, select, textarea { font-family: CPN !important; }` + `h1-h6 { font-family: CPN !important; letter-spacing: 0 !important; }` — บังคับ CPN ทับทั้งเว็บ

### Font files included (bundle)

CPN family มีครบทุก weight ใน `hrms/project/fonts/` และ `uploads/`:
- CPN-Light, CPN-LightItalic (300)
- CPN-Regular, CPN-Italic (400)
- CPN-Bold, CPN-BoldItalic (700)
- CPN-Condensed, CPN-BoldCondensed
- CPN-Compressed, CPN-ExtraCompressed

> ✅ Bonus: CPN = Central Pattana font! ทำให้ Humi ไม่ต้อง license font ใหม่ — **พร้อมใช้ได้ทันที** กับ Central Group branding guideline.

### Type scale

| Level | Size | Line-height | Family | Weight |
|---|---|---|---|---|
| `h1` | 44px | 1.02 | CPN Condensed | 600 |
| `h2` | 28px | 1.1 | CPN Condensed | 600 |
| `h3` | 20px | 1.2 | CPN Condensed | 600 |
| `h4` | 15px | 1.3 | CPN Condensed | 600 |
| body | 14px | 1.5–1.6 | CPN Regular | 400 |
| small/eyebrow | 11–12px | 1.3 | CPN Regular | 500–600 |
| `.eyebrow` | 11px | — | uppercase, letter-spacing 0.14em | 600 |

### Weight usage pattern

- **700** (Bold): KPI numbers (`.ring .val`), badges, avatars, pinned tags
- **600** (SemiBold): Headings, button labels, row-item names
- **500** (Medium): Nav items, body emphasis
- **400** (Regular): body copy, descriptions
- **300** (Light): ไม่ค่อยใช้

## Layout Patterns

### App shell

```
grid-template-columns: 248px 1fr
├── .sidebar (dark ink #0E1B2C, sticky, height:100vh)
│   ├── .brand (wordmark "Humi" + gumdrop mark)
│   ├── .nav-label + .nav-item × N (grouped by section)
│   └── .sidebar-foot (avatar + name + role)
└── .main (padding: 0 36px 48px)
    ├── .topbar (sticky, cream gradient fade)
    └── content (page-specific grids)
```

### Grid system

- **CSS Grid** (not flexbox grid, not 12-col) — ใช้ explicit `grid-template-columns` per section
- Common ratios: `1.35fr 1fr`, `1.2fr 1fr`, `1.1fr 1.5fr`, `1fr 1fr 1fr`, `1fr 1fr 1fr 1fr`
- `.grid { gap: 20px }` เป็น default; row-level use `style={{gap: 20, marginTop: 20}}`

### Container

- **No max-width** ที่ main area — flex กว้างเต็ม viewport ลบ sidebar 248px (ไม่ใช่ fixed 1280 container)
- Sidebar: fixed 248px
- Topbar search: `max-width: 420px` (ไม่เต็ม flex)
- Login art pane: `1.05fr 1fr` split-screen

### Spacing rhythm

- **8pt + 4pt hybrid** — ใช้ 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 36, 40, 48, 60, 80
- Card padding: 22px (standard) / 18px (tight) / 14–16px (micro cards)
- Radius scale: `--r-sm: 10` / `--r-md: 14` / `--r-lg: 20` / `--r-xl: 28`

### Shadow scale

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | 0 1px 0 rgba(14,27,44,0.04), 0 2px 6px rgba(14,27,44,0.04) | tab active, toggle thumb |
| `--shadow-md` | 0 1px 0 rgba(14,27,44,0.05), 0 6px 20px rgba(14,27,44,0.06) | standard elevated cards |
| `--shadow-lg` | 0 2px 0 rgba(14,27,44,0.06), 0 20px 40px rgba(14,27,44,0.10) | floating panels (tweaks), highlighted org node |

## Component Inventory

| Component | Class | Purpose | Key visual features |
|---|---|---|---|
| Sidebar | `.sidebar` | Left nav dark panel | 248px, dark ink bg, sticky 100vh, brand wordmark top, nav sections grouped, user avatar at bottom |
| Brand wordmark | `.brand .wordmark` | Logo lockup | "Humi" + `ShelflyMark` (gumdrop person SVG) replacing the `i` dot; teal accent on mark |
| Nav item | `.nav-item` | Sidebar link | icon + label + optional `.pill` badge; active state = bg rgba(255,255,255,0.08) + teal icon |
| Topbar | `.topbar` | Page header | sticky, gradient fade to cream, contains page title + eyebrow subtitle + search + notification icon + primary action |
| Search | `.search` | Global search | paper bg, ⌘K shortcut displayed in `kbd`, placeholder "ค้นหาพนักงาน เอกสาร…" |
| Icon button | `.icon-btn` | Topbar icon | 40×40, paper bg, dot-badge absolute pos (coral) for notifications |
| Button (primary) | `.btn.btn-primary` | Main CTA | ink bg (#0E1B2C), cream text, 12px radius |
| Button (accent) | `.btn.btn-accent` | Secondary CTA | accent bg (teal/swatch), ink text |
| Button (ghost) | `.btn.btn-ghost` | Tertiary | paper bg, line border, cream-2 hover |
| Card | `.card` | Main content container | paper bg, line border, radius 20px, 22px padding |
| Card variants | `.card.tight` / `.cream` / `.ink` / `.accent` | Themed cards | tight = 18px pad; cream = cream-2 bg; ink = dark card; accent = accent-soft bg |
| Feature card | `.feature` | Capability highlight | card + `.ico-wrap` 44×44 rounded icon tile (teal/coral/sage/butter variants) |
| Eyebrow | `.eyebrow` | Section micro-label | 11px uppercase, 0.14em tracking, ink-3 color — ใช้บนหัวทุก card |
| Tag | `.tag` + variants | Status pill | 4×10 rounded 999, cream bg default; variants: accent/coral/sage/butter/ink |
| Avatar | `.avatar` + variants | User initials | 34×34 round, gradient bg per variant (sage/teal/coral/ink), initials inside |
| Divider | `.divider` | Subtle separator | 1px line-2, 16px margin |
| List row | `.list > .row-item` | Table-like row | 3-col grid: avatar / content / actions; bottom-border divider, last-child no border |
| Ring / doughnut | `.ring` | KPI donut | conic-gradient, var `--p` (percent), center value in display font |
| Progress bar | `.progress > span` | Linear progress | 6px height, line-2 bg, accent fill, 999 radius |
| Toggle | `.toggle` | Switch | 38×22, line bg off, accent bg on, thumb 18px with shadow-sm |
| Tabs | `.tabs > .tab` | Inline segmented | cream-2 bg, 12px radius, active = paper + shadow-sm |
| Calendar mini | `.cal` | Month picker | 7-col grid, .dow header, .day cells with `.off/.has/.sel/.range` states, 4px accent dot for events |
| Blob decoration | `.blob` | Organic shape | absolute positioned, squircle radius `50% 50% 46% 46% / 60% 60% 40% 40%`, 4 color variants (teal/coral/sage/butter) |
| Grain overlay | `.grain::before` | Subtle texture | radial-gradient dots 3×3px, multiply blend, opacity 0.6 |
| Post / announcement | `.post` | Feed item | paper card 16px radius, 18px pad; pin variant uses accent-soft bg + transparent border |
| Reactions | `.reacts .r` | Emoji counts | 22px round, cream bg, -6px negative margin overlap (stacked) |
| Field | `.field label + input` | Form field | 13px label, 12×14 padded input, line border, 12px radius, accent focus ring `0 0 0 4px accent-soft` |
| Page head | `.page-head` | Title bar with border | flex end, 18px bottom border line-2 |
| Tweaks panel | `.tweaks` | Dev/demo control | fixed bottom-right, 260px, paper card shadow-lg, `.swatches` 6 color circles |
| Logo chip | `.logo-chip` | Integration mark | 12×14 pad, flex center, line border — for partner logos |

**Empty states / loading states**: ⚠️ ไม่พบ explicit pattern ใน source. มีแค่ filter/tabs ที่ render empty list เงียบๆ. **Gap สำหรับ Humi**: ต้องออกแบบเพิ่ม (skeleton loader + empty illustration).

## Screens Observed

ทั้งหมด **10 screens** (11 ถ้านับ `learning_directory.jsx` ที่รวม Learning + Directory):

| # | Screen | File | Key widgets |
|---|---|---|---|
| 1 | **Login** | `login.jsx` | split 1.05:1, dark art pane (blobs + testimonial card), form pane (email/pw + SSO buttons + Google Workspace) |
| 2 | **Home / หน้าหลัก** | `home.jsx` | hero greeting (cream gradient + 3 blobs), team availability ring, pending approvals list, docs to sign, announcements preview, mini-calendar, birthdays dark card |
| 3 | **My Profile / โปรไฟล์ของฉัน** | `profile.jsx` | banner + avatar + personal info (employment details, contact, skills, reviews) |
| 4 | **Time Off / ลางาน** | `timeoff.jsx` | 3 KPI cards (vacation/personal/sick balances), tabs (request/history/approve), pickup form, team coverage sidebar, ink policy card |
| 5 | **Pay & Benefits / เงินเดือนและสวัสดิการ** | `benefits.jsx` | 5-tab sub-nav (benefits/claims/docs/policies/pay), enrollment hero gradient, benefit plan cards with progress, dependents grid, claim hero + 4 stat cards (ค่ารักษา/ทันตกรรม/โทรศัพท์/น้ำมันรถ), recent claims list |
| 6 | **Goals & Performance / เป้าหมายและผลงาน** | `goals.jsx` | 4 micro KPI cards with colored border-left, tabs (goals/reviews/feedback/team), goal cards with key-results checkboxes, 1:1 check-in sidebar |
| 7 | **Learning / การเรียนรู้** | `learning_directory.jsx` | course catalog grid, progress tracking |
| 8 | **Org Chart / ผังองค์กร** | `orgchart.jsx` | split 1.1:1.5, LEFT: sticky manager-chain tree (Node component with sm/md/lg sizes + Connector 2px lines) + peers row + direct reports row; RIGHT: full employee profile (gradient banner + avatar + 4-col quick stats + contact + employment + skills + goals with progress bars + training + upcoming + HR notes ink card) |
| 9 | **Announcements / ประกาศ** | `announcements.jsx` | composer card (avatar + text trigger + action row), filter tabs (all/ops/policy/recog) + channel filter, feed of posts with pinned state, reactions, comments count |
| 10 | **Integrations / จัดการระบบ** | `integrations.jsx` | 4 KPI stat cards with colored border-left, category tabs (POS/Payroll/Schedule/Comms/Benefits/Training), integration grid with geometric Mark component (square/circle/triangle/bars/split/diamond) — no real logos used |

## Interaction / Motion

- **Button press**: `transform: translateY(1px)` on `:active` (tactile feedback)
- **Nav item hover**: `background: rgba(255,255,255,0.06)` + `color: #fff` (0.15s ease)
- **Transition**: all .15s ease — consistent across nav, inputs, tabs
- **Focus ring**: input focus → `border-color: accent` + `box-shadow: 0 0 0 4px accent-soft`
- **Org node highlight**: selected = accent-soft bg + transparent border + shadow-lg
- **Toggle thumb**: `transform: translateX(16px)` when `.on`
- **Avatar stack**: negative margin `-8px` for stacked team avatars, 2px paper border to separate

**Motion vocabulary ใช้น้อยมาก** — ไม่มี fade-in, slide, lift animations. Focus คือ static clarity ไม่ใช่ motion-heavy.

## Code-Level Observations

- **Framework**: React 18.3.1 (UMD) + Babel Standalone 7.29.0 (inline compile) + `<script type="text/babel">` per screen file
  - UNPKG CDN: `react.development.js`, `react-dom.development.js`, `babel.min.js`
- **CSS framework**: **Pure custom CSS** (NO Tailwind, NO shadcn) — 505 บรรทัด styles.css + inline `<style>` override ใน HTML head
- **Icon library**: **Custom inline SVG icon set** (30+ icons ใน `icons.jsx`) — stroke-based, 1.75 stroke-width, 24×24 viewBox. Style คล้าย Lucide/Heroicons แต่เขียนเอง
- **State management**: `React.useState` + `localStorage` (saved accent + screen key) — ไม่มี Redux/Zustand
- **No routing**: ใช้ `screen` state + `onNav(id)` prop drilling — sidebar → App state → current screen component
- **Components on `window`**: each screen attach `window.HomeScreen = ...` etc. (ไม่ใช้ ES modules เพราะ Babel Standalone in-browser)
- **Accessibility**:
  - `aria-hidden="true"` on decorative icons ✅
  - `lang="th"` on `<html>` ✅
  - `<label>` + `<input>` pattern ใน forms ✅
  - ⚠️ คีย์บอร์ด nav ไม่มี (div + onClick, ไม่ใช่ button) — **ต้อง fix ตอน port**
  - ⚠️ Focus management ใน tabs ไม่มี arrow-key handling — **Gap**
- **Localization**: Hardcoded Thai strings ในทุก screen (Buddhist year 2568, วัน/เดือนไทย). ไม่มี i18n framework
- **Thai typography**: HTML head มี IBM Plex Sans Thai + Noto Sans Thai loaded ผ่าน Google Fonts — เป็น fallback ถ้า CPN ไม่ cover glyph ไหน

## Reusable for Humi HR (Top 5)

1. **ทั้ง design token system** (`styles.css` `:root`) — ink/cream/paper/accent/coral/sage/butter + shadow/radius scale. Port ตรงเข้า Tailwind v4 `@theme` หรือ CSS vars ใน shadcn setup. เป็น **single source of truth** ที่ถ้า port ได้ครบจะรักษา aesthetic ทั้งหมด
2. **Sidebar pattern 3-section nav** (พื้นที่ทำงานของฉัน / บุคลากร / บริษัท) — ตรงกับ HRIS mental model ของ SAP SuccessFactors + ใช้ภาษาไทยที่เป็นธรรมชาติ ไม่ต้อง translate ใหม่
3. **Org Chart + Profile split layout** — sticky tree ซ้าย + detailed profile ขวา → replace SAP SF's clunky Org Chart module; Node component ที่มี 3 sizes (sm/md/lg) + Connector แบบ 2px line เรียบง่ายมาก ไม่ต้อง library
4. **Card variant system** (`.card.tight/.cream/.ink/.accent`) + **blob decoration** + **grain overlay** — ทำให้ UI "warm" โดยไม่ต้องใช้ photography/illustration เยอะ. Blob เป็น pure CSS (squircle radius + absolute positioning) — zero asset dependency
5. **KPI micro-card with border-left** (ใน Goals + Integrations screens) — 4-column grid, border-left 4px in palette color, eyebrow label + display-font number. **Pattern ที่ใช้ซ้ำได้ทั่วทั้ง HR metrics/dashboards**

### Secondary candidates (dark horse)

- **Tweaks floating panel** (`.tweaks`) — accent swatch selector → ปรับ theme live. ถ้าทำ Humi ให้ทีม Branding ทดลอง 36+ recolor variants ได้ live ใน prototype, เอาไปเสนอ Rungrote ได้เลย
- **Announcement composer** (single-line trigger → expand) — ง่ายกว่า SAP SF's bloat announcement module
- **Benefits tab structure** (สวัสดิการ/เบิกค่าใช้จ่าย/เอกสาร/นโยบาย/สลิปเงินเดือน) — ตรงกับ HR core use case ไทย (medical reimbursement, phone, car, dental) — already translated + realistic values

## Risks / Anti-patterns to avoid

### Content to scrub

- ทุก email domain `@humi.shop` → change to Central Group equivalent (`@centralgroup.com` / `@cpn.co.th`)
- Testimonial ใน login: "ดานา แอล. · ผู้จัดการเขต 5 สาขา" — ลบ/แทนด้วย real quote จาก Central Group executive หรือไม่ใส่ไปเลย
- ชื่อสาขา "ฮัมเบอร์", "ทองหล่อ", "สีลม", "อารีย์" — OK เพราะเป็นชื่อไทยสมจริง แต่ควร map กับ store network จริง
- Brand placeholder text "Humi" — ถ้า final brand name ยังไม่ lock (ดู `wiki/concepts/humi-branding.md` — STATUS pending Rungrote feedback) ให้ใช้ placeholder component ที่ swap ง่าย
- Integration names ("ShopRegister POS", "Payroll.ca", "SlackChat", "Tempo Scheduling") — เป็น generic fake — **replace ด้วย Central Group tech stack จริง** (SAP SF, Teams, OneDrive, CPN Payroll system, etc.)

### Color constraints

- ❌ **ตัด `clay` accent (`#C8553D`)** ออกจาก theme switcher — ชน Central NO-RED rule
- ⚠️ **Review `--coral` (`#E08864`)** กับ Rungrote — technically ออกส้ม-peach แต่ถ้ามอง pure red-family ก็ต้องแทน
- ⚠️ **Review `--danger` (`#C8553D`)** — ปกติ error state เลี่ยงยาก แต่ Central brand อาจมี alternate error color → ใช้ดาร์กบราวน์/amber intense แทน

### UX patterns that don't translate to Central HR context

- **Retail-centric copy**: "ตรวจนับสินค้าประจำฤดูใบไม้ผลิ", "ค่าแรงตามอัตรากะ", "เขตฮัมเบอร์", "POS" — Central Group HR ไม่ใช่แค่ retail staff. มี corporate office, mall operations, warehouse, supply chain. Copy hero + announcements ต้อง broaden
- **Store manager persona**: ต้นฉบับ narrate ผ่าน "อวา เรเยส · ผู้จัดการร้านสาขาฮัมเบอร์" — Humi HR ต้อง support **multi-persona** (corporate HR, mall GM, store manager, hourly staff, executive) → role switcher ต้องมี
- **"Humi" references ใน URL/email** — change domain; ทุก screen ใช้ `@humi.shop`
- **POS integration tab** — Central HR อาจไม่ต้อง POS-centric. แทนด้วย Payroll (SAP) / Identity (Azure AD) / Leave Sync (SuccessFactors legacy) / Timesheet

### Code-level red flags (ตอน port ไป production)

- **Babel Standalone in-browser** — prototype only, ห้ามใช้ใน production → compile ด้วย Vite/Next.js
- **No routing library** — prop drilling `onNav` จะไม่ scale → ใช้ Next.js App Router หรือ react-router
- **`window.ComponentName` pattern** — ES modules ต้องเขียนใหม่เป็น `import/export`
- **No a11y on div-as-button** — tab/timeoff/goals screens ใช้ `<div onClick>` — ต้อง convert เป็น `<button>` พร้อม keyboard nav
- **Hardcoded Thai strings** — ใส่ i18n (next-intl / react-intl) ตั้งแต่ต้น เพราะ Central Group มีภาษาอังกฤษ internal
- **No error boundary / loading skeleton** — ต้องเพิ่มตอน port
- **Buddhist year 2568 hardcoded** — ใช้ `date-fns-tz` + buddhist calendar formatter

## Assets handoff inventory

ไฟล์ที่ extract ได้พร้อมใช้ (อยู่ใน `/tmp/shelfly_extract/hrms/project/`):

- `styles.css` — 505 บรรทัด, design token SSOT
- `shell.jsx` — 80 บรรทัด, sidebar + topbar (Thai strings ready)
- `icons.jsx` — 53 บรรทัด, 30+ custom SVG icons + `ShelflyMark` (gumdrop person glyph)
- `screens/*.jsx` — 10 screen components (1,595 บรรทัดรวม)
- `fonts/*.otf` — CPN family ครบ (10 font files, Central Pattana brand font)
- `uploads/*.png` + `.otf` — user-uploaded reference assets (logo drafts + screenshots)
- `chats/chat1.md` — 876 บรรทัด design journey, เก็บเป็น decision log

**Action item**: ถ้า Humi HR ตัดสินใจใช้ bundle นี้เป็น baseline, แนะนำ copy เข้า `hr/docs/design-ref/shelfly-bundle/` (สำหรับ reference, ไม่ใช่ import ตรง) + แปลง `styles.css` tokens เป็น Tailwind config หรือ shadcn CSS variables.

## Summary for MK XLII PO

- **Fetch**: ✅ Success ผ่าน curl + gunzip + tar; bundle มี 10 screens + design tokens + CPN fonts + chat journey
- **Brand name in bundle**: **Humi** (final state — "Shelfly" แค่ placeholder รอบแรก)
- **Primary accent**: `#5B6CE0` Indigo (default ในรอบล่าสุด) + teal `#1FA8A0` เป็น brand primary
- **NO-RED compliance**: ❌ ต้องตัด `clay` accent (`#C8553D`) + review `--coral` + `--danger` กับ Rungrote
- **Top reuse**: design tokens + sidebar 3-section + Org Chart split + card variants + KPI micro-cards
- **Top risks**: retail-centric copy, `@humi.shop` email domain, Babel-in-browser (not prod-ready), `<div onClick>` a11y gap, hardcoded Thai (no i18n)
- **CPN fonts**: ✅ ได้เต็ม family → ใช้ Central brand guideline ได้ทันที
- **Source location**: `/tmp/shelfly_extract/hrms/` (ephemeral — ถ้าต้อง reuse copy เข้า repo)
