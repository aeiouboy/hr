// VALIDATION_EXEMPT: B-action factory page — pre-submit gate via actionAvailability + ActionGuardBanner; Zod wire deferred to Sprint 2 lifecycleSchema audit (#47)
'use client'

// acting/page.tsx — มอบหมายปฏิบัติการรักษาการตำแหน่ง (Archetype B contextual action)
//
// Audit #19: Acting Position — DOC-E5E2A1CC SAP SF pattern concurrent-employment.
// EffectiveDateGate wraps form; effectiveDate = acting start date.
// Appends ActingEvent(s) via useTimelines.append.
//
// C1: surgical — only this file. Does not touch timeline.ts or other routes.

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star } from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { EffectiveDateGate } from '@/components/admin/EffectiveDateGate'
import { ActionGuardBanner } from '@/components/admin/ActionGuardBanner'
import { actionAvailability } from '@/lib/admin/actionAvailability'
import type { MockEmployee } from '@/mocks/employees'
import type { ActingEvent } from '@hrms/shared/types/timeline'

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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" style={{ marginTop: 8 }}>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>บริษัท</div>
          <div className="text-body font-medium text-ink">{employee.company}</div>
        </div>
        <div>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ตำแหน่งปัจจุบัน</div>
          <div className="text-body font-medium text-ink">{currentTitle}</div>
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

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ActingPage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null
  const { append, seed } = useTimelines()

  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  const [actingPosition, setActingPosition] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isPrimary, setIsPrimary] = useState(false)
  const [notes, setNotes] = useState('')
  const [effectiveDate, setEffectiveDate] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const isFormValid = actingPosition.trim().length > 0 && !!effectiveDate

  const doSubmit = useCallback(() => {
    if (!employee || !isFormValid || !effectiveDate) return

    const startEvent: ActingEvent = {
      id: `evt-acting-start-${Date.now()}`,
      employeeId: empId,
      kind: 'acting_start',
      effectiveDate,
      recordedAt: new Date().toISOString(),
      actorUserId: 'admin-current',
      position: actingPosition.trim(),
      isPrimary,
      notes: notes.trim() || undefined,
    }
    append(empId, startEvent)

    if (endDate) {
      const endEvent: ActingEvent = {
        id: `evt-acting-end-${Date.now() + 1}`,
        employeeId: empId,
        kind: 'acting_end',
        effectiveDate: endDate,
        recordedAt: new Date().toISOString(),
        actorUserId: 'admin-current',
        position: actingPosition.trim(),
        isPrimary,
      }
      append(empId, endEvent)
    }

    setSubmitted(true)
    router.push(
      `/${locale}/admin/employees/${empId}?banner=${encodeURIComponent('บันทึกการมอบหมายรักษาการเรียบร้อยแล้ว')}`,
    )
  }, [employee, isFormValid, effectiveDate, empId, actingPosition, isPrimary, notes, endDate, append, router, locale])

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

  // Defense-in-depth (P3)
  const guard = actionAvailability(employee).acting
  if (!guard.ok) {
    return (
      <ActionGuardBanner
        actionKey="acting"
        reason={guard.reason ?? ''}
        backHref={`/${locale}/admin/employees/${empId}`}
        actionLabel="มอบหมายปฏิบัติการ"
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
          <Star size={18} aria-hidden />
        </div>
        <div>
          <div className="humi-eyebrow">การดำเนินการ</div>
          <h1 className="font-display text-[20px] font-semibold text-ink">มอบหมายปฏิบัติการ</h1>
        </div>
      </div>

      {/* Employee snapshot */}
      <EmployeeSnapshot employee={employee} />

      {/* Acting form — gated by effectiveDate (= acting start date) */}
      <EffectiveDateGate
        min={employee.hire_date || undefined}
        initialEffectiveDate={effectiveDate ?? undefined}
        onEffectiveDateChange={(date) => setEffectiveDate(date)}
      >
        {() => (
          <div className="humi-card">
            <div className="humi-eyebrow" style={{ marginBottom: 16 }}>ข้อมูลรักษาการ</div>

            {/* ── ตำแหน่งที่รักษาการ (required) ── */}
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="actingPosition"
                className="text-body font-semibold text-ink"
                style={{ display: 'block', marginBottom: 6 }}
              >
                ตำแหน่งที่รักษาการ <span className="text-small text-ink-muted" aria-hidden>*</span>
              </label>
              <input
                id="actingPosition"
                type="text"
                value={actingPosition}
                onChange={(e) => setActingPosition(e.target.value)}
                placeholder="เช่น ผู้จัดการฝ่ายปฏิบัติการ"
                className="humi-input"
                style={{ maxWidth: 440 }}
                required
                aria-required="true"
                aria-label="ตำแหน่งที่รักษาการ"
              />
            </div>

            {/* ── วันที่สิ้นสุด (optional) ── */}
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="endDate"
                className="text-body font-semibold text-ink"
                style={{ display: 'block', marginBottom: 6 }}
              >
                วันที่สิ้นสุด <span className="text-small text-ink-muted">(ถ้ามี — ถ้าว่างคือต่อเนื่อง)</span>
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={effectiveDate ?? undefined}
                className="humi-input"
                style={{ maxWidth: 200 }}
                aria-label="วันที่สิ้นสุดรักษาการ"
              />
            </div>

            {/* ── กำหนดเป็นตำแหน่งหลัก (checkbox, default false) ── */}
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="isPrimary"
                className="humi-row text-body font-semibold text-ink"
                style={{ gap: 10, cursor: 'pointer', display: 'inline-flex' }}
              >
                <input
                  id="isPrimary"
                  type="checkbox"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  aria-label="กำหนดเป็นตำแหน่งหลัก"
                  style={{ width: 16, height: 16, cursor: 'pointer' }}
                />
                <span>กำหนดเป็นตำแหน่งหลัก</span>
              </label>
              <div className="text-small text-ink-muted" style={{ marginTop: 4, paddingLeft: 26 }}>
                ทำเครื่องหมายดาว (star-primary) ที่ตำแหน่งรักษาการนี้
              </div>
            </div>

            {/* ── หมายเหตุ (optional) ── */}
            <div style={{ marginBottom: 24 }}>
              <label
                htmlFor="actingNotes"
                className="text-body font-semibold text-ink"
                style={{ display: 'block', marginBottom: 6 }}
              >
                หมายเหตุ <span className="text-small text-ink-muted">(ไม่จำเป็น)</span>
              </label>
              <textarea
                id="actingNotes"
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
                บันทึกรักษาการ
              </button>
            </div>
          </div>
        )}
      </EffectiveDateGate>
    </div>
  )
}
