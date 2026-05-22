'use client';

import { use, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/humi';
import { ApprovalTimelineChain } from '@/components/quick-approve/ApprovalChain';
import { RequestSummary } from '@/components/quick-approve/detail/RequestSummary';
import { RequestPayload } from '@/components/quick-approve/detail/RequestPayload';
import { HistoryTimeline } from '@/components/quick-approve/detail/HistoryTimeline';
import { ActionPanel } from '@/components/quick-approve/detail/ActionPanel';
import { RejectReturnDrawer, type DrawerMode } from '@/components/quick-approve/detail/RejectReturnDrawer';
import { MOCK_PENDING_REQUESTS } from '@/components/quick-approve/mock-requests';
import type { PendingRequest } from '@/lib/quick-approve-api';

// ── Mock data (15 items, at least 3 claims) ──────────────────────────────────

const MOCK_REQUESTS: PendingRequest[] = [
  {
    id: 'WF-001',
    type: 'leave',
    requester: {
      id: 'EMP001',
      name: 'สมชาย ใจดี',
      position: 'Software Engineer',
      department: 'Technology',
    },
    description: 'Annual leave for family trip',
    submittedAt: '2026-04-28T09:00:00Z',
    urgency: 'normal',
    waitingDays: 3,
    details: {
      leaveType: 'Annual Leave',
      startDate: '2026-05-10',
      endDate: '2026-05-14',
      totalDays: 5,
      balance: 12,
      reason: 'Family trip abroad',
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'approved', date: '2026-04-29', comment: 'Approved' },
      { step: 2, approver: 'HRBP', status: 'pending' },
    ],
  },
  {
    id: 'WF-002',
    type: 'overtime',
    requester: {
      id: 'EMP002',
      name: 'มณี สุขใจ',
      position: 'Product Manager',
      department: 'Product',
    },
    description: 'Overtime for sprint deadline',
    submittedAt: '2026-04-27T14:30:00Z',
    urgency: 'urgent',
    waitingDays: 4,
    details: {
      date: '2026-04-26',
      hours: 3,
      rate: 1.5,
      reason: 'Critical sprint delivery deadline',
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'pending' },
    ],
  },
  {
    id: 'WF-003',
    type: 'claim',
    requester: {
      id: 'EMP003',
      name: 'วิไล ทองคำ',
      position: 'Business Analyst',
      department: 'Finance',
    },
    description: 'Medical expense reimbursement',
    submittedAt: '2026-04-26T10:00:00Z',
    urgency: 'normal',
    waitingDays: 5,
    details: {
      amount: 3500,
      currency: 'THB',
      category: 'Medical',
      receiptUrl: 'https://example.com/receipt-003.pdf',
      merchant: 'Bangkok Hospital',
      policyChecks: [
        { rule: 'Within annual limit', passed: true },
        { rule: 'Valid receipt attached', passed: true },
        { rule: 'Approved medical provider', passed: true },
      ],
    },
    approvalTimeline: [
      { step: 1, approver: 'HRBP', status: 'pending' },
    ],
  },
  {
    id: 'WF-004',
    type: 'transfer',
    requester: {
      id: 'EMP004',
      name: 'ประเสริฐ รุ่งเรือง',
      position: 'Senior Developer',
      department: 'Technology',
    },
    description: 'Department transfer request',
    submittedAt: '2026-04-25T08:00:00Z',
    urgency: 'low',
    waitingDays: 6,
    details: {
      fromDepartment: 'Technology',
      toDepartment: 'Product',
      fromPosition: 'Senior Developer',
      toPosition: 'Technical Product Manager',
      reason: 'Career growth opportunity',
      effectiveDate: '2026-06-01',
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'approved', date: '2026-04-26' },
      { step: 2, approver: 'HRBP', status: 'approved', date: '2026-04-27' },
      { step: 3, approver: 'SPD', status: 'pending' },
    ],
  },
  {
    id: 'WF-005',
    type: 'claim',
    requester: {
      id: 'EMP005',
      name: 'สุนีย์ แก้วใส',
      position: 'HR Specialist',
      department: 'Human Resources',
    },
    description: 'Training expense claim',
    submittedAt: '2026-04-24T11:00:00Z',
    urgency: 'normal',
    waitingDays: 7,
    details: {
      amount: 12000,
      currency: 'THB',
      category: 'Training',
      receiptUrl: 'https://example.com/receipt-005.pdf',
      merchant: 'Chulalongkorn University',
      policyChecks: [
        { rule: 'Approved training provider', passed: true },
        { rule: 'Within budget allocation', passed: true },
        { rule: 'Manager pre-approval on file', passed: false },
      ],
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'approved', date: '2026-04-25' },
      { step: 2, approver: 'HRBP', status: 'pending' },
    ],
  },
  {
    id: 'WF-006',
    type: 'leave',
    requester: {
      id: 'EMP006',
      name: 'อนุชา พงษ์ไพร',
      position: 'Marketing Executive',
      department: 'Marketing',
    },
    description: 'Sick leave request',
    submittedAt: '2026-04-29T07:30:00Z',
    urgency: 'urgent',
    waitingDays: 2,
    details: {
      leaveType: 'Sick Leave',
      startDate: '2026-04-30',
      endDate: '2026-04-30',
      totalDays: 1,
      balance: 30,
      reason: 'Fever and flu',
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'pending' },
    ],
  },
  {
    id: 'WF-007',
    type: 'claim',
    requester: {
      id: 'EMP007',
      name: 'กนกวรรณ สิงห์ทอง',
      position: 'Data Scientist',
      department: 'Technology',
    },
    description: 'Conference travel expense claim',
    submittedAt: '2026-04-23T15:00:00Z',
    urgency: 'normal',
    waitingDays: 8,
    details: {
      amount: 45000,
      currency: 'THB',
      category: 'Business Travel',
      receiptUrl: 'https://example.com/receipt-007.pdf',
      merchant: 'Singapore Airlines',
      policyChecks: [
        { rule: 'Business class approved', passed: false },
        { rule: 'Conference registration confirmed', passed: true },
        { rule: 'Within travel policy limits', passed: false },
      ],
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'approved', date: '2026-04-24', comment: 'Approved for economy class only' },
      { step: 2, approver: 'HRBP', status: 'pending' },
    ],
  },
  {
    id: 'WF-008',
    type: 'overtime',
    requester: {
      id: 'EMP008',
      name: 'ธีรพงศ์ วงศ์ชัย',
      position: 'QA Engineer',
      department: 'Technology',
    },
    description: 'Weekend testing overtime',
    submittedAt: '2026-04-28T16:00:00Z',
    urgency: 'normal',
    waitingDays: 3,
    details: {
      date: '2026-04-27',
      hours: 8,
      rate: 2,
      reason: 'Critical production deployment testing',
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'pending' },
    ],
  },
  {
    id: 'WF-009',
    type: 'change_request',
    requester: {
      id: 'EMP009',
      name: 'พิมพ์ใจ สายสมร',
      position: 'Finance Analyst',
      department: 'Finance',
    },
    description: 'Bank account change request',
    submittedAt: '2026-04-27T09:00:00Z',
    urgency: 'normal',
    waitingDays: 4,
    details: {
      changeType: 'Bank Account',
      bankName: 'Kasikorn Bank',
      accountNumber: '***-*-**567-8',
      effectiveDate: '2026-05-01',
    },
    approvalTimeline: [
      { step: 1, approver: 'HR Admin', status: 'pending' },
    ],
  },
  {
    id: 'WF-010',
    type: 'leave',
    requester: {
      id: 'EMP010',
      name: 'ชัยณรงค์ บุญมี',
      position: 'Sales Manager',
      department: 'Sales',
    },
    description: 'Maternity leave (spouse)',
    submittedAt: '2026-04-20T10:00:00Z',
    urgency: 'low',
    waitingDays: 11,
    details: {
      leaveType: "Paternity Leave",
      startDate: '2026-05-01',
      endDate: '2026-05-15',
      totalDays: 15,
      balance: 15,
      reason: 'Spouse giving birth',
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'approved', date: '2026-04-21' },
      { step: 2, approver: 'HRBP', status: 'pending' },
    ],
  },
  {
    id: 'WF-011',
    type: 'transfer',
    requester: {
      id: 'EMP011',
      name: 'รัตนา กิตติมา',
      position: 'Accountant',
      department: 'Finance',
    },
    description: 'Branch transfer request',
    submittedAt: '2026-04-22T13:00:00Z',
    urgency: 'low',
    waitingDays: 9,
    details: {
      fromDepartment: 'Finance – Bangkok HQ',
      toDepartment: 'Finance – Chiang Mai Branch',
      fromPosition: 'Senior Accountant',
      toPosition: 'Senior Accountant',
      reason: 'Family relocation to Chiang Mai',
      effectiveDate: '2026-07-01',
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'approved', date: '2026-04-23' },
      { step: 2, approver: 'HRBP', status: 'approved', date: '2026-04-24' },
      { step: 3, approver: 'SPD', status: 'pending' },
    ],
  },
  {
    id: 'WF-012',
    type: 'overtime',
    requester: {
      id: 'EMP012',
      name: 'ศุภชัย มะลิวัลย์',
      position: 'DevOps Engineer',
      department: 'Technology',
    },
    description: 'Infrastructure migration overtime',
    submittedAt: '2026-04-26T18:00:00Z',
    urgency: 'urgent',
    waitingDays: 5,
    details: {
      date: '2026-04-25',
      hours: 6,
      rate: 2,
      reason: 'AWS infrastructure migration — zero-downtime cutover',
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'pending' },
    ],
  },
  {
    id: 'WF-013',
    type: 'leave',
    requester: {
      id: 'EMP013',
      name: 'นภาพร ลิ้มทอง',
      position: 'UX Designer',
      department: 'Product',
    },
    description: 'Personal leave request',
    submittedAt: '2026-04-28T08:00:00Z',
    urgency: 'normal',
    waitingDays: 3,
    details: {
      leaveType: 'Personal Leave',
      startDate: '2026-05-05',
      endDate: '2026-05-06',
      totalDays: 2,
      balance: 5,
      reason: 'Moving apartment',
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'pending' },
    ],
  },
  {
    id: 'WF-014',
    type: 'change_request',
    requester: {
      id: 'EMP014',
      name: 'วรรณวิสา เพ็ชรชัย',
      position: 'Payroll Specialist',
      department: 'Human Resources',
    },
    description: 'Address change request',
    submittedAt: '2026-04-25T14:00:00Z',
    urgency: 'low',
    waitingDays: 6,
    details: {
      changeType: 'Home Address',
      newAddress: '123/45 Sukhumvit Soi 11, Bangkok 10110',
      effectiveDate: '2026-05-01',
    },
    approvalTimeline: [
      { step: 1, approver: 'HR Admin', status: 'pending' },
    ],
  },
  {
    id: 'WF-015',
    type: 'claim',
    requester: {
      id: 'EMP015',
      name: 'สิทธิชัย ประสงค์ดี',
      position: 'Legal Counsel',
      department: 'Legal',
    },
    description: 'Client entertainment expense',
    submittedAt: '2026-04-21T12:00:00Z',
    urgency: 'normal',
    waitingDays: 10,
    details: {
      amount: 8750,
      currency: 'THB',
      category: 'Client Entertainment',
      receiptUrl: 'https://example.com/receipt-015.pdf',
      merchant: 'Mandarin Oriental Bangkok',
      policyChecks: [
        { rule: 'Pre-approval obtained', passed: true },
        { rule: 'Guest list attached', passed: true },
        { rule: 'Within per-head limit', passed: true },
      ],
    },
    approvalTimeline: [
      { step: 1, approver: 'Manager', status: 'approved', date: '2026-04-22' },
      { step: 2, approver: 'HRBP', status: 'approved', date: '2026-04-23' },
      { step: 3, approver: 'SPD', status: 'pending' },
    ],
  },
];

