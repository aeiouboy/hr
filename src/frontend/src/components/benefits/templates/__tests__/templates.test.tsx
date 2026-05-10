/**
 * templates.test.tsx — Vitest + React Testing Library
 * Covers the 7 acceptance criteria listed in the task spec.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

// ── next-intl mock ────────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useLocale: vi.fn().mockReturnValue('th'),
  useTranslations: () => (key: string) => key,
}));

// ── next/navigation mock ──────────────────────────────────────────────────────
vi.mock('next/navigation', () => ({
  usePathname: vi.fn().mockReturnValue('/th/benefits-hub'),
  useParams: vi.fn().mockReturnValue({ locale: 'th' }),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
}));

// ── Capability mock — let everything through in tests ─────────────────────────
vi.mock('@/hooks/use-capabilities', () => ({
  useCapabilities: () => ({
    canSee: () => true,
    canDo: () => true,
    entities: {},
    actions: {},
    queueScope: 'enterprise',
  }),
}));

// ── humi-profile-slice mock (FileUploadField dependency) ─────────────────────
const mockAddAttachment = vi.fn().mockReturnValue('att-test-id');
const mockRemoveAttachment = vi.fn();

vi.mock('@/stores/humi-profile-slice', () => ({
  useHumiProfileStore: (selector: (s: unknown) => unknown) =>
    selector({ addAttachment: mockAddAttachment, removeAttachment: mockRemoveAttachment }),
}));

// ── auth-store mock (Capability dependency) ───────────────────────────────────
vi.mock('@/stores/auth-store', () => ({
  useAuthStore: (selector: (s: unknown) => unknown) =>
    selector({ roles: ['hr_admin'] }),
}));

// ── lucide-react mock — pass through all icons as stub spans ──────────────────
// Use importOriginal so any icon QuickActionsTile or other humi primitives need
// is automatically satisfied without listing them all by name.
vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('lucide-react')>();
  const stub = () => React.createElement('span', { 'data-testid': 'icon-stub' });
  // Replace every named export that is a component with the stub
  const mocked: Record<string, unknown> = {};
  for (const key of Object.keys(actual)) {
    mocked[key] = stub;
  }
  return mocked;
});

// ── cn mock ───────────────────────────────────────────────────────────────────
vi.mock('@/lib/utils', () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}));

// ── Import components AFTER mocks ─────────────────────────────────────────────
import { SimpleClaimForm } from '../SimpleClaimForm';
import { HospitalClaimForm } from '../HospitalClaimForm';
import { RecordsFlatForm } from '../RecordsFlatForm';
import { RecordsComputedView } from '../RecordsComputedView';
import { LifecycleAdminForm } from '../LifecycleAdminForm';
import {
  pickTemplate,
  RecordsDependentForm,
} from '../index';

// ── Plan fixtures ──────────────────────────────────────────────────────────────
import {
  BENEFIT_PLAN_REGISTRY,
  getPlan,
} from '@/data/benefits/plan-registry';

const OPD_PLAN = getPlan('BE-MED-001')!;   // simple-claim, requiresReceipt=true
const IPD_REFERRAL_PLAN = getPlan('BE-MED-002')!; // hospital-claim, requiresReceipt=false
const IPD_DEPENDENT_PLAN = getPlan('BE-MED-004')!; // hospital-claim, requiresDependent=true
const FUNERAL_EMPLOYEE_PLAN = getPlan('BE-FUN-001')!; // records-flat
const FUNERAL_SPOUSE_PLAN = getPlan('BE-FUN-002')!; // records-dependent
const LIFE_INFO_PLAN = getPlan('BE-LIF-001')!; // records-computed
const LIFECYCLE_PLAN = getPlan('BE-CYC-001')!; // lifecycle-admin

// ─────────────────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  mockAddAttachment.mockReturnValue('att-test-id');
});

// ── 1. SimpleClaimForm: receipt + amount fields when requiresReceipt=true ─────

describe('SimpleClaimForm', () => {
  it('renders receipt no and amount fields when requiresReceipt=true', () => {
    render(<SimpleClaimForm plan={OPD_PLAN} />);

    expect(screen.getByLabelText(/เลขที่ใบเสร็จ/)).toBeInTheDocument();
    expect(screen.getByLabelText(/วันที่ใบเสร็จ/)).toBeInTheDocument();
    expect(screen.getByLabelText(/จำนวนเงินตามใบเสร็จ/)).toBeInTheDocument();
  });

  it('shows the approval chain stages', () => {
    render(<SimpleClaimForm plan={OPD_PLAN} />);
    // OPD plan has ['hrbp','spd','hr_admin']
    expect(screen.getByText('HRBP')).toBeInTheDocument();
    expect(screen.getByText('SPD')).toBeInTheDocument();
    expect(screen.getByText('HR Admin')).toBeInTheDocument();
  });

  it('shows annual limit when set', () => {
    render(<SimpleClaimForm plan={OPD_PLAN} />);
    expect(screen.getByText(/วงเงินรายปี/)).toBeInTheDocument();
  });
});

// ── 2. HospitalClaimForm: receipt fields hidden when requiresReceipt=false ────

describe('HospitalClaimForm', () => {
  it('hides receipt fields when requiresReceipt=false (IPD with referral)', () => {
    render(<HospitalClaimForm plan={IPD_REFERRAL_PLAN} />);

    // Hospital name must be present
    expect(screen.getByLabelText(/ชื่อโรงพยาบาล/)).toBeInTheDocument();

    // Receipt fields must NOT be rendered
    expect(screen.queryByLabelText(/เลขที่ใบเสร็จ/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/จำนวนเงิน/)).not.toBeInTheDocument();
  });

  it('shows receipt fields when requiresReceipt=true (IPD self-paid dep)', () => {
    render(<HospitalClaimForm plan={IPD_DEPENDENT_PLAN} />);
    expect(screen.getByLabelText(/เลขที่ใบเสร็จ/)).toBeInTheDocument();
  });

  // ── 3. HospitalClaimForm: dependent picker shown when requiresDependent=true

  it('shows dependent picker when requiresDependent=true', () => {
    render(<HospitalClaimForm plan={IPD_DEPENDENT_PLAN} />);
    // The select has a label containing "ผู้รับสิทธิ์"
    expect(screen.getByLabelText(/ผู้รับสิทธิ์/)).toBeInTheDocument();
  });

  it('hides dependent picker when requiresDependent=false', () => {
    render(<HospitalClaimForm plan={IPD_REFERRAL_PLAN} />);
    expect(screen.queryByLabelText(/ผู้รับสิทธิ์/)).not.toBeInTheDocument();
  });
});

// ── 4. RecordsFlatForm: no approval chain, shows "Recorded by HR" ─────────────

describe('RecordsFlatForm', () => {
  it('shows "บันทึกโดย HR" instead of an approval chain', () => {
    render(<RecordsFlatForm plan={FUNERAL_EMPLOYEE_PLAN} />);
    expect(screen.getByText('บันทึกโดย HR')).toBeInTheDocument();
  });

  it('does NOT render HRBP/SPD approval stage labels', () => {
    render(<RecordsFlatForm plan={FUNERAL_EMPLOYEE_PLAN} />);
    expect(screen.queryByText('HRBP')).not.toBeInTheDocument();
    expect(screen.queryByText('SPD')).not.toBeInTheDocument();
  });

  it('renders employee ID and event date fields', () => {
    render(<RecordsFlatForm plan={FUNERAL_EMPLOYEE_PLAN} />);
    expect(screen.getByLabelText(/รหัสพนักงาน/)).toBeInTheDocument();
    expect(screen.getByLabelText(/วันที่เหตุการณ์/)).toBeInTheDocument();
  });
});

// ── RecordsDependentForm ──────────────────────────────────────────────────────

describe('RecordsDependentForm', () => {
  it('shows dependent name and relationship fields', () => {
    render(<RecordsDependentForm plan={FUNERAL_SPOUSE_PLAN} />);
    expect(screen.getByLabelText(/ชื่อบุคคลในครอบครัว/)).toBeInTheDocument();
    // Use getAllByLabelText since the FileUploadField "หลักฐานความสัมพันธ์" label
    // also matches — assert at least the <select> is present
    const matches = screen.getAllByLabelText(/ความสัมพันธ์/);
    const selectEl = matches.find((el) => el.tagName === 'SELECT');
    expect(selectEl).toBeInTheDocument();
  });

  it('shows "บันทึกโดย HR" — no chain for records plans', () => {
    render(<RecordsDependentForm plan={FUNERAL_SPOUSE_PLAN} />);
    expect(screen.getByText('บันทึกโดย HR')).toBeInTheDocument();
  });
});

// ── 5. RecordsComputedView: read-only, no input elements ──────────────────────

describe('RecordsComputedView', () => {
  it('is read-only — renders no input, select, or textarea elements', () => {
    render(<RecordsComputedView plan={LIFE_INFO_PLAN} />);

    expect(document.querySelectorAll('input')).toHaveLength(0);
    expect(document.querySelectorAll('select')).toHaveLength(0);
    expect(document.querySelectorAll('textarea')).toHaveLength(0);
  });

  it('renders coverage rows with bilingual labels in TH locale', () => {
    render(<RecordsComputedView plan={LIFE_INFO_PLAN} />);
    expect(screen.getByText('ฐานเงินเดือน')).toBeInTheDocument();
    expect(screen.getByText('ความคุ้มครองประกันชีวิต')).toBeInTheDocument();
  });

  it('renders no submit or action button', () => {
    render(<RecordsComputedView plan={LIFE_INFO_PLAN} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

// ── 6. LifecycleAdminForm: period + scope + Run/Validate/Cancel ───────────────

describe('LifecycleAdminForm', () => {
  it('renders period start and end fields', () => {
    render(<LifecycleAdminForm plan={LIFECYCLE_PLAN} />);
    expect(screen.getByLabelText(/วันเริ่มต้นรอบ/)).toBeInTheDocument();
    expect(screen.getByLabelText(/วันสิ้นสุดรอบ/)).toBeInTheDocument();
  });

  it('renders scope selector', () => {
    render(<LifecycleAdminForm plan={LIFECYCLE_PLAN} />);
    expect(screen.getByLabelText(/ขอบเขต/)).toBeInTheDocument();
  });

  it('renders Run, Validate, and Cancel action buttons', () => {
    render(<LifecycleAdminForm plan={LIFECYCLE_PLAN} />);
    expect(screen.getByRole('button', { name: 'รัน' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ตรวจสอบ' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ยกเลิก' })).toBeInTheDocument();
  });
});

// ── 7. pickTemplate: returns correct component for each template id ────────────

describe('pickTemplate', () => {
  it('returns SimpleClaimForm for simple-claim plans', () => {
    const Component = pickTemplate(OPD_PLAN);
    expect(Component).toBe(SimpleClaimForm);
  });

  it('returns HospitalClaimForm for hospital-claim plans', () => {
    const Component = pickTemplate(IPD_REFERRAL_PLAN);
    expect(Component).toBe(HospitalClaimForm);
  });

  it('returns RecordsFlatForm for records-flat plans', () => {
    const Component = pickTemplate(FUNERAL_EMPLOYEE_PLAN);
    expect(Component).toBe(RecordsFlatForm);
  });

  it('returns RecordsDependentForm for records-dependent plans', () => {
    const Component = pickTemplate(FUNERAL_SPOUSE_PLAN);
    expect(Component).toBe(RecordsDependentForm);
  });

  it('returns RecordsComputedView for records-computed plans', () => {
    const Component = pickTemplate(LIFE_INFO_PLAN);
    expect(Component).toBe(RecordsComputedView);
  });

  it('returns LifecycleAdminForm for lifecycle-admin plans', () => {
    const Component = pickTemplate(LIFECYCLE_PLAN);
    expect(Component).toBe(LifecycleAdminForm);
  });

  it('covers all 6 WorkflowTemplate ids from the plan registry', () => {
    const seenTemplates = new Set(BENEFIT_PLAN_REGISTRY.map((p) => p.template));
    const expectedTemplates = new Set([
      'simple-claim',
      'hospital-claim',
      'records-flat',
      'records-dependent',
      'records-computed',
      'lifecycle-admin',
    ]);
    expect(seenTemplates).toEqual(expectedTemplates);
  });
});
