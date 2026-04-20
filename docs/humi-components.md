# Humi Primitives — Component Reference

> Shared primitives ใน `src/frontend/src/components/humi/` สำหรับ Humi redesign
> ทุก component ใช้ design tokens จาก `globals.css` (`@theme`) เท่านั้น —
> ไม่มี hex hardcoded, ไม่มี red (pumpkin สำหรับ danger ตาม NO-RED guardrail)

## ใช้อย่างไร

```tsx
import { Button, Card, CardTitle, Nav, DataTable, FormField, FormInput } from '@/components/humi';
```

ทุก component type-safe ด้วย TypeScript; variants ใช้ `class-variance-authority`.

---

## Button

Variants: `primary` | `secondary` | `ghost` | `danger`
Sizes: `sm` | `md` | `lg`
States: idle, hover, active, focus-visible (teal ring), disabled, loading

```tsx
// บันทึก / ยกเลิก คู่ทั่วไป
<div className="flex gap-3">
  <Button variant="primary" size="md">บันทึก</Button>
  <Button variant="secondary">ยกเลิก</Button>
</div>

// Loading + leading icon
<Button loading>กำลังบันทึก…</Button>

<Button variant="ghost" leadingIcon={<Plus size={16} />}>
  เพิ่มพนักงาน
</Button>

// Destructive action — pumpkin (orange-leaning), ไม่ใช่ red
<Button variant="danger">ลบข้อมูล</Button>

// Full width
<Button block>ยืนยันและดำเนินการต่อ</Button>
```

A11y: เป็น real `<button>` เสมอ; `aria-busy` set เมื่อ `loading`; icon-only
button ต้องส่ง `aria-label` เอง (prop ปกติ passthrough).

---

## Card

Variants: `raised` (shadow) | `flat` (hairline border)
Sizes: `md` (14px radius) | `lg` (20px radius)
Tone: `surface` | `canvas` | `accent`

```tsx
<Card
  header={
    <div className="flex items-center gap-2">
      <CardEyebrow>ภาพรวม</CardEyebrow>
      <CardTitle>การลาของทีม</CardTitle>
    </div>
  }
  footer={<Button variant="ghost">ดูทั้งหมด →</Button>}
>
  <p className="text-body text-ink-soft">
    สัปดาห์นี้มีการลา 3 รายการ รอการอนุมัติ 1 รายการ
  </p>
</Card>

// Flat + flush (for table inside)
<Card variant="flat" flush>
  <DataTable ... />
</Card>

// Accent tone — highlight กรณี CTA card
<Card tone="accent" size="lg">
  <CardTitle>เริ่มต้นใช้งาน Humi</CardTitle>
</Card>
```

---

## Nav

Sidebar vertical nav, 3-section grouping. Link ใช้ `next/link` — route-based `active` ต้องเช็คจาก caller.

```tsx
import { Home, Users, Settings, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';

const pathname = usePathname();

<Nav
  ariaLabel="เมนูหลัก"
  brand={<span className="font-display text-display-h3">Humi</span>}
  sections={[
    {
      id: 'main',
      label: 'หลัก',
      items: [
        { id: 'home', label: 'หน้าหลัก', href: '/home', icon: Home, active: pathname === '/home' },
        { id: 'team', label: 'ทีมของฉัน', href: '/team', icon: Users, badge: 2 },
      ],
    },
    {
      id: 'company',
      label: 'บริษัท',
      items: [
        { id: 'announce', label: 'ประกาศ', href: '/announcements', icon: Bell },
        { id: 'settings', label: 'ตั้งค่า', href: '/settings', icon: Settings },
      ],
    },
  ]}
  footer={
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-accent-soft" />
      <div className="text-small">
        <div className="font-medium text-ink">สมชาย ใจดี</div>
        <div className="text-ink-muted">ผู้จัดการฝ่าย</div>
      </div>
    </div>
  }
/>
```

Active state = left-border 3px teal + `bg-accent-soft`. Badge rendered
ขวาสุดของ row; ถ้าเป็นตัวเลข จะ auto ใส่ `aria-label` "N รายการใหม่".

---

## DataTable

