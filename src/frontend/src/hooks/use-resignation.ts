'use client';

import { useState, useEffect, useCallback } from 'react';

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

const MOCK_RESIGNATION: ResignationRecord = {
  id: 'RES001', employeeId: 'EMP009', employeeName: 'Worrawut Sutthisak',
  resignationDate: '2026-02-01', lastWorkingDate: '2026-03-01',
  reasonType: 'personal', reasonDetails: 'Relocating to another city',
  noticePeriod: 30, status: 'in_progress', submittedDate: '2026-02-01',
  exitInterviewDate: '2026-02-25',
  clearanceItems: [
    { id: 'CLR001', title: 'Return Laptop & Equipment', responsibleParty: 'IT Department', status: 'completed', signedOffDate: '2026-02-20' },
    { id: 'CLR002', title: 'Return Access Card & Keys', responsibleParty: 'Admin', status: 'completed', signedOffDate: '2026-02-20' },
    { id: 'CLR003', title: 'Knowledge Transfer', responsibleParty: 'Manager', status: 'in_progress' },
    { id: 'CLR004', title: 'Outstanding Leave Settlement', responsibleParty: 'HR', status: 'pending' },
    { id: 'CLR005', title: 'Final Payroll Processing', responsibleParty: 'Payroll', status: 'pending' },
    { id: 'CLR006', title: 'Benefits Termination', responsibleParty: 'HR', status: 'pending' },
  ],
  settlement: {
    outstandingSalary: 45000,
    leaveEncashment: 12500,
    bonus: 0,
    loanDeductions: 5000,
    pfBalance: 180000,
    netPayable: 52500,
  },
};

export function useResignation() {
  const [record, setRecord] = useState<ResignationRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecord(MOCK_RESIGNATION);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const updateClearanceItem = useCallback(async (itemId: string, status: ClearanceItem['status']) => {
    setRecord((prev) => {
      if (!prev) return prev;
      const clearanceItems = prev.clearanceItems.map((item) =>
        item.id === itemId ? { ...item, status, signedOffDate: status === 'completed' ? new Date().toISOString().split('T')[0] : item.signedOffDate } : item
      );
      return { ...prev, clearanceItems };
    });
  }, []);

  const submitResignation = useCallback(async (data: { lastWorkingDate: string; reason: string; handoverNotes: string }) => {
    await new Promise((r) => setTimeout(r, 300));
    const newRecord: ResignationRecord = {
      id: `RES${Date.now()}`,
      employeeId: 'EMP000',
      employeeName: 'Current User',
      resignationDate: new Date().toISOString().split('T')[0],
      lastWorkingDate: data.lastWorkingDate,
      reasonType: 'personal',
      reasonDetails: data.reason,
      noticePeriod: 30,
      status: 'submitted',
      submittedDate: new Date().toISOString().split('T')[0],
      clearanceItems: [
        { id: 'CLR001', title: 'Return Laptop & Equipment', responsibleParty: 'IT Department', status: 'pending' },
        { id: 'CLR002', title: 'Return Access Card & Keys', responsibleParty: 'Admin', status: 'pending' },
        { id: 'CLR003', title: 'Knowledge Transfer', responsibleParty: 'Manager', status: 'pending' },
        { id: 'CLR004', title: 'Outstanding Leave Settlement', responsibleParty: 'HR', status: 'pending' },
      ],
    };
    setRecord(newRecord);
  }, []);

  const clearanceProgress = record
    ? Math.round((record.clearanceItems.filter((i) => i.status === 'completed').length / record.clearanceItems.length) * 100)
    : 0;

  return { record, loading, updateClearanceItem, clearanceProgress, submitResignation };
}
