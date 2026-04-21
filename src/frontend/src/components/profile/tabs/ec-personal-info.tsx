'use client';

/**
 * EC Personal Information Tab — US-1 + US-2 + US-3
 * Person archetype (Rule 79): view-first, section accordion, edit-in-place with confirmation
 * BRD refs: #12-20, #21, #23, #27 (sensitive: HR-only)
 * Workflow-triggering fields: Name EN/TH, Marital Status, Military Status, Address
 * Direct-edit fields: Contact, National ID (HR-only), Advanced Info
 */

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  User,
  Phone,
  MapPin,
  AlertTriangle,
  Users,
  Shield,
  Briefcase,
  Building,
  CreditCard,
  Info,
  Pencil,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Trash2,
  Lock,
} from 'lucide-react';
import { FieldGroup } from '@/components/ui/field-group';
import { Field } from '@/components/ui/field';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/date';
import { isHR } from '@/lib/rbac';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Address {
  id: string;
  addressType: 'permanent' | 'current' | 'mailing';
  houseNumber?: string;
  moo?: string;
  soi?: string;
  road?: string;
  addressLine1?: string;
  addressLine2?: string;
  subDistrict?: string;
  district?: string;
  province?: string;
  postalCode?: string;
  country?: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
  isPrimary: boolean;
}

interface Dependent {
  id: string;
  nameEn?: string;
  nameTh?: string;
  relationship: string;
  dateOfBirth?: string;
  gender?: string;
  nationalId?: string;
  isTaxDeductible?: boolean;
}

interface WorkPermit {
  id?: string;
  permitType?: string;
  permitNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  issuingCountry?: string;
  status?: string;
  attachmentUrl?: string;
}

interface EcPersonalInfoTabProps {
  employee: Record<string, unknown> | null;
  loading?: boolean;
}

// ─── Workflow-trigger confirmation dialog ─────────────────────────────────────

interface WorkflowConfirmDialogProps {
  open: boolean;
  fieldLabel: string;
  oldValue: string;
  newValue: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function WorkflowConfirmDialog({
  open,
  fieldLabel,
  oldValue,
  newValue,
  onConfirm,
  onCancel,
}: WorkflowConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="ยืนยันการเปลี่ยนแปลงข้อมูล"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onCancel}>
            ยกเลิก
          </Button>
          <Button variant="default" size="sm" onClick={onConfirm}>
            ยืนยันและส่ง Workflow
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 rounded-md bg-warning-tint border border-warning/30">
          <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-ink">
              การเปลี่ยนแปลงนี้จะสร้าง Approval Workflow
            </p>
            <p className="text-sm text-ink-soft mt-1">
              ข้อมูล <strong>{fieldLabel}</strong> เป็นฟิลด์ที่ต้องผ่านการอนุมัติ
              การบันทึกจะส่ง workflow request ไปยังผู้ที่เกี่ยวข้อง
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-md bg-surface-raised">
            <p className="text-xs text-ink-muted mb-1">ค่าเดิม</p>
            <p className="text-ink font-medium">{oldValue || '—'}</p>
          </div>
          <div className="p-3 rounded-md bg-accent-tint border border-accent/30">
            <p className="text-xs text-ink-muted mb-1">ค่าใหม่</p>
            <p className="text-ink font-medium">{newValue || '—'}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ─── Inline edit form helpers ─────────────────────────────────────────────────

interface EditableSelectProps {
  label: string;
  value?: string;
  options: { value: string; label: string }[];
  onSave: (newValue: string) => Promise<void>;
  isWorkflowField?: boolean;
  disabled?: boolean;
}

function EditableSelect({
  label,
  value,
  options,
  onSave,
  isWorkflowField,
  disabled,
}: EditableSelectProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || '');
  const [saving, setSaving] = useState(false);
  const [pendingWorkflow, setPendingWorkflow] = useState(false);

  const displayLabel = options.find((o) => o.value === value)?.label || value || '—';
  const draftLabel = options.find((o) => o.value === draft)?.label || draft;

