'use client';

// /[locale]/approvals — UNIFIED approval inbox.
//
// Replaces /spd/inbox + scattered manager queues. One flat sorted list
// across all five approval domains plus the live Camunda benefit-request
// task lane. Each row stays compact when collapsed and reuses the
// existing per-domain inbox components for the expanded detail render
// (BenefitClaimsInbox, BenefitReferralInbox, ApprovalInbox, …).
//
// Persona visibility (phase-1 demo): every authenticated user sees every
// pending row, with the domain badge clarifying source. RBAC tightening
// (manager-only sees their reports; HR Admin read-only over all) is a
// phase-2 task tracked inline below.

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Briefcase,
  ChevronDown,
  ChevronRight,
  Clock,
  Filter,
  Hospital,
  Inbox,
  IdCard,
  LogOut,
  Search,
  TrendingUp,
  UserCog,
  Workflow,
} from 'lucide-react';

import { BenefitClaimCard, CamundaTaskCard } from '@/components/workflow/BenefitClaimsInbox';
import { ReferralCard } from '@/components/workflow/BenefitReferralInbox';
import { RequestCard } from '@/components/workflow/ApprovalInbox';
import { TerminationCard } from '@/components/workflow/TerminationInbox';
import { PromotionCard } from '@/components/workflow/PromotionInbox';
import { useAuthStore } from '@/stores/auth-store';
import {
  BENEFIT_STATUS_LABEL,
  useBenefitClaimsStore,
} from '@/stores/benefit-claims';
import {
  BENEFIT_REFERRAL_STATUS_LABEL,
  useBenefitReferralsStore,
} from '@/stores/benefit-referrals';
import { useWorkflowApprovals } from '@/stores/workflow-approvals';
import {
  TERMINATION_REASON_LABEL,
  TERMINATION_STEP_LABEL,
  useTerminationApprovals,
} from '@/stores/termination-approvals';
import {
  PROMOTION_STEP_LABEL,
  usePromotionApprovals,
} from '@/stores/promotion-approvals';
import { completeTask, listPendingTasks, type PendingTaskSummary } from '@/lib/workflow-api';
import { useToast } from '@/components/ui/toast';
import {
  countByDomain,
  filterApprovalRows,
  mergeApprovalRows,
  type ApprovalDomain,
  type ApprovalRow,
  type DomainFilter,
  type StatusFilter,
} from '@/lib/approvals-merge';

const STEP_LABEL_FALLBACK = {
  pending_spd: 'รอ SPD อนุมัติ',
  approved: 'อนุมัติแล้ว',
  rejected: 'ถูกปฏิเสธ',
};

const CAMUNDA_POLL_MS = 12_000;
const CAMUNDA_FALLBACK_ASSIGNEE = 'demo';

// ── Domain meta — colour pip + icon + label key per domain. Visual sorting
//    cue when the user is scanning the flat list at a glance.
const DOMAIN_META: Record<
  Exclude<ApprovalDomain, 'benefitCamunda'>,
  { icon: typeof Inbox; tone: string; labelKey: keyof DomainLabels }
> = {
  benefit:      { icon: Briefcase, tone: 'var(--color-mint, #4a9d6c)',     labelKey: 'benefit' },
  referral:     { icon: Hospital,  tone: 'var(--color-rose, #c0506b)',     labelKey: 'referral' },
  personalInfo: { icon: IdCard,    tone: 'var(--color-butter, #d8a73a)',   labelKey: 'personalInfo' },
  termination:  { icon: LogOut,    tone: 'var(--color-clay, #b56556)',     labelKey: 'termination' },
  promotion:    { icon: TrendingUp,tone: 'var(--color-cobalt, #4f6ec9)',   labelKey: 'promotion' },
};

