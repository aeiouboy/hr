import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  useBenefitClaimsStore,
  type BenefitClaimDraftInput,
} from '@/stores/benefit-claims';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/requests'),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn() }),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'th',
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      pending: 'รออนุมัติ',
      approved: 'อนุมัติแล้ว',
      rejected: 'ไม่อนุมัติ',
      noRequests: 'ไม่มีคำร้อง',
      recentHistory: 'ประวัติล่าสุด',
      pendingCount: 'รายการรอดำเนินการ',
      totalCount: 'รายการทั้งหมด',
    };
    return map[key] ?? key;
  },
}));

const claimInput: BenefitClaimDraftInput = {
  employeeId: 'EMP001',
  employeeName: 'จงรักษ์ ทานากะ',
  company: 'Central Group',
  businessUnit: 'Retail HR',
  employeeGroup: 'Monthly-paid',
  personalGrade: 'PG4',
  benefitType: 'medical',
  benefitCode: 'MED-OPD',
  benefitName: 'Medical reimbursement',
  remainingAmount: 18000,
  receiptNo: 'RC-UI-001',
  receiptDate: '2026-04-29',
  receiptAmount: 1500,
  claimAmount: 1500,
  hospitalType: 'OPD',
  hospitalName: 'Bangkok Hospital',
  diseaseDetails: 'ไข้หวัด',
  attachments: [{ id: 'att-1', name: 'receipt.pdf', extension: '.pdf', sizeMb: 1 }],
};

describe('benefit workflow surfaces', () => {
  beforeEach(() => {
    localStorage.clear();
    useBenefitClaimsStore.setState({ claims: [] });
  });

  it('/requests renders submitted benefit claims from the benefit projection', async () => {
    useBenefitClaimsStore.getState().submitClaim(claimInput);
    const { default: RequestsPage } = await import('@/app/[locale]/requests/page');

    render(<RequestsPage />);

    expect(screen.getByText(/เบิกสวัสดิการ · ค่ารักษาพยาบาล/)).toBeInTheDocument();
    expect(screen.getByText(/RC-UI-001/)).toBeInTheDocument();
  });

  // NOTE: /spd/inbox removed per [[unified-approval-inbox]] memory rule —
  // SPD persona uses /quick-approve unified inbox via Smart Tabs Watching tab
  // (PR-B v2 STA-28). Route deleted; sidebar entry merged into 'คำขอรออนุมัติ'.

  it('/admin/benefits renders read-only admin, reporting and deferred payment surfaces', async () => {
    useBenefitClaimsStore.getState().submitClaim(claimInput);
    const { default: AdminBenefitsPage } = await import('@/app/[locale]/admin/benefits/page');

    render(<AdminBenefitsPage />);

    expect(screen.getByRole('heading', { name: /Benefits governance/ })).toBeInTheDocument();
    expect(screen.getAllByText('Benefit master data').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Eligibility rules').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Benefit Special Privilege and EBO reporting').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Approval workflow and cutoff schedule').length).toBeGreaterThan(0);
    expect(screen.getByText('CSV export shape preview')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export CSV (จำลอง)' })).toBeEnabled();
    expect(screen.getByRole('link', { name: /ส่งบัญชี \(Payment\)/ })).toHaveAttribute('href', '/th/admin/benefits/payment');
    expect(screen.getByRole('link', { name: /สร้างไฟล์ธนาคาร \(Payment\)/ })).toHaveAttribute('href', '/th/admin/benefits/payment');
  });
});
