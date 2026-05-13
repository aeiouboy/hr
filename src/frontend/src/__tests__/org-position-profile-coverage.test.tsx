import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

vi.stubGlobal('crypto', {
  randomUUID: () => 'org-position-profile-test-uuid',
});

const routerReplace = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/profile/me'),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    replace: routerReplace,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'th',
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      subtitle: 'รหัสพนักงาน',
      statusActive: 'กำลังทำงาน',
      tabPersonal: 'ข้อมูลส่วนตัว',
      tabJob: 'ตำแหน่งงาน',
      tabOrgChart: 'ผังองค์กร',
      tabCompensation: 'ค่าตอบแทน',
      tabEmergency: 'ติดต่อฉุกเฉิน',
      tabBenefits: 'สิทธิ์ของฉัน',
      tabDocs: 'เอกสาร',
      tabTax: 'ภาษี',
      profileEdit: 'แก้ไขข้อมูล',
      profileCancelEdit: 'ยกเลิก',
      save: 'บันทึกการเปลี่ยนแปลง',
      personalEyebrow: 'ข้อมูลส่วนตัว',
      personalTitle: 'รายละเอียดพื้นฐาน',
      jobEyebrow: 'ตำแหน่งปัจจุบัน',
      jobTitle: 'ข้อมูลตำแหน่งงาน',
      historyEyebrow: 'ประวัติการทำงาน',
      orgChartProfileEyebrow: 'ผังองค์กร',
      orgChartProfileCta: 'ดูผังองค์กร',
      orgChartProfileHelp: 'เปิดผังองค์กรจากโปรไฟล์พนักงาน',
      emergencyTitle: 'ผู้ติดต่อกรณีฉุกเฉิน',
      emergencyHelp: 'กรุณาให้ข้อมูลผู้ติดต่อ',
      benefitsTitle: 'สวัสดิการของฉัน',
      benefitsHelp: 'ดูสิทธิ์สวัสดิการ',
      docsTitle: 'เอกสารของฉัน',
      taxTitle: 'แบบฟอร์มภาษี',
      'sections.bank': 'บัญชีธนาคาร',
      'field.disabilityStatus': 'สถานะความพิการ',
      'changeRequest.pending': 'รอดำเนินการ',
    };
    return map[key] ?? key;
  },
}));

vi.mock('@/stores/auth-store', () => {
  const state = {
    isAuthenticated: true,
    userId: 'EMP001',
    username: 'จงรักษ์ ทานากะ',
    roles: ['employee'] as string[],
    _hasHydrated: true,
    email: 'jongrak@central.co.th',
    displayName: 'จงรักษ์ ทานากะ',
    initials: 'จท',
    setUser: vi.fn(),
    setAuth: vi.fn(),
    clearAuth: vi.fn(),
    setHasHydrated: vi.fn(),
  };
  const useAuthStore = Object.assign(
    (selector?: (s: typeof state) => unknown) => (selector ? selector(state) : state),
    { getState: () => state, setState: vi.fn(), subscribe: vi.fn() },
  );
  return { useAuthStore };
});

beforeEach(async () => {
  localStorage.clear();
  routerReplace.mockClear();
  const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');
  useHumiProfileStore.setState({ activeTab: 'employment', isEditing: false });
});

