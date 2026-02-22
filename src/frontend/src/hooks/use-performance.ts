'use client';

import { useState, useEffect, useCallback } from 'react';

export type GoalCategory = 'kpi' | 'gbest' | 'development';
export type GoalStatus = 'draft' | 'submitted' | 'approved' | 'in_progress' | 'completed' | 'sent_back';
export type MetricType = 'number' | 'percentage' | 'yes_no' | 'rating';
export type EvalStatus = 'self_assessment' | 'manager_review' | 'calibration' | 'confirmed' | 'acknowledged';

export interface Goal {
  id: string;
  nameEn: string;
  nameTh: string;
  descriptionEn: string;
  descriptionTh: string;
  category: GoalCategory;
  metricType: MetricType;
  targetValue: number;
  actualValue: number;
  weight: number;
  status: GoalStatus;
  startDate: string;
  endDate: string;
  reviewPeriod: string;
  year: number;
}

export interface Evaluation {
  id: string;
  period: string;
  year: number;
  status: EvalStatus;
  selfRatings: Record<string, number>;
  managerRatings: Record<string, number>;
  finalRating?: number;
  comments?: string;
  submittedAt?: string;
}

const MOCK_GOALS: Goal[] = [
  {
    id: 'G001', nameEn: 'Increase Sales Revenue', nameTh: 'เพิ่มรายได้จากการขาย',
    descriptionEn: 'Achieve 15% growth in quarterly sales', descriptionTh: 'บรรลุการเติบโตของยอดขายรายไตรมาส 15%',
    category: 'kpi', metricType: 'percentage', targetValue: 15, actualValue: 12, weight: 40,
    status: 'in_progress', startDate: '2026-01-01', endDate: '2026-03-31', reviewPeriod: 'Q1', year: 2026,
  },
  {
    id: 'G002', nameEn: 'Customer Satisfaction Score', nameTh: 'คะแนนความพึงพอใจลูกค้า',
    descriptionEn: 'Maintain CSAT above 4.5/5', descriptionTh: 'รักษา CSAT เหนือ 4.5/5',
    category: 'kpi', metricType: 'number', targetValue: 4.5, actualValue: 4.3, weight: 30,
    status: 'in_progress', startDate: '2026-01-01', endDate: '2026-03-31', reviewPeriod: 'Q1', year: 2026,
  },
  {
    id: 'G003', nameEn: 'Leadership Development', nameTh: 'พัฒนาภาวะผู้นำ',
    descriptionEn: 'Complete leadership training program', descriptionTh: 'จบหลักสูตรพัฒนาภาวะผู้นำ',
    category: 'gbest', metricType: 'yes_no', targetValue: 1, actualValue: 0, weight: 15,
    status: 'submitted', startDate: '2026-01-01', endDate: '2026-06-30', reviewPeriod: 'H1', year: 2026,
  },
  {
    id: 'G004', nameEn: 'Process Improvement', nameTh: 'ปรับปรุงกระบวนการ',
    descriptionEn: 'Reduce order processing time by 20%', descriptionTh: 'ลดเวลาดำเนินการสั่งซื้อ 20%',
    category: 'development', metricType: 'percentage', targetValue: 20, actualValue: 8, weight: 15,
    status: 'draft', startDate: '2026-01-01', endDate: '2026-12-31', reviewPeriod: 'Annual', year: 2026,
  },
];

const MOCK_EVALUATIONS: Evaluation[] = [
  {
    id: 'E001', period: 'H1', year: 2026, status: 'self_assessment',
    selfRatings: { G001: 4, G002: 3 }, managerRatings: {},
  },
  {
    id: 'E002', period: 'Annual', year: 2025, status: 'acknowledged',
    selfRatings: { G001: 4, G002: 4, G003: 5 }, managerRatings: { G001: 4, G002: 3, G003: 4 },
    finalRating: 3.8, submittedAt: '2025-12-20',
  },
];

export function usePerformance() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGoals(MOCK_GOALS);
      setEvaluations(MOCK_EVALUATIONS);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const createGoal = useCallback(async (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = { ...goal, id: `G${Date.now()}` };
    setGoals((prev) => [...prev, newGoal]);
    return newGoal;
  }, []);

  const updateGoal = useCallback(async (id: string, updates: Partial<Goal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  }, []);

  const deleteGoal = useCallback(async (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const submitEvaluation = useCallback(async (evalId: string, ratings: Record<string, number>) => {
    setEvaluations((prev) =>
      prev.map((e) => (e.id === evalId ? { ...e, selfRatings: ratings, status: 'manager_review' as EvalStatus } : e))
    );
  }, []);

  return { goals, evaluations, loading, createGoal, updateGoal, deleteGoal, submitEvaluation };
}
