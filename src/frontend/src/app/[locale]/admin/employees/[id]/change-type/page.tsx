// VALIDATION_EXEMPT: B-action factory page — guarded by actionAvailability + required fields in UI.
'use client'

// change-type/page.tsx — เปลี่ยนประเภทการจ้าง (BRD #103)
// SF event reason: JCHG_EMPTYPE (event 5594). PT↔FT keeps continuous service.

import { useCallback, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { EffectiveDateGate } from '@/components/admin/EffectiveDateGate'
import { ActionGuardBanner } from '@/components/admin/ActionGuardBanner'
import { ActionRequirementBanner } from '@/components/admin/lifecycle/ActionRequirementBanner'
import { ReasonPicker } from '@/components/admin/lifecycle/ReasonPicker'
import { ApprovalChain } from '@/components/quick-approve/ApprovalChain'
import { actionAvailability } from '@/lib/admin/actionAvailability'
import type { MockEmployee } from '@/mocks/employees'
import type { ApproverStage } from '@/data/benefits/plan-registry'

const CHANGE_TYPE_CHAIN: ApproverStage[] = ['hrbp', 'hr_admin']
const CHANGE_TYPE_CURRENT_STAGE: ApproverStage = 'hrbp'

type EmployeeClass = MockEmployee['employee_class']

function classLabel(value: EmployeeClass): string {
  return value === 'PERMANENT' ? 'Permanent / พนักงานประจำ' : 'Part-time / พนักงานบางเวลา'
}

function EmployeeSnapshot({ employee }: { employee: MockEmployee }) {
  const nameTh = `${employee.first_name_th} ${employee.last_name_th}`
  return (
    <div className="humi-card humi-card--cream">
      <div className="humi-eyebrow" style={{ marginBottom: 4 }}>{employee.employee_id}</div>
      <div className="font-display text-[18px] font-semibold text-ink">{nameTh}</div>
      <div className="text-small text-ink-muted">
        {employee.position_title} · {employee.company} · ปัจจุบัน: {classLabel(employee.employee_class)}
      </div>
    </div>
  )
}

export default function ChangeTypePage() {
  const params = useParams()
  const router = useRouter()
  const locale = useLocale()
  const empId = params.id as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null
  const updateEmployee = useEmployees((s) => s.updateEmployee)

  const [effectiveDate, setEffectiveDate] = useState<string | null>(null)
  const [targetClass, setTargetClass] = useState<EmployeeClass | null>(null)
  const [eventReason, setEventReason] = useState<string | null>('JCHG_EMPTYPE')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const defaultTargetClass: EmployeeClass | null = employee
    ? (employee.employee_class === 'PERMANENT' ? 'PARTIME' : 'PERMANENT')
    : null
  const effectiveTargetClass = targetClass ?? defaultTargetClass

  const isValid = !!employee && !!effectiveDate && !!effectiveTargetClass && !!eventReason && effectiveTargetClass !== employee.employee_class

  const doSubmit = useCallback(() => {
    if (!employee || !isValid || !effectiveTargetClass) return

    updateEmployee(empId, {
      employee_class: effectiveTargetClass,
      regular_temporary: effectiveTargetClass === 'PERMANENT' ? 'R' : 'T',
    })

    setSubmitted(true)
    const message = `บันทึกเปลี่ยนประเภทการจ้างเป็น ${classLabel(effectiveTargetClass)} แล้ว — Event Reason ${eventReason}`
    router.push(`/${locale}/admin/employees/${empId}?banner=${encodeURIComponent(message)}`)
  }, [employee, isValid, effectiveTargetClass, updateEmployee, empId, eventReason, router, locale])

  if (!employee) {
    return (
      <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Link href={`/${locale}/admin/employees`} className="humi-row text-body text-ink-muted hover:text-accent transition-colors" style={{ display: 'inline-flex', gap: 6 }}>
          <ArrowLeft size={16} aria-hidden />
          <span>รายการพนักงาน</span>
        </Link>
        <div className="humi-card" style={{ textAlign: 'center', padding: 40 }}>
          <p className="text-body text-ink-muted">ไม่พบพนักงานรหัส &ldquo;{empId}&rdquo;</p>
        </div>
      </div>
    )
  }

  const guard = actionAvailability(employee).change_type
  if (!guard.ok) {
    return (
      <ActionGuardBanner
        actionKey="change_type"
        reason={guard.reason ?? ''}
        backHref={`/${locale}/admin/employees/${empId}`}
        actionLabel="เปลี่ยนประเภทการจ้าง"
      />
    )
  }

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <Link href={`/${locale}/admin/employees/${empId}`} className="humi-row text-body text-ink-muted hover:text-accent transition-colors" style={{ display: 'inline-flex', gap: 6 }}>
          <ArrowLeft size={16} aria-hidden />
          <span>กลับไปหน้าข้อมูลพนักงาน</span>
        </Link>
      </div>

      <div className="humi-row" style={{ gap: 10, alignItems: 'center' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--color-accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--color-accent)' }}>
          <RefreshCw size={18} aria-hidden />
        </div>
        <div>
          <div className="humi-eyebrow">การดำเนินการ</div>
          <h1 className="font-display text-[20px] font-semibold text-ink">เปลี่ยนประเภทการจ้าง</h1>
        </div>
      </div>

      <EmployeeSnapshot employee={employee} />
      <ActionRequirementBanner actionKey="change_type" />

      <div className="humi-card">
        <div className="humi-eyebrow" style={{ marginBottom: 8 }}>{locale === 'en' ? 'Approval Chain' : 'ขั้นตอนอนุมัติ'}</div>
        <ApprovalChain chain={CHANGE_TYPE_CHAIN} locale={locale} activeStage={CHANGE_TYPE_CURRENT_STAGE} />
      </div>

      <EffectiveDateGate
        mode="inline"
        min={employee.hire_date || undefined}
        initialEffectiveDate={effectiveDate ?? undefined}
        onEffectiveDateChange={setEffectiveDate}
      >
        {() => (
          <div className="humi-card">
            <div className="humi-eyebrow" style={{ marginBottom: 16 }}>ข้อมูลการเปลี่ยนประเภทการจ้าง</div>

            <div style={{ marginBottom: 20 }}>
              <label className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 8 }}>
                ประเภทการจ้างใหม่ <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <div role="radiogroup" aria-label="ประเภทการจ้างใหม่" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                {(['PERMANENT', 'PARTIME'] as const).map((value) => (
                  <label key={value} className="humi-row" style={{ gap: 10, cursor: value === employee.employee_class ? 'not-allowed' : 'pointer', padding: '12px 14px', borderRadius: 10, border: `1.5px solid ${targetClass === value ? 'var(--color-accent)' : 'var(--color-hairline-soft)'}`, opacity: value === employee.employee_class ? 0.55 : 1 }}>
                    <input
                      type="radio"
                      name="targetClass"
                      value={value}
                      checked={effectiveTargetClass === value}
                      disabled={value === employee.employee_class}
                      onChange={() => setTargetClass(value)}
                      style={{ accentColor: 'var(--color-accent)' }}
                      aria-label={classLabel(value)}
                    />
                    <span className="text-body text-ink">{classLabel(value)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <ReasonPicker
                id="change-type-event-reason"
                event="5594"
                value={eventReason}
                onChange={setEventReason}
                required
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label htmlFor="changeTypeNotes" className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 6 }}>
                หมายเหตุ <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
              </label>
              <textarea
                id="changeTypeNotes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="รายละเอียดเพิ่มเติม เช่น PT→FT ตามคำอนุมัติ..."
                className="humi-input"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <div className="humi-row" style={{ gap: 10, justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => router.push(`/${locale}/admin/employees/${empId}`)} className="humi-btn humi-btn--ghost">
                ยกเลิก
              </button>
              <button type="button" onClick={doSubmit} disabled={!isValid || submitted} className="humi-btn humi-btn--primary" aria-disabled={!isValid || submitted}>
                บันทึกเปลี่ยนประเภทการจ้าง
              </button>
            </div>
          </div>
        )}
      </EffectiveDateGate>
    </div>
  )
}
