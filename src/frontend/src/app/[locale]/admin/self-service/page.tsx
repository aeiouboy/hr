'use client'

// Sub-nav + save-bar owned by layout.tsx — this is hub only.

import Link from 'next/link'
import { LayoutGrid, Eye, AlertCircle, Lock, MousePointer2, Home } from 'lucide-react'
import { useAdminSelfService } from '@/lib/admin/store/useAdminSelfService'

type EditorCard = {
  href: string
  titleTh: string
  brd: string
  descTh: string
  Icon: typeof LayoutGrid
}

const EDITORS: EditorCard[] = [
  {
    href: '/admin/self-service/field-config',
    titleTh: 'รายการฟิลด์',
    brd: 'BRD #178',
    descTh: 'เลือกฟิลด์ที่พนักงานจะเห็นและแก้ไขได้ใน Self-Service ของแต่ละ Role',
    Icon: LayoutGrid,
  },
  {
    href: '/admin/self-service/visibility',
    titleTh: 'การมองเห็นฟิลด์',
    brd: 'BRD #179',
    descTh: 'กำหนดว่าฟิลด์ใดแสดงหรือซ่อน ตาม Role และบริบทการใช้งาน',
    Icon: Eye,
  },
  {
    href: '/admin/self-service/mandatory',
    titleTh: 'ฟิลด์บังคับกรอก',
    brd: 'BRD #180',
    descTh: 'ระบุฟิลด์ที่ต้องกรอกก่อนบันทึก ใช้บังคับมาตรฐานข้อมูล',
    Icon: AlertCircle,
  },
  {
    href: '/admin/self-service/readonly',
    titleTh: 'ฟิลด์อ่านอย่างเดียว',
    brd: 'BRD #181',
    descTh: 'ล็อคฟิลด์ไม่ให้พนักงานแก้ไข เช่นข้อมูลที่ HR เป็นผู้ดูแล',
    Icon: Lock,
  },
  {
    href: '/admin/self-service/quick-actions',
    titleTh: 'ทางลัดเมนูด่วน',
    brd: 'BRD #182',
    descTh: 'สร้างปุ่มทางลัดบนหน้าแรกของพนักงาน ระบุชื่อ ไอคอน และปลายทาง',
    Icon: MousePointer2,
  },
  {
    href: '/admin/self-service/tiles',
    titleTh: 'ไทล์หน้าแรก',
    brd: 'BRD #183',
    descTh: 'จัดลำดับและเลือกไทล์ที่พนักงานเห็นบนหน้าแรก ตามกลุ่มผู้ใช้',
    Icon: Home,
  },
]

export default function SelfServicePage() {
  const isDirty = useAdminSelfService((s) => s.isDirty)

  return (
    <div
      className="pb-8"
      style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24, maxWidth: 1120, marginInline: 'auto' }}
    >
      {/* Header */}
      <div>
        <div className="humi-eyebrow">SELF-SERVICE</div>
        <h1 className="font-display text-[22px] font-semibold text-ink">การตั้งค่าแบบกำหนดเอง</h1>
        <p style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 4 }}>
          ปรับพื้นที่ Self-Service ของพนักงาน เลือกฟิลด์ที่แสดง บังคับ ล็อค หรือทำเป็นทางลัด
        </p>
      </div>

      {/* Dirty indicator */}
      {isDirty && (
        <div
          role="status"
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            alignItems: 'center',
            gap: 8,
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-warn-bg, #fef3c7)',
            color: 'var(--color-warn-ink, #92400e)',
            border: '1px solid var(--color-warn-border, #fde68a)',
            fontSize: 13,
          }}
        >
          มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก กดบันทึกบนแถบด้านบนก่อนออกจากหน้า
        </div>
      )}

      {/* Editor cards */}
      <div
        role="list"
        aria-label="รายการเครื่องมือตั้งค่า Self-Service"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}
      >
        {EDITORS.map(({ href, titleTh, brd, descTh, Icon }) => (
          <Link
            key={href}
            href={href}
            role="listitem"
            className="humi-card"
            style={{
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              textDecoration: 'none',
              color: 'inherit',
              transition: 'box-shadow 180ms ease, border-color 180ms ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <span
                style={{
                  display: 'inline-flex',
                  width: 36,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-brand-soft, rgba(99,102,241,0.12))',
                  color: 'var(--color-brand, #6366f1)',
                }}
                aria-hidden
              >
                <Icon size={18} />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono, ui-monospace)',
                  fontSize: 11,
                  color: 'var(--color-ink-muted)',
                  background: 'var(--color-canvas)',
                  padding: '2px 8px',
                  borderRadius: 4,
                }}
              >
                {brd}
              </span>
            </div>
            <div>
              <h2
                className="font-display"
                style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', marginTop: 4 }}
              >
                {titleTh}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 4, lineHeight: 1.5 }}>
                {descTh}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', textAlign: 'right', marginTop: 4 }}>
        การตั้งค่าทั้งหมดจะมีผลทันทีเมื่อบันทึก เก็บประวัติย้อนหลังโดยอัตโนมัติ
      </div>
    </div>
  )
}
