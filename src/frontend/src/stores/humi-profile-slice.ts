import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HUMI_DEPENDENTS, type HumiDependent } from '@/lib/humi-mock-data';

export type ProfileTab = 'personal' | 'employment' | 'compensation' | 'benefits' | 'documents' | 'activity';

// ── v2 nested types ────────────────────────────────────────────────────────────

export interface EmergencyContactRow {
  id: string;        // stable local id for React keys
  name: string;
  relation: string;  // one of ['บิดา','มารดา','คู่สมรส','บุตร','พี่น้อง','อื่นๆ']
  phones: string[];  // at least one
  primaryFlag?: boolean; // BRD #19: which emergency contact is the primary
}

export interface Address8 {
  houseNo: string;
  village: string;
  soi: string;
  road: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
}

export interface PhoneEntry { value: string; primary: boolean; label?: string }
export interface EmailEntry { value: string; primary: boolean; label?: string }

export interface BankDetails {
  bankCode: string;           // '' | 'KBANK' | 'SCB' | 'BBL' | 'KTB' | 'BAY' | 'TTB' | 'CIMB'
  accountNo: string;          // digits only; UI validates 10-12
  holderName: string;
  bookAttachmentId: string | null;  // ref into attachments[] (existing array)
}

// ── STA-244 repeatable (N) row types ────────────────────────────────────────────
// Store field is PLURAL (a collection); its registry/SectionKey is SINGULAR
// (a section identity). See specs/sta-244-multi-entry-fields.json for the full
// 47-group cardinality SSoT; only the wired subset is modelled here.

export interface EducationEntry {
  degree: string;
  university: string;
  faculty: string;
  major: string;
  gpa: string;
  graduatedDate: string;   // ISO yyyy-MM-dd
  isPrimary: boolean;      // exactly one primary across the collection
}

export interface LanguageSkillEntry {
  language: string;
  speaking: string;
  reading: string;
  writing: string;
  listening: string;
  certificate: string;
}

export interface WorkPermitEntry {
  documentType: string;
  country: string;
  documentNumber: string;
  issueDate: string;                 // ISO yyyy-MM-dd
  expiryDate: string;                // ISO yyyy-MM-dd
  attachmentId: string | null;       // ref into attachments[]
}

export interface CertificationEntry {
  type: string;
  name: string;
  institution: string;
  effectiveDate: string;             // ISO yyyy-MM-dd
  expirationDate: string;            // ISO yyyy-MM-dd
  number: string;
  attachmentId: string | null;       // ref into attachments[]
}

// ── sectionKey discriminator ───────────────────────────────────────────────────
// STA-244: the 4 new keys are SINGULAR (registry keys); their store arrays are
// PLURAL. No third vocabulary — these SectionKey values double as registry keys.

export type SectionKey =
  | 'emergencyContact'
  | 'address'
  | 'contact'
  | 'bank'
  | 'personal'
  | 'termination'
  | 'dependents'
  | 'formalEducation'
  | 'languageSkill'
  | 'workPermit'
  | 'certification';

// ── ProfileDraft ───────────────────────────────────────────────────────────────

interface ProfileDraft {
  // legacy (kept for back-compat — existing /profile/me renders from these; clean up later)
  nickname: string;
  phone: string;           // deprecated in favor of phonesArr
  personalEmail: string;   // deprecated in favor of emailsArr
  address: string;         // deprecated in favor of addressStructured
  // v2 additions
  emergencyContacts: EmergencyContactRow[];
  addressStructured: Address8;
  phonesArr: PhoneEntry[];
  emailsArr: EmailEntry[];
  bank: BankDetails;
  // v4 additions
  dependents?: HumiDependent[];
  // STA-244 repeatable (N) groups — plural store fields; singular registry keys.
  // Optional so a persisted v6 `saved` that predates them stays []-safe on read.
  formalEducation?: EducationEntry[];
  languageSkills?: LanguageSkillEntry[];
  workPermits?: WorkPermitEntry[];
  certifications?: CertificationEntry[];
}

