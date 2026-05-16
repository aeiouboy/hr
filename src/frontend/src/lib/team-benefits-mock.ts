// STA-28 PR-D — team-benefits-mock.ts
// Pure sync mock helpers for the Team Benefits matrix.
// All functions are deterministic (hash-based) so the matrix is stable across renders.

/** Simple djb2 hash to get a stable number from a string */
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) ^ s.charCodeAt(i);
    h = h >>> 0; // keep unsigned 32-bit
  }
  return h;
}

/**
 * Returns { used, total } for a given employee × plan combination.
 * Total is drawn from the plan's annualLimitThb (or a fixed default if null).
 * Usage ratio is deterministic based on the hash of the composite key.
 */
export function getReportEntitlementUsage(
  employeeId: string,
  planId: string,
  annualLimitThb: number | null,
): { used: number; total: number } {
  const total = annualLimitThb ?? 12000;
  const key = `${employeeId}:${planId}`;
  const h = hashStr(key);
  // Ratio in range 0..100 (using mod 101)
  const pct = h % 101;
  const used = Math.round((total * pct) / 100);
  return { used, total };
}

/**
 * Returns 0–3 pending claims count for a given employee. Deterministic.
 */
export function getReportPendingClaimsCount(employeeId: string): number {
  const h = hashStr(employeeId + ':pending');
  return h % 4; // 0, 1, 2, or 3
}

/**
 * Returns whether a given employee is enrolled in a given plan.
 * ~70% enrolled rate deterministically.
 */
export function getReportEnrolled(employeeId: string, planId: string): boolean {
  const h = hashStr(`${employeeId}:${planId}:enrolled`);
  return h % 10 < 7; // 0-6 = enrolled (70%), 7-9 = not enrolled (30%)
}

/**
 * Returns total claim amount (THB) for an employee this month. Deterministic.
 */
export function getReportMonthlyClaimThb(employeeId: string): number {
  const h = hashStr(employeeId + ':monthly');
  // Range: 0 to 15,000 in steps of 500
  return (h % 31) * 500;
}

/** The 7 plans shown in the matrix (most common on-demand + annual) */
export const MATRIX_PLAN_IDS = [
  'BE-MED-001', // Medical OPD
  'BE-MED-004', // Medical Dependent
  'BE-DEN-001', // Dental
  'BE-PHY-001', // Physical checkup A
  'BE-GAS-001', // Gasoline
  'BE-TOL-001', // Toll
  'BE-PAR-001', // Parking
] as const;

export type MatrixPlanId = (typeof MATRIX_PLAN_IDS)[number];

/** Annual-enrollment plans (Gas/Toll/Parking) — used for "unenrolled risk" tile */
export const ANNUAL_ENROL_PLAN_IDS: string[] = ['BE-GAS-001', 'BE-TOL-001', 'BE-PAR-001'];