interface DomainLabels {
  benefit: string;
  referral: string;
  personalInfo: string;
  termination: string;
  promotion: string;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ApprovalsInboxPage() {
  const t = useTranslations('approvalsInbox');

  // ── Persona ───────────────────────────────────────────────────────────────
  const userId = useAuthStore((s) => s.userId);
  const username = useAuthStore((s) => s.username);
  const roles = useAuthStore((s) => s.roles);
  const primaryRole = roles[0] ?? 'employee';

  // ── Source stores ─────────────────────────────────────────────────────────
  const benefitClaims = useBenefitClaimsStore((s) => s.claims);
  const referrals = useBenefitReferralsStore((s) => s.referrals);
  const personalInfo = useWorkflowApprovals((s) => s.requests);
  const terminations = useTerminationApprovals((s) => s.requests);
  const promotions = usePromotionApprovals((s) => s.requests);

  // ── Camunda live lane (manager / SPD shared). Polls every 12s. ────────────
  const camundaAssignee = userId ?? CAMUNDA_FALLBACK_ASSIGNEE;
  const [camundaTasks, setCamundaTasks] = useState<PendingTaskSummary[]>([]);
  const [camundaError, setCamundaError] = useState<string | null>(null);
  // First-refresh gate — while false, suppress Mock rows that have a
  // `workflowInstanceId` so the reviewer doesn't approve a stale local card
  // before the Camunda lane has populated (Option-1 race fix).
  const [camundaInitialized, setCamundaInitialized] = useState(false);

  // Derive Camunda candidate groups from Humi roles. A reviewer's task lane
  // should include both (a) tasks directly assigned to them and (b) tasks
  // open to a group they belong to — otherwise managers can't pick up a
  // task that the engine assigned to a fallback user (e.g. `demo`).
  const camundaCandidateGroups = useMemo(() => {
    const g: string[] = [];
    if (roles.includes('manager') || roles.includes('hr_manager')) g.push('managers');
    if (roles.includes('spd') || roles.includes('hr_admin') || roles.includes('hrbp')) g.push('hr-auditors');
    return g.join(',');
  }, [roles]);

  const refreshCamunda = useCallback(async () => {
    try {
      const queries = [listPendingTasks({ assignee: camundaAssignee })];
      if (camundaCandidateGroups) {
        queries.push(listPendingTasks({ candidateGroups: camundaCandidateGroups }));
      }
      const results = await Promise.all(queries);
      const byId = new Map<string, PendingTaskSummary>();
      for (const arr of results) for (const t of arr) byId.set(t.id, t);
      setCamundaTasks([...byId.values()]);
      setCamundaError(null);
    } catch (e) {
      setCamundaError(e instanceof Error ? e.message : String(e));
    } finally {
      setCamundaInitialized(true);
    }
  }, [camundaAssignee, camundaCandidateGroups]);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => { if (!cancelled) await refreshCamunda(); };
    void tick();
    const handle = window.setInterval(tick, CAMUNDA_POLL_MS);
    return () => { cancelled = true; window.clearInterval(handle); };
  }, [refreshCamunda]);

  // ── Merge ─────────────────────────────────────────────────────────────────
  // Pre-filter benefit claims: until the first Camunda poll has returned,
  // hide any local Mock claim that's wired to a Camunda flow. The dedupe
  // inside mergeApprovalRows only kicks in once camundaTasks is populated,
  // so without this guard the reviewer briefly sees a Mock card and can
  // approve it locally before the Camunda lane shows up.
  const visibleBenefitClaims = useMemo(
    () => (camundaInitialized ? benefitClaims : benefitClaims.filter((c) => !c.workflowInstanceId)),
    [benefitClaims, camundaInitialized],
  );

  const allRows = useMemo<ApprovalRow[]>(
    () =>
      mergeApprovalRows({
        benefitClaims: visibleBenefitClaims,
        benefitClaimStatusLabels: BENEFIT_STATUS_LABEL,
        camundaTasks,
        referrals,
        referralStatusLabels: BENEFIT_REFERRAL_STATUS_LABEL,
        personalInfo,
        personalInfoStatusLabels: STEP_LABEL_FALLBACK,
        terminations,
        terminationStatusLabels: TERMINATION_STEP_LABEL,
        terminationReasonLabels: TERMINATION_REASON_LABEL,
        promotions,
        promotionStatusLabels: PROMOTION_STEP_LABEL,
      }),
    [visibleBenefitClaims, camundaTasks, referrals, personalInfo, terminations, promotions],
  );

  // ── Filter UI state ───────────────────────────────────────────────────────
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [query, setQuery] = useState('');

  const visibleRows = useMemo(
    () => filterApprovalRows(allRows, { domain: domainFilter, status: statusFilter, query }),
    [allRows, domainFilter, statusFilter, query],
  );
  const pendingCounts = useMemo(() => countByDomain(allRows), [allRows]);
  const totalPending = useMemo(
    () => allRows.filter((r) => r.status === 'pending').length,
    [allRows],
  );

  const domainLabels: DomainLabels = {
    benefit: t('filter.domain.benefit'),
    referral: t('filter.domain.referral'),
    personalInfo: t('filter.domain.personalInfo'),
    termination: t('filter.domain.termination'),
    promotion: t('filter.domain.promotion'),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* ─── Domain pulse strip ───────────────────────────────────────── */}
      <nav
        aria-label={t('filter.domain.label')}
        className="humi-row"
        style={{ gap: 8, flexWrap: 'wrap' }}
      >
        <DomainChip
          active={domainFilter === 'all'}
          onClick={() => setDomainFilter('all')}
          icon={<Filter size={12} aria-hidden />}
          label={t('filter.domain.all')}
          count={totalPending}
        />
        {(Object.keys(DOMAIN_META) as Array<keyof typeof DOMAIN_META>).map((d) => {
          const meta = DOMAIN_META[d];
          const Icon = meta.icon;
          const count =
            d === 'benefit'
              ? pendingCounts.benefit + pendingCounts.benefitCamunda
              : pendingCounts[d];
          return (
            <DomainChip
              key={d}
              active={domainFilter === d}
              onClick={() => setDomainFilter(d)}
              icon={<Icon size={12} aria-hidden />}
              label={domainLabels[meta.labelKey]}
              count={count}
              tone={meta.tone}
            />
          );
        })}
      </nav>

      {/* ─── Status chips + search ───────────────────────────────────── */}
      <div
        className="humi-row"
        style={{
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingBottom: 4,
          borderBottom: '1px solid var(--color-hairline-soft)',
        }}
      >
        <div className="humi-row" style={{ gap: 6, flexWrap: 'wrap' }}>
          {(['pending', 'approved', 'rejected', 'all'] as const).map((s) => (
            <StatusChip
              key={s}
              active={statusFilter === s}
              onClick={() => setStatusFilter(s)}
              label={t(`filter.status.${s}`)}
            />
          ))}
        </div>
        <div className="humi-spacer" style={{ flex: 1 }} />
        <label
          className="humi-row"
          style={{
            gap: 6,
            alignItems: 'center',
            background: 'var(--color-canvas-soft)',
            border: '1px solid var(--color-hairline)',
            borderRadius: 8,
            padding: '6px 10px',
            minWidth: 220,
          }}
        >
          <Search size={12} aria-hidden style={{ opacity: 0.6 }} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            aria-label={t('search.placeholder')}
            className="text-small text-ink"
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              flex: 1,
              minWidth: 0,
            }}
          />
        </label>
      </div>

      {/* ─── Camunda gateway-down hint ─────────────────────────────── */}
      {camundaError && (
        <div
          className="humi-card"
          style={{ padding: '8px 12px', borderColor: 'var(--color-danger, #c0392b)' }}
          role="status"
        >
          <p className="text-small text-ink-muted">
            <Workflow size={11} className="inline mr-1" aria-hidden />
            {t('camundaOffline', { error: camundaError })}
          </p>
        </div>
      )}

      {/* ─── Flat list ───────────────────────────────────────────────── */}
      <section aria-label={t('listLabel')}>
        {visibleRows.length === 0 ? (
          <div
            className="humi-card humi-card--cream"
            style={{ textAlign: 'center', padding: 56 }}
          >
            <Inbox size={28} aria-hidden style={{ opacity: 0.4, marginBottom: 8 }} />
            <p className="text-body text-ink-muted">{t('empty')}</p>
            <p className="text-small text-ink-muted mt-1">{t('emptyHint')}</p>
          </div>
        ) : (
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {visibleRows.map((row) => (
              <li key={row.key}>
                <ApprovalRowItem row={row} domainLabels={domainLabels} onRefreshCamunda={refreshCamunda} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Phase-2 visibility-rule note kept here so the next maintainer sees the
          intent without grepping. Strip when RBAC is enforced server-side. */}
      <p className="text-small text-ink-faint" style={{ marginTop: 8, fontStyle: 'italic' }}>
        {t('phaseTwoHint')}
      </p>
    </div>
  );
}

// ── Subcomponents ─────────────────────────────────────────────────────────────

function DomainChip({
  active,
  onClick,
  icon,
  label,
  count,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
  tone?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="humi-row"
      style={{
        gap: 6,
        alignItems: 'center',
        padding: '6px 12px',
        borderRadius: 999,
        border: active
          ? '1px solid var(--color-ink)'
          : '1px solid var(--color-hairline)',
        background: active ? 'var(--color-ink)' : 'var(--color-canvas)',
        color: active ? 'var(--color-canvas)' : 'var(--color-ink-muted)',
        fontSize: 12,
        fontWeight: 500,
        cursor: 'pointer',
        transition:
          'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      }}
    >
      {tone && (
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: 999,
            background: tone,
          }}
        />
      )}
      {icon}
      <span>{label}</span>
      <span
        style={{
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 600,
          opacity: active ? 1 : 0.7,
        }}
      >
        {count}
      </span>
    </button>
  );
}

function StatusChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: '4px 10px',
        borderRadius: 6,
        border: 'none',
        background: active ? 'var(--color-accent-soft, #f0ead8)' : 'transparent',
        color: active ? 'var(--color-ink)' : 'var(--color-ink-muted)',
        fontSize: 12,
        fontWeight: active ? 600 : 500,
        cursor: 'pointer',
        textDecorationLine: active ? 'none' : 'underline',
        textDecorationColor: 'transparent',
        transition: 'background var(--dur-fast) var(--ease-out)',
      }}
    >
      {label}
    </button>
  );
}

