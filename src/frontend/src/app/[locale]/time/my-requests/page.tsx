'use client';

// /time/my-requests — STA-183
// Self-service unified view of the employee's OWN Leave + Overtime +
// Time-Correction requests. One Humi DataTable with type / status / cycle
// filters and a per-row Cancel gated by the cycle-window rule. Reads the three
// stores reactively and unifies them via the pure `buildMyRequests` adapter.

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ListChecks } from 'lucide-react';
import { Button, CardEyebrow, DataTable, EmptyState, FormField, Modal } from '@/components/humi';
import type { DataTableColumn } from '@/components/humi';
import { Badge } from '@/components/humi/atoms/badge';
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
import { currentPeriod, previousPeriod, demoToday } from '@/lib/time/period';
import { fmtHours } from '@/lib/time/leave-hours';
import { formatDate } from '@/lib/date';
import { useTranslations } from 'next-intl';

// View Detail opens the EMPLOYEE-ONLY, read-only status detail — never the
// approval surface. All three types resolve to /time/my-requests/[id].
const DETAIL_ROUTE: Record<MyRequestType, string> = {
  leave: 'time/my-requests',
  ot: 'time/my-requests',
  time_correction: 'time/my-requests',
};

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

const SELECT_CLASS =
  'w-full rounded-[var(--radius-xs)] border border-hairline bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 ring-accent-soft';

