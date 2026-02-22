import { Injectable } from '@nestjs/common';

export interface TaxCertData {
  employeeId: string;
  employeeName: string;
  nationalId: string;
  taxYear: string;
  totalIncome: number;
  totalTax: number;
  socialSecurity: number;
  providentFund: number;
}

@Injectable()
export class TaxCertGenerator {
  generate(data: TaxCertData): string {
    return `<!DOCTYPE html>
<html>
<head><title>50 Tawi - ${data.taxYear}</title></head>
<body>
  <h1>หนังสือรับรองการหักภาษี ณ ที่จ่าย</h1>
  <h2>Certificate of Withholding Tax (50 Tawi)</h2>
  <p>Tax Year: ${data.taxYear}</p>
  <hr/>
  <p>Employee: ${data.employeeName} (${data.employeeId})</p>
  <p>National ID: ${data.nationalId}</p>
  <table>
    <tr><td>Total Income</td><td>${data.totalIncome.toLocaleString()} THB</td></tr>
    <tr><td>Total Tax Withheld</td><td>${data.totalTax.toLocaleString()} THB</td></tr>
    <tr><td>Social Security</td><td>${data.socialSecurity.toLocaleString()} THB</td></tr>
    <tr><td>Provident Fund</td><td>${data.providentFund.toLocaleString()} THB</td></tr>
  </table>
  <p>Company: Central Group Co., Ltd.</p>
  <p>Tax ID: 0105556123456</p>
</body>
</html>`;
  }

  getFilePath(employeeId: string, taxYear: string): string {
    return `documents/tax-certs/${employeeId}_${taxYear}_50tawi.html`;
  }
}
