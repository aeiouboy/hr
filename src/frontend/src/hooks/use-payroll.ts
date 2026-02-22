'use client';

import { useState, useEffect, useCallback } from 'react';

export type PayrollStage = 'period_selection' | 'calculation' | 'review' | 'approval';

export interface PayrollConfig {
  payPeriod: 'monthly' | 'bi_weekly';
  paymentDay: number;
  ssoRate: number;
  pfDefaultRate: number;
  ssoMaxBase: number;
  bankTransferEnabled: boolean;
  defaultBank: string;
}

export interface EarningType {
  id: string;
  code: string;
  nameEn: string;
  nameTh: string;
  category: string;
  taxable: boolean;
  isActive: boolean;
}

export interface DeductionType {
  id: string;
  code: string;
  nameEn: string;
  nameTh: string;
  category: string;
  mandatory: boolean;
  isActive: boolean;
}

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  descriptionEn: string;
}

export interface BankInfo {
  code: string;
  nameEn: string;
  nameTh: string;
  swiftCode: string;
  isActive: boolean;
}

export interface PayrollRun {
  id: string;
  period: string;
  status: 'draft' | 'calculated' | 'reviewed' | 'approved';
  totalEmployees: number;
  totalGross: number;
  totalNet: number;
  totalDeductions: number;
  createdAt: string;
}

export interface PayslipSummary {
  employeeId: string;
  employeeName: string;
  department: string;
  grossSalary: number;
  overtime: number;
  allowances: number;
  totalGross: number;
  incomeTax: number;
  sso: number;
  pf: number;
  otherDeductions: number;
  totalDeductions: number;
  netPay: number;
  anomaly?: string;
}

export interface PayrollRunSummary {
  period: string;
  totalEmployees: number;
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  status: 'draft' | 'calculated' | 'reviewed' | 'approved';
}

export interface GovernmentReport {
  id: string;
  type: 'pnd1' | 'pnd1_kor' | 'sso' | 'pvd';
  typeLabel: string;
  period: string;
  generatedDate: string;
  status: 'generated' | 'submitted' | 'accepted';
  recordCount: number;
}

// ------- Mock Data -------

const MOCK_CONFIG: PayrollConfig = {
  payPeriod: 'monthly',
  paymentDay: 25,
  ssoRate: 5,
  pfDefaultRate: 5,
  ssoMaxBase: 15000,
  bankTransferEnabled: true,
  defaultBank: 'Bangkok Bank',
};

const MOCK_EARNING_TYPES: EarningType[] = [
  {
    id: 'ET001',
    code: 'BASE',
    nameEn: 'Base Salary',
    nameTh: 'เงินเดือนพื้นฐาน',
    category: 'salary',
    taxable: true,
    isActive: true,
  },
  {
    id: 'ET002',
    code: 'OT',
    nameEn: 'Overtime Pay',
    nameTh: 'ค่าล่วงเวลา',
    category: 'overtime',
    taxable: true,
    isActive: true,
  },
  {
    id: 'ET003',
    code: 'HOUSE',
    nameEn: 'Housing Allowance',
    nameTh: 'เบี้ยเลี้ยงที่พัก',
    category: 'allowance',
    taxable: false,
    isActive: true,
  },
  {
    id: 'ET004',
    code: 'TRANS',
    nameEn: 'Transportation Allowance',
    nameTh: 'เบี้ยเลี้ยงเดินทาง',
    category: 'allowance',
    taxable: false,
    isActive: true,
  },
  {
    id: 'ET005',
    code: 'PERF',
    nameEn: 'Performance Bonus',
    nameTh: 'โบนัสผลงาน',
    category: 'bonus',
    taxable: true,
    isActive: false,
  },
];

const MOCK_DEDUCTION_TYPES: DeductionType[] = [
  {
    id: 'DT001',
    code: 'TAX',
    nameEn: 'Income Tax (WHT)',
    nameTh: 'ภาษีเงินได้หัก ณ ที่จ่าย',
    category: 'tax',
    mandatory: true,
    isActive: true,
  },
  {
    id: 'DT002',
    code: 'SSO',
    nameEn: 'Social Security',
    nameTh: 'ประกันสังคม',
    category: 'social_security',
    mandatory: true,
    isActive: true,
  },
  {
    id: 'DT003',
    code: 'PVD',
    nameEn: 'Provident Fund',
    nameTh: 'กองทุนสำรองเลี้ยงชีพ',
    category: 'provident_fund',
    mandatory: false,
    isActive: true,
  },
  {
    id: 'DT004',
    code: 'LOAN',
    nameEn: 'Staff Loan Repayment',
    nameTh: 'หักคืนเงินกู้พนักงาน',
    category: 'loan',
    mandatory: false,
    isActive: true,
  },
];