const DRAFT_DEFAULTS: ProfileDraft = {
  nickname: 'จงรักษ์',
  phone: '+66 (02) 555-0188',
  personalEmail: 'jongrak.tanaka@proton.me',
  address: '241 ถ.สุขุมวิท แขวงคลองตัน กรุงเทพฯ 10110',
  // v2 defaults
  emergencyContacts: [],
  addressStructured: {
    houseNo: '',
    village: '',
    soi: '',
    road: '',
    subdistrict: '',
    district: '',
    province: '',
    postalCode: '',
  },
  phonesArr: [{ value: '+66 (02) 555-0188', primary: true }],
  emailsArr: [{ value: 'jongrak.tanaka@proton.me', primary: true }],
  bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null },
  dependents: HUMI_DEPENDENTS,
  // STA-244 seeds — realistic demo rows so a fresh store opens with data to edit.
  formalEducation: [
    {
      degree: 'ปริญญาตรี',
      university: 'จุฬาลงกรณ์มหาวิทยาลัย',
      faculty: 'พาณิชยศาสตร์และการบัญชี',
      major: 'การบัญชี',
      gpa: '3.45',
      graduatedDate: '2012-03-31',
      isPrimary: true,
    },
    {
      degree: 'ปริญญาโท',
      university: 'สถาบันบัณฑิตพัฒนบริหารศาสตร์',
      faculty: 'บริหารธุรกิจ',
      major: 'การเงิน',
      gpa: '3.72',
      graduatedDate: '2016-05-20',
      isPrimary: false,
    },
  ],
  languageSkills: [
    { language: 'ไทย', speaking: 'ดีมาก', reading: 'ดีมาก', writing: 'ดีมาก', listening: 'ดีมาก', certificate: '' },
    { language: 'อังกฤษ', speaking: 'ดี', reading: 'ดีมาก', writing: 'ดี', listening: 'ดี', certificate: 'TOEIC 820' },
  ],
  workPermits: [
    {
      documentType: 'Work Permit',
      country: 'ไทย',
      documentNumber: 'WP-2566-004821',
      issueDate: '2023-01-10',
      expiryDate: '2026-01-09',
      attachmentId: null,
    },
  ],
  certifications: [
    {
      type: 'วิชาชีพ',
      name: 'ผู้สอบบัญชีรับอนุญาต (CPA)',
      institution: 'สภาวิชาชีพบัญชี',
      effectiveDate: '2017-06-01',
      expirationDate: '',
      number: 'CPA-10482',
      attachmentId: null,
    },
  ],
};

// ════════════════════════════════════════════════════════════
// File attachment stored as base64 string (FE-only prototype).
// Max 5MB enforced at upload time → base64 stays within localStorage quota.
// ════════════════════════════════════════════════════════════

export interface FileAttachment {
  id: string;
  filename: string;
  size: number;       // bytes (original)
  mimeType: string;
  base64: string;     // DataURL e.g. "data:application/pdf;base64,..."
  uploadedAt: string; // ISO-8601
}

export interface PendingChange {
  id: string;
  field: string;
  oldValue: string;
  newValue: string;
  effectiveDate: string;       // ISO-8601 date e.g. "2026-05-01"
  attachmentIds: string[];     // refs into attachments[]
  requestedAt: string;         // ISO-8601
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
  approvedAt?: string;         // ISO-8601, set on approve/reject
  sectionKey?: SectionKey;     // NEW v2 — discriminates section-level CRs from single-field CRs
  reason?: string;             // NEW #54 — captured at approve/reject time; undefined if no reason given
}

// ════════════════════════════════════════════════════════════
// Submit payload — callers provide this; store derives the rest
// ════════════════════════════════════════════════════════════

export interface SubmitChangePayload {
  field: string;
  oldValue: string;
  newValue: string;
  effectiveDate: string;
  attachmentIds: string[];
  sectionKey?: SectionKey;     // NEW v2 — optional section discriminator
}

interface ProfileState {
  activeTab: ProfileTab;
  isEditing: boolean;
  draft: ProfileDraft;
  saved: ProfileDraft;
  // ── new state ──────────────────────────────────────────────
  attachments: FileAttachment[];
  pendingChanges: PendingChange[];
  adminMode: boolean;
  // ── existing actions ───────────────────────────────────────
  setTab: (tab: ProfileTab) => void;
  startEdit: () => void;
  updateDraft: (patch: Partial<ProfileDraft>) => void;
  save: () => void;
  cancelEdit: () => void;
  // ── new actions ────────────────────────────────────────────
  addAttachment: (file: Omit<FileAttachment, 'id' | 'uploadedAt'>) => string;
  removeAttachment: (id: string) => void;
  submitChangeRequest: (payload: SubmitChangePayload) => string;
  adminApprove: (changeId: string) => void;
  adminReject: (changeId: string) => void;
  adminApproveWithReason: (changeId: string, reason?: string) => void;  // NEW #54
  adminRejectWithReason: (changeId: string, reason?: string) => void;   // NEW #54
  withdrawPendingChange: (changeId: string) => void;
  toggleAdminMode: () => void;
}

