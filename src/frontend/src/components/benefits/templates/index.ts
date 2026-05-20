// Benefits workflow template barrel — one export per WorkflowTemplate id.
// Import via: `import { SimpleClaimForm, pickTemplate } from '@/components/benefits/templates';`

export { SimpleClaimForm } from './SimpleClaimForm';
export type { BenefitTemplateProps, SimpleClaimSubmission } from './SimpleClaimForm';

export { HospitalClaimForm } from './HospitalClaimForm';
export { RecordsFlatForm } from './RecordsFlatForm';
export { RecordsDependentForm } from './RecordsDependentForm';
export { RecordsComputedView } from './RecordsComputedView';
export { LifecycleAdminForm } from './LifecycleAdminForm';

import type { ComponentType } from 'react';
import type { BenefitPlan, WorkflowTemplate } from '@/data/benefits/plan-registry';
import type { BenefitTemplateProps } from './SimpleClaimForm';
import { SimpleClaimForm } from './SimpleClaimForm';
import { HospitalClaimForm } from './HospitalClaimForm';
import { RecordsFlatForm } from './RecordsFlatForm';
import { RecordsDependentForm } from './RecordsDependentForm';
import { RecordsComputedView } from './RecordsComputedView';
import { LifecycleAdminForm } from './LifecycleAdminForm';

const TEMPLATE_MAP: Record<WorkflowTemplate, ComponentType<BenefitTemplateProps>> = {
  'simple-claim': SimpleClaimForm,
  'hospital-claim': HospitalClaimForm,
  'records-flat': RecordsFlatForm,
  'records-dependent': RecordsDependentForm,
  'records-computed': RecordsComputedView,
  'lifecycle-admin': LifecycleAdminForm,
};

/**
 * Returns the correct template component for the given plan's `template`
 * discriminator. Throws if the template id is not registered.
 */
export function pickTemplate(plan: BenefitPlan): ComponentType<BenefitTemplateProps> {
  const component = TEMPLATE_MAP[plan.template];
  if (!component) {
    throw new Error(`No template registered for WorkflowTemplate '${plan.template}'`);
  }
  return component;
}
