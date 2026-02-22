'use client';

import { useTranslations } from 'next-intl';
import {
  User,
  Calendar,
  FileText,
  ClipboardList,
  Users,
  Calculator,
} from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth-store';
import { isManager, isHR } from '@/lib/rbac';

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

export default function HomePage() {
  const t = useTranslations();
  const { username, roles } = useAuthStore();

  const quickActions: QuickAction[] = [
    {
      title: t('home.viewMyProfile'),
      description: t('home.viewMyProfileDesc'),
      href: '/profile',
      icon: <User className="h-6 w-6" />,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: t('leave.title'),
      description: t('leave.request'),
      href: '/leave',
      icon: <Calendar className="h-6 w-6" />,
      color: 'text-green-600 bg-green-50',
    },
    {
      title: t('payslip.title'),
      description: t('payslip.viewDetails'),
      href: '/payslip',
      icon: <FileText className="h-6 w-6" />,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: t('home.viewPendingWorkflows'),
      description: t('home.viewPendingWorkflowsDesc'),
      href: '/workflows',
      icon: <ClipboardList className="h-6 w-6" />,
      color: 'text-orange-600 bg-orange-50',
    },
  ];

  const managerActions: QuickAction[] = [
    {
      title: t('home.teamSummary'),
      description: t('home.directReports'),
      href: '/manager-dashboard',
      icon: <Users className="h-6 w-6" />,
      color: 'text-cg-red bg-red-50',
    },
  ];

  const hrActions: QuickAction[] = [
    {
      title: t('payroll.title'),
      description: t('payroll.subtitle'),
      href: '/payroll-processing',
      icon: <Calculator className="h-6 w-6" />,
      color: 'text-indigo-600 bg-indigo-50',
    },
  ];

  const allActions = [
    ...quickActions,
    ...(isManager(roles) ? managerActions : []),
    ...(isHR(roles) ? hrActions : []),
  ];

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-cg-dark">
              {t('home.welcome')}, {username || 'User'}
            </h1>
            <p className="text-gray-500 mt-1">{t('home.forYouToday')}</p>
          </div>

          <section>
            <h2 className="text-lg font-semibold text-cg-dark mb-4">
              {t('home.quickActions')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allActions.map((action) => (
                <a key={action.href} href={action.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                        {action.icon}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-base mb-1">{action.title}</CardTitle>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
