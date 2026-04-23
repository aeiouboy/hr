'use client'

// StepCompensation.tsx — Step 8: ค่าตอบแทน (Compensation) + Submit
// Fields: baseSalary number > 0 (Thai Baht) — required
// Submit: toast + reset after 2s
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepCompensationSchema } from '@/lib/admin/validation/hireSchema'

export interface StepCompensationProps {
  onValidChange?: (isValid: boolean) => void
}

// Toast component — plain div ที่ fade out (ไม่ใช้ 3rd party lib)
function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
        bg-accent text-white text-sm px-5 py-3 rounded-lg shadow-lg
        animate-fade-in-up"
    >
      {message}
    </div>
  )
}

export default function StepCompensation({ onValidChange }: StepCompensationProps) {
  const { formData, setStepData, reset } = useHireWizard()
  const [salaryInput, setSalaryInput] = useState<string>(
    formData.compensation.baseSalary != null ? String(formData.compensation.baseSalary) : ''
  )
  const [touched, setTouched]     = useState(false)
  const [error, setError]         = useState<string | undefined>()
  const [toastMsg, setToastMsg]   = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

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

  // Submit handler — validate + toast + reset (PII payload ไม่ log ใน production)
  const handleSubmit = useCallback(() => {
    setTouched(true)
    if (!validate(salaryInput)) return

    setSubmitting(true)
    setToastMsg('✅ ส่งคำขอจ้างพนักงานสำเร็จ (mock submit)')

    // reset หลัง 2 วินาที
    setTimeout(() => {
      reset()
      setSubmitting(false)
    }, 2000)
  }, [salaryInput, validate, reset])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink">ขั้นตอนที่ 8 — ค่าตอบแทน (Compensation)</h2>

      {/* เงินเดือนพื้นฐาน */}
      <fieldset>
        <label htmlFor="base-salary" className="humi-label">
          เงินเดือนพื้นฐาน (Base Salary — บาท)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
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

      {/* Submit button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={submitting}
          onClick={handleSubmit}
          className={[
            'rounded-md px-6 py-2.5 text-sm font-semibold text-white',
            'focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] focus:ring-offset-2',
            submitting
              ? 'bg-canvas-soft text-ink-muted cursor-not-allowed'
              : 'bg-accent hover:bg-[#188A83] active:opacity-90',
          ].join(' ')}
        >
          {submitting ? 'กำลังส่ง...' : 'ส่งคำขอจ้างพนักงาน'}
        </button>
      </div>

      {/* Toast notification — plain div ไม่ใช้ lib */}
      {toastMsg && (
        <Toast message={toastMsg} onDone={() => setToastMsg(null)} />
      )}
    </div>
  )
}
