// VALIDATION_EXEMPT: display/admin landing — filter chips + action buttons only, no data submit form (per design-gates Track C 2026-04-26)
'use client';

/**
 * QuickApprovePage — A-4 Unified Approval Workspace
 *
 * Shell used by Manager / SPD / HRBP — same component, field-level RBAC via
 * <Capability> gates distinguishes what each persona sees.
 *
 * Acceptance criteria (MOCKUP-MATRIX.md §A-4):
 *   1. Header card — bilingual title, persona chip, queue scope label
 *   2. Filter strip — type, urgency, search, date range; Benefits chip RBAC-gated
 *   3. Bulk-action bar — checkbox-driven; gated by bulkApprove capability
 *   4. Inbox table — DataTable with select-checkbox, type, requester, days waiting,
 *      current step, urgency chip, → link to /quick-approve/{id}
 *   5. Approval-chain per row (compact) — ApprovalTimelineChain
 *   6. Delegation banner — proxy mode via originalUser
 *   7. Empty state
 */

import { useState, useMemo, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Search,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  X,
  ChevronRight,
  Users,
  Building2,
  Globe,
  AlertCircle,
  Settings2,
} from 'lucide-react';
import { Card, CardTitle, Button, DataTable, Capability, Modal } from '@/components/humi';
import type { DataTableColumn } from '@/components/humi';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { UrgencyBadge } from '@/components/quick-approve/UrgencyBadge';
import { ApprovalTimelineChain } from '@/components/quick-approve/ApprovalChain';
import { DelegationModal } from '@/components/quick-approve/DelegationModal';
import { useAuthStore } from '@/stores/auth-store';
import { useCapabilities } from '@/hooks/use-capabilities';
import { useQuickApprove } from '@/hooks/use-quick-approve';
import { MOCK_PENDING_REQUESTS } from '@/components/quick-approve/mock-requests';
import { useProbationCases, type ProbationCase } from '@/hooks/use-probation';
import type { PendingRequest, RequestType, Urgency } from '@/lib/quick-approve-api';
import { cn } from '@/lib/utils';

// ── Constants ────────────────────────────────────────────────────────────────

const TYPE_LABELS_TH: Record<RequestType | 'all', string> = {
  all: 'ทั้งหมด',
  leave: 'ลา',
  overtime: 'โอที',
  claim: 'เบิก',
  transfer: 'ย้าย',
  change_request: 'เปลี่ยนข้อมูล',
  probation: 'ทดลองงาน',
};

const TYPE_LABELS_EN: Record<RequestType | 'all', string> = {
  all: 'All',
  leave: 'Leave',
  overtime: 'Overtime',
  claim: 'Claim',
  transfer: 'Transfer',
  change_request: 'Change',
  probation: 'Probation',
};

const URGENCY_LABELS_TH: Record<Urgency | 'all', string> = {
  all: 'ทุกระดับ',
  urgent: 'เร่งด่วน',
  normal: 'ปกติ',
  low: 'ต่ำ',
};

const URGENCY_LABELS_EN: Record<Urgency | 'all', string> = {
  all: 'All',
  urgent: 'Urgent',
  normal: 'Normal',
  low: 'Low',
};

const SCOPE_ICON = {
  self: <Users className="h-3.5 w-3.5" />,
  team: <Users className="h-3.5 w-3.5" />,
  company: <Building2 className="h-3.5 w-3.5" />,
  enterprise: <Globe className="h-3.5 w-3.5" />,
};

const SCOPE_LABEL_TH = {
  self: 'ของตัวเอง',
  team: 'ทีม',
  company: 'บริษัท',
  enterprise: 'ทั้งหมด',
};

const SCOPE_LABEL_EN = {
  self: 'Self',
  team: 'Team',
  company: 'Company',
  enterprise: 'Enterprise',
};

const ROLE_LABEL_TH: Record<string, string> = {
  manager: 'หัวหน้าทีม',
  spd: 'SPD',
  hrbp: 'HRBP',
  hr_admin: 'HR Admin',
  hr_manager: 'HRIS Admin',
  employee: 'พนักงาน',
};

