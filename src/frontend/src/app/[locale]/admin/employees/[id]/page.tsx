'use client'

// employees/[id]/page.tsx — EmployeeDetail journey hub (S3, Wave 1)
//
// Sections:
//   A. Snapshot card — avatar + name + ID + class + hire date + tenure + org info + status
//   B. Timeline event log — TimelineEvent[] sorted newest first, scrollable
//   C. Action menu — lifecycle action cards (see ACTION_CARDS)
//
// Consume-only patterns (C1 surgical):
//   - useEmployees (S2) — read via selector, no internal mutation
//   - useTimelines (S3 own) — seed on mount, read via .get()
//
// C8: action card count is driven by ACTION_CARDS — no hardcoded count

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useShallow } from 'zustand/react/shallow'
import Link from 'next/link'
import {
  ArrowLeft,
  ClipboardCheck,
  Pencil,
  ArrowRightLeft,
  UserX,
  UserCheck,
  FileText,
  Lock,
  CalendarDays,
  Building2,
  Briefcase,
  RefreshCw,
  TrendingUp,
  MapPin,
  Network,
  Star,
  BadgePlus,
  Trash2,
  Gift,
  ArrowLeftRight,
} from 'lucide-react'
import { useTimelines } from '@/lib/admin/store/useTimelines'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { useAuthStore } from '@/stores/auth-store'
import type { TimelineEvent } from '@hrms/shared/types/timeline'
import { useTerminationApprovals, TERMINATION_REASON_LABEL, TERMINATION_STEP_LABEL } from '@/stores/termination-approvals'
import { usePromotionApprovals, PROMOTION_STEP_LABEL } from '@/stores/promotion-approvals'
import { calcAge, calcGeneration, calcYearOfService, calcYearsInJob, calcYearsInCorpTitle, calcYearsInPosition, calcYearsInBU } from '@/lib/calculations'
import type { LifecycleEvent } from '@/lib/calculations'
import { mapEmplStatusCode } from '@/lib/employee/empStatus'
import CompensationHistory from '@/components/profile/CompensationHistory'
import { formatCurrency, formatDate } from '@/lib/date'
import { getPlan, getPlansByTemplate, isV2Plan, type BenefitPlan } from '@/data/benefits/plan-registry'
import { SimpleClaimForm } from '@/components/benefits/templates'
import { EmptyState, DataTable, Modal, Button, FormField, FormInput, type DataTableColumn } from '@/components/humi'
import { CollapsibleSectionCard } from '@/components/admin/wizard/CollapsibleSectionCard'
import {
  useSpecialPrivilegeStore,
  selectPrivilegesForEmployee,
} from '@/stores/special-privilege-store'
import {
  useBudgetReallocationStore,
  selectReallocationsForEmployee,
  type ReallocationRecord,
} from '@/stores/budget-reallocation-store'

// ── Avatar color by status ───────────────────────────────────
function avatarClass(status: string): string {
  switch (status) {
    case 'active': return 'humi-avatar humi-avatar--teal'
    case 'terminated': return 'humi-avatar humi-avatar--ink'
    default: return 'humi-avatar humi-avatar--sage'
  }
}

function avatarInitials(emp: { first_name_th: string; last_name_th: string }): string {
  const th = `${emp.first_name_th} ${emp.last_name_th}`.trim()
  const parts = th.split(' ')
  if (parts.length >= 2) return `${parts[0].charAt(0)}${parts[1].charAt(0)}`
  return parts[0].charAt(0)
}

// ── Status badge ─────────────────────────────────────────────
// BRD #87: emplStatusDisplay derived from SF emplStatus code via mapEmplStatusCode()
function StatusBadge({ status, emplStatusDisplay }: { status: string; emplStatusDisplay?: string | null }) {
  const map: Record<string, string> = {
    active: 'humi-tag humi-tag--accent',
    terminated: 'humi-tag humi-tag--coral',
    inactive: 'humi-tag',
  }
  const cls = map[status] ?? 'humi-tag'
  const fallbackLabel: Record<string, string> = {
    active: 'ทำงานอยู่',
    terminated: 'ออกจากงานแล้ว',
    inactive: 'ไม่ได้ทำงาน',
  }
  // Prefer SF-derived label; fall back to mock string
  const label = emplStatusDisplay ?? fallbackLabel[status] ?? status
  return <span className={cls}>{label}</span>
}

// ── ClassBadge (PERMANENT / PARTIME) ────────────────────────
function ClassBadge({ empClass }: { empClass?: string }) {
  const label = empClass === 'PARTIME' ? 'Part-time' : 'Permanent'
  const cls = empClass === 'PARTIME' ? 'humi-tag humi-tag--butter' : 'humi-tag humi-tag--sage'
  return <span className={cls}>{label}</span>
}

// ── Timeline event label ─────────────────────────────────────
const EVENT_LABELS: Record<string, string> = {
  hire: 'เริ่มงาน',
  probation_assess: 'ประเมินทดลองงาน',
  transfer: 'โอนย้าย',
  terminate: 'ออกจากงาน',
  rehire: 'รับกลับเข้าทำงาน',
  contract_renewal: 'ต่อสัญญา',
  promotion: 'เลื่อนตำแหน่ง',
  acting_start: 'เริ่มรักษาการ',
  acting_end: 'สิ้นสุดรักษาการ',
}

const EVENT_DOT_CLASS: Record<string, string> = {
  hire: 'bg-accent',
  probation_assess: 'bg-info',
  transfer: 'bg-warning',
  terminate: 'bg-danger',
  rehire: 'bg-success',
  contract_renewal: 'bg-sage',
  promotion: 'bg-butter',
  acting_start: 'bg-accent',
  acting_end: 'bg-ink-faint',
}

function TimelineRow({ event }: { event: TimelineEvent }) {
  const dotCls = EVENT_DOT_CLASS[event.kind] ?? 'bg-ink-faint'
  const label = EVENT_LABELS[event.kind] ?? event.kind
  const effectiveFormatted = new Date(event.effectiveDate).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const recordedFormatted = new Date(event.recordedAt).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

  return (
    <div className="flex gap-3 py-3 border-b border-[color:var(--color-hairline-soft)] last:border-0">
      {/* dot + vertical line */}
      <div className="flex flex-col items-center pt-1">
        <span
          className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotCls}`}
          style={{ background: `var(--color-${dotCls.replace('bg-', '')}, #8A97A8)` }}
          aria-hidden
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="humi-row" style={{ gap: 8, flexWrap: 'wrap' }}>
          <span className="text-body font-semibold text-ink">{label}</span>
          <span className="text-small text-ink-muted">วันที่มีผล: {effectiveFormatted}</span>
        </div>
        <div className="text-small text-ink-muted mt-0.5">บันทึกเมื่อ: {recordedFormatted}</div>
        {event.notes && (
          <div className="mt-1 text-small text-ink-soft italic">{event.notes}</div>
        )}
      </div>
    </div>
  )
}

// ── Action card types ────────────────────────────────────────
interface ActionCard {
  icon: React.ElementType
  label: string
  desc: string
  href?: string
  locked: boolean
  lockReason?: string
}

// ── Status-gated action availability (Ken 2026-04-24 — don't show probation
//    to a terminated employee). Rules derived from BRD + 2026-04-23 audit:
//    - terminated: only rehire available
//    - inactive:   read-only (all locked); user must be reactivated first
//    - active + in_probation/extended: probation + edit + terminate only
//    - active + passed (or terminated-prob): all change actions except probation
//    - contract_renewal: gated to PARTIME (contract-based) employees
//    - change_type: always available on active employees
// ─────────────────────────────────────────────────────────────
// actionAvailability moved to @/lib/admin/actionAvailability — shared with
// per-route guard banners (P3). Single source of truth for status gating.
import { actionAvailability } from '@/lib/admin/actionAvailability'

// Current-benefit roll-up (illustrative seed — the admin employee store has no
// per-employee enrollment schema; mockup phase shows standard Central Group
// benefits so the section demos with realistic rows). Read-only, no backend.
// STA-103: row = summary columns (name / plan ID / amount used / entitle amount);
// the per-benefit detail attributes (Individual plan + Benefit Plan + Eligibility
// rule) hydrate the "more detail" modal. Values seeded from the BA excel sample.
type CurrentBenefit = {
  benefitName: string
  benefitPlanId: string
  amountUsed: number
  entitleAmount: number
  currency: string
  // Individual plan
  effectiveStartDate: string
  effectiveEndDate: string
  reimbursedAmount: number | null
  // Benefit Plan — info
  country: string
  benefitCategory: string
  // Benefit Plan — type / group
  benefitType: string
  benefitSubType: string
  // Benefit Plan — enrollment
  enrollment: string
  // Benefit Plan — claim condition
  claimPeriod: string
  entitlementCalcMethod: string
  eligibleClaimDate: string
  specialClaimCondition: string
  // Benefit Eligibility rule — id + validity
  ruleId: string
  ruleName: string
  // Benefit Eligibility rule — effective of plan
  effectiveType: string
  waitingPeriod: string
  // Benefit Eligibility rule — reimbursement limit
  originalEntitlementBeforeProrate: number | null
  originalEntitlementAfterProrate: number | null
  adjustedEntitlementAmount: number | null
  finalEntitlementAmount: number | null
  maximumAmountPerClaim: number | null
}

