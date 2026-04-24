/**
 * humi-profile-slice.approve-reject.test.ts
 * AC-3 invariant — store extended additively: reason? + With-Reason variants + legacy wrappers.
 *
 * Tests:
 *   1. adminApproveWithReason(id, reason) → status='approved' + approvedAt + reason stored
 *   2. adminApproveWithReason(id) no-reason → status='approved' + reason=undefined
 *   3. adminRejectWithReason(id, reason) → status='rejected' + reason stored
 *   4. legacy adminApprove delegates → same result as With-Reason(id, undefined)
 *   5. legacy adminReject delegates similarly
 *   6. nonexistent id → console.warn + no state mutation
 *   7. multiple approvals → each flips independently; untouched items immutable
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// ── UUID stub ─────────────────────────────────────────────────────────────────
let uuidCounter = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `uuid-ar-${++uuidCounter}`,
});

// ── localStorage mock ─────────────────────────────────────────────────────────
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

// ── Import store AFTER mocks ──────────────────────────────────────────────────
import { useHumiProfileStore } from '@/stores/humi-profile-slice';

// ── Store reset helper ────────────────────────────────────────────────────────

const BLANK_DRAFT = {
  nickname: 'ทดสอบ',
  phone: '',
  personalEmail: '',
  address: '',
  emergencyContacts: [],
  addressStructured: {
    houseNo: '', village: '', soi: '', road: '',
    subdistrict: '', district: '', province: '', postalCode: '',
  },
  phonesArr: [],
  emailsArr: [],
  bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null },
};

function resetStore() {
  useHumiProfileStore.setState({
    activeTab: 'personal',
    isEditing: false,
    draft: { ...BLANK_DRAFT },
    saved: { ...BLANK_DRAFT },
    attachments: [],
    pendingChanges: [],
    adminMode: false,
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Seed a pending change via submitChangeRequest and return its generated id. */
function seedChange(overrides: { field?: string; sectionKey?: 'personal' | 'contact' | 'address' | 'emergencyContact' | 'bank' } = {}): string {
  const { submitChangeRequest } = useHumiProfileStore.getState();
  return submitChangeRequest({
    field: overrides.field ?? 'ชื่อเล่น',
    oldValue: 'เดิม',
    newValue: 'ใหม่',
    effectiveDate: '2026-05-01',
    attachmentIds: [],
    sectionKey: overrides.sectionKey,
  });
}

beforeEach(() => {
  uuidCounter = 0;
  localStorageMock.clear();
  resetStore();
});

afterEach(() => {
  vi.restoreAllMocks();
  localStorageMock.clear();
  resetStore();
});

// ═════════════════════════════════════════════════════════════════════════════
// AC-3: adminApproveWithReason / adminRejectWithReason
// ═════════════════════════════════════════════════════════════════════════════

describe('adminApproveWithReason', () => {
  it('Test 1: sets status=approved + approvedAt non-null + reason stored', () => {
    const id = seedChange({ sectionKey: 'personal' });

    useHumiProfileStore.getState().adminApproveWithReason(id, 'ตรวจสอบแล้ว');

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges.find((pc) => pc.id === id)!;
    expect(change.status).toBe('approved');
    expect(change.approvedAt).toBeTruthy();
    expect(change.reason).toBe('ตรวจสอบแล้ว');
  });

  it('Test 2: no reason arg → status=approved + reason=undefined', () => {
    const id = seedChange({ sectionKey: 'contact' });

    useHumiProfileStore.getState().adminApproveWithReason(id);

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges.find((pc) => pc.id === id)!;
    expect(change.status).toBe('approved');
    expect(change.approvedAt).toBeTruthy();
    expect(change.reason).toBeUndefined();
  });
});

describe('adminRejectWithReason', () => {
  it('Test 3: sets status=rejected + reason stored', () => {
    const id = seedChange({ sectionKey: 'address' });

    useHumiProfileStore.getState().adminRejectWithReason(id, 'ข้อมูลไม่ครบ');

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges.find((pc) => pc.id === id)!;
    expect(change.status).toBe('rejected');
    expect(change.approvedAt).toBeTruthy();
    expect(change.reason).toBe('ข้อมูลไม่ครบ');
  });
});

describe('legacy wrappers delegate to With-Reason', () => {
  it('Test 4: adminApprove → same result as adminApproveWithReason(id, undefined)', () => {
    const id = seedChange({ sectionKey: 'bank' });

    useHumiProfileStore.getState().adminApprove(id);

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges.find((pc) => pc.id === id)!;
    expect(change.status).toBe('approved');
    expect(change.reason).toBeUndefined();
  });

  it('Test 5: adminReject → same result as adminRejectWithReason(id, undefined)', () => {
    const id = seedChange({ sectionKey: 'personal' });

    useHumiProfileStore.getState().adminReject(id);

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges.find((pc) => pc.id === id)!;
    expect(change.status).toBe('rejected');
    expect(change.reason).toBeUndefined();
  });
});

describe('nonexistent id guard', () => {
  it('Test 6: adminApproveWithReason on nonexistent id → console.warn + no state mutation', () => {
    const id = seedChange();
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    useHumiProfileStore.getState().adminApproveWithReason('nonexistent-id-xyz', 'x');

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('adminApproveWithReason'),
      'nonexistent-id-xyz'
    );

    // Original pending change must remain untouched
    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges.find((pc) => pc.id === id)!;
    expect(change.status).toBe('pending');
    expect(change.reason).toBeUndefined();
  });
});

describe('independent approvals — immutability of untouched items', () => {
  it('Test 7: multiple ids each flip independently; untouched items stay immutable', () => {
    const id1 = seedChange({ field: 'ชื่อเล่น', sectionKey: 'personal' });
    const id2 = seedChange({ field: 'ที่อยู่', sectionKey: 'address' });
    const id3 = seedChange({ field: 'บัญชีธนาคาร', sectionKey: 'bank' });

    // Snapshot state reference before any mutation
    const beforeState = useHumiProfileStore.getState().pendingChanges;

    useHumiProfileStore.getState().adminApproveWithReason(id1, 'ผ่าน');
    useHumiProfileStore.getState().adminRejectWithReason(id2, 'ไม่ผ่าน');

    const { pendingChanges } = useHumiProfileStore.getState();
    const c1 = pendingChanges.find((pc) => pc.id === id1)!;
    const c2 = pendingChanges.find((pc) => pc.id === id2)!;
    const c3 = pendingChanges.find((pc) => pc.id === id3)!;

    // Approved item
    expect(c1.status).toBe('approved');
    expect(c1.reason).toBe('ผ่าน');

    // Rejected item
    expect(c2.status).toBe('rejected');
    expect(c2.reason).toBe('ไม่ผ่าน');

    // Untouched item must still be pending with no reason
    expect(c3.status).toBe('pending');
    expect(c3.reason).toBeUndefined();

    // State object reference must have changed (immutable update pattern)
    expect(pendingChanges).not.toBe(beforeState);

    // Untouched item's object reference must be the same (no unnecessary clone)
    const beforeC3 = beforeState.find((pc) => pc.id === id3)!;
    expect(c3).toBe(beforeC3);
  });
});