const ROLE_LABEL_EN: Record<string, string> = {
  manager: 'Manager',
  spd: 'SPD',
  hrbp: 'HRBP',
  hr_admin: 'HR Admin',
  hr_manager: 'HRIS Admin',
  employee: 'Employee',
};

// ── Types ────────────────────────────────────────────────────────────────────

type FilterState = {
  type: RequestType | 'all';
  urgency: Urgency | 'all';
  search: string;
  dateFrom: string;
  dateTo: string;
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] ?? '') + (parts[1][0] ?? '');
  return name.slice(0, 2);
}

const AVATAR_TONES = ['humi-avatar humi-avatar--teal', 'humi-avatar humi-avatar--sage', 'humi-avatar humi-avatar--butter', 'humi-avatar humi-avatar--ink'] as const;

function pickTone(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return AVATAR_TONES[Math.abs(h) % AVATAR_TONES.length];
}

// Probation cases live in their own mock store (PR #135) — adapt the pending
// ones into PendingRequest shape so they interleave with the other workflow
// approvals. Drill-in is special-cased to /workflows/probation/<id>.
function probationToPendingRequest(c: ProbationCase): PendingRequest {
  const slaMs = new Date(c.slaDeadline).getTime() - Date.now();
  const slaHours = slaMs / (1000 * 60 * 60);
  const urgency: Urgency = slaHours < 12 ? 'urgent' : slaHours < 48 ? 'normal' : 'low';
  const waitingDays = Math.max(
    0,
    Math.floor((Date.now() - new Date(c.submittedAt ?? c.hireDate).getTime()) / 86400000),
  );
  const managerStatus =
    c.status === 'pending_manager' ? 'pending'
    : c.status === 'pending_hr' || c.status === 'escalated_ceo' || c.status === 'approved' ? 'approved'
    : 'pending';
  const hrStatus =
    c.status === 'pending_hr' || c.status === 'escalated_ceo' ? 'pending'
    : c.status === 'approved' ? 'approved'
    : 'pending';
  return {
    id: c.id,
    type: 'probation',
    requester: {
      id: c.employeeId,
      name: c.fullNameTh,
      position: c.position,
      department: c.department,
    },
    description: `อนุมัติผลทดลองงาน — ${c.fullNameTh}`,
    submittedAt: c.submittedAt ?? c.hireDate,
    urgency,
    waitingDays,
    details: {},
    approvalTimeline: [
      { step: 1, approver: 'หัวหน้างาน', status: managerStatus },
      { step: 2, approver: 'HR Director', status: hrStatus },
    ],
  };
}

function isProbationPending(c: ProbationCase): boolean {
  return (
    c.status === 'pending_manager' ||
    c.status === 'pending_hr' ||
    c.status === 'escalated_ceo'
  );
}

