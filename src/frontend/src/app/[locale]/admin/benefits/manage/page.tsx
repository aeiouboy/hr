'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Card, CardEyebrow, CardTitle, Button } from '@/components/humi';
import { Capability } from '@/components/humi';
import { LifecycleAdminForm } from '@/components/benefits/templates/LifecycleAdminForm';
import { getPlan } from '@/data/benefits/plan-registry';

// ── Manage Benefits lifecycle — 4-tab admin surface ──────────────────────────
// Tabs: On-board (BE-CYC-002) / Change (BE-CYC-003) / Off-board (BE-CYC-004)
//       / Annual Enrollment (BE-CYC-001)
// Payment Cycle (BE-CYC-005) is shown as a separate card below the tabs.

const TABS = [
  { id: 'onboard',  planId: 'BE-CYC-002', labelTh: 'รับเข้างาน',       labelEn: 'On-boarding' },
  { id: 'change',   planId: 'BE-CYC-003', labelTh: 'เปลี่ยนแปลง',      labelEn: 'Change' },
  { id: 'offboard', planId: 'BE-CYC-004', labelTh: 'ลาออก',             labelEn: 'Off-boarding' },
  { id: 'annual',   planId: 'BE-CYC-001', labelTh: 'ลงทะเบียนประจำปี', labelEn: 'Annual Enrollment' },
] as const;

type TabId = typeof TABS[number]['id'];

const PAYMENT_PLAN_ID = 'BE-CYC-005';

const TOTAL_STEPS = 8;

const RUN_JOB_ROWS = [
  { id: 'BE-CYC-001', labelTh: 'ลงทะเบียนประจำปี',    labelEn: 'Annual Enrollment',    ok: true },
  { id: 'BE-CYC-002', labelTh: 'รับเข้างาน',           labelEn: 'On-boarding',           ok: true },
  { id: 'BE-CYC-003', labelTh: 'เปลี่ยนแปลงสถานะ',    labelEn: 'Status Change',         ok: true },
  { id: 'BE-CYC-004', labelTh: 'ลาออก',                labelEn: 'Off-boarding',          ok: true },
  { id: 'BE-CYC-005', labelTh: 'รอบจ่ายเงิน',          labelEn: 'Payment Cycle',         ok: true },
  { id: 'BE-CYC-005A', labelTh: 'ตรวจสอบวงเงิน',      labelEn: 'Entitlement check',     ok: false },
  { id: 'BE-CYC-005B', labelTh: 'รายการค้างจ่าย',     labelEn: 'Pending disbursement',  ok: false },
  { id: 'BE-CYC-SYN', labelTh: 'ซิงก์ข้อมูลพนักงาน', labelEn: 'Employee data sync',    ok: true },
];

export default function ManageBenefitsPage() {
  const t = useTranslations('admin_benefits_manage');
  const locale = useLocale();
  const isTh = locale !== 'en';

  const [activeTab, setActiveTab] = useState<TabId>('onboard');
  const [runState, setRunState] = useState<'idle' | 'running' | 'done'>('idle');
  const [currentStep, setCurrentStep] = useState(0);

  const currentTab = TABS.find((tab) => tab.id === activeTab)!;
  const activePlan = getPlan(currentTab.planId);
  const paymentPlan = getPlan(PAYMENT_PLAN_ID);

  const handleRunAll = async () => {
    setRunState('running');
    setCurrentStep(0);
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      await new Promise<void>((resolve) => setTimeout(resolve, 600));
      setCurrentStep(i);
    }
    setRunState('done');
  };

  const runButtonLabel = runState === 'running'
    ? (isTh ? `กำลังทำงาน… (${currentStep}/${TOTAL_STEPS})` : `Running… (${currentStep}/${TOTAL_STEPS})`)
    : runState === 'done'
    ? (isTh ? 'รันใหม่' : 'Re-run')
    : t('runAll');

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardEyebrow>{t('eyebrow')}</CardEyebrow>
          <h1 className="font-display text-[28px] font-semibold text-ink">{t('title')}</h1>
          <p className="mt-2 text-small text-ink-muted">{t('subtitle')}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Capability action="editFoundation" fallback={
            <Button variant="secondary" disabled>{t('runAllDisabled')}</Button>
          }>
            <Button
              variant="secondary"
              disabled={runState === 'running'}
              onClick={handleRunAll}
            >
              {runButtonLabel}
            </Button>
          </Capability>
          {runState !== 'idle' && (
            <div className="w-full min-w-[200px] space-y-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-canvas-soft">
                <div
                  className="h-full bg-accent transition-[width] duration-[var(--dur-base)]"
                  style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                />
              </div>
              <p className="text-small text-ink-muted">
                {isTh ? `ขั้นตอน ${currentStep}/${TOTAL_STEPS}` : `Step ${currentStep}/${TOTAL_STEPS}`}
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Run result panel */}
      {runState === 'done' && (
        <Card variant="raised" size="md">
          <CardEyebrow>{isTh ? 'ผลการรัน' : 'Run result'}</CardEyebrow>
          <CardTitle>{isTh ? '8/8 ผ่าน · 2 รายการต้องตรวจ' : '8/8 OK · 2 anomalies'}</CardTitle>
          <ul className="mt-3 space-y-1 text-small text-ink-muted">
            {RUN_JOB_ROWS.map((job) => (
              <li key={job.id} className="flex items-center gap-2">
                <span
                  className={[
                    'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                    job.ok ? 'bg-success' : 'bg-warning',
                  ].join(' ')}
                  aria-hidden
                />
                <span className="font-mono text-ink-muted">{job.id}</span>
                <span className="text-ink">{isTh ? job.labelTh : job.labelEn}</span>
                {!job.ok && (
                  <span className="ml-auto text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.12em] text-warning">
                    {isTh ? 'ตรวจสอบ' : 'Review'}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

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
        <CardTitle>{t('legendTitle')}</CardTitle>
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

      {/* Payment cycle card — separate from tabs */}
      {paymentPlan && (
        <section aria-labelledby="payment-cycle-heading">
          <h2
            id="payment-cycle-heading"
            className="mb-3 font-display text-[length:var(--text-display-h3)] font-semibold text-ink"
          >
            {isTh ? 'รอบจ่ายเงินสวัสดิการ' : 'Benefit Payment Cycle'}
          </h2>
          <LifecycleAdminForm plan={paymentPlan} />
          <p className="mt-2 text-small text-ink-muted">
            {isTh
              ? 'รอบจ่าย: 6 / 16 / 26 ของเดือน — SAP payroll IT0015 / IT0267'
              : 'Payment runs on the 6th, 16th, and 26th of each month — SAP payroll IT0015 / IT0267'}
          </p>
        </section>
      )}
    </div>
  );
}
