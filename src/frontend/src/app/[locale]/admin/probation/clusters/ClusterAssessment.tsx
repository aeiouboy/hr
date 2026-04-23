'use client'

// clusters/ClusterAssessment.tsx — Probation Wizard Step 2
//
// Assessment outcome: Pass / Fail / Extend
// Fields from getFieldsByFlow('probation') section 'probation':
//   - passProbation         BRD #117 EC_EMP_JOB.PASS_PROBATION           (picklistId: YES_NO)
//   - extendedProbationDate BRD #117 EC_EMP_JOB.EXTENED_PROBATION_DATE   (conditional: EXTEND only)
//   - passProbationDate     BRD #117 EC_EMP_EMPLOYMENT.PASS_PROBATION_DATE_CONFIRM_DATE
//
// Note: YES_NO picklist not yet exported from @hrms/shared/picklists (F2 pending).
// Using inline constant until F2 is updated. Track via issue #14 ⚠️ PICKLIST_RISK.

import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { ClipboardCheck, CalendarDays } from 'lucide-react'
import { useProbationWizard } from '../store'

// ⚠️ YES_NO not yet in @hrms/shared/picklists — defined inline per README guidance.
// When F2 adds PICKLIST_YES_NO, replace this with:
//   import { PICKLIST_YES_NO } from '@hrms/shared/picklists'
const YES_NO_OPTIONS = [
  { id: 'YES', labelTh: 'ผ่านทดลองงาน', labelEn: 'Pass Probation' },
  { id: 'NO', labelTh: 'ไม่ผ่านทดลองงาน', labelEn: 'Unsuccessful Probation' },
  { id: 'EXTEND', labelTh: 'ต่อระยะทดลองงาน', labelEn: 'Extend Probation' },
] as const

export default function ClusterAssessment() {
  const { formData, setStepData } = useProbationWizard()
  const { assessment } = formData

  const isExtend = assessment.passProbation === 'EXTEND'
  const isPass = assessment.passProbation === 'YES'

  return (
    <div className="space-y-5">
      {/* Card 1: Pass/Fail/Extend — EC_EMP_JOB.PASS_PROBATION */}
      <div className="humi-card">
        <SectionHeader
          icon={ClipboardCheck}
          eyebrow="Assessment"
          title="ผลการทดลองงาน"
          sub="EC_EMP_JOB.PASS_PROBATION (BRD #117)"
        />
        <div className="humi-step-section">
          <div>
            <label className="humi-label" htmlFor="pass-probation">
              ผลการทดลองงาน <span className="humi-asterisk">*</span>
            </label>
            <select
              id="pass-probation"
              className="humi-select"
              value={assessment.passProbation ?? ''}
              onChange={(e) =>
                setStepData('assessment', {
                  passProbation: e.target.value || null,
                  // Clear conditional fields when outcome changes
                  extendedProbationDate: null,
                  passProbationConfirmDate: null,
                })
              }
              aria-required="true"
            >
              <option value="">-- เลือกผลการทดลองงาน --</option>
              {YES_NO_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.labelTh}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Card 2: Extended probation date — conditional (EC_EMP_JOB.EXTENED_PROBATION_DATE) */}
      {isExtend && (
        <div className="humi-card">
          <SectionHeader
            icon={CalendarDays}
            eyebrow="Extension"
            title="วันที่ขยายระยะทดลองงาน"
            sub="EC_EMP_JOB.EXTENED_PROBATION_DATE — แสดงเฉพาะเมื่อเลือก 'ต่อระยะ'"
          />
          <div className="humi-step-section">
            <div>
              <label className="humi-label" htmlFor="extended-probation-date">
                วันที่ขยายระยะทดลองงาน <span className="humi-asterisk">*</span>
              </label>
              <input
                id="extended-probation-date"
                type="date"
                className="humi-input"
                value={assessment.extendedProbationDate ?? ''}
                onChange={(e) =>
                  setStepData('assessment', { extendedProbationDate: e.target.value || null })
                }
                aria-required="true"
              />
            </div>
          </div>
        </div>
      )}

      {/* Card 3: Confirm date — EC_EMP_EMPLOYMENT.PASS_PROBATION_DATE_CONFIRM_DATE */}
      {isPass && (
        <div className="humi-card">
          <SectionHeader
            icon={CalendarDays}
            eyebrow="Confirmation"
            title="วันที่ยืนยันผ่านทดลองงาน"
            sub="EC_EMP_EMPLOYMENT.PASS_PROBATION_DATE_CONFIRM_DATE (BRD #117)"
          />
          <div className="humi-step-section">
            <div>
              <label className="humi-label" htmlFor="confirm-date">
                วันที่ผ่านทดลองงาน
              </label>
              <input
                id="confirm-date"
                type="date"
                className="humi-input"
                value={assessment.passProbationConfirmDate ?? ''}
                onChange={(e) =>
                  setStepData('assessment', { passProbationConfirmDate: e.target.value || null })
                }
              />
              <p style={{ marginTop: 6, fontSize: 12, color: 'var(--color-ink-muted)' }}>
                ไม่บังคับ — ระบุเมื่อต้องการบันทึกวันยืนยันที่แน่นอน
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="humi-required-note">
        <span className="humi-asterisk">*</span>
        ช่องที่บังคับกรอก
      </p>
    </div>
  )
}
