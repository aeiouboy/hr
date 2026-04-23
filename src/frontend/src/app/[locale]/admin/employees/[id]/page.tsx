'use client'

// employees/[id]/page.tsx — EmployeeDetail journey hub (S3, Wave 1)
//
// Sections:
//   A. Snapshot card — avatar + name + ID + class + hire date + tenure + org info + status
//   B. Timeline event log — TimelineEvent[] sorted newest first, scrollable
//   C. Action menu — 5 action cards (2 active, 3 placeholder per Plan §0.2 + §4)
//
// Consume-only patterns (C1 surgical):
//   - useEmployees (S2) — read via selector, no internal mutation
//   - useTimelines (S3 own) — seed on mount, read via .get()
//
// C8: exactly 5 action cards — no extras

import { useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ClipboardCheck,
  Pencil,
  ArrowRightLeft,
  UserX,
  UserCheck,
  FileText,
  Lock,
  CalendarDays,
  Building2,
  Briefcase,
} from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { useEmploymentEvents } from '@/lib/admin/store/useEmploymentEvents'
import type { TimelineEvent } from '@hrms/shared/types/timeline'
import { calcAge, calcGeneration, calcYearOfService } from '@/lib/calculations'

// ── Tenure helper ────────────────────────────────────────────
function calcTenure(hireDateStr: string): string {
  const hire = new Date(hireDateStr)
  const now = new Date()
  let years = now.getFullYear() - hire.getFullYear()
  let months = now.getMonth() - hire.getMonth()
  if (months < 0) {
    years -= 1
    months += 12
  }
  if (years === 0) return `${months} เดือน`
  if (months === 0) return `${years} ปี`
  return `${years} ปี ${months} เดือน`
}

// ── Avatar color by status ───────────────────────────────────
function avatarClass(status: string): string {
  switch (status) {
    case 'active': return 'humi-avatar humi-avatar--teal'
    case 'terminated': return 'humi-avatar humi-avatar--ink'
    default: return 'humi-avatar humi-avatar--sage'
  }
}

function avatarInitials(emp: { first_name_th: string; last_name_th: string }): string {
  const th = `${emp.first_name_th} ${emp.last_name_th}`.trim()
  const parts = th.split(' ')
  if (parts.length >= 2) return `${parts[0].charAt(0)}${parts[1].charAt(0)}`
  return parts[0].charAt(0)
}

// ── Status badge ─────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: 'humi-tag humi-tag--accent',
    terminated: 'humi-tag humi-tag--coral',
    inactive: 'humi-tag',
  }
  const cls = map[status] ?? 'humi-tag'
  const label: Record<string, string> = {
    active: 'ทำงานอยู่',
    terminated: 'ออกจากงานแล้ว',
    inactive: 'ไม่ได้ทำงาน',
  }
  return <span className={cls}>{label[status] ?? status}</span>
}

// ── ClassBadge (PERMANENT / PARTIME) ────────────────────────
function ClassBadge({ empClass }: { empClass?: string }) {
  const label = empClass === 'PARTIME' ? 'Part-time' : 'Permanent'
  const cls = empClass === 'PARTIME' ? 'humi-tag humi-tag--butter' : 'humi-tag humi-tag--sage'
  return <span className={cls}>{label}</span>
}

// ── Timeline event label ─────────────────────────────────────
const EVENT_LABELS: Record<string, string> = {
  hire: 'เริ่มงาน',
  probation_assess: 'ประเมินทดลองงาน',
  transfer: 'โอนย้าย',
  terminate: 'ออกจากงาน',
  rehire: 'รับกลับเข้าทำงาน',
  contract_renewal: 'ต่อสัญญา',
  promotion: 'เลื่อนตำแหน่ง',
}

const EVENT_DOT_CLASS: Record<string, string> = {
  hire: 'bg-accent',
  probation_assess: 'bg-info',
  transfer: 'bg-warning',
  terminate: 'bg-danger',
  rehire: 'bg-success',
  contract_renewal: 'bg-sage',
  promotion: 'bg-butter',
}

