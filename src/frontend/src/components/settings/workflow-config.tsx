'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowUp, ArrowDown, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
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
  if (role === 'direct_manager') return 'Direct Manager';
  if (role === 'hrbp') return 'HRBP';
  if (role === 'hr_admin') return 'HR Admin';
  if (role === 'hr_manager') return 'HR Manager';
  if (role === 'manager') return 'Manager';
  return 'Employee';
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
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle>{t('title')}</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('templates')}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 sm:p-6 lg:p-8 space-y-3">
        {templateList.map((template) => (
          <div key={template.id} className="rounded-xl border dark:border-gray-700 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-semibold text-cg-dark">{template.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-0.5">{template.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={template.isActive ? 'success' : 'neutral'}>{template.isActive ? 'Active' : 'Inactive'}</Badge>
                <Button size="sm" variant="outline" onClick={() => void toggleTemplateActive(template.id)}>
                  {template.isActive ? 'Disable' : 'Enable'}
                </Button>
                <Button size="sm" onClick={() => openEditor(template)}>
                  Edit
                </Button>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              {template.steps.map((step, index) => (
                <div key={`${template.id}-${step.step}`} className="flex items-center gap-2">
                  <span className="rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 px-2 py-1">
                    Step {step.step}: {approverLabel(step.approverRole)}
                  </span>
                  {index < template.steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>

      <Modal open={!!editingTemplate} onClose={() => setEditingTemplate(null)} title={editingTemplate?.name || t('title')}>
        <div className="space-y-4">
          <div className="rounded-lg border dark:border-gray-700 p-3">
            <p className="text-sm font-medium text-cg-dark">{t('steps')}</p>
            <div className="mt-3 space-y-2">
              {draft?.steps.map((step, index) => (
                <div key={`${step.step}-${index}`} className="rounded-lg border dark:border-gray-700 p-3">
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
                          { value: 'direct_manager', label: 'Direct Manager' },
                          { value: 'hrbp', label: 'HRBP' },
                          { value: 'hr_admin', label: 'HR Admin' },
                          { value: 'hr_manager', label: 'HR Manager' },
                          { value: 'manager', label: 'Manager' },
                        ]}
                      />
                    </div>
                    <div className="flex-1">
                      <FormField
                        label={t('condition')}
                        name={`step-${index}-condition`}
                        value={step.condition ?? ''}
                        onChange={(value) => handleDraftStepChange(index, 'condition', value)}
                        placeholder="Optional condition"
                      />
                    </div>
                    <div className="w-full lg:w-32">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required</label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={step.isRequired}
                          onChange={(event) => handleDraftStepChange(index, 'isRequired', event.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-cg-red focus:ring-cg-red"
                        />
                        Yes
                      </label>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (!editingTemplate) return;
                        void moveStep(editingTemplate.id, step.step, 'up');
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
                      variant="outline"
                      onClick={() => {
                        if (!editingTemplate) return;
                        void moveStep(editingTemplate.id, step.step, 'down');
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
                      variant="destructive"
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
                variant="outline"
                onClick={() => {
                  if (!editingTemplate || !draft) return;
                  void addStep(editingTemplate.id, { approverRole: 'direct_manager', isRequired: true });
                  setDraft((prev) => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      steps: [
                        ...prev.steps,
                        {
                          step: prev.steps.length + 1,
                          approverRole: 'direct_manager',
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
            <Button variant="outline" onClick={() => setEditingTemplate(null)}>Cancel</Button>
            <Button onClick={() => void handleSaveTemplate()}>Save</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
