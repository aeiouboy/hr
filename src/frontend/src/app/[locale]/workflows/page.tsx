'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { Button, Modal } from '@/components/humi';
import { FormField } from '@/components/ui/form-field';
import { WorkflowList } from '@/components/workflows/workflow-list';
import { WorkflowDetailModal } from '@/components/workflows/workflow-detail-modal';
import { useWorkflows } from '@/hooks/use-workflows';
import type { WorkflowItem, WorkflowType } from '@/hooks/use-workflows';

type TabKey = 'forApproval' | 'sentBack' | 'approved' | 'rejected';

export default function WorkflowsPage() {
  const t = useTranslations('workflow');
  const currentUserId = useAuthStore((s) => s.userId) ?? 'EMP000';
  const currentUserName = useAuthStore((s) => s.username) ?? 'ผู้ใช้';

  const [activeTab, setActiveTab] = useState<TabKey>('forApproval');
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ type: 'leave' as WorkflowType, description: '' });

  const { workflows, pending, sentBack, approved, rejected, loading, approveWorkflow, rejectWorkflow, sendBackWorkflow, createWorkflow } =
    useWorkflows();

  const handleCreateRequest = async () => {
    if (!newRequest.description.trim()) return;
    const typeLabels: Record<string, string> = {
      leave: 'Leave Request',
      overtime: 'Overtime Request',
      time_correction: 'Time Correction Request',
      payroll_change: 'Expense Request',
      personal_info: 'Change Request',
    };
    const newWorkflow: WorkflowItem = {
      id: `WF-${String(workflows.length + 1).padStart(3, '0')}`,
      type: newRequest.type,
      typeLabel: typeLabels[newRequest.type] || newRequest.type,
      requesterName: currentUserName,
      requesterId: currentUserId,
      department: 'My Department',
      description: newRequest.description,
      submittedDate: new Date().toISOString(),
      urgency: 'normal',
      status: 'pending',
      currentStep: 1,
      totalSteps: 2,
      steps: [
        { step: 1, approverName: 'Manager', approverId: 'MGR001', status: 'pending' },
        { step: 2, approverName: 'HR', approverId: 'HR001', status: 'pending' },
      ],
    };
    await createWorkflow(newWorkflow);
    setCreateModalOpen(false);
    setNewRequest({ type: 'leave', description: '' });
    setActiveTab('forApproval');
  };

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'forApproval', label: t('forApproval'), count: pending.length },
    { key: 'sentBack', label: t('sentBack'), count: sentBack.length },
    { key: 'approved', label: t('approved'), count: approved.length },
    { key: 'rejected', label: t('rejected'), count: rejected.length },
  ];

  const currentWorkflows = {
    forApproval: pending,
    sentBack: sentBack,
    approved: approved,
    rejected: rejected,
  }[activeTab];

  const isPendingTab = activeTab === 'forApproval';

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
                <p className="text-sm text-ink-muted mt-0.5">Review and action pending workflow requests</p>
              </div>
              <Button size="sm" onClick={() => setCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-1.5" />
                {t('createRequest')}
              </Button>
            </div>

            {/* Tabs only — no summary cards */}
            <div className="flex gap-1 mb-4 border-b border-hairline">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
                    activeTab === tab.key
                      ? 'border-accent text-accent'
                      : 'border-transparent text-ink-muted hover:text-ink-soft hover:border-hairline'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                    activeTab === tab.key ? 'bg-accent-tint text-accent' : 'bg-surface-raised text-ink-muted'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Workflow list */}
            <WorkflowList
              workflows={currentWorkflows}
              loading={loading}
              onViewDetail={(wf) => { setSelectedWorkflow(wf); setModalOpen(true); }}
              onApprove={isPendingTab ? (id: string) => approveWorkflow(id) : undefined}
              onReject={isPendingTab ? (id: string) => rejectWorkflow(id) : undefined}
              onSendBack={isPendingTab ? (id: string) => sendBackWorkflow(id) : undefined}
              showActions={isPendingTab}
            />
          </div>

      {/* Detail modal */}
      <WorkflowDetailModal
        workflow={selectedWorkflow}
        open={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedWorkflow(null); }}
        onApprove={isPendingTab ? (id: string, comment?: string) => approveWorkflow(id, comment) : undefined}
        onReject={isPendingTab ? (id: string, comment?: string) => rejectWorkflow(id, comment) : undefined}
        onSendBack={isPendingTab ? (id: string, comment?: string) => sendBackWorkflow(id, comment) : undefined}
      />

      {/* Create Request modal */}
      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Request">
        <div className="space-y-4">
          <FormField
            label="Request Type"
            name="requestType"
            type="combobox"
            value={newRequest.type}
            onChange={(v) => setNewRequest((p) => ({ ...p, type: v as WorkflowType }))}
            options={[
              { value: 'leave', label: 'Leave' },
              { value: 'payroll_change', label: 'Expense' },
              { value: 'overtime', label: 'Overtime' },
              { value: 'time_correction', label: 'Time Correction' },
              { value: 'personal_info', label: 'Change Request' },
            ]}
          />
          <FormField
            label="Description"
            name="requestDesc"
            type="textarea"
            value={newRequest.description}
            onChange={(v) => setNewRequest((p) => ({ ...p, description: v }))}
            placeholder="Describe your request..."
            required
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateRequest} disabled={!newRequest.description.trim()}>Submit Request</Button>
        </div>
      </Modal>
    </>
  );
}
