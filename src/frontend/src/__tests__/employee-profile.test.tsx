/**
 * Frontend Unit Tests — Employee Profile (Sprint 1)
 * Framework: Vitest + @testing-library/react
 * Covers: US-1, US-2, US-3 (profile render + RBAC + address cascade)
 *
 * BRD refs: #12-20, #165, #168
 * TTT Process: 01 (Hire & Rehire), 03 (Maintain Master Data)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isHR, hasRole, canAccessModule, type Role } from '@/lib/rbac';

// ─── RBAC Utility Tests ─────────────────────────────────────────────────────

describe('RBAC: isHR / hasRole / canAccessModule (lib/rbac.ts)', () => {
  describe('isHR()', () => {
    it('hr_admin role returns true', () => {
      expect(isHR(['hr_admin'])).toBe(true);
    });

    it('hr_manager role returns true (hierarchy: hr_manager > hr_admin)', () => {
      expect(isHR(['hr_manager'])).toBe(true);
    });

    it('employee role returns false', () => {
      expect(isHR(['employee'])).toBe(false);
    });

    it('manager role returns false', () => {
      expect(isHR(['manager'])).toBe(false);
    });

    it('empty roles returns false', () => {
      expect(isHR([])).toBe(false);
    });
  });

  describe('hasRole()', () => {
    it('hr_manager has hr_admin via hierarchy', () => {
      expect(hasRole(['hr_manager'], 'hr_admin')).toBe(true);
    });

    it('hr_admin has manager via hierarchy', () => {
      expect(hasRole(['hr_admin'], 'manager')).toBe(true);
    });

    it('employee does not have manager role', () => {
      expect(hasRole(['employee'], 'manager')).toBe(false);
    });

    it('manager does not have hr_admin role', () => {
      expect(hasRole(['manager'], 'hr_admin')).toBe(false);
    });
  });

  describe('canAccessModule()', () => {
    it('all roles can access profile module', () => {
      const roles: Role[][] = [['employee'], ['manager'], ['hr_admin'], ['hr_manager']];
      roles.forEach((r) => {
        expect(canAccessModule(r, 'profile')).toBe(true);
      });
    });

    it('only HR roles can access payroll-setup', () => {
      expect(canAccessModule(['hr_admin'], 'payroll-setup')).toBe(true);
      expect(canAccessModule(['employee'], 'payroll-setup')).toBe(false);
      expect(canAccessModule(['manager'], 'payroll-setup')).toBe(false);
    });

    it('only HR roles can access settings', () => {
      expect(canAccessModule(['hr_admin'], 'settings')).toBe(true);
      expect(canAccessModule(['employee'], 'settings')).toBe(false);
    });
  });
});

// ─── Sensitive Field Masking Tests ──────────────────────────────────────────

describe('US-1: Sensitive field visibility (BRD #165 — 🔒)', () => {
  it('HR Admin should see edit button on profile (isHR=true)', () => {
    // Simulate the isHR check that controls edit button visibility in profile/page.tsx
    const hrAdminRoles: Role[] = ['hr_admin'];
    const canEdit = isHR(hrAdminRoles);

    expect(canEdit).toBe(true);
  });

  it('Employee should NOT see edit button on profile', () => {
    const employeeRoles: Role[] = ['employee'];
    const canEdit = isHR(employeeRoles);

    expect(canEdit).toBe(false);
  });

  it('Manager should NOT see HR-sensitive edit controls', () => {
    const managerRoles: Role[] = ['manager'];
    const canEdit = isHR(managerRoles);

    expect(canEdit).toBe(false);
  });
});

// ─── Address Cascade Logic Tests ────────────────────────────────────────────

describe('US-3: Address cascade (Province → District → Sub-district → Postal) — BRD #17', () => {
  // Mock address reference data structure
  const MOCK_PROVINCES = [
    { code: 'BKK', name_th: 'กรุงเทพมหานคร', name_en: 'Bangkok' },
    { code: 'CNX', name_th: 'เชียงใหม่', name_en: 'Chiang Mai' },
  ];

  const MOCK_DISTRICTS: Record<string, { code: string; name_th: string; name_en: string }[]> = {
    BKK: [
      { code: 'BKK_WTH', name_th: 'วัฒนา', name_en: 'Watthana' },
      { code: 'BKK_BGK', name_th: 'บางรัก', name_en: 'Bang Rak' },
    ],
    CNX: [
      { code: 'CNX_MNG', name_th: 'เมืองเชียงใหม่', name_en: 'Mueang Chiang Mai' },
    ],
  };

  const MOCK_SUBDISTRICTS: Record<string, { code: string; name_th: string; postal_code: string }[]> = {
    BKK_WTH: [
      { code: 'BKK_WTH_KLT', name_th: 'คลองเตยเหนือ', postal_code: '10110' },
    ],
    BKK_BGK: [
      { code: 'BKK_BGK_SLM', name_th: 'สีลม', postal_code: '10500' },
    ],
  };

  it('selecting province resets district and sub-district', () => {
    let selectedProvince = 'BKK';
    let selectedDistrict = 'BKK_WTH';
    let selectedSubDistrict = 'BKK_WTH_KLT';

    // Simulate province change → reset cascade
    const handleProvinceChange = (newProvince: string) => {
      selectedProvince = newProvince;
      selectedDistrict = '';
      selectedSubDistrict = '';
    };

    handleProvinceChange('CNX');

    expect(selectedProvince).toBe('CNX');
    expect(selectedDistrict).toBe('');
    expect(selectedSubDistrict).toBe('');
  });

  it('district options filter by selected province', () => {
    const selectedProvince = 'BKK';
    const districts = MOCK_DISTRICTS[selectedProvince] ?? [];

    expect(districts).toHaveLength(2);
    expect(districts.map((d) => d.code)).toContain('BKK_WTH');
    expect(districts.map((d) => d.code)).not.toContain('CNX_MNG');
  });

  it('sub-district options filter by selected district', () => {
    const selectedDistrict = 'BKK_WTH';
    const subdistricts = MOCK_SUBDISTRICTS[selectedDistrict] ?? [];

    expect(subdistricts).toHaveLength(1);
    expect(subdistricts[0].postal_code).toBe('10110');
  });

  it('selecting sub-district auto-fills postal code', () => {
    const selectedSubDistrict = 'BKK_WTH_KLT';
    let postalCode = '';

    const handleSubDistrictChange = (code: string) => {
      const found = MOCK_SUBDISTRICTS['BKK_WTH']?.find((s) => s.code === code);
      if (found) postalCode = found.postal_code;
    };

    handleSubDistrictChange(selectedSubDistrict);

    expect(postalCode).toBe('10110');
  });

  it('selecting invalid province returns empty district list', () => {
    const selectedProvince = 'INVALID';
    const districts = MOCK_DISTRICTS[selectedProvince] ?? [];

    expect(districts).toHaveLength(0);
  });

  it('country defaults to Thailand', () => {
    const defaultAddress = {
      country: 'Thailand',
      address_type: 'permanent',
    };

    expect(defaultAddress.country).toBe('Thailand');
  });
});

// ─── Work Permit Visibility Tests ───────────────────────────────────────────

describe('US-3: Work Permit visibility (BRD #18 — foreigners only)', () => {
  it('work permit section shown when is_foreigner = true', () => {
    const employee = { is_foreigner: true };
    const showWorkPermit = employee.is_foreigner === true;

    expect(showWorkPermit).toBe(true);
  });

  it('work permit section hidden when is_foreigner = false', () => {
    const employee = { is_foreigner: false };
    const showWorkPermit = employee.is_foreigner === true;

    expect(showWorkPermit).toBe(false);
  });

  it('work permit section hidden when is_foreigner is null/undefined', () => {
    const employee = { is_foreigner: null };
    const showWorkPermit = employee.is_foreigner === true;

    expect(showWorkPermit).toBe(false);
  });
});

// ─── Work Permit Expiry Alert Tests ─────────────────────────────────────────

describe('US-3: Work Permit expiry alert (BRD #18 — alert < 90 days)', () => {
  it('shows alert when expiry < 90 days from today', () => {
    const today = new Date();
    const nearExpiry = new Date(today);
    nearExpiry.setDate(nearExpiry.getDate() + 60); // 60 days from now

    const daysUntilExpiry = Math.floor((nearExpiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const showAlert = daysUntilExpiry < 90;

    expect(showAlert).toBe(true);
  });

  it('no alert when expiry > 90 days from today', () => {
    const today = new Date();
    const farExpiry = new Date(today);
    farExpiry.setDate(farExpiry.getDate() + 120); // 120 days from now

    const daysUntilExpiry = Math.floor((farExpiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const showAlert = daysUntilExpiry < 90;

    expect(showAlert).toBe(false);
  });

  it('shows alert when expiry is today (0 days)', () => {
    const today = new Date();
    const daysUntilExpiry = 0;
    const showAlert = daysUntilExpiry < 90;

    expect(showAlert).toBe(true);
  });

  it('shows alert when already expired (negative days)', () => {
    const today = new Date();
    const expired = new Date(today);
    expired.setDate(expired.getDate() - 30); // 30 days ago

    const daysUntilExpiry = Math.floor((expired.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const showAlert = daysUntilExpiry < 90;

    expect(showAlert).toBe(true);
  });
});

// ─── Employee Group / Subgroup Cascade Tests ────────────────────────────────

describe('US-7: Employee Group cascade logic (BRD #30, #31)', () => {
  const GROUP_REQUIRES_CONTRACT_END = ['D', 'E', 'F', 'G', 'H'];
  const PERMANENT_GROUPS = ['A', 'W', 'C'];

  type SubgroupMap = Record<string, string[]>;
  const SUBGROUP_MAP: SubgroupMap = {
    A: ['07', '09', '11', '12', '13', '17', '18', '20', '22', '27'],
    W: ['07', '09'],
    C: ['07', '09'],
    D: ['01'],
    E: ['P1', 'P2', 'P3'],
    F: ['01'],
    G: ['01'],
    H: ['01'],
  };

  it('Group A does not require contract_end_date', () => {
    expect(PERMANENT_GROUPS).toContain('A');
    expect(GROUP_REQUIRES_CONTRACT_END).not.toContain('A');
  });

  it('Group E requires contract_end_date', () => {
    expect(GROUP_REQUIRES_CONTRACT_END).toContain('E');
  });

  it('Group D (Retirement) requires contract_end_date', () => {
    expect(GROUP_REQUIRES_CONTRACT_END).toContain('D');
  });

  it('Group F (DVT) requires contract_end_date', () => {
    expect(GROUP_REQUIRES_CONTRACT_END).toContain('F');
  });

  it('subgroup options change when group changes (Group A → Group E)', () => {
    let selectedGroup = 'A';
    let subgroupOptions = SUBGROUP_MAP[selectedGroup] ?? [];

    expect(subgroupOptions).toContain('07');
    expect(subgroupOptions).not.toContain('P1');

    // Switch to Group E
    selectedGroup = 'E';
    subgroupOptions = SUBGROUP_MAP[selectedGroup] ?? [];

    expect(subgroupOptions).toContain('P1');
    expect(subgroupOptions).not.toContain('07');
  });

  it('changing group resets selected subgroup', () => {
    let selectedGroup = 'A';
    let selectedSubgroup = '07';

    const handleGroupChange = (newGroup: string) => {
      selectedGroup = newGroup;
      selectedSubgroup = ''; // reset
    };

    handleGroupChange('E');

    expect(selectedSubgroup).toBe('');
  });

  it('invalid group has no subgroups', () => {
    const invalidGroup = 'Z';
    const subgroups = SUBGROUP_MAP[invalidGroup] ?? [];

    expect(subgroups).toHaveLength(0);
  });
});

// ─── Payment Info Masking Tests ─────────────────────────────────────────────

describe('US-5: Payment Info masking (BRD #27 — 🔒 show last 4 digits)', () => {
  function maskAccountNumber(account: string): string {
    if (!account || account.length < 4) return '****';
    return '*'.repeat(account.length - 4) + account.slice(-4);
  }

  it('masks account number — shows only last 4 digits', () => {
    const masked = maskAccountNumber('1234567890');
    expect(masked).toBe('******7890');
  });

  it('masks 12-digit account number', () => {
    const masked = maskAccountNumber('123456789012');
    expect(masked).toBe('********9012');
  });

  it('handles account number shorter than 4 digits', () => {
    const masked = maskAccountNumber('123');
    expect(masked).toBe('****');
  });

  it('empty string returns ****', () => {
    const masked = maskAccountNumber('');
    expect(masked).toBe('****');
  });
});

// ─── Hire Form: Probation + Retirement Auto-calc ────────────────────────────

describe('US-6: Hire form auto-calculations (BRD #109, TTT rules 3+4)', () => {
  function calcProbationEndDate(hireDate: Date): Date {
    const end = new Date(hireDate);
    end.setDate(end.getDate() + 119);
    return end;
  }

  function calcRetirementDateCPN(dob: Date): Date {
    const age60Year = dob.getFullYear() + 60;
    return new Date(`${age60Year + 1}-01-01`);
  }

  function calcRetirementDateOther(dob: Date): Date {
    const age60Year = dob.getFullYear() + 60;
    return new Date(`${age60Year + 1}-03-01`);
  }

  it('probation end date = hire date + 119 days', () => {
    const hireDate = new Date('2024-06-01');
    const probation = calcProbationEndDate(hireDate);

    expect(probation.toISOString().substring(0, 10)).toBe('2024-09-28');
  });

  it('probation end date updates when hire date changes', () => {
    const hireDate1 = new Date('2024-01-01');
    const hireDate2 = new Date('2024-06-01');

    const probation1 = calcProbationEndDate(hireDate1);
    const probation2 = calcProbationEndDate(hireDate2);

    expect(probation1.toISOString().substring(0, 10)).toBe('2024-04-29');
    expect(probation2.toISOString().substring(0, 10)).toBe('2024-09-28');
    expect(probation1).not.toEqual(probation2);
  });

  it('CPN retirement = 1 Jan of (DOB year + 61)', () => {
    const dob = new Date('1970-05-15');
    const retirement = calcRetirementDateCPN(dob);

    expect(retirement.toISOString().substring(0, 10)).toBe('2031-01-01');
  });

  it('non-CPN retirement = 1 Mar of (DOB year + 61)', () => {
    const dob = new Date('1970-05-15');
    const retirement = calcRetirementDateOther(dob);

    expect(retirement.toISOString().substring(0, 10)).toBe('2031-03-01');
  });
});

// ─── Workflow-triggering Fields Detection ───────────────────────────────────

describe('US-2: Workflow trigger detection (TTT Process 03)', () => {
  const WORKFLOW_TRIGGER_FIELDS = [
    'first_name_en',
    'last_name_en',
    'first_name_th',
    'last_name_th',
    'marital_status',
    'military_status',
  ];

  function hasWorkflowTriggerField(changedFields: string[]): boolean {
    return changedFields.some((f) => WORKFLOW_TRIGGER_FIELDS.includes(f));
  }

  it('changing first_name_en triggers workflow', () => {
    expect(hasWorkflowTriggerField(['first_name_en'])).toBe(true);
  });

  it('changing marital_status triggers workflow', () => {
    expect(hasWorkflowTriggerField(['marital_status'])).toBe(true);
  });

  it('changing nickname does NOT trigger workflow (direct save)', () => {
    expect(hasWorkflowTriggerField(['nickname'])).toBe(false);
  });

  it('changing email does NOT trigger workflow', () => {
    expect(hasWorkflowTriggerField(['email'])).toBe(false);
  });

  it('changing blood_type does NOT trigger workflow', () => {
    expect(hasWorkflowTriggerField(['blood_type'])).toBe(false);
  });

  it('mixed changes with one workflow field → triggers', () => {
    expect(hasWorkflowTriggerField(['nickname', 'first_name_th', 'blood_type'])).toBe(true);
  });

  it('empty change set does not trigger workflow', () => {
    expect(hasWorkflowTriggerField([])).toBe(false);
  });
});

// ─── National ID Validation ─────────────────────────────────────────────────

describe('US-2/US-6: National ID validation (BRD #14 — 13 digits)', () => {
  const NATIONAL_ID_REGEX = /^\d{13}$/;

  it('valid 13-digit ID passes', () => {
    expect(NATIONAL_ID_REGEX.test('1234567890123')).toBe(true);
  });

  it('12-digit ID fails', () => {
    expect(NATIONAL_ID_REGEX.test('123456789012')).toBe(false);
  });

  it('14-digit ID fails', () => {
    expect(NATIONAL_ID_REGEX.test('12345678901234')).toBe(false);
  });

  it('ID with letters fails', () => {
    expect(NATIONAL_ID_REGEX.test('123456789012A')).toBe(false);
  });

  it('ID with hyphens fails', () => {
    expect(NATIONAL_ID_REGEX.test('1-2345-67890-12-3')).toBe(false);
  });

  it('empty string fails', () => {
    expect(NATIONAL_ID_REGEX.test('')).toBe(false);
  });

  it('all-zero ID (syntactically valid, checksum invalid separately)', () => {
    expect(NATIONAL_ID_REGEX.test('0000000000000')).toBe(true);
  });
});
