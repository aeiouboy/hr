'use client';

import { useTranslations } from 'next-intl';
import { CalendarDays, ClipboardList, PlusCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export type LeaveTabId = 'balances' | 'request' | 'history' | 'calendar';

const TAB_ICONS: Record<LeaveTabId, React.ElementType> = {
  balances: CalendarDays,
  request: PlusCircle,
  history: Clock,
  calendar: ClipboardList,
};

interface LeaveTabsProps {
  activeTab: LeaveTabId;
  onChange: (tab: LeaveTabId) => void;
}

export function LeaveTabs({ activeTab, onChange }: LeaveTabsProps) {
  const t = useTranslations('leave');

  const tabs: { id: LeaveTabId; label: string }[] = [
    { id: 'balances', label: t('balances') },
    { id: 'request', label: t('request') },
    { id: 'history', label: t('history') },
    { id: 'calendar', label: t('calendar') },
  ];

  return (
    <div className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex gap-1 overflow-x-auto -mb-px" aria-label="Leave tabs">
          {tabs.map((tab) => {
            const Icon = TAB_ICONS[tab.id];
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors',
                  isActive
                    ? 'border-cg-red text-cg-red'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
