'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, ClipboardList, Wallet, Plus } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LeaveBalanceDisplay } from '@/components/leave/leave-balance';
import { LeaveRequestForm } from '@/components/leave/leave-request-form';
import { LeaveCalendar } from '@/components/leave/leave-calendar';
import { LeaveHistory } from '@/components/leave/leave-history';
import { LeaveDetail } from '@/components/leave/leave-detail';
import { useLeave } from '@/hooks/use-leave';
import { useToast } from '@/components/ui/toast';
import type { LeaveType, LeaveRequest } from '@/hooks/use-leave';

type TabKey ='balances' |'request' |'history' |'calendar';

export default function LeavePage() {
 const t = useTranslations('leave');
 const { toast } = useToast();
 const [activeTab, setActiveTab] = useState<TabKey>('balances');
 const [preselectedType, setPreselectedType] = useState<LeaveType | undefined>();
 const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
 const [detailOpen, setDetailOpen] = useState(false);

 const {
 balances,
 requests,
 holidays,
 calendarEvents,
 substituteEmployees,
 loading,
 submitting,
 submitRequest,
 cancelRequest,
 cancelApprovedLeave,
 } = useLeave();

 const tabs = [
 { key:'balances', label: t('balances') },
 { key:'request', label: t('newRequest') },
 { key:'history', label: t('history') },
 { key:'calendar', label: t('calendar') },
 ];

 const handleRequestLeave = (type: LeaveType) => {
 setPreselectedType(type);
 setActiveTab('request');
 };

 const handleViewDetail = (request: LeaveRequest) => {
 setSelectedRequest(request);
 setDetailOpen(true);
 };

 const handleCancelRequest = async (requestId: string) => {
 await cancelRequest(requestId);
 };

 const handleRequestCancellation = async (requestId: string, reason: string) => {
 await cancelApprovedLeave(requestId, reason);
 toast('success', t('cancellationRequestSubmitted'));
 };

 const handleCalendarDateClick = (date: string) => {
 setPreselectedType(undefined);
 setActiveTab('request');
 };

 const renderTabContent = () => {
 switch (activeTab) {
 case'balances':
 return (
 <LeaveBalanceDisplay
 balances={balances}
 loading={loading}
 onRequestLeave={handleRequestLeave}
 />
 );
 case'request':
 return (
 <LeaveRequestForm
 balances={balances}
 substituteEmployees={substituteEmployees}
 preselectedType={preselectedType}
 submitting={submitting}
 onSubmit={async (data) => {
 await submitRequest(data);
 setActiveTab('history');
 }}
 onCancel={() => setActiveTab('balances')}
 />
 );
 case'history':
 return (
 <LeaveHistory
 requests={requests}
 loading={loading}
 onViewDetail={handleViewDetail}
 onCancelPending={handleCancelRequest}
 onRequestCancellation={handleRequestCancellation}
 />
 );
 case'calendar':
 return (
 <LeaveCalendar
 events={calendarEvents}
 holidays={holidays}
 onDateClick={handleCalendarDateClick}
 />
 );
 default:
 return null;
 }
 };

 return (
 <>
 <div className="max-w-7xl mx-auto">
 {/* Page header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
 <Button
 onClick={() => { setPreselectedType(undefined); setActiveTab('request'); }}
 className="mt-4 sm:mt-0"
 >
 <Plus className="h-4 w-4 mr-2" />
 {t('newRequest')}
 </Button>
 </div>

 {/* Tabs */}
 <Tabs
 tabs={tabs}
 activeTab={activeTab}
 onTabChange={(key) => setActiveTab(key as TabKey)}
 className="mb-6"
 />

 {/* Tab content */}
 {renderTabContent()}
 </div>

 {/* Detail modal */}
 <LeaveDetail
 request={selectedRequest}
 open={detailOpen}
 onClose={() => setDetailOpen(false)}
 onCancel={handleCancelRequest}
 />
 </>
 );
}
