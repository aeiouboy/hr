export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  firstNameTh?: string;
  lastNameTh?: string;
  nickname?: string;
  email: string;
  position: string;
  department: string;
  company: string;
  location: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'terminated';
  supervisorId?: string;
  avatarUrl?: string;
}

export interface PersonalInfo {
  salutation?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  firstNameTh?: string;
  lastNameTh?: string;
  nickname?: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  nationality: string;
  nationalId: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
  maritalStatusSince?: string;
  religion?: string;
  bloodType?: string;
  militaryStatus?: string;
}

export interface ContactInfo {
  businessEmail: string;
  personalEmail?: string;
  businessPhone?: string;
  personalMobile?: string;
  homePhone?: string;
}

export interface Address {
  type: 'permanent' | 'current';
  addressLine1: string;
  addressLine2?: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export interface Dependent {
  id: string;
  name: string;
  type: 'spouse' | 'child' | 'parent';
  dateOfBirth?: string;
  nationalId?: string;
}

export interface WorkPermit {
  permitNumber: string;
  permitType: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  status: 'active' | 'expired' | 'expiring';
}
