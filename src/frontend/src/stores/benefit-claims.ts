import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RequestStatus } from '@/lib/humi-mock-data';

export type BenefitClaimStatus = 'pending_spd' | 'send_back' | 'approved' | 'rejected';
export type BenefitClaimType = 'medical' | 'gasoline' | 'mobile' | 'physical_checkup' | 'dependent';

export interface BenefitAttachment {
  id: string;
  name: string;
  sizeMb: number;
  extension: string;
}

export interface BenefitClaimAuditEntry {
  at: string;
  actor: string;
  action: 'submitted' | 'edited' | 'approved' | 'rejected' | 'send_back';
  note?: string;
}

export interface BenefitClaimDraftInput {
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
  receiptNo: string;
  receiptDate: string;
  receiptAmount: number;
  claimAmount: number;
  hospitalType?: string;
  hospitalName?: string;
  patientTransferDocument?: string;
  diseaseDetails?: string;
  gasolineClaimType?: string;
  dependentName?: string;
  dependentRelation?: string;
  attachments: BenefitAttachment[];
}

export interface BenefitClaimRequest extends BenefitClaimDraftInput {
  id: string;
  workflowRequestId: string;
  status: BenefitClaimStatus;
  submittedAt: string;
  updatedAt: string;
  correctionOf?: string;
  audit: BenefitClaimAuditEntry[];
}

export interface BenefitRequestProjection {
  id: string;
  type: string;
  sub: string;
  submitted: string;
  status: RequestStatus;
  rawStatus: BenefitClaimStatus;
  claimId: string;
}

interface BenefitClaimsState {
  claims: BenefitClaimRequest[];
  submitClaim: (input: BenefitClaimDraftInput, correctionOf?: string) => BenefitClaimRequest;
  approveClaim: (claimId: string, note?: string) => void;
  rejectClaim: (claimId: string, reason: string) => void;
  sendBackClaim: (claimId: string, reason: string) => void;
  findDuplicateReceipt: (employeeId: string, benefitCode: string, receiptNo: string, ignoreClaimId?: string) => BenefitClaimRequest | undefined;
  requestProjections: () => BenefitRequestProjection[];
}

export const BENEFIT_CLAIM_TYPE_LABEL: Record<BenefitClaimType, string> = {
  medical: 'ค่ารักษาพยาบาล',
  gasoline: 'ค่าน้ำมัน',
  mobile: 'ค่าโทรศัพท์มือถือ',
  physical_checkup: 'ตรวจสุขภาพประจำปี',
  dependent: 'ค่ารักษาผู้รับสิทธิ์ร่วม',
};

export const BENEFIT_CLAIM_STATUS_LABEL: Record<BenefitClaimStatus, string> = {
  pending_spd: 'รอ SPD อนุมัติ',
  send_back: 'ส่งกลับแก้ไข',
  approved: 'อนุมัติแล้ว',
  rejected: 'ไม่อนุมัติ',
};

export const BENEFIT_CLAIM_STATUS_TONE: Record<BenefitClaimStatus, string> = {
  pending_spd: 'bg-warning-soft text-[color:var(--color-warning)]',
  send_back: 'bg-accent-soft text-[color:var(--color-accent-ink)]',
  approved: 'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]',
  rejected: 'bg-[color:var(--color-canvas-soft)] text-ink-muted',
};

const REQUEST_STATUS_BY_BENEFIT_STATUS: Record<BenefitClaimStatus, RequestStatus> = {
  pending_spd: 'pending',
  send_back: 'info',
  approved: 'approved',
  rejected: 'rejected',
};

function nowIso() {
  return new Date().toISOString();
}

function formatThaiDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function nextId(prefix: string, count: number) {
  return `${prefix}-${String(count + 1).padStart(4, '0')}`;
}

