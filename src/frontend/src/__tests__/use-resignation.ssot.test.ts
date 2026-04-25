/**
 * use-resignation.ssot.test.ts
 * AC-2: useResignation อ่านจาก useHumiProfileStore.pendingChanges เท่านั้น
 *       ห้าม local useState<ResignationRecord> — C7 SSoT invariant
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as fs from 'fs';
import * as path from 'path';

// ── UUID stub ──────────────────────────────────────────────────────────────────
let uuidCounter = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `ssot-uuid-${++uuidCounter}`,
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
// AC-2 (static): source code ไม่มี useState<ResignationRecord>
// ════════════════════════════════════════════════════════════════════════════

describe('AC-2 (static): use-resignation.ts ต้องไม่มี useState<ResignationRecord>', () => {
  it('AC-2: grep use-resignation.ts ต้องไม่เจอ useState.*ResignationRecord (C7 SSoT invariant)', () => {
    const hookPath = path.resolve(
      __dirname,
      '../hooks/use-resignation.ts',
    );
    const source = fs.readFileSync(hookPath, 'utf-8');
    // AC-2: ห้ามมี useState<ResignationRecord> ใน source code (excluding comments) — ถ้าเจอ = C7 violation
    const codeOnly = source
      .split('\n')
      .filter((l) => !l.trim().startsWith('//'))
      .join('\n');
    expect(codeOnly).not.toMatch(/useState\s*<\s*ResignationRecord/);
  });

  it('AC-2: use-resignation.ts ต้องมี useHumiProfileStore (subscribe to store)', () => {
    const hookPath = path.resolve(
      __dirname,
      '../hooks/use-resignation.ts',
    );
    const source = fs.readFileSync(hookPath, 'utf-8');
    expect(source).toContain('useHumiProfileStore');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-2 (runtime): store update → hook re-renders โดยไม่ต้อง local state
// ════════════════════════════════════════════════════════════════════════════

describe('AC-2 (runtime): store update → hook re-renders พร้อม record ใหม่', () => {
  it('AC-2: ก่อน submit — record เป็น null (ไม่มี termination ใน store)', () => {
    const { result } = renderHook(() => useResignation());
    // AC-2: เริ่มต้น record ต้องเป็น null — store ยังว่าง
    expect(result.current.record).toBeNull();
  });

  it('AC-2: หลัง submitChangeRequest โดยตรง → hook เห็น record ทันที (reactive)', async () => {
    const { result } = renderHook(() => useResignation());

    // inject ผ่าน store โดยตรง (ไม่ผ่าน hook) — ทดสอบว่า hook reactive ต่อ store
    act(() => {
      useHumiProfileStore.getState().submitChangeRequest({
        sectionKey: 'termination',
        field: 'employmentStatus',
        oldValue: 'active',
        newValue: 'RESIGN_PERSONAL',
        effectiveDate: '2026-06-30',
        attachmentIds: [],
      });
    });

    // AC-2: hook ต้อง re-render เห็น record ที่ map จาก pendingChange
    expect(result.current.record).not.toBeNull();
    expect(result.current.record?.reasonType).toBe('RESIGN_PERSONAL');
  });

  it('AC-2: record.status เป็น "submitted" เมื่อ PendingChange.status="pending"', async () => {
    const { result } = renderHook(() => useResignation());

    act(() => {
      useHumiProfileStore.getState().submitChangeRequest({
        sectionKey: 'termination',
        field: 'employmentStatus',
        oldValue: 'active',
        newValue: 'RESIGN_FAMILY',
        effectiveDate: '2026-07-01',
        attachmentIds: [],
      });
    });

    // AC-2: map PendingChange.status='pending' → ResignationRecord.status='submitted'
    expect(result.current.record?.status).toBe('submitted');
  });
});
