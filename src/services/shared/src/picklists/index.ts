// GENERATED — do not edit manually; run generate.ts
// Generated at: 2026-04-23T08:14:25.759Z
// Source: picklists/data/ (10 picklists)
// Extended (D2 S1 — 37 BA fields): +COUNTRY_ISO +ID_CARD_TYPE +COMPANY +SALUTATION_EN +MILITARY_STATUS
export { PICKLIST_COUNTRY_ISO } from './country-iso'
export type { CountryISOId } from './country-iso'
export { PICKLIST_ID_CARD_TYPE } from './id-card-type'
export type { IdCardTypeId } from './id-card-type'
export { PICKLIST_COMPANY } from './company'
export type { CompanyId } from './company'
export { PICKLIST_SALUTATION_EN } from './salutation-en'
export type { SalutationEnId } from './salutation-en'
export { PICKLIST_MILITARY_STATUS } from './military-status'
export type { MilitaryStatusId } from './military-status'
export { PICKLIST_YES_NO } from './yes-no'
export type { YesNoId } from './yes-no'

/** A single picklist entry with Thai and English labels. */
export interface PicklistItem {
  id: string
  labelTh: string
  labelEn: string
  sortOrder: number
  active: boolean
}

export const PICKLIST_BLOOD_TYPE: readonly PicklistItem[] = [
  {
    "id": "A_POS",
    "labelTh": "A+",
    "labelEn": "A+",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "A_NEG",
    "labelTh": "A-",
    "labelEn": "A-",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "B_POS",
    "labelTh": "B+",
    "labelEn": "B+",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "B_NEG",
    "labelTh": "B-",
    "labelEn": "B-",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "AB_POS",
    "labelTh": "AB+",
    "labelEn": "AB+",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "AB_NEG",
    "labelTh": "AB-",
    "labelEn": "AB-",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "O_POS",
    "labelTh": "O+",
    "labelEn": "O+",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "O_NEG",
    "labelTh": "O-",
    "labelEn": "O-",
    "sortOrder": 8,
    "active": true
  }
] as const

export const PICKLIST_CURRENCY: readonly PicklistItem[] = [
  {
    "id": "THB",
    "labelTh": "บาทไทย (THB)",
    "labelEn": "Thai Baht (THB)",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "USD",
    "labelTh": "ดอลลาร์สหรัฐ (USD)",
    "labelEn": "US Dollar (USD)",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "EUR",
    "labelTh": "ยูโร (EUR)",
    "labelEn": "Euro (EUR)",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "SGD",
    "labelTh": "ดอลลาร์สิงคโปร์ (SGD)",
    "labelEn": "Singapore Dollar (SGD)",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "MYR",
    "labelTh": "ริงกิตมาเลเซีย (MYR)",
    "labelEn": "Malaysian Ringgit (MYR)",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "HKD",
    "labelTh": "ดอลลาร์ฮ่องกง (HKD)",
    "labelEn": "Hong Kong Dollar (HKD)",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "JPY",
    "labelTh": "เยนญี่ปุ่น (JPY)",
    "labelEn": "Japanese Yen (JPY)",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "GBP",
    "labelTh": "ปอนด์อังกฤษ (GBP)",
    "labelEn": "British Pound (GBP)",
    "sortOrder": 8,
    "active": true
  }
] as const

export const PICKLIST_EMPLOYEE_CLASS: readonly PicklistItem[] = [
  {
    "id": "A",
    "labelTh": "A — พนักงานประจำ (Permanent)",
    "labelEn": "A — Permanent",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "B",
    "labelTh": "B — ส่งออกต่างประเทศ (Expat Outbound)",
    "labelEn": "B — Expat Outbound",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "C",
    "labelTh": "C — รับเข้าจากต่างประเทศ (Expat Inbound)",
    "labelEn": "C — Expat Inbound",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "D",
    "labelTh": "D — เกษียณอายุ (Retirement)",
    "labelEn": "D — Retirement",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "E",
    "labelTh": "E — พนักงานชั่วคราว (Temporary)",
    "labelEn": "E — Temporary",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "F",
    "labelTh": "F — DVT",
    "labelEn": "F — DVT",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "G",
    "labelTh": "G — นักศึกษาฝึกงาน (Internship)",
    "labelEn": "G — Internship",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "H",
    "labelTh": "H — พนักงานสัญญาจ้าง (Contingent)",
    "labelEn": "H — Contingent",
    "sortOrder": 8,
    "active": true
  }
] as const