const DETAIL_REQUESTS = [...MOCK_REQUESTS, ...MOCK_PENDING_REQUESTS];

// ── Page ──────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default function QuickApproveDetailPage({ params }: PageProps) {
  const t = useTranslations('quick_approve_detail');
  const router = useRouter();
  const { id } = use(params);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerMode>('reject');

  function openDrawer(mode: DrawerMode) {
    setDrawerMode(mode);
    setDrawerOpen(true);
  }

  function handleDrawerConfirm(_requestId: string, _reason: string, _comment: string) {
    // No-op in demo — production would dispatch to API here.
  }

  const request = DETAIL_REQUESTS.find((r) => r.id === id);

  if (!request) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-large font-semibold text-ink">{t('notFound')}</p>
        <p className="text-small text-ink-muted">{t('notFoundDesc')}</p>
        <Button variant="secondary" size="md" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4 mr-1" aria-hidden />
          {t('back')}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      {/* Back nav */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-ink-muted"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        {t('back')}
      </Button>

      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-ink">
          {t('title')} — {request.id}
        </h1>
        <p className="text-small text-ink-muted capitalize">{t(`type_${request.type}`)}</p>
      </div>

      {/* Approval chain quick view */}
      <div className="mb-4">
        <ApprovalTimelineChain steps={request.approvalTimeline} size="md" />
      </div>

      {/* Content stack */}
      <div className="flex flex-col gap-4">
        <RequestSummary request={request} />
        <RequestPayload request={request} />
        <HistoryTimeline steps={request.approvalTimeline} />
      </div>

      {/* Sticky action panel */}
      <div className="mt-6">
        <ActionPanel
          requestId={request.id}
          requestType={request.type}
          onReject={() => openDrawer('reject')}
          onReturn={() => openDrawer('return')}
        />
      </div>

      <RejectReturnDrawer
        open={drawerOpen}
        mode={drawerMode}
        requestId={request.id}
        onClose={() => setDrawerOpen(false)}
        onConfirm={handleDrawerConfirm}
      />
    </div>
  );
}
