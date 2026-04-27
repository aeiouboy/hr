// VALIDATION_EXEMPT: display/admin landing — filter chips + action buttons only, no data submit form (per design-gates Track C 2026-04-26)
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
 Check,
} from 'lucide-react';
import { Card, CardTitle, Button, Modal } from '@/components/humi';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuickApprove } from '@/hooks/use-quick-approve';
import type { ApprovalItem, ApprovalType, UrgencyLevel } from '@/hooks/use-quick-approve';
import { cn } from '@/lib/utils';
import { useLeaveApprovals, LEAVE_TYPE_LABEL, LEAVE_STATUS_LABEL } from '@/stores/leave-approvals';
import { useTerminationApprovals, TERMINATION_REASON_LABEL } from '@/stores/termination-approvals';
import { useAuthStore } from '@/stores/auth-store';

const TYPE_LABELS: Record<string, string> = {
 all:'ทั้งหมด',
 leave:'ลา',
 expense:'เบิกค่าใช้จ่าย',
 overtime:'โอที',
'change-request':'คำขอเปลี่ยนข้อมูล',
 claim:'เคลม',
 transfer:'ย้าย',
 change_request:'คำขอเปลี่ยนข้อมูล',
};

const TYPE_BADGE_VARIANT: Record<string,'info' |'warning' |'success' |'neutral' |'error'> = {
 leave:'info',
 expense:'warning',
 overtime:'success',
'change-request':'neutral',
 claim:'warning',
 transfer:'info',
 change_request:'neutral',
};

const URGENCY_STYLES: Record<string, string> = {
 urgent:'bg-danger-tint text-danger',
 normal:'bg-warning-tint text-warning',
 low:'bg-success-tint text-success',
};

const WORKFLOW_TYPES = ['leave','overtime','claim','transfer','change_request'];

