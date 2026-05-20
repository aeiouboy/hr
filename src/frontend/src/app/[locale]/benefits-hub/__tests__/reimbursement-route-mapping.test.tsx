import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

const submitClaim = vi.fn();
const navigationMocks = vi.hoisted(() => ({
  useSearchParams: vi.fn(),
  usePathname: vi.fn().mockReturnValue('/th/benefits-hub/reimbursement'),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), forward: vi.fn(), refresh: vi.fn() }),
}));

vi.mock('next/navigation', () => navigationMocks);

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode; [k: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'th',
}));

vi.mock('@/components/humi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/components/humi')>();

  return {
    ...actual,
    Capability: ({ children }: { children: ReactNode }) => <>{children}</>,
  };
});

vi.mock('@/stores/benefit-claims', () => ({
  useBenefitClaimsStore: (selector: (state: unknown) => unknown) => selector({ submitClaim }),
}));

describe('benefits-hub reimbursement route mapping', () => {
  beforeEach(() => {
    cleanup();
    submitClaim.mockClear();
    submitClaim.mockReturnValue({ id: 'claim-test-1', workflowRequestId: 'workflow-test-1' });
    navigationMocks.useSearchParams.mockReturnValue(new URLSearchParams());
  });

  it('maps ca-medical allowance to BE-MED-001 and preselects medical plan', async () => {
    navigationMocks.useSearchParams.mockReturnValue(new URLSearchParams('allowance=ca-medical'));
    const { default: ReimbursementPage } = await import('@/app/[locale]/benefits-hub/reimbursement/page');

    render(<ReimbursementPage />);

    expect(screen.getByLabelText(/สวัสดิการที่เลือก/)).toHaveValue('ค่ารักษาพยาบาล (ผู้ป่วยนอก)');
  });

  it('maps ca-phone allowance to synthetic BE-MOB-001 and submits with mobile benefitType', async () => {
    navigationMocks.useSearchParams.mockReturnValue(new URLSearchParams('allowance=ca-phone'));
    const user = userEvent.setup();
    const { default: ReimbursementPage } = await import('@/app/[locale]/benefits-hub/reimbursement/page');

    render(<ReimbursementPage />);

    expect(screen.getByLabelText(/สวัสดิการที่เลือก/)).toHaveValue('ค่าโทรศัพท์');
    await user.type(await screen.findByLabelText(/เลขที่ใบเสร็จ/), 'RC-0002');
    await user.type(screen.getByLabelText(/วันที่ใบเสร็จ/), '2026-05-19');
    await user.type(screen.getByLabelText(/จำนวนเงินตามใบเสร็จ/), '1000');
    await user.type(screen.getByLabelText(/ยอดเบิกสุทธิ/), '1000');
    await user.click(screen.getByRole('button', { name: 'ส่งคำขอเบิกสวัสดิการ' }));

    expect(submitClaim).toHaveBeenCalledWith(
      expect.objectContaining({
        benefitCode: 'BE-MOB-001',
        benefitType: 'mobile',
        remainingAmount: 4800,
        receiptNo: 'RC-0002',
        receiptAmount: 1000,
        totalClaimAmount: 1000,
        claimDate: expect.any(String),
      }),
    );
  });

  it('renders required reimbursement-visible fields', async () => {
    const { default: ReimbursementPage } = await import('@/app/[locale]/benefits-hub/reimbursement/page');
    render(<ReimbursementPage />);

    expect(await screen.findByLabelText(/วันที่เคลม/)).toBeInTheDocument();
    expect(screen.getByLabelText(/วงเงินคงเหลือ/)).toBeInTheDocument();
    expect(screen.getByLabelText(/จำนวนเงินตามใบเสร็จ/)).toBeInTheDocument();
    expect(screen.getByLabelText(/ยอดเบิกสุทธิ/)).toBeInTheDocument();
    expect(screen.getByLabelText(/หมายเหตุ/)).toBeInTheDocument();
  });
});
