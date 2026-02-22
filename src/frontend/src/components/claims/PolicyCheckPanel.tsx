'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { PolicyCheck } from '@/hooks/use-claims';
import { cn } from '@/lib/utils';

interface PolicyCheckPanelProps {
  checks: PolicyCheck[];
  className?: string;
}

export function PolicyCheckPanel({ checks, className }: PolicyCheckPanelProps) {
  const t = useTranslations('smartClaims.policy');

  const hasHardFail = checks.some((c) => !c.passed && c.severity === 'error');
  const hasWarning = checks.some((c) => c.severity === 'warning');
  const allPassed = checks.length > 0 && checks.every((c) => c.passed);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary banner */}
        {hasHardFail && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
            <XCircle className="h-4 w-4 flex-shrink-0" />
            {t('failed')}
          </div>
        )}
        {!hasHardFail && hasWarning && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-800">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            {t('warning')}
          </div>
        )}
        {allPassed && !hasWarning && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-800">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            {t('passed')}
          </div>
        )}

        {/* Individual checks */}
        {checks.length > 0 ? (
          <ul className="space-y-2">
            {checks.map((check, idx) => {
              const icon = check.passed
                ? check.severity === 'warning'
                  ? <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  : <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                : <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />;

              return (
                <li
                  key={idx}
                  className={cn(
                    'flex items-start gap-2 rounded-lg px-3 py-2 text-sm',
                    !check.passed && check.severity === 'error' && 'bg-red-50 text-red-700',
                    check.severity === 'warning' && 'bg-yellow-50 text-yellow-700',
                    check.passed && check.severity !== 'warning' && 'bg-gray-50 text-gray-700'
                  )}
                >
                  {icon}
                  <span>{check.message}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Enter claim details to see policy checks.</p>
        )}
      </CardContent>
    </Card>
  );
}
