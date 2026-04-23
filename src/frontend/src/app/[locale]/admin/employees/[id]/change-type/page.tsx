'use client'

// change-type/page.tsx — เปลี่ยนประเภทการจ้าง (CNeXt #06 JCHG_EMPTYPE)
//
// Archetype B contextual lifecycle action — mirrors contract-renewal pattern.
// Event: CHANGE_EMPLOYEE_TYPE → useEmploymentEvents.appendEvent + useEmployees.updateEmployee
//
// BRD grounding (C8): CNeXt TTT V0.02 Process 06
//   - Event reason: JCHG_EMPTYPE
//   - Employee types per MockEmployee schema: PERMANENT | PARTIME (+ CONTRACT as UI-only extension)
//   - May need additional Comp step for Pay Group change — UI hint only (BA validation TBD)
//
// C1: touches only this file + store/types (enum extension).

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { RefreshCw } from 'lucide-react'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { useEmploymentEvents } from '@/lib/admin/store/useEmploymentEvents'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import type { MockEmployee } from '@/mocks/employees'

// ─── Types ────────────────────────────────────────────────────────────────────

type EmployeeType = 'PERMANENT' | 'PARTIME' | 'CONTRACT'

interface ChangeTypeForm {
  toType: EmployeeType | ''
  effectiveDate: string
  reasonCode: string
  contractEndDate: string   // required if toType === CONTRACT
}

// ─── Constants ───────────────────────────────────────────────────────────────

const EMPLOYEE_TYPE_LABELS: Record<EmployeeType, string> = {
  PERMANENT: 'พนักงานประจำ',
  PARTIME: 'พนักงานพาร์ทไทม์',
  CONTRACT: 'พนักงานสัญญาจ้าง',
}

