'use client';

import { useState, useEffect } from 'react';

export interface TalentEmployee {
  id: string;
  name: string;
  position: string;
  department: string;
  performanceRating: number;
  potentialRating: number;
  nineBoxPosition: string;
  isHiPo: boolean;
  yearsOfService: number;
  riskOfLoss: 'low' | 'medium' | 'high';
  photo?: string;
}

export interface NineBoxCell {
  label: string;
  row: number;
  col: number;
  employees: TalentEmployee[];
  color: string;
}

const MOCK_TALENT: TalentEmployee[] = [
  { id: 'EMP001', name: 'Chongrak Tanaka', position: 'Senior Manager', department: 'Sales', performanceRating: 5, potentialRating: 5, nineBoxPosition: 'Star', isHiPo: true, yearsOfService: 8, riskOfLoss: 'medium', photo: 'https://i.pravatar.cc/40?img=11' },
  { id: 'EMP002', name: 'Somchai Patel', position: 'Manager', department: 'Marketing', performanceRating: 4, potentialRating: 5, nineBoxPosition: 'Future Star', isHiPo: true, yearsOfService: 5, riskOfLoss: 'low', photo: 'https://i.pravatar.cc/40?img=12' },
  { id: 'EMP003', name: 'Nattaya Wong', position: 'Team Lead', department: 'IT', performanceRating: 5, potentialRating: 3, nineBoxPosition: 'Consistent Star', isHiPo: false, yearsOfService: 10, riskOfLoss: 'low', photo: 'https://i.pravatar.cc/40?img=5' },
  { id: 'EMP004', name: 'Kittisak Chen', position: 'Analyst', department: 'Finance', performanceRating: 3, potentialRating: 4, nineBoxPosition: 'High Potential', isHiPo: true, yearsOfService: 3, riskOfLoss: 'high', photo: 'https://i.pravatar.cc/40?img=14' },
  { id: 'EMP005', name: 'Priya Sharma', position: 'Coordinator', department: 'HR', performanceRating: 3, potentialRating: 3, nineBoxPosition: 'Core Player', isHiPo: false, yearsOfService: 4, riskOfLoss: 'low', photo: 'https://i.pravatar.cc/40?img=9' },
  { id: 'EMP006', name: 'Warunee Kim', position: 'Director', department: 'Operations', performanceRating: 4, potentialRating: 4, nineBoxPosition: 'Star', isHiPo: true, yearsOfService: 12, riskOfLoss: 'medium', photo: 'https://i.pravatar.cc/40?img=16' },
  { id: 'EMP007', name: 'Thanawat Lee', position: 'Associate', department: 'Sales', performanceRating: 2, potentialRating: 4, nineBoxPosition: 'Potential Gem', isHiPo: false, yearsOfService: 1, riskOfLoss: 'high', photo: 'https://i.pravatar.cc/40?img=17' },
  { id: 'EMP008', name: 'Apinya Nakamura', position: 'Specialist', department: 'IT', performanceRating: 4, potentialRating: 2, nineBoxPosition: 'Trusted Professional', isHiPo: false, yearsOfService: 7, riskOfLoss: 'low', photo: 'https://i.pravatar.cc/40?img=20' },
];

function getNineBoxGrid(employees: TalentEmployee[]): NineBoxCell[] {
  const labels = [
    ['Enigma', 'Future Star', 'Star'],
    ['Potential Gem', 'High Potential', 'Consistent Star'],
    ['Underperformer', 'Core Player', 'Trusted Professional'],
  ];
  const colors = [
    ['bg-yellow-50', 'bg-blue-50', 'bg-green-50'],
    ['bg-yellow-50', 'bg-blue-50', 'bg-green-50'],
    ['bg-red-50', 'bg-yellow-50', 'bg-blue-50'],
  ];

  const cells: NineBoxCell[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const label = labels[row][col];
      cells.push({
        label,
        row,
        col,
        employees: employees.filter((e) => e.nineBoxPosition === label),
        color: colors[row][col],
      });
    }
  }
  return cells;
}

export function useTalent() {
  const [employees, setEmployees] = useState<TalentEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [departmentFilter, setDepartmentFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmployees(MOCK_TALENT);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const filtered = departmentFilter === 'all'
    ? employees
    : employees.filter((e) => e.department === departmentFilter);

  const departments = [...new Set(employees.map((e) => e.department))];
  const hiPoList = filtered.filter((e) => e.isHiPo);
  const nineBoxGrid = getNineBoxGrid(filtered);

  return { employees: filtered, hiPoList, nineBoxGrid, departments, loading, departmentFilter, setDepartmentFilter };
}
