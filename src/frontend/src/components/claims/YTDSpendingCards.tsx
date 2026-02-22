'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import type { YtdSpending } from '@/hooks/use-claims';
import { cn } from '@/lib/utils';

interface YTDSpendingCardsProps {
  spending: YtdSpending[];
  totalSpent: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  medical: 'bg-blue-500',
  travel: 'bg-green-500',
  meal: 'bg-orange-500',
  dental: 'bg-purple-500',
  office_supplies: 'bg-gray-500',
  training: 'bg-teal-500',
  other: 'bg-slate-500',
};

export function YTDSpendingCards({ spending, totalSpent }: YTDSpendingCardsProps) {
  const t = useTranslations('smartClaims.history');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total */}
      <Card className="border-l-4 border-l-cg-red">
        <CardContent className="p-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{t('totalSpent')}</p>
          <p className="text-2xl font-bold text-cg-dark mt-1">฿{totalSpent.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{t('ytdSpending')}</p>
        </CardContent>
      </Card>

      {/* By category */}
      {spending.map((cat) => {
        const pct = cat.limit > 0 ? Math.round((cat.spent / cat.limit) * 100) : 0;
        const barColor = CATEGORY_COLORS[cat.claimType] || 'bg-gray-500';
        return (
          <Card key={cat.claimType}>
            <CardContent className="p-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{cat.label}</p>
              <p className="text-xl font-bold text-cg-dark mt-1">฿{cat.spent.toLocaleString()}</p>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>{cat.count} claims</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', barColor)}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">of ฿{cat.limit.toLocaleString()} limit</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
