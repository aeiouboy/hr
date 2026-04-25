import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HUMI_DEPENDENTS, type HumiDependent } from '@/lib/humi-mock-data';

export type ProfileTab = 'personal' | 'employment' | 'compensation' | 'documents' | 'activity';

// ── v2 nested types ────────────────────────────────────────────────────────────

export interface EmergencyContactRow {
  id: string;        // stable local id for React keys
  name: string;
  relation: string;  // one of ['บิดา','มารดา','คู่สมรส','บุตร','พี่น้อง','อื่นๆ']
  phones: string[];  // at least one
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

// ── sectionKey discriminator ───────────────────────────────────────────────────

export type SectionKey = 'emergencyContact' | 'address' | 'contact' | 'bank' | 'personal' | 'termination' | 'dependents';

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
  dependents: HumiDependent[];
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
  status: 'pending' | 'approved' | 'rejected';
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

      toggleAdminMode: () => set((s) => ({ adminMode: !s.adminMode })),
    }),
    {
      name: 'humi-profile-v1',          // KEEP name — version controls migration
      version: 4,
      migrate: (persistedState: any, version: number): ProfileState => {
        if (!persistedState) return persistedState;
        if (version < 4 && version >= 3) {
          // v3 → v4: add dependents[] — enrich legacy minimal rows to new shape
          const enrichDraft = (d: any) => ({
            ...d,
            dependents: Array.isArray(d?.dependents) && d.dependents.length > 0
              ? d.dependents.map((dep: any) => ({
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
                }))
              : HUMI_DEPENDENTS,
          });
          return {
            ...persistedState,
            saved: enrichDraft(persistedState.saved),
            draft: enrichDraft(persistedState.draft),
          } as ProfileState;
        }
        if (version < 3 && version >= 2) {
          // v2 → v3: no-op — SectionKey enum extended with 'termination'; pendingChanges schema unchanged
          return persistedState as ProfileState;
        }
        if (version < 2) {
          // v1 → v2: best-effort map flat address -> addressStructured.houseNo
          const v1Saved = persistedState.saved ?? DRAFT_DEFAULTS;
          const v1Draft = persistedState.draft ?? DRAFT_DEFAULTS;
          const upgrade = (d: any): ProfileDraft => ({
            nickname: d.nickname ?? DRAFT_DEFAULTS.nickname,
            phone: d.phone ?? DRAFT_DEFAULTS.phone,
            personalEmail: d.personalEmail ?? DRAFT_DEFAULTS.personalEmail,
            address: d.address ?? DRAFT_DEFAULTS.address,
            emergencyContacts: [],
            addressStructured: {
              houseNo: typeof d.address === 'string' ? d.address : '',
              village: '', soi: '', road: '',
              subdistrict: '', district: '', province: '', postalCode: '',
            },
            phonesArr: d.phone ? [{ value: d.phone, primary: true }] : [],
            emailsArr: d.personalEmail ? [{ value: d.personalEmail, primary: true }] : [],
            bank: { bankCode: '', accountNo: '', holderName: '', bookAttachmentId: null },
            dependents: HUMI_DEPENDENTS,
          });
          return {
            ...persistedState,
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
