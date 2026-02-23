'use client';

import { useState, useEffect, useCallback } from 'react';

// --- Types ---

export type ReferralStatus =
  | 'draft'
  | 'submitted'
  | 'pending_manager'
  | 'pending_hr'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'letter_issued';

export interface Hospital {
  id: string;
  name: string;
  nameEn: string;
  nameTh: string;
  branch?: string;
  address?: string;
}

export interface TimelineEvent {
  action: string;
  actor: string;
  actorName: string;
  date: string;
  note?: string;
}

export interface HospitalReferral {
  id: string;
  employeeId: string;
  employeeName: string;
  hospitalName: string;
  hospitalBranch?: string;
  reason: string;
  preferredDate: string;
  validFrom?: string;
  validUntil?: string;
  status: ReferralStatus;
  referralNumber?: string;
  approvedBy?: string;
  approvedAt?: string;
  issuedBy?: string;
  issuedAt?: string;
  rejectedBy?: string;
  rejectedReason?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
}

// --- Mock Data ---

const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'HOSP-001',
    name: 'Bangkok Hospital',
    nameEn: 'Bangkok Hospital',
    nameTh: 'โรงพยาบาลกรุงเทพ',
    branch: 'Headquarters',
    address: '2 Soi Soonvijai 7, New Petchburi Rd, Bangkok 10310',
  },
  {
    id: 'HOSP-002',
    name: 'Bumrungrad International Hospital',
    nameEn: 'Bumrungrad International Hospital',
    nameTh: 'โรงพยาบาลบำรุงราษฎร์',
    address: '33 Sukhumvit 3, Wattana, Bangkok 10110',
  },
  {
    id: 'HOSP-003',
    name: 'BNH Hospital',
    nameEn: 'BNH Hospital',
    nameTh: 'โรงพยาบาล BNH',
    address: '9/1 Convent Rd, Silom, Bangkok 10500',
  },
  {
    id: 'HOSP-004',
    name: 'Samitivej Sukhumvit Hospital',
    nameEn: 'Samitivej Sukhumvit Hospital',
    nameTh: 'โรงพยาบาลสมิติเวช สุขุมวิท',
    branch: 'Sukhumvit',
    address: '133 Sukhumvit 49, Khlong Toei Nua, Bangkok 10110',
  },
  {
    id: 'HOSP-005',
    name: 'Phyathai 2 Hospital',
    nameEn: 'Phyathai 2 Hospital',
    nameTh: 'โรงพยาบาลพญาไท 2',
    address: '943 Phahonyothin Rd, Phaya Thai, Bangkok 10400',
  },
  {
    id: 'HOSP-006',
    name: 'Ramathibodi Hospital',
    nameEn: 'Ramathibodi Hospital',
    nameTh: 'โรงพยาบาลรามาธิบดี',
    address: '270 Rama VI Rd, Ratchathewi, Bangkok 10400',
  },
  {
    id: 'HOSP-007',
    name: 'Siriraj Hospital',
    nameEn: 'Siriraj Hospital',
    nameTh: 'โรงพยาบาลศิริราช',
    address: '2 Wang Lang Rd, Bangkok Noi, Bangkok 10700',
  },
  {
    id: 'HOSP-008',
    name: 'Paolo Memorial Hospital Phaholyothin',
    nameEn: 'Paolo Memorial Hospital Phaholyothin',
    nameTh: 'โรงพยาบาลเปาโล พหลโยธิน',
    branch: 'Phaholyothin',
    address: '1317/44 Phaholyothin Rd, Chatuchak, Bangkok 10900',
  },
  {
    id: 'HOSP-009',
    name: 'Kasemrad Hospital',
    nameEn: 'Kasemrad Hospital',
    nameTh: 'โรงพยาบาลเกษมราษฎร์',
    address: '1502 Lat Phrao Rd, Wang Thonglang, Bangkok 10310',
  },
  {
    id: 'HOSP-010',
    name: 'Vibhavadi Hospital',
    nameEn: 'Vibhavadi Hospital',
    nameTh: 'โรงพยาบาลวิภาวดี',
    address: '1 Vibhavadi Rangsit Rd, Chatuchak, Bangkok 10900',
  },
];

