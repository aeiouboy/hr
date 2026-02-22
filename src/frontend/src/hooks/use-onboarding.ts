'use client';

import { useState, useEffect, useCallback } from 'react';

export type OnboardingPhase = 'pre_boarding' | 'day_one' | 'orientation' | 'probation' | 'completed';
export type ItemStatus = 'completed' | 'in_progress' | 'pending' | 'not_applicable';

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  phase: OnboardingPhase;
  status: ItemStatus;
  assignedTo: string;
  completedDate?: string;
  dueDate: string;
}

export interface OnboardingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  startDate: string;
  phase: OnboardingPhase;
  overallProgress: number;
  hrCoordinator: string;
  checklist: ChecklistItem[];
  photo?: string;
}

const MOCK_RECORDS: OnboardingRecord[] = [
  {
    id: 'OB001', employeeId: 'EMP010', employeeName: 'Napat Wongchai', department: 'IT', position: 'Senior Software Engineer',
    startDate: '2026-02-15', phase: 'orientation', overallProgress: 65, hrCoordinator: 'Priya Sharma',
    photo: 'https://i.pravatar.cc/40?img=29',
    checklist: [
      { id: 'CL001', title: 'Employment Contract Signed', description: 'Sign employment contract and NDA', phase: 'pre_boarding', status: 'completed', assignedTo: 'HR', completedDate: '2026-02-10', dueDate: '2026-02-12' },
      { id: 'CL002', title: 'IT Equipment Setup', description: 'Laptop, email, VPN access', phase: 'pre_boarding', status: 'completed', assignedTo: 'IT', completedDate: '2026-02-14', dueDate: '2026-02-14' },
      { id: 'CL003', title: 'Employee ID & Access Card', description: 'Generate employee ID and access card', phase: 'day_one', status: 'completed', assignedTo: 'HR', completedDate: '2026-02-15', dueDate: '2026-02-15' },
      { id: 'CL004', title: 'Welcome Orientation', description: 'Company overview and culture orientation', phase: 'orientation', status: 'in_progress', assignedTo: 'HR', dueDate: '2026-02-20' },
      { id: 'CL005', title: 'Department Introduction', description: 'Meet team members and key stakeholders', phase: 'orientation', status: 'pending', assignedTo: 'Manager', dueDate: '2026-02-22' },
      { id: 'CL006', title: '30-Day Check-in', description: 'First probation evaluation', phase: 'probation', status: 'pending', assignedTo: 'Manager', dueDate: '2026-03-15' },
      { id: 'CL007', title: '90-Day Review', description: 'Formal probation review', phase: 'probation', status: 'pending', assignedTo: 'HR', dueDate: '2026-05-15' },
    ],
  },
  {
    id: 'OB002', employeeId: 'EMP011', employeeName: 'Siriporn Jantarawong', department: 'Marketing', position: 'Marketing Coordinator',
    startDate: '2026-03-01', phase: 'pre_boarding', overallProgress: 15, hrCoordinator: 'Priya Sharma',
    photo: 'https://i.pravatar.cc/40?img=33',
    checklist: [
      { id: 'CL010', title: 'Employment Contract Signed', description: 'Sign employment contract', phase: 'pre_boarding', status: 'completed', assignedTo: 'HR', completedDate: '2026-02-20', dueDate: '2026-02-25' },
      { id: 'CL011', title: 'IT Equipment Setup', description: 'Laptop, email, VPN access', phase: 'pre_boarding', status: 'pending', assignedTo: 'IT', dueDate: '2026-02-28' },
      { id: 'CL012', title: 'Welcome Orientation', description: 'Company overview', phase: 'orientation', status: 'pending', assignedTo: 'HR', dueDate: '2026-03-05' },
    ],
  },
];

export function useOnboarding() {
  const [records, setRecords] = useState<OnboardingRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecords(MOCK_RECORDS);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const markItemComplete = useCallback(async (recordId: string, itemId: string) => {
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== recordId) return r;
        const checklist = r.checklist.map((item) =>
          item.id === itemId ? { ...item, status: 'completed' as ItemStatus, completedDate: new Date().toISOString().split('T')[0] } : item
        );
        const completed = checklist.filter((i) => i.status === 'completed').length;
        const overallProgress = Math.round((completed / checklist.length) * 100);
        return { ...r, checklist, overallProgress };
      })
    );
  }, []);

  return { records, loading, markItemComplete };
}
