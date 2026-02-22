'use client';

import { useState, useEffect, useCallback } from 'react';

// --- Types ---

export interface GeneralSettings {
  language: string;
  dateFormat: string;
  theme: string;
}

export interface CompanySettings {
  name: string;
  nameTh: string;
  taxId: string;
  socialSecurityNo: string;
  address: string;
}

export interface LeavePolicyConfig {
  type: string;
  nameEn: string;
  nameTh: string;
  maxDays: number;
  carryForward: boolean;
  maxCarryDays: number;
}

export interface PayrollConfig {
  paymentCycle: 'monthly' | 'bi_weekly';
  cutOffDay: number;
  paymentDay: number;
  ssoRate: number;
  pfRate: number;
}

export interface NotificationSettings {
  emailEnabled: boolean;
  inAppEnabled: boolean;
  leaveApproval: boolean;
  payslipReady: boolean;
  workflowUpdates: boolean;
  documentExpiry: boolean;
}

export interface AllSettings {
  general: GeneralSettings;
  company: CompanySettings;
  leavePolicies: LeavePolicyConfig[];
  payroll: PayrollConfig;
  notifications: NotificationSettings;
}

// --- Mock Data ---

const MOCK_GENERAL: GeneralSettings = {
  language: 'en',
  dateFormat: 'DD/MM/YYYY',
  theme: 'light',
};

const MOCK_COMPANY: CompanySettings = {
  name: 'Central Retail Corporation PCL',
  nameTh: 'บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน)',
  taxId: '0107562000251',
  socialSecurityNo: '3100999999',
  address: '999/9 Rama I Rd, Pathum Wan, Bangkok 10330',
};

const MOCK_LEAVE_POLICIES: LeavePolicyConfig[] = [
  { type: 'annual', nameEn: 'Annual Leave', nameTh: 'ลาพักร้อน', maxDays: 15, carryForward: true, maxCarryDays: 5 },
  { type: 'sick', nameEn: 'Sick Leave', nameTh: 'ลาป่วย', maxDays: 30, carryForward: false, maxCarryDays: 0 },
  { type: 'personal', nameEn: 'Personal Leave', nameTh: 'ลากิจ', maxDays: 6, carryForward: false, maxCarryDays: 0 },
  { type: 'maternity', nameEn: 'Maternity Leave', nameTh: 'ลาคลอด', maxDays: 98, carryForward: false, maxCarryDays: 0 },
  { type: 'paternity', nameEn: 'Paternity Leave', nameTh: 'ลาเพื่อดูแลภรรยาคลอด', maxDays: 15, carryForward: false, maxCarryDays: 0 },
];

const MOCK_PAYROLL: PayrollConfig = {
  paymentCycle: 'monthly',
  cutOffDay: 20,
  paymentDay: 25,
  ssoRate: 5,
  pfRate: 5,
};

const MOCK_NOTIFICATIONS: NotificationSettings = {
  emailEnabled: true,
  inAppEnabled: true,
  leaveApproval: true,
  payslipReady: true,
  workflowUpdates: true,
  documentExpiry: false,
};

// --- Hook ---

export function useSettings() {
  const [settings, setSettings] = useState<AllSettings>({
    general: MOCK_GENERAL,
    company: MOCK_COMPANY,
    leavePolicies: MOCK_LEAVE_POLICIES,
    payroll: MOCK_PAYROLL,
    notifications: MOCK_NOTIFICATIONS,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // TODO: Replace with real API call
        await new Promise((r) => setTimeout(r, 400));
        setSettings({
          general: MOCK_GENERAL,
          company: MOCK_COMPANY,
          leavePolicies: MOCK_LEAVE_POLICIES,
          payroll: MOCK_PAYROLL,
          notifications: MOCK_NOTIFICATIONS,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const updateSettings = useCallback(
    async <K extends keyof AllSettings>(section: K, updates: Partial<AllSettings[K]>) => {
      // TODO: Replace with real API call
      await new Promise((r) => setTimeout(r, 300));
      setSettings((prev) => ({
        ...prev,
        [section]: { ...prev[section], ...updates },
      }));
    },
    []
  );

  return {
    settings,
    loading,
    updateSettings,
  };
}
