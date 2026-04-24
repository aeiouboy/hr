'use client'

// StepCompensation.tsx — Compensation section (base salary).
// Option-1 restructure (2026-04-23): Submit button + toast removed — submit
// is owned by WizardFooter on Step 3 Review. Keeping an inner submit here
// created the "double submit button" Ken flagged in the Job cluster screenshot.
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepCompensationSchema } from '@/lib/admin/validation/hireSchema'

export interface StepCompensationProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepCompensation({ onValidChange }: StepCompensationProps) {
  const { formData, setStepData } = useHireWizard()
  const [salaryInput, setSalaryInput] = useState<string>(
    formData.compensation.baseSalary != null ? String(formData.compensation.baseSalary) : ''
  )
  const [touched, setTouched] = useState(false)
  const [error, setError]     = useState<string | undefined>()

  const validate = useCallback(
    (raw: string) => {
      const num = raw === '' ? NaN : Number(raw)
      const result = stepCompensationSchema.safeParse({
        baseSalary: isNaN(num) ? undefined : num,
      })
      if (result.success) {
        setError(undefined)
        setStepData('compensation', { baseSalary: num })
        onValidChange?.(true)
        return true
      } else {
        setError(result.error.issues[0]?.message)
        onValidChange?.(false)
        return false
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => { validate(salaryInput) }, [salaryInput, validate])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink">ขั้นตอนที่ 8 — ค่าตอบแทน</h2>

      {/* เงินเดือนพื้นฐาน */}
      <fieldset>
        <label htmlFor="base-salary" className="humi-label">
          เงินเดือนพื้นฐาน (บาท)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <div className="relative max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted select-none">฿</span>
          <input
            id="base-salary"
            type="number"
            min={1}
            step={1}
            required
            aria-required="true"
            aria-invalid={touched && !!error}
            aria-describedby={touched && error ? 'salary-error' : undefined}
            placeholder="ระบุจำนวนเงิน"
            value={salaryInput}
            onChange={(e) => setSalaryInput(e.target.value)}
            onBlur={() => setTouched(true)}
            className="humi-input w-full pl-7"
          />
        </div>
        {touched && error && (
          <p id="salary-error" role="alert" className="mt-1 text-xs text-warning">{error}</p>
        )}
      </fieldset>

      <p className="text-xs text-ink-soft"><span className="humi-asterisk">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
