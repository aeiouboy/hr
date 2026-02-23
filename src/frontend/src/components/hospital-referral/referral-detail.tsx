'use client';

import { useTranslations } from 'next-intl';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Send,
  AlertCircle,
} from 'lucide-react';
import type { HospitalReferral, TimelineEvent, ReferralStatus } from '@/hooks/use-hospital-referral';

const STATUS_CLASSES: Record<ReferralStatus, string> = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  pending_manager: 'bg-yellow-100 text-yellow-800',
  pending_hr: 'bg-orange-100 text-orange-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-500',
  letter_issued: 'bg-purple-100 text-purple-800',
};

function getTimelineIcon(action: string) {
  if (action === 'approved_by_manager' || action === 'approved_by_hr') {
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  }
  if (action === 'rejected') {
    return <XCircle className="h-4 w-4 text-red-600" />;
  }
  if (action === 'submitted') {
    return <Send className="h-4 w-4 text-blue-600" />;
  }
  if (action === 'letter_issued') {
    return <FileText className="h-4 w-4 text-purple-600" />;
  }
  if (action === 'cancelled') {
    return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
  return <Clock className="h-4 w-4 text-gray-500" />;
}

function getTimelineIconBg(action: string) {
  if (action === 'approved_by_manager' || action === 'approved_by_hr') return 'bg-green-100';
  if (action === 'rejected') return 'bg-red-100';
  if (action === 'submitted') return 'bg-blue-100';
  if (action === 'letter_issued') return 'bg-purple-100';
  if (action === 'cancelled') return 'bg-gray-100';
  return 'bg-gray-100';
}

function formatActionLabel(action: string, actorName: string): string {
  const labels: Record<string, string> = {
    created: `Created by ${actorName}`,
    submitted: `Submitted by ${actorName}`,
    approved_by_manager: `Approved by Manager (${actorName})`,
    approved_by_hr: `Approved by HR (${actorName})`,
    rejected: `Rejected by ${actorName}`,
    cancelled: `Cancelled by ${actorName}`,
    letter_issued: `Referral Letter Issued by ${actorName}`,
  };
  return labels[action] || `${action} by ${actorName}`;
}

function TimelineItem({ event, isLast }: { event: TimelineEvent; isLast: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
            getTimelineIconBg(event.action)
          )}
        >
          {getTimelineIcon(event.action)}
        </div>
        {!isLast && <div className="w-px flex-1 bg-gray-200 min-h-[16px] mt-1" />}
      </div>
      <div className={cn('pb-4', isLast && 'pb-0')}>
        <p className="text-sm font-medium text-gray-900">
          {formatActionLabel(event.action, event.actorName)}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}{' '}
          {new Date(event.date).toLocaleTimeString('en-US', { timeStyle: 'short' })}
        </p>
        {event.note && (
          <p className="text-xs text-gray-600 mt-1 bg-gray-50 rounded p-2">{event.note}</p>
        )}
      </div>
    </div>
  );
}

interface ReferralDetailProps {
  referral: HospitalReferral | null;
  open: boolean;
  onClose: () => void;
  onCancel?: (id: string) => void;
  onViewLetter?: (referral: HospitalReferral) => void;
}

export function ReferralDetail({
  referral,
  open,
  onClose,
  onCancel,
  onViewLetter,
}: ReferralDetailProps) {
  const t = useTranslations('hospitalReferral');
  const tc = useTranslations('common');

  if (!referral) return null;

  const isCancellable = ['draft', 'submitted', 'pending_manager', 'pending_hr'].includes(
    referral.status
  );
  const hasLetter = referral.status === 'letter_issued';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={referral.hospitalName}
      className="max-w-lg"
      footer={
        <div className="flex justify-end gap-2">
          {isCancellable && onCancel && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                onCancel(referral.id);
                onClose();
              }}
            >
              {t('cancelRequest')}
            </Button>
          )}
          {hasLetter && onViewLetter && (
            <Button
              size="sm"
              onClick={() => onViewLetter(referral)}
            >
              <FileText className="h-4 w-4 mr-2" />
              {t('viewLetter')}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onClose}>
            {tc('close')}
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Status + referral number */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
              STATUS_CLASSES[referral.status]
            )}
          >
            {t(`status.${referral.status}`)}
          </span>
          <span className="text-xs text-gray-400">
            {referral.referralNumber ? referral.referralNumber : `ID: ${referral.id}`}
          </span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">{t('hospital')}</p>
            <p className="font-medium">{referral.hospitalName}</p>
            {referral.hospitalBranch && (
              <p className="text-xs text-gray-500">{referral.hospitalBranch}</p>
            )}
          </div>
          <div>
            <p className="text-gray-500">{t('preferredDate')}</p>
            <p className="font-medium">{referral.preferredDate}</p>
          </div>
          {referral.validFrom && (
            <div>
              <p className="text-gray-500">{t('validFrom')}</p>
              <p className="font-medium">{referral.validFrom}</p>
            </div>
          )}
          {referral.validUntil && (
            <div>
              <p className="text-gray-500">{t('validUntil')}</p>
              <p className="font-medium">{referral.validUntil}</p>
            </div>
          )}
          <div>
            <p className="text-gray-500">{t('createdDate')}</p>
            <p className="font-medium">
              {new Date(referral.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
            </p>
          </div>
        </div>

        {/* Reason */}
        <div>
          <p className="text-sm text-gray-500 mb-1">{t('reason')}</p>
          <p className="p-3 bg-gray-50 rounded-lg text-sm">{referral.reason}</p>
        </div>

        {/* Notes */}
        {referral.notes && (
          <div>
            <p className="text-sm text-gray-500 mb-1">{t('notes')}</p>
            <p className="p-3 bg-gray-50 rounded-lg text-sm">{referral.notes}</p>
          </div>
        )}

        {/* Rejection reason */}
        {referral.status === 'rejected' && referral.rejectedReason && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-xs font-medium text-red-800 mb-1">{t('rejectionReason')}</p>
            <p className="text-sm text-red-700">{referral.rejectedReason}</p>
          </div>
        )}

        {/* Timeline */}
        {referral.timeline.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-900 mb-3">{t('timeline')}</p>
            <div>
              {referral.timeline.map((event, index) => (
                <TimelineItem
                  key={index}
                  event={event}
                  isLast={index === referral.timeline.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
