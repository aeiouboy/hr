import { api } from './api';

export interface CreateClaimPayload {
  claimType: string;
  amount: number;
  currency?: string;
  receiptDate: string;
  merchant: string;
  notes: string;
  description?: string;
}

export interface ClaimResponse {
  id: string;
  claimType: string;
  amount: number;
  currency: string;
  status: string;
  receiptDate: string;
  merchant: string;
  notes: string;
  ocrResult: unknown;
  policyChecks: unknown[];
  submittedAt: string | null;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
}

export interface YtdSpendingResponse {
  claimType: string;
  label: string;
  spent: number;
  limit: number;
  count: number;
}

export interface ClaimFilters {
  status?: string;
  claimType?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

const BASE = '/v1/benefits/claims';

export const claimsApi = {
  createClaim: (data: CreateClaimPayload) =>
    api.post<ClaimResponse>(BASE, data),

  uploadReceipt: async (claimId: string, file: File) => {
    // File upload requires multipart — handled separately from JSON api helper
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'}${BASE}/${claimId}/upload`,
      { method: 'POST', body: formData }
    );
    if (!res.ok) throw { status: res.status, message: res.statusText };
    return res.json();
  },

  submitClaim: (claimId: string) =>
    api.post<ClaimResponse>(`${BASE}/${claimId}/submit`),

  getClaims: (filters?: ClaimFilters) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== '') params.set(k, String(v));
      });
    }
    const qs = params.toString();
    return api.get<ClaimResponse[]>(`${BASE}${qs ? `?${qs}` : ''}`);
  },

  getClaimById: (id: string) =>
    api.get<ClaimResponse>(`${BASE}/${id}`),

  getYtdSpending: () =>
    api.get<YtdSpendingResponse[]>(`${BASE}/ytd-spending`),

  approveClaim: (id: string, data: { comment?: string }) =>
    api.post<ClaimResponse>(`${BASE}/${id}/approve`, data),

  rejectClaim: (id: string, data: { reason: string }) =>
    api.post<ClaimResponse>(`${BASE}/${id}/reject`, data),

  validateClaim: (data: { claimType: string; amount: number }) =>
    api.post<{ checks: unknown[] }>(`${BASE}/validate`, data),
};
