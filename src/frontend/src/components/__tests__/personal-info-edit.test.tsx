/**
 * personal-info-edit.test.tsx — PersonalInfoTab edit pencil + gate integration (issue #9)
 * Framework: Vitest + @testing-library/react + jsdom
 *
 * AC-1: Personal Info section has visible edit pencil — clicks open gate
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import thMessages from '../../../messages/th.json';
import enMessages from '../../../messages/en.json';

// Mock next/navigation — PersonalInfoTab uses usePathname for locale detection
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/th/profile/me'),
}));

import { PersonalInfoTab } from '../profile/tabs/personal-info';

// ─── Mock employee fixture ─────────────────────────────────────────────────

const MOCK_EMPLOYEE: Record<string, unknown> = {
  personalInfo: {
    firstNameEn: 'Somchai',
    firstNameTh: 'สมชาย',
    lastNameEn: 'Jaidee',
    lastNameTh: 'ใจดี',
    nickname: 'Chai',
    gender: 'male',
    dateOfBirth: '1990-01-15',
    nationality: 'Thai',
    nationalId: '1234567890123',
    maritalStatus: 'single',
    salutationEn: 'Mr',
    salutationTh: 'นาย',
    otherTitleTh: 'อ.',
    middleNameEn: 'Prasit',
    maritalStatusSince: '2020-06-01',
  },
  contactInfo: {
    businessEmail: 'somchai@central.co.th',
    personalEmail: 'somchai@gmail.com',
    businessPhone: '+6626000001',
    personalMobile: '+66812345678',
    homePhone: '',
  },
  addresses: [
    {
      id: 'addr-1',
      addressType: 'permanent',
      addressLine1: '1 Silom Rd',
      addressLine2: '',
      subDistrict: 'Si Lom',
      district: 'Bang Rak',
      province: 'Bangkok',
      postalCode: '10500',
      country: 'Thailand',
    },
  ],
  emergencyContacts: [],
  dependents: [],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderWithThLocale() {
  return render(
    <NextIntlClientProvider locale="th" messages={thMessages}>
      <PersonalInfoTab employee={MOCK_EMPLOYEE} />
    </NextIntlClientProvider>,
  );
}

function renderWithEnLocale() {
  vi.mocked(usePathname).mockReturnValueOnce('/en/profile/me');
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <PersonalInfoTab employee={MOCK_EMPLOYEE} />
    </NextIntlClientProvider>,
  );
}

// ─── AC-1: Edit pencil visible in Personal Information section ────────────────

describe('AC-1: PersonalInfoTab — edit pencil visible', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('renders at least one edit pencil button in Personal Info section (AC-1)', () => {
    renderWithThLocale();
    // gate.editAria = "แก้ไขข้อมูล"
    const pencilBtns = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i });
    expect(pencilBtns.length).toBeGreaterThan(0);
  });

  it('edit pencil has correct aria-label from gate.editAria (AC-1)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    expect(btn).toHaveAttribute('aria-label', 'แก้ไขข้อมูล');
  });

  it('edit pencil renders an SVG Pencil icon (AC-1)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    const svg = btn.querySelector('svg');
    expect(svg).not.toBeNull();
  });
});

// ─── AC-1: Click edit pencil → gate opens ─────────────────────────────────────

describe('AC-1: PersonalInfoTab — click edit pencil opens gate', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('gate is closed (date picker absent) before pencil click (AC-1)', () => {
    renderWithThLocale();
    // gate.title only visible when gate is open
    expect(screen.queryByText('วันที่การแก้ไขนี้มีผล')).toBeNull();
  });

  it('clicking edit pencil reveals gate.title — gate opened (AC-1)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    fireEvent.click(btn);
    // gate.title = "วันที่การแก้ไขนี้มีผล"
    expect(screen.getByText('วันที่การแก้ไขนี้มีผล')).toBeInTheDocument();
  });

  it('clicking edit pencil shows date input field (AC-1)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    fireEvent.click(btn);
    expect(document.querySelector('input[type="date"]')).not.toBeNull();
  });

  it('gate shows section title "ข้อมูลส่วนตัว" (personal.basicInfo) (AC-1)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    fireEvent.click(btn);
    // sectionTitle passed as t('personal.basicInfo') = "ข้อมูลส่วนตัว"
    // It will appear in the h2 inside the gate
    const headings = screen.getAllByRole('heading');
    const gateHeading = headings.find((h) => h.textContent?.includes('ข้อมูลส่วนตัว'));
    expect(gateHeading).toBeTruthy();
  });

  it('gate shows Continue button after pencil click (AC-1 + AC-3)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    fireEvent.click(btn);
    expect(screen.getByRole('button', { name: /ต่อไป/i })).toBeInTheDocument();
  });

  it('gate Cancel button closes gate (AC-1 + AC-7)', () => {
    renderWithThLocale();
    const btn = screen.getAllByRole('button', { name: /แก้ไขข้อมูล/i })[0];
    fireEvent.click(btn);
    // Gate is now open — cancel it
    fireEvent.click(screen.getByRole('button', { name: /ยกเลิก/i }));
    // Gate closed — date picker gone
    expect(document.querySelector('input[type="date"]')).toBeNull();
  });
});

// ─── EN locale variant ────────────────────────────────────────────────────────

describe('AC-1: PersonalInfoTab — EN locale edit pencil opens gate (AC-1)', () => {
  it('EN: edit pencil visible with "Edit section" aria-label', () => {
    renderWithEnLocale();
    const pencilBtns = screen.getAllByRole('button', { name: /edit section/i });
    expect(pencilBtns.length).toBeGreaterThan(0);
  });

  it('EN: click pencil opens gate with EN copy', () => {
    renderWithEnLocale();
    const btn = screen.getAllByRole('button', { name: /edit section/i })[0];
    fireEvent.click(btn);
    expect(screen.getByText('When should these changes take effect?')).toBeInTheDocument();
  });
});

// ─── Edge cases ───────────────────────────────────────────────────────────────

describe('PersonalInfoTab edit integration — edge cases', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/th/profile/me');
  });

  it('tab renders without crash when employee has minimal data (AC-1)', () => {
    const minEmployee: Record<string, unknown> = {
      personalInfo: { firstNameEn: 'Test', lastNameEn: 'User' },
      contactInfo: {},
      addresses: [],
      emergencyContacts: [],
      dependents: [],
    };
    expect(() =>
      render(
        <NextIntlClientProvider locale="th" messages={thMessages}>
          <PersonalInfoTab employee={minEmployee} />
        </NextIntlClientProvider>,
      ),
    ).not.toThrow();
  });
});
