'use client';

import { usePathname } from 'next/navigation';
import { Card, CardEyebrow, CardTitle } from '@/components/humi';
import { TaxPlanningPanel } from '@/components/benefits/tax/TaxPlanningPanel';

export default function PayrollTaxPlanningPage() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/en') ? 'en' : 'th';

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardEyebrow>Payroll tax planning</CardEyebrow>
          <h1 className="font-display text-3xl font-semibold text-ink">วางแผนภาษี</h1>
          <p className="mt-2 max-w-3xl text-small text-ink-muted">
            พนักงานจำลองภาษีจากข้อมูลสรุปที่ปลอดภัย แล้วส่งให้ Payroll ตรวจเพื่อวางแผนเท่านั้น ไม่ใช่การยื่นภาษีหรือแก้ไข payroll snapshot โดยตรง
          </p>
        </div>
        <a href={`/${locale}/payroll/tax-review`} className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-accent px-4 text-small font-semibold text-accent hover:bg-accent-soft">
          ไปคิว Payroll review
        </a>
      </header>

      <Card variant="flat" size="md" tone="accent">
        <CardTitle>Payroll/Tax context</CardTitle>
        <p className="mt-2 text-small text-ink-muted">
          เส้นทางนี้เป็น canonical surface สำหรับ Tax Planning แทนการเริ่ม workflow จาก Profile โดยยังใช้ store และ projection เดิมไปยัง /requests และ Payroll review
        </p>
      </Card>

      <TaxPlanningPanel />
    </div>
  );
}
