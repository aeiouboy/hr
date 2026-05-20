import { describe, expect, it, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { BenefitServicesPanel } from '@/components/benefits/BenefitServicesPanel';
import { ReimbursementRequestPanel } from '@/components/benefits/reimbursement/ReimbursementRequestPanel';
import { ReferralRequestPanel } from '@/components/benefits/referral/ReferralRequestPanel';
import { TaxPlanningPanel } from '@/components/benefits/tax/TaxPlanningPanel';
import { useBenefitReferralsStore } from '@/stores/benefit-referrals';
import { useBenefitTaxPlanningStore } from '@/stores/benefit-tax-planning';

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

const sourceRoot = path.join(process.cwd(), 'src');

function source(relativePath: string) {
  return readFileSync(path.join(sourceRoot, relativePath), 'utf8');
}

describe('deferred benefit journey and token compliance', () => {
  beforeEach(() => {
    localStorage.clear();
    useBenefitReferralsStore.getState().clear();
    useBenefitTaxPlanningStore.getState().clear();
  });

  it('routes only benefit-owned services through Benefits Hub and keeps tax planning out of the hub', () => {
    render(<BenefitServicesPanel locale="th" onOpenClaim={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'เลือกสวัสดิการที่ต้องการ' })).toBeInTheDocument();
    expect(document.querySelectorAll('[data-benefit-owned-action="true"]')).toHaveLength(2);
    expect(screen.getByRole('link', { name: /ขอใบส่งตัว/ })).toHaveAttribute('href', '/th/benefits-hub/referral');
    expect(screen.queryByRole('link', { name: /วางแผนภาษี/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /requests/i })).not.toBeInTheDocument();
  });

  it('keeps referral and tax entry panels inline rather than adding duplicate modal implementations', () => {
    const referralPanel = source('components/benefits/referral/ReferralRequestPanel.tsx');
    const taxPanel = source('components/benefits/tax/TaxPlanningPanel.tsx');

    expect(referralPanel).not.toMatch(/\bModal\b|role=["']dialog["']/);
    expect(taxPanel).not.toMatch(/\bModal\b|role=["']dialog["']/);
  });

  it('renders accessible Humi-style labels and helper copy for referral fields without reimbursement receipt anatomy', () => {
    render(<ReferralRequestPanel />);

    expect(screen.getByText(/กรอกข้อมูลใบส่งตัวโดยไม่ต้องใช้เลขใบเสร็จ/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^ผู้ใช้สิทธิ์/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^โรงพยาบาล \/ สาขา/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^เหตุผลหรือบริการที่ต้องการพบแพทย์/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^วันที่ต้องการเข้ารับบริการ/)).toBeInTheDocument();
    expect(screen.getByLabelText('หมายเหตุถึง SPD')).toBeInTheDocument();
    expect(
      screen.queryByLabelText(/เลขที่ใบเสร็จ|จำนวนเงินที่ขอเบิก|เอกสารแนบเบิกย้อนหลัง/),
    ).not.toBeInTheDocument();
  });

  it('uses Humi FileUploadField for reimbursement attachments instead of a filename textbox', () => {
    render(<ReimbursementRequestPanel />);

    expect(screen.getByRole('button', { name: 'เอกสารแนบเบิกย้อนหลัง' })).toBeInTheDocument();
    expect(screen.getAllByText(/PDF, JPG, PNG/).length).toBeGreaterThan(0);
    expect(screen.queryByLabelText('ชื่อไฟล์แนบ')).not.toBeInTheDocument();
  });

  it('renders accessible Humi-style labels and helper copy for tax planning with Payroll review controls', () => {
    render(<TaxPlanningPanel />);

    expect(screen.getByText(/ประมาณการส่วนตัวเพื่อวางแผน ไม่ใช่คำแนะนำภาษี/)).toBeInTheDocument();
    expect(screen.getByText(/ไม่อัปเดตเงินเดือน ไม่ยื่นภาษี/)).toBeInTheDocument();
    expect(screen.getByLabelText('รายได้เพิ่มเติมคาดการณ์ทั้งปี')).toBeInTheDocument();
    for (const label of [
      'คู่สมรส',
      'บุตร',
      'บิดามารดา',
      'ผู้พิการ',
      'ประกันชีวิต',
      'กองทุนสำรองเลี้ยงชีพ',
      'กองทุนเกษียณ',
      'ประกันสังคม',
      'เงินบริจาค',
      'ค่าลดหย่อนอื่น ๆ',
    ]) {
      expect(screen.getByLabelText(new RegExp(label))).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'ส่งให้ Payroll ตรวจแผน' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'ยกเลิกคำขอตรวจแผน' })).toBeDisabled();
  });

  it('keeps new deferred benefit surfaces free of hardcoded red and legacy card color utilities', () => {
    const deferredSurfaceFiles = [
      'components/benefits/BenefitServicesPanel.tsx',
      'components/benefits/reimbursement/ReimbursementRequestPanel.tsx',
      'app/[locale]/benefits-hub/reimbursement/page.tsx',
      'app/[locale]/benefits-hub/referral/page.tsx',
      'app/[locale]/payroll/tax-planning/page.tsx',
      'components/benefits/referral/ReferralRequestPanel.tsx',
      'components/benefits/referral/ReferralHistoryPanel.tsx',
      'components/benefits/referral/ReferralLetterPreview.tsx',
      'components/benefits/tax/TaxPlanningPanel.tsx',
      'components/workflow/BenefitReferralInbox.tsx',
      'app/[locale]/admin/benefits/page.tsx',
      'app/[locale]/payroll/tax-review/page.tsx',
      'app/[locale]/requests/page.tsx',
    ];
    const forbiddenLegacyPatterns = [
      /#[0-9a-f]{3,8}/i,
      /\bbg-white\b/,
      /\b(?:bg|text|border|divide|hover:bg)-(?:red|slate|gray|zinc|stone)-\d{2,3}\b/,
      /\bborder-gray-\d{2,3}\b/,
    ];

    for (const file of deferredSurfaceFiles) {
      const contents = source(file);
      for (const pattern of forbiddenLegacyPatterns) {
        expect(contents, `${file} should not contain ${pattern}`).not.toMatch(pattern);
      }
    }
  });
});
