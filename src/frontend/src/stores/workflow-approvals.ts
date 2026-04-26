import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Role } from '@/lib/rbac';

// workflow-approvals — shared Zustand store for personal-info change requests.
//
// Per BRD #166 + code comment at ess/profile/edit/page.tsx ("รอ SPD อนุมัติ"),
// the canonical chain for a personal-info change is ONE step:
//   Employee submit → pending_spd → approved | rejected
//
// Earlier drafts routed requests through manager → hrbp → spd. That was an
// enterprise-style assumption, not grounded in Humi's BRD. Leave / lifecycle
// workflows (Manager approves leave, HRBP manages lifecycle) are separate
// queues handled by different stores — not this one.

export type ApprovalStep = 'pending_spd' | 'approved' | 'rejected';

export type FieldDiff = {
  /** Dotted path, e.g. 'contact.phone' / 'names.lastNameLocal' */
  path: string;
  /** Human-readable Thai label (already resolved at submit-time for display) */
  label: string;
  before: string;
  after: string;
};

export type Attachment = {
  filename: string;
  mimeType: string;
  size: number;
  /** Data URL (base64). Persisted in localStorage — keep files under 5 MB. */
  dataUrl: string;
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
  status: ApprovalStep;
  diffs: FieldDiff[];
  /** Required for name changes (marriage cert / deed poll / nationality cert). */
  attachments?: Attachment[];
  audit: AuditEntry[];
};

interface WorkflowState {
  requests: ApprovalRequest[];
  addRequest: (
    r: Omit<ApprovalRequest, 'id' | 'submittedAt' | 'status' | 'audit'>,
  ) => string;
  approve: (id: string, by: { role: Role; name: string }, comment?: string) => void;
  reject: (id: string, by: { role: Role; name: string }, reason: string) => void;
  /** Dev/demo reset — wipes the list */
  clear: () => void;
}

// 1-step chain — SPD is the sole approver. `approve()` jumps straight to
// 'approved' regardless of who clicks. Kept as a function for future
// multi-step workflows without reshaping the call sites.
function nextStep(_current: ApprovalStep): ApprovalStep {
  return 'approved';
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
      approve: (id, by, comment) =>
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id !== id
              ? r
              : {
                  ...r,
                  status: nextStep(r.status),
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
                  status: 'rejected',
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
  pending_spd: 'รอ SPD อนุมัติ',
  approved: 'อนุมัติแล้ว',
  rejected: 'ถูกปฏิเสธ',
};
