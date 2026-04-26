/**
 * T6 — Per-persona scope filter unit tests.
 *
 * 4 production roles (employee/manager/hrbp/spd) + admin (super-set).
 * Asserts the filter returns the right slice from a synthetic employee pool,
 * without booting the full Page render path.
 */

import { describe, expect, test } from 'vitest';
import {
  filterEmployeesByPersona,
  pickScopeMode,
  countDirectReports,
  resolveCurrentEmpId,
} from '@/lib/scope-filter';
import type { HumiEmployee } from '@/lib/humi-mock-data';

const POOL: HumiEmployee[] = [
  { id: 'emp-002', employeeCode: 'M', firstNameTh: 'A', lastNameTh: 'A', initials: 'AA',
    position: 'Manager', department: 'Finance', status: 'active', avatarTone: 'teal',
    businessUnitId: 'BU-002' },
  { id: 'emp-007', employeeCode: 'H', firstNameTh: 'B', lastNameTh: 'B', initials: 'BB',
    position: 'HRBP', department: 'HR', status: 'active', avatarTone: 'butter',
    businessUnitId: 'BU-001' },
  { id: 'emp-003', employeeCode: 'E', firstNameTh: 'C', lastNameTh: 'C', initials: 'CC',
    position: 'Engineer', department: 'IT', status: 'active', avatarTone: 'sage',
    managerId: 'emp-002', businessUnitId: 'BU-002' },
  { id: 'emp-006', employeeCode: 'F', firstNameTh: 'D', lastNameTh: 'D', initials: 'DD',
    position: 'Analyst', department: 'Finance', status: 'active', avatarTone: 'indigo',
    managerId: 'emp-002', businessUnitId: 'BU-002' },
  { id: 'emp-100', employeeCode: 'X', firstNameTh: 'X', lastNameTh: 'X', initials: 'XX',
    position: 'HR Coord', department: 'HR', status: 'active', avatarTone: 'ink',
    managerId: 'emp-007', businessUnitId: 'BU-001' },
  { id: 'emp-101', employeeCode: 'T', firstNameTh: 'T', lastNameTh: 'T', initials: 'TT',
    position: 'Ex', department: 'Sales', status: 'terminated', avatarTone: 'teal',
    businessUnitId: 'BU-003' },
];

describe('T6 — pickScopeMode (RBAC tier)', () => {
  test('spd → all', () => {
    expect(pickScopeMode(['spd', 'employee'])).toBe('all');
  });
  test('hr_admin → all', () => {
    expect(pickScopeMode(['hr_admin'])).toBe('all');
  });
  test('hr_manager → all', () => {
    expect(pickScopeMode(['hr_manager'])).toBe('all');
  });
  test('hrbp → bu', () => {
    expect(pickScopeMode(['hrbp', 'employee'])).toBe('bu');
  });
  test('manager → direct-reports', () => {
    expect(pickScopeMode(['manager', 'employee'])).toBe('direct-reports');
  });
  test('employee → self', () => {
    expect(pickScopeMode(['employee'])).toBe('self');
  });
  test('admin@ super-user (all 6 roles) → all (highest tier wins)', () => {
    expect(pickScopeMode(['hr_admin', 'hr_manager', 'spd', 'hrbp', 'manager', 'employee'])).toBe('all');
  });
});

describe('T6 — filterEmployeesByPersona scope returns', () => {
  test('employee@ scope = self only (1 row)', () => {
    const r = filterEmployeesByPersona(POOL, ['employee'], 'emp-003');
    expect(r.mode).toBe('self');
    expect(r.employees.length).toBe(1);
    expect(r.employees[0]!.id).toBe('emp-003');
    expect(r.canEdit).toBe(false);
  });

  test('manager@ scope = self + direct reports (3 rows: emp-002 + 2 reports)', () => {
    const r = filterEmployeesByPersona(POOL, ['manager', 'employee'], 'emp-002');
    expect(r.mode).toBe('direct-reports');
    expect(r.employees.length).toBe(3);
    const ids = r.employees.map((e) => e.id).sort();
    expect(ids).toEqual(['emp-002', 'emp-003', 'emp-006']);
    expect(r.canEdit).toBe(false);
  });

  test('hrbp@ scope = BU members (BU-001 → emp-007 + emp-100)', () => {
    const r = filterEmployeesByPersona(POOL, ['hrbp', 'employee'], 'emp-007');
    expect(r.mode).toBe('bu');
    expect(r.employees.length).toBe(2);
    const ids = r.employees.map((e) => e.id).sort();
    expect(ids).toEqual(['emp-007', 'emp-100']);
    expect(r.canEdit).toBe(false);
  });

  test('spd@ scope = all active (excludes terminated by default)', () => {
    const r = filterEmployeesByPersona(POOL, ['spd', 'employee'], 'emp-001');
    expect(r.mode).toBe('all');
    // 5 active, 1 terminated
    expect(r.employees.length).toBe(5);
    expect(r.employees.find((e) => e.id === 'emp-101')).toBeUndefined();
    expect(r.canEdit).toBe(true);
  });

  test('admin@ super-user scope = all (highest tier)', () => {
    const r = filterEmployeesByPersona(POOL, ['hr_admin', 'hr_manager', 'spd', 'hrbp', 'manager', 'employee'], 'emp-005');
    expect(r.mode).toBe('all');
    expect(r.canEdit).toBe(true);
  });

  test('opts.includeTerminated true → SPD sees all 6 including terminated', () => {
    const r = filterEmployeesByPersona(POOL, ['spd'], 'emp-001', { includeTerminated: true });
    expect(r.employees.length).toBe(6);
  });

  test('non-existent currentEmployeeId for non-all role → empty', () => {
    const r = filterEmployeesByPersona(POOL, ['employee'], 'emp-doesnt-exist');
    expect(r.employees.length).toBe(0);
  });
});

describe('T6 — countDirectReports', () => {
  test('emp-002 has 2 direct reports', () => {
    expect(countDirectReports(POOL, 'emp-002')).toBe(2);
  });
  test('emp-007 has 1 direct report', () => {
    expect(countDirectReports(POOL, 'emp-007')).toBe(1);
  });
  test('emp-101 has 0 reports', () => {
    expect(countDirectReports(POOL, 'emp-101')).toBe(0);
  });
});

describe('T6 — resolveCurrentEmpId', () => {
  test('5 demo logins resolve correctly', () => {
    expect(resolveCurrentEmpId('admin@humi.test')).toBe('emp-005');
    expect(resolveCurrentEmpId('spd@humi.test')).toBe('emp-001');
    expect(resolveCurrentEmpId('hrbp@humi.test')).toBe('emp-007');
    expect(resolveCurrentEmpId('manager@humi.test')).toBe('emp-002');
    expect(resolveCurrentEmpId('employee@humi.test')).toBe('emp-003');
  });
  test('unknown email → null', () => {
    expect(resolveCurrentEmpId('stranger@humi.test')).toBeNull();
    expect(resolveCurrentEmpId(null)).toBeNull();
  });
});
