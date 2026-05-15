'use client';

import { useRef } from 'react';

export interface PlanConfiguratorTab {
  id: string;
  labelTh: string;
  labelEn: string;
  panel: React.ReactNode;
}

export interface PlanConfiguratorShellProps {
  tabs: PlanConfiguratorTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  isTh: boolean;
}

/**
 * PlanConfiguratorShell — presentational 9-tab shell.
 *
 * Implements WAI-ARIA APG "Tabs with Automatic Activation":
 *   - role=tablist / role=tab / role=tabpanel
 *   - aria-selected, aria-controls, aria-labelledby
 *   - ArrowLeft/Right/Home/End keyboard navigation
 */
export function PlanConfiguratorShell({
  tabs,
  activeTab,
  onTabChange,
  isTh,
}: PlanConfiguratorShellProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const last = tabs.length - 1;
    let next = index;
    switch (e.key) {
      case 'ArrowRight': next = index === last ? 0 : index + 1; break;
      case 'ArrowLeft':  next = index === 0 ? last : index - 1; break;
      case 'Home':       next = 0; break;
      case 'End':        next = last; break;
      default: return;
    }
    e.preventDefault();
    onTabChange(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const activeIndex = tabs.findIndex((t) => t.id === activeTab);
  const activePanel = tabs[activeIndex]?.panel ?? null;

  return (
    <div className="flex flex-col gap-4">
      {/* Tablist */}
      <div
        role="tablist"
        aria-label={isTh ? 'แท็บการตั้งค่าแผนสวัสดิการ' : 'Benefit plan configurator tabs'}
        className="flex flex-wrap gap-2"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              ref={(el) => { tabRefs.current[index] = el; }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => onTabChange(tab.id)}
              className={[
                'rounded-[var(--radius-md)] border px-3 py-1.5 text-small font-medium transition-[background-color,border-color,color] duration-[var(--dur-fast)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas',
                isActive
                  ? 'bg-accent-soft text-accent border-accent/30'
                  : 'bg-canvas-soft text-ink-muted border-hairline hover:border-accent/40',
              ].join(' ')}
            >
              {isTh ? tab.labelTh : tab.labelEn}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activePanel}
      </div>
    </div>
  );
}
