/**
 * Seed Workflow Data
 * Migrates mock-workflows.js data to workflow-engine Prisma schema
 */
import { PrismaClient } from '../../services/workflow-engine/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Data extracted from apps/js/data/mock-workflows.js
// ---------------------------------------------------------------------------

interface WorkflowData {
  id: string;
  change_type: string;
  section: string;
  status: string;
  requested_by: string;
  current_step: number;
  total_steps: number;
  old_values: string;
  new_values: string;
  completed_at?: Date;
}

const workflows: WorkflowData[] = [
  {
    id: 'wf_001',
    change_type: 'address_change',
    section: 'personal_info',
    status: 'pending',
    requested_by: 'EMP001',
    current_step: 1,
    total_steps: 2,
    old_values: JSON.stringify({ address: '123/45 Sukhumvit Road, Khlong Toei Nuea, Watthana, Bangkok 10110' }),
    new_values: JSON.stringify({ address: '789/12 Ratchadaphisek Road, Din Daeng, Din Daeng, Bangkok 10400' }),
  },
  {
    id: 'wf_002',
    change_type: 'personal_info_change',
    section: 'personal_info',
    status: 'pending',
    requested_by: 'EMP001',
    current_step: 1,
    total_steps: 2,
    old_values: JSON.stringify({ marital_status: 'single' }),
    new_values: JSON.stringify({ marital_status: 'married' }),
  },
  {
    id: 'wf_003',
    change_type: 'dependent_add',
    section: 'dependents',
    status: 'pending',
    requested_by: 'EMP001',
    current_step: 1,
    total_steps: 3,
    old_values: JSON.stringify({}),
    new_values: JSON.stringify({ dependent_name: 'Sakura Tanaka', relationship: 'child', date_of_birth: '2020-06-20' }),
  },
  {
    id: 'wf_hist_001',
    change_type: 'contact_change',
    section: 'contact_info',
    status: 'approved',
    requested_by: 'EMP001',
    current_step: 2,
    total_steps: 2,
    old_values: JSON.stringify({ phone: '+66 89 000 0000' }),
    new_values: JSON.stringify({ phone: '+66 89 123 4567' }),
    completed_at: new Date('2025-10-15'),
  },
  {
    id: 'wf_hist_002',
    change_type: 'address_change',
    section: 'personal_info',
    status: 'approved',
    requested_by: 'EMP_DR001',
    current_step: 2,
    total_steps: 2,
    old_values: JSON.stringify({ address: '55/3 Phaholyothin Road, Chatuchak, Bangkok 10900' }),
    new_values: JSON.stringify({ address: '123 Lat Phrao Road, Wang Thonglang, Bangkok 10310' }),
    completed_at: new Date('2025-11-20'),
  },
];

interface StepData {
  workflow_id: string;
  step_number: number;
  role: string;
  approver_id: string | null;
  status: string;
  action_date?: Date;
  comments?: string;
}

const workflowSteps: StepData[] = [
  { workflow_id: 'wf_001', step_number: 1, role: 'manager', approver_id: 'EMP_SUP001', status: 'pending' },
  { workflow_id: 'wf_001', step_number: 2, role: 'hr', approver_id: 'EMP_HR001', status: 'pending' },
  { workflow_id: 'wf_002', step_number: 1, role: 'manager', approver_id: 'EMP_SUP001', status: 'pending' },
  { workflow_id: 'wf_002', step_number: 2, role: 'hr', approver_id: 'EMP_HR001', status: 'pending' },
  { workflow_id: 'wf_003', step_number: 1, role: 'manager', approver_id: 'EMP_SUP001', status: 'pending' },
  { workflow_id: 'wf_003', step_number: 2, role: 'hr', approver_id: 'EMP_HR001', status: 'pending' },
  { workflow_id: 'wf_003', step_number: 3, role: 'finance', approver_id: null, status: 'pending' },
  { workflow_id: 'wf_hist_001', step_number: 1, role: 'manager', approver_id: 'EMP_SUP001', status: 'approved', action_date: new Date('2025-10-12'), comments: 'Approved' },
  { workflow_id: 'wf_hist_001', step_number: 2, role: 'hr', approver_id: 'EMP_HR001', status: 'approved', action_date: new Date('2025-10-15'), comments: 'Verified and approved' },
  { workflow_id: 'wf_hist_002', step_number: 1, role: 'manager', approver_id: 'EMP001', status: 'approved', action_date: new Date('2025-11-18'), comments: 'Approved' },
  { workflow_id: 'wf_hist_002', step_number: 2, role: 'hr', approver_id: 'EMP_HR001', status: 'approved', action_date: new Date('2025-11-20'), comments: 'Approved' },
];

