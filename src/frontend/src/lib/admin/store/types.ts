// types.ts — TypeScript types สำหรับ raw JSON จาก SAP SuccessFactors OData

// FOCompany raw shape — จาก FOCompany.json
export interface FOCompanyRaw {
  externalCode: string
  country: string | null
  name_localized: string | null
  name_th_TH: string | null
  name: string | null
  status: string | null
  description_th_TH?: string | null
  cust_descriptionLocal?: string | null
  [key: string]: unknown
}

// FOEventReason raw shape — จาก FOEventReason.json
export interface FOEventReasonRaw {
  externalCode: string
  event: string | null          // filter เฉพาะ '5609' สำหรับ HIRE
  name: string | null
  emplStatus: string | null     // '5574' = Active, '5581' = Terminated
  internalCode: string | null
  objectId: string | null
  status: string | null
  [key: string]: unknown
}

// FOBusinessUnit raw shape — จาก FOBusinessUnit.json
export interface FOBusinessUnitRaw {
  externalCode: string
  name_localized: string | null
  name_th_TH: string | null
  name: string | null
  status: string | null
  [key: string]: unknown
}
