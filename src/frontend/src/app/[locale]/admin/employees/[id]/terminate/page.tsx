'use client'

// terminate/page.tsx — สิ้นสุดสภาพพนักงาน (M2, BRD #111-115)
//
// Archetype B contextual action — mirrors probation/page.tsx (S4 pattern).
// Single-cluster wizard via createClusterWizard factory (D1 reuse).
//
// BRD #111: Submit stub only — real 5-step approval chain (Employee→Manager→HRBP→SPD)
//   deferred to Phase 2.5 backend. UI records intent and updates local state.
// BRD #111: 50ทวิ auto-gen — deferred to Phase 2.5 backend. Note only.
// BRD #113: Role-based reason visibility — Phase 2.5+ RBAC. Stub shows all 5 codes.
//
// C1: touches only this file (placeholder replaced).
// C8: TerminateEvent shape from @hrms/shared — no invented variants.

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, UserX } from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { createClusterWizard } from '@/lib/admin/wizard-template/createClusterWizard'
import { EffectiveDateGate } from '@/components/admin/EffectiveDateGate'
import type { MockEmployee } from '@/mocks/employees'
import type { TerminateEvent } from '@hrms/shared/types/timeline'

// ─── Picklist stub (BRD #113: role-based visibility deferred Phase 2.5+) ────

/**
 * Stub picklist — 5 reason codes with Thai labels.
 * Real picklist integration deferred; role-based visibility deferred to Phase 2.5+ RBAC.
 * BA validation pending — BRD #111 approval chain Employee→Manager→HRBP→SPD
 * deferred to Phase 2.5 backend.
 */
const TERMINATION_REASONS = [
  { code: 'RESIGN',        labelTh: 'ลาออก' },
  { code: 'RETIRE',        labelTh: 'เกษียณอายุ' },
  { code: 'LAYOFF',        labelTh: 'เลิกจ้าง/ปรับโครงสร้าง' },
  { code: 'MISCONDUCT',    labelTh: 'ผิดวินัยร้ายแรง' },
  { code: 'CONTRACT_END',  labelTh: 'สัญญาจ้างสิ้นสุด' },
] as const

// ─── Form shape ───────────────────────────────────────────────────────────────

interface TerminationData {
  reasonCode: string
  reasonNote: string
  lastDay: string | null
  payrollEffectiveDate: string | null
  /** Yes/No per BRD OK_to_Rehire field — null = unset (invalid) */
  okToRehire: boolean | null
  /** Text placeholder — real attachment upload deferred to Phase 2.5+ */
  attachmentNote: string
}

interface TerminateForm {
  termination: TerminationData
}

