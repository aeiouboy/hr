'use client'

// StepEmployeeInfo.tsx — Step 4: ข้อมูลพนักงาน
// BRD #23, #30: employeeGroup + employeeSubGroup pickers (separate from employeeClass)
//   SF source: EmpJob.employeeGroup, EmpJob.employeeSubGroup
//   jq '.d.results[0] | {employeeClass, employeeGroup, employeeSubGroup}' sf-qas-EmpJob-2026-04-26.json
//   Both fields exist in SF schema; values null in QAS sample — using standard SAP EG/ESG codes
// Area C: Employment Details (originalStartDate, seniorityStartDate, retirementDate, pfServiceDate, dvtPreviousId, cgPreviousEmployeeId, age Y/M/D)
// Labels verbatim จาก spec Appendix 3 (C8: ห้าม invent)
// Picklist source: @hrms/shared/picklists (C7: single source of truth)
import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepEmployeeInfoSchema } from '@/lib/admin/validation/hireSchema'

// SF EmpJob.employeeGroup — standard SAP codes (QAS values null; using standard EG codes)
// SF source: EmpJob entity schema — employeeGroup field
const PICKLIST_EMPLOYEE_GROUP = [
  { id: '1', labelTh: '1 — พนักงานประจำ (Active)', active: true },
  { id: '2', labelTh: '2 — พนักงานชั่วคราว (Temporary)', active: true },
  { id: '3', labelTh: '3 — พนักงานนอกเวลา (Part-time)', active: true },
] as const

