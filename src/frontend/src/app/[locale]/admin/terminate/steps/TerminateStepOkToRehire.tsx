'use client'

// TerminateStepOkToRehire.tsx — Terminate Wizard Step 3
// OK to Rehire flag + ความเห็นเพิ่มเติม (BRD #111 + #172)
// schema: terminateStep3Schema — okToRehire boolean + termComments string
import { useState, useEffect, useCallback } from 'react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import { terminateStep3Schema } from '@/lib/admin/validation/lifecycleSchema'

export default function TerminateStepOkToRehire() {
  const { active, setStepData } = useLifecycleWizard()

  // guard: ต้องอยู่ใน terminate flow
  if (!active || active.flow !== 'terminate') return null

  const { okToRehire, termComments } = active.formData.step3
  const emp                          = active.formData.step1.selectedEmployee

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [okVal, setOkVal]           = useState<boolean>(okToRehire)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [comments, setComments]     = useState<string>(termComments)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [touched, setTouched]       = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError]           = useState<string | undefined>()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const validate = useCallback(
    (ok: boolean, cmt: string) => {
      const result = terminateStep3Schema.safeParse({ okToRehire: ok, termComments: cmt })
      if (result.success) {
        setError(undefined)
        setStepData('terminate', 3, { okToRehire: ok, termComments: cmt })
      } else {
        setError(result.error.issues[0]?.message)
        console.warn('[TerminateStepOkToRehire] validation error:', result.error.issues)
      }
    },
    [setStepData]
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { validate(okVal, comments) }, [okVal, comments, validate])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">OK to Rehire</h2>
        <p className="text-sm text-gray-500 mt-1">
          กำหนดว่าพนักงานนี้ได้รับอนุญาตให้จ้างใหม่ในอนาคตหรือไม่ (BRD #172)
        </p>
      </div>

      {/* แสดงชื่อพนักงาน */}
      {emp && (
        <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
          <span className="text-gray-500">พนักงาน: </span>
          <span className="font-medium text-gray-800">
            {emp.firstName.th} {emp.lastName.th} ({emp.externalCode})
          </span>
        </div>
      )}

      {/* OK to Rehire toggle */}
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">
          อนุญาตจ้างงานใหม่<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </legend>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="ok-to-rehire"
              value="yes"
              checked={okVal === true}
              onChange={() => setOkVal(true)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              aria-required="true"
            />
            <span className="text-sm text-gray-700">
              <span className="font-medium text-green-700">Yes</span> — อนุญาตให้จ้างงานใหม่ได้
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="ok-to-rehire"
              value="no"
              checked={okVal === false}
              onChange={() => setOkVal(false)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              <span className="font-medium text-red-700">No</span> — ไม่อนุญาตให้จ้างงานใหม่
            </span>
          </label>
        </div>
        {error && (
          <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </fieldset>

      {/* คำเตือนกรณี No */}
      {okVal === false && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-md border border-red-300 bg-red-50 px-4 py-3"
        >
          <span className="text-red-500 text-lg leading-none mt-0.5" aria-hidden="true">!</span>
          <p className="text-sm text-red-800">
            การตั้งค่า OK to Rehire = No จะถูกบันทึกใน SuccessFactors และใช้กรอง
            พนักงานในกระบวนการ Rehire ในอนาคต
          </p>
        </div>
      )}

      {/* ความเห็นเพิ่มเติม */}
      <fieldset>
        <label htmlFor="term-comments" className="block text-sm font-medium text-gray-700 mb-1">
          ความเห็นเพิ่มเติม (Comments)
          <span className="ml-1 text-xs text-gray-400">(ไม่บังคับ)</span>
        </label>
        <textarea
          id="term-comments"
          rows={3}
          placeholder="ระบุเหตุผลหรือหมายเหตุเพิ่มเติม (ถ้ามี)"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          onBlur={() => setTouched(true)}
          className={[
            'w-full max-w-lg rounded-md border px-3 py-2 text-sm resize-none',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300',
          ].join(' ')}
        />
        <p className="mt-1 text-xs text-gray-400">
          ความเห็นนี้จะถูกบันทึกใน SuccessFactors ร่วมกับ Event Termination
        </p>
        {/* suppress unused touched warning */}
        {touched && null}
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
