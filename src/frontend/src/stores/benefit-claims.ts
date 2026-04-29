import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HumiApprovalStep, RequestStatus } from '@/lib/humi-mock-data';

export type BenefitClaimStatus = 'pending_spd' | 'send_back' | 'approved' | 'rejected';
export type BenefitClaimType = 'medical' | 'gasoline' | 'mobile' | 'physical_checkup' | 'dependent';

export interface BenefitAttachment {
  id: string;
  filename: string;
  sizeMb: number;
  mimeType?: string;
}

export interface BenefitClaimAuditEntry {
  at: string;
  actorRole: 'employee' | 'spd';
  actorName: string;
  action: 'submit' | 'approve' | 'reject' | 'send_back' | 'resubmit';
  note?: string;
}

export interface BenefitClaimRequest {
  id: string;
  workflowRequestId: string;
  employeeId: string;
  employeeName: string;
  company: string;
  businessUnit: string;
  employeeGroup: string;
  personalGrade: string;
  benefitType: BenefitClaimType;
  benefitCode: string;
  benefitName: string;
  remainingAmount: number;
  currency: 'THB';
  receiptNo: string;
  receiptDate: string;
  receiptAmount: number;
  totalClaimAmount: number;
  status: BenefitClaimStatus;
  submittedAt: string;
  updatedAt: string;
  hospitalType?: string;
  hospitalName?: string;
  patientTransferDocumentNo?: string;
  diseaseDetails?: string;
  gasolineClaimType?: string;
  dependentName?: string;
  dependentRelationship?: string;
  attachments: BenefitAttachment[];
  audit: BenefitClaimAuditEntry[];
  correctionReason?: string;
  version: number;
  previousVersions: Array<Pick<BenefitClaimRequest, 'receiptNo' | 'receiptAmount' | 'totalClaimAmount' | 'updatedAt' | 'version'>>;
}

export interface BenefitClaimInput {
  employeeId?: string;
  employeeName?: string;
  company?: string;
  businessUnit?: string;
  employeeGroup?: string;
  personalGrade?: string;
  benefitType: BenefitClaimType;
  benefitCode?: string;
  benefitName?: string;
  remainingAmount?: number;
  receiptNo: string;
  receiptDate: string;
  receiptAmount: number;
  totalClaimAmount: number;
  hospitalType?: string;
  hospitalName?: string;
  patientTransferDocumentNo?: string;
  diseaseDetails?: string;
  gasolineClaimType?: string;
  dependentName?: string;
  dependentRelationship?: string;
  attachments?: BenefitAttachment[];
}

interface Actor {
  role: 'employee' | 'spd';
  name: string;
}

interface BenefitClaimsState {
  claims: BenefitClaimRequest[];
  submitClaim: (input: BenefitClaimInput) => BenefitClaimRequest;
  approveClaim: (id: string, actor: Actor, note?: string) => void;
  rejectClaim: (id: string, actor: Actor, reason: string) => void;
  sendBackClaim: (id: string, actor: Actor, reason: string) => void;
  resubmitClaim: (id: string, input: Partial<BenefitClaimInput>, actor?: Actor) => void;
  hasDuplicateReceipt: (employeeId: string, benefitCode: string, receiptNo: string, excludingId?: string) => boolean;
}

export const BENEFIT_STATUS_LABEL: Record<BenefitClaimStatus, string> = {
  pending_spd: 'รอ SPD อนุมัติ',
  send_back: 'ส่งกลับให้แก้ไข',
  approved: 'อนุมัติแล้ว',
  rejected: 'ไม่อนุมัติ',
};

export const BENEFIT_TYPE_LABEL: Record<BenefitClaimType, string> = {
  medical: 'ค่ารักษาพยาบาล',
  gasoline: 'ค่าน้ำมัน',
  mobile: 'ค่าโทรศัพท์',
  physical_checkup: 'ตรวจสุขภาพ',
  dependent: 'ค่ารักษาผู้รับสิทธิ์ร่วม',
};

export const BENEFIT_CODE_BY_TYPE: Record<BenefitClaimType, string> = {
  medical: 'BEN-MED-OPD',
  gasoline: 'BEN-FUEL',
  mobile: 'BEN-MOBILE',
  physical_checkup: 'BEN-CHECKUP',
  dependent: 'BEN-DEP-MED',
};

