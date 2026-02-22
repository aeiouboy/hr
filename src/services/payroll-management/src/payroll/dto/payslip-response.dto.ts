export class PayslipResponseDto {
  id: string;
  payroll_run_id: string;
  employee_id: string;
  base_salary: number;
  gross_salary: number;
  total_earnings: number;
  total_deductions: number;
  net_salary: number;
  tax_amount: number;
  sso_amount: number;
  provident_fund_employee: number;
  provident_fund_employer: number;
  earnings_detail: Record<string, number>;
  deductions_detail: Record<string, number>;
  bank_code?: string;
  bank_account?: string;
  payment_status: string;
}
