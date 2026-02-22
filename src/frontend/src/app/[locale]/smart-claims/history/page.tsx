'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Filter, X } from 'lucide-react';
import { PageLayout } from '@/components/shared/page-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormField } from '@/components/ui/form-field';
import { Modal } from '@/components/ui/modal';
import { YTDSpendingCards } from '@/components/claims/YTDSpendingCards';
import { ClaimTimeline } from '@/components/claims/ClaimTimeline';
import { useClaims } from '@/hooks/use-claims';
import type { ClaimRequest, ClaimStatus } from '@/hooks/use-claims';
import { Skeleton } from '@/components/ui/skeleton';

const STATUS_BADGE_MAP: Record<ClaimStatus, 'neutral' | 'info' | 'warning' | 'success' | 'error'> = {
  draft: 'neutral',
  submitted: 'info',
  processing: 'warning',
  approved: 'success',
  rejected: 'error',
};

export default function ClaimHistoryPage() {
  const t = useTranslations('smartClaims');
  const tc = useTranslations('common');

  const { claims, ytdSpending, loading, stats } = useClaims();

  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<ClaimRequest | null>(null);

  const filteredClaims = useMemo(() => {
    return claims.filter((c) => {
      if (statusFilter && c.status !== statusFilter) return false;
      if (categoryFilter && c.claimType !== categoryFilter) return false;
      if (dateFrom && c.receiptDate < dateFrom) return false;
      if (dateTo && c.receiptDate > dateTo) return false;
      return true;
    });
  }, [claims, statusFilter, categoryFilter, dateFrom, dateTo]);

  const statusOptions = [
    { value: 'draft', label: t('status.draft') },
    { value: 'submitted', label: t('status.submitted') },
    { value: 'processing', label: t('status.processing') },
    { value: 'approved', label: t('status.approved') },
    { value: 'rejected', label: t('status.rejected') },
  ];

  const categoryOptions = [
    { value: 'medical', label: t('categories.medical') },
    { value: 'travel', label: t('categories.travel') },
    { value: 'meal', label: t('categories.meals') },
  ];

  const clearFilters = () => {
    setStatusFilter('');
    setCategoryFilter('');
    setDateFrom('');
    setDateTo('');
  };

  const hasActiveFilters = statusFilter || categoryFilter || dateFrom || dateTo;

  if (loading) {
    return (
      <PageLayout module="smart-claims">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28" />)}
          </div>
          <Skeleton className="h-64" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout module="smart-claims">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <a href="./smart-claims">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </a>
          <div>
            <h1 className="text-2xl font-bold text-cg-dark">{t('history.title')}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{t('history.ytdSpending')}</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="mt-4 sm:mt-0"
        >
          <Filter className="h-4 w-4 mr-2" />
          {tc('search')}
          {hasActiveFilters && (
            <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-cg-red text-white text-xs">!</span>
          )}
        </Button>
      </div>

      {/* YTD Spending */}
      <div className="mb-6">
        <YTDSpendingCards spending={ytdSpending} totalSpent={stats.totalYtdSpent} />
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                label="Status"
                name="statusFilter"
                type="select"
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                placeholder={tc('all')}
              />
              <FormField
                label="Category"
                name="categoryFilter"
                type="select"
                value={categoryFilter}
                onChange={setCategoryFilter}
                options={categoryOptions}
                placeholder={tc('all')}
              />
              <FormField
                label="From"
                name="dateFrom"
                type="date"
                value={dateFrom}
                onChange={setDateFrom}
              />
              <FormField
                label="To"
                name="dateTo"
                type="date"
                value={dateTo}
                onChange={setDateTo}
              />
            </div>
            {hasActiveFilters && (
              <div className="mt-3 flex justify-end">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-3 w-3 mr-1" />
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Claims table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Category</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Merchant</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Amount</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">{tc('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    {tc('noData')}
                  </td>
                </tr>
              ) : (
                filteredClaims.map((claim) => (
                  <tr
                    key={claim.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedClaim(claim)}
                  >
                    <td className="px-4 py-3 text-gray-900">{claim.receiptDate}</td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{claim.claimType}</td>
                    <td className="px-4 py-3 text-gray-900">{claim.merchant || '—'}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      ฿{claim.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={STATUS_BADGE_MAP[claim.status]}>
                        {t(`status.${claim.status}`)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedClaim(claim); }}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detail slide-over modal */}
      <Modal
        open={!!selectedClaim}
        onClose={() => setSelectedClaim(null)}
        title={selectedClaim ? `Claim ${selectedClaim.id}` : ''}
        className="max-w-md"
      >
        {selectedClaim && (
          <div className="space-y-6">
            {/* Claim info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm font-medium capitalize">{selectedClaim.claimType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-sm font-medium">฿{selectedClaim.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Merchant</p>
                <p className="text-sm font-medium">{selectedClaim.merchant || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Receipt Date</p>
                <p className="text-sm font-medium">{selectedClaim.receiptDate}</p>
              </div>
            </div>

            {selectedClaim.notes && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Notes</p>
                <p className="text-sm text-gray-700">{selectedClaim.notes}</p>
              </div>
            )}

            {/* OCR confidence */}
            {selectedClaim.ocrResult && (
              <div>
                <p className="text-xs text-gray-500 mb-1">OCR Confidence</p>
                <Badge variant={selectedClaim.ocrResult.confidence >= 0.8 ? 'success' : selectedClaim.ocrResult.confidence >= 0.6 ? 'warning' : 'error'}>
                  {Math.round(selectedClaim.ocrResult.confidence * 100)}%
                </Badge>
              </div>
            )}

            {/* Timeline */}
            <div>
              <p className="text-xs text-gray-500 mb-3">Approval Timeline</p>
              <ClaimTimeline claim={selectedClaim} />
            </div>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
}
