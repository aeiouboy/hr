/**
 * /quick-approve page.test.tsx
 *
 * Smoke test: the route page renders QuickApprovePage without crashing
 * for the default locale with no auth context.
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// ── next-intl mock ─────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'th',
}));

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

// ── Humi component stubs — Capability uses real implementation ─────────────
vi.mock('@/components/humi', async () => {
  // Use real Capability so RBAC gates work
  const { Capability } = await vi.importActual<typeof import('@/components/humi/Capability')>(
    '@/components/humi/Capability',
  );
  return {
    Card: ({ children, header }: any) => <div>{header}{children}</div>,
    CardTitle: ({ children }: any) => <h2>{children}</h2>,
    Button: ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>,
    Modal: ({ open, children, title }: any) =>
      open ? <div role="dialog" aria-label={title}>{children}</div> : null,
    DataTable: ({ rows, columns, emptyState }: any) => (
      <div data-testid="data-table">
        {rows.length === 0
          ? <div data-testid="empty-state">{emptyState}</div>
          : (
            <div data-testid="has-rows">
              <span data-testid="rows-count">{rows.length} rows</span>
              {rows.map((row: any) => (
                <div key={row.id} data-testid={`row-${row.id}`} data-type={row.type}>
                  {columns?.map((col: any) => (
                    <span key={col.id}>{col.cell ? col.cell(row) : null}</span>
                  ))}
                </div>
              ))}
            </div>
          )}
      </div>
    ),
    Capability,
  };
});

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children }: any) => <span>{children}</span>,
}));
vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: () => <div aria-hidden />,
}));
vi.mock('@/components/quick-approve/UrgencyBadge', () => ({
  UrgencyBadge: ({ urgency }: any) => <span>{urgency}</span>,
}));
vi.mock('@/components/quick-approve/ApprovalChain', () => ({
  ApprovalChain: () => <div data-testid="approval-chain" />,
  ApprovalTimelineChain: () => <div data-testid="approval-timeline-chain" />,
}));
vi.mock('@/components/quick-approve/DelegationModal', () => ({
  DelegationModal: () => null,
}));
vi.mock('@/hooks/use-quick-approve', () => ({
  useQuickApprove: () => ({
    loading: false,
    delegations: [],
    createDelegation: vi.fn(),
    revokeDelegation: vi.fn(),
  }),
}));

// ── localStorage mock ──────────────────────────────────────────────────────
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

import { useAuthStore } from '@/stores/auth-store';

beforeEach(() => {
  localStorageMock.clear();
  useAuthStore.setState({
    userId: 'TEST-SPD',
    username: 'SPD Test',
    email: 'spd@humi.test',
    roles: ['spd'],
    isAuthenticated: true,
    originalUser: null,
    _hasHydrated: true,
  } as Parameters<typeof useAuthStore.setState>[0]);
});

describe('/quick-approve page route', () => {
  it('renders without crashing and shows the workspace title', async () => {
    const { default: QuickApprovePageRoute } = await import('@/app/[locale]/quick-approve/page');
    render(<QuickApprovePageRoute />);
    expect(screen.getByText('กล่องอนุมัติ')).toBeInTheDocument();
  });

  it('renders the data table with mock rows', async () => {
    const { default: QuickApprovePageRoute } = await import('@/app/[locale]/quick-approve/page');
    render(<QuickApprovePageRoute />);
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getByTestId('has-rows')).toBeInTheDocument();
  });

  it('shows the probation tab chip and probation rows drill-in to /workflows/probation', async () => {
    const { default: QuickApprovePageRoute } = await import('@/app/[locale]/quick-approve/page');
    render(<QuickApprovePageRoute />);

    // The "ทดลองงาน" chip is rendered alongside the other type filter chips.
    const probationChip = await screen.findByRole('button', { name: /ทดลองงาน/ });
    expect(probationChip).toBeInTheDocument();

    // Probation cases load asynchronously (300ms setTimeout in useProbationCases).
    // Wait until at least one probation row has been merged into the unified list.
    await waitFor(() => {
      const probationRows = document.querySelectorAll('[data-type="probation"]');
      expect(probationRows.length).toBeGreaterThan(0);
    });

    // Activating the chip narrows the list to probation only.
    fireEvent.click(probationChip);
    await waitFor(() => {
      const rows = document.querySelectorAll('[data-testid^="row-"]');
      expect(rows.length).toBeGreaterThan(0);
      rows.forEach((row) => {
        expect(row.getAttribute('data-type')).toBe('probation');
      });
    });

    // Drill-in href resolves to /<locale>/workflows/probation/<id>, not /quick-approve/<id>.
    const probationRow = document.querySelector('[data-type="probation"]');
    expect(probationRow).not.toBeNull();
    const link = probationRow!.querySelector('a[href*="/workflows/probation/"]');
    expect(link).not.toBeNull();
    expect(link!.getAttribute('href')).toMatch(/^\/th\/workflows\/probation\/PB-/);
  });
});
