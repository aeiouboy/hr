/**
 * EmergencyContactList.test.tsx
 * AC-1 — Emergency Contact section: add/remove rows, validation
 *
 * Tests multi-row editor: add row, remove row, name/relation/phone validation.
 * Uses @testing-library/react + fireEvent (no userEvent — deterministic).
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  EmergencyContactList,
  isRowValid,
  areAllRowsValid,
} from '@/components/profile/EmergencyContactList';
import type { EmergencyContactRow } from '@/stores/humi-profile-slice';

// ── Mock next-intl ─────────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Mock lucide-react icons ────────────────────────────────────────────────────
vi.mock('lucide-react', () => ({
  Plus: () => <span data-testid="icon-plus" />,
  Trash2: () => <span data-testid="icon-trash" />,
}));

// ── Mock humi UI primitives ────────────────────────────────────────────────────
vi.mock('@/components/humi', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    variant: _v,
    size: _s,
    ...rest
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: string;
    size?: string;
  }) => (
    <button onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  ),
  FormField: ({
    children,
    label,
    required: _r,
  }: {
    children: (props: { id: string; 'aria-describedby'?: string }) => React.ReactNode;
    label: React.ReactNode;
    required?: boolean;
  }) => (
    <div>
      <label>{label}</label>
      {children({ id: 'input-mock' })}
    </div>
  ),
}));

// ── Mock ContactArrayEditor ───────────────────────────────────────────────────
vi.mock('@/components/profile/ContactArrayEditor', () => ({
  ContactArrayEditor: ({
    value,
    onChange,
    kind,
  }: {
    value: Array<{ value: string; primary: boolean }>;
    onChange: (v: Array<{ value: string; primary: boolean }>) => void;
    kind: string;
  }) => (
    <div data-testid={`contact-array-${kind}`}>
      {value.map((v, i) => (
        <input
          key={i}
          data-testid={`contact-input-${kind}-${i}`}
          value={v.value}
          onChange={(e) => {
            const updated = value.map((row, idx) =>
              idx === i ? { ...row, value: e.target.value } : row
            );
            onChange(updated);
          }}
        />
      ))}
    </div>
  ),
  isContactArrayValid: vi.fn().mockReturnValue(true),
}));

// ── Mock @/lib/utils ───────────────────────────────────────────────────────────
vi.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

// ── Stub crypto.randomUUID ─────────────────────────────────────────────────────
let uuidSeq = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `ec-uuid-${++uuidSeq}`,
});

// ── Helper: build a valid EmergencyContactRow ──────────────────────────────────
function makeRow(overrides: Partial<EmergencyContactRow> = {}): EmergencyContactRow {
  return {
    id: `test-${++uuidSeq}`,
    name: 'สมศรี มีสุข',
    relation: 'มารดา',
    phones: ['0812345678'],
    ...overrides,
  };
}

// ════════════════════════════════════════════════════════════════════════════
// AC-1: render with 0 rows — add button visible
// ════════════════════════════════════════════════════════════════════════════

describe('EmergencyContactList — 0 rows', () => {
  it('should render add button when list is empty', () => {
    render(<EmergencyContactList value={[]} onChange={vi.fn()} />);
    // Component calls t('emergencyContact.add') — mock returns the key verbatim
    const addBtn = screen.getByText(/emergencyContact\.add/i);
    expect(addBtn).toBeTruthy();
  });

  it('should call onChange with one new row when add button clicked', () => {
    const onChange = vi.fn();
    render(<EmergencyContactList value={[]} onChange={onChange} />);
    const addBtn = screen.getByText(/emergencyContact\.add/i);
    fireEvent.click(addBtn);
    expect(onChange).toHaveBeenCalledTimes(1);
    const newRows: EmergencyContactRow[] = onChange.mock.calls[0][0];
    expect(newRows).toHaveLength(1);
    expect(newRows[0].name).toBe('');
    expect(newRows[0].relation).toBe('');
    expect(newRows[0].phones).toEqual([]);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-1: render with existing rows + remove
// ════════════════════════════════════════════════════════════════════════════

describe('EmergencyContactList — with rows', () => {
  it('should render one row when value has one entry', () => {
    const row = makeRow({ id: 'row-1' });
    render(<EmergencyContactList value={[row]} onChange={vi.fn()} />);
    // The row name input should appear somewhere in the DOM
    const nameInputs = document.querySelectorAll('input[type="text"]');
    expect(nameInputs.length).toBeGreaterThanOrEqual(1);
  });

  it('should call onChange without the removed row when trash is clicked', () => {
    const row1 = makeRow({ id: 'row-keep' });
    const row2 = makeRow({ id: 'row-remove', name: 'สมชาย ใจดี' });
    const onChange = vi.fn();
    render(<EmergencyContactList value={[row1, row2]} onChange={onChange} />);

    const trashButtons = document.querySelectorAll('[data-testid="icon-trash"]');
    // Click parent button of the second trash icon
    const trashBtn = trashButtons[1]?.closest('button');
    expect(trashBtn).toBeTruthy();
    fireEvent.click(trashBtn!);

    expect(onChange).toHaveBeenCalledTimes(1);
    const result: EmergencyContactRow[] = onChange.mock.calls[0][0];
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('row-keep');
  });

  it('should pass updated name through onChange when name field is edited', () => {
    const row = makeRow({ id: 'row-edit', name: '' });
    const onChange = vi.fn();
    render(<EmergencyContactList value={[row]} onChange={onChange} />);

    const nameInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'พ่อ มีสุข' } });

    expect(onChange).toHaveBeenCalled();
    const updated: EmergencyContactRow[] = onChange.mock.calls[0][0];
    expect(updated[0].name).toBe('พ่อ มีสุข');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-1 validators: isRowValid + areAllRowsValid
// ════════════════════════════════════════════════════════════════════════════

describe('isRowValid — unit', () => {
  it('should return true for a complete valid row', () => {
    const row = makeRow();
    expect(isRowValid(row)).toBe(true);
  });

  it('should return false when name is empty', () => {
    expect(isRowValid(makeRow({ name: '' }))).toBe(false);
  });

  it('should return false when name is whitespace only', () => {
    expect(isRowValid(makeRow({ name: '   ' }))).toBe(false);
  });

  it('should return false when relation is empty', () => {
    expect(isRowValid(makeRow({ relation: '' }))).toBe(false);
  });

  it('should return false when phones array is empty', () => {
    expect(isRowValid(makeRow({ phones: [] }))).toBe(false);
  });

  it('should return false when phone number is too short (< 9 digits)', () => {
    expect(isRowValid(makeRow({ phones: ['012345'] }))).toBe(false);
  });

  it('should return true when phone is exactly 9 digits', () => {
    expect(isRowValid(makeRow({ phones: ['081234567'] }))).toBe(true);
  });

  it('should return true when phone is exactly 10 digits', () => {
    expect(isRowValid(makeRow({ phones: ['0812345678'] }))).toBe(true);
  });

  it('should return false when one phone in array is invalid', () => {
    expect(isRowValid(makeRow({ phones: ['0812345678', '123'] }))).toBe(false);
  });
});

describe('areAllRowsValid — unit', () => {
  it('should return true for empty rows array (optional section)', () => {
    expect(areAllRowsValid([])).toBe(true);
  });

  it('should return true when all rows are valid', () => {
    expect(areAllRowsValid([makeRow(), makeRow()])).toBe(true);
  });

  it('should return false when any row is invalid', () => {
    expect(areAllRowsValid([makeRow(), makeRow({ name: '' })])).toBe(false);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// primaryFlag invariant — BRD #19
// ════════════════════════════════════════════════════════════════════════════

describe('EmergencyContactList — primaryFlag invariant', () => {
  it('adding first row to empty list sets primaryFlag:true', () => {
    const onChange = vi.fn();
    render(<EmergencyContactList value={[]} onChange={onChange} />);
    const addBtn = screen.getByText(/emergencyContact\.add/i);
    fireEvent.click(addBtn);
    const newRows: EmergencyContactRow[] = onChange.mock.calls[0][0];
    expect(newRows[0].primaryFlag).toBe(true);
  });

  it('adding second row sets primaryFlag:false on new row', () => {
    const row1 = makeRow({ id: 'r1', primaryFlag: true });
    const onChange = vi.fn();
    render(<EmergencyContactList value={[row1]} onChange={onChange} />);
    const addBtn = screen.getByText(/emergencyContact\.add/i);
    fireEvent.click(addBtn);
    const newRows: EmergencyContactRow[] = onChange.mock.calls[0][0];
    expect(newRows).toHaveLength(2);
    expect(newRows[1].primaryFlag).toBe(false);
    expect(newRows[0].primaryFlag).toBe(true); // first row stays primary
  });

  it('toggling primary on row 2 sets row2=true, row1=false', () => {
    const row1 = makeRow({ id: 'r1', primaryFlag: true });
    const row2 = makeRow({ id: 'r2', primaryFlag: false });
    const onChange = vi.fn();
    render(<EmergencyContactList value={[row1, row2]} onChange={onChange} />);
    const radios = document.querySelectorAll('input[type="radio"]');
    expect(radios.length).toBe(2);
    fireEvent.click(radios[1]); // click second row's radio
    const updated: EmergencyContactRow[] = onChange.mock.calls[0][0];
    expect(updated[0].primaryFlag).toBe(false);
    expect(updated[1].primaryFlag).toBe(true);
  });

  it('removing primary row promotes first remaining row', () => {
    const row1 = makeRow({ id: 'r1', primaryFlag: true });
    const row2 = makeRow({ id: 'r2', primaryFlag: false });
    const onChange = vi.fn();
    render(<EmergencyContactList value={[row1, row2]} onChange={onChange} />);
    const trashBtns = document.querySelectorAll('[data-testid="icon-trash"]');
    const firstTrash = trashBtns[0]?.closest('button');
    expect(firstTrash).toBeTruthy();
    fireEvent.click(firstTrash!);
    const updated: EmergencyContactRow[] = onChange.mock.calls[0][0];
    expect(updated).toHaveLength(1);
    expect(updated[0].id).toBe('r2');
    expect(updated[0].primaryFlag).toBe(true);
  });

  it('cannot remove the last row (button disabled)', () => {
    const row = makeRow({ id: 'r1', primaryFlag: true });
    const onChange = vi.fn();
    render(<EmergencyContactList value={[row]} onChange={onChange} />);
    const trashBtn = document.querySelector('[data-testid="icon-trash"]')?.closest('button');
    expect(trashBtn).toBeTruthy();
    expect(trashBtn!.disabled).toBe(true);
  });
});
