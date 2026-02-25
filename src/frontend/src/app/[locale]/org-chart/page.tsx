'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Search, ZoomIn, ZoomOut, RotateCcw, Users, Minus } from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { OrgChart } from '@/components/profile/org-chart';

interface OrgNode {
  id: string;
  name: string;
  title: string;
  department?: string;
  photo?: string;
}

const CEO_NODE: OrgNode = {
  id: 'CEO001',
  name: 'Prasert Charoensuk',
  title: 'Chief Executive Officer',
  department: 'Executive',
  photo: 'https://i.pravatar.cc/150?img=3',
};

const VP_HR_NODE: OrgNode = {
  id: 'VP001',
  name: 'Kannika Srisawat',
  title: 'VP Human Resources',
  department: 'Human Resources',
  photo: 'https://i.pravatar.cc/150?img=5',
};

const VP_PRODUCT_NODE: OrgNode = {
  id: 'VP002',
  name: 'Rungrote Amnuaysopon',
  title: 'VP Product & Technology',
  department: 'Product & Technology',
  photo: 'https://i.pravatar.cc/150?img=12',
};

const VP_OPS_NODE: OrgNode = {
  id: 'VP003',
  name: 'Siriporn Thanakulpaisal',
  title: 'VP Operations',
  department: 'Operations',
  photo: 'https://i.pravatar.cc/150?img=9',
};

const CURRENT_USER_NODE: OrgNode = {
  id: 'EMP001',
  name: 'Chongrak Tanaka',
  title: 'Product Manager',
  department: 'Product Management',
  photo: 'https://i.pravatar.cc/150?img=11',
};

const DIRECT_REPORTS: OrgNode[] = [
  {
    id: 'EMP_DR001',
    name: 'Naruechon Woraphatphawan',
    title: 'Functional Trainee',
    department: 'Product Management',
    photo: 'https://i.pravatar.cc/150?img=14',
  },
  {
    id: 'EMP_DR002',
    name: 'Punnapa Thianchai',
    title: 'Functional Trainee',
    department: 'Product Management',
    photo: 'https://i.pravatar.cc/150?img=15',
  },
];

