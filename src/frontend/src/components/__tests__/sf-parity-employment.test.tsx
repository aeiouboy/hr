/**
 * sf-parity-employment.test.tsx — SF UI Parity: Employment & Organization Tabs (issue #7)
 * Framework: Vitest + @testing-library/react + jsdom
 *
 * AC-2: Employment Info tab renders 4 new fields
 *        (originalStartDate, seniorityStartDate, passProbationDate, corporateTitle)
 * AC-3: Organization sub-section renders 4 fields
 *        (storeBranchCode, hrDistrict, costCenter, workLocation)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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
      // existing fields
      hireDate: '2018-06-01',
      yearsOfService: '5',
      currentJobEffectiveDate: '2021-01-01',
      currentYearsInJob: '2',
      currentPositionEffectiveDate: '2021-01-01',
      currentYearsInPosition: '2',
      // AC-2: 4 new SF-equivalent fields
      originalStartDate: '2018-06-01',       // AC-2
      seniorityStartDate: '2018-06-01',      // AC-2
      passProbationDate: '2018-09-28',       // AC-2
      corporateTitle: 'Senior Manager',      // AC-2
    },
    organization: {
      // existing fields
      company: 'Central Retail',
      position: 'HR Manager',
      group: 'A',
      businessUnit: 'Retail BU',
      function: 'Human Resources',
      department: 'HR Operations',
      // AC-3: 4 new organization fields
      storeBranchCode: 'CPN-001',            // AC-3
      hrDistrict: 'Bangkok North',           // AC-3
      costCenter: 'CC-HR-001',               // AC-3
      workLocation: 'CentralWorld HQ',       // AC-3
    },
    job: {
      employeeStatus: 'Active',
      supervisorName: 'Wipada Thongchai',
      country: 'Thailand',
      jobFamily: 'HR',
      jobCode: 'HR-MGR-001',
      jobRole: 'Manager',
      jobType: 'Full-Time',
      employeeGroup: 'A',
      contractType: 'Permanent',
    },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function renderWithTh(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="th" messages={thMessages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

function renderWithEn(ui: React.ReactElement) {
  vi.mocked(usePathname).mockReturnValueOnce('/en/profile/me');
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

// ─── AC-2: 4 new employment detail fields visible ──────────────────────────────

// AC-2: Employment tab renders 4 new SF date/text fields with TH labels
describe('AC-2: EmploymentTab — 4 new employment fields visible (TH locale)', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('renders วันเริ่มงานครั้งแรก label — originalStartDate (AC-2)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('วันเริ่มงานครั้งแรก')).toBeInTheDocument();
  });

  it('renders วันเริ่มนับอายุงาน label — seniorityStartDate (AC-2)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('วันเริ่มนับอายุงาน')).toBeInTheDocument();
  });

  it('renders วันผ่านทดลองงาน label — passProbationDate (AC-2)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('วันผ่านทดลองงาน')).toBeInTheDocument();
  });

  it('renders ตำแหน่งองค์กร label — corporateTitle (AC-2)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('ตำแหน่งองค์กร')).toBeInTheDocument();
  });

  it('all 4 new employment field labels present in one render (AC-2)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    const expectedLabels = [
      'วันเริ่มงานครั้งแรก',
      'วันเริ่มนับอายุงาน',
      'วันผ่านทดลองงาน',
      'ตำแหน่งองค์กร',
    ];
    expectedLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('corporateTitle value "Senior Manager" is visible (AC-2)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('Senior Manager')).toBeInTheDocument();
  });
});

// ─── AC-3: Organization sub-section with 4 retail org fields ──────────────────

// AC-3: Organization sub-section title and 4 retail org fields rendered
describe('AC-3: EmploymentTab — Organization sub-section (TH locale)', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('renders Organization section group heading (AC-3)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    // th.json key employment.organization = "หน่วยงาน"
    expect(screen.queryAllByText(/หน่วยงาน|องค์กร/).length).toBeGreaterThan(0);
  });

  it('renders รหัสสาขา/ร้าน label — storeBranchCode (AC-3)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('รหัสสาขา/ร้าน')).toBeInTheDocument();
  });

  it('renders HR District label — hrDistrict (AC-3)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('HR District')).toBeInTheDocument();
  });

  it('renders ศูนย์ต้นทุน label — costCenter (AC-3)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    // costCenter appears in employment.organization section
    const costCenterLabels = screen.getAllByText('ศูนย์ต้นทุน');
    expect(costCenterLabels.length).toBeGreaterThanOrEqual(1);
  });

  it('renders สถานที่ทำงาน label — workLocation (AC-3)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('สถานที่ทำงาน')).toBeInTheDocument();
  });

  it('all 4 Organization sub-section fields present in one render (AC-3)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('รหัสสาขา/ร้าน')).toBeInTheDocument();
    expect(screen.getByText('HR District')).toBeInTheDocument();
    // getAllByText for costCenter (can appear in multiple sections)
    expect(screen.getAllByText('ศูนย์ต้นทุน').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('สถานที่ทำงาน')).toBeInTheDocument();
  });

  it('storeBranchCode value "CPN-001" is visible (AC-3)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('CPN-001')).toBeInTheDocument();
  });

  it('workLocation value "CentralWorld HQ" is visible (AC-3)', () => {
    renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />);
    expect(screen.getByText('CentralWorld HQ')).toBeInTheDocument();
  });
});

// ─── AC-2 + AC-3: EN locale ────────────────────────────────────────────────────

// AC-2 + AC-3: component renders without error in EN locale
describe('AC-2 + AC-3: EmploymentTab — EN locale does not crash', () => {
  it('renders without error in EN locale (AC-2, AC-3)', () => {
    expect(() => renderWithEn(<EmploymentTab employee={MOCK_EMPLOYEE} />)).not.toThrow();
  });
});

// ─── Edge cases ──────────────────────────────────────────────────────────────

describe('EmploymentTab — edge cases', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('returns null when employee is null', () => {
    const { container } = renderWithTh(<EmploymentTab employee={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders loading skeleton when loading=true', () => {
    const { container } = renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} loading />);
    const skeletons = container.querySelectorAll('.animate-pulse, [class*="skeleton"], [class*="Skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders when orgChart is absent (optional section) (AC-2)', () => {
    // orgChart is optional — should not crash if missing
    expect(() => renderWithTh(<EmploymentTab employee={MOCK_EMPLOYEE} />)).not.toThrow();
  });

  it('AC-2 fields with undefined values do not crash (AC-2)', () => {
    const employeeNoNewFields = {
      ...MOCK_EMPLOYEE,
      employmentInfo: {
        ...(MOCK_EMPLOYEE.employmentInfo as Record<string, unknown>),
        details: {
          hireDate: '2018-06-01',
          yearsOfService: '5',
          // new fields absent
        },
      },
    };
    expect(() => renderWithTh(<EmploymentTab employee={employeeNoNewFields} />)).not.toThrow();
  });

  it('AC-3 org fields with undefined values do not crash (AC-3)', () => {
    const employeeNoOrgFields = {
      ...MOCK_EMPLOYEE,
      employmentInfo: {
        ...(MOCK_EMPLOYEE.employmentInfo as Record<string, unknown>),
        organization: {
          company: 'Central Retail',
          position: 'HR Manager',
          // org parity fields absent
        },
      },
    };
    expect(() => renderWithTh(<EmploymentTab employee={employeeNoOrgFields} />)).not.toThrow();
  });
});
