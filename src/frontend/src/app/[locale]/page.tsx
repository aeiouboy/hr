'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
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
 const pathname = usePathname();
 const locale = pathname.startsWith('/th') ?'th' :'en';
 const { username, roles } = useAuthStore();

 const quickActions: QuickAction[] = [
 {
 title: t('home.viewMyProfile'),
 description: t('home.viewMyProfileDesc'),
 href:'/profile',
 icon: <User className="h-5 w-5 sm:h-6 sm:w-6" />,
 color:'text-accent bg-accent-tint',
 },
 {
 title: t('leave.title'),
 description: t('leave.request'),
 href:'/leave',
 icon: <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />,
 color:'text-success bg-success-tint',
 },
 {
 title: t('payslip.title'),
 description: t('payslip.viewDetails'),
 href:'/payslip',
 icon: <FileText className="h-5 w-5 sm:h-6 sm:w-6" />,
 color:'text-accent bg-accent-tint',
 },
 {
 title: t('home.viewPendingWorkflows'),
 description: t('home.viewPendingWorkflowsDesc'),
 href:'/workflows',
 icon: <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6" />,
 color:'text-warning bg-warning-tint',
 },
 ];

 const managerActions: QuickAction[] = [
 {
 title: t('home.teamSummary'),
 description: t('home.directReports'),
 href:'/manager-dashboard',
 icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
 color:'text-brand bg-brand-tint',
 },
 ];

 const hrActions: QuickAction[] = [
 {
 title: t('payroll.title'),
 description: t('payroll.subtitle'),
 href:'/payroll-processing',
 icon: <Calculator className="h-5 w-5 sm:h-6 sm:w-6" />,
 color:'text-accent bg-accent-tint',
 },
 ];

 const allActions = [
 ...quickActions,
 ...(isManager(roles) ? managerActions : []),
 ...(isHR(roles) ? hrActions : []),
 ];

 return (
 <div className="min-h-screen bg-canvas">
 <Header />
 <MobileMenu />
 <div className="flex">
 <Sidebar />
 <main className="flex-1 p-4 sm:p-6">
 <div className="mb-4 sm:mb-8">
 <h1 className="text-2xl font-bold text-ink">
 {t('home.welcome')}, {username ||'User'}
 </h1>
 <p className="text-ink-soft mt-1">{t('home.forYouToday')}</p>
 </div>

 <section>
 <h2 className="text-lg font-semibold text-ink mb-4">
 {t('home.quickActions')}
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
 {allActions.map((action) => (
 <a key={action.href} href={`/${locale}${action.href}`}>
 <Card className="hover:shadow-1 transition-shadow cursor-pointer h-full">
 <CardHeader className="pb-3">
 <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center ${action.color}`}>
 {action.icon}
 </div>
 </CardHeader>
 <CardContent>
 <CardTitle className="text-base mb-1">{action.title}</CardTitle>
 <p className="text-sm text-ink-muted hidden sm:block">{action.description}</p>
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
