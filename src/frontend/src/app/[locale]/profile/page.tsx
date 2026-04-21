'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { PersonHero } from '@/components/ui/person-hero';
import { ProfileTabs, type ProfileTabId } from '@/components/profile/profile-tabs';
import { Button } from '@/components/ui/button';
import { Edit, Network } from 'lucide-react';
import { isHR } from '@/lib/rbac';
import { useAuthStore } from '@/stores/auth-store';
import { PersonalInfoTab } from '@/components/profile/tabs/personal-info';
import { EcPersonalInfoTab } from '@/components/profile/tabs/ec-personal-info';
import { EmploymentTab } from '@/components/profile/tabs/employment';
import { CompensationTab } from '@/components/profile/tabs/compensation';
import { BenefitsTab } from '@/components/profile/tabs/benefits';
import { ProfileDetailsTab } from '@/components/profile/tabs/profile-details';
import { ScorecardTab } from '@/components/profile/tabs/scorecard';
import { OrgChart } from '@/components/profile/org-chart';
import { Modal } from '@/components/ui/modal';
import { useEmployee } from '@/hooks/use-employee';

export default function ProfilePage() {
 const [activeTab, setActiveTab] = useState<ProfileTabId>('ec-personal');
 const [showOrgChart, setShowOrgChart] = useState(false);
 const { employee, loading } = useEmployee();
 const { roles } = useAuthStore();
 const router = useRouter();

 const renderTabContent = () => {
 switch (activeTab) {
 case'ec-personal':
 return <EcPersonalInfoTab employee={employee} loading={loading} />;
 case'personal':
 return <PersonalInfoTab employee={employee} loading={loading} />;
 case'employment':
 return <EmploymentTab employee={employee} loading={loading} />;
 case'compensation':
 return <CompensationTab employee={employee} loading={loading} />;
 case'benefits':
 return <BenefitsTab employee={employee} loading={loading} />;
 case'profile-details':
 return <ProfileDetailsTab employee={employee} loading={loading} />;
 case'scorecard':
 return <ScorecardTab employee={employee} loading={loading} />;
 default:
 return null;
 }
 };

 const orgChart = employee?.orgChart as Record<string, unknown> | undefined;

 return (
 <div className="min-h-screen bg-canvas">
 <Header />
 <MobileMenu />
 <div className="flex">
 <Sidebar />
 <main className="flex-1 p-4 sm:p-6">
 {employee && (() => {
 const info = employee.personalInfo as Record<string, string>;
 const empInfo = employee.employmentInfo as Record<string, Record<string, string>>;
 const status = (empInfo?.job?.employeeStatus ||'active').toLowerCase() as'active' |'probation' |'inactive' |'terminated';
 return (
 <PersonHero
 avatar={{
 src: employee.photo as string | undefined,
 fallback: `${(info?.firstNameEn ||'')[0] ||''}${(info?.lastNameEn ||'')[0] ||''}`,
 status,
 }}
 name={{
 th: `${info?.firstNameTh ||''} ${info?.lastNameTh ||''}`.trim() || undefined,
 en: `${info?.firstNameEn ||''} ${info?.lastNameEn ||''}`.trim() || undefined,
 }}
 employeeId={employee.employeeId as string}
 subtitle={empInfo?.organization?.position}
 meta={[empInfo?.organization?.department, empInfo?.organization?.workLocation].filter(Boolean).join(' ·')}
 status={status}
 stats={[
 { label:'อายุงาน', value: empInfo?.details?.yearsOfService ||'—' },
 { label:'Direct reports', value: ((employee.orgChart as Record<string, unknown>)?.directReports as unknown[])?.length ?? 0 },
 ]}
 actions={
 <>
 {isHR(roles) && (
 <Button variant="outline" size="sm" onClick={() => setActiveTab('personal')}>
 <Edit className="mr-1.5 h-4 w-4" />
 แก้ไข
 </Button>
 )}
 <Button variant="ghost" size="sm" onClick={() => setShowOrgChart(true)}>
 <Network className="mr-1.5 h-4 w-4" />
 Org Chart
 </Button>
 </>
 }
 />
 );
 })()}
 <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />
 <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
 {renderTabContent()}
 </div>
 </main>
 </div>

 {/* Org Chart Modal */}
 <Modal
 open={showOrgChart}
 onClose={() => setShowOrgChart(false)}
 title="Organization Chart"
 className="max-w-2xl"
 >
 {orgChart ? (
 <OrgChart
 supervisor={orgChart.supervisor as { id: string; name: string; title: string; photo?: string } | undefined}
 current={
 (orgChart.employee as { id: string; name: string; title: string; photo?: string }) || {
 id:'',
 name:'',
 title:'',
 }
 }
 directReports={orgChart.directReports as { id: string; name: string; title: string; photo?: string }[] | undefined}
 onNodeClick={(id) => {
 setShowOrgChart(false);
 router.push(`/profile?id=${id}`);
 }}
 />
 ) : (
 <p className="text-sm text-ink-muted text-center py-8">No org chart data available</p>
 )}
 </Modal>
 </div>
 );
}
