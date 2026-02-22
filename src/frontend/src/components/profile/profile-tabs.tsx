'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  User,
  Briefcase,
  DollarSign,
  Gift,
  UserCircle,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'personal', icon: User, labelKey: 'profile.personal' },
  { id: 'employment', icon: Briefcase, labelKey: 'profile.employment' },
  { id: 'compensation', icon: DollarSign, labelKey: 'profile.compensation' },
  { id: 'benefits', icon: Gift, labelKey: 'profile.benefits' },
  { id: 'profile-details', icon: UserCircle, labelKey: 'profile.profileDetails' },
  { id: 'scorecard', icon: BarChart3, labelKey: 'profile.scorecard' },
] as const;

export type ProfileTabId = (typeof TABS)[number]['id'];

interface ProfileTabsProps {
  activeTab: ProfileTabId;
  onChange?: (tab: ProfileTabId) => void;
  basePath?: string;
}

export function ProfileTabs({ activeTab, onChange, basePath }: ProfileTabsProps) {
  const t = useTranslations();

  return (
    <div className="bg-white border-b overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex gap-0 -mb-px" role="tablist" aria-label="Profile tabs">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const classes = cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap',
              isActive
                ? 'border-cg-red text-cg-red'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            );

            if (basePath) {
              return (
                <Link
                  key={tab.id}
                  href={`${basePath}/${tab.id}`}
                  className={classes}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{t(tab.labelKey)}</span>
                </Link>
              );
            }

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange?.(tab.id)}
                className={classes}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t(tab.labelKey)}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
