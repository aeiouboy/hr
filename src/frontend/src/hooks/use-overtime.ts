'use client';

import { useState, useEffect, useCallback } from 'react';

export type OTType ='weekday' |'weekend' |'holiday' |'night';
export type OTStatus ='pending' |'approved' |'rejected' |'completed' |'cancelled';

export interface OTRequest {
 id: string;
 date: string;
 startTime: string;
 endTime: string;
 totalHours: number;
 type: OTType;
 reason: string;
 status: OTStatus;
 estimatedAmount: number;
 approvedBy?: string;
 submittedAt: string;
}

export interface TeamOTRequest extends OTRequest {
 employeeId: string;
 employeeName: string;
}

const MOCK_REQUESTS: OTRequest[] = [
 { id:'OT001', date:'2026-02-18', startTime:'18:00', endTime:'20:00', totalHours: 2, type:'weekday', reason:'Project deadline', status:'approved', estimatedAmount: 750, approvedBy:'Surachai P.', submittedAt:'2026-02-17' },
 { id:'OT002', date:'2026-02-22', startTime:'09:00', endTime:'15:00', totalHours: 6, type:'weekend', reason:'System maintenance', status:'pending', estimatedAmount: 3000, submittedAt:'2026-02-20' },
 { id:'OT003', date:'2026-02-10', startTime:'18:00', endTime:'21:00', totalHours: 3, type:'weekday', reason:'Quarter-end close', status:'completed', estimatedAmount: 1125, approvedBy:'Surachai P.', submittedAt:'2026-02-09' },
 { id:'OT004', date:'2026-01-28', startTime:'18:00', endTime:'22:00', totalHours: 4, type:'weekday', reason:'Urgent client request', status:'rejected', estimatedAmount: 1500, submittedAt:'2026-01-27' },
];

const MOCK_TEAM_OT_REQUESTS: TeamOTRequest[] = [
 { id:'TOT001', employeeId:'EMP101', employeeName:'Krittin Suksawat', date:'2026-03-01', startTime:'18:00', endTime:'21:00', totalHours: 3, type:'weekend', reason:'Stocktake preparation', status:'approved', estimatedAmount: 1950, submittedAt:'2026-02-28' },
 { id:'TOT002', employeeId:'EMP102', employeeName:'Natcha Panyasiri', date:'2026-03-04', startTime:'18:00', endTime:'20:00', totalHours: 2, type:'weekday', reason:'Visual display refresh', status:'pending', estimatedAmount: 900, submittedAt:'2026-03-03' },
 { id:'TOT003', employeeId:'EMP104', employeeName:'Pimchanok Ratanakul', date:'2026-03-03', startTime:'18:30', endTime:'21:00', totalHours: 2.5, type:'weekday', reason:'Customer service campaign', status:'approved', estimatedAmount: 1125, submittedAt:'2026-03-02' },
 { id:'TOT004', employeeId:'EMP105', employeeName:'Saran Kongsiri', date:'2026-02-28', startTime:'10:00', endTime:'15:00', totalHours: 5, type:'weekend', reason:'Weekend promotion support', status:'completed', estimatedAmount: 3000, submittedAt:'2026-02-27' },
 { id:'TOT005', employeeId:'EMP106', employeeName:'Waranya Intarasri', date:'2026-03-02', startTime:'18:00', endTime:'19:30', totalHours: 1.5, type:'weekday', reason:'Counter closing delay', status:'rejected', estimatedAmount: 0, submittedAt:'2026-03-01' },
];

export function useOvertime() {
 const [requests, setRequests] = useState<OTRequest[]>([]);
 const [teamRequests, setTeamRequests] = useState<TeamOTRequest[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const timer = setTimeout(() => {
 setRequests(MOCK_REQUESTS);
 setTeamRequests(MOCK_TEAM_OT_REQUESTS);
 setLoading(false);
 }, 300);
 return () => clearTimeout(timer);
 }, []);

 const submitRequest = useCallback(async (req: Omit<OTRequest,'id' |'status' |'submittedAt'>) => {
 const newReq: OTRequest = {
 ...req,
 id: `OT${Date.now()}`,
 status:'pending',
 submittedAt: new Date().toISOString().split('T')[0],
 };
 setRequests((prev) => [newReq, ...prev]);
 return newReq;
 }, []);

 const cancelRequest = useCallback(async (id: string) => {
 setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status:'cancelled' as OTStatus } : r)));
 }, []);

 const weeklyHours = requests
 .filter((r) => r.status !=='rejected' && r.status !=='cancelled')
 .reduce((sum, r) => sum + r.totalHours, 0);

 const stats = {
 pendingCount: requests.filter((r) => r.status ==='pending').length,
 approvedCount: requests.filter((r) => r.status ==='approved').length,
 weeklyHours,
 maxWeeklyHours: 36,
 };

 return { requests, teamRequests, loading, stats, submitRequest, cancelRequest };
}
