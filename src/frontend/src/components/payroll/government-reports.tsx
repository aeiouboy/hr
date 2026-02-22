'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FileText, Download, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { usePayroll } from '@/hooks/use-payroll';
import { useAuthStore } from '@/stores/auth-store';
import { canAccessModule } from '@/lib/rbac';

type ReportType = 'pnd1' | 'pnd1_kor' | 'sso' | 'pvd';

const REPORT_TYPES: { value: ReportType; label: string }[] = [
  { value: 'pnd1', label: 'PND 1 (Monthly WHT)' },
  { value: 'pnd1_kor', label: 'PND 1 Kor (Annual WHT)' },
  { value: 'sso', label: 'Social Security (Monthly)' },
  { value: 'pvd', label: 'Provident Fund (Monthly)' },
];

export function GovernmentReports() {
  const t = useTranslations();
  const { toast } = useToast();
  const { roles } = useAuthStore();
  const { reportHistory, loading, generateReport } = usePayroll();
  const [reportType, setReportType] = useState<ReportType>('pnd1');
  const [month, setMonth] = useState('2');
  const [year, setYear] = useState('2026');
  const [generating, setGenerating] = useState(false);

  if (!canAccessModule(roles, 'government-reports')) {
    return <div className="text-center py-12"><p className="text-gray-500">{t('common.noData')}</p></div>;
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => <Skeleton key={i} className="h-48 w-full" />)}
      </div>
    );
  }

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const period = `${new Date(2026, Number(month) - 1).toLocaleString('en', { month: 'long' })} ${year}`;
      await generateReport(reportType, period);
      toast('success', t('govReports.generated'));
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Generate Report */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-cg-red" />
            <CardTitle>{t('govReports.generateReport')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <FormField
              label={t('govReports.reportType')}
              name="reportType"
              type="select"
              value={reportType}
              onChange={(v) => setReportType(v as ReportType)}
              options={REPORT_TYPES}
            />
            <FormField
              label={t('govReports.month')}
              name="month"
              type="select"
              value={month}
              onChange={setMonth}
              options={Array.from({ length: 12 }, (_, i) => ({
                value: String(i + 1),
                label: new Date(2026, i).toLocaleString('en', { month: 'long' }),
              }))}
            />
            <FormField
              label={t('govReports.year')}
              name="year"
              type="select"
              value={year}
              onChange={setYear}
              options={[{ value: '2025', label: '2025' }, { value: '2026', label: '2026' }]}
            />
            <Button onClick={handleGenerate} disabled={generating}>
              {generating ? (
                <><RefreshCw className="h-4 w-4 mr-2 animate-spin" />{t('common.loading')}</>
              ) : (
                t('govReports.generate')
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report History */}
      <Card>
        <CardHeader>
          <CardTitle>{t('govReports.reportHistory')}</CardTitle>
        </CardHeader>
        <CardContent>
          {reportHistory.length === 0 ? (
            <p className="text-center text-gray-500 py-8">{t('common.noData')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-2 px-3 font-medium text-gray-500">{t('govReports.type')}</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-500">{t('govReports.period')}</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-500">{t('govReports.generatedDate')}</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-500">{t('govReports.records')}</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-500">{t('govReports.status')}</th>
                    <th className="text-right py-2 px-3 font-medium text-gray-500">{t('common.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {reportHistory.map((report) => (
                    <tr key={report.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{report.typeLabel}</td>
                      <td className="py-2 px-3">{report.period}</td>
                      <td className="py-2 px-3">{report.generatedDate}</td>
                      <td className="py-2 px-3">{report.recordCount}</td>
                      <td className="py-2 px-3">
                        <Badge
                          variant={
                            report.status === 'accepted' ? 'success' :
                            report.status === 'submitted' ? 'info' : 'warning'
                          }
                        >
                          {report.status}
                        </Badge>
                      </td>
                      <td className="py-2 px-3 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