const CURRENT_BENEFITS: ReadonlyArray<CurrentBenefit> = [
  {
    benefitName: 'Medical Reimbursement',
    benefitPlanId: 'TH_MED_001',
    amountUsed: 38000,
    entitleAmount: 38000,
    currency: 'THB',
    effectiveStartDate: '2026-01-01',
    effectiveEndDate: '2026-12-31',
    reimbursedAmount: 38000,
    country: 'TH',
    benefitCategory: 'Medical',
    benefitType: 'Reimbursement: Employee, HR',
    benefitSubType: '',
    enrollment: 'AUTO',
    claimPeriod: 'YEAR',
    entitlementCalcMethod: 'FULL',
    eligibleClaimDate: '30',
    specialClaimCondition: 'Y (ePatient, Tops care)',
    ruleId: '258365',
    ruleName: 'Medical Reimbursement',
    effectiveType: 'HireDate',
    waitingPeriod: '',
    originalEntitlementBeforeProrate: 38000,
    originalEntitlementAfterProrate: 38000,
    adjustedEntitlementAmount: 0,
    finalEntitlementAmount: 38000,
    maximumAmountPerClaim: null,
  },
  {
    benefitName: 'Dental Reimbursement',
    benefitPlanId: 'TH_DEN_001',
    amountUsed: 500,
    entitleAmount: 2000,
    currency: 'THB',
    effectiveStartDate: '2026-01-01',
    effectiveEndDate: '2026-12-31',
    reimbursedAmount: 500,
    country: 'TH',
    benefitCategory: 'Medical',
    benefitType: 'Reimbursement: Employee, HR',
    benefitSubType: '',
    enrollment: 'AUTO',
    claimPeriod: 'YEAR',
    entitlementCalcMethod: 'FULL',
    eligibleClaimDate: '30',
    specialClaimCondition: 'Y (ePatient, Tops care)',
    ruleId: '258365',
    ruleName: 'Medical Reimbursement',
    effectiveType: 'HireDate',
    waitingPeriod: '',
    originalEntitlementBeforeProrate: 2000,
    originalEntitlementAfterProrate: 2000,
    adjustedEntitlementAmount: 0,
    finalEntitlementAmount: 2000,
    maximumAmountPerClaim: null,
  },
  {
    benefitName: 'Gasoline Reimbursement',
    benefitPlanId: 'TH_GAS_001',
    amountUsed: 84000,
    entitleAmount: 84000,
    currency: 'THB',
    effectiveStartDate: '2026-01-01',
    effectiveEndDate: '2026-12-31',
    reimbursedAmount: 84000,
    country: 'TH',
    benefitCategory: 'Gasoline',
    benefitType: 'Reimbursement: Employee, HR',
    benefitSubType: '',
    enrollment: 'AUTO',
    claimPeriod: 'YEAR',
    entitlementCalcMethod: 'PRORATE',
    eligibleClaimDate: '90',
    specialClaimCondition: 'Y (Fleet card)',
    ruleId: '258853',
    ruleName: 'Gasoline Reimbursement',
    effectiveType: 'HireDate',
    waitingPeriod: '',
    originalEntitlementBeforeProrate: 84000,
    originalEntitlementAfterProrate: 84000,
    adjustedEntitlementAmount: 0,
    finalEntitlementAmount: 84000,
    maximumAmountPerClaim: null,
  },
  // STA-106: seed Gift-Ordination row (full STA-103 detail fields so
  // "More detail" renders no undefined).
  {
    benefitName: 'Gift-Ordination',
    benefitPlanId: 'TH_ORD_001',
    amountUsed: 0,
    entitleAmount: 2000,
    currency: 'THB',
    effectiveStartDate: '2026-01-01',
    effectiveEndDate: '2026-12-31',
    reimbursedAmount: 0,
    country: 'TH',
    benefitCategory: 'Gift',
    benefitType: 'Reimbursement: Employee, HR',
    benefitSubType: '',
    enrollment: 'AUTO',
    claimPeriod: 'YEAR',
    entitlementCalcMethod: 'FULL',
    eligibleClaimDate: '30',
    specialClaimCondition: '',
    ruleId: '258900',
    ruleName: 'Gift-Ordination',
    effectiveType: 'HireDate',
    waitingPeriod: '',
    originalEntitlementBeforeProrate: 2000,
    originalEntitlementAfterProrate: 2000,
    adjustedEntitlementAmount: 0,
    finalEntitlementAmount: 2000,
    maximumAmountPerClaim: null,
  },
]

// STA-106: "Start a claim" support on Current Benefits. Gift-Ordination is a
// registry "records" plan; BA confirmed (2026-06-12) it gets the same receipt
// claim form as the other rows, so all rows are claimable. Constant retained
// for one-line reversibility if the catalog later reclassifies Ordination.
const GIFT_ORD_CLAIMABLE = true
// Current-Benefits rows use TH_* ids; the plan registry uses BE-* ids.
const CURRENT_BENEFIT_TO_PLAN_ID: Record<string, string> = {
  TH_MED_001: 'BE-MED-001',
  TH_DEN_001: 'BE-DEN-001',
  TH_GAS_001: 'BE-GAS-001',
  TH_ORD_001: 'BE-GIF-002',
}
// Resolve a Current-Benefits row to a claimable BenefitPlan for the claim form.
// Falls back to a safe simple-claim plan so we never spread undefined; overrides
// name + annual limit so the registry's "[Records] …" prefix never leaks.
function resolveClaimPlan(b: CurrentBenefit): BenefitPlan {
  const base =
    getPlan(CURRENT_BENEFIT_TO_PLAN_ID[b.benefitPlanId]) ?? getPlansByTemplate('simple-claim')[0]
  return {
    ...base,
    nameTh: b.benefitName,
    nameEn: b.benefitName,
    annualLimitThb: b.entitleAmount,
  }
}

// STA-104: enrollable (not-yet-enrolled) benefits shown in the
// "Benefit enrollment" section below Current Benefits. Mockup seed only.
interface EnrollableBenefit {
  benefitName: string
  benefitPlanId: string
  selectedBenefitLabel: string
  enrolmentAmount: string
  entitlementAmount: string
  currency: string
  currencyTh: string
  enrolledInPeriod: string
}
const ENROLLABLE_BENEFITS: ReadonlyArray<EnrollableBenefit> = [
  {
    benefitName: 'Mobile allowance',
    benefitPlanId: 'TH_MOB_006',
    selectedBenefitLabel: 'Mobile allowance (TH_MOB_006)',
    enrolmentAmount: '1,500 THB/Month',
    entitlementAmount: '18,000',
    currency: 'Thai Baht (THB)',
    currencyTh: 'บาทไทย (THB)',
    enrolledInPeriod: 'Claim - Calendar Year 2026 (TH_CLAIM_CALENDAR_2026)',
  },
  {
    benefitName: 'Master degree scholarship',
    benefitPlanId: 'TH_EDU_001',
    selectedBenefitLabel: 'Master degree scholarship (TH_EDU_001)',
    enrolmentAmount: '5,000 THB/Month',
    entitlementAmount: '60,000',
    currency: 'Thai Baht (THB)',
    currencyTh: 'บาทไทย (THB)',
    enrolledInPeriod: 'Claim - Calendar Year 2026 (TH_CLAIM_CALENDAR_2026)',
  },
]

// STA-104: enrollment form body for the per-row "Enroll now" modal.
// 8 fields, fixed order (Selected Benefit first). Fields 1/3/5/6 read-only,
// 2/4/7 editable, 8 optional attachment (filename-only, no persistence).
// Mockup only — submit shows an inline success message, no backend/no Zustand.
function EnrollmentFormBody({
  benefit,
  isTh,
  onSubmit,
  onCancel,
}: {
  benefit: EnrollableBenefit
  isTh: boolean
  onSubmit: () => void
  onCancel: () => void
}) {
  const today = '2026-06-12'
  const [fileName, setFileName] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(onSubmit, 1100)
  }

  return (
    <div className="space-y-4">
      {/* 1 — Selected Benefit (read-only) */}
      <FormField label={isTh ? 'สวัสดิการที่เลือก' : 'Selected Benefit'} required>
        {(p) => <FormInput {...p} value={benefit.selectedBenefitLabel} readOnly disabled />}
      </FormField>

      {/* 2 — Effective date (editable) */}
      <FormField label={isTh ? 'วันที่มีผล' : 'Effective date'} required>
        {(p) => <FormInput {...p} type="date" defaultValue={today} />}
      </FormField>

      {/* 3 — Enrolment Amount (read-only, derived) */}
      <FormField label={isTh ? 'จำนวนเงินที่ลงทะเบียน' : 'Enrolment Amount'} required>
        {(p) => <FormInput {...p} value={benefit.enrolmentAmount} readOnly disabled />}
      </FormField>

      {/* 4 — Benefit Entitlement Amount (editable) */}
      <FormField label={isTh ? 'สิทธิ์สวัสดิการ (วงเงิน)' : 'Benefit Entitlement Amount'} required>
        {(p) => <FormInput {...p} defaultValue={benefit.entitlementAmount} inputMode="numeric" />}
      </FormField>

      {/* 5 — Currency (read-only, fixed THB) */}
      <FormField label={isTh ? 'สกุลเงิน' : 'Currency'} required>
        {(p) => <FormInput {...p} value={isTh ? benefit.currencyTh : benefit.currency} readOnly disabled />}
      </FormField>

      {/* 6 — Enrolled in Period (read-only) */}
      <FormField label={isTh ? 'รอบที่ลงทะเบียน' : 'Enrolled in Period'} required>
        {(p) => <FormInput {...p} value={benefit.enrolledInPeriod} readOnly disabled />}
      </FormField>

      {/* 7 — Request Date (editable, defaults today) */}
      <FormField label={isTh ? 'วันที่ยื่นคำขอ' : 'Request Date'} required>
        {(p) => <FormInput {...p} type="date" defaultValue={today} />}
      </FormField>

      {/* 8 — Attachment (optional; filename-only preview, no persistence) */}
      <FormField
        label={isTh ? 'เอกสารแนบ' : 'Attachment'}
        help={
          isTh
            ? 'PDF, JPG, PNG, PPTX, XLSX — สูงสุด 10 MB (ไม่บังคับ)'
            : 'PDF, JPG, PNG, PPTX, XLSX — up to 10 MB (optional)'
        }
      >
        {(p) => (
          <input
            {...p}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.pptx,.xlsx"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            className="block w-full text-small text-ink file:mr-3 file:rounded-md file:border file:border-hairline file:bg-canvas-soft file:px-3 file:py-1.5 file:text-small file:font-medium file:text-ink hover:file:border-accent hover:file:text-accent file:transition-colors file:cursor-pointer"
          />
        )}
      </FormField>
      {fileName && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas-soft px-2.5 py-1 text-small text-ink-muted">
          {fileName}
        </span>
      )}

      {submitted && (
        <div role="status" className="rounded-[var(--radius-md)] bg-success-soft p-3 text-small font-medium text-ink">
          {isTh ? 'ส่งคำขอลงทะเบียนแล้ว' : 'Enrollment submitted'}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2 border-t border-hairline">
        <Button variant="secondary" onClick={onCancel} disabled={submitted}>
          {isTh ? 'ยกเลิก' : 'Cancel'}
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={submitted}>
          {isTh ? 'ลงทะเบียน' : 'Enroll now'}
        </Button>
      </div>
    </div>
  )
}

