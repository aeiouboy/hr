'use client'

// ClusterWho.tsx — Cluster 1 of 3
// D2 S1: StepIdentity ครอบคลุม BA rows 1-19 + Personal Info row 1 = 19 input fields.
// (BA row 12 employeeId is system-generated per BRD #102:2267 — not an input.)
// 12 mandatory, 7 optional per BA-EC-SUMMARY.md
import StepIdentity from '../steps/StepIdentity'
import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { Fingerprint } from 'lucide-react'

export default function ClusterWho() {
  return (
    <div className="space-y-5">
      <div className="humi-card">
        <SectionHeader
          icon={Fingerprint}
          eyebrow="Identity"
          title="ข้อมูลระบุตัวตน"
          sub="วันที่เริ่มงาน บริษัท ชื่อ DOB บัตรประชาชน — 19 fields (รหัสพนักงานระบบกำหนด)"
        />
        <div className="humi-step-section">
          <StepIdentity />
        </div>
      </div>

      <p className="humi-required-note">
        <span className="humi-asterisk">*</span>
        ช่องที่บังคับกรอก
      </p>
    </div>
  )
}
