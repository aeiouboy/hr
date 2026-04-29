import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { HumiApprovalStep, RequestStatus } from '@/lib/humi-mock-data';

export type BenefitClaimStatus = 'pending_spd' | 'send_back' | 'approved' | 'rejected';
export type BenefitClaimType = 'medical' | 'gasoline' | 'mobile' | 'physical_checkup' | 'dependent';

export type BenefitAttachment = {
  id: string;
  filename: string;
  size: number;
  mimeType: string;
};

export type BenefitClaimAuditEntry = {
  actorRole: 'employee' | 'spd' | 'system';
  actorName: string;
  action: 'submit' | 'approve' | 'reject' | 'send_back' | 'resubmit';
  comment?: string;
  at: string;
};

export type BenefitClaimRequest = {
  id: string;
  workflowRequestId: string;
  employeeId: string;
  employeeName: string;
  company: string;
  businessUnit: string;
  employeeGroup: string;
  personalGrade: string;
  benefitCode: string;
  benefitName: string;
  claimType: BenefitClaimType;
  receiptNo: string;
  receiptDate: string;
  receiptAmount: number;
  claimAmount: number;
  remainingAmount: number;
  currency: 'THB';
  hospitalType?: string;
  hospitalName?: string;
  opdIpd?: string;
  patientTransferDocument?: string;
  diseaseDetails?: string;
  gasolineClaimType?: string;
  dependentName?: string;
  dependentRelation?: string;
  attachments: BenefitAttachment[];
  status: BenefitClaimStatus;
  submittedAt: string;
  updatedAt: string;
  sendBackReason?: string;
  rejectReason?: string;
  correctionVersion: number;
  previousVersions: BenefitClaimRequestSnapshot[];
  audit: BenefitClaimAuditEntry[];
};

export type BenefitClaimRequestSnapshot = Pick<
  BenefitClaimRequest,
  | 'receiptNo'
  | 'receiptDate'
  | 'receiptAmount'
  | 'claimAmount'
  | 'hospitalType'
  | 'hospitalName'
  | 'opdIpd'
  | 'patientTransferDocument'
  | 'diseaseDetails'
  | 'gasolineClaimType'
  | 'dependentName'
  | 'dependentRelation'
  | 'attachments'
  | 'updatedAt'
  | 'correctionVersion'
>;

export type BenefitClaimSubmitInput = {
  employeeId: string;
  employeeName: string;
  company?: string;
  businessUnit?: string;
  employeeGroup?: string;
  personalGrade?: string;
  benefitCode: string;
  benefitName: string;
  claimType: BenefitClaimType;
  receiptNo: string;
  receiptDate: string;
  receiptAmount: number;
  claimAmount: number;
  remainingAmount: number;
  hospitalType?: string;
  hospitalName?: string;
  opdIpd?: string;
  patientTransferDocument?: string;
  diseaseDetails?: string;
  gasolineClaimType?: string;
  dependentName?: string;
  dependentRelation?: string;
  attachments?: BenefitAttachment[];
};

export type BenefitRequestProjection = {
  id: string;
  type: string;
  sub: string;
  submitted: string;
  status: RequestStatus;
  approvalChain: HumiApprovalStep[];
};

export const BENEFIT_STATUS_LABEL: Record<BenefitClaimStatus, string> = {
  pending_spd: 'รอ SPD อนุมัติ',
  send_back: 'ส่งกลับให้แก้ไข',
  approved: 'อนุมัติแล้ว',
  rejected: 'ไม่อนุมัติ',
};

export const BENEFIT_TYPE_LABEL: Record<BenefitClaimType, string> = {
  medical: 'ค่ารักษาพยาบาล',
  gasoline: 'ค่าน้ำมันรถ',
  mobile: 'ค่าโทรศัพท์',
  physical_checkup: 'ตรวจสุขภาพประจำปี',
  dependent: 'สวัสดิการผู้อุปการะ',
};

const REQUEST_STATUS_BY_CLAIM_STATUS: Record<BenefitClaimStatus, RequestStatus> = {
  pending_spd: 'pending',
  send_back: 'info',
  approved: 'approved',
  rejected: 'rejected',
};

