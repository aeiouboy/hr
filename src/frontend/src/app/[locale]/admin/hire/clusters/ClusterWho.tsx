'use client'

// ClusterWho.tsx — Option-1 merged step 1 of 3 (identity cluster)
// Composes 4 existing Step*.tsx as humi-card sections. No form logic
// rewrite — each sub-step still dispatches setStepData on its own slice.
import StepIdentity from '../steps/StepIdentity'
import StepName from '../steps/StepName'
import StepNationalId from '../steps/StepNationalId'
import StepBiographical from '../steps/StepBiographical'
import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { Fingerprint, User, IdCard, CalendarDays } from 'lucide-react'

export default function ClusterWho() {
  return (
    <div className="space-y-5">
      <div className="humi-card">
        <SectionHeader
          icon={Fingerprint}
          eyebrow="Identity"
          title="ข้อมูลระบุตัวตน"
          sub="วันที่เริ่มงาน บริษัท และสาเหตุการจ้าง"
        />
        <div className="humi-step-section"><StepIdentity /></div>
      </div>

      <div className="humi-card">
        <SectionHeader
          icon={User}
          eyebrow="Name"
          title="ชื่อ-นามสกุล"
          sub="ชื่อทางการตามบัตรประชาชน (TH required, EN optional)"
        />
        <div className="humi-step-section"><StepName /></div>
      </div>

      <div className="humi-card">
        <SectionHeader
          icon={IdCard}
          eyebrow="National ID"
          title="เลขบัตรประชาชน"
          sub="13 หลัก ใช้ยืนยันตัวตนและรายงานภาครัฐ"
        />
        <div className="humi-step-section"><StepNationalId /></div>
      </div>

      <div className="humi-card">
        <SectionHeader
          icon={CalendarDays}
          eyebrow="Biographical"
          title="ข้อมูลประวัติ"
          sub="วันเกิด ใช้คำนวณอายุงานและสิทธิประโยชน์"
        />
        <div className="humi-step-section"><StepBiographical /></div>
      </div>

      <p className="humi-required-note">
        <span className="humi-asterisk">*</span>
        ช่องที่บังคับกรอก
      </p>
    </div>
  )
}
