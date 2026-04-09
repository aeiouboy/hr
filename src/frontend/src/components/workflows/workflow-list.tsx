'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
 Calendar,
 Clock,
 ArrowRightLeft,
 DollarSign,
 FileText,
 Briefcase,
 ChevronRight,
 CheckCircle,
 RotateCcw,
 XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/date';
import type { WorkflowItem, WorkflowStatus, WorkflowType } from '@/hooks/use-workflows';

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

interface WorkflowListProps {
 workflows: WorkflowItem[];
 loading?: boolean;
 onViewDetail: (workflow: WorkflowItem) => void;
 onApprove?: (id: string) => void;
 onReject?: (id: string) => void;
 onSendBack?: (id: string) => void;
 showActions?: boolean;
}

function WorkflowCardSkeleton() {
 return (
 <div className="bg-surface rounded-md border border-hairline shadow-sm p-5 animate-pulse">
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 bg-surface-raised rounded-md flex-shrink-0" />
 <div className="flex-1 space-y-2">
 <div className="h-4 bg-surface-raised rounded w-1/3" />
 <div className="h-3 bg-surface-raised rounded w-1/2" />
 <div className="h-3 bg-surface-raised rounded w-2/3" />
 </div>
 <div className="h-6 bg-surface-raised rounded-full w-20" />
 </div>
 </div>
 );
}

export function WorkflowList({
 workflows,
 loading,
 onViewDetail,
 onApprove,
 onReject,
 onSendBack,
 showActions = false,
}: WorkflowListProps) {
 const t = useTranslations('workflow');
 const pathname = usePathname();
 const locale = pathname.startsWith('/th') ?'th' :'en';

 if (loading) {
 return (
 <div className="space-y-3">
 {Array.from({ length: 3 }).map((_, i) => (
 <WorkflowCardSkeleton key={i} />
 ))}
 </div>
 );
 }

 if (workflows.length === 0) {
 return (
 <div className="flex flex-col items-center justify-center py-16 text-center">
 <div className="w-16 h-16 bg-surface-raised rounded-full flex items-center justify-center mb-4">
 <FileText className="h-8 w-8 text-ink-muted" />
 </div>
 <p className="text-ink-muted text-sm">{t('noRequests')}</p>
 </div>
 );
 }

 const getStatusLabel = (status: WorkflowStatus) => {
 switch (status) {
 case'pending': return t('pending');
 case'approved': return t('approved');
 case'rejected': return t('rejected');
 case'sent_back': return t('sentBack');
 default: return status;
 }
 };

 return (
 <div className="space-y-3">
 {workflows.map((workflow) => {
 const isPending = workflow.status ==='pending';
 const icon = TYPE_ICONS[workflow.type] ?? <FileText className="h-5 w-5" />;
 const colorClass = TYPE_COLORS[workflow.type] ??'text-ink-muted bg-surface-raised';

 return (
 <div
 key={workflow.id}
 className="bg-surface rounded-md border border-hairline shadow-sm hover:shadow-1 transition-shadow"
 >
 <div className="px-4 py-3.5 sm:px-5 sm:py-4">
 <div className="flex items-start gap-3">
 {/* Type icon */}
 <div
 className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 ${colorClass}`}
 >
 {icon}
 </div>

 {/* Main content */}
 <div className="flex-1 min-w-0">
 <div className="flex flex-wrap items-center gap-2 mb-1">
 <span className="font-semibold text-ink text-sm">{workflow.typeLabel}</span>
 <Badge variant={STATUS_VARIANTS[workflow.status]}>
 {getStatusLabel(workflow.status)}
 </Badge>
 </div>

 <p className="text-sm text-ink-muted mb-1.5 line-clamp-1 sm:line-clamp-none">{workflow.description}</p>

 <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
 <span>
 <span className="font-medium text-ink-soft">{t('requestedBy')}:</span>{''}
 {workflow.requesterName}
 </span>
 <span>
 <span className="font-medium text-ink-soft">{t('requestDate')}:</span>{''}
 {formatDate(workflow.submittedDate,'medium', locale)}
 </span>
 {workflow.effectiveDate && (
 <span>
 <span className="font-medium text-ink-soft">Effective:</span>{''}
 {formatDate(workflow.effectiveDate,'medium', locale)}
 </span>
 )}
 </div>

 {/* Progress indicator */}
 <div className="flex items-center gap-2 mt-2">
 <div className="flex gap-1">
 {Array.from({ length: workflow.totalSteps }).map((_, idx) => {
 const step = workflow.steps[idx];
 const isCompleted = step?.status ==='approved';
 const isRejected = step?.status ==='rejected' || step?.status ==='sent_back';
 const isCurrent = idx === workflow.currentStep - 1;
 return (
 <div
 key={idx}
 className={`h-1.5 w-6 rounded-full transition-colors ${
 isCompleted
 ?'bg-success'
 : isRejected
 ?'bg-danger'
 : isCurrent && isPending
 ?'bg-warning'
 :'bg-surface-raised '
 }`}
 />
 );
 })}
 </div>
 <span className="text-xs text-ink-muted">
 {t('currentStep')} {workflow.currentStep}/{workflow.totalSteps}
 </span>
 </div>
 </div>

 {/* View detail arrow */}
 <button
 onClick={() => onViewDetail(workflow)}
 className="p-1.5 rounded-md hover:bg-surface-raised hover:bg-surface-raised transition-colors flex-shrink-0 mt-0.5"
 aria-label={t('viewDetails')}
 >
 <ChevronRight className="h-4 w-4 text-ink-muted" />
 </button>
 </div>

 {/* Action buttons for pending items */}
 {showActions && isPending && (onApprove || onReject || onSendBack) && (
 <div className="flex flex-col sm:flex-row gap-2 mt-3 pt-3 border-t border-hairline">
 {onApprove && (
 <Button
 size="sm"
 className="w-full sm:w-auto bg-success hover:bg-success/90 text-white"
 onClick={() => onApprove(workflow.id)}
 >
 <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
 {t('approve')}
 </Button>
 )}
 {onSendBack && (
 <Button
 size="sm"
 variant="outline"
 className="w-full sm:w-auto border-warning text-warning hover:bg-warning-tint"
 onClick={() => onSendBack(workflow.id)}
 >
 <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
 {t('sendBack')}
 </Button>
 )}
 {onReject && (
 <Button
 size="sm"
 variant="destructive"
 className="w-full sm:w-auto"
 onClick={() => onReject(workflow.id)}
 >
 <XCircle className="h-3.5 w-3.5 mr-1.5" />
 {t('reject')}
 </Button>
 )}
 <Button
 size="sm"
 variant="outline"
 onClick={() => onViewDetail(workflow)}
 className="w-full sm:w-auto sm:ml-auto"
 >
 {t('viewDetails')}
 </Button>
 </div>
 )}
 </div>
 </div>
 );
 })}
 </div>
 );
}
