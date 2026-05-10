import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { useBenefitClaimsStore } from '@/stores/benefit-claims';
import { useBenefitReferralsStore } from '@/stores/benefit-referrals';
import { useBenefitTaxPlanningStore } from '@/stores/benefit-tax-planning';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/requests'),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn() }),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'th',
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => <a href={href} {...props}>{children}</a>,
}));

describe('deferred benefit service request projection', () => {
  beforeEach(() => {
    localStorage.clear();
    useBenefitClaimsStore.getState().clear();
    useBenefitReferralsStore.getState().clear();
    useBenefitTaxPlanningStore.getState().clear();
  });

  it('/requests shows reimbursement and referral rows from domain selectors without tax review rows', async () => {
    useBenefitClaimsStore.getState().submitClaim({
      employeeId: 'EMP001',
      employeeName: 'จงรักษ์ ทานากะ',
      benefitType: 'medical',
      receiptNo: 'RC-REF-001',
      receiptDate: '2026-04-30',
      receiptAmount: 1200,
      totalClaimAmount: 1200,
      hospitalName: 'Bangkok Hospital',
      attachments: [{ id: 'a1', filename: 'receipt.pdf', sizeMb: 1 }],
    });
    const referral = useBenefitReferralsStore.getState().createReferral({
      employeeId: 'EMP001',
      employeeName: 'จงรักษ์ ทานากะ',
      coveredPersonId: 'EMP001',
      hospitalId: 'HOSP-BDMS',
      serviceReason: 'พบแพทย์เฉพาะทาง',
      preferredVisitDate: '2026-05-10',
    });
    useBenefitReferralsStore.getState().submitReferral(referral.id);
    useBenefitTaxPlanningStore.getState().saveDraft({ expectedAdditionalIncome: 10000 });

    const { default: RequestsPage } = await import('@/app/[locale]/requests/page');
    render(<RequestsPage />);

    expect(screen.getByText(/เบิกสวัสดิการ · ค่ารักษาพยาบาล/)).toBeInTheDocument();
    expect(screen.getByText(/RC-REF-001/)).toBeInTheDocument();
    expect(screen.getByText('ขอใบส่งตัว · ePatient referral')).toBeInTheDocument();
    expect(screen.getByText(/โรงพยาบาลกรุงเทพ/)).toBeInTheDocument();
    expect(screen.queryByText(/วางแผนภาษี/)).not.toBeInTheDocument();
  });

  it('/requests projects submitted tax planning rows safely and omits pre-submit cancellations', async () => {
    const preSubmit = useBenefitTaxPlanningStore.getState().saveDraft({ expectedAdditionalIncome: 10000 });
    useBenefitTaxPlanningStore.getState().estimateDraft(preSubmit.id);
    useBenefitTaxPlanningStore.getState().cancelTaxPlanningReview(preSubmit.id);

    const submitted = useBenefitTaxPlanningStore.getState().saveDraft({ expectedAdditionalIncome: 25000 });
    useBenefitTaxPlanningStore.getState().estimateDraft(submitted.id);
    const payrollReview = useBenefitTaxPlanningStore.getState().submitTaxPlanningForPayrollReview(submitted.id);

    const { default: RequestsPage } = await import('@/app/[locale]/requests/page');
    render(<RequestsPage />);

    expect(screen.getByText('วางแผนภาษี · Payroll review')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(payrollReview.workflowRequestId))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'วางแผนภาษี · Payroll review' })).toHaveAttribute('href', '/th/payroll/tax-planning');
    expect(screen.getByText(/X-XXXX-XXXXX-01-X/)).toBeInTheDocument();
    expect(screen.queryByText('1100100001001')).not.toBeInTheDocument();
    expect(screen.queryByText(/allowances/i)).not.toBeInTheDocument();
    expect(screen.queryByText(preSubmit.workflowRequestId)).not.toBeInTheDocument();
  });

  it('/requests keeps tax planning rows stable when claim and referral stores mutate independently', async () => {
    const submitted = useBenefitTaxPlanningStore.getState().saveDraft({ expectedAdditionalIncome: 32000 });
    useBenefitTaxPlanningStore.getState().estimateDraft(submitted.id);
    const payrollReview = useBenefitTaxPlanningStore.getState().submitTaxPlanningForPayrollReview(submitted.id);

    const { default: RequestsPage } = await import('@/app/[locale]/requests/page');
    render(<RequestsPage />);

    expect(screen.getByText(new RegExp(payrollReview.workflowRequestId))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'วางแผนภาษี · Payroll review' })).toHaveAttribute('href', '/th/payroll/tax-planning');

    act(() => {
      useBenefitClaimsStore.getState().submitClaim({
        employeeId: 'EMP001',
        employeeName: 'จงรักษ์ ทานากะ',
        benefitType: 'medical',
        receiptNo: 'RC-STABLE-001',
        receiptDate: '2026-05-01',
        receiptAmount: 900,
        totalClaimAmount: 900,
        hospitalName: 'Samitivej',
        attachments: [{ id: 'stable-a1', filename: 'receipt.pdf', sizeMb: 1 }],
      });
      const referral = useBenefitReferralsStore.getState().createReferral({
        employeeId: 'EMP001',
        employeeName: 'จงรักษ์ ทานากะ',
        coveredPersonId: 'EMP001',
        hospitalId: 'HOSP-BDMS',
        serviceReason: 'ติดตามอาการ',
        preferredVisitDate: '2026-05-12',
      });
      useBenefitReferralsStore.getState().submitReferral(referral.id);
      useBenefitClaimsStore.getState().clear();
      useBenefitReferralsStore.getState().clear();
    });

    expect(screen.getByText(new RegExp(payrollReview.workflowRequestId))).toBeInTheDocument();
    expect(screen.getByText(/X-XXXX-XXXXX-01-X/)).toBeInTheDocument();
    expect(screen.queryByText('RC-STABLE-001')).not.toBeInTheDocument();
  });
});
