'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, Clock, XCircle, FileText, Send } from 'lucide-react';
import type { ClaimRequest } from '@/hooks/use-claims';
import { cn } from '@/lib/utils';

interface ClaimTimelineProps {
  claim: ClaimRequest;
}

interface TimelineStep {
  label: string;
  date: string | null;
  icon: React.ReactNode;
  status: 'completed' | 'active' | 'pending' | 'rejected';
}

export function ClaimTimeline({ claim }: ClaimTimelineProps) {
  const t = useTranslations('smartClaims.status');

  const steps: TimelineStep[] = [];

  // Draft created
  steps.push({
    label: t('draft'),
    date: claim.receiptDate,
    icon: <FileText className="h-4 w-4" />,
    status: 'completed',
  });

  // Submitted
  if (claim.submittedAt) {
    steps.push({
      label: t('submitted'),
      date: claim.submittedAt,
      icon: <Send className="h-4 w-4" />,
      status: 'completed',
    });
  } else if (claim.status === 'draft') {
    steps.push({
      label: t('submitted'),
      date: null,
      icon: <Send className="h-4 w-4" />,
      status: 'pending',
    });
  }

  // Processing
  if (claim.status === 'processing') {
    steps.push({
      label: t('processing'),
      date: null,
      icon: <Clock className="h-4 w-4" />,
      status: 'active',
    });
  } else if (['approved', 'rejected'].includes(claim.status)) {
    steps.push({
      label: t('processing'),
      date: null,
      icon: <Clock className="h-4 w-4" />,
      status: 'completed',
    });
  } else if (claim.status === 'submitted') {
    steps.push({
      label: t('processing'),
      date: null,
      icon: <Clock className="h-4 w-4" />,
      status: 'pending',
    });
  }

  // Approved / Rejected
  if (claim.status === 'approved') {
    steps.push({
      label: t('approved'),
      date: claim.approvedAt,
      icon: <CheckCircle2 className="h-4 w-4" />,
      status: 'completed',
    });
  } else if (claim.status === 'rejected') {
    steps.push({
      label: t('rejected'),
      date: claim.approvedAt,
      icon: <XCircle className="h-4 w-4" />,
      status: 'rejected',
    });
  } else {
    steps.push({
      label: t('approved'),
      date: null,
      icon: <CheckCircle2 className="h-4 w-4" />,
      status: 'pending',
    });
  }

  return (
    <div className="space-y-0">
      {steps.map((step, idx) => (
        <div key={idx} className="flex gap-3">
          {/* Icon column */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                step.status === 'completed' && 'bg-green-100 text-green-600',
                step.status === 'active' && 'bg-blue-100 text-blue-600',
                step.status === 'pending' && 'bg-gray-100 text-gray-400',
                step.status === 'rejected' && 'bg-red-100 text-red-600'
              )}
            >
              {step.icon}
            </div>
            {idx < steps.length - 1 && (
              <div className={cn('w-0.5 flex-1 min-h-[24px]', step.status === 'completed' ? 'bg-green-300' : 'bg-gray-200')} />
            )}
          </div>
          {/* Content */}
          <div className="pb-4">
            <p className={cn('text-sm font-medium', step.status === 'pending' ? 'text-gray-400' : 'text-gray-900')}>
              {step.label}
            </p>
            {step.date && <p className="text-xs text-gray-500">{step.date}</p>}
            {step.status === 'rejected' && claim.rejectionReason && (
              <p className="text-xs text-red-600 mt-0.5">{claim.rejectionReason}</p>
            )}
            {step.status === 'completed' && claim.approvedBy && step.label === t('approved') && (
              <p className="text-xs text-gray-500 mt-0.5">by {claim.approvedBy}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
