'use client';

// ════════════════════════════════════════════════════════════
// /profile/me — Humi employee self-service profile
// 1:1 port of docs/design-ref/shelfly-bundle/project/screens/profile.jsx
// Adapted retail persona → generic HR persona (HQ manager).
// AppShell owns sidebar+topbar; this file renders main-column only.
// c1-profile-functional: Zustand persist + 5-tab switcher + edit/save/toast
// Build-B: full 15+ field form + admin mode + activity log (issue #12)
// ════════════════════════════════════════════════════════════

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Check, FileText, Download, Pencil, X, FileX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/humi';
import { HUMI_MY_PROFILE, HUMI_EMPLOYEES, type HumiEmployee } from '@/lib/humi-mock-data';
import { SF_PARITY_NEW_EMPLOYEES, withSfParity } from '@/lib/humi-mock-data-sf-parity';
import { useAuthStore } from '@/stores/auth-store';
import {
  useHumiProfileStore,
  type ProfileTab,
  type PendingChange,
  type SectionKey,
} from '@/stores/humi-profile-slice';
import { FileUploadField } from '@/components/humi/FileUploadField';
import { Modal } from '@/components/ui/modal';
import { EmergencyContactList, areAllRowsValid } from '@/components/profile/EmergencyContactList';
import { DependentsEditor, areAllDependentsValid } from '@/components/profile/DependentsEditor';
import { Address8Editor, isAddress8Valid } from '@/components/profile/Address8Editor';
import { BankDetailsEditor, isBankValid } from '@/components/profile/BankDetailsEditor';
import { ContactArrayEditor, isContactArrayValid } from '@/components/profile/ContactArrayEditor';
import CompensationSummary from '@/components/profile/CompensationSummary';

// Map slice tab keys → display keys used by existing tab panels
type TabKey = 'personal' | 'job' | 'emergency' | 'docs' | 'tax';

// Mapping from Zustand ProfileTab → legacy panel key.
// NOTE: slice key `compensation` is a legacy name from an earlier sprint where
// Compensation was a standalone tab. Today's tab #3 displays "ติดต่อฉุกเฉิน"
// and must route to the emergency panel. Compensation cards are
// rendered inside the `job` panel.
const SLICE_TO_PANEL: Record<ProfileTab, TabKey> = {
  personal: 'personal',
  employment: 'job',
  compensation: 'emergency',
  documents: 'docs',
  activity: 'tax', // activity mapped to tax tab panel — now shows pendingChanges
};

const AVATAR_TONE_MAP = {
  teal: 'humi-avatar humi-avatar--teal',
  sage: 'humi-avatar humi-avatar--sage',
  butter: 'humi-avatar humi-avatar--butter',
  ink: 'humi-avatar humi-avatar--ink',
} as const;

// Fields that require attachment before submit (Section A/B)
const ATTACHMENT_REQUIRED_FIELDS = new Set([
  'salutationTh', 'salutationEn',
  'firstNameTh', 'firstNameEn',
  'lastNameTh', 'lastNameEn',
  'nationalId',
  'maritalStatus', 'maritalStatusSince', 'spouseName',
]);

// Picklist options
const SALUTATION_TH = ['นาย', 'นาง', 'นางสาว', 'น.ส.'];
const SALUTATION_EN = ['Mr.', 'Mrs.', 'Miss', 'Ms.'];
const GENDER_OPTIONS = ['male', 'female', 'non_binary', 'prefer_not_to_say'];
const MARITAL_OPTIONS = ['โสด', 'สมรส', 'หย่า', 'หม้าย'];
const RELIGION_OPTIONS = ['buddhist', 'christian', 'muslim', 'hindu', 'other', 'none'];
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const MILITARY_OPTIONS = ['completed', 'exempted', 'deferred', 'not_applicable'];

// ── Editable form state shape ─────────────────────────────────────────────────

interface EditFormValues {
  salutationTh: string;
  salutationEn: string;
  firstNameTh: string;
  firstNameEn: string;
  lastNameTh: string;
  lastNameEn: string;
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
}

