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

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
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
  Undo2,
  TrendingUp,
  MapPin,
  Network,
  Star,
  Layers,
  Download,
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
import { formatDate } from '@/lib/date'
import { getPlan, getPlansByTemplate, isV2Plan, type BenefitPlan } from '@/data/benefits/plan-registry'
import { SimpleClaimForm, type SimpleClaimSubmission } from '@/components/benefits/templates'
import { InsertChangePopup } from '@/components/benefits/InsertChangePopup'
import { ClaimDetailModal } from '@/components/benefits/ClaimDetailModal'
import { BenefitHistorySidebar } from '@/components/benefits/BenefitHistorySidebar'
import { useBenefitHistoryStore } from '@/stores/benefit-history-store'
import { inactiveEndDate } from '@/lib/date'
import {
  CLAIM_TYPE_OPTIONS,
  CLAIM_STATUS_BUCKET_OPTIONS,
  benefitClaimStatusToBucket,
  deriveAdminClaimType,
  claimTypeSearchText,
  formatClaimDate,
} from '@/lib/claim-history-filter'
import {
  useBenefitClaimsStore,
  BENEFIT_STATUS_LABEL,
  BENEFIT_TYPE_LABEL,
  type BenefitClaimType,
  type BenefitClaimRequest,
  type BenefitClaimStatus,
} from '@/stores/benefit-claims'
import { EmptyState, Modal, Button, FormField, FormInput } from '@/components/humi'
import { FileUploadField } from '@/components/humi/molecules/FileUploadField'
import { CollapsibleSectionCard } from '@/components/admin/wizard/CollapsibleSectionCard'
import { SectionJumpNav, type JumpItem } from '@/components/admin/employees/SectionJumpNav'
import { EmployeePersonalSections } from '@/components/admin/EmployeePersonalSections'
import {
  useBudgetReallocationStore,
  selectReallocationsForEmployee,
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
  revert_termination: 'ยกเลิกการสิ้นสุดสภาพ',
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
  revert_termination: 'bg-success',
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

// STA-133 (Part 3) — reallocation-log view row + grouped borrow-between-years pair.
type ReallocRow = {
  id: string
  date: string
  planLabel: string
  /** signed THB entitlement delta (+ borrow into this year, − release from a year) */
  adjusted: number
  year: number
  entitleAmount: number
  reason: string
}
// A bordered group bundles ≥2 related transactions (one reallocation event).
type ReallocGroup = { groupId: string; rows: ReallocRow[] }

// Current-benefit roll-up (illustrative seed — the admin employee store has no
// per-employee enrollment schema; mockup phase shows standard Central Group
// benefits so the section demos with realistic rows). Read-only, no backend.
// STA-103: row = summary columns (name / plan ID / amount used / entitle amount);
// the per-benefit detail attributes (Individual plan + Benefit Plan + Eligibility
// rule) hydrate the "more detail" modal. Values seeded from the BA excel sample.
type CurrentBenefit = {
  benefitName: string
  benefitPlanId: string
  // STA-132 — discrete benefit type column (Standard vs employee-specific Special)
  type: 'Standard' | 'Special'
  // STA-132 — current status; flipping to 'Inactive' (via Insert) sets end date = today − 1
  status: 'Active' | 'Inactive'
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
    type: 'Standard',
    status: 'Active',
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
    type: 'Standard',
    status: 'Active',
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
    type: 'Standard',
    status: 'Active',
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
    // STA-132 — Gasoline carries a +16,000 adjustment (others 0)
    adjustedEntitlementAmount: 16000,
    finalEntitlementAmount: 84000,
    maximumAmountPerClaim: null,
  },
  // STA-106: seed Gift-Ordination row (full STA-103 detail fields so
  // "More detail" renders no undefined).
  {
    benefitName: 'Gift-Ordination',
    benefitPlanId: 'TH_ORD_001',
    type: 'Standard',
    status: 'Active',
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
  // STA-120 — Mobile reimbursement (Remaining derives to 16,000; monthly limit 1,500
  // is popup-local, passed only for this row — no monthlyLimit field on the plan).
  {
    benefitName: 'Mobile reimbursement',
    benefitPlanId: 'TH_MOB_005',
    type: 'Special',
    status: 'Active',
    amountUsed: 2000,
    entitleAmount: 18000,
    currency: 'THB',
    effectiveStartDate: '2026-01-01',
    effectiveEndDate: '2026-12-31',
    reimbursedAmount: 2000,
    country: 'TH',
    benefitCategory: 'Mobile',
    benefitType: 'Reimbursement: Employee, HR',
    benefitSubType: '',
    enrollment: 'AUTO',
    claimPeriod: 'YEAR',
    entitlementCalcMethod: 'FULL',
    eligibleClaimDate: '30',
    specialClaimCondition: '',
    ruleId: '259005',
    ruleName: 'Mobile reimbursement',
    effectiveType: 'HireDate',
    waitingPeriod: '',
    originalEntitlementBeforeProrate: 18000,
    originalEntitlementAfterProrate: 18000,
    adjustedEntitlementAmount: 0,
    finalEntitlementAmount: 18000,
    maximumAmountPerClaim: null,
  },
]

// STA-132 — format the Adjusted-entitle-amount cell with a +/- prefix.
// NO-RED: a positive delta is informational teal (`text-accent`), a negative is
// neutral `text-ink-muted` — NEVER the danger token. Zero renders plain.
export function formatAdjustedAmount(
  value: number | null,
  currency: string,
): { text: string; className: string } {
  if (value === null || value === undefined || value === 0) {
    return { text: `0 ${currency}`, className: 'text-ink' }
  }
  const sign = value > 0 ? '+' : ''
  return {
    text: `${sign}${value.toLocaleString('en-US')} ${currency}`,
    className: value > 0 ? 'text-accent' : 'text-ink-muted',
  }
}

// STA-132 (Part 5) — the claim store keys claims as `EMP002` (no dash) while the
// employee route resolves `EMP-0002` (with dash + zero padding). Normalize the
// route id to the store's shape so the inline claim-history table is not empty.
export function toClaimEmployeeId(routeId: string): string {
  const m = routeId.match(/^EMP-?0*(\d+)$/i)
  if (!m) return routeId
  return `EMP${m[1].padStart(3, '0')}`
}

// STA-133 (Part 2) — claim-history sort: by status group first, then newest→oldest.
// Status group order (top→bottom):
//   1. send_back            → 'ขอข้อมูลเพิ่ม' (need-more-info / sent back for more info)
//   2. pending_*            → 'รออนุมัติ' (pending manager or SPD)
//   3. approved             → 'อนุมัติแล้ว'
//   4. anything else (e.g. rejected) → last, stable.
const CLAIM_STATUS_RANK: Record<BenefitClaimStatus, number> = {
  send_back: 0,
  pending_manager_approval: 1,
  pending_spd: 1,
  approved: 2,
  rejected: 3,
  cancelled: 3,
}

export function claimStatusRank(status: BenefitClaimStatus): number {
  return CLAIM_STATUS_RANK[status] ?? Number.MAX_SAFE_INTEGER
}

/** Pure comparator: status group asc, then submittedAt desc (latest first). */
export function compareClaimHistory(
  a: Pick<BenefitClaimRequest, 'status' | 'submittedAt'>,
  b: Pick<BenefitClaimRequest, 'status' | 'submittedAt'>,
): number {
  const rankDiff = claimStatusRank(a.status) - claimStatusRank(b.status)
  if (rankDiff !== 0) return rankDiff
  // Within a status group: latest submission first.
  return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
}

/** Stable sort of claim rows by {@link compareClaimHistory}. */
export function sortClaimHistory<T extends Pick<BenefitClaimRequest, 'status' | 'submittedAt'>>(
  claims: readonly T[],
): T[] {
  return [...claims].sort(compareClaimHistory)
}

// STA-132 (Part 5) — inline-copied status chip from /benefits-hub/history
// (B2 default: no refactor of the working route). NO-RED tokens only.
const CLAIM_STATUS_CHIP: Record<BenefitClaimStatus, { labelTh: string; className: string }> = {
  pending_manager_approval: { labelTh: 'รออนุมัติจากหัวหน้า', className: 'bg-warning-soft text-warning border border-warning/30' },
  pending_spd: { labelTh: 'รออนุมัติ', className: 'bg-warning-soft text-warning border border-warning/30' },
  send_back: { labelTh: 'ส่งคืน', className: 'bg-accent-soft text-accent border border-accent/30' },
  approved: { labelTh: 'อนุมัติแล้ว', className: 'bg-success-soft text-success border border-success/30' },
  rejected: { labelTh: 'ปฏิเสธ', className: 'bg-danger-soft text-danger border border-danger/30' },
  cancelled: { labelTh: 'ยกเลิกแล้ว', className: 'bg-canvas-soft text-ink-muted border border-hairline' },
}

function ClaimStatusChip({ status, isTh }: { status: BenefitClaimStatus; isTh: boolean }) {
  const chip = CLAIM_STATUS_CHIP[status]
  return (
    <span className={`inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.1em] ${chip.className}`}>
      {isTh ? chip.labelTh : BENEFIT_STATUS_LABEL[status]}
    </span>
  )
}

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
  TH_MOB_005: 'BE-MOB-001', // STA-145
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

// STA-119: derive the store benefitType from the resolved plan category so the
// admin "Start a claim" popup persists with the correct approval/store bucket.
function claimTypeForPlan(plan: BenefitPlan): BenefitClaimType {
  switch (plan.category) {
    case 'gasoline':
    case 'toll':
    case 'parking':
      return 'gasoline'
    case 'physical':
      return 'physical_checkup'
    case 'mobile':
      return 'mobile'
    case 'medical':
    case 'dental':
    default:
      return 'medical'
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
  // STA-143: Enrolment Amount is now editable and must NOT exceed the Benefit
  // Entitlement Amount. Integer-only parse (strip everything but digits) sidesteps
  // the thousands-vs-decimal ambiguity in strings like "1,500 THB/Month" / "18,000".
  const [enrolment, setEnrolment] = useState(benefit.enrolmentAmount)
  const parseAmount = (s: string) => Number(String(s).replace(/[^\d]/g, '')) || 0
  const entitlementNum = parseAmount(benefit.entitlementAmount)
  const enrolmentNum = parseAmount(enrolment)
  const exceedsCap = enrolmentNum > entitlementNum
  const capMsg = isTh
    ? 'จำนวนเงินที่ลงทะเบียนต้องไม่เกินสิทธิ์สวัสดิการ'
    : 'Enrolment amount cannot exceed the benefit entitlement amount'

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

      {/* 3 — Enrolment Amount (editable; capped at entitlement) */}
      <FormField
        label={isTh ? 'จำนวนเงินที่ลงทะเบียน' : 'Enrolment Amount'}
        required
        error={exceedsCap ? capMsg : undefined}
      >
        {(p) => (
          <FormInput
            {...p}
            value={enrolment}
            onChange={(e) => setEnrolment(e.target.value)}
            invalid={exceedsCap}
            inputMode="numeric"
          />
        )}
      </FormField>

      {/* 4 — Benefit Entitlement Amount (read-only) */}
      <FormField label={isTh ? 'สิทธิ์สวัสดิการ (วงเงิน)' : 'Benefit Entitlement Amount'} required>
        {(p) => <FormInput {...p} value={benefit.entitlementAmount} readOnly disabled />}
      </FormField>

      {/* 5 — Currency (read-only, fixed THB) */}
      <FormField label={isTh ? 'สกุลเงิน' : 'Currency'} required>
        {(p) => <FormInput {...p} value={isTh ? benefit.currencyTh : benefit.currency} readOnly disabled />}
      </FormField>

      {/* 6 — Enrolled in Period (read-only) */}
      <FormField label={isTh ? 'รอบที่ลงทะเบียน' : 'Enrolled in Period'} required>
        {(p) => <FormInput {...p} value={benefit.enrolledInPeriod} readOnly disabled />}
      </FormField>

      {/* 7 — Request Date (read-only; defaults today) */}
      <FormField label={isTh ? 'วันที่ยื่นคำขอ' : 'Request Date'} required>
        {(p) => <FormInput {...p} type="date" value={today} readOnly disabled />}
      </FormField>

      {/* 8 — Attachment (optional; filename-only preview, no persistence) */}
      <FileUploadField
        label={isTh ? 'เอกสารแนบ' : 'Attachment'}
        required={false}
        maxSizeMB={10}
        helperText={isTh ? 'สูงสุด 10 MB (ไม่บังคับ)' : 'up to 10 MB (optional)'}
        onUpload={(_, file) => setFileName(file?.filename ?? null)}
        onRemove={() => setFileName(null)}
      />

      {submitted && (
        <div role="status" className="rounded-[var(--radius-md)] bg-success-soft p-3 text-small font-medium text-ink">
          {isTh ? 'ส่งคำขอลงทะเบียนแล้ว' : 'Enrollment submitted'}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2 border-t border-hairline">
        <Button variant="secondary" onClick={onCancel} disabled={submitted}>
          {isTh ? 'ยกเลิก' : 'Cancel'}
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={submitted || exceedsCap}>
          {isTh ? 'ลงทะเบียน' : 'Enroll now'}
        </Button>
      </div>
    </div>
  )
}

// STA-103: detail body for the "more detail" modal. Groups the benefit's
// attributes into the BA-spec sections (Individual plan / Benefit Plan /
// Benefit Eligibility rule). Read-only; blank values render as "-".
function BenefitDetailBody({
  benefit,
  isTh,
  mode = 'view',
  status,
  onStatusChange,
  effectiveEndDateOverride,
  endDateValue,
  onEffectiveEndChange,
  onAttachmentChange,
}: {
  benefit: CurrentBenefit
  isTh: boolean
  // 'edit' renders an editable Status dropdown (Insert flow);
  // 'view' (default) keeps the original display-only behaviour.
  mode?: 'view' | 'edit'
  status?: 'Active' | 'Inactive'
  onStatusChange?: (next: 'Active' | 'Inactive') => void
  // When Inactive, the effective end date is computed (today − 1)
  // and passed in so the body shows it instead of the seeded window.
  effectiveEndDateOverride?: string | null
  // Edit mode — controlled effective-end-date draft lifted to the parent so the
  // value survives status flips (the auto-default re-applies on Active↔Inactive).
  endDateValue?: string
  onEffectiveEndChange?: (value: string) => void
  // STA-141 (Change 2) — fires with the uploaded filename (or null on remove).
  // Mockup: parent tracks filename only, no real upload.
  onAttachmentChange?: (filename: string | null) => void
}) {
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
          {/* STA-132 (1.3c) — editable Status dropdown in edit mode (Insert flow). */}
          {mode === 'edit' && (
            <div className="flex flex-col gap-0.5">
              <span className="text-[length:var(--text-eyebrow)] text-ink-muted">{isTh ? 'สถานะ' : 'Status'}</span>
              <select
                value={status ?? 'Active'}
                onChange={(e) => onStatusChange?.(e.target.value as 'Active' | 'Inactive')}
                className="rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2 text-small text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="Active">{isTh ? 'ใช้งาน' : 'Active'}</option>
                <option value="Inactive">{isTh ? 'ไม่ใช้งาน' : 'Inactive'}</option>
              </select>
            </div>
          )}
          <Field label={isTh ? 'วันเริ่มมีผล' : 'Effective start date'} value={dash(benefit.effectiveStartDate ? formatDate(benefit.effectiveStartDate, 'medium', isTh ? 'th' : 'en') : '')} />
          {mode === 'edit' ? (
            // Editable effective end date — controlled by the parent's endDateDraft
            // (seeded from the auto-default; re-applies on status flips).
            <FormField label={isTh ? 'วันสิ้นสุด' : 'Effective end date'}>
              {(p) => (
                <FormInput
                  {...p}
                  type="date"
                  value={endDateValue ?? effectiveEndDateOverride ?? benefit.effectiveEndDate ?? ''}
                  onChange={(e) => onEffectiveEndChange?.(e.target.value)}
                />
              )}
            </FormField>
          ) : (
            <Field label={isTh ? 'วันสิ้นสุด' : 'Effective end date'} value={dash((effectiveEndDateOverride ?? benefit.effectiveEndDate) ? formatDate(effectiveEndDateOverride ?? benefit.effectiveEndDate, 'medium', isTh ? 'th' : 'en') : '')} />
          )}
          <Field label={isTh ? 'ยอดที่เบิกแล้ว' : 'Reimbursed amount'} value={money(benefit.reimbursedAmount)} />
        </Grid>
        {/* STA-141 (Change 2) — attachment moved here from the Insert date popup.
            Edit/Insert flow only (same gate as the Status dropdown above). */}
        {mode === 'edit' && (
          <FileUploadField
            label={isTh ? 'เอกสารแนบ' : 'Attachment'}
            required={false}
            maxSizeMB={10}
            onUpload={(_id, file) => onAttachmentChange?.(file?.filename ?? null)}
            onRemove={() => onAttachmentChange?.(null)}
          />
        )}
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

  // tSpecial: i18n namespace for the "Create special benefit" action, which now
  // lives in the Current Benefits header (STA-132 part 2). The standalone Special
  // Privileges list was removed per STA-132 part 3.
  const tSpecial = useTranslations('admin.specialPrivilege')

  // STA-95: next-year budget reallocation log + live medical-pool totals.
  // Current base derives from the plan registry (single source of truth); the
  // store owns only the next-year base + the reallocation deltas.
  const tReallocate = useTranslations('admin.reallocateBudget')
  // STA-141 — reuse STA-139's shipped delete-confirm copy (single source of truth).
  const tPlans = useTranslations('admin_benefits_plans')
  // STA-159 — benefits namespace for the claim-detail "more detail" affordance.
  const tBenefits = useTranslations('benefits')
  const reallocations = useBudgetReallocationStore(
    useShallow(selectReallocationsForEmployee(empId)),
  )
  const nextYearBases = useBudgetReallocationStore(useShallow((s) => s.nextYearBases))
  const { reallocRows, hasReallocData } = useMemo(() => {
    const regBase = (pid: string) => {
      const plan = getPlan(pid)
      return plan && isV2Plan(plan) ? plan.coverage.entitlementAmount ?? 0 : 0
    }
    // STA-133 (Part 3.1) — display the plan name WITHOUT the "(OPD)" suffix.
    const planLabel = (pid: string) => {
      const plan = getPlan(pid)
      const raw = plan ? (locale === 'th' ? plan.nameTh : plan.nameEn) : pid
      return raw.replace(/\s*\((?:OPD|ผู้ป่วยนอก)\)\s*$/, '').trim()
    }
    // STA-133 (Part 3.2) — view-model: date · plan · adjusted entitle amount ·
    // year · entitle amount · reason. (the running next-year total column is dropped.)
    const rows: ReallocRow[] = reallocations.map((rec) => ({
      id: rec.id,
      date: rec.createdAt,
      planLabel: planLabel(rec.planId),
      adjusted: rec.amount, // borrow into this year is a positive entitlement bump
      year: new Date(rec.effectiveStartDate).getFullYear(),
      // this-year stays at the annual entitlement; only next year is reduced.
      entitleAmount: regBase(rec.planId),
      reason: rec.reason,
    }))
    // Aggregate "medical budget" pools across every plan with a seeded base/record.
    const plans = new Set<string>(
      nextYearBases.filter((b) => b.employeeId === empId).map((b) => b.planId),
    )
    reallocations.forEach((r) => plans.add(r.planId))
    // STA-142: the This-year / Next-year summary cards were removed, so the
    // current/next medical-pool aggregation is no longer needed — only the
    // history rows + a presence flag remain.
    return { reallocRows: rows, hasReallocData: plans.size > 0 || rows.length > 0 }
  }, [reallocations, nextYearBases, empId, locale])

  // Collapsible section state (BA: page collapsible + Current Benefits default-closed).
  const isTh = locale === 'th'
  const expandLabel = isTh ? 'ขยาย' : 'Expand'
  const collapseLabel = isTh ? 'ย่อ' : 'Collapse'
  // STA-133 (Part 3.3) — seeded borrow-between-years pair: a single reallocation
  // that moves ฿2,000 from Dental into Medical (same year). Rendered as one
  // visually-grouped, bordered unit so the two transactions read as one event.
  const reallocBorrowGroup: ReallocGroup = {
    groupId: 'RB-BORROW-2026',
    rows: [
      {
        id: 'RB-BORROW-2026-1',
        date: '2026-05-20T00:00:00.000Z',
        planLabel: isTh ? 'ค่ารักษาพยาบาล' : 'Medical reimbursement',
        adjusted: 2000,
        year: 2026,
        entitleAmount: 40000,
        reason: isTh ? 'โอนจากทันตกรรม' : 'allocate from dental',
      },
      {
        id: 'RB-BORROW-2026-2',
        date: '2026-05-20T00:00:00.000Z',
        planLabel: isTh ? 'ค่าทันตกรรม' : 'Dental reimbursement',
        adjusted: -2000,
        year: 2026,
        entitleAmount: 0,
        reason: isTh ? 'โอนไปค่ารักษาพยาบาล' : 'allocate to medical',
      },
    ],
  }
  // BA: every collapsible section starts COLLAPSED — the admin opens only what they need.
  const [employmentCollapsed, setEmploymentCollapsed] = useState(true)
  const [personalContactCollapsed, setPersonalContactCollapsed] = useState(false)
  const [reallocCollapsed, setReallocCollapsed] = useState(true)
  const [benefitsCollapsed, setBenefitsCollapsed] = useState(true)
  // STA-103: which Current Benefit row's "more detail" modal is open (null = closed)
  const [benefitDetail, setBenefitDetail] = useState<CurrentBenefit | null>(null)
  // STA-142: read-only "More detail" modal for an Adjust-entitlement-history row.
  const [reallocDetail, setReallocDetail] = useState<ReallocRow | null>(null)
  // STA-132 (1.3) — Insert flow: row → effective-date popup → editable detail.
  const [insertTarget, setInsertTarget] = useState<CurrentBenefit | null>(null)
  const [insertSeedDate, setInsertSeedDate] = useState<string | null>(null)
  // STA-141 (Change 1) — in-session shadow of CURRENT_BENEFITS so deleting a row
  // actually removes it from the rendered list (mockup; no backend).
  const [benefitRows, setBenefitRows] = useState<ReadonlyArray<CurrentBenefit>>(CURRENT_BENEFITS)
  // STA-141 (Change 1) — which row's delete-confirm modal is open (null = closed).
  const [deleteTarget, setDeleteTarget] = useState<CurrentBenefit | null>(null)
  // STA-132 (1.3c/d) — editable Status on the post-Proceed detail modal.
  const [detailMode, setDetailMode] = useState<'view' | 'edit'>('view')
  const [detailStatus, setDetailStatus] = useState<'Active' | 'Inactive'>('Active')
  // Editable effective-end-date draft (in-session). Seeded from the auto-default
  // and re-applied whenever status flips (Inactive → today−1; Active → seed).
  const [endDateDraft, setEndDateDraft] = useState<string>('')
  // STA-141 (Change 2) — in-session attachment filename for the Insert detail.
  const [insertAttachment, setInsertAttachment] = useState<string | null>(null)
  useEffect(() => {
    if (detailMode !== 'edit' || !benefitDetail) return
    setEndDateDraft(
      detailStatus === 'Inactive'
        ? inactiveEndDate(new Date())
        : (benefitDetail.effectiveEndDate ?? ''),
    )
    // Re-seed on status flip (and when the edit modal opens for a benefit).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailStatus, detailMode, benefitDetail])
  const addBenefitHistory = useBenefitHistoryStore((s) => s.addEntry)

  // STA-132 (1.3d / Part 4) — flip the detail Status; setting Inactive computes
  // the effective end date (today − 1) and logs a "change from active to
  // inactive" history entry so it shows in the right-rail change log.
  const handleDetailStatusChange = (
    benefit: CurrentBenefit,
    next: 'Active' | 'Inactive',
  ) => {
    setDetailStatus(next)
    if (next === 'Inactive') {
      addBenefitHistory({
        targetType: 'plan',
        targetId: benefit.benefitPlanId,
        targetName: benefit.benefitName,
        action: 'insert',
        actorName: nameTh,
        effectiveDate: inactiveEndDate(new Date()),
        changes: [
          {
            field: isTh ? 'สถานะ' : 'Status',
            from: isTh ? 'ใช้งาน' : 'active',
            to: isTh ? 'ไม่ใช้งาน' : 'inactive',
          },
        ],
      })
    }
  }
  // STA-141 (Change 1) — remove the row from the in-session shadow + close the
  // confirm modal. Mockup: no backend call; the list re-renders without the row.
  const handleDelete = (b: CurrentBenefit) => {
    setBenefitRows((prev) => prev.filter((r) => r.benefitPlanId !== b.benefitPlanId))
    setDeleteTarget(null)
  }
  // STA-159 (Part A) — which claim's read-only detail modal is open (null = closed).
  const [claimDetail, setClaimDetail] = useState<BenefitClaimRequest | null>(null)
  // STA-159 (Part B) — map an enrollable benefit onto a Current Benefits row.
  // Mockup: fields unknown at enroll-time stay blank ("-"); amounts default to 0.
  const enrollableToCurrentBenefit = (b: EnrollableBenefit): CurrentBenefit => ({
    benefitName: b.benefitName,
    benefitPlanId: b.benefitPlanId,
    type: 'Standard',
    status: 'Active',
    amountUsed: 0,
    entitleAmount: parseInt(b.entitlementAmount.replace(/[^\d]/g, ''), 10) || 0,
    currency: 'THB',
    effectiveStartDate: '2026-06-12',
    effectiveEndDate: '2026-12-31',
    reimbursedAmount: 0,
    country: 'TH',
    benefitCategory: '',
    benefitType: '',
    benefitSubType: '',
    enrollment: '',
    claimPeriod: '',
    entitlementCalcMethod: '',
    eligibleClaimDate: '',
    specialClaimCondition: '',
    ruleId: '',
    ruleName: '',
    effectiveType: '',
    waitingPeriod: '',
    originalEntitlementBeforeProrate: null,
    originalEntitlementAfterProrate: null,
    adjustedEntitlementAmount: null,
    finalEntitlementAmount: null,
    maximumAmountPerClaim: null,
  })
  // STA-159 (Part B) — append the enrolled plan to the in-session Current
  // Benefits shadow so the new row appears immediately with working actions.
  const handleEnrollSubmit = (b: EnrollableBenefit) => {
    setBenefitRows((prev) => [...prev, enrollableToCurrentBenefit(b)])
    setEnrollTarget(null)
  }
  // STA-141 (Change 3) — shared close for the Insert detail modal (X + Cancel).
  const closeDetail = () => {
    setBenefitDetail(null)
    setDetailMode('view')
    setInsertSeedDate(null)
    setInsertAttachment(null)
  }
  // STA-141 (Change 3) — Save the inserted version: append a change-log entry via
  // the same history store the file already uses, then close. Mockup: in-session
  // history only, no backend persistence.
  const handleInsertSave = () => {
    if (benefitDetail) {
      const changes = [
        {
          field: isTh ? 'สวัสดิการ' : 'Benefit',
          from: '-',
          to: `${benefitDetail.benefitName} (${benefitDetail.benefitPlanId})`,
        },
        {
          field: isTh ? 'สถานะ' : 'Status',
          from: '-',
          to: detailStatus === 'Inactive'
            ? (isTh ? 'ไม่ใช้งาน' : 'inactive')
            : (isTh ? 'ใช้งาน' : 'active'),
        },
        {
          field: isTh ? 'วันสิ้นสุด' : 'Effective end date',
          from: '-',
          to: endDateDraft || (benefitDetail.effectiveEndDate ?? '-'),
        },
        ...(insertAttachment
          ? [{ field: isTh ? 'เอกสารแนบ' : 'Attachment', from: '-', to: insertAttachment }]
          : []),
      ]
      addBenefitHistory({
        targetType: 'plan',
        targetId: benefitDetail.benefitPlanId,
        targetName: benefitDetail.benefitName,
        action: 'insert',
        actorName: nameTh,
        effectiveDate: insertSeedDate ?? benefitDetail.effectiveStartDate ?? '',
        changes,
      })
    }
    closeDetail()
  }
  // STA-104: "Benefit enrollment" section + per-row enroll modal (default-collapsed).
  const [enrollTarget, setEnrollTarget] = useState<EnrollableBenefit | null>(null)
  const [enrollmentCollapsed, setEnrollmentCollapsed] = useState(true)
  // STA-132 (Part 5) — claim-history block (default-collapsed) below enrollment.
  const [claimHistoryCollapsed, setClaimHistoryCollapsed] = useState(true)
  const allClaims = useBenefitClaimsStore((s) => s.claims)
  const claimEmployeeId = toClaimEmployeeId(empId)
  const employeeClaims = useMemo(
    // STA-133 (Part 2) — sort by status group then newest→oldest within each group.
    () => sortClaimHistory(allClaims.filter((c) => c.employeeId === claimEmployeeId)),
    [allClaims, claimEmployeeId],
  )
  // STA-194 — claim-history Benefit name / Claim Type / Status filters, mirroring
  // the /benefits-hub "Me" claim history so the admin view matches the reference.
  const [claimBenefitFilter, setClaimBenefitFilter] = useState('')
  const [claimTypeFilter, setClaimTypeFilter] = useState('')
  const [claimStatusFilter, setClaimStatusFilter] = useState('')
  const [claimDateFromFilter, setClaimDateFromFilter] = useState('')
  const [claimDateToFilter, setClaimDateToFilter] = useState('')
  const filteredClaims = useMemo(() => {
    // employeeClaims is already status-sorted (sortClaimHistory); filtering keeps order.
    return employeeClaims.filter((c) => {
      // Search covers the benefit NAME + claim-type label, not only one field.
      const okBenefit = claimBenefitFilter
        ? `${c.benefitName ?? ''} ${claimTypeSearchText(deriveAdminClaimType(c.benefitType))}`
            .toLowerCase()
            .includes(claimBenefitFilter.trim().toLowerCase())
        : true
      const okType = claimTypeFilter ? deriveAdminClaimType(c.benefitType) === claimTypeFilter : true
      const okStatus = claimStatusFilter ? benefitClaimStatusToBucket(c.status) === claimStatusFilter : true
      const iso = c.submittedAt.slice(0, 10)
      const okFrom = claimDateFromFilter ? iso >= claimDateFromFilter : true
      const okTo = claimDateToFilter ? iso <= claimDateToFilter : true
      return okBenefit && okType && okStatus && okFrom && okTo
    })
  }, [employeeClaims, claimBenefitFilter, claimTypeFilter, claimStatusFilter, claimDateFromFilter, claimDateToFilter])
  const resetClaimFilters = () => {
    setClaimBenefitFilter('')
    setClaimTypeFilter('')
    setClaimStatusFilter('')
    setClaimDateFromFilter('')
    setClaimDateToFilter('')
  }
  // STA-106: per-row "Start a claim" modal (HR files a claim on behalf of employee).
  const [claimTarget, setClaimTarget] = useState<CurrentBenefit | null>(null)
  // STA-119: persist the admin-filed claim into the store so it surfaces in
  // /quick-approve + /workflows/benefit-claim identically to the employee flow.
  const submitBenefitClaim = useBenefitClaimsStore((s) => s.submitClaim)
  const [claimSubmitted, setClaimSubmitted] = useState<string | null>(null)

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
      icon: Undo2,
      label: 'ยกเลิกการสิ้นสุดสภาพ',
      desc: 'คืนสถานะพนักงานที่สิ้นสุดสภาพโดยไม่ถูกต้อง',
      href: `/${locale}/admin/employees/${empId}/revert-termination`,
      locked: !avail.revert.ok,
      lockReason: avail.revert.reason,
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
    <div
      className="pb-8"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        // --jumpnav-anchor ≈ --jumpnav-top + strip height + gap — tune together.
        // Seed guesses; measure the (untokenized) topbar height live when verifying.
        '--jumpnav-top': '64px',
        '--jumpnav-anchor': '132px',
      } as React.CSSProperties}
    >
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

      {/* ── STA-229: sticky "jump to section" nav (Option A) ──────────────── */}
      <div className="sticky top-[var(--jumpnav-top)] z-[9] -mx-1 border-b border-hairline bg-canvas/85 px-1 py-2 backdrop-blur">
        <SectionJumpNav
          ariaLabel={isTh ? 'ไปยังส่วน' : 'Jump to section'}
          items={[
            { id: 'emp-personal-contact', label: isTh ? 'ข้อมูลติดต่อ' : 'Personal', onActivate: () => setPersonalContactCollapsed(false) },
            { id: 'emp-employment', label: isTh ? 'การจ้างงาน' : 'Employment', onActivate: () => setEmploymentCollapsed(false) },
            { id: 'emp-current-benefits', label: isTh ? 'สวัสดิการ' : 'Benefits', onActivate: () => setBenefitsCollapsed(false) },
            { id: 'emp-benefit-enrollment', label: isTh ? 'การลงทะเบียน' : 'Enrollment', onActivate: () => setEnrollmentCollapsed(false) },
            { id: 'emp-claim-history', label: isTh ? 'ประวัติการเบิก' : 'Claims', onActivate: () => setClaimHistoryCollapsed(false) },
            { id: 'emp-budget-reallocation', label: isTh ? 'จัดสรรงบประมาณ' : 'Budget', onActivate: () => setReallocCollapsed(false) },
            { id: 'emp-timeline', label: isTh ? 'ประวัติการเปลี่ยนแปลง' : 'Timeline' },
            { id: 'emp-compensation-history', label: isTh ? 'ประวัติค่าตอบแทน' : 'Compensation' },
            { id: 'emp-actions', label: isTh ? 'การดำเนินการ' : 'Actions', emphasis: true },
          ] satisfies JumpItem[]}
        />
      </div>

      <CollapsibleSectionCard
        id="emp-personal-contact"
        className="scroll-mt-[var(--jumpnav-anchor)]"
        icon={MapPin}
        eyebrow={isTh ? 'ข้อมูลส่วนบุคคล' : 'Personal'}
        title={isTh ? 'ข้อมูลการติดต่อส่วนบุคคล' : 'Personal Contact'}
        sub=""
        collapsed={personalContactCollapsed}
        onToggle={() => setPersonalContactCollapsed((v) => !v)}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        dense
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>{isTh ? 'อีเมลส่วนตัว' : 'Personal Email'}</div>
            <div className="text-body text-ink">{employee.personal_email ?? '—'}</div>
          </div>
          <div>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>{isTh ? 'โทรศัพท์มือถือ' : 'Mobile Phone'}</div>
            <div className="text-body text-ink">{employee.personal_phone ?? '—'}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>{isTh ? 'ที่อยู่' : 'Address'}</div>
            <div className="text-body text-ink">
              {employee.address_line1 ? (
                <>
                  <div>{employee.address_line1}</div>
                  <div className="text-small text-ink-muted">
                    {[
                      employee.address_district,
                      employee.address_province,
                      employee.address_postal_code,
                    ].filter(Boolean).join(' ')}
                  </div>
                </>
              ) : '—'}
            </div>
          </div>
        </div>
      </CollapsibleSectionCard>

      {/* ── STA-181: read-only PERSONAL parity sections (mirror /profile/me) ──
          Marital · Bank · Emergency · Dependents · Contact/Address · Advanced
          (P1) then Work history · Certs · Assessments · Memberships · Projects ·
          Documents (P2). Fed by the seeded by-id resolver; RBAC-gated inside. */}
      <EmployeePersonalSections employeeId={empId} isTh={isTh} roles={authRoles} />

      {/* ── Section A2: ข้อมูลการจ้างงาน (Employment-level — A3 split) ──── */}
      <CollapsibleSectionCard
        id="emp-employment"
        className="scroll-mt-[var(--jumpnav-anchor)]"
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
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>คำขอลาออก</div>
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
                  <div className="humi-eyebrow" style={{ marginBottom: 2 }}>คำขอเลื่อนตำแหน่ง</div>
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
        className="scroll-mt-[var(--jumpnav-anchor)]"
        icon={Gift}
        eyebrow={isTh ? 'สวัสดิการ' : 'Benefits'}
        title={isTh ? 'สวัสดิการปัจจุบัน' : 'Current Benefits'}
        sub=""
        collapsed={benefitsCollapsed}
        onToggle={() => setBenefitsCollapsed((v) => !v)}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        dense
        headerAction={
          // "Adjust entitle amount" + "Create special benefit" triggers live here.
          // Adjust sits to the left of Create-special. Same routes + forms.
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={!avail.change_type.ok}
              onClick={() => router.push(`/${locale}/admin/employees/${empId}/reallocate-budget`)}
            >
              {tReallocate('cardLabel')}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={!avail.change_type.ok}
              onClick={() => router.push(`/${locale}/admin/employees/${empId}/special-privilege`)}
            >
              {tSpecial('cardLabel')}
            </Button>
          </div>
        }
      >
        {benefitRows.length === 0 ? (
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
                  {/* STA-132 — Type (after Plan ID) */}
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>{isTh ? 'ประเภท' : 'Type'}</th>
                  {/* STA-132 — Adjusted entitle amount (before Entitle amount) */}
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{isTh ? 'สิทธิ์ที่ปรับแล้ว' : 'Adjusted entitle amount'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{isTh ? 'สิทธิ์ทั้งหมด' : 'Entitle amount'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{isTh ? 'ยอดที่ใช้ไป' : 'Amount used'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{isTh ? 'วงเงินคงเหลือ' : 'Remaining amount'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{isTh ? 'ดูรายละเอียด' : 'More detail'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{isTh ? 'เริ่มเบิก' : 'Start a claim'}</th>
                  {/* STA-132 — Insert row-action */}
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}><span className="sr-only">{isTh ? 'แทรกการเปลี่ยนแปลง' : 'Insert'}</span></th>
                  {/* STA-141 — Delete row-action */}
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}><span className="sr-only">{isTh ? 'ลบ' : 'Delete'}</span></th>
                </tr>
              </thead>
              <tbody>
                {benefitRows.map((b) => (
                  <tr key={b.benefitPlanId} style={{ borderTop: '1px solid var(--color-hairline)' }}>
                    <td className="text-ink font-medium" style={{ padding: '8px 12px' }}>{b.benefitName}</td>
                    <td className="text-ink-muted font-mono" style={{ padding: '8px 12px' }}>{b.benefitPlanId}</td>
                    {/* STA-132 — Type */}
                    <td className="text-ink" style={{ padding: '8px 12px' }}>
                      {b.type === 'Special' ? (isTh ? 'พิเศษ' : 'Special') : (isTh ? 'มาตรฐาน' : 'Standard')}
                    </td>
                    {/* STA-132 — Adjusted entitle amount (+/- teal/ink, NO-RED) */}
                    {(() => {
                      const adj = formatAdjustedAmount(b.adjustedEntitlementAmount, b.currency)
                      return (
                        <td className={`tabular-nums ${adj.className}`} style={{ padding: '8px 12px', textAlign: 'right' }}>{adj.text}</td>
                      )
                    })()}
                    <td className="text-ink tabular-nums" style={{ padding: '8px 12px', textAlign: 'right' }}>{`${b.entitleAmount.toLocaleString('en-US')} ${b.currency}`}</td>
                    <td className="text-ink tabular-nums" style={{ padding: '8px 12px', textAlign: 'right' }}>{`${b.amountUsed.toLocaleString('en-US')} ${b.currency}`}</td>
                    {/* STA-120 — Remaining = Entitle − Used, derived (never seeded), never negative */}
                    <td className="text-ink tabular-nums" style={{ padding: '8px 12px', textAlign: 'right' }}>{`${Math.max(0, b.entitleAmount - b.amountUsed).toLocaleString('en-US')} ${b.currency}`}</td>
                    {/* STA-132 (1.2) — More detail as a document icon button */}
                    <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={isTh ? 'ดูรายละเอียด' : 'More detail'}
                        title={isTh ? 'ดูรายละเอียด' : 'More detail'}
                        onClick={() => setBenefitDetail(b)}
                      >
                        <FileText size={16} aria-hidden />
                      </Button>
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                      {(b.benefitPlanId !== 'TH_ORD_001' || GIFT_ORD_CLAIMABLE) && (() => {
                        // STA-133 (Part 1) — can't claim when remaining = 0: greyed-out + non-clickable.
                        const remaining = Math.max(0, b.entitleAmount - b.amountUsed)
                        const noRemaining = remaining === 0
                        return (
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled={noRemaining}
                            onClick={() => setClaimTarget(b)}
                            title={noRemaining ? (isTh ? 'วงเงินคงเหลือ 0 — เบิกไม่ได้' : 'No remaining entitlement — cannot claim') : undefined}
                          >
                            {isTh ? 'เริ่มเบิก' : 'Start a claim'}
                          </Button>
                        )
                      })()}
                    </td>
                    {/* STA-132 (1.3a) — Insert row-action → effective-date popup */}
                    <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={!avail.change_type.ok}
                        onClick={() => setInsertTarget(b)}
                      >
                        <Layers size={16} aria-hidden />
                        <span style={{ marginLeft: 4 }}>{isTh ? 'แทรก' : 'Insert'}</span>
                      </Button>
                    </td>
                    {/* STA-141 (Change 1) — Delete row-action → confirm modal */}
                    <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={isTh ? 'ลบ' : 'Delete'}
                        title={isTh ? 'ลบ' : 'Delete'}
                        onClick={() => setDeleteTarget(b)}
                      >
                        <Trash2 size={16} aria-hidden />
                        <span className="sr-only">{isTh ? 'ลบ' : 'Delete'}</span>
                      </Button>
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
        className="scroll-mt-[var(--jumpnav-anchor)]"
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

      {/* ── STA-132 (Part 5): Claim history (inline-copied from /benefits-hub/history;
            default-collapsed; id normalized EMP-0002 → EMP002 so rows render) ── */}
      <CollapsibleSectionCard
        id="emp-claim-history"
        className="scroll-mt-[var(--jumpnav-anchor)]"
        icon={FileText}
        eyebrow={isTh ? 'สวัสดิการ' : 'Benefits'}
        title={isTh ? 'ประวัติการเบิกสวัสดิการ' : 'Claim history'}
        sub=""
        collapsed={claimHistoryCollapsed}
        onToggle={() => setClaimHistoryCollapsed((v) => !v)}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        dense
      >
        {/* Export action (top-right) — mirrors /benefits-hub claim history */}
        <div className="humi-row" style={{ justifyContent: 'flex-end', marginBottom: 12 }}>
          <Button variant="ghost" size="sm" type="button">
            <Download size={14} aria-hidden />
            <span style={{ marginLeft: 4 }}>{isTh ? 'ส่งออกรายการ' : 'Export'}</span>
          </Button>
        </div>

        {/* Benefit name / Claim Type / Status filter row */}
        <div
          className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft"
          style={{
            display: 'grid', gap: 12, padding: 16, marginBottom: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', alignItems: 'end',
          }}
        >
          <FormField id="emp-claim-benefit" label={isTh ? 'ชื่อสวัสดิการ' : 'Benefit Name'}>
            {(cp) => (
              <input
                {...cp}
                type="text"
                value={claimBenefitFilter}
                onChange={(e) => setClaimBenefitFilter(e.target.value)}
                placeholder={isTh ? 'ค้นหาชื่อสวัสดิการ' : 'Search benefit name'}
                className="h-10 w-full rounded-md border border-hairline bg-surface px-3 text-body text-ink transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas focus:border-accent"
              />
            )}
          </FormField>
          <FormField id="emp-claim-type" label={isTh ? 'ประเภทการเบิก' : 'Claim Type'}>
            {(cp) => (
              <select
                {...cp}
                value={claimTypeFilter}
                onChange={(e) => setClaimTypeFilter(e.target.value)}
                className="h-10 w-full rounded-md border border-hairline bg-surface px-3 text-body text-ink transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas focus:border-accent"
              >
                <option value="">{isTh ? 'ทั้งหมด' : 'All'}</option>
                {CLAIM_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{isTh ? opt.labelTh : opt.labelEn}</option>
                ))}
              </select>
            )}
          </FormField>
          <FormField id="emp-claim-status" label={isTh ? 'สถานะ' : 'Status'}>
            {(cp) => (
              <select
                {...cp}
                value={claimStatusFilter}
                onChange={(e) => setClaimStatusFilter(e.target.value)}
                className="h-10 w-full rounded-md border border-hairline bg-surface px-3 text-body text-ink transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas focus:border-accent"
              >
                <option value="">{isTh ? 'ทั้งหมด' : 'All'}</option>
                {CLAIM_STATUS_BUCKET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{isTh ? opt.labelTh : opt.labelEn}</option>
                ))}
              </select>
            )}
          </FormField>
          <FormField id="emp-claim-date-from" label={isTh ? 'วันที่เริ่ม' : 'Start date'}>
            {(cp) => (
              <>
                <input
                  {...cp}
                  type="date"
                  value={claimDateFromFilter}
                  onChange={(e) => setClaimDateFromFilter(e.target.value)}
                  className="h-10 w-full rounded-md border border-hairline bg-surface px-3 text-body text-ink transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas focus:border-accent"
                />
                {claimDateFromFilter ? (
                  <p className="text-small tabular-nums text-ink-muted" style={{ marginTop: 4 }}>
                    {formatClaimDate(claimDateFromFilter)}
                  </p>
                ) : null}
              </>
            )}
          </FormField>
          <FormField id="emp-claim-date-to" label={isTh ? 'วันที่สิ้นสุด' : 'End date'}>
            {(cp) => (
              <>
                <input
                  {...cp}
                  type="date"
                  value={claimDateToFilter}
                  onChange={(e) => setClaimDateToFilter(e.target.value)}
                  className="h-10 w-full rounded-md border border-hairline bg-surface px-3 text-body text-ink transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas focus:border-accent"
                />
                {claimDateToFilter ? (
                  <p className="text-small tabular-nums text-ink-muted" style={{ marginTop: 4 }}>
                    {formatClaimDate(claimDateToFilter)}
                  </p>
                ) : null}
              </>
            )}
          </FormField>
          <Button type="button" variant="ghost" size="sm" className="min-h-[44px] justify-center" onClick={resetClaimFilters}>
            {isTh ? 'ล้างตัวกรอง' : 'Clear'}
          </Button>
        </div>

        {filteredClaims.length === 0 ? (
          <EmptyState
            icon={FileText}
            titleTh="ไม่พบประวัติการเบิก"
            titleEn="No claims found"
            descTh="ลองปรับตัวกรองชื่อสวัสดิการ ประเภทการเบิก หรือสถานะ"
            descEn="Try adjusting the benefit, claim type, or status filter"
          />
        ) : (
          <div style={{ overflowX: 'auto', maxHeight: '28rem', overflowY: 'scroll' }}>
            <table className="w-full text-small" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="text-ink-muted" style={{ textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>{isTh ? 'ชื่อสวัสดิการ' : 'Benefit Name'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{isTh ? 'จำนวนเงินเบิก' : 'Claim Amount'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>{isTh ? 'วันที่ส่ง' : 'Submission Date'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600 }}>{isTh ? 'สถานะ' : 'Status'}</th>
                  <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>
                    <span className="sr-only">{tBenefits('moreDetail')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((c: BenefitClaimRequest) => (
                  <tr key={c.id} style={{ borderTop: '1px solid var(--color-hairline)' }}>
                    <td style={{ padding: '8px 12px' }}>
                      <p className="font-semibold text-ink">{c.benefitName}</p>
                      <p className="text-ink-muted">{BENEFIT_TYPE_LABEL[c.benefitType] ?? ''}</p>
                    </td>
                    <td className="text-ink tabular-nums" style={{ padding: '8px 12px', textAlign: 'right' }}>{`฿${c.totalClaimAmount.toLocaleString('th-TH')}`}</td>
                    <td className="text-ink-muted tabular-nums" style={{ padding: '8px 12px' }}>{formatClaimDate(c.submittedAt)}</td>
                    <td style={{ padding: '8px 12px' }}><ClaimStatusChip status={c.status} isTh={isTh} /></td>
                    <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={tBenefits('moreDetail')}
                        onClick={() => setClaimDetail(c)}
                      >
                        <FileText size={16} aria-hidden />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CollapsibleSectionCard>

      {/* STA-132 (Part 3) — the standalone "Special privileges" list was removed;
          "Create special benefit" now lives in the Current Benefits header. */}

      {/* ── STA-95: Reallocate Next Year Budget — change log + medical pools ── */}
      <CollapsibleSectionCard
        id="emp-budget-reallocation"
        className="scroll-mt-[var(--jumpnav-anchor)]"
        icon={ArrowLeftRight}
        eyebrow={tReallocate('flag')}
        title={tReallocate('log.title')}
        sub=""
        collapsed={reallocCollapsed}
        onToggle={() => setReallocCollapsed((v) => !v)}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
        dense
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
            {/* STA-142: the This-year / Next-year medical-budget summary cards were
                removed per BA — the section now shows only the history table. */}
            {/* STA-133 (Part 3.2) — change log: date · plan · adjusted entitle
                amount · year · entitle amount · reason (newest first). */}
            <div style={{ overflowX: 'auto' }}>
              <table className="w-full text-small" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="text-ink-muted" style={{ textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px', fontWeight: 600 }}>{tReallocate('log.colDate')}</th>
                    <th style={{ padding: '8px 12px', fontWeight: 600 }}>{tReallocate('log.colPlan')}</th>
                    <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{tReallocate('log.colAdjusted')}</th>
                    <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{tReallocate('log.colYear')}</th>
                    <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{tReallocate('log.colEntitle')}</th>
                    <th style={{ padding: '8px 12px', fontWeight: 600 }}>{tReallocate('log.colReason')}</th>
                    <th style={{ padding: '8px 12px', fontWeight: 600, textAlign: 'right' }}>{tReallocate('log.colMoreDetail')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[...reallocRows].reverse().map((r) => {
                    const adj = formatAdjustedAmount(r.adjusted, 'THB')
                    return (
                      <tr key={r.id} style={{ borderTop: '1px solid var(--color-hairline)' }}>
                        <td className="text-ink-muted" style={{ padding: '8px 12px' }}>{formatDate(r.date, 'medium', locale)}</td>
                        <td className="text-ink" style={{ padding: '8px 12px' }}>{r.planLabel}</td>
                        <td className={`tabular-nums ${adj.className}`} style={{ padding: '8px 12px', textAlign: 'right' }}>{adj.text}</td>
                        <td className="text-ink tabular-nums" style={{ padding: '8px 12px', textAlign: 'right' }}>{r.year}</td>
                        <td className="text-ink tabular-nums" style={{ padding: '8px 12px', textAlign: 'right' }}>{`${r.entitleAmount.toLocaleString('en-US')} THB`}</td>
                        <td className="text-ink-muted" style={{ padding: '8px 12px' }}>{r.reason}</td>
                        {/* STA-142 — More detail (document icon), mirrors Current Benefits */}
                        <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            aria-label={isTh ? 'ดูรายละเอียด' : 'More detail'}
                            title={isTh ? 'ดูรายละเอียด' : 'More detail'}
                            onClick={() => setReallocDetail(r)}
                          >
                            <FileText size={16} aria-hidden />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                {/* STA-133 (Part 3.3) — grouped borrow-between-years pair: the two
                    related transactions share one bordered box so they read as one
                    reallocation event. */}
                <tbody style={{ borderTop: '1px solid var(--color-hairline)' }}>
                  <tr>
                    <td colSpan={7} style={{ padding: '8px 12px 0' }}>
                      <span className="text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                        {isTh ? 'การโอนระหว่างปี' : 'Borrow between years'}
                      </span>
                    </td>
                  </tr>
                  {reallocBorrowGroup.rows.map((r, i) => {
                    const adj = formatAdjustedAmount(r.adjusted, 'THB')
                    const isFirst = i === 0
                    const isLast = i === reallocBorrowGroup.rows.length - 1
                    const cellStyle: CSSProperties = {
                      padding: '8px 12px',
                      borderTop: isFirst ? '2px solid var(--color-accent)' : '1px solid var(--color-hairline)',
                      borderBottom: isLast ? '2px solid var(--color-accent)' : undefined,
                      background: 'var(--color-accent-soft)',
                    }
                    const firstCellStyle: CSSProperties = { ...cellStyle, borderLeft: '2px solid var(--color-accent)' }
                    const lastCellStyle: CSSProperties = { ...cellStyle, borderRight: '2px solid var(--color-accent)' }
                    return (
                      <tr key={r.id}>
                        <td className="text-ink-muted" style={firstCellStyle}>{formatDate(r.date, 'medium', locale)}</td>
                        <td className="text-ink" style={cellStyle}>{r.planLabel}</td>
                        <td className={`tabular-nums ${adj.className}`} style={{ ...cellStyle, textAlign: 'right' }}>{adj.text}</td>
                        <td className="text-ink tabular-nums" style={{ ...cellStyle, textAlign: 'right' }}>{r.year}</td>
                        <td className="text-ink tabular-nums" style={{ ...cellStyle, textAlign: 'right' }}>{`${r.entitleAmount.toLocaleString('en-US')} THB`}</td>
                        <td className="text-ink-muted" style={cellStyle}>{r.reason}</td>
                        {/* STA-142 — More detail; accent border moves to this last cell */}
                        <td style={{ ...lastCellStyle, textAlign: 'right' }}>
                          <Button
                            variant="ghost"
                            size="sm"
                            aria-label={isTh ? 'ดูรายละเอียด' : 'More detail'}
                            title={isTh ? 'ดูรายละเอียด' : 'More detail'}
                            onClick={() => setReallocDetail(r)}
                          >
                            <FileText size={16} aria-hidden />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CollapsibleSectionCard>

      {/* STA-103 / STA-132: per-benefit "more detail" modal. Read-only in view
          mode (More-detail); the Insert flow opens it in edit mode with a Status
          dropdown (1.3c) + a right-rail change log (Part 4). No backend. */}
      <Modal
        open={benefitDetail !== null}
        onClose={closeDetail}
        title={benefitDetail ? `${benefitDetail.benefitName} · ${benefitDetail.benefitPlanId}` : ''}
        widthClass="max-w-5xl"
      >
        {benefitDetail && (
          <>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <BenefitDetailBody
                benefit={detailMode === 'edit' && insertSeedDate
                  ? { ...benefitDetail, effectiveStartDate: insertSeedDate }
                  : benefitDetail}
                isTh={isTh}
                mode={detailMode}
                status={detailStatus}
                onStatusChange={(next) => handleDetailStatusChange(benefitDetail, next)}
                effectiveEndDateOverride={detailMode === 'edit' && detailStatus === 'Inactive'
                  ? inactiveEndDate(new Date())
                  : null}
                endDateValue={endDateDraft}
                onEffectiveEndChange={setEndDateDraft}
                onAttachmentChange={setInsertAttachment}
              />
              {/* Part 4 — right-rail change log (reuses STA-102/107 history panel) */}
              <BenefitHistorySidebar
                targetType="plan"
                targetId={benefitDetail.benefitPlanId}
                isTh={isTh}
              />
            </div>
            {/* STA-141 (Change 3) — Cancel/Save footer for the Insert (edit) flow only. */}
            {detailMode === 'edit' && (
              <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-hairline">
                <Button variant="secondary" onClick={closeDetail}>{isTh ? 'ยกเลิก' : 'Cancel'}</Button>
                <Button variant="primary" onClick={handleInsertSave}>{isTh ? 'บันทึก' : 'Save'}</Button>
              </div>
            )}
          </>
        )}
      </Modal>

      {/* STA-132 (1.3b) — Insert effective-date popup (shipped STA-123 component).
          Proceed opens the detail modal in edit mode, seeded with the chosen date. */}
      <InsertChangePopup
        open={insertTarget !== null}
        benefitName={insertTarget?.benefitName ?? ''}
        onCancel={() => setInsertTarget(null)}
        onProceed={(d) => {
          if (insertTarget) {
            setInsertSeedDate(d)
            setDetailStatus(insertTarget.status)
            setDetailMode('edit')
            setBenefitDetail(insertTarget)
          }
          setInsertTarget(null)
        }}
      />

      {/* STA-141 (Change 1) — Delete-confirm modal (reuses STA-139 copy). */}
      <Modal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title={tPlans('deleteConfirmTitle')}
      >
        {deleteTarget && (
          <div className="space-y-4">
            <p className="text-body text-ink">
              {isTh ? 'ต้องการลบแผน ' : 'Delete plan '}
              <span className="font-semibold">{deleteTarget.benefitName} ({deleteTarget.benefitPlanId})</span>
              {isTh ? ' ใช่หรือไม่?' : '?'}
            </p>
            <p className="text-small text-ink-muted">{tPlans('deleteConfirmBody')}</p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setDeleteTarget(null)}>{tPlans('cancel')}</Button>
              <Button variant="danger" onClick={() => handleDelete(deleteTarget)}>{tPlans('delete')}</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* STA-142: read-only "More detail" modal for an adjust-entitlement-history
          row. Formatters mirror the table cells (Adjusted via formatAdjustedAmount —
          a SIGNED value; never plain-rendered) so nothing shows a stray "-". */}
      <Modal
        open={reallocDetail !== null}
        onClose={() => setReallocDetail(null)}
        title={reallocDetail ? `${reallocDetail.planLabel} · ${tReallocate('log.colMoreDetail')}` : ''}
        widthClass="max-w-lg"
      >
        {reallocDetail && (() => {
          const adj = formatAdjustedAmount(reallocDetail.adjusted, 'THB')
          const rows: Array<{ label: string; value: string | number; className?: string }> = [
            { label: tReallocate('log.colDate'), value: formatDate(reallocDetail.date, 'medium', locale) },
            { label: tReallocate('log.colPlan'), value: reallocDetail.planLabel },
            { label: tReallocate('log.colAdjusted'), value: adj.text, className: adj.className },
            { label: tReallocate('log.colYear'), value: reallocDetail.year },
            { label: tReallocate('log.colEntitle'), value: `${reallocDetail.entitleAmount.toLocaleString('en-US')} THB` },
            { label: tReallocate('log.colReason'), value: reallocDetail.reason },
          ]
          return (
            <div className="flex flex-col gap-3">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-6 border-b border-hairline pb-2 last:border-b-0">
                  <span className="text-small text-ink-muted">{row.label}</span>
                  <span className={`text-small text-ink text-right tabular-nums ${row.className ?? ''}`}>{row.value}</span>
                </div>
              ))}
            </div>
          )
        })()}
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
            onSubmit={() => handleEnrollSubmit(enrollTarget)}
            onCancel={() => setEnrollTarget(null)}
          />
        )}
      </Modal>

      {/* STA-159 — read-only claim-detail modal (Option C: unwrapped ClaimPayload). */}
      <ClaimDetailModal
        claim={claimDetail}
        open={claimDetail !== null}
        onClose={() => setClaimDetail(null)}
      />

      {/* STA-106 / STA-119: per-row "Start a claim" modal — reuses the employee
          SimpleClaimForm verbatim so HR files a claim identically, and persists it
          into the claims store so it surfaces in /quick-approve + /workflows. */}
      <Modal
        open={claimTarget !== null}
        onClose={() => { setClaimTarget(null); setClaimSubmitted(null) }}
        title={claimTarget ? `${isTh ? 'เริ่มเบิก' : 'Start a claim'} · ${claimTarget.benefitName}` : ''}
        widthClass="max-w-3xl"
      >
        {claimTarget && (
          <>
            {claimSubmitted && (
              <div role="status" className="mb-3 rounded-[var(--radius-md)] bg-success-soft p-3 text-small font-medium text-ink">
                {isTh
                  ? `บันทึกคำขอ ${claimSubmitted} แล้ว — ติดตามได้ที่คิวอนุมัติ`
                  : `Saved request ${claimSubmitted} — visible in the approval queue.`}
              </div>
            )}
            <SimpleClaimForm
              plan={resolveClaimPlan(claimTarget)}
              selectedBenefitLabel={claimTarget.benefitName}
              remainingAmount={Math.max(0, claimTarget.entitleAmount - claimTarget.amountUsed)}
              monthlyLimitThb={claimTarget.benefitPlanId === 'TH_MOB_005' ? 1500 : undefined}
              onSubmitted={(wfId, submission?: SimpleClaimSubmission) => {
                const plan = resolveClaimPlan(claimTarget)
                const claim = submitBenefitClaim({
                  employeeId: employee.employee_id,
                  employeeName: nameTh,
                  benefitCode: plan.id,
                  benefitName: claimTarget.benefitName,
                  benefitType: claimTypeForPlan(plan),
                  remainingAmount: submission?.remainingAmount,
                  receiptNo: submission?.receiptNo || wfId,
                  receiptDate: submission?.receiptDate ?? new Date().toISOString().slice(0, 10),
                  receiptAmount: submission?.receiptAmount ?? 0,
                  totalClaimAmount: submission?.totalClaimAmount ?? submission?.receiptAmount ?? 0,
                  claimDate: submission?.claimDate,
                  remark: submission?.remark,
                  dynamicFields: submission?.dynamicFields,
                })
                setClaimSubmitted(claim.workflowRequestId)
              }}
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
      <div id="emp-timeline" className="humi-card scroll-mt-[var(--jumpnav-anchor)]">
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
      <div id="emp-compensation-history" className="scroll-mt-[var(--jumpnav-anchor)]">
        <CompensationHistory employeeId={employee.employee_id} viewerIsOwner={false} />
      </div>

      {/* ── Section C: Action menu (see ACTION_CARDS, C8 guardrail) ── */}
      <div id="emp-actions" className="humi-card scroll-mt-[var(--jumpnav-anchor)]">
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
