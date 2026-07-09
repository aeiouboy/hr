'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { LucideIcon } from 'lucide-react';
import { Card } from './Card';
import { Button } from '../atoms/Button';

export interface EmptyStateProps {
  icon: LucideIcon;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  ctaLabelTh?: string;
  ctaLabelEn?: string;
  ctaHref?: string;
}

export function EmptyState({
  icon: Icon,
  titleTh,
  titleEn,
  descTh,
  descEn,
  ctaLabelTh,
  ctaLabelEn,
  ctaHref,
}: EmptyStateProps) {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const ctaLabel = isTh ? ctaLabelTh : ctaLabelEn;

  return (
    <Card variant="flat" size="lg" className="py-14 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas-soft">
          <Icon className="h-6 w-6 text-ink-muted" strokeWidth={1.5} aria-hidden />
        </div>
        <div className="space-y-1">
          <p className="text-base font-semibold text-ink">
            {isTh ? titleTh : titleEn}
          </p>
          <p className="text-small text-ink-muted max-w-xs mx-auto">
            {isTh ? descTh : descEn}
          </p>
        </div>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="mt-2 inline-flex items-center justify-center rounded-[var(--radius-md)] bg-accent px-4 py-2 text-small font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </Card>
  );
}
