// VALIDATION_EXEMPT: display/admin landing — filter chips + action buttons only, no data submit form (per design-gates Track C 2026-04-26)
'use client';

import { useState, useMemo, useCallback, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Filter, Calendar, Clock, Palmtree, Receipt, ArrowLeftRight, FilePen, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CustomSelect } from '@/components/ui/custom-select';
import { UrgencyBadge } from './UrgencyBadge';
import type { PendingRequest, Urgency, RequestType } from '@/lib/quick-approve-api';

const MAX_SELECTION = 50;

const typeIcons: Record<string, ReactNode> = {
 leave: <Palmtree className="h-4 w-4" />,
 overtime: <Clock className="h-4 w-4" />,
 claim: <Receipt className="h-4 w-4" />,
 transfer: <ArrowLeftRight className="h-4 w-4" />,
 change_request: <FilePen className="h-4 w-4" />,
};

const TYPE_OPTIONS: RequestType[] = ['leave','overtime','claim','transfer','change_request'];
const URGENCY_OPTIONS: Urgency[] = ['urgent','normal','low'];

interface RequestListProps {
 requests: PendingRequest[];
 counts: Record<string, number>;
 selectedIds: Set<string>;
 onSelectionChange: (ids: Set<string>) => void;
 onRowClick: (request: PendingRequest) => void;
 filters: { type?: string; urgency?: Urgency; dateFrom?: string; dateTo?: string; search?: string };
 onFilterChange: (filters: RequestListProps['filters']) => void;
}

