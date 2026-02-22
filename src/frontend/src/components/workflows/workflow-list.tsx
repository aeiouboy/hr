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

const STATUS_VARIANTS: Record<WorkflowStatus, 'warning' | 'success' | 'error' | 'info' | 'neutral'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  sent_back: 'info',
};

const TYPE_ICONS: Record<WorkflowType, React.ReactNode> = {
  leave: <Calendar className="h-5 w-5" />,
  overtime: <Clock className="h-5 w-5" />,
  transfer: <ArrowRightLeft className="h-5 w-5" />,
  payroll_change: <DollarSign className="h-5 w-5" />,
  personal_info: <FileText className="h-5 w-5" />,
  resignation: <Briefcase className="h-5 w-5" />,
};

const TYPE_COLORS: Record<WorkflowType, string> = {
  leave: 'text-green-600 bg-green-50',
  overtime: 'text-orange-600 bg-orange-50',
  transfer: 'text-blue-600 bg-blue-50',
  payroll_change: 'text-purple-600 bg-purple-50',
  personal_info: 'text-indigo-600 bg-indigo-50',
  resignation: 'text-red-600 bg-red-50',
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
    <div className="bg-white rounded-xl border shadow-sm p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
          <div className="h-3 bg-gray-100 rounded w-2/3" />
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-20" />
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
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm">{t('noRequests')}</p>
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
    <div className="space-y-3">
      {workflows.map((workflow) => {
        const isPending = workflow.status === 'pending';
        const icon = TYPE_ICONS[workflow.type] ?? <FileText className="h-5 w-5" />;
        const colorClass = TYPE_COLORS[workflow.type] ?? 'text-gray-600 bg-gray-50';

        return (
          <div
            key={workflow.id}
            className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Type icon */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}
                >
                  {icon}
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-cg-dark text-sm">{workflow.typeLabel}</span>
                    <Badge variant={STATUS_VARIANTS[workflow.status]}>
                      {getStatusLabel(workflow.status)}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">{workflow.description}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span>
                      <span className="font-medium text-gray-700">{t('requestedBy')}:</span>{' '}
                      {workflow.requesterName}
                    </span>
                    <span>
                      <span className="font-medium text-gray-700">{t('requestDate')}:</span>{' '}
                      {formatDate(workflow.submittedDate, 'medium', locale)}
                    </span>
                    {workflow.effectiveDate && (
                      <span>
                        <span className="font-medium text-gray-700">Effective:</span>{' '}
                        {formatDate(workflow.effectiveDate, 'medium', locale)}
                      </span>
                    )}
                  </div>

                  {/* Progress indicator */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex gap-1">
                      {Array.from({ length: workflow.totalSteps }).map((_, idx) => {
                        const step = workflow.steps[idx];
                        const isCompleted = step?.status === 'approved';
                        const isRejected = step?.status === 'rejected' || step?.status === 'sent_back';
                        const isCurrent = idx === workflow.currentStep - 1;
                        return (
                          <div
                            key={idx}
                            className={`h-1.5 w-6 rounded-full transition-colors ${
                              isCompleted
                                ? 'bg-green-500'
                                : isRejected
                                  ? 'bg-red-400'
                                  : isCurrent && isPending
                                    ? 'bg-yellow-400'
                                    : 'bg-gray-200'
                            }`}
                          />
                        );
                      })}
                    </div>
                    <span className="text-xs text-gray-400">
                      {t('currentStep')} {workflow.currentStep}/{workflow.totalSteps}
                    </span>
                  </div>
                </div>

                {/* View detail arrow */}
                <button
                  onClick={() => onViewDetail(workflow)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0 mt-0.5"
                  aria-label={t('viewDetails')}
                >
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>

              {/* Action buttons for pending items */}
              {showActions && isPending && (onApprove || onReject || onSendBack) && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                  {onApprove && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white focus-visible:ring-green-600"
                      onClick={() => onApprove(workflow.id)}
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                      {t('approve')}
                    </Button>
                  )}
                  {onSendBack && (
                    <Button
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white focus-visible:ring-yellow-500"
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
                    className="ml-auto"
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
