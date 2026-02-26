'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Eye,
  EyeOff,
  Download,
  ChevronDown,
  ChevronUp,
  FileText,
  Receipt,
} from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Tabs } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type TabKey = 'payslips' | 'taxDocuments';
type YearFilter = '2026' | '2025' | 'all';

interface PayslipRecord {
  id: string;
  period: string;
  month: number;
  year: number;
  payDate: string;
  gross: number;
  net: number;
  hasOT: boolean;
  earnings: {
    baseSalary: number;
    positionAllowance: number;
    colAllowance: number;
    overtime: number;
    other: number;
  };
  deductions: {
    incomeTax: number;
    socialSecurity: number;
    providentFund: number;
    loans: number;
    other: number;
  };
}

interface TaxDocument {
  id: string;
  type: string;
  year: number;
  issueDate: string;
}

const mockPayslips: PayslipRecord[] = [
  {
    id: 'PS-2026-01',
    period: 'January 2026',
    month: 1,
    year: 2026,
    payDate: '31 Jan 2026',
    gross: 85000,
    net: 67450,
    hasOT: false,
    earnings: {
      baseSalary: 75000,
      positionAllowance: 5000,
      colAllowance: 5000,
      overtime: 0,
      other: 0,
    },
    deductions: {
      incomeTax: 10725,
      socialSecurity: 750,
      providentFund: 5000,
      loans: 0,
      other: 1075,
    },
  },
  {
    id: 'PS-2025-12',
    period: 'December 2025',
    month: 12,
    year: 2025,
    payDate: '31 Dec 2025',
    gross: 85000,
    net: 67450,
    hasOT: false,
    earnings: {
      baseSalary: 75000,
      positionAllowance: 5000,
      colAllowance: 5000,
      overtime: 0,
      other: 0,
    },
    deductions: {
      incomeTax: 10725,
      socialSecurity: 750,
      providentFund: 5000,
      loans: 0,
      other: 1075,
    },
  },
  {
    id: 'PS-2025-11',
    period: 'November 2025',
    month: 11,
    year: 2025,
    payDate: '28 Nov 2025',
    gross: 85000,
    net: 67450,
    hasOT: false,
    earnings: {
      baseSalary: 75000,
      positionAllowance: 5000,
      colAllowance: 5000,
      overtime: 0,
      other: 0,
    },
    deductions: {
      incomeTax: 10725,
      socialSecurity: 750,
      providentFund: 5000,
      loans: 0,
      other: 1075,
    },
  },
  {
    id: 'PS-2025-10',
    period: 'October 2025',
    month: 10,
    year: 2025,
    payDate: '31 Oct 2025',
    gross: 87500,
    net: 69125,
    hasOT: true,
    earnings: {
      baseSalary: 75000,
      positionAllowance: 5000,
      colAllowance: 5000,
      overtime: 2500,
      other: 0,
    },
    deductions: {
      incomeTax: 11350,
      socialSecurity: 750,
      providentFund: 5000,
      loans: 0,
      other: 1275,
    },
  },
  {
    id: 'PS-2025-09',
    period: 'September 2025',
    month: 9,
    year: 2025,
    payDate: '30 Sep 2025',
    gross: 85000,
    net: 67450,
    hasOT: false,
    earnings: {
      baseSalary: 75000,
      positionAllowance: 5000,
      colAllowance: 5000,
      overtime: 0,
      other: 0,
    },
    deductions: {
      incomeTax: 10725,
      socialSecurity: 750,
      providentFund: 5000,
      loans: 0,
      other: 1075,
    },
  },
  {
    id: 'PS-2025-08',
    period: 'August 2025',
    month: 8,
    year: 2025,
    payDate: '29 Aug 2025',
    gross: 85000,
    net: 67450,
    hasOT: false,
    earnings: {
      baseSalary: 75000,
      positionAllowance: 5000,
      colAllowance: 5000,
      overtime: 0,
      other: 0,
    },
    deductions: {
      incomeTax: 10725,
      socialSecurity: 750,
      providentFund: 5000,
      loans: 0,
      other: 1075,
    },
  },
];

