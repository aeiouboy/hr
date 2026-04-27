'use client'

// ClusterJob.tsx — Cluster 2 of 3 (Employment-level fields only)
// Matches WIZARD_STEPS Step 2 promise: "Employee Info • ตำแหน่ง • ค่าตอบแทน"
// Personal Info (StepBiographical) ย้ายไป ClusterWho ตามหลัก Per/Emp split (audit A3).
import { useCallback } from 'react'
import StepEmployeeInfo from '../steps/StepEmployeeInfo'
import StepJob from '../steps/StepJob'
import StepCompensation from '../steps/StepCompensation'
import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { Briefcase, Building2, Wallet } from 'lucide-react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

export default function ClusterJob() {
  const setStepValidity = useHireWizard((s) => s.setStepValidity)
  const onEmployeeInfoValid = useCallback((v: boolean) => setStepValidity('employeeInfo', v), [setStepValidity])

  return (
    <div className="space-y-5">
      {/* Employee Info */}
      <div className="humi-card">
        <SectionHeader
          icon={Briefcase}
          eyebrow="ข้อมูลพนักงาน"
          title="ประเภทการจ้างงาน"
          sub="Employee Class ตาม Appendix 3 (A-H)"
        />
        <div className="humi-step-section"><StepEmployeeInfo onValidChange={onEmployeeInfoValid} /></div>
      </div>

      {/* Job Assignment */}
      <div className="humi-card">
        <SectionHeader
          icon={Building2}
          eyebrow="ตำแหน่งและสังกัด"
          title="ตำแหน่งและสังกัด"
          sub="ตำแหน่งงาน หน่วยธุรกิจ สาขา/หน่วยงาน เขต HR"
        />
        <div className="humi-step-section"><StepJob /></div>
      </div>

      {/* Compensation */}
      <div className="humi-card">
        <SectionHeader
          icon={Wallet}
          eyebrow="ค่าตอบแทน"
          title="ค่าตอบแทน"
          sub="เงินเดือนพื้นฐานสำหรับ Payroll"
        />
        <div className="humi-step-section"><StepCompensation /></div>
      </div>

      <p className="humi-required-note">
        <span className="humi-asterisk">*</span>
        ช่องที่บังคับกรอก
      </p>
    </div>
  )
}
