'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { TrendingUp, Users, AlertTriangle, Star } from 'lucide-react';
import { Card, CardTitle } from '@/components/humi';
import { Badge } from '@/components/ui/badge';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useTalent } from '@/hooks/use-talent';
import { CustomSelect } from '@/components/ui/custom-select';

export function TalentPage() {
 const t = useTranslations('talent');
 const { employees, hiPoList, nineBoxGrid, departments, loading, departmentFilter, setDepartmentFilter } = useTalent();
 const [activeTab, setActiveTab] = useState('dashboard');

 const tabs = [
 { key:'dashboard', label: t('tabs.dashboard') },
 { key:'nineBox', label: t('tabs.nineBox') },
 { key:'talentPool', label: t('tabs.talentPool') },
 ];

 if (loading) {
 return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 w-full" />)}</div>;
 }

 const stats = [
 { label: t('dashboard.totalHiPo'), value: hiPoList.length, desc: t('dashboard.ofWorkforce'), icon: <Star className="h-5 w-5 text-yellow-500" /> },
 { label: t('dashboard.stars'), value: employees.filter((e) => e.nineBoxPosition ==='Star').length, desc: t('dashboard.topPerformers'), icon: <TrendingUp className="h-5 w-5 text-success" /> },
 { label: t('dashboard.atRisk'), value: employees.filter((e) => e.riskOfLoss ==='high').length, desc: t('dashboard.retentionRisk'), icon: <AlertTriangle className="h-5 w-5 text-danger" /> },
 { label: t('dashboard.readyNow'), value: hiPoList.filter((e) => e.performanceRating >= 4).length, desc: t('dashboard.promotionReady'), icon: <Users className="h-5 w-5 text-accent" /> },
 ];

 return (
 <>
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
 <p className="text-ink-muted mt-1">{t('subtitle')}</p>
 </div>

 <div className="flex items-center gap-4 mb-6">
 <CustomSelect
 value={departmentFilter}
 onChange={setDepartmentFilter}
 options={[
 { value: 'all', label: t('allDepartments') },
 ...departments.map((d) => ({ value: d, label: d })),
 ]}
 className="w-48"
 />
 </div>

 <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

 {activeTab ==='dashboard' && (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {stats.map((s) => (
 <Card key={s.label}>
 <div className="p-5 sm:p-6 lg:p-8">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-md bg-surface-raised flex items-center justify-center">{s.icon}</div>
 <div>
 <p className="text-2xl font-bold text-ink">{s.value}</p>
 <p className="text-xs text-ink-muted">{s.label}</p>
 </div>
 </div>
 </div>
 </Card>
 ))}
 </div>

 <Card header={<CardTitle>{t('dashboard.hiPoList')}</CardTitle>}>
 {hiPoList.length === 0 ? (
 <p className="text-sm text-ink-muted text-center py-8">{t('noHiPo')}</p>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b">
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted uppercase">Name</th>
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted uppercase">Position</th>
 <th className="text-left py-3 px-2 text-xs font-medium text-ink-muted uppercase">Department</th>
 <th className="text-center py-3 px-2 text-xs font-medium text-ink-muted uppercase">{t('performance')}</th>
 <th className="text-center py-3 px-2 text-xs font-medium text-ink-muted uppercase">{t('potential')}</th>
 <th className="text-center py-3 px-2 text-xs font-medium text-ink-muted uppercase">{t('riskOfLoss')}</th>
 </tr>
 </thead>
 <tbody>
 {hiPoList.map((emp) => (
 <tr key={emp.id} className="border-b last:border-0 hover:bg-surface-raised/30">
 <td className="py-3 px-2">
 <div className="flex items-center gap-2">
 {emp.photo && <img src={emp.photo} alt="" className="w-8 h-8 rounded-full" />}
 <span className="font-medium">{emp.name}</span>
 </div>
 </td>
 <td className="py-3 px-2 text-ink-muted">{emp.position}</td>
 <td className="py-3 px-2 text-ink-muted">{emp.department}</td>
 <td className="py-3 px-2 text-center"><Badge variant={emp.performanceRating >= 4 ?'success' :'warning'}>{emp.performanceRating}/5</Badge></td>
 <td className="py-3 px-2 text-center"><Badge variant={emp.potentialRating >= 4 ?'success' :'info'}>{emp.potentialRating}/5</Badge></td>
 <td className="py-3 px-2 text-center"><Badge variant={emp.riskOfLoss ==='high' ?'error' : emp.riskOfLoss ==='medium' ?'warning' :'success'}>{emp.riskOfLoss}</Badge></td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </Card>
 </div>
 )}

 {activeTab ==='nineBox' && (
 <Card header={<CardTitle>{t('nineBox.title')}</CardTitle>}>
 <div className="mb-4 flex items-center gap-4 text-xs text-ink-muted">
 <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded bg-gray-300" /> {t('nineBox.performance')} →</span>
 <span className="flex items-center gap-1">↑ {t('nineBox.potential')}</span>
 </div>
 <div className="grid grid-cols-3 gap-2">
 {nineBoxGrid.map((cell) => (
 <div key={`${cell.row}-${cell.col}`} className={`${cell.color} rounded-md p-3 min-h-[120px] border`}>
 <p className="text-xs font-semibold text-ink-soft mb-2">{cell.label}</p>
 <p className="text-lg font-bold text-ink">{cell.employees.length}</p>
 <div className="mt-1 space-y-1">
 {cell.employees.slice(0, 3).map((emp) => (
 <div key={emp.id} className="flex items-center gap-1">
 {emp.photo && <img src={emp.photo} alt="" className="w-5 h-5 rounded-full" />}
 <span className="text-xs text-ink-muted truncate">{emp.name}</span>
 </div>
 ))}
 {cell.employees.length > 3 && <p className="text-xs text-ink-muted">+{cell.employees.length - 3} more</p>}
 </div>
 </div>
 ))}
 </div>
 </Card>
 )}

 {activeTab ==='talentPool' && (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 {employees.map((emp) => (
 <Card key={emp.id}>
 <div className="hover:shadow-1 transition-shadow p-5 sm:p-6 lg:p-8">
 <div className="flex items-center gap-3 mb-3">
 {emp.photo && <img src={emp.photo} alt="" className="w-10 h-10 rounded-full" />}
 <div>
 <p className="font-semibold text-ink">{emp.name}</p>
 <p className="text-xs text-ink-muted">{emp.position}</p>
 </div>
 {emp.isHiPo && <Badge variant="success" className="ml-auto">{t('hiPo')}</Badge>}
 </div>
 <div className="grid grid-cols-2 gap-2 text-sm">
 <div><span className="text-ink-muted">{t('performance')}</span><p className="font-medium">{emp.performanceRating}/5</p></div>
 <div><span className="text-ink-muted">{t('potential')}</span><p className="font-medium">{emp.potentialRating}/5</p></div>
 <div><span className="text-ink-muted">{t('yearsOfService')}</span><p className="font-medium">{emp.yearsOfService}</p></div>
 <div><span className="text-ink-muted">{t('riskOfLoss')}</span><Badge variant={emp.riskOfLoss ==='high' ?'error' : emp.riskOfLoss ==='medium' ?'warning' :'success'}>{emp.riskOfLoss}</Badge></div>
 </div>
 </div>
 </Card>
 ))}
 </div>
 )}
 </>
 );
}
