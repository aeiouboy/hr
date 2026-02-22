'use client';

import { cn } from '@/lib/utils';
import type { Urgency } from '@/lib/quick-approve-api';

const styles: Record<Urgency, string> = {
  urgent: 'bg-red-100 text-red-800',
  normal: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

interface UrgencyBadgeProps {
  urgency: Urgency;
  label?: string;
  className?: string;
}

export function UrgencyBadge({ urgency, label, className }: UrgencyBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles[urgency],
        className
      )}
    >
      {label ?? urgency.charAt(0).toUpperCase() + urgency.slice(1)}
    </span>
  );
}
