/**
 * ContactArrayEditor.test.tsx
 * AC-3 — Contact Info: multi-value Phone[]/Email[] primary-flag invariant
 *
 * Tests: one primary always, can't remove last primary, add row, setPrimary flips,
 * phone/email format validation via isContactArrayValid.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  ContactArrayEditor,
  isContactArrayValid,
} from '@/components/profile/ContactArrayEditor';
import type { PhoneEntry, EmailEntry } from '@/stores/humi-profile-slice';

// ── Mock next-intl ─────────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      'contact.addPhone':   'เพิ่มเบอร์โทร',
      'contact.addEmail':   'เพิ่มอีเมล',
      'contact.primary':    'หลัก',
      'validation.required':      'กรุณากรอกข้อมูล',
      'validation.invalidPhone':  'เบอร์โทรไม่ถูกต้อง',
      'validation.invalidEmail':  'อีเมลไม่ถูกต้อง',
    };
    return map[key] ?? key;
  },
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
    error: _e,
  }: {
    children: (props: { id: string }) => React.ReactNode;
    label: React.ReactNode;
    error?: string;
  }) => (
    <div>
      <label>{label}</label>
      {children({ id: `field-${Math.random()}` })}
    </div>
  ),
}));

// ── Mock lucide-react ──────────────────────────────────────────────────────────
vi.mock('lucide-react', () => ({
  Plus: () => <span data-testid="icon-plus" />,
  Trash2: () => <span data-testid="icon-trash" />,
}));

// ── Mock @/lib/utils ───────────────────────────────────────────────────────────
vi.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

// ── Helpers ────────────────────────────────────────────────────────────────────

function phone(value: string, primary = false): PhoneEntry {
  return { value, primary };
}

function email(value: string, primary = false): EmailEntry {
  return { value, primary };
}

// ════════════════════════════════════════════════════════════════════════════
// AC-3: Phone kind — render + primary invariant
// ════════════════════════════════════════════════════════════════════════════

describe('ContactArrayEditor — phone kind', () => {
  it('should render 1 row with remove disabled when only 1 primary phone', () => {
    render(
      <ContactArrayEditor
        kind="phone"
        value={[phone('0811111111', true)]}
        onChange={vi.fn()}
      />
    );
    const removeBtn = document.querySelector('[data-testid="icon-trash"]')?.closest('button');
    expect(removeBtn).toBeTruthy();
    expect(removeBtn!.disabled).toBe(true);
  });

  it('should call onChange with 2 rows when add button clicked', () => {
    const onChange = vi.fn();
    render(
      <ContactArrayEditor
        kind="phone"
        value={[phone('0811111111', true)]}
        onChange={onChange}
      />
    );
    const addBtn = screen.getByText('เพิ่มเบอร์โทร');
    fireEvent.click(addBtn);
    expect(onChange).toHaveBeenCalledTimes(1);
    const result: PhoneEntry[] = onChange.mock.calls[0][0] as PhoneEntry[];
    expect(result).toHaveLength(2);
    expect(result[1].primary).toBe(false);
  });

  it('should set only one primary when setPrimary is called on row 2', () => {
    const onChange = vi.fn();
    const rows = [phone('0811111111', true), phone('0822222222', false)];
    render(
      <ContactArrayEditor kind="phone" value={rows} onChange={onChange} />
    );
    // Find the second radio input and change it
    const radios = document.querySelectorAll('input[type="radio"]');
    expect(radios.length).toBe(2);
    fireEvent.click(radios[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    const updated: PhoneEntry[] = onChange.mock.calls[0][0] as PhoneEntry[];
    // Exactly one primary
    const primaries = updated.filter((r) => r.primary);
    expect(primaries).toHaveLength(1);
    expect(primaries[0].value).toBe('0822222222');
  });

  it('should disable remove button only for the primary row when 2 rows exist', () => {
    const rows = [phone('0811111111', true), phone('0822222222', false)];
    render(
      <ContactArrayEditor kind="phone" value={rows} onChange={vi.fn()} />
    );
    const trashIcons = document.querySelectorAll('[data-testid="icon-trash"]');
    const btn0 = trashIcons[0]?.closest('button') as HTMLButtonElement;
    const btn1 = trashIcons[1]?.closest('button') as HTMLButtonElement;
    // Primary row (0) remove disabled; non-primary row (1) remove enabled
    expect(btn0.disabled).toBe(true);
    expect(btn1.disabled).toBe(false);
  });

  it('should remove non-primary row when its remove button is clicked', () => {
    const onChange = vi.fn();
    const rows = [phone('0811111111', true), phone('0822222222', false)];
    render(
      <ContactArrayEditor kind="phone" value={rows} onChange={onChange} />
    );
    const trashIcons = document.querySelectorAll('[data-testid="icon-trash"]');
    const removeBtn = trashIcons[1]?.closest('button') as HTMLButtonElement;
    fireEvent.click(removeBtn);

    expect(onChange).toHaveBeenCalledTimes(1);
    const result: PhoneEntry[] = onChange.mock.calls[0][0] as PhoneEntry[];
    expect(result).toHaveLength(1);
    expect(result[0].value).toBe('0811111111');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-3: Email kind — same invariant
// ════════════════════════════════════════════════════════════════════════════

describe('ContactArrayEditor — email kind', () => {
  it('should render with 1 primary email row', () => {
    render(
      <ContactArrayEditor
        kind="email"
        value={[email('test@example.com', true)]}
        onChange={vi.fn()}
      />
    );
    const input = document.querySelector('input[type="email"]') as HTMLInputElement;
    expect(input.value).toBe('test@example.com');
  });

  it('should disable remove when only 1 email', () => {
    render(
      <ContactArrayEditor
        kind="email"
        value={[email('test@example.com', true)]}
        onChange={vi.fn()}
      />
    );
    const trashBtn = document.querySelector('[data-testid="icon-trash"]')?.closest('button') as HTMLButtonElement;
    expect(trashBtn.disabled).toBe(true);
  });

  it('should call onChange with 2 rows when add email clicked', () => {
    const onChange = vi.fn();
    render(
      <ContactArrayEditor
        kind="email"
        value={[email('test@example.com', true)]}
        onChange={onChange}
      />
    );
    const addBtn = screen.getByText('เพิ่มอีเมล');
    fireEvent.click(addBtn);
    const result: EmailEntry[] = onChange.mock.calls[0][0] as EmailEntry[];
    expect(result).toHaveLength(2);
  });

  it('should flip primary from row 1 to row 2 when row 2 radio clicked', () => {
    const onChange = vi.fn();
    const rows = [
      email('first@example.com', true),
      email('second@example.com', false),
    ];
    render(<ContactArrayEditor kind="email" value={rows} onChange={onChange} />);
    const radios = document.querySelectorAll('input[type="radio"]');
    fireEvent.click(radios[1]);

    const updated: EmailEntry[] = onChange.mock.calls[0][0] as EmailEntry[];
    const primaries = updated.filter((r) => r.primary);
    expect(primaries).toHaveLength(1);
    expect(primaries[0].value).toBe('second@example.com');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-3: isContactArrayValid — phone validation
// ════════════════════════════════════════════════════════════════════════════

describe('isContactArrayValid — phone', () => {
  it('should return false for empty array', () => {
    expect(isContactArrayValid([], 'phone')).toBe(false);
  });

  it('should return false when no primary', () => {
    expect(isContactArrayValid([phone('0812345678', false)], 'phone')).toBe(false);
  });

  it('should return false for phone shorter than 9 digits', () => {
    expect(isContactArrayValid([phone('01234567', true)], 'phone')).toBe(false);
  });

  it('should return false for phone with letters', () => {
    expect(isContactArrayValid([phone('abc1234567', true)], 'phone')).toBe(false);
  });

  it('should return true for valid 10-digit phone with primary', () => {
    expect(isContactArrayValid([phone('0812345678', true)], 'phone')).toBe(true);
  });

  it('should return true for valid 9-digit phone with primary', () => {
    expect(isContactArrayValid([phone('081234567', true)], 'phone')).toBe(true);
  });

  it('should return false when one phone in array is invalid', () => {
    const rows = [phone('0812345678', true), phone('abc', false)];
    expect(isContactArrayValid(rows, 'phone')).toBe(false);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-3: isContactArrayValid — email validation
// ════════════════════════════════════════════════════════════════════════════

describe('isContactArrayValid — email', () => {
  it('should return false for empty array', () => {
    expect(isContactArrayValid([], 'email')).toBe(false);
  });

  it('should return false for email without @', () => {
    expect(isContactArrayValid([email('notanemail', true)], 'email')).toBe(false);
  });

  it('should return false for email without domain', () => {
    expect(isContactArrayValid([email('test@', true)], 'email')).toBe(false);
  });

  it('should return true for valid email with primary', () => {
    expect(isContactArrayValid([email('ken@central.co.th', true)], 'email')).toBe(true);
  });

  it('should return false when no primary in email list', () => {
    expect(isContactArrayValid([email('ken@central.co.th', false)], 'email')).toBe(false);
  });
});
