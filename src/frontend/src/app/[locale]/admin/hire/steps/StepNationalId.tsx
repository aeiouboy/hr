'use client'

// StepNationalId.tsx — Step 5: เลขบัตรประชาชน (National ID)
// Fields: nationalId text — 13 digits Thai pattern, required
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepNationalIdSchema } from '@/lib/admin/validation/hireSchema'

export interface StepNationalIdProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepNationalId({ onValidChange }: StepNationalIdProps) {
  const { formData, setStepData } = useHireWizard()
  const [nationalId, setNationalId] = useState(formData.nationalId.value)
  const [touched, setTouched]       = useState(false)
  const [error, setError]           = useState<string | undefined>()

  const validate = useCallback(
    (val: string) => {
      // strip formatting chars (dashes/spaces) ก่อน validate
      const clean = val.replace(/[^0-9]/g, '')
      const result = stepNationalIdSchema.safeParse({ value: clean || undefined })
      if (result.success) {
        setError(undefined)
        setStepData('nationalId', { value: clean })
        onValidChange?.(true)
      } else {
        setError(result.error.issues[0]?.message)
        onValidChange?.(false)
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => { validate(nationalId) }, [nationalId, validate])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink">ขั้นตอนที่ 5 — เลขบัตรประชาชน (National ID)</h2>

      <fieldset>
        <label htmlFor="national-id" className="humi-label">
          เลขบัตรประชาชน (National ID)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input
          id="national-id"
          type="text"
          inputMode="numeric"
          maxLength={13}
          required
          aria-required="true"
          aria-invalid={touched && !!error}
          aria-describedby={touched && error ? 'nid-error' : undefined}
          placeholder="เลขบัตรประชาชน 13 หลัก"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
          onBlur={() => setTouched(true)}
          className="humi-input w-full max-w-xs tracking-widest"
        />
        {touched && error && (
          <p id="nid-error" role="alert" className="mt-1 text-xs text-warning">{error}</p>
        )}
      </fieldset>

      <p className="text-xs text-ink-soft"><span className="humi-asterisk">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
