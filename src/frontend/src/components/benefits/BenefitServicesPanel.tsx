'use client';

import Link from 'next/link';
import { ArrowRight, Fuel, Hospital, Receipt, Stethoscope } from 'lucide-react';
import { Card, CardEyebrow, buttonVariants } from '@/components/humi';
import { benefitReferralRoute, benefitClaimRoute } from '@/lib/benefit-routes';
import { cn } from '@/lib/utils';
import { useBenefitReferralsStore } from '@/stores/benefit-referrals';

export function BenefitServicesPanel({ locale }: { locale: string; onOpenClaim?: () => void }) {
  const referrals = useBenefitReferralsStore((state) => state.referrals);
  const pendingReferralCount = referrals.filter((item) =>
    ['pending_spd', 'spd_reviewing', 'send_back', 'approved'].includes(item.status)
  ).length;

  const isTh = locale !== 'en';

  return (
    <section aria-labelledby="benefit-services-heading" className="space-y-4">
      {/* HERO — Hospital referral, prioritized for users who may be unwell */}
      <Card variant="raised" size="lg" className="humi-banner relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-40 w-32 rounded-full bg-[color:var(--color-butter)] opacity-50 blur-2xl"
        />
        <div
          aria-hidden
          className="absolute right-32 top-20 h-24 w-20 rounded-full bg-[color:var(--color-sage)] opacity-40 blur-2xl"
        />
        <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="space-y-3">
            <CardEyebrow>{isTh ? 'เริ่มต้นที่นี่ · ทำเร็วสุด' : 'Start here · fastest path'}</CardEyebrow>
            <h2
              id="benefit-services-heading"
              className={cn(
                'font-display font-semibold tracking-tight text-ink',
                'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
              )}
            >
              {isTh ? 'ไม่สบายใช่ไหม? ขอใบส่งตัวเข้าโรงพยาบาล' : 'Feeling unwell? Request a hospital referral'}
            </h2>
            <p className="max-w-xl text-body leading-relaxed text-ink-soft">
              {isTh
                ? 'ส่งคำขอครั้งเดียว — กรอกในหน้าเดียว ไม่ต้องจำหลายขั้นตอน'
                : 'One short form — single page, no multi-step.'}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={benefitReferralRoute(locale)}
                className={cn(buttonVariants({ variant: 'primary' }), 'min-h-[44px] gap-2 text-body')}
              >
                <Stethoscope size={16} aria-hidden />
                {isTh ? 'ขอใบส่งตัวตอนนี้' : 'Request referral now'}
                <ArrowRight size={14} aria-hidden />
              </Link>
              {pendingReferralCount > 0 && (
                <span className="text-small text-ink-muted">
                  {isTh
                    ? `คุณมี ${pendingReferralCount} ใบส่งตัวที่กำลังดำเนินการ`
                    : `You have ${pendingReferralCount} pending referral${pendingReferralCount === 1 ? '' : 's'}`}
                </span>
              )}
            </div>
          </div>
          <div className="hidden shrink-0 md:block">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-surface text-accent shadow-[var(--shadow-md)]">
              <Hospital size={56} aria-hidden strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </Card>

      {/* Secondary actions — claim shortcuts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SecondaryAction
          isTh={isTh}
          icon={<Receipt size={20} aria-hidden />}
          titleTh="เบิกค่ารักษา / ทันตกรรม"
          titleEn="Medical & dental claim"
          subtitleTh="ส่งใบเสร็จย้อนหลัง — กรอกหน้าเดียว"
          subtitleEn="Submit receipts on a single form"
          href={benefitClaimRoute(locale, 'BE-MED-001')}
        />
        <SecondaryAction
          isTh={isTh}
          icon={<Fuel size={20} aria-hidden />}
          titleTh="เบิกค่าเดินทาง"
          titleEn="Transport claim"
          subtitleTh="น้ำมัน · ทางด่วน · ที่จอดรถ"
          subtitleEn="Gas · Tolls · Parking"
          href={benefitClaimRoute(locale, 'BE-GAS-001')}
        />
      </div>

      {/* Single-form catalog link — one page, picker inside */}
      <p className="text-small text-ink-muted">
        {isTh ? 'เบิกประเภทอื่น? ' : 'Other benefit types? '}
        <Link
          href={benefitClaimRoute(locale)}
          className="font-semibold text-accent underline-offset-4 transition-colors hover:underline"
        >
          {isTh ? 'เปิดฟอร์มเดียวที่เลือกประเภทได้ทุกแผน →' : 'Open the unified claim form →'}
        </Link>
      </p>
    </section>
  );
}

function SecondaryAction({
  isTh,
  icon,
  titleTh,
  titleEn,
  subtitleTh,
  subtitleEn,
  href,
}: {
  isTh: boolean;
  icon: React.ReactNode;
  titleTh: string;
  titleEn: string;
  subtitleTh: string;
  subtitleEn: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      data-benefit-owned-action="true"
      className={cn(
        'group flex min-h-[44px] items-center gap-4 rounded-[var(--radius-md)] border border-hairline bg-surface px-5 py-4',
        'shadow-[var(--shadow-sm)] transition-all hover:border-accent hover:shadow-[var(--shadow-md)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
      )}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-accent-soft text-accent">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-body font-semibold text-ink">{isTh ? titleTh : titleEn}</p>
        <p className="text-small text-ink-muted">{isTh ? subtitleTh : subtitleEn}</p>
      </div>
      <ArrowRight
        size={16}
        aria-hidden
        className="shrink-0 text-ink-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </Link>
  );
}