export const useHumiProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      activeTab: 'personal',
      isEditing: false,
      draft: DRAFT_DEFAULTS,
      saved: DRAFT_DEFAULTS,
      attachments: [],
      pendingChanges: [],
      adminMode: false,

      setTab: (tab) => set({ activeTab: tab }),

      startEdit: () => {
        const { saved } = get();
        set({ isEditing: true, draft: { ...saved } });
      },

      updateDraft: (patch) =>
        set((s) => ({ draft: { ...s.draft, ...patch } })),

      save: () => {
        const { draft } = get();
        set({ saved: { ...draft }, isEditing: false });
      },

      cancelEdit: () => {
        const { saved } = get();
        set({ isEditing: false, draft: { ...saved } });
      },

      // ── Attachment actions ────────────────────────────────

      addAttachment: (file) => {
        const id = crypto.randomUUID();
        const attachment: FileAttachment = {
          ...file,
          id,
          uploadedAt: new Date().toISOString(),
        };
        set((s) => ({ attachments: [...s.attachments, attachment] }));
        return id;
      },

      removeAttachment: (id) => {
        set((s) => ({
          attachments: s.attachments.filter((a) => a.id !== id),
          // also scrub from any pending changes that reference this attachment
          pendingChanges: s.pendingChanges.map((pc) => ({
            ...pc,
            attachmentIds: pc.attachmentIds.filter((aid) => aid !== id),
          })),
        }));
      },

      // ── Pending change actions ────────────────────────────

      submitChangeRequest: (payload) => {
        const id = crypto.randomUUID();
        const change: PendingChange = {
          id,
          field: payload.field,
          oldValue: payload.oldValue,
          newValue: payload.newValue,
          effectiveDate: payload.effectiveDate,
          attachmentIds: payload.attachmentIds,
          requestedAt: new Date().toISOString(),
          status: 'pending',
          ...(payload.sectionKey !== undefined && { sectionKey: payload.sectionKey }),
        };
        set((s) => ({ pendingChanges: [...s.pendingChanges, change] }));
        return id;
      },

      // ── With-Reason variants — canonical implementation (C7 SSoT) ──────────

      adminApproveWithReason: (changeId, reason) => {
        const { pendingChanges } = get();
        const change = pendingChanges.find((pc) => pc.id === changeId);
        if (!change) {
          console.warn('[humi-profile-slice] adminApproveWithReason: change not found', changeId);
          return;
        }
        set((s) => ({
          pendingChanges: s.pendingChanges.map((pc) =>
            pc.id === changeId
              ? { ...pc, status: 'approved', approvedAt: new Date().toISOString(), reason }
              : pc
          ),
        }));
      },

      adminRejectWithReason: (changeId, reason) => {
        const { pendingChanges } = get();
        const change = pendingChanges.find((pc) => pc.id === changeId);
        if (!change) {
          console.warn('[humi-profile-slice] adminRejectWithReason: change not found', changeId);
          return;
        }
        set((s) => ({
          pendingChanges: s.pendingChanges.map((pc) =>
            pc.id === changeId
              ? { ...pc, status: 'rejected', approvedAt: new Date().toISOString(), reason }
              : pc
          ),
        }));
      },

      // ── Legacy wrappers — delegate to With-Reason (preserve existing callers) ──

      adminApprove: (changeId) => {
        get().adminApproveWithReason(changeId, undefined);
      },

      adminReject: (changeId) => {
        get().adminRejectWithReason(changeId, undefined);
      },

      withdrawPendingChange: (changeId) => {
        const { pendingChanges } = get();
        const change = pendingChanges.find((pc) => pc.id === changeId);
        if (!change) {
          console.warn('[humi-profile-slice] withdrawPendingChange: change not found', changeId);
          return;
        }
        if (change.status !== 'pending') {
          console.warn('[humi-profile-slice] withdrawPendingChange: change is not pending', changeId);
          return;
        }
        set((s) => ({
          pendingChanges: s.pendingChanges.map((pc) =>
            pc.id === changeId
              ? {
                  ...pc,
                  status: 'withdrawn',
                  approvedAt: new Date().toISOString(),
                  reason: 'Employee withdrew pending change before approval decision',
                }
              : pc,
          ),
        }));
      },

      toggleAdminMode: () => set((s) => ({ adminMode: !s.adminMode })),
    }),
    {
      name: 'humi-profile-v1',          // KEEP name — version controls migration
      version: 6,
      migrate: (persistedState: unknown, version: number): ProfileState => {
        if (typeof persistedState !== 'object' || persistedState === null) {
          return persistedState as ProfileState;
        }
        const persistedRecord = persistedState as Record<string, unknown>;
        const readDraft = (value: unknown): Record<string, unknown> =>
          typeof value === 'object' && value !== null
            ? value as Record<string, unknown>
            : {};
        if (version < 6 && version >= 5) {
          // v5 → v6 (BRD #167): emergencyContact.relation migrated from Thai string
          // to SF cust_refRelationship externalCode (e.g. 'บิดา' → 'cust_refRelationship_Father')
          const THAI_TO_EXT: Record<string, string> = {
            'บิดา':    'cust_refRelationship_Father',
            'มารดา':   'cust_refRelationship_Mother',
            'คู่สมรส': 'cust_refRelationship_Spouse',
            'บุตร':    'cust_refRelationship_Child',
            'พี่น้อง': 'cust_refRelationship_Brother',
            'อื่นๆ':   'cust_refRelationship_Other',
          };
          const migrateContacts = (contacts: unknown) =>
            Array.isArray(contacts)
              ? contacts.map((contact: unknown) => {
                  const contactRecord = readDraft(contact);
                  const relation = contactRecord.relation;
                  return {
                    ...contactRecord,
                    relation: typeof relation === 'string'
                      ? THAI_TO_EXT[relation] ?? relation
                      : relation,
                  };
                })
              : [];
          const saved = readDraft(persistedRecord.saved);
          const draft = readDraft(persistedRecord.draft);
          return {
            ...persistedRecord,
            saved: { ...saved, emergencyContacts: migrateContacts(saved.emergencyContacts) },
            draft: { ...draft, emergencyContacts: migrateContacts(draft.emergencyContacts) },
          } as ProfileState;
        }
        if (version < 5 && version >= 4) {
          // v4 → v5 (T3 #90): no schema break — PendingChange already supports
          // field-level changes via `field: string`. Bump version to lock in
          // post-#85 Dependents shape + signal field-level CR support
          // (e.g. field='first_name_th' / 'marital_status').
          // Preserve v4 saved/draft/dependents schema verbatim.
          return persistedState as ProfileState;
        }
        if (version < 4 && version >= 3) {
          // v3 → v4: add dependents[] — enrich legacy minimal rows to new shape
          const enrichDraft = (value: unknown) => {
            const draft = readDraft(value);
            return {
              ...draft,
              dependents: Array.isArray(draft.dependents) && draft.dependents.length > 0
              ? draft.dependents.map((dependent: unknown) => {
                  const dep = readDraft(dependent);
                  return {
                    id: dep.id ?? crypto.randomUUID(),
                    fullNameTh: dep.fullNameTh ?? dep.name ?? '',
                    fullNameEn: dep.fullNameEn ?? '',
                    relation: dep.relation ?? 'other',
                    dateOfBirth: dep.dateOfBirth ?? '',
                    nationalId: dep.nationalId,
                    idCopyFileId: dep.idCopyFileId,
                    hasInsurance: dep.hasInsurance ?? false,
                    isCentralEmployee: dep.isCentralEmployee ?? false,
                    name: dep.name,
                    initials: dep.initials,
                    tone: dep.tone,
                  };
                })
              : HUMI_DEPENDENTS,
            };
          };
          return {
            ...persistedRecord,
            saved: enrichDraft(persistedRecord.saved),
            draft: enrichDraft(persistedRecord.draft),
          } as ProfileState;
        }
        if (version < 3 && version >= 2) {
          // v2 → v3: no-op — SectionKey enum extended with 'termination'; pendingChanges schema unchanged
          return persistedState as ProfileState;
        }
        if (version < 2) {
          // v1 → v2: best-effort map flat address -> addressStructured.houseNo
          const v1Saved = readDraft(persistedRecord.saved);
          const v1Draft = readDraft(persistedRecord.draft);
          const upgrade = (draft: Record<string, unknown>): ProfileDraft => ({
            nickname: typeof draft.nickname === 'string' ? draft.nickname : DRAFT_DEFAULTS.nickname,
            phone: typeof draft.phone === 'string' ? draft.phone : DRAFT_DEFAULTS.phone,
            personalEmail: typeof draft.personalEmail === 'string' ? draft.personalEmail : DRAFT_DEFAULTS.personalEmail,
            address: typeof draft.address === 'string' ? draft.address : DRAFT_DEFAULTS.address,
            emergencyContacts: [],
            addressStructured: {
              houseNo: typeof draft.address === 'string' ? draft.address : '',
              village: '', soi: '', road: '',
              subdistrict: '', district: '', province: '', postalCode: '',
            },
            phonesArr: typeof draft.phone === 'string' ? [{ value: draft.phone, primary: true }] : [],
            emailsArr: typeof draft.personalEmail === 'string' ? [{ value: draft.personalEmail, primary: true }] : [],
            bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null },
            dependents: HUMI_DEPENDENTS,
          });
          return {
            ...persistedRecord,
            saved: upgrade(v1Saved),
            draft: upgrade(v1Draft),
          } as ProfileState;
        }
        return persistedState as ProfileState;
      },
      // persist stable fields + new attachment/change state; exclude transient editing
      partialize: (s) => ({
        activeTab: s.activeTab,
        saved: s.saved,
        attachments: s.attachments,
        pendingChanges: s.pendingChanges,
        adminMode: s.adminMode,
      }),
    },
  ),
);