describe('org/position coverage surfaces', () => {
  it('organization admin page exposes coverage metrics and navigation to positions/org chart', async () => {
    const { default: OrganizationPage } = await import('@/app/[locale]/admin/organization/page');

    await act(async () => {
      render(<OrganizationPage />);
    });

    expect(screen.getByText('หน่วยงานทั้งหมด')).toBeInTheDocument();
    expect(screen.getByText('หน่วยงานใช้งาน')).toBeInTheDocument();

    const positionsLink = screen.getByRole('link', { name: /ตำแหน่งงาน/i });
    expect(positionsLink).toHaveAttribute('href', '/th/admin/positions');

    const orgChartLink = screen.getByRole('link', { name: /ดูผังองค์กร/i });
    expect(orgChartLink).toHaveAttribute('href', '/th/org-chart');

    const user = userEvent.setup();
    await user.type(screen.getByLabelText('ค้นหาหน่วยงาน'), 'NO-MATCH-ORG-UNIT');
    expect(screen.getByText(/ไม่พบหน่วยงานที่ตรงกับ/)).toBeInTheDocument();

    await user.clear(screen.getByLabelText('ค้นหาหน่วยงาน'));
    await user.click(screen.getByRole('button', { name: 'เพิ่มหน่วยงาน' }));
    expect(screen.queryByText(/SF:|BRD|FODepartment|FOBusinessUnit|startDate|endDate|master data|workflow HR|default headcount|master position/)).not.toBeInTheDocument();
  });

  it('positions admin page exposes position metrics and navigation to organization/org chart', async () => {
    const { default: PositionsPage } = await import('@/app/[locale]/admin/positions/page');

    await act(async () => {
      render(<PositionsPage />);
    });

    expect(screen.getByText('ตำแหน่งใช้งาน')).toBeInTheDocument();
    expect(screen.getByText('ตำแหน่งว่าง')).toBeInTheDocument();
    expect(screen.getByText('อัตรากำลังตามแผน')).toBeInTheDocument();

    const orgLink = screen.getByRole('link', { name: /โครงสร้างหน่วยงาน/i });
    expect(orgLink).toHaveAttribute('href', '/th/admin/organization');

    const orgChartLink = screen.getByRole('link', { name: /ดูผังองค์กร/i });
    expect(orgChartLink).toHaveAttribute('href', '/th/org-chart');

    const user = userEvent.setup();
    await user.click(screen.getAllByRole('button', { name: /แก้ไขตำแหน่ง/i })[0]);
    expect(screen.queryByText(/SF:|BRD|FODepartment|FOBusinessUnit|startDate|endDate|master data|workflow HR|default headcount|master position/)).not.toBeInTheDocument();
  });
});

describe('profile org chart entry', () => {
  it('employment profile context links employees to the org chart route', async () => {
    const { default: ProfileMePage } = await import('@/app/[locale]/profile/me/page');

    await act(async () => {
      render(<ProfileMePage initialTab="employment" />);
    });

    const jobPanel = screen.getByText('ข้อมูลตำแหน่งงาน').closest('.humi-card')?.parentElement ?? document.body;
    expect(within(jobPanel).getByText('ผังองค์กร')).toBeInTheDocument();
    const orgChartButton = within(jobPanel).getByRole('button', { name: /ดูผังองค์กร/i });
    await userEvent.setup().click(orgChartButton);
    expect(screen.getByRole('tab', { name: 'ผังองค์กร' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByLabelText('ค้นหาพนักงาน')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: 'จงรักษ์ ทานากะ', level: 2 }).length).toBeGreaterThanOrEqual(1);
  });

  it('canonical /profile route shows the employment profile org chart entry', async () => {
    const { default: ProfilePage } = await import('@/app/[locale]/profile/page');

    await act(async () => {
      render(<ProfilePage />);
    });

    expect(screen.getByRole('tab', { name: 'ผังองค์กร' })).toBeInTheDocument();
    expect(screen.getByText('ข้อมูลตำแหน่งงาน')).toBeInTheDocument();
    await userEvent.setup().click(screen.getByRole('button', { name: /ดูผังองค์กร/i }));
    expect(screen.getByRole('tab', { name: 'ผังองค์กร' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByLabelText('ค้นหาพนักงาน')).toBeInTheDocument();
  });

  it('org chart route remains reachable', async () => {
    const { default: OrgChartPage } = await import('@/app/[locale]/org-chart/page');

    await act(async () => {
      render(<OrgChartPage />);
    });

    expect(screen.getAllByText('ผังองค์กร').length).toBeGreaterThan(0);
    expect(screen.getByLabelText('ค้นหาพนักงาน')).toBeInTheDocument();
  });
});
