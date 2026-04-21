// Zustand slice — /requests form + filter state.
// Persisted to localStorage under key 'humi-requests'.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RequestStatus } from '@/lib/humi-mock-data';

export type RequestFilterKey = 'all' | 'pending' | 'approved' | 'rejected';

export interface RequestSubmission {
  id: string;
  type: string;
  sub: string;
  submitted: string;
  status: RequestStatus;
}

interface RequestsState {
  submissions: RequestSubmission[];
  filter: RequestFilterKey;
  submit: (entry: { type: string; sub: string }) => void;
  setFilter: (f: RequestFilterKey) => void;
}

export const useRequestsStore = create<RequestsState>()(
  persist(
    (set) => ({
      submissions: [],
      filter: 'all' as RequestFilterKey,
      submit: ({ type, sub }) =>
        set((s) => ({
          submissions: [
            {
              id: `REQ-${Date.now()}`,
              type,
              sub,
              submitted: new Date().toLocaleDateString('th-TH', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }),
              status: 'pending' as RequestStatus,
            },
            ...s.submissions,
          ],
        })),
      setFilter: (filter) => set({ filter }),
    }),
    { name: 'humi-requests' }
  )
);