function applyFilters(items: PendingRequest[], filters: FilterState): PendingRequest[] {
  return items.filter((item) => {
    if (filters.type !== 'all' && item.type !== filters.type) return false;
    if (filters.urgency !== 'all' && item.urgency !== filters.urgency) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !item.requester.name.toLowerCase().includes(q) &&
        !item.description.toLowerCase().includes(q) &&
        !item.requester.department.toLowerCase().includes(q)
      )
        return false;
    }
    if (filters.dateFrom && item.submittedAt < filters.dateFrom) return false;
    if (filters.dateTo && item.submittedAt > filters.dateTo + 'T23:59:59') return false;
    return true;
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function DelegationBanner({ originalUser }: { originalUser: { username: string } | null }) {
  if (!originalUser) return null;
  return (
    <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-warning bg-warning-tint px-4 py-2 text-sm text-warning">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>
        กำลังทำงานแทน <strong>{originalUser.username}</strong>
        {' · '}Acting on behalf of <strong>{originalUser.username}</strong>
      </span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function QuickApprovePage() {
  const t = useTranslations('quickApprove');
  const locale = useLocale();
  const isTh = locale !== 'en';

  const typeLabels = isTh ? TYPE_LABELS_TH : TYPE_LABELS_EN;
  const urgencyLabels = isTh ? URGENCY_LABELS_TH : URGENCY_LABELS_EN;
  const scopeLabel = isTh ? SCOPE_LABEL_TH : SCOPE_LABEL_EN;
  const roleLabel = isTh ? ROLE_LABEL_TH : ROLE_LABEL_EN;

  // Auth + RBAC
  const username = useAuthStore((s) => s.username);
  const roles = useAuthStore((s) => s.roles);
  const originalUser = useAuthStore((s) => s.originalUser);
  const caps = useCapabilities();
  const primaryRole = roles[0] ?? 'employee';

  // Hook — API with mock fallback; we always merge in MOCK_PENDING_REQUESTS for demo
  const {
    loading,
    delegations,
    createDelegation,
    revokeDelegation,
  } = useQuickApprove();

  // Probation cases (PR #135) — interleave pending ones into the unified list.
  const { cases: probationCases } = useProbationCases();
  const probationItems = useMemo(
    () => probationCases.filter(isProbationPending).map(probationToPendingRequest),
    [probationCases],
  );

  // Use mock data directly for the demo workspace; merge in probation.
  const allItems = useMemo(
    () => [...MOCK_PENDING_REQUESTS, ...probationItems],
    [probationItems],
  );

  // Local filter state
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    urgency: 'all',
    search: '',
    dateFrom: '',
    dateTo: '',
  });

  const filteredItems = useMemo(() => applyFilters(allItems, filters), [allItems, filters]);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 50) next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === filteredItems.length && filteredItems.length > 0) return new Set();
      return new Set(filteredItems.slice(0, 50).map((i) => i.id));
    });
  }, [filteredItems]);

  const handleClearSelection = useCallback(() => setSelectedIds(new Set()), []);

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState<{ action: 'approve' | 'reject' | 'reroute'; ids: string[] } | null>(null);
  const [confirmReason, setConfirmReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const handleBulkAction = useCallback((action: 'approve' | 'reject' | 'reroute') => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    setConfirmModal({ action, ids });
    setConfirmReason('');
  }, [selectedIds]);

  const handleConfirm = useCallback(async () => {
    if (!confirmModal) return;
    if (confirmModal.action === 'reject' && !confirmReason.trim()) return;
    setActionLoading(true);
    // Mock action — remove items from view
    await new Promise((r) => setTimeout(r, 400));
    setActionLoading(false);
    setConfirmModal(null);
    setSelectedIds(new Set());
  }, [confirmModal, confirmReason]);

  // Delegation modal
  const [delegationOpen, setDelegationOpen] = useState(false);

  // Stats
  const stats = useMemo(() => ({
    total: allItems.length,
    urgent: allItems.filter((i) => i.urgency === 'urgent').length,
    leave: allItems.filter((i) => i.type === 'leave').length,
    overtime: allItems.filter((i) => i.type === 'overtime').length,
    claim: allItems.filter((i) => i.type === 'claim').length,
    transfer: allItems.filter((i) => i.type === 'transfer').length,
    change_request: allItems.filter((i) => i.type === 'change_request').length,
    probation: allItems.filter((i) => i.type === 'probation').length,
  }), [allItems]);

  // DataTable columns
  const columns: DataTableColumn<PendingRequest>[] = useMemo(() => [
    {
      id: 'select',
      header: (
        <input
          type="checkbox"
          checked={selectedIds.size === filteredItems.length && filteredItems.length > 0}
          onChange={handleSelectAll}
          className="h-4 w-4 rounded border-hairline text-brand focus:ring-brand"
          aria-label={t('filters.selectAll')}
        />
      ),
      headerVisuallyHidden: false,
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.has(row.id)}
          onChange={(e) => { e.stopPropagation(); handleToggleSelect(row.id); }}
          onClick={(e) => e.stopPropagation()}
          className="h-4 w-4 rounded border-hairline text-brand focus:ring-brand"
          aria-label={`${isTh ? 'เลือก' : 'Select'} ${row.requester.name}`}
        />
      ),
      className: 'w-10',
    },
    {
      id: 'type',
      header: t('table.type'),
      cell: (row) => (
        <Badge variant="info" className="font-medium">
          {typeLabels[row.type] ?? row.type}
        </Badge>
      ),
      className: 'w-28',
    },
    {
      id: 'requester',
      header: t('table.requester'),
      cell: (row) => (
        <div className="flex items-center gap-2.5">
          <span className={pickTone(row.id)} aria-hidden style={{ width: 32, height: 32, fontSize: 11 }}>
            {deriveInitials(row.requester.name)}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink truncate">{row.requester.name}</p>
            <p className="text-xs text-ink-muted truncate">{row.requester.department}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'description',
      header: t('table.description'),
      cell: (row) => (
        <span className="text-sm text-ink-muted line-clamp-1">{row.description}</span>
      ),
    },
    {
      id: 'waiting',
      header: isTh ? 'รอ (วัน)' : 'Waiting',
      cell: (row) => (
        <span className={cn(
          'text-sm font-medium tabular-nums',
          row.waitingDays >= 7 ? 'text-danger' : row.waitingDays >= 3 ? 'text-warning' : 'text-ink-muted'
        )}>
          {row.waitingDays}
        </span>
      ),
      sortAccessor: (row) => row.waitingDays,
      className: 'w-20',
      align: 'right',
    },
    {
      id: 'chain',
      header: isTh ? 'ขั้นตอน' : 'Chain',
      cell: (row) => (
        <ApprovalTimelineChain
          steps={row.approvalTimeline}
          activeStep={row.approvalTimeline.findIndex((s) => s.status === 'pending')}
          size="sm"
        />
      ),
    },
    {
      id: 'urgency',
      header: t('table.urgency'),
      cell: (row) => <UrgencyBadge urgency={row.urgency} label={urgencyLabels[row.urgency]} />,
      className: 'w-24',
    },
    {
      id: 'action',
      header: '',
      headerVisuallyHidden: true,
      cell: (row) => {
        // Probation drill-in lives on the standalone PR #135 detail page; all
        // other types stay on the unified /quick-approve/<id> route.
        const href =
          row.type === 'probation'
            ? `/${locale}/workflows/probation/${row.id}`
            : `/quick-approve/${row.id}`;
        return (
          <Link
            href={href}
            className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-1 text-xs font-medium text-brand hover:bg-accent-soft transition"
            onClick={(e) => e.stopPropagation()}
          >
            {isTh ? 'ดู' : 'View'}
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        );
      },
      className: 'w-16',
      align: 'right',
    },
  ], [selectedIds, filteredItems, handleSelectAll, handleToggleSelect, t, typeLabels, urgencyLabels, isTh, locale]);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-24 w-full rounded-[var(--radius-md)]" />
        <Skeleton className="h-12 w-full rounded-[var(--radius-md)]" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-[var(--radius-sm)]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* ── Delegation banner (proxy mode) ── */}
      <DelegationBanner originalUser={originalUser} />

      {/* ── Header card ── */}
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-[22px] font-semibold text-ink leading-tight">
                {isTh ? 'กล่องอนุมัติ' : 'Approval Workspace'}
              </h1>
              {/* Queue scope label */}
              <span
                className="inline-flex items-center gap-1 rounded-[var(--radius-full)] bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                data-testid="queue-scope-badge"
              >
                {SCOPE_ICON[caps.queueScope]}
                {scopeLabel[caps.queueScope]}
              </span>
            </div>
            {/* Persona chip */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-ink-muted">{username ?? '—'}</span>
              <span className="inline-flex items-center rounded-[var(--radius-sm)] bg-surface-raised px-2 py-0.5 text-xs font-medium text-ink-soft">
                {roleLabel[primaryRole] ?? primaryRole}
              </span>
            </div>
          </div>

          {/* Stats row + delegation button */}
          <div className="flex items-center gap-3 flex-wrap">
            {stats.urgent > 0 && (
              <span className="inline-flex items-center gap-1 rounded-[var(--radius-full)] bg-danger-tint px-3 py-1 text-xs font-medium text-danger">
                <AlertCircle className="h-3.5 w-3.5" />
                {isTh ? `เร่งด่วน ${stats.urgent}` : `Urgent ${stats.urgent}`}
              </span>
            )}
            <span className="inline-flex items-center rounded-[var(--radius-full)] bg-surface-raised px-3 py-1 text-xs font-medium text-ink-muted">
              {isTh ? `${stats.total} รายการ` : `${stats.total} items`}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDelegationOpen(true)}
            >
              <Settings2 className="h-4 w-4 mr-1.5" />
              {t('delegation.button')}
            </Button>
          </div>
        </div>
      </Card>

      {/* ── Filter strip ── */}
      <Card>
        <div className="space-y-3">
          {/* Row 1: search + dates */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                placeholder={t('filters.searchPlaceholder')}
                className="w-full rounded-[var(--radius-md)] border border-hairline pl-9 pr-3 py-2 text-sm bg-surface focus:border-brand focus:ring-1 focus:ring-brand outline-none"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Calendar className="h-4 w-4 text-ink-muted" />
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters((f) => ({ ...f, dateFrom: e.target.value }))}
                className="rounded-[var(--radius-md)] border border-hairline px-2 py-1.5 text-sm bg-surface focus:border-brand outline-none"
                aria-label={t('filters.dateFrom')}
              />
              <span className="text-ink-muted text-xs">–</span>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters((f) => ({ ...f, dateTo: e.target.value }))}
                className="rounded-[var(--radius-md)] border border-hairline px-2 py-1.5 text-sm bg-surface focus:border-brand outline-none"
                aria-label={t('filters.dateTo')}
              />
            </div>
          </div>

          {/* Row 2: type chips + urgency chips */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-ink-muted shrink-0" />

            {/* Type filter chips */}
            {(['all', 'leave', 'overtime', 'transfer', 'change_request', 'probation'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilters((f) => ({ ...f, type }))}
                className={cn(
                  'rounded-[var(--radius-full)] px-3 py-1 text-xs font-medium transition',
                  filters.type === type
                    ? 'bg-brand/10 text-brand'
                    : 'bg-surface-raised text-ink-muted hover:bg-surface-raised',
                )}
              >
                {typeLabels[type]}
                {type !== 'all' && stats[type] > 0 && (
                  <span className="ml-1 opacity-60">{stats[type]}</span>
                )}
              </button>
            ))}

            {/* Benefits (claim) filter — RBAC-gated: only SPD/HRBP/HR Admin can see BenefitEmployeeClaim */}
            <Capability entity="BenefitEmployeeClaim">
              <button
                onClick={() => setFilters((f) => ({ ...f, type: filters.type === 'claim' ? 'all' : 'claim' }))}
                className={cn(
                  'rounded-[var(--radius-full)] px-3 py-1 text-xs font-medium transition',
                  filters.type === 'claim'
                    ? 'bg-brand/10 text-brand'
                    : 'bg-surface-raised text-ink-muted hover:bg-surface-raised',
                )}
                data-testid="benefits-filter-chip"
              >
                {isTh ? 'สวัสดิการ' : 'Benefits'}
                {stats.claim > 0 && <span className="ml-1 opacity-60">{stats.claim}</span>}
              </button>
            </Capability>

            <div className="h-4 w-px bg-hairline mx-1" />

            {/* Urgency filter chips */}
            {(['all', 'urgent', 'normal', 'low'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setFilters((f) => ({ ...f, urgency: level }))}
                className={cn(
                  'rounded-[var(--radius-full)] px-3 py-1 text-xs font-medium transition',
                  filters.urgency === level
                    ? level === 'urgent'
                      ? 'bg-danger/10 text-danger'
                      : level === 'low'
                      ? 'bg-success/10 text-success'
                      : 'bg-brand/10 text-brand'
                    : 'bg-surface-raised text-ink-muted hover:bg-surface-raised',
                )}
              >
                {urgencyLabels[level]}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* ── Bulk-action bar — gated by bulkApprove capability ── */}
      <Capability action="bulkApprove">
        {selectedIds.size > 0 && (
          <div
            className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-hairline p-3 bg-surface"
            data-testid="bulk-action-bar"
          >
            <span className="text-sm font-medium text-ink">
              {isTh ? `เลือก ${selectedIds.size} รายการ` : `${selectedIds.size} selected`}
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-success hover:bg-success/90"
                onClick={() => handleBulkAction('approve')}
              >
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                {isTh ? `อนุมัติ ${selectedIds.size}` : `Approve ${selectedIds.size}`}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleBulkAction('reroute')}
              >
                {isTh ? `โอนสาย ${selectedIds.size}` : `Reroute ${selectedIds.size}`}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleBulkAction('reject')}
              >
                <XCircle className="h-4 w-4 mr-1.5" />
                {isTh ? `ปฏิเสธ ${selectedIds.size}` : `Reject ${selectedIds.size}`}
              </Button>
              <button
                onClick={handleClearSelection}
                className="text-sm text-ink-muted hover:text-ink-soft flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5" />
                {t('bulkBar.clearSelection')}
              </button>
            </div>
          </div>
        )}
      </Capability>

      {/* ── Inbox table ── */}
      <Card header={
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            {isTh ? `คำขอรออนุมัติ (${filteredItems.length})` : `Pending Requests (${filteredItems.length})`}
          </CardTitle>
          {filteredItems.length !== allItems.length && (
            <button
              onClick={() => setFilters({ type: 'all', urgency: 'all', search: '', dateFrom: '', dateTo: '' })}
              className="text-xs text-brand hover:underline"
            >
              {isTh ? 'ล้างตัวกรอง' : 'Clear filters'}
            </button>
          )}
        </div>
      }>
        <DataTable
          caption={isTh ? 'รายการคำขออนุมัติ' : 'Pending approval requests'}
          captionVisuallyHidden
          columns={columns}
          rows={filteredItems}
          rowKey={(row) => row.id}
          dense
          emptyState={
            <div className="py-16 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-success-tint mx-auto" />
              <p className="text-sm font-medium text-ink">
                {isTh ? 'ไม่มีคำขอรออนุมัติ' : 'No pending requests'}
              </p>
              <p className="text-xs text-ink-muted">
                {isTh
                  ? 'คุณจัดการทุกคำขอแล้ว หรือยังไม่มีรายการใหม่เข้ามา'
                  : 'All requests have been processed or none have been submitted yet.'}
              </p>
            </div>
          }
        />
      </Card>

      {/* ── Confirmation modal ── */}
      <Modal
        open={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        title={
          confirmModal?.action === 'approve'
            ? (isTh ? 'ยืนยันการอนุมัติ' : 'Confirm Approval')
            : confirmModal?.action === 'reroute'
            ? (isTh ? 'ยืนยันการโอนสาย' : 'Confirm Reroute')
            : (isTh ? 'ยืนยันการปฏิเสธ' : 'Confirm Rejection')
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            {confirmModal?.action === 'approve'
              ? t('confirm.approveMessage', { count: confirmModal?.ids.length ?? 0 })
              : t('confirm.rejectMessage', { count: confirmModal?.ids.length ?? 0 })}
          </p>
          <div>
            <label className="block text-sm font-medium text-ink-soft mb-1">
              {confirmModal?.action === 'approve' ? t('confirm.reasonOptional') : t('confirm.reasonRequired')}
            </label>
            <textarea
              value={confirmReason}
              onChange={(e) => setConfirmReason(e.target.value)}
              rows={3}
              className="w-full rounded-[var(--radius-md)] border border-hairline px-3 py-2 text-sm bg-surface focus:border-brand focus:ring-1 focus:ring-brand outline-none resize-none"
              placeholder={t('confirm.reasonPlaceholder')}
            />
          </div>
        </div>
        <div className="border-t pt-4 mt-4 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirmModal(null)}>
            {t('confirm.cancel')}
          </Button>
          <Button
            variant={confirmModal?.action === 'reject' ? 'danger' : 'primary'}
            className={confirmModal?.action === 'approve' ? 'bg-success hover:bg-success/90' : ''}
            onClick={handleConfirm}
            disabled={actionLoading || (confirmModal?.action === 'reject' && !confirmReason.trim())}
          >
            {actionLoading
              ? t('confirm.processing')
              : confirmModal?.action === 'approve'
              ? `${isTh ? 'อนุมัติ' : 'Approve'} (${confirmModal?.ids.length})`
              : confirmModal?.action === 'reroute'
              ? `${isTh ? 'โอนสาย' : 'Reroute'} (${confirmModal?.ids.length})`
              : `${isTh ? 'ปฏิเสธ' : 'Reject'} (${confirmModal?.ids.length})`}
          </Button>
        </div>
      </Modal>

      {/* ── Delegation modal ── */}
      <DelegationModal
        open={delegationOpen}
        onClose={() => setDelegationOpen(false)}
        delegations={delegations}
        onCreateDelegation={createDelegation}
        onRevokeDelegation={revokeDelegation}
      />
    </div>
  );
}
