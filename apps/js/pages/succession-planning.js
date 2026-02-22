/**
 * Succession Planning Page
 * Critical position identification, successor nomination, succession chart, development actions
 */

const SuccessionPlanningPage = (function() {
    // State
    let activeTab = 'dashboard';
    let selectedPosition = null;
    let riskFilter = 'all';
    let coverageFilter = 'all';
    let searchQuery = '';

    /**
     * Check if user has access to succession planning
     * @returns {boolean}
     */
    function hasAccess() {
        return RBAC.isManager() || RBAC.isHR();
    }

    /**
     * Get filtered positions
     * @returns {array}
     */
    function getFilteredPositions() {
        let positions = MockSuccessionData.criticalPositions || [];

        // Apply risk filter
        if (riskFilter !== 'all') {
            positions = positions.filter(p => p.riskLevel === riskFilter);
        }

        // Apply coverage filter
        if (coverageFilter !== 'all') {
            positions = positions.filter(p => p.coverageStatus === coverageFilter);
        }

        // Apply search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            positions = positions.filter(p =>
                p.positionTitle.toLowerCase().includes(query) ||
                p.positionTitleTh?.includes(query) ||
                p.department.toLowerCase().includes(query) ||
                p.departmentTh?.includes(query) ||
                p.incumbent?.name.toLowerCase().includes(query) ||
                p.incumbent?.nameTh?.includes(query)
            );
        }

        return positions;
    }

    /**
     * Render access denied page
     * @returns {string}
     */
    function renderAccessDenied() {
        const isThai = i18n.isThai();
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div class="text-center">
                    <span class="material-icons text-6xl text-red-500 mb-4">lock</span>
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">
                        ${isThai ? 'ไม่มีสิทธิ์เข้าถึง' : 'Access Denied'}
                    </h1>
                    <p class="text-gray-500 mb-6">
                        ${isThai ? 'หน้านี้สำหรับผู้จัดการและ HR เท่านั้น' : 'This page is for managers and HR only'}
                    </p>
                    <a href="#/home" class="inline-flex items-center px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                        <span class="material-icons mr-2">arrow_back</span>
                        ${i18n.t('common.backToHome')}
                    </a>
                </div>
            </div>
        `;
    }

    return {
        /**
         * Render the succession planning page
         * @returns {string}
         */
        render() {
            // Check access
            if (!hasAccess()) {
                return renderAccessDenied();
            }

            const isThai = i18n.isThai();

            // Define tabs
            const tabs = [
                { id: 'dashboard', icon: 'dashboard', label: i18n.t('succession.dashboard') },
                { id: 'positions', icon: 'business_center', label: i18n.t('succession.criticalPositions') },
                { id: 'successors', icon: 'people', label: i18n.t('succession.successors') },
                { id: 'chart', icon: 'account_tree', label: i18n.t('succession.successionChart') },
                { id: 'actions', icon: 'assignment', label: i18n.t('succession.developmentActions') }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div>
                            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
                                ${i18n.t('succession.title')}
                            </h1>
                            <p class="text-gray-500 mt-1">
                                ${i18n.t('succession.subtitle')}
                            </p>
                        </div>
                        <button onclick="SuccessionPlanningPage.openNominateModal()"
                                class="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]"
                                aria-label="${i18n.t('succession.nominateSuccessor')}">
                            <span class="material-icons text-sm">person_add</span>
                            ${i18n.t('succession.nominateSuccessor')}
                        </button>
                    </div>

                    <!-- Tabs Navigation -->
                    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto" role="tablist" aria-label="${i18n.t('succession.tabNavigation')}">
                        ${tabs.map(tab => `
                            <button onclick="SuccessionPlanningPage.switchTab('${tab.id}')"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition whitespace-nowrap min-h-[44px]
                                        ${activeTab === tab.id ? 'bg-white text-cg-red shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                                    role="tab"
                                    id="tab-${tab.id}"
                                    aria-selected="${activeTab === tab.id}"
                                    aria-controls="panel-${tab.id}">
                                <span class="material-icons text-sm" aria-hidden="true">${tab.icon}</span>
                                <span class="hidden sm:inline">${tab.label}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Tab Content -->
                    <div id="succession-tab-content" role="tabpanel" aria-labelledby="tab-${activeTab}">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Initialize the page
         */
        init() {
            // Reset state
            activeTab = 'dashboard';
            selectedPosition = null;
            riskFilter = 'all';
            coverageFilter = 'all';
            searchQuery = '';
        },

        /**
         * Switch between tabs
         * @param {string} tabId
         */
        switchTab(tabId) {
            activeTab = tabId;
            selectedPosition = null;
            const content = document.getElementById('succession-tab-content');
            if (content) {
                content.innerHTML = this.renderTabContent();
            }
            // Update tab button states
            document.querySelectorAll('[role="tab"]').forEach(btn => {
                const isSelected = btn.id === `tab-${tabId}`;
                btn.setAttribute('aria-selected', isSelected);
                btn.classList.toggle('bg-white', isSelected);
                btn.classList.toggle('text-cg-red', isSelected);
                btn.classList.toggle('shadow-sm', isSelected);
                btn.classList.toggle('text-gray-600', !isSelected);
            });
        },

        /**
         * Render active tab content
         * @returns {string}
         */
        renderTabContent() {
            switch (activeTab) {
                case 'dashboard':
                    return this.renderDashboard();
                case 'positions':
                    return this.renderPositions();
                case 'successors':
                    return this.renderSuccessors();
                case 'chart':
                    return this.renderSuccessionChart();
                case 'actions':
                    return this.renderDevelopmentActions();
                default:
                    return this.renderDashboard();
            }
        },

        /**
         * Render dashboard tab
         * @returns {string}
         */
        renderDashboard() {
            const isThai = i18n.isThai();
            const metrics = MockSuccessionData.dashboardMetrics;
            const positions = MockSuccessionData.criticalPositions;
            const pendingActions = MockSuccessionData.getPendingActions().slice(0, 5);

            return `
                <div class="space-y-6">
                    <!-- Key Metrics -->
                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        ${this.renderMetricCard({
                            icon: 'business_center',
                            iconBg: 'bg-blue-100',
                            iconColor: 'text-blue-600',
                            value: metrics.totalCriticalPositions,
                            label: i18n.t('succession.criticalPositions')
                        })}
                        ${this.renderMetricCard({
                            icon: 'check_circle',
                            iconBg: 'bg-green-100',
                            iconColor: 'text-green-600',
                            value: `${metrics.coverageRatio}%`,
                            label: i18n.t('succession.coverageRatio')
                        })}
                        ${this.renderMetricCard({
                            icon: 'thumb_up',
                            iconBg: 'bg-teal-100',
                            iconColor: 'text-teal-600',
                            value: `${metrics.readyNowRatio}%`,
                            label: i18n.t('succession.readyNowRatio')
                        })}
                        ${this.renderMetricCard({
                            icon: 'warning',
                            iconBg: 'bg-red-100',
                            iconColor: 'text-red-600',
                            value: metrics.highRiskPositions,
                            label: i18n.t('succession.highRisk')
                        })}
                        ${this.renderMetricCard({
                            icon: 'assignment_late',
                            iconBg: 'bg-orange-100',
                            iconColor: 'text-orange-600',
                            value: metrics.actionItemsDue,
                            label: i18n.t('succession.actionsDue')
                        })}
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Risk Heat Map -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div class="p-4 border-b border-gray-100">
                                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                    <span class="material-icons text-cg-red" aria-hidden="true">thermostat</span>
                                    ${i18n.t('succession.riskHeatMap')}
                                </h3>
                            </div>
                            <div class="p-4">
                                ${this.renderRiskHeatMap(positions)}
                            </div>
                        </div>

                        <!-- Upcoming Actions -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div class="p-4 border-b border-gray-100">
                                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                    <span class="material-icons text-cg-red" aria-hidden="true">event</span>
                                    ${i18n.t('succession.upcomingActions')}
                                </h3>
                            </div>
                            <div class="p-4">
                                ${pendingActions.length > 0 ? `
                                    <ul class="space-y-3" role="list">
                                        ${pendingActions.map(action => `
                                            <li class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                <span class="material-icons text-gray-400 mt-0.5" aria-hidden="true">assignment</span>
                                                <div class="flex-1 min-w-0">
                                                    <p class="font-medium text-gray-900 text-sm">${isThai ? action.actionTh : action.action}</p>
                                                    <p class="text-xs text-gray-500 mt-0.5">
                                                        ${isThai ? action.successorNameTh : action.successorName} -
                                                        ${isThai ? action.targetPositionTh : action.targetPosition}
                                                    </p>
                                                    <p class="text-xs text-gray-400 mt-1">
                                                        ${i18n.t('succession.dueDate')}: ${DateUtils.format(action.targetDate, 'medium')}
                                                    </p>
                                                </div>
                                                <span class="px-2 py-1 text-xs rounded-full ${action.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
                                                    ${i18n.t(`succession.status.${action.status}`)}
                                                </span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                    <button onclick="SuccessionPlanningPage.switchTab('actions')"
                                            class="mt-4 w-full py-2 text-sm text-cg-red hover:text-red-700 flex items-center justify-center gap-1 transition">
                                        ${i18n.t('common.viewMore')}
                                        <span class="material-icons text-sm" aria-hidden="true">arrow_forward</span>
                                    </button>
                                ` : `
                                    <div class="text-center py-8 text-gray-400">
                                        <span class="material-icons text-4xl mb-2" aria-hidden="true">check_circle</span>
                                        <p>${i18n.t('succession.noActionsDue')}</p>
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>

                    <!-- Coverage Summary -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="p-4 border-b border-gray-100">
                            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-cg-red" aria-hidden="true">pie_chart</span>
                                ${i18n.t('succession.coverageSummary')}
                            </h3>
                        </div>
                        <div class="p-4">
                            ${this.renderCoverageSummary(positions)}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render metric card
         * @param {object} options
         * @returns {string}
         */
        renderMetricCard(options) {
            const { icon, iconBg, iconColor, value, label, link } = options;
            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${link ? 'cursor-pointer hover:shadow-md transition' : ''}"
                     ${link ? `onclick="location.hash='${link}'"` : ''}>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center flex-shrink-0">
                            <span class="material-icons ${iconColor}" aria-hidden="true">${icon}</span>
                        </div>
                        <div class="min-w-0">
                            <p class="text-2xl font-bold text-gray-900">${value}</p>
                            <p class="text-xs text-gray-500 truncate">${label}</p>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render risk heat map
         * @param {array} positions
         * @returns {string}
         */
        renderRiskHeatMap(positions) {
            const isThai = i18n.isThai();
            const riskGroups = {
                high: positions.filter(p => p.riskLevel === 'high'),
                medium: positions.filter(p => p.riskLevel === 'medium'),
                low: positions.filter(p => p.riskLevel === 'low')
            };

            return `
                <div class="space-y-4">
                    <!-- High Risk -->
                    <div class="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                        <h4 class="font-medium text-red-800 mb-2 flex items-center gap-2">
                            <span class="material-icons text-sm" aria-hidden="true">error</span>
                            ${i18n.t('succession.highRisk')} (${riskGroups.high.length})
                        </h4>
                        ${riskGroups.high.length > 0 ? `
                            <ul class="space-y-1">
                                ${riskGroups.high.map(p => `
                                    <li class="text-sm text-red-700 flex items-center justify-between">
                                        <span>${isThai ? p.positionTitleTh : p.positionTitle}</span>
                                        <span class="text-xs">${isThai ? p.riskReasonTh : p.riskReason}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        ` : `<p class="text-sm text-red-600">${i18n.t('succession.noPositions')}</p>`}
                    </div>

                    <!-- Medium Risk -->
                    <div class="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                        <h4 class="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                            <span class="material-icons text-sm" aria-hidden="true">warning</span>
                            ${i18n.t('succession.mediumRisk')} (${riskGroups.medium.length})
                        </h4>
                        ${riskGroups.medium.length > 0 ? `
                            <ul class="space-y-1">
                                ${riskGroups.medium.map(p => `
                                    <li class="text-sm text-yellow-700">${isThai ? p.positionTitleTh : p.positionTitle}</li>
                                `).join('')}
                            </ul>
                        ` : `<p class="text-sm text-yellow-600">${i18n.t('succession.noPositions')}</p>`}
                    </div>

                    <!-- Low Risk -->
                    <div class="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 class="font-medium text-green-800 mb-2 flex items-center gap-2">
                            <span class="material-icons text-sm" aria-hidden="true">check_circle</span>
                            ${i18n.t('succession.lowRisk')} (${riskGroups.low.length})
                        </h4>
                        ${riskGroups.low.length > 0 ? `
                            <ul class="space-y-1">
                                ${riskGroups.low.map(p => `
                                    <li class="text-sm text-green-700">${isThai ? p.positionTitleTh : p.positionTitle}</li>
                                `).join('')}
                            </ul>
                        ` : `<p class="text-sm text-green-600">${i18n.t('succession.noPositions')}</p>`}
                    </div>
                </div>
            `;
        },

        /**
         * Render coverage summary
         * @param {array} positions
         * @returns {string}
         */
        renderCoverageSummary(positions) {
            const isThai = i18n.isThai();

            return `
                <div class="overflow-x-auto">
                    <table class="w-full" role="table">
                        <thead>
                            <tr class="text-left border-b border-gray-200">
                                <th class="pb-3 text-sm font-medium text-gray-500" scope="col">${i18n.t('succession.position')}</th>
                                <th class="pb-3 text-sm font-medium text-gray-500" scope="col">${i18n.t('succession.incumbent')}</th>
                                <th class="pb-3 text-sm font-medium text-gray-500" scope="col">${i18n.t('succession.risk')}</th>
                                <th class="pb-3 text-sm font-medium text-gray-500" scope="col">${i18n.t('succession.coverage')}</th>
                                <th class="pb-3 text-sm font-medium text-gray-500 text-center" scope="col">${i18n.t('succession.successorCount')}</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${positions.map(pos => `
                                <tr class="hover:bg-gray-50 cursor-pointer" onclick="SuccessionPlanningPage.viewPosition('${pos.id}')">
                                    <td class="py-3">
                                        <p class="font-medium text-gray-900">${isThai ? pos.positionTitleTh : pos.positionTitle}</p>
                                        <p class="text-xs text-gray-500">${isThai ? pos.departmentTh : pos.department}</p>
                                    </td>
                                    <td class="py-3">
                                        ${pos.incumbent ? `
                                            <div class="flex items-center gap-2">
                                                <img src="${pos.incumbent.photo}" alt="${pos.incumbent.name}" class="w-8 h-8 rounded-full">
                                                <span class="text-sm text-gray-700">${isThai ? pos.incumbent.nameTh : pos.incumbent.name}</span>
                                            </div>
                                        ` : `<span class="text-sm text-gray-400">${i18n.t('succession.vacant')}</span>`}
                                    </td>
                                    <td class="py-3">
                                        <span class="px-2 py-1 text-xs rounded-full ${MockSuccessionData.getRiskColor(pos.riskLevel)}">
                                            ${MockSuccessionData.getRiskLabel(pos.riskLevel, isThai)}
                                        </span>
                                    </td>
                                    <td class="py-3">
                                        <span class="px-2 py-1 text-xs rounded-full ${MockSuccessionData.getCoverageColor(pos.coverageStatus)}">
                                            ${MockSuccessionData.getCoverageLabel(pos.coverageStatus, isThai)}
                                        </span>
                                    </td>
                                    <td class="py-3 text-center">
                                        <span class="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                                            ${pos.successors.length}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        },

        /**
         * Render positions tab
         * @returns {string}
         */
        renderPositions() {
            const isThai = i18n.isThai();
            const positions = getFilteredPositions();

            return `
                <div class="space-y-4">
                    <!-- Filters -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex flex-wrap gap-4 items-center">
                            <!-- Search -->
                            <div class="relative flex-1 min-w-[200px]">
                                <input type="text"
                                       id="position-search"
                                       placeholder="${i18n.t('common.search')}..."
                                       value="${searchQuery}"
                                       class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-cg-red focus:border-transparent"
                                       oninput="SuccessionPlanningPage.handleSearch(this.value)"
                                       aria-label="${i18n.t('common.search')}">
                                <span class="material-icons text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true">search</span>
                            </div>

                            <!-- Risk Filter -->
                            <select id="risk-filter"
                                    class="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-cg-red focus:border-transparent"
                                    onchange="SuccessionPlanningPage.handleRiskFilter(this.value)"
                                    aria-label="${i18n.t('succession.filterByRisk')}">
                                <option value="all" ${riskFilter === 'all' ? 'selected' : ''}>${i18n.t('common.all')} ${i18n.t('succession.risk')}</option>
                                <option value="high" ${riskFilter === 'high' ? 'selected' : ''}>${i18n.t('succession.highRisk')}</option>
                                <option value="medium" ${riskFilter === 'medium' ? 'selected' : ''}>${i18n.t('succession.mediumRisk')}</option>
                                <option value="low" ${riskFilter === 'low' ? 'selected' : ''}>${i18n.t('succession.lowRisk')}</option>
                            </select>

                            <!-- Coverage Filter -->
                            <select id="coverage-filter"
                                    class="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-cg-red focus:border-transparent"
                                    onchange="SuccessionPlanningPage.handleCoverageFilter(this.value)"
                                    aria-label="${i18n.t('succession.filterByCoverage')}">
                                <option value="all" ${coverageFilter === 'all' ? 'selected' : ''}>${i18n.t('common.all')} ${i18n.t('succession.coverage')}</option>
                                <option value="full" ${coverageFilter === 'full' ? 'selected' : ''}>${i18n.t('succession.coverageFull')}</option>
                                <option value="partial" ${coverageFilter === 'partial' ? 'selected' : ''}>${i18n.t('succession.coveragePartial')}</option>
                                <option value="at_risk" ${coverageFilter === 'at_risk' ? 'selected' : ''}>${i18n.t('succession.coverageAtRisk')}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Position Cards -->
                    ${positions.length > 0 ? `
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${positions.map(pos => this.renderPositionCard(pos)).join('')}
                        </div>
                    ` : `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                            <span class="material-icons text-4xl text-gray-300 mb-2" aria-hidden="true">search_off</span>
                            <p class="text-gray-500">${i18n.t('common.noResults')}</p>
                        </div>
                    `}
                </div>
            `;
        },

        /**
         * Render a position card
         * @param {object} position
         * @returns {string}
         */
        renderPositionCard(position) {
            const isThai = i18n.isThai();
            const readyNowCount = position.successors.filter(s => s.readiness === 'ready_now').length;

            return `
                <article class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition cursor-pointer"
                         onclick="SuccessionPlanningPage.viewPosition('${position.id}')"
                         role="article"
                         aria-label="${isThai ? position.positionTitleTh : position.positionTitle}">
                    <!-- Header -->
                    <div class="p-4 border-b border-gray-100">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-semibold text-gray-900">${isThai ? position.positionTitleTh : position.positionTitle}</h3>
                                <p class="text-sm text-gray-500">${isThai ? position.departmentTh : position.department}</p>
                            </div>
                            <span class="px-2 py-1 text-xs rounded-full ${MockSuccessionData.getRiskColor(position.riskLevel)}">
                                ${MockSuccessionData.getRiskLabel(position.riskLevel, isThai)}
                            </span>
                        </div>
                    </div>

                    <!-- Incumbent -->
                    <div class="p-4 bg-gray-50">
                        <p class="text-xs text-gray-500 mb-2">${i18n.t('succession.currentIncumbent')}</p>
                        ${position.incumbent ? `
                            <div class="flex items-center gap-3">
                                <img src="${position.incumbent.photo}" alt="${position.incumbent.name}" class="w-10 h-10 rounded-full">
                                <div>
                                    <p class="font-medium text-gray-900 text-sm">${isThai ? position.incumbent.nameTh : position.incumbent.name}</p>
                                    <p class="text-xs text-gray-500">${position.incumbent.yearsInRole} ${i18n.t('succession.yearsInRole')}</p>
                                </div>
                            </div>
                            ${position.incumbent.retirementDate ? `
                                <p class="mt-2 text-xs text-orange-600 flex items-center gap-1">
                                    <span class="material-icons text-xs" aria-hidden="true">schedule</span>
                                    ${i18n.t('succession.retires')}: ${DateUtils.format(position.incumbent.retirementDate, 'medium')}
                                </p>
                            ` : ''}
                        ` : `
                            <p class="text-sm text-gray-400 italic">${i18n.t('succession.vacant')}</p>
                        `}
                    </div>

                    <!-- Footer Stats -->
                    <div class="p-4 flex items-center justify-between border-t border-gray-100">
                        <div class="flex items-center gap-4">
                            <div class="text-center">
                                <p class="text-lg font-bold text-gray-900">${position.successors.length}</p>
                                <p class="text-xs text-gray-500">${i18n.t('succession.successors')}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-lg font-bold text-green-600">${readyNowCount}</p>
                                <p class="text-xs text-gray-500">${i18n.t('succession.readyNow')}</p>
                            </div>
                        </div>
                        <span class="px-2 py-1 text-xs rounded-full ${MockSuccessionData.getCoverageColor(position.coverageStatus)}">
                            ${MockSuccessionData.getCoverageLabel(position.coverageStatus, isThai)}
                        </span>
                    </div>
                </article>
            `;
        },

        /**
         * Render successors tab
         * @returns {string}
         */
        renderSuccessors() {
            const isThai = i18n.isThai();
            const allSuccessors = MockSuccessionData.getAllSuccessors();

            // Group by readiness
            const groupedByReadiness = {
                ready_now: allSuccessors.filter(s => s.readiness === 'ready_now'),
                ready_1_2_years: allSuccessors.filter(s => s.readiness === 'ready_1_2_years'),
                ready_3_plus_years: allSuccessors.filter(s => s.readiness === 'ready_3_plus_years')
            };

            return `
                <div class="space-y-6">
                    ${MockSuccessionData.readinessLevels.map(level => `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div class="p-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                    <span class="px-2 py-1 text-xs rounded-full ${level.color}">
                                        ${isThai ? level.labelTh : level.labelEn}
                                    </span>
                                    <span class="text-gray-400">(${groupedByReadiness[level.value].length})</span>
                                </h3>
                            </div>
                            <div class="p-4">
                                ${groupedByReadiness[level.value].length > 0 ? `
                                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        ${groupedByReadiness[level.value].map(succ => this.renderSuccessorCard(succ)).join('')}
                                    </div>
                                ` : `
                                    <p class="text-center text-gray-400 py-4">${i18n.t('succession.noSuccessorsInCategory')}</p>
                                `}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        /**
         * Render successor card
         * @param {object} successor
         * @returns {string}
         */
        renderSuccessorCard(successor) {
            const isThai = i18n.isThai();

            return `
                <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition cursor-pointer"
                     onclick="SuccessionPlanningPage.viewSuccessor('${successor.id}')">
                    <div class="flex items-start gap-3">
                        <img src="${successor.photo}" alt="${successor.name}" class="w-12 h-12 rounded-full">
                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-gray-900">${isThai ? successor.nameTh : successor.name}</p>
                            <p class="text-xs text-gray-500 truncate">${isThai ? successor.currentPositionTh : successor.currentPosition}</p>
                            <p class="text-xs text-cg-red mt-1">
                                ${i18n.t('succession.targetPosition')}: ${isThai ? successor.targetPositionTh : successor.targetPosition}
                            </p>
                        </div>
                    </div>
                    <div class="mt-3 flex items-center justify-between text-xs">
                        <span class="text-gray-500">
                            ${i18n.t('succession.gaps')}: ${successor.developmentGaps.length}
                        </span>
                        <span class="text-gray-500">
                            ${i18n.t('succession.actions')}: ${successor.developmentActions.length}
                        </span>
                    </div>
                </div>
            `;
        },

        /**
         * Render succession chart tab
         * @returns {string}
         */
        renderSuccessionChart() {
            const isThai = i18n.isThai();
            const positions = MockSuccessionData.criticalPositions;

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="mb-4 flex items-center gap-4 flex-wrap">
                        <span class="text-sm text-gray-500">${i18n.t('succession.chartLegend')}:</span>
                        <span class="inline-flex items-center gap-1 text-xs">
                            <span class="w-3 h-3 rounded-full bg-green-500" aria-hidden="true"></span>
                            ${i18n.t('succession.readyNow')}
                        </span>
                        <span class="inline-flex items-center gap-1 text-xs">
                            <span class="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true"></span>
                            ${i18n.t('succession.ready1To2Years')}
                        </span>
                        <span class="inline-flex items-center gap-1 text-xs">
                            <span class="w-3 h-3 rounded-full bg-orange-500" aria-hidden="true"></span>
                            ${i18n.t('succession.ready3PlusYears')}
                        </span>
                    </div>

                    <div class="overflow-x-auto">
                        <div class="min-w-[800px] space-y-8 py-4">
                            ${positions.map(pos => this.renderChartNode(pos)).join('')}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render chart node for a position
         * @param {object} position
         * @returns {string}
         */
        renderChartNode(position) {
            const isThai = i18n.isThai();
            const riskBorderColor = {
                high: 'border-red-500',
                medium: 'border-yellow-500',
                low: 'border-green-500'
            };

            return `
                <div class="flex items-start gap-6">
                    <!-- Position Box -->
                    <div class="w-64 flex-shrink-0 bg-white border-2 ${riskBorderColor[position.riskLevel]} rounded-lg p-4 shadow-sm">
                        <h4 class="font-semibold text-gray-900 text-sm">${isThai ? position.positionTitleTh : position.positionTitle}</h4>
                        <p class="text-xs text-gray-500 mb-3">${isThai ? position.departmentTh : position.department}</p>
                        ${position.incumbent ? `
                            <div class="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <img src="${position.incumbent.photo}" alt="${position.incumbent.name}" class="w-8 h-8 rounded-full">
                                <div>
                                    <p class="text-xs font-medium text-gray-900">${isThai ? position.incumbent.nameTh : position.incumbent.name}</p>
                                    <p class="text-xs text-gray-500">${i18n.t('succession.incumbent')}</p>
                                </div>
                            </div>
                        ` : `
                            <div class="p-2 bg-red-50 rounded text-center">
                                <p class="text-xs text-red-600">${i18n.t('succession.vacant')}</p>
                            </div>
                        `}
                    </div>

                    <!-- Arrow -->
                    <div class="flex items-center h-24">
                        <div class="w-8 h-0.5 bg-gray-300"></div>
                        <span class="material-icons text-gray-300" aria-hidden="true">arrow_forward</span>
                    </div>

                    <!-- Successors -->
                    <div class="flex-1 flex flex-wrap gap-3">
                        ${position.successors.length > 0 ? position.successors.map(succ => {
                            const readinessColor = {
                                ready_now: 'bg-green-500',
                                ready_1_2_years: 'bg-yellow-500',
                                ready_3_plus_years: 'bg-orange-500'
                            };
                            return `
                                <div class="w-48 bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer"
                                     onclick="SuccessionPlanningPage.viewSuccessor('${succ.id}')">
                                    <div class="flex items-center gap-2 mb-2">
                                        <div class="relative">
                                            <img src="${succ.photo}" alt="${succ.name}" class="w-10 h-10 rounded-full">
                                            <span class="absolute -bottom-1 -right-1 w-4 h-4 ${readinessColor[succ.readiness]} rounded-full border-2 border-white" aria-hidden="true"></span>
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-xs font-medium text-gray-900 truncate">${isThai ? succ.nameTh : succ.name}</p>
                                            <p class="text-xs text-gray-500 truncate">${isThai ? succ.currentPositionTh : succ.currentPosition}</p>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-between text-xs">
                                        <span class="px-1.5 py-0.5 rounded ${MockSuccessionData.getReadinessColor(succ.readiness)}">
                                            ${MockSuccessionData.getReadinessLabel(succ.readiness, isThai)}
                                        </span>
                                        <span class="text-gray-400">${succ.developmentGaps.length} ${i18n.t('succession.gaps')}</span>
                                    </div>
                                </div>
                            `;
                        }).join('') : `
                            <div class="w-48 bg-red-50 border border-red-200 border-dashed rounded-lg p-4 text-center">
                                <span class="material-icons text-red-300 text-2xl mb-1" aria-hidden="true">person_off</span>
                                <p class="text-xs text-red-600">${i18n.t('succession.noSuccessors')}</p>
                            </div>
                        `}
                    </div>
                </div>
            `;
        },

        /**
         * Render development actions tab
         * @returns {string}
         */
        renderDevelopmentActions() {
            const isThai = i18n.isThai();
            const actions = MockSuccessionData.getPendingActions();
            const completedActions = [];
            MockSuccessionData.criticalPositions.forEach(pos => {
                pos.successors.forEach(succ => {
                    succ.developmentActions.forEach(action => {
                        if (action.status === 'completed') {
                            completedActions.push({
                                ...action,
                                successorName: succ.name,
                                successorNameTh: succ.nameTh,
                                targetPosition: pos.positionTitle,
                                targetPositionTh: pos.positionTitleTh
                            });
                        }
                    });
                });
            });

            return `
                <div class="space-y-6">
                    <!-- Pending Actions -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b border-gray-100">
                            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-orange-500" aria-hidden="true">pending_actions</span>
                                ${i18n.t('succession.pendingActions')} (${actions.length})
                            </h3>
                        </div>
                        <div class="divide-y divide-gray-100">
                            ${actions.length > 0 ? actions.map(action => this.renderActionItem(action, false)).join('') : `
                                <div class="p-8 text-center text-gray-400">
                                    <span class="material-icons text-4xl mb-2" aria-hidden="true">check_circle</span>
                                    <p>${i18n.t('succession.noActionsDue')}</p>
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- Completed Actions -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b border-gray-100">
                            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-green-500" aria-hidden="true">task_alt</span>
                                ${i18n.t('succession.completedActions')} (${completedActions.length})
                            </h3>
                        </div>
                        <div class="divide-y divide-gray-100">
                            ${completedActions.length > 0 ? completedActions.map(action => this.renderActionItem(action, true)).join('') : `
                                <div class="p-8 text-center text-gray-400">
                                    <span class="material-icons text-4xl mb-2" aria-hidden="true">inbox</span>
                                    <p>${i18n.t('succession.noCompletedActions')}</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render action item
         * @param {object} action
         * @param {boolean} isCompleted
         * @returns {string}
         */
        renderActionItem(action, isCompleted) {
            const isThai = i18n.isThai();
            const typeLabel = MockSuccessionData.developmentTypes.find(t => t.value === action.type);
            const statusColors = {
                planned: 'bg-gray-100 text-gray-800',
                in_progress: 'bg-blue-100 text-blue-800',
                completed: 'bg-green-100 text-green-800'
            };

            return `
                <div class="p-4 hover:bg-gray-50 transition">
                    <div class="flex items-start gap-4">
                        <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <span class="material-icons text-gray-500" aria-hidden="true">
                                ${action.type === 'training' ? 'school' :
                                  action.type === 'mentoring' ? 'supervisor_account' :
                                  action.type === 'stretch_assignment' ? 'work' :
                                  action.type === 'education' ? 'menu_book' : 'assignment'}
                            </span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <p class="font-medium text-gray-900">${isThai ? action.actionTh : action.action}</p>
                                    <p class="text-sm text-gray-500 mt-0.5">
                                        ${isThai ? action.successorNameTh : action.successorName} -
                                        ${isThai ? action.targetPositionTh : action.targetPosition}
                                    </p>
                                </div>
                                <span class="px-2 py-1 text-xs rounded-full ${statusColors[action.status]} flex-shrink-0">
                                    ${i18n.t(`succession.status.${action.status}`)}
                                </span>
                            </div>
                            <div class="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                <span class="flex items-center gap-1">
                                    <span class="material-icons text-xs" aria-hidden="true">category</span>
                                    ${typeLabel ? (isThai ? typeLabel.labelTh : typeLabel.labelEn) : action.type}
                                </span>
                                <span class="flex items-center gap-1">
                                    <span class="material-icons text-xs" aria-hidden="true">event</span>
                                    ${i18n.t('succession.dueDate')}: ${DateUtils.format(action.targetDate, 'medium')}
                                </span>
                            </div>
                            ${!isCompleted && action.progress > 0 ? `
                                <div class="mt-2">
                                    <div class="flex items-center justify-between text-xs mb-1">
                                        <span class="text-gray-500">${i18n.t('succession.progress')}</span>
                                        <span class="font-medium text-gray-700">${action.progress}%</span>
                                    </div>
                                    <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="${action.progress}" aria-valuemin="0" aria-valuemax="100">
                                        <div class="h-full bg-cg-red rounded-full transition-all" style="width: ${action.progress}%"></div>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Handle search input
         * @param {string} query
         */
        handleSearch(query) {
            searchQuery = query;
            const content = document.getElementById('succession-tab-content');
            if (content) {
                content.innerHTML = this.renderTabContent();
            }
        },

        /**
         * Handle risk filter change
         * @param {string} value
         */
        handleRiskFilter(value) {
            riskFilter = value;
            const content = document.getElementById('succession-tab-content');
            if (content) {
                content.innerHTML = this.renderTabContent();
            }
        },

        /**
         * Handle coverage filter change
         * @param {string} value
         */
        handleCoverageFilter(value) {
            coverageFilter = value;
            const content = document.getElementById('succession-tab-content');
            if (content) {
                content.innerHTML = this.renderTabContent();
            }
        },

        /**
         * View position details
         * @param {string} positionId
         */
        viewPosition(positionId) {
            const position = MockSuccessionData.getPositionById(positionId);
            if (!position) return;

            const isThai = i18n.isThai();

            ModalComponent.open({
                title: isThai ? position.positionTitleTh : position.positionTitle,
                size: 'lg',
                content: `
                    <div class="space-y-6">
                        <!-- Position Info -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('succession.department')}</p>
                                <p class="font-medium">${isThai ? position.departmentTh : position.department}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('succession.risk')}</p>
                                <span class="inline-block px-2 py-1 text-xs rounded-full ${MockSuccessionData.getRiskColor(position.riskLevel)}">
                                    ${MockSuccessionData.getRiskLabel(position.riskLevel, isThai)}
                                </span>
                            </div>
                            <div class="col-span-2">
                                <p class="text-sm text-gray-500">${i18n.t('succession.riskReason')}</p>
                                <p class="text-sm text-gray-700">${isThai ? position.riskReasonTh : position.riskReason}</p>
                            </div>
                        </div>

                        <!-- Incumbent -->
                        ${position.incumbent ? `
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-3">${i18n.t('succession.currentIncumbent')}</h4>
                                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <img src="${position.incumbent.photo}" alt="${position.incumbent.name}" class="w-16 h-16 rounded-full">
                                    <div>
                                        <p class="font-medium text-gray-900">${isThai ? position.incumbent.nameTh : position.incumbent.name}</p>
                                        <p class="text-sm text-gray-500">${position.incumbent.yearsInRole} ${i18n.t('succession.yearsInRole')}</p>
                                        ${position.incumbent.retirementDate ? `
                                            <p class="text-sm text-orange-600 mt-1">${i18n.t('succession.retires')}: ${DateUtils.format(position.incumbent.retirementDate, 'medium')}</p>
                                        ` : ''}
                                        <p class="text-sm mt-1">
                                            ${i18n.t('succession.flightRisk')}:
                                            <span class="${position.incumbent.flightRisk === 'high' ? 'text-red-600' : position.incumbent.flightRisk === 'medium' ? 'text-yellow-600' : 'text-green-600'}">
                                                ${i18n.t(`succession.flightRisk.${position.incumbent.flightRisk}`)}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ` : ''}

                        <!-- Successors -->
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-3">${i18n.t('succession.identifiedSuccessors')} (${position.successors.length})</h4>
                            ${position.successors.length > 0 ? `
                                <div class="space-y-3">
                                    ${position.successors.map(succ => `
                                        <div class="p-4 border border-gray-200 rounded-lg">
                                            <div class="flex items-start justify-between">
                                                <div class="flex items-center gap-3">
                                                    <img src="${succ.photo}" alt="${succ.name}" class="w-12 h-12 rounded-full">
                                                    <div>
                                                        <p class="font-medium text-gray-900">${isThai ? succ.nameTh : succ.name}</p>
                                                        <p class="text-sm text-gray-500">${isThai ? succ.currentPositionTh : succ.currentPosition}</p>
                                                    </div>
                                                </div>
                                                <span class="px-2 py-1 text-xs rounded-full ${MockSuccessionData.getReadinessColor(succ.readiness)}">
                                                    ${MockSuccessionData.getReadinessLabel(succ.readiness, isThai)}
                                                </span>
                                            </div>
                                            ${succ.developmentGaps.length > 0 ? `
                                                <div class="mt-3">
                                                    <p class="text-xs text-gray-500 mb-1">${i18n.t('succession.developmentGaps')}:</p>
                                                    <div class="flex flex-wrap gap-1">
                                                        ${succ.developmentGaps.map(gap => `
                                                            <span class="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded">
                                                                ${isThai ? gap.areaTh : gap.area}
                                                            </span>
                                                        `).join('')}
                                                    </div>
                                                </div>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="p-8 bg-red-50 rounded-lg text-center">
                                    <span class="material-icons text-red-300 text-4xl mb-2" aria-hidden="true">warning</span>
                                    <p class="text-red-600">${i18n.t('succession.noSuccessorsIdentified')}</p>
                                    <button onclick="ModalComponent.close(); SuccessionPlanningPage.openNominateModal('${position.id}')"
                                            class="mt-4 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                                        ${i18n.t('succession.nominateNow')}
                                    </button>
                                </div>
                            `}
                        </div>

                        <!-- Review Dates -->
                        <div class="flex items-center gap-6 text-sm text-gray-500 border-t pt-4">
                            <span>${i18n.t('succession.lastReview')}: ${DateUtils.format(position.lastReviewDate, 'medium')}</span>
                            <span>${i18n.t('succession.nextReview')}: ${DateUtils.format(position.nextReviewDate, 'medium')}</span>
                        </div>
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        /**
         * View successor details
         * @param {string} successorId
         */
        viewSuccessor(successorId) {
            const allSuccessors = MockSuccessionData.getAllSuccessors();
            const successor = allSuccessors.find(s => s.id === successorId);
            if (!successor) return;

            const isThai = i18n.isThai();

            ModalComponent.open({
                title: isThai ? successor.nameTh : successor.name,
                size: 'lg',
                content: `
                    <div class="space-y-6">
                        <!-- Successor Info -->
                        <div class="flex items-center gap-4">
                            <img src="${successor.photo}" alt="${successor.name}" class="w-20 h-20 rounded-full">
                            <div>
                                <p class="font-semibold text-lg text-gray-900">${isThai ? successor.nameTh : successor.name}</p>
                                <p class="text-gray-500">${isThai ? successor.currentPositionTh : successor.currentPosition}</p>
                                <p class="text-sm text-cg-red mt-1">${i18n.t('succession.targetPosition')}: ${isThai ? successor.targetPositionTh : successor.targetPosition}</p>
                            </div>
                        </div>

                        <!-- Readiness & Ratings -->
                        <div class="grid grid-cols-3 gap-4">
                            <div class="p-3 bg-gray-50 rounded-lg text-center">
                                <p class="text-xs text-gray-500">${i18n.t('succession.readiness')}</p>
                                <span class="inline-block mt-1 px-2 py-1 text-xs rounded-full ${MockSuccessionData.getReadinessColor(successor.readiness)}">
                                    ${MockSuccessionData.getReadinessLabel(successor.readiness, isThai)}
                                </span>
                            </div>
                            <div class="p-3 bg-gray-50 rounded-lg text-center">
                                <p class="text-xs text-gray-500">${i18n.t('succession.potential')}</p>
                                <p class="font-medium text-gray-900 mt-1">${i18n.t(`succession.potential.${successor.potentialRating}`)}</p>
                            </div>
                            <div class="p-3 bg-gray-50 rounded-lg text-center">
                                <p class="text-xs text-gray-500">${i18n.t('succession.performance')}</p>
                                <p class="font-medium text-gray-900 mt-1">${i18n.t(`succession.performance.${successor.performanceRating}`)}</p>
                            </div>
                        </div>

                        <!-- Development Gaps -->
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-3">${i18n.t('succession.developmentGaps')} (${successor.developmentGaps.length})</h4>
                            ${successor.developmentGaps.length > 0 ? `
                                <ul class="space-y-2">
                                    ${successor.developmentGaps.map(gap => `
                                        <li class="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                            <span class="text-sm text-gray-700">${isThai ? gap.areaTh : gap.area}</span>
                                            <span class="px-2 py-0.5 text-xs rounded-full ${gap.priority === 'high' ? 'bg-red-100 text-red-800' : gap.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                                                ${i18n.t(`succession.priority.${gap.priority}`)}
                                            </span>
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : `<p class="text-gray-400 text-center py-4">${i18n.t('succession.noGaps')}</p>`}
                        </div>

                        <!-- Development Actions -->
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-3">${i18n.t('succession.developmentActions')} (${successor.developmentActions.length})</h4>
                            ${successor.developmentActions.length > 0 ? `
                                <ul class="space-y-3">
                                    ${successor.developmentActions.map(action => `
                                        <li class="p-3 border border-gray-200 rounded-lg">
                                            <div class="flex items-start justify-between">
                                                <div>
                                                    <p class="font-medium text-gray-900 text-sm">${isThai ? action.actionTh : action.action}</p>
                                                    <p class="text-xs text-gray-500 mt-0.5">${i18n.t('succession.dueDate')}: ${DateUtils.format(action.targetDate, 'medium')}</p>
                                                </div>
                                                <span class="px-2 py-0.5 text-xs rounded-full ${action.status === 'completed' ? 'bg-green-100 text-green-800' : action.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
                                                    ${i18n.t(`succession.status.${action.status}`)}
                                                </span>
                                            </div>
                                            ${action.progress > 0 && action.status !== 'completed' ? `
                                                <div class="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div class="h-full bg-cg-red rounded-full" style="width: ${action.progress}%"></div>
                                                </div>
                                            ` : ''}
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : `<p class="text-gray-400 text-center py-4">${i18n.t('succession.noActions')}</p>`}
                        </div>

                        <!-- Nomination Info -->
                        <div class="border-t pt-4 text-sm text-gray-500">
                            <p>${i18n.t('succession.nominatedBy')}: ${successor.nominatedBy}</p>
                            <p>${i18n.t('succession.nominatedDate')}: ${DateUtils.format(successor.nominatedDate, 'medium')}</p>
                        </div>
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        /**
         * Open nominate successor modal
         * @param {string} positionId - optional pre-selected position
         */
        openNominateModal(positionId = null) {
            const isThai = i18n.isThai();
            const positions = MockSuccessionData.criticalPositions;
            const candidates = MockSuccessionData.potentialSuccessors;

            ModalComponent.open({
                title: i18n.t('succession.nominateSuccessor'),
                size: 'lg',
                content: `
                    <form id="nominate-form" class="space-y-4">
                        ${FormFieldComponent.select({
                            name: 'positionId',
                            label: i18n.t('succession.targetPosition'),
                            required: true,
                            value: positionId || '',
                            placeholder: i18n.t('common.select'),
                            options: positions.map(p => ({
                                value: p.id,
                                label: isThai ? p.positionTitleTh : p.positionTitle
                            }))
                        })}

                        ${FormFieldComponent.select({
                            name: 'candidateId',
                            label: i18n.t('succession.candidate'),
                            required: true,
                            placeholder: i18n.t('common.select'),
                            options: candidates.map(c => ({
                                value: c.id,
                                label: `${isThai ? c.nameTh : c.name} - ${isThai ? c.positionTh : c.position}`
                            }))
                        })}

                        ${FormFieldComponent.select({
                            name: 'readiness',
                            label: i18n.t('succession.readiness'),
                            required: true,
                            placeholder: i18n.t('common.select'),
                            options: MockSuccessionData.readinessLevels.map(r => ({
                                value: r.value,
                                label: isThai ? r.labelTh : r.labelEn
                            }))
                        })}

                        ${FormFieldComponent.textarea({
                            name: 'developmentGaps',
                            label: i18n.t('succession.developmentGaps'),
                            placeholder: isThai ? 'ระบุช่องว่างในการพัฒนา (แต่ละรายการในบรรทัดใหม่)' : 'Enter development gaps (one per line)',
                            rows: 3
                        })}

                        ${FormFieldComponent.textarea({
                            name: 'comments',
                            label: i18n.t('succession.comments'),
                            placeholder: isThai ? 'เหตุผลในการเสนอชื่อ' : 'Reason for nomination',
                            rows: 3
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('succession.nominate'), primary: true, onclick: 'SuccessionPlanningPage.submitNomination()' }
                ]
            });
        },

        /**
         * Submit nomination
         */
        submitNomination() {
            const formData = FormFieldComponent.getFormData('nominate-form');

            // Validate
            if (!formData.positionId || !formData.candidateId || !formData.readiness) {
                ToastComponent.error(i18n.t('error.validationFailed'));
                return;
            }

            // Mock save
            ToastComponent.success(i18n.t('succession.nominationSuccess'));
            ModalComponent.close();
            Router.refresh();
        },

        /**
         * Render skeleton loading
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="animate-pulse">
                        <div class="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            ${[1,2,3,4].map(() => '<div class="h-24 bg-gray-200 rounded-lg"></div>').join('')}
                        </div>
                        <div class="h-64 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SuccessionPlanningPage;
}
