import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Capability } from '@/components/humi/atoms/Capability';
import { Card, CardEyebrow, CardTitle, Button } from '@/components/humi';
import { TalentSearchPanel } from '@/components/talent/TalentSearchPanel';

// ════════════════════════════════════════════════════════════
// /hrbp/talent-search — Talent Search (HRBP-only).
//
// Gated by <Capability action="talentSearch"> — non-HRBP
// personas (Manager, SPD, Employee, HR Admin without the
// talent bundle) see the NotAuthorized fallback.
//
// Source: MOCKUP-MATRIX A-8, 01-sf-system-baseline §3.
// ════════════════════════════════════════════════════════════

interface Props {
  params: Promise<{ locale: string }>;
}

function NotAuthorized({ locale }: { locale: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="max-w-md w-full p-8 text-center flex flex-col items-center gap-4">
        <CardEyebrow>Access Restricted</CardEyebrow>
        <CardTitle>ฟีเจอร์นี้สำหรับ HRBP เท่านั้น</CardTitle>
        <p className="text-small text-ink-muted">
          Talent Search is for HRBP only.
          <br />
          หากคุณเชื่อว่าควรมีสิทธิ์เข้าถึง กรุณาติดต่อผู้ดูแลระบบ
        </p>
        <Link href={`/${locale}/home`}>
          <Button variant="secondary" size="sm">
            ← กลับหน้าหลัก / Back to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}

export default async function TalentSearchPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'talent_search' });

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="sr-only">{t('pageTitle')}</h1>
      <Capability action="talentSearch" fallback={<NotAuthorized locale={locale} />}>
        <TalentSearchPanel />
      </Capability>
    </main>
  );
}
