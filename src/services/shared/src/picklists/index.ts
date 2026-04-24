// GENERATED — do not edit manually; run generate.ts
// Generated at: 2026-04-24T06:31:54.415Z
// Source: picklists/data/ (33 picklists) + 6 standalone re-exports
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

export const PICKLIST_BUSINESS_GROUP: readonly PicklistItem[] = [
  {
    "id": "CHR",
    "labelTh": "CHR",
    "labelEn": "CHR",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "999",
    "labelTh": "MIGRATION BUSINESS GROUP",
    "labelEn": "MIGRATION BUSINESS GROUP",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "CRG",
    "labelTh": "CRG",
    "labelEn": "CRG",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "CFG",
    "labelTh": "CFG",
    "labelEn": "CFG",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "CHG",
    "labelTh": "CHG",
    "labelEn": "CHG",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "CDG",
    "labelTh": "CDG",
    "labelEn": "CDG",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "PWB",
    "labelTh": "PWB",
    "labelEn": "PWB",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "CPN",
    "labelTh": "CPN",
    "labelEn": "CPN",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "CMG",
    "labelTh": "CMG",
    "labelEn": "CMG",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "COL",
    "labelTh": "COL",
    "labelEn": "COL",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "CU",
    "labelTh": "CU",
    "labelEn": "CU",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "Retail Food",
    "labelTh": "Retail Food",
    "labelEn": "Retail Food",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "Central Retail Corporation",
    "labelTh": "Central Retail Corporation",
    "labelEn": "Central Retail Corporation",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "CGV",
    "labelTh": "CGV",
    "labelEn": "CGV",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "CGVN",
    "labelTh": "CG Vietnam",
    "labelEn": "CG Vietnam",
    "sortOrder": 15,
    "active": true
  }
] as const

export const PICKLIST_BUSINESS_UNIT: readonly PicklistItem[] = [
  {
    "id": "10000000",
    "labelTh": "CDS",
    "labelEn": "CDS",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "10000001",
    "labelTh": "RBS",
    "labelEn": "RBS",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "10000002",
    "labelTh": "SSP",
    "labelEn": "SSP",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "10000003",
    "labelTh": "CFR",
    "labelEn": "CFR",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "10000004",
    "labelTh": "CFM",
    "labelEn": "CFM",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "10000005",
    "labelTh": "CHG",
    "labelEn": "CHG",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "10000006",
    "labelTh": "PWB",
    "labelEn": "PWB",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "10000007",
    "labelTh": "B2S",
    "labelEn": "B2S",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "10000008",
    "labelTh": "OFM",
    "labelEn": "OFM",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "10000009",
    "labelTh": "CPN",
    "labelEn": "CPN",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "10000010",
    "labelTh": "CMG",
    "labelEn": "CMG",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "10000011",
    "labelTh": "CRG",
    "labelEn": "CRG",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "10000012",
    "labelTh": "CHR",
    "labelEn": "CHR",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "10000014",
    "labelTh": "SCM",
    "labelEn": "SCM",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "10000015",
    "labelTh": "Retail Food Corporate",
    "labelEn": "Retail Food Corporate",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "10000017",
    "labelTh": "FAST",
    "labelEn": "FAST",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "10000018",
    "labelTh": "CG HR",
    "labelEn": "CG HR",
    "sortOrder": 17,
    "active": true
  },
  {
    "id": "10000019",
    "labelTh": "RIS",
    "labelEn": "RIS",
    "sortOrder": 18,
    "active": true
  },
  {
    "id": "10000020",
    "labelTh": "T1C",
    "labelEn": "T1C",
    "sortOrder": 19,
    "active": true
  },
  {
    "id": "10000021",
    "labelTh": "Audit",
    "labelEn": "Audit",
    "sortOrder": 20,
    "active": true
  },
  {
    "id": "10000023",
    "labelTh": "CGO",
    "labelEn": "CGO",
    "sortOrder": 21,
    "active": true
  },
  {
    "id": "10000024",
    "labelTh": "CNG",
    "labelEn": "CNG",
    "sortOrder": 22,
    "active": true
  },
  {
    "id": "99999999",
    "labelTh": "999",
    "labelEn": "999",
    "sortOrder": 23,
    "active": true
  },
  {
    "id": "10000026",
    "labelTh": "CGV",
    "labelEn": "CGV",
    "sortOrder": 24,
    "active": true
  },
  {
    "id": "99999CMG",
    "labelTh": "99999CMG",
    "labelEn": "99999CMG",
    "sortOrder": 25,
    "active": true
  },
  {
    "id": "99999CPN",
    "labelTh": "99999CPN",
    "labelEn": "99999CPN",
    "sortOrder": 26,
    "active": true
  },
  {
    "id": "10000022",
    "labelTh": "BD",
    "labelEn": "BD",
    "sortOrder": 27,
    "active": true
  },
  {
    "id": "10000013",
    "labelTh": "CU",
    "labelEn": "CU",
    "sortOrder": 28,
    "active": true
  },
  {
    "id": "10000016",
    "labelTh": "CRC",
    "labelEn": "CRC",
    "sortOrder": 29,
    "active": true
  },
  {
    "id": "10000042",
    "labelTh": "CPT",
    "labelEn": "CPT",
    "sortOrder": 30,
    "active": true
  },
  {
    "id": "10000027",
    "labelTh": "CFW",
    "labelEn": "CFW",
    "sortOrder": 31,
    "active": true
  },
  {
    "id": "10000044",
    "labelTh": "Supermarket",
    "labelEn": "Supermarket",
    "sortOrder": 32,
    "active": true
  },
  {
    "id": "10000045",
    "labelTh": "Home & Entertainment",
    "labelEn": "Home & Entertainment",
    "sortOrder": 33,
    "active": true
  },
  {
    "id": "10000046",
    "labelTh": "Property",
    "labelEn": "Property",
    "sortOrder": 34,
    "active": true
  },
  {
    "id": "10000047",
    "labelTh": "CRC Sport & Lifestyle",
    "labelEn": "CRC Sport & Lifestyle",
    "sortOrder": 35,
    "active": true
  },
  {
    "id": "10000048",
    "labelTh": "Nguyen Kim",
    "labelEn": "Nguyen Kim",
    "sortOrder": 36,
    "active": true
  },
  {
    "id": "10000049",
    "labelTh": "Group HO",
    "labelEn": "Group HO",
    "sortOrder": 37,
    "active": true
  },
  {
    "id": "10000043",
    "labelTh": "Hypermarket",
    "labelEn": "Hypermarket",
    "sortOrder": 38,
    "active": true
  },
  {
    "id": "10000057",
    "labelTh": "Supermarket",
    "labelEn": "Supermarket",
    "sortOrder": 39,
    "active": true
  },
  {
    "id": "10000056",
    "labelTh": "Supermarket",
    "labelEn": "Supermarket",
    "sortOrder": 40,
    "active": true
  },
  {
    "id": "10000075",
    "labelTh": "CDG",
    "labelEn": "CDG",
    "sortOrder": 41,
    "active": true
  },
  {
    "id": "10000076",
    "labelTh": "CEH",
    "labelEn": "CEH",
    "sortOrder": 42,
    "active": true
  },
  {
    "id": "10000077",
    "labelTh": "MJT",
    "labelEn": "MJT",
    "sortOrder": 43,
    "active": true
  },
  {
    "id": "10000078",
    "labelTh": "SWL",
    "labelEn": "SWL",
    "sortOrder": 44,
    "active": true
  }
] as const

export const PICKLIST_BUSINESS_UNIT_EXT: readonly PicklistItem[] = [
  {
    "id": "CDS",
    "labelTh": "01-CDS",
    "labelEn": "01-CDS",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "RBS",
    "labelTh": "02-RBS",
    "labelEn": "02-RBS",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "SSP",
    "labelTh": "03-SSP",
    "labelEn": "03-SSP",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "SCM",
    "labelTh": "04-SCM",
    "labelEn": "04-SCM",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "CFR",
    "labelTh": "05-CFR",
    "labelEn": "05-CFR",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "CFM",
    "labelTh": "06-CFM",
    "labelEn": "06-CFM",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "OFM",
    "labelTh": "07-OFM",
    "labelEn": "07-OFM",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "B2S",
    "labelTh": "08-B2S",
    "labelEn": "08-B2S",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "CHG",
    "labelTh": "09-CHG",
    "labelEn": "09-CHG",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "PWB",
    "labelTh": "10-PWB",
    "labelEn": "10-PWB",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "CPN",
    "labelTh": "11-CPN",
    "labelEn": "11-CPN",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "CMG",
    "labelTh": "12-CMG",
    "labelEn": "12-CMG",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "CRG",
    "labelTh": "13-CRG",
    "labelEn": "13-CRG",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "CHR",
    "labelTh": "14-CHR",
    "labelEn": "14-CHR",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "SU",
    "labelTh": "15-SU",
    "labelEn": "15-SU",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "ALL",
    "labelTh": "* Public",
    "labelEn": "* Public",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "CG",
    "labelTh": "* CG",
    "labelEn": "* CG",
    "sortOrder": 17,
    "active": true
  }
] as const

export const PICKLIST_CHANGE_REASON: readonly PicklistItem[] = [
  {
    "id": "4",
    "labelTh": "Update Key Position",
    "labelEn": "Update Key Position",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "5",
    "labelTh": "Rename",
    "labelEn": "Rename",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "2",
    "labelTh": "Restructure",
    "labelEn": "Restructure",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "6",
    "labelTh": "Modify",
    "labelEn": "Modify",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "3",
    "labelTh": "Disestablishment",
    "labelEn": "Disestablishment",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "1",
    "labelTh": "New Position",
    "labelEn": "New Position",
    "sortOrder": 6,
    "active": true
  }
] as const

export const PICKLIST_COMPANY_ALL: readonly PicklistItem[] = [
  {
    "id": "C001",
    "labelTh": "CDS",
    "labelEn": "CDS",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "C002",
    "labelTh": "RBS",
    "labelEn": "RBS",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "C003",
    "labelTh": "SSP",
    "labelEn": "SSP",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "C004",
    "labelTh": "CFR",
    "labelEn": "CFR",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "C005",
    "labelTh": "CRG",
    "labelEn": "CRG",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "C006",
    "labelTh": "B2S",
    "labelEn": "B2S",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "C008",
    "labelTh": "OFM",
    "labelEn": "OFM",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "C010",
    "labelTh": "PWB",
    "labelEn": "PWB",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "C011",
    "labelTh": "CHG",
    "labelEn": "CHG",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "C012",
    "labelTh": "TWT",
    "labelEn": "TWT",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "C013",
    "labelTh": "HCD",
    "labelEn": "HCD",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "C014",
    "labelTh": "CIS",
    "labelEn": "CIS",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "C015",
    "labelTh": "RIS",
    "labelEn": "RIS",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "C031",
    "labelTh": "CEH",
    "labelEn": "CEH",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "C032",
    "labelTh": "MJT",
    "labelEn": "MJT",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "C033",
    "labelTh": "RBSCR",
    "labelEn": "RBSCR",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "C034",
    "labelTh": "RBSRR",
    "labelEn": "RBSRR",
    "sortOrder": 17,
    "active": true
  },
  {
    "id": "C035",
    "labelTh": "RBSUD",
    "labelEn": "RBSUD",
    "sortOrder": 18,
    "active": true
  },
  {
    "id": "C036",
    "labelTh": "RBSCM",
    "labelEn": "RBSCM",
    "sortOrder": 19,
    "active": true
  },
  {
    "id": "C037",
    "labelTh": "RBSHY",
    "labelEn": "RBSHY",
    "sortOrder": 20,
    "active": true
  },
  {
    "id": "C038",
    "labelTh": "RBSNS",
    "labelEn": "RBSNS",
    "sortOrder": 21,
    "active": true
  },
  {
    "id": "C039",
    "labelTh": "RBSPK",
    "labelEn": "RBSPK",
    "sortOrder": 22,
    "active": true
  },
  {
    "id": "C040",
    "labelTh": "CMK",
    "labelEn": "CMK",
    "sortOrder": 23,
    "active": true
  },
  {
    "id": "C041",
    "labelTh": "CGO",
    "labelEn": "CGO",
    "sortOrder": 24,
    "active": true
  },
  {
    "id": "C042",
    "labelTh": "CNG",
    "labelEn": "CNG",
    "sortOrder": 25,
    "active": true
  },
  {
    "id": "C043",
    "labelTh": "MEB",
    "labelEn": "MEB",
    "sortOrder": 26,
    "active": true
  },
  {
    "id": "C044",
    "labelTh": "TPS",
    "labelEn": "TPS",
    "sortOrder": 27,
    "active": true
  },
  {
    "id": "C045",
    "labelTh": "CMI",
    "labelEn": "CMI",
    "sortOrder": 28,
    "active": true
  },
  {
    "id": "C047",
    "labelTh": "HWS",
    "labelEn": "HWS",
    "sortOrder": 29,
    "active": true
  },
  {
    "id": "C048",
    "labelTh": "PRD",
    "labelEn": "PRD",
    "sortOrder": 30,
    "active": true
  },
  {
    "id": "C049",
    "labelTh": "PT2",
    "labelEn": "PT2",
    "sortOrder": 31,
    "active": true
  },
  {
    "id": "C050",
    "labelTh": "PT3",
    "labelEn": "PT3",
    "sortOrder": 32,
    "active": true
  },
  {
    "id": "C051",
    "labelTh": "PT4",
    "labelEn": "PT4",
    "sortOrder": 33,
    "active": true
  },
  {
    "id": "C052",
    "labelTh": "SCC",
    "labelEn": "SCC",
    "sortOrder": 34,
    "active": true
  },
  {
    "id": "C053",
    "labelTh": "TNG",
    "labelEn": "TNG",
    "sortOrder": 35,
    "active": true
  },
  {
    "id": "C054",
    "labelTh": "TSD",
    "labelEn": "TSD",
    "sortOrder": 36,
    "active": true
  },
  {
    "id": "C055",
    "labelTh": "CPD",
    "labelEn": "CPD",
    "sortOrder": 37,
    "active": true
  },
  {
    "id": "C056",
    "labelTh": "CRGI",
    "labelEn": "CRGI",
    "sortOrder": 38,
    "active": true
  },
  {
    "id": "C057",
    "labelTh": "CRGM",
    "labelEn": "CRGM",
    "sortOrder": 39,
    "active": true
  },
  {
    "id": "C058",
    "labelTh": "CMG",
    "labelEn": "CMG",
    "sortOrder": 40,
    "active": true
  },
  {
    "id": "C059",
    "labelTh": "CTC",
    "labelEn": "CTC",
    "sortOrder": 41,
    "active": true
  },
  {
    "id": "C060",
    "labelTh": "CGF",
    "labelEn": "CGF",
    "sortOrder": 42,
    "active": true
  },
  {
    "id": "C061",
    "labelTh": "CTT",
    "labelEn": "CTT",
    "sortOrder": 43,
    "active": true
  },
  {
    "id": "C062",
    "labelTh": "CMD",
    "labelEn": "CMD",
    "sortOrder": 44,
    "active": true
  },
  {
    "id": "C063",
    "labelTh": "KMS",
    "labelEn": "KMS",
    "sortOrder": 45,
    "active": true
  },
  {
    "id": "C064",
    "labelTh": "CMS",
    "labelEn": "CMS",
    "sortOrder": 46,
    "active": true
  },
  {
    "id": "C065",
    "labelTh": "TBS",
    "labelEn": "TBS",
    "sortOrder": 47,
    "active": true
  },
  {
    "id": "C066",
    "labelTh": "CPN",
    "labelEn": "CPN",
    "sortOrder": 48,
    "active": true
  },
  {
    "id": "C067",
    "labelTh": "CCW",
    "labelEn": "CCW",
    "sortOrder": 49,
    "active": true
  },
  {
    "id": "C068",
    "labelTh": "CCM",
    "labelEn": "CCM",
    "sortOrder": 50,
    "active": true
  },
  {
    "id": "C069",
    "labelTh": "CR9",
    "labelEn": "CR9",
    "sortOrder": 51,
    "active": true
  },
  {
    "id": "C070",
    "labelTh": "CKK",
    "labelEn": "CKK",
    "sortOrder": 52,
    "active": true
  },
  {
    "id": "C071",
    "labelTh": "CCB",
    "labelEn": "CCB",
    "sortOrder": 53,
    "active": true
  },
  {
    "id": "C072",
    "labelTh": "CDV",
    "labelEn": "CDV",
    "sortOrder": 54,
    "active": true
  },
  {
    "id": "C073",
    "labelTh": "CR2",
    "labelEn": "CR2",
    "sortOrder": 55,
    "active": true
  },
  {
    "id": "C074",
    "labelTh": "CR3",
    "labelEn": "CR3",
    "sortOrder": 56,
    "active": true
  },
  {
    "id": "C075",
    "labelTh": "CRT",
    "labelEn": "CRT",
    "sortOrder": 57,
    "active": true
  },
  {
    "id": "C076",
    "labelTh": "CFA",
    "labelEn": "CFA",
    "sortOrder": 58,
    "active": true
  },
  {
    "id": "C077",
    "labelTh": "CKR",
    "labelEn": "CKR",
    "sortOrder": 59,
    "active": true
  },
  {
    "id": "C078",
    "labelTh": "CPY",
    "labelEn": "CPY",
    "sortOrder": 60,
    "active": true
  },
  {
    "id": "C079",
    "labelTh": "CRY",
    "labelEn": "CRY",
    "sortOrder": 61,
    "active": true
  },
  {
    "id": "C080",
    "labelTh": "CBN",
    "labelEn": "CBN",
    "sortOrder": 62,
    "active": true
  },
  {
    "id": "C081",
    "labelTh": "CRM",
    "labelEn": "CRM",
    "sortOrder": 63,
    "active": true
  },
  {
    "id": "C082",
    "labelTh": "CGCW",
    "labelEn": "CGCW",
    "sortOrder": 64,
    "active": true
  },
  {
    "id": "C083",
    "labelTh": "CGLB",
    "labelEn": "CGLB",
    "sortOrder": 65,
    "active": true
  },
  {
    "id": "C084",
    "labelTh": "CHBR",
    "labelEn": "CHBR",
    "sortOrder": 66,
    "active": true
  },
  {
    "id": "C085",
    "labelTh": "CKBR",
    "labelEn": "CKBR",
    "sortOrder": 67,
    "active": true
  },
  {
    "id": "C086",
    "labelTh": "CSBR",
    "labelEn": "CSBR",
    "sortOrder": 68,
    "active": true
  },
  {
    "id": "C087",
    "labelTh": "CHY",
    "labelEn": "CHY",
    "sortOrder": 69,
    "active": true
  },
  {
    "id": "C088",
    "labelTh": "CKR",
    "labelEn": "CKR",
    "sortOrder": 70,
    "active": true
  },
  {
    "id": "C089",
    "labelTh": "CKT",
    "labelEn": "CKT",
    "sortOrder": 71,
    "active": true
  },
  {
    "id": "C090",
    "labelTh": "CSV",
    "labelEn": "CSV",
    "sortOrder": 72,
    "active": true
  },
  {
    "id": "C091",
    "labelTh": "CVP",
    "labelEn": "CVP",
    "sortOrder": 73,
    "active": true
  },
  {
    "id": "C092",
    "labelTh": "CLM",
    "labelEn": "CLM",
    "sortOrder": 74,
    "active": true
  },
  {
    "id": "C093",
    "labelTh": "CIM",
    "labelEn": "CIM",
    "sortOrder": 75,
    "active": true
  },
  {
    "id": "C094",
    "labelTh": "COSI",
    "labelEn": "COSI",
    "sortOrder": 76,
    "active": true
  },
  {
    "id": "C095",
    "labelTh": "CHQ",
    "labelEn": "CHQ",
    "sortOrder": 77,
    "active": true
  },
  {
    "id": "C096",
    "labelTh": "HTI",
    "labelEn": "HTI",
    "sortOrder": 78,
    "active": true
  },
  {
    "id": "C102",
    "labelTh": "OML",
    "labelEn": "OML",
    "sortOrder": 79,
    "active": true
  },
  {
    "id": "C103",
    "labelTh": "FTP",
    "labelEn": "FTP",
    "sortOrder": 80,
    "active": true
  },
  {
    "id": "C104",
    "labelTh": "OOF",
    "labelEn": "OOF",
    "sortOrder": 81,
    "active": true
  },
  {
    "id": "C105",
    "labelTh": "T1C",
    "labelEn": "T1C",
    "sortOrder": 82,
    "active": true
  },
  {
    "id": "C106",
    "labelTh": "CPM",
    "labelEn": "CPM",
    "sortOrder": 83,
    "active": true
  },
  {
    "id": "Cxxx",
    "labelTh": "Cxxx",
    "labelEn": "Cxxx",
    "sortOrder": 84,
    "active": true
  },
  {
    "id": "C108",
    "labelTh": "PBL",
    "labelEn": "PBL",
    "sortOrder": 85,
    "active": true
  },
  {
    "id": "C112",
    "labelTh": "CGV",
    "labelEn": "CGV",
    "sortOrder": 86,
    "active": true
  },
  {
    "id": "C046",
    "labelTh": "CRC",
    "labelEn": "CRC",
    "sortOrder": 87,
    "active": true
  },
  {
    "id": "C109",
    "labelTh": "CVL",
    "labelEn": "CVL",
    "sortOrder": 88,
    "active": true
  },
  {
    "id": "C110",
    "labelTh": "CGT",
    "labelEn": "CGT",
    "sortOrder": 89,
    "active": true
  },
  {
    "id": "C111",
    "labelTh": "PHN",
    "labelEn": "PHN",
    "sortOrder": 90,
    "active": true
  },
  {
    "id": "C113",
    "labelTh": "GLD",
    "labelEn": "GLD",
    "sortOrder": 91,
    "active": true
  },
  {
    "id": "C009",
    "labelTh": "ODP",
    "labelEn": "ODP",
    "sortOrder": 92,
    "active": true
  },
  {
    "id": "C115",
    "labelTh": "CTI",
    "labelEn": "CTI",
    "sortOrder": 93,
    "active": true
  },
  {
    "id": "C116",
    "labelTh": "RSM",
    "labelEn": "RSM",
    "sortOrder": 94,
    "active": true
  },
  {
    "id": "C117",
    "labelTh": "RSD",
    "labelEn": "RSD",
    "sortOrder": 95,
    "active": true
  },
  {
    "id": "C118",
    "labelTh": "CPA",
    "labelEn": "CPA",
    "sortOrder": 96,
    "active": true
  },
  {
    "id": "C119",
    "labelTh": "TNW",
    "labelEn": "TNW",
    "sortOrder": 97,
    "active": true
  },
  {
    "id": "C120",
    "labelTh": "CFM",
    "labelEn": "CFM",
    "sortOrder": 98,
    "active": true
  },
  {
    "id": "9999",
    "labelTh": "DUMMY",
    "labelEn": "DUMMY",
    "sortOrder": 99,
    "active": true
  },
  {
    "id": "V001",
    "labelTh": "EBA",
    "labelEn": "EBA",
    "sortOrder": 100,
    "active": true
  },
  {
    "id": "V002",
    "labelTh": "EBT",
    "labelEn": "EBT",
    "sortOrder": 101,
    "active": true
  },
  {
    "id": "V003",
    "labelTh": "ESBHP",
    "labelEn": "ESBHP",
    "sortOrder": 102,
    "active": true
  },
  {
    "id": "V004",
    "labelTh": "GTSD",
    "labelEn": "GTSD",
    "sortOrder": 103,
    "active": true
  },
  {
    "id": "V005",
    "labelTh": "EBGC",
    "labelEn": "EBGC",
    "sortOrder": 104,
    "active": true
  },
  {
    "id": "V006",
    "labelTh": "GTSDD",
    "labelEn": "GTSDD",
    "sortOrder": 105,
    "active": true
  },
  {
    "id": "V007",
    "labelTh": "GTHP",
    "labelEn": "GTHP",
    "sortOrder": 106,
    "active": true
  },
  {
    "id": "V008",
    "labelTh": "VNMT",
    "labelEn": "VNMT",
    "sortOrder": 107,
    "active": true
  },
  {
    "id": "V009",
    "labelTh": "EBHUE",
    "labelEn": "EBHUE",
    "sortOrder": 108,
    "active": true
  },
  {
    "id": "V010",
    "labelTh": "EBV",
    "labelEn": "EBV",
    "sortOrder": 109,
    "active": true
  },
  {
    "id": "V011",
    "labelTh": "EBPT",
    "labelEn": "EBPT",
    "sortOrder": 110,
    "active": true
  },
  {
    "id": "V012",
    "labelTh": "EBVP",
    "labelEn": "EBVP",
    "sortOrder": 111,
    "active": true
  },
  {
    "id": "V013",
    "labelTh": "EBND",
    "labelEn": "EBND",
    "sortOrder": 112,
    "active": true
  },
  {
    "id": "V014",
    "labelTh": "VN",
    "labelEn": "VN",
    "sortOrder": 113,
    "active": true
  },
  {
    "id": "V015",
    "labelTh": "GeTr",
    "labelEn": "GeTr",
    "sortOrder": 114,
    "active": true
  },
  {
    "id": "V016",
    "labelTh": "NG",
    "labelEn": "NG",
    "sortOrder": 115,
    "active": true
  },
  {
    "id": "V017",
    "labelTh": "EBTH",
    "labelEn": "EBTH",
    "sortOrder": 116,
    "active": true
  },
  {
    "id": "V018",
    "labelTh": "EBHD",
    "labelEn": "EBHD",
    "sortOrder": 117,
    "active": true
  },
  {
    "id": "V019",
    "labelTh": "EBCT",
    "labelEn": "EBCT",
    "sortOrder": 118,
    "active": true
  },
  {
    "id": "V020",
    "labelTh": "EBS",
    "labelEn": "EBS",
    "sortOrder": 119,
    "active": true
  },
  {
    "id": "V021",
    "labelTh": "EBBD",
    "labelEn": "EBBD",
    "sortOrder": 120,
    "active": true
  },
  {
    "id": "V022",
    "labelTh": "NP",
    "labelEn": "NP",
    "sortOrder": 121,
    "active": true
  },
  {
    "id": "V023",
    "labelTh": "NPRE",
    "labelEn": "NPRE",
    "sortOrder": 122,
    "active": true
  },
  {
    "id": "V024",
    "labelTh": "EBTP",
    "labelEn": "EBTP",
    "sortOrder": 123,
    "active": true
  },
  {
    "id": "V025",
    "labelTh": "EBMT",
    "labelEn": "EBMT",
    "sortOrder": 124,
    "active": true
  },
  {
    "id": "V026",
    "labelTh": "CDV",
    "labelEn": "CDV",
    "sortOrder": 125,
    "active": true
  },
  {
    "id": "V027",
    "labelTh": "EBNC",
    "labelEn": "EBNC",
    "sortOrder": 126,
    "active": true
  },
  {
    "id": "V028",
    "labelTh": "VNSMT",
    "labelEn": "VNSMT",
    "sortOrder": 127,
    "active": true
  },
  {
    "id": "V029",
    "labelTh": "NKTiG",
    "labelEn": "NKTiG",
    "sortOrder": 128,
    "active": true
  },
  {
    "id": "V030",
    "labelTh": "HC",
    "labelEn": "HC",
    "sortOrder": 129,
    "active": true
  },
  {
    "id": "V031",
    "labelTh": "DDTV",
    "labelEn": "DDTV",
    "sortOrder": 130,
    "active": true
  },
  {
    "id": "V032",
    "labelTh": "VNBL",
    "labelEn": "VNBL",
    "sortOrder": 131,
    "active": true
  },
  {
    "id": "V033",
    "labelTh": "VNTN",
    "labelEn": "VNTN",
    "sortOrder": 132,
    "active": true
  },
  {
    "id": "V034",
    "labelTh": "RECES",
    "labelEn": "RECES",
    "sortOrder": 133,
    "active": true
  },
  {
    "id": "V035",
    "labelTh": "RDVN",
    "labelEn": "RDVN",
    "sortOrder": 134,
    "active": true
  },
  {
    "id": "V036",
    "labelTh": "CRCVN",
    "labelEn": "CRCVN",
    "sortOrder": 135,
    "active": true
  },
  {
    "id": "V037",
    "labelTh": "TTS",
    "labelEn": "TTS",
    "sortOrder": 136,
    "active": true
  },
  {
    "id": "V038",
    "labelTh": "TTSBR",
    "labelEn": "TTSBR",
    "sortOrder": 137,
    "active": true
  },
  {
    "id": "V039",
    "labelTh": "EBH",
    "labelEn": "EBH",
    "sortOrder": 138,
    "active": true
  },
  {
    "id": "V040",
    "labelTh": "NK",
    "labelEn": "NK",
    "sortOrder": 139,
    "active": true
  },
  {
    "id": "V041",
    "labelTh": "CNNK1",
    "labelEn": "CNNK1",
    "sortOrder": 140,
    "active": true
  },
  {
    "id": "V042",
    "labelTh": "CNNK2",
    "labelEn": "CNNK2",
    "sortOrder": 141,
    "active": true
  },
  {
    "id": "V043",
    "labelTh": "NKMT",
    "labelEn": "NKMT",
    "sortOrder": 142,
    "active": true
  },
  {
    "id": "V044",
    "labelTh": "NKBMT",
    "labelEn": "NKBMT",
    "sortOrder": 143,
    "active": true
  },
  {
    "id": "V045",
    "labelTh": "NKLX",
    "labelEn": "NKLX",
    "sortOrder": 144,
    "active": true
  },
  {
    "id": "V046",
    "labelTh": "NKCT",
    "labelEn": "NKCT",
    "sortOrder": 145,
    "active": true
  },
  {
    "id": "V047",
    "labelTh": "NKBD",
    "labelEn": "NKBD",
    "sortOrder": 146,
    "active": true
  },
  {
    "id": "V048",
    "labelTh": "NKNT",
    "labelEn": "NKNT",
    "sortOrder": 147,
    "active": true
  },
  {
    "id": "V049",
    "labelTh": "NKHP",
    "labelEn": "NKHP",
    "sortOrder": 148,
    "active": true
  },
  {
    "id": "V050",
    "labelTh": "10BTT",
    "labelEn": "10BTT",
    "sortOrder": 149,
    "active": true
  },
  {
    "id": "V051",
    "labelTh": "HDNK",
    "labelEn": "HDNK",
    "sortOrder": 150,
    "active": true
  },
  {
    "id": "V052",
    "labelTh": "NKTC",
    "labelEn": "NKTC",
    "sortOrder": 151,
    "active": true
  },
  {
    "id": "V053",
    "labelTh": "KVNK",
    "labelEn": "KVNK",
    "sortOrder": 152,
    "active": true
  },
  {
    "id": "V054",
    "labelTh": "KVHN",
    "labelEn": "KVHN",
    "sortOrder": 153,
    "active": true
  },
  {
    "id": "V055",
    "labelTh": "KVBD",
    "labelEn": "KVBD",
    "sortOrder": 154,
    "active": true
  },
  {
    "id": "V056",
    "labelTh": "KVCT",
    "labelEn": "KVCT",
    "sortOrder": 155,
    "active": true
  },
  {
    "id": "V057",
    "labelTh": "KVST",
    "labelEn": "KVST",
    "sortOrder": 156,
    "active": true
  },
  {
    "id": "V058",
    "labelTh": "NKDN",
    "labelEn": "NKDN",
    "sortOrder": 157,
    "active": true
  },
  {
    "id": "V059",
    "labelTh": "SINCO",
    "labelEn": "SINCO",
    "sortOrder": 158,
    "active": true
  },
  {
    "id": "V060",
    "labelTh": "HMNK",
    "labelEn": "HMNK",
    "sortOrder": 159,
    "active": true
  },
  {
    "id": "V061",
    "labelTh": "NKTG",
    "labelEn": "NKTG",
    "sortOrder": 160,
    "active": true
  },
  {
    "id": "V062",
    "labelTh": "NKSMT",
    "labelEn": "NKSMT",
    "sortOrder": 161,
    "active": true
  },
  {
    "id": "V063",
    "labelTh": "GTF",
    "labelEn": "GTF",
    "sortOrder": 162,
    "active": true
  },
  {
    "id": "V000",
    "labelTh": "EBD",
    "labelEn": "EBD",
    "sortOrder": 163,
    "active": true
  },
  {
    "id": "C159",
    "labelTh": "ATI",
    "labelEn": "ATI",
    "sortOrder": 164,
    "active": true
  }
] as const

