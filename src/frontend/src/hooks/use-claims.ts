'use client';

import { useState, useEffect, useCallback } from 'react';

export type ClaimType = 'medical' | 'travel' | 'meal';
export type ClaimStatus = 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected';

export interface OcrResult {
  extractedAmount: number;
  extractedDate: string;
  extractedMerchant: string;
  extractedTaxId: string;
  confidence: number;
  rawText: string;
}

export interface PolicyCheck {
  passed: boolean;
  rule: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface ClaimRequest {
  id: string;
  claimType: ClaimType;
  amount: number;
  currency: string;
  receiptDate: string;
  receiptUrl: string;
  receiptFileName: string;
  ocrResult: OcrResult | null;
  policyChecks: PolicyCheck[];
  status: ClaimStatus;
  submittedAt: string | null;
  approvedAt: string | null;
  approvedBy: string | null;
  rejectionReason: string | null;
  notes: string;
  merchant: string;
}

export interface ClaimPolicy {
  claimType: ClaimType;
  maxPerClaim: number;
  maxPerMonth: number;
  maxPerYear: number;
  requiresReceipt: boolean;
}

export interface YtdSpending {
  claimType: ClaimType;
  label: string;
  spent: number;
  limit: number;
  count: number;
}

const MOCK_POLICIES: ClaimPolicy[] = [
  { claimType: 'medical', maxPerClaim: 5000, maxPerMonth: 10000, maxPerYear: 60000, requiresReceipt: true },
  { claimType: 'travel', maxPerClaim: 3000, maxPerMonth: 15000, maxPerYear: 100000, requiresReceipt: true },
  { claimType: 'meal', maxPerClaim: 500, maxPerMonth: 5000, maxPerYear: 30000, requiresReceipt: true },
];

const MOCK_YTD: YtdSpending[] = [
  { claimType: 'medical', label: 'Medical', spent: 12500, limit: 60000, count: 4 },
  { claimType: 'travel', label: 'Travel', spent: 8200, limit: 100000, count: 3 },
  { claimType: 'meal', label: 'Meal', spent: 3100, limit: 30000, count: 8 },
];

const MOCK_HISTORY: ClaimRequest[] = [
  {
    id: 'CLM001', claimType: 'medical', amount: 1500, currency: 'THB',
    receiptDate: '2026-02-15', receiptUrl: '#', receiptFileName: 'receipt_hospital.jpg',
    ocrResult: { extractedAmount: 1500, extractedDate: '2026-02-15', extractedMerchant: 'Bangkok Hospital', extractedTaxId: '0-1054-12345', confidence: 0.94, rawText: 'Bangkok Hospital...' },
    policyChecks: [{ passed: true, rule: 'max_per_claim', message: 'Within claim limit (฿1,500 / ฿5,000)', severity: 'info' }],
    status: 'approved', submittedAt: '2026-02-16', approvedAt: '2026-02-17', approvedBy: 'Surachai P.', rejectionReason: null, notes: 'Regular checkup', merchant: 'Bangkok Hospital',
  },
  {
    id: 'CLM002', claimType: 'travel', amount: 2800, currency: 'THB',
    receiptDate: '2026-02-10', receiptUrl: '#', receiptFileName: 'taxi_receipt.png',
    ocrResult: { extractedAmount: 2800, extractedDate: '2026-02-10', extractedMerchant: 'Grab Taxi', extractedTaxId: '0-1234-56789', confidence: 0.87, rawText: 'Grab Taxi...' },
    policyChecks: [{ passed: true, rule: 'max_per_claim', message: 'Within claim limit (฿2,800 / ฿3,000)', severity: 'warning' }],
    status: 'approved', submittedAt: '2026-02-11', approvedAt: '2026-02-12', approvedBy: 'Surachai P.', rejectionReason: null, notes: 'Client visit transport', merchant: 'Grab Taxi',
  },
  {
    id: 'CLM003', claimType: 'meal', amount: 450, currency: 'THB',
    receiptDate: '2026-02-18', receiptUrl: '#', receiptFileName: 'dinner_receipt.jpg',
    ocrResult: { extractedAmount: 450, extractedDate: '2026-02-18', extractedMerchant: 'The Pizza Company', extractedTaxId: '0-5555-12345', confidence: 0.91, rawText: 'The Pizza Company...' },
    policyChecks: [],
    status: 'submitted', submittedAt: '2026-02-19', approvedAt: null, approvedBy: null, rejectionReason: null, notes: 'Team dinner', merchant: 'The Pizza Company',
  },
  {
    id: 'CLM004', claimType: 'medical', amount: 6000, currency: 'THB',
    receiptDate: '2026-01-28', receiptUrl: '#', receiptFileName: 'dental_receipt.pdf',
    ocrResult: { extractedAmount: 6000, extractedDate: '2026-01-28', extractedMerchant: 'Dental Clinic', extractedTaxId: '0-9999-11111', confidence: 0.72, rawText: 'Dental Clinic...' },
    policyChecks: [{ passed: false, rule: 'max_per_claim', message: 'Exceeds per-claim limit (฿6,000 > ฿5,000)', severity: 'error' }],
    status: 'rejected', submittedAt: '2026-01-29', approvedAt: null, approvedBy: null, rejectionReason: 'Amount exceeds per-claim limit', notes: 'Dental treatment', merchant: 'Dental Clinic',
  },
  {
    id: 'CLM005', claimType: 'meal', amount: 320, currency: 'THB',
    receiptDate: '2026-02-20', receiptUrl: '#', receiptFileName: 'lunch.jpg',
    ocrResult: null,
    policyChecks: [],
    status: 'draft', submittedAt: null, approvedAt: null, approvedBy: null, rejectionReason: null, notes: '', merchant: '',
  },
];

function simulateOcr(fileName: string): Promise<OcrResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const merchants = ['Bangkok Hospital', 'Central Restaurant', 'Grab Taxi', 'MK Restaurants', 'BNH Hospital'];
      const confidence = 0.75 + Math.random() * 0.22; // 0.75 - 0.97
      const amount = Math.round((200 + Math.random() * 4800) * 100) / 100;
      resolve({
        extractedAmount: amount,
        extractedDate: new Date().toISOString().split('T')[0],
        extractedMerchant: merchants[Math.floor(Math.random() * merchants.length)],
        extractedTaxId: `0-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10000 + Math.random() * 90000)}`,
        confidence: Math.round(confidence * 100) / 100,
        rawText: `Receipt from ${fileName}...`,
      });
    }, 1500); // simulate ~1.5s OCR processing
  });
}

