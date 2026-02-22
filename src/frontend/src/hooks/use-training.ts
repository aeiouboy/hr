'use client';

import { useState, useEffect } from 'react';

export interface TrainingRecord {
  id: string;
  courseCode: string;
  courseName: string;
  category: string;
  type: string;
  provider: string;
  instructor: string;
  hours: number;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in_progress' | 'registered';
  score?: number;
  certificateUrl?: string;
  cost: number;
  mandatory: boolean;
}

const MOCK_RECORDS: TrainingRecord[] = [
  { id: 'TR001', courseCode: 'LDR-101', courseName: 'Leadership Essentials', category: 'Leadership', type: 'Classroom', provider: 'CG Academy', instructor: 'Dr. Somkid', hours: 16, startDate: '2026-01-10', endDate: '2026-01-11', status: 'completed', score: 90, certificateUrl: '#', cost: 15000, mandatory: true },
  { id: 'TR002', courseCode: 'DIG-201', courseName: 'Digital Transformation', category: 'Technology', type: 'Online', provider: 'Coursera', instructor: 'Prof. Smith', hours: 8, startDate: '2026-02-01', endDate: '2026-02-15', status: 'in_progress', cost: 0, mandatory: false },
  { id: 'TR003', courseCode: 'COM-201', courseName: 'Effective Communication', category: 'Soft Skills', type: 'Classroom', provider: 'CG Academy', instructor: 'Ajarn Nisa', hours: 8, startDate: '2025-11-08', endDate: '2025-11-10', status: 'completed', score: 92, certificateUrl: '#', cost: 8000, mandatory: true },
  { id: 'TR004', courseCode: 'FIN-102', courseName: 'Finance for Non-Finance', category: 'Finance', type: 'Online', provider: 'LinkedIn Learning', instructor: 'Jane Doe', hours: 12, startDate: '2026-01-05', endDate: '2026-01-20', status: 'completed', score: 88, certificateUrl: '#', cost: 0, mandatory: false },
  { id: 'TR005', courseCode: 'SAF-101', courseName: 'Workplace Safety', category: 'Compliance', type: 'Online', provider: 'Internal', instructor: 'Safety Team', hours: 4, startDate: '2025-06-01', endDate: '2025-06-01', status: 'completed', score: 95, cost: 0, mandatory: true },
];

export function useTraining() {
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setRecords(MOCK_RECORDS);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const categories = [...new Set(records.map((r) => r.category))];
  const years = [...new Set(records.map((r) => new Date(r.startDate).getFullYear().toString()))].sort().reverse();

  const filtered = records.filter((r) => {
    const matchYear = yearFilter === 'all' || new Date(r.startDate).getFullYear().toString() === yearFilter;
    const matchCategory = categoryFilter === 'all' || r.category === categoryFilter;
    return matchYear && matchCategory;
  });

  const totalHours = filtered.reduce((sum, r) => sum + r.hours, 0);
  const completedCount = filtered.filter((r) => r.status === 'completed').length;

  return { records: filtered, categories, years, loading, totalHours, completedCount, yearFilter, setYearFilter, categoryFilter, setCategoryFilter };
}
