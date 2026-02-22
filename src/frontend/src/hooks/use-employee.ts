'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface EmployeeData {
  [key: string]: unknown;
  employeeId: string;
  photo?: string;
  personalInfo: Record<string, unknown>;
  advancedInfo?: Record<string, unknown>;
  contactInfo: Record<string, unknown>;
  addresses: Record<string, unknown>[];
  emergencyContacts: Record<string, unknown>[];
  dependents: Record<string, unknown>[];
  workPermit?: Record<string, unknown>;
  employmentInfo: Record<string, unknown>;
  orgChart?: Record<string, unknown>;
  compensation: Record<string, unknown>;
  benefits?: Record<string, unknown>;
  profileDetails?: Record<string, unknown>;
  scorecard?: Record<string, unknown>;
}

// Mock data for development — will be replaced with API calls
const MOCK_EMPLOYEE: EmployeeData = {
  employeeId: 'EMP001',
  photo: 'https://i.pravatar.cc/150?img=11',
  personalInfo: {
    salutationEn: 'Mr.',
    salutationTh: 'นาย',
    firstNameEn: 'Chongrak',
    firstNameTh: 'จงรักษ์',
    middleNameEn: '',
    lastNameEn: 'Tanaka',
    lastNameTh: 'ทานากะ',
    nickname: 'Chong',
    gender: 'male',
    dateOfBirth: '1988-05-12',
    nationality: 'Thai',
    nationalId: '1234567890123',
    maritalStatus: 'married',
    maritalStatusSince: '2018-11-15',
  },
  advancedInfo: {
    religion: 'buddhist',
    bloodType: 'O+',
    militaryStatus: 'completed',
  },
  contactInfo: {
    businessEmail: 'chongrak.t@centralgroup.com',
    personalEmail: 'chongrak.tanaka@gmail.com',
    businessPhone: '+66 2 021 9000',
    personalMobile: '+66 89 123 4567',
    homePhone: '+66 2 987 6543',
  },
  addresses: [
    {
      id: 'addr_001',
      addressType: 'permanent',
      addressLine1: '123/45 Sukhumvit Road',
      addressLine2: 'Soi Sukhumvit 21',
      subDistrict: 'Khlong Toei Nuea',
      district: 'Watthana',
      province: 'Bangkok',
      postalCode: '10110',
      country: 'Thailand',
    },
    {
      id: 'addr_002',
      addressType: 'current',
      addressLine1: '456/78 Silom Complex',
      addressLine2: 'Tower A, Unit 2501',
      subDistrict: 'Silom',
      district: 'Bang Rak',
      province: 'Bangkok',
      postalCode: '10500',
      country: 'Thailand',
    },
  ],
  emergencyContacts: [
    { id: 'ec_001', name: 'Yuki Tanaka', relationship: 'spouse', phone: '+66 82 345 6789', isPrimary: true },
    { id: 'ec_002', name: 'Hiroshi Tanaka', relationship: 'parent', phone: '+66 89 012 3456', isPrimary: false },
  ],
  dependents: [
    { id: 'dep_001', name: 'Yuki Tanaka', relationship: 'spouse', dateOfBirth: '1990-03-15' },
    { id: 'dep_002', name: 'Sakura Tanaka', relationship: 'child', dateOfBirth: '2020-06-20' },
  ],
  workPermit: {
    permitNumber: 'WP-2024-123456',
    issueDate: '2024-01-15',
    expiryDate: '2026-03-20',
    issuingAuthority: 'Department of Employment, Ministry of Labour',
    status: 'active',
    permitType: 'non_immigrant_b',
  },
  employmentInfo: {
    details: {
      hireDate: '2015-04-01',
      originalStartDate: '2015-04-01',
      seniorityStartDate: '2015-04-01',
      yearsOfService: '8 years 9 months',
      passProbationDate: '2015-07-01',
      currentJobEffectiveDate: '2022-01-01',
      currentYearsInJob: '2 years',
      currentPositionEffectiveDate: '2022-01-01',
      currentYearsInPosition: '2 years',
    },
    organization: {
      company: 'RIS (C015)',
      position: 'Product Manager (40128307)',
      group: 'CG Thailand (60000000)',
      businessUnit: 'RIS (10000019)',
      function: 'RIS (20000106)',
      department: 'Product Management (30040490)',
      storeBranchCode: 'HO (T020_1295)',
      hrDistrict: 'CU - CG Corporate unit - RIS',
      costCenter: '90991 (C01590991)',
      workLocation: 'Silom Tower (50000128)',
    },
    job: {
      employeeStatus: 'Active',
      supervisorName: 'Rungrote Amnuaysopon',
      country: 'Thailand',
      jobFamily: 'Digital & IT - Product Owner',
      jobCode: 'Product Owner/Manager TL3',
      jobRole: 'Product Owner/Manager TL3',
      jobType: 'Back Office',
      employeeGroup: 'A - Permanent (A)',
      contractType: 'Regular',
    },
  },
  orgChart: {
    employee: { id: 'EMP001', name: 'Chongrak Tanaka', title: 'Product Manager', photo: 'https://i.pravatar.cc/150?img=11' },
    supervisor: { id: 'EMP_SUP001', name: 'Rungrote Amnuaysopon', title: 'Head of Product', photo: 'https://i.pravatar.cc/150?img=12' },
    directReports: [
      { id: 'EMP_DR001', name: 'Naruechon Woraphatphawan', title: 'Functional Trainee', photo: 'https://i.pravatar.cc/150?img=14' },
      { id: 'EMP_DR002', name: 'Punnapa Thianchai', title: 'Functional Trainee', photo: 'https://i.pravatar.cc/150?img=15' },
    ],
  },
  compensation: {
    paymentInfo: { jobCountry: 'Thailand', paymentMethod: 'Direct Deposit', payType: 'Monthly', bank: 'Bangkok Bank', accountNumber: '1234567890' },
    payroll: { grossAmount: 120000, currency: 'THB' },
  },
  benefits: {
    enrollments: [
      { id: 'ben_001', plan: 'Group Health Insurance', coverage: 'Employee + Family', status: 'active', enrollmentDate: '2015-04-01', effectiveDate: '2015-04-01' },
      { id: 'ben_002', plan: 'Dental Plan', coverage: 'Employee Only', status: 'active', enrollmentDate: '2015-04-01', effectiveDate: '2015-04-01' },
      { id: 'ben_003', plan: 'Life Insurance', coverage: '3x Annual Salary', status: 'active', enrollmentDate: '2015-04-01', effectiveDate: '2015-04-01' },
    ],
  },
  profileDetails: {
    education: [
      { degree: 'Master of Business Administration', institution: 'Chulalongkorn University', major: 'Digital Business Management', graduationYear: 2014 },
      { degree: 'Bachelor of Engineering', institution: 'King Mongkut\'s University of Technology', major: 'Computer Engineering', graduationYear: 2010 },
    ],
    previousEmployment: [
      { companyName: 'Agoda', jobTitle: 'Senior Product Analyst', startDate: '2012-06-01', endDate: '2015-03-31' },
      { companyName: 'True Corporation', jobTitle: 'IT Business Analyst', startDate: '2010-07-01', endDate: '2012-05-31' },
    ],
    languages: [
      { language: 'Thai', reading: 'Native', writing: 'Native', speaking: 'Native' },
      { language: 'English', reading: 'Excellent', writing: 'Excellent', speaking: 'Excellent' },
      { language: 'Japanese', reading: 'Intermediate', writing: 'Basic', speaking: 'Intermediate' },
    ],
    certifications: [
      { certName: 'Certified Scrum Product Owner', issuer: 'Scrum Alliance', issueDate: '2022-05-15', expiryDate: '2024-05-15' },
      { certName: 'AWS Solutions Architect', issuer: 'Amazon Web Services', issueDate: '2021-08-01', expiryDate: '2024-08-01' },
    ],
    awards: [
      { awardName: 'CG Innovation Award', awardDate: '2023-12-01' },
      { awardName: 'Best Product Launch', awardDate: '2022-06-15' },
    ],
    mobility: { willingToRelocate: true, preferredLocations: ['Singapore', 'Hong Kong', 'Vietnam'] },
  },
  scorecard: {
    competencies: [
      { name: 'Driving for Profitable Growth', rating: 4 },
      { name: 'Striving to Meet Customer Satisfaction', rating: 5 },
      { name: 'Building Organization Excellence', rating: 4 },
      { name: 'Promoting Sustainable Collaborations', rating: 3 },
      { name: 'Developing People', rating: 4 },
      { name: 'Leading Innovation', rating: 5 },
    ],
    overallRating: 'Exceeds Expectations',
    potentialRating: 'High',
  },
};

export function useEmployee(employeeId?: string) {
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmployee() {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with real API call
        // const data = await api.get<EmployeeData>(`/employees/${employeeId || 'me'}`);
        await new Promise((r) => setTimeout(r, 300)); // simulate network
        setEmployee(MOCK_EMPLOYEE);
      } catch {
        setError('Failed to load employee data');
      } finally {
        setLoading(false);
      }
    }
    fetchEmployee();
  }, [employeeId]);

  return { employee, loading, error };
}
