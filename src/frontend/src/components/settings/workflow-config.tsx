'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowUp, ArrowDown, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardTitle, Button, Modal } from '@/components/humi';
import { Badge } from '@/components/ui/badge';
import { FormField } from '@/components/ui/form-field';
import {
 useWorkflowConfig,
 type WorkflowTemplate,
 type WorkflowStepTemplate,
} from '@/hooks/use-workflow-config';

type DraftState = {
 id: string;
 steps: WorkflowStepTemplate[];
};

function approverLabel(role: WorkflowStepTemplate['approverRole']) {
 if (role ==='direct_manager') return'Direct Manager';
 if (role ==='hrbp') return'HRBP';
 if (role ==='hr_admin') return'HR Admin';
 if (role ==='hr_manager') return'HR Manager';
 if (role ==='manager') return'Manager';
 return'Employee';
}

export function WorkflowConfig() {
 const t = useTranslations('workflowConfig');
 const { templates, updateTemplate, addStep, removeStep, moveStep, toggleTemplateActive } = useWorkflowConfig();

 const [editingTemplate, setEditingTemplate] = useState<WorkflowTemplate | null>(null);
 const [draft, setDraft] = useState<DraftState | null>(null);

 const templateList = useMemo(() => templates, [templates]);

 const openEditor = (template: WorkflowTemplate) => {
 setEditingTemplate(template);
 setDraft({ id: template.id, steps: template.steps.map((step) => ({ ...step })) });
 };

 const handleDraftStepChange = <K extends keyof WorkflowStepTemplate>(
 stepIndex: number,
 key: K,
 value: WorkflowStepTemplate[K]
 ) => {
 setDraft((prev) => {
 if (!prev) return prev;
 const nextSteps = prev.steps.map((step, index) => {
 if (index !== stepIndex) return step;
 return { ...step, [key]: value };
 });
 return { ...prev, steps: nextSteps };
 });
 };

 const handleSaveTemplate = async () => {
 if (!editingTemplate || !draft) return;
 await updateTemplate(editingTemplate.id, { steps: draft.steps });
 setEditingTemplate(null);
 setDraft(null);
 };

 return (
 <Card
 header={
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
 <div>
 <CardTitle>{t('title')}</CardTitle>
 <p className="text-sm text-ink-muted mt-1">{t('templates')}</p>
 </div>
 </div>
 }
 >
 <div className="p-5 sm:p-6 lg:p-8 space-y-3">
 {templateList.map((template) => (
 <div key={template.id} className="rounded-xl bg-surface shadow-card p-4">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
 <div>
 <p className="font-semibold text-ink">{template.name}</p>
 <p className="text-xs text-ink-muted uppercase tracking-wide mt-0.5">{template.type}</p>
 </div>
 <div className="flex items-center gap-2">
 <Badge variant={template.isActive ?'success' :'neutral'}>{template.isActive ?'Active' :'Inactive'}</Badge>
 <Button size="sm" variant="secondary" onClick={() => void toggleTemplateActive(template.id)}>
 {template.isActive ?'Disable' :'Enable'}
 </Button>
 <Button size="sm" onClick={() => openEditor(template)}>
 Edit
 </Button>
 </div>
 </div>

 <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
 {template.steps.map((step, index) => (
 <div key={`${template.id}-${step.step}`} className="flex items-center gap-2">
 <span className="rounded-md bg-surface shadow-card-raised px-2 py-1">
 Step {step.step}: {approverLabel(step.approverRole)}
 </span>
 {index < template.steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-ink-muted" />}
 </div>
 ))}
 </div>
 </div>
 ))}
 </div>

 <Modal open={!!editingTemplate} onClose={() => setEditingTemplate(null)} title={editingTemplate?.name || t('title')}>
 <div className="space-y-4">
 <div className="rounded-xl bg-surface-raised p-3">
 <p className="text-sm font-medium text-ink">{t('steps')}</p>
 <div className="mt-3 space-y-2">
 {draft?.steps.map((step, index) => (
 <div key={`${step.step}-${index}`} className="rounded-lg bg-surface shadow-card p-3">
 <div className="flex flex-col lg:flex-row gap-3">
 <div className="w-full lg:w-40">
 <FormField
 label={`Step ${index + 1}`}
 name={`step-${index}-role`}
 type="select"
 value={step.approverRole}
 onChange={(value) =>
 handleDraftStepChange(
 index,
'approverRole',
 value as WorkflowStepTemplate['approverRole']
 )
 }
 options={[
 { value:'direct_manager', label:'Direct Manager' },
 { value:'hrbp', label:'HRBP' },
 { value:'hr_admin', label:'HR Admin' },
 { value:'hr_manager', label:'HR Manager' },
 { value:'manager', label:'Manager' },
 ]}
 />
 </div>
 <div className="flex-1">
 <FormField
 label={t('condition')}
 name={`step-${index}-condition`}
 value={step.condition ??''}
 onChange={(value) => handleDraftStepChange(index,'condition', value)}
 placeholder="Optional condition"
 />
 </div>
 <div className="w-full lg:w-32">
 <p className="block text-sm font-medium text-ink-soft mb-2">Required</p>
 <button
 type="button"
 role="switch"
 aria-checked={step.isRequired}
 onClick={() => handleDraftStepChange(index, 'isRequired', !step.isRequired)}
 className={cn(
 'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
 step.isRequired ? 'bg-accent' : 'bg-hairline'
 )}
 >
 <span className={cn('inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200', step.isRequired ? 'translate-x-[18px]' : 'translate-x-0.5')} />
 </button>
 </div>
 </div>

 <div className="mt-3 flex flex-wrap gap-2">
 <Button
 size="sm"
 variant="secondary"
 onClick={() => {
 if (!editingTemplate) return;
 void moveStep(editingTemplate.id, step.step,'up');
 setDraft((prev) => {
 if (!prev) return prev;
 const currentIndex = prev.steps.findIndex((item) => item.step === step.step);
 if (currentIndex <= 0) return prev;
 const next = [...prev.steps];
 const [selected] = next.splice(currentIndex, 1);
 next.splice(currentIndex - 1, 0, selected);
 return {
 ...prev,
 steps: next.map((item, idx) => ({ ...item, step: idx + 1 })),
 };
 });
 }}
 disabled={index === 0}
 >
 <ArrowUp className="h-3.5 w-3.5 mr-1" />
 Up
 </Button>
 <Button
 size="sm"
 variant="secondary"
 onClick={() => {
 if (!editingTemplate) return;
 void moveStep(editingTemplate.id, step.step,'down');
 setDraft((prev) => {
 if (!prev) return prev;
 const currentIndex = prev.steps.findIndex((item) => item.step === step.step);
 if (currentIndex < 0 || currentIndex >= prev.steps.length - 1) return prev;
 const next = [...prev.steps];
 const [selected] = next.splice(currentIndex, 1);
 next.splice(currentIndex + 1, 0, selected);
 return {
 ...prev,
 steps: next.map((item, idx) => ({ ...item, step: idx + 1 })),
 };
 });
 }}
 disabled={index === (draft?.steps.length ?? 1) - 1}
 >
 <ArrowDown className="h-3.5 w-3.5 mr-1" />
 Down
 </Button>
 <Button
 size="sm"
 variant="danger"
 onClick={() => {
 if (!editingTemplate) return;
 void removeStep(editingTemplate.id, step.step);
 setDraft((prev) => {
 if (!prev) return prev;
 const next = prev.steps.filter((item) => item.step !== step.step);
 return {
 ...prev,
 steps: next.map((item, nextIndex) => ({ ...item, step: nextIndex + 1 })),
 };
 });
 }}
 disabled={(draft?.steps.length ?? 0) <= 1}
 >
 <Trash2 className="h-3.5 w-3.5 mr-1" />
 Remove
 </Button>
 </div>
 </div>
 ))}
 </div>

 <div className="mt-3">
 <Button
 size="sm"
 variant="secondary"
 onClick={() => {
 if (!editingTemplate || !draft) return;
 void addStep(editingTemplate.id, { approverRole:'direct_manager', isRequired: true });
 setDraft((prev) => {
 if (!prev) return prev;
 return {
 ...prev,
 steps: [
 ...prev.steps,
 {
 step: prev.steps.length + 1,
 approverRole:'direct_manager',
 isRequired: true,
 },
 ],
 };
 });
 }}
 >
 <Plus className="h-3.5 w-3.5 mr-1" />
 {t('addStep')}
 </Button>
 </div>
 </div>

 <div className="flex justify-end gap-2">
 <Button variant="secondary" onClick={() => setEditingTemplate(null)}>Cancel</Button>
 <Button variant="primary" onClick={() => void handleSaveTemplate()}>Save</Button>
 </div>
 </div>
 </Modal>
 </Card>
 );
}
