/**
 * profile-me.section-submit.test.tsx
 * AC-6 — Section submit: each section creates exactly ONE PendingChange with correct sectionKey
 *
 * Approach: import useHumiProfileStore directly + call submitChangeRequest() + assert store state.
 * No full page render needed — the invariant is in the store action, not the UI wiring.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ── UUID stub ──────────────────────────────────────────────────────────────────
let uuidSeq = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `submit-uuid-${++uuidSeq}`,
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
import type { SubmitChangePayload, SectionKey } from '@/stores/humi-profile-slice';

// ── Reset store between tests ──────────────────────────────────────────────────
function resetStore() {
  localStorageMock.clear();
  useHumiProfileStore.setState({
    activeTab: 'personal',
    isEditing: false,
    draft: {
      nickname: 'จงรักษ์',
      phone: '',
      personalEmail: '',
      address: '',
      emergencyContacts: [],
      addressStructured: { houseNo: '', village: '', soi: '', road: '', subdistrict: '', district: '', province: '', postalCode: '' },
      phonesArr: [],
      emailsArr: [],
      bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null },
    },
    saved: {
      nickname: 'จงรักษ์',
      phone: '',
      personalEmail: '',
      address: '',
      emergencyContacts: [],
      addressStructured: { houseNo: '', village: '', soi: '', road: '', subdistrict: '', district: '', province: '', postalCode: '' },
      phonesArr: [],
      emailsArr: [],
      bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null },
    },
    attachments: [],
    pendingChanges: [],
    adminMode: false,
  });
}

beforeEach(() => {
  uuidSeq = 0;
  resetStore();
});

afterEach(() => {
  vi.clearAllMocks();
});

// ── Helper: build a minimal SubmitChangePayload with a given sectionKey ────────
function makePayload(sectionKey: SectionKey, newValue = 'test-value'): SubmitChangePayload {
  return {
    field: `${sectionKey}-field`,
    oldValue: '',
    newValue,
    effectiveDate: '2026-05-01',
    attachmentIds: [],
    sectionKey,
  };
}

// ════════════════════════════════════════════════════════════════════════════
// AC-6: submitChangeRequest creates exactly ONE PendingChange per section submit
// ════════════════════════════════════════════════════════════════════════════

describe('section submit — emergencyContact sectionKey', () => {
  it('should add exactly one PendingChange when emergencyContact is submitted', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('emergencyContact'));

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges).toHaveLength(1);
  });

  it('should set sectionKey to emergencyContact on the created PendingChange', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('emergencyContact'));

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].sectionKey).toBe('emergencyContact');
  });

  it('should set status to pending on new emergencyContact PendingChange', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('emergencyContact'));

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].status).toBe('pending');
  });
});

describe('section submit — address sectionKey', () => {
  it('should add exactly one PendingChange for address section', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('address'));

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges).toHaveLength(1);
  });

  it('should set sectionKey to address', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('address'));

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].sectionKey).toBe('address');
  });
});

describe('section submit — contact sectionKey', () => {
  it('should add exactly one PendingChange for contact section', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('contact'));

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges).toHaveLength(1);
  });

  it('should set sectionKey to contact', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('contact'));

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].sectionKey).toBe('contact');
  });
});

describe('section submit — bank sectionKey', () => {
  it('should add exactly one PendingChange for bank section', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('bank'));

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges).toHaveLength(1);
  });

  it('should set sectionKey to bank', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('bank'));

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].sectionKey).toBe('bank');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-6: submitting 4 sections creates 4 independent PendingChanges
// ════════════════════════════════════════════════════════════════════════════

describe('section submit — multiple sections accumulate independently', () => {
  it('should create 4 PendingChanges when 4 sections submitted', () => {
    const store = useHumiProfileStore.getState();
    const sections: SectionKey[] = ['emergencyContact', 'address', 'contact', 'bank'];
    sections.forEach((sk) => store.submitChangeRequest(makePayload(sk)));

    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges).toHaveLength(4);
  });

  it('should have distinct sectionKeys for each of the 4 submissions', () => {
    const store = useHumiProfileStore.getState();
    const sections: SectionKey[] = ['emergencyContact', 'address', 'contact', 'bank'];
    sections.forEach((sk) => store.submitChangeRequest(makePayload(sk)));

    const { pendingChanges } = useHumiProfileStore.getState();
    const keys = pendingChanges.map((pc) => pc.sectionKey);
    expect(keys).toContain('emergencyContact');
    expect(keys).toContain('address');
    expect(keys).toContain('contact');
    expect(keys).toContain('bank');
  });

  it('should preserve existing pendingChanges and add exactly one more per submit', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('emergencyContact'));
    expect(useHumiProfileStore.getState().pendingChanges).toHaveLength(1);

    store.submitChangeRequest(makePayload('address'));
    expect(useHumiProfileStore.getState().pendingChanges).toHaveLength(2);

    store.submitChangeRequest(makePayload('bank'));
    expect(useHumiProfileStore.getState().pendingChanges).toHaveLength(3);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-6: PendingChange shape correctness
// ════════════════════════════════════════════════════════════════════════════

describe('section submit — PendingChange shape', () => {
  it('should include effectiveDate from payload', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest({
      ...makePayload('bank'),
      effectiveDate: '2026-06-01',
    });
    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].effectiveDate).toBe('2026-06-01');
  });

  it('should include newValue from payload', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest({
      ...makePayload('contact'),
      newValue: 'contact-snapshot-json',
    });
    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].newValue).toBe('contact-snapshot-json');
  });

  it('should include a generated id on each PendingChange', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('address'));
    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].id).toBeTruthy();
    expect(typeof pendingChanges[0].id).toBe('string');
  });

  it('should include requestedAt as ISO-8601 string', () => {
    const before = Date.now();
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest(makePayload('bank'));
    const { pendingChanges } = useHumiProfileStore.getState();
    const ts = new Date(pendingChanges[0].requestedAt).getTime();
    expect(ts).toBeGreaterThanOrEqual(before);
  });

  it('should NOT set sectionKey when payload has no sectionKey', () => {
    const store = useHumiProfileStore.getState();
    store.submitChangeRequest({
      field: 'nickname',
      oldValue: 'เก่า',
      newValue: 'ใหม่',
      effectiveDate: '2026-05-01',
      attachmentIds: [],
      // no sectionKey
    });
    const { pendingChanges } = useHumiProfileStore.getState();
    expect(pendingChanges[0].sectionKey).toBeUndefined();
  });
});
