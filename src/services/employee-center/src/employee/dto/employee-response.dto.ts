export class EmployeeResponseDto {
  id: string;
  employee_id: string;
  first_name_en?: string;
  first_name_th?: string;
  last_name_en?: string;
  last_name_th?: string;
  nickname?: string;
  gender?: string;
  date_of_birth?: Date;
  nationality?: string;
  national_id?: string;
  religion?: string;
  blood_type?: string;
  marital_status?: string;
  email?: string;
  personal_email?: string;
  business_phone?: string;
  personal_mobile?: string;
  addresses?: any[];
  employment?: any;
  emergency_contacts?: any[];
  dependents?: any[];
}
