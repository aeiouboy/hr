'use client'

// TransferStepLocation.tsx — Transfer Wizard Step 5
// ค่าตอบแทน (carry-over) + new base salary override (optional)
// schema: transferStep5Schema — carryOverCompensation boolean + newBaseSalary optional
// Note: spec label "Location + cost center" merged into Step 5 compensation carry (store: step5)
import { useState, useEffect, useCallback } from 'react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import { transferStep5Schema } from '@/lib/admin/validation/lifecycleSchema'

export default function TransferStepLocation() {
  const { active, setStepData } = useLifecycleWizard()

  // guard: ต้องอยู่ใน transfer flow
  if (!active || active.flow !== 'transfer') return null

  const { carryOverCompensation, newBaseSalary } = active.formData.step5

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [carryOver, setCarryOver]         = useState<boolean>(carryOverCompensation)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [salaryInput, setSalaryInput]     = useState<string>(
    newBaseSalary != null ? String(newBaseSalary) : ''
  )
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [touched, setTouched]             = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError]                 = useState<string | undefined>()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const validate = useCallback(
    (carry: boolean, salRaw: string) => {
      const num = salRaw === '' ? null : Number(salRaw)
      const result = transferStep5Schema.safeParse({
        carryOverCompensation: carry,
        newBaseSalary: num && !isNaN(num) ? num : null,
      })
      if (result.success) {
        setError(undefined)
        setStepData('transfer', 5, {
          carryOverCompensation: carry,
          newBaseSalary: num && !isNaN(num) ? num : null,
        })
      } else {
        setError(result.error.issues[0]?.message)
      }
    },
    [setStepData]
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { validate(carryOver, salaryInput) }, [carryOver, salaryInput, validate])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">ค่าตอบแทน (Compensation Carry)</h2>
        <p className="text-sm text-gray-500 mt-1">
          กำหนดว่าจะคง carry-over ค่าตอบแทนเดิม หรือกำหนดใหม่
        </p>
      </div>

      {/* Carry-over toggle */}
      <fieldset>
        <div className="flex items-center gap-3">
          <input
            id="transfer-carry-over"
            type="checkbox"
            checked={carryOver}
            onChange={(e) => setCarryOver(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            aria-describedby="carry-over-help"
          />
          <label htmlFor="transfer-carry-over" className="text-sm font-medium text-gray-700">
            คง carry-over ค่าตอบแทนเดิม (Carry Over Compensation)
          </label>
        </div>
        <p id="carry-over-help" className="mt-1 text-xs text-gray-400 ml-7">
          เมื่อเลือก — เงินเดือนใหม่จะเท่ากับเงินเดือนปัจจุบัน
        </p>
      </fieldset>

      {/* เงินเดือนใหม่ — แสดงเมื่อ carryOver = false */}
      {!carryOver && (
        <fieldset>
          <label htmlFor="transfer-new-salary" className="block text-sm font-medium text-gray-700 mb-1">
            เงินเดือนใหม่ (New Base Salary — บาท)
            <span className="ml-1 text-xs text-gray-400">(ไม่บังคับ)</span>
          </label>
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 select-none">฿</span>
            <input
              id="transfer-new-salary"
              type="number"
              min={1}
              step={1}
              aria-invalid={touched && !!error}
              aria-describedby={touched && error ? 'trf-salary-error' : undefined}
              placeholder="ระบุจำนวนเงิน (ว่างไว้ถ้าไม่เปลี่ยน)"
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
            <p id="trf-salary-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>
          )}
        </fieldset>
      )}
    </div>
  )
}