export const PICKLIST_EVENT_REASON_HIRE: readonly PicklistItem[] = [
  {
    "id": "H_NEWHIRE",
    "labelTh": "พนักงานใหม่",
    "labelEn": "New Hire",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "H_RPLMENT",
    "labelTh": "แทนที่พนักงานเดิม",
    "labelEn": "Replacement",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "H_TEMPASG",
    "labelTh": "มอบหมายชั่วคราว",
    "labelEn": "Temporary Assignment",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "HIREDM",
    "labelTh": "ย้ายข้อมูล (Data Migration)",
    "labelEn": "HIRE - Data Migration",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "H_CORENTRY",
    "labelTh": "แก้ไขรายการ Hire (Corrected Entry)",
    "labelEn": "HIRE Corrected Entry",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "H_INENTRY",
    "labelTh": "Hire รายการผิดพลาด (Incorrect Entry)",
    "labelEn": "HIRE Incorrect Entry",
    "sortOrder": 6,
    "active": true
  }
] as const

export const PICKLIST_EVENT_REASON_TERM: readonly PicklistItem[] = [
  {
    "id": "TERM_RESIGN",
    "labelTh": "ลาออก",
    "labelEn": "Resignation",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "TERM_EOC",
    "labelTh": "สิ้นสุดสัญญาจ้าง",
    "labelEn": "End of Contract",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "TERM_RETIRE",
    "labelTh": "เกษียณอายุ",
    "labelEn": "Retirement",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "TERM_ERLRETIRE",
    "labelTh": "เกษียณก่อนกำหนด",
    "labelEn": "Early Retirement",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "TERM_DISMISS",
    "labelTh": "ไล่ออก",
    "labelEn": "Dismissal",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "TERM_LAYOFF",
    "labelTh": "ปลดออก (Layoff)",
    "labelEn": "Layoff",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "TERM_REORG",
    "labelTh": "ปรับโครงสร้างองค์กร",
    "labelEn": "Reorganization",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "TERM_REDUNDANCY",
    "labelTh": "ลดจำนวนพนักงาน",
    "labelEn": "Redundancy",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "TERM_ENDASSIGN",
    "labelTh": "สิ้นสุดการมอบหมายชั่วคราว",
    "labelEn": "End of Temporary Assignment",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "TERM_UNSUCPROB",
    "labelTh": "ไม่ผ่านทดลองงาน",
    "labelEn": "Unsuccessful Probation",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "TERM_PASSAWAY",
    "labelTh": "เสียชีวิต",
    "labelEn": "Passed Away",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "TERM_NOSHOW",
    "labelTh": "ไม่มาปฏิบัติงาน",
    "labelEn": "No Show",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "TERM_TRANS",
    "labelTh": "โอนย้ายออก",
    "labelEn": "Transfer Out",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "TERM_DM",
    "labelTh": "ย้ายข้อมูล (Data Migration)",
    "labelEn": "Termination (DM)",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "TERM_COVID",
    "labelTh": "สถานการณ์ COVID-19",
    "labelEn": "COVID-19 Situation",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "TERM_CRISIS",
    "labelTh": "ภาวะวิกฤต",
    "labelEn": "Crisis Management",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "TERM_ABSENT",
    "labelTh": "ขาดงาน",
    "labelEn": "Absent",
    "sortOrder": 17,
    "active": true
  }
] as const

export const PICKLIST_EVENT_REASON_TRANS: readonly PicklistItem[] = [
  {
    "id": "TRN_TRNWIC",
    "labelTh": "โอนย้ายภายในบริษัท",
    "labelEn": "Transfer within Company",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "TRN_TRNACCOMP",
    "labelTh": "โอนย้ายข้ามบริษัท",
    "labelEn": "Transfer across Company",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "TRN_ROTATION",
    "labelTh": "หมุนเวียนสายงาน",
    "labelEn": "Rotation",
    "sortOrder": 3,
    "active": true
  }
] as const

export const PICKLIST_GENDER: readonly PicklistItem[] = [
  {
    "id": "M",
    "labelTh": "ชาย",
    "labelEn": "Male",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "F",
    "labelTh": "หญิง",
    "labelEn": "Female",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "X",
    "labelTh": "ไม่ระบุ / อื่นๆ",
    "labelEn": "Unspecified / Other",
    "sortOrder": 3,
    "active": true
  }
] as const

export const PICKLIST_MARITAL_STATUS: readonly PicklistItem[] = [
  {
    "id": "SINGLE",
    "labelTh": "โสด",
    "labelEn": "Single",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "MARRIED",
    "labelTh": "สมรส",
    "labelEn": "Married",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "DIVORCED",
    "labelTh": "หย่าร้าง",
    "labelEn": "Divorced",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "WIDOWED",
    "labelTh": "คู่สมรสเสียชีวิต",
    "labelEn": "Widowed",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "SEPARATED",
    "labelTh": "แยกกันอยู่",
    "labelEn": "Separated",
    "sortOrder": 5,
    "active": true
  }
] as const

