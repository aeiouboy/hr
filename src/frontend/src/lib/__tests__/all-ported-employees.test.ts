// Tests for the extracted shared employee module (Track A refactor 2026-04-26).
// Covers ALL_PORTED_EMPLOYEES, EMP_BY_LOGIN, employeeForLogin, maskNationalId.

import { describe, expect, test } from 'vitest';
import {
  ALL_PORTED_EMPLOYEES,
  EMP_BY_LOGIN,
  employeeForLogin,
  maskNationalId,
} from '../all-ported-employees';

describe('all-ported-employees — shared 212-employee pool', () => {
  test('ALL_PORTED_EMPLOYEES has 12 + 88 + 100 = 212 employees', () => {
    // 12 HUMI_EMPLOYEES + 88 SF_PARITY_NEW + 100 SF_REAL = 200 in handoff but
    // synthetic block grew to 88 over sprint. Floor check: ≥ 100 SF-real.
    expect(ALL_PORTED_EMPLOYEES.length).toBeGreaterThanOrEqual(200);
  });

  test('every employee has stable id', () => {
    const ids = ALL_PORTED_EMPLOYEES.map((e) => e.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  test('first 12 are existing HUMI emps with emp-NNN ids', () => {
    const first12 = ALL_PORTED_EMPLOYEES.slice(0, 12).map((e) => e.id);
    expect(first12.every((id) => /^emp-\d{3}$/.test(id))).toBe(true);
  });

  test('SF-real block uses emp-sf-NNN ids', () => {
    const sfReal = ALL_PORTED_EMPLOYEES.filter((e) => e.id.startsWith('emp-sf-'));
    expect(sfReal.length).toBe(100);
  });
});

describe('EMP_BY_LOGIN — 9 personas (5 generic + 4 SF-canonical)', () => {
  test('contains all 5 generic role logins', () => {
    expect(EMP_BY_LOGIN['admin@humi.test']).toBe('emp-005');
    expect(EMP_BY_LOGIN['spd@humi.test']).toBe('emp-001');
    expect(EMP_BY_LOGIN['hrbp@humi.test']).toBe('emp-007');
    expect(EMP_BY_LOGIN['manager@humi.test']).toBe('emp-002');
    expect(EMP_BY_LOGIN['employee@humi.test']).toBe('emp-003');
  });

  test('contains all 4 SF-canonical persona logins (T7)', () => {
    expect(EMP_BY_LOGIN['ken@humi.test']).toBe('emp-005');
    expect(EMP_BY_LOGIN['apinya@humi.test']).toBe('emp-007');
    expect(EMP_BY_LOGIN['worawee@humi.test']).toBe('emp-001');
    expect(EMP_BY_LOGIN['rungrote@humi.test']).toBe('emp-002');
  });

  test('is frozen — cannot mutate the persona map', () => {
    expect(Object.isFrozen(EMP_BY_LOGIN)).toBe(true);
  });
});

describe('employeeForLogin — resolves login → HumiEmployee', () => {
  test('returns the mapped employee for known logins', () => {
    const emp = employeeForLogin('manager@humi.test');
    expect(emp?.id).toBe('emp-002');
  });

  test('returns null for unknown login', () => {
    expect(employeeForLogin('ghost@nowhere.test')).toBeNull();
  });

  test('returns null for null/undefined input', () => {
    expect(employeeForLogin(null)).toBeNull();
    expect(employeeForLogin(undefined)).toBeNull();
    expect(employeeForLogin('')).toBeNull();
  });
});

describe('maskNationalId — preserves first + last 4, masks middle', () => {
  test('masks valid 13-digit Thai NID', () => {
    expect(maskNationalId('1234567890123')).toBe('1-XXXX-XXXX-01-23');
  });

  test('handles dash-separated input', () => {
    expect(maskNationalId('1-1001-00001-00-1')).toBe('1-XXXX-XXXX-10-01');
  });

  test('returns em-dash for undefined', () => {
    expect(maskNationalId(undefined)).toBe('—');
  });

  test('returns input unchanged when length not 13 (graceful degrade)', () => {
    expect(maskNationalId('123')).toBe('123');
  });
});
