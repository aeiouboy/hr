import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.pdf'];
const CONFIDENCE_THRESHOLD = 0.8;
const MODEL_VERSION = 'ocr-v2.1';

@Injectable()
export class OcrService {
  constructor(private readonly prisma: PrismaService) {}

  async processReceipt(claimId: string, receiptUrl: string) {
    if (!receiptUrl) {
      throw new BadRequestException('Receipt URL is required');
    }

    const ext = receiptUrl.substring(receiptUrl.lastIndexOf('.')).toLowerCase();
    if (!SUPPORTED_FORMATS.includes(ext)) {
      throw new BadRequestException(
        `Unsupported file format: ${ext}. Supported: ${SUPPORTED_FORMATS.join(', ')}`,
      );
    }

    // Simulated OCR processing (< 3 seconds)
    const startTime = Date.now();
    const ocrData = this.simulateOcr(receiptUrl);
    const processingTime = Date.now() - startTime;

    const needsManualReview = ocrData.confidence_score < CONFIDENCE_THRESHOLD;

    const result = await this.prisma.oCRResult.create({
      data: {
        claim_id: claimId,
        raw_text: ocrData.raw_text,
        extracted_amount: ocrData.extracted_amount,
        extracted_date: ocrData.extracted_date,
        extracted_merchant: ocrData.extracted_merchant,
        extracted_tax_id: ocrData.extracted_tax_id,
        confidence_score: ocrData.confidence_score,
        model_version: MODEL_VERSION,
        processing_time_ms: processingTime > 0 ? processingTime : 1,
        needs_manual_review: needsManualReview,
      },
    });

    return result;
  }

  async updateOcrResult(ocrId: string, data: any) {
    const existing = await this.prisma.oCRResult.findUnique({ where: { id: ocrId } });
    if (!existing) {
      throw new BadRequestException('OCR result not found');
    }

    const updateData: any = {};
    if (data.extracted_amount !== undefined) updateData.extracted_amount = data.extracted_amount;
    if (data.extracted_merchant !== undefined) updateData.extracted_merchant = data.extracted_merchant;
    if (data.extracted_date !== undefined) updateData.extracted_date = new Date(data.extracted_date);
    if (data.extracted_tax_id !== undefined) updateData.extracted_tax_id = data.extracted_tax_id;

    return this.prisma.oCRResult.update({
      where: { id: ocrId },
      data: updateData,
    });
  }

  async getOcrResult(claimId: string) {
    return this.prisma.oCRResult.findFirst({ where: { claim_id: claimId } });
  }

  private simulateOcr(receiptUrl: string) {
    // Simulate OCR with configurable confidence
    const isBlurry = receiptUrl.includes('blurry');
    const confidence = isBlurry ? 0.5 + Math.random() * 0.2 : 0.85 + Math.random() * 0.15;

    if (isBlurry) {
      return {
        raw_text: 'Blurry receipt - partial extraction',
        extracted_amount: null,
        extracted_date: null,
        extracted_merchant: 'Unknown',
        extracted_tax_id: null,
        confidence_score: confidence,
      };
    }

    return {
      raw_text: 'Bangkok Hospital\nDate: 20/02/2026\nTotal: 1,500.00 THB\nTax ID: 0105536024688',
      extracted_amount: 1500.0,
      extracted_date: new Date('2026-02-20'),
      extracted_merchant: 'Bangkok Hospital',
      extracted_tax_id: '0105536024688',
      confidence_score: confidence,
    };
  }
}
