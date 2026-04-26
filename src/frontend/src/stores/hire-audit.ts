import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// hire-audit — append-only Zustand+persist store for SH4 hire notification entries.
//
// Chain 2: HR Admin completes hire wizard → logs an SH4 mail-notification audit entry.
// HRBP sees the panel on /hrbp-reports (informational only — no Approve/Reject).
// Per BRD #109 + Apr 24 design: HRBP is notified, not an approver.

export type HireAuditEntry = {
  id: string;            // HA-YYYYMMDD-HHMMSS-<rand>
  candidateName: string;
  position: string;
  company: string;
  hireDate: string;      // ISO date YYYY-MM-DD
  hrbpEmail: string;
  hrAdminName: string;
  hrAdminId: string;
  sentAt: string;        // ISO timestamp
};

interface HireAuditState {
  entries: HireAuditEntry[];
  append: (entry: Omit<HireAuditEntry, 'id' | 'sentAt'>) => string;
  clear: () => void;
}

function generateHireAuditId(): string {
  const ts = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HA-${ts}-${rand}`;
}

export const useHireAudit = create<HireAuditState>()(
  persist(
    (set) => ({
      entries: [],
      append: (payload) => {
        const id = generateHireAuditId();
        const now = new Date().toISOString();
        const entry: HireAuditEntry = { ...payload, id, sentAt: now };
        set((state) => ({ entries: [entry, ...state.entries] }));
        return id;
      },
      clear: () => set({ entries: [] }),
    }),
    {
      name: 'humi-hire-audit',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
