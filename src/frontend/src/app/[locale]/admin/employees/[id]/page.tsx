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
  RefreshCw,
  TrendingUp,
  MapPin,
  Network,
  Star,
} from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { useAuthStore } from '@/stores/auth-store'
import type { TimelineEvent } from '@hrms/shared/types/timeline'
import { useTerminationApprovals, TERMINATION_REASON_LABEL, TERMINATION_STEP_LABEL } from '@/stores/termination-approvals'
import { usePromotionApprovals, PROMOTION_STEP_LABEL } from '@/stores/promotion-approvals'
import { calcAge, calcGeneration, calcYearOfService, calcYearsInJob, calcYearsInCorpTitle, calcYearsInPosition, calcYearsInBU } from '@/lib/calculations'
import type { LifecycleEvent } from '@/lib/calculations'
import { mapEmplStatusCode } from '@/lib/employee/empStatus'

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
// BRD #87: emplStatusDisplay derived from SF emplStatus code via mapEmplStatusCode()
function StatusBadge({ status, emplStatusDisplay }: { status: string; emplStatusDisplay?: string | null }) {
  const map: Record<string, string> = {
    active: 'humi-tag humi-tag--accent',
    terminated: 'humi-tag humi-tag--coral',
    inactive: 'humi-tag',
  }
  const cls = map[status] ?? 'humi-tag'
  const fallbackLabel: Record<string, string> = {
    active: 'ทำงานอยู่',
    terminated: 'ออกจากงานแล้ว',
    inactive: 'ไม่ได้ทำงาน',
  }
  // Prefer SF-derived label; fall back to mock string
  const label = emplStatusDisplay ?? fallbackLabel[status] ?? status
  return <span className={cls}>{label}</span>
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
  acting_start: 'เริ่มรักษาการ',
  acting_end: 'สิ้นสุดรักษาการ',
}

const EVENT_DOT_CLASS: Record<string, string> = {
  hire: 'bg-accent',
  probation_assess: 'bg-info',
  transfer: 'bg-warning',
  terminate: 'bg-danger',
  rehire: 'bg-success',
  contract_renewal: 'bg-sage',
  promotion: 'bg-butter',
  acting_start: 'bg-accent',
  acting_end: 'bg-ink-faint',
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
  lockReason?: string
}

// ── Status-gated action availability (Ken 2026-04-24 — don't show probation
//    to a terminated employee). Rules derived from BRD + 2026-04-23 audit:
//    - terminated: only rehire available
//    - inactive:   read-only (all locked); user must be reactivated first
//    - active + in_probation/extended: probation + edit + terminate only
//    - active + passed (or terminated-prob): all change actions except probation
//    - contract_renewal: gated to PARTIME (contract-based) employees
//    - change_type: always available on active employees
// ─────────────────────────────────────────────────────────────
// actionAvailability moved to @/lib/admin/actionAvailability — shared with
// per-route guard banners (P3). Single source of truth for status gating.
import { actionAvailability } from '@/lib/admin/actionAvailability'

