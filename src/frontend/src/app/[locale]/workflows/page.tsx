'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  ClipboardList,
  Clock,
  CheckCircle,
  RotateCcw,
  Plus,
} from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { FormField } from '@/components/ui/form-field';
import { WorkflowList } from '@/components/workflows/workflow-list';
import { WorkflowDetailModal } from '@/components/workflows/workflow-detail-modal';
import { useWorkflows } from '@/hooks/use-workflows';
import type { WorkflowItem, WorkflowType } from '@/hooks/use-workflows';

type TabKey = 'forApproval' | 'sentBack' | 'approved' | 'rejected';

interface SummaryCardProps {
  label: string;
  count: number;
  icon: React.ReactNode;
  colorClass: string;
  badgeVariant: 'warning' | 'success' | 'error' | 'info' | 'neutral';
  active: boolean;
  onClick: () => void;
}

function SummaryCard({ label, count, icon, colorClass, badgeVariant, active, onClick }: SummaryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left transition-all rounded-xl border shadow-sm bg-white hover:shadow-md ${
        active ? 'ring-2 ring-cg-red ring-offset-1' : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
            {icon}
          </div>
          <Badge variant={badgeVariant}>{count}</Badge>
        </div>
        <p className="text-sm font-medium text-cg-dark">{label}</p>
      </CardContent>
    </button>
  );
}

export default function WorkflowsPage() {
  const t = useTranslations('workflow');
  const pathname = usePathname();

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
      payroll_change: 'Expense Request',
      personal_info: 'Change Request',
    };
    const newWorkflow: WorkflowItem = {
      id: `WF-${String(workflows.length + 1).padStart(3, '0')}`,
      type: newRequest.type,
      typeLabel: typeLabels[newRequest.type] || newRequest.type,
      requesterName: 'Current User',
      requesterId: 'EMP000',
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

  const tabs = [
    { key: 'forApproval', label: `${t('forApproval')} (${pending.length})` },
    { key: 'sentBack', label: `${t('sentBack')} (${sentBack.length})` },
    { key: 'approved', label: `${t('approved')} (${approved.length})` },
    { key: 'rejected', label: `${t('rejected')} (${rejected.length})` },
  ];

  const summaryCards = [
    {
      key: 'forApproval' as TabKey,
      label: t('forApproval'),
      count: pending.length,
      icon: <Clock className="h-5 w-5" />,
      colorClass: 'text-yellow-600 bg-yellow-50',
      badgeVariant: 'warning' as const,
    },
    {
      key: 'sentBack' as TabKey,
      label: t('sentBack'),
      count: sentBack.length,
      icon: <RotateCcw className="h-5 w-5" />,
      colorClass: 'text-blue-600 bg-blue-50',
      badgeVariant: 'info' as const,
    },
    {
      key: 'approved' as TabKey,
      label: t('approved'),
      count: approved.length,
      icon: <CheckCircle className="h-5 w-5" />,
      colorClass: 'text-green-600 bg-green-50',
      badgeVariant: 'success' as const,
    },
    {
      key: 'rejected' as TabKey,
      label: t('rejected'),
      count: rejected.length,
      icon: <ClipboardList className="h-5 w-5" />,
      colorClass: 'text-red-600 bg-red-50',
      badgeVariant: 'error' as const,
    },
  ];

  const currentWorkflows = {
    forApproval: pending,
    sentBack: sentBack,
    approved: approved,
    rejected: rejected,
  }[activeTab];

  const isPendingTab = activeTab === 'forApproval';

  const handleViewDetail = (workflow: WorkflowItem) => {
    setSelectedWorkflow(workflow);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedWorkflow(null);
  };

  const handleApprove = async (id: string, comment?: string) => {
    await approveWorkflow(id, comment);
  };

  const handleReject = async (id: string, comment?: string) => {
    await rejectWorkflow(id, comment);
  };

  const handleSendBack = async (id: string, comment?: string) => {
    await sendBackWorkflow(id, comment);
  };

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
                <p className="text-gray-500 mt-1 text-sm">
                  Review and action pending workflow requests
                </p>
              </div>
              <Button className="mt-4 sm:mt-0" size="sm" onClick={() => setCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t('createRequest')}
              </Button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {summaryCards.map((card) => (
                <SummaryCard
                  key={card.key}
                  label={card.label}
                  count={card.count}
                  icon={card.icon}
                  colorClass={card.colorClass}
                  badgeVariant={card.badgeVariant}
                  active={activeTab === card.key}
                  onClick={() => setActiveTab(card.key)}
                />
              ))}
            </div>

            {/* Tabs */}
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={(key) => setActiveTab(key as TabKey)}
              className="mb-6"
            />

            {/* Workflow list */}
            <WorkflowList
              workflows={currentWorkflows}
              loading={loading}
              onViewDetail={handleViewDetail}
              onApprove={isPendingTab ? handleApprove : undefined}
              onReject={isPendingTab ? handleReject : undefined}
              onSendBack={isPendingTab ? handleSendBack : undefined}
              showActions={isPendingTab}
            />
          </div>
        </main>
      </div>

      {/* Detail modal */}
      <WorkflowDetailModal
        workflow={selectedWorkflow}
        open={modalOpen}
        onClose={handleCloseModal}
        onApprove={isPendingTab ? handleApprove : undefined}
        onReject={isPendingTab ? handleReject : undefined}
        onSendBack={isPendingTab ? handleSendBack : undefined}
      />

      {/* Create Request modal */}
      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create New Request">
        <div className="space-y-4">
          <FormField
            label="Request Type"
            name="requestType"
            type="select"
            value={newRequest.type}
            onChange={(v) => setNewRequest((p) => ({ ...p, type: v as WorkflowType }))}
            options={[
              { value: 'leave', label: 'Leave' },
              { value: 'payroll_change', label: 'Expense' },
              { value: 'overtime', label: 'Overtime' },
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
          <Button variant="outline" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateRequest} disabled={!newRequest.description.trim()}>Submit Request</Button>
        </div>
      </Modal>
    </div>
  );
}