const mockTaxDocuments: TaxDocument[] = [
  {
    id: 'TAX-2025-50TAWI',
    type: 'withholdingCert',
    year: 2025,
    issueDate: '31 Jan 2026',
  },
  {
    id: 'TAX-2025-SSF',
    type: 'socialSecurityStatement',
    year: 2025,
    issueDate: '15 Jan 2026',
  },
  {
    id: 'TAX-2025-PVD',
    type: 'providentFundStatement',
    year: 2025,
    issueDate: '31 Jan 2026',
  },
];

function formatCurrency(amount: number): string {
  return `฿${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function maskCurrency(): string {
  return '฿***,***.**';
}

export default function PayslipPage() {
  const t = useTranslations('payslip');
  const tCommon = useTranslations('common');

  const [activeTab, setActiveTab] = useState<TabKey>('payslips');
  const [revealedPayslips, setRevealedPayslips] = useState<Set<string>>(new Set());
  const [selectedYear, setSelectedYear] = useState<YearFilter>('all');
  const [expandedPayslip, setExpandedPayslip] = useState<string | null>(null);
  const [confirmingReveal, setConfirmingReveal] = useState<string | null>(null);

  const tabs = [
    { key: 'payslips', label: t('payslipList') },
    { key: 'taxDocuments', label: t('taxDocuments') },
  ];

  const filteredPayslips = mockPayslips.filter((p) => {
    if (selectedYear === 'all') return true;
    return p.year === parseInt(selectedYear);
  });

  const toggleExpand = (id: string) => {
    setExpandedPayslip(expandedPayslip === id ? null : id);
  };

  const handleToggleAmounts = (id: string) => {
    if (revealedPayslips.has(id)) {
      setRevealedPayslips((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      return;
    }
    setConfirmingReveal(id);
  };

  const confirmRevealAmounts = () => {
    if (confirmingReveal) {
      setRevealedPayslips((prev) => new Set(prev).add(confirmingReveal));
    }
    setConfirmingReveal(null);
  };

  const cancelRevealAmounts = () => {
    setConfirmingReveal(null);
  };

  const displayAmount = (amount: number, payslipId: string) =>
    revealedPayslips.has(payslipId) ? formatCurrency(amount) : maskCurrency();

  const downloadPayslip = (payslip: PayslipRecord) => {
    const totalEarnings =
      payslip.earnings.baseSalary +
      payslip.earnings.positionAllowance +
      payslip.earnings.colAllowance +
      payslip.earnings.overtime +
      payslip.earnings.other;
    const totalDeductions =
      payslip.deductions.incomeTax +
      payslip.deductions.socialSecurity +
      payslip.deductions.providentFund +
      payslip.deductions.loans +
      payslip.deductions.other;

    const fmtRow = (label: string, amount: number, isDeduction = false) =>
      `<tr><td>${label}</td><td class="amount${isDeduction ? ' deduction' : ''}">${isDeduction ? '(' : ''}${formatCurrency(amount)}${isDeduction ? ')' : ''}</td></tr>`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Payslip - ${payslip.period}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 30px; color: #333; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #C8102E; padding-bottom: 16px; margin-bottom: 24px; }
    .company h1 { font-size: 20px; color: #C8102E; font-weight: 700; }
    .company p { font-size: 12px; color: #666; margin-top: 2px; }
    .doc-title { text-align: right; }
    .doc-title h2 { font-size: 18px; color: #1a1a1a; text-transform: uppercase; letter-spacing: 2px; }
    .doc-title p { font-size: 12px; color: #888; margin-top: 4px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 32px; margin-bottom: 24px; padding: 16px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
    .info-grid .label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-grid .value { font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px; }
    .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
    .column h3 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 8px 12px; margin-bottom: 0; }
    .column.earnings h3 { background: #ecfdf5; color: #065f46; border-left: 3px solid #10b981; }
    .column.deductions h3 { background: #fef2f2; color: #991b1b; border-left: 3px solid #ef4444; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 8px 12px; font-size: 13px; border-bottom: 1px solid #f0f0f0; }
    td.amount { text-align: right; font-variant-numeric: tabular-nums; font-weight: 500; }
    td.deduction { color: #dc2626; }
    tr.total td { border-top: 2px solid #d1d5db; font-weight: 700; font-size: 14px; padding-top: 10px; }
    tr.total td.amount { color: #065f46; }
    tr.total.ded td.amount { color: #dc2626; }
    .net-pay { margin-top: 0; padding: 20px; background: linear-gradient(135deg, #1a1a1a, #333); color: #fff; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .net-pay .label { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #ccc; }
    .net-pay .gross { font-size: 13px; color: #aaa; margin-top: 4px; }
    .net-pay .amount-lg { font-size: 28px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .footer { margin-top: 24px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #aaa; text-align: center; }
    @media print { body { padding: 20px; } .net-pay { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="company">
      <h1>Central Group Co., Ltd.</h1>
      <p>Human Resources Department</p>
    </div>
    <div class="doc-title">
      <h2>Payslip</h2>
      <p>${payslip.id}</p>
    </div>
  </div>

  <div class="info-grid">
    <div><p class="label">Employee Name</p><p class="value">Somchai Jaidee</p></div>
    <div><p class="label">Employee ID</p><p class="value">EMP-001</p></div>
    <div><p class="label">Pay Period</p><p class="value">${payslip.period}</p></div>
    <div><p class="label">Pay Date</p><p class="value">${payslip.payDate}</p></div>
  </div>

  <div class="columns">
    <div class="column earnings">
      <h3>Earnings</h3>
      <table>
        ${fmtRow('Base Salary', payslip.earnings.baseSalary)}
        ${fmtRow('Position Allowance', payslip.earnings.positionAllowance)}
        ${fmtRow('Cost of Living Allowance', payslip.earnings.colAllowance)}
        ${payslip.earnings.overtime > 0 ? fmtRow('Overtime', payslip.earnings.overtime) : ''}
        ${payslip.earnings.other > 0 ? fmtRow('Other Earnings', payslip.earnings.other) : ''}
        <tr class="total"><td>Total Earnings</td><td class="amount">${formatCurrency(totalEarnings)}</td></tr>
      </table>
    </div>
    <div class="column deductions">
      <h3>Deductions</h3>
      <table>
        ${fmtRow('Income Tax', payslip.deductions.incomeTax, true)}
        ${fmtRow('Social Security', payslip.deductions.socialSecurity, true)}
        ${fmtRow('Provident Fund', payslip.deductions.providentFund, true)}
        ${payslip.deductions.loans > 0 ? fmtRow('Loans', payslip.deductions.loans, true) : ''}
        ${payslip.deductions.other > 0 ? fmtRow('Other Deductions', payslip.deductions.other, true) : ''}
        <tr class="total ded"><td>Total Deductions</td><td class="amount deduction">(${formatCurrency(totalDeductions)})</td></tr>
      </table>
    </div>
  </div>

  <div class="net-pay">
    <div>
      <p class="label">Net Pay</p>
      <p class="gross">Gross: ${formatCurrency(payslip.gross)}</p>
    </div>
    <div class="amount-lg">${formatCurrency(payslip.net)}</div>
  </div>

  <p class="footer">Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. This is a computer-generated document. Central Group Co., Ltd. - HR Department.</p>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payslip-${String(payslip.month).padStart(2, '0')}-${payslip.year}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const viewTaxDocument = (doc: TaxDocument) => {
    const docTypeLabels: Record<string, string> = {
      withholdingCert: 'Withholding Tax Certificate (50 Tawi)',
      socialSecurityStatement: 'Social Security Statement',
      providentFundStatement: 'Provident Fund Statement',
    };
    const docLabel = docTypeLabels[doc.type] || doc.type;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${docLabel} - ${doc.year}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 40px auto; padding: 20px; color: #333; }
    h1 { color: #C8102E; border-bottom: 2px solid #C8102E; padding-bottom: 10px; font-size: 1.4em; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 10px 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; color: #555; width: 40%; }
    .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #e5e7eb; font-size: 0.85em; color: #888; }
  </style>
</head>
<body>
  <h1>${docLabel}</h1>
  <table>
    <tr><th>Document ID</th><td>${doc.id}</td></tr>
    <tr><th>Document Type</th><td>${docLabel}</td></tr>
    <tr><th>Tax Year</th><td>${doc.year}</td></tr>
    <tr><th>Issue Date</th><td>${doc.issueDate}</td></tr>
    <tr><th>Employee</th><td>Somchai Jaidee (EMP-001)</td></tr>
    <tr><th>Company</th><td>Central Group Co., Ltd.</td></tr>
    <tr><th>Status</th><td>Issued</td></tr>
  </table>
  <p class="footer">This is a preview of the document information. The official document is available for download as a file.<br>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const downloadTaxDocument = (doc: TaxDocument) => {
    const docTypeLabels: Record<string, string> = {
      withholdingCert: 'Withholding Tax Certificate (50 Tawi)',
      socialSecurityStatement: 'Social Security Statement',
      providentFundStatement: 'Provident Fund Statement',
    };
    const docLabel = docTypeLabels[doc.type] || doc.type;

    const docTypeFileNames: Record<string, string> = {
      withholdingCert: 'withholding-cert',
      socialSecurityStatement: 'social-security-statement',
      providentFundStatement: 'provident-fund-statement',
    };
    const fileNamePart = docTypeFileNames[doc.type] || doc.type;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${docLabel} - ${doc.year}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 0 auto; padding: 40px 30px; color: #333; background: #fff; }
    .header { border-bottom: 3px solid #C8102E; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
    .company h1 { font-size: 20px; color: #C8102E; font-weight: 700; }
    .company p { font-size: 12px; color: #666; margin-top: 2px; }
    .doc-badge { background: #C8102E; color: #fff; padding: 6px 16px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    h2 { font-size: 18px; color: #1a1a1a; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #e5e7eb; font-size: 14px; }
    th { background: #f9fafb; font-weight: 600; color: #555; width: 40%; font-size: 13px; }
    td { color: #1a1a1a; }
    .status-badge { display: inline-block; background: #ecfdf5; color: #065f46; padding: 3px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #aaa; text-align: center; line-height: 1.6; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="company">
      <h1>Central Group Co., Ltd.</h1>
      <p>Human Resources Department</p>
    </div>
    <div class="doc-badge">Official Document</div>
  </div>

  <h2>${docLabel}</h2>

  <table>
    <tr><th>Document ID</th><td>${doc.id}</td></tr>
    <tr><th>Document Type</th><td>${docLabel}</td></tr>
    <tr><th>Tax Year</th><td>${doc.year}</td></tr>
    <tr><th>Issue Date</th><td>${doc.issueDate}</td></tr>
    <tr><th>Employee Name</th><td>Somchai Jaidee</td></tr>
    <tr><th>Employee ID</th><td>EMP-001</td></tr>
    <tr><th>Company</th><td>Central Group Co., Ltd.</td></tr>
    <tr><th>Status</th><td><span class="status-badge">Issued</span></td></tr>
    <tr><th>Issued By</th><td>HR Department</td></tr>
  </table>

  <p class="footer">
    This is an official document issued by Central Group Co., Ltd. - Human Resources Department.<br>
    Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
  </p>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileNamePart}-${doc.year}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderPayslipsTab = () => (
    <div className="space-y-4">
      {/* Controls row */}
      <div className="flex items-center gap-2">
        <label htmlFor="year-filter" className="text-sm text-gray-600 whitespace-nowrap">
          {t('filterByYear')}:
        </label>
        <select
          id="year-filter"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value as YearFilter)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cg-red"
        >
          <option value="all">{t('allYears')}</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {/* Payslip list */}
      {filteredPayslips.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <Receipt className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>{t('noPayslips')}</p>
          </CardContent>
        </Card>
      ) : (
        filteredPayslips.map((payslip) => {
          const isExpanded = expandedPayslip === payslip.id;
          const totalEarnings =
            payslip.earnings.baseSalary +
            payslip.earnings.positionAllowance +
            payslip.earnings.colAllowance +
            payslip.earnings.overtime +
            payslip.earnings.other;
          const totalDeductions =
            payslip.deductions.incomeTax +
            payslip.deductions.socialSecurity +
            payslip.deductions.providentFund +
            payslip.deductions.loans +
            payslip.deductions.other;

          return (
            <Card key={payslip.id} className="overflow-hidden">
              {/* Card summary */}
              <CardHeader className="pb-3">
                {/* Row 1: Title + OT badge */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-10 sm:h-10 bg-cg-red/10 rounded-lg flex items-center justify-center shrink-0">
                    <Receipt className="h-5 w-5 text-cg-red" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{payslip.period}</CardTitle>
                      {payslip.hasOT && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          OT
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {t('payDate')}: {payslip.payDate}
                    </p>
                  </div>
                  {/* Desktop: inline amounts */}
                  <div className="hidden sm:flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{t('grossPay')}</p>
                      <p className="font-semibold text-cg-dark tabular-nums">
                        {displayAmount(payslip.gross, payslip.id)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{t('netPay')}</p>
                      <p className="font-semibold text-cg-success tabular-nums">
                        {displayAmount(payslip.net, payslip.id)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleAmounts(payslip.id)}
                        className="flex items-center gap-1 text-gray-500"
                        title={revealedPayslips.has(payslip.id) ? t('hideAmounts') : t('showAmounts')}
                      >
                        {revealedPayslips.has(payslip.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleExpand(payslip.id)}
                        aria-expanded={isExpanded}
                        className="flex items-center gap-1"
                      >
                        {t('viewDetails')}
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Mobile: amounts + actions stacked below */}
                <div className="sm:hidden mt-3 space-y-3">
                  {/* Amounts row */}
                  <div className="flex items-end justify-between bg-gray-50 rounded-lg p-3 -mx-1">
                    <div>
                      <p className="text-xs text-gray-500">{t('grossPay')}</p>
                      <p className="text-sm font-semibold text-cg-dark tabular-nums mt-0.5">
                        {displayAmount(payslip.gross, payslip.id)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{t('netPay')}</p>
                      <p className="text-lg font-bold text-cg-success tabular-nums">
                        {displayAmount(payslip.net, payslip.id)}
                      </p>
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleAmounts(payslip.id)}
                      className="flex items-center gap-1.5 text-gray-600 min-h-[40px]"
                    >
                      {revealedPayslips.has(payslip.id) ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          {t('hideAmounts')}
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          {t('showAmounts')}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpand(payslip.id)}
                      aria-expanded={isExpanded}
                      className="flex-1 flex items-center justify-center gap-1.5 min-h-[40px]"
                    >
                      {t('viewDetails')}
                      {isExpanded ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Inline confirmation for this payslip */}
              {confirmingReveal === payslip.id && (
                <div className="mx-4 sm:mx-6 mb-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                  <span className="text-amber-800 font-medium">{t('confirmShowAmounts')}</span>
                  <div className="flex gap-2 sm:ml-auto">
                    <Button size="sm" variant="outline" onClick={cancelRevealAmounts}>
                      {tCommon('cancel')}
                    </Button>
                    <Button size="sm" onClick={confirmRevealAmounts}>
                      {tCommon('confirm')}
                    </Button>
                  </div>
                </div>
              )}

              {/* Expanded detail section */}
              {isExpanded && (
                <CardContent className="border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Earnings */}
                    <div>
                      <h4 className="text-sm font-semibold text-cg-dark mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cg-success inline-block" />
                        {t('earnings')}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('baseSalary')}</span>
                          <span className="tabular-nums font-medium">
                            {displayAmount(payslip.earnings.baseSalary, payslip.id)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('positionAllowance')}</span>
                          <span className="tabular-nums font-medium">
                            {displayAmount(payslip.earnings.positionAllowance, payslip.id)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('colAllowance')}</span>
                          <span className="tabular-nums font-medium">
                            {displayAmount(payslip.earnings.colAllowance, payslip.id)}
                          </span>
                        </div>
                        {payslip.earnings.overtime > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t('overtime')}</span>
                            <span className="tabular-nums font-medium text-amber-700">
                              {displayAmount(payslip.earnings.overtime, payslip.id)}
                            </span>
                          </div>
                        )}
                        {payslip.earnings.other > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t('otherEarnings')}</span>
                            <span className="tabular-nums font-medium">
                              {displayAmount(payslip.earnings.other, payslip.id)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm font-semibold border-t pt-2 mt-2">
                          <span className="text-cg-dark">{t('totalEarnings')}</span>
                          <span className="tabular-nums text-cg-success">
                            {displayAmount(totalEarnings, payslip.id)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Deductions */}
                    <div>
                      <h4 className="text-sm font-semibold text-cg-dark mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cg-red inline-block" />
                        {t('deductions')}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('incomeTax')}</span>
                          <span className="tabular-nums font-medium text-cg-error">
                            ({displayAmount(payslip.deductions.incomeTax, payslip.id)})
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('socialSecurity')}</span>
                          <span className="tabular-nums font-medium text-cg-error">
                            ({displayAmount(payslip.deductions.socialSecurity, payslip.id)})
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{t('providentFund')}</span>
                          <span className="tabular-nums font-medium text-cg-error">
                            ({displayAmount(payslip.deductions.providentFund, payslip.id)})
                          </span>
                        </div>
                        {payslip.deductions.loans > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t('loans')}</span>
                            <span className="tabular-nums font-medium text-cg-error">
                              ({displayAmount(payslip.deductions.loans, payslip.id)})
                            </span>
                          </div>
                        )}
                        {payslip.deductions.other > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{t('otherDeductions')}</span>
                            <span className="tabular-nums font-medium text-cg-error">
                              ({displayAmount(payslip.deductions.other, payslip.id)})
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm font-semibold border-t pt-2 mt-2">
                          <span className="text-cg-dark">{t('totalDeductions')}</span>
                          <span className="tabular-nums text-cg-error">
                            ({displayAmount(totalDeductions, payslip.id)})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Net Pay summary bar */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-500">{t('netPay')}</p>
                      <p className="text-2xl font-bold text-cg-dark tabular-nums">
                        {displayAmount(payslip.net, payslip.id)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 self-start sm:self-auto"
                      onClick={() => downloadPayslip(payslip)}
                    >
                      <Download className="h-4 w-4" />
                      {t('downloadPdf')}
                    </Button>
                  </div>

                  {/* Audit note */}
                  <p className="mt-3 text-xs text-gray-400 text-center">
                    {t('downloadAuditNote')}
                  </p>
                </CardContent>
              )}
            </Card>
          );
        })
      )}
    </div>
  );

  const renderTaxDocumentsTab = () => (
    <div className="space-y-4">
      {mockTaxDocuments.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>{t('noTaxDocuments')}</p>
          </CardContent>
        </Card>
      ) : (
        mockTaxDocuments.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-cg-dark text-sm">{t(doc.type)}</p>
                    <div className="flex gap-4 mt-1">
                      <p className="text-xs text-gray-500">
                        {t('year')}: <span className="font-medium text-gray-700">{doc.year}</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {t('issueDate')}:{' '}
                        <span className="font-medium text-gray-700">{doc.issueDate}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 self-start sm:self-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => viewTaxDocument(doc)}
                  >
                    <Eye className="h-4 w-4" />
                    {t('viewDocument')}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => downloadTaxDocument(doc)}
                  >
                    <Download className="h-4 w-4" />
                    {t('downloadPdf')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* Audit note */}
      <p className="text-xs text-gray-400 text-center pt-2">
        {t('downloadAuditNote')}
      </p>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'payslips':
        return renderPayslipsTab();
      case 'taxDocuments':
        return renderTaxDocumentsTab();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-5xl mx-auto">
            {/* Page header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
            </div>

            {/* Tabs */}
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={(key) => setActiveTab(key as TabKey)}
              className="mb-6"
            />

            {/* Tab content */}
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
