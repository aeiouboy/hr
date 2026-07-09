'use client';

// /time/my-requests/[id] — EMPLOYEE-ONLY, read-only status detail for one of the
// signed-in employee's OWN requests (leave / overtime / time-correction). This is
// deliberately NOT the /workflows approval surface: it never renders Approve /
// Reject and never resolves another employee's record.
//
// Owner-scope: the row is resolved via buildMyRequests(userId, …), whose per-type
// mappers strict-owner-filter — a non-owner id yields no row → not-found state.
//
// MyRequestRow carries only the summary fields (id/type/dates/detail/status). To
// render reason + attachments + the approval chain we re-select the FULL SOURCE
// record via row.raw.{kind,id} from the per-type store, mirroring how the
// /workflows approval pages build the chain (appliedChainFor + audit). No backend.

import { use, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CalendarDays, Clock, Clock3, Paperclip } from 'lucide-react';
import { Button } from '@/components/humi';
import { Badge } from '@/components/humi/atoms/badge';
import { ApprovalChain } from '@/components/quick-approve/ApprovalChain';
import { useAuthStore } from '@/stores/auth-store';
import { useLeaveApprovals } from '@/stores/leave-approvals';
import { useOvertimeRequests } from '@/stores/overtime-requests';
import { useTimeCorrections } from '@/stores/time-corrections';
import {
  buildMyRequests,
  type MyRequestRow,
  type MyRequestStatus,
  type MyRequestType,
} from '@/lib/time/my-requests';
import { appliedChainFor } from '@/lib/time/approval-rules';
import type { RequestType } from '@/lib/quick-approve-api';
import type { ApproverStage } from '@/data/benefits/plan-registry';
import { demoToday } from '@/lib/time/period';
import { fmtHours } from '@/lib/time/leave-hours';
import { formatDate } from '@/lib/date';

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

const TYPE_VARIANT: Record<MyRequestType, 'success' | 'info' | 'neutral'> = {
  leave: 'success',
  ot: 'info',
  time_correction: 'neutral',
};

const STATUS_VARIANT: Record<MyRequestStatus, 'warning' | 'success' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  cancelled: 'error',
};

const TYPE_ICON: Record<MyRequestType, typeof CalendarDays> = {
  leave: CalendarDays,
  ot: Clock,
  time_correction: Clock3,
};

/** MyRequest type → canonical RequestType used by the routing/chain helpers. */
const CHAIN_TYPE: Record<MyRequestType, RequestType> = {
  leave: 'leave',
  ot: 'overtime',
  time_correction: 'time_correction',
};

/** The full source record fields this read-only view needs beyond MyRequestRow. */
interface SourceView {
  reason?: string;
  docs?: string[];
  audit: { action: string; actorName: string; at: string; comment?: string }[];
  leaveCode?: string;
}

