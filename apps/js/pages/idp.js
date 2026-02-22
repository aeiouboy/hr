/**
 * Individual Development Plan (IDP) Page
 * Competency gap analysis, development actions, progress tracking, and portfolio
 */

const IDPPage = (function() {
    let currentTab = 'gap-analysis';
    let selectedYear = new Date().getFullYear();
    let selectedIdp = null;

    return {
        /**
         * Render IDP page
         * @returns {string}
         */
        render() {
            const employee = AppState.get('currentEmployee');

            if (!employee) {
                return this.renderSkeleton();
            }

            const tabs = [
                { id: 'gap-analysis', label: i18n.t('idp.gapAnalysis'), icon: 'trending_up' },
                { id: 'development-actions', label: i18n.t('idp.developmentActions'), icon: 'assignment' },
                { id: 'idp-form', label: i18n.t('idp.idpForm'), icon: 'description' },
                { id: 'progress', label: i18n.t('idp.progressTracking'), icon: 'track_changes' },
                { id: 'portfolio', label: i18n.t('idp.portfolio'), icon: 'folder_shared' }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 py-6">
                    <!-- Page Header -->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('idp.title')}</h1>
                        <p class="text-gray-600 mt-1">${i18n.t('idp.subtitle')}</p>
                    </div>

                    <!-- Tab Navigation -->
                    <div class="bg-white rounded-lg shadow mb-6" role="tablist" aria-label="${i18n.t('idp.title')}">
                        <div class="border-b border-gray-200 overflow-x-auto">
                            <nav class="flex -mb-px min-w-max" aria-label="${i18n.t('idp.tabs')}">
                                ${tabs.map(tab => `
                                    <button
                                        role="tab"
                                        aria-selected="${currentTab === tab.id}"
                                        aria-controls="${tab.id}-panel"
                                        id="${tab.id}-tab"
                                        class="flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                            currentTab === tab.id
                                                ? 'border-cg-red text-cg-red'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }"
                                        onclick="IDPPage.switchTab('${tab.id}')"
                                    >
                                        <span class="material-icons text-lg">${tab.icon}</span>
                                        ${tab.label}
                                    </button>
                                `).join('')}
                            </nav>
                        </div>
                    </div>

                    <!-- Tab Content -->
                    <div id="idp-content" role="tabpanel" aria-labelledby="${currentTab}-tab">
                        ${this.renderTabContent(employee)}
                    </div>
                </div>
            `;
        },

        /**
         * Render tab content based on current tab
         */
        renderTabContent(employee) {
            switch (currentTab) {
                case 'gap-analysis':
                    return this.renderGapAnalysis(employee);
                case 'development-actions':
                    return this.renderDevelopmentActions(employee);
                case 'idp-form':
                    return this.renderIDPForm(employee);
                case 'progress':
                    return this.renderProgressTracking(employee);
                case 'portfolio':
                    return this.renderPortfolio(employee);
                default:
                    return this.renderGapAnalysis(employee);
            }
        },

        /**
         * Render Competency Gap Analysis tab
         */
        renderGapAnalysis(employee) {
            const competencies = MockIDPData.getEmployeeCompetencies(employee.employeeId);

            if (!competencies || competencies.length === 0) {
                return CardComponent.render({
                    id: 'gap-analysis-card',
                    title: i18n.t('idp.gapAnalysis'),
                    icon: 'trending_up',
                    content: CardComponent.emptyState(i18n.t('idp.noCompetencyData'))
                });
            }

            // Calculate summary statistics
            const totalGaps = competencies.reduce((sum, c) => sum + (c.requiredLevel - c.currentLevel), 0);
            const highPriorityCount = competencies.filter(c => c.priority === 'high').length;
            const avgGap = (totalGaps / competencies.length).toFixed(1);

            const summaryCards = `
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-blue-600">${competencies.length}</p>
                        <p class="text-sm text-gray-600">${i18n.t('idp.totalCompetencies')}</p>
                    </div>
                    <div class="bg-red-50 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-red-600">${highPriorityCount}</p>
                        <p class="text-sm text-gray-600">${i18n.t('idp.highPriorityGaps')}</p>
                    </div>
                    <div class="bg-yellow-50 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-yellow-600">${totalGaps}</p>
                        <p class="text-sm text-gray-600">${i18n.t('idp.totalGapLevels')}</p>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-green-600">${avgGap}</p>
                        <p class="text-sm text-gray-600">${i18n.t('idp.averageGap')}</p>
                    </div>
                </div>
            `;

            const competencyRows = competencies
                .sort((a, b) => {
                    // Sort by priority first, then by gap size
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                    }
                    return (b.requiredLevel - b.currentLevel) - (a.requiredLevel - a.currentLevel);
                })
                .map(comp => {
                    const competency = MockIDPData.getCompetencyById(comp.competencyId);
                    if (!competency) return '';

                    const gap = comp.requiredLevel - comp.currentLevel;
                    const priorityConfig = MockIDPData.getPriorityConfig(comp.priority);
                    const currentLevelInfo = competency.levels.find(l => l.level === comp.currentLevel);
                    const targetLevelInfo = competency.levels.find(l => l.level === comp.requiredLevel);

                    return `
                        <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition mb-4">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <h4 class="font-semibold text-gray-900">
                                            ${i18n.isThai() ? competency.nameTh : competency.nameEn}
                                        </h4>
                                        <span class="px-2 py-0.5 text-xs font-medium rounded-full ${priorityConfig.color}">
                                            ${i18n.isThai() ? priorityConfig.labelTh : priorityConfig.labelEn}
                                        </span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-3">
                                        ${i18n.isThai() ? competency.descriptionTh : competency.descriptionEn}
                                    </p>

                                    <!-- Level Progress Bar -->
                                    <div class="mb-2">
                                        <div class="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>${i18n.t('idp.currentLevel')}: ${comp.currentLevel} (${i18n.isThai() ? currentLevelInfo?.labelTh : currentLevelInfo?.labelEn})</span>
                                            <span>${i18n.t('idp.requiredLevel')}: ${comp.requiredLevel} (${i18n.isThai() ? targetLevelInfo?.labelTh : targetLevelInfo?.labelEn})</span>
                                        </div>
                                        <div class="flex gap-1">
                                            ${[1, 2, 3, 4, 5].map(level => {
                                                let bgColor = 'bg-gray-200';
                                                if (level <= comp.currentLevel) {
                                                    bgColor = 'bg-green-500';
                                                } else if (level <= comp.requiredLevel) {
                                                    bgColor = 'bg-yellow-400';
                                                }
                                                return `<div class="flex-1 h-2 rounded ${bgColor}"></div>`;
                                            }).join('')}
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-col items-center gap-2">
                                    <div class="text-center">
                                        <span class="text-2xl font-bold ${gap > 1 ? 'text-red-600' : 'text-yellow-600'}">${gap}</span>
                                        <p class="text-xs text-gray-500">${i18n.t('idp.gapLevel')}</p>
                                    </div>
                                    <button
                                        class="px-3 py-1 text-sm bg-cg-red text-white rounded hover:bg-red-700 transition"
                                        onclick="IDPPage.createActionForCompetency('${comp.competencyId}')"
                                    >
                                        ${i18n.t('idp.addAction')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

            return `
                ${summaryCards}
                ${CardComponent.render({
                    id: 'gap-analysis-card',
                    title: i18n.t('idp.competencyGapDetails'),
                    icon: 'analytics',
                    content: competencyRows || CardComponent.emptyState(i18n.t('idp.noCompetencyData'))
                })}
            `;
        },

        /**
         * Render Development Actions tab
         */
        renderDevelopmentActions(employee) {
            const actionTypes = MockIDPData.developmentActionTypes;

            const actionTypeCards = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    ${actionTypes.map(type => `
                        <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                             onclick="IDPPage.selectActionType('${type.value}')">
                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-cg-red/10 rounded-lg">
                                    <span class="material-icons text-cg-red">${type.icon}</span>
                                </div>
                                <div>
                                    <h4 class="font-medium text-gray-900">
                                        ${i18n.isThai() ? type.labelTh : type.labelEn}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Get current IDP actions
            const idps = MockIDPData.getIDPsByEmployeeId(employee.employeeId);
            const currentIdp = idps.find(idp => idp.year === selectedYear && idp.status !== 'cancelled');

            let actionsContent = '';
            if (currentIdp) {
                const allActions = currentIdp.developmentAreas.flatMap(da => da.actions);
                actionsContent = this.renderActionsList(allActions);
            } else {
                actionsContent = CardComponent.emptyState(i18n.t('idp.noActionsForYear'));
            }

            return `
                <div class="mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('idp.actionTypes')}</h3>
                    ${actionTypeCards}
                </div>

                ${CardComponent.render({
                    id: 'current-actions-card',
                    title: `${i18n.t('idp.myActions')} - ${selectedYear}`,
                    icon: 'assignment',
                    actions: [{
                        icon: 'add',
                        label: i18n.t('idp.addNewAction'),
                        onclick: 'IDPPage.addNewAction()'
                    }],
                    content: actionsContent
                })}
            `;
        },

        /**
         * Render list of actions
         */
        renderActionsList(actions) {
            if (!actions || actions.length === 0) {
                return CardComponent.emptyState(i18n.t('idp.noActions'));
            }

            return `
                <div class="space-y-4">
                    ${actions.map(action => {
                        const typeConfig = MockIDPData.getActionTypeConfig(action.type);
                        const statusConfig = MockIDPData.getActionStatusConfig(action.status);

                        return `
                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                <div class="flex items-start justify-between">
                                    <div class="flex items-start gap-3">
                                        <div class="p-2 bg-blue-100 rounded-lg">
                                            <span class="material-icons text-blue-600">${typeConfig.icon}</span>
                                        </div>
                                        <div>
                                            <h4 class="font-medium text-gray-900">
                                                ${i18n.isThai() ? action.titleTh : action.title}
                                            </h4>
                                            <p class="text-sm text-gray-600 mt-1">
                                                ${i18n.isThai() ? action.descriptionTh : action.description}
                                            </p>
                                            <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                <span class="flex items-center gap-1">
                                                    <span class="material-icons text-xs">event</span>
                                                    ${DateUtils.format(action.startDate, 'short')} - ${DateUtils.format(action.endDate, 'short')}
                                                </span>
                                                ${action.lmsLink ? `
                                                    <a href="${action.lmsLink}" target="_blank" rel="noopener noreferrer"
                                                       class="flex items-center gap-1 text-blue-600 hover:underline">
                                                        <span class="material-icons text-xs">open_in_new</span>
                                                        LMS
                                                    </a>
                                                ` : ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-end gap-2">
                                        <span class="px-2 py-1 text-xs font-medium rounded-full ${statusConfig.color}">
                                            ${i18n.isThai() ? statusConfig.labelTh : statusConfig.labelEn}
                                        </span>
                                        <span class="text-lg font-bold text-cg-red">${action.progress}%</span>
                                    </div>
                                </div>

                                <!-- Progress Bar -->
                                <div class="mt-3">
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-cg-red h-2 rounded-full transition-all" style="width: ${action.progress}%"></div>
                                    </div>
                                </div>

                                <!-- Milestones -->
                                ${action.milestones && action.milestones.length > 0 ? `
                                    <div class="mt-3 pt-3 border-t border-gray-100">
                                        <p class="text-xs font-medium text-gray-500 mb-2">${i18n.t('idp.milestones')}:</p>
                                        <div class="flex flex-wrap gap-2">
                                            ${action.milestones.map(m => `
                                                <span class="inline-flex items-center gap-1 px-2 py-1 text-xs rounded ${m.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}">
                                                    <span class="material-icons text-xs">${m.completed ? 'check_circle' : 'radio_button_unchecked'}</span>
                                                    ${m.title}
                                                </span>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        },

        /**
         * Render IDP Form tab
         */
        renderIDPForm(employee) {
            const idps = MockIDPData.getIDPsByEmployeeId(employee.employeeId);
            const currentIdp = idps.find(idp => idp.year === selectedYear);

            // Year selector
            const yearSelector = `
                <div class="flex items-center gap-4 mb-6">
                    <label class="text-sm font-medium text-gray-700">${i18n.t('idp.selectYear')}:</label>
                    <select
                        class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red"
                        onchange="IDPPage.changeYear(this.value)"
                        aria-label="${i18n.t('idp.selectYear')}"
                    >
                        ${[2024, 2025, 2026, 2027].map(year => `
                            <option value="${year}" ${year === selectedYear ? 'selected' : ''}>${year}</option>
                        `).join('')}
                    </select>
                    ${!currentIdp ? `
                        <button
                            class="px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                            onclick="IDPPage.createNewIDP()"
                        >
                            <span class="material-icons text-sm">add</span>
                            ${i18n.t('idp.createNewIdp')}
                        </button>
                    ` : ''}
                </div>
            `;

            if (!currentIdp) {
                return `
                    ${yearSelector}
                    ${CardComponent.render({
                        id: 'idp-form-card',
                        title: i18n.t('idp.idpForm'),
                        icon: 'description',
                        content: CardComponent.emptyState(i18n.t('idp.noIdpForYear'))
                    })}
                `;
            }

            const statusConfig = MockIDPData.getStatusConfig(currentIdp.status);

            return `
                ${yearSelector}

                <!-- IDP Header Card -->
                ${CardComponent.render({
                    id: 'idp-header-card',
                    title: i18n.isThai() ? currentIdp.titleTh : currentIdp.title,
                    icon: 'description',
                    actions: currentIdp.status === 'draft' ? [{
                        icon: 'send',
                        label: i18n.t('idp.submitForApproval'),
                        onclick: 'IDPPage.submitForApproval()'
                    }] : [],
                    content: `
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                                <p class="text-xs text-gray-500">${i18n.t('idp.status')}</p>
                                <span class="inline-flex items-center px-2 py-1 text-sm font-medium rounded-full ${statusConfig.color}">
                                    ${i18n.isThai() ? statusConfig.labelTh : statusConfig.labelEn}
                                </span>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500">${i18n.t('idp.createdDate')}</p>
                                <p class="text-sm font-medium">${DateUtils.format(currentIdp.createdDate, 'medium')}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500">${i18n.t('idp.overallProgress')}</p>
                                <p class="text-sm font-bold text-cg-red">${currentIdp.overallProgress}%</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500">${i18n.t('idp.approvedBy')}</p>
                                <p class="text-sm font-medium">${currentIdp.approverName || '-'}</p>
                            </div>
                        </div>

                        <!-- Sign-off Status -->
                        <div class="flex items-center gap-6 pt-4 border-t border-gray-100">
                            <div class="flex items-center gap-2">
                                <span class="material-icons text-sm ${currentIdp.employeeSignOff ? 'text-green-600' : 'text-gray-400'}">
                                    ${currentIdp.employeeSignOff ? 'check_circle' : 'radio_button_unchecked'}
                                </span>
                                <span class="text-sm">${i18n.t('idp.employeeSignOff')}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="material-icons text-sm ${currentIdp.managerSignOff ? 'text-green-600' : 'text-gray-400'}">
                                    ${currentIdp.managerSignOff ? 'check_circle' : 'radio_button_unchecked'}
                                </span>
                                <span class="text-sm">${i18n.t('idp.managerSignOff')}</span>
                            </div>
                        </div>
                    `
                })}

                <!-- Development Areas -->
                <div class="mt-6 space-y-4">
                    <h3 class="text-lg font-semibold text-gray-900">${i18n.t('idp.developmentAreas')}</h3>
                    ${currentIdp.developmentAreas.map(da => this.renderDevelopmentArea(da)).join('')}
                </div>
            `;
        },

        /**
         * Render a development area with actions
         */
        renderDevelopmentArea(developmentArea) {
            const competency = MockIDPData.getCompetencyById(developmentArea.competencyId);
            const priorityConfig = MockIDPData.getPriorityConfig(developmentArea.priority);

            return `
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <span class="material-icons text-cg-red">star</span>
                                <h4 class="font-semibold text-gray-900">
                                    ${competency ? (i18n.isThai() ? competency.nameTh : competency.nameEn) : 'Unknown Competency'}
                                </h4>
                                <span class="px-2 py-0.5 text-xs font-medium rounded-full ${priorityConfig.color}">
                                    ${i18n.isThai() ? priorityConfig.labelTh : priorityConfig.labelEn}
                                </span>
                            </div>
                            <div class="text-sm text-gray-600">
                                ${i18n.t('idp.level')}: ${developmentArea.currentLevel} -> ${developmentArea.targetLevel}
                                <span class="text-red-600 font-medium ml-2">(${i18n.t('idp.gap')}: ${developmentArea.gap})</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                        ${this.renderActionsList(developmentArea.actions)}
                    </div>
                </div>
            `;
        },

        /**
         * Render Progress Tracking tab
         */
        renderProgressTracking(employee) {
            const idps = MockIDPData.getIDPsByEmployeeId(employee.employeeId);
            const currentIdp = idps.find(idp => idp.year === selectedYear && idp.status !== 'cancelled');

            if (!currentIdp) {
                return CardComponent.render({
                    id: 'progress-card',
                    title: i18n.t('idp.progressTracking'),
                    icon: 'track_changes',
                    content: CardComponent.emptyState(i18n.t('idp.noIdpForYear'))
                });
            }

            // Calculate overall statistics
            const allActions = currentIdp.developmentAreas.flatMap(da => da.actions);
            const completedActions = allActions.filter(a => a.status === 'completed').length;
            const inProgressActions = allActions.filter(a => a.status === 'in_progress').length;
            const notStartedActions = allActions.filter(a => a.status === 'not_started').length;

            const statsCards = `
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-purple-50 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-purple-600">${currentIdp.overallProgress}%</p>
                        <p class="text-sm text-gray-600">${i18n.t('idp.overallProgress')}</p>
                    </div>
                    <div class="bg-green-50 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-green-600">${completedActions}</p>
                        <p class="text-sm text-gray-600">${i18n.t('idp.completedActions')}</p>
                    </div>
                    <div class="bg-blue-50 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-blue-600">${inProgressActions}</p>
                        <p class="text-sm text-gray-600">${i18n.t('idp.inProgressActions')}</p>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-gray-600">${notStartedActions}</p>
                        <p class="text-sm text-gray-600">${i18n.t('idp.notStartedActions')}</p>
                    </div>
                </div>
            `;

            // Progress by development area
            const progressByArea = currentIdp.developmentAreas.map(da => {
                const competency = MockIDPData.getCompetencyById(da.competencyId);
                const totalProgress = da.actions.reduce((sum, a) => sum + a.progress, 0);
                const avgProgress = da.actions.length > 0 ? Math.round(totalProgress / da.actions.length) : 0;

                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                        <div class="flex items-center justify-between mb-3">
                            <h4 class="font-medium text-gray-900">
                                ${competency ? (i18n.isThai() ? competency.nameTh : competency.nameEn) : 'Unknown'}
                            </h4>
                            <span class="text-lg font-bold text-cg-red">${avgProgress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-cg-red h-3 rounded-full transition-all" style="width: ${avgProgress}%"></div>
                        </div>
                        <div class="mt-2 text-xs text-gray-500">
                            ${da.actions.length} ${i18n.t('idp.actions')},
                            ${da.actions.filter(a => a.status === 'completed').length} ${i18n.t('idp.completed')}
                        </div>
                    </div>
                `;
            }).join('');

            return `
                ${statsCards}

                ${CardComponent.render({
                    id: 'progress-by-area-card',
                    title: i18n.t('idp.progressByArea'),
                    icon: 'bar_chart',
                    content: progressByArea
                })}

                <!-- Competency Reassessment -->
                ${CardComponent.render({
                    id: 'reassessment-card',
                    title: i18n.t('idp.competencyReassessment'),
                    icon: 'assessment',
                    actions: [{
                        icon: 'refresh',
                        label: i18n.t('idp.requestReassessment'),
                        onclick: 'IDPPage.requestReassessment()'
                    }],
                    content: `
                        <p class="text-sm text-gray-600 mb-4">
                            ${i18n.t('idp.reassessmentDescription')}
                        </p>
                        <div class="flex items-center gap-2 text-sm">
                            <span class="material-icons text-blue-600">info</span>
                            <span class="text-gray-600">${i18n.t('idp.lastAssessment')}: ${DateUtils.format('2025-12-01', 'medium')}</span>
                        </div>
                    `
                })}
            `;
        },

        /**
         * Render Portfolio tab
         */
        renderPortfolio(employee) {
            const idps = MockIDPData.getIDPsByEmployeeId(employee.employeeId);
            const certifications = MockIDPData.getCertifications(employee.employeeId);

            // IDP Summary Table
            const idpSummary = idps.map(idp => {
                const statusConfig = MockIDPData.getStatusConfig(idp.status);
                const actionCount = idp.developmentAreas.reduce((sum, da) => sum + da.actions.length, 0);
                const completedCount = idp.developmentAreas.reduce((sum, da) =>
                    sum + da.actions.filter(a => a.status === 'completed').length, 0);

                return `
                    <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm font-medium text-gray-900">${idp.year}</td>
                        <td class="px-4 py-3 text-sm text-gray-600">${i18n.isThai() ? idp.titleTh : idp.title}</td>
                        <td class="px-4 py-3">
                            <span class="px-2 py-1 text-xs font-medium rounded-full ${statusConfig.color}">
                                ${i18n.isThai() ? statusConfig.labelTh : statusConfig.labelEn}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-sm text-center">
                            <span class="font-bold text-cg-red">${idp.overallProgress}%</span>
                        </td>
                        <td class="px-4 py-3 text-sm text-center text-gray-600">${completedCount}/${actionCount}</td>
                        <td class="px-4 py-3 text-sm text-center">
                            <button
                                class="text-cg-red hover:underline"
                                onclick="IDPPage.viewIdpDetails('${idp.id}')"
                            >
                                ${i18n.t('common.viewMore')}
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');

            // Certifications
            const certificationsContent = certifications.length > 0 ? `
                <div class="space-y-4">
                    ${certifications.map(cert => `
                        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-green-100 rounded-lg">
                                    <span class="material-icons text-green-600">verified</span>
                                </div>
                                <div>
                                    <h4 class="font-medium text-gray-900">${cert.name}</h4>
                                    <p class="text-sm text-gray-600">${cert.issuer}</p>
                                    <p class="text-xs text-gray-500">
                                        ${i18n.t('idp.issued')}: ${DateUtils.format(cert.issueDate, 'medium')} |
                                        ${i18n.t('idp.expires')}: ${DateUtils.format(cert.expiryDate, 'medium')}
                                    </p>
                                </div>
                            </div>
                            <div class="text-sm font-mono text-gray-600">${cert.credentialId}</div>
                        </div>
                    `).join('')}
                </div>
            ` : CardComponent.emptyState(i18n.t('idp.noCertifications'));

            return `
                <!-- Historical Journey -->
                ${CardComponent.render({
                    id: 'idp-history-card',
                    title: i18n.t('idp.historicalJourney'),
                    icon: 'timeline',
                    content: `
                        <div class="overflow-x-auto">
                            <table class="w-full">
                                <thead>
                                    <tr class="bg-gray-50 border-b border-gray-200">
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('idp.year')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('idp.planTitle')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('idp.status')}</th>
                                        <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('idp.progress')}</th>
                                        <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('idp.actions')}</th>
                                        <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase"></th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    ${idpSummary || `<tr><td colspan="6" class="px-4 py-8 text-center text-gray-500">${i18n.t('idp.noIdpHistory')}</td></tr>`}
                                </tbody>
                            </table>
                        </div>
                    `
                })}

                <!-- Certifications & Achievements -->
                ${CardComponent.render({
                    id: 'certifications-card',
                    title: i18n.t('idp.certificationsAchievements'),
                    icon: 'emoji_events',
                    content: certificationsContent
                })}

                <!-- Export Options -->
                <div class="mt-6 flex justify-end gap-4">
                    <button
                        class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                        onclick="IDPPage.exportPortfolio('pdf')"
                    >
                        <span class="material-icons text-sm">picture_as_pdf</span>
                        ${i18n.t('idp.exportPdf')}
                    </button>
                    <button
                        class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                        onclick="IDPPage.exportPortfolio('excel')"
                    >
                        <span class="material-icons text-sm">table_chart</span>
                        ${i18n.t('idp.exportExcel')}
                    </button>
                </div>
            `;
        },

        /**
         * Initialize page
         */
        init() {
            // Reset to default tab if needed
            currentTab = 'gap-analysis';
            selectedYear = new Date().getFullYear();
        },

        /**
         * Switch tabs
         */
        switchTab(tabId) {
            currentTab = tabId;
            Router.refresh();
        },

        /**
         * Change selected year
         */
        changeYear(year) {
            selectedYear = parseInt(year);
            Router.refresh();
        },

        /**
         * Create action for a specific competency
         */
        createActionForCompetency(competencyId) {
            const competency = MockIDPData.getCompetencyById(competencyId);
            if (!competency) return;

            const actionTypes = MockIDPData.developmentActionTypes;
            const trainingPrograms = MockIDPData.trainingPrograms.filter(p =>
                p.competencies.includes(competencyId)
            );

            ModalComponent.open({
                title: i18n.t('idp.addDevelopmentAction'),
                size: 'lg',
                content: `
                    <form id="add-action-form" class="space-y-4">
                        <div class="bg-blue-50 rounded-lg p-4 mb-4">
                            <p class="text-sm text-blue-800">
                                <strong>${i18n.t('idp.targetCompetency')}:</strong>
                                ${i18n.isThai() ? competency.nameTh : competency.nameEn}
                            </p>
                        </div>

                        ${FormFieldComponent.select({
                            name: 'actionType',
                            label: i18n.t('idp.actionType'),
                            required: true,
                            placeholder: i18n.t('common.select'),
                            options: actionTypes.map(t => ({
                                value: t.value,
                                label: i18n.isThai() ? t.labelTh : t.labelEn
                            }))
                        })}

                        ${trainingPrograms.length > 0 ? FormFieldComponent.select({
                            name: 'trainingProgram',
                            label: i18n.t('idp.suggestedPrograms'),
                            placeholder: i18n.t('common.select'),
                            options: trainingPrograms.map(p => ({
                                value: p.id,
                                label: i18n.isThai() ? p.nameTh : p.nameEn
                            }))
                        }) : ''}

                        ${FormFieldComponent.text({
                            name: 'title',
                            label: i18n.t('idp.actionTitle'),
                            required: true
                        })}

                        ${FormFieldComponent.textarea({
                            name: 'description',
                            label: i18n.t('idp.description'),
                            rows: 3
                        })}

                        <div class="grid grid-cols-2 gap-4">
                            ${FormFieldComponent.date({
                                name: 'startDate',
                                label: i18n.t('idp.startDate'),
                                required: true
                            })}
                            ${FormFieldComponent.date({
                                name: 'endDate',
                                label: i18n.t('idp.endDate'),
                                required: true
                            })}
                        </div>

                        ${FormFieldComponent.text({
                            name: 'resources',
                            label: i18n.t('idp.resources'),
                            hint: i18n.t('idp.resourcesHint')
                        })}

                        ${FormFieldComponent.textarea({
                            name: 'managerSupport',
                            label: i18n.t('idp.managerSupport'),
                            rows: 2,
                            hint: i18n.t('idp.managerSupportHint')
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'IDPPage.saveAction()' }
                ]
            });
        },

        /**
         * Save action
         */
        async saveAction() {
            const formData = FormFieldComponent.getFormData('add-action-form');

            const validation = ValidationUtils.validateForm(formData, {
                actionType: { required: true },
                title: { required: true, minLength: 3 },
                startDate: { required: true },
                endDate: { required: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                ToastComponent.error(i18n.t('error.validationFailed'));
                return;
            }

            try {
                // In real implementation, this would call an API
                ToastComponent.success(i18n.t('idp.actionSaved'));
                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        /**
         * Add new action
         */
        addNewAction() {
            this.createActionForCompetency(MockIDPData.competencies[0].id);
        },

        /**
         * Select action type
         */
        selectActionType(type) {
            ToastComponent.info(`${i18n.t('idp.selectedType')}: ${type}`);
        },

        /**
         * Create new IDP
         */
        createNewIDP() {
            ModalComponent.open({
                title: i18n.t('idp.createNewIdp'),
                size: 'md',
                content: `
                    <form id="create-idp-form" class="space-y-4">
                        ${FormFieldComponent.text({
                            name: 'title',
                            label: i18n.t('idp.planTitle'),
                            required: true
                        })}
                        ${FormFieldComponent.text({
                            name: 'titleTh',
                            label: i18n.t('idp.planTitleTh'),
                            required: true
                        })}
                        ${FormFieldComponent.select({
                            name: 'year',
                            label: i18n.t('idp.year'),
                            required: true,
                            value: selectedYear.toString(),
                            options: [2024, 2025, 2026, 2027].map(y => ({ value: y.toString(), label: y.toString() }))
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'IDPPage.saveNewIDP()' }
                ]
            });
        },

        /**
         * Save new IDP
         */
        async saveNewIDP() {
            const formData = FormFieldComponent.getFormData('create-idp-form');

            const validation = ValidationUtils.validateForm(formData, {
                title: { required: true, minLength: 5 },
                titleTh: { required: true, minLength: 5 },
                year: { required: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                return;
            }

            try {
                ToastComponent.success(i18n.t('idp.idpCreated'));
                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        /**
         * Submit IDP for approval
         */
        submitForApproval() {
            ModalComponent.confirm({
                title: i18n.t('idp.submitForApproval'),
                message: i18n.t('idp.confirmSubmit'),
                confirmText: i18n.t('common.confirm'),
                icon: 'send'
            }).then(confirmed => {
                if (confirmed) {
                    ToastComponent.success(i18n.t('idp.submittedForApproval'));
                    Router.refresh();
                }
            });
        },

        /**
         * Request competency reassessment
         */
        requestReassessment() {
            ModalComponent.confirm({
                title: i18n.t('idp.requestReassessment'),
                message: i18n.t('idp.confirmReassessment'),
                confirmText: i18n.t('common.confirm'),
                icon: 'assessment'
            }).then(confirmed => {
                if (confirmed) {
                    ToastComponent.success(i18n.t('idp.reassessmentRequested'));
                }
            });
        },

        /**
         * View IDP details
         */
        viewIdpDetails(idpId) {
            selectedIdp = idpId;
            currentTab = 'idp-form';
            Router.refresh();
        },

        /**
         * Export portfolio
         */
        exportPortfolio(format) {
            ToastComponent.info(`${i18n.t('idp.exportStarted')} (${format.toUpperCase()})`);
        },

        /**
         * Render skeleton
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 py-6">
                    ${SkeletonComponent.renderCardSkeleton({ lines: 2 })}
                    <div class="mt-6">
                        ${SkeletonComponent.renderCardSkeleton({ lines: 5 })}
                    </div>
                    <div class="mt-6">
                        ${SkeletonComponent.renderCardSkeleton({ lines: 4 })}
                    </div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IDPPage;
}
