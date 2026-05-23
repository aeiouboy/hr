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
 *   4. Inbox table — DataTable with select-checkbox, type, requester,
 *      description, Assign to Me, attachment indicator, → link to /quick-approve/{id}.
 *      STA-78 user reference explicitly removes waiting-days, approval-chain,
 *      and urgency columns from the list view.
 *   6. Delegation banner — proxy mode via originalUser
 *   7. Empty state
 */

import { useState, useMemo, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  Users,
  Building2,
  Globe,
  AlertCircle,
  Settings2,
  Paperclip,
  UserCheck,
  UserPlus,
} from 'lucide-react';
import { Card, CardTitle, Button, DataTable, Modal } from '@/components/humi';
import type { DataTableColumn } from '@/components/humi';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DelegationModal } from '@/components/quick-approve/DelegationModal';
import { useAuthStore } from '@/stores/auth-store';
import { useCapabilities } from '@/hooks/use-capabilities';
import { useQuickApprove } from '@/hooks/use-quick-approve';
import { MOCK_PENDING_REQUESTS } from '@/components/quick-approve/mock-requests';
import { useProbationCases, type ProbationCase } from '@/hooks/use-probation';
import { useBenefitClaimsStore, type BenefitClaimRequest } from '@/stores/benefit-claims';
import type { PendingRequest, RequestType, Urgency } from '@/lib/quick-approve-api';
import { cn } from '@/lib/utils';
// STA-28 PR-B v2 — Smart Tabs + Bulk Toolbar
import { SmartTabs, type ActiveTab } from '@/components/manager/quick-approve/SmartTabs';
import { BulkActionToolbar } from '@/components/manager/quick-approve/BulkActionToolbar';
import {
  computeTabCounts,
  getPersonaGroup,
  isActionRequired,
  isWatching,
  isHistory,
} from '@/components/manager/quick-approve/predicates';
import { usePersonaDefault } from '@/hooks/usePersonaDefault';
// STA-27 PR-A — transparency banner for HRBP/SPD persona scope limitation
import { HrbpScopeBanner } from '@/components/manager/quick-approve/HrbpScopeBanner';

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
  eventReason: string;
  requestedFor: string;
  effectiveDateFrom: string;
  effectiveDateTo: string;
  initiatedBy: string;
  dateFrom: string;
  dateTo: string;
  company: string;
  location: string;
  costCentre: string;
  businessUnit: string;
  division: string;
  department: string;
  assignment: string;
};

type SelectFilterKey =
  | 'eventReason'
  | 'requestedFor'
  | 'initiatedBy'
  | 'company'
  | 'location'
  | 'costCentre'
  | 'businessUnit'
  | 'division'
  | 'department'
  | 'assignment';

type RequestFilterMeta = Required<NonNullable<PendingRequest['filterMeta']>>;

const EMPTY_FILTERS: FilterState = {
  type: 'all',
  urgency: 'all',
  search: '',
  eventReason: '',
  requestedFor: '',
  effectiveDateFrom: '',
  effectiveDateTo: '',
  initiatedBy: '',
  dateFrom: '',
  dateTo: '',
  company: '',
  location: '',
  costCentre: '',
  businessUnit: '',
  division: '',
  department: '',
  assignment: '',
};

const ADVANCED_SELECT_FIELDS: Array<{ key: SelectFilterKey; labelTh: string; labelEn: string }> = [
  { key: 'eventReason', labelTh: 'เหตุผลเหตุการณ์', labelEn: 'Event Reason' },
  { key: 'requestedFor', labelTh: 'ผู้ถูกขอให้ดำเนินการ', labelEn: 'Requested For' },
  { key: 'initiatedBy', labelTh: 'ผู้เริ่มคำขอ', labelEn: 'Initiated By' },
  { key: 'company', labelTh: 'บริษัท', labelEn: 'Company' },
  { key: 'location', labelTh: 'สถานที่ทำงาน', labelEn: 'Location' },
  { key: 'costCentre', labelTh: 'Cost Centre', labelEn: 'Cost Centre' },
  { key: 'businessUnit', labelTh: 'Business Unit', labelEn: 'Business Unit' },
  { key: 'division', labelTh: 'Division', labelEn: 'Division' },
  { key: 'department', labelTh: 'Department', labelEn: 'Department' },
  { key: 'assignment', labelTh: 'Assignment', labelEn: 'Assignment' },
];

