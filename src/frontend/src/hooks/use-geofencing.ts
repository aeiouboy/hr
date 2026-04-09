'use client';

import { useCallback, useState } from 'react';

export interface GeofenceZone {
 id: string;
 name: string;
 latitude: number;
 longitude: number;
 radius: number;
 address: string;
 isActive: boolean;
 assignedEmployeeCount: number;
}

const INITIAL_ZONES: GeofenceZone[] = [
 {
 id:'GF-001',
 name:'HQ Bangkok',
 latitude: 13.746563,
 longitude: 100.5393,
 radius: 250,
 address:'CentralWorld Office Tower, Pathum Wan, Bangkok 10330',
 isActive: true,
 assignedEmployeeCount: 184,
 },
 {
 id:'GF-002',
 name:'Branch Chiang Mai',
 latitude: 18.796143,
 longitude: 98.979263,
 radius: 200,
 address:'Central Festival Chiang Mai, Mueang Chiang Mai, Chiang Mai 50000',
 isActive: true,
 assignedEmployeeCount: 62,
 },
 {
 id:'GF-003',
 name:'Branch Phuket',
 latitude: 7.890299,
 longitude: 98.398102,
 radius: 220,
 address:'Central Phuket Floresta, Mueang Phuket, Phuket 83000',
 isActive: false,
 assignedEmployeeCount: 48,
 },
];

export function useGeofencing() {
 const [zones, setZones] = useState<GeofenceZone[]>(INITIAL_ZONES);

 const addZone = useCallback(async (zone: Omit<GeofenceZone,'id'>) => {
 await new Promise((resolve) => setTimeout(resolve, 220));
 const newZone: GeofenceZone = { ...zone, id: `GF-${String(Date.now()).slice(-6)}` };
 setZones((prev) => [newZone, ...prev]);
 return newZone;
 }, []);

 const updateZone = useCallback(async (zoneId: string, updates: Partial<GeofenceZone>) => {
 await new Promise((resolve) => setTimeout(resolve, 220));
 setZones((prev) => prev.map((zone) => (zone.id === zoneId ? { ...zone, ...updates } : zone)));
 }, []);

 const deleteZone = useCallback(async (zoneId: string) => {
 await new Promise((resolve) => setTimeout(resolve, 220));
 setZones((prev) => prev.filter((zone) => zone.id !== zoneId));
 }, []);

 const toggleZoneActive = useCallback(async (zoneId: string) => {
 await new Promise((resolve) => setTimeout(resolve, 180));
 setZones((prev) => prev.map((zone) => (zone.id === zoneId ? { ...zone, isActive: !zone.isActive } : zone)));
 }, []);

 return {
 zones,
 addZone,
 updateZone,
 deleteZone,
 toggleZoneActive,
 };
}
