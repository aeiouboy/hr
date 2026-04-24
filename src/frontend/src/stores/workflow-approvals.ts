import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Role } from '@/lib/rbac';

// workflow-approvals — shared Zustand store for the 5-persona approval journey.
// One request moves through: submitter → manager → hrbp → spd → done.
// `currentApprover` is the persona who must act next; `audit` records every
// approve/reject touch so the full chain can render in the detail view.

export type ApprovalStep =
  | 'pending_manager'
  | 'pending_hrbp'
  | 'pending_spd'
  | 'approved'
  | 'rejected';

export type FieldDiff = {
  /** Dotted path, e.g. 'contact.phone' / 'names.lastNameLocal' */
  path: string;
  /** Human-readable Thai label (already resolved at submit-time for display) */
  label: string;
  before: string;
  after: string;
};

export type AuditEntry = {
  actorRole: Role;
  actorName: string;
  action: 'submit' | 'approve' | 'reject';
  comment?: string;
  at: string; // ISO timestamp
};

export type ApprovalRequest = {
  id: string; // WF-YYYYMMDD-HHMMSS-<rand>
  type: 'personal_info_change';
  employeeId: string;
  employeeName: string;
  submittedBy: { id: string; name: string; role: Role };
  submittedAt: string;
  currentStep: ApprovalStep;
  diffs: FieldDiff[];
  audit: AuditEntry[];
};

interface WorkflowState {
  requests: ApprovalRequest[];
  addRequest: (r: Omit<ApprovalRequest, 'id' | 'submittedAt' | 'currentStep' | 'audit'>) => string;
  approve: (id: string, by: { role: Role; name: string }, comment?: string) => void;
  reject: (id: string, by: { role: Role; name: string }, reason: string) => void;
  /** Dev/demo reset — wipes the list */
  clear: () => void;
}

const STEP_ORDER: ApprovalStep[] = [
  'pending_manager',
  'pending_hrbp',
  'pending_spd',
  'approved',
];

function nextStep(current: ApprovalStep): ApprovalStep {
  const idx = STEP_ORDER.indexOf(current);
  return idx >= 0 && idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : 'approved';
}

function generateId(): string {
  const ts = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `WF-${ts}-${rand}`;
}

export const useWorkflowApprovals = create<WorkflowState>()(
  persist(
    (set) => ({
      requests: [],
      addRequest: (payload) => {
        const id = generateId();
        const now = new Date().toISOString();
        const req: ApprovalRequest = {
          ...payload,
          id,
          submittedAt: now,
          currentStep: 'pending_manager',
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
      approve: (id, by, comment) =>
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id !== id
              ? r
              : {
                  ...r,
                  currentStep: nextStep(r.currentStep),
                  audit: [
                    ...r.audit,
                    {
                      actorRole: by.role,
                      actorName: by.name,
                      action: 'approve',
                      comment,
                      at: new Date().toISOString(),
                    },
                  ],
                },
          ),
        })),
      reject: (id, by, reason) =>
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id !== id
              ? r
              : {
                  ...r,
                  currentStep: 'rejected',
                  audit: [
                    ...r.audit,
                    {
                      actorRole: by.role,
                      actorName: by.name,
                      action: 'reject',
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
      name: 'humi-workflow-approvals',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const STEP_LABEL: Record<ApprovalStep, string> = {
  pending_manager: 'รอหัวหน้า',
  pending_hrbp: 'รอ HRBP',
  pending_spd: 'รอ SPD',
  approved: 'อนุมัติแล้ว',
  rejected: 'ถูกปฏิเสธ',
};
