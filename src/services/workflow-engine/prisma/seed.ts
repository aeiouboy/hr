// Workflow Engine Seed Data
// Seeds workflow types with approval chains from PRD Section 7.1

const workflowTypes = [
  {
    code: 'contact_info_personal_email',
    name: 'Contact Info Update - Personal Email',
    description: 'Self-service update of personal email',
    approval_levels: [],
  },
  {
    code: 'contact_info_personal_mobile',
    name: 'Contact Info Update - Personal Mobile',
    description: 'Self-service update of personal mobile',
    approval_levels: [],
  },
  {
    code: 'emergency_contact_add',
    name: 'Emergency Contact - Add',
    description: 'Self-service addition of emergency contact',
    approval_levels: [],
  },
  {
    code: 'personal_info_change',
    name: 'Personal Information Change',
    description: 'Change to personal information requiring Manager and HR approval',
    approval_levels: [
      { level: 1, role: 'manager', description: 'Manager Approval' },
      { level: 2, role: 'hr_admin', description: 'HR Admin Approval' },
    ],
  },
  {
    code: 'address_change',
    name: 'Address Change',
    description: 'Change to address information requiring Manager approval',
    approval_levels: [
      { level: 1, role: 'manager', description: 'Manager Approval' },
    ],
  },
  {
    code: 'leave_request',
    name: 'Leave Request (up to 5 days)',
    description: 'Standard leave request requiring Manager approval',
    approval_levels: [
      { level: 1, role: 'manager', description: 'Manager Approval' },
    ],
  },
  {
    code: 'leave_request_extended',
    name: 'Leave Request (over 5 days)',
    description: 'Extended leave request requiring Manager and HR approval',
    approval_levels: [
      { level: 1, role: 'manager', description: 'Manager Approval' },
      { level: 2, role: 'hr_admin', description: 'HR Admin Approval' },
    ],
  },
  {
    code: 'ot_request',
    name: 'Overtime Request',
    description: 'OT request requiring Manager approval',
    approval_levels: [
      { level: 1, role: 'manager', description: 'Manager Approval' },
    ],
  },
  {
    code: 'bank_account_change',
    name: 'Bank Account Change',
    description: 'Sensitive bank info change requiring 3-level approval',
    approval_levels: [
      { level: 1, role: 'manager', description: 'Manager Approval' },
      { level: 2, role: 'hr_admin', description: 'HR Admin Approval' },
      { level: 3, role: 'hr_manager', description: 'HR Manager Approval' },
    ],
  },
  {
    code: 'resignation',
    name: 'Resignation',
    description: 'Resignation requiring Manager, HR, and Department Head approval',
    approval_levels: [
      { level: 1, role: 'manager', description: 'Manager Approval' },
      { level: 2, role: 'hr_admin', description: 'HR Admin Approval' },
      { level: 3, role: 'department_head', description: 'Department Head Approval' },
    ],
  },
  {
    code: 'transfer_internal',
    name: 'Internal Transfer',
    description: 'Internal transfer requiring Current Manager, Target Manager, and HR',
    approval_levels: [
      { level: 1, role: 'current_manager', description: 'Current Manager Approval' },
      { level: 2, role: 'target_manager', description: 'Target Manager Approval' },
      { level: 3, role: 'hr_admin', description: 'HR Admin Approval' },
    ],
  },
  {
    code: 'transfer_intercompany',
    name: 'Inter-company Transfer',
    description: 'Inter-company transfer requiring 4-level approval',
    approval_levels: [
      { level: 1, role: 'current_manager', description: 'Current Manager Approval' },
      { level: 2, role: 'target_manager', description: 'Target Manager Approval' },
      { level: 3, role: 'hr_source', description: 'HR Source Company Approval' },
      { level: 4, role: 'hr_target', description: 'HR Target Company Approval' },
    ],
  },
  {
    code: 'compensation_change',
    name: 'Compensation Change',
    description: 'Compensation change requiring 3-level approval',
    approval_levels: [
      { level: 1, role: 'manager', description: 'Manager Approval' },
      { level: 2, role: 'hr_admin', description: 'HR Admin Approval' },
      { level: 3, role: 'hr_manager', description: 'HR Manager Approval' },
    ],
  },
];

async function main() {
  console.log('Workflow types seed data ready for insertion');
  console.log(JSON.stringify(workflowTypes, null, 2));
}

main();