export default function OrgChartPage() {
  const t = useTranslations('orgChart');
  const tCommon = useTranslations('common');

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasData] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const ZOOM_STEP = 0.15;
  const ZOOM_MIN = 0.5;
  const ZOOM_MAX = 2.0;

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + ZOOM_STEP, ZOOM_MAX));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - ZOOM_STEP, ZOOM_MIN));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoomLevel(1.0);
  }, []);

  const handleNodeClick = useCallback((id: string) => {
    setSelectedNodeId(id);
  }, []);

  // Collect all nodes for search filtering
  const ALL_NODES: OrgNode[] = [CEO_NODE, VP_HR_NODE, VP_PRODUCT_NODE, VP_OPS_NODE, CURRENT_USER_NODE, ...DIRECT_REPORTS];

  const matchesSearch = useCallback(
    (node: OrgNode) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        node.name.toLowerCase().includes(q) ||
        node.title.toLowerCase().includes(q) ||
        (node.department?.toLowerCase().includes(q) ?? false)
      );
    },
    [searchQuery]
  );

  // Check if any node matches the search (to show "no results" message)
  const hasSearchResults = !searchQuery.trim() || ALL_NODES.some(matchesSearch);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-cg-dark">{t('title')}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {t('interactiveChart')}
                </p>
              </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={tCommon('search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red/40 focus:bg-white transition"
                />
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 hidden sm:block mr-1">
                  {t('zoomIn').replace('In', '')}:
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= ZOOM_MAX}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label={t('zoomIn')}
                  title={t('zoomIn')}
                >
                  <ZoomIn className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('zoomIn')}</span>
                </button>
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= ZOOM_MIN}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label={t('zoomOut')}
                  title={t('zoomOut')}
                >
                  <ZoomOut className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('zoomOut')}</span>
                </button>
                <button
                  onClick={handleZoomReset}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-700"
                  aria-label={t('resetView')}
                  title={t('resetView')}
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('resetView')}</span>
                </button>
                <span className="text-xs text-gray-400 ml-1">
                  {Math.round(zoomLevel * 100)}%
                </span>
              </div>
            </div>

            {/* Chart area */}
            {loading ? (
              <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-3 text-gray-500">
                  <div className="h-8 w-8 rounded-full border-2 border-cg-red border-t-transparent animate-spin" />
                  <p className="text-sm">{t('loading')}</p>
                </div>
              </div>
            ) : !hasData ? (
              <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-3 text-gray-500">
                  <Users className="h-10 w-10 text-gray-300" />
                  <p className="text-sm">{t('noOrgData')}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Main chart card */}
                <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-6 min-h-[480px] overflow-auto">
                  {/* No search results message */}
                  {!hasSearchResults && (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p className="text-sm">No results found for &ldquo;{searchQuery}&rdquo;</p>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="text-xs text-cg-red hover:underline"
                        >
                          Clear search
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Zoomable container */}
                  <div
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.2s ease-out',
                    }}
                    className={!hasSearchResults ? 'hidden' : ''}
                  >
                    {/* VP row header */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center mb-3">
                        Executive Leadership
                      </p>
                      <div className="flex justify-center">
                        <div className="w-full max-w-xs">
                          <button
                            onClick={() => handleNodeClick(CEO_NODE.id)}
                            className={`flex items-center gap-3 p-3 rounded-lg border text-left w-full transition-all ${
                              selectedNodeId === CEO_NODE.id
                                ? 'border-blue-400 ring-2 ring-blue-200 bg-blue-50'
                                : matchesSearch(CEO_NODE)
                                  ? searchQuery.trim()
                                    ? 'border-yellow-400 bg-yellow-50 ring-1 ring-yellow-300'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                  : 'border-gray-200 bg-white opacity-30'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                              <img
                                src={CEO_NODE.photo}
                                alt={CEO_NODE.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">{CEO_NODE.name}</p>
                              <p className="text-xs text-gray-500 truncate">{CEO_NODE.title}</p>
                              <p className="text-xs text-gray-400 truncate">{CEO_NODE.department}</p>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Branch lines to VPs */}
                      <div className="relative flex justify-center mt-0">
                        <div className="w-px h-5 bg-gray-300" />
                      </div>
                      <div className="relative flex justify-center">
                        <div className="w-2/3 h-px bg-gray-300" />
                      </div>

                      <div className="flex justify-center gap-4 mt-0">
                        {[VP_HR_NODE, VP_PRODUCT_NODE, VP_OPS_NODE].map((vp) => {
                          const isMatch = matchesSearch(vp);
                          const isSelected = selectedNodeId === vp.id;
                          return (
                            <div key={vp.id} className="flex flex-col items-center">
                              <div className="w-px h-4 bg-gray-300" />
                              <div className="w-full max-w-[200px]">
                                <button
                                  onClick={() => handleNodeClick(vp.id)}
                                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-left w-full transition-all ${
                                    isSelected
                                      ? 'border-blue-400 ring-2 ring-blue-200 bg-blue-50'
                                      : isMatch && searchQuery.trim()
                                        ? 'border-yellow-400 bg-yellow-50 ring-1 ring-yellow-300'
                                        : vp.id === VP_PRODUCT_NODE.id
                                          ? `border-cg-red/30 bg-cg-red/5${!isMatch && searchQuery.trim() ? ' opacity-30' : ''}`
                                          : `border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm${!isMatch && searchQuery.trim() ? ' opacity-30' : ''}`
                                  }`}
                                >
                                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                                    <img src={vp.photo} alt={vp.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-gray-900 truncate">{vp.name}</p>
                                    <p className="text-[11px] text-gray-500 truncate">{vp.title}</p>
                                  </div>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-dashed border-gray-200 my-4" />

                    {/* Current user chain (supervisor -> current -> direct reports) */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide text-center mb-4">
                        Your Team
                      </p>
                      <OrgChart
                        supervisor={VP_PRODUCT_NODE}
                        current={CURRENT_USER_NODE}
                        directReports={DIRECT_REPORTS}
                        onNodeClick={handleNodeClick}
                        searchQuery={searchQuery}
                      />
                    </div>
                  </div>
                </div>

                {/* Legend card */}
                <div className="lg:w-56 shrink-0">
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend</h3>
                    <div className="flex flex-col gap-3">
                      {/* Solid line = direct reporting */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 shrink-0">
                          <div className="w-3 h-px bg-gray-400" />
                          <Minus className="h-3 w-3 text-gray-400 -mx-1" />
                          <div className="w-3 h-px bg-gray-400" />
                        </div>
                        <p className="text-xs text-gray-600">Direct Reporting</p>
                      </div>

                      {/* Highlighted card = current user */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-4 rounded border border-cg-red bg-cg-red/10 shrink-0"
                          aria-hidden="true"
                        />
                        <p className="text-xs text-gray-600">
                          {t('you')} (Current User)
                        </p>
                      </div>

                      {/* VP highlight */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-4 rounded border border-cg-red/30 bg-cg-red/5 shrink-0"
                          aria-hidden="true"
                        />
                        <p className="text-xs text-gray-600">Reporting Line VP</p>
                      </div>
                    </div>

                    {/* Team summary */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Team Summary</h3>
                      <div className="flex flex-col gap-1.5 text-xs text-gray-600">
                        <div className="flex justify-between">
                          <span>Direct Reports</span>
                          <span className="font-medium text-gray-900">{DIRECT_REPORTS.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>VP Level</span>
                          <span className="font-medium text-gray-900">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Department</span>
                          <span className="font-medium text-gray-900 text-right">Product Mgmt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
