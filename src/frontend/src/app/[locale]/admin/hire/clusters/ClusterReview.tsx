'use client'

// ClusterReview.tsx — Cluster 3 of 3 (Review + HRBP assign)
// - EN name confirmation (BA Personal Info rows 6-9) readonly mirror จาก Identity
// - HRBP assignee + mail notify (audit #14, BRD #109) — mockup stub
// - Summary aggregating all clusters (Thai-primary labels)
// Attachment ย้ายไป StepBiographical (Step 1) ใน PR #35 — ไม่ต้องซ้ำที่นี่
// DEF-04: hrbpAssignee lifted from local state into Zustand store (BRD #109 gate)
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useHireWizard, sliceValid } from '@/lib/admin/store/useHireWizard'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { nextEmployeeCode } from '@/lib/admin/utils/employeeCode'
import { useHrbpRoster } from '@/lib/admin/store/hrbpRoster'
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

interface ClusterReviewProps {
  /** DEF-04: set true when handleSubmit finds hrbpAssignee empty (BRD #109) */
  hrbpError?: boolean
}

export default function ClusterReview({ hrbpError = false }: ClusterReviewProps) {
  const t = useTranslations('hireForm.review')
  const { formData } = useHireWizard()
  const id  = formData.identity
  const bio = formData.biographical
  const rev = formData.review
  const allEmployees = useEmployees((s) => s.all)

  // ── BA Personal Info rows 6-9 — EN name readonly mirror จาก Identity ─────
  const salutationEnReview = rev.salutationEnReview  ?? id.salutationEn  ?? ''
  const firstNameEnReview  = rev.firstNameEnReview   || id.firstNameEn   || ''
  const lastNameEnReview   = rev.lastNameEnReview    || id.lastNameEn    || ''
  const middleNameEnReview = rev.middleNameEnReview  || id.middleNameEn  || ''

  // ── HRBP assignee — BRD #109: lifted to Zustand store so wizard gate can check it
  // TODO Sprint 3: replace roster with real GET /hrbp-roster backend call
  const hrbpRoster = useHrbpRoster()
  const hrbpAssignee    = useHireWizard((s) => s.hrbpAssignee)
  const setHrbpAssignee = useHireWizard((s) => s.setHrbpAssignee)
  const [notifyHrbp, setNotifyHrbp] = useState(true)

  // ── Summary data ──────────────────────────────────────────────────────────
  const identityOk     = sliceValid.identity(formData)
  const biographicalOk = sliceValid.biographical(formData)

  const salary = formData.compensation.baseSalary
    ? `${formData.compensation.baseSalary.toLocaleString('th-TH')} ${t('salarySuffix')}`
    : '—'

  return (
    <div className="space-y-5">
      {/* ── ยืนยันชื่อ (EN) — 4 readonly mirror fields in 2-col grid ─── */}
      <div className="humi-card">
        <SectionHeader
          icon={UserCheck}
          eyebrow={t('enNameSectionEyebrow')}
          title={t('enNameSectionTitle')}
          sub={t('enNameSectionSub')}
        />
        <div className="humi-step-section grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          <fieldset>
            <label htmlFor="review-salutation-en" className="humi-label">{t('salutationEn')}</label>
            <input id="review-salutation-en" type="text" readOnly
              value={salutationEnReview}
              className="humi-input w-full bg-surface-muted cursor-not-allowed" />
          </fieldset>

          <fieldset>
            <label htmlFor="review-first-name-en" className="humi-label">{t('firstNameEn')}</label>
            <input id="review-first-name-en" type="text" readOnly
              value={firstNameEnReview}
              className="humi-input w-full bg-surface-muted cursor-not-allowed" />
          </fieldset>

          <fieldset>
            <label htmlFor="review-middle-name-en" className="humi-label">{t('middleNameEn')}</label>
            <input id="review-middle-name-en" type="text" readOnly
              value={middleNameEnReview}
              className="humi-input w-full bg-surface-muted cursor-not-allowed" />
          </fieldset>

          <fieldset>
            <label htmlFor="review-last-name-en" className="humi-label">{t('lastNameEn')}</label>
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
          eyebrow={t('hrbpSectionEyebrow')}
          title={t('hrbpSectionTitle')}
          sub={t('hrbpSectionSub')}
        />
        <div className="humi-step-section grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          <fieldset>
            <label htmlFor="hrbp-assignee" className="humi-label">
              {t('hrbpAssignee')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <select id="hrbp-assignee"
              value={hrbpAssignee}
              onChange={(e) => setHrbpAssignee(e.target.value)}
              aria-required="true"
              aria-invalid={hrbpError && !hrbpAssignee ? true : undefined}
              className="humi-select w-full">
              <option value="">{t('selectHrbp')}</option>
              {hrbpRoster.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.displayName} (HRBP — {h.businessUnit})
                </option>
              ))}
            </select>
            {hrbpError && !hrbpAssignee && (
              <p role="alert" className="mt-1 text-xs text-warning">
                {t('hrbpRequiredError')}
              </p>
            )}
          </fieldset>

          <fieldset className="md:pt-7">
            <label className="humi-row" style={{ gap: 8, cursor: 'pointer' }}>
              <input type="checkbox"
                checked={notifyHrbp}
                onChange={(e) => setNotifyHrbp(e.target.checked)}
                className="h-4 w-4" />
              <span className="text-body text-ink">{t('notifyHrbpLabel')}</span>
            </label>
            <p className="mt-1 text-xs text-ink-faint">{t('notifyHrbpHelp')}</p>
          </fieldset>
        </div>
      </div>

      {/* ── สรุปข้อมูลก่อนส่ง ─────────────────────────────────────────── */}
      <div className="humi-card humi-card--cream">
        <SectionHeader
          icon={ClipboardCheck}
          eyebrow={t('summarySectionEyebrow')}
          title={t('summarySectionTitle')}
          sub={t('summarySectionSub')}
        />
        <div>
          {/* Identity summary */}
          <SummaryRow label={t('summaryHireDate')}        value={id.hireDate ?? '—'}            ok={identityOk} />
          <SummaryRow label={t('summaryCompany')}         value={id.companyCode ?? '—'}         ok={identityOk} />
          <SummaryRow label={t('summaryEventReason')}     value={id.eventReason ?? '—'}         ok={identityOk} />
          <SummaryRow label={t('summarySalutationEn')}    value={id.salutationEn ?? '—'}        ok={identityOk} />
          <SummaryRow label={t('summaryNameEn')}
            value={[id.salutationEn, id.firstNameEn, id.middleNameEn, id.lastNameEn].filter(Boolean).join(' ') || '—'}
            ok={identityOk} />
          <SummaryRow label={t('summaryDateOfBirth')}     value={id.dateOfBirth ?? '—'}         ok={identityOk} />
          <SummaryRow label={t('summaryEmployeeId')}      value={id.employeeId || nextEmployeeCode(allEmployees) || '—'} ok={true} />
          <SummaryRow label={t('summaryIdCardType')}      value={id.nationalIdCardType ?? '—'}  ok={identityOk} />
          <SummaryRow label={t('summaryIdNumber')}        value={id.nationalId || '—'}          ok={identityOk} />
          <SummaryRow label={t('summaryCountry')}         value={id.country ?? '—'}             ok={identityOk} />
          <SummaryRow label={t('summaryIsPrimary')}       value={id.isPrimary ?? '—'}           ok={identityOk} />
          <SummaryRow label={t('summarySalutationLocal')} value={id.salutationLocal ?? '—'}     ok={identityOk} />
          {/* Biographical summary */}
          <SummaryRow label={t('summaryNameLocal')}
            value={[bio.firstNameLocal, bio.lastNameLocal].filter(Boolean).join(' ') || '—'}
            ok={biographicalOk} />
          <SummaryRow label={t('summaryNickname')}        value={bio.nickname || '—'}           ok={biographicalOk} />
          <SummaryRow label={t('summaryGender')}          value={bio.gender ?? '—'}             ok={biographicalOk} />
          <SummaryRow label={t('summaryNationality')}     value={bio.nationality ?? '—'}        ok={biographicalOk} />
          <SummaryRow label={t('summaryBloodType')}       value={bio.bloodType ?? '—'}          ok={biographicalOk} />
          <SummaryRow label={t('summaryMaritalStatus')}   value={bio.maritalStatus ?? '—'}      ok={biographicalOk} />
          {/* Job summary */}
          <SummaryRow label={t('summaryEmployeeClass')}   value={formData.employeeInfo.employeeClass ?? '—'} ok={sliceValid.employeeInfo(formData)} />
          <SummaryRow label={t('summaryPosition')}        value={formData.job.position || '—'}  ok={sliceValid.job(formData)} />
          <SummaryRow label={t('summaryCompensation')}    value={salary}                        ok={sliceValid.compensation(formData)} />
          {/* HRBP assignment (mockup stub) */}
          <SummaryRow label={t('summaryHrbp')}            value={hrbpAssignee || t('summaryNotSelected')} ok={!!hrbpAssignee} />
        </div>
      </div>
    </div>
  )
}
