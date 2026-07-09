/**
 * quick-approve-workspace.test.tsx
 *
 * Acceptance criteria for the Unified Approval Workspace (A-4):
 *   1. Inbox renders for Manager / SPD / HRBP / HR Admin
 *   2. Bulk-action bar becomes visible after row selection
 *   3. Bulk-action bar VISIBLE for SPD, HRBP, HR Admin
 *   4. Claim Approve filters match STA-78 list requirements
 *   5. Assign-to-me and attachment list columns are functional
 *   6. Queue scope label matches resolved capability bundle
 *   7. Delegation banner shown when originalUser is non-null
 */

import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── next-intl mock ──────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (params) return `${key}(${JSON.stringify(params)})`;
    return key;
  },
  useLocale: () => 'th',
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    [k: string]: unknown;
  }) => (
    <a href={String(href)} {...(rest as Record<string, unknown>)}>
      {children}
    </a>
  ),
}));

// ── Stub heavy Humi primitives ──────────────────────────────────────────────
vi.mock('@/components/humi/molecules/Card', () => ({
  Card: ({
    children,
    header,
  }: {
    children: React.ReactNode;
    header?: React.ReactNode;
  }) => (
    <div data-testid="card">
      {header}
      {children}
    </div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  cardVariants: {},
}));

vi.mock('@/components/humi/atoms/Button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    className,
    leadingIcon,
    ...rest
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    leadingIcon?: React.ReactNode;
    [k: string]: unknown;
  }) => (
    <button onClick={onClick} disabled={disabled} className={className} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {leadingIcon}
      {children}
    </button>
  ),
  buttonVariants: {},
}));

vi.mock('@/components/humi/organisms/Modal', () => ({
  Modal: ({
    open,
    children,
    title,
  }: {
    open: boolean;
    children: React.ReactNode;
    title: string;
    onClose: () => void;
  }) =>
    open ? (
      <div role="dialog" aria-label={title}>
        {children}
      </div>
    ) : null,
}));

vi.mock('@/components/humi/organisms/DataTable', () => ({
  DataTable: ({
    rows,
    emptyState,
  }: {
    rows: unknown[];
    columns: unknown[];
    emptyState?: React.ReactNode;
    [k: string]: unknown;
  }) => (
    <div data-testid="data-table">
      {rows.length === 0 ? (
        <div data-testid="empty-state">{emptyState}</div>
      ) : (
        rows.map((_, idx) => <div key={idx} data-testid="table-row" />)
      )}
    </div>
  ),
}));

// ── Capability: pass-through to real implementation ─────────────────────────
// We do NOT mock @/hooks/use-capabilities or @/components/humi/Capability.
// The real Capability component reads from the Zustand auth-store which we
// control via useAuthStore.setState in each test helper.
// This avoids all require()-inside-vi.mock patterns.

// ── Barrel re-export of humi — inline stubs matching the individual mocks ───
// NOTE: vi.importActual on already-mocked modules returns the mock, not the
// original. We inline the stubs here to avoid that confusion.
vi.mock('@/components/humi', async () => {
  // Capability: import the real implementation so RBAC gates work
  const { Capability } = await vi.importActual<typeof import('@/components/humi/atoms/Capability')>(
    '@/components/humi/atoms/Capability',
  );
  return {
    Card: ({ children, header }: { children: React.ReactNode; header?: React.ReactNode }) => (
      <div data-testid="card">{header}{children}</div>
    ),
    CardTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
    cardVariants: {},
    Button: ({ children, onClick, disabled, className, leadingIcon, ...rest }: {
      children: React.ReactNode; onClick?: () => void; disabled?: boolean; className?: string; leadingIcon?: React.ReactNode; [k: string]: unknown;
    }) => <button onClick={onClick} disabled={disabled} className={className} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{leadingIcon}{children}</button>,
    buttonVariants: {},
    Modal: ({ open, children, title }: {
      open: boolean; children: React.ReactNode; title: string; onClose: () => void;
    }) => open ? <div role="dialog" aria-label={title}>{children}</div> : null,
    DataTable: ({ rows, columns, emptyState }: {
      rows: unknown[];
      columns: Array<{ id: string; header: React.ReactNode; cell: (row: unknown) => React.ReactNode }>;
      emptyState?: React.ReactNode;
      [k: string]: unknown;
    }) => (
      <div data-testid="data-table">
        {/* Render header row so select-all checkbox is accessible */}
        <div data-testid="table-header">
          {columns.map((col) => (
            <span key={col.id}>{col.header}</span>
          ))}
        </div>
        {rows.length === 0
          ? <div data-testid="empty-state">{emptyState}</div>
          : rows.map((row, idx) => (
              <div key={idx} data-testid="table-row">
                {/* Render all cells so row checkboxes are accessible */}
                {columns.map((col) => (
                  <span key={col.id}>{col.cell(row)}</span>
                ))}
              </div>
            ))}
      </div>
    ),
    Capability,
  };
});

