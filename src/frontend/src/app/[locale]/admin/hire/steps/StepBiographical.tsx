'use client'

// StepBiographical.tsx — Step 3: ข้อมูลประวัติ (Biographical)
// Fields: dateOfBirth (date picker) — required
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepBiographicalSchema } from '@/lib/admin/validation/hireSchema'

export interface StepBiographicalProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepBiographical({ onValidChange }: StepBiographicalProps) {
  const { formData, setStepData } = useHireWizard()
  const [dateOfBirth, setDateOfBirth] = useState<string>(formData.biographical.dateOfBirth ?? '')
  const [touched, setTouched]         = useState(false)
  const [error, setError]             = useState<string | undefined>()

  const validate = useCallback(
    (dob: string) => {
      const result = stepBiographicalSchema.safeParse({ dateOfBirth: dob || undefined })
      if (result.success) {
        setError(undefined)
        setStepData('biographical', { dateOfBirth: dob })
        onValidChange?.(true)
      } else {
        setError(result.error.issues[0]?.message)
        onValidChange?.(false)
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => { validate(dateOfBirth) }, [dateOfBirth, validate])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink">ขั้นตอนที่ 3 — ข้อมูลประวัติ (Biographical)</h2>

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

      <p className="text-xs text-ink-soft"><span className="humi-asterisk">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