  const handleSave = async () => {
    if (draft === value) {
      setEditing(false);
      return;
    }
    if (isWorkflowField) {
      setPendingWorkflow(true);
      return;
    }
    setSaving(true);
    try {
      await onSave(draft);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleWorkflowConfirm = async () => {
    setPendingWorkflow(false);
    setSaving(true);
    try {
      await onSave(draft);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="group flex items-center min-h-[48px] py-2 border-b border-hairline last:border-b-0">
        <div className="flex items-center gap-1.5 w-[160px] shrink-0">
          <span className="text-sm text-ink-muted">{label}</span>
          {isWorkflowField && (
            <span title="ต้องผ่าน workflow อนุมัติ">
              <AlertCircle className="h-3 w-3 text-warning" />
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          {editing ? (
            <div className="flex items-center gap-2 flex-1">
              <select
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                disabled={saving}
                className="flex-1 text-sm bg-surface border border-hairline rounded-md px-2 py-1 text-ink outline-none focus:ring-1 focus:ring-accent"
              >
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSave}
                disabled={saving}
                className="p-1 text-success hover:bg-success-tint rounded-md"
              >
                <CheckCircle className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setEditing(false)}
                className="p-1 text-ink-muted hover:bg-surface-raised rounded-md"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <>
              <span className="text-sm text-ink">{displayLabel}</span>
              {!disabled && (
                <button
                  onClick={() => { setDraft(value || ''); setEditing(true); }}
                  className="ml-auto p-1 opacity-0 group-hover:opacity-100 transition-opacity text-ink-muted hover:text-accent"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <WorkflowConfirmDialog
        open={pendingWorkflow}
        fieldLabel={label}
        oldValue={displayLabel}
        newValue={draftLabel}
        onConfirm={handleWorkflowConfirm}
        onCancel={() => setPendingWorkflow(false)}
      />
    </>
  );
}

// ─── Address card ─────────────────────────────────────────────────────────────

const ADDRESS_TYPE_LABELS: Record<string, string> = {
  permanent: 'ที่อยู่ตามทะเบียนบ้าน',
  current: 'ที่อยู่ปัจจุบัน',
  mailing: 'ที่อยู่สำหรับจัดส่งเอกสาร',
};

function AddressCard({ addr, canEdit }: { addr: Address; canEdit: boolean }) {
  const lines: string[] = [];
  if (addr.houseNumber) lines.push(`บ้านเลขที่ ${addr.houseNumber}`);
  if (addr.moo) lines.push(`หมู่ ${addr.moo}`);
  if (addr.soi) lines.push(`ซ. ${addr.soi}`);
  if (addr.road) lines.push(`ถ. ${addr.road}`);
  if (addr.addressLine1) lines.push(addr.addressLine1);
  if (addr.addressLine2) lines.push(addr.addressLine2 as string);
  const locationLine = [addr.subDistrict, addr.district, addr.province, addr.postalCode]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="py-4 border-b border-hairline last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
          {ADDRESS_TYPE_LABELS[addr.addressType] || addr.addressType}
        </span>
        {canEdit && (
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
            <Pencil className="h-3 w-3 mr-1" />
            แก้ไข
          </Button>
        )}
      </div>
      {lines.length > 0 && (
        <p className="text-sm text-ink">{lines.join(' ')}</p>
      )}
      {locationLine && (
        <p className="text-sm text-ink mt-0.5">{locationLine}</p>
      )}
      <p className="text-sm text-ink-muted mt-0.5">{addr.country || 'Thailand'}</p>
    </div>
  );
}

// ─── Emergency contact card ───────────────────────────────────────────────────

function EmergencyContactCard({
  ec,
  canEdit,
}: {
  ec: EmergencyContact;
  canEdit: boolean;
}) {
  const RELATIONSHIP_TH: Record<string, string> = {
    spouse: 'คู่สมรส',
    parent: 'บิดา/มารดา',
    child: 'บุตร',
    sibling: 'พี่/น้อง',
    friend: 'เพื่อน',
    other: 'อื่นๆ',
  };

  return (
    <div className="flex items-start justify-between py-4 border-b border-hairline last:border-b-0">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-ink">{ec.name}</p>
          {ec.isPrimary && (
            <Badge variant="info">หลัก</Badge>
          )}
        </div>
        <p className="text-sm text-ink-muted mt-0.5">
          {RELATIONSHIP_TH[ec.relationship] || ec.relationship}
          {ec.phone && <> · {ec.phone}</>}
        </p>
        {ec.email && (
          <p className="text-xs text-ink-muted mt-0.5">{ec.email}</p>
        )}
      </div>
      {canEdit && (
        <div className="flex items-center gap-1 ml-3">
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Pencil className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-danger hover:text-danger">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Dependent card ───────────────────────────────────────────────────────────

function DependentCard({
  dep,
  canEdit,
  locale,
}: {
  dep: Dependent;
  canEdit: boolean;
  locale: string;
}) {
  const RELATIONSHIP_TH: Record<string, string> = {
    spouse: 'คู่สมรส',
    parent: 'บิดา/มารดา',
    child: 'บุตร',
    sibling: 'พี่/น้อง',
    other: 'อื่นๆ',
  };
  const name = locale === 'th' ? dep.nameTh || dep.nameEn : dep.nameEn || dep.nameTh;

  return (
    <div className="flex items-start justify-between py-4 border-b border-hairline last:border-b-0">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-ink">{name || '—'}</p>
          {dep.isTaxDeductible && (
            <Badge variant="success">ลดหย่อนภาษี</Badge>
          )}
        </div>
        <p className="text-sm text-ink-muted mt-0.5">
          {RELATIONSHIP_TH[dep.relationship] || dep.relationship}
          {dep.dateOfBirth && <> · {formatDate(dep.dateOfBirth, 'medium', locale)}</>}
        </p>
        {dep.nationalId && (
          <p className="text-xs font-mono text-ink-muted mt-0.5">
            บัตร: {dep.nationalId.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5')}
          </p>
        )}
      </div>
      {canEdit && (
        <div className="flex items-center gap-1 ml-3">
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Pencil className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-7 px-2 text-danger hover:text-danger">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Work Permit expiry alert ─────────────────────────────────────────────────

function WorkPermitAlert({ expiryDate }: { expiryDate?: string }) {
  if (!expiryDate) return null;
  const daysLeft = Math.ceil(
    (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (daysLeft > 90) return null;

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-md text-sm mb-3',
        daysLeft <= 0
          ? 'bg-danger-tint text-danger'
          : 'bg-warning-tint text-warning'
      )}
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      {daysLeft <= 0
        ? 'ใบอนุญาตทำงานหมดอายุแล้ว — กรุณาดำเนินการต่ออายุทันที'
        : `ใบอนุญาตทำงานจะหมดอายุใน ${daysLeft} วัน`}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function EcPersonalInfoTab({ employee, loading }: EcPersonalInfoTabProps) {
  const { roles } = useAuthStore();
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';
  const canEdit = isHR(roles);

  // Stub handlers — will be wired to API in backend integration sprint
  const handleSavePersonal = useCallback(
    async (_field: string, _value: string) => {
      // TODO: PATCH /api/v1/employee-center/employees/:id/personal
      await new Promise((r) => setTimeout(r, 400));
    },
    []
  );
  const handleSaveContact = useCallback(
    async (_field: string, _value: string) => {
      // TODO: PATCH /api/v1/employee-center/employees/:id/contact
      await new Promise((r) => setTimeout(r, 400));
    },
    []
  );

  // ─── Loading skeleton ──────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-md bg-surface shadow-card p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j}>
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-5 w-36" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!employee) return null;

  const info = employee.personalInfo as Record<string, string>;
  const advancedInfo = (employee.advancedInfo || {}) as Record<string, string>;
  const contact = employee.contactInfo as Record<string, string>;
  const addresses = (employee.addresses || []) as Address[];
  const emergencyContacts = (employee.emergencyContacts || []) as EmergencyContact[];
  const dependents = (employee.dependents || []) as Dependent[];
  const workPermit = employee.workPermit as WorkPermit | undefined;
  const empInfo = employee.employmentInfo as Record<string, Record<string, string>>;
  const isForeigner = info?.foreignerFlag === 'true' || info?.foreignerFlag === true as unknown as string;

  // ─── 01: Personal Information (BRD #13 — 🔒 HR-only) ──────────────────────
  // ─── 02: Biographical (BRD #12) ───────────────────────────────────────────
  // ─── 03: National ID (BRD #14 — 🔒 HR-only) ──────────────────────────────
  // ─── 04: Contact (BRD #15, #16) ───────────────────────────────────────────
  // ─── 05: Address (BRD #17) ────────────────────────────────────────────────
  // ─── 06: Emergency Contact (BRD #19) ──────────────────────────────────────
  // ─── 07: Dependents (BRD #20) ─────────────────────────────────────────────
  // ─── 08: Work Permit (BRD #18 — foreigners only) ──────────────────────────
  // ─── 09: Employment Info (BRD #21 — read-only) ────────────────────────────
  // ─── 10: Job Info (BRD #23 — read-only) ───────────────────────────────────

  const details = empInfo?.details;
  const org = empInfo?.organization;
  const job = empInfo?.job;

  return (
    <div className="space-y-6">

      {/* ── 01 ชื่อ - ข้อมูลส่วนตัว (🔒 BRD #13 — HR Admin only) ──────────── */}
      {canEdit ? (
        <FieldGroup
          title="ชื่อ / Personal Information"
          icon={<User className="h-5 w-5" />}
          action={
            <Badge variant="warning">
              <Lock className="h-3 w-3 mr-1" />
              HR Admin only
            </Badge>
          }
        >
          {/* Workflow-trigger fields: name changes require approval */}
          <EditableSelect
            label="คำนำหน้า (EN) / Title"
            value={info?.salutationEn}
            options={[
              { value: 'Mr.', label: 'Mr.' },
              { value: 'Mrs.', label: 'Mrs.' },
              { value: 'Ms.', label: 'Ms.' },
              { value: 'Dr.', label: 'Dr.' },
            ]}
            onSave={async (v) => handleSavePersonal('salutationEn', v)}
          />
          <EditableSelect
            label="คำนำหน้า (TH) / คำนำหน้า"
            value={info?.salutationTh}
            options={[
              { value: 'นาย', label: 'นาย' },
              { value: 'นาง', label: 'นาง' },
              { value: 'นางสาว', label: 'นางสาว' },
              { value: 'ดร.', label: 'ดร.' },
            ]}
            onSave={async (v) => handleSavePersonal('salutationTh', v)}
          />
          <Field
            label="ชื่อ (EN) / First Name"
            value={info?.firstNameEn}
            editable={canEdit}
            onSave={(v) => handleSavePersonal('firstNameEn', v)}
            emptyKind="unknown"
          />
          <Field
            label="ชื่อกลาง (EN) / Middle Name"
            value={info?.middleNameEn}
            editable={canEdit}
            onSave={(v) => handleSavePersonal('middleNameEn', v)}
            emptyKind="not-applicable"
          />
          <Field
            label="นามสกุล (EN) / Last Name"
            value={info?.lastNameEn}
            editable={canEdit}
            onSave={(v) => handleSavePersonal('lastNameEn', v)}
          />
          <Field
            label="ชื่อ (TH) / ชื่อจริง"
            value={info?.firstNameTh}
            editable={canEdit}
            onSave={(v) => handleSavePersonal('firstNameTh', v)}
          />
          <Field
            label="ชื่อกลาง (TH)"
            value={info?.middleNameTh}
            editable={canEdit}
            onSave={(v) => handleSavePersonal('middleNameTh', v)}
            emptyKind="not-applicable"
          />
          <Field
            label="นามสกุล (TH) / นามสกุล"
            value={info?.lastNameTh}
            editable={canEdit}
            onSave={(v) => handleSavePersonal('lastNameTh', v)}
          />
          <Field
            label="ชื่อเล่น / Nickname"
            value={info?.nickname}
            editable={canEdit}
            onSave={(v) => handleSavePersonal('nickname', v)}
            emptyKind="not-applicable"
          />
        </FieldGroup>
      ) : (
        // Non-HR: show only display name, no sensitive fields
        <FieldGroup title="ชื่อ / Personal Information" icon={<User className="h-5 w-5" />}>
          <Field
            label="ชื่อ-นามสกุล (EN)"
            value={`${info?.firstNameEn || ''} ${info?.lastNameEn || ''}`.trim() || undefined}
          />
          <Field
            label="ชื่อ-นามสกุล (TH)"
            value={`${info?.firstNameTh || ''} ${info?.lastNameTh || ''}`.trim() || undefined}
          />
          <Field label="ชื่อเล่น / Nickname" value={info?.nickname} emptyKind="not-applicable" />
        </FieldGroup>
      )}

      {/* ── 02 ข้อมูลชีวประวัติ (BRD #12) ───────────────────────────────────── */}
      <FieldGroup title="ชีวประวัติ / Biographical Information" icon={<Info className="h-5 w-5" />}>
        <EditableSelect
          label="เพศ / Gender"
          value={info?.gender}
          options={[
            { value: 'male', label: 'ชาย (Male)' },
            { value: 'female', label: 'หญิง (Female)' },
            { value: 'other', label: 'อื่นๆ (Other)' },
          ]}
          onSave={async (v) => handleSavePersonal('gender', v)}
          disabled={!canEdit}
        />
        <Field
          label="วันเกิด / Date of Birth"
          value={formatDate(info?.dateOfBirth, 'long', locale)}
          mono
          editable={canEdit}
          onSave={(v) => handleSavePersonal('dateOfBirth', v)}
        />
        <EditableSelect
          label="สัญชาติ / Nationality"
          value={info?.nationality}
          options={[
            { value: 'Thai', label: 'ไทย (Thai)' },
            { value: 'Japanese', label: 'ญี่ปุ่น (Japanese)' },
            { value: 'Chinese', label: 'จีน (Chinese)' },
            { value: 'American', label: 'อเมริกัน (American)' },
            { value: 'British', label: 'อังกฤษ (British)' },
            { value: 'Other', label: 'อื่นๆ (Other)' },
          ]}
          onSave={async (v) => handleSavePersonal('nationality', v)}
          disabled={!canEdit}
        />
        <Field
          label="เชื้อชาติ / Race"
          value={info?.race || advancedInfo?.race}
          editable={canEdit}
          onSave={(v) => handleSavePersonal('race', v)}
          emptyKind="not-applicable"
        />
        <EditableSelect
          label="สถานภาพสมรส / Marital Status"
          value={info?.maritalStatus}
          options={[
            { value: 'single', label: 'โสด (Single)' },
            { value: 'married', label: 'สมรส (Married)' },
            { value: 'divorced', label: 'หย่าร้าง (Divorced)' },
            { value: 'widowed', label: 'หม้าย (Widowed)' },
          ]}
          onSave={async (v) => handleSavePersonal('maritalStatus', v)}
          isWorkflowField
          disabled={!canEdit}
        />
        <EditableSelect
          label="สถานะทหาร / Military Status"
          value={advancedInfo?.militaryStatus}
          options={[
            { value: 'completed', label: 'ผ่านการเกณฑ์ (Completed)' },
            { value: 'exempted', label: 'ได้รับการยกเว้น (Exempted)' },
            { value: 'deferred', label: 'รอการเกณฑ์ (Deferred)' },
            { value: 'not_applicable', label: 'ไม่ใช้บังคับ (N/A)' },
          ]}
          onSave={async (v) => handleSavePersonal('militaryStatus', v)}
          isWorkflowField
          disabled={!canEdit}
        />
        <EditableSelect
          label="หมู่เลือด / Blood Type"
          value={advancedInfo?.bloodType}
          options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((t) => ({ value: t, label: t }))}
          onSave={async (v) => handleSavePersonal('bloodType', v)}
          disabled={!canEdit}
        />
        <EditableSelect
          label="ศาสนา / Religion"
          value={advancedInfo?.religion}
          options={[
            { value: 'buddhist', label: 'พุทธ (Buddhism)' },
            { value: 'christian', label: 'คริสต์ (Christianity)' },
            { value: 'islam', label: 'อิสลาม (Islam)' },
            { value: 'hindu', label: 'ฮินดู (Hinduism)' },
            { value: 'other', label: 'อื่นๆ (Other)' },
            { value: 'none', label: 'ไม่มี (None)' },
          ]}
          onSave={async (v) => handleSavePersonal('religion', v)}
          disabled={!canEdit}
        />
        <div className="flex items-center min-h-[48px] py-2 border-b border-hairline">
          <span className="text-sm text-ink-muted w-[160px] shrink-0">
            ชาวต่างชาติ / Foreigner
          </span>
          <span className={cn(
            'text-sm font-medium',
            isForeigner ? 'text-warning' : 'text-ink-soft'
          )}>
            {isForeigner ? 'ใช่ (Yes)' : 'ไม่ใช่ (No)'}
          </span>
        </div>
      </FieldGroup>

      {/* ── 03 เลขประจำตัวประชาชน / National ID (🔒 BRD #14 — HR Admin only) ── */}
      {canEdit && (
        <FieldGroup
          title="เอกสารประจำตัว / National ID"
          icon={<CreditCard className="h-5 w-5" />}
          action={
            <Badge variant="warning">
              <Lock className="h-3 w-3 mr-1" />
              HR Admin only
            </Badge>
          }
        >
          <EditableSelect
            label="ประเภทบัตร / Card Type"
            value={info?.nationalIdType || '1'}
            options={[
              { value: '1', label: '1 — บัตรหลัก (Primary)' },
              { value: '2', label: '2 — Concurrent Employment' },
            ]}
            onSave={async (v) => handleSavePersonal('nationalIdType', v)}
          />
          <Field
            label="เลขบัตร / ID Number"
            value={
              info?.nationalId
                ? info.nationalId.replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5')
                : undefined
            }
            mono
            editable={canEdit}
            onSave={(v) => handleSavePersonal('nationalId', v)}
          />
          <Field
            label="วันออกบัตร / Issue Date"
            value={formatDate(info?.nationalIdIssueDate, 'long', locale)}
            mono
            editable={canEdit}
            onSave={(v) => handleSavePersonal('nationalIdIssueDate', v)}
            emptyKind="unknown"
          />
          <Field
            label="วันหมดอายุ / Expiry Date"
            value={formatDate(info?.nationalIdExpiryDate, 'long', locale)}
            mono
            editable={canEdit}
            onSave={(v) => handleSavePersonal('nationalIdExpiryDate', v)}
            emptyKind="unknown"
          />
          <div className="col-span-2 py-2">
            <p className="text-xs text-ink-muted mb-2">สำเนาบัตรประชาชน / ID Card Attachment</p>
            {info?.nationalIdAttachmentUrl ? (
              <a
                href={info.nationalIdAttachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                <CreditCard className="h-4 w-4" />
                ดูไฟล์แนบ
              </a>
            ) : (
              <Button variant="outline" size="sm" className="text-xs" disabled={!canEdit}>
                <Plus className="h-3 w-3 mr-1" />
                อัปโหลดสำเนาบัตร
              </Button>
            )}
          </div>
        </FieldGroup>
      )}

      {/* ── 04 ช่องทางติดต่อ (BRD #15, #16) ────────────────────────────────── */}
      <FieldGroup
        title="ช่องทางติดต่อ / Contact Information"
        icon={<Phone className="h-5 w-5" />}
      >
        <Field
          label="อีเมลธุรกิจ / Business Email"
          value={contact?.businessEmail}
          editable={canEdit}
          onSave={(v) => handleSaveContact('businessEmail', v)}
        />
        <Field
          label="อีเมลส่วนตัว / Personal Email"
          value={contact?.personalEmail}
          editable={canEdit}
          onSave={(v) => handleSaveContact('personalEmail', v)}
          emptyKind="not-applicable"
        />
        <Field
          label="โทรศัพท์ที่ทำงาน / Business Phone"
          value={contact?.businessPhone}
          mono
          editable={canEdit}
          onSave={(v) => handleSaveContact('businessPhone', v)}
          emptyKind="not-applicable"
        />
        <Field
          label="มือถือส่วนตัว / Personal Mobile"
          value={contact?.personalMobile}
          mono
          editable={canEdit}
          onSave={(v) => handleSaveContact('personalMobile', v)}
          emptyKind="not-applicable"
        />
        <Field
          label="โทรศัพท์บ้าน / Home Phone"
          value={contact?.homePhone}
          mono
          editable={canEdit}
          onSave={(v) => handleSaveContact('homePhone', v)}
          emptyKind="not-applicable"
        />
      </FieldGroup>

      {/* ── 05 ที่อยู่ (BRD #17) ──────────────────────────────────────────── */}
      <FieldGroup
        title="ที่อยู่ / Address"
        icon={<MapPin className="h-5 w-5" />}
        columns={1}
        action={
          canEdit ? (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <Plus className="h-3 w-3 mr-1" />
              เพิ่มที่อยู่
            </Button>
          ) : undefined
        }
      >
        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <AddressCard key={addr.id} addr={addr} canEdit={canEdit} />
          ))
        ) : (
          <p className="text-sm text-ink-muted py-4 text-center">ยังไม่มีข้อมูลที่อยู่</p>
        )}
      </FieldGroup>

      {/* ── 06 ผู้ติดต่อฉุกเฉิน (BRD #19) ──────────────────────────────────── */}
      <FieldGroup
        title="ผู้ติดต่อฉุกเฉิน / Emergency Contact"
        icon={<AlertTriangle className="h-5 w-5" />}
        columns={1}
        action={
          canEdit ? (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <Plus className="h-3 w-3 mr-1" />
              เพิ่มผู้ติดต่อ
            </Button>
          ) : undefined
        }
      >
        {emergencyContacts.length > 0 ? (
          emergencyContacts.map((ec) => (
            <EmergencyContactCard key={ec.id} ec={ec} canEdit={canEdit} />
          ))
        ) : (
          <div className="flex items-center gap-2 py-4 text-sm text-danger">
            <AlertCircle className="h-4 w-4" />
            ต้องมีผู้ติดต่อฉุกเฉินอย่างน้อย 1 คน
          </div>
        )}
      </FieldGroup>

      {/* ── 07 ผู้อยู่ในอุปการะ (BRD #20) ───────────────────────────────────── */}
      <FieldGroup
        title="ผู้อยู่ในอุปการะ / Dependents"
        icon={<Users className="h-5 w-5" />}
        columns={1}
        collapsible
        action={
          canEdit ? (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
              <Plus className="h-3 w-3 mr-1" />
              เพิ่มผู้พึ่งพิง
            </Button>
          ) : undefined
        }
      >
        {dependents.length > 0 ? (
          dependents.map((dep) => (
            <DependentCard key={dep.id} dep={dep} canEdit={canEdit} locale={locale} />
          ))
        ) : (
          <p className="text-sm text-ink-muted py-4 text-center">ไม่มีข้อมูลผู้อยู่ในอุปการะ</p>
        )}
      </FieldGroup>

      {/* ── 08 ใบอนุญาตทำงาน (BRD #18 — show only if foreigner) ─────────────── */}
      {(isForeigner || workPermit) && (
        <FieldGroup
          title="ใบอนุญาตทำงาน / Work Permit"
          icon={<Shield className="h-5 w-5" />}
          collapsible
          action={
            canEdit ? (
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                <Pencil className="h-3 w-3 mr-1" />
                แก้ไข
              </Button>
            ) : undefined
          }
        >
          {workPermit ? (
            <>
              <WorkPermitAlert expiryDate={workPermit.expiryDate} />
              <Field
                label="ประเภทเอกสาร / Permit Type"
                value={workPermit.permitType}
                editable={canEdit}
                onSave={(v) => handleSavePersonal('workPermit.permitType', v)}
              />
              <Field
                label="เลขที่ / Permit Number"
                value={workPermit.permitNumber}
                mono
                editable={canEdit}
                onSave={(v) => handleSavePersonal('workPermit.permitNumber', v)}
              />
              <Field
                label="วันออก / Issue Date"
                value={formatDate(workPermit.issueDate, 'long', locale)}
                mono
              />
              <Field
                label="วันหมดอายุ / Expiry Date"
                value={formatDate(workPermit.expiryDate, 'long', locale)}
                mono
                badge={
                  workPermit.status ? (
                    <Badge
                      variant={
                        workPermit.status === 'active'
                          ? 'success'
                          : workPermit.status === 'expiring'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {workPermit.status === 'active'
                        ? 'ใช้งานได้'
                        : workPermit.status === 'expiring'
                        ? 'ใกล้หมดอายุ'
                        : 'หมดอายุ'}
                    </Badge>
                  ) : undefined
                }
              />
              <Field
                label="ประเทศที่ออก / Country"
                value={workPermit.issuingCountry}
                editable={canEdit}
                onSave={(v) => handleSavePersonal('workPermit.issuingCountry', v)}
              />
              {workPermit.attachmentUrl && (
                <div className="col-span-2 py-2">
                  <a
                    href={workPermit.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                  >
                    <Shield className="h-4 w-4" />
                    ดูเอกสารใบอนุญาต
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="py-4">
              <p className="text-sm text-ink-muted mb-3">ยังไม่มีข้อมูลใบอนุญาตทำงาน</p>
              {canEdit && (
                <Button variant="outline" size="sm" className="text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  เพิ่มใบอนุญาตทำงาน
                </Button>
              )}
            </div>
          )}
        </FieldGroup>
      )}

      {/* ── 09 ข้อมูลการจ้างงาน (BRD #21 — read-only) ───────────────────────── */}
      {details && (
        <FieldGroup
          title="ข้อมูลการจ้างงาน / Employment Information"
          icon={<Briefcase className="h-5 w-5" />}
          collapsible
          defaultOpen={false}
        >
          <Field
            label="วันที่เริ่มงาน / Hire Date"
            value={formatDate(details.hireDate, 'long', locale)}
            mono
          />
          <Field
            label="วันเริ่มงานครั้งแรก / Original Start Date"
            value={formatDate(details.originalStartDate, 'long', locale)}
            mono
          />
          <Field
            label="วันนับอายุงาน / Seniority Start"
            value={formatDate(details.seniorityStartDate, 'long', locale)}
            mono
          />
          <Field
            label="อายุงาน / Years of Service"
            value={details.yearsOfService}
          />
          <Field
            label="วันผ่านทดลองงาน / Probation End"
            value={formatDate(details.passProbationDate, 'long', locale)}
            mono
            emptyKind="pending"
          />
          <Field
            label="วันเกษียณ / Retirement Date"
            value={formatDate(details.retirementDate, 'long', locale)}
            mono
            emptyKind="unknown"
          />
        </FieldGroup>
      )}

      {/* ── 10 ข้อมูลตำแหน่ง (BRD #23 — read-only) ──────────────────────────── */}
      {(org || job) && (
        <FieldGroup
          title="ข้อมูลตำแหน่ง / Job Information"
          icon={<Building className="h-5 w-5" />}
          collapsible
          defaultOpen={false}
        >
          {org && (
            <>
              <Field label="บริษัท / Company" value={org.company} />
              <Field label="ตำแหน่ง / Position" value={org.position} />
              <Field label="ฝ่าย / Department" value={org.department} />
              <Field label="หน่วยธุรกิจ / Business Unit" value={org.businessUnit} />
              <Field label="สถานที่ทำงาน / Work Location" value={org.workLocation} />
              <Field label="ศูนย์ต้นทุน / Cost Center" value={org.costCenter} mono />
            </>
          )}
          {job && (
            <>
              <Field label="หัวหน้างาน / Supervisor" value={job.supervisorName} />
              <Field label="กลุ่มพนักงาน / Employee Group" value={job.employeeGroup} />
              <Field label="ประเภทสัญญา / Contract Type" value={job.contractType} />
              <Field label="สถานะ / Status" value={job.employeeStatus} badge={
                job.employeeStatus ? (
                  <Badge variant={job.employeeStatus.toLowerCase() === 'active' ? 'success' : 'neutral'}>
                    {job.employeeStatus}
                  </Badge>
                ) : undefined
              } />
            </>
          )}
          <div className="col-span-2 py-2">
            <p className="text-xs text-ink-muted flex items-center gap-1">
              <Info className="h-3 w-3" />
              การเปลี่ยนข้อมูลตำแหน่งต้องใช้ "Change Job &amp; Comp" action — ไม่สามารถแก้ไขได้โดยตรง
            </p>
          </div>
        </FieldGroup>
      )}
    </div>
  );
}
