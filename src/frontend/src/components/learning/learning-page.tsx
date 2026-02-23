'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GraduationCap, Search, Star, Clock, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useLearning } from '@/hooks/use-learning';

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
                const certWindow = window.open('', '_blank');
                if (certWindow) {
                  certWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <title>Certificate - ${course.nameEn}</title>
                      <style>
                        body { font-family: Georgia, serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
                        .certificate { background: white; border: 3px double #C8102E; padding: 60px 80px; text-align: center; max-width: 800px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
                        .certificate h1 { color: #C8102E; font-size: 32px; margin-bottom: 8px; }
                        .certificate h2 { color: #333; font-size: 20px; font-weight: normal; margin-bottom: 40px; }
                        .certificate .course-name { font-size: 28px; color: #1a1a1a; font-weight: bold; margin: 20px 0; }
                        .certificate .details { color: #666; font-size: 14px; margin-top: 30px; }
                        .certificate .score { font-size: 18px; color: #C8102E; font-weight: bold; margin-top: 12px; }
                        .certificate .divider { width: 200px; border-top: 2px solid #C8102E; margin: 30px auto; }
                      </style>
                    </head>
                    <body>
                      <div class="certificate">
                        <h1>Certificate of Completion</h1>
                        <h2>This is to certify that</h2>
                        <div class="divider"></div>
                        <p class="course-name">${course.nameEn}</p>
                        <p class="details">Course Code: ${course.code}</p>
                        <p class="score">Score: ${course.score}%</p>
                        <p class="details">${course.hours} Hours | ${course.credits} Credits</p>
                        <div class="divider"></div>
                        <p class="details">Issued on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </body>
                    </html>
                  `);
                  certWindow.document.close();
                }
              }
            }}>{t('certificate')}</Button>
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