const MOCK_REFERRALS: HospitalReferral[] = [
  {
    id: 'REF-001',
    employeeId: 'EMP001',
    employeeName: 'Somchai Jaidee',
    hospitalName: 'Bumrungrad International Hospital',
    reason: 'Specialist consultation for chronic back pain',
    preferredDate: '2026-01-15',
    validFrom: '2026-01-15',
    validUntil: '2026-03-15',
    status: 'letter_issued',
    referralNumber: 'REF-2026-0001',
    approvedBy: 'EMP_MGR001',
    approvedAt: '2026-01-10T10:00:00Z',
    issuedBy: 'EMP_HR001',
    issuedAt: '2026-01-12T14:30:00Z',
    createdAt: '2026-01-08T09:00:00Z',
    updatedAt: '2026-01-12T14:30:00Z',
    timeline: [
      {
        action: 'created',
        actor: 'EMP001',
        actorName: 'Somchai Jaidee',
        date: '2026-01-08T09:00:00Z',
        note: 'Referral request created',
      },
      {
        action: 'submitted',
        actor: 'EMP001',
        actorName: 'Somchai Jaidee',
        date: '2026-01-08T09:05:00Z',
        note: 'Submitted for manager approval',
      },
      {
        action: 'approved_by_manager',
        actor: 'EMP_MGR001',
        actorName: 'Rungrote Amnuaysopon',
        date: '2026-01-10T10:00:00Z',
        note: 'Approved. Employee has valid medical need.',
      },
      {
        action: 'approved_by_hr',
        actor: 'EMP_HR001',
        actorName: 'Kannika Srisawat',
        date: '2026-01-11T11:00:00Z',
      },
      {
        action: 'letter_issued',
        actor: 'EMP_HR001',
        actorName: 'Kannika Srisawat',
        date: '2026-01-12T14:30:00Z',
        note: 'Referral letter issued. Valid until 2026-03-15.',
      },
    ],
  },
  {
    id: 'REF-002',
    employeeId: 'EMP001',
    employeeName: 'Somchai Jaidee',
    hospitalName: 'Bangkok Hospital',
    hospitalBranch: 'Headquarters',
    reason: 'Annual health check-up and cardiac screening',
    preferredDate: '2026-02-20',
    status: 'pending_hr',
    approvedBy: 'EMP_MGR001',
    approvedAt: '2026-02-18T09:30:00Z',
    notes: 'Priority check-up recommended by company physician',
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-02-18T09:30:00Z',
    timeline: [
      {
        action: 'created',
        actor: 'EMP001',
        actorName: 'Somchai Jaidee',
        date: '2026-02-15T10:00:00Z',
      },
      {
        action: 'submitted',
        actor: 'EMP001',
        actorName: 'Somchai Jaidee',
        date: '2026-02-15T10:05:00Z',
      },
      {
        action: 'approved_by_manager',
        actor: 'EMP_MGR001',
        actorName: 'Rungrote Amnuaysopon',
        date: '2026-02-18T09:30:00Z',
        note: 'Approved. Please process as soon as possible.',
      },
    ],
  },
  {
    id: 'REF-003',
    employeeId: 'EMP001',
    employeeName: 'Somchai Jaidee',
    hospitalName: 'Ramathibodi Hospital',
    reason: 'Eye examination and potential corrective surgery consultation',
    preferredDate: '2026-01-25',
    status: 'rejected',
    rejectedBy: 'EMP_MGR001',
    rejectedReason: 'Please consult with the company doctor first before requesting an external referral',
    createdAt: '2026-01-20T14:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
    timeline: [
      {
        action: 'created',
        actor: 'EMP001',
        actorName: 'Somchai Jaidee',
        date: '2026-01-20T14:00:00Z',
      },
      {
        action: 'submitted',
        actor: 'EMP001',
        actorName: 'Somchai Jaidee',
        date: '2026-01-20T14:05:00Z',
      },
      {
        action: 'rejected',
        actor: 'EMP_MGR001',
        actorName: 'Rungrote Amnuaysopon',
        date: '2026-01-22T11:00:00Z',
        note: 'Please consult with the company doctor first before requesting an external referral',
      },
    ],
  },
  {
    id: 'REF-004',
    employeeId: 'EMP001',
    employeeName: 'Somchai Jaidee',
    hospitalName: 'Samitivej Sukhumvit Hospital',
    hospitalBranch: 'Sukhumvit',
    reason: 'Follow-up consultation for knee injury',
    preferredDate: '2026-03-05',
    status: 'draft',
    createdAt: '2026-02-22T16:00:00Z',
    updatedAt: '2026-02-22T16:00:00Z',
    timeline: [
      {
        action: 'created',
        actor: 'EMP001',
        actorName: 'Somchai Jaidee',
        date: '2026-02-22T16:00:00Z',
      },
    ],
  },
];