const nowIso = () => new Date().toISOString();
const thaiDate = (iso: string) => new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });

function nextId(prefix: string, size: number, count: number) {
  return `${prefix}-${String(count + 1).padStart(size, '0')}`;
}

function statusToRequestStatus(status: BenefitClaimStatus): RequestStatus {
  if (status === 'approved') return 'approved';
  if (status === 'rejected') return 'rejected';
  if (status === 'send_back') return 'info';
  return 'pending';
}

function stepStatus(status: BenefitClaimStatus): HumiApprovalStep['status'] {
  if (status === 'approved') return 'approved';
  if (status === 'rejected') return 'rejected';
  return 'pending';
}

export function validateBenefitAttachmentRules(input: Pick<BenefitClaimInput, 'benefitType' | 'attachments'>) {
  const attachments = input.attachments ?? [];
  const errors: string[] = [];
  const allowed = ['.pdf', '.jpg', '.jpeg', '.png', '.pptx', '.xlsx'];
  if (attachments.length > 5) errors.push('แนบไฟล์ได้สูงสุด 5 ไฟล์');
  attachments.forEach((file) => {
    const lower = file.filename.toLowerCase();
    if (!allowed.some((ext) => lower.endsWith(ext))) errors.push(`ชนิดไฟล์ไม่รองรับ: ${file.filename}`);
    if (file.sizeMb > 10) errors.push(`ไฟล์เกิน 10 MB: ${file.filename}`);
  });
  if (input.benefitType === 'medical' && attachments.length === 0) {
    errors.push('ค่ารักษาพยาบาลต้องแนบเอกสารอย่างน้อย 1 ไฟล์');
  }
  return errors;
}

export function selectBenefitRequestSummaries(claims: BenefitClaimRequest[]) {
  return claims.map((claim) => ({
    id: claim.workflowRequestId,
    type: `เบิกสวัสดิการ · ${claim.benefitName}`,
    sub: `${claim.benefitCode} · ใบเสร็จ ${claim.receiptNo} · ฿${claim.totalClaimAmount.toLocaleString('th-TH')}`,
    submitted: thaiDate(claim.submittedAt),
    status: statusToRequestStatus(claim.status),
    approvalChain: [
      {
        role: 'SPD Benefits',
        name: 'ทีม SPD',
        initials: 'SP',
        tone: 'teal' as const,
        status: stepStatus(claim.status),
        when: BENEFIT_STATUS_LABEL[claim.status],
        note: claim.correctionReason,
      },
    ] satisfies HumiApprovalStep[],
    claim,
  }));
}

const initialClaims: BenefitClaimRequest[] = [
  {
    id: 'BEN-CLM-0001',
    workflowRequestId: 'REQ-BEN-0001',
    employeeId: 'EMP001',
    employeeName: 'จงรักษ์ ทานากะ',
    company: 'Central Group',
    businessUnit: 'People Operations',
    employeeGroup: 'Monthly',
    personalGrade: 'PG4',
    benefitType: 'medical',
    benefitCode: 'BEN-MED-OPD',
    benefitName: 'ค่ารักษาพยาบาล',
    remainingAmount: 18000,
    currency: 'THB',
    receiptNo: 'RCPT-2026-0415',
    receiptDate: '2026-04-15',
    receiptAmount: 4820,
    totalClaimAmount: 4820,
    status: 'pending_spd',
    submittedAt: '2026-04-15T09:20:00.000Z',
    updatedAt: '2026-04-15T09:20:00.000Z',
    hospitalType: 'private',
    hospitalName: 'รพ.บำรุงราษฎร์',
    patientTransferDocumentNo: 'PT-2026-009',
    diseaseDetails: 'ตรวจรักษาทั่วไป',
    attachments: [{ id: 'att-1', filename: 'receipt-0415.pdf', sizeMb: 1.2, mimeType: 'application/pdf' }],
    audit: [{ at: '2026-04-15T09:20:00.000Z', actorRole: 'employee', actorName: 'จงรักษ์ ทานากะ', action: 'submit', note: 'ส่งคำขอเบิกสวัสดิการ' }],
    version: 1,
    previousVersions: [],
  },
];