function ApprovalRowItem({
  row,
  domainLabels,
  onRefreshCamunda,
}: {
  row: ApprovalRow;
  domainLabels: DomainLabels;
  onRefreshCamunda?: () => Promise<void>;
}) {
  const t = useTranslations('approvalsInbox');

  // Camunda lane shares the benefit visual badge but with its own label.
  const isCamunda = row.domain === 'benefitCamunda';
  const badgeKey: keyof DomainLabels = isCamunda ? 'benefit' : (row.domain as keyof DomainLabels);
  const meta = DOMAIN_META[badgeKey];
  const Icon = isCamunda ? Workflow : meta.icon;

  const submitted = useMemo(() => {
    try {
      return new Date(row.submittedAt).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return row.submittedAt;
    }
  }, [row.submittedAt]);

  const statusToneVar =
    row.status === 'approved'
      ? 'var(--color-mint, #4a9d6c)'
      : row.status === 'rejected'
      ? 'var(--color-clay, #b56556)'
      : 'var(--color-butter, #d8a73a)';

  return (
    <details
      className="humi-card"
      style={{
        padding: 0,
        overflow: 'hidden',
        transition: 'box-shadow var(--dur-base) var(--ease-spring)',
      }}
    >
      <summary
        className="humi-row"
        style={{
          gap: 10,
          alignItems: 'center',
          padding: '12px 16px',
          cursor: 'pointer',
          listStyle: 'none',
          flexWrap: 'wrap',
        }}
      >
        {/* Left pip — domain accent */}
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: 6,
            height: 22,
            borderRadius: 3,
            background: meta.tone,
            flexShrink: 0,
          }}
        />

        {/* Domain badge */}
        <span
          className="humi-row"
          style={{
            gap: 4,
            alignItems: 'center',
            padding: '2px 8px',
            borderRadius: 6,
            background: 'var(--color-canvas-soft)',
            border: '1px solid var(--color-hairline-soft)',
            fontSize: 11,
            color: 'var(--color-ink-muted)',
            flexShrink: 0,
          }}
        >
          <Icon size={11} aria-hidden />
          <span>{isCamunda ? t('badge.camunda') : domainLabels[badgeKey]}</span>
        </span>

        {/* Title + requester */}
        <span style={{ flex: 1, minWidth: 200 }}>
          <span className="text-small font-semibold text-ink" style={{ display: 'block' }}>
            {row.title}
          </span>
          <span className="text-small text-ink-muted" style={{ display: 'block', fontSize: 12 }}>
            {row.requesterName}
            {row.requesterId ? ` · ${row.requesterId}` : ''}
          </span>
        </span>

        {/* Highlight (amount/date) */}
        {row.highlight && (
          <span
            className="text-small"
            style={{
              color: 'var(--color-ink)',
              fontVariantNumeric: 'tabular-nums',
              fontWeight: 600,
              minWidth: 100,
              textAlign: 'right',
            }}
          >
            {row.highlight}
          </span>
        )}

        <span
          className="text-small text-ink-muted"
          style={{ minWidth: 90, textAlign: 'right', fontSize: 11 }}
        >
          {submitted}
        </span>

        {/* Status pip */}
        <span
          className="humi-row"
          style={{
            gap: 6,
            alignItems: 'center',
            padding: '2px 10px',
            borderRadius: 999,
            background: 'var(--color-canvas-soft)',
            fontSize: 11,
            color: 'var(--color-ink)',
            flexShrink: 0,
          }}
        >
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: 999,
              background: statusToneVar,
            }}
          />
          {row.rawStatusLabel}
        </span>

        {/* Expand affordance — flips on open via the parent `details[open]` selector */}
        <span aria-hidden style={{ flexShrink: 0, color: 'var(--color-ink-muted)' }}>
          <ChevronRight
            size={14}
            className="approvals-row-chev"
            style={{ transition: 'transform var(--dur-fast) var(--ease-spring)' }}
          />
        </span>
      </summary>

      <div
        style={{
          borderTop: '1px solid var(--color-hairline-soft)',
          padding: '14px 16px',
          background: 'var(--color-canvas-soft)',
        }}
      >
        <ExpandedDetail row={row} onRefreshCamunda={onRefreshCamunda} />
      </div>

      {/* Tiny inline rule: rotate chevron when open. Kept inline so we don't
          have to add a CSS file just for this page. */}
      <style>{`
        details[open] > summary .approvals-row-chev {
          transform: rotate(90deg);
        }
      `}</style>
    </details>
  );
}

