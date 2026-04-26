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
import { Button } from '@/components/humi';
import { formatDate } from '@/lib/date';
import type { WorkflowItem, WorkflowStatus, WorkflowType } from '@/hooks/use-workflows';

const STATUS_VARIANTS: Record<WorkflowStatus, 'warning' | 'success' | 'error' | 'info' | 'neutral'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  sent_back: 'info',
};

const TYPE_ICONS: Record<WorkflowType, React.ReactNode> = {
  leave: <Calendar className="h-4 w-4" />,
  overtime: <Clock className="h-4 w-4" />,
  time_correction: <Clock className="h-4 w-4" />,
  transfer: <ArrowRightLeft className="h-4 w-4" />,
  payroll_change: <DollarSign className="h-4 w-4" />,
  personal_info: <FileText className="h-4 w-4" />,
  resignation: <Briefcase className="h-4 w-4" />,
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
    <div className="px-4 py-3 border-b border-hairline animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-surface-raised rounded-md" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 bg-surface-raised rounded w-1/3" />
          <div className="h-3 bg-surface-raised rounded w-2/3" />
        </div>
        <div className="h-5 bg-surface-raised rounded-full w-16" />
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
  const locale = pathname.startsWith('/th') ? 'th' : 'en';

  if (loading) {
    return (
      <div className="bg-surface rounded-md shadow-card">
        {Array.from({ length: 4 }).map((_, i) => (
          <WorkflowCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="bg-surface rounded-md shadow-card py-16 text-center">
        <FileText className="h-8 w-8 text-ink-muted mx-auto mb-3" />
        <p className="text-sm text-ink-muted">{t('noRequests')}</p>
      </div>
    );
  }

  const getStatusLabel = (status: WorkflowStatus) => {
    switch (status) {
      case 'pending': return t('pending');
      case 'approved': return t('approved');
      case 'rejected': return t('rejected');
      case 'sent_back': return t('sentBack');
      default: return status;
    }
  };

  return (
    <div className="bg-surface rounded-md shadow-card divide-y divide-hairline">
      {workflows.map((workflow) => {
        const isPending = workflow.status === 'pending';
        const icon = TYPE_ICONS[workflow.type] ?? <FileText className="h-4 w-4" />;

        return (
          <div
            key={workflow.id}
            className="group px-4 py-3 hover:bg-surface-raised/50 transition-colors cursor-pointer"
            onClick={() => onViewDetail(workflow)}
          >
            {/* Main row — compact */}
            <div className="flex items-center gap-3">
              {/* Type icon — small, muted */}
              <div className="w-8 h-8 rounded-md bg-surface-raised flex items-center justify-center text-ink-muted shrink-0">
                {icon}
              </div>

              {/* Content — single line primary + metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-ink truncate">{workflow.typeLabel}</span>
                  <Badge variant={STATUS_VARIANTS[workflow.status]} className="shrink-0">
                    {getStatusLabel(workflow.status)}
                  </Badge>
                </div>
                <p className="text-xs text-ink-muted truncate mt-0.5">
                  {workflow.description}
                </p>
              </div>

              {/* Right side — metadata + progress */}
              <div className="hidden sm:flex items-center gap-4 shrink-0 text-xs text-ink-muted">
                <span>{workflow.requesterName}</span>
                <span className="font-mono tabular-nums">{formatDate(workflow.submittedDate, 'medium', locale)}</span>
                {workflow.effectiveDate && (
                  <span className="font-mono tabular-nums">→ {formatDate(workflow.effectiveDate, 'medium', locale)}</span>
                )}
                {/* Step progress */}
                <div className="flex gap-0.5">
                  {Array.from({ length: workflow.totalSteps }).map((_, idx) => {
                    const step = workflow.steps[idx];
                    const isCompleted = step?.status === 'approved';
                    const isRejected = step?.status === 'rejected' || step?.status === 'sent_back';
                    const isCurrent = idx === workflow.currentStep - 1;
                    return (
                      <div
                        key={idx}
                        className={`h-1.5 w-4 rounded-full ${
                          isCompleted ? 'bg-success'
                            : isRejected ? 'bg-danger'
                            : isCurrent && isPending ? 'bg-warning'
                            : 'bg-surface-raised'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="h-4 w-4 text-ink-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Action buttons — hover only, for pending items */}
            {showActions && isPending && (onApprove || onReject || onSendBack) && (
              <div className="hidden group-hover:flex gap-2 mt-2 ml-11">
                {onApprove && (
                  <Button
                    size="sm"
                    className="bg-success hover:bg-success/90 text-white h-7 text-xs"
                    onClick={(e) => { e.stopPropagation(); onApprove(workflow.id); }}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {t('approve')}
                  </Button>
                )}
                {onSendBack && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="border-warning text-warning hover:bg-warning-tint h-7 text-xs"
                    onClick={(e) => { e.stopPropagation(); onSendBack(workflow.id); }}
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    {t('sendBack')}
                  </Button>
                )}
                {onReject && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="border-danger text-danger hover:bg-danger-tint h-7 text-xs"
                    onClick={(e) => { e.stopPropagation(); onReject(workflow.id); }}
                  >
                    <XCircle className="h-3 w-3 mr-1" />
                    {t('reject')}
                  </Button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
