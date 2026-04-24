/**
 * BankDetailsEditor.test.tsx
 * AC-4 — Bank section: bankCode dropdown, digits-only accountNo, holderName, validation
 *
 * Tests: render inputs, select bankCode, digits-only filter on accountNo,
 * isBankValid boundary conditions (10/11/12 digit valid; 9 or 13 invalid).
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BankDetailsEditor, isBankValid } from '@/components/profile/BankDetailsEditor';
import type { BankDetails } from '@/stores/humi-profile-slice';

// ── Mock next-intl ─────────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      'bank.code':      'ธนาคาร',
      'bank.accountNo': 'เลขบัญชี',
      'bank.holder':    'ชื่อบัญชี',
      'bank.attachment': 'สำเนาสมุดบัญชี',
      'validation.accountNo': 'เลขบัญชี 10-12 หลัก',
    };
    return map[key] ?? key;
  },
}));

// ── Mock humi UI primitives ────────────────────────────────────────────────────
vi.mock('@/components/humi', () => ({
  FormField: ({
    children,
    label,
    required: _r,
    error: _e,
  }: {
    children: (props: { id: string }) => React.ReactNode;
    label: React.ReactNode;
    required?: boolean;
    error?: string;
  }) => (
    <div>
      <label>{label}</label>
      {children({ id: `field-${Math.random()}` })}
    </div>
  ),
}));

// ── Mock FileUploadField ───────────────────────────────────────────────────────
vi.mock('@/components/humi/FileUploadField', () => ({
  FileUploadField: ({ label }: { label?: React.ReactNode }) => (
    <div data-testid="file-upload-field">{label}</div>
  ),
}));

// ── Mock @/lib/utils ───────────────────────────────────────────────────────────
vi.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

// ── Helpers ────────────────────────────────────────────────────────────────────

function makeEmptyBank(): BankDetails {
  return {
    bankCode: '',
    accountNo: '',
    holderName: '',
    bookAttachmentId: null,
  };
}

function makeValidBank(): BankDetails {
  return {
    bankCode: 'KBANK',
    accountNo: '1234567890',   // 10 digits
    holderName: 'นาย เคน ทาน',
    bookAttachmentId: null,
  };
}

// ════════════════════════════════════════════════════════════════════════════
// AC-4: render — dropdown + inputs present
// ════════════════════════════════════════════════════════════════════════════

describe('BankDetailsEditor — render', () => {
  it('should render bankCode dropdown', () => {
    render(<BankDetailsEditor value={makeEmptyBank()} onChange={vi.fn()} />);
    const select = document.querySelector('select') as HTMLSelectElement;
    expect(select).toBeTruthy();
  });

  it('should render accountNo text input', () => {
    render(<BankDetailsEditor value={makeEmptyBank()} onChange={vi.fn()} />);
    const inputs = document.querySelectorAll('input[type="text"]');
    // At least one text input (accountNo + holderName)
    expect(inputs.length).toBeGreaterThanOrEqual(1);
  });

  it('should show label ธนาคาร', () => {
    render(<BankDetailsEditor value={makeEmptyBank()} onChange={vi.fn()} />);
    expect(screen.getByText('ธนาคาร')).toBeTruthy();
  });

  it('should show label เลขบัญชี', () => {
    render(<BankDetailsEditor value={makeEmptyBank()} onChange={vi.fn()} />);
    expect(screen.getByText('เลขบัญชี')).toBeTruthy();
  });

  it('should show label ชื่อบัญชี', () => {
    render(<BankDetailsEditor value={makeEmptyBank()} onChange={vi.fn()} />);
    expect(screen.getByText('ชื่อบัญชี')).toBeTruthy();
  });

  it('should render KBANK as an option in bankCode dropdown', () => {
    render(<BankDetailsEditor value={makeEmptyBank()} onChange={vi.fn()} />);
    const kbankOption = screen.getByText('กสิกรไทย');
    expect(kbankOption).toBeTruthy();
  });

  it('should call onChange with selected bankCode when dropdown changes', () => {
    const onChange = vi.fn();
    render(<BankDetailsEditor value={makeEmptyBank()} onChange={onChange} />);
    const select = document.querySelector('select') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'KBANK' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    const updated: BankDetails = onChange.mock.calls[0][0];
    expect(updated.bankCode).toBe('KBANK');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-4: digits-only filter on accountNo
// ════════════════════════════════════════════════════════════════════════════

describe('BankDetailsEditor — digits-only accountNo filter', () => {
  it('should strip non-digits when typing letters in accountNo', () => {
    const onChange = vi.fn();
    render(<BankDetailsEditor value={makeEmptyBank()} onChange={onChange} />);
    // First text input is accountNo (inputMode="numeric")
    const accountInput = document.querySelector('input[inputmode="numeric"]') as HTMLInputElement;
    expect(accountInput).toBeTruthy();
    fireEvent.change(accountInput, { target: { value: 'abc123' } });
    const updated: BankDetails = onChange.mock.calls[0][0];
    expect(updated.accountNo).toBe('123');
  });

  it('should pass through digits-only input unchanged', () => {
    const onChange = vi.fn();
    render(<BankDetailsEditor value={makeEmptyBank()} onChange={onChange} />);
    const accountInput = document.querySelector('input[inputmode="numeric"]') as HTMLInputElement;
    fireEvent.change(accountInput, { target: { value: '1234567890' } });
    const updated: BankDetails = onChange.mock.calls[0][0];
    expect(updated.accountNo).toBe('1234567890');
  });

  it('should strip Thai characters from accountNo', () => {
    const onChange = vi.fn();
    render(<BankDetailsEditor value={makeEmptyBank()} onChange={onChange} />);
    const accountInput = document.querySelector('input[inputmode="numeric"]') as HTMLInputElement;
    fireEvent.change(accountInput, { target: { value: 'กข123' } });
    const updated: BankDetails = onChange.mock.calls[0][0];
    expect(updated.accountNo).toBe('123');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-4: isBankValid — boundary conditions
// ════════════════════════════════════════════════════════════════════════════

describe('isBankValid — unit', () => {
  it('should return true for valid 10-digit accountNo', () => {
    expect(isBankValid(makeValidBank())).toBe(true);
  });

  it('should return true for valid 11-digit accountNo', () => {
    expect(isBankValid({ ...makeValidBank(), accountNo: '12345678901' })).toBe(true);
  });

  it('should return true for valid 12-digit accountNo', () => {
    expect(isBankValid({ ...makeValidBank(), accountNo: '123456789012' })).toBe(true);
  });

  it('should return false for 9-digit accountNo (too short)', () => {
    expect(isBankValid({ ...makeValidBank(), accountNo: '123456789' })).toBe(false);
  });

  it('should return false for 13-digit accountNo (too long)', () => {
    expect(isBankValid({ ...makeValidBank(), accountNo: '1234567890123' })).toBe(false);
  });

  it('should return false for empty accountNo', () => {
    expect(isBankValid({ ...makeValidBank(), accountNo: '' })).toBe(false);
  });

  it('should return false for empty bankCode', () => {
    expect(isBankValid({ ...makeValidBank(), bankCode: '' })).toBe(false);
  });

  it('should return false for empty holderName', () => {
    expect(isBankValid({ ...makeValidBank(), holderName: '' })).toBe(false);
  });

  it('should return false for whitespace-only holderName', () => {
    expect(isBankValid({ ...makeValidBank(), holderName: '   ' })).toBe(false);
  });

  it('should return false for completely empty bank details', () => {
    expect(isBankValid(makeEmptyBank())).toBe(false);
  });

  it('should return true with all valid SCB bank details', () => {
    expect(isBankValid({ bankCode: 'SCB', accountNo: '0123456789', holderName: 'สมศรี', bookAttachmentId: null })).toBe(true);
  });
});
