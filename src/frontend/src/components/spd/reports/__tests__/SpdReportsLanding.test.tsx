import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SpdReportsLanding } from '../SpdReportsLanding';

const messages: Record<string, string> = {
  'chrome.home': 'Home',
  'chrome.benefits': 'Branch Benefits',
  'chrome.reports': 'Reports',
  title: 'SPD Benefits Reports',
  subtitle:
    'Branch-scoped enrollment movement, cost snapshot, and special privilege audit reports.',
  mockNote: 'Scoped to SPD Officer',
  openDetail: 'Open branch detail',
  exportCsv: 'Export CSV',
  exporting: 'Exporting…',
  'reports.movement.title': 'Branch Enrollment Movement',
  'reports.movement.desc': 'Monthly added/removed enrollments across assigned branches.',
  'reports.cost.title': 'Branch Cost Snapshot',
  'reports.cost.desc': 'Estimated benefit cost view by assigned branch.',
  'reports.privilege.title': 'Branch Special Privilege Audit',
  'reports.privilege.desc': 'Audit items for special privilege usage in assigned branches.',
  'tiles.branches': 'Assigned branches',
  'tiles.employees': 'Scoped employees',
  'tiles.enrollments': 'Plan enrollments',
  'tiles.auditItems': 'Privilege audit items',
  'table.branch': 'Branch',
  'table.employees': 'Employees',
  'table.enrollment': 'Enrollment',
  'table.movement': 'Added / removed',
  'table.cost': 'Estimated cost',
  'table.privilege': 'Audit items',
};

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => messages[key] ?? key,
}));

vi.mock('@/hooks/use-spd-branches', () => ({
  useSpdBranches: () => ({
    assignedBranches: ['BKK-Sukhumvit', 'CNX-Central'],
    spdName: 'SPD Officer',
    isLoading: false,
    error: null,
  }),
}));

vi.mock('@/components/humi/DemoValuesDisclaimer', () => ({
  DemoValuesDisclaimer: () => <div>Demo values only</div>,
}));

describe('SpdReportsLanding', () => {
  it('renders three SP-RP cards and branch-scoped rows', () => {
    render(<SpdReportsLanding />);

    expect(screen.getByRole('heading', { name: 'SPD Benefits Reports' })).toBeInTheDocument();
    expect(screen.getAllByText('SP-RP-01')).toHaveLength(2);
    expect(screen.getAllByText('Branch Enrollment Movement')).toHaveLength(2);
    expect(screen.getByText('SP-RP-02')).toBeInTheDocument();
    expect(screen.getByText('Branch Cost Snapshot')).toBeInTheDocument();
    expect(screen.getByText('SP-RP-03')).toBeInTheDocument();
    expect(screen.getByText('Branch Special Privilege Audit')).toBeInTheDocument();
    expect(screen.getByText('BKK-Sukhumvit')).toBeInTheDocument();
    expect(screen.getByText('CNX-Central')).toBeInTheDocument();
    expect(screen.queryByText('BKK-Silom')).not.toBeInTheDocument();
  });

  it('switches the detail metric when a report card is opened', () => {
    render(<SpdReportsLanding />);

    fireEvent.click(screen.getByText('Branch Cost Snapshot'));

    expect(screen.getByRole('columnheader', { name: 'Estimated cost' })).toBeInTheDocument();
  });
});
