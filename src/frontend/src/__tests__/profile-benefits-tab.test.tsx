import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

const navigationMocks = vi.hoisted(() => ({
  searchParams: new URLSearchParams('tab=benefits'),
}));

vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/profile/me'),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
  useSearchParams: vi.fn(() => navigationMocks.searchParams),
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

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      subtitle: 'พนักงาน',
      save: 'บันทึก',
      statusActive: 'กำลังทำงาน',
      tabPersonal: 'ข้อมูลส่วนตัว',
      tabJob: 'ตำแหน่งและค่าตอบแทน',
      tabEmergency: 'ติดต่อฉุกเฉิน',
      tabDocs: 'เอกสาร',
      tabTax: 'ภาษี',
      tabBenefits: 'สิทธิ์ของฉัน',
      benefitsTitle: 'สวัสดิการของฉัน',
      benefitsHelp: 'ดูสิทธิ์ที่ลงทะเบียนและประวัติคำขอล่าสุดจากหน้าโปรไฟล์เดียว',
      benefitsPlansTitle: 'แผนที่ลงทะเบียน',
      benefitsAllowancesTitle: 'วงเงินคงเหลือ',
      benefitsDependentsTitle: 'ผู้รับสิทธิ์ร่วม',
      benefitsCovered: 'ได้รับความคุ้มครอง',
      benefitsNotCovered: 'ไม่ได้รับความคุ้มครอง',
      benefitsClaimsTitle: 'ประวัติคำขอล่าสุด',
      benefitsHubLink: 'ดูรายละเอียดสวัสดิการ',
      personalEyebrow: 'ข้อมูลส่วนตัว',
      personalTitle: 'รายละเอียดพื้นฐาน',
      profileEdit: 'แก้ไข',
      profileCancelEdit: 'ยกเลิก',
      emergencyHelp: 'กรุณาให้ข้อมูลอย่างน้อย 1 คน',
      downloadCta: 'ดาวน์โหลด',
    };
    return map[key] ?? key;
  },
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

describe('/profile/me benefits tab', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    navigationMocks.searchParams = new URLSearchParams('tab=benefits');
  });

  it('opens benefits as an in-profile tab from ?tab=benefits', async () => {
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');

    render(<Page />);

    await waitFor(() => {
      expect(useHumiProfileStore.getState().activeTab).toBe('benefits');
    });

    expect(screen.getByRole('tab', { name: 'สิทธิ์ของฉัน' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('heading', { name: 'สวัสดิการของฉัน' })).toBeInTheDocument();
    expect(screen.queryByText('SF: EmpJob.employeeGroup')).not.toBeInTheDocument();
  });

  it('keeps /profile/me as the personal profile entry when no tab query is present', async () => {
    navigationMocks.searchParams = new URLSearchParams();
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');

    useHumiProfileStore.setState({ activeTab: 'benefits' });
    render(<Page />);

    await waitFor(() => {
      expect(useHumiProfileStore.getState().activeTab).toBe('personal');
    });

    expect(screen.getByRole('tab', { name: 'ข้อมูลส่วนตัว' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tab', { name: 'สิทธิ์ของฉัน' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
    expect(screen.queryByRole('heading', { name: 'สวัสดิการของฉัน' })).not.toBeInTheDocument();
  });

  it('keeps Profile Benefits summary-only and sends service starts to งานสวัสดิการ', async () => {
    const { default: Page } = await import('@/app/[locale]/profile/me/page');
    const { useHumiProfileStore } = await import('@/stores/humi-profile-slice');

    render(<Page />);

    await waitFor(() => {
      expect(useHumiProfileStore.getState().activeTab).toBe('benefits');
    });

    expect(screen.getByText('ภาพรวมสิทธิ์สวัสดิการ')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'ไปที่งานสวัสดิการ' })).toHaveAttribute(
      'href',
      '/th/benefits-hub',
    );
    const benefitsHubLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === '/th/benefits-hub');
    expect(benefitsHubLinks).toHaveLength(1);
    expect(screen.queryByLabelText('เลขที่ใบเสร็จ/เอกสาร')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/เหตุผลหรือบริการที่ต้องการพบแพทย์/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText('รายได้เพิ่มเติมคาดการณ์ทั้งปี')).not.toBeInTheDocument();
    expect(screen.queryByText(/EBO|Employee Benefit Obligation/)).not.toBeInTheDocument();
    expect(screen.queryByTestId('benefit-attachment-field')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'ส่งคำขอใบส่งตัว' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'ส่งคำขอเบิก' })).not.toBeInTheDocument();
  });
});
