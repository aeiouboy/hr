'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  Settings,
  ChevronDown,
  User,
  LogOut,
} from 'lucide-react';
import { useUIStore } from '@/stores/ui-store';
import { useAuthStore } from '@/stores/auth-store';
import { isManager, isHR, canAccessModule, type Role } from '@/lib/rbac';

interface NavItem {
  href: string;
  label: string;
  icon?: string;
  module?: string;
}

export function Header() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { toggleMobileMenu } = useUIStore();
  const { username, roles } = useAuthStore();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentLocale = pathname.startsWith('/th') ? 'th' : 'en';

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'th' : 'en';
    const pathWithoutLocale = pathname.replace(/^\/(en|th)/, '');
    router.push(`/${newLocale}${pathWithoutLocale || '/'}`);
  };

  const selfServiceItems: NavItem[] = [
    { href: '/home', label: t('nav.home'), module: 'home' },
    { href: '/leave', label: t('leave.title'), module: 'leave' },
    { href: '/payslip', label: t('payslip.title'), module: 'payslip' },
    { href: '/performance', label: t('performance.title'), module: 'performance' },
    { href: '/profile', label: t('nav.profile'), module: 'profile' },
    { href: '/workflows', label: t('nav.workflows'), module: 'workflows' },
  ];

  const timePayrollItems: NavItem[] = [
    { href: '/time-management', label: t('timeManagement.title'), module: 'time-management' },
    { href: '/payroll-setup', label: t('payrollSetup.title'), module: 'payroll-setup' },
    { href: '/payroll-processing', label: t('payroll.title'), module: 'payroll-processing' },
    { href: '/government-reports', label: t('govReports.title'), module: 'government-reports' },
    { href: '/overtime', label: t('overtime.title'), module: 'overtime' },
  ];

  const organizationItems: NavItem[] = [
    { href: '/org-chart', label: t('orgChart.title'), module: 'org-chart' },
    ...(isHR(roles) ? [{ href: '/positions', label: t('position.title'), module: 'positions' }] : []),
    ...(isManager(roles) ? [{ href: '/manager-dashboard', label: t('managerDashboard.title'), module: 'manager-dashboard' }] : []),
    ...(isHR(roles)
      ? [
          { href: '/transfer-request', label: t('transfer.title'), module: 'transfer-request' },
          { href: '/locations', label: t('location.title'), module: 'locations' },
        ]
      : []),
  ];

  const talentItems: NavItem[] = [
    { href: '/talent-management', label: t('talent.title'), module: 'talent-management' },
    { href: '/learning', label: t('learning.title'), module: 'learning' },
    { href: '/idp', label: t('idp.title'), module: 'idp' },
    { href: '/training-records', label: t('training.title'), module: 'training-records' },
    { href: '/succession-planning', label: t('succession.title'), module: 'succession-planning' },
  ];

  const recruitmentItems: NavItem[] = [
    { href: '/recruitment', label: t('recruitment.title'), module: 'recruitment' },
    { href: '/candidate-screening', label: t('candidateScreening.title'), module: 'candidate-screening' },
    { href: '/onboarding', label: t('onboarding.title'), module: 'onboarding' },
    { href: '/resignation', label: t('resignation.title'), module: 'resignation' },
  ];

  const handleDropdownEnter = (id: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(id);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const renderDropdown = (id: string, label: string, items: NavItem[]) => (
    <div
      className="relative"
      onMouseEnter={() => handleDropdownEnter(id)}
      onMouseLeave={handleDropdownLeave}
    >
      <button
        className="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
        aria-haspopup="true"
        aria-expanded={activeDropdown === id}
      >
        <span className="text-gray-700 text-sm">{label}</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>
      {activeDropdown === id && (
        <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border py-1 z-50">
          {items
            .filter((item) => !item.module || canAccessModule(roles, item.module))
            .map((item) => (
              <a
                key={item.href}
                href={`/${currentLocale}${item.href}`}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"
              >
                {item.label}
              </a>
            ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px]"
            onClick={toggleMobileMenu}
            aria-label={t('accessibility.openMenu')}
          >
            <Menu className="h-5 w-5" />
          </button>

          <a href={`/${currentLocale}/`} className="flex items-center gap-2">
            <div className="text-xl font-bold">
              <span className="text-cg-red">CENTRAL</span>
              <span className="text-gray-800">GROUP</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label={t('accessibility.mainNavigation')}>
            {renderDropdown('self-service', t('nav.selfService'), selfServiceItems)}
            {isHR(roles) && renderDropdown('time-payroll', t('nav.timePayroll'), timePayrollItems)}
            {renderDropdown('organization', t('nav.organization'), organizationItems)}
            {(isManager(roles) || isHR(roles)) &&
              renderDropdown('talent', t('nav.talentDevelopment'), talentItems)}
            {isHR(roles) && renderDropdown('recruitment', t('nav.recruitment'), recruitmentItems)}
          </nav>
        </div>

        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('nav.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cg-info focus:bg-white transition"
              aria-label={t('common.search')}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px]"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label={t('common.search')}
          >
            <Search className="h-5 w-5 text-gray-600" />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px] relative"
            aria-label={t('accessibility.notifications')}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-4 w-4 bg-cg-red text-white text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          <button
            className="hidden sm:block p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px]"
            aria-label={t('nav.help')}
          >
            <HelpCircle className="h-5 w-5 text-gray-600" />
          </button>

          <button
            className="hidden sm:block p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px]"
            aria-label={t('nav.settings')}
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px]"
            onClick={toggleLanguage}
            aria-label={currentLocale === 'th' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
          >
            <span className="text-sm font-medium text-gray-600">
              {currentLocale === 'th' ? 'EN' : 'TH'}
            </span>
          </button>

          <div
            className="relative ml-2"
            onMouseEnter={() => setUserDropdownOpen(true)}
            onMouseLeave={() => setUserDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full min-h-[44px]"
              aria-label={t('accessibility.userMenu')}
              aria-haspopup="true"
              aria-expanded={userDropdownOpen}
            >
              <div className="w-8 h-8 bg-cg-red rounded-full flex items-center justify-center text-white font-medium text-sm">
                {(username || 'U').substring(0, 2).toUpperCase()}
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
            </button>
            {userDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-medium text-gray-900">{username || 'User'}</p>
                  <p className="text-sm text-gray-500">{roles[0] || 'Employee'}</p>
                </div>
                <a
                  href={`/${currentLocale}/profile`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                >
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{t('nav.profile')}</span>
                </a>
                <a
                  href={`/${currentLocale}/settings`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                >
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span>{t('nav.settings')}</span>
                </a>
                <hr className="my-1" />
                <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-red-600">
                  <LogOut className="h-4 w-4" />
                  <span>{t('nav.logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="px-4 pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('nav.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cg-info"
              aria-label={t('common.search')}
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
