/**
 * reason-modal.test.tsx
 * AC-2 invariant — ReasonModal approve/reject validation + interaction.
 *
 * Tests:
 *   1. approve mode + empty reason → confirm button ENABLED
 *   2. reject mode + empty reason → confirm button DISABLED
 *   3. reject mode + whitespace-only reason → confirm still DISABLED
 *   4. reject mode + non-empty reason → confirm ENABLED
 *   5. confirm (approve) → calls adminApproveWithReason with trimmed reason or undefined
 *   6. cancel → calls onClose prop
 *   7. open→close→open resets reason state (useEffect dependency)
 */

import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useHumiProfileStore } from '@/stores/humi-profile-slice';

// ── next-intl mock ────────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// ── humi primitive stubs ──────────────────────────────────────────────────────
vi.mock('@/components/humi/Modal', () => ({
  Modal: ({
    open,
    children,
    title,
    onClose,
  }: {
    open: boolean;
    children: React.ReactNode;
    title: string;
    onClose: () => void;
  }) =>
    open ? (
      <div role="dialog" aria-label={title} data-testid="modal">
        <button aria-label="modal-close-bg" onClick={onClose} />
        {children}
      </div>
    ) : null,
}));

vi.mock('@/components/humi/Button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    variant,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      data-testid={variant === 'primary' ? 'confirm-btn' : 'cancel-btn'}
    >
      {children}
    </button>
  ),
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
      {children({ id: 'field-reason' })}
    </div>
  ),
}));

// ── UUID stub ─────────────────────────────────────────────────────────────────
let uuidCounter = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `uuid-rm-${++uuidCounter}`,
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

// ── Import component AFTER mocks ──────────────────────────────────────────────
import { ReasonModal } from '@/components/admin/change-requests/ReasonModal';

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

function seedPendingChange(): string {
  return useHumiProfileStore.getState().submitChangeRequest({
    field: 'ชื่อ',
    oldValue: 'เดิม',
    newValue: 'ใหม่',
    effectiveDate: '2026-05-01',
    attachmentIds: [],
    sectionKey: 'personal',
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
// AC-2: confirm button enable/disable logic
// ═════════════════════════════════════════════════════════════════════════════

describe('confirm button state — approve mode', () => {
  it('Test 1: approve mode + empty reason → confirm ENABLED', () => {
    const onClose = vi.fn();
    const changeId = seedPendingChange();

    render(<ReasonModal open={true} mode="approve" changeId={changeId} onClose={onClose} />);

    const confirmBtn = screen.getByTestId('confirm-btn');
    expect(confirmBtn).not.toBeDisabled();
  });
});

describe('confirm button state — reject mode', () => {
  it('Test 2: reject mode + empty reason → confirm DISABLED', () => {
    const onClose = vi.fn();
    const changeId = seedPendingChange();

    render(<ReasonModal open={true} mode="reject" changeId={changeId} onClose={onClose} />);

    const confirmBtn = screen.getByTestId('confirm-btn');
    expect(confirmBtn).toBeDisabled();
  });

  it('Test 3: reject mode + whitespace-only reason → confirm still DISABLED', () => {
    const onClose = vi.fn();
    const changeId = seedPendingChange();

    render(<ReasonModal open={true} mode="reject" changeId={changeId} onClose={onClose} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '   ' } });

    const confirmBtn = screen.getByTestId('confirm-btn');
    expect(confirmBtn).toBeDisabled();
  });

  it('Test 4: reject mode + non-empty reason → confirm ENABLED', () => {
    const onClose = vi.fn();
    const changeId = seedPendingChange();

    render(<ReasonModal open={true} mode="reject" changeId={changeId} onClose={onClose} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'เอกสารไม่ครบ' } });

    const confirmBtn = screen.getByTestId('confirm-btn');
    expect(confirmBtn).not.toBeDisabled();
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// AC-2: confirm actually calls store action
// ═════════════════════════════════════════════════════════════════════════════

describe('confirm interaction', () => {
  it('Test 5: approve confirm → adminApproveWithReason called; store status=approved + trimmed reason', () => {
    const onClose = vi.fn();
    const changeId = seedPendingChange();

    render(<ReasonModal open={true} mode="approve" changeId={changeId} onClose={onClose} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '  ผ่านแล้ว  ' } });

    act(() => {
      fireEvent.click(screen.getByTestId('confirm-btn'));
    });

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges.find((pc) => pc.id === changeId)!;
    expect(change.status).toBe('approved');
    // trimmed: 'ผ่านแล้ว'
    expect(change.reason).toBe('ผ่านแล้ว');

    // onClose called after confirm
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('Test 5b: approve confirm with EMPTY reason → adminApproveWithReason called with undefined', () => {
    const onClose = vi.fn();
    const changeId = seedPendingChange();

    render(<ReasonModal open={true} mode="approve" changeId={changeId} onClose={onClose} />);

    // leave reason empty (default '')
    act(() => {
      fireEvent.click(screen.getByTestId('confirm-btn'));
    });

    const { pendingChanges } = useHumiProfileStore.getState();
    const change = pendingChanges.find((pc) => pc.id === changeId)!;
    expect(change.status).toBe('approved');
    expect(change.reason).toBeUndefined();
    expect(onClose).toHaveBeenCalledOnce();
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// AC-2: cancel
// ═════════════════════════════════════════════════════════════════════════════

describe('cancel interaction', () => {
  it('Test 6: clicking cancel calls onClose prop', () => {
    const onClose = vi.fn();
    const changeId = seedPendingChange();

    render(<ReasonModal open={true} mode="approve" changeId={changeId} onClose={onClose} />);

    act(() => {
      fireEvent.click(screen.getByTestId('cancel-btn'));
    });

    expect(onClose).toHaveBeenCalledOnce();
  });
});

// ═════════════════════════════════════════════════════════════════════════════
// AC-2: reason resets when modal reopens
// ═════════════════════════════════════════════════════════════════════════════

describe('reason reset on reopen', () => {
  it('Test 7: open → type reason → close → reopen → textarea value is empty', () => {
    const onClose = vi.fn();
    const changeId = seedPendingChange();

    const { rerender } = render(
      <ReasonModal open={true} mode="reject" changeId={changeId} onClose={onClose} />
    );

    // Type some reason
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'เหตุผลเดิม' } });
    expect(textarea).toHaveValue('เหตุผลเดิม');

    // Close modal (open=false)
    rerender(
      <ReasonModal open={false} mode="reject" changeId={changeId} onClose={onClose} />
    );

    // Reopen (open=true) → useEffect fires → reason reset to ''
    act(() => {
      rerender(
        <ReasonModal open={true} mode="reject" changeId={changeId} onClose={onClose} />
      );
    });

    const textareaAfterReopen = screen.getByRole('textbox');
    expect(textareaAfterReopen).toHaveValue('');
  });
});
