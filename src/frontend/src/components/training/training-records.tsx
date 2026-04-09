'use client';

import { useTranslations } from 'next-intl';
import { FileText, Clock, Award, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTraining } from '@/hooks/use-training';
import { formatDate, formatCurrency } from '@/lib/date';

export function TrainingRecordsPage() {
  const t = useTranslations('training');
  const { records, categories, years, loading, totalHours, completedCount, yearFilter, setYearFilter, categoryFilter, setCategoryFilter } = useTraining();

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full" />)}</div>;
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card><CardContent className="p-5 sm:p-6 lg:p-8 flex items-center gap-3"><Clock className="h-8 w-8 text-brand" /><div><p className="text-2xl font-bold text-ink">{totalHours}</p><p className="text-xs text-gray-400 dark:text-gray-500">{t('totalHours')}</p></div></CardContent></Card>
        <Card><CardContent className="p-5 sm:p-6 lg:p-8 flex items-center gap-3"><Award className="h-8 w-8 text-green-500" /><div><p className="text-2xl font-bold text-ink">{completedCount}</p><p className="text-xs text-gray-400 dark:text-gray-500">{t('completedCourses')}</p></div></CardContent></Card>
        <Card><CardContent className="p-5 sm:p-6 lg:p-8 flex items-center gap-3"><FileText className="h-8 w-8 text-blue-500" /><div><p className="text-2xl font-bold text-ink">{records.filter((r) => r.status === 'in_progress').length}</p><p className="text-xs text-gray-400 dark:text-gray-500">{t('inProgress')}</p></div></CardContent></Card>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}
          className="rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
          <option value="all">{t('filterByYear')}</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 px-3 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand">
          <option value="all">{t('filterByCategory')}</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <Card>
        <CardContent className="p-0">
          {records.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-12">{t('noRecords')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('courseName')}</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('category')}</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('type')}</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('duration')}</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('dates')}</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('status')}</th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('cost')}</th>
                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec) => (
                    <tr key={rec.id} className="border-b dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{rec.courseName}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{rec.courseCode}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{rec.category}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{rec.type}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{rec.hours} {t('hours')}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-xs">{formatDate(rec.startDate, 'short')} - {formatDate(rec.endDate, 'short')}</td>
                      <td className="py-3 px-4">
                        <Badge variant={rec.status === 'completed' ? 'success' : rec.status === 'in_progress' ? 'warning' : 'info'}>
                          {rec.status === 'completed' ? t('completedCourses') : rec.status === 'in_progress' ? t('inProgress') : 'Registered'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600 dark:text-gray-400">{rec.cost > 0 ? formatCurrency(rec.cost) : '-'}</td>
                      <td className="py-3 px-4 text-center">
                        {rec.certificateUrl && (
                          <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
