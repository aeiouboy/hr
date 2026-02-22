import { describe, it, expect } from 'vitest';
import { hasRole, hasAnyRole, canAccessModule, isManager, isHR, getHighestRole } from '../rbac';
import type { Role } from '../rbac';

describe('RBAC', () => {
  describe('hasRole', () => {
    it('returns true for exact role match', () => {
      expect(hasRole(['employee'], 'employee')).toBe(true);
    });

    it('returns true for inherited role', () => {
      expect(hasRole(['hr_manager'], 'employee')).toBe(true);
      expect(hasRole(['hr_manager'], 'manager')).toBe(true);
      expect(hasRole(['hr_manager'], 'hr_admin')).toBe(true);
    });

    it('returns false for higher role', () => {
      expect(hasRole(['employee'], 'manager')).toBe(false);
      expect(hasRole(['manager'], 'hr_admin')).toBe(false);
    });
  });

  describe('hasAnyRole', () => {
    it('returns true if user has any of the required roles', () => {
      expect(hasAnyRole(['manager'], ['employee', 'manager'])).toBe(true);
    });

    it('returns false if user has none of the required roles', () => {
      expect(hasAnyRole(['employee'], ['hr_admin', 'hr_manager'])).toBe(false);
    });
  });

  describe('canAccessModule', () => {
    it('allows employee to access profile', () => {
      expect(canAccessModule(['employee'], 'profile')).toBe(true);
    });

    it('denies employee access to payroll-setup', () => {
      expect(canAccessModule(['employee'], 'payroll-setup')).toBe(false);
    });

    it('allows hr_admin to access payroll-setup', () => {
      expect(canAccessModule(['hr_admin'], 'payroll-setup')).toBe(true);
    });

    it('returns false for unknown module', () => {
      expect(canAccessModule(['hr_manager'], 'nonexistent')).toBe(false);
    });
  });

  describe('isManager / isHR', () => {
    it('identifies managers', () => {
      expect(isManager(['manager'])).toBe(true);
      expect(isManager(['hr_admin'])).toBe(true);
      expect(isManager(['employee'])).toBe(false);
    });

    it('identifies HR', () => {
      expect(isHR(['hr_admin'])).toBe(true);
      expect(isHR(['hr_manager'])).toBe(true);
      expect(isHR(['manager'])).toBe(false);
    });
  });

  describe('getHighestRole', () => {
    it('returns highest role from list', () => {
      expect(getHighestRole(['employee', 'manager'])).toBe('manager');
      expect(getHighestRole(['hr_admin', 'employee'])).toBe('hr_admin');
    });

    it('defaults to employee for empty list', () => {
      expect(getHighestRole([])).toBe('employee');
    });
  });
});
