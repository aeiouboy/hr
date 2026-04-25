/**
 * T3 (#90) — /admin/change-requests RBAC gate (4 production roles + admin view-as)
 *
 * Asserts AC-3 + AC-7 — visible only when currentRole ∈ {spd, hr_admin, hr_manager};
 * employee / manager / hrbp see no-access state.
 */

import { describe, expect, test, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import { useAuthStore } from '@/stores/auth-store';

// Mock next/navigation usePathname for child links
vi.mock('next/navigation', () => ({
  usePathname: () => '/th/admin/change-requests',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useParams: () => ({ locale: 'th' }),
}));

const messages = {
  ess: { sections: {
    emergencyContact: 'ผู้ติดต่อฉุกเฉิน',
    address: 'ที่อยู่',
    contact: 'การติดต่อ',
    bank: 'บัญชีธนาคาร',
    personal: 'ข้อมูลส่วนบุคคล',
    termination: 'การพ้นสภาพ',
    dependents: 'ผู้อยู่ในความดูแล',
  }},
};

function setRoles(roles: Array<'employee' | 'manager' | 'hrbp' | 'spd' | 'hr_admin' | 'hr_manager'>) {
  useAuthStore.setState({
    userId: 'TEST',
    username: 'tester',
    email: 'tester@humi.test',
    roles,
    isAuthenticated: true,
    originalUser: null,
    _hasHydrated: true,
  } as any);
}

async function renderPage() {
  const { default: Page } = await import('@/app/[locale]/admin/change-requests/page');
  return render(
    <NextIntlClientProvider locale="th" messages={messages as any}>
      <Page />
    </NextIntlClientProvider>,
  );
}

describe('T3 #90 — /admin/change-requests RBAC gate', () => {
  beforeEach(() => {
    useAuthStore.setState({ pendingChanges: [], attachments: [] } as any, false);
  });

  test('SPD sees the queue (no-access state NOT rendered)', async () => {
    setRoles(['spd', 'employee']);
    await renderPage();
    expect(screen.queryByTestId('change-requests-no-access')).toBeNull();
  });

  test('HR Admin sees the queue (inherits via ROLE_HIERARCHY)', async () => {
    setRoles(['hr_admin']);
    await renderPage();
    expect(screen.queryByTestId('change-requests-no-access')).toBeNull();
  });

  test('HR Manager sees the queue (top of hierarchy)', async () => {
    setRoles(['hr_manager']);
    await renderPage();
    expect(screen.queryByTestId('change-requests-no-access')).toBeNull();
  });

  test('Employee blocked — no-access state shown', async () => {
    setRoles(['employee']);
    await renderPage();
    expect(screen.getByTestId('change-requests-no-access')).toBeInTheDocument();
  });

  test('Manager blocked — manager sees no-access', async () => {
    setRoles(['manager', 'employee']);
    await renderPage();
    expect(screen.getByTestId('change-requests-no-access')).toBeInTheDocument();
  });

  test('HRBP blocked — HRBP is BU approver for other domains, not SPD personal-info queue', async () => {
    setRoles(['hrbp', 'employee']);
    await renderPage();
    expect(screen.getByTestId('change-requests-no-access')).toBeInTheDocument();
  });
});
