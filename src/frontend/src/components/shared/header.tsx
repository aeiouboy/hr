'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
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
  Keyboard,
  Mail,
  BookOpen,
  CheckCircle,
  FileText,
  ClipboardList,
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

interface SearchableItem {
  label: string;
  href: string;
}

interface Notification {
  id: number;
  title: string;
  time: string;
  read: boolean;
  icon: React.ReactNode;
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

  // New state for interactive features
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const currentLocale = pathname.startsWith('/th') ? 'th' : 'en';

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'th' : 'en';
    const pathWithoutLocale = pathname.replace(/^\/(en|th)/, '');
    router.push(`/${newLocale}${pathWithoutLocale || '/'}`);
  };

  // Mock notifications
  const notifications: Notification[] = [
    {
      id: 1,
      title: 'Leave request approved',
      time: '2 hours ago',
      read: false,
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      id: 2,
      title: 'New payslip available',
      time: '1 day ago',
      read: false,
      icon: <FileText className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      title: 'Performance review reminder',
      time: '3 days ago',
      read: true,
      icon: <ClipboardList className="h-4 w-4 text-orange-500" />,
    },
  ];

  // Searchable pages
  const searchablePages: SearchableItem[] = useMemo(() => [
    { label: 'Home', href: `/${currentLocale}/home` },
    { label: 'Profile', href: `/${currentLocale}/profile` },
    { label: 'Leave Management', href: `/${currentLocale}/leave` },
    { label: 'Payslip', href: `/${currentLocale}/payslip` },
    { label: 'Workflows', href: `/${currentLocale}/workflows` },
    { label: 'Organization Chart', href: `/${currentLocale}/org-chart` },
    { label: 'Settings', href: `/${currentLocale}/settings` },
    { label: 'Time Management', href: `/${currentLocale}/time-management` },
    { label: 'Payroll', href: `/${currentLocale}/payroll-processing` },
    { label: 'Recruitment', href: `/${currentLocale}/recruitment` },
    { label: 'Training Records', href: `/${currentLocale}/training-records` },
    { label: 'Onboarding', href: `/${currentLocale}/onboarding` },
  ], [currentLocale]);

  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return searchablePages.filter((p) => p.label.toLowerCase().includes(q));
  }, [searchQuery, searchablePages]);

  const selfServiceItems: NavItem[] = [
    { href: '/home', label: t('nav.home'), module: 'home' },
    { href: '/leave', label: t('leave.title'), module: 'leave' },
    { href: '/payslip', label: t('payslip.title'), module: 'payslip' },
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(target)) {
        setHelpOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchResultsOpen(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(target)) {
        setSearchResultsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setSearchResultsOpen(value.trim().length > 0);
  };

  const handleSearchSelect = (href: string) => {
    setSearchQuery('');
    setSearchResultsOpen(false);
    setMobileSearchOpen(false);
    router.push(href);
  };

  const handleLogout = () => {
    setLogoutConfirmOpen(false);
    setUserDropdownOpen(false);
    router.push('/');
  };

  const handleSettingsClick = () => {
    router.push(`/${currentLocale}/settings`);
  };

  const renderSearchResults = () => {
    if (!searchResultsOpen || filteredSearchResults.length === 0) return null;
    return (
      <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border py-1 z-50 max-h-64 overflow-y-auto">
        {filteredSearchResults.map((item) => (
          <button
            key={item.href}
            className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
            onClick={() => handleSearchSelect(item.href)}
          >
            <Search className="h-3 w-3 text-gray-400" />
            {item.label}
          </button>
        ))}
      </div>
    );
  };

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
    <>
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

          {/* Desktop Search */}
          <div className="flex-1 max-w-xl mx-4 hidden md:block" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('nav.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cg-info focus:bg-white transition"
                aria-label={t('common.search')}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => {
                  if (searchQuery.trim()) setSearchResultsOpen(true);
                }}
              />
              {renderSearchResults()}
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

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                className="p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px] relative"
                aria-label={t('accessibility.notifications')}
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setHelpOpen(false);
                }}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-4 w-4 bg-cg-red text-white text-[10px] rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-lg shadow-lg border py-1 z-50">
                  <div className="px-4 py-2 border-b flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm">Notifications</p>
                    <button
                      className="text-xs text-cg-info hover:underline"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      Mark all as read
                    </button>
                  </div>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                        !n.read ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <div className="mt-0.5">{n.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && (
                        <div className="mt-1.5 h-2 w-2 bg-cg-info rounded-full flex-shrink-0" />
                      )}
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t">
                    <button
                      className="w-full text-center text-sm text-cg-info hover:underline"
                      onClick={() => {
                        setNotificationsOpen(false);
                        router.push(`/${currentLocale}/workflows`);
                      }}
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Help */}
            <div className="relative hidden sm:block" ref={helpRef}>
              <button
                className="p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px]"
                aria-label={t('nav.help')}
                onClick={() => {
                  setHelpOpen(!helpOpen);
                  setNotificationsOpen(false);
                }}
              >
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </button>
              {helpOpen && (
                <div className="absolute right-0 top-full mt-1 w-72 bg-white rounded-lg shadow-lg border py-1 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="font-medium text-gray-900 text-sm">Help & Support</p>
                  </div>
                  <div className="px-4 py-3 space-y-3">
                    <div className="flex items-start gap-3">
                      <Keyboard className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Keyboard Shortcuts</p>
                        <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                          <p><kbd className="px-1 py-0.5 bg-gray-100 rounded text-[10px]">Ctrl+K</kbd> Quick search</p>
                          <p><kbd className="px-1 py-0.5 bg-gray-100 rounded text-[10px]">Ctrl+/</kbd> Show shortcuts</p>
                          <p><kbd className="px-1 py-0.5 bg-gray-100 rounded text-[10px]">Esc</kbd> Close dialogs</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Contact Support</p>
                        <p className="text-xs text-gray-500 mt-0.5">hr-support@centralgroup.com</p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Documentation</p>
                        <a
                          href="#"
                          className="text-xs text-cg-info hover:underline mt-0.5 block"
                          onClick={(e) => {
                            e.preventDefault();
                            setHelpOpen(false);
                          }}
                        >
                          View user guide
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button
              className="hidden sm:block p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px]"
              aria-label={t('nav.settings')}
              onClick={handleSettingsClick}
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

            {/* User dropdown */}
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
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-red-600"
                    onClick={() => {
                      setLogoutConfirmOpen(true);
                      setUserDropdownOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {mobileSearchOpen && (
          <div className="px-4 pb-3 md:hidden" ref={mobileSearchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('nav.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cg-info"
                aria-label={t('common.search')}
                autoFocus
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              {renderSearchResults()}
            </div>
          </div>
        )}
      </header>

      {/* Logout confirmation dialog */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <LogOut className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to log out? You will need to sign in again to access the system.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setLogoutConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
