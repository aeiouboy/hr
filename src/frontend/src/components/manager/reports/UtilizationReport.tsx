'use client';

// STA-28 PR-E — UtilizationReport (M-RP-04)
// Benefit plan utilization % per plan for the team.
// CSS flex bar chart (no chart libs). One row per plan from MATRIX_PLAN_IDS.

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Download } from 'lucide-react';
import { Card } from '@/components/humi';
import { Skeleton } from '@/components/ui/skeleton';
import { useDirectReports } from '@/hooks/use-direct-reports';
import {
  getReportEntitlementUsage,
  getReportEnrolled,
  MATRIX_PLAN_IDS,
} from '@/lib/team-benefits-mock';
import { BENEFIT_PLAN_REGISTRY } from '@/data/benefits/plan-registry';
import { csvExport } from '@/lib/manager-reports-mock';
import { cn } from '@/lib/utils';

function barColorClass(pct: number): string {
  if (pct > 80) return 'bg-[var(--color-danger)]/40';
  if (pct >= 50) return 'bg-warning/40';
  if (pct > 0) return 'bg-accent-soft';
  return 'bg-canvas-soft';
}

export function UtilizationReport() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const { data: employees, isLoading } = useDirectReports('EMP001');
  const [exporting, setExporting] = useState(false);

  // Compute utilization per plan across all direct reports
  const planStats = useMemo(() => {
    return MATRIX_PLAN_IDS.map((planId) => {
      const plan = BENEFIT_PLAN_REGISTRY.find((p) => p.id === planId);
      const annualLimit = plan?.annualLimitThb ?? 12000;

      let totalUsed = 0;
      let totalLimit = 0;
      let enrolledCount = 0;

      employees.forEach((emp) => {
        if (!getReportEnrolled(emp.id, planId)) return;
        enrolledCount++;
        const { used, total } = getReportEntitlementUsage(emp.id, planId, annualLimit);
        totalUsed += used;
        totalLimit += total;
      });

      const utilizationPct = totalLimit > 0 ? Math.round((totalUsed / totalLimit) * 100) : 0;

      return {
        planId,
        nameEn: plan?.nameEn ?? planId,
        nameTh: plan?.nameTh ?? planId,
        category: plan?.category ?? 'medical',
        annualLimit,
        totalUsed,
        totalLimit,
        utilizationPct,
        enrolledCount,
        totalEmployees: employees.length,
      };
    });
  }, [employees]);

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      csvExport(
        'utilization-2026-05.csv',
        planStats.map((p) => ({
          plan_id: p.planId,
          plan_name_en: p.nameEn,
          category: p.category,
          enrolled: p.enrolledCount,
          total_employees: p.totalEmployees,
          total_used_thb: p.totalUsed,
          total_limit_thb: p.totalLimit,
          utilization_pct: p.utilizationPct,
        })),
      );
      setExporting(false);
    }, 300);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header + export */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-muted">
          {isTh
            ? `แสดงสัดส่วนการใช้งาน ${MATRIX_PLAN_IDS.length} แผนสวัสดิการ ณ ปัจจุบัน`
            : `Current utilization across ${MATRIX_PLAN_IDS.length} benefit plans`}
        </p>
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

      {/* Bar chart card */}
      <Card className="flex flex-col gap-5 p-5">
        <h3 className="text-sm font-medium text-ink">
          {isTh ? 'อัตราการใช้งานต่อแผน (% ของวงเงิน)' : 'Plan Utilization (% of entitlement)'}
        </h3>
        <div className="flex flex-col gap-4">
          {planStats.map((plan) => (
            <div key={plan.planId} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink">
                    {isTh ? plan.nameTh : plan.nameEn}
                  </span>
                  <span className="text-ink-muted">
                    {plan.enrolledCount}/{plan.totalEmployees}{' '}
                    {isTh ? 'คน' : 'enrolled'}
                  </span>
                </div>
                <span
                  className={cn(
                    'font-semibold tabular-nums',
                    plan.utilizationPct > 80
                      ? 'text-[var(--color-danger)]'
                      : plan.utilizationPct >= 50
                        ? 'text-warning'
                        : 'text-accent',
                  )}
                >
                  {plan.utilizationPct}%
                </span>
              </div>

              {/* CSS bar */}
              <div className="h-6 overflow-hidden rounded-md bg-canvas-soft">
                <div
                  className={cn(
                    'h-full rounded-md transition-all duration-500',
                    barColorClass(plan.utilizationPct),
                  )}
                  style={{ width: `${plan.utilizationPct}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-ink-muted">
                <span>
                  ฿{plan.totalUsed.toLocaleString(isTh ? 'th-TH' : 'en-US')}
                  {' / '}
                  ฿{plan.totalLimit.toLocaleString(isTh ? 'th-TH' : 'en-US')}
                </span>
                <span className="text-xs text-ink-muted capitalize">{plan.category}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
        <span className="font-medium">{isTh ? 'สี:' : 'Color key:'}</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-8 rounded bg-accent-soft" />
          {isTh ? 'ต่ำกว่า 50%' : '< 50%'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-8 rounded bg-warning/40" />
          {isTh ? '50–80%' : '50–80%'}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-8 rounded bg-[var(--color-danger)]/40" />
          {isTh ? 'มากกว่า 80%' : '> 80%'}
        </span>
      </div>
    </div>
  );
}
