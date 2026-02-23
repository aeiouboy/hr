'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GraduationCap, Search, Star, Clock, Award, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useLearning } from '@/hooks/use-learning';

function generateCertificateHtml(course: { nameEn: string; code: string; score?: number; hours: number; credits: number; completionDate?: string }) {
  const completionDate = course.completionDate
    ? new Date(course.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Certificate - ${course.nameEn}</title>
  <style>
    body { font-family: Georgia, 'Times New Roman', serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f0ede8; }
    .frame { border: 8px solid #C8102E; padding: 12px; background: white; box-shadow: 0 8px 40px rgba(0,0,0,0.15); }
    .inner-frame { border: 2px solid #d4af37; padding: 60px 80px; text-align: center; max-width: 800px; position: relative; }
    .corner { position: absolute; width: 40px; height: 40px; border-color: #d4af37; }
    .corner.tl { top: 8px; left: 8px; border-top: 3px solid; border-left: 3px solid; }
    .corner.tr { top: 8px; right: 8px; border-top: 3px solid; border-right: 3px solid; }
    .corner.bl { bottom: 8px; left: 8px; border-bottom: 3px solid; border-left: 3px solid; }
    .corner.br { bottom: 8px; right: 8px; border-bottom: 3px solid; border-right: 3px solid; }
    .company { font-size: 13px; color: #C8102E; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; }
    h1 { color: #C8102E; font-size: 36px; margin: 0 0 8px 0; font-weight: 400; }
    .subtitle { color: #666; font-size: 16px; font-weight: normal; margin-bottom: 30px; }
    .employee-name { font-size: 32px; color: #1a1a1a; font-weight: 700; margin: 16px 0 8px; font-style: italic; }
    .divider { width: 200px; border-top: 2px solid #C8102E; margin: 24px auto; }
    .label { color: #888; font-size: 13px; margin-bottom: 4px; }
    .course-name { font-size: 24px; color: #1a1a1a; font-weight: bold; margin: 8px 0 20px; }
    .details { color: #666; font-size: 14px; margin-top: 8px; }
    .score { font-size: 20px; color: #C8102E; font-weight: bold; margin-top: 12px; }
    .date { color: #888; font-size: 13px; margin-top: 24px; }
    .signatures { display: flex; justify-content: space-around; margin-top: 48px; }
    .sig { text-align: center; }
    .sig-line { width: 180px; border-bottom: 1px solid #999; margin-bottom: 8px; min-height: 32px; }
    .sig-label { font-size: 12px; color: #888; }
    @media print { body { background: white; } .frame { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="frame">
    <div class="inner-frame">
      <div class="corner tl"></div>
      <div class="corner tr"></div>
      <div class="corner bl"></div>
      <div class="corner br"></div>
      <p class="company">Central Group Co., Ltd.</p>
      <h1>Certificate of Completion</h1>
      <p class="subtitle">This is to certify that</p>
      <p class="employee-name">Somchai Jaidee</p>
      <p class="label">Employee ID: EMP-001</p>
      <div class="divider"></div>
      <p class="label">has successfully completed</p>
      <p class="course-name">${course.nameEn}</p>
      <p class="details">Course Code: ${course.code}</p>
      ${course.score ? `<p class="score">Score: ${course.score}%</p>` : ''}
      <p class="details">${course.hours} Hours | ${course.credits} Credits</p>
      <div class="divider"></div>
      <p class="date">Completed on ${completionDate}</p>
      <div class="signatures">
        <div class="sig"><div class="sig-line"></div><p class="sig-label">Instructor</p></div>
        <div class="sig"><div class="sig-line"></div><p class="sig-label">HR Director</p></div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function LearningPage() {
  const t = useTranslations('learning');
  const { courses, enrolledCourses, completedCourses, categories, loading, search, setSearch, categoryFilter, setCategoryFilter, enroll } = useLearning();
  const [activeTab, setActiveTab] = useState('catalog');

  const tabs = [
    { key: 'catalog', label: t('catalog') },
    { key: 'myLearning', label: t('myLearning') },
    { key: 'completed', label: t('completedCourses') },
  ];

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-60 w-full" />)}</div>;
  }

  const renderCourseCard = (course: typeof courses[0], showEnroll = true) => (
    <Card key={course.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 mb-1">{course.code}</p>
            <h3 className="font-semibold text-cg-dark">{course.nameEn}</h3>
          </div>
          {course.mandatory && <Badge variant="error">{t('mandatory')}</Badge>}
        </div>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="neutral">{course.category}</Badge>
          <Badge variant="neutral">{course.level}</Badge>
          <Badge variant="neutral">{course.deliveryMethod}</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.hours} {t('hours')}</span>
          <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5" />{course.credits} {t('credits')}</span>
          <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-yellow-400" />{course.rating} ({course.reviewCount})</span>
        </div>
        {showEnroll && (
          <div className="flex gap-2">
            {course.enrolled ? (
              <Badge variant="success">{t('enrolled')}</Badge>
            ) : (
              <Button size="sm" onClick={() => enroll(course.id)}>{t('enroll')}</Button>
            )}
          </div>
        )}
        {course.completed && course.score && (
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="success">{t('completed')}</Badge>
            <span className="text-sm text-gray-500">{t('score')}: {course.score}%</span>
            <Button size="sm" variant="outline" onClick={() => {
              if (course.certificateUrl) {
                window.open(course.certificateUrl, '_blank');
              } else {
                const certHtml = generateCertificateHtml(course);
                const certWindow = window.open('', '_blank');
                if (certWindow) {
                  certWindow.document.write(certHtml);
                  certWindow.document.close();
                }
              }
            }}>{t('certificate')}</Button>
            <Button size="sm" variant="outline" onClick={() => {
              const certHtml = generateCertificateHtml(course);
              const blob = new Blob([certHtml], { type: 'text/html;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `certificate-${course.code}.html`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}><Download className="h-3.5 w-3.5 mr-1" />{t('download')}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
        <p className="text-gray-500 mt-1">{t('subtitle')}</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      {activeTab === 'catalog' && (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={t('searchCourses')}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:border-cg-red focus:ring-1 focus:ring-cg-red"
              />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cg-red focus:ring-1 focus:ring-cg-red">
              <option value="all">{t('category')}: All</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {courses.length === 0 ? (
            <Card><CardContent className="py-12 text-center text-gray-500">{t('noCoursesFound')}</CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((c) => renderCourseCard(c))}
            </div>
          )}
        </>
      )}

      {activeTab === 'myLearning' && (
        enrolledCourses.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-gray-500">{t('noInProgress')}</CardContent></Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map((c) => renderCourseCard(c, false))}
          </div>
        )
      )}

      {activeTab === 'completed' && (
        completedCourses.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-gray-500">{t('noCompleted')}</CardContent></Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedCourses.map((c) => renderCourseCard(c, false))}
          </div>
        )
      )}
    </>
  );
}
