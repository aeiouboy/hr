// STA-27 PR-D report mapping:
// SP-RP-01 Branch Enrollment Movement
// SP-RP-02 Branch Cost Snapshot
// SP-RP-03 Branch Special Privilege Audit
// Pure mock derivations; callers pass useSpdBranches().assignedBranches to keep scope branch-bound.

import { BENEFIT_PLAN_REGISTRY } from '@/data/benefits/plan-registry';
import {
  BRANCH_MATRIX_PLAN_IDS,
  getBranchEmployees,
  getBranchEnrollment,
} from '@/lib/spd-branch-mock';

type ReportId = 'movement' | 'cost' | 'privilege';

export const SPD_REPORTS: Array<{ id: ReportId; code: string; titleKey: string; descKey: string }> =
  [
    {
      id: 'movement',
      code: 'SP-RP-01',
      titleKey: 'reports.movement.title',
      descKey: 'reports.movement.desc',
    },
    { id: 'cost', code: 'SP-RP-02', titleKey: 'reports.cost.title', descKey: 'reports.cost.desc' },
    {
      id: 'privilege',
      code: 'SP-RP-03',
      titleKey: 'reports.privilege.title',
      descKey: 'reports.privilege.desc',
    },
  ];

function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i += 1) h = (((h << 5) + h) ^ s.charCodeAt(i)) >>> 0;
  return h;
}

export function getBranchReportRows(assignedBranches: string[]) {
  return assignedBranches.map((branchCode) => {
    const employees = getBranchEmployees(branchCode);
    const eligible = employees.length * BRANCH_MATRIX_PLAN_IDS.length;
    const enrolled = employees.reduce(
      (sum, emp) =>
        sum + BRANCH_MATRIX_PLAN_IDS.filter((planId) => getBranchEnrollment(emp.id, planId)).length,
      0,
    );
    const costThb = BRANCH_MATRIX_PLAN_IDS.reduce((sum, planId) => {
      const plan = BENEFIT_PLAN_REGISTRY.find((p) => p.id === planId);
      const count = employees.filter((emp) => getBranchEnrollment(emp.id, planId)).length;
      return (
        sum +
        Math.round(
          (plan?.annualLimitThb ?? 12000) *
            count *
            (0.18 + (hashStr(`${branchCode}:${planId}:cost`) % 18) / 100),
        )
      );
    }, 0);

    return {
      branchCode,
      employees: employees.length,
      eligible,
      enrolled,
      enrollmentPct: eligible === 0 ? 0 : Math.round((enrolled / eligible) * 100),
      added: employees.reduce((sum, emp) => sum + (hashStr(`${emp.id}:added`) % 3), 0),
      removed: employees.reduce((sum, emp) => sum + (hashStr(`${emp.id}:removed`) % 2), 0),
      costThb,
      privilegeAudits: employees.filter((emp) => hashStr(`${emp.id}:privilege-audit`) % 5 === 0)
        .length,
    };
  });
}
