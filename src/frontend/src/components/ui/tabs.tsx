'use client';

import { cn } from '@/lib/utils';

interface Tab {
  key: string;
  label: string;
  href?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange?: (key: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn('border-b border-gray-200', className)}>
      <nav className="-mb-px flex gap-x-1 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          const baseClasses =
            'whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors';
          const activeClasses = 'border-cg-red text-cg-red';
          const inactiveClasses =
            'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700';

          if (tab.href) {
            return (
              <a
                key={tab.key}
                href={tab.href}
                className={cn(baseClasses, isActive ? activeClasses : inactiveClasses)}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
              </a>
            );
          }

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange?.(tab.key)}
              className={cn(baseClasses, isActive ? activeClasses : inactiveClasses)}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
