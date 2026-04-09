'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Upload,
  FileText,
  Camera,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  DollarSign,
  Receipt,
  Send,
  Save,
  X,
  Loader2,
  Check,
  ChevronRight,
  Plus,
  Eye,
  FileCheck,
  Heart,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { FormField } from '@/components/ui/form-field';
import { Modal } from '@/components/ui/modal';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useMedicalClaims,
  DISEASE_CATEGORIES,
  type MedicalClaimStatus,
  type MedicalClaim,
  type DiseaseCategory,
} from '@/hooks/use-medical-claims';
import { formatCurrency, formatDate } from '@/lib/date';
import { useToast } from '@/components/ui/toast';

// --- Constants ---

const STATUS_VARIANT: Record<MedicalClaimStatus, 'neutral' | 'info' | 'warning' | 'success' | 'error'> = {
  draft: 'neutral',
  submitted: 'info',
  pending_manager: 'warning',
  pending_hr: 'warning',
  processing: 'warning',
  approved: 'success',
  rejected: 'error',
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

// --- Helpers ---

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getCategoryLabel(cat: DiseaseCategory): string {
  return DISEASE_CATEGORIES.find((c) => c.value === cat)?.labelEn ?? cat;
}

// --- Types ---

type ActiveTab = 'overview' | 'newClaim' | 'history';
type WizardStep = 1 | 2 | 3;
type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';

interface ClaimForm {
  diseaseCategory: DiseaseCategory | '';
  diseaseDetails: string;
  hospitalName: string;
  treatmentDate: string;
  receiptAmount: string;
  claimAmount: string;
  remarks: string;
}

interface DocumentState {
  receipt: File | null;
  medicalCert: File | null;
  other: File[];
}

interface DragOverState {
  receipt: boolean;
  medicalCert: boolean;
  other: boolean;
}

interface FileErrorState {
  receipt: string;
  medicalCert: string;
  other: string;
}

const INITIAL_FORM: ClaimForm = {
  diseaseCategory: '',
  diseaseDetails: '',
  hospitalName: '',
  treatmentDate: '',
  receiptAmount: '',
  claimAmount: '',
  remarks: '',
};

const INITIAL_DOCUMENTS: DocumentState = { receipt: null, medicalCert: null, other: [] };
const INITIAL_DRAG: DragOverState = { receipt: false, medicalCert: false, other: false };
const INITIAL_ERRORS: FileErrorState = { receipt: '', medicalCert: '', other: '' };

// --- Component ---

export function MedicalClaimsPage() {
  const t = useTranslations();
  const { toast } = useToast();
  const { claims, summary, loading, stats, createClaim, addDocument, submitClaim, saveDraft } = useMedicalClaims();

  // Tab and wizard state
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [step, setStep] = useState<WizardStep>(1);

  // Form state
  const [form, setForm] = useState<ClaimForm>(INITIAL_FORM);
  const [documents, setDocuments] = useState<DocumentState>(INITIAL_DOCUMENTS);
  const [dragOver, setDragOver] = useState<DragOverState>(INITIAL_DRAG);
  const [fileErrors, setFileErrors] = useState<FileErrorState>(INITIAL_ERRORS);
  const [submitting, setSubmitting] = useState(false);

  // History state
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [detailClaim, setDetailClaim] = useState<MedicalClaim | null>(null);

  // File refs
  const receiptRef = useRef<HTMLInputElement>(null);
  const certRef = useRef<HTMLInputElement>(null);
  const otherRef = useRef<HTMLInputElement>(null);

  // --- Validation ---

  const validateFile = useCallback((file: File): string => {
    if (!ACCEPTED_TYPES.includes(file.type)) return 'File type not supported. Please upload JPG, PNG, or PDF.';
    if (file.size > MAX_FILE_SIZE) return 'File too large. Maximum size is 10MB.';
    return '';
  }, []);

  const validateStep1 = useCallback((): boolean => {
    if (!form.diseaseCategory) return false;
    if (!form.hospitalName.trim()) return false;
    if (!form.treatmentDate) return false;
    const treatDate = new Date(form.treatmentDate);
    if (treatDate >= new Date()) return false;
    const amount = parseFloat(form.receiptAmount);
    if (!amount || amount <= 0) return false;
    return true;
  }, [form]);

  const validateStep2 = useCallback((): boolean => {
    return documents.receipt !== null && documents.medicalCert !== null;
  }, [documents]);

  // --- Form helpers ---

  const updateForm = useCallback((field: keyof ClaimForm, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // Auto-fill claim amount from receipt, capped at remaining
      if (field === 'receiptAmount') {
        const receiptNum = parseFloat(value) || 0;
        const capped = Math.min(receiptNum, summary.remainingAmount);
        next.claimAmount = capped > 0 ? String(capped) : '';
      }
      return next;
    });
  }, [summary.remainingAmount]);

  const handleFileSelect = useCallback(
    (zone: 'receipt' | 'medicalCert' | 'other', files: FileList | null) => {
      if (!files || files.length === 0) return;
      if (zone === 'other') {
        const validFiles: File[] = [];
        for (let i = 0; i < files.length; i++) {
          const err = validateFile(files[i]);
          if (err) {
            setFileErrors((prev) => ({ ...prev, other: err }));
            return;
          }
          validFiles.push(files[i]);
        }
        setFileErrors((prev) => ({ ...prev, other: '' }));
        setDocuments((prev) => ({ ...prev, other: [...prev.other, ...validFiles] }));
      } else {
        const file = files[0];
        const err = validateFile(file);
        if (err) {
          setFileErrors((prev) => ({ ...prev, [zone]: err }));
          return;
        }
        setFileErrors((prev) => ({ ...prev, [zone]: '' }));
        setDocuments((prev) => ({ ...prev, [zone]: file }));
      }
    },
    [validateFile]
  );

  const removeFile = useCallback((zone: 'receipt' | 'medicalCert' | 'other', index?: number) => {
    if (zone === 'other' && index !== undefined) {
      setDocuments((prev) => ({ ...prev, other: prev.other.filter((_, i) => i !== index) }));
    } else {
      setDocuments((prev) => ({ ...prev, [zone]: zone === 'other' ? [] : null }));
    }
    setFileErrors((prev) => ({ ...prev, [zone]: '' }));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, zone: 'receipt' | 'medicalCert' | 'other') => {
    e.preventDefault();
    setDragOver((prev) => ({ ...prev, [zone]: true }));
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent, zone: 'receipt' | 'medicalCert' | 'other') => {
    e.preventDefault();
    setDragOver((prev) => ({ ...prev, [zone]: false }));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, zone: 'receipt' | 'medicalCert' | 'other') => {
      e.preventDefault();
      setDragOver((prev) => ({ ...prev, [zone]: false }));
      handleFileSelect(zone, e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  // --- Submit / Save ---

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setDocuments(INITIAL_DOCUMENTS);
    setFileErrors(INITIAL_ERRORS);
    setStep(1);
  }, []);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    try {
      const claim = await createClaim({
        diseaseCategory: form.diseaseCategory as DiseaseCategory,
        diseaseDetails: form.diseaseDetails,
        hospitalName: form.hospitalName,
        treatmentDate: form.treatmentDate,
        receiptAmount: parseFloat(form.receiptAmount),
        claimAmount: parseFloat(form.claimAmount),
        remarks: form.remarks,
      });

      if (documents.receipt) {
        await addDocument(claim.id, {
          type: 'receipt',
          fileName: documents.receipt.name,
          fileSize: documents.receipt.size,
        });
      }
      if (documents.medicalCert) {
        await addDocument(claim.id, {
          type: 'medical_cert',
          fileName: documents.medicalCert.name,
          fileSize: documents.medicalCert.size,
        });
      }
      for (const file of documents.other) {
        await addDocument(claim.id, {
          type: 'other',
          fileName: file.name,
          fileSize: file.size,
        });
      }

      await submitClaim(claim.id);

      resetForm();
      setActiveTab('history');
      toast('success', t('medicalClaims.toast.submitSuccess'));
    } catch {
      toast('error', t('medicalClaims.toast.submitError'));
    } finally {
      setSubmitting(false);
    }
  }, [form, documents, createClaim, addDocument, submitClaim, resetForm, toast, t]);

  const handleSaveDraft = useCallback(async () => {
    setSubmitting(true);
    try {
      const claim = await createClaim({
        diseaseCategory: form.diseaseCategory as DiseaseCategory,
        diseaseDetails: form.diseaseDetails,
        hospitalName: form.hospitalName,
        treatmentDate: form.treatmentDate,
        receiptAmount: parseFloat(form.receiptAmount) || 0,
        claimAmount: parseFloat(form.claimAmount) || 0,
        remarks: form.remarks,
      });

      if (documents.receipt) {
        await addDocument(claim.id, {
          type: 'receipt',
          fileName: documents.receipt.name,
          fileSize: documents.receipt.size,
        });
      }
      if (documents.medicalCert) {
        await addDocument(claim.id, {
          type: 'medical_cert',
          fileName: documents.medicalCert.name,
          fileSize: documents.medicalCert.size,
        });
      }
      for (const file of documents.other) {
        await addDocument(claim.id, {
          type: 'other',
          fileName: file.name,
          fileSize: file.size,
        });
      }

      await saveDraft(claim.id);

      resetForm();
      setActiveTab('history');
      toast('success', t('medicalClaims.toast.draftSaved'));
    } catch {
      toast('error', t('medicalClaims.toast.saveError'));
    } finally {
      setSubmitting(false);
    }
  }, [form, documents, createClaim, addDocument, saveDraft, resetForm, toast, t]);

  // --- Filter claims ---

  const filteredClaims = claims.filter((c) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending') {
      return ['submitted', 'pending_manager', 'pending_hr', 'processing'].includes(c.status);
    }
    return c.status === statusFilter;
  });

  // --- Computed ---

  const usagePercent = summary.annualLimit > 0
    ? Math.min(100, Math.round((summary.usedAmount / summary.annualLimit) * 100))
    : 0;

  const claimAmountNum = parseFloat(form.claimAmount) || 0;
  const withinLimit = claimAmountNum <= summary.remainingAmount;

  // --- Loading state ---

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  // --- Tab definitions ---

  const tabItems = [
    { key: 'overview', label: t('medicalClaims.tabs.overview') },
    { key: 'newClaim', label: t('medicalClaims.tabs.newClaim') },
    { key: 'history', label: t('medicalClaims.tabs.history') },
  ];

  // --- Render: Step Indicator ---

  const renderStepIndicator = () => {
    const steps = [
      { num: 1, label: t('medicalClaims.form.stepInfo') },
      { num: 2, label: t('medicalClaims.form.stepDocuments') },
      { num: 3, label: t('medicalClaims.form.stepReview') },
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, i) => {
          const isActive = step >= s.num;
          const isComplete = step > s.num;
          return (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    isActive
                      ? 'bg-brand text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : s.num}
                </div>
                <span
                  className={`mt-1 text-xs ${
                    isActive ? 'text-brand font-medium' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-12 sm:w-20 ${
                    step > s.num ? 'bg-brand' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // --- Render: Upload Zone ---

  const renderUploadZone = (
    zone: 'receipt' | 'medicalCert' | 'other',
    label: string,
    required: boolean,
    file: File | null,
    inputRef: React.RefObject<HTMLInputElement | null>,
    multiple = false
  ) => {
    const isDragActive = dragOver[zone];
    const error = fileErrors[zone];
    const otherFiles = zone === 'other' ? documents.other : [];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>

        {/* Show file if uploaded (single) */}
        {zone !== 'other' && file && (
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="h-4 w-4 text-green-600 shrink-0" />
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{file.name}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{formatFileSize(file.size)}</span>
            </div>
            <button
              onClick={() => removeFile(zone)}
              className="rounded p-1 hover:bg-red-100 transition-colors shrink-0"
            >
              <X className="h-4 w-4 text-red-500" />
            </button>
          </div>
        )}

        {/* Other files list */}
        {zone === 'other' && otherFiles.length > 0 && (
          <div className="space-y-2">
            {otherFiles.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-3">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{f.name}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{formatFileSize(f.size)}</span>
                </div>
                <button
                  onClick={() => removeFile('other', i)}
                  className="rounded p-1 hover:bg-red-100 transition-colors shrink-0"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Drop zone (show if no file for single, always for other) */}
        {(zone === 'other' || !file) && (
          <div
            onDragOver={(e) => handleDragOver(e, zone)}
            onDragLeave={(e) => handleDragLeave(e, zone)}
            onDrop={(e) => handleDrop(e, zone)}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              isDragActive
                ? 'border-brand bg-red-50'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <Upload className="mb-2 h-6 w-6 text-gray-400 dark:text-gray-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('medicalClaims.form.dragDrop')}
            </p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">JPG, PNG, PDF (max 10MB)</p>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" type="button" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
                <FileText className="mr-1 h-4 w-4" />
                {t('medicalClaims.form.browse')}
              </Button>
              {zone === 'receipt' && (
                <Button variant="outline" size="sm" type="button" className="sm:hidden" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
                  <Camera className="mr-1 h-4 w-4" />
                  {t('medicalClaims.form.camera')}
                </Button>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_TYPES.join(',')}
              multiple={multiple}
              className="hidden"
              onChange={(e) => handleFileSelect(zone, e.target.files)}
            />
          </div>
        )}

        {error && (
          <p className="text-xs text-danger flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  };

  // --- Render: Overview Tab ---

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Benefit summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
        <Card>
          <CardContent className="p-5 sm:p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-4 w-4 lg:h-5 lg:w-5 text-brand" />
              <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{t('medicalClaims.overview.planType')}</span>
            </div>
            <p className="text-lg lg:text-xl font-semibold">{summary.planType}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 sm:p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
              <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{t('medicalClaims.overview.annualLimit')}</span>
            </div>
            <p className="text-lg lg:text-xl font-semibold">{formatCurrency(summary.annualLimit)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 sm:p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Receipt className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-500" />
              <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{t('medicalClaims.overview.used')}</span>
            </div>
            <p className="text-lg lg:text-xl font-semibold">{formatCurrency(summary.usedAmount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 sm:p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
              <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{t('medicalClaims.overview.remaining')}</span>
            </div>
            <p className="text-lg lg:text-xl font-semibold">{formatCurrency(summary.remainingAmount)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress bar */}
      <Card>
        <CardContent className="p-5 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('medicalClaims.overview.usageProgress')}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{usagePercent}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                usagePercent > 80 ? 'bg-danger' : usagePercent > 50 ? 'bg-yellow-400' : 'bg-green-500'
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {formatCurrency(summary.remainingAmount)} {t('medicalClaims.overview.remainingLabel')}
          </p>
        </CardContent>
      </Card>

      {/* Recent claims */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            {t('medicalClaims.overview.recentClaims')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {claims.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
              {t('medicalClaims.overview.noClaims')}
            </p>
          ) : (
            <div className="space-y-3">
              {claims.slice(0, 3).map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-center justify-between rounded-lg border dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => setDetailClaim(claim)}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{claim.hospitalName}</span>
                      <Badge variant={STATUS_VARIANT[claim.status]}>
                        {t(`medicalClaims.status.${claim.status}`)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {getCategoryLabel(claim.diseaseCategory)} - {formatCurrency(claim.claimAmount)}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            variant="default"
            size="lg"
            onClick={() => setActiveTab('newClaim')}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t('medicalClaims.overview.startClaim')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  // --- Render: New Claim Tab ---

  const renderStep1 = () => (
    <div className="space-y-4">
      <FormField
        label={t('medicalClaims.form.diseaseCategory')}
        name="diseaseCategory"
        type="select"
        value={form.diseaseCategory}
        onChange={(v) => updateForm('diseaseCategory', v)}
        required
        placeholder={t('medicalClaims.form.selectCategory')}
        options={DISEASE_CATEGORIES.map((c) => ({ value: c.value, label: c.labelEn }))}
      />

      <FormField
        label={t('medicalClaims.form.treatmentDate')}
        name="treatmentDate"
        type="date"
        value={form.treatmentDate}
        onChange={(v) => updateForm('treatmentDate', v)}
        required
      />

      <FormField
        label={t('medicalClaims.form.diseaseDetails')}
        name="diseaseDetails"
        type="textarea"
        value={form.diseaseDetails}
        onChange={(v) => updateForm('diseaseDetails', v)}
        placeholder={t('medicalClaims.form.diseaseDetailsPlaceholder')}
      />

      <FormField
        label={t('medicalClaims.form.hospitalName')}
        name="hospitalName"
        type="text"
        value={form.hospitalName}
        onChange={(v) => updateForm('hospitalName', v)}
        required
        placeholder="e.g. Bangkok Hospital"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label={t('medicalClaims.form.receiptAmount')}
          name="receiptAmount"
          type="text"
          value={form.receiptAmount}
          onChange={(v) => updateForm('receiptAmount', v)}
          required
          placeholder="0.00"
        />
        <FormField
          label={t('medicalClaims.form.claimAmount')}
          name="claimAmount"
          type="text"
          value={form.claimAmount}
          onChange={(v) => updateForm('claimAmount', v)}
          required
          placeholder="0.00"
        />
      </div>

      <FormField
        label={t('medicalClaims.form.remarks')}
        name="remarks"
        type="textarea"
        value={form.remarks}
        onChange={(v) => updateForm('remarks', v)}
        placeholder={t('medicalClaims.form.remarksPlaceholder')}
      />

      <div className="flex justify-end pt-4">
        <Button onClick={() => setStep(2)} disabled={!validateStep1()}>
          {t('medicalClaims.form.next')}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {renderUploadZone('receipt', t('medicalClaims.form.receipt'), true, documents.receipt, receiptRef)}
      {renderUploadZone('medicalCert', t('medicalClaims.form.medicalCert'), true, documents.medicalCert, certRef)}
      {renderUploadZone('other', t('medicalClaims.form.otherDocuments'), false, null, otherRef, true)}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={() => setStep(1)}>
          {t('medicalClaims.form.back')}
        </Button>
        <Button onClick={() => setStep(3)} disabled={!validateStep2()}>
          {t('medicalClaims.form.next')}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const allFiles: { name: string; size: number; type: string }[] = [];
    if (documents.receipt) allFiles.push({ name: documents.receipt.name, size: documents.receipt.size, type: 'Receipt' });
    if (documents.medicalCert) allFiles.push({ name: documents.medicalCert.name, size: documents.medicalCert.size, type: 'Medical Certificate' });
    documents.other.forEach((f) => allFiles.push({ name: f.name, size: f.size, type: 'Additional' }));

    return (
      <div className="space-y-6">
        {/* Claim summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-brand" />
              {t('medicalClaims.form.reviewTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-400">{t('medicalClaims.form.diseaseCategory')}</dt>
                <dd className="text-sm font-medium">{getCategoryLabel(form.diseaseCategory as DiseaseCategory)}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-400">{t('medicalClaims.form.hospitalName')}</dt>
                <dd className="text-sm font-medium">{form.hospitalName}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-400">{t('medicalClaims.form.treatmentDate')}</dt>
                <dd className="text-sm font-medium">{formatDate(form.treatmentDate)}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-400">{t('medicalClaims.form.receiptAmount')}</dt>
                <dd className="text-sm font-medium">{formatCurrency(parseFloat(form.receiptAmount) || 0)}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 dark:text-gray-400">{t('medicalClaims.form.claimAmount')}</dt>
                <dd className="text-sm font-medium">{formatCurrency(parseFloat(form.claimAmount) || 0)}</dd>
              </div>
              {form.remarks && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-gray-500 dark:text-gray-400">{t('medicalClaims.form.remarks')}</dt>
                  <dd className="text-sm font-medium">{form.remarks}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        {/* Documents list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('medicalClaims.form.attachedDocuments')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {allFiles.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="truncate flex-1">{f.name}</span>
                  <span className="text-xs text-gray-400">{formatFileSize(f.size)}</span>
                  <Badge variant="neutral">{f.type}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Policy check */}
        <div
          className={`flex items-start gap-3 rounded-lg border p-4 ${
            withinLimit ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
          }`}
        >
          {withinLimit ? (
            <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div>
            <p className={`text-sm font-medium ${withinLimit ? 'text-green-800' : 'text-red-800'}`}>
              {withinLimit
                ? t('medicalClaims.form.withinLimit')
                : t('medicalClaims.form.exceedsLimit')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('medicalClaims.form.remainingBalance')}: {formatCurrency(summary.remainingAmount)}
            </p>
          </div>
        </div>

        {/* Warning about originals */}
        <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800">{t('medicalClaims.form.bringOriginals')}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">
          <Button variant="outline" onClick={() => setStep(2)} disabled={submitting}>
            {t('medicalClaims.form.back')}
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleSaveDraft} disabled={submitting}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {t('medicalClaims.form.saveDraft')}
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              {t('medicalClaims.form.submitClaim')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderNewClaim = () => (
    <div>
      {renderStepIndicator()}
      <Card>
        <CardContent className="p-5 sm:p-6 lg:p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </CardContent>
      </Card>
    </div>
  );

  // --- Render: History Tab ---

  const filterPills: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: t('medicalClaims.history.filterAll') },
    { key: 'pending', label: t('medicalClaims.history.filterPending') },
    { key: 'approved', label: t('medicalClaims.history.filterApproved') },
    { key: 'rejected', label: t('medicalClaims.history.filterRejected') },
  ];

  const renderHistory = () => (
    <div className="space-y-4">
      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterPills.map((pill) => (
          <button
            key={pill.key}
            onClick={() => setStatusFilter(pill.key)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              statusFilter === pill.key
                ? 'bg-brand text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {filteredClaims.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('medicalClaims.history.empty')}</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">{t('medicalClaims.history.id')}</th>
                      <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">{t('medicalClaims.history.disease')}</th>
                      <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">{t('medicalClaims.history.hospital')}</th>
                      <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">{t('medicalClaims.history.date')}</th>
                      <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">{t('medicalClaims.history.amount')}</th>
                      <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">{t('medicalClaims.history.status')}</th>
                      <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">{t('medicalClaims.history.action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClaims.map((claim) => (
                      <tr key={claim.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs">{claim.id}</td>
                        <td className="px-4 py-3">{getCategoryLabel(claim.diseaseCategory)}</td>
                        <td className="px-4 py-3">{claim.hospitalName}</td>
                        <td className="px-4 py-3">{formatDate(claim.treatmentDate)}</td>
                        <td className="px-4 py-3">{formatCurrency(claim.claimAmount)}</td>
                        <td className="px-4 py-3">
                          <Badge variant={STATUS_VARIANT[claim.status]}>
                            {t(`medicalClaims.status.${claim.status}`)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" onClick={() => setDetailClaim(claim)}>
                            <Eye className="mr-1 h-4 w-4" />
                            {t('medicalClaims.history.viewDetails')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-3">
            {filteredClaims.map((claim) => (
              <Card
                key={claim.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setDetailClaim(claim)}
              >
                <CardContent className="p-5 sm:p-6 lg:p-8">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{claim.hospitalName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {getCategoryLabel(claim.diseaseCategory)} - {formatCurrency(claim.claimAmount)}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{formatDate(claim.treatmentDate)}</p>
                    </div>
                    <Badge variant={STATUS_VARIANT[claim.status]}>
                      {t(`medicalClaims.status.${claim.status}`)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );

  // --- Render: Detail Modal ---

  const renderDetailModal = () => {
    if (!detailClaim) return null;

    return (
      <Modal
        open={!!detailClaim}
        onClose={() => setDetailClaim(null)}
        title={`${t('medicalClaims.detail.title')} ${detailClaim.id}`}
        className="md:max-w-2xl"
      >
        <div className="space-y-6">
          {/* Status and amount */}
          <div className="flex items-center justify-between">
            <Badge variant={STATUS_VARIANT[detailClaim.status]}>
              {t(`medicalClaims.status.${detailClaim.status}`)}
            </Badge>
            <p className="text-2xl font-bold text-ink">
              {formatCurrency(detailClaim.claimAmount)}
            </p>
          </div>

          {/* Info grid */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <dt className="text-xs text-gray-500">{t('medicalClaims.detail.disease')}</dt>
              <dd className="text-sm font-medium">{getCategoryLabel(detailClaim.diseaseCategory)}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">{t('medicalClaims.detail.details')}</dt>
              <dd className="text-sm font-medium">{detailClaim.diseaseDetails || '-'}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">{t('medicalClaims.detail.hospital')}</dt>
              <dd className="text-sm font-medium">{detailClaim.hospitalName}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">{t('medicalClaims.detail.treatmentDate')}</dt>
              <dd className="text-sm font-medium">{formatDate(detailClaim.treatmentDate)}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">{t('medicalClaims.detail.receiptAmount')}</dt>
              <dd className="text-sm font-medium">{formatCurrency(detailClaim.receiptAmount)}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">{t('medicalClaims.detail.claimAmount')}</dt>
              <dd className="text-sm font-medium">{formatCurrency(detailClaim.claimAmount)}</dd>
            </div>
            {detailClaim.remarks && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-gray-500 dark:text-gray-400">{t('medicalClaims.detail.remarks')}</dt>
                <dd className="text-sm font-medium">{detailClaim.remarks}</dd>
              </div>
            )}
          </dl>

          {/* Documents */}
          {detailClaim.documents.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('medicalClaims.detail.documents')}
              </h4>
              <ul className="space-y-2">
                {detailClaim.documents.map((doc) => (
                  <li key={doc.id} className="flex items-center gap-2 rounded-lg border dark:border-gray-700 p-2">
                    <FileText className="h-4 w-4 text-gray-400 dark:text-gray-500 shrink-0" />
                    <span className="text-sm truncate flex-1">{doc.fileName}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{formatFileSize(doc.fileSize)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Approval Timeline */}
          {detailClaim.approvalSteps.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('medicalClaims.detail.approvalTimeline')}
              </h4>
              <div className="relative ml-3">
                {detailClaim.approvalSteps.map((as, i) => {
                  const isLast = i === detailClaim.approvalSteps.length - 1;
                  let dotColor = 'bg-gray-300';
                  let icon = null;

                  if (as.status === 'approved') {
                    dotColor = 'bg-green-500';
                    icon = <Check className="h-3 w-3 text-white" />;
                  } else if (as.status === 'pending') {
                    dotColor = 'bg-yellow-400';
                    icon = <Clock className="h-3 w-3 text-white" />;
                  } else if (as.status === 'rejected') {
                    dotColor = 'bg-red-500';
                    icon = <X className="h-3 w-3 text-white" />;
                  }

                  return (
                    <div key={as.step} className="relative flex gap-4 pb-6">
                      {/* Vertical line */}
                      {!isLast && (
                        <div className="absolute left-[9px] top-5 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                      )}
                      {/* Dot */}
                      <div
                        className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${dotColor}`}
                      >
                        {icon}
                      </div>
                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{as.role}</p>
                          <Badge
                            variant={
                              as.status === 'approved'
                                ? 'success'
                                : as.status === 'rejected'
                                  ? 'error'
                                  : 'warning'
                            }
                          >
                            {t(`medicalClaims.approval.${as.status}`)}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{as.approverName}</p>
                        {as.date && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{formatDate(as.date)}</p>
                        )}
                        {as.comment && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 italic">{as.comment}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rejection reason */}
          {detailClaim.rejectionReason && (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  {t('medicalClaims.detail.rejectionReason')}
                </p>
                <p className="text-sm text-red-700 mt-1">{detailClaim.rejectionReason}</p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    );
  };

  // --- Main Render ---

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Heart className="h-6 w-6 text-brand" />
        <h1 className="text-xl font-bold text-ink sm:text-2xl">
          {t('medicalClaims.title')}
        </h1>
      </div>

      <Tabs
        tabs={tabItems}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as ActiveTab)}
      />

      <div className="mt-4">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'newClaim' && renderNewClaim()}
        {activeTab === 'history' && renderHistory()}
      </div>

      {renderDetailModal()}
    </div>
  );
}
