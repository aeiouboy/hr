'use client';

import { useTranslations } from 'next-intl';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, FileText } from 'lucide-react';
import type { LeaveRequest, LeaveStatus } from '@/hooks/use-leave';

const STATUS_VARIANTS: Record<LeaveStatus, 'warning' | 'success' | 'error' | 'neutral'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  cancelled: 'neutral',
};

interface LeaveDetailProps {
  request: LeaveRequest | null;
  open: boolean;
  onClose: () => void;
  onCancel?: (requestId: string) => void;
}

function TimelineStep({
  label,
  date,
  active,
  completed,
  rejected,
  detail,
}: {
  label: string;
  date?: string;
  active?: boolean;
  completed?: boolean;
  rejected?: boolean;
  detail?: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
            completed && 'bg-green-100',
            rejected && 'bg-red-100',
            active && !completed && !rejected && 'bg-yellow-100',
            !completed && !rejected && !active && 'bg-gray-100'
          )}
        >
          {completed ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : rejected ? (
            <XCircle className="h-4 w-4 text-red-600" />
          ) : active ? (
            <Clock className="h-4 w-4 text-yellow-600" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          )}
        </div>
        <div className="w-px h-full bg-gray-200 min-h-[16px]" />
      </div>
      <div className="pb-4">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {date && <p className="text-xs text-gray-500">{new Date(date).toLocaleDateString('en-US', { dateStyle: 'medium' })} {new Date(date).toLocaleTimeString('en-US', { timeStyle: 'short' })}</p>}
        {detail && <p className="text-xs text-gray-600 mt-1 bg-gray-50 rounded p-2">{detail}</p>}
      </div>
    </div>
  );
}

export function LeaveDetail({ request, open, onClose, onCancel }: LeaveDetailProps) {
  const t = useTranslations('leave');

  if (!request) return null;

  const isApproved = request.status === 'approved';
  const isRejected = request.status === 'rejected';
  const isPending = request.status === 'pending';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={request.typeNameEn}
      className="max-w-lg"
      footer={
        <div className="flex justify-end gap-2">
          {isPending && onCancel && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => { onCancel(request.id); onClose(); }}
            >
              {t('cancelRequest')}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Status badge */}
        <div className="flex items-center justify-between">
          <Badge variant={STATUS_VARIANTS[request.status]}>{t(`status.${request.status}`)}</Badge>
          <span className="text-xs text-gray-400">ID: {request.id}</span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">{t('startDate')}</p>
            <p className="font-medium">{request.startDate}</p>
          </div>
          <div>
            <p className="text-gray-500">{t('endDate')}</p>
            <p className="font-medium">{request.endDate}</p>
          </div>
          <div>
            <p className="text-gray-500">{t('duration')}</p>
            <p className="font-medium">
              {request.days} {t('days')}
              {request.halfDay && ` (${request.halfDay === 'morning' ? t('morning') : t('afternoon')})`}
            </p>
          </div>
          <div>
            <p className="text-gray-500">{t('submittedDate')}</p>
            <p className="font-medium">{new Date(request.submittedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
          </div>
        </div>

        {/* Reason */}
        <div>
          <p className="text-sm text-gray-500 mb-1">{t('reason')}</p>
          <p className="p-3 bg-gray-50 rounded-lg text-sm">{request.reason}</p>
        </div>

        {/* Substitute */}
        {request.substitutePersonName && (
          <div className="text-sm">
            <p className="text-gray-500">{t('substitute')}</p>
            <p className="font-medium">{request.substitutePersonName}</p>
          </div>
        )}

        {/* Attachment */}
        {request.attachmentUrl && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <FileText className="h-4 w-4" />
            <span>{t('medicalCert')}</span>
          </div>
        )}

        {/* Status Timeline */}
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-900 mb-3">Status Timeline</p>
          <div>
            <TimelineStep
              label="Request Created"
              date={request.submittedAt}
              completed
            />
            <TimelineStep
              label="Pending Approval"
              date={request.submittedAt}
              completed={isApproved || isRejected}
              active={isPending}
            />
            {isApproved && (
              <TimelineStep
                label={`Approved by ${request.approvedByName}`}
                date={request.approvedDate}
                completed
              />
            )}
            {isRejected && (
              <TimelineStep
                label={`Rejected by ${request.rejectedByName}`}
                date={request.rejectedDate}
                rejected
                detail={request.rejectionReason}
              />
            )}
            {request.status === 'cancelled' && (
              <TimelineStep
                label="Cancelled"
                rejected
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
