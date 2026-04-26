/**
 * T6 — Per-persona scope filter for "data คล้ายจริง" demo+ realism.
 *
 * Each demo persona sees a different slice of the 212-employee pool when
 * the TopbarPersonaSwitcher swaps view-as. Drives /admin/employees list,
 * /manager-dashboard subordinate count, and /admin/change-requests.
 *
 * RBAC layered onto data scope (per BRD #166 + RBAC-MATRIX-V2-2026-04-26):
 *   employee  → self only (1 row)
 *   manager   → direct reports (filter by managerId === self.id)
 *   hrbp      → BU members (filter by businessUnitId === self.businessUnitId)
 *   spd       → all employees + edit
 *   hr_admin  → all employees + edit (same effective scope as spd, super-set
 *                 via ROLE_HIERARCHY in src/lib/rbac.ts)
 *   hr_manager→ all employees + edit (top of hierarchy)
 *
 * Uses currentRole (from auth-store.roles, switcher-aware) — NOT
 * originalUser.roles — per memory feedback_persona_proxy_switcher_pattern.
 */

import { hasAnyRole, hasRole, type Role } from './rbac';
import type { HumiEmployee } from './humi-mock-data';

export type ScopeMode = 'self' | 'direct-reports' | 'bu' | 'all';

export interface ScopeResult {
  readonly mode: ScopeMode;
  readonly employees: ReadonlyArray<HumiEmployee>;
  readonly canEdit: boolean;
}

/** Decide which scope mode applies to the persona's roles. Highest-tier wins. */
export function pickScopeMode(roles: ReadonlyArray<Role>): ScopeMode {
  if (hasAnyRole([...roles], ['spd', 'hr_admin', 'hr_manager'])) return 'all';
  if (hasRole([...roles], 'hrbp')) return 'bu';
  if (hasRole([...roles], 'manager')) return 'direct-reports';
  return 'self';
}

/** Drop terminated employees unless caller opts in. Default = active-only. */
function activeOnly(emps: ReadonlyArray<HumiEmployee>): HumiEmployee[] {
  return emps.filter((e) => e.status === 'active' || e.status === 'leave');
}

/**
 * Filter the 212-employee pool down to what the current persona should see.
 *
 * @param allEmployees ALL_PORTED_EMPLOYEES from page.tsx (12 + 88 synth + 100 SF real)
 * @param currentRoles auth-store.roles of the active persona (view-as aware)
 * @param currentEmployeeId emp-id of the persona (per EMP_BY_LOGIN map)
 * @param opts.includeTerminated drop terminated rows by default
 */
export function filterEmployeesByPersona(
  allEmployees: ReadonlyArray<HumiEmployee>,
  currentRoles: ReadonlyArray<Role>,
  currentEmployeeId: string | null,
  opts: { includeTerminated?: boolean } = {},
): ScopeResult {
  const includeTerm = opts.includeTerminated ?? false;
  const mode = pickScopeMode(currentRoles);
  const canEdit = hasAnyRole([...currentRoles], ['spd', 'hr_admin', 'hr_manager']);

  // SPD / HR Admin / HR Manager — no filter
  if (mode === 'all') {
    return Object.freeze({
      mode,
      canEdit,
      employees: includeTerm ? [...allEmployees] : activeOnly(allEmployees),
    });
  }

  // Without a known current employee record, fall back to self-only (no clobber)
  const me = currentEmployeeId ? allEmployees.find((e) => e.id === currentEmployeeId) : null;
  if (!me) {
    return Object.freeze({ mode: 'self', canEdit: false, employees: [] });
  }

  if (mode === 'self') {
    return Object.freeze({ mode, canEdit: false, employees: [me] });
  }

  if (mode === 'direct-reports') {
    const reports = allEmployees.filter((e) => e.managerId === currentEmployeeId);
    const scoped = activeOnly([me, ...reports]);
    return Object.freeze({ mode, canEdit: false, employees: scoped });
  }

  if (mode === 'bu') {
    const bu = me.businessUnitId;
    const buMembers = bu
      ? allEmployees.filter((e) => e.businessUnitId === bu)
      : [me];
    const scoped = includeTerm ? buMembers : activeOnly(buMembers);
    return Object.freeze({ mode, canEdit: false, employees: scoped });
  }

  // exhaustive — unreachable
  return Object.freeze({ mode, canEdit, employees: [me] });
}

/** Count subordinates (direct reports) of a given employee. */
export function countDirectReports(
  allEmployees: ReadonlyArray<HumiEmployee>,
  empId: string,
): number {
  return allEmployees.filter((e) => e.managerId === empId).length;
}

/** Resolve employee record for a login email — 5 demo + 4 SF-canonical (T7). */
export const EMP_BY_LOGIN_FULL: Record<string, string> = Object.freeze({
  'admin@humi.test':    'emp-005',
  'spd@humi.test':      'emp-001',
  'hrbp@humi.test':     'emp-007',
  'manager@humi.test':  'emp-002',
  'employee@humi.test': 'emp-003',
  // T7 — SF-canonical personas slot natural in hierarchy
  'ken@humi.test':      'emp-005',  // Ken = HR Director-like (org strategy)
  'apinya@humi.test':   'emp-007',  // Apinya = HR team head (HRBP role)
  'worawee@humi.test':  'emp-001',  // Worawee = HR Manager (SPD final-approver)
  'rungrote@humi.test': 'emp-002',  // Rungrote = Finance Senior Analyst (Manager)
});

export function resolveCurrentEmpId(email: string | null | undefined): string | null {
  if (!email) return null;
  return EMP_BY_LOGIN_FULL[email] ?? null;
}
