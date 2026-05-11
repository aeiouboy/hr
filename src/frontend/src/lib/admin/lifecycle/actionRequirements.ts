// actionRequirements — canonical BRD/SF contract for Manage Employee actions.
// Source: stark/projects/hr-platform-replacement/ec-admin-portal/ADMIN-WORKFLOW-MASTER.md
// Keep action cards, action forms, and tests aligned through this registry.

import type { ActionKey } from '@/lib/admin/actionAvailability'

export type EmployeeActionKey = ActionKey

type ApprovalStage = 'employee' | 'manager' | 'hrbp' | 'hr_admin' | 'spd' | 'system'

export interface EmployeeActionRequirement {
  key: EmployeeActionKey
  route: string
  labelTh: string
  descriptionTh: string
  brdRefs: string[]
  sfEvent?: string
  sfEventReasons: readonly string[]
  sfEntity: string
  approvalChain: readonly ApprovalStage[]
  requiredFields: readonly string[]
  notes: readonly string[]
  implemented: boolean
}

export const MANAGE_EMPLOYEE_ACTIONS: readonly EmployeeActionRequirement[] = [
  {
    key: 'probation',
    route: 'probation',
    labelTh: 'ประเมินทดลองงาน',
    descriptionTh: 'Pass / Extend / No Pass พร้อมวันที่ยืนยันแยกจากวันที่ประเมิน',
    brdRefs: ['BRD #117'],
    sfEvent: '5591',
    sfEventReasons: ['COMPROB_COMPROB', 'DC_EXTPROB', 'TERM_UNSUCPROB'],
    sfEntity: 'EmpJob + Probation workflow',
    approvalChain: ['manager', 'hr_admin'],
    requiredFields: ['effectiveDate', 'confirmDate', 'outcome'],
    notes: ['Pass probation date ≠ Confirm date', 'Auto-pass day 119 / mail 30-75-90 remains backend-owned'],
    implemented: true,
  },
  {
    key: 'edit',
    route: 'edit',
    labelTh: 'แก้ไขข้อมูลส่วนตัว',
    descriptionTh: 'Direct edit สำหรับ PerPersonal / contact fields ที่ไม่ใช่ state-change',
    brdRefs: ['BRD #12', 'BA EC Field List'],
    sfEntity: 'PerPersonal / PerPhone / PerEmail / PerAddressDEFLT',
    sfEventReasons: [],
    approvalChain: [],
    requiredFields: ['localName', 'gender', 'nationality', 'contact'],
    notes: ['ไม่ใช้ lifecycle event reason เพราะเป็น direct personal-data edit'],
    implemented: true,
  },
  {
    key: 'transfer',
    route: 'transfer',
    labelTh: 'โอนย้าย',
    descriptionTh: 'Transfer within/across company หรือ rotation โดยรหัสพนักงานคงเดิม',
    brdRefs: ['BRD #110'],
    sfEvent: '5604',
    sfEventReasons: ['TRN_ROTATION', 'TRN_TRNACCOMP', 'TRN_TRNWIC'],
    sfEntity: 'EmpJob',
    approvalChain: ['manager', 'hrbp', 'hr_admin'],
    requiredFields: ['effectiveDate', 'eventReason', 'targetCompany', 'targetBusinessUnit', 'targetPosition'],
    notes: ['Position selection should cascade org/job defaults from Position Master'],
    implemented: true,
  },
  {
    key: 'terminate',
    route: 'terminate',
    labelTh: 'สิ้นสุดสภาพพนักงาน',
    descriptionTh: 'Termination workflow พร้อม 17 SF TERM_* reasons และ OK to Rehire โดย SPD',
    brdRefs: ['BRD #111', 'BRD #112', 'BRD #113', 'BRD #114'],
    sfEvent: '5597',
    sfEventReasons: [
      'TERM_RETIRE', 'TERM_DISMISS', 'TERM_DM', 'TERM_ENDASSIGN', 'TERM_EOC',
      'TERM_ERLRETIRE', 'TERM_LAYOFF', 'TERM_NOSHOW', 'TERM_PASSAWAY', 'TERM_RESIGN',
      'TERM_REORG', 'TERM_TRANS', 'TERM_UNSUCPROB', 'TERM_COVID', 'TERM_CRISIS',
      'TERM_ABSENT', 'TERM_REDUNDANCY',
    ],
    sfEntity: 'EmpEmploymentTermination',
    approvalChain: ['employee', 'manager', 'hrbp', 'spd'],
    requiredFields: ['lastDay', 'reasonCode', 'payrollEffectiveDate'],
    notes: ['Role-based reason visibility and document generation are requirement deltas'],
    implemented: true,
  },
  {
    key: 'contract_renewal',
    route: 'contract-renewal',
    labelTh: 'ต่อสัญญา',
    descriptionTh: 'ต่ออายุสัญญาและกัน auto-terminate ก่อนครบกำหนด',
    brdRefs: ['BRD #93', 'BRD #115'],
    sfEvent: '5597',
    sfEventReasons: ['TERM_EOC'],
    sfEntity: 'EmpEmployment / contract end date',
    approvalChain: ['manager', 'hrbp', 'hr_admin'],
    requiredFields: ['effectiveDate', 'currentEndDate', 'newEndDate'],
    notes: ['Dedicated contract-renewal reason picklist not confirmed by BA; free-text reason remains acceptable until confirmed'],
    implemented: true,
  },
  {
    key: 'rehire',
    route: 'rehire',
    labelTh: 'จ้างซ้ำ',
    descriptionTh: 'Rehire โดย classify < 1 ปี / ≥ 1 ปี และกฎรหัสพนักงาน CRC/CPN',
    brdRefs: ['BRD #102'],
    sfEvent: '5584',
    sfEventReasons: ['RE_REHIRE_LT1', 'RE_REHIRE_GE1'],
    sfEntity: 'EmpEmployment + EmpJob',
    approvalChain: ['hrbp', 'hr_admin'],
    requiredFields: ['newHireDate', 'eventReason', 'originalStartDate', 'employeeCodeDecision'],
    notes: ['CRC defaults to new employee code; CPN defaults to same code'],
    implemented: true,
  },
  {
    key: 'change_type',
    route: 'change-type',
    labelTh: 'เปลี่ยนประเภทการจ้าง',
    descriptionTh: 'เปลี่ยน Permanent / Part-time ด้วย JCHG_EMPTYPE และนับอายุงานต่อเนื่อง',
    brdRefs: ['BRD #103'],
    sfEvent: '5594',
    sfEventReasons: ['JCHG_EMPTYPE'],
    sfEntity: 'EmpJob',
    approvalChain: ['hrbp', 'hr_admin'],
    requiredFields: ['effectiveDate', 'targetEmployeeClass', 'eventReason'],
    notes: ['PT↔FT should preserve seniority / continuous service'],
    implemented: true,
  },
  {
    key: 'promotion',
    route: 'promotion',
    labelTh: 'เลื่อนตำแหน่ง / ปรับเงินเดือน',
    descriptionTh: 'Promotion/Demotion ใช้ 5607; Pay-rate change ใช้ 5587 PRCHG_*',
    brdRefs: ['BRD #95', 'BRD #103'],
    sfEvent: '5607 / 5587',
    sfEventReasons: ['PRM_PRM', 'PRM_DEMO', 'PRCHG_PROMO', 'PRCHG_MERINC', 'PRCHG_ADJPOS', 'PRCHG_SALADJ', 'PRCHG_SALCUT'],
    sfEntity: 'EmpJob + EmpCompensation',
    approvalChain: ['spd'],
    requiredFields: ['effectiveDate', 'eventReason', 'toCorporateTitle or salaryChangePct'],
    notes: ['Corporate title and job title are separate SF axes'],
    implemented: true,
  },
  {
    key: 'acting',
    route: 'acting',
    labelTh: 'มอบหมายรักษาการ',
    descriptionTh: 'Acting Position แบบ concurrent employment พร้อม primary indicator',
    brdRefs: ['BRD #104', 'BRD #137'],
    sfEvent: '5589',
    sfEventReasons: ['POSCHG_POSCHG'],
    sfEntity: 'EmpJob concurrent position',
    approvalChain: ['hrbp', 'hr_admin'],
    requiredFields: ['effectiveDate', 'eventReason', 'actingPosition'],
    notes: ['Acting position can be more than one; primary marker is required for main assignment'],
    implemented: true,
  },
] as const

export const employeeActionRequirements = Object.fromEntries(
  MANAGE_EMPLOYEE_ACTIONS.map((req) => [req.key, req]),
) as Record<EmployeeActionKey, EmployeeActionRequirement>

export function getEmployeeActionRequirement(key: EmployeeActionKey): EmployeeActionRequirement {
  return employeeActionRequirements[key]
}
