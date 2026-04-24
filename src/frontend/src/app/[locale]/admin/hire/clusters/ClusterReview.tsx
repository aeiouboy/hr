'use client'

// ClusterReview.tsx — Cluster 3 of 3 (Review + HRBP assign)
// - EN name confirmation (BA Personal Info rows 6-9) readonly mirror จาก Identity
// - HRBP assignee + mail notify (audit #14, BRD #109) — mockup stub
// - Summary aggregating all clusters (Thai-primary labels)
// Attachment ย้ายไป StepBiographical (Step 1) ใน PR #35 — ไม่ต้องซ้ำที่นี่
import { useState } from 'react'
import { useHireWizard, sliceValid } from '@/lib/admin/store/useHireWizard'
import { SectionHeader } from '@/components/admin/wizard/SectionHeader'
import { ClipboardCheck, Check, AlertCircle, UserCheck } from 'lucide-react'

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
  const { formData } = useHireWizard()
  const id  = formData.identity
  const bio = formData.biographical
  const rev = formData.review

  // ── BA Personal Info rows 6-9 — EN name readonly mirror จาก Identity ─────
  const salutationEnReview = rev.salutationEnReview  ?? id.salutationEn  ?? ''
  const firstNameEnReview  = rev.firstNameEnReview   || id.firstNameEn   || ''
  const lastNameEnReview   = rev.lastNameEnReview    || id.lastNameEn    || ''
  const middleNameEnReview = rev.middleNameEnReview  || id.middleNameEn  || ''

  // ── HRBP assignee — audit #14 stub (no store wiring at mockup) ──────────
  const [hrbpAssignee, setHrbpAssignee] = useState('')
  const [notifyHrbp, setNotifyHrbp]     = useState(true)

  // ── Summary data ──────────────────────────────────────────────────────────
  const identityOk     = sliceValid.identity(formData)
  const biographicalOk = sliceValid.biographical(formData)

  const salary = formData.compensation.baseSalary
    ? `${formData.compensation.baseSalary.toLocaleString('th-TH')} บาท/เดือน`
    : '—'

  return (
    <div className="space-y-5">
      {/* ── ยืนยันชื่อ (EN) — 4 readonly mirror fields in 2-col grid ─── */}
      <div className="humi-card">
        <SectionHeader
          icon={UserCheck}
          eyebrow="ยืนยันชื่อภาษาอังกฤษ"
          title="ชื่อ-นามสกุลภาษาอังกฤษ"
          sub="คัดลอกจากขั้นตอนระบุตัวตน — แก้ไขได้ที่ขั้นตอนที่ 1"
        />
        <div className="humi-step-section grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          <fieldset>
            <label htmlFor="review-salutation-en" className="humi-label">คำนำหน้า (EN)</label>
            <input id="review-salutation-en" type="text" readOnly
              value={salutationEnReview}
              className="humi-input w-full bg-surface-muted cursor-not-allowed" />
          </fieldset>

          <fieldset>
            <label htmlFor="review-first-name-en" className="humi-label">ชื่อ (EN)</label>
            <input id="review-first-name-en" type="text" readOnly
              value={firstNameEnReview}
              className="humi-input w-full bg-surface-muted cursor-not-allowed" />
          </fieldset>

          <fieldset>
            <label htmlFor="review-middle-name-en" className="humi-label">ชื่อกลาง (EN)</label>
            <input id="review-middle-name-en" type="text" readOnly
              value={middleNameEnReview}
              className="humi-input w-full bg-surface-muted cursor-not-allowed" />
          </fieldset>

          <fieldset>
            <label htmlFor="review-last-name-en" className="humi-label">นามสกุล (EN)</label>
            <input id="review-last-name-en" type="text" readOnly
              value={lastNameEnReview}
              className="humi-input w-full bg-surface-muted cursor-not-allowed" />
          </fieldset>
        </div>
      </div>

      {/* ── HRBP assignee — audit #14 / BRD #109 (mockup stub) ─────────── */}
      <div className="humi-card">
        <SectionHeader
          icon={UserCheck}
          eyebrow="การมอบหมาย"
          title="ผู้ดูแล HRBP"
          sub="เลือก HRBP ที่จะรับเรื่องและแจ้งเตือนเมื่อส่งข้อมูล"
        />
        <div className="humi-step-section grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          <fieldset>
            <label htmlFor="hrbp-assignee" className="humi-label">HRBP ที่มอบหมาย</label>
            <select id="hrbp-assignee"
              value={hrbpAssignee}
              onChange={(e) => setHrbpAssignee(e.target.value)}
              className="humi-select w-full">
              <option value="">— เลือก HRBP —</option>
              <option value="HRBP-001">คุณสิริพร จันทร์แดง (HRBP — สำนักงานใหญ่)</option>
              <option value="HRBP-002">คุณธนพล ศิริวงศ์ (HRBP — ภาคเหนือ)</option>
              <option value="HRBP-003">คุณกมลรัตน์ บุญรัตน์ (HRBP — ภาคกลาง)</option>
              <option value="HRBP-004">คุณอนุชา ทองดี (HRBP — ภาคใต้)</option>
              <option value="HRBP-005">คุณวรเมธ หิรัญรัตน์ (HRBP — สาขาต่างประเทศ)</option>
            </select>
          </fieldset>

          <fieldset className="md:pt-7">
            <label className="humi-row" style={{ gap: 8, cursor: 'pointer' }}>
              <input type="checkbox"
                checked={notifyHrbp}
                onChange={(e) => setNotifyHrbp(e.target.checked)}
                className="h-4 w-4" />
              <span className="text-body text-ink">แจ้ง HRBP ทางอีเมลเมื่อส่งข้อมูล</span>
            </label>
            <p className="mt-1 text-xs text-ink-faint">SH4 trigger + template ตาม BRD #109 — Sprint 2 จะ wire backend</p>
          </fieldset>
        </div>
      </div>

      {/* ── สรุปข้อมูลก่อนส่ง ─────────────────────────────────────────── */}
      <div className="humi-card humi-card--cream">
        <SectionHeader
          icon={ClipboardCheck}
          eyebrow="สรุป"
          title="สรุปข้อมูลก่อนส่ง"
          sub="ตรวจสอบก่อนบันทึก — คลิกขั้นตอนด้านซ้ายเพื่อย้อนกลับแก้ไข"
        />
        <div>
          {/* Identity summary */}
          <SummaryRow label="วันที่เริ่มงาน"           value={id.hireDate ?? '—'}            ok={identityOk} />
          <SummaryRow label="บริษัท"                    value={id.companyCode ?? '—'}         ok={identityOk} />
          <SummaryRow label="สาเหตุการจ้าง"             value={id.eventReason ?? '—'}         ok={identityOk} />
          <SummaryRow label="คำนำหน้า (EN)"             value={id.salutationEn ?? '—'}        ok={identityOk} />
          <SummaryRow label="ชื่อ-นามสกุล (EN)"
            value={[id.salutationEn, id.firstNameEn, id.middleNameEn, id.lastNameEn].filter(Boolean).join(' ') || '—'}
            ok={identityOk} />
          <SummaryRow label="วันเกิด"                   value={id.dateOfBirth ?? '—'}         ok={identityOk} />
          <SummaryRow label="รหัสพนักงาน (ระบบจะกำหนด)" value={id.employeeId || '—'}           ok={identityOk} />
          <SummaryRow label="ประเภทบัตร"                value={id.nationalIdCardType ?? '—'}  ok={identityOk} />
          <SummaryRow label="เลขบัตร"                   value={id.nationalId || '—'}          ok={identityOk} />
          <SummaryRow label="ประเทศ"                    value={id.country ?? '—'}             ok={identityOk} />
          <SummaryRow label="บัตรหลัก"                  value={id.isPrimary ?? '—'}           ok={identityOk} />
          <SummaryRow label="คำนำหน้า (Local)"          value={id.salutationLocal ?? '—'}     ok={identityOk} />
          {/* Biographical summary */}
          <SummaryRow label="ชื่อ-นามสกุล (Local)"
            value={[bio.firstNameLocal, bio.lastNameLocal].filter(Boolean).join(' ') || '—'}
            ok={biographicalOk} />
          <SummaryRow label="ชื่อเล่น"                  value={bio.nickname || '—'}           ok={biographicalOk} />
          <SummaryRow label="เพศ"                       value={bio.gender ?? '—'}             ok={biographicalOk} />
          <SummaryRow label="สัญชาติ"                   value={bio.nationality ?? '—'}        ok={biographicalOk} />
          <SummaryRow label="กรุ๊ปเลือด"                value={bio.bloodType ?? '—'}          ok={biographicalOk} />
          <SummaryRow label="สถานภาพสมรส"              value={bio.maritalStatus ?? '—'}      ok={biographicalOk} />
          {/* Job summary */}
          <SummaryRow label="ประเภทพนักงาน"             value={formData.employeeInfo.employeeClass ?? '—'} ok={sliceValid.employeeInfo(formData)} />
          <SummaryRow label="ตำแหน่ง"                   value={formData.job.position || '—'}  ok={sliceValid.job(formData)} />
          <SummaryRow label="ค่าตอบแทน"                 value={salary}                        ok={sliceValid.compensation(formData)} />
          {/* HRBP assignment (mockup stub) */}
          <SummaryRow label="HRBP ที่มอบหมาย"           value={hrbpAssignee || '— ยังไม่เลือก —'} ok={!!hrbpAssignee} />
        </div>
      </div>
    </div>
  )
}