export default function MyRequestDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const locale = useLocale();
  const isTh = locale !== 'en';
  const t = useTranslations('time.myRequests');
  const router = useRouter();

  const userId = useAuthStore((s) => s.userId) ?? 'EMP001';

  const leave = useLeaveApprovals((s) => s.requests);
  const ot = useOvertimeRequests((s) => s.requests);
  const tc = useTimeCorrections((s) => s.requests);

  // Owner-scoped resolve: buildMyRequests strict-owner-filters, so a non-owner id
  // simply yields no matching row → not-found (never another employee's data).
  const row: MyRequestRow | undefined = useMemo(
    () => buildMyRequests(userId, { leave, ot, tc }, demoToday()).find((r) => r.id === id),
    [userId, leave, ot, tc, id],
  );

  // Re-select the FULL source record for the fields MyRequestRow omits.
  const source: SourceView | undefined = useMemo(() => {
    if (!row) return undefined;
    if (row.raw.kind === 'leave') {
      const r = leave.find((x) => x.id === row.raw.id);
      if (!r) return undefined;
      return { reason: r.reason, docs: r.docs, audit: r.audit, leaveCode: r.leaveCode };
    }
    if (row.raw.kind === 'ot') {
      const r = ot.find((x) => x.id === row.raw.id);
      if (!r) return undefined;
      return { reason: r.reason, docs: r.docs, audit: r.audit };
    }
    const r = tc.find((x) => x.id === row.raw.id);
    if (!r) return undefined;
    return { reason: r.reason, docs: r.docs, audit: r.audit };
  }, [row, leave, ot, tc]);

  if (!row) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-base font-semibold text-ink">{t('detail.notFound')}</p>
        <p className="text-sm text-ink-muted">{t('detail.notFoundDesc')}</p>
        <Button
          variant="secondary"
          size="md"
          onClick={() => router.push(`/${locale}/time/my-requests`)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" aria-hidden />
          {t('detail.back')}
        </Button>
      </div>
    );
  }

  const Icon = TYPE_ICON[row.type];
  const typeLabel = t(`type.${row.type === 'time_correction' ? 'timeCorrection' : row.type}`);
  const statusLabel = isTh ? row.statusLabel.th : row.statusLabel.en;
  const detailText = isTh ? row.detail.th : row.detail.en;

  // Build the approval chain the SAME way the approval page does: slice the routing
  // chain to this request's depth, then mark the active stage by how many approvals
  // have already been recorded in the source audit. Presentational only — the
  // ApprovalChain component renders pills, never action buttons.
  const chainSteps = appliedChainFor(CHAIN_TYPE[row.type], source?.leaveCode);
  const chainStages: ApproverStage[] = chainSteps.map((s) => s.stage);
  const decidedSteps = (source?.audit ?? []).filter((a) => a.action === 'approve').length;
  const activeStage =
    row.status === 'pending' ? chainSteps[decidedSteps]?.stage : undefined;

  const dateRange =
    row.endDate && row.endDate !== row.startDate
      ? `${formatDate(row.startDate, 'medium', locale)} – ${formatDate(row.endDate, 'medium', locale)}`
      : formatDate(row.startDate, 'medium', locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {/* STA-197 — prominent Back button (breadcrumb below keeps orientation). */}
      <Button
        variant="secondary"
        size="sm"
        className="mb-3"
        onClick={() => router.push(`/${locale}/time/my-requests`)}
      >
        <ChevronLeft className="h-4 w-4 mr-1" aria-hidden />
        {t('detail.backButton')}
      </Button>
      {/* Breadcrumb → back to My Request (NOT the approval queue). */}
      <nav className="flex items-center gap-1 text-xs text-ink-muted mb-4" aria-label="breadcrumb">
        <Link href={`/${locale}/time/my-requests`} className="hover:text-ink transition">
          {t('detail.back')}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="text-ink font-medium">{row.id}</span>
      </nav>

      {/* Header */}
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[11px] bg-accent-soft text-accent">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
            {typeLabel} · {row.id}
          </div>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            {detailText}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant={TYPE_VARIANT[row.type]}>{typeLabel}</Badge>
            <Badge variant={STATUS_VARIANT[row.status]}>{statusLabel}</Badge>
          </div>
        </div>
      </div>

      {/* Details (read-only) */}
      <div className="rounded-[var(--radius-md)] border border-hairline bg-surface shadow-[var(--shadow-card)] p-4">
        <div className="divide-y divide-hairline">
          <div className="flex gap-2 py-1.5">
            <span className="w-44 shrink-0 text-xs text-ink-muted">{t('detail.submitted')}</span>
            <span className="text-sm text-ink">
              {formatDate(row.submittedDate.slice(0, 10), 'medium', locale)}
            </span>
          </div>
          <div className="flex gap-2 py-1.5">
            <span className="w-44 shrink-0 text-xs text-ink-muted">{t('detail.dates')}</span>
            <span className="text-sm text-ink">{dateRange}</span>
          </div>
          {/* STA-258 — requested LEAVE hours (holiday/weekly-off days don't count). */}
          {row.requestedHours != null && (
            <div className="flex gap-2 py-1.5" data-testid="detail-requested-hours">
              <span className="w-44 shrink-0 text-xs text-ink-muted">{t('detail.requestedHours')}</span>
              <span className="text-sm text-ink tabular-nums">
                {fmtHours(row.requestedHours)} {t('hoursUnit')}
              </span>
            </div>
          )}
          {source?.reason ? (
            <div className="flex gap-2 py-1.5">
              <span className="w-44 shrink-0 text-xs text-ink-muted">{t('detail.reason')}</span>
              <span className="text-sm text-ink">{source.reason}</span>
            </div>
          ) : null}
        </div>

        {/* Attachments (view/download — mock names only) */}
        {source?.docs && source.docs.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {t('detail.attachments')}
            </p>
            <ul className="flex flex-col gap-1.5">
              {source.docs.map((doc, i) => (
                <li key={`${doc}-${i}`}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                  >
                    <Paperclip size={13} aria-hidden />
                    {doc}
                    <span className="text-ink-muted">· {t('detail.viewDownload')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Approval chain — read-only pill chain (presentational, no action buttons) */}
      <div className="mt-4 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {t('detail.approvalChain')}
        </p>
        <ApprovalChain chain={chainStages} locale={locale} activeStage={activeStage} />
      </div>

      {/* History (audit trail) */}
      {source?.audit && source.audit.length > 0 && (
        <div className="mt-4 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {t('detail.history')}
          </p>
          <div className="flex flex-col gap-3">
            {source.audit.map((entry, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-ink">
                    {entry.action} · {entry.actorName}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-muted">
                    {formatDate(entry.at, 'medium', locale)}
                    {entry.comment ? ` — ${entry.comment}` : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
