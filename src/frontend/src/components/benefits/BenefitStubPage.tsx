'use client';

// STA-26 PR-A — shared "Coming soon" stub used by exception, import, payment, reports
import { useLocale } from 'next-intl';
import { Clock } from 'lucide-react';
import { EmptyState } from '@/components/humi';

export interface BenefitStubPageProps {
  prSlug: string;   // e.g. "PR-B"
  titleTh: string;
  titleEn: string;
}

export function BenefitStubPage({ prSlug, titleTh, titleEn }: BenefitStubPageProps) {
  const locale = useLocale();
  const isTh = locale !== 'en';
  return (
    <div className="p-6">
      <EmptyState
        icon={Clock}
        titleTh={titleTh}
        titleEn={titleEn}
        descTh={`หน้านี้กำลังพัฒนา จะ ship ใน ${prSlug} (STA-26)`}
        descEn={`Coming soon — ships in ${prSlug} (STA-26)`}
      />
    </div>
  );
}
