'use client'

// ClusterReview.tsx — Cluster 3 of 3 (Review + Attachment)
// D2 S1: เพิ่ม EN name dup fields (BA Personal Info rows 6-9) + Attachment (row 18)
// + ขยาย summary ให้แสดง 37-field overview
import { useState } from 'react'
import { useHireWizard, sliceValid } from '@/lib/admin/store/useHireWizard'
import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { ClipboardCheck, Paperclip, Check, AlertCircle } from 'lucide-react'

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
  const { formData, setStepData } = useHireWizard()
  const id  = formData.identity
  const bio = formData.biographical
  const rev = formData.review

  // ── BA Personal Info rows 6-9 — EN name dup (editable in review) ──────────
  const [salutationEnReview,  setSalutationEnReview]  = useState(rev.salutationEnReview  ?? id.salutationEn  ?? '')
  const [firstNameEnReview,   setFirstNameEnReview]   = useState(rev.firstNameEnReview   || id.firstNameEn   || '')
  const [lastNameEnReview,    setLastNameEnReview]     = useState(rev.lastNameEnReview    || id.lastNameEn    || '')
  const [middleNameEnReview,  setMiddleNameEnReview]  = useState(rev.middleNameEnReview  || id.middleNameEn  || '')

  // ── BA Personal Info row 18 — Attachment (optional) ──────────────────────
  const [attachmentName, setAttachmentName] = useState<string | null>(rev.attachmentName ?? null)

  const syncReview = (
    salEn: string | null, fEn: string, lEn: string, mEn: string, att: string | null,
  ) => {
    setStepData('review', {
      salutationEnReview: salEn, firstNameEnReview: fEn,
      lastNameEnReview: lEn, middleNameEnReview: mEn, attachmentName: att,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const name = file?.name ?? null
    setAttachmentName(name)
    syncReview(salutationEnReview || null, firstNameEnReview, lastNameEnReview, middleNameEnReview, name)
  }

  // ── Summary data ──────────────────────────────────────────────────────────
  const identityOk     = sliceValid.identity(formData)
  const biographicalOk = sliceValid.biographical(formData)

  const salary = formData.compensation.baseSalary
    ? `${formData.compensation.baseSalary.toLocaleString('th-TH')} บาท/เดือน`
    : '—'

  return (
    <div className="space-y-5">
      {/* ── BA Personal Info rows 6-9 — EN name dup (Cluster 3) ─── */}
      <div className="humi-card">
        <SectionHeader
          icon={Paperclip}
          eyebrow="EN Name (Local EN)"
          title="ชื่อ-นามสกุล (EN) ยืนยัน"
          sub="BA Personal Info rows 6-9 — dup จาก Identity สำหรับ confirmation"
        />
        <div className="humi-step-section space-y-4">
          {/* BA Personal Info row 6 — Salutation (Local EN) */}
          <fieldset>
            <label htmlFor="review-salutation-en" className="humi-label">
              คำนำหน้า (EN) ยืนยัน
            </label>
            <input id="review-salutation-en" type="text" readOnly
              value={salutationEnReview}
              className="humi-input w-full max-w-xs bg-surface-muted cursor-not-allowed" />
          </fieldset>

          {/* BA Personal Info row 7 — Firstname (Local EN) */}
          <fieldset>
            <label htmlFor="review-first-name-en" className="humi-label">
              ชื่อ (EN) ยืนยัน
            </label>
            <input id="review-first-name-en" type="text" readOnly
              value={firstNameEnReview}
              className="humi-input w-full max-w-sm bg-surface-muted cursor-not-allowed" />
          </fieldset>

          {/* BA Personal Info row 8 — Lastname (Local EN) */}
          <fieldset>
            <label htmlFor="review-last-name-en" className="humi-label">
              นามสกุล (EN) ยืนยัน
            </label>
            <input id="review-last-name-en" type="text" readOnly
              value={lastNameEnReview}
              className="humi-input w-full max-w-sm bg-surface-muted cursor-not-allowed" />
          </fieldset>

          {/* BA Personal Info row 9 — Middle Name (Local EN) */}
          <fieldset>
            <label htmlFor="review-middle-name-en" className="humi-label">
              ชื่อกลาง (EN) ยืนยัน
            </label>
            <input id="review-middle-name-en" type="text" readOnly
              value={middleNameEnReview}
              className="humi-input w-full max-w-sm bg-surface-muted cursor-not-allowed" />
          </fieldset>

          {/* BA Personal Info row 18 — Attachment (optional) */}
          <fieldset>
            <label htmlFor="attachment" className="humi-label">
              เอกสารแนบ (Attachment)
              <span className="ml-1 text-xs text-ink-muted">(optional)</span>
            </label>
            <input id="attachment" type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
              className="block text-sm text-ink file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:bg-accent file:text-white hover:file:bg-accent/80" />
            {attachmentName && (
              <p className="mt-1 text-xs text-accent">{attachmentName}</p>
            )}
          </fieldset>
        </div>
      </div>

      {/* ── Summary ─────────────────────────────────────────────────────────── */}
      <div className="humi-card humi-card--cream">
        <SectionHeader
          icon={ClipboardCheck}
          eyebrow="Summary"
          title="สรุปข้อมูลก่อนส่ง"
          sub="ตรวจสอบก่อนบันทึก — คลิก Cluster 1/2 ด้านซ้ายเพื่อย้อนไปแก้ไข"
        />
        <div>
          {/* Identity summary */}
          <SummaryRow label="วันที่เริ่มงาน"          value={id.hireDate ?? '—'}         ok={identityOk} />
          <SummaryRow label="บริษัท"                  value={id.companyCode ?? '—'}      ok={identityOk} />
          <SummaryRow label="Event Reason"            value={id.eventReason ?? '—'}      ok={identityOk} />
          <SummaryRow label="คำนำหน้า (EN)"            value={id.salutationEn ?? '—'}    ok={identityOk} />
          <SummaryRow label="ชื่อ-นามสกุล (EN)"
            value={[id.salutationEn, id.firstNameEn, id.middleNameEn, id.lastNameEn].filter(Boolean).join(' ') || '—'}
            ok={identityOk} />
          <SummaryRow label="วันเกิด"                  value={id.dateOfBirth ?? '—'}      ok={identityOk} />
          <SummaryRow label="รหัสพนักงาน"               value={id.employeeId || '—'}       ok={identityOk} />
          <SummaryRow label="ประเภทบัตร"               value={id.nationalIdCardType ?? '—'} ok={identityOk} />
          <SummaryRow label="เลขบัตร"                  value={id.nationalId || '—'}        ok={identityOk} />
          <SummaryRow label="ประเทศ"                   value={id.country ?? '—'}           ok={identityOk} />
          <SummaryRow label="Is Primary"               value={id.isPrimary ?? '—'}         ok={identityOk} />
          <SummaryRow label="คำนำหน้า (Local)"          value={id.salutationLocal ?? '—'}  ok={identityOk} />
          {/* Biographical summary */}
          <SummaryRow label="ชื่อ-นามสกุล (Local)"
            value={[bio.firstNameLocal, bio.lastNameLocal].filter(Boolean).join(' ') || '—'}
            ok={biographicalOk} />
          <SummaryRow label="ชื่อเล่น"                  value={bio.nickname || '—'}          ok={biographicalOk} />
          <SummaryRow label="เพศ"                       value={bio.gender ?? '—'}            ok={biographicalOk} />
          <SummaryRow label="สัญชาติ"                   value={bio.nationality ?? '—'}       ok={biographicalOk} />
          <SummaryRow label="กรุ๊ปเลือด"                 value={bio.bloodType ?? '—'}         ok={biographicalOk} />
          <SummaryRow label="สถานภาพสมรส"               value={bio.maritalStatus ?? '—'}     ok={biographicalOk} />
          {/* Job summary */}
          <SummaryRow label="Employee Class"            value={formData.employeeInfo.employeeClass ?? '—'} ok={sliceValid.employeeInfo(formData)} />
          <SummaryRow label="ตำแหน่ง"                   value={formData.job.position || '—'}  ok={sliceValid.job(formData)} />
          <SummaryRow label="ค่าตอบแทน"                 value={salary}                        ok={sliceValid.compensation(formData)} />
        </div>
      </div>

      <p className="humi-required-note">
        <span className="humi-asterisk">*</span>
        ช่องที่บังคับกรอก
      </p>
    </div>
  )
}
