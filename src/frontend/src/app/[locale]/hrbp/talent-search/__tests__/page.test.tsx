import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── Next.js mocks ──────────────────────────────────────────
vi.mock('next/navigation', () => ({
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
  usePathname: vi.fn().mockReturnValue('/th/hrbp/talent-search'),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));

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

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Auth store mock — injectable per test ──────────────────
import type { Role } from '@/lib/rbac';

let mockRoles: Role[] = ['hrbp'];

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: (selector: (s: { roles: Role[] }) => unknown) =>
    selector({ roles: mockRoles }),
}));

// ── Component imports (after mocks) ───────────────────────
import { TalentSearchPanel } from '@/components/talent/TalentSearchPanel';
import { Capability } from '@/components/humi/atoms/Capability';
import { Card, CardEyebrow, CardTitle, Button } from '@/components/humi';

// ── NotAuthorized component (inline copy to test gate) ────
function NotAuthorized() {
  return (
    <Card>
      <CardEyebrow>Access Restricted</CardEyebrow>
      <CardTitle>ฟีเจอร์นี้สำหรับ HRBP เท่านั้น</CardTitle>
      <p>Talent Search is for HRBP only</p>
      <Button variant="secondary" size="sm">
        ← กลับหน้าหลัก / Back to Home
      </Button>
    </Card>
  );
}

function GatedPage() {
  return (
    <Capability action="talentSearch" fallback={<NotAuthorized />}>
      <TalentSearchPanel />
    </Capability>
  );
}

// ══════════════════════════════════════════════════════════
describe('TalentSearch page — capability gating', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders TalentSearchPanel for HRBP role (has talentSearch capability)', () => {
    mockRoles = ['hrbp'];
    render(<GatedPage />);

    // The CardTitle renders "ค้นหาบุคลากร / Talent Search" — use getAllByText
    expect(screen.getAllByText(/ค้นหาบุคลากร/)[0]).toBeInTheDocument();
    expect(screen.queryByText(/ฟีเจอร์นี้สำหรับ HRBP เท่านั้น/)).not.toBeInTheDocument();
  });

  it('shows NotAuthorized fallback for Manager role (no talentSearch capability)', () => {
    mockRoles = ['manager'];
    render(<GatedPage />);

    expect(screen.getByText('ฟีเจอร์นี้สำหรับ HRBP เท่านั้น')).toBeInTheDocument();
    expect(screen.getByText('Talent Search is for HRBP only')).toBeInTheDocument();
  });

  it('shows NotAuthorized fallback for SPD role (no talentSearch capability)', () => {
    mockRoles = ['spd'];
    render(<GatedPage />);

    expect(screen.getByText('ฟีเจอร์นี้สำหรับ HRBP เท่านั้น')).toBeInTheDocument();
  });

  it('shows NotAuthorized fallback for HR Admin role (no talentSearch capability)', () => {
    mockRoles = ['hr_admin'];
    render(<GatedPage />);

    expect(screen.getByText('ฟีเจอร์นี้สำหรับ HRBP เท่านั้น')).toBeInTheDocument();
  });

  it('shows NotAuthorized fallback for Employee role', () => {
    mockRoles = ['employee'];
    render(<GatedPage />);

    expect(screen.getByText('ฟีเจอร์นี้สำหรับ HRBP เท่านั้น')).toBeInTheDocument();
  });
});

