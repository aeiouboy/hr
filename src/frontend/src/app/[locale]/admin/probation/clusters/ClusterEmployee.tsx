'use client'

// clusters/ClusterEmployee.tsx — Probation Wizard Step 1
//
// Shows employee lookup + probation date fields.
// Fields sourced from getFieldsByFlow('probation') + identity cross-flow fields.
//
// Field catalog grounding (BRD #117):
//   - employeeId        — admin selects which employee to assess (UI-only, not in catalog)
//   - probationEndDate  — EC_EMP_JOB.PROBATION_PERIOD_END_DATE (catalog: probationPeriodEndDate)
//   - hireDate          — display-only reference (catalog: hireDate)
//   - companyCode       — display-only reference (catalog: companyCode)
//
// Note: YES_NO picklist (passProbation) lives in Step 2 (ClusterAssessment).

import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { Search, CalendarDays } from 'lucide-react'
import { useProbationWizard } from '../store'

export default function ClusterEmployee() {
  const { formData, setStepData } = useProbationWizard()
  const { job } = formData

  return (
    <div className="space-y-5">
      {/* Card 1: Employee lookup */}
      <div className="humi-card">
        <SectionHeader
          icon={Search}
          eyebrow="Employee"
          title="พนักงานที่ประเมิน"
          sub="ระบุรหัสพนักงานที่จะประเมินผลทดลองงาน"
        />
        <div className="humi-step-section">
          <div className="humi-row" style={{ flexDirection: 'column', gap: 16 }}>
            {/* Employee ID */}
            <div>
              <label className="humi-label" htmlFor="probation-employee-id">
                รหัสพนักงาน <span className="humi-asterisk">*</span>
              </label>
              <input
                id="probation-employee-id"
                type="text"
                className="humi-input"
                placeholder="เช่น 10001234"
                value={job.employeeId ?? ''}
                onChange={(e) =>
                  setStepData('job', { employeeId: e.target.value || null })
                }
                aria-required="true"
              />
            </div>

            {/* Company code — display reference */}
            <div>
              <label className="humi-label" htmlFor="probation-company">
                บริษัท (อ้างอิง)
              </label>
              <input
                id="probation-company"
                type="text"
                className="humi-input"
                placeholder="โหลดอัตโนมัติเมื่อเลือกพนักงาน"
                value={job.companyCode ?? ''}
                readOnly
                aria-readonly="true"
                style={{ color: 'var(--color-ink-muted)' }}
              />
            </div>

            {/* Hire date — display reference */}
            <div>
              <label className="humi-label" htmlFor="probation-hire-date">
                วันที่เข้างาน (อ้างอิง)
              </label>
              <input
                id="probation-hire-date"
                type="date"
                className="humi-input"
                value={job.hireDate ?? ''}
                readOnly
                aria-readonly="true"
                style={{ color: 'var(--color-ink-muted)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Probation dates — BRD #117 */}
      <div className="humi-card">
        <SectionHeader
          icon={CalendarDays}
          eyebrow="Probation Dates"
          title="วันสิ้นสุดทดลองงาน"
          sub="EC_EMP_JOB.PROBATION_PERIOD_END_DATE (BRD #117)"
        />
        <div className="humi-step-section">
          <div>
            <label className="humi-label" htmlFor="probation-end-date">
              วันสิ้นสุดช่วงทดลองงาน <span className="humi-asterisk">*</span>
            </label>
            <input
              id="probation-end-date"
              type="date"
              className="humi-input"
              value={job.probationEndDate ?? ''}
              onChange={(e) =>
                setStepData('job', { probationEndDate: e.target.value || null })
              }
              aria-required="true"
            />
            <p style={{ marginTop: 6, fontSize: 12, color: 'var(--color-ink-muted)' }}>
              วันที่สิ้นสุดระยะทดลองงาน — ใช้ยืนยันว่าการทดลองงานครบกำหนดแล้ว
            </p>
          </div>
        </div>
      </div>

      <p className="humi-required-note">
        <span className="humi-asterisk">*</span>
        ช่องที่บังคับกรอก
      </p>
    </div>
  )
}
