import { api } from './api';

// --- Types ---

export type RequestType = 'leave' | 'overtime' | 'claim' | 'transfer' | 'change_request';
export type Urgency = 'urgent' | 'normal' | 'low';

export interface PendingRequest {
  id: string;
  type: RequestType;
  requester: {
    id: string;
    name: string;
    avatar?: string;
    position: string;
    department: string;
  };
  description: string;
  submittedAt: string;
  urgency: Urgency;
  waitingDays: number;
  details: LeaveDetails | OvertimeDetails | ClaimDetails | TransferDetails | Record<string, unknown>;
  approvalTimeline: ApprovalStep[];
}

export interface LeaveDetails {
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  balance: number;
  reason: string;
}

export interface OvertimeDetails {
  date: string;
  hours: number;
  rate: number;
  reason: string;
}

export interface ClaimDetails {
  amount: number;
  currency: string;
  category: string;
  receiptUrl?: string;
  merchant: string;
  policyChecks: { rule: string; passed: boolean }[];
}

export interface TransferDetails {
  fromDepartment: string;
  toDepartment: string;
  fromPosition: string;
  toPosition: string;
  reason: string;
  effectiveDate: string;
}

export interface ApprovalStep {
  step: number;
  approver: string;
  status: 'approved' | 'pending' | 'rejected';
  date?: string;
  comment?: string;
}

export interface Delegation {
  id: string;
  delegateTo: {
    id: string;
    name: string;
  };
  startDate: string;
  endDate: string;
  workflowTypes: string[];
  status: 'active' | 'expired' | 'revoked';
  createdAt: string;
}

export interface PendingFilter {
  type?: string;
  urgency?: Urgency;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PendingResponse {
  data: PendingRequest[];
  total: number;
  page: number;
  limit: number;
  counts: Record<string, number>;
}

// --- API ---

const WF_BASE = '/v1/workflows';

export const quickApproveApi = {
  getPending: (filters?: PendingFilter) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== '') params.set(k, String(v));
      });
    }
    const qs = params.toString();
    return api.get<PendingResponse>(`${WF_BASE}/pending${qs ? `?${qs}` : ''}`);
  },

  bulkApprove: (ids: string[], reason?: string) =>
    api.post<{ approved: number; failed: string[] }>(`${WF_BASE}/bulk-approve`, { ids, reason }),

  bulkReject: (ids: string[], reason: string) =>
    api.post<{ rejected: number; failed: string[] }>(`${WF_BASE}/bulk-reject`, { ids, reason }),

  getRequestDetail: (id: string) =>
    api.get<PendingRequest>(`${WF_BASE}/${id}/detail`),

  createDelegation: (data: {
    delegate_to: string;
    start_date: string;
    end_date: string;
    workflow_types: string[];
  }) => api.post<Delegation>(`${WF_BASE}/delegations`, data),

  getDelegations: () =>
    api.get<Delegation[]>(`${WF_BASE}/delegations`),

  revokeDelegation: (id: string) =>
    api.delete<void>(`${WF_BASE}/delegations/${id}`),
};
