'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  Calculator,
  ClipboardList,
  CheckCircle2,
  ChevronRight,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Users,
  TrendingUp,
  TrendingDown,
  Banknote,
} from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePayroll } from '@/hooks/use-payroll';
import { useToast } from '@/components/ui/toast';
import { formatCurrency } from '@/lib/date';

type Step = 'period' | 'calculate' | 'review' | 'approve';

const STEPS: Step[] = ['period', 'calculate', 'review', 'approve'];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const CURRENT_YEAR = 2026;
const YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR];

export default function PayrollProcessingPage() {
  const t = useTranslations('payroll');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';

  const [currentStep, setCurrentStep] = useState<Step>('period');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(CURRENT_YEAR);
  const [approved, setApproved] = useState(false);
  const [approving, setApproving] = useState(false);
  const [approvalComment, setApprovalComment] = useState('');

  const { toast } = useToast();
  const { payslips, runSummary, payrollRuns, loading, calculating, runCalculation, approvePayroll } = usePayroll();

  const selectedPeriod = `${MONTHS[selectedMonth]} ${selectedYear}`;

  const stepIndex = STEPS.indexOf(currentStep);

  const stepConfig = [
    { key: 'period' as Step, label: t('step.period'), icon: Calendar },
    { key: 'calculate' as Step, label: t('step.calculate'), icon: Calculator },
    { key: 'review' as Step, label: t('step.review'), icon: ClipboardList },
    { key: 'approve' as Step, label: t('step.approve'), icon: CheckCircle2 },
  ];

  const goNext = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx < STEPS.length - 1) setCurrentStep(STEPS[idx + 1]);
  };

  const goPrev = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx > 0) setCurrentStep(STEPS[idx - 1]);
  };

  const handleCalculate = async () => {
    await runCalculation(selectedPeriod, 'all');
    goNext();
  };

  const handleApprove = async () => {
    setApproving(true);
    try {
      await approvePayroll();
      setApproved(true);
    } finally {
      setApproving(false);
    }
  };

  // ---- Step renders ----

  const renderPeriodStep = () => {
    const existingRun = payrollRuns.find((r) => r.period === selectedPeriod);

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('selectPeriod')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cg-red bg-white"
                >
                  {MONTHS.map((m, idx) => (
                    <option key={m} value={idx}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cg-red bg-white"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-3">
              <Users className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900">Selected Period: {selectedPeriod}</p>
                <p className="text-xs text-blue-700 mt-0.5">
                  Approximately <strong>152 employees</strong> will be included in this payroll run.
                </p>
              </div>
            </div>

            {existingRun && (
              <div className="mt-3 p-3 bg-amber-50 rounded-lg flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-900">Existing run found</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    A payroll run for {selectedPeriod} already exists with status:{' '}
                    <Badge variant={existingRun.status === 'approved' ? 'success' : 'warning'}>
                      {existingRun.status}
                    </Badge>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent payroll runs */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('recentRuns')}</h3>
            {payrollRuns.length === 0 ? (
              <p className="text-sm text-gray-500">{t('noRecentRuns')}</p>
            ) : (
              <div className="space-y-3">
                {payrollRuns.map((run) => (
                  <div key={run.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{run.period}</p>
                      <p className="text-xs text-gray-500">{run.totalEmployees} {t('employees')}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs text-gray-500">{t('totalNet')}</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(run.totalNet, 'THB')}</p>
                      </div>
                      <Badge
                        variant={
                          run.status === 'approved' ? 'success' :
                          run.status === 'calculated' ? 'info' :
                          run.status === 'reviewed' ? 'warning' : 'neutral'
                        }
                      >
                        {run.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderCalculateStep = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-gray-900 mb-2">{t('calculatePayroll')}</h3>
          <p className="text-sm text-gray-500 mb-4">{t('readyToCalculate')}</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">{t('calculationIncludes')}</p>
            <ul className="space-y-2">
              {[
                t('grossPayCalc'),
                t('taxWithholding'),
                t('socialSecurity'),
                t('providentFund'),
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg mb-6">
            <Calendar className="h-5 w-5 text-blue-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">{t('payrollPeriod')}: {selectedPeriod}</p>
              <p className="text-xs text-blue-700">152 employees in scope</p>
            </div>
          </div>

          {calculating ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Loader2 className="h-10 w-10 text-cg-red animate-spin" />
              <p className="font-medium text-gray-900">{t('processing')}</p>
              <p className="text-sm text-gray-500 text-center">{t('processingDesc')}</p>
            </div>
          ) : (
            <Button onClick={handleCalculate} className="w-full sm:w-auto">
              <Calculator className="h-4 w-4 mr-2" />
              {t('runCalculation')}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderReviewStep = () => {
    if (!runSummary) {
      return (
        <div className="text-center py-12 text-gray-500">
          <p>{t('loadingRunDetails')}</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Users className="h-4 w-4" />
                <p className="text-xs uppercase tracking-wide">{t('employees')}</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{runSummary.totalEmployees}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <TrendingUp className="h-4 w-4" />
                <p className="text-xs uppercase tracking-wide">{t('totalGross')}</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(runSummary.totalGross, 'THB')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <TrendingDown className="h-4 w-4" />
                <p className="text-xs uppercase tracking-wide">{t('totalDeductions')}</p>
              </div>
              <p className="text-2xl font-bold text-cg-red">{formatCurrency(runSummary.totalDeductions, 'THB')}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Banknote className="h-4 w-4" />
                <p className="text-xs uppercase tracking-wide">{t('totalNet')}</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(runSummary.totalNet, 'THB')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Employee breakdown table */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('reviewResults')}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-600">{t('employeeId')}</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-600">{t('employeeName')}</th>
                    <th className="text-left px-3 py-2.5 font-semibold text-gray-600 hidden md:table-cell">{t('department')}</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-600">{t('totalGross')}</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-600 hidden sm:table-cell">{t('totalDeductions')}</th>
                    <th className="text-right px-3 py-2.5 font-semibold text-gray-600">{t('totalNet')}</th>
                    <th className="text-center px-3 py-2.5 font-semibold text-gray-600 hidden lg:table-cell"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payslips.map((ps) => (
                    <tr key={ps.employeeId} className="hover:bg-gray-50 transition">
                      <td className="px-3 py-2.5">
                        <span className="font-mono text-xs text-gray-500">{ps.employeeId}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="font-medium text-gray-900">{ps.employeeName}</p>
                      </td>
                      <td className="px-3 py-2.5 text-gray-600 hidden md:table-cell">{ps.department}</td>
                      <td className="px-3 py-2.5 text-right text-gray-900">{formatCurrency(ps.totalGross, 'THB')}</td>
                      <td className="px-3 py-2.5 text-right text-cg-red hidden sm:table-cell">{formatCurrency(ps.totalDeductions, 'THB')}</td>
                      <td className="px-3 py-2.5 text-right font-semibold text-green-600">{formatCurrency(ps.netPay, 'THB')}</td>
                      <td className="px-3 py-2.5 text-center hidden lg:table-cell">
                        {ps.anomaly && (
                          <span title={ps.anomaly}>
                            <AlertTriangle className="h-4 w-4 text-amber-500 mx-auto" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Anomalies */}
        {payslips.some((p) => p.anomaly) && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-gray-900">{t('varianceExceptions')}</h3>
              </div>
              <div className="space-y-2">
                {payslips.filter((p) => p.anomaly).map((ps) => (
                  <div key={ps.employeeId} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg text-sm">
                    <span className="font-medium text-amber-900">{ps.employeeName}</span>
                    <span className="text-amber-700">{ps.anomaly}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderApproveStep = () => {
    if (approved) {
      return (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{t('submitSuccess')}</h3>
          <p className="text-gray-500 text-center max-w-sm">
            Payroll for <strong>{selectedPeriod}</strong> has been approved and is ready for disbursement.
          </p>
          <Badge variant="success" className="text-sm px-4 py-1.5">Approved</Badge>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Summary */}
        {runSummary && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">{t('payrollSummary')}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{t('payrollPeriod')}</span>
                  <span className="font-medium text-gray-900">{runSummary.period}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{t('employees')}</span>
                  <span className="font-medium text-gray-900">{runSummary.totalEmployees}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{t('totalGross')}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(runSummary.totalGross, 'THB')}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{t('totalDeductions')}</span>
                  <span className="font-medium text-cg-red">{formatCurrency(runSummary.totalDeductions, 'THB')}</span>
                </div>
                <div className="flex justify-between py-2 font-semibold text-base">
                  <span className="text-gray-900">{t('totalNet')}</span>
                  <span className="text-green-600">{formatCurrency(runSummary.totalNet, 'THB')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Approval chain */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('approvalChain')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-cg-red text-white flex items-center justify-center text-xs font-bold">1</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{t('level1Approval')}</p>
                  <p className="text-xs text-gray-500">HR Manager</p>
                </div>
                <Badge variant="warning">Pending</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold">2</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{t('level2Approval')}</p>
                  <p className="text-xs text-gray-500">Finance Director</p>
                </div>
                <Badge variant="neutral">Waiting</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comment box */}
        <Card>
          <CardContent className="pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('comments')}</label>
            <textarea
              value={approvalComment}
              onChange={(e) => setApprovalComment(e.target.value)}
              rows={3}
              placeholder="Optional notes for this payroll approval..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cg-red resize-none"
            />
          </CardContent>
        </Card>

        {/* Approve button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleApprove}
            disabled={approving}
            className="flex-1 sm:flex-none sm:min-w-[200px]"
          >
            {approving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Approving...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {t('submitForApproval')}
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => {
            toast('success', 'Payroll draft saved successfully');
            setCurrentStep('period');
          }}>
            {t('saveAsDraft')}
          </Button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'period':
        return renderPeriodStep();
      case 'calculate':
        return renderCalculateStep();
      case 'review':
        return renderReviewStep();
      case 'approve':
        return renderApproveStep();
    }
  };

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
              <p className="text-gray-500 mt-1 text-sm">{t('subtitle')}</p>
            </div>

            {/* Step indicator */}
            <div className="mb-8">
              <div className="flex items-center">
                {stepConfig.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx < stepIndex;
                  const isActive = idx === stepIndex;
                  const isLast = idx === stepConfig.length - 1;

                  return (
                    <div key={step.key} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center">
                        <div
                          className={[
                            'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                            isCompleted ? 'bg-green-500 text-white' :
                            isActive ? 'bg-cg-red text-white' :
                            'bg-gray-200 text-gray-500',
                          ].join(' ')}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <Icon className="h-5 w-5" />
                          )}
                        </div>
                        <span className={[
                          'mt-2 text-xs font-medium whitespace-nowrap hidden sm:block',
                          isActive ? 'text-cg-red' : isCompleted ? 'text-green-600' : 'text-gray-400',
                        ].join(' ')}>
                          {step.label}
                        </span>
                      </div>
                      {!isLast && (
                        <div className={[
                          'flex-1 h-0.5 mx-2 mt-[-12px] sm:mt-[-20px]',
                          isCompleted ? 'bg-green-400' : 'bg-gray-200',
                        ].join(' ')} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step content */}
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cg-red" />
              </div>
            ) : (
              renderStepContent()
            )}

            {/* Navigation buttons */}
            {!approved && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={goPrev}
                  disabled={currentStep === 'period'}
                >
                  {tCommon('back')}
                </Button>

                {currentStep !== 'approve' && (
                  <Button
                    onClick={() => {
                      if (currentStep === 'period') goNext();
                      else if (currentStep === 'calculate') {
                        // calculate step handles next via handleCalculate
                        if (runSummary) goNext();
                      } else goNext();
                    }}
                    disabled={
                      (currentStep === 'calculate' && !runSummary) ||
                      calculating
                    }
                  >
                    {tCommon('next')}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