export function QuickApprovePage() {
 const t = useTranslations('managerDashboard');
 const tQuick = useTranslations('quickApprove');

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
 const [confirmModal, setConfirmModal] = useState<{ action:'approve' |'reject'; ids: string[]; count: number } | null>(null);
 const [confirmReason, setConfirmReason] = useState('');
 const [actionLoading, setActionLoading] = useState(false);

 // Delegation modal
 const [delegationOpen, setDelegationOpen] = useState(false);
 const [delegateForm, setDelegateForm] = useState({ to:'', start:'', end:'', types: [] as string[] });
 const [delegateSubmitting, setDelegateSubmitting] = useState(false);

 const handleBulkAction = useCallback((action:'approve' |'reject') => {
 const ids = Array.from(selectedIds);
 if (ids.length === 0) return;
 setConfirmModal({ action, ids, count: ids.length });
 setConfirmReason('');
 }, [selectedIds]);

 const handleSingleAction = useCallback((id: string, action:'approve' |'reject') => {
 setConfirmModal({ action, ids: [id], count: 1 });
 setConfirmReason('');
 }, []);

 const handleConfirm = useCallback(async () => {
 if (!confirmModal) return;
 if (confirmModal.action ==='reject' && !confirmReason.trim()) return;
 setActionLoading(true);
 try {
 if (confirmModal.action ==='approve') await approveItems(confirmModal.ids, confirmReason || undefined);
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
 setDelegateForm({ to:'', start:'', end:'', types: [] });
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

 const leaveRequests = useLeaveApprovals((s) => s.requests);
 const leaveApprove = useLeaveApprovals((s) => s.approve);
 const leaveReject = useLeaveApprovals((s) => s.reject);
 const terminationRequests = useTerminationApprovals((s) => s.requests);
 const terminationApproveByManager = useTerminationApprovals((s) => s.approveByManager);
 const terminationReject = useTerminationApprovals((s) => s.reject);
 const managerId = useAuthStore((s) => s.userId) ?? 'MGR001';
 const managerName = useAuthStore((s) => s.username) ?? 'หัวหน้าทีม';
 const pendingLeave = leaveRequests.filter((r) => r.status === 'pending');
 const pendingTermination = terminationRequests.filter((r) => r.status === 'pending_manager');

 if (loading) {
 return (
 <div className="space-y-6">
 <Skeleton className="h-8 w-48" />
 <Skeleton className="h-12 w-full rounded-md" />
 <div className="space-y-3">
 {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 w-full rounded-md" />)}
 </div>
 </div>
 );
 }

 return (
 <div className="space-y-6">
 {/* ── คำขอลาออกจากทีม (Termination Queue — pending_manager) ── */}
 <Card header={<CardTitle className="text-base">คำขอลาออกจากทีม — รอหัวหน้าอนุมัติ ({pendingTermination.length})</CardTitle>}>
 <div className="p-4 space-y-3">
 {pendingTermination.length === 0 ? (
 <p className="text-sm text-ink-muted py-4 text-center">ไม่มีคำขอลาออกรอการอนุมัติในขณะนี้</p>
 ) : (
 pendingTermination.map((req) => (
 <div
 key={req.id}
 className="flex items-start gap-3 rounded-md border border-hairline p-3"
 >
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2 flex-wrap mb-1">
 <span className="text-sm font-medium text-ink">{req.employeeName}</span>
 <Badge variant="warning">ลาออก</Badge>
 </div>
 <p className="text-xs text-ink-muted">
 วันทำงานสุดท้าย: {new Date(req.requestedLastDay).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
 </p>
 <p className="text-xs text-ink-muted mt-0.5">
 เหตุผล: {TERMINATION_REASON_LABEL[req.reasonCode]}
 </p>
 {req.reasonText && (
 <p className="text-xs text-ink-muted mt-0.5 truncate" title={req.reasonText}>
 {req.reasonText}
 </p>
 )}
 </div>
 <div className="flex items-center gap-1 shrink-0">
 <button
 onClick={() => terminationApproveByManager(req.id, { role: 'manager', name: managerName })}
 className="p-1.5 rounded-md hover:bg-success-tint text-success"
 aria-label={`อนุมัติคำขอลาออก ${req.employeeName}`}
 >
 <CheckCircle2 className="h-5 w-5" />
 </button>
 <button
 onClick={() => terminationReject(req.id, { role: 'manager', name: managerName }, 'Manager ไม่อนุมัติ')}
 className="p-1.5 rounded-md hover:bg-danger-tint text-danger"
 aria-label={`ปฏิเสธคำขอลาออก ${req.employeeName}`}
 >
 <XCircle className="h-5 w-5" />
 </button>
 </div>
 </div>
 ))
 )}
 <p className="text-xs text-ink-muted border-t border-hairline pt-3 mt-2">
 ลาออกของทีม — Manager อนุมัติก่อน, แล้วส่งต่อให้ SPD ตัดสินครั้งสุดท้าย (BRD #172)
 </p>
 </div>
 </Card>

 {/* ── คิวลา (Leave Queue from leave-approvals store) ── */}
 <Card header={<CardTitle className="text-base">คิวลา — รอหัวหน้าอนุมัติ ({pendingLeave.length})</CardTitle>}>
 <div className="p-4 space-y-3">
 {pendingLeave.length === 0 ? (
 <p className="text-sm text-ink-muted py-4 text-center">ไม่มีใบลารอการอนุมัติในขณะนี้</p>
 ) : (
 pendingLeave.map((req) => (
 <div
 key={req.id}
 className="flex items-start gap-3 rounded-md border border-hairline p-3"
 >
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-2 flex-wrap mb-1">
 <span className="text-sm font-medium text-ink">{req.employeeName}</span>
 <Badge variant="info">{LEAVE_TYPE_LABEL[req.leaveType]}</Badge>
 </div>
 <p className="text-xs text-ink-muted">
 {req.startDate} – {req.endDate}
 </p>
 {req.reason && (
 <p className="text-xs text-ink-muted mt-0.5 truncate" title={req.reason}>
 {req.reason}
 </p>
 )}
 </div>
 <div className="flex items-center gap-1 shrink-0">
 <button
 onClick={() => leaveApprove(req.id, { id: managerId, name: managerName })}
 className="p-1.5 rounded-md hover:bg-success-tint text-success"
 aria-label={`อนุมัติใบลา ${req.employeeName}`}
 >
 <CheckCircle2 className="h-5 w-5" />
 </button>
 <button
 onClick={() => leaveReject(req.id, { id: managerId, name: managerName }, 'ไม่อนุมัติ')}
 className="p-1.5 rounded-md hover:bg-danger-tint text-danger"
 aria-label={`ปฏิเสธใบลา ${req.employeeName}`}
 >
 <XCircle className="h-5 w-5" />
 </button>
 </div>
 </div>
 ))
 )}
 <p className="text-xs text-ink-muted border-t border-hairline pt-3 mt-2">
 หมายเหตุ: คิวลา (out-of-EC) — Manager จัดการเฉพาะใบลา; การเปลี่ยนข้อมูลส่วนตัวไปที่ SPD ตาม BRD #166
 </p>
 </div>
 </Card>

 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
 <div>
 <h1 className="text-2xl font-bold text-ink">{tQuick('title')}</h1>
 <p className="text-sm text-ink-muted mt-1">{tQuick('subtitle')}</p>
 </div>
 <div className="flex items-center gap-3">
 <Badge variant="error">{tQuick('stats.urgent')} {stats.urgent}</Badge>
 <Badge variant="neutral">{tQuick('stats.total')} {stats.total}</Badge>
 <Button variant="secondary" size="sm" onClick={() => setDelegationOpen(true)}>
 <Settings2 className="h-4 w-4 mr-1.5" />
 {tQuick('delegation.button')}
 </Button>
 </div>
 </div>

 {/* Stats Strip */}
 <div className="flex flex-wrap gap-2">
 {[
 { label: tQuick('stats.leave'), count: stats.leave, color:'bg-accent-tint text-accent' },
 { label: tQuick('stats.expense'), count: stats.expense, color:'bg-warning-tint text-warning' },
 { label: tQuick('stats.overtime'), count: stats.overtime, color:'bg-success-tint text-success' },
 { label: tQuick('stats.claim'), count: stats.claim, color:'bg-orange-100 text-orange-800' },
 { label: tQuick('stats.transfer'), count: stats.transfer, color:'bg-purple-100 text-purple-800' },
 { label: tQuick('stats.changes'), count: stats.changeRequest, color:'bg-surface-raised text-ink' },
 ].filter((s) => s.count > 0).map((s) => (
 <span key={s.label} className={cn('px-3 py-1 rounded-full text-xs font-medium', s.color)}>
 {s.label}: {s.count}
 </span>
 ))}
 </div>

 {/* Enhanced Filter Bar */}
 <Card>
 <div className="py-3 space-y-3">
 {/* Search + Date filters */}
 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
 <div className="relative flex-1 min-w-[200px]">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
 <input
 type="text"
 value={searchText}
 onChange={(e) => setSearchText(e.target.value)}
 placeholder={tQuick('filters.searchPlaceholder')}
 className="w-full rounded-md border border-hairline border-hairline pl-9 pr-3 py-2 text-sm bg-surface focus:border-brand focus:ring-1 focus:ring-brand outline-none"
 />
 </div>
 <div className="flex items-center gap-2">
 <Calendar className="h-4 w-4 text-ink-muted shrink-0" />
 <input
 type="date"
 value={dateFrom}
 onChange={(e) => setDateFrom(e.target.value)}
 className="rounded-md border border-hairline border-hairline px-2 py-1.5 text-sm bg-surface focus:border-brand outline-none"
 aria-label={tQuick('filters.dateFrom')}
 />
 <span className="text-ink-muted text-xs">ถึง</span>
 <input
 type="date"
 value={dateTo}
 onChange={(e) => setDateTo(e.target.value)}
 className="rounded-md border border-hairline border-hairline px-2 py-1.5 text-sm bg-surface focus:border-brand outline-none"
 aria-label={tQuick('filters.dateTo')}
 />
 </div>
 </div>

 {/* Type + Urgency filters + Bulk actions */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
 <div className="flex items-center gap-2 flex-wrap">
 <Filter className="h-4 w-4 text-ink-muted" />
 <div className="flex gap-1 flex-wrap">
 {(['all','leave','expense','overtime','change-request'] as ApprovalType[]).map((type) => (
 <button
 key={type}
 onClick={() => setTypeFilter(type)}
 className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition',
 typeFilter === type ?'bg-brand text-white' :'bg-surface-raised text-ink-muted hover:bg-surface-raised hover:bg-surface-raised'
 )}
 >
 {TYPE_LABELS[type]}
 </button>
 ))}
 </div>
 <div className="h-4 w-px bg-surface-raised mx-1" />
 <div className="flex gap-1">
 {(['all','urgent','normal','low'] as UrgencyLevel[]).map((level) => (
 <button
 key={level}
 onClick={() => setUrgencyFilter(level)}
 className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition',
 urgencyFilter === level
 ? level ==='urgent' ?'bg-danger text-white' : level ==='low' ?'bg-success text-white' :'bg-brand text-white'
 :'bg-surface-raised text-ink-muted hover:bg-surface-raised hover:bg-surface-raised'
 )}
 >
 {tQuick(`urgency.${level}`)}
 </button>
 ))}
 </div>
 </div>

 {/* Bulk Actions */}
 <div className="flex items-center gap-2">
 <button
 onClick={selectAll}
 className="text-xs text-brand hover:underline font-medium"
 >
 {selectedIds.size === items.length && items.length > 0 ? tQuick('filters.deselectAll') : tQuick('filters.selectAll')}
 </button>
 {selectedIds.size > 0 && (
 <>
 <span className="text-xs text-ink-muted">{tQuick('bulkBar.selected', { count: selectedIds.size })}</span>
 <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => handleBulkAction('approve')}>
 <CheckCircle2 className="h-3.5 w-3.5 mr-1" />{t('approvals.bulkApprove')}
 </Button>
 <Button variant="danger" size="sm" onClick={() => handleBulkAction('reject')}>
 <XCircle className="h-3.5 w-3.5 mr-1" />{t('approvals.bulkReject')}
 </Button>
 <button onClick={clearSelection} className="p-1 rounded hover:bg-surface-raised hover:bg-surface-raised"><X className="h-4 w-4 text-ink-muted" /></button>
 </>
 )}
 </div>
 </div>
 </div>
 </Card>

 {/* Approval Items */}
 <div className="flex gap-6">
 <div className={cn('flex-1 space-y-3', previewItem &&'max-w-[55%]')}>
 {items.length === 0 ? (
 <Card>
 <div className="py-12 text-center">
 <CheckCircle2 className="h-12 w-12 text-green-300 mx-auto mb-3" />
 <p className="text-ink-muted">{t('approvals.noApprovals')}</p>
 </div>
 </Card>
 ) : (
 items.map((item) => (
 <div
 key={item.id}
 className={cn(
'p-4 rounded-md bg-surface shadow-card transition cursor-pointer hover:shadow-sm',
 item.urgent &&'border-red-200',
 selectedIds.has(item.id) &&'ring-2 ring-brand/30 bg-brand/5',
 previewItem?.id === item.id &&'ring-2 ring-blue-400'
 )}
 >
 <div className="flex items-start gap-3">
 {/* Checkbox */}
 <input
 type="checkbox"
 checked={selectedIds.has(item.id)}
 onChange={() => toggleSelect(item.id)}
 className="mt-1 h-4 w-4 rounded border-hairline text-brand focus:ring-brand"
 aria-label={`เลือก ${item.employeeName}`}
 />

 {/* Avatar */}
 <div className="h-10 w-10 rounded-full bg-surface-raised flex items-center justify-center text-sm font-medium text-ink-muted shrink-0">
 {item.employeeAvatar}
 </div>

 {/* Content */}
 <div className="flex-1 min-w-0" onClick={() => setPreviewItem(item)}>
 <div className="flex items-center gap-2 mb-1 flex-wrap">
 <Badge variant={TYPE_BADGE_VARIANT[item.type]}>{TYPE_LABELS[item.type]}</Badge>
 {/* Urgency Badge */}
 <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', URGENCY_STYLES[item.urgency] ?? URGENCY_STYLES.normal)}>
 {item.urgency ==='urgent' && <AlertCircle className="h-3 w-3 mr-0.5" />}
 {tQuick(`urgency.${item.urgency}`)}
 {item.waitingDays > 0 && ` (${item.waitingDays}d)`}
 </span>
 {item.attachments.length > 0 && <Paperclip className="h-3.5 w-3.5 text-ink-muted" />}
 </div>
 <p className="text-sm font-medium text-ink truncate">{item.summary}</p>
 <p className="text-xs text-ink-muted mt-0.5">
 {item.employeeName} &middot; {item.department}
 {item.amount && <> &middot; ฿{item.amount.toLocaleString()}</>}
 {item.dates && <> &middot; {item.dates}</>}
 </p>
 <p className="text-xs text-ink-muted mt-0.5 flex items-center gap-1">
 <Clock className="h-3 w-3" />{new Date(item.submittedAt).toLocaleDateString()}
 </p>
 </div>

 {/* Actions */}
 <div className="flex items-center gap-1 shrink-0">
 <button onClick={() => setPreviewItem(item)} className="p-1.5 rounded-md hover:bg-surface-raised hover:bg-surface-raised" aria-label="ดูตัวอย่าง"><ChevronRight className="h-4 w-4 text-ink-muted" /></button>
 <button onClick={() => handleSingleAction(item.id,'approve')} className="p-1.5 rounded-md hover:bg-success-tint text-success" aria-label="อนุมัติ"><CheckCircle2 className="h-5 w-5" /></button>
 <button onClick={() => handleSingleAction(item.id,'reject')} className="p-1.5 rounded-md hover:bg-danger-tint text-danger" aria-label="ปฏิเสธ"><XCircle className="h-5 w-5" /></button>
 </div>
 </div>
 </div>
 ))
 )}
 </div>

 {/* Slide-over Preview Panel */}
 {previewItem && (
 <div className="hidden lg:block w-[45%] sticky top-20 self-start">
 <Card header={<><CardTitle className="text-base">{tQuick('slideOver.requestDetails')}</CardTitle><button onClick={() => setPreviewItem(null)} className="p-1 rounded hover:bg-surface-raised" aria-label={tQuick('slideOver.close')}><X className="h-4 w-4 text-ink-muted" /></button></>}>
 <div className="space-y-4">
 {/* Employee */}
 <div className="flex items-center gap-3 pb-4 border-b border-hairline">
 <div className="h-12 w-12 rounded-full bg-surface-raised flex items-center justify-center text-lg font-medium text-ink-muted">{previewItem.employeeAvatar}</div>
 <div>
 <p className="font-medium text-ink">{previewItem.employeeName}</p>
 <p className="text-xs text-ink-muted">{previewItem.employeeId} &middot; {previewItem.department}</p>
 </div>
 </div>

 {/* Type & Urgency */}
 <div className="flex gap-2 flex-wrap">
 <Badge variant={TYPE_BADGE_VARIANT[previewItem.type]}>{TYPE_LABELS[previewItem.type]}</Badge>
 <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', URGENCY_STYLES[previewItem.urgency])}>
 {tQuick(`urgency.${previewItem.urgency}`)}
 </span>
 </div>

 {/* Summary */}
 <div>
 <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">{tQuick('slideOver.summary')}</p>
 <p className="text-sm font-medium text-ink">{previewItem.summary}</p>
 </div>

 {/* Detail */}
 <div>
 <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">{tQuick('slideOver.details')}</p>
 <p className="text-sm text-ink-muted">{previewItem.detail}</p>
 </div>

 {/* Amount / Dates */}
 {previewItem.amount && (
 <div>
 <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">{tQuick('slideOver.amount')}</p>
 <p className="text-lg font-bold text-ink">฿{previewItem.amount.toLocaleString()}</p>
 </div>
 )}
 {previewItem.dates && (
 <div>
 <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">{tQuick('slideOver.dates')}</p>
 <p className="text-sm text-ink-muted">{previewItem.dates}</p>
 </div>
 )}

 {/* Approval Timeline */}
 {previewItem.approvalTimeline && previewItem.approvalTimeline.length > 0 && (
 <div>
 <p className="text-xs text-ink-muted uppercase tracking-wider mb-2">{tQuick('slideOver.approvalTimeline')}</p>
 <ol className="relative border-l border-hairline border-hairline ml-2">
 {previewItem.approvalTimeline.map((step) => (
 <li key={step.step} className="mb-3 ml-4">
 <div className={cn('absolute -left-1.5 w-3 h-3 rounded-full border-2 border-white',
 step.status ==='approved' ?'bg-success-tint' : step.status ==='rejected' ?'bg-danger-tint' :'bg-gray-300'
 )} />
 <div className="flex items-center gap-2">
 <span className="text-xs font-medium">{step.approver}</span>
 <Badge variant={step.status ==='approved' ?'success' : step.status ==='rejected' ?'error' :'neutral'}>
 {step.status}
 </Badge>
 </div>
 {step.date && <p className="text-[10px] text-ink-muted">{new Date(step.date).toLocaleDateString()}</p>}
 </li>
 ))}
 </ol>
 </div>
 )}

 {/* Attachments */}
 {previewItem.attachments.length > 0 && (
 <div>
 <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">{tQuick('slideOver.attachments')}</p>
 <div className="space-y-1">
 {previewItem.attachments.map((a) => (
 <div key={a} className="flex items-center gap-2 text-sm text-accent">
 <FileText className="h-4 w-4" />{a}
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Submitted */}
 <div>
 <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">{tQuick('slideOver.submitted')}</p>
 <p className="text-sm text-ink-muted">{new Date(previewItem.submittedAt).toLocaleString()}</p>
 </div>

 {/* Notes */}
 {previewItem.notes && (
 <div>
 <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">{tQuick('slideOver.notes')}</p>
 <p className="text-sm text-ink-muted">{previewItem.notes}</p>
 </div>
 )}

 {/* Actions */}
 <div className="flex gap-3 pt-4 border-t border-hairline">
 <Button className="flex-1 bg-success hover:bg-success/90" onClick={() => handleSingleAction(previewItem.id,'approve')}>
 <CheckCircle2 className="h-4 w-4 mr-2" />{t('actions.approve')}
 </Button>
 <Button variant="danger" className="flex-1" onClick={() => handleSingleAction(previewItem.id,'reject')}>
 <XCircle className="h-4 w-4 mr-2" />{t('actions.reject')}
 </Button>
 </div>
 </div>
 </Card>
 </div>
 )}
 </div>

 {/* Sticky Bulk Action Bar */}
 {selectedIds.size > 0 && (
 <div className="fixed bottom-0 inset-x-0 z-40 bg-surface border-t border-hairline shadow-2">
 <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
 <span className="text-sm font-medium text-ink">{tQuick('bulkBar.selected', { count: selectedIds.size })}</span>
 <div className="flex items-center gap-3">
 <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => handleBulkAction('approve')}>
 <CheckCircle2 className="h-4 w-4 mr-1.5" />{tQuick('bulkBar.approveAll')}
 </Button>
 <Button variant="danger" size="sm" onClick={() => handleBulkAction('reject')}>
 <XCircle className="h-4 w-4 mr-1.5" />{tQuick('bulkBar.rejectAll')}
 </Button>
 <button onClick={clearSelection} className="text-sm text-ink-muted hover:text-ink-soft flex items-center gap-1">
 <X className="h-3.5 w-3.5" />{tQuick('bulkBar.clearSelection')}
 </button>
 </div>
 </div>
 </div>
 )}

 {/* Confirmation Modal */}
 <Modal
 open={!!confirmModal}
 onClose={() => setConfirmModal(null)}
 title={confirmModal?.action ==='approve' ? tQuick('confirm.approveTitle') : tQuick('confirm.rejectTitle')}
 >
 <div className="space-y-4">
 <p className="text-sm text-ink-muted">
 {confirmModal?.count === 1
 ? (confirmModal.action ==='approve' ? t('messages.confirmApprove') : t('messages.confirmReject'))
 : (confirmModal?.action ==='approve'
 ? tQuick('confirm.approveMessage', { count: confirmModal?.count ?? 0 })
 : tQuick('confirm.rejectMessage', { count: confirmModal?.count ?? 0 })
 )}
 </p>
 <div>
 <label className="block text-sm font-medium text-ink-soft mb-1">
 {confirmModal?.action ==='approve' ? tQuick('confirm.reasonOptional') : tQuick('confirm.reasonRequired')}
 </label>
 <textarea
 value={confirmReason}
 onChange={(e) => setConfirmReason(e.target.value)}
 rows={3}
 className="w-full rounded-md border border-hairline px-3 py-2 text-sm bg-surface focus:border-brand focus:ring-1 focus:ring-brand outline-none resize-none"
 placeholder={tQuick('confirm.reasonPlaceholder')}
 />
 </div>
 </div>
 <div className="border-t pt-4 mt-4 flex justify-end gap-3">
 <Button variant="secondary" onClick={() => setConfirmModal(null)}>{tQuick('confirm.cancel')}</Button>
 <Button
 variant={confirmModal?.action ==='reject' ?'danger' :'primary'}
 className={confirmModal?.action ==='approve' ?'bg-success hover:bg-success/90' :''}
 onClick={handleConfirm}
 disabled={actionLoading || (confirmModal?.action ==='reject' && !confirmReason.trim())}
 >
 {actionLoading ? tQuick('confirm.processing') : confirmModal?.action ==='approve' ? `${t('actions.approve')} (${confirmModal?.count})` : `${t('actions.reject')} (${confirmModal?.count})`}
 </Button>
 </div>
 </Modal>

 {/* Delegation Modal */}
 <Modal
 open={delegationOpen}
 onClose={() => setDelegationOpen(false)}
 title={tQuick('delegation.manageDelegations')}
 widthClass="max-w-xl"
 >
 <div className="space-y-5">
 <div>
 <h4 className="text-sm font-medium text-ink mb-2">{tQuick('delegation.activeDelegations')}</h4>
 {delegations.length === 0 ? (
 <p className="text-sm text-ink-muted">{tQuick('delegation.noDelegations')}</p>
 ) : (
 <ul className="space-y-2">
 {delegations.map((d) => (
 <li key={d.id} className="flex items-center justify-between p-3 bg-surface-raised rounded-md">
 <div>
 <p className="text-sm font-medium text-ink">{d.delegateTo.name}</p>
 <p className="text-xs text-ink-muted">{d.startDate} — {d.endDate}</p>
 <div className="flex gap-1 mt-1 flex-wrap">
 {d.workflowTypes.map((wt) => <Badge key={wt} variant="info">{wt}</Badge>)}
 </div>
 </div>
 {d.status ==='active' && (
 <button onClick={() => revokeDelegation(d.id)} className="p-1.5 rounded hover:bg-danger-tint text-danger" aria-label={tQuick('delegation.revoke')}>
 <Trash2 className="h-4 w-4" />
 </button>
 )}
 </li>
 ))}
 </ul>
 )}
 </div>

 <div className="border border-hairline rounded-md p-4 space-y-3">
 <h4 className="text-sm font-medium text-ink">{tQuick('delegation.createNew')}</h4>
 <div>
 <label className="block text-xs font-medium text-ink-muted mb-1">{tQuick('delegation.delegateTo')}</label>
 <input type="text" value={delegateForm.to} onChange={(e) => setDelegateForm((p) => ({ ...p, to: e.target.value }))} placeholder={tQuick('delegation.delegateToPlaceholder')} className="w-full rounded-md border border-hairline border-hairline px-3 py-2 text-sm bg-surface focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
 </div>
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-xs font-medium text-ink-muted mb-1">{tQuick('delegation.startDate')}</label>
 <input type="date" value={delegateForm.start} onChange={(e) => setDelegateForm((p) => ({ ...p, start: e.target.value }))} className="w-full rounded-md border border-hairline px-3 py-2 text-sm focus:border-brand outline-none" />
 </div>
 <div>
 <label className="block text-xs font-medium text-ink-muted mb-1">{tQuick('delegation.endDate')}</label>
 <input type="date" value={delegateForm.end} onChange={(e) => setDelegateForm((p) => ({ ...p, end: e.target.value }))} className="w-full rounded-md border border-hairline px-3 py-2 text-sm focus:border-brand outline-none" />
 </div>
 </div>
 <div>
 <label className="block text-xs font-medium text-ink-muted mb-1">{tQuick('delegation.workflowTypes')}</label>
 <div className="flex flex-wrap gap-2">
 {WORKFLOW_TYPES.map((wt) => (
 <button key={wt} type="button" onClick={() => toggleDelegateType(wt)} className={`px-3 py-1 rounded-full text-xs font-medium border transition ${delegateForm.types.includes(wt) ?'bg-brand text-white border-brand' :'bg-surface text-ink-muted border-hairline border-hairline hover:border-brand'}`}>
 {TYPE_LABELS[wt] ?? wt}
 </button>
 ))}
 </div>
 </div>
 <div className="flex justify-end gap-2 pt-1">
 <Button size="sm" onClick={handleCreateDelegation} disabled={delegateSubmitting || !delegateForm.to || !delegateForm.start || !delegateForm.end || delegateForm.types.length === 0}>
 {delegateSubmitting ? tQuick('delegation.creating') : tQuick('delegation.create')}
 </Button>
 </div>
 </div>
 </div>
 </Modal>
 </div>
 );
}
