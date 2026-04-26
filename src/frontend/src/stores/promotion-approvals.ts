import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Role } from '@/lib/rbac';
import { useTimelines } from '@/lib/admin/store/useTimelines';
import type { PromotionEvent } from '@hrms/shared/types/timeline';

// promotion-approvals — Zustand+persist store for promotion requests.
//
// Chain 4: HR Admin submits promotion → pending_spd → SPD approves/rejects.
// Per BRD #103 Promotion workflow.

export type PromotionStep = 'pending_spd' | 'approved' | 'rejected';

export type PromotionAuditEntry = {
  actorRole: Role;
  actorName: string;
  action: 'submit' | 'approve' | 'reject';
  comment?: string;
  at: string; // ISO timestamp
};

export type PromotionRequest = {
  id: string; // PM-YYYYMMDD-HHMMSS-<rand>
  employeeId: string;
  employeeName: string;
  fromPosition: string;
  toPosition: string;
  effectiveDate: string; // ISO date YYYY-MM-DD
  salaryDelta?: number;  // percentage change, e.g. 10 = 10%
  notes?: string;
  status: PromotionStep;
  submittedAt: string; // ISO timestamp
  submittedBy: { id: string; name: string; role: Role };
  audit: PromotionAuditEntry[];
};

export const PROMOTION_STEP_LABEL: Record<PromotionStep, string> = {
  pending_spd: 'รอ SPD อนุมัติ',
  approved:    'อนุมัติแล้ว',
  rejected:    'ถูกปฏิเสธ',
};

interface PromotionApprovalsState {
  requests: PromotionRequest[];
  addRequest: (
    r: Omit<PromotionRequest, 'id' | 'submittedAt' | 'status' | 'audit'>,
  ) => string;
  approve: (id: string, by: { role: Role; name: string }, comment?: string) => void;
  reject: (id: string, by: { role: Role; name: string }, reason: string) => void;
  clear: () => void;
}

function generatePromotionId(): string {
  const ts = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PM-${ts}-${rand}`;
}

export const usePromotionApprovals = create<PromotionApprovalsState>()(
  persist(
    (set, get) => ({
      requests: [],
      addRequest: (payload) => {
        const id = generatePromotionId();
        const now = new Date().toISOString();
        const req: PromotionRequest = {
          ...payload,
          id,
          submittedAt: now,
          status: 'pending_spd',
          audit: [
            {
              actorRole: payload.submittedBy.role,
              actorName: payload.submittedBy.name,
              action: 'submit',
              at: now,
            },
          ],
        };
        set((state) => ({ requests: [req, ...state.requests] }));
        return id;
      },
      approve: (id, by, comment) => {
        // Write timeline event only on SPD approval (BRD #103 — not at submit time)
        const req = get().requests.find((r) => r.id === id);
        if (req && req.status === 'pending_spd') {
          const event: PromotionEvent = {
            id: `evt-prm-${Date.now()}`,
            employeeId: req.employeeId,
            kind: 'promotion',
            effectiveDate: req.effectiveDate,
            recordedAt: new Date().toISOString(),
            actorUserId: by.name,
            fromTitle: req.fromPosition,
            toTitle: req.toPosition,
            salaryChangePct: req.salaryDelta,
            notes: req.notes,
          };
          useTimelines.getState().append(req.employeeId, event);
        }
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id !== id
              ? r
              : {
                  ...r,
                  status: 'approved' as PromotionStep,
                  audit: [
                    ...r.audit,
                    {
                      actorRole: by.role,
                      actorName: by.name,
                      action: 'approve' as const,
                      comment,
                      at: new Date().toISOString(),
                    },
                  ],
                },
          ),
        }));
      },
      reject: (id, by, reason) =>
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id !== id
              ? r
              : {
                  ...r,
                  status: 'rejected' as PromotionStep,
                  audit: [
                    ...r.audit,
                    {
                      actorRole: by.role,
                      actorName: by.name,
                      action: 'reject' as const,
                      comment: reason,
                      at: new Date().toISOString(),
                    },
                  ],
                },
          ),
        })),
      clear: () => set({ requests: [] }),
    }),
    {
      name: 'humi-promotion-approvals',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
