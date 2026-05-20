// data/benefits/plan-registry.ts — 28 BE plan definitions sourced from
// extracted-context-2026-05-02/04-benefit-features.md (covers all 27 features
// — some collapse to one plan, others split into tiers like Medical OPD/IPD).
//
// Each plan binds to one of 6 reusable workflow templates so the UI does NOT
// need 27 bespoke screens. Record type encodes workflow:
//   records = admin-only logging         → records-flat / records-dependent
//   info    = display-only               → records-computed
//   claimable = employee-claimable       → simple-claim / hospital-claim
//
// schemaVersion discriminator:
//   'v2' — all 28 plans on A3 hybrid sub-objects (coverage, eligibility,
//           claimRules, coverageType, notifications). Source: SF Benefit entity 80 fields.

export type WorkflowTemplate =
  | 'simple-claim'
  | 'hospital-claim'
  | 'records-flat'
  | 'records-dependent'
  | 'records-computed'
  | 'lifecycle-admin';

export type PlanCategory =
  | 'medical'
  | 'dental'
  | 'physical'
  | 'gasoline'
  | 'toll'
  | 'parking'
  | 'life'
  | 'gift'
  | 'funeral'
  | 'wreath'
  | 'beneficiary'
  | 'lifecycle';

export type RecordType = 'records' | 'info' | 'claimable';

export type BenefitTypeGroup = 'reimbursement-employee-hr' | 'reimbursement-hr' | 'info' | 'record';

export function deriveRecordTypeFromBenefitTypeGroup(
  benefitTypeGroup: BenefitTypeGroup,
): RecordType {
  switch (benefitTypeGroup) {
    case 'record':
      return 'records';
    case 'info':
      return 'info';
    case 'reimbursement-employee-hr':
    case 'reimbursement-hr':
      return 'claimable';
  }
}

/** Approver chain stages, in order. Manager is intentionally absent for BE
 *  flows because Manager has 0 fields on BenefitEmployeeClaim per SF probe. */
export type ApproverStage = 'manager' | 'hrbp' | 'spd' | 'hr_admin';

// ── A3 hybrid sub-object types (v2 plans only) ────────────────────────────

export interface PlanCoverage {
  entitlementAmount: number | null;
  currency: string;
  claimsLimitPerFrequencyPeriod: number | null;
  frequency: string | null;
  exceedEntitlementAmount: boolean;
  balanceCarryForward: {
    enabled: boolean;
    maxYears: number | null;
    capAmount: number | null;
  };
}

export interface PlanEligibility {
  eligibilityRuleId: string | null;
  enrollmentRequired: boolean;
  dependentSpecificRule: boolean;
  noOfDependentsToConsider: number | null;
  effectiveStartDate: string | null;
  effectiveEndDate: string | null;
}

export interface PlanClaimRules {
  employeeClaimWorkflowId: string | null;
  exceptionWorkflowId: string | null;
  taxationMode: string | null;
  payrollIntegration: {
    mode: string | null;
    deductionStartDate: string | null;
    retroCalculationMode: string | null;
  };
}

export interface PlanCoverageType {
  coverage: string | null;
  benefitType: string | null;
  benefitProgram: string | null;
}

export interface PlanNotifications {
  emailNotificationForEnrollment: boolean;
  showRemaningNoOfDaysForClaim: boolean;
  showRemaningNoOfDaysForEnrollment: boolean;
}

// ── Base plan shape (v1 legacy flat) ─────────────────────────────────────

