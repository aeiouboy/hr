'use client'

// ClusterWho.tsx — Cluster 1 of 3
// D2 S1: StepIdentity ขยายครอบคลุม BA rows 1-19 + Personal Info row 1 = 20 fields
// 13 mandatory, 7 optional per BA-EC-SUMMARY.md
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
          sub="วันที่เริ่มงาน บริษัท ชื่อ DOB บัตรประชาชน — 20 fields"
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
