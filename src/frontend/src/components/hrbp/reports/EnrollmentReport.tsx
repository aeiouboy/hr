'use client';

// STA-27 PR-B' — EnrollmentReport (HR-RP-03 BE_26 r4)
// Enrollment % per benefit plan within enrollment window.
// CSS bars: <50% danger, 50–80% warning, >80% accent.

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Download } from 'lucide-react';
import { Card, DemoValuesDisclaimer } from '@/components/humi';
import { getEnrollmentByPlan } from '@/lib/hrbp-reports-mock';
import { csvExport } from '@/lib/manager-reports-mock';
import { cn } from '@/lib/utils';

function enrollBarClass(pct: number): string {
  if (pct > 80) return 'bg-accent';
  if (pct >= 50) return 'bg-warning';
  return 'bg-[var(--color-danger)]/70';
}

function enrollLabelClass(pct: number): string {
  if (pct > 80) return 'text-accent';
  if (pct >= 50) return 'text-warning';
  return 'text-[var(--color-danger)]';
}

export function EnrollmentReport() {
  const locale = useLocale();
  const isTh = locale !== 'en';
  const [exporting, setExporting] = useState(false);

  const plans = useMemo(() => getEnrollmentByPlan(), []);

  const avgPct = plans.length > 0
    ? Math.round(plans.reduce((s, p) => s + p.pct, 0) / plans.length)
    : 0;
  const atRiskCount = plans.filter((p) => p.pct < 50).length;

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      csvExport('hrbp-enrollment-2026.csv', plans.map((p) => ({
        plan_code: p.planCode,
        plan_name_en: p.planNameEn,
        plan_name_th: p.planNameTh,
        enrolled: p.enrolled,
        total_eligible: p.total,
        enrollment_pct: p.pct,
      })));
      setExporting(false);
    }, 300);
  }

  return (
    <div className="flex flex-col gap-6">
      <DemoValuesDisclaimer />

      {/* Stat tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">{isTh ? 'แผนสวัสดิการทั้งหมด' : 'Total Plans'}</span>
          <p className="text-2xl font-semibold text-ink">{plans.length}</p>
        </Card>
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">{isTh ? 'อัตราลงทะเบียนเฉลี่ย' : 'Avg Enrollment Rate'}</span>
          <p className={cn('text-2xl font-semibold', enrollLabelClass(avgPct))}>{avgPct}%</p>
        </Card>
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">
            {isTh ? 'แผนที่มีอัตราต่ำกว่า 50% (ความเสี่ยง)' : 'Plans < 50% (at risk)'}
          </span>
          <p className={cn('text-2xl font-semibold', atRiskCount > 0 ? 'text-[var(--color-danger)]' : 'text-accent')}>
            {atRiskCount}
          </p>
        </Card>
      </div>

      {/* Header + export */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-ink">
          {isTh ? 'อัตราการลงทะเบียนต่อแผน' : 'Enrollment Rate by Plan'}
        </h3>
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3 py-1.5 text-xs text-ink hover:bg-canvas-soft disabled:opacity-50"
        >
          <Download className="h-3.5 w-3.5" />
          {exporting
            ? isTh ? 'กำลังส่งออก…' : 'Exporting…'
            : isTh ? 'ส่งออก CSV' : 'Export CSV'}
        </button>
      </div>

      <Card className="flex flex-col gap-5 p-5">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
          <span className="font-medium">{isTh ? 'สี:' : 'Color key:'}</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-8 rounded bg-accent" />
            {isTh ? 'มากกว่า 80%' : '> 80%'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-8 rounded bg-warning" />
            {isTh ? '50–80%' : '50–80%'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-8 rounded bg-[var(--color-danger)]/70" />
            {isTh ? 'ต่ำกว่า 50%' : '< 50%'}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {plans.map((plan) => (
            <div key={plan.planCode} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-ink">
                  {isTh ? plan.planNameTh : plan.planNameEn}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-ink-muted">
                    {plan.enrolled}/{plan.total} {isTh ? 'คน' : 'enrolled'}
                  </span>
                  <span className={cn('w-10 text-right font-semibold tabular-nums', enrollLabelClass(plan.pct))}>
                    {plan.pct}%
                  </span>
                </div>
              </div>
              <div className="h-6 overflow-hidden rounded-md bg-canvas-soft">
                <div
                  className={cn('h-full rounded-md transition-all duration-500', enrollBarClass(plan.pct))}
                  style={{ width: `${plan.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
