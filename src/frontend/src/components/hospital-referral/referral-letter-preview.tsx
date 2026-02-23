'use client';

import { useTranslations } from 'next-intl';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Printer, Download } from 'lucide-react';
import type { HospitalReferral } from '@/hooks/use-hospital-referral';

interface ReferralLetterPreviewProps {
  referral: HospitalReferral;
  open: boolean;
  onClose: () => void;
}

export function ReferralLetterPreview({ referral, open, onClose }: ReferralLetterPreviewProps) {
  const t = useTranslations('hospitalReferral');
  const tc = useTranslations('common');

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Placeholder — no-op for now
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('referralLetter')}
      className="max-w-2xl"
      footer={
        <div className="flex justify-end gap-2 print:hidden">
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            {t('downloadLetter')}
          </Button>
          <Button size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            {t('printLetter')}
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            {tc('close')}
          </Button>
        </div>
      }
    >
      {/* Letter content — styled for professional look and print */}
      <div className="print:shadow-none print:p-0 font-serif">
        {/* Company Header */}
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
            {t('companyName')}
          </h1>
          <p className="text-sm text-gray-600 mt-0.5">เซ็นทรัล กรุ๊ป</p>
          <p className="text-xs text-gray-500 mt-1">
            Central Group Holdings Co., Ltd. | Human Resources Department
          </p>
        </div>

        {/* Letter Title */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest">
            {t('letterTitle')}
          </h2>
          <p className="text-sm text-gray-600 mt-1">หนังสือส่งตัวรักษาพยาบาล</p>
          <p className="text-xs text-gray-500 mt-0.5 italic">{t('letterSubtitle')}</p>
        </div>

        {/* Referral Number & Date */}
        <div className="flex justify-between text-sm mb-6">
          <div>
            <span className="text-gray-500">{t('referralNumber')}:</span>{' '}
            <span className="font-medium">{referral.referralNumber || referral.id}</span>
          </div>
          <div>
            <span className="text-gray-500">Date Issued:</span>{' '}
            <span className="font-medium">
              {referral.issuedAt
                ? new Date(referral.issuedAt).toLocaleDateString('en-US', { dateStyle: 'long' })
                : new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}
            </span>
          </div>
        </div>

        {/* Main content box */}
        <div className="border border-gray-300 rounded-lg p-6 space-y-4 bg-gray-50 text-sm">
          {/* Employee info */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {t('issuedTo')}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-gray-500 text-xs">Employee Name</p>
                <p className="font-semibold text-gray-900">{referral.employeeName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Employee ID</p>
                <p className="font-semibold text-gray-900">{referral.employeeId}</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Hospital info */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {t('authorizedHospital')}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-gray-500 text-xs">Hospital</p>
                <p className="font-semibold text-gray-900">{referral.hospitalName}</p>
              </div>
              {referral.hospitalBranch && (
                <div>
                  <p className="text-gray-500 text-xs">Branch</p>
                  <p className="font-semibold text-gray-900">{referral.hospitalBranch}</p>
                </div>
              )}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Valid period */}
          {(referral.validFrom || referral.validUntil) && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t('validPeriod')}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {referral.validFrom && (
                  <div>
                    <p className="text-gray-500 text-xs">{t('validFrom')}</p>
                    <p className="font-semibold text-gray-900">{referral.validFrom}</p>
                  </div>
                )}
                {referral.validUntil && (
                  <div>
                    <p className="text-gray-500 text-xs">{t('validUntil')}</p>
                    <p className="font-semibold text-gray-900">{referral.validUntil}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <hr className="border-gray-200" />

          {/* Reason */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {t('reason')}
            </p>
            <p className="text-gray-700 leading-relaxed">{referral.reason}</p>
          </div>
        </div>

        {/* Signature section */}
        <div className="mt-8 grid grid-cols-2 gap-8 text-sm">
          <div className="text-center">
            <div className="border-b border-gray-400 pb-1 mb-2 min-h-[48px]" />
            <p className="text-gray-500 text-xs">{t('approvedBy')}</p>
            {referral.approvedBy && (
              <p className="text-xs text-gray-400 mt-0.5">
                {referral.approvedAt
                  ? new Date(referral.approvedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })
                  : ''}
              </p>
            )}
          </div>
          <div className="text-center">
            <div className="border-b border-gray-400 pb-1 mb-2 min-h-[48px]" />
            <p className="text-gray-500 text-xs">{t('issuedBy')}</p>
            {referral.issuedBy && (
              <p className="text-xs text-gray-400 mt-0.5">
                {referral.issuedAt
                  ? new Date(referral.issuedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })
                  : ''}
              </p>
            )}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400 italic">
            This letter is valid only for the authorized hospital and period stated above.
            This document is issued by the Human Resources Department, Central Group Holdings Co., Ltd.
          </p>
        </div>
      </div>
    </Modal>
  );
}
