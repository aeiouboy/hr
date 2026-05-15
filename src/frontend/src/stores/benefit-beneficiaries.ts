import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BeneficiaryRelationship = 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
export type BeneficiaryStatus = 'active' | 'inactive';

export interface BeneficiaryRow {
  id: string;
  employeeId: string;
  employeeName: string;
  beneficiaryName: string;
  relationship: string;
  relationshipEn: string;
  nationalId: string;
  percentage: number;
  updatedDate: string;
  status: BeneficiaryStatus;
}

export interface BeneficiaryUpsertInput {
  id?: string;
  employeeId: string;
  employeeName: string;
  beneficiaryName: string;
  relationship: string;
  relationshipEn: string;
  nationalId?: string;
  percentage: number;
  status?: BeneficiaryStatus;
  updatedDate?: string;
}

interface BeneficiariesState {
  rows: BeneficiaryRow[];
  upsertBeneficiary: (input: BeneficiaryUpsertInput) => string;
  archiveBeneficiary: (id: string) => void;
  clear: () => void;
}

const nowDate = () => new Date().toISOString().slice(0, 10);

function nextId(count: number) {
  return `BEN-${String(count + 1).padStart(3, '0')}`;
}

const initialRows: BeneficiaryRow[] = [
  { id: 'BEN-001', employeeId: 'EMP001', employeeName: 'สมชาย ใจดี',      beneficiaryName: 'สมหญิง ใจดี',      relationship: 'คู่สมรส',  relationshipEn: 'Spouse',  nationalId: '1-2345-67890-12-3', percentage: 100, updatedDate: '2026-01-15', status: 'active' },
  { id: 'BEN-002', employeeId: 'EMP002', employeeName: 'วิภา รักงาน',       beneficiaryName: 'ประยุทธ รักงาน',   relationship: 'บิดา',     relationshipEn: 'Father',  nationalId: '1-9876-54321-00-1', percentage: 50,  updatedDate: '2026-02-03', status: 'active' },
  { id: 'BEN-003', employeeId: 'EMP002', employeeName: 'วิภา รักงาน',       beneficiaryName: 'ศรีประภา รักงาน',  relationship: 'มารดา',    relationshipEn: 'Mother',  nationalId: '1-9876-54321-00-2', percentage: 50,  updatedDate: '2026-02-03', status: 'active' },
  { id: 'BEN-004', employeeId: 'EMP003', employeeName: 'ธนกร มั่นคง',       beneficiaryName: 'ธนพร มั่นคง',      relationship: 'คู่สมรส',  relationshipEn: 'Spouse',  nationalId: '2-1111-22222-33-4', percentage: 70,  updatedDate: '2025-11-20', status: 'active' },
  { id: 'BEN-005', employeeId: 'EMP003', employeeName: 'ธนกร มั่นคง',       beneficiaryName: 'ธนวัฒน์ มั่นคง',   relationship: 'บุตร',     relationshipEn: 'Child',   nationalId: '2-1111-22222-33-5', percentage: 30,  updatedDate: '2025-11-20', status: 'active' },
  { id: 'BEN-006', employeeId: 'EMP004', employeeName: 'นภาพร สุขสันต์',    beneficiaryName: 'ณัฐพงษ์ สุขสันต์', relationship: 'คู่สมรส',  relationshipEn: 'Spouse',  nationalId: '3-4567-89012-34-5', percentage: 100, updatedDate: '2026-03-10', status: 'active' },
  { id: 'BEN-007', employeeId: 'EMP005', employeeName: 'อาทิตย์ วิจิตร',    beneficiaryName: 'สุมาลี วิจิตร',    relationship: 'มารดา',    relationshipEn: 'Mother',  nationalId: '4-5678-90123-45-6', percentage: 100, updatedDate: '2026-01-28', status: 'active' },
  { id: 'BEN-008', employeeId: 'EMP006', employeeName: 'กมลา ประสิทธิ์',    beneficiaryName: 'ภาณุวัฒน์ ประสิทธิ์', relationship: 'คู่สมรส', relationshipEn: 'Spouse', nationalId: '5-6789-01234-56-7', percentage: 60,  updatedDate: '2025-12-05', status: 'active' },
  { id: 'BEN-009', employeeId: 'EMP006', employeeName: 'กมลา ประสิทธิ์',    beneficiaryName: 'สิริยา ประสิทธิ์',  relationship: 'บุตร',     relationshipEn: 'Child',   nationalId: '5-6789-01234-56-8', percentage: 40,  updatedDate: '2025-12-05', status: 'active' },
  { id: 'BEN-010', employeeId: 'EMP007', employeeName: 'พิชิต เจริญรุ่ง',   beneficiaryName: 'มานิตา เจริญรุ่ง',  relationship: 'คู่สมรส',  relationshipEn: 'Spouse',  nationalId: '6-7890-12345-67-8', percentage: 100, updatedDate: '2026-04-02', status: 'active' },
  { id: 'BEN-011', employeeId: 'EMP008', employeeName: 'รัตนา ศิริโชค',     beneficiaryName: 'ชัยวัฒน์ ศิริโชค',  relationship: 'บิดา',     relationshipEn: 'Father',  nationalId: '7-8901-23456-78-9', percentage: 100, updatedDate: '2026-02-18', status: 'inactive' },
  { id: 'BEN-012', employeeId: 'EMP009', employeeName: 'ประสิทธิ์ แสงทอง', beneficiaryName: 'พรพิมล แสงทอง',   relationship: 'คู่สมรส',  relationshipEn: 'Spouse',  nationalId: '8-9012-34567-89-0', percentage: 100, updatedDate: '2026-03-25', status: 'active' },
];

export const useBeneficiariesStore = create<BeneficiariesState>()(
  persist(
    (set, get) => ({
      rows: initialRows,
      upsertBeneficiary: (input) => {
        const today = nowDate();
        if (input.id) {
          // edit
          set((s) => ({
            rows: s.rows.map((row) =>
              row.id === input.id
                ? {
                    ...row,
                    employeeId: input.employeeId,
                    employeeName: input.employeeName,
                    beneficiaryName: input.beneficiaryName,
                    relationship: input.relationship,
                    relationshipEn: input.relationshipEn,
                    nationalId: input.nationalId ?? row.nationalId,
                    percentage: input.percentage,
                    status: input.status ?? row.status,
                    updatedDate: input.updatedDate ?? today,
                  }
                : row,
            ),
          }));
          return input.id;
        }
        // create
        const count = get().rows.length;
        const id = nextId(count);
        const newRow: BeneficiaryRow = {
          id,
          employeeId: input.employeeId,
          employeeName: input.employeeName,
          beneficiaryName: input.beneficiaryName,
          relationship: input.relationship,
          relationshipEn: input.relationshipEn,
          nationalId: input.nationalId ?? '',
          percentage: input.percentage,
          status: input.status ?? 'active',
          updatedDate: input.updatedDate ?? today,
        };
        set((s) => ({ rows: [newRow, ...s.rows] }));
        return id;
      },
      archiveBeneficiary: (id) =>
        set((s) => ({
          rows: s.rows.map((row) =>
            row.id === id ? { ...row, status: 'inactive', updatedDate: nowDate() } : row,
          ),
        })),
      clear: () => set({ rows: [] }),
    }),
    { name: 'humi-benefit-beneficiaries' },
  ),
);
