'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle, XCircle, Clock, RotateCcw } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { WorkflowItem, WorkflowStep } from '@/hooks/use-workflows';

interface WorkflowDetailProps {
  workflow: WorkflowItem;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onSendBack: (id: string) => void;
}

const STEP_ICON: Record<string, React.ReactNode> = {
  approved: <CheckCircle className="h-5 w-5 text-green-500" />,
  rejected: <XCircle className="h-5 w-5 text-red-500" />,
  sent_back: <RotateCcw className="h-5 w-5 text-yellow-500" />,
  pending: <Clock className="h-5 w-5 text-gray-400" />,
  skipped: <Clock className="h-5 w-5 text-gray-300" />,
};

function StepTimeline({ steps, currentStep }: { steps: WorkflowStep[]; currentStep: number }) {
  return (
    <div className="space-y-0">
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const isCurrent = idx === currentStep - 1;

        return (
          <div key={step.step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`flex-shrink-0 ${isCurrent ? 'ring-2 ring-cg-red ring-offset-2 rounded-full' : ''}`}>
                {STEP_ICON[step.status]}
              </div>
              {!isLast && <div className="w-0.5 h-8 bg-gray-200" />}
            </div>
            <div className="pb-6">
              <p className="text-sm font-medium text-cg-dark">
                Step {step.step}: {step.approverName}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge
                  variant={
                    step.status === 'approved' ? 'success' :
                    step.status === 'rejected' ? 'error' :
                    step.status === 'sent_back' ? 'warning' : 'neutral'
                  }
                >
                  {step.status.replace('_', ' ')}
                </Badge>
                {step.actionDate && (
                  <span className="text-xs text-gray-400">
                    {new Date(step.actionDate).toLocaleString()}
                  </span>
                )}
              </div>
              {step.comment && (
                <p className="text-sm text-gray-500 mt-1 italic">&ldquo;{step.comment}&rdquo;</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function WorkflowDetail({ workflow, open, onClose, onApprove, onReject, onSendBack }: WorkflowDetailProps) {
  const t = useTranslations();

  const footer = workflow.status === 'pending' ? (
    <div className="flex gap-2 justify-end">
      <Button size="sm" variant="secondary" onClick={() => onSendBack(workflow.id)}>
        {t('workflows.sendBack')}
      </Button>
      <Button size="sm" variant="destructive" onClick={() => onReject(workflow.id)}>
        {t('workflows.reject')}
      </Button>
      <Button size="sm" onClick={() => onApprove(workflow.id)}>
        {t('workflows.approve')}
      </Button>
    </div>
  ) : undefined;

  return (
    <Modal open={open} onClose={onClose} title={`${workflow.typeLabel} — ${workflow.id}`} footer={footer} className="max-w-2xl">
      <div className="space-y-6">
        {/* Header info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-gray-400">{t('workflows.requester')}</span>
            <p className="text-sm font-medium">{workflow.requesterName}</p>
          </div>
          <div>
            <span className="text-xs text-gray-400">{t('workflows.submittedDate')}</span>
            <p className="text-sm font-medium">{new Date(workflow.submittedDate).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-xs text-gray-400">{t('workflows.status')}</span>
            <div className="mt-0.5">
              <Badge
                variant={
                  workflow.status === 'approved' ? 'success' :
                  workflow.status === 'rejected' ? 'error' :
                  workflow.status === 'sent_back' ? 'warning' : 'info'
                }
              >
                {workflow.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-400">{t('workflows.urgency')}</span>
            <p className="text-sm font-medium capitalize">{workflow.urgency}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <span className="text-xs text-gray-400">{t('workflows.description')}</span>
          <p className="text-sm mt-0.5">{workflow.description}</p>
        </div>

        {/* Details */}
        {workflow.details && Object.keys(workflow.details).length > 0 && (
          <div>
            <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-2">{t('workflows.details')}</h4>
            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
              {Object.entries(workflow.details).map(([key, val]) => (
                <div key={key}>
                  <span className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <p className="text-sm font-medium">{val}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approval Timeline */}
        <div>
          <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3">{t('workflows.approvalTimeline')}</h4>
          <StepTimeline steps={workflow.steps} currentStep={workflow.currentStep} />
        </div>
      </div>
    </Modal>
  );
}
