import { describe, it, expect } from 'vitest';
import en from '../../../messages/en.json';
import th from '../../../messages/th.json';

type Messages = Record<string, unknown>;

/** Recursively collect all leaf keys as dot-separated paths */
function flattenKeys(obj: Messages, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      keys.push(...flattenKeys(v as Messages, path));
    } else {
      keys.push(path);
    }
  }
  return keys.sort();
}

/** Get nested value by dot path */
function getNestedValue(obj: Messages, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Messages)[key];
    return undefined;
  }, obj);
}

// ─── Structural completeness ────────────────────────────────────

describe('i18n structural completeness', () => {
  const enKeys = flattenKeys(en);
  const thKeys = flattenKeys(th);

  it('EN and TH have identical namespace count', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(th).sort());
  });

  it('EN and TH have identical total key count (2,895)', () => {
    // Baseline 2,895 — updated to 3,017 after Humi redesign sprint added
    // humiEmployeeDetail (21 keys) + humiOrgChart (12 keys) + EN completeness fixes
    expect(enKeys.length).toBe(thKeys.length);
    expect(enKeys.length).toBeGreaterThanOrEqual(2895);
  });

  it('every EN key exists in TH', () => {
    const missing = enKeys.filter((k) => !thKeys.includes(k));
    expect(missing).toEqual([]);
  });

  it('every TH key exists in EN', () => {
    const extra = thKeys.filter((k) => !enKeys.includes(k));
    expect(extra).toEqual([]);
  });

  it('no EN value is empty string', () => {
    const empties = enKeys.filter((k) => getNestedValue(en, k) === '');
    expect(empties).toEqual([]);
  });

  it('no TH value is empty string', () => {
    const empties = thKeys.filter((k) => getNestedValue(th, k) === '');
    expect(empties).toEqual([]);
  });

  it('no TH value is identical to EN (copy-paste detection) for non-technical keys', () => {
    // Exclude keys where EN=TH is expected (proper nouns, codes, abbreviations)
    const allowIdentical = new Set([
      'govReports.reports.pnd1.name',     // "PND.1" is a code
      'govReports.reports.pnd1k.name',
      'govReports.reports.cert50tawi.name',
      'govReports.reports.sps110.name',
      'payrollSetup.earnings.sso',
      'payrollSetup.earnings.pvd',
      'hospitalReferral.companyName',      // brand name may differ
    ]);

    // Only check the sections that were newly added
    const sectionsToCheck = [
      'govReports', 'payrollProcessing', 'payrollSetup',
      'home', 'probation', 'personHero', 'emptyValue', 'hospitalReferral',
    ];

    const identical: string[] = [];
    for (const key of enKeys) {
      const ns = key.split('.')[0];
      if (!sectionsToCheck.includes(ns)) continue;
      if (allowIdentical.has(key)) continue;

      const enVal = getNestedValue(en, key);
      const thVal = getNestedValue(th, key);
      if (typeof enVal === 'string' && enVal === thVal) {
        identical.push(key);
      }
    }
    expect(identical).toEqual([]);
  });
});

// ─── New sections: key presence ────────────────────────────────

describe('govReports section', () => {
  it('has all required top-level keys', () => {
    const required = [
      'title', 'subtitle', 'description', 'generate', 'generateReport',
      'reportHistory', 'status', 'type', 'reportType', 'period',
      'generatedAt', 'format', 'generating', 'generateSuccess', 'generateError',
    ];
    for (const key of required) {
      expect(en).toHaveProperty(['govReports', key]);
      expect(th).toHaveProperty(['govReports', key]);
    }
  });

  it('has all 12 Thai month names', () => {
    for (let i = 1; i <= 12; i++) {
      expect(en).toHaveProperty(['govReports', 'months', String(i)]);
      expect(th).toHaveProperty(['govReports', 'months', String(i)]);
    }
  });

  it('Thai months are in Thai language', () => {
    const thMonths = (th as Messages).govReports as Messages;
    const months = thMonths.months as Messages;
    expect(months['1']).toBe('มกราคม');
    expect(months['4']).toBe('เมษายน');
    expect(months['12']).toBe('ธันวาคม');
  });

  it('has Thai government report types (PND.1, PND.1K, 50 Tawi, SSO 1-10)', () => {
    const reports = ['pnd1', 'pnd1k', 'cert50tawi', 'sps110'];
    for (const r of reports) {
      expect(en).toHaveProperty(['govReports', 'reports', r, 'name']);
      expect(en).toHaveProperty(['govReports', 'reports', r, 'fullName']);
      expect(en).toHaveProperty(['govReports', 'reports', r, 'description']);
      expect(th).toHaveProperty(['govReports', 'reports', r, 'name']);
      expect(th).toHaveProperty(['govReports', 'reports', r, 'fullName']);
      expect(th).toHaveProperty(['govReports', 'reports', r, 'description']);
    }
  });

  it('TH report names use Thai abbreviations', () => {
    const thReports = ((th as Messages).govReports as Messages).reports as Messages;
    expect((thReports.pnd1 as Messages).name).toBe('ภ.ง.ด.1');
    expect((thReports.pnd1k as Messages).name).toBe('ภ.ง.ด.1ก');
    expect((thReports.cert50tawi as Messages).name).toBe('50 ทวิ');
    expect((thReports.sps110 as Messages).name).toBe('สปส. 1-10');
  });
});

