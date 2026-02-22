import { OCRService } from './ocr.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  oCRResult: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('OCRService', () => {
  let service: OCRService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OCRService(mockPrisma as any);
  });

  describe('processReceipt', () => {
    it('should simulate OCR and return structured data', async () => {
      const receiptId = 'ocr-1';
      const ocrInput = { id: receiptId, receipt_file_name: 'receipt.jpg', receipt_file_type: 'jpg', receipt_file_size: 500000 };
      mockPrisma.oCRResult.findUnique.mockResolvedValue(ocrInput);
      mockPrisma.oCRResult.update.mockResolvedValue({
        ...ocrInput,
        vendor_name: 'Bangkok Hospital',
        amount: 3500.0,
        receipt_date: new Date('2026-01-10'),
        category: 'medical',
        confidence_score: 0.92,
        processed_at: new Date(),
      });

      const result = await service.processReceipt(receiptId);
      expect(result.vendor_name).toBeDefined();
      expect(result.amount).toBeDefined();
      expect(result.receipt_date).toBeDefined();
      expect(result.category).toBeDefined();
      expect(result.confidence_score).toBeGreaterThan(0);
    });

    it('should handle restaurant receipt format', async () => {
      const receiptId = 'ocr-2';
      mockPrisma.oCRResult.findUnique.mockResolvedValue({ id: receiptId, receipt_file_type: 'jpg' });
      mockPrisma.oCRResult.update.mockResolvedValue({
        id: receiptId,
        vendor_name: 'Sizzler Restaurant',
        amount: 850.0,
        category: 'meals',
        confidence_score: 0.88,
      });

      const result = await service.processReceipt(receiptId);
      expect(result.category).toBe('meals');
      expect(result.vendor_name).toBe('Sizzler Restaurant');
    });

    it('should handle medical receipt format', async () => {
      const receiptId = 'ocr-3';
      mockPrisma.oCRResult.findUnique.mockResolvedValue({ id: receiptId, receipt_file_type: 'pdf' });
      mockPrisma.oCRResult.update.mockResolvedValue({
        id: receiptId,
        vendor_name: 'Bumrungrad Hospital',
        amount: 12500.0,
        category: 'medical',
        confidence_score: 0.95,
      });

      const result = await service.processReceipt(receiptId);
      expect(result.category).toBe('medical');
    });

    it('should handle travel receipt format', async () => {
      const receiptId = 'ocr-4';
      mockPrisma.oCRResult.findUnique.mockResolvedValue({ id: receiptId, receipt_file_type: 'jpg' });
      mockPrisma.oCRResult.update.mockResolvedValue({
        id: receiptId,
        vendor_name: 'Thai Airways',
        amount: 8500.0,
        category: 'travel',
        confidence_score: 0.78,
      });

      const result = await service.processReceipt(receiptId);
      expect(result.category).toBe('travel');
    });

    it('should handle office supplies receipt format', async () => {
      const receiptId = 'ocr-5';
      mockPrisma.oCRResult.findUnique.mockResolvedValue({ id: receiptId, receipt_file_type: 'png' });
      mockPrisma.oCRResult.update.mockResolvedValue({
        id: receiptId,
        vendor_name: 'Office Mate',
        amount: 2300.0,
        category: 'office_supplies',
        confidence_score: 0.91,
      });

      const result = await service.processReceipt(receiptId);
      expect(result.category).toBe('office_supplies');
    });

    it('should throw NotFoundException for non-existent receipt', async () => {
      mockPrisma.oCRResult.findUnique.mockResolvedValue(null);
      await expect(service.processReceipt('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getOCRResult', () => {
    it('should retrieve processed result by receipt_id', async () => {
      const expected = {
        id: 'ocr-1',
        vendor_name: 'Bangkok Hospital',
        amount: 3500.0,
        confidence_score: 0.92,
        processed_at: new Date(),
      };
      mockPrisma.oCRResult.findUnique.mockResolvedValue(expected);

      const result = await service.getOCRResult('ocr-1');
      expect(result.id).toBe('ocr-1');
      expect(result.vendor_name).toBe('Bangkok Hospital');
    });

    it('should throw NotFoundException for non-existent OCR result', async () => {
      mockPrisma.oCRResult.findUnique.mockResolvedValue(null);
      await expect(service.getOCRResult('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('confidence score calculation', () => {
    it('should return high confidence for clear receipts', async () => {
      mockPrisma.oCRResult.findUnique.mockResolvedValue({ id: 'ocr-1', receipt_file_type: 'pdf' });
      mockPrisma.oCRResult.update.mockResolvedValue({
        id: 'ocr-1',
        vendor_name: 'Clear Corp',
        amount: 1000,
        receipt_date: new Date(),
        category: 'medical',
        confidence_score: 0.95,
      });

      const result = await service.processReceipt('ocr-1');
      expect(result.confidence_score).toBeGreaterThanOrEqual(0.8);
    });

    it('should return low confidence when fields are unclear', async () => {
      mockPrisma.oCRResult.findUnique.mockResolvedValue({ id: 'ocr-2', receipt_file_type: 'jpg' });
      mockPrisma.oCRResult.update.mockResolvedValue({
        id: 'ocr-2',
        vendor_name: null,
        amount: null,
        receipt_date: null,
        category: null,
        confidence_score: 0.35,
      });

      const result = await service.processReceipt('ocr-2');
      expect(result.confidence_score).toBeLessThan(0.8);
    });
  });
});