const FORM_DEFAULTS: EditFormValues = {
  salutationTh: 'นาย',
  salutationEn: 'Mr.',
  firstNameTh: 'จงรักษ์',
  firstNameEn: 'Jongrak',
  lastNameTh: 'ทานากะ',
  lastNameEn: 'Tanaka',
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
};

// T2 #89 — Persona → SF-parity employee mapping for /profile/me view-as.
// Drives Personal tab content from ported HUMI_EMPLOYEES + SF_PARITY_OVERLAY,
// not hardcoded FORM_DEFAULTS. When admin@ uses TopbarPersonaSwitcher to
// view-as a role, /profile/me reflects that persona's employee record.
const EMP_BY_LOGIN: Record<string, string> = {
  'admin@humi.test':    'emp-005', // ผู้อำนวยการฝ่ายกลยุทธ์
  'spd@humi.test':      'emp-001', // ผู้จัดการฝ่ายทรัพยากรบุคคล
  'hrbp@humi.test':     'emp-007', // หัวหน้าทีมพัฒนาองค์กร
  'manager@humi.test':  'emp-002', // นักวิเคราะห์การเงินอาวุโส
  'employee@humi.test': 'emp-003', // วิศวกรซอฟต์แวร์อาวุโส
};

// All 100 ported employees with SF parity overlay applied.
const ALL_PORTED_EMPLOYEES: HumiEmployee[] = [
  ...HUMI_EMPLOYEES.map(withSfParity),
  ...SF_PARITY_NEW_EMPLOYEES,
];

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

/** Mask Thai national ID: keep first + last 4 digits, mask middle. */
export function maskNationalId(nid: string | undefined): string {
  if (!nid) return '—';
  const clean = nid.replace(/\D/g, '');
  if (clean.length !== 13) return nid;
  return `${clean[0]}-${clean.slice(1, 5).replace(/./g, 'X')}-${clean.slice(5, 9).replace(/./g, 'X')}-${clean.slice(9, 11)}-${clean[11]}${clean[12]}`;
}

/** Find ported employee for the current login email. Falls back to null. */
export function employeeForLogin(email: string | null | undefined): HumiEmployee | null {
  if (!email) return null;
  const id = EMP_BY_LOGIN[email];
  if (!id) return null;
  return ALL_PORTED_EMPLOYEES.find((e) => e.id === id) ?? null;
}

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
    maritalStatus: emp.maritalStatus ? (MARITAL_TH[emp.maritalStatus] ?? FORM_DEFAULTS.maritalStatus) : FORM_DEFAULTS.maritalStatus,
    religion: emp.religion ?? FORM_DEFAULTS.religion,
    bloodType: emp.bloodType ?? FORM_DEFAULTS.bloodType,
    nationality: emp.nationality ? (NATIONALITY_TH[emp.nationality] ?? FORM_DEFAULTS.nationality) : FORM_DEFAULTS.nationality,
    nationalId: maskNationalId(emp.nationalId),
  };
}

// ── PendingSectionBadge — shared chip shown on section headers with pending CR ──

