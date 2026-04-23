'use client'

// /admin/reports — Reports Hub (Archetype D).
// ไม่มี BA/BRD dependency ใหม่ — report เฉพาะข้อมูลที่ user navigate ถึงได้อยู่แล้ว.

import { useMemo } from 'react'
import { Users, UserCheck, Briefcase, Building2, Network, Clock } from 'lucide-react'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { useJobs } from '@/lib/admin/store/useJobs'
import { usePositions } from '@/lib/admin/store/usePositions'
import { useOrgUnits } from '@/lib/admin/store/useOrgUnits'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import type { TimelineEvent } from '@hrms/shared/types/timeline'

const TIMELINE_LABELS_TH: Record<TimelineEvent['kind'], string> = {
  hire: 'รับพนักงานใหม่',
  probation_assess: 'ประเมินทดลองงาน',
  transfer: 'โยกย้าย',
  terminate: 'ออกจากงาน',
  rehire: 'กลับเข้าทำงาน',
  contract_renewal: 'ต่อสัญญา',
  promotion: 'เลื่อนตำแหน่ง',
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  sub?: string
}

function StatCard({ icon, label, value, sub }: StatCardProps) {
  return (
    <div
      className="humi-card"
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-ink-muted)' }}>
        <span style={{ display: 'inline-flex', color: 'var(--color-brand)' }}>{icon}</span>
        <span className="humi-eyebrow">{label}</span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--color-ink)', lineHeight: 1.1 }}>
        {typeof value === 'number' ? value.toLocaleString('th-TH') : value}
      </div>
      {sub && <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>{sub}</div>}
    </div>
  )
}

interface BreakdownRowProps {
  label: string
  count: number
  max: number
}