// STA-103: detail body for the "more detail" modal. Groups the benefit's
// attributes into the BA-spec sections (Individual plan / Benefit Plan /
// Benefit Eligibility rule). Read-only; blank values render as "-".
function BenefitDetailBody({ benefit, isTh }: { benefit: CurrentBenefit; isTh: boolean }) {
  const dash = (v: string | number | null | undefined): string => {
    if (v === null || v === undefined || v === '') return '-'
    return String(v)
  }
  const money = (v: number | null): string =>
    v === null || v === undefined ? '-' : `${v.toLocaleString('en-US')} ${benefit.currency}`

  const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-0.5">
      <span className="text-[length:var(--text-eyebrow)] text-ink-muted">{label}</span>
      <span className="text-small font-medium text-ink tabular-nums break-words">{value}</span>
    </div>
  )

  const GroupHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-display text-small font-semibold text-ink">{children}</h3>
  )
  const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">{children}</p>
  )
  const Grid = ({ children }: { children: React.ReactNode }) => (
    <div className="grid gap-3 sm:grid-cols-2">{children}</div>
  )

  return (
    <div className="space-y-6">
      {/* ── Individual plan ── */}
      <section className="space-y-3">
        <GroupHeading>{isTh ? 'แผนรายบุคคล' : 'Individual plan'}</GroupHeading>
        <Grid>
          <Field label={isTh ? 'วันเริ่มมีผล' : 'effectiveStartDate'} value={dash(benefit.effectiveStartDate ? formatDate(benefit.effectiveStartDate, 'medium', isTh ? 'th' : 'en') : '')} />
          <Field label={isTh ? 'วันสิ้นสุด' : 'effectiveEndDate'} value={dash(benefit.effectiveEndDate ? formatDate(benefit.effectiveEndDate, 'medium', isTh ? 'th' : 'en') : '')} />
          <Field label={isTh ? 'ยอดที่เบิกแล้ว' : 'Reimbursed amount'} value={money(benefit.reimbursedAmount)} />
        </Grid>
      </section>

      {/* ── Benefit Plan ── */}
      <section className="space-y-4 border-t border-hairline pt-4">
        <GroupHeading>{isTh ? 'แผนสวัสดิการ' : 'Benefit Plan'}</GroupHeading>

        <div className="space-y-2">
          <SubHeading>{isTh ? 'ข้อมูลสวัสดิการ' : 'Benefit info'}</SubHeading>
          <Grid>
            <Field label={isTh ? 'ประเทศ' : 'Country'} value={dash(benefit.country)} />
            <Field label={isTh ? 'หมวดสวัสดิการ' : 'Benefit category'} value={dash(benefit.benefitCategory)} />
            <Field label={isTh ? 'รหัสแผนสวัสดิการ' : 'Benefit plan ID'} value={dash(benefit.benefitPlanId)} />
            <Field label={isTh ? 'ชื่อสวัสดิการ' : 'Benefit name'} value={dash(benefit.benefitName)} />
          </Grid>
        </div>

        <div className="space-y-2">
          <SubHeading>{isTh ? 'ประเภท / กลุ่มสวัสดิการ' : 'Benefit type / group'}</SubHeading>
          <Grid>
            <Field label={isTh ? 'ประเภทสวัสดิการ' : 'Benefit type'} value={dash(benefit.benefitType)} />
            <Field label={isTh ? 'ประเภทย่อย' : 'Benefit sub type'} value={dash(benefit.benefitSubType)} />
          </Grid>
        </div>

        <div className="space-y-2">
          <SubHeading>{isTh ? 'การลงทะเบียน' : 'Enrollment'}</SubHeading>
          <Grid>
            <Field label={isTh ? 'การลงทะเบียน' : 'Enrollment'} value={dash(benefit.enrollment)} />
          </Grid>
        </div>

        <div className="space-y-2">
          <SubHeading>{isTh ? 'เงื่อนไขการเบิก' : 'Claim condition'}</SubHeading>
          <Grid>
            <Field label={isTh ? 'รอบการเบิก' : 'Claim period'} value={dash(benefit.claimPeriod)} />
            <Field label={isTh ? 'วิธีคำนวณสิทธิ์' : 'Entitlement amount cal method'} value={dash(benefit.entitlementCalcMethod)} />
            <Field label={isTh ? 'วันที่เบิกได้' : 'Eligible Claim date'} value={dash(benefit.eligibleClaimDate)} />
            <Field label={isTh ? 'เงื่อนไขการเบิกพิเศษ' : 'Special claim condition'} value={dash(benefit.specialClaimCondition)} />
          </Grid>
        </div>
      </section>

      {/* ── Benefit Eligibility rule ── */}
      <section className="space-y-4 border-t border-hairline pt-4">
        <GroupHeading>{isTh ? 'กฎเงื่อนไขสิทธิ์สวัสดิการ' : 'Benefit Eligibility rule'}</GroupHeading>

        <div className="space-y-2">
          <SubHeading>{isTh ? 'รหัสกฎและความถูกต้อง' : 'Rule ID and validity'}</SubHeading>
          <Grid>
            <Field label={isTh ? 'รหัสกฎ' : 'Rule ID'} value={dash(benefit.ruleId)} />
            <Field label={isTh ? 'ชื่อกฎ' : 'Rule name'} value={dash(benefit.ruleName)} />
          </Grid>
        </div>

        <div className="space-y-2">
          <SubHeading>{isTh ? 'การมีผลของแผน' : 'Effective of plan'}</SubHeading>
          <Grid>
            <Field label={isTh ? 'ประเภทการมีผล' : 'Effective type'} value={dash(benefit.effectiveType)} />
            <Field label={isTh ? 'ระยะเวลารอคอย' : 'Waiting period'} value={dash(benefit.waitingPeriod)} />
          </Grid>
        </div>

        <div className="space-y-2">
          <SubHeading>{isTh ? 'วงเงินการเบิก' : 'Reimbursement limit'}</SubHeading>
          <Grid>
            <Field label={isTh ? 'สิทธิ์ตั้งต้น (ก่อนเฉลี่ย)' : 'Original Entitlement Amount (Before prorate)'} value={money(benefit.originalEntitlementBeforeProrate)} />
            <Field label={isTh ? 'สิทธิ์ตั้งต้น (หลังเฉลี่ย)' : 'Original Entitlement Amount (After prorate)'} value={money(benefit.originalEntitlementAfterProrate)} />
            <Field label={isTh ? 'สิทธิ์ที่ปรับแล้ว' : 'Adjusted Entitlement Amount'} value={money(benefit.adjustedEntitlementAmount)} />
            <Field label={isTh ? 'สิทธิ์สุดท้าย' : 'Final entitlement amount'} value={money(benefit.finalEntitlementAmount)} />
            <Field label={isTh ? 'วงเงินสูงสุดต่อการเบิก' : 'Maximum Amount per Claim'} value={money(benefit.maximumAmountPerClaim)} />
          </Grid>
        </div>
      </section>
    </div>
  )
}

