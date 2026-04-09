'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
 CheckCircle,
 XCircle,
 Clock,
 RotateCcw,
 ArrowRight,
 Calendar,
 ArrowRightLeft,
 DollarSign,
 FileText,
 Briefcase,
} from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/date';
import type { WorkflowItem, WorkflowStatus, WorkflowStep, WorkflowType } from '@/hooks/use-workflows';

const STATUS_VARIANTS: Record<WorkflowStatus,'warning' |'success' |'error' |'info' |'neutral'> = {
 pending:'warning',
 approved:'success',
 rejected:'error',
 sent_back:'info',
};

const TYPE_ICONS: Record<WorkflowType, React.ReactNode> = {
 leave: <Calendar className="h-5 w-5" />,
 overtime: <Clock className="h-5 w-5" />,
 time_correction: <Clock className="h-5 w-5" />,
 transfer: <ArrowRightLeft className="h-5 w-5" />,
 payroll_change: <DollarSign className="h-5 w-5" />,
 personal_info: <FileText className="h-5 w-5" />,
 resignation: <Briefcase className="h-5 w-5" />,
};

const TYPE_COLORS: Record<WorkflowType, string> = {
 leave:'text-success bg-success-tint',
 overtime:'text-warning bg-warning-tint',
 time_correction:'text-info bg-info-tint',
 transfer:'text-accent bg-accent-tint',
 payroll_change:'text-accent bg-accent-tint',
 personal_info:'text-accent bg-accent-tint',
 resignation:'text-danger bg-danger-tint',
};

