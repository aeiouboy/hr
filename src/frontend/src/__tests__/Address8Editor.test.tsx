/**
 * Address8Editor.test.tsx
 * AC-2 — Address8 editor: 8 fields render, required-field validation
 *
 * Tests: 8 inputs present, required fields (houseNo/subdistrict/district/province/postalCode),
 * optional fields (village/soi/road) can be empty without failing validation.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Address8Editor, isAddress8Valid } from '@/components/profile/Address8Editor';
import type { Address8 } from '@/stores/humi-profile-slice';

// ── Mock next-intl ─────────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      'address.houseNo':    'บ้านเลขที่',
      'address.village':   'หมู่บ้าน',
      'address.soi':       'ซอย',
      'address.road':      'ถนน',
      'address.subdistrict': 'แขวง/ตำบล',
      'address.district':  'เขต/อำเภอ',
      'address.province':  'จังหวัด',
      'address.postalCode': 'รหัสไปรษณีย์',
    };
    return map[key] ?? key;
  },
}));

// ── Mock humi FormField ────────────────────────────────────────────────────────
vi.mock('@/components/humi', () => ({
  FormField: ({
    children,
    label,
    required: _r,
    className: _c,
  }: {
    children: (props: { id: string }) => React.ReactNode;
    label: React.ReactNode;
    required?: boolean;
    className?: string;
  }) => (
    <div>
      <label>{label}</label>
      {children({ id: `field-${Math.random()}` })}
    </div>
  ),
}));

// ── Mock @/lib/utils ───────────────────────────────────────────────────────────
vi.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

// ── Helpers ────────────────────────────────────────────────────────────────────

function makeEmptyAddress(): Address8 {
  return {
    houseNo: '',
    village: '',
    soi: '',
    road: '',
    subdistrict: '',
    district: '',
    province: '',
    postalCode: '',
  };
}

function makeFullAddress(): Address8 {
  return {
    houseNo: '241',
    village: '',
    soi: '1',
    road: 'สุขุมวิท',
    subdistrict: 'คลองตัน',
    district: 'วัฒนา',
    province: 'กรุงเทพมหานคร',
    postalCode: '10110',
  };
}

// ════════════════════════════════════════════════════════════════════════════
// AC-2: render — 8 text inputs present
// ════════════════════════════════════════════════════════════════════════════

describe('Address8Editor — render', () => {
  it('should render 8 inputs for the 8 address fields', () => {
    render(
      <Address8Editor value={makeEmptyAddress()} onChange={vi.fn()} />
    );
    const inputs = document.querySelectorAll('input[type="text"]');
    expect(inputs.length).toBe(8);
  });

  it('should render label บ้านเลขที่', () => {
    render(
      <Address8Editor value={makeEmptyAddress()} onChange={vi.fn()} />
    );
    expect(screen.getByText('บ้านเลขที่')).toBeTruthy();
  });

  it('should render label แขวง/ตำบล', () => {
    render(
      <Address8Editor value={makeEmptyAddress()} onChange={vi.fn()} />
    );
    expect(screen.getByText('แขวง/ตำบล')).toBeTruthy();
  });

  it('should render label จังหวัด', () => {
    render(
      <Address8Editor value={makeEmptyAddress()} onChange={vi.fn()} />
    );
    expect(screen.getByText('จังหวัด')).toBeTruthy();
  });

  it('should reflect value prop in input fields', () => {
    const addr = makeFullAddress();
    render(<Address8Editor value={addr} onChange={vi.fn()} />);
    const inputs = Array.from(
      document.querySelectorAll('input[type="text"]')
    ) as HTMLInputElement[];
    const values = inputs.map((i) => i.value);
    expect(values).toContain('241');         // houseNo
    expect(values).toContain('คลองตัน');    // subdistrict
    expect(values).toContain('วัฒนา');       // district
    expect(values).toContain('10110');        // postalCode
  });

  it('should call onChange with updated field when houseNo input changes', () => {
    const onChange = vi.fn();
    render(<Address8Editor value={makeEmptyAddress()} onChange={onChange} />);
    const firstInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    fireEvent.change(firstInput, { target: { value: '100' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    // The first field is houseNo
    const updated: Address8 = onChange.mock.calls[0][0];
    expect(updated.houseNo).toBe('100');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-2: isAddress8Valid — validation logic
// ════════════════════════════════════════════════════════════════════════════

describe('isAddress8Valid — unit', () => {
  it('should return true when all 5 required fields are filled', () => {
    expect(isAddress8Valid(makeFullAddress())).toBe(true);
  });

  it('should return false when houseNo is empty', () => {
    expect(isAddress8Valid({ ...makeFullAddress(), houseNo: '' })).toBe(false);
  });

  it('should return false when houseNo is whitespace only', () => {
    expect(isAddress8Valid({ ...makeFullAddress(), houseNo: '   ' })).toBe(false);
  });

  it('should return false when subdistrict is empty', () => {
    expect(isAddress8Valid({ ...makeFullAddress(), subdistrict: '' })).toBe(false);
  });

  it('should return false when district is empty', () => {
    expect(isAddress8Valid({ ...makeFullAddress(), district: '' })).toBe(false);
  });

  it('should return false when province is empty', () => {
    expect(isAddress8Valid({ ...makeFullAddress(), province: '' })).toBe(false);
  });

  it('should return false when postalCode is empty', () => {
    expect(isAddress8Valid({ ...makeFullAddress(), postalCode: '' })).toBe(false);
  });

  it('should return true when optional fields (village/soi/road) are empty', () => {
    const addr = makeFullAddress();
    // village, soi, road are optional — can all be empty
    addr.village = '';
    addr.soi = '';
    addr.road = '';
    expect(isAddress8Valid(addr)).toBe(true);
  });

  it('should return false for completely empty address', () => {
    expect(isAddress8Valid(makeEmptyAddress())).toBe(false);
  });
});
