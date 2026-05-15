'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Card, CardEyebrow, Button } from '@/components/humi';
import { Capability } from '@/components/humi';
import { LifecycleAdminForm } from '@/components/benefits/templates/LifecycleAdminForm';
import { getPlan } from '@/data/benefits/plan-registry';

// ── Benefit Lifecycle — วงจรสวัสดิการ — 4-tab admin surface ─────────────────
// Tabs: On-board (BE-CYC-002) / Change (BE-CYC-003) / Off-board (BE-CYC-004)
//       / Annual Enrollment (BE-CYC-001)
// Payment Cycle (BE-CYC-005) moved to /admin/benefits/payment (PR-E).

const TABS = [
  { id: 'onboard',  planId: 'BE-CYC-002', labelTh: 'รับเข้างาน',       labelEn: 'On-boarding' },
  { id: 'change',   planId: 'BE-CYC-003', labelTh: 'เปลี่ยนแปลง',      labelEn: 'Change' },
  { id: 'offboard', planId: 'BE-CYC-004', labelTh: 'ลาออก',             labelEn: 'Off-boarding' },
  { id: 'annual',   planId: 'BE-CYC-001', labelTh: 'ลงทะเบียนประจำปี', labelEn: 'Annual Enrollment' },
] as const;

type TabId = typeof TABS[number]['id'];

export default function BenefitLifecyclePage() {
  const t = useTranslations('admin_benefits_manage');
  const locale = useLocale();
  const isTh = locale !== 'en';

  const [activeTab, setActiveTab] = useState<TabId>('onboard');

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardEyebrow>{isTh ? 'สวัสดิการ' : 'Benefits'}</CardEyebrow>
          <h1 className="font-display text-3xl font-semibold text-ink">
            {isTh ? 'วงจรสวัสดิการ' : 'Benefit Lifecycle'}
          </h1>
          <p className="mt-2 text-small text-ink-muted">
            {isTh
              ? 'จัดการวงจรสวัสดิการตามเหตุการณ์ในชีวิตการทำงาน'
              : 'Manage benefit lifecycle events for employees'}
          </p>
        </div>
        <Capability action="editFoundation" fallback={
          <Button variant="secondary" disabled>{t('runAllDisabled')}</Button>
        }>
          <Button variant="secondary" disabled>{t('runAll')}</Button>
        </Capability>
      </header>

      {/* Tab nav */}
      <div role="tablist" aria-label={t('tabsLabel')} className="flex gap-1 overflow-x-auto rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-1">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={[
                'flex-1 whitespace-nowrap rounded-[var(--radius-sm)] px-4 py-2 text-small font-medium transition-colors duration-[var(--dur-fast)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
                isActive
                  ? 'bg-surface text-ink shadow-[var(--shadow-sm)]'
                  : 'text-ink-muted hover:bg-surface/60 hover:text-ink',
              ].join(' ')}
            >
              {isTh ? tab.labelTh : tab.labelEn}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      {TABS.map((tab) => {
        const plan = getPlan(tab.planId);
        if (!plan) return null;
        return (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={tab.id !== activeTab}
          >
            <LifecycleAdminForm plan={plan} />
          </div>
        );
      })}

      {/* Scope legend */}
      <Card variant="raised" size="md">
        <CardEyebrow>{t('legendEyebrow')}</CardEyebrow>
        <p className="font-semibold text-ink">{t('legendTitle')}</p>
        <ul className="mt-3 space-y-2 text-small text-ink-muted">
          <li>
            <span className="font-medium text-ink">BE-CYC-002</span>
            {' — '}
            {isTh ? 'เปิดสิทธิ์สวัสดิการสำหรับพนักงานเข้าใหม่' : 'Opens benefit entitlements for new hires'}
          </li>
          <li>
            <span className="font-medium text-ink">BE-CYC-003</span>
            {' — '}
            {isTh ? 'ปรับสิทธิ์สวัสดิการเมื่อมีการเปลี่ยนแปลงสถานะ' : 'Adjusts entitlements on status changes'}
          </li>
          <li>
            <span className="font-medium text-ink">BE-CYC-004</span>
            {' — '}
            {isTh ? 'ปิดสิทธิ์สวัสดิการเมื่อพนักงานลาออก' : 'Closes entitlements on employee termination'}
          </li>
          <li>
            <span className="font-medium text-ink">BE-CYC-001</span>
            {' — '}
            {isTh ? 'รอบลงทะเบียนสวัสดิการประจำปี' : 'Annual benefit enrollment window'}
          </li>
        </ul>
      </Card>

    </div>
  );
}
