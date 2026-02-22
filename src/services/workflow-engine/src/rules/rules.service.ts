import { Injectable } from '@nestjs/common';

export interface ApprovalStep {
  level: number;
  role: string;
  description: string;
}

export interface ApprovalRoute {
  levels: number;
  auto_approve: boolean;
  approvers: string[];
}

export interface ApprovalContext {
  leaveDays?: number;
  amount?: number;
  transferType?: string;
}

@Injectable()
export class RulesService {
  // Self-service (auto-approve, 0 levels)
  private readonly selfService = new Set([
    'contact_info_personal_email',
    'contact_info_personal_mobile',
    'contact_info_home_phone',
    'emergency_contact_add',
    'emergency_contact_edit',
    'emergency_contact_delete',
  ]);

  // Single-level (Manager only)
  private readonly managerOnly = new Set([
    'personal_info_nickname',
    'contact_info_business_phone',
    'leave_request',
    'ot_request',
  ]);

  // Two-level (Manager + HR Admin)
  private readonly managerAndHr = new Set([
    'personal_info_change',
    'address_change',
    'dependent_add',
    'dependent_edit',
    'dependent_delete',
    'advanced_info_change',
    'leave_request_extended',
  ]);

  // Three-level (Manager + HR Admin + HR Manager)
  private readonly fullApproval = new Set([
    'bank_account_change',
    'national_id_change',
    'employment_change',
    'compensation_change',
    'work_permit_change',
  ]);

  // Transfer-specific routing
  private readonly transferRoutes: Record<string, string[]> = {
    transfer_internal: ['current_manager', 'target_manager', 'hr_admin'],
    transfer_intercompany: ['current_manager', 'target_manager', 'hr_source', 'hr_target'],
    transfer_crossbg: ['current_manager', 'target_manager', 'hr_source', 'hr_target'],
    transfer_secondment: ['current_manager', 'target_manager', 'hr_admin'],
  };

  // Payroll routing (HR Manager + Finance Director)
  private readonly payrollRoutes = new Set(['payroll_run']);

  getApprovalRoute(changeType: string): ApprovalRoute {
    if (this.selfService.has(changeType)) {
      return { levels: 0, auto_approve: true, approvers: [] };
    }

    if (this.managerOnly.has(changeType)) {
      return { levels: 1, auto_approve: false, approvers: ['manager'] };
    }

    if (this.managerAndHr.has(changeType)) {
      return { levels: 2, auto_approve: false, approvers: ['manager', 'hr_admin'] };
    }

    if (this.fullApproval.has(changeType)) {
      return { levels: 3, auto_approve: false, approvers: ['manager', 'hr_admin', 'hr_manager'] };
    }

    if (this.transferRoutes[changeType]) {
      const approvers = this.transferRoutes[changeType];
      return { levels: approvers.length, auto_approve: false, approvers };
    }

    if (this.payrollRoutes.has(changeType)) {
      return { levels: 2, auto_approve: false, approvers: ['hr_manager', 'finance_director'] };
    }

    // Default: manager + HR admin
    return { levels: 2, auto_approve: false, approvers: ['manager', 'hr_admin'] };
  }

  getApprovalChain(type: string, context?: ApprovalContext): ApprovalStep[] {
    // Leave request: check days for extended routing
    if (type === 'leave_request' && context?.leaveDays && context.leaveDays > 5) {
      type = 'leave_request_extended';
    }

    const route = this.getApprovalRoute(type);
    return route.approvers.map((role, i) => ({
      level: i + 1,
      role,
      description: this.getRoleDescription(role),
    }));
  }

  isAutoApprove(type: string): boolean {
    return this.selfService.has(type);
  }

  getSupportedTypes(): string[] {
    return [
      ...this.selfService,
      ...this.managerOnly,
      ...this.managerAndHr,
      ...this.fullApproval,
      ...Object.keys(this.transferRoutes),
      ...this.payrollRoutes,
    ];
  }

  private getRoleDescription(role: string): string {
    const descriptions: Record<string, string> = {
      manager: 'Manager Approval',
      hr_admin: 'HR Admin Approval',
      hr_manager: 'HR Manager Approval',
      finance_director: 'Finance Director Approval',
      current_manager: 'Current Manager Approval',
      target_manager: 'Target Manager Approval',
      hr_source: 'HR (Source Company) Approval',
      hr_target: 'HR (Target Company) Approval',
    };
    return descriptions[role] || `${role} Approval`;
  }
}