export const PICKLIST_CORPORATE_TITLE: readonly PicklistItem[] = [
  {
    "id": "69",
    "labelTh": "Chief Executive Officer",
    "labelEn": "Chief Executive Officer",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "70",
    "labelTh": "Non CG Management_1",
    "labelEn": "Non CG Management_1",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "71",
    "labelTh": "Non CG Management_2",
    "labelEn": "Non CG Management_2",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "90",
    "labelTh": "Unclassified",
    "labelEn": "Unclassified",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "10",
    "labelTh": "Staff",
    "labelEn": "Staff",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "15",
    "labelTh": "Department Manager",
    "labelEn": "Department Manager",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "20",
    "labelTh": "Division Manager",
    "labelEn": "Division Manager",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "25",
    "labelTh": "General Manager",
    "labelEn": "General Manager",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "30",
    "labelTh": "Assistant Vice President",
    "labelEn": "Assistant Vice President",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "35",
    "labelTh": "Vice President",
    "labelEn": "Vice President",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "40",
    "labelTh": "Senior Vice President",
    "labelEn": "Senior Vice President",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "45",
    "labelTh": "Executive Vice President",
    "labelEn": "Executive Vice President",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "50",
    "labelTh": "Senior Executive Vice President",
    "labelEn": "Senior Executive Vice President",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "55",
    "labelTh": "President",
    "labelEn": "President",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "60",
    "labelTh": "Chief Operating Officer",
    "labelEn": "Chief Operating Officer",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "61",
    "labelTh": "Chief Financial Officer",
    "labelEn": "Chief Financial Officer",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "11",
    "labelTh": "NA",
    "labelEn": "NA",
    "sortOrder": 17,
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

export const PICKLIST_DIVISION: readonly PicklistItem[] = [
  {
    "id": "99999999",
    "labelTh": "MIGRATION FUNCTION",
    "labelEn": "MIGRATION FUNCTION",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "20000000",
    "labelTh": "Accounting",
    "labelEn": "Accounting",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "20000002",
    "labelTh": "Administration",
    "labelEn": "Administration",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "20000004",
    "labelTh": "Audit",
    "labelEn": "Audit",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "20000007",
    "labelTh": "Business Strategy",
    "labelEn": "Business Strategy",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "20000009",
    "labelTh": "Call Center",
    "labelEn": "Call Center",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "20000013",
    "labelTh": "Central Embassy",
    "labelEn": "Central Embassy",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "20000014",
    "labelTh": "CEO Office",
    "labelEn": "CEO Office",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "20000015",
    "labelTh": "CFO&IR",
    "labelEn": "CFO&IR",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "20000018",
    "labelTh": "CIS",
    "labelEn": "CIS",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "20000019",
    "labelTh": "CJD",
    "labelEn": "CJD",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "20000020",
    "labelTh": "CJF",
    "labelEn": "CJF",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "20000021",
    "labelTh": "CMC & SDO",
    "labelEn": "CMC & SDO",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "20000023",
    "labelTh": "Corporate Finance",
    "labelEn": "Corporate Finance",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "20000026",
    "labelTh": "Corporate Structure",
    "labelEn": "Corporate Structure",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "20000027",
    "labelTh": "Credit Management",
    "labelEn": "Credit Management",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "20000028",
    "labelTh": "CTO",
    "labelEn": "CTO",
    "sortOrder": 17,
    "active": true
  },
  {
    "id": "20000030",
    "labelTh": "Data Analyst",
    "labelEn": "Data Analyst",
    "sortOrder": 18,
    "active": true
  },
  {
    "id": "20000032",
    "labelTh": "Distributor & Licensee",
    "labelEn": "Distributor & Licensee",
    "sortOrder": 19,
    "active": true
  },
  {
    "id": "20000033",
    "labelTh": "E-Commerce",
    "labelEn": "E-Commerce",
    "sortOrder": 20,
    "active": true
  },
  {
    "id": "20000035",
    "labelTh": "Environment Health & Safety",
    "labelEn": "Environment Health & Safety",
    "sortOrder": 21,
    "active": true
  },
  {
    "id": "20000040",
    "labelTh": "Family Office",
    "labelEn": "Family Office",
    "sortOrder": 22,
    "active": true
  },
  {
    "id": "20000041",
    "labelTh": "FAST",
    "labelEn": "FAST",
    "sortOrder": 23,
    "active": true
  },
  {
    "id": "20000042",
    "labelTh": "Finance",
    "labelEn": "Finance",
    "sortOrder": 24,
    "active": true
  },
  {
    "id": "20000046",
    "labelTh": "Financial Product",
    "labelEn": "Financial Product",
    "sortOrder": 25,
    "active": true
  },
  {
    "id": "20000047",
    "labelTh": "Food & Beverage",
    "labelEn": "Food & Beverage",
    "sortOrder": 26,
    "active": true
  },
  {
    "id": "20000049",
    "labelTh": "Franchise",
    "labelEn": "Franchise",
    "sortOrder": 27,
    "active": true
  },
  {
    "id": "20000051",
    "labelTh": "HCDS's Office",
    "labelEn": "HCDS's Office",
    "sortOrder": 28,
    "active": true
  },
  {
    "id": "20000057",
    "labelTh": "Indonesia Project",
    "labelEn": "Indonesia Project",
    "sortOrder": 29,
    "active": true
  },
  {
    "id": "20000060",
    "labelTh": "Internal Audit",
    "labelEn": "Internal Audit",
    "sortOrder": 30,
    "active": true
  },
  {
    "id": "20000061",
    "labelTh": "International Brands",
    "labelEn": "International Brands",
    "sortOrder": 31,
    "active": true
  },
  {
    "id": "20000063",
    "labelTh": "Inventory Control",
    "labelEn": "Inventory Control",
    "sortOrder": 32,
    "active": true
  },
  {
    "id": "20000064",
    "labelTh": "iProcurement",
    "labelEn": "iProcurement",
    "sortOrder": 33,
    "active": true
  },
  {
    "id": "20000067",
    "labelTh": "Legal",
    "labelEn": "Legal",
    "sortOrder": 34,
    "active": true
  },
  {
    "id": "20000071",
    "labelTh": "Logistics / Depot",
    "labelEn": "Logistics / Depot",
    "sortOrder": 35,
    "active": true
  },
  {
    "id": "20000073",
    "labelTh": "LP",
    "labelEn": "LP",
    "sortOrder": 36,
    "active": true
  },
  {
    "id": "20000074",
    "labelTh": "Merger & Acquisition",
    "labelEn": "Merger & Acquisition",
    "sortOrder": 37,
    "active": true
  },
  {
    "id": "20000075",
    "labelTh": "Maintenance & Engineering",
    "labelEn": "Maintenance & Engineering",
    "sortOrder": 38,
    "active": true
  },
  {
    "id": "20000076",
    "labelTh": "Management Associate",
    "labelEn": "Management Associate",
    "sortOrder": 39,
    "active": true
  },
  {
    "id": "20000078",
    "labelTh": "Marks & Spencer",
    "labelEn": "Marks & Spencer",
    "sortOrder": 40,
    "active": true
  },
  {
    "id": "20000080",
    "labelTh": "Merchandise & Buying",
    "labelEn": "Merchandise & Buying",
    "sortOrder": 41,
    "active": true
  },
  {
    "id": "20000081",
    "labelTh": "MUJI",
    "labelEn": "MUJI",
    "sortOrder": 42,
    "active": true
  },
  {
    "id": "20000083",
    "labelTh": "Nonmerch & Admin",
    "labelEn": "Nonmerch & Admin",
    "sortOrder": 43,
    "active": true
  },
  {
    "id": "20000086",
    "labelTh": "Online/Omni Channel",
    "labelEn": "Online/Omni Channel",
    "sortOrder": 44,
    "active": true
  },
  {
    "id": "20000088",
    "labelTh": "Operations (BOH)",
    "labelEn": "Operations (BOH)",
    "sortOrder": 45,
    "active": true
  },
  {
    "id": "20000089",
    "labelTh": "Own Brand Merchandise",
    "labelEn": "Own Brand Merchandise",
    "sortOrder": 46,
    "active": true
  },
  {
    "id": "20000092",
    "labelTh": "President Office",
    "labelEn": "President Office",
    "sortOrder": 47,
    "active": true
  },
  {
    "id": "20000093",
    "labelTh": "President Office-People with Disability",
    "labelEn": "President Office-People with Disability",
    "sortOrder": 48,
    "active": true
  },
  {
    "id": "20000094",
    "labelTh": "Procurement",
    "labelEn": "Procurement",
    "sortOrder": 49,
    "active": true
  },
  {
    "id": "20000097",
    "labelTh": "Property",
    "labelEn": "Property",
    "sortOrder": 50,
    "active": true
  },
  {
    "id": "20000098",
    "labelTh": "Property Leasing",
    "labelEn": "Property Leasing",
    "sortOrder": 51,
    "active": true
  },
  {
    "id": "20000102",
    "labelTh": "Replenishment & Supply Chain",
    "labelEn": "Replenishment & Supply Chain",
    "sortOrder": 52,
    "active": true
  },
  {
    "id": "20000103",
    "labelTh": "Replenishment Center",
    "labelEn": "Replenishment Center",
    "sortOrder": 53,
    "active": true
  },
  {
    "id": "20000105",
    "labelTh": "Retail Merchandise",
    "labelEn": "Retail Merchandise",
    "sortOrder": 54,
    "active": true
  },
  {
    "id": "20000106",
    "labelTh": "RIS",
    "labelEn": "RIS",
    "sortOrder": 55,
    "active": true
  },
  {
    "id": "20000110",
    "labelTh": "Siwilai",
    "labelEn": "Siwilai",
    "sortOrder": 56,
    "active": true
  },
  {
    "id": "20000112",
    "labelTh": "Store Design",
    "labelEn": "Store Design",
    "sortOrder": 57,
    "active": true
  },
  {
    "id": "20000113",
    "labelTh": "Store Development",
    "labelEn": "Store Development",
    "sortOrder": 58,
    "active": true
  },
  {
    "id": "20000114",
    "labelTh": "Store Finance",
    "labelEn": "Store Finance",
    "sortOrder": 59,
    "active": true
  },
  {
    "id": "20000116",
    "labelTh": "Treasury",
    "labelEn": "Treasury",
    "sortOrder": 60,
    "active": true
  },
  {
    "id": "20000117",
    "labelTh": "Visual Merchandise",
    "labelEn": "Visual Merchandise",
    "sortOrder": 61,
    "active": true
  },
  {
    "id": "20000118",
    "labelTh": "Warehouse",
    "labelEn": "Warehouse",
    "sortOrder": 62,
    "active": true
  },
  {
    "id": "20000122",
    "labelTh": "Strategy",
    "labelEn": "Strategy",
    "sortOrder": 63,
    "active": true
  },
  {
    "id": "20000123",
    "labelTh": "Central Payment",
    "labelEn": "Central Payment",
    "sortOrder": 64,
    "active": true
  },
  {
    "id": "20000125",
    "labelTh": "Customers&Sales Development",
    "labelEn": "Customers&Sales Development",
    "sortOrder": 65,
    "active": true
  },
  {
    "id": "20000126",
    "labelTh": "Brand Trading",
    "labelEn": "Brand Trading",
    "sortOrder": 66,
    "active": true
  },
  {
    "id": "20000127",
    "labelTh": "MIS / Technology",
    "labelEn": "MIS / Technology",
    "sortOrder": 67,
    "active": true
  },
  {
    "id": "20000128",
    "labelTh": "Cycling",
    "labelEn": "Cycling",
    "sortOrder": 68,
    "active": true
  },
  {
    "id": "20000129",
    "labelTh": "Site Location Acquisition",
    "labelEn": "Site Location Acquisition",
    "sortOrder": 69,
    "active": true
  },
  {
    "id": "20000130",
    "labelTh": "Auto1",
    "labelEn": "Auto1",
    "sortOrder": 70,
    "active": true
  },
  {
    "id": "20000133",
    "labelTh": "Account",
    "labelEn": "Account",
    "sortOrder": 71,
    "active": true
  },
  {
    "id": "20000192",
    "labelTh": "Site Acquisition",
    "labelEn": "Site Acquisition",
    "sortOrder": 72,
    "active": true
  },
  {
    "id": "20000193",
    "labelTh": "Marketing & Corporate Office",
    "labelEn": "Marketing & Corporate Office",
    "sortOrder": 73,
    "active": true
  },
  {
    "id": "20000134",
    "labelTh": "CFRO",
    "labelEn": "CFRO",
    "sortOrder": 74,
    "active": true
  },
  {
    "id": "20000135",
    "labelTh": "Commercial",
    "labelEn": "Commercial",
    "sortOrder": 75,
    "active": true
  },
  {
    "id": "20000136",
    "labelTh": "Corporate Strategy Office",
    "labelEn": "Corporate Strategy Office",
    "sortOrder": 76,
    "active": true
  },
  {
    "id": "20000137",
    "labelTh": "Development",
    "labelEn": "Development",
    "sortOrder": 77,
    "active": true
  },
  {
    "id": "20000138",
    "labelTh": "Excellence & Sustainable Development",
    "labelEn": "Excellence & Sustainable Development",
    "sortOrder": 78,
    "active": true
  },
  {
    "id": "20000140",
    "labelTh": "Government Affairs & Land Acquisition - Institutional",
    "labelEn": "Government Affairs & Land Acquisition - Institutional",
    "sortOrder": 79,
    "active": true
  },
  {
    "id": "20000142",
    "labelTh": "International Business Development",
    "labelEn": "International Business Development",
    "sortOrder": 80,
    "active": true
  },
  {
    "id": "20000143",
    "labelTh": "Land Acquisition - Private",
    "labelEn": "Land Acquisition - Private",
    "sortOrder": 81,
    "active": true
  },
  {
    "id": "20000146",
    "labelTh": "Management Office",
    "labelEn": "Management Office",
    "sortOrder": 82,
    "active": true
  },
  {
    "id": "20000148",
    "labelTh": "Project Management Office",
    "labelEn": "Project Management Office",
    "sortOrder": 83,
    "active": true
  },
  {
    "id": "20000150",
    "labelTh": "REIT Management",
    "labelEn": "REIT Management",
    "sortOrder": 84,
    "active": true
  },
  {
    "id": "20000151",
    "labelTh": "Residential Development",
    "labelEn": "Residential Development",
    "sortOrder": 85,
    "active": true
  },
  {
    "id": "20000153",
    "labelTh": "Accounting & Finance",
    "labelEn": "Accounting & Finance",
    "sortOrder": 86,
    "active": true
  },
  {
    "id": "20000154",
    "labelTh": "Beauty",
    "labelEn": "Beauty",
    "sortOrder": 87,
    "active": true
  },
  {
    "id": "20000156",
    "labelTh": "Corporate CMG",
    "labelEn": "Corporate CMG",
    "sortOrder": 89,
    "active": true
  },
  {
    "id": "20000161",
    "labelTh": "Human Resources & General Affairs",
    "labelEn": "Human Resources & General Affairs",
    "sortOrder": 93,
    "active": true
  },
  {
    "id": "20000162",
    "labelTh": "Import Fashion & Footwear",
    "labelEn": "Import Fashion & Footwear",
    "sortOrder": 94,
    "active": true
  },
  {
    "id": "20000163",
    "labelTh": "Licensed & Own Brands",
    "labelEn": "Licensed & Own Brands",
    "sortOrder": 95,
    "active": true
  },
  {
    "id": "20000164",
    "labelTh": "Omnichannel & E-Commerce",
    "labelEn": "Omnichannel & E-Commerce",
    "sortOrder": 96,
    "active": true
  },
  {
    "id": "20000169",
    "labelTh": "Finance & Accounting",
    "labelEn": "Finance & Accounting",
    "sortOrder": 100,
    "active": true
  },
  {
    "id": "20000171",
    "labelTh": "KFC",
    "labelEn": "KFC",
    "sortOrder": 101,
    "active": true
  },
  {
    "id": "20000172",
    "labelTh": "Logistics",
    "labelEn": "Logistics",
    "sortOrder": 102,
    "active": true
  },
  {
    "id": "20000173",
    "labelTh": "Mister Donut",
    "labelEn": "Mister Donut",
    "sortOrder": 103,
    "active": true
  },
  {
    "id": "20000174",
    "labelTh": "New Business Development",
    "labelEn": "New Business Development",
    "sortOrder": 104,
    "active": true
  },
  {
    "id": "20000176",
    "labelTh": "President Office",
    "labelEn": "President Office",
    "sortOrder": 105,
    "active": true
  },
  {
    "id": "20000177",
    "labelTh": "QA",
    "labelEn": "QA",
    "sortOrder": 106,
    "active": true
  },
  {
    "id": "20000178",
    "labelTh": "R & D",
    "labelEn": "R & D",
    "sortOrder": 107,
    "active": true
  },
  {
    "id": "20000180",
    "labelTh": "Admin & General",
    "labelEn": "Admin & General",
    "sortOrder": 108,
    "active": true
  },
  {
    "id": "20000182",
    "labelTh": "Corporate Administrations",
    "labelEn": "Corporate Administrations",
    "sortOrder": 109,
    "active": true
  },
  {
    "id": "20000183",
    "labelTh": "Corporate Finance & Administrations",
    "labelEn": "Corporate Finance & Administrations",
    "sortOrder": 110,
    "active": true
  },
  {
    "id": "20000184",
    "labelTh": "Corporate Human Resources",
    "labelEn": "Corporate Human Resources",
    "sortOrder": 111,
    "active": true
  },
  {
    "id": "20000185",
    "labelTh": "Corporate Marketing",
    "labelEn": "Corporate Marketing",
    "sortOrder": 112,
    "active": true
  },
  {
    "id": "20000186",
    "labelTh": "Corporate Operations",
    "labelEn": "Corporate Operations",
    "sortOrder": 113,
    "active": true
  },
  {
    "id": "20000188",
    "labelTh": "Corporate Procurement",
    "labelEn": "Corporate Procurement",
    "sortOrder": 114,
    "active": true
  },
  {
    "id": "20000189",
    "labelTh": "Corporate Project Management",
    "labelEn": "Corporate Project Management",
    "sortOrder": 115,
    "active": true
  },
  {
    "id": "20000190",
    "labelTh": "Corporate Sales",
    "labelEn": "Corporate Sales",
    "sortOrder": 116,
    "active": true
  },
  {
    "id": "20000191",
    "labelTh": "Executive Office",
    "labelEn": "Executive Office",
    "sortOrder": 117,
    "active": true
  },
  {
    "id": "20000195",
    "labelTh": "Property Management & Development",
    "labelEn": "Property Management & Development",
    "sortOrder": 118,
    "active": true
  },
  {
    "id": "20000012",
    "labelTh": "The 1",
    "labelEn": "The 1",
    "sortOrder": 119,
    "active": true
  },
  {
    "id": "20000197",
    "labelTh": "Fashion",
    "labelEn": "Fashion",
    "sortOrder": 120,
    "active": true
  },
  {
    "id": "20000198",
    "labelTh": "Food",
    "labelEn": "Food",
    "sortOrder": 121,
    "active": true
  },
  {
    "id": "20000199",
    "labelTh": "Group",
    "labelEn": "Group",
    "sortOrder": 122,
    "active": true
  },
  {
    "id": "20000200",
    "labelTh": "Home",
    "labelEn": "Home",
    "sortOrder": 123,
    "active": true
  },
  {
    "id": "20000201",
    "labelTh": "Lan Chi",
    "labelEn": "Lan Chi",
    "sortOrder": 124,
    "active": true
  },
  {
    "id": "20000202",
    "labelTh": "Nguyen Kim",
    "labelEn": "Nguyen Kim",
    "sortOrder": 125,
    "active": true
  },
  {
    "id": "20000209",
    "labelTh": "Non-Store Channel",
    "labelEn": "Non-Store Channel",
    "sortOrder": 126,
    "active": true
  },
  {
    "id": "20000210",
    "labelTh": "Construction & Procurement",
    "labelEn": "Construction & Procurement",
    "sortOrder": 127,
    "active": true
  },
  {
    "id": "20000211",
    "labelTh": "Business Expansion",
    "labelEn": "Business Expansion",
    "sortOrder": 128,
    "active": true
  },
  {
    "id": "20000214",
    "labelTh": "SCC",
    "labelEn": "SCC",
    "sortOrder": 130,
    "active": true
  },
  {
    "id": "20000212",
    "labelTh": "Franchise Business & New Format",
    "labelEn": "Franchise Business & New Format",
    "sortOrder": 131,
    "active": true
  },
  {
    "id": "20000058",
    "labelTh": "Information Advisory Center",
    "labelEn": "Information Advisory Center",
    "sortOrder": 133,
    "active": true
  },
  {
    "id": "20000059",
    "labelTh": "Interior Design & Construction",
    "labelEn": "Interior Design & Construction",
    "sortOrder": 134,
    "active": true
  },
  {
    "id": "20000206",
    "labelTh": "Property Management - Special Region",
    "labelEn": "Property Management - Special Region",
    "sortOrder": 136,
    "active": true
  },
  {
    "id": "20000208",
    "labelTh": "Property Management",
    "labelEn": "Property Management",
    "sortOrder": 137,
    "active": true
  },
  {
    "id": "20000213",
    "labelTh": "Buying & Merchandising",
    "labelEn": "Buying & Merchandising",
    "sortOrder": 138,
    "active": true
  },
  {
    "id": "20000215",
    "labelTh": "Accounting, Procurement and Workplace Management",
    "labelEn": "Accounting, Procurement and Workplace Management",
    "sortOrder": 139,
    "active": true
  },
  {
    "id": "20000216",
    "labelTh": "Property Operation",
    "labelEn": "Property Operation",
    "sortOrder": 140,
    "active": true
  },
  {
    "id": "20000217",
    "labelTh": "Business Planning and Policy",
    "labelEn": "Business Planning and Policy",
    "sortOrder": 141,
    "active": true
  },
  {
    "id": "20000218",
    "labelTh": "Legal & TMIS",
    "labelEn": "Legal & TMIS",
    "sortOrder": 142,
    "active": true
  },
  {
    "id": "20000219",
    "labelTh": "Common Ground",
    "labelEn": "Common Ground",
    "sortOrder": 143,
    "active": true
  },
  {
    "id": "20000220",
    "labelTh": "GLAND",
    "labelEn": "GLAND",
    "sortOrder": 144,
    "active": true
  },
  {
    "id": "20000221",
    "labelTh": "Phenomenon Creation",
    "labelEn": "Phenomenon Creation",
    "sortOrder": 145,
    "active": true
  },
  {
    "id": "20000222",
    "labelTh": "DCEO Office",
    "labelEn": "DCEO Office",
    "sortOrder": 146,
    "active": true
  },
  {
    "id": "20000223",
    "labelTh": "Strategic Development and Analysis",
    "labelEn": "Strategic Development and Analysis",
    "sortOrder": 147,
    "active": true
  },
  {
    "id": "20000225",
    "labelTh": "New Business Channel",
    "labelEn": "New Business Channel",
    "sortOrder": 148,
    "active": true
  },
  {
    "id": "20000226",
    "labelTh": "Supply Chain & Improvement",
    "labelEn": "Supply Chain & Improvement",
    "sortOrder": 150,
    "active": true
  },
  {
    "id": "20000228",
    "labelTh": "Residential Development - Site",
    "labelEn": "Residential Development - Site",
    "sortOrder": 151,
    "active": true
  },
  {
    "id": "20000229",
    "labelTh": "Alternative Assets",
    "labelEn": "Alternative Assets",
    "sortOrder": 152,
    "active": true
  },
  {
    "id": "20000230",
    "labelTh": "Office Property",
    "labelEn": "Office Property",
    "sortOrder": 153,
    "active": true
  },
  {
    "id": "20000231",
    "labelTh": "Hotel Property",
    "labelEn": "Hotel Property",
    "sortOrder": 154,
    "active": true
  },
  {
    "id": "20000233",
    "labelTh": "New Function",
    "labelEn": "New Function",
    "sortOrder": 155,
    "active": true
  },
  {
    "id": "20000232",
    "labelTh": "Business Planning",
    "labelEn": "Business Planning",
    "sortOrder": 156,
    "active": true
  },
  {
    "id": "20000246",
    "labelTh": "Commercialization",
    "labelEn": "Commercialization",
    "sortOrder": 157,
    "active": true
  },
  {
    "id": "20000234",
    "labelTh": "HCDS's Office - Chidlom",
    "labelEn": "HCDS's Office - Chidlom",
    "sortOrder": 158,
    "active": true
  },
  {
    "id": "20000235",
    "labelTh": "HCDS's Office - Silom",
    "labelEn": "HCDS's Office - Silom",
    "sortOrder": 159,
    "active": true
  },
  {
    "id": "20000236",
    "labelTh": "CPD",
    "labelEn": "CPD",
    "sortOrder": 160,
    "active": true
  },
  {
    "id": "20000237",
    "labelTh": "Audit & Risk Management Committee",
    "labelEn": "Audit & Risk Management Committee",
    "sortOrder": 161,
    "active": true
  },
  {
    "id": "20000238",
    "labelTh": "Chief of Staff",
    "labelEn": "Chief of Staff",
    "sortOrder": 162,
    "active": true
  },
  {
    "id": "20000239",
    "labelTh": "Corporate Development",
    "labelEn": "Corporate Development",
    "sortOrder": 163,
    "active": true
  },
  {
    "id": "20000240",
    "labelTh": "CRC President Office",
    "labelEn": "CRC President Office",
    "sortOrder": 164,
    "active": true
  },
  {
    "id": "20000241",
    "labelTh": "Group Strategy & Development",
    "labelEn": "Group Strategy & Development",
    "sortOrder": 165,
    "active": true
  },
  {
    "id": "20000242",
    "labelTh": "Jariya's Office",
    "labelEn": "Jariya's Office",
    "sortOrder": 166,
    "active": true
  },
  {
    "id": "20000243",
    "labelTh": "CG Sports Club - Silom",
    "labelEn": "CG Sports Club - Silom",
    "sortOrder": 167,
    "active": true
  },
  {
    "id": "20000245",
    "labelTh": "Partner Management",
    "labelEn": "Partner Management",
    "sortOrder": 168,
    "active": true
  },
  {
    "id": "20000248",
    "labelTh": "Corporate Business Development",
    "labelEn": "Corporate Business Development",
    "sortOrder": 169,
    "active": true
  },
  {
    "id": "20000006",
    "labelTh": "Business Development",
    "labelEn": "Business Development",
    "sortOrder": 170,
    "active": true
  },
  {
    "id": "20000054",
    "labelTh": "Human Resources",
    "labelEn": "Human Resources",
    "sortOrder": 171,
    "active": true
  },
  {
    "id": "20000065",
    "labelTh": "IT",
    "labelEn": "IT",
    "sortOrder": 172,
    "active": true
  },
  {
    "id": "20000072",
    "labelTh": "Loss Prevention",
    "labelEn": "Loss Prevention",
    "sortOrder": 173,
    "active": true
  },
  {
    "id": "20000077",
    "labelTh": "Marketing",
    "labelEn": "Marketing",
    "sortOrder": 174,
    "active": true
  },
  {
    "id": "20000079",
    "labelTh": "Merchandise",
    "labelEn": "Merchandise",
    "sortOrder": 175,
    "active": true
  },
  {
    "id": "20000084",
    "labelTh": "Online",
    "labelEn": "Online",
    "sortOrder": 176,
    "active": true
  },
  {
    "id": "20000087",
    "labelTh": "Operations",
    "labelEn": "Operations",
    "sortOrder": 177,
    "active": true
  },
  {
    "id": "20000095",
    "labelTh": "Project",
    "labelEn": "Project",
    "sortOrder": 178,
    "active": true
  },
  {
    "id": "20000100",
    "labelTh": "Quality Assurance",
    "labelEn": "Quality Assurance",
    "sortOrder": 179,
    "active": true
  },
  {
    "id": "20000124",
    "labelTh": "Omnichannel",
    "labelEn": "Omnichannel",
    "sortOrder": 180,
    "active": true
  },
  {
    "id": "20000144",
    "labelTh": "Leasing",
    "labelEn": "Leasing",
    "sortOrder": 181,
    "active": true
  },
  {
    "id": "20000244",
    "labelTh": "Asset Leasing",
    "labelEn": "Asset Leasing",
    "sortOrder": 182,
    "active": true
  },
  {
    "id": "20000250",
    "labelTh": "Data Processing & Customer Service Center",
    "labelEn": "Data Processing & Customer Service Center",
    "sortOrder": 183,
    "active": true
  },
  {
    "id": "20000251",
    "labelTh": "v FIX",
    "labelEn": "v FIX",
    "sortOrder": 191,
    "active": true
  },
  {
    "id": "20000252",
    "labelTh": "Store Design & Planogram",
    "labelEn": "Store Design & Planogram",
    "sortOrder": 192,
    "active": true
  },
  {
    "id": "20000253",
    "labelTh": "People Group",
    "labelEn": "People Group",
    "sortOrder": 193,
    "active": true
  },
  {
    "id": "20000254",
    "labelTh": "Strategy & Business Development",
    "labelEn": "Strategy & Business Development",
    "sortOrder": 194,
    "active": true
  },
  {
    "id": "20000255",
    "labelTh": "Finance, Accounting and Risk Management",
    "labelEn": "Finance, Accounting and Risk Management",
    "sortOrder": 195,
    "active": true
  },
  {
    "id": "20000256",
    "labelTh": "New Sales Channels",
    "labelEn": "New Sales Channels",
    "sortOrder": 196,
    "active": true
  },
  {
    "id": "20000257",
    "labelTh": "CG Corporate Finance",
    "labelEn": "CG Corporate Finance",
    "sortOrder": 197,
    "active": true
  },
  {
    "id": "20000259",
    "labelTh": "Technology",
    "labelEn": "Technology",
    "sortOrder": 198,
    "active": true
  },
  {
    "id": "20000260",
    "labelTh": "B2B & Alternative Channels",
    "labelEn": "B2B & Alternative Channels",
    "sortOrder": 199,
    "active": true
  },
  {
    "id": "20000261",
    "labelTh": "Corporate Strategy",
    "labelEn": "Corporate Strategy",
    "sortOrder": 200,
    "active": true
  },
  {
    "id": "20000262",
    "labelTh": "MIS",
    "labelEn": "MIS",
    "sortOrder": 201,
    "active": true
  },
  {
    "id": "20000263",
    "labelTh": "Major Domestics Appliances",
    "labelEn": "Major Domestics Appliances",
    "sortOrder": 202,
    "active": true
  },
  {
    "id": "20000264",
    "labelTh": "Service Center",
    "labelEn": "Service Center",
    "sortOrder": 203,
    "active": true
  },
  {
    "id": "20000265",
    "labelTh": "Pet'N Me",
    "labelEn": "Pet'N Me",
    "sortOrder": 204,
    "active": true
  },
  {
    "id": "20000266",
    "labelTh": "CEO Department Store",
    "labelEn": "CEO Department Store",
    "sortOrder": 205,
    "active": true
  },
  {
    "id": "20000016",
    "labelTh": "CGO",
    "labelEn": "CGO",
    "sortOrder": 206,
    "active": true
  },
  {
    "id": "20000267",
    "labelTh": "Procurement and Service Center",
    "labelEn": "Procurement and Service Center",
    "sortOrder": 207,
    "active": true
  },
  {
    "id": "20000268",
    "labelTh": "goWOW-Operations",
    "labelEn": "goWOW-Operations",
    "sortOrder": 208,
    "active": true
  },
  {
    "id": "20000269",
    "labelTh": "Data and Digital",
    "labelEn": "Data and Digital",
    "sortOrder": 209,
    "active": true
  },
  {
    "id": "20000270",
    "labelTh": "Casio Megabrand",
    "labelEn": "Casio Megabrand",
    "sortOrder": 210,
    "active": true
  },
  {
    "id": "20000271",
    "labelTh": "Facility Management",
    "labelEn": "Facility Management",
    "sortOrder": 211,
    "active": true
  },
  {
    "id": "20000272",
    "labelTh": "VVIP",
    "labelEn": "VVIP",
    "sortOrder": 219,
    "active": true
  },
  {
    "id": "20000273",
    "labelTh": "Commercial Workgroup",
    "labelEn": "Commercial Workgroup",
    "sortOrder": 220,
    "active": true
  },
  {
    "id": "20000274",
    "labelTh": "Community Mall Business",
    "labelEn": "Community Mall Business",
    "sortOrder": 221,
    "active": true
  },
  {
    "id": "20000275",
    "labelTh": "Hotel Business",
    "labelEn": "Hotel Business",
    "sortOrder": 222,
    "active": true
  },
  {
    "id": "20000276",
    "labelTh": "Digital Transformation",
    "labelEn": "Digital Transformation",
    "sortOrder": 223,
    "active": true
  },
  {
    "id": "20000277",
    "labelTh": "Fashion Category",
    "labelEn": "Fashion Category",
    "sortOrder": 224,
    "active": true
  },
  {
    "id": "20000278",
    "labelTh": "Mall Marketing",
    "labelEn": "Mall Marketing",
    "sortOrder": 225,
    "active": true
  },
  {
    "id": "20000334",
    "labelTh": "Customer Services",
    "labelEn": "Customer Services",
    "sortOrder": 226,
    "active": true
  },
  {
    "id": "20000335",
    "labelTh": "Digital Merchandising",
    "labelEn": "Digital Merchandising",
    "sortOrder": 227,
    "active": true
  },
  {
    "id": "20000336",
    "labelTh": "DO-Central",
    "labelEn": "DO-Central",
    "sortOrder": 228,
    "active": true
  },
  {
    "id": "20000337",
    "labelTh": "DO-Hanoi",
    "labelEn": "DO-Hanoi",
    "sortOrder": 229,
    "active": true
  },
  {
    "id": "20000338",
    "labelTh": "DO-HCM",
    "labelEn": "DO-HCM",
    "sortOrder": 230,
    "active": true
  },
  {
    "id": "20000339",
    "labelTh": "DO-North",
    "labelEn": "DO-North",
    "sortOrder": 231,
    "active": true
  },
  {
    "id": "20000340",
    "labelTh": "DO-South",
    "labelEn": "DO-South",
    "sortOrder": 232,
    "active": true
  },
  {
    "id": "20000341",
    "labelTh": "Finance",
    "labelEn": "Finance",
    "sortOrder": 233,
    "active": true
  },
  {
    "id": "20000342",
    "labelTh": "Human Resources",
    "labelEn": "Human Resources",
    "sortOrder": 234,
    "active": true
  },
  {
    "id": "20000343",
    "labelTh": "Hypermarket CEO's Office",
    "labelEn": "Hypermarket CEO's Office",
    "sortOrder": 235,
    "active": true
  },
  {
    "id": "20000344",
    "labelTh": "Logistics",
    "labelEn": "Logistics",
    "sortOrder": 236,
    "active": true
  },
  {
    "id": "20000345",
    "labelTh": "OMNI Channels",
    "labelEn": "OMNI Channels",
    "sortOrder": 237,
    "active": true
  },
  {
    "id": "20000346",
    "labelTh": "Online Marketing",
    "labelEn": "Online Marketing",
    "sortOrder": 238,
    "active": true
  },
  {
    "id": "20000347",
    "labelTh": "Openning",
    "labelEn": "Openning",
    "sortOrder": 239,
    "active": true
  },
  {
    "id": "20000348",
    "labelTh": "Product",
    "labelEn": "Product",
    "sortOrder": 240,
    "active": true
  },
  {
    "id": "20000349",
    "labelTh": "Strategy",
    "labelEn": "Strategy",
    "sortOrder": 241,
    "active": true
  },
  {
    "id": "20000350",
    "labelTh": "Supply Chain Operations",
    "labelEn": "Supply Chain Operations",
    "sortOrder": 242,
    "active": true
  },
  {
    "id": "20000351",
    "labelTh": "Telesales",
    "labelEn": "Telesales",
    "sortOrder": 243,
    "active": true
  },
  {
    "id": "20000352",
    "labelTh": "Marketing & Communication",
    "labelEn": "Marketing & Communication",
    "sortOrder": 244,
    "active": true
  },
  {
    "id": "20000353",
    "labelTh": "Security",
    "labelEn": "Security",
    "sortOrder": 245,
    "active": true
  },
  {
    "id": "20000354",
    "labelTh": "Business Control",
    "labelEn": "Business Control",
    "sortOrder": 246,
    "active": true
  },
  {
    "id": "20000355",
    "labelTh": "Buying Support",
    "labelEn": "Buying Support",
    "sortOrder": 247,
    "active": true
  },
  {
    "id": "20000356",
    "labelTh": "Design",
    "labelEn": "Design",
    "sortOrder": 248,
    "active": true
  },
  {
    "id": "20000357",
    "labelTh": "Digital Marketing",
    "labelEn": "Digital Marketing",
    "sortOrder": 249,
    "active": true
  },
  {
    "id": "20000358",
    "labelTh": "F&B Development",
    "labelEn": "F&B Development",
    "sortOrder": 250,
    "active": true
  },
  {
    "id": "20000359",
    "labelTh": "Finance",
    "labelEn": "Finance",
    "sortOrder": 251,
    "active": true
  },
  {
    "id": "20000360",
    "labelTh": "Finance Control",
    "labelEn": "Finance Control",
    "sortOrder": 252,
    "active": true
  },
  {
    "id": "20000361",
    "labelTh": "go!",
    "labelEn": "go!",
    "sortOrder": 253,
    "active": true
  },
  {
    "id": "20000362",
    "labelTh": "Human Resources",
    "labelEn": "Human Resources",
    "sortOrder": 254,
    "active": true
  },
  {
    "id": "20000363",
    "labelTh": "Marketing",
    "labelEn": "Marketing",
    "sortOrder": 255,
    "active": true
  },
  {
    "id": "20000364",
    "labelTh": "Merchandise",
    "labelEn": "Merchandise",
    "sortOrder": 256,
    "active": true
  },
  {
    "id": "20000365",
    "labelTh": "Operations",
    "labelEn": "Operations",
    "sortOrder": 257,
    "active": true
  },
  {
    "id": "20000366",
    "labelTh": "Project",
    "labelEn": "Project",
    "sortOrder": 258,
    "active": true
  },
  {
    "id": "20000367",
    "labelTh": "Quality Control",
    "labelEn": "Quality Control",
    "sortOrder": 259,
    "active": true
  },
  {
    "id": "20000368",
    "labelTh": "Sales & Services",
    "labelEn": "Sales & Services",
    "sortOrder": 260,
    "active": true
  },
  {
    "id": "20000369",
    "labelTh": "Store Chain",
    "labelEn": "Store Chain",
    "sortOrder": 261,
    "active": true
  },
  {
    "id": "20000370",
    "labelTh": "Strategy & Project",
    "labelEn": "Strategy & Project",
    "sortOrder": 262,
    "active": true
  },
  {
    "id": "20000371",
    "labelTh": "Supermarket CEO's Office",
    "labelEn": "Supermarket CEO's Office",
    "sortOrder": 263,
    "active": true
  },
  {
    "id": "20000372",
    "labelTh": "Supply Chain",
    "labelEn": "Supply Chain",
    "sortOrder": 264,
    "active": true
  },
  {
    "id": "20000373",
    "labelTh": "Tops Operations",
    "labelEn": "Tops Operations",
    "sortOrder": 265,
    "active": true
  },
  {
    "id": "20000374",
    "labelTh": "Trade Marketing",
    "labelEn": "Trade Marketing",
    "sortOrder": 266,
    "active": true
  },
  {
    "id": "20000375",
    "labelTh": "B2B",
    "labelEn": "B2B",
    "sortOrder": 267,
    "active": true
  },
  {
    "id": "20000376",
    "labelTh": "Business Control",
    "labelEn": "Business Control",
    "sortOrder": 268,
    "active": true
  },
  {
    "id": "20000377",
    "labelTh": "Category",
    "labelEn": "Category",
    "sortOrder": 269,
    "active": true
  },
  {
    "id": "20000378",
    "labelTh": "Customer Services",
    "labelEn": "Customer Services",
    "sortOrder": 270,
    "active": true
  },
  {
    "id": "20000379",
    "labelTh": "Expansion",
    "labelEn": "Expansion",
    "sortOrder": 271,
    "active": true
  },
  {
    "id": "20000380",
    "labelTh": "F&B",
    "labelEn": "F&B",
    "sortOrder": 272,
    "active": true
  },
  {
    "id": "20000381",
    "labelTh": "Finance",
    "labelEn": "Finance",
    "sortOrder": 273,
    "active": true
  },
  {
    "id": "20000382",
    "labelTh": "go! WOW",
    "labelEn": "go! WOW",
    "sortOrder": 274,
    "active": true
  },
  {
    "id": "20000383",
    "labelTh": "Graphic Design",
    "labelEn": "Graphic Design",
    "sortOrder": 275,
    "active": true
  },
  {
    "id": "20000384",
    "labelTh": "Home",
    "labelEn": "Home",
    "sortOrder": 276,
    "active": true
  },
  {
    "id": "20000385",
    "labelTh": "Home & Entertainment",
    "labelEn": "Home & Entertainment",
    "sortOrder": 277,
    "active": true
  },
  {
    "id": "20000386",
    "labelTh": "Human Resources",
    "labelEn": "Human Resources",
    "sortOrder": 278,
    "active": true
  },
  {
    "id": "20000387",
    "labelTh": "Import, Export & Warehousing",
    "labelEn": "Import, Export & Warehousing",
    "sortOrder": 279,
    "active": true
  },
  {
    "id": "20000388",
    "labelTh": "Interior Design",
    "labelEn": "Interior Design",
    "sortOrder": 280,
    "active": true
  },
  {
    "id": "20000389",
    "labelTh": "Inventory Check",
    "labelEn": "Inventory Check",
    "sortOrder": 281,
    "active": true
  },
  {
    "id": "20000390",
    "labelTh": "Kubo",
    "labelEn": "Kubo",
    "sortOrder": 282,
    "active": true
  },
  {
    "id": "20000391",
    "labelTh": "Logistics",
    "labelEn": "Logistics",
    "sortOrder": 283,
    "active": true
  },
  {
    "id": "20000392",
    "labelTh": "Look Kool",
    "labelEn": "Look Kool",
    "sortOrder": 284,
    "active": true
  },
  {
    "id": "20000393",
    "labelTh": "Maintenance & MEP",
    "labelEn": "Maintenance & MEP",
    "sortOrder": 285,
    "active": true
  },
  {
    "id": "20000394",
    "labelTh": "Marketing",
    "labelEn": "Marketing",
    "sortOrder": 286,
    "active": true
  },
  {
    "id": "20000395",
    "labelTh": "Marketing & CRM",
    "labelEn": "Marketing & CRM",
    "sortOrder": 287,
    "active": true
  },
  {
    "id": "20000396",
    "labelTh": "Merchandise",
    "labelEn": "Merchandise",
    "sortOrder": 288,
    "active": true
  },
  {
    "id": "20000397",
    "labelTh": "Merchandise & Sourcing",
    "labelEn": "Merchandise & Sourcing",
    "sortOrder": 289,
    "active": true
  },
  {
    "id": "20000398",
    "labelTh": "Merchandise Planning",
    "labelEn": "Merchandise Planning",
    "sortOrder": 290,
    "active": true
  },
  {
    "id": "20000399",
    "labelTh": "Operations",
    "labelEn": "Operations",
    "sortOrder": 291,
    "active": true
  },
  {
    "id": "20000400",
    "labelTh": "Purchasing",
    "labelEn": "Purchasing",
    "sortOrder": 292,
    "active": true
  },
  {
    "id": "20000401",
    "labelTh": "Quality Control",
    "labelEn": "Quality Control",
    "sortOrder": 293,
    "active": true
  },
  {
    "id": "20000402",
    "labelTh": "R&D",
    "labelEn": "R&D",
    "sortOrder": 294,
    "active": true
  },
  {
    "id": "20000403",
    "labelTh": "Replenishment & Delivery Consolidation",
    "labelEn": "Replenishment & Delivery Consolidation",
    "sortOrder": 295,
    "active": true
  },
  {
    "id": "20000404",
    "labelTh": "Retail Establishment",
    "labelEn": "Retail Establishment",
    "sortOrder": 296,
    "active": true
  },
  {
    "id": "20000405",
    "labelTh": "SEO",
    "labelEn": "SEO",
    "sortOrder": 297,
    "active": true
  },
  {
    "id": "20000406",
    "labelTh": "Site Development",
    "labelEn": "Site Development",
    "sortOrder": 298,
    "active": true
  },
  {
    "id": "20000407",
    "labelTh": "Sourcing Strategy",
    "labelEn": "Sourcing Strategy",
    "sortOrder": 299,
    "active": true
  },
  {
    "id": "20000408",
    "labelTh": "Store Design & Brand Development",
    "labelEn": "Store Design & Brand Development",
    "sortOrder": 300,
    "active": true
  },
  {
    "id": "20000409",
    "labelTh": "Visual Merchandise",
    "labelEn": "Visual Merchandise",
    "sortOrder": 301,
    "active": true
  },
  {
    "id": "20000410",
    "labelTh": "B2B",
    "labelEn": "B2B",
    "sortOrder": 302,
    "active": true
  },
  {
    "id": "20000411",
    "labelTh": "Business Control",
    "labelEn": "Business Control",
    "sortOrder": 303,
    "active": true
  },
  {
    "id": "20000412",
    "labelTh": "E-commerce",
    "labelEn": "E-commerce",
    "sortOrder": 304,
    "active": true
  },
  {
    "id": "20000413",
    "labelTh": "Human Resources",
    "labelEn": "Human Resources",
    "sortOrder": 305,
    "active": true
  },
  {
    "id": "20000414",
    "labelTh": "I&D",
    "labelEn": "I&D",
    "sortOrder": 306,
    "active": true
  },
  {
    "id": "20000415",
    "labelTh": "Marketing",
    "labelEn": "Marketing",
    "sortOrder": 307,
    "active": true
  },
  {
    "id": "20000416",
    "labelTh": "Merchandise",
    "labelEn": "Merchandise",
    "sortOrder": 308,
    "active": true
  },
  {
    "id": "20000417",
    "labelTh": "NK's CEO Office",
    "labelEn": "NK's CEO Office",
    "sortOrder": 309,
    "active": true
  },
  {
    "id": "20000418",
    "labelTh": "Store Operations",
    "labelEn": "Store Operations",
    "sortOrder": 310,
    "active": true
  },
  {
    "id": "20000419",
    "labelTh": "Supply Chain",
    "labelEn": "Supply Chain",
    "sortOrder": 311,
    "active": true
  },
  {
    "id": "20000420",
    "labelTh": "Additional Income",
    "labelEn": "Additional Income",
    "sortOrder": 312,
    "active": true
  },
  {
    "id": "20000421",
    "labelTh": "Asset and Admin Management",
    "labelEn": "Asset and Admin Management",
    "sortOrder": 313,
    "active": true
  },
  {
    "id": "20000422",
    "labelTh": "Business Control",
    "labelEn": "Business Control",
    "sortOrder": 314,
    "active": true
  },
  {
    "id": "20000423",
    "labelTh": "Concept & Development",
    "labelEn": "Concept & Development",
    "sortOrder": 315,
    "active": true
  },
  {
    "id": "20000424",
    "labelTh": "Concept Design",
    "labelEn": "Concept Design",
    "sortOrder": 316,
    "active": true
  },
  {
    "id": "20000425",
    "labelTh": "Cost & Contract Management",
    "labelEn": "Cost & Contract Management",
    "sortOrder": 317,
    "active": true
  },
  {
    "id": "20000426",
    "labelTh": "F&B Administration",
    "labelEn": "F&B Administration",
    "sortOrder": 318,
    "active": true
  },
  {
    "id": "20000427",
    "labelTh": "F&B and New Concepts",
    "labelEn": "F&B and New Concepts",
    "sortOrder": 319,
    "active": true
  },
  {
    "id": "20000428",
    "labelTh": "F&B Business Control",
    "labelEn": "F&B Business Control",
    "sortOrder": 320,
    "active": true
  },
  {
    "id": "20000429",
    "labelTh": "F&B HR",
    "labelEn": "F&B HR",
    "sortOrder": 321,
    "active": true
  },
  {
    "id": "20000430",
    "labelTh": "F&B Operations",
    "labelEn": "F&B Operations",
    "sortOrder": 322,
    "active": true
  },
  {
    "id": "20000431",
    "labelTh": "Facility Maintenance",
    "labelEn": "Facility Maintenance",
    "sortOrder": 323,
    "active": true
  },
  {
    "id": "20000432",
    "labelTh": "Human Resources",
    "labelEn": "Human Resources",
    "sortOrder": 324,
    "active": true
  },
  {
    "id": "20000433",
    "labelTh": "Leasing",
    "labelEn": "Leasing",
    "sortOrder": 325,
    "active": true
  },
  {
    "id": "20000434",
    "labelTh": "Leasing & Marketing",
    "labelEn": "Leasing & Marketing",
    "sortOrder": 326,
    "active": true
  },
  {
    "id": "20000435",
    "labelTh": "Leasing Administration",
    "labelEn": "Leasing Administration",
    "sortOrder": 327,
    "active": true
  },
  {
    "id": "20000436",
    "labelTh": "Leasing Key Accounts",
    "labelEn": "Leasing Key Accounts",
    "sortOrder": 328,
    "active": true
  },
  {
    "id": "20000437",
    "labelTh": "Leasing Management System",
    "labelEn": "Leasing Management System",
    "sortOrder": 329,
    "active": true
  },
  {
    "id": "20000438",
    "labelTh": "Mall Operations",
    "labelEn": "Mall Operations",
    "sortOrder": 330,
    "active": true
  },
  {
    "id": "20000439",
    "labelTh": "Market Insight",
    "labelEn": "Market Insight",
    "sortOrder": 331,
    "active": true
  },
  {
    "id": "20000440",
    "labelTh": "Marketing & Communications",
    "labelEn": "Marketing & Communications",
    "sortOrder": 332,
    "active": true
  },
  {
    "id": "20000441",
    "labelTh": "National Training",
    "labelEn": "National Training",
    "sortOrder": 333,
    "active": true
  },
  {
    "id": "20000442",
    "labelTh": "New Projects",
    "labelEn": "New Projects",
    "sortOrder": 334,
    "active": true
  },
  {
    "id": "20000443",
    "labelTh": "Project & Quality Management",
    "labelEn": "Project & Quality Management",
    "sortOrder": 335,
    "active": true
  },
  {
    "id": "20000444",
    "labelTh": "Property - Front Office",
    "labelEn": "Property - Front Office",
    "sortOrder": 336,
    "active": true
  },
  {
    "id": "20000445",
    "labelTh": "Property CEO's office",
    "labelEn": "Property CEO's office",
    "sortOrder": 337,
    "active": true
  },
  {
    "id": "20000446",
    "labelTh": "Retail Delivery",
    "labelEn": "Retail Delivery",
    "sortOrder": 338,
    "active": true
  },
  {
    "id": "20000447",
    "labelTh": "Retail Development",
    "labelEn": "Retail Development",
    "sortOrder": 339,
    "active": true
  },
  {
    "id": "20000448",
    "labelTh": "Shopping Mall Operations",
    "labelEn": "Shopping Mall Operations",
    "sortOrder": 340,
    "active": true
  },
  {
    "id": "20000449",
    "labelTh": "SOP",
    "labelEn": "SOP",
    "sortOrder": 341,
    "active": true
  },
  {
    "id": "20000450",
    "labelTh": "Strategy & Planning",
    "labelEn": "Strategy & Planning",
    "sortOrder": 342,
    "active": true
  },
  {
    "id": "20000451",
    "labelTh": "Administration",
    "labelEn": "Administration",
    "sortOrder": 343,
    "active": true
  },
  {
    "id": "20000452",
    "labelTh": "BD & Corporate Strategy",
    "labelEn": "BD & Corporate Strategy",
    "sortOrder": 344,
    "active": true
  },
  {
    "id": "20000453",
    "labelTh": "Business Control",
    "labelEn": "Business Control",
    "sortOrder": 345,
    "active": true
  },
  {
    "id": "20000454",
    "labelTh": "Columbia",
    "labelEn": "Columbia",
    "sortOrder": 346,
    "active": true
  },
  {
    "id": "20000455",
    "labelTh": "Content",
    "labelEn": "Content",
    "sortOrder": 347,
    "active": true
  },
  {
    "id": "20000456",
    "labelTh": "CRC Sports & Lifestyle CEO's Office",
    "labelEn": "CRC Sports & Lifestyle CEO's Office",
    "sortOrder": 348,
    "active": true
  },
  {
    "id": "20000457",
    "labelTh": "Crocs",
    "labelEn": "Crocs",
    "sortOrder": 349,
    "active": true
  },
  {
    "id": "20000458",
    "labelTh": "Digital Platform",
    "labelEn": "Digital Platform",
    "sortOrder": 350,
    "active": true
  },
  {
    "id": "20000459",
    "labelTh": "Dyson Viet Nam",
    "labelEn": "Dyson Viet Nam",
    "sortOrder": 351,
    "active": true
  },
  {
    "id": "20000460",
    "labelTh": "Ecommerce",
    "labelEn": "Ecommerce",
    "sortOrder": 352,
    "active": true
  },
  {
    "id": "20000461",
    "labelTh": "Fila",
    "labelEn": "Fila",
    "sortOrder": 353,
    "active": true
  },
  {
    "id": "20000462",
    "labelTh": "Human Resources",
    "labelEn": "Human Resources",
    "sortOrder": 354,
    "active": true
  },
  {
    "id": "20000463",
    "labelTh": "International Brands",
    "labelEn": "International Brands",
    "sortOrder": 355,
    "active": true
  },
  {
    "id": "20000464",
    "labelTh": "Logistics OPS",
    "labelEn": "Logistics OPS",
    "sortOrder": 356,
    "active": true
  },
  {
    "id": "20000465",
    "labelTh": "Maintenance",
    "labelEn": "Maintenance",
    "sortOrder": 357,
    "active": true
  },
  {
    "id": "20000466",
    "labelTh": "Marketing",
    "labelEn": "Marketing",
    "sortOrder": 358,
    "active": true
  },
  {
    "id": "20000467",
    "labelTh": "Marketplace",
    "labelEn": "Marketplace",
    "sortOrder": 359,
    "active": true
  },
  {
    "id": "20000468",
    "labelTh": "Merchandise",
    "labelEn": "Merchandise",
    "sortOrder": 360,
    "active": true
  },
  {
    "id": "20000469",
    "labelTh": "Merchandising",
    "labelEn": "Merchandising",
    "sortOrder": 361,
    "active": true
  },
  {
    "id": "20000470",
    "labelTh": "Online-SuperSports",
    "labelEn": "Online-SuperSports",
    "sortOrder": 362,
    "active": true
  },
  {
    "id": "20000471",
    "labelTh": "Operations",
    "labelEn": "Operations",
    "sortOrder": 363,
    "active": true
  },
  {
    "id": "20000472",
    "labelTh": "Outlet & Wholesales",
    "labelEn": "Outlet & Wholesales",
    "sortOrder": 364,
    "active": true
  },
  {
    "id": "20000473",
    "labelTh": "Planning",
    "labelEn": "Planning",
    "sortOrder": 365,
    "active": true
  },
  {
    "id": "20000474",
    "labelTh": "Projects",
    "labelEn": "Projects",
    "sortOrder": 366,
    "active": true
  },
  {
    "id": "20000475",
    "labelTh": "Replenishment",
    "labelEn": "Replenishment",
    "sortOrder": 367,
    "active": true
  },
  {
    "id": "20000476",
    "labelTh": "Sales",
    "labelEn": "Sales",
    "sortOrder": 368,
    "active": true
  },
  {
    "id": "20000477",
    "labelTh": "Service Center",
    "labelEn": "Service Center",
    "sortOrder": 369,
    "active": true
  },
  {
    "id": "20000478",
    "labelTh": "Skechers",
    "labelEn": "Skechers",
    "sortOrder": 370,
    "active": true
  },
  {
    "id": "20000479",
    "labelTh": "Stock Control",
    "labelEn": "Stock Control",
    "sortOrder": 371,
    "active": true
  },
  {
    "id": "20000480",
    "labelTh": "Supersports",
    "labelEn": "Supersports",
    "sortOrder": 372,
    "active": true
  },
  {
    "id": "20000481",
    "labelTh": "Supply Chain Management",
    "labelEn": "Supply Chain Management",
    "sortOrder": 373,
    "active": true
  },
  {
    "id": "20000482",
    "labelTh": "Training",
    "labelEn": "Training",
    "sortOrder": 374,
    "active": true
  },
  {
    "id": "20000483",
    "labelTh": "Under Armour and New Balance",
    "labelEn": "Under Armour and New Balance",
    "sortOrder": 375,
    "active": true
  },
  {
    "id": "20000484",
    "labelTh": "Visual Merchandise",
    "labelEn": "Visual Merchandise",
    "sortOrder": 376,
    "active": true
  },
  {
    "id": "20000485",
    "labelTh": "Application Development",
    "labelEn": "Application Development",
    "sortOrder": 377,
    "active": true
  },
  {
    "id": "20000486",
    "labelTh": "CEO's Office",
    "labelEn": "CEO's Office",
    "sortOrder": 378,
    "active": true
  },
  {
    "id": "20000487",
    "labelTh": "Commercial",
    "labelEn": "Commercial",
    "sortOrder": 379,
    "active": true
  },
  {
    "id": "20000488",
    "labelTh": "Commercial-Business Control",
    "labelEn": "Commercial-Business Control",
    "sortOrder": 380,
    "active": true
  },
  {
    "id": "20000489",
    "labelTh": "Commercial-Direct Import",
    "labelEn": "Commercial-Direct Import",
    "sortOrder": 381,
    "active": true
  },
  {
    "id": "20000490",
    "labelTh": "Commercial-FMCG",
    "labelEn": "Commercial-FMCG",
    "sortOrder": 382,
    "active": true
  },
  {
    "id": "20000491",
    "labelTh": "Commercial-Fresh Food",
    "labelEn": "Commercial-Fresh Food",
    "sortOrder": 383,
    "active": true
  },
  {
    "id": "20000492",
    "labelTh": "Commercial-Non-Food",
    "labelEn": "Commercial-Non-Food",
    "sortOrder": 384,
    "active": true
  },
  {
    "id": "20000493",
    "labelTh": "Commercial-Private Label",
    "labelEn": "Commercial-Private Label",
    "sortOrder": 385,
    "active": true
  },
  {
    "id": "20000494",
    "labelTh": "Commercial-Quality Control",
    "labelEn": "Commercial-Quality Control",
    "sortOrder": 386,
    "active": true
  },
  {
    "id": "20000495",
    "labelTh": "Commercial-Supermarket",
    "labelEn": "Commercial-Supermarket",
    "sortOrder": 387,
    "active": true
  },
  {
    "id": "20000496",
    "labelTh": "Commercial-System & Support",
    "labelEn": "Commercial-System & Support",
    "sortOrder": 388,
    "active": true
  },
  {
    "id": "20000497",
    "labelTh": "Corporate Affairs",
    "labelEn": "Corporate Affairs",
    "sortOrder": 389,
    "active": true
  },
  {
    "id": "20000498",
    "labelTh": "Sales Operations",
    "labelEn": "Sales Operations",
    "sortOrder": 390,
    "active": true
  },
  {
    "id": "20000499",
    "labelTh": "OMNI Channels",
    "labelEn": "OMNI Channels",
    "sortOrder": 391,
    "active": true
  },
  {
    "id": "20000500",
    "labelTh": "Demand Planning & Replenishment",
    "labelEn": "Demand Planning & Replenishment",
    "sortOrder": 392,
    "active": true
  },
  {
    "id": "20000501",
    "labelTh": "F&A Technology and Project",
    "labelEn": "F&A Technology and Project",
    "sortOrder": 393,
    "active": true
  },
  {
    "id": "20000502",
    "labelTh": "FAST",
    "labelEn": "FAST",
    "sortOrder": 394,
    "active": true
  },
  {
    "id": "20000503",
    "labelTh": "Finance",
    "labelEn": "Finance",
    "sortOrder": 395,
    "active": true
  },
  {
    "id": "20000504",
    "labelTh": "Finance-Non-Merchandise Procurement",
    "labelEn": "Finance-Non-Merchandise Procurement",
    "sortOrder": 396,
    "active": true
  },
  {
    "id": "20000505",
    "labelTh": "Finance-Property & Expansion",
    "labelEn": "Finance-Property & Expansion",
    "sortOrder": 397,
    "active": true
  },
  {
    "id": "20000506",
    "labelTh": "Finance-Reporting",
    "labelEn": "Finance-Reporting",
    "sortOrder": 398,
    "active": true
  },
  {
    "id": "20000507",
    "labelTh": "Finance-Treasury & Holdings",
    "labelEn": "Finance-Treasury & Holdings",
    "sortOrder": 399,
    "active": true
  },
  {
    "id": "20000508",
    "labelTh": "Finance-Value Creation",
    "labelEn": "Finance-Value Creation",
    "sortOrder": 400,
    "active": true
  },
  {
    "id": "20000509",
    "labelTh": "Fresh Food",
    "labelEn": "Fresh Food",
    "sortOrder": 401,
    "active": true
  },
  {
    "id": "20000510",
    "labelTh": "Government Relations",
    "labelEn": "Government Relations",
    "sortOrder": 402,
    "active": true
  },
  {
    "id": "20000511",
    "labelTh": "Group HR",
    "labelEn": "Group HR",
    "sortOrder": 403,
    "active": true
  },
  {
    "id": "20000512",
    "labelTh": "BD & MD",
    "labelEn": "BD & MD",
    "sortOrder": 404,
    "active": true
  },
  {
    "id": "20000513",
    "labelTh": "Business Development",
    "labelEn": "Business Development",
    "sortOrder": 405,
    "active": true
  },
  {
    "id": "20000514",
    "labelTh": "Customer Services & Telesales",
    "labelEn": "Customer Services & Telesales",
    "sortOrder": 406,
    "active": true
  },
  {
    "id": "20000515",
    "labelTh": "Expansion",
    "labelEn": "Expansion",
    "sortOrder": 407,
    "active": true
  },
  {
    "id": "20000516",
    "labelTh": "Finance",
    "labelEn": "Finance",
    "sortOrder": 408,
    "active": true
  },
  {
    "id": "20000517",
    "labelTh": "Human Resources",
    "labelEn": "Human Resources",
    "sortOrder": 409,
    "active": true
  },
  {
    "id": "20000518",
    "labelTh": "IFRS Reporting",
    "labelEn": "IFRS Reporting",
    "sortOrder": 410,
    "active": true
  },
  {
    "id": "20000519",
    "labelTh": "Information Technology",
    "labelEn": "Information Technology",
    "sortOrder": 411,
    "active": true
  },
  {
    "id": "20000520",
    "labelTh": "Internal Audit",
    "labelEn": "Internal Audit",
    "sortOrder": 412,
    "active": true
  },
  {
    "id": "20000521",
    "labelTh": "International Corporate Affairs",
    "labelEn": "International Corporate Affairs",
    "sortOrder": 413,
    "active": true
  },
  {
    "id": "20000522",
    "labelTh": "IT Delivery",
    "labelEn": "IT Delivery",
    "sortOrder": 414,
    "active": true
  },
  {
    "id": "20000523",
    "labelTh": "IT Operations",
    "labelEn": "IT Operations",
    "sortOrder": 415,
    "active": true
  },
  {
    "id": "20000524",
    "labelTh": "IT Procurement",
    "labelEn": "IT Procurement",
    "sortOrder": 416,
    "active": true
  },
  {
    "id": "20000525",
    "labelTh": "IT Security",
    "labelEn": "IT Security",
    "sortOrder": 417,
    "active": true
  },
  {
    "id": "20000526",
    "labelTh": "IT-Data",
    "labelEn": "IT-Data",
    "sortOrder": 418,
    "active": true
  },
  {
    "id": "20000527",
    "labelTh": "Land Acquisition & Expansion",
    "labelEn": "Land Acquisition & Expansion",
    "sortOrder": 419,
    "active": true
  },
  {
    "id": "20000528",
    "labelTh": "Land Acquisition & Expansion Strategy",
    "labelEn": "Land Acquisition & Expansion Strategy",
    "sortOrder": 420,
    "active": true
  },
  {
    "id": "20000529",
    "labelTh": "Legal",
    "labelEn": "Legal",
    "sortOrder": 421,
    "active": true
  },
  {
    "id": "20000530",
    "labelTh": "Marketing & Design",
    "labelEn": "Marketing & Design",
    "sortOrder": 422,
    "active": true
  },
  {
    "id": "20000531",
    "labelTh": "Operations",
    "labelEn": "Operations",
    "sortOrder": 423,
    "active": true
  },
  {
    "id": "20000532",
    "labelTh": "Logistics Operations",
    "labelEn": "Logistics Operations",
    "sortOrder": 424,
    "active": true
  },
  {
    "id": "20000533",
    "labelTh": "Operational F&A",
    "labelEn": "Operational F&A",
    "sortOrder": 425,
    "active": true
  },
  {
    "id": "20000534",
    "labelTh": "Operations Audit",
    "labelEn": "Operations Audit",
    "sortOrder": 426,
    "active": true
  },
  {
    "id": "20000535",
    "labelTh": "PR & Communications",
    "labelEn": "PR & Communications",
    "sortOrder": 427,
    "active": true
  },
  {
    "id": "20000536",
    "labelTh": "Recruitment",
    "labelEn": "Recruitment",
    "sortOrder": 428,
    "active": true
  },
  {
    "id": "20000537",
    "labelTh": "Reporting & Productivity",
    "labelEn": "Reporting & Productivity",
    "sortOrder": 429,
    "active": true
  },
  {
    "id": "20000538",
    "labelTh": "Security",
    "labelEn": "Security",
    "sortOrder": 430,
    "active": true
  },
  {
    "id": "20000539",
    "labelTh": "Shared Applications",
    "labelEn": "Shared Applications",
    "sortOrder": 431,
    "active": true
  },
  {
    "id": "20000540",
    "labelTh": "Supply Chain",
    "labelEn": "Supply Chain",
    "sortOrder": 432,
    "active": true
  },
  {
    "id": "20000541",
    "labelTh": "Supply Chain Strategy",
    "labelEn": "Supply Chain Strategy",
    "sortOrder": 433,
    "active": true
  },
  {
    "id": "20000542",
    "labelTh": "Taxation",
    "labelEn": "Taxation",
    "sortOrder": 434,
    "active": true
  },
  {
    "id": "20000333",
    "labelTh": "Business Control",
    "labelEn": "Business Control",
    "sortOrder": 435,
    "active": true
  },
  {
    "id": "20000544",
    "labelTh": "HR",
    "labelEn": "HR",
    "sortOrder": 436,
    "active": true
  },
  {
    "id": "20000545",
    "labelTh": "TEST",
    "labelEn": "TEST",
    "sortOrder": 437,
    "active": true
  }
] as const

export const PICKLIST_DYNAMIC_ROLE: readonly PicklistItem[] = [
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 17,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 18,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 19,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 20,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 21,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 22,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 23,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 24,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 25,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 26,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 27,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 28,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 29,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 30,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 31,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 32,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 33,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 34,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 35,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 36,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 37,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 38,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 39,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 40,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 41,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 42,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 43,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 44,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 45,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 46,
    "active": true
  },
  {
    "id": "SESAdmin",
    "labelTh": "SESAdmin",
    "labelEn": "SESAdmin",
    "sortOrder": 47,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 48,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 49,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 50,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 51,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 52,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 53,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 54,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 55,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 56,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 57,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 58,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 59,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 60,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 61,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 62,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 63,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 64,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 65,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 66,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 67,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 68,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 69,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 70,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 71,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 72,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 73,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 74,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 75,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 76,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 77,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 78,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 79,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 80,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 81,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 82,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 83,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 84,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 85,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 86,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 87,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 88,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 89,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 90,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 91,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 92,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 93,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 94,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 95,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 96,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 97,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 98,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 99,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 100,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 101,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 102,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 103,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 104,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 105,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 106,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 107,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 108,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 109,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 110,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 111,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 112,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 113,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 114,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 115,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 116,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 117,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 118,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 119,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 120,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 121,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 122,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 123,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 124,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 125,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 126,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 127,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 128,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 129,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 130,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 131,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 132,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 133,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 134,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 135,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 136,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 137,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 138,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 139,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 140,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 141,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 142,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 143,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 144,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 145,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 146,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 147,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 148,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 149,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 150,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 151,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 152,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 153,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 154,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 155,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 156,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 157,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 158,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 159,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 160,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 161,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 162,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 163,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 164,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 165,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 166,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 167,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 168,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 169,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 170,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 171,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 172,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 173,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 174,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 175,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 176,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 177,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 178,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 179,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 180,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 181,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 182,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 183,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 184,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 185,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 186,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 187,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 188,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 189,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 190,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 191,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 192,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 193,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 194,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 195,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 196,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 197,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 198,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 199,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 200,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 201,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 202,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 203,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 204,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 205,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 206,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 207,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 208,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 209,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 210,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 211,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 212,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 213,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 214,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 215,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 216,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 217,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 218,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 219,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 220,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 221,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 222,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 223,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 224,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 225,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 226,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 227,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 228,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 229,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 230,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 231,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 232,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 233,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 234,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 235,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 236,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 237,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 238,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 239,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 240,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 241,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 242,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 243,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 244,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 245,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 246,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 247,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 248,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 249,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 250,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 251,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 252,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 253,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 254,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 255,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 256,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 257,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 258,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 259,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 260,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 261,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 262,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 263,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 264,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 265,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 266,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 267,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 268,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 269,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 270,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 271,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 272,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 273,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 274,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 275,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 276,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 277,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 278,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 279,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 280,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 281,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 282,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 283,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 284,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 285,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 286,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 287,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 288,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 289,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 290,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 291,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 292,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 293,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 294,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 295,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 296,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 297,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 298,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 299,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 300,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 301,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 302,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 303,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 304,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 305,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 306,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 307,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 308,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 309,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 310,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 311,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 312,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 313,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 314,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 315,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 316,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 317,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 318,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 319,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 320,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 321,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 322,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 323,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 324,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 325,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 326,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 327,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 328,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 329,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 330,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 331,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 332,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 333,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 334,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 335,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 336,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 337,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 338,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 339,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 340,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 341,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 342,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 343,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 344,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 345,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 346,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 347,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 348,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 349,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 350,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 351,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 352,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 353,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 354,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 355,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 356,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 357,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 358,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 359,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 360,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 361,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 362,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 363,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 364,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 365,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 366,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 367,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 368,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 369,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 370,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 371,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 372,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 373,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 374,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 375,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 376,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 377,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 378,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 379,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 380,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 381,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 382,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 383,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 384,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 385,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 386,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 387,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 388,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 389,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 390,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 391,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 392,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 393,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 394,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 395,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 396,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 397,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 398,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 399,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 400,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 401,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 402,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 403,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 404,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 405,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 406,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 407,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 408,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 409,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 410,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 411,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 412,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 413,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 414,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 415,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 416,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 417,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 418,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 419,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 420,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 421,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 422,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 423,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 424,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 425,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 426,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 427,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 428,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 429,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 430,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 431,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 432,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 433,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 434,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 435,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 436,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 437,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 438,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 439,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 440,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 441,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 442,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 443,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 444,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 445,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 446,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 447,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 448,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 449,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 450,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 451,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 452,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 453,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 454,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 455,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 456,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 457,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 458,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 459,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 460,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 461,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 462,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 463,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 464,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 465,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 466,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 467,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 468,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 469,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 470,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 471,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 472,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 473,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 474,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 475,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 476,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 477,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 478,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 479,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 480,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 481,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 482,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 483,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 484,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 485,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 486,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 487,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 488,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 489,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 490,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 491,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 492,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 493,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 494,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 495,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 496,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 497,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 498,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 499,
    "active": true
  },
  {
    "id": "DataAdmin",
    "labelTh": "DataAdmin",
    "labelEn": "DataAdmin",
    "sortOrder": 500,
    "active": true
  }
] as const

export const PICKLIST_EMPLOYEE_CLASS: readonly PicklistItem[] = [
  {
    "id": "A",
    "labelTh": "A — พนักงานประจำ",
    "labelEn": "A — Permanent",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "B",
    "labelTh": "B — ส่งออกต่างประเทศ",
    "labelEn": "B — Expat Outbound",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "C",
    "labelTh": "C — รับเข้าจากต่างประเทศ",
    "labelEn": "C — Expat Inbound",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "D",
    "labelTh": "D — เกษียณอายุ",
    "labelEn": "D — Retirement",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "E",
    "labelTh": "E — พนักงานชั่วคราว",
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
    "labelTh": "G — นักศึกษาฝึกงาน",
    "labelEn": "G — Internship",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "H",
    "labelTh": "H — พนักงานสัญญาจ้าง",
    "labelEn": "H — Contingent",
    "sortOrder": 8,
    "active": true
  }
] as const

export const PICKLIST_EMPLOYEE_CLASS_EXT: readonly PicklistItem[] = [
  {
    "id": "A",
    "labelTh": "A - พนักงานประจำ",
    "labelEn": "A - Permanent",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "B",
    "labelTh": "B - พนักงานคนไทยที่ไปทำงานต่างประเทศ",
    "labelEn": "B - Expat Outbound",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "C",
    "labelTh": "C - พนักงานต่างชาติที่มาทำงานที่ไทย",
    "labelEn": "C - Expat Inbound",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "D",
    "labelTh": "D - พนักงานสัญญาจ้างหลังเกษียณ",
    "labelEn": "D - Retirement",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "E",
    "labelTh": "E - พนักงานชั่วคราว",
    "labelEn": "E - Temporary",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "F",
    "labelTh": "F - ทวิภาคี",
    "labelEn": "F - DVT",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "G",
    "labelTh": "G - นักศึกษาฝึกงาน",
    "labelEn": "G - Internship",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "H",
    "labelTh": "H - บุคคลภายนอกที่จ่ายเงิน",
    "labelEn": "H - Contingent Worker",
    "sortOrder": 8,
    "active": true
  }
] as const

export const PICKLIST_EMPLOYMENT_TYPE: readonly PicklistItem[] = [
  {
    "id": "13",
    "labelTh": "13",
    "labelEn": "13",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "Y8",
    "labelTh": "Y8 - Daily 08",
    "labelEn": "Y8 - Daily 08",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "14",
    "labelTh": "14",
    "labelEn": "14",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "Y9",
    "labelTh": "Y9 - Daily 09",
    "labelEn": "Y9 - Daily 09",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "15",
    "labelTh": "15",
    "labelEn": "15",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "YA",
    "labelTh": "YA - Daily 10",
    "labelEn": "YA - Daily 10",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "16",
    "labelTh": "16",
    "labelEn": "16",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "YB",
    "labelTh": "YB - Daily 11",
    "labelEn": "YB - Daily 11",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "17",
    "labelTh": "17",
    "labelEn": "17",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "18",
    "labelTh": "18",
    "labelEn": "18",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "19",
    "labelTh": "19",
    "labelEn": "19",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "20",
    "labelTh": "20",
    "labelEn": "20",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "21",
    "labelTh": "21",
    "labelEn": "21",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "22",
    "labelTh": "22",
    "labelEn": "22",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "23",
    "labelTh": "23",
    "labelEn": "23",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "24",
    "labelTh": "24",
    "labelEn": "24",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "25",
    "labelTh": "25",
    "labelEn": "25",
    "sortOrder": 17,
    "active": true
  },
  {
    "id": "26",
    "labelTh": "26",
    "labelEn": "26",
    "sortOrder": 18,
    "active": true
  },
  {
    "id": "27",
    "labelTh": "27",
    "labelEn": "27",
    "sortOrder": 19,
    "active": true
  },
  {
    "id": "P1",
    "labelTh": "P1 - รายวัน",
    "labelEn": "P1 - Daily",
    "sortOrder": 20,
    "active": true
  },
  {
    "id": "P2",
    "labelTh": "P2 - รายเดือน",
    "labelEn": "P2 - Monthly",
    "sortOrder": 21,
    "active": true
  },
  {
    "id": "P3",
    "labelTh": "P3 - รายชัวโมง",
    "labelEn": "P3 - Hourly",
    "sortOrder": 22,
    "active": true
  },
  {
    "id": "D1",
    "labelTh": "D1 - Partner university",
    "labelEn": "D1 - Partner university",
    "sortOrder": 23,
    "active": true
  },
  {
    "id": "D2",
    "labelTh": "D2 - Other university",
    "labelEn": "D2 - Other university",
    "sortOrder": 24,
    "active": true
  },
  {
    "id": "T2",
    "labelTh": "T2 - นักศึกษาฝึกงาน",
    "labelEn": "T2 - Student trainee",
    "sortOrder": 25,
    "active": true
  },
  {
    "id": "C2",
    "labelTh": "C2 - Outsource",
    "labelEn": "C2 - Outsource",
    "sortOrder": 26,
    "active": true
  },
  {
    "id": "C3",
    "labelTh": "C3 - หมอ",
    "labelEn": "C3 - Doctor",
    "sortOrder": 27,
    "active": true
  },
  {
    "id": "C4",
    "labelTh": "C4 - พยาบาล",
    "labelEn": "C4 - Nurse",
    "sortOrder": 28,
    "active": true
  },
  {
    "id": "C5",
    "labelTh": "C5 - โรงพยาบาล",
    "labelEn": "C5 - Hospital",
    "sortOrder": 29,
    "active": true
  },
  {
    "id": "C6",
    "labelTh": "C6 - ตำรวจ",
    "labelEn": "C6 - Police",
    "sortOrder": 30,
    "active": true
  },
  {
    "id": "UC",
    "labelTh": "Unclassified",
    "labelEn": "Unclassified",
    "sortOrder": 31,
    "active": true
  },
  {
    "id": "T1",
    "labelTh": "T1 - CG Internship",
    "labelEn": "T1 - CG Internship",
    "sortOrder": 32,
    "active": true
  },
  {
    "id": "X7",
    "labelTh": "X7 - Piecework 07",
    "labelEn": "X7 - Piecework 07",
    "sortOrder": 33,
    "active": true
  },
  {
    "id": "C1",
    "labelTh": "C1 - Consultant",
    "labelEn": "C1 - Consultant",
    "sortOrder": 34,
    "active": true
  },
  {
    "id": "X8",
    "labelTh": "X8 - Piecework 08",
    "labelEn": "X8 - Piecework 08",
    "sortOrder": 35,
    "active": true
  },
  {
    "id": "X9",
    "labelTh": "X9 - Piecework 09",
    "labelEn": "X9 - Piecework 09",
    "sortOrder": 36,
    "active": true
  },
  {
    "id": "XA",
    "labelTh": "XA - Piecework 10",
    "labelEn": "XA - Piecework 10",
    "sortOrder": 37,
    "active": true
  },
  {
    "id": "10",
    "labelTh": "10",
    "labelEn": "10",
    "sortOrder": 38,
    "active": true
  },
  {
    "id": "XB",
    "labelTh": "XB - Piecework 11",
    "labelEn": "XB - Piecework 11",
    "sortOrder": 39,
    "active": true
  },
  {
    "id": "11",
    "labelTh": "11",
    "labelEn": "11",
    "sortOrder": 40,
    "active": true
  },
  {
    "id": "Y7",
    "labelTh": "Y7 - Daily 07",
    "labelEn": "Y7 - Daily 07",
    "sortOrder": 41,
    "active": true
  },
  {
    "id": "12",
    "labelTh": "12",
    "labelEn": "12",
    "sortOrder": 42,
    "active": true
  },
  {
    "id": "07",
    "labelTh": "07",
    "labelEn": "07",
    "sortOrder": 43,
    "active": true
  },
  {
    "id": "08",
    "labelTh": "08",
    "labelEn": "08",
    "sortOrder": 44,
    "active": true
  },
  {
    "id": "09",
    "labelTh": "09",
    "labelEn": "09",
    "sortOrder": 45,
    "active": true
  },
  {
    "id": "P5",
    "labelTh": "P5 - พนง.อีเว้นท์",
    "labelEn": "P5 - Event",
    "sortOrder": 46,
    "active": true
  },
  {
    "id": "T3",
    "labelTh": "T3 - Student trainee [H]",
    "labelEn": "T3 - Student trainee [H]",
    "sortOrder": 47,
    "active": true
  }
] as const

export const PICKLIST_EVENT_REASON_ALL: readonly PicklistItem[] = [
  {
    "id": "CG_RETIRE",
    "labelTh": "Change to Retirement",
    "labelEn": "Change to Retirement",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "COMPROB_COMPROB",
    "labelTh": "Completion of Probation",
    "labelEn": "Completion of Probation",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "DC_CHGINPAY",
    "labelTh": "Change in Pay",
    "labelEn": "Change in Pay",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "DC_CHGINSSO",
    "labelTh": "Change in SSO Location",
    "labelEn": "Change in SSO Location",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "DC_CHGINTM",
    "labelTh": "Change in Time",
    "labelEn": "Change in Time",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "DC_SC",
    "labelTh": "System Change",
    "labelEn": "System Change",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "DC_CHGINMGR",
    "labelTh": "Change in Manager",
    "labelEn": "Change in Manager",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "DC_EXTPROB",
    "labelTh": "Extend Probation",
    "labelEn": "Extend Probation",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "DC_EXTRET",
    "labelTh": "Extend Retirement",
    "labelEn": "Extend Retirement",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "POSCHG_POSCHG",
    "labelTh": "Position Change",
    "labelEn": "Position Change",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "DM",
    "labelTh": "DATA MIGRATION",
    "labelEn": "DATA MIGRATION",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "HIREDM",
    "labelTh": "HIRE - DATA MIGRATION",
    "labelEn": "HIRE - DATA MIGRATION",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "H_CORENTRY",
    "labelTh": "HIRE Corrected Entry",
    "labelEn": "HIRE Corrected Entry",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "H_INENTRY",
    "labelTh": "HIRE Incorrect Entry",
    "labelEn": "HIRE Incorrect Entry",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "H_NEWHIRE",
    "labelTh": "New Hire",
    "labelEn": "New Hire",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "H_RPLMENT",
    "labelTh": "Replacement",
    "labelEn": "Replacement",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "H_TEMPASG",
    "labelTh": "Temporary Assignment",
    "labelEn": "Temporary Assignment",
    "sortOrder": 17,
    "active": true
  },
  {
    "id": "JCHG_EMPTYPE",
    "labelTh": "Change Employee Type",
    "labelEn": "Change Employee Type",
    "sortOrder": 18,
    "active": true
  },
  {
    "id": "PRCHG_MERINC",
    "labelTh": "Merit Increase",
    "labelEn": "Merit Increase",
    "sortOrder": 19,
    "active": true
  },
  {
    "id": "PRCHG_ADJPOS",
    "labelTh": "Adjust Position",
    "labelEn": "Adjust Position",
    "sortOrder": 20,
    "active": true
  },
  {
    "id": "PRCHG_PROMO",
    "labelTh": "Promotion",
    "labelEn": "Promotion",
    "sortOrder": 21,
    "active": true
  },
  {
    "id": "PRCHG_SALADJ",
    "labelTh": "Salary Adjust",
    "labelEn": "Salary Adjust",
    "sortOrder": 22,
    "active": true
  },
  {
    "id": "PRCHG_SALCUT",
    "labelTh": "Salary cuts",
    "labelEn": "Salary cuts",
    "sortOrder": 23,
    "active": true
  },
  {
    "id": "REORG_REORG",
    "labelTh": "Reorganization",
    "labelEn": "Reorganization",
    "sortOrder": 24,
    "active": true
  },
  {
    "id": "PRM_DEMO",
    "labelTh": "Demotion",
    "labelEn": "Demotion",
    "sortOrder": 25,
    "active": true
  },
  {
    "id": "PRM_PRM",
    "labelTh": "Promotion",
    "labelEn": "Promotion",
    "sortOrder": 26,
    "active": true
  },
  {
    "id": "TERM_RETIRE",
    "labelTh": "Retirement",
    "labelEn": "Retirement",
    "sortOrder": 27,
    "active": true
  },
  {
    "id": "RE_REHIRE_GE1",
    "labelTh": "Rehiring  GE 1 year",
    "labelEn": "Rehiring  GE 1 year",
    "sortOrder": 28,
    "active": true
  },
  {
    "id": "RE_REHIRE_LT1",
    "labelTh": "Rehiring   LT 1 year",
    "labelEn": "Rehiring   LT 1 year",
    "sortOrder": 29,
    "active": true
  },
  {
    "id": "SUSP_SUSP",
    "labelTh": "Suspension",
    "labelEn": "Suspension",
    "sortOrder": 30,
    "active": true
  },
  {
    "id": "TERM_DISMISS",
    "labelTh": "Dismissal",
    "labelEn": "Dismissal",
    "sortOrder": 31,
    "active": true
  },
  {
    "id": "TERM_DM",
    "labelTh": "Termination (DM)",
    "labelEn": "Termination (DM)",
    "sortOrder": 32,
    "active": true
  },
  {
    "id": "TERM_ENDASSIGN",
    "labelTh": "End of Temporary Assignment",
    "labelEn": "End of Temporary Assignment",
    "sortOrder": 33,
    "active": true
  },
  {
    "id": "TERM_EOC",
    "labelTh": "End of Contract",
    "labelEn": "End of Contract",
    "sortOrder": 34,
    "active": true
  },
  {
    "id": "TERM_ERLRETIRE",
    "labelTh": "Early Retirement",
    "labelEn": "Early Retirement",
    "sortOrder": 35,
    "active": true
  },
  {
    "id": "TERM_LAYOFF",
    "labelTh": "Layoff",
    "labelEn": "Layoff",
    "sortOrder": 36,
    "active": true
  },
  {
    "id": "TERM_NOSHOW",
    "labelTh": "No Show",
    "labelEn": "No Show",
    "sortOrder": 37,
    "active": true
  },
  {
    "id": "TERM_PASSAWAY",
    "labelTh": "Passed away",
    "labelEn": "Passed away",
    "sortOrder": 38,
    "active": true
  },
  {
    "id": "TERM_RESIGN",
    "labelTh": "Resignation",
    "labelEn": "Resignation",
    "sortOrder": 39,
    "active": true
  },
  {
    "id": "TERM_REORG",
    "labelTh": "Reorganization",
    "labelEn": "Reorganization",
    "sortOrder": 40,
    "active": true
  },
  {
    "id": "TERM_TRANS",
    "labelTh": "Transfer Out",
    "labelEn": "Transfer Out",
    "sortOrder": 41,
    "active": true
  },
  {
    "id": "TERM_UNSUCPROB",
    "labelTh": "Unsuccessful probation",
    "labelEn": "Unsuccessful probation",
    "sortOrder": 42,
    "active": true
  },
  {
    "id": "TRN_ROTATION",
    "labelTh": "Rotation",
    "labelEn": "Rotation",
    "sortOrder": 43,
    "active": true
  },
  {
    "id": "TRN_TRNACCOMP",
    "labelTh": "Transfer across Company",
    "labelEn": "Transfer across Company",
    "sortOrder": 44,
    "active": true
  },
  {
    "id": "TRN_TRNWIC",
    "labelTh": "Transfer within Company",
    "labelEn": "Transfer within Company",
    "sortOrder": 45,
    "active": true
  },
  {
    "id": "DC_DC",
    "labelTh": "Data Change",
    "labelEn": "Data Change",
    "sortOrder": 46,
    "active": true
  },
  {
    "id": "TERM_COVID",
    "labelTh": "COVID-19 situation",
    "labelEn": "COVID-19 situation",
    "sortOrder": 47,
    "active": true
  },
  {
    "id": "DC_EXCONT",
    "labelTh": "Extend Contract",
    "labelEn": "Extend Contract",
    "sortOrder": 48,
    "active": true
  },
  {
    "id": "TERM_ABSENT",
    "labelTh": "Absent",
    "labelEn": "Absent",
    "sortOrder": 50,
    "active": true
  },
  {
    "id": "DC_CHGINLO",
    "labelTh": "Change in Location",
    "labelEn": "Change in Location",
    "sortOrder": 51,
    "active": true
  },
  {
    "id": "TERM_REDUNDANCY",
    "labelTh": "Redundancy",
    "labelEn": "Redundancy",
    "sortOrder": 52,
    "active": true
  },
  {
    "id": "RESUSP_RESUSP",
    "labelTh": "Return from Suspension",
    "labelEn": "Return from Suspension",
    "sortOrder": 53,
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
    "labelTh": "ย้ายข้อมูลระบบ",
    "labelEn": "HIRE - Data Migration",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "H_CORENTRY",
    "labelTh": "แก้ไขรายการรับเข้าทำงาน",
    "labelEn": "HIRE Corrected Entry",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "H_INENTRY",
    "labelTh": "รายการรับเข้าผิดพลาด",
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
    "labelTh": "ปลดออก",
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

export const PICKLIST_FREQUENCY: readonly PicklistItem[] = [
  {
    "id": "TDP",
    "labelTh": "Total Deduction Period",
    "labelEn": "Total Deduction Period",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "DLY",
    "labelTh": "Daily",
    "labelEn": "Daily",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "NON",
    "labelTh": "None",
    "labelEn": "None",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "MON",
    "labelTh": "Monthly",
    "labelEn": "Monthly",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "ANN",
    "labelTh": "Annual",
    "labelEn": "Annual",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "HRS",
    "labelTh": "Hourly",
    "labelEn": "Hourly",
    "sortOrder": 6,
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

export const PICKLIST_JOB_FUNCTION: readonly PicklistItem[] = [
  {
    "id": "99999999",
    "labelTh": "MIGRATION JOB Family / Sub-Family",
    "labelEn": "MIGRATION JOB Family / Sub-Family",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "BDA",
    "labelTh": "Business Development",
    "labelEn": "Business Development",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "BDB",
    "labelTh": "Business Development - Land Acquisition",
    "labelEn": "Business Development - Land Acquisition",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "CSA",
    "labelTh": "Customer Service",
    "labelEn": "Customer Service",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "CSB",
    "labelTh": "Customer Service - Call/Contact Center",
    "labelEn": "Customer Service - Call/Contact Center",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "EAC",
    "labelTh": "Engineering & Architecture - Architecture",
    "labelEn": "Engineering & Architecture - Architecture",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "EMA",
    "labelTh": "Executive/Management",
    "labelEn": "Executive/Management",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "FAA",
    "labelTh": "Finance",
    "labelEn": "Finance",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "FAB",
    "labelTh": "Finance - Accounting",
    "labelEn": "Finance - Accounting",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "FAD",
    "labelTh": "Finance - Investor Relations",
    "labelEn": "Finance - Investor Relations",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "FBA",
    "labelTh": "Food & Beverages",
    "labelEn": "Food & Beverages",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "FBB",
    "labelTh": "Food & Beverages - Recipe Development",
    "labelEn": "Food & Beverages - Recipe Development",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "FBC",
    "labelTh": "Food & Beverages - F&B Kitchen",
    "labelEn": "Food & Beverages - F&B Kitchen",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "FBD",
    "labelTh": "Food & Beverages - F&B Service",
    "labelEn": "Food & Beverages - F&B Service",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "GAA",
    "labelTh": "General Affairs",
    "labelEn": "General Affairs",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "GAB",
    "labelTh": "General Affairs - Executive Assistance/Secretariat",
    "labelEn": "General Affairs - Executive Assistance/Secretariat",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "GAC",
    "labelTh": "General Affairs - Government/Corporate Affairs",
    "labelEn": "General Affairs - Government/Corporate Affairs",
    "sortOrder": 17,
    "active": true
  },
  {
    "id": "GAD",
    "labelTh": "General Affairs - General Administrative",
    "labelEn": "General Affairs - General Administrative",
    "sortOrder": 18,
    "active": true
  },
  {
    "id": "HRA",
    "labelTh": "Human Resources",
    "labelEn": "Human Resources",
    "sortOrder": 19,
    "active": true
  },
  {
    "id": "HRB",
    "labelTh": "Human Resources - HR Business Partner",
    "labelEn": "Human Resources - HR Business Partner",
    "sortOrder": 20,
    "active": true
  },
  {
    "id": "HTA",
    "labelTh": "Hospitality",
    "labelEn": "Hospitality",
    "sortOrder": 21,
    "active": true
  },
  {
    "id": "HTB",
    "labelTh": "Hospitality - Hotel Operations Management",
    "labelEn": "Hospitality - Hotel Operations Management",
    "sortOrder": 22,
    "active": true
  },
  {
    "id": "HTC",
    "labelTh": "Hospitality - Front/Concierge",
    "labelEn": "Hospitality - Front/Concierge",
    "sortOrder": 23,
    "active": true
  },
  {
    "id": "HTD",
    "labelTh": "Hospitality - Entertainment & Recreation",
    "labelEn": "Hospitality - Entertainment & Recreation",
    "sortOrder": 24,
    "active": true
  },
  {
    "id": "HTE",
    "labelTh": "Hospitality - Esthetics",
    "labelEn": "Hospitality - Esthetics",
    "sortOrder": 25,
    "active": true
  },
  {
    "id": "HTF",
    "labelTh": "Hospitality - Housekeeping/Public Area/Laundry",
    "labelEn": "Hospitality - Housekeeping/Public Area/Laundry",
    "sortOrder": 26,
    "active": true
  },
  {
    "id": "IAA",
    "labelTh": "Internal Audit",
    "labelEn": "Internal Audit",
    "sortOrder": 27,
    "active": true
  },
  {
    "id": "IAB",
    "labelTh": "Internal Audit - Process & Operation Audit",
    "labelEn": "Internal Audit - Process & Operation Audit",
    "sortOrder": 28,
    "active": true
  },
  {
    "id": "IAC",
    "labelTh": "Internal Audit - Stock Count",
    "labelEn": "Internal Audit - Stock Count",
    "sortOrder": 29,
    "active": true
  },
  {
    "id": "LCB",
    "labelTh": "Legal & Compliance - Contract Management",
    "labelEn": "Legal & Compliance - Contract Management",
    "sortOrder": 30,
    "active": true
  },
  {
    "id": "MKA",
    "labelTh": "Brand Mgmt & Marketing",
    "labelEn": "Brand Mgmt & Marketing",
    "sortOrder": 31,
    "active": true
  },
  {
    "id": "MKB",
    "labelTh": "Brand Mgmt & Marketing - Marketing Communications",
    "labelEn": "Brand Mgmt & Marketing - Marketing Communications",
    "sortOrder": 32,
    "active": true
  },
  {
    "id": "MKC",
    "labelTh": "Brand Mgmt & Marketing - Sales Promotion",
    "labelEn": "Brand Mgmt & Marketing - Sales Promotion",
    "sortOrder": 33,
    "active": true
  },
  {
    "id": "MKD",
    "labelTh": "Brand Mgmt & Marketing - CRM",
    "labelEn": "Brand Mgmt & Marketing - CRM",
    "sortOrder": 34,
    "active": true
  },
  {
    "id": "MKE",
    "labelTh": "Brand Mgmt & Marketing - Digital Marketing",
    "labelEn": "Brand Mgmt & Marketing - Digital Marketing",
    "sortOrder": 35,
    "active": true
  },
  {
    "id": "MKH",
    "labelTh": "Brand Mgmt & Marketing - Visual Merchandising",
    "labelEn": "Brand Mgmt & Marketing - Visual Merchandising",
    "sortOrder": 36,
    "active": true
  },
  {
    "id": "MKI",
    "labelTh": "Brand Mgmt & Marketing - Sustainable Development",
    "labelEn": "Brand Mgmt & Marketing - Sustainable Development",
    "sortOrder": 37,
    "active": true
  },
  {
    "id": "PRA",
    "labelTh": "Production",
    "labelEn": "Production",
    "sortOrder": 38,
    "active": true
  },
  {
    "id": "PRB",
    "labelTh": "Production - Production Planning",
    "labelEn": "Production - Production Planning",
    "sortOrder": 39,
    "active": true
  },
  {
    "id": "PSA",
    "labelTh": "Professional Services",
    "labelEn": "Professional Services",
    "sortOrder": 40,
    "active": true
  },
  {
    "id": "PSB",
    "labelTh": "Professional Services - Consulting Service",
    "labelEn": "Professional Services - Consulting Service",
    "sortOrder": 41,
    "active": true
  },
  {
    "id": "PSC",
    "labelTh": "Professional Services - Publishing & Printing",
    "labelEn": "Professional Services - Publishing & Printing",
    "sortOrder": 42,
    "active": true
  },
  {
    "id": "PSD",
    "labelTh": "Professional Services - Instructional Service",
    "labelEn": "Professional Services - Instructional Service",
    "sortOrder": 43,
    "active": true
  },
  {
    "id": "PSE",
    "labelTh": "Professional Services - Insurance/Broker",
    "labelEn": "Professional Services - Insurance/Broker",
    "sortOrder": 44,
    "active": true
  },
  {
    "id": "PSF",
    "labelTh": "Professional Services - Business Process Improvement",
    "labelEn": "Professional Services - Business Process Improvement",
    "sortOrder": 45,
    "active": true
  },
  {
    "id": "PSG",
    "labelTh": "Professional Services - Other Specialized Service",
    "labelEn": "Professional Services - Other Specialized Service",
    "sortOrder": 46,
    "active": true
  },
  {
    "id": "PTA",
    "labelTh": "Property Mgmt & Development",
    "labelEn": "Property Mgmt & Development",
    "sortOrder": 47,
    "active": true
  },
  {
    "id": "PTB",
    "labelTh": "Property Mgmt & Development - Property Management",
    "labelEn": "Property Mgmt & Development - Property Management",
    "sortOrder": 48,
    "active": true
  },
  {
    "id": "PTC",
    "labelTh": "Property Mgmt & Development - Property Development",
    "labelEn": "Property Mgmt & Development - Property Development",
    "sortOrder": 49,
    "active": true
  },
  {
    "id": "QAA",
    "labelTh": "Quality Assurance",
    "labelEn": "Quality Assurance",
    "sortOrder": 50,
    "active": true
  },
  {
    "id": "QAB",
    "labelTh": "Quality Assurance - Food safety",
    "labelEn": "Quality Assurance - Food safety",
    "sortOrder": 51,
    "active": true
  },
  {
    "id": "RKA",
    "labelTh": "Risk Management",
    "labelEn": "Risk Management",
    "sortOrder": 52,
    "active": true
  },
  {
    "id": "SLA",
    "labelTh": "Sales",
    "labelEn": "Sales",
    "sortOrder": 53,
    "active": true
  },
  {
    "id": "SLB",
    "labelTh": "Sales - Direct Sales",
    "labelEn": "Sales - Direct Sales",
    "sortOrder": 54,
    "active": true
  },
  {
    "id": "SLC",
    "labelTh": "Sales - Telesales",
    "labelEn": "Sales - Telesales",
    "sortOrder": 55,
    "active": true
  },
  {
    "id": "SLE",
    "labelTh": "Sales - Leasing",
    "labelEn": "Sales - Leasing",
    "sortOrder": 56,
    "active": true
  },
  {
    "id": "SPA",
    "labelTh": "Corporate Strategy",
    "labelEn": "Corporate Strategy",
    "sortOrder": 57,
    "active": true
  },
  {
    "id": "SPC",
    "labelTh": "Corporate Strategy - Merger & Acquisition",
    "labelEn": "Corporate Strategy - Merger & Acquisition",
    "sortOrder": 58,
    "active": true
  },
  {
    "id": "STA",
    "labelTh": "Store Sales & Operations",
    "labelEn": "Store Sales & Operations",
    "sortOrder": 59,
    "active": true
  },
  {
    "id": "STB",
    "labelTh": "Store Sales & Operations - Store Operations",
    "labelEn": "Store Sales & Operations - Store Operations",
    "sortOrder": 60,
    "active": true
  },
  {
    "id": "STC",
    "labelTh": "Store Sales & Operations - Store sales",
    "labelEn": "Store Sales & Operations - Store sales",
    "sortOrder": 61,
    "active": true
  },
  {
    "id": "STD",
    "labelTh": "Store Sales & Operations - Specialist Sales",
    "labelEn": "Store Sales & Operations - Specialist Sales",
    "sortOrder": 62,
    "active": true
  },
  {
    "id": "STE",
    "labelTh": "Store Sales & Operations - Cashier Service",
    "labelEn": "Store Sales & Operations - Cashier Service",
    "sortOrder": 63,
    "active": true
  },
  {
    "id": "BDC",
    "labelTh": "Business Development - Business Solution & Innovation",
    "labelEn": "Business Development - Business Solution & Innovation",
    "sortOrder": 64,
    "active": true
  },
  {
    "id": "BMD",
    "labelTh": "Merchandising - Buying",
    "labelEn": "Merchandising - Buying",
    "sortOrder": 65,
    "active": true
  },
  {
    "id": "CSC",
    "labelTh": "Customer Service - Parking Service",
    "labelEn": "Customer Service - Parking Service",
    "sortOrder": 66,
    "active": true
  },
  {
    "id": "FAE",
    "labelTh": "Finance - Financial Planning & Analysis",
    "labelEn": "Finance - Financial Planning & Analysis",
    "sortOrder": 67,
    "active": true
  },
  {
    "id": "FAF",
    "labelTh": "Finance - F&A Operations",
    "labelEn": "Finance - F&A Operations",
    "sortOrder": 68,
    "active": true
  },
  {
    "id": "FAG",
    "labelTh": "Finance - F&A Reporting",
    "labelEn": "Finance - F&A Reporting",
    "sortOrder": 69,
    "active": true
  },
  {
    "id": "FAH",
    "labelTh": "Finance - Treasury",
    "labelEn": "Finance - Treasury",
    "sortOrder": 70,
    "active": true
  },
  {
    "id": "GAE",
    "labelTh": "Driver / Messenger / Housekeeper",
    "labelEn": "Driver / Messenger / Housekeeper",
    "sortOrder": 71,
    "active": true
  },
  {
    "id": "HRF",
    "labelTh": "Human Resources - Total Reward",
    "labelEn": "Human Resources - Total Reward",
    "sortOrder": 72,
    "active": true
  },
  {
    "id": "HRG",
    "labelTh": "Human Resources - HR Communication and Engagement",
    "labelEn": "Human Resources - HR Communication and Engagement",
    "sortOrder": 73,
    "active": true
  },
  {
    "id": "HRH",
    "labelTh": "Human Resources - Recruitment/Talent Acquisition",
    "labelEn": "Human Resources - Recruitment/Talent Acquisition",
    "sortOrder": 74,
    "active": true
  },
  {
    "id": "ITE",
    "labelTh": "Digital & Information Technology - Product Owner/Manager",
    "labelEn": "Digital & Information Technology - Product Owner/Manager",
    "sortOrder": 75,
    "active": true
  },
  {
    "id": "ITF",
    "labelTh": "Digital & Information Technology -  IT Security, Risk, Compliance",
    "labelEn": "Digital & Information Technology -  IT Security, Risk, Compliance",
    "sortOrder": 76,
    "active": true
  },
  {
    "id": "ITG",
    "labelTh": "Digital & Information Technology - UX/UI",
    "labelEn": "Digital & Information Technology - UX/UI",
    "sortOrder": 77,
    "active": true
  },
  {
    "id": "ITH",
    "labelTh": "Digital & Information Technology - Innovation",
    "labelEn": "Digital & Information Technology - Innovation",
    "sortOrder": 78,
    "active": true
  },
  {
    "id": "ITI",
    "labelTh": "Digital & Information Technology - Data Science/Analytics",
    "labelEn": "Digital & Information Technology - Data Science/Analytics",
    "sortOrder": 79,
    "active": true
  },
  {
    "id": "LCC",
    "labelTh": "Risk Mgmt., Legal & Compliance - Legal",
    "labelEn": "Risk Mgmt., Legal & Compliance - Legal",
    "sortOrder": 80,
    "active": true
  },
  {
    "id": "LCD",
    "labelTh": "Risk Mgmt., Legal & Compliance - Compliance",
    "labelEn": "Risk Mgmt., Legal & Compliance - Compliance",
    "sortOrder": 81,
    "active": true
  },
  {
    "id": "LCE",
    "labelTh": "Risk Mgmt., Legal & Compliance - Risk Management",
    "labelEn": "Risk Mgmt., Legal & Compliance - Risk Management",
    "sortOrder": 82,
    "active": true
  },
  {
    "id": "LDH",
    "labelTh": "Supply Chain and Logistics Mgmt - Supply Chain Management",
    "labelEn": "Supply Chain and Logistics Mgmt - Supply Chain Management",
    "sortOrder": 83,
    "active": true
  },
  {
    "id": "LDI",
    "labelTh": "Supply Chain and Logistics Mgmt - Inventory Management",
    "labelEn": "Supply Chain and Logistics Mgmt - Inventory Management",
    "sortOrder": 84,
    "active": true
  },
  {
    "id": "MKJ",
    "labelTh": "Brand Mgmt & Marketing - Event Marketing",
    "labelEn": "Brand Mgmt & Marketing - Event Marketing",
    "sortOrder": 85,
    "active": true
  },
  {
    "id": "MKK",
    "labelTh": "Brand Mgmt & Marketing - Public Relation",
    "labelEn": "Brand Mgmt & Marketing - Public Relation",
    "sortOrder": 86,
    "active": true
  },
  {
    "id": "PDA",
    "labelTh": "Property Development",
    "labelEn": "Property Development",
    "sortOrder": 87,
    "active": true
  },
  {
    "id": "PDB",
    "labelTh": "Property Development - Land & Site Acquisition",
    "labelEn": "Property Development - Land & Site Acquisition",
    "sortOrder": 88,
    "active": true
  },
  {
    "id": "PMA",
    "labelTh": "Property Management",
    "labelEn": "Property Management",
    "sortOrder": 89,
    "active": true
  },
  {
    "id": "PMB",
    "labelTh": "Property Management - Residential Property Mgmt.",
    "labelEn": "Property Management - Residential Property Mgmt.",
    "sortOrder": 90,
    "active": true
  },
  {
    "id": "PMC",
    "labelTh": "Property Management - Tenant Relation",
    "labelEn": "Property Management - Tenant Relation",
    "sortOrder": 91,
    "active": true
  },
  {
    "id": "QAC",
    "labelTh": "Quality Assurance - Quality Management",
    "labelEn": "Quality Assurance - Quality Management",
    "sortOrder": 92,
    "active": true
  },
  {
    "id": "SDA",
    "labelTh": "Store Development",
    "labelEn": "Store Development",
    "sortOrder": 93,
    "active": true
  },
  {
    "id": "SDB",
    "labelTh": "Store Development - Store Concept & Design",
    "labelEn": "Store Development - Store Concept & Design",
    "sortOrder": 94,
    "active": true
  },
  {
    "id": "SLF",
    "labelTh": "Sales - After Sales",
    "labelEn": "Sales - After Sales",
    "sortOrder": 95,
    "active": true
  },
  {
    "id": "SLG",
    "labelTh": "Relationship/Account Manager",
    "labelEn": "Relationship/Account Manager",
    "sortOrder": 96,
    "active": true
  },
  {
    "id": "SSA",
    "labelTh": "Sustainability",
    "labelEn": "Sustainability",
    "sortOrder": 97,
    "active": true
  },
  {
    "id": "SSB",
    "labelTh": "Sustainability - CSV/CSR",
    "labelEn": "Sustainability - CSV/CSR",
    "sortOrder": 98,
    "active": true
  },
  {
    "id": "BIA",
    "labelTh": "Business Intelligence & Analytics",
    "labelEn": "Business Intelligence & Analytics",
    "sortOrder": 99,
    "active": true
  },
  {
    "id": "BIB",
    "labelTh": "Business Intelligence & Analytics - Business Intelligence",
    "labelEn": "Business Intelligence & Analytics - Business Intelligence",
    "sortOrder": 100,
    "active": true
  },
  {
    "id": "BIC",
    "labelTh": "Business Intelligence & Analytics - Analytics",
    "labelEn": "Business Intelligence & Analytics - Analytics",
    "sortOrder": 101,
    "active": true
  },
  {
    "id": "BMA",
    "labelTh": "Merchandising",
    "labelEn": "Merchandising",
    "sortOrder": 102,
    "active": true
  },
  {
    "id": "BMB",
    "labelTh": "Merchandising - Space Range & Display",
    "labelEn": "Merchandising - Space Range & Display",
    "sortOrder": 103,
    "active": true
  },
  {
    "id": "BMC",
    "labelTh": "Merchandising - Product Development",
    "labelEn": "Merchandising - Product Development",
    "sortOrder": 104,
    "active": true
  },
  {
    "id": "EAA",
    "labelTh": "Engineering & Maintenance",
    "labelEn": "Engineering & Maintenance",
    "sortOrder": 105,
    "active": true
  },
  {
    "id": "EAB",
    "labelTh": "Engineering & Maintenance - Engineering",
    "labelEn": "Engineering & Maintenance - Engineering",
    "sortOrder": 106,
    "active": true
  },
  {
    "id": "EAD",
    "labelTh": "Engineering & Maintenance - Maintenance Technician",
    "labelEn": "Engineering & Maintenance - Maintenance Technician",
    "sortOrder": 107,
    "active": true
  },
  {
    "id": "EAE",
    "labelTh": "Engineering & Maintenance - Service & Installation Technician",
    "labelEn": "Engineering & Maintenance - Service & Installation Technician",
    "sortOrder": 108,
    "active": true
  },
  {
    "id": "EAF",
    "labelTh": "Engineering & Maintenance - Technical Specialist",
    "labelEn": "Engineering & Maintenance - Technical Specialist",
    "sortOrder": 109,
    "active": true
  },
  {
    "id": "FAC",
    "labelTh": "Finance - Merger & Acquisition and Investment",
    "labelEn": "Finance - Merger & Acquisition and Investment",
    "sortOrder": 110,
    "active": true
  },
  {
    "id": "HRC",
    "labelTh": "Organization Development",
    "labelEn": "Organization Development",
    "sortOrder": 111,
    "active": true
  },
  {
    "id": "HRD",
    "labelTh": "HR Development",
    "labelEn": "HR Development",
    "sortOrder": 112,
    "active": true
  },
  {
    "id": "HRE",
    "labelTh": "HR Shared Service",
    "labelEn": "HR Shared Service",
    "sortOrder": 113,
    "active": true
  },
  {
    "id": "ITA",
    "labelTh": "Digital & Information Technology",
    "labelEn": "Digital & Information Technology",
    "sortOrder": 114,
    "active": true
  },
  {
    "id": "ITB",
    "labelTh": "Digital & Information Technology - Technology and Application Development",
    "labelEn": "Digital & Information Technology - Technology and Application Development",
    "sortOrder": 115,
    "active": true
  },
  {
    "id": "ITC",
    "labelTh": "Digital & Information Technology - IT Infrastructure",
    "labelEn": "Digital & Information Technology - IT Infrastructure",
    "sortOrder": 116,
    "active": true
  },
  {
    "id": "ITD",
    "labelTh": "Digital & Information Technology - IT Services",
    "labelEn": "Digital & Information Technology - IT Services",
    "sortOrder": 117,
    "active": true
  },
  {
    "id": "LCA",
    "labelTh": "Risk Mgmt., Legal & Compliance",
    "labelEn": "Risk Mgmt., Legal & Compliance",
    "sortOrder": 118,
    "active": true
  },
  {
    "id": "LDA",
    "labelTh": "Supply Chain and Logistics Mgmt",
    "labelEn": "Supply Chain and Logistics Mgmt",
    "sortOrder": 119,
    "active": true
  },
  {
    "id": "LDB",
    "labelTh": "Supply Chain and Logistics Mgmt - Replenishment",
    "labelEn": "Supply Chain and Logistics Mgmt - Replenishment",
    "sortOrder": 120,
    "active": true
  },
  {
    "id": "LDC",
    "labelTh": "Supply Chain and Logistics Mgmt - Warehouse Management",
    "labelEn": "Supply Chain and Logistics Mgmt - Warehouse Management",
    "sortOrder": 121,
    "active": true
  },
  {
    "id": "LDD",
    "labelTh": "Supply Chain and Logistics Mgmt - Transportation and Logistics",
    "labelEn": "Supply Chain and Logistics Mgmt - Transportation and Logistics",
    "sortOrder": 122,
    "active": true
  },
  {
    "id": "LDE",
    "labelTh": "Supply Chain and Logistics Mgmt - Non-Merchandising Procurement",
    "labelEn": "Supply Chain and Logistics Mgmt - Non-Merchandising Procurement",
    "sortOrder": 123,
    "active": true
  },
  {
    "id": "LDF",
    "labelTh": "Supply Chain and Logistics Mgmt - Import-Export",
    "labelEn": "Supply Chain and Logistics Mgmt - Import-Export",
    "sortOrder": 124,
    "active": true
  },
  {
    "id": "LDG",
    "labelTh": "Supply Chain and Logistics Mgmt - Goods Receiving",
    "labelEn": "Supply Chain and Logistics Mgmt - Goods Receiving",
    "sortOrder": 125,
    "active": true
  },
  {
    "id": "LPA",
    "labelTh": "Health Safety and Environment",
    "labelEn": "Health Safety and Environment",
    "sortOrder": 126,
    "active": true
  },
  {
    "id": "LPB",
    "labelTh": "Health Safety and Environment - Loss Prevention",
    "labelEn": "Health Safety and Environment - Loss Prevention",
    "sortOrder": 127,
    "active": true
  },
  {
    "id": "LPC",
    "labelTh": "Health Safety and Environment - Safety",
    "labelEn": "Health Safety and Environment - Safety",
    "sortOrder": 128,
    "active": true
  },
  {
    "id": "MKF",
    "labelTh": "Brand Mgmt & Marketing - Market Research / Intelligence",
    "labelEn": "Brand Mgmt & Marketing - Market Research / Intelligence",
    "sortOrder": 129,
    "active": true
  },
  {
    "id": "MKG",
    "labelTh": "Brand Mgmt & Marketing - Marketing Art & Design",
    "labelEn": "Brand Mgmt & Marketing - Marketing Art & Design",
    "sortOrder": 130,
    "active": true
  },
  {
    "id": "SLD",
    "labelTh": "Sales - Online/Omnichannel Sales",
    "labelEn": "Sales - Online/Omnichannel Sales",
    "sortOrder": 131,
    "active": true
  },
  {
    "id": "SPB",
    "labelTh": "Corporate Strategy - Corporate Planning",
    "labelEn": "Corporate Strategy - Corporate Planning",
    "sortOrder": 132,
    "active": true
  }
] as const

export const PICKLIST_JOB_TYPE: readonly PicklistItem[] = [
  {
    "id": "A04",
    "labelTh": "Warehouse and Distribution",
    "labelEn": "Warehouse and Distribution",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "A05",
    "labelTh": "Factory",
    "labelEn": "Factory",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "A01",
    "labelTh": "Back Office",
    "labelEn": "Back Office",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "A02",
    "labelTh": "Back Support Front",
    "labelEn": "Back Support Front",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "A03",
    "labelTh": "Front",
    "labelEn": "Front",
    "sortOrder": 5,
    "active": true
  }
] as const

export const PICKLIST_MANAGEMENT_PROGRAM: readonly PicklistItem[] = [
  {
    "id": "MA",
    "labelTh": "Management Associate",
    "labelEn": "Management Associate",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "OT",
    "labelTh": "Operation Trainee",
    "labelEn": "Operation Trainee",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "MT",
    "labelTh": "Management Trainee",
    "labelEn": "Management Trainee",
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

export const PICKLIST_PAY_COMPONENT: readonly PicklistItem[] = [
  {
    "id": "BE01",
    "labelTh": "BE WT for Config 1",
    "labelEn": "BE WT for Config 1",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "VN_1004",
    "labelTh": "Vietnam: Hourly Rate",
    "labelEn": "Vietnam: Hourly Rate",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "VN_1000",
    "labelTh": "Vietnam: Salary",
    "labelEn": "Vietnam: Salary",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "TH_1004",
    "labelTh": "Hourly Rate-T/P/S",
    "labelEn": "Hourly Rate-T/P/S",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "TH_1003",
    "labelTh": "DVT/Intern Rate-T",
    "labelEn": "DVT/Intern Rate-T",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "TH_1002",
    "labelTh": "Daily Rate-T/P/S",
    "labelEn": "Daily Rate-T/P/S",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "TH_1001",
    "labelTh": "Salary(Grsup)-T/P/S",
    "labelEn": "Salary(Grsup)-T/P/S",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "TH_1000",
    "labelTh": "Salary-T/P/S",
    "labelEn": "Salary-T/P/S",
    "sortOrder": 8,
    "active": true
  }
] as const

export const PICKLIST_PAY_COMPONENT_GROUP: readonly PicklistItem[] = [
  {
    "id": "BE01",
    "labelTh": "BE WT for Config 1",
    "labelEn": "BE WT for Config 1",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "TH_1004",
    "labelTh": "Hourly Rate-T/P/S",
    "labelEn": "Hourly Rate-T/P/S",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "TH_1000",
    "labelTh": "Salary-T/P/S",
    "labelEn": "Salary-T/P/S",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "TH_1001",
    "labelTh": "Salary(Grsup)-T/P/S",
    "labelEn": "Salary(Grsup)-T/P/S",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "TH_1002",
    "labelTh": "Daily Rate-T/P/S",
    "labelEn": "Daily Rate-T/P/S",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "TH_1003",
    "labelTh": "DVT/Intern Rate-T",
    "labelEn": "DVT/Intern Rate-T",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "VN_1000",
    "labelTh": "Vietnam: Salary",
    "labelEn": "Vietnam: Salary",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "AnnualizedSalary",
    "labelTh": "AnnualizedSalary",
    "labelEn": "AnnualizedSalary",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "VN_1004",
    "labelTh": "Vietnam: Hourly Rate",
    "labelEn": "Vietnam: Hourly Rate",
    "sortOrder": 9,
    "active": true
  }
] as const

export const PICKLIST_PAY_FREQUENCY: readonly PicklistItem[] = [
  {
    "id": "NON",
    "labelTh": "None",
    "labelEn": "None",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "MON",
    "labelTh": "Monthly",
    "labelEn": "Monthly",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "DLY",
    "labelTh": "Daily",
    "labelEn": "Daily",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "BIW",
    "labelTh": "Bi-Weekly",
    "labelEn": "Bi-Weekly",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "WKY",
    "labelTh": "Weekly",
    "labelEn": "Weekly",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "SMY",
    "labelTh": "Semi-Monthly",
    "labelEn": "Semi-Monthly",
    "sortOrder": 6,
    "active": true
  }
] as const

export const PICKLIST_POLICY_PROFILE: readonly PicklistItem[] = [
  {
    "id": "SCM",
    "labelTh": "SCM",
    "labelEn": "SCM",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "PWB",
    "labelTh": "PWB",
    "labelEn": "PWB",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "OFM",
    "labelTh": "OFM",
    "labelEn": "OFM",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "CRG",
    "labelTh": "CRG",
    "labelEn": "CRG",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "CPN",
    "labelTh": "CPN",
    "labelEn": "CPN",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "CMG",
    "labelTh": "CMG",
    "labelEn": "CMG",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "CHR",
    "labelTh": "CHR",
    "labelEn": "CHR",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "CHG",
    "labelTh": "CHG",
    "labelEn": "CHG",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "CFR",
    "labelTh": "CFR",
    "labelEn": "CFR",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "CFM",
    "labelTh": "CFM",
    "labelEn": "CFM",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "B2S",
    "labelTh": "B2S",
    "labelEn": "B2S",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "SSP",
    "labelTh": "SSP",
    "labelEn": "SSP",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "RBS",
    "labelTh": "RBS",
    "labelEn": "RBS",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "CDS",
    "labelTh": "CDS",
    "labelEn": "CDS",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "999",
    "labelTh": "MIGRATION PROFILE",
    "labelEn": "MIGRATION PROFILE",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "SU-CMC & SDO",
    "labelTh": "SU-CMC & SDO",
    "labelEn": "SU-CMC & SDO",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "SU-MA",
    "labelTh": "SU-MA",
    "labelEn": "SU-MA",
    "sortOrder": 17,
    "active": true
  },
  {
    "id": "SU-INTERNAL AUDIT",
    "labelTh": "SU-INTERNAL AUDIT",
    "labelEn": "SU-INTERNAL AUDIT",
    "sortOrder": 18,
    "active": true
  },
  {
    "id": "SU-CIS",
    "labelTh": "SU-CIS",
    "labelEn": "SU-CIS",
    "sortOrder": 19,
    "active": true
  },
  {
    "id": "SU-T1C",
    "labelTh": "SU-T1C",
    "labelEn": "SU-T1C",
    "sortOrder": 20,
    "active": true
  },
  {
    "id": "SU-CNG",
    "labelTh": "SU-CNG",
    "labelEn": "SU-CNG",
    "sortOrder": 21,
    "active": true
  },
  {
    "id": "SU-CGO",
    "labelTh": "SU-CGO",
    "labelEn": "SU-CGO",
    "sortOrder": 22,
    "active": true
  },
  {
    "id": "SU-OTHER",
    "labelTh": "SU-OTHER",
    "labelEn": "SU-OTHER",
    "sortOrder": 23,
    "active": true
  },
  {
    "id": "SU-FAST",
    "labelTh": "SU-FAST",
    "labelEn": "SU-FAST",
    "sortOrder": 24,
    "active": true
  },
  {
    "id": "SU-BD",
    "labelTh": "SU-BD",
    "labelEn": "SU-BD",
    "sortOrder": 25,
    "active": true
  },
  {
    "id": "SU-RIS",
    "labelTh": "SU-RIS",
    "labelEn": "SU-RIS",
    "sortOrder": 26,
    "active": true
  },
  {
    "id": "SU-HR",
    "labelTh": "SU-HR",
    "labelEn": "SU-HR",
    "sortOrder": 27,
    "active": true
  }
] as const

export const PICKLIST_PROPERTY_TYPE: readonly PicklistItem[] = [
  {
    "id": "CFR",
    "labelTh": "TOPS-Plaza",
    "labelEn": "TOPS-Plaza",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "BIG",
    "labelTh": "Big C",
    "labelEn": "Big C",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "WHS",
    "labelTh": "Warehouse",
    "labelEn": "Warehouse",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "OFF",
    "labelTh": "CG Office",
    "labelEn": "CG Office",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "CHR",
    "labelTh": "Hotel",
    "labelEn": "Hotel",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "GAS",
    "labelTh": "Gas Station",
    "labelEn": "Gas Station",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "FAC",
    "labelTh": "Factory",
    "labelEn": "Factory",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "HOS",
    "labelTh": "Hospital",
    "labelEn": "Hospital",
    "sortOrder": 8,
    "active": true
  },
  {
    "id": "OTH",
    "labelTh": "Others",
    "labelEn": "Others",
    "sortOrder": 9,
    "active": true
  },
  {
    "id": "CPN",
    "labelTh": "Central Pattana",
    "labelEn": "Central Pattana",
    "sortOrder": 10,
    "active": true
  },
  {
    "id": "CDS",
    "labelTh": "Central Department Store",
    "labelEn": "Central Department Store",
    "sortOrder": 11,
    "active": true
  },
  {
    "id": "CHG",
    "labelTh": "Thai Watsadu",
    "labelEn": "Thai Watsadu",
    "sortOrder": 12,
    "active": true
  },
  {
    "id": "RBS",
    "labelTh": "Robinson Department Store",
    "labelEn": "Robinson Department Store",
    "sortOrder": 13,
    "active": true
  },
  {
    "id": "MAL",
    "labelTh": "The Mall",
    "labelEn": "The Mall",
    "sortOrder": 14,
    "active": true
  },
  {
    "id": "TES",
    "labelTh": "Tesco Lotus",
    "labelEn": "Tesco Lotus",
    "sortOrder": 15,
    "active": true
  },
  {
    "id": "RES",
    "labelTh": "Residential",
    "labelEn": "Residential",
    "sortOrder": 16,
    "active": true
  },
  {
    "id": "CON",
    "labelTh": "Condo",
    "labelEn": "Condo",
    "sortOrder": 17,
    "active": true
  },
  {
    "id": "TOU",
    "labelTh": "Tourist",
    "labelEn": "Tourist",
    "sortOrder": 18,
    "active": true
  },
  {
    "id": "MKT",
    "labelTh": "Market",
    "labelEn": "Market",
    "sortOrder": 19,
    "active": true
  },
  {
    "id": "TRN",
    "labelTh": "Transport Hub",
    "labelEn": "Transport Hub",
    "sortOrder": 20,
    "active": true
  },
  {
    "id": "SPM",
    "labelTh": "Shopping mall",
    "labelEn": "Shopping mall",
    "sortOrder": 21,
    "active": true
  },
  {
    "id": "IND",
    "labelTh": "Industrial Area",
    "labelEn": "Industrial Area",
    "sortOrder": 22,
    "active": true
  },
  {
    "id": "UNI",
    "labelTh": "University",
    "labelEn": "University",
    "sortOrder": 23,
    "active": true
  }
] as const

export const PICKLIST_REGULAR_TEMPORARY: readonly PicklistItem[] = [
  {
    "id": "F",
    "labelTh": "Full-time",
    "labelEn": "Full-time",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "P",
    "labelTh": "Part-time",
    "labelEn": "Part-time",
    "sortOrder": 2,
    "active": true
  }
] as const

export const PICKLIST_RELATIONSHIP_TYPE: readonly PicklistItem[] = [
  {
    "id": "1",
    "labelTh": "Spouse",
    "labelEn": "Spouse",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "2",
    "labelTh": "Father",
    "labelEn": "Father",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "3",
    "labelTh": "Mother",
    "labelEn": "Mother",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "4",
    "labelTh": "Child",
    "labelEn": "Child",
    "sortOrder": 4,
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

export const PICKLIST_TIME_STATUS: readonly PicklistItem[] = [
  {
    "id": "1",
    "labelTh": "1 - Clocking",
    "labelEn": "1 - Clocking",
    "sortOrder": 1,
    "active": true
  },
  {
    "id": "2",
    "labelTh": "2 - Clocking No Deduct",
    "labelEn": "2 - Clocking No Deduct",
    "sortOrder": 2,
    "active": true
  },
  {
    "id": "3",
    "labelTh": "3 - Clocking No Tardy",
    "labelEn": "3 - Clocking No Tardy",
    "sortOrder": 3,
    "active": true
  },
  {
    "id": "4",
    "labelTh": "4 - Clocking No Early",
    "labelEn": "4 - Clocking No Early",
    "sortOrder": 4,
    "active": true
  },
  {
    "id": "5",
    "labelTh": "5 - Flex Time",
    "labelEn": "5 - Flex Time",
    "sortOrder": 5,
    "active": true
  },
  {
    "id": "9",
    "labelTh": "9 - Exempt",
    "labelEn": "9 - Exempt",
    "sortOrder": 6,
    "active": true
  },
  {
    "id": "99",
    "labelTh": "99 - Acting/Concurrent",
    "labelEn": "99 - Acting/Concurrent",
    "sortOrder": 7,
    "active": true
  },
  {
    "id": "10",
    "labelTh": "10 - 4-Times Clocking",
    "labelEn": "10 - 4-Times Clocking",
    "sortOrder": 8,
    "active": true
  }
] as const

export type BloodTypeId = "A_POS" | "A_NEG" | "B_POS" | "B_NEG" | "AB_POS" | "AB_NEG" | "O_POS" | "O_NEG"
export type BusinessGroupId = "CHR" | "999" | "CRG" | "CFG" | "CHG" | "CDG" | "PWB" | "CPN" | "CMG" | "COL" | "CU" | "Retail Food" | "Central Retail Corporation" | "CGV" | "CGVN"
export type BusinessUnitId = "10000000" | "10000001" | "10000002" | "10000003" | "10000004" | "10000005" | "10000006" | "10000007" | "10000008" | "10000009" | "10000010" | "10000011" | "10000012" | "10000014" | "10000015" | "10000017" | "10000018" | "10000019" | "10000020" | "10000021" | "10000023" | "10000024" | "99999999" | "10000026" | "99999CMG" | "99999CPN" | "10000022" | "10000013" | "10000016" | "10000042" | "10000027" | "10000044" | "10000045" | "10000046" | "10000047" | "10000048" | "10000049" | "10000043" | "10000057" | "10000056" | "10000075" | "10000076" | "10000077" | "10000078"
export type BusinessUnitExtId = "CDS" | "RBS" | "SSP" | "SCM" | "CFR" | "CFM" | "OFM" | "B2S" | "CHG" | "PWB" | "CPN" | "CMG" | "CRG" | "CHR" | "SU" | "ALL" | "CG"
export type ChangeReasonId = "4" | "5" | "2" | "6" | "3" | "1"
export type CompanyAllId = "C001" | "C002" | "C003" | "C004" | "C005" | "C006" | "C008" | "C010" | "C011" | "C012" | "C013" | "C014" | "C015" | "C031" | "C032" | "C033" | "C034" | "C035" | "C036" | "C037" | "C038" | "C039" | "C040" | "C041" | "C042" | "C043" | "C044" | "C045" | "C047" | "C048" | "C049" | "C050" | "C051" | "C052" | "C053" | "C054" | "C055" | "C056" | "C057" | "C058" | "C059" | "C060" | "C061" | "C062" | "C063" | "C064" | "C065" | "C066" | "C067" | "C068" | "C069" | "C070" | "C071" | "C072" | "C073" | "C074" | "C075" | "C076" | "C077" | "C078" | "C079" | "C080" | "C081" | "C082" | "C083" | "C084" | "C085" | "C086" | "C087" | "C088" | "C089" | "C090" | "C091" | "C092" | "C093" | "C094" | "C095" | "C096" | "C102" | "C103" | "C104" | "C105" | "C106" | "Cxxx" | "C108" | "C112" | "C046" | "C109" | "C110" | "C111" | "C113" | "C009" | "C115" | "C116" | "C117" | "C118" | "C119" | "C120" | "9999" | "V001" | "V002" | "V003" | "V004" | "V005" | "V006" | "V007" | "V008" | "V009" | "V010" | "V011" | "V012" | "V013" | "V014" | "V015" | "V016" | "V017" | "V018" | "V019" | "V020" | "V021" | "V022" | "V023" | "V024" | "V025" | "V026" | "V027" | "V028" | "V029" | "V030" | "V031" | "V032" | "V033" | "V034" | "V035" | "V036" | "V037" | "V038" | "V039" | "V040" | "V041" | "V042" | "V043" | "V044" | "V045" | "V046" | "V047" | "V048" | "V049" | "V050" | "V051" | "V052" | "V053" | "V054" | "V055" | "V056" | "V057" | "V058" | "V059" | "V060" | "V061" | "V062" | "V063" | "V000" | "C159"
export type CorporateTitleId = "69" | "70" | "71" | "90" | "10" | "15" | "20" | "25" | "30" | "35" | "40" | "45" | "50" | "55" | "60" | "61" | "11"
export type CurrencyId = "THB" | "USD" | "EUR" | "SGD" | "MYR" | "HKD" | "JPY" | "GBP"
export type DivisionId = "99999999" | "20000000" | "20000002" | "20000004" | "20000007" | "20000009" | "20000013" | "20000014" | "20000015" | "20000018" | "20000019" | "20000020" | "20000021" | "20000023" | "20000026" | "20000027" | "20000028" | "20000030" | "20000032" | "20000033" | "20000035" | "20000040" | "20000041" | "20000042" | "20000046" | "20000047" | "20000049" | "20000051" | "20000057" | "20000060" | "20000061" | "20000063" | "20000064" | "20000067" | "20000071" | "20000073" | "20000074" | "20000075" | "20000076" | "20000078" | "20000080" | "20000081" | "20000083" | "20000086" | "20000088" | "20000089" | "20000092" | "20000093" | "20000094" | "20000097" | "20000098" | "20000102" | "20000103" | "20000105" | "20000106" | "20000110" | "20000112" | "20000113" | "20000114" | "20000116" | "20000117" | "20000118" | "20000122" | "20000123" | "20000125" | "20000126" | "20000127" | "20000128" | "20000129" | "20000130" | "20000133" | "20000192" | "20000193" | "20000134" | "20000135" | "20000136" | "20000137" | "20000138" | "20000140" | "20000142" | "20000143" | "20000146" | "20000148" | "20000150" | "20000151" | "20000153" | "20000154" | "20000156" | "20000161" | "20000162" | "20000163" | "20000164" | "20000169" | "20000171" | "20000172" | "20000173" | "20000174" | "20000176" | "20000177" | "20000178" | "20000180" | "20000182" | "20000183" | "20000184" | "20000185" | "20000186" | "20000188" | "20000189" | "20000190" | "20000191" | "20000195" | "20000012" | "20000197" | "20000198" | "20000199" | "20000200" | "20000201" | "20000202" | "20000209" | "20000210" | "20000211" | "20000214" | "20000212" | "20000058" | "20000059" | "20000206" | "20000208" | "20000213" | "20000215" | "20000216" | "20000217" | "20000218" | "20000219" | "20000220" | "20000221" | "20000222" | "20000223" | "20000225" | "20000226" | "20000228" | "20000229" | "20000230" | "20000231" | "20000233" | "20000232" | "20000246" | "20000234" | "20000235" | "20000236" | "20000237" | "20000238" | "20000239" | "20000240" | "20000241" | "20000242" | "20000243" | "20000245" | "20000248" | "20000006" | "20000054" | "20000065" | "20000072" | "20000077" | "20000079" | "20000084" | "20000087" | "20000095" | "20000100" | "20000124" | "20000144" | "20000244" | "20000250" | "20000251" | "20000252" | "20000253" | "20000254" | "20000255" | "20000256" | "20000257" | "20000259" | "20000260" | "20000261" | "20000262" | "20000263" | "20000264" | "20000265" | "20000266" | "20000016" | "20000267" | "20000268" | "20000269" | "20000270" | "20000271" | "20000272" | "20000273" | "20000274" | "20000275" | "20000276" | "20000277" | "20000278" | "20000334" | "20000335" | "20000336" | "20000337" | "20000338" | "20000339" | "20000340" | "20000341" | "20000342" | "20000343" | "20000344" | "20000345" | "20000346" | "20000347" | "20000348" | "20000349" | "20000350" | "20000351" | "20000352" | "20000353" | "20000354" | "20000355" | "20000356" | "20000357" | "20000358" | "20000359" | "20000360" | "20000361" | "20000362" | "20000363" | "20000364" | "20000365" | "20000366" | "20000367" | "20000368" | "20000369" | "20000370" | "20000371" | "20000372" | "20000373" | "20000374" | "20000375" | "20000376" | "20000377" | "20000378" | "20000379" | "20000380" | "20000381" | "20000382" | "20000383" | "20000384" | "20000385" | "20000386" | "20000387" | "20000388" | "20000389" | "20000390" | "20000391" | "20000392" | "20000393" | "20000394" | "20000395" | "20000396" | "20000397" | "20000398" | "20000399" | "20000400" | "20000401" | "20000402" | "20000403" | "20000404" | "20000405" | "20000406" | "20000407" | "20000408" | "20000409" | "20000410" | "20000411" | "20000412" | "20000413" | "20000414" | "20000415" | "20000416" | "20000417" | "20000418" | "20000419" | "20000420" | "20000421" | "20000422" | "20000423" | "20000424" | "20000425" | "20000426" | "20000427" | "20000428" | "20000429" | "20000430" | "20000431" | "20000432" | "20000433" | "20000434" | "20000435" | "20000436" | "20000437" | "20000438" | "20000439" | "20000440" | "20000441" | "20000442" | "20000443" | "20000444" | "20000445" | "20000446" | "20000447" | "20000448" | "20000449" | "20000450" | "20000451" | "20000452" | "20000453" | "20000454" | "20000455" | "20000456" | "20000457" | "20000458" | "20000459" | "20000460" | "20000461" | "20000462" | "20000463" | "20000464" | "20000465" | "20000466" | "20000467" | "20000468" | "20000469" | "20000470" | "20000471" | "20000472" | "20000473" | "20000474" | "20000475" | "20000476" | "20000477" | "20000478" | "20000479" | "20000480" | "20000481" | "20000482" | "20000483" | "20000484" | "20000485" | "20000486" | "20000487" | "20000488" | "20000489" | "20000490" | "20000491" | "20000492" | "20000493" | "20000494" | "20000495" | "20000496" | "20000497" | "20000498" | "20000499" | "20000500" | "20000501" | "20000502" | "20000503" | "20000504" | "20000505" | "20000506" | "20000507" | "20000508" | "20000509" | "20000510" | "20000511" | "20000512" | "20000513" | "20000514" | "20000515" | "20000516" | "20000517" | "20000518" | "20000519" | "20000520" | "20000521" | "20000522" | "20000523" | "20000524" | "20000525" | "20000526" | "20000527" | "20000528" | "20000529" | "20000530" | "20000531" | "20000532" | "20000533" | "20000534" | "20000535" | "20000536" | "20000537" | "20000538" | "20000539" | "20000540" | "20000541" | "20000542" | "20000333" | "20000544" | "20000545"
export type DynamicRoleId = "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "SESAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin" | "DataAdmin"
export type EmployeeClassId = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H"
export type EmployeeClassExtId = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H"
export type EmploymentTypeId = "13" | "Y8" | "14" | "Y9" | "15" | "YA" | "16" | "YB" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "P1" | "P2" | "P3" | "D1" | "D2" | "T2" | "C2" | "C3" | "C4" | "C5" | "C6" | "UC" | "T1" | "X7" | "C1" | "X8" | "X9" | "XA" | "10" | "XB" | "11" | "Y7" | "12" | "07" | "08" | "09" | "P5" | "T3"
export type EventReasonAllId = "CG_RETIRE" | "COMPROB_COMPROB" | "DC_CHGINPAY" | "DC_CHGINSSO" | "DC_CHGINTM" | "DC_SC" | "DC_CHGINMGR" | "DC_EXTPROB" | "DC_EXTRET" | "POSCHG_POSCHG" | "DM" | "HIREDM" | "H_CORENTRY" | "H_INENTRY" | "H_NEWHIRE" | "H_RPLMENT" | "H_TEMPASG" | "JCHG_EMPTYPE" | "PRCHG_MERINC" | "PRCHG_ADJPOS" | "PRCHG_PROMO" | "PRCHG_SALADJ" | "PRCHG_SALCUT" | "REORG_REORG" | "PRM_DEMO" | "PRM_PRM" | "TERM_RETIRE" | "RE_REHIRE_GE1" | "RE_REHIRE_LT1" | "SUSP_SUSP" | "TERM_DISMISS" | "TERM_DM" | "TERM_ENDASSIGN" | "TERM_EOC" | "TERM_ERLRETIRE" | "TERM_LAYOFF" | "TERM_NOSHOW" | "TERM_PASSAWAY" | "TERM_RESIGN" | "TERM_REORG" | "TERM_TRANS" | "TERM_UNSUCPROB" | "TRN_ROTATION" | "TRN_TRNACCOMP" | "TRN_TRNWIC" | "DC_DC" | "TERM_COVID" | "DC_EXCONT" | "TERM_ABSENT" | "DC_CHGINLO" | "TERM_REDUNDANCY" | "RESUSP_RESUSP"
export type EventReasonHireId = "H_NEWHIRE" | "H_RPLMENT" | "H_TEMPASG" | "HIREDM" | "H_CORENTRY" | "H_INENTRY"
export type EventReasonTermId = "TERM_RESIGN" | "TERM_EOC" | "TERM_RETIRE" | "TERM_ERLRETIRE" | "TERM_DISMISS" | "TERM_LAYOFF" | "TERM_REORG" | "TERM_REDUNDANCY" | "TERM_ENDASSIGN" | "TERM_UNSUCPROB" | "TERM_PASSAWAY" | "TERM_NOSHOW" | "TERM_TRANS" | "TERM_DM" | "TERM_COVID" | "TERM_CRISIS" | "TERM_ABSENT"
export type EventReasonTransId = "TRN_TRNWIC" | "TRN_TRNACCOMP" | "TRN_ROTATION"
export type FrequencyId = "TDP" | "DLY" | "NON" | "MON" | "ANN" | "HRS"
export type GenderId = "M" | "F" | "X"
export type JobFunctionId = "99999999" | "BDA" | "BDB" | "CSA" | "CSB" | "EAC" | "EMA" | "FAA" | "FAB" | "FAD" | "FBA" | "FBB" | "FBC" | "FBD" | "GAA" | "GAB" | "GAC" | "GAD" | "HRA" | "HRB" | "HTA" | "HTB" | "HTC" | "HTD" | "HTE" | "HTF" | "IAA" | "IAB" | "IAC" | "LCB" | "MKA" | "MKB" | "MKC" | "MKD" | "MKE" | "MKH" | "MKI" | "PRA" | "PRB" | "PSA" | "PSB" | "PSC" | "PSD" | "PSE" | "PSF" | "PSG" | "PTA" | "PTB" | "PTC" | "QAA" | "QAB" | "RKA" | "SLA" | "SLB" | "SLC" | "SLE" | "SPA" | "SPC" | "STA" | "STB" | "STC" | "STD" | "STE" | "BDC" | "BMD" | "CSC" | "FAE" | "FAF" | "FAG" | "FAH" | "GAE" | "HRF" | "HRG" | "HRH" | "ITE" | "ITF" | "ITG" | "ITH" | "ITI" | "LCC" | "LCD" | "LCE" | "LDH" | "LDI" | "MKJ" | "MKK" | "PDA" | "PDB" | "PMA" | "PMB" | "PMC" | "QAC" | "SDA" | "SDB" | "SLF" | "SLG" | "SSA" | "SSB" | "BIA" | "BIB" | "BIC" | "BMA" | "BMB" | "BMC" | "EAA" | "EAB" | "EAD" | "EAE" | "EAF" | "FAC" | "HRC" | "HRD" | "HRE" | "ITA" | "ITB" | "ITC" | "ITD" | "LCA" | "LDA" | "LDB" | "LDC" | "LDD" | "LDE" | "LDF" | "LDG" | "LPA" | "LPB" | "LPC" | "MKF" | "MKG" | "SLD" | "SPB"
export type JobTypeId = "A04" | "A05" | "A01" | "A02" | "A03"
export type ManagementProgramId = "MA" | "OT" | "MT"
export type MaritalStatusId = "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED" | "SEPARATED"
export type NationalityId = "TH" | "MM" | "KH" | "LA" | "VN" | "PH" | "ID" | "MY" | "SG" | "IN" | "CN" | "JP" | "KR" | "US" | "GB" | "AU" | "DE" | "FR" | "NL" | "OTHER"
export type PayComponentId = "BE01" | "VN_1004" | "VN_1000" | "TH_1004" | "TH_1003" | "TH_1002" | "TH_1001" | "TH_1000"
export type PayComponentGroupId = "BE01" | "TH_1004" | "TH_1000" | "TH_1001" | "TH_1002" | "TH_1003" | "VN_1000" | "AnnualizedSalary" | "VN_1004"
export type PayFrequencyId = "NON" | "MON" | "DLY" | "BIW" | "WKY" | "SMY"
export type PolicyProfileId = "SCM" | "PWB" | "OFM" | "CRG" | "CPN" | "CMG" | "CHR" | "CHG" | "CFR" | "CFM" | "B2S" | "SSP" | "RBS" | "CDS" | "999" | "SU-CMC & SDO" | "SU-MA" | "SU-INTERNAL AUDIT" | "SU-CIS" | "SU-T1C" | "SU-CNG" | "SU-CGO" | "SU-OTHER" | "SU-FAST" | "SU-BD" | "SU-RIS" | "SU-HR"
export type PropertyTypeId = "CFR" | "BIG" | "WHS" | "OFF" | "CHR" | "GAS" | "FAC" | "HOS" | "OTH" | "CPN" | "CDS" | "CHG" | "RBS" | "MAL" | "TES" | "RES" | "CON" | "TOU" | "MKT" | "TRN" | "SPM" | "IND" | "UNI"
export type RegularTemporaryId = "F" | "P"
export type RelationshipTypeId = "1" | "2" | "3" | "4"
export type ReligionId = "BUDDHIST" | "MUSLIM" | "CHRISTIAN" | "CATHOLIC" | "HINDU" | "SIKH" | "JUDAISM" | "CONFUCIANISM" | "NONE" | "OTHER"
export type TimeStatusId = "1" | "2" | "3" | "4" | "5" | "9" | "99" | "10"