// --- Hook ---

export function useHospitalReferral(employeeId?: string) {
  const [referrals, setReferrals] = useState<HospitalReferral[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with real API calls
        await new Promise((r) => setTimeout(r, 400));
        setReferrals(MOCK_REFERRALS);
        setHospitals(MOCK_HOSPITALS);
      } catch {
        setError('Failed to load hospital referral data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [employeeId]);

  const createReferral = useCallback(async (data: Partial<HospitalReferral>) => {
    setSubmitting(true);
    try {
      // TODO: Replace with real API call
      await new Promise((r) => setTimeout(r, 500));
      const now = new Date().toISOString();
      const newReferral: HospitalReferral = {
        ...data,
        id: `REF-${Date.now()}`,
        employeeId: data.employeeId || '',
        employeeName: data.employeeName || '',
        hospitalName: data.hospitalName || '',
        hospitalBranch: data.hospitalBranch,
        reason: data.reason || '',
        preferredDate: data.preferredDate || '',
        status: 'draft',
        notes: data.notes,
        createdAt: now,
        updatedAt: now,
        timeline: [
          {
            action: 'created',
            actor: data.employeeId || '',
            actorName: data.employeeName || '',
            date: now,
          },
        ],
      } as HospitalReferral;
      setReferrals((prev) => [newReferral, ...prev]);
      return newReferral;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const submitReferral = useCallback(async (id: string) => {
    setSubmitting(true);
    try {
      // TODO: Replace with real API call
      await new Promise((r) => setTimeout(r, 500));
      const now = new Date().toISOString();
      setReferrals((prev) =>
        prev.map((r) => {
          if (r.id !== id) return r;
          const timelineEvent: TimelineEvent = {
            action: 'submitted',
            actor: r.employeeId,
            actorName: r.employeeName,
            date: now,
            note: 'Submitted for manager approval',
          };
          return {
            ...r,
            status: 'pending_manager' as ReferralStatus,
            updatedAt: now,
            timeline: [...r.timeline, timelineEvent],
          };
        })
      );
    } finally {
      setSubmitting(false);
    }
  }, []);

  const cancelReferral = useCallback(async (id: string) => {
    // TODO: Replace with real API call
    await new Promise((r) => setTimeout(r, 300));
    const now = new Date().toISOString();
    setReferrals((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const timelineEvent: TimelineEvent = {
          action: 'cancelled',
          actor: r.employeeId,
          actorName: r.employeeName,
          date: now,
          note: 'Referral cancelled by employee',
        };
        return {
          ...r,
          status: 'cancelled' as ReferralStatus,
          updatedAt: now,
          timeline: [...r.timeline, timelineEvent],
        };
      })
    );
  }, []);

  return {
    referrals,
    hospitals,
    loading,
    error,
    submitting,
    createReferral,
    submitReferral,
    cancelReferral,
  };
}
