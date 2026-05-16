import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HumiApprovalStep, RequestStatus } from '@/lib/humi-mock-data';

export type BenefitClaimStatus =
  | 'pending_manager_approval'   // STA-28: manager must approve before SPD
  | 'pending_spd'
  | 'send_back'
  | 'approved'
  | 'rejected';
export type BenefitClaimType = 'medical' | 'gasoline' | 'mobile' | 'physical_checkup' | 'dependent';

export interface BenefitAttachment {
  id: string;
  /** Canonical display name used by the benefit module. */
  filename?: string;
  /** Compatibility with earlier benefit-surface tests and fixture shape. */
  name?: string;
  extension?: string;
  /** Canonical size in MB. */
  sizeMb?: number;
  /** Compatibility with byte-sized mock upload fixtures. */
  size?: number;
  mimeType?: string;
}

export interface BenefitClaimAuditEntry {
  at: string;
  // STA-27 PR-A — widened to include 'hrbp' for exception oversight audit entries
  actorRole: 'employee' | 'spd' | 'manager' | 'hrbp' | 'system';
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
  /** Compatibility alias from earlier claim-form drafts. */
  claimAmount?: number;
  status: BenefitClaimStatus;
  submittedAt: string;
  updatedAt: string;
  hospitalType?: string;
  opdIpd?: string;
  hospitalName?: string;
  patientTransferDocumentNo?: string;
  diseaseDetails?: string;
  gasolineClaimType?: string;
  dependentName?: string;
  dependentRelationship?: string;
  attachments: BenefitAttachment[];
  audit: BenefitClaimAuditEntry[];
  correctionReason?: string;
  /** Q10 Option A: original remaining amount at time of submission for auto-restore on Send Back. */
  originalRemainingAmount?: number;
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
  benefitType?: BenefitClaimType;
  /** Compatibility alias from the first surface-test pass. */
  claimType?: BenefitClaimType;
  benefitCode?: string;
  benefitName?: string;
  remainingAmount?: number;
  receiptNo: string;
  receiptDate: string;
  receiptAmount: number;
  totalClaimAmount?: number;
  /** Compatibility alias from earlier claim-form drafts. */
  claimAmount?: number;
  hospitalType?: string;
  opdIpd?: string;
  hospitalName?: string;
  patientTransferDocumentNo?: string;
  diseaseDetails?: string;
  gasolineClaimType?: string;
  dependentName?: string;
  dependentRelationship?: string;
  attachments?: BenefitAttachment[];
}

export type BenefitClaimDraftInput = BenefitClaimInput;
export type BenefitClaimSubmitInput = BenefitClaimInput;

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
  /** STA-28 PR-C: Manager approves → status becomes pending_spd. Mock-async 300ms. */
  managerApprove: (claimId: string, managerName: string) => Promise<void>;
  /**
   * STA-28 PR-C: Manager sends back → status becomes send_back.
   * Q10 Option A: entitlement is auto-restored immediately on Send Back.
   * Appends two audit entries: (a) manager send_back entry, (b) system auto-restore entry.
   * Mock-async 300ms.
   */
  managerSendBack: (claimId: string, managerName: string, note: string) => Promise<void>;
  clear: () => void;
}

export const BENEFIT_STATUS_LABEL: Record<BenefitClaimStatus, string> = {
  pending_manager_approval: 'รออนุมัติจากหัวหน้า',
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
  // pending_manager_approval and pending_spd both map to 'pending'
  return 'pending';
}

function stepStatus(status: BenefitClaimStatus): HumiApprovalStep['status'] {
  if (status === 'approved') return 'approved';
  if (status === 'rejected') return 'rejected';
  return 'pending';
}

export function validateBenefitAttachmentRules(input: Pick<BenefitClaimInput, 'benefitType' | 'claimType' | 'attachments'>) {
  const attachments = input.attachments ?? [];
  const errors: string[] = [];
  const allowed = ['.pdf', '.jpg', '.jpeg', '.png', '.pptx', '.xlsx'];
  if (attachments.length > 5) errors.push('แนบไฟล์ได้สูงสุด 5 ไฟล์');
  attachments.forEach((file) => {
    const filename = file.filename ?? file.name ?? '';
    const lower = filename.toLowerCase();
    const sizeMb = file.sizeMb ?? (file.size ? file.size / 1_000_000 : 0);
    if (!allowed.some((ext) => lower.endsWith(ext))) errors.push(`ชนิดไฟล์ไม่รองรับ: ${filename || 'unknown file'}`);
    if (sizeMb > 10) errors.push(`ไฟล์เกิน 10 MB: ${filename || 'unknown file'}`);
  });
  if ((input.benefitType ?? input.claimType) === 'medical' && attachments.length === 0) {
    errors.push('ค่ารักษาพยาบาลต้องแนบเอกสารอย่างน้อย 1 ไฟล์');
  }
  return errors;
}

