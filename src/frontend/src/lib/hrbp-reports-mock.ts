// STA-27 PR-B' — hrbp-reports-mock.ts
// Deterministic mock helpers for the 4 HRBP benefits reports.
// All values are hash-based — stable across renders. No real API.
// Scope filter (partneredDepts) documents limitation: mock claim rows are not
// actually narrowed by dept in the mockup phase — see sta-27-quick-approve-predicate-audit.md

/** djb2 hash — stable numeric key from a string */
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) ^ s.charCodeAt(i);
    h = h >>> 0;
  }
  return h;
}

// ── Shared employee seed ──────────────────────────────────────────────────────

const MOCK_EMPLOYEES = [
  { id: 'EMP001', nameEn: 'Arisa Tanaka', nameTh: 'อริสา ทานาคะ', dept: 'Finance' },
  { id: 'EMP002', nameEn: 'Bundit Charoenwong', nameTh: 'บัณฑิต เจริญวงศ์', dept: 'HR' },
  { id: 'EMP003', nameEn: 'Chalinee Siriporn', nameTh: 'ชลินี ศิริพร', dept: 'IT' },
  { id: 'EMP004', nameEn: 'Dechawat Phumiphat', nameTh: 'เดชวัฒน์ ภูมิพัฒน์', dept: 'Finance' },
  { id: 'EMP005', nameEn: 'Ekkachai Rungrat', nameTh: 'เอกชัย รุ่งรัตน์', dept: 'HR' },
  { id: 'EMP006', nameEn: 'Fah Natthida', nameTh: 'ฟ้า ณัฐธิดา', dept: 'IT' },
  { id: 'EMP007', nameEn: 'Gamon Preeda', nameTh: 'กมล ปรีดา', dept: 'Finance' },
  { id: 'EMP008', nameEn: 'Hathaiporn Sombat', nameTh: 'หทัยพร สมบัติ', dept: 'HR' },
] as const;

const PLAN_CODES = [
  { code: 'BE-MED-001', nameEn: 'Medical OPD', nameTh: 'ค่ารักษาพยาบาล (ผู้ป่วยนอก)' },
  { code: 'BE-MED-002', nameEn: 'Medical IPD', nameTh: 'ค่ารักษาพยาบาล (ผู้ป่วยใน)' },
  { code: 'BE-DEN-001', nameEn: 'Dental', nameTh: 'ค่าทำฟัน' },
  { code: 'BE-OPT-001', nameEn: 'Optical', nameTh: 'ค่าแว่นตา' },
] as const;

const CLAIM_STATUSES = ['approved', 'pending', 'rejected'] as const;

// ── HR-RP-01: Claim Report ────────────────────────────────────────────────────

export interface ClaimRecord {
  claimId: string;
  employeeId: string;
  nameEn: string;
  nameTh: string;
  dept: string;
  planCode: string;
  planNameEn: string;
  planNameTh: string;
  amountThb: number;
  status: string;
  date: string;
}

/**
 * Returns mock claim records.
 * NOTE: partneredDepts param is accepted for API-stability but does not
 * actually filter rows in the mockup phase (scope-filter degraded — see audit doc).
 */
export function getClaimReportData(_partneredDepts: string[]): ClaimRecord[] {
  const records: ClaimRecord[] = [];
  MOCK_EMPLOYEES.forEach((emp) => {
    PLAN_CODES.forEach((plan) => {
      const key = `${emp.id}:${plan.code}:claim`;
      const h = hashStr(key);
      // ~75% of combos have a claim
      if (h % 4 === 0) return;
      const amountThb = 500 + ((h % 60) * 500);
      const statusIdx = h % 3;
      const month = 1 + (h % 5); // Jan–May 2026
      const day = 1 + ((h >>> 4) % 28);
      const date = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      records.push({
        claimId: `CLM-${(h % 9000) + 1000}`,
        employeeId: emp.id,
        nameEn: emp.nameEn,
        nameTh: emp.nameTh,
        dept: emp.dept,
        planCode: plan.code,
        planNameEn: plan.nameEn,
        planNameTh: plan.nameTh,
        amountThb,
        status: CLAIM_STATUSES[statusIdx],
        date,
      });
    });
  });
  return records;
}

// ── HR-RP-02: Cost Analysis ───────────────────────────────────────────────────

export interface CostMonth {
  monthKey: string;
  monthEn: string;
  monthTh: string;
  amountThb: number;
  isProjected: boolean;
}

export function getCostAnalysisData(): { historical: CostMonth[]; predictive: CostMonth[] } {
  const HISTORICAL: Array<{ key: string; en: string; th: string }> = [
    { key: 'feb', en: 'Feb 2026', th: 'ก.พ. 2569' },
    { key: 'mar', en: 'Mar 2026', th: 'มี.ค. 2569' },
    { key: 'apr', en: 'Apr 2026', th: 'เม.ย. 2569' },
  ];
  const PREDICTIVE: Array<{ key: string; en: string; th: string }> = [
    { key: 'may', en: 'May 2026', th: 'พ.ค. 2569' },
    { key: 'jun', en: 'Jun 2026', th: 'มิ.ย. 2569' },
    { key: 'jul', en: 'Jul 2026', th: 'ก.ค. 2569' },
  ];

  // Historical: hash-based amounts in 50k–200k range
  const historical: CostMonth[] = HISTORICAL.map((m) => {
    const h = hashStr(`cost:historical:${m.key}`);
    const amountThb = 50000 + (h % 31) * 5000;
    return { monthKey: m.key, monthEn: m.en, monthTh: m.th, amountThb, isProjected: false };
  });

  // Predictive: simple linear projection from historical average + small variance
  const avgHistorical = historical.reduce((s, m) => s + m.amountThb, 0) / historical.length;
  const predictive: CostMonth[] = PREDICTIVE.map((m, i) => {
    const h = hashStr(`cost:predictive:${m.key}`);
    // +2–8% trend per month
    const trendFactor = 1 + (0.02 + (h % 7) * 0.01) * (i + 1);
    const amountThb = Math.round(avgHistorical * trendFactor / 1000) * 1000;
    return { monthKey: m.key, monthEn: m.en, monthTh: m.th, amountThb, isProjected: true };
  });

  return { historical, predictive };
}

