/**
 * EC UX Slice 2: Resignation launch belongs to /requests, not /profile/me.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

vi.mock('next-intl', () => ({
  useLocale: () => 'th',
}));

vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: { href: string; children: React.ReactNode; className?: string; [k: string]: unknown }) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}));

import HumiRequestsPage from '@/app/[locale]/requests/page';

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe('EC UX Slice 2: /requests exposes resignation workflow launch', () => {
  it('shows resignation in the request catalog and links to the localized resignation route', () => {
    render(<HumiRequestsPage />);

    fireEvent.click(screen.getByRole('tab', { name: /แบบฟอร์มทั้งหมด/i }));

    expect(screen.getByText('ลาออก')).toBeInTheDocument();
    const resignationLink = screen
      .getAllByRole('link')
      .find((link) => link.getAttribute('href') === '/th/resignation');

    expect(resignationLink).toBeDefined();
    expect(resignationLink).toHaveTextContent('เริ่มกระบวนการ');
  });
});
