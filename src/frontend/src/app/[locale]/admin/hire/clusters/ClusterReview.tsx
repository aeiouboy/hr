'use client'

// ClusterReview.tsx — Cluster 3 of 3 (Review + Direct Manager approval + HRBP notify)
// - EN name confirmation (BA Personal Info rows 6-9) readonly mirror จาก Identity
// - Direct Manager approval + HRBP notification (audit #14, BRD #109)
// - Summary aggregating all clusters (Thai-primary labels)
// Attachment ย้ายไป StepBiographical (Step 1) ใน PR #35 — ไม่ต้องซ้ำที่นี่
// DEF-04: hrbpAssignee lifted from local state into Zustand store (BRD #109 gate)
import type { ElementType } from 'react'
import { useTranslations } from 'next-intl'
import { useHireWizard, sliceValid } from '@/lib/admin/store/useHireWizard'
import { useHrbpRoster } from '@/lib/admin/store/hrbpRoster'
import { deriveUserId, deriveUsername } from '@/lib/admin/hire/sfMapper/derivedRules'
import { ClipboardCheck, Check, AlertCircle, UserCheck, PhoneCall, Users } from 'lucide-react'

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

function ReviewCheckpointHeader({
  icon: Icon,
  title,
  sub,
}: {
  icon: ElementType
  title: string
  sub?: string
}) {
  return (
    <div className="mb-4 flex items-start gap-2.5">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon size={14} aria-hidden />
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-[16px] font-semibold leading-tight text-ink">{title}</h3>
        {sub && <p className="mt-1 text-small text-ink-muted">{sub}</p>}
      </div>
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
  // Defensive defaults — persisted localStorage from older app versions may be
  // missing slices added later. Default to {}/[] so reads below never throw
  // on stale state. (TODO: add a store-level rehydrate migration that fills
  // missing slices from initial state instead of patching at consumer sites.)
  const id           = formData.identity          ?? ({} as typeof formData.identity)
  const bio          = formData.biographical      ?? ({} as typeof formData.biographical)
  const rev          = formData.review            ?? ({} as typeof formData.review)
  const compensation = formData.compensation      ?? ({} as typeof formData.compensation)
  const contact      = formData.contact           ?? ({ emails: [] } as typeof formData.contact)
  const employeeInfo = formData.employeeInfo      ?? ({} as typeof formData.employeeInfo)
  const job          = formData.job               ?? ({} as typeof formData.job)
  const emergencyContacts = formData.emergencyContacts ?? []
  const dependents   = formData.dependents             ?? []

  // ── BA Personal Info rows 6-9 — EN name readonly mirror จาก Identity ─────
  const salutationEnReview = rev.salutationEnReview  ?? id.salutationEn  ?? ''
  const firstNameEnReview  = rev.firstNameEnReview   || id.firstNameEn   || ''
  const lastNameEnReview   = rev.lastNameEnReview    || id.lastNameEn    || ''
  const middleNameEnReview = rev.middleNameEnReview  || id.middleNameEn  || ''

  // ── Direct Manager approver + HRBP assignee — BRD #109
  // TODO Sprint 3: replace roster with real GET /hrbp-roster backend call
  const hrbpRoster = useHrbpRoster()
  const hrbpAssignee    = useHireWizard((s) => s.hrbpAssignee)
  const setHrbpAssignee = useHireWizard((s) => s.setHrbpAssignee)
  const directManagerValue = job.supervisorId
    ? `${job.supervisorId}${job.supervisorLabel ? ` — ${job.supervisorLabel}` : ''}`
    : t('summaryNotSelected')

  // ── Summary data ──────────────────────────────────────────────────────────
  const identityOk     = sliceValid.identity(formData)
  const biographicalOk = sliceValid.biographical(formData)

  const salary = compensation.baseSalary
    ? `${compensation.baseSalary.toLocaleString('th-TH')} ${t('salarySuffix')}`
    : '—'

  // Phase 5: derive username using same logic as User mapper (Q5 decision: from primary email)
  const primaryEmail = (contact.emails ?? []).find((e) => e.isPrimary)?.value
  const derivedUserId = deriveUserId(id.employeeId || '')
  const derivedUsername = deriveUsername(primaryEmail, derivedUserId)
  const employeeGroupValue = [employeeInfo.employeeGroup, employeeInfo.employeeSubGroup].filter(Boolean).join(' / ') || '—'

  return (
    <div id="review" className="space-y-5">
      {/* ── ยืนยันชื่อ (EN) — 4 readonly mirror fields in 2-col grid ─── */}
      <div id="review.enName" className="humi-card scroll-mt-6">
        <ReviewCheckpointHeader
          icon={UserCheck}
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

      {/* ── Direct Manager approval + HRBP notification — audit #14 / BRD #109 ─────────── */}
      <div id="review.hrbp" className="humi-card scroll-mt-6">
        <ReviewCheckpointHeader
          icon={UserCheck}
          title={t('hrbpSectionTitle')}
          sub={t('hrbpSectionSub')}
        />
        <div className="humi-step-section grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          <fieldset>
            <label htmlFor="direct-manager-approver" className="humi-label">
              {t('directManagerApprover')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input
              id="direct-manager-approver"
              type="text"
              readOnly
              value={directManagerValue}
              className="humi-input w-full bg-surface-muted cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-ink-faint">{t('directManagerHelp')}</p>
          </fieldset>

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

          <fieldset className="md:col-span-2">
            <label className="humi-row" style={{ gap: 8 }}>
              <input type="checkbox"
                checked
                readOnly
                className="h-4 w-4" />
              <span className="text-body text-ink">{t('notifyHrbpLabel')}</span>
            </label>
            <p className="mt-1 text-xs text-ink-faint">{t('notifyHrbpHelp')}</p>
          </fieldset>
        </div>
      </div>

      {/* ── สรุปข้อมูลก่อนส่ง ─────────────────────────────────────────── */}
      <div id="review.summary" className="humi-card humi-card--cream scroll-mt-6">
        <ReviewCheckpointHeader
          icon={ClipboardCheck}
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
          <SummaryRow label={t('summaryEmployeeId')}      value={id.employeeId || 'สร้างหลัง Submit'} ok={true} />
          {/* Phase 5: auto-derived username (Q5 decision: from primary email, fallback to employeeId) */}
          <SummaryRow label="Username" value={derivedUsername || '—'} ok={!!derivedUsername} />
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
          <SummaryRow label={t('summaryEmployeeClass')}   value={employeeGroupValue} ok={sliceValid.employeeInfo(formData)} />
          <SummaryRow label={t('summaryPosition')}        value={job.position || '—'}  ok={sliceValid.job(formData)} />
          <SummaryRow label={t('summaryCompensation')}    value={salary}                        ok={sliceValid.compensation(formData)} />
          <SummaryRow label={t('summaryDirectManager')}    value={directManagerValue}             ok={!!job.supervisorId} />
          <SummaryRow label={t('summaryHrbp')}            value={hrbpAssignee || t('summaryNotSelected')} ok={!!hrbpAssignee} />
        </div>
      </div>

      {/* ── ผู้ติดต่อฉุกเฉิน (Phase 1.4) — read-only mirror ─────────────── */}
      {emergencyContacts && emergencyContacts.length > 0 && (
        <div className="humi-card">
          <ReviewCheckpointHeader
            icon={PhoneCall}
            title="ผู้ติดต่อฉุกเฉิน / Emergency Contacts"
            sub={`${emergencyContacts.length} รายการ`}
          />
          <div className="humi-step-section space-y-3">
            {emergencyContacts.map((ec, idx) => (
              <div
                key={idx}
                className="rounded border border-hairline-soft bg-surface-muted px-4 py-3 text-sm space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink">{ec.name || '—'}</span>
                  {ec.primaryFlag && (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                      Primary
                    </span>
                  )}
                </div>
                <div className="text-ink-soft">
                  {ec.relationship || '—'} · {ec.phone || '—'}
                </div>
                {(ec.addressProvince || ec.addressDistrict || ec.addressPostalCode) && (
                  <div className="text-ink-muted text-xs">
                    {[ec.addressSubDistrict, ec.addressDistrict, ec.addressProvince, ec.addressPostalCode, ec.addressCountry]
                      .filter(Boolean)
                      .join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── บุคคลในอุปการะ (Phase 5b-4) — read-only mirror ──────────────── */}
      {dependents && dependents.length > 0 && (
        <div className="humi-card">
          <ReviewCheckpointHeader
            icon={Users}
            title="บุคคลในอุปการะ / Dependents"
            sub={`${dependents.length} รายการ`}
          />
          <div className="humi-step-section space-y-3">
            {dependents.map((dep, idx) => {
              const nameEn = [dep.salutationEn, dep.firstNameEn, dep.lastNameEn].filter(Boolean).join(' ')
              const nameLocal = [dep.salutationLocal, dep.firstNameLocal, dep.lastNameLocal].filter(Boolean).join(' ')
              return (
                <div
                  key={idx}
                  className="rounded border border-hairline-soft bg-surface-muted px-4 py-3 text-sm space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-ink">{nameEn || nameLocal || '—'}</span>
                    {dep.isTaxDependent && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                        Tax
                      </span>
                    )}
                  </div>
                  <div className="text-ink-soft">
                    {dep.relationshipType || '—'}
                    {nameLocal && nameEn && ` · ${nameLocal}`}
                  </div>
                  {(dep.nationality || dep.dateOfBirth) && (
                    <div className="text-ink-muted text-xs">
                      {[dep.nationality, dep.dateOfBirth].filter(Boolean).join(' · ')}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
