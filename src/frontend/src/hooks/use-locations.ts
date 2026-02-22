'use client';

import { useState, useEffect } from 'react';

export interface LocationNode {
  id: string;
  code: string;
  nameEn: string;
  nameTh: string;
  type: string;
  address?: string;
  headcount: number;
  status: 'active' | 'inactive';
  children: LocationNode[];
}

const MOCK_LOCATIONS: LocationNode[] = [
  {
    id: 'LOC001', code: 'BKK', nameEn: 'Bangkok Region', nameTh: 'ภาคกรุงเทพ',
    type: 'Region', headcount: 5200, status: 'active',
    children: [
      {
        id: 'LOC002', code: 'CW', nameEn: 'Central World', nameTh: 'เซ็นทรัลเวิลด์',
        type: 'Branch', address: '4, 4/1-2, Ratchadamri Rd, Pathum Wan, Bangkok', headcount: 1200, status: 'active',
        children: [
          { id: 'LOC005', code: 'CW-F1', nameEn: 'Floor 1 - Retail', nameTh: 'ชั้น 1 - ค้าปลีก', type: 'Floor', headcount: 150, status: 'active', children: [] },
          { id: 'LOC006', code: 'CW-HQ', nameEn: 'HQ Office (Floor 22-25)', nameTh: 'สำนักงานใหญ่ (ชั้น 22-25)', type: 'Floor', headcount: 800, status: 'active', children: [] },
        ],
      },
      {
        id: 'LOC003', code: 'CLP', nameEn: 'Central Lardprao', nameTh: 'เซ็นทรัลลาดพร้าว',
        type: 'Branch', address: '1693 Phaholyothin Rd, Chatuchak, Bangkok', headcount: 800, status: 'active',
        children: [],
      },
    ],
  },
  {
    id: 'LOC010', code: 'NTH', nameEn: 'Northern Region', nameTh: 'ภาคเหนือ',
    type: 'Region', headcount: 1500, status: 'active',
    children: [
      { id: 'LOC011', code: 'CM', nameEn: 'Central Chiang Mai', nameTh: 'เซ็นทรัลเชียงใหม่', type: 'Branch', address: '99/1-4 Mahidol Rd, Chiang Mai', headcount: 600, status: 'active', children: [] },
    ],
  },
  {
    id: 'LOC020', code: 'EST', nameEn: 'Eastern Region', nameTh: 'ภาคตะวันออก',
    type: 'Region', headcount: 900, status: 'active',
    children: [
      { id: 'LOC021', code: 'PT', nameEn: 'Central Pattaya', nameTh: 'เซ็นทรัลพัทยา', type: 'Branch', address: '333/99 Moo 9, Pattaya', headcount: 500, status: 'active', children: [] },
    ],
  },
];

export function useLocations() {
  const [locations, setLocations] = useState<LocationNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<LocationNode | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocations(MOCK_LOCATIONS);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const totalHeadcount = locations.reduce((sum, l) => sum + l.headcount, 0);

  function flattenLocations(nodes: LocationNode[]): LocationNode[] {
    return nodes.reduce<LocationNode[]>((acc, node) => {
      acc.push(node);
      if (node.children.length > 0) acc.push(...flattenLocations(node.children));
      return acc;
    }, []);
  }

  const allLocations = flattenLocations(locations);
  const totalLocations = allLocations.length;
  const totalBranches = allLocations.filter((l) => l.type === 'Branch').length;

  return { locations, loading, selectedLocation, setSelectedLocation, totalHeadcount, totalLocations, totalBranches };
}
