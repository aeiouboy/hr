'use client';

import { useTranslations } from 'next-intl';

export type ModuleId = 'ec' | 'time' | 'payroll' | 'benefits' | 'performance' | 'learning' | 'recruiting';

export interface QuickStat {
  label: string;
  value: number | string;
}

export interface ModuleContextStripProps {
  module: ModuleId;
  persona: string;
  quickStats?: QuickStat[];
}

export function ModuleContextStrip({ module, persona, quickStats = [] }: ModuleContextStripProps) {
  const t = useTranslations('moduleContext');

  const moduleLabel = t(`modules.${module}`);

  return (
    <div
      className="flex items-center gap-3 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft px-4 py-2.5"
      role="banner"
      aria-label={`${moduleLabel} · ${persona}`}
    >
      <span className="text-small font-semibold text-accent">{moduleLabel}</span>
      <span className="text-small text-ink-muted" aria-hidden>·</span>
      <span className="text-small text-ink-muted">{persona}</span>
      {quickStats.map((stat) => (
        <span
          key={stat.label}
          className="humi-tag humi-tag--accent ml-1 text-small"
          aria-label={`${stat.value} ${stat.label}`}
        >
          <b>{stat.value}</b>&nbsp;{stat.label}
        </span>
      ))}
    </div>
  );
}
