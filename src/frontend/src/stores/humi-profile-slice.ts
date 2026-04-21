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

interface ProfileState {
  activeTab: ProfileTab;
  isEditing: boolean;
  draft: ProfileDraft;
  saved: ProfileDraft;
  setTab: (tab: ProfileTab) => void;
  startEdit: () => void;
  updateDraft: (patch: Partial<ProfileDraft>) => void;
  save: () => void;
  cancelEdit: () => void;
}

export const useHumiProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      activeTab: 'personal',
      isEditing: false,
      draft: DRAFT_DEFAULTS,
      saved: DRAFT_DEFAULTS,

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
    }),
    {
      name: 'humi-profile-v1',
      // persist only stable fields, not transient editing state
      partialize: (s) => ({ activeTab: s.activeTab, saved: s.saved }),
    },
  ),
);
