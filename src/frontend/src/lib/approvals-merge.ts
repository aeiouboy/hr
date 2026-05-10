// approvals-merge — pure data layer for the unified /approvals inbox.
//
// Goal: collapse five separate "what am I waiting on?" stores plus the
// live Camunda task feed into ONE flat sorted stream. The page stays
// presentational; this file owns the schema.
//
// Each row is a discriminated union — the page switches on `domain` to
// pick the right per-row renderer. Sort key is `submittedAt desc` so the
// freshest waiting work surfaces first regardless of which queue it came
// from.

import type { BenefitClaimRequest, BenefitClaimStatus } from '@/stores/benefit-claims';
import type { BenefitReferralRequest, BenefitReferralStatus } from '@/stores/benefit-referrals';
import type { ApprovalRequest, ApprovalStep } from '@/stores/workflow-approvals';
import type { TerminationRequest, TerminationStep } from '@/stores/termination-approvals';
import type { PromotionRequest, PromotionStep } from '@/stores/promotion-approvals';
import type { PendingTaskSummary } from '@/lib/workflow-api';

// ── Public taxonomy ───────────────────────────────────────────────────────────

export type ApprovalDomain =
  | 'benefit'         // BenefitClaimsInbox mock store (pending_spd / approved / rejected / send_back)
  | 'benefitCamunda'  // Live Camunda benefit-request user tasks
  | 'referral'        // BenefitReferralInbox (Hospital referral letters)
  | 'personalInfo'    // ApprovalInbox — Chain 3 personal-info CRs
  | 'termination'     // TerminationInbox — Chain 1
  | 'promotion';      // PromotionInbox — Chain 4

/** Display-status — normalised across domains so filter chips can target one
 *  of three buckets. Each row stores its raw domain status separately. */
export type ApprovalRowStatus = 'pending' | 'approved' | 'rejected';

/** Common header shape every row carries — page renders it identically. */
export interface ApprovalRowSummary {
  /** Stable key for React lists. Always `${domain}:${rawId}`. */
  key: string;
  /** Internal id within the source store / Camunda. */
  rawId: string;
  domain: ApprovalDomain;
  /** Headline shown in the collapsed row, e.g. `ขอเบิก – Medical`. */
  title: string;
  /** Requester / employee name, surfaced beside the title. */
  requesterName: string;
  /** Optional employee id / requester id — disambiguates dups. */
  requesterId?: string;
  /** Single line of "why this matters" — amount, date range, position. */
  highlight?: string;
  /** ISO timestamp used for sorting. Always populated. */
  submittedAt: string;
  /** Normalised display status. */
  status: ApprovalRowStatus;
  /** Raw human-readable status label from the source store. */
  rawStatusLabel: string;
}

// Discriminated row variants — page narrows on `domain` to recover the payload.
export type ApprovalRow =
  | (ApprovalRowSummary & { domain: 'benefit'; payload: BenefitClaimRequest })
  | (ApprovalRowSummary & { domain: 'benefitCamunda'; payload: PendingTaskSummary })
  | (ApprovalRowSummary & { domain: 'referral'; payload: BenefitReferralRequest })
  | (ApprovalRowSummary & { domain: 'personalInfo'; payload: ApprovalRequest })
  | (ApprovalRowSummary & { domain: 'termination'; payload: TerminationRequest })
  | (ApprovalRowSummary & { domain: 'promotion'; payload: PromotionRequest });

// ── Status normalisation helpers ──────────────────────────────────────────────

function normaliseBenefitStatus(s: BenefitClaimStatus): ApprovalRowStatus {
  if (s === 'approved') return 'approved';
  if (s === 'rejected') return 'rejected';
  // 'pending_spd' and 'send_back' both still need attention from someone.
  return 'pending';
}

function normaliseReferralStatus(s: BenefitReferralStatus): ApprovalRowStatus {
  if (s === 'approved' || s === 'letter_issued') return 'approved';
  if (s === 'rejected' || s === 'cancelled') return 'rejected';
  // pending_spd / spd_reviewing / send_back / draft → pending bucket.
  return 'pending';
}

function normalisePersonalInfoStatus(s: ApprovalStep): ApprovalRowStatus {
  if (s === 'approved') return 'approved';
  if (s === 'rejected') return 'rejected';
  return 'pending';
}

