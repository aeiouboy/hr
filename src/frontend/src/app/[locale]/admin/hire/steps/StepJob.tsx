'use client'

// StepJob.tsx — Step 7: ข้อมูลงาน
// Fields: position text (required) + businessUnit dropdown 44 options (required)
//         + storeBranchCode (optional) + hrDistrict (optional) — audit A6/#11
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepJobSchema } from '@/lib/admin/validation/hireSchema'
import { loadBusinessUnits } from '@/lib/admin/store/loadBusinessUnits'
import type { BusinessUnit } from '@/lib/admin/store/loadBusinessUnits'
import { PICKLIST_CORPORATE_TITLE } from '@hrms/shared/picklists'

// Retail picklists — audit A6/#11 (8 store codes + 5 HR districts)
const STORE_BRANCH_OPTIONS = [
  { value: 'CDS-CTW', label: 'CDS-CTW — CentralWorld' },
  { value: 'CDS-CPN', label: 'CDS-CPN — CPN Pinklao' },
  { value: 'CDS-RMA', label: 'CDS-RMA — CRC Rama 9' },
  { value: 'ROB-CLN', label: 'ROB-CLN — Robinson Chaeng Watthana' },
  { value: 'ROB-RMA', label: 'ROB-RMA — Robinson Rama 9' },
  { value: 'ROB-UPC', label: 'ROB-UPC — Robinson Chiang Mai' },
  { value: 'CDS-PAT', label: 'CDS-PAT — CRC Pattaya' },
  { value: 'ROB-KON', label: 'ROB-KON — Robinson Khon Kaen' },
]

const HR_DISTRICT_OPTIONS = [
  { value: 'D-BKK-1', label: 'D-BKK-1 — กรุงเทพ โซน 1' },
  { value: 'D-BKK-2', label: 'D-BKK-2 — กรุงเทพ โซน 2' },
  { value: 'D-CNX-N', label: 'D-CNX-N — เชียงใหม่ / ภาคเหนือ' },
  { value: 'D-UPC-N', label: 'D-UPC-N — ต่างจังหวัด ภาคเหนือ' },
  { value: 'D-EAS-E', label: 'D-EAS-E — ภาคตะวันออก' },
]

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

  const [position, setPosition]               = useState(job.position)
  const [businessUnit, setBusinessUnit]       = useState<string>(job.businessUnit ?? '')
  const [storeBranchCode, setStoreBranchCode] = useState<string>(job.storeBranchCode ?? '')
  const [hrDistrict, setHrDistrict]           = useState<string>(job.hrDistrict ?? '')
  const [touched, setTouched]                 = useState({ position: false, businessUnit: false })
  const [errors, setErrors]                   = useState<{ position?: string; businessUnit?: string }>({})

  const touch = (field: keyof typeof touched) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  const validate = useCallback(
    (pos: string, bu: string, sbc: string, hrd: string) => {
      const result = stepJobSchema.safeParse({
        position: pos || undefined,
        businessUnit: bu || undefined,
      })
      if (result.success) {
        setErrors({})
        setStepData('job', {
          position: pos,
          businessUnit: bu || null,
          storeBranchCode: sbc || null,
          hrDistrict: hrd || null,
        })
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

  useEffect(() => {
    validate(position, businessUnit, storeBranchCode, hrDistrict)
  }, [position, businessUnit, storeBranchCode, hrDistrict, validate])

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
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
          className="humi-input w-full" />
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
          className="humi-select w-full">
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

      {/* Corporate Title — audit A7/#12 — wired to SF PICKLIST_CORPORATE_TITLE (17 items) */}
      <fieldset>
        <label htmlFor="corporate-title" className="humi-label">ระดับองค์กร</label>
        <select id="corporate-title" className="humi-select w-full">
          <option value="">— เลือกระดับองค์กร —</option>
          {PICKLIST_CORPORATE_TITLE.filter((c) => c.active).map((c) => (
            <option key={c.id} value={c.id}>{c.labelTh}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-ink-faint">สำหรับ promotion ladder — ระดับองค์กร ≠ ตำแหน่งงาน</p>
      </fieldset>

      {/* Job Grade — audit #12 (JG-02/04/06/08/10) — mockup stub */}
      <fieldset>
        <label htmlFor="job-grade" className="humi-label">เกรดงาน (JG)</label>
        <select id="job-grade" className="humi-select w-full">
          <option value="">— เลือกเกรดงาน —</option>
          <option value="JG-02">JG-02</option>
          <option value="JG-04">JG-04</option>
          <option value="JG-06">JG-06</option>
          <option value="JG-08">JG-08</option>
          <option value="JG-10">JG-10</option>
        </select>
      </fieldset>

      {/* Store / Branch — retail optional — audit A6/#11 */}
      <fieldset>
        <label htmlFor="store-branch-code" className="humi-label">สาขา/หน่วยงาน</label>
        <select id="store-branch-code"
          value={storeBranchCode}
          onChange={(e) => setStoreBranchCode(e.target.value)}
          className="humi-select w-full">
          <option value="">— ไม่ระบุ / ไม่ใช่สาขา —</option>
          {STORE_BRANCH_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </fieldset>

      {/* HR District — retail optional — audit A6/#11 */}
      <fieldset>
        <label htmlFor="hr-district" className="humi-label">เขต HR</label>
        <select id="hr-district"
          value={hrDistrict}
          onChange={(e) => setHrDistrict(e.target.value)}
          className="humi-select w-full">
          <option value="">— ไม่ระบุ / ไม่ใช่สาขา —</option>
          {HR_DISTRICT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </fieldset>
    </div>
  )
}
