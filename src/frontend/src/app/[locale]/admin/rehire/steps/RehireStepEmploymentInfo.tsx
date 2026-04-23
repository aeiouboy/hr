'use client'

// RehireStepEmploymentInfo.tsx — Rehire Wizard Step 4
// ข้อมูลพนักงาน: employeeClass dropdown A-H (BRD #102 — reuse labels จาก StepEmployeeInfo)
// schema: rehireStep4Schema — employeeClass required
import { useState, useEffect, useCallback } from 'react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import { rehireStep4Schema, EMPLOYEE_CLASSES_LIFECYCLE } from '@/lib/admin/validation/lifecycleSchema'

// Labels verbatim จาก Appendix 3 (C8: ห้าม invent)
const EMPLOYEE_CLASS_LABELS: Record<typeof EMPLOYEE_CLASSES_LIFECYCLE[number], string> = {
  A: 'A — Permanent',
  B: 'B — Expat Outbound',
  C: 'C — Expat Inbound',
  D: 'D — Retirement',
  E: 'E — Temporary',
  F: 'F — DVT',
  G: 'G — Internship',
  H: 'H — Contingent',
}

export default function RehireStepEmploymentInfo() {
  const { active, setStepData } = useLifecycleWizard()

  // guard: ต้องอยู่ใน rehire flow
  if (!active || active.flow !== 'rehire') return null

  const { employeeClass: storedClass } = active.formData.step4

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [employeeClass, setEmployeeClass] = useState<string>(storedClass ?? '')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [touched, setTouched]             = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError]                 = useState<string | undefined>()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const validate = useCallback(
    (cls: string) => {
      const result = rehireStep4Schema.safeParse({ employeeClass: cls || undefined })
      if (result.success) {
        setError(undefined)
        setStepData('rehire', 4, { employeeClass: cls })
      } else {
        setError(result.error.issues[0]?.message)
      }
    },
    [setStepData]
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { validate(employeeClass) }, [employeeClass, validate])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">ข้อมูลพนักงาน (Employee Info)</h2>
        <p className="text-sm text-gray-500 mt-1">
          กำหนดประเภทพนักงานสำหรับการจ้างงานใหม่ครั้งนี้
        </p>
      </div>

      <fieldset>
        <label htmlFor="rehire-employee-class" className="block text-sm font-medium text-gray-700 mb-1">
          ประเภทพนักงาน (Employee Class)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <select
          id="rehire-employee-class"
          required
          aria-required="true"
          aria-invalid={touched && !!error}
          aria-describedby={touched && error ? 'rehire-eclass-error' : undefined}
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
          {EMPLOYEE_CLASSES_LIFECYCLE.map((cls) => (
            <option key={cls} value={cls}>{EMPLOYEE_CLASS_LABELS[cls]}</option>
          ))}
        </select>
        {touched && error && (
          <p id="rehire-eclass-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
