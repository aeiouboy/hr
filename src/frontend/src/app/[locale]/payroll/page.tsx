'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { DollarSign, Calculator, BarChart3, Calendar } from 'lucide-react';
import { Card, CardTitle } from '@/components/humi';
import { useAuthStore } from '@/stores/auth-store';
import { canAccessModule } from '@/lib/rbac';

export default function PayrollLandingPage() {
 const t = useTranslations();
 const { roles } = useAuthStore();
 const pathname = usePathname();
 const locale = pathname.startsWith('/th') ?'th' :'en';

 if (!canAccessModule(roles,'payroll-processing')) {
 return <p className="text-ink-muted">{t('common.noData')}</p>;
 }

 const links = [
 {
 title: t('payrollSetup.title'),
 description: t('payrollSetup.description'),
 href: `/${locale}/payroll/setup`,
 icon: <DollarSign className="h-6 w-6" />,
 color:'text-accent bg-accent-tint',
 },
 {
 title: t('payrollProcessing.title'),
 description: t('payrollProcessing.description'),
 href: `/${locale}/payroll/processing`,
 icon: <Calculator className="h-6 w-6" />,
 color:'text-accent bg-accent-tint',
 },
 {
 title: t('govReports.title'),
 description: t('govReports.description'),
 href: `/${locale}/payroll/reports`,
 icon: <BarChart3 className="h-6 w-6" />,
 color:'text-success bg-success-tint',
 },
 ];

 return (
 <>
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('payroll.title')}</h1>
 <p className="text-ink-muted mt-1">{t('payroll.subtitle')}</p>
 </div>

 {/* Quick Stats */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
 <Card>
 <div className="flex items-center gap-3">
 <Calendar className="h-5 w-5 text-ink-muted" />
 <div>
 <p className="text-xs text-ink-muted">{t('payroll.lastRun')}</p>
 <p className="font-semibold text-ink">Jan 25, 2026</p>
 </div>
 </div>
 </Card>
 <Card>
 <div className="flex items-center gap-3">
 <Calendar className="h-5 w-5 text-ink-muted" />
 <div>
 <p className="text-xs text-ink-muted">{t('payroll.nextRun')}</p>
 <p className="font-semibold text-ink">Feb 25, 2026</p>
 </div>
 </div>
 </Card>
 <Card>
 <div className="flex items-center gap-3">
 <Calculator className="h-5 w-5 text-ink-muted" />
 <div>
 <p className="text-xs text-ink-muted">{t('payroll.employeesOnPayroll')}</p>
 <p className="font-semibold text-ink">152</p>
 </div>
 </div>
 </Card>
 </div>

 {/* Navigation Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 {links.map((link) => (
 <a key={link.href} href={link.href}>
 <Card
 className="hover:shadow-1 transition-shadow cursor-pointer h-full"
 header={
 <div className={`w-12 h-12 rounded-md flex items-center justify-center ${link.color}`}>
 {link.icon}
 </div>
 }
 >
 <CardTitle className="text-base mb-1">{link.title}</CardTitle>
 <p className="text-sm text-ink-muted">{link.description}</p>
 </Card>
 </a>
 ))}
 </div>
 </>
 );
}
