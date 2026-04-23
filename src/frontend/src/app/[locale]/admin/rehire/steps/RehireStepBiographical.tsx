'use client'

// RehireStepBiographical.tsx — Rehire Wizard Step 3
// ข้อมูลประวัติ: ตรวจสอบ/แก้ไขวันเกิด (pre-fill จาก PerPersonal ที่มีอยู่)
// schema: rehireStep3Schema — dateOfBirth required
import { useState, useEffect, useCallback } from 'react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import { rehireStep3Schema } from '@/lib/admin/validation/lifecycleSchema'

export default function RehireStepBiographical() {
  const { active, setStepData } = useLifecycleWizard()

  // guard: ต้องอยู่ใน rehire flow
  if (!active || active.flow !== 'rehire') return null

  const { dateOfBirth } = active.formData.step3
  const emp = active.formData.step1.selectedEmployee

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dob, setDob]         = useState<string>(dateOfBirth ?? '')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [touched, setTouched] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError]     = useState<string | undefined>()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const validate = useCallback(
    (val: string) => {
      const result = rehireStep3Schema.safeParse({ dateOfBirth: val || undefined })
      if (result.success) {
        setError(undefined)
        setStepData('rehire', 3, { dateOfBirth: val })
      } else {
        setError(result.error.issues[0]?.message)
      }
    },
    [setStepData]
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { validate(dob) }, [dob, validate])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">ข้อมูลประวัติ (Biographical)</h2>
        <p className="text-sm text-gray-500 mt-1">
          ตรวจสอบและแก้ไขข้อมูลประวัติที่นำมาจากระบบ (pre-filled จาก PerPersonal)
        </p>
      </div>

      {/* แสดงข้อมูล read-only จากพนักงานที่เลือก */}
      {emp && (
        <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">ข้อมูลจากระบบ (read-only)</p>
          <p>
            <span className="text-gray-500 w-32 inline-block">ชื่อ-นามสกุล:</span>
            <span className="font-medium text-gray-800">
              {emp.firstName.th} {emp.lastName.th}
            </span>
          </p>
          <p>
            <span className="text-gray-500 w-32 inline-block">รหัสพนักงาน:</span>
            <span className="font-medium text-gray-800">{emp.externalCode}</span>
          </p>
          <p>
            <span className="text-gray-500 w-32 inline-block">เลขบัตรประชาชน:</span>
            <span className="font-medium text-gray-800">{emp.nationalId}</span>
          </p>
        </div>
      )}

      {/* วันเกิด — editable (allow override) */}
      <fieldset>
        <label htmlFor="rehire-dob" className="block text-sm font-medium text-gray-700 mb-1">
          วันเกิด (Date of Birth)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <input
          id="rehire-dob"
          type="date"
          required
          aria-required="true"
          aria-invalid={touched && !!error}
          aria-describedby={touched && error ? 'dob-error' : undefined}
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          onBlur={() => setTouched(true)}
          className={[
            'rounded-md border px-3 py-2 text-sm bg-white text-gray-900',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            touched && error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
          ].join(' ')}
        />
        {touched && error && (
          <p id="dob-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>
        )}
        <p className="mt-1 text-xs text-gray-400">
          * ค่านี้ pre-filled จาก PerPersonal — แก้ไขได้หากมีการเปลี่ยนแปลง
        </p>
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