export default function MyRequestsPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'th';
  const isTh = locale === 'th';
  const t = useTranslations('time.myRequests');

  const userId = useAuthStore((s) => s.userId) ?? 'EMP001';
  const username = useAuthStore((s) => s.username);

  const leave = useLeaveApprovals((s) => s.requests);
  const ot = useOvertimeRequests((s) => s.requests);
  const tc = useTimeCorrections((s) => s.requests);
  const cancelLeave = useLeaveApprovals((s) => s.cancel);
  const cancelOt = useOvertimeRequests((s) => s.cancel);
  const cancelTc = useTimeCorrections((s) => s.cancel);

  const [typeFilter, setTypeFilter] = useState<'all' | MyRequestType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | MyRequestStatus>('all');
  const [cycleFilter, setCycleFilter] = useState<'all' | 'current' | 'previous'>('all');
  const [pendingCancel, setPendingCancel] = useState<MyRequestRow | null>(null);

  const rows = useMemo(
    () => buildMyRequests(userId, { leave, ot, tc }, demoToday()),
    [userId, leave, ot, tc],
  );

  const current = currentPeriod(demoToday());
  const previous = previousPeriod(demoToday());

  const filtered = useMemo(() => {
    const inRange = (date: string, range: { start: string; end: string }) =>
      date >= range.start && date <= range.end;
    return rows.filter((r) => {
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (cycleFilter === 'current' && !inRange(r.startDate, current)) return false;
      if (cycleFilter === 'previous' && !inRange(r.startDate, previous)) return false;
      return true;
    });
  }, [rows, typeFilter, statusFilter, cycleFilter, current, previous]);

  const fmt = (d: string) => formatDate(d, 'medium', locale);
  const currentRange = `${fmt(current.start)} – ${fmt(current.end)}`;
  const prevRange = `${fmt(previous.start)} – ${fmt(previous.end)}`;

  function confirmCancel() {
    const row = pendingCancel;
    if (!row) return;
    const actorName = username ?? (isTh ? 'พนักงาน' : 'Employee');
    if (row.type === 'leave') cancelLeave(row.id, { id: userId, name: actorName });
    else if (row.type === 'ot') cancelOt(row.id, { id: userId, name: actorName });
    else cancelTc(row.id, { name: actorName });
    setPendingCancel(null);
  }

  const columns: DataTableColumn<MyRequestRow>[] = [
    {
      id: 'type',
      header: t('col.type'),
      className: 'w-32',
      cell: (row) => <Badge variant={TYPE_VARIANT[row.type]}>{t(`type.${row.type === 'time_correction' ? 'timeCorrection' : row.type}`)}</Badge>,
    },
    {
      id: 'submitted',
      header: t('col.submitted'),
      className: 'w-32',
      sortAccessor: (row) => row.submittedDate,
      cell: (row) => <span className="text-sm text-ink-muted">{fmt(row.submittedDate.slice(0, 10))}</span>,
    },
    {
      id: 'start',
      header: t('col.start'),
      className: 'w-32',
      cell: (row) => <span className="text-sm text-ink">{fmt(row.startDate)}</span>,
    },
    {
      id: 'end',
      header: t('col.end'),
      className: 'w-32',
      cell: (row) => <span className="text-sm text-ink">{fmt(row.endDate)}</span>,
    },
    {
      // STA-258 — requested LEAVE hours (holiday/weekly-off days don't count);
      // em-dash for non-leave rows.
      id: 'requestedHours',
      header: t('col.requestedHours'),
      className: 'w-32',
      cell: (row) => (
        <span className="text-sm text-ink tabular-nums">
          {row.requestedHours != null ? `${fmtHours(row.requestedHours)} ${t('hoursUnit')}` : '—'}
        </span>
      ),
    },
    {
      id: 'detail',
      header: t('col.detail'),
      cell: (row) => <span className="text-sm text-ink">{isTh ? row.detail.th : row.detail.en}</span>,
    },
    {
      id: 'status',
      header: t('col.status'),
      className: 'w-36',
      cell: (row) => (
        <Badge variant={STATUS_VARIANT[row.status]}>{isTh ? row.statusLabel.th : row.statusLabel.en}</Badge>
      ),
    },
    {
      id: 'action',
      header: t('col.action'),
      className: 'w-44',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/${DETAIL_ROUTE[row.type]}/${row.id}`}
            className="text-xs font-medium text-accent hover:underline focus-visible:outline-none"
          >
            {t('action.viewDetail')}
          </Link>
          {row.cancellable && (
            <button
              type="button"
              onClick={() => setPendingCancel(row)}
              className="text-xs font-medium text-danger hover:underline focus-visible:outline-none"
            >
              {t('action.cancel')}
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <header>
        <CardEyebrow>{isTh ? 'เวลาและการเข้างาน' : 'Time & Attendance'}</CardEyebrow>
        <h1 className="font-display text-3xl font-semibold text-ink">{t('page.title')}</h1>
        <p className="mt-1 text-sm text-ink-muted max-w-2xl">{t('page.subtitle')}</p>
      </header>

      {/* Period-note banner (info tint, never red) — BE ranges from the helpers. */}
      <div className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4 text-sm text-ink-soft">
        {t('periodNote', { currentRange, prevRange })}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormField label={t('filter.type')}>
          {(p) => (
            <select
              {...p}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as 'all' | MyRequestType)}
              className={SELECT_CLASS}
            >
              <option value="all">{t('type.all')}</option>
              <option value="leave">{t('type.leave')}</option>
              <option value="ot">{t('type.ot')}</option>
              <option value="time_correction">{t('type.timeCorrection')}</option>
            </select>
          )}
        </FormField>
        <FormField label={t('filter.status')}>
          {(p) => (
            <select
              {...p}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | MyRequestStatus)}
              className={SELECT_CLASS}
            >
              <option value="all">{t('status.all')}</option>
              <option value="pending">{t('status.pending')}</option>
              <option value="approved">{t('status.approved')}</option>
              <option value="rejected">{t('status.rejected')}</option>
              <option value="cancelled">{t('status.cancelled')}</option>
            </select>
          )}
        </FormField>
        <FormField label={t('filter.cycle')}>
          {(p) => (
            <select
              {...p}
              value={cycleFilter}
              onChange={(e) => setCycleFilter(e.target.value as 'all' | 'current' | 'previous')}
              className={SELECT_CLASS}
            >
              <option value="all">{t('cycle.all')}</option>
              <option value="current">{t('cycle.current')}</option>
              <option value="previous">{t('cycle.previous')}</option>
            </select>
          )}
        </FormField>
      </div>

      <DataTable
        caption={t('page.title')}
        captionVisuallyHidden
        columns={columns}
        rows={filtered}
        rowKey={(row) => `${row.type}:${row.id}`}
        previewRows={8}
        emptyState={
          <EmptyState
            icon={ListChecks}
            titleTh={t('empty.title')}
            titleEn={t('empty.title')}
            descTh={t('empty.desc')}
            descEn={t('empty.desc')}
          />
        }
      />

      <Modal
        open={!!pendingCancel}
        onClose={() => setPendingCancel(null)}
        title={t('cancel.confirmTitle')}
      >
        <div className="space-y-6 px-6 py-5">
          <p className="text-sm text-ink-soft">{t('cancel.confirmBody')}</p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setPendingCancel(null)}>
              {t('cancel.confirmNo')}
            </Button>
            <Button variant="danger" onClick={confirmCancel}>
              {t('cancel.confirmYes')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
