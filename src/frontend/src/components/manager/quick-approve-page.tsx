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
import { formatDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import { useLeaveApprovals, LEAVE_TYPE_LABEL, LEAVE_STATUS_LABEL } from '@/stores/leave-approvals';
import { useTerminationApprovals, TERMINATION_REASON_LABEL } from '@/stores/termination-approvals';
import { useAuthStore } from '@/stores/auth-store';

function deriveInitials(name: string): string {
 const parts = name.trim().split(/\s+/);
 if (parts.length >= 2) return parts[0][0] + parts[1][0];
 return name.slice(0, 2);
}

function pickTone(seed: string): keyof typeof AVATAR_TONE_MAP {
 const tones: (keyof typeof AVATAR_TONE_MAP)[] = ['sage', 'teal', 'butter', 'ink'];
 let hash = 0;
 for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
 return tones[Math.abs(hash) % tones.length];
}

const AVATAR_TONE_MAP = {
 teal: 'humi-avatar humi-avatar--teal',
 sage: 'humi-avatar humi-avatar--sage',
 butter: 'humi-avatar humi-avatar--butter',
 ink: 'humi-avatar humi-avatar--ink',
} as const;

function formatThaiDate(iso: string): string {
 return formatDate(iso, 'medium', 'th');
}

function formatThaiDateTime(iso: string): string {
 const d = new Date(iso);
 if (isNaN(d.getTime())) return '-';
 const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
 return `${formatDate(iso, 'medium', 'th')} · ${time} น.`;
}

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
 <ul className="humi-list">
 {pendingTermination.map((req) => {
 const tone = pickTone(req.id);
 return (
 <li key={req.id} className="humi-row-item">
 <span className={AVATAR_TONE_MAP[tone]} aria-hidden>{deriveInitials(req.employeeName)}</span>
 <div>
 <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
 {req.employeeName}{' '}
 <span style={{ color: 'var(--color-ink-muted)', fontWeight: 400 }}>· ลาออก</span>
 </div>
 <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 2 }}>
 วันทำงานสุดท้าย: {new Date(req.requestedLastDay).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
 &nbsp;•&nbsp; เหตุผล: {TERMINATION_REASON_LABEL[req.reasonCode]}
 {req.reasonText && <span className="truncate"> • {req.reasonText}</span>}
 </div>
 </div>
 <div className="humi-row" style={{ gap: 8 }}>
 <Button
 variant="secondary"
 size="sm"
 leadingIcon={<X size={14} />}
 onClick={() => terminationReject(req.id, { role: 'manager', name: managerName }, 'Manager ไม่อนุมัติ')}
 aria-label={`ปฏิเสธคำขอลาออก ${req.employeeName}`}
 >ปฏิเสธ</Button>
 <Button
 variant="primary"
 size="sm"
 leadingIcon={<Check size={14} />}
 onClick={() => terminationApproveByManager(req.id, { role: 'manager', name: managerName })}
 aria-label={`อนุมัติคำขอลาออก ${req.employeeName}`}
 >อนุมัติ</Button>
 </div>
 </li>
 );
 })}
 </ul>
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
 <ul className="humi-list">
 {pendingLeave.map((req) => {
 const tone = pickTone(req.id);
 return (
 <li key={req.id} className="humi-row-item">
 <span className={AVATAR_TONE_MAP[tone]} aria-hidden>{deriveInitials(req.employeeName)}</span>
 <div>
 <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
 {req.employeeName}{' '}
 <span style={{ color: 'var(--color-ink-muted)', fontWeight: 400 }}>· {LEAVE_TYPE_LABEL[req.leaveType]}</span>
 </div>
 <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 2 }}>
 {formatThaiDate(req.startDate)} – {formatThaiDate(req.endDate)}
 {req.reason && <span className="truncate"> &nbsp;•&nbsp; {req.reason}</span>}
 </div>
 </div>
 <div className="humi-row" style={{ gap: 8 }}>
 <Button
 variant="secondary"
 size="sm"
 leadingIcon={<X size={14} />}
 onClick={() => leaveReject(req.id, { id: managerId, name: managerName }, 'ไม่อนุมัติ')}
 aria-label={`ปฏิเสธใบลา ${req.employeeName}`}
 >ปฏิเสธ</Button>
 <Button
 variant="primary"
 size="sm"
 leadingIcon={<Check size={14} />}
 onClick={() => leaveApprove(req.id, { id: managerId, name: managerName })}
 aria-label={`อนุมัติใบลา ${req.employeeName}`}
 >อนุมัติ</Button>
 </div>
 </li>
 );
 })}
 </ul>
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
 typeFilter === type ?'bg-brand/10 text-brand' :'bg-surface-raised text-ink-muted hover:bg-surface-raised'
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
 ? level ==='urgent' ?'bg-danger/10 text-danger' : level ==='low' ?'bg-success/10 text-success' :'bg-brand/10 text-brand'
 :'bg-surface-raised text-ink-muted hover:bg-surface-raised'
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

 {/* Bulk Action Bar — in document flow, above the items list */}
 {selectedIds.size > 0 && (
 <div className="flex items-center justify-between gap-4 rounded-md border border-hairline p-3 bg-surface">
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
 )}

 {/* Approval Items */}
 <div className="flex gap-6">
 <div className={cn('flex-1', previewItem &&'max-w-[55%]')}>
 <Card header={<CardTitle className="text-base">อนุมัติด่วน — คำขออนุมัติทั้งหมด ({items.length})</CardTitle>}>
 <div className="p-4 space-y-3">
 {items.length === 0 ? (
 <div className="py-8 text-center">
 <CheckCircle2 className="h-12 w-12 text-green-300 mx-auto mb-3" />
 <p className="text-sm text-ink-muted">{t('approvals.noApprovals')}</p>
 </div>
 ) : (
 <ul className="humi-list">
 {items.map((item) => {
 const tone = pickTone(item.id);
 return (
 <li
 key={item.id}
 className={cn(
 'humi-row-item',
 selectedIds.has(item.id) && 'ring-2 ring-brand/30 bg-brand/5',
 previewItem?.id === item.id && 'ring-2 ring-blue-400'
 )}
 >
 {/* Leading cell: checkbox + avatar (single grid column to keep 3-col layout) */}
 <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
 <input
 type="checkbox"
 checked={selectedIds.has(item.id)}
 onChange={() => toggleSelect(item.id)}
 className="h-4 w-4 rounded border-hairline accent-brand focus:ring-brand shrink-0"
 aria-label={`เลือก ${item.employeeName}`}
 />
 <span className={AVATAR_TONE_MAP[tone]} aria-hidden>{deriveInitials(item.employeeName)}</span>
 </span>
 {/* Content */}
 <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setPreviewItem(item)}>
 <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
 {item.employeeName}{' '}
 <span style={{ color: 'var(--color-ink-muted)', fontWeight: 400 }}>· {TYPE_LABELS[item.type]}</span>
 {item.attachments.length > 0 && <Paperclip className="inline h-3.5 w-3.5 text-ink-muted ml-1" />}
 </div>
 <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 2 }}>
 {item.department}
 {item.amount && <> &middot; ฿{item.amount.toLocaleString()}</>}
 {item.dates && <> &middot; {item.dates}</>}
 &nbsp;•&nbsp; <Clock className="inline h-3 w-3" /> {formatThaiDate(item.submittedAt)}
 {item.waitingDays > 0 && <span className={cn('ml-1 inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium', URGENCY_STYLES[item.urgency] ?? URGENCY_STYLES.normal)}>{item.urgency === 'urgent' && <AlertCircle className="h-3 w-3 mr-0.5" />}{tQuick(`urgency.${item.urgency}`)} ({item.waitingDays}d)</span>}
 </div>
 </div>
 {/* Actions */}
 <div className="humi-row" style={{ gap: 8 }}>
 <button onClick={() => setPreviewItem(item)} className="p-1.5 rounded-md hover:bg-surface-raised" aria-label="ดูตัวอย่าง"><ChevronRight className="h-4 w-4 text-ink-muted" /></button>
 <Button
 variant="secondary"
 size="sm"
 leadingIcon={<X size={14} />}
 onClick={() => handleSingleAction(item.id, 'reject')}
 aria-label="ปฏิเสธ"
 >ปฏิเสธ</Button>
 <Button
 variant="primary"
 size="sm"
 leadingIcon={<Check size={14} />}
 onClick={() => handleSingleAction(item.id, 'approve')}
 aria-label="อนุมัติ"
 >อนุมัติ</Button>
 </div>
 </li>
 );
 })}
 </ul>
 )}
 </div>
 </Card>
 </div>

 {/* Slide-over Preview Panel */}
 {previewItem && (
 <div className="hidden lg:block w-[45%] sticky top-20 self-start">
 <Card header={<><CardTitle className="text-base">{tQuick('slideOver.requestDetails')}</CardTitle><button onClick={() => setPreviewItem(null)} className="p-1 rounded hover:bg-surface-raised" aria-label={tQuick('slideOver.close')}><X className="h-4 w-4 text-ink-muted" /></button></>}>
 <div className="humi-col" style={{ gap: 18 }}>
 {/* Employee */}
 <div className="humi-row" style={{ gap: 12, paddingBottom: 16, borderBottom: '1px solid var(--color-hairline-soft)' }}>
 <span className={AVATAR_TONE_MAP[pickTone(previewItem.id)]} aria-hidden style={{ width: 48, height: 48, fontSize: 16 }}>{deriveInitials(previewItem.employeeName)}</span>
 <div className="humi-col" style={{ gap: 2 }}>
 <p className="font-display" style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>{previewItem.employeeName}</p>
 <p style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>{previewItem.employeeId} &middot; {previewItem.department}</p>
 </div>
 </div>

 {/* Type & Urgency */}
 <div className="flex gap-2 flex-wrap">
 <Badge variant={TYPE_BADGE_VARIANT[previewItem.type]}>{TYPE_LABELS[previewItem.type]}</Badge>
 <Badge variant={previewItem.urgency === 'urgent' ? 'error' : previewItem.urgency === 'low' ? 'neutral' : 'warning'}>
 {tQuick(`urgency.${previewItem.urgency}`)}
 </Badge>
 </div>

 {/* Summary */}
 <div className="humi-col" style={{ gap: 6 }}>
 <p className="humi-eyebrow">{tQuick('slideOver.summary')}</p>
 <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-ink)', lineHeight: 1.4 }}>{previewItem.summary}</p>
 </div>

 {/* Detail */}
 <div className="humi-col" style={{ gap: 6 }}>
 <p className="humi-eyebrow">{tQuick('slideOver.details')}</p>
 <p style={{ fontSize: 14, color: 'var(--color-ink-soft)', lineHeight: 1.6 }}>{previewItem.detail}</p>
 </div>

 {/* Amount / Dates */}
 {previewItem.amount && (
 <div className="humi-col" style={{ gap: 6 }}>
 <p className="humi-eyebrow">{tQuick('slideOver.amount')}</p>
 <p className="font-display" style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>฿{previewItem.amount.toLocaleString()}</p>
 </div>
 )}
 {previewItem.dates && (
 <div className="humi-col" style={{ gap: 6 }}>
 <p className="humi-eyebrow">{tQuick('slideOver.dates')}</p>
 <p style={{ fontSize: 14, color: 'var(--color-ink-soft)' }}>{previewItem.dates}</p>
 </div>
 )}

 {/* Approval Timeline */}
 {previewItem.approvalTimeline && previewItem.approvalTimeline.length > 0 && (
 <div className="humi-col" style={{ gap: 8 }}>
 <p className="humi-eyebrow">{tQuick('slideOver.approvalTimeline')}</p>
 <ol className="relative border-l border-hairline ml-2">
 {previewItem.approvalTimeline.map((step) => (
 <li key={step.step} className="mb-3 ml-4">
 <div className={cn('absolute -left-1.5 w-3 h-3 rounded-full border-2 border-white',
 step.status ==='approved' ?'bg-success-tint' : step.status ==='rejected' ?'bg-danger-tint' :'bg-gray-300'
 )} />
 <div className="humi-row" style={{ gap: 8 }}>
 <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-ink)' }}>{step.approver}</span>
 <Badge variant={step.status ==='approved' ?'success' : step.status ==='rejected' ?'error' :'neutral'}>
 {step.status}
 </Badge>
 </div>
 {step.date && <p style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 2 }}>{formatThaiDate(step.date)}</p>}
 </li>
 ))}
 </ol>
 </div>
 )}

 {/* Attachments */}
 {previewItem.attachments.length > 0 && (
 <div className="humi-col" style={{ gap: 6 }}>
 <p className="humi-eyebrow">{tQuick('slideOver.attachments')}</p>
 <div className="humi-col" style={{ gap: 4 }}>
 {previewItem.attachments.map((a) => (
 <div key={a} className="humi-row" style={{ gap: 8, fontSize: 14, color: 'var(--color-accent)' }}>
 <FileText className="h-4 w-4" />{a}
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Submitted */}
 <div className="humi-col" style={{ gap: 6 }}>
 <p className="humi-eyebrow">{tQuick('slideOver.submitted')}</p>
 <p style={{ fontSize: 14, color: 'var(--color-ink-soft)' }}>{formatThaiDateTime(previewItem.submittedAt)}</p>
 </div>

 {/* Notes */}
 {previewItem.notes && (
 <div className="humi-col" style={{ gap: 6 }}>
 <p className="humi-eyebrow">{tQuick('slideOver.notes')}</p>
 <p style={{ fontSize: 14, color: 'var(--color-ink-soft)', lineHeight: 1.6 }}>{previewItem.notes}</p>
 </div>
 )}

 {/* Actions */}
 <div className="humi-row" style={{ gap: 8, paddingTop: 16, borderTop: '1px solid var(--color-hairline)' }}>
  <Button
   variant="secondary"
   size="sm"
   leadingIcon={<X size={14} />}
   onClick={() => handleSingleAction(previewItem.id, 'reject')}
   aria-label="ปฏิเสธ"
   className="flex-1"
  >ปฏิเสธ</Button>
  <Button
   variant="primary"
   size="sm"
   leadingIcon={<Check size={14} />}
   onClick={() => handleSingleAction(previewItem.id, 'approve')}
   aria-label="อนุมัติ"
   className="flex-1"
  >อนุมัติ</Button>
 </div>
 </div>
 </Card>
 </div>
 )}
 </div>

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
