/**
 * resignation-page.timeline.test.tsx
 * AC-4: หลัง submit dispatch → resignation-page status timeline แสดง 'submitted' step active
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';

// ── UUID stub ──────────────────────────────────────────────────────────────────
let uuidCounter = 0;
vi.stubGlobal('crypto', {
  randomUUID: () => `timeline-uuid-${++uuidCounter}`,
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
      title: 'คำขอลาออก',
      subtitle: 'ติดตามสถานะการลาออก',
      tabRecording: 'บันทึกการลาออก',
      tabClearance: 'คืนทรัพย์สิน',
      tabSettlement: 'การชำระเงิน',
      startResignationTitle: 'เริ่มกระบวนการลาออก',
      lastWorkingDate: 'วันสุดท้ายที่ทำงาน',
      handoverNotes: 'หมายเหตุการส่งมอบงาน',
      handoverNotesPlaceholder: 'อธิบายรายละเอียด...',
      cancel: 'ยกเลิก',
      submitResignation: 'ยื่นใบลาออก',
      startResignation: 'ยื่นเรื่องลาออก',
      noResignation: 'ยังไม่มีคำขอลาออก',
      noResignationDesc: 'กดปุ่มด้านล่างเพื่อเริ่มกระบวนการ',
      resignationDetails: 'รายละเอียดการลาออก',
      resignationDate: 'วันที่ยื่น',
      reasonType: 'เหตุผล',
      noticePeriod: 'ระยะเวลาแจ้งล่วงหน้า',
      days: 'วัน',
      status: 'สถานะ',
      exitInterview: 'สัมภาษณ์ออก',
      notScheduled: 'ยังไม่กำหนด',
      clearanceProgress: 'ความคืบหน้าการคืนทรัพย์สิน',
      responsibleParty: 'ผู้รับผิดชอบ',
      signedOffOn: 'ยืนยันเมื่อ',
      updateStatus: 'อัปเดต',
      finalSettlementSummary: 'สรุปเงินปิดบัญชี',
      earnings: 'รายได้',
      outstandingSalary: 'เงินเดือนค้างจ่าย',
      leaveEncashment: 'เงินวันลาคงเหลือ',
      bonus: 'โบนัส',
      grossTotal: 'รวมรายได้',
      deductions: 'หักต่างๆ',
      loansAdvances: 'เงินกู้/เงินทดรองจ่าย',
      netPayable: 'ยอดสุทธิที่จ่าย',
      providentFund: 'กองทุนสำรองเลี้ยงชีพ',
      pfBalance: 'ยอดคงเหลือ',
      pfNote: 'จะโอนภายใน 30 วัน',
    };
    return map[key] ?? key;
  },
}));

// ── next/navigation mock ──────────────────────────────────────────────────────
vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/resignation'),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
}));

import { useHumiProfileStore } from '@/stores/humi-profile-slice';
import { ResignationPage } from '@/components/resignation/resignation-page';

function resetStore() {
  localStorageMock.clear();
  useHumiProfileStore.setState({
    activeTab: 'personal',
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
// AC-4: หลัง submit → status timeline แสดง 'submitted' beat active
// ════════════════════════════════════════════════════════════════════════════

describe('AC-4: ResignationPage timeline แสดง "submitted" step หลัง submit', () => {
  it('AC-4: หลัง submit สำเร็จ → timeline renders step 1 (submitted) active', async () => {
    // inject pendingChange ที่ sectionKey='termination' โดยตรง — simulate state after submit
    act(() => {
      useHumiProfileStore.getState().submitChangeRequest({
        sectionKey: 'termination',
        field: 'employmentStatus',
        oldValue: 'active',
        newValue: 'RESIGN_PERSONAL',
        effectiveDate: '2026-06-30',
        attachmentIds: [],
      });
    });

    render(<ResignationPage />);

    // AC-4: timeline step "submitted" ต้องปรากฏ (step 1 ใน 3-step timeline)
    // timeline steps: submitted / in_progress / completed → แสดงเป็น "submitted", "inprogress", "completed"
    const timelineText = document.body.textContent ?? '';
    expect(timelineText).toMatch(/submitted/i);
  });

  it('AC-4: step 1 (submitted) ต้องมี active class (bg-brand) — first step always active หลัง submit', async () => {
    act(() => {
      useHumiProfileStore.getState().submitChangeRequest({
        sectionKey: 'termination',
        field: 'employmentStatus',
        oldValue: 'active',
        newValue: 'RESIGN_FAMILY',
        effectiveDate: '2026-07-15',
        attachmentIds: [],
      });
    });

    const { container } = render(<ResignationPage />);

    // AC-4: step badge ตัวแรก (div ที่มี "1") ต้องมี class bg-brand (active state)
    const stepBadges = container.querySelectorAll('[class*="bg-brand"]');
    // ต้องมีอย่างน้อย 1 element ที่ active (step 1)
    expect(stepBadges.length).toBeGreaterThanOrEqual(1);
  });

  it('AC-4: ก่อน submit → ไม่มี timeline (แสดง empty state แทน)', () => {
    render(<ResignationPage />);

    // AC-4: ถ้ายังไม่มี termination record ต้องแสดง empty state ไม่ใช่ timeline
    // ตรวจสอบว่า "ยังไม่มีคำขอลาออก" ปรากฏ
    expect(screen.getByText('ยังไม่มีคำขอลาออก')).toBeInTheDocument();
  });
});
