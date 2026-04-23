// useDataManagement.ts — Zustand store สำหรับ Data Management module (Phase 5 Part E)
// ครอบคลุม BRD #162-164, #190-207: Reporting, Integration, System Features, Security & Governance
// C7 SSoT: 6th store — FINAL store ของ EC Admin Portal track
// Cross-store: appendAudit → useUsersPermissions (ห้าม duplicate audit state)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  ReportDefinition,
  ScheduledJob,
  IntegrationEndpoint,
  TeamsVivaConfig,
  EDocument,
  ConsentRecord,
  TrafficEntry,
  DirectUser,
  EncryptionPolicy,
  MigrationJob,
  SubHubName,
} from '@/lib/admin/types/dataManagement'
import { buildCsvText, type CsvColumn } from '@/lib/admin/utils/csvExport'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'
import seedData from '@/data/admin/mockDataManagement.json'

// -----------------------------------------------------------------------
// Interface
// -----------------------------------------------------------------------

interface DataManagementState {
  // --- Reporting ---
  reports: ReportDefinition[]
  scheduledJobs: ScheduledJob[]
  favouriteReports: string[]          // reportIds

  // --- Integration ---
  integrationEndpoints: IntegrationEndpoint[]
  teamsVivaConfig: TeamsVivaConfig

  // --- System Features ---
  language: 'th' | 'en' | 'vn'
  eDocuments: EDocument[]
  editCopyMode: boolean               // global Edit/Copy rule flag (BRD #206)

  // --- Security & Governance ---
  consentForms: ConsentRecord[]       // non-persist: large volume
  trafficLog: TrafficEntry[]          // non-persist: append-only log
  hiddenProfiles: string[]            // employeeIds ที่ซ่อน
  directUsers: DirectUser[]
  encryptionPolicy: EncryptionPolicy  // read-only config
  sessionTimeoutMinutes: number
  dataMigrationJobs: MigrationJob[]  // non-persist: operational batch state

  // --- UI state ---
  currentSubHub: SubHubName | null

  // --- Actions: Reporting ---
  createReport: (def: Omit<ReportDefinition, 'id' | 'createdAt' | 'updatedAt'>) => void
  scheduleReport: (reportId: string, cron: string, delivery?: ScheduledJob['delivery']) => void
  toggleFavourite: (reportId: string) => void

  // --- Actions: System ---
  setLanguage: (lang: 'th' | 'en' | 'vn') => void
  setEditCopyMode: (enabled: boolean) => void

  // --- Actions: Security ---
  setHiddenProfile: (empId: string, hidden: boolean) => void
  setSessionTimeout: (minutes: number) => void

  // --- Actions: Export ---
  exportTrafficCSV: () => string      // UTF-8 BOM + Thai headers

  // --- Cross-store audit ---
  appendAudit: (entry: { user: string; action: string; entity: string; timestamp: string }) => void

  // --- UI ---
  setCurrentSubHub: (hub: SubHubName | null) => void
}

// -----------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------

/** genId — สร้าง lightweight ID โดยไม่ต้องใช้ crypto */
function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

// -----------------------------------------------------------------------
// CSV columns สำหรับ Traffic Log
// -----------------------------------------------------------------------

const trafficCsvColumns: CsvColumn<TrafficEntry>[] = [
  { header: 'รหัสพนักงาน', accessor: 'employeeId' },
  { header: 'ชื่อผู้ใช้', accessor: 'employeeName' },
  { header: 'IP Address', accessor: 'ipAddress' },
  { header: 'User Agent', accessor: 'userAgent' },
  { header: 'เวลาเข้าสู่ระบบ', accessor: 'loginAt' },
  { header: 'เวลาออกจากระบบ', accessor: (row) => row.logoutAt ?? '-' },
  { header: 'สำเร็จ', accessor: (row) => (row.isSuccess ? 'ใช่' : 'ไม่') },
  { header: 'สาเหตุที่ล้มเหลว', accessor: (row) => row.failureReason ?? '-' },
  { header: 'สถานที่', accessor: (row) => row.location ?? '-' },
]

