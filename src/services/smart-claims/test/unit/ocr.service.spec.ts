import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OcrService } from '../../src/ocr/ocr.service';
import { PrismaService } from '../../src/prisma/prisma.service';

const mockPrismaService = {
  oCRResult: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
};

// Mock OCR extraction results
const mockOcrExtraction = {
  raw_text: 'Bangkok Hospital\nDate: 20/02/2026\nTotal: 1,500.00 THB\nTax ID: 0105536024688',
  extracted_amount: 1500.0,
  extracted_date: new Date('2026-02-20'),
  extracted_merchant: 'Bangkok Hospital',
  extracted_tax_id: '0105536024688',
  confidence_score: 0.94,
  model_version: 'ocr-v2.1',
  processing_time_ms: 2100,
  needs_manual_review: false,
};

const mockLowConfidenceOcr = {
  ...mockOcrExtraction,
  confidence_score: 0.65,
  needs_manual_review: true,
  extracted_amount: null,
  extracted_merchant: 'Unknown',
};

describe('OcrService', () => {
  let service: OcrService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OcrService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OcrService>(OcrService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  // ── Receipt Processing (F6.1) ────────────────────────────────

  describe('processReceipt', () => {
    it('should process a JPG receipt and return OCR result', async () => {
      prisma.oCRResult.create.mockResolvedValue({
        id: 'OCR-001',
        claim_id: 'CLM-001',
        ...mockOcrExtraction,
      });

      const result = await service.processReceipt('CLM-001', 's3://bucket/receipt.jpg');

      expect(result).toBeDefined();
      expect(result.extracted_amount).toBe(1500.0);
      expect(result.extracted_merchant).toBe('Bangkok Hospital');
      expect(result.confidence_score).toBeGreaterThan(0);
    });

    it('should process a PNG receipt', async () => {
      prisma.oCRResult.create.mockResolvedValue({
        id: 'OCR-002',
        claim_id: 'CLM-002',
        ...mockOcrExtraction,
      });

      const result = await service.processReceipt('CLM-002', 's3://bucket/receipt.png');

      expect(result).toBeDefined();
      expect(result.extracted_amount).toBeDefined();
    });

    it('should process a PDF receipt', async () => {
      prisma.oCRResult.create.mockResolvedValue({
        id: 'OCR-003',
        claim_id: 'CLM-003',
        ...mockOcrExtraction,
      });

      const result = await service.processReceipt('CLM-003', 's3://bucket/receipt.pdf');

      expect(result).toBeDefined();
    });

    it('should reject unsupported file formats', async () => {
      await expect(
        service.processReceipt('CLM-001', 's3://bucket/receipt.bmp'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject empty receipt URL', async () => {
      await expect(service.processReceipt('CLM-001', '')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ── Confidence Score (F6.2) ──────────────────────────────────

  describe('confidence score handling', () => {
    it('should flag low confidence results for manual review (< 0.8)', async () => {
      prisma.oCRResult.create.mockResolvedValue({
        id: 'OCR-LOW',
        claim_id: 'CLM-004',
        ...mockLowConfidenceOcr,
      });

      const result = await service.processReceipt('CLM-004', 's3://bucket/blurry.jpg');

      expect(result.needs_manual_review).toBe(true);
      expect(result.confidence_score).toBeLessThan(0.8);
    });

    it('should not flag high confidence results for review (>= 0.8)', async () => {
      prisma.oCRResult.create.mockResolvedValue({
        id: 'OCR-HIGH',
        claim_id: 'CLM-005',
        ...mockOcrExtraction,
      });

      const result = await service.processReceipt('CLM-005', 's3://bucket/clear.jpg');

      expect(result.needs_manual_review).toBe(false);
      expect(result.confidence_score).toBeGreaterThanOrEqual(0.8);
    });

    it('should record processing time in milliseconds', async () => {
      prisma.oCRResult.create.mockResolvedValue({
        id: 'OCR-006',
        claim_id: 'CLM-006',
        ...mockOcrExtraction,
      });

      const result = await service.processReceipt('CLM-006', 's3://bucket/receipt.jpg');

      expect(result.processing_time_ms).toBeDefined();
      expect(result.processing_time_ms).toBeGreaterThan(0);
    });

    it('should include model version in result', async () => {
      prisma.oCRResult.create.mockResolvedValue({
        id: 'OCR-007',
        claim_id: 'CLM-007',
        ...mockOcrExtraction,
      });

      const result = await service.processReceipt('CLM-007', 's3://bucket/receipt.jpg');

      expect(result.model_version).toBeDefined();
      expect(typeof result.model_version).toBe('string');
    });
  });

  // ── Manual Override (F6.2) ───────────────────────────────────

  describe('updateOcrResult', () => {
    it('should allow manual override of extracted amount', async () => {
      const existing = {
        id: 'OCR-001',
        claim_id: 'CLM-001',
        ...mockOcrExtraction,
      };
      prisma.oCRResult.findUnique.mockResolvedValue(existing);
      prisma.oCRResult.update.mockResolvedValue({
        ...existing,
        extracted_amount: 1600,
      });

      const result = await service.updateOcrResult('OCR-001', {
        extracted_amount: 1600,
      });

      expect(result.extracted_amount).toBe(1600);
    });

    it('should allow manual override of extracted date', async () => {
      const existing = {
        id: 'OCR-001',
        claim_id: 'CLM-001',
        ...mockOcrExtraction,
      };
      prisma.oCRResult.findUnique.mockResolvedValue(existing);
      prisma.oCRResult.update.mockResolvedValue({
        ...existing,
        extracted_date: new Date('2026-02-21'),
      });

      const result = await service.updateOcrResult('OCR-001', {
        extracted_date: '2026-02-21',
      });

      expect(result.extracted_date).toEqual(new Date('2026-02-21'));
    });

    it('should allow manual override of merchant name', async () => {
      const existing = {
        id: 'OCR-001',
        claim_id: 'CLM-001',
        ...mockOcrExtraction,
      };
      prisma.oCRResult.findUnique.mockResolvedValue(existing);
      prisma.oCRResult.update.mockResolvedValue({
        ...existing,
        extracted_merchant: 'Bumrungrad Hospital',
      });

      const result = await service.updateOcrResult('OCR-001', {
        extracted_merchant: 'Bumrungrad Hospital',
      });

      expect(result.extracted_merchant).toBe('Bumrungrad Hospital');
    });
  });

  // ── Get OCR Result ───────────────────────────────────────────

  describe('getOcrResult', () => {
    it('should return OCR result for a claim', async () => {
      prisma.oCRResult.findFirst.mockResolvedValue({
        id: 'OCR-001',
        claim_id: 'CLM-001',
        ...mockOcrExtraction,
      });

      const result = await service.getOcrResult('CLM-001');

      expect(result).toBeDefined();
      expect(result.claim_id).toBe('CLM-001');
    });

    it('should return null if no OCR result exists', async () => {
      prisma.oCRResult.findFirst.mockResolvedValue(null);

      const result = await service.getOcrResult('CLM-NONE');

      expect(result).toBeNull();
    });
  });
});
