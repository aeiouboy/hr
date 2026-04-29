'use client'

// ClusterJob.tsx — Cluster 2 of 3 (Employment-level fields only)
// Matches WIZARD_STEPS Step 2 promise: "Employee Info • ตำแหน่ง • ค่าตอบแทน"
import { useCallback } from 'react'
import StepEmployeeInfo from '../steps/StepEmployeeInfo'
import StepJob from '../steps/StepJob'
import StepCompensation from '../steps/StepCompensation'
import { CollapsibleSectionCard } from '@/components/admin/wizard/CollapsibleSectionCard'
import { Briefcase, Building2, Wallet } from 'lucide-react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

export default function ClusterJob() {
  const setStepValidity = useHireWizard((s) => s.setStepValidity)
  const sectionCollapse = useHireWizard((s) => s.sectionCollapse)
  const toggleSection = useHireWizard((s) => s.toggleSection)
  const onEmployeeInfoValid = useCallback((v: boolean) => setStepValidity('employeeInfo', v), [setStepValidity])
  const onCompensationValid = useCallback((v: boolean) => setStepValidity('compensation', v), [setStepValidity])

  return (
    <div className="space-y-5">
      <CollapsibleSectionCard
        id="job.employeeInfo"
        collapsed={sectionCollapse['job.employeeInfo'] ?? false}
        onToggle={() => toggleSection('job.employeeInfo')}
          icon={Briefcase}
          eyebrow="ข้อมูลพนักงาน"
          title="ประเภทการจ้างงาน"
          sub="Employee Class ตาม Appendix 3 (A-H)"
      >
        <StepEmployeeInfo onValidChange={onEmployeeInfoValid} />
      </CollapsibleSectionCard>

      <CollapsibleSectionCard
        id="job.assignment"
        collapsed={sectionCollapse['job.assignment'] ?? false}
        onToggle={() => toggleSection('job.assignment')}
          icon={Building2}
          eyebrow="ตำแหน่งและสังกัด"
          title="ตำแหน่งและสังกัด"
          sub="ตำแหน่งงาน หน่วยธุรกิจ สาขา/หน่วยงาน เขต HR"
      >
        <StepJob />
      </CollapsibleSectionCard>

      <CollapsibleSectionCard
        id="job.compensation"
        collapsed={sectionCollapse['job.compensation'] ?? false}
        onToggle={() => toggleSection('job.compensation')}
          icon={Wallet}
          eyebrow="ค่าตอบแทน"
          title="ค่าตอบแทน"
          sub="เงินเดือนพื้นฐานสำหรับ Payroll"
      >
        <StepCompensation onValidChange={onCompensationValid} />
      </CollapsibleSectionCard>

      <p className="humi-required-note"><span className="humi-asterisk">*</span>ช่องที่บังคับกรอก</p>
    </div>
  )
}
