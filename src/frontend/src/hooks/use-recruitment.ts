'use client';

import { useState, useEffect, useCallback } from 'react';

export type JobStatus = 'draft' | 'open' | 'closed';
export type ApplicationStatus = 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';

export interface JobPosting {
  id: string;
  titleEn: string;
  titleTh: string;
  department: string;
  location: string;
  employmentType: string;
  salaryMin: number;
  salaryMax: number;
  openings: number;
  applicationCount: number;
  status: JobStatus;
  postingDate: string;
  closingDate: string;
  urgent: boolean;
  description: string;
  requirements: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: ApplicationStatus;
  appliedDate: string;
  source: string;
  experience: string;
  skills: string[];
  notes: string;
  photo?: string;
}

const MOCK_JOBS: JobPosting[] = [
  { id: 'JOB001', titleEn: 'Senior Software Engineer', titleTh: 'วิศวกรซอฟต์แวร์อาวุโส', department: 'IT', location: 'Bangkok - Central World', employmentType: 'Full-time', salaryMin: 80000, salaryMax: 120000, openings: 2, applicationCount: 15, status: 'open', postingDate: '2026-01-15', closingDate: '2026-03-15', urgent: true, description: 'Join our digital team', requirements: ['5+ years experience', 'React/TypeScript', 'Cloud platforms'] },
  { id: 'JOB002', titleEn: 'Marketing Manager', titleTh: 'ผู้จัดการฝ่ายการตลาด', department: 'Marketing', location: 'Bangkok - Central Lardprao', employmentType: 'Full-time', salaryMin: 60000, salaryMax: 90000, openings: 1, applicationCount: 8, status: 'open', postingDate: '2026-02-01', closingDate: '2026-03-31', urgent: false, description: 'Lead marketing campaigns', requirements: ['3+ years in retail marketing', 'Digital marketing expertise'] },
  { id: 'JOB003', titleEn: 'Store Supervisor', titleTh: 'หัวหน้าร้าน', department: 'Operations', location: 'Chiang Mai Branch', employmentType: 'Full-time', salaryMin: 25000, salaryMax: 35000, openings: 3, applicationCount: 22, status: 'open', postingDate: '2026-02-10', closingDate: '2026-04-10', urgent: false, description: 'Supervise store operations', requirements: ['2+ years retail experience', 'Team leadership'] },
];

const MOCK_CANDIDATES: Candidate[] = [
  { id: 'CAN001', name: 'Anya Kowalski', email: 'anya.k@email.com', phone: '+66 81 234 5678', position: 'Senior Software Engineer', status: 'interview', appliedDate: '2026-01-20', source: 'LinkedIn', experience: '6 years', skills: ['React', 'TypeScript', 'AWS'], notes: 'Strong technical background', photo: 'https://i.pravatar.cc/40?img=25' },
  { id: 'CAN002', name: 'Thanapat Srisuk', email: 'thanapat.s@email.com', phone: '+66 89 876 5432', position: 'Senior Software Engineer', status: 'screening', appliedDate: '2026-02-01', source: 'JobsDB', experience: '5 years', skills: ['Node.js', 'Python', 'GCP'], notes: '', photo: 'https://i.pravatar.cc/40?img=26' },
  { id: 'CAN003', name: 'Manee Chaiyaphum', email: 'manee.c@email.com', phone: '+66 92 111 2222', position: 'Marketing Manager', status: 'offer', appliedDate: '2026-02-05', source: 'Referral', experience: '4 years', skills: ['Digital Marketing', 'Brand Management'], notes: 'Referred by VP Marketing', photo: 'https://i.pravatar.cc/40?img=27' },
  { id: 'CAN004', name: 'Sompong Kiatnarong', email: 'sompong.k@email.com', phone: '+66 85 333 4444', position: 'Store Supervisor', status: 'applied', appliedDate: '2026-02-15', source: 'Walk-in', experience: '3 years', skills: ['Retail', 'Inventory Management'], notes: '', photo: 'https://i.pravatar.cc/40?img=28' },
  { id: 'CAN005', name: 'Napat Wongchai', email: 'napat.w@email.com', phone: '+66 86 555 6666', position: 'Senior Software Engineer', status: 'hired', appliedDate: '2026-01-18', source: 'LinkedIn', experience: '7 years', skills: ['React', 'Go', 'Kubernetes'], notes: 'Joined on Feb 15', photo: 'https://i.pravatar.cc/40?img=29' },
];

export function useRecruitment() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setJobs(MOCK_JOBS);
      setCandidates(MOCK_CANDIDATES);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const updateCandidateStatus = useCallback(async (candidateId: string, status: ApplicationStatus) => {
    setCandidates((prev) => prev.map((c) => (c.id === candidateId ? { ...c, status } : c)));
  }, []);

  const stats = {
    openPositions: jobs.filter((j) => j.status === 'open').length,
    totalApplications: candidates.length,
    newApplications: candidates.filter((c) => c.status === 'applied').length,
    inInterview: candidates.filter((c) => c.status === 'interview').length,
  };

  return { jobs, candidates, stats, loading, updateCandidateStatus };
}
