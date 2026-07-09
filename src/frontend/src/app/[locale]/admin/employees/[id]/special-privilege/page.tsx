// VALIDATION_EXEMPT: STA-90 BE-03 Special Privilege — per-employee benefit + วงเงิน override.
'use client'

// special-privilege/page.tsx — เพิ่ม/ปรับสวัสดิการรายคน (SF BE-03)
//
// STA-90: HR Admin assigns a benefit plan + overrides วงเงิน per individual
// employee. No approval flow (BE-03 is terminal), not routed to /quick-approve.
// Persists to useSpecialPrivilegeStore. Mockup phase — no backend.

import { useCallback, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowLeft, BadgePlus } from 'lucide-react'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { formatCurrency } from '@/lib/date'
import { useAuthStore } from '@/stores/auth-store'
import { ActionGuardBanner } from '@/components/admin/ActionGuardBanner'
import { actionAvailability } from '@/lib/admin/actionAvailability'
import { Toggle, Textarea } from '@/components/humi'
import { FileUploadField } from '@/components/humi/molecules/FileUploadField'
import {
  BENEFIT_PLAN_REGISTRY,
  getPlan,
  isV2Plan,
} from '@/data/benefits/plan-registry'
import {
  useSpecialPrivilegeStore,
  type SpecialPrivilegeSchedulePeriod,
} from '@/stores/special-privilege-store'

const SCHEDULE_PERIODS: SpecialPrivilegeSchedulePeriod[] = [
  'year',
  'month',
  'quarter',
  'one-time',
  'lifetime',
]

const SELECT_CLASS = [
  'w-full rounded-md border px-3 py-2 text-body bg-surface text-ink',
  'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas',
  'border-hairline focus:border-accent',
].join(' ')

