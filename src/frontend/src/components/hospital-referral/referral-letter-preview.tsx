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
    const issuedDate = referral.issuedAt
      ? new Date(referral.issuedAt).toLocaleDateString('en-US', { dateStyle: 'long' })
      : new Date().toLocaleDateString('en-US', { dateStyle: 'long' });
    const approvedDate = referral.approvedAt
      ? new Date(referral.approvedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })
      : '';
    const issuedByDate = referral.issuedAt
      ? new Date(referral.issuedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })
      : '';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Referral Letter - ${referral.referralNumber || referral.id}</title>
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; max-width: 700px; margin: 40px auto; padding: 30px; color: #333; }
    .header { text-align: center; border-bottom: 2px solid #1a1a1a; padding-bottom: 16px; margin-bottom: 24px; }
    .header h1 { font-size: 22px; font-weight: bold; color: #1a1a1a; letter-spacing: 1px; margin: 0; }
    .header .sub { font-size: 13px; color: #666; margin-top: 4px; }
    .header .sub-sm { font-size: 11px; color: #999; margin-top: 4px; }
    .title { text-align: center; margin-bottom: 24px; }
    .title h2 { font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 3px; color: #1a1a1a; margin: 0; }
    .title .sub { font-size: 13px; color: #666; margin-top: 4px; }
    .title .sub-sm { font-size: 11px; color: #999; font-style: italic; margin-top: 4px; }
    .meta { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 24px; }
    .meta .label { color: #999; }
    .meta .value { font-weight: 500; }
    .content-box { border: 1px solid #d1d5db; border-radius: 8px; padding: 24px; background: #f9fafb; }
    .section { margin-bottom: 16px; }
    .section:last-child { margin-bottom: 0; }
    .section-title { font-size: 10px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .field-label { font-size: 11px; color: #999; }
    .field-value { font-size: 14px; font-weight: 600; color: #1a1a1a; }
    hr { border: none; border-top: 1px solid #e5e7eb; margin: 16px 0; }
    .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 32px; }
    .sig-block { text-align: center; }
    .sig-line { border-bottom: 1px solid #999; min-height: 48px; margin-bottom: 8px; }
    .sig-label { font-size: 11px; color: #999; }
    .sig-date { font-size: 10px; color: #bbb; margin-top: 4px; }
    .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #bbb; font-style: italic; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>${t('companyName')}</h1>
    <p class="sub">\u0E40\u0E0B\u0E47\u0E19\u0E17\u0E23\u0E31\u0E25 \u0E01\u0E23\u0E38\u0E4A\u0E1B</p>
    <p class="sub-sm">Central Group Holdings Co., Ltd. | Human Resources Department</p>
  </div>

  <div class="title">
    <h2>${t('letterTitle')}</h2>
    <p class="sub">\u0E2B\u0E19\u0E31\u0E07\u0E2A\u0E37\u0E2D\u0E2A\u0E48\u0E07\u0E15\u0E31\u0E27\u0E23\u0E31\u0E01\u0E29\u0E32\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25</p>
    <p class="sub-sm">${t('letterSubtitle')}</p>
  </div>

  <div class="meta">
    <div><span class="label">${t('referralNumber')}:</span> <span class="value">${referral.referralNumber || referral.id}</span></div>
    <div><span class="label">Date Issued:</span> <span class="value">${issuedDate}</span></div>
  </div>

  <div class="content-box">
    <div class="section">
      <p class="section-title">${t('issuedTo')}</p>
      <div class="grid">
        <div><p class="field-label">Employee Name</p><p class="field-value">${referral.employeeName}</p></div>
        <div><p class="field-label">Employee ID</p><p class="field-value">${referral.employeeId}</p></div>
      </div>
    </div>
    <hr />
    <div class="section">
      <p class="section-title">${t('authorizedHospital')}</p>
      <div class="grid">
        <div><p class="field-label">Hospital</p><p class="field-value">${referral.hospitalName}</p></div>
        ${referral.hospitalBranch ? `<div><p class="field-label">Branch</p><p class="field-value">${referral.hospitalBranch}</p></div>` : ''}
      </div>
    </div>
    <hr />
    ${referral.validFrom || referral.validUntil ? `
    <div class="section">
      <p class="section-title">${t('validPeriod')}</p>
      <div class="grid">
        ${referral.validFrom ? `<div><p class="field-label">${t('validFrom')}</p><p class="field-value">${referral.validFrom}</p></div>` : ''}
        ${referral.validUntil ? `<div><p class="field-label">${t('validUntil')}</p><p class="field-value">${referral.validUntil}</p></div>` : ''}
      </div>
    </div>
    <hr />` : ''}
    <div class="section">
      <p class="section-title">${t('reason')}</p>
      <p style="font-size:14px;color:#374151;line-height:1.6;">${referral.reason}</p>
    </div>
  </div>

  <div class="signatures">
    <div class="sig-block">
      <div class="sig-line"></div>
      <p class="sig-label">${t('approvedBy')}</p>
      ${referral.approvedBy && approvedDate ? `<p class="sig-date">${approvedDate}</p>` : ''}
    </div>
    <div class="sig-block">
      <div class="sig-line"></div>
      <p class="sig-label">${t('issuedBy')}</p>
      ${referral.issuedBy && issuedByDate ? `<p class="sig-date">${issuedByDate}</p>` : ''}
    </div>
  </div>

  <div class="footer">
    This letter is valid only for the authorized hospital and period stated above.
    This document is issued by the Human Resources Department, Central Group Holdings Co., Ltd.
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `referral-letter-${referral.referralNumber || referral.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