export interface BenefitPlanV1 {
  schemaVersion: 'v1';
  /** Stable id used throughout the UI; e.g. 'BE-MED-001'. */
  id: string;
  /** TTT deck reference, e.g. 'BE_06'. */
  ttt: string;
  nameTh: string;
  nameEn: string;
  template: WorkflowTemplate;
  category: PlanCategory;
  recordType: RecordType;
  /** Approval chain. Empty for [Records]/[Info] plans (admin-only). */
  approvalChain: ApproverStage[];
  /** Annual entitlement in THB; null = uncapped or salary-driven. */
  annualLimitThb: number | null;
  /** Whether the form needs a dependent picker. */
  requiresDependent: boolean;
  /** Whether the form needs hospital + transfer-doc fields. */
  requiresHospital: boolean;
  /** Whether the form needs a receipt + amount field. */
  requiresReceipt: boolean;
  /** Required document attachments (free-text labels, bilingual). */
  requiredDocsTh: string[];
  requiredDocsEn: string[];
  /** Eligibility one-liner for HR review during walkthrough. */
  eligibilityTh: string;
  /**
   * STA-27 PR-A — DVT (branch-aligned variant) flag.
   * When true, SPD Branch View renders a "DVT Variant" badge for the plan.
   * Optional; defaults to undefined/false. Read-only registry hint, no behavior change for callers that ignore it.
   */
  dvtVariant?: boolean;
  /**
   * STA-70 — Country scope. Optional; existing seeds default to 'TH' at use sites.
   */
  country?: 'TH' | 'VN';
  /**
   * STA-70 — Active/Inactive flag. Optional; existing seeds default to 'active' at use sites.
   */
  status?: 'active' | 'inactive';
  /**
   * STA-70 — Top-level benefit-type grouping for configurator. Distinct from the
   * nested `coverage.benefitType` string. Optional; use-site default derives from `recordType`.
   */
  benefitTypeGroup?: BenefitTypeGroup;
  /** STA-70 follow-up — Enrolment mode. */
  enrolment?: 'auto' | 'manual';
  /** STA-70 follow-up — Claim period grouping. */
  claimPeriod?: 'year' | 'month' | 'quarter' | 'one-time' | 'lifetime';
  /** STA-70 follow-up — Entitlement-amount calculation method. */
  entitlementCalcMethod?: 'full' | 'prorate';
  /** STA-70 follow-up — Eligible-claim-date threshold. */
  eligibleClaimDate?: '30' | '60' | '90' | 'none';
  /** STA-70 follow-up — Legal-entity company (free text). */
  company?: string;
}

// ── A3 hybrid plan shape (v2) ─────────────────────────────────────────────

export interface BenefitPlanV2 {
  schemaVersion: 'v2';
  id: string;
  ttt: string;
  nameTh: string;
  nameEn: string;
  template: WorkflowTemplate;
  category: PlanCategory;
  recordType: RecordType;
  approvalChain: ApproverStage[];
  annualLimitThb: number | null;
  requiresDependent: boolean;
  requiresHospital: boolean;
  requiresReceipt: boolean;
  requiredDocsTh: string[];
  requiredDocsEn: string[];
  eligibilityTh: string;
  eligibilityEn: string;
  // A3 sub-objects
  coverage: PlanCoverage;
  eligibility: PlanEligibility;
  claimRules: PlanClaimRules;
  coverageType: PlanCoverageType;
  notifications: PlanNotifications;
  /**
   * STA-27 PR-A — DVT (branch-aligned variant) flag.
   * When true, SPD Branch View renders a "DVT Variant" badge for the plan.
   * Optional; defaults to undefined/false.
   */
  dvtVariant?: boolean;
  /** STA-70 — Country scope. Optional; existing seeds default to 'TH' at use sites. */
  country?: 'TH' | 'VN';
  /** STA-70 — Active/Inactive flag. Optional; existing seeds default to 'active' at use sites. */
  status?: 'active' | 'inactive';
  /** STA-70 — Top-level benefit-type grouping. Optional; use-site default derives from `recordType`. */
  benefitTypeGroup?: BenefitTypeGroup;
  /** STA-70 follow-up — Enrolment mode. */
  enrolment?: 'auto' | 'manual';
  /** STA-70 follow-up — Claim period grouping. */
  claimPeriod?: 'year' | 'month' | 'quarter' | 'one-time' | 'lifetime';
  /** STA-70 follow-up — Entitlement-amount calculation method. */
  entitlementCalcMethod?: 'full' | 'prorate';
  /** STA-70 follow-up — Eligible-claim-date threshold. */
  eligibleClaimDate?: '30' | '60' | '90' | 'none';
  /** STA-70 follow-up — Legal-entity company (free text). */
  company?: string;
}

export type BenefitPlan = BenefitPlanV1 | BenefitPlanV2;

const SIMPLE: WorkflowTemplate = 'simple-claim';
const HOSPITAL: WorkflowTemplate = 'hospital-claim';
const REC_FLAT: WorkflowTemplate = 'records-flat';
const REC_DEP: WorkflowTemplate = 'records-dependent';
const REC_COMP: WorkflowTemplate = 'records-computed';
const LIFECYCLE: WorkflowTemplate = 'lifecycle-admin';

