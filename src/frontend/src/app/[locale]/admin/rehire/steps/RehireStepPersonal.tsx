'use client'

// RehireStepPersonal.tsx — Rehire Wizard Step 5
// ที่อยู่: pre-fill จาก PerPersonal ที่มีอยู่แล้ว, allow edit
// schema: rehireStep5Schema — addressLine1 required
import { useState, useEffect, useCallback } from 'react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import { rehireStep5Schema } from '@/lib/admin/validation/lifecycleSchema'

export default function RehireStepPersonal() {
  const { active, setStepData } = useLifecycleWizard()

  // guard: ต้องอยู่ใน rehire flow
  if (!active || active.flow !== 'rehire') return null

  const { addressLine1: storedAddr } = active.formData.step5

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [addressLine1, setAddressLine1] = useState(storedAddr)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [touched, setTouched]           = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError]               = useState<string | undefined>()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const validate = useCallback(
    (addr: string) => {
      const result = rehireStep5Schema.safeParse({ addressLine1: addr || undefined })
      if (result.success) {
        setError(undefined)
        setStepData('rehire', 5, { addressLine1: addr })
      } else {
        setError(result.error.issues[0]?.message)
      }
    },
    [setStepData]
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { validate(addressLine1) }, [addressLine1, validate])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">ที่อยู่ (Personal Address)</h2>
        <p className="text-sm text-gray-500 mt-1">
          ตรวจสอบและแก้ไขที่อยู่ปัจจุบัน (pre-filled จาก PerPersonal)
        </p>
      </div>

      <fieldset>
        <label htmlFor="rehire-address-line1" className="block text-sm font-medium text-gray-700 mb-1">
          ที่อยู่ (Address Line 1)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <input
          id="rehire-address-line1"
          type="text"
          required
          aria-required="true"
          aria-invalid={touched && !!error}
          aria-describedby={touched && error ? 'rehire-addr-error' : undefined}
          placeholder="บ้านเลขที่ ถนน แขวง เขต จังหวัด รหัสไปรษณีย์"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          onBlur={() => setTouched(true)}
          className={[
            'w-full max-w-lg rounded-md border px-3 py-2 text-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            touched && error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
          ].join(' ')}
        />
        {touched && error && (
          <p id="rehire-addr-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>
        )}
        <p className="mt-1 text-xs text-gray-400">
          * ค่านี้ pre-filled จาก PerPersonal — แก้ไขได้หากที่อยู่เปลี่ยนแปลง
        </p>
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
