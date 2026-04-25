/**
 * use-resignation.submit.test.ts
 * AC-1: submitResignation → PendingChange ที่ sectionKey='termination' ถูกสร้างใน humi-profile-slice
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// ── UUID stub ──────────────────────────────────────────────────────────────────
let uuidCounter = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `resign-uuid-${++uuidCounter}`,
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

import { useHumiProfileStore } from '@/stores/humi-profile-slice';
import { useResignation } from '@/hooks/use-resignation';

function resetStore() {
  localStorageMock.clear();
  useHumiProfileStore.setState({
    activeTab: 'personal',
    isEditing: false,
    draft: {
      nickname: 'จงรักษ์', phone: '', personalEmail: '', address: '',
      emergencyContacts: [],
      addressStructured: { houseNo: '', village: '', soi: '', road: '', subdistrict: '', district: '', province: '', postalCode: '' },
      phonesArr: [], emailsArr: [],
      bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null },
    },
    saved: {
      nickname: 'จงรักษ์', phone: '', personalEmail: '', address: '',
      emergencyContacts: [],
      addressStructured: { houseNo: '', village: '', soi: '', road: '', subdistrict: '', district: '', province: '', postalCode: '' },
      phonesArr: [], emailsArr: [],
      bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null },
    },
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
  resetStore();
});

// ════════════════════════════════════════════════════════════════════════════
// AC-1: submitResignation → pendingChanges ได้ entry ใหม่ sectionKey='termination'
// ════════════════════════════════════════════════════════════════════════════

describe('AC-1: submitResignation เพิ่ม PendingChange ที่ sectionKey="termination"', () => {
  it('AC-1: หลัง submitResignation ต้องมี entry ใน pendingChanges พร้อม sectionKey="termination"', async () => {
    const { result } = renderHook(() => useResignation());

    await act(async () => {
      await result.current.submitResignation({
        lastWorkingDate: '2026-06-30',
        reason: 'RESIGN_PERSONAL',
        handoverNotes: 'ส่งมอบงานเรียบร้อย',
      });
    });

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges).toHaveLength(1);
    // AC-1: sectionKey ต้องเป็น 'termination' เท่านั้น
    expect(pendingChanges[0].sectionKey).toBe('termination');
  });

  it('AC-1: PendingChange ต้องมี field="employmentStatus" + newValue เท่ากับ reasonCode ที่ส่งเข้ามา', async () => {
    const { result } = renderHook(() => useResignation());

    await act(async () => {
      await result.current.submitResignation({
        lastWorkingDate: '2026-07-31',
        reason: 'RESIGN_STUDY',
        handoverNotes: '',
      });
    });

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges[0];
    expect(change.field).toBe('employmentStatus');
    expect(change.oldValue).toBe('active');
    expect(change.newValue).toBe('RESIGN_STUDY');
  });

  it('AC-1: effectiveDate ใน PendingChange ต้องตรงกับ lastWorkingDate ที่ส่งเข้ามา', async () => {
    const { result } = renderHook(() => useResignation());

    await act(async () => {
      await result.current.submitResignation({
        lastWorkingDate: '2026-08-15',
        reason: 'RESIGN_FAMILY',
        handoverNotes: '',
      });
    });

    const { pendingChanges } = useHumiProfileStore.getState();
    // AC-1: effectiveDate = lastWorkingDate
    expect(pendingChanges[0].effectiveDate).toBe('2026-08-15');
  });

  it('AC-1: PendingChange ต้องมี status="pending" หลัง submit (ยังรอ SPD approve)', async () => {
    const { result } = renderHook(() => useResignation());

    await act(async () => {
      await result.current.submitResignation({
        lastWorkingDate: '2026-06-30',
        reason: 'RESIGN_OTHER',
        handoverNotes: 'หมายเหตุ',
      });
    });

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].status).toBe('pending');
  });
});
