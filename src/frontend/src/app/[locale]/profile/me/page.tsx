// VALIDATION_EXEMPT: validation in Zustand humi-profile-slice + emergency/dependents/address editors (per design-gates Track C 2026-04-26)
'use client';
/* eslint-disable react-hooks/static-components -- existing profile editor subcomponents are declared inside the page to close over draft/update handlers. */

// ════════════════════════════════════════════════════════════
// /profile/me — Humi employee self-service profile
// 1:1 port of docs/design-ref/shelfly-bundle/project/screens/profile.jsx
// Adapted retail persona → generic HR persona (HQ manager).
// AppShell owns sidebar+topbar; this file renders main-column only.
// c1-profile-functional: Zustand persist + 5-tab switcher + edit/save/toast
// Build-B: full 15+ field form + admin mode + activity log (issue #12)
// ════════════════════════════════════════════════════════════

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, FileText, Download, Pencil, FileX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DOCUMENT_STORYBOARD_BOUNDARY_TH } from '@/lib/document-boundary';
import {
  benefitReferralRoute,
  benefitTaxPlanningRoute,
  benefitsHubRoute,
} from '@/lib/benefit-routes';
import { Button } from '@/components/humi';
import {
  CLAIM_STATUS_META,
  DEPENDENT_RELATION_LABELS,
  HUMI_MY_PROFILE,
  type HumiEmployee,
  type HumiDependent,
} from '@/lib/humi-mock-data';
import { calcYearOfService } from '@/lib/calculations/calcYearOfService';
import {
  ALL_PORTED_EMPLOYEES,
  EMP_BY_LOGIN,
  employeeForLogin,
  maskNationalId,
} from '@/lib/all-ported-employees';
import { useAuthStore } from '@/stores/auth-store';
import { useShallow } from 'zustand/react/shallow';
import {
  useSpecialPrivilegeStore,
  selectPrivilegesForEmployee,
} from '@/stores/special-privilege-store';
import { getPlan } from '@/data/benefits/plan-registry';
import { formatCurrency, formatDate } from '@/lib/date';
import {
  useHumiProfileStore,
  type ProfileTab,
  type PendingChange,
  type SectionKey,
  type EmergencyContactRow,
} from '@/stores/humi-profile-slice';
import { FileUploadField } from '@/components/humi/molecules/FileUploadField';
import { Modal, FormField } from '@/components/humi';
import { EmergencyContactList, areAllRowsValid } from '@/components/profile/EmergencyContactList';
import { DependentsEditor, areAllDependentsValid } from '@/components/profile/DependentsEditor';
import { Address8Editor, isAddress8Valid } from '@/components/profile/Address8Editor';
import { BankDetailsEditor, isBankValid } from '@/components/profile/BankDetailsEditor';
import { ContactArrayEditor, isContactArrayValid } from '@/components/profile/ContactArrayEditor';
import { RepeatableEntriesEditor } from '@/components/profile/RepeatableEntriesEditor';
import CompensationSummary from '@/components/profile/CompensationSummary';
import CompensationHistory from '@/components/profile/CompensationHistory';
import { getMaintainConfig, type MaintainKey } from '@/lib/ec-maintain-registry';
import type {
  EducationEntry,
  LanguageSkillEntry,
  WorkPermitEntry,
  CertificationEntry,
} from '@/stores/humi-profile-slice';

// Map slice tab keys → display keys used by existing tab panels
type TabKey = 'personal' | 'job' | 'emergency' | 'benefits' | 'docs' | 'tax';

// Mapping from Zustand ProfileTab → legacy panel key.
// NOTE: slice key `compensation` is a legacy name from an earlier sprint where
// Compensation was a standalone tab. Today's tab #3 displays "ติดต่อฉุกเฉิน"
// and must route to the emergency panel. Compensation cards are
// rendered inside the `job` panel.
// Exported for the tab-routing regression test (D2). Unknown named exports from an
// App Router page file are inert — the router only consumes the default export.
export const SLICE_TO_PANEL: Record<ProfileTab, TabKey> = {
  personal: 'personal',
  employment: 'job',
  compensation: 'emergency',
  benefits: 'benefits',
  documents: 'docs',
  activity: 'tax', // activity mapped to tax tab panel — now shows pendingChanges
};

export const PROFILE_TAB_QUERY: Record<ProfileTab, string | null> = {
  personal: null,
  employment: 'employment',
  compensation: 'emergency',
  benefits: 'benefits',
  documents: 'documents',
  activity: 'tax',
};

// KNOWN URL-divergence seam (mockup phase): inbound `?tab=compensation` is mapped
// to the `employment` slice → SLICE_TO_PANEL.employment === 'job' → the job panel
// that actually renders CompensationSummary + CompensationHistory. So both
// `?tab=compensation` and `?tab=employment` deep-link to the same job/comp panel.
// Meanwhile an in-app compensation-tab click still emits `?tab=emergency` via the
// (intentionally asymmetric) PROFILE_TAB_QUERY map above, so `?tab=emergency` keeps
// reaching the emergency panel (emergency → 'compensation' slice → emergency panel).
// Acceptable asymmetry for the mockup; revisit when comp gets its own panel.
export const PROFILE_TAB_FROM_QUERY: Record<string, ProfileTab> = {
  personal: 'personal',
  employment: 'employment',
  job: 'employment',
  emergency: 'compensation',
  compensation: 'employment',
  benefits: 'benefits',
  documents: 'documents',
  docs: 'documents',
  tax: 'activity',
  activity: 'activity',
};

function profileTabHref(locale: string, tab: ProfileTab) {
  const query = PROFILE_TAB_QUERY[tab];
  return query ? `/${locale}/profile/me?tab=${query}` : `/${locale}/profile/me`;
}

type ProfileSearchParams = Pick<URLSearchParams, 'get'>;

export function resolveProfileTab(
  searchParams: ProfileSearchParams | null | undefined,
  fallbackTab: ProfileTab = 'personal',
): ProfileTab {
  const requestedTab = searchParams?.get('tab');
  if (requestedTab && PROFILE_TAB_FROM_QUERY[requestedTab]) {
    return PROFILE_TAB_FROM_QUERY[requestedTab];
  }
  if (searchParams?.get('service') === 'referral') {
    return 'benefits';
  }
  if (searchParams?.get('mode') === 'planning') {
    return 'activity';
  }
  return fallbackTab;
}

const AVATAR_TONE_MAP = {
  teal: 'humi-avatar humi-avatar--teal',
  sage: 'humi-avatar humi-avatar--sage',
  butter: 'humi-avatar humi-avatar--butter',
  ink: 'humi-avatar humi-avatar--ink',
} as const;

// Fields that require attachment before submit (Section A/B)
const ATTACHMENT_REQUIRED_FIELDS = new Set([
  'salutationTh',
  'salutationEn',
  'firstNameTh',
  'firstNameEn',
  'lastNameTh',
  'lastNameEn',
  'nationalId',
  'maritalStatus',
  'maritalStatusSince',
  'spouseName',
]);

// ── STA-244 repeatable-group helpers (module scope) ────────────────────────────
// makeEmpty factories + Save-enablement validity live WITH each group (the shell
// stays type-agnostic). Rows may be zero (all 4 groups are optional); validity only
// requires the group's key field(s) on the rows that DO exist.

const REPEATABLE_INPUT_CLS =
  'w-full rounded-md border border-hairline bg-canvas-soft px-3 py-2 text-body text-ink ' +
  'placeholder:text-ink-muted transition-[border-color,box-shadow] duration-[var(--dur-fast)] ' +
  'hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas';

const makeEmptyEducation = (): EducationEntry => ({
  degree: '',
  university: '',
  faculty: '',
  major: '',
  gpa: '',
  graduatedDate: '',
  isPrimary: false,
});
const makeEmptyLanguageSkill = (): LanguageSkillEntry => ({
  language: '',
  speaking: '',
  reading: '',
  writing: '',
  listening: '',
  certificate: '',
});
const makeEmptyWorkPermit = (): WorkPermitEntry => ({
  documentType: '',
  country: '',
  documentNumber: '',
  issueDate: '',
  expiryDate: '',
  attachmentId: null,
});
const makeEmptyCertification = (): CertificationEntry => ({
  type: '',
  name: '',
  institution: '',
  effectiveDate: '',
  expirationDate: '',
  number: '',
  attachmentId: null,
});

const areAllEducationValid = (rows: EducationEntry[]): boolean =>
  rows.every((r) => r.degree.trim() !== '' && r.university.trim() !== '');
const areAllLanguageSkillsValid = (rows: LanguageSkillEntry[]): boolean =>
  rows.every((r) => r.language.trim() !== '');
const areAllWorkPermitsValid = (rows: WorkPermitEntry[]): boolean =>
  rows.every((r) => r.documentType.trim() !== '' && r.documentNumber.trim() !== '');
const areAllCertificationsValid = (rows: CertificationEntry[]): boolean =>
  rows.every((r) => r.name.trim() !== '');

// ── Section-level edit config (STA-82) ─────────────────────────────────────────
// BA directive: Personal / Marital / Contact are edited per SECTION (one Edit
// button per group → one form with all the section's fields + one effective date
// + one optional attachment → one submit). Each changed field is still captured
// as its own PendingChange (so the approval view shows what changed), but the
// user interaction is a single grouped edit. Address/Bank/Emergency/Dependents
// already work this way (their own section editors) and are untouched.
export type SectionId = 'personal' | 'marital' | 'contact' | 'advanced';

interface SectionFieldSpec {
  key: keyof EditFormValues;
  options?: string[];
  inputType?: string;
}

// sectionKey mapping submitted to the store. Marital groups under 'personal'
// (no dedicated 'marital' SectionKey exists; marital is identity data and shares
// the personal section's attachment requirement — smallest correct change).
const SECTION_TO_STORE_KEY: Record<SectionId, SectionKey> = {
  personal: 'personal',
  marital: 'personal',
  contact: 'contact',
  advanced: 'personal',
};

// Picklist options
const SALUTATION_TH = ['นาย', 'นาง', 'นางสาว', 'น.ส.'];
const SALUTATION_EN = ['Mr.', 'Mrs.', 'Miss', 'Ms.'];
const GENDER_OPTIONS = ['male', 'female', 'non_binary', 'prefer_not_to_say'];
const MARITAL_OPTIONS = ['โสด', 'สมรส', 'หย่า', 'หม้าย'];
const RELIGION_OPTIONS = ['buddhist', 'christian', 'muslim', 'hindu', 'other', 'none'];
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const MILITARY_OPTIONS = ['completed', 'exempted', 'deferred', 'not_applicable'];
// BRD #165: SF BLOODGROUP picklist = 4 codes (AB/A/O/B).
// Humi extends with Rh factor (+/-) for clinical completeness — intentional superset.
// SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json BLOODGROUP optionIds AB/A/O/B
const DISABILITY_OPTIONS = ['none', 'physical', 'visual', 'hearing', 'cognitive', 'other'];