function TimelineRow({ event }: { event: TimelineEvent }) {
  const dotCls = EVENT_DOT_CLASS[event.kind] ?? 'bg-ink-faint'
  const label = EVENT_LABELS[event.kind] ?? event.kind
  const effectiveFormatted = new Date(event.effectiveDate).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const recordedFormatted = new Date(event.recordedAt).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <div className="flex gap-3 py-3 border-b border-[color:var(--color-hairline-soft)] last:border-0">
      {/* dot + vertical line */}
      <div className="flex flex-col items-center pt-1">
        <span
          className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotCls}`}
          style={{ background: `var(--color-${dotCls.replace('bg-', '')}, #8A97A8)` }}
          aria-hidden
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="humi-row" style={{ gap: 8, flexWrap: 'wrap' }}>
          <span className="text-body font-semibold text-ink">{label}</span>
          <span className="text-small text-ink-muted">วันที่มีผล: {effectiveFormatted}</span>
        </div>
        <div className="text-small text-ink-muted mt-0.5">บันทึกเมื่อ: {recordedFormatted}</div>
        {event.notes && (
          <div className="mt-1 text-small text-ink-soft italic">{event.notes}</div>
        )}
      </div>
    </div>
  )
}

// ── Action card types ────────────────────────────────────────
interface ActionCard {
  icon: React.ElementType
  label: string
  desc: string
  href?: string
  locked: boolean
}

