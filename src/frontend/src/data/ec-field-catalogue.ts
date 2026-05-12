// Auto-generated from /Users/tachongrak/Downloads/EC- list of fields(Employee file)_final.csv
// Source encoding: CP1252. Regenerate with scripts/generate-ec-field-catalogue.py.

export type ECFieldProcess = 'Hiring' | 'Maintain';
export type ECFieldProfileTab = 'personal' | 'employment' | 'compensation' | 'emergency' | 'documents' | 'activity';
export type ECFieldMandatoryKind = 'required' | 'conditional' | 'optional';
export type ECFieldEditabilityKind = 'editable' | 'fixed' | 'history_log' | 'unspecified';
export type ECFieldValidationStatus = 'pending_review' | 'confirmed' | 'needs_change' | 'not_applicable';

export type ECFieldCatalogueItem = {
  fieldId: string;
  sourceRow: number;
  process: ECFieldProcess;
  section: string;
  subSection: string;
  profileTab: ECFieldProfileTab;
  label: string;
  labelEn: string;
  mandatoryRule: string;
  conditionalRule: string;
  mandatoryKind: ECFieldMandatoryKind;
  employeeGroups: Array<{ group: string; rule: string }>;
  editability: string;
  editabilityKind: ECFieldEditabilityKind;
  defaultValue: string;
  validationNote: string;
  hrConfirmLogic: string;
  hrConfirmRequired: boolean;
  hrConfirmDetail: string;
  remark: string;
  maintainEditType: string;
  maintainOwners: string[];
  dbMapping: { table: string; field: string; type: string; length: string; lov: string };
  validationStatus: ECFieldValidationStatus;
  reviewerComment: string;
  reviewTimestamp: string;
};

export const EC_FIELD_CATALOGUE_SUMMARY = {
  "totalFields": 593,
  "byProcess": {
    "Hiring": 205,
    "Maintain": 388
  },
  "bySection": {
    "Identity": 20,
    "Personal Information": 105,
    "Job Information": 80,
    "Compensation Information": 17,
    "Employment Information": 20,
    "compensation Information": 4,
    "Profile": 345,
    "Time Management": 2
  },
  "byProfileTab": {
    "documents": 84,
    "personal": 268,
    "emergency": 39,
    "employment": 154,
    "compensation": 46,
    "activity": 2
  },
  "sourceCsv": "/Users/tachongrak/Downloads/EC- list of fields(Employee file)_final.csv",
  "sourceEncoding": "CP1252",
  "generatedAt": "2026-05-12T00:00:00.000Z"
} as const;