// Editable field roster per section (STA-82). Order mirrors the prior FullEditField
// layout. `spouseName` is conditional (married only) and handled at render time.
const SECTION_FIELDS: Record<SectionId, SectionFieldSpec[]> = {
  personal: [
    { key: 'salutationTh', options: SALUTATION_TH },
    { key: 'salutationEn', options: SALUTATION_EN },
    { key: 'firstNameTh' },
    { key: 'firstNameEn' },
    { key: 'lastNameTh' },
    { key: 'lastNameEn' },
    { key: 'nickname' },
    { key: 'preferredName' },
    { key: 'secondLastName' },
    { key: 'gender', options: GENDER_OPTIONS },
    { key: 'dateOfBirth', inputType: 'date' },
    { key: 'nationality' },
    { key: 'nationalId' },
  ],
  marital: [
    { key: 'maritalStatus', options: MARITAL_OPTIONS },
    { key: 'maritalStatusSince', inputType: 'date' },
    { key: 'spouseName' },
  ],
  contact: [
    { key: 'personalEmail', inputType: 'email' },
    { key: 'businessPhone', inputType: 'tel' },
    { key: 'personalMobile', inputType: 'tel' },
    { key: 'homePhone', inputType: 'tel' },
  ],
  advanced: [
    { key: 'religion', options: RELIGION_OPTIONS },
    { key: 'bloodType', options: BLOOD_TYPES },
    { key: 'militaryStatus', options: MILITARY_OPTIONS },
    { key: 'disabilityStatus', options: DISABILITY_OPTIONS },
  ],
};

// BRD #29: PerPerson personIdExternal — stable SF external ID surfaced alongside generated employee ID
// SF cite: sf-extract/qas-fields-2026-04-26/sf-qas-PerPerson-2026-04-26.json .d.results[0].personIdExternal
// Derived from portedEmployee.employeeCode per login; falls back to placeholder if no ported employee.
function derivePersonIdExternal(emp: { employeeCode?: string } | null): string {
  if (emp?.employeeCode) return `EX-${emp.employeeCode.replace(/\D/g, '').padStart(5, '0')}`;
  return 'EX-00000'; // placeholder — real value comes from SF PerPerson API
}

// ── Editable form state shape ─────────────────────────────────────────────────

interface EditFormValues {
  salutationTh: string;
  salutationEn: string;
  firstNameTh: string;
  firstNameEn: string;
  lastNameTh: string;
  lastNameEn: string;
  // BRD #20: PerPersonal preferredName + secondLastName (post-marriage Thai surname)
  // SF cite: sf-extract/qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json .d.results[0].preferredName
  preferredName: string;
  secondLastName: string;
  nickname: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  nationalId: string;
  maritalStatus: string;
  maritalStatusSince: string;
  spouseName: string;
  personalEmail: string;
  businessPhone: string;
  personalMobile: string;
  homePhone: string;
  religion: string;
  bloodType: string;
  militaryStatus: string;
  // BRD #168: PerPersonal customString9 = disability code (also on /ess/profile/edit)
  // SF cite: sf-extract/qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json .d.results[0].customString9
  disabilityStatus: string;
}

const FORM_DEFAULTS: EditFormValues = {
  salutationTh: 'นาย',
  salutationEn: 'Mr.',
  firstNameTh: 'จงรักษ์',
  firstNameEn: 'Jongrak',
  lastNameTh: 'ทานากะ',
  lastNameEn: 'Tanaka',
  preferredName: '',
  secondLastName: '',
  nickname: 'จงรักษ์',
  gender: 'male',
  dateOfBirth: '1990-01-15',
  nationality: 'ไทย',
  nationalId: '1-1001-00001-00-1',
  maritalStatus: 'โสด',
  maritalStatusSince: '',
  spouseName: '',
  personalEmail: 'jongrak.tanaka@proton.me',
  businessPhone: '+66 (02) 555-0188',
  personalMobile: '+66 81 234 5678',
  homePhone: '',
  religion: 'buddhist',
  bloodType: 'O+',
  militaryStatus: 'completed',
  disabilityStatus: '',
};

const MARITAL_TH: Record<string, string> = {
  single: 'โสด',
  married: 'สมรส',
  divorced: 'หย่า',
  widowed: 'หม้าย',
};

const RELIGION_TH: Record<string, string> = {
  buddhist: 'พุทธ',
  christian: 'คริสต์',
  muslim: 'อิสลาม',
  hindu: 'ฮินดู',
  other: 'อื่นๆ',
  none: 'ไม่ระบุ',
};

const NATIONALITY_TH: Record<string, string> = {
  th: 'ไทย',
  lao: 'ลาว',
  myanmar: 'พม่า',
  vietnam: 'เวียดนาม',
};

// Re-export extracted helpers so existing tests/importers keep working.
// Canonical home is `@/lib/all-ported-employees`.
export { maskNationalId, employeeForLogin };

/** Derive form defaults from a ported employee (T2 #89). Existing FORM_DEFAULTS
 *  serves as fallback for fields not covered by HumiEmployee shape. */
export function deriveFormValuesFromEmployee(emp: HumiEmployee | null): EditFormValues {
  if (!emp) return FORM_DEFAULTS;
  return {
    ...FORM_DEFAULTS,
    firstNameTh: emp.firstNameTh,
    lastNameTh: emp.lastNameTh,
    firstNameEn: emp.firstNameEn ?? FORM_DEFAULTS.firstNameEn,
    lastNameEn: emp.lastNameEn ?? FORM_DEFAULTS.lastNameEn,
    nickname: emp.nickname ?? FORM_DEFAULTS.nickname,
    maritalStatus: emp.maritalStatus
      ? (MARITAL_TH[emp.maritalStatus] ?? FORM_DEFAULTS.maritalStatus)
      : FORM_DEFAULTS.maritalStatus,
    religion: emp.religion ?? FORM_DEFAULTS.religion,
    bloodType: emp.bloodType ?? FORM_DEFAULTS.bloodType,
    nationality: emp.nationality
      ? (NATIONALITY_TH[emp.nationality] ?? FORM_DEFAULTS.nationality)
      : FORM_DEFAULTS.nationality,
    nationalId: maskNationalId(emp.nationalId),
  };
}

// ── PendingSectionBadge — shared chip shown on section headers with pending CR ──

function PendingSectionBadge({ section }: { section: SectionKey }) {
  const pending = useHumiProfileStore((s) =>
    s.pendingChanges.find((pc) => pc.sectionKey === section && pc.status === 'pending'),
  );
  const tEss = useTranslations('ess');
  if (!pending) return null;
  return (
    <span
      className="humi-chip"
      style={{
        background: 'var(--color-butter-50)',
        color: 'var(--color-ink-soft)',
        fontSize: 12,
        padding: '2px 8px',
        borderRadius: 999,
        marginLeft: 8,
      }}
    >
      {tEss('changeRequest.pending')} · {pending.effectiveDate}
    </span>
  );
}

// ── CardinalityLabel — STA-244 config-driven chip stating whether a section holds a
// single entry or is repeatable. Presentation-only; it ASSERTS the registry agrees
// with the already-wired editor (never selects/swaps an editor). Skipped for
// cardinality-intrinsic sections (e.g. contact array) whose split is component-owned.
function CardinalityLabel({
  maintainKey,
  t,
}: {
  maintainKey: MaintainKey;
  t: ReturnType<typeof useTranslations>;
}) {
  const config = getMaintainConfig(maintainKey);
  if (config.cardinalityIntrinsic) return null;
  const label = config.cardinality === 'N' ? t('cardinality.repeatable') : t('cardinality.single');
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        color: 'var(--color-ink-muted)',
        marginLeft: 8,
        verticalAlign: 'middle',
      }}
    >
      {label}
    </span>
  );
}

