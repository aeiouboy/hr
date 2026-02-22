import { Injectable } from '@nestjs/common';

export interface CertificateData {
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  hireDate: string;
  purpose?: string;
  issueDate: string;
}

@Injectable()
export class CertificateGenerator {
  generate(data: CertificateData): string {
    return `<!DOCTYPE html>
<html>
<head><title>Employment Certificate</title></head>
<body>
  <h1>Central Group Co., Ltd.</h1>
  <h2>Employment Certificate</h2>
  <h3>หนังสือรับรองการทำงาน</h3>
  <hr/>
  <p>This is to certify that <strong>${data.employeeName}</strong> (Employee ID: ${data.employeeId})
  has been employed at Central Group Co., Ltd. since ${data.hireDate}.</p>
  <p>Position: ${data.position}</p>
  <p>Department: ${data.department}</p>
  ${data.purpose ? `<p>Purpose: ${data.purpose}</p>` : ''}
  <br/>
  <p>Issued on: ${data.issueDate}</p>
  <p>Authorized Signatory</p>
  <p>_________________________</p>
  <p>HR Department</p>
</body>
</html>`;
  }

  getFilePath(employeeId: string): string {
    const timestamp = Date.now();
    return `documents/certificates/${employeeId}_cert_${timestamp}.html`;
  }
}
