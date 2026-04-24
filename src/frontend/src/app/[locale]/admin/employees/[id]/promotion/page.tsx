'use client'

// promotion/page.tsx — เลื่อนตำแหน่งพนักงาน (Archetype B contextual action)
//
// BRD §4 Promotion: state-change action — EffectiveDateGate required.
// Fields: toCorporateTitle (required), salaryChangePct 0-50 (optional), notes (optional).
// PromotionEvent shape from @hrms/shared/types/timeline — no invented fields (C8).
//
// C1: surgical — only this file + test update. Does not touch timeline.ts.

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { EffectiveDateGate } from '@/components/admin/EffectiveDateGate'
import { ActionGuardBanner } from '@/components/admin/ActionGuardBanner'
import { actionAvailability } from '@/lib/admin/actionAvailability'
import PositionLookup from '@/components/admin/PositionLookup'
import { MOCK_POSITION_MASTER } from '@/lib/admin/mock/positions'
import type { Position, PositionCascade } from '@/lib/admin/types/position'
import type { MockEmployee } from '@/mocks/employees'
import type { PromotionEvent } from '@hrms/shared/types/timeline'

// ─── Date helpers ────────────────────────────────────────────────────────────

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

// ─── Employee snapshot (readonly) ────────────────────────────────────────────

