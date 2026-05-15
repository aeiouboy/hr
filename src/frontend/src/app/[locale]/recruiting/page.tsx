'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Card } from '@/components/humi';

export default function RecruitingPage() {
  const t = useTranslations('pages.recruitingExt');
  const items: string[] = t.raw('hrmsExposesItems') as string[];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {/* Zone A: Module name + badge */}
      <div className="flex items-start gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-info-tint text-info border border-info/20">
              {t('badge')}
            </span>
          </div>
        </div>
      </div>

      {/* Zone B: Summary */}
      <Card>
        <p className="text-sm text-ink-muted leading-relaxed">{t('summary')}</p>
      </Card>

      {/* Zone C: Integration point */}
      <Card className="border-l-4 border-l-info">
        <p className="text-xs font-semibold text-info uppercase tracking-wide mb-3">
          {t('integrationLabel')}
        </p>
        <div className="flex items-center gap-2 flex-wrap text-sm font-medium text-ink mb-3">
          {t('integrationFlow').split('→').map((segment, i, arr) => (
            <span key={i} className="flex items-center gap-2">
              <span className="rounded bg-canvas-soft px-2 py-1 border border-hairline text-ink">
                {segment.trim()}
              </span>
              {i < arr.length - 1 && (
                <ArrowRight className="h-4 w-4 text-ink-muted flex-shrink-0" />
              )}
            </span>
          ))}
        </div>
        <p className="text-xs text-ink-muted">{t('integrationNote')}</p>
      </Card>

      {/* Zone D: What HRMS surfaces */}
      <Card>
        <p className="text-xs font-semibold text-ink uppercase tracking-wide mb-3">
          {t('hrmsExposes')}
        </p>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-hairline">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            {t('openPlatform')}
          </a>
        </div>
      </Card>
    </div>
  );
}
