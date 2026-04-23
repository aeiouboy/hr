'use client'

// StepIdentity.tsx — Step 1: ข้อมูลระบุตัวตน (Identity)
// Fields: วันที่เริ่มงาน (Hire Date) + บริษัท (Company typeahead) + Event Reason (dropdown)
// Validation: Zod stepIdentitySchema — ทุก field บังคับ (required)
// Store: useHireWizard.setStepData('identity', ...) + isStepValid(1) ผ่าน checkStepValid

import { useState, useEffect, useCallback } from 'react'
import CompanyTypeahead from '@/components/admin/wizard/CompanyTypeahead'
import { loadCompanies } from '@/lib/admin/store/loadCompanies'
import type { Company } from '@/lib/admin/store/loadCompanies'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepIdentitySchema } from '@/lib/admin/validation/hireSchema'

// Thai labels สำหรับ 6 HIRE Event Reason codes — ตาม spec Appendix 2 verbatim (C8)
const EVENT_REASON_LABELS: Record<string, string> = {
  H_NEWHIRE:   'พนักงานใหม่',
  H_RPLMENT:   'แทนที่พนักงานเดิม',
  H_TEMPASG:   'มอบหมายชั่วคราว',
  HIREDM:      'ย้ายข้อมูล (Data Migration)',
  H_CORENTRY:  'แก้ไขรายการ Hire (Corrected Entry)',
  H_INENTRY:   'Hire Incorrect Entry ⚠️',
}

// ลำดับ dropdown ตาม spec
const EVENT_REASON_ORDER = [
  'H_NEWHIRE',
  'H_RPLMENT',
  'H_TEMPASG',
  'HIREDM',
  'H_CORENTRY',
  'H_INENTRY',
]

// helper — วันนี้ในรูปแบบ ISO 8601 (YYYY-MM-DD) สำหรับ default ของ Hire Date
function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export interface StepIdentityProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepIdentity({ onValidChange }: StepIdentityProps) {
  // โหลด companies ครั้งเดียวตอน mount — 164 รายการ
  const [companies, setCompanies] = useState<Company[]>([])
  useEffect(() => {
    try {
      setCompanies(loadCompanies())
    } catch (err) {
      console.warn('[StepIdentity] loadCompanies ล้มเหลว:', err)
    }
  }, [])

  // อ่าน store
  const { formData, setStepData } = useHireWizard()
  const identity = formData.identity

  // local field state — initialize จาก store (หรือ default)
  const [hireDate, setHireDate] = useState<string>(identity.hireDate ?? todayISO())
  const [companyCode, setCompanyCode] = useState<string>(identity.companyCode ?? '')
  const [eventReason, setEventReason] = useState<string>(identity.eventReason ?? '')

  // error state — แสดงเมื่อ user เคย blur หรือ submit
  const [touched, setTouched] = useState({
    hireDate: false,
    companyCode: false,
    eventReason: false,
  })
  const [errors, setErrors] = useState<{
    hireDate?: string
    companyCode?: string
    eventReason?: string
  }>({})

  // validate ทุกครั้งที่ field เปลี่ยน — sync ไปยัง store + onValidChange
  const validate = useCallback(
    (date: string, code: string, reason: string) => {
      const result = stepIdentitySchema.safeParse({
        hireDate: date || undefined,
        companyCode: code || undefined,
        eventReason: reason || undefined,
      })

      if (result.success) {
        setErrors({})
        // บันทึกลง store
        setStepData('identity', {
          hireDate: date,
          companyCode: code,
          eventReason: reason,
        })
        onValidChange?.(true)
        return true
      } else {
        // map Zod errors ไปยัง field names
        const fieldErrors: typeof errors = {}
        for (const issue of result.error.issues) {
          const field = issue.path[0] as keyof typeof fieldErrors
          if (!fieldErrors[field]) fieldErrors[field] = issue.message
        }
        setErrors(fieldErrors)
        onValidChange?.(false)
        return false
      }
    },
    [setStepData, onValidChange]
  )

  // re-validate ทุกครั้งที่ value เปลี่ยน
  useEffect(() => {
    validate(hireDate, companyCode, eventReason)
  }, [hireDate, companyCode, eventReason, validate])

  // sync ไปยัง store เมื่อ hireDate default ถูก set ครั้งแรก
  useEffect(() => {
    if (!identity.hireDate && hireDate) {
      setStepData('identity', { hireDate })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">
        ขั้นตอนที่ 1 — ข้อมูลระบุตัวตน (Identity)
      </h2>

      {/* ─── Hire Date ─── */}
      <fieldset>
        <label
          htmlFor="hire-date"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          วันที่เริ่มงาน (Hire Date)
          <span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>

        <input
          id="hire-date"
          type="date"
          required
          aria-required="true"
          aria-invalid={touched.hireDate && !!errors.hireDate}
          aria-describedby={touched.hireDate && errors.hireDate ? 'hire-date-error' : undefined}
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, hireDate: true }))}
          className={[
            'w-full max-w-xs rounded-md border px-3 py-2 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            touched.hireDate && errors.hireDate
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300',
          ].join(' ')}
        />

        {touched.hireDate && errors.hireDate && (
          <p
            id="hire-date-error"
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {errors.hireDate}
          </p>
        )}
      </fieldset>

      {/* ─── Company typeahead ─── */}
      <fieldset>
        <label
          htmlFor="company-typeahead"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          บริษัท (Company)
          <span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>

        <div
          className="max-w-lg"
          onBlur={(e) => {
            // blur จาก container (ไม่ใช่ child element) = user ออกจาก typeahead
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setTouched((prev) => ({ ...prev, companyCode: true }))
            }
          }}
        >
          <CompanyTypeahead
            companies={companies}
            value={companyCode || null}
            onChange={(code) => setCompanyCode(code)}
            error={touched.companyCode ? errors.companyCode : undefined}
          />
        </div>

        {touched.companyCode && errors.companyCode && (
          <p
            id="company-code-error"
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {errors.companyCode}
          </p>
        )}
      </fieldset>

      {/* ─── Event Reason dropdown ─── */}
      <fieldset>
        <label
          htmlFor="event-reason"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          สาเหตุการจ้างงาน (Event Reason)
          <span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>

        <select
          id="event-reason"
          required
          aria-required="true"
          aria-invalid={touched.eventReason && !!errors.eventReason}
          aria-describedby={
            touched.eventReason && errors.eventReason ? 'event-reason-error' : undefined
          }
          value={eventReason}
          onChange={(e) => setEventReason(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, eventReason: true }))}
          className={[
            'w-full max-w-xs rounded-md border px-3 py-2 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'bg-white text-gray-900',
            touched.eventReason && errors.eventReason
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300',
          ].join(' ')}
        >
          <option value="">— เลือกสาเหตุ —</option>
          {EVENT_REASON_ORDER.map((code) => (
            <option key={code} value={code}>
              {code} — {EVENT_REASON_LABELS[code] ?? code}
            </option>
          ))}
        </select>

        {touched.eventReason && errors.eventReason && (
          <p
            id="event-reason-error"
            role="alert"
            className="mt-1 text-xs text-red-600"
          >
            {errors.eventReason}
          </p>
        )}
      </fieldset>

      {/* หมายเหตุ required */}
      <p className="text-xs text-gray-400">
        <span className="text-red-500">*</span> ช่องที่บังคับกรอก
      </p>
    </div>
  )
}
