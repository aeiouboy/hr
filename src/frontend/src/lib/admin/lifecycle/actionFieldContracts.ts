// actionFieldContracts — per-field BRD/SF contract for Manage Employee actions.
// Source research: .omx/goals/autoresearch/manage-employee-action-forms-brd-sf-field-alignm/field-contract.md
// Keep field presence, copy, requiredness, validation, visibility, and submit mapping here instead of per-page ad hoc forms.

import type { EmployeeActionKey } from './actionRequirements'

export type LifecycleFieldRequirement = 'required' | 'optional' | 'conditional'
export type LifecycleFieldVisibility = 'visible' | 'readonly' | 'hidden' | 'system'
export type LifecycleFieldStatus = 'confirmed' | 'ba_open' | 'deferred'
export type LifecycleFieldComponent =
  | 'select'
  | 'reasonPicker'
  | 'positionLookup'
  | 'date'
  | 'text'
  | 'textarea'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'systemNote'

export type LifecycleSubmitMapping =
  | 'EmpJob'
  | 'EmpCompensation'
  | 'EmpEmploymentTermination'
  | 'timelineNotes'
  | 'metadata'
  | 'directPersonalData'
  | 'contractRecord'
  | 'none'

export interface LifecycleActionFieldContract {
  name: string
  labelTh: string
  labelEn?: string
  placeholderTh?: string
  helperTh?: string
  component: LifecycleFieldComponent
  requirement: LifecycleFieldRequirement
  visibility: LifecycleFieldVisibility
  condition?: string
  validation?: string
  defaultValue?: string | boolean | number
  sourceRefs: readonly string[]
  sfMapping?: {
    entity: string
    field: string
    event?: string
    eventReasons?: readonly string[]
  }
  submitMapping: LifecycleSubmitMapping
  status: LifecycleFieldStatus
}

export interface LifecycleActionFieldContractSet {
  actionKey: EmployeeActionKey
  route: string
  sourceRefs: readonly string[]
  fields: Record<string, LifecycleActionFieldContract>
}

const COMMON_SOURCE_REFS = {
  audit: 'projects/hr-platform-replacement/BA-AUDIT-BACTIONS-2026-04-24.md',
  extracted: 'projects/hr-platform-replacement/extracted-context-2026-05-02/02-ba-requirements.md',
  master: 'projects/hr-platform-replacement/ec-admin-portal/ADMIN-WORKFLOW-MASTER.md',
} as const

