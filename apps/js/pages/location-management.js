/**
 * Location Management Page
 * Location hierarchy, employee assignment, and location-based views
 */

const LocationManagementPage = (function() {
    // State
    let currentView = 'hierarchy'; // 'hierarchy', 'employees', 'dashboard'
    let selectedLocationId = null;
    let expandedNodes = new Set();
    let filters = {
        locationType: '',
        province: '',
        search: ''
    };
    let currentPage = 1;
    let pageSize = 10;
    let searchTimeout = null;

    /**
     * Render the page
     * @param {object} params - Route parameters
     * @returns {string}
     */
    function render(params) {
        // Check view from params
        if (params && params.view) {
            currentView = params.view;
        }
        if (params && params.locationId) {
            selectedLocationId = params.locationId;
        }

        return `
            <div class="max-w-7xl mx-auto px-4 py-6">
                <!-- Page Header -->
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-gray-900">${i18n.t('location.title')}</h1>
                    <p class="text-gray-600 mt-1">${i18n.t('location.subtitle')}</p>
                </div>

                <!-- View Tabs -->
                ${renderTabs()}

                <!-- Content based on view -->
                <div id="location-content" role="tabpanel" aria-labelledby="tab-${currentView}">
                    ${renderContent()}
                </div>
            </div>
        `;
    }

    /**
     * Initialize the page
     * @param {object} params - Route parameters
     */
    function init(params) {
        if (params && params.view) {
            currentView = params.view;
        }
        if (params && params.locationId) {
            selectedLocationId = params.locationId;
            // Auto-expand parent nodes
            const path = MockLocationData.getLocationPath(selectedLocationId);
            path.forEach(loc => expandedNodes.add(loc.id));
        }
    }

    /**
     * Render navigation tabs
     * @returns {string}
     */
    function renderTabs() {
        const tabs = [
            { id: 'hierarchy', icon: 'account_tree', label: i18n.t('location.hierarchy') },
            { id: 'employees', icon: 'people', label: i18n.t('location.employeeDirectory') },
            { id: 'dashboard', icon: 'dashboard', label: i18n.t('location.dashboard') }
        ];

        return `
            <div class="border-b border-gray-200 mb-6" role="tablist" aria-label="${i18n.t('location.viewTabs')}">
                <nav class="flex -mb-px space-x-8">
                    ${tabs.map(tab => `
                        <button type="button"
                                id="tab-${tab.id}"
                                role="tab"
                                aria-selected="${currentView === tab.id}"
                                aria-controls="location-content"
                                class="flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                    ${currentView === tab.id
                                        ? 'border-cg-red text-cg-red'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                                onclick="LocationManagementPage.switchView('${tab.id}')">
                            <span class="material-icons text-lg">${tab.icon}</span>
                            ${tab.label}
                        </button>
                    `).join('')}
                </nav>
            </div>
        `;
    }

    /**
     * Render content based on current view
     * @returns {string}
     */
    function renderContent() {
        switch (currentView) {
            case 'hierarchy':
                return renderHierarchyView();
            case 'employees':
                return renderEmployeesView();
            case 'dashboard':
                return renderDashboardView();
            default:
                return renderHierarchyView();
        }
    }

    /**
     * Render location hierarchy view
     * @returns {string}
     */
    function renderHierarchyView() {
        const businessZones = MockLocationData.getLocationsByType('business_zone');

        return `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Hierarchy Tree -->
                <div class="lg:col-span-2">
                    ${renderFilters()}
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="material-icons text-cg-red">account_tree</span>
                            ${i18n.t('location.locationTree')}
                        </h3>
                        <div id="location-tree" class="space-y-1" role="tree" aria-label="${i18n.t('location.hierarchy')}">
                            ${businessZones.map(zone => renderTreeNode(zone, 0)).join('')}
                        </div>
                    </div>
                </div>

                <!-- Location Details Panel -->
                <div class="lg:col-span-1">
                    ${selectedLocationId ? renderLocationDetails(selectedLocationId) : renderNoLocationSelected()}
                </div>
            </div>
        `;
    }

    /**
     * Render tree node recursively
     * @param {object} location - Location object
     * @param {number} level - Depth level
     * @returns {string}
     */
    function renderTreeNode(location, level) {
        const children = MockLocationData.getChildLocations(location.id);
        const hasChildren = children.length > 0;
        const isExpanded = expandedNodes.has(location.id);
        const isSelected = selectedLocationId === location.id;
        const isThai = i18n.getLanguage() === 'th';
        const name = isThai ? location.nameTh : location.nameEn;
        const typeLabel = getLocationTypeLabel(location.locationType);
        const paddingLeft = level * 24;

        // Apply search filter
        if (filters.search) {
            const query = filters.search.toLowerCase();
            const matchesSearch = location.nameEn.toLowerCase().includes(query) ||
                                  location.nameTh.includes(filters.search) ||
                                  location.locationCode.toLowerCase().includes(query);
            if (!matchesSearch && !hasChildren) {
                return '';
            }
        }

        // Apply location type filter
        if (filters.locationType && location.locationType !== filters.locationType && !hasChildren) {
            return '';
        }

        const childrenHtml = hasChildren && isExpanded
            ? children.map(child => renderTreeNode(child, level + 1)).join('')
            : '';

        return `
            <div class="tree-node" role="treeitem" aria-expanded="${isExpanded}" aria-selected="${isSelected}">
                <div class="flex items-center py-2 px-2 rounded-lg cursor-pointer transition-colors
                            ${isSelected ? 'bg-red-50 border border-cg-red' : 'hover:bg-gray-50'}"
                     style="padding-left: ${paddingLeft + 8}px"
                     onclick="LocationManagementPage.selectLocation('${location.id}')"
                     onkeydown="LocationManagementPage.handleTreeKeydown(event, '${location.id}')">
                    ${hasChildren ? `
                        <button type="button"
                                class="p-1 mr-1 hover:bg-gray-200 rounded transition"
                                onclick="event.stopPropagation(); LocationManagementPage.toggleNode('${location.id}')"
                                aria-label="${isExpanded ? i18n.t('accessibility.collapseSection') : i18n.t('accessibility.expandSection')}">
                            <span class="material-icons text-sm text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}">
                                chevron_right
                            </span>
                        </button>
                    ` : `
                        <span class="w-7"></span>
                    `}
                    <span class="material-icons text-lg mr-2 ${getLocationTypeColor(location.locationType)}">
                        ${getLocationTypeIcon(location.locationType)}
                    </span>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <span class="font-medium text-gray-900 truncate">${name}</span>
                            <span class="text-xs text-gray-400">${location.locationCode}</span>
                        </div>
                        <div class="text-xs text-gray-500 flex items-center gap-2">
                            <span>${typeLabel}</span>
                            ${location.headcount ? `
                                <span class="flex items-center gap-1">
                                    <span class="material-icons text-xs">people</span>
                                    ${location.headcount.toLocaleString()}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                    ${location.status === 'active' ? '' : `
                        <span class="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                            ${i18n.t('location.statusInactive')}
                        </span>
                    `}
                </div>
                ${childrenHtml ? `<div class="ml-4">${childrenHtml}</div>` : ''}
            </div>
        `;
    }

    /**
     * Render location details panel
     * @param {string} locationId
     * @returns {string}
     */
    function renderLocationDetails(locationId) {
        const location = MockLocationData.getLocation(locationId);
        if (!location) {
            return renderNoLocationSelected();
        }

        const isThai = i18n.getLanguage() === 'th';
        const name = isThai ? location.nameTh : location.nameEn;
        const typeLabel = getLocationTypeLabel(location.locationType);
        const path = MockLocationData.getLocationPath(locationId);
        const employees = MockLocationData.getEmployeesByLocation(locationId);
        const childLocations = MockLocationData.getChildLocations(locationId);

        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4">
                <!-- Header -->
                <div class="p-4 border-b border-gray-200">
                    <div class="flex items-start justify-between">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">${name}</h3>
                            <p class="text-sm text-gray-500">${location.locationCode}</p>
                        </div>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                     ${location.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}">
                            ${location.status === 'active' ? i18n.t('location.statusActive') : i18n.t('location.statusInactive')}
                        </span>
                    </div>
                </div>

                <!-- Details -->
                <div class="p-4 space-y-4">
                    <!-- Location Type -->
                    <div>
                        <label class="text-xs font-medium text-gray-500 uppercase">${i18n.t('location.locationType')}</label>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="material-icons text-lg ${getLocationTypeColor(location.locationType)}">
                                ${getLocationTypeIcon(location.locationType)}
                            </span>
                            <span class="text-gray-900">${typeLabel}</span>
                        </div>
                    </div>

                    <!-- Location Path -->
                    <div>
                        <label class="text-xs font-medium text-gray-500 uppercase">${i18n.t('location.locationPath')}</label>
                        <div class="mt-1 flex flex-wrap items-center gap-1 text-sm">
                            ${path.map((loc, idx) => `
                                ${idx > 0 ? '<span class="material-icons text-xs text-gray-400">chevron_right</span>' : ''}
                                <span class="${loc.id === locationId ? 'text-cg-red font-medium' : 'text-gray-600'}"
                                      ${loc.id !== locationId ? `
                                          onclick="LocationManagementPage.selectLocation('${loc.id}')"
                                          class="cursor-pointer hover:text-cg-red"
                                      ` : ''}>
                                    ${isThai ? loc.nameTh : loc.nameEn}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Address -->
                    ${location.address ? `
                        <div>
                            <label class="text-xs font-medium text-gray-500 uppercase">${i18n.t('location.address')}</label>
                            <p class="mt-1 text-sm text-gray-900">
                                ${location.address.addressLine1}<br>
                                ${location.address.addressLine2 ? location.address.addressLine2 + '<br>' : ''}
                                ${location.address.district}, ${location.address.province} ${location.address.postalCode}
                            </p>
                            ${location.coordinates ? `
                                <a href="https://maps.google.com/?q=${location.coordinates.lat},${location.coordinates.lng}"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   class="inline-flex items-center gap-1 text-sm text-cg-red hover:text-red-700 mt-2">
                                    <span class="material-icons text-sm">map</span>
                                    ${i18n.t('location.viewOnMap')}
                                </a>
                            ` : ''}
                        </div>
                    ` : ''}

                    <!-- Headcount -->
                    <div>
                        <label class="text-xs font-medium text-gray-500 uppercase">${i18n.t('location.headcount')}</label>
                        <div class="mt-1 flex items-center gap-2">
                            <span class="text-2xl font-bold text-gray-900">${(location.headcount || 0).toLocaleString()}</span>
                            <span class="text-sm text-gray-500">${i18n.t('location.employees')}</span>
                        </div>
                    </div>

                    <!-- Child Locations Count -->
                    ${childLocations.length > 0 ? `
                        <div>
                            <label class="text-xs font-medium text-gray-500 uppercase">${i18n.t('location.childLocations')}</label>
                            <div class="mt-1">
                                <span class="text-lg font-semibold text-gray-900">${childLocations.length}</span>
                                <span class="text-sm text-gray-500">${i18n.t('location.subLocations')}</span>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Assigned Employees Preview -->
                    ${employees.length > 0 ? `
                        <div>
                            <label class="text-xs font-medium text-gray-500 uppercase">${i18n.t('location.assignedEmployees')}</label>
                            <div class="mt-2 space-y-2">
                                ${employees.slice(0, 3).map(emp => `
                                    <div class="flex items-center gap-2">
                                        <img src="${emp.employeePhoto}" alt=""
                                             class="w-8 h-8 rounded-full"
                                             onerror="this.src='https://via.placeholder.com/32'">
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate">
                                                ${isThai ? emp.employeeNameTh : emp.employeeName}
                                            </p>
                                            <p class="text-xs text-gray-500">
                                                ${emp.locationType === 'primary' ? i18n.t('location.primary') : i18n.t('location.secondary')}
                                            </p>
                                        </div>
                                    </div>
                                `).join('')}
                                ${employees.length > 3 ? `
                                    <button type="button"
                                            class="text-sm text-cg-red hover:text-red-700"
                                            onclick="LocationManagementPage.viewAllEmployees('${locationId}')">
                                        ${i18n.t('common.viewMore')} (${employees.length - 3} ${i18n.t('common.more')})
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Actions -->
                <div class="p-4 border-t border-gray-200 flex gap-2">
                    <button type="button"
                            class="flex-1 px-4 py-2 text-sm font-medium text-cg-red border border-cg-red rounded-lg hover:bg-red-50 transition"
                            onclick="LocationManagementPage.viewAllEmployees('${locationId}')">
                        <span class="material-icons text-sm mr-1">people</span>
                        ${i18n.t('location.viewEmployees')}
                    </button>
                    ${RBAC.hasRole('hr_admin') ? `
                        <button type="button"
                                class="flex-1 px-4 py-2 text-sm font-medium text-white bg-cg-red rounded-lg hover:bg-red-700 transition"
                                onclick="LocationManagementPage.assignEmployee('${locationId}')">
                            <span class="material-icons text-sm mr-1">person_add</span>
                            ${i18n.t('location.assignEmployee')}
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Render no location selected state
     * @returns {string}
     */
    function renderNoLocationSelected() {
        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <span class="material-icons text-5xl text-gray-300 mb-4">place</span>
                <p class="text-gray-500">${i18n.t('location.selectLocation')}</p>
            </div>
        `;
    }

    /**
     * Render filters section
     * @returns {string}
     */
    function renderFilters() {
        const isThai = i18n.getLanguage() === 'th';

        const typeOptions = MockLocationData.locationTypes.map(t =>
            `<option value="${t.value}" ${filters.locationType === t.value ? 'selected' : ''}>
                ${isThai ? t.labelTh : t.labelEn}
            </option>`
        ).join('');

        const provinceOptions = MockLocationData.provinces.map(p =>
            `<option value="${p.id}" ${filters.province === p.id ? 'selected' : ''}>
                ${isThai ? p.nameTh : p.nameEn}
            </option>`
        ).join('');

        return `
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Search -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('common.search')}</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <span class="material-icons text-sm">search</span>
                            </span>
                            <input type="text"
                                   id="location-search"
                                   class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-cg-red focus:border-cg-red"
                                   placeholder="${i18n.t('location.searchPlaceholder')}"
                                   value="${filters.search}"
                                   onkeyup="LocationManagementPage.debounceSearch(this.value)">
                        </div>
                    </div>

                    <!-- Location Type Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('location.locationType')}</label>
                        <select class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-cg-red focus:border-cg-red"
                                onchange="LocationManagementPage.updateFilter('locationType', this.value)">
                            <option value="">${i18n.t('common.all')}</option>
                            ${typeOptions}
                        </select>
                    </div>

                    <!-- Province Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('location.province')}</label>
                        <select class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-cg-red focus:border-cg-red"
                                onchange="LocationManagementPage.updateFilter('province', this.value)">
                            <option value="">${i18n.t('common.all')}</option>
                            ${provinceOptions}
                        </select>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render employees view
     * @returns {string}
     */
    function renderEmployeesView() {
        const isThai = i18n.getLanguage() === 'th';
        let assignments = MockLocationData.employeeAssignments.filter(a => a.status === 'active');

        // Apply filters
        if (selectedLocationId) {
            assignments = assignments.filter(a => a.locationId === selectedLocationId);
        }

        if (filters.search) {
            const query = filters.search.toLowerCase();
            assignments = assignments.filter(a =>
                a.employeeName.toLowerCase().includes(query) ||
                a.employeeNameTh.includes(filters.search) ||
                a.employeeId.toLowerCase().includes(query)
            );
        }

        const totalCount = assignments.length;
        const paginatedAssignments = assignments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

        return `
            <div class="space-y-4">
                <!-- Filters -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <!-- Search -->
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('common.search')}</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <span class="material-icons text-sm">search</span>
                                </span>
                                <input type="text"
                                       class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-cg-red focus:border-cg-red"
                                       placeholder="${i18n.t('location.searchEmployeePlaceholder')}"
                                       value="${filters.search}"
                                       onkeyup="LocationManagementPage.debounceSearch(this.value)">
                            </div>
                        </div>

                        <!-- Location Filter -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('location.location')}</label>
                            <select class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-cg-red focus:border-cg-red"
                                    onchange="LocationManagementPage.filterByLocation(this.value)">
                                <option value="">${i18n.t('common.all')}</option>
                                ${MockLocationData.locations.map(l => `
                                    <option value="${l.id}" ${selectedLocationId === l.id ? 'selected' : ''}>
                                        ${isThai ? l.nameTh : l.nameEn} (${l.locationCode})
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Results Summary -->
                <div class="flex items-center justify-between">
                    <p class="text-sm text-gray-600">
                        ${i18n.t('location.showingEmployees').replace('{count}', totalCount)}
                    </p>
                </div>

                <!-- Employees Table -->
                ${paginatedAssignments.length > 0 ? `
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('location.employee')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('location.location')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('location.assignmentType')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('common.effectiveDate')}</th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('common.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    ${paginatedAssignments.map(assignment => {
                                        const location = MockLocationData.getLocation(assignment.locationId);
                                        return `
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-4 py-3">
                                                    <div class="flex items-center gap-3">
                                                        <img src="${assignment.employeePhoto}" alt=""
                                                             class="w-10 h-10 rounded-full"
                                                             onerror="this.src='https://via.placeholder.com/40'">
                                                        <div>
                                                            <p class="font-medium text-gray-900">
                                                                ${isThai ? assignment.employeeNameTh : assignment.employeeName}
                                                            </p>
                                                            <p class="text-sm text-gray-500">${assignment.employeeId}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-4 py-3">
                                                    <p class="text-sm text-gray-900">
                                                        ${location ? (isThai ? location.nameTh : location.nameEn) : '-'}
                                                    </p>
                                                    <p class="text-xs text-gray-500">${location?.locationCode || ''}</p>
                                                </td>
                                                <td class="px-4 py-3">
                                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                                 ${assignment.locationType === 'primary' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}">
                                                        ${assignment.locationType === 'primary' ? i18n.t('location.primary') : i18n.t('location.secondary')}
                                                    </span>
                                                </td>
                                                <td class="px-4 py-3 text-sm text-gray-600">
                                                    ${DateUtils.format(assignment.effectiveDate, 'medium')}
                                                </td>
                                                <td class="px-4 py-3 text-right">
                                                    <div class="flex items-center justify-end gap-1">
                                                        <button type="button"
                                                                class="p-1.5 hover:bg-gray-100 rounded transition"
                                                                onclick="LocationManagementPage.viewAssignmentHistory('${assignment.employeeId}')"
                                                                title="${i18n.t('common.history')}">
                                                            <span class="material-icons text-sm text-gray-500">history</span>
                                                        </button>
                                                        ${RBAC.hasRole('hr_admin') ? `
                                                            <button type="button"
                                                                    class="p-1.5 hover:bg-gray-100 rounded transition"
                                                                    onclick="LocationManagementPage.editAssignment('${assignment.id}')"
                                                                    title="${i18n.t('common.edit')}">
                                                                <span class="material-icons text-sm text-gray-500">edit</span>
                                                            </button>
                                                        ` : ''}
                                                    </div>
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                        ${renderPagination(totalCount)}
                    </div>
                ` : `
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <span class="material-icons text-5xl text-gray-300 mb-4">people_outline</span>
                        <p class="text-gray-500">${i18n.t('location.noEmployeesFound')}</p>
                    </div>
                `}
            </div>
        `;
    }

    /**
     * Render dashboard view
     * @returns {string}
     */
    function renderDashboardView() {
        const totalHeadcount = MockLocationData.getTotalHeadcount();
        const headcountByRegion = MockLocationData.headcountByRegion;
        const headcountByProvince = MockLocationData.getHeadcountByProvince();
        const isThai = i18n.getLanguage() === 'th';

        return `
            <div class="space-y-6">
                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <!-- Total Headcount -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('location.totalHeadcount')}</p>
                                <p class="text-3xl font-bold text-gray-900">${totalHeadcount.toLocaleString()}</p>
                            </div>
                            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <span class="material-icons text-blue-600">people</span>
                            </div>
                        </div>
                    </div>

                    <!-- Total Locations -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('location.totalLocations')}</p>
                                <p class="text-3xl font-bold text-gray-900">${MockLocationData.locations.length}</p>
                            </div>
                            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <span class="material-icons text-green-600">place</span>
                            </div>
                        </div>
                    </div>

                    <!-- Branches -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('location.totalBranches')}</p>
                                <p class="text-3xl font-bold text-gray-900">
                                    ${MockLocationData.getLocationsByType('branch').length}
                                </p>
                            </div>
                            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                <span class="material-icons text-purple-600">store</span>
                            </div>
                        </div>
                    </div>

                    <!-- Provinces Covered -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('location.provincesCovered')}</p>
                                <p class="text-3xl font-bold text-gray-900">${headcountByProvince.length}</p>
                            </div>
                            <div class="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                                <span class="material-icons text-amber-600">map</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Headcount by Region Chart -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('location.headcountByRegion')}</h3>
                        <div class="space-y-4">
                            ${headcountByRegion.map(region => `
                                <div>
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-sm font-medium text-gray-700">${region.regionName}</span>
                                        <span class="text-sm text-gray-600">${region.count.toLocaleString()} (${region.percentage}%)</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-3">
                                        <div class="bg-cg-red rounded-full h-3 transition-all"
                                             style="width: ${region.percentage}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Headcount by Province Table -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('location.headcountByProvince')}</h3>
                        <div class="overflow-y-auto max-h-80">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('location.province')}</th>
                                        <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('location.headcount')}</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    ${headcountByProvince.map((item, idx) => `
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-3 py-2">
                                                <div class="flex items-center gap-2">
                                                    <span class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600">
                                                        ${idx + 1}
                                                    </span>
                                                    <span class="text-sm text-gray-900">
                                                        ${isThai ? item.provinceNameTh : item.provinceName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="px-3 py-2 text-right text-sm text-gray-900 font-medium">
                                                ${item.headcount.toLocaleString()}
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Location Types Distribution -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('location.locationsByType')}</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        ${MockLocationData.locationTypes.map(type => {
                            const count = MockLocationData.getLocationsByType(type.value).length;
                            return `
                                <div class="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
                                     onclick="LocationManagementPage.filterByType('${type.value}')">
                                    <span class="material-icons text-3xl ${getLocationTypeColor(type.value)} mb-2">
                                        ${getLocationTypeIcon(type.value)}
                                    </span>
                                    <p class="text-2xl font-bold text-gray-900">${count}</p>
                                    <p class="text-xs text-gray-500">${isThai ? type.labelTh : type.labelEn}</p>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render pagination
     * @param {number} totalCount
     * @returns {string}
     */
    function renderPagination(totalCount) {
        const totalPages = Math.ceil(totalCount / pageSize);
        if (totalPages <= 1) return '';

        const start = (currentPage - 1) * pageSize + 1;
        const end = Math.min(currentPage * pageSize, totalCount);

        return `
            <div class="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <p class="text-sm text-gray-600">
                    ${i18n.t('common.showing')} ${start}-${end} ${i18n.t('common.of')} ${totalCount}
                </p>
                <div class="flex items-center gap-1">
                    <button type="button"
                            class="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            ${currentPage === 1 ? 'disabled' : ''}
                            onclick="LocationManagementPage.goToPage(${currentPage - 1})">
                        <span class="material-icons text-sm">chevron_left</span>
                    </button>
                    ${Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return `
                            <button type="button"
                                    class="w-8 h-8 rounded text-sm font-medium
                                           ${page === currentPage ? 'bg-cg-red text-white' : 'hover:bg-gray-100 text-gray-700'}"
                                    onclick="LocationManagementPage.goToPage(${page})">
                                ${page}
                            </button>
                        `;
                    }).join('')}
                    <button type="button"
                            class="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            ${currentPage === totalPages ? 'disabled' : ''}
                            onclick="LocationManagementPage.goToPage(${currentPage + 1})">
                        <span class="material-icons text-sm">chevron_right</span>
                    </button>
                </div>
            </div>
        `;
    }

    // Helper functions
    function getLocationTypeIcon(type) {
        const icons = {
            'business_zone': 'business',
            'region': 'public',
            'province': 'location_city',
            'district': 'domain',
            'branch': 'store',
            'building': 'apartment',
            'floor': 'layers'
        };
        return icons[type] || 'place';
    }

    function getLocationTypeColor(type) {
        const colors = {
            'business_zone': 'text-purple-600',
            'region': 'text-blue-600',
            'province': 'text-green-600',
            'district': 'text-teal-600',
            'branch': 'text-orange-600',
            'building': 'text-gray-600',
            'floor': 'text-gray-500'
        };
        return colors[type] || 'text-gray-500';
    }

    function getLocationTypeLabel(type) {
        const locationType = MockLocationData.getLocationType(type);
        if (!locationType) return type;
        return i18n.getLanguage() === 'th' ? locationType.labelTh : locationType.labelEn;
    }

    // Public methods
    return {
        render,
        init,

        switchView(view) {
            currentView = view;
            currentPage = 1;
            this.refresh();
        },

        selectLocation(locationId) {
            selectedLocationId = locationId;
            this.refresh();
        },

        toggleNode(locationId) {
            if (expandedNodes.has(locationId)) {
                expandedNodes.delete(locationId);
            } else {
                expandedNodes.add(locationId);
            }
            this.refresh();
        },

        handleTreeKeydown(event, locationId) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.selectLocation(locationId);
            } else if (event.key === 'ArrowRight') {
                expandedNodes.add(locationId);
                this.refresh();
            } else if (event.key === 'ArrowLeft') {
                expandedNodes.delete(locationId);
                this.refresh();
            }
        },

        updateFilter(filterName, value) {
            filters[filterName] = value;
            currentPage = 1;
            this.refresh();
        },

        debounceSearch(query) {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            searchTimeout = setTimeout(() => {
                filters.search = query;
                currentPage = 1;
                this.refresh();
            }, 300);
        },

        filterByLocation(locationId) {
            selectedLocationId = locationId;
            currentPage = 1;
            this.refresh();
        },

        filterByType(type) {
            filters.locationType = type;
            currentView = 'hierarchy';
            this.refresh();
        },

        goToPage(page) {
            currentPage = page;
            this.refresh();
        },

        viewAllEmployees(locationId) {
            selectedLocationId = locationId;
            currentView = 'employees';
            currentPage = 1;
            this.refresh();
        },

        viewAssignmentHistory(employeeId) {
            const history = MockLocationData.getEmployeeLocationHistory(employeeId);
            const isThai = i18n.getLanguage() === 'th';

            ModalComponent.open({
                title: i18n.t('location.assignmentHistory'),
                size: 'lg',
                content: history.length > 0 ? `
                    <div class="space-y-4">
                        ${history.map(item => {
                            const fromLocation = item.fromLocationId ? MockLocationData.getLocation(item.fromLocationId) : null;
                            const toLocation = MockLocationData.getLocation(item.toLocationId);
                            return `
                                <div class="relative pl-6 pb-4 border-l-2 border-gray-200 last:border-0">
                                    <div class="absolute left-0 top-0 w-3 h-3 bg-cg-red rounded-full -translate-x-1.5"></div>
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <div class="flex justify-between items-start mb-2">
                                            <span class="font-medium text-gray-900">
                                                ${item.locationType === 'primary' ? i18n.t('location.primary') : i18n.t('location.secondary')}
                                            </span>
                                            <span class="text-xs text-gray-500">
                                                ${DateUtils.format(item.effectiveDate, 'medium')}
                                            </span>
                                        </div>
                                        <div class="flex items-center gap-2 text-sm">
                                            ${fromLocation ? `
                                                <span class="text-gray-600">${isThai ? fromLocation.nameTh : fromLocation.nameEn}</span>
                                                <span class="material-icons text-sm text-gray-400">arrow_forward</span>
                                            ` : ''}
                                            <span class="text-gray-900 font-medium">
                                                ${toLocation ? (isThai ? toLocation.nameTh : toLocation.nameEn) : '-'}
                                            </span>
                                        </div>
                                        <p class="text-xs text-gray-500 mt-2">${item.reason}</p>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : `<p class="text-gray-500 text-center py-4">${i18n.t('location.noHistory')}</p>`,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        assignEmployee(locationId) {
            const location = MockLocationData.getLocation(locationId);
            const isThai = i18n.getLanguage() === 'th';

            ModalComponent.open({
                title: i18n.t('location.assignEmployee'),
                size: 'md',
                content: `
                    <form id="assign-employee-form" class="space-y-4">
                        <div class="bg-gray-50 rounded-lg p-3 mb-4">
                            <p class="text-sm text-gray-600">${i18n.t('location.assigningTo')}:</p>
                            <p class="font-medium text-gray-900">
                                ${location ? (isThai ? location.nameTh : location.nameEn) : '-'}
                            </p>
                        </div>
                        ${FormFieldComponent.text({
                            name: 'employeeId',
                            label: i18n.t('location.employeeId'),
                            placeholder: i18n.t('location.enterEmployeeId'),
                            required: true
                        })}
                        ${FormFieldComponent.select({
                            name: 'locationType',
                            label: i18n.t('location.assignmentType'),
                            required: true,
                            options: [
                                { value: 'primary', label: i18n.t('location.primary') },
                                { value: 'secondary', label: i18n.t('location.secondary') }
                            ]
                        })}
                        ${FormFieldComponent.date({
                            name: 'effectiveDate',
                            label: i18n.t('common.effectiveDate'),
                            required: true,
                            value: DateUtils.today(),
                            min: DateUtils.today()
                        })}
                        ${FormFieldComponent.textarea({
                            name: 'reason',
                            label: i18n.t('location.reason'),
                            placeholder: i18n.t('location.enterReason'),
                            rows: 3
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'LocationManagementPage.saveAssignment()' }
                ]
            });
        },

        async saveAssignment() {
            const formData = FormFieldComponent.getFormData('assign-employee-form');

            const validation = ValidationUtils.validateForm(formData, {
                employeeId: { required: true },
                locationType: { required: true },
                effectiveDate: { required: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                ToastComponent.error(i18n.t('error.validationFailed'));
                return;
            }

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));
                ToastComponent.success(i18n.t('toast.saveSuccess'));
                ModalComponent.close();
                this.refresh();
            } catch (error) {
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        editAssignment(assignmentId) {
            ToastComponent.info(i18n.t('location.editNotImplemented'));
        },

        refresh() {
            const content = document.getElementById('main-content');
            if (content) {
                content.innerHTML = this.render({
                    view: currentView,
                    locationId: selectedLocationId
                });
            }
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocationManagementPage;
}
