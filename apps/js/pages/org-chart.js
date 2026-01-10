/**
 * Organization Chart Page (Epic 1.1)
 * Full-page organization chart with multi-company support,
 * cost center integration, and reporting line visualization
 */

const OrgChartPage = (function() {
    return {
        /**
         * Render the org chart page
         * @returns {string} HTML string
         */
        render() {
            const currentEmployee = AppState.get('currentEmployee');
            const companyId = currentEmployee?.employmentInfo?.organization?.company?.split(' ')[0] || 'C015';

            return `
                <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <!-- Page Header -->
                    <div class="mb-6">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">
                                    ${i18n.t('orgChart.title')}
                                </h1>
                                <p class="mt-1 text-sm text-gray-500">
                                    ${i18n.isThai()
                                        ? 'ดูโครงสร้างองค์กรแบบภาพรวม พร้อมสายบังคับบัญชาและตำแหน่งว่าง'
                                        : 'View the organizational hierarchy with reporting lines and vacant positions'}
                                </p>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="OrgChartPage.exportToPng()"
                                        class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                        aria-label="${i18n.isThai() ? 'ส่งออกเป็นรูปภาพ' : 'Export as image'}">
                                    <span class="material-icons text-sm">image</span>
                                    ${i18n.isThai() ? 'ส่งออกรูปภาพ' : 'Export Image'}
                                </button>
                                <button onclick="OrgChartPage.print()"
                                        class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                        aria-label="${i18n.isThai() ? 'พิมพ์' : 'Print'}">
                                    <span class="material-icons text-sm">print</span>
                                    ${i18n.isThai() ? 'พิมพ์' : 'Print'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Org Chart Container -->
                    <div id="org-chart-page-container">
                        ${OrgChartComponent.render({
                            companyId: 'C015',
                            showFilters: true,
                            showMinimap: true,
                            mode: 'full'
                        })}
                    </div>

                    <!-- Quick Stats -->
                    ${this.renderQuickStats()}

                    <!-- Instructions Panel -->
                    ${this.renderInstructions()}
                </div>
            `;
        },

        /**
         * Render quick stats about the organization
         */
        renderQuickStats() {
            const stats = this.calculateOrgStats();

            return `
                <div class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span class="material-icons text-blue-600">business</span>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-gray-900">${stats.companies}</p>
                                <p class="text-sm text-gray-500">${i18n.t('orgChart.company')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                <span class="material-icons text-green-600">people</span>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-gray-900">${stats.employees}</p>
                                <p class="text-sm text-gray-500">${i18n.t('orgChart.employee')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <span class="material-icons text-purple-600">account_tree</span>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-gray-900">${stats.departments}</p>
                                <p class="text-sm text-gray-500">${i18n.t('orgChart.department')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                <span class="material-icons text-amber-600">person_add</span>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-gray-900">${stats.vacancies}</p>
                                <p class="text-sm text-gray-500">${i18n.t('orgChart.vacant')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Calculate organization statistics
         */
        calculateOrgStats() {
            if (typeof MockOrgStructure === 'undefined') {
                return { companies: 0, employees: 0, departments: 0, vacancies: 0 };
            }

            return {
                companies: MockOrgStructure.companies?.length || 0,
                employees: MockOrgStructure.employees?.length || 0,
                departments: MockOrgStructure.departments?.length || 0,
                vacancies: MockOrgStructure.vacantPositions?.length || 0
            };
        },

        /**
         * Render usage instructions
         */
        renderInstructions() {
            return `
                <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 class="text-sm font-medium text-blue-800 mb-2">
                        <span class="material-icons text-sm align-middle mr-1">help_outline</span>
                        ${i18n.isThai() ? 'วิธีใช้งาน' : 'How to use'}
                    </h3>
                    <ul class="text-sm text-blue-700 space-y-1">
                        <li class="flex items-start gap-2">
                            <span class="material-icons text-xs mt-0.5">mouse</span>
                            ${i18n.isThai()
                                ? 'คลิกและลากเพื่อเลื่อนดูผังองค์กร ใช้ scroll wheel เพื่อซูมเข้า/ออก'
                                : 'Click and drag to pan, use scroll wheel to zoom in/out'}
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="material-icons text-xs mt-0.5">keyboard</span>
                            ${i18n.isThai()
                                ? 'ใช้ปุ่มลูกศรเพื่อเลื่อน, +/- เพื่อซูม, 0 เพื่อรีเซ็ต'
                                : 'Use arrow keys to pan, +/- to zoom, 0 to reset view'}
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="material-icons text-xs mt-0.5">touch_app</span>
                            ${i18n.isThai()
                                ? 'คลิกที่ชื่อพนักงานเพื่อดูโปรไฟล์'
                                : 'Click on an employee to view their profile'}
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="material-icons text-xs mt-0.5">filter_alt</span>
                            ${i18n.isThai()
                                ? 'ใช้ตัวกรองด้านบนเพื่อกรองตามบริษัทหรือศูนย์ต้นทุน'
                                : 'Use filters above to filter by company or cost center'}
                        </li>
                    </ul>
                </div>
            `;
        },

        /**
         * Initialize the page
         */
        init() {
            // Initialize the org chart component after rendering
            setTimeout(() => {
                OrgChartComponent.init();
            }, 100);
        },

        /**
         * Export org chart as PNG
         */
        exportToPng() {
            ToastComponent.info(i18n.isThai()
                ? 'กำลังเตรียมไฟล์รูปภาพ...'
                : 'Preparing image export...');

            // In a real implementation, this would use html2canvas or similar
            setTimeout(() => {
                ToastComponent.success(i18n.isThai()
                    ? 'ส่งออกรูปภาพสำเร็จ'
                    : 'Image exported successfully');
            }, 1000);
        },

        /**
         * Print org chart
         */
        print() {
            ToastComponent.info(i18n.isThai()
                ? 'กำลังเตรียมพิมพ์...'
                : 'Preparing to print...');

            // In a real implementation, this would open print dialog
            setTimeout(() => {
                window.print();
            }, 500);
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrgChartPage;
}
