'use client'

// ClusterWho.tsx — Cluster 1 of 3 (Identity + Biographical = "ข้อมูลส่วนบุคคล")
// Matches WIZARD_STEPS Step 1 promise: "ระบุตัวตน • ชื่อ • บัตรประชาชน • ประวัติ"
// StepIdentity      = BA Identity rows 1-19 (รหัสพนักงานระบบกำหนด)
// StepBiographical  = BA Personal Info rows 2-17 (12 mandatory)
import StepIdentity from '../steps/StepIdentity'
import StepBiographical from '../steps/StepBiographical'
import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { Fingerprint, User2 } from 'lucide-react'

export default function ClusterWho() {
  return (
    <div className="space-y-5">
      <div className="humi-card">
        <SectionHeader
          icon={Fingerprint}
          eyebrow="ระบุตัวตน"
          title="ข้อมูลระบุตัวตน"
          sub="วันที่เริ่มงาน บริษัท ชื่อ วันเกิด บัตรประชาชน"
        />
        <div className="humi-step-section">
          <StepIdentity />
        </div>
      </div>

      <div className="humi-card">
        <SectionHeader
          icon={User2}
          eyebrow="ประวัติส่วนตัว"
          title="ข้อมูลส่วนตัว"
          sub="ชื่อท้องถิ่น ชื่อเล่น เพศ สัญชาติ กรุ๊ปเลือด สถานภาพสมรส"
        />
        <div className="humi-step-section">
          <StepBiographical />
        </div>
      </div>

      <p className="humi-required-note">
        <span className="humi-asterisk">*</span>
        ช่องที่บังคับกรอก
      </p>
    </div>
  )
}
