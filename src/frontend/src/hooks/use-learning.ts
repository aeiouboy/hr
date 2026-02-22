'use client';

import { useState, useEffect, useCallback } from 'react';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type DeliveryMethod = 'classroom' | 'online' | 'blended';

export interface Course {
  id: string;
  code: string;
  nameEn: string;
  nameTh: string;
  category: string;
  level: CourseLevel;
  deliveryMethod: DeliveryMethod;
  hours: number;
  credits: number;
  mandatory: boolean;
  description: string;
  rating: number;
  reviewCount: number;
  enrolled: boolean;
  completed: boolean;
  completionDate?: string;
  score?: number;
  certificateUrl?: string;
}

const MOCK_COURSES: Course[] = [
  { id: 'C001', code: 'LDR-101', nameEn: 'Leadership Essentials', nameTh: 'พื้นฐานภาวะผู้นำ', category: 'Leadership', level: 'beginner', deliveryMethod: 'classroom', hours: 16, credits: 2, mandatory: true, description: 'Foundation program for emerging leaders', rating: 4.5, reviewCount: 128, enrolled: true, completed: false },
  { id: 'C002', code: 'DIG-201', nameEn: 'Digital Transformation', nameTh: 'การเปลี่ยนแปลงทางดิจิทัล', category: 'Technology', level: 'intermediate', deliveryMethod: 'online', hours: 8, credits: 1, mandatory: false, description: 'Understanding digital business models', rating: 4.2, reviewCount: 85, enrolled: false, completed: false },
  { id: 'C003', code: 'CUS-301', nameEn: 'Customer Experience Excellence', nameTh: 'ความเป็นเลิศด้านประสบการณ์ลูกค้า', category: 'Customer Service', level: 'advanced', deliveryMethod: 'blended', hours: 24, credits: 3, mandatory: false, description: 'Advanced CX strategies for retail', rating: 4.8, reviewCount: 62, enrolled: false, completed: false },
  { id: 'C004', code: 'FIN-102', nameEn: 'Finance for Non-Finance', nameTh: 'การเงินสำหรับผู้ที่ไม่ใช่สายการเงิน', category: 'Finance', level: 'beginner', deliveryMethod: 'online', hours: 12, credits: 1.5, mandatory: false, description: 'Financial literacy for all managers', rating: 4.0, reviewCount: 200, enrolled: true, completed: true, completionDate: '2026-01-20', score: 88, certificateUrl: '#' },
  { id: 'C005', code: 'COM-201', nameEn: 'Effective Communication', nameTh: 'การสื่อสารที่มีประสิทธิภาพ', category: 'Soft Skills', level: 'intermediate', deliveryMethod: 'classroom', hours: 8, credits: 1, mandatory: true, description: 'Business communication and presentation skills', rating: 4.6, reviewCount: 150, enrolled: true, completed: true, completionDate: '2025-11-10', score: 92, certificateUrl: '#' },
  { id: 'C006', code: 'SAF-101', nameEn: 'Workplace Safety', nameTh: 'ความปลอดภัยในสถานที่ทำงาน', category: 'Compliance', level: 'beginner', deliveryMethod: 'online', hours: 4, credits: 0.5, mandatory: true, description: 'Annual safety compliance training', rating: 3.8, reviewCount: 500, enrolled: false, completed: false },
];

export function useLearning() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(MOCK_COURSES);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const categories = [...new Set(courses.map((c) => c.category))];

  const filtered = courses.filter((c) => {
    const matchSearch = search === '' || c.nameEn.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || c.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const enrolledCourses = courses.filter((c) => c.enrolled && !c.completed);
  const completedCourses = courses.filter((c) => c.completed);

  const enroll = useCallback(async (courseId: string) => {
    setCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, enrolled: true } : c)));
  }, []);

  return { courses: filtered, enrolledCourses, completedCourses, categories, loading, search, setSearch, categoryFilter, setCategoryFilter, enroll };
}
