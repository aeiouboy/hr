'use client';

import { useState, useEffect, useCallback } from 'react';

export type WorkflowType = 'leave' | 'transfer' | 'personal_info' | 'payroll_change' | 'resignation' | 'overtime';
export type WorkflowStatus = 'pending' | 'approved' | 'rejected' | 'sent_back';
export type WorkflowUrgency = 'low' | 'normal' | 'high' | 'critical';

export interface WorkflowStep {
  step: number;
  approverName: string;
  approverId: string;
  status: WorkflowStatus | 'skipped';
  actionDate?: string;
  comment?: string;
}

export interface WorkflowItem {
  id: string;
  type: WorkflowType;
  typeLabel: string;
  requesterName: string;
  requesterId: string;
  department: string;
  description: string;
  submittedDate: string;
  effectiveDate?: string;
  urgency: WorkflowUrgency;
  status: WorkflowStatus;
  currentStep: number;
  totalSteps: number;
  steps: WorkflowStep[];
  details?: Record<string, string>;
  changes?: { field: string; oldValue: string; newValue: string }[];
}

const MOCK_WORKFLOWS: WorkflowItem[] = [
  {
    id: 'WF-001',
    type: 'leave',
    typeLabel: 'Leave Request',
    requesterName: 'Somchai Jaidee',
    requesterId: 'EMP001',
    department: 'Engineering',
    description: 'Annual Leave: Mar 10-14, 2026 (5 days)',
    submittedDate: '2026-02-15T09:00:00Z',
    effectiveDate: '2026-03-10',
    urgency: 'normal',
    status: 'pending',
    currentStep: 1,
    totalSteps: 2,
    steps: [
      { step: 1, approverName: 'Rungrote Amnuaysopon', approverId: 'MGR001', status: 'pending' },
      { step: 2, approverName: 'Kamolwan Srisuk', approverId: 'HR001', status: 'pending' },
    ],
    details: { leaveType: 'Annual Leave', startDate: '2026-03-10', endDate: '2026-03-14', days: '5' },
  },
  {
    id: 'WF-002',
    type: 'transfer',
    typeLabel: 'Transfer Request',
    requesterName: 'Naruechon Woraphatphawan',
    requesterId: 'EMP002',
    department: 'Information Technology',
    description: 'Transfer from IT Dept to Product Dept',
    submittedDate: '2026-02-10T14:00:00Z',
    effectiveDate: '2026-04-01',
    urgency: 'high',
    status: 'pending',
    currentStep: 1,
    totalSteps: 3,
    steps: [
      { step: 1, approverName: 'Rungrote Amnuaysopon', approverId: 'MGR001', status: 'pending' },
      { step: 2, approverName: 'Kamolwan Srisuk', approverId: 'HR001', status: 'pending' },
      { step: 3, approverName: 'Thanaporn Kittisak', approverId: 'HRMGR001', status: 'pending' },
    ],
    details: { fromDepartment: 'IT Department', toDepartment: 'Product Department', effectiveDate: '2026-04-01' },
    changes: [
      { field: 'Department', oldValue: 'IT Department', newValue: 'Product Department' },
      { field: 'Position', oldValue: 'Software Engineer', newValue: 'Product Engineer' },
    ],
  },
  {
    id: 'WF-003',
    type: 'personal_info',
    typeLabel: 'Personal Info Change',
    requesterName: 'Punnapa Thianchai',
    requesterId: 'EMP003',
    department: 'Finance',
    description: 'Address change request – please review supporting documents',
    submittedDate: '2026-02-18T10:30:00Z',
    effectiveDate: '2026-02-20',
    urgency: 'low',
    status: 'sent_back',
    currentStep: 1,
    totalSteps: 1,
    steps: [
      {
        step: 1,
        approverName: 'Kamolwan Srisuk',
        approverId: 'HR001',
        status: 'sent_back',
        actionDate: '2026-02-19T09:00:00Z',
        comment: 'Please provide supporting documents (utility bill or government ID)',
      },
    ],
    details: { field: 'Current Address', oldValue: '123 Sukhumvit Rd', newValue: '456 Ratchadaphisek Rd' },
    changes: [
      { field: 'Current Address', oldValue: '123 Sukhumvit Rd, Watthana, Bangkok 10110', newValue: '456 Ratchadaphisek Rd, Din Daeng, Bangkok 10400' },
    ],
  },
  {
    id: 'WF-004',
    type: 'leave',
    typeLabel: 'Leave Request',
    requesterName: 'Wichai Prasert',
    requesterId: 'EMP004',
    department: 'Sales',
    description: 'Sick Leave: Feb 5, 2026 (1 day)',
    submittedDate: '2026-02-05T07:30:00Z',
    effectiveDate: '2026-02-05',
    urgency: 'normal',
    status: 'approved',
    currentStep: 2,
    totalSteps: 2,
    steps: [
      {
        step: 1,
        approverName: 'Rungrote Amnuaysopon',
        approverId: 'MGR001',
        status: 'approved',
        actionDate: '2026-02-05T08:00:00Z',
        comment: 'Approved. Get well soon.',
      },
      {
        step: 2,
        approverName: 'Kamolwan Srisuk',
        approverId: 'HR001',
        status: 'approved',
        actionDate: '2026-02-05T09:00:00Z',
      },
    ],
    details: { leaveType: 'Sick Leave', date: '2026-02-05', days: '1' },
  },
  {
    id: 'WF-005',
    type: 'overtime',
    typeLabel: 'Overtime Request',
    requesterName: 'Ananya Kaewkham',
    requesterId: 'EMP005',
    department: 'Marketing',
    description: 'Overtime: Feb 20, 2026 (3 hours) – Project deadline',
    submittedDate: '2026-02-19T16:00:00Z',
    effectiveDate: '2026-02-20',
    urgency: 'normal',
    status: 'pending',
    currentStep: 1,
    totalSteps: 2,
    steps: [
      { step: 1, approverName: 'Rungrote Amnuaysopon', approverId: 'MGR001', status: 'pending' },
      { step: 2, approverName: 'Kamolwan Srisuk', approverId: 'HR001', status: 'pending' },
    ],
    details: { date: '2026-02-20', hours: '3', reason: 'Project deadline', rate: '1.5x' },
  },
  {
    id: 'WF-006',
    type: 'resignation',
    typeLabel: 'Resignation',
    requesterName: 'Teerapat Wongsawat',
    requesterId: 'EMP006',
    department: 'Operations',
    description: 'Resignation effective Apr 1, 2026',
    submittedDate: '2026-02-01T09:00:00Z',
    effectiveDate: '2026-04-01',
    urgency: 'critical',
    status: 'pending',
    currentStep: 2,
    totalSteps: 3,
    steps: [
      {
        step: 1,
        approverName: 'Rungrote Amnuaysopon',
        approverId: 'MGR001',
        status: 'approved',
        actionDate: '2026-02-02T10:00:00Z',
        comment: 'Acknowledged. Will arrange knowledge transfer.',
      },
      { step: 2, approverName: 'Kamolwan Srisuk', approverId: 'HR001', status: 'pending' },
      { step: 3, approverName: 'Thanaporn Kittisak', approverId: 'HRMGR001', status: 'pending' },
    ],
    details: { lastWorkingDay: '2026-03-31', noticePeriod: '60 days', reason: 'Personal reasons' },
  },
  {
    id: 'WF-007',
    type: 'payroll_change',
    typeLabel: 'Salary Adjustment',
    requesterName: 'Siriporn Nakwilai',
    requesterId: 'EMP007',
    department: 'Human Resources',
    description: 'Annual merit increase – Performance cycle 2025',
    submittedDate: '2026-01-28T11:00:00Z',
    effectiveDate: '2026-03-01',
    urgency: 'high',
    status: 'approved',
    currentStep: 3,
    totalSteps: 3,
    steps: [
      {
        step: 1,
        approverName: 'Rungrote Amnuaysopon',
        approverId: 'MGR001',
        status: 'approved',
        actionDate: '2026-01-29T09:00:00Z',
      },
      {
        step: 2,
        approverName: 'Kamolwan Srisuk',
        approverId: 'HR001',
        status: 'approved',
        actionDate: '2026-01-30T10:00:00Z',
      },
      {
        step: 3,
        approverName: 'Thanaporn Kittisak',
        approverId: 'HRMGR001',
        status: 'approved',
        actionDate: '2026-01-31T14:00:00Z',
        comment: 'Approved. Effective from March payroll.',
      },
    ],
    changes: [
      { field: 'Base Salary', oldValue: '45,000 THB', newValue: '49,500 THB' },
      { field: 'Grade', oldValue: 'G5', newValue: 'G6' },
    ],
    details: { increasePercent: '10%', effectiveDate: '2026-03-01', cycle: '2025 Annual Merit' },
  },
  {
    id: 'WF-008',
    type: 'personal_info',
    typeLabel: 'Personal Info Change',
    requesterName: 'Montree Bunyasarn',
    requesterId: 'EMP008',
    department: 'Legal',
    description: 'Bank account update for payroll',
    submittedDate: '2026-02-20T13:30:00Z',
    effectiveDate: '2026-03-01',
    urgency: 'normal',
    status: 'pending',
    currentStep: 1,
    totalSteps: 2,
    steps: [
      { step: 1, approverName: 'Kamolwan Srisuk', approverId: 'HR001', status: 'pending' },
      { step: 2, approverName: 'Thanaporn Kittisak', approverId: 'HRMGR001', status: 'pending' },
    ],
    changes: [
      { field: 'Bank', oldValue: 'Bangkok Bank', newValue: 'Kasikorn Bank' },
      { field: 'Account Number', oldValue: '***-**-1234', newValue: '***-**-5678' },
    ],
    details: { bank: 'Kasikorn Bank', reason: 'Bank account closed by bank' },
  },
];