describe('payroll section', () => {
  it('has the 3 new keys from builder', () => {
    const newKeys = ['employeesOnPayroll', 'lastRun', 'nextRun'];
    for (const key of newKeys) {
      expect(en).toHaveProperty(['payroll', key]);
      expect(th).toHaveProperty(['payroll', key]);
    }
  });

  it('TH translations are Thai language', () => {
    const p = (th as Messages).payroll as Messages;
    expect(p.employeesOnPayroll).toBe('พนักงานในระบบเงินเดือน');
    expect(p.lastRun).toBe('ประมวลผลล่าสุด');
    expect(p.nextRun).toBe('ประมวลผลครั้งถัดไป');
  });

  it('has payroll status sub-keys', () => {
    const statuses = ['draft', 'pending', 'approved', 'rejected', 'completed'];
    for (const s of statuses) {
      expect(en).toHaveProperty(['payroll', 'status', s]);
      expect(th).toHaveProperty(['payroll', 'status', s]);
    }
  });

  it('has payroll step sub-keys', () => {
    const steps = ['period', 'calculate', 'review', 'approve'];
    for (const s of steps) {
      expect(en).toHaveProperty(['payroll', 'step', s]);
      expect(th).toHaveProperty(['payroll', 'step', s]);
    }
  });
});

describe('payrollProcessing section', () => {
  it('has all stage keys', () => {
    const stages = ['period_selection', 'calculation', 'review', 'approval'];
    for (const s of stages) {
      expect(en).toHaveProperty(['payrollProcessing', 'stages', s]);
      expect(th).toHaveProperty(['payrollProcessing', 'stages', s]);
    }
  });

  it('has review table keys', () => {
    const keys = [
      'reviewTable', 'exportExcel', 'employee', 'department',
      'gross', 'tax', 'deductions', 'net',
    ];
    for (const key of keys) {
      expect(en).toHaveProperty(['payrollProcessing', key]);
      expect(th).toHaveProperty(['payrollProcessing', key]);
    }
  });

  it('has approval keys', () => {
    const keys = ['approvalStage', 'approved', 'payrollApproved', 'payrollApprovedDesc', 'approvePayroll'];
    for (const key of keys) {
      expect(en).toHaveProperty(['payrollProcessing', key]);
      expect(th).toHaveProperty(['payrollProcessing', key]);
    }
  });

  it('TH stages are Thai language', () => {
    const stages = ((th as Messages).payrollProcessing as Messages).stages as Messages;
    expect(stages.period_selection).toBe('เลือกงวด');
    expect(stages.calculation).toBe('คำนวณ');
    expect(stages.review).toBe('ตรวจสอบ');
    expect(stages.approval).toBe('อนุมัติ');
  });
});

