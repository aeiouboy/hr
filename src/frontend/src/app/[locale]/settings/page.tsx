'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Save, AlertCircle, Check } from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Tabs } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { useSettings } from '@/hooks/use-settings';
import { useAuthStore } from '@/stores/auth-store';
import { isHR } from '@/lib/rbac';
import type { GeneralSettings, CompanySettings, NotificationSettings } from '@/hooks/use-settings';

type TabKey = 'general' | 'company' | 'leavePolicy' | 'payroll' | 'notifications';

interface SaveState {
  saving: boolean;
  saved: boolean;
  error: string | null;
}

export default function SettingsPage() {
  const t = useTranslations('settings');
  const pathname = usePathname();
  const { roles } = useAuthStore();
  const { settings, loading, updateSettings } = useSettings();

  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [saveState, setSaveState] = useState<SaveState>({ saving: false, saved: false, error: null });

  // Local form state (tracks changes before saving)
  const [generalForm, setGeneralForm] = useState<GeneralSettings | null>(null);
  const [companyForm, setCompanyForm] = useState<CompanySettings | null>(null);
  const [notifForm, setNotifForm] = useState<NotificationSettings | null>(null);
  const [paymentCycle, setPaymentCycle] = useState<string | null>(null);
  const [cutOffDay, setCutOffDay] = useState<string | null>(null);
  const [paymentDay, setPaymentDay] = useState<string | null>(null);

  const hrUser = isHR(roles);

  const allTabs = [
    { key: 'general', label: t('general') },
    ...(hrUser ? [{ key: 'company', label: t('company') }] : []),
    ...(hrUser ? [{ key: 'leavePolicy', label: t('leavePolicy') }] : []),
    ...(hrUser ? [{ key: 'payroll', label: t('payroll') }] : []),
    { key: 'notifications', label: t('notifications') },
  ];

  const currentGeneral = generalForm ?? settings.general;
  const currentCompany = companyForm ?? settings.company;
  const currentNotif = notifForm ?? settings.notifications;
  const currentPaymentCycle = paymentCycle ?? settings.payroll.paymentCycle;
  const currentCutOffDay = cutOffDay ?? String(settings.payroll.cutOffDay);
  const currentPaymentDay = paymentDay ?? String(settings.payroll.paymentDay);

  const handleSaveWithFeedback = async (saveFn: () => Promise<void>) => {
    setSaveState({ saving: true, saved: false, error: null });
    try {
      await saveFn();
      setSaveState({ saving: false, saved: true, error: null });
      setTimeout(() => setSaveState((s) => ({ ...s, saved: false })), 3000);
    } catch {
      setSaveState({ saving: false, saved: false, error: 'Failed to save. Please try again.' });
    }
  };

  const handleSaveGeneral = () =>
    handleSaveWithFeedback(async () => {
      await updateSettings('general', currentGeneral);
      setGeneralForm(null);
    });

  const handleSaveCompany = () =>
    handleSaveWithFeedback(async () => {
      await updateSettings('company', currentCompany);
      setCompanyForm(null);
    });

  const handleSaveNotifications = () =>
    handleSaveWithFeedback(async () => {
      await updateSettings('notifications', currentNotif);
      setNotifForm(null);
    });

  const handleSavePayroll = () =>
    handleSaveWithFeedback(async () => {
      await updateSettings('payroll', {
        paymentCycle: currentPaymentCycle as 'monthly' | 'bi_weekly',
        cutOffDay: Number(currentCutOffDay),
        paymentDay: Number(currentPaymentDay),
      });
      setPaymentCycle(null);
      setCutOffDay(null);
      setPaymentDay(null);
    });

  const renderSaveBar = (onSave: () => void) => (
    <div className="flex items-center justify-between mt-6 pt-4 border-t">
      {saveState.error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {saveState.error}
        </p>
      )}
      {saveState.saved && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <Check className="h-4 w-4" />
          {t('saveGeneral').replace('General ', '')} saved successfully
        </p>
      )}
      <div className="ml-auto">
        <Button onClick={onSave} disabled={saveState.saving}>
          {saveState.saving ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {t('saveGeneral')}
            </span>
          )}
        </Button>
      </div>
    </div>
  );

  const renderToggle = (
    label: string,
    description: string,
    checked: boolean,
    onChange: (val: boolean) => void
  ) => (
    <div className="flex items-start justify-between py-3 border-b last:border-b-0">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-cg-red focus:ring-offset-2 ${
          checked ? 'bg-cg-red' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('generalSettings')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label={t('language')}
              name="language"
              type="select"
              value={currentGeneral.language}
              onChange={(val) => setGeneralForm({ ...currentGeneral, language: val })}
              options={[
                { value: 'en', label: 'English' },
                { value: 'th', label: 'ภาษาไทย' },
              ]}
            />
            <FormField
              label={t('dateFormat')}
              name="dateFormat"
              type="select"
              value={currentGeneral.dateFormat}
              onChange={(val) => setGeneralForm({ ...currentGeneral, dateFormat: val })}
              options={[
                { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
              ]}
            />
            <FormField
              label={t('theme')}
              name="theme"
              type="select"
              value={currentGeneral.theme}
              onChange={(val) => setGeneralForm({ ...currentGeneral, theme: val })}
              options={[
                { value: 'light', label: t('themeLight') },
                { value: 'dark', label: t('themeDark') },
                { value: 'system', label: t('themeSystem') },
              ]}
            />
          </div>
          {renderSaveBar(handleSaveGeneral)}
        </CardContent>
      </Card>
    </div>
  );

  const renderCompanyTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('companySettings')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label={t('companyName')}
              name="companyName"
              type="text"
              value={currentCompany.name}
              onChange={(val) => setCompanyForm({ ...currentCompany, name: val })}
              required
            />
            <FormField
              label={`${t('companyName')} (Thai)`}
              name="companyNameTh"
              type="text"
              value={currentCompany.nameTh}
              onChange={(val) => setCompanyForm({ ...currentCompany, nameTh: val })}
            />
            <FormField
              label={t('taxId')}
              name="taxId"
              type="text"
              value={currentCompany.taxId}
              onChange={(val) => setCompanyForm({ ...currentCompany, taxId: val })}
              placeholder="0000000000000"
            />
            <FormField
              label={t('socialSecurityRegNo')}
              name="socialSecurityNo"
              type="text"
              value={currentCompany.socialSecurityNo}
              onChange={(val) => setCompanyForm({ ...currentCompany, socialSecurityNo: val })}
            />
            <div className="md:col-span-2">
              <FormField
                label={t('companyAddress')}
                name="address"
                type="textarea"
                value={currentCompany.address}
                onChange={(val) => setCompanyForm({ ...currentCompany, address: val })}
              />
            </div>
          </div>
          {renderSaveBar(handleSaveCompany)}
        </CardContent>
      </Card>
    </div>
  );

  const renderLeavePolicyTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('leavePolicySettings')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">{t('leaveTypeName')}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">{t('daysPerYear')}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">{t('carryForward')}</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">{t('carryForwardLimit')}</th>
                </tr>
              </thead>
              <tbody>
                {settings.leavePolicies.map((policy) => (
                  <tr key={policy.type} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-800">{policy.nameEn}</p>
                        <p className="text-xs text-gray-500">{policy.nameTh}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {policy.maxDays} days
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          policy.carryForward
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {policy.carryForward ? t('enabled') : t('disabled')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {policy.carryForward ? `${policy.maxCarryDays} days` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-semibold text-amber-800 mb-2">{t('thaiLaborLaw')}</p>
            <ul className="space-y-1 text-xs text-amber-700">
              <li>• {t('laborLawNote1')}</li>
              <li>• {t('laborLawNote2')}</li>
              <li>• {t('laborLawNote3')}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPayrollTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('payrollSettings')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Payment Cycle"
              name="paymentCycle"
              type="select"
              value={currentPaymentCycle}
              onChange={setPaymentCycle}
              options={[
                { value: 'monthly', label: t('monthly') },
                { value: 'bi_weekly', label: 'Bi-weekly' },
              ]}
            />
            <FormField
              label="Cut-off Day"
              name="cutOffDay"
              type="select"
              value={currentCutOffDay}
              onChange={setCutOffDay}
              options={Array.from({ length: 28 }, (_, i) => ({
                value: String(i + 1),
                label: `Day ${i + 1}`,
              }))}
            />
            <FormField
              label="Payment Day"
              name="paymentDay"
              type="select"
              value={currentPaymentDay}
              onChange={setPaymentDay}
              options={Array.from({ length: 28 }, (_, i) => ({
                value: String(i + 1),
                label: `Day ${i + 1}`,
              }))}
            />
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">SSO Rate</p>
              <p className="text-2xl font-bold text-gray-800">{settings.payroll.ssoRate}%</p>
              <p className="text-xs text-gray-500">Employee + Employer contribution</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Provident Fund Rate</p>
              <p className="text-2xl font-bold text-gray-800">{settings.payroll.pfRate}%</p>
              <p className="text-xs text-gray-500">Default employee contribution rate</p>
            </div>
          </div>
          {renderSaveBar(handleSavePayroll)}
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('notificationSettings')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {renderToggle(
              t('emailNotifications'),
              t('enableEmailNotifications'),
              currentNotif.emailEnabled,
              (val) => setNotifForm({ ...currentNotif, emailEnabled: val })
            )}
            {renderToggle(
              t('inAppNotifications'),
              t('enableInAppNotifications'),
              currentNotif.inAppEnabled,
              (val) => setNotifForm({ ...currentNotif, inAppEnabled: val })
            )}
            {renderToggle(
              t('notifType.leaveReminder'),
              'Receive notifications when leave requests are approved or rejected',
              currentNotif.leaveApproval,
              (val) => setNotifForm({ ...currentNotif, leaveApproval: val })
            )}
            {renderToggle(
              t('notifType.payslipAvailable'),
              'Get notified when your payslip is ready to view',
              currentNotif.payslipReady,
              (val) => setNotifForm({ ...currentNotif, payslipReady: val })
            )}
            {renderToggle(
              t('notifType.workflowPending'),
              'Receive updates for workflow approvals and status changes',
              currentNotif.workflowUpdates,
              (val) => setNotifForm({ ...currentNotif, workflowUpdates: val })
            )}
            {renderToggle(
              t('notifType.documentExpiry'),
              'Get reminders when your documents are about to expire',
              currentNotif.documentExpiry,
              (val) => setNotifForm({ ...currentNotif, documentExpiry: val })
            )}
          </div>
          {renderSaveBar(handleSaveNotifications)}
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      );
    }

    switch (activeTab) {
      case 'general':
        return renderGeneralTab();
      case 'company':
        return hrUser ? renderCompanyTab() : null;
      case 'leavePolicy':
        return hrUser ? renderLeavePolicyTab() : null;
      case 'payroll':
        return hrUser ? renderPayrollTab() : null;
      case 'notifications':
        return renderNotificationsTab();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
              <p className="text-gray-500 text-sm mt-1">{t('description')}</p>
            </div>

            {/* Tabs */}
            <Tabs
              tabs={allTabs}
              activeTab={activeTab}
              onTabChange={(key) => {
                setActiveTab(key as TabKey);
                setSaveState({ saving: false, saved: false, error: null });
              }}
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