// -----------------------------------------------------------------------
// Store
// -----------------------------------------------------------------------

export const useDataManagement = create<DataManagementState>()(
  persist(
    (set, get) => ({
      // -----------------------------------------------------------------
      // Initial state จาก seed
      // -----------------------------------------------------------------

      // Persist fields (โหลดจาก seed — zustand persist จะ override ด้วย localStorage ถ้ามี)
      reports: seedData.reports as ReportDefinition[],
      scheduledJobs: seedData.scheduledJobs as ScheduledJob[],
      favouriteReports: seedData.favouriteReports as string[],
      integrationEndpoints: seedData.integrationEndpoints as IntegrationEndpoint[],
      teamsVivaConfig: seedData.teamsVivaConfig as TeamsVivaConfig,
      language: seedData.language as 'th' | 'en' | 'vn',
      eDocuments: seedData.eDocuments as EDocument[],
      editCopyMode: seedData.editCopyMode as boolean,
      hiddenProfiles: seedData.hiddenProfiles as string[],
      directUsers: seedData.directUsers as DirectUser[],
      encryptionPolicy: seedData.encryptionPolicy as EncryptionPolicy,
      sessionTimeoutMinutes: seedData.sessionTimeoutMinutes as number,

      // Non-persist fields (ไม่อยู่ใน partialize — reset ทุก session)
      consentForms: seedData.consentForms as ConsentRecord[],
      trafficLog: seedData.trafficLog as TrafficEntry[],
      dataMigrationJobs: seedData.dataMigrationJobs as MigrationJob[],

      // UI state
      currentSubHub: null,

      // -----------------------------------------------------------------
      // Reporting actions
      // -----------------------------------------------------------------

      createReport: (def) => {
        const now = new Date().toISOString()
        const newReport: ReportDefinition = {
          id: genId('rpt'),
          createdAt: now,
          updatedAt: now,
          ...def,
        }
        set((state) => ({ reports: [...state.reports, newReport] }))

        // Cross-store audit (BRD audit write-through — Phase 4 pattern)
        get().appendAudit({
          user: def.owner,
          action: 'CREATE_REPORT',
          entity: `Report:${newReport.id}`,
          timestamp: now,
        })
      },

      scheduleReport: (reportId, cron, delivery = 'view') => {
        const now = new Date().toISOString()
        // ตรวจว่า reportId มีอยู่จริง
        const report = get().reports.find((r) => r.id === reportId)
        if (!report) {
          console.warn(`[useDataManagement] scheduleReport: reportId "${reportId}" ไม่พบ — skip`)
          return
        }
        const newJob: ScheduledJob = {
          id: genId('sched'),
          reportId,
          cron,
          delivery,
          recipients: [],
          isActive: true,
          lastRunAt: null,
          nextRunAt: null,
          createdAt: now,
        }
        set((state) => ({ scheduledJobs: [...state.scheduledJobs, newJob] }))

        get().appendAudit({
          user: report.owner,
          action: 'SCHEDULE_REPORT',
          entity: `ScheduledJob:${newJob.id}`,
          timestamp: now,
        })
      },

      toggleFavourite: (reportId) => {
        set((state) => {
          const exists = state.favouriteReports.includes(reportId)
          return {
            favouriteReports: exists
              ? state.favouriteReports.filter((id) => id !== reportId)
              : [...state.favouriteReports, reportId],
          }
        })
      },

      // -----------------------------------------------------------------
      // System actions
      // -----------------------------------------------------------------

      setLanguage: (lang) => {
        set({ language: lang })
        get().appendAudit({
          user: 'system',
          action: 'SET_LANGUAGE',
          entity: `Language:${lang}`,
          timestamp: new Date().toISOString(),
        })
      },

      setEditCopyMode: (enabled) => {
        set({ editCopyMode: enabled })
        get().appendAudit({
          user: 'system',
          action: 'SET_EDIT_COPY_MODE',
          entity: `EditCopyMode:${enabled}`,
          timestamp: new Date().toISOString(),
        })
      },

      // -----------------------------------------------------------------
      // Security actions
      // -----------------------------------------------------------------

      setHiddenProfile: (empId, hidden) => {
        set((state) => {
          const already = state.hiddenProfiles.includes(empId)
          if (hidden && !already) {
            return { hiddenProfiles: [...state.hiddenProfiles, empId] }
          }
          if (!hidden && already) {
            return { hiddenProfiles: state.hiddenProfiles.filter((id) => id !== empId) }
          }
          return {}
        })
        get().appendAudit({
          user: 'system',
          action: hidden ? 'HIDE_PROFILE' : 'UNHIDE_PROFILE',
          entity: `Employee:${empId}`,
          timestamp: new Date().toISOString(),
        })
      },

      setSessionTimeout: (minutes) => {
        // ป้องกันค่า < 5 หรือ > 480 (8 ชั่วโมง)
        if (minutes < 5 || minutes > 480) {
          console.warn(`[useDataManagement] setSessionTimeout: ค่า ${minutes} ไม่อยู่ในช่วง 5-480 นาที — skip`)
          return
        }
        set({ sessionTimeoutMinutes: minutes })
        get().appendAudit({
          user: 'system',
          action: 'SET_SESSION_TIMEOUT',
          entity: `SessionTimeout:${minutes}`,
          timestamp: new Date().toISOString(),
        })
      },

      // -----------------------------------------------------------------
      // Export action (reuse csvExport util — Rule C7 no duplicate)
      // -----------------------------------------------------------------

      exportTrafficCSV: () => {
        const { trafficLog } = get()
        return buildCsvText(trafficLog, trafficCsvColumns)
      },

      // -----------------------------------------------------------------
      // Cross-store audit — เขียนเข้า useUsersPermissions
      // -----------------------------------------------------------------

      appendAudit: (entry) => {
        // ใช้ static import (top of file) + getState() เพื่อ avoid circular ref ตอน render
        // Zustand .getState() ปลอดภัยเรียกได้ทุกเวลาแม้ store ยังไม่ render
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const auditFn = (useUsersPermissions.getState() as any).appendAudit
          if (typeof auditFn === 'function') {
            auditFn({
              userId: entry.user,
              userName: entry.user,
              action: entry.action,
              entityType: entry.entity.split(':')[0] ?? 'Unknown',
              entityId: entry.entity.split(':')[1] ?? '',
              entityName: entry.entity,
              description: `[DataManagement] ${entry.action} → ${entry.entity}`,
              timestamp: entry.timestamp,
              isSuccess: true,
              ipAddress: null,
              errorMessage: null,
            })
          } else {
            console.warn('[useDataManagement] appendAudit: useUsersPermissions.appendAudit ไม่พบ — skip cross-store write')
          }
        } catch (err) {
          console.warn('[useDataManagement] appendAudit: cross-store call failed —', err)
        }
      },

      // -----------------------------------------------------------------
      // UI actions
      // -----------------------------------------------------------------

      setCurrentSubHub: (hub) => {
        set({ currentSubHub: hub })
      },
    }),
    {
      name: 'data-management-v1',
      // Persist เฉพาะ field ที่ต้องการ — trafficLog, consentForms, dataMigrationJobs = non-persist
      partialize: (state) => ({
        reports: state.reports,
        scheduledJobs: state.scheduledJobs,
        favouriteReports: state.favouriteReports,
        integrationEndpoints: state.integrationEndpoints,
        teamsVivaConfig: state.teamsVivaConfig,
        language: state.language,
        eDocuments: state.eDocuments,
        editCopyMode: state.editCopyMode,
        hiddenProfiles: state.hiddenProfiles,
        directUsers: state.directUsers,
        encryptionPolicy: state.encryptionPolicy,
        sessionTimeoutMinutes: state.sessionTimeoutMinutes,
      }),
    }
  )
)
