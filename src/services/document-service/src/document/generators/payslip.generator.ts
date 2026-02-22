import { Injectable } from '@nestjs/common';

export interface PayslipData {
  employeeId: string;
  employeeName: string;
  period: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
}

@Injectable()
export class PayslipGenerator {
  generate(data: PayslipData): string {
    return `<!DOCTYPE html>
<html>
<head><title>Payslip - ${data.period}</title></head>
<body>
  <h1>Central Group Co., Ltd.</h1>
  <h2>Payslip</h2>
  <p>Employee: ${data.employeeName} (${data.employeeId})</p>
  <p>Period: ${data.period}</p>
  <hr/>
  <table>
    <tr><td>Base Salary</td><td>${data.baseSalary.toLocaleString()} THB</td></tr>
    <tr><td>Allowances</td><td>${data.allowances.toLocaleString()} THB</td></tr>
    <tr><td>Deductions</td><td>-${data.deductions.toLocaleString()} THB</td></tr>
    <tr><td><strong>Net Pay</strong></td><td><strong>${data.netPay.toLocaleString()} THB</strong></td></tr>
  </table>
</body>
</html>`;
  }

  getFilePath(employeeId: string, period: string): string {
    return `documents/payslips/${employeeId}_${period}.html`;
  }
}
