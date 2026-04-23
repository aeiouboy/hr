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
      <h2 className="text-lg font-semibold text-gray-900">ขั้นตอนที่ 3 — ข้อมูลประวัติ (Biographical)</h2>

      <fieldset>
        <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700 mb-1">
          วันเกิด (Date of Birth)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
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
          className={[
            'w-full max-w-xs rounded-md border px-3 py-2 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            touched && error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
          ].join(' ')}
        />
        {touched && error && (
          <p id="dob-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