export const PICKLIST_NATIONALITY: readonly PicklistItem[] = [
  {
    "id": "TH",
    "labelTh": "ไทย",
    "labelEn": "Thai",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "MM",
    "labelTh": "เมียนมาร์",
    "labelEn": "Myanmar",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "KH",
    "labelTh": "กัมพูชา",
    "labelEn": "Cambodian",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "LA",
    "labelTh": "ลาว",
    "labelEn": "Laotian",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "VN",
    "labelTh": "เวียดนาม",
    "labelEn": "Vietnamese",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "PH",
    "labelTh": "ฟิลิปปินส์",
    "labelEn": "Filipino",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "ID",
    "labelTh": "อินโดนีเซีย",
    "labelEn": "Indonesian",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "MY",
    "labelTh": "มาเลเซีย",
    "labelEn": "Malaysian",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "SG",
    "labelTh": "สิงคโปร์",
    "labelEn": "Singaporean",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "IN",
    "labelTh": "อินเดีย",
    "labelEn": "Indian",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "CN",
    "labelTh": "จีน",
    "labelEn": "Chinese",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "JP",
    "labelTh": "ญี่ปุ่น",
    "labelEn": "Japanese",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "KR",
    "labelTh": "เกาหลี",
    "labelEn": "Korean",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "US",
    "labelTh": "อเมริกัน",
    "labelEn": "American",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "GB",
    "labelTh": "อังกฤษ",
    "labelEn": "British",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "AU",
    "labelTh": "ออสเตรเลีย",
    "labelEn": "Australian",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "DE",
    "labelTh": "เยอรมัน",
    "labelEn": "German",
    "sortOrder": 17,
    "active": true
  },
  {
    "id": "FR",
    "labelTh": "ฝรั่งเศส",
    "labelEn": "French",
    "sortOrder": 18,
    "active": true
  },
  {
    "id": "NL",
    "labelTh": "เนเธอร์แลนด์",
    "labelEn": "Dutch",
    "sortOrder": 19,
    "active": true
  },
  {
    "id": "OTHER",
    "labelTh": "อื่นๆ",
    "labelEn": "Other",
    "sortOrder": 99,
    "active": true
  }
] as const

export const PICKLIST_RELIGION: readonly PicklistItem[] = [
  {
    "id": "BUDDHIST",
    "labelTh": "พุทธ",
    "labelEn": "Buddhist",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "MUSLIM",
    "labelTh": "อิสลาม",
    "labelEn": "Muslim",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "CHRISTIAN",
    "labelTh": "คริสต์",
    "labelEn": "Christian",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "CATHOLIC",
    "labelTh": "คาทอลิก",
    "labelEn": "Catholic",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "HINDU",
    "labelTh": "ฮินดู",
    "labelEn": "Hindu",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "SIKH",
    "labelTh": "ซิกห์",
    "labelEn": "Sikh",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "JUDAISM",
    "labelTh": "ยูดาย",
    "labelEn": "Judaism",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "CONFUCIANISM",
    "labelTh": "ขงจื๊อ",
    "labelEn": "Confucianism",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "NONE",
    "labelTh": "ไม่มีศาสนา",
    "labelEn": "None",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "OTHER",
    "labelTh": "อื่นๆ",
    "labelEn": "Other",
    "sortOrder": 99,
    "active": true
  }
] as const

export type BloodTypeId = "A_POS" | "A_NEG" | "B_POS" | "B_NEG" | "AB_POS" | "AB_NEG" | "O_POS" | "O_NEG"
export type CurrencyId = "THB" | "USD" | "EUR" | "SGD" | "MYR" | "HKD" | "JPY" | "GBP"
export type EmployeeClassId = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H"
export type EventReasonHireId = "H_NEWHIRE" | "H_RPLMENT" | "H_TEMPASG" | "HIREDM" | "H_CORENTRY" | "H_INENTRY"
export type EventReasonTermId = "TERM_RESIGN" | "TERM_EOC" | "TERM_RETIRE" | "TERM_ERLRETIRE" | "TERM_DISMISS" | "TERM_LAYOFF" | "TERM_REORG" | "TERM_REDUNDANCY" | "TERM_ENDASSIGN" | "TERM_UNSUCPROB" | "TERM_PASSAWAY" | "TERM_NOSHOW" | "TERM_TRANS" | "TERM_DM" | "TERM_COVID" | "TERM_CRISIS" | "TERM_ABSENT"
export type EventReasonTransId = "TRN_TRNWIC" | "TRN_TRNACCOMP" | "TRN_ROTATION"
export type GenderId = "M" | "F" | "X"
export type MaritalStatusId = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED" | "SEPARATED"
export type NationalityId = "TH" | "MM" | "KH" | "LA" | "VN" | "PH" | "ID" | "MY" | "SG" | "IN" | "CN" | "JP" | "KR" | "US" | "GB" | "AU" | "DE" | "FR" | "NL" | "OTHER"
export type ReligionId = "BUDDHIST" | "MUSLIM" | "CHRISTIAN" | "CATHOLIC" | "HINDU" | "SIKH" | "JUDAISM" | "CONFUCIANISM" | "NONE" | "OTHER"
