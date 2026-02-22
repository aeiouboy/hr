'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { TrendingUp, Users, AlertTriangle, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useTalent } from '@/hooks/use-talent';

export function TalentPage() {
  const t = useTranslations('talent');
  const { employees, hiPoList, nineBoxGrid, departments, loading, departmentFilter, setDepartmentFilter } = useTalent();
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { key: 'dashboard', label: t('tabs.dashboard') },
    { key: 'nineBox', label: t('tabs.nineBox') },
    { key: 'talentPool', label: t('tabs.talentPool') },
  ];

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 w-full" />)}</div>;
  }

  const stats = [
    { label: t('dashboard.totalHiPo'), value: hiPoList.length, desc: t('dashboard.ofWorkforce'), icon: <Star className="h-5 w-5 text-yellow-500" /> },
    { label: t('dashboard.stars'), value: employees.filter((e) => e.nineBoxPosition === 'Star').length, desc: t('dashboard.topPerformers'), icon: <TrendingUp className="h-5 w-5 text-green-500" /> },
    { label: t('dashboard.atRisk'), value: employees.filter((e) => e.riskOfLoss === 'high').length, desc: t('dashboard.retentionRisk'), icon: <AlertTriangle className="h-5 w-5 text-red-500" /> },
    { label: t('dashboard.readyNow'), value: hiPoList.filter((e) => e.performanceRating >= 4).length, desc: t('dashboard.promotionReady'), icon: <Users className="h-5 w-5 text-blue-500" /> },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
        <p className="text-gray-500 mt-1">{t('subtitle')}</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red focus:ring-1 focus:ring-cg-red"
        >
          <option value="all">{t('allDepartments')}</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <Card key={s.label}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">{s.icon}</div>
                    <div>
                      <p className="text-2xl font-bold text-cg-dark">{s.value}</p>
                      <p className="text-xs text-gray-400">{s.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader><CardTitle>{t('dashboard.hiPoList')}</CardTitle></CardHeader>
            <CardContent>
              {hiPoList.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">{t('noHiPo')}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">Name</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">Position</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-gray-400 uppercase">Department</th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-400 uppercase">{t('performance')}</th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-400 uppercase">{t('potential')}</th>
                        <th className="text-center py-3 px-2 text-xs font-medium text-gray-400 uppercase">{t('riskOfLoss')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hiPoList.map((emp) => (
                        <tr key={emp.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              {emp.photo && <img src={emp.photo} alt="" className="w-8 h-8 rounded-full" />}
                              <span className="font-medium">{emp.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-gray-600">{emp.position}</td>
                          <td className="py-3 px-2 text-gray-600">{emp.department}</td>
                          <td className="py-3 px-2 text-center"><Badge variant={emp.performanceRating >= 4 ? 'success' : 'warning'}>{emp.performanceRating}/5</Badge></td>
                          <td className="py-3 px-2 text-center"><Badge variant={emp.potentialRating >= 4 ? 'success' : 'info'}>{emp.potentialRating}/5</Badge></td>
                          <td className="py-3 px-2 text-center"><Badge variant={emp.riskOfLoss === 'high' ? 'error' : emp.riskOfLoss === 'medium' ? 'warning' : 'success'}>{emp.riskOfLoss}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'nineBox' && (
        <Card>
          <CardHeader><CardTitle>{t('nineBox.title')}</CardTitle></CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-gray-300" /> {t('nineBox.performance')} →</span>
              <span className="flex items-center gap-1">↑ {t('nineBox.potential')}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {nineBoxGrid.map((cell) => (
                <div key={`${cell.row}-${cell.col}`} className={`${cell.color} rounded-lg p-3 min-h-[120px] border`}>
                  <p className="text-xs font-semibold text-gray-700 mb-2">{cell.label}</p>
                  <p className="text-lg font-bold text-cg-dark">{cell.employees.length}</p>
                  <div className="mt-1 space-y-1">
                    {cell.employees.slice(0, 3).map((emp) => (
                      <div key={emp.id} className="flex items-center gap-1">
                        {emp.photo && <img src={emp.photo} alt="" className="w-5 h-5 rounded-full" />}
                        <span className="text-xs text-gray-600 truncate">{emp.name}</span>
                      </div>
                    ))}
                    {cell.employees.length > 3 && <p className="text-xs text-gray-400">+{cell.employees.length - 3} more</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'talentPool' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <Card key={emp.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {emp.photo && <img src={emp.photo} alt="" className="w-10 h-10 rounded-full" />}
                  <div>
                    <p className="font-semibold text-cg-dark">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.position}</p>
                  </div>
                  {emp.isHiPo && <Badge variant="success" className="ml-auto">{t('hiPo')}</Badge>}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-400">{t('performance')}</span><p className="font-medium">{emp.performanceRating}/5</p></div>
                  <div><span className="text-gray-400">{t('potential')}</span><p className="font-medium">{emp.potentialRating}/5</p></div>
                  <div><span className="text-gray-400">{t('yearsOfService')}</span><p className="font-medium">{emp.yearsOfService}</p></div>
                  <div><span className="text-gray-400">{t('riskOfLoss')}</span><Badge variant={emp.riskOfLoss === 'high' ? 'error' : emp.riskOfLoss === 'medium' ? 'warning' : 'success'}>{emp.riskOfLoss}</Badge></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
