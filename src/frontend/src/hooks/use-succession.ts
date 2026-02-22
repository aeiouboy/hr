'use client';

import { useState, useEffect } from 'react';

export type Readiness = 'ready_now' | '1_2_years' | '3_plus_years';
export type RiskLevel = 'high' | 'medium' | 'low';

export interface Successor {
  id: string;
  name: string;
  position: string;
  department: string;
  readiness: Readiness;
  performanceRating: string;
  potentialRating: string;
  gaps: string[];
  photo?: string;
}

export interface SuccessionPlan {
  id: string;
  positionTitle: string;
  department: string;
  incumbentName: string;
  incumbentPhoto?: string;
  yearsInRole: number;
  riskLevel: RiskLevel;
  riskReason: string;
  retirementDate?: string;
  successors: Successor[];
}

const MOCK_PLANS: SuccessionPlan[] = [
  {
    id: 'SP001', positionTitle: 'VP of Sales', department: 'Sales',
    incumbentName: 'Surachai Pongsakorn', incumbentPhoto: 'https://i.pravatar.cc/40?img=30',
    yearsInRole: 6, riskLevel: 'high', riskReason: 'Approaching retirement',
    retirementDate: '2027-06-30',
    successors: [
      { id: 'EMP001', name: 'Chongrak Tanaka', position: 'Senior Manager', department: 'Sales', readiness: 'ready_now', performanceRating: 'exceeds_expectations', potentialRating: 'high', gaps: [], photo: 'https://i.pravatar.cc/40?img=11' },
      { id: 'EMP002', name: 'Somchai Patel', position: 'Manager', department: 'Marketing', readiness: '1_2_years', performanceRating: 'meets_expectations', potentialRating: 'high', gaps: ['Strategic Planning', 'P&L Management'], photo: 'https://i.pravatar.cc/40?img=12' },
    ],
  },
  {
    id: 'SP002', positionTitle: 'CTO', department: 'IT',
    incumbentName: 'Piyawat Techakul', incumbentPhoto: 'https://i.pravatar.cc/40?img=31',
    yearsInRole: 4, riskLevel: 'medium', riskReason: 'Flight risk - market demand',
    successors: [
      { id: 'EMP003', name: 'Nattaya Wong', position: 'IT Director', department: 'IT', readiness: '1_2_years', performanceRating: 'exceeds_expectations', potentialRating: 'medium', gaps: ['Cloud Architecture'], photo: 'https://i.pravatar.cc/40?img=5' },
    ],
  },
  {
    id: 'SP003', positionTitle: 'CFO', department: 'Finance',
    incumbentName: 'Thidarat Suwan', incumbentPhoto: 'https://i.pravatar.cc/40?img=32',
    yearsInRole: 8, riskLevel: 'low', riskReason: 'Stable position',
    successors: [
      { id: 'EMP004', name: 'Kittisak Chen', position: 'Finance Manager', department: 'Finance', readiness: '3_plus_years', performanceRating: 'meets_expectations', potentialRating: 'high', gaps: ['M&A Experience', 'Board Communication'], photo: 'https://i.pravatar.cc/40?img=14' },
    ],
  },
];

export function useSuccession() {
  const [plans, setPlans] = useState<SuccessionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlans(MOCK_PLANS);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    totalPositions: plans.length,
    highRisk: plans.filter((p) => p.riskLevel === 'high').length,
    coverageRatio: plans.length > 0
      ? Math.round((plans.filter((p) => p.successors.length > 0).length / plans.length) * 100)
      : 0,
    readyNowRatio: plans.length > 0
      ? Math.round((plans.filter((p) => p.successors.some((s) => s.readiness === 'ready_now')).length / plans.length) * 100)
      : 0,
  };

  return { plans, stats, loading };
}
