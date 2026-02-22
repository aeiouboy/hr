'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  DollarSign,
  MinusCircle,
  Landmark,
  BarChart2,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Tabs } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePayroll } from '@/hooks/use-payroll';
import { formatCurrency } from '@/lib/date';

type TabKey = 'earnings' | 'deductions' | 'tax' | 'banks';

export default function PayrollSetupPage() {
  const t = useTranslations('payrollSetup');
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';
  const [activeTab, setActiveTab] = useState<TabKey>('earnings');

  const { earningTypes, deductionTypes, taxBrackets, banks, loading } = usePayroll();

  const tabs = [
    { key: 'earnings', label: t('tabs.earnings') },
    { key: 'deductions', label: t('tabs.deductions') },
    { key: 'tax', label: t('tabs.tax') },
    { key: 'banks', label: t('tabs.banks') },
  ];

  const categoryLabel: Record<string, string> = {
    salary: 'Salary',
    overtime: 'Overtime',
    allowance: 'Allowance',
    bonus: 'Bonus',
    tax: 'Tax',
    social_security: 'Social Security',
    provident_fund: 'Provident Fund',
    loan: 'Loan',
  };

  const renderEarnings = () => {
    const activeCount = earningTypes.filter((e) => e.isActive).length;
    const taxableCount = earningTypes.filter((e) => e.taxable).length;

    return (
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{t('earnings.totalTypes')}</p>
              <p className="text-3xl font-bold text-cg-dark mt-1">{earningTypes.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{t('earnings.active')}</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{activeCount}</p>
            </CardContent>
          </Card>
          <Card className="col-span-2 sm:col-span-1">
            <CardContent className="pt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{t('earnings.taxable')}</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">{taxableCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">{t('earnings.code')}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">{t('earnings.name')}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Category</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">{t('earnings.taxable')}</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">{t('status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {earningTypes.map((et) => (
                    <tr key={et.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{et.code}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{et.nameEn}</p>
                        <p className="text-xs text-gray-500">{et.nameTh}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-gray-600">{categoryLabel[et.category] ?? et.category}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {et.taxable ? (
                          <CheckCircle2 className="h-4 w-4 text-amber-500 mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={et.isActive ? 'success' : 'neutral'}>
                          {et.isActive ? t('active') : t('inactive')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderDeductions = () => {
    const activeCount = deductionTypes.filter((d) => d.isActive).length;
    const mandatoryCount = deductionTypes.filter((d) => d.mandatory).length;

    return (
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{t('deductions.totalTypes')}</p>
              <p className="text-3xl font-bold text-cg-dark mt-1">{deductionTypes.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{t('deductions.active')}</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{activeCount}</p>
            </CardContent>
          </Card>
          <Card className="col-span-2 sm:col-span-1">
            <CardContent className="pt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{t('deductions.mandatory')}</p>
              <p className="text-3xl font-bold text-cg-red mt-1">{mandatoryCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">{t('deductions.code')}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">{t('deductions.name')}</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Category</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">{t('deductions.mandatory')}</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">{t('status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {deductionTypes.map((dt) => (
                    <tr key={dt.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{dt.code}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{dt.nameEn}</p>
                        <p className="text-xs text-gray-500">{dt.nameTh}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-gray-600">{categoryLabel[dt.category] ?? dt.category}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {dt.mandatory ? (
                          <CheckCircle2 className="h-4 w-4 text-cg-red mx-auto" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={dt.isActive ? 'success' : 'neutral'}>
                          {dt.isActive ? t('active') : t('inactive')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTax = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">{t('tax.title')}</h3>
        <p className="text-sm text-gray-500">{t('tax.progressiveRates')}</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">{t('tax.incomeRange')}</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">{t('tax.rate')}</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {taxBrackets.map((bracket, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-700">
                      {formatCurrency(bracket.min, 'THB')}
                      {' – '}
                      {bracket.max !== null ? formatCurrency(bracket.max, 'THB') : <span className="font-medium">{t('tax.andAbove')}</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Badge variant={bracket.rate === 0 ? 'success' : bracket.rate >= 30 ? 'error' : bracket.rate >= 20 ? 'warning' : 'info'}>
                        {bracket.rate}%
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{bracket.descriptionEn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* SSO info card */}
      <Card>
        <CardContent className="pt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Social Security (SSO)</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">{t('tax.employeeRate')}</p>
              <p className="font-semibold text-gray-900 mt-1">5%</p>
            </div>
            <div>
              <p className="text-gray-500">{t('tax.employerRate')}</p>
              <p className="font-semibold text-gray-900 mt-1">5%</p>
            </div>
            <div>
              <p className="text-gray-500">{t('tax.maxWage')}</p>
              <p className="font-semibold text-gray-900 mt-1">{formatCurrency(15000, 'THB')}</p>
            </div>
            <div>
              <p className="text-gray-500">{t('tax.maxContribution')}</p>
              <p className="font-semibold text-gray-900 mt-1">{formatCurrency(750, 'THB')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBanks = () => {
    const activeCount = banks.filter((b) => b.isActive).length;

    return (
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{t('banks.totalBanks')}</p>
              <p className="text-3xl font-bold text-cg-dark mt-1">{banks.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{t('banks.active')}</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{activeCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Code</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Bank Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">SWIFT</th>
                    <th className="text-center px-4 py-3 font-semibold text-gray-600">{t('status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {banks.map((bank) => (
                    <tr key={bank.code} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{bank.code}</span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{bank.nameEn}</p>
                        <p className="text-xs text-gray-500">{bank.nameTh}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="font-mono text-xs text-gray-600">{bank.swiftCode}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={bank.isActive ? 'success' : 'neutral'}>
                          {bank.isActive ? t('active') : t('inactive')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">{t('banks.bankListDesc')}</p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cg-red" />
        </div>
      );
    }
    switch (activeTab) {
      case 'earnings':
        return renderEarnings();
      case 'deductions':
        return renderDeductions();
      case 'tax':
        return renderTax();
      case 'banks':
        return renderBanks();
      default:
        return null;
    }
  };

  const tabIcons: Record<TabKey, React.ReactNode> = {
    earnings: <DollarSign className="h-4 w-4" />,
    deductions: <MinusCircle className="h-4 w-4" />,
    tax: <BarChart2 className="h-4 w-4" />,
    banks: <Landmark className="h-4 w-4" />,
  };

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-5xl mx-auto">
            {/* Page header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
              <p className="text-gray-500 mt-1 text-sm">{t('subtitle')}</p>
            </div>

            {/* Tabs */}
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={(key) => setActiveTab(key as TabKey)}
              className="mb-6"
            />

            {/* Tab content */}
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
