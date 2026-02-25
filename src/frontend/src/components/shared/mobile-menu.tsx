'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  X,
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
  Timer,
  MapPin,
  UserMinus,
  CheckSquare,
  Award,
  Shield,
  Filter,
  Receipt,
  FileHeart,
  LogOut,
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

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export function MobileMenu() {
  const t = useTranslations();
  const pathname = usePathname();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { username, roles, clearUser } = useAuthStore();

  const currentLocale = pathname.startsWith('/th') ? 'th' : 'en';

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const selfServiceItems: MenuItem[] = [
    { href: '/home', label: t('nav.home'), icon: <Home className="h-5 w-5" />, module: 'home' },
    { href: '/profile', label: t('nav.profile'), icon: <User className="h-5 w-5" />, module: 'profile' },
    { href: '/leave', label: t('leave.title'), icon: <Calendar className="h-5 w-5" />, module: 'leave' },
    { href: '/payslip', label: t('payslip.title'), icon: <FileText className="h-5 w-5" />, module: 'payslip' },
    { href: '/idp', label: t('idp.title'), icon: <BookOpen className="h-5 w-5" />, module: 'idp' },
    { href: '/training-records', label: t('training.title'), icon: <Award className="h-5 w-5" />, module: 'training-records' },
    { href: '/workflows', label: t('nav.workflows'), icon: <ClipboardList className="h-5 w-5" />, module: 'workflows' },
    { href: '/smart-claims', label: t('smartClaims.title'), icon: <Receipt className="h-5 w-5" />, module: 'smart-claims' },
    { href: '/hospital-referral', label: t('nav.hospitalReferral'), icon: <FileHeart className="h-5 w-5" />, module: 'hospital-referral' },
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

  const groups: MenuGroup[] = [
    { title: t('nav.selfService'), items: selfServiceItems },
    { title: t('nav.timePayroll'), items: hrAdminItems },
    { title: t('nav.organization'), items: managerItems },
  ];

  const userInitials = username ? username.slice(0, 2).toUpperCase() : '??';

  if (!mobileMenuOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-50 lg:hidden flex flex-col"
        aria-label={t('accessibility.mainNavigation')}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-lg font-bold">
            <span className="text-cg-red">CENTRAL</span>
            <span className="text-gray-800">GROUP</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px]"
            aria-label={t('accessibility.closeMenu')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-3 border-b bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cg-red rounded-full flex items-center justify-center text-white font-medium">
              {userInitials}
            </div>
            <div>
              <p className="font-medium text-gray-900">{username}</p>
              <p className="text-xs text-gray-500">{roles[0]}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {groups.map((group) => {
            const filtered = group.items.filter((item) => canAccessModule(roles, item.module));
            if (filtered.length === 0) return null;

            return (
              <div key={group.title}>
                <h3 className="px-4 pt-4 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {group.title}
                </h3>
                <ul>
                  {filtered.map((item) => {
                    const isActive = pathname.includes(item.href);
                    return (
                      <li key={item.href}>
                        <a
                          href={`/${currentLocale}${item.href}`}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 transition text-sm',
                            isActive
                              ? 'bg-cg-red/10 text-cg-red font-medium border-r-2 border-cg-red'
                              : 'text-gray-600 hover:bg-gray-50'
                          )}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="border-t mt-2 pt-2 pb-4">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              clearUser();
            }}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 transition text-sm"
          >
            <LogOut className="h-5 w-5" />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </nav>
    </>
  );
}
