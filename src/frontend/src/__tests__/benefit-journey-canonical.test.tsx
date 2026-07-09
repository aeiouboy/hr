import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEFAULT_ESS_ACTIONS } from '@/components/humi/molecules/QuickActionsTile';

const navigationMocks = vi.hoisted(() => ({
  redirect: vi.fn((href: string) => {
    throw new Error(`NEXT_REDIRECT:${href}`);
  }),
  useSearchParams: vi.fn(() => new URLSearchParams()),
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
  useSearchParams: navigationMocks.useSearchParams,
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
    navigationMocks.useSearchParams.mockReturnValue(new URLSearchParams());
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

  it('/benefits-hub service catalog routes to the dedicated reimbursement service', async () => {
    const { default: BenefitsHubPage } = await import('@/app/[locale]/benefits-hub/page');
    render(<BenefitsHubPage />);

    const reimbursementService = screen.getByRole('link', {
      name: /เบิกสวัสดิการ เบิกค่ารักษา ตรวจสุขภาพ ค่าเดินทาง และอื่น ๆ ตามวงเงิน/,
    });
    expect(reimbursementService).toHaveAttribute('href', '/th/benefits-hub/reimbursement');
    expect(screen.getByRole('link', { name: 'เริ่มเบิก' })).toHaveAttribute(
      'href',
      '/th/benefits-hub/reimbursement',
    );
    const allowanceLinks = screen.getAllByRole('link');
    expect(allowanceLinks.some((link) => link.getAttribute('href') === '/th/benefits-hub/reimbursement?allowance=ca-medical')).toBe(true);
    expect(allowanceLinks.some((link) => link.getAttribute('href') === '/th/benefits-hub/reimbursement?allowance=ca-dental')).toBe(true);
    expect(allowanceLinks.some((link) => link.getAttribute('href') === '/th/benefits-hub/reimbursement?allowance=ca-phone')).toBe(true);
    expect(allowanceLinks.some((link) => link.getAttribute('href') === '/th/benefits-hub/reimbursement?allowance=ca-fuel')).toBe(true);
    expect(screen.queryByRole('button', { name: 'สร้างคำขอเบิก' })).not.toBeInTheDocument();
  });

  it('/benefits-hub reimbursement maps allowance query into visible STA-73 fields and submitted claim metadata', async () => {
    const user = userEvent.setup();
    navigationMocks.useSearchParams.mockReturnValue(new URLSearchParams('allowance=ca-phone'));
    const { useBenefitClaimsStore } = await import('@/stores/benefit-claims');
    const { useAuthStore } = await import('@/stores/auth-store');
    useBenefitClaimsStore.getState().clear();
    useAuthStore.getState().setUser({
      id: 'spd-test',
      name: 'SPD Test',
      email: 'spd@example.com',
      roles: ['spd'],
    });

    const { default: ReimbursementPage } = await import('@/app/[locale]/benefits-hub/reimbursement/page');
    render(<ReimbursementPage />);

    expect(screen.getByLabelText('สวัสดิการที่เลือก')).toHaveValue('ค่าโทรศัพท์');
    expect(screen.getByLabelText('วงเงินคงเหลือ')).toHaveValue('฿4,800');
    // STA-120: Claim Date is a read-only display (re-encoded into STA-119 config).
    expect(screen.getByLabelText(/วันที่เคลม/)).toHaveAttribute('readonly');
    expect(screen.getByLabelText(/เลขที่ใบเสร็จ\/เอกสาร/)).toBeInTheDocument();
    expect(screen.getByLabelText(/จำนวนเงินตามใบเสร็จ \(บาท\)/)).toBeInTheDocument();
    expect(screen.getByLabelText('ยอดเบิกสุทธิ (บาท)')).toBeInTheDocument();
    expect(screen.getByLabelText('หมายเหตุ')).toBeInTheDocument();

    await user.type(screen.getByLabelText(/เลขที่ใบเสร็จ\/เอกสาร/), 'MOB-2026-001');
    // STA-120: typing Receipt amount auto-mirrors into Total Claim Amount.
    await user.type(screen.getByLabelText(/จำนวนเงินตามใบเสร็จ \(บาท\)/), '799');
    // STA-145: BE-MOB-001 now routes to category 'mobile' → the MOBILE bucket
    // renders the Usage-month LOV (Jan–Dec), NOT the gasoline Claim Type.
    expect(screen.queryByLabelText(/ประเภทการเบิก/)).not.toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText(/เดือนที่ขอเบิก/), 'may');
    await user.type(screen.getByLabelText('หมายเหตุ'), 'ค่าโทรศัพท์เดือนพฤษภาคม');
    await user.click(screen.getByRole('button', { name: 'ส่งคำขอเบิกสวัสดิการ' }));
    // STA-184 — Submit opens a preview; confirm to dispatch the claim.
    await user.click(await screen.findByRole('button', { name: 'ยืนยันส่งคำขอ' }));

    const [claim] = useBenefitClaimsStore.getState().claims;
    expect(claim.benefitType).toBe('mobile');
    expect(claim.benefitCode).toBe('BE-MOB-001');
    expect(claim.benefitName).toBe('ค่าโทรศัพท์');
    expect(claim.receiptNo).toBe('MOB-2026-001');
    expect(claim.receiptAmount).toBe(799);
    expect(claim.totalClaimAmount).toBe(799);
    expect(claim.remainingAmount).toBe(4800);
    expect(claim.dynamicFields).toMatchObject({ realMonthDate: 'may' });
  });

  it('/benefits-hub presents a Benefits Hub service catalog with benefit-owned service routes', async () => {
    const { default: BenefitsHubPage } = await import('@/app/[locale]/benefits-hub/page');
    render(<BenefitsHubPage />);

    expect(screen.getByRole('heading', { name: 'สวัสดิการของคุณ' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'บริการสวัสดิการ' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'วงเงินตามประเภท' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ดูสิทธิ์ในโปรไฟล์' })).toHaveAttribute('href', '/th/profile/me?tab=benefits');
    const reimbursementAction = screen.getByRole('link', {
      name: /เบิกสวัสดิการ เบิกค่ารักษา ตรวจสุขภาพ ค่าเดินทาง และอื่น ๆ ตามวงเงิน/,
    });
    const referralAction = screen.getByRole('link', {
      name: /ขอใบส่งตัว ใบส่งตัว ePatient ก่อนเข้ารับบริการที่โรงพยาบาลในเครือ/,
    });
    expect(reimbursementAction).toHaveAttribute('href', '/th/benefits-hub/reimbursement');
    expect(referralAction).toHaveAttribute('href', '/th/benefits-hub/referral');
    expect(screen.getByRole('link', { name: /เคลมค่ารักษา/ })).toHaveAttribute('href', '/th/benefits-hub/hospital-claim');
    expect(screen.getByRole('link', { name: /ตรวจสุขภาพประจำปี/ })).toHaveAttribute('href', '/th/benefits-hub/physical-checkup');
    expect(screen.getByRole('link', { name: /ประกันชีวิตและอุบัติเหตุ/ })).toHaveAttribute('href', '/th/benefits-hub/life-accident');
    expect(screen.getByRole('link', { name: /ผู้รับผลประโยชน์/ })).toHaveAttribute('href', '/th/benefits-hub/beneficiary');
    expect(reimbursementAction.querySelector('button')).toBeNull();
    expect(referralAction.querySelector('button')).toBeNull();
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
    expect(benefitReimbursementRoute('th', 'ca-medical')).toBe('/th/benefits-hub/reimbursement?allowance=ca-medical');
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

  it('/employees/me/payslip (legacy deep-link) redirects to the standalone /payslip page', async () => {
    const { default: EmployeePayslipPage } =
      await import('@/app/[locale]/employees/me/payslip/page');

    await expect(
      EmployeePayslipPage({ params: Promise.resolve({ locale: 'th' }) } as never),
    ).rejects.toThrow('NEXT_REDIRECT:/th/payslip');
    expect(navigationMocks.redirect).toHaveBeenCalledWith('/th/payslip');
  });

  it('/payslip is a real standalone page (no redirect) and renders pay statements', async () => {
    const { default: PayslipPage } = await import('@/app/[locale]/payslip/page');

    render(<PayslipPage />);

    expect(navigationMocks.redirect).not.toHaveBeenCalled();
    expect(screen.getByTestId('pay-statements')).toBeInTheDocument();
  });

  it('/hospital-referral renders the dedicated referral history and links new requests to Benefits Hub', async () => {
    const { default: HospitalReferralPage } = await import('@/app/[locale]/hospital-referral/page');

    const { container } = render(<HospitalReferralPage />);

    expect(screen.getByRole('heading', { level: 1, name: /ขอใบส่งตัว|Hospital Referral/i })).toBeInTheDocument();
    expect(container.querySelector('a[href="/th/benefits-hub/referral"]')).toBeTruthy();
  });
});