// ── Expanded detail — renders EXACTLY ONE card for the specific row ──────────
//
// Pending rows: action card with approve/reject/send-back buttons, wired
// directly to the relevant store mutator or completeTask (Camunda).
// Read-only rows (approved/rejected): RequestSummaryCard with audit timeline.

function ExpandedDetail({ row, onRefreshCamunda }: { row: ApprovalRow; onRefreshCamunda?: () => Promise<void> }) {
  const actorName = useAuthStore((s) => s.username) ?? 'SPD';
  const actor = { role: 'spd' as const, name: actorName };
  const { toast } = useToast();

  // Benefit mock lane
  const approveClaim = useBenefitClaimsStore((s) => s.approveClaim);
  const rejectClaim = useBenefitClaimsStore((s) => s.rejectClaim);
  const sendBackClaim = useBenefitClaimsStore((s) => s.sendBackClaim);

  // Referral lane
  const startReferralReview = useBenefitReferralsStore((s) => s.startReferralReview);
  const approveReferral = useBenefitReferralsStore((s) => s.approveReferral);
  const rejectReferral = useBenefitReferralsStore((s) => s.rejectReferral);
  const sendBackReferral = useBenefitReferralsStore((s) => s.sendBackReferral);
  const issueReferralLetter = useBenefitReferralsStore((s) => s.issueReferralLetter);

  // PersonalInfo lane
  const approvePersonalInfo = useWorkflowApprovals((s) => s.approve);
  const rejectPersonalInfo = useWorkflowApprovals((s) => s.reject);

  // Termination lane
  const approveTermination = useTerminationApprovals((s) => s.approve);
  const rejectTermination = useTerminationApprovals((s) => s.reject);

  // Promotion lane
  const approvePromotion = usePromotionApprovals((s) => s.approve);
  const rejectPromotion = usePromotionApprovals((s) => s.reject);

  switch (row.domain) {
    case 'benefit':
      if (row.status !== 'pending') return <RequestSummaryCard row={row} />;
      return (
        <BenefitClaimCard
          claim={row.payload}
          onApprove={(note) => approveClaim(row.payload.id, actor, note)}
          onReject={(reason) => rejectClaim(row.payload.id, actor, reason)}
          onSendBack={(reason) => sendBackClaim(row.payload.id, actor, reason)}
        />
      );

    case 'benefitCamunda':
      return (
        <CamundaTaskCard
          task={row.payload}
          onApprove={async (note) => {
            try {
              await completeTask(row.payload.id, { approved: true, reviewerComment: note });
              await onRefreshCamunda?.();
              toast('success', 'อนุมัติเรียบร้อย');
            } catch (err) {
              const errorMsg = err instanceof Error ? err.message : String(err);
              let userMsg = 'ไม่สามารถอนุมัติได้ กรุณาลองใหม่';
              if (errorMsg.includes('TASK_NOT_FOUND')) userMsg = 'ใบนี้ถูกประมวลผลแล้ว กรุณา refresh';
              else if (errorMsg.includes('TASK_ALREADY_RESOLVED')) userMsg = 'ใบนี้ถูกอนุมัติ/ปฏิเสธไปแล้ว';
              else if (errorMsg.includes('CAMUNDA_UNAVAILABLE')) userMsg = 'ระบบ workflow ไม่ตอบสนอง กรุณาลองใหม่ภายหลัง';
              toast('error', userMsg);
              console.error('[approvals] completeTask approve failed:', err);
              await onRefreshCamunda?.();
            }
          }}
          onReject={async (reason) => {
            try {
              await completeTask(row.payload.id, { approved: false, reviewerComment: reason });
              await onRefreshCamunda?.();
              toast('success', 'ปฏิเสธเรียบร้อย');
            } catch (err) {
              const errorMsg = err instanceof Error ? err.message : String(err);
              let userMsg = 'ไม่สามารถปฏิเสธได้ กรุณาลองใหม่';
              if (errorMsg.includes('TASK_NOT_FOUND') || errorMsg.includes('TASK_ALREADY_RESOLVED')) {
                userMsg = 'ใบนี้ถูกประมวลผลแล้ว กรุณา refresh';
              } else if (errorMsg.includes('CAMUNDA_UNAVAILABLE')) {
                userMsg = 'ระบบ workflow ไม่ตอบสนอง กรุณาลองใหม่ภายหลัง';
              }
              toast('error', userMsg);
              console.error('[approvals] completeTask reject failed:', err);
              await onRefreshCamunda?.();
            }
          }}
        />
      );

    case 'referral': {
      if (row.status !== 'pending') return <RequestSummaryCard row={row} />;
      const ref = row.payload;
      return (
        <ReferralCard
          referral={ref}
          onStartReview={(note) => startReferralReview(ref.id, actor, note)}
          onApprove={(note) => approveReferral(ref.id, actor, note)}
          onReject={(reason) => rejectReferral(ref.id, actor, reason)}
          onSendBack={(reason) => sendBackReferral(ref.id, actor, reason)}
          onIssue={() => issueReferralLetter(ref.id, actor)}
        />
      );
    }

    case 'personalInfo':
      if (row.status !== 'pending') return <RequestSummaryCard row={row} />;
      return (
        <RequestCard
          req={row.payload}
          onApprove={(comment) => approvePersonalInfo(row.payload.id, actor, comment)}
          onReject={(reason) => rejectPersonalInfo(row.payload.id, actor, reason)}
        />
      );

    case 'termination':
      if (row.status !== 'pending') return <RequestSummaryCard row={row} />;
      return (
        <TerminationCard
          req={row.payload}
          onApprove={(comment) => approveTermination(row.payload.id, actor, comment)}
          onReject={(reason) => rejectTermination(row.payload.id, actor, reason)}
        />
      );

    case 'promotion':
      if (row.status !== 'pending') return <RequestSummaryCard row={row} />;
      return (
        <PromotionCard
          req={row.payload}
          onApprove={(comment) => approvePromotion(row.payload.id, actor, comment)}
          onReject={(reason) => rejectPromotion(row.payload.id, actor, reason)}
        />
      );

    default: {
      // Exhaustiveness guard — TypeScript will fail this branch if a new
      // domain is added without a render-case above.
      const _exhaustive: never = row;
      return null;
    }
  }
}