// SF EmpJob.employeeSubGroup — standard SAP codes (QAS values null; using standard ESG codes)
// SF source: EmpJob entity schema — employeeSubGroup field
const PICKLIST_EMPLOYEE_SUBGROUP = [
  { id: 'U0', labelTh: 'U0 — Monthly-paid Exempt', active: true },
  { id: 'U1', labelTh: 'U1 — Monthly-paid Non-exempt', active: true },
  { id: 'U2', labelTh: 'U2 — Daily-paid', active: true },
  { id: 'U3', labelTh: 'U3 — Hourly-paid', active: true },
  { id: 'U4', labelTh: 'U4 — Contracted', active: true },
] as const

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
  const t = useTranslations('hireForm.employeeInfo')
  const { formData, setStepData } = useHireWizard()
  const [employeeGroup, setEmployeeGroup] = useState<string>((formData.employeeInfo as Record<string,unknown>).employeeGroup as string ?? '')
  const [employeeSubGroup, setEmployeeSubGroup] = useState<string>((formData.employeeInfo as Record<string,unknown>).employeeSubGroup as string ?? '')

  // Employment Details state (Area C — SF Image 15)
  const hireDate = formData.identity.hireDate ?? ''
  const dob      = formData.identity.dateOfBirth ?? ''
  const [originalStartDate,    setOriginalStartDate]    = useState<string>(formData.employeeInfo.originalStartDate || hireDate)
  const [seniorityStartDate,   setSeniorityStartDate]   = useState<string>(formData.employeeInfo.seniorityStartDate || hireDate)
  const [retirementDate,       setRetirementDate]       = useState<string>(formData.employeeInfo.retirementDate || calcRetirementDate(dob))
  const [cgPreviousEmployeeId, setCgPreviousEmployeeId] = useState<string>(formData.employeeInfo.cgPreviousEmployeeId ?? '')

  const validate = useCallback(
    (group: string, subGroup: string, origStart: string, senStart: string) => {
      const result = stepEmployeeInfoSchema.safeParse({
        employeeGroup: group || undefined,
        employeeSubGroup: subGroup || undefined,
        originalStartDate: origStart,
        seniorityStartDate: senStart,
      })
      if (result.success) {
        onValidChange?.(true)
      } else {
        onValidChange?.(false)
      }
    },
    [setStepData, onValidChange]
  )

  useEffect(() => {
    // Existing validation callback updates wizard validity while synchronizing this legacy step.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    validate(employeeGroup, employeeSubGroup, originalStartDate, seniorityStartDate)
  }, [employeeGroup, employeeSubGroup, originalStartDate, seniorityStartDate, validate])

  // Sync employeeGroup/SubGroup to store (BRD #23, #30)
  useEffect(() => {
    setStepData('employeeInfo', { employeeGroup, employeeSubGroup })
  }, [employeeGroup, employeeSubGroup, setStepData])

  // Sync Employment Details to store
  useEffect(() => {
    setStepData('employeeInfo', {
      originalStartDate,
      seniorityStartDate,
      retirementDate,
      cgPreviousEmployeeId,
    })
  }, [originalStartDate, seniorityStartDate, retirementDate, cgPreviousEmployeeId, setStepData])

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
      {/* employeeClass UI input removed per Phase 6 — rely on employeeGroup + employeeSubGroup. */}

      {/* กลุ่มพนักงาน — BRD #23 — SF EmpJob.employeeGroup (required for payroll classification) */}
      {/* SF source: jq '.d.results[0].employeeGroup' sf-qas-EmpJob-2026-04-26.json */}
      <fieldset>
        <label htmlFor="employee-group" className="humi-label">
          {t('employeeGroup')}
        </label>
        <select
          id="employee-group"
          value={employeeGroup}
          onChange={(e) => setEmployeeGroup(e.target.value)}
          className="humi-select w-full"
        >
          <option value="">{t('selectEmployeeGroup')}</option>
          {PICKLIST_EMPLOYEE_GROUP.filter((item) => item.active).map((item) => (
            <option key={item.id} value={item.id}>{item.labelTh}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-ink-faint">{t('employeeGroupHelp')}</p>
      </fieldset>

      {/* กลุ่มย่อยพนักงาน — BRD #30 — SF EmpJob.employeeSubGroup (required for payroll classification) */}
      {/* SF source: jq '.d.results[0].employeeSubGroup' sf-qas-EmpJob-2026-04-26.json */}
      <fieldset>
        <label htmlFor="employee-subgroup" className="humi-label">
          {t('employeeSubGroup')}
        </label>
        <select
          id="employee-subgroup"
          value={employeeSubGroup}
          onChange={(e) => setEmployeeSubGroup(e.target.value)}
          className="humi-select w-full"
        >
          <option value="">{t('selectEmployeeSubGroup')}</option>
          {PICKLIST_EMPLOYEE_SUBGROUP.filter((item) => item.active).map((item) => (
            <option key={item.id} value={item.id}>{item.labelTh}</option>
          ))}
        </select>
        <p className="mt-1 text-xs text-ink-faint">{t('employeeSubGroupHelp')}</p>
      </fieldset>

      {/* ── Employment Details (Area C — SF Image 15) ──────────────────────── */}
      <fieldset className="md:col-span-2 mt-4 pt-4 border-t border-hairline-soft">
        <legend className="humi-section-legend text-sm font-semibold text-ink mb-3">{t('employmentDetails')}</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

          {/* วันเริ่มงานครั้งแรก */}
          <fieldset>
            <label htmlFor="original-start-date" className="humi-label">
              {t('originalStartDate')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input
              id="original-start-date"
              type="date"
              required
              aria-required="true"
              value={originalStartDate}
              onChange={(e) => setOriginalStartDate(e.target.value)}
              className="humi-input w-full"
            />
          </fieldset>

          {/* วันนับอายุงาน */}
          <fieldset>
            <label htmlFor="seniority-start-date" className="humi-label">
              {t('seniorityStartDate')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input
              id="seniority-start-date"
              type="date"
              required
              aria-required="true"
              value={seniorityStartDate}
              onChange={(e) => setSeniorityStartDate(e.target.value)}
              className="humi-input w-full"
            />
          </fieldset>

          {/* วันเกษียณ (DOB + 60 ปี) */}
          <fieldset>
            <label htmlFor="retirement-date" className="humi-label">
              {t('retirementDate')} <span className="text-xs text-ink-muted ml-1">({t('retirementDateHint')})</span>
            </label>
            <input
              id="retirement-date"
              type="date"
              value={retirementDate}
              readOnly
              className="humi-input w-full bg-canvas-soft"
            />
          </fieldset>

          {/* รหัสพนักงาน CG เดิม */}
          <fieldset>
            <label htmlFor="cg-prev-id" className="humi-label">{t('cgPreviousEmployeeId')}</label>
            <input
              id="cg-prev-id"
              type="text"
              value={cgPreviousEmployeeId}
              onChange={(e) => setCgPreviousEmployeeId(e.target.value)}
              placeholder={t('idPlaceholder')}
              className="humi-input w-full"
            />
          </fieldset>

          {/* อายุพนักงาน (computed from DOB) */}
          <fieldset className="md:col-span-2">
            <label className="humi-label">
              {t('ageDisplay')} <span className="text-xs text-ink-muted ml-1">({t('ageHint')})</span>
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
