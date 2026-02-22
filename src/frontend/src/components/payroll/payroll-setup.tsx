'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { DollarSign, Building, Landmark } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { usePayroll } from '@/hooks/use-payroll';
import { useAuthStore } from '@/stores/auth-store';
import { canAccessModule } from '@/lib/rbac';

export function PayrollSetup() {
  const t = useTranslations();
  const { toast } = useToast();
  const { roles } = useAuthStore();
  const { config, taxBrackets, loading, updateConfig } = usePayroll();
  const [saving, setSaving] = useState(false);

  const [payPeriod, setPayPeriod] = useState(config.payPeriod);
  const [paymentDay, setPaymentDay] = useState(String(config.paymentDay));
  const [ssoRate, setSsoRate] = useState(String(config.ssoRate));
  const [pfRate, setPfRate] = useState(String(config.pfDefaultRate));

  if (!canAccessModule(roles, 'payroll-setup')) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('common.noData')}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateConfig({
        payPeriod: payPeriod as 'monthly' | 'bi_weekly',
        paymentDay: Number(paymentDay),
        ssoRate: Number(ssoRate),
        pfDefaultRate: Number(pfRate),
      });
      toast('success', t('payrollSetup.saved'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pay Period Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-cg-red" />
            <CardTitle>{t('payrollSetup.payPeriod')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label={t('payrollSetup.payPeriodType')}
              name="payPeriod"
              type="select"
              value={payPeriod}
              onChange={(v) => setPayPeriod(v as 'monthly' | 'bi_weekly')}
              options={[
                { value: 'monthly', label: t('payrollSetup.monthly') },
                { value: 'bi_weekly', label: t('payrollSetup.biWeekly') },
              ]}
            />
            <FormField
              label={t('payrollSetup.paymentDay')}
              name="paymentDay"
              type="text"
              value={paymentDay}
              onChange={setPaymentDay}
              placeholder="25"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contribution Rates */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-cg-red" />
            <CardTitle>{t('payrollSetup.contributionRates')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label={`${t('payrollSetup.ssoRate')} (%)`}
              name="ssoRate"
              type="text"
              value={ssoRate}
              onChange={setSsoRate}
            />
            <FormField
              label={`${t('payrollSetup.pfRate')} (%)`}
              name="pfRate"
              type="text"
              value={pfRate}
              onChange={setPfRate}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {t('payrollSetup.ssoMaxBase')}: {config.ssoMaxBase.toLocaleString()} THB
          </p>
        </CardContent>
      </Card>

      {/* Tax Brackets (Read-only) */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-cg-red" />
            <CardTitle>{t('payrollSetup.taxBrackets')}</CardTitle>
            <Badge variant="info">{t('payrollSetup.readOnly')}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-3">{t('payrollSetup.thaiPIT2026')}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium text-gray-500">{t('payrollSetup.incomeRange')}</th>
                  <th className="text-right py-2 px-3 font-medium text-gray-500">{t('payrollSetup.taxRate')}</th>
                </tr>
              </thead>
              <tbody>
                {taxBrackets.map((b, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 px-3">
                      {b.min.toLocaleString()} — {b.max ? b.max.toLocaleString() : '∞'} THB
                    </td>
                    <td className="py-2 px-3 text-right font-medium">{b.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bank Transfer */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-cg-red" />
            <CardTitle>{t('payrollSetup.bankTransfer')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge variant={config.bankTransferEnabled ? 'success' : 'neutral'}>
              {config.bankTransferEnabled ? t('payrollSetup.enabled') : t('payrollSetup.disabled')}
            </Badge>
            <span className="text-sm text-gray-500">
              {t('payrollSetup.defaultBank')}: {config.defaultBank}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? t('common.loading') : t('common.save')}
        </Button>
      </div>
    </div>
  );
}
