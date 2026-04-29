'use client'

// ClusterWho.tsx — Cluster 1 of 3 (Identity + Biographical = "ข้อมูลส่วนบุคคล")
// Matches WIZARD_STEPS Step 1 promise: "ระบุตัวตน • ชื่อ • บัตรประชาชน • ประวัติ"
// DEF-02/03/05: onValidChange from each step wires Zod refine results into store
import { useCallback } from 'react'
import StepIdentity from '../steps/StepIdentity'
import StepBiographical from '../steps/StepBiographical'
import StepContact from '../steps/StepContact'
import StepEmergencyContacts from '../steps/StepEmergencyContacts'
import StepGlobalInfo from '../steps/StepGlobalInfo'
import StepWorkPermit from '../steps/StepWorkPermit'
import StepDependents from '../steps/StepDependents'
import { CollapsibleSectionCard } from '@/components/admin/wizard/CollapsibleSectionCard'
import { Fingerprint, User2, Phone, AlertCircle, Globe, FileText, Users } from 'lucide-react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

export default function ClusterWho() {
  const setStepValidity = useHireWizard((s) => s.setStepValidity)
  const sectionCollapse = useHireWizard((s) => s.sectionCollapse)
  const toggleSection = useHireWizard((s) => s.toggleSection)
  // Stable callbacks — required, otherwise child useEffect deps change every render and loop
  const onIdentityValid = useCallback((v: boolean) => setStepValidity('identity', v), [setStepValidity])
  const onBiographicalValid = useCallback((v: boolean) => setStepValidity('biographical', v), [setStepValidity])
  const onEmergencyContactsValid = useCallback((v: boolean) => setStepValidity('emergencyContacts', v), [setStepValidity])
  const onGlobalInfoValid = useCallback((v: boolean) => setStepValidity('globalInfo', v), [setStepValidity])
  const onWorkPermitValid = useCallback((v: boolean) => setStepValidity('workPermit', v), [setStepValidity])
  const onDependentsValid = useCallback((v: boolean) => setStepValidity('dependents', v), [setStepValidity])

  return (
    <div className="space-y-5">
      <CollapsibleSectionCard
        id="who.identity"
        collapsed={sectionCollapse['who.identity'] ?? false}
        onToggle={() => toggleSection('who.identity')}
          icon={Fingerprint}
          eyebrow="ระบุตัวตน"
          title="ข้อมูลระบุตัวตน"
          sub="วันที่เริ่มงาน บริษัท ชื่อ วันเกิด บัตรประชาชน"
      >
        <StepIdentity onValidChange={onIdentityValid} />
      </CollapsibleSectionCard>

      <CollapsibleSectionCard
        id="who.biographical"
        collapsed={sectionCollapse['who.biographical'] ?? false}
        onToggle={() => toggleSection('who.biographical')}
          icon={User2}
          eyebrow="ประวัติส่วนตัว"
          title="ข้อมูลส่วนตัว"
          sub="ชื่อท้องถิ่น ชื่อเล่น เพศ สัญชาติ กรุ๊ปเลือด สถานภาพสมรส"
      >
        <StepBiographical onValidChange={onBiographicalValid} />
      </CollapsibleSectionCard>

      <CollapsibleSectionCard
        id="who.contact"
        collapsed={sectionCollapse['who.contact'] ?? false}
        onToggle={() => toggleSection('who.contact')}
          icon={Phone}
          eyebrow="ข้อมูลติดต่อ"
          title="ข้อมูลการติดต่อ"
          sub="เบอร์โทร อีเมล บุคคลที่เกี่ยวข้อง"
      >
        <StepContact />
      </CollapsibleSectionCard>

      <CollapsibleSectionCard
        id="who.emergencyContacts"
        collapsed={sectionCollapse['who.emergencyContacts'] ?? false}
        onToggle={() => toggleSection('who.emergencyContacts')}
          icon={AlertCircle}
          eyebrow="ผู้ติดต่อฉุกเฉิน"
          title="ผู้ติดต่อฉุกเฉิน / Emergency Contacts"
          sub="ชื่อ ความสัมพันธ์ เบอร์โทร ที่อยู่ (ถ้ามี)"
      >
        <StepEmergencyContacts onValidChange={onEmergencyContactsValid} />
      </CollapsibleSectionCard>

      <CollapsibleSectionCard
        id="who.globalInfo"
        collapsed={sectionCollapse['who.globalInfo'] ?? false}
        onToggle={() => toggleSection('who.globalInfo')}
          icon={Globe}
          eyebrow="ข้อมูลทั่วไป"
          title="ข้อมูลทั่วไป / Global Information"
          sub="ศาสนา จำนวนบุตร สถานะความพิการ เลขบัตรคู่สมรส ข้อมูลเพิ่มเติม"
      >
        <StepGlobalInfo onValidChange={onGlobalInfoValid} />
      </CollapsibleSectionCard>

      <CollapsibleSectionCard
        id="who.workPermit"
        collapsed={sectionCollapse['who.workPermit'] ?? false}
        onToggle={() => toggleSection('who.workPermit')}
          icon={FileText}
          eyebrow="ใบอนุญาตทำงาน"
          title="ใบอนุญาตทำงาน / Work Permit"
          sub="ประเภทเอกสาร เลขที่ ประเทศ วันออก วันหมดอายุ (สำหรับชาวต่างชาติเท่านั้น)"
      >
        <StepWorkPermit onValidChange={onWorkPermitValid} />
      </CollapsibleSectionCard>

      <CollapsibleSectionCard
        id="who.dependents"
        collapsed={sectionCollapse['who.dependents'] ?? false}
        onToggle={() => toggleSection('who.dependents')}
          icon={Users}
          eyebrow="บุคคลในอุปการะ"
          title="บุคคลในอุปการะ / Dependents"
          sub="คู่สมรส บุตร บิดามารดา (ถ้ามี) — สูงสุด 10 คน"
      >
        <StepDependents onValidChange={onDependentsValid} />
      </CollapsibleSectionCard>

      <p className="humi-required-note"><span className="humi-asterisk">*</span>ช่องที่บังคับกรอก</p>
    </div>
  )
}