interface BenefitClaimsState {
  claims: BenefitClaimRequest[];
  submitClaim: (input: BenefitClaimSubmitInput) => string;
  approve: (id: string, by: { name: string }, comment?: string) => void;
  reject: (id: string, by: { name: string }, reason: string) => void;
  sendBack: (id: string, by: { name: string }, reason: string) => void;
  resubmitCorrection: (id: string, input: Partial<BenefitClaimSubmitInput>) => void;
  duplicateReceiptExists: (input: { employeeId: string; benefitCode: string; receiptNo: string; excludeId?: string }) => boolean;
  clear: () => void;
}

function idSuffix(): string {
  return Math.random().toString(36).slice(2, 6).toUpperCase();
}

function formatThaiDate(iso: string): string {
  return new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
}

function createSnapshot(claim: BenefitClaimRequest): BenefitClaimRequestSnapshot {
  return {
    receiptNo: claim.receiptNo,
    receiptDate: claim.receiptDate,
    receiptAmount: claim.receiptAmount,
    claimAmount: claim.claimAmount,
    hospitalType: claim.hospitalType,
    hospitalName: claim.hospitalName,
    opdIpd: claim.opdIpd,
    patientTransferDocument: claim.patientTransferDocument,
    diseaseDetails: claim.diseaseDetails,
    gasolineClaimType: claim.gasolineClaimType,
    dependentName: claim.dependentName,
    dependentRelation: claim.dependentRelation,
    attachments: claim.attachments,
    updatedAt: claim.updatedAt,
    correctionVersion: claim.correctionVersion,
  };
}

export function validateBenefitClaimInput(input: BenefitClaimSubmitInput): string[] {
  const errors: string[] = [];
  if (!input.benefitCode) errors.push('กรุณาเลือกประเภทสวัสดิการ');
  if (!input.receiptNo.trim()) errors.push('กรุณากรอกเลขที่ใบเสร็จ/เอกสาร');
  if (!input.receiptDate) errors.push('กรุณากรอกวันที่ใบเสร็จ/เอกสาร');
  if (!Number.isFinite(input.receiptAmount) || input.receiptAmount <= 0) errors.push('กรุณากรอกยอดตามใบเสร็จ');
  if (!Number.isFinite(input.claimAmount) || input.claimAmount <= 0) errors.push('กรุณากรอกยอดที่ต้องการเบิก');
  if (input.claimType === 'medical') {
    if (!input.opdIpd) errors.push('กรุณาเลือก OPD/IPD');
    if (!input.hospitalType) errors.push('กรุณาเลือกประเภทสถานพยาบาล');
    if (!input.hospitalName?.trim()) errors.push('กรุณากรอกชื่อสถานพยาบาล');
    if (!input.diseaseDetails?.trim()) errors.push('กรุณากรอกรายละเอียดอาการ/โรค');
    if ((input.attachments ?? []).length === 0) errors.push('กรุณาแนบเอกสารค่ารักษาอย่างน้อย 1 ไฟล์');
  }
  if (input.claimType === 'gasoline' && !input.gasolineClaimType) errors.push('กรุณาเลือกประเภทการเบิกค่าน้ำมัน');
  if (input.claimType === 'dependent' && !input.dependentName?.trim()) errors.push('กรุณาระบุผู้รับสิทธิ์ร่วม');
  return errors;
}

export function validateBenefitAttachments(files: BenefitAttachment[]): string[] {
  const allowed = new Set(['pdf', 'jpg', 'jpeg', 'png', 'pptx', 'xlsx']);
  const errors: string[] = [];
  if (files.length > 5) errors.push('แนบเอกสารได้สูงสุด 5 ไฟล์');
  files.forEach((file) => {
    const ext = file.filename.split('.').pop()?.toLowerCase() ?? '';
    if (!allowed.has(ext)) errors.push(`ไม่รองรับไฟล์ .${ext || 'unknown'}`);
    if (file.size > 10 * 1024 * 1024) errors.push(`${file.filename} มีขนาดเกิน 10 MB`);
  });
  return errors;
}