function EmployeeSnapshot({ employee }: { employee: MockEmployee }) {
  const nameTh = `${employee.first_name_th} ${employee.last_name_th}`
  const nameEn = `${employee.first_name_en} ${employee.last_name_en}`
  const tenure = calcTenure(employee.hire_date)
  const hireDateFmt = formatDateTh(employee.hire_date)
  const currentTitle = (employee as unknown as Record<string, unknown>).corporate_title as string | undefined
    ?? employee.position_title

  return (
    <div className="humi-card humi-card--cream">
      <div className="humi-eyebrow" style={{ marginBottom: 4 }}>{employee.employee_id}</div>
      <div className="font-display text-[18px] font-semibold text-ink">{nameTh}</div>
      <div className="text-small text-ink-muted mb-3">{nameEn}</div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" style={{ marginTop: 8 }}>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>บริษัท</div>
          <div className="text-body font-medium text-ink">{employee.company}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ตำแหน่งปัจจุบัน</div>
          <div className="text-body font-medium text-ink">{currentTitle}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>Job Grade</div>
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

// ─── Exported helpers (for tests) ────────────────────────────────────────────

/** salaryChangePct must be in 0–50 range */
export function isSalaryPctValid(pct: number): boolean {
  return pct >= 0 && pct <= 50
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PromotionPage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null

  const { append, seed } = useTimelines()

  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  const [selectedPosition, setSelectedPosition] = useState<PositionCascade | null>(null)
  const [salaryChangePct, setSalaryChangePct] = useState('')
  const [notes, setNotes] = useState('')
  const [effectiveDate, setEffectiveDate] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [salaryError, setSalaryError] = useState('')

  const currentTitle = employee
    ? ((employee as unknown as Record<string, unknown>).corporate_title as string | undefined) ?? employee.position_title
    : ''

  const salaryPct = salaryChangePct !== '' ? parseFloat(salaryChangePct) : undefined
  const salaryInvalid = salaryChangePct !== '' && (isNaN(salaryPct!) || !isSalaryPctValid(salaryPct!))

  const isFormValid = !!selectedPosition && !salaryInvalid && !!effectiveDate

  const doSubmit = useCallback(() => {
    if (!employee || !isFormValid || !effectiveDate) return
    if (salaryInvalid) {
      setSalaryError('ระบุ 0–50 เท่านั้น')
      return
    }

    if (!selectedPosition) return

    const event: PromotionEvent = {
      id: `evt-prm-${Date.now()}`,
      employeeId: empId,
      kind: 'promotion',
      effectiveDate,
      recordedAt: new Date().toISOString(),
      actorUserId: 'admin-current',
      fromTitle: currentTitle,
      toTitle: selectedPosition.titleTh,
      salaryChangePct: salaryPct,
      notes: notes.trim() || undefined,
    }

    append(empId, event)
    setSubmitted(true)
    router.push(
      `/${locale}/admin/employees/${empId}?banner=${encodeURIComponent('บันทึกการเลื่อนตำแหน่งเรียบร้อยแล้ว')}`,
    )
  }, [employee, isFormValid, effectiveDate, salaryInvalid, empId, currentTitle, selectedPosition, salaryPct, notes, append, router, locale])

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

  // Defense-in-depth — block action if employee status disallows (P3)
  const guard = actionAvailability(employee).promotion
  if (!guard.ok) {
    return (
      <ActionGuardBanner
        actionKey="promotion"
        reason={guard.reason ?? ''}
        backHref={`/${locale}/admin/employees/${empId}`}
        actionLabel="เลื่อนตำแหน่ง"
      />
    )
  }

  return (
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
          <TrendingUp size={18} aria-hidden />
        </div>
        <div>
          <div className="humi-eyebrow">การดำเนินการ</div>
          <h1 className="font-display text-[20px] font-semibold text-ink">เลื่อนตำแหน่ง</h1>
        </div>
      </div>

      {/* Employee snapshot */}
      <EmployeeSnapshot employee={employee} />

      {/* Promotion form — gated by effectiveDate */}
      <EffectiveDateGate
        min={employee.hire_date || undefined}
        initialEffectiveDate={effectiveDate ?? undefined}
        onEffectiveDateChange={(date) => setEffectiveDate(date)}
      >
        {() => (
          <div className="humi-card">
            <div className="humi-eyebrow" style={{ marginBottom: 16 }}>ข้อมูลการเลื่อนตำแหน่ง</div>

            {/* ── ตำแหน่งปัจจุบัน (read-only banner) ── */}
            <div style={{ marginBottom: 20 }}>
              <div className="humi-eyebrow" style={{ marginBottom: 6 }}>ตำแหน่งปัจจุบัน</div>
              <div
                className="text-body font-medium text-ink"
                style={{
                  padding: '8px 12px',
                  background: 'var(--color-surface-muted, #F5F5F5)',
                  borderRadius: 8,
                  maxWidth: 400,
                }}
                aria-label="ตำแหน่งปัจจุบัน (อ่านได้อย่างเดียว)"
              >
                {currentTitle}
              </div>
            </div>

            {/* ── เลื่อนไปเป็น (required, picks active Position from master per BRD #95 cascade) ── */}
            <div style={{ marginBottom: 20 }}>
              <PositionLookup
                id="toCorporateTitle"
                positionMaster={MOCK_POSITION_MASTER}
                required
                label="เลื่อนไปเป็น (ระดับ/ตำแหน่งใหม่)"
                placeholder="ค้นด้วยรหัส / ชื่อตำแหน่ง (TH/EN)"
                filter={(p: Position) => p.active}
                onSelect={setSelectedPosition}
              />
            </div>

            {/* ── ปรับขึ้น % (optional, 0–50) ── */}
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="salaryChangePct"
                className="text-body font-semibold text-ink"
                style={{ display: 'block', marginBottom: 6 }}
              >
                ปรับขึ้น (%) <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  id="salaryChangePct"
                  type="number"
                  min="0"
                  max="50"
                  step="0.1"
                  value={salaryChangePct}
                  onChange={(e) => { setSalaryChangePct(e.target.value); setSalaryError('') }}
                  placeholder="เช่น 10"
                  className="humi-input"
                  style={{ maxWidth: 120 }}
                  aria-label="ปรับขึ้นเปอร์เซ็นต์ 0 ถึง 50"
                />
                <span className="text-body text-ink-muted">%</span>
              </div>
              {salaryInvalid && (
                <p role="alert" className="humi-error" style={{ marginTop: 4 }}>
                  {salaryError || 'ระบุ 0–50 เท่านั้น'}
                </p>
              )}
            </div>

            {/* ── หมายเหตุ (optional) ── */}
            <div style={{ marginBottom: 24 }}>
              <label
                htmlFor="notes"
                className="text-body font-semibold text-ink"
                style={{ display: 'block', marginBottom: 6 }}
              >
                หมายเหตุ <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="หมายเหตุเพิ่มเติม..."
                className="humi-input"
                style={{ width: '100%', resize: 'vertical', maxWidth: 560 }}
                aria-label="หมายเหตุ"
              />
            </div>

            {/* ── Action buttons ── */}
            <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10 }}>
              <Link
                href={`/${locale}/admin/employees/${empId}`}
                className="humi-btn humi-btn--ghost"
              >
                ยกเลิก
              </Link>
              <button
                type="button"
                onClick={doSubmit}
                disabled={!isFormValid || submitted}
                className="humi-btn humi-btn--primary"
                aria-disabled={!isFormValid || submitted}
              >
                บันทึกการเลื่อนตำแหน่ง
              </button>
            </div>
          </div>
        )}
      </EffectiveDateGate>
    </div>
  )
}