export default function HumiProfileMePage({
  initialTab = 'personal',
}: {
  initialTab?: ProfileTab;
} = {}) {
  const t = useTranslations('humiProfile');
  const tEdit = useTranslations('profileEdit');
  const tPending = useTranslations('pending');
  const tToast = useTranslations('profileToast');
  const tActivity = useTranslations('activityLog');
  const tEss = useTranslations('ess');
  const tEcMaintain = useTranslations('ecMaintain');
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) ?? 'th';
  const p = HUMI_MY_PROFILE;

  // Tenure — reuse calcYearOfService bound to the Original Start Date (p.hireDate),
  // the SAME semantic shown on the Job tab (_yos). .display is TH-only, so format
  // EN from {years, months} for parity.
  const _tenure = calcYearOfService(p.hireDate, p.lifecycleEvents);
  const tenureLabel =
    locale === 'en'
      ? t('tenure', { years: _tenure.years, months: _tenure.months })
      : _tenure.display;

  const {
    activeTab,
    isEditing,
    draft,
    save,
    saved,
    setTab,
    startEdit,
    updateDraft,
    cancelEdit,
    pendingChanges,
    attachments,
    submitChangeRequest,
    withdrawPendingChange,
  } = useHumiProfileStore();

  // Live count of change requests still awaiting the employee (pending state).
  const pendingTaskCount = pendingChanges.filter((c) => c.status === 'pending').length;

  const [toast, setToast] = useState<string | null>(null);
  const [showToastOk, setShowToastOk] = useState(false);

  // Full form state (local — submitted via single-step modal)
  // T2 #89 — derive defaults from ported HUMI_EMPLOYEES + SF parity, keyed by current login (auth-store
  //          email reflects view-as persona via switchPersona). Falls back to FORM_DEFAULTS.
  const currentEmail = useAuthStore((s) => s.email);
  // STA-90: demo seam — surface seeded special privilege for EMP-0005 on the
  // self-profile benefits panel. The 'EMP-0005' literal is a hardcoded DEMO
  // SEAM, NOT the logged-in persona (which resolves via employeeForLogin →
  // EMP_BY_LOGIN, a separate lowercase emp-00x id space). Hook is at component
  // top level (Rules of Hooks); only the rendered JSX is gated by panelKey.
  // Selector returns a fresh array — wrap with useShallow to avoid churn.
  const tSpecialPrivilege = useTranslations('admin.specialPrivilege');
  const specialPrivileges = useSpecialPrivilegeStore(
    useShallow(selectPrivilegesForEmployee('EMP-0005')),
  );
  const portedEmployee = employeeForLogin(currentEmail);
  const initialFormValues = deriveFormValuesFromEmployee(portedEmployee);
  const [formValues, setFormValues] = useState<EditFormValues>(initialFormValues);
  const [pendingAttachmentIds, setPendingAttachmentIds] = useState<string[]>([]);
  const [activeEditField, setActiveEditField] = useState<keyof EditFormValues | null>(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [modalDate, setModalDate] = useState<string>(''); // ISO yyyy-MM-dd
  const [advancedOpen, setAdvancedOpen] = useState(false);
  // STA-82 — section-level edit (Personal / Marital / Contact). One Edit button
  // per section opens a single form with all that section's fields + one
  // effective date + one optional attachment, submitting one section-level CR.
  const [editingSection, setEditingSection] = useState<SectionId | null>(null);
  const [sectionDraft, setSectionDraft] = useState<EditFormValues>(initialFormValues);
  const [sectionDate, setSectionDate] = useState<string>('');
  const [sectionAttachmentIds, setSectionAttachmentIds] = useState<string[]>([]);
  // STA-186 — emergency tab converges to STA-82 per-section pencils. Two array-editor
  // sections (emergency contacts, dependents) toggle independently over the shared draft.
  const [editingEmergency, setEditingEmergency] = useState(false);
  const [editingDependents, setEditingDependents] = useState(false);
  // Open-time snapshots so a per-section Cancel reverts ONLY its own slice (store
  // cancelEdit() would revert the whole draft).
  const [emergencySnapshot, setEmergencySnapshot] = useState<EmergencyContactRow[]>([]);
  const [dependentsSnapshot, setDependentsSnapshot] = useState<HumiDependent[]>([]);
  // STA-244 — per-section edit toggles for the 4 repeatable groups. Each opens
  // independently over the shared draft with its own open-time snapshot so Cancel
  // reverts only its slice (never the whole draft).
  const [editingFormalEducation, setEditingFormalEducation] = useState(false);
  const [editingLanguageSkills, setEditingLanguageSkills] = useState(false);
  const [editingWorkPermit, setEditingWorkPermit] = useState(false);
  const [editingCertification, setEditingCertification] = useState(false);
  const [formalEducationSnapshot, setFormalEducationSnapshot] = useState<EducationEntry[]>([]);
  const [languageSkillsSnapshot, setLanguageSkillsSnapshot] = useState<LanguageSkillEntry[]>([]);
  const [workPermitSnapshot, setWorkPermitSnapshot] = useState<WorkPermitEntry[]>([]);
  const [certificationSnapshot, setCertificationSnapshot] = useState<CertificationEntry[]>([]);
  const lastAppliedProfileSearchRef = useRef<string | null>(null);

  // Derive panel key from slice activeTab
  const panelKey = SLICE_TO_PANEL[activeTab];
  const profileSearchKey = searchParams?.toString() ?? '';
  const profileRouteKey = `${initialTab}:${profileSearchKey}`;

  useEffect(() => {
    if (lastAppliedProfileSearchRef.current === profileRouteKey) {
      return;
    }
    lastAppliedProfileSearchRef.current = profileRouteKey;

    const requestedProfileTab = resolveProfileTab(searchParams, initialTab);
    if (activeTab !== requestedProfileTab) {
      setTab(requestedProfileTab);
    }
  }, [activeTab, initialTab, profileRouteKey, searchParams, setTab]);

  useEffect(() => {
    if (searchParams?.get('service') === 'referral') {
      router.replace(benefitReferralRoute(locale));
      return;
    }
    if (searchParams?.get('tab') === 'tax' && searchParams?.get('mode') === 'planning') {
      router.replace(benefitTaxPlanningRoute(locale));
    }
  }, [locale, router, searchParams]);

  const handleProfileTabClick = useCallback(
    (tab: ProfileTab) => {
      setTab(tab);
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', profileTabHref(locale, tab));
      }
    },
    [locale, setTab],
  );

  // ── Toast helper ──────────────────────────────────────────────────────────

  const showToast = useCallback((msg: string, success = true) => {
    setToast(msg);
    setShowToastOk(success);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // Auto-cancel edit when the user switches away from the only panel that uses
  // the global isEditing bar (emergency: Emergency Contacts + Dependents).
  // Personal/Marital/Contact now edit per-section via their own draft state.
  useEffect(() => {
    if (isEditing && panelKey !== 'emergency') {
      cancelEdit();
    }
  }, [panelKey, isEditing, cancelEdit]);

  // STA-186 — collapse per-section emergency edits when leaving the emergency panel.
  useEffect(() => {
    if (panelKey !== 'emergency') {
      setEditingEmergency(false);
      setEditingDependents(false);
    }
  }, [panelKey]);

  // STA-186 — section-scoped open/cancel for the emergency-tab array editors.
  // Open seeds the draft slice from saved (no stale rows from a prior cancelled
  // edit); Cancel reverts ONLY this slice via updateDraft — never store
  // cancelEdit(), which would revert the WHOLE draft (both sections + other tabs).
  function openEmergencyEdit() {
    const current = saved.emergencyContacts ?? [];
    setEmergencySnapshot(current);
    updateDraft({ emergencyContacts: current });
    setEditingEmergency(true);
    setEditingDependents(false); // one-open-at-a-time — avoids a Save flushing the other's rows
  }
  function cancelEmergencyEdit() {
    updateDraft({ emergencyContacts: emergencySnapshot });
    setEditingEmergency(false);
  }
  function openDependentsEdit() {
    const current = saved.dependents ?? [];
    setDependentsSnapshot(current);
    updateDraft({ dependents: current });
    setEditingDependents(true);
    setEditingEmergency(false); // one-open-at-a-time — avoids a Save flushing the other's rows
  }
  function cancelDependentsEdit() {
    updateDraft({ dependents: dependentsSnapshot });
    setEditingDependents(false);
  }

  // STA-244 — open/cancel for the 4 repeatable groups (mirror emergency pattern).
  function openFormalEducationEdit() {
    const current = saved.formalEducation ?? [];
    setFormalEducationSnapshot(current);
    updateDraft({ formalEducation: current });
    setEditingFormalEducation(true);
  }
  function cancelFormalEducationEdit() {
    updateDraft({ formalEducation: formalEducationSnapshot });
    setEditingFormalEducation(false);
  }
  function openLanguageSkillsEdit() {
    const current = saved.languageSkills ?? [];
    setLanguageSkillsSnapshot(current);
    updateDraft({ languageSkills: current });
    setEditingLanguageSkills(true);
  }
  function cancelLanguageSkillsEdit() {
    updateDraft({ languageSkills: languageSkillsSnapshot });
    setEditingLanguageSkills(false);
  }
  function openWorkPermitEdit() {
    const current = saved.workPermits ?? [];
    setWorkPermitSnapshot(current);
    updateDraft({ workPermits: current });
    setEditingWorkPermit(true);
  }
  function cancelWorkPermitEdit() {
    updateDraft({ workPermits: workPermitSnapshot });
    setEditingWorkPermit(false);
  }
  function openCertificationEdit() {
    const current = saved.certifications ?? [];
    setCertificationSnapshot(current);
    updateDraft({ certifications: current });
    setEditingCertification(true);
  }
  function cancelCertificationEdit() {
    updateDraft({ certifications: certificationSnapshot });
    setEditingCertification(false);
  }

  // ── Gate handlers ─────────────────────────────────────────────────────────

  function handleEditField(field: keyof EditFormValues) {
    setActiveEditField(field);
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setModalDate(iso);
    setGateOpen(true);
  }

  function handleGateClose() {
    setGateOpen(false);
    setActiveEditField(null);
    setPendingAttachmentIds([]);
    setModalDate('');
  }

  function handleSubmitChange() {
    if (!activeEditField || !modalDate) return;
    const newValue = formValues[activeEditField];
    const oldValue = FORM_DEFAULTS[activeEditField];
    submitChangeRequest({
      field: activeEditField,
      oldValue,
      newValue,
      effectiveDate: modalDate,
      attachmentIds: pendingAttachmentIds,
    });
    showToast(tToast('submitted'));
    handleGateClose();
  }

  // ── STA-82 section-level edit handlers ────────────────────────────────────

  function openSectionEdit(section: SectionId) {
    setSectionDraft(formValues); // snapshot current values into the section form
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setSectionDate(iso);
    setSectionAttachmentIds([]);
    setEditingSection(section);
  }

  function closeSectionEdit() {
    setEditingSection(null);
    setSectionAttachmentIds([]);
    setSectionDate('');
  }

  // Fields visible for the active section (spouseName only when married).
  function visibleSectionFields(section: SectionId): SectionFieldSpec[] {
    return SECTION_FIELDS[section].filter(
      (f) => f.key !== 'spouseName' || sectionDraft.maritalStatus === 'สมรส',
    );
  }

  // Does the active section require an attachment? Sourced from the STA-244 maintain
  // registry (config-driven) instead of the local ATTACHMENT_REQUIRED_FIELDS heuristic.
  // The seed mirrors the identity-gated sections, so behavior is unchanged — the gate
  // (`sectionSaveDisabled`) and FileUploadField below stay exactly as they were.
  const sectionAttachmentRequired =
    editingSection !== null && getMaintainConfig(editingSection).requiredDocs.length > 0;

  const sectionSaveDisabled =
    !sectionDate || (sectionAttachmentRequired && sectionAttachmentIds.length === 0);

  function handleSubmitSection() {
    if (!editingSection || !sectionDate) return;
    const fields = visibleSectionFields(editingSection);
    const sectionKey = SECTION_TO_STORE_KEY[editingSection];
    let changeCount = 0;
    // Commit section-draft into the live form values, then emit one CR per
    // changed field (so the approval view still lists every change) sharing the
    // section's effective date + attachment + sectionKey.
    fields.forEach((f) => {
      const newValue = sectionDraft[f.key];
      const oldValue = formValues[f.key];
      if (newValue !== oldValue) {
        submitChangeRequest({
          field: f.key,
          oldValue: FORM_DEFAULTS[f.key],
          newValue,
          effectiveDate: sectionDate,
          attachmentIds: sectionAttachmentIds,
          sectionKey,
        });
        changeCount += 1;
      }
    });
    setFormValues(sectionDraft);
    showToast(changeCount > 0 ? tToast('submitted') : t('profileCancelEdit'));
    closeSectionEdit();
  }

  // ── Determine if save is disabled (date missing OR required attachment missing) ──

  const attachmentRequired =
    activeEditField !== null && ATTACHMENT_REQUIRED_FIELDS.has(activeEditField);
  const saveDisabled = !modalDate || (attachmentRequired && pendingAttachmentIds.length === 0);


  const tabs: Array<[ProfileTab, string]> = [
    ['personal', t('tabPersonal')],
    ['employment', t('tabJob')],
    ['compensation', t('tabEmergency')],
    ['documents', t('tabDocs')],
    ['activity', t('tabTax')],
  ];

  // ── Inline section editor sub-components (v2 additive) ────────────────────
  // Each captures draft/updateDraft/saved/submitChangeRequest/showToast/save from closure.
  // Hooks order: all hooks are declared at top of HumiProfileMePage above; these
  // sub-components are plain function objects, not React components — they are
  // called via JSX only inside the return block, so no conditional hooks issue.

  function EmergencyContactSectionEditor({
    onClose,
    onCancel,
  }: {
    onClose: () => void;
    onCancel: () => void;
  }) {
    const rows = draft.emergencyContacts ?? [];
    const today = new Date().toISOString().slice(0, 10);

    function handleSubmit() {
      submitChangeRequest({
        field: 'emergencyContacts',
        oldValue: JSON.stringify(saved.emergencyContacts ?? []),
        newValue: JSON.stringify(rows),
        effectiveDate: today,
        attachmentIds: [],
        sectionKey: 'emergencyContact',
      });
      save();
      showToast(tEss('changeRequest.submit'));
      onClose();
    }

    return (
      <div style={{ marginTop: 16 }}>
        <EmergencyContactList
          value={rows}
          onChange={(updated) => updateDraft({ emergencyContacts: updated })}
        />
        <div className="humi-row" style={{ marginTop: 12, justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            {t('profileCancelEdit')}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={!areAllRowsValid(rows)}
          >
            {tEss('changeRequest.submit')}
          </Button>
        </div>
      </div>
    );
  }

  function DependentsSectionEditor({
    onClose,
    onCancel,
  }: {
    onClose: () => void;
    onCancel: () => void;
  }) {
    const rows = draft.dependents ?? [];
    const today = new Date().toISOString().slice(0, 10);

    function handleSubmit() {
      submitChangeRequest({
        field: 'dependents',
        oldValue: JSON.stringify(saved.dependents ?? []),
        newValue: JSON.stringify(rows),
        effectiveDate: today,
        attachmentIds: [],
        sectionKey: 'dependents',
      });
      save();
      showToast(tEss('changeRequest.submit'));
      onClose();
    }

    return (
      <div style={{ marginTop: 16 }}>
        <DependentsEditor
          value={rows}
          onChange={(updated) => updateDraft({ dependents: updated })}
        />
        <div className="humi-row" style={{ marginTop: 12, justifyContent: 'flex-end', gap: 8 }}>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            {t('profileCancelEdit')}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={!areAllDependentsValid(rows)}
          >
            {tEss('changeRequest.submit')}
          </Button>
        </div>
      </div>
    );
  }

  function AddressSectionEditor() {
    const addr = draft.addressStructured ?? {
      houseNo: '',
      village: '',
      soi: '',
      road: '',
      subdistrict: '',
      district: '',
      province: '',
      postalCode: '',
    };
    const today = new Date().toISOString().slice(0, 10);

    function handleSubmit() {
      submitChangeRequest({
        field: 'addressStructured',
        oldValue: JSON.stringify(saved.addressStructured ?? {}),
        newValue: JSON.stringify(addr),
        effectiveDate: today,
        attachmentIds: [],
        sectionKey: 'address',
      });
      save();
      showToast(tEss('changeRequest.submit'));
    }

    return (
      <div style={{ marginTop: 16 }}>
        <Address8Editor
          value={addr}
          onChange={(updated) => updateDraft({ addressStructured: updated })}
        />
        <div style={{ marginTop: 12 }}>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={!isAddress8Valid(addr)}
          >
            {tEss('changeRequest.submit')}
          </Button>
        </div>
      </div>
    );
  }

  function ContactInfoSectionEditor() {
    const phones = draft.phonesArr ?? [];
    const emails = draft.emailsArr ?? [];
    const today = new Date().toISOString().slice(0, 10);

    function handleSubmit() {
      submitChangeRequest({
        field: 'contactInfo',
        oldValue: JSON.stringify({ phones: saved.phonesArr ?? [], emails: saved.emailsArr ?? [] }),
        newValue: JSON.stringify({ phones, emails }),
        effectiveDate: today,
        attachmentIds: [],
        sectionKey: 'contact',
      });
      save();
      showToast(tEss('changeRequest.submit'));
    }

    return (
      <div style={{ marginTop: 16 }}>
        <ContactArrayEditor
          kind="phone"
          value={phones}
          onChange={(updated) => updateDraft({ phonesArr: updated })}
        />
        <div style={{ marginTop: 12 }}>
          <ContactArrayEditor
            kind="email"
            value={emails}
            onChange={(updated) => updateDraft({ emailsArr: updated })}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={
              !isContactArrayValid(phones, 'phone') || !isContactArrayValid(emails, 'email')
            }
          >
            {tEss('changeRequest.submit')}
          </Button>
        </div>
      </div>
    );
  }

  function BankSectionEditor() {
    const bankData = draft.bank ?? {
      bankCode: '',
      accountNo: '',
      holderName: '',
      bookAttachmentId: null,
    };
    const today = new Date().toISOString().slice(0, 10);

    function handleSubmit() {
      submitChangeRequest({
        field: 'bank',
        oldValue: JSON.stringify(saved.bank ?? {}),
        newValue: JSON.stringify(bankData),
        effectiveDate: today,
        attachmentIds: bankData.bookAttachmentId ? [bankData.bookAttachmentId] : [],
        sectionKey: 'bank',
      });
      save();
      showToast(tEss('changeRequest.submit'));
    }

    return (
      <div style={{ marginTop: 16 }}>
        <BankDetailsEditor
          value={bankData}
          onChange={(updated) => updateDraft({ bank: updated })}
        />
        <div style={{ marginTop: 12 }}>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={!isBankValid(bankData)}
          >
            {tEss('changeRequest.submit')}
          </Button>
        </div>
      </div>
    );
  }

  // ── STA-244 repeatable section editors (direct+dual submit) ───────────────
  // Each submits the SINGULAR sectionKey and its PLURAL store field's JSON, then
  // save() — so the added rows show immediately AND a pending badge appears.

  function RepeatableSubmitRow({
    onCancel,
    onSubmit,
    disabled,
  }: {
    onCancel: () => void;
    onSubmit: () => void;
    disabled: boolean;
  }) {
    return (
      <div className="humi-row" style={{ marginTop: 12, justifyContent: 'flex-end', gap: 8 }}>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          {t('profileCancelEdit')}
        </Button>
        <Button variant="primary" size="sm" onClick={onSubmit} disabled={disabled}>
          {tEss('changeRequest.submit')}
        </Button>
      </div>
    );
  }

  function FormalEducationSectionEditor({
    onClose,
    onCancel,
  }: {
    onClose: () => void;
    onCancel: () => void;
  }) {
    const rows = draft.formalEducation ?? [];
    const today = new Date().toISOString().slice(0, 10);

    function handleSubmit() {
      submitChangeRequest({
        field: 'formalEducation',
        oldValue: JSON.stringify(saved.formalEducation ?? []),
        newValue: JSON.stringify(rows),
        effectiveDate: today,
        attachmentIds: [],
        sectionKey: 'formalEducation',
      });
      save();
      showToast(tEss('changeRequest.submit'));
      onClose();
    }

    return (
      <div style={{ marginTop: 16 }}>
        <RepeatableEntriesEditor<EducationEntry>
          entries={rows}
          onChange={(updated) => updateDraft({ formalEducation: updated })}
          makeEmpty={makeEmptyEducation}
          primaryKey="isPrimary"
          primaryLabel={tEss('formalEducation.primary')}
          addLabel={tEss('formalEducation.add')}
          emptyLabel={tEss('formalEducation.empty')}
          renderRow={(entry, patch) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label={tEss('formalEducation.degree')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.degree}
                    onChange={(e) => patch({ degree: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('formalEducation.university')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.university}
                    onChange={(e) => patch({ university: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('formalEducation.faculty')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.faculty}
                    onChange={(e) => patch({ faculty: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('formalEducation.major')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.major}
                    onChange={(e) => patch({ major: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('formalEducation.gpa')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.gpa}
                    onChange={(e) => patch({ gpa: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('formalEducation.graduatedDate')}>
                {(cp) => (
                  <input {...cp} type="date" value={entry.graduatedDate}
                    onChange={(e) => patch({ graduatedDate: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
            </div>
          )}
        />
        <RepeatableSubmitRow onCancel={onCancel} onSubmit={handleSubmit} disabled={!areAllEducationValid(rows)} />
      </div>
    );
  }

  function LanguageSkillsSectionEditor({
    onClose,
    onCancel,
  }: {
    onClose: () => void;
    onCancel: () => void;
  }) {
    const rows = draft.languageSkills ?? [];
    const today = new Date().toISOString().slice(0, 10);

    function handleSubmit() {
      submitChangeRequest({
        field: 'languageSkills',
        oldValue: JSON.stringify(saved.languageSkills ?? []),
        newValue: JSON.stringify(rows),
        effectiveDate: today,
        attachmentIds: [],
        sectionKey: 'languageSkill',
      });
      save();
      showToast(tEss('changeRequest.submit'));
      onClose();
    }

    return (
      <div style={{ marginTop: 16 }}>
        <RepeatableEntriesEditor<LanguageSkillEntry>
          entries={rows}
          onChange={(updated) => updateDraft({ languageSkills: updated })}
          makeEmpty={makeEmptyLanguageSkill}
          addLabel={tEss('languageSkill.add')}
          emptyLabel={tEss('languageSkill.empty')}
          renderRow={(entry, patch) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label={tEss('languageSkill.language')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.language}
                    onChange={(e) => patch({ language: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('languageSkill.certificate')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.certificate}
                    onChange={(e) => patch({ certificate: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('languageSkill.speaking')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.speaking}
                    onChange={(e) => patch({ speaking: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('languageSkill.listening')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.listening}
                    onChange={(e) => patch({ listening: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('languageSkill.reading')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.reading}
                    onChange={(e) => patch({ reading: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('languageSkill.writing')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.writing}
                    onChange={(e) => patch({ writing: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
            </div>
          )}
        />
        <RepeatableSubmitRow onCancel={onCancel} onSubmit={handleSubmit} disabled={!areAllLanguageSkillsValid(rows)} />
      </div>
    );
  }

  function WorkPermitSectionEditor({
    onClose,
    onCancel,
  }: {
    onClose: () => void;
    onCancel: () => void;
  }) {
    const rows = draft.workPermits ?? [];
    const today = new Date().toISOString().slice(0, 10);

    function handleSubmit() {
      submitChangeRequest({
        field: 'workPermits',
        oldValue: JSON.stringify(saved.workPermits ?? []),
        newValue: JSON.stringify(rows),
        effectiveDate: today,
        attachmentIds: [],
        sectionKey: 'workPermit',
      });
      save();
      showToast(tEss('changeRequest.submit'));
      onClose();
    }

    return (
      <div style={{ marginTop: 16 }}>
        <RepeatableEntriesEditor<WorkPermitEntry>
          entries={rows}
          onChange={(updated) => updateDraft({ workPermits: updated })}
          makeEmpty={makeEmptyWorkPermit}
          addLabel={tEss('workPermit.add')}
          emptyLabel={tEss('workPermit.empty')}
          renderRow={(entry, patch) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label={tEss('workPermit.documentType')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.documentType}
                    onChange={(e) => patch({ documentType: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('workPermit.country')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.country}
                    onChange={(e) => patch({ country: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('workPermit.documentNumber')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.documentNumber}
                    onChange={(e) => patch({ documentNumber: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <div />
              <FormField label={tEss('workPermit.issueDate')}>
                {(cp) => (
                  <input {...cp} type="date" value={entry.issueDate}
                    onChange={(e) => patch({ issueDate: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('workPermit.expiryDate')}>
                {(cp) => (
                  <input {...cp} type="date" value={entry.expiryDate}
                    onChange={(e) => patch({ expiryDate: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <div className="sm:col-span-2">
                <FileUploadField
                  label={tEss('workPermit.attachment')}
                  maxFiles={1}
                  onUpload={(id) => patch({ attachmentId: id })}
                  onRemove={() => patch({ attachmentId: null })}
                />
              </div>
            </div>
          )}
        />
        <RepeatableSubmitRow onCancel={onCancel} onSubmit={handleSubmit} disabled={!areAllWorkPermitsValid(rows)} />
      </div>
    );
  }

  function CertificationSectionEditor({
    onClose,
    onCancel,
  }: {
    onClose: () => void;
    onCancel: () => void;
  }) {
    const rows = draft.certifications ?? [];
    const today = new Date().toISOString().slice(0, 10);

    function handleSubmit() {
      submitChangeRequest({
        field: 'certifications',
        oldValue: JSON.stringify(saved.certifications ?? []),
        newValue: JSON.stringify(rows),
        effectiveDate: today,
        attachmentIds: [],
        sectionKey: 'certification',
      });
      save();
      showToast(tEss('changeRequest.submit'));
      onClose();
    }

    return (
      <div style={{ marginTop: 16 }}>
        <RepeatableEntriesEditor<CertificationEntry>
          entries={rows}
          onChange={(updated) => updateDraft({ certifications: updated })}
          makeEmpty={makeEmptyCertification}
          addLabel={tEss('certification.add')}
          emptyLabel={tEss('certification.empty')}
          renderRow={(entry, patch) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <FormField label={tEss('certification.name')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.name}
                    onChange={(e) => patch({ name: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('certification.type')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.type}
                    onChange={(e) => patch({ type: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('certification.institution')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.institution}
                    onChange={(e) => patch({ institution: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('certification.number')}>
                {(cp) => (
                  <input {...cp} type="text" value={entry.number}
                    onChange={(e) => patch({ number: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('certification.effectiveDate')}>
                {(cp) => (
                  <input {...cp} type="date" value={entry.effectiveDate}
                    onChange={(e) => patch({ effectiveDate: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <FormField label={tEss('certification.expirationDate')}>
                {(cp) => (
                  <input {...cp} type="date" value={entry.expirationDate}
                    onChange={(e) => patch({ expirationDate: e.target.value })} className={REPEATABLE_INPUT_CLS} />
                )}
              </FormField>
              <div className="sm:col-span-2">
                <FileUploadField
                  label={tEss('certification.attachment')}
                  maxFiles={1}
                  onUpload={(id) => patch({ attachmentId: id })}
                  onRemove={() => patch({ attachmentId: null })}
                />
              </div>
            </div>
          )}
        />
        <RepeatableSubmitRow onCancel={onCancel} onSubmit={handleSubmit} disabled={!areAllCertificationsValid(rows)} />
      </div>
    );
  }

  // Card chrome shared by the 4 repeatable sections: title + pending badge +
  // cardinality label + edit pencil, swapping the editor for a capped read list.
  function RepeatableSectionCard({
    title,
    maintainKey,
    sectionKey,
    editing,
    onOpen,
    editor,
    read,
  }: {
    title: string;
    maintainKey: MaintainKey;   // SINGULAR
    sectionKey: SectionKey;     // SINGULAR
    editing: boolean;
    onOpen: () => void;
    editor: ReactNode;
    read: ReactNode;
  }) {
    return (
      <div className="humi-card" style={{ marginTop: 16 }}>
        <div
          className="humi-row"
          style={{ alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
        >
          <h3 className="font-display text-xl font-semibold leading-[1.2] tracking-tight text-ink">
            {title}
            <PendingSectionBadge section={sectionKey} />
            <CardinalityLabel maintainKey={maintainKey} t={tEcMaintain} />
          </h3>
          {!editing && (
            <Button
              variant="ghost"
              size="sm"
              leadingIcon={<Pencil size={13} />}
              onClick={onOpen}
              aria-label={`${t('profileEdit')} — ${title}`}
            >
              {t('profileEdit')}
            </Button>
          )}
        </div>
        {editing ? editor : <div style={{ marginTop: 16 }}>{read}</div>}
      </div>
    );
  }

  // Read/display list — caps at 8 rows with a "Showing 8 of N" footer (less-is-more).
  function ReadPreviewList<T>({
    rows,
    renderOne,
  }: {
    rows: T[];
    renderOne: (row: T, index: number) => ReactNode;
  }) {
    if (rows.length === 0) {
      return <p style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>—</p>;
    }
    const shown = rows.slice(0, 8);
    return (
      <div className="humi-col" style={{ gap: 10 }}>
        {shown.map((row, index) => (
          <div
            key={index}
            className="humi-card humi-card--tight"
            style={{ background: 'var(--color-canvas-soft)' }}
          >
            {renderOne(row, index)}
          </div>
        ))}
        {rows.length > 8 && (
          <p style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
            {tEss('repeatable.showingOf', { shown: 8, total: rows.length })}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* Toast notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: showToastOk ? 'var(--color-accent)' : 'var(--color-danger)',
            color: 'var(--color-canvas)',
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: 14,
            fontWeight: 500,
            zIndex: 9999,
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {toast}
        </div>
      )}

      {/* Single-step edit modal — field value + effective date + attachment in one view */}
      <Modal
        open={gateOpen}
        onClose={handleGateClose}
        title={
          activeEditField ? tEdit(`field.${activeEditField}` as Parameters<typeof tEdit>[0]) : ''
        }
      >
        <div className="space-y-4">
          {/* New value input */}
          {activeEditField && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-ink">
                {tEdit('newValue') || 'ค่าใหม่'}
              </label>
              <input
                type="text"
                value={formValues[activeEditField]}
                onChange={(e) =>
                  setFormValues((f) => ({ ...f, [activeEditField]: e.target.value }))
                }
                className="w-full rounded-md border border-hairline px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
          )}

          {/* Effective date */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-ink">
              {tEdit('effectiveDate') || 'วันที่มีผล'}
              <span className="ml-1 text-danger" aria-hidden>
                *
              </span>
            </label>
            <input
              type="date"
              value={modalDate}
              onChange={(e) => setModalDate(e.target.value)}
              className="w-full rounded-md border border-hairline px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>

          {/* Attachment zone — only for fields requiring it */}
          {attachmentRequired && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-ink">
                {tEdit('required')}
                <span className="ml-1 text-danger" aria-hidden>
                  *
                </span>
              </p>
              <FileUploadField
                label={tEdit('attachLabel')}
                required
                onUpload={(id) => setPendingAttachmentIds((prev) => [...prev, id])}
                onRemove={(id) => setPendingAttachmentIds((prev) => prev.filter((x) => x !== id))}
              />
            </div>
          )}

          {/* Disable hint */}
          {saveDisabled && (
            <p role="alert" className="text-xs text-danger">
              {attachmentRequired && pendingAttachmentIds.length === 0
                ? tEdit('attachmentRequiredHint')
                : tEdit('effectiveDateRequiredHint')}
            </p>
          )}
          <div className="border-t pt-4 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={handleGateClose}>
              {t('profileCancelEdit')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmitChange}
              disabled={saveDisabled}
            >
              {t('save')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* STA-82 — Section-level edit modal: all of a section's editable fields +
          one effective date + one optional attachment, submitted as one CR.
          Replaces the per-field edit for Personal / Marital / Contact. */}
      <Modal
        open={editingSection !== null}
        onClose={closeSectionEdit}
        title={
          editingSection
            ? tEdit(`section.${editingSection}` as Parameters<typeof tEdit>[0])
            : ''
        }
      >
        {editingSection && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {visibleSectionFields(editingSection).map((spec) => (
                <div key={spec.key} className="space-y-1.5">
                  <label className="text-sm font-medium text-ink">
                    {tEdit(`field.${spec.key}` as Parameters<typeof tEdit>[0])}
                    {ATTACHMENT_REQUIRED_FIELDS.has(spec.key) && (
                      <span className="ml-1 text-xs text-ink-muted">({tEdit('required')})</span>
                    )}
                  </label>
                  {spec.options ? (
                    <select
                      value={sectionDraft[spec.key]}
                      onChange={(e) =>
                        setSectionDraft((d) => ({ ...d, [spec.key]: e.target.value }))
                      }
                      className="w-full rounded-md border border-hairline bg-canvas-soft px-3 py-2 text-sm outline-none focus:border-accent"
                    >
                      {spec.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={spec.inputType ?? 'text'}
                      value={sectionDraft[spec.key]}
                      onChange={(e) =>
                        setSectionDraft((d) => ({ ...d, [spec.key]: e.target.value }))
                      }
                      className="w-full rounded-md border border-hairline px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Effective date — one for the whole section change */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-ink">
                {tEdit('effectiveDate')}
                <span className="ml-1 text-danger" aria-hidden>
                  *
                </span>
              </label>
              <input
                type="date"
                value={sectionDate}
                onChange={(e) => setSectionDate(e.target.value)}
                className="w-full rounded-md border border-hairline px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>

            {/* Optional attachment — one for the whole section change. Required
                only when the section contains an attachment-gated field. */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-ink">
                {tEdit('required')}
                {sectionAttachmentRequired && (
                  <span className="ml-1 text-danger" aria-hidden>
                    *
                  </span>
                )}
              </p>
              {sectionAttachmentRequired && (
                <p className="text-xs text-ink-muted">
                  {tEcMaintain('requiredDocs')} — {tEcMaintain('requiredDocsHint')}
                </p>
              )}
              <FileUploadField
                label={tEdit('attachLabel')}
                required={sectionAttachmentRequired}
                onUpload={(id) => setSectionAttachmentIds((prev) => [...prev, id])}
                onRemove={(id) =>
                  setSectionAttachmentIds((prev) => prev.filter((x) => x !== id))
                }
              />
            </div>

            {sectionSaveDisabled && (
              <p role="alert" className="text-xs text-danger">
                {sectionAttachmentRequired && sectionAttachmentIds.length === 0
                  ? tEdit('attachmentRequiredHint')
                  : tEdit('effectiveDateRequiredHint')}
              </p>
            )}

            <div className="border-t pt-4 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={closeSectionEdit}>
                {t('profileCancelEdit')}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmitSection}
                disabled={sectionSaveDisabled}
              >
                {t('save')}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Page h1 — visually hidden; the hero h2 carries the visible name */}
      <h1 className="sr-only">{locale === 'en' ? 'My Profile' : 'โปรไฟล์ของฉัน'}</h1>

      {/* Header card */}
      <div
        className="humi-card mb-5 flex flex-wrap items-center gap-5"
        style={{ padding: '22px 26px', position: 'relative', overflow: 'hidden' }}
      >
        <div
          className="humi-blob"
          style={{
            width: 180,
            height: 180,
            right: -60,
            top: -60,
            background: 'var(--color-accent-soft)',
            opacity: 0.45,
          }}
          aria-hidden
        />
        <span
          className={cn(AVATAR_TONE_MAP[p.avatarTone])}
          style={{
            width: 72,
            height: 72,
            fontSize: 24,
            borderRadius: 18,
            flexShrink: 0,
            position: 'relative',
          }}
          aria-hidden
        >
          {p.initials}
        </span>
        <div style={{ flex: '1 1 260px', minWidth: 0, position: 'relative' }}>
          <div className="humi-row" style={{ gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <h2 className="font-display text-2xl font-semibold leading-[1.1] tracking-tight text-ink">
              {p.nameTh}
            </h2>
            <span style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>{p.pronouns}</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 4 }}>
            {t('subtitle')} · {p.employeeCode}
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'var(--color-ink-muted)',
              marginTop: 4,
            }}
          >
            {p.position} · {p.department} · รายงานต่อ {p.reportsTo}
          </div>
        </div>
        <div
          className="humi-row"
          style={{ gap: 8, flexShrink: 0, position: 'relative', flexWrap: 'wrap' }}
        >
          <span className="humi-tag humi-tag--sage">{t('statusActive')}</span>
          <span className="humi-tag">{p.employmentType}</span>
          <span className="humi-tag">{p.startLabel}</span>
          {/* Tenure — bound to Original Start Date (matches Job tab _yos), no red */}
          <span className="humi-tag" data-testid="profile-tenure">
            {t('tenurePrefix')} {tenureLabel}
          </span>
        </div>
      </div>

      {/* Pending-tasks callout — N change requests still awaiting the employee */}
      {pendingTaskCount > 0 && (
        <div
          className={cn(
            'mb-5 flex items-center gap-3 rounded-[var(--radius-md)] border border-hairline px-4 py-3',
            pendingTaskCount > 0 ? 'bg-warning-soft' : 'bg-canvas-soft',
          )}
          data-testid="profile-tasks-callout"
        >
          <span
            aria-hidden
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
              pendingTaskCount > 0
                ? 'bg-[color:var(--color-warning)] text-white'
                : 'bg-hairline text-ink-muted',
            )}
          >
            {pendingTaskCount > 0 ? <FileText size={15} /> : <Check size={15} />}
          </span>
          <p className="text-body text-ink">
            {pendingTaskCount > 0
              ? t('tasksPending', { count: pendingTaskCount })
              : t('tasksNone')}
          </p>
        </div>
      )}

      {/* Tabs — controlled by Zustand slice */}
      <div className="mb-5 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div
          className="humi-tabs flex-nowrap"
          role="tablist"
          aria-label={t('personalEyebrow')}
          style={{ width: 'max-content' }}
        >
          {tabs.map(([k, l]) => (
            <button
              type="button"
              key={k}
              role="tab"
              aria-selected={activeTab === k}
              className={cn('humi-tab min-h-[44px]', activeTab === k && 'humi-tab--active')}
              onClick={() => handleProfileTabClick(k)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* ── Personal tab ─────────────────────────────────────────────────── */}
      {panelKey === 'personal' && (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Always render full 4-section form; FullEditField gates input+pencil by isEditing
              (display mode = read-only value, edit mode = input + pencil → single-step modal) */}
          {true && (
            <div className="humi-card md:col-span-2">
              <h3 className="mb-4 font-display text-xl font-semibold leading-[1.2] tracking-tight text-ink">
                {t('personalTitle')}
              </h3>
              {/* Section A — Personal Info (STA-82 section-level edit) */}
              <SectionEditHeader
                title={tEdit('section.personal')}
                editLabel={tEdit('editSection')}
                onEdit={() => openSectionEdit('personal')}
                badge={
                  getMaintainConfig('personal').editMode === 'approval' ? (
                    <PendingSectionBadge section={SECTION_TO_STORE_KEY.personal} />
                  ) : null
                }
              />
              <div className="grid gap-3 sm:grid-cols-2" style={{ marginBottom: 20 }}>
                {SECTION_FIELDS.personal.map((spec) => (
                  <ReadOnlyField
                    key={spec.key}
                    label={tEdit(`field.${spec.key}` as Parameters<typeof tEdit>[0])}
                    value={formValues[spec.key]}
                    pendingChange={pendingChanges.find(
                      (pc) => pc.field === spec.key && pc.status === 'pending',
                    )}
                    tPending={tPending}
                  />
                ))}
                {/* BRD #29: personIdExternal — PerPerson stable external ID, read-only */}
                {/* SF cite: sf-extract/qas-fields-2026-04-26/sf-qas-PerPerson-2026-04-26.json .d.results[0].personIdExternal */}
                <div className="humi-col" style={{ gap: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                    {tEdit('field.personIdExternal')}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink-soft)' }}>
                    {derivePersonIdExternal(portedEmployee)}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--color-ink-muted)' }}>
                    (SF External ID — แก้ไขโดย HR เท่านั้น)
                  </span>
                </div>
              </div>

              {/* Section B — Marital (STA-82 section-level edit) */}
              <SectionEditHeader
                title={tEdit('section.marital')}
                editLabel={tEdit('editSection')}
                onEdit={() => openSectionEdit('marital')}
                badge={
                  getMaintainConfig('marital').editMode === 'approval' ? (
                    <PendingSectionBadge section={SECTION_TO_STORE_KEY.marital} />
                  ) : null
                }
              />
              <div className="grid gap-3 sm:grid-cols-2" style={{ marginBottom: 20 }}>
                {SECTION_FIELDS.marital
                  .filter((spec) => spec.key !== 'spouseName' || formValues.maritalStatus === 'สมรส')
                  .map((spec) => (
                    <ReadOnlyField
                      key={spec.key}
                      label={tEdit(`field.${spec.key}` as Parameters<typeof tEdit>[0])}
                      value={formValues[spec.key]}
                      pendingChange={pendingChanges.find(
                        (pc) => pc.field === spec.key && pc.status === 'pending',
                      )}
                      tPending={tPending}
                    />
                  ))}
              </div>

              {/* Section C — Contact (STA-82 section-level edit) */}
              <SectionEditHeader
                title={tEdit('section.contact')}
                editLabel={tEdit('editSection')}
                onEdit={() => openSectionEdit('contact')}
                badge={
                  getMaintainConfig('contact').editMode === 'approval' ? (
                    <PendingSectionBadge section={SECTION_TO_STORE_KEY.contact} />
                  ) : null
                }
              />
              <div className="grid gap-3 sm:grid-cols-2" style={{ marginBottom: 20 }}>
                {/* Business email = read-only (edited by HR only) */}
                <div className="humi-col" style={{ gap: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                    {tEdit('field.businessEmail')}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--color-ink-muted)',
                    }}
                  >
                    {'jongrak.tanaka@central.co.th'}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--color-ink-muted)' }}>
                    (อีเมลธุรกิจแก้ไขโดย HR เท่านั้น)
                  </span>
                </div>
                {SECTION_FIELDS.contact.map((spec) => (
                  <ReadOnlyField
                    key={spec.key}
                    label={tEdit(`field.${spec.key}` as Parameters<typeof tEdit>[0])}
                    value={formValues[spec.key]}
                    pendingChange={pendingChanges.find(
                      (pc) => pc.field === spec.key && pc.status === 'pending',
                    )}
                    tPending={tPending}
                  />
                ))}
              </div>

              {/* Section D — Advanced (STA-82 section-level edit, collapsible) */}
              <button
                type="button"
                onClick={() => setAdvancedOpen((o) => !o)}
                className="flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors mb-3"
                aria-expanded={advancedOpen}
              >
                <span>{advancedOpen ? '▾' : '▸'}</span>
                {tEdit('section.advanced')}
              </button>
              {advancedOpen && (
                <>
                  <SectionEditHeader
                    title=""
                    editLabel={tEdit('editSection')}
                    onEdit={() => openSectionEdit('advanced')}
                    badge={
                      getMaintainConfig('advanced').editMode === 'approval' ? (
                        <PendingSectionBadge section={SECTION_TO_STORE_KEY.advanced} />
                      ) : null
                    }
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {SECTION_FIELDS.advanced.map((spec) => (
                      <ReadOnlyField
                        key={spec.key}
                        label={tEdit(`field.${spec.key}` as Parameters<typeof tEdit>[0])}
                        value={formValues[spec.key]}
                        pendingChange={pendingChanges.find(
                          (pc) => pc.field === spec.key && pc.status === 'pending',
                        )}
                        tPending={tPending}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          <FieldCard
            eyebrow={t('contactEyebrow')}
            title={t('contactTitle')}
            rows={p.contact}
            labelW={140}
          />
        </div>
      )}

      {/* ── Personal tab — Address card (v2 additive) ─────────────────────── */}
      {panelKey === 'personal' && (
        <div className="humi-card" style={{ marginTop: 16 }}>
          <h3 className="font-display text-xl font-semibold leading-[1.2] tracking-tight text-ink">
            {tEss('sections.address')}
            <PendingSectionBadge section="address" />
            <CardinalityLabel maintainKey="address" t={tEcMaintain} />
          </h3>
          {isEditing ? (
            <AddressSectionEditor />
          ) : (
            <div style={{ color: 'var(--color-ink-soft)', fontSize: 14, marginTop: 8 }}>
              {saved.addressStructured?.houseNo
                ? [
                    saved.addressStructured.houseNo,
                    saved.addressStructured.village,
                    saved.addressStructured.soi,
                    saved.addressStructured.road,
                    saved.addressStructured.subdistrict,
                    saved.addressStructured.district,
                    saved.addressStructured.province,
                    saved.addressStructured.postalCode,
                  ]
                    .filter(Boolean)
                    .join(' ')
                : saved.address}
            </div>
          )}
        </div>
      )}

      {/* ── Personal tab — Contact Info multi-value card (v2 additive) ───── */}
      {panelKey === 'personal' && (
        <div className="humi-card" style={{ marginTop: 16 }}>
          <h3 className="font-display text-xl font-semibold leading-[1.2] tracking-tight text-ink">
            {tEss('sections.contact')}
            <PendingSectionBadge section="contact" />
          </h3>
          {isEditing ? (
            <ContactInfoSectionEditor />
          ) : (
            <div style={{ fontSize: 14, marginTop: 8 }}>
              {saved.phonesArr?.length
                ? saved.phonesArr.map((ph, i) => (
                    <div key={i}>
                      {ph.primary && '★ '}
                      {ph.value}
                    </div>
                  ))
                : saved.phone}
              {saved.emailsArr?.length
                ? saved.emailsArr.map((em, i) => (
                    <div key={i}>
                      {em.primary && '★ '}
                      {em.value}
                    </div>
                  ))
                : saved.personalEmail}
            </div>
          )}
        </div>
      )}

      {/* ── Personal tab — Bank card (v2 additive) ───────────────────────── */}
      {panelKey === 'personal' && (
        <div className="humi-card" style={{ marginTop: 16 }}>
          <h3 className="font-display text-xl font-semibold leading-[1.2] tracking-tight text-ink">
            {tEss('sections.bank')}
            <PendingSectionBadge section="bank" />
            <CardinalityLabel maintainKey="bank" t={tEcMaintain} />
          </h3>
          {isEditing ? (
            <BankSectionEditor />
          ) : (
            <div style={{ fontSize: 14, marginTop: 8, color: 'var(--color-ink-soft)' }}>
              {saved.bank?.bankCode
                ? `${saved.bank.bankCode} · ${saved.bank.accountNo} · ${saved.bank.holderName}`
                : '—'}
            </div>
          )}
        </div>
      )}

      {/* ── Personal tab — Formal Education (STA-244 repeatable N) ────────── */}
      {/* Inner presentational helpers are INVOKED (not `<X/>`), so the stable
          RepeatableEntriesEditor reconciles in place and inputs keep focus. */}
      {panelKey === 'personal' &&
        RepeatableSectionCard({
          title: tEss('sections.formalEducation'),
          maintainKey: 'formalEducation',
          sectionKey: 'formalEducation',
          editing: editingFormalEducation,
          onOpen: openFormalEducationEdit,
          editor: FormalEducationSectionEditor({
            onClose: () => setEditingFormalEducation(false),
            onCancel: cancelFormalEducationEdit,
          }),
          read: ReadPreviewList({
            rows: saved.formalEducation ?? [],
            renderOne: (r) => (
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                  {r.isPrimary && '★ '}
                  {[r.degree, r.major].filter(Boolean).join(' · ') || '—'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                  {[r.university, r.graduatedDate].filter(Boolean).join(' · ')}
                </div>
              </div>
            ),
          }),
        })}

      {/* ── Personal tab — Language Skills (STA-244 repeatable N) ─────────── */}
      {panelKey === 'personal' &&
        RepeatableSectionCard({
          title: tEss('sections.languageSkill'),
          maintainKey: 'languageSkill',
          sectionKey: 'languageSkill',
          editing: editingLanguageSkills,
          onOpen: openLanguageSkillsEdit,
          editor: LanguageSkillsSectionEditor({
            onClose: () => setEditingLanguageSkills(false),
            onCancel: cancelLanguageSkillsEdit,
          }),
          read: ReadPreviewList({
            rows: saved.languageSkills ?? [],
            renderOne: (r) => (
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>{r.language || '—'}</div>
                <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                  {[r.speaking, r.reading, r.writing, r.listening].filter(Boolean).join(' · ')}
                  {r.certificate ? ` · ${r.certificate}` : ''}
                </div>
              </div>
            ),
          }),
        })}

      {/* ── Job/Compensation tab ──────────────────────────────────────────── */}
      {panelKey === 'job' && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <FieldCard eyebrow={t('jobEyebrow')} title={t('jobTitle')} rows={p.job} labelW={160} paired />
            <div className="humi-col" style={{ gap: 16 }}>
              {/* Raw 'ค่าตอบแทน 82,500 / เดือน' card removed — duplicated the
                BRD #170 CompensationSummary which is the canonical default-masked
                surface (Ken UAT 2026-04-26: 'salary has double show and it must
                mark as default'). CompensationSummary lives lower in this same
                column when bottom panels render. */}
              <div className="humi-card">
                <div className="humi-eyebrow">{t('historyEyebrow')}</div>
                <div className="humi-col" style={{ gap: 14, marginTop: 10 }}>
                  {p.workHistory.map((r) => (
                    <div key={r.title} className="humi-row">
                      <div
                        style={{
                          width: 6,
                          alignSelf: 'stretch',
                          background:
                            r.tone === 'teal'
                              ? 'var(--color-accent)'
                              : r.tone === 'butter'
                                ? 'var(--color-butter)'
                                : 'var(--color-sage)',
                          borderRadius: 3,
                        }}
                        aria-hidden
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
                          {r.title}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                          {r.dates} · {r.loc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── การลาออก link — intentionally low-prominence on the Employment tab
              (not a sidebar leaf, not on the Time Off / Leave hub): resigning is a
              sensitive lifecycle action, so it stays discoverable-but-not-prominent
              here rather than one click away. ── */}
          <div className="humi-card" style={{ marginTop: 16 }}>
            <div className="humi-eyebrow">{t('resignationSectionEyebrow')}</div>
            <div
              className="humi-row"
              style={{ marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div className="humi-row" style={{ gap: 10 }}>
                <FileX className="h-5 w-5 text-ink-muted" aria-hidden />
                <span style={{ fontSize: 14, color: 'var(--color-ink)' }}>
                  {t('resignationSectionDesc')}
                </span>
              </div>
              <Link
                href={`/${locale}/resignation`}
                className="text-sm font-medium text-accent hover:underline"
              >
                {t('resignationSectionLink')}
              </Link>
            </div>
          </div>

          {/* ── BRD #168: disabilityStatus on employment tab ──────────────────
            SF cite: PerPersonal.customString9 disability code
            sf-extract/qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json */}
          <div className="humi-card" style={{ marginTop: 16 }}>
            <div className="humi-eyebrow" style={{ marginBottom: 8 }}>
              {tEdit('field.disabilityStatus')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 14, color: 'var(--color-ink-soft)' }}>
                {formValues.disabilityStatus ? formValues.disabilityStatus : '—'}
              </span>
              {!isEditing && (
                <button
                  type="button"
                  className="text-sm text-accent hover:underline"
                  onClick={() => {
                    startEdit();
                    handleEditField('disabilityStatus');
                  }}
                  aria-label={`แก้ไข ${tEdit('field.disabilityStatus')}`}
                >
                  {tEdit('field.disabilityStatus') && '✎'}
                </button>
              )}
            </div>
          </div>

          {/* ── BRD #170 ESS Compensation Summary ─────────────────────────── */}
          <CompensationSummary />

          {/* ── P3 read-only Compensation History (self view = owner) ──────── */}
          <CompensationHistory />

          {/* ── Batch 7: Work Experience Within Company (STA-82 EC maintain) ── */}
          {p.workExperienceCompany.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <FieldCard
                eyebrow={t('workExpCompanyEyebrow')}
                title={t('workExpCompanyTitle')}
                rows={p.workExperienceCompany}
                labelW={140}
              />
            </div>
          )}

          {/* ── Batch 7: Previous Employment (STA-82 EC maintain) ────────────── */}
          {p.previousEmployment.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <FieldCard
                eyebrow={t('prevEmploymentEyebrow')}
                title={t('prevEmploymentTitle')}
                rows={p.previousEmployment}
                labelW={140}
              />
            </div>
          )}

          {/* ── STA-244: Work Permit Info (repeatable N) ───────────────────── */}
          {RepeatableSectionCard({
            title: tEss('sections.workPermit'),
            maintainKey: 'workPermit',
            sectionKey: 'workPermit',
            editing: editingWorkPermit,
            onOpen: openWorkPermitEdit,
            editor: WorkPermitSectionEditor({
              onClose: () => setEditingWorkPermit(false),
              onCancel: cancelWorkPermitEdit,
            }),
            read: ReadPreviewList({
              rows: saved.workPermits ?? [],
              renderOne: (r) => (
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                    {[r.documentType, r.documentNumber].filter(Boolean).join(' · ') || '—'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                    {[r.country, r.expiryDate].filter(Boolean).join(' · ')}
                  </div>
                </div>
              ),
            }),
          })}

          {/* ── STA-244: Certifications / Licenses (read-only card upgraded to
              repeatable N editor; source is now the store, not HUMI_MY_PROFILE) ── */}
          {RepeatableSectionCard({
            title: tEss('sections.certification'),
            maintainKey: 'certification',
            sectionKey: 'certification',
            editing: editingCertification,
            onOpen: openCertificationEdit,
            editor: CertificationSectionEditor({
              onClose: () => setEditingCertification(false),
              onCancel: cancelCertificationEdit,
            }),
            read: ReadPreviewList({
              rows: saved.certifications ?? [],
              renderOne: (r) => (
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                    {[r.name, r.type].filter(Boolean).join(' · ') || '—'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                    {[r.institution, r.number].filter(Boolean).join(' · ')}
                  </div>
                </div>
              ),
            }),
          })}

          {/* ── Batch 8: Assessments (STA-82 EC maintain) ───────────────────── */}
          {p.assessments.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <FieldCard
                eyebrow={t('assessmentsEyebrow')}
                title={t('assessmentsTitle')}
                rows={p.assessments}
                labelW={160}
              />
            </div>
          )}

          {/* ── Batch 8: Professional Memberships (STA-82 EC maintain) ─────── */}
          {p.memberships.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <FieldCard
                eyebrow={t('membershipsEyebrow')}
                title={t('membershipsTitle')}
                rows={p.memberships}
                labelW={160}
              />
            </div>
          )}

          {/* ── Batch 8: Special Projects / Community (STA-82 EC maintain) ─── */}
          {p.specialProjects.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <FieldCard
                eyebrow={t('specialProjectsEyebrow')}
                title={t('specialProjectsTitle')}
                rows={p.specialProjects}
                labelW={160}
              />
            </div>
          )}

          {/* ── Batch 9: Documents & E-Letter (STA-82 EC maintain) ──────────── */}
          {p.documents.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <FieldCard
                eyebrow={t('documentsEyebrow')}
                title={t('documentsTitle')}
                rows={p.documents}
                labelW={160}
              />
            </div>
          )}

          {/* ── Batch 9: Advanced Personal / Additional Info (STA-82 EC maintain) */}
          {p.advancedPersonal.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <FieldCard
                eyebrow={t('advancedPersonalEyebrow')}
                title={t('advancedPersonalTitle')}
                rows={p.advancedPersonal}
                labelW={180}
              />
            </div>
          )}

          {/* ── Batch 9: Compensation Extra / Compa-Ratio (STA-82 EC maintain) */}
          {p.compensationExtra.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <FieldCard
                eyebrow={t('compensationExtraEyebrow')}
                title={t('compensationExtraTitle')}
                rows={p.compensationExtra}
                labelW={140}
              />
            </div>
          )}
        </>
      )}

      {/* ── Emergency contacts tab ────────────────────────────────────────── */}
      {panelKey === 'emergency' && (
        <>
          <div className="humi-card">
            <div
              className="humi-row"
              style={{ alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
            >
              <h3 className="font-display text-xl font-semibold leading-[1.2] tracking-tight text-ink">
                {t('emergencyTitle')}
                <PendingSectionBadge section="emergencyContact" />
                <CardinalityLabel maintainKey="emergencyContact" t={tEcMaintain} />
              </h3>
              {!editingEmergency && (
                <Button
                  variant="ghost"
                  size="sm"
                  leadingIcon={<Pencil size={13} />}
                  onClick={openEmergencyEdit}
                  aria-label={t('profileEdit')}
                >
                  {t('profileEdit')}
                </Button>
              )}
            </div>
            <p style={{ color: 'var(--color-ink-muted)', fontSize: 13, marginTop: 6 }}>
              {t('emergencyHelp')}
            </p>
            {editingEmergency ? (
              <EmergencyContactSectionEditor
                onClose={() => setEditingEmergency(false)}
                onCancel={cancelEmergencyEdit}
              />
            ) : (
              <div className="grid gap-3.5 md:grid-cols-2" style={{ marginTop: 16 }}>
                {p.emergency.map((c) => (
                  <div
                    key={c.name}
                    className="humi-card humi-card--tight"
                    style={{ background: 'var(--color-canvas-soft)' }}
                  >
                    <div className="humi-row">
                      <span className={AVATAR_TONE_MAP[c.tone]} aria-hidden>
                        {c.initials}
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>{c.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                          {c.relation} · {c.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── ผู้อุปการะ (BRD #20) ────────────────────────────────────────── */}
          <div className="humi-card" style={{ marginTop: 16 }}>
            <div
              className="humi-row"
              style={{ alignItems: 'center', justifyContent: 'space-between', gap: 12 }}
            >
              <h3 className="font-display text-xl font-semibold leading-[1.2] tracking-tight text-ink">
                ผู้อุปการะ
                <PendingSectionBadge section="dependents" />
                <CardinalityLabel maintainKey="dependents" t={tEcMaintain} />
              </h3>
              {!editingDependents && (
                <Button
                  variant="ghost"
                  size="sm"
                  leadingIcon={<Pencil size={13} />}
                  onClick={openDependentsEdit}
                  aria-label={t('profileEdit')}
                >
                  {t('profileEdit')}
                </Button>
              )}
            </div>
            <p style={{ color: 'var(--color-ink-muted)', fontSize: 13, marginTop: 6 }}>
              สมาชิกในครอบครัวที่ได้รับสวัสดิการ
            </p>
            {editingDependents ? (
              <DependentsSectionEditor
                onClose={() => setEditingDependents(false)}
                onCancel={cancelDependentsEdit}
              />
            ) : (
              <div className="grid gap-3.5 md:grid-cols-2" style={{ marginTop: 16 }}>
                {(saved.dependents ?? []).map((dep) => (
                  <div
                    key={dep.id}
                    className="humi-card humi-card--tight"
                    style={{ background: 'var(--color-canvas-soft)' }}
                  >
                    <div className="humi-row">
                      {dep.tone && dep.initials ? (
                        <span className={AVATAR_TONE_MAP[dep.tone]} aria-hidden>
                          {dep.initials}
                        </span>
                      ) : null}
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                          {dep.fullNameTh}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                          {dep.relation === 'spouse'
                            ? 'คู่สมรส'
                            : dep.relation === 'child'
                              ? 'บุตร'
                              : dep.relation === 'father'
                                ? 'บิดา'
                                : dep.relation === 'mother'
                                  ? 'มารดา'
                                  : 'อื่นๆ'}
                          {dep.dateOfBirth ? ` · เกิด ${dep.dateOfBirth}` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}


      {/* ── Docs tab ─────────────────────────────────────────────────────── */}
      {panelKey === 'docs' && (
        <>
          {/* BRD #173 — link to full Documents library */}
          <div className="humi-row" style={{ justifyContent: 'flex-end', marginBottom: 12 }}>
            <Link
              href={`/${locale}/me/documents`}
              className="humi-tag"
              style={{
                padding: '6px 12px',
                color: 'var(--color-accent)',
                textDecoration: 'underline',
                fontSize: 13,
              }}
              data-testid="profile-me-docs-library-link"
            >
              ดูเอกสารทั้งหมด →
            </Link>
          </div>
          <div className="humi-card">
            <h3 className="font-display text-xl font-semibold leading-[1.2] tracking-tight text-ink">
              {t('docsTitle')}
            </h3>
            <p className="mt-2 text-small text-ink-muted" data-testid="profile-documents-boundary">
              {DOCUMENT_STORYBOARD_BOUNDARY_TH}
            </p>
            <ul className="humi-list mt-2.5" role="list">
              {[
                { n: 'สัญญาจ้างงานที่ลงนาม', d: 'ก.พ. 2568' },
                { n: 'เอกสารรับรองสิทธิทำงาน', d: 'ม.ค. 2568' },
                { n: 'ใบรับรองการอบรมปฐมนิเทศ', d: 'ธ.ค. 2567' },
              ].map((d) => (
                <li key={d.n} className="humi-row-item">
                  <div
                    style={{
                      width: 34,
                      height: 42,
                      borderRadius: 6,
                      background: 'var(--color-canvas-soft)',
                      border: '1px solid var(--color-hairline)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-ink-soft)',
                    }}
                    aria-hidden
                  >
                    <FileText size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
                      {d.n}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                      ยื่นเมื่อ {d.d}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" leadingIcon={<Download size={13} />}>
                    {t('downloadCta')}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* ── Activity tab (tax panel key = activity) — shows pendingChanges ─ */}
      {panelKey === 'tax' && (
        <div className="grid gap-4">
          <div className="humi-card">
            <h3 className="font-display text-xl font-semibold leading-[1.2] tracking-tight text-ink mb-4">
              {tActivity('title')}
            </h3>

            {pendingChanges.length === 0 ? (
              <p style={{ color: 'var(--color-ink-muted)', fontSize: 14 }}>
                {tActivity('noChanges')}
              </p>
            ) : (
              <ul className="humi-col" style={{ gap: 16 }} role="list">
                {pendingChanges.map((pc) => (
                  <PendingChangeCard
                    key={pc.id}
                    pc={pc}
                    attachments={attachments}
                    tPending={tPending}
                    tActivity={tActivity}
                    onWithdraw={withdrawPendingChange}
                  />
                ))}
              </ul>
            )}

            {/* Legacy tax documents */}
            <hr className="humi-divider" style={{ marginTop: 24, marginBottom: 16 }} />
            <h4
              className="font-display text-base font-semibold leading-[1.2] tracking-tight text-ink mb-3"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {t('taxTitle')}
            </h4>
            <ul className="humi-list" role="list">
              {[
                { n: 'ภ.ง.ด. 91 ปี 2568', d: 'ก.พ. 2568' },
                { n: 'หนังสือรับรองการหักภาษี ณ ที่จ่าย', d: 'ม.ค. 2568' },
                { n: '50 ทวิ — ปี 2567', d: 'ธ.ค. 2567' },
              ].map((d) => (
                <li key={d.n} className="humi-row-item">
                  <div
                    style={{
                      width: 34,
                      height: 42,
                      borderRadius: 6,
                      background: 'var(--color-canvas-soft)',
                      border: '1px solid var(--color-hairline)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-ink-soft)',
                    }}
                    aria-hidden
                  >
                    <FileText size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
                      {d.n}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                      ยื่นเมื่อ {d.d}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" leadingIcon={<Download size={13} />}>
                    {t('downloadCta')}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

// ── STA-82 section-level edit presentational helpers ──────────────────────────

// Section header row with a single ghost "Edit" button (replaces the per-field
// pencil for Personal / Marital / Contact). Mirrors the section-editor pattern.
function SectionEditHeader({
  title,
  editLabel,
  onEdit,
  badge,
}: {
  title: string;
  editLabel: string;
  onEdit: () => void;
  /** STA-244: approval-mode sections pass a <PendingSectionBadge> here (config-driven). */
  badge?: ReactNode;
}) {
  return (
    <div
      className="humi-row"
      style={{ alignItems: 'center', justifyContent: 'space-between', marginTop: 4, marginBottom: 10 }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-muted)',
        }}
      >
        {title}
        {badge}
      </span>
      <Button variant="ghost" size="sm" leadingIcon={<Pencil size={13} />} onClick={onEdit}>
        {editLabel}
      </Button>
    </div>
  );
}

// Read-only label/value pair (display mode for section fields). Shows the pending
// badge when a CR for this field is awaiting approval.
function ReadOnlyField({
  label,
  value,
  pendingChange,
  tPending,
}: {
  label: string;
  value: string;
  pendingChange?: PendingChange;
  tPending: ReturnType<typeof useTranslations>;
}) {
  return (
    <div
      className="humi-col"
      style={{ gap: 4, borderBottom: '1px solid var(--color-hairline-soft)', paddingBottom: 12 }}
    >
      <div className="humi-row" style={{ gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--color-ink-muted)', flex: 1 }}>{label}</span>
        {pendingChange && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              background: 'var(--color-butter)',
              color: 'var(--color-danger-ink)',
              borderRadius: 4,
              padding: '1px 6px',
              whiteSpace: 'nowrap',
            }}
          >
            {tPending('badge')}
          </span>
        )}
      </div>
      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink)', padding: '5px 0' }}>
        {value || '—'}
      </span>
    </div>
  );
}

function PendingChangeCard({
  pc,
  attachments,
  tPending,
  tActivity,
  onWithdraw,
}: {
  pc: PendingChange;
  attachments: ReturnType<typeof useHumiProfileStore.getState>['attachments'];
  tPending: ReturnType<typeof useTranslations>;
  tActivity: ReturnType<typeof useTranslations>;
  onWithdraw: (id: string) => void;
}) {
  const pcAttachments = attachments.filter((a) => pc.attachmentIds.includes(a.id));

  const statusTone =
    pc.status === 'approved'
      ? { color: 'var(--color-success)', background: 'var(--color-success-soft)' }
      : pc.status === 'rejected'
        ? { color: 'var(--color-danger-ink)', background: 'var(--color-danger-soft)' }
        : pc.status === 'withdrawn'
          ? { color: 'var(--color-ink-muted)', background: 'var(--color-hairline-soft)' }
          : { color: 'var(--color-warning)', background: 'var(--color-warning-soft)' };

  const statusLabel =
    pc.status === 'approved'
      ? tPending('approved')
      : pc.status === 'rejected'
        ? tPending('rejected')
        : pc.status === 'withdrawn'
          ? 'ถอนคำขอแล้ว / Withdrawn'
          : tPending('badge');

  return (
    <li
      style={{
        border: '1px solid var(--color-hairline)',
        borderRadius: 10,
        padding: '14px 16px',
        background: 'var(--color-canvas-soft)',
      }}
    >
      <div className="humi-row" style={{ gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 4 }}
          >
            {pc.field}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
            {pc.sectionKey === 'bank' || pc.field.toLowerCase().includes('bank') ? 'ข้อมูลอ่อนไหว — แสดงแบบปิดบังสำหรับผู้อนุมัติ · ' : ''}
            {tActivity('changedFrom')}:{' '}
            <b style={{ color: 'var(--color-ink)' }}>{pc.oldValue || '—'}</b>
            {' → '}
            {tActivity('changedTo')}: <b style={{ color: 'var(--color-ink)' }}>{pc.newValue}</b>
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', marginTop: 4 }}>
            {tActivity('effectiveDate')}: {pc.effectiveDate} · {tActivity('requestedAt')}:{' '}
            {new Date(pc.requestedAt).toLocaleDateString('th-TH')}
          </div>
        </div>

        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            background: statusTone.background,
            color: statusTone.color,
            borderRadius: 5,
            padding: '2px 8px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {statusLabel}
        </span>
      </div>

      <div className="humi-row" style={{ gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        <span className="text-small text-ink-muted">
          {pc.status === 'pending'
            ? 'รออนุมัติ — ถอนคำขอได้ก่อนผู้อนุมัติตัดสินเท่านั้น'
            : 'ประวัติคำขอแบบอ่านอย่างเดียวหลังมีผลการตัดสิน'}
        </span>
        {pc.status === 'pending' && (
          <button
            type="button"
            onClick={() => onWithdraw(pc.id)}
            className="rounded-[var(--radius-sm)] border border-hairline bg-surface px-2 py-1 text-small font-medium text-accent hover:bg-accent-soft"
          >
            ถอนคำขอ / Withdraw request
          </button>
        )}
      </div>

      {/* Attachment thumbnails */}
      {pcAttachments.length > 0 && (
        <div className="humi-row" style={{ gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {pcAttachments.map((att) => (
            <a
              key={att.id}
              href={att.base64}
              target="_blank"
              rel="noopener noreferrer"
              title={att.filename}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
                padding: '4px 8px',
                borderRadius: 6,
                border: '1px solid var(--color-hairline)',
                background: 'var(--color-surface)',
                color: 'var(--color-accent)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <FileText size={12} />
              {att.filename.length > 20 ? att.filename.slice(0, 18) + '…' : att.filename}
            </a>
          ))}
        </div>
      )}
    </li>
  );
}

function FieldCard({
  eyebrow,
  title,
  rows,
  labelW,
  paired,
}: {
  eyebrow: string;
  title: string;
  rows: ReadonlyArray<readonly [string, string]>;
  labelW: number;
  paired?: boolean;
}) {
  return (
    <div className="humi-card">
      <div className="humi-eyebrow">{eyebrow}</div>
      <h3 className="mt-1.5 mb-4 font-display text-xl font-semibold leading-[1.2] tracking-tight text-ink">
        {title}
      </h3>
      <div
        className={paired ? 'grid gap-x-8 gap-y-3.5 sm:grid-cols-2' : 'humi-col'}
        style={paired ? undefined : { gap: 14 }}
      >
        {rows.map(([l, v], i) => {
          // Section divider row: label starts with "────" and value is empty.
          // Render as full-width eyebrow heading instead of a label/value pair —
          // mirrors SF EC Core sub-section structure (Employment Details, Org Info, ...)
          if (v === '' && l.startsWith('────')) {
            const heading = l.replace(/────/g, '').trim();
            return (
              <div
                key={i}
                className={paired ? 'sm:col-span-2' : undefined}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  paddingTop: 8,
                  borderTop: '1px solid var(--color-hairline)',
                }}
              >
                {heading}
              </div>
            );
          }
          // In paired mode: rows that are part of a date/years pair occupy one grid
          // cell each (they land side-by-side because they are consecutive in the array).
          // Lone fields (not "Effective Date" / "Years in" labels) would consume a single
          // cell and shift every subsequent pair off-axis — force them to span both columns.
          const isDateOrYearsField =
            paired && (l.includes('Effective Date') || l.includes('Years in'));
          return (
            <div
              key={i}
              className={paired && !isDateOrYearsField ? 'humi-row sm:col-span-2' : 'humi-row'}
              style={{
                borderBottom: '1px solid var(--color-hairline-soft)',
                paddingBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--color-ink-muted)',
                  width: labelW,
                  flexShrink: 0,
                }}
              >
                {l}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink)' }}>{v}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="humi-row">
      <span style={{ color: 'var(--color-ink-muted)' }}>{label}</span>
      <span className="humi-spacer" />
      <b style={{ color: 'var(--color-ink)' }}>{value}</b>
    </div>
  );
}

function EditField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="humi-row"
      style={{
        borderBottom: '1px solid var(--color-hairline-soft)',
        paddingBottom: 10,
        alignItems: 'center',
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', width: 140, flexShrink: 0 }}>
        {label}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--color-ink)',
          background: 'var(--color-canvas-soft)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 7,
          padding: '5px 10px',
          outline: 'none',
        }}
      />
    </div>
  );
}
