// Zustand slice — /timeoff request form state.
// Persisted to localStorage under key 'humi-timeoff'.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LeaveKind } from '@/lib/humi-mock-data';

export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export interface TimeoffHistoryItem {
  id: string;
  kind: LeaveKind;
  kindLabel: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
  submittedAt: string;
}

interface TimeoffState {
  history: TimeoffHistoryItem[];
  submit: (request: {
    kind: LeaveKind;
    kindLabel: string;
    fromDate: string;
    toDate: string;
    reason: string;
  }) => void;
}

const INITIAL_HISTORY: TimeoffHistoryItem[] = [
  {
    id: 'lh-1',
    kind: 'vacation',
    kindLabel: 'ลาพักร้อน',
    fromDate: '14 มี.ค.',
    toDate: '17 มี.ค.',
    reason: 'พักผ่อนประจำปี',
    status: 'approved',
    submittedAt: '10 มี.ค. 2569',
  },
  {
    id: 'lh-2',
    kind: 'sick',
    kindLabel: 'ลาป่วย',
    fromDate: '2 ก.พ.',
    toDate: '2 ก.พ.',
    reason: 'ไข้หวัด',
    status: 'approved',
    submittedAt: '2 ก.พ. 2569',
  },
  {
    id: 'lh-3',
    kind: 'personal',
    kindLabel: 'ลากิจ',
    fromDate: '8 พ.ย.',
    toDate: '8 พ.ย.',
    reason: 'ธุระส่วนตัว',
    status: 'rejected',
    submittedAt: '5 พ.ย. 2568',
  },
];

export const useTimeoffStore = create<TimeoffState>()(
  persist(
    (set) => ({
      history: INITIAL_HISTORY,
      submit: (request) =>
        set((s) => ({
          history: [
            {
              id: `lh-${Date.now()}`,
              ...request,
              status: 'pending' as LeaveStatus,
              submittedAt: new Date().toLocaleDateString('th-TH', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }),
            },
            ...s.history,
          ],
        })),
    }),
    { name: 'humi-timeoff' }
  )
);