function PendingSectionBadge({ section }: { section: SectionKey }) {
  const pending = useHumiProfileStore((s) =>
    s.pendingChanges.find((pc) => pc.sectionKey === section && pc.status === 'pending')
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

export default function HumiProfileMePage() {
  const t = useTranslations('humiProfile');
  const tEdit = useTranslations('profileEdit');
  const tPending = useTranslations('pending');
  const tToast = useTranslations('profileToast');
  const tActivity = useTranslations('activityLog');
  const tEss = useTranslations('ess');
  const params = useParams();
  const locale = (params?.locale as string) ?? 'th';
  const p = HUMI_MY_PROFILE;

  const {
    activeTab, isEditing, draft, save, saved, setTab, startEdit, updateDraft, cancelEdit,
    pendingChanges, attachments,
    submitChangeRequest,
  } = useHumiProfileStore();

  const [toast, setToast] = useState<string | null>(null);
  const [showToastOk, setShowToastOk] = useState(false);

  // Full form state (local — submitted via single-step modal)
  // T2 #89 — derive defaults from ported HUMI_EMPLOYEES + SF parity, keyed by current login (auth-store
  //          email reflects view-as persona via switchPersona). Falls back to FORM_DEFAULTS.
  const currentEmail = useAuthStore((s) => s.email);
  const portedEmployee = employeeForLogin(currentEmail);
  const initialFormValues = deriveFormValuesFromEmployee(portedEmployee);
  const [formValues, setFormValues] = useState<EditFormValues>(initialFormValues);
  const [pendingAttachmentIds, setPendingAttachmentIds] = useState<string[]>([]);
  const [activeEditField, setActiveEditField] = useState<keyof EditFormValues | null>(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [modalDate, setModalDate] = useState<string>(''); // ISO yyyy-MM-dd
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Derive panel key from slice activeTab
  const panelKey = SLICE_TO_PANEL[activeTab];

  // ── Toast helper ──────────────────────────────────────────────────────────

  const showToast = useCallback((msg: string, success = true) => {
    setToast(msg);
    setShowToastOk(success);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // Auto-cancel edit when user switches tab — only the personal panel renders
  // an edit form; leaving mid-edit strands Save/Cancel with no visible fields.
  useEffect(() => {
    if (isEditing && panelKey !== 'personal') {
      cancelEdit();
    }
  }, [panelKey, isEditing, cancelEdit]);

  // Show success toast after save
  function handleSave() {
    save();
    showToast('บันทึกเรียบร้อย');
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

  // ── Determine if save is disabled (date missing OR required attachment missing) ──

  const attachmentRequired =
    activeEditField !== null && ATTACHMENT_REQUIRED_FIELDS.has(activeEditField);
  const saveDisabled =
    !modalDate || (attachmentRequired && pendingAttachmentIds.length === 0);

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

  function EmergencyContactSectionEditor() {
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
    }

    return (
      <div style={{ marginTop: 16 }}>
        <EmergencyContactList
          value={rows}
          onChange={(updated) => updateDraft({ emergencyContacts: updated })}
        />
        <div style={{ marginTop: 12 }}>
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

  function DependentsSectionEditor() {
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
    }

    return (
      <div style={{ marginTop: 16 }}>
        <DependentsEditor
          value={rows}
          onChange={(updated) => updateDraft({ dependents: updated })}
        />
        <div style={{ marginTop: 12 }}>
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
      houseNo: '', village: '', soi: '', road: '',
      subdistrict: '', district: '', province: '', postalCode: '',
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
              !isContactArrayValid(phones, 'phone') ||
              !isContactArrayValid(emails, 'email')
            }
          >
            {tEss('changeRequest.submit')}
          </Button>
        </div>
      </div>
    );
  }

  function BankSectionEditor() {
    const bankData = draft.bank ?? { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null };
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
            color: '#fff',
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: 14,
            fontWeight: 500,
            zIndex: 9999,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
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
          activeEditField
            ? tEdit(`field.${activeEditField}` as Parameters<typeof tEdit>[0])
            : ''
        }
        footer={
          <div className="flex gap-2 justify-end">
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
              <span className="ml-1 text-danger" aria-hidden>*</span>
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
                <span className="ml-1 text-danger" aria-hidden>*</span>
              </p>
              <FileUploadField
                label="แนบเอกสารประกอบ"
                required
                onUpload={(id) => setPendingAttachmentIds((prev) => [...prev, id])}
                onRemove={(id) =>
                  setPendingAttachmentIds((prev) => prev.filter((x) => x !== id))
                }
              />
            </div>
          )}

          {/* Disable hint */}
          {saveDisabled && (
            <p role="alert" className="text-xs text-danger">
              {attachmentRequired && pendingAttachmentIds.length === 0
                ? 'กรุณาแนบเอกสารก่อนบันทึก'
                : 'กรุณาระบุวันที่มีผล'}
            </p>
          )}
        </div>
      </Modal>

      {/* Top action bar — Edit controls only on personal panel (tab guard
          prevents stranded Save/Cancel on other tabs). Buttons container uses
          fixed min-width to reserve space for 2-button state so toggling
          Edit↔(Cancel+Save) doesn't jump layout (Ken UAT 2026-04-22 "กระตุก"). */}
      <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
        <div className="text-small text-ink-muted">
          {t('subtitle')} · {p.employeeCode}
        </div>
        {panelKey === 'personal' && (
          // Render all 3 buttons always, toggle visibility via CSS — avoids
          // React mount/unmount flash. Container reserves 2-button width so
          // layout doesn't jump when swapping (Ken UAT 2026-04-22 "กระตุก").
          <div
            className="humi-row justify-end"
            style={{ gap: 8, minWidth: 260 }}
          >
            <Button
              variant="primary"
              size="md"
              leadingIcon={<Pencil size={14} />}
              onClick={startEdit}
              className={isEditing ? 'hidden' : ''}
            >
              {t('profileEdit')}
            </Button>
            <Button
              variant="ghost"
              size="md"
              leadingIcon={<X size={14} />}
              onClick={cancelEdit}
              className={isEditing ? '' : 'hidden'}
            >
              {t('profileCancelEdit')}
            </Button>
            <Button
              variant="primary"
              size="md"
              leadingIcon={<Check size={14} />}
              onClick={handleSave}
              className={isEditing ? '' : 'hidden'}
            >
              {t('save')}
            </Button>
          </div>
        )}
      </div>

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
          <div
            className="humi-row"
            style={{ gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}
          >
            <h2 className="font-display text-[24px] font-semibold leading-[1.1] tracking-tight text-ink">
              {p.nameTh}
            </h2>
            <span style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>
              {p.pronouns}
            </span>
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
        </div>
      </div>

      {/* Tabs — controlled by Zustand slice */}
      <div
        className="mb-5 overflow-x-auto"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
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
              onClick={() => setTab(k)}
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
              <h3 className="mb-4 font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
                {t('personalTitle')}
              </h3>
              {/* Section A — Personal Info */}
              <SectionHeader title={tEdit('section.personal')} />
              <div className="grid gap-3 sm:grid-cols-2" style={{ marginBottom: 20 }}>
                <FullEditField
                  label={tEdit('field.salutationTh')}
                  value={formValues.salutationTh}
                  requiresAttachment
                  onChange={(v) => setFormValues((f) => ({ ...f, salutationTh: v }))}
                  onEdit={() => handleEditField('salutationTh')}
                  options={SALUTATION_TH}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'salutationTh' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.salutationEn')}
                  value={formValues.salutationEn}
                  requiresAttachment
                  onChange={(v) => setFormValues((f) => ({ ...f, salutationEn: v }))}
                  onEdit={() => handleEditField('salutationEn')}
                  options={SALUTATION_EN}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'salutationEn' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.firstNameTh')}
                  value={formValues.firstNameTh}
                  requiresAttachment
                  onChange={(v) => setFormValues((f) => ({ ...f, firstNameTh: v }))}
                  onEdit={() => handleEditField('firstNameTh')}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'firstNameTh' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.firstNameEn')}
                  value={formValues.firstNameEn}
                  requiresAttachment
                  onChange={(v) => setFormValues((f) => ({ ...f, firstNameEn: v }))}
                  onEdit={() => handleEditField('firstNameEn')}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'firstNameEn' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.lastNameTh')}
                  value={formValues.lastNameTh}
                  requiresAttachment
                  onChange={(v) => setFormValues((f) => ({ ...f, lastNameTh: v }))}
                  onEdit={() => handleEditField('lastNameTh')}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'lastNameTh' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.lastNameEn')}
                  value={formValues.lastNameEn}
                  requiresAttachment
                  onChange={(v) => setFormValues((f) => ({ ...f, lastNameEn: v }))}
                  onEdit={() => handleEditField('lastNameEn')}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'lastNameEn' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.nickname')}
                  value={formValues.nickname}
                  onChange={(v) => setFormValues((f) => ({ ...f, nickname: v }))}
                  onEdit={() => handleEditField('nickname')}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'nickname' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.gender')}
                  value={formValues.gender}
                  onChange={(v) => setFormValues((f) => ({ ...f, gender: v }))}
                  onEdit={() => handleEditField('gender')}
                  options={GENDER_OPTIONS}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'gender' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.dateOfBirth')}
                  value={formValues.dateOfBirth}
                  inputType="date"
                  onChange={(v) => setFormValues((f) => ({ ...f, dateOfBirth: v }))}
                  onEdit={() => handleEditField('dateOfBirth')}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'dateOfBirth' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.nationality')}
                  value={formValues.nationality}
                  onChange={(v) => setFormValues((f) => ({ ...f, nationality: v }))}
                  onEdit={() => handleEditField('nationality')}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'nationality' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.nationalId')}
                  value={formValues.nationalId}
                  requiresAttachment
                  onChange={(v) => setFormValues((f) => ({ ...f, nationalId: v }))}
                  onEdit={() => handleEditField('nationalId')}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'nationalId' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
              </div>

              {/* Section B — Marital */}
              <SectionHeader title={tEdit('section.marital')} />
              <div className="grid gap-3 sm:grid-cols-2" style={{ marginBottom: 20 }}>
                <FullEditField
                  label={tEdit('field.maritalStatus')}
                  value={formValues.maritalStatus}
                  requiresAttachment
                  onChange={(v) => setFormValues((f) => ({ ...f, maritalStatus: v }))}
                  onEdit={() => handleEditField('maritalStatus')}
                  options={MARITAL_OPTIONS}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'maritalStatus' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.maritalStatusSince')}
                  value={formValues.maritalStatusSince}
                  requiresAttachment
                  inputType="date"
                  onChange={(v) => setFormValues((f) => ({ ...f, maritalStatusSince: v }))}
                  onEdit={() => handleEditField('maritalStatusSince')}
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'maritalStatusSince' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                {formValues.maritalStatus === 'สมรส' && (
                  <FullEditField
                    label={tEdit('field.spouseName')}
                    value={formValues.spouseName}
                    requiresAttachment
                    onChange={(v) => setFormValues((f) => ({ ...f, spouseName: v }))}
                    onEdit={() => handleEditField('spouseName')}
                    pendingChange={pendingChanges.find(
                      (pc) => pc.field === 'spouseName' && pc.status === 'pending'
                    )}
                    tPending={tPending}
                    isEditing={isEditing}
                  />
                )}
              </div>

              {/* Section C — Contact (no attachment required) */}
              <SectionHeader title={tEdit('section.contact')} />
              <div className="grid gap-3 sm:grid-cols-2" style={{ marginBottom: 20 }}>
                {/* Business email = read-only */}
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
                <FullEditField
                  label={tEdit('field.personalEmail')}
                  value={formValues.personalEmail}
                  onChange={(v) => setFormValues((f) => ({ ...f, personalEmail: v }))}
                  onEdit={() => handleEditField('personalEmail')}
                  inputType="email"
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'personalEmail' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.businessPhone')}
                  value={formValues.businessPhone}
                  onChange={(v) => setFormValues((f) => ({ ...f, businessPhone: v }))}
                  onEdit={() => handleEditField('businessPhone')}
                  inputType="tel"
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'businessPhone' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.personalMobile')}
                  value={formValues.personalMobile}
                  onChange={(v) => setFormValues((f) => ({ ...f, personalMobile: v }))}
                  onEdit={() => handleEditField('personalMobile')}
                  inputType="tel"
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'personalMobile' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
                <FullEditField
                  label={tEdit('field.homePhone')}
                  value={formValues.homePhone}
                  onChange={(v) => setFormValues((f) => ({ ...f, homePhone: v }))}
                  onEdit={() => handleEditField('homePhone')}
                  inputType="tel"
                  pendingChange={pendingChanges.find(
                    (pc) => pc.field === 'homePhone' && pc.status === 'pending'
                  )}
                  tPending={tPending}
                  isEditing={isEditing}
                />
              </div>

              {/* Section D — Advanced (collapsible, no attachment) */}
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
                <div className="grid gap-3 sm:grid-cols-2">
                  <FullEditField
                    label={tEdit('field.religion')}
                    value={formValues.religion}
                    onChange={(v) => setFormValues((f) => ({ ...f, religion: v }))}
                    onEdit={() => handleEditField('religion')}
                    options={RELIGION_OPTIONS}
                    pendingChange={pendingChanges.find(
                      (pc) => pc.field === 'religion' && pc.status === 'pending'
                    )}
                    tPending={tPending}
                    isEditing={isEditing}
                  />
                  <FullEditField
                    label={tEdit('field.bloodType')}
                    value={formValues.bloodType}
                    onChange={(v) => setFormValues((f) => ({ ...f, bloodType: v }))}
                    onEdit={() => handleEditField('bloodType')}
                    options={BLOOD_TYPES}
                    pendingChange={pendingChanges.find(
                      (pc) => pc.field === 'bloodType' && pc.status === 'pending'
                    )}
                    tPending={tPending}
                    isEditing={isEditing}
                  />
                  <FullEditField
                    label={tEdit('field.militaryStatus')}
                    value={formValues.militaryStatus}
                    onChange={(v) => setFormValues((f) => ({ ...f, militaryStatus: v }))}
                    onEdit={() => handleEditField('militaryStatus')}
                    options={MILITARY_OPTIONS}
                    pendingChange={pendingChanges.find(
                      (pc) => pc.field === 'militaryStatus' && pc.status === 'pending'
                    )}
                    tPending={tPending}
                    isEditing={isEditing}
                  />
                </div>
              )}
            </div>
          )}
          <FieldCard eyebrow={t('contactEyebrow')} title={t('contactTitle')} rows={p.contact} labelW={140} />
        </div>
      )}

      {/* ── Personal tab — Address card (v2 additive) ─────────────────────── */}
      {panelKey === 'personal' && (
        <div className="humi-card" style={{ marginTop: 16 }}>
          <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
            {tEss('sections.address')}
            <PendingSectionBadge section="address" />
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
          <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
            {tEss('sections.contact')}
            <PendingSectionBadge section="contact" />
          </h3>
          {isEditing ? (
            <ContactInfoSectionEditor />
          ) : (
            <div style={{ fontSize: 14, marginTop: 8 }}>
              {saved.phonesArr?.length
                ? saved.phonesArr.map((ph, i) => (
                    <div key={i}>{ph.primary && '★ '}{ph.value}</div>
                  ))
                : saved.phone}
              {saved.emailsArr?.length
                ? saved.emailsArr.map((em, i) => (
                    <div key={i}>{em.primary && '★ '}{em.value}</div>
                  ))
                : saved.personalEmail}
            </div>
          )}
        </div>
      )}

      {/* ── Personal tab — Bank card (v2 additive) ───────────────────────── */}
      {panelKey === 'personal' && (
        <div className="humi-card" style={{ marginTop: 16 }}>
          <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
            {tEss('sections.bank')}
            <PendingSectionBadge section="bank" />
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

      {/* ── Job/Compensation tab ──────────────────────────────────────────── */}
      {panelKey === 'job' && (
        <>
        <div className="grid gap-4 md:grid-cols-2">
          <FieldCard eyebrow={t('jobEyebrow')} title={t('jobTitle')} rows={p.job} labelW={160} />
          <div className="humi-col" style={{ gap: 16 }}>
            <div className="humi-card">
              <div className="humi-eyebrow">{t('compEyebrow')}</div>
              <h3 className="mt-1.5 font-display text-[22px] font-semibold leading-[1.1] tracking-tight text-ink">
                {p.comp.monthly} / เดือน
              </h3>
              <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 4 }}>
                {p.comp.cadence}
              </div>
              <hr className="humi-divider" />
              <div className="humi-col" style={{ gap: 10, fontSize: 13 }}>
                <CompRow label={t('compBaseLabel')} value={p.comp.base} />
                <CompRow label={t('compBonusLabel')} value={p.comp.bonus} />
                <CompRow label={t('compEquityLabel')} value={p.comp.equity} />
              </div>
            </div>
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

        {/* ── การลาออก link — Ken U1: keep as separate page ─────────────── */}
        <div className="humi-card" style={{ marginTop: 16 }}>
          <div className="humi-eyebrow">{t('resignationSectionEyebrow')}</div>
          <div className="humi-row" style={{ marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="humi-row" style={{ gap: 10 }}>
              <FileX className="h-5 w-5 text-ink-muted" aria-hidden />
              <span style={{ fontSize: 14, color: 'var(--color-ink)' }}>{t('resignationSectionDesc')}</span>
            </div>
            <Link
              href={`/${locale}/resignation`}
              className="text-sm font-medium text-accent hover:underline"
            >
              {t('resignationSectionLink')}
            </Link>
          </div>
        </div>

        {/* ── BRD #170 ESS Compensation Summary ─────────────────────────── */}
        <CompensationSummary />
        </>
      )}

      {/* ── Emergency contacts tab ────────────────────────────────────────── */}
      {panelKey === 'emergency' && (
        <>
          <div className="humi-card">
            <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
              {t('emergencyTitle')}
              <PendingSectionBadge section="emergencyContact" />
            </h3>
            <p style={{ color: 'var(--color-ink-muted)', fontSize: 13, marginTop: 6 }}>
              {t('emergencyHelp')}
            </p>
            {isEditing ? (
              <EmergencyContactSectionEditor />
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
                        <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                          {c.name}
                        </div>
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
            <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
              ผู้อุปการะ
              <PendingSectionBadge section="dependents" />
            </h3>
            <p style={{ color: 'var(--color-ink-muted)', fontSize: 13, marginTop: 6 }}>
              สมาชิกในครอบครัวที่ได้รับสวัสดิการ
            </p>
            {isEditing ? (
              <DependentsSectionEditor />
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
                          {dep.relation === 'spouse' ? 'คู่สมรส'
                            : dep.relation === 'child' ? 'บุตร'
                            : dep.relation === 'father' ? 'บิดา'
                            : dep.relation === 'mother' ? 'มารดา'
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
              style={{ padding: '6px 12px', color: 'var(--color-accent)', textDecoration: 'underline', fontSize: 13 }}
              data-testid="profile-me-docs-library-link"
            >
              ดูเอกสารทั้งหมด →
            </Link>
          </div>
        <div className="humi-card">
          <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
            {t('docsTitle')}
          </h3>
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
        <div className="humi-card">
          <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink mb-4">
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
                />
              ))}
            </ul>
          )}

          {/* Legacy tax documents */}
          <hr className="humi-divider" style={{ marginTop: 24, marginBottom: 16 }} />
          <h4
            className="font-display text-[16px] font-semibold leading-[1.2] tracking-tight text-ink mb-3"
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
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--color-ink-muted)',
        marginBottom: 10,
        marginTop: 4,
      }}
    >
      {title}
    </div>
  );
}

