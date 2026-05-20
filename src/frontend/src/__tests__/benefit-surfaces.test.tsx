import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BenefitClaimsInbox } from '@/components/workflow/BenefitClaimsInbox';
import { useBenefitClaimsStore, type BenefitClaimSubmitInput } from '@/stores/benefit-claims';

vi.mock('next-intl', () => ({
  useLocale: () => 'th',
}));

const input: BenefitClaimSubmitInput = {
  employeeId: 'EMP001',
  employeeName: 'จงรักษ์ ทานากะ',
  company: 'Central Group',
  businessUnit: 'Head Office',
  employeeGroup: 'Monthly Staff',
  personalGrade: 'PG4',
  benefitCode: 'MED-OPD',
  benefitName: 'Medical reimbursement',
  claimType: 'medical',
  receiptNo: 'RX-4488',
  receiptDate: '2026-04-20',
  receiptAmount: 1200,
  claimAmount: 1200,
  remainingAmount: 24000,
  hospitalType: 'private',
  hospitalName: 'BNH Hospital',
  opdIpd: 'OPD',
  diseaseDetails: 'Migraine',
  attachments: [{ id: 'a1', filename: 'receipt.pdf', mimeType: 'application/pdf', size: 1000 }],
};

describe('benefit workflow/admin surfaces', () => {
  beforeEach(() => {
    localStorage.clear();
    useBenefitClaimsStore.getState().clear();
  });

  it('SPD inbox renders pending benefit claims and supports send-back', async () => {
    const user = userEvent.setup();
    useBenefitClaimsStore.getState().submitClaim(input);

    render(<BenefitClaimsInbox />);

    expect(screen.getByText('สวัสดิการรอ SPD ตรวจสอบ')).toBeInTheDocument();
    expect(screen.getByText(/REQ-BEN-/)).toBeInTheDocument();
    await user.type(screen.getByLabelText('เหตุผล (จำเป็นเมื่อปฏิเสธหรือส่งกลับ)'), 'แนบเอกสารเพิ่ม');
    await user.click(screen.getByRole('button', { name: 'ส่งกลับแก้ไข' }));

    expect(useBenefitClaimsStore.getState().claims[0].status).toBe('send_back');
  });

  it('admin benefits route renders read-only configuration, reporting, payment, and deferred BE user management', async () => {
    useBenefitClaimsStore.getState().submitClaim(input);
    const { default: AdminBenefitsPage } = await import('@/app/[locale]/admin/benefits/page');

    render(<AdminBenefitsPage />);

    expect(screen.getByText('Benefit master data')).toBeInTheDocument();
    expect(screen.getByRole('note', { name: 'Demo values disclaimer' })).toHaveTextContent('Demo values are illustrative until backend integration.');
    expect(screen.getByText('Eligibility rules')).toBeInTheDocument();
    expect(screen.getByText('Benefit Special Privilege and EBO reporting')).toBeInTheDocument();
    expect(screen.getByText('Amount rules')).toBeInTheDocument();
    expect(screen.getByText('Field configuration')).toBeInTheDocument();
    expect(screen.getByText('Workflow and cutoff schedule')).toBeInTheDocument();
    expect(screen.getByText('Benefit claim report fields')).toBeInTheDocument();
    expect(screen.getByText(/Read-only payment period status/)).toBeInTheDocument();
    expect(screen.getByText('Data permission group editing')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export CSV (จำลอง)' })).toBeEnabled();
  });
});
