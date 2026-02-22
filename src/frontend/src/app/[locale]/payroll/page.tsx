'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { DollarSign, Calculator, BarChart3, Calendar } from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth-store';
import { canAccessModule } from '@/lib/rbac';

export default function PayrollLandingPage() {
  const t = useTranslations();
  const { roles } = useAuthStore();
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';

  if (!canAccessModule(roles, 'payroll-processing')) {
    return (
      <div className="min-h-screen bg-cg-light">
        <Header />
        <MobileMenu />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <p className="text-gray-500">{t('common.noData')}</p>
          </main>
        </div>
      </div>
    );
  }

  const links = [
    {
      title: t('payrollSetup.title'),
      description: t('payrollSetup.description'),
      href: `/${locale}/payroll/setup`,
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: t('payrollProcessing.title'),
      description: t('payrollProcessing.description'),
      href: `/${locale}/payroll/processing`,
      icon: <Calculator className="h-6 w-6" />,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: t('govReports.title'),
      description: t('govReports.description'),
      href: `/${locale}/payroll/reports`,
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'text-green-600 bg-green-50',
    },
  ];

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-cg-dark">{t('payroll.title')}</h1>
            <p className="text-gray-500 mt-1">{t('payroll.subtitle')}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">{t('payroll.lastRun')}</p>
                    <p className="font-semibold text-cg-dark">Jan 25, 2026</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">{t('payroll.nextRun')}</p>
                    <p className="font-semibold text-cg-dark">Feb 25, 2026</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calculator className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">{t('payroll.employeesOnPayroll')}</p>
                    <p className="font-semibold text-cg-dark">152</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${link.color}`}>
                      {link.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-base mb-1">{link.title}</CardTitle>
                    <p className="text-sm text-gray-500">{link.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
