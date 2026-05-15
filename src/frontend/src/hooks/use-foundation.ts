'use client';

// use-foundation.ts — mock data hook for Foundation admin pages
// Divisions = top-level business unit groupings (CEN group entities)

import { useOrgUnits } from '@/lib/admin/store/useOrgUnits';
import { usePositions } from '@/lib/admin/store/usePositions';

export interface Division {
  id: string;
  code: string;
  nameTh: string;
  nameEn: string;
  company: string;
  headCount: number;
  deptCount: number;
  active: boolean;
}

const DIVISION_SEED: Division[] = [
  { id: 'div-cen',      code: 'CEN',      nameTh: 'เซ็นทรัล กรุ๊ป',          nameEn: 'Central Group',              company: 'CEN',      headCount: 120000, deptCount: 4200, active: true },
  { id: 'div-crc',      code: 'CRC',      nameTh: 'เซ็นทรัล เรสเตอรองส์',    nameEn: 'Central Restaurants Group',  company: 'CRC',      headCount: 28000,  deptCount: 610,  active: true },
  { id: 'div-cu',       code: 'CU',       nameTh: 'เซ็นทรัล ยูนิต',          nameEn: 'Central Unit',               company: 'CU',       headCount: 15400,  deptCount: 320,  active: true },
  { id: 'div-cpn',      code: 'CPN',      nameTh: 'เซ็นทรัล พัฒนา',          nameEn: 'Central Pattana',            company: 'CPN',      headCount: 9800,   deptCount: 180,  active: true },
  { id: 'div-robinson', code: 'ROBINSON', nameTh: 'โรบินสัน',                nameEn: 'Robinson',                   company: 'ROBINSON', headCount: 6700,   deptCount: 140,  active: true },
  { id: 'div-cts',      code: 'CTS',      nameTh: 'เซ็นทรัล เทคโนโลยี',     nameEn: 'Central Technology Services',company: 'CEN',      headCount: 3200,   deptCount: 48,   active: true },
  { id: 'div-chg',      code: 'CHG',      nameTh: 'เซ็นทรัล ห้างสรรพสินค้า',nameEn: 'Central Department Stores',  company: 'CEN',      headCount: 18000,  deptCount: 290,  active: false },
];

export function useFoundationSummary() {
  const orgUnits = useOrgUnits((s) => s.all);
  const positions = usePositions((s) => s.all);
  return {
    divisionCount: DIVISION_SEED.filter((d) => d.active).length,
    orgUnitCount: orgUnits.filter((u) => u.active).length,
    positionCount: positions.filter((p) => p.active).length,
    totalHeadcount: positions.reduce((sum, p) => sum + (p.currentHeadcount ?? 0), 0),
  };
}

export function useDivisions() {
  return DIVISION_SEED;
}
