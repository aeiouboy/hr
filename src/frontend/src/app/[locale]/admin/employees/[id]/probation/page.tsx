// VALIDATION_EXEMPT: B-action factory page — pre-submit gate via actionAvailability + ActionGuardBanner; Zod wire deferred to Sprint 2 lifecycleSchema audit (#47)
'use client'

// probation/page.tsx — ประเมินทดลองงาน (S4, Wave 2)
//
// Archetype B contextual action — first production consumer of createClusterWizard
// with employeeId + preloadedEmployee (D1 factory pattern).
//
// BRD #117: Pass / No Pass / Extend by Direct Manager
//   - effectiveDate min=hireDate, max=hireDate+119days
//   - Extend requires extendUntil > effectiveDate
//   - Optional allowance on Pass per contract
//   - No Pass → confirm dialog before commit (employee will be terminated)
//
// C1: touches only this file + ProbationForm.tsx (extracted for clarity).
// C8: ProbationEvent shape from @hrms/shared — no invented variants.

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ClipboardCheck } from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { createClusterWizard } from '@/lib/admin/wizard-template/createClusterWizard'
import { EffectiveDateGate } from '@/components/admin/EffectiveDateGate'
import { ActionGuardBanner } from '@/components/admin/ActionGuardBanner'
import { actionAvailability } from '@/lib/admin/actionAvailability'
import type { MockEmployee } from '@/mocks/employees'
import type { ProbationEvent } from '@hrms/shared/types/timeline'

// ─── Wizard config types ────────────────────────────────────────────────────

interface ProbationAssessment {
  outcome: 'pass' | 'no_pass' | 'extend' | null
  effectiveDate: string | null
  confirmDate: string | null
  note: string
  allowanceAmount: string | null
  extendUntil: string | null
}

interface ProbationForm {
  assessment: ProbationAssessment
}

const INITIAL_FORM: ProbationForm = {
  assessment: {
    outcome: null,
    effectiveDate: null,
    confirmDate: null,
    note: '',
    allowanceAmount: null,
    extendUntil: null,
  },
}

// ─── Date helpers ────────────────────────────────────────────────────────────

function addDays(isoDate: string, days: number): string {
  const d = new Date(isoDate)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
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

function formatDateTh(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// BRD #117: auto-pass at day 119 — days remaining from hireDate
function calcDaysRemaining(hireDateStr: string): number {
  if (!hireDateStr) return 0
  const hire = new Date(hireDateStr)
  hire.setDate(hire.getDate() + 119)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  hire.setHours(0, 0, 0, 0)
  return Math.max(0, Math.floor((hire.getTime() - today.getTime()) / 86_400_000))
}

// ─── Days-remaining banner ────────────────────────────────────────────────────

interface ProbationBannerProps { daysRemaining: number }

function ProbationBanner({ daysRemaining }: ProbationBannerProps) {
  // tier thresholds: 0 = past, ≤14 = danger, ≤29 = warning, ≥30 = muted
  let bg: string
  let border: string
  let color: string
  let text: string

  if (daysRemaining === 0) {
    bg = 'var(--color-accent-soft, #E8F4FE)'
    border = 'var(--color-accent, #3B82F6)'
    color = 'var(--color-accent, #1D4ED8)'
    text = 'ครบกำหนดแล้ว — auto-pass ของระบบจะทริกเกอร์ (รอ backend phase)'
  } else if (daysRemaining <= 14) {
    bg = '#FEF2F2'
    border = '#EF4444'
    color = '#B91C1C'
    text = `ใกล้ครบกำหนด (${daysRemaining} วัน) — โปรดประเมิน`
  } else if (daysRemaining <= 29) {
    bg = '#FFFBEB'
    border = '#F59E0B'
    color = '#92400E'
    text = `ใกล้ครบทดลองงาน: เหลือ ${daysRemaining} วัน`
  } else {
    bg = 'var(--color-hairline-soft, #F3F4F6)'
    border = 'var(--color-hairline, #D1D5DB)'
    color = 'var(--color-ink-muted, #6B7280)'
    text = `ช่วงทดลองงานเหลืออีก ${daysRemaining} วัน`
  }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        background: bg,
        border: `1.5px solid ${border}`,
        borderRadius: 10,
        padding: '10px 14px',
        marginBottom: 16,
        color,
      }}
      className="text-body font-medium"
    >
      {text}
    </div>
  )
}