export function isSupportedBenefitAttachment(file: Pick<BenefitAttachment, 'extension' | 'sizeMb'>) {
  return ['.pdf', '.jpg', '.jpeg', '.png', '.pptx', '.xlsx'].includes(file.extension.toLowerCase()) && file.sizeMb <= 10;
}

export function validateBenefitAttachments(files: BenefitAttachment[]) {
  if (files.length > 5) return 'แนบเอกสารได้สูงสุด 5 ไฟล์';
  const invalid = files.find((file) => !isSupportedBenefitAttachment(file));
  if (invalid) return 'รองรับเฉพาะ .pdf, .jpg, .jpeg, .png, .pptx, .xlsx และขนาดไม่เกิน 10 MB';
  return null;
}


export function projectBenefitClaims(claims: BenefitClaimRequest[]): BenefitRequestProjection[] {
  return claims.map((claim) => ({
    id: claim.workflowRequestId,
    type: `เบิกสวัสดิการ · ${BENEFIT_CLAIM_TYPE_LABEL[claim.benefitType]}`,
    sub: `${claim.benefitCode} · เอกสาร ${claim.receiptNo} · ฿${claim.claimAmount.toLocaleString('th-TH')} · ${BENEFIT_CLAIM_STATUS_LABEL[claim.status]}`,
    submitted: formatThaiDate(claim.submittedAt),
    status: REQUEST_STATUS_BY_BENEFIT_STATUS[claim.status],
    rawStatus: claim.status,
    claimId: claim.id,
  }));
}

export const useBenefitClaimsStore = create<BenefitClaimsState>()(
  persist(
    (set, get) => ({
      claims: [],
      submitClaim: (input, correctionOf) => {
        const at = nowIso();
        const existingCount = get().claims.length;
        const claim: BenefitClaimRequest = {
          ...input,
          id: nextId('BEN', existingCount),
          workflowRequestId: nextId('REQ-BEN', existingCount),
          status: 'pending_spd',
          submittedAt: at,
          updatedAt: at,
          correctionOf,
          audit: [
            {
              at,
              actor: input.employeeName,
              action: correctionOf ? 'edited' : 'submitted',
              note: correctionOf ? `แก้ไขจากคำขอ ${correctionOf}` : 'ส่งคำขอเบิกสวัสดิการ',
            },
          ],
        };
        set((state) => ({ claims: [claim, ...state.claims] }));
        return claim;
      },
      approveClaim: (claimId, note) => set((state) => ({
        claims: state.claims.map((claim) => claim.id === claimId
          ? {
              ...claim,
              status: 'approved',
              updatedAt: nowIso(),
              audit: [...claim.audit, { at: nowIso(), actor: 'SPD', action: 'approved', note }],
            }
          : claim),
      })),
      rejectClaim: (claimId, reason) => set((state) => ({
        claims: state.claims.map((claim) => claim.id === claimId
          ? {
              ...claim,
              status: 'rejected',
              updatedAt: nowIso(),
              audit: [...claim.audit, { at: nowIso(), actor: 'SPD', action: 'rejected', note: reason }],
            }
          : claim),
      })),
      sendBackClaim: (claimId, reason) => set((state) => ({
        claims: state.claims.map((claim) => claim.id === claimId
          ? {
              ...claim,
              status: 'send_back',
              updatedAt: nowIso(),
              audit: [...claim.audit, { at: nowIso(), actor: 'SPD', action: 'send_back', note: reason }],
            }
          : claim),
      })),
      findDuplicateReceipt: (employeeId, benefitCode, receiptNo, ignoreClaimId) => get().claims.find((claim) =>
        claim.employeeId === employeeId &&
        claim.benefitCode === benefitCode &&
        claim.receiptNo.trim().toLowerCase() === receiptNo.trim().toLowerCase() &&
        claim.id !== ignoreClaimId
      ),
      requestProjections: () => projectBenefitClaims(get().claims),
    }),
    { name: 'humi-benefit-claims' }
  )
);
