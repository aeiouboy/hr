'use client'

// StepName.tsx — Step 2: ชื่อ-นามสกุล (Name)
// Fields: firstNameTh, lastNameTh (required) + firstNameEn, lastNameEn (optional)
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepNameSchema } from '@/lib/admin/validation/hireSchema'

export interface StepNameProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepName({ onValidChange }: StepNameProps) {
  const { formData, setStepData } = useHireWizard()
  const name = formData.name

  const [firstNameTh, setFirstNameTh] = useState(name.firstNameTh)
  const [lastNameTh, setLastNameTh]   = useState(name.lastNameTh)
  const [firstNameEn, setFirstNameEn] = useState(name.firstNameEn)
  const [lastNameEn, setLastNameEn]   = useState(name.lastNameEn)

  const [touched, setTouched] = useState({ firstNameTh: false, lastNameTh: false })
  const [errors, setErrors]   = useState<{ firstNameTh?: string; lastNameTh?: string }>({})

  const touch = (field: keyof typeof touched) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  const validate = useCallback(
    (fTh: string, lTh: string, fEn: string, lEn: string) => {
      const result = stepNameSchema.safeParse({
        firstNameTh: fTh || undefined,
        lastNameTh: lTh || undefined,
        firstNameEn: fEn,
        lastNameEn: lEn,
      })
      if (result.success) {
        setErrors({})
        setStepData('name', { firstNameTh: fTh, lastNameTh: lTh, firstNameEn: fEn, lastNameEn: lEn })
        onValidChange?.(true)
      } else {
        const fieldErrors: typeof errors = {}
        for (const issue of result.error.issues) {
          const f = issue.path[0] as keyof typeof fieldErrors
          if (!fieldErrors[f]) fieldErrors[f] = issue.message
        }
        setErrors(fieldErrors)
        onValidChange?.(false)
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => { validate(firstNameTh, lastNameTh, firstNameEn, lastNameEn) },
    [firstNameTh, lastNameTh, firstNameEn, lastNameEn, validate])

  const inputCls = (field?: string) =>
    ['w-full max-w-sm rounded-md border px-3 py-2 text-sm',
     'focus:outline-none focus:ring-2 focus:ring-blue-500',
     field ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'].join(' ')

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">ขั้นตอนที่ 2 — ชื่อ-นามสกุล (Name)</h2>

      {/* ชื่อภาษาไทย — required */}
      <fieldset>
        <label htmlFor="first-name-th" className="block text-sm font-medium text-gray-700 mb-1">
          ชื่อ (ภาษาไทย)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <input id="first-name-th" type="text" required aria-required="true"
          aria-invalid={touched.firstNameTh && !!errors.firstNameTh}
          placeholder="ชื่อภาษาไทย" value={firstNameTh}
          onChange={(e) => setFirstNameTh(e.target.value)}
          onBlur={() => touch('firstNameTh')}
          className={inputCls(touched.firstNameTh ? errors.firstNameTh : undefined)} />
        {touched.firstNameTh && errors.firstNameTh && (
          <p role="alert" className="mt-1 text-xs text-red-600">{errors.firstNameTh}</p>)}
      </fieldset>

      {/* นามสกุลภาษาไทย — required */}
      <fieldset>
        <label htmlFor="last-name-th" className="block text-sm font-medium text-gray-700 mb-1">
          นามสกุล (ภาษาไทย)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <input id="last-name-th" type="text" required aria-required="true"
          aria-invalid={touched.lastNameTh && !!errors.lastNameTh}
          placeholder="นามสกุลภาษาไทย" value={lastNameTh}
          onChange={(e) => setLastNameTh(e.target.value)}
          onBlur={() => touch('lastNameTh')}
          className={inputCls(touched.lastNameTh ? errors.lastNameTh : undefined)} />
        {touched.lastNameTh && errors.lastNameTh && (
          <p role="alert" className="mt-1 text-xs text-red-600">{errors.lastNameTh}</p>)}
      </fieldset>

      {/* ชื่อภาษาอังกฤษ — optional */}
      <fieldset>
        <label htmlFor="first-name-en" className="block text-sm font-medium text-gray-700 mb-1">
          ชื่อ (ภาษาอังกฤษ)
        </label>
        <input id="first-name-en" type="text" placeholder="First name (optional)" value={firstNameEn}
          onChange={(e) => setFirstNameEn(e.target.value)}
          className={inputCls()} />
      </fieldset>

      {/* นามสกุลภาษาอังกฤษ — optional */}
      <fieldset>
        <label htmlFor="last-name-en" className="block text-sm font-medium text-gray-700 mb-1">
          นามสกุล (ภาษาอังกฤษ)
        </label>
        <input id="last-name-en" type="text" placeholder="Last name (optional)" value={lastNameEn}
          onChange={(e) => setLastNameEn(e.target.value)}
          className={inputCls()} />
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
