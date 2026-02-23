'use client';

import { useState, useMemo, useCallback, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Filter, Calendar, Clock, Palmtree, Receipt, ArrowLeftRight, FilePen, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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

const TYPE_OPTIONS: RequestType[] = ['leave', 'overtime', 'claim', 'transfer', 'change_request'];
const URGENCY_OPTIONS: Urgency[] = ['urgent', 'normal', 'low'];

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
      <div className="bg-white rounded-xl border p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={filters.search ?? ''}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              placeholder={t('filters.searchPlaceholder')}
              className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm focus:border-cg-red focus:ring-1 focus:ring-cg-red outline-none"
            />
          </div>

          {/* Type filter */}
          <select
            value={filters.type ?? ''}
            onChange={(e) => onFilterChange({ ...filters, type: e.target.value || undefined })}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red outline-none"
            aria-label={t('filters.type')}
          >
            <option value="">{t('filters.allTypes')}</option>
            {TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type} {counts[type] ? `(${counts[type]})` : ''}
              </option>
            ))}
          </select>

          {/* Urgency filter */}
          <select
            value={filters.urgency ?? ''}
            onChange={(e) =>
              onFilterChange({ ...filters, urgency: (e.target.value as Urgency) || undefined })
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red outline-none"
            aria-label={t('filters.urgency')}
          >
            <option value="">{t('filters.allUrgency')}</option>
            {URGENCY_OPTIONS.map((u) => (
              <option key={u} value={u}>
                {u.charAt(0).toUpperCase() + u.slice(1)}
              </option>
            ))}
          </select>

          {/* Date From */}
          <input
            type="date"
            value={filters.dateFrom ?? ''}
            onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value || undefined })}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red outline-none"
            aria-label={t('filters.dateFrom')}
          />

          {/* Date To */}
          <input
            type="date"
            value={filters.dateTo ?? ''}
            onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value || undefined })}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red outline-none"
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
                  ? 'bg-cg-red text-white border-cg-red'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              <span>{typeIcons[type] ?? <ClipboardList className="h-4 w-4" />}</span>
              <span>{type}</span>
              <span className="bg-white/20 rounded-full px-1.5 text-[10px]">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="grid">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-cg-red focus:ring-cg-red"
                    aria-label={t('filters.selectAll')}
                  />
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t('table.type')}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t('table.requester')}</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 hidden md:table-cell">
                  {t('table.description')}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600 hidden lg:table-cell">
                  {t('table.submitted')}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">{t('table.urgency')}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    {t('noRequests')}
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => onRowClick(req)}
                    className="hover:bg-gray-50 cursor-pointer transition"
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
                        className="rounded border-gray-300 text-cg-red focus:ring-cg-red"
                        aria-label={`Select ${req.requester.name}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600" title={req.type}>
                        {typeIcons[req.type] ?? <ClipboardList className="h-4 w-4" />}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-cg-dark">{req.requester.name}</p>
                        <p className="text-xs text-gray-400">{req.requester.position}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell max-w-xs truncate">
                      {req.description}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">
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
      </div>
    </div>
  );
}
