'use client';

import { useTranslations } from 'next-intl';
import { X, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UrgencyBadge } from './UrgencyBadge';
import type { PendingRequest, ApprovalStep } from '@/lib/quick-approve-api';
import { cn } from '@/lib/utils';

interface RequestSlideOverProps {
  request: PendingRequest | null;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const typeIcons: Record<string, string> = {
  leave: '🏖️',
  overtime: '⏰',
  claim: '🧾',
  transfer: '🔄',
  change_request: '📝',
};

function ApprovalTimeline({ steps }: { steps: ApprovalStep[] }) {
  const t = useTranslations('quickApprove');
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-cg-dark">{t('slideOver.approvalTimeline')}</h4>
      <ol className="relative border-l border-gray-200 ml-3">
        {steps.map((step) => (
          <li key={step.step} className="mb-4 ml-4">
            <div
              className={cn(
                'absolute -left-2 w-4 h-4 rounded-full border-2 border-white',
                step.status === 'approved'
                  ? 'bg-green-500'
                  : step.status === 'rejected'
                    ? 'bg-red-500'
                    : 'bg-gray-300'
              )}
            />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-cg-dark">{step.approver}</span>
              <Badge
                variant={
                  step.status === 'approved'
                    ? 'success'
                    : step.status === 'rejected'
                      ? 'error'
                      : 'neutral'
                }
              >
                {step.status}
              </Badge>
            </div>
            {step.date && (
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(step.date).toLocaleDateString()}
              </p>
            )}
            {step.comment && <p className="text-xs text-gray-500 mt-1">{step.comment}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

function DetailSection({ request }: { request: PendingRequest }) {
  const t = useTranslations('quickApprove');
  const d = request.details as Record<string, unknown>;

  const fields: { label: string; value: string | number | undefined }[] = [];

  switch (request.type) {
    case 'leave':
      fields.push(
        { label: t('detail.leaveType'), value: d.leaveType as string },
        { label: t('detail.startDate'), value: d.startDate as string },
        { label: t('detail.endDate'), value: d.endDate as string },
        { label: t('detail.totalDays'), value: d.totalDays as number },
        { label: t('detail.balance'), value: d.balance as number },
        { label: t('detail.reason'), value: d.reason as string }
      );
      break;
    case 'overtime':
      fields.push(
        { label: t('detail.date'), value: d.date as string },
        { label: t('detail.hours'), value: d.hours as number },
        { label: t('detail.rate'), value: `${d.rate}x` },
        { label: t('detail.reason'), value: d.reason as string }
      );
      break;
    case 'claim':
      fields.push(
        { label: t('detail.amount'), value: `${d.currency ?? 'THB'} ${Number(d.amount).toLocaleString()}` },
        { label: t('detail.category'), value: d.category as string },
        { label: t('detail.merchant'), value: d.merchant as string }
      );
      break;
    case 'transfer':
      fields.push(
        { label: t('detail.fromDepartment'), value: d.fromDepartment as string },
        { label: t('detail.toDepartment'), value: d.toDepartment as string },
        { label: t('detail.reason'), value: d.reason as string },
        { label: t('detail.effectiveDate'), value: d.effectiveDate as string }
      );
      break;
    default:
      Object.entries(d).forEach(([k, v]) => {
        if (typeof v === 'string' || typeof v === 'number') {
          fields.push({ label: k, value: v });
        }
      });
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-cg-dark">{t('slideOver.requestDetails')}</h4>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {fields.map(
          (f) =>
            f.value !== undefined && (
              <div key={f.label}>
                <dt className="text-gray-500">{f.label}</dt>
                <dd className="font-medium text-cg-dark">{String(f.value)}</dd>
              </div>
            )
        )}
      </dl>
    </div>
  );
}

export function RequestSlideOver({
  request,
  open,
  onClose,
  onApprove,
  onReject,
}: RequestSlideOverProps) {
  const t = useTranslations('quickApprove');

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white shadow-xl transform transition-transform duration-300 flex flex-col',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label={t('slideOver.title')}
      >
        {request && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">{typeIcons[request.type] ?? '📋'}</span>
                <div>
                  <h2 className="text-lg font-semibold text-cg-dark">
                    {request.requester.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {request.requester.position} &middot; {request.requester.department}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 hover:bg-gray-100 transition-colors"
                aria-label={t('slideOver.close')}
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Meta row */}
              <div className="flex items-center gap-3 flex-wrap">
                <UrgencyBadge urgency={request.urgency} />
                <Badge variant="info">{request.type}</Badge>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(request.submittedAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-gray-700">{request.description}</p>

              <DetailSection request={request} />

              {request.approvalTimeline.length > 0 && (
                <ApprovalTimeline steps={request.approvalTimeline} />
              )}
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4 flex items-center gap-3">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 focus-visible:ring-green-600"
                onClick={() => onApprove(request.id)}
              >
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                {t('slideOver.approve')}
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => onReject(request.id)}
              >
                <XCircle className="h-4 w-4 mr-1.5" />
                {t('slideOver.reject')}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
