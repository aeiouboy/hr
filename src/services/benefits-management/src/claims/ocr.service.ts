import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OCRService {
  constructor(private readonly prisma: PrismaService) {}

  async processReceipt(receiptId: string) {
    const receipt = await this.prisma.oCRResult.findUnique({
      where: { id: receiptId },
    });
    if (!receipt) {
      throw new NotFoundException('Receipt not found');
    }

    // Simulate OCR processing - generate structured data based on file type
    const ocrData = this.simulateOCR(receipt);

    return this.prisma.oCRResult.update({
      where: { id: receiptId },
      data: {
        vendor_name: ocrData.vendor_name,
        amount: ocrData.amount,
        receipt_date: ocrData.receipt_date,
        category: ocrData.category,
        confidence_score: ocrData.confidence_score,
        processed_at: new Date(),
      },
    });
  }

  async getOCRResult(receiptId: string) {
    const result = await this.prisma.oCRResult.findUnique({
      where: { id: receiptId },
    });
    if (!result) {
      throw new NotFoundException('OCR result not found');
    }
    return result;
  }

  private simulateOCR(receipt: any) {
    // Simulate different receipt types with varying confidence
    const vendors = ['Bangkok Hospital', 'Sizzler Restaurant', 'Thai Airways', 'Office Mate', 'Bumrungrad Hospital'];
    const categories = ['medical', 'meals', 'travel', 'office_supplies', 'medical'];
    const amounts = [3500, 850, 8500, 2300, 12500];

    const idx = Math.floor(Math.random() * vendors.length);
    const baseConfidence = receipt.receipt_file_type === 'pdf' ? 0.95 : 0.88;
    const confidence = Math.max(0.3, baseConfidence - Math.random() * 0.15);

    return {
      vendor_name: confidence >= 0.5 ? vendors[idx] : null,
      amount: confidence >= 0.5 ? amounts[idx] : null,
      receipt_date: confidence >= 0.5 ? new Date() : null,
      category: confidence >= 0.5 ? categories[idx] : null,
      confidence_score: parseFloat(confidence.toFixed(2)),
    };
  }
}
