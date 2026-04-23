'use client'

// ClusterReview.tsx — Option-1 merged step 3 of 3 (contact + summary)
// Adds a read-only summary of Who + Job slices so admin can verify
// before submit (reduces correction round-trips).
import StepPersonal from '../steps/StepPersonal'
import { useHireWizard, sliceValid } from '@/lib/admin/store/useHireWizard'
import { Home, ClipboardCheck, Check, AlertCircle } from 'lucide-react'
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

function SummaryRow({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <div className="humi-row" style={{ padding: '10px 0', borderTop: '1px solid var(--color-hairline-soft)' }}>
      <span
        className={ok ? 'text-accent' : 'text-warning'}
        style={{ display: 'inline-flex', width: 20 }}
        aria-hidden
      >
        {ok ? <Check size={16} /> : <AlertCircle size={16} />}
      </span>
      <span style={{ fontSize: 13, color: 'var(--color-ink-soft)', minWidth: 180 }}>{label}</span>
      <span style={{ flex: 1, fontSize: 14, color: ok ? 'var(--color-ink)' : 'var(--color-ink-muted)', fontWeight: ok ? 500 : 400 }}>
        {value}
      </span>
    </div>
  )
}

export default function ClusterReview() {
  const { formData } = useHireWizard()

  const nameTh = [formData.name.firstNameTh, formData.name.lastNameTh].filter(Boolean).join(' ') || '—'
  const salary = formData.compensation.baseSalary
    ? `${formData.compensation.baseSalary.toLocaleString('th-TH')} บาท/เดือน`
    : '—'

  return (
    <div className="space-y-5">
      <div className="humi-card">
        <SectionHeader
          icon={Home}
          eyebrow="Personal"
          title="ข้อมูลติดต่อส่วนตัว"
          sub="ที่อยู่สำหรับส่งเอกสาร + ติดต่อฉุกเฉิน"
        />
        <div className="humi-step-section"><StepPersonal /></div>
      </div>

      <div className="humi-card humi-card--cream">
        <SectionHeader
          icon={ClipboardCheck}
          eyebrow="Summary"
          title="สรุปข้อมูลก่อนส่ง"
          sub="ตรวจสอบก่อนบันทึก — คลิก Step 1/2 ด้านซ้ายเพื่อย้อนไปแก้ไข"
        />
        <div>
          <SummaryRow label="วันที่เริ่มงาน" value={formData.identity.hireDate || '—'} ok={sliceValid.identity(formData)} />
          <SummaryRow label="บริษัท" value={formData.identity.companyCode || '—'} ok={sliceValid.identity(formData)} />
          <SummaryRow label="ชื่อ-นามสกุล (TH)" value={nameTh} ok={sliceValid.name(formData)} />
          <SummaryRow label="เลขบัตรประชาชน" value={formData.nationalId.value || '—'} ok={sliceValid.nationalId(formData)} />
          <SummaryRow label="วันเกิด" value={formData.biographical.dateOfBirth || '—'} ok={sliceValid.biographical(formData)} />
          <SummaryRow label="Employee Class" value={formData.employeeInfo.employeeClass || '—'} ok={sliceValid.employeeInfo(formData)} />
          <SummaryRow label="ตำแหน่ง" value={formData.job.position || '—'} ok={sliceValid.job(formData)} />
          <SummaryRow label="ค่าตอบแทน" value={salary} ok={sliceValid.compensation(formData)} />
          <SummaryRow label="ที่อยู่" value={formData.personal.addressLine1 || '—'} ok={sliceValid.personal(formData)} />
        </div>
      </div>

      <p className="humi-required-note">
        <span className="humi-asterisk">*</span>
        ช่องที่บังคับกรอก
      </p>
    </div>
  )
}