vi.mock('@/components/humi/atoms/badge', () => ({
  Badge: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="badge">{children}</span>
  ),
}));

vi.mock('@/components/humi/atoms/skeleton', () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div className={className} aria-hidden />
  ),
}));

vi.mock('@/components/quick-approve/UrgencyBadge', () => ({
  UrgencyBadge: ({ urgency, label }: { urgency: string; label?: string }) => (
    <span data-testid={`urgency-${urgency}`}>{label ?? urgency}</span>
  ),
}));

vi.mock('@/components/quick-approve/ApprovalChain', () => ({
  ApprovalChain: () => <div data-testid="approval-chain" />,
  ApprovalTimelineChain: () => <div data-testid="approval-timeline-chain" />,
}));

vi.mock('@/components/quick-approve/DelegationModal', () => ({
  DelegationModal: ({ open }: { open: boolean }) =>
    open ? <div data-testid="delegation-modal" /> : null,
}));

vi.mock('@/hooks/use-quick-approve', () => ({
  useQuickApprove: () => ({
    loading: false,
    delegations: [],
    createDelegation: vi.fn(),
    revokeDelegation: vi.fn(),
  }),
}));

// ── localStorage mock ───────────────────────────────────────────────────────
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

// ── Imports AFTER mocks ────────────────────────────────────────────────────
import { useAuthStore } from '@/stores/auth-store';
import type { Role } from '@/lib/rbac';
import { QuickApprovePage } from '@/components/manager/quick-approve-page';

// ── Helpers ─────────────────────────────────────────────────────────────────

function setPersona(
  roles: Role[],
  opts?: {
    userId?: string;
    username?: string;
    originalUser?: {
      userId: string;
      username: string;
      email: string;
      roles: Role[];
    } | null;
  },
) {
  useAuthStore.setState({
    userId: opts?.userId ?? 'TEST-001',
    username: opts?.username ?? 'Test User',
    email: 'test@humi.test',
    roles,
    isAuthenticated: true,
    originalUser: opts?.originalUser ?? null,
    _hasHydrated: true,
  } as Parameters<typeof useAuthStore.setState>[0]);
}

// ── Test setup ───────────────────────────────────────────────────────────────

beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});

// ════════════════════════════════════════════════════════════════════════════
// AC-1: Inbox renders for all personas
// ════════════════════════════════════════════════════════════════════════════

