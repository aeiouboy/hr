'use client';

// STA-28 PR-A — useDirectReports hook (mock phase: setTimeout async, { data, isLoading, error } shape)
import { useState, useEffect } from 'react';

export interface Employee {
  id: string;
  nameTh: string;
  nameEn: string;
  position: string;
  department: string;
  managerId: string;
  photo?: string;
}

export interface DirectReportsHookResult {
  data: Employee[];
  isLoading: boolean;
  error: Error | null;
}

// Mock direct-report employees seeded under manager EMP001 (จงรักษ์ ทานากะ)
const MOCK_DIRECT_REPORTS: Employee[] = [
  {
    id: 'EMP_DR001',
    nameTh: 'นรุเชน วรพัฒน์ภาวัน',
    nameEn: 'Naruechon Woraphatphawan',
    position: 'Functional Trainee',
    department: 'Product Management',
    managerId: 'EMP001',
    photo: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: 'EMP_DR002',
    nameTh: 'ปัณณภา เทียนชัย',
    nameEn: 'Punnapa Thianchai',
    position: 'Functional Trainee',
    department: 'Product Management',
    managerId: 'EMP001',
    photo: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 'EMP_DR003',
    nameTh: 'สมศักดิ์ มั่นคง',
    nameEn: 'Somsak Mankong',
    position: 'Business Analyst',
    department: 'Product Management',
    managerId: 'EMP001',
    photo: 'https://i.pravatar.cc/150?img=16',
  },
  {
    id: 'EMP_DR004',
    nameTh: 'วิภาวดี สุขสวัสดิ์',
    nameEn: 'Wiphawadee Suksawat',
    position: 'UX Designer',
    department: 'Product Management',
    managerId: 'EMP001',
    photo: 'https://i.pravatar.cc/150?img=17',
  },
  {
    id: 'EMP_DR005',
    nameTh: 'ธนกร ลาภวิบูลย์',
    nameEn: 'Thanakorn Lapwiboon',
    position: 'Product Analyst',
    department: 'Product Management',
    managerId: 'EMP001',
    photo: 'https://i.pravatar.cc/150?img=18',
  },
];

export function useDirectReports(managerId?: string): DirectReportsHookResult {
  const [data, setData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        // Mock phase: filter by managerId or return all mock reports
        const reports = managerId
          ? MOCK_DIRECT_REPORTS.filter((e) => e.managerId === managerId)
          : MOCK_DIRECT_REPORTS;
        setData(reports);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load direct reports'));
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [managerId]);

  return { data, isLoading, error };
}
