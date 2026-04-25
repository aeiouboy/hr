'use client';

// use-resignation.ts — subscribe humi-profile-slice (C7 SSoT)
// ไม่ใช้ useState สำหรับ termination state — อ่านจาก store เท่านั้น

import { useCallback } from 'react';
import { useHumiProfileStore } from '@/stores/humi-profile-slice';

export type ResignationStatus = 'draft' | 'submitted' | 'in_progress' | 'completed';

export interface ClearanceItem {
  id: string;
  title: string;
  responsibleParty: string;
  status: 'pending' | 'in_progress' | 'completed';
  signedOffDate?: string;
  notes?: string;
}

export interface ResignationRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  resignationDate: string;
  lastWorkingDate: string;
  reasonType: string;
  reasonDetails: string;
  noticePeriod: number;
  status: ResignationStatus;
  submittedDate?: string;
  exitInterviewDate?: string;
  clearanceItems: ClearanceItem[];
  settlement?: {
    outstandingSalary: number;
    leaveEncashment: number;
    bonus: number;
    loanDeductions: number;
    pfBalance: number;
    netPayable: number;
  };
}

// clearanceItems mock — out-of-scope to persist (Sprint 2 backend wire-up)
const MOCK_CLEARANCE_ITEMS: ClearanceItem[] = [
  { id: 'CLR001', title: 'คืนอุปกรณ์และครุภัณฑ์', responsibleParty: 'IT', status: 'pending' },
  { id: 'CLR002', title: 'คืนบัตรผ่านและกุญแจ', responsibleParty: 'Admin', status: 'pending' },
  { id: 'CLR003', title: 'ส่งมอบงาน', responsibleParty: 'ผู้บังคับบัญชา', status: 'pending' },
  { id: 'CLR004', title: 'จัดการวันลาคงเหลือ', responsibleParty: 'HR', status: 'pending' },
];

export function useResignation() {
  // AC-2: อ่านจาก store เท่านั้น — ห้าม useState<ResignationRecord>
  const pendingChanges = useHumiProfileStore((s) => s.pendingChanges);
  const submitChangeRequest = useHumiProfileStore((s) => s.submitChangeRequest);

  const terminationChange = pendingChanges.find((pc) => pc.sectionKey === 'termination');

  // Map PendingChange → ResignationRecord shape (backward-compat with 3-tab render)
  const record: ResignationRecord | null = terminationChange
    ? {
        id: terminationChange.id,
        employeeId: 'EMP000',
        employeeName: 'Current User',
        resignationDate: terminationChange.requestedAt.split('T')[0],
        lastWorkingDate: terminationChange.effectiveDate,
        reasonType: terminationChange.newValue,
        reasonDetails: terminationChange.reason ?? '',
        noticePeriod: 30,
        status: terminationChange.status === 'pending' ? 'submitted' : (terminationChange.status as ResignationStatus),
        submittedDate: terminationChange.requestedAt.split('T')[0],
        clearanceItems: MOCK_CLEARANCE_ITEMS,
      }
    : null;

  const loading = false; // store is synchronous + persisted — no async needed

  const updateClearanceItem = useCallback((_itemId: string, _status: ClearanceItem['status']) => {
    // Sprint 2: wire to backend; for now no-op (clearanceItems are mock)
  }, []);

  const submitResignation = useCallback(
    async (data: { lastWorkingDate: string; reason: string; handoverNotes: string }) => {
      // AC-1: dispatch ผ่าน submitChangeRequest (C7 SSoT)
      submitChangeRequest({
        sectionKey: 'termination',
        field: 'employmentStatus',
        oldValue: 'active',
        newValue: data.reason,
        effectiveDate: data.lastWorkingDate,
        attachmentIds: [],
      });
    },
    [submitChangeRequest],
  );

  const clearanceProgress = record
    ? Math.round(
        (record.clearanceItems.filter((i) => i.status === 'completed').length /
          record.clearanceItems.length) *
          100,
      )
    : 0;

  return { record, loading, updateClearanceItem, clearanceProgress, submitResignation };
}
