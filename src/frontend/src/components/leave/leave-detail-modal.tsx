'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date';
import type { LeaveRequest, LeaveStatus } from '@/hooks/use-leave';

const STATUS_VARIANTS: Record<LeaveStatus, 'warning' | 'success' | 'error' | 'neutral'> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error',
  cancelled: 'neutral',
};

interface LeaveDetailModalProps {
  request: LeaveRequest | null;
  onClose: () => void;
  onCancel?: (id: string) => void;
}

export function LeaveDetailModal({ request, onClose, onCancel }: LeaveDetailModalProps) {
  const t = useTranslations('leave');
  const tc = useTranslations('common');
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';

  if (!request) return null;

  return (
    <Modal
      open={!!request}
      onClose={onClose}
      title={t('viewDetails')}
      footer={
        request.status === 'pending' && onCancel ? (
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>{tc('cancel')}</Button>
            <Button variant="destructive" onClick={() => { onCancel(request.id); onClose(); }}>
              {t('cancelRequest')}
            </Button>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{t('selectType')}</span>
          <span className="text-sm font-medium">{locale === 'th' ? request.typeNameTh : request.typeNameEn}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Status</span>
          <Badge variant={STATUS_VARIANTS[request.status]}>{t(`status.${request.status}`)}</Badge>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{t('startDate')}</span>
          <span className="text-sm">{formatDate(request.startDate, 'long', locale)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{t('endDate')}</span>
          <span className="text-sm">{formatDate(request.endDate, 'long', locale)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{t('duration')}</span>
          <span className="text-sm font-medium">
            {request.days} {t('workingDays')}
            {request.halfDay ? ` (${request.halfDay === 'morning' ? t('morning') : t('afternoon')})` : ''}
          </span>
        </div>
        <hr />
        <div>
          <span className="text-sm text-gray-500 block mb-1">{t('reason')}</span>
          <p className="text-sm text-gray-900">{request.reason}</p>
        </div>
        {request.substitutePersonName && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{t('substitute')}</span>
            <span className="text-sm">{request.substitutePersonName}</span>
          </div>
        )}
        {request.approvedByName && (
          <>
            <hr />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{t('approvedBy')}</span>
              <span className="text-sm">{request.approvedByName}</span>
            </div>
            {request.approvedDate && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{t('approvedDate')}</span>
                <span className="text-sm">{formatDate(request.approvedDate.split('T')[0], 'medium', locale)}</span>
              </div>
            )}
          </>
        )}
        {request.rejectionReason && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-xs text-red-600 font-medium mb-1">Rejection Reason</p>
            <p className="text-sm text-red-800">{request.rejectionReason}</p>
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
          <span>{t('submittedDate')}</span>
          <span>{formatDate(request.submittedAt.split('T')[0], 'medium', locale)}</span>
        </div>
      </div>
    </Modal>
  );
}
