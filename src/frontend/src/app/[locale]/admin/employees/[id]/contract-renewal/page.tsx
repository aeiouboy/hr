'use client'

// contract-renewal/page.tsx — ต่อสัญญาจ้าง (M3, BRD #93)
//
// Archetype B contextual lifecycle action — mirrors S4 Probation pattern.
// Template source: probation/page.tsx (same wizard structure, no wizard dep here)
//
// BRD #93: Contract Renewal + Contract auto-terminate Day-30 rule
//   - currentEndDate = stub as hire_date + 1 year (employment field not in MockEmployee schema)
//   - newEndDate must be > currentEndDate (required)
//   - renewalReason optional text
//   - newAllowanceAmount optional (THB), note shown when amount > 0
//   - Day-30 info banner: UI hint only — no auto-terminate job (BA validation pending — HR Expert May 1)
//
// /** BA validation pending — HR Expert May 1 */
//
// C1: touches only this file.
// C8: ContractRenewalEvent shape from @hrms/shared — no invented fields.

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { RefreshCcw } from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import type { MockEmployee } from '@/mocks/employees'
import type { ContractRenewalEvent } from '@hrms/shared/types/timeline'

// ─── Form state ──────────────────────────────────────────────────────────────

interface ContractRenewalForm {
  renewal: {
    currentEndDate: string            // read-only, derived from hire_date + 1 year
    newEndDate: string | null         // ISO, required — extended contract end
    renewalReason: string             // optional text
    newAllowanceAmount: string | null  // optional (THB)
    newAllowanceNote: string          // optional, shown when newAllowanceAmount > 0
  }
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function addYears(isoDate: string, years: number): string {
  const d = new Date(isoDate)
  d.setFullYear(d.getFullYear() + years)
  return d.toISOString().slice(0, 10)
}

function diffDays(from: string, to: string): number {
  return Math.round(
    (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60 * 24),
  )
}

function formatDateTh(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function formatDateShort(isoDate: string): string {
  // DD/MM/YYYY Thai locale for banner
  const [y, m, d] = isoDate.split('-')
  return `${d}/${m}/${y}`
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function calcTenure(hireDateStr: string): string {
  const hire = new Date(hireDateStr)
  const now = new Date()
  let years = now.getFullYear() - hire.getFullYear()
  let months = now.getMonth() - hire.getMonth()
  if (months < 0) { years -= 1; months += 12 }
  if (years === 0) return `${months} เดือน`
  if (months === 0) return `${years} ปี`
  return `${years} ปี ${months} เดือน`
}

// ─── Employee snapshot (readonly) ─────────────────────────────────────────────

function EmployeeSnapshot({ employee }: { employee: MockEmployee }) {
  const nameTh = `${employee.first_name_th} ${employee.last_name_th}`
  const nameEn = `${employee.first_name_en} ${employee.last_name_en}`
  const tenure = calcTenure(employee.hire_date)
  const hireDateFmt = formatDateTh(employee.hire_date)

  return (
    <div className="humi-card humi-card--cream">
      <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
        {employee.employee_id}
      </div>
      <div className="font-display text-[18px] font-semibold text-ink">{nameTh}</div>
      <div className="text-small text-ink-muted mb-3">{nameEn}</div>
      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        style={{ marginTop: 8 }}
      >
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>สถานะ</div>
          <div className="text-body font-medium text-ink">
            {employee.status === 'active' ? 'ทำงานอยู่' : 'ออกจากงาน'}
          </div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ประเภท</div>
          <div className="text-body font-medium text-ink">
            {employee.employee_class === 'PERMANENT' ? 'Permanent' : 'Part-time'}
          </div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่เริ่มงาน</div>
          <div className="text-body font-medium text-ink">{hireDateFmt}</div>
          <div className="text-small text-ink-muted">{tenure}</div>
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

export default function ContractRenewalPage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null

  // currentEndDate: stub as hire_date + 1 year.
  // NOTE: employment contract end-date is not in MockEmployee schema —
  // real implementation will read from contract record. (C8 — stub only)
  const currentEndDate = useMemo<string>(
    () => (employee ? addYears(employee.hire_date, 1) : ''),
    [employee],
  )

  // ── Local form state ─────────────────────────────────────────────────────
  const [newEndDate, setNewEndDate] = useState<string>('')
  const [renewalReason, setRenewalReason] = useState<string>('')
  const [newAllowanceAmount, setNewAllowanceAmount] = useState<string>('')
  const [newAllowanceNote, setNewAllowanceNote] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)

  // ── Seed timeline ────────────────────────────────────────────────────────
  const { append, seed } = useTimelines()
  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  // ── Derived: Day-30 warning ──────────────────────────────────────────────
  // /** BA validation pending — HR Expert May 1 */
  const today = todayIso()
  const daysUntilExpiry = currentEndDate ? diffDays(today, currentEndDate) : null
  const showDay30Banner =
    daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 30

  // ── Validation ───────────────────────────────────────────────────────────
  const newEndDateValid =
    !!newEndDate && !!currentEndDate && newEndDate > currentEndDate
  const isValid = newEndDateValid

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(() => {
    if (!employee || !isValid) return

    const event: ContractRenewalEvent = {
      id: `evt-contract-renewal-${Date.now()}`,
      employeeId: empId,
      kind: 'contract_renewal',
      // effectiveDate = renewal takes effect at old end-date (BRD #93 spec)
      effectiveDate: currentEndDate,
      recordedAt: new Date().toISOString(),
      actorUserId: 'admin-current',
      newEndDate: newEndDate,
      notes: renewalReason || undefined,
    }

    append(empId, event)
    // NOTE: useEmployees record is intentionally NOT updated here —
    // contract end-date is not a field in MockEmployee schema.
    // Real implementation will update contract record via API.

    setSubmitted(true)
    router.push(
      `/${locale}/admin/employees/${empId}?banner=${encodeURIComponent(
        `ต่อสัญญาแล้ว — สิ้นสุดสัญญาใหม่ ${formatDateShort(newEndDate)}`,
      )}`,
    )
  }, [employee, isValid, empId, currentEndDate, newEndDate, renewalReason, append, router, locale])

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

  const allowanceAmt = parseFloat(newAllowanceAmount)
  const showAllowanceNote = !isNaN(allowanceAmt) && allowanceAmt > 0

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
          <RefreshCcw size={18} aria-hidden />
        </div>
        <div>
          <div className="humi-eyebrow">การดำเนินการ</div>
          <h1 className="font-display text-[20px] font-semibold text-ink">
            ต่อสัญญาจ้าง
          </h1>
        </div>
      </div>

      {/* Employee snapshot */}
      <EmployeeSnapshot employee={employee} />

      {/* Day-30 info banner (UI hint only — no auto logic) */}
      {/* /** BA validation pending — HR Expert May 1 */ }
      {showDay30Banner && daysUntilExpiry !== null && (
        <div
          role="status"
          aria-live="polite"
          style={{
            padding: '12px 16px',
            borderRadius: 10,
            border: '1.5px solid var(--color-warning, #f59e0b)',
            background: 'var(--color-warning-soft, #fef3c7)',
            color: 'var(--color-ink)',
          }}
        >
          <span className="text-body font-semibold">ใกล้สิ้นสุดสัญญา</span>
          {' — '}
          <span className="text-body">
            ระบบจะ auto-terminate ใน{' '}
            <strong>{daysUntilExpiry}</strong> วัน หากไม่ต่อสัญญา
          </span>
        </div>
      )}

      {/* Contract renewal form */}
      <div className="humi-card">
        <div className="humi-eyebrow" style={{ marginBottom: 16 }}>
          รายละเอียดการต่อสัญญา
        </div>

        {/* วันสิ้นสุดสัญญาปัจจุบัน (read-only) */}
        <div style={{ marginBottom: 20 }}>
          <label
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            วันสิ้นสุดสัญญาปัจจุบัน
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
            aria-label="วันสิ้นสุดสัญญาปัจจุบัน"
          >
            {currentEndDate ? formatDateTh(currentEndDate) : '—'}
          </div>
          <p className="text-small text-ink-muted mt-1">
            (stub: วันที่เริ่มงาน + 1 ปี — รอข้อมูล contract จริง)
          </p>
        </div>

        <hr className="humi-divider" />

        {/* วันสิ้นสุดสัญญาใหม่ (required) */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="newEndDate"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            วันสิ้นสุดสัญญาใหม่{' '}
            <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            id="newEndDate"
            type="date"
            value={newEndDate}
            min={currentEndDate ? addYears(currentEndDate, 0).slice(0, 10) : undefined}
            onChange={(e) => setNewEndDate(e.target.value)}
            className="humi-input"
            aria-describedby="newEndDate-hint"
            style={{ maxWidth: 240 }}
            aria-required="true"
          />
          {currentEndDate && (
            <p id="newEndDate-hint" className="text-small text-ink-muted mt-1">
              ต้องหลังจาก {formatDateTh(currentEndDate)}
            </p>
          )}
          {newEndDate && !newEndDateValid && (
            <p className="text-small mt-1" style={{ color: 'var(--color-danger)' }} role="alert">
              วันสิ้นสุดสัญญาใหม่ต้องหลังจากสัญญาปัจจุบัน
            </p>
          )}
        </div>

        {/* เหตุผลการต่อสัญญา (optional) */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="renewalReason"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            เหตุผลการต่อสัญญา{' '}
            <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
          </label>
          <textarea
            id="renewalReason"
            value={renewalReason}
            onChange={(e) => setRenewalReason(e.target.value)}
            rows={3}
            placeholder="รายละเอียดเหตุผลการต่อสัญญา..."
            className="humi-input"
            style={{ width: '100%', resize: 'vertical' }}
            aria-label="เหตุผลการต่อสัญญา"
          />
        </div>

        {/* ค่าตอบแทนเพิ่มเติม (optional) */}
        <div style={{ marginBottom: showAllowanceNote ? 12 : 24 }}>
          <label
            htmlFor="newAllowanceAmount"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            ค่าตอบแทนเพิ่มเติม (THB){' '}
            <span className="text-small text-ink-muted">(ถ้ามี ตามสัญญา)</span>
          </label>
          <div className="humi-row" style={{ gap: 8, alignItems: 'center', maxWidth: 240 }}>
            <input
              id="newAllowanceAmount"
              type="number"
              min="0"
              step="100"
              value={newAllowanceAmount}
              onChange={(e) => {
                setNewAllowanceAmount(e.target.value)
                if (!e.target.value || parseFloat(e.target.value) <= 0) {
                  setNewAllowanceNote('')
                }
              }}
              placeholder="0"
              className="humi-input"
              style={{ flex: 1 }}
              aria-label="ค่าตอบแทนเพิ่มเติม (บาท)"
            />
            <span className="text-body text-ink-muted">บาท</span>
          </div>
        </div>

        {/* หมายเหตุค่าตอบแทน (conditional: shown when newAllowanceAmount > 0) */}
        {showAllowanceNote && (
          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="newAllowanceNote"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              หมายเหตุค่าตอบแทน{' '}
              <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
            </label>
            <textarea
              id="newAllowanceNote"
              value={newAllowanceNote}
              onChange={(e) => setNewAllowanceNote(e.target.value)}
              rows={2}
              placeholder="รายละเอียดค่าตอบแทนเพิ่มเติม..."
              className="humi-input"
              style={{ width: '100%', resize: 'vertical' }}
              aria-label="หมายเหตุค่าตอบแทนเพิ่มเติม"
            />
          </div>
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
            บันทึกการต่อสัญญา
          </button>
        </div>
      </div>
    </div>
  )
}
