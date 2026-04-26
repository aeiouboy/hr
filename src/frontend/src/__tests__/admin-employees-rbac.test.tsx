/**
 * Track A1 (autopilot 2026-04-26) — /admin/employees RBAC barrier wire-up.
 *
 * MockEmployee pool has no managerId/businessUnitId, so direct-reports/BU
 * scope modes are not computable on this data. Per autopilot spec + C8
 * (no-invented-fields), non-admin personas hit a barrier card; only mode='all'
 * (SPD / HR Admin / HR Manager) see the 1K list. Verified via scope-filter's
 * pickScopeMode lib.
 */

import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { useAuthStore } from '@/stores/auth-store';

// Mock next/navigation since the page uses useRouter + useParams
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useParams: () => ({ locale: 'th' }),
  usePathname: () => '/th/admin/employees',
}));

function setRoles(
  roles: Array<'employee' | 'manager' | 'hrbp' | 'spd' | 'hr_admin' | 'hr_manager'>,
) {
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
  const { default: Page } = await import('@/app/[locale]/admin/employees/page');
  return render(<Page />);
}

describe('Track A1 — /admin/employees RBAC barrier', () => {
  test('SPD passes barrier (no-access NOT rendered)', async () => {
    setRoles(['spd']);
    await renderPage();
    expect(screen.queryByTestId('employees-no-access')).toBeNull();
  });

  test('HR Admin passes barrier (inherits via ROLE_HIERARCHY)', async () => {
    setRoles(['hr_admin']);
    await renderPage();
    expect(screen.queryByTestId('employees-no-access')).toBeNull();
  });

  test('HR Manager passes barrier (top of hierarchy)', async () => {
    setRoles(['hr_manager']);
    await renderPage();
    expect(screen.queryByTestId('employees-no-access')).toBeNull();
  });

  test('Employee role hits barrier with redirect link', async () => {
    setRoles(['employee']);
    await renderPage();
    const barrier = screen.getByTestId('employees-no-access');
    expect(barrier).toBeInTheDocument();
    expect(screen.getByText(/ไม่มีสิทธิ์เข้าถึง/)).toBeInTheDocument();
    expect(screen.getByText(/โปรไฟล์ของฉัน/)).toBeInTheDocument();
  });

  test('Manager role hits barrier (no managerId field on MockEmployee — direct-reports mode unsupported)', async () => {
    setRoles(['manager']);
    await renderPage();
    expect(screen.getByTestId('employees-no-access')).toBeInTheDocument();
  });

  test('HRBP role hits barrier (no businessUnitId field on MockEmployee — BU mode unsupported)', async () => {
    setRoles(['hrbp']);
    await renderPage();
    expect(screen.getByTestId('employees-no-access')).toBeInTheDocument();
  });

  test('Empty roles array (unauthenticated) → barrier shown', async () => {
    setRoles([]);
    await renderPage();
    expect(screen.getByTestId('employees-no-access')).toBeInTheDocument();
  });
});
