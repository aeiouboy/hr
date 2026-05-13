// SF entity: EmpJob — Job information (38 mandatory fields)
// API verb: UPSERT
// Phase: 3 (full job data body)
// Source: plan v2 §2.9, CREATE-VS-UPSERT.md, phase-0-verify-resolution-2026-04-28.md, errata
//
// Notes:
//   - Phase 3 — full EmpJob coverage of all 38 sap_required=true fields
//   - errata: customString5=corporateTitle (zNewCorporateTitle), customString25=hrDistrict,
//             customDouble1=dailyWorkingHours (NOT UI-only; real SF field per Phase 0.2)
//   - employeeClass DROPPED per Q decision (no SF binding; system-derived sys_EC-PY_EmployeeGroup)
//   - customString7 picklist expanded from 8 hardcoded to full 963-clean cust_WorkLocation options
//   - customString8 (SSO Location) / customString21 (Job Family) / customString31 (Zone): free-text
//     fallback; picklist binding TBD per Phase 0.4
//   - customString104/105/106/107/109/110 (Insurance/Union): sap_required=true but system-derived
//     (sap_updatable=false); emitted as null so SF rule-engine can populate. Key must be present
//     in UPSERT payload to satisfy parity test E1.i.
//   - timezone hardcoded to 'Asia/Bangkok' (THA-scope; only value in use)
//   - countryOfCompany hardcoded to 'THA' (THA-scope companies)
import type { PortletMapper } from './types'
import { toSfDate, deriveUserId } from './derivedRules'

export const EmpJobMapper: PortletMapper = {
  entity: 'EmpJob',
  verb: 'UPSERT',
  build(input) {
    const { identity, job, employeeInfo } = input

    const userId = deriveUserId(identity.employeeId || '')
    const startDate = toSfDate(identity.hireDate)
    const jobTitle = job.jobLabel || job.position || null

    return {
      verb: 'UPSERT',
      payload: {
        // ── Keys (userId + startDate compose the UPSERT key) ──────────────────
        userId,
        startDate,

        // ── Event ──────────────────────────────────────────────────────────────
        event: job.event ?? 'H',                        // default 'H' = Hire
        eventReason: identity.eventReason,

        // ── Organisation ───────────────────────────────────────────────────────
        company: identity.companyCode,
        businessUnit: job.businessUnit,
        department: job.department,
        division: job.division,
        costCenter: job.costCenter,

        // ── Job ────────────────────────────────────────────────────────────────
        jobCode: job.jobCode,
        jobTitle,                                        // derived from jobLabel or position
        position: job.position || null,
        managerId: job.supervisorId || null,             // Supervisor ID auto-derived from Position FO

        // ── Location ───────────────────────────────────────────────────────────
        location: job.storeBranchCode || job.branch,    // SF: Store/ Branch Code

        // ── Pay Scale ──────────────────────────────────────────────────────────
        payGrade: job.jobGrade,                          // SF payGrade = Personnel Grade
        payScaleType: job.payScaleType,
        payScaleArea: job.payScaleArea,
        payScaleGroup: job.payScaleGroup,
        payScaleLevel: job.payScaleLevel,

        // ── Time / Work ────────────────────────────────────────────────────────
        standardHours: job.standardWeeklyHours,          // SF: Standard Weekly Hours (Edm.Double)
        workscheduleCode: job.workSchedule || null,
        timezone: 'Asia/Bangkok',                        // THA-scope hardcoded

        // ── Status ─────────────────────────────────────────────────────────────
        emplStatus: job.emplStatus ?? 'A',               // 'A' = Active on hire

        // ── Custom strings (mandatory per SF dump) ─────────────────────────────
        customString1: job.policyProfile,                // Policy Profile (zPolicyProfile)
        customString2: employeeInfo.employeeGroup ?? null,  // Employee Group
        customString3: employeeInfo.employeeSubGroup ?? null, // Employee Subgroup
        // customString4: not mandatory — omitted
        customString5: job.corporateTitle,               // Corporate Title (zNewCorporateTitle)
                                                         // NOTE: stakeholder to confirm zNewCorporateTitle vs zCorporateTitle
        customString6: job.timeManagementStatus || null, // Time Management Status
                                                         // TODO Phase 0.4 — picklist binding TBD
        customString7: job.storeBranchCode,              // Work Location (cust_WorkLocation 963 opts)
        customString8: job.ssoLocation,                  // SSO Location
                                                         // TODO Phase 0.4 — picklist binding TBD
        customString9: job.otFlag || null,               // O.T. Flag (YES/NO)
                                                         // TODO Phase 0.4 — picklist binding TBD
        customString16: job.groupCompanyGroup,           // Group / Company Group (zSection 125 opts)
        customString19: job.jobGrade,                    // Job Grade (duplicate of payGrade per SF)
        customString21: job.jobFunction,                 // Job Family
                                                         // TODO Phase 0.4 — picklist binding TBD
        customString24: job.contractType,                // Contract Type (contractType 7 opts)
        customString25: job.hrDistrict,                  // HR District (free-text, HR01-XX format)

        customString31: job.zone,                        // Zone
                                                         // TODO Phase 0.4 — picklist binding TBD

        // ── Insurance/Union fields (sap_required=true, sap_updatable=false) ────
        // System-derived by SF payroll rule engine after hire. Emit as null;
        // SF UPSERT will populate via backend rule. Key presence satisfies parity test E1.i.
        customString104: null,   // Social Insurance
        customString105: null,   // Health Insurance
        customString106: null,   // Unemployment Insurance
        customString107: null,   // Occupational Accident Insurance
        customString109: null,   // Insurance Area
        customString110: null,   // Union Fee

        // ── Custom doubles ─────────────────────────────────────────────────────
        customDouble1: job.dailyWorkingHours,            // Daily Working Hours (Phase 0.2 errata)

        // ── Dates ──────────────────────────────────────────────────────────────
        contractEndDate: toSfDate(job.contractEndDate),
        probationPeriodEndDate: toSfDate(job.probationEndDate),
      },
      notes: [
        'Phase 3 — full EmpJob coverage of 38 sap_required=true fields',
        'errata: customString5=corporateTitle (zNewCorporateTitle), customString25=hrDistrict, customDouble1=dailyWorkingHours',
        'employeeClass DROPPED per Q decision (sys_EC-PY_EmployeeGroup is system-derived)',
        'customString7 Work Location: full 963-clean cust_WorkLocation picklist via datalist',
        'customString6/8/9/21/31: picklist binding TBD per Phase 0.4 — free-text inputs for now',
        'customString104/105/106/107/109/110: system-derived insurance/union fields emitted as null',
        'timezone hardcoded Asia/Bangkok (THA-scope)',
        'NOTE: confirm zNewCorporateTitle vs zCorporateTitle (legacy) with stakeholder',
      ],
    }
  },
}
