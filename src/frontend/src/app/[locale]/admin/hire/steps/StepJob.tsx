'use client'

// StepJob.tsx — Step 7: ข้อมูลงาน (Job)
// Fields: position text (required) + businessUnit dropdown 44 options (required)
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepJobSchema } from '@/lib/admin/validation/hireSchema'
import { loadBusinessUnits } from '@/lib/admin/store/loadBusinessUnits'
import type { BusinessUnit } from '@/lib/admin/store/loadBusinessUnits'

export interface StepJobProps {
  onValidChange?: (isValid: boolean) => void
}

export default function StepJob({ onValidChange }: StepJobProps) {
  const { formData, setStepData } = useHireWizard()
  const job = formData.job

  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([])
  useEffect(() => {
    try { setBusinessUnits(loadBusinessUnits()) }
    catch (err) { console.warn('[StepJob] loadBusinessUnits ล้มเหลว:', err) }
  }, [])

  const [position, setPosition]         = useState(job.position)
  const [businessUnit, setBusinessUnit] = useState<string>(job.businessUnit ?? '')
  const [touched, setTouched]           = useState({ position: false, businessUnit: false })
  const [errors, setErrors]             = useState<{ position?: string; businessUnit?: string }>({})

  const touch = (field: keyof typeof touched) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  const validate = useCallback(
    (pos: string, bu: string) => {
      const result = stepJobSchema.safeParse({
        position: pos || undefined,
        businessUnit: bu || undefined,
      })
      if (result.success) {
        setErrors({})
        setStepData('job', { position: pos, businessUnit: bu || null })
        onValidChange?.(true)
      } else {
        const fe: typeof errors = {}
        for (const issue of result.error.issues) {
          const f = issue.path[0] as keyof typeof fe
          if (!fe[f]) fe[f] = issue.message
        }
        setErrors(fe)
        onValidChange?.(false)
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => { validate(position, businessUnit) }, [position, businessUnit, validate])

  const inputCls = (err?: string) =>
    ['w-full max-w-sm rounded-md border px-3 py-2 text-sm',
     'focus:outline-none focus:ring-2 focus:ring-blue-500',
     err ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'].join(' ')

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">ขั้นตอนที่ 7 — ข้อมูลงาน (Job)</h2>

      {/* ตำแหน่งงาน */}
      <fieldset>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
          ตำแหน่งงาน (Position)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <input id="position" type="text" required aria-required="true"
          aria-invalid={touched.position && !!errors.position}
          placeholder="ระบุตำแหน่งงาน" value={position}
          onChange={(e) => setPosition(e.target.value)}
          onBlur={() => touch('position')}
          className={inputCls(touched.position ? errors.position : undefined)} />
        {touched.position && errors.position && (
          <p role="alert" className="mt-1 text-xs text-red-600">{errors.position}</p>)}
      </fieldset>

      {/* Business Unit dropdown */}
      <fieldset>
        <label htmlFor="business-unit" className="block text-sm font-medium text-gray-700 mb-1">
          หน่วยธุรกิจ (Business Unit)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <select id="business-unit" required aria-required="true"
          aria-invalid={touched.businessUnit && !!errors.businessUnit}
          value={businessUnit}
          onChange={(e) => setBusinessUnit(e.target.value)}
          onBlur={() => touch('businessUnit')}
          className={[inputCls(touched.businessUnit ? errors.businessUnit : undefined), 'bg-white text-gray-900'].join(' ')}>
          <option value="">— เลือกหน่วยธุรกิจ —</option>
          {businessUnits.map((bu) => (
            <option key={bu.code} value={bu.code}>
              {bu.code} — {bu.labelTh || bu.labelEn}
            </option>
          ))}
        </select>
        {touched.businessUnit && errors.businessUnit && (
          <p role="alert" className="mt-1 text-xs text-red-600">{errors.businessUnit}</p>)}
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
