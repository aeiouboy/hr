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
      <h2 className="text-lg font-semibold text-gray-900">ขั้นตอนที่ 5 — เลขบัตรประชาชน (National ID)</h2>

      <fieldset>
        <label htmlFor="national-id" className="block text-sm font-medium text-gray-700 mb-1">
          เลขบัตรประชาชน (National ID)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
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
          className={[
            'w-full max-w-xs rounded-md border px-3 py-2 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'tracking-widest',
            touched && error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
          ].join(' ')}
        />
        {touched && error && (
          <p id="nid-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