export const useBenefitClaimsStore = create<BenefitClaimsState>()(
  persist(
    (set, get) => ({
      claims: initialClaims,
      submitClaim: (input) => {
        const at = nowIso();
        const count = get().claims.length;
        const benefitType = input.benefitType;
        const benefitCode = input.benefitCode ?? BENEFIT_CODE_BY_TYPE[benefitType];
        const claim: BenefitClaimRequest = {
          id: nextId('BEN-CLM', 4, count),
          workflowRequestId: nextId('REQ-BEN', 4, count),
          employeeId: input.employeeId ?? 'EMP001',
          employeeName: input.employeeName ?? 'จงรักษ์ ทานากะ',
          company: input.company ?? 'Central Group',
          businessUnit: input.businessUnit ?? 'People Operations',
          employeeGroup: input.employeeGroup ?? 'Monthly',
          personalGrade: input.personalGrade ?? 'PG4',
          benefitType,
          benefitCode,
          benefitName: input.benefitName ?? BENEFIT_TYPE_LABEL[benefitType],
          remainingAmount: input.remainingAmount ?? 20000,
          currency: 'THB',
          receiptNo: input.receiptNo,
          receiptDate: input.receiptDate,
          receiptAmount: input.receiptAmount,
          totalClaimAmount: input.totalClaimAmount,
          status: 'pending_spd',
          submittedAt: at,
          updatedAt: at,
          hospitalType: input.hospitalType,
          hospitalName: input.hospitalName,
          patientTransferDocumentNo: input.patientTransferDocumentNo,
          diseaseDetails: input.diseaseDetails,
          gasolineClaimType: input.gasolineClaimType,
          dependentName: input.dependentName,
          dependentRelationship: input.dependentRelationship,
          attachments: input.attachments ?? [],
          audit: [{ at, actorRole: 'employee', actorName: input.employeeName ?? 'จงรักษ์ ทานากะ', action: 'submit', note: 'ส่งคำขอเบิกสวัสดิการ' }],
          version: 1,
          previousVersions: [],
        };
        set((s) => ({ claims: [claim, ...s.claims] }));
        return claim;
      },
      approveClaim: (id, actor, note) => set((s) => ({ claims: updateClaim(s.claims, id, 'approved', actor, 'approve', note) })),
      rejectClaim: (id, actor, reason) => set((s) => ({ claims: updateClaim(s.claims, id, 'rejected', actor, 'reject', reason) })),
      sendBackClaim: (id, actor, reason) => set((s) => ({ claims: updateClaim(s.claims, id, 'send_back', actor, 'send_back', reason) })),
      resubmitClaim: (id, input, actor = { role: 'employee', name: 'จงรักษ์ ทานากะ' }) => set((s) => ({
        claims: s.claims.map((claim) => {
          if (claim.id !== id) return claim;
          const at = nowIso();
          return {
            ...claim,
            ...input,
            status: 'pending_spd',
            updatedAt: at,
            correctionReason: undefined,
            version: claim.version + 1,
            previousVersions: [{ receiptNo: claim.receiptNo, receiptAmount: claim.receiptAmount, totalClaimAmount: claim.totalClaimAmount, updatedAt: claim.updatedAt, version: claim.version }, ...claim.previousVersions],
            audit: [...claim.audit, { at, actorRole: actor.role, actorName: actor.name, action: 'resubmit', note: 'ส่งกลับหลังแก้ไข' }],
          };
        }),
      })),
      hasDuplicateReceipt: (employeeId, benefitCode, receiptNo, excludingId) =>
        get().claims.some((claim) => claim.id !== excludingId && claim.employeeId === employeeId && claim.benefitCode === benefitCode && claim.receiptNo.trim().toLowerCase() === receiptNo.trim().toLowerCase()),
    }),
    { name: 'humi-benefit-claims' },
  ),
);

function updateClaim(
  claims: BenefitClaimRequest[],
  id: string,
  status: BenefitClaimStatus,
  actor: Actor,
  action: BenefitClaimAuditEntry['action'],
  note?: string,
) {
  const at = nowIso();
  return claims.map((claim) => claim.id === id ? {
    ...claim,
    status,
    updatedAt: at,
    correctionReason: status === 'send_back' ? note : claim.correctionReason,
    audit: [...claim.audit, { at, actorRole: actor.role, actorName: actor.name, action, note }],
  } : claim);
}