function FullEditField({
  label,
  value,
  onChange,
  onEdit,
  options,
  inputType = 'text',
  requiresAttachment = false,
  pendingChange,
  tPending,
  isEditing,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onEdit: () => void;
  options?: string[];
  inputType?: string;
  requiresAttachment?: boolean;
  pendingChange?: PendingChange;
  tPending: ReturnType<typeof useTranslations>;
  isEditing: boolean;
}) {
  const hasPending = !!pendingChange;

  return (
    <div
      className="humi-col"
      style={{
        gap: 4,
        borderBottom: '1px solid var(--color-hairline-soft)',
        paddingBottom: 12,
      }}
    >
      <div className="humi-row" style={{ gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--color-ink-muted)', flex: 1 }}>
          {label}
          {requiresAttachment && (
            <span className="ml-1 text-[10px] text-ink-muted">(ต้องแนบเอกสาร)</span>
          )}
        </span>
        {hasPending && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              background: 'var(--color-butter)',
              color: '#7c5e00',
              borderRadius: 4,
              padding: '1px 6px',
              whiteSpace: 'nowrap',
            }}
          >
            {tPending('badge')}
          </span>
        )}
      </div>

      <div className="humi-row" style={{ gap: 8, alignItems: 'center' }}>
        {isEditing ? (
          <>
            {options ? (
              <select
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
              >
                {options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                type={inputType}
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
            )}
            <button
              type="button"
              onClick={onEdit}
              aria-label={`แก้ไข ${label}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                borderRadius: 7,
                border: '1px solid var(--color-hairline)',
                background: 'var(--color-canvas-soft)',
                cursor: 'pointer',
                color: 'var(--color-ink-muted)',
                flexShrink: 0,
              }}
            >
              <Pencil size={13} />
            </button>
          </>
        ) : (
          // Display mode — read-only text, no pencil
          <span
            style={{
              flex: 1,
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--color-ink)',
              padding: '5px 0',
            }}
          >
            {value || '—'}
          </span>
        )}
      </div>
    </div>
  );
}

function PendingChangeCard({
  pc,
  attachments,
  tPending,
  tActivity,
}: {
  pc: PendingChange;
  attachments: ReturnType<typeof useHumiProfileStore.getState>['attachments'];
  tPending: ReturnType<typeof useTranslations>;
  tActivity: ReturnType<typeof useTranslations>;
}) {
  const pcAttachments = attachments.filter((a) => pc.attachmentIds.includes(a.id));

  const statusColor =
    pc.status === 'approved'
      ? '#0a6640'
      : pc.status === 'rejected'
        ? '#c53030'
        : '#7c5e00';
  const statusBg =
    pc.status === 'approved'
      ? '#e6f9f0'
      : pc.status === 'rejected'
        ? '#fff5f5'
        : '#fffbe6';

  const statusLabel =
    pc.status === 'approved'
      ? tPending('approved')
      : pc.status === 'rejected'
        ? tPending('rejected')
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
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 4 }}>
            {pc.field}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
            {tActivity('changedFrom')}: <b style={{ color: 'var(--color-ink)' }}>{pc.oldValue || '—'}</b>
            {' → '}
            {tActivity('changedTo')}: <b style={{ color: 'var(--color-ink)' }}>{pc.newValue}</b>
          </div>
          <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', marginTop: 4 }}>
            {tActivity('effectiveDate')}: {pc.effectiveDate} ·{' '}
            {tActivity('requestedAt')}: {new Date(pc.requestedAt).toLocaleDateString('th-TH')}
          </div>
        </div>

        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            background: statusBg,
            color: statusColor,
            borderRadius: 5,
            padding: '2px 8px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {statusLabel}
        </span>
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
                background: '#fff',
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
}: {
  eyebrow: string;
  title: string;
  rows: ReadonlyArray<readonly [string, string]>;
  labelW: number;
}) {
  return (
    <div className="humi-card">
      <div className="humi-eyebrow">{eyebrow}</div>
      <h3 className="mt-1.5 mb-4 font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
        {title}
      </h3>
      <div className="humi-col" style={{ gap: 14 }}>
        {rows.map(([l, v]) => {
          // Section divider row: label starts with "────" and value is empty.
          // Render as full-width eyebrow heading instead of a label/value pair —
          // mirrors SF EC Core sub-section structure (Employment Details, Org Info, ...)
          if (v === '' && l.startsWith('────')) {
            const heading = l.replace(/────/g, '').trim();
            return (
              <div
                key={l}
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
          return (
          <div
            key={l}
            className="humi-row"
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
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink)' }}>
              {v}
            </div>
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
      style={{ borderBottom: '1px solid var(--color-hairline-soft)', paddingBottom: 10, alignItems: 'center' }}
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