// ── Read-only summary card for approved / rejected rows ───────────────────────

function RequestSummaryCard({ row }: { row: ApprovalRow }) {
  const statusColor =
    row.status === 'approved'
      ? 'var(--color-mint, #4a9d6c)'
      : 'var(--color-clay, #b56556)';

  // Collect audit entries from the payload if available.
  const audit: Array<{ at: string; actorName: string; action: string; note?: string }> =
    (() => {
      const p = row.payload as Record<string, unknown>;
      if (Array.isArray(p['audit'])) return p['audit'] as typeof audit;
      return [];
    })();

  // Pull Camunda flow id (process-instance-id) from the row payload when
  // available. Lets reviewers correlate a closed claim back to the workflow
  // run in /history or Cockpit.
  const flowId =
    row.domain === 'benefit'
      ? row.payload.workflowInstanceId ?? null
      : row.domain === 'benefitCamunda'
        ? row.payload.instanceId
        : null;

  return (
    <div className="humi-card humi-card--cream" style={{ padding: 18 }}>
      <div className="humi-row" style={{ gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>
            {row.rawId}
            {flowId && (
              <>
                {' · '}
                <span style={{ fontFamily: 'var(--font-mono, ui-monospace, monospace)', textTransform: 'none', letterSpacing: 0 }}>
                  flow {flowId.slice(0, 8)}
                </span>
              </>
            )}
          </div>
          <div className="text-body font-semibold text-ink">{row.title}</div>
          <div className="text-small text-ink-muted mt-0.5">
            {row.requesterName}
            {row.requesterId ? ` · ${row.requesterId}` : ''}
            {row.highlight ? ` · ${row.highlight}` : ''}
          </div>
        </div>
        <span
          style={{
            padding: '3px 10px',
            borderRadius: 999,
            background: 'var(--color-canvas-soft)',
            border: `1px solid ${statusColor}`,
            fontSize: 11,
            color: statusColor,
            fontWeight: 600,
            alignSelf: 'center',
          }}
        >
          {row.rawStatusLabel}
        </span>
      </div>

      {audit.length > 0 && (
        <div style={{ marginTop: 14, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 14 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 8 }}>Timeline</div>
          <ol style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 0, listStyle: 'none' }}>
            {audit.map((entry, idx) => (
              <li key={`audit-${idx}`} className="text-small">
                <span className="text-ink-muted" style={{ marginRight: 6 }}>
                  {new Date(entry.at).toLocaleDateString('th-TH', {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </span>
                <span className="font-medium text-ink">{entry.actorName}</span>
                <span className="text-ink-muted"> · {entry.action}</span>
                {entry.note && <span className="text-ink-muted"> — {entry.note}</span>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
