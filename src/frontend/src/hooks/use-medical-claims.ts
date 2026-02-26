'use client';

import { useState, useEffect, useCallback } from 'react';

// --- Types ---

export type DiseaseCategory =
  | 'general'
  | 'dental'
  | 'vision'
  | 'maternity'
  | 'accident'
  | 'chronic'
  | 'mental_health'
  | 'other';

export type MedicalClaimStatus =
  | 'draft'
  | 'submitted'
  | 'pending_manager'
  | 'pending_hr'
  | 'processing'
  | 'approved'
  | 'rejected';

export interface ClaimDocument {
  id: string;
  type: 'receipt' | 'medical_cert' | 'other';
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

export interface ApprovalStep {
  step: number;
  role: string;
  approverName: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string | null;
  comment: string | null;
}

export interface MedicalClaim {
  id: string;
  diseaseCategory: DiseaseCategory;
  diseaseDetails: string;
  hospitalName: string;
  treatmentDate: string;
  receiptAmount: number;
  claimAmount: number;
  remarks: string;
  documents: ClaimDocument[];
  approvalSteps: ApprovalStep[];
  status: MedicalClaimStatus;
  submittedAt: string | null;
  approvedAt: string | null;
  rejectionReason: string | null;
  rejectedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MedicalBenefitSummary {
  planType: string;
  annualLimit: number;
  usedAmount: number;
  remainingAmount: number;
}

// --- Constants ---

export const DISEASE_CATEGORIES: { value: DiseaseCategory; labelEn: string; labelTh: string }[] = [
  { value: 'general', labelEn: 'General Illness', labelTh: 'เจ็บป่วยทั่วไป' },
  { value: 'dental', labelEn: 'Dental', labelTh: 'ทันตกรรม' },
  { value: 'vision', labelEn: 'Vision/Eye Care', labelTh: 'จักษุ' },
  { value: 'maternity', labelEn: 'Maternity', labelTh: 'การคลอดบุตร' },
  { value: 'accident', labelEn: 'Accident', labelTh: 'อุบัติเหตุ' },
  { value: 'chronic', labelEn: 'Chronic Disease', labelTh: 'โรคเรื้อรัง' },
  { value: 'mental_health', labelEn: 'Mental Health', labelTh: 'สุขภาพจิต' },
  { value: 'other', labelEn: 'Other', labelTh: 'อื่นๆ' },
];

// --- Mock Data ---

const MOCK_SUMMARY: MedicalBenefitSummary = {
  planType: 'OPD + IPD',
  annualLimit: 60000,
  usedAmount: 18500,
  remainingAmount: 41500,
};

const MOCK_CLAIMS: MedicalClaim[] = [
  {
    id: 'MCL001',
    diseaseCategory: 'general',
    diseaseDetails: 'Fever and flu treatment',
    hospitalName: 'Bangkok Hospital',
    treatmentDate: '2026-02-10',
    receiptAmount: 3500,
    claimAmount: 3500,
    remarks: 'Regular OPD visit',
    documents: [
      { id: 'DOC001', type: 'receipt', fileName: 'receipt_bangkok_hospital.pdf', fileSize: 245000, uploadedAt: '2026-02-10T10:30:00Z' },
      { id: 'DOC002', type: 'medical_cert', fileName: 'med_cert_001.pdf', fileSize: 180000, uploadedAt: '2026-02-10T10:32:00Z' },
    ],
    approvalSteps: [
      { step: 1, role: 'Manager', approverName: 'Surachai P.', status: 'approved', date: '2026-02-11', comment: null },
      { step: 2, role: 'HR', approverName: 'Parichat S.', status: 'approved', date: '2026-02-12', comment: null },
    ],
    status: 'approved',
    submittedAt: '2026-02-10',
    approvedAt: '2026-02-12',
    rejectionReason: null,
    rejectedAt: null,
    createdAt: '2026-02-10T09:00:00Z',
    updatedAt: '2026-02-12T14:00:00Z',
  },
  {
    id: 'MCL002',
    diseaseCategory: 'dental',
    diseaseDetails: 'Dental cleaning and filling',
    hospitalName: 'Thonglor Dental Clinic',
    treatmentDate: '2026-02-05',
    receiptAmount: 5000,
    claimAmount: 5000,
    remarks: 'Annual dental checkup',
    documents: [
      { id: 'DOC003', type: 'receipt', fileName: 'receipt_thonglor_dental.pdf', fileSize: 198000, uploadedAt: '2026-02-05T15:00:00Z' },
      { id: 'DOC004', type: 'medical_cert', fileName: 'med_cert_dental.pdf', fileSize: 156000, uploadedAt: '2026-02-05T15:05:00Z' },
    ],
    approvalSteps: [
      { step: 1, role: 'Manager', approverName: 'Surachai P.', status: 'approved', date: '2026-02-06', comment: null },
      { step: 2, role: 'HR', approverName: 'Parichat S.', status: 'approved', date: '2026-02-07', comment: null },
    ],
    status: 'approved',
    submittedAt: '2026-02-05',
    approvedAt: '2026-02-07',
    rejectionReason: null,
    rejectedAt: null,
    createdAt: '2026-02-05T14:00:00Z',
    updatedAt: '2026-02-07T11:00:00Z',
  },
  {
    id: 'MCL003',
    diseaseCategory: 'vision',
    diseaseDetails: 'Eye examination and prescription glasses',
    hospitalName: 'Rutnin Eye Hospital',
    treatmentDate: '2026-02-18',
    receiptAmount: 5000,
    claimAmount: 5000,
    remarks: 'Annual eye checkup',
    documents: [
      { id: 'DOC005', type: 'receipt', fileName: 'receipt_rutnin.pdf', fileSize: 210000, uploadedAt: '2026-02-18T12:00:00Z' },
      { id: 'DOC006', type: 'medical_cert', fileName: 'med_cert_eye.pdf', fileSize: 175000, uploadedAt: '2026-02-18T12:10:00Z' },
    ],
    approvalSteps: [
      { step: 1, role: 'Manager', approverName: 'Surachai P.', status: 'pending', date: null, comment: null },
      { step: 2, role: 'HR', approverName: 'Parichat S.', status: 'pending', date: null, comment: null },
    ],
    status: 'pending_manager',
    submittedAt: '2026-02-18',
    approvedAt: null,
    rejectionReason: null,
    rejectedAt: null,
    createdAt: '2026-02-18T11:00:00Z',
    updatedAt: '2026-02-18T12:15:00Z',
  },
  {
    id: 'MCL004',
    diseaseCategory: 'accident',
    diseaseDetails: 'Minor injury from workplace accident',
    hospitalName: 'Samitivej Hospital',
    treatmentDate: '2026-02-20',
    receiptAmount: 4500,
    claimAmount: 4500,
    remarks: 'Emergency treatment',
    documents: [
      { id: 'DOC007', type: 'receipt', fileName: 'receipt_samitivej.pdf', fileSize: 230000, uploadedAt: '2026-02-20T16:00:00Z' },
      { id: 'DOC008', type: 'medical_cert', fileName: 'med_cert_accident.pdf', fileSize: 192000, uploadedAt: '2026-02-20T16:05:00Z' },
    ],
    approvalSteps: [
      { step: 1, role: 'Manager', approverName: 'Surachai P.', status: 'pending', date: null, comment: null },
      { step: 2, role: 'HR', approverName: 'Parichat S.', status: 'pending', date: null, comment: null },
    ],
    status: 'submitted',
    submittedAt: '2026-02-20',
    approvedAt: null,
    rejectionReason: null,
    rejectedAt: null,
    createdAt: '2026-02-20T15:00:00Z',
    updatedAt: '2026-02-20T16:10:00Z',
  },
  {
    id: 'MCL005',
    diseaseCategory: 'general',
    diseaseDetails: 'Back pain treatment and physiotherapy',
    hospitalName: 'BNH Hospital',
    treatmentDate: '2026-02-14',
    receiptAmount: 2500,
    claimAmount: 2500,
    remarks: 'Follow-up treatment',
    documents: [
      { id: 'DOC009', type: 'receipt', fileName: 'receipt_bnh.pdf', fileSize: 205000, uploadedAt: '2026-02-14T10:00:00Z' },
      { id: 'DOC010', type: 'medical_cert', fileName: 'med_cert_bnh.pdf', fileSize: 168000, uploadedAt: '2026-02-14T10:05:00Z' },
    ],
    approvalSteps: [
      { step: 1, role: 'Manager', approverName: 'Surachai P.', status: 'approved', date: '2026-02-15', comment: null },
      { step: 2, role: 'HR', approverName: 'Parichat S.', status: 'rejected', date: '2026-02-16', comment: 'Insufficient supporting documents' },
    ],
    status: 'rejected',
    submittedAt: '2026-02-14',
    approvedAt: null,
    rejectionReason: 'Insufficient supporting documents',
    rejectedAt: '2026-02-16',
    createdAt: '2026-02-14T09:00:00Z',
    updatedAt: '2026-02-16T15:00:00Z',
  },
  {
    id: 'MCL006',
    diseaseCategory: 'chronic',
    diseaseDetails: 'Monthly medication for hypertension',
    hospitalName: 'Paolo Hospital',
    treatmentDate: '2026-02-22',
    receiptAmount: 1500,
    claimAmount: 1500,
    remarks: 'Regular monthly medication',
    documents: [],
    approvalSteps: [],
    status: 'draft',
    submittedAt: null,
    approvedAt: null,
    rejectionReason: null,
    rejectedAt: null,
    createdAt: '2026-02-22T08:00:00Z',
    updatedAt: '2026-02-22T08:00:00Z',
  },
];

// --- Hook ---

export function useMedicalClaims() {
  const [claims, setClaims] = useState<MedicalClaim[]>([]);
  const [summary, setSummary] = useState<MedicalBenefitSummary>(MOCK_SUMMARY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClaims(MOCK_CLAIMS);
      setSummary(MOCK_SUMMARY);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const createClaim = useCallback(
    async (
      data: Omit<
        MedicalClaim,
        'id' | 'documents' | 'approvalSteps' | 'status' | 'submittedAt' | 'approvedAt' | 'rejectionReason' | 'rejectedAt' | 'createdAt' | 'updatedAt'
      >
    ): Promise<MedicalClaim> => {
      const now = new Date().toISOString();
      const newClaim: MedicalClaim = {
        ...data,
        id: `MCL${Date.now()}`,
        documents: [],
        approvalSteps: [],
        status: 'draft',
        submittedAt: null,
        approvedAt: null,
        rejectionReason: null,
        rejectedAt: null,
        createdAt: now,
        updatedAt: now,
      };
      setClaims((prev) => [newClaim, ...prev]);
      return newClaim;
    },
    []
  );

  const addDocument = useCallback(
    async (claimId: string, doc: Omit<ClaimDocument, 'id' | 'uploadedAt'>) => {
      const newDoc: ClaimDocument = {
        ...doc,
        id: `DOC${Date.now()}`,
        uploadedAt: new Date().toISOString(),
      };
      setClaims((prev) =>
        prev.map((c) =>
          c.id === claimId
            ? { ...c, documents: [...c.documents, newDoc], updatedAt: new Date().toISOString() }
            : c
        )
      );
    },
    []
  );

  const removeDocument = useCallback(async (claimId: string, docId: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId
          ? { ...c, documents: c.documents.filter((d) => d.id !== docId), updatedAt: new Date().toISOString() }
          : c
      )
    );
  }, []);