// ─── Employee snapshot (readonly) ────────────────────────────────────────────

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

// ─── No-Pass confirm dialog ──────────────────────────────────────────────────

interface ConfirmNoPassDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmNoPassDialog({ open, onConfirm, onCancel }: ConfirmNoPassDialogProps) {
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
        style={{ maxWidth: 400, width: '100%', margin: 16 }}
      >
        <h2
          id="dialog-title"
          className="font-display text-[18px] font-semibold text-ink"
          style={{ marginBottom: 8 }}
        >
          ยืนยันการไม่ผ่านทดลองงาน?
        </h2>
        <p className="text-body text-ink-muted" style={{ marginBottom: 20 }}>
          พนักงานจะสิ้นสภาพหลังจากบันทึก การดำเนินการนี้ไม่สามารถย้อนกลับได้
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
            ยืนยัน ไม่ผ่าน
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function ProbationAssessPage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null

  // ── Factory: per-employee wizard instance (Archetype B, D1 first production reuse) ──
  // Memoized so factory is called once per empId — createClusterWizard creates a new
  // Zustand store internally so must NOT be called on every render.
  const probationWizard = useMemo(() => {
    if (!employee) return null
    return createClusterWizard<ProbationForm>({
      name: 'probation',
      storeKey: `probation-wizard-draft-${empId}`,
      initialFormData: INITIAL_FORM,
      clusterSteps: [
        { number: 1, labelTh: 'ประเมินทดลองงาน', labelEn: 'Probation Assessment' },
      ],
      validators: {
        1: (d) =>
          !!d.assessment.outcome &&
          !!d.assessment.effectiveDate &&
          (d.assessment.outcome !== 'extend' || !!d.assessment.extendUntil),
      },
      employeeId: empId,
      preloadedEmployee: {},
    })
  }, [empId, employee])

  const useStore = probationWizard?.useStore
  const formData = useStore?.((s) => s.formData) ?? INITIAL_FORM
  const setStepData = useStore?.((s) => s.setStepData)
  const reset = useStore?.((s) => s.reset)

  const assessment = formData.assessment

  // ── Derived date constraints per BRD #117 ───────────────────────────────
  const hireDate = employee?.hire_date ?? ''
  const maxEffectiveDate = hireDate ? addDays(hireDate, 119) : ''
  const daysRemaining = hireDate ? calcDaysRemaining(hireDate) : 0

  // ── Validation ───────────────────────────────────────────────────────────
  const isValid =
    !!assessment.outcome &&
    !!assessment.effectiveDate &&
    (assessment.outcome !== 'extend' || !!assessment.extendUntil)

  // ── State ────────────────────────────────────────────────────────────────
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [allowanceNote, setAllowanceNote] = useState<string | null>(null)

  // Seed timeline if not already seeded (S3 owns this)
  const { append, seed } = useTimelines()
  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  // ── Patch handler ────────────────────────────────────────────────────────
  const patch = useCallback(
    (partial: Partial<ProbationAssessment>) => {
      setStepData?.('assessment', partial)
    },
    [setStepData],
  )

  // ── Submit logic ─────────────────────────────────────────────────────────
  const doSubmit = useCallback(() => {
    if (!employee || !isValid) return

    const outcomeMap = {
      pass: 'pass' as const,
      no_pass: 'terminate_during_probation' as const,
      extend: 'extend' as const,
    }

    // confirmDate (HR payroll confirm) stored in notes until backend field added
    const noteParts: string[] = []
    if (assessment.note) noteParts.push(assessment.note)
    if (assessment.outcome === 'pass' && assessment.confirmDate) {
      noteParts.push(`[confirmDate:${assessment.confirmDate}]`)
    }

    const event: ProbationEvent = {
      id: `evt-prob-${Date.now()}`,
      employeeId: empId,
      kind: 'probation_assess',
      effectiveDate: assessment.effectiveDate!,
      recordedAt: new Date().toISOString(),
      actorUserId: 'admin-current',
      outcome: outcomeMap[assessment.outcome!],
      notes: noteParts.length > 0 ? noteParts.join('\n') : undefined,
    }

    append(empId, event)
    reset?.()

    // Allowance note (UI only — no API)
    const amt = parseFloat(assessment.allowanceAmount ?? '')
    if (assessment.outcome === 'pass' && !isNaN(amt) && amt > 0) {
      setAllowanceNote(`Allowance ${amt.toLocaleString('th-TH')} บาท จะถูกส่งไป Payroll`)
    }

    setSubmitted(true)
    // Navigate back with success banner
    router.push(
      `/${locale}/admin/employees/${empId}?banner=${encodeURIComponent('บันทึกการประเมินทดลองงานแล้ว')}`,
    )
  }, [employee, isValid, assessment, empId, append, reset, router, locale])

