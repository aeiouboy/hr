'use client'

// StepJob.tsx — Step 7: ข้อมูลงาน
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

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink">ขั้นตอนที่ 7 — ข้อมูลงาน</h2>

      {/* ตำแหน่งงาน */}
      <fieldset>
        <label htmlFor="position" className="humi-label">
          ตำแหน่งงาน<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="position" type="text" required aria-required="true"
          aria-invalid={touched.position && !!errors.position}
          placeholder="ระบุตำแหน่งงาน" value={position}
          onChange={(e) => setPosition(e.target.value)}
          onBlur={() => touch('position')}
          className="humi-input w-full max-w-sm" />
        {touched.position && errors.position && (
          <p role="alert" className="mt-1 text-xs text-warning">{errors.position}</p>)}
      </fieldset>

      {/* Business Unit dropdown */}
      <fieldset>
        <label htmlFor="business-unit" className="humi-label">
          หน่วยธุรกิจ<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="business-unit" required aria-required="true"
          aria-invalid={touched.businessUnit && !!errors.businessUnit}
          value={businessUnit}
          onChange={(e) => setBusinessUnit(e.target.value)}
          onBlur={() => touch('businessUnit')}
          className="humi-select w-full max-w-sm">
          <option value="">— เลือกหน่วยธุรกิจ —</option>
          {businessUnits.map((bu) => (
            <option key={bu.code} value={bu.code}>
              {bu.code} — {bu.labelTh || bu.labelEn}
            </option>
          ))}
        </select>
        {touched.businessUnit && errors.businessUnit && (
          <p role="alert" className="mt-1 text-xs text-warning">{errors.businessUnit}</p>)}
      </fieldset>

      <p className="text-xs text-ink-soft"><span className="humi-asterisk">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}
