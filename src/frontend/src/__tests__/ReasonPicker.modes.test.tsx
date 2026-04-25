/**
 * ReasonPicker.modes.test.tsx
 * AC-3: ReasonPicker mode='ess-voluntary' แสดงเฉพาะ 4 RESIGN_* codes
 *       mode='admin' (default) ยังแสดง 17 TERM_* codes ครบ
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReasonPicker } from '@/components/admin/lifecycle/ReasonPicker';

// ════════════════════════════════════════════════════════════════════════════
// AC-3: mode='ess-voluntary' แสดงเฉพาะ 4 RESIGN_* codes
// ════════════════════════════════════════════════════════════════════════════

describe('AC-3: ReasonPicker mode="ess-voluntary" แสดงเฉพาะ 4 RESIGN_* codes', () => {
  it('AC-3: mode="ess-voluntary" ต้องแสดง option ทั้งหมด 4 ตัว (ไม่นับ placeholder)', () => {
    render(
      <ReasonPicker
        event="5597"
        mode="ess-voluntary"
        value={null}
        onChange={() => {}}
      />,
    );

    const select = screen.getByRole('combobox');
    // options = placeholder + 4 RESIGN_* codes
    const options = Array.from(select.querySelectorAll('option'));
    const realOptions = options.filter((o) => o.value !== '');
    // AC-3: ต้องได้ 4 codes เท่านั้น
    expect(realOptions).toHaveLength(4);
  });

  it('AC-3: 4 options ต้องเป็น RESIGN_PERSONAL, RESIGN_STUDY, RESIGN_FAMILY, RESIGN_OTHER', () => {
    render(
      <ReasonPicker
        event="5597"
        mode="ess-voluntary"
        value={null}
        onChange={() => {}}
      />,
    );

    const select = screen.getByRole('combobox');
    const values = Array.from(select.querySelectorAll('option'))
      .filter((o) => o.value !== '')
      .map((o) => o.value);

    expect(values).toContain('RESIGN_PERSONAL');
    expect(values).toContain('RESIGN_STUDY');
    expect(values).toContain('RESIGN_FAMILY');
    expect(values).toContain('RESIGN_OTHER');
  });

  it('AC-3: mode="ess-voluntary" ต้องไม่มี TERM_* admin codes ใน options', () => {
    render(
      <ReasonPicker
        event="5597"
        mode="ess-voluntary"
        value={null}
        onChange={() => {}}
      />,
    );

    const select = screen.getByRole('combobox');
    const values = Array.from(select.querySelectorAll('option'))
      .filter((o) => o.value !== '')
      .map((o) => o.value);

    const hasAdminCode = values.some((v) => v.startsWith('TERM_'));
    // AC-3: ต้องไม่มี involuntary termination codes เลย (system invariant)
    expect(hasAdminCode).toBe(false);
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-3: mode='admin' (default) ยังคง 17 TERM_* codes
// ════════════════════════════════════════════════════════════════════════════

describe('AC-3: ReasonPicker mode="admin" (default) แสดง 17 TERM_* codes', () => {
  it('AC-3: mode ไม่ระบุ (default) event="5597" ต้องแสดง 17 options', () => {
    render(
      <ReasonPicker
        event="5597"
        value={null}
        onChange={() => {}}
      />,
    );

    const select = screen.getByRole('combobox');
    const realOptions = Array.from(select.querySelectorAll('option')).filter(
      (o) => o.value !== '',
    );
    // AC-3: admin mode ต้อง 17 codes (ไม่ใช่ 4)
    expect(realOptions).toHaveLength(17);
  });

  it('AC-3: mode="admin" ต้องไม่มี RESIGN_* codes (ESS voluntary codes ห้ามโผล่ใน admin view)', () => {
    render(
      <ReasonPicker
        event="5597"
        mode="admin"
        value={null}
        onChange={() => {}}
      />,
    );

    const select = screen.getByRole('combobox');
    const values = Array.from(select.querySelectorAll('option'))
      .filter((o) => o.value !== '')
      .map((o) => o.value);

    const hasEssCode = values.some((v) => v.startsWith('RESIGN_'));
    expect(hasEssCode).toBe(false);
  });
});