describe('QuickApprovePage — inbox renders for all personas', () => {
  it('renders for Manager role', () => {
    setPersona(['manager']);
    render(<QuickApprovePage />);
    expect(screen.getByText('กล่องอนุมัติ')).toBeInTheDocument();
    expect(screen.getByTestId('queue-scope-badge')).toHaveTextContent('ทีม');
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('renders for SPD role', () => {
    setPersona(['spd']);
    render(<QuickApprovePage />);
    expect(screen.getByText('กล่องอนุมัติ')).toBeInTheDocument();
    expect(screen.getByTestId('queue-scope-badge')).toHaveTextContent('บริษัท');
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('renders for HRBP role', () => {
    setPersona(['hrbp']);
    render(<QuickApprovePage />);
    expect(screen.getByText('กล่องอนุมัติ')).toBeInTheDocument();
    expect(screen.getByTestId('queue-scope-badge')).toHaveTextContent('บริษัท');
  });

  it('renders for HR Admin role', () => {
    setPersona(['hr_admin']);
    render(<QuickApprovePage />);
    expect(screen.getByText('กล่องอนุมัติ')).toBeInTheDocument();
    expect(screen.getByTestId('queue-scope-badge')).toHaveTextContent('ทั้งหมด');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-2 / AC-3: Bulk-action bar visibility
// ════════════════════════════════════════════════════════════════════════════

describe('Bulk-action bar visibility', () => {
  it('bulk-action bar VISIBLE for Manager after selecting a row', async () => {
    setPersona(['manager']);
    const user = userEvent.setup();
    render(<QuickApprovePage />);

    const checkboxes = screen.getAllByRole('checkbox');
    // checkboxes[0] = select-all header, checkboxes[1+] = row checkboxes
    if (checkboxes.length > 1) {
      await user.click(checkboxes[1]);
    }

    expect(screen.getByTestId('bulk-action-toolbar')).toHaveAttribute('aria-hidden', 'false');
  });

  it('bulk-action bar VISIBLE for SPD after selecting a row', async () => {
    setPersona(['spd']);
    const user = userEvent.setup();
    render(<QuickApprovePage />);

    const checkboxes = screen.getAllByRole('checkbox');
    if (checkboxes.length > 1) {
      await user.click(checkboxes[1]);
    }

    expect(screen.getByTestId('bulk-action-toolbar')).toHaveAttribute('aria-hidden', 'false');
  });

  it('bulk-action bar VISIBLE for HRBP after selecting a row', async () => {
    setPersona(['hrbp']);
    const user = userEvent.setup();
    render(<QuickApprovePage />);

    const checkboxes = screen.getAllByRole('checkbox');
    if (checkboxes.length > 1) {
      await user.click(checkboxes[1]);
    }

    expect(screen.getByTestId('bulk-action-toolbar')).toHaveAttribute('aria-hidden', 'false');
  });

  it('bulk-action bar VISIBLE for HR Admin after selecting a row', async () => {
    setPersona(['hr_admin']);
    const user = userEvent.setup();
    render(<QuickApprovePage />);

    const checkboxes = screen.getAllByRole('checkbox');
    if (checkboxes.length > 1) {
      await user.click(checkboxes[1]);
    }

    expect(screen.getByTestId('bulk-action-toolbar')).toHaveAttribute('aria-hidden', 'false');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-4: Claim filter is available on the unified Claim Approve list
// ════════════════════════════════════════════════════════════════════════════

describe('Claim Approve list filters', () => {
  it('hides claim type filters for Manager because BenefitEmployeeClaim is restricted', () => {
    setPersona(['manager']);
    render(<QuickApprovePage />);

    expect(screen.queryByRole('button', { name: /เบิก/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'เบิก' })).not.toBeInTheDocument();
  });

  it('shows Linear sample filter fields and clears active filters', async () => {
    setPersona(['hr_admin']);
    const user = userEvent.setup();
    render(<QuickApprovePage />);

    expect(screen.getByTestId('filter-request-type')).toBeInTheDocument();
    expect(screen.getByTestId('filter-eventReason')).toBeInTheDocument();
    expect(screen.getByTestId('filter-requestedFor')).toBeInTheDocument();
    expect(screen.getByTestId('filter-effective-from')).toBeInTheDocument();
    expect(screen.getByTestId('filter-initiatedBy')).toBeInTheDocument();
    expect(screen.getByTestId('filter-initiated-from')).toBeInTheDocument();
    expect(screen.getByTestId('filter-company')).toBeInTheDocument();
    expect(screen.getByTestId('filter-location')).toBeInTheDocument();
    expect(screen.getByTestId('filter-costCentre')).toBeInTheDocument();
    expect(screen.getByTestId('filter-businessUnit')).toBeInTheDocument();
    expect(screen.getByTestId('filter-division')).toBeInTheDocument();
    expect(screen.getByTestId('filter-department')).toBeInTheDocument();
    expect(screen.getByTestId('filter-assignment')).toBeInTheDocument();

    const initialRowCount = screen.getAllByTestId('table-row').length;

    await user.selectOptions(screen.getByTestId('filter-request-type'), 'claim');
    expect(screen.getAllByTestId('table-row')).toHaveLength(7);

    await user.type(screen.getByTestId('quick-approve-search'), 'สมชาย');
    expect(screen.getAllByTestId('table-row')).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'ล้าง' }));
    expect(screen.getAllByTestId('table-row').length).toBeGreaterThanOrEqual(initialRowCount);
    expect(screen.getByTestId('quick-approve-search')).toHaveValue('');
    expect(screen.getByTestId('filter-request-type')).toHaveValue('all');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-5: Queue scope label matches resolved capability bundle
// ════════════════════════════════════════════════════════════════════════════

describe('Queue scope label matches capability bundle', () => {
  const cases: [Role, string][] = [
    ['manager', 'ทีม'],
    ['spd', 'บริษัท'],
    ['hrbp', 'บริษัท'],
    ['hr_admin', 'ทั้งหมด'],
    ['hr_manager', 'ทั้งหมด'],
  ];

  cases.forEach(([role, expectedScope]) => {
    it(`${role} → scope badge = "${expectedScope}"`, () => {
      setPersona([role]);
      render(<QuickApprovePage />);
      expect(screen.getByTestId('queue-scope-badge')).toHaveTextContent(expectedScope);
    });
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-6: Delegation banner (proxy mode)
// ════════════════════════════════════════════════════════════════════════════

describe('Delegation banner (proxy mode)', () => {
  it('shows delegation banner when originalUser is non-null', () => {
    setPersona(['manager'], {
      originalUser: {
        userId: 'ORIG-001',
        username: 'Original Manager',
        email: 'orig@humi.test',
        roles: ['manager'],
      },
    });
    render(<QuickApprovePage />);
    // Banner shows both TH and EN versions of the name — getAllByText handles multiples
    expect(screen.getAllByText(/Original Manager/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/กำลังทำงานแทน/)).toBeInTheDocument();
  });

  it('does NOT show delegation banner when originalUser is null', () => {
    setPersona(['manager'], { originalUser: null });
    render(<QuickApprovePage />);
    expect(screen.queryByText(/กำลังทำงานแทน/)).not.toBeInTheDocument();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// AC-7: Inbox table row count
// ════════════════════════════════════════════════════════════════════════════

describe('Inbox table', () => {
  it('renders the merged mock rows for HR Admin', () => {
    setPersona(['hr_admin']);
    render(<QuickApprovePage />);
    expect(screen.getAllByTestId('table-row').length).toBeGreaterThanOrEqual(21);
  });

  it('clears selection when filters change so hidden rows cannot keep bulk actions active', async () => {
    setPersona(['hr_admin']);
    const user = userEvent.setup();
    render(<QuickApprovePage />);

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);
    expect(screen.getByTestId('bulk-action-toolbar')).toHaveAttribute('aria-hidden', 'false');

    await user.type(screen.getByTestId('quick-approve-search'), 'no matching request');
    expect(screen.getByTestId('bulk-action-toolbar')).toHaveAttribute('aria-hidden', 'true');
  });

  it('matches the user reference by removing waiting, chain, and urgency columns', () => {
    setPersona(['hr_admin']);
    render(<QuickApprovePage />);

    expect(screen.queryByText('รอ (วัน)')).not.toBeInTheDocument();
    expect(screen.queryByText('Waiting')).not.toBeInTheDocument();
    expect(screen.queryByText('ขั้นตอน')).not.toBeInTheDocument();
    expect(screen.queryByText('Chain')).not.toBeInTheDocument();
    expect(screen.queryByText('table.urgency')).not.toBeInTheDocument();
    expect(screen.queryByTestId('approval-timeline-chain')).not.toBeInTheDocument();
    expect(screen.queryByTestId(/urgency-/)).not.toBeInTheDocument();
  });

  it('claims only the selected row for the current approver without removing it', async () => {
    setPersona(['manager'], { userId: 'MGR001', username: 'พิชญ์ ม. (หัวหน้าทีม)' });
    const user = userEvent.setup();
    render(<QuickApprovePage />);

    // useProbationCases fires a real setTimeout(..., 300) inside a useEffect.
    // Under full-suite load that timer resolves AFTER beforeCount is captured but
    // BEFORE the post-click assertion, injecting exactly 2 pending probation rows
    // (PB-001 pending_manager + PB-002 pending_hr) and making the count flaky.
    // Wait for the last async row (PB-002) to be in the DOM before reading
    // beforeCount — this proves the probation load has fully settled.
    await waitFor(() => screen.getByTestId('assign-to-me-PB-002'));

    const alreadyAssigned = screen.getByTestId('assign-to-me-WF-2026-001');
    expect(alreadyAssigned).toBeDisabled();
    expect(alreadyAssigned).toHaveTextContent('รับแล้ว');

    const beforeCount = screen.getAllByTestId('table-row').length;
    const assignable = screen.getAllByRole('button', { name: /รับงาน/ })[0];
    expect(assignable).toBeEnabled();
    await user.click(assignable);

    expect(assignable).toBeDisabled();
    expect(assignable).toHaveTextContent('รับแล้ว');
    expect(screen.getAllByTestId('table-row').length).toBe(beforeCount);
  });

  it('does not allow taking over rows assigned to another approver', async () => {
    setPersona(['manager'], { userId: 'MGR-OTHER', username: 'Other Manager' });
    const user = userEvent.setup();
    render(<QuickApprovePage />);

    await user.click(screen.getByRole('tab', { name: /ติดตาม/ }));
    const assignedToOther = screen.getByTestId('assign-to-me-WF-2026-001');
    expect(assignedToOther).toBeDisabled();
    expect(assignedToOther).toHaveTextContent('มีผู้รับแล้ว');
  });

  it('shows attachment indicators only when a request has files', () => {
    setPersona(['hr_admin']);
    render(<QuickApprovePage />);

    expect(screen.getByTestId('attachment-indicator-WF-2026-002')).toHaveTextContent('1');
    // STA-147 req-1: WF-2026-004 now carries 3 sample claim PDFs.
    expect(screen.getByTestId('attachment-indicator-WF-2026-004')).toHaveTextContent('3');
    expect(screen.queryByTestId('attachment-indicator-WF-2026-001')).not.toBeInTheDocument();
  });
});
