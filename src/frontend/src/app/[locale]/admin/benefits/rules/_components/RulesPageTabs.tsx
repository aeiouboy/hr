'use client';

import { useState } from 'react';
import { EntitlementRulesManager } from './EntitlementRulesManager';
import { BenefitRulesViewer } from '@/components/benefits/BenefitRulesViewer';

type BenefitRulesViewerT = React.ComponentProps<typeof BenefitRulesViewer>['t'];

interface RulesPageTabsProps {
  t: BenefitRulesViewerT;
  highlightRuleId?: string;
}

const TABS = [
  { id: 'entitlement', label: 'กฎวงเงินสิทธิ์' },
  { id: 'dsl',         label: 'กฎ DSL (SF)' },
] as const;

type TabId = typeof TABS[number]['id'];

export function RulesPageTabs({ t, highlightRuleId }: RulesPageTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('entitlement');

  return (
    <div className="space-y-4">
      {/* Tab nav */}
      <div className="flex gap-1 border-b border-hairline">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={[
              'px-4 py-2.5 text-small font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-t-md',
              activeTab === tab.id
                ? 'border-b-2 border-accent text-accent -mb-px bg-accent-soft/40'
                : 'text-ink-muted hover:text-ink hover:bg-canvas-soft',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'entitlement' && <EntitlementRulesManager />}
      {activeTab === 'dsl'         && <BenefitRulesViewer t={t} highlightRuleId={highlightRuleId} />}
    </div>
  );
}