export function projectBenefitClaimToRequest(claim: BenefitClaimRequest): BenefitRequestProjection {
  const stepStatus: HumiApprovalStep['status'] =
    claim.status === 'approved' ? 'approved' : claim.status === 'rejected' ? 'rejected' : 'pending';

  return {
    id: claim.workflowRequestId,
    type: `เบิกสวัสดิการ · ${BENEFIT_TYPE_LABEL[claim.claimType]}`,
    sub: `${claim.benefitName} · ${claim.receiptNo} · ฿${claim.claimAmount.toLocaleString('th-TH')}`,
    submitted: formatThaiDate(claim.submittedAt),
    status: REQUEST_STATUS_BY_CLAIM_STATUS[claim.status],
    approvalChain: [
      {
        role: 'SPD Benefits',
        name: 'ทีม SPD',
        initials: 'SP',
        tone: 'teal',
        status: stepStatus,
        when: BENEFIT_STATUS_LABEL[claim.status],
        note: claim.sendBackReason ?? claim.rejectReason,
      },
    ],
  };
}

export const useBenefitClaimsStore = create<BenefitClaimsState>()(
  persist(
    (set, get) => ({
      claims: [],
      submitClaim: (input) => {
        const now = new Date().toISOString();
        const id = `BEN-${now.replace(/[-:T.Z]/g, '').slice(0, 14)}-${idSuffix()}`;
        const req: BenefitClaimRequest = {
          ...input,
          company: input.company ?? 'Central Group',
          businessUnit: input.businessUnit ?? 'สำนักงานใหญ่',
          employeeGroup: input.employeeGroup ?? 'Monthly Staff',
          personalGrade: input.personalGrade ?? 'PG4',
          attachments: input.attachments ?? [],
          id,
          workflowRequestId: `REQ-BEN-${id.slice(-4)}`,
          currency: 'THB',
          status: 'pending_spd',
          submittedAt: now,
          updatedAt: now,
          correctionVersion: 1,
          previousVersions: [],
          audit: [{ actorRole: 'employee', actorName: input.employeeName, action: 'submit', at: now }],
        };
        set((state) => ({ claims: [req, ...state.claims] }));
        return id;
      },
      approve: (id, by, comment) =>
        set((state) => ({
          claims: state.claims.map((claim) =>
            claim.id !== id ? claim : {
              ...claim,
              status: 'approved',
              updatedAt: new Date().toISOString(),
              audit: [...claim.audit, { actorRole: 'spd', actorName: by.name, action: 'approve', comment, at: new Date().toISOString() }],
            },
          ),
        })),
      reject: (id, by, reason) =>
        set((state) => ({
          claims: state.claims.map((claim) =>
            claim.id !== id ? claim : {
              ...claim,
              status: 'rejected',
              rejectReason: reason,
              updatedAt: new Date().toISOString(),
              audit: [...claim.audit, { actorRole: 'spd', actorName: by.name, action: 'reject', comment: reason, at: new Date().toISOString() }],
            },
          ),
        })),
      sendBack: (id, by, reason) =>
        set((state) => ({
          claims: state.claims.map((claim) =>
            claim.id !== id ? claim : {
              ...claim,
              status: 'send_back',
              sendBackReason: reason,
              updatedAt: new Date().toISOString(),
              audit: [...claim.audit, { actorRole: 'spd', actorName: by.name, action: 'send_back', comment: reason, at: new Date().toISOString() }],
            },
          ),
        })),
      resubmitCorrection: (id, input) =>
        set((state) => ({
          claims: state.claims.map((claim) => {
            if (claim.id !== id) return claim;
            const now = new Date().toISOString();
            return {
              ...claim,
              ...input,
              company: input.company ?? claim.company,
              businessUnit: input.businessUnit ?? claim.businessUnit,
              employeeGroup: input.employeeGroup ?? claim.employeeGroup,
              personalGrade: input.personalGrade ?? claim.personalGrade,
              attachments: input.attachments ?? claim.attachments,
              status: 'pending_spd',
              sendBackReason: undefined,
              updatedAt: now,
              correctionVersion: claim.correctionVersion + 1,
              previousVersions: [createSnapshot(claim), ...claim.previousVersions],
              audit: [...claim.audit, { actorRole: 'employee', actorName: claim.employeeName, action: 'resubmit', at: now }],
            };
          }),
        })),
      duplicateReceiptExists: ({ employeeId, benefitCode, receiptNo, excludeId }) =>
        get().claims.some((claim) =>
          claim.employeeId === employeeId &&
          claim.benefitCode === benefitCode &&
          claim.receiptNo.trim().toLowerCase() === receiptNo.trim().toLowerCase() &&
          claim.id !== excludeId,
        ),
      clear: () => set({ claims: [] }),
    }),
    {
      name: 'humi-benefit-claims',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
