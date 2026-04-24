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
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
      {/* เงินเดือนพื้นฐาน */}
      <fieldset>
        <label htmlFor="base-salary" className="humi-label">
          เงินเดือนพื้นฐาน (บาท)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <div className="relative">
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

      {/* Currency — audit #13 (non-TH support per BRD #120) — mockup stub */}
      <fieldset>
        <label htmlFor="currency" className="humi-label">สกุลเงิน</label>
        <select id="currency" defaultValue="THB" className="humi-select w-full">
          <option value="THB">บาทไทย (THB)</option>
          <option value="USD">ดอลลาร์สหรัฐ (USD)</option>
          <option value="SGD">ดอลลาร์สิงคโปร์ (SGD)</option>
          <option value="JPY">เยนญี่ปุ่น (JPY)</option>
        </select>
      </fieldset>

      {/* Payment Method — audit #13 (BRD #118) — mockup stub */}
      <fieldset className="md:col-span-2">
        <label htmlFor="payment-method" className="humi-label">วิธีรับเงินเดือน</label>
        <select id="payment-method" defaultValue="TRANSFER" className="humi-select w-full md:max-w-sm">
          <option value="TRANSFER">โอนเงินผ่านธนาคาร</option>
          <option value="CASH">เงินสด</option>
          <option value="CHEQUE">เช็ค</option>
        </select>
        <p className="mt-1 text-xs text-ink-faint">วิธี default = โอนธนาคาร — ปรับได้ที่ Cost Distribution (Sprint ถัดไป)</p>
      </fieldset>
    </div>
  )
}