function normaliseTerminationStatus(s: TerminationStep): ApprovalRowStatus {
  if (s === 'approved') return 'approved';
  if (s === 'rejected') return 'rejected';
  return 'pending'; // pending_manager + pending_spd
}

function normalisePromotionStatus(s: PromotionStep): ApprovalRowStatus {
  if (s === 'approved') return 'approved';
  if (s === 'rejected') return 'rejected';
  return 'pending';
}

// ── Row builders ──────────────────────────────────────────────────────────────

function thaiAmount(n: number): string {
  try {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `฿${n.toLocaleString('th-TH')}`;
  }
}

export function rowFromBenefitClaim(
  claim: BenefitClaimRequest,
  rawStatusLabel: string,
): ApprovalRow {
  return {
    key: `benefit:${claim.id}`,
    rawId: claim.id,
    domain: 'benefit',
    title: `ขอเบิก – ${claim.benefitName}`,
    requesterName: claim.employeeName,
    requesterId: claim.employeeId,
    highlight: thaiAmount(claim.totalClaimAmount),
    submittedAt: claim.submittedAt,
    status: normaliseBenefitStatus(claim.status),
    rawStatusLabel,
    payload: claim,
  };
}

export function rowFromCamundaTask(task: PendingTaskSummary): ApprovalRow {
  return {
    key: `benefitCamunda:${task.id}`,
    rawId: task.id,
    domain: 'benefitCamunda',
    title: `${task.name} (Workflow)`,
    requesterName: task.variables.requesterId,
    requesterId: task.variables.requesterId,
    highlight: thaiAmount(task.variables.amount),
    submittedAt: task.created,
    status: 'pending',
    rawStatusLabel: 'รอดำเนินการ (Camunda)',
    payload: task,
  };
}

export function rowFromReferral(
  referral: BenefitReferralRequest,
  rawStatusLabel: string,
): ApprovalRow {
  return {
    key: `referral:${referral.id}`,
    rawId: referral.id,
    domain: 'referral',
    title: `ใบส่งตัว – ${referral.hospital.name}`,
    requesterName: referral.employeeName,
    requesterId: referral.employeeId,
    highlight: referral.preferredVisitDate
      ? `นัด ${referral.preferredVisitDate}`
      : referral.serviceReason,
    submittedAt: referral.submittedAt ?? referral.updatedAt,
    status: normaliseReferralStatus(referral.status),
    rawStatusLabel,
    payload: referral,
  };
}

export function rowFromPersonalInfo(
  req: ApprovalRequest,
  rawStatusLabel: string,
): ApprovalRow {
  const fieldCount = req.diffs.length;
  return {
    key: `personalInfo:${req.id}`,
    rawId: req.id,
    domain: 'personalInfo',
    title: 'แก้ไขข้อมูลส่วนตัว',
    requesterName: req.employeeName,
    requesterId: req.employeeId,
    highlight: `${fieldCount} ฟิลด์`,
    submittedAt: req.submittedAt,
    status: normalisePersonalInfoStatus(req.status),
    rawStatusLabel,
    payload: req,
  };
}

export function rowFromTermination(
  req: TerminationRequest,
  rawStatusLabel: string,
  reasonLabel: string,
): ApprovalRow {
  return {
    key: `termination:${req.id}`,
    rawId: req.id,
    domain: 'termination',
    title: `ลาออก – ${reasonLabel}`,
    requesterName: req.employeeName,
    requesterId: req.employeeId,
    highlight: `วันสุดท้าย ${req.requestedLastDay}`,
    submittedAt: req.submittedAt,
    status: normaliseTerminationStatus(req.status),
    rawStatusLabel,
    payload: req,
  };
}

export function rowFromPromotion(
  req: PromotionRequest,
  rawStatusLabel: string,
): ApprovalRow {
  return {
    key: `promotion:${req.id}`,
    rawId: req.id,
    domain: 'promotion',
    title: `เลื่อนตำแหน่ง – ${req.toPosition}`,
    requesterName: req.employeeName,
    requesterId: req.employeeId,
    highlight: req.fromPosition ? `จาก ${req.fromPosition}` : undefined,
    submittedAt: req.submittedAt,
    status: normalisePromotionStatus(req.status),
    rawStatusLabel,
    payload: req,
  };
}

