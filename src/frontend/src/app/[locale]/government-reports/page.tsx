'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { FileText, Download, AlertCircle, CheckCircle, Clock, FileSpreadsheet } from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { useGovReports, REPORT_TYPE_INFO } from '@/hooks/use-gov-reports';
import type { ReportType, ReportFormat, GovReport } from '@/hooks/use-gov-reports';

const CURRENT_YEAR = 2026;

const MONTHS = [
  { value: '01', labelKey: 'months.1' },
  { value: '02', labelKey: 'months.2' },
  { value: '03', labelKey: 'months.3' },
  { value: '04', labelKey: 'months.4' },
  { value: '05', labelKey: 'months.5' },
  { value: '06', labelKey: 'months.6' },
  { value: '07', labelKey: 'months.7' },
  { value: '08', labelKey: 'months.8' },
  { value: '09', labelKey: 'months.9' },
  { value: '10', labelKey: 'months.10' },
  { value: '11', labelKey: 'months.11' },
  { value: '12', labelKey: 'months.12' },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function StatusBadge({ status }: { status: GovReport['status'] }) {
  if (status === 'submitted') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3" />
        Submitted
      </span>
    );
  }
  if (status === 'generated') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <FileText className="h-3 w-3" />
        Generated
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
      <Clock className="h-3 w-3" />
      Pending
    </span>
  );
}