const DEPARTMENT_FILTER_META: Record<string, Pick<RequestFilterMeta, 'company' | 'location' | 'costCentre' | 'businessUnit' | 'division'>> = {
  IT: {
    company: 'Central Retail',
    location: 'Head Office Rama 9',
    costCentre: 'IT-110',
    businessUnit: 'Corporate Services',
    division: 'Digital & Technology',
  },
  Product: {
    company: 'Central Retail',
    location: 'Head Office Rama 9',
    costCentre: 'PD-210',
    businessUnit: 'Digital Commerce',
    division: 'Product',
  },
  HR: {
    company: 'Central Retail',
    location: 'Head Office Rama 9',
    costCentre: 'HR-310',
    businessUnit: 'People',
    division: 'Human Resources',
  },
  Finance: {
    company: 'Central Retail',
    location: 'Central Chidlom',
    costCentre: 'FN-410',
    businessUnit: 'Finance',
    division: 'Accounting & Control',
  },
  Operations: {
    company: 'Central Retail',
    location: 'Distribution Center Bangna',
    costCentre: 'OP-510',
    businessUnit: 'Operations',
    division: 'Store Operations',
  },
  Marketing: {
    company: 'Central Retail',
    location: 'Head Office Rama 9',
    costCentre: 'MK-610',
    businessUnit: 'Commercial',
    division: 'Marketing',
  },
  Sales: {
    company: 'Central Retail',
    location: 'Central Ladprao',
    costCentre: 'SL-710',
    businessUnit: 'Retail',
    division: 'Sales',
  },
  Analytics: {
    company: 'Central Retail',
    location: 'Head Office Rama 9',
    costCentre: 'AN-810',
    businessUnit: 'Digital Commerce',
    division: 'Data & Analytics',
  },
  Legal: {
    company: 'Central Retail',
    location: 'Head Office Rama 9',
    costCentre: 'LG-910',
    businessUnit: 'Corporate Services',
    division: 'Legal',
  },
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function getDetailString(row: PendingRequest, key: string): string | undefined {
  if (!isRecord(row.details)) return undefined;
  return asString(row.details[key]);
}

function getEffectiveDate(row: PendingRequest): string {
  return (
    row.filterMeta?.effectiveDate ??
    getDetailString(row, 'effectiveDate') ??
    getDetailString(row, 'startDate') ??
    getDetailString(row, 'date') ??
    row.submittedAt.slice(0, 10)
  );
}

function getEventReason(row: PendingRequest): string {
  if (row.filterMeta?.eventReason) return row.filterMeta.eventReason;
  return (
    getDetailString(row, 'leaveType') ??
    getDetailString(row, 'category') ??
    getDetailString(row, 'changeType') ??
    getDetailString(row, 'reason') ??
    row.type
  );
}

function getPendingApprover(row: PendingRequest): string {
  return row.approvalTimeline.find((step) => step.status === 'pending')?.approver ?? 'Unassigned';
}

function getRequestFilterMeta(row: PendingRequest): RequestFilterMeta {
  const dept = row.requester.department || row.filterMeta?.department || 'Unassigned';
  const derived = DEPARTMENT_FILTER_META[dept] ?? {
    company: 'Central Retail',
    location: 'Head Office Rama 9',
    costCentre: 'GEN-000',
    businessUnit: dept,
    division: dept,
  };
  const assignment = row.filterMeta?.assignment ?? row.assignedApprover?.name ?? getPendingApprover(row);

  return {
    eventReason: getEventReason(row),
    requestedFor: row.filterMeta?.requestedFor ?? row.requester.name,
    effectiveDate: getEffectiveDate(row),
    initiatedBy: row.filterMeta?.initiatedBy ?? row.requester.name,
    initiatedDate: row.filterMeta?.initiatedDate ?? row.submittedAt.slice(0, 10),
    company: row.filterMeta?.company ?? derived.company,
    location: row.filterMeta?.location ?? derived.location,
    costCentre: row.filterMeta?.costCentre ?? derived.costCentre,
    businessUnit: row.filterMeta?.businessUnit ?? derived.businessUnit,
    division: row.filterMeta?.division ?? derived.division,
    department: row.filterMeta?.department ?? dept,
    assignment,
  };
}

function getAttachmentNames(row: PendingRequest): string[] {
  if (row.attachments?.length) return row.attachments;
  const receiptUrl = getDetailString(row, 'receiptUrl');
  return receiptUrl ? [receiptUrl] : [];
}

function isWithinRange(date: string, from: string, to: string): boolean {
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
}

function uniqueOptions(items: PendingRequest[], key: SelectFilterKey): string[] {
  return Array.from(new Set(items.map((item) => getRequestFilterMeta(item)[key]).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );
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

// STA-28 PR-A — read-side bridge: surface pending_manager_approval benefit claims
// alongside legacy PendingRequest items. No store mutation, no schema change.
function benefitClaimToPendingRequest(c: BenefitClaimRequest): PendingRequest {
  const slaMs = 72 * 60 * 60 * 1000; // 72-hour SLA for manager approval
  const elapsedMs = Date.now() - new Date(c.submittedAt).getTime();
  const slaHours = elapsedMs / (1000 * 60 * 60);
  const urgency: Urgency = slaHours > 48 ? 'urgent' : slaHours > 24 ? 'normal' : 'low';
  const waitingDays = Math.max(0, Math.floor(elapsedMs / 86400000));
  return {
    id: c.id,
    type: 'claim',
    requester: {
      id: c.employeeId,
      name: c.employeeName,
      position: c.benefitName,
      department: c.businessUnit,
    },
    description: `เบิกสวัสดิการ ${c.benefitName} — ฿${c.totalClaimAmount.toLocaleString('th-TH')}`,
    submittedAt: c.submittedAt,
    urgency,
    waitingDays,
    attachments: c.attachments.map((file) => file.filename ?? file.name ?? 'attachment'),
    filterMeta: {
      eventReason: c.benefitType,
      requestedFor: c.employeeName,
      effectiveDate: c.receiptDate,
      initiatedBy: c.employeeName,
      initiatedDate: c.submittedAt.slice(0, 10),
      company: c.company,
      businessUnit: c.businessUnit,
      department: c.businessUnit,
      assignment: 'Manager approval',
    },
    details: {},
    approvalTimeline: [
      { step: 1, approver: 'หัวหน้างาน', status: 'pending' },
      { step: 2, approver: 'SPD Benefits', status: 'pending' },
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
    const meta = getRequestFilterMeta(item);
    if (filters.type !== 'all' && item.type !== filters.type) return false;
    if (filters.urgency !== 'all' && item.urgency !== filters.urgency) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = [
        item.requester.name,
        item.requester.department,
        item.description,
        ...Object.values(meta),
      ].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (filters.eventReason && meta.eventReason !== filters.eventReason) return false;
    if (filters.requestedFor && meta.requestedFor !== filters.requestedFor) return false;
    if (!isWithinRange(meta.effectiveDate, filters.effectiveDateFrom, filters.effectiveDateTo)) return false;
    if (filters.initiatedBy && meta.initiatedBy !== filters.initiatedBy) return false;
    if (!isWithinRange(meta.initiatedDate, filters.dateFrom, filters.dateTo)) return false;
    if (filters.company && meta.company !== filters.company) return false;
    if (filters.location && meta.location !== filters.location) return false;
    if (filters.costCentre && meta.costCentre !== filters.costCentre) return false;
    if (filters.businessUnit && meta.businessUnit !== filters.businessUnit) return false;
    if (filters.division && meta.division !== filters.division) return false;
    if (filters.department && meta.department !== filters.department) return false;
    if (filters.assignment && meta.assignment !== filters.assignment) return false;
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
  const userId = useAuthStore((s) => s.userId);
  const roles = useAuthStore((s) => s.roles);
  const originalUser = useAuthStore((s) => s.originalUser);
  const caps = useCapabilities();
  const canSeeBenefitClaims = caps.canSee('BenefitEmployeeClaim');
  const primaryRole = roles[0] ?? 'employee';

  // STA-28 PR-B v2 — Smart Tabs: persona-aware default tab (AC-1)
  // "Show Only Mine" toggle UI deferred to PR-B v3; state seeded here so default is correct.
  const { defaultTab, mineToggleDefault: _mineToggleDefault } = usePersonaDefault();
  const [activeTab, setActiveTab] = useState<ActiveTab>(defaultTab);
  const currentUserId = userId ?? '';
  const personaGroup = getPersonaGroup(primaryRole as Parameters<typeof getPersonaGroup>[0]);
  // HR personas get an "All" tab; others get Action/Watching/History
  const showAllTab = primaryRole === 'hr_admin' || primaryRole === 'hr_manager';

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

  // STA-28 PR-A — benefit claims pending manager approval (read-side bridge only)
  const benefitClaims = useBenefitClaimsStore((s) => s.claims);
  const benefitClaimItems = useMemo(
    () =>
      canSeeBenefitClaims
        ? benefitClaims
            .filter((c) => c.status === 'pending_manager_approval')
            .map(benefitClaimToPendingRequest)
        : [],
    [benefitClaims, canSeeBenefitClaims],
  );

  const [assignmentOverrides, setAssignmentOverrides] = useState<Record<string, NonNullable<PendingRequest['assignedApprover']>>>({});

  // Use mock data directly for the demo workspace; merge in probation + benefit claims.
  const allItems = useMemo(
    () =>
      [...MOCK_PENDING_REQUESTS, ...probationItems, ...benefitClaimItems]
        .filter((item) => item.type !== 'claim' || canSeeBenefitClaims)
        .map((item) => {
        const assignedApprover = assignmentOverrides[item.id] ?? item.assignedApprover;
        return assignedApprover ? { ...item, assignedApprover } : item;
      }),
    [assignmentOverrides, probationItems, benefitClaimItems, canSeeBenefitClaims],
  );

  // STA-28 PR-B v2 — SINGLE useMemo keyed on (currentUserId, personaGroup, allItems) (AC-3).
  // Computes all tab counts in one sweep; do NOT add separate per-tab memo calls.
  const tabCounts = useMemo(
    () => computeTabCounts(allItems as (PendingRequest & Record<string, unknown>)[], personaGroup, currentUserId),
    [allItems, personaGroup, currentUserId],
  );

  // Local filter state
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  // Apply Smart Tab filter first, then chip-strip filters (AC-4, AC-9)
  const tabFilteredItems = useMemo(() => {
    if (activeTab === 'all') return allItems;
    const cast = allItems as (PendingRequest & Record<string, unknown>)[];
    if (activeTab === 'action') return cast.filter((row) => isActionRequired(row, personaGroup, currentUserId));
    if (activeTab === 'watching') return cast.filter((row) => isWatching(row, personaGroup, currentUserId));
    if (activeTab === 'history') return cast.filter((row) => isHistory(row, personaGroup, currentUserId));
    return allItems;
  }, [allItems, activeTab, personaGroup, currentUserId]);

  const filteredItems = useMemo(() => applyFilters(tabFilteredItems, filters), [tabFilteredItems, filters]);

  const visibleRequestTypes = useMemo(
    () =>
      (canSeeBenefitClaims
        ? ['all', 'leave', 'overtime', 'claim', 'transfer', 'change_request', 'probation']
        : ['all', 'leave', 'overtime', 'transfer', 'change_request', 'probation']) as Array<RequestType | 'all'>,
    [canSeeBenefitClaims],
  );

  const selectFilterOptions = useMemo(() => {
    return ADVANCED_SELECT_FIELDS.reduce(
      (acc, field) => {
        acc[field.key] = uniqueOptions(tabFilteredItems, field.key);
        return acc;
      },
      {} as Record<SelectFilterKey, string[]>,
    );
  }, [tabFilteredItems]);

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'type') return value !== 'all';
      if (key === 'urgency') return value !== 'all';
      return value !== '';
    });
  }, [filters]);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const updateFilters = useCallback((updater: (current: FilterState) => FilterState) => {
    setFilters((current) => updater(current));
    setSelectedIds(new Set());
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setSelectedIds(new Set());
  }, []);

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

  const handleAssignToMe = useCallback((row: PendingRequest) => {
    if (!currentUserId || row.assignedApprover) return;
    setAssignmentOverrides((prev) => ({
      ...prev,
      [row.id]: {
        id: currentUserId,
        name: username ?? (isTh ? 'ผู้อนุมัติปัจจุบัน' : 'Current approver'),
        assignedAt: new Date().toISOString(),
      },
    }));
  }, [currentUserId, isTh, username]);

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

  // STA-28 PR-B v2 — selected row types for high-risk gating in BulkActionToolbar (AC-6)
  const selectedTypes = useMemo(() => {
    return allItems
      .filter((item) => selectedIds.has(item.id))
      .map((item) => item.type);
  }, [allItems, selectedIds]);

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
      id: 'assignToMe',
      header: isTh ? 'Assign to Me' : 'Assign to Me',
      cell: (row) => {
        const assigned = row.assignedApprover;
        const assignedToCurrentUser = Boolean(assigned && assigned.id === currentUserId);
        const assignedToOther = Boolean(assigned && assigned.id !== currentUserId);
        const disabled = !currentUserId || assignedToCurrentUser || assignedToOther;
        const label = assignedToCurrentUser
          ? (isTh ? 'รับแล้ว' : 'Assigned')
          : assignedToOther
          ? (isTh ? 'มีผู้รับแล้ว' : 'Assigned')
          : (isTh ? 'รับงาน' : 'Assign');

        return (
          <Button
            variant={assignedToCurrentUser ? 'ghost' : 'secondary'}
            size="sm"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              handleAssignToMe(row);
            }}
            title={
              assignedToOther
                ? `${isTh ? 'มอบหมายให้' : 'Assigned to'} ${assigned?.name}`
                : undefined
            }
            className="h-7 px-2 text-xs"
            data-testid={`assign-to-me-${row.id}`}
            leadingIcon={
              assignedToCurrentUser ? (
                <UserCheck className="h-3.5 w-3.5" />
              ) : (
                <UserPlus className="h-3.5 w-3.5" />
              )
            }
          >
            {label}
          </Button>
        );
      },
      className: 'w-32',
    },
    {
      id: 'attachments',
      header: isTh ? 'เอกสารแนบ' : 'Attachment',
      cell: (row) => {
        const attachments = getAttachmentNames(row);
        if (attachments.length === 0) {
          return <span className="text-xs text-ink-faint">—</span>;
        }
        return (
          <span
            className="inline-flex items-center gap-1 rounded-[var(--radius-full)] bg-accent-soft px-2 py-1 text-xs font-medium text-accent"
            title={attachments.join(', ')}
            data-testid={`attachment-indicator-${row.id}`}
          >
            <Paperclip className="h-3.5 w-3.5" aria-hidden />
            {attachments.length}
          </span>
        );
      },
      className: 'w-24',
      align: 'center',
    },
    {
      id: 'action',
      header: '',
      headerVisuallyHidden: true,
      cell: (row) => {
        // Probation drill-in → /workflows/probation/<id>
        // Benefit claims (BEN-CLM-*) → /workflows/benefit-claim/<id> (STA-28 PR-C)
        // All other types → /quick-approve/<id>
        const href =
          row.type === 'probation'
            ? `/${locale}/workflows/probation/${row.id}`
            : row.id.startsWith('BEN-CLM')
              ? `/${locale}/workflows/benefit-claim/${row.id}`
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
  ], [currentUserId, filteredItems, handleAssignToMe, handleSelectAll, handleToggleSelect, isTh, locale, selectedIds, t, typeLabels]);

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

      {/* ── HRBP/SPD scope transparency banner — STA-27 PR-A (AC-7) ── */}
      <HrbpScopeBanner persona={primaryRole} isTh={isTh} locale={locale} />

      {/* ── Smart Tabs — STA-28 PR-B v2 (AC-4) ── */}
      <SmartTabs
        activeTab={activeTab}
        onChange={(tab) => {
          setActiveTab(tab);
          setSelectedIds(new Set());
        }}
        counts={tabCounts}
        showAllTab={showAllTab}
      />

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
                onChange={(e) => updateFilters((f) => ({ ...f, search: e.target.value }))}
                placeholder={t('filters.searchPlaceholder')}
                className="w-full rounded-[var(--radius-md)] border border-hairline pl-9 pr-3 py-2 text-sm bg-surface focus:border-brand focus:ring-1 focus:ring-brand outline-none"
                data-testid="quick-approve-search"
              />
            </div>
          </div>

          {/* Row 2: type chips + urgency chips */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-ink-muted shrink-0" />

            {/* Type filter chips */}
            {visibleRequestTypes.map((type) => (
              <button
                key={type}
                onClick={() => updateFilters((f) => ({ ...f, type }))}
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

            <div className="h-4 w-px bg-hairline mx-1" />

            {/* Urgency filter chips */}
            {(['all', 'urgent', 'normal', 'low'] as const).map((level) => (
              <button
                key={level}
                onClick={() => updateFilters((f) => ({ ...f, urgency: level }))}
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

          <div className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-3">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
              <label className="space-y-1 text-xs font-medium text-ink-muted">
                <span>{isTh ? 'ประเภทคำขอ' : 'Request Type'}</span>
                <select
                  value={filters.type}
                  onChange={(e) => updateFilters((f) => ({ ...f, type: e.target.value as FilterState['type'] }))}
                  className="h-9 w-full rounded-[var(--radius-sm)] border border-hairline bg-surface px-2 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
                  data-testid="filter-request-type"
                >
                  {visibleRequestTypes.map((type) => (
                    <option key={type} value={type}>
                      {typeLabels[type]}
                    </option>
                  ))}
                </select>
              </label>

              {ADVANCED_SELECT_FIELDS.map((field) => (
                <label key={field.key} className="space-y-1 text-xs font-medium text-ink-muted">
                  <span>{isTh ? field.labelTh : field.labelEn}</span>
                  <select
                    value={filters[field.key]}
                    onChange={(e) => updateFilters((f) => ({ ...f, [field.key]: e.target.value }))}
                    className="h-9 w-full rounded-[var(--radius-sm)] border border-hairline bg-surface px-2 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
                    data-testid={`filter-${field.key}`}
                  >
                    <option value="">{isTh ? 'ไม่เลือก' : 'No Selection'}</option>
                    {selectFilterOptions[field.key].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ))}

              <fieldset className="space-y-1 text-xs font-medium text-ink-muted sm:col-span-2">
                <legend>{isTh ? 'ช่วงวันที่มีผล' : 'Effective Date Range'}</legend>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <input
                    type="date"
                    value={filters.effectiveDateFrom}
                    onChange={(e) => updateFilters((f) => ({ ...f, effectiveDateFrom: e.target.value }))}
                    className="h-9 min-w-0 rounded-[var(--radius-sm)] border border-hairline bg-surface px-2 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
                    aria-label={isTh ? 'วันที่มีผลเริ่มต้น' : 'Effective date from'}
                    data-testid="filter-effective-from"
                  />
                  <span className="text-ink-faint">–</span>
                  <input
                    type="date"
                    value={filters.effectiveDateTo}
                    onChange={(e) => updateFilters((f) => ({ ...f, effectiveDateTo: e.target.value }))}
                    className="h-9 min-w-0 rounded-[var(--radius-sm)] border border-hairline bg-surface px-2 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
                    aria-label={isTh ? 'วันที่มีผลสิ้นสุด' : 'Effective date to'}
                    data-testid="filter-effective-to"
                  />
                </div>
              </fieldset>

              <fieldset className="space-y-1 text-xs font-medium text-ink-muted sm:col-span-2">
                <legend>{isTh ? 'ช่วงวันที่เริ่มคำขอ' : 'Initiated Date Range'}</legend>
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => updateFilters((f) => ({ ...f, dateFrom: e.target.value }))}
                    className="h-9 min-w-0 rounded-[var(--radius-sm)] border border-hairline bg-surface px-2 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
                    aria-label={t('filters.dateFrom')}
                    data-testid="filter-initiated-from"
                  />
                  <span className="text-ink-faint">–</span>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => updateFilters((f) => ({ ...f, dateTo: e.target.value }))}
                    className="h-9 min-w-0 rounded-[var(--radius-sm)] border border-hairline bg-surface px-2 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft"
                    aria-label={t('filters.dateTo')}
                    data-testid="filter-initiated-to"
                  />
                </div>
              </fieldset>
            </div>

            <div className="mt-3 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={resetFilters} disabled={!hasActiveFilters}>
                {isTh ? 'ล้าง' : 'Clear'}
              </Button>
              <Button variant="primary" size="sm" onClick={() => setSelectedIds(new Set())}>
                {isTh ? 'ใช้ตัวกรอง' : 'Apply'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Bulk-action bar — legacy inline bar removed; floating BulkActionToolbar below (AC-5) */}

      {/* ── Inbox table ── */}
      <Card header={
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            {isTh ? `คำขอรออนุมัติ (${filteredItems.length})` : `Pending Requests (${filteredItems.length})`}
          </CardTitle>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
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

      {/* ── Floating Bulk Action Toolbar — STA-28 PR-B v2 (AC-5, AC-6, AC-7)
          NOTE: Capability wrapper removed — component self-gates via isHighRiskType()
          per PR-B v2 spec. Manager bulk-approve safety = high-risk type disable + tooltip,
          not capability flag (which is reserved for backend bulk endpoints). ── */}
      <BulkActionToolbar
        selectedCount={selectedIds.size}
        selectedTypes={selectedTypes}
        onApprove={() => handleBulkAction('approve')}
        onReject={() => handleBulkAction('reject')}
        onClear={handleClearSelection}
      />
    </div>
  );
}
