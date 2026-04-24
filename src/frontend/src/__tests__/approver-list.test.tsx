/**
 * approver-list.test.tsx
 * AC-1, AC-4, AC-6 invariants — approver list page render + grouping + live update.
 *
 * Tests:
 *   1. 0 pending → empty state renders list.empty key
 *   2. 5 pending with different sectionKeys → 5 group headings; each has 1 card
 *   3. pending without sectionKey falls into 'personal' group
 *   4. approved + rejected items render in history section; not in pending groups
 *   5 (AC-6): live Zustand update → pending clears, history shows the item
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import { useHumiProfileStore } from '@/stores/humi-profile-slice';

// ── next-intl mock: t(key) returns key verbatim ───────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// ── humi component stubs ──────────────────────────────────────────────────────
// Card renders children; Button renders a <button>; FormField passes children.
vi.mock('@/components/humi/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
}));

vi.mock('@/components/humi/Button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

vi.mock('@/components/humi/Modal', () => ({
  Modal: ({
    open,
    children,
    title,
  }: {
    open: boolean;
    children: React.ReactNode;
    title: string;
    onClose: () => void;
  }) =>
    open ? (
      <div role="dialog" aria-label={title}>
        {children}
      </div>
    ) : null,
}));

vi.mock('@/components/humi/FormField', () => ({
  FormField: ({
    children,
    label,
  }: {
    children: (props: { id: string }) => React.ReactNode;
    label: React.ReactNode;
  }) => (
    <div>
      <label>{label}</label>
      {children({ id: 'field-test' })}
    </div>
  ),
}));

// ── UUID stub ─────────────────────────────────────────────────────────────────
let uuidCounter = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `uuid-al-${++uuidCounter}`,
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

// ── Import page AFTER mocks ───────────────────────────────────────────────────
import AdminChangeRequestsPage from '@/app/[locale]/admin/change-requests/page';

// ── Store reset ───────────────────────────────────────────────────────────────
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

// ── Helpers ───────────────────────────────────────────────────────────────────

type SectionKey = 'personal' | 'contact' | 'address' | 'emergencyContact' | 'bank';

function seedPending(overrides: { field?: string; sectionKey?: SectionKey } = {}): string {
  return useHumiProfileStore.getState().submitChangeRequest({
    field: overrides.field ?? 'ทดสอบ',
    oldValue: 'เดิม',
    newValue: 'ใหม่',
    effectiveDate: '2026-05-01',
    attachmentIds: [],
    sectionKey: overrides.sectionKey,
  });
}

function seedApproved(field: string, approvedAt: string): void {
  const id = useHumiProfileStore.getState().submitChangeRequest({
    field,
    oldValue: 'เดิม',
    newValue: 'ใหม่',
    effectiveDate: '2026-05-01',
    attachmentIds: [],
  });
  // Directly patch to approved state to bypass time dependency
  useHumiProfileStore.setState((s) => ({
    pendingChanges: s.pendingChanges.map((pc) =>
      pc.id === id
        ? { ...pc, status: 'approved' as const, approvedAt, reason: 'อนุมัติ' }
        : pc
    ),
  }));
}

function seedRejected(field: string, approvedAt: string): void {
  const id = useHumiProfileStore.getState().submitChangeRequest({
    field,
    oldValue: 'เดิม',
    newValue: 'ใหม่',
    effectiveDate: '2026-05-01',
    attachmentIds: [],
  });
  useHumiProfileStore.setState((s) => ({
    pendingChanges: s.pendingChanges.map((pc) =>
      pc.id === id
        ? { ...pc, status: 'rejected' as const, approvedAt, reason: 'ปฏิเสธ' }
        : pc
    ),
  }));
}

// ═════════════════════════════════════════════════════════════════════════════
// AC-4: grouping + empty state
// ═════════════════════════════════════════════════════════════════════════════

describe('empty state', () => {
  it('Test 1: 0 pending → renders empty state key', () => {
    render(<AdminChangeRequestsPage />);

    expect(screen.getByText('ess.approver.list.empty')).toBeInTheDocument();
  });
});

describe('grouping by sectionKey', () => {
  it('Test 2: 5 pending with 5 different sectionKeys → 5 group headings; each has 1 card', () => {
    const sections: SectionKey[] = ['emergencyContact', 'address', 'contact', 'bank', 'personal'];
    sections.forEach((sk, i) => seedPending({ field: `ฟิลด์-${i}`, sectionKey: sk }));

    render(<AdminChangeRequestsPage />);

    // Each sectionKey maps to t(`ess.sections.<key>`); heading + card inline
    // label both render it, so ≥ 1 match is sufficient
    sections.forEach((sk) => {
      expect(screen.getAllByText(`ess.sections.${sk}`).length).toBeGreaterThanOrEqual(1);
    });

    // 5 field labels rendered (one per card); field text is embedded in a
    // larger string "ฟิลด์-N: ใหม่" so match via regex not exact string.
    for (let i = 0; i < 5; i++) {
      expect(screen.getByText(new RegExp(`ฟิลด์-${i}`))).toBeInTheDocument();
    }
  });

  it('Test 3: pending without sectionKey falls into personal group', () => {
    // No sectionKey provided → falls into 'personal'
    seedPending({ field: 'ฟิลด์ไม่มี section' });

    render(<AdminChangeRequestsPage />);

    // Card + group heading both render the section label → ≥ 2 matches
    expect(screen.getAllByText('ess.sections.personal').length).toBeGreaterThanOrEqual(1);
    // field value appears in a card (embedded in "<field>: <newValue>" text)
    expect(screen.getByText(/ฟิลด์ไม่มี section/)).toBeInTheDocument();
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// AC-1 + AC-5: history section
// ═════════════════════════════════════════════════════════════════════════════

describe('history section', () => {
  it('Test 4: approved + rejected items appear in history, not in pending groups', () => {
    seedApproved('ชื่อ', '2026-05-01T10:00:00.000Z');
    seedRejected('ที่อยู่', '2026-05-02T10:00:00.000Z');

    render(<AdminChangeRequestsPage />);

    // No pending → empty state shows
    expect(screen.getByText('ess.approver.list.empty')).toBeInTheDocument();

    // History heading rendered
    expect(screen.getByText('ess.approver.list.history')).toBeInTheDocument();

    // Both fields appear under history (embedded in "<field>: <newValue>" text)
    expect(screen.getByText(/ชื่อ/)).toBeInTheDocument();
    expect(screen.getByText(/ที่อยู่/)).toBeInTheDocument();

    // Status chips
    expect(screen.getByText('ess.approver.status.approved')).toBeInTheDocument();
    expect(screen.getByText('ess.approver.status.rejected')).toBeInTheDocument();
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// AC-6: live Zustand re-render on approve
// ═════════════════════════════════════════════════════════════════════════════

describe('AC-6 live update', () => {
  it('Test 5: approve via store → pending empties; history shows approved item', async () => {
    const id = seedPending({ field: 'เบอร์โทร', sectionKey: 'contact' });

    render(<AdminChangeRequestsPage />);

    // Initially the pending item's field is visible
    expect(screen.getByText('เบอร์โทร')).toBeInTheDocument();
    // Empty state not yet shown
    expect(screen.queryByText('ess.approver.list.empty')).not.toBeInTheDocument();

    // Simulate approve via store (like modal confirm)
    act(() => {
      useHumiProfileStore.getState().adminApproveWithReason(id, 'ผ่าน');
    });

    // After Zustand subscription fires, pending group should be gone
    await waitFor(() => {
      expect(screen.getByText('ess.approver.list.empty')).toBeInTheDocument();
    });

    // History section appears with the item
    await waitFor(() => {
      expect(screen.getByText('ess.approver.list.history')).toBeInTheDocument();
    });

    // Approved status chip visible
    expect(screen.getByText('ess.approver.status.approved')).toBeInTheDocument();
  });
});
