'use client'

// StepEmployeeInfo.tsx — Step 4: ข้อมูลพนักงาน
// Fields: employeeClass dropdown A-H — required
// Area C: Employment Details (originalStartDate, seniorityStartDate, retirementDate, pfServiceDate, dvtPreviousId, cgPreviousEmployeeId, age Y/M/D)
// Labels verbatim จาก spec Appendix 3 (C8: ห้าม invent)
// Picklist source: @hrms/shared/picklists (C7: single source of truth)
import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepEmployeeInfoSchema, EMPLOYEE_CLASSES } from '@/lib/admin/validation/hireSchema'
import { PICKLIST_EMPLOYEE_CLASS } from '@hrms/shared/picklists'

export interface StepEmployeeInfoProps {
  onValidChange?: (isValid: boolean) => void
}

// คำนวณอายุ Y/M/D จาก date of birth string
function calcAgeYMD(dob: string): string {
  if (!dob) return '—'
  const birth = new Date(dob)
  const now = new Date()
  let y = now.getFullYear() - birth.getFullYear()
  let m = now.getMonth() - birth.getMonth()
  let d = now.getDate() - birth.getDate()
  if (d < 0) { m--; d += 30 }
  if (m < 0) { y--; m += 12 }
  return `${y} ปี ${m} เดือน ${d} วัน`
}

// คำนวณวันเกษียณ (DOB + 60 ปี)
function calcRetirementDate(dob: string): string {
  if (!dob) return ''
  const birth = new Date(dob)
  birth.setFullYear(birth.getFullYear() + 60)
  return birth.toISOString().split('T')[0]
}

export default function StepEmployeeInfo({ onValidChange }: StepEmployeeInfoProps) {
  const { formData, setStepData } = useHireWizard()
  const [employeeClass, setEmployeeClass] = useState<string>(formData.employeeInfo.employeeClass ?? '')
  const [touched, setTouched]             = useState(false)
  const [error, setError]                 = useState<string | undefined>()

  // Employment Details state (Area C — SF Image 15)
  const hireDate = formData.identity.hireDate ?? ''
  const dob      = formData.identity.dateOfBirth ?? ''
  const [originalStartDate,    setOriginalStartDate]    = useState<string>(formData.employeeInfo.originalStartDate || hireDate)
  const [seniorityStartDate,   setSeniorityStartDate]   = useState<string>(formData.employeeInfo.seniorityStartDate || hireDate)
  const [retirementDate,       setRetirementDate]       = useState<string>(formData.employeeInfo.retirementDate || calcRetirementDate(dob))
  const [pfServiceDate,        setPfServiceDate]        = useState<string>(formData.employeeInfo.pfServiceDate ?? '')
  const [dvtPreviousId,        setDvtPreviousId]        = useState<string>(formData.employeeInfo.dvtPreviousId ?? '')
  const [cgPreviousEmployeeId, setCgPreviousEmployeeId] = useState<string>(formData.employeeInfo.cgPreviousEmployeeId ?? '')

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

  // Sync Employment Details to store
  useEffect(() => {
    setStepData('employeeInfo', {
      originalStartDate,
      seniorityStartDate,
      retirementDate,
      pfServiceDate,
      dvtPreviousId,
      cgPreviousEmployeeId,
    })
  }, [originalStartDate, seniorityStartDate, retirementDate, pfServiceDate,
      dvtPreviousId, cgPreviousEmployeeId, setStepData])

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
      <fieldset>
        <label htmlFor="employee-class" className="humi-label">
          ประเภทพนักงาน<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
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
          className="humi-select w-full"
        >
          <option value="">— เลือกประเภทพนักงาน —</option>
          {PICKLIST_EMPLOYEE_CLASS.filter((item) => item.active).map((item) => (
            <option key={item.id} value={item.id}>{item.labelTh}</option>
          ))}
        </select>
        {touched && error && (
          <p id="eclass-error" role="alert" className="mt-1 text-xs text-warning">{error}</p>
        )}
      </fieldset>

      {/* ── Employment Details (Area C — SF Image 15) ──────────────────────── */}
      <fieldset className="md:col-span-2 mt-4 pt-4 border-t border-hairline-soft">
        <legend className="humi-section-legend text-sm font-semibold text-ink mb-3">รายละเอียดการจ้างงาน</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

          {/* วันที่เริ่มงานดั้งเดิม */}
          <fieldset>
            <label htmlFor="original-start-date" className="humi-label">วันที่เริ่มงานดั้งเดิม</label>
            <input
              id="original-start-date"
              type="date"
              value={originalStartDate}
              onChange={(e) => setOriginalStartDate(e.target.value)}
              className="humi-input w-full"
            />
          </fieldset>

          {/* วันที่เริ่มนับอาวุโส */}
          <fieldset>
            <label htmlFor="seniority-start-date" className="humi-label">วันที่เริ่มนับอาวุโส</label>
            <input
              id="seniority-start-date"
              type="date"
              value={seniorityStartDate}
              onChange={(e) => setSeniorityStartDate(e.target.value)}
              className="humi-input w-full"
            />
          </fieldset>

          {/* วันเกษียณ (DOB + 60 ปี) */}
          <fieldset>
            <label htmlFor="retirement-date" className="humi-label">
              วันเกษียณ <span className="text-xs text-ink-muted ml-1">(DOB + 60 ปี)</span>
            </label>
            <input
              id="retirement-date"
              type="date"
              value={retirementDate}
              readOnly
              className="humi-input w-full bg-canvas-soft"
            />
          </fieldset>

          {/* วันที่เริ่มต้นกองทุนสำรองเลี้ยงชีพ */}
          <fieldset>
            <label htmlFor="pf-service-date" className="humi-label">วันที่เริ่มต้น PF</label>
            <input
              id="pf-service-date"
              type="date"
              value={pfServiceDate}
              onChange={(e) => setPfServiceDate(e.target.value)}
              className="humi-input w-full"
            />
          </fieldset>

          {/* รหัสพนักงานเดิม DVT */}
          <fieldset>
            <label htmlFor="dvt-prev-id" className="humi-label">รหัสพนักงานเดิม (DVT)</label>
            <input
              id="dvt-prev-id"
              type="text"
              value={dvtPreviousId}
              onChange={(e) => setDvtPreviousId(e.target.value)}
              placeholder="ระบุถ้ามี"
              className="humi-input w-full"
            />
          </fieldset>

          {/* รหัสพนักงาน CG เดิม */}
          <fieldset>
            <label htmlFor="cg-prev-id" className="humi-label">รหัสพนักงาน CG เดิม</label>
            <input
              id="cg-prev-id"
              type="text"
              value={cgPreviousEmployeeId}
              onChange={(e) => setCgPreviousEmployeeId(e.target.value)}
              placeholder="ระบุถ้ามี"
              className="humi-input w-full"
            />
          </fieldset>

          {/* อายุพนักงาน (computed from DOB) */}
          <fieldset className="md:col-span-2">
            <label className="humi-label">
              อายุพนักงาน <span className="text-xs text-ink-muted ml-1">(คำนวณจากวันเกิด)</span>
            </label>
            <div className="humi-input w-full bg-canvas-soft text-ink-muted">
              {calcAgeYMD(dob)}
            </div>
          </fieldset>

        </div>
      </fieldset>
    </div>
  )
}
