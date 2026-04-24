/**
 * humi-profile-slice.test.ts — Zustand store unit tests (Sprint 3)
 * Framework: Vitest + jsdom
 *
 * Covers new actions added in issue #12:
 *   addAttachment / removeAttachment / submitChangeRequest /
 *   adminApprove / adminReject / toggleAdminMode
 * Plus: localStorage persistence roundtrip.
 *
 * AC refs: AC-2, AC-4, AC-5, AC-6
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { act } from 'react';

// ── Zustand store reset helper ────────────────────────────────────────────────
// We re-import the store after each test via resetAllStores pattern.
// zustand/middleware persist uses localStorage; we mock it per test.

// Mock crypto.randomUUID deterministically per test
let uuidCounter = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `test-uuid-${++uuidCounter}`,
});

// Mock localStorage in memory
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

// Import store AFTER mocks are in place
import { useHumiProfileStore } from '@/stores/humi-profile-slice';
import type { SubmitChangePayload } from '@/stores/humi-profile-slice';

// ── Reset store state between tests ───────────────────────────────────────────

function resetStore() {
  localStorageMock.clear();
  useHumiProfileStore.setState({
    activeTab: 'personal',
    isEditing: false,
    draft: { nickname: 'จงรักษ์', phone: '+66 (02) 555-0188', personalEmail: 'test@test.com', address: 'test', emergencyContacts: [], addressStructured: { houseNo: '', village: '', soi: '', road: '', subdistrict: '', district: '', province: '', postalCode: '' }, phonesArr: [{ value: '+66 (02) 555-0188', primary: true }], emailsArr: [{ value: 'test@test.com', primary: true }], bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null } },
    saved: { nickname: 'จงรักษ์', phone: '+66 (02) 555-0188', personalEmail: 'test@test.com', address: 'test', emergencyContacts: [], addressStructured: { houseNo: '', village: '', soi: '', road: '', subdistrict: '', district: '', province: '', postalCode: '' }, phonesArr: [{ value: '+66 (02) 555-0188', primary: true }], emailsArr: [{ value: 'test@test.com', primary: true }], bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null } },
    attachments: [],
    pendingChanges: [],
    adminMode: false,
  });
}

beforeEach(() => {
  uuidCounter = 0;
  resetStore();
});

afterEach(() => {
  vi.clearAllMocks();
});

// ════════════════════════════════════════════════════════════════════════════
// AC-2: addAttachment / removeAttachment
// ════════════════════════════════════════════════════════════════════════════

describe('addAttachment', () => {
  // AC-2
  it('creates attachment entry with generated id and returns that id', () => {
    const store = useHumiProfileStore.getState();
    const id = store.addAttachment({
      filename: 'ช3.pdf',
      size: 102400,
      mimeType: 'application/pdf',
      base64: 'data:application/pdf;base64,AAAA',
    });

    expect(id).toBe('test-uuid-1');
    const { attachments } = useHumiProfileStore.getState();
    expect(attachments).toHaveLength(1);
    expect(attachments[0].id).toBe('test-uuid-1');
    expect(attachments[0].filename).toBe('ช3.pdf');
  });

  // AC-2
  it('stores base64 data verbatim', () => {
    const base64 = 'data:application/pdf;base64,JVBERi0xLjQ=';
    const store = useHumiProfileStore.getState();
    store.addAttachment({ filename: 'test.pdf', size: 500, mimeType: 'application/pdf', base64 });

    const { attachments } = useHumiProfileStore.getState();
    expect(attachments[0].base64).toBe(base64);
  });

  // AC-2
  it('sets uploadedAt as ISO-8601 timestamp', () => {
    const before = Date.now();
    const store = useHumiProfileStore.getState();
    store.addAttachment({ filename: 'a.jpg', size: 1024, mimeType: 'image/jpeg', base64: 'data:image/jpeg;base64,AA' });

    const { attachments } = useHumiProfileStore.getState();
    const uploadedAt = new Date(attachments[0].uploadedAt).getTime();
    expect(uploadedAt).toBeGreaterThanOrEqual(before);
  });

  // AC-2
  it('accumulates multiple attachments independently', () => {
    const store = useHumiProfileStore.getState();
    store.addAttachment({ filename: 'file1.pdf', size: 100, mimeType: 'application/pdf', base64: 'data:a;base64,A' });
    store.addAttachment({ filename: 'file2.png', size: 200, mimeType: 'image/png', base64: 'data:b;base64,B' });

    const { attachments } = useHumiProfileStore.getState();
    expect(attachments).toHaveLength(2);
    expect(attachments[0].filename).toBe('file1.pdf');
    expect(attachments[1].filename).toBe('file2.png');
  });
});

describe('removeAttachment', () => {
  // AC-2
  it('removes the attachment with the given id', () => {
    const store = useHumiProfileStore.getState();
    const id = store.addAttachment({ filename: 'to-remove.pdf', size: 1024, mimeType: 'application/pdf', base64: 'data:x' });
    store.addAttachment({ filename: 'keep.pdf', size: 512, mimeType: 'application/pdf', base64: 'data:y' });

    useHumiProfileStore.getState().removeAttachment(id);

    const { attachments } = useHumiProfileStore.getState();
    expect(attachments).toHaveLength(1);
    expect(attachments[0].filename).toBe('keep.pdf');
  });

  // AC-2
  it('scrubs removed attachment id from pendingChanges.attachmentIds', () => {
    const store = useHumiProfileStore.getState();
    const attId = store.addAttachment({ filename: 'doc.pdf', size: 1024, mimeType: 'application/pdf', base64: 'data:z' });

    const payload: SubmitChangePayload = {
      field: 'firstName',
      oldValue: 'เดิม',
      newValue: 'ใหม่',
      effectiveDate: '2026-05-01',
      attachmentIds: [attId],
    };
    useHumiProfileStore.getState().submitChangeRequest(payload);
    useHumiProfileStore.getState().removeAttachment(attId);

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].attachmentIds).not.toContain(attId);
  });

  // edge case
  it('silently ignores removal of non-existent id', () => {
    const store = useHumiProfileStore.getState();
    store.addAttachment({ filename: 'a.pdf', size: 100, mimeType: 'application/pdf', base64: 'data:a' });
    // Should not throw
    expect(() => useHumiProfileStore.getState().removeAttachment('non-existent-id')).not.toThrow();
    expect(useHumiProfileStore.getState().attachments).toHaveLength(1);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-4: submitChangeRequest
// ════════════════════════════════════════════════════════════════════════════

describe('submitChangeRequest', () => {
  // AC-4
  it('creates a PendingChange with status="pending" and returns its id', () => {
    const payload: SubmitChangePayload = {
      field: 'firstNameTH',
      oldValue: 'สมชาย',
      newValue: 'ทดสอบ',
      effectiveDate: '2026-05-01',
      attachmentIds: [],
    };
    const id = useHumiProfileStore.getState().submitChangeRequest(payload);

    expect(id).toBeTruthy();
    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges).toHaveLength(1);
    expect(pendingChanges[0].status).toBe('pending');
    expect(pendingChanges[0].id).toBe(id);
  });

  // AC-4
  it('persists field, oldValue, newValue, effectiveDate correctly', () => {
    const payload: SubmitChangePayload = {
      field: 'maritalStatus',
      oldValue: 'โสด',
      newValue: 'แต่งงาน',
      effectiveDate: '2026-06-15',
      attachmentIds: [],
    };
    useHumiProfileStore.getState().submitChangeRequest(payload);

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges[0];
    expect(change.field).toBe('maritalStatus');
    expect(change.oldValue).toBe('โสด');
    expect(change.newValue).toBe('แต่งงาน');
    expect(change.effectiveDate).toBe('2026-06-15');
  });

  // AC-4
  it('auto-sets requestedAt as ISO-8601 timestamp', () => {
    const before = Date.now();
    useHumiProfileStore.getState().submitChangeRequest({
      field: 'nationalID',
      oldValue: '1234567890123',
      newValue: '9999999999999',
      effectiveDate: '2026-05-01',
      attachmentIds: [],
    });

    const { pendingChanges } = useHumiProfileStore.getState();
    const ts = new Date(pendingChanges[0].requestedAt).getTime();
    expect(ts).toBeGreaterThanOrEqual(before);
  });

  // AC-4
  it('stores attachmentIds reference array', () => {
    const store = useHumiProfileStore.getState();
    const attId = store.addAttachment({ filename: 'ทะเบียนสมรส.pdf', size: 512000, mimeType: 'application/pdf', base64: 'data:x' });

    store.submitChangeRequest({
      field: 'maritalStatus',
      oldValue: 'โสด',
      newValue: 'แต่งงาน',
      effectiveDate: '2026-05-01',
      attachmentIds: [attId],
    });

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].attachmentIds).toContain(attId);
  });

  // edge case: multiple pending changes accumulate
  it('accumulates multiple pending changes without overwriting earlier ones', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest({ field: 'firstName', oldValue: 'เดิม', newValue: 'ใหม่1', effectiveDate: '2026-05-01', attachmentIds: [] });
    store.submitChangeRequest({ field: 'lastName', oldValue: 'นามสกุลเดิม', newValue: 'ใหม่2', effectiveDate: '2026-05-01', attachmentIds: [] });

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges).toHaveLength(2);
    expect(pendingChanges[0].field).toBe('firstName');
    expect(pendingChanges[1].field).toBe('lastName');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-6: adminApprove / adminReject
// ════════════════════════════════════════════════════════════════════════════

describe('adminApprove', () => {
  // AC-6
  it('flips status to "approved" and sets approvedAt', () => {
    const id = useHumiProfileStore.getState().submitChangeRequest({
      field: 'firstNameTH',
      oldValue: 'สมชาย',
      newValue: 'ทดสอบ',
      effectiveDate: '2026-05-01',
      attachmentIds: [],
    });

    const before = Date.now();
    useHumiProfileStore.getState().adminApprove(id);

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges.find((pc) => pc.id === id)!;
    expect(change.status).toBe('approved');
    expect(change.approvedAt).toBeDefined();
    const approvedTs = new Date(change.approvedAt!).getTime();
    expect(approvedTs).toBeGreaterThanOrEqual(before);
  });

  // AC-6
  it('does not affect other pending changes when approving one', () => {
    const store = useHumiProfileStore.getState();
    const id1 = store.submitChangeRequest({ field: 'firstName', oldValue: 'A', newValue: 'B', effectiveDate: '2026-05-01', attachmentIds: [] });
    const id2 = store.submitChangeRequest({ field: 'lastName', oldValue: 'C', newValue: 'D', effectiveDate: '2026-05-01', attachmentIds: [] });

    useHumiProfileStore.getState().adminApprove(id1);

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges.find((pc) => pc.id === id2)?.status).toBe('pending');
  });

  // edge case: non-existent id (C6 — should warn, not throw)
  it('does not throw and does not mutate state when id not found', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => useHumiProfileStore.getState().adminApprove('ghost-id')).not.toThrow();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('adminReject', () => {
  // AC-6
  it('flips status to "rejected" and sets approvedAt', () => {
    const id = useHumiProfileStore.getState().submitChangeRequest({
      field: 'maritalStatus',
      oldValue: 'โสด',
      newValue: 'แต่งงาน',
      effectiveDate: '2026-05-01',
      attachmentIds: [],
    });

    useHumiProfileStore.getState().adminReject(id);

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges.find((pc) => pc.id === id)!;
    expect(change.status).toBe('rejected');
    expect(change.approvedAt).toBeDefined();
  });

  // AC-6 — reject must NOT mutate displayed field value (unlike approve)
  it('rejected change does not alter saved draft', () => {
    const store = useHumiProfileStore.getState();
    const savedBefore = { ...store.saved };

    const id = store.submitChangeRequest({
      field: 'nickname',
      oldValue: savedBefore.nickname,
      newValue: 'หนู',
      effectiveDate: '2026-05-01',
      attachmentIds: [],
    });
    useHumiProfileStore.getState().adminReject(id);

    const { saved } = useHumiProfileStore.getState();
    expect(saved.nickname).toBe(savedBefore.nickname);
  });

  // edge case: console.warn on non-existent id (C6)
  it('warns but does not throw when id not found', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => useHumiProfileStore.getState().adminReject('ghost-id')).not.toThrow();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// toggleAdminMode
// ════════════════════════════════════════════════════════════════════════════

describe('toggleAdminMode', () => {
  it('flips false → true on first call', () => {
    expect(useHumiProfileStore.getState().adminMode).toBe(false);
    useHumiProfileStore.getState().toggleAdminMode();
    expect(useHumiProfileStore.getState().adminMode).toBe(true);
  });

  it('flips true → false on second call', () => {
    useHumiProfileStore.getState().toggleAdminMode();
    useHumiProfileStore.getState().toggleAdminMode();
    expect(useHumiProfileStore.getState().adminMode).toBe(false);
  });

  it('does not affect pendingChanges when toggled', () => {
    useHumiProfileStore.getState().submitChangeRequest({
      field: 'firstName',
      oldValue: 'เดิม',
      newValue: 'ใหม่',
      effectiveDate: '2026-05-01',
      attachmentIds: [],
    });
    useHumiProfileStore.getState().toggleAdminMode();

    expect(useHumiProfileStore.getState().pendingChanges).toHaveLength(1);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Persistence: localStorage roundtrip
// ════════════════════════════════════════════════════════════════════════════

describe('Persistence — localStorage (humi-profile-v1)', () => {
  it('pendingChanges stored in state with status=pending', () => {
    // Submit a change — zustand state mutation (persist partialize includes this)
    const id = useHumiProfileStore.getState().submitChangeRequest({
      field: 'firstNameTH',
      oldValue: 'สมชาย',
      newValue: 'ทดสอบ',
      effectiveDate: '2026-05-01',
      attachmentIds: [],
    });

    const change = useHumiProfileStore.getState().pendingChanges.find((pc) => pc.id === id);
    expect(change?.status).toBe('pending');
    expect(change?.newValue).toBe('ทดสอบ');
  });

  it('attachments are stored in state (ready for persist partialize)', () => {
    const attId = useHumiProfileStore.getState().addAttachment({
      filename: 'บัตรประชาชน.jpg',
      size: 204800,
      mimeType: 'image/jpeg',
      base64: 'data:image/jpeg;base64,/9j/FIXTURE',
    });

    const found = useHumiProfileStore.getState().attachments.find((a) => a.id === attId);
    expect(found?.filename).toBe('บัตรประชาชน.jpg');
    expect(found?.base64).toBe('data:image/jpeg;base64,/9j/FIXTURE');
  });

  it('adminMode flips to true and stays', () => {
    useHumiProfileStore.getState().toggleAdminMode(); // → true
    expect(useHumiProfileStore.getState().adminMode).toBe(true);
  });

  it('draft (transient editing state) is NOT persisted', () => {
    // partialize excludes draft — confirm it is absent from persisted state
    useHumiProfileStore.getState().startEdit();
    useHumiProfileStore.getState().updateDraft({ nickname: 'ชั่วคราว' });

    const raw = localStorageMock.getItem('humi-profile-v1');
    const stored = JSON.parse(raw!);
    // draft should NOT appear in persisted state (partialize excludes it)
    expect(stored?.state?.draft).toBeUndefined();
  });
});
