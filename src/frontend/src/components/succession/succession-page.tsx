'use client';

import { useTranslations } from 'next-intl';
import { Shield, AlertTriangle, Users, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useSuccession, type Readiness, type RiskLevel } from '@/hooks/use-succession';

const RISK_VARIANT: Record<RiskLevel, 'error' | 'warning' | 'success'> = { high: 'error', medium: 'warning', low: 'success' };
const READINESS_VARIANT: Record<Readiness, 'success' | 'info' | 'neutral'> = { ready_now: 'success', '1_2_years': 'info', '3_plus_years': 'neutral' };

export function SuccessionPage() {
  const t = useTranslations('succession');

  const { plans, stats, loading } = useSuccession();

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 w-full" />)}</div>;
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
        <p className="text-gray-500 mt-1">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-cg-dark">{stats.totalPositions}</p><p className="text-xs text-gray-400">{t('criticalPositions')}</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-cg-red">{stats.highRisk}</p><p className="text-xs text-gray-400">{t('highRisk')}</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-cg-info">{stats.coverageRatio}%</p><p className="text-xs text-gray-400">{t('coverageRatio')}</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-green-600">{stats.readyNowRatio}%</p><p className="text-xs text-gray-400">{t('readyNowRatio')}</p></CardContent></Card>
      </div>

      <div className="space-y-6">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Position & Incumbent */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-5 w-5 text-cg-dark" />
                    <div>
                      <h3 className="font-semibold text-cg-dark">{plan.positionTitle}</h3>
                      <p className="text-xs text-gray-500">{plan.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {plan.incumbentPhoto && <img src={plan.incumbentPhoto} alt="" className="w-8 h-8 rounded-full" />}
                    <div>
                      <p className="text-sm font-medium">{plan.incumbentName}</p>
                      <p className="text-xs text-gray-400">{plan.yearsInRole} {t('yearsInRole')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={RISK_VARIANT[plan.riskLevel]}>{t(`flightRisk.${plan.riskLevel}` as never)}</Badge>
                    <span className="text-xs text-gray-500">{plan.riskReason}</span>
                  </div>
                </div>

                {/* Successors */}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('identifiedSuccessors')} ({plan.successors.length})</h4>
                  {plan.successors.length === 0 ? (
                    <p className="text-sm text-gray-500">{t('noSuccessorsIdentified')}</p>
                  ) : (
                    <div className="space-y-3">
                      {plan.successors.map((s) => (
                        <div key={s.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          {s.photo && <img src={s.photo} alt="" className="w-8 h-8 rounded-full" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{s.name}</p>
                            <p className="text-xs text-gray-500">{s.position} - {s.department}</p>
                          </div>
                          <Badge variant={READINESS_VARIANT[s.readiness]}>
                            {s.readiness === 'ready_now' ? t('readyNow') : s.readiness === '1_2_years' ? t('ready1To2Years') : t('ready3PlusYears')}
                          </Badge>
                          {s.gaps.length > 0 && (
                            <div className="hidden sm:flex gap-1">
                              {s.gaps.map((g) => <Badge key={g} variant="warning">{g}</Badge>)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
