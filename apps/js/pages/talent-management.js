/**
 * Talent Management Page
 * Talent Identification and Hi-Po employee tracking
 */

const TalentManagementPage = (function() {
    let activeTab = 'dashboard';
    let selectedEmployee = null;
    let draggedEmployee = null;
    let filterDepartment = 'all';
    let filterRisk = 'all';
    let searchQuery = '';

    return {
        /**
         * Render the talent management page
         * @returns {string}
         */
        render() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <!-- Page Header -->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900" id="page-title">
                            ${i18n.t('talent.title')}
                        </h1>
                        <p class="text-gray-600 mt-1">${i18n.t('talent.subtitle')}</p>
                    </div>

                    <!-- Tab Navigation -->
                    <div class="border-b border-gray-200 mb-6" role="tablist" aria-label="${i18n.t('talent.title')}">
                        <nav class="flex -mb-px space-x-6">
                            ${this.renderTab('dashboard', 'dashboard', i18n.t('talent.tabs.dashboard'))}
                            ${this.renderTab('nineBox', 'grid_view', i18n.t('talent.tabs.nineBox'))}
                            ${this.renderTab('talentPool', 'groups', i18n.t('talent.tabs.talentPool'))}
                            ${this.renderTab('criteria', 'tune', i18n.t('talent.tabs.criteria'))}
                            ${this.renderTab('review', 'rate_review', i18n.t('talent.tabs.review'))}
                        </nav>
                    </div>

                    <!-- Tab Content -->
                    <div id="tab-content" role="tabpanel" aria-labelledby="tab-${activeTab}">
                        ${this.renderTabContent()}
                    </div>
                </div>

                <!-- Talent Profile Modal Placeholder -->
                <div id="talent-profile-modal"></div>
            `;
        },

        /**
         * Render a tab button
         */
        renderTab(id, icon, label) {
            const isActive = activeTab === id;
            return `
                <button
                    id="tab-${id}"
                    role="tab"
                    aria-selected="${isActive}"
                    aria-controls="panel-${id}"
                    tabindex="${isActive ? '0' : '-1'}"
                    class="flex items-center gap-2 px-1 py-3 border-b-2 text-sm font-medium transition-colors ${
                        isActive
                            ? 'border-cg-red text-cg-red'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }"
                    onclick="TalentManagementPage.switchTab('${id}')"
                >
                    <span class="material-icons text-lg">${icon}</span>
                    <span class="hidden sm:inline">${label}</span>
                </button>
            `;
        },

        /**
         * Render tab content based on active tab
         */
        renderTabContent() {
            switch (activeTab) {
                case 'dashboard':
                    return this.renderDashboard();
                case 'nineBox':
                    return this.renderNineBoxGrid();
                case 'talentPool':
                    return this.renderTalentPool();
                case 'criteria':
                    return this.renderCriteria();
                case 'review':
                    return this.renderCalibrationReview();
                default:
                    return this.renderDashboard();
            }
        },

        /**
         * Switch active tab
         */
        switchTab(tabId) {
            activeTab = tabId;
            const content = document.getElementById('tab-content');
            if (content) {
                content.innerHTML = this.renderTabContent();
                this.initTabContent();
            }
            // Update tab states
            document.querySelectorAll('[role="tab"]').forEach(tab => {
                const isActive = tab.id === `tab-${tabId}`;
                tab.setAttribute('aria-selected', isActive);
                tab.setAttribute('tabindex', isActive ? '0' : '-1');
                tab.className = tab.className.replace(
                    isActive ? 'border-transparent text-gray-500' : 'border-cg-red text-cg-red',
                    isActive ? 'border-cg-red text-cg-red' : 'border-transparent text-gray-500'
                );
            });
            // Announce to screen readers
            AccessibilityUtils.announce(i18n.t('accessibility.pageChanged').replace('{page}', tabId));
        },

        /**
         * Render Dashboard Tab
         */
        renderDashboard() {
            const distribution = MockTalentData.nineBoxDistribution;
            const departments = MockTalentData.talentPoolByDepartment;
            const totalHiPo = departments.reduce((sum, d) => sum + d.hiPo, 0);
            const totalStars = departments.reduce((sum, d) => sum + d.stars, 0);
            const totalAtRisk = departments.reduce((sum, d) => sum + d.atRisk, 0);
            const totalEmployees = departments.reduce((sum, d) => sum + d.total, 0);

            return `
                <div class="space-y-6">
                    <!-- Summary Cards -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-cg-red">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('talent.dashboard.totalHiPo')}</p>
                                    <p class="text-3xl font-bold text-gray-900 mt-1">${totalHiPo}</p>
                                </div>
                                <span class="material-icons text-4xl text-cg-red/20">stars</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-2">${((totalHiPo / totalEmployees) * 100).toFixed(1)}% ${i18n.t('talent.dashboard.ofWorkforce')}</p>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('talent.dashboard.stars')}</p>
                                    <p class="text-3xl font-bold text-gray-900 mt-1">${totalStars}</p>
                                </div>
                                <span class="material-icons text-4xl text-yellow-500/20">star</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-2">${i18n.t('talent.dashboard.topPerformers')}</p>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('talent.dashboard.atRisk')}</p>
                                    <p class="text-3xl font-bold text-gray-900 mt-1">${totalAtRisk}</p>
                                </div>
                                <span class="material-icons text-4xl text-orange-500/20">warning</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-2">${i18n.t('talent.dashboard.retentionRisk')}</p>
                        </div>

                        <div class="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('talent.dashboard.readyNow')}</p>
                                    <p class="text-3xl font-bold text-gray-900 mt-1">${MockTalentData.talentProfiles.filter(t => t.promotionReadiness === 'ready_now').length}</p>
                                </div>
                                <span class="material-icons text-4xl text-blue-500/20">trending_up</span>
                            </div>
                            <p class="text-xs text-gray-400 mt-2">${i18n.t('talent.dashboard.promotionReady')}</p>
                        </div>
                    </div>

                    <!-- 9-Box Mini View and Department Distribution -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Mini 9-Box -->
                        ${CardComponent.render({
                            id: 'mini-nine-box',
                            title: i18n.t('talent.nineBox.title'),
                            icon: 'grid_view',
                            content: this.renderMiniNineBox()
                        })}

                        <!-- Department Distribution -->
                        ${CardComponent.render({
                            id: 'dept-distribution',
                            title: i18n.t('talent.dashboard.byDepartment'),
                            icon: 'business',
                            content: this.renderDepartmentTable()
                        })}
                    </div>

                    <!-- Recent Hi-Po List -->
                    ${CardComponent.render({
                        id: 'hipo-list',
                        title: i18n.t('talent.dashboard.hiPoList'),
                        icon: 'stars',
                        content: this.renderHiPoList()
                    })}
                </div>
            `;
        },

        /**
         * Render mini 9-box grid
         */
        renderMiniNineBox() {
            const boxes = MockTalentData.nineBoxGrid.boxes;
            const distribution = MockTalentData.nineBoxDistribution;

            return `
                <div class="grid grid-cols-3 gap-1 aspect-square max-w-md mx-auto" role="grid" aria-label="${i18n.t('talent.nineBox.gridLabel')}">
                    ${boxes.sort((a, b) => {
                        // Sort by y desc, then x asc to render top-left to bottom-right
                        if (b.position.y !== a.position.y) return b.position.y - a.position.y;
                        return a.position.x - b.position.x;
                    }).map(box => {
                        const count = distribution[box.id]?.count || 0;
                        return `
                            <div
                                class="flex flex-col items-center justify-center rounded-lg p-2 text-white text-center cursor-pointer hover:opacity-90 transition-opacity"
                                style="background-color: ${box.color}"
                                role="gridcell"
                                tabindex="0"
                                aria-label="${i18n.isThai() ? box.labelTh : box.label}: ${count} ${i18n.t('common.items')}"
                                onclick="TalentManagementPage.viewNineBoxDetail('${box.id}')"
                            >
                                <span class="text-lg font-bold">${count}</span>
                                <span class="text-xs opacity-90 line-clamp-2">${i18n.isThai() ? box.labelTh : box.label}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="flex justify-between mt-4 text-xs text-gray-500">
                    <span class="flex items-center gap-1">
                        <span class="material-icons text-sm">arrow_forward</span>
                        ${i18n.t('talent.nineBox.performance')}
                    </span>
                    <span class="flex items-center gap-1">
                        ${i18n.t('talent.nineBox.potential')}
                        <span class="material-icons text-sm">arrow_upward</span>
                    </span>
                </div>
            `;
        },

        /**
         * Render department distribution table
         */
        renderDepartmentTable() {
            const departments = MockTalentData.talentPoolByDepartment;
            return `
                <div class="overflow-x-auto">
                    <table class="w-full text-sm" role="table">
                        <thead>
                            <tr class="text-left text-gray-500 border-b">
                                <th class="py-2 font-medium">${i18n.t('talent.dashboard.department')}</th>
                                <th class="py-2 font-medium text-center">${i18n.t('talent.dashboard.total')}</th>
                                <th class="py-2 font-medium text-center">${i18n.t('talent.dashboard.hiPo')}</th>
                                <th class="py-2 font-medium text-center">${i18n.t('talent.dashboard.stars')}</th>
                                <th class="py-2 font-medium text-center">${i18n.t('talent.dashboard.atRisk')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${departments.map(dept => `
                                <tr class="border-b border-gray-100 hover:bg-gray-50">
                                    <td class="py-3">${i18n.isThai() ? dept.departmentTh : dept.department}</td>
                                    <td class="py-3 text-center">${dept.total}</td>
                                    <td class="py-3 text-center">
                                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cg-red/10 text-cg-red font-medium">${dept.hiPo}</span>
                                    </td>
                                    <td class="py-3 text-center">
                                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 font-medium">${dept.stars}</span>
                                    </td>
                                    <td class="py-3 text-center">
                                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full ${dept.atRisk > 3 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'} font-medium">${dept.atRisk}</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        },

        /**
         * Render Hi-Po list
         */
        renderHiPoList() {
            const hiPos = MockTalentData.talentProfiles.filter(t => t.isHiPo);

            if (hiPos.length === 0) {
                return CardComponent.emptyState(i18n.t('talent.noHiPo'));
            }

            return `
                <div class="divide-y divide-gray-100">
                    ${hiPos.map(emp => `
                        <div class="py-4 flex items-center justify-between hover:bg-gray-50 px-2 -mx-2 rounded cursor-pointer"
                             onclick="TalentManagementPage.viewTalentProfile('${emp.employeeId}')"
                             role="button"
                             tabindex="0"
                             aria-label="${i18n.t('talent.viewProfile')}: ${i18n.isThai() ? emp.employeeNameTh : emp.employeeName}">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-cg-red/10 flex items-center justify-center">
                                    <span class="text-cg-red font-medium text-lg">${emp.employeeName.charAt(0)}</span>
                                </div>
                                <div>
                                    <p class="font-medium text-gray-900">${i18n.isThai() ? emp.employeeNameTh : emp.employeeName}</p>
                                    <p class="text-sm text-gray-500">${i18n.isThai() ? emp.positionTh : emp.position}</p>
                                    <div class="flex items-center gap-2 mt-1">
                                        <span class="text-xs px-2 py-0.5 rounded-full bg-cg-red/10 text-cg-red">${i18n.t('talent.hiPo')}</span>
                                        ${emp.nineBoxPosition === 'high-high' ? `
                                            <span class="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                                                <span class="material-icons text-xs align-middle">star</span>
                                                ${i18n.t('talent.star')}
                                            </span>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="flex items-center gap-2">
                                    <span class="text-xs text-gray-500">${i18n.t('talent.performance')}</span>
                                    <span class="font-medium">${emp.performanceRating.toFixed(1)}</span>
                                </div>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="text-xs text-gray-500">${i18n.t('talent.potential')}</span>
                                    <span class="font-medium">${emp.potentialRating.toFixed(1)}</span>
                                </div>
                                ${this.renderRiskBadge(emp.riskOfLoss)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        /**
         * Render Nine-Box Grid Tab
         */
        renderNineBoxGrid() {
            const boxes = MockTalentData.nineBoxGrid.boxes;
            const distribution = MockTalentData.nineBoxDistribution;
            const employees = MockTalentData.talentProfiles;

            return `
                <div class="space-y-6">
                    <!-- Instructions -->
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div class="flex items-start gap-3">
                            <span class="material-icons text-blue-600">info</span>
                            <div>
                                <p class="text-sm text-blue-800 font-medium">${i18n.t('talent.nineBox.dragDropInstructions')}</p>
                                <p class="text-xs text-blue-600 mt-1">${i18n.t('talent.nineBox.dragDropHint')}</p>
                            </div>
                        </div>
                    </div>

                    <!-- 9-Box Grid -->
                    <div class="bg-white rounded-xl shadow-sm p-6">
                        <div class="flex items-center gap-4 mb-6">
                            <h3 class="text-lg font-medium text-gray-900">${i18n.t('talent.nineBox.title')}</h3>
                            <div class="flex-grow"></div>
                            ${FormFieldComponent.select({
                                name: 'nineBoxDepartment',
                                label: '',
                                value: filterDepartment,
                                placeholder: i18n.t('talent.allDepartments'),
                                options: [
                                    { value: 'all', label: i18n.t('talent.allDepartments') },
                                    ...MockTalentData.talentPoolByDepartment.map(d => ({
                                        value: d.department,
                                        label: i18n.isThai() ? d.departmentTh : d.department
                                    }))
                                ],
                                onChange: 'TalentManagementPage.filterByDepartment(this.value)'
                            })}
                        </div>

                        <!-- Y-Axis Label -->
                        <div class="flex">
                            <div class="w-8 flex items-center justify-center">
                                <span class="transform -rotate-90 text-sm font-medium text-gray-600 whitespace-nowrap">${i18n.t('talent.potential')}</span>
                            </div>

                            <!-- Grid -->
                            <div class="flex-grow">
                                <!-- Y-Axis Markers -->
                                <div class="flex">
                                    <div class="w-16"></div>
                                    <div class="flex-grow grid grid-cols-3 gap-2">
                                        ${boxes.sort((a, b) => {
                                            if (b.position.y !== a.position.y) return b.position.y - a.position.y;
                                            return a.position.x - b.position.x;
                                        }).map(box => {
                                            const boxEmployees = employees.filter(e =>
                                                e.nineBoxPosition === box.id &&
                                                (filterDepartment === 'all' || e.department === filterDepartment)
                                            );
                                            return `
                                                <div
                                                    class="min-h-32 rounded-lg p-3 relative transition-all ${boxEmployees.length > 0 ? 'ring-2 ring-offset-2 ring-opacity-50' : ''}"
                                                    style="background-color: ${box.color}20; border: 2px solid ${box.color}"
                                                    role="region"
                                                    aria-label="${i18n.isThai() ? box.labelTh : box.label}"
                                                    data-box-id="${box.id}"
                                                    ondragover="TalentManagementPage.handleDragOver(event)"
                                                    ondrop="TalentManagementPage.handleDrop(event, '${box.id}')"
                                                >
                                                    <div class="flex items-center justify-between mb-2">
                                                        <span class="text-xs font-medium" style="color: ${box.color}">${i18n.isThai() ? box.labelTh : box.label}</span>
                                                        <span class="text-xs px-2 py-0.5 rounded-full bg-white" style="color: ${box.color}">${boxEmployees.length}</span>
                                                    </div>
                                                    <div class="space-y-1 max-h-48 overflow-y-auto">
                                                        ${boxEmployees.slice(0, 5).map(emp => `
                                                            <div
                                                                class="bg-white rounded px-2 py-1 text-xs shadow-sm cursor-move flex items-center gap-2 hover:shadow-md transition-shadow"
                                                                draggable="true"
                                                                data-employee-id="${emp.employeeId}"
                                                                ondragstart="TalentManagementPage.handleDragStart(event, '${emp.employeeId}')"
                                                                ondragend="TalentManagementPage.handleDragEnd(event)"
                                                                onclick="TalentManagementPage.viewTalentProfile('${emp.employeeId}')"
                                                                tabindex="0"
                                                                role="button"
                                                                aria-label="${emp.employeeName}"
                                                            >
                                                                <span class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">${emp.employeeName.charAt(0)}</span>
                                                                <span class="truncate">${i18n.isThai() ? emp.employeeNameTh : emp.employeeName}</span>
                                                                ${emp.riskOfLoss === 'high' ? '<span class="material-icons text-red-500 text-xs">warning</span>' : ''}
                                                            </div>
                                                        `).join('')}
                                                        ${boxEmployees.length > 5 ? `
                                                            <button class="w-full text-center text-xs py-1 text-gray-500 hover:text-gray-700" onclick="TalentManagementPage.viewNineBoxDetail('${box.id}')">
                                                                +${boxEmployees.length - 5} ${i18n.t('common.showMore')}
                                                            </button>
                                                        ` : ''}
                                                    </div>
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>
                                </div>

                                <!-- X-Axis Label -->
                                <div class="flex mt-4">
                                    <div class="w-16"></div>
                                    <div class="flex-grow text-center">
                                        <span class="text-sm font-medium text-gray-600">${i18n.t('talent.performance')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Legend -->
                    ${CardComponent.render({
                        id: 'nine-box-legend',
                        title: i18n.t('talent.nineBox.legend'),
                        icon: 'help_outline',
                        content: this.renderNineBoxLegend()
                    })}
                </div>
            `;
        },

        /**
         * Render 9-box legend
         */
        renderNineBoxLegend() {
            const boxes = MockTalentData.nineBoxGrid.boxes;
            return `
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${boxes.map(box => `
                        <div class="flex items-start gap-3">
                            <div class="w-4 h-4 rounded flex-shrink-0 mt-0.5" style="background-color: ${box.color}"></div>
                            <div>
                                <p class="font-medium text-sm text-gray-900">${i18n.isThai() ? box.labelTh : box.label}</p>
                                <p class="text-xs text-gray-500 mt-0.5">${box.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        /**
         * Render Talent Pool Tab
         */
        renderTalentPool() {
            const employees = this.getFilteredEmployees();

            return `
                <div class="space-y-6">
                    <!-- Filters -->
                    <div class="bg-white rounded-xl shadow-sm p-4">
                        <div class="flex flex-wrap gap-4 items-end">
                            <div class="flex-grow min-w-64">
                                ${FormFieldComponent.text({
                                    name: 'searchTalent',
                                    label: i18n.t('common.search'),
                                    placeholder: i18n.t('talent.searchPlaceholder'),
                                    value: searchQuery,
                                    icon: 'search',
                                    onChange: 'TalentManagementPage.handleSearch(this.value)'
                                })}
                            </div>
                            <div class="w-48">
                                ${FormFieldComponent.select({
                                    name: 'filterDept',
                                    label: i18n.t('talent.dashboard.department'),
                                    value: filterDepartment,
                                    options: [
                                        { value: 'all', label: i18n.t('talent.allDepartments') },
                                        ...MockTalentData.talentPoolByDepartment.map(d => ({
                                            value: d.department,
                                            label: i18n.isThai() ? d.departmentTh : d.department
                                        }))
                                    ],
                                    onChange: 'TalentManagementPage.filterByDepartment(this.value)'
                                })}
                            </div>
                            <div class="w-48">
                                ${FormFieldComponent.select({
                                    name: 'filterRisk',
                                    label: i18n.t('talent.riskOfLoss'),
                                    value: filterRisk,
                                    options: [
                                        { value: 'all', label: i18n.t('common.all') },
                                        ...MockTalentData.riskOfLossOptions.map(r => ({
                                            value: r.value,
                                            label: i18n.isThai() ? r.labelTh : r.labelEn
                                        }))
                                    ],
                                    onChange: 'TalentManagementPage.filterByRisk(this.value)'
                                })}
                            </div>
                            <button
                                class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                onclick="TalentManagementPage.clearFilters()"
                            >
                                ${i18n.t('common.none')}
                            </button>
                        </div>
                    </div>

                    <!-- Results -->
                    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 class="font-medium text-gray-900">${i18n.t('talent.talentPool.results')} (${employees.length})</h3>
                            <div class="flex items-center gap-2 text-sm text-gray-500">
                                <span class="material-icons text-lg">filter_list</span>
                                ${i18n.t('talent.talentPool.sortBy')}
                            </div>
                        </div>

                        ${employees.length === 0 ? `
                            <div class="p-8 text-center text-gray-500">
                                <span class="material-icons text-4xl text-gray-300">search_off</span>
                                <p class="mt-2">${i18n.t('common.noResults')}</p>
                            </div>
                        ` : `
                            <div class="divide-y divide-gray-100">
                                ${employees.map(emp => this.renderTalentCard(emp)).join('')}
                            </div>
                        `}
                    </div>
                </div>
            `;
        },

        /**
         * Render talent card
         */
        renderTalentCard(emp) {
            const nineBox = MockTalentData.nineBoxGrid.boxes.find(b => b.id === emp.nineBoxPosition);
            const readiness = MockTalentData.promotionReadinessOptions.find(r => r.value === emp.promotionReadiness);

            return `
                <div class="p-4 hover:bg-gray-50 cursor-pointer" onclick="TalentManagementPage.viewTalentProfile('${emp.employeeId}')">
                    <div class="flex items-start gap-4">
                        <div class="w-14 h-14 rounded-full bg-cg-red/10 flex items-center justify-center flex-shrink-0">
                            <span class="text-cg-red font-medium text-xl">${emp.employeeName.charAt(0)}</span>
                        </div>
                        <div class="flex-grow min-w-0">
                            <div class="flex items-start justify-between gap-4">
                                <div>
                                    <h4 class="font-medium text-gray-900">${i18n.isThai() ? emp.employeeNameTh : emp.employeeName}</h4>
                                    <p class="text-sm text-gray-500">${i18n.isThai() ? emp.positionTh : emp.position}</p>
                                    <p class="text-xs text-gray-400">${i18n.isThai() ? emp.departmentTh : emp.department}</p>
                                </div>
                                <div class="flex flex-col items-end gap-1">
                                    ${emp.isHiPo ? `<span class="text-xs px-2 py-1 rounded-full bg-cg-red/10 text-cg-red font-medium">${i18n.t('talent.hiPo')}</span>` : ''}
                                    ${nineBox ? `<span class="text-xs px-2 py-1 rounded-full text-white" style="background-color: ${nineBox.color}">${i18n.isThai() ? nineBox.labelTh : nineBox.label}</span>` : ''}
                                </div>
                            </div>

                            <div class="mt-3 flex flex-wrap items-center gap-4 text-sm">
                                <div class="flex items-center gap-1">
                                    <span class="text-gray-500">${i18n.t('talent.performance')}:</span>
                                    <span class="font-medium">${emp.performanceRating.toFixed(1)}</span>
                                    ${this.renderRatingStars(emp.performanceRating)}
                                </div>
                                <div class="flex items-center gap-1">
                                    <span class="text-gray-500">${i18n.t('talent.potential')}:</span>
                                    <span class="font-medium">${emp.potentialRating.toFixed(1)}</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <span class="text-gray-500">${i18n.t('talent.yearsOfService')}:</span>
                                    <span class="font-medium">${emp.yearsOfService.toFixed(1)} ${i18n.t('employment.years')}</span>
                                </div>
                                ${readiness ? `
                                    <div class="flex items-center gap-1">
                                        <span class="material-icons text-sm text-blue-500">trending_up</span>
                                        <span class="text-xs text-blue-600">${i18n.isThai() ? readiness.labelTh : readiness.labelEn}</span>
                                    </div>
                                ` : ''}
                                ${this.renderRiskBadge(emp.riskOfLoss)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render Criteria Configuration Tab
         */
        renderCriteria() {
            const criteria = MockTalentData.talentCriteria;

            return `
                <div class="space-y-6">
                    <!-- Performance Thresholds -->
                    ${CardComponent.render({
                        id: 'perf-thresholds',
                        title: i18n.t('talent.criteria.performanceThresholds'),
                        icon: 'analytics',
                        editable: RBAC.hasPermission('edit_talent_criteria'),
                        onEdit: 'TalentManagementPage.editPerformanceThresholds()',
                        content: `
                            <div class="space-y-3">
                                ${Object.entries(criteria.performanceThresholds).map(([key, val]) => `
                                    <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                        <span class="font-medium">${i18n.isThai() ? val.labelTh : val.label}</span>
                                        <span class="text-gray-600">${val.min.toFixed(1)} - ${val.max.toFixed(1)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        `
                    })}

                    <!-- Potential Thresholds -->
                    ${CardComponent.render({
                        id: 'potential-thresholds',
                        title: i18n.t('talent.criteria.potentialThresholds'),
                        icon: 'trending_up',
                        editable: RBAC.hasPermission('edit_talent_criteria'),
                        onEdit: 'TalentManagementPage.editPotentialThresholds()',
                        content: `
                            <div class="space-y-3">
                                ${Object.entries(criteria.potentialThresholds).map(([key, val]) => `
                                    <div class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                        <span class="font-medium">${i18n.isThai() ? val.labelTh : val.label}</span>
                                        <span class="text-gray-600">${val.min.toFixed(1)} - ${val.max.toFixed(1)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        `
                    })}

                    <!-- Hi-Po Requirements -->
                    ${CardComponent.render({
                        id: 'hipo-requirements',
                        title: i18n.t('talent.criteria.hiPoRequirements'),
                        icon: 'stars',
                        editable: RBAC.hasPermission('edit_talent_criteria'),
                        onEdit: 'TalentManagementPage.editHiPoRequirements()',
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('talent.criteria.minPerformance')}</p>
                                    <p class="text-2xl font-bold text-gray-900">${criteria.hiPoRequirements.minPerformance.toFixed(1)}</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('talent.criteria.minPotential')}</p>
                                    <p class="text-2xl font-bold text-gray-900">${criteria.hiPoRequirements.minPotential.toFixed(1)}</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('talent.criteria.minYearsOfService')}</p>
                                    <p class="text-2xl font-bold text-gray-900">${criteria.hiPoRequirements.minYearsInService} ${i18n.t('employment.years')}</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('talent.criteria.maxAge')}</p>
                                    <p class="text-2xl font-bold text-gray-900">${criteria.hiPoRequirements.maxAge}</p>
                                </div>
                            </div>
                            <p class="text-xs text-gray-400 mt-4">
                                ${i18n.t('common.updated')}: ${DateUtils.format(criteria.lastUpdatedAt, 'medium')} ${i18n.t('common.by')} ${criteria.lastUpdatedBy}
                            </p>
                        `
                    })}

                    <!-- Minimum Years in Service -->
                    ${CardComponent.render({
                        id: 'min-years',
                        title: i18n.t('talent.criteria.minimumYears'),
                        icon: 'schedule',
                        content: `
                            <div class="flex items-center gap-4">
                                <span class="text-4xl font-bold text-cg-red">${criteria.minimumYearsInService}</span>
                                <span class="text-gray-600">${i18n.t('talent.criteria.yearsToBeEligible')}</span>
                            </div>
                        `
                    })}
                </div>
            `;
        },

        /**
         * Render Calibration Review Tab
         */
        renderCalibrationReview() {
            const sessions = MockTalentData.calibrationSessions;

            return `
                <div class="space-y-6">
                    <!-- Action Buttons -->
                    <div class="flex justify-end">
                        <button
                            class="px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                            onclick="TalentManagementPage.startNewSession()"
                        >
                            <span class="material-icons">add</span>
                            ${i18n.t('talent.review.newSession')}
                        </button>
                    </div>

                    <!-- Session List -->
                    ${sessions.map(session => CardComponent.render({
                        id: `session-${session.id}`,
                        title: i18n.isThai() ? session.nameTh : session.name,
                        icon: 'rate_review',
                        badge: session.status === 'completed' ? i18n.t('common.completed') : i18n.t('common.inProgress'),
                        badgeColor: session.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800',
                        content: `
                            <div class="space-y-4">
                                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p class="text-gray-500">${i18n.t('talent.review.date')}</p>
                                        <p class="font-medium">${DateUtils.format(session.date, 'medium')}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500">${i18n.t('talent.review.facilitator')}</p>
                                        <p class="font-medium">${session.facilitator}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500">${i18n.t('talent.review.employeesReviewed')}</p>
                                        <p class="font-medium">${session.employeesReviewed}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-500">${i18n.t('talent.review.participants')}</p>
                                        <p class="font-medium">${session.participants.length}</p>
                                    </div>
                                </div>

                                ${session.notes ? `
                                    <div class="bg-gray-50 rounded-lg p-3">
                                        <p class="text-sm text-gray-600">${session.notes}</p>
                                    </div>
                                ` : ''}

                                ${session.actionItems.length > 0 ? `
                                    <div>
                                        <h4 class="font-medium text-gray-700 mb-2">${i18n.t('talent.review.actionItems')}</h4>
                                        <div class="space-y-2">
                                            ${session.actionItems.map(item => `
                                                <div class="flex items-start gap-3 text-sm">
                                                    <span class="material-icons text-sm mt-0.5 ${
                                                        item.status === 'completed' ? 'text-green-500' :
                                                        item.status === 'in_progress' ? 'text-blue-500' : 'text-gray-400'
                                                    }">
                                                        ${item.status === 'completed' ? 'check_circle' : item.status === 'in_progress' ? 'pending' : 'radio_button_unchecked'}
                                                    </span>
                                                    <div class="flex-grow">
                                                        <p class="text-gray-800">${item.item}</p>
                                                        <p class="text-xs text-gray-500">${item.assignee} - ${i18n.t('common.dueDate')}: ${DateUtils.format(item.dueDate, 'medium')}</p>
                                                    </div>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}

                                <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                    <button class="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800" onclick="TalentManagementPage.viewSessionDetails('${session.id}')">
                                        ${i18n.t('common.viewMore')}
                                    </button>
                                    ${session.status !== 'completed' ? `
                                        <button class="px-3 py-1.5 text-sm text-cg-red hover:text-red-700" onclick="TalentManagementPage.continueSession('${session.id}')">
                                            ${i18n.t('common.continue')}
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        `
                    })).join('')}
                </div>
            `;
        },

        /**
         * View talent profile modal
         */
        viewTalentProfile(employeeId) {
            const emp = MockTalentData.talentProfiles.find(t => t.employeeId === employeeId);
            if (!emp) return;

            const nineBox = MockTalentData.nineBoxGrid.boxes.find(b => b.id === emp.nineBoxPosition);
            const readiness = MockTalentData.promotionReadinessOptions.find(r => r.value === emp.promotionReadiness);
            const risk = MockTalentData.riskOfLossOptions.find(r => r.value === emp.riskOfLoss);

            ModalComponent.open({
                title: i18n.t('talent.profile.title'),
                size: 'lg',
                content: `
                    <div class="space-y-6">
                        <!-- Header -->
                        <div class="flex items-start gap-4 pb-4 border-b border-gray-200">
                            <div class="w-20 h-20 rounded-full bg-cg-red/10 flex items-center justify-center flex-shrink-0">
                                <span class="text-cg-red font-bold text-2xl">${emp.employeeName.charAt(0)}</span>
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-xl font-bold text-gray-900">${i18n.isThai() ? emp.employeeNameTh : emp.employeeName}</h3>
                                <p class="text-gray-600">${i18n.isThai() ? emp.positionTh : emp.position}</p>
                                <p class="text-sm text-gray-500">${i18n.isThai() ? emp.departmentTh : emp.department} | ${emp.company}</p>
                                <div class="flex flex-wrap gap-2 mt-2">
                                    ${emp.isHiPo ? `<span class="px-2 py-1 text-xs font-medium rounded-full bg-cg-red/10 text-cg-red">${i18n.t('talent.hiPo')}</span>` : ''}
                                    ${nineBox ? `<span class="px-2 py-1 text-xs font-medium rounded-full text-white" style="background-color: ${nineBox.color}">${i18n.isThai() ? nineBox.labelTh : nineBox.label}</span>` : ''}
                                    ${readiness ? `<span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">${i18n.isThai() ? readiness.labelTh : readiness.labelEn}</span>` : ''}
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-gray-500">${i18n.t('talent.yearsOfService')}</p>
                                <p class="text-2xl font-bold text-gray-900">${emp.yearsOfService.toFixed(1)} ${i18n.t('employment.years')}</p>
                            </div>
                        </div>

                        <!-- Ratings -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-gray-50 rounded-lg p-4 text-center">
                                <p class="text-sm text-gray-500">${i18n.t('talent.performance')}</p>
                                <p class="text-3xl font-bold text-gray-900">${emp.performanceRating.toFixed(1)}</p>
                                <div class="mt-1">${this.renderRatingStars(emp.performanceRating)}</div>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-4 text-center">
                                <p class="text-sm text-gray-500">${i18n.t('talent.potential')}</p>
                                <p class="text-3xl font-bold text-gray-900">${emp.potentialRating.toFixed(1)}</p>
                                <div class="mt-1">${this.renderRatingStars(emp.potentialRating)}</div>
                            </div>
                        </div>

                        <!-- Risk of Loss -->
                        ${risk ? `
                            <div class="p-4 rounded-lg border-2" style="border-color: ${risk.color}; background-color: ${risk.color}10">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <span class="material-icons" style="color: ${risk.color}">warning</span>
                                        <span class="font-medium">${i18n.t('talent.riskOfLoss')}: ${i18n.isThai() ? risk.labelTh : risk.labelEn}</span>
                                    </div>
                                    ${emp.riskOfLossReason ? `<span class="text-sm text-gray-600">${emp.riskOfLossReason}</span>` : ''}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Performance History -->
                        <div>
                            <h4 class="font-medium text-gray-700 mb-3">${i18n.t('talent.profile.performanceHistory')}</h4>
                            <div class="flex items-end gap-2 h-24">
                                ${emp.performanceHistory.map(h => {
                                    const height = (h.rating / 5) * 100;
                                    return `
                                        <div class="flex-1 flex flex-col items-center">
                                            <div class="w-full bg-cg-red/80 rounded-t" style="height: ${height}%"></div>
                                            <p class="text-xs text-gray-500 mt-1">${h.year}</p>
                                            <p class="text-xs font-medium">${h.rating.toFixed(1)}</p>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <!-- Competencies -->
                        <div>
                            <h4 class="font-medium text-gray-700 mb-3">${i18n.t('talent.profile.competencies')}</h4>
                            <div class="space-y-2">
                                ${emp.competencies.map(comp => `
                                    <div class="flex items-center gap-3">
                                        <span class="text-sm text-gray-600 w-32 truncate">${i18n.isThai() && comp.nameTh ? comp.nameTh : comp.name}</span>
                                        <div class="flex-grow bg-gray-200 rounded-full h-2">
                                            <div class="bg-cg-red rounded-full h-2" style="width: ${(comp.rating / comp.maxRating) * 100}%"></div>
                                        </div>
                                        <span class="text-sm font-medium w-8">${comp.rating}/${comp.maxRating}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Career Aspirations -->
                        <div>
                            <h4 class="font-medium text-gray-700 mb-3">${i18n.t('talent.profile.careerAspirations')}</h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-blue-50 rounded-lg p-3">
                                    <p class="text-xs text-blue-600 font-medium">${i18n.t('scorecard.shortTerm')}</p>
                                    <p class="text-sm text-gray-800 mt-1">${i18n.isThai() ? emp.careerAspirations.shortTermTh : emp.careerAspirations.shortTerm}</p>
                                </div>
                                <div class="bg-purple-50 rounded-lg p-3">
                                    <p class="text-xs text-purple-600 font-medium">${i18n.t('scorecard.longTerm')}</p>
                                    <p class="text-sm text-gray-800 mt-1">${i18n.isThai() ? emp.careerAspirations.longTermTh : emp.careerAspirations.longTerm}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Development Actions -->
                        <div>
                            <h4 class="font-medium text-gray-700 mb-3">${i18n.t('talent.profile.developmentActions')}</h4>
                            <div class="space-y-2">
                                ${emp.developmentActions.map(action => {
                                    const statusOpt = MockTalentData.developmentActionStatusOptions.find(s => s.value === action.status);
                                    return `
                                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div class="flex items-center gap-2">
                                                <span class="material-icons text-sm ${
                                                    action.status === 'completed' ? 'text-green-500' :
                                                    action.status === 'in_progress' ? 'text-blue-500' : 'text-gray-400'
                                                }">
                                                    ${action.status === 'completed' ? 'check_circle' : action.status === 'in_progress' ? 'pending' : 'schedule'}
                                                </span>
                                                <span class="text-sm">${action.action}</span>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="text-xs px-2 py-0.5 rounded-full ${
                                                    action.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    action.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                }">${statusOpt ? (i18n.isThai() ? statusOpt.labelTh : statusOpt.labelEn) : action.status}</span>
                                                <span class="text-xs text-gray-500">${DateUtils.format(action.dueDate, 'medium')}</span>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>

                        <!-- Calibration Notes -->
                        ${emp.calibrationNotes ? `
                            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div class="flex items-start gap-2">
                                    <span class="material-icons text-yellow-600">note</span>
                                    <div>
                                        <p class="font-medium text-yellow-800">${i18n.t('talent.profile.calibrationNotes')}</p>
                                        <p class="text-sm text-yellow-700 mt-1">${emp.calibrationNotes}</p>
                                        <p class="text-xs text-yellow-600 mt-2">${i18n.t('talent.profile.lastCalibration')}: ${DateUtils.format(emp.lastCalibrationDate, 'medium')}</p>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('talent.profile.editProfile'), primary: true, onclick: `TalentManagementPage.editTalentProfile('${employeeId}')` }
                ]
            });
        },

        /**
         * Render rating stars
         */
        renderRatingStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalf = rating % 1 >= 0.5;
            let stars = '';
            for (let i = 0; i < 5; i++) {
                if (i < fullStars) {
                    stars += '<span class="material-icons text-sm text-yellow-400">star</span>';
                } else if (i === fullStars && hasHalf) {
                    stars += '<span class="material-icons text-sm text-yellow-400">star_half</span>';
                } else {
                    stars += '<span class="material-icons text-sm text-gray-300">star_border</span>';
                }
            }
            return `<span class="inline-flex">${stars}</span>`;
        },

        /**
         * Render risk badge
         */
        renderRiskBadge(riskLevel) {
            if (!riskLevel || riskLevel === 'low') return '';
            const risk = MockTalentData.riskOfLossOptions.find(r => r.value === riskLevel);
            if (!risk) return '';
            return `
                <span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-1" style="background-color: ${risk.color}20; color: ${risk.color}">
                    <span class="material-icons text-xs">warning</span>
                    ${i18n.isThai() ? risk.labelTh : risk.labelEn}
                </span>
            `;
        },

        /**
         * Get filtered employees
         */
        getFilteredEmployees() {
            let employees = MockTalentData.talentProfiles;

            if (filterDepartment !== 'all') {
                employees = employees.filter(e => e.department === filterDepartment);
            }

            if (filterRisk !== 'all') {
                employees = employees.filter(e => e.riskOfLoss === filterRisk);
            }

            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                employees = employees.filter(e =>
                    e.employeeName.toLowerCase().includes(query) ||
                    e.employeeNameTh.includes(query) ||
                    e.position.toLowerCase().includes(query) ||
                    e.positionTh.includes(query)
                );
            }

            return employees;
        },

        /**
         * Filter handlers
         */
        filterByDepartment(value) {
            filterDepartment = value;
            this.refreshContent();
        },

        filterByRisk(value) {
            filterRisk = value;
            this.refreshContent();
        },

        handleSearch(value) {
            searchQuery = value;
            this.refreshContent();
        },

        clearFilters() {
            filterDepartment = 'all';
            filterRisk = 'all';
            searchQuery = '';
            this.refreshContent();
        },

        refreshContent() {
            const content = document.getElementById('tab-content');
            if (content) {
                content.innerHTML = this.renderTabContent();
                this.initTabContent();
            }
        },

        /**
         * Drag and drop handlers
         */
        handleDragStart(event, employeeId) {
            draggedEmployee = employeeId;
            event.dataTransfer.setData('text/plain', employeeId);
            event.target.classList.add('opacity-50');
        },

        handleDragEnd(event) {
            event.target.classList.remove('opacity-50');
            draggedEmployee = null;
        },

        handleDragOver(event) {
            event.preventDefault();
            event.currentTarget.classList.add('ring-2', 'ring-cg-red');
        },

        handleDrop(event, boxId) {
            event.preventDefault();
            event.currentTarget.classList.remove('ring-2', 'ring-cg-red');

            const employeeId = event.dataTransfer.getData('text/plain');
            if (employeeId) {
                this.moveEmployeeToBox(employeeId, boxId);
            }
        },

        moveEmployeeToBox(employeeId, boxId) {
            // In a real app, this would call an API
            const emp = MockTalentData.talentProfiles.find(t => t.employeeId === employeeId);
            if (emp) {
                const oldBox = emp.nineBoxPosition;
                emp.nineBoxPosition = boxId;

                ToastComponent.success(
                    i18n.isThai()
                        ? `ย้าย ${emp.employeeNameTh} ไปยัง ${MockTalentData.nineBoxGrid.boxes.find(b => b.id === boxId)?.labelTh || boxId}`
                        : `Moved ${emp.employeeName} to ${MockTalentData.nineBoxGrid.boxes.find(b => b.id === boxId)?.label || boxId}`
                );

                this.refreshContent();
            }
        },

        viewNineBoxDetail(boxId) {
            filterDepartment = 'all';
            activeTab = 'talentPool';
            // Filter would be applied here in a real implementation
            this.refreshContent();
        },

        /**
         * Session management
         */
        startNewSession() {
            ModalComponent.open({
                title: i18n.t('talent.review.newSession'),
                size: 'md',
                content: `
                    <form id="new-session-form" class="space-y-4">
                        ${FormFieldComponent.text({
                            name: 'sessionName',
                            label: i18n.t('talent.review.sessionName'),
                            required: true,
                            placeholder: i18n.isThai() ? 'เช่น Q1 2025 Talent Review' : 'e.g., Q1 2025 Talent Review'
                        })}
                        ${FormFieldComponent.date({
                            name: 'sessionDate',
                            label: i18n.t('talent.review.date'),
                            required: true,
                            value: DateUtils.today()
                        })}
                        ${FormFieldComponent.text({
                            name: 'facilitator',
                            label: i18n.t('talent.review.facilitator'),
                            required: true
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'TalentManagementPage.saveNewSession()' }
                ]
            });
        },

        saveNewSession() {
            const formData = FormFieldComponent.getFormData('new-session-form');
            if (!formData.sessionName || !formData.sessionDate) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            ToastComponent.success(i18n.t('toast.saveSuccess'));
            ModalComponent.close();
        },

        editTalentProfile(employeeId) {
            ToastComponent.info(i18n.isThai() ? 'ฟังก์ชันนี้กำลังพัฒนา' : 'This feature is coming soon');
        },

        editPerformanceThresholds() {
            ToastComponent.info(i18n.isThai() ? 'ฟังก์ชันนี้กำลังพัฒนา' : 'This feature is coming soon');
        },

        editPotentialThresholds() {
            ToastComponent.info(i18n.isThai() ? 'ฟังก์ชันนี้กำลังพัฒนา' : 'This feature is coming soon');
        },

        editHiPoRequirements() {
            ToastComponent.info(i18n.isThai() ? 'ฟังก์ชันนี้กำลังพัฒนา' : 'This feature is coming soon');
        },

        viewSessionDetails(sessionId) {
            ToastComponent.info(i18n.isThai() ? 'ฟังก์ชันนี้กำลังพัฒนา' : 'This feature is coming soon');
        },

        continueSession(sessionId) {
            ToastComponent.info(i18n.isThai() ? 'ฟังก์ชันนี้กำลังพัฒนา' : 'This feature is coming soon');
        },

        /**
         * Initialize page
         */
        init() {
            activeTab = 'dashboard';
            filterDepartment = 'all';
            filterRisk = 'all';
            searchQuery = '';
            this.initTabContent();
        },

        initTabContent() {
            // Initialize any interactive elements based on active tab
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TalentManagementPage;
}
