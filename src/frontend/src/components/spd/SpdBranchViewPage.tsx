'use client';

// STA-27 PR-C — SpdBranchViewPage
// SPD Branch View: 4 summary tiles + branch selector pills + enrollment matrix.
// Rows = mock employees per selected branch, columns = 6 benefit plan codes.
// DVT Variant plans (dvtVariant: true) get a "DVT" badge in the column header.
// Humi tokens only. Bilingual TH/EN via isTh ternary. No new npm deps.

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Card } from '@/components/humi';
import { Skeleton } from '@/components/humi/atoms/skeleton';
import { useSpdBranches } from '@/hooks/use-spd-branches';
import { SpdBranchSummaryTiles } from '@/components/spd/SpdBranchSummaryTiles';
import { BENEFIT_PLAN_REGISTRY } from '@/data/benefits/plan-registry';
import {
  getBranchEmployees,
  getBranchEnrollment,
  getBranchEntitlementUsage,
  BRANCH_MATRIX_PLAN_IDS,
} from '@/lib/spd-branch-mock';
import { cn } from '@/lib/utils';

// ── Usage chip color thresholds (Humi tokens only, no hex) ───────────────────

function usageChipClass(used: number, total: number): string {
  if (total === 0) return 'bg-canvas-soft text-ink-muted';
  const pct = used / total;
  if (pct > 0.8) return 'bg-[var(--color-danger)]/10 text-[var(--color-danger)] font-semibold';
  if (pct >= 0.5) return 'bg-warning/10 text-warning font-semibold';
  if (pct > 0) return 'bg-accent-soft text-accent';
  return 'bg-canvas-soft text-ink-muted';
}

// ── Main component ────────────────────────────────────────────────────────────

export function SpdBranchViewPage({ branches }: { branches: string[] }) {
  const locale = useLocale();
  const isTh = locale !== 'en';

  // STA-64 — `branches` is the single scope source resolved by the route's local
  // switcher (assigned branches for SPD, all branches for HR Admin). The hook is
  // read only for the loading flag.
  const { isLoading } = useSpdBranches();
  const visibleBranches = branches;

  // Default to first branch
  const [selectedBranch, setSelectedBranch] = useState<string>(visibleBranches[0] ?? '');

  // Ensure selectedBranch stays valid if the visible branch set changes (defensive)
  const activeBranch =
    visibleBranches.includes(selectedBranch) ? selectedBranch : (visibleBranches[0] ?? '');

  // Employees for selected branch
  const employees = useMemo(() => getBranchEmployees(activeBranch), [activeBranch]);

  // Total employees across all visible branches (for tiles)
  const totalEmployees = useMemo(
    () => visibleBranches.reduce((sum, b) => sum + getBranchEmployees(b).length, 0),
    [visibleBranches],
  );

  // Resolve plan metadata from registry for the 6 branch matrix columns
  const matrixPlans = useMemo(
    () =>
      BRANCH_MATRIX_PLAN_IDS.map((id) => BENEFIT_PLAN_REGISTRY.find((p) => p.id === id)).filter(
        Boolean,
      ) as (typeof BENEFIT_PLAN_REGISTRY)[number][],
    [],
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Summary tiles */}
      <SpdBranchSummaryTiles
        assignedBranches={visibleBranches}
        totalEmployees={totalEmployees}
      />

      {/* Branch selector pills */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-ink-muted">
          {isTh ? 'เลือกสาขา' : 'Select Branch'}
        </p>
        <div className="flex flex-wrap gap-2">
          {visibleBranches.map((branch) => (
            <button
              key={branch}
              type="button"
              onClick={() => setSelectedBranch(branch)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent',
                activeBranch === branch
                  ? 'border-accent bg-accent text-white'
                  : 'border-hairline bg-surface text-ink hover:bg-canvas-soft',
              )}
            >
              {branch}
            </button>
          ))}
        </div>
      </div>

      {/* Matrix table */}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-hairline bg-canvas-soft">
                {/* Employee column */}
                <th className="sticky left-0 z-10 bg-canvas-soft px-4 py-3 text-left text-xs font-medium text-ink-muted">
                  {isTh ? 'พนักงาน' : 'Employee'}
                </th>
                {matrixPlans.map((plan) => (
                  <th
                    key={plan.id}
                    className="min-w-[110px] px-3 py-3 text-center text-xs font-medium text-ink-muted"
                  >
                    <span className="flex flex-col items-center gap-1">
                      <span className="block">
                        {isTh ? plan.nameTh : plan.nameEn}
                        {plan.dvtVariant && (
                          <span className="ml-1 inline-block rounded-sm bg-accent/10 px-1 py-0.5 text-xs font-semibold text-accent leading-none">
                            DVT
                          </span>
                        )}
                      </span>
                      <span className="block text-xs font-normal opacity-60">{plan.id}</span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td
                    colSpan={matrixPlans.length + 1}
                    className="py-10 text-center text-sm text-ink-muted"
                  >
                    {isTh ? 'ไม่พบพนักงานในสาขานี้' : 'No employees found for this branch'}
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
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
                        <span className="text-xs text-ink-muted">{emp.position}</span>
                      </Link>
                    </td>

                    {/* Plan cells */}
                    {matrixPlans.map((plan) => {
                      const enrolled = getBranchEnrollment(emp.id, plan.id);
                      if (!enrolled) {
                        return (
                          <td key={plan.id} className="px-3 py-3 text-center">
                            <span className="text-xs text-ink-muted">
                              {isTh ? 'ยังไม่ลงทะเบียน' : '—'}
                            </span>
                          </td>
                        );
                      }
                      const { used, total } = getBranchEntitlementUsage(
                        emp.id,
                        plan.id,
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
      </Card>

      {/* Usage color legend */}
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
        <span className="ml-auto flex items-center gap-1">
          <span className="inline-block rounded-sm bg-accent/10 px-1 py-0.5 text-xs font-semibold text-accent leading-none">
            DVT
          </span>
          {isTh ? 'แผน DVT Variant' : 'DVT Variant plan'}
        </span>
      </div>
    </div>
  );
}
