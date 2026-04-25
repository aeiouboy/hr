/**
 * profile-dependents.test.tsx — hr#85 BRD #20 DependentsEditor tests
 * Framework: Vitest + jsdom + React Testing Library
 *
 * Covers:
 *   AC-1 — HumiDependent shape has all 9 BRD #20 fields
 *   AC-2 — HUMI_DEPENDENTS has >=3 entries with valid relation codes
 *   AC-3 — DEPENDENT_RELATION_LABELS all Thai-primary
 *   AC-4 — DependentsEditor renders a row per dependent with editable fields
 *   AC-5 — areAllDependentsValid requires fullNameTh + relation + dateOfBirth
 *   AC-6 — onChange called when row field edited
 *   AC-7 — Add row affordance present (even when value=[])
 *
 * Note on AC-4 fullNameTh selector:
 *   DependentsEditor binds value={dep.fullNameTh} on a plain <input type="text">.
 *   getByDisplayValue() matches the current input value — deterministic.
 *
 * Note on AC-7 add button:
 *   Component renders <Button>+ เพิ่มผู้อุปการะ</Button> when !disabled.
 *   With our Button mock that renders a real <button>, textContent check works.
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import {
  DependentsEditor,
  areAllDependentsValid,
} from '@/components/profile/DependentsEditor';
import {
  HUMI_DEPENDENTS,
  DEPENDENT_RELATION_LABELS,
  type HumiDependent,
} from '@/lib/humi-mock-data';

// ── Stub crypto.randomUUID ────────────────────────────────────────────────────
let uuidSeq = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `dep-uuid-${++uuidSeq}`,
});

// ── Mock lucide-react icons ───────────────────────────────────────────────────
vi.mock('lucide-react', () => ({
  Plus: () => <span data-testid="icon-plus" />,
  Trash2: () => <span data-testid="icon-trash" />,
}));

// ── Mock humi UI primitives ───────────────────────────────────────────────────
vi.mock('@/components/humi', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    variant: _v,
    size: _s,
    type: _t,
    ...rest
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: string;
    size?: string;
    type?: string;
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

// ── Mock FileUploadField ──────────────────────────────────────────────────────
vi.mock('@/components/humi/FileUploadField', () => ({
  FileUploadField: ({
    label,
    onUpload: _u,
    onRemove: _r,
  }: {
    label: string;
    onUpload: (id: string) => void;
    onRemove: () => void;
  }) => <div data-testid="file-upload-field">{label}</div>,
}));

// ── Mock @/lib/utils ──────────────────────────────────────────────────────────
vi.mock('@/lib/utils', () => ({
  cn: (...args: unknown[]) =>
    args
      .filter((a) => typeof a === 'string' && a.length > 0)
      .join(' '),
}));

afterEach(() => {
  cleanup();
});

// ════════════════════════════════════════════════════════════════════════════
// AC-1: HumiDependent shape has all 9 BRD #20 fields
// ════════════════════════════════════════════════════════════════════════════

describe('hr#85 BRD #20 — HumiDependent shape', () => {
  it('AC-1 — HUMI_DEPENDENTS[0] has all 9 required fields', () => {
    const dep = HUMI_DEPENDENTS[0];
    expect(dep.id).toBeDefined();
    expect(dep.fullNameTh).toBeTruthy();
    expect(dep.fullNameEn).toBeTruthy();
    expect(dep.relation).toMatch(/^(spouse|father|mother|child|other)$/);
    expect(dep.dateOfBirth).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(typeof dep.hasInsurance).toBe('boolean');
    expect(typeof dep.isCentralEmployee).toBe('boolean');
  });

  it('AC-1 — optional fields (nationalId, idCopyFileId) are string or undefined only', () => {
    HUMI_DEPENDENTS.forEach((dep) => {
      if (dep.nationalId !== undefined) {
        expect(typeof dep.nationalId).toBe('string');
      }
      if (dep.idCopyFileId !== undefined) {
        expect(typeof dep.idCopyFileId).toBe('string');
      }
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-2: HUMI_DEPENDENTS has >=3 entries with valid relation codes
// ════════════════════════════════════════════════════════════════════════════

describe('hr#85 BRD #20 — HUMI_DEPENDENTS data', () => {
  it('AC-2 — has >=3 entries', () => {
    expect(HUMI_DEPENDENTS.length).toBeGreaterThanOrEqual(3);
  });

  it('AC-2 — every entry has a valid DependentRelation code', () => {
    const validRelations = ['spouse', 'father', 'mother', 'child', 'other'];
    HUMI_DEPENDENTS.forEach((dep) => {
      expect(validRelations).toContain(dep.relation);
    });
  });

  it('AC-2 — every entry has a non-empty ISO dateOfBirth', () => {
    HUMI_DEPENDENTS.forEach((dep) => {
      expect(dep.dateOfBirth).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-3: DEPENDENT_RELATION_LABELS all Thai-primary
// ════════════════════════════════════════════════════════════════════════════

describe('hr#85 BRD #20 — DEPENDENT_RELATION_LABELS', () => {
  it('AC-3 — spouse label contains Thai "คู่สมรส"', () => {
    expect(DEPENDENT_RELATION_LABELS.spouse).toMatch(/คู่สมรส/);
  });

  it('AC-3 — father label contains Thai "บิดา"', () => {
    expect(DEPENDENT_RELATION_LABELS.father).toMatch(/บิดา/);
  });

  it('AC-3 — mother label contains Thai "มารดา"', () => {
    expect(DEPENDENT_RELATION_LABELS.mother).toMatch(/มารดา/);
  });

  it('AC-3 — child label contains Thai "บุตร"', () => {
    expect(DEPENDENT_RELATION_LABELS.child).toMatch(/บุตร/);
  });

  it('AC-3 — other label contains Thai "อื่น"', () => {
    expect(DEPENDENT_RELATION_LABELS.other).toMatch(/อื่น/);
  });

  it('AC-3 — all 5 labels contain at least one Thai Unicode character', () => {
    Object.values(DEPENDENT_RELATION_LABELS).forEach((label) => {
      // Thai Unicode block: U+0E00–U+0E7F
      expect(label).toMatch(/[฀-๿]/);
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-4: DependentsEditor renders a row per dependent
// ════════════════════════════════════════════════════════════════════════════

describe('hr#85 BRD #20 — DependentsEditor rendering', () => {
  it('AC-4 — renders one fullNameTh input per dependent', () => {
    render(<DependentsEditor value={HUMI_DEPENDENTS} onChange={vi.fn()} />);
    HUMI_DEPENDENTS.forEach((dep) => {
      // fullNameTh input binds value={dep.fullNameTh}
      const inputs = screen.getAllByDisplayValue(dep.fullNameTh);
      expect(inputs.length).toBeGreaterThan(0);
    });
  });

  it('AC-4 — renders row header labels "ผู้อุปการะ 1", "ผู้อุปการะ 2", "ผู้อุปการะ 3"', () => {
    render(<DependentsEditor value={HUMI_DEPENDENTS} onChange={vi.fn()} />);
    expect(screen.getByText('ผู้อุปการะ 1')).toBeInTheDocument();
    expect(screen.getByText('ผู้อุปการะ 2')).toBeInTheDocument();
    expect(screen.getByText('ผู้อุปการะ 3')).toBeInTheDocument();
  });

  it('AC-4 — each row has a remove (trash) button', () => {
    render(<DependentsEditor value={HUMI_DEPENDENTS} onChange={vi.fn()} />);
    const trashIcons = screen.getAllByTestId('icon-trash');
    expect(trashIcons.length).toBe(HUMI_DEPENDENTS.length);
  });

  it('AC-4 — renders no rows when value is empty array', () => {
    render(<DependentsEditor value={[]} onChange={vi.fn()} />);
    expect(screen.queryByText('ผู้อุปการะ 1')).toBeNull();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-5: areAllDependentsValid validation
// ════════════════════════════════════════════════════════════════════════════

describe('hr#85 BRD #20 — areAllDependentsValid', () => {
  it('AC-5 — returns true for valid HUMI_DEPENDENTS', () => {
    expect(areAllDependentsValid(HUMI_DEPENDENTS)).toBe(true);
  });

  it('AC-5 — returns true for empty array (section optional)', () => {
    expect(areAllDependentsValid([])).toBe(true);
  });

  it('AC-5 — returns false when fullNameTh is empty string', () => {
    const invalid: HumiDependent[] = [{ ...HUMI_DEPENDENTS[0], fullNameTh: '' }];
    expect(areAllDependentsValid(invalid)).toBe(false);
  });

  it('AC-5 — returns false when fullNameTh is whitespace only', () => {
    const invalid: HumiDependent[] = [{ ...HUMI_DEPENDENTS[0], fullNameTh: '   ' }];
    expect(areAllDependentsValid(invalid)).toBe(false);
  });

  it('AC-5 — returns false when dateOfBirth is empty string', () => {
    const noBirth: HumiDependent[] = [{ ...HUMI_DEPENDENTS[0], dateOfBirth: '' }];
    expect(areAllDependentsValid(noBirth)).toBe(false);
  });

  it('AC-5 — returns false when any row in multi-row list is invalid', () => {
    const mixed: HumiDependent[] = [
      HUMI_DEPENDENTS[0],
      { ...HUMI_DEPENDENTS[1], fullNameTh: '' },
    ];
    expect(areAllDependentsValid(mixed)).toBe(false);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-6: onChange fires on field edit
// ════════════════════════════════════════════════════════════════════════════

describe('hr#85 BRD #20 — DependentsEditor onChange', () => {
  it('AC-6 — onChange called when fullNameTh input edited', () => {
    const onChange = vi.fn();
    render(<DependentsEditor value={HUMI_DEPENDENTS} onChange={onChange} />);
    const firstInput = screen.getByDisplayValue(HUMI_DEPENDENTS[0].fullNameTh);
    fireEvent.change(firstInput, { target: { value: 'ชื่อใหม่' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('AC-6 — onChange called with updated fullNameTh value', () => {
    const onChange = vi.fn();
    render(<DependentsEditor value={HUMI_DEPENDENTS} onChange={onChange} />);
    const firstInput = screen.getByDisplayValue(HUMI_DEPENDENTS[0].fullNameTh);
    fireEvent.change(firstInput, { target: { value: 'สมหญิง ใจดี' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    const updated: HumiDependent[] = onChange.mock.calls[0][0];
    expect(updated[0].fullNameTh).toBe('สมหญิง ใจดี');
    // other rows unchanged
    expect(updated[1].fullNameTh).toBe(HUMI_DEPENDENTS[1].fullNameTh);
  });

  it('AC-6 — remove row calls onChange with list minus that row', () => {
    const onChange = vi.fn();
    render(<DependentsEditor value={HUMI_DEPENDENTS} onChange={onChange} />);

    const trashIcons = screen.getAllByTestId('icon-trash');
    const firstTrashBtn = trashIcons[0].closest('button')!;
    fireEvent.click(firstTrashBtn);

    expect(onChange).toHaveBeenCalledTimes(1);
    const result: HumiDependent[] = onChange.mock.calls[0][0];
    expect(result).toHaveLength(HUMI_DEPENDENTS.length - 1);
    // removed row id is not in result
    expect(result.find((r) => r.id === HUMI_DEPENDENTS[0].id)).toBeUndefined();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-7: Add row affordance present
// ════════════════════════════════════════════════════════════════════════════

describe('hr#85 BRD #20 — Add row button', () => {
  it('AC-7 — add button present when value is empty', () => {
    const { container } = render(<DependentsEditor value={[]} onChange={vi.fn()} />);
    const buttons = Array.from(container.querySelectorAll('button'));
    const addButton = buttons.find((b) => /เพิ่ม|Add|\+/.test(b.textContent ?? ''));
    expect(addButton).toBeDefined();
  });

  it('AC-7 — add button text contains "เพิ่มผู้อุปการะ"', () => {
    render(<DependentsEditor value={[]} onChange={vi.fn()} />);
    // Component renders text: "+ เพิ่มผู้อุปการะ"
    expect(screen.getByText(/เพิ่มผู้อุปการะ/)).toBeInTheDocument();
  });

  it('AC-7 — add button NOT rendered when disabled=true', () => {
    render(<DependentsEditor value={[]} onChange={vi.fn()} disabled />);
    expect(screen.queryByText(/เพิ่มผู้อุปการะ/)).toBeNull();
  });

  it('AC-7 — clicking add button calls onChange with one new empty row', () => {
    const onChange = vi.fn();
    render(<DependentsEditor value={[]} onChange={onChange} />);
    fireEvent.click(screen.getByText(/เพิ่มผู้อุปการะ/));

    expect(onChange).toHaveBeenCalledTimes(1);
    const newRows: HumiDependent[] = onChange.mock.calls[0][0];
    expect(newRows).toHaveLength(1);
    expect(newRows[0].fullNameTh).toBe('');
    expect(newRows[0].relation).toBe('other');
    expect(newRows[0].hasInsurance).toBe(false);
    expect(newRows[0].isCentralEmployee).toBe(false);
  });
});
