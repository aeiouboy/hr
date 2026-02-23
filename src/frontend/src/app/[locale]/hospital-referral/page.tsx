'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { Header } from '@/components/shared/header';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Sidebar } from '@/components/shared/sidebar';
import { Tabs } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useHospitalReferral, HospitalReferral } from '@/hooks/use-hospital-referral';
import { ReferralRequestForm } from '@/components/hospital-referral/referral-request-form';
import { ReferralHistory } from '@/components/hospital-referral/referral-history';
import { ReferralDetail } from '@/components/hospital-referral/referral-detail';
import { ReferralLetterPreview } from '@/components/hospital-referral/referral-letter-preview';

type TabKey = 'newRequest' | 'myReferrals';

export default function HospitalReferralPage() {
  const t = useTranslations('hospitalReferral');
  const tc = useTranslations('common');

  const [activeTab, setActiveTab] = useState<TabKey>('myReferrals');
  const [selectedReferral, setSelectedReferral] = useState<HospitalReferral | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [letterPreviewOpen, setLetterPreviewOpen] = useState(false);

  const {
    referrals,
    hospitals,
    loading,
    submitting,
    createReferral,
    submitReferral,
    cancelReferral,
  } = useHospitalReferral();

  const tabs = [
    { key: 'newRequest', label: t('newRequest') },
    { key: 'myReferrals', label: t('myReferrals') },
  ];

  const handleViewDetail = (referral: HospitalReferral) => {
    setSelectedReferral(referral);
    setDetailOpen(true);
  };

  const handleViewLetter = (referral: HospitalReferral) => {
    setSelectedReferral(referral);
    setDetailOpen(false);
    setLetterPreviewOpen(true);
  };

  const handleCancelReferral = async (id: string) => {
    await cancelReferral(id);
  };

  const handleSubmitReferral = async (data: {
    hospitalName: string;
    hospitalBranch?: string;
    reason: string;
    preferredDate: string;
    notes?: string;
  }) => {
    const referral = await createReferral({
      ...data,
      employeeId: 'EMP001',
      employeeName: 'Somchai Jaidee',
    });
    if (referral) {
      await submitReferral(referral.id);
    }
    setActiveTab('myReferrals');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'newRequest':
        return (
          <ReferralRequestForm
            hospitals={hospitals}
            submitting={submitting}
            onSubmit={handleSubmitReferral}
            onCancel={() => setActiveTab('myReferrals')}
          />
        );
      case 'myReferrals':
        return (
          <ReferralHistory
            referrals={referrals}
            loading={loading}
            onViewDetail={handleViewDetail}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
              <Button
                onClick={() => setActiveTab('newRequest')}
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
        </main>
      </div>

      {/* Detail modal */}
      <ReferralDetail
        referral={selectedReferral}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onCancel={handleCancelReferral}
        onViewLetter={handleViewLetter}
      />

      {/* Letter preview modal */}
      {selectedReferral && (
        <ReferralLetterPreview
          referral={selectedReferral}
          open={letterPreviewOpen}
          onClose={() => setLetterPreviewOpen(false)}
        />
      )}
    </div>
  );
}
