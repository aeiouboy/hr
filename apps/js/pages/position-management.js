/**
 * Position Management Page
 * Epic 1.2 - Position List and Position Details
 */

const PositionManagementPage = (function() {
    // State
    let currentView = 'list'; // 'list' or 'detail'
    let currentPositionId = null;
    let filters = {
        company: '',
        department: '',
        jobGrade: '',
        status: '',
        search: ''
    };
    let currentPage = 1;
    let pageSize = 10;

    /**
     * Render the page
     * @param {object} params - Route parameters
     * @returns {string}
     */
    function render(params) {
        // Check if viewing a specific position
        if (params && params.id) {
            currentView = 'detail';
            currentPositionId = params.id;
            return renderPositionDetail(params.id);
        }

        currentView = 'list';
        currentPositionId = null;
        return renderPositionList();
    }

    /**
     * Render position list view
     * @returns {string}
     */
    function renderPositionList() {
        const positions = getFilteredPositions();
        const totalPositions = positions.length;
        const paginatedPositions = paginateData(positions);

        return `
            <div class="max-w-7xl mx-auto px-4 py-6">
                <!-- Page Header -->
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-gray-900">${i18n.t('position.title')}</h1>
                    <p class="text-gray-600 mt-1">${i18n.t('position.subtitle')}</p>
                </div>

                <!-- Filters Section -->
                ${renderFilters()}

                <!-- Results Summary -->
                <div class="flex items-center justify-between mb-4">
                    <p class="text-sm text-gray-600">
                        ${i18n.t('position.showingResults').replace('{count}', totalPositions)}
                    </p>
                    <div class="flex items-center gap-2">
                        <label for="page-size" class="text-sm text-gray-600">${i18n.t('position.pageSize')}:</label>
                        <select id="page-size"
                                class="border border-gray-300 rounded-md px-2 py-1 text-sm"
                                onchange="PositionManagementPage.changePageSize(this.value)">
                            <option value="10" ${pageSize === 10 ? 'selected' : ''}>10</option>
                            <option value="25" ${pageSize === 25 ? 'selected' : ''}>25</option>
                            <option value="50" ${pageSize === 50 ? 'selected' : ''}>50</option>
                        </select>
                    </div>
                </div>

                <!-- Positions Table -->
                ${renderPositionsTable(paginatedPositions, totalPositions)}
            </div>
        `;
    }

    /**
     * Render filters section
     * @returns {string}
     */
    function renderFilters() {
        const isThai = i18n.getLanguage() === 'th';

        // Build company options
        const companyOptions = MockPositionData.companies.map(c =>
            `<option value="${c.code}" ${filters.company === c.code ? 'selected' : ''}>${isThai ? c.nameTh : c.nameEn} (${c.code})</option>`
        ).join('');

        // Build department options
        const departmentOptions = MockPositionData.departments.map(d =>
            `<option value="${d.code}" ${filters.department === d.code ? 'selected' : ''}>${isThai ? d.nameTh : d.nameEn}</option>`
        ).join('');

        // Build job grade options
        const jobGradeOptions = MockPositionData.jobGrades.map(g =>
            `<option value="${g.code}" ${filters.jobGrade === g.code ? 'selected' : ''}>${g.code} - ${isThai ? g.nameTh : g.nameEn}</option>`
        ).join('');

        // Build status options
        const statusOptions = MockPositionData.positionStatuses.map(s =>
            `<option value="${s.code}" ${filters.status === s.code ? 'selected' : ''}>${isThai ? s.nameTh : s.nameEn}</option>`
        ).join('');

        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <!-- Search -->
                    <div class="lg:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('common.search')}</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <span class="material-icons text-sm">search</span>
                            </span>
                            <input type="text"
                                   id="position-search"
                                   class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-cg-red focus:border-cg-red"
                                   placeholder="${i18n.t('position.searchPlaceholder')}"
                                   value="${filters.search}"
                                   onkeyup="PositionManagementPage.debounceSearch(this.value)">
                        </div>
                    </div>

                    <!-- Company Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('position.company')}</label>
                        <select id="filter-company"
                                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-cg-red focus:border-cg-red"
                                onchange="PositionManagementPage.updateFilter('company', this.value)">
                            <option value="">${i18n.t('common.all')}</option>
                            ${companyOptions}
                        </select>
                    </div>

                    <!-- Department Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('position.department')}</label>
                        <select id="filter-department"
                                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-cg-red focus:border-cg-red"
                                onchange="PositionManagementPage.updateFilter('department', this.value)">
                            <option value="">${i18n.t('common.all')}</option>
                            ${departmentOptions}
                        </select>
                    </div>

                    <!-- Status Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('position.status')}</label>
                        <select id="filter-status"
                                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-cg-red focus:border-cg-red"
                                onchange="PositionManagementPage.updateFilter('status', this.value)">
                            <option value="">${i18n.t('common.all')}</option>
                            ${statusOptions}
                        </select>
                    </div>
                </div>

                <!-- Clear Filters -->
                <div class="mt-4 flex justify-end">
                    <button type="button"
                            class="text-sm text-cg-red hover:text-red-700 flex items-center gap-1"
                            onclick="PositionManagementPage.clearFilters()">
                        <span class="material-icons text-sm">clear</span>
                        ${i18n.t('position.clearFilters')}
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render positions table
     * @param {array} positions
     * @param {number} totalCount
     * @returns {string}
     */
    function renderPositionsTable(positions, totalCount) {
        const isThai = i18n.getLanguage() === 'th';
        const isHRAdmin = RBAC.hasRole('hr_admin');

        if (positions.length === 0) {
            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <span class="material-icons text-5xl text-gray-300 mb-4">work_outline</span>
                    <p class="text-gray-500">${i18n.t('position.noPositionsFound')}</p>
                </div>
            `;
        }

        const tableRows = positions.map(position => {
            const department = MockPositionData.getDepartment(position.departmentCode);
            const jobGrade = MockPositionData.getJobGrade(position.jobGradeCode);
            const costCenter = MockPositionData.getCostCenter(position.costCenterCode);
            const statusConfig = MockPositionData.getPositionStatus(position.status);
            const hasIncumbent = position.incumbents && position.incumbents.length > 0;

            const title = isThai ? position.titleTh : position.titleEn;
            const departmentName = department ? (isThai ? department.nameTh : department.nameEn) : '-';
            const gradeName = jobGrade ? `${jobGrade.code}` : '-';
            const costCenterName = costCenter ? costCenter.code : '-';
            const statusName = statusConfig ? (isThai ? statusConfig.nameTh : statusConfig.nameEn) : position.status;
            const statusColor = statusConfig ? statusConfig.color : 'gray';

            return `
                <tr class="hover:bg-gray-50 cursor-pointer transition" onclick="PositionManagementPage.viewPosition('${position.id}')">
                    <td class="px-4 py-3 text-sm font-medium text-gray-900">${position.positionCode}</td>
                    <td class="px-4 py-3">
                        <div class="text-sm font-medium text-gray-900">${title}</div>
                        ${!isThai && position.titleTh ? `<div class="text-xs text-gray-500">${position.titleTh}</div>` : ''}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-600">${departmentName}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">${gradeName}</td>
                    <td class="px-4 py-3 text-sm text-gray-600">${costCenterName}</td>
                    <td class="px-4 py-3">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusColor}-100 text-${statusColor}-800">
                            ${statusName}
                        </span>
                    </td>
                    <td class="px-4 py-3">
                        ${hasIncumbent ? `
                            <div class="flex items-center gap-2">
                                <img src="${position.incumbents[0].photo}"
                                     alt="${position.incumbents[0].nameEn}"
                                     class="w-6 h-6 rounded-full"
                                     onerror="this.src='https://via.placeholder.com/32'">
                                <span class="text-sm text-gray-900">${isThai ? position.incumbents[0].nameTh : position.incumbents[0].nameEn}</span>
                            </div>
                        ` : `
                            <span class="text-sm text-gray-400 italic">${i18n.t('position.noIncumbent')}</span>
                        `}
                    </td>
                    <td class="px-4 py-3 text-right">
                        <div class="flex items-center justify-end gap-1">
                            <button type="button"
                                    class="p-1.5 hover:bg-gray-100 rounded transition"
                                    onclick="event.stopPropagation(); PositionManagementPage.viewPosition('${position.id}')"
                                    title="${i18n.t('position.viewDetails')}">
                                <span class="material-icons text-sm text-gray-500">visibility</span>
                            </button>
                            ${isHRAdmin ? `
                                <button type="button"
                                        class="p-1.5 hover:bg-gray-100 rounded transition"
                                        onclick="event.stopPropagation(); PositionManagementPage.editPosition('${position.id}')"
                                        title="${i18n.t('position.editPosition')}">
                                    <span class="material-icons text-sm text-gray-500">edit</span>
                                </button>
                            ` : ''}
                            <button type="button"
                                    class="p-1.5 hover:bg-gray-100 rounded transition"
                                    onclick="event.stopPropagation(); PositionManagementPage.printPosition('${position.id}')"
                                    title="${i18n.t('position.printCard')}">
                                <span class="material-icons text-sm text-gray-500">print</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        const totalPages = Math.ceil(totalCount / pageSize);

        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('position.positionCode')}</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('position.positionTitle')}</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('position.department')}</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('position.jobGrade')}</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('position.costCenter')}</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('position.status')}</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('position.incumbent')}</th>
                                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${tableRows}
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                ${totalPages > 1 ? renderPagination(totalCount, totalPages) : ''}
            </div>
        `;
    }

    /**
     * Render pagination controls
     * @param {number} totalCount
     * @param {number} totalPages
     * @returns {string}
     */
    function renderPagination(totalCount, totalPages) {
        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalCount);

        return `
            <div class="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                <div class="text-sm text-gray-500">
                    ${i18n.t('position.showing')} ${start} - ${end} ${i18n.t('common.of')} ${totalCount}
                </div>
                <div class="flex items-center gap-2">
                    <button type="button"
                            class="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            ${currentPage === 1 ? 'disabled' : ''}
                            onclick="PositionManagementPage.goToPage(${currentPage - 1})">
                        <span class="material-icons text-sm">chevron_left</span>
                    </button>
                    <span class="text-sm text-gray-600">${currentPage} / ${totalPages}</span>
                    <button type="button"
                            class="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            ${currentPage === totalPages ? 'disabled' : ''}
                            onclick="PositionManagementPage.goToPage(${currentPage + 1})">
                        <span class="material-icons text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render position detail view
     * @param {string} positionId
     * @returns {string}
     */
    function renderPositionDetail(positionId) {
        const position = MockPositionData.getPositionById(positionId);

        if (!position) {
            return `
                <div class="max-w-7xl mx-auto px-4 py-6">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <span class="material-icons text-5xl text-gray-300 mb-4">error_outline</span>
                        <p class="text-gray-500">${i18n.t('position.positionNotFound')}</p>
                        <button type="button"
                                class="mt-4 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition"
                                onclick="PositionManagementPage.backToList()">
                            ${i18n.t('position.backToList')}
                        </button>
                    </div>
                </div>
            `;
        }

        const isThai = i18n.getLanguage() === 'th';
        const isHRAdmin = RBAC.hasRole('hr_admin');

        return `
            <div class="max-w-7xl mx-auto px-4 py-6">
                <!-- Back Button and Actions -->
                <div class="flex items-center justify-between mb-6">
                    <button type="button"
                            class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                            onclick="PositionManagementPage.backToList()">
                        <span class="material-icons">arrow_back</span>
                        ${i18n.t('position.backToList')}
                    </button>
                    <div class="flex items-center gap-2">
                        ${isHRAdmin ? `
                            <button type="button"
                                    class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                    onclick="PositionManagementPage.editPosition('${position.id}')">
                                <span class="material-icons text-sm">edit</span>
                                ${i18n.t('position.editPosition')}
                            </button>
                        ` : ''}
                        <button type="button"
                                class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                onclick="PositionManagementPage.printPosition('${position.id}')">
                            <span class="material-icons text-sm">print</span>
                            ${i18n.t('position.printCard')}
                        </button>
                    </div>
                </div>

                <!-- Position Header -->
                ${renderPositionHeader(position)}

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div class="lg:col-span-2 space-y-6">
                        <!-- Basic Information -->
                        ${renderBasicInfo(position)}

                        <!-- Reporting Structure -->
                        ${renderReportingStructure(position)}

                        <!-- Incumbents -->
                        ${renderIncumbents(position)}
                    </div>

                    <div class="space-y-6">
                        <!-- Job Description -->
                        ${renderJobDescription(position)}

                        <!-- Layer/Level Hierarchy -->
                        ${renderLayerHierarchy(position)}

                        <!-- Position History -->
                        ${renderPositionHistory(position)}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render position header
     * @param {object} position
     * @returns {string}
     */
    function renderPositionHeader(position) {
        const isThai = i18n.getLanguage() === 'th';
        const statusConfig = MockPositionData.getPositionStatus(position.status);
        const jobGrade = MockPositionData.getJobGrade(position.jobGradeCode);
        const jobLayer = jobGrade ? MockPositionData.getJobLayer(jobGrade.layerCode) : null;

        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-start justify-between">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <span class="inline-flex items-center justify-center w-12 h-12 rounded-lg text-white text-lg font-bold"
                                  style="background-color: ${jobLayer?.color || '#6B7280'}">
                                ${position.positionCode.substring(0, 2)}
                            </span>
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">
                                    ${isThai ? position.titleTh : position.titleEn}
                                </h1>
                                <p class="text-gray-500">
                                    ${isThai ? position.titleEn : position.titleTh}
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4 mt-4">
                            <span class="text-sm text-gray-600">
                                <span class="font-medium">${i18n.t('position.positionCode')}:</span> ${position.positionCode}
                            </span>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusConfig?.color || 'gray'}-100 text-${statusConfig?.color || 'gray'}-800">
                                ${statusConfig ? (isThai ? statusConfig.nameTh : statusConfig.nameEn) : position.status}
                            </span>
                        </div>
                    </div>
                    ${position.incumbents && position.incumbents.length > 0 ? `
                        <div class="text-right">
                            <p class="text-sm text-gray-500 mb-2">${i18n.t('position.currentIncumbent')}</p>
                            <div class="flex items-center gap-2">
                                <img src="${position.incumbents[0].photo}"
                                     alt="${position.incumbents[0].nameEn}"
                                     class="w-10 h-10 rounded-full"
                                     onerror="this.src='https://via.placeholder.com/40'">
                                <div class="text-left">
                                    <p class="text-sm font-medium text-gray-900">
                                        ${isThai ? position.incumbents[0].nameTh : position.incumbents[0].nameEn}
                                    </p>
                                    <p class="text-xs text-gray-500">
                                        ${i18n.t('position.since')} ${DateUtils.format(position.incumbents[0].startDate, 'short')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Render basic information section
     * @param {object} position
     * @returns {string}
     */
    function renderBasicInfo(position) {
        const isThai = i18n.getLanguage() === 'th';
        const company = MockPositionData.getCompany(position.companyCode);
        const department = MockPositionData.getDepartment(position.departmentCode);
        const jobGrade = MockPositionData.getJobGrade(position.jobGradeCode);
        const jobFamily = MockPositionData.getJobFamily(position.jobFamilyCode);
        const costCenter = MockPositionData.getCostCenter(position.costCenterCode);

        const items = [
            { label: i18n.t('position.company'), value: company ? `${isThai ? company.nameTh : company.nameEn} (${company.code})` : '-' },
            { label: i18n.t('position.department'), value: department ? (isThai ? department.nameTh : department.nameEn) : '-' },
            { label: i18n.t('position.jobGrade'), value: jobGrade ? `${jobGrade.code} - ${isThai ? jobGrade.nameTh : jobGrade.nameEn}` : '-' },
            { label: i18n.t('position.jobFamily'), value: jobFamily ? (isThai ? jobFamily.nameTh : jobFamily.nameEn) : '-' },
            { label: i18n.t('position.costCenter'), value: costCenter ? `${costCenter.code} - ${isThai ? costCenter.nameTh : costCenter.nameEn}` : '-' },
            { label: i18n.t('position.createdDate'), value: DateUtils.format(position.createdDate, 'long') },
            { label: i18n.t('position.lastModified'), value: DateUtils.format(position.modifiedDate, 'long') }
        ];

        return CardComponent.render({
            id: 'position-basic-info',
            title: i18n.t('position.basicInfo'),
            icon: 'info',
            content: CardComponent.dataGrid(items)
        });
    }

    /**
     * Render reporting structure section
     * @param {object} position
     * @returns {string}
     */
    function renderReportingStructure(position) {
        const isThai = i18n.getLanguage() === 'th';
        const reportsTo = position.reportsToPositionId ? MockPositionData.getPositionById(position.reportsToPositionId) : null;
        const matrixReportsTo = position.matrixReportsToPositionId ? MockPositionData.getPositionById(position.matrixReportsToPositionId) : null;
        const directReports = MockPositionData.getDirectReports(position.id);

        let content = '<div class="space-y-4">';

        // Reports To
        content += `
            <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">${i18n.t('position.reportsTo')}</h4>
                ${reportsTo ? `
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                         onclick="PositionManagementPage.viewPosition('${reportsTo.id}')">
                        <span class="material-icons text-gray-400">account_circle</span>
                        <div>
                            <p class="text-sm font-medium text-gray-900">${isThai ? reportsTo.titleTh : reportsTo.titleEn}</p>
                            <p class="text-xs text-gray-500">${reportsTo.positionCode}</p>
                            ${reportsTo.incumbents && reportsTo.incumbents.length > 0 ? `
                                <p class="text-xs text-gray-600 mt-1">${isThai ? reportsTo.incumbents[0].nameTh : reportsTo.incumbents[0].nameEn}</p>
                            ` : ''}
                        </div>
                    </div>
                ` : `<p class="text-sm text-gray-400 italic">${i18n.t('position.noReportsTo')}</p>`}
            </div>
        `;

        // Matrix Reports To
        if (matrixReportsTo) {
            content += `
                <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-2">${i18n.t('position.matrixReportsTo')}</h4>
                    <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition"
                         onclick="PositionManagementPage.viewPosition('${matrixReportsTo.id}')">
                        <span class="material-icons text-blue-400">group</span>
                        <div>
                            <p class="text-sm font-medium text-gray-900">${isThai ? matrixReportsTo.titleTh : matrixReportsTo.titleEn}</p>
                            <p class="text-xs text-gray-500">${matrixReportsTo.positionCode}</p>
                            ${matrixReportsTo.incumbents && matrixReportsTo.incumbents.length > 0 ? `
                                <p class="text-xs text-gray-600 mt-1">${isThai ? matrixReportsTo.incumbents[0].nameTh : matrixReportsTo.incumbents[0].nameEn}</p>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        // Direct Reports
        content += `
            <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">${i18n.t('position.directReports')} (${directReports.length})</h4>
                ${directReports.length > 0 ? `
                    <div class="space-y-2 max-h-60 overflow-y-auto">
                        ${directReports.map(dr => `
                            <div class="flex items-center gap-3 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                                 onclick="PositionManagementPage.viewPosition('${dr.id}')">
                                <span class="material-icons text-sm text-gray-400">person</span>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate">${isThai ? dr.titleTh : dr.titleEn}</p>
                                    <p class="text-xs text-gray-500">${dr.positionCode}</p>
                                </div>
                                ${dr.incumbents && dr.incumbents.length > 0 ? `
                                    <img src="${dr.incumbents[0].photo}"
                                         alt="${dr.incumbents[0].nameEn}"
                                         class="w-6 h-6 rounded-full"
                                         onerror="this.src='https://via.placeholder.com/24'">
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : `<p class="text-sm text-gray-400 italic">${i18n.t('position.noDirectReports')}</p>`}
            </div>
        `;

        content += '</div>';

        return CardComponent.render({
            id: 'position-reporting',
            title: i18n.t('position.reportingStructure'),
            icon: 'account_tree',
            content: content
        });
    }

    /**
     * Render incumbents section
     * @param {object} position
     * @returns {string}
     */
    function renderIncumbents(position) {
        const isThai = i18n.getLanguage() === 'th';
        const incumbents = position.incumbents || [];

        let content;
        if (incumbents.length === 0) {
            content = `
                <div class="text-center py-6">
                    <span class="material-icons text-4xl text-gray-300 mb-2">person_outline</span>
                    <p class="text-gray-500">${i18n.t('position.noIncumbents')}</p>
                </div>
            `;
        } else {
            content = `
                <div class="space-y-3">
                    ${incumbents.map(inc => `
                        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <img src="${inc.photo}"
                                 alt="${inc.nameEn}"
                                 class="w-12 h-12 rounded-full"
                                 onerror="this.src='https://via.placeholder.com/48'">
                            <div class="flex-1">
                                <p class="font-medium text-gray-900">${isThai ? inc.nameTh : inc.nameEn}</p>
                                <p class="text-sm text-gray-500">${inc.employeeId}</p>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="text-xs text-gray-500">
                                        ${i18n.t('position.effectiveDate')}: ${DateUtils.format(inc.startDate, 'short')}
                                    </span>
                                    ${inc.isPrimary ? `
                                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                            ${i18n.t('position.primary')}
                                        </span>
                                    ` : ''}
                                </div>
                            </div>
                            <a href="#/profile"
                               class="p-2 text-gray-400 hover:text-cg-red transition"
                               title="${i18n.t('position.viewProfile')}">
                                <span class="material-icons">open_in_new</span>
                            </a>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        return CardComponent.render({
            id: 'position-incumbents',
            title: i18n.t('position.incumbentsList'),
            icon: 'people',
            content: content
        });
    }

    /**
     * Render job description section
     * @param {object} position
     * @returns {string}
     */
    function renderJobDescription(position) {
        const jd = position.jobDescription;

        let content;
        if (!jd || !jd.fileName) {
            content = `
                <div class="text-center py-6">
                    <span class="material-icons text-4xl text-gray-300 mb-2">description</span>
                    <p class="text-gray-500">${i18n.t('position.noJobDescription')}</p>
                </div>
            `;
        } else {
            content = `
                <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <span class="material-icons text-3xl text-red-500">picture_as_pdf</span>
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900 truncate">${jd.fileName}</p>
                        <p class="text-sm text-gray-500">
                            ${i18n.t('position.uploadedOn')} ${DateUtils.format(jd.uploadedDate, 'short')}
                        </p>
                    </div>
                    <div class="flex items-center gap-1">
                        <button type="button"
                                class="p-2 text-gray-400 hover:text-cg-red transition"
                                onclick="PositionManagementPage.viewJD('${position.id}')"
                                title="${i18n.t('position.viewJD')}">
                            <span class="material-icons">visibility</span>
                        </button>
                        <button type="button"
                                class="p-2 text-gray-400 hover:text-cg-red transition"
                                onclick="PositionManagementPage.downloadJD('${position.id}')"
                                title="${i18n.t('position.downloadJD')}">
                            <span class="material-icons">download</span>
                        </button>
                    </div>
                </div>
            `;
        }

        return CardComponent.render({
            id: 'position-jd',
            title: i18n.t('position.jobDescription'),
            icon: 'description',
            content: content
        });
    }

    /**
     * Render layer hierarchy section
     * @param {object} position
     * @returns {string}
     */
    function renderLayerHierarchy(position) {
        const isThai = i18n.getLanguage() === 'th';
        const jobGrade = MockPositionData.getJobGrade(position.jobGradeCode);
        const jobLayer = jobGrade ? MockPositionData.getJobLayer(jobGrade.layerCode) : null;

        const content = `
            <div class="space-y-3">
                ${MockPositionData.jobLayers.map(layer => {
                    const isCurrentLayer = layer.code === jobGrade?.layerCode;
                    const gradesInLayer = MockPositionData.jobGrades.filter(g => g.layerCode === layer.code);

                    return `
                        <div class="${isCurrentLayer ? 'ring-2 ring-cg-red' : ''} rounded-lg overflow-hidden">
                            <div class="flex items-center gap-3 p-3 ${isCurrentLayer ? 'bg-red-50' : 'bg-gray-50'}">
                                <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                     style="background-color: ${layer.color}">
                                    ${layer.code}
                                </div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium ${isCurrentLayer ? 'text-cg-red' : 'text-gray-900'}">
                                        ${isThai ? layer.nameTh : layer.nameEn}
                                    </p>
                                    <p class="text-xs text-gray-500">
                                        ${gradesInLayer.map(g => {
                                            const isCurrentGrade = g.code === position.jobGradeCode;
                                            return `<span class="${isCurrentGrade ? 'font-bold text-cg-red' : ''}">${g.code}</span>`;
                                        }).join(' | ')}
                                    </p>
                                </div>
                                ${isCurrentLayer ? `
                                    <span class="material-icons text-cg-red">check_circle</span>
                                ` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        return CardComponent.render({
            id: 'position-hierarchy',
            title: i18n.t('position.layerHierarchy'),
            icon: 'layers',
            content: content
        });
    }

    /**
     * Render position history section
     * @param {object} position
     * @returns {string}
     */
    function renderPositionHistory(position) {
        const history = position.history || [];

        if (history.length === 0) {
            return CardComponent.render({
                id: 'position-history',
                title: i18n.t('position.history'),
                icon: 'history',
                content: `<p class="text-gray-500 text-center py-4">${i18n.t('position.noHistory')}</p>`
            });
        }

        const content = `
            <div class="space-y-3 max-h-80 overflow-y-auto">
                ${history.slice().reverse().map(h => {
                    const actionIcons = {
                        created: 'add_circle',
                        modified: 'edit',
                        incumbent_assigned: 'person_add',
                        status_changed: 'swap_horiz'
                    };
                    const actionColors = {
                        created: 'green',
                        modified: 'blue',
                        incumbent_assigned: 'purple',
                        status_changed: 'amber'
                    };

                    return `
                        <div class="flex gap-3 p-3 bg-gray-50 rounded-lg">
                            <span class="material-icons text-${actionColors[h.action] || 'gray'}-500">${actionIcons[h.action] || 'info'}</span>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm text-gray-900">${h.description}</p>
                                <p class="text-xs text-gray-500">
                                    ${DateUtils.format(h.date, 'short')} | ${h.byUser}
                                </p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        return CardComponent.render({
            id: 'position-history',
            title: i18n.t('position.history'),
            icon: 'history',
            collapsible: true,
            content: content
        });
    }

    /**
     * Get filtered positions based on current filters
     * @returns {array}
     */
    function getFilteredPositions() {
        return MockPositionData.getPositions({
            companyCode: filters.company || undefined,
            departmentCode: filters.department || undefined,
            jobGradeCode: filters.jobGrade || undefined,
            status: filters.status || undefined,
            search: filters.search || undefined
        });
    }

    /**
     * Paginate data
     * @param {array} data
     * @returns {array}
     */
    function paginateData(data) {
        const start = (currentPage - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }

    // Search debounce timer
    let searchTimer = null;

    return {
        /**
         * Render the page
         */
        render: render,

        /**
         * Initialize the page
         */
        init(params) {
            if (params && params.id) {
                currentView = 'detail';
                currentPositionId = params.id;
            } else {
                currentView = 'list';
                currentPositionId = null;
            }
        },

        /**
         * Update filter and refresh
         * @param {string} filterName
         * @param {string} value
         */
        updateFilter(filterName, value) {
            filters[filterName] = value;
            currentPage = 1;
            this.refresh();
        },

        /**
         * Debounced search
         * @param {string} value
         */
        debounceSearch(value) {
            if (searchTimer) {
                clearTimeout(searchTimer);
            }
            searchTimer = setTimeout(() => {
                filters.search = value;
                currentPage = 1;
                this.refresh();
            }, 300);
        },

        /**
         * Clear all filters
         */
        clearFilters() {
            filters = {
                company: '',
                department: '',
                jobGrade: '',
                status: '',
                search: ''
            };
            currentPage = 1;

            // Reset filter inputs
            document.getElementById('position-search').value = '';
            document.getElementById('filter-company').value = '';
            document.getElementById('filter-department').value = '';
            document.getElementById('filter-status').value = '';

            this.refresh();
        },

        /**
         * Change page size
         * @param {string|number} size
         */
        changePageSize(size) {
            pageSize = parseInt(size, 10);
            currentPage = 1;
            this.refresh();
        },

        /**
         * Go to specific page
         * @param {number} page
         */
        goToPage(page) {
            currentPage = page;
            this.refresh();
        },

        /**
         * Refresh the page
         */
        refresh() {
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.innerHTML = render({ id: currentPositionId });
            }
        },

        /**
         * View position details
         * @param {string} positionId
         */
        viewPosition(positionId) {
            Router.navigate(`/positions/${positionId}`);
        },

        /**
         * Back to list view
         */
        backToList() {
            Router.navigate('/positions');
        },

        /**
         * Edit position (HR Admin only)
         * @param {string} positionId
         */
        editPosition(positionId) {
            if (!RBAC.hasRole('hr_admin')) {
                ToastComponent.error(i18n.t('error.unauthorized'));
                return;
            }

            // For now, show a toast that this is not implemented
            ToastComponent.info(i18n.t('position.editNotImplemented'));
        },

        /**
         * Print position card
         * @param {string} positionId
         */
        printPosition(positionId) {
            const position = MockPositionData.getPositionById(positionId);
            if (!position) {
                ToastComponent.error(i18n.t('position.positionNotFound'));
                return;
            }

            ToastComponent.info(i18n.t('position.printStarted'));
            // In a real implementation, this would open a print dialog
            window.print();
        },

        /**
         * View job description
         * @param {string} positionId
         */
        viewJD(positionId) {
            const position = MockPositionData.getPositionById(positionId);
            if (!position || !position.jobDescription) {
                ToastComponent.error(i18n.t('position.noJobDescription'));
                return;
            }

            ToastComponent.info(i18n.t('position.openingJD'));
            // In a real implementation, this would open the PDF viewer
        },

        /**
         * Download job description
         * @param {string} positionId
         */
        downloadJD(positionId) {
            const position = MockPositionData.getPositionById(positionId);
            if (!position || !position.jobDescription) {
                ToastComponent.error(i18n.t('position.noJobDescription'));
                return;
            }

            ToastComponent.success(i18n.t('toast.downloadStarted'));
            // In a real implementation, this would download the file
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PositionManagementPage;
}
