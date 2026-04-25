/**
 * T3 (#90) — humi-profile-slice v4 → v5 migrate
 *
 * Invariant: v5 migration is additive only. v4 Dependents schema (#85) MUST
 * be preserved verbatim. Field-level changeRequest (`field='first_name_th'`,
 * `field='marital_status'`) flows through the existing `field: string`
 * shape — no breaking change required.
 */

import { describe, expect, test } from 'vitest';

describe('T3 #90 — humi-profile-slice v4→v5 migration', () => {
  test('v5 is the current persisted version', async () => {
    // Re-import inside test to ensure slice is initialized in this jsdom run.
    const sliceMod = await import('@/stores/humi-profile-slice');
    expect(sliceMod.useHumiProfileStore.persist.getOptions().version).toBe(5);
  });

  test('migrate v4 → v5 preserves v4 dependents schema verbatim', async () => {
    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');
    const migrate = useHumiProfileStore.persist.getOptions().migrate;
    expect(migrate).toBeDefined();

    const v4State = {
      activeTab: 'personal',
      saved: {
        nickname: 'Test',
        dependents: [
          {
            id: 'dep-1',
            fullNameTh: 'สมชาย',
            fullNameEn: 'Somchai',
            relation: 'spouse',
            dateOfBirth: '1990-01-01',
            hasInsurance: true,
            isCentralEmployee: false,
          },
        ],
      },
      attachments: [],
      pendingChanges: [],
    };

    const result = migrate!(v4State, 4);
    // Migrate should return a state with `saved` containing all v4 dependents fields.
    expect((result as any).saved.dependents).toEqual(v4State.saved.dependents);
    expect((result as any).saved.dependents[0].fullNameTh).toBe('สมชาย');
    expect((result as any).saved.dependents[0].hasInsurance).toBe(true);
  });

  test('migrate handles null persistedState gracefully', async () => {
    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');
    const migrate = useHumiProfileStore.persist.getOptions().migrate;
    expect(() => migrate!(null, 4)).not.toThrow();
    expect(() => migrate!(undefined, 4)).not.toThrow();
  });

  test('field-level change request (first_name_th) flows through PendingChange.field', async () => {
    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');
    const store = useHumiProfileStore;
    const before = store.getState().pendingChanges.length;
    store.getState().submitChangeRequest({
      field: 'first_name_th',
      oldValue: 'จงรักษ์',
      newValue: 'ทศพร',
      effectiveDate: '2026-05-01',
      attachmentIds: [],
      sectionKey: 'personal',
    });
    const after = store.getState().pendingChanges;
    expect(after.length).toBe(before + 1);
    const last = after[after.length - 1]!;
    expect(last.field).toBe('first_name_th');
    expect(last.sectionKey).toBe('personal');
    expect(last.status).toBe('pending');
  });

  test('field-level change request (marital_status) accepted', async () => {
    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');
    const store = useHumiProfileStore;
    const before = store.getState().pendingChanges.length;
    store.getState().submitChangeRequest({
      field: 'marital_status',
      oldValue: 'single',
      newValue: 'married',
      effectiveDate: '2026-06-01',
      attachmentIds: [],
      sectionKey: 'personal',
    });
    const list = store.getState().pendingChanges;
    expect(list.length).toBe(before + 1);
    const last = list[list.length - 1]!;
    expect(last.field).toBe('marital_status');
  });

  test('1-step SPD approval (BRD #166) — adminApproveWithReason marks status approved', async () => {
    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');
    const store = useHumiProfileStore;
    const id = store.getState().submitChangeRequest({
      field: 'first_name_th',
      oldValue: 'a',
      newValue: 'b',
      effectiveDate: '2026-07-01',
      attachmentIds: [],
      sectionKey: 'personal',
    });
    store.getState().adminApproveWithReason(id, 'รับรองเอกสารถูกต้อง');
    const cr = store.getState().pendingChanges.find((pc) => pc.id === id);
    expect(cr?.status).toBe('approved');
    expect(cr?.reason).toBe('รับรองเอกสารถูกต้อง');
    expect(cr?.approvedAt).toBeDefined();
  });
});
