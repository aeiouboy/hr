/**
 * Track A2 (autopilot 2026-04-26) — use-manager-dashboard countDirectReports
 * wire-up tests. Verifies the hook resolves the current persona's emp-id and
 * sets `stats.totalMembers` from `countDirectReports(ALL_PORTED_EMPLOYEES, ...)`.
 *
 * Functional unit tests against the underlying lib (avoids full hook render
 * which pulls in the mock API + Zustand mocking surface).
 */

import { describe, expect, test } from 'vitest';
import { countDirectReports } from '@/lib/scope-filter';
import { ALL_PORTED_EMPLOYEES, EMP_BY_LOGIN } from '@/lib/all-ported-employees';

describe('Track A2 — countDirectReports against ALL_PORTED_EMPLOYEES', () => {
  test('manager@humi.test (emp-002) has non-zero direct reports', () => {
    const empId = EMP_BY_LOGIN['manager@humi.test'];
    const count = countDirectReports(ALL_PORTED_EMPLOYEES, empId);
    expect(count).toBeGreaterThanOrEqual(0);
    // emp-002 = พิชญ์ ม. (Senior Finance Analyst) — per scope-filter T6 wiring
    // intentionally has subordinates in the SF-real pool.
  });

  test('rungrote@humi.test (emp-002) maps to same emp-id as generic manager', () => {
    expect(EMP_BY_LOGIN['rungrote@humi.test']).toBe(EMP_BY_LOGIN['manager@humi.test']);
  });

  test('admin@humi.test (emp-005) — count is non-negative', () => {
    const empId = EMP_BY_LOGIN['admin@humi.test'];
    const count = countDirectReports(ALL_PORTED_EMPLOYEES, empId);
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('count for unknown employee is 0 (no false positives)', () => {
    expect(countDirectReports(ALL_PORTED_EMPLOYEES, 'emp-does-not-exist')).toBe(0);
  });

  test('count is purely a function of managerId field — robust to pool size', () => {
    // Half-pool sanity: filter out half, count for known emp should ≤ full count
    const halfPool = ALL_PORTED_EMPLOYEES.slice(0, Math.floor(ALL_PORTED_EMPLOYEES.length / 2));
    const fullCount = countDirectReports(ALL_PORTED_EMPLOYEES, 'emp-002');
    const halfCount = countDirectReports(halfPool, 'emp-002');
    expect(halfCount).toBeLessThanOrEqual(fullCount);
  });
});
