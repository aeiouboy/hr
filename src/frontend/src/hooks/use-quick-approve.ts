'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { quickApproveApi, type PendingRequest, type PendingFilter, type Delegation, type Urgency } from '@/lib/quick-approve-api';

export type ApprovalType ='all' |'leave' |'expense' |'overtime' |'change-request' |'claim' |'transfer' |'change_request';
export type UrgencyLevel ='all' |'urgent' |'normal' |'low';

export interface ApprovalItem {
 id: string;
 type:'leave' |'expense' |'overtime' |'change-request' |'claim' |'transfer' |'change_request';
 employeeName: string;
 employeeId: string;
 employeeAvatar: string;
 department: string;
 summary: string;
 detail: string;
 amount?: number;
 dates?: string;
 submittedAt: string;
 urgent: boolean;
 urgency: Urgency;
 waitingDays: number;
 attachments: string[];
 notes: string;
 requester?: PendingRequest['requester'];
 approvalTimeline?: PendingRequest['approvalTimeline'];
}

const MOCK_ITEMS: ApprovalItem[] = [
 {
 id:'QA001', type:'leave', employeeName:'ณัฐพงษ์ แก้วใส', employeeId:'EMP003', employeeAvatar:'NK',
 department:'ฝ่ายไอที', summary:'ลาพักร้อน — 3 วัน', detail:'ขอลาพักร้อนเพื่อร่วมงานครอบครัวที่เชียงใหม่',
 dates:'24-26 ก.พ. 2569', submittedAt:'2026-02-20T09:30:00', urgent: true, urgency:'urgent', waitingDays: 4, attachments: [], notes:'',
 },
 {
 id:'QA002', type:'leave', employeeName:'พลอย สุขสวัสดิ์', employeeId:'EMP002', employeeAvatar:'PS',
 department:'ฝ่ายไอที', summary:'ลาป่วย — 1 วัน', detail:'ป่วยไม่สบาย แนบใบรับรองแพทย์',
 dates:'22 ก.พ. 2569', submittedAt:'2026-02-22T07:45:00', urgent: true, urgency:'urgent', waitingDays: 3, attachments: ['medical_cert.pdf'], notes:'',
 },
 {
 id:'QA003', type:'expense', employeeName:'สมชาย ใจดี', employeeId:'EMP001', employeeAvatar:'SJ',
 department:'ฝ่ายไอที', summary:'ค่าเดินทาง — เยี่ยมลูกค้า', detail:'ค่าแท็กซี่และอาหารสำหรับประชุมลูกค้าที่ออฟฟิศสาทร',
 amount: 2800, submittedAt:'2026-02-19T14:20:00', urgent: false, urgency:'normal', waitingDays: 2, attachments: ['taxi_receipt.jpg','meal_receipt.jpg'], notes:'',
 },
 {
 id:'QA004', type:'overtime', employeeName:'กฤษ ธนวรรณ', employeeId:'EMP005', employeeAvatar:'KT',
 department:'ฝ่ายไอที', summary:'OT 4 ชั่วโมง — ย้ายเซิร์ฟเวอร์', detail:'ย้ายเซิร์ฟเวอร์ฉุกเฉินสำหรับ deploy production',
 dates:'22 ก.พ. 2569 (18:00-22:00)', submittedAt:'2026-02-21T16:00:00', urgent: true, urgency:'urgent', waitingDays: 4, attachments: [], notes:'หัวหน้าอนุมัติด้วยวาจาแล้ว',
 },
 {
 id:'QA005', type:'expense', employeeName:'มาลี ศรีพรรณ', employeeId:'EMP006', employeeAvatar:'MS',
 department:'ฝ่ายไอที', summary:'ค่าอาหาร — เลี้ยงทีม', detail:'เลี้ยงทีมหลังจบสปรินต์',
 amount: 1500, submittedAt:'2026-02-18T12:00:00', urgent: false, urgency:'low', waitingDays: 0, attachments: ['lunch_receipt.jpg'], notes:'',
 },
 // Bank-account changes route to SPD via /admin/change-requests per BRD #166
 // — NOT manager's queue (Ken UAT 2026-04-26). Removed from MOCK_QUEUE.
 {
 id:'QA007', type:'leave', employeeName:'สมชาย ใจดี', employeeId:'EMP001', employeeAvatar:'SJ',
 department:'ฝ่ายไอที', summary:'ลากิจ — ครึ่งวัน', detail:'ลาบ่ายเพื่อธุระส่วนตัว',
 dates:'28 ก.พ. 2569 (บ่าย)', submittedAt:'2026-02-21T08:30:00', urgent: false, urgency:'low', waitingDays: 0, attachments: [], notes:'',
 },
 {
 id:'QA008', type:'overtime', employeeName:'สมชาย ใจดี', employeeId:'EMP001', employeeAvatar:'SJ',
 department:'ฝ่ายไอที', summary:'OT 2 ชั่วโมง — แก้บั๊ก', detail:'แก้บั๊ก production ฉุกเฉินหลังเลิกงาน',
 dates:'20 ก.พ. 2569 (19:00-21:00)', submittedAt:'2026-02-20T21:30:00', urgent: false, urgency:'normal', waitingDays: 1, attachments: [], notes:'',
 },
];

const MOCK_DELEGATIONS: Delegation[] = [];