export default function EmployeeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const empId = params.id as string
  const locale = params.locale as string

  // Consume employee from S2 store (1K mock employees, snake_case schema)
  const employee = useEmployees((s) => s.getById(empId)) ?? null

  // BRD #207: HRBP-conditional PerPersonal snapshot
  const authRoles = useAuthStore((s) => s.roles)
  const isHRBPPlus = authRoles.some((r) => ['hrbp', 'spd', 'hr_admin', 'hr_manager'].includes(r))

  // STA-90: per-employee special privileges (shared single join path).
  // Selector returns a fresh array — wrap with useShallow to avoid re-render churn.
  const tSpecial = useTranslations('admin.specialPrivilege')
  const specialPrivileges = useSpecialPrivilegeStore(
    useShallow(selectPrivilegesForEmployee(empId)),
  )
  const removePrivilege = useSpecialPrivilegeStore((s) => s.removePrivilege)

  // STA-95: next-year budget reallocation log + live medical-pool totals.
  // Current base derives from the plan registry (single source of truth); the
  // store owns only the next-year base + the reallocation deltas.
  const tReallocate = useTranslations('admin.reallocateBudget')
  const reallocations = useBudgetReallocationStore(
    useShallow(selectReallocationsForEmployee(empId)),
  )
  const nextYearBases = useBudgetReallocationStore(useShallow((s) => s.nextYearBases))
  const { reallocRows, currentPool, nextPool, hasReallocData } = useMemo(() => {
    const regBase = (pid: string) => {
      const plan = getPlan(pid)
      return plan && isV2Plan(plan) ? plan.coverage.entitlementAmount ?? 0 : 0
    }
    const nextBaseOf = (pid: string) =>
      nextYearBases.find((b) => b.employeeId === empId && b.planId === pid)?.nextYearBase ?? 0
    // Per-row running totals (records arrive oldest-first from the selector).
    const cum: Record<string, number> = {}
    const rows = reallocations.map((rec) => {
      cum[rec.planId] = (cum[rec.planId] ?? 0) + rec.amount
      return {
        rec,
        // STA-95 (BA rule 2026-06-11): this-year stays at the annual entitlement;
        // only next year is reduced by the borrowed amount, so the gap between the
        // two years equals the transferred sum.
        currentTotal: regBase(rec.planId),
        nextTotal: nextBaseOf(rec.planId) - cum[rec.planId],
      }
    })
    // Aggregate "medical budget" pools across every plan with a seeded base/record.
    const plans = new Set<string>(
      nextYearBases.filter((b) => b.employeeId === empId).map((b) => b.planId),
    )
    reallocations.forEach((r) => plans.add(r.planId))
    let current = 0
    let next = 0
    plans.forEach((p) => {
      const moved = reallocations.filter((r) => r.planId === p).reduce((s, r) => s + r.amount, 0)
      current += regBase(p) // annual entitlement — unchanged by transfers
      next += nextBaseOf(p) - moved
    })
    return { reallocRows: rows, currentPool: current, nextPool: next, hasReallocData: plans.size > 0 || rows.length > 0 }
  }, [reallocations, nextYearBases, empId])

  type ReallocRow = { rec: ReallocationRecord; currentTotal: number; nextTotal: number }
  const reallocColumns: DataTableColumn<ReallocRow>[] = [
    {
      id: 'date', header: tReallocate('log.colDate'),
      cell: (r) => <span className="text-small text-ink-muted">{formatDate(r.rec.createdAt, 'medium', locale)}</span>,
      className: 'w-32',
    },
    {
      id: 'plan', header: tReallocate('log.colPlan'),
      cell: (r) => {
        const plan = getPlan(r.rec.planId)
        return <span className="text-small text-ink">{plan ? (locale === 'th' ? plan.nameTh : plan.nameEn) : r.rec.planId}</span>
      },
    },
    {
      id: 'amount', header: tReallocate('log.colAmount'), align: 'right' as const,
      cell: (r) => <span className="text-small font-semibold text-accent tabular-nums">+{formatCurrency(r.rec.amount)}</span>,
      className: 'w-28',
    },
    {
      id: 'current', header: tReallocate('log.colCurrentTotal'), align: 'right' as const,
      cell: (r) => <span className="text-small text-ink tabular-nums">{formatCurrency(r.currentTotal)}</span>,
      className: 'w-32',
    },
    {
      id: 'next', header: tReallocate('log.colNextTotal'), align: 'right' as const,
      cell: (r) => <span className={`text-small tabular-nums ${r.nextTotal < 0 ? 'text-danger' : 'text-ink'}`}>{formatCurrency(r.nextTotal)}</span>,
      className: 'w-32',
    },
    {
      id: 'reason', header: tReallocate('log.colReason'),
      cell: (r) => <span className="text-small text-ink-muted">{r.rec.reason}</span>,
    },
  ]

  // Collapsible section state (BA: page collapsible + Current Benefits default-closed).
  const isTh = locale === 'th'
  const expandLabel = isTh ? 'ขยาย' : 'Expand'
  const collapseLabel = isTh ? 'ย่อ' : 'Collapse'
  // BA: every collapsible section starts COLLAPSED — the admin opens only what they need.
  const [employmentCollapsed, setEmploymentCollapsed] = useState(true)
  const [privilegeCollapsed, setPrivilegeCollapsed] = useState(true)
  const [reallocCollapsed, setReallocCollapsed] = useState(true)
  const [benefitsCollapsed, setBenefitsCollapsed] = useState(true)
  // STA-103: which Current Benefit row's "more detail" modal is open (null = closed)
  const [benefitDetail, setBenefitDetail] = useState<CurrentBenefit | null>(null)
  // STA-104: "Benefit enrollment" section + per-row enroll modal (default-collapsed).
  const [enrollTarget, setEnrollTarget] = useState<EnrollableBenefit | null>(null)
  const [enrollmentCollapsed, setEnrollmentCollapsed] = useState(true)
  // STA-106: per-row "Start a claim" modal (HR files a claim on behalf of employee).
  const [claimTarget, setClaimTarget] = useState<CurrentBenefit | null>(null)

  // Timeline store — S3 owns this
  const { seed } = useTimelines()

  // Seed HireEvent on mount if not already seeded
  useEffect(() => {
    if (employee) seed(employee)
  }, [employee, seed])

  // Bug 3 fix: stable reference to avoid infinite loop when byEmployee[empId] is undefined
  // Direct selector `s.byEmployee[empId] ?? []` creates new [] each render → Object.is false → re-render loop
  const byEmployee = useTimelines((s) => s.byEmployee)
  const events = useMemo(() => byEmployee[empId] ?? [], [byEmployee, empId])

  // Sort newest first by effectiveDate
  const sortedEvents = useMemo(
    () => [...events].sort(
      (a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime(),
    ),
    [events],
  )

  // Workflow status snapshot — termination + promotion pending requests for this employee
  const terminationRequests = useTerminationApprovals((s) => s.requests)
  const promotionRequests = usePromotionApprovals((s) => s.requests)

  if (!employee) {
    return (
      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="humi-row text-body text-ink-muted mb-4 hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} aria-hidden />
          <span>กลับ</span>
        </button>
        <div className="humi-card" style={{ textAlign: 'center', padding: 40 }}>
          <p className="text-body text-ink-muted">ไม่พบพนักงานรหัส {empId}</p>
        </div>
      </div>
    )
  }

  const nameTh = `${employee.first_name_th} ${employee.last_name_th}`
  const nameEn = `${employee.first_name_en} ${employee.last_name_en}`
  const hireDateFormatted = new Date(employee.hire_date).toLocaleDateString('th-TH', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  // ── A8: computed fields — display-layer only (BRD #86-92) ───
  // A2 mockup: derive LifecycleEvent[] from the live Timeline (single source).
  // Includes both seeded mid-career events AND any user-submitted events from
  // /promotion + /transfer routes — so action submit visibly resets the chips.
  const lifecycleEvents: LifecycleEvent[] = events.flatMap((evt): LifecycleEvent[] => {
    switch (evt.kind) {
      case 'hire':    return [{ type: 'HIRE',            effectiveDate: evt.effectiveDate }]
      case 'rehire':  return [{ type: 'REHIRE',          effectiveDate: evt.effectiveDate }]
      case 'transfer': return [{ type: 'CHANGE_POSITION', effectiveDate: evt.effectiveDate }]
      case 'promotion': return [{ type: 'PROMOTION',      effectiveDate: evt.effectiveDate }]
      default: return []  // probation_assess / terminate / contract_renewal — irrelevant for counters
    }
  })
  const today = new Date().toISOString().slice(0, 10)

  const ageResult       = employee.date_of_birth ? calcAge(employee.date_of_birth, today) : null
  const genResult       = employee.date_of_birth ? calcGeneration(employee.date_of_birth) : null
  const yosResult       = employee.hire_date ? calcYearOfService(employee.hire_date, lifecycleEvents, today) : null
  const yijResult       = employee.hire_date ? calcYearsInJob(lifecycleEvents, today) : null
  const yictResult      = employee.hire_date ? calcYearsInCorpTitle(lifecycleEvents, today) : null
  const yipResult       = employee.hire_date ? calcYearsInPosition(lifecycleEvents, today) : null
  // BRD #86: 5th chip — Years in BU (calcYearsInBU from lib/calculations)
  const yibuResult      = employee.hire_date ? calcYearsInBU(lifecycleEvents, today) : null

  // BRD #87: emplStatus display from SF code
  // Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].emplStatus ("5581"=Active,"5597"=Terminated)
  const emplStatusDisplay = employee.empl_status_code
    ? mapEmplStatusCode(employee.empl_status_code)
    : null
  const latestTermination = terminationRequests.find((r) => r.employeeId === empId)
  const latestPromotion = promotionRequests.find((r) => r.employeeId === empId)

  // Compute status-gated availability once per render
  const avail = actionAvailability(employee)
  const ACTION_CARDS: ActionCard[] = [
    {
      icon: ClipboardCheck,
      label: 'ประเมินทดลองงาน',
      desc: 'บันทึกผลการประเมินช่วงทดลองงาน',
      href: `/${locale}/admin/employees/${empId}/probation`,
      locked: !avail.probation.ok,
      lockReason: avail.probation.reason,
    },
    {
      icon: Pencil,
      label: 'แก้ไขข้อมูลส่วนตัว',
      desc: 'อัปเดตข้อมูลชื่อ ที่อยู่ และข้อมูลส่วนตัว',
      href: `/${locale}/admin/employees/${empId}/edit`,
      locked: !avail.edit.ok,
      lockReason: avail.edit.reason,
    },
    {
      icon: ArrowRightLeft,
      label: 'โอนย้าย',
      desc: 'เปลี่ยนบริษัท หน่วยงาน ตำแหน่ง',
      href: `/${locale}/admin/employees/${empId}/transfer`,
      locked: !avail.transfer.ok,
      lockReason: avail.transfer.reason,
    },
    {
      icon: UserX,
      label: 'สิ้นสุดสภาพพนักงาน',
      desc: 'บันทึกการลาออกหรือสิ้นสุดการจ้างงาน',
      href: `/${locale}/admin/employees/${empId}/terminate`,
      locked: !avail.terminate.ok,
      lockReason: avail.terminate.reason,
    },
    {
      icon: FileText,
      label: 'ต่อสัญญา',
      desc: 'ต่ออายุสัญญาการจ้างงาน',
      href: `/${locale}/admin/employees/${empId}/contract-renewal`,
      locked: !avail.contract_renewal.ok,
      lockReason: avail.contract_renewal.reason,
    },
    {
      icon: UserCheck,
      label: 'จ้างซ้ำ',
      desc: 'รับกลับเข้าทำงานหลังสิ้นสุดสภาพ',
      href: `/${locale}/admin/employees/${empId}/rehire`,
      locked: !avail.rehire.ok,
      lockReason: avail.rehire.reason,
    },
    {
      icon: RefreshCw,
      label: 'เปลี่ยนประเภทการจ้าง',
      desc: 'เปลี่ยนระหว่างพนักงานประจำกับพนักงานบางเวลา',
      href: `/${locale}/admin/employees/${empId}/change-type`,
      locked: !avail.change_type.ok,
      lockReason: avail.change_type.reason,
    },
    {
      // STA-24: collapsed tile — promotion + pay-rate-change → single canonical route
      icon: TrendingUp,
      label: 'เลื่อนตำแหน่ง / ปรับเงินเดือน',
      desc: 'เลื่อนระดับ ปรับตำแหน่ง หรือปรับเงินเดือน',
      href: `/${locale}/admin/employees/${empId}/pay-rate-change`,
      locked: !avail.payRateChange.ok,
      lockReason: avail.payRateChange.reason,
    },
    {
      icon: Star,
      label: 'มอบหมายปฏิบัติการ',
      desc: 'กำหนดรักษาการตำแหน่ง',
      href: `/${locale}/admin/employees/${empId}/acting`,
      locked: !avail.acting.ok,
      lockReason: avail.acting.reason,
    },
  ]

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Back nav */}
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

      {/* ── Section A1: ข้อมูลส่วนตัว (Person-level — A3 split) ──── */}
      <div className="humi-card humi-grain" style={{ overflow: 'hidden' }}>
        <div
          className="humi-blob humi-blob--teal hidden lg:block"
          style={{ width: 100, height: 130, right: -20, top: -30, opacity: 0.7 }}
          aria-hidden
        />

        <div className="humi-eyebrow" style={{ marginBottom: 12 }}>ข้อมูลส่วนตัว</div>

        {/* top row: avatar + name + badges */}
        <div className="humi-row" style={{ alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div
            className={avatarClass(employee.status)}
            style={{ width: 56, height: 56, fontSize: 20, flexShrink: 0 }}
            aria-label={`Avatar: ${nameTh}`}
          >
            {avatarInitials(employee)}
          </div>

          {/* Name + ID + badges */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              {/* BRD #85: employmentId alongside HR employee_id
                  Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].employmentId */}
              {employee.employee_id}
              {employee.employment_id && (
                <span className="text-ink-faint" style={{ marginLeft: 8 }}>
                  · EJ: {employee.employment_id}
                </span>
              )}
            </div>
            <h1 className="font-display text-2xl font-semibold leading-tight text-ink">
              {nameTh}
            </h1>
            <div className="text-small text-ink-muted">{nameEn}</div>
            <div className="humi-row mt-2" style={{ gap: 8, flexWrap: 'wrap' }}>
              {/* BRD #87: emplStatus from SF code (5581=active, 5597=terminated)
                  Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].emplStatus */}
              <StatusBadge status={employee.status} emplStatusDisplay={emplStatusDisplay} />
              <ClassBadge empClass={employee.employee_class} />
            </div>
          </div>
        </div>

        {/* Person-level chips: อายุ + Generation */}
        {(ageResult || genResult) && (
          <>
            <hr className="humi-divider" />
            <div className="humi-row" style={{ gap: 12, flexWrap: 'wrap' }}>
              {ageResult && (
                <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 100 }}>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุ</div>
                  <div className="text-body font-semibold text-ink">{ageResult.display}</div>
                </div>
              )}
              {genResult && (
                <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 100 }}>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>Generation</div>
                  <div className="text-body font-semibold text-ink">{genResult}</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── Section A2: ข้อมูลการจ้างงาน (Employment-level — A3 split) ──── */}
      <CollapsibleSectionCard
        id="emp-employment"
        icon={Briefcase}
        eyebrow={isTh ? 'การจ้างงาน' : 'Employment'}
        title={isTh ? 'ข้อมูลการจ้างงาน' : 'Employment information'}
        sub=""
        collapsed={employmentCollapsed}
        onToggle={() => setEmploymentCollapsed((v) => !v)}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        dense
      >

        {/* Info grid: hire date, tenure, company, position, org unit */}
        <div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
          style={{ marginTop: 4 }}
        >
          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              <CalendarDays size={10} className="inline mr-1" aria-hidden />
              วันที่เริ่มงาน
            </div>
            <div className="text-body font-medium text-ink">{hireDateFormatted}</div>
            {employee.seniority_start_date !== employee.hire_date && (
              <div className="text-small text-ink-muted" style={{ marginTop: 2 }}>
                อายุงานนับจาก {new Date(employee.seniority_start_date).toLocaleDateString('th-TH', {
                  year: 'numeric', month: 'short', day: 'numeric',
                })}
              </div>
            )}
          </div>

          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              <Building2 size={10} className="inline mr-1" aria-hidden />
              บริษัท
            </div>
            <div className="text-body font-medium text-ink">{employee.company}</div>
            <div className="text-small text-ink-muted">หน่วยงาน {employee.org_unit}</div>
          </div>

          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              <Briefcase size={10} className="inline mr-1" aria-hidden />
              ตำแหน่ง
            </div>
            <div className="text-body font-medium text-ink">{employee.position_title}</div>
            {employee.corporate_title && employee.corporate_title !== employee.position_title && (
              <div className="text-small text-ink-muted">ระดับ {employee.corporate_title}</div>
            )}
            {/* BRD #88: position code from SF EmpJob.position
                Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].position = "9999C002" */}
            {employee.position_code && (
              <div className="text-small text-ink-faint" style={{ marginTop: 2 }}>
                รหัส: {employee.position_code}
              </div>
            )}
          </div>

          {/* BRD #88: payGrade + regularTemporary from SF EmpJob
              Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].payGrade="08", regularTemporary=null */}
          {(employee.pay_grade || employee.regular_temporary) && (
            <div>
              <div className="humi-eyebrow" style={{ marginBottom: 4 }}>Pay Grade / ประเภท</div>
              {employee.pay_grade && (
                <div className="text-body font-medium text-ink">PG-{employee.pay_grade}</div>
              )}
              {employee.regular_temporary && (
                <div className="text-small text-ink-muted">
                  {employee.regular_temporary === 'R' ? 'Regular (ประจำ)' : 'Temporary (ชั่วคราว)'}
                </div>
              )}
            </div>
          )}

          {/* STA-93: Special benefit group — beside Pay Grade (display-only Yes/No) */}
          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
              Special benefit group / กลุ่มสิทธิพิเศษ
            </div>
            <select
              className="humi-select"
              value={employee.special_benefit_group ? 'yes' : 'no'}
              disabled
              aria-label="Special benefit group / กลุ่มสิทธิพิเศษ"
            >
              <option value="yes">Yes / ใช่</option>
              <option value="no">No / ไม่ใช่</option>
            </select>
          </div>

          {/* Retail chips — audit A6/#11: conditional on non-null */}
          {employee.store_branch_code && (
            <div>
              <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
                <MapPin size={10} className="inline mr-1" aria-hidden />
                สาขา/หน่วยงาน
              </div>
              <div className="text-body font-medium text-ink">{employee.store_branch_code}</div>
            </div>
          )}
          {employee.hr_district && (
            <div>
              <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
                <Network size={10} className="inline mr-1" aria-hidden />
                เขต HR
              </div>
              <div className="text-body font-medium text-ink">{employee.hr_district}</div>
            </div>
          )}
        </div>

        {/* ── Acting chip — open acting roles derived from timeline ── */}
        {(() => {
          const openActingRoles = events
            .filter((e) => e.kind === 'acting_start')
            .filter((start) =>
              !events.some(
                (end) =>
                  end.kind === 'acting_end' &&
                  end.effectiveDate > start.effectiveDate &&
                  (end as import('@hrms/shared/types/timeline').ActingEvent).position ===
                    (start as import('@hrms/shared/types/timeline').ActingEvent).position,
              ),
            )
            .map((e) => (e as import('@hrms/shared/types/timeline').ActingEvent).position)

          if (openActingRoles.length === 0) return null
          return (
            <div className="humi-row" style={{ gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
              <span
                className="humi-tag humi-tag--accent"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
              >
                <Star size={11} aria-hidden />
                กำลังรักษาการ: {openActingRoles.join(', ')}
              </span>
            </div>
          )
        })()}

        {/* ── BRD #21: EmpEmployment fields ──────────────────────────────────────
            Source: sf-qas-EmpEmployment-2026-04-26.json → .d.results[0]
            Fields: originalStartDate, seniorityDate, serviceDate, okToRehire,
                    assignmentClass, hiringNotCompleted */}
        {(employee.original_start_date || employee.service_date || employee.ok_to_rehire !== undefined || employee.assignment_class || employee.hiring_not_completed) && (
          <>
            <hr className="humi-divider" />
            <div className="humi-eyebrow" style={{ marginBottom: 8 }}>ข้อมูลการจ้างงาน (EmpEmployment)</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" style={{ marginTop: 4 }}>
              {/* BRD #21: originalStartDate — earliest employment start incl. prior rehires */}
              {employee.original_start_date && employee.original_start_date !== employee.hire_date && (
                <div>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันเริ่มงานครั้งแรก</div>
                  <div className="text-body font-medium text-ink">
                    {new Date(employee.original_start_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              )}
              {/* BRD #21: serviceDate — for PF vesting calc */}
              {employee.service_date && employee.service_date !== employee.hire_date && (
                <div>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่นับอายุงาน (Service)</div>
                  <div className="text-body font-medium text-ink">
                    {new Date(employee.service_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              )}
              {employee.ok_to_rehire !== undefined && (
                <div>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>รับกลับได้?</div>
                  <div className="text-body font-medium text-ink">
                    {employee.ok_to_rehire ? 'ใช่' : 'ไม่ใช่'}
                  </div>
                </div>
              )}
              {employee.assignment_class && (
                <div>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ประเภทการมอบหมาย</div>
                  <div className="text-body font-medium text-ink">
                    {employee.assignment_class === 'ST' ? 'Standard' : employee.assignment_class}
                  </div>
                </div>
              )}
              {employee.hiring_not_completed && (
                <div>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>สถานะ Onboarding</div>
                  <div className="text-body font-medium" style={{ color: 'var(--color-warning)' }}>
                    ยังไม่เสร็จสิ้น
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── BRD #90: Job Grade effective-date history (collapsible) ────────────
            Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].seqNumber, startDate */}
        {employee.job_grade_history && employee.job_grade_history.length > 1 && (() => {
          const sorted = [...employee.job_grade_history].sort((a, b) => b.seqNumber - a.seqNumber)
          return (
            <>
              <hr className="humi-divider" />
              <details>
                <summary
                  className="humi-eyebrow"
                  style={{ cursor: 'pointer', marginBottom: 8, userSelect: 'none' }}
                >
                  ประวัติ Job Grade ({employee.job_grade_history.length} รายการ)
                </summary>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                  {sorted.map((jg) => (
                    <div
                      key={jg.seqNumber}
                      className="humi-row"
                      style={{ gap: 12, padding: '6px 10px', borderRadius: 6, background: 'var(--color-canvas-soft)' }}
                    >
                      <span className="humi-tag">{jg.grade}</span>
                      <span className="text-small text-ink-muted">
                        มีผลตั้งแต่ {new Date(jg.startDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-small text-ink-faint">seq {jg.seqNumber}</span>
                    </div>
                  ))}
                </div>
              </details>
            </>
          )
        })()}

        {/* ── BRD #92: Business Unit effective-date history (collapsible) ─────────
            Source: sf-qas-EmpJob-2026-04-26.json → .d.results[0].businessUnit, startDate */}
        {employee.bu_history && employee.bu_history.length > 1 && (() => {
          const sorted = [...employee.bu_history].sort((a, b) => b.seqNumber - a.seqNumber)
          return (
            <>
              <hr className="humi-divider" />
              <details>
                <summary
                  className="humi-eyebrow"
                  style={{ cursor: 'pointer', marginBottom: 8, userSelect: 'none' }}
                >
                  ประวัติหน่วยงาน / BU ({employee.bu_history.length} รายการ)
                </summary>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                  {sorted.map((bu) => (
                    <div
                      key={bu.seqNumber}
                      className="humi-row"
                      style={{ gap: 12, padding: '6px 10px', borderRadius: 6, background: 'var(--color-canvas-soft)' }}
                    >
                      <span className="text-body font-medium text-ink">{bu.businessUnit}</span>
                      <span className="text-small text-ink-muted">
                        มีผลตั้งแต่ {new Date(bu.startDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-small text-ink-faint">seq {bu.seqNumber}</span>
                    </div>
                  ))}
                </div>
              </details>
            </>
          )
        })()}

        {/* ── A8: computed years-in-X chips (BRD #86-92, DOC-55CC266A rows #4,7,9,11) ──
            Auto-collapse: when an employee has never transferred / changed position /
            been promoted, all 4 counters equal hire-date tenure — showing 4 identical
            chips is noise. Collapse to a single "อายุงาน" chip unless the values
            actually diverge (any movement in the timeline resets one counter). */}
        {/* BRD #86: 5-chip Years-in-X row (company/job/position/title/org-unit)
            Source: calcYearsInJob/calcYearsInCorpTitle/calcYearsInPosition/calcYearsInBU from /lib/calculations */}
        {employee.hire_date && yosResult && (() => {
          const counters = [yosResult, yijResult, yictResult, yipResult, yibuResult].filter(
            (c): c is NonNullable<typeof c> => c !== null,
          )
          const uniqueDisplays = new Set(counters.map((c) => c.display))
          const collapsed = uniqueDisplays.size <= 1

          return (
            <>
              <hr className="humi-divider" />
              <div className="humi-row" style={{ gap: 12, flexWrap: 'wrap' }}>
                {collapsed ? (
                  <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 100 }}>
                    <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงาน</div>
                    <div className="text-body font-semibold text-ink">{yosResult.display}</div>
                  </div>
                ) : (
                  <>
                    <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 100 }}>
                      <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงาน (บริษัท)</div>
                      <div className="text-body font-semibold text-ink">{yosResult.display}</div>
                    </div>
                    {yijResult && (
                      <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 120 }}>
                        <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงานในสายงาน</div>
                        <div className="text-body font-semibold text-ink">{yijResult.display}</div>
                      </div>
                    )}
                    {yipResult && (
                      <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 130 }}>
                        <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงานในตำแหน่ง</div>
                        <div className="text-body font-semibold text-ink">{yipResult.display}</div>
                      </div>
                    )}
                    {yictResult && (
                      <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 120 }}>
                        <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงานในระดับ</div>
                        <div className="text-body font-semibold text-ink">{yictResult.display}</div>
                      </div>
                    )}
                    {yibuResult && (
                      <div className="humi-card humi-card--cream" style={{ padding: '8px 14px', minWidth: 130 }}>
                        <div className="humi-eyebrow" style={{ marginBottom: 2 }}>อายุงานใน BU</div>
                        <div className="text-body font-semibold text-ink">{yibuResult.display}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
              {!collapsed && (
                <div
                  className="text-small text-ink-faint"
                  style={{ marginTop: 12, fontSize: 11, lineHeight: 1.5 }}
                >
                  ตัวเลขนับจาก event ล่าสุดของแต่ละประเภท — โอนย้าย/เปลี่ยนตำแหน่ง/เลื่อนระดับ จะ reset counter
                  ที่เกี่ยวข้องโดยอัตโนมัติ ดูประวัติเต็มได้ที่ Timeline ด้านล่าง
                </div>
              )}
            </>
          )
        })()}
      </CollapsibleSectionCard>

      {/* ── Workflow status snapshot (Chains 1 + 4) ─────────── */}
      {(latestTermination ?? latestPromotion) && (
        <div className="humi-card" style={{ padding: 16 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 12 }}>คำขอที่เกี่ยวข้อง</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {latestTermination && (
              <div
                className="humi-row"
                style={{
                  gap: 12, padding: '10px 14px', borderRadius: 8,
                  background: 'var(--color-canvas-soft)', flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>คำขอลาออก (BRD #172)</div>
                  <div className="text-body font-medium text-ink">
                    {TERMINATION_REASON_LABEL[latestTermination.reasonCode]}
                  </div>
                  <div className="text-small text-ink-muted">
                    วันสุดท้าย: {new Date(latestTermination.requestedLastDay).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <span
                  className={`humi-tag ${latestTermination.status === 'approved' ? 'humi-tag--accent' : latestTermination.status === 'rejected' ? 'humi-tag--coral' : 'humi-tag--butter'}`}
                >
                  {TERMINATION_STEP_LABEL[latestTermination.status]}
                </span>
              </div>
            )}
            {latestPromotion && (
              <div
                className="humi-row"
                style={{
                  gap: 12, padding: '10px 14px', borderRadius: 8,
                  background: 'var(--color-canvas-soft)', flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>คำขอเลื่อนตำแหน่ง (BRD #103)</div>
                  <div className="text-body font-medium text-ink">
                    {latestPromotion.fromPosition} → {latestPromotion.toPosition}
                  </div>
                  <div className="text-small text-ink-muted">
                    มีผล: {new Date(latestPromotion.effectiveDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <span
                  className={`humi-tag ${latestPromotion.status === 'approved' ? 'humi-tag--accent' : latestPromotion.status === 'rejected' ? 'humi-tag--coral' : 'humi-tag--butter'}`}
                >
                  {PROMOTION_STEP_LABEL[latestPromotion.status]}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Current Benefits (default-collapsed; illustrative roll-up) ──────── */}
      <CollapsibleSectionCard
        id="emp-current-benefits"
        icon={Gift}
        eyebrow={isTh ? 'สวัสดิการ' : 'Benefits'}
        title={isTh ? 'สวัสดิการปัจจุบัน' : 'Current Benefits'}
        sub=""
        collapsed={benefitsCollapsed}
        onToggle={() => setBenefitsCollapsed((v) => !v)}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        dense
      >
        {CURRENT_BENEFITS.length === 0 ? (
          <EmptyState
            icon={Gift}
            titleTh="ยังไม่มีสวัสดิการ"
            titleEn="No current benefits"
            descTh="ข้อมูลสวัสดิการจะแสดงที่นี่"
            descEn="Enrolled benefits will appear here"
          />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="w-full text-small" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="text-ink-muted" style={{ textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>{isTh ? 'ชื่อสวัสดิการ' : 'Benefit name'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>{isTh ? 'รหัสแผนสวัสดิการ' : 'Benefit plan ID'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{isTh ? 'ยอดที่ใช้ไป' : 'Amount used'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{isTh ? 'สิทธิ์ทั้งหมด' : 'Entitle amount'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}><span className="sr-only">{isTh ? 'การกระทำ' : 'Actions'}</span></th>
                </tr>
              </thead>
              <tbody>
                {CURRENT_BENEFITS.map((b) => (
                  <tr key={b.benefitPlanId} style={{ borderTop: '1px solid var(--color-hairline)' }}>
                    <td className="text-ink font-medium" style={{ padding: '8px 12px' }}>{b.benefitName}</td>
                    <td className="text-ink-muted font-mono" style={{ padding: '8px 12px' }}>{b.benefitPlanId}</td>
                    <td className="text-ink tabular-nums" style={{ padding: '8px 12px', textAlign: 'right' }}>{`${b.amountUsed.toLocaleString('en-US')} ${b.currency}`}</td>
                    <td className="text-ink tabular-nums" style={{ padding: '8px 12px', textAlign: 'right' }}>{`${b.entitleAmount.toLocaleString('en-US')} ${b.currency}`}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setBenefitDetail(b)}>
                          {isTh ? 'ดูรายละเอียด' : 'More detail'}
                        </Button>
                        {(b.benefitPlanId !== 'TH_ORD_001' || GIFT_ORD_CLAIMABLE) && (
                          <Button variant="secondary" size="sm" onClick={() => setClaimTarget(b)}>
                            {isTh ? 'เริ่มเบิก' : 'Start a claim'}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CollapsibleSectionCard>

      {/* ── STA-104: Benefit enrollment (default-collapsed; below Current Benefits) ── */}
      <CollapsibleSectionCard
        id="emp-benefit-enrollment"
        icon={Gift}
        eyebrow={isTh ? 'สวัสดิการ' : 'Benefits'}
        title={isTh ? 'ลงทะเบียนสวัสดิการ' : 'Benefit enrollment'}
        sub=""
        collapsed={enrollmentCollapsed}
        onToggle={() => setEnrollmentCollapsed((v) => !v)}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        dense
      >
        <div style={{ overflowX: 'auto' }}>
          <table className="w-full text-small" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="text-ink-muted" style={{ textAlign: 'left' }}>
                <th style={{ padding: '8px 12px', fontWeight: 600 }}>{isTh ? 'ชื่อสวัสดิการ' : 'Benefit name'}</th>
                <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}><span className="sr-only">{isTh ? 'การกระทำ' : 'Actions'}</span></th>
              </tr>
            </thead>
            <tbody>
              {ENROLLABLE_BENEFITS.map((b) => (
                <tr key={b.benefitPlanId} style={{ borderTop: '1px solid var(--color-hairline)' }}>
                  <td className="text-ink font-medium" style={{ padding: '8px 12px' }}>{b.benefitName}</td>
                  <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                    <Button variant="primary" size="sm" onClick={() => setEnrollTarget(b)}>
                      {isTh ? 'ลงทะเบียน' : 'Enroll now'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CollapsibleSectionCard>

      {/* ── STA-90: Special Privilege list (BE-03) ─────────────── */}
      <CollapsibleSectionCard
        id="emp-special-privilege"
        icon={BadgePlus}
        eyebrow={tSpecial('flag')}
        title={tSpecial('list.heading')}
        sub=""
        collapsed={privilegeCollapsed}
        onToggle={() => setPrivilegeCollapsed((v) => !v)}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        dense
        headerAction={
          <Button
            variant="secondary"
            size="sm"
            disabled={!avail.change_type.ok}
            onClick={() => router.push(`/${locale}/admin/employees/${empId}/special-privilege`)}
          >
            {tSpecial('cardLabel')}
          </Button>
        }
      >
        {specialPrivileges.length === 0 ? (
          <EmptyState
            icon={BadgePlus}
            titleTh={tSpecial('list.empty')}
            titleEn={tSpecial('list.empty')}
            descTh={tSpecial('subtitle')}
            descEn={tSpecial('subtitle')}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {specialPrivileges.map((rec) => {
              const plan = getPlan(rec.planId)
              const planName = plan
                ? (locale === 'th' ? plan.nameTh : plan.nameEn)
                : rec.planId
              // Status from the effective window — drives the badge (NO-RED:
              // expired is a muted neutral, not a danger colour).
              const now = new Date()
              const start = new Date(rec.effectiveStartDate)
              const end = new Date(rec.effectiveEndDate)
              const status = now < start ? 'upcoming' : now > end ? 'expired' : 'active'
              const statusClass =
                status === 'active'
                  ? 'bg-success-soft text-success border-success/30'
                  : status === 'upcoming'
                    ? 'bg-accent-soft text-accent border-accent/30'
                    : 'bg-canvas-soft text-ink-muted border-hairline'
              return (
                <div
                  key={rec.id}
                  className={`rounded-[var(--radius-md)] border border-hairline bg-surface p-4 shadow-[var(--shadow-card)] ${status === 'expired' ? 'opacity-80' : ''}`}
                >
                  {/* Header — plan identity + status + remove */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <BadgePlus size={18} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-body font-semibold text-ink">{planName}</p>
                        <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">{rec.planId}</p>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusClass}`}>
                        {tSpecial(`list.status.${status}` as never)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removePrivilege(rec.id)}
                        aria-label={tSpecial('list.delete')}
                        className="humi-btn humi-btn--ghost"
                        style={{ padding: '4px 8px' }}
                      >
                        <Trash2 size={14} aria-hidden />
                      </button>
                    </div>
                  </div>

                  {/* Entitlement — the benefit the employee receives, made prominent */}
                  <div className="mt-3 flex flex-wrap items-end gap-x-8 gap-y-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-ink-muted">{tSpecial('list.entitlementAmount')}</p>
                      <p className="text-2xl font-bold tabular-nums text-ink">
                        {formatCurrency(rec.benefitEntitlementAmount)}
                        <span className="ml-1.5 text-small font-normal text-ink-muted">
                          {tSpecial(`fields.schedulePeriodOptions.${rec.schedulePeriod}` as never)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-ink-muted">{tSpecial('list.maxPerClaim')}</p>
                      <p className="text-body font-semibold tabular-nums text-ink">{formatCurrency(rec.maxPerClaim)}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-ink-muted">{tSpecial('list.effectivePeriod')}</p>
                      <p className="text-small text-ink">
                        {formatDate(rec.effectiveStartDate, 'medium', locale)} — {formatDate(rec.effectiveEndDate, 'medium', locale)}
                      </p>
                    </div>
                  </div>

                  {/* Reason — secondary context in a subtle box */}
                  <p className="mt-3 rounded-[var(--radius-sm)] bg-canvas-soft px-3 py-2 text-small text-ink-soft">
                    {rec.reason}
                  </p>

                  {/* Audit footer — de-emphasized (this used to dominate the row) */}
                  <p className="mt-2 text-xs text-ink-muted">
                    {tSpecial('list.createdBy')}: {rec.createdBy} · {formatDate(rec.createdAt, 'medium', locale)}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </CollapsibleSectionCard>

      {/* ── STA-95: Reallocate Next Year Budget — change log + medical pools ── */}
      <CollapsibleSectionCard
        id="emp-budget-reallocation"
        icon={ArrowLeftRight}
        eyebrow={tReallocate('flag')}
        title={tReallocate('log.title')}
        sub=""
        collapsed={reallocCollapsed}
        onToggle={() => setReallocCollapsed((v) => !v)}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        dense
        headerAction={
          <Button
            variant="secondary"
            size="sm"
            disabled={!avail.change_type.ok}
            onClick={() => router.push(`/${locale}/admin/employees/${empId}/reallocate-budget`)}
          >
            {tReallocate('cardLabel')}
          </Button>
        }
      >
        {!hasReallocData ? (
          <EmptyState
            icon={ArrowLeftRight}
            titleTh={tReallocate('log.empty')}
            titleEn={tReallocate('log.empty')}
            descTh={tReallocate('subtitle')}
            descEn={tReallocate('subtitle')}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Live medical pool tiles */}
            <div className="humi-row" style={{ gap: 12, flexWrap: 'wrap' }}>
              <div className="humi-card humi-card--cream" style={{ flex: '1 1 200px', minWidth: 180 }}>
                <div className="humi-eyebrow">{tReallocate('totals.currentPool')}</div>
                <div className="font-display text-2xl font-semibold text-ink tabular-nums">{formatCurrency(currentPool)}</div>
              </div>
              <div className="humi-card humi-card--cream" style={{ flex: '1 1 200px', minWidth: 180 }}>
                <div className="humi-eyebrow">{tReallocate('totals.nextPool')}</div>
                <div className={`font-display text-2xl font-semibold tabular-nums ${nextPool < 0 ? 'text-danger' : 'text-ink'}`}>{formatCurrency(nextPool)}</div>
              </div>
            </div>
            {/* Change log — newest first; resulting totals are the running prefix-sum */}
            <DataTable<ReallocRow>
              caption={tReallocate('log.title')}
              captionVisuallyHidden
              columns={reallocColumns}
              rows={[...reallocRows].reverse()}
              rowKey={(r) => r.rec.id}
              dense
            />
          </div>
        )}
      </CollapsibleSectionCard>

      {/* STA-103: per-benefit "more detail" modal — Individual plan + Benefit Plan
          + Benefit Eligibility rule attribute groups. Read-only, no backend. */}
      <Modal
        open={benefitDetail !== null}
        onClose={() => setBenefitDetail(null)}
        title={benefitDetail ? `${benefitDetail.benefitName} · ${benefitDetail.benefitPlanId}` : ''}
        widthClass="max-w-3xl"
      >
        {benefitDetail && (
          <BenefitDetailBody benefit={benefitDetail} isTh={isTh} />
        )}
      </Modal>

      {/* STA-104: per-row "Enroll now" modal — 8-field enrollment form. Mockup only. */}
      <Modal
        open={enrollTarget !== null}
        onClose={() => setEnrollTarget(null)}
        title={isTh ? 'ลงทะเบียนสวัสดิการ' : 'Enroll in benefit'}
        widthClass="max-w-2xl"
      >
        {enrollTarget && (
          <EnrollmentFormBody
            benefit={enrollTarget}
            isTh={isTh}
            onSubmit={() => setEnrollTarget(null)}
            onCancel={() => setEnrollTarget(null)}
          />
        )}
      </Modal>

      {/* STA-106: per-row "Start a claim" modal — reuses the employee SimpleClaimForm
          verbatim so HR files a claim identically. Mockup only (no onSubmitted → no network). */}
      <Modal
        open={claimTarget !== null}
        onClose={() => setClaimTarget(null)}
        title={claimTarget ? `${isTh ? 'เริ่มเบิก' : 'Start a claim'} · ${claimTarget.benefitName}` : ''}
        widthClass="max-w-3xl"
      >
        {claimTarget && (
          <>
            <p className="text-small text-ink-muted" style={{ marginBottom: 12 }}>
              {isTh ? 'ตัวอย่างเดโม่ — ยังไม่บันทึกจริง' : 'Mockup — not persisted'}
            </p>
            <SimpleClaimForm
              plan={resolveClaimPlan(claimTarget)}
              selectedBenefitLabel={claimTarget.benefitName}
              remainingAmount={Math.max(0, claimTarget.entitleAmount - claimTarget.amountUsed)}
            />
          </>
        )}
      </Modal>

      {/* ── BRD #207: HRBP-conditional PerPersonal snapshot ──────────────────
          Visible to: hrbp, spd, hr_admin, hr_manager only.
          SF cite: sf-extract/qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json
          Fields: originalStartDate, seniorityDate, retirementDate, religion,
                  ethnicity, placeOfBirth, countryOfBirth, nativePreferredLang */}
      {isHRBPPlus && (
        <div className="humi-card" style={{ padding: 16 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 12 }}>
            ข้อมูลส่วนตัว HRBP (PerPersonal)
            <span className="humi-tag humi-tag--butter" style={{ marginLeft: 8, fontSize: 11 }}>HRBP+</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" style={{ marginTop: 4 }}>
            {employee?.original_start_date && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่เริ่มงานครั้งแรก</div>
                <div className="text-body font-medium text-ink">
                  {new Date(employee.original_start_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            )}
            {employee?.seniority_date && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันที่อาวุโส</div>
                <div className="text-body font-medium text-ink">
                  {new Date(employee.seniority_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            )}
            {employee?.retirement_date && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>วันเกษียณ</div>
                <div className="text-body font-medium text-ink">
                  {new Date(employee.retirement_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
            )}
            {employee?.religion && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ศาสนา</div>
                <div className="text-body font-medium text-ink">{employee.religion}</div>
              </div>
            )}
            {employee?.ethnicity && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>เชื้อชาติ</div>
                <div className="text-body font-medium text-ink">{employee.ethnicity}</div>
              </div>
            )}
            {employee?.place_of_birth && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>สถานที่เกิด</div>
                <div className="text-body font-medium text-ink">{employee.place_of_birth}</div>
              </div>
            )}
            {employee?.country_of_birth && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ประเทศที่เกิด</div>
                <div className="text-body font-medium text-ink">{employee.country_of_birth}</div>
              </div>
            )}
            {employee?.native_preferred_lang && (
              <div>
                <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ภาษาหลัก</div>
                <div className="text-body font-medium text-ink">{employee.native_preferred_lang}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Section B: Timeline event log ─────────────────── */}
      <div className="humi-card">
        <div className="humi-row" style={{ marginBottom: 16 }}>
          <div>
            <div className="humi-eyebrow">ประวัติการเปลี่ยนแปลง</div>
            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Timeline
            </h2>
          </div>
          <span className="humi-spacer" />
          <span className="humi-tag">{sortedEvents.length} รายการ</span>
        </div>

        {/* Scrollable event list */}
        <div
          style={{
            maxHeight: 320,
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
          role="feed"
          aria-label="ประวัติการเปลี่ยนแปลงพนักงาน"
        >
          {sortedEvents.length === 0 ? (
            <div
              className="text-body text-ink-muted"
              style={{ padding: '24px 0', textAlign: 'center' }}
            >
              ไม่มีประวัติการเปลี่ยนแปลง
            </div>
          ) : (
            sortedEvents.map((evt) => (
              <TimelineRow key={evt.id} event={evt} />
            ))
          )}
        </div>
      </div>

      {/* ── P3 read-only Compensation History (admin/HRBP cross-user view) ── */}
      <CompensationHistory employeeId={employee.employee_id} viewerIsOwner={false} />

      {/* ── Section C: Action menu (see ACTION_CARDS, C8 guardrail) ── */}
      <div className="humi-card">
        <div className="humi-eyebrow" style={{ marginBottom: 14 }}>
          การดำเนินการ
        </div>
        <div className="mb-4 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-3 text-small text-ink-soft">
          Employee Center demo แสดง 9 core lifecycle surfaces พร้อม promotion เป็น candidate/bonus surface.
          Promotion และ pay-rate change ใช้ route เดียวเพื่อเล่า chain HR Admin → Comp/SPD review;
          compensation values remain masked/sensitive and are not payroll-ready.
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACTION_CARDS.map((card) => {
            const Icon = card.icon
            if (card.locked) {
              return (
                <div
                  key={card.label}
                  className="humi-card humi-card--cream"
                  style={{
                    padding: 16,
                    opacity: 0.65,
                    cursor: 'not-allowed',
                    position: 'relative',
                  }}
                  aria-disabled="true"
                  title={card.lockReason ?? 'ยังไม่พร้อมใช้งาน'}
                >
                  <div className="humi-row" style={{ gap: 10, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'var(--color-hairline-soft)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, color: 'var(--color-ink-faint)',
                      }}
                    >
                      <Icon size={18} aria-hidden />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="humi-row" style={{ gap: 6 }}>
                        <span className="text-body font-semibold text-ink-muted">{card.label}</span>
                        <Lock size={12} className="text-ink-faint" aria-hidden />
                      </div>
                      <div className="text-small text-ink-faint mt-0.5">{card.desc}</div>
                      {card.lockReason && (
                        <div className="mt-1.5 text-small text-ink-muted" style={{ fontSize: 11, lineHeight: 1.4 }}>
                          {card.lockReason}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={card.label}
                href={card.href!}
                className="humi-card group transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
                style={{ padding: 16 }}
              >
                <div className="humi-row" style={{ gap: 10, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: 'var(--color-accent-soft)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: 'var(--color-accent)',
                    }}
                  >
                    <Icon size={18} aria-hidden />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="text-body font-semibold text-ink group-hover:text-accent transition-colors">
                      {card.label}
                    </div>
                    <div className="text-small text-ink-soft mt-0.5">{card.desc}</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