export function RequestList({
 requests,
 counts,
 selectedIds,
 onSelectionChange,
 onRowClick,
 filters,
 onFilterChange,
}: RequestListProps) {
 const t = useTranslations('quickApprove');

 const allSelected = requests.length > 0 && requests.every((r) => selectedIds.has(r.id));

 const handleSelectAll = useCallback(() => {
 if (allSelected) {
 onSelectionChange(new Set());
 } else {
 const ids = new Set(requests.slice(0, MAX_SELECTION).map((r) => r.id));
 onSelectionChange(ids);
 }
 }, [allSelected, requests, onSelectionChange]);

 const handleToggle = useCallback(
 (id: string) => {
 const next = new Set(selectedIds);
 if (next.has(id)) {
 next.delete(id);
 } else if (next.size < MAX_SELECTION) {
 next.add(id);
 }
 onSelectionChange(next);
 },
 [selectedIds, onSelectionChange]
 );

 return (
 <div className="space-y-4">
 {/* Filter Bar */}
 <div className="bg-surface rounded-md border border-hairline p-4 space-y-3">
 <div className="flex flex-wrap items-center gap-3">
 {/* Search */}
 <div className="relative flex-1 min-w-0 w-full md:min-w-[200px]">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
 <input
 type="text"
 value={filters.search ??''}
 onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
 placeholder={t('filters.searchPlaceholder')}
 className="w-full rounded-md border border-hairline border-hairline pl-9 pr-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand outline-none"
 />
 </div>

 {/* Type filter */}
 <CustomSelect
 value={filters.type ?? ''}
 onChange={(v) => onFilterChange({ ...filters, type: (v as RequestType) || undefined })}
 options={[
 { value: '', label: t('filters.allTypes') },
 ...TYPE_OPTIONS.map((type) => ({
 value: type,
 label: counts[type] ? `${type} (${counts[type]})` : type,
 })),
 ]}
 aria-label={t('filters.type')}
 className="w-44"
 />

 {/* Urgency filter */}
 <CustomSelect
 value={filters.urgency ?? ''}
 onChange={(v) =>
 onFilterChange({ ...filters, urgency: (v as Urgency) || undefined })
 }
 options={[
 { value: '', label: t('filters.allUrgency') },
 ...URGENCY_OPTIONS.map((u) => ({
 value: u,
 label: u.charAt(0).toUpperCase() + u.slice(1),
 })),
 ]}
 aria-label={t('filters.urgency')}
 className="w-36"
 />

 {/* Date From */}
 <input
 type="date"
 value={filters.dateFrom ??''}
 onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value || undefined })}
 className="rounded-md border border-hairline border-hairline px-3 py-2 text-sm focus:border-brand outline-none"
 aria-label={t('filters.dateFrom')}
 />

 {/* Date To */}
 <input
 type="date"
 value={filters.dateTo ??''}
 onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value || undefined })}
 className="rounded-md border border-hairline border-hairline px-3 py-2 text-sm focus:border-brand outline-none"
 aria-label={t('filters.dateTo')}
 />
 </div>

 {/* Filter badge counts */}
 <div className="flex gap-2 flex-wrap">
 {Object.entries(counts).map(([type, count]) => (
 <button
 key={type}
 onClick={() =>
 onFilterChange({ ...filters, type: filters.type === type ? undefined : type })
 }
 className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition ${
 filters.type === type
 ?'bg-brand text-white border-brand'
 :'bg-surface text-ink-muted border-hairline border-hairline hover:border-gray-400'
 }`}
 >
 <span>{typeIcons[type] ?? <ClipboardList className="h-4 w-4" />}</span>
 <span>{type}</span>
 <span className="bg-surface/20 rounded-full px-1.5 text-[10px]">{count}</span>
 </button>
 ))}
 </div>
 </div>

 {/* Table */}
 <div className="bg-surface rounded-md border border-hairline overflow-hidden">
 {/* Desktop table */}
 <div className="hidden md:block overflow-x-auto">
 <table className="w-full text-sm" role="grid">
 <thead>
 <tr className="bg-surface-raised border-b border-hairline">
 <th className="w-10 px-4 py-3">
 <input
 type="checkbox"
 checked={allSelected}
 onChange={handleSelectAll}
 className="rounded border-hairline border-hairline text-brand focus:ring-brand"
 aria-label={t('filters.selectAll')}
 />
 </th>
 <th className="px-4 py-3 text-left font-medium text-ink-muted">{t('table.type')}</th>
 <th className="px-4 py-3 text-left font-medium text-ink-muted">{t('table.requester')}</th>
 <th className="px-4 py-3 text-left font-medium text-ink-muted">
 {t('table.description')}
 </th>
 <th className="px-4 py-3 text-left font-medium text-ink-muted hidden lg:table-cell">
 {t('table.submitted')}
 </th>
 <th className="px-4 py-3 text-left font-medium text-ink-muted">{t('table.urgency')}</th>
 </tr>
 </thead>
 <tbody className="divide-y dark:divide-gray-700">
 {requests.length === 0 ? (
 <tr>
 <td colSpan={6} className="px-4 py-12 text-center text-ink-muted">
 {t('noRequests')}
 </td>
 </tr>
 ) : (
 requests.map((req) => (
 <tr
 key={req.id}
 onClick={() => onRowClick(req)}
 className="hover:bg-surface-raised/30 cursor-pointer transition"
 role="row"
 >
 <td className="px-4 py-3">
 <input
 type="checkbox"
 checked={selectedIds.has(req.id)}
 onChange={(e) => {
 e.stopPropagation();
 handleToggle(req.id);
 }}
 onClick={(e) => e.stopPropagation()}
 className="rounded border-hairline border-hairline text-brand focus:ring-brand"
 aria-label={`Select ${req.requester.name}`}
 />
 </td>
 <td className="px-4 py-3">
 <span className="text-ink-muted" title={req.type}>
 {typeIcons[req.type] ?? <ClipboardList className="h-4 w-4" />}
 </span>
 </td>
 <td className="px-4 py-3">
 <div>
 <p className="font-medium text-ink">{req.requester.name}</p>
 <p className="text-xs text-ink-muted">{req.requester.position}</p>
 </div>
 </td>
 <td className="px-4 py-3 text-ink-muted max-w-xs truncate">
 {req.description}
 </td>
 <td className="px-4 py-3 text-ink-muted hidden lg:table-cell">
 <span className="flex items-center gap-1">
 <Clock className="h-3.5 w-3.5" />
 {new Date(req.submittedAt).toLocaleDateString()}
 </span>
 </td>
 <td className="px-4 py-3">
 <UrgencyBadge urgency={req.urgency} />
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>
 </div>

 {/* Mobile card view */}
 <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
 {requests.length === 0 ? (
 <div className="px-4 py-12 text-center text-ink-muted">
 {t('noRequests')}
 </div>
 ) : (
 requests.map((req) => (
 <div
 key={req.id}
 className="p-4 hover:bg-surface-raised/30 transition cursor-pointer"
 onClick={() => onRowClick(req)}
 >
 <div className="flex items-start gap-3">
 <input
 type="checkbox"
 checked={selectedIds.has(req.id)}
 onChange={(e) => {
 e.stopPropagation();
 handleToggle(req.id);
 }}
 onClick={(e) => e.stopPropagation()}
 className="mt-1 h-5 w-5 rounded border-hairline border-hairline text-brand focus:ring-brand"
 aria-label={`Select ${req.requester.name}`}
 />
 <div className="flex-1 min-w-0">
 <div className="flex items-center justify-between gap-2">
 <div className="flex items-center gap-2 min-w-0">
 <span className="text-ink-muted flex-shrink-0" title={req.type}>
 {typeIcons[req.type] ?? <ClipboardList className="h-4 w-4" />}
 </span>
 <p className="text-sm font-medium text-ink truncate">{req.requester.name}</p>
 </div>
 <UrgencyBadge urgency={req.urgency} />
 </div>
 <p className="text-xs text-ink-muted mt-0.5 truncate">{req.description}</p>
 <div className="flex items-center gap-1 mt-1 text-xs text-ink-muted">
 <Clock className="h-3 w-3" />
 {new Date(req.submittedAt).toLocaleDateString()}
 <span className="ml-1 text-gray-300">·</span>
 <span className="text-ink-muted">{req.requester.position}</span>
 </div>
 </div>
 </div>
 </div>
 ))
 )}
 </div>
 </div>
 </div>
 );
}