export function selectBenefitRequestSummaries(claims: BenefitClaimRequest[]) {
  return claims.map((claim) => ({
    id: claim.workflowRequestId,
    type: `เบิกสวัสดิการ · ${BENEFIT_TYPE_LABEL[claim.benefitType]}`,
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

function normalizeAttachments(attachments: BenefitAttachment[] = []): BenefitAttachment[] {
  return attachments.map((file, index) => ({
    ...file,
    id: file.id || `att-${index + 1}`,
    filename: file.filename ?? file.name ?? 'attachment',
    sizeMb: file.sizeMb ?? (file.size ? file.size / 1_000_000 : 0),
  }));
}

const initialClaims: BenefitClaimRequest[] = [
  // STA-28 PR-C: seed claim pending manager approval — routable at /workflows/benefit-claim/BEN-CLM-MGR1
  {
    id: 'BEN-CLM-MGR1',
    workflowRequestId: 'REQ-BEN-MGR1',
    employeeId: 'EMP002',
    employeeName: 'สมใจ วงษ์ดี',
    company: 'Central Group',
    businessUnit: 'HR',
    employeeGroup: 'Monthly',
    personalGrade: 'PG3',
    benefitType: 'medical',
    benefitCode: 'BEN-MED-OPD',
    benefitName: 'ค่ารักษาพยาบาล',
    remainingAmount: 15000,
    originalRemainingAmount: 15000,
    currency: 'THB',
    receiptNo: 'RCPT-2026-0501',
    receiptDate: '2026-05-01',
    receiptAmount: 3200,
    totalClaimAmount: 3200,
    status: 'pending_manager_approval',
    submittedAt: '2026-05-16T08:00:00.000Z',
    updatedAt: '2026-05-16T08:00:00.000Z',
    hospitalType: 'private',
    hospitalName: 'รพ.สมิติเวช',
    opdIpd: 'OPD',
    diseaseDetails: 'ไข้หวัดใหญ่',
    attachments: [
      { id: 'att-mgr1-1', filename: 'receipt-0501.pdf', sizeMb: 0.9, mimeType: 'application/pdf' },
      { id: 'att-mgr1-2', filename: 'doctor-note.jpg', sizeMb: 0.4, mimeType: 'image/jpeg' },
    ],
    audit: [
      { at: '2026-05-16T08:00:00.000Z', actorRole: 'employee', actorName: 'สมใจ วงษ์ดี', action: 'submit', note: 'ส่งคำขอเบิกค่ารักษาพยาบาล' },
    ],
    version: 1,
    previousVersions: [],
  },
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
    originalRemainingAmount: 18000,
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
  // STA-26: seed approved claims (≥5) for exception source-picker variety
  {
    id: 'BEN-CLM-0002',
    workflowRequestId: 'REQ-BEN-0002',
    employeeId: 'EMP002',
    employeeName: 'สมใจ วงษ์ดี',
    company: 'Central Group',
    businessUnit: 'HR',
    employeeGroup: 'Monthly',
    personalGrade: 'PG3',
    benefitType: 'medical',
    benefitCode: 'BEN-MED-OPD',
    benefitName: 'ค่ารักษาพยาบาล',
    remainingAmount: 12000,
    currency: 'THB',
    receiptNo: 'RCPT-2026-0301',
    receiptDate: '2026-03-01',
    receiptAmount: 3500,
    totalClaimAmount: 3500,
    status: 'approved',
    submittedAt: '2026-03-01T08:00:00.000Z',
    updatedAt: '2026-03-02T10:00:00.000Z',
    hospitalType: 'private',
    hospitalName: 'รพ.สมิติเวช',
    diseaseDetails: 'ไข้หวัด',
    attachments: [{ id: 'att-2', filename: 'receipt-0301.pdf', sizeMb: 0.8, mimeType: 'application/pdf' }],
    audit: [
      { at: '2026-03-01T08:00:00.000Z', actorRole: 'employee', actorName: 'สมใจ วงษ์ดี', action: 'submit' },
      { at: '2026-03-02T10:00:00.000Z', actorRole: 'spd', actorName: 'ทีม SPD', action: 'approve', note: 'อนุมัติแล้ว' },
    ],
    version: 1,
    previousVersions: [],
  },
  {
    id: 'BEN-CLM-0003',
    workflowRequestId: 'REQ-BEN-0003',
    employeeId: 'EMP003',
    employeeName: 'ประเสริฐ มีสุข',
    company: 'Central Retail',
    businessUnit: 'Finance',
    employeeGroup: 'Monthly',
    personalGrade: 'PG5',
    benefitType: 'gasoline',
    benefitCode: 'BEN-FUEL',
    benefitName: 'ค่าน้ำมัน',
    remainingAmount: 8000,
    currency: 'THB',
    receiptNo: 'RCPT-2026-0210',
    receiptDate: '2026-02-10',
    receiptAmount: 2200,
    totalClaimAmount: 2200,
    status: 'approved',
    submittedAt: '2026-02-10T09:30:00.000Z',
    updatedAt: '2026-02-11T14:00:00.000Z',
    gasolineClaimType: 'fuel',
    attachments: [{ id: 'att-3', filename: 'fuel-receipt-0210.jpg', sizeMb: 0.5, mimeType: 'image/jpeg' }],
    audit: [
      { at: '2026-02-10T09:30:00.000Z', actorRole: 'employee', actorName: 'ประเสริฐ มีสุข', action: 'submit' },
      { at: '2026-02-11T14:00:00.000Z', actorRole: 'spd', actorName: 'ทีม SPD', action: 'approve', note: 'อนุมัติแล้ว' },
    ],
    version: 1,
    previousVersions: [],
  },
  {
    id: 'BEN-CLM-0004',
    workflowRequestId: 'REQ-BEN-0004',
    employeeId: 'EMP004',
    employeeName: 'วิมลรัตน์ แก้วใส',
    company: 'Central Group',
    businessUnit: 'IT',
    employeeGroup: 'Monthly',
    personalGrade: 'PG4',
    benefitType: 'mobile',
    benefitCode: 'BEN-MOBILE',
    benefitName: 'ค่าโทรศัพท์',
    remainingAmount: 6000,
    currency: 'THB',
    receiptNo: 'RCPT-2026-0115',
    receiptDate: '2026-01-15',
    receiptAmount: 599,
    totalClaimAmount: 599,
    status: 'approved',
    submittedAt: '2026-01-15T11:00:00.000Z',
    updatedAt: '2026-01-16T09:00:00.000Z',
    attachments: [{ id: 'att-4', filename: 'phone-bill-jan.pdf', sizeMb: 0.3, mimeType: 'application/pdf' }],
    audit: [
      { at: '2026-01-15T11:00:00.000Z', actorRole: 'employee', actorName: 'วิมลรัตน์ แก้วใส', action: 'submit' },
      { at: '2026-01-16T09:00:00.000Z', actorRole: 'spd', actorName: 'ทีม SPD', action: 'approve', note: 'อนุมัติแล้ว' },
    ],
    version: 1,
    previousVersions: [],
  },
  {
    id: 'BEN-CLM-0005',
    workflowRequestId: 'REQ-BEN-0005',
    employeeId: 'EMP005',
    employeeName: 'กิตติพงษ์ รักดี',
    company: 'Central Food',
    businessUnit: 'Operations',
    employeeGroup: 'Monthly',
    personalGrade: 'PG3',
    benefitType: 'physical_checkup',
    benefitCode: 'BEN-CHECKUP',
    benefitName: 'ตรวจสุขภาพ',
    remainingAmount: 5000,
    currency: 'THB',
    receiptNo: 'RCPT-2026-0320',
    receiptDate: '2026-03-20',
    receiptAmount: 4800,
    totalClaimAmount: 4800,
    status: 'approved',
    submittedAt: '2026-03-20T13:00:00.000Z',
    updatedAt: '2026-03-21T10:00:00.000Z',
    attachments: [{ id: 'att-5', filename: 'checkup-2026.pdf', sizeMb: 2.1, mimeType: 'application/pdf' }],
    audit: [
      { at: '2026-03-20T13:00:00.000Z', actorRole: 'employee', actorName: 'กิตติพงษ์ รักดี', action: 'submit' },
      { at: '2026-03-21T10:00:00.000Z', actorRole: 'spd', actorName: 'ทีม SPD', action: 'approve', note: 'อนุมัติแล้ว' },
    ],
    version: 1,
    previousVersions: [],
  },
  {
    id: 'BEN-CLM-0006',
    workflowRequestId: 'REQ-BEN-0006',
    employeeId: 'EMP001',
    employeeName: 'จงรักษ์ ทานากะ',
    company: 'Central Group',
    businessUnit: 'People Operations',
    employeeGroup: 'Monthly',
    personalGrade: 'PG4',
    benefitType: 'dependent',
    benefitCode: 'BEN-DEP-MED',
    benefitName: 'ค่ารักษาผู้รับสิทธิ์ร่วม',
    remainingAmount: 10000,
    currency: 'THB',
    receiptNo: 'RCPT-2026-0228',
    receiptDate: '2026-02-28',
    receiptAmount: 7800,
    totalClaimAmount: 7800,
    status: 'approved',
    submittedAt: '2026-02-28T15:00:00.000Z',
    updatedAt: '2026-03-01T09:00:00.000Z',
    hospitalType: 'private',
    hospitalName: 'รพ.เวชธานี',
    dependentName: 'แม่ ทานากะ',
    dependentRelationship: 'บิดา/มารดา',
    attachments: [{ id: 'att-6', filename: 'dep-receipt-feb.pdf', sizeMb: 1.5, mimeType: 'application/pdf' }],
    audit: [
      { at: '2026-02-28T15:00:00.000Z', actorRole: 'employee', actorName: 'จงรักษ์ ทานากะ', action: 'submit' },
      { at: '2026-03-01T09:00:00.000Z', actorRole: 'spd', actorName: 'ทีม SPD', action: 'approve', note: 'อนุมัติแล้ว' },
    ],
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
        const benefitType = input.benefitType ?? input.claimType ?? 'medical';
        const benefitCode = input.benefitCode ?? BENEFIT_CODE_BY_TYPE[benefitType];
        const totalClaimAmount = input.totalClaimAmount ?? input.claimAmount ?? input.receiptAmount;
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
          totalClaimAmount,
          claimAmount: totalClaimAmount,
          status: 'pending_spd',
          submittedAt: at,
          updatedAt: at,
          hospitalType: input.hospitalType ?? input.opdIpd,
          hospitalName: input.hospitalName,
          patientTransferDocumentNo: input.patientTransferDocumentNo,
          diseaseDetails: input.diseaseDetails,
          gasolineClaimType: input.gasolineClaimType,
          dependentName: input.dependentName,
          dependentRelationship: input.dependentRelationship,
          attachments: normalizeAttachments(input.attachments),
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
      managerApprove: (claimId, managerName) =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            const at = nowIso();
            set((s) => ({
              claims: s.claims.map((claim) =>
                claim.id !== claimId ? claim : {
                  ...claim,
                  status: 'pending_spd' as BenefitClaimStatus,
                  updatedAt: at,
                  audit: [
                    ...claim.audit,
                    { at, actorRole: 'manager' as const, actorName: managerName, action: 'approve' as const, note: 'หัวหน้าอนุมัติ / Manager approved' },
                  ],
                }
              ),
            }));
            resolve();
          }, 300);
        }),
      managerSendBack: (claimId, managerName, note) =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            const at = nowIso();
            set((s) => ({
              claims: s.claims.map((claim) => {
                if (claim.id !== claimId) return claim;
                // Q10 Option A: restore remainingAmount to originalRemainingAmount immediately on Send Back.
                const restored = claim.originalRemainingAmount ?? claim.remainingAmount;
                return {
                  ...claim,
                  status: 'send_back' as BenefitClaimStatus,
                  updatedAt: at,
                  remainingAmount: restored,
                  correctionReason: note,
                  audit: [
                    ...claim.audit,
                    { at, actorRole: 'manager' as const, actorName: managerName, action: 'send_back' as const, note },
                    { at, actorRole: 'system' as const, actorName: 'ระบบ / System', action: 'resubmit' as const, note: 'Entitlement auto-restored (Q10 Option A)' },
                  ],
                };
              }),
            }));
            resolve();
          }, 300);
        }),
      clear: () => set({ claims: [] }),
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
