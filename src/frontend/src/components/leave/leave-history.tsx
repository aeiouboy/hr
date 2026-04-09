'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Modal } from '@/components/ui/modal';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';
import { LEAVE_TYPE_COLORS } from './leave-balance';
import type { LeaveRequest, LeaveStatus, LeaveType } from '@/hooks/use-leave';

const STATUS_VARIANTS: Record<LeaveStatus,'warning' |'success' |'error' |'neutral'> = {
 pending:'warning',
 approved:'success',
 rejected:'error',
 cancelled:'neutral',
};

const ITEMS_PER_PAGE = 10;

interface LeaveHistoryProps {
 requests: LeaveRequest[];
 loading?: boolean;
 onViewDetail: (request: LeaveRequest) => void;
 onCancelPending?: (requestId: string) => void | Promise<void>;
 onRequestCancellation?: (requestId: string, reason: string) => void | Promise<void>;
}

function isCurrentOrFutureLeave(request: LeaveRequest) {
 const today = new Date();
 today.setHours(0, 0, 0, 0);
 return new Date(request.endDate) >= today;
}

export function LeaveHistory({
 requests,
 loading,
 onViewDetail,
 onCancelPending,
 onRequestCancellation,
}: LeaveHistoryProps) {
 const t = useTranslations('leave');
 const [statusFilter, setStatusFilter] = useState<string>('all');
 const [typeFilter, setTypeFilter] = useState<string>('all');
 const [page, setPage] = useState(1);
 const [cancelModalRequest, setCancelModalRequest] = useState<LeaveRequest | null>(null);
 const [cancelReason, setCancelReason] = useState('');
 const [submittingCancelRequest, setSubmittingCancelRequest] = useState(false);

 const filtered = useMemo(() => {
 let result = [...requests];
 if (statusFilter !=='all') result = result.filter((r) => r.status === statusFilter);
 if (typeFilter !=='all') result = result.filter((r) => r.type === typeFilter);
 result.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
 return result;
 }, [requests, statusFilter, typeFilter]);

 const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
 const paginatedItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

 if (loading) {
 return (
 <div className="space-y-3">
 {Array.from({ length: 5 }).map((_, i) => (
 <Skeleton key={i} className="h-20 rounded-md" />
 ))}
 </div>
 );
 }

 const uniqueTypes = [...new Set(requests.map((r) => r.type))];

 const openCancelModal = (request: LeaveRequest) => {
 setCancelModalRequest(request);
 setCancelReason('');
 };

 const handleSubmitCancellation = async () => {
 if (!cancelModalRequest || !cancelReason.trim() || !onRequestCancellation) return;
 setSubmittingCancelRequest(true);
 try {
 await onRequestCancellation(cancelModalRequest.id, cancelReason.trim());
 setCancelModalRequest(null);
 setCancelReason('');
 } finally {
 setSubmittingCancelRequest(false);
 }
 };

 const getActionCell = (request: LeaveRequest, isMobile = false) => {
 if (request.status ==='pending' && onCancelPending) {
 return (
 <Button
 variant="outline"
 size="sm"
 onClick={(e) => {
 e.stopPropagation();
 void onCancelPending(request.id);
 }}
 className={cn('text-red-500 border-red-200 hover:bg-red-50', isMobile &&'text-xs')}
 >
 {t('cancelRequest')}
 </Button>
 );
 }

 const canRequestCancellation =
 request.status ==='approved' &&
 isCurrentOrFutureLeave(request) &&
 !request.cancellationRequested &&
 !!onRequestCancellation;

 if (canRequestCancellation) {
 return (
 <Button
 variant="outline"
 size="sm"
 onClick={(e) => {
 e.stopPropagation();
 openCancelModal(request);
 }}
 className={cn('text-amber-700 border-amber-200 hover:bg-amber-50', isMobile &&'text-xs')}
 >
 {t('requestCancellation')}
 </Button>
 );
 }

 if (request.cancellationRequested) {
 return <span className="text-xs text-amber-700">{t('cancellationPendingApproval')}</span>;
 }

 return null;
 };

 return (
 <Card>
 <CardHeader className="pb-3">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
 <CardTitle className="text-base">{t('history')}</CardTitle>
 <div className="flex flex-wrap gap-2">
 <select
 value={statusFilter}
 onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
 className="px-3 py-1.5 border border-hairline rounded-md text-sm bg-surface"
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
 className="px-3 py-1.5 border border-hairline rounded-md text-sm bg-surface"
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
 <div className="text-center py-12 text-ink-muted">
 <p>{t('noHistoryData')}</p>
 </div>
 ) : (
 <>
 {/* Desktop table */}
 <div className="hidden md:block overflow-x-auto">
 <table className="w-full">
 <thead>
 <tr className="border-b border-hairline bg-surface-raised">
 <th className="text-left text-xs font-medium text-ink-muted px-6 py-3">Type</th>
 <th className="text-left text-xs font-medium text-ink-muted px-6 py-3">Date Range</th>
 <th className="text-center text-xs font-medium text-ink-muted px-6 py-3">{t('days')}</th>
 <th className="text-center text-xs font-medium text-ink-muted px-6 py-3">Status</th>
 <th className="text-left text-xs font-medium text-ink-muted px-6 py-3">{t('approvedBy')}</th>
 <th className="text-right text-xs font-medium text-ink-muted px-6 py-3"></th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
 {paginatedItems.map((req) => {
 const colors = LEAVE_TYPE_COLORS[req.type as LeaveType] || LEAVE_TYPE_COLORS.annual;
 return (
 <tr key={req.id} className="hover:bg-surface-raised/30 transition cursor-pointer" onClick={() => onViewDetail(req)}>
 <td className="px-6 py-3">
 <div className="flex items-center gap-2">
 <div className={cn('w-2 h-2 rounded-full', colors.bar)} />
 <span className="text-sm font-medium text-ink">{req.typeNameEn}</span>
 </div>
 </td>
 <td className="px-6 py-3 text-sm text-ink-muted">
 {req.startDate === req.endDate ? req.startDate : `${req.startDate} — ${req.endDate}`}
 </td>
 <td className="px-6 py-3 text-sm text-center text-ink font-medium">
 {req.days}{req.halfDay ? ` (${req.halfDay ==='morning' ?'AM' :'PM'})` :''}
 </td>
 <td className="px-6 py-3 text-center">
 <Badge variant={STATUS_VARIANTS[req.status]}>{t(`status.${req.status}`)}</Badge>
 </td>
 <td className="px-6 py-3 text-sm text-ink-muted">{req.approvedByName ||'—'}</td>
 <td className="px-6 py-3 text-right">
 {getActionCell(req)}
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>

 {/* Mobile list */}
 <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
 {paginatedItems.map((req) => {
 const colors = LEAVE_TYPE_COLORS[req.type as LeaveType] || LEAVE_TYPE_COLORS.annual;
 return (
 <div key={req.id} className="p-4 hover:bg-surface-raised/30 transition cursor-pointer" onClick={() => onViewDetail(req)}>
 <div className="flex items-start justify-between gap-3">
 <div className="flex items-center gap-2 min-w-0">
 <div className={cn('w-8 h-8 rounded-md flex items-center justify-center text-sm flex-shrink-0', colors.bg)}>
 {LEAVE_TYPE_COLORS[req.type as LeaveType]?.icon || <FileText className="h-4 w-4" />}
 </div>
 <div className="min-w-0">
 <p className="text-sm font-medium text-ink truncate">{req.typeNameEn}</p>
 <p className="text-xs text-ink-muted">{req.startDate} · {req.days} {t('days')}</p>
 </div>
 </div>
 <Badge variant={STATUS_VARIANTS[req.status]}>{t(`status.${req.status}`)}</Badge>
 </div>
 {getActionCell(req, true) && (
 <div className="mt-2 flex justify-end">
 {getActionCell(req, true)}
 </div>
 )}
 </div>
 );
 })}
 </div>

 {/* Pagination */}
 {totalPages > 1 && (
 <div className="flex items-center justify-between px-6 py-3 border-t border-hairline">
 <p className="text-sm text-ink-muted">
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
 <Modal
 open={!!cancelModalRequest}
 onClose={() => setCancelModalRequest(null)}
 title={t('requestCancellation')}
 >
 <div className="space-y-3">
 <p className="text-sm text-ink-muted">{t('cancellationReasonPrompt')}</p>
 <textarea
 value={cancelReason}
 onChange={(e) => setCancelReason(e.target.value)}
 rows={4}
 className="w-full rounded-md border border-hairline border-hairline px-3 py-2 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-brand"
 placeholder={t('cancellationReasonPlaceholder')}
 />
 <div className="flex justify-end gap-2 pt-2">
 <Button variant="outline" onClick={() => setCancelModalRequest(null)}>
 {t('cancel')}
 </Button>
 <Button
 onClick={handleSubmitCancellation}
 disabled={!cancelReason.trim() || submittingCancelRequest}
 >
 {submittingCancelRequest ?'Submitting...' : t('submitCancellationRequest')}
 </Button>
 </div>
 </div>
 </Modal>
 </Card>
 );
}
