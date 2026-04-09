'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Building, Calendar, DollarSign, Bell, Shield, Palette } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { useAuthStore } from '@/stores/auth-store';
import { isHR, getHighestRole } from '@/lib/rbac';
import { cn } from '@/lib/utils';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
 return (
 <button
 type="button"
 role="switch"
 aria-checked={checked}
 onClick={() => onChange(!checked)}
 className={cn(
 'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
 checked ? 'bg-accent' : 'bg-hairline'
 )}
 >
 <span
 className={cn(
 'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200',
 checked ? 'translate-x-[18px]' : 'translate-x-0.5'
 )}
 />
 </button>
 );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
 return (
 <div className="space-y-3">
 <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">{label}</p>
 {children}
 </div>
 );
}

export function SettingsPage() {
 const t = useTranslations();
 const { toast } = useToast();
 const { roles } = useAuthStore();
 const { settings, loading, updateSettings } = useSettings();
 const { theme, setTheme } = useTheme();
 const highestRole = getHighestRole(roles);
 const isHRUser = isHR(roles);
 const isHRManager = highestRole === 'hr_manager';

 const availableTabs = [
 ...(isHRUser ? [{ key: 'company', label: t('settings.company') }] : []),
 ...(isHRManager ? [{ key: 'leave', label: t('settings.leavePolicies') }] : []),
 ...(isHRManager ? [{ key: 'payroll', label: t('settings.payrollSettings') }] : []),
 { key: 'appearance', label: t('settings.theme') },
 { key: 'notifications', label: t('settings.notifications') },
 ...(isHRManager ? [{ key: 'system', label: t('settings.system') }] : []),
 ];

 const [activeTab, setActiveTab] = useState(availableTabs[0]?.key || 'notifications');

 if (loading) {
 return (
 <div className="space-y-6">
 <Skeleton className="h-10 w-full" />
 <Skeleton className="h-64 w-full" />
 </div>
 );
 }

 const handleSave = async (section: string) => {
 const sectionMap: Record<string, keyof typeof settings> = {
 company: 'company',
 payroll: 'payroll',
 notifications: 'notifications',
 system: 'general',
 };
 const key = sectionMap[section];
 if (key) {
 await updateSettings(key, settings[key] as never);
 }
 toast('success', t('settings.saved'));
 };

 return (
 <div className="space-y-6">
 <Tabs tabs={availableTabs} activeTab={activeTab} onTabChange={setActiveTab} />

 {/* Company Info */}
 {activeTab === 'company' && (
 <Card>
 <CardHeader>
 <div className="flex items-center gap-2">
 <Building className="h-5 w-5 text-accent" />
 <CardTitle>{t('settings.companyInfo')}</CardTitle>
 </div>
 </CardHeader>
 <CardContent className="space-y-6">
 <FieldGroup label="Identity">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <FormField
 label={t('settings.companyName')}
 name="companyName"
 value={settings.company.name}
 onChange={(v) => updateSettings('company', { name: v })}
 />
 <FormField
 label={t('settings.companyNameTh')}
 name="companyNameTh"
 value={settings.company.nameTh}
 onChange={(v) => updateSettings('company', { nameTh: v })}
 />
 <FormField
 label={t('settings.taxId')}
 name="taxId"
 value={settings.company.taxId}
 onChange={(v) => updateSettings('company', { taxId: v })}
 />
 <FormField
 label={t('settings.ssoNumber')}
 name="ssoNumber"
 value={settings.company.socialSecurityNo}
 onChange={(v) => updateSettings('company', { socialSecurityNo: v })}
 />
 </div>
 </FieldGroup>
 <FieldGroup label="Location">
 <FormField
 label={t('settings.address')}
 name="address"
 type="textarea"
 value={settings.company.address}
 onChange={(v) => updateSettings('company', { address: v })}
 />
 </FieldGroup>
 <div className="flex justify-end">
 <Button variant="accent" onClick={() => handleSave('company')}>{t('common.save')}</Button>
 </div>
 </CardContent>
 </Card>
 )}

 {/* Leave Policies */}
 {activeTab === 'leave' && (
 <Card>
 <CardHeader>
 <div className="flex items-center gap-2">
 <Calendar className="h-5 w-5 text-accent" />
 <CardTitle>{t('settings.leavePolicies')}</CardTitle>
 </div>
 </CardHeader>
 <CardContent>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-hairline bg-surface-raised">
 <th className="text-left py-2 px-3 font-medium text-ink-muted">{t('settings.leaveType')}</th>
 <th className="text-right py-2 px-3 font-medium text-ink-muted">{t('settings.maxDays')}</th>
 <th className="text-center py-2 px-3 font-medium text-ink-muted">{t('settings.carryForward')}</th>
 <th className="text-right py-2 px-3 font-medium text-ink-muted">{t('settings.maxCarryDays')}</th>
 </tr>
 </thead>
 <tbody>
 {settings.leavePolicies.map((policy) => (
 <tr key={policy.type} className="hover:bg-surface-raised/50 transition-colors">
 <td className="py-2.5 px-3 font-medium">{policy.nameEn}</td>
 <td className="py-2.5 px-3 text-right">{policy.maxDays}</td>
 <td className="py-2.5 px-3 text-center">
 <Badge variant={policy.carryForward ? 'success' : 'neutral'}>
 {policy.carryForward ? t('common.yes') : t('common.no')}
 </Badge>
 </td>
 <td className="py-2.5 px-3 text-right">{policy.maxCarryDays}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </CardContent>
 </Card>
 )}

 {/* Payroll Settings */}
 {activeTab === 'payroll' && (
 <Card>
 <CardHeader>
 <div className="flex items-center gap-2">
 <DollarSign className="h-5 w-5 text-accent" />
 <CardTitle>{t('settings.payrollSettings')}</CardTitle>
 </div>
 </CardHeader>
 <CardContent className="space-y-6">
 <FieldGroup label="Schedule">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <FormField
 label={t('settings.paymentCycle')}
 name="paymentCycle"
 type="select"
 value={settings.payroll.paymentCycle}
 onChange={(v) => updateSettings('payroll', { paymentCycle: v as 'monthly' | 'bi_weekly' })}
 options={[
 { value: 'monthly', label: t('payrollSetup.monthly') },
 { value: 'bi_weekly', label: t('payrollSetup.biWeekly') },
 ]}
 />
 <FormField
 label={t('settings.paymentDay')}
 name="paymentDay"
 value={String(settings.payroll.paymentDay)}
 onChange={(v) => updateSettings('payroll', { paymentDay: Number(v) })}
 />
 </div>
 </FieldGroup>
 <FieldGroup label="Deductions">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <FormField
 label={`${t('payrollSetup.ssoRate')} (%)`}
 name="ssoRate"
 value={String(settings.payroll.ssoRate)}
 onChange={(v) => updateSettings('payroll', { ssoRate: Number(v) })}
 />
 <FormField
 label={`${t('payrollSetup.pfRate')} (%)`}
 name="pfRate"
 value={String(settings.payroll.pfRate)}
 onChange={(v) => updateSettings('payroll', { pfRate: Number(v) })}
 />
 </div>
 </FieldGroup>
 <div className="flex justify-end">
 <Button variant="accent" onClick={() => handleSave('payroll')}>{t('common.save')}</Button>
 </div>
 </CardContent>
 </Card>
 )}

 {/* Appearance / Theme */}
 {activeTab === 'appearance' && (
 <Card>
 <CardHeader>
 <div className="flex items-center gap-2">
 <Palette className="h-5 w-5 text-accent" />
 <CardTitle>{t('settings.theme')}</CardTitle>
 </div>
 </CardHeader>
 <CardContent>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <FormField
 label={t('settings.theme')}
 name="theme"
 type="select"
 value={theme}
 onChange={(v) => setTheme(v as 'light' | 'dark' | 'system')}
 options={[
 { value: 'light', label: t('settings.themeLight') },
 { value: 'dark', label: t('settings.themeDark') },
 { value: 'system', label: t('settings.themeSystem') },
 ]}
 />
 </div>
 </CardContent>
 </Card>
 )}

 {/* Notifications */}
 {activeTab === 'notifications' && (
 <Card>
 <CardHeader>
 <div className="flex items-center gap-2">
 <Bell className="h-5 w-5 text-accent" />
 <CardTitle>{t('settings.notifications')}</CardTitle>
 </div>
 </CardHeader>
 <CardContent className="space-y-6">
 <FieldGroup label="Channels">
 <div className="space-y-1">
 {[
 { key: 'emailEnabled', label: t('settings.emailNotifications') },
 { key: 'inAppEnabled', label: t('settings.inAppNotifications') },
 ].map((item) => (
 <div key={item.key} className="flex items-center justify-between py-2.5 px-1">
 <span className="text-sm font-medium text-ink-soft">{item.label}</span>
 <Toggle
 checked={settings.notifications[item.key as keyof typeof settings.notifications]}
 onChange={(v) => updateSettings('notifications', { [item.key]: v })}
 />
 </div>
 ))}
 </div>
 </FieldGroup>
 <FieldGroup label="Events">
 <div className="space-y-1">
 {[
 { key: 'leaveApproval', label: t('settings.leaveApprovalNotif') },
 { key: 'payslipReady', label: t('settings.payslipNotif') },
 { key: 'workflowUpdates', label: t('settings.workflowNotif') },
 { key: 'documentExpiry', label: t('settings.documentExpiryNotif') },
 ].map((item) => (
 <div key={item.key} className="flex items-center justify-between py-2.5 px-1">
 <span className="text-sm font-medium text-ink-soft">{item.label}</span>
 <Toggle
 checked={settings.notifications[item.key as keyof typeof settings.notifications]}
 onChange={(v) => updateSettings('notifications', { [item.key]: v })}
 />
 </div>
 ))}
 </div>
 </FieldGroup>
 <div className="flex justify-end">
 <Button variant="accent" onClick={() => handleSave('notifications')}>{t('common.save')}</Button>
 </div>
 </CardContent>
 </Card>
 )}

 {/* System */}
 {activeTab === 'system' && (
 <Card>
 <CardHeader>
 <div className="flex items-center gap-2">
 <Shield className="h-5 w-5 text-accent" />
 <CardTitle>{t('settings.system')}</CardTitle>
 </div>
 </CardHeader>
 <CardContent className="space-y-6">
 <p className="text-sm text-ink-muted">{t('settings.systemDesc')}</p>
 <FieldGroup label="Display">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <FormField
 label={t('settings.language')}
 name="language"
 type="select"
 value={settings.general.language}
 onChange={(v) => updateSettings('general', { language: v })}
 options={[
 { value: 'en', label: 'English' },
 { value: 'th', label: 'ภาษาไทย' },
 ]}
 />
 <FormField
 label={t('settings.dateFormat')}
 name="dateFormat"
 type="select"
 value={settings.general.dateFormat}
 onChange={(v) => updateSettings('general', { dateFormat: v })}
 options={[
 { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
 { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
 { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
 ]}
 />
 </div>
 </FieldGroup>
 <div className="flex justify-end">
 <Button variant="accent" onClick={() => handleSave('system')}>{t('common.save')}</Button>
 </div>
 </CardContent>
 </Card>
 )}
 </div>
 );
}