function checkPolicies(claimType: ClaimType, amount: number, ytd: YtdSpending[]): PolicyCheck[] {
  const policy = MOCK_POLICIES.find((p) => p.claimType === claimType);
  if (!policy) return [];

  const checks: PolicyCheck[] = [];
  const spending = ytd.find((y) => y.claimType === claimType);

  // Per-claim limit
  if (amount > policy.maxPerClaim) {
    checks.push({ passed: false, rule: 'max_per_claim', message: `Exceeds per-claim limit (฿${amount.toLocaleString()} > ฿${policy.maxPerClaim.toLocaleString()})`, severity: 'error' });
  } else if (amount > policy.maxPerClaim * 0.8) {
    checks.push({ passed: true, rule: 'max_per_claim', message: `Near per-claim limit (฿${amount.toLocaleString()} / ฿${policy.maxPerClaim.toLocaleString()})`, severity: 'warning' });
  } else {
    checks.push({ passed: true, rule: 'max_per_claim', message: `Within claim limit (฿${amount.toLocaleString()} / ฿${policy.maxPerClaim.toLocaleString()})`, severity: 'info' });
  }

  // Monthly limit
  if (spending) {
    const monthlyProjected = spending.spent + amount;
    if (monthlyProjected > policy.maxPerMonth) {
      checks.push({ passed: false, rule: 'max_per_month', message: `Would exceed monthly limit (฿${monthlyProjected.toLocaleString()} > ฿${policy.maxPerMonth.toLocaleString()})`, severity: 'error' });
    }
  }

  // Yearly limit
  if (spending) {
    const yearlyProjected = spending.spent + amount;
    if (yearlyProjected > policy.maxPerYear) {
      checks.push({ passed: false, rule: 'max_per_year', message: `Would exceed annual limit (฿${yearlyProjected.toLocaleString()} > ฿${policy.maxPerYear.toLocaleString()})`, severity: 'error' });
    } else if (yearlyProjected > policy.maxPerYear * 0.8) {
      checks.push({ passed: true, rule: 'max_per_year', message: `Approaching annual limit (฿${yearlyProjected.toLocaleString()} / ฿${policy.maxPerYear.toLocaleString()})`, severity: 'warning' });
    }
  }

  return checks;
}

export function useClaims() {
  const [claims, setClaims] = useState<ClaimRequest[]>([]);
  const [ytdSpending, setYtdSpending] = useState<YtdSpending[]>([]);
  const [policies] = useState<ClaimPolicy[]>(MOCK_POLICIES);
  const [loading, setLoading] = useState(true);
  const [ocrProcessing, setOcrProcessing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClaims(MOCK_HISTORY);
      setYtdSpending(MOCK_YTD);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const processReceipt = useCallback(async (file: File): Promise<OcrResult> => {
    setOcrProcessing(true);
    try {
      const result = await simulateOcr(file.name);
      return result;
    } finally {
      setOcrProcessing(false);
    }
  }, []);

  const validateClaim = useCallback((claimType: ClaimType, amount: number): PolicyCheck[] => {
    return checkPolicies(claimType, amount, ytdSpending);
  }, [ytdSpending]);

  const saveDraft = useCallback(async (draft: Partial<ClaimRequest> & { claimType: ClaimType; amount: number }) => {
    const newClaim: ClaimRequest = {
      id: `CLM${Date.now()}`,
      claimType: draft.claimType,
      amount: draft.amount,
      currency: 'THB',
      receiptDate: draft.receiptDate || new Date().toISOString().split('T')[0],
      receiptUrl: draft.receiptUrl || '',
      receiptFileName: draft.receiptFileName || '',
      ocrResult: draft.ocrResult || null,
      policyChecks: draft.policyChecks || [],
      status: 'draft',
      submittedAt: null,
      approvedAt: null,
      approvedBy: null,
      rejectionReason: null,
      notes: draft.notes || '',
      merchant: draft.merchant || '',
    };
    setClaims((prev) => [newClaim, ...prev]);
    return newClaim;
  }, []);

  const submitClaim = useCallback(async (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId ? { ...c, status: 'submitted' as ClaimStatus, submittedAt: new Date().toISOString().split('T')[0] } : c
      )
    );
  }, []);

  const stats = {
    totalClaims: claims.length,
    pendingClaims: claims.filter((c) => c.status === 'submitted' || c.status === 'processing').length,
    approvedClaims: claims.filter((c) => c.status === 'approved').length,
    draftClaims: claims.filter((c) => c.status === 'draft').length,
    totalYtdSpent: ytdSpending.reduce((sum, y) => sum + y.spent, 0),
  };

  return { claims, ytdSpending, policies, loading, ocrProcessing, stats, processReceipt, validateClaim, saveDraft, submitClaim };
}
