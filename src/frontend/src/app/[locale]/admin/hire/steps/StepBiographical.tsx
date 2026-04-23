'use client'

// StepBiographical.tsx — Step 3: ข้อมูลประวัติ (Biographical)
// Fields: dateOfBirth (date picker) — required
//         maritalStatus (dropdown from PICKLIST_MARITAL_STATUS) — optional scaffold
// Picklist source: @hrms/shared/picklists (C7: single source of truth)
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepBiographicalSchema } from '@/lib/admin/validation/hireSchema'
import { PICKLIST_MARITAL_STATUS } from '@hrms/shared/picklists'

export interface StepBiographicalProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepBiographical({ onValidChange }: StepBiographicalProps) {
  const { formData, setStepData } = useHireWizard()
  const [dateOfBirth, setDateOfBirth]       = useState<string>(formData.biographical.dateOfBirth ?? '')
  const [maritalStatus, setMaritalStatus]   = useState<string>(formData.biographical.maritalStatus ?? '')
  const [touched, setTouched]               = useState(false)
  const [error, setError]                   = useState<string | undefined>()

  const validate = useCallback(
    (dob: string, marital: string) => {
      const result = stepBiographicalSchema.safeParse({
        dateOfBirth: dob || undefined,
        maritalStatus: marital || undefined,
      })
      if (result.success) {
        setError(undefined)
        setStepData('biographical', { dateOfBirth: dob, maritalStatus: marital || null })
        onValidChange?.(true)
      } else {
        setError(result.error.issues[0]?.message)
        onValidChange?.(false)
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => { validate(dateOfBirth, maritalStatus) }, [dateOfBirth, maritalStatus, validate])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink">ขั้นตอนที่ 3 — ข้อมูลประวัติ (Biographical)</h2>

      {/* ─── Date of Birth ─── */}
      <fieldset>
        <label htmlFor="date-of-birth" className="humi-label">
          วันเกิด (Date of Birth)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input
          id="date-of-birth"
          type="date"
          required
          aria-required="true"
          aria-invalid={touched && !!error}
          aria-describedby={touched && error ? 'dob-error' : undefined}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          onBlur={() => setTouched(true)}
          className="humi-input w-full max-w-xs"
        />
        {touched && error && (
          <p id="dob-error" role="alert" className="mt-1 text-xs text-warning">{error}</p>
        )}
      </fieldset>

      {/* ─── Marital Status ─── */}
      <fieldset>
        <label htmlFor="marital-status" className="humi-label">
          สถานภาพสมรส (Marital Status)
        </label>
        <select
          id="marital-status"
          value={maritalStatus}
          onChange={(e) => setMaritalStatus(e.target.value)}
          className="humi-select w-full max-w-xs"
        >
          <option value="">— เลือกสถานภาพ —</option>
          {PICKLIST_MARITAL_STATUS.filter((item) => item.active).map((item) => (
            <option key={item.id} value={item.id}>{item.labelTh}</option>
          ))}
        </select>
      </fieldset>

      <p className="text-xs text-ink-soft"><span className="humi-asterisk">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
