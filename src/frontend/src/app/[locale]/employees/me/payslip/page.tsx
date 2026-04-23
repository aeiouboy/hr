'use client'

// /employees/me/payslip — รายการสลิปเงินเดือน 6 เดือนล่าสุด
// ข้อมูลจำลอง — ไม่มี API จริง (Phase 1 scaffold)

import Link from 'next/link'
import { FileText } from 'lucide-react'

// ── Mock data ─────────────────────────────────────────────────────────────────

type PayslipStatus = 'พร้อมดาวน์โหลด' | 'รอประมวลผล'

interface Payslip {
  id: string
  monthLabel: string
  gross: number
  net: number
  status: PayslipStatus
}

const MOCK_PAYSLIPS: Payslip[] = [
  { id: 'PS-2026-03', monthLabel: 'มีนาคม 2569', gross: 55000, net: 48200, status: 'พร้อมดาวน์โหลด' },
  { id: 'PS-2026-02', monthLabel: 'กุมภาพันธ์ 2569', gross: 55000, net: 48200, status: 'พร้อมดาวน์โหลด' },
  { id: 'PS-2026-01', monthLabel: 'มกราคม 2569', gross: 55000, net: 47800, status: 'พร้อมดาวน์โหลด' },
  { id: 'PS-2025-12', monthLabel: 'ธันวาคม 2568', gross: 68000, net: 58500, status: 'พร้อมดาวน์โหลด' },
  { id: 'PS-2025-11', monthLabel: 'พฤศจิกายน 2568', gross: 55000, net: 48200, status: 'พร้อมดาวน์โหลด' },
  { id: 'PS-2025-10', monthLabel: 'ตุลาคม 2568', gross: 55000, net: 48200, status: 'พร้อมดาวน์โหลด' },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTHB(amount: number): string {
  return amount.toLocaleString('th-TH') + ' บาท'
}

function StatusBadge({ status }: { status: PayslipStatus }) {
  const isReady = status === 'พร้อมดาวน์โหลด'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 11,
        fontWeight: 600,
        borderRadius: 20,
        padding: '3px 10px',
        background: isReady ? 'var(--color-success-soft, #e6f9f0)' : 'var(--color-canvas-soft)',
        color: isReady ? '#0a6640' : 'var(--color-ink-muted)',
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </span>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PayslipPage() {
  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div>
        <div className="humi-eyebrow">เงินเดือนของฉัน</div>
        <h1 className="font-display text-[22px] font-semibold text-ink">สลิปเงินเดือน</h1>
        <p style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 4 }}>
          รายการสลิป 6 เดือนล่าสุด
        </p>
      </div>

      {/* Table card */}
      <div className="humi-card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Table header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr auto',
            gap: 12,
            padding: '12px 20px',
            background: 'var(--color-canvas-soft)',
            borderBottom: '1px solid var(--color-hairline)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-muted)',
          }}
        >
          <div>งวดเงินเดือน</div>
          <div style={{ textAlign: 'right' }}>รายได้รวม</div>
          <div style={{ textAlign: 'right' }}>รายรับสุทธิ</div>
          <div style={{ textAlign: 'center' }}>สถานะ</div>
        </div>

        {/* Rows */}
        {MOCK_PAYSLIPS.map((slip, idx) => (
          <Link
            key={slip.id}
            href={`/th/employees/me/payslip`}
            aria-label={`สลิปเงินเดือน ${slip.monthLabel}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr auto',
              gap: 12,
              padding: '14px 20px',
              borderBottom:
                idx < MOCK_PAYSLIPS.length - 1 ? '1px solid var(--color-hairline-soft)' : 'none',
              alignItems: 'center',
              textDecoration: 'none',
              transition: 'background 120ms ease',
            }}
            className="hover:bg-canvas-soft"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  display: 'inline-flex',
                  color: 'var(--color-ink-muted)',
                }}
                aria-hidden
              >
                <FileText size={15} />
              </span>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink)' }}>
                {slip.monthLabel}
              </span>
            </div>

            <div
              style={{
                fontSize: 14,
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--color-ink)',
                textAlign: 'right',
              }}
            >
              {formatTHB(slip.gross)}
            </div>

            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--color-ink)',
                textAlign: 'right',
              }}
            >
              {formatTHB(slip.net)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <StatusBadge status={slip.status} />
            </div>
          </Link>
        ))}
      </div>

      <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', textAlign: 'right' }}>
        ข้อมูลจำลอง — รายละเอียดสลิปจะพร้อมใน Phase 2
      </div>
    </div>
  )
}
