'use client'

// /employees/me — โปรไฟล์พนักงาน (ดูอย่างเดียว)
// 3 sections: ข้อมูลติดต่อ / ตำแหน่งงาน / ข้อมูลส่วนตัว
// ข้อมูลจาก mockEmployee.json — ไม่มี API จริง (Phase 1 scaffold)

import mockEmployee from '@/data/admin/mockEmployee.json'
import { User, Briefcase, Info } from 'lucide-react'

// ── ข้อมูลตัวอย่างเพิ่มเติมสำหรับ persona preview ──────────────────────────

const MOCK_PROFILE = {
  ...mockEmployee,
  phone: '081-234-5678',
  email: 'somchai.testworker@central.co.th',
  position: 'HR Business Partner',
  company: 'Central Group',
  orgUnit: 'HR - Head Office',
  hireDate: '2020-03-01',
  dateOfBirth: '1989-01-15',
}

// ── helper ────────────────────────────────────────────────────────────────────

function formatDateTh(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    console.warn('[employees/me] formatDateTh: invalid date', iso)
    return iso
  }
}

function tenureYears(hireDate: string): number {
  const hire = new Date(hireDate)
  const now = new Date()
  return Math.floor((now.getTime() - hire.getTime()) / (1000 * 60 * 60 * 24 * 365))
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({
  icon,
  eyebrow,
  children,
}: {
  icon: React.ReactNode
  eyebrow: string
  children: React.ReactNode
}) {
  return (
    <div className="humi-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: 'var(--color-brand)', display: 'inline-flex' }}>{icon}</span>
        <span className="humi-eyebrow">{eyebrow}</span>
      </div>
      {children}
    </div>
  )
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid var(--color-hairline-soft)',
        paddingBottom: 10,
        gap: 8,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', width: 148, flexShrink: 0 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink)', flex: 1, minWidth: 0 }}>
        {value || '—'}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EmployeeMePage() {
  const emp = MOCK_PROFILE
  const tenure = tenureYears(emp.hireDate)

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div>
        <div className="humi-eyebrow">โปรไฟล์ของฉัน</div>
        <h1 className="font-display text-[22px] font-semibold text-ink">
          {emp.firstNameTh} {emp.lastNameTh}
        </h1>
        <p style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 4 }}>
          ข้อมูลส่วนตัวและตำแหน่งงาน — อ่านอย่างเดียว
        </p>
      </div>

      {/* 3-section grid — 2 col at md+, single col mobile */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
        }}
      >
        {/* Section 1: ข้อมูลติดต่อ */}
        <SectionCard icon={<User size={16} />} eyebrow="ข้อมูลติดต่อ">
          <FieldRow label="ชื่อ (ภาษาไทย)" value={`${emp.firstNameTh} ${emp.lastNameTh}`} />
          <FieldRow label="อีเมล" value={emp.email} />
          <FieldRow label="โทรศัพท์" value={emp.phone} />
          <FieldRow label="ที่อยู่" value={emp.address} />
        </SectionCard>

        {/* Section 2: ตำแหน่งงาน */}
        <SectionCard icon={<Briefcase size={16} />} eyebrow="ตำแหน่งงาน">
          <FieldRow label="ตำแหน่ง" value={emp.position} />
          <FieldRow label="บริษัท" value={emp.company} />
          <FieldRow label="หน่วยงาน" value={emp.orgUnit} />
        </SectionCard>

        {/* Section 3: ข้อมูลส่วนตัว */}
        <SectionCard icon={<Info size={16} />} eyebrow="ข้อมูลส่วนตัว">
          <FieldRow label="วันเกิด" value={formatDateTh(emp.dateOfBirth)} />
          <FieldRow label="วันเริ่มงาน" value={formatDateTh(emp.hireDate)} />
          {/* Tenure chip */}
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 600,
                background: 'var(--color-accent-soft, #eef2ff)',
                color: 'var(--color-brand, #6366f1)',
                borderRadius: 20,
                padding: '4px 12px',
              }}
            >
              อายุงาน {tenure} ปี
            </span>
          </div>
        </SectionCard>
      </div>

      <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', textAlign: 'right' }}>
        ข้อมูลจากฐานข้อมูลจำลอง — Phase 1 preview
      </div>
    </div>
  )
}
