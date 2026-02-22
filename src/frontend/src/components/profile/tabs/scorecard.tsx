'use client';

import { useTranslations } from 'next-intl';
import { BarChart3, History } from 'lucide-react';
import { SectionCard } from '../section-card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface ScorecardTabProps {
  employee: Record<string, unknown> | null;
  loading?: boolean;
}

export function ScorecardTab({ employee, loading }: ScorecardTabProps) {
  const t = useTranslations();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!employee) return null;

  const scorecard = employee.scorecard as Record<string, unknown> | undefined;
  const competencies = (scorecard?.competencies as Record<string, unknown>[]) || [];
  const overallRating = scorecard?.overallRating as string;
  const potentialRating = scorecard?.potentialRating as string;
  const nineBoxPosition = scorecard?.nineBoxPosition as string | undefined;
  const assessmentHistory = (scorecard?.assessmentHistory as Record<string, unknown>[]) || [];

  const maxRating = 5;

  // Determine 9-Box badge color
  const nineBoxColor: Record<string, string> = {
    Star: 'bg-green-100 text-green-800',
    'Future Star': 'bg-blue-100 text-blue-800',
    'Consistent Star': 'bg-green-100 text-green-800',
    'High Potential': 'bg-blue-100 text-blue-800',
    'Core Player': 'bg-yellow-100 text-yellow-800',
    'Trusted Professional': 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-6 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">{t('scorecard.overallRating')}</p>
          <p className="text-2xl font-bold text-cg-red mt-2">{overallRating || '-'}</p>
        </div>
        <div className="bg-white rounded-xl border p-6 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">{t('scorecard.potentialRating')}</p>
          <p className="text-2xl font-bold text-cg-info mt-2">{potentialRating || '-'}</p>
        </div>
        <div className="bg-white rounded-xl border p-6 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">9-Box Position</p>
          {nineBoxPosition ? (
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${nineBoxColor[nineBoxPosition] || 'bg-gray-100 text-gray-800'}`}>
              {nineBoxPosition}
            </span>
          ) : (
            <p className="text-2xl font-bold text-gray-300 mt-2">-</p>
          )}
        </div>
      </div>

      {/* CG Competencies */}
      <SectionCard title={t('scorecard.cgCompetency')} icon={<BarChart3 className="h-5 w-5" />}>
        {competencies.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">{t('scorecard.noCompetencies')}</p>
        ) : (
          <div className="space-y-4">
            {competencies.map((comp, i) => {
              const rating = comp.rating as number;
              const pct = (rating / maxRating) * 100;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{comp.name as string}</span>
                    <span className="text-sm font-bold text-cg-dark">{rating}/{maxRating}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-cg-red h-2.5 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>

      {/* Assessment History */}
      <SectionCard title="Assessment History" icon={<History className="h-5 w-5" />}>
        {assessmentHistory.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No assessment history available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-400 uppercase">Period</th>
                  <th className="text-center py-2 px-2 text-xs font-medium text-gray-400 uppercase">Rating</th>
                  <th className="text-center py-2 px-2 text-xs font-medium text-gray-400 uppercase">Potential</th>
                  <th className="text-left py-2 px-2 text-xs font-medium text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {assessmentHistory.map((h, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 px-2 font-medium">{h.period as string}</td>
                    <td className="py-2 px-2 text-center">{h.rating as string}</td>
                    <td className="py-2 px-2 text-center">{h.potential as string}</td>
                    <td className="py-2 px-2"><Badge variant={(h.status as string) === 'completed' ? 'success' : 'info'}>{h.status as string}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
