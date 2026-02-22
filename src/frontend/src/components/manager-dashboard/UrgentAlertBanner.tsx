'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle, X } from 'lucide-react';
import type { UrgentAlert } from '@/lib/manager-dashboard-api';

interface UrgentAlertBannerProps {
  alerts: UrgentAlert[];
}

export function UrgentAlertBanner({ alerts }: UrgentAlertBannerProps) {
  const t = useTranslations('managerDashboard.alerts');
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = alerts.filter((a) => !dismissed.has(a.id));
  if (visible.length === 0) return null;

  const dismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id));
  };

  return (
    <div className="space-y-2">
      {visible.map((alert) => (
        <div
          key={alert.id}
          className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
          role="alert"
        >
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-red-800">{alert.title}</p>
            <p className="text-xs text-red-600 mt-0.5">{alert.message}</p>
          </div>
          <button
            onClick={() => dismiss(alert.id)}
            className="p-1 rounded hover:bg-red-100 transition"
            aria-label={t('dismiss') ?? 'Dismiss'}
          >
            <X className="h-4 w-4 text-red-400" />
          </button>
        </div>
      ))}
    </div>
  );
}
