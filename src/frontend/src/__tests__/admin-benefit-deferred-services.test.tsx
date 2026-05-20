import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import path from 'node:path';

vi.mock('next-intl', () => ({
  useLocale: () => 'th',
}));

describe('admin benefit deferred service configuration', () => {
  it('renders read-only referral, EBO, and benefit payment configuration sections without Payroll Tax ownership', async () => {
    const { default: AdminBenefitsPage } = await import('@/app/[locale]/admin/benefits/page');

    render(<AdminBenefitsPage />);

    expect(screen.getByText('Referral configuration preview')).toBeInTheDocument();
    expect(screen.getByText(/letter template, and ePatient integration/)).toBeInTheDocument();
    expect(screen.getByText('ePatient payload + 30-day validity')).toBeInTheDocument();
    expect(screen.getByText('Benefit Special Privilege and EBO reporting')).toBeInTheDocument();
    expect(screen.getAllByText('Admin/reporting only').length).toBeGreaterThan(0);
    expect(screen.queryByText('Tax Planning configuration preview')).not.toBeInTheDocument();
    expect(screen.queryByText('Tax review requests')).not.toBeInTheDocument();
    expect(screen.queryByText('Payroll sync disabled')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ePatient sync — วางแผนหลังเปิดใช้ Backend' })).toBeDisabled();
    expect(screen.getByRole('link', { name: /ส่งบัญชี \(Payment\)/ })).toHaveAttribute('href', '/th/admin/benefits/payment');
    expect(screen.getByRole('link', { name: /สร้างไฟล์ธนาคาร \(Payment\)/ })).toHaveAttribute('href', '/th/admin/benefits/payment');
    expect(screen.getByText('Benefit master data')).toBeInTheDocument();
  });

  it('keeps admin deferred-service copy user-facing instead of implementation-facing', () => {
    const source = readFileSync(path.join(process.cwd(), 'src/app/[locale]/admin/benefits/page.tsx'), 'utf8');

    expect(source).not.toMatch(/Mock ePatient|Mock\/planned|local estimator only|planned follow-ups/i);
  });
});