export const EC_FIELD_CATALOGUE = [
  {
    "fieldId": "ec-006-hiring-identity-general-hire-date",
    "sourceRow": 6,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "General",
    "profileTab": "documents",
    "label": "Hire Date",
    "labelEn": "Hire Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Default to current date ( Hire Date is editable; the system allows changes to both past and future dates. )",
    "validationNote": "hire date (future / as-is / Needs HR review-Needs HR review payroll?",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [
      "HRIS"
    ],
    "dbMapping": {
      "table": "Employment",
      "field": "HIRE_DATE",
      "type": "LOV",
      "length": "xx",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-007-hiring-identity-general-company",
    "sourceRow": 7,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "General",
    "profileTab": "documents",
    "label": "Company",
    "labelEn": "Company",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [
      "HRIS"
    ],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "COMPANY_CODE",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-008-hiring-identity-general-event-reason",
    "sourceRow": 8,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "General",
    "profileTab": "documents",
    "label": "Event reason",
    "labelEn": "Event reason",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "EVENT_REASON",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-009-hiring-identity-name-information-salutation-en",
    "sourceRow": 9,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "Name Information",
    "profileTab": "documents",
    "label": "Salutation (EN)",
    "labelEn": "Salutation (EN)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "SALUTATION_EN",
      "type": "LOV",
      "length": "",
      "lov": "salutation"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-010-hiring-identity-name-information-firstname-en",
    "sourceRow": 10,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "Name Information",
    "profileTab": "documents",
    "label": "Firstname (EN)",
    "labelEn": "Firstname (EN)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "FIRSTNAME_EN",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-011-hiring-identity-name-information-middle-name-en",
    "sourceRow": 11,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "Name Information",
    "profileTab": "documents",
    "label": "Middle Name (EN)",
    "labelEn": "Middle Name (EN)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "MIDDLENAME_EN",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-012-hiring-identity-name-information-lastname-en",
    "sourceRow": 12,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "Name Information",
    "profileTab": "documents",
    "label": "Lastname (EN)",
    "labelEn": "Lastname (EN)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "LASTNAME_EN",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-014-hiring-identity-biographical-info-date-of-birth",
    "sourceRow": 14,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "Biographical Info",
    "profileTab": "documents",
    "label": "Date of Birth",
    "labelEn": "Date of Birth",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "1.not possible to use the Buddhist Era (B.E.)2.Age <153.Recruit Date should be greater than Date of Birth.",
    "hrConfirmLogic": "1 not possible to use the Buddhist Era (B.E.)2Age <15",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "Age <15",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Biographical Info",
      "field": "DATE_OF_BIRTH",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-015-hiring-identity-biographical-info-country-of-birth",
    "sourceRow": 15,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "Biographical Info",
    "profileTab": "documents",
    "label": "Country of Birth",
    "labelEn": "Country of Birth",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Biographical Info",
      "field": "COUNTRY_OF_BIRTH",
      "type": "LOV",
      "length": "",
      "lov": "ISOCountryList"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-016-hiring-identity-biographical-info-region-of-birth",
    "sourceRow": 16,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "Biographical Info",
    "profileTab": "documents",
    "label": "Region of Birth",
    "labelEn": "Region of Birth",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Biographical Info",
      "field": "Region of Birth",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-017-hiring-identity-biographical-info-age",
    "sourceRow": 17,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "Biographical Info",
    "profileTab": "documents",
    "label": "Age",
    "labelEn": "Age",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Age = (Current Date - Birth Date + 1) / 365.25; display as Year.Month (no rounding).Generation = auto-derived from Birth Year based on standard generation ranges.",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Biographical Info",
      "field": "Age",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-020-hiring-identity-employee-information-employee-id",
    "sourceRow": 20,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "Employee Information",
    "profileTab": "documents",
    "label": "Employee ID",
    "labelEn": "Employee ID",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-generated after all required fields are completed and submitted; 8 digits, starts with “2”, unique running number",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-021-hiring-identity-national-id-information-national-id-card-type",
    "sourceRow": 21,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "National ID Information",
    "profileTab": "documents",
    "label": "National ID Card Type",
    "labelEn": "National ID Card Type",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "Needs HR review case Needs HR review country / National ID Card Type / National ID Needs HR review 1 Needs HR review-> (Needs HR review)",
    "remark": "National ID Card Type 1.Thai National Identification Number – Use for normal employee 2.Thai National Identification Number (2) – Use incase employee was hired by two companies in CG group in the same time (Paid salary with two companies) -> add on condition excel",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "National ID",
      "field": "NATIONAL ID CARD TYPE",
      "type": "Text",
      "length": "",
      "lov": "idType_ID_Card"
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-023-hiring-identity-national-id-information-country",
    "sourceRow": 23,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "National ID Information",
    "profileTab": "documents",
    "label": "Country",
    "labelEn": "Country",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "National ID",
      "field": "COUNTRY",
      "type": "LOV",
      "length": "",
      "lov": "ISOCountryList"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-024-hiring-identity-national-id-information-national-id",
    "sourceRow": 24,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "National ID Information",
    "profileTab": "documents",
    "label": "National ID",
    "labelEn": "National ID",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "-System should auto-insert hyphens (-) in the National ID field during input",
    "validationNote": "-Thai National Identification :N-NNNN-NNNNN-NN-N-VN ID Card Number : NNNNNNNNN2. Validate National ID must be unique; system shall check for duplicates and reject if already exists , Validate uniqueness on submit",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "Needs HR review TAX ID Needs HR review thai national -> 13 digitsNo need to add all of country natioanl ID validation logic",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "National ID",
      "field": "NATIONAL_ID",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-025-hiring-identity-national-id-information-issue-date",
    "sourceRow": 25,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "National ID Information",
    "profileTab": "documents",
    "label": "Issue Date",
    "labelEn": "Issue Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "National ID",
      "field": "ISSUE_DATE",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-026-hiring-identity-national-id-information-expiry-date",
    "sourceRow": 26,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "National ID Information",
    "profileTab": "documents",
    "label": "Expiry Date",
    "labelEn": "Expiry Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "> Hire date",
    "hrConfirmLogic": "> Hire date",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "National ID",
      "field": "EXPIRY_DATE",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-027-hiring-identity-national-id-information-is-primary",
    "sourceRow": 27,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "National ID Information",
    "profileTab": "documents",
    "label": "Is Primary",
    "labelEn": "Is Primary",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Defualt selected as yes (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "National ID",
      "field": "ISPRIMARY",
      "type": "LOV",
      "length": "",
      "lov": "Yes/No"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-030-hiring-identity-national-id-information-vn-issue-place",
    "sourceRow": 30,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "National ID Information",
    "profileTab": "documents",
    "label": "[VN] Issue Place",
    "labelEn": "[VN] Issue Place",
    "mandatoryRule": "",
    "conditionalRule": "",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "",
    "editabilityKind": "unspecified",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "Use only for VN",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "National ID",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-031-hiring-identity-national-id-information-attachment",
    "sourceRow": 31,
    "process": "Hiring",
    "section": "Identity",
    "subSection": "National ID Information",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Allow file types: .pdf, .jpg, .jpeg, .png, , pptx ;.xlsx; Max size: 10 MB. -> apply all",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "National ID",
      "field": "Attachment",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-033-hiring-personal-information-personal-information-salutation-local",
    "sourceRow": 33,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Salutation (Local)",
    "labelEn": "Salutation (Local)",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "IF Salutation_EN = \"Mr.\" THEN Salutation_Local = \"Needs HR review\"ELSE IF Salutation_EN = \"Mrs.\" THEN Salutation_Local = \"Needs HR review\"ELSE IF Salutation_EN = \"Miss\" THEN Salutation_Local = \"Needs HR review\"",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "SALUTATION (LOCAL)",
      "type": "LOV",
      "length": "",
      "lov": "salutation"
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-034-hiring-personal-information-personal-information-other-title-th",
    "sourceRow": 34,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Other Title (TH)",
    "labelEn": "Other Title (TH)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "TITLE_TH",
      "type": "LOV",
      "length": "",
      "lov": "zOtherTitle"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-035-hiring-personal-information-personal-information-firstname-local",
    "sourceRow": 35,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Firstname (Local)",
    "labelEn": "Firstname (Local)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "FIRSTNAME (LOCAL)",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-036-hiring-personal-information-personal-information-lastname-local",
    "sourceRow": 36,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Lastname (Local)",
    "labelEn": "Lastname (Local)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "LASTNAME (LOCAL)",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-037-hiring-personal-information-personal-information-middle-name-local",
    "sourceRow": 37,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Middle Name (Local)",
    "labelEn": "Middle Name (Local)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "Needs HR confirmation",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "MIDDLENAME(LOCAL)",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-038-hiring-personal-information-personal-information-nickname-en-th",
    "sourceRow": 38,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Nickname (EN/TH)",
    "labelEn": "Nickname (EN/TH)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "NICKNAME",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-039-hiring-personal-information-personal-information-gender",
    "sourceRow": 39,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Gender",
    "labelEn": "Gender",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "1.If Salution(local) isMrs. / Miss / Needs HR review / Needs HR review gender = Female2.If Salution(local) isMr. / Needs HR review gender = Male",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "GENDER",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-040-hiring-personal-information-personal-information-nationality",
    "sourceRow": 40,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Nationality",
    "labelEn": "Nationality",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "NATIONALITY",
      "type": "LOV",
      "length": "",
      "lov": "ISOCountryList"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-041-hiring-personal-information-personal-information-foreigner",
    "sourceRow": 41,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Foreigner",
    "labelEn": "Foreigner",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Nationality <>TH = Yes",
    "validationNote": "Nationality <>TH",
    "hrConfirmLogic": "Nationality <>TH",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "FOREIGNER",
      "type": "LOV",
      "length": "",
      "lov": "Yes/No/No selection"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-042-hiring-personal-information-personal-information-blood-type",
    "sourceRow": 42,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Blood Type",
    "labelEn": "Blood Type",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "BLOODTYPE",
      "type": "LOV",
      "length": "",
      "lov": "BLOODGROUP"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-043-hiring-personal-information-personal-information-marital-status",
    "sourceRow": 43,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Marital Status",
    "labelEn": "Marital Status",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "IF Salutation_EN IN (\"Mrs.\", \"Miss\") THEN Military_Status = \"Exempt\" Military_Status Field = EditableELSE IF Salutation_EN = \"Mr.\" THEN Military_Status = \"No selection\" Military_Status Field = Editable",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "MARITAL_STATUS",
      "type": "LOV",
      "length": "",
      "lov": "ecMaritalStatus"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-044-hiring-personal-information-personal-information-marital-status-since",
    "sourceRow": 44,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "personal",
    "label": "Marital Status Since",
    "labelEn": "Marital Status Since",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "Marital Status Since",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-045-hiring-personal-information-personal-information-number-of-children",
    "sourceRow": 45,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "emergency",
    "label": "Number of Children",
    "labelEn": "Number of Children",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "CHILDEN_NUMBER",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-048-hiring-personal-information-personal-information-attachment",
    "sourceRow": 48,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Personal Information",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Allow file types: .pdf, .jpg, .jpeg, .png, , pptx ;.xlsx; Max size: 10 MB. -> apply all",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": "ISOCountryList"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-049-hiring-personal-information-global-information-country-region",
    "sourceRow": 49,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "personal",
    "label": "Country/Region",
    "labelEn": "Country/Region",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Default value as Thailand (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "Support for adding global information for one dataset is sufficient.",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Personal Info",
      "field": "",
      "type": "",
      "length": "",
      "lov": "No selection / Thailand/Vietnam"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-050-hiring-personal-information-global-information-number-of-children",
    "sourceRow": 50,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "emergency",
    "label": "Number of children",
    "labelEn": "Number of children",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Global Information",
      "field": "Number of Children",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-051-hiring-personal-information-global-information-religion",
    "sourceRow": 51,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "personal",
    "label": "Religion",
    "labelEn": "Religion",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Global Information",
      "field": "Religion",
      "type": "LOV",
      "length": "",
      "lov": "RELIGION_THA"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-052-hiring-personal-information-global-information-disability-status",
    "sourceRow": 52,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "personal",
    "label": "Disability Status",
    "labelEn": "Disability Status",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Global Information",
      "field": "Disability Status",
      "type": "LOV",
      "length": "",
      "lov": "Yes/No/No selection"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-053-hiring-personal-information-global-information-disability-certificate-",
    "sourceRow": 53,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "documents",
    "label": "Disability Certificate Start Date",
    "labelEn": "Disability Certificate Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Disability Status = Yes Required",
    "hrConfirmLogic": "Disability Status = Yes Required",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Global Information",
      "field": "Disability Certificate Start Date",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-054-hiring-personal-information-global-information-disability-certificate-",
    "sourceRow": 54,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "documents",
    "label": "Disability Certificate End Date",
    "labelEn": "Disability Certificate End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Disability Status = Yes Required",
    "hrConfirmLogic": "Disability Status = Yes Required",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Global Information",
      "field": "Disability Certificate End Date",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-055-hiring-personal-information-global-information-type-of-disability",
    "sourceRow": 55,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "personal",
    "label": "Type of Disability",
    "labelEn": "Type of Disability",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Disability Status = Yes Required",
    "hrConfirmLogic": "Disability Status = Yes Required",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "Needs HR confirmation",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Global Information",
      "field": "Type of Disability",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-056-hiring-personal-information-global-information-certificate-id",
    "sourceRow": 56,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "documents",
    "label": "Certificate ID",
    "labelEn": "Certificate ID",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Disability Status = Yes Required",
    "hrConfirmLogic": "Disability Status = Yes Required",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Global Information",
      "field": "Certificate ID",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-057-hiring-personal-information-global-information-spouse-s-father-id-numb",
    "sourceRow": 57,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "emergency",
    "label": "Spouse's Father ID Number",
    "labelEn": "Spouse's Father ID Number",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Global Information",
      "field": "Spouse's Father ID Number",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-058-hiring-personal-information-global-information-spouse-s-mother-id-numb",
    "sourceRow": 58,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "emergency",
    "label": "Spouse's Mother ID Number",
    "labelEn": "Spouse's Mother ID Number",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Global Information",
      "field": "Spouse's Mother ID Number",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-059-hiring-personal-information-global-information-additional-information",
    "sourceRow": 59,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Global Information",
    "profileTab": "personal",
    "label": "Additional Information",
    "labelEn": "Additional Information",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Global Information",
      "field": "Additional Information",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-060-hiring-personal-information-email-information-email-type",
    "sourceRow": 60,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Email Information",
    "profileTab": "personal",
    "label": "Email Type",
    "labelEn": "Email Type",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Email Info",
      "field": "EMAIL TYPE",
      "type": "LOV",
      "length": "",
      "lov": "ecEmailType"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-062-hiring-personal-information-email-information-email-address",
    "sourceRow": 62,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Email Information",
    "profileTab": "personal",
    "label": "Email Address",
    "labelEn": "Email Address",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Validate email format and reject invalid entries.",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "Confirm w/Needs HR confirmationCan add more than 1 email on UI(business email (Intregration for business email -> user single sign on / personal email)",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Email Info",
      "field": "EMAIL",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-063-hiring-personal-information-email-information-is-primary",
    "sourceRow": 63,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Email Information",
    "profileTab": "personal",
    "label": "Is Primary",
    "labelEn": "Is Primary",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Defualt selected as yes (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Email Info",
      "field": "ISPRIMARY",
      "type": "LOV",
      "length": "",
      "lov": "Yes/No"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-066-hiring-personal-information-phone-information-phone-type",
    "sourceRow": 66,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Phone Information",
    "profileTab": "personal",
    "label": "Phone Type",
    "labelEn": "Phone Type",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Phone Info",
      "field": "PHONE TYPE",
      "type": "LOV",
      "length": "",
      "lov": "ecPhoneType"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-068-hiring-personal-information-phone-information-country-code",
    "sourceRow": 68,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Phone Information",
    "profileTab": "personal",
    "label": "Country Code",
    "labelEn": "Country Code",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Default country code to “66”; editable.",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Phone Info",
      "field": "COUNTRY_CODE",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-069-hiring-personal-information-phone-information-phone-number",
    "sourceRow": 69,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Phone Information",
    "profileTab": "personal",
    "label": "Phone Number",
    "labelEn": "Phone Number",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Numeric only (0–9)'validate by type of phone type 'if has 66 , validate that no need to add 0",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "Can add more than 1 phone number on UI",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Phone Info",
      "field": "PHONE_NUMBER",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-070-hiring-personal-information-phone-information-extension",
    "sourceRow": 70,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Phone Information",
    "profileTab": "personal",
    "label": "Extension",
    "labelEn": "Extension",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Type = Mobile (hidden)",
    "hrConfirmLogic": "Type = Mobile (hidden)",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Phone Info",
      "field": "Extension",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-071-hiring-personal-information-phone-information-is-primary",
    "sourceRow": 71,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Phone Information",
    "profileTab": "personal",
    "label": "Is Primary",
    "labelEn": "Is Primary",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Defualt selected as yes (editable)",
    "validationNote": "Only one number",
    "hrConfirmLogic": "Only one number",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Phone Info",
      "field": "ISPRIMARY",
      "type": "LOV",
      "length": "",
      "lov": "Yes/No"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-074-hiring-personal-information-social-accounts-information-domain",
    "sourceRow": 74,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Social Accounts Information",
    "profileTab": "personal",
    "label": "Domain",
    "labelEn": "Domain",
    "mandatoryRule": "",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF Social Accounts Information are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": "imdomain"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-075-hiring-personal-information-social-accounts-information-instant-messag",
    "sourceRow": 75,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Social Accounts Information",
    "profileTab": "personal",
    "label": "Instant Messaging ID",
    "labelEn": "Instant Messaging ID",
    "mandatoryRule": "",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF Social Accounts Information are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-076-hiring-personal-information-social-accounts-information-url",
    "sourceRow": 76,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Social Accounts Information",
    "profileTab": "personal",
    "label": "URL",
    "labelEn": "URL",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-077-hiring-personal-information-addresses-address-type",
    "sourceRow": 77,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Address Type",
    "labelEn": "Address Type",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Default selected \"Permanent\" (editable)",
    "validationNote": "Currenttype can click copy Address from Permanent",
    "hrConfirmLogic": "Currenttype can click copy Address from Permanent",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "After select country ( system only validate and show on UI for field use for thailand address detail or vietnam address detail",
    "remark": "Needs HR review",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "ADDRESS_TYPE",
      "type": "LOV",
      "length": "",
      "lov": "addressType"
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-079-hiring-personal-information-addresses-floor",
    "sourceRow": 79,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Floor",
    "labelEn": "Floor",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "FLOOR",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-080-hiring-personal-information-addresses-room-no",
    "sourceRow": 80,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Room No.",
    "labelEn": "Room No.",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "ROOM NO",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-081-hiring-personal-information-addresses-village",
    "sourceRow": 81,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Village",
    "labelEn": "Village",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "VILLAGE",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-082-hiring-personal-information-addresses-house-number",
    "sourceRow": 82,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "House Number",
    "labelEn": "House Number",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "HOUSE_NUMBER",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-083-hiring-personal-information-addresses-building",
    "sourceRow": 83,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Building",
    "labelEn": "Building",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "BUILDING",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-084-hiring-personal-information-addresses-street",
    "sourceRow": 84,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Street",
    "labelEn": "Street",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "STREET",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-085-hiring-personal-information-addresses-moo",
    "sourceRow": 85,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Moo",
    "labelEn": "Moo",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "MOO",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-086-hiring-personal-information-addresses-lane-soi",
    "sourceRow": 86,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Lane / Soi",
    "labelEn": "Lane / Soi",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "SOI",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-087-hiring-personal-information-addresses-district",
    "sourceRow": 87,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "District",
    "labelEn": "District",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "1.IF Province is selectedTHEN filter District by selected Province2.IF District is selectedTHEN filter Sub-District by selected District3.IF Sub-District is selectedTHEN auto-populate Postal Code4.IF Province is changedTHEN clear District, Sub-District, and Postal Code5.IF District is changedTHEN clear Sub-District and Postal Code",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "DISTRICT",
      "type": "LOV",
      "length": "",
      "lov": "zDistrict"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-088-hiring-personal-information-addresses-sub-district",
    "sourceRow": 88,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Sub-District",
    "labelEn": "Sub-District",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Refer G87",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "SUB_DISTRICT",
      "type": "LOV",
      "length": "",
      "lov": "zSubDistrict"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-089-hiring-personal-information-addresses-province",
    "sourceRow": 89,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Province",
    "labelEn": "Province",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Refer G87",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "PROVINCE",
      "type": "LOV",
      "length": "",
      "lov": "zProvince"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-090-hiring-personal-information-addresses-postal-code",
    "sourceRow": 90,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Postal Code",
    "labelEn": "Postal Code",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Refer G87",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "POSTAL_CODE",
      "type": "LOV",
      "length": "",
      "lov": "zPostalCode"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-091-hiring-personal-information-addresses-country",
    "sourceRow": 91,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "Country",
    "labelEn": "Country",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Default selected \"Thailand\" (editable)",
    "validationNote": "Refer G87",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "COUNTRY",
      "type": "LOV",
      "length": "",
      "lov": "country"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-094-hiring-personal-information-addresses-attachment",
    "sourceRow": 94,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Allow file types: .pdf, .jpg, .jpeg, .png, , pptx ;.xlsx; Max size: 10 MB. -> apply all",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Addresses",
      "field": "Attachment",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-095-hiring-personal-information-addresses-sys-ec-py-provincecode",
    "sourceRow": 95,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "sys_EC-PY_ProvinceCode",
    "labelEn": "sys_EC-PY_ProvinceCode",
    "mandatoryRule": "",
    "conditionalRule": "",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "",
    "editabilityKind": "unspecified",
    "defaultValue": "",
    "validationNote": "Duplicate EC to send to payroll intregrationcan use direct fields or not? (send to payroll)If yes can delete this field-> already confirm w/Needs HR confirmation (no need for payroll)",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "Confirm with Needs HR confirmation LOV same or not (EC/payroll)",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-096-hiring-personal-information-addresses-sys-ec-py-provincetext",
    "sourceRow": 96,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "sys_EC-PY_ProvinceText",
    "labelEn": "sys_EC-PY_ProvinceText",
    "mandatoryRule": "",
    "conditionalRule": "",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "",
    "editabilityKind": "unspecified",
    "defaultValue": "",
    "validationNote": "Duplicate EC to send to payroll intregrationcan use direct fields or not? (send to payroll)If yes can delete this field-> already confirm w/Needs HR confirmation (no need for payroll)",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "Confirm with Needs HR confirmation LOV same or not (EC/payroll)",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-097-hiring-personal-information-addresses-sys-ec-py-district",
    "sourceRow": 97,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "sys_EC-PY_District",
    "labelEn": "sys_EC-PY_District",
    "mandatoryRule": "",
    "conditionalRule": "",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "",
    "editabilityKind": "unspecified",
    "defaultValue": "",
    "validationNote": "Duplicate EC to send to payroll intregrationcan use direct fields or not? (send to payroll)If yes can delete this field-> already confirm w/Needs HR confirmation (no need for payroll)",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "Confirm with Needs HR confirmation LOV same or not (EC/payroll)",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-098-hiring-personal-information-addresses-sys-ec-py-subdistrict",
    "sourceRow": 98,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "sys_EC-PY_SubDistrict",
    "labelEn": "sys_EC-PY_SubDistrict",
    "mandatoryRule": "",
    "conditionalRule": "",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "",
    "editabilityKind": "unspecified",
    "defaultValue": "",
    "validationNote": "Duplicate EC to send to payroll intregrationcan use direct fields or not? (send to payroll)If yes can delete this field-> already confirm w/Needs HR confirmation (no need for payroll)",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "Confirm with Needs HR confirmation LOV same or not (EC/payroll)",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-099-hiring-personal-information-addresses-sys-ec-py-postalcode",
    "sourceRow": 99,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Addresses",
    "profileTab": "personal",
    "label": "sys_EC-PY_PostalCode",
    "labelEn": "sys_EC-PY_PostalCode",
    "mandatoryRule": "",
    "conditionalRule": "",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "",
    "editabilityKind": "unspecified",
    "defaultValue": "",
    "validationNote": "Duplicate EC to send to payroll intregrationcan use direct fields or not? (send to payroll)If yes can delete this field-> already confirm w/Needs HR confirmation (no need for payroll)",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "Confirm with Needs HR confirmation LOV same or not (EC/payroll)",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-100-hiring-personal-information-primary-emergency-contact-name",
    "sourceRow": 100,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Primary Emergency Contact",
    "profileTab": "emergency",
    "label": "Name",
    "labelEn": "Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF Primary Emergency Contact are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "User can add and miantain for more 1 data set (support, prefer to have 2 data set )",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emergency Contact",
      "field": "NAME",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-101-hiring-personal-information-primary-emergency-contact-relationship",
    "sourceRow": 101,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Primary Emergency Contact",
    "profileTab": "emergency",
    "label": "Relationship",
    "labelEn": "Relationship",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF Primary Emergency Contact are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emergency Contact",
      "field": "RELATIONSHIP",
      "type": "LOV",
      "length": "",
      "lov": "relation"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-102-hiring-personal-information-primary-emergency-contact-primary",
    "sourceRow": 102,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Primary Emergency Contact",
    "profileTab": "emergency",
    "label": "Primary",
    "labelEn": "Primary",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF Primary Emergency Contact are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emergency Contact",
      "field": "PRIMARY",
      "type": "LOV",
      "length": "",
      "lov": "Yes/No"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-103-hiring-personal-information-primary-emergency-contact-phone",
    "sourceRow": 103,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Primary Emergency Contact",
    "profileTab": "emergency",
    "label": "Phone",
    "labelEn": "Phone",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF Primary Emergency Contact are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emergency Contact",
      "field": "PHONE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-104-hiring-personal-information-primary-emergency-contact-copy-address-fro",
    "sourceRow": 104,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Primary Emergency Contact",
    "profileTab": "emergency",
    "label": "copy Address from Employee",
    "labelEn": "copy Address from Employee",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF Primary Emergency Contact are added THEN this field is requiredIF “Copy Address from Employee” is selectedTHEN address detail fields are not required and will be overridden;display message: “The address will be copied from the employee.”",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "Copy Address from Employee",
      "type": "LOV",
      "length": "",
      "lov": "Yes/No"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-109-hiring-personal-information-dependents-relationship",
    "sourceRow": 109,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Relationship",
    "labelEn": "Relationship",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "RELATIONSHIP",
      "type": "LOV",
      "length": "",
      "lov": "personRelationshipType"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-110-hiring-personal-information-dependents-salutation-en",
    "sourceRow": 110,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Salutation (EN)",
    "labelEn": "Salutation (EN)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "SALUTATION (EN)",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-111-hiring-personal-information-dependents-phone",
    "sourceRow": 111,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Phone",
    "labelEn": "Phone",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-112-hiring-personal-information-dependents-firstname-en",
    "sourceRow": 112,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Firstname (EN)",
    "labelEn": "Firstname (EN)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "FIRSTNAME (EN)",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-113-hiring-personal-information-dependents-lastname-en",
    "sourceRow": 113,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Lastname (EN)",
    "labelEn": "Lastname (EN)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "LASTNAME (EN)",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-114-hiring-personal-information-dependents-salutation-local",
    "sourceRow": 114,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Salutation (Local)",
    "labelEn": "Salutation (Local)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "SALUTATION (LOCAL)",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-115-hiring-personal-information-dependents-firstname-local",
    "sourceRow": 115,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Firstname (Local)",
    "labelEn": "Firstname (Local)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "FIRSTNAME (LOCAL)",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-116-hiring-personal-information-dependents-lastname-local",
    "sourceRow": 116,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Lastname (Local)",
    "labelEn": "Lastname (Local)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "LASTNAME (LOCAL)",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-117-hiring-personal-information-dependents-nationality",
    "sourceRow": 117,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Nationality",
    "labelEn": "Nationality",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "NATIONALITY",
      "type": "",
      "length": "",
      "lov": "Nationality"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-118-hiring-personal-information-dependents-date-of-birth",
    "sourceRow": 118,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Date of Birth",
    "labelEn": "Date of Birth",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "DATE OF BIRTH",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-119-hiring-personal-information-dependents-country",
    "sourceRow": 119,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Country",
    "labelEn": "Country",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "COUNTRY",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-120-hiring-personal-information-dependents-national-id-card-type",
    "sourceRow": 120,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "National ID Card Type",
    "labelEn": "National ID Card Type",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "NATIONAL ID TYPE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-121-hiring-personal-information-dependents-national-id",
    "sourceRow": 121,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "National ID",
    "labelEn": "National ID",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "NATIONAL ID",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-122-hiring-personal-information-dependents-primary",
    "sourceRow": 122,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Primary",
    "labelEn": "Primary",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "IS PRIMARY",
      "type": "",
      "length": "",
      "lov": "Yes/No"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-123-hiring-personal-information-dependents-attachment",
    "sourceRow": 123,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "ATTACHMENT",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-124-hiring-personal-information-dependents-copy-address-from-employee",
    "sourceRow": 124,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Copy Address from Employee",
    "labelEn": "Copy Address from Employee",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is requiredIF “Copy Address from Employee” is selectedTHEN address detail fields are not required and will be overridden;display message: “The address will be copied from the employee.”",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "Picture",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "COPY ADDRESS FROM EMPLOYEE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-126-hiring-personal-information-dependents-house-number",
    "sourceRow": 126,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "House Number",
    "labelEn": "House Number",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-127-hiring-personal-information-dependents-building",
    "sourceRow": 127,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Building",
    "labelEn": "Building",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "The system shall maintain child information under the Dependents sub-section. All dependent records shall be used for benefit integration.",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-128-hiring-personal-information-dependents-floor",
    "sourceRow": 128,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Floor",
    "labelEn": "Floor",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-129-hiring-personal-information-dependents-village",
    "sourceRow": 129,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Village",
    "labelEn": "Village",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-130-hiring-personal-information-dependents-moo",
    "sourceRow": 130,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Moo",
    "labelEn": "Moo",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-131-hiring-personal-information-dependents-lane-soi",
    "sourceRow": 131,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Lane / Soi",
    "labelEn": "Lane / Soi",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-132-hiring-personal-information-dependents-street",
    "sourceRow": 132,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Street",
    "labelEn": "Street",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-133-hiring-personal-information-dependents-province",
    "sourceRow": 133,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Province",
    "labelEn": "Province",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-134-hiring-personal-information-dependents-district",
    "sourceRow": 134,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "District",
    "labelEn": "District",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-135-hiring-personal-information-dependents-sub-district",
    "sourceRow": 135,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Sub-District",
    "labelEn": "Sub-District",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-136-hiring-personal-information-dependents-postal-code",
    "sourceRow": 136,
    "process": "Hiring",
    "section": "Personal Information",
    "subSection": "Dependents",
    "profileTab": "emergency",
    "label": "Postal Code",
    "labelEn": "Postal Code",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF dependents are added THEN this field is required",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Dependens",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-147-hiring-job-information-job-information-ok-to-rehire",
    "sourceRow": 147,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "OK to Rehire",
    "labelEn": "OK to Rehire",
    "mandatoryRule": "Not Required",
    "conditionalRule": "",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not require"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not require"
      },
      {
        "group": "Retirement",
        "rule": "Not require"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not require"
      },
      {
        "group": "DVT",
        "rule": "Not require"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Default is based on the reason for resignation; however, HR can modify.",
    "hrConfirmLogic": "Default is based on the reason for resignation; however, HR can modify.",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "move to other page ( not require to add info on hiring process) -> move to termination process : employee (no require) -> manager process (require)",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "OK_TO_REHIRE",
      "type": "LOV",
      "length": "",
      "lov": "Yes/No"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-149-hiring-job-information-job-information-additional-information-terminat",
    "sourceRow": 149,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Additional Information (Termination)",
    "labelEn": "Additional Information (Termination)",
    "mandatoryRule": "",
    "conditionalRule": "",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not require"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not require"
      },
      {
        "group": "Retirement",
        "rule": "Not require"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not require"
      },
      {
        "group": "DVT",
        "rule": "Not require"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "move to other page ( not require to add info on hiring process) -> move to termination process : employee (no require) -> manager process (require)",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "TERMINATE_REMARK",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-150-hiring-job-information-general-business-unit",
    "sourceRow": 150,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "General",
    "profileTab": "employment",
    "label": "Business unit",
    "labelEn": "Business unit",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "BU_CODE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-152-hiring-job-information-target-position-company",
    "sourceRow": 152,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Target Position",
    "profileTab": "employment",
    "label": "Company",
    "labelEn": "Company",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Default Company Code based on value entered in the Identity section (not allow to edit)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "COMPANY_CODE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-153-hiring-job-information-general-function",
    "sourceRow": 153,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "General",
    "profileTab": "employment",
    "label": "Function",
    "labelEn": "Function",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "COMPANY_NAME",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-155-hiring-job-information-organization-information-cost-centre",
    "sourceRow": 155,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "Cost Centre",
    "labelEn": "Cost Centre",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Auto-populated from FO master data based on selected Position (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "Needs HR confirmation",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "COSTCENTER",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-156-hiring-job-information-organization-information-point-of-sales",
    "sourceRow": 156,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "Point of Sales",
    "labelEn": "Point of Sales",
    "mandatoryRule": "Required/Not required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Auto-populated from FO master data based on selected Position (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "POINT_OF_SALE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-157-hiring-job-information-job-information-country",
    "sourceRow": 157,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Country",
    "labelEn": "Country",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Require"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Require"
      },
      {
        "group": "Retirement",
        "rule": "Require"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Require"
      },
      {
        "group": "DVT",
        "rule": "Require"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "COUNTRY",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-158-hiring-job-information-organization-information-policy-profile",
    "sourceRow": 158,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "Policy Profile",
    "labelEn": "Policy Profile",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "Cancel",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "POLICY_PROFILE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-159-hiring-job-information-organization-information-group",
    "sourceRow": 159,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "Group",
    "labelEn": "Group",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "GROUP_",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-163-hiring-job-information-job-information-employee-group",
    "sourceRow": 163,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Employee Group",
    "labelEn": "Employee Group",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required ; Driver field"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required ; Driver field"
      },
      {
        "group": "Retirement",
        "rule": "Required ; Driver field"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Required ; Driver field"
      },
      {
        "group": "DVT",
        "rule": "Required ; Driver field"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "EMPLOYEE_GROUP",
      "type": "",
      "length": "",
      "lov": "FO masterdata"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-164-hiring-job-information-job-information-employee-subgroup",
    "sourceRow": 164,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Employee Subgroup",
    "labelEn": "Employee Subgroup",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required ; filter by group"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required ; filter by group"
      },
      {
        "group": "Retirement",
        "rule": "Required ; filter by group"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Required ; filter by group"
      },
      {
        "group": "DVT",
        "rule": "Required ; filter by group"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Filter by Employee Group",
    "hrConfirmLogic": "Filter by Employee Group",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "EMPLOYEE_SUBGROUP",
      "type": "",
      "length": "",
      "lov": "FO masterdata"
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-165-hiring-job-information-job-information-job-code",
    "sourceRow": 165,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Job Code",
    "labelEn": "Job Code",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Retirement",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "DVT",
        "rule": "Required (linked to Position)"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "JOB_CODE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-166-hiring-job-information-job-information-job-role",
    "sourceRow": 166,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Job Role",
    "labelEn": "Job Role",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Retirement",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "DVT",
        "rule": "Required (linked to Position)"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "JOB_NAME",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-167-hiring-job-information-job-information-job-family",
    "sourceRow": 167,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "emergency",
    "label": "Job Family",
    "labelEn": "Job Family",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Retirement",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "DVT",
        "rule": "Required (linked to Position)"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "JOB_FAMILY",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-169-hiring-job-information-job-information-job-type",
    "sourceRow": 169,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Job Type",
    "labelEn": "Job Type",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Retirement",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "DVT",
        "rule": "Required (linked to Position)"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "JOBTYPE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-170-hiring-job-information-organization-information-store-brand-format",
    "sourceRow": 170,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "Store Brand/ Format",
    "labelEn": "Store Brand/ Format",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "STORE_FORMAT_CODE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-173-hiring-job-information-organization-information-store-branch-code",
    "sourceRow": 173,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "Store/ Branch Code",
    "labelEn": "Store/ Branch Code",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "BRANCH_CODE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-178-hiring-job-information-organization-information-brand",
    "sourceRow": 178,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "Brand",
    "labelEn": "Brand",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "BRAND_CODE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-180-hiring-job-information-organization-information-zone",
    "sourceRow": 180,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "Zone",
    "labelEn": "Zone",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Auto-populated from FO master data based on selected Position (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "ZONE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-181-hiring-job-information-target-position-position",
    "sourceRow": 181,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Target Position",
    "profileTab": "employment",
    "label": "Position",
    "labelEn": "Position",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "After selecting Position, user can click to view the organization chart",
    "validationNote": "IF “Enter Manager to Filter Positions” is selectedTHEN filter Positions based on the selected Manager",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "POSITION_CODE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-185-hiring-job-information-job-information-corporate-title",
    "sourceRow": 185,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Corporate Title",
    "labelEn": "Corporate Title",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (Editable)(linked to PG)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (Editable)(linked to PG)"
      },
      {
        "group": "Retirement",
        "rule": "Required (Editable)(linked to PG)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Temporay/ internship : Not require (Editable)H-Contingent Worker : Required (Editable)"
      },
      {
        "group": "DVT",
        "rule": "Not require (Editable)"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Auto-populated from FO master data based on selected Position (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "Keep the existing",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "CORPORATE_TITLE_CODE",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-189-hiring-job-information-time-information-time-management-status",
    "sourceRow": 189,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "Time Management Status",
    "labelEn": "Time Management Status",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Auto-populated from EC Conditions",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "TIME_MANANGEMT_STATUS",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-190-hiring-job-information-organization-information-work-location",
    "sourceRow": 190,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "Work Location",
    "labelEn": "Work Location",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Auto-populated from FO master data based on selected Position (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "WORK_LOCATION_CODE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-193-hiring-job-information-organization-information-sso-location",
    "sourceRow": 193,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "SSO Location",
    "labelEn": "SSO Location",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "SSO_LOCATION",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-195-hiring-job-information-time-information-fte",
    "sourceRow": 195,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "FTE",
    "labelEn": "FTE",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "FTE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-197-hiring-job-information-job-information-supervisor-id",
    "sourceRow": 197,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Supervisor ID",
    "labelEn": "Supervisor ID",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (linked to Position) except Level N (Needs HR review)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (linked to Position) except Level N (Needs HR review)"
      },
      {
        "group": "Retirement",
        "rule": "Required (linked to Position) except Level N (Needs HR review)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Required (linked to Position) except Level N (Needs HR review)"
      },
      {
        "group": "DVT",
        "rule": "Required (linked to Position) except Level N (Needs HR review)"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Auto-populated from FO master data based on selected Position (editable).",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "SUPERVISOR_ID",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-198-hiring-job-information-job-information-personnel-grade",
    "sourceRow": 198,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Personnel Grade",
    "labelEn": "Personnel Grade",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (linked to employee subgroup)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (linked to employee subgroup)"
      },
      {
        "group": "Retirement",
        "rule": "Required (linked to employee subgroup)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not require"
      },
      {
        "group": "DVT",
        "rule": "Not require"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "PG",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-199-hiring-job-information-job-information-job-grade",
    "sourceRow": 199,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Job Grade",
    "labelEn": "Job Grade",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Retirement",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Required (linked to Position)"
      },
      {
        "group": "DVT",
        "rule": "Required (linked to Position)"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "JG",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-200-hiring-job-information-time-information-standard-weekly-hours",
    "sourceRow": 200,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "Standard Weekly Hours",
    "labelEn": "Standard Weekly Hours",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "STANDARD_WEEKLY_HR",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-201-hiring-job-information-time-information-daily-working-hours",
    "sourceRow": 201,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "Daily Working Hours",
    "labelEn": "Daily Working Hours",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "DAILY_WORKING_HR",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-202-hiring-job-information-time-information-working-days-per-week",
    "sourceRow": 202,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "Working Days per Week",
    "labelEn": "Working Days per Week",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "WORKING_DAY_PER_WEEK",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-203-hiring-job-information-time-information-work-schedule",
    "sourceRow": 203,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "Work Schedule",
    "labelEn": "Work Schedule",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Auto-populated from FO master data based on selected Position (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "WORK_SCHEDULE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-204-hiring-job-information-time-information-holiday-type-condition",
    "sourceRow": 204,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "Holiday Type Condition",
    "labelEn": "Holiday Type Condition",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "HOLIDAY_TYPE_CONDITION",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-205-hiring-job-information-organization-information-time-zone",
    "sourceRow": 205,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Organization Information",
    "profileTab": "employment",
    "label": "Time Zone",
    "labelEn": "Time Zone",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "TIMEZONE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-206-hiring-job-information-job-information-contract-type",
    "sourceRow": 206,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Contract Type",
    "labelEn": "Contract Type",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required ; default as \"regular\" (LOV, editable)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required ; default as \"regular\" (LOV, editable)"
      },
      {
        "group": "Retirement",
        "rule": "required (LOV)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "required (LOV)"
      },
      {
        "group": "DVT",
        "rule": "required (LOV, editable)"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "CONTRACT_TYPE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-207-hiring-job-information-time-information-o-t-flag",
    "sourceRow": 207,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "O.T. Flag",
    "labelEn": "O.T. Flag",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Default as No (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "OT_FLAG",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-208-hiring-job-information-job-information-contract-end-date",
    "sourceRow": 208,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Contract End Date",
    "labelEn": "Contract End Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Required (linked to Contract Type)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden when select longTerm)Required (linked to Contract Type)"
      },
      {
        "group": "DVT",
        "rule": "Required (linked to Contract Type)"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "CONTRACT_ENDDATE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-209-hiring-job-information-job-information-dvt-project-name",
    "sourceRow": 209,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "DVT: Project name",
    "labelEn": "DVT: Project name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required(Hidden)Required (linked to Scholarship=Y)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required(Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "DVT: Project name",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-210-hiring-job-information-job-information-dvt-partner-university",
    "sourceRow": 210,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "DVT: Partner University",
    "labelEn": "DVT: Partner University",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required(Hidden)Required (linked to Scholarship=Y)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required(Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "DVT: Partner University",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-211-hiring-job-information-job-information-dvt-type",
    "sourceRow": 211,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "DVT: Type",
    "labelEn": "DVT: Type",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required(Hidden)Required (linked to Scholarship=Y)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required(Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "DVT: Type",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-212-hiring-job-information-job-information-dvt-degree-level",
    "sourceRow": 212,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "DVT: Degree Level",
    "labelEn": "DVT: Degree Level",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required(Hidden)Required (linked to Scholarship=Y)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required(Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "DVT: Degree Level",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-213-hiring-job-information-job-information-dvt-course",
    "sourceRow": 213,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "DVT: Course",
    "labelEn": "DVT: Course",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required(Hidden)Required (linked to Scholarship=Y)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required(Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "DVT: Course",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-214-hiring-job-information-job-information-dvt-course-of-time",
    "sourceRow": 214,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "DVT: Course of Time",
    "labelEn": "DVT: Course of Time",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required(Hidden)Required (linked to Scholarship=Y)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required(Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "DVT: Course of Time",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-215-hiring-job-information-job-information-dvt-academic-year",
    "sourceRow": 215,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "DVT: Academic Year",
    "labelEn": "DVT: Academic Year",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required(Hidden)Required (linked to Scholarship=Y)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required(Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "DVT: Academic Year",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-216-hiring-job-information-job-information-dvt-graduation-date",
    "sourceRow": 216,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "DVT: Graduation Date",
    "labelEn": "DVT: Graduation Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required (linked to Scholarship=Y)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required(Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "Not Required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "DVT: Graduation Date",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-217-hiring-job-information-job-information-dvt-bonding-end-date",
    "sourceRow": 217,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "DVT: Bonding End date",
    "labelEn": "DVT: Bonding End date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required (linked to Scholarship=Y)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required(Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "Not Required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-218-hiring-job-information-job-information-scholarship",
    "sourceRow": 218,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Scholarship",
    "labelEn": "Scholarship",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "Not Required (Hidden)"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "checking rule for DVT ( permanent > scholarship > DVT required",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "Scholarship",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-219-hiring-job-information-time-information-override-standard-weekly-hours",
    "sourceRow": 219,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "Override Standard Weekly Hours",
    "labelEn": "Override Standard Weekly Hours",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-220-hiring-job-information-time-information-day-off-type",
    "sourceRow": 220,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "Day off Type",
    "labelEn": "Day off Type",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (linked to Work Schedule)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (linked to Work Schedule)"
      },
      {
        "group": "Retirement",
        "rule": "Required (linked to Work Schedule)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Required (linked to Work Schedule)"
      },
      {
        "group": "DVT",
        "rule": "Required (linked to Work Schedule)"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "Day off Type (Checkbox Mon-Sun, NoFixed), Special Dayoff 0-3",
    "remark": "new requirement?",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-221-hiring-job-information-time-information-holiday-calendar",
    "sourceRow": 221,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "Holiday Calendar",
    "labelEn": "Holiday Calendar",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "Needs HR review data retail field FO (position related) -> checking",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-222-hiring-job-information-time-information-time-recording-variant",
    "sourceRow": 222,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Time Information",
    "profileTab": "employment",
    "label": "Time Recording Variant",
    "labelEn": "Time Recording Variant",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "cancel",
    "remark": "remove",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-229-hiring-job-information-job-information-probationary-period-end-date",
    "sourceRow": 229,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Probationary Period End Date",
    "labelEn": "Probationary Period End Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required; system up to populated hire date + 119 days"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required; system up to populated hire date + 119 days"
      },
      {
        "group": "Retirement",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required"
      },
      {
        "group": "DVT",
        "rule": "Not Required (Hidden)"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "Probationary Period End Date",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-230-hiring-job-information-job-information-extended-retirement-date",
    "sourceRow": 230,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Extended Retirement Date",
    "labelEn": "Extended Retirement Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required"
      },
      {
        "group": "Retirement",
        "rule": "Not Required"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required (Hidden)"
      },
      {
        "group": "DVT",
        "rule": "Not Required (Hidden)"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "Extended Retirement Date",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-231-hiring-job-information-job-information-extended-probation-date",
    "sourceRow": 231,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Extended Probation Date",
    "labelEn": "Extended Probation Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required"
      },
      {
        "group": "Retirement",
        "rule": "Not Required"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required"
      },
      {
        "group": "DVT",
        "rule": "Not Required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "Extended Probation Date",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-233-hiring-job-information-job-information-attachment",
    "sourceRow": 233,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required"
      },
      {
        "group": "Retirement",
        "rule": "Not Required"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required"
      },
      {
        "group": "DVT",
        "rule": "Not Required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "Attachment",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-234-hiring-job-information-job-information-band-matching",
    "sourceRow": 234,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Band Matching",
    "labelEn": "Band Matching",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (linked to position)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (linked to position)"
      },
      {
        "group": "Retirement",
        "rule": "Required (linked to position)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Required (linked to position)"
      },
      {
        "group": "DVT",
        "rule": "Required (linked to position)"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Emp Job Info",
      "field": "Band Matching",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-235-hiring-job-information-job-information-transfer-out-to",
    "sourceRow": 235,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Transfer out to",
    "labelEn": "Transfer out to",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required"
      },
      {
        "group": "Retirement",
        "rule": "Not Required"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required"
      },
      {
        "group": "DVT",
        "rule": "Not Required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "For RF ( Needs HR review)Need to have on termination",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-236-hiring-job-information-job-information-transfer-in-to",
    "sourceRow": 236,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Transfer in to",
    "labelEn": "Transfer in to",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required"
      },
      {
        "group": "Retirement",
        "rule": "Not Required"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required"
      },
      {
        "group": "DVT",
        "rule": "Not Required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-237-hiring-job-information-job-information-band",
    "sourceRow": 237,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Band",
    "labelEn": "Band",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Required (Editable)(linked to PG)"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Required (Editable)(linked to PG)"
      },
      {
        "group": "Retirement",
        "rule": "Required (Editable)(linked to PG)"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not require (Editable)H-Contingent Worker Required (Editable)"
      },
      {
        "group": "DVT",
        "rule": "Not require (Editable)"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "Auto-populated from FO master data based on selected Position (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "Keep the existing",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-238-hiring-job-information-job-information-special-benefit-group",
    "sourceRow": 238,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Information",
    "profileTab": "employment",
    "label": "Special Benefit Group",
    "labelEn": "Special Benefit Group",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "Permanent",
        "rule": "Not Required"
      },
      {
        "group": "Expat Outbound/Inbound",
        "rule": "Not Required"
      },
      {
        "group": "Retirement",
        "rule": "Not Required"
      },
      {
        "group": "Temporary/Internship/Contingent Worker",
        "rule": "Not Required"
      },
      {
        "group": "DVT",
        "rule": "Not Required"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "IF fill in this field for Flag (BE)benefit Needs HR review policy (plan Needs HR review default create enroll Needs HR review SPD Needs HR review create Needs HR review) , Needs HR review policy Needs HR review flag Needs HR review-NEW / Existing employee",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "employee group relelated fields",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-241-hiring-job-information-employment-details-cg-previous-employee-id",
    "sourceRow": 241,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "CG previous Employee ID",
    "labelEn": "CG previous Employee ID",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct Edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Employment",
      "field": "PREVIOUS_ID",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-242-hiring-job-information-employment-details-hire-date",
    "sourceRow": 242,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Hire Date",
    "labelEn": "Hire Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Default same as hiredate same as identity section (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct Edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Employment",
      "field": "HIRE_DATE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-246-hiring-job-information-employment-details-retire-ment-date",
    "sourceRow": 246,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Retire­ment Date",
    "labelEn": "Retire­ment Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "CPN 1 Jan After 60Y, CRC & CU 1 Mar After 60Y",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct Edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Employment",
      "field": "RETIREMENT_DATE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-247-hiring-job-information-employment-details-original-start-date",
    "sourceRow": 247,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Original Start Date",
    "labelEn": "Original Start Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Default same as hiredate same as identity section (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct Edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Employment",
      "field": "ORIGINAL_STARTDATE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-248-hiring-job-information-employment-details-seniority-start-date",
    "sourceRow": 248,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Seniority Start Date",
    "labelEn": "Seniority Start Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Default same as hiredate same as identity section (editable)",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Employment",
      "field": "SENIORITY_STARTDATE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-255-hiring-job-information-employment-details-dvt-previous-id",
    "sourceRow": 255,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "DVT previous ID",
    "labelEn": "DVT previous ID",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "key employee ID (Emp Group F-DVT)",
    "hrConfirmLogic": "key employee ID (Emp Group F-DVT)",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct Edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Employment",
      "field": "DVT previous ID",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-256-hiring-job-information-employment-details-pf-service-date",
    "sourceRow": 256,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "PF service Date",
    "labelEn": "PF service Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "EC Rep Needs HR review PY",
    "remark": "",
    "maintainEditType": "Direct Edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Employment",
      "field": "PF service Date",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-257-hiring-job-information-employment-details-pf-service-end-date",
    "sourceRow": 257,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "PF service End Date",
    "labelEn": "PF service End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "EC Rep Needs HR review PY",
    "remark": "",
    "maintainEditType": "Direct Edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Employment",
      "field": "PF service End Date",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-259-hiring-job-information-employment-details-employee-age-y-m-d",
    "sourceRow": 259,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Employee age (Y/M/D)",
    "labelEn": "Employee age (Y/M/D)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "fields calculate (Needs HR review)",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-261-hiring-job-information-job-relationships-relationship-type",
    "sourceRow": 261,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Relationships",
    "profileTab": "employment",
    "label": "Relationship Type",
    "labelEn": "Relationship Type",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Required if add Job relationships",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Job Relationships",
      "field": "RELATIONSHIP TYPE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-262-hiring-job-information-job-relationships-name",
    "sourceRow": 262,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Job Relationships",
    "profileTab": "employment",
    "label": "Name",
    "labelEn": "Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Required if add Job relationships",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Job Relationships",
      "field": "NAME",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-263-hiring-job-information-work-permit-info-document-type",
    "sourceRow": 263,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Work Permit Info",
    "profileTab": "documents",
    "label": "Document Type",
    "labelEn": "Document Type",
    "mandatoryRule": "required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Required if add work permit",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Work Permit",
      "field": "DOCUMENT TYPE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-265-hiring-job-information-work-permit-info-country",
    "sourceRow": 265,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Work Permit Info",
    "profileTab": "documents",
    "label": "Country",
    "labelEn": "Country",
    "mandatoryRule": "required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Required if add work permit",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Work Permit",
      "field": "COUNTRY",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-266-hiring-job-information-work-permit-info-document-number",
    "sourceRow": 266,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Work Permit Info",
    "profileTab": "documents",
    "label": "Document Number",
    "labelEn": "Document Number",
    "mandatoryRule": "required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Required if add work permit",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Work Permit",
      "field": "DOCUMENT_NUMBER",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-267-hiring-job-information-work-permit-info-issue-date",
    "sourceRow": 267,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Work Permit Info",
    "profileTab": "documents",
    "label": "Issue Date",
    "labelEn": "Issue Date",
    "mandatoryRule": "required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Required if add work permit",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Work Permit",
      "field": "ISSUE_DATE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-268-hiring-job-information-work-permit-info-expiry-date",
    "sourceRow": 268,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Work Permit Info",
    "profileTab": "documents",
    "label": "Expiry Date",
    "labelEn": "Expiry Date",
    "mandatoryRule": "required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Required if add work permit",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Work Permit",
      "field": "EXPIRY_DATE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-269-hiring-job-information-work-permit-info-arrival-date-visa",
    "sourceRow": 269,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Work Permit Info",
    "profileTab": "documents",
    "label": "Arrival date (VISA)",
    "labelEn": "Arrival date (VISA)",
    "mandatoryRule": "required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Required if add work permit",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Work Permit",
      "field": "Arrival date (VISA)",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-270-hiring-job-information-work-permit-info-90-days-report-visa",
    "sourceRow": 270,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Work Permit Info",
    "profileTab": "documents",
    "label": "90 days report (VISA)",
    "labelEn": "90 days report (VISA)",
    "mandatoryRule": "required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "Required if add work permit",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Work Permit",
      "field": "90 days report (VISA)",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-271-hiring-job-information-work-permit-info-attachment",
    "sourceRow": 271,
    "process": "Hiring",
    "section": "Job Information",
    "subSection": "Work Permit Info",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Work Permit",
      "field": "ATTACHMENT",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-275-hiring-compensation-information-payment-information-bank-code",
    "sourceRow": 275,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Payment Information",
    "profileTab": "compensation",
    "label": "Bank Code",
    "labelEn": "Bank Code",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Payment Info.",
      "field": "BANK_CODE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-276-hiring-compensation-information-payment-information-bank",
    "sourceRow": 276,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Payment Information",
    "profileTab": "compensation",
    "label": "Bank",
    "labelEn": "Bank",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Payment Info.",
      "field": "BANK_NAME",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-277-hiring-compensation-information-payment-information-account-number",
    "sourceRow": 277,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Payment Information",
    "profileTab": "compensation",
    "label": "Account Number",
    "labelEn": "Account Number",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Payment Info.",
      "field": "ACCOUNT_NUMBER",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-278-hiring-compensation-information-payment-information-bank-country-regio",
    "sourceRow": 278,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Payment Information",
    "profileTab": "compensation",
    "label": "Bank Country/Region",
    "labelEn": "Bank Country/Region",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Payment Info.",
      "field": "BANK_COUNTRY",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-279-hiring-compensation-information-payment-information-currency",
    "sourceRow": 279,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Payment Information",
    "profileTab": "compensation",
    "label": "Currency",
    "labelEn": "Currency",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Payment Info.",
      "field": "CURRENCY",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-280-hiring-compensation-information-payment-information-payment-method",
    "sourceRow": 280,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Payment Information",
    "profileTab": "compensation",
    "label": "Payment Method",
    "labelEn": "Payment Method",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Payment Info.",
      "field": "PAYMENT_METHOD",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-281-hiring-compensation-information-payment-information-pay-type",
    "sourceRow": 281,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Payment Information",
    "profileTab": "compensation",
    "label": "Pay Type",
    "labelEn": "Pay Type",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Payment Info.",
      "field": "Pay Type",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-286-hiring-compensation-information-compensation-pay-component",
    "sourceRow": 286,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Compensation",
    "profileTab": "compensation",
    "label": "Pay Component",
    "labelEn": "Pay Component",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Pay Component Recurring",
      "field": "PAY_COMPONENT_CODE",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-288-hiring-compensation-information-compensation-information-frequency",
    "sourceRow": 288,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Compensation Information",
    "profileTab": "compensation",
    "label": "Frequency",
    "labelEn": "Frequency",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Pay Component Recurring",
      "field": "FREQUENCY_PAY",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-289-hiring-compensation-information-compensation-information-amount",
    "sourceRow": 289,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Compensation Information",
    "profileTab": "compensation",
    "label": "Amount",
    "labelEn": "Amount",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Pay Component Recurring",
      "field": "AMOUNT",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-290-hiring-compensation-information-compensation-information-currency",
    "sourceRow": 290,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Compensation Information",
    "profileTab": "compensation",
    "label": "Currency",
    "labelEn": "Currency",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Pay Component Recurring",
      "field": "CURRRENCY",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-291-hiring-compensation-information-compensation-information-pay-group",
    "sourceRow": 291,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Compensation Information",
    "profileTab": "compensation",
    "label": "pay group",
    "labelEn": "pay group",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Take action: Change Job and Compensation Info",
    "maintainOwners": [],
    "dbMapping": {
      "table": "Pay Component Recurring",
      "field": "PAYGROUP",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-294-hiring-compensation-information-recurring-payments-pay-component",
    "sourceRow": 294,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Recurring Payments",
    "profileTab": "compensation",
    "label": "Pay Component",
    "labelEn": "Pay Component",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-295-hiring-compensation-information-recurring-payments-amount",
    "sourceRow": 295,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Recurring Payments",
    "profileTab": "compensation",
    "label": "Amount",
    "labelEn": "Amount",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Required",
    "mandatoryKind": "conditional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Require if add recurring payment",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-296-hiring-compensation-information-recurring-payments-currency",
    "sourceRow": 296,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Recurring Payments",
    "profileTab": "compensation",
    "label": "Currency",
    "labelEn": "Currency",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-297-hiring-compensation-information-recurring-payments-frequency",
    "sourceRow": 297,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Recurring Payments",
    "profileTab": "compensation",
    "label": "Frequency",
    "labelEn": "Frequency",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "Require if add recurring payment",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-298-hiring-compensation-information-compensation-job-country-region",
    "sourceRow": 298,
    "process": "Hiring",
    "section": "Compensation Information",
    "subSection": "Compensation",
    "profileTab": "compensation",
    "label": "Job country/region",
    "labelEn": "Job country/region",
    "mandatoryRule": "Required",
    "conditionalRule": "Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "fix value",
    "editabilityKind": "fixed",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "Direct edit",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-299-maintain-personal-information-advanced-information-group-of-people",
    "sourceRow": 299,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "Advanced Information",
    "profileTab": "personal",
    "label": "Group of people",
    "labelEn": "Group of people",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-300-maintain-personal-information-advanced-information-description",
    "sourceRow": 300,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "Advanced Information",
    "profileTab": "personal",
    "label": "Description",
    "labelEn": "Description",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-301-maintain-personal-information-advanced-information-additional-informat",
    "sourceRow": 301,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "Advanced Information",
    "profileTab": "personal",
    "label": "Additional Information - Name",
    "labelEn": "Additional Information - Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-302-maintain-personal-information-advanced-information-additional-informat",
    "sourceRow": 302,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "Advanced Information",
    "profileTab": "personal",
    "label": "Additional Information - URL",
    "labelEn": "Additional Information - URL",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-303-maintain-personal-information-coi-approval-approval-id-yyyy-coi-000",
    "sourceRow": 303,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "personal",
    "label": "Approval ID (YYYY-COI-000)",
    "labelEn": "Approval ID (YYYY-COI-000)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-304-maintain-personal-information-coi-approval-company-name",
    "sourceRow": 304,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "employment",
    "label": "Company Name",
    "labelEn": "Company Name",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-305-maintain-personal-information-coi-approval-business-type",
    "sourceRow": 305,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "personal",
    "label": "Business Type",
    "labelEn": "Business Type",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-306-maintain-personal-information-coi-approval-business-nature",
    "sourceRow": 306,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "personal",
    "label": "Business Nature",
    "labelEn": "Business Nature",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-307-maintain-personal-information-coi-approval-position-name",
    "sourceRow": 307,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "employment",
    "label": "Position Name",
    "labelEn": "Position Name",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-308-maintain-personal-information-coi-approval-term",
    "sourceRow": 308,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "personal",
    "label": "Term",
    "labelEn": "Term",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-309-maintain-personal-information-coi-approval-start-date",
    "sourceRow": 309,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "personal",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-310-maintain-personal-information-coi-approval-compensation-rate",
    "sourceRow": 310,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "compensation",
    "label": "Compensation Rate",
    "labelEn": "Compensation Rate",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-311-maintain-personal-information-coi-approval-end-date",
    "sourceRow": 311,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "personal",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-312-maintain-personal-information-coi-approval-approved-date",
    "sourceRow": 312,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "personal",
    "label": "Approved Date",
    "labelEn": "Approved Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-313-maintain-personal-information-coi-approval-attachment",
    "sourceRow": 313,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-314-maintain-personal-information-coi-approval-attachment2",
    "sourceRow": 314,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "documents",
    "label": "Attachment2",
    "labelEn": "Attachment2",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-315-maintain-personal-information-coi-approval-end-date",
    "sourceRow": 315,
    "process": "Maintain",
    "section": "Personal Information",
    "subSection": "COI Approval",
    "profileTab": "personal",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-316-maintain-employment-information-employment-information-org-chart",
    "sourceRow": 316,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Information",
    "profileTab": "employment",
    "label": "Org. Chart",
    "labelEn": "Org. Chart",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-317-maintain-employment-information-employment-details-hire-date",
    "sourceRow": 317,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Hire Date",
    "labelEn": "Hire Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-318-maintain-employment-information-employment-details-original-start-date",
    "sourceRow": 318,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Original Start Date",
    "labelEn": "Original Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-319-maintain-employment-information-employment-details-seniority-start-dat",
    "sourceRow": 319,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Seniority Start Date",
    "labelEn": "Seniority Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-320-maintain-employment-information-employment-details-year-of-service",
    "sourceRow": 320,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Year of service",
    "labelEn": "Year of service",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-321-maintain-employment-information-employment-details-pass-probation-date",
    "sourceRow": 321,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Pass Probation Date/Confirm Date",
    "labelEn": "Pass Probation Date/Confirm Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-322-maintain-employment-information-employment-details-current-corporate-t",
    "sourceRow": 322,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Current Corporate Title Effective Date",
    "labelEn": "Current Corporate Title Effective Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-323-maintain-employment-information-employment-details-current-years-in-co",
    "sourceRow": 323,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Current Years in Corporate Title",
    "labelEn": "Current Years in Corporate Title",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-324-maintain-employment-information-employment-details-current-jg-effectiv",
    "sourceRow": 324,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Current JG Effective Date",
    "labelEn": "Current JG Effective Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-325-maintain-employment-information-employment-details-current-years-in-jg",
    "sourceRow": 325,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Current Years in JG",
    "labelEn": "Current Years in JG",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-326-maintain-employment-information-employment-details-current-pg-effectiv",
    "sourceRow": 326,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Current PG Effective Date",
    "labelEn": "Current PG Effective Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-327-maintain-employment-information-employment-details-current-years-in-pg",
    "sourceRow": 327,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Current Years in PG",
    "labelEn": "Current Years in PG",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-328-maintain-employment-information-employment-details-current-position-ef",
    "sourceRow": 328,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Current Position Effective Date",
    "labelEn": "Current Position Effective Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-329-maintain-employment-information-employment-details-current-years-in-po",
    "sourceRow": 329,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Current Years in Position",
    "labelEn": "Current Years in Position",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-330-maintain-employment-information-employment-details-current-store-branc",
    "sourceRow": 330,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Current Store Branch Effective Date",
    "labelEn": "Current Store Branch Effective Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-331-maintain-employment-information-employment-details-current-years-in-st",
    "sourceRow": 331,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Current Years in Store Branch",
    "labelEn": "Current Years in Store Branch",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-332-maintain-employment-information-employment-details-retire-ment-date",
    "sourceRow": 332,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "Retire­ment Date",
    "labelEn": "Retire­ment Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-333-maintain-employment-information-employment-details-cg-previous-employe",
    "sourceRow": 333,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "CG previous Employee ID",
    "labelEn": "CG previous Employee ID",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-334-maintain-employment-information-employment-details-dvt-previous-id",
    "sourceRow": 334,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "DVT previous ID",
    "labelEn": "DVT previous ID",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-335-maintain-employment-information-employment-details-pf-service-date",
    "sourceRow": 335,
    "process": "Maintain",
    "section": "Employment Information",
    "subSection": "Employment Details",
    "profileTab": "employment",
    "label": "PF service Date",
    "labelEn": "PF service Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-336-maintain-compensation-information-payroll-information-payslips",
    "sourceRow": 336,
    "process": "Maintain",
    "section": "compensation Information",
    "subSection": "Payroll Information",
    "profileTab": "compensation",
    "label": "Payslips",
    "labelEn": "Payslips",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "link",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-337-maintain-compensation-information-payroll-information-e-letter",
    "sourceRow": 337,
    "process": "Maintain",
    "section": "compensation Information",
    "subSection": "Payroll Information",
    "profileTab": "compensation",
    "label": "E-Letter",
    "labelEn": "E-Letter",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "link",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-338-maintain-compensation-information-payroll-information-50bis",
    "sourceRow": 338,
    "process": "Maintain",
    "section": "compensation Information",
    "subSection": "Payroll Information",
    "profileTab": "compensation",
    "label": "50BIS",
    "labelEn": "50BIS",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "link",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-339-maintain-compensation-information-payroll-information-tax-deduction",
    "sourceRow": 339,
    "process": "Maintain",
    "section": "compensation Information",
    "subSection": "Payroll Information",
    "profileTab": "compensation",
    "label": "Tax Deduction",
    "labelEn": "Tax Deduction",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "link",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-342-maintain-profile-general-badges",
    "sourceRow": 342,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "General",
    "profileTab": "personal",
    "label": "Badges",
    "labelEn": "Badges",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-343-maintain-profile-general-org-chart",
    "sourceRow": 343,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "General",
    "profileTab": "personal",
    "label": "Org Chart",
    "labelEn": "Org Chart",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-344-maintain-profile-general-tags",
    "sourceRow": 344,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "General",
    "profileTab": "personal",
    "label": "Tags",
    "labelEn": "Tags",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-345-maintain-profile-e-letter-year",
    "sourceRow": 345,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter",
    "profileTab": "personal",
    "label": "Year",
    "labelEn": "Year",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-346-maintain-profile-e-letter-group",
    "sourceRow": 346,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter",
    "profileTab": "personal",
    "label": "Group",
    "labelEn": "Group",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-347-maintain-profile-e-letter-attachment",
    "sourceRow": 347,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-348-maintain-profile-e-letter-more-information",
    "sourceRow": 348,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter",
    "profileTab": "personal",
    "label": "More Information",
    "labelEn": "More Information",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-349-maintain-profile-formal-education-degree",
    "sourceRow": 349,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Formal Education",
    "profileTab": "personal",
    "label": "Degree",
    "labelEn": "Degree",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-350-maintain-profile-formal-education-country",
    "sourceRow": 350,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Formal Education",
    "profileTab": "personal",
    "label": "Country",
    "labelEn": "Country",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-351-maintain-profile-formal-education-university",
    "sourceRow": 351,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Formal Education",
    "profileTab": "personal",
    "label": "University",
    "labelEn": "University",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-352-maintain-profile-formal-education-others",
    "sourceRow": 352,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Formal Education",
    "profileTab": "personal",
    "label": "Others",
    "labelEn": "Others",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-353-maintain-profile-formal-education-faculty",
    "sourceRow": 353,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Formal Education",
    "profileTab": "personal",
    "label": "Faculty",
    "labelEn": "Faculty",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-354-maintain-profile-formal-education-major",
    "sourceRow": 354,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Formal Education",
    "profileTab": "personal",
    "label": "Major",
    "labelEn": "Major",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-355-maintain-profile-formal-education-other-major",
    "sourceRow": 355,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Formal Education",
    "profileTab": "personal",
    "label": "Other Major",
    "labelEn": "Other Major",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-356-maintain-profile-formal-education-gpa",
    "sourceRow": 356,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Formal Education",
    "profileTab": "personal",
    "label": "GPA",
    "labelEn": "GPA",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-357-maintain-profile-formal-education-graduated-date",
    "sourceRow": 357,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Formal Education",
    "profileTab": "personal",
    "label": "Graduated Date",
    "labelEn": "Graduated Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-358-maintain-profile-formal-education-is-primary",
    "sourceRow": 358,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Formal Education",
    "profileTab": "personal",
    "label": "Is primary",
    "labelEn": "Is primary",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-359-maintain-profile-work-experience-within-company-company-current-start-",
    "sourceRow": 359,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company",
    "profileTab": "employment",
    "label": "Company (Current) -> start date",
    "labelEn": "Company (Current) -> start date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-360-maintain-profile-work-experience-within-company-company-current-end-da",
    "sourceRow": 360,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company",
    "profileTab": "employment",
    "label": "Company (Current) -> end date",
    "labelEn": "Company (Current) -> end date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-361-maintain-profile-work-experience-within-company-company-current-event",
    "sourceRow": 361,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company",
    "profileTab": "employment",
    "label": "Company (Current) -> event",
    "labelEn": "Company (Current) -> event",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-362-maintain-profile-work-experience-within-company-work-experience-within",
    "sourceRow": 362,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company",
    "profileTab": "employment",
    "label": "Work Experience Within Company (History) -> startdate",
    "labelEn": "Work Experience Within Company (History) -> startdate",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-363-maintain-profile-work-experience-within-company-company-current-end-da",
    "sourceRow": 363,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company",
    "profileTab": "employment",
    "label": "Company (Current) -> end date",
    "labelEn": "Company (Current) -> end date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-364-maintain-profile-work-experience-within-company-company-current-compan",
    "sourceRow": 364,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company",
    "profileTab": "employment",
    "label": "Company (Current) -> company",
    "labelEn": "Company (Current) -> company",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-365-maintain-profile-salary-history-start-date",
    "sourceRow": 365,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Salary History",
    "profileTab": "compensation",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-366-maintain-profile-salary-history-salary-amount",
    "sourceRow": 366,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Salary History",
    "profileTab": "compensation",
    "label": "Salary Amount",
    "labelEn": "Salary Amount",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-367-maintain-profile-salary-history-changed-amount",
    "sourceRow": 367,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Salary History",
    "profileTab": "compensation",
    "label": "Changed Amount",
    "labelEn": "Changed Amount",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-368-maintain-profile-salary-history-reason",
    "sourceRow": 368,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Salary History",
    "profileTab": "compensation",
    "label": "Reason",
    "labelEn": "Reason",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-369-maintain-profile-previous-employment-previous-work-history-startdate",
    "sourceRow": 369,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Employment",
    "profileTab": "employment",
    "label": "Previous Work History-> startdate",
    "labelEn": "Previous Work History-> startdate",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-370-maintain-profile-previous-employment-previous-work-history-enddate",
    "sourceRow": 370,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Employment",
    "profileTab": "employment",
    "label": "Previous Work History-> enddate",
    "labelEn": "Previous Work History-> enddate",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-371-maintain-profile-previous-employment-previous-work-history-company-nam",
    "sourceRow": 371,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Employment",
    "profileTab": "employment",
    "label": "Previous Work History-> Company Name",
    "labelEn": "Previous Work History-> Company Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-372-maintain-profile-previous-employment-type-of-business",
    "sourceRow": 372,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Employment",
    "profileTab": "employment",
    "label": "Type of Business",
    "labelEn": "Type of Business",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-373-maintain-profile-previous-employment-function",
    "sourceRow": 373,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Employment",
    "profileTab": "employment",
    "label": "Function",
    "labelEn": "Function",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-374-maintain-profile-previous-employment-position",
    "sourceRow": 374,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Employment",
    "profileTab": "employment",
    "label": "Position",
    "labelEn": "Position",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-375-maintain-profile-previous-employment-additional-information",
    "sourceRow": 375,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Employment",
    "profileTab": "employment",
    "label": "Additional Information",
    "labelEn": "Additional Information",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-376-maintain-profile-previous-employment-present-employer",
    "sourceRow": 376,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Employment",
    "profileTab": "employment",
    "label": "Present Employer?",
    "labelEn": "Present Employer?",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-377-maintain-profile-learning-history-learning-history",
    "sourceRow": 377,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning History",
    "profileTab": "personal",
    "label": "Learning History",
    "labelEn": "Learning History",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-378-maintain-profile-language-skills-language",
    "sourceRow": 378,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Language Skills",
    "profileTab": "personal",
    "label": "Language",
    "labelEn": "Language",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-379-maintain-profile-language-skills-certificate",
    "sourceRow": 379,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Language Skills",
    "profileTab": "documents",
    "label": "Certificate",
    "labelEn": "Certificate",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-380-maintain-profile-language-skills-others",
    "sourceRow": 380,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Language Skills",
    "profileTab": "personal",
    "label": "Others",
    "labelEn": "Others",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-381-maintain-profile-language-skills-attachment",
    "sourceRow": 381,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Language Skills",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-382-maintain-profile-language-skills-speaking-proficiency",
    "sourceRow": 382,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Language Skills",
    "profileTab": "personal",
    "label": "Speaking Proficiency",
    "labelEn": "Speaking Proficiency",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-383-maintain-profile-language-skills-reading-proficiency",
    "sourceRow": 383,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Language Skills",
    "profileTab": "personal",
    "label": "Reading Proficiency",
    "labelEn": "Reading Proficiency",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-384-maintain-profile-language-skills-writing-proficiency",
    "sourceRow": 384,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Language Skills",
    "profileTab": "personal",
    "label": "Writing Proficiency",
    "labelEn": "Writing Proficiency",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-385-maintain-profile-language-skills-listening-proficiency",
    "sourceRow": 385,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Language Skills",
    "profileTab": "personal",
    "label": "Listening Proficiency",
    "labelEn": "Listening Proficiency",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-386-maintain-profile-certification-license-type-of-certificate",
    "sourceRow": 386,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Type Of Certificate",
    "labelEn": "Type Of Certificate",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-387-maintain-profile-certification-license-certification-license",
    "sourceRow": 387,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Certification/ License",
    "labelEn": "Certification/ License",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-388-maintain-profile-certification-license-description",
    "sourceRow": 388,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Description",
    "labelEn": "Description",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-389-maintain-profile-certification-license-institution",
    "sourceRow": 389,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Institution",
    "labelEn": "Institution",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-390-maintain-profile-certification-license-effective-date",
    "sourceRow": 390,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Effective Date",
    "labelEn": "Effective Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-391-maintain-profile-certification-license-expiration-date",
    "sourceRow": 391,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Expiration Date",
    "labelEn": "Expiration Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-392-maintain-profile-certification-license-certification-license-number",
    "sourceRow": 392,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Certification/ License Number",
    "labelEn": "Certification/ License Number",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-393-maintain-profile-certification-license-name-as-appears-on-certificatio",
    "sourceRow": 393,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Name as appears on Certification/License",
    "labelEn": "Name as appears on Certification/License",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-394-maintain-profile-certification-license-certification-license-country",
    "sourceRow": 394,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Certification/ License Country",
    "labelEn": "Certification/ License Country",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-395-maintain-profile-certification-license-score",
    "sourceRow": 395,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Score",
    "labelEn": "Score",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-396-maintain-profile-certification-license-attachment",
    "sourceRow": 396,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Certification/License",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-397-maintain-profile-honours-awards-honour-or-award",
    "sourceRow": 397,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Honours/Awards",
    "profileTab": "personal",
    "label": "Honour or Award",
    "labelEn": "Honour or Award",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-398-maintain-profile-honours-awards-description",
    "sourceRow": 398,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Honours/Awards",
    "profileTab": "personal",
    "label": "Description",
    "labelEn": "Description",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-399-maintain-profile-honours-awards-institution",
    "sourceRow": 399,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Honours/Awards",
    "profileTab": "personal",
    "label": "Institution",
    "labelEn": "Institution",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-400-maintain-profile-honours-awards-issue-date",
    "sourceRow": 400,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Honours/Awards",
    "profileTab": "personal",
    "label": "Issue Date",
    "labelEn": "Issue Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-401-maintain-profile-honours-awards-additional-information",
    "sourceRow": 401,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Honours/Awards",
    "profileTab": "personal",
    "label": "Additional Information",
    "labelEn": "Additional Information",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-402-maintain-profile-honours-awards-attachment",
    "sourceRow": 402,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Honours/Awards",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-403-maintain-profile-goodness-effective-date",
    "sourceRow": 403,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Goodness",
    "profileTab": "personal",
    "label": "Effective Date",
    "labelEn": "Effective Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-404-maintain-profile-goodness-detail",
    "sourceRow": 404,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Goodness",
    "profileTab": "personal",
    "label": "Detail",
    "labelEn": "Detail",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-405-maintain-profile-goodness-point",
    "sourceRow": 405,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Goodness",
    "profileTab": "personal",
    "label": "Point",
    "labelEn": "Point",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-406-maintain-profile-goodness-comment",
    "sourceRow": 406,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Goodness",
    "profileTab": "personal",
    "label": "Comment",
    "labelEn": "Comment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-407-maintain-profile-disciplinary-start-date",
    "sourceRow": 407,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "personal",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-408-maintain-profile-disciplinary-type",
    "sourceRow": 408,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "personal",
    "label": "Type",
    "labelEn": "Type",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-409-maintain-profile-disciplinary-detail",
    "sourceRow": 409,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "personal",
    "label": "Detail",
    "labelEn": "Detail",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-410-maintain-profile-disciplinary-status",
    "sourceRow": 410,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "personal",
    "label": "Status",
    "labelEn": "Status",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-411-maintain-profile-disciplinary-punishment-detail",
    "sourceRow": 411,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "personal",
    "label": "Punishment Detail",
    "labelEn": "Punishment Detail",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-412-maintain-profile-disciplinary-punishment-date",
    "sourceRow": 412,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "personal",
    "label": "Punishment Date",
    "labelEn": "Punishment Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-413-maintain-profile-disciplinary-appeal-date",
    "sourceRow": 413,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "personal",
    "label": "Appeal Date",
    "labelEn": "Appeal Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-414-maintain-profile-disciplinary-point",
    "sourceRow": 414,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "personal",
    "label": "Point",
    "labelEn": "Point",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-415-maintain-profile-disciplinary-damage-amount",
    "sourceRow": 415,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "personal",
    "label": "Damage Amount",
    "labelEn": "Damage Amount",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-416-maintain-profile-disciplinary-supervisor",
    "sourceRow": 416,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "personal",
    "label": "Supervisor",
    "labelEn": "Supervisor",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-417-maintain-profile-disciplinary-attachment",
    "sourceRow": 417,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Disciplinary",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-418-maintain-profile-legal-execution-department-legal-execution-department",
    "sourceRow": 418,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Legal Execution Department",
    "profileTab": "employment",
    "label": "Legal Execution Department",
    "labelEn": "Legal Execution Department",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-419-maintain-profile-legal-execution-department-execution-case-no",
    "sourceRow": 419,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Legal Execution Department",
    "profileTab": "employment",
    "label": "Execution Case No.",
    "labelEn": "Execution Case No.",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-420-maintain-profile-legal-execution-department-start-date",
    "sourceRow": 420,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Legal Execution Department",
    "profileTab": "employment",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-421-maintain-profile-legal-execution-department-end-date",
    "sourceRow": 421,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Legal Execution Department",
    "profileTab": "employment",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-422-maintain-profile-legal-execution-department-other-information",
    "sourceRow": 422,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Legal Execution Department",
    "profileTab": "employment",
    "label": "Other information",
    "labelEn": "Other information",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-423-maintain-profile-legal-execution-department-attachment",
    "sourceRow": 423,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Legal Execution Department",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-424-maintain-profile-company-loan-start-date",
    "sourceRow": 424,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Loan",
    "profileTab": "employment",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-425-maintain-profile-company-loan-end-date",
    "sourceRow": 425,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Loan",
    "profileTab": "employment",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-426-maintain-profile-company-loan-type-of-loan",
    "sourceRow": 426,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Loan",
    "profileTab": "employment",
    "label": "Type of Loan",
    "labelEn": "Type of Loan",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-427-maintain-profile-company-loan-amount",
    "sourceRow": 427,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Loan",
    "profileTab": "employment",
    "label": "Amount",
    "labelEn": "Amount",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-428-maintain-profile-company-loan-additional-information",
    "sourceRow": 428,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Loan",
    "profileTab": "employment",
    "label": "Additional Information",
    "labelEn": "Additional Information",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-429-maintain-profile-product-liability-insurance-effective-date",
    "sourceRow": 429,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Product Liability Insurance",
    "profileTab": "personal",
    "label": "Effective Date",
    "labelEn": "Effective Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-430-maintain-profile-product-liability-insurance-insurance-company",
    "sourceRow": 430,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Product Liability Insurance",
    "profileTab": "employment",
    "label": "Insurance Company",
    "labelEn": "Insurance Company",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-431-maintain-profile-product-liability-insurance-bank",
    "sourceRow": 431,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Product Liability Insurance",
    "profileTab": "compensation",
    "label": "Bank",
    "labelEn": "Bank",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-432-maintain-profile-product-liability-insurance-value",
    "sourceRow": 432,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Product Liability Insurance",
    "profileTab": "personal",
    "label": "value",
    "labelEn": "value",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-433-maintain-profile-product-liability-insurance-status",
    "sourceRow": 433,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Product Liability Insurance",
    "profileTab": "personal",
    "label": "status",
    "labelEn": "status",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-434-maintain-profile-product-liability-insurance-remark",
    "sourceRow": 434,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Product Liability Insurance",
    "profileTab": "personal",
    "label": "Remark",
    "labelEn": "Remark",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-435-maintain-profile-student-loan-year-of-contract",
    "sourceRow": 435,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Student Loan",
    "profileTab": "personal",
    "label": "Year of Contract",
    "labelEn": "Year of Contract",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-436-maintain-profile-student-loan-levels-of-education",
    "sourceRow": 436,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Student Loan",
    "profileTab": "personal",
    "label": "Levels of Education",
    "labelEn": "Levels of Education",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-437-maintain-profile-student-loan-academic-year",
    "sourceRow": 437,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Student Loan",
    "profileTab": "personal",
    "label": "Academic Year",
    "labelEn": "Academic Year",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-438-maintain-profile-student-loan-year-of-final-payment",
    "sourceRow": 438,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Student Loan",
    "profileTab": "compensation",
    "label": "Year of final payment",
    "labelEn": "Year of final payment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-439-maintain-profile-student-loan-attachment",
    "sourceRow": 439,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Student Loan",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-440-maintain-profile-student-loan-remark",
    "sourceRow": 440,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Student Loan",
    "profileTab": "personal",
    "label": "Remark",
    "labelEn": "Remark",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-441-maintain-profile-scholarship-scholarship-award-year",
    "sourceRow": 441,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Scholarship",
    "profileTab": "personal",
    "label": "Scholarship Award Year",
    "labelEn": "Scholarship Award Year",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-442-maintain-profile-scholarship-graduation-year",
    "sourceRow": 442,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Scholarship",
    "profileTab": "personal",
    "label": "Graduation Year",
    "labelEn": "Graduation Year",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-443-maintain-profile-scholarship-scholarship-start-year",
    "sourceRow": 443,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Scholarship",
    "profileTab": "personal",
    "label": "Scholarship Start Year",
    "labelEn": "Scholarship Start Year",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-444-maintain-profile-scholarship-scholarship-end-year",
    "sourceRow": 444,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Scholarship",
    "profileTab": "personal",
    "label": "Scholarship End Year",
    "labelEn": "Scholarship End Year",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-445-maintain-profile-scholarship-attachment",
    "sourceRow": 445,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Scholarship",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-446-maintain-profile-scholarship-remarks",
    "sourceRow": 446,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Scholarship",
    "profileTab": "personal",
    "label": "Remarks",
    "labelEn": "Remarks",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-447-maintain-profile-guarantee-guarantee",
    "sourceRow": 447,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Guarantee",
    "profileTab": "personal",
    "label": "Guarantee",
    "labelEn": "Guarantee",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-448-maintain-profile-guarantee-effective-date",
    "sourceRow": 448,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Guarantee",
    "profileTab": "personal",
    "label": "Effective date",
    "labelEn": "Effective date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-449-maintain-profile-guarantee-guarantor-person-name-or-company-name",
    "sourceRow": 449,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Guarantee",
    "profileTab": "employment",
    "label": "Guarantor (Person name or Company name)",
    "labelEn": "Guarantor (Person name or Company name)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-450-maintain-profile-guarantee-warranty-amount",
    "sourceRow": 450,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Guarantee",
    "profileTab": "personal",
    "label": "Warranty Amount",
    "labelEn": "Warranty Amount",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-451-maintain-profile-guarantee-contact-no",
    "sourceRow": 451,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Guarantee",
    "profileTab": "personal",
    "label": "Contact No.",
    "labelEn": "Contact No.",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-452-maintain-profile-guarantee-end-date",
    "sourceRow": 452,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Guarantee",
    "profileTab": "personal",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-453-maintain-profile-employee-benefit-obligation-ebo",
    "sourceRow": 453,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Employee Benefit",
    "profileTab": "personal",
    "label": "Obligation(EBO)",
    "labelEn": "Obligation(EBO)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-454-maintain-profile-company-asset-receiving-date",
    "sourceRow": 454,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Asset",
    "profileTab": "employment",
    "label": "Receiving date",
    "labelEn": "Receiving date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-455-maintain-profile-company-asset-receiving-status",
    "sourceRow": 455,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Asset",
    "profileTab": "employment",
    "label": "Receiving status",
    "labelEn": "Receiving status",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-456-maintain-profile-company-asset-volume",
    "sourceRow": 456,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Asset",
    "profileTab": "employment",
    "label": "Volume",
    "labelEn": "Volume",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-457-maintain-profile-company-asset-asset-type",
    "sourceRow": 457,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Asset",
    "profileTab": "employment",
    "label": "Asset type",
    "labelEn": "Asset type",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-458-maintain-profile-company-asset-returnable-date",
    "sourceRow": 458,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Asset",
    "profileTab": "employment",
    "label": "Returnable date",
    "labelEn": "Returnable date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-459-maintain-profile-company-asset-return-status",
    "sourceRow": 459,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Asset",
    "profileTab": "employment",
    "label": "Return Status",
    "labelEn": "Return Status",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-460-maintain-profile-company-asset-remark",
    "sourceRow": 460,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Asset",
    "profileTab": "employment",
    "label": "Remark",
    "labelEn": "Remark",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-461-maintain-profile-company-asset-serial-number",
    "sourceRow": 461,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Company Asset",
    "profileTab": "employment",
    "label": "Serial number",
    "labelEn": "Serial number",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-462-maintain-profile-mobility-willing-to-relocate",
    "sourceRow": 462,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Willing to Relocate",
    "labelEn": "Willing to Relocate",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-463-maintain-profile-mobility-country",
    "sourceRow": 463,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Country",
    "labelEn": "Country",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-464-maintain-profile-mobility-province",
    "sourceRow": 464,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Province",
    "labelEn": "Province",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-465-maintain-profile-mobility-business-unit",
    "sourceRow": 465,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Business Unit",
    "labelEn": "Business Unit",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-466-maintain-profile-mobility-function",
    "sourceRow": 466,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Function",
    "labelEn": "Function",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-467-maintain-profile-mobility-comment",
    "sourceRow": 467,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Comment",
    "labelEn": "Comment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Text",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-468-maintain-profile-individual-document-document-name",
    "sourceRow": 468,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Individual Document",
    "profileTab": "documents",
    "label": "Document Name",
    "labelEn": "Document Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-469-maintain-profile-individual-document-effective-date",
    "sourceRow": 469,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Individual Document",
    "profileTab": "documents",
    "label": "Effective Date",
    "labelEn": "Effective Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "LOV",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-470-maintain-profile-individual-document-attachment",
    "sourceRow": 470,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Individual Document",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-471-maintain-time-management-time-management-administer-time",
    "sourceRow": 471,
    "process": "Maintain",
    "section": "Time Management",
    "subSection": "Time Management",
    "profileTab": "activity",
    "label": "Administer Time",
    "labelEn": "Administer Time",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Link",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-472-maintain-time-management-time-forms-generate-time-forms",
    "sourceRow": 472,
    "process": "Maintain",
    "section": "Time Management",
    "subSection": "Time Forms",
    "profileTab": "activity",
    "label": "Generate Time Forms",
    "labelEn": "Generate Time Forms",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "Link",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-473-maintain-profile-benefit-election-dependent-name",
    "sourceRow": 473,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Benefit Election",
    "profileTab": "emergency",
    "label": "Dependent Name",
    "labelEn": "Dependent Name",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-474-maintain-profile-benefit-election-relation",
    "sourceRow": 474,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Benefit Election",
    "profileTab": "personal",
    "label": "Relation",
    "labelEn": "Relation",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-475-maintain-profile-benefit-election-birth-date",
    "sourceRow": 475,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Benefit Election",
    "profileTab": "personal",
    "label": "Birth Date",
    "labelEn": "Birth Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-476-maintain-profile-benefit-election-national-id",
    "sourceRow": 476,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Benefit Election",
    "profileTab": "documents",
    "label": "National ID",
    "labelEn": "National ID",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-477-maintain-profile-benefit-election-gender",
    "sourceRow": 477,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Benefit Election",
    "profileTab": "personal",
    "label": "Gender",
    "labelEn": "Gender",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-478-maintain-profile-benefit-election-student",
    "sourceRow": 478,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Benefit Election",
    "profileTab": "personal",
    "label": "Student?",
    "labelEn": "Student?",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-479-maintain-profile-benefit-election-smoker",
    "sourceRow": 479,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Benefit Election",
    "profileTab": "personal",
    "label": "Smoker?",
    "labelEn": "Smoker?",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-480-maintain-profile-benefit-election-disabled",
    "sourceRow": 480,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Benefit Election",
    "profileTab": "personal",
    "label": "Disabled?",
    "labelEn": "Disabled?",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-481-maintain-profile-benefit-election-health-plan",
    "sourceRow": 481,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Benefit Election",
    "profileTab": "personal",
    "label": "Health Plan",
    "labelEn": "Health Plan",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-482-maintain-profile-benefit-election-dental-plan",
    "sourceRow": 482,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Benefit Election",
    "profileTab": "personal",
    "label": "Dental Plan",
    "labelEn": "Dental Plan",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-483-maintain-profile-community-volunteer-involvement-from-date",
    "sourceRow": 483,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Community/Volunteer Involvement",
    "profileTab": "personal",
    "label": "From Date",
    "labelEn": "From Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-484-maintain-profile-community-volunteer-involvement-end-date",
    "sourceRow": 484,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Community/Volunteer Involvement",
    "profileTab": "personal",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-485-maintain-profile-community-volunteer-involvement-community-volunteer-o",
    "sourceRow": 485,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Community/Volunteer Involvement",
    "profileTab": "personal",
    "label": "Community/Volunteer Organization Name",
    "labelEn": "Community/Volunteer Organization Name",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-486-maintain-profile-community-volunteer-involvement-role",
    "sourceRow": 486,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Community/Volunteer Involvement",
    "profileTab": "personal",
    "label": "Role",
    "labelEn": "Role",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-487-maintain-profile-compensation-review-name",
    "sourceRow": 487,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Review Name",
    "labelEn": "Review Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-488-maintain-profile-compensation-review-start",
    "sourceRow": 488,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Review Start",
    "labelEn": "Review Start",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-489-maintain-profile-compensation-review-end",
    "sourceRow": 489,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Review End",
    "labelEn": "Review End",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-490-maintain-profile-compensation-job-title",
    "sourceRow": 490,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Job Title",
    "labelEn": "Job Title",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-491-maintain-profile-compensation-performance-management-rating",
    "sourceRow": 491,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Performance Management Rating",
    "labelEn": "Performance Management Rating",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-492-maintain-profile-compensation-salary-before-review",
    "sourceRow": 492,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Salary Before Review",
    "labelEn": "Salary Before Review",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-493-maintain-profile-compensation-merit",
    "sourceRow": 493,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Merit",
    "labelEn": "Merit",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-494-maintain-profile-compensation-salary-after-review",
    "sourceRow": 494,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Salary After Review",
    "labelEn": "Salary After Review",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-495-maintain-profile-compensation-compa-ratio",
    "sourceRow": 495,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Compa-Ratio",
    "labelEn": "Compa-Ratio",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-496-maintain-profile-compensation-total-pay",
    "sourceRow": 496,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Total Pay",
    "labelEn": "Total Pay",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-497-maintain-profile-compensation-bonus",
    "sourceRow": 497,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Bonus",
    "labelEn": "Bonus",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-498-maintain-profile-compensation-stock",
    "sourceRow": 498,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Stock",
    "labelEn": "Stock",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-499-maintain-profile-compensation-option",
    "sourceRow": 499,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Option",
    "labelEn": "Option",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-500-maintain-profile-compensation-grant-date",
    "sourceRow": 500,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Grant Date",
    "labelEn": "Grant Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-501-maintain-profile-compensation-lump-sum",
    "sourceRow": 501,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "compensation",
    "profileTab": "compensation",
    "label": "Lump Sum",
    "labelEn": "Lump Sum",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-502-maintain-profile-courses-workshops-seminars-course-name",
    "sourceRow": 502,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Courses/Workshops/Seminars",
    "profileTab": "personal",
    "label": "Course Name",
    "labelEn": "Course Name",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-503-maintain-profile-courses-workshops-seminars-institution-name",
    "sourceRow": 503,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Courses/Workshops/Seminars",
    "profileTab": "personal",
    "label": "Institution Name",
    "labelEn": "Institution Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-504-maintain-profile-courses-workshops-seminars-start-date",
    "sourceRow": 504,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Courses/Workshops/Seminars",
    "profileTab": "personal",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-505-maintain-profile-courses-workshops-seminars-end-date",
    "sourceRow": 505,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Courses/Workshops/Seminars",
    "profileTab": "personal",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-506-maintain-profile-key-successes-year-ad",
    "sourceRow": 506,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Key Successes",
    "profileTab": "personal",
    "label": "Year (AD)",
    "labelEn": "Year (AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-507-maintain-profile-key-successes-achievement",
    "sourceRow": 507,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Key Successes",
    "profileTab": "personal",
    "label": "Achievement",
    "labelEn": "Achievement",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-508-maintain-profile-key-successes-attachment",
    "sourceRow": 508,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Key Successes",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-509-maintain-profile-assessment-program-program",
    "sourceRow": 509,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Assessment Program",
    "profileTab": "personal",
    "label": "Program",
    "labelEn": "Program",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-510-maintain-profile-assessment-program-year-ad",
    "sourceRow": 510,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Assessment Program",
    "profileTab": "personal",
    "label": "Year (AD)",
    "labelEn": "Year (AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-511-maintain-profile-assessment-program-result",
    "sourceRow": 511,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Assessment Program",
    "profileTab": "personal",
    "label": "Result",
    "labelEn": "Result",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-512-maintain-profile-assessment-program-mbti-strength",
    "sourceRow": 512,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Assessment Program",
    "profileTab": "personal",
    "label": "MBTI Strength",
    "labelEn": "MBTI Strength",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-513-maintain-profile-assessment-program-mbti-weakness",
    "sourceRow": 513,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Assessment Program",
    "profileTab": "personal",
    "label": "MBTI Weakness",
    "labelEn": "MBTI Weakness",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-514-maintain-profile-assessment-program-attachment",
    "sourceRow": 514,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Assessment Program",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-515-maintain-profile-coaching-feedback-type",
    "sourceRow": 515,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Coaching Feedback",
    "profileTab": "personal",
    "label": "Type",
    "labelEn": "Type",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-516-maintain-profile-coaching-feedback-internal-name",
    "sourceRow": 516,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Coaching Feedback",
    "profileTab": "personal",
    "label": "Internal Name",
    "labelEn": "Internal Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-517-maintain-profile-coaching-feedback-external-name",
    "sourceRow": 517,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Coaching Feedback",
    "profileTab": "personal",
    "label": "External Name",
    "labelEn": "External Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-518-maintain-profile-coaching-feedback-identified-as-of-date",
    "sourceRow": 518,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Coaching Feedback",
    "profileTab": "personal",
    "label": "Identified as of Date",
    "labelEn": "Identified as of Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-519-maintain-profile-coaching-feedback-comment-feedback",
    "sourceRow": 519,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Coaching Feedback",
    "profileTab": "personal",
    "label": "Comment/Feedback",
    "labelEn": "Comment/Feedback",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-520-maintain-profile-coaching-feedback-attachment",
    "sourceRow": 520,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Coaching Feedback",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-521-maintain-profile-development-goals-category",
    "sourceRow": 521,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Goals",
    "profileTab": "personal",
    "label": "Category",
    "labelEn": "Category",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-522-maintain-profile-development-goals-development-goal-id",
    "sourceRow": 522,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Goals",
    "profileTab": "personal",
    "label": "Development Goal ID",
    "labelEn": "Development Goal ID",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-523-maintain-profile-development-goals-development-goal",
    "sourceRow": 523,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Goals",
    "profileTab": "personal",
    "label": "Development Goal",
    "labelEn": "Development Goal",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-524-maintain-profile-development-goals-description",
    "sourceRow": 524,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Goals",
    "profileTab": "personal",
    "label": "Description",
    "labelEn": "Description",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-525-maintain-profile-development-goals-expected-outcome",
    "sourceRow": 525,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Goals",
    "profileTab": "personal",
    "label": "Expected Outcome",
    "labelEn": "Expected Outcome",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-526-maintain-profile-development-goals-competency",
    "sourceRow": 526,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Goals",
    "profileTab": "personal",
    "label": "Competency",
    "labelEn": "Competency",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-527-maintain-profile-development-goals-start-date",
    "sourceRow": 527,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Goals",
    "profileTab": "personal",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-528-maintain-profile-development-goals-complete-date",
    "sourceRow": 528,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Goals",
    "profileTab": "personal",
    "label": "Complete Date",
    "labelEn": "Complete Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-529-maintain-profile-development-goals-development-goal-status",
    "sourceRow": 529,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Goals",
    "profileTab": "personal",
    "label": "Development Goal Status",
    "labelEn": "Development Goal Status",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-530-maintain-profile-development-opportunities-year-ad",
    "sourceRow": 530,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Opportunities",
    "profileTab": "personal",
    "label": "Year (AD)",
    "labelEn": "Year (AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-531-maintain-profile-development-opportunities-development-needs",
    "sourceRow": 531,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Opportunities",
    "profileTab": "personal",
    "label": "Development Needs",
    "labelEn": "Development Needs",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-532-maintain-profile-development-opportunities-description",
    "sourceRow": 532,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Development Opportunities",
    "profileTab": "personal",
    "label": "Description",
    "labelEn": "Description",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-533-maintain-profile-employee-benefit-obligation-ebo-description",
    "sourceRow": 533,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Employee Benefit Obligation(EBO)",
    "profileTab": "personal",
    "label": "Description",
    "labelEn": "Description",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-534-maintain-profile-employee-benefit-obligation-ebo-ebo-amount",
    "sourceRow": 534,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Employee Benefit Obligation(EBO)",
    "profileTab": "personal",
    "label": "EBO Amount",
    "labelEn": "EBO Amount",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-535-maintain-profile-employee-benefit-obligation-ebo-needs-hr-review",
    "sourceRow": 535,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Employee Benefit Obligation(EBO)",
    "profileTab": "personal",
    "label": "Needs HR review",
    "labelEn": "Needs HR review",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": true,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "needs_change",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-536-maintain-profile-overall-competency-rating-ua-year-ad",
    "sourceRow": 536,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Overall Competency Rating (UA)",
    "profileTab": "personal",
    "label": "Year(AD)",
    "labelEn": "Year(AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-537-maintain-profile-overall-competency-rating-ua-rating-score",
    "sourceRow": 537,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Overall Competency Rating (UA)",
    "profileTab": "personal",
    "label": "Rating Score",
    "labelEn": "Rating Score",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-538-maintain-profile-overall-competency-rating-ua-rating-label",
    "sourceRow": 538,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Overall Competency Rating (UA)",
    "profileTab": "personal",
    "label": "Rating Label",
    "labelEn": "Rating Label",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-539-maintain-profile-overall-kpi-rating-ua-year-ad",
    "sourceRow": 539,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Overall KPI Rating (UA)",
    "profileTab": "personal",
    "label": "Year(AD)",
    "labelEn": "Year(AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-540-maintain-profile-overall-kpi-rating-ua-rating-score",
    "sourceRow": 540,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Overall KPI Rating (UA)",
    "profileTab": "personal",
    "label": "Rating Score",
    "labelEn": "Rating Score",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-541-maintain-profile-overall-kpi-rating-ua-rating-label",
    "sourceRow": 541,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Overall KPI Rating (UA)",
    "profileTab": "personal",
    "label": "Rating Label",
    "labelEn": "Rating Label",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-542-maintain-profile-overall-performance-rating-ua-year-ad",
    "sourceRow": 542,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Overall Performance Rating (UA)",
    "profileTab": "personal",
    "label": "Year(AD)",
    "labelEn": "Year(AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-543-maintain-profile-overall-performance-rating-ua-rating-score",
    "sourceRow": 543,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Overall Performance Rating (UA)",
    "profileTab": "personal",
    "label": "Rating Score",
    "labelEn": "Rating Score",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-544-maintain-profile-overall-performance-rating-ua-rating-label",
    "sourceRow": 544,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Overall Performance Rating (UA)",
    "profileTab": "personal",
    "label": "Rating Label",
    "labelEn": "Rating Label",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-545-maintain-profile-overall-performance-rating-ua-remark",
    "sourceRow": 545,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Overall Performance Rating (UA)",
    "profileTab": "personal",
    "label": "Remark",
    "labelEn": "Remark",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-546-maintain-profile-business-driver-assessment-driving-for-profitable-gro",
    "sourceRow": 546,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Business Driver Assessment",
    "profileTab": "personal",
    "label": "Driving for Profitable Growth",
    "labelEn": "Driving for Profitable Growth",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-547-maintain-profile-business-driver-assessment-striving-to-meet-customer-",
    "sourceRow": 547,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Business Driver Assessment",
    "profileTab": "personal",
    "label": "Striving to Meet Customer Satisfaction",
    "labelEn": "Striving to Meet Customer Satisfaction",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-548-maintain-profile-business-driver-assessment-building-organization-exce",
    "sourceRow": 548,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Business Driver Assessment",
    "profileTab": "personal",
    "label": "Building Organization Excellence",
    "labelEn": "Building Organization Excellence",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-549-maintain-profile-business-driver-assessment-promoting-sustainable-coll",
    "sourceRow": 549,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Business Driver Assessment",
    "profileTab": "personal",
    "label": "Promoting Sustainable Collaborations & Partnerships",
    "labelEn": "Promoting Sustainable Collaborations & Partnerships",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-550-maintain-profile-business-driver-assessment-developing-people",
    "sourceRow": 550,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Business Driver Assessment",
    "profileTab": "personal",
    "label": "Developing People",
    "labelEn": "Developing People",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-551-maintain-profile-business-driver-assessment-leading-innovation",
    "sourceRow": 551,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Business Driver Assessment",
    "profileTab": "personal",
    "label": "Leading Innovation",
    "labelEn": "Leading Innovation",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-552-maintain-profile-learning-activities-category",
    "sourceRow": 552,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Category",
    "labelEn": "Category",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-553-maintain-profile-learning-activities-development-objective-id",
    "sourceRow": 553,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Development Objective ID",
    "labelEn": "Development Objective ID",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-554-maintain-profile-learning-activities-topic",
    "sourceRow": 554,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Topic",
    "labelEn": "Topic",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-555-maintain-profile-learning-activities-description",
    "sourceRow": 555,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Description",
    "labelEn": "Description",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-556-maintain-profile-learning-activities-planned-start-date",
    "sourceRow": 556,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Planned Start Date",
    "labelEn": "Planned Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-557-maintain-profile-learning-activities-planned-completed-date",
    "sourceRow": 557,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Planned Completed Date",
    "labelEn": "Planned Completed Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-558-maintain-profile-learning-activities-status",
    "sourceRow": 558,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Status",
    "labelEn": "Status",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-559-maintain-profile-learning-activities-learning-activity-id",
    "sourceRow": 559,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Learning Activity ID",
    "labelEn": "Learning Activity ID",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-560-maintain-profile-learning-activities-type",
    "sourceRow": 560,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Type",
    "labelEn": "Type",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-561-maintain-profile-learning-activities-learning-name",
    "sourceRow": 561,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Learning Name",
    "labelEn": "Learning Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-562-maintain-profile-learning-activities-learning-status",
    "sourceRow": 562,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Learning Status",
    "labelEn": "Learning Status",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-563-maintain-profile-learning-activities-learning-planned-start-date",
    "sourceRow": 563,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Learning Planned Start Date",
    "labelEn": "Learning Planned Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-564-maintain-profile-learning-activities-learning-planned-completed-date",
    "sourceRow": 564,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Learning Planned Completed Date",
    "labelEn": "Learning Planned Completed Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-565-maintain-profile-learning-activities-learning-planned-expected-result",
    "sourceRow": 565,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Learning Activities",
    "profileTab": "personal",
    "label": "Learning Planned Expected Result",
    "labelEn": "Learning Planned Expected Result",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-566-maintain-profile-mt-ma-reference-program",
    "sourceRow": 566,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "MT/MA Reference",
    "profileTab": "personal",
    "label": "Program",
    "labelEn": "Program",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-567-maintain-profile-mt-ma-reference-sponser",
    "sourceRow": 567,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "MT/MA Reference",
    "profileTab": "personal",
    "label": "Sponser",
    "labelEn": "Sponser",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-568-maintain-profile-mt-ma-reference-year-ad",
    "sourceRow": 568,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "MT/MA Reference",
    "profileTab": "personal",
    "label": "Year(AD)",
    "labelEn": "Year(AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-569-maintain-profile-mt-ma-reference-remark",
    "sourceRow": 569,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "MT/MA Reference",
    "profileTab": "personal",
    "label": "Remark",
    "labelEn": "Remark",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-570-maintain-profile-mt-ma-reference-attachment",
    "sourceRow": 570,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "MT/MA Reference",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-571-maintain-profile-top-strengths-year-ad",
    "sourceRow": 571,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Top Strengths",
    "profileTab": "personal",
    "label": "Year (AD)",
    "labelEn": "Year (AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-572-maintain-profile-top-strengths-achievement",
    "sourceRow": 572,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Top Strengths",
    "profileTab": "personal",
    "label": "Achievement",
    "labelEn": "Achievement",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-573-maintain-profile-top-strengths-attachment",
    "sourceRow": 573,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Top Strengths",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-574-maintain-profile-talent-reference-program",
    "sourceRow": 574,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Talent Reference",
    "profileTab": "personal",
    "label": "Program",
    "labelEn": "Program",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-575-maintain-profile-talent-reference-sponser",
    "sourceRow": 575,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Talent Reference",
    "profileTab": "personal",
    "label": "Sponser",
    "labelEn": "Sponser",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-576-maintain-profile-talent-reference-year-ad",
    "sourceRow": 576,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Talent Reference",
    "profileTab": "personal",
    "label": "Year(AD)",
    "labelEn": "Year(AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-577-maintain-profile-talent-reference-remark",
    "sourceRow": 577,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Talent Reference",
    "profileTab": "personal",
    "label": "Remark",
    "labelEn": "Remark",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-578-maintain-profile-talent-reference-attachment",
    "sourceRow": 578,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Talent Reference",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-579-maintain-profile-performance-group-year-ad",
    "sourceRow": 579,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Performance Group",
    "profileTab": "personal",
    "label": "Year(AD)",
    "labelEn": "Year(AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-580-maintain-profile-performance-group-group",
    "sourceRow": 580,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Performance Group",
    "profileTab": "personal",
    "label": "Group",
    "labelEn": "Group",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-581-maintain-profile-e-letter-year",
    "sourceRow": 581,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter",
    "profileTab": "personal",
    "label": "Year",
    "labelEn": "Year",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-582-maintain-profile-e-letter-group",
    "sourceRow": 582,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter",
    "profileTab": "personal",
    "label": "Group",
    "labelEn": "Group",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-583-maintain-profile-e-letter-attachment",
    "sourceRow": 583,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-584-maintain-profile-e-letter-more-information",
    "sourceRow": 584,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter",
    "profileTab": "personal",
    "label": "More Information",
    "labelEn": "More Information",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-585-maintain-profile-e-letter-password-e-letter-password",
    "sourceRow": 585,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter_Password",
    "profileTab": "personal",
    "label": "E-Letter Password",
    "labelEn": "E-Letter Password",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-586-maintain-profile-e-letter-password-year",
    "sourceRow": 586,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter_Password",
    "profileTab": "personal",
    "label": "Year",
    "labelEn": "Year",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-587-maintain-profile-e-letter-password-pa-grade",
    "sourceRow": 587,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter_Password",
    "profileTab": "personal",
    "label": "PA Grade",
    "labelEn": "PA Grade",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-588-maintain-profile-e-letter-password-new-salary",
    "sourceRow": 588,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter_Password",
    "profileTab": "compensation",
    "label": "New Salary",
    "labelEn": "New Salary",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-589-maintain-profile-e-letter-password-extra-overceiling",
    "sourceRow": 589,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter_Password",
    "profileTab": "personal",
    "label": "Extra Overceiling",
    "labelEn": "Extra Overceiling",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-590-maintain-profile-e-letter-password-bonus",
    "sourceRow": 590,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter_Password",
    "profileTab": "personal",
    "label": "Bonus",
    "labelEn": "Bonus",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-591-maintain-profile-e-letter-password-old-salary",
    "sourceRow": 591,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter_Password",
    "profileTab": "compensation",
    "label": "Old Salary",
    "labelEn": "Old Salary",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-592-maintain-profile-e-letter-password-note",
    "sourceRow": 592,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "E-Letter_Password",
    "profileTab": "personal",
    "label": "Note",
    "labelEn": "Note",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-593-maintain-profile-personal-assessment-summary-1-positive-side",
    "sourceRow": 593,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Personal Assessment Summary",
    "profileTab": "personal",
    "label": "1. Positive Side",
    "labelEn": "1. Positive Side",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-594-maintain-profile-personal-assessment-summary-2-positive-side",
    "sourceRow": 594,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Personal Assessment Summary",
    "profileTab": "personal",
    "label": "2. Positive Side",
    "labelEn": "2. Positive Side",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-595-maintain-profile-personal-assessment-summary-3-positive-side",
    "sourceRow": 595,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Personal Assessment Summary",
    "profileTab": "personal",
    "label": "3. Positive Side",
    "labelEn": "3. Positive Side",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-596-maintain-profile-personal-assessment-summary-1-need-to-be-improved-sid",
    "sourceRow": 596,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Personal Assessment Summary",
    "profileTab": "personal",
    "label": "1. Need to be Improved Side",
    "labelEn": "1. Need to be Improved Side",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-597-maintain-profile-personal-assessment-summary-2-need-to-be-improved-sid",
    "sourceRow": 597,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Personal Assessment Summary",
    "profileTab": "personal",
    "label": "2. Need to be Improved Side",
    "labelEn": "2. Need to be Improved Side",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-598-maintain-profile-personal-assessment-summary-3-need-to-be-improved-sid",
    "sourceRow": 598,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Personal Assessment Summary",
    "profileTab": "personal",
    "label": "3. Need to be Improved Side",
    "labelEn": "3. Need to be Improved Side",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-599-maintain-profile-individual-documents-document-name",
    "sourceRow": 599,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Individual Documents",
    "profileTab": "documents",
    "label": "Document Name",
    "labelEn": "Document Name",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-600-maintain-profile-individual-documents-effective-date",
    "sourceRow": 600,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Individual Documents",
    "profileTab": "documents",
    "label": "Effective Date",
    "labelEn": "Effective Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-601-maintain-profile-individual-documents-attachment",
    "sourceRow": 601,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Individual Documents",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-602-maintain-profile-flexible-spending-accounts-plan-name",
    "sourceRow": 602,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Flexible Spending Accounts",
    "profileTab": "personal",
    "label": "Plan Name",
    "labelEn": "Plan Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-603-maintain-profile-flexible-spending-accounts-election-amount",
    "sourceRow": 603,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Flexible Spending Accounts",
    "profileTab": "personal",
    "label": "Election Amount",
    "labelEn": "Election Amount",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-604-maintain-profile-flexible-spending-accounts-total-contributions",
    "sourceRow": 604,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Flexible Spending Accounts",
    "profileTab": "personal",
    "label": "Total Contributions",
    "labelEn": "Total Contributions",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-605-maintain-profile-flexible-spending-accounts-total-funds-out",
    "sourceRow": 605,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Flexible Spending Accounts",
    "profileTab": "personal",
    "label": "Total Funds Out",
    "labelEn": "Total Funds Out",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-606-maintain-profile-flexible-spending-accounts-total-repayments",
    "sourceRow": 606,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Flexible Spending Accounts",
    "profileTab": "compensation",
    "label": "Total Repayments",
    "labelEn": "Total Repayments",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-607-maintain-profile-flexible-spending-accounts-available-balance",
    "sourceRow": 607,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Flexible Spending Accounts",
    "profileTab": "personal",
    "label": "Available Balance",
    "labelEn": "Available Balance",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-608-maintain-profile-functional-experience-function",
    "sourceRow": 608,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Functional Experience",
    "profileTab": "personal",
    "label": "Function",
    "labelEn": "Function",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-609-maintain-profile-functional-experience-years-of-experience",
    "sourceRow": 609,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Functional Experience",
    "profileTab": "personal",
    "label": "Years of Experience",
    "labelEn": "Years of Experience",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-610-maintain-profile-functional-experience-comments",
    "sourceRow": 610,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Functional Experience",
    "profileTab": "personal",
    "label": "Comments",
    "labelEn": "Comments",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-611-maintain-profile-work-experience-within-company-history-start-date",
    "sourceRow": 611,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-612-maintain-profile-work-experience-within-company-history-end-date",
    "sourceRow": 612,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-613-maintain-profile-work-experience-within-company-history-event",
    "sourceRow": 613,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Event",
    "labelEn": "Event",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-614-maintain-profile-work-experience-within-company-history-event-reason",
    "sourceRow": 614,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Event Reason",
    "labelEn": "Event Reason",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-615-maintain-profile-work-experience-within-company-history-company",
    "sourceRow": 615,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Company",
    "labelEn": "Company",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-616-maintain-profile-work-experience-within-company-history-business-unit",
    "sourceRow": 616,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Business Unit",
    "labelEn": "Business Unit",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-617-maintain-profile-work-experience-within-company-history-function",
    "sourceRow": 617,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Function",
    "labelEn": "Function",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-618-maintain-profile-work-experience-within-company-history-organization",
    "sourceRow": 618,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Organization",
    "labelEn": "Organization",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-619-maintain-profile-work-experience-within-company-history-department",
    "sourceRow": 619,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Department",
    "labelEn": "Department",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-620-maintain-profile-work-experience-within-company-history-store-branch-c",
    "sourceRow": 620,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Store/Branch Code",
    "labelEn": "Store/Branch Code",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-621-maintain-profile-work-experience-within-company-history-work-location",
    "sourceRow": 621,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Work Location",
    "labelEn": "Work Location",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-622-maintain-profile-work-experience-within-company-history-posiiton-code",
    "sourceRow": 622,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Posiiton Code",
    "labelEn": "Posiiton Code",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-623-maintain-profile-work-experience-within-company-history-position-name",
    "sourceRow": 623,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Position Name",
    "labelEn": "Position Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-624-maintain-profile-work-experience-within-company-history-supervisor-id",
    "sourceRow": 624,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Supervisor ID",
    "labelEn": "Supervisor ID",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-625-maintain-profile-work-experience-within-company-history-job-family",
    "sourceRow": 625,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "emergency",
    "label": "Job Family",
    "labelEn": "Job Family",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-626-maintain-profile-work-experience-within-company-history-job-code",
    "sourceRow": 626,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Job Code",
    "labelEn": "Job Code",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-627-maintain-profile-work-experience-within-company-history-job-role",
    "sourceRow": 627,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Job Role",
    "labelEn": "Job Role",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-628-maintain-profile-work-experience-within-company-history-person-grade",
    "sourceRow": 628,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Person Grade",
    "labelEn": "Person Grade",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-629-maintain-profile-work-experience-within-company-history-job-grade",
    "sourceRow": 629,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Job Grade",
    "labelEn": "Job Grade",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-630-maintain-profile-work-experience-within-company-history-corperate-titl",
    "sourceRow": 630,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Corperate Title",
    "labelEn": "Corperate Title",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-631-maintain-profile-work-experience-within-company-history-band",
    "sourceRow": 631,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Band",
    "labelEn": "Band",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-632-maintain-profile-work-experience-within-company-history-employee-group",
    "sourceRow": 632,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Employee Group",
    "labelEn": "Employee Group",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-633-maintain-profile-work-experience-within-company-history-contract-type",
    "sourceRow": 633,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Work Experience Within Company (History)",
    "profileTab": "employment",
    "label": "Contract Type",
    "labelEn": "Contract Type",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-634-maintain-profile-leadership-experience-area-of-leadership",
    "sourceRow": 634,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Leadership Experience",
    "profileTab": "personal",
    "label": "Area of Leadership",
    "labelEn": "Area of Leadership",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-635-maintain-profile-leadership-experience-years-of-experience",
    "sourceRow": 635,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Leadership Experience",
    "profileTab": "personal",
    "label": "Years of Experience",
    "labelEn": "Years of Experience",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-636-maintain-profile-leadership-experience-number-of-people-managed",
    "sourceRow": 636,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Leadership Experience",
    "profileTab": "personal",
    "label": "Number of People Managed",
    "labelEn": "Number of People Managed",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-637-maintain-profile-leadership-experience-amount-managed-m",
    "sourceRow": 637,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Leadership Experience",
    "profileTab": "personal",
    "label": "Amount Managed (M)",
    "labelEn": "Amount Managed (M)",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-638-maintain-profile-leadership-experience-comments",
    "sourceRow": 638,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Leadership Experience",
    "profileTab": "personal",
    "label": "Comments",
    "labelEn": "Comments",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-639-maintain-profile-professional-memberships-organisation",
    "sourceRow": 639,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Professional Memberships",
    "profileTab": "personal",
    "label": "Organisation",
    "labelEn": "Organisation",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-640-maintain-profile-professional-memberships-position-role",
    "sourceRow": 640,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Professional Memberships",
    "profileTab": "employment",
    "label": "Position/Role",
    "labelEn": "Position/Role",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-641-maintain-profile-professional-memberships-start-date",
    "sourceRow": 641,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Professional Memberships",
    "profileTab": "personal",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-642-maintain-profile-professional-memberships-end-date",
    "sourceRow": 642,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Professional Memberships",
    "profileTab": "personal",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-643-maintain-profile-mobility-willing-to-relocate",
    "sourceRow": 643,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Willing to Relocate",
    "labelEn": "Willing to Relocate",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-644-maintain-profile-mobility-country",
    "sourceRow": 644,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Country",
    "labelEn": "Country",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-645-maintain-profile-mobility-province",
    "sourceRow": 645,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Province",
    "labelEn": "Province",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-646-maintain-profile-mobility-business-unit",
    "sourceRow": 646,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Business Unit",
    "labelEn": "Business Unit",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-647-maintain-profile-mobility-function",
    "sourceRow": 647,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Function",
    "labelEn": "Function",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-648-maintain-profile-mobility-comments",
    "sourceRow": 648,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Mobility",
    "profileTab": "personal",
    "label": "Comments",
    "labelEn": "Comments",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-649-maintain-profile-previous-work-history-start-date",
    "sourceRow": 649,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Work History",
    "profileTab": "personal",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-650-maintain-profile-previous-work-history-end-date",
    "sourceRow": 650,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Work History",
    "profileTab": "personal",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-651-maintain-profile-previous-work-history-company-name",
    "sourceRow": 651,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Work History",
    "profileTab": "employment",
    "label": "Company Name",
    "labelEn": "Company Name",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-652-maintain-profile-previous-work-history-type-of-business",
    "sourceRow": 652,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Work History",
    "profileTab": "personal",
    "label": "Type of Business",
    "labelEn": "Type of Business",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-653-maintain-profile-previous-work-history-function",
    "sourceRow": 653,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Work History",
    "profileTab": "personal",
    "label": "Function",
    "labelEn": "Function",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-654-maintain-profile-previous-work-history-position",
    "sourceRow": 654,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Work History",
    "profileTab": "employment",
    "label": "Position",
    "labelEn": "Position",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-655-maintain-profile-previous-work-history-additional-information",
    "sourceRow": 655,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Work History",
    "profileTab": "personal",
    "label": "Additional Information",
    "labelEn": "Additional Information",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-656-maintain-profile-previous-work-history-present-employer",
    "sourceRow": 656,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Previous Work History",
    "profileTab": "personal",
    "label": "Present Employer?",
    "labelEn": "Present Employer?",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-657-maintain-profile-career-aspirations-destination-role",
    "sourceRow": 657,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Career Aspirations",
    "profileTab": "personal",
    "label": "Destination Role",
    "labelEn": "Destination Role",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-658-maintain-profile-career-aspirations-level",
    "sourceRow": 658,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Career Aspirations",
    "profileTab": "personal",
    "label": "Level",
    "labelEn": "Level",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-659-maintain-profile-career-aspirations-function",
    "sourceRow": 659,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Career Aspirations",
    "profileTab": "personal",
    "label": "Function",
    "labelEn": "Function",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-660-maintain-profile-career-aspirations-business-unit",
    "sourceRow": 660,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Career Aspirations",
    "profileTab": "personal",
    "label": "Business Unit",
    "labelEn": "Business Unit",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-661-maintain-profile-career-aspirations-year-ad",
    "sourceRow": 661,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Career Aspirations",
    "profileTab": "personal",
    "label": "Year(AD)",
    "labelEn": "Year(AD)",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-662-maintain-profile-career-aspirations-type",
    "sourceRow": 662,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Career Aspirations",
    "profileTab": "personal",
    "label": "Type",
    "labelEn": "Type",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-663-maintain-profile-career-aspirations-comments",
    "sourceRow": 663,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Career Aspirations",
    "profileTab": "personal",
    "label": "Comments",
    "labelEn": "Comments",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-664-maintain-profile-career-aspirations-status",
    "sourceRow": 664,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Career Aspirations",
    "profileTab": "personal",
    "label": "Status",
    "labelEn": "Status",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-665-maintain-profile-career-aspirations-completed-date",
    "sourceRow": 665,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Career Aspirations",
    "profileTab": "personal",
    "label": "Completed Date",
    "labelEn": "Completed Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-666-maintain-profile-promotability-manager-view-only-level",
    "sourceRow": 666,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Promotability **Manager view only",
    "profileTab": "employment",
    "label": "Level",
    "labelEn": "Level",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-667-maintain-profile-promotability-manager-view-only-function",
    "sourceRow": 667,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Promotability **Manager view only",
    "profileTab": "employment",
    "label": "Function",
    "labelEn": "Function",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-668-maintain-profile-promotability-manager-view-only-timeframe",
    "sourceRow": 668,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Promotability **Manager view only",
    "profileTab": "employment",
    "label": "Timeframe",
    "labelEn": "Timeframe",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-669-maintain-profile-special-assignments-projects-assignment-project",
    "sourceRow": 669,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Special Assignments/Projects",
    "profileTab": "personal",
    "label": "Assignment/Project",
    "labelEn": "Assignment/Project",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-670-maintain-profile-special-assignments-projects-description",
    "sourceRow": 670,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Special Assignments/Projects",
    "profileTab": "personal",
    "label": "Description",
    "labelEn": "Description",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-671-maintain-profile-special-assignments-projects-comments",
    "sourceRow": 671,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Special Assignments/Projects",
    "profileTab": "personal",
    "label": "Comments",
    "labelEn": "Comments",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-672-maintain-profile-special-assignments-projects-start-date",
    "sourceRow": 672,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Special Assignments/Projects",
    "profileTab": "personal",
    "label": "Start Date",
    "labelEn": "Start Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-673-maintain-profile-special-assignments-projects-end-date",
    "sourceRow": 673,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "Special Assignments/Projects",
    "profileTab": "personal",
    "label": "End Date",
    "labelEn": "End Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-674-maintain-profile-ohs-certificate-completion-date",
    "sourceRow": 674,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Certificate",
    "profileTab": "documents",
    "label": "Completion date",
    "labelEn": "Completion date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-675-maintain-profile-ohs-certificate-institute-id",
    "sourceRow": 675,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Certificate",
    "profileTab": "documents",
    "label": "Institute ID",
    "labelEn": "Institute ID",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-676-maintain-profile-ohs-certificate-description",
    "sourceRow": 676,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Certificate",
    "profileTab": "documents",
    "label": "Description",
    "labelEn": "Description",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-677-maintain-profile-ohs-certificate-comments",
    "sourceRow": 677,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Certificate",
    "profileTab": "documents",
    "label": "Comments",
    "labelEn": "Comments",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-678-maintain-profile-ohs-certificate-certificate-number",
    "sourceRow": 678,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Certificate",
    "profileTab": "documents",
    "label": "Certificate Number",
    "labelEn": "Certificate Number",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-679-maintain-profile-ohs-certificate-course",
    "sourceRow": 679,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Certificate",
    "profileTab": "documents",
    "label": "Course",
    "labelEn": "Course",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-680-maintain-profile-ohs-certificate-course",
    "sourceRow": 680,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Certificate",
    "profileTab": "documents",
    "label": "Course",
    "labelEn": "Course",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-681-maintain-profile-ohs-document-registration-date",
    "sourceRow": 681,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Document",
    "profileTab": "documents",
    "label": "Registration Date",
    "labelEn": "Registration Date",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-682-maintain-profile-ohs-document-inactive-date",
    "sourceRow": 682,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Document",
    "profileTab": "documents",
    "label": "Inactive Date",
    "labelEn": "Inactive Date",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-683-maintain-profile-ohs-document-labour-department-area",
    "sourceRow": 683,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Document",
    "profileTab": "documents",
    "label": "Labour Department Area",
    "labelEn": "Labour Department Area",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-684-maintain-profile-ohs-document-document-number",
    "sourceRow": 684,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Document",
    "profileTab": "documents",
    "label": "Document Number",
    "labelEn": "Document Number",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-685-maintain-profile-ohs-document-safety-officer-level",
    "sourceRow": 685,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Document",
    "profileTab": "documents",
    "label": "Safety Officer Level",
    "labelEn": "Safety Officer Level",
    "mandatoryRule": "Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "required",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-686-maintain-profile-ohs-document-direct-link-name",
    "sourceRow": 686,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Document",
    "profileTab": "documents",
    "label": "Direct Link - Name",
    "labelEn": "Direct Link - Name",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-687-maintain-profile-ohs-document-direct-link-url",
    "sourceRow": 687,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Document",
    "profileTab": "documents",
    "label": "Direct Link - URL",
    "labelEn": "Direct Link - URL",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  },
  {
    "fieldId": "ec-688-maintain-profile-ohs-document-attachment",
    "sourceRow": 688,
    "process": "Maintain",
    "section": "Profile",
    "subSection": "OHS Document",
    "profileTab": "documents",
    "label": "Attachment",
    "labelEn": "Attachment",
    "mandatoryRule": "Not Required",
    "conditionalRule": "Not Required",
    "mandatoryKind": "optional",
    "employeeGroups": [
      {
        "group": "All groups",
        "rule": "Applies unless filtered by HR"
      }
    ],
    "editability": "editable",
    "editabilityKind": "editable",
    "defaultValue": "",
    "validationNote": "",
    "hrConfirmLogic": "",
    "hrConfirmRequired": false,
    "hrConfirmDetail": "",
    "remark": "",
    "maintainEditType": "",
    "maintainOwners": [],
    "dbMapping": {
      "table": "",
      "field": "",
      "type": "",
      "length": "",
      "lov": ""
    },
    "validationStatus": "pending_review",
    "reviewerComment": "",
    "reviewTimestamp": ""
  }
] satisfies ECFieldCatalogueItem[];
