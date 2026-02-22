'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { LEAVE_TYPE_COLORS } from './leave-balance';
import type { LeaveRequest, LeaveStatus, LeaveType } from '@/hooks/use-leave';

const STATUS_VARIANTS: Record<LeaveStatus, 'warning' | 'success' | 'error' | 'neutral'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  cancelled: 'neutral',
};

const ITEMS_PER_PAGE = 10;

interface LeaveHistoryProps {
  requests: LeaveRequest[];
  loading?: boolean;
  onViewDetail: (request: LeaveRequest) => void;
  onCancel?: (requestId: string) => void;
}

export function LeaveHistory({ requests, loading, onViewDetail, onCancel }: LeaveHistoryProps) {
  const t = useTranslations('leave');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...requests];
    if (statusFilter !== 'all') result = result.filter((r) => r.status === statusFilter);
    if (typeFilter !== 'all') result = result.filter((r) => r.type === typeFilter);
    result.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    return result;
  }, [requests, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  const uniqueTypes = [...new Set(requests.map((r) => r.type))];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-base">{t('history')}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="px-3 py-1.5 border rounded-lg text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">{t('status.pending')}</option>
              <option value="approved">{t('status.approved')}</option>
              <option value="rejected">{t('status.rejected')}</option>
              <option value="cancelled">{t('status.cancelled')}</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              className="px-3 py-1.5 border rounded-lg text-sm bg-white"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>{t('noHistoryData')}</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Type</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">Date Range</th>
                    <th className="text-center text-xs font-medium text-gray-500 px-6 py-3">{t('days')}</th>
                    <th className="text-center text-xs font-medium text-gray-500 px-6 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">{t('approvedBy')}</th>
                    <th className="text-right text-xs font-medium text-gray-500 px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedItems.map((req) => {
                    const colors = LEAVE_TYPE_COLORS[req.type as LeaveType] || LEAVE_TYPE_COLORS.annual;
                    return (
                      <tr key={req.id} className="hover:bg-gray-50 transition cursor-pointer" onClick={() => onViewDetail(req)}>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <div className={cn('w-2 h-2 rounded-full', colors.bar)} />
                            <span className="text-sm font-medium text-gray-900">{req.typeNameEn}</span>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600">
                          {req.startDate === req.endDate ? req.startDate : `${req.startDate} — ${req.endDate}`}
                        </td>
                        <td className="px-6 py-3 text-sm text-center text-gray-900 font-medium">
                          {req.days}{req.halfDay ? ` (${req.halfDay === 'morning' ? 'AM' : 'PM'})` : ''}
                        </td>
                        <td className="px-6 py-3 text-center">
                          <Badge variant={STATUS_VARIANTS[req.status]}>{t(`status.${req.status}`)}</Badge>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600">{req.approvedByName || '—'}</td>
                        <td className="px-6 py-3 text-right">
                          {req.status === 'pending' && onCancel && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); onCancel(req.id); }}
                              className="text-red-500 border-red-200 hover:bg-red-50"
                            >
                              {t('cancelRequest')}
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile list */}
            <div className="md:hidden divide-y divide-gray-100">
              {paginatedItems.map((req) => {
                const colors = LEAVE_TYPE_COLORS[req.type as LeaveType] || LEAVE_TYPE_COLORS.annual;
                return (
                  <div key={req.id} className="p-4 hover:bg-gray-50 transition cursor-pointer" onClick={() => onViewDetail(req)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0', colors.bg)}>
                          {LEAVE_TYPE_COLORS[req.type as LeaveType]?.icon || '📋'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{req.typeNameEn}</p>
                          <p className="text-xs text-gray-500">{req.startDate} · {req.days} {t('days')}</p>
                        </div>
                      </div>
                      <Badge variant={STATUS_VARIANTS[req.status]}>{t(`status.${req.status}`)}</Badge>
                    </div>
                    {req.status === 'pending' && onCancel && (
                      <div className="mt-2 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); onCancel(req.id); }}
                          className="text-red-500 border-red-200 hover:bg-red-50 text-xs"
                        >
                          {t('cancelRequest')}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-3 border-t">
                <p className="text-sm text-gray-500">
                  Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                    Prev
                  </Button>
                  <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
