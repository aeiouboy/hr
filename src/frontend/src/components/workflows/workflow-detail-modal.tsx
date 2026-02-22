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

function StepTimeline({ steps, currentStep }: { steps: WorkflowStep[]; currentStep: number }) {
  const t = useTranslations('workflow');
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';

  const stepStatusIcon = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'sent_back':
        return <RotateCcw className="h-5 w-5 text-yellow-500" />;
      case 'skipped':
        return <div className="h-5 w-5 rounded-full border-2 border-gray-200 bg-white" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const stepBadgeVariant = (status: WorkflowStep['status']): 'success' | 'error' | 'warning' | 'neutral' | 'info' => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'sent_back': return 'warning';
      default: return 'neutral';
    }
  };

  const stepStatusLabel = (status: WorkflowStep['status']) => {
    switch (status) {
      case 'approved': return t('approved');
      case 'rejected': return t('rejected');
      case 'sent_back': return t('sentBack');
      case 'skipped': return 'Skipped';
      default: return t('pending');
    }
  };

  return (
    <div className="space-y-0">
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const isCurrent = idx === currentStep - 1 && step.status === 'pending';

        return (
          <div key={step.step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`flex-shrink-0 ${
                  isCurrent ? 'ring-2 ring-cg-red ring-offset-2 rounded-full' : ''
                }`}
              >
                {stepStatusIcon(step.status)}
              </div>
              {!isLast && <div className="w-0.5 flex-1 min-h-[2rem] bg-gray-200 my-1" />}
            </div>

            <div className="pb-5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <p className="text-sm font-medium text-cg-dark">
                  {t('step')} {step.step}: {step.approverName}
                </p>
                <Badge variant={stepBadgeVariant(step.status)}>
                  {stepStatusLabel(step.status)}
                </Badge>
              </div>
              {step.actionDate && (
                <p className="text-xs text-gray-400 mb-1">
                  {formatDate(step.actionDate, 'medium', locale)}{' '}
                  {new Date(step.actionDate).toLocaleTimeString(locale === 'th' ? 'th-TH' : 'en-US', {
                    timeStyle: 'short',
                  })}
                </p>
              )}
              {step.comment && (
                <p className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 italic border-l-2 border-gray-200">
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

type ActionMode = null | 'approve' | 'reject' | 'sendBack';

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
  const locale = pathname.startsWith('/th') ? 'th' : 'en';

  const [actionMode, setActionMode] = useState<ActionMode>(null);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!workflow) return null;

  const isPending = workflow.status === 'pending';
  const icon = TYPE_ICONS[workflow.type] ?? <FileText className="h-5 w-5" />;
  const colorClass = TYPE_COLORS[workflow.type] ?? 'text-gray-600 bg-gray-50';

  const getStatusLabel = (status: WorkflowStatus) => {
    switch (status) {
      case 'pending': return t('pending');
      case 'approved': return t('approved');
      case 'rejected': return t('rejected');
      case 'sent_back': return t('sentBack');
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
      if (actionMode === 'approve' && onApprove) {
        await onApprove(workflow.id, reason || undefined);
      } else if (actionMode === 'reject' && onReject) {
        await onReject(workflow.id, reason || undefined);
      } else if (actionMode === 'sendBack' && onSendBack) {
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

  const footer = actionMode ? (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('reason')}
          {actionMode !== 'approve' && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cg-red focus:border-transparent resize-none"
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
          disabled={submitting || (actionMode !== 'approve' && !reason.trim())}
          className={
            actionMode === 'approve'
              ? 'bg-green-600 hover:bg-green-700 text-white focus-visible:ring-green-600'
              : actionMode === 'sendBack'
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white focus-visible:ring-yellow-500'
                : undefined
          }
          variant={actionMode === 'reject' ? 'destructive' : 'default'}
          onClick={handleConfirmAction}
        >
          {submitting ? 'Processing...' : `Confirm ${actionLabels[actionMode]}`}
        </Button>
      </div>
    </div>
  ) : isPending && (onApprove || onReject || onSendBack) ? (
    <div className="flex flex-wrap gap-2 justify-end">
      {onSendBack && (
        <Button
          size="sm"
          className="bg-yellow-500 hover:bg-yellow-600 text-white focus-visible:ring-yellow-500"
          onClick={() => setActionMode('sendBack')}
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          {t('sendBack')}
        </Button>
      )}
      {onReject && (
        <Button size="sm" variant="destructive" onClick={() => setActionMode('reject')}>
          <XCircle className="h-3.5 w-3.5 mr-1.5" />
          {t('reject')}
        </Button>
      )}
      {onApprove && (
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white focus-visible:ring-green-600"
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`${workflow.typeLabel} — ${workflow.id}`}
      footer={footer}
      className="max-w-2xl"
    >
      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
        {/* Header: type icon + status */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-cg-dark">{workflow.typeLabel}</h3>
            <p className="text-sm text-gray-500">{workflow.department}</p>
          </div>
          <Badge variant={STATUS_VARIANTS[workflow.status]}>
            {getStatusLabel(workflow.status)}
          </Badge>
        </div>

        {/* Core fields */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{t('requestedBy')}</p>
            <p className="font-medium text-cg-dark">{workflow.requesterName}</p>
            <p className="text-xs text-gray-500">{workflow.requesterId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{t('requestDate')}</p>
            <p className="font-medium text-cg-dark">
              {formatDate(workflow.submittedDate, 'medium', locale)}
            </p>
          </div>
          {workflow.effectiveDate && (
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Effective Date</p>
              <p className="font-medium text-cg-dark">
                {formatDate(workflow.effectiveDate, 'medium', locale)}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{t('currentStep')}</p>
            <p className="font-medium text-cg-dark">
              {workflow.currentStep} / {workflow.totalSteps}
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-xs text-gray-400 mb-1">{t('description')}</p>
          <p className="text-sm bg-gray-50 rounded-lg px-4 py-3 border">{workflow.description}</p>
        </div>

        {/* Additional details */}
        {workflow.details && Object.keys(workflow.details).length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Details</p>
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border">
              {Object.entries(workflow.details).map(([key, val]) => (
                <div key={key}>
                  <p className="text-xs text-gray-400 capitalize mb-0.5">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm font-medium text-cg-dark">{val}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Change details (old → new) */}
        {workflow.changes && workflow.changes.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Changes
            </p>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Field</th>
                    <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">Before</th>
                    <th className="w-6 px-1 py-2" />
                    <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">After</th>
                  </tr>
                </thead>
                <tbody>
                  {workflow.changes.map((change, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="px-4 py-2.5 font-medium text-gray-700">{change.field}</td>
                      <td className="px-4 py-2.5 text-gray-500 line-through">{change.oldValue}</td>
                      <td className="px-1 py-2.5 text-gray-300">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </td>
                      <td className="px-4 py-2.5 text-cg-dark font-medium">{change.newValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Approval flow timeline */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Approval Flow
          </p>
          <StepTimeline steps={workflow.steps} currentStep={workflow.currentStep} />
        </div>
      </div>
    </Modal>
  );
}