export default function EmployeeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  // Consume employee from S2 store (1K mock employees, snake_case schema)
  const employee = useEmployees((s) => s.getById(empId)) ?? null

  // BRD #207: HRBP-conditional PerPersonal snapshot
  const authRoles = useAuthStore((s) => s.roles)
  const isHRBPPlus = authRoles.some((r) => ['hrbp', 'spd', 'hr_admin', 'hr_manager'].includes(r))

  // Timeline store — S3 owns this
  const { seed } = useTimelines()

  // Seed HireEvent on mount if not already seeded
  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

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
  const hireDateFormatted = new Date(employee.hire_date).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  // ── A8: computed fields — display-layer only (BRD #86-92) ───
  // A2 mockup: derive LifecycleEvent[] from the live Timeline (single source).
  // Includes both seeded mid-career events AND any user-submitted events from
  // /promotion + /transfer routes — so action submit visibly resets the chips.
  const lifecycleEvents: LifecycleEvent[] = events.flatMap((evt): LifecycleEvent[] => {
    switch (evt.kind) {
      case 'hire':    return [{ type: 'HIRE',            effectiveDate: evt.effectiveDate }]
      case 'rehire':  return [{ type: 'REHIRE',          effectiveDate: evt.effectiveDate }]
      case 'transfer': return [{ type: 'CHANGE_POSITION', effectiveDate: evt.effectiveDate }]
      case 'promotion': return [{ type: 'PROMOTION',      effectiveDate: evt.effectiveDate }]
      default: return []  // probation_assess / terminate / contract_renewal — irrelevant for counters
    }
  })
  const today = new Date().toISOString().slice(0, 10)

  const ageResult       = employee.date_of_birth ? calcAge(employee.date_of_birth, today) : null
  const genResult       = employee.date_of_birth ? calcGeneration(employee.date_of_birth) : null
  const yosResult       = employee.hire_date ? calcYearOfService(employee.hire_date, lifecycleEvents, today) : null
  const yijResult       = employee.hire_date ? calcYearsInJob(lifecycleEvents, today) : null
  const yictResult      = employee.hire_date ? calcYearsInCorpTitle(lifecycleEvents, today) : null
  const yipResult       = employee.hire_date ? calcYearsInPosition(lifecycleEvents, today) : null
  // BRD #86: 5th chip — Years in BU (calcYearsInBU from lib/calculations)
  const yibuResult      = employee.hire_date ? calcYearsInBU(lifecycleEvents, today) : null

  // BRD #87: emplStatus display from SF code
  // Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].emplStatus ("5581"=Active,"5597"=Terminated)
  const emplStatusDisplay = employee.empl_status_code
    ? mapEmplStatusCode(employee.empl_status_code)
    : null
  // Workflow status snapshot — termination + promotion pending requests for this employee
  const terminationRequests = useTerminationApprovals((s) => s.requests)
  const promotionRequests = usePromotionApprovals((s) => s.requests)
  const latestTermination = terminationRequests.find((r) => r.employeeId === empId)
  const latestPromotion = promotionRequests.find((r) => r.employeeId === empId)

  // Compute status-gated availability once per render
  const avail = actionAvailability(employee)
  const ACTION_CARDS: ActionCard[] = [
    {
      icon: ClipboardCheck,
      label: 'ประเมินทดลองงาน',
      desc: 'บันทึกผลการประเมินช่วงทดลองงาน',
      href: `/${locale}/admin/employees/${empId}/probation`,
      locked: !avail.probation.ok,
      lockReason: avail.probation.reason,
    },
    {
      icon: Pencil,
      label: 'แก้ไขข้อมูลส่วนตัว',
      desc: 'อัปเดตข้อมูลชื่อ ที่อยู่ และข้อมูลส่วนตัว',
      href: `/${locale}/admin/employees/${empId}/edit`,
      locked: !avail.edit.ok,
      lockReason: avail.edit.reason,
    },
    {
      icon: ArrowRightLeft,
      label: 'โอนย้าย',
      desc: 'เปลี่ยนบริษัท หน่วยงาน ตำแหน่ง',
      href: `/${locale}/admin/employees/${empId}/transfer`,
      locked: !avail.transfer.ok,
      lockReason: avail.transfer.reason,
    },
    {
      icon: UserX,
      label: 'สิ้นสุดสภาพพนักงาน',
      desc: 'บันทึกการลาออกหรือสิ้นสุดการจ้างงาน',
      href: `/${locale}/admin/employees/${empId}/terminate`,
      locked: !avail.terminate.ok,
      lockReason: avail.terminate.reason,
    },
    {
      icon: FileText,
      label: 'ต่อสัญญา',
      desc: 'ต่ออายุสัญญาการจ้างงาน',
      href: `/${locale}/admin/employees/${empId}/contract-renewal`,
      locked: !avail.contract_renewal.ok,
      lockReason: avail.contract_renewal.reason,
    },
    {
      icon: UserCheck,
      label: 'จ้างซ้ำ',
      desc: 'รับกลับเข้าทำงานหลังสิ้นสุดสภาพ',
      href: `/${locale}/admin/employees/${empId}/rehire`,
      locked: !avail.rehire.ok,
      lockReason: avail.rehire.reason,
    },
    {
      icon: RefreshCw,
      label: 'เปลี่ยนประเภทการจ้าง',
      desc: 'เปลี่ยนระหว่างพนักงานประจำกับพนักงานบางเวลา',
      href: `/${locale}/admin/employees/${empId}/change-type`,
      locked: !avail.change_type.ok,
      lockReason: avail.change_type.reason,
    },
    {
      icon: TrendingUp,
      label: 'เลื่อนตำแหน่ง',
      desc: 'เลื่อนระดับ ปรับตำแหน่ง หรือปรับเงินเดือน',
      href: `/${locale}/admin/employees/${empId}/promotion`,
      locked: !avail.promotion.ok,
      lockReason: avail.promotion.reason,
    },
    {
      icon: Star,
      label: 'มอบหมายปฏิบัติการ',
      desc: 'กำหนดรักษาการตำแหน่ง',
      href: `/${locale}/admin/employees/${empId}/acting`,
      locked: !avail.acting.ok,
      lockReason: avail.acting.reason,
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

      {/* ── Section A1: ข้อมูลส่วนตัว (Person-level — A3 split) ──── */}
      <div className="humi-card humi-grain" style={{ overflow: 'hidden' }}>
        <div
          className="humi-blob humi-blob--teal hidden lg:block"
          style={{ width: 100, height: 130, right: -20, top: -30, opacity: 0.7 }}
          aria-hidden
        />

        <div className="humi-eyebrow" style={{ marginBottom: 12 }}>ข้อมูลส่วนตัว</div>

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
              {/* BRD #85: employmentId alongside HR employee_id
                  Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].employmentId */}
              {employee.employee_id}
              {employee.employment_id && (
                <span className="text-ink-faint" style={{ marginLeft: 8 }}>
                  · EJ: {employee.employment_id}
                </span>
              )}
            </div>
            <h1 className="font-display text-[22px] font-semibold leading-tight text-ink">
              {nameTh}
            </h1>
            <div className="text-small text-ink-muted">{nameEn}</div>
            <div className="humi-row mt-2" style={{ gap: 8, flexWrap: 'wrap' }}>
              {/* BRD #87: emplStatus from SF code (5581=active, 5597=terminated)
                  Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].emplStatus */}
              <StatusBadge status={employee.status} emplStatusDisplay={emplStatusDisplay} />
              <ClassBadge empClass={employee.employee_class} />
            </div>
          </div>
        </div>

        {/* Person-level chips: อายุ + Generation */}
        {(ageResult || genResult) && (
          <>
            <hr className="humi-divider" />
            <div className="humi-row" style={{ gap: 12, flexWrap: 'wrap' }}>
              {ageResult && (
                <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 100 }}>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุ</div>
                  <div className="text-body font-semibold text-ink">{ageResult.display}</div>
                </div>
              )}
              {genResult && (
                <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 100 }}>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>Generation</div>
                  <div className="text-body font-semibold text-ink">{genResult}</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── Section A2: ข้อมูลการจ้างงาน (Employment-level — A3 split) ──── */}
      <div className="humi-card" style={{ overflow: 'hidden' }}>
        <div className="humi-eyebrow" style={{ marginBottom: 12 }}>ข้อมูลการจ้างงาน</div>

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
            {employee.seniority_start_date !== employee.hire_date && (
              <div className="text-small text-ink-muted" style={{ marginTop: 2 }}>
                อายุงานนับจาก {new Date(employee.seniority_start_date).toLocaleDateString('th-TH', {
                  year: 'numeric', month: 'short', day: 'numeric',
                })}
              </div>
            )}
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
            {employee.corporate_title && employee.corporate_title !== employee.position_title && (
              <div className="text-small text-ink-muted">ระดับ {employee.corporate_title}</div>
            )}
            {/* BRD #88: position code from SF EmpJob.position
                Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].position = "9999C002" */}
            {employee.position_code && (
              <div className="text-small text-ink-faint" style={{ marginTop: 2 }}>
                รหัส: {employee.position_code}
              </div>
            )}
          </div>

          {/* BRD #88: payGrade + regularTemporary from SF EmpJob
              Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].payGrade="08", regularTemporary=null */}
          {(employee.pay_grade || employee.regular_temporary) && (
            <div>
              <div className="humi-eyebrow" style={{ marginBottom: 4 }}>Pay Grade / ประเภท</div>
              {employee.pay_grade && (
                <div className="text-body font-medium text-ink">PG-{employee.pay_grade}</div>
              )}
              {employee.regular_temporary && (
                <div className="text-small text-ink-muted">
                  {employee.regular_temporary === 'R' ? 'Regular (ประจำ)' : 'Temporary (ชั่วคราว)'}
                </div>
              )}
            </div>
          )}

          {/* Retail chips — audit A6/#11: conditional on non-null */}
          {employee.store_branch_code && (
            <div>
              <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
                <MapPin size={10} className="inline mr-1" aria-hidden />
                สาขา/หน่วยงาน
              </div>
              <div className="text-body font-medium text-ink">{employee.store_branch_code}</div>
            </div>
          )}
          {employee.hr_district && (
            <div>
              <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
                <Network size={10} className="inline mr-1" aria-hidden />
                เขต HR
              </div>
              <div className="text-body font-medium text-ink">{employee.hr_district}</div>
            </div>
          )}
        </div>

        {/* ── Acting chip — open acting roles derived from timeline ── */}
        {(() => {
          const openActingRoles = events
            .filter((e) => e.kind === 'acting_start')
            .filter((start) =>
              !events.some(
                (end) =>
                  end.kind === 'acting_end' &&
                  end.effectiveDate > start.effectiveDate &&
                  (end as import('@hrms/shared/types/timeline').ActingEvent).position ===
                    (start as import('@hrms/shared/types/timeline').ActingEvent).position,
              ),
            )
            .map((e) => (e as import('@hrms/shared/types/timeline').ActingEvent).position)

          if (openActingRoles.length === 0) return null
          return (
            <div className="humi-row" style={{ gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
              <span
                className="humi-tag humi-tag--accent"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
              >
                <Star size={11} aria-hidden />
                กำลังรักษาการ: {openActingRoles.join(', ')}
              </span>
            </div>
          )
        })()}

        {/* ── BRD #21: EmpEmployment fields ──────────────────────────────────────
            Source: sf-qas-EmpEmployment-2026-04-26.json → .d.results[0]
            Fields: originalStartDate, seniorityDate, serviceDate, okToRehire,
                    assignmentClass, hiringNotCompleted */}
        {(employee.original_start_date || employee.service_date || employee.ok_to_rehire !== undefined || employee.assignment_class || employee.hiring_not_completed) && (
          <>
            <hr className="humi-divider" />
            <div className="humi-eyebrow" style={{ marginBottom: 8 }}>ข้อมูลการจ้างงาน (EmpEmployment)</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" style={{ marginTop: 4 }}>
              {/* BRD #21: originalStartDate — earliest employment start incl. prior rehires */}
              {employee.original_start_date && employee.original_start_date !== employee.hire_date && (
                <div>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันเริ่มงานครั้งแรก</div>
                  <div className="text-body font-medium text-ink">
                    {new Date(employee.original_start_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              )}
              {/* BRD #21: serviceDate — for PF vesting calc */}
              {employee.service_date && employee.service_date !== employee.hire_date && (
                <div>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่นับอายุงาน (Service)</div>
                  <div className="text-body font-medium text-ink">
                    {new Date(employee.service_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              )}
              {employee.ok_to_rehire !== undefined && (
                <div>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>รับกลับได้?</div>
                  <div className="text-body font-medium text-ink">
                    {employee.ok_to_rehire ? 'ใช่' : 'ไม่ใช่'}
                  </div>
                </div>
              )}
              {employee.assignment_class && (
                <div>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ประเภทการมอบหมาย</div>
                  <div className="text-body font-medium text-ink">
                    {employee.assignment_class === 'ST' ? 'Standard' : employee.assignment_class}
                  </div>
                </div>
              )}
              {employee.hiring_not_completed && (
                <div>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>สถานะ Onboarding</div>
                  <div className="text-body font-medium" style={{ color: 'var(--color-warning)' }}>
                    ยังไม่เสร็จสิ้น
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── BRD #90: Job Grade effective-date history (collapsible) ────────────
            Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].seqNumber, startDate */}
        {employee.job_grade_history && employee.job_grade_history.length > 1 && (() => {
          const sorted = [...employee.job_grade_history].sort((a, b) => b.seqNumber - a.seqNumber)
          return (
            <>
              <hr className="humi-divider" />
              <details>
                <summary
                  className="humi-eyebrow"
                  style={{ cursor: 'pointer', marginBottom: 8, userSelect: 'none' }}
                >
                  ประวัติ Job Grade ({employee.job_grade_history.length} รายการ)
                </summary>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                  {sorted.map((jg) => (
                    <div
                      key={jg.seqNumber}
                      className="humi-row"
                      style={{ gap: 12, padding: '6px 10px', borderRadius: 6, background: 'var(--color-canvas-soft)' }}
                    >
                      <span className="humi-tag">{jg.grade}</span>
                      <span className="text-small text-ink-muted">
                        มีผลตั้งแต่ {new Date(jg.startDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-small text-ink-faint">seq {jg.seqNumber}</span>
                    </div>
                  ))}
                </div>
              </details>
            </>
          )
        })()}

        {/* ── BRD #92: Business Unit effective-date history (collapsible) ─────────
            Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].businessUnit, startDate */}
        {employee.bu_history && employee.bu_history.length > 1 && (() => {
          const sorted = [...employee.bu_history].sort((a, b) => b.seqNumber - a.seqNumber)
          return (
            <>
              <hr className="humi-divider" />
              <details>
                <summary
                  className="humi-eyebrow"
                  style={{ cursor: 'pointer', marginBottom: 8, userSelect: 'none' }}
                >
                  ประวัติหน่วยงาน / BU ({employee.bu_history.length} รายการ)
                </summary>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                  {sorted.map((bu) => (
                    <div
                      key={bu.seqNumber}
                      className="humi-row"
                      style={{ gap: 12, padding: '6px 10px', borderRadius: 6, background: 'var(--color-canvas-soft)' }}
                    >
                      <span className="text-body font-medium text-ink">{bu.businessUnit}</span>
                      <span className="text-small text-ink-muted">
                        มีผลตั้งแต่ {new Date(bu.startDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-small text-ink-faint">seq {bu.seqNumber}</span>
                    </div>
                  ))}
                </div>
              </details>
            </>
          )
        })()}

        {/* ── A8: computed years-in-X chips (BRD #86-92, DOC-55CC266A rows #4,7,9,11) ──
            Auto-collapse: when an employee has never transferred / changed position /
            been promoted, all 4 counters equal hire-date tenure — showing 4 identical
            chips is noise. Collapse to a single "อายุงาน" chip unless the values
            actually diverge (any movement in the timeline resets one counter). */}
        {/* BRD #86: 5-chip Years-in-X row (company/job/position/title/org-unit)
            Source: calcYearsInJob/calcYearsInCorpTitle/calcYearsInPosition/calcYearsInBU from /lib/calculations */}
        {employee.hire_date && yosResult && (() => {
          const counters = [yosResult, yijResult, yictResult, yipResult, yibuResult].filter(
            (c): c is NonNullable<typeof c> => c !== null,
          )
          const uniqueDisplays = new Set(counters.map((c) => c.display))
          const collapsed = uniqueDisplays.size <= 1

          return (
            <>
              <hr className="humi-divider" />
              <div className="humi-row" style={{ gap: 12, flexWrap: 'wrap' }}>
                {collapsed ? (
                  <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 100 }}>
                    <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงาน</div>
                    <div className="text-body font-semibold text-ink">{yosResult.display}</div>
                  </div>
                ) : (
                  <>
                    <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 100 }}>
                      <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงาน (บริษัท)</div>
                      <div className="text-body font-semibold text-ink">{yosResult.display}</div>
                    </div>
                    {yijResult && (
                      <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 120 }}>
                        <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงานในสายงาน</div>
                        <div className="text-body font-semibold text-ink">{yijResult.display}</div>
                      </div>
                    )}
                    {yipResult && (
                      <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 130 }}>
                        <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงานในตำแหน่ง</div>
                        <div className="text-body font-semibold text-ink">{yipResult.display}</div>
                      </div>
                    )}
                    {yictResult && (
                      <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 120 }}>
                        <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงานในระดับ</div>
                        <div className="text-body font-semibold text-ink">{yictResult.display}</div>
                      </div>
                    )}
                    {yibuResult && (
                      <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 130 }}>
                        <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงานใน BU</div>
                        <div className="text-body font-semibold text-ink">{yibuResult.display}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
              {!collapsed && (
                <div
                  className="text-small text-ink-faint"
                  style={{ marginTop: 12, fontSize: 11, lineHeight: 1.5 }}
                >
                  ตัวเลขนับจาก event ล่าสุดของแต่ละประเภท — โอนย้าย/เปลี่ยนตำแหน่ง/เลื่อนระดับ จะ reset counter
                  ที่เกี่ยวข้องโดยอัตโนมัติ ดูประวัติเต็มได้ที่ Timeline ด้านล่าง
                </div>
              )}
            </>
          )
        })()}
      </div>

      {/* ── Workflow status snapshot (Chains 1 + 4) ─────────── */}
      {(latestTermination ?? latestPromotion) && (
        <div className="humi-card" style={{ padding: 16 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 12 }}>คำขอที่เกี่ยวข้อง</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {latestTermination && (
              <div
                className="humi-row"
                style={{
                  gap: 12, padding: '10px 14px', borderRadius: 8,
                  background: 'var(--color-canvas-soft)', flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>คำขอลาออก (BRD #172)</div>
                  <div className="text-body font-medium text-ink">
                    {TERMINATION_REASON_LABEL[latestTermination.reasonCode]}
                  </div>
                  <div className="text-small text-ink-muted">
                    วันสุดท้าย: {new Date(latestTermination.requestedLastDay).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <span
                  className={`humi-tag ${latestTermination.status === 'approved' ? 'humi-tag--accent' : latestTermination.status === 'rejected' ? 'humi-tag--coral' : 'humi-tag--butter'}`}
                >
                  {TERMINATION_STEP_LABEL[latestTermination.status]}
                </span>
              </div>
            )}
            {latestPromotion && (
              <div
                className="humi-row"
                style={{
                  gap: 12, padding: '10px 14px', borderRadius: 8,
                  background: 'var(--color-canvas-soft)', flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>คำขอเลื่อนตำแหน่ง (BRD #103)</div>
                  <div className="text-body font-medium text-ink">
                    {latestPromotion.fromPosition} → {latestPromotion.toPosition}
                  </div>
                  <div className="text-small text-ink-muted">
                    มีผล: {new Date(latestPromotion.effectiveDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <span
                  className={`humi-tag ${latestPromotion.status === 'approved' ? 'humi-tag--accent' : latestPromotion.status === 'rejected' ? 'humi-tag--coral' : 'humi-tag--butter'}`}
                >
                  {PROMOTION_STEP_LABEL[latestPromotion.status]}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── BRD #207: HRBP-conditional PerPersonal snapshot ──────────────────
          Visible to: hrbp, spd, hr_admin, hr_manager only.
          SF cite: sf-extract/qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json
          Fields: originalStartDate, seniorityDate, retirementDate, religion,
                  ethnicity, placeOfBirth, countryOfBirth, nativePreferredLang */}
      {isHRBPPlus && (
        <div className="humi-card" style={{ padding: 16 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 12 }}>
            ข้อมูลส่วนตัว HRBP (PerPersonal)
            <span className="humi-tag humi-tag--butter" style={{ marginLeft: 8, fontSize: 11 }}>HRBP+</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" style={{ marginTop: 4 }}>
            {employee?.original_start_date && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่เริ่มงานครั้งแรก</div>
                <div className="text-body font-medium text-ink">
                  {new Date(employee.original_start_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            )}
            {employee?.seniority_date && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่อาวุโส</div>
                <div className="text-body font-medium text-ink">
                  {new Date(employee.seniority_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            )}
            {employee?.retirement_date && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันเกษียณ</div>
                <div className="text-body font-medium text-ink">
                  {new Date(employee.retirement_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            )}
            {employee?.religion && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ศาสนา</div>
                <div className="text-body font-medium text-ink">{employee.religion}</div>
              </div>
            )}
            {employee?.ethnicity && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>เชื้อชาติ</div>
                <div className="text-body font-medium text-ink">{employee.ethnicity}</div>
              </div>
            )}
            {employee?.place_of_birth && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>สถานที่เกิด</div>
                <div className="text-body font-medium text-ink">{employee.place_of_birth}</div>
              </div>
            )}
            {employee?.country_of_birth && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ประเทศที่เกิด</div>
                <div className="text-body font-medium text-ink">{employee.country_of_birth}</div>
              </div>
            )}
            {employee?.native_preferred_lang && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ภาษาหลัก</div>
                <div className="text-body font-medium text-ink">{employee.native_preferred_lang}</div>
              </div>
            )}
          </div>
        </div>
      )}

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
                  title={card.lockReason ?? 'ยังไม่พร้อมใช้งาน'}
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
                      {card.lockReason && (
                        <div className="mt-1.5 text-small text-ink-muted" style={{ fontSize: 11, lineHeight: 1.4 }}>
                          {card.lockReason}
                        </div>
                      )}
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
