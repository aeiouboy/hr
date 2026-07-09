'use client';

import { cn } from '@/lib/utils';

// Precision Cool Tabs — rewritten from scratch.
// Tokens only: border-hairline + border-brand (active) + ring-accent (focus).
// No gray-200 / gray-700 / raw hexes. Ref aeiouboy/stark#1180.

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
 <div className={cn('border-b border-hairline', className)}>
 <nav className="-mb-px flex gap-x-1 overflow-x-auto" aria-label="Tabs">
 {tabs.map((tab) => {
 const isActive = tab.key === activeTab;
 const base =
'whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors min-h-[44px] outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:rounded-sm';
 const active ='border-brand text-brand';
 const inactive =
'border-transparent text-ink-soft hover:border-hairline hover:text-ink';

 if (tab.href) {
 return (
 <a
 key={tab.key}
 href={tab.href}
 className={cn(base, isActive ? active : inactive)}
 aria-current={isActive ?'page' : undefined}
 >
 {tab.label}
 </a>
 );
 }

 return (
 <button
 key={tab.key}
 type="button"
 onClick={() => onTabChange?.(tab.key)}
 className={cn(base, isActive ? active : inactive)}
 aria-current={isActive ?'page' : undefined}
 >
 {tab.label}
 </button>
 );
 })}
 </nav>
 </div>
 );
}