const delegations = [
  {
    delegator_id: 'EMP_SUP001',
    delegate_id: 'EMP001',
    start_date: new Date('2026-03-01'),
    end_date: new Date('2026-03-15'),
    change_types: JSON.stringify(['personal_info_change', 'address_change']),
    status: 'active',
  },
];

const policyRules = [
  { name: 'Auto-approve sick leave ≤ 3 days', category: 'leave', rule_type: 'soft', condition_field: 'leave_type', condition_op: 'equals', condition_value: 'sick', message: 'Sick leave of 3 days or fewer is auto-approved', is_active: true },
  { name: 'Auto-approve personal leave ≤ 1 day', category: 'leave', rule_type: 'soft', condition_field: 'leave_type', condition_op: 'equals', condition_value: 'personal', message: 'Personal leave of 1 day or fewer is auto-approved', is_active: true },
  { name: 'OT weekly limit 36 hours', category: 'overtime', rule_type: 'hard', condition_field: 'weekly_ot_hours', condition_op: 'lte', condition_value: '36', message: 'Weekly overtime must not exceed 36 hours per Thai labor law', is_active: true },
  { name: 'OT daily limit 4 hours', category: 'overtime', rule_type: 'hard', condition_field: 'daily_ot_hours', condition_op: 'lte', condition_value: '4', message: 'Daily overtime must not exceed 4 hours', is_active: true },
  { name: 'Medical claim requires receipt', category: 'claims', rule_type: 'hard', condition_field: 'claim_type', condition_op: 'equals', condition_value: 'medical', message: 'Medical claims require a receipt attachment', is_active: true },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedWorkflows() {
  console.log('Seeding workflows...');

  for (const wf of workflows) {
    const existing = await prisma.workflow.findFirst({
      where: { change_type: wf.change_type, requested_by: wf.requested_by, status: wf.status },
    });
    if (!existing) {
      const { id: wfId, ...wfData } = wf;
      const record = await prisma.workflow.create({ data: wfData });

      const steps = workflowSteps.filter((s) => s.workflow_id === wfId);
      for (const step of steps) {
        const { workflow_id: _wfId, ...stepData } = step;
        await prisma.workflowStep.create({
          data: { workflow_id: record.id, ...stepData },
        });
      }
    }
  }
  console.log(`  Seeded ${workflows.length} workflows with ${workflowSteps.length} steps`);

  // Seed delegations
  for (const del of delegations) {
    const existing = await prisma.delegation.findFirst({
      where: { delegator_id: del.delegator_id, delegate_id: del.delegate_id },
    });
    if (!existing) {
      await prisma.delegation.create({ data: del });
    }
  }
  console.log(`  Seeded ${delegations.length} delegations`);

  // Seed policy rules
  for (const rule of policyRules) {
    const existing = await prisma.policyRule.findFirst({ where: { name: rule.name } });
    if (!existing) {
      await prisma.policyRule.create({ data: rule });
    }
  }
  console.log(`  Seeded ${policyRules.length} policy rules`);
}

if (require.main === module) {
  seedWorkflows()
    .then(() => prisma.$disconnect())
    .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
}
