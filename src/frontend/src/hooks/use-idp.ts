'use client';

import { useState, useEffect, useCallback } from 'react';

export type ActionStatus = 'not_started' | 'in_progress' | 'completed';
export type IdpStatus = 'draft' | 'submitted' | 'approved' | 'in_progress' | 'completed';

export interface DevelopmentAction {
  id: string;
  title: string;
  description: string;
  actionType: string;
  targetCompetency: string;
  status: ActionStatus;
  startDate: string;
  endDate: string;
  progress: number;
}

export interface IdpPlan {
  id: string;
  year: number;
  title: string;
  status: IdpStatus;
  overallProgress: number;
  createdDate: string;
  employeeSignOff: boolean;
  managerSignOff: boolean;
  approvedBy?: string;
  actions: DevelopmentAction[];
}

export interface CompetencyGap {
  name: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: 'high' | 'medium' | 'low';
}

const MOCK_GAPS: CompetencyGap[] = [
  { name: 'Strategic Thinking', currentLevel: 3, requiredLevel: 5, gap: 2, priority: 'high' },
  { name: 'Digital Literacy', currentLevel: 2, requiredLevel: 4, gap: 2, priority: 'high' },
  { name: 'People Management', currentLevel: 4, requiredLevel: 5, gap: 1, priority: 'medium' },
  { name: 'Financial Acumen', currentLevel: 3, requiredLevel: 4, gap: 1, priority: 'medium' },
  { name: 'Communication', currentLevel: 4, requiredLevel: 4, gap: 0, priority: 'low' },
];

const MOCK_PLAN: IdpPlan = {
  id: 'IDP001', year: 2026, title: 'Leadership Development Plan 2026', status: 'in_progress',
  overallProgress: 45, createdDate: '2026-01-15', employeeSignOff: true, managerSignOff: true,
  approvedBy: 'Surachai Pongsakorn',
  actions: [
    { id: 'A001', title: 'Complete Strategic Management Course', description: 'Enroll in NIDA strategic management program', actionType: 'Training', targetCompetency: 'Strategic Thinking', status: 'in_progress', startDate: '2026-02-01', endDate: '2026-05-31', progress: 60 },
    { id: 'A002', title: 'Digital Transformation Workshop', description: 'Attend 3-day digital transformation workshop', actionType: 'Workshop', targetCompetency: 'Digital Literacy', status: 'not_started', startDate: '2026-04-01', endDate: '2026-04-03', progress: 0 },
    { id: 'A003', title: 'Mentoring Junior Managers', description: 'Mentor 2 junior managers for 6 months', actionType: 'On-the-job', targetCompetency: 'People Management', status: 'in_progress', startDate: '2026-01-15', endDate: '2026-07-15', progress: 40 },
    { id: 'A004', title: 'Finance for Non-Finance Managers', description: 'Online self-study course', actionType: 'Self-study', targetCompetency: 'Financial Acumen', status: 'completed', startDate: '2026-01-01', endDate: '2026-02-15', progress: 100 },
  ],
};

export function useIdp() {
  const [plan, setPlan] = useState<IdpPlan | null>(null);
  const [gaps, setGaps] = useState<CompetencyGap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlan(MOCK_PLAN);
      setGaps(MOCK_GAPS);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const addAction = useCallback(async (action: Omit<DevelopmentAction, 'id'>) => {
    const newAction: DevelopmentAction = { ...action, id: `A${Date.now()}` };
    setPlan((prev) => prev ? { ...prev, actions: [...prev.actions, newAction] } : prev);
    return newAction;
  }, []);

  const updateActionStatus = useCallback(async (actionId: string, status: ActionStatus) => {
    setPlan((prev) => {
      if (!prev) return prev;
      const actions = prev.actions.map((a) =>
        a.id === actionId ? { ...a, status, progress: status === 'completed' ? 100 : a.progress } : a
      );
      const completed = actions.filter((a) => a.status === 'completed').length;
      const overallProgress = Math.round((completed / actions.length) * 100);
      return { ...prev, actions, overallProgress };
    });
  }, []);

  return { plan, gaps, loading, addAction, updateActionStatus };
}