const BE_CHAIN: ApproverStage[] = ['hrbp', 'spd', 'hr_admin'];
const ADMIN_ONLY_CHAIN: ApproverStage[] = [];

export const BENEFIT_PLAN_REGISTRY: BenefitPlan[] = [
  // ── Medical reimbursement (BE_06) — 4 tier plans ── v2 A3 hybrid ──
  {
    schemaVersion: 'v2',
    id: 'BE-MED-001',
    ttt: 'BE_06',
    nameTh: 'ค่ารักษาพยาบาล (ผู้ป่วยนอก)',
    nameEn: 'Medical Reimbursement (OPD)',
    template: SIMPLE,
    category: 'medical',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 30000,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: true,
    requiredDocsTh: ['ใบเสร็จรับเงิน', 'ใบรับรองแพทย์'],
    requiredDocsEn: ['Receipt', 'Medical certificate'],
    eligibilityTh: 'พนักงานประจำ ทุกระดับ',
    eligibilityEn: 'All permanent employees',
    dvtVariant: true, // STA-27 PR-A — branch-aligned OPD variant exists at DVT branches
    coverage: {
      entitlementAmount: 30000,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: 'Annual',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-ELIG-General_FullTime-Excl*1_EnrollRequired',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-OPD',
      exceptionWorkflowId: null,
      taxationMode: 'Non-taxable',
      payrollIntegration: { mode: 'IT0015', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Medical',
      benefitProgram: 'BE_MED_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-MED-002',
    ttt: 'BE_06',
    nameTh: 'ค่ารักษาพยาบาล (ผู้ป่วยใน) — ใบส่งตัว',
    nameEn: 'Medical Reimbursement (IPD with referral)',
    template: HOSPITAL,
    category: 'medical',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 200000,
    requiresDependent: false,
    requiresHospital: true,
    requiresReceipt: false,
    requiredDocsTh: ['ใบส่งตัว', 'สรุปค่ารักษาพยาบาล'],
    requiredDocsEn: ['Referral letter', 'Hospital summary'],
    eligibilityTh: 'พนักงานประจำ บริษัทคู่สัญญาเท่านั้น',
    eligibilityEn: 'Permanent employees — contracted hospital only',
    coverage: {
      entitlementAmount: 200000,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: 'Annual',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-ELIG-General_FullTime-Excl*1_EnrollRequired',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-IPD',
      exceptionWorkflowId: 'WF-BE-EXCEPT-IPD',
      taxationMode: 'Non-taxable',
      payrollIntegration: { mode: 'IT0015', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Medical',
      benefitProgram: 'BE_MED_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-MED-003',
    ttt: 'BE_06',
    nameTh: 'ค่ารักษาพยาบาล (ผู้ป่วยใน) — เบิกเอง',
    nameEn: 'Medical Reimbursement (IPD self-paid)',
    template: SIMPLE,
    category: 'medical',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 200000,
    requiresDependent: false,
    requiresHospital: true,
    requiresReceipt: true,
    requiredDocsTh: ['ใบเสร็จรับเงิน', 'ใบรับรองแพทย์', 'ใบสรุปการรักษา'],
    requiredDocsEn: ['Receipt', 'Medical certificate', 'Treatment summary'],
    eligibilityTh: 'พนักงานประจำ',
    eligibilityEn: 'All permanent employees',
    coverage: {
      entitlementAmount: 200000,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: 'Annual',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-ELIG-General_FullTime-Excl*1_EnrollRequired',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-IPD-SELF',
      exceptionWorkflowId: null,
      taxationMode: 'Non-taxable',
      payrollIntegration: { mode: 'IT0015', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Medical',
      benefitProgram: 'BE_MED_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-MED-004',
    ttt: 'BE_07',
    nameTh: 'ค่ารักษาพยาบาลคู่สมรสและบุตร',
    nameEn: 'Medical Reimbursement — Dependent',
    template: HOSPITAL,
    category: 'medical',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 30000,
    requiresDependent: true,
    requiresHospital: true,
    requiresReceipt: true,
    requiredDocsTh: ['ใบเสร็จรับเงิน', 'ใบรับรองแพทย์', 'หลักฐานความสัมพันธ์'],
    requiredDocsEn: ['Receipt', 'Medical certificate', 'Relationship proof'],
    eligibilityTh: 'พนักงานระดับ M3 ขึ้นไป — สูงสุด 30 ครั้ง/ปี/คน',
    eligibilityEn: 'Grade M3+ employees — max 30 claims/year/person',
    coverage: {
      entitlementAmount: 30000,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: 30,
      frequency: 'Annual',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-ELIG-General_FullTime-Excl*1_ParentChild',
      enrollmentRequired: false,
      dependentSpecificRule: true,
      noOfDependentsToConsider: 4,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-DEP',
      exceptionWorkflowId: null,
      taxationMode: 'Non-taxable',
      payrollIntegration: { mode: 'IT0015', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Dependent',
      benefitType: 'Medical',
      benefitProgram: 'BE_MED_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },

  // ── Dental (BE_08) — 1 plan — v2 A3 hybrid ──
  {
    schemaVersion: 'v2',
    id: 'BE-DEN-001',
    ttt: 'BE_08',
    nameTh: 'ค่าทันตกรรม (ส่วนหนึ่งของวงเงินการรักษาพยาบาล)',
    nameEn: 'Dental Reimbursement (part of Medical limit)',
    template: SIMPLE,
    category: 'dental',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 5000,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: true,
    requiredDocsTh: ['ใบเสร็จรับเงิน', 'ใบรับรองทันตแพทย์'],
    requiredDocsEn: ['Receipt', 'Dentist certificate'],
    eligibilityTh: 'หักจากวงเงินค่ารักษาพยาบาลรายปี',
    eligibilityEn: 'Deducted from annual medical limit',
    coverage: {
      entitlementAmount: 5000,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: 'Annual',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-EXCRC-BE-OC-DentalDVT_CheckCrossEntitlementAmount',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-DENTAL',
      exceptionWorkflowId: null,
      taxationMode: 'Non-taxable',
      payrollIntegration: { mode: 'IT0015', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Dental',
      benefitProgram: 'BE_MED_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },

  // ── Physical checkup (BE_16) — 2 plans — v2 A3 hybrid ──
  {
    schemaVersion: 'v2',
    id: 'BE-PHY-001',
    ttt: 'BE_16',
    nameTh: 'ตรวจสุขภาพประจำปี — แพ็กเกจ A',
    nameEn: 'Annual Physical Checkup — Package A',
    template: SIMPLE,
    category: 'physical',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 3500,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: true,
    requiredDocsTh: ['ใบเสร็จรับเงิน', 'ผลการตรวจสุขภาพ'],
    requiredDocsEn: ['Receipt', 'Checkup result'],
    eligibilityTh: 'อายุงานครบ 1 ปี ระดับ M2 ลงไป',
    eligibilityEn: 'Min 1 year tenure, grade M2 and below',
    coverage: {
      entitlementAmount: 3500,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: 1,
      frequency: 'Annual',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-ELIG-General_FullTime-Excl*1_EnrollRequired',
      enrollmentRequired: true,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-CHECKUP',
      exceptionWorkflowId: null,
      taxationMode: 'Non-taxable',
      payrollIntegration: { mode: 'IT0015', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Physical',
      benefitProgram: 'BE_PHY_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: true,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: true,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-PHY-002',
    ttt: 'BE_16',
    nameTh: 'ตรวจสุขภาพประจำปี — แพ็กเกจ B',
    nameEn: 'Annual Physical Checkup — Package B',
    template: SIMPLE,
    category: 'physical',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 8000,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: true,
    requiredDocsTh: ['ใบเสร็จรับเงิน', 'ผลการตรวจสุขภาพ'],
    requiredDocsEn: ['Receipt', 'Checkup result'],
    eligibilityTh: 'พนักงานระดับ M3 ขึ้นไป',
    eligibilityEn: 'Grade M3+ employees',
    coverage: {
      entitlementAmount: 8000,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: 1,
      frequency: 'Annual',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-ELIG-General_FullTime-Excl*1_EnrollRequired',
      enrollmentRequired: true,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-CHECKUP',
      exceptionWorkflowId: null,
      taxationMode: 'Non-taxable',
      payrollIntegration: { mode: 'IT0015', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Physical',
      benefitProgram: 'BE_PHY_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: true,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: true,
    },
  },

  // ── Gasoline (BE_22) — 1 plan — v2 A3 hybrid ──
  {
    schemaVersion: 'v2',
    id: 'BE-GAS-001',
    ttt: 'BE_22',
    nameTh: 'ค่าน้ำมันเชื้อเพลิง',
    nameEn: 'Gasoline Reimbursement',
    template: SIMPLE,
    category: 'gasoline',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 60000,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: true,
    requiredDocsTh: ['ใบเสร็จน้ำมัน', 'แบบรายงานการเดินทาง'],
    requiredDocsEn: ['Fuel receipt', 'Trip report'],
    eligibilityTh: 'พนักงานที่ได้รับสิทธิ์ใช้รถยนต์ — ตามเขตพื้นที่',
    eligibilityEn: 'Employees with car allowance entitlement — by area zone',
    coverage: {
      entitlementAmount: 60000,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: 'Monthly',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-ELIG-General_FullTime-Excl*1_EnrollRequired',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-GAS',
      exceptionWorkflowId: null,
      taxationMode: 'Taxable',
      payrollIntegration: { mode: 'IT0267', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Gasoline',
      benefitProgram: 'BE_TRANSPORT_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },

  // ── Toll / Parking (BE_23–24) — 2 plans — v2 A3 hybrid ──
  {
    schemaVersion: 'v2',
    id: 'BE-TOL-001',
    ttt: 'BE_23',
    nameTh: 'ค่าผ่านทาง',
    nameEn: 'Toll Reimbursement',
    template: SIMPLE,
    category: 'toll',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 12000,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: true,
    requiredDocsTh: ['ใบเสร็จค่าผ่านทาง'],
    requiredDocsEn: ['Toll receipt'],
    eligibilityTh: 'พ่วงกับสิทธิ์ค่าน้ำมัน',
    eligibilityEn: 'Bundled with gasoline entitlement',
    coverage: {
      entitlementAmount: 12000,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: 'Annual',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-OC-Toll_FullTime',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-TOL',
      exceptionWorkflowId: null,
      taxationMode: 'Non-taxable',
      payrollIntegration: { mode: 'IT0015', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Toll',
      benefitProgram: 'BE_TOLL_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-PAR-001',
    ttt: 'BE_24',
    nameTh: 'ค่าจอดรถ',
    nameEn: 'Car Parking Reimbursement',
    template: SIMPLE,
    category: 'parking',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 6000,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: true,
    requiredDocsTh: ['ใบเสร็จค่าจอดรถ'],
    requiredDocsEn: ['Parking receipt'],
    eligibilityTh: 'พนักงานระดับ M3 ขึ้นไป',
    eligibilityEn: 'Grade M3+ employees',
    coverage: {
      entitlementAmount: 6000,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: 'Annual',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-OC-Parking_FullTime',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-PAR',
      exceptionWorkflowId: null,
      taxationMode: 'Non-taxable',
      payrollIntegration: { mode: 'IT0015', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Parking',
      benefitProgram: 'BE_PARKING_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },

  // ── Life & Accident self-funded (BE_15) — display-only — v2 A3 hybrid ──
  {
    schemaVersion: 'v2',
    id: 'BE-LIF-001',
    ttt: 'BE_15',
    nameTh: '[Info] ประกันชีวิต/อุบัติเหตุ (บริษัทดูแลเอง)',
    nameEn: '[Info] Life & Accident — Self-Funded',
    template: REC_COMP,
    category: 'life',
    recordType: 'info',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: [],
    requiredDocsEn: [],
    eligibilityTh: 'แสดงผลคำนวณตามฐานเงินเดือน — view only',
    eligibilityEn: 'Salary-driven display — view only',
    dvtVariant: true, // STA-27 PR-A — branch-aligned life/accident variant exists at DVT branches
    coverage: {
      entitlementAmount: null, // Salary × 12 multiplier — display-only
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-INS-Life_SalaryMultiplier',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Life',
      benefitProgram: 'BE_LIFE_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },

  // ── Funeral assistance (BE_09–14) — 6 plans, [Records] — v2 A3 hybrid ──
  {
    schemaVersion: 'v2',
    id: 'BE-FUN-001',
    ttt: 'BE_09',
    nameTh: '[Records] เงินช่วยเหลือฌาปนกิจ — พนักงาน',
    nameEn: '[Records] Funeral Assistance — Employee',
    template: REC_FLAT,
    category: 'funeral',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['ใบมรณบัตร'],
    requiredDocsEn: ['Death certificate'],
    eligibilityTh: 'บันทึกโดย HR เท่านั้น',
    eligibilityEn: 'HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Funeral_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Funeral',
      benefitProgram: 'BE_FUNERAL_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-FUN-002',
    ttt: 'BE_10',
    nameTh: '[Records] เงินช่วยเหลือฌาปนกิจ — คู่สมรส',
    nameEn: '[Records] Funeral Assistance — Spouse',
    template: REC_DEP,
    category: 'funeral',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: true,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['ใบมรณบัตร', 'หลักฐานความสัมพันธ์'],
    requiredDocsEn: ['Death certificate', 'Relationship proof'],
    eligibilityTh: 'บันทึกโดย HR เท่านั้น',
    eligibilityEn: 'HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Funeral_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: true,
      noOfDependentsToConsider: 1,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee+Dependent',
      benefitType: 'Funeral',
      benefitProgram: 'BE_FUNERAL_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-FUN-003',
    ttt: 'BE_11',
    nameTh: '[Records] เป็นเจ้าภาพงานศพ — พนักงาน',
    nameEn: '[Records] Host of Funeral Ceremony — Employee',
    template: REC_FLAT,
    category: 'funeral',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['ใบมรณบัตร'],
    requiredDocsEn: ['Death certificate'],
    eligibilityTh: 'บันทึกโดย HR เท่านั้น',
    eligibilityEn: 'HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Funeral_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Funeral',
      benefitProgram: 'BE_FUNERAL_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-FUN-004',
    ttt: 'BE_12',
    nameTh: '[Records] เป็นเจ้าภาพงานศพ — บุคคลในครอบครัว',
    nameEn: '[Records] Host of Funeral Ceremony — Dependent',
    template: REC_DEP,
    category: 'funeral',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: true,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['ใบมรณบัตร', 'หลักฐานความสัมพันธ์'],
    requiredDocsEn: ['Death certificate', 'Relationship proof'],
    eligibilityTh: 'บันทึกโดย HR เท่านั้น',
    eligibilityEn: 'HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Funeral_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: true,
      noOfDependentsToConsider: 1,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee+Dependent',
      benefitType: 'Funeral',
      benefitProgram: 'BE_FUNERAL_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-WRT-001',
    ttt: 'BE_13',
    nameTh: '[Records] พวงหรีด — พนักงาน',
    nameEn: '[Records] Wreath — Employee',
    template: REC_FLAT,
    category: 'wreath',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['ใบมรณบัตร'],
    requiredDocsEn: ['Death certificate'],
    eligibilityTh: 'บันทึกโดย HR เท่านั้น',
    eligibilityEn: 'HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Funeral_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Wreath',
      benefitProgram: 'BE_WREATH_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-WRT-002',
    ttt: 'BE_14',
    nameTh: '[Records] พวงหรีด — บุคคลในครอบครัว',
    nameEn: '[Records] Wreath — Dependent',
    template: REC_DEP,
    category: 'wreath',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: true,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['ใบมรณบัตร', 'หลักฐานความสัมพันธ์'],
    requiredDocsEn: ['Death certificate', 'Relationship proof'],
    eligibilityTh: 'บันทึกโดย HR เท่านั้น',
    eligibilityEn: 'HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Funeral_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: true,
      noOfDependentsToConsider: 1,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee+Dependent',
      benefitType: 'Wreath',
      benefitProgram: 'BE_WREATH_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },

  // ── Gifts (BE_17–21) — 5 plans — v2 A3 hybrid ──
  {
    schemaVersion: 'v2',
    id: 'BE-GIF-001',
    ttt: 'BE_17',
    nameTh: '[Records] ของเยี่ยมไข้',
    nameEn: '[Records] Gift — Patient Visit',
    template: REC_FLAT,
    category: 'gift',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['ใบรับรองการเข้ารักษา'],
    requiredDocsEn: ['Admission proof'],
    eligibilityTh: 'บันทึกโดย HR เท่านั้น',
    eligibilityEn: 'HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Gift_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Gift',
      benefitProgram: 'BE_GIFT_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-GIF-002',
    ttt: 'BE_18',
    nameTh: '[Records] ของเยี่ยมงานบวช',
    nameEn: '[Records] Gift — Ordination',
    template: REC_FLAT,
    category: 'gift',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['ใบเชิญ/หลักฐานงานบวช'],
    requiredDocsEn: ['Ordination invitation/proof'],
    eligibilityTh: 'บันทึกโดย HR เท่านั้น',
    eligibilityEn: 'HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Gift_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Gift',
      benefitProgram: 'BE_GIFT_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-GIF-003',
    ttt: 'BE_19',
    nameTh: '[Records] ของเยี่ยมงานสมรส',
    nameEn: '[Records] Gift — Wedding',
    template: REC_FLAT,
    category: 'gift',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['การ์ดเชิญ/ทะเบียนสมรส'],
    requiredDocsEn: ['Wedding invitation/registration'],
    eligibilityTh: 'บันทึกโดย HR เท่านั้น',
    eligibilityEn: 'HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Gift_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Gift',
      benefitProgram: 'BE_GIFT_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-GIF-004',
    ttt: 'BE_20',
    nameTh: '[Records] ของเยี่ยมคลอดบุตร',
    nameEn: '[Records] Gift — Child Birth',
    template: REC_FLAT,
    category: 'gift',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['สูติบัตร'],
    requiredDocsEn: ['Birth certificate'],
    eligibilityTh: 'บันทึกโดย HR เท่านั้น',
    eligibilityEn: 'HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Gift_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Gift',
      benefitProgram: 'BE_GIFT_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-GIF-005',
    ttt: 'BE_21',
    nameTh: 'เงินช่วยเหลือคลอดบุตร (เบิกได้)',
    nameEn: 'Gift — Child Birth Claim',
    template: REC_DEP,
    category: 'gift',
    recordType: 'claimable',
    approvalChain: BE_CHAIN,
    annualLimitThb: 5000,
    requiresDependent: true,
    requiresHospital: false,
    requiresReceipt: true,
    requiredDocsTh: ['สูติบัตร', 'ใบรับรองความสัมพันธ์'],
    requiredDocsEn: ['Birth certificate', 'Relationship proof'],
    eligibilityTh: 'พนักงานประจำ — ครั้งเดียวต่อบุตร',
    eligibilityEn: 'Permanent employees — once per child',
    coverage: {
      entitlementAmount: 5000,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: 'Annual',
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-CLAIM-ChildBirth_FullTime',
      enrollmentRequired: false,
      dependentSpecificRule: true,
      noOfDependentsToConsider: 1,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: 'WF-BE-CLAIM-GIF',
      exceptionWorkflowId: null,
      taxationMode: 'Non-taxable',
      payrollIntegration: { mode: 'IT0015', deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee+Dependent',
      benefitType: 'Gift',
      benefitProgram: 'BE_GIFT_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: true,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },

  // ── Beneficiary management (BE_25) — 1 plan — v2 A3 hybrid ──
  {
    schemaVersion: 'v2',
    id: 'BE-BEN-001',
    ttt: 'BE_25',
    nameTh: '[Records] ข้อมูลผู้รับผลประโยชน์',
    nameEn: '[Records] Beneficiary Data',
    template: REC_FLAT,
    category: 'beneficiary',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: true,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: ['สำเนาบัตรประชาชน', 'หลักฐานความสัมพันธ์'],
    requiredDocsEn: ['ID copy', 'Relationship proof'],
    eligibilityTh: 'พนักงานทุกคน — บันทึกผ่าน HR',
    eligibilityEn: 'All employees — HR-recorded only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-REC-Beneficiary_AdminOnly',
      enrollmentRequired: false,
      dependentSpecificRule: true,
      noOfDependentsToConsider: 1,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee+Dependent',
      benefitType: 'Beneficiary',
      benefitProgram: 'BE_BENEFICIARY_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },

  // ── Lifecycle / admin (BE_02–05, 26–27) — 5 plans — v2 A3 hybrid ──
  {
    schemaVersion: 'v2',
    id: 'BE-CYC-001',
    ttt: 'BE_02',
    nameTh: 'การลงทะเบียนสวัสดิการประจำปี',
    nameEn: 'Annual Benefit Enrollment',
    template: LIFECYCLE,
    category: 'lifecycle',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: [],
    requiredDocsEn: [],
    eligibilityTh: 'รอบประจำปี — เฉพาะ HR',
    eligibilityEn: 'Annual cycle — HR only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-CYCLE-Annual',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Lifecycle',
      benefitProgram: 'BE_LIFECYCLE_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-CYC-002',
    ttt: 'BE_03',
    nameTh: 'จัดการสวัสดิการพนักงานเข้าใหม่',
    nameEn: 'Manage Benefit On-boarding',
    template: LIFECYCLE,
    category: 'lifecycle',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: [],
    requiredDocsEn: [],
    eligibilityTh: 'เฉพาะ HR',
    eligibilityEn: 'HR only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-CYCLE-OnBoard',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Lifecycle',
      benefitProgram: 'BE_LIFECYCLE_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-CYC-003',
    ttt: 'BE_04',
    nameTh: 'จัดการการเปลี่ยนแปลงสวัสดิการ',
    nameEn: 'Manage Benefit Change',
    template: LIFECYCLE,
    category: 'lifecycle',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: [],
    requiredDocsEn: [],
    eligibilityTh: 'เฉพาะ HR',
    eligibilityEn: 'HR only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-CYCLE-Change',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Lifecycle',
      benefitProgram: 'BE_LIFECYCLE_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-CYC-004',
    ttt: 'BE_05',
    nameTh: 'จัดการสวัสดิการพนักงานลาออก',
    nameEn: 'Manage Benefit Off-boarding',
    template: LIFECYCLE,
    category: 'lifecycle',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: [],
    requiredDocsEn: [],
    eligibilityTh: 'เฉพาะ HR',
    eligibilityEn: 'HR only',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-CYCLE-OffBoard',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: null, deductionStartDate: null, retroCalculationMode: 'None' },
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Lifecycle',
      benefitProgram: 'BE_LIFECYCLE_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
  {
    schemaVersion: 'v2',
    id: 'BE-CYC-005',
    ttt: 'BE_27',
    nameTh: 'รอบจ่ายเงินสวัสดิการ',
    nameEn: 'Benefit Payment Cycle',
    template: LIFECYCLE,
    category: 'lifecycle',
    recordType: 'records',
    approvalChain: ADMIN_ONLY_CHAIN,
    annualLimitThb: null,
    requiresDependent: false,
    requiresHospital: false,
    requiresReceipt: false,
    requiredDocsTh: [],
    requiredDocsEn: [],
    eligibilityTh: 'รอบจ่าย 6/16/26 ของเดือน — SAP IT0015/IT0267',
    eligibilityEn: 'Payment cycle on day 6/16/26 — SAP IT0015/IT0267',
    coverage: {
      entitlementAmount: null,
      currency: 'THB',
      claimsLimitPerFrequencyPeriod: null,
      frequency: null,
      exceedEntitlementAmount: false,
      balanceCarryForward: { enabled: false, maxYears: null, capAmount: null },
    },
    eligibility: {
      eligibilityRuleId: 'TH-XXX-BE-CYCLE-Payment',
      enrollmentRequired: false,
      dependentSpecificRule: false,
      noOfDependentsToConsider: null,
      effectiveStartDate: '2024-01-01',
      effectiveEndDate: null,
    },
    claimRules: {
      employeeClaimWorkflowId: null,
      exceptionWorkflowId: null,
      taxationMode: null,
      payrollIntegration: { mode: 'IT0015+IT0267', deductionStartDate: null, retroCalculationMode: 'None' }, // SAP Z-transactions ZBER001/002/003 on segment cut-offs 6/16/26
    },
    coverageType: {
      coverage: 'Employee',
      benefitType: 'Lifecycle',
      benefitProgram: 'BE_LIFECYCLE_PROG',
    },
    notifications: {
      emailNotificationForEnrollment: false,
      showRemaningNoOfDaysForClaim: false,
      showRemaningNoOfDaysForEnrollment: false,
    },
  },
];

/** O(1) lookups. */
const PLAN_BY_ID = new Map(BENEFIT_PLAN_REGISTRY.map((p) => [p.id, p]));

export function getPlan(id: string): BenefitPlan | undefined {
  return PLAN_BY_ID.get(id);
}

export function getPlansByTemplate(template: WorkflowTemplate): BenefitPlan[] {
  return BENEFIT_PLAN_REGISTRY.filter((p) => p.template === template);
}

export function getPlansByCategory(category: PlanCategory): BenefitPlan[] {
  return BENEFIT_PLAN_REGISTRY.filter((p) => p.category === category);
}

export function getEmployeeClaimablePlans(): BenefitPlan[] {
  return BENEFIT_PLAN_REGISTRY.filter((p) => p.recordType === 'claimable');
}

export function getAdminOnlyPlans(): BenefitPlan[] {
  return BENEFIT_PLAN_REGISTRY.filter(
    (p) => p.recordType === 'records' || p.recordType === 'info',
  );
}

export function isV2Plan(plan: BenefitPlan): plan is BenefitPlanV2 {
  return plan.schemaVersion === 'v2';
}
