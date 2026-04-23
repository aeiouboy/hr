'use client'

// promotion/page.tsx — เลื่อนตำแหน่งพนักงาน (CNeXt #04 Employee Movement → Promotion)
//
// BRD Process #04: Promotion = JG up + optional pay change (event code PRM_PRM)
//   - newJG required, must > currentJG
//   - effectiveDate required, min=hire_date
//   - reasonCode required (PRCHG_PRM / PRCHG_ADJPOS / PRCHG_MERIT)
//   - newPositionTitle optional (free text)
//   - salaryChangePct optional (numeric %)
//   - 180-day cooldown between promotions (lifecycle-validator E3)
//
// Archetype B — contextual action: employee snapshot (readonly) + promotion form
// Wave 1 branch (humi/profile-edit-e2e): no PositionLookup → free-text input
//
// C1: touches only this file + entry point in [id]/page.tsx
// C8: PromotionEvent shape from @hrms/shared — no invented fields

import { useEffect, useMemo, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { EffectiveDateGate } from '@/components/admin/EffectiveDateGate'
import type { MockEmployee } from '@/mocks/employees'
import type { PromotionEvent } from '@hrms/shared/types/timeline'

// ─── Constants ───────────────────────────────────────────────────────────────

/** JG ordering — promotion requires to > from */
export const JG_ORDER: Record<string, number> = {
  'JG-02': 2,
  'JG-04': 4,
  'JG-06': 6,
  'JG-08': 8,
  'JG-10': 10,
}

export const JG_OPTIONS = ['JG-02', 'JG-04', 'JG-06', 'JG-08', 'JG-10'] as const

export const MIN_DAYS_BETWEEN_PROMOTIONS = 180

const PROMOTION_REASON_OPTIONS = [
  { id: 'PRCHG_PRM',    labelTh: 'เลื่อนตำแหน่งตามผลงาน' },
  { id: 'PRCHG_ADJPOS', labelTh: 'ปรับตำแหน่งตามโครงสร้าง' },
  { id: 'PRCHG_MERIT',  labelTh: 'เลื่อนขั้นตามคุณสมบัติ' },
] as const

// ─── Pure validation helpers (exported for tests) ────────────────────────────

/** toJG must be strictly higher order than fromJG */
export function isHigherGrade(fromJG: string, toJG: string): boolean {
  const from = JG_ORDER[fromJG] ?? 0
  const to = JG_ORDER[toJG] ?? 0
  return to > from
}

/** effectiveDate must be >= 180 days after the last promotion event */
export function isWithin180Days(lastPromotionDate: string, effectiveDate: string): boolean {
  const last = new Date(lastPromotionDate).getTime()
  const eff = new Date(effectiveDate).getTime()
  return (eff - last) / 86_400_000 < MIN_DAYS_BETWEEN_PROMOTIONS
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" style={{ marginTop: 8 }}>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>บริษัท</div>
          <div className="text-body font-medium text-ink">{employee.company}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ตำแหน่งปัจจุบัน</div>
          <div className="text-body font-medium text-ink">{employee.position_title}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>Job Grade ปัจจุบัน</div>
          <div className="text-body font-medium text-ink">{employee.job_grade}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่เริ่มงาน</div>
          <div className="text-body font-medium text-ink">{hireDateFmt}</div>
          <div className="text-small text-ink-muted">{tenure}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Review cluster ────────────────────────────────────────────────────────────

interface ReviewClusterProps {
  currentJG: string
  currentPosition: string
  newJG: string
  newPositionTitle: string
  reasonCode: string
  salaryChangePct: string
  effectiveDate: string
}

function ReviewCluster({
  currentJG,
  currentPosition,
  newJG,
  newPositionTitle,
  reasonCode,
  salaryChangePct,
  effectiveDate,
}: ReviewClusterProps) {
  const reasonLabel =
    PROMOTION_REASON_OPTIONS.find((r) => r.id === reasonCode)?.labelTh ?? reasonCode

  return (
    <div className="humi-card" style={{ background: 'var(--color-accent-soft)' }}>
      <div className="humi-eyebrow" style={{ marginBottom: 14 }}>สรุปการเลื่อนตำแหน่ง</div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>Job Grade</div>
          <div className="text-body text-ink-muted line-through">{currentJG}</div>
          <div className="text-body font-semibold text-ink">{newJG}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ตำแหน่ง</div>
          <div className="text-body text-ink-muted line-through">{currentPosition}</div>
          <div className="text-body font-semibold text-ink">
            {newPositionTitle || currentPosition}
          </div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่มีผล</div>
          <div className="text-body font-semibold text-ink">{formatDateTh(effectiveDate)}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>เหตุผล</div>
          <div className="text-body font-semibold text-ink">{reasonLabel}</div>
        </div>
        {salaryChangePct && (
          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ปรับเงินเดือน</div>
            <div className="text-body font-semibold text-ink">+{salaryChangePct}%</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PromotionPage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null

  const { append, seed } = useTimelines()
  const byEmployee = useTimelines((s) => s.byEmployee)
  const events = useMemo(() => byEmployee[empId] ?? [], [byEmployee, empId])

  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  const lastPromotion = useMemo(
    () =>
      [...events]
        .filter((e) => e.kind === 'promotion')
        .sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())[0],
    [events],
  )

  const [newJG, setNewJG] = useState('')
  const [reasonCode, setReasonCode] = useState('')
  const [newPositionTitle, setNewPositionTitle] = useState('')
  const [salaryChangePct, setSalaryChangePct] = useState('')
  const [effectiveDate, setEffectiveDate] = useState<string | null>(null)
  const [showReview, setShowReview] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [validationError, setValidationError] = useState('')

  const isJGValid = !!newJG && !!employee && isHigherGrade(employee.job_grade, newJG)

  const is180DayViolation = useMemo(() => {
    if (!lastPromotion || !effectiveDate) return false
    return isWithin180Days(lastPromotion.effectiveDate, effectiveDate)
  }, [lastPromotion, effectiveDate])

  const isFormValid = isJGValid && !!reasonCode && !!effectiveDate && !is180DayViolation

  const handleReviewClick = useCallback(() => {
    if (!isFormValid) {
      if (!isJGValid && newJG) {
        setValidationError('Job Grade ใหม่ต้องสูงกว่า Grade ปัจจุบัน')
      } else if (is180DayViolation) {
        setValidationError('ไม่สามารถเลื่อนตำแหน่งได้ภายใน 180 วันหลังการเลื่อนตำแหน่งครั้งล่าสุด')
      } else {
        setValidationError('กรุณากรอกข้อมูลให้ครบถ้วน')
      }
      return
    }
    setValidationError('')
    setShowReview(true)
  }, [isFormValid, isJGValid, newJG, is180DayViolation])

  const doSubmit = useCallback(() => {
    if (!employee || !isFormValid || !effectiveDate) return
    const pct = salaryChangePct ? parseFloat(salaryChangePct) : undefined
    const event: PromotionEvent = {
      id: `evt-prm-${Date.now()}`,
      employeeId: empId,
      kind: 'promotion',
      effectiveDate,
      recordedAt: new Date().toISOString(),
      actorUserId: 'admin-current',
      fromTitle: `${employee.position_title} (${employee.job_grade})`,
      toTitle: `${newPositionTitle || employee.position_title} (${newJG})`,
      salaryChangePct: pct,
      notes: PROMOTION_REASON_OPTIONS.find((r) => r.id === reasonCode)?.labelTh,
    }
    append(empId, event)
    useEmployees.getState().updateEmployee(empId, {
      job_grade: newJG,
      ...(newPositionTitle ? { position_title: newPositionTitle } : {}),
    })
    setSubmitted(true)
    router.push(
      `/${locale}/admin/employees/${empId}?banner=${encodeURIComponent('บันทึกการเลื่อนตำแหน่งเรียบร้อยแล้ว')}`,
    )
  }, [employee, isFormValid, effectiveDate, salaryChangePct, empId, newJG, newPositionTitle, reasonCode, append, router, locale])

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
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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

      <div className="humi-row" style={{ gap: 10, alignItems: 'center' }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--color-accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, color: 'var(--color-accent)',
          }}
        >
          <TrendingUp size={18} aria-hidden />
        </div>
        <div>
          <div className="humi-eyebrow">การดำเนินการ</div>
          <h1 className="font-display text-[20px] font-semibold text-ink">เลื่อนตำแหน่ง</h1>
        </div>
      </div>

      <EmployeeSnapshot employee={employee} />

      {is180DayViolation && effectiveDate && (
        <div
          role="alert"
          style={{
            background: 'var(--color-danger-soft, #FEE2E2)',
            borderLeft: '3px solid var(--color-danger, #EF4444)',
            borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#7F1D1D',
          }}
        >
          ไม่สามารถเลื่อนตำแหน่งได้ — ต้องเว้น 180 วันนับจากการเลื่อนตำแหน่งครั้งล่าสุด
          ({lastPromotion && formatDateTh(lastPromotion.effectiveDate)})
        </div>
      )}

      <EffectiveDateGate
        min={employee.hire_date || undefined}
        initialEffectiveDate={effectiveDate ?? undefined}
        onEffectiveDateChange={(date) => { setEffectiveDate(date); setShowReview(false) }}
      >
        {() => (
          <div className="humi-card">
            <div className="humi-eyebrow" style={{ marginBottom: 16 }}>ข้อมูลการเลื่อนตำแหน่ง</div>

            <div style={{ marginBottom: 20 }}>
              <label htmlFor="newJG" className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 6 }}>
                Job Grade ใหม่ <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <select
                id="newJG"
                value={newJG}
                onChange={(e) => { setNewJG(e.target.value); setShowReview(false) }}
                className="humi-input"
                style={{ maxWidth: 240 }}
                aria-label="เลือก Job Grade ใหม่"
              >
                <option value="">— เลือก Job Grade —</option>
                {JG_OPTIONS.filter((jg) => isHigherGrade(employee.job_grade, jg)).map((jg) => (
                  <option key={jg} value={jg}>{jg}</option>
                ))}
              </select>
              <p className="text-small text-ink-muted mt-1">Grade ปัจจุบัน: {employee.job_grade}</p>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label htmlFor="reasonCode" className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 6 }}>
                เหตุผล <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <select
                id="reasonCode"
                value={reasonCode}
                onChange={(e) => { setReasonCode(e.target.value); setShowReview(false) }}
                className="humi-input"
                style={{ maxWidth: 400 }}
                aria-label="เลือกเหตุผลการเลื่อนตำแหน่ง"
              >
                <option value="">— เลือกเหตุผล —</option>
                {PROMOTION_REASON_OPTIONS.map((r) => (
                  <option key={r.id} value={r.id}>{r.labelTh}</option>
                ))}
              </select>
            </div>

            <hr className="humi-divider" />

            <div style={{ marginBottom: 20 }}>
              <label htmlFor="newPositionTitle" className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 6 }}>
                ตำแหน่งใหม่ <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
              </label>
              <input
                id="newPositionTitle"
                type="text"
                value={newPositionTitle}
                onChange={(e) => { setNewPositionTitle(e.target.value); setShowReview(false) }}
                placeholder="เช่น ผู้จัดการอาวุโส (เว้นว่างหากตำแหน่งไม่เปลี่ยน)"
                className="humi-input"
                style={{ maxWidth: 400 }}
                aria-label="ตำแหน่งใหม่ (ไม่จำเป็น)"
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label htmlFor="salaryChangePct" className="text-body font-semibold text-ink" style={{ display: 'block', marginBottom: 6 }}>
                ปรับเงินเดือน (%) <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  id="salaryChangePct"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={salaryChangePct}
                  onChange={(e) => { setSalaryChangePct(e.target.value); setShowReview(false) }}
                  placeholder="เช่น 10"
                  className="humi-input"
                  style={{ maxWidth: 120 }}
                  aria-label="ปรับเงินเดือน เปอร์เซ็นต์"
                />
                <span className="text-body text-ink-muted">%</span>
              </div>
            </div>

            {validationError && (
              <p role="alert" className="humi-error" style={{ marginBottom: 16 }}>{validationError}</p>
            )}

            {showReview && effectiveDate && (
              <ReviewCluster
                currentJG={employee.job_grade}
                currentPosition={employee.position_title}
                newJG={newJG}
                newPositionTitle={newPositionTitle}
                reasonCode={reasonCode}
                salaryChangePct={salaryChangePct}
                effectiveDate={effectiveDate}
              />
            )}

            <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <Link href={`/${locale}/admin/employees/${empId}`} className="humi-btn humi-btn--ghost">
                ยกเลิก
              </Link>
              {!showReview ? (
                <button
                  type="button"
                  onClick={handleReviewClick}
                  disabled={!isFormValid}
                  className="humi-btn humi-btn--primary"
                  aria-disabled={!isFormValid}
                >
                  ตรวจสอบข้อมูล
                </button>
              ) : (
                <button
                  type="button"
                  onClick={doSubmit}
                  disabled={submitted}
                  className="humi-btn humi-btn--primary"
                  aria-disabled={submitted}
                >
                  ยืนยันการเลื่อนตำแหน่ง
                </button>
              )}
            </div>
          </div>
        )}
      </EffectiveDateGate>
    </div>
  )
}