Generic typed table: `<DataTable<Row> columns={...} rows={...} />`.
Sticky header, hover highlight (no zebra), 48px row (หรือ 36px ถ้า `dense`).

```tsx
type Employee = { id: string; name: string; department: string; joinedAt: Date };

const employees: Employee[] = [
  { id: '001', name: 'สมชาย ใจดี', department: 'บัญชี', joinedAt: new Date('2023-06-01') },
  { id: '002', name: 'สมหญิง รักษ์ดี', department: 'บุคคล', joinedAt: new Date('2024-01-15') },
];

<DataTable<Employee>
  caption="รายชื่อพนักงาน"
  rowKey={(r) => r.id}
  rows={employees}
  onRowClick={(row) => router.push(`/people/${row.id}`)}
  emptyState={<span>ยังไม่มีพนักงานในระบบ</span>}
  columns={[
    {
      id: 'name',
      header: 'ชื่อ-นามสกุล',
      cell: (r) => <span className="font-medium">{r.name}</span>,
      sortAccessor: (r) => r.name,
    },
    {
      id: 'department',
      header: 'แผนก',
      cell: (r) => r.department,
      sortAccessor: (r) => r.department,
    },
    {
      id: 'joinedAt',
      header: 'วันที่เริ่มงาน',
      cell: (r) => r.joinedAt.toLocaleDateString('th-TH'),
      sortAccessor: (r) => r.joinedAt,
      align: 'right',
    },
  ]}
/>
```

A11y: `<caption>` required (visually-hidden default), sort buttons เป็น real
`<button>`, `aria-sort` ตั้งอัตโนมัติ, row ที่ `onRowClick` จะ keyboard-accessible
(tabIndex + role=button + Enter/Space handler).

---

## FormField

Label + input wrapper. Render prop ส่ง a11y wiring กลับมาให้ child control:

```tsx
<FormField
  label="อีเมล"
  help="เราจะส่งรหัสยืนยันไปยังอีเมลนี้"
  required
>
  {(ctl) => <FormInput type="email" placeholder="name@company.co.th" {...ctl} />}
</FormField>

// กรณี error
<FormField
  label="รหัสพนักงาน"
  error="รหัสนี้ถูกใช้แล้ว"
>
  {(ctl) => <FormInput defaultValue="EMP-001" {...ctl} />}
</FormField>

// กรณีใช้ select / textarea / custom control — ส่ง wiring ผ่าน spread เดิม
<FormField label="เหตุผลการลา" description="กรอกอย่างน้อย 20 ตัวอักษร">
  {(ctl) => (
    <textarea
      rows={4}
      {...ctl}
      className="rounded-md border border-hairline bg-surface p-3 focus:outline-none focus:ring-2 focus:ring-accent"
    />
  )}
</FormField>
```

Error text ใช้ `--color-danger-ink` (pumpkin readable) + `role="alert"`.

---

## Design Token Cheat-sheet

| Token | Use |
|---|---|
| `bg-accent` / `text-accent` | primary teal `#1FA8A0` |
| `bg-accent-soft` | teal tint สำหรับ hover/active bg |
| `bg-canvas` / `bg-canvas-soft` | cream body background |
| `bg-surface` | paper white card body |
| `text-ink` / `text-ink-soft` / `text-ink-muted` / `text-ink-faint` | text scale (navy) |
| `border-hairline` / `border-hairline-soft` | 1px dividers |
| `bg-danger` | pumpkin `#FB923C` (NOT red) |
| `text-[color:var(--color-danger-ink)]` | readable pumpkin on soft bg |
| `shadow-[var(--shadow-card)]` / `shadow-[var(--shadow-md)]` | elevation |
| `rounded-[var(--radius-md)]` | 14px card radius |
| `font-display` | CPN Condensed (headlines) |
| `font-sans` | CPN body + Anuphan Thai fallback |

## NO-RED Rule

ห้ามเพิ่ม red/clay/crimson hex (coral-red, brick-red, Tailwind red-500/600/700, Central retail red)
ใน components ใดๆ — ดู guardrail list ใน `specs/humi-frontend-redesign.md` + grep check ใน
commit gate ต้องได้ 0 hits.