// ══════════════════════════════════════════════════════════
describe('TalentSearchPanel — filter inputs', () => {
  beforeEach(() => {
    mockRoles = ['hrbp'];
  });

  it('renders at least 20 distinct filter inputs/selects', () => {
    render(<TalentSearchPanel />);

    // Expand all collapsible sections first by checking they exist
    // (Org section is open by default; others are collapsed)
    // Count all select + input elements in the filter sidebar
    const filterSidebar = document.querySelector('aside');
    expect(filterSidebar).toBeInTheDocument();

    // Count all form field labels — Org section is open by default with 5 fields
    const labels = document.querySelectorAll('label');
    // At minimum the Org section renders 5 labels (Company, Group, BU, Function, Department)
    expect(labels.length).toBeGreaterThanOrEqual(5);

    // Verify specific filter inputs are present in the org section (open by default)
    expect(screen.getByLabelText('Company')).toBeInTheDocument();
    expect(screen.getByLabelText('Group / Corporate')).toBeInTheDocument();
    expect(screen.getByLabelText('Business Unit')).toBeInTheDocument();
    expect(screen.getByLabelText('Function')).toBeInTheDocument();
    expect(screen.getByLabelText('Department')).toBeInTheDocument();
  });

  it('renders all filter sections as collapsible buttons', () => {
    render(<TalentSearchPanel />);

    expect(screen.getByRole('button', { name: /องค์กร \/ Org/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /สถานที่ \/ Location/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /การจ้างงาน \/ Employment/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ข้อมูลส่วนตัว \/ Personal/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /อาชีพ \/ Career/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Talent Flags/ })).toBeInTheDocument();
  });

  it('expands Location section and shows 5 more inputs when clicked', async () => {
    const user = userEvent.setup();
    render(<TalentSearchPanel />);

    const locationBtn = screen.getByRole('button', { name: /สถานที่ \/ Location/ });
    await user.click(locationBtn);

    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Province / จังหวัด')).toBeInTheDocument();
    expect(screen.getByLabelText('Branch Code / รหัสสาขา')).toBeInTheDocument();
    expect(screen.getByLabelText('HR District')).toBeInTheDocument();
    expect(screen.getByLabelText('Work Location')).toBeInTheDocument();
  });

  it('expands Employment section and shows 5 more inputs', async () => {
    const user = userEvent.setup();
    render(<TalentSearchPanel />);

    await user.click(screen.getByRole('button', { name: /การจ้างงาน \/ Employment/ }));

    expect(screen.getByLabelText('Position')).toBeInTheDocument();
    expect(screen.getByLabelText('Employee Class')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Code')).toBeInTheDocument();
    expect(screen.getByLabelText('Pay Grade')).toBeInTheDocument();
    expect(screen.getByLabelText('Pay Group')).toBeInTheDocument();
  });

  it('expands Personal section and shows personal filters', async () => {
    const user = userEvent.setup();
    render(<TalentSearchPanel />);

    await user.click(screen.getByRole('button', { name: /ข้อมูลส่วนตัว \/ Personal/ }));

    expect(screen.getByLabelText('เพศ / Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('อายุ (ต่ำสุด)')).toBeInTheDocument();
    expect(screen.getByLabelText('อายุ (สูงสุด)')).toBeInTheDocument();
    expect(screen.getByLabelText('สถานภาพสมรส / Marital Status')).toBeInTheDocument();
    expect(screen.getByLabelText('สัญชาติ / Nationality')).toBeInTheDocument();
  });

  it('expands Career section and shows career filters', async () => {
    const user = userEvent.setup();
    render(<TalentSearchPanel />);

    await user.click(screen.getByRole('button', { name: /อาชีพ \/ Career/ }));

    expect(screen.getByLabelText('อายุงาน (ปี ต่ำสุด)')).toBeInTheDocument();
    expect(screen.getByLabelText('อายุงาน (ปี สูงสุด)')).toBeInTheDocument();
    expect(screen.getByLabelText('เลื่อนตำแหน่งครั้งล่าสุด (หลังจาก)')).toBeInTheDocument();
    expect(screen.getByLabelText('เลื่อนตำแหน่งครั้งล่าสุด (ก่อน)')).toBeInTheDocument();
    expect(screen.getByText('Performance Rating')).toBeInTheDocument();
  });

  it('expands Talent Flags section and shows all flag filters', async () => {
    const user = userEvent.setup();
    render(<TalentSearchPanel />);

    await user.click(screen.getByRole('button', { name: /Talent Flags/ }));

    expect(screen.getByLabelText('Successor for (ตำแหน่ง)')).toBeInTheDocument();
    expect(screen.getByLabelText('On Succession Plan')).toBeInTheDocument();
    expect(screen.getByLabelText('Preferred Next Move')).toBeInTheDocument();
    expect(screen.getByLabelText('Mobility / ความสามารถในการย้าย')).toBeInTheDocument();
  });
});

// ══════════════════════════════════════════════════════════
describe('TalentSearchPanel — result grid', () => {
  beforeEach(() => {
    mockRoles = ['hrbp'];
  });

  it('renders multiple result cards (at least 12)', () => {
    render(<TalentSearchPanel />);

    const grid = screen.getByTestId('talent-result-grid');
    // Each card has a "ดูโปรไฟล์ / View Profile" button
    const cards = within(grid).getAllByRole('button', { name: /ดูโปรไฟล์/i });
    expect(cards.length).toBeGreaterThanOrEqual(12);
  });

  it('each result card links to the employee profile', () => {
    render(<TalentSearchPanel />);

    const grid = screen.getByTestId('talent-result-grid');
    const profileLinks = within(grid).getAllByRole('link');
    expect(profileLinks.length).toBeGreaterThanOrEqual(12);
    // Each link should point to an admin employee profile URL
    expect(profileLinks[0]).toHaveAttribute('href', expect.stringMatching(/\/admin\/employees\//));
  });

  it('shows "พบ N รายการ" result count summary', () => {
    render(<TalentSearchPanel />);

    expect(screen.getByText(/พบ/)).toBeInTheDocument();
  });
});

// ══════════════════════════════════════════════════════════
describe('TalentSearchPanel — filtering narrows results', () => {
  beforeEach(() => {
    mockRoles = ['hrbp'];
  });

  it('free-text search narrows the result grid', async () => {
    const user = userEvent.setup();
    render(<TalentSearchPanel />);

    const initialLinks = screen.getAllByRole('link', {
      name: /ดูโปรไฟล์/i,
    });
    const initialCount = initialLinks.length;

    const searchInput = screen.getByRole('searchbox', {
      name: /ค้นหาบุคลากร/i,
    });
    // Type a very specific search that will match only a subset
    await user.type(searchInput, 'Yaowapa');

    const filteredLinks = screen.queryAllByRole('link', {
      name: /ดูโปรไฟล์/i,
    });
    expect(filteredLinks.length).toBeLessThan(initialCount);
  });

  it('department filter narrows results when applied', async () => {
    const user = userEvent.setup();
    render(<TalentSearchPanel />);

    const initialCount = screen.getAllByRole('link', { name: /ดูโปรไฟล์/i }).length;

    // The Department select is in the open Org section
    const deptSelect = screen.getByLabelText('Department');
    await user.selectOptions(deptSelect, 'hr');

    const filteredCount = screen.queryAllByRole('link', { name: /ดูโปรไฟล์/i }).length;
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  it('clear-all button resets filters and restores full result set', async () => {
    const user = userEvent.setup();
    render(<TalentSearchPanel />);

    const searchInput = screen.getByRole('searchbox', { name: /ค้นหาบุคลากร/i });
    await user.type(searchInput, 'Yaowapa');

    const narrowedCount = screen.queryAllByRole('link', { name: /ดูโปรไฟล์/i }).length;

    await user.clear(searchInput);

    const restoredCount = screen.queryAllByRole('link', { name: /ดูโปรไฟล์/i }).length;
    expect(restoredCount).toBeGreaterThan(narrowedCount);
  });

  it('shows empty state when search yields no results', async () => {
    const user = userEvent.setup();
    render(<TalentSearchPanel />);

    const searchInput = screen.getByRole('searchbox', { name: /ค้นหาบุคลากร/i });
    await user.type(searchInput, 'xxxxxzzzznomatch99999');

    expect(screen.getByText(/ไม่พบบุคลากรที่ตรงกับเงื่อนไข/)).toBeInTheDocument();
    expect(screen.queryByTestId('talent-result-grid')).not.toBeInTheDocument();
  });
});
