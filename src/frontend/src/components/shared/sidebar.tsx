'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  Home,
  User,
  Calendar,
  FileText,
  ClipboardList,
  Clock,
  Settings as SettingsIcon,
  DollarSign,
  Calculator,
  BarChart3,
  Users,
  Building,
  TrendingUp,
  BookOpen,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Timer,
  MapPin,
  UserMinus,
  CheckSquare,
  Award,
  Shield,
  Filter,
  Receipt,
  FileHeart,
} from 'lucide-react';
import { useUIStore } from '@/stores/ui-store';
import { useAuthStore } from '@/stores/auth-store';
import { canAccessModule } from '@/lib/rbac';
import { cn } from '@/lib/utils';

interface MenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  module: string;
}

export function Sidebar() {
  const t = useTranslations();
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { roles } = useAuthStore();

  const currentLocale = pathname.startsWith('/th') ? 'th' : 'en';

  const selfServiceItems: MenuItem[] = [
    { href: '/home', label: t('nav.home'), icon: <Home className="h-5 w-5" />, module: 'home' },
    { href: '/profile', label: t('nav.profile'), icon: <User className="h-5 w-5" />, module: 'profile' },
    { href: '/leave', label: t('leave.title'), icon: <Calendar className="h-5 w-5" />, module: 'leave' },
    { href: '/payslip', label: t('payslip.title'), icon: <FileText className="h-5 w-5" />, module: 'payslip' },
    { href: '/idp', label: t('idp.title'), icon: <BookOpen className="h-5 w-5" />, module: 'idp' },
    { href: '/training-records', label: t('training.title'), icon: <Award className="h-5 w-5" />, module: 'training-records' },
    { href: '/workflows', label: t('nav.workflows'), icon: <ClipboardList className="h-5 w-5" />, module: 'workflows' },
    { href: '/smart-claims', label: t('smartClaims.title'), icon: <Receipt className="h-5 w-5" />, module: 'smart-claims' },
    { href: '/hospital-referral', label: t('nav.hospitalReferral'), icon: <FileHeart size={20} />, module: 'hospital-referral' },
  ];

  const hrAdminItems: MenuItem[] = [
    { href: '/time', label: t('timeManagement.title'), icon: <Clock className="h-5 w-5" />, module: 'time-management' },
    { href: '/overtime', label: t('overtime.title'), icon: <Timer className="h-5 w-5" />, module: 'overtime' },
    { href: '/payroll-setup', label: t('payrollSetup.title'), icon: <DollarSign className="h-5 w-5" />, module: 'payroll-setup' },
    { href: '/payroll-processing', label: t('payroll.title'), icon: <Calculator className="h-5 w-5" />, module: 'payroll-processing' },
    { href: '/government-reports', label: t('govReports.title'), icon: <BarChart3 className="h-5 w-5" />, module: 'government-reports' },
    { href: '/locations', label: t('location.title'), icon: <MapPin className="h-5 w-5" />, module: 'locations' },
    { href: '/settings', label: t('nav.settings'), icon: <SettingsIcon className="h-5 w-5" />, module: 'settings' },
  ];

  const managerItems: MenuItem[] = [
    { href: '/manager-dashboard', label: t('managerDashboard.title'), icon: <Users className="h-5 w-5" />, module: 'manager-dashboard' },
    { href: '/quick-approve', label: 'Quick Approve', icon: <CheckSquare className="h-5 w-5" />, module: 'quick-approve' },
    { href: '/org-chart', label: t('orgChart.title'), icon: <Building className="h-5 w-5" />, module: 'org-chart' },
    { href: '/talent-management', label: t('talent.title'), icon: <TrendingUp className="h-5 w-5" />, module: 'talent-management' },
    { href: '/succession', label: t('succession.title'), icon: <Shield className="h-5 w-5" />, module: 'succession-planning' },
    { href: '/recruitment', label: t('recruitment.title'), icon: <UserPlus className="h-5 w-5" />, module: 'recruitment' },
    { href: '/screening', label: 'Screening', icon: <Filter className="h-5 w-5" />, module: 'candidate-screening' },
    { href: '/onboarding', label: t('onboarding.title'), icon: <CheckSquare className="h-5 w-5" />, module: 'onboarding' },
    { href: '/resignation', label: t('resignation.title'), icon: <UserMinus className="h-5 w-5" />, module: 'resignation' },
  ];

  const renderGroup = (title: string, items: MenuItem[]) => {
    const filtered = items.filter((item) => canAccessModule(roles, item.module));
    if (filtered.length === 0) return null;

    return (
      <div className="mb-4">
        {sidebarOpen && (
          <h3 className="px-4 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
        )}
        <ul className="space-y-0.5">
          {filtered.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <li key={item.href}>
                <a
                  href={`/${currentLocale}${item.href}`}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm',
                    isActive
                      ? 'bg-cg-red/10 text-cg-red font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  {item.icon}
                  {sidebarOpen && <span>{item.label}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col bg-white border-r h-[calc(100vh-56px)] sticky top-14 transition-all duration-200',
        sidebarOpen ? 'w-60' : 'w-16'
      )}
    >
      <div className="flex-1 overflow-y-auto py-4">
        {renderGroup(t('nav.selfService'), selfServiceItems)}
        {renderGroup(t('nav.timePayroll'), hrAdminItems)}
        {renderGroup(t('nav.organization'), managerItems)}
      </div>

      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center py-3 border-t hover:bg-gray-50 transition"
        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )}
      </button>
    </aside>
  );
}
