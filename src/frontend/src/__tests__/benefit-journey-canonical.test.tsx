import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEFAULT_ESS_ACTIONS } from '@/components/humi/QuickActionsTile';

const navigationMocks = vi.hoisted(() => ({
  redirect: vi.fn((href: string) => {
    throw new Error(`NEXT_REDIRECT:${href}`);
  }),
}));

vi.mock('next/navigation', () => ({
  redirect: navigationMocks.redirect,
  usePathname: vi.fn().mockReturnValue('/th/benefits-hub'),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [k: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'th',
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      'benefits.activeEnrollments': 'สวัสดิการที่ใช้งานอยู่',
      'benefits.benefitPlan': 'แผนสวัสดิการ',
      'benefits.coverage': 'ความคุ้มครอง',
      'benefits.effectiveDate': 'วันที่มีผล',
      'benefits.status': 'สถานะ',
      'benefits.active': 'มีผล',
      'benefits.inactive': 'ไม่มีผล',
    };
    return map[key] ?? key;
  },
}));

describe('benefit claim journey canonical route', () => {
  beforeEach(() => {
    vi.resetModules();
    navigationMocks.redirect.mockClear();
    localStorage.clear();
  });

  it('/requests remains a cross-request hub and does not expose a benefit claim start form', async () => {
    const user = userEvent.setup();
    const { default: RequestsPage } = await import('@/app/[locale]/requests/page');

    render(<RequestsPage />);
    await user.click(screen.getByRole('button', { name: 'สร้างคำร้องใหม่' }));

    expect(screen.queryByText('เบิกค่าใช้จ่าย')).not.toBeInTheDocument();
    expect(
      screen.queryByText('ค่ารักษาพยาบาล · ทันตกรรม · น้ำมัน · โทรศัพท์'),
    ).not.toBeInTheDocument();
  });

  it('/benefits-hub claims tab routes to the dedicated reimbursement service', async () => {
    const { useBenefitsStore } = await import('@/stores/humi-benefits-slice');
    useBenefitsStore.getState().setTab('claims');

    const { default: BenefitsHubPage } = await import('@/app/[locale]/benefits-hub/page');
    render(<BenefitsHubPage />);

    const claimStart = screen.getByRole('link', { name: /เบิกสวัสดิการ/ });
    expect(claimStart).toHaveAttribute('href', '/th/benefits-hub/claim');
    expect(screen.queryByRole('button', { name: 'สร้างคำขอเบิก' })).not.toBeInTheDocument();
  });

  it('/benefits-hub presents a Benefit Work Zone with exactly two benefit-owned actions', async () => {
    const { useBenefitsStore } = await import('@/stores/humi-benefits-slice');
    useBenefitsStore.getState().setTab('benefits');

    const { default: BenefitsHubPage } = await import('@/app/[locale]/benefits-hub/page');
    render(<BenefitsHubPage />);

    expect(screen.getByRole('heading', { name: 'ศูนย์รวมสวัสดิการ' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ไม่สบายใช่ไหม? ขอใบส่งตัวเข้าโรงพยาบาล' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'แผนสวัสดิการของคุณ' })).toBeInTheDocument();
    const reimbursementAction = screen.getByRole('link', { name: /เบิกค่ารักษา/ });
    const referralAction = screen.getByRole('link', { name: 'ขอใบส่งตัวตอนนี้' });
    expect(reimbursementAction).toHaveAttribute('href', '/th/benefits-hub/claim?planId=BE-MED-001');
    expect(referralAction).toHaveAttribute('href', '/th/benefits-hub/referral');
    expect(reimbursementAction.querySelector('button')).toBeNull();
    expect(referralAction.querySelector('button')).toBeNull();
    expect(screen.getByRole('button', { name: 'ดูรายละเอียด ค่ารักษาพยาบาล (ผู้ป่วยนอก)' })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: 'สลิปเงินเดือน' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /วางแผนภาษี/ })).not.toBeInTheDocument();
    expect(screen.queryByText(/Payroll\/Tax|เงินเดือนและสวัสดิการ/)).not.toBeInTheDocument();
    expect(screen.queryByText(/EBO|Employee Benefit Obligation/)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'เริ่มลงทะเบียน' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'สมัคร' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'ยกเลิกสมัคร' })).not.toBeInTheDocument();
  });

  it('ESS quick action points benefit claim entry to the Benefits-owned reimbursement route', () => {
    const benefitAction = DEFAULT_ESS_ACTIONS.find((action) => action.labelTh === 'เบิกสวัสดิการ');

    expect(benefitAction?.href).toBe('/th/benefits-hub/reimbursement');
  });

  it('command palette benefit navigation points to Benefits Hub', async () => {
    const { HUMI_COMMANDS } = await import('@/lib/humi-command-registry');
    const benefitCommand = HUMI_COMMANDS.find((command) => command.id === 'benefits');

    expect(benefitCommand?.label).toBe('สวัสดิการ');
    expect(benefitCommand?.route).toBe('/benefits-hub');
  });

  it('benefit route helpers keep one canonical destination per intent', async () => {
    const {
      benefitProfileRoute,
      benefitReimbursementRoute,
      benefitReferralRoute,
      benefitTaxPlanningRoute,
      benefitsHubRoute,
    } = await import('@/lib/benefit-routes');

    expect(benefitProfileRoute('th')).toBe('/th/profile/me?tab=benefits');
    expect(benefitReferralRoute('th')).toBe('/th/benefits-hub/referral');
    expect(benefitTaxPlanningRoute('th')).toBe('/th/payroll/tax-planning');
    expect(benefitsHubRoute('th')).toBe('/th/benefits-hub');
  });

  it('/benefits redirects to the canonical Benefits Hub route', async () => {
    const { default: BenefitsPage } = await import('@/app/[locale]/benefits/page');

    await expect(
      BenefitsPage({ params: Promise.resolve({ locale: 'th' }) } as never),
    ).rejects.toThrow('NEXT_REDIRECT:/th/benefits-hub');
    expect(navigationMocks.redirect).toHaveBeenCalledWith('/th/benefits-hub');
  });

  it('/profile/benefits renders the canonical profile benefits tab without a redirect hop', async () => {
    const { default: ProfileBenefitsPage } = await import('@/app/[locale]/profile/benefits/page');

    const element = ProfileBenefitsPage();

    expect(navigationMocks.redirect).not.toHaveBeenCalled();
    expect(element.props.initialTab).toBe('benefits');
  });

  it('/profile/[tab] legacy profile routes render the canonical profile implementation with tab intent', async () => {
    const { default: ProfileTabPage } = await import('@/app/[locale]/profile/[tab]/page');

    const element = await ProfileTabPage({
      params: Promise.resolve({ locale: 'th', tab: 'employment' }),
    } as never);

    expect(navigationMocks.redirect).not.toHaveBeenCalled();
    expect(element.props.initialTab).toBe('employment');
  });

  it('/employees/me redirects to the canonical personal profile entry', async () => {
    const { default: EmployeeProfilePage } = await import('@/app/[locale]/employees/me/page');

    await expect(
      EmployeeProfilePage({ params: Promise.resolve({ locale: 'th' }) } as never),
    ).rejects.toThrow('NEXT_REDIRECT:/th/profile/me');
    expect(navigationMocks.redirect).toHaveBeenCalledWith('/th/profile/me');
  });

  it('/employees/me/benefits redirects to the profile benefits tab instead of rendering a separate benefits page', async () => {
    const { default: EmployeeBenefitsPage } =
      await import('@/app/[locale]/employees/me/benefits/page');

    await expect(
      EmployeeBenefitsPage({ params: Promise.resolve({ locale: 'th' }) } as never),
    ).rejects.toThrow('NEXT_REDIRECT:/th/profile/me?tab=benefits');
    expect(navigationMocks.redirect).toHaveBeenCalledWith('/th/profile/me?tab=benefits');
  });

  it('/employees/me/payslip redirects salary statements to Profile Employment', async () => {
    const { default: EmployeePayslipPage } =
      await import('@/app/[locale]/employees/me/payslip/page');

    await expect(
      EmployeePayslipPage({ params: Promise.resolve({ locale: 'th' }) } as never),
    ).rejects.toThrow('NEXT_REDIRECT:/th/profile/me?tab=employment#pay-statements');
    expect(navigationMocks.redirect).toHaveBeenCalledWith('/th/profile/me?tab=employment#pay-statements');
  });

  it('/payslip redirects legacy payslip entry to Profile Employment', async () => {
    const { default: LegacyPayslipPage } = await import('@/app/[locale]/payslip/page');

    await expect(
      LegacyPayslipPage({ params: Promise.resolve({ locale: 'th' }) } as never),
    ).rejects.toThrow('NEXT_REDIRECT:/th/profile/me?tab=employment#pay-statements');
    expect(navigationMocks.redirect).toHaveBeenCalledWith('/th/profile/me?tab=employment#pay-statements');
  });

  it('/hospital-referral redirects to the dedicated Benefits Hub referral route', async () => {
    const { default: HospitalReferralPage } = await import('@/app/[locale]/hospital-referral/page');

    await expect(
      HospitalReferralPage({ params: Promise.resolve({ locale: 'th' }) } as never),
    ).rejects.toThrow('NEXT_REDIRECT:/th/benefits-hub/referral');
    expect(navigationMocks.redirect).toHaveBeenCalledWith('/th/benefits-hub/referral');
  });
});
