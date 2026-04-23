'use client'

// StepPersonal.tsx — Step 6: ข้อมูลส่วนตัว (Personal)
// Fields: addressLine1 text — required
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepPersonalSchema } from '@/lib/admin/validation/hireSchema'

export interface StepPersonalProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepPersonal({ onValidChange }: StepPersonalProps) {
  const { formData, setStepData } = useHireWizard()
  const [addressLine1, setAddressLine1] = useState(formData.personal.addressLine1)
  const [touched, setTouched]           = useState(false)
  const [error, setError]               = useState<string | undefined>()

  const validate = useCallback(
    (addr: string) => {
      const result = stepPersonalSchema.safeParse({ addressLine1: addr || undefined })
      if (result.success) {
        setError(undefined)
        setStepData('personal', { addressLine1: addr })
        onValidChange?.(true)
      } else {
        setError(result.error.issues[0]?.message)
        onValidChange?.(false)
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => { validate(addressLine1) }, [addressLine1, validate])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink">ขั้นตอนที่ 6 — ข้อมูลส่วนตัว (Personal)</h2>

      <fieldset>
        <label htmlFor="address-line1" className="humi-label">
          ที่อยู่ (Address Line 1)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input
          id="address-line1"
          type="text"
          required
          aria-required="true"
          aria-invalid={touched && !!error}
          aria-describedby={touched && error ? 'addr-error' : undefined}
          placeholder="บ้านเลขที่ ถนน แขวง เขต จังหวัด รหัสไปรษณีย์"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          onBlur={() => setTouched(true)}
          className="humi-input w-full max-w-lg"
        />
        {touched && error && (
          <p id="addr-error" role="alert" className="mt-1 text-xs text-warning">{error}</p>
        )}
      </fieldset>

      <p className="text-xs text-ink-soft"><span className="humi-asterisk">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