describe('payrollSetup section', () => {
  it('has pay period configuration keys', () => {
    const keys = ['payPeriod', 'payPeriodType', 'monthly', 'biWeekly', 'paymentDay'];
    for (const key of keys) {
      expect(en).toHaveProperty(['payrollSetup', key]);
      expect(th).toHaveProperty(['payrollSetup', key]);
    }
  });

  it('has contribution rate keys', () => {
    const keys = ['contributionRates', 'ssoRate', 'pfRate', 'ssoMaxBase'];
    for (const key of keys) {
      expect(en).toHaveProperty(['payrollSetup', key]);
      expect(th).toHaveProperty(['payrollSetup', key]);
    }
  });

  it('has tax bracket keys', () => {
    const keys = ['taxBrackets', 'thaiPIT2026', 'incomeRange', 'taxRate'];
    for (const key of keys) {
      expect(en).toHaveProperty(['payrollSetup', key]);
      expect(th).toHaveProperty(['payrollSetup', key]);
    }
  });

  it('has bank transfer keys', () => {
    const keys = ['bankTransfer', 'enabled', 'disabled', 'defaultBank'];
    for (const key of keys) {
      expect(en).toHaveProperty(['payrollSetup', key]);
      expect(th).toHaveProperty(['payrollSetup', key]);
    }
  });

  it('has tab navigation keys', () => {
    const tabs = ['earnings', 'deductions', 'tax', 'banks'];
    for (const t of tabs) {
      expect(en).toHaveProperty(['payrollSetup', 'tabs', t]);
      expect(th).toHaveProperty(['payrollSetup', 'tabs', t]);
    }
  });

  it('has calculation type keys', () => {
    const types = ['fixed', 'percentage', 'progressive', 'hourly', 'daily', 'per_occurrence'];
    for (const t of types) {
      expect(en).toHaveProperty(['payrollSetup', 'calcTypes', t]);
      expect(th).toHaveProperty(['payrollSetup', 'calcTypes', t]);
    }
  });

  it('has tax deduction allowance keys', () => {
    const allowances = [
      'personalAllowance', 'spouseAllowance', 'childAllowance',
      'parentAllowance', 'lifeInsurance', 'healthInsurance',
      'providentFund', 'socialSecurity', 'homeLoanInterest',
    ];
    for (const a of allowances) {
      expect(en).toHaveProperty(['payrollSetup', 'tax', a]);
      expect(th).toHaveProperty(['payrollSetup', 'tax', a]);
    }
  });
});

describe('home section', () => {
  it('has new keys from builder', () => {
    const newKeys = [
      'welcomeBack', 'leaveBalance', 'pendingItems', 'tenure',
      'quickProfile', 'quickLeave', 'quickPayslip', 'quickWorkflows',
      'announcements', 'jobPostings',
    ];
    for (const key of newKeys) {
      expect(en).toHaveProperty(['home', key]);
      expect(th).toHaveProperty(['home', key]);
    }
  });

  it('TH quick action labels are concise Thai', () => {
    const h = (th as Messages).home as Messages;
    expect(h.quickProfile).toBe('โปรไฟล์');
    expect(h.quickLeave).toBe('ขอลา');
    expect(h.quickPayslip).toBe('สลิปเงินเดือน');
    expect(h.quickWorkflows).toBe('งานที่รออนุมัติ');
  });

  it('TH welcomeBack is Thai', () => {
    expect((th as Messages).home).toHaveProperty('welcomeBack', 'ยินดีต้อนรับกลับมา');
  });
});

describe('probation section', () => {
  it('has filter tab keys', () => {
    const tabs = ['allCases', 'pendingApproval', 'passed', 'failedOrExtended'];
    for (const key of tabs) {
      expect(en).toHaveProperty(['probation', key]);
      expect(th).toHaveProperty(['probation', key]);
    }
  });

  it('has status label keys', () => {
    const statuses = [
      'statusPendingManager', 'statusPendingHr', 'statusApproved',
      'statusRejected', 'statusExtended', 'statusEscalatedCeo',
    ];
    for (const key of statuses) {
      expect(en).toHaveProperty(['probation', key]);
      expect(th).toHaveProperty(['probation', key]);
    }
  });

  it('has detail page keys', () => {
    const keys = [
      'hireDate', 'probationEnd', 'takeAction', 'commentLabel',
      'backToList', 'probationDue', 'extendedUntil', 'slaRemaining',
      'infoTitle', 'currentApprover', 'commentPlaceholder',
      'approve', 'reject', 'workflowCompleted', 'startedWork',
    ];
    for (const key of keys) {
      expect(en).toHaveProperty(['probation', key]);
      expect(th).toHaveProperty(['probation', key]);
    }
  });

  it('TH filter tabs are Thai', () => {
    const p = (th as Messages).probation as Messages;
    expect(p.allCases).toBe('ทั้งหมด');
    expect(p.pendingApproval).toBe('รออนุมัติ');
    expect(p.passed).toBe('ผ่านแล้ว');
    expect(p.failedOrExtended).toBe('ไม่ผ่าน / ขยาย');
  });

  it('TH action buttons are Thai', () => {
    const p = (th as Messages).probation as Messages;
    expect(p.approve).toBe('อนุมัติ');
    expect(p.reject).toBe('ไม่อนุมัติ');
  });
});

