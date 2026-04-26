import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// leave-approvals — Zustand+persist store for leave requests.
//
// Manager is the sole approver. Leave queue is separate from the ESS
// personal-info chain (BRD #166). Manager approves leave only; EC
// personal-info changes go to SPD per BRD #166.

export type LeaveType =
  | 'annual'
  | 'sick'
  | 'personal'
  | 'maternity'
  | 'paternity'
  | 'bereavement'
  | 'other';

export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export type LeaveAuditEntry = {
  actorId: string;
  actorName: string;
  action: 'submit' | 'approve' | 'reject';
  comment?: string;
  at: string; // ISO timestamp
};

export type LeaveRequest = {
  id: string; // LV-YYYYMMDD-HHMMSS-<rand>
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string; // ISO date YYYY-MM-DD
  endDate: string;   // ISO date YYYY-MM-DD
  reason: string;
  status: LeaveStatus;
  submittedAt: string; // ISO timestamp
  audit: LeaveAuditEntry[];
};

export const LEAVE_TYPE_LABEL: Record<LeaveType, string> = {
  annual: 'ลาพักร้อน',
  sick: 'ลาป่วย',
  personal: 'ลากิจ',
  maternity: 'ลาคลอด',
  paternity: 'ลาดูแลบุตร (บิดา)',
  bereavement: 'ลาฌาปนกิจ',
  other: 'ลาอื่น ๆ',
};

export const LEAVE_STATUS_LABEL: Record<LeaveStatus, string> = {
  pending: 'รอหัวหน้าอนุมัติ',
  approved: 'อนุมัติแล้ว',
  rejected: 'ถูกปฏิเสธ',
};

interface LeaveApprovalsState {
  requests: LeaveRequest[];
  addRequest: (
    r: Omit<LeaveRequest, 'id' | 'submittedAt' | 'status' | 'audit'>,
  ) => string;
  approve: (id: string, by: { id: string; name: string }, comment?: string) => void;
  reject: (id: string, by: { id: string; name: string }, reason: string) => void;
  clear: () => void;
}

function generateLeaveId(): string {
  const ts = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LV-${ts}-${rand}`;
}

export const useLeaveApprovals = create<LeaveApprovalsState>()(
  persist(
    (set) => ({
      requests: [],
      addRequest: (payload) => {
        const id = generateLeaveId();
        const now = new Date().toISOString();
        const req: LeaveRequest = {
          ...payload,
          id,
          submittedAt: now,
          status: 'pending',
          audit: [
            {
              actorId: payload.employeeId,
              actorName: payload.employeeName,
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
                  status: 'approved' as LeaveStatus,
                  audit: [
                    ...r.audit,
                    {
                      actorId: by.id,
                      actorName: by.name,
                      action: 'approve' as const,
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
                  status: 'rejected' as LeaveStatus,
                  audit: [
                    ...r.audit,
                    {
                      actorId: by.id,
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
      name: 'humi-leave-approvals',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
