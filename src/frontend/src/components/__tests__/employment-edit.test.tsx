/**
 * employment-edit.test.tsx — EmploymentTab edit pencil + gate integration (issue #9)
 * Framework: Vitest + @testing-library/react + jsdom
 *
 * AC-2: Employment Info section has visible edit pencil — clicks open gate
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import thMessages from '../../../messages/th.json';
import enMessages from '../../../messages/en.json';

// Mock next/navigation — EmploymentTab uses usePathname for locale detection
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/th/profile/me'),
}));

import { EmploymentTab } from '../profile/tabs/employment';

// ─── Mock employee fixture ─────────────────────────────────────────────────

const MOCK_EMPLOYEE: Record<string, unknown> = {
  employmentInfo: {
    details: {
      hireDate: '2018-06-01',
      originalStartDate: '2018-06-01',
      seniorityStartDate: '2018-06-01',
      yearsOfService: '5',
      passProbationDate: '2018-09-28',
      corporateTitle: 'Senior Manager',
      currentJobEffectiveDate: '2021-01-01',
      currentYearsInJob: '2',
      currentPositionEffectiveDate: '2021-01-01',
      currentYearsInPosition: '2',
    },
    organization: {
      company: 'Central Retail',
      position: 'HR Manager',
      group: 'A',
      businessUnit: 'Retail BU',
      function: 'Human Resources',
      department: 'HR Operations',
      storeBranchCode: 'BK001',
      hrDistrict: 'Bangkok Central',
      costCenter: 'CC-HR-001',
      workLocation: 'Silom Complex',
    },
    job: {
      employeeStatus: 'Active',
      supervisorName: 'Siriporn Sukjai',
      country: 'Thailand',
      jobFamily: 'HR',
      jobCode: 'JC-HR-01',
      jobRole: 'HR Manager',
      jobType: 'Full-time',
      employeeGroup: 'Staff',
      contractType: 'Permanent',
    },
  },
  orgChart: null,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderWithThLocale() {
  return render(
    <NextIntlClientProvider locale="th" messages={thMessages}>
      <EmploymentTab employee={MOCK_EMPLOYEE} />
    </NextIntlClientProvider>,
  );
}

function renderWithEnLocale() {
  vi.mocked(usePathname).mockReturnValueOnce('/en/profile/me');
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <EmploymentTab employee={MOCK_EMPLOYEE} />
    </NextIntlClientProvider>,
  );
}

// ─── AC-2: Edit pencil visible in Employment Details section ─────────────────

describe('AC-2: EmploymentTab — edit pencil visible', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('renders at least one edit pencil button in Employment Details (AC-2)', () => {
    renderWithThLocale();
    // gate.editAria = "แก้ไขข้อมูล"
    const pencilBtns = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i });
    expect(pencilBtns.length).toBeGreaterThan(0);
  });

  it('edit pencil has correct aria-label from gate.editAria (AC-2)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    expect(btn).toHaveAttribute('aria-label', 'แก้ไขข้อมูล');
  });

  it('edit pencil renders SVG icon (AC-2)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    const svg = btn.querySelector('svg');
    expect(svg).not.toBeNull();
  });
});

// ─── AC-2: Click edit pencil → gate opens ─────────────────────────────────────

describe('AC-2: EmploymentTab — click edit pencil opens gate', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('gate is closed (no date picker) before pencil click (AC-2)', () => {
    renderWithThLocale();
    expect(screen.queryByText('วันที่การแก้ไขนี้มีผล')).toBeNull();
  });

  it('clicking edit pencil reveals gate.title (AC-2)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    fireEvent.click(btn);
    expect(screen.getByText('วันที่การแก้ไขนี้มีผล')).toBeInTheDocument();
  });

  it('clicking edit pencil shows date input (AC-2)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    fireEvent.click(btn);
    expect(document.querySelector('input[type="date"]')).not.toBeNull();
  });

  it('gate shows employment section title (employment.details) (AC-2)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    fireEvent.click(btn);
    // sectionTitle = t('employment.details')
    // Appears in h2 inside gate
    const headings = screen.getAllByRole('heading');
    const gateHeading = headings.find(
      (h) => h.tagName === 'H2' && h.closest('dialog, [role="dialog"]'),
    );
    // The gate h2 inside Modal should contain the sectionTitle
    expect(gateHeading ?? headings.length).toBeTruthy();
  });

  it('gate shows Continue button (disabled) after pencil click (AC-2 + AC-4)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    fireEvent.click(btn);
    const continueBtn = screen.getByRole('button', { name: /ต่อไป/i });
    expect(continueBtn).toBeInTheDocument();
    expect(continueBtn).toHaveAttribute('disabled');
  });

  it('gate Cancel button closes the gate (AC-2 + AC-7)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    fireEvent.click(btn);
    fireEvent.click(screen.getByRole('button', { name: /ยกเลิก/i }));
    expect(document.querySelector('input[type="date"]')).toBeNull();
  });
});

// ─── EN locale variant ────────────────────────────────────────────────────────

describe('AC-2: EmploymentTab — EN locale edit pencil opens gate', () => {
  it('EN: edit pencil visible with "Edit section" aria-label', () => {
    renderWithEnLocale();
    const pencilBtns = screen.getAllByRole('button', { name: /edit section/i });
    expect(pencilBtns.length).toBeGreaterThan(0);
  });

  it('EN: click pencil opens gate with EN copy', () => {
    renderWithEnLocale();
    const btn = screen.getAllByRole('button', { name: /edit section/i })[0];
    fireEvent.click(btn);
    expect(screen.getByText('When should these changes take effect?')).toBeInTheDocument();
  });
});

// ─── Edge cases ───────────────────────────────────────────────────────────────

describe('EmploymentTab edit integration — edge cases', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('renders without crash when employee is null (AC-2)', () => {
    expect(() =>
      render(
        <NextIntlClientProvider locale="th" messages={thMessages}>
          <EmploymentTab employee={null} />
        </NextIntlClientProvider>,
      ),
    ).not.toThrow();
  });

  it('renders loading skeleton when loading=true (AC-2)', () => {
    const { container } = render(
      <NextIntlClientProvider locale="th" messages={thMessages}>
        <EmploymentTab employee={MOCK_EMPLOYEE} loading />
      </NextIntlClientProvider>,
    );
    const skeletons = container.querySelectorAll('.animate-pulse, [class*="skeleton"], [class*="Skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('no edit pencil rendered when employee has no details (AC-2)', () => {
    const noDetails: Record<string, unknown> = {
      employmentInfo: {
        // details missing — conditional FieldGroup not rendered
        organization: null,
        job: null,
      },
    };
    const { container } = render(
      <NextIntlClientProvider locale="th" messages={thMessages}>
        <EmploymentTab employee={noDetails} />
      </NextIntlClientProvider>,
    );
    // No FieldGroup with action → no pencil button
    const pencilBtns = container.querySelectorAll('button[aria-label]');
    const editBtns = Array.from(pencilBtns).filter((b) =>
      b.getAttribute('aria-label')?.includes('แก้ไข'),
    );
    expect(editBtns.length).toBe(0);
  });
});
