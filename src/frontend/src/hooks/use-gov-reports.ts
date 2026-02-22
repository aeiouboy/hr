'use client';

import { useState, useEffect, useCallback } from 'react';

// --- Types ---

export type ReportType = 'pnd1' | 'pnd1k' | '50tawi' | 'sps110';
export type ReportStatus = 'generated' | 'submitted' | 'pending';
export type ReportFormat = 'excel' | 'pdf';

export interface GovReport {
  id: string;
  type: ReportType;
  period: string;
  status: ReportStatus;
  generatedAt: string;
  format: ReportFormat;
  fileUrl?: string;
  fileName?: string;
}

export interface ReportTypeInfo {
  type: ReportType;
  nameKey: string;
  fullNameKey: string;
  descriptionKey: string;
  frequency: 'monthly' | 'annual';
  supportsExcel: boolean;
  supportsPdf: boolean;
}

// --- Report type metadata ---

export const REPORT_TYPE_INFO: ReportTypeInfo[] = [
  {
    type: 'pnd1',
    nameKey: 'reports.pnd1.name',
    fullNameKey: 'reports.pnd1.fullName',
    descriptionKey: 'reports.pnd1.description',
    frequency: 'monthly',
    supportsExcel: true,
    supportsPdf: true,
  },
  {
    type: 'pnd1k',
    nameKey: 'reports.pnd1k.name',
    fullNameKey: 'reports.pnd1k.fullName',
    descriptionKey: 'reports.pnd1k.description',
    frequency: 'annual',
    supportsExcel: true,
    supportsPdf: true,
  },
  {
    type: '50tawi',
    nameKey: 'reports.cert50tawi.name',
    fullNameKey: 'reports.cert50tawi.fullName',
    descriptionKey: 'reports.cert50tawi.description',
    frequency: 'annual',
    supportsExcel: false,
    supportsPdf: true,
  },
  {
    type: 'sps110',
    nameKey: 'reports.sps110.name',
    fullNameKey: 'reports.sps110.fullName',
    descriptionKey: 'reports.sps110.description',
    frequency: 'monthly',
    supportsExcel: true,
    supportsPdf: true,
  },
];

// --- Mock Data ---

const MOCK_REPORTS: GovReport[] = [
  {
    id: 'RPT-001',
    type: 'pnd1',
    period: '2026-01',
    status: 'submitted',
    generatedAt: '2026-02-07T09:30:00Z',
    format: 'pdf',
    fileUrl: '/reports/pnd1-2026-01.pdf',
    fileName: 'PND1_January_2026.pdf',
  },
  {
    id: 'RPT-002',
    type: 'sps110',
    period: '2026-01',
    status: 'submitted',
    generatedAt: '2026-02-07T10:00:00Z',
    format: 'excel',
    fileUrl: '/reports/sps110-2026-01.xlsx',
    fileName: 'SSO110_January_2026.xlsx',
  },
  {
    id: 'RPT-003',
    type: 'pnd1',
    period: '2026-02',
    status: 'generated',
    generatedAt: '2026-02-20T14:15:00Z',
    format: 'pdf',
    fileUrl: '/reports/pnd1-2026-02.pdf',
    fileName: 'PND1_February_2026.pdf',
  },
  {
    id: 'RPT-004',
    type: 'pnd1k',
    period: '2025',
    status: 'submitted',
    generatedAt: '2026-01-15T08:00:00Z',
    format: 'excel',
    fileUrl: '/reports/pnd1k-2025.xlsx',
    fileName: 'PND1K_Annual_2025.xlsx',
  },
  {
    id: 'RPT-005',
    type: '50tawi',
    period: '2025',
    status: 'generated',
    generatedAt: '2026-01-20T11:30:00Z',
    format: 'pdf',
    fileUrl: '/reports/50tawi-2025.pdf',
    fileName: '50Tawi_Annual_2025.pdf',
  },
];

// --- Hook ---

export function useGovReports() {
  const [reports, setReports] = useState<GovReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // TODO: Replace with real API call
        await new Promise((r) => setTimeout(r, 400));
        setReports(MOCK_REPORTS);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const generateReport = useCallback(
    async (type: ReportType, period: string, format: ReportFormat): Promise<GovReport> => {
      setGenerating(true);
      try {
        // TODO: Replace with real API call
        await new Promise((r) => setTimeout(r, 1500));

        const typeNames: Record<ReportType, string> = {
          pnd1: 'PND1',
          pnd1k: 'PND1K',
          '50tawi': '50Tawi',
          sps110: 'SSO110',
        };

        const ext = format === 'excel' ? 'xlsx' : 'pdf';
        const newReport: GovReport = {
          id: `RPT-${Date.now()}`,
          type,
          period,
          status: 'generated',
          generatedAt: new Date().toISOString(),
          format,
          fileUrl: `/reports/${type}-${period}.${ext}`,
          fileName: `${typeNames[type]}_${period}.${ext}`,
        };

        setReports((prev) => [newReport, ...prev]);
        return newReport;
      } finally {
        setGenerating(false);
      }
    },
    []
  );

  return {
    reports,
    loading,
    generating,
    generateReport,
  };
}
