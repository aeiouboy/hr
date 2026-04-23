'use client'

// ClusterJob.tsx — Option-1 merged step 2 of 3 (work assignment cluster)
import StepEmployeeInfo from '../steps/StepEmployeeInfo'
import StepJob from '../steps/StepJob'
import StepCompensation from '../steps/StepCompensation'
import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { Briefcase, Building2, Wallet } from 'lucide-react'

export default function ClusterJob() {
  return (
    <div className="space-y-5">
      <div className="humi-card">
        <SectionHeader
          icon={Briefcase}
          eyebrow="Employee Info"
          title="ข้อมูลพนักงาน"
          sub="Employee Class ตาม Appendix 3 (A-H)"
        />
        <div className="humi-step-section"><StepEmployeeInfo /></div>
      </div>

      <div className="humi-card">
        <SectionHeader
          icon={Building2}
          eyebrow="Job Assignment"
          title="ตำแหน่งและสังกัด"
          sub="Position + Business Unit"
        />
        <div className="humi-step-section"><StepJob /></div>
      </div>

      <div className="humi-card">
        <SectionHeader
          icon={Wallet}
          eyebrow="Compensation"
          title="ค่าตอบแทน"
          sub="เงินเดือนพื้นฐาน (base salary) สำหรับ Payroll"
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
