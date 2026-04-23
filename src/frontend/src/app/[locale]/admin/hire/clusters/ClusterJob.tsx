'use client'

// ClusterJob.tsx — Option-1 merged step 2 of 3 (work assignment cluster)
import StepEmployeeInfo from '../steps/StepEmployeeInfo'
import StepJob from '../steps/StepJob'
import StepCompensation from '../steps/StepCompensation'
import { Briefcase, Building2, Wallet } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  sub,
}: {
  icon: LucideIcon
  eyebrow: string
  title: string
  sub: string
}) {
  return (
    <div className="humi-row" style={{ alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
        <Icon size={20} aria-hidden />
      </div>
      <div>
        <div className="humi-eyebrow">{eyebrow}</div>
        <h3 className="humi-section-title">{title}</h3>
        <p className="humi-section-sub" style={{ marginBottom: 0 }}>{sub}</p>
      </div>
    </div>
  )
}

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
