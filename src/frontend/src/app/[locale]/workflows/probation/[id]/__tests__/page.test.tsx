import '@testing-library/jest-dom/vitest';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

let routeId = 'PB-001';
let routePath = '/th/workflows/probation/PB-001';

vi.mock('next/navigation', () => ({
  useParams: () => ({ id: routeId }),
  usePathname: () => routePath,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

import ProbationDetailPage from '../page';

async function renderLoaded(id = 'PB-001', path = `/th/workflows/probation/${id}`) {
  routeId = id;
  routePath = path;
  const view = render(<ProbationDetailPage />);
  await screen.findByText('ประเมินทดลองงาน', undefined, { timeout: 2000 });
  return view;
}

describe('ProbationDetailPage — Humi design hand-off', () => {
  it('renders the back link, eyebrow + title, and employee snapshot', async () => {
    await renderLoaded('PB-001');

    expect(screen.getByText('กลับไปคิวประเมิน')).toBeInTheDocument();
    expect(screen.getByText('การดำเนินการ · PB-001')).toBeInTheDocument();
    expect(screen.getByText('ประเมินทดลองงาน')).toBeInTheDocument();
    expect(screen.getByText('สมชาย สุขใจ')).toBeInTheDocument();
    expect(screen.getByText('Somchai Sukjai')).toBeInTheDocument();
  });

  it('renders 3 outcome cards in a radiogroup with pass selected by default', async () => {
    await renderLoaded('PB-001');

    const group = screen.getByRole('radiogroup', { name: 'ผลการประเมิน' });
    expect(group).toBeInTheDocument();

    expect(screen.getByText('ผ่านทดลองงาน')).toBeInTheDocument();
    expect(screen.getByText('ขยายเวลา')).toBeInTheDocument();
    expect(screen.getByText('ไม่ผ่าน')).toBeInTheDocument();

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    const passRadio = radios.find((r) => r.getAttribute('value') === 'pass');
    expect(passRadio).toBeChecked();
  });

  it('reveals pass-effective fields when pass is selected, and extend panel when extend is selected', async () => {
    await renderLoaded('PB-001');

    // pass (default) shows effective/allowance fields
    expect(screen.getByText('วันที่บรรจุ (effective)')).toBeInTheDocument();
    expect(screen.getByText('Allowance (ถ้ามี)')).toBeInTheDocument();

    // switch to extend
    fireEvent.click(screen.getByLabelText('ขยายเวลา'));
    expect(screen.getByText('ขยายถึงวันที่')).toBeInTheDocument();
    expect(screen.getByText('ระยะเวลา')).toBeInTheDocument();
    // pass-only fields gone
    expect(screen.queryByText('วันที่บรรจุ (effective)')).not.toBeInTheDocument();
  });

  it('updates star rating and shows the matching tier label', async () => {
    await renderLoaded('PB-001');

    // Default rating is 4 → "เกินมาตรฐาน"
    expect(screen.getByText(/4\/5 — เกินมาตรฐาน/)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('ให้คะแนน 5 จาก 5'));
    expect(screen.getByText(/5\/5 — ดีเยี่ยม/)).toBeInTheDocument();
  });

  it('switches the sticky-footer primary button text based on outcome', async () => {
    await renderLoaded('PB-001');

    // pass (default)
    expect(screen.getByText('อนุมัติและส่งให้ HR Admin')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('ไม่ผ่าน'));
    expect(screen.getByText('ยืนยัน ไม่ผ่านทดลองงาน')).toBeInTheDocument();
    expect(screen.queryByText('อนุมัติและส่งให้ HR Admin')).not.toBeInTheDocument();
  });

  it('renders the days-remaining banner with the urgent threshold (≤14)', async () => {
    await renderLoaded('PB-001');
    expect(screen.getByRole('status')).toHaveTextContent(/ใกล้ครบกำหนด — เหลือ \d+ วัน/);
  });

  it('renders the approval chain, history, and policy ink-card on the sidebar', async () => {
    await renderLoaded('PB-001');

    expect(screen.getByText('ขั้นตอนอนุมัติ')).toBeInTheDocument();
    expect(screen.getByText(/หัวหน้างาน ·/)).toBeInTheDocument();
    expect(screen.getByText(/HR Admin ·/)).toBeInTheDocument();
    expect(screen.getByText('Payroll')).toBeInTheDocument();

    expect(screen.getByText('ประวัติเคส')).toBeInTheDocument();
    expect(screen.getByText('นโยบายทดลองงาน · ฉบับ 2569')).toBeInTheDocument();
    expect(screen.getByText(/ดูฉบับเต็ม/)).toBeInTheDocument();
  });
});
