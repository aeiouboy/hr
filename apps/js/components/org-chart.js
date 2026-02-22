/**
 * Enhanced Organization Chart Component (Epic 1.1)
 * Interactive tree visualization with multi-company support,
 * cost center integration, reporting lines, and navigation features
 */

const OrgChartComponent = (function() {
    // Internal state
    let state = {
        scale: 1,
        translateX: 0,
        translateY: 0,
        isDragging: false,
        hasDragged: false,
        dragStartX: 0,
        dragStartY: 0,
        startX: 0,
        startY: 0,
        selectedCompany: null,
        selectedCostCenter: null,
        showVacant: true,
        showDottedLines: true,
        expandedNodes: new Set(),
        hoveredNode: null,
        sidePanelEmployeeId: null,
        parentMap: null
    };

    // Constants
    const MIN_SCALE = 0.25;
    const MAX_SCALE = 2;
    const SCALE_STEP = 0.1;
    const NODE_WIDTH = 180;
    const NODE_HEIGHT = 120;
    const NODE_GAP_X = 40;
    const NODE_GAP_Y = 80;

    /**
     * Reset state to defaults
     */
    function resetState() {
        state = {
            scale: 1,
            translateX: 0,
            translateY: 0,
            isDragging: false,
            hasDragged: false,
            dragStartX: 0,
            dragStartY: 0,
            startX: 0,
            startY: 0,
            selectedCompany: null,
            selectedCostCenter: null,
            showVacant: true,
            showDottedLines: true,
            expandedNodes: new Set(),
            hoveredNode: null,
            sidePanelEmployeeId: null,
            parentMap: null
        };
    }

    /**
     * Get translation strings
     */
    function t(key) {
        return i18n.t(`orgChart.${key}`);
    }

    return {
        /**
         * Render the enhanced organization chart
         * @param {object} options - Configuration options
         * @returns {string} HTML string
         */
        render(options = {}) {
            const {
                employeeId = null,
                companyId = 'C015',
                mode = 'full', // 'full', 'compact', 'mini'
                showFilters = true,
                showMinimap = true
            } = options;

            // Get org structure data
            const orgData = typeof MockOrgStructure !== 'undefined'
                ? MockOrgStructure.buildOrgChartData({
                    rootEmployeeId: null,
                    companyId: state.selectedCompany || companyId,
                    showVacant: state.showVacant,
                    showDottedLines: state.showDottedLines
                })
                : null;

            if (!orgData && mode === 'full') {
                return CardComponent.emptyState(
                    i18n.isThai() ? 'ไม่มีข้อมูลผังองค์กร' : 'No organization chart data'
                );
            }

            // For simple rendering without full org data
            if (mode === 'compact') {
                return this.renderCompact(options.data);
            }

            return `
                <div class="org-chart-wrapper" role="region" aria-label="${t('title')}">
                    ${showFilters ? this.renderFilters(companyId) : ''}

                    <div class="org-chart-main relative flex gap-0">
                        <!-- Toolbar -->
                        <div class="org-chart-toolbar absolute top-2 z-20 flex gap-2 bg-white rounded-lg shadow-md p-2" style="right: ${state.sidePanelEmployeeId ? '336px' : '8px'}">
                            ${this.renderToolbar()}
                        </div>

                        <!-- Main canvas area -->
                        <div id="org-chart-canvas"
                             class="org-chart-canvas overflow-hidden bg-gray-50 rounded-lg border border-gray-200 flex-1"
                             style="height: 600px; cursor: grab;"
                             role="application"
                             aria-label="${t('interactiveChart')}"
                             tabindex="0">
                            <div id="org-chart-content"
                                 class="org-chart-content"
                                 style="transform: translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale}); transform-origin: center center; transition: transform 0.1s ease-out;">
                                ${orgData ? this.renderTree(orgData) : ''}
                            </div>
                        </div>

                        <!-- Side Panel slot -->
                        <div id="org-chart-side-panel">
                            ${state.sidePanelEmployeeId ? this.renderSidePanel(state.sidePanelEmployeeId) : ''}
                        </div>

                        <!-- Minimap -->
                        ${showMinimap ? this.renderMinimap(orgData) : ''}
                    </div>

                    <!-- Legend -->
                    ${this.renderLegend()}
                </div>
            `;
        },

        /**
         * Render filter controls
         */
        renderFilters(defaultCompanyId) {
            const companies = typeof MockOrgStructure !== 'undefined'
                ? MockOrgStructure.companies
                : [];

            const costCenters = typeof MockOrgStructure !== 'undefined'
                ? MockOrgStructure.getCostCenters({ companyId: state.selectedCompany || defaultCompanyId })
                : [];

            return `
                <div class="org-chart-filters bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                    <div class="flex flex-wrap gap-4 items-end">
                        <!-- Company Filter -->
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="org-company-filter">
                                ${t('filterByCompany')}
                            </label>
                            <select id="org-company-filter"
                                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red"
                                    onchange="OrgChartComponent.handleCompanyFilter(this.value)"
                                    aria-describedby="company-filter-desc">
                                <option value="">${i18n.t('common.all')}</option>
                                ${companies.map(c => `
                                    <option value="${c.id}" ${state.selectedCompany === c.id ? 'selected' : ''}>
                                        ${i18n.isThai() ? c.nameTh : c.nameEn} (${c.code})
                                    </option>
                                `).join('')}
                            </select>
                            <span id="company-filter-desc" class="sr-only">${t('filterByCompanyDesc')}</span>
                        </div>

                        <!-- Cost Center Filter -->
                        <div class="flex-1 min-w-[200px]">
                            <label class="block text-sm font-medium text-gray-700 mb-1" for="org-costcenter-filter">
                                ${t('filterByCostCenter')}
                            </label>
                            <select id="org-costcenter-filter"
                                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red"
                                    onchange="OrgChartComponent.handleCostCenterFilter(this.value)"
                                    aria-describedby="costcenter-filter-desc">
                                <option value="">${i18n.t('common.all')}</option>
                                ${costCenters.map(cc => `
                                    <option value="${cc}" ${state.selectedCostCenter === cc ? 'selected' : ''}>
                                        ${cc}
                                    </option>
                                `).join('')}
                            </select>
                            <span id="costcenter-filter-desc" class="sr-only">${t('filterByCostCenterDesc')}</span>
                        </div>

                        <!-- Toggle Options -->
                        <div class="flex gap-4">
                            <label class="inline-flex items-center cursor-pointer">
                                <input type="checkbox"
                                       id="show-vacant-toggle"
                                       class="sr-only peer"
                                       ${state.showVacant ? 'checked' : ''}
                                       onchange="OrgChartComponent.toggleVacant(this.checked)">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cg-red/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cg-red relative"></div>
                                <span class="ms-2 text-sm font-medium text-gray-700">${t('showVacant')}</span>
                            </label>

                            <label class="inline-flex items-center cursor-pointer">
                                <input type="checkbox"
                                       id="show-dotted-toggle"
                                       class="sr-only peer"
                                       ${state.showDottedLines ? 'checked' : ''}
                                       onchange="OrgChartComponent.toggleDottedLines(this.checked)">
                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cg-red/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cg-red relative"></div>
                                <span class="ms-2 text-sm font-medium text-gray-700">${t('showDottedLines')}</span>
                            </label>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render zoom/pan toolbar
         */
        renderToolbar() {
            return `
                <button onclick="OrgChartComponent.zoomIn()"
                        class="p-2 hover:bg-gray-100 rounded-lg transition"
                        aria-label="${t('zoomIn')}"
                        title="${t('zoomIn')}">
                    <span class="material-icons text-gray-600">add</span>
                </button>
                <button onclick="OrgChartComponent.zoomOut()"
                        class="p-2 hover:bg-gray-100 rounded-lg transition"
                        aria-label="${t('zoomOut')}"
                        title="${t('zoomOut')}">
                    <span class="material-icons text-gray-600">remove</span>
                </button>
                <button onclick="OrgChartComponent.resetView()"
                        class="p-2 hover:bg-gray-100 rounded-lg transition"
                        aria-label="${t('resetView')}"
                        title="${t('resetView')}">
                    <span class="material-icons text-gray-600">center_focus_strong</span>
                </button>
                <button onclick="OrgChartComponent.fitToScreen()"
                        class="p-2 hover:bg-gray-100 rounded-lg transition"
                        aria-label="${t('fitToScreen')}"
                        title="${t('fitToScreen')}">
                    <span class="material-icons text-gray-600">fit_screen</span>
                </button>
                <span class="text-xs text-gray-500 px-2 self-center">${Math.round(state.scale * 100)}%</span>
            `;
        },

        /**
         * Render the org chart tree recursively
         */
        renderTree(node, depth = 0) {
            if (!node) return '';

            const hasChildren = (node.children && node.children.length > 0) ||
                               (node.vacantPositions && node.vacantPositions.length > 0);
            const isExpanded = state.expandedNodes.has(node.id) || depth < 2;

            return `
                <div class="org-tree-node-container" data-depth="${depth}">
                    <div class="flex flex-col items-center">
                        <!-- Node Card -->
                        ${this.renderNode(node, depth === 0)}

                        <!-- Children container -->
                        ${hasChildren && isExpanded ? `
                            <div class="flex flex-col items-center">
                                <!-- Vertical connector from parent -->
                                <div class="w-0.5 h-8 bg-gray-300"></div>

                                <!-- Children row -->
                                <div class="relative">
                                    <!-- Horizontal connector line -->
                                    ${(node.children?.length > 1 || node.vacantPositions?.length > 0) ? `
                                        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gray-300"
                                             style="width: ${Math.max((node.children?.length || 0) + (state.showVacant ? (node.vacantPositions?.length || 0) : 0) - 1, 0) * (NODE_WIDTH + NODE_GAP_X)}px"></div>
                                    ` : ''}

                                    <div class="flex gap-8 pt-8">
                                        <!-- Direct reports (solid line) -->
                                        ${node.children?.map(child => `
                                            <div class="flex flex-col items-center">
                                                <div class="w-0.5 h-8 bg-gray-300 -mt-8"></div>
                                                ${this.renderTree(child, depth + 1)}
                                            </div>
                                        `).join('') || ''}

                                        <!-- Vacant positions -->
                                        ${state.showVacant && node.vacantPositions?.map(vp => `
                                            <div class="flex flex-col items-center">
                                                <div class="w-0.5 h-8 bg-gray-300 -mt-8 border-dashed"></div>
                                                ${this.renderVacantNode(vp)}
                                            </div>
                                        `).join('') || ''}
                                    </div>
                                </div>
                            </div>
                        ` : ''}

                        <!-- Expand/Collapse button -->
                        ${hasChildren ? `
                            <button class="mt-1 p-1 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition"
                                    onclick="OrgChartComponent.toggleExpand('${node.id}')"
                                    aria-expanded="${isExpanded}"
                                    aria-label="${isExpanded ? t('collapse') : t('expand')}">
                                <span class="material-icons text-sm text-gray-500">
                                    ${isExpanded ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>
                        ` : ''}
                    </div>

                    <!-- Dotted line relationships (rendered as floating connectors) -->
                    ${state.showDottedLines && node.dottedLines?.length > 0 ? `
                        <div class="dotted-lines-indicator absolute -right-2 top-1/2 transform -translate-y-1/2">
                            ${node.dottedLines.map((dl, idx) => `
                                <div class="dotted-line-marker inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full mb-1 cursor-pointer hover:bg-blue-100"
                                     onclick="OrgChartComponent.showDottedLineTooltip('${node.id}', ${idx}, event)"
                                     title="${dl.label || t('matrixRelationship')}">
                                    <span class="material-icons text-xs">link</span>
                                    <span>${dl.name?.split(' ')[0] || ''}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render a single employee node
         */
        renderNode(node, isRoot = false) {
            const currentUser = AppState.get('currentUser');
            const isCurrentUser = node.employeeId === currentUser?.employeeId;
            const headcountLabel = node.headcount !== undefined && node.budget !== undefined
                ? `${node.headcount}/${node.budget}`
                : '';

            const borderColor = isCurrentUser
                ? 'border-cg-red ring-2 ring-cg-red/20'
                : isRoot
                    ? 'border-amber-400 ring-2 ring-amber-400/20'
                    : 'border-gray-200';
            const bgColor = isCurrentUser
                ? 'bg-red-50'
                : isRoot
                    ? 'bg-amber-50'
                    : 'bg-white';

            return `
                <div class="org-node ${bgColor} border-2 ${borderColor} rounded-lg p-3 shadow-sm hover:shadow-lg transition cursor-pointer relative"
                     style="width: ${NODE_WIDTH}px; min-height: ${NODE_HEIGHT}px;"
                     onclick="OrgChartComponent.handleNodeClick('${node.employeeId}')"
                     onmouseenter="OrgChartComponent.showNodeTooltip('${node.id}', event)"
                     onmouseleave="OrgChartComponent.hideNodeTooltip()"
                     role="button"
                     tabindex="0"
                     aria-label="${node.name}, ${node.title}"
                     data-employee-id="${node.employeeId}"
                     data-cost-center="${node.costCenter || ''}">
                    <div class="flex flex-col items-center text-center">
                        <!-- Photo -->
                        <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md mb-2 flex-shrink-0">
                            <img src="${node.photo || 'https://via.placeholder.com/56'}"
                                 alt="${node.name}"
                                 class="w-full h-full object-cover"
                                 onerror="this.src='https://via.placeholder.com/56?text=${encodeURIComponent(node.name?.charAt(0) || 'U')}'">
                        </div>

                        <!-- Name -->
                        <p class="font-medium text-sm text-gray-900 truncate w-full" title="${node.name}">
                            ${node.name}
                        </p>

                        <!-- Title -->
                        <p class="text-xs text-gray-500 truncate w-full" title="${node.title}">
                            ${node.title}
                        </p>

                        <!-- Department & Cost Center -->
                        ${node.costCenter ? `
                            <p class="text-xs text-gray-400 mt-1 truncate w-full" title="${t('costCenter')}: ${node.costCenter}">
                                <span class="material-icons text-xs align-middle">account_balance</span>
                                ${node.costCenter}
                            </p>
                        ` : ''}

                        <!-- Headcount indicator -->
                        ${headcountLabel ? `
                            <div class="mt-1 flex items-center gap-1">
                                <span class="text-xs px-2 py-0.5 rounded-full ${node.headcount < node.budget ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}">
                                    <span class="material-icons text-xs align-middle">group</span>
                                    ${headcountLabel}
                                </span>
                            </div>
                        ` : ''}

                        <!-- Current user indicator -->
                        ${isCurrentUser ? `
                            <span class="mt-1 text-xs text-cg-red font-medium">(${t('you')})</span>
                        ` : ''}
                    </div>

                    <!-- Dotted line indicator badge -->
                    ${state.showDottedLines && node.dottedLines?.length > 0 ? `
                        <div class="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center"
                             title="${t('hasDottedLine')}">
                            ${node.dottedLines.length}
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render a vacant position node
         */
        renderVacantNode(position) {
            return `
                <div class="org-node-vacant bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-md transition relative"
                     style="width: ${NODE_WIDTH}px; min-height: 100px;"
                     role="article"
                     aria-label="${t('vacantPosition')}: ${position.title}">
                    <div class="flex flex-col items-center text-center">
                        <!-- Vacant icon -->
                        <div class="w-14 h-14 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 mb-2 flex items-center justify-center">
                            <span class="material-icons text-2xl text-gray-400">person_add</span>
                        </div>

                        <!-- Position title -->
                        <p class="font-medium text-sm text-gray-600 truncate w-full" title="${position.title}">
                            ${position.title}
                        </p>

                        <!-- Vacant label -->
                        <span class="mt-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                            ${t('vacant')}
                        </span>

                        <!-- Cost Center -->
                        ${position.costCenter ? `
                            <p class="text-xs text-gray-400 mt-1 truncate w-full">
                                <span class="material-icons text-xs align-middle">account_balance</span>
                                ${position.costCenter}
                            </p>
                        ` : ''}

                        <!-- Requisition ID -->
                        ${position.requisitionId ? `
                            <p class="text-xs text-gray-400 mt-0.5" title="${t('requisition')}: ${position.requisitionId}">
                                REQ: ${position.requisitionId}
                            </p>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Render minimap for navigation
         */
        renderMinimap(orgData) {
            if (!orgData) return '';

            return `
                <div id="org-chart-minimap"
                     class="absolute bottom-4 left-4 w-48 h-32 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden z-10"
                     role="img"
                     aria-label="${t('minimap')}">
                    <div class="minimap-header bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 border-b border-gray-200">
                        ${t('minimap')}
                    </div>
                    <div class="minimap-content relative h-full p-2">
                        <!-- Simplified tree view -->
                        <div class="minimap-tree transform scale-[0.15] origin-top-left">
                            ${this.renderMinimapTree(orgData)}
                        </div>
                        <!-- Viewport indicator -->
                        <div id="minimap-viewport"
                             class="absolute border-2 border-cg-red bg-cg-red/10 rounded cursor-move"
                             style="width: 30%; height: 30%; top: 35%; left: 35%;">
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render simplified tree for minimap
         */
        renderMinimapTree(node, depth = 0) {
            if (!node || depth > 3) return '';

            return `
                <div class="flex flex-col items-center">
                    <div class="w-4 h-3 bg-gray-400 rounded-sm mb-1"></div>
                    ${node.children?.length > 0 ? `
                        <div class="w-px h-2 bg-gray-300"></div>
                        <div class="flex gap-2">
                            ${node.children.slice(0, 5).map(child =>
                                this.renderMinimapTree(child, depth + 1)
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render legend
         */
        renderLegend() {
            return `
                <div class="org-chart-legend mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <h4 class="text-sm font-medium text-gray-700 mb-3">${t('legend')}</h4>
                    <div class="flex flex-wrap gap-6">
                        <!-- Solid line -->
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-0.5 bg-gray-400"></div>
                            <span class="text-xs text-gray-600">${t('directReporting')}</span>
                        </div>
                        <!-- Dotted line -->
                        <div class="flex items-center gap-2">
                            <div class="w-8 h-0.5 border-t-2 border-dashed border-blue-400"></div>
                            <span class="text-xs text-gray-600">${t('matrixReporting')}</span>
                        </div>
                        <!-- Current user -->
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 border-2 border-cg-red bg-red-50 rounded"></div>
                            <span class="text-xs text-gray-600">${t('currentUser')}</span>
                        </div>
                        <!-- Root/Executive -->
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 border-2 border-amber-400 bg-amber-50 rounded"></div>
                            <span class="text-xs text-gray-600">${t('executive')}</span>
                        </div>
                        <!-- Vacant -->
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 border-2 border-dashed border-gray-300 bg-gray-100 rounded"></div>
                            <span class="text-xs text-gray-600">${t('vacant')}</span>
                        </div>
                        <!-- Headcount -->
                        <div class="flex items-center gap-2">
                            <span class="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                <span class="material-icons text-xs align-middle">group</span> X/Y
                            </span>
                            <span class="text-xs text-gray-600">${t('headcountBudget')}</span>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render compact org chart (inline version for profile page)
         */
        renderCompact(data) {
            if (!data) return '';

            const { supervisor, employee, directReports = [] } = data;

            return `
                <div class="flex flex-col gap-4">
                    ${supervisor ? `
                        <div class="flex items-center gap-3">
                            <span class="text-sm text-gray-500 w-24">${i18n.t('employment.supervisor')}:</span>
                            <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition"
                                 onclick="OrgChartComponent.handleNodeClick('${supervisor.id}')">
                                <img src="${supervisor.photo}" alt="${supervisor.name}"
                                     class="w-8 h-8 rounded-full object-cover">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">${supervisor.name}</p>
                                    <p class="text-xs text-gray-500">${supervisor.title}</p>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    ${directReports.length > 0 ? `
                        <div>
                            <p class="text-sm text-gray-500 mb-2">${i18n.t('home.directReports')} (${directReports.length}):</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                ${directReports.map(report => `
                                    <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                                         onclick="OrgChartComponent.handleNodeClick('${report.id}')">
                                        <img src="${report.photo}" alt="${report.name}"
                                             class="w-8 h-8 rounded-full object-cover">
                                        <div class="min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate">${report.name}</p>
                                            <p class="text-xs text-gray-500 truncate">${report.title}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Initialize event handlers
         */
        init() {
            const canvas = document.getElementById('org-chart-canvas');
            if (!canvas) return;

            // Mouse events for panning
            canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
            canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
            canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
            canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));

            // Touch events for mobile
            canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
            canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
            canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));

            // Wheel event for zooming
            canvas.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });

            // Keyboard navigation
            canvas.addEventListener('keydown', this.handleKeydown.bind(this));

            // Fit chart then center on current user
            this.fitToScreen();
            // Use setTimeout to ensure DOM has rendered before measuring
            setTimeout(() => this.centerOnCurrentUser(), 100);
        },

        /**
         * Handle mouse down for panning
         */
        handleMouseDown(e) {
            if (e.target.closest('button')) return; // allow buttons, but NOT org-node

            state.isDragging = true;
            state.hasDragged = false;
            state.dragStartX = e.clientX;
            state.dragStartY = e.clientY;
            state.startX = e.clientX - state.translateX;
            state.startY = e.clientY - state.translateY;

            const canvas = document.getElementById('org-chart-canvas');
            if (canvas) canvas.style.cursor = 'grabbing';
        },

        /**
         * Handle mouse move for panning
         */
        handleMouseMove(e) {
            if (!state.isDragging) return;

            const dx = Math.abs(e.clientX - state.dragStartX);
            const dy = Math.abs(e.clientY - state.dragStartY);
            if (dx > 5 || dy > 5) {
                state.hasDragged = true;
            }

            state.translateX = e.clientX - state.startX;
            state.translateY = e.clientY - state.startY;
            this.updateTransform();
        },

        /**
         * Handle mouse up
         */
        handleMouseUp() {
            state.isDragging = false;
            // Reset hasDragged after a microtask so the click handler can check it
            setTimeout(() => { state.hasDragged = false; }, 0);
            const canvas = document.getElementById('org-chart-canvas');
            if (canvas) canvas.style.cursor = 'grab';
        },

        /**
         * Handle touch start
         */
        handleTouchStart(e) {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                if (!e.target.closest('.org-node, button')) {
                    e.preventDefault();
                    state.isDragging = true;
                    state.startX = touch.clientX - state.translateX;
                    state.startY = touch.clientY - state.translateY;
                }
            }
        },

        /**
         * Handle touch move
         */
        handleTouchMove(e) {
            if (!state.isDragging || e.touches.length !== 1) return;
            e.preventDefault();

            const touch = e.touches[0];
            state.translateX = touch.clientX - state.startX;
            state.translateY = touch.clientY - state.startY;
            this.updateTransform();
        },

        /**
         * Handle touch end
         */
        handleTouchEnd() {
            state.isDragging = false;
            setTimeout(() => { state.hasDragged = false; }, 0);
        },

        /**
         * Handle mouse wheel for zooming
         */
        handleWheel(e) {
            e.preventDefault();

            const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
            const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, state.scale + delta));

            if (newScale !== state.scale) {
                // Zoom towards cursor position
                const canvas = document.getElementById('org-chart-canvas');
                if (canvas) {
                    const rect = canvas.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;

                    const scaleRatio = newScale / state.scale;
                    state.translateX = mouseX - (mouseX - state.translateX) * scaleRatio;
                    state.translateY = mouseY - (mouseY - state.translateY) * scaleRatio;
                }

                state.scale = newScale;
                this.updateTransform();
                this.updateToolbar();
            }
        },

        /**
         * Handle keyboard navigation
         */
        handleKeydown(e) {
            const step = 50;
            switch (e.key) {
                case 'ArrowUp':
                    state.translateY += step;
                    break;
                case 'ArrowDown':
                    state.translateY -= step;
                    break;
                case 'ArrowLeft':
                    state.translateX += step;
                    break;
                case 'ArrowRight':
                    state.translateX -= step;
                    break;
                case '+':
                case '=':
                    this.zoomIn();
                    return;
                case '-':
                    this.zoomOut();
                    return;
                case '0':
                    this.resetView();
                    return;
                case 'Escape':
                    this.closeSidePanel();
                    return;
                default:
                    return;
            }
            e.preventDefault();
            this.updateTransform();
        },

        /**
         * Update transform on content
         */
        updateTransform() {
            const content = document.getElementById('org-chart-content');
            if (content) {
                content.style.transform = `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`;
            }
            this.updateMinimap();
        },

        /**
         * Update toolbar zoom display
         */
        updateToolbar() {
            const toolbar = document.querySelector('.org-chart-toolbar');
            if (toolbar) {
                toolbar.innerHTML = this.renderToolbar();
            }
        },

        /**
         * Update minimap viewport indicator
         */
        updateMinimap() {
            const viewport = document.getElementById('minimap-viewport');
            if (!viewport) return;

            // Calculate viewport position based on translate and scale
            const canvas = document.getElementById('org-chart-canvas');
            if (!canvas) return;

            const canvasRect = canvas.getBoundingClientRect();
            const viewportSize = 100 / state.scale;
            const viewportX = 50 - (state.translateX / canvasRect.width * 100);
            const viewportY = 50 - (state.translateY / canvasRect.height * 100);

            viewport.style.width = `${Math.min(viewportSize, 100)}%`;
            viewport.style.height = `${Math.min(viewportSize, 100)}%`;
            viewport.style.left = `${Math.max(0, Math.min(viewportX - viewportSize/2, 100 - viewportSize))}%`;
            viewport.style.top = `${Math.max(0, Math.min(viewportY - viewportSize/2, 100 - viewportSize))}%`;
        },

        /**
         * Zoom in
         */
        zoomIn() {
            state.scale = Math.min(MAX_SCALE, state.scale + SCALE_STEP);
            this.updateTransform();
            this.updateToolbar();
        },

        /**
         * Zoom out
         */
        zoomOut() {
            state.scale = Math.max(MIN_SCALE, state.scale - SCALE_STEP);
            this.updateTransform();
            this.updateToolbar();
        },

        /**
         * Reset view to default
         */
        resetView() {
            state.scale = 1;
            state.translateX = 0;
            state.translateY = 0;
            this.updateTransform();
            this.updateToolbar();
        },

        /**
         * Fit chart to screen
         */
        fitToScreen() {
            const canvas = document.getElementById('org-chart-canvas');
            const content = document.getElementById('org-chart-content');
            if (!canvas || !content) return;

            // Calculate content bounds
            const canvasRect = canvas.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();

            // Calculate scale to fit
            const scaleX = canvasRect.width / (contentRect.width / state.scale);
            const scaleY = canvasRect.height / (contentRect.height / state.scale);
            const newScale = Math.min(scaleX, scaleY, 1) * 0.9; // 90% to add padding

            state.scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));

            // Center the content
            state.translateX = (canvasRect.width - contentRect.width * newScale / state.scale) / 2;
            state.translateY = 50; // Some top padding

            this.updateTransform();
            this.updateToolbar();
        },

        /**
         * Center the canvas view on the current user's node
         */
        centerOnCurrentUser() {
            const currentUser = AppState.get('currentUser');
            if (!currentUser?.employeeId) return;

            const canvas = document.getElementById('org-chart-canvas');
            const node = document.querySelector(`[data-employee-id="${currentUser.employeeId}"]`);
            if (!canvas || !node) return;

            const canvasRect = canvas.getBoundingClientRect();
            const nodeRect = node.getBoundingClientRect();

            // Calculate where the node currently is relative to canvas, accounting for current transform
            const nodeCenterX = nodeRect.left + nodeRect.width / 2 - canvasRect.left;
            const nodeCenterY = nodeRect.top + nodeRect.height / 2 - canvasRect.top;

            // Shift translate so node lands in center of canvas
            state.translateX += canvasRect.width / 2 - nodeCenterX;
            state.translateY += canvasRect.height / 2 - nodeCenterY;

            this.updateTransform();
        },

        /**
         * Toggle node expansion
         */
        toggleExpand(nodeId) {
            if (state.expandedNodes.has(nodeId)) {
                state.expandedNodes.delete(nodeId);
            } else {
                state.expandedNodes.add(nodeId);
            }
            this.refresh();
        },

        /**
         * Handle company filter change
         */
        handleCompanyFilter(companyId) {
            state.selectedCompany = companyId || null;
            state.selectedCostCenter = null; // Reset cost center filter
            this.refresh();
        },

        /**
         * Handle cost center filter change
         */
        handleCostCenterFilter(costCenter) {
            state.selectedCostCenter = costCenter || null;
            this.refresh();
        },

        /**
         * Toggle vacant positions visibility
         */
        toggleVacant(show) {
            state.showVacant = show;
            this.refresh();
        },

        /**
         * Toggle dotted lines visibility
         */
        toggleDottedLines(show) {
            state.showDottedLines = show;
            this.refresh();
        },

        /**
         * Refresh the chart
         */
        refresh() {
            const container = document.querySelector('.org-chart-wrapper')?.parentElement;
            if (container) {
                // Preserve current state
                const savedState = { ...state };
                container.innerHTML = this.render({
                    showFilters: true,
                    showMinimap: true
                });
                // Restore state
                Object.assign(state, savedState);
                this.init();
            }
        },

        /**
         * Handle node click
         */
        handleNodeClick(employeeId) {
            // Ignore clicks that were actually drags
            if (state.hasDragged) return;

            const currentUser = AppState.get('currentUser');

            if (typeof RBAC !== 'undefined' && !RBAC.canViewEmployee(employeeId) && employeeId !== currentUser?.employeeId) {
                ToastComponent.info(i18n.isThai()
                    ? 'คุณไม่มีสิทธิ์ดูข้อมูลพนักงานนี้'
                    : 'You do not have permission to view this employee');
                return;
            }

            this.openSidePanel(employeeId);
        },

        /**
         * Find a node in the org tree by employeeId (BFS)
         */
        findNodeById(root, employeeId) {
            if (!root) return null;
            const queue = [root];
            while (queue.length > 0) {
                const node = queue.shift();
                if (node.employeeId === employeeId) return node;
                if (node.children) queue.push(...node.children);
            }
            return null;
        },

        /**
         * Build a parent map: { childEmployeeId -> parentNode }
         */
        buildParentMap(node, parentNode, map) {
            if (!node) return;
            if (parentNode) map[node.employeeId] = parentNode;
            (node.children || []).forEach(child => this.buildParentMap(child, node, map));
        },

        /**
         * Render the employee side panel
         */
        renderSidePanel(employeeId) {
            if (!employeeId) return '';

            const orgData = typeof MockOrgStructure !== 'undefined'
                ? MockOrgStructure.buildOrgChartData({ showVacant: false, showDottedLines: false })
                : null;

            const node = this.findNodeById(orgData, employeeId);
            if (!node) return '';

            const manager = state.parentMap?.[employeeId] || null;
            const directReports = node.children || [];
            const visibleReports = directReports.slice(0, 3);
            const extraCount = directReports.length - visibleReports.length;
            const currentUser = AppState.get('currentUser');
            const canViewProfile = typeof RBAC !== 'undefined'
                ? (RBAC.canViewEmployee(employeeId) || employeeId === currentUser?.employeeId)
                : true;

            return `
                <div class="org-side-panel w-80 bg-white border-l border-gray-200 shadow-xl flex flex-col animate-slide-in"
                     style="height: 600px; overflow-y: auto;">
                    <div class="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                        <h3 class="text-sm font-semibold text-gray-700">${t('employee')}</h3>
                        <button onclick="OrgChartComponent.closeSidePanel()"
                                class="p-1 hover:bg-gray-100 rounded-lg transition"
                                aria-label="Close panel">
                            <span class="material-icons text-gray-500 text-lg">close</span>
                        </button>
                    </div>

                    <div class="p-4 flex flex-col items-center text-center border-b border-gray-100">
                        <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md mb-3">
                            <img src="${node.photo || 'https://via.placeholder.com/64'}"
                                 alt="${node.name}"
                                 class="w-full h-full object-cover"
                                 onerror="this.src='https://via.placeholder.com/64?text=${encodeURIComponent(node.name?.charAt(0) || 'U')}'">
                        </div>
                        <p class="font-semibold text-gray-900">${node.name}</p>
                        <p class="text-sm text-gray-500 mt-0.5">${node.title}</p>
                        ${node.costCenter ? `
                            <p class="text-xs text-gray-400 mt-1">
                                <span class="material-icons text-xs align-middle">account_balance</span>
                                ${node.costCenter}
                            </p>
                        ` : ''}
                    </div>

                    <div class="p-4 border-b border-gray-100 space-y-2">
                        ${node.email ? `
                            <div class="flex items-center gap-2 text-sm">
                                <span class="material-icons text-gray-400 text-base">email</span>
                                <a href="mailto:${node.email}" class="text-cg-red hover:underline truncate">${node.email}</a>
                            </div>
                        ` : ''}
                        ${node.phone ? `
                            <div class="flex items-center gap-2 text-sm">
                                <span class="material-icons text-gray-400 text-base">phone</span>
                                <span class="text-gray-700">${node.phone}</span>
                            </div>
                        ` : ''}
                    </div>

                    <div class="p-4 border-b border-gray-100">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">${t('sidePanel.manager')}</p>
                        ${manager ? `
                            <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition"
                                 onclick="OrgChartComponent.openSidePanel('${manager.employeeId}')">
                                <img src="${manager.photo || 'https://via.placeholder.com/32'}"
                                     alt="${manager.name}"
                                     class="w-8 h-8 rounded-full object-cover border border-gray-200">
                                <div class="min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate">${manager.name}</p>
                                    <p class="text-xs text-gray-500 truncate">${manager.title}</p>
                                </div>
                            </div>
                        ` : `<p class="text-sm text-gray-400">${t('sidePanel.noManager')}</p>`}
                    </div>

                    <div class="p-4 border-b border-gray-100">
                        <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                            ${t('sidePanel.directReports')} (${directReports.length})
                        </p>
                        ${directReports.length === 0 ? `
                            <p class="text-sm text-gray-400">${t('sidePanel.noDirectReports')}</p>
                        ` : `
                            <div class="space-y-1">
                                ${visibleReports.map(r => `
                                    <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition"
                                         onclick="OrgChartComponent.openSidePanel('${r.employeeId}')">
                                        <img src="${r.photo || 'https://via.placeholder.com/28'}"
                                             alt="${r.name}"
                                             class="w-7 h-7 rounded-full object-cover border border-gray-200">
                                        <div class="min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate">${r.name}</p>
                                            <p class="text-xs text-gray-500 truncate">${r.title}</p>
                                        </div>
                                    </div>
                                `).join('')}
                                ${extraCount > 0 ? `
                                    <p class="text-xs text-gray-400 pl-1">
                                        ${t('sidePanel.andMore').replace('{n}', extraCount)}
                                    </p>
                                ` : ''}
                            </div>
                        `}
                    </div>

                    ${canViewProfile ? `
                    <div class="p-4 mt-auto sticky bottom-0 bg-white border-t border-gray-100">
                        <button onclick="Router.navigate('profile', { id: '${node.employeeId}' })"
                                class="w-full bg-cg-red text-white py-2 px-4 rounded-lg hover:bg-red-700 transition text-sm font-medium">
                            ${t('viewProfile')}
                        </button>
                    </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Open the side panel for an employee
         */
        openSidePanel(employeeId) {
            if (state.hasDragged) return;

            // RBAC check — only allow viewing own profile or if user has permission
            const currentUser = AppState.get('currentUser');
            if (typeof RBAC !== 'undefined' && !RBAC.canViewEmployee(employeeId) && employeeId !== currentUser?.employeeId) {
                ToastComponent.info(i18n.isThai()
                    ? 'คุณไม่มีสิทธิ์ดูข้อมูลพนักงานนี้'
                    : 'You do not have permission to view this employee');
                return;
            }

            state.sidePanelEmployeeId = employeeId;

            // Build parent map if not cached
            if (!state.parentMap) {
                state.parentMap = {};
                const orgData = typeof MockOrgStructure !== 'undefined'
                    ? MockOrgStructure.buildOrgChartData({ showVacant: false, showDottedLines: false })
                    : null;
                this.buildParentMap(orgData, null, state.parentMap);
            }

            const panelSlot = document.getElementById('org-chart-side-panel');
            if (panelSlot) {
                panelSlot.innerHTML = this.renderSidePanel(employeeId);
            }
            const toolbar = document.querySelector('.org-chart-toolbar');
            if (toolbar) toolbar.style.right = '336px';
        },

        /**
         * Close the side panel
         */
        closeSidePanel() {
            state.sidePanelEmployeeId = null;
            const panelSlot = document.getElementById('org-chart-side-panel');
            if (panelSlot) panelSlot.innerHTML = '';
            const toolbar = document.querySelector('.org-chart-toolbar');
            if (toolbar) toolbar.style.right = '8px';
        },

        /**
         * Show node tooltip on hover
         */
        showNodeTooltip(nodeId, event) {
            state.hoveredNode = nodeId;
            // Tooltip implementation can be enhanced with a tooltip component
        },

        /**
         * Hide node tooltip
         */
        hideNodeTooltip() {
            state.hoveredNode = null;
        },

        /**
         * Show dotted line relationship tooltip
         */
        showDottedLineTooltip(nodeId, lineIndex, event) {
            event.stopPropagation();

            const orgData = typeof MockOrgStructure !== 'undefined'
                ? MockOrgStructure.buildOrgChartData({})
                : null;

            // Find the node and dotted line info
            // This would show a tooltip with relationship details
            ToastComponent.info(i18n.isThai()
                ? 'ดูรายละเอียดความสัมพันธ์แบบเมทริกซ์'
                : 'View matrix relationship details');
        },

        /**
         * Reset component state (for testing/cleanup)
         */
        reset() {
            resetState();
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrgChartComponent;
}
