'use client'

// StepEmployeeInfo.tsx — Step 4: ข้อมูลพนักงาน (Employee Info)
// Fields: employeeClass dropdown A-H — required
// Labels verbatim จาก spec Appendix 3 (C8: ห้าม invent)
// Picklist source: @hrms/shared/picklists (C7: single source of truth)
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepEmployeeInfoSchema, EMPLOYEE_CLASSES } from '@/lib/admin/validation/hireSchema'
import { PICKLIST_EMPLOYEE_CLASS } from '@hrms/shared/picklists'

export interface StepEmployeeInfoProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepEmployeeInfo({ onValidChange }: StepEmployeeInfoProps) {
  const { formData, setStepData } = useHireWizard()
  const [employeeClass, setEmployeeClass] = useState<string>(formData.employeeInfo.employeeClass ?? '')
  const [touched, setTouched]             = useState(false)
  const [error, setError]                 = useState<string | undefined>()

  const validate = useCallback(
    (cls: string) => {
      const result = stepEmployeeInfoSchema.safeParse({ employeeClass: cls || undefined })
      if (result.success) {
        setError(undefined)
        setStepData('employeeInfo', { employeeClass: cls })
        onValidChange?.(true)
      } else {
        setError(result.error.issues[0]?.message)
        onValidChange?.(false)
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => { validate(employeeClass) }, [employeeClass, validate])

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">ขั้นตอนที่ 4 — ข้อมูลพนักงาน (Employee Info)</h2>

      <fieldset>
        <label htmlFor="employee-class" className="block text-sm font-medium text-gray-700 mb-1">
          ประเภทพนักงาน (Employee Class)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <select
          id="employee-class"
          required
          aria-required="true"
          aria-invalid={touched && !!error}
          aria-describedby={touched && error ? 'eclass-error' : undefined}
          value={employeeClass}
          onChange={(e) => setEmployeeClass(e.target.value)}
          onBlur={() => setTouched(true)}
          className={[
            'w-full max-w-xs rounded-md border px-3 py-2 text-sm bg-white text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            touched && error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
          ].join(' ')}
        >
          <option value="">— เลือกประเภทพนักงาน —</option>
          {PICKLIST_EMPLOYEE_CLASS.filter((item) => item.active).map((item) => (
            <option key={item.id} value={item.id}>{item.labelTh}</option>
          ))}
        </select>
        {touched && error && (
          <p id="eclass-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
