'use client'

// /employees/me/benefits — สวัสดิการของฉัน
// 3 benefit cards: ประกันกลุ่ม / กองทุนสำรองเลี้ยงชีพ / สวัสดิการพิเศษ
// Phase 1 scaffold — placeholder เท่านั้น รายละเอียดเพิ่มใน Phase 2

import { Shield, PiggyBank, Gift } from 'lucide-react'

// ── Mock benefit cards ────────────────────────────────────────────────────────

interface BenefitCard {
  id: string
  icon: React.ReactNode
  title: string
  subtitle: string
  stat: string
  statLabel: string
  statusLabel: string
  statusOk: boolean
}

const BENEFIT_CARDS: BenefitCard[] = [
  {
    id: 'health',
    icon: <Shield size={22} />,
    title: 'ประกันกลุ่ม',
    subtitle: 'ประกันสุขภาพและประกันชีวิตหมู่',
    stat: 'คุ้มครอง',
    statLabel: 'สถานะปัจจุบัน',
    statusLabel: 'มีผล',
    statusOk: true,
  },
  {
    id: 'provident',
    icon: <PiggyBank size={22} />,
    title: 'กองทุนสำรองเลี้ยงชีพ',
    subtitle: 'บริษัทสมทบ 5% ของเงินเดือน',
    stat: '5%',
    statLabel: 'อัตราสมทบบริษัท',
    statusLabel: 'มีผล',
    statusOk: true,
  },
  {
    id: 'special',
    icon: <Gift size={22} />,
    title: 'สวัสดิการพิเศษ',
    subtitle: 'ส่วนลดพนักงาน ค่าเดินทาง และอื่น ๆ',
    stat: 'รายละเอียด Phase 2',
    statLabel: 'ข้อมูลเพิ่มเติม',
    statusLabel: 'เร็ว ๆ นี้',
    statusOk: false,
  },
]

// ── Sub-component ─────────────────────────────────────────────────────────────

function BenefitCardItem({ card }: { card: BenefitCard }) {
  return (
    <div
      className="humi-card"
      style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      {/* Icon + title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'var(--color-accent-soft, #eef2ff)',
            color: 'var(--color-brand, #6366f1)',
            flexShrink: 0,
          }}
          aria-hidden
        >
          {card.icon}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', lineHeight: 1.3 }}
          >
            {card.title}
          </div>
          <div
            style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 3 }}
          >
            {card.subtitle}
          </div>
        </div>
        {/* Status badge */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 11,
            fontWeight: 600,
            borderRadius: 20,
            padding: '3px 10px',
            background: card.statusOk
              ? 'var(--color-success-soft, #e6f9f0)'
              : 'var(--color-canvas-soft)',
            color: card.statusOk ? '#0a6640' : 'var(--color-ink-muted)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {card.statusLabel}
        </span>
      </div>

      {/* Stat row */}
      <div
        style={{
          borderTop: '1px solid var(--color-hairline-soft)',
          paddingTop: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
          {card.statLabel}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-ink)' }}>
          {card.stat}
        </div>
      </div>

      {/* Placeholder note */}
      <div
        style={{
          fontSize: 12,
          color: 'var(--color-ink-muted)',
          background: 'var(--color-canvas-soft)',
          borderRadius: 8,
          padding: '8px 12px',
        }}
      >
        รายละเอียดเพิ่มเติมจะแสดงใน Phase 2
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BenefitsPage() {
  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div>
        <div className="humi-eyebrow">สวัสดิการของฉัน</div>
        <h1 className="font-display text-[22px] font-semibold text-ink">เงินเดือนและสวัสดิการ</h1>
        <p style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 4 }}>
          สวัสดิการที่คุณได้รับจากบริษัท
        </p>
      </div>

      {/* 3-column benefit cards — 2 col at md+, single col mobile */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12,
        }}
      >
        {BENEFIT_CARDS.map((card) => (
          <BenefitCardItem key={card.id} card={card} />
        ))}
      </div>

      <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', textAlign: 'right' }}>
        ข้อมูลจำลอง — Phase 1 preview
      </div>
    </div>
  )
}
