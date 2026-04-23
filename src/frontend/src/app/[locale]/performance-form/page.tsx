'use client';

import { useTranslations } from 'next-intl';

export default function PerformanceFormPage() {
  const t = useTranslations();
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="humi-card max-w-md w-full text-center p-8">
        <h1 className="font-display text-[24px] font-semibold text-ink mb-3">
          {t('pages.performanceForm.title')}
        </h1>
        <p className="text-sm text-ink-muted">{t('placeholders.comingSoon')}</p>
      </div>
    </div>
  );
}
