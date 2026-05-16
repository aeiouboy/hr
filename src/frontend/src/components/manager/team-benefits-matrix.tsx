'use client';

// STA-28 PR-D — TeamBenefitsMatrix
// Manager view: rows = direct reports, columns = 7 common benefit plans.
// Each cell shows usage chip (used / total) with Humi color tokens per threshold.

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';
import { Card } from '@/components/humi';
import { Skeleton } from '@/components/ui/skeleton';
import { useDirectReports } from '@/hooks/use-direct-reports';
import { TeamSummaryTiles } from '@/components/manager/team-summary-tiles';
import { BENEFIT_PLAN_REGISTRY } from '@/data/benefits/plan-registry';
import {
  getReportEntitlementUsage,
  getReportEnrolled,
  MATRIX_PLAN_IDS,
} from '@/lib/team-benefits-mock';
import type { MatrixPlanId } from '@/lib/team-benefits-mock';
import { cn } from '@/lib/utils';

// ── Plan filter types ─────────────────────────────────────────────────────

type PlanFilterType = 'all' | 'annual' | 'on-demand';

const ANNUAL_PLAN_IDS = new Set(['BE-GAS-001', 'BE-TOL-001', 'BE-PAR-001']);

// ── Usage chip color thresholds (Humi tokens only, no hex) ───────────────

function usageChipClass(used: number, total: number): string {
  if (total === 0) return 'bg-canvas-soft text-ink-muted';
  const pct = used / total;
  if (pct > 0.8) return 'bg-[var(--color-danger)]/10 text-[var(--color-danger)] font-semibold';
  if (pct >= 0.5) return 'bg-warning/10 text-warning font-semibold';
  if (pct > 0) return 'bg-accent-soft text-accent';
  return 'bg-canvas-soft text-ink-muted';
}

// ── Matrix component ──────────────────────────────────────────────────────

export function TeamBenefitsMatrix() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState<PlanFilterType>('all');
  const [filterOpen, setFilterOpen] = useState(false);

  const { data: employees, isLoading } = useDirectReports('EMP001');

  // Resolve plan metadata from registry
  const matrixPlans = useMemo(
    () =>
      MATRIX_PLAN_IDS.map((id) => BENEFIT_PLAN_REGISTRY.find((p) => p.id === id)).filter(
        Boolean,
      ) as (typeof BENEFIT_PLAN_REGISTRY)[number][],
    [],
  );

  // Apply plan-type filter to columns
  const visiblePlans = useMemo(() => {
    if (planFilter === 'all') return matrixPlans;
    if (planFilter === 'annual') return matrixPlans.filter((p) => ANNUAL_PLAN_IDS.has(p.id));
    return matrixPlans.filter((p) => !ANNUAL_PLAN_IDS.has(p.id));
  }, [matrixPlans, planFilter]);

  // Filter rows by search (name or department, case-insensitive)
  const filteredEmployees = useMemo(() => {
    if (!search.trim()) return employees;
    const q = search.toLowerCase();
    return employees.filter(
      (e) =>
        e.nameTh.toLowerCase().includes(q) ||
        e.nameEn.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q),
    );
  }, [employees, search]);

  const planFilterLabel: Record<PlanFilterType, { th: string; en: string }> = {
    all: { th: 'ทุกประเภท', en: 'All Types' },
    annual: { th: 'ลงทะเบียนรายปี', en: 'Annual Enrollment' },
    'on-demand': { th: 'เบิกตามจริง', en: 'On-Demand' },
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Summary tiles */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : (
        <TeamSummaryTiles employees={employees} />
      )}

      {/* Filter row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isTh ? 'ค้นหาชื่อหรือแผนก…' : 'Search name or department…'}
            className="w-full rounded-lg border border-hairline bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Plan-type filter dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-ink hover:bg-canvas-soft focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <span>{isTh ? planFilterLabel[planFilter].th : planFilterLabel[planFilter].en}</span>
            <ChevronDown className="h-4 w-4 text-ink-muted" />
          </button>
          {filterOpen && (
            <div className="absolute right-0 z-10 mt-1 w-44 rounded-lg border border-hairline bg-surface shadow-[var(--shadow-card)]">
              {(Object.keys(planFilterLabel) as PlanFilterType[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setPlanFilter(key);
                    setFilterOpen(false);
                  }}
                  className={cn(
                    'block w-full px-4 py-2 text-left text-sm hover:bg-canvas-soft',
                    planFilter === key ? 'text-accent font-medium' : 'text-ink',
                  )}
                >
                  {isTh ? planFilterLabel[key].th : planFilterLabel[key].en}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Matrix table */}
      <Card className="overflow-hidden p-0">
        {isLoading ? (
          <div className="flex flex-col gap-3 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-hairline bg-canvas-soft">
                  <th className="sticky left-0 z-10 bg-canvas-soft px-4 py-3 text-left text-xs font-medium text-ink-muted">
                    {isTh ? 'พนักงาน' : 'Employee'}
                  </th>
                  {visiblePlans.map((plan) => (
                    <th
                      key={plan.id}
                      className="min-w-[100px] px-3 py-3 text-center text-xs font-medium text-ink-muted"
                    >
                      <span className="block">{isTh ? plan.nameTh : plan.nameEn}</span>
                      <span className="block text-xs font-normal opacity-60">
                        {plan.id}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td
                      colSpan={visiblePlans.length + 1}
                      className="py-10 text-center text-sm text-ink-muted"
                    >
                      {isTh ? 'ไม่พบพนักงาน' : 'No employees found'}
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b border-hairline last:border-b-0 hover:bg-canvas-soft/50"
                    >
                      {/* Employee name cell — click navigates to profile */}
                      <td className="sticky left-0 z-10 bg-surface px-4 py-3 hover:bg-canvas-soft/50">
                        <Link
                          href={`/${locale}/profile/${emp.id}/benefits`}
                          className="flex flex-col hover:underline"
                        >
                          <span className="font-medium text-ink">
                            {isTh ? emp.nameTh : emp.nameEn}
                          </span>
                          <span className="text-xs text-ink-muted">{emp.department}</span>
                        </Link>
                      </td>

                      {/* Plan cells */}
                      {visiblePlans.map((plan) => {
                        const enrolled = getReportEnrolled(emp.id, plan.id);
                        if (!enrolled) {
                          return (
                            <td key={plan.id} className="px-3 py-3 text-center">
                              <span className="text-xs text-ink-muted">
                                {isTh ? 'ยังไม่ลงทะเบียน' : 'Not enrolled'}
                              </span>
                            </td>
                          );
                        }
                        const { used, total } = getReportEntitlementUsage(
                          emp.id,
                          plan.id as MatrixPlanId,
                          plan.annualLimitThb,
                        );
                        const chipClass = usageChipClass(used, total);
                        return (
                          <td key={plan.id} className="px-3 py-3 text-center">
                            <span
                              className={cn(
                                'inline-block rounded-full px-2 py-0.5 text-xs',
                                chipClass,
                              )}
                            >
                              {(used / 1000).toFixed(1)}k / {(total / 1000).toFixed(0)}k
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
        <span className="font-medium">{isTh ? 'สีแสดงการใช้งาน:' : 'Usage color:'}</span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-canvas-soft ring-1 ring-hairline" />
          {isTh ? '0%' : '0%'}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-accent-soft" />
          {isTh ? 'ต่ำกว่า 50%' : '< 50%'}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-warning/30" />
          {isTh ? '50–80%' : '50–80%'}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full bg-[var(--color-danger)]/20" />
          {isTh ? 'มากกว่า 80%' : '> 80%'}
        </span>
      </div>
    </div>
  );
}