function BreakdownRow({ label, count, max }: BreakdownRowProps) {
  const pct = max > 0 ? (count / max) * 100 : 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
      <div style={{ width: 160, color: 'var(--color-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 6, background: 'var(--color-canvas)', borderRadius: 3, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: 'var(--color-brand, #6366f1)',
            transition: 'width 180ms ease',
          }}
        />
      </div>
      <div style={{ width: 64, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--color-ink-muted)' }}>
        {count.toLocaleString('th-TH')}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="humi-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <h2 className="font-display" style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function ReportsPage() {
  const employees = useEmployees((s) => s.all)
  const jobs = useJobs((s) => s.all)
  const positions = usePositions((s) => s.all)
  const orgUnits = useOrgUnits((s) => s.all)
  const byEmployee = useTimelines((s) => s.byEmployee)

  // Company code → Thai label derived from org roots (SSOT: useOrgUnits seed).
  const companyLabelsTh = useMemo(() => {
    const m = new Map<string, string>()
    for (const u of orgUnits) {
      if (u.id === u.company) m.set(u.company, u.nameTh)
    }
    return m
  }, [orgUnits])

  // Single pass over employees → headcount + byCompany + byClass + probation.
  const employeeStats = useMemo(() => {
    const headcount = { total: employees.length, active: 0, inactive: 0, terminated: 0 }
    const companyLive: Record<string, number> = {}
    const classLive = { permanent: 0, partime: 0 }
    const probation = { in_probation: 0, passed: 0, extended: 0, terminated: 0 }

    for (const e of employees) {
      headcount[e.status] += 1
      if (e.status !== 'terminated') {
        companyLive[e.company] = (companyLive[e.company] ?? 0) + 1
        if (e.employee_class === 'PERMANENT') classLive.permanent += 1
        else if (e.employee_class === 'PARTIME') classLive.partime += 1
      }
      if (e.status === 'active') probation[e.probation_status] += 1
    }

    const byCompany = Object.entries(companyLive)
      .map(([code, count]) => ({ code, label: companyLabelsTh.get(code) ?? code, count }))
      .sort((a, b) => b.count - a.count)

    return { headcount, byCompany, byClass: classLive, probation }
  }, [employees, companyLabelsTh])

  const { headcount, byCompany, byClass, probation } = employeeStats

  const masterData = useMemo(() => {
    const activeJobs = jobs.filter((j) => j.active).length
    const activePositions = positions.filter((p) => p.active).length
    const totalCapacity = positions.reduce((s, p) => s + p.defaultHeadcount, 0)
    const currentCapacity = positions.reduce((s, p) => s + p.currentHeadcount, 0)
    const fillRate = totalCapacity > 0 ? Math.round((currentCapacity / totalCapacity) * 100) : 0
    return {
      activeJobs,
      totalJobs: jobs.length,
      activePositions,
      totalPositions: positions.length,
      totalCapacity,
      currentCapacity,
      fillRate,
      orgUnits: orgUnits.length,
      companies: new Set(orgUnits.map((u) => u.company)).size,
    }
  }, [jobs, positions, orgUnits])

  // Last 30d activity — pre-filtered to only kinds with count > 0, ready to render.
  const recentActivity = useMemo(() => {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 30)
    const cutoffIso = cutoff.toISOString().slice(0, 10)
    const counts: Record<TimelineEvent['kind'], number> = {
      hire: 0,
      probation_assess: 0,
      transfer: 0,
      terminate: 0,
      rehire: 0,
      contract_renewal: 0,
      promotion: 0,
    }
    let total = 0
    for (const events of Object.values(byEmployee)) {
      for (const ev of events) {
        if (ev.effectiveDate >= cutoffIso) {
          counts[ev.kind] += 1
          total += 1
        }
      }
    }
    const entries = (Object.keys(TIMELINE_LABELS_TH) as Array<TimelineEvent['kind']>)
      .filter((k) => counts[k] > 0)
      .map((k) => ({ kind: k, label: TIMELINE_LABELS_TH[k], count: counts[k] }))
    const max = entries.reduce((m, e) => (e.count > m ? e.count : m), 1)
    return { entries, total, max }
  }, [byEmployee])

  const companyMax = byCompany[0]?.count ?? 0
  const classMax = Math.max(byClass.permanent, byClass.partime)

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div>
        <div className="humi-eyebrow">REPORTS</div>
        <h1 className="font-display text-[22px] font-semibold text-ink">ศูนย์รายงาน</h1>
        <p style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 4 }}>
          ภาพรวมกำลังคน หน่วยงาน และความเคลื่อนไหวย้อนหลัง 30 วัน
        </p>
      </div>

      {/* Top stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12,
        }}
      >
        <StatCard
          icon={<Users size={16} aria-hidden />}
          label="กำลังคนทั้งหมด"
          value={headcount.total}
          sub={`ปกติ ${headcount.active.toLocaleString('th-TH')} · ไม่ใช้งาน ${headcount.inactive.toLocaleString('th-TH')} · พ้นสภาพ ${headcount.terminated.toLocaleString('th-TH')}`}
        />
        <StatCard
          icon={<UserCheck size={16} aria-hidden />}
          label="ทดลองงาน"
          value={probation.in_probation}
          sub={`ผ่าน ${probation.passed.toLocaleString('th-TH')} · ขยาย ${probation.extended.toLocaleString('th-TH')}`}
        />
        <StatCard
          icon={<Briefcase size={16} aria-hidden />}
          label="งาน"
          value={masterData.activeJobs}
          sub={`ทั้งหมด ${masterData.totalJobs.toLocaleString('th-TH')} รายการ`}
        />
        <StatCard
          icon={<Building2 size={16} aria-hidden />}
          label="ตำแหน่ง"
          value={masterData.activePositions}
          sub={`อัตราเติมเต็ม ${masterData.fillRate}%`}
        />
        <StatCard
          icon={<Network size={16} aria-hidden />}
          label="หน่วยงาน"
          value={masterData.orgUnits}
          sub={`${masterData.companies} บริษัท`}
        />
        <StatCard
          icon={<Clock size={16} aria-hidden />}
          label="ความเคลื่อนไหว (30 วัน)"
          value={recentActivity.total}
          sub="นับจาก timeline ของพนักงานทุกคน"
        />
      </div>

      {/* Two-column breakdowns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12 }}>
        <Section title="กำลังคนตามบริษัท">
          {byCompany.length === 0 ? (
            <div style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>ไม่มีข้อมูล</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {byCompany.map((c) => (
                <BreakdownRow key={c.code} label={c.label} count={c.count} max={companyMax} />
              ))}
            </div>
          )}
        </Section>

        <Section title="สัดส่วนประเภทการจ้าง">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <BreakdownRow label="พนักงานประจำ" count={byClass.permanent} max={classMax} />
            <BreakdownRow label="พนักงานบางเวลา" count={byClass.partime} max={classMax} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 8 }}>
            นับเฉพาะพนักงานที่ยังไม่พ้นสภาพ
          </div>
        </Section>

        <Section title="กิจกรรมย้อนหลัง 30 วัน">
          {recentActivity.total === 0 ? (
            <div style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>
              ไม่มีความเคลื่อนไหวในช่วง 30 วันที่ผ่านมา
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentActivity.entries.map((e) => (
                <BreakdownRow key={e.kind} label={e.label} count={e.count} max={recentActivity.max} />
              ))}
            </div>
          )}
        </Section>

        <Section title="ความจุกำลังคน">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 13, color: 'var(--color-ink)' }}>
              {masterData.currentCapacity.toLocaleString('th-TH')} / {masterData.totalCapacity.toLocaleString('th-TH')} อัตรา
            </div>
            <div style={{ height: 10, background: 'var(--color-canvas)', borderRadius: 5, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${masterData.fillRate}%`,
                  background: 'var(--color-brand, #6366f1)',
                  transition: 'width 220ms ease',
                }}
              />
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
              คำนวณจากจำนวนพนักงานปัจจุบันหารจำนวนตามแผนของทุกตำแหน่ง อัปเดตทุกครั้งที่มีการรับ/ย้าย/ออก
            </div>
          </div>
        </Section>
      </div>

      {/* Footer note */}
      <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', textAlign: 'right', marginTop: 4 }}>
        ข้อมูลจากฐานข้อมูลจำลอง ใช้ประเมินระบบก่อนเชื่อมต่อฐานข้อมูลจริง
      </div>
    </div>
  )
}