export function useWorkflows() {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        await new Promise((r) => setTimeout(r, 400));
        setWorkflows(MOCK_WORKFLOWS);
      } catch {
        setError('Failed to load workflows');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const approveWorkflow = useCallback(async (id: string, comment?: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const updatedSteps = w.steps.map((s, i) =>
          i === w.currentStep - 1
            ? { ...s, status: 'approved' as const, actionDate: new Date().toISOString(), comment }
            : s
        );
        const allApproved = updatedSteps.every((s) => s.status === 'approved');
        return {
          ...w,
          steps: updatedSteps,
          currentStep: allApproved ? w.totalSteps : w.currentStep + 1,
          status: allApproved ? ('approved' as const) : ('pending' as const),
        };
      })
    );
  }, []);

  const rejectWorkflow = useCallback(async (id: string, comment?: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const updatedSteps = w.steps.map((s, i) =>
          i === w.currentStep - 1
            ? { ...s, status: 'rejected' as const, actionDate: new Date().toISOString(), comment }
            : s
        );
        return { ...w, steps: updatedSteps, status: 'rejected' as const };
      })
    );
  }, []);

  const sendBackWorkflow = useCallback(async (id: string, comment?: string) => {
    await new Promise((r) => setTimeout(r, 300));
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const updatedSteps = w.steps.map((s, i) =>
          i === w.currentStep - 1
            ? { ...s, status: 'sent_back' as const, actionDate: new Date().toISOString(), comment }
            : s
        );
        return { ...w, steps: updatedSteps, status: 'sent_back' as const };
      })
    );
  }, []);

  const pending = workflows.filter((w) => w.status === 'pending');
  const sentBack = workflows.filter((w) => w.status === 'sent_back');
  const approved = workflows.filter((w) => w.status === 'approved');
  const rejected = workflows.filter((w) => w.status === 'rejected');

  return {
    workflows,
    pending,
    sentBack,
    approved,
    rejected,
    loading,
    error,
    approveWorkflow,
    rejectWorkflow,
    sendBackWorkflow,
  };
}
