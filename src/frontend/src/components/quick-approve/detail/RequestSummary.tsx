'use client';

import { useTranslations } from 'next-intl';
import { Calendar, Clock, User } from 'lucide-react';
import { Avatar, Capability } from '@/components/humi';
import { UrgencyBadge } from '@/components/quick-approve/UrgencyBadge';
import type { PendingRequest } from '@/lib/quick-approve-api';

interface RequestSummaryProps {
  request: PendingRequest;
}

export function RequestSummary({ request }: RequestSummaryProps) {
  const t = useTranslations('quick_approve_detail');
  const employeeFacts: Array<[string, string | undefined]> = [
    [t('employeeId'), request.requester.employeeId ?? request.requester.id],
    [t('businessUnit'), request.requester.businessUnit],
    [t('company'), request.requester.company],
    [t('branch'), request.requester.branch],
    [t('payGrade'), request.requester.payGrade],
  ];
  const visibleEmployeeFacts = employeeFacts.filter((item): item is [string, string] => Boolean(item[1]));
  const requesterMeta = [request.requester.position, request.requester.department]
    .filter((value): value is string => Boolean(value))
    .filter((value, index, items) => {
      if (index === 0) return true;
      const current = value.toLocaleLowerCase();
      return !items.some((item, itemIndex) => itemIndex < index && item.toLocaleLowerCase().includes(current));
    });

  const submittedDate = new Date(request.submittedAt).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-hairline bg-surface p-5">
      {/* Requester */}
      <div className="flex items-center gap-3">
        <Avatar
          src={request.requester.avatar}
          name={request.requester.name}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink">{request.requester.name}</p>
          {requesterMeta.length > 0 && (
            <p className="text-small text-ink-muted">{requesterMeta.join(' · ')}</p>
          )}
        </div>
        <UrgencyBadge urgency={request.urgency} />
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-4 border-t border-hairline pt-4 text-small text-ink-muted">
        <span className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="font-medium text-ink">{t('requestId')}:</span>
          <span className="font-mono">{request.id}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="font-medium text-ink">{t('submitted')}:</span>
          <span>{submittedDate}</span>
        </span>
        {request.type !== 'claim' && (
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="font-medium text-ink">{t('waiting')}:</span>
            <span>
              {request.waitingDays} {t('days')}
            </span>
          </span>
        )}
      </div>

      {request.type === 'claim' && visibleEmployeeFacts.length > 0 && (
        <Capability entity="BenefitEmployeeClaim">
          <dl className="grid gap-3 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-3 sm:grid-cols-2">
            {visibleEmployeeFacts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</dt>
                <dd className="text-small font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Capability>
      )}

      {/* Description */}
      <p className="text-small text-ink-secondary">{request.description}</p>
    </div>
  );
}