const INITIAL_FORM: TerminateForm = {
  termination: {
    reasonCode: '',
    reasonNote: '',
    lastDay: null,
    payrollEffectiveDate: null,
    okToRehire: null,
    attachmentNote: '',
  },
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function formatDateTh(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
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
  const classFmt = employee.status === 'active' ? 'ทำงานอยู่' : 'ออกจากงาน'

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
          <div className="text-body font-medium text-ink">{classFmt}</div>
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

// ─── Confirm terminate dialog ─────────────────────────────────────────────────

interface ConfirmTerminateDialogProps {
  open: boolean
  empId: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmTerminateDialog({
  open, empId, onConfirm, onCancel,
}: ConfirmTerminateDialogProps) {
  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.35)',
      }}
    >
      <div
        className="humi-card"
        style={{ maxWidth: 420, width: '100%', margin: 16 }}
      >
        <h2
          id="dialog-title"
          className="font-display text-[18px] font-semibold text-ink"
          style={{ marginBottom: 8 }}
        >
          ยืนยันการสิ้นสุดสภาพพนักงาน?
        </h2>
        <p className="text-body text-ink-muted" style={{ marginBottom: 8 }}>
          ยืนยันการสิ้นสุดสภาพพนักงาน <strong className="text-ink">{empId}</strong>?
        </p>
        <p className="text-small text-ink-muted" style={{ marginBottom: 20 }}>
          การดำเนินการนี้ไม่สามารถย้อนกลับได้
        </p>
        <div className="humi-row" style={{ gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            className="humi-btn humi-btn--ghost"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="humi-btn humi-btn--danger"
          >
            ยืนยัน บันทึกการสิ้นสุดสภาพ
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TerminatePage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null
  const updateEmployee = useEmployees((s) => s.updateEmployee)

  // ── Factory: per-employee wizard instance (Archetype B, D1 reuse) ─────────
  // Memoized — createClusterWizard creates a Zustand store internally;
  // must NOT be called on every render.
  const terminateWizard = useMemo(() => {
    if (!employee) return null
    return createClusterWizard<TerminateForm>({
      name: 'terminate',
      storeKey: `terminate-wizard-draft-${empId}`,
      initialFormData: INITIAL_FORM,
      clusterSteps: [
        { number: 1, labelTh: 'สิ้นสุดสภาพพนักงาน', labelEn: 'Termination' },
      ],
      validators: {
        1: (d) =>
          !!d.termination.reasonCode &&
          !!d.termination.lastDay &&
          !!d.termination.payrollEffectiveDate &&
          d.termination.okToRehire !== null,
      },
      employeeId: empId,
      preloadedEmployee: {},
    })
  }, [empId, employee])

  const useStore = terminateWizard?.useStore
  const formData = useStore?.((s) => s.formData) ?? INITIAL_FORM
  const setStepData = useStore?.((s) => s.setStepData)
  const reset = useStore?.((s) => s.reset)

  const termination = formData.termination
  const today = todayISO()

  // ── Validation ─────────────────────────────────────────────────────────────
  /**
   * BA validation pending — BRD #111 approval chain Employee→Manager→HRBP→SPD
   * deferred to Phase 2.5 backend.
   *
   * Client-side guards:
   *   - reasonCode: required
   *   - lastDay: required, >= today (and >= hireDate as fallback)
   *   - payrollEffectiveDate: required, >= lastDay
   *   - okToRehire: required (true/false, not null)
   */
  const hireDate = employee?.hire_date ?? today
  const lastDayMin = hireDate > today ? hireDate : today

  const lastDayValid =
    !!termination.lastDay && termination.lastDay >= lastDayMin

  const payrollValid =
    !!termination.payrollEffectiveDate &&
    !!termination.lastDay &&
    termination.payrollEffectiveDate >= termination.lastDay

  const isValid =
    !!termination.reasonCode &&
    lastDayValid &&
    payrollValid &&
    termination.okToRehire !== null

  // ── State ──────────────────────────────────────────────────────────────────
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Seed timeline if not already seeded
  const { append, seed } = useTimelines()
  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  // ── Patch handler ──────────────────────────────────────────────────────────
  const patch = useCallback(
    (partial: Partial<TerminationData>) => {
      setStepData?.('termination', partial)
    },
    [setStepData],
  )

  // Auto-fill payrollEffectiveDate = lastDay when lastDay changes (editable)
  const handleLastDayChange = useCallback(
    (value: string) => {
      patch({
        lastDay: value || null,
        // Only auto-fill if payroll date not yet set or was equal to previous lastDay
        payrollEffectiveDate: value || null,
      })
    },
    [patch],
  )

  // ── Submit logic ───────────────────────────────────────────────────────────
  const doSubmit = useCallback(() => {
    if (!employee || !isValid) return

    const event: TerminateEvent = {
      id: `evt-term-${Date.now()}`,
      employeeId: empId,
      kind: 'terminate',
      effectiveDate: termination.lastDay!,
      recordedAt: new Date().toISOString(),
      actorUserId: 'admin-current',
      reasonCode: termination.reasonCode,
      lastDay: termination.lastDay!,
      okToRehire: termination.okToRehire === true,
      notes: termination.reasonNote || undefined,
    }

    append(empId, event)

    // Update employee status to terminated
    // Phase 2.5+: real status transition goes through backend approval chain (BRD #111)
    updateEmployee(empId, { status: 'terminated' })

    reset?.()
    setSubmitted(true)

    router.push(
      `/${locale}/admin/employees/${empId}?banner=${encodeURIComponent('บันทึกการสิ้นสุดสภาพพนักงานแล้ว — ส่งข้อมูลไป Payroll')}`,
    )
  }, [employee, isValid, termination, empId, append, updateEmployee, reset, router, locale])

  const handleSubmit = useCallback(() => {
    if (!isValid) return
    setShowConfirmDialog(true)
  }, [isValid])

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!employee) {
    return (
      <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
        <div className="humi-card" style={{ textAlign: 'center', padding: 40 }}>
          <p className="text-body text-ink-muted">ไม่พบพนักงานรหัส &ldquo;{empId}&rdquo;</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <ConfirmTerminateDialog
        open={showConfirmDialog}
        empId={employee.employee_id}
        onConfirm={() => { setShowConfirmDialog(false); doSubmit() }}
        onCancel={() => setShowConfirmDialog(false)}
      />

      <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Back nav */}
        <div>
          <Link
            href={`/${locale}/admin/employees/${empId}`}
            className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
            style={{ display: 'inline-flex', gap: 6 }}
          >
            <ArrowLeft size={16} aria-hidden />
            <span>กลับไปหน้าข้อมูลพนักงาน</span>
          </Link>
        </div>

        {/* Page title */}
        <div className="humi-row" style={{ gap: 10, alignItems: 'center' }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--color-danger-soft, #FEE2E2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, color: 'var(--color-danger)',
            }}
          >
            <UserX size={18} aria-hidden />
          </div>
          <div>
            <div className="humi-eyebrow">การดำเนินการ</div>
            <h1 className="font-display text-[20px] font-semibold text-ink">
              สิ้นสุดสภาพพนักงาน
            </h1>
          </div>
        </div>

        {/* Employee snapshot */}
        <EmployeeSnapshot employee={employee} />

        {/* Terminate form */}
        <EffectiveDateGate
          min={hireDate !== today ? hireDate : undefined}
          initialEffectiveDate={termination.lastDay ?? undefined}
          onEffectiveDateChange={(date) => handleLastDayChange(date)}
          label="วันสุดท้ายที่ทำงาน"
        >
          {() => (
        <div className="humi-card">
          <div className="humi-eyebrow" style={{ marginBottom: 16 }}>
            บันทึกการสิ้นสุดการจ้างงาน
          </div>

          {/* ── Reason code picklist ── */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="reasonCode"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              สาเหตุการลาออก <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <select
              id="reasonCode"
              value={termination.reasonCode}
              onChange={(e) => patch({ reasonCode: e.target.value })}
              className="humi-input"
              style={{ maxWidth: 360 }}
              aria-required="true"
            >
              <option value="">— เลือกสาเหตุ —</option>
              {TERMINATION_REASONS.map(({ code, labelTh }) => (
                <option key={code} value={code}>{labelTh}</option>
              ))}
            </select>
          </div>

          {/* ── Reason note textarea ── */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="reasonNote"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              รายละเอียดเพิ่มเติม{' '}
              <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
            </label>
            <textarea
              id="reasonNote"
              value={termination.reasonNote}
              onChange={(e) => patch({ reasonNote: e.target.value })}
              rows={3}
              placeholder="อธิบายเหตุผลเพิ่มเติม..."
              className="humi-input"
              style={{ width: '100%', resize: 'vertical' }}
              aria-label="รายละเอียดเพิ่มเติมเกี่ยวกับสาเหตุ"
            />
          </div>

          <hr className="humi-divider" />

          {/* ── Payroll effective date ── */}
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="payrollEffectiveDate"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              วันที่มีผล Payroll <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <input
              id="payrollEffectiveDate"
              type="date"
              value={termination.payrollEffectiveDate ?? ''}
              min={termination.lastDay ?? lastDayMin}
              onChange={(e) => patch({ payrollEffectiveDate: e.target.value || null })}
              className="humi-input"
              style={{ maxWidth: 240 }}
              aria-required="true"
              aria-describedby="payroll-hint"
            />
            <p id="payroll-hint" className="text-small text-ink-muted mt-1">
              ปกติเท่ากับวันสุดท้ายที่ทำงาน — แก้ไขได้หากจำเป็น
            </p>
            {termination.lastDay && termination.payrollEffectiveDate &&
              termination.payrollEffectiveDate < termination.lastDay && (
              <p className="text-small mt-1" style={{ color: 'var(--color-danger)' }} role="alert">
                วันที่มีผล Payroll ต้องไม่ก่อนวันสุดท้ายที่ทำงาน
              </p>
            )}
          </div>

          <hr className="humi-divider" />

          {/* ── OK to rehire (radio) — Plan §4 exact field ── */}
          <div style={{ marginBottom: 20 }}>
            <fieldset>
              <legend className="text-body font-semibold text-ink" style={{ marginBottom: 8 }}>
                อนุญาตให้จ้างซ้ำในอนาคต?{' '}
                <span style={{ color: 'var(--color-danger)' }}>*</span>
              </legend>
              <div
                role="radiogroup"
                aria-label="อนุญาตให้จ้างซ้ำในอนาคต"
                style={{ display: 'flex', gap: 12 }}
              >
                {([
                  { value: true,  label: 'ใช่' },
                  { value: false, label: 'ไม่ใช่' },
                ] as const).map(({ value, label }) => (
                  <label
                    key={String(value)}
                    className="humi-row"
                    style={{
                      gap: 8, cursor: 'pointer', padding: '10px 16px',
                      borderRadius: 10,
                      border: `1.5px solid ${termination.okToRehire === value
                        ? 'var(--color-accent)'
                        : 'var(--color-hairline-soft)'}`,
                      background: termination.okToRehire === value
                        ? 'var(--color-accent-soft)'
                        : 'transparent',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                  >
                    <input
                      type="radio"
                      name="okToRehire"
                      value={String(value)}
                      checked={termination.okToRehire === value}
                      onChange={() => patch({ okToRehire: value })}
                      style={{ accentColor: 'var(--color-accent)' }}
                      aria-label={label}
                    />
                    <span className="text-body text-ink">{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <hr className="humi-divider" />

          {/* ── Attachment placeholder (Phase 2.5+ real upload) ── */}
          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="attachmentNote"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              แนบเอกสาร{' '}
              <span className="text-small text-ink-muted">(เช่น Resignation Letter)</span>
            </label>
            <input
              id="attachmentNote"
              type="text"
              value={termination.attachmentNote}
              onChange={(e) => patch({ attachmentNote: e.target.value })}
              placeholder="ระบุชื่อเอกสาร หรือ link (การแนบไฟล์จริงจะเปิดใช้งานใน Phase 2.5+)"
              className="humi-input"
              style={{ width: '100%', maxWidth: 480 }}
              aria-label="บันทึกชื่อเอกสารแนบ"
              aria-describedby="attachment-hint"
            />
            <p id="attachment-hint" className="text-small text-ink-muted mt-1">
              Phase 2.5+: อัปโหลดไฟล์จริงจะเปิดใช้งานในรุ่นถัดไป
            </p>
          </div>

          {/* ── Submit button ── */}
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
              className="humi-btn humi-btn--danger"
              aria-disabled={!isValid || submitted}
            >
              บันทึกการสิ้นสุดสภาพ
            </button>
          </div>
        </div>
          )}
        </EffectiveDateGate>
      </div>
    </>
  )
}
