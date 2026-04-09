'use client';

import { useCallback, useState } from 'react';
import type { Role } from '@/lib/rbac';
import type { WorkflowType } from '@/hooks/use-workflows';

export type WorkflowTemplateType = WorkflowType |'leave_with_document';

export interface WorkflowStepTemplate {
 step: number;
 approverRole: Role |'direct_manager' |'hrbp';
 condition?: string;
 isRequired: boolean;
}

export interface WorkflowTemplate {
 id: string;
 name: string;
 type: WorkflowTemplateType;
 isActive: boolean;
 steps: WorkflowStepTemplate[];
}

const INITIAL_TEMPLATES: WorkflowTemplate[] = [
 {
 id:'WFT-LEAVE',
 name:'Leave',
 type:'leave',
 isActive: true,
 steps: [
 { step: 1, approverRole:'direct_manager', isRequired: true },
 { step: 2, approverRole:'hr_admin', condition:'only if > 3 days', isRequired: true },
 ],
 },
 {
 id:'WFT-LEAVE-DOC',
 name:'Leave with Document',
 type:'leave_with_document',
 isActive: true,
 steps: [
 { step: 1, approverRole:'direct_manager', isRequired: true },
 { step: 2, approverRole:'hrbp', condition:'only if document attached', isRequired: true },
 ],
 },
 {
 id:'WFT-OT',
 name:'Overtime',
 type:'overtime',
 isActive: true,
 steps: [
 { step: 1, approverRole:'direct_manager', isRequired: true },
 { step: 2, approverRole:'hr_admin', isRequired: true },
 ],
 },
 {
 id:'WFT-TIME-CORR',
 name:'Time Correction',
 type:'time_correction',
 isActive: true,
 steps: [{ step: 1, approverRole:'direct_manager', isRequired: true }],
 },
 {
 id:'WFT-TRANSFER',
 name:'Transfer',
 type:'transfer',
 isActive: true,
 steps: [
 { step: 1, approverRole:'direct_manager', isRequired: true },
 { step: 2, approverRole:'hr_admin', isRequired: true },
 { step: 3, approverRole:'hr_manager', isRequired: true },
 ],
 },
 {
 id:'WFT-RESIGN',
 name:'Resignation',
 type:'resignation',
 isActive: true,
 steps: [
 { step: 1, approverRole:'direct_manager', isRequired: true },
 { step: 2, approverRole:'hr_admin', isRequired: true },
 ],
 },
];

function normalizeSteps(steps: WorkflowStepTemplate[]): WorkflowStepTemplate[] {
 return steps.map((step, index) => ({ ...step, step: index + 1 }));
}

export function useWorkflowConfig() {
 const [templates, setTemplates] = useState<WorkflowTemplate[]>(INITIAL_TEMPLATES);

 const updateTemplate = useCallback(async (templateId: string, updates: Partial<WorkflowTemplate>) => {
 await new Promise((resolve) => setTimeout(resolve, 220));
 setTemplates((prev) =>
 prev.map((template) => {
 if (template.id !== templateId) return template;
 return {
 ...template,
 ...updates,
 steps: updates.steps ? normalizeSteps(updates.steps) : template.steps,
 };
 })
 );
 }, []);

 const addStep = useCallback(async (templateId: string, step: Omit<WorkflowStepTemplate,'step'>) => {
 await new Promise((resolve) => setTimeout(resolve, 180));
 setTemplates((prev) =>
 prev.map((template) => {
 if (template.id !== templateId) return template;
 return {
 ...template,
 steps: normalizeSteps([...template.steps, { ...step, step: template.steps.length + 1 }]),
 };
 })
 );
 }, []);

 const removeStep = useCallback(async (templateId: string, stepNumber: number) => {
 await new Promise((resolve) => setTimeout(resolve, 180));
 setTemplates((prev) =>
 prev.map((template) => {
 if (template.id !== templateId) return template;
 if (template.steps.length <= 1) return template;
 return {
 ...template,
 steps: normalizeSteps(template.steps.filter((step) => step.step !== stepNumber)),
 };
 })
 );
 }, []);

 const moveStep = useCallback(async (templateId: string, stepNumber: number, direction:'up' |'down') => {
 await new Promise((resolve) => setTimeout(resolve, 180));
 setTemplates((prev) =>
 prev.map((template) => {
 if (template.id !== templateId) return template;
 const index = template.steps.findIndex((step) => step.step === stepNumber);
 if (index < 0) return template;
 const targetIndex = direction ==='up' ? index - 1 : index + 1;
 if (targetIndex < 0 || targetIndex >= template.steps.length) return template;

 const next = [...template.steps];
 const [selected] = next.splice(index, 1);
 next.splice(targetIndex, 0, selected);

 return {
 ...template,
 steps: normalizeSteps(next),
 };
 })
 );
 }, []);

 const toggleTemplateActive = useCallback(async (templateId: string) => {
 await new Promise((resolve) => setTimeout(resolve, 180));
 setTemplates((prev) =>
 prev.map((template) => (template.id === templateId ? { ...template, isActive: !template.isActive } : template))
 );
 }, []);

 return {
 templates,
 updateTemplate,
 addStep,
 removeStep,
 moveStep,
 toggleTemplateActive,
 };
}
