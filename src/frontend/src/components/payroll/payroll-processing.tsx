'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle, AlertTriangle, ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { usePayroll, type PayrollStage } from '@/hooks/use-payroll';
import { useAuthStore } from '@/stores/auth-store';
import { canAccessModule } from '@/lib/rbac';

const STAGES: PayrollStage[] = ['period_selection', 'calculation', 'review', 'approval'];

function Stepper({ currentStage, stages, t }: { currentStage: PayrollStage; stages: PayrollStage[]; t: (key: string) => string }) {
  const currentIndex = stages.indexOf(currentStage);
  return (
    <div className="flex items-center justify-between mb-8">
      {stages.map((stage, idx) => {
        const isComplete = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        return (
          <div key={stage} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isComplete ? 'bg-green-500 text-white' :
                  isCurrent ? 'bg-cg-red text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isComplete ? <CheckCircle className="h-4 w-4" /> : idx + 1}
              </div>
              <span className={`text-xs mt-1 ${isCurrent ? 'text-cg-red font-medium' : 'text-gray-500'}`}>
                {t(`payrollProcessing.stages.${stage}`)}
              </span>
            </div>
            {idx < stages.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${idx < currentIndex ? 'bg-green-500' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function PayrollProcessing() {
  const t = useTranslations();
  const { toast } = useToast();
  const { roles } = useAuthStore();
  const { payslips, runSummary, calculating, runCalculation, approvePayroll } = usePayroll();
  const [stage, setStage] = useState<PayrollStage>('period_selection');
  const [selectedMonth, setSelectedMonth] = useState('2');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [scope, setScope] = useState('all');
  const [sortField, setSortField] = useState<string>('employeeName');
  const [sortAsc, setSortAsc] = useState(true);

  if (!canAccessModule(roles, 'payroll-processing')) {
    return <div className="text-center py-12"><p className="text-gray-500">{t('common.noData')}</p></div>;
  }

  const handleNext = async () => {
    if (stage === 'period_selection') {
      setStage('calculation');
      const period = `${selectedYear}-${selectedMonth.padStart(2, '0')}`;
      await runCalculation(period, scope);
      setStage('review');
    } else if (stage === 'review') {
      setStage('approval');
    }
  };

  const handleBack = () => {
    const idx = STAGES.indexOf(stage);
    if (idx > 0) setStage(STAGES[idx - 1]);
  };

  const handleApprove = async () => {
    await approvePayroll();
    toast('success', t('payrollProcessing.approved'));
  };

  const sortedPayslips = [...payslips].sort((a, b) => {
    const aVal = a[sortField as keyof typeof a];
    const bVal = b[sortField as keyof typeof b];
    if (typeof aVal === 'number' && typeof bVal === 'number') return sortAsc ? aVal - bVal : bVal - aVal;
    return sortAsc ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
  });

  const handleSort = (field: string) => {
    if (sortField === field) { setSortAsc(!sortAsc); } else { setSortField(field); setSortAsc(true); }
  };

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Stepper currentStage={stage} stages={STAGES} t={t} />

      {/* Stage 1: Period Selection */}
      {stage === 'period_selection' && (
        <Card>
          <CardHeader>
            <CardTitle>{t('payrollProcessing.selectPeriod')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label={t('payrollProcessing.month')}
                name="month"
                type="select"
                value={selectedMonth}
                onChange={setSelectedMonth}
                options={Array.from({ length: 12 }, (_, i) => ({
                  value: String(i + 1),
                  label: new Date(2026, i).toLocaleString('en', { month: 'long' }),
                }))}
              />
              <FormField
                label={t('payrollProcessing.year')}
                name="year"
                type="select"
                value={selectedYear}
                onChange={setSelectedYear}
                options={[
                  { value: '2025', label: '2025' },
                  { value: '2026', label: '2026' },
                ]}
              />
              <FormField
                label={t('payrollProcessing.scope')}
                name="scope"
                type="select"
                value={scope}
                onChange={setScope}
                options={[
                  { value: 'all', label: t('payrollProcessing.allEmployees') },
                  { value: 'engineering', label: 'Engineering' },
                  { value: 'marketing', label: 'Marketing' },
                  { value: 'finance', label: 'Finance' },
                ]}
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={handleNext}>
                {t('payrollProcessing.runCalculation')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stage 2: Calculation (auto-progresses to review) */}
      {stage === 'calculation' && (
        <Card>
          <CardContent className="py-12 text-center">
            <Skeleton className="h-4 w-64 mx-auto mb-4" />
            <p className="text-gray-500">{t('payrollProcessing.calculating')}</p>
          </CardContent>
        </Card>
      )}

      {/* Stage 3: Review */}
      {stage === 'review' && runSummary && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-gray-400">{t('payrollProcessing.totalEmployees')}</p>
                <p className="text-2xl font-bold text-cg-dark">{runSummary.totalEmployees}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-gray-400">{t('payrollProcessing.totalGross')}</p>
                <p className="text-2xl font-bold text-green-600">{fmt(runSummary.totalGross)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-gray-400">{t('payrollProcessing.totalDeductions')}</p>
                <p className="text-2xl font-bold text-red-600">{fmt(runSummary.totalDeductions)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-gray-400">{t('payrollProcessing.totalNet')}</p>
                <p className="text-2xl font-bold text-cg-dark">{fmt(runSummary.totalNet)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('payrollProcessing.reviewTable')}</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {t('payrollProcessing.exportExcel')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      {[
                        { key: 'employeeName', label: t('payrollProcessing.employee') },
                        { key: 'department', label: t('payrollProcessing.department') },
                        { key: 'totalGross', label: t('payrollProcessing.gross') },
                        { key: 'incomeTax', label: t('payrollProcessing.tax') },
                        { key: 'sso', label: 'SSO' },
                        { key: 'pf', label: 'PF' },
                        { key: 'totalDeductions', label: t('payrollProcessing.deductions') },
                        { key: 'netPay', label: t('payrollProcessing.net') },
                      ].map((col) => (
                        <th
                          key={col.key}
                          className="text-left py-2 px-3 font-medium text-gray-500 cursor-pointer hover:text-cg-dark"
                          onClick={() => handleSort(col.key)}
                        >
                          {col.label}
                          {sortField === col.key && (sortAsc ? ' ↑' : ' ↓')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPayslips.map((ps) => (
                      <tr key={ps.employeeId} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">
                          <div className="flex items-center gap-2">
                            {ps.employeeName}
                            {ps.anomaly && (
                              <span title={ps.anomaly}>
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-2 px-3">{ps.department}</td>
                        <td className="py-2 px-3 text-right">{fmt(ps.totalGross)}</td>
                        <td className="py-2 px-3 text-right">{fmt(ps.incomeTax)}</td>
                        <td className="py-2 px-3 text-right">{fmt(ps.sso)}</td>
                        <td className="py-2 px-3 text-right">{fmt(ps.pf)}</td>
                        <td className="py-2 px-3 text-right">{fmt(ps.totalDeductions)}</td>
                        <td className="py-2 px-3 text-right font-medium">{fmt(ps.netPay)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.back')}
            </Button>
            <Button onClick={handleNext}>
              {t('common.next')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </>
      )}

      {/* Stage 4: Approval */}
      {stage === 'approval' && runSummary && (
        <Card>
          <CardHeader>
            <CardTitle>{t('payrollProcessing.approvalStage')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              {runSummary.status === 'approved' ? (
                <>
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-cg-dark">{t('payrollProcessing.payrollApproved')}</h3>
                  <p className="text-gray-500 mt-1">{t('payrollProcessing.payrollApprovedDesc')}</p>
                </>
              ) : (
                <>
                  <p className="text-gray-500 mb-2">{t('payrollProcessing.period')}: {runSummary.period}</p>
                  <p className="text-gray-500 mb-2">{t('payrollProcessing.totalEmployees')}: {runSummary.totalEmployees}</p>
                  <p className="text-2xl font-bold text-cg-dark mb-6">
                    {t('payrollProcessing.totalNet')}: {fmt(runSummary.totalNet)} THB
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" onClick={handleBack}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {t('common.back')}
                    </Button>
                    <Button onClick={handleApprove}>
                      {t('payrollProcessing.approvePayroll')}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
