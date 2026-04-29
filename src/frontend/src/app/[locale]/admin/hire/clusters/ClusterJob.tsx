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
  const setSectionCollapsed = useHireWizard((s) => s.setSectionCollapsed)
  const onEmployeeInfoValid = useCallback((v: boolean) => setStepValidity('employeeInfo', v), [setStepValidity])
  const onCompensationValid = useCallback((v: boolean) => setStepValidity('compensation', v), [setStepValidity])
  const collapsed = useCallback((id: string) => sectionCollapse[id] ?? false, [sectionCollapse])
  const onCollapse = useCallback((id: string, value: boolean) => setSectionCollapsed(id, value), [setSectionCollapsed])

  return (
    <div className="space-y-5">
      <CollapsibleSectionCard id="job.employeeInfo" icon={Briefcase} eyebrow="ข้อมูลพนักงาน" title="ประเภทการจ้างงาน" sub="Employee Class ตาม Appendix 3 (A-H)" collapsed={collapsed('job.employeeInfo')} onCollapsedChange={(value) => onCollapse('job.employeeInfo', value)}>
        <StepEmployeeInfo onValidChange={onEmployeeInfoValid} />
      </CollapsibleSectionCard>

      <CollapsibleSectionCard id="job.assignment" icon={Building2} eyebrow="ตำแหน่งและสังกัด" title="ตำแหน่งและสังกัด" sub="ตำแหน่งงาน หน่วยธุรกิจ สาขา/หน่วยงาน เขต HR" collapsed={collapsed('job.assignment')} onCollapsedChange={(value) => onCollapse('job.assignment', value)}>
        <StepJob />
      </CollapsibleSectionCard>

      <CollapsibleSectionCard id="job.compensation" icon={Wallet} eyebrow="ค่าตอบแทน" title="ค่าตอบแทน" sub="เงินเดือนพื้นฐานสำหรับ Payroll" collapsed={collapsed('job.compensation')} onCollapsedChange={(value) => onCollapse('job.compensation', value)}>
        <StepCompensation onValidChange={onCompensationValid} />
      </CollapsibleSectionCard>

      <p className="humi-required-note"><span className="humi-asterisk">*</span>ช่องที่บังคับกรอก</p>
    </div>
  )
}