const REASON_CODES: { value: string; label: string }[] = [
  { value: 'JCHG_EMPTYPE', label: 'เปลี่ยนประเภทการจ้าง (JCHG_EMPTYPE)' },
  { value: 'DC_DC', label: 'เปลี่ยนแปลงข้อมูล (DC_DC)' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDateTh(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function currentTypeLabel(emp: MockEmployee): string {
  if (emp.employee_class === 'PARTIME') return EMPLOYEE_TYPE_LABELS.PARTIME
  return EMPLOYEE_TYPE_LABELS.PERMANENT
}

// ─── EmployeeSnapshot ─────────────────────────────────────────────────────────

function EmployeeSnapshot({ employee }: { employee: MockEmployee }) {
  const nameTh = `${employee.first_name_th} ${employee.last_name_th}`
  const nameEn = `${employee.first_name_en} ${employee.last_name_en}`

  return (
    <div className="humi-card humi-card--cream">
      <div className="humi-eyebrow" style={{ marginBottom: 4 }}>{employee.employee_id}</div>
      <div className="font-display text-[18px] font-semibold text-ink">{nameTh}</div>
      <div className="text-small text-ink-muted mb-3">{nameEn}</div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" style={{ marginTop: 8 }}>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ประเภทพนักงานปัจจุบัน</div>
          <div className="text-body font-semibold text-ink">{currentTypeLabel(employee)}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่เริ่มงาน</div>
          <div className="text-body font-medium text-ink">{formatDateTh(employee.hire_date)}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ตำแหน่ง</div>
          <div className="text-body font-medium text-ink">{employee.position_title}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ChangeEmployeeTypePage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null
  const updateEmployee = useEmployees.getState().updateEmployee
  const appendEvent = useEmploymentEvents((s) => s.appendEvent)
  const { seed } = useTimelines()

  // Seed timeline on mount
  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  // ── Form state ───────────────────────────────────────────────────────────
  const [form, setForm] = useState<ChangeTypeForm>({
    toType: '',
    effectiveDate: '',
    reasonCode: '',
    contractEndDate: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const hireDateISO = employee?.hire_date ?? ''

  // ── Derived current type ─────────────────────────────────────────────────
  const fromType = useMemo<EmployeeType>(() => {
    if (!employee) return 'PERMANENT'
    return employee.employee_class === 'PARTIME' ? 'PARTIME' : 'PERMANENT'
  }, [employee])

  // ── Validation ───────────────────────────────────────────────────────────
  const errors = useMemo(() => {
    const errs: string[] = []
    if (!form.toType) return errs
    if (form.toType === fromType) errs.push('ประเภทใหม่ต้องต่างจากปัจจุบัน')
    if (!form.effectiveDate) errs.push('กรุณาระบุวันที่มีผล')
    else if (hireDateISO && form.effectiveDate < hireDateISO) errs.push('วันที่มีผลต้องไม่ก่อนวันที่เริ่มงาน')
    if (!form.reasonCode) errs.push('กรุณาเลือกรหัสเหตุผล')
    if (form.toType === 'CONTRACT') {
      if (!form.contractEndDate) errs.push('สัญญาจ้างต้องระบุวันสิ้นสุดสัญญา')
      else if (form.effectiveDate && form.contractEndDate <= form.effectiveDate) {
        errs.push('วันสิ้นสุดสัญญาต้องหลังจากวันที่มีผล')
      }
    }
    return errs
  }, [form, fromType, hireDateISO])

  const isValid = form.toType !== '' && errors.length === 0 && !!form.effectiveDate && !!form.reasonCode

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    if (!employee || !isValid || !form.toType) return
    setSubmitError(null)

    try {
      // Append lifecycle event
      appendEvent({
        employeeId: empId,
        type: 'CHANGE_EMPLOYEE_TYPE',
        effectiveDate: form.effectiveDate,
        createdBy: 'admin-current',
        meta: {
          reason: form.reasonCode,
          notes: form.toType === 'CONTRACT' && form.contractEndDate
            ? `สิ้นสุดสัญญา: ${form.contractEndDate}`
            : undefined,
        },
      })

      // Update mock employee store — reflect new type
      const newClass = form.toType === 'PARTIME' ? 'PARTIME' : 'PERMANENT'
      updateEmployee(empId, { employee_class: newClass })

      setSubmitted(true)
      const transitionLabel = `${EMPLOYEE_TYPE_LABELS[fromType]} → ${EMPLOYEE_TYPE_LABELS[form.toType as EmployeeType]}`
      router.push(
        `/${locale}/admin/employees/${empId}?banner=${encodeURIComponent(
          `เปลี่ยนประเภทการจ้างแล้ว — ${transitionLabel}`,
        )}`,
      )
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด')
    }
  }, [employee, isValid, form, fromType, empId, appendEvent, updateEmployee, router, locale])

  // ── Not found ────────────────────────────────────────────────────────────
  if (!employee) {
    return (
      <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <Link
            href={`/${locale}/admin/employees`}
            className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
            style={{ display: 'inline-flex', gap: 6 }}
          >
            <span>← รายการพนักงาน</span>
          </Link>
        </div>
        <div className="humi-card" style={{ textAlign: 'center', padding: 40 }}>
          <p className="text-body text-ink-muted">ไม่พบพนักงานรหัส &ldquo;{empId}&rdquo;</p>
        </div>
      </div>
    )
  }

  const toTypeValue = form.toType as EmployeeType | ''
  const transitionSummary =
    toTypeValue && toTypeValue !== fromType
      ? `${EMPLOYEE_TYPE_LABELS[fromType]} → ${EMPLOYEE_TYPE_LABELS[toTypeValue]}`
      : null

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Back nav */}
      <div>
        <Link
          href={`/${locale}/admin/employees/${empId}`}
          className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
          style={{ display: 'inline-flex', gap: 6 }}
        >
          <span aria-hidden>←</span>
          <span>กลับไปหน้าข้อมูลพนักงาน</span>
        </Link>
      </div>

      {/* Page title */}
      <div className="humi-row" style={{ gap: 10, alignItems: 'center' }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--color-accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, color: 'var(--color-accent)',
          }}
        >
          <RefreshCw size={18} aria-hidden />
        </div>
        <div>
          <div className="humi-eyebrow">การดำเนินการ</div>
          <h1 className="font-display text-[20px] font-semibold text-ink">
            เปลี่ยนประเภทการจ้าง
          </h1>
        </div>
      </div>

      {/* Employee snapshot */}
      <EmployeeSnapshot employee={employee} />

      {/* Comp change info banner */}
      <div
        role="note"
        style={{
          padding: '10px 16px',
          borderRadius: 10,
          border: '1.5px solid var(--color-hairline)',
          background: 'var(--color-surface-muted, #f5f5f4)',
          color: 'var(--color-ink-soft)',
        }}
      >
        <span className="text-small">
          หมายเหตุ: การเปลี่ยนประเภทการจ้างอาจต้องปรับ Pay Group แยกต่างหาก (JCHG_EMPTYPE — CNeXt #06)
        </span>
      </div>

      {/* Form */}
      <div className="humi-card">
        <div className="humi-eyebrow" style={{ marginBottom: 16 }}>รายละเอียดการเปลี่ยนแปลง</div>

        {/* ประเภทพนักงานปัจจุบัน (read-only) */}
        <div style={{ marginBottom: 20 }}>
          <label
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            ประเภทพนักงานปัจจุบัน
          </label>
          <div
            className="humi-input"
            style={{
              maxWidth: 300,
              background: 'var(--color-surface-muted, #f5f5f4)',
              color: 'var(--color-ink-muted)',
              cursor: 'default',
              userSelect: 'none',
            }}
            aria-readonly="true"
          >
            {currentTypeLabel(employee)}
          </div>
        </div>

        <hr className="humi-divider" />

        {/* ประเภทพนักงานใหม่ (required) */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="toType"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            ประเภทพนักงานใหม่{' '}
            <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <select
            id="toType"
            value={form.toType}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                toType: e.target.value as EmployeeType | '',
                contractEndDate: '',
              }))
            }
            className="humi-input"
            style={{ maxWidth: 300 }}
            aria-required="true"
            aria-label="ประเภทพนักงานใหม่"
          >
            <option value="">— เลือกประเภท —</option>
            {(Object.entries(EMPLOYEE_TYPE_LABELS) as [EmployeeType, string][]).map(
              ([val, label]) => (
                <option key={val} value={val} disabled={val === fromType}>
                  {label}
                </option>
              ),
            )}
          </select>
          {form.toType && form.toType === fromType && (
            <p className="text-small mt-1" style={{ color: 'var(--color-danger)' }} role="alert">
              ประเภทใหม่ต้องต่างจากปัจจุบัน
            </p>
          )}
        </div>

        {/* วันที่มีผล (required) */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="effectiveDate"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            วันที่มีผล{' '}
            <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            id="effectiveDate"
            type="date"
            value={form.effectiveDate}
            min={hireDateISO || undefined}
            onChange={(e) => setForm((f) => ({ ...f, effectiveDate: e.target.value }))}
            className="humi-input"
            style={{ maxWidth: 240 }}
            aria-required="true"
            aria-label="วันที่มีผลของการเปลี่ยนประเภทการจ้าง"
          />
          {hireDateISO && (
            <p className="text-small text-ink-muted mt-1">
              ต้องไม่ก่อน {formatDateTh(hireDateISO)}
            </p>
          )}
        </div>

        {/* รหัสเหตุผล (required) */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="reasonCode"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            รหัสเหตุผล{' '}
            <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <select
            id="reasonCode"
            value={form.reasonCode}
            onChange={(e) => setForm((f) => ({ ...f, reasonCode: e.target.value }))}
            className="humi-input"
            style={{ maxWidth: 360 }}
            aria-required="true"
            aria-label="รหัสเหตุผลการเปลี่ยนประเภทการจ้าง"
          >
            <option value="">— เลือกเหตุผล —</option>
            {REASON_CODES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* วันสิ้นสุดสัญญา (conditional: CONTRACT only) */}
        {form.toType === 'CONTRACT' && (
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="contractEndDate"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              วันสิ้นสุดสัญญา{' '}
              <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <input
              id="contractEndDate"
              type="date"
              value={form.contractEndDate}
              min={form.effectiveDate || undefined}
              onChange={(e) => setForm((f) => ({ ...f, contractEndDate: e.target.value }))}
              className="humi-input"
              style={{ maxWidth: 240 }}
              aria-required="true"
              aria-label="วันสิ้นสุดสัญญา"
            />
            {form.effectiveDate && (
              <p className="text-small text-ink-muted mt-1">
                ต้องหลังจาก {formatDateTh(form.effectiveDate)}
              </p>
            )}
            {form.contractEndDate && form.effectiveDate && form.contractEndDate <= form.effectiveDate && (
              <p className="text-small mt-1" style={{ color: 'var(--color-danger)' }} role="alert">
                วันสิ้นสุดสัญญาต้องหลังจากวันที่มีผล
              </p>
            )}
          </div>
        )}

        {/* Review cluster */}
        {transitionSummary && (
          <div
            style={{
              marginBottom: 20,
              padding: '12px 16px',
              borderRadius: 10,
              background: 'var(--color-accent-soft)',
              border: '1.5px solid var(--color-accent)',
            }}
          >
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>สรุปการเปลี่ยนแปลง</div>
            <div className="text-body font-semibold text-ink">{transitionSummary}</div>
            {form.effectiveDate && (
              <div className="text-small text-ink-muted mt-1">
                มีผลวันที่ {formatDateTh(form.effectiveDate)}
              </div>
            )}
          </div>
        )}

        {/* Validation error list */}
        {errors.length > 0 && (
          <ul style={{ marginBottom: 16, paddingLeft: 20 }} role="alert">
            {errors.map((e) => (
              <li key={e} className="text-small" style={{ color: 'var(--color-danger)' }}>
                {e}
              </li>
            ))}
          </ul>
        )}

        {/* Store error */}
        {submitError && (
          <p className="text-small mb-4" style={{ color: 'var(--color-danger)' }} role="alert">
            {submitError}
          </p>
        )}

        {/* Submit row */}
        <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10 }}>
          <Link
            href={`/${locale}/admin/employees/${empId}`}
            className="humi-btn humi-btn--ghost"
          >
            ยกเลิก
          </Link>
          <button
            onClick={handleSubmit}
            disabled={!isValid || submitted}
            className="humi-btn humi-btn--primary"
            aria-disabled={!isValid || submitted}
          >
            บันทึกการเปลี่ยนแปลง
          </button>
        </div>
      </div>
    </div>
  )
}