describe('personHero section', () => {
  it('has all 5 status keys', () => {
    const statuses = ['active', 'probation', 'inactive', 'terminated', 'onLeave'];
    for (const s of statuses) {
      expect(en).toHaveProperty(['personHero', s]);
      expect(th).toHaveProperty(['personHero', s]);
    }
  });

  it('TH status labels are Thai', () => {
    const ph = (th as Messages).personHero as Messages;
    expect(ph.active).toBe('ทำงานอยู่');
    expect(ph.probation).toBe('ทดลองงาน');
    expect(ph.inactive).toBe('ไม่ได้ทำงาน');
    expect(ph.terminated).toBe('สิ้นสุดการจ้าง');
    expect(ph.onLeave).toBe('ลางาน');
  });
});

describe('emptyValue section', () => {
  it('has all 4 keys', () => {
    const keys = ['unknown', 'notApplicable', 'restricted', 'pending'];
    for (const key of keys) {
      expect(en).toHaveProperty(['emptyValue', key]);
      expect(th).toHaveProperty(['emptyValue', key]);
    }
  });

  it('TH values are Thai', () => {
    const ev = (th as Messages).emptyValue as Messages;
    expect(ev.unknown).toBe('ยังไม่ได้ระบุ');
    expect(ev.notApplicable).toBe('ไม่มี');
    expect(ev.restricted).toBe('ข้อมูลจำกัดสิทธิ์');
    expect(ev.pending).toBe('รอการอนุมัติ');
  });
});

describe('hospitalReferral section', () => {
  it('has companyGroup key', () => {
    expect(en).toHaveProperty(['hospitalReferral', 'companyGroup']);
    expect(th).toHaveProperty(['hospitalReferral', 'companyGroup']);
  });

  it('has letterTitle key', () => {
    expect(en).toHaveProperty(['hospitalReferral', 'letterTitle']);
    expect(th).toHaveProperty(['hospitalReferral', 'letterTitle']);
  });

  it('TH companyGroup is Thai', () => {
    expect((th as Messages).hospitalReferral).toHaveProperty('companyGroup', 'เซ็นทรัล กรุ๊ป');
  });

  it('TH letterTitle is Thai', () => {
    expect((th as Messages).hospitalReferral).toHaveProperty('letterTitle', 'หนังสือส่งตัวรักษาพยาบาล');
  });

  it('has all referral status keys', () => {
    const statuses = [
      'draft', 'submitted', 'pending_manager', 'pending_hr',
      'approved', 'rejected', 'cancelled', 'letter_issued',
    ];
    for (const s of statuses) {
      expect(en).toHaveProperty(['hospitalReferral', 'status', s]);
      expect(th).toHaveProperty(['hospitalReferral', 'status', s]);
    }
  });
});

describe('common section — new keys', () => {
  it('has viewAll, days, itemCount, years, months, hours', () => {
    const newKeys = ['viewAll', 'days', 'itemCount', 'years', 'months', 'hours'];
    for (const key of newKeys) {
      expect(en).toHaveProperty(['common', key]);
      expect(th).toHaveProperty(['common', key]);
    }
  });

  it('TH common new keys are Thai', () => {
    const c = (th as Messages).common as Messages;
    expect(c.viewAll).toBe('ดูทั้งหมด');
    expect(c.days).toBe('วัน');
    expect(c.itemCount).toBe('รายการ');
    expect(c.years).toBe('ปี');
    expect(c.months).toBe('เดือน');
    expect(c.hours).toBe('ชม.');
  });
});

// ─── Thai content quality ─────────────────────────────────────

describe('Thai translation quality', () => {
  it('no TH value contains only ASCII (should have Thai characters)', () => {
    const thKeys = flattenKeys(th);
    const thaiCharPattern = /[\u0E00-\u0E7F]/;
    const asciiOnly: string[] = [];

    // Sections that were newly added
    const sectionsToCheck = [
      'govReports', 'payrollProcessing', 'payrollSetup',
      'home', 'probation', 'personHero', 'emptyValue',
    ];

    for (const key of thKeys) {
      const ns = key.split('.')[0];
      if (!sectionsToCheck.includes(ns)) continue;

      const val = getNestedValue(th, key);
      if (typeof val === 'string' && val.length > 0 && !thaiCharPattern.test(val)) {
        asciiOnly.push(`${key} = "${val}"`);
      }
    }
    expect(asciiOnly).toEqual([]);
  });

  it('all EN values are non-Thai (no accidental Thai in EN)', () => {
    const enKeys = flattenKeys(en);
    const thaiCharPattern = /[\u0E00-\u0E7F]/;
    const thaiInEn: string[] = [];

    for (const key of enKeys) {
      const val = getNestedValue(en, key);
      if (typeof val === 'string' && thaiCharPattern.test(val)) {
        thaiInEn.push(`${key} = "${val}"`);
      }
    }
    expect(thaiInEn).toEqual([]);
  });
});
