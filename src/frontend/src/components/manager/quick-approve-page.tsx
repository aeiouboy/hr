'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  CheckCircle2,
  XCircle,
  Filter,
  AlertCircle,
  ChevronRight,
  X,
  Paperclip,
  Clock,
  FileText,
  Search,
  Settings2,
  Calendar,
  Trash2,
  Plus,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuickApprove } from '@/hooks/use-quick-approve';
import type { ApprovalItem, ApprovalType, UrgencyLevel } from '@/hooks/use-quick-approve';
import { cn } from '@/lib/utils';

const TYPE_LABELS: Record<string, string> = {
  all: 'All',
  leave: 'Leave',
  expense: 'Expense',
  overtime: 'Overtime',
  'change-request': 'Change Request',
  claim: 'Claim',
  transfer: 'Transfer',
  change_request: 'Change Request',
};

const TYPE_BADGE_VARIANT: Record<string, 'info' | 'warning' | 'success' | 'neutral' | 'error'> = {
  leave: 'info',
  expense: 'warning',
  overtime: 'success',
  'change-request': 'neutral',
  claim: 'warning',
  transfer: 'info',
  change_request: 'neutral',
};

const URGENCY_STYLES: Record<string, string> = {
  urgent: 'bg-red-100 text-red-800',
  normal: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

const WORKFLOW_TYPES = ['leave', 'overtime', 'claim', 'transfer', 'change_request'];

export function QuickApprovePage() {
  const t = useTranslations('managerDashboard');

  const {
    items,
    loading,
    typeFilter,
    setTypeFilter,
    urgencyFilter,
    setUrgencyFilter,
    searchText,
    setSearchText,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    selectedIds,
    toggleSelect,
    selectAll,
    clearSelection,
    approveItems,
    rejectItems,
    stats,
    delegations,
    createDelegation,
    revokeDelegation,
  } = useQuickApprove();

  const [previewItem, setPreviewItem] = useState<ApprovalItem | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ action: 'approve' | 'reject'; ids: string[]; count: number } | null>(null);
  const [confirmReason, setConfirmReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Delegation modal
  const [delegationOpen, setDelegationOpen] = useState(false);
  const [delegateForm, setDelegateForm] = useState({ to: '', start: '', end: '', types: [] as string[] });
  const [delegateSubmitting, setDelegateSubmitting] = useState(false);

  const handleBulkAction = useCallback((action: 'approve' | 'reject') => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    setConfirmModal({ action, ids, count: ids.length });
    setConfirmReason('');
  }, [selectedIds]);

  const handleSingleAction = useCallback((id: string, action: 'approve' | 'reject') => {
    setConfirmModal({ action, ids: [id], count: 1 });
    setConfirmReason('');
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!confirmModal) return;
    if (confirmModal.action === 'reject' && !confirmReason.trim()) return;
    setActionLoading(true);
    try {
      if (confirmModal.action === 'approve') await approveItems(confirmModal.ids, confirmReason || undefined);
      else await rejectItems(confirmModal.ids, confirmReason);
    } finally {
      setActionLoading(false);
      setConfirmModal(null);
      setPreviewItem(null);
    }
  }, [confirmModal, confirmReason, approveItems, rejectItems]);

  const handleCreateDelegation = async () => {
    if (!delegateForm.to || !delegateForm.start || !delegateForm.end || delegateForm.types.length === 0) return;
    setDelegateSubmitting(true);
    try {
      await createDelegation({
        delegate_to: delegateForm.to,
        start_date: delegateForm.start,
        end_date: delegateForm.end,
        workflow_types: delegateForm.types,
      });
      setDelegateForm({ to: '', start: '', end: '', types: [] });
    } finally {
      setDelegateSubmitting(false);
    }
  };

  const toggleDelegateType = (type: string) => {
    setDelegateForm((prev) => ({
      ...prev,
      types: prev.types.includes(type) ? prev.types.filter((t) => t !== type) : [...prev.types, type],
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-cg-dark">Quick Approve</h1>
          <p className="text-sm text-gray-500 mt-1">Review and process pending approvals</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="error">{stats.urgent} urgent</Badge>
          <Badge variant="neutral">{stats.total} total</Badge>
          <Button variant="outline" size="sm" onClick={() => setDelegationOpen(true)}>
            <Settings2 className="h-4 w-4 mr-1.5" />
            Delegations
          </Button>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Leave', count: stats.leave, color: 'bg-blue-100 text-blue-800' },
          { label: 'Expense', count: stats.expense, color: 'bg-yellow-100 text-yellow-800' },
          { label: 'Overtime', count: stats.overtime, color: 'bg-green-100 text-green-800' },
          { label: 'Claim', count: stats.claim, color: 'bg-orange-100 text-orange-800' },
          { label: 'Transfer', count: stats.transfer, color: 'bg-purple-100 text-purple-800' },
          { label: 'Changes', count: stats.changeRequest, color: 'bg-gray-100 text-gray-800' },
        ].filter((s) => s.count > 0).map((s) => (
          <span key={s.label} className={cn('px-3 py-1 rounded-full text-xs font-medium', s.color)}>
            {s.label}: {s.count}
          </span>
        ))}
      </div>

      {/* Enhanced Filter Bar */}
      <Card>
        <CardContent className="py-3 space-y-3">
          {/* Search + Date filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm focus:border-cg-red focus:ring-1 focus:ring-cg-red outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-cg-red outline-none"
                aria-label="Date from"
              />
              <span className="text-gray-400 text-xs">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-cg-red outline-none"
                aria-label="Date to"
              />
            </div>
          </div>

          {/* Type + Urgency filters + Bulk actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-gray-400" />
              <div className="flex gap-1 flex-wrap">
                {(['all', 'leave', 'expense', 'overtime', 'change-request'] as ApprovalType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition',
                      typeFilter === type ? 'bg-cg-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
              <div className="h-4 w-px bg-gray-200 mx-1" />
              <div className="flex gap-1">
                {(['all', 'urgent', 'normal', 'low'] as UrgencyLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setUrgencyFilter(level)}
                    className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition',
                      urgencyFilter === level
                        ? level === 'urgent' ? 'bg-red-600 text-white' : level === 'low' ? 'bg-green-600 text-white' : 'bg-cg-red text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={selectAll}
                className="text-xs text-cg-red hover:underline font-medium"
              >
                {selectedIds.size === items.length && items.length > 0 ? 'Deselect All' : 'Select All'}
              </button>
              {selectedIds.size > 0 && (
                <>
                  <span className="text-xs text-gray-500">{selectedIds.size} selected</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleBulkAction('approve')}>
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />{t('approvals.bulkApprove')}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleBulkAction('reject')}>
                    <XCircle className="h-3.5 w-3.5 mr-1" />{t('approvals.bulkReject')}
                  </Button>
                  <button onClick={clearSelection} className="p-1 rounded hover:bg-gray-100"><X className="h-4 w-4 text-gray-400" /></button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval Items */}
      <div className="flex gap-6">
        <div className={cn('flex-1 space-y-3', previewItem && 'max-w-[55%]')}>
          {items.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-300 mx-auto mb-3" />
                <p className="text-gray-500">{t('approvals.noApprovals')}</p>
              </CardContent>
            </Card>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'p-4 rounded-xl border bg-white transition cursor-pointer hover:shadow-sm',
                  item.urgent && 'border-red-200',
                  selectedIds.has(item.id) && 'ring-2 ring-cg-red/30 bg-cg-red/5',
                  previewItem?.id === item.id && 'ring-2 ring-blue-400'
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-cg-red focus:ring-cg-red"
                    aria-label={`Select ${item.employeeName}`}
                  />

                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 shrink-0">
                    {item.employeeAvatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0" onClick={() => setPreviewItem(item)}>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant={TYPE_BADGE_VARIANT[item.type]}>{TYPE_LABELS[item.type]}</Badge>
                      {/* Urgency Badge */}
                      <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', URGENCY_STYLES[item.urgency] ?? URGENCY_STYLES.normal)}>
                        {item.urgency === 'urgent' && <AlertCircle className="h-3 w-3 mr-0.5" />}
                        {item.urgency.charAt(0).toUpperCase() + item.urgency.slice(1)}
                        {item.waitingDays > 0 && ` (${item.waitingDays}d)`}
                      </span>
                      {item.attachments.length > 0 && <Paperclip className="h-3.5 w-3.5 text-gray-400" />}
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">{item.summary}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.employeeName} &middot; {item.department}
                      {item.amount && <> &middot; ฿{item.amount.toLocaleString()}</>}
                      {item.dates && <> &middot; {item.dates}</>}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" />{new Date(item.submittedAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => setPreviewItem(item)} className="p-1.5 rounded-lg hover:bg-gray-100" aria-label="Preview"><ChevronRight className="h-4 w-4 text-gray-400" /></button>
                    <button onClick={() => handleSingleAction(item.id, 'approve')} className="p-1.5 rounded-lg hover:bg-green-100 text-green-600" aria-label="Approve"><CheckCircle2 className="h-5 w-5" /></button>
                    <button onClick={() => handleSingleAction(item.id, 'reject')} className="p-1.5 rounded-lg hover:bg-red-100 text-red-600" aria-label="Reject"><XCircle className="h-5 w-5" /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Slide-over Preview Panel */}
        {previewItem && (
          <div className="hidden lg:block w-[45%] sticky top-20 self-start">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Request Details</CardTitle>
                  <button onClick={() => setPreviewItem(null)} className="p-1 rounded hover:bg-gray-100" aria-label="Close"><X className="h-4 w-4 text-gray-400" /></button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Employee */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium text-gray-600">{previewItem.employeeAvatar}</div>
                  <div>
                    <p className="font-medium text-gray-900">{previewItem.employeeName}</p>
                    <p className="text-xs text-gray-500">{previewItem.employeeId} &middot; {previewItem.department}</p>
                  </div>
                </div>

                {/* Type & Urgency */}
                <div className="flex gap-2 flex-wrap">
                  <Badge variant={TYPE_BADGE_VARIANT[previewItem.type]}>{TYPE_LABELS[previewItem.type]}</Badge>
                  <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', URGENCY_STYLES[previewItem.urgency])}>
                    {previewItem.urgency.charAt(0).toUpperCase() + previewItem.urgency.slice(1)}
                  </span>
                </div>

                {/* Summary */}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Summary</p>
                  <p className="text-sm font-medium text-gray-900">{previewItem.summary}</p>
                </div>

                {/* Detail */}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Details</p>
                  <p className="text-sm text-gray-600">{previewItem.detail}</p>
                </div>

                {/* Amount / Dates */}
                {previewItem.amount && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Amount</p>
                    <p className="text-lg font-bold text-cg-dark">฿{previewItem.amount.toLocaleString()}</p>
                  </div>
                )}
                {previewItem.dates && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Dates</p>
                    <p className="text-sm text-gray-600">{previewItem.dates}</p>
                  </div>
                )}

                {/* Approval Timeline */}
                {previewItem.approvalTimeline && previewItem.approvalTimeline.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Approval Timeline</p>
                    <ol className="relative border-l border-gray-200 ml-2">
                      {previewItem.approvalTimeline.map((step) => (
                        <li key={step.step} className="mb-3 ml-4">
                          <div className={cn('absolute -left-1.5 w-3 h-3 rounded-full border-2 border-white',
                            step.status === 'approved' ? 'bg-green-500' : step.status === 'rejected' ? 'bg-red-500' : 'bg-gray-300'
                          )} />
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">{step.approver}</span>
                            <Badge variant={step.status === 'approved' ? 'success' : step.status === 'rejected' ? 'error' : 'neutral'}>
                              {step.status}
                            </Badge>
                          </div>
                          {step.date && <p className="text-[10px] text-gray-400">{new Date(step.date).toLocaleDateString()}</p>}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Attachments */}
                {previewItem.attachments.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Attachments</p>
                    <div className="space-y-1">
                      {previewItem.attachments.map((a) => (
                        <div key={a} className="flex items-center gap-2 text-sm text-blue-600">
                          <FileText className="h-4 w-4" />{a}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submitted */}
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Submitted</p>
                  <p className="text-sm text-gray-600">{new Date(previewItem.submittedAt).toLocaleString()}</p>
                </div>

                {/* Notes */}
                {previewItem.notes && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Notes</p>
                    <p className="text-sm text-gray-600">{previewItem.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleSingleAction(previewItem.id, 'approve')}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />{t('actions.approve')}
                  </Button>
                  <Button variant="destructive" className="flex-1" onClick={() => handleSingleAction(previewItem.id, 'reject')}>
                    <XCircle className="h-4 w-4 mr-2" />{t('actions.reject')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Sticky Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-cg-dark">{selectedIds.size} items selected</span>
            <div className="flex items-center gap-3">
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleBulkAction('approve')}>
                <CheckCircle2 className="h-4 w-4 mr-1.5" />Approve All
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleBulkAction('reject')}>
                <XCircle className="h-4 w-4 mr-1.5" />Reject All
              </Button>
              <button onClick={clearSelection} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <X className="h-3.5 w-3.5" />Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        open={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        title={confirmModal?.action === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setConfirmModal(null)}>Cancel</Button>
            <Button
              variant={confirmModal?.action === 'reject' ? 'destructive' : 'default'}
              className={confirmModal?.action === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}
              onClick={handleConfirm}
              disabled={actionLoading || (confirmModal?.action === 'reject' && !confirmReason.trim())}
            >
              {actionLoading ? 'Processing...' : confirmModal?.action === 'approve' ? `${t('actions.approve')} (${confirmModal?.count})` : `${t('actions.reject')} (${confirmModal?.count})`}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {confirmModal?.count === 1
              ? (confirmModal.action === 'approve' ? t('messages.confirmApprove') : t('messages.confirmReject'))
              : (confirmModal?.action === 'approve'
                ? `Are you sure you want to approve ${confirmModal?.count} request(s)?`
                : `Are you sure you want to reject ${confirmModal?.count} request(s)?`
              )}
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {confirmModal?.action === 'approve' ? 'Comment (optional)' : 'Reason (required)'}
            </label>
            <textarea
              value={confirmReason}
              onChange={(e) => setConfirmReason(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red focus:ring-1 focus:ring-cg-red outline-none resize-none"
              placeholder={confirmModal?.action === 'approve' ? 'Optional comment...' : 'Please provide a reason...'}
            />
          </div>
        </div>
      </Modal>

      {/* Delegation Modal */}
      <Modal
        open={delegationOpen}
        onClose={() => setDelegationOpen(false)}
        title="Manage Delegations"
        className="max-w-xl"
      >
        <div className="space-y-5">
          <div>
            <h4 className="text-sm font-medium text-cg-dark mb-2">Active Delegations</h4>
            {delegations.length === 0 ? (
              <p className="text-sm text-gray-400">No active delegations</p>
            ) : (
              <ul className="space-y-2">
                {delegations.map((d) => (
                  <li key={d.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-cg-dark">{d.delegateTo.name}</p>
                      <p className="text-xs text-gray-500">{d.startDate} — {d.endDate}</p>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {d.workflowTypes.map((wt) => <Badge key={wt} variant="info">{wt}</Badge>)}
                      </div>
                    </div>
                    {d.status === 'active' && (
                      <button onClick={() => revokeDelegation(d.id)} className="p-1.5 rounded hover:bg-red-50 text-red-500" aria-label="Revoke">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-medium text-cg-dark">Create New Delegation</h4>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Delegate To (Employee ID)</label>
              <input type="text" value={delegateForm.to} onChange={(e) => setDelegateForm((p) => ({ ...p, to: e.target.value }))} placeholder="e.g. EMP005" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red focus:ring-1 focus:ring-cg-red outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                <input type="date" value={delegateForm.start} onChange={(e) => setDelegateForm((p) => ({ ...p, start: e.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                <input type="date" value={delegateForm.end} onChange={(e) => setDelegateForm((p) => ({ ...p, end: e.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Workflow Types</label>
              <div className="flex flex-wrap gap-2">
                {WORKFLOW_TYPES.map((wt) => (
                  <button key={wt} type="button" onClick={() => toggleDelegateType(wt)} className={`px-3 py-1 rounded-full text-xs font-medium border transition ${delegateForm.types.includes(wt) ? 'bg-cg-red text-white border-cg-red' : 'bg-white text-gray-600 border-gray-300 hover:border-cg-red'}`}>
                    {wt}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button size="sm" onClick={handleCreateDelegation} disabled={delegateSubmitting || !delegateForm.to || !delegateForm.start || !delegateForm.end || delegateForm.types.length === 0}>
                {delegateSubmitting ? 'Creating...' : 'Create Delegation'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