const THAI_TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 150000, rate: 0, descriptionEn: 'Exempt' },
  { min: 150001, max: 300000, rate: 5, descriptionEn: '5% on amount over 150,000' },
  { min: 300001, max: 500000, rate: 10, descriptionEn: '10% on amount over 300,000' },
  { min: 500001, max: 750000, rate: 15, descriptionEn: '15% on amount over 500,000' },
  { min: 750001, max: 1000000, rate: 20, descriptionEn: '20% on amount over 750,000' },
  { min: 1000001, max: 2000000, rate: 25, descriptionEn: '25% on amount over 1,000,000' },
  { min: 2000001, max: null, rate: 35, descriptionEn: '35% on amount over 2,000,000' },
];

const MOCK_BANKS: BankInfo[] = [
  {
    code: 'BBL',
    nameEn: 'Bangkok Bank',
    nameTh: 'ธนาคารกรุงเทพ',
    swiftCode: 'BKKBTHBK',
    isActive: true,
  },
  {
    code: 'KBANK',
    nameEn: 'Kasikorn Bank',
    nameTh: 'ธนาคารกสิกรไทย',
    swiftCode: 'KASITHBK',
    isActive: true,
  },
  {
    code: 'SCB',
    nameEn: 'Siam Commercial Bank',
    nameTh: 'ธนาคารไทยพาณิชย์',
    swiftCode: 'SICOTHBK',
    isActive: true,
  },
  {
    code: 'KTB',
    nameEn: 'Krungthai Bank',
    nameTh: 'ธนาคารกรุงไทย',
    swiftCode: 'KRTHTHBK',
    isActive: true,
  },
  {
    code: 'TMB',
    nameEn: 'TMBThanachart Bank',
    nameTh: 'ธนาคารทีเอ็มบีธนชาต',
    swiftCode: 'TMBKTHBK',
    isActive: false,
  },
];

const MOCK_PAYROLL_RUNS: PayrollRun[] = [
  {
    id: 'RUN-2026-02',
    period: 'February 2026',
    status: 'draft',
    totalEmployees: 152,
    totalGross: 12450000,
    totalNet: 10820000,
    totalDeductions: 1630000,
    createdAt: '2026-02-01',
  },
  {
    id: 'RUN-2026-01',
    period: 'January 2026',
    status: 'approved',
    totalEmployees: 150,
    totalGross: 12100000,
    totalNet: 10530000,
    totalDeductions: 1570000,
    createdAt: '2026-01-02',
  },
];

const MOCK_PAYSLIPS: PayslipSummary[] = [
  { employeeId: 'EMP001', employeeName: 'Somchai Jaidee', department: 'Engineering', grossSalary: 85000, overtime: 5000, allowances: 3000, totalGross: 93000, incomeTax: 7500, sso: 750, pf: 4250, otherDeductions: 0, totalDeductions: 12500, netPay: 80500 },
  { employeeId: 'EMP002', employeeName: 'Naruechon Woraphatphawan', department: 'Engineering', grossSalary: 72000, overtime: 0, allowances: 2000, totalGross: 74000, incomeTax: 5200, sso: 750, pf: 3600, otherDeductions: 0, totalDeductions: 9550, netPay: 64450 },
  { employeeId: 'EMP003', employeeName: 'Punnapa Thianchai', department: 'Marketing', grossSalary: 65000, overtime: 2000, allowances: 1500, totalGross: 68500, incomeTax: 4100, sso: 750, pf: 3250, otherDeductions: 500, totalDeductions: 8600, netPay: 59900, anomaly: 'New hire — first payroll' },
  { employeeId: 'EMP004', employeeName: 'Wichai Prasert', department: 'Finance', grossSalary: 95000, overtime: 0, allowances: 5000, totalGross: 100000, incomeTax: 10000, sso: 750, pf: 4750, otherDeductions: 0, totalDeductions: 15500, netPay: 84500 },
  { employeeId: 'EMP005', employeeName: 'Ananya Kaewkham', department: 'HR', grossSalary: 55000, overtime: 3000, allowances: 1000, totalGross: 59000, incomeTax: 2900, sso: 750, pf: 2750, otherDeductions: 0, totalDeductions: 6400, netPay: 52600 },
  { employeeId: 'EMP006', employeeName: 'Teerapat Wongsawat', department: 'Operations', grossSalary: 48000, overtime: 8000, allowances: 1500, totalGross: 57500, incomeTax: 2600, sso: 750, pf: 2400, otherDeductions: 200, totalDeductions: 5950, netPay: 51550, anomaly: 'High overtime' },
];