function StepTimeline({ steps, currentStep }: { steps: WorkflowStep[]; currentStep: number }) {
 const t = useTranslations('workflow');
 const pathname = usePathname();
 const locale = pathname.startsWith('/th') ?'th' :'en';

 const dotClass = (status: WorkflowStep['status'], isCurrent: boolean) => {
 if (status ==='approved') return 'bg-success';
 if (status ==='rejected') return 'bg-danger';
 if (status ==='sent_back') return 'bg-warning';
 if (status ==='skipped') return 'bg-hairline';
 if (isCurrent) return 'bg-brand ring-2 ring-brand ring-offset-2';
 return 'border-2 border-hairline bg-surface';
 };

 const stepBadgeVariant = (status: WorkflowStep['status']):'success' |'error' |'warning' |'neutral' |'info' => {
 switch (status) {
 case'approved': return'success';
 case'rejected': return'error';
 case'sent_back': return'warning';
 default: return'neutral';
 }
 };

 const stepStatusLabel = (status: WorkflowStep['status']) => {
 switch (status) {
 case'approved': return t('approved');
 case'rejected': return t('rejected');
 case'sent_back': return t('sentBack');
 case'skipped': return'Skipped';
 default: return t('pending');
 }
 };

 return (
 <div className="space-y-0">
 {steps.map((step, idx) => {
 const isLast = idx === steps.length - 1;
 const isCurrent = idx === currentStep - 1 && step.status ==='pending';

 return (
 <div key={step.step} className="flex gap-3">
 <div className="flex flex-col items-center">
 <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${dotClass(step.status, isCurrent)}`} />
 {!isLast && <div className="w-px flex-1 min-h-[1.75rem] bg-hairline my-1" />}
 </div>

 <div className="pb-4 flex-1 min-w-0">
 <div className="flex flex-wrap items-center gap-2 mb-0.5">
 <p className="text-sm font-medium text-ink">
 {t('step')} {step.step}: {step.approverName}
 </p>
 <Badge variant={stepBadgeVariant(step.status)}>
 {stepStatusLabel(step.status)}
 </Badge>
 </div>
 {step.actionDate && (
 <p className="text-xs text-ink-muted mb-1">
 {formatDate(step.actionDate,'medium', locale)}{' '}
 {new Date(step.actionDate).toLocaleTimeString(locale ==='th' ?'th-TH' :'en-US', {
 timeStyle:'short',
 })}
 </p>
 )}
 {step.comment && (
 <p className="text-xs text-ink-muted bg-surface-raised rounded-md px-3 py-2 italic border-l-2 border-warning">
 &ldquo;{step.comment}&rdquo;
 </p>
 )}
 </div>
 </div>
 );
 })}
 </div>
 );
}

interface WorkflowDetailModalProps {
 workflow: WorkflowItem | null;
 open: boolean;
 onClose: () => void;
 onApprove?: (id: string, comment?: string) => Promise<void>;
 onReject?: (id: string, comment?: string) => Promise<void>;
 onSendBack?: (id: string, comment?: string) => Promise<void>;
}

type ActionMode = null |'approve' |'reject' |'sendBack';

export function WorkflowDetailModal({
 workflow,
 open,
 onClose,
 onApprove,
 onReject,
 onSendBack,
}: WorkflowDetailModalProps) {
 const t = useTranslations('workflow');
 const pathname = usePathname();
 const locale = pathname.startsWith('/th') ?'th' :'en';

 const [actionMode, setActionMode] = useState<ActionMode>(null);
 const [reason, setReason] = useState('');
 const [submitting, setSubmitting] = useState(false);

 if (!workflow) return null;

 const isPending = workflow.status ==='pending';
 const icon = TYPE_ICONS[workflow.type] ?? <FileText className="h-5 w-5" />;
 const colorClass = TYPE_COLORS[workflow.type] ??'text-ink-muted bg-surface-raised';

 const getStatusLabel = (status: WorkflowStatus) => {
 switch (status) {
 case'pending': return t('pending');
 case'approved': return t('approved');
 case'rejected': return t('rejected');
 case'sent_back': return t('sentBack');
 default: return status;
 }
 };

 const handleClose = () => {
 setActionMode(null);
 setReason('');
 onClose();
 };

 const handleConfirmAction = async () => {
 if (!actionMode) return;
 setSubmitting(true);
 try {
 if (actionMode ==='approve' && onApprove) {
 await onApprove(workflow.id, reason || undefined);
 } else if (actionMode ==='reject' && onReject) {
 await onReject(workflow.id, reason || undefined);
 } else if (actionMode ==='sendBack' && onSendBack) {
 await onSendBack(workflow.id, reason || undefined);
 }
 handleClose();
 } finally {
 setSubmitting(false);
 }
 };

 const actionLabels: Record<NonNullable<ActionMode>, string> = {
 approve: t('approve'),
 reject: t('reject'),
 sendBack: t('sendBack'),
 };

 const confirmBtnClass =
 actionMode ==='approve'
 ?'bg-success hover:bg-success/90 text-white focus-visible:ring-success'
 : actionMode ==='sendBack'
 ?'border border-warning text-warning hover:bg-warning-tint focus-visible:ring-warning'
 : actionMode ==='reject'
 ?'border border-danger text-danger hover:bg-danger-tint focus-visible:ring-danger'
 : undefined;

 const footer = actionMode ? (
 <div className="space-y-3">
 <div>
 <label className="block text-sm font-medium text-ink-soft mb-1.5">
 {t('reason')}
 {actionMode !=='approve' && <span className="text-danger ml-1">*</span>}
 </label>
 <textarea
 className="w-full rounded-md border border-hairline px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-none"
 rows={3}
 placeholder={`Enter reason for ${actionLabels[actionMode].toLowerCase()}...`}
 value={reason}
 onChange={(e) => setReason(e.target.value)}
 autoFocus
 />
 </div>
 <div className="flex gap-2 justify-end">
 <Button
 variant="outline"
 size="sm"
 onClick={() => { setActionMode(null); setReason(''); }}
 disabled={submitting}
 >
 Cancel
 </Button>
 <Button
 size="sm"
 disabled={submitting || (actionMode !=='approve' && !reason.trim())}
 className={confirmBtnClass}
 variant={actionMode ==='approve' ?'default' :'outline'}
 onClick={handleConfirmAction}
 >
 {submitting ?'Processing...' : `Confirm ${actionLabels[actionMode]}`}
 </Button>
 </div>
 </div>
 ) : isPending && (onApprove || onReject || onSendBack) ? (
 <div className="flex flex-wrap gap-2 justify-end">
 {onSendBack && (
 <Button
 size="sm"
 variant="outline"
 className="border-warning text-warning hover:bg-warning-tint focus-visible:ring-warning"
 onClick={() => setActionMode('sendBack')}
 >
 <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
 {t('sendBack')}
 </Button>
 )}
 {onReject && (
 <Button
 size="sm"
 variant="outline"
 className="border-danger text-danger hover:bg-danger-tint focus-visible:ring-danger"
 onClick={() => setActionMode('reject')}
 >
 <XCircle className="h-3.5 w-3.5 mr-1.5" />
 {t('reject')}
 </Button>
 )}
 {onApprove && (
 <Button
 size="sm"
 className="bg-success hover:bg-success/90 text-white focus-visible:ring-success"
 onClick={() => setActionMode('approve')}
 >
 <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
 {t('approve')}
 </Button>
 )}
 </div>
 ) : (
 <div className="flex justify-end">
 <Button variant="outline" size="sm" onClick={handleClose}>
 Close
 </Button>
 </div>
 );

 const initials = workflow.requesterName
 .split(' ')
 .slice(0, 2)
 .map((w) => w[0])
 .join('')
 .toUpperCase();

 return (
 <Modal
 open={open}
 onClose={handleClose}
 title={`${workflow.typeLabel} — ${workflow.id}`}
 footer={footer}
 className="max-w-2xl"
 >
 <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
 {/* Header: type icon + status */}
 <div className="flex items-center gap-3">
 <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
 {icon}
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="font-semibold text-ink truncate">{workflow.typeLabel}</h3>
 <p className="text-sm text-ink-muted">{workflow.department}</p>
 </div>
 <Badge variant={STATUS_VARIANTS[workflow.status]}>
 {getStatusLabel(workflow.status)}
 </Badge>
 </div>

 {/* Requester + meta — compact inline layout */}
 <div className="rounded-lg bg-surface p-4" style={{ boxShadow:'var(--shadow-card)' }}>
 <div className="flex items-center gap-3 mb-3">
 <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
 <span className="text-xs font-semibold text-brand">{initials}</span>
 </div>
 <div className="min-w-0">
 <p className="text-sm font-medium text-ink leading-tight">{workflow.requesterName}</p>
 <p className="text-xs text-ink-muted">{workflow.department} · {workflow.requesterId}</p>
 </div>
 </div>
 <div className="grid grid-cols-3 gap-3 text-sm">
 <div>
 <p className="text-xs text-ink-muted mb-0.5">{t('requestDate')}</p>
 <p className="font-medium text-ink text-xs">
 {formatDate(workflow.submittedDate,'medium', locale)}
 </p>
 </div>
 {workflow.effectiveDate && (
 <div>
 <p className="text-xs text-ink-muted mb-0.5">Effective Date</p>
 <p className="font-medium text-ink text-xs">
 {formatDate(workflow.effectiveDate,'medium', locale)}
 </p>
 </div>
 )}
 <div>
 <p className="text-xs text-ink-muted mb-0.5">{t('currentStep')}</p>
 <p className="font-medium text-ink text-xs">
 {workflow.currentStep} / {workflow.totalSteps}
 </p>
 </div>
 </div>
 </div>

 {/* Description */}
 <div className="rounded-lg bg-surface p-4" style={{ boxShadow:'var(--shadow-card)' }}>
 <p className="text-xs text-ink-muted mb-1.5">{t('description')}</p>
 <p className="text-sm text-ink">{workflow.description}</p>
 </div>

 {/* Additional details */}
 {workflow.details && Object.keys(workflow.details).length > 0 && (
 <div className="rounded-lg bg-surface p-4" style={{ boxShadow:'var(--shadow-card)' }}>
 <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">Details</p>
 <div className="grid grid-cols-2 gap-3">
 {Object.entries(workflow.details).map(([key, val]) => (
 <div key={key}>
 <p className="text-xs text-ink-muted capitalize mb-0.5">
 {key.replace(/([A-Z])/g,' $1').trim()}
 </p>
 <p className="text-sm font-medium text-ink">{val}</p>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Change details (old → new) */}
 {workflow.changes && workflow.changes.length > 0 && (
 <div className="rounded-lg bg-surface overflow-hidden" style={{ boxShadow:'var(--shadow-card)' }}>
 <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider px-4 pt-4 pb-2">Changes</p>
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-surface-raised border-b border-hairline">
 <th className="text-left px-4 py-2 text-xs font-medium text-ink-muted">Field</th>
 <th className="text-left px-4 py-2 text-xs font-medium text-ink-muted">Before</th>
 <th className="w-6 px-1 py-2" />
 <th className="text-left px-4 py-2 text-xs font-medium text-ink-muted">After</th>
 </tr>
 </thead>
 <tbody>
 {workflow.changes.map((change, idx) => (
 <tr key={idx} className="border-b border-hairline last:border-0">
 <td className="px-4 py-2.5 font-medium text-ink-soft">{change.field}</td>
 <td className="px-4 py-2.5 text-ink-muted line-through">{change.oldValue}</td>
 <td className="px-1 py-2.5 text-ink-muted">
 <ArrowRight className="h-3.5 w-3.5" />
 </td>
 <td className="px-4 py-2.5 text-ink font-medium">{change.newValue}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}

 {/* Approval flow timeline */}
 <div className="rounded-lg bg-surface p-4" style={{ boxShadow:'var(--shadow-card)' }}>
 <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
 Approval Flow
 </p>
 <StepTimeline steps={workflow.steps} currentStep={workflow.currentStep} />
 </div>
 </div>
 </Modal>
 );
}
