import { describe, it, expect, beforeEach } from 'vitest';
import enMessages from '../../messages/en.json';
import thMessages from '../../messages/th.json';
import {
  useSpecialPrivilegeStore,
  selectPrivilegesForEmployee,
} from '@/stores/special-privilege-store';

// ── Recursively collect the key-tree (key paths) of an object ──────────────────
function keyTree(obj: unknown, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object') return [];
  const out: string[] = [];
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${k}` : k;
    out.push(path);
    out.push(...keyTree(v, path));
  }
  return out.sort();
}

describe('special-privilege store', () => {
  beforeEach(() => {
    localStorage.clear();
    useSpecialPrivilegeStore.getState().clear();
  });

  it('seeds one demo record against EMP-0005', () => {
    const seeded = selectPrivilegesForEmployee('EMP-0005')(
      useSpecialPrivilegeStore.getState(),
    );
    expect(seeded).toHaveLength(1);
    expect(seeded[0].employeeId).toBe('EMP-0005');
    expect(seeded[0].planId).toBe('BE-MED-002');
  });

  it('addPrivilege appends a record with generated id + createdAt', () => {
    const before = useSpecialPrivilegeStore.getState().records.length;
    useSpecialPrivilegeStore.getState().addPrivilege({
      employeeId: 'EMP-0005',
      specialBenefitGroup: true,
      planId: 'BE-MED-001',
      schedulePeriod: 'year',
      benefitEntitlementAmount: 30000,
      maxPerClaim: 5000,
      effectiveStartDate: '2026-01-01T00:00:00.000Z',
      effectiveEndDate: '2026-12-31T00:00:00.000Z',
      reason: 'ทดสอบ',
      createdBy: 'HR Admin',
    });
    const records = useSpecialPrivilegeStore.getState().records;
    expect(records).toHaveLength(before + 1);
    const added = records[records.length - 1];
    expect(added.id).toBeTruthy();
    expect(added.createdAt).toBeTruthy();
    expect(added.reason).toBe('ทดสอบ');
  });

  it('removePrivilege deletes a record by id', () => {
    useSpecialPrivilegeStore.getState().addPrivilege({
      employeeId: 'EMP-0099',
      specialBenefitGroup: false,
      planId: 'BE-MED-001',
      schedulePeriod: 'month',
      benefitEntitlementAmount: 1000,
      maxPerClaim: 500,
      effectiveStartDate: '2026-01-01T00:00:00.000Z',
      effectiveEndDate: '2026-06-30T00:00:00.000Z',
      reason: 'remove-me',
      createdBy: 'HR Admin',
    });
    const target = useSpecialPrivilegeStore
      .getState()
      .records.find((r) => r.employeeId === 'EMP-0099');
    expect(target).toBeDefined();
    useSpecialPrivilegeStore.getState().removePrivilege(target!.id);
    expect(
      useSpecialPrivilegeStore
        .getState()
        .records.find((r) => r.employeeId === 'EMP-0099'),
    ).toBeUndefined();
  });

  it('selectPrivilegesForEmployee filters by employeeId', () => {
    const forOther = selectPrivilegesForEmployee('EMP-9999')(
      useSpecialPrivilegeStore.getState(),
    );
    expect(forOther).toHaveLength(0);
  });
});

describe('special-privilege i18n parity', () => {
  it('en.admin.specialPrivilege key-tree deep-equals th.admin.specialPrivilege', () => {
    const en = (enMessages as Record<string, Record<string, unknown>>).admin
      .specialPrivilege;
    const th = (thMessages as Record<string, Record<string, unknown>>).admin
      .specialPrivilege;
    expect(en).toBeDefined();
    expect(th).toBeDefined();
    expect(keyTree(en)).toEqual(keyTree(th));
  });
});
