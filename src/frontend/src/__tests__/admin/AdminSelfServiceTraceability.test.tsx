import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SelfServicePage from '@/app/[locale]/admin/self-service/page';

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

vi.mock('@/lib/admin/store/useAdminSelfService', () => ({
  useAdminSelfService: (selector: (state: { isDirty: boolean }) => unknown) => selector({ isDirty: false }),
}));

const ADMIN_SS_TRACE = [
  ['BRD #178', '/th/admin/self-service/field-config', 'รายการฟิลด์'],
  ['BRD #179', '/th/admin/self-service/visibility', 'การมองเห็นฟิลด์'],
  ['BRD #180', '/th/admin/self-service/mandatory', 'ฟิลด์บังคับกรอก'],
  ['BRD #181', '/th/admin/self-service/readonly', 'ฟิลด์อ่านอย่างเดียว'],
  ['BRD #182', '/th/admin/self-service/quick-actions', 'ทางลัดเมนูด่วน'],
  ['BRD #183', '/th/admin/self-service/tiles', 'ไทล์หน้าแรก'],
] as const;

describe('Admin Self-Service hub traceability (BRD #178-183)', () => {
  it('maps every admin self-service card to its route and BRD trace id', () => {
    render(<SelfServicePage />);

    ADMIN_SS_TRACE.forEach(([brd, href, title]) => {
      const card = screen.getByText(title).closest('a');
      expect(card).toHaveAttribute('href', href);
      expect(card).toHaveTextContent(brd);
    });
  });

  it('keeps card copy Thai-primary while preserving existing BRD badges', () => {
    render(<SelfServicePage />);

    const text = document.body.textContent ?? '';
    expect(text).toContain('การตั้งค่าแบบกำหนดเอง');
    expect(text).not.toMatch(/Payment Information|Bank Country|Document Access/i);
  });
});
