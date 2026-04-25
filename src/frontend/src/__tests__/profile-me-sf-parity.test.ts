/**
 * T2 (#89) — /profile/me Personal tab SF parity
 *
 * Tests the helper functions that wire ported HUMI_EMPLOYEES + SF_PARITY_OVERLAY
 * into the Personal tab form. RBAC scoping is by `currentRole` (active persona
 * via auth-store), driven by login email → employee id mapping.
 *
 * Pure-function coverage (avoids full Page render — that page is 1700+ lines
 * with intl/store/router deps; helper unit tests are the targeted layer).
 */

import { describe, expect, test } from 'vitest';
import {
  maskNationalId,
  employeeForLogin,
  deriveFormValuesFromEmployee,
} from '@/app/[locale]/profile/me/page';

describe('T2 #89 — Personal tab SF parity helpers', () => {
  describe('maskNationalId (AC-3 mask middle digits)', () => {
    test('masks middle of valid 13-digit Thai national ID', () => {
      // 1234567890123 → 1 + XXXX(2-5) + XXXX(6-9) + 01(10-11) + 23(12-13)
      expect(maskNationalId('1234567890123')).toBe('1-XXXX-XXXX-01-23');
    });

    test('handles dash-separated input by stripping non-digits first', () => {
      // Real Thai NID format: 1-1001-00001-00-1 = 13 digits when cleaned
      // cleaned = '1100100001001' → 1 + 1001(masked) + 0000(masked) + 10 + 01
      expect(maskNationalId('1-1001-00001-00-1')).toBe('1-XXXX-XXXX-10-01');
    });

    test('returns em-dash placeholder when undefined', () => {
      expect(maskNationalId(undefined)).toBe('—');
    });

    test('returns input unchanged when not 13 digits', () => {
      expect(maskNationalId('12345')).toBe('12345');
    });
  });

  describe('employeeForLogin (AC-5 RBAC by current login)', () => {
    test('admin@ → emp-005 (HR director)', () => {
      const e = employeeForLogin('admin@humi.test');
      expect(e).not.toBeNull();
      expect(e!.id).toBe('emp-005');
      expect(e!.firstNameEn).toBe('Krittanai');
    });

    test('spd@ → emp-001 (HR manager) with SF parity overlay', () => {
      const e = employeeForLogin('spd@humi.test');
      expect(e!.id).toBe('emp-001');
      expect(e!.firstNameEn).toBe('Wassana');
      expect(e!.maritalStatus).toBe('married');
      expect(e!.bloodType).toBe('O');
    });

    test('hrbp@ → emp-007 with overlay', () => {
      const e = employeeForLogin('hrbp@humi.test');
      expect(e!.id).toBe('emp-007');
      expect(e!.firstNameEn).toBe('Nattapon');
    });

    test('manager@ → emp-002 with overlay', () => {
      const e = employeeForLogin('manager@humi.test');
      expect(e!.id).toBe('emp-002');
      expect(e!.firstNameEn).toBe('Arun');
    });

    test('employee@ → emp-003 with overlay', () => {
      const e = employeeForLogin('employee@humi.test');
      expect(e!.id).toBe('emp-003');
      expect(e!.firstNameEn).toBe('Thanakorn');
    });

    test('unknown email → null (no fallthrough)', () => {
      expect(employeeForLogin('stranger@humi.test')).toBeNull();
      expect(employeeForLogin(null)).toBeNull();
      expect(employeeForLogin(undefined)).toBeNull();
    });
  });

  describe('deriveFormValuesFromEmployee (AC-1/AC-2/AC-3 render derived values)', () => {
    test('renders firstNameTh + lastNameTh + EN + nickname from employee', () => {
      const emp = employeeForLogin('spd@humi.test')!;
      const fv = deriveFormValuesFromEmployee(emp);
      expect(fv.firstNameTh).toBe('วาสนา');
      expect(fv.lastNameTh).toBe('จิรวัฒน์');
      expect(fv.firstNameEn).toBe('Wassana');
      expect(fv.lastNameEn).toBe('Jirawat');
      expect(fv.nickname).toBe('Nan');
    });

    test('translates maritalStatus picklist code → Thai label (AC-2)', () => {
      const emp = employeeForLogin('spd@humi.test')!; // married
      const fv = deriveFormValuesFromEmployee(emp);
      expect(fv.maritalStatus).toBe('สมรส');
    });

    test('renders single → โสด', () => {
      const emp = employeeForLogin('manager@humi.test')!; // single
      const fv = deriveFormValuesFromEmployee(emp);
      expect(fv.maritalStatus).toBe('โสด');
    });

    test('renders religion + bloodType + nationality from picklist (AC-3)', () => {
      const emp = employeeForLogin('spd@humi.test')!;
      const fv = deriveFormValuesFromEmployee(emp);
      expect(fv.religion).toBe('buddhist');
      expect(fv.bloodType).toBe('O');
      expect(fv.nationality).toBe('ไทย'); // th → ไทย
    });

    test('national ID rendered masked (AC-3)', () => {
      const emp = employeeForLogin('spd@humi.test')!;
      const fv = deriveFormValuesFromEmployee(emp);
      expect(fv.nationalId).toContain('XXXX');
      expect(fv.nationalId).not.toBe(emp.nationalId);
    });

    test('null employee → returns FORM_DEFAULTS verbatim (no crash)', () => {
      const fv = deriveFormValuesFromEmployee(null);
      expect(fv.firstNameTh).toBe('จงรักษ์'); // FORM_DEFAULTS fallback
      expect(fv.maritalStatus).toBe('โสด');
    });
  });

  describe('AC-5 — RBAC scope: 4 production roles drive different formValues', () => {
    test('each of 4 production-role logins yields a distinct employee (no clashes)', () => {
      const emps = [
        employeeForLogin('employee@humi.test'),
        employeeForLogin('manager@humi.test'),
        employeeForLogin('hrbp@humi.test'),
        employeeForLogin('spd@humi.test'),
      ];
      const ids = new Set(emps.map((e) => e!.id));
      expect(ids.size).toBe(4); // 4 distinct employees, no two roles map to same record
    });

    test('admin@ login (view-as super-user) maps to its own employee record (emp-005)', () => {
      const adminEmp = employeeForLogin('admin@humi.test');
      expect(adminEmp!.id).toBe('emp-005');
    });
  });
});