  const submitClaim = useCallback(async (claimId: string) => {
    const now = new Date().toISOString();
    const today = now.split('T')[0];
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId
          ? {
              ...c,
              status: 'submitted' as MedicalClaimStatus,
              submittedAt: today,
              updatedAt: now,
              approvalSteps: [
                { step: 1, role: 'Manager', approverName: 'Surachai P.', status: 'pending', date: null, comment: null },
                { step: 2, role: 'HR', approverName: 'Parichat S.', status: 'pending', date: null, comment: null },
              ],
            }
          : c
      )
    );
  }, []);

  const saveDraft = useCallback(async (claimId: string) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId ? { ...c, updatedAt: new Date().toISOString() } : c
      )
    );
  }, []);

  const stats = {
    totalClaims: claims.length,
    pendingClaims: claims.filter(
      (c) =>
        c.status === 'submitted' ||
        c.status === 'pending_manager' ||
        c.status === 'pending_hr' ||
        c.status === 'processing'
    ).length,
    approvedClaims: claims.filter((c) => c.status === 'approved').length,
    remainingBalance: summary.remainingAmount,
  };

  return {
    claims,
    summary,
    loading,
    stats,
    createClaim,
    addDocument,
    removeDocument,
    submitClaim,
    saveDraft,
  };
}
