'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileTabs, type ProfileTabId } from '@/components/profile/profile-tabs';
import { PersonalInfoTab } from '@/components/profile/tabs/personal-info';
import { EmploymentTab } from '@/components/profile/tabs/employment';
import { CompensationTab } from '@/components/profile/tabs/compensation';
import { BenefitsTab } from '@/components/profile/tabs/benefits';
import { ProfileDetailsTab } from '@/components/profile/tabs/profile-details';
import { ScorecardTab } from '@/components/profile/tabs/scorecard';
import { OrgChart } from '@/components/profile/org-chart';
import { Modal } from '@/components/ui/modal';
import { useEmployee } from '@/hooks/use-employee';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTabId>('personal');
  const [showOrgChart, setShowOrgChart] = useState(false);
  const { employee, loading } = useEmployee();
  const router = useRouter();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoTab employee={employee} loading={loading} />;
      case 'employment':
        return <EmploymentTab employee={employee} loading={loading} />;
      case 'compensation':
        return <CompensationTab employee={employee} loading={loading} />;
      case 'benefits':
        return <BenefitsTab employee={employee} loading={loading} />;
      case 'profile-details':
        return <ProfileDetailsTab employee={employee} loading={loading} />;
      case 'scorecard':
        return <ScorecardTab employee={employee} loading={loading} />;
      default:
        return null;
    }
  };

  const orgChart = employee?.orgChart as Record<string, unknown> | undefined;

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <ProfileHeader
            employee={employee}
            loading={loading}
            onEditProfile={() => setActiveTab('personal')}
            onViewOrgChart={() => setShowOrgChart(true)}
          />
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
                id: '',
                name: '',
                title: '',
              }
            }
            directReports={orgChart.directReports as { id: string; name: string; title: string; photo?: string }[] | undefined}
            onNodeClick={(id) => {
              setShowOrgChart(false);
              router.push(`/profile?id=${id}`);
            }}
          />
        ) : (
          <p className="text-sm text-gray-500 text-center py-8">No org chart data available</p>
        )}
      </Modal>
    </div>
  );
}
