'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Upload, FileText, Camera, CheckCircle, AlertTriangle, AlertCircle,
  Info, Clock, DollarSign, Receipt, Send, Save, X, Loader2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { FormField } from '@/components/ui/form-field';
import { Modal } from '@/components/ui/modal';
import { Skeleton } from '@/components/ui/skeleton';
import { useClaims, type ClaimType, type ClaimStatus, type OcrResult, type PolicyCheck, type ClaimRequest } from '@/hooks/use-claims';
import { formatCurrency, formatDate } from '@/lib/date';

const STATUS_VARIANT: Record<ClaimStatus, 'neutral' | 'info' | 'warning' | 'success' | 'error'> = {
  draft: 'neutral', submitted: 'info', processing: 'warning', approved: 'success', rejected: 'error',
};

const STATUS_LABEL: Record<ClaimStatus, string> = {
  draft: 'Draft', submitted: 'Submitted', processing: 'Processing', approved: 'Approved', rejected: 'Rejected',
};

const CLAIM_TYPE_LABELS: Record<ClaimType, string> = {
  medical: 'Medical', travel: 'Travel', meal: 'Meal/Entertainment',
};

const SEVERITY_ICON: Record<string, React.ReactNode> = {
  error: <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />,
  warning: <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />,
  info: <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />,
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

export function SmartClaimsPage() {
  const t = useTranslations('common');
  const {
    claims, ytdSpending, policies, loading, ocrProcessing, stats,
    processReceipt, validateClaim, saveDraft, submitClaim,
  } = useClaims();

  const [activeTab, setActiveTab] = useState('new');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [policyChecks, setPolicyChecks] = useState<PolicyCheck[]>([]);
  const [form, setForm] = useState({ claimType: 'medical' as ClaimType, amount: 0, notes: '', merchant: '', receiptDate: '' });
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState('');
  const [detailClaim, setDetailClaim] = useState<ClaimRequest | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { key: 'new', label: 'New Claim' },
    { key: 'history', label: 'Claim History' },
    { key: 'dashboard', label: 'YTD Dashboard' },
  ];

  // File validation
  const validateFile = useCallback((file: File): boolean => {
    setFileError('');
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setFileError('File type not supported. Please upload JPG, PNG, or PDF.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File too large. Maximum size is 10MB.');
      return false;
    }
    return true;
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback(async (file: File) => {
    if (!validateFile(file)) return;
    setSelectedFile(file);
    setStep(2);

    // Process with OCR
    const result = await processReceipt(file);
    setOcrResult(result);
    setForm((prev) => ({
      ...prev,
      amount: result.extractedAmount,
      merchant: result.extractedMerchant,
      receiptDate: result.extractedDate,
    }));

    // Run policy check
    const checks = validateClaim(form.claimType, result.extractedAmount);
    setPolicyChecks(checks);
  }, [validateFile, processReceipt, validateClaim, form.claimType]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleAmountChange = useCallback((value: string) => {
    const amount = parseFloat(value) || 0;
    setForm((prev) => ({ ...prev, amount }));
    const checks = validateClaim(form.claimType, amount);
    setPolicyChecks(checks);
  }, [validateClaim, form.claimType]);

  const handleTypeChange = useCallback((value: string) => {
    const claimType = value as ClaimType;
    setForm((prev) => ({ ...prev, claimType }));
    if (form.amount > 0) {
      const checks = validateClaim(claimType, form.amount);
      setPolicyChecks(checks);
    }
  }, [validateClaim, form.amount]);

  const handleSaveDraft = async () => {
    await saveDraft({
      claimType: form.claimType,
      amount: form.amount,
      receiptDate: form.receiptDate,
      receiptFileName: selectedFile?.name || '',
      ocrResult: ocrResult ?? undefined,
      policyChecks,
      notes: form.notes,
      merchant: form.merchant,
    });
    resetForm();
    setActiveTab('history');
  };

  const handleSubmit = async () => {
    const claim = await saveDraft({
      claimType: form.claimType,
      amount: form.amount,
      receiptDate: form.receiptDate,
      receiptFileName: selectedFile?.name || '',
      ocrResult: ocrResult ?? undefined,
      policyChecks,
      notes: form.notes,
      merchant: form.merchant,
    });
    await submitClaim(claim.id);
    resetForm();
    setActiveTab('history');
  };

  const resetForm = () => {
    setStep(1);
    setSelectedFile(null);
    setOcrResult(null);
    setPolicyChecks([]);
    setForm({ claimType: 'medical', amount: 0, notes: '', merchant: '', receiptDate: '' });
    setFileError('');
  };

  const hasHardError = policyChecks.some((c) => !c.passed && c.severity === 'error');

  if (loading) {
    return <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 w-full" />)}</div>;
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cg-dark">Smart Claims</h1>
        <p className="text-gray-500 mt-1">AI-powered expense claims with OCR receipt scanning</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold text-cg-dark">{stats.totalClaims}</p><p className="text-xs text-gray-400">Total Claims</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold text-yellow-600">{stats.pendingClaims}</p><p className="text-xs text-gray-400">Pending</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold text-green-600">{stats.approvedClaims}</p><p className="text-xs text-gray-400">Approved</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xl font-bold text-cg-dark">{formatCurrency(stats.totalYtdSpent)}</p><p className="text-xs text-gray-400">YTD Spent</p></CardContent></Card>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      {/* ===== NEW CLAIM TAB ===== */}
      {activeTab === 'new' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= s ? 'bg-cg-red text-white' : 'bg-gray-200 text-gray-500'
                  }`}>{s}</div>
                  <span className="text-xs ml-1.5 text-gray-500">
                    {s === 1 ? 'Upload Receipt' : s === 2 ? 'OCR Result' : 'Claim Details'}
                  </span>
                  {s < 3 && <div className={`w-12 h-0.5 mx-2 ${step > s ? 'bg-cg-red' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>

            {/* STEP 1: Receipt Upload */}
            {step === 1 && (
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Upload className="h-5 w-5" /> Step 1: Upload Receipt</CardTitle></CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                      dragOver ? 'border-cg-red bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-cg-dark mb-2">
                      Drag & drop your receipt here
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supports JPG, PNG, PDF (max 10MB)
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <FileText className="h-4 w-4 mr-2" /> Choose File
                      </Button>
                      <Button variant="outline">
                        <Camera className="h-4 w-4 mr-2" /> Camera
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileSelect(file); }}
                    />
                  </div>
                  {fileError && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4" /> {fileError}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* STEP 2: OCR Result */}
            {step >= 2 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2"><Receipt className="h-5 w-5" /> Step 2: AI OCR Result</CardTitle>
                    {ocrResult && (
                      <ConfidenceBadge confidence={ocrResult.confidence} />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {ocrProcessing ? (
                    <div className="flex flex-col items-center py-12">
                      <Loader2 className="h-10 w-10 text-cg-red animate-spin mb-4" />
                      <p className="text-sm font-medium text-cg-dark">Processing receipt with AI OCR...</p>
                      <p className="text-xs text-gray-400 mt-1">This usually takes a few seconds</p>
                    </div>
                  ) : ocrResult ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Receipt preview placeholder */}
                      <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px]">
                        <FileText className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-600">{selectedFile?.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : ''}
                        </p>
                      </div>

                      {/* Extracted data */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-500">Merchant</span>
                          <span className="text-sm font-semibold text-cg-dark">{ocrResult.extractedMerchant}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-500">Date</span>
                          <span className="text-sm font-semibold text-cg-dark">{formatDate(ocrResult.extractedDate, 'medium')}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-500">Amount</span>
                          <span className="text-sm font-bold text-cg-red">{formatCurrency(ocrResult.extractedAmount)}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-500">Tax ID</span>
                          <span className="text-sm font-semibold text-cg-dark">{ocrResult.extractedTaxId}</span>
                        </div>
                        {ocrResult.confidence < 0.8 && (
                          <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-yellow-800">Low confidence score. Please verify the extracted data and correct any errors.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}

                  {ocrResult && !ocrProcessing && (
                    <div className="flex justify-end mt-4">
                      <Button onClick={() => setStep(3)}>Continue to Claim Details</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* STEP 3: Claim Details */}
            {step === 3 && (
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" /> Step 3: Claim Details</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <FormField
                      label="Claim Type"
                      name="claimType"
                      type="select"
                      value={form.claimType}
                      onChange={handleTypeChange}
                      options={[
                        { value: 'medical', label: 'Medical' },
                        { value: 'travel', label: 'Travel / Transport' },
                        { value: 'meal', label: 'Meal / Entertainment' },
                      ]}
                      required
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label="Amount (THB)"
                        name="amount"
                        value={String(form.amount)}
                        onChange={handleAmountChange}
                        required
                      />
                      <FormField
                        label="Receipt Date"
                        name="receiptDate"
                        type="date"
                        value={form.receiptDate}
                        onChange={(v) => setForm((p) => ({ ...p, receiptDate: v }))}
                        required
                      />
                    </div>
                    <FormField
                      label="Merchant / Provider"
                      name="merchant"
                      value={form.merchant}
                      onChange={(v) => setForm((p) => ({ ...p, merchant: v }))}
                    />
                    <FormField
                      label="Notes / Description"
                      name="notes"
                      type="textarea"
                      value={form.notes}
                      onChange={(v) => setForm((p) => ({ ...p, notes: v }))}
                      placeholder="Describe the purpose of this expense..."
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={handleSaveDraft}>
                      <Save className="h-4 w-4 mr-2" /> Save Draft
                    </Button>
                    <Button onClick={handleSubmit} disabled={hasHardError || form.amount <= 0}>
                      <Send className="h-4 w-4 mr-2" /> Submit Claim
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Policy Check Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Real-time Policy Check</CardTitle></CardHeader>
              <CardContent>
                {policyChecks.length === 0 ? (
                  <div className="text-center py-6">
                    <Info className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Upload a receipt to see policy validation</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {policyChecks.map((check, i) => (
                      <div key={i} className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                        check.severity === 'error' ? 'bg-red-50 border border-red-200' :
                        check.severity === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-green-50 border border-green-200'
                      }`}>
                        {SEVERITY_ICON[check.severity]}
                        <span className={
                          check.severity === 'error' ? 'text-red-800' :
                          check.severity === 'warning' ? 'text-yellow-800' :
                          'text-green-800'
                        }>{check.message}</span>
                      </div>
                    ))}
                    {hasHardError && (
                      <p className="text-xs text-red-600 font-medium mt-2">
                        Cannot submit: policy violations must be resolved
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Policy limits card */}
            <Card>
              <CardHeader><CardTitle className="text-base">Policy Limits</CardTitle></CardHeader>
              <CardContent>
                {policies.map((p) => (
                  <div key={p.claimType} className="mb-3 last:mb-0">
                    <p className="text-xs font-semibold text-gray-700 mb-1">{CLAIM_TYPE_LABELS[p.claimType]}</p>
                    <div className="grid grid-cols-3 gap-1 text-xs text-gray-500">
                      <div>Per claim<br /><span className="font-medium text-cg-dark">{formatCurrency(p.maxPerClaim)}</span></div>
                      <div>Per month<br /><span className="font-medium text-cg-dark">{formatCurrency(p.maxPerMonth)}</span></div>
                      <div>Per year<br /><span className="font-medium text-cg-dark">{formatCurrency(p.maxPerYear)}</span></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ===== HISTORY TAB ===== */}
      {activeTab === 'history' && (
        <Card>
          <CardContent className="p-0">
            {claims.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-12">No claims found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">ID</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Type</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Merchant</th>
                      <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase">Date</th>
                      <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase">Amount</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase">OCR</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase">Status</th>
                      <th className="text-center py-3 px-4 text-xs font-medium text-gray-400 uppercase"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((claim) => (
                      <tr key={claim.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-xs">{claim.id}</td>
                        <td className="py-3 px-4"><Badge variant="neutral">{CLAIM_TYPE_LABELS[claim.claimType]}</Badge></td>
                        <td className="py-3 px-4 text-gray-600">{claim.merchant || '-'}</td>
                        <td className="py-3 px-4 text-gray-600">{formatDate(claim.receiptDate, 'short')}</td>
                        <td className="py-3 px-4 text-right font-medium">{formatCurrency(claim.amount)}</td>
                        <td className="py-3 px-4 text-center">
                          {claim.ocrResult ? <ConfidenceBadge confidence={claim.ocrResult.confidence} compact /> : <span className="text-gray-300">-</span>}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={STATUS_VARIANT[claim.status]}>{STATUS_LABEL[claim.status]}</Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button size="sm" variant="ghost" onClick={() => setDetailClaim(claim)}>Details</Button>
                          {claim.status === 'draft' && (
                            <Button size="sm" variant="ghost" className="text-cg-red" onClick={() => submitClaim(claim.id)}>Submit</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* ===== DASHBOARD TAB ===== */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ytdSpending.map((ytd) => {
              const pct = ytd.limit > 0 ? Math.round((ytd.spent / ytd.limit) * 100) : 0;
              const barColor = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-cg-red';
              return (
                <Card key={ytd.claimType}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-cg-dark">{ytd.label}</h3>
                      <Badge variant="neutral">{ytd.count} claims</Badge>
                    </div>
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-2xl font-bold text-cg-dark">{formatCurrency(ytd.spent)}</span>
                      <span className="text-sm text-gray-400">/ {formatCurrency(ytd.limit)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className={`${barColor} h-3 rounded-full transition-all`} style={{ width: `${Math.min(100, pct)}%` }} />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{pct}% used</span>
                      <span>{formatCurrency(ytd.limit - ytd.spent)} remaining</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Monthly breakdown */}
          <Card>
            <CardHeader><CardTitle>Claims by Status</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                {(['draft', 'submitted', 'processing', 'approved', 'rejected'] as ClaimStatus[]).map((status) => {
                  const count = claims.filter((c) => c.status === status).length;
                  const total = claims.filter((c) => c.status === status).reduce((s, c) => s + c.amount, 0);
                  return (
                    <div key={status} className="p-4 bg-gray-50 rounded-lg">
                      <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
                      <p className="text-xl font-bold text-cg-dark mt-2">{count}</p>
                      <p className="text-xs text-gray-400">{formatCurrency(total)}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Claim Detail Modal */}
      <Modal open={!!detailClaim} onClose={() => setDetailClaim(null)} title="Claim Details" className="max-w-2xl">
        {detailClaim && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-sm text-gray-500">{detailClaim.id}</p>
                <Badge variant={STATUS_VARIANT[detailClaim.status]}>{STATUS_LABEL[detailClaim.status]}</Badge>
              </div>
              <p className="text-2xl font-bold text-cg-red">{formatCurrency(detailClaim.amount)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-400">Type</span><p className="font-medium">{CLAIM_TYPE_LABELS[detailClaim.claimType]}</p></div>
              <div><span className="text-gray-400">Merchant</span><p className="font-medium">{detailClaim.merchant || '-'}</p></div>
              <div><span className="text-gray-400">Receipt Date</span><p className="font-medium">{formatDate(detailClaim.receiptDate, 'medium')}</p></div>
              <div><span className="text-gray-400">Submitted</span><p className="font-medium">{detailClaim.submittedAt ? formatDate(detailClaim.submittedAt, 'medium') : '-'}</p></div>
            </div>
            {detailClaim.ocrResult && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-700">OCR Result</span>
                  <ConfidenceBadge confidence={detailClaim.ocrResult.confidence} compact />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <span>Amount: {formatCurrency(detailClaim.ocrResult.extractedAmount)}</span>
                  <span>Merchant: {detailClaim.ocrResult.extractedMerchant}</span>
                  <span>Date: {detailClaim.ocrResult.extractedDate}</span>
                  <span>Tax ID: {detailClaim.ocrResult.extractedTaxId}</span>
                </div>
              </div>
            )}
            {detailClaim.policyChecks.length > 0 && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-gray-700">Policy Checks</span>
                {detailClaim.policyChecks.map((check, i) => (
                  <div key={i} className={`flex items-center gap-2 p-2 rounded text-xs ${
                    check.severity === 'error' ? 'bg-red-50 text-red-800' :
                    check.severity === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                    'bg-green-50 text-green-800'
                  }`}>
                    {SEVERITY_ICON[check.severity]}
                    {check.message}
                  </div>
                ))}
              </div>
            )}
            {/* Status timeline */}
            <div>
              <span className="text-xs font-semibold text-gray-700">Status Timeline</span>
              <div className="flex items-center gap-0 mt-2">
                {(['draft', 'submitted', 'processing', 'approved'] as ClaimStatus[]).map((s, i) => {
                  const reached = (['draft', 'submitted', 'processing', 'approved', 'rejected'] as ClaimStatus[]).indexOf(detailClaim.status) >= i
                    || (detailClaim.status === 'rejected' && i <= 2);
                  const isRejected = detailClaim.status === 'rejected' && s === 'approved';
                  return (
                    <div key={s} className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isRejected ? 'bg-red-100 text-red-600' :
                        reached ? 'bg-cg-red text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {isRejected ? '✕' : reached ? '✓' : i + 1}
                      </div>
                      <span className="text-[10px] ml-1 text-gray-500 capitalize">{isRejected ? 'Rejected' : s}</span>
                      {i < 3 && <div className={`w-8 h-0.5 mx-1 ${reached && !isRejected ? 'bg-cg-red' : 'bg-gray-200'}`} />}
                    </div>
                  );
                })}
              </div>
            </div>
            {detailClaim.rejectionReason && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                <strong>Rejection reason:</strong> {detailClaim.rejectionReason}
              </div>
            )}
            {detailClaim.notes && (
              <div className="text-sm"><span className="text-gray-400">Notes</span><p>{detailClaim.notes}</p></div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

// --- Confidence Badge Component ---
function ConfidenceBadge({ confidence, compact }: { confidence: number; compact?: boolean }) {
  const pct = Math.round(confidence * 100);
  const color = confidence >= 0.8 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  const icon = confidence >= 0.8 ? <CheckCircle className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />;
  if (compact) {
    return <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${color}`}>{icon}{pct}%</span>;
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${color}`}>
      {icon} Confidence: {pct}%
    </span>
  );
}