export default function EmployeeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  // Consume employee from S2 store (1K mock employees, snake_case schema)
  const employee = useEmployees((s) => s.getById(empId)) ?? null

  // Timeline store — S3 owns this
  const { seed } = useTimelines()

  // B2 PoC: employment events store
  const seedFromEmployees = useEmploymentEvents((s) => s.seedFromEmployees)
  const stateAsOf = useEmploymentEvents((s) => s.stateAsOf)

  // Seed HireEvent on mount if not already seeded
  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  // B2 PoC: seed employment events from all employees (idempotent — safe to call on every mount)
  const allEmployees = useEmployees((s) => s.all)
  useEffect(() => {
    seedFromEmployees(allEmployees)
  }, [allEmployees, seedFromEmployees])

  // Bug 3 fix: stable reference to avoid infinite loop when byEmployee[empId] is undefined
  // Direct selector `s.byEmployee[empId] ?? []` creates new [] each render → Object.is false → re-render loop
  const byEmployee = useTimelines((s) => s.byEmployee)
  const events = useMemo(() => byEmployee[empId] ?? [], [byEmployee, empId])

  // Sort newest first by effectiveDate
  const sortedEvents = useMemo(
    () => [...events].sort(
      (a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime(),
    ),
    [events],
  )

  if (!employee) {
    return (
      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="humi-row text-body text-ink-muted mb-4 hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} aria-hidden />
          <span>กลับ</span>
        </button>
        <div className="humi-card" style={{ textAlign: 'center', padding: 40 }}>
          <p className="text-body text-ink-muted">ไม่พบพนักงานรหัส "{empId}"</p>
        </div>
      </div>
    )
  }

  const nameTh = `${employee.first_name_th} ${employee.last_name_th}`
  const nameEn = `${employee.first_name_en} ${employee.last_name_en}`
  const tenure = calcTenure(employee.hire_date)

  // Computed fields via lib/calculations (B4 PoC — additive rows only, no existing ACs touched)
  const asOf = new Date().toISOString().slice(0, 10)
  const ageResult = employee.date_of_birth ? (() => {
    try { return calcAge(employee.date_of_birth, asOf) } catch { return null }
  })() : null
  const generationResult = employee.date_of_birth ? (() => {
    try { return calcGeneration(employee.date_of_birth) } catch { return null }
  })() : null
  // B2 PoC: pull employment events from store + pass to calcYearOfService
  // snapshot.events = LifecycleEvent[] compatible with B4 (superset shape, duck-type safe)
  const b2Snapshot = stateAsOf(empId, asOf)
  const yosResult = employee.hire_date ? (() => {
    try {
      return calcYearOfService(
        b2Snapshot.hireDate ?? employee.hire_date,
        b2Snapshot.events,  // B4 duck-types: needs type + effectiveDate + meta only
        asOf,
      )
    } catch { return null }
  })() : null
  const hireDateFormatted = new Date(employee.hire_date).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  // 6 action cards — all active after Phase 1 Batch 2 (BRD #109/117/110/111-115/93/102)
  const ACTION_CARDS: ActionCard[] = [
    {
      icon: ClipboardCheck,
      label: 'ประเมินทดลองงาน',
      desc: 'บันทึกผลการประเมินช่วงทดลองงาน',
      href: `/${locale}/admin/employees/${empId}/probation`,
      locked: false,
    },
    {
      icon: Pencil,
      label: 'แก้ไขข้อมูลส่วนตัว',
      desc: 'อัปเดตข้อมูล Identity / ชื่อ / ที่อยู่',
      href: `/${locale}/admin/employees/${empId}/edit`,
      locked: false,
    },
    {
      icon: ArrowRightLeft,
      label: 'โอนย้าย',
      desc: 'เปลี่ยนบริษัท หน่วยงาน ตำแหน่ง',
      href: `/${locale}/admin/employees/${empId}/transfer`,
      locked: false,
    },
    {
      icon: UserX,
      label: 'สิ้นสุดสภาพพนักงาน',
      desc: 'บันทึกการลาออกหรือสิ้นสุดการจ้างงาน',
      href: `/${locale}/admin/employees/${empId}/terminate`,
      locked: false,
    },
    {
      icon: FileText,
      label: 'ต่อสัญญา',
      desc: 'ต่ออายุสัญญาการจ้างงาน',
      href: `/${locale}/admin/employees/${empId}/contract-renewal`,
      locked: false,
    },
    {
      icon: UserCheck,
      label: 'จ้างซ้ำ',
      desc: 'รับกลับเข้าทำงานหลังสิ้นสุดสภาพ',
      href: `/${locale}/admin/employees/${empId}/rehire`,
      locked: false,
    },
  ]

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Back nav */}
      <div>
        <Link
          href={`/${locale}/admin/employees`}
          className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
          style={{ display: 'inline-flex', gap: 6 }}
        >
          <ArrowLeft size={16} aria-hidden />
          <span>รายการพนักงาน</span>
        </Link>
      </div>

      {/* ── Section A: Snapshot card ───────────────────────── */}
      <div className="humi-card humi-grain" style={{ overflow: 'hidden' }}>
        <div
          className="humi-blob humi-blob--teal hidden lg:block"
          style={{ width: 100, height: 130, right: -20, top: -30, opacity: 0.7 }}
          aria-hidden
        />

        {/* top row: avatar + name + badges */}
        <div className="humi-row" style={{ alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div
            className={avatarClass(employee.status)}
            style={{ width: 56, height: 56, fontSize: 20, flexShrink: 0 }}
            aria-label={`Avatar: ${nameTh}`}
          >
            {avatarInitials(employee)}
          </div>

          {/* Name + ID + badges */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              {employee.employee_id}
            </div>
            <h1 className="font-display text-[22px] font-semibold leading-tight text-ink">
              {nameTh}
            </h1>
            <div className="text-small text-ink-muted">{nameEn}</div>
            <div className="humi-row mt-2" style={{ gap: 8, flexWrap: 'wrap' }}>
              <StatusBadge status={employee.status} />
              <ClassBadge />
            </div>
          </div>
        </div>

        <hr className="humi-divider" />

        {/* Info grid: hire date, tenure, company, position, org unit */}
        <div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          style={{ marginTop: 4 }}
        >
          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              <CalendarDays size={10} className="inline mr-1" aria-hidden />
              วันที่เริ่มงาน
            </div>
            <div className="text-body font-medium text-ink">{hireDateFormatted}</div>
            <div className="text-small text-ink-muted">{tenure}</div>
          </div>

          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              <Building2 size={10} className="inline mr-1" aria-hidden />
              บริษัท
            </div>
            <div className="text-body font-medium text-ink">{employee.company}</div>
            <div className="text-small text-ink-muted">หน่วยงาน {employee.org_unit}</div>
          </div>

          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              <Briefcase size={10} className="inline mr-1" aria-hidden />
              ตำแหน่ง
            </div>
            <div className="text-body font-medium text-ink">{employee.position_title}</div>
          </div>

          {/* B4 PoC: computed fields — Age / Generation / Year-of-Service */}
          {ageResult && (
            <div>
              <div className="humi-eyebrow" style={{ marginBottom: 4 }}>อายุ</div>
              <div className="text-body font-medium text-ink">{ageResult.display}</div>
              <div className="text-small text-ink-muted">{ageResult.decimal} ปี</div>
            </div>
          )}
          {generationResult && (
            <div>
              <div className="humi-eyebrow" style={{ marginBottom: 4 }}>Generation</div>
              <div className="text-body font-medium text-ink">{generationResult}</div>
            </div>
          )}
          {yosResult && (
            <div>
              <div className="humi-eyebrow" style={{ marginBottom: 4 }}>อายุงาน</div>
              <div className="text-body font-medium text-ink">{yosResult.display}</div>
              <div className="text-small text-ink-muted">{yosResult.decimal} ปี</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Section B: Timeline event log ─────────────────── */}
      <div className="humi-card">
        <div className="humi-row" style={{ marginBottom: 16 }}>
          <div>
            <div className="humi-eyebrow">ประวัติการเปลี่ยนแปลง</div>
            <h2 className="mt-1 font-display text-[18px] font-semibold text-ink">
              Timeline
            </h2>
          </div>
          <span className="humi-spacer" />
          <span className="humi-tag">{sortedEvents.length} รายการ</span>
        </div>

        {/* Scrollable event list */}
        <div
          style={{
            maxHeight: 320,
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
          role="feed"
          aria-label="ประวัติการเปลี่ยนแปลงพนักงาน"
        >
          {sortedEvents.length === 0 ? (
            <div
              className="text-body text-ink-muted"
              style={{ padding: '24px 0', textAlign: 'center' }}
            >
              ไม่มีประวัติการเปลี่ยนแปลง
            </div>
          ) : (
            sortedEvents.map((evt) => (
              <TimelineRow key={evt.id} event={evt} />
            ))
          )}
        </div>
      </div>

      {/* ── Section C: Action menu (5 cards, C8 guardrail) ── */}
      <div className="humi-card">
        <div className="humi-eyebrow" style={{ marginBottom: 14 }}>
          การดำเนินการ
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACTION_CARDS.map((card) => {
            const Icon = card.icon
            if (card.locked) {
              return (
                <div
                  key={card.label}
                  className="humi-card humi-card--cream"
                  style={{
                    padding: 16,
                    opacity: 0.65,
                    cursor: 'not-allowed',
                    position: 'relative',
                  }}
                  aria-disabled="true"
                  title="Phase 2 — Coming soon"
                >
                  <div className="humi-row" style={{ gap: 10, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'var(--color-hairline-soft)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, color: 'var(--color-ink-faint)',
                      }}
                    >
                      <Icon size={18} aria-hidden />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="humi-row" style={{ gap: 6 }}>
                        <span className="text-body font-semibold text-ink-muted">{card.label}</span>
                        <Lock size={12} className="text-ink-faint" aria-hidden />
                      </div>
                      <div className="text-small text-ink-faint mt-0.5">{card.desc}</div>
                      <div className="mt-1.5">
                        <span className="humi-tag" style={{ fontSize: 10 }}>Phase 2 — Coming soon</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={card.label}
                href={card.href!}
                className="humi-card group transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                style={{ padding: 16 }}
              >
                <div className="humi-row" style={{ gap: 10, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: 'var(--color-accent-soft)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: 'var(--color-accent)',
                    }}
                  >
                    <Icon size={18} aria-hidden />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="text-body font-semibold text-ink group-hover:text-accent transition-colors">
                      {card.label}
                    </div>
                    <div className="text-small text-ink-soft mt-0.5">{card.desc}</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
