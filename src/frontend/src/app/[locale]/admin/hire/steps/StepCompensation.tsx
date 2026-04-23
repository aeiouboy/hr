'use client'

// StepCompensation.tsx — Step 8: ค่าตอบแทน (Compensation) + Submit
// Fields: baseSalary number > 0 (Thai Baht) — required
// Submit: console.log payload + toast + reset after 2s
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
        bg-green-700 text-white text-sm px-5 py-3 rounded-lg shadow-lg
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

  // Submit handler — pull all formData from store, log + toast
  const handleSubmit = useCallback(() => {
    setTouched(true)
    if (!validate(salaryInput)) return

    const payload = formData
    console.log('[HireWizard Submit]', JSON.stringify(payload, null, 2))
    setSubmitting(true)
    setToastMsg('✅ ส่งคำขอจ้างพนักงานสำเร็จ (mock submit)')

    // reset หลัง 2 วินาที
    setTimeout(() => {
      reset()
      setSubmitting(false)
    }, 2000)
  }, [formData, salaryInput, validate, reset])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">ขั้นตอนที่ 8 — ค่าตอบแทน (Compensation)</h2>

      {/* เงินเดือนพื้นฐาน */}
      <fieldset>
        <label htmlFor="base-salary" className="block text-sm font-medium text-gray-700 mb-1">
          เงินเดือนพื้นฐาน (Base Salary — บาท)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <div className="relative max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 select-none">฿</span>
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
            className={[
              'w-full rounded-md border pl-7 pr-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              touched && error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
            ].join(' ')}
          />
        </div>
        {touched && error && (
          <p id="salary-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>

      {/* Submit button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={submitting}
          onClick={handleSubmit}
          className={[
            'rounded-md px-6 py-2.5 text-sm font-semibold text-white',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            submitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
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
