'use client'

// ClusterJob.tsx — Cluster 2 of 3 (Job / Personal Info)
// D2 S1: StepBiographical ครอบคลุม BA Personal Info rows 2-17 = 12 fields (all mandatory)
//        StepEmployeeInfo, StepJob, StepCompensation ยังคงอยู่เหมือนเดิม
import StepBiographical from '../steps/StepBiographical'
import StepEmployeeInfo from '../steps/StepEmployeeInfo'
import StepJob from '../steps/StepJob'
import StepCompensation from '../steps/StepCompensation'
import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { User2, Briefcase, Building2, Wallet } from 'lucide-react'

export default function ClusterJob() {
  return (
    <div className="space-y-5">
      {/* Personal Info — BA Personal Info rows 2-17 */}
      <div className="humi-card">
        <SectionHeader
          icon={User2}
          eyebrow="Personal Information"
          title="ข้อมูลส่วนตัว"
          sub="ชื่อท้องถิ่น ชื่อเล่น เพศ สัญชาติ กรุ๊ปเลือด สถานภาพ — 12 fields"
        />
        <div className="humi-step-section">
          <StepBiographical />
        </div>
      </div>

      {/* Employee Info */}
      <div className="humi-card">
        <SectionHeader
          icon={Briefcase}
          eyebrow="Employee Info"
          title="ข้อมูลพนักงาน"
          sub="Employee Class ตาม Appendix 3 (A-H)"
        />
        <div className="humi-step-section"><StepEmployeeInfo /></div>
      </div>

      {/* Job Assignment */}
      <div className="humi-card">
        <SectionHeader
          icon={Building2}
          eyebrow="Job Assignment"
          title="ตำแหน่งและสังกัด"
          sub="Position + Business Unit"
        />
        <div className="humi-step-section"><StepJob /></div>
      </div>

      {/* Compensation */}
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
