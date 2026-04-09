'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/shared/page-shell';
import { Tabs } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth-store';
import { isHR } from '@/lib/rbac';
import { RjsfForm } from '@/components/permissions/rjsf-form';
import {
  SCHEMA_REGISTRY,
  type SchemaKey,
} from '@/components/permissions/permission-schemas';

export default function PermissionsPage() {
  const t = useTranslations('permissions');
  const router = useRouter();
  const { roles } = useAuthStore();
  const hrUser = isHR(roles);

  // RBAC: only HR roles can view. Non-HR → bounce to home.
  useEffect(() => {
    if (!hrUser) {
      router.replace('/home');
    }
  }, [hrUser, router]);

  const [activeKey, setActiveKey] = useState<SchemaKey>('simple');
  const [formDataByKey, setFormDataByKey] = useState<
    Record<SchemaKey, Record<string, unknown>>
  >(() => ({
    simple: { ...SCHEMA_REGISTRY.simple.initialData },
    matrix: { ...SCHEMA_REGISTRY.matrix.initialData },
    conditional: { ...SCHEMA_REGISTRY.conditional.initialData },
  }));

  const tabs = useMemo(
    () =>
      (Object.keys(SCHEMA_REGISTRY) as SchemaKey[]).map((key) => ({
        key,
        label: SCHEMA_REGISTRY[key].label,
      })),
    []
  );

  const active = SCHEMA_REGISTRY[activeKey];
  const activeData = formDataByKey[activeKey];

  const handleChange = (data: unknown) => {
    setFormDataByKey((prev) => ({
      ...prev,
      [activeKey]: (data as Record<string, unknown>) ?? {},
    }));
  };

  const handleReset = () => {
    setFormDataByKey((prev) => ({
      ...prev,
      [activeKey]: { ...SCHEMA_REGISTRY[activeKey].initialData },
    }));
  };

  if (!hrUser) {
    return null;
  }

  return (
    <PageShell
      title={t('title')}
      description={t('description')}
      actions={
        <button
          type="button"
          onClick={handleReset}
          className="text-sm px-3 py-1.5 border border-hairline rounded-md text-ink-soft hover:text-brand hover:border-brand transition-colors"
        >
          Reset to sample
        </button>
      }
    >
      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeKey}
        onTabChange={(key) => setActiveKey(key as SchemaKey)}
        className="mb-4"
      />

      {/* 2-column responsive grid — form spans 2/3, JSON spans 1/3 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>{active.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <RjsfForm
              schema={active.schema}
              uiSchema={active.uiSchema}
              formData={activeData}
              onChange={handleChange}
            />
          </CardContent>
        </Card>

        <Card className="xl:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Live JSON Config</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-surface-raised border border-hairline rounded-md p-3 overflow-auto max-h-[75vh] font-mono text-ink leading-relaxed">
              {JSON.stringify(activeData, null, 2)}
            </pre>
            <p className="text-[11px] text-ink-soft mt-2 leading-snug">
              In production this payload POSTs to the permission service
              (Keycloak group attributes or HR policy DB).
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