// ── HR-RP-03: Enrollment ──────────────────────────────────────────────────────

export interface EnrollmentPlanRow {
  planCode: string;
  planNameEn: string;
  planNameTh: string;
  enrolled: number;
  total: number;
  pct: number;
}

const ENROLLMENT_PLANS = [
  { code: 'BE-MED-001', nameEn: 'Medical OPD', nameTh: 'ค่ารักษาพยาบาล (ผู้ป่วยนอก)', total: 120 },
  { code: 'BE-MED-002', nameEn: 'Medical IPD', nameTh: 'ค่ารักษาพยาบาล (ผู้ป่วยใน)', total: 120 },
  { code: 'BE-DEN-001', nameEn: 'Dental', nameTh: 'ค่าทำฟัน', total: 115 },
  { code: 'BE-OPT-001', nameEn: 'Optical', nameTh: 'ค่าแว่นตา', total: 110 },
  { code: 'BE-FIT-001', nameEn: 'Fitness', nameTh: 'ค่าออกกำลังกาย', total: 100 },
  { code: 'BE-LIFE-001', nameEn: 'Group Life Insurance', nameTh: 'ประกันชีวิตกลุ่ม', total: 120 },
  { code: 'BE-GHI-001', nameEn: 'Group Health Insurance', nameTh: 'ประกันสุขภาพกลุ่ม', total: 120 },
] as const;

export function getEnrollmentByPlan(): EnrollmentPlanRow[] {
  return ENROLLMENT_PLANS.map((p) => {
    const h = hashStr(`enrollment:${p.code}`);
    // Enrolled ratio: 35–99% range
    const ratioPct = 35 + (h % 65);
    const enrolled = Math.round((p.total * ratioPct) / 100);
    const pct = Math.round((enrolled / p.total) * 100);
    return {
      planCode: p.code,
      planNameEn: p.nameEn,
      planNameTh: p.nameTh,
      enrolled,
      total: p.total,
      pct,
    };
  });
}

// ── HR-RP-04: Special Privilege ───────────────────────────────────────────────

export interface PrivilegeRecord {
  privilegeId: string;
  employeeId: string;
  nameEn: string;
  nameTh: string;
  dept: string;
  privilegeTypeEn: string;
  privilegeTypeTh: string;
  reasonEn: string;
  reasonTh: string;
  validUntil: string;
  isActive: boolean;
}

const PRIVILEGE_TYPES = [
  { en: 'Extended Medical Limit', th: 'วงเงินรักษาพยาบาลเพิ่มพิเศษ' },
  { en: 'Executive Dental Plan', th: 'แผนทำฟันระดับผู้บริหาร' },
  { en: 'Flexible Work Benefit', th: 'สวัสดิการทำงานยืดหยุ่น' },
  { en: 'Hardship Allowance', th: 'เบี้ยเลี้ยงพิเศษ' },
  { en: 'Relocation Support', th: 'ค่าสนับสนุนการย้ายถิ่น' },
] as const;

const REASONS = [
  { en: 'Approved by HRBP committee', th: 'อนุมัติโดยคณะกรรมการ HRBP' },
  { en: 'Performance retention package', th: 'แพ็คเกจรักษาพนักงานผลงานดี' },
  { en: 'Special project assignment', th: 'มอบหมายโครงการพิเศษ' },
] as const;

/**
 * Returns mock special privilege records.
 * NOTE: partneredDepts not used to filter in mockup phase (scope-filter degraded).
 */
export function getSpecialPrivilegeRecords(_partneredDepts: string[]): PrivilegeRecord[] {
  const records: PrivilegeRecord[] = [];
  // Generate 8 records from mock employees
  MOCK_EMPLOYEES.forEach((emp, i) => {
    const key = `privilege:${emp.id}`;
    const h = hashStr(key);
    // ~75% have a privilege record
    if (i >= 6 && h % 3 === 0) return;
    const typeIdx = h % PRIVILEGE_TYPES.length;
    const reasonIdx = (h >>> 4) % REASONS.length;
    const endYear = 2026 + ((h >>> 8) % 2);
    const endMonth = 1 + ((h >>> 12) % 12);
    const validUntil = `${endYear}-${String(endMonth).padStart(2, '0')}-01`;
    const isActive = new Date(validUntil) > new Date('2026-05-17');
    records.push({
      privilegeId: `PRV-${(h % 900) + 100}`,
      employeeId: emp.id,
      nameEn: emp.nameEn,
      nameTh: emp.nameTh,
      dept: emp.dept,
      privilegeTypeEn: PRIVILEGE_TYPES[typeIdx].en,
      privilegeTypeTh: PRIVILEGE_TYPES[typeIdx].th,
      reasonEn: REASONS[reasonIdx].en,
      reasonTh: REASONS[reasonIdx].th,
      validUntil,
      isActive,
    });
  });
  return records;
}
