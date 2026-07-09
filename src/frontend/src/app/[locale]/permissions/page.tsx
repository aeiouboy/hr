'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PageShell } from '@/components/shared/page-shell';
import { Tabs } from '@/components/humi/molecules/tabs';
import { Card, CardTitle } from '@/components/humi';
import { AccessDenied } from '@/components/shared/access-denied';
import { useAuthStore } from '@/stores/auth-store';
import { RjsfForm } from '@/components/permissions/rjsf-form';
import {
 SCHEMA_REGISTRY,
 type SchemaKey,
} from '@/components/permissions/permission-schemas';

export default function PermissionsPage() {
 const t = useTranslations('permissions');
 const { roles } = useAuthStore();
 // RBAC: Roles/Permissions config is HRIS Admin (hr_manager) only — match the menu.
 const canView = roles.includes('hr_manager');

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

 if (!canView) {
 return (
 <AccessDenied
 reasonTh="เฉพาะ HRIS Admin (hr_manager)"
 reason="HRIS Admin (hr_manager) only"
 />
 );
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
 <Card className="xl:col-span-2" header={<CardTitle>{active.label}</CardTitle>}>
 <RjsfForm
 schema={active.schema}
 uiSchema={active.uiSchema}
 formData={activeData}
 onChange={handleChange}
 />
 </Card>

 <Card className="xl:col-span-1" header={<CardTitle>Live JSON Config</CardTitle>}>
 <pre className="text-xs bg-surface-raised border border-hairline rounded-md p-3 overflow-auto max-h-[75vh] font-mono text-ink leading-relaxed">
 {JSON.stringify(activeData, null, 2)}
 </pre>
 <p className="text-xs text-ink-soft mt-2 leading-snug">
 In production this payload POSTs to the permission service
 (Keycloak group attributes or HR policy DB).
 </p>
 </Card>
 </div>
 </PageShell>
 );
}