export const ACTION_FIELD_CONTRACTS = {
  probation: {
    actionKey: 'probation',
    route: 'probation',
    sourceRefs: [`${COMMON_SOURCE_REFS.audit}:293-318`, `${COMMON_SOURCE_REFS.master}:232-244`],
    fields: {
      outcome: {
        name: 'outcome', labelTh: 'ผลการประเมิน', component: 'radio', requirement: 'required', visibility: 'visible',
        sourceRefs: [`${COMMON_SOURCE_REFS.audit}:297`, `${COMMON_SOURCE_REFS.extracted}:146-150`],
        submitMapping: 'EmpJob', status: 'confirmed',
      },
      eventReason: {
        name: 'eventReason', labelTh: 'รหัสเหตุการณ์ระบบ', component: 'systemNote', requirement: 'conditional', visibility: 'hidden',
        condition: 'Derived from outcome: pass=COMPROB_COMPROB, extend=DC_EXTPROB, no_pass=TERM_UNSUCPROB',
        sourceRefs: [`${COMMON_SOURCE_REFS.master}:528`, `${COMMON_SOURCE_REFS.master}:536`, `${COMMON_SOURCE_REFS.master}:560`],
        sfMapping: { entity: 'EmpJob', field: 'eventReason', eventReasons: ['COMPROB_COMPROB', 'DC_EXTPROB', 'TERM_UNSUCPROB'] },
        submitMapping: 'EmpJob', status: 'confirmed',
      },
      effectiveDate: {
        name: 'effectiveDate', labelTh: 'วันที่มีผล', component: 'date', requirement: 'required', visibility: 'visible',
        validation: 'hire_date <= effectiveDate <= hire_date + 119 days', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:298`, `${COMMON_SOURCE_REFS.audit}:309-313`],
        sfMapping: { entity: 'EmpJob', field: 'startDate' }, submitMapping: 'EmpJob', status: 'confirmed',
      },
      extendUntil: {
        name: 'extendUntil', labelTh: 'ขยายถึงวันที่', component: 'date', requirement: 'conditional', visibility: 'visible',
        condition: 'Required when outcome=extend', validation: '> effectiveDate', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:299`, `${COMMON_SOURCE_REFS.audit}:311`],
        submitMapping: 'EmpJob', status: 'confirmed',
      },
      allowanceAmount: {
        name: 'allowanceAmount', labelTh: 'จำนวน Allowance', component: 'number', requirement: 'optional', visibility: 'visible',
        condition: 'Shown when outcome=pass', validation: '>= 0', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:300`, `${COMMON_SOURCE_REFS.audit}:312`],
        submitMapping: 'EmpCompensation', status: 'confirmed',
      },
      confirmDate: {
        name: 'confirmDate', labelTh: 'วันที่ยืนยันโดย HR', component: 'date', requirement: 'optional', visibility: 'visible',
        condition: 'Shown when outcome=pass', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:301`, `${COMMON_SOURCE_REFS.audit}:317`],
        submitMapping: 'EmpJob', status: 'confirmed',
      },
      note: {
        name: 'note', labelTh: 'หมายเหตุ', component: 'textarea', requirement: 'optional', visibility: 'visible',
        sourceRefs: [`${COMMON_SOURCE_REFS.audit}:302`], submitMapping: 'timelineNotes', status: 'confirmed',
      },
    },
  },
  edit: {
    actionKey: 'edit',
    route: 'edit',
    sourceRefs: ['BA EC Field List', 'src/lib/admin/lifecycle/actionRequirements.ts:42-52'],
    fields: {
      localName: { name: 'localName', labelTh: 'ชื่อภาษาไทย/อังกฤษ', component: 'text', requirement: 'required', visibility: 'visible', sourceRefs: ['BA EC Field List'], submitMapping: 'directPersonalData', status: 'confirmed' },
      gender: { name: 'gender', labelTh: 'เพศ', component: 'select', requirement: 'required', visibility: 'visible', sourceRefs: ['BA EC Field List'], submitMapping: 'directPersonalData', status: 'confirmed' },
      nationality: { name: 'nationality', labelTh: 'สัญชาติ', component: 'select', requirement: 'required', visibility: 'visible', sourceRefs: ['BA EC Field List'], submitMapping: 'directPersonalData', status: 'confirmed' },
      contact: { name: 'contact', labelTh: 'ช่องทางติดต่อ', component: 'text', requirement: 'required', visibility: 'visible', sourceRefs: ['BA EC Field List'], submitMapping: 'directPersonalData', status: 'confirmed' },
    },
  },
  transfer: {
    actionKey: 'transfer',
    route: 'transfer',
    sourceRefs: [`${COMMON_SOURCE_REFS.audit}:60-69`, `${COMMON_SOURCE_REFS.extracted}:77-86`, `${COMMON_SOURCE_REFS.master}:97-133`],
    fields: {
      eventReason: {
        name: 'eventReason', labelTh: 'ประเภทการโอนย้าย', labelEn: 'Transfer type', placeholderTh: '— เลือกประเภทการโอนย้าย —',
        helperTh: 'เป็น SF Event Reason สำหรับ EmpJob ไม่ใช่เหตุผลข้อความอิสระ', component: 'reasonPicker', requirement: 'required', visibility: 'visible',
        sourceRefs: [`${COMMON_SOURCE_REFS.audit}:75-83`, `${COMMON_SOURCE_REFS.master}:525-527`],
        sfMapping: { entity: 'EmpJob', field: 'eventReason', event: '5604', eventReasons: ['TRN_ROTATION', 'TRN_TRNACCOMP', 'TRN_TRNWIC'] },
        submitMapping: 'EmpJob', status: 'confirmed',
      },
      targetCompany: {
        name: 'targetCompany', labelTh: 'บริษัทปลายทาง', component: 'select', requirement: 'required', visibility: 'visible',
        sourceRefs: [`${COMMON_SOURCE_REFS.audit}:62`, `${COMMON_SOURCE_REFS.extracted}:81-82`],
        sfMapping: { entity: 'EmpJob / EmpEmployment', field: 'company' }, submitMapping: 'EmpJob', status: 'confirmed',
      },
      targetBusinessUnit: {
        name: 'targetBusinessUnit', labelTh: 'หน่วยงานปลายทาง', component: 'select', requirement: 'required', visibility: 'visible',
        sourceRefs: [`${COMMON_SOURCE_REFS.audit}:63`, `${COMMON_SOURCE_REFS.master}:121-122`],
        sfMapping: { entity: 'EmpJob', field: 'department' }, submitMapping: 'EmpJob', status: 'confirmed',
      },
      targetPosition: {
        name: 'targetPosition', labelTh: 'ตำแหน่งปลายทาง', placeholderTh: 'ค้นด้วยรหัส / ชื่อตำแหน่ง (TH/EN)', component: 'positionLookup', requirement: 'required', visibility: 'visible',
        sourceRefs: [`${COMMON_SOURCE_REFS.audit}:64`, `${COMMON_SOURCE_REFS.master}:120`],
        sfMapping: { entity: 'EmpJob', field: 'position' }, submitMapping: 'EmpJob', status: 'confirmed',
      },
      effectiveDate: {
        name: 'effectiveDate', labelTh: 'วันที่มีผล', component: 'date', requirement: 'required', visibility: 'visible',
        validation: 'effectiveDate >= today', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:65`, `${COMMON_SOURCE_REFS.extracted}:83`],
        sfMapping: { entity: 'EmpJob', field: 'startDate' }, submitMapping: 'EmpJob', status: 'confirmed',
      },
      targetLocation: {
        name: 'targetLocation', labelTh: 'สถานที่ปลายทาง', placeholderTh: 'เช่น สำนักงานใหญ่, สาขาเชียงใหม่', component: 'text', requirement: 'optional', visibility: 'visible',
        sourceRefs: [`${COMMON_SOURCE_REFS.audit}:66`], submitMapping: 'EmpJob', status: 'confirmed',
      },
      costCenter: {
        name: 'costCenter', labelTh: 'Cost Center', placeholderTh: 'เช่น CC-1001', component: 'text', requirement: 'optional', visibility: 'visible',
        sourceRefs: [`${COMMON_SOURCE_REFS.audit}:67`], sfMapping: { entity: 'EmpJob', field: 'costCenter' }, submitMapping: 'EmpJob', status: 'confirmed',
      },
      reason: {
        name: 'reason', labelTh: 'เหตุผลเพิ่มเติม', placeholderTh: 'ระบุเหตุผลประกอบ (ไม่บังคับ)', helperTh: 'เป็นข้อความอิสระตาม BA audit; แยกจาก SF Event Reason', component: 'textarea', requirement: 'optional', visibility: 'visible',
        sourceRefs: [`${COMMON_SOURCE_REFS.audit}:68`], submitMapping: 'timelineNotes', status: 'confirmed',
      },
      migrationNote: {
        name: 'migrationNote', labelTh: 'หมายเหตุระบบ: อายุงานนับต่อเนื่อง', labelEn: 'System note: seniority continuous', component: 'systemNote', requirement: 'optional', visibility: 'system',
        defaultValue: 'Seniority continuous', helperTh: 'ระบบกำหนดอัตโนมัติจาก BRD #110; ไม่ใช่ช่องให้แก้เหตุผลการโอนย้าย',
        sourceRefs: [`${COMMON_SOURCE_REFS.audit}:69`, `${COMMON_SOURCE_REFS.extracted}:86`, `${COMMON_SOURCE_REFS.master}:124-127`],
        submitMapping: 'metadata', status: 'confirmed',
      },
    },
  },
  terminate: {
    actionKey: 'terminate', route: 'terminate',
    sourceRefs: [`${COMMON_SOURCE_REFS.audit}:100-129`, `${COMMON_SOURCE_REFS.master}:139-180`, `${COMMON_SOURCE_REFS.master}:548-564`],
    fields: {
      reasonCode: { name: 'reasonCode', labelTh: 'สาเหตุการสิ้นสุดสภาพ', component: 'reasonPicker', requirement: 'required', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:104`, `${COMMON_SOURCE_REFS.master}:548-564`], sfMapping: { entity: 'EmpEmploymentTermination', field: 'eventReason', event: '5597' }, submitMapping: 'EmpEmploymentTermination', status: 'confirmed' },
      reasonNote: { name: 'reasonNote', labelTh: 'รายละเอียดเพิ่มเติม', component: 'textarea', requirement: 'optional', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:105`], submitMapping: 'timelineNotes', status: 'confirmed' },
      lastDay: { name: 'lastDay', labelTh: 'วันสุดท้ายที่ทำงาน', component: 'date', requirement: 'required', visibility: 'visible', validation: '>= hire_date', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:106`], submitMapping: 'EmpEmploymentTermination', status: 'confirmed' },
      payrollEffectiveDate: { name: 'payrollEffectiveDate', labelTh: 'วันที่มีผล Payroll', component: 'date', requirement: 'required', visibility: 'visible', validation: '>= lastDay', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:107`], submitMapping: 'EmpEmploymentTermination', status: 'confirmed' },
      okToRehire: { name: 'okToRehire', labelTh: 'อนุญาตให้จ้างซ้ำ?', component: 'radio', requirement: 'conditional', visibility: 'visible', condition: 'SPD/HR can override; default by terminate reason is BA-open', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:108`, `${COMMON_SOURCE_REFS.master}:281-292`], submitMapping: 'EmpEmploymentTermination', status: 'ba_open' },
      attachmentNote: { name: 'attachmentNote', labelTh: 'แนบเอกสาร', component: 'text', requirement: 'optional', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:109`], submitMapping: 'metadata', status: 'deferred' },
    },
  },
  contract_renewal: {
    actionKey: 'contract_renewal', route: 'contract-renewal',
    sourceRefs: [`${COMMON_SOURCE_REFS.audit}:154-175`, `${COMMON_SOURCE_REFS.extracted}:101-109`],
    fields: {
      currentEndDate: { name: 'currentEndDate', labelTh: 'วันสิ้นสุดสัญญาปัจจุบัน', component: 'date', requirement: 'optional', visibility: 'readonly', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:158`, `${COMMON_SOURCE_REFS.extracted}:105-109`], submitMapping: 'contractRecord', status: 'confirmed' },
      newEndDate: { name: 'newEndDate', labelTh: 'วันสิ้นสุดสัญญาใหม่', component: 'date', requirement: 'required', visibility: 'visible', validation: '> currentEndDate', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:159`], submitMapping: 'contractRecord', status: 'confirmed' },
      renewalReason: { name: 'renewalReason', labelTh: 'เหตุผลการต่อสัญญา', component: 'textarea', requirement: 'optional', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:160`, `${COMMON_SOURCE_REFS.extracted}:108`], submitMapping: 'timelineNotes', status: 'confirmed' },
      newAllowanceAmount: { name: 'newAllowanceAmount', labelTh: 'ค่าตอบแทนเพิ่มเติม (THB)', component: 'number', requirement: 'optional', visibility: 'visible', validation: '>= 0', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:161`], submitMapping: 'EmpCompensation', status: 'confirmed' },
      newAllowanceNote: { name: 'newAllowanceNote', labelTh: 'หมายเหตุค่าตอบแทน', component: 'textarea', requirement: 'conditional', visibility: 'visible', condition: 'Shown when newAllowanceAmount > 0', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:162`], submitMapping: 'timelineNotes', status: 'confirmed' },
    },
  },
  rehire: {
    actionKey: 'rehire', route: 'rehire',
    sourceRefs: [`${COMMON_SOURCE_REFS.audit}:188-220`, `${COMMON_SOURCE_REFS.master}:296-313`],
    fields: {
      eventReason: { name: 'eventReason', labelTh: 'รหัสเหตุการณ์ระบบ', component: 'systemNote', requirement: 'required', visibility: 'hidden', condition: 'Derived from last termination date vs newHireDate', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:209-218`, `${COMMON_SOURCE_REFS.master}:301-308`], sfMapping: { entity: 'EmpEmployment', field: 'eventReason', event: '5584', eventReasons: ['RE_REHIRE_LT1', 'RE_REHIRE_GE1'] }, submitMapping: 'EmpJob', status: 'confirmed' },
      newHireDate: { name: 'newHireDate', labelTh: 'วันที่กลับมาทำงาน', component: 'date', requirement: 'required', visibility: 'visible', validation: '>= today', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:192`], submitMapping: 'EmpJob', status: 'confirmed' },
      useNewCode: { name: 'useNewCode', labelTh: 'ใช้รหัสพนักงานใหม่?', component: 'radio', requirement: 'required', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:193`, `${COMMON_SOURCE_REFS.audit}:198-204`], submitMapping: 'metadata', status: 'confirmed' },
      newEmployeeCode: { name: 'newEmployeeCode', labelTh: 'รหัสพนักงานใหม่', component: 'text', requirement: 'conditional', visibility: 'visible', condition: 'Required when useNewCode=true', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:194`], submitMapping: 'metadata', status: 'confirmed' },
      seniorityDateOverride: { name: 'seniorityDateOverride', labelTh: 'วันเริ่มอายุงาน (Seniority)', component: 'date', requirement: 'optional', visibility: 'visible', validation: '<= newHireDate', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:195`], submitMapping: 'metadata', status: 'confirmed' },
      reason: { name: 'reason', labelTh: 'เหตุผล', component: 'textarea', requirement: 'optional', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:196`], submitMapping: 'timelineNotes', status: 'confirmed' },
    },
  },
  change_type: {
    actionKey: 'change_type', route: 'change-type',
    sourceRefs: [`${COMMON_SOURCE_REFS.master}:263-270`, `${COMMON_SOURCE_REFS.master}:545`],
    fields: {
      targetEmployeeClass: { name: 'targetEmployeeClass', labelTh: 'ประเภทการจ้างใหม่', component: 'select', requirement: 'required', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.master}:267-270`], sfMapping: { entity: 'EmpJob', field: 'employeeClass' }, submitMapping: 'EmpJob', status: 'confirmed' },
      effectiveDate: { name: 'effectiveDate', labelTh: 'วันที่มีผล', component: 'date', requirement: 'required', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.master}:267-270`], sfMapping: { entity: 'EmpJob', field: 'startDate' }, submitMapping: 'EmpJob', status: 'confirmed' },
      eventReason: { name: 'eventReason', labelTh: 'รหัสเหตุการณ์ระบบ', component: 'systemNote', requirement: 'required', visibility: 'hidden', defaultValue: 'JCHG_EMPTYPE', sourceRefs: [`${COMMON_SOURCE_REFS.master}:267`, `${COMMON_SOURCE_REFS.master}:545`], sfMapping: { entity: 'EmpJob', field: 'eventReason', event: '5594', eventReasons: ['JCHG_EMPTYPE'] }, submitMapping: 'EmpJob', status: 'confirmed' },
      notes: { name: 'notes', labelTh: 'หมายเหตุ', component: 'textarea', requirement: 'optional', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.master}:269-273`], submitMapping: 'timelineNotes', status: 'confirmed' },
      seniorityNote: { name: 'seniorityNote', labelTh: 'หมายเหตุระบบ: อายุงานนับต่อเนื่อง', component: 'systemNote', requirement: 'optional', visibility: 'system', defaultValue: 'Seniority continuous', sourceRefs: [`${COMMON_SOURCE_REFS.master}:269-273`], submitMapping: 'metadata', status: 'confirmed' },
    },
  },
  promotion: {
    actionKey: 'promotion', route: 'promotion',
    sourceRefs: [`${COMMON_SOURCE_REFS.audit}:232-252`, `${COMMON_SOURCE_REFS.master}:258-278`],
    fields: {
      eventReason: { name: 'eventReason', labelTh: 'ประเภทการเปลี่ยนแปลง', component: 'reasonPicker', requirement: 'required', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.master}:263-267`, `${COMMON_SOURCE_REFS.master}:529-545`], sfMapping: { entity: 'EmpJob / EmpCompensation', field: 'eventReason', eventReasons: ['PRM_PRM', 'PRM_DEMO', 'PRCHG_PROMO', 'PRCHG_MERINC', 'PRCHG_ADJPOS', 'PRCHG_SALADJ', 'PRCHG_SALCUT'] }, submitMapping: 'EmpJob', status: 'confirmed' },
      selectedPosition: { name: 'selectedPosition', labelTh: 'เลื่อนไปเป็น', component: 'positionLookup', requirement: 'conditional', visibility: 'visible', condition: 'Required for promotion/demotion/position adjustment', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:236-238`], sfMapping: { entity: 'EmpJob', field: 'position' }, submitMapping: 'EmpJob', status: 'confirmed' },
      effectiveDate: { name: 'effectiveDate', labelTh: 'วันที่มีผล', component: 'date', requirement: 'required', visibility: 'visible', validation: '>= hire_date', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:238`], sfMapping: { entity: 'EmpJob', field: 'startDate' }, submitMapping: 'EmpJob', status: 'confirmed' },
      salaryChangePct: { name: 'salaryChangePct', labelTh: 'ปรับขึ้น (%)', component: 'number', requirement: 'optional', visibility: 'visible', validation: '0-50 currently BA-open', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:239`, `${COMMON_SOURCE_REFS.extracted}:246`], submitMapping: 'EmpCompensation', status: 'ba_open' },
      notes: { name: 'notes', labelTh: 'หมายเหตุ', component: 'textarea', requirement: 'optional', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:240`], submitMapping: 'timelineNotes', status: 'confirmed' },
    },
  },
  acting: {
    actionKey: 'acting', route: 'acting',
    sourceRefs: [`${COMMON_SOURCE_REFS.audit}:263-281`, `${COMMON_SOURCE_REFS.master}:361-366`],
    fields: {
      eventReason: { name: 'eventReason', labelTh: 'รหัสเหตุการณ์ระบบ', component: 'systemNote', requirement: 'required', visibility: 'hidden', defaultValue: 'POSCHG_POSCHG', sourceRefs: [`${COMMON_SOURCE_REFS.master}:531`], sfMapping: { entity: 'EmpJob', field: 'eventReason', event: '5589', eventReasons: ['POSCHG_POSCHG'] }, submitMapping: 'EmpJob', status: 'confirmed' },
      actingPosition: { name: 'actingPosition', labelTh: 'ตำแหน่งที่รักษาการ', component: 'text', requirement: 'required', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:267`, `${COMMON_SOURCE_REFS.extracted}:247`], submitMapping: 'EmpJob', status: 'ba_open' },
      effectiveDate: { name: 'effectiveDate', labelTh: 'วันเริ่มรักษาการ', component: 'date', requirement: 'required', visibility: 'visible', validation: '>= hire_date', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:268`], submitMapping: 'EmpJob', status: 'confirmed' },
      endDate: { name: 'endDate', labelTh: 'วันที่สิ้นสุด', component: 'date', requirement: 'optional', visibility: 'visible', validation: '>= effectiveDate', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:269`], submitMapping: 'EmpJob', status: 'confirmed' },
      isPrimary: { name: 'isPrimary', labelTh: 'กำหนดเป็นตำแหน่งหลัก', component: 'checkbox', requirement: 'optional', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:270`, `${COMMON_SOURCE_REFS.master}:363-366`], submitMapping: 'EmpJob', status: 'confirmed' },
      notes: { name: 'notes', labelTh: 'หมายเหตุ', component: 'textarea', requirement: 'optional', visibility: 'visible', sourceRefs: [`${COMMON_SOURCE_REFS.audit}:271`], submitMapping: 'timelineNotes', status: 'confirmed' },
    },
  },
} as const satisfies Record<EmployeeActionKey, LifecycleActionFieldContractSet>

export type LifecycleActionFieldContractMap = typeof ACTION_FIELD_CONTRACTS
export type LifecycleActionFieldName<K extends EmployeeActionKey> = keyof LifecycleActionFieldContractMap[K]['fields']

export function getLifecycleActionFieldContract<K extends EmployeeActionKey>(key: K): LifecycleActionFieldContractMap[K] {
  return ACTION_FIELD_CONTRACTS[key]
}

export function getLifecycleActionField<K extends EmployeeActionKey>(
  key: K,
  fieldName: LifecycleActionFieldName<K>,
): LifecycleActionFieldContract {
  const contract = ACTION_FIELD_CONTRACTS[key] as LifecycleActionFieldContractSet
  const field = contract.fields[String(fieldName)]
  if (!field) {
    throw new Error(`Unknown lifecycle field contract: ${key}.${String(fieldName)}`)
  }
  return field
}
