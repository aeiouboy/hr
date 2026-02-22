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
  Flag,
  ClipboardList,
  Clock,
  Settings,
  DollarSign,
  Calculator,
  Users,
  Building,
  GraduationCap,
  TrendingUp,
  UserPlus,
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

export function MobileMenu() {
  const t = useTranslations();
  const pathname = usePathname();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const { roles } = useAuthStore();

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

  const allItems: MenuItem[] = [
    { href: '/home', label: t('nav.home'), icon: <Home className="h-5 w-5" />, module: 'home' },
    { href: '/profile', label: t('nav.profile'), icon: <User className="h-5 w-5" />, module: 'profile' },
    { href: '/leave', label: t('leave.title'), icon: <Calendar className="h-5 w-5" />, module: 'leave' },
    { href: '/payslip', label: t('payslip.title'), icon: <FileText className="h-5 w-5" />, module: 'payslip' },
    { href: '/performance', label: t('performance.title'), icon: <Flag className="h-5 w-5" />, module: 'performance' },
    { href: '/workflows', label: t('nav.workflows'), icon: <ClipboardList className="h-5 w-5" />, module: 'workflows' },
    { href: '/time-management', label: t('timeManagement.title'), icon: <Clock className="h-5 w-5" />, module: 'time-management' },
    { href: '/payroll-setup', label: t('payrollSetup.title'), icon: <DollarSign className="h-5 w-5" />, module: 'payroll-setup' },
    { href: '/payroll-processing', label: t('payroll.title'), icon: <Calculator className="h-5 w-5" />, module: 'payroll-processing' },
    { href: '/manager-dashboard', label: t('managerDashboard.title'), icon: <Users className="h-5 w-5" />, module: 'manager-dashboard' },
    { href: '/org-chart', label: t('orgChart.title'), icon: <Building className="h-5 w-5" />, module: 'org-chart' },
    { href: '/talent-management', label: t('talent.title'), icon: <TrendingUp className="h-5 w-5" />, module: 'talent-management' },
    { href: '/learning', label: t('learning.title'), icon: <GraduationCap className="h-5 w-5" />, module: 'learning' },
    { href: '/recruitment', label: t('recruitment.title'), icon: <UserPlus className="h-5 w-5" />, module: 'recruitment' },
    { href: '/settings', label: t('nav.settings'), icon: <Settings className="h-5 w-5" />, module: 'settings' },
  ];

  const filteredItems = allItems.filter((item) => canAccessModule(roles, item.module));

  if (!mobileMenuOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
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

        <ul className="py-2">
          {filteredItems.map((item) => {
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
      </nav>
    </>
  );
}