export default function GovernmentReportsPage() {
  const t = useTranslations('govReports');
  const pathname = usePathname();
  const { reports, loading, generating, generateReport } = useGovReports();

  const [selectedType, setSelectedType] = useState<ReportType | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [selectedYear, setSelectedYear] = useState(String(CURRENT_YEAR));
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [generateSuccess, setGenerateSuccess] = useState<string | null>(null);

  const selectedTypeInfo = REPORT_TYPE_INFO.find((r) => r.type === selectedType);
  const isAnnual = selectedTypeInfo?.frequency === 'annual';

  const getPeriod = () => {
    if (isAnnual) return selectedYear;
    return `${selectedYear}-${selectedMonth}`;
  };

  const handleGenerate = async (format: ReportFormat) => {
    if (!selectedType) return;
    setGenerateError(null);
    setGenerateSuccess(null);
    try {
      const report = await generateReport(selectedType, getPeriod(), format);
      setGenerateSuccess(t('generateSuccess'));
      setTimeout(() => setGenerateSuccess(null), 4000);
    } catch {
      setGenerateError(t('generateError'));
    }
  };

  const reportTypeLabels: Record<ReportType, string> = {
    pnd1: 'PND.1',
    pnd1k: 'PND.1K',
    '50tawi': '50 Tawi',
    sps110: 'SSO 1-10',
  };

  const reportTypeDescriptions: Record<ReportType, { th: string; en: string }> = {
    pnd1: { th: 'ภ.ง.ด.1', en: 'Monthly Withholding Tax Return' },
    pnd1k: { th: 'ภ.ง.ด.1ก', en: 'Annual Withholding Tax Summary' },
    '50tawi': { th: 'ใบรับรองการหักภาษี ณ ที่จ่าย', en: 'Withholding Tax Certificate (50 Tawi)' },
    sps110: { th: 'สปส.1-10', en: 'Social Security Monthly Report' },
  };

  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: String(CURRENT_YEAR - i),
    label: String(CURRENT_YEAR - i),
  }));

  const monthOptions = MONTHS.map((m) => ({
    value: m.value,
    label: t(m.labelKey as Parameters<typeof t>[0]),
  }));

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Page header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
              <p className="text-gray-500 text-sm mt-1">{t('subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left column: report selection + parameters */}
              <div className="xl:col-span-1 space-y-6">
                {/* Report type selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{t('selectReport')}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {REPORT_TYPE_INFO.map((info) => {
                      const isSelected = selectedType === info.type;
                      return (
                        <button
                          key={info.type}
                          type="button"
                          onClick={() => {
                            setSelectedType(info.type);
                            setGenerateError(null);
                            setGenerateSuccess(null);
                          }}
                          className={`w-full text-left rounded-lg border-2 p-4 transition-all ${
                            isSelected
                              ? 'border-cg-red bg-cg-red/5'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                                isSelected ? 'bg-cg-red text-white' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {reportTypeLabels[info.type]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-gray-800">
                                {reportTypeDescriptions[info.type].en}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {reportTypeDescriptions[info.type].th}
                              </p>
                              <span
                                className={`inline-block mt-1.5 text-[10px] font-medium px-1.5 py-0.5 rounded uppercase tracking-wide ${
                                  info.frequency === 'monthly'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-purple-100 text-purple-700'
                                }`}
                              >
                                {info.frequency === 'monthly' ? t('monthly') : t('annual')}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Report parameters */}
                {selectedType && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t('reportParameters')}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      <FormField
                        label={t('year')}
                        name="year"
                        type="select"
                        value={selectedYear}
                        onChange={setSelectedYear}
                        options={yearOptions}
                      />

                      {!isAnnual && (
                        <FormField
                          label={t('month')}
                          name="month"
                          type="select"
                          value={selectedMonth}
                          onChange={setSelectedMonth}
                          options={monthOptions}
                        />
                      )}

                      {/* Feedback messages */}
                      {generateError && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-red-700">{generateError}</p>
                        </div>
                      )}
                      {generateSuccess && (
                        <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-green-700">{generateSuccess}</p>
                        </div>
                      )}

                      {/* Generate buttons */}
                      <div className="space-y-2 pt-2">
                        <Button
                          className="w-full"
                          onClick={() => handleGenerate('pdf')}
                          disabled={generating}
                        >
                          {generating ? (
                            <span className="flex items-center gap-2">
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              {t('generating')}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              {t('generatePdf')}
                            </span>
                          )}
                        </Button>

                        {selectedTypeInfo?.supportsExcel ? (
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleGenerate('excel')}
                            disabled={generating}
                          >
                            <span className="flex items-center gap-2">
                              <FileSpreadsheet className="h-4 w-4" />
                              {t('generateExcel')}
                            </span>
                          </Button>
                        ) : (
                          <p className="text-xs text-gray-400 text-center">{t('excelNotSupported')}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right column: generated reports history */}
              <div className="xl:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{t('recentReports')}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {loading ? (
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-lg" />
                        ))}
                      </div>
                    ) : reports.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">{t('noReportsGenerated')}</p>
                      </div>
                    ) : (
                      <>
                        {/* Desktop table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-gray-50">
                                <th className="text-left px-4 py-3 font-medium text-gray-600">
                                  {t('reportType')}
                                </th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600">
                                  {t('period')}
                                </th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600">
                                  {t('format')}
                                </th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600">
                                  {t('generatedAt')}
                                </th>
                                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                                <th className="px-4 py-3" />
                              </tr>
                            </thead>
                            <tbody>
                              {reports.map((report) => (
                                <tr key={report.id} className="border-b hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3">
                                    <div>
                                      <p className="font-medium text-gray-800">
                                        {reportTypeLabels[report.type]}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {reportTypeDescriptions[report.type].en}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-gray-700">{report.period}</td>
                                  <td className="px-4 py-3">
                                    <span
                                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium uppercase ${
                                        report.format === 'excel'
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-red-100 text-red-700'
                                      }`}
                                    >
                                      {report.format === 'excel' ? (
                                        <FileSpreadsheet className="h-3 w-3" />
                                      ) : (
                                        <FileText className="h-3 w-3" />
                                      )}
                                      {report.format}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 text-gray-600 text-xs">
                                    {formatDate(report.generatedAt)}
                                  </td>
                                  <td className="px-4 py-3">
                                    <StatusBadge status={report.status} />
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    {report.fileUrl && (
                                      <a
                                        href={report.fileUrl}
                                        download={report.fileName}
                                        className="inline-flex items-center gap-1 text-cg-red hover:text-cg-red/80 text-xs font-medium"
                                      >
                                        <Download className="h-3.5 w-3.5" />
                                        Download
                                      </a>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile card list */}
                        <div className="md:hidden space-y-3">
                          {reports.map((report) => (
                            <div
                              key={report.id}
                              className="border rounded-lg p-4 bg-white"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-semibold text-sm text-gray-800">
                                    {reportTypeLabels[report.type]}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {reportTypeDescriptions[report.type].en}
                                  </p>
                                </div>
                                <StatusBadge status={report.status} />
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>
                                  {report.period} •{' '}
                                  <span
                                    className={`font-medium uppercase ${
                                      report.format === 'excel' ? 'text-green-600' : 'text-red-600'
                                    }`}
                                  >
                                    {report.format}
                                  </span>
                                </span>
                                {report.fileUrl && (
                                  <a
                                    href={report.fileUrl}
                                    download={report.fileName}
                                    className="inline-flex items-center gap-1 text-cg-red font-medium"
                                  >
                                    <Download className="h-3.5 w-3.5" />
                                    Download
                                  </a>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 mt-1">{formatDate(report.generatedAt)}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
