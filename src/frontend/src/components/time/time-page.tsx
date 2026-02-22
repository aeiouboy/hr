'use client';

import { useTranslations } from 'next-intl';
import { Clock, AlertTriangle, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useTime } from '@/hooks/use-time';

const STATUS_CONFIG: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'neutral'; label: string }> = {
  present: { variant: 'success', label: 'Present' },
  late: { variant: 'warning', label: 'Late' },
  absent: { variant: 'error', label: 'Absent' },
  leave: { variant: 'info', label: 'Leave' },
  holiday: { variant: 'neutral', label: 'Holiday' },
  weekend: { variant: 'neutral', label: 'Weekend' },
};

export function TimePage() {
  const t = useTranslations('timeManagement');
  const { attendance, loading, summary } = useTime();

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full" />)}</div>;
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold text-cg-dark">{summary.totalWorkDays}</p><p className="text-xs text-gray-400">Work Days</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold text-cg-dark">{summary.totalWorkHours}h</p><p className="text-xs text-gray-400">{t('totalHours')}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold text-yellow-600">{summary.lateDays}</p><p className="text-xs text-gray-400">Late</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold text-red-600">{summary.absentDays}</p><p className="text-xs text-gray-400">Absent</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold text-blue-600">{summary.leaveDays}</p><p className="text-xs text-gray-400">Leave</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold text-cg-red">{summary.totalOvertimeHours}h</p><p className="text-xs text-gray-400">OT</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Attendance Log</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Day</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('shift')}</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase">Check-in</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase">Check-out</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('workHours')}</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase">OT</th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase">{t('status.active')}</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((rec) => {
                  const config = STATUS_CONFIG[rec.status] || STATUS_CONFIG.present;
                  return (
                    <tr key={rec.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{rec.date}</td>
                      <td className="py-3 px-4 text-gray-600">{rec.dayOfWeek}</td>
                      <td className="py-3 px-4 text-gray-600 text-xs">{rec.shift}</td>
                      <td className="py-3 px-4 text-center">{rec.checkIn || '-'}</td>
                      <td className="py-3 px-4 text-center">{rec.checkOut || '-'}</td>
                      <td className="py-3 px-4 text-center">{rec.workHours > 0 ? `${rec.workHours}h` : '-'}</td>
                      <td className="py-3 px-4 text-center">{rec.overtimeHours > 0 ? `${rec.overtimeHours}h` : '-'}</td>
                      <td className="py-3 px-4 text-center"><Badge variant={config.variant}>{config.label}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