  const handleSubmit = useCallback(() => {
    if (!isValid) return
    if (assessment.outcome === 'no_pass') {
      setShowConfirmDialog(true)
    } else {
      doSubmit()
    }
  }, [isValid, assessment.outcome, doSubmit])

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

  // Defense-in-depth (P3) — block if status disallows
  const guard = actionAvailability(employee).probation
  if (!guard.ok) {
    return (
      <ActionGuardBanner
        actionKey="probation"
        reason={guard.reason ?? ''}
        backHref={`/${locale}/admin/employees/${empId}`}
        actionLabel="ประเมินทดลองงาน"
      />
    )
  }

  return (
    <>
      <ConfirmNoPassDialog
        open={showConfirmDialog}
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
              background: 'var(--color-accent-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, color: 'var(--color-accent)',
            }}
          >
            <ClipboardCheck size={18} aria-hidden />
          </div>
          <div>
            <div className="humi-eyebrow">การดำเนินการ</div>
            <h1 className="font-display text-[20px] font-semibold text-ink">
              ประเมินทดลองงาน
            </h1>
          </div>
        </div>

        {/* Employee snapshot */}
        <EmployeeSnapshot employee={employee} />

        {/* Assessment form */}
        <EffectiveDateGate
          min={hireDate || undefined}
          max={maxEffectiveDate || undefined}
          initialEffectiveDate={assessment.effectiveDate ?? undefined}
          onEffectiveDateChange={(date) => patch({ effectiveDate: date })}
        >
          {() => (
        <div className="humi-card">
          {/* ── BRD #117: backend auto-pass placeholder ──
              Cron auto-pass + email scheduler are backend concerns (Sprint 2).
              This banner keeps the UI honest about what's not yet implemented. */}
          <div
            role="note"
            style={{
              background: 'var(--color-canvas-soft, #F9FAFB)',
              border: '1.5px solid var(--color-hairline, #D1D5DB)',
              borderRadius: 8,
              padding: '8px 12px',
              marginBottom: 12,
            }}
            className="text-small text-ink-muted"
          >
            auto-pass จะทริกเกอร์โดย backend (Sprint 2) — ฟีเจอร์นี้ยังไม่พร้อมใช้งานบน frontend
          </div>

          {/* ── Days-remaining banner (BRD #117) ── */}
          <ProbationBanner daysRemaining={daysRemaining} />

          <div className="humi-eyebrow" style={{ marginBottom: 16 }}>
            บันทึกผลการประเมิน
          </div>

          {/* ── Outcome radio ── */}
          <div style={{ marginBottom: 20 }}>
            <label className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 8 }}>
              ผลการประเมิน <span style={{ color: 'var(--color-danger)' }}>*</span>
            </label>
            <div
              role="radiogroup"
              aria-label="ผลการประเมินทดลองงาน"
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              {(
                [
                  { value: 'pass', label: 'ผ่านทดลองงาน' },
                  { value: 'no_pass', label: 'ไม่ผ่าน' },
                  { value: 'extend', label: 'ขยายเวลาทดลองงาน' },
                ] as const
              ).map(({ value, label }) => (
                <label
                  key={value}
                  className="humi-row"
                  style={{
                    gap: 10, cursor: 'pointer', padding: '10px 14px',
                    borderRadius: 10,
                    border: `1.5px solid ${assessment.outcome === value
                      ? 'var(--color-accent)'
                      : 'var(--color-hairline-soft)'}`,
                    background: assessment.outcome === value
                      ? 'var(--color-accent-soft)'
                      : 'transparent',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}
                >
                  <input
                    type="radio"
                    name="outcome"
                    value={value}
                    checked={assessment.outcome === value}
                    onChange={() => patch({ outcome: value, allowanceAmount: null, extendUntil: null })}
                    style={{ accentColor: 'var(--color-accent)' }}
                    aria-label={label}
                  />
                  <span className="text-body text-ink">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <hr className="humi-divider" />

          {/* ── Extend Until (conditional) ── */}
          {assessment.outcome === 'extend' && (
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="extendUntil"
                className="text-body font-semibold text-ink"
                style={{ display: 'block', marginBottom: 6 }}
              >
                ขยายถึงวันที่ <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <input
                id="extendUntil"
                type="date"
                value={assessment.extendUntil ?? ''}
                min={assessment.effectiveDate ?? hireDate}
                onChange={(e) => patch({ extendUntil: e.target.value || null })}
                className="humi-input"
                style={{ maxWidth: 240 }}
                aria-label="วันสิ้นสุดการขยายเวลาทดลองงาน"
              />
              {assessment.effectiveDate && (
                <p className="text-small text-ink-muted mt-1">
                  ต้องหลังจาก {formatDateTh(assessment.effectiveDate)}
                </p>
              )}
            </div>
          )}

          {/* ── Allowance Amount (shown when outcome=pass) ── */}
          {assessment.outcome === 'pass' && (
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="allowanceAmount"
                className="text-body font-semibold text-ink"
                style={{ display: 'block', marginBottom: 6 }}
              >
                จำนวน Allowance <span className="text-small text-ink-muted">(ถ้ามี ตามสัญญา)</span>
              </label>
              <div className="humi-row" style={{ gap: 8, alignItems: 'center', maxWidth: 240 }}>
                <input
                  id="allowanceAmount"
                  type="number"
                  min="0"
                  step="100"
                  value={assessment.allowanceAmount ?? ''}
                  onChange={(e) => patch({ allowanceAmount: e.target.value || null })}
                  placeholder="0"
                  className="humi-input"
                  style={{ flex: 1 }}
                  aria-label="จำนวน Allowance (บาท)"
                />
                <span className="text-body text-ink-muted">บาท</span>
              </div>
              {assessment.allowanceAmount && parseFloat(assessment.allowanceAmount) > 0 && (
                <p className="text-small text-ink-muted mt-1" role="status">
                  Allowance {parseFloat(assessment.allowanceAmount).toLocaleString('th-TH')} บาท จะถูกส่งไป Payroll
                </p>
              )}
            </div>
          )}

          {/* ── Confirm Date for Payroll (A5 — only when outcome=pass) ── */}
          {assessment.outcome === 'pass' && (
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="confirmDate"
                className="text-body font-semibold text-ink"
                style={{ display: 'block', marginBottom: 6 }}
              >
                วันที่ยืนยัน (HR){' '}
                <span className="text-small text-ink-muted">(ไม่บังคับ)</span>
              </label>
              <input
                id="confirmDate"
                type="date"
                value={assessment.confirmDate ?? ''}
                onChange={(e) => patch({ confirmDate: e.target.value || null })}
                className="humi-input"
                style={{ maxWidth: 240 }}
                aria-label="วันที่ยืนยันสำหรับ Payroll"
              />
              <p className="text-small text-ink-muted mt-1">
                วันที่ยืนยันสำหรับ Payroll (ไม่บังคับ — กรอกเมื่อ HR พร้อมอนุมัติ)
              </p>
            </div>
          )}

          {/* ── Note textarea ── */}
          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="note"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              หมายเหตุ <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
            </label>
            <textarea
              id="note"
              value={assessment.note}
              onChange={(e) => patch({ note: e.target.value })}
              rows={3}
              placeholder="รายละเอียดเพิ่มเติม..."
              className="humi-input"
              style={{ width: '100%', resize: 'vertical' }}
              aria-label="หมายเหตุการประเมิน"
            />
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
              className="humi-btn humi-btn--primary"
              aria-disabled={!isValid || submitted}
            >
              บันทึกผลการประเมิน
            </button>
          </div>
        </div>
          )}
        </EffectiveDateGate>
      </div>
    </>
  )
}