export default function SpecialPrivilegePage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null
  const t = useTranslations('admin.specialPrivilege')

  const addPrivilege = useSpecialPrivilegeStore((s) => s.addPrivilege)
  const actorName = useAuthStore((s) => s.username) ?? 'HR Admin'

  // Form state
  const [specialBenefitGroup, setSpecialBenefitGroup] = useState(true)
  const [planId, setPlanId] = useState<string>('')
  const [schedulePeriod, setSchedulePeriod] =
    useState<SpecialPrivilegeSchedulePeriod>('year')
  const [entitlementAmount, setEntitlementAmount] = useState<string>('')
  const [maxPerClaim, setMaxPerClaim] = useState<string>('')
  const [effectiveStart, setEffectiveStart] = useState<string>('')
  const [effectiveEnd, setEffectiveEnd] = useState<string>('')
  const [reason, setReason] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)
  const [reasonError, setReasonError] = useState(false)

  const selectedPlan = useMemo(
    () => (planId ? getPlan(planId) : undefined),
    [planId],
  )

  // Default entitlement from V2 plan coverage (V1 has no coverage object).
  const planDefaultEntitlement = useMemo(() => {
    if (!selectedPlan) return null
    return isV2Plan(selectedPlan) ? selectedPlan.coverage.entitlementAmount : null
  }, [selectedPlan])

  const onPlanChange = useCallback(
    (id: string) => {
      setPlanId(id)
      const plan = getPlan(id)
      if (plan && isV2Plan(plan) && plan.coverage.entitlementAmount != null) {
        setEntitlementAmount(String(plan.coverage.entitlementAmount))
      }
    },
    [],
  )

  const doSubmit = useCallback(() => {
    if (!employee || submitted) return
    if (!reason.trim()) {
      setReasonError(true)
      return
    }
    addPrivilege({
      employeeId: empId,
      specialBenefitGroup,
      planId,
      schedulePeriod,
      benefitEntitlementAmount: entitlementAmount !== '' ? Number(entitlementAmount) : 0,
      maxPerClaim: maxPerClaim !== '' ? Number(maxPerClaim) : 0,
      effectiveStartDate: effectiveStart ? new Date(effectiveStart).toISOString() : '',
      effectiveEndDate: effectiveEnd ? new Date(effectiveEnd).toISOString() : '',
      reason: reason.trim(),
      createdBy: actorName,
    })
    setSubmitted(true)
    router.push(`/${locale}/admin/employees/${empId}`)
  }, [
    employee, submitted, reason, addPrivilege, empId, specialBenefitGroup, planId,
    schedulePeriod, entitlementAmount, maxPerClaim, effectiveStart, effectiveEnd,
    actorName, router, locale,
  ])

  if (!employee) {
    return (
      <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <Link
            href={`/${locale}/admin/employees`}
            className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
            style={{ display: 'inline-flex', gap: 6 }}
          >
            <ArrowLeft size={16} aria-hidden />
            <span>รายการพนักงาน</span>
          </Link>
        </div>
        <div className="humi-card" style={{ textAlign: 'center', padding: 40 }}>
          <p className="text-body text-ink-muted">ไม่พบพนักงานรหัส &ldquo;{empId}&rdquo;</p>
        </div>
      </div>
    )
  }

  // Deep-link guard — reuse the same change_type isActive gate as the action card.
  const guard = actionAvailability(employee).change_type
  if (!guard.ok) {
    return (
      <ActionGuardBanner
        actionKey="change_type"
        reason={guard.reason ?? ''}
        backHref={`/${locale}/admin/employees/${empId}`}
        actionLabel={t('title')}
      />
    )
  }

  const nameTh = `${employee.first_name_th} ${employee.last_name_th}`
  const nameEn = `${employee.first_name_en} ${employee.last_name_en}`

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Back nav */}
      <div>
        <Link
          href={`/${locale}/admin/employees/${empId}`}
          className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
          style={{ display: 'inline-flex', gap: 6 }}
        >
          <ArrowLeft size={16} aria-hidden />
          <span>กลับไปหน้าข้อมูลพนักงาน</span>
        </Link>
      </div>

      {/* Page title */}
      <div className="humi-row" style={{ gap: 10, alignItems: 'center' }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'var(--color-accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, color: 'var(--color-accent)',
          }}
        >
          <BadgePlus size={18} aria-hidden />
        </div>
        <div>
          <div className="humi-eyebrow">{t('pageTitle')}</div>
          <h1 className="font-display text-xl font-semibold text-ink">{t('title')}</h1>
        </div>
      </div>

      {/* Employee snapshot */}
      <div className="humi-card humi-card--cream">
        <div className="humi-eyebrow" style={{ marginBottom: 4 }}>{employee.employee_id}</div>
        <div className="font-display text-lg font-semibold text-ink">{nameTh}</div>
        <div className="text-small text-ink-muted">{nameEn}</div>
        <p className="text-small text-ink-soft" style={{ marginTop: 8 }}>{t('subtitle')}</p>
      </div>

      {/* Form */}
      <div className="humi-card ring-1 ring-accent-soft">
        {/* Special Benefit Group */}
        <div style={{ marginBottom: 20 }}>
          <Toggle
            checked={specialBenefitGroup}
            onChange={setSpecialBenefitGroup}
            label={t('fields.specialBenefitGroup')}
            description={t('fields.specialBenefitGroupDesc')}
          />
        </div>

        {/* Plan */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="sp-plan"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            {t('fields.plan')}
          </label>
          <select
            id="sp-plan"
            value={planId}
            onChange={(e) => onPlanChange(e.target.value)}
            className={SELECT_CLASS}
            style={{ maxWidth: 420 }}
          >
            <option value="" disabled>{t('fields.planPlaceholder')}</option>
            {BENEFIT_PLAN_REGISTRY.map((p) => (
              <option key={p.id} value={p.id}>
                {locale === 'th' ? p.nameTh : p.nameEn}
              </option>
            ))}
          </select>
          {planDefaultEntitlement != null && (
            <p className="text-small text-ink-muted" style={{ marginTop: 4 }}>
              {formatCurrency(planDefaultEntitlement)}
            </p>
          )}
        </div>

        {/* Schedule period */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="sp-schedule"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            {t('fields.schedulePeriod')}
          </label>
          <select
            id="sp-schedule"
            value={schedulePeriod}
            onChange={(e) => setSchedulePeriod(e.target.value as SpecialPrivilegeSchedulePeriod)}
            className={SELECT_CLASS}
            style={{ maxWidth: 240 }}
          >
            {SCHEDULE_PERIODS.map((sp) => (
              <option key={sp} value={sp}>
                {t(`fields.schedulePeriodOptions.${sp}` as never)}
              </option>
            ))}
          </select>
        </div>

        {/* Entitlement amount */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="sp-entitlement"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            {t('fields.entitlementAmount')}
          </label>
          <input
            id="sp-entitlement"
            type="number"
            min={0}
            value={entitlementAmount}
            onChange={(e) => setEntitlementAmount(e.target.value)}
            className="humi-input"
            style={{ maxWidth: 240 }}
          />
        </div>

        {/* Max per claim */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="sp-max"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            {t('fields.maxPerClaim')}
          </label>
          <input
            id="sp-max"
            type="number"
            min={0}
            value={maxPerClaim}
            onChange={(e) => setMaxPerClaim(e.target.value)}
            className="humi-input"
            style={{ maxWidth: 240 }}
          />
        </div>

        {/* Effective dates */}
        <div className="humi-row" style={{ gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label
              htmlFor="sp-start"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              {t('fields.effectiveStart')}
            </label>
            <input
              id="sp-start"
              type="date"
              value={effectiveStart}
              onChange={(e) => setEffectiveStart(e.target.value)}
              className="humi-input"
              style={{ maxWidth: 240 }}
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label
              htmlFor="sp-end"
              className="text-body font-semibold text-ink"
              style={{ display: 'block', marginBottom: 6 }}
            >
              {t('fields.effectiveEnd')}
            </label>
            <input
              id="sp-end"
              type="date"
              value={effectiveEnd}
              onChange={(e) => setEffectiveEnd(e.target.value)}
              className="humi-input"
              style={{ maxWidth: 240 }}
            />
          </div>
        </div>

        {/* Reason (required) */}
        <div style={{ marginBottom: 24 }}>
          <label
            htmlFor="sp-reason"
            className="text-body font-semibold text-ink"
            style={{ display: 'block', marginBottom: 6 }}
          >
            {t('fields.reason')} <span className="text-danger" aria-hidden>*</span>
          </label>
          <Textarea
            id="sp-reason"
            required
            invalid={reasonError}
            value={reason}
            onChange={(e) => { setReason(e.target.value); setReasonError(false) }}
            rows={3}
            style={{ maxWidth: 560 }}
          />
          {reasonError && (
            <p role="alert" className="text-small text-danger" style={{ marginTop: 4 }}>
              {t('validation.reasonRequired')}
            </p>
          )}
        </div>

        {/* Attachment (optional) */}
        <div style={{ marginBottom: 24, maxWidth: 560 }}>
          <FileUploadField
            label={locale === 'th' ? 'เอกสารแนบ' : 'Attachment'}
            required={false}
          />
        </div>

        {/* Actions */}
        <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10 }}>
          <Link
            href={`/${locale}/admin/employees/${empId}`}
            className="humi-btn humi-btn--ghost"
          >
            {t('buttons.cancel')}
          </Link>
          <button
            type="button"
            onClick={doSubmit}
            disabled={submitted}
            className="humi-btn humi-btn--primary"
            aria-disabled={submitted}
          >
            {t('buttons.submit')}
          </button>
        </div>
      </div>
    </div>
  )
}