export function useQuickApprove() {
 const [items, setItems] = useState<ApprovalItem[]>([]);
 const [loading, setLoading] = useState(true);
 const [typeFilter, setTypeFilter] = useState<ApprovalType>('all');
 const [urgencyFilter, setUrgencyFilter] = useState<UrgencyLevel>('all');
 const [searchText, setSearchText] = useState('');
 const [dateFrom, setDateFrom] = useState('');
 const [dateTo, setDateTo] = useState('');
 const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
 const [delegations, setDelegations] = useState<Delegation[]>(MOCK_DELEGATIONS);
 const [delegationsLoading, setDelegationsLoading] = useState(false);

 // Try API first, fall back to mock
 const fetchItems = useCallback(async () => {
 setLoading(true);
 try {
 const filter: PendingFilter = {};
 if (typeFilter !=='all') filter.type = typeFilter;
 if (urgencyFilter !=='all') filter.urgency = urgencyFilter as Urgency;
 if (searchText) filter.search = searchText;
 if (dateFrom) filter.dateFrom = dateFrom;
 if (dateTo) filter.dateTo = dateTo;

 const res = await quickApproveApi.getPending(filter);
 // Map API response to ApprovalItem
 const mapped: ApprovalItem[] = res.data.map((r) => ({
 id: r.id,
 type: r.type as ApprovalItem['type'],
 employeeName: r.requester.name,
 employeeId: r.requester.id,
 employeeAvatar: r.requester.name.split('').map((n) => n[0]).join('').slice(0, 2),
 department: r.requester.department,
 summary: r.description,
 detail: r.description,
 submittedAt: r.submittedAt,
 urgent: r.urgency ==='urgent',
 urgency: r.urgency,
 waitingDays: r.waitingDays,
 attachments: [],
 notes:'',
 requester: r.requester,
 approvalTimeline: r.approvalTimeline,
 }));
 setItems(mapped);
 } catch {
 // Fall back to mock data
 setItems(MOCK_ITEMS);
 } finally {
 setLoading(false);
 }
 }, [typeFilter, urgencyFilter, searchText, dateFrom, dateTo]);

 useEffect(() => {
 fetchItems();
 }, [fetchItems]);

 // Fetch delegations
 const fetchDelegations = useCallback(async () => {
 setDelegationsLoading(true);
 try {
 const res = await quickApproveApi.getDelegations();
 setDelegations(res);
 } catch {
 setDelegations(MOCK_DELEGATIONS);
 } finally {
 setDelegationsLoading(false);
 }
 }, []);

 useEffect(() => {
 fetchDelegations();
 }, [fetchDelegations]);

 const filteredItems = useMemo(() => {
 return items.filter((item) => {
 if (typeFilter !=='all' && item.type !== typeFilter) return false;
 if (urgencyFilter ==='urgent' && !item.urgent) return false;
 if (urgencyFilter ==='normal' && item.urgent) return false;
 if (urgencyFilter ==='low' && item.urgency !=='low') return false;
 if (searchText) {
 const q = searchText.toLowerCase();
 if (!item.employeeName.toLowerCase().includes(q) && !item.summary.toLowerCase().includes(q)) return false;
 }
 return true;
 });
 }, [items, typeFilter, urgencyFilter, searchText]);

 const toggleSelect = useCallback((id: string) => {
 setSelectedIds((prev) => {
 const next = new Set(prev);
 if (next.has(id)) next.delete(id);
 else if (next.size < 50) next.add(id);
 return next;
 });
 }, []);

 const selectAll = useCallback(() => {
 const allIds = filteredItems.slice(0, 50).map((i) => i.id);
 setSelectedIds((prev) => {
 if (prev.size === allIds.length) return new Set();
 return new Set(allIds);
 });
 }, [filteredItems]);

 const clearSelection = useCallback(() => {
 setSelectedIds(new Set());
 }, []);

 const approveItems = useCallback(async (ids: string[], reason?: string) => {
 try {
 await quickApproveApi.bulkApprove(ids, reason);
 } catch {
 // Mock fallback
 }
 setItems((prev) => prev.filter((i) => !ids.includes(i.id)));
 setSelectedIds((prev) => {
 const next = new Set(prev);
 ids.forEach((id) => next.delete(id));
 return next;
 });
 }, []);

 const rejectItems = useCallback(async (ids: string[], reason?: string) => {
 try {
 await quickApproveApi.bulkReject(ids, reason ??'Rejected');
 } catch {
 // Mock fallback
 }
 setItems((prev) => prev.filter((i) => !ids.includes(i.id)));
 setSelectedIds((prev) => {
 const next = new Set(prev);
 ids.forEach((id) => next.delete(id));
 return next;
 });
 }, []);

 const createDelegation = useCallback(async (data: {
 delegate_to: string;
 start_date: string;
 end_date: string;
 workflow_types: string[];
 }) => {
 try {
 await quickApproveApi.createDelegation(data);
 fetchDelegations();
 } catch {}
 }, [fetchDelegations]);

 const revokeDelegation = useCallback(async (id: string) => {
 try {
 await quickApproveApi.revokeDelegation(id);
 fetchDelegations();
 } catch {}
 }, [fetchDelegations]);

 const stats = useMemo(() => ({
 total: items.length,
 urgent: items.filter((i) => i.urgent).length,
 leave: items.filter((i) => i.type ==='leave').length,
 expense: items.filter((i) => i.type ==='expense').length,
 overtime: items.filter((i) => i.type ==='overtime').length,
 changeRequest: items.filter((i) => i.type ==='change-request' || i.type ==='change_request').length,
 claim: items.filter((i) => i.type ==='claim').length,
 transfer: items.filter((i) => i.type ==='transfer').length,
 }), [items]);

 return {
 items: filteredItems,
 allItems: items,
 loading,
 typeFilter,
 setTypeFilter,
 urgencyFilter,
 setUrgencyFilter,
 searchText,
 setSearchText,
 dateFrom,
 setDateFrom,
 dateTo,
 setDateTo,
 selectedIds,
 toggleSelect,
 selectAll,
 clearSelection,
 approveItems,
 rejectItems,
 stats,
 delegations,
 delegationsLoading,
 createDelegation,
 revokeDelegation,
 };
}
