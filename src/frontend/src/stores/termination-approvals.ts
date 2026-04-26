import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Role } from '@/lib/rbac';

// termination-approvals — Zustand+persist store for ESS termination requests.
//
// Chain 1: Employee submits resignation → pending_spd → SPD approves/rejects.
// Reason codes sourced from SF zVoluntary picklist (sf-extract/qas-fields-2026-04-25).
// 17 codes total: 16 TERM_* from zVoluntary + TERM_OTHER.

export type TerminationStep = 'pending_spd' | 'approved' | 'rejected';

// 17 SF termination reason codes with Thai labels (sf-extract/terminate/ is empty;
// Thai labels hand-authored per BRD #172 + zVoluntary externalCodes from QAS extract).
export type TerminationReasonCode =
  | 'TERM_RESIGN'
  | 'TERM_DISMISS'
  | 'TERM_LAYOFF'
  | 'TERM_RETRIE'
  | 'TERM_ERLRETIRE'
  | 'TERM_EOC'
  | 'TERM_COVID'
  | 'TERM_ENDASSIGN'
  | 'TERM_UNSUCPROB'
  | 'TERM_PASSAWAY'
  | 'TERM_TRANS'
  | 'TERM_NOSHOW'
  | 'TERM_REORG'
  | 'TERM_CRISIS'
  | 'TERM_REDUNDANCY'
  | 'TERM_ABSENT'
  | 'TERM_OTHER';

export const TERMINATION_REASON_LABEL: Record<TerminationReasonCode, string> = {
  TERM_RESIGN:    'ลาออกโดยสมัครใจ',
  TERM_DISMISS:   'ถูกเลิกจ้าง / ไล่ออก',
  TERM_LAYOFF:    'ถูกพักงาน / เลิกจ้างชั่วคราว',
  TERM_RETRIE:    'เกษียณอายุ',
  TERM_ERLRETIRE: 'เกษียณก่อนกำหนด',
  TERM_EOC:       'ครบกำหนดสัญญาจ้าง',
  TERM_COVID:     'เลิกจ้างเนื่องจาก COVID-19',
  TERM_ENDASSIGN: 'สิ้นสุดการมอบหมายงาน',
  TERM_UNSUCPROB: 'ไม่ผ่านทดลองงาน',
  TERM_PASSAWAY:  'เสียชีวิต',
  TERM_TRANS:     'โอนย้ายออกจากบริษัท',
  TERM_NOSHOW:    'ขาดงานโดยไม่แจ้ง',
  TERM_REORG:     'ปรับโครงสร้างองค์กร',
  TERM_CRISIS:    'วิกฤตองค์กร',
  TERM_REDUNDANCY:'ตัดตำแหน่งซ้ำซ้อน',
  TERM_ABSENT:    'ขาดงานเกินกำหนด',
  TERM_OTHER:     'อื่น ๆ',
};

export type TerminationAuditEntry = {
  actorRole: Role;
  actorName: string;
  action: 'submit' | 'approve' | 'reject';
  comment?: string;
  at: string; // ISO timestamp
};

export type TerminationRequest = {
  id: string; // TR-YYYYMMDD-HHMMSS-<rand>
  employeeId: string;
  employeeName: string;
  requestedLastDay: string; // ISO date YYYY-MM-DD
  reasonCode: TerminationReasonCode;
  reasonText?: string;
  attachments?: string[]; // filenames
  status: TerminationStep;
  submittedAt: string; // ISO timestamp
  submittedBy: { id: string; name: string; role: Role };
  audit: TerminationAuditEntry[];
};

export const TERMINATION_STEP_LABEL: Record<TerminationStep, string> = {
  pending_spd: 'รอ SPD อนุมัติ',
  approved:    'อนุมัติแล้ว',
  rejected:    'ถูกปฏิเสธ',
};

interface TerminationApprovalsState {
  requests: TerminationRequest[];
  addRequest: (
    r: Omit<TerminationRequest, 'id' | 'submittedAt' | 'status' | 'audit'>,
  ) => string;
  approve: (id: string, by: { role: Role; name: string }, comment?: string) => void;
  reject: (id: string, by: { role: Role; name: string }, reason: string) => void;
  clear: () => void;
}

function generateTermId(): string {
  const ts = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TR-${ts}-${rand}`;
}

export const useTerminationApprovals = create<TerminationApprovalsState>()(
  persist(
    (set) => ({
      requests: [],
      addRequest: (payload) => {
        const id = generateTermId();
        const now = new Date().toISOString();
        const req: TerminationRequest = {
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
                  status: 'approved' as TerminationStep,
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
        })),
      reject: (id, by, reason) =>
        set((state) => ({
          requests: state.requests.map((r) =>
            r.id !== id
              ? r
              : {
                  ...r,
                  status: 'rejected' as TerminationStep,
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
      name: 'humi-termination-approvals',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
