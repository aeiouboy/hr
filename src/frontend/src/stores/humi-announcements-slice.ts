import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HumiAnnouncementKind } from '@/lib/humi-mock-data';

export type AnnouncementFilter = 'all' | HumiAnnouncementKind;

interface AnnouncementsState {
  pinned: string[];
  activeFilter: AnnouncementFilter;
  togglePin: (id: string) => void;
  setFilter: (filter: AnnouncementFilter) => void;
}

export const useHumiAnnouncementsStore = create<AnnouncementsState>()(
  persist(
    (set, get) => ({
      pinned: [],
      activeFilter: 'all',

      togglePin: (id) => {
        const { pinned } = get();
        if (pinned.includes(id)) {
          set({ pinned: pinned.filter((p) => p !== id) });
        } else {
          set({ pinned: [...pinned, id] });
        }
      },

      setFilter: (filter) => set({ activeFilter: filter }),
    }),
    {
      name: 'humi-announcements-v1',
    },
  ),
);
