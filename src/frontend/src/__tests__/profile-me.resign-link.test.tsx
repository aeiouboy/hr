/**
 * profile-me.resign-link.test.tsx
 * AC-5: /profile/me Employment tab มี Link ไปยัง /resignation พร้อม Thai label
 *       ตรวจ href pattern + visible Thai label "ดูคำขอลาออก"
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';

// ── UUID stub ──────────────────────────────────────────────────────────────────
let uuidCounter = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `profile-uuid-${++uuidCounter}`,
});

// ── localStorage mock ─────────────────────────────────────────────────────────
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

// ── next-intl mock ────────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      // tab labels
      tabPersonal: 'ข้อมูลส่วนตัว',
      tabJob: 'การจ้างงาน',
      tabEmergency: 'ผู้ติดต่อฉุกเฉิน',
      tabDocs: 'เอกสาร',
      tabTax: 'ภาษี / ข้อมูลทางการเงิน',
      // personal section
      personalTitle: 'รายละเอียดพื้นฐาน',
      personalEyebrow: 'ข้อมูลส่วนตัว',
      // job section headings
      positionTitle: 'ตำแหน่งงาน',
      orgTitle: 'โครงสร้างองค์กร',
      salaryTitle: 'ค่าตอบแทน',
      // resignation section — the keys we are asserting on
      resignationSectionEyebrow: 'การลาออก',
      resignationSectionDesc: 'ยื่นคำขอลาออกและติดตามสถานะ',
      resignationSectionLink: 'ดูคำขอลาออก',
      // misc keys used elsewhere in page
      editProfile: 'แก้ไข',
      saveProfile: 'บันทึก',
      cancelEdit: 'ยกเลิก',
      pendingChangesTitle: 'คำขอรอการอนุมัติ',
      noPendingChanges: 'ไม่มีคำขอรอดำเนินการ',
      adminModeLabel: 'โหมดผู้ดูแล',
      adminModeOff: 'ปิด',
      adminModeOn: 'เปิด',
      approveBtn: 'อนุมัติ',
      rejectBtn: 'ปฏิเสธ',
      bankTitle: 'บัญชีธนาคาร',
      bankEyebrow: 'ธนาคาร',
      addressTitle: 'ที่อยู่',
      addressEyebrow: 'ที่อยู่',
      contactTitle: 'วิธีติดต่อคุณ',
      contactEyebrow: 'ข้อมูลการติดต่อ',
      emergencyTitle: 'ผู้ติดต่อฉุกเฉิน',
      'sections.address': 'ที่อยู่',
      'sections.contact': 'ข้อมูลติดต่อ',
      'sections.bank': 'บัญชีธนาคาร',
      'sections.emergencyContact': 'ผู้ติดต่อฉุกเฉิน',
      'sections.personal': 'ข้อมูลส่วนตัว',
      'sections.termination': 'การลาออก',
    };
    return map[key] ?? key;
  },
}));

// ── next/navigation mock ──────────────────────────────────────────────────────
vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/profile/me'),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
}));

// ── next/link mock — render as <a href> ───────────────────────────────────────
vi.mock('next/link', () => ({
  default: ({ href, children, className, ...props }: { href: string; children: React.ReactNode; className?: string; [k: string]: unknown }) => (
    <a href={href} className={className} {...props}>{children}</a>
  ),
}));

import { useHumiProfileStore } from '@/stores/humi-profile-slice';

function resetStore() {
  localStorageMock.clear();
  useHumiProfileStore.setState({
    activeTab: 'employment',    // Employment tab เปิดอยู่ → job panel แสดง
    isEditing: false,
    draft: {
      nickname: 'จงรักษ์', phone: '', personalEmail: '', address: '',
      emergencyContacts: [],
      addressStructured: { houseNo: '', village: '', soi: '', road: '', subdistrict: '', district: '', province: '', postalCode: '' },
      phonesArr: [], emailsArr: [],
      bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null },
    },
    saved: {
      nickname: 'จงรักษ์', phone: '', personalEmail: '', address: '',
      emergencyContacts: [],
      addressStructured: { houseNo: '', village: '', soi: '', road: '', subdistrict: '', district: '', province: '', postalCode: '' },
      phonesArr: [], emailsArr: [],
      bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null },
    },
    attachments: [],
    pendingChanges: [],
    adminMode: false,
  });
}

beforeEach(() => {
  uuidCounter = 0;
  resetStore();
});

afterEach(() => {
  vi.clearAllMocks();
  resetStore();
});

// ════════════════════════════════════════════════════════════════════════════
// AC-5: Link ไปยัง /resignation ต้องปรากฏใน Employment tab
// ════════════════════════════════════════════════════════════════════════════

describe('AC-5: profile/me Employment tab มี link ไปยัง /resignation', () => {
  it('AC-5: ต้องมี <a> ที่ href ประกอบด้วย "resignation"', async () => {
    const { default: ProfileMePage } = await import(
      '@/app/[locale]/profile/me/page'
    );
    render(<ProfileMePage />);

    // AC-5: ค้นหา link ที่ href มี "resignation" path
    const links = screen.getAllByRole('link');
    const resignLink = links.find((l) =>
      (l.getAttribute('href') ?? '').includes('resignation'),
    );
    expect(resignLink).toBeDefined();
  });

  it('AC-5: resignation link ต้องมี Thai label (ดูคำขอลาออก)', async () => {
    const { default: ProfileMePage } = await import(
      '@/app/[locale]/profile/me/page'
    );
    render(<ProfileMePage />);

    // AC-5: getByRole('link') + Thai label text (Ken U1: visible Thai label)
    const resignLink = screen.getByRole('link', { name: /ดูคำขอลาออก/i });
    expect(resignLink).toBeInTheDocument();
  });

  it('AC-5: resignation link href ต้องมี path "/resignation"', async () => {
    const { default: ProfileMePage } = await import(
      '@/app/[locale]/profile/me/page'
    );
    render(<ProfileMePage />);

    const resignLink = screen.getByRole('link', { name: /ดูคำขอลาออก/i });
    expect(resignLink.getAttribute('href')).toMatch(/resignation/);
  });
});
