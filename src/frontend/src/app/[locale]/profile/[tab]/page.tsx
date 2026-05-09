import HumiProfileMePage from '../me/page';
import Performance from '../../performance/page';
import type { ProfileTab } from '@/stores/humi-profile-slice';

const LEGACY_PROFILE_TAB: Record<string, ProfileTab> = {
  personal: 'personal',
  employment: 'employment',
  job: 'employment',
  compensation: 'compensation',
  emergency: 'compensation',
  benefits: 'benefits',
  documents: 'documents',
  docs: 'documents',
  activity: 'activity',
  tax: 'activity',
};

export default async function ProfileTabPage({
  params,
}: {
  params: Promise<{ locale: string; tab: string }>;
}) {
  const { tab } = await params;
  const normalizedTab = tab.toLowerCase();

  if (normalizedTab === 'scorecard') {
    return <Performance />;
  }

  return <HumiProfileMePage initialTab={LEGACY_PROFILE_TAB[normalizedTab] ?? 'personal'} />;
}
