'use client'

// clusters/ClusterReview.tsx — Probation Wizard Step 3 (summary)
//
// Read-only summary of all slices before submit.
// Pattern mirrors Hire ClusterReview — sliceValid map from store
// surfaces per-slice completeness so admin can see what's still missing.

import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { ClipboardCheck, Check, AlertCircle } from 'lucide-react'
import { useProbationWizard, probationSliceValid } from '../store'

const PASS_LABELS: Record<string, string> = {
  YES: 'ผ่านทดลองงาน',
  NO: 'ไม่ผ่านทดลองงาน',
  EXTEND: 'ต่อระยะทดลองงาน',
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
      <span style={{ fontSize: 13, color: 'var(--color-ink-soft)', minWidth: 200 }}>{label}</span>
      <span style={{ flex: 1, fontSize: 14, color: ok ? 'var(--color-ink)' : 'var(--color-ink-muted)', fontWeight: ok ? 500 : 400 }}>
        {value}
      </span>
    </div>
  )
}

export default function ClusterReview() {
  const { formData } = useProbationWizard()

  const jobOk = probationSliceValid.job(formData)
  const assessOk = probationSliceValid.assessment(formData)

  const passLabel = formData.assessment.passProbation
    ? PASS_LABELS[formData.assessment.passProbation] ?? formData.assessment.passProbation
    : '—'

  return (
    <div className="space-y-5">
      <div className="humi-card humi-card--cream">
        <SectionHeader
          icon={ClipboardCheck}
          eyebrow="Summary"
          title="สรุปข้อมูลก่อนส่ง"
          sub="ตรวจสอบก่อนบันทึก — คลิก Step 1/2 ด้านซ้ายเพื่อย้อนไปแก้ไข"
        />
        <div>
          <SummaryRow
            label="รหัสพนักงาน"
            value={formData.job.employeeId ?? '—'}
            ok={jobOk}
          />
          <SummaryRow
            label="วันสิ้นสุดทดลองงาน"
            value={formData.job.probationEndDate ?? '—'}
            ok={jobOk}
          />
          <SummaryRow
            label="ผลการทดลองงาน"
            value={passLabel}
            ok={assessOk}
          />
          {formData.assessment.passProbation === 'EXTEND' && (
            <SummaryRow
              label="วันที่ขยายระยะทดลองงาน"
              value={formData.assessment.extendedProbationDate ?? '—'}
              ok={!!formData.assessment.extendedProbationDate}
            />
          )}
          {formData.assessment.passProbation === 'YES' && (
            <SummaryRow
              label="วันที่ยืนยันผ่านทดลองงาน"
              value={formData.assessment.passProbationConfirmDate ?? '(ไม่ระบุ)'}
              ok
            />
          )}
        </div>
      </div>

      <p className="humi-required-note">
        <span className="humi-asterisk">*</span>
        ช่องที่บังคับกรอก
      </p>
    </div>
  )
}
