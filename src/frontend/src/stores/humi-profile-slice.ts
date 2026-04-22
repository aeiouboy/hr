import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProfileTab = 'personal' | 'employment' | 'compensation' | 'documents' | 'activity';

interface ProfileDraft {
  nickname: string;
  phone: string;
  personalEmail: string;
  address: string;
}

const DRAFT_DEFAULTS: ProfileDraft = {
  nickname: 'จงรักษ์',
  phone: '+66 (02) 555-0188',
  personalEmail: 'jongrak.tanaka@proton.me',
  address: '241 ถ.สุขุมวิท แขวงคลองตัน กรุงเทพฯ 10110',
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
        };
        set((s) => ({ pendingChanges: [...s.pendingChanges, change] }));
        return id;
      },

      adminApprove: (changeId) => {
        const { pendingChanges } = get();
        const change = pendingChanges.find((pc) => pc.id === changeId);
        if (!change) {
          console.warn('[humi-profile-slice] adminApprove: change not found', changeId);
          return;
        }
        set((s) => ({
          pendingChanges: s.pendingChanges.map((pc) =>
            pc.id === changeId
              ? { ...pc, status: 'approved', approvedAt: new Date().toISOString() }
              : pc
          ),
        }));
      },

      adminReject: (changeId) => {
        const { pendingChanges } = get();
        const change = pendingChanges.find((pc) => pc.id === changeId);
        if (!change) {
          console.warn('[humi-profile-slice] adminReject: change not found', changeId);
          return;
        }
        set((s) => ({
          pendingChanges: s.pendingChanges.map((pc) =>
            pc.id === changeId
              ? { ...pc, status: 'rejected', approvedAt: new Date().toISOString() }
              : pc
          ),
        }));
      },

      toggleAdminMode: () => set((s) => ({ adminMode: !s.adminMode })),
    }),
    {
      name: 'humi-profile-v1',
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