const MOCK_REPORT_HISTORY: GovernmentReport[] = [
  { id: 'RPT-001', type: 'pnd1', typeLabel: 'PND 1 (Monthly)', period: 'January 2026', generatedDate: '2026-02-05', status: 'submitted', recordCount: 150 },
  { id: 'RPT-002', type: 'sso', typeLabel: 'SSO (Monthly)', period: 'January 2026', generatedDate: '2026-02-05', status: 'submitted', recordCount: 150 },
  { id: 'RPT-003', type: 'pvd', typeLabel: 'PVD (Monthly)', period: 'January 2026', generatedDate: '2026-02-05', status: 'accepted', recordCount: 120 },
  { id: 'RPT-004', type: 'pnd1', typeLabel: 'PND 1 (Monthly)', period: 'December 2025', generatedDate: '2026-01-05', status: 'accepted', recordCount: 148 },
];

// ------- Hook -------

export function usePayroll() {
  const [config, setConfig] = useState<PayrollConfig>(MOCK_CONFIG);
  const [earningTypes] = useState<EarningType[]>(MOCK_EARNING_TYPES);
  const [deductionTypes] = useState<DeductionType[]>(MOCK_DEDUCTION_TYPES);
  const [taxBrackets] = useState<TaxBracket[]>(THAI_TAX_BRACKETS);
  const [banks] = useState<BankInfo[]>(MOCK_BANKS);
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>(MOCK_PAYROLL_RUNS);
  const [payslips, setPayslips] = useState<PayslipSummary[]>([]);
  const [runSummary, setRunSummary] = useState<PayrollRunSummary | null>(null);
  const [reportHistory, setReportHistory] = useState<GovernmentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 400));
        setConfig(MOCK_CONFIG);
        setReportHistory(MOCK_REPORT_HISTORY);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const runCalculation = useCallback(async (period: string, scope: string) => {
    setCalculating(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setPayslips(MOCK_PAYSLIPS);
      const totalGross = MOCK_PAYSLIPS.reduce((s, p) => s + p.totalGross, 0);
      const totalDeductions = MOCK_PAYSLIPS.reduce((s, p) => s + p.totalDeductions, 0);
      const totalNet = MOCK_PAYSLIPS.reduce((s, p) => s + p.netPay, 0);
      setRunSummary({
        period,
        totalEmployees: MOCK_PAYSLIPS.length,
        totalGross,
        totalDeductions,
        totalNet,
        status: 'calculated',
      });
      setPayrollRuns((prev) =>
        prev.map((r) =>
          r.period === period ? { ...r, status: 'calculated', totalGross, totalNet, totalDeductions, totalEmployees: MOCK_PAYSLIPS.length } : r
        )
      );
    } finally {
      setCalculating(false);
    }
  }, []);

  const approvePayroll = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 500));
    setRunSummary((prev) => (prev ? { ...prev, status: 'approved' } : prev));
    setPayrollRuns((prev) =>
      prev.map((r) => (runSummary && r.period === runSummary.period ? { ...r, status: 'approved' } : r))
    );
  }, [runSummary]);

  const updateConfig = useCallback(async (updates: Partial<PayrollConfig>) => {
    await new Promise((r) => setTimeout(r, 300));
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const generateReport = useCallback(async (type: GovernmentReport['type'], period: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const labels: Record<string, string> = {
      pnd1: 'PND 1 (Monthly)',
      pnd1_kor: 'PND 1 Kor (Annual)',
      sso: 'SSO (Monthly)',
      pvd: 'PVD (Monthly)',
    };
    const newReport: GovernmentReport = {
      id: `RPT-${Date.now()}`,
      type,
      typeLabel: labels[type],
      period,
      generatedDate: new Date().toISOString().split('T')[0],
      status: 'generated',
      recordCount: MOCK_PAYSLIPS.length,
    };
    setReportHistory((prev) => [newReport, ...prev]);
    return newReport;
  }, []);

  return {
    config,
    earningTypes,
    deductionTypes,
    taxBrackets,
    banks,
    payrollRuns,
    payslips,
    runSummary,
    reportHistory,
    loading,
    calculating,
    runCalculation,
    approvePayroll,
    updateConfig,
    generateReport,
  };
}
