'use client';

/**
 * SmartTabs — 3-tab nav for /quick-approve (STA-28 PR-B v2)
 *
 * Tabs: Action Required / Watching / History / All (for HR personas)
 * Active tab: bg-accent-soft text-accent (Humi tokens only)
 * Count badges derived from parent's single useMemo (AC-3)
 */

import { useLocale } from 'next-intl';
import type { TabCounts } from './predicates';
import type { PersonaDefaultTab } from '@/hooks/usePersonaDefault';
import { cn } from '@/lib/utils';

export type ActiveTab = PersonaDefaultTab;

interface SmartTabsProps {
  activeTab: ActiveTab;
  onChange: (tab: ActiveTab) => void;
  counts: TabCounts;
  /** Show the "All" tab — true for hr_admin / hr_manager personas */
  showAllTab?: boolean;
}

interface TabDef {
  id: ActiveTab;
  labelTh: string;
  labelEn: string;
  count: number | null;
}

export function SmartTabs({ activeTab, onChange, counts, showAllTab = false }: SmartTabsProps) {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const tabs: TabDef[] = [
    {
      id: 'action',
      labelTh: 'ต้องดำเนินการ',
      labelEn: 'Action Required',
      count: counts.action,
    },
    {
      id: 'watching',
      labelTh: 'ติดตาม',
      labelEn: 'Watching',
      count: counts.watching,
    },
    {
      id: 'history',
      labelTh: 'ประวัติ',
      labelEn: 'History',
      count: counts.history,
    },
    ...(showAllTab
      ? ([
          {
            id: 'all' as ActiveTab,
            labelTh: 'ทั้งหมด',
            labelEn: 'All',
            count: counts.all,
          },
        ] as TabDef[])
      : []),
  ];

  return (
    <div
      className="flex items-center gap-1 rounded-[var(--radius-md)] bg-canvas-soft p-1"
      role="tablist"
      aria-label={isTh ? 'ตัวกรองคำขออนุมัติ' : 'Approval queue tabs'}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tab-panel-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-accent-soft text-accent shadow-[var(--shadow-card)]'
                : 'text-ink-muted hover:text-ink hover:bg-surface',
            )}
          >
            {isTh ? tab.labelTh : tab.labelEn}
            {tab.count !== null && tab.count > 0 && (
              <span
                className={cn(
                  'inline-flex h-5 min-w-[20px] items-center justify-center rounded-[var(--radius-full)] px-1.5 text-xs font-semibold tabular-nums',
                  isActive ? 'bg-accent/20 text-accent' : 'bg-surface-raised text-ink-muted',
                )}
                aria-label={`${tab.count} ${isTh ? 'รายการ' : 'items'}`}
              >
                {tab.count > 99 ? '99+' : tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