// ── Merge / filter ────────────────────────────────────────────────────────────

export interface MergeInput {
  benefitClaims: BenefitClaimRequest[];
  benefitClaimStatusLabels: Record<BenefitClaimStatus, string>;
  camundaTasks: PendingTaskSummary[];
  referrals: BenefitReferralRequest[];
  referralStatusLabels: Record<BenefitReferralStatus, string>;
  personalInfo: ApprovalRequest[];
  personalInfoStatusLabels: Record<ApprovalStep, string>;
  terminations: TerminationRequest[];
  terminationStatusLabels: Record<TerminationStep, string>;
  terminationReasonLabels: Record<string, string>;
  promotions: PromotionRequest[];
  promotionStatusLabels: Record<PromotionStep, string>;
}

/** Build the unified, sorted (newest first) row stream. Pure — safe to memoise.
 *
 * Mock-vs-Camunda rule: any benefit claim that carries a `workflowInstanceId`
 * is dropped from the Mock lane entirely — Camunda is the source of truth
 * for those. Only legacy seed claims (workflowInstanceId = null) keep their
 * Mock card. This avoids a race where the Camunda lane hasn't loaded yet
 * and the reviewer sees two cards for one claim, then approves the wrong
 * one (Mock approve only updates zustand and leaves the Camunda task open). */
export function mergeApprovalRows(input: MergeInput): ApprovalRow[] {
  const rows: ApprovalRow[] = [
    ...input.benefitClaims
      .filter((c) => !c.workflowInstanceId)
      .map((c) => rowFromBenefitClaim(c, input.benefitClaimStatusLabels[c.status] ?? c.status)),
    ...input.camundaTasks.map(rowFromCamundaTask),
    ...input.referrals.map((r) =>
      rowFromReferral(r, input.referralStatusLabels[r.status] ?? r.status),
    ),
    ...input.personalInfo.map((r) =>
      rowFromPersonalInfo(r, input.personalInfoStatusLabels[r.status] ?? r.status),
    ),
    ...input.terminations.map((r) =>
      rowFromTermination(
        r,
        input.terminationStatusLabels[r.status] ?? r.status,
        input.terminationReasonLabels[r.reasonCode] ?? r.reasonCode,
      ),
    ),
    ...input.promotions.map((r) =>
      rowFromPromotion(r, input.promotionStatusLabels[r.status] ?? r.status),
    ),
  ];

  // Sort newest first. Stable JS sort means same-timestamp ties keep insertion
  // order (benefit before camunda before referral …) which roughly mirrors the
  // priority a human would scan in.
  return rows.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}

// ── Filter primitives ─────────────────────────────────────────────────────────

export type DomainFilter = ApprovalDomain | 'all';
export type StatusFilter = ApprovalRowStatus | 'all';

export interface FilterCriteria {
  domain: DomainFilter;
  status: StatusFilter;
  /** Free-text search; matches requesterName, requesterId, title (case-insensitive). */
  query?: string;
}

export function filterApprovalRows(
  rows: ApprovalRow[],
  criteria: FilterCriteria,
): ApprovalRow[] {
  const q = criteria.query?.trim().toLowerCase();
  return rows.filter((row) => {
    if (criteria.domain !== 'all') {
      // Treat the live Camunda lane as part of the benefit domain when
      // the user picks "Benefit" — they think of it as one bucket.
      if (criteria.domain === 'benefit') {
        if (row.domain !== 'benefit' && row.domain !== 'benefitCamunda') return false;
      } else if (row.domain !== criteria.domain) {
        return false;
      }
    }
    if (criteria.status !== 'all' && row.status !== criteria.status) return false;
    if (q) {
      const haystack = [
        row.requesterName,
        row.requesterId ?? '',
        row.title,
        row.rawId,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/** Convenience: by-domain pending counts, used for the persona KPI strip. */
export function countByDomain(rows: ApprovalRow[]): Record<ApprovalDomain, number> {
  const init: Record<ApprovalDomain, number> = {
    benefit: 0,
    benefitCamunda: 0,
    referral: 0,
    personalInfo: 0,
    termination: 0,
    promotion: 0,
  };
  for (const row of rows) {
    if (row.status === 'pending') init[row.domain] += 1;
  }
  return init;
}
