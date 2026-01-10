/**
 * Performance Page
 * Goal/KPI Setting and Progress Management with G-BEST Competencies
 */

const PerformancePage = (function() {
    let activeTab = 'goals';
    let goals = [];
    let gbestCompetencies = [];
    let selectedPeriod = '2025';
    let selectedCategory = 'all';
    let selectedStatus = 'all';
    let selectedGoal = null;
    let isEditing = false;

    // Evaluation state
    let evaluations = [];
    let currentEvaluation = null;
    let evaluationWeights = { kpi: 50, gbest: 30, attendance: 10, manager: 10 };
    let attendanceData = null;
    let selfAssessmentDraft = {};

    return {
        /**
         * Render the performance page
         * @returns {string}
         */
        render() {
            const isLoading = AppState.get('isLoading');
            const hasData = goals.length > 0;

            if (isLoading && !hasData) {
                return this.renderSkeleton();
            }

            const isThai = i18n.isThai();
            const isManager = RBAC.isManager();

            // Define tabs
            const tabs = [
                { id: 'goals', icon: 'flag', label: i18n.t('performance.goalsTab') },
                { id: 'progress', icon: 'trending_up', label: i18n.t('performance.progressTab') },
                { id: 'evaluation', icon: 'assessment', label: i18n.t('evaluation.tab') },
                { id: 'history', icon: 'history', label: i18n.t('performance.historyTab') }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('performance.title')}</h1>
                        <button onclick="PerformancePage.openGoalForm()"
                                class="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                            <span class="material-icons text-sm">add</span>
                            ${i18n.t('performance.createGoal')}
                        </button>
                    </div>

                    <!-- Weight Summary -->
                    ${this.renderWeightSummary()}

                    <!-- Tabs Navigation -->
                    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto" role="tablist">
                        ${tabs.map(tab => `
                            <button onclick="PerformancePage.switchTab('${tab.id}')"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition whitespace-nowrap min-h-[44px]
                                        ${activeTab === tab.id ? 'bg-white text-cg-red shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                                    role="tab"
                                    aria-selected="${activeTab === tab.id}">
                                <span class="material-icons text-sm">${tab.icon}</span>
                                <span class="hidden sm:inline">${tab.label}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Tab Content -->
                    <div id="performance-tab-content">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Render weight summary card
         * @returns {string}
         */
        renderWeightSummary() {
            const periodGoals = goals.filter(g => g.period === selectedPeriod && g.status !== 'draft');
            const totalWeight = periodGoals.reduce((sum, g) => sum + (g.weight || 0), 0);
            const remaining = 100 - totalWeight;
            const isValid = totalWeight === 100;

            const kpiWeight = periodGoals.filter(g => g.category === 'kpi').reduce((sum, g) => sum + (g.weight || 0), 0);
            const gbestWeight = periodGoals.filter(g => g.category === 'gbest').reduce((sum, g) => sum + (g.weight || 0), 0);
            const devWeight = periodGoals.filter(g => g.category === 'development').reduce((sum, g) => sum + (g.weight || 0), 0);

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full ${isValid ? 'bg-green-100' : 'bg-yellow-100'} flex items-center justify-center">
                                <span class="material-icons ${isValid ? 'text-green-600' : 'text-yellow-600'}">
                                    ${isValid ? 'check_circle' : 'warning'}
                                </span>
                            </div>
                            <div>
                                <h3 class="font-medium text-gray-900">${i18n.t('performance.weight')}</h3>
                                <p class="text-sm text-gray-500">
                                    ${i18n.t('performance.weightCurrentTotal')}: <span class="font-bold ${isValid ? 'text-green-600' : remaining < 0 ? 'text-red-600' : 'text-yellow-600'}">${totalWeight}%</span>
                                    ${!isValid ? ` (${i18n.t('performance.weightRemaining')}: ${remaining}%)` : ''}
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-3 text-sm">
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">KPI: ${kpiWeight}%</span>
                            <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">G-BEST: ${gbestWeight}%</span>
                            <span class="px-3 py-1 bg-teal-100 text-teal-800 rounded-full">${i18n.t('performance.categoryDevelopment')}: ${devWeight}%</span>
                        </div>
                    </div>
                    ${!isValid ? `
                        <p class="mt-3 text-sm ${remaining < 0 ? 'text-red-600' : 'text-yellow-600'}">
                            <span class="material-icons text-xs align-middle">info</span>
                            ${remaining < 0 ? i18n.t('performance.weightOver100') : i18n.t('performance.weightMustEqual100')}
                        </p>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render active tab content
         * @returns {string}
         */
        renderTabContent() {
            switch (activeTab) {
                case 'goals':
                    return this.renderGoalsTab();
                case 'progress':
                    return this.renderProgressTab();
                case 'evaluation':
                    return this.renderEvaluationTab();
                case 'history':
                    return this.renderHistoryTab();
                default:
                    return this.renderGoalsTab();
            }
        },

        /**
         * Render goals tab
         * @returns {string}
         */
        renderGoalsTab() {
            const isThai = i18n.isThai();

            // Filter goals
            let filteredGoals = [...goals];
            if (selectedPeriod !== 'all') {
                filteredGoals = filteredGoals.filter(g => g.period.includes(selectedPeriod));
            }
            if (selectedCategory !== 'all') {
                filteredGoals = filteredGoals.filter(g => g.category === selectedCategory);
            }
            if (selectedStatus !== 'all') {
                filteredGoals = filteredGoals.filter(g => g.status === selectedStatus);
            }

            // Sort by category order: KPI, G-BEST, Development, then by weight descending
            const categoryOrder = { kpi: 1, gbest: 2, development: 3 };
            filteredGoals.sort((a, b) => {
                const catDiff = (categoryOrder[a.category] || 99) - (categoryOrder[b.category] || 99);
                if (catDiff !== 0) return catDiff;
                return b.weight - a.weight;
            });

            return `
                <div class="space-y-4">
                    <!-- Filters -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex flex-wrap gap-4">
                            <select onchange="PerformancePage.setFilter('period', this.value)"
                                    class="px-3 py-2 border rounded-lg text-sm">
                                <option value="all" ${selectedPeriod === 'all' ? 'selected' : ''}>${i18n.t('performance.allYears')}</option>
                                <option value="2026" ${selectedPeriod === '2026' ? 'selected' : ''}>2026</option>
                                <option value="2025" ${selectedPeriod === '2025' ? 'selected' : ''}>2025</option>
                                <option value="2024" ${selectedPeriod === '2024' ? 'selected' : ''}>2024</option>
                            </select>
                            <select onchange="PerformancePage.setFilter('category', this.value)"
                                    class="px-3 py-2 border rounded-lg text-sm">
                                <option value="all" ${selectedCategory === 'all' ? 'selected' : ''}>${i18n.t('performance.allCategories')}</option>
                                <option value="kpi" ${selectedCategory === 'kpi' ? 'selected' : ''}>${i18n.t('performance.categoryKpi')}</option>
                                <option value="gbest" ${selectedCategory === 'gbest' ? 'selected' : ''}>${i18n.t('performance.categoryGbest')}</option>
                                <option value="development" ${selectedCategory === 'development' ? 'selected' : ''}>${i18n.t('performance.categoryDevelopment')}</option>
                            </select>
                            <select onchange="PerformancePage.setFilter('status', this.value)"
                                    class="px-3 py-2 border rounded-lg text-sm">
                                <option value="all" ${selectedStatus === 'all' ? 'selected' : ''}>${i18n.t('performance.allStatuses')}</option>
                                <option value="draft" ${selectedStatus === 'draft' ? 'selected' : ''}>${i18n.t('performance.statusDraft')}</option>
                                <option value="submitted" ${selectedStatus === 'submitted' ? 'selected' : ''}>${i18n.t('performance.statusSubmitted')}</option>
                                <option value="approved" ${selectedStatus === 'approved' ? 'selected' : ''}>${i18n.t('performance.statusApproved')}</option>
                                <option value="in_progress" ${selectedStatus === 'in_progress' ? 'selected' : ''}>${i18n.t('performance.statusInProgress')}</option>
                                <option value="completed" ${selectedStatus === 'completed' ? 'selected' : ''}>${i18n.t('performance.statusCompleted')}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Goals List -->
                    ${filteredGoals.length === 0 ? `
                        <div class="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                            <span class="material-icons text-5xl mb-4">flag</span>
                            <p class="text-lg">${i18n.t('performance.noGoals')}</p>
                            <button onclick="PerformancePage.openGoalForm()"
                                    class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                                <span class="material-icons text-sm">add</span>
                                ${i18n.t('performance.createFirstGoal')}
                            </button>
                        </div>
                    ` : `
                        <div class="space-y-4">
                            ${filteredGoals.map(goal => this.renderGoalCard(goal)).join('')}
                        </div>
                    `}
                </div>
            `;
        },

        /**
         * Render a single goal card
         * @param {object} goal
         * @returns {string}
         */
        renderGoalCard(goal) {
            const isThai = i18n.isThai();
            const name = isThai ? (goal.name.th || goal.name.en) : goal.name.en;
            const description = isThai ? (goal.description.th || goal.description.en) : goal.description.en;
            const categoryColors = this.getCategoryColors(goal.category);
            const statusConfig = this.getStatusConfig(goal.status);

            // Find G-BEST competency name if applicable
            let gbestName = '';
            if (goal.gbestCode) {
                const competency = gbestCompetencies.find(c => c.code === goal.gbestCode);
                if (competency) {
                    gbestName = isThai ? competency.nameTh : competency.nameEn;
                }
            }

            // Format metric display
            const metricDisplay = this.getMetricDisplay(goal);

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
                    <div class="flex flex-col lg:flex-row lg:items-start gap-4">
                        <!-- Left: Category & Info -->
                        <div class="flex-1">
                            <div class="flex flex-wrap items-center gap-2 mb-2">
                                <span class="px-2 py-1 text-xs font-medium rounded-full ${categoryColors.bg} ${categoryColors.text}">
                                    ${goal.category === 'kpi' ? 'KPI' : goal.category === 'gbest' ? 'G-BEST' : i18n.t('performance.categoryDevelopment')}
                                </span>
                                ${goal.gbestCode ? `
                                    <span class="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                                        ${goal.gbestCode}: ${gbestName}
                                    </span>
                                ` : ''}
                                <span class="px-2 py-1 text-xs font-medium rounded-full ${statusConfig.class}">
                                    <span class="material-icons text-xs align-middle">${statusConfig.icon}</span>
                                    ${i18n.t(`performance.status${goal.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`)}
                                </span>
                            </div>
                            <h3 class="font-medium text-gray-900 text-lg">${name}</h3>
                            <p class="text-sm text-gray-600 mt-1 line-clamp-2">${description}</p>
                            <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                                <span><span class="font-medium">${i18n.t('performance.weight')}:</span> ${goal.weight}%</span>
                                <span><span class="font-medium">${i18n.t('performance.reviewPeriod')}:</span> ${goal.period}</span>
                                <span><span class="font-medium">${metricDisplay.label}:</span> ${metricDisplay.value}</span>
                            </div>
                        </div>

                        <!-- Right: Progress & Actions -->
                        <div class="lg:w-64 flex flex-col gap-3">
                            <!-- Progress -->
                            <div>
                                <div class="flex items-center justify-between text-sm mb-1">
                                    <span class="text-gray-500">${i18n.t('performance.progress')}</span>
                                    <span class="font-medium ${goal.progress >= 100 ? 'text-green-600' : goal.progress >= 50 ? 'text-blue-600' : 'text-gray-600'}">${goal.progress}%</span>
                                </div>
                                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div class="h-full ${goal.progress >= 100 ? 'bg-green-500' : goal.progress >= 50 ? 'bg-blue-500' : 'bg-gray-400'} transition-all duration-300"
                                         style="width: ${Math.min(goal.progress, 100)}%"></div>
                                </div>
                            </div>

                            <!-- Actions -->
                            <div class="flex flex-wrap gap-2">
                                ${this.renderGoalActions(goal)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render goal action buttons based on status
         * @param {object} goal
         * @returns {string}
         */
        renderGoalActions(goal) {
            const actions = [];

            // View details always available
            actions.push(`
                <button onclick="PerformancePage.viewGoalDetails('${goal.id}')"
                        class="px-3 py-1.5 text-sm text-cg-info hover:bg-blue-50 rounded-lg transition">
                    ${i18n.t('performance.viewDetails')}
                </button>
            `);

            switch (goal.status) {
                case 'draft':
                    actions.push(`
                        <button onclick="PerformancePage.editGoal('${goal.id}')"
                                class="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
                            ${i18n.t('common.edit')}
                        </button>
                        <button onclick="PerformancePage.submitGoal('${goal.id}')"
                                class="px-3 py-1.5 text-sm bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                            ${i18n.t('performance.submitForReview')}
                        </button>
                        <button onclick="PerformancePage.deleteGoal('${goal.id}')"
                                class="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                            ${i18n.t('common.delete')}
                        </button>
                    `);
                    break;
                case 'sent_back':
                    actions.push(`
                        <button onclick="PerformancePage.editGoal('${goal.id}')"
                                class="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
                            ${i18n.t('common.edit')}
                        </button>
                        <button onclick="PerformancePage.submitGoal('${goal.id}')"
                                class="px-3 py-1.5 text-sm bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                            ${i18n.t('performance.submitForReview')}
                        </button>
                    `);
                    break;
                case 'submitted':
                    actions.push(`
                        <span class="px-3 py-1.5 text-sm text-yellow-600">
                            ${i18n.t('performance.pendingApproval')}
                        </span>
                    `);
                    break;
                case 'approved':
                    if (!goal.signedOffEmployee) {
                        actions.push(`
                            <button onclick="PerformancePage.signOffGoal('${goal.id}', 'employee')"
                                    class="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                ${i18n.t('performance.signOff')}
                            </button>
                        `);
                    }
                    break;
                case 'in_progress':
                    actions.push(`
                        <button onclick="PerformancePage.openProgressUpdate('${goal.id}')"
                                class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            ${i18n.t('performance.updateProgress')}
                        </button>
                    `);
                    break;
            }

            return actions.join('');
        },

        /**
         * Render progress tab
         * @returns {string}
         */
        renderProgressTab() {
            const isThai = i18n.isThai();

            // Get active goals (in_progress or completed)
            const activeGoals = goals.filter(g =>
                ['in_progress', 'completed'].includes(g.status) &&
                g.period.includes(selectedPeriod)
            );

            if (activeGoals.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                        <span class="material-icons text-5xl mb-4">trending_up</span>
                        <p class="text-lg">${i18n.t('performance.noGoalsForPeriod')}</p>
                    </div>
                `;
            }

            // Calculate overall progress
            let totalWeight = 0;
            let weightedProgress = 0;
            activeGoals.forEach(g => {
                totalWeight += g.weight || 0;
                weightedProgress += (g.progress || 0) * (g.weight || 0);
            });
            const overallProgress = totalWeight > 0 ? Math.round(weightedProgress / totalWeight) : 0;

            return `
                <div class="space-y-6">
                    <!-- Overall Progress -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="font-medium text-gray-900 mb-4">${i18n.t('performance.achievementRate')}</h3>
                        <div class="flex items-center gap-6">
                            <div class="relative w-32 h-32">
                                ${this.renderProgressRing(overallProgress)}
                            </div>
                            <div class="flex-1">
                                <div class="text-4xl font-bold ${overallProgress >= 100 ? 'text-green-600' : overallProgress >= 75 ? 'text-blue-600' : overallProgress >= 50 ? 'text-yellow-600' : 'text-gray-600'}">
                                    ${overallProgress}%
                                </div>
                                <p class="text-gray-500 mt-1">
                                    ${activeGoals.filter(g => g.status === 'completed').length} / ${activeGoals.length} ${i18n.t('performance.goals').toLowerCase()} ${i18n.t('performance.statusCompleted').toLowerCase()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Goals Progress List -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b bg-gray-50">
                            <h3 class="font-medium text-gray-900">${i18n.t('performance.goals')}</h3>
                        </div>
                        <div class="divide-y divide-gray-200">
                            ${activeGoals.map(goal => this.renderProgressItem(goal)).join('')}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render progress ring SVG
         * @param {number} progress
         * @returns {string}
         */
        renderProgressRing(progress) {
            const radius = 45;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (progress / 100) * circumference;

            return `
                <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="${radius}" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                    <circle cx="50" cy="50" r="${radius}"
                            stroke="${progress >= 100 ? '#22c55e' : progress >= 75 ? '#3b82f6' : progress >= 50 ? '#eab308' : '#9ca3af'}"
                            stroke-width="8" fill="none"
                            stroke-linecap="round"
                            stroke-dasharray="${circumference}"
                            stroke-dashoffset="${offset}"
                            style="transition: stroke-dashoffset 0.5s ease"/>
                </svg>
            `;
        },

        /**
         * Render a progress item
         * @param {object} goal
         * @returns {string}
         */
        renderProgressItem(goal) {
            const isThai = i18n.isThai();
            const name = isThai ? (goal.name.th || goal.name.en) : goal.name.en;
            const metricDisplay = this.getMetricDisplay(goal);

            return `
                <div class="p-4 hover:bg-gray-50">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="flex-1 min-w-0">
                            <h4 class="font-medium text-gray-900 truncate">${name}</h4>
                            <p class="text-sm text-gray-500">
                                ${metricDisplay.label}: ${goal.actual} / ${goal.target} ${metricDisplay.unit}
                            </p>
                        </div>
                        <div class="flex items-center gap-4 sm:w-64">
                            <div class="flex-1">
                                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div class="h-full ${goal.progress >= 100 ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-300"
                                         style="width: ${Math.min(goal.progress, 100)}%"></div>
                                </div>
                            </div>
                            <span class="text-sm font-medium w-12 text-right ${goal.progress >= 100 ? 'text-green-600' : 'text-gray-600'}">${goal.progress}%</span>
                            ${goal.status !== 'completed' ? `
                                <button onclick="PerformancePage.openProgressUpdate('${goal.id}')"
                                        class="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                    ${i18n.t('common.update')}
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render history tab
         * @returns {string}
         */
        renderHistoryTab() {
            const isThai = i18n.isThai();

            // Combine goal history and approvals
            const allHistory = [];

            goals.forEach(goal => {
                // Add progress history if available
                const goalHistoryItems = MockEmployeeData.goalHistory?.filter(h => h.goalId === goal.id) || [];
                goalHistoryItems.forEach(h => {
                    allHistory.push({
                        ...h,
                        type: 'progress',
                        goal: goal
                    });
                });

                // Add approval history
                const approvalItems = MockEmployeeData.goalApprovals?.filter(a => a.goalId === goal.id) || [];
                approvalItems.forEach(a => {
                    allHistory.push({
                        ...a,
                        type: 'approval',
                        goal: goal
                    });
                });
            });

            // Sort by date descending
            allHistory.sort((a, b) => new Date(b.createdAt || b.performedAt) - new Date(a.createdAt || a.performedAt));

            if (allHistory.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm border border-gray-200">
                        <span class="material-icons text-5xl mb-4">history</span>
                        <p class="text-lg">${i18n.t('performance.noHistory')}</p>
                    </div>
                `;
            }

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="divide-y divide-gray-200">
                        ${allHistory.slice(0, 20).map(item => this.renderHistoryItem(item)).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Render a history item
         * @param {object} item
         * @returns {string}
         */
        renderHistoryItem(item) {
            const isThai = i18n.isThai();
            const goalName = item.goal ? (isThai ? (item.goal.name.th || item.goal.name.en) : item.goal.name.en) : '';
            const date = DateUtils.formatDateTime(item.createdAt || item.performedAt);

            if (item.type === 'progress') {
                return `
                    <div class="p-4 hover:bg-gray-50">
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <span class="material-icons text-blue-600 text-sm">trending_up</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-medium text-gray-900">${i18n.t('performance.progressUpdate')}</p>
                                <p class="text-sm text-gray-600">${goalName}</p>
                                <p class="text-sm text-gray-500 mt-1">
                                    ${i18n.t('performance.progress')}: ${item.previousProgress}% → ${item.newProgress}%
                                </p>
                                ${item.comment ? `
                                    <p class="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                                        ${isThai ? (item.commentTh || item.comment) : item.comment}
                                    </p>
                                ` : ''}
                                <p class="text-xs text-gray-400 mt-2">${date}</p>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                const actionConfig = {
                    created: { icon: 'add_circle', color: 'gray' },
                    submitted: { icon: 'send', color: 'blue' },
                    approved: { icon: 'check_circle', color: 'green' },
                    sent_back: { icon: 'reply', color: 'red' },
                    signoff_employee: { icon: 'draw', color: 'purple' },
                    signoff_manager: { icon: 'draw', color: 'purple' }
                };
                const config = actionConfig[item.action] || { icon: 'info', color: 'gray' };

                return `
                    <div class="p-4 hover:bg-gray-50">
                        <div class="flex items-start gap-4">
                            <div class="w-10 h-10 rounded-full bg-${config.color}-100 flex items-center justify-center flex-shrink-0">
                                <span class="material-icons text-${config.color}-600 text-sm">${config.icon}</span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-medium text-gray-900">
                                    ${this.getActionLabel(item.action)}
                                </p>
                                <p class="text-sm text-gray-600">${goalName}</p>
                                <p class="text-sm text-gray-500">
                                    ${isThai ? 'โดย' : 'By'}: ${item.performedByName}
                                </p>
                                ${item.comments ? `
                                    <p class="text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded">${item.comments}</p>
                                ` : ''}
                                <p class="text-xs text-gray-400 mt-2">${date}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        },

        /**
         * Get action label
         * @param {string} action
         * @returns {string}
         */
        getActionLabel(action) {
            const labels = {
                created: i18n.t('performance.goalCreated'),
                submitted: i18n.t('performance.goalSubmitted'),
                approved: i18n.t('performance.goalApproved'),
                sent_back: i18n.t('performance.goalSentBack'),
                signoff_employee: i18n.t('performance.employeeSignOff'),
                signoff_manager: i18n.t('performance.managerSignOff')
            };
            return labels[action] || action;
        },

        /**
         * Get category colors
         * @param {string} category
         * @returns {object}
         */
        getCategoryColors(category) {
            const colors = {
                kpi: { bg: 'bg-blue-100', text: 'text-blue-800', bar: 'bg-blue-500' },
                gbest: { bg: 'bg-purple-100', text: 'text-purple-800', bar: 'bg-purple-500' },
                development: { bg: 'bg-teal-100', text: 'text-teal-800', bar: 'bg-teal-500' }
            };
            return colors[category] || colors.kpi;
        },

        /**
         * Get status configuration
         * @param {string} status
         * @returns {object}
         */
        getStatusConfig(status) {
            const configs = {
                draft: { class: 'bg-gray-100 text-gray-800', icon: 'edit_note' },
                submitted: { class: 'bg-blue-100 text-blue-800', icon: 'send' },
                approved: { class: 'bg-green-100 text-green-800', icon: 'check_circle' },
                in_progress: { class: 'bg-orange-100 text-orange-800', icon: 'pending' },
                completed: { class: 'bg-teal-100 text-teal-800', icon: 'task_alt' },
                sent_back: { class: 'bg-red-100 text-red-800', icon: 'reply' }
            };
            return configs[status] || configs.draft;
        },

        /**
         * Get metric display info
         * @param {object} goal
         * @returns {object}
         */
        getMetricDisplay(goal) {
            const isThai = i18n.isThai();
            const metricLabels = {
                number: isThai ? 'ตัวเลข' : 'Number',
                percentage: isThai ? 'เปอร์เซ็นต์' : 'Percentage',
                yesno: isThai ? 'ใช่/ไม่ใช่' : 'Yes/No',
                rating: isThai ? 'คะแนน' : 'Rating'
            };

            let value = '';
            let unit = '';

            switch (goal.metric) {
                case 'percentage':
                    value = `${goal.actual}% / ${goal.target}%`;
                    unit = '%';
                    break;
                case 'yesno':
                    value = goal.actual === 1 ? (isThai ? 'สำเร็จ' : 'Completed') : (isThai ? 'ยังไม่สำเร็จ' : 'Not completed');
                    unit = '';
                    break;
                case 'rating':
                    value = `${goal.actual} / ${goal.target}`;
                    unit = '';
                    break;
                default:
                    value = `${goal.actual} / ${goal.target}`;
                    unit = '';
            }

            return {
                label: i18n.t('performance.target'),
                value: value,
                unit: unit
            };
        },

        /**
         * Switch tab
         * @param {string} tabId
         */
        switchTab(tabId) {
            activeTab = tabId;
            const container = document.getElementById('performance-tab-content');
            if (container) {
                container.innerHTML = this.renderTabContent();
            }

            // Update tab buttons styling and aria-selected
            document.querySelectorAll('[role="tab"]').forEach(btn => {
                const btnTabId = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                const isActive = btnTabId === activeTab;

                btn.setAttribute('aria-selected', isActive.toString());
                btn.classList.toggle('bg-white', isActive);
                btn.classList.toggle('text-cg-red', isActive);
                btn.classList.toggle('shadow-sm', isActive);
                btn.classList.toggle('text-gray-600', !isActive);
                btn.classList.toggle('hover:text-gray-900', !isActive);
            });
        },

        /**
         * Set filter
         * @param {string} filterType
         * @param {string} value
         */
        setFilter(filterType, value) {
            switch (filterType) {
                case 'period':
                    selectedPeriod = value;
                    break;
                case 'category':
                    selectedCategory = value;
                    break;
                case 'status':
                    selectedStatus = value;
                    break;
            }
            Router.refresh();
        },

        /**
         * Open goal form (create or edit)
         * @param {string} goalId - Optional, for edit mode
         */
        openGoalForm(goalId = null) {
            isEditing = !!goalId;
            const goal = goalId ? goals.find(g => g.id === goalId) : null;
            const isThai = i18n.isThai();

            const categoryOptions = [
                { value: 'kpi', label: 'KPI' },
                { value: 'gbest', label: 'G-BEST' },
                { value: 'development', label: i18n.t('performance.categoryDevelopment') }
            ];

            const metricOptions = [
                { value: 'number', label: i18n.t('performance.metricNumber') },
                { value: 'percentage', label: i18n.t('performance.metricPercentage') },
                { value: 'yesno', label: i18n.t('performance.metricYesNo') },
                { value: 'rating', label: i18n.t('performance.metricRating') }
            ];

            const gbestOptions = gbestCompetencies.map(c => ({
                value: c.code,
                label: `${c.code}: ${isThai ? c.nameTh : c.nameEn}`
            }));

            ModalComponent.open({
                title: isEditing ? i18n.t('performance.editGoal') : i18n.t('performance.createGoal'),
                size: 'lg',
                content: `
                    <form id="goal-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Goal Name (English) -->
                            ${FormFieldComponent.text({
                                name: 'nameEn',
                                label: i18n.t('performance.goalNameEn'),
                                required: true,
                                value: goal?.name?.en || ''
                            })}

                            <!-- Goal Name (Thai) -->
                            ${FormFieldComponent.text({
                                name: 'nameTh',
                                label: i18n.t('performance.goalNameTh'),
                                value: goal?.name?.th || ''
                            })}
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Description (English) -->
                            ${FormFieldComponent.textarea({
                                name: 'descriptionEn',
                                label: i18n.t('performance.descriptionEn'),
                                rows: 2,
                                value: goal?.description?.en || ''
                            })}

                            <!-- Description (Thai) -->
                            ${FormFieldComponent.textarea({
                                name: 'descriptionTh',
                                label: i18n.t('performance.descriptionTh'),
                                rows: 2,
                                value: goal?.description?.th || ''
                            })}
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Category -->
                            ${FormFieldComponent.select({
                                name: 'category',
                                label: i18n.t('performance.category'),
                                required: true,
                                value: goal?.category || 'kpi',
                                options: categoryOptions,
                                onChange: 'PerformancePage.onCategoryChange(this.value)'
                            })}

                            <!-- G-BEST Competency (shown when category is gbest) -->
                            <div id="gbest-field" class="${goal?.category === 'gbest' ? '' : 'hidden'}">
                                ${FormFieldComponent.select({
                                    name: 'gbestCode',
                                    label: i18n.t('performance.gbestCompetency'),
                                    value: goal?.gbestCode || '',
                                    options: [{ value: '', label: isThai ? 'เลือก' : 'Select' }, ...gbestOptions]
                                })}
                            </div>

                            <!-- Metric Type -->
                            ${FormFieldComponent.select({
                                name: 'metric',
                                label: i18n.t('performance.metricType'),
                                required: true,
                                value: goal?.metric || 'number',
                                options: metricOptions
                            })}
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Target Value -->
                            ${FormFieldComponent.number({
                                name: 'target',
                                label: i18n.t('performance.targetValue'),
                                required: true,
                                min: 0,
                                value: goal?.target || ''
                            })}

                            <!-- Weight -->
                            ${FormFieldComponent.number({
                                name: 'weight',
                                label: i18n.t('performance.weightPercentage'),
                                required: true,
                                min: 0,
                                max: 100,
                                value: goal?.weight || ''
                            })}

                            <!-- Period -->
                            ${FormFieldComponent.select({
                                name: 'period',
                                label: i18n.t('performance.reviewPeriod'),
                                required: true,
                                value: goal?.period || '2025',
                                options: [
                                    { value: '2025', label: '2025' },
                                    { value: 'Q1-2025', label: 'Q1 2025' },
                                    { value: 'Q2-2025', label: 'Q2 2025' },
                                    { value: 'Q3-2025', label: 'Q3 2025' },
                                    { value: 'Q4-2025', label: 'Q4 2025' },
                                    { value: '2026', label: '2026' },
                                    { value: 'Q1-2026', label: 'Q1 2026' }
                                ]
                            })}
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Start Date -->
                            ${FormFieldComponent.date({
                                name: 'startDate',
                                label: i18n.t('performance.startDate'),
                                required: true,
                                value: goal?.startDate || ''
                            })}

                            <!-- End Date -->
                            ${FormFieldComponent.date({
                                name: 'endDate',
                                label: i18n.t('performance.endDate'),
                                required: true,
                                value: goal?.endDate || ''
                            })}
                        </div>

                        ${goalId ? `<input type="hidden" name="goalId" value="${goalId}">` : ''}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'PerformancePage.saveGoal()' }
                ]
            });
        },

        /**
         * Handle category change in form
         * @param {string} category
         */
        onCategoryChange(category) {
            const gbestField = document.getElementById('gbest-field');
            if (gbestField) {
                gbestField.classList.toggle('hidden', category !== 'gbest');
            }
        },

        /**
         * Save goal (create or update)
         */
        async saveGoal() {
            const formData = FormFieldComponent.getFormData('goal-form');

            // Validate required fields
            if (!formData.nameEn || !formData.target || !formData.weight || !formData.startDate || !formData.endDate) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            const goalData = {
                name: { en: formData.nameEn, th: formData.nameTh || formData.nameEn },
                description: { en: formData.descriptionEn || '', th: formData.descriptionTh || formData.descriptionEn || '' },
                category: formData.category,
                gbestCode: formData.category === 'gbest' ? formData.gbestCode : null,
                metric: formData.metric,
                target: parseFloat(formData.target),
                weight: parseInt(formData.weight),
                period: formData.period,
                startDate: formData.startDate,
                endDate: formData.endDate
            };

            try {
                if (formData.goalId) {
                    await API.updateGoal(formData.goalId, goalData);
                    ToastComponent.success(i18n.t('performance.goalUpdated'));
                } else {
                    await API.createGoal(goalData);
                    ToastComponent.success(i18n.t('performance.goalCreated'));
                }

                ModalComponent.close();
                await this.loadData();
                Router.refresh();
            } catch (error) {
                console.error('Save goal error:', error);
                ToastComponent.error(error.message || i18n.t('error.generic'));
            }
        },

        /**
         * Edit goal
         * @param {string} goalId
         */
        editGoal(goalId) {
            this.openGoalForm(goalId);
        },

        /**
         * Delete goal
         * @param {string} goalId
         */
        async deleteGoal(goalId) {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('performance.deleteGoal'),
                message: i18n.t('performance.confirmDelete'),
                confirmText: i18n.t('common.delete'),
                icon: 'delete'
            });

            if (!confirmed) return;

            try {
                await API.deleteGoal(goalId);
                ToastComponent.success(i18n.t('performance.goalDeleted'));
                await this.loadData();
                Router.refresh();
            } catch (error) {
                console.error('Delete goal error:', error);
                ToastComponent.error(error.message || i18n.t('error.generic'));
            }
        },

        /**
         * Submit goal for review
         * @param {string} goalId
         */
        async submitGoal(goalId) {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('performance.submitForReview'),
                message: i18n.t('performance.confirmSubmit'),
                confirmText: i18n.t('performance.submitForReview'),
                icon: 'send'
            });

            if (!confirmed) return;

            try {
                await API.submitGoalForReview(goalId);
                ToastComponent.success(i18n.t('performance.goalSubmitted'));
                await this.loadData();
                Router.refresh();
            } catch (error) {
                console.error('Submit goal error:', error);
                ToastComponent.error(error.message || i18n.t('error.generic'));
            }
        },

        /**
         * Sign off goal
         * @param {string} goalId
         * @param {string} role
         */
        async signOffGoal(goalId, role) {
            try {
                await API.signOffGoal(goalId, role);
                ToastComponent.success(i18n.t('performance.signedOff'));
                await this.loadData();
                Router.refresh();
            } catch (error) {
                console.error('Sign off error:', error);
                ToastComponent.error(error.message || i18n.t('error.generic'));
            }
        },

        /**
         * View goal details
         * @param {string} goalId
         */
        viewGoalDetails(goalId) {
            const goal = goals.find(g => g.id === goalId);
            if (!goal) return;

            const isThai = i18n.isThai();
            const name = isThai ? (goal.name.th || goal.name.en) : goal.name.en;
            const description = isThai ? (goal.description.th || goal.description.en) : goal.description.en;
            const statusConfig = this.getStatusConfig(goal.status);

            let gbestName = '';
            if (goal.gbestCode) {
                const competency = gbestCompetencies.find(c => c.code === goal.gbestCode);
                if (competency) {
                    gbestName = isThai ? competency.nameTh : competency.nameEn;
                }
            }

            ModalComponent.open({
                title: i18n.t('performance.goalDetails'),
                size: 'lg',
                content: `
                    <div class="space-y-6">
                        <!-- Goal Name & Status -->
                        <div>
                            <h3 class="text-xl font-medium text-gray-900">${name}</h3>
                            <span class="inline-flex items-center gap-1 mt-2 px-2 py-1 text-xs font-medium rounded-full ${statusConfig.class}">
                                <span class="material-icons text-xs">${statusConfig.icon}</span>
                                ${i18n.t(`performance.status${goal.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`)}
                            </span>
                        </div>

                        <!-- Description -->
                        <div>
                            <p class="text-sm text-gray-500 mb-1">${i18n.t('performance.description')}</p>
                            <p class="text-gray-700">${description || '-'}</p>
                        </div>

                        <!-- Details Grid -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <p class="text-gray-500">${i18n.t('performance.category')}</p>
                                <p class="font-medium">${goal.category === 'kpi' ? 'KPI' : goal.category === 'gbest' ? 'G-BEST' : i18n.t('performance.categoryDevelopment')}</p>
                            </div>
                            ${goal.gbestCode ? `
                                <div>
                                    <p class="text-gray-500">${i18n.t('performance.gbestCompetency')}</p>
                                    <p class="font-medium">${goal.gbestCode}: ${gbestName}</p>
                                </div>
                            ` : ''}
                            <div>
                                <p class="text-gray-500">${i18n.t('performance.weight')}</p>
                                <p class="font-medium">${goal.weight}%</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('performance.reviewPeriod')}</p>
                                <p class="font-medium">${goal.period}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('performance.startDate')}</p>
                                <p class="font-medium">${DateUtils.format(goal.startDate, 'medium')}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('performance.endDate')}</p>
                                <p class="font-medium">${DateUtils.format(goal.endDate, 'medium')}</p>
                            </div>
                        </div>

                        <!-- Progress -->
                        <div>
                            <p class="text-sm text-gray-500 mb-2">${i18n.t('performance.progress')}</p>
                            <div class="flex items-center gap-4">
                                <div class="flex-1">
                                    <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <div class="h-full ${goal.progress >= 100 ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-300"
                                             style="width: ${Math.min(goal.progress, 100)}%"></div>
                                    </div>
                                </div>
                                <span class="text-lg font-bold ${goal.progress >= 100 ? 'text-green-600' : 'text-blue-600'}">${goal.progress}%</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-2">
                                ${i18n.t('performance.actual')}: ${goal.actual} / ${i18n.t('performance.target')}: ${goal.target}
                            </p>
                        </div>

                        <!-- Sign-off Status -->
                        <div class="border-t pt-4">
                            <p class="text-sm font-medium text-gray-900 mb-3">${i18n.t('performance.workflowStatus')}</p>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="flex items-center gap-2">
                                    <span class="material-icons text-sm ${goal.signedOffEmployee ? 'text-green-600' : 'text-gray-400'}">
                                        ${goal.signedOffEmployee ? 'check_circle' : 'radio_button_unchecked'}
                                    </span>
                                    <span class="text-sm">
                                        ${i18n.t('performance.employeeSignOff')}:
                                        ${goal.signedOffEmployee ? DateUtils.format(goal.signedOffEmployeeDate, 'medium') : i18n.t('performance.notSigned')}
                                    </span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="material-icons text-sm ${goal.signedOffManager ? 'text-green-600' : 'text-gray-400'}">
                                        ${goal.signedOffManager ? 'check_circle' : 'radio_button_unchecked'}
                                    </span>
                                    <span class="text-sm">
                                        ${i18n.t('performance.managerSignOff')}:
                                        ${goal.signedOffManager ? DateUtils.format(goal.signedOffManagerDate, 'medium') : i18n.t('performance.notSigned')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        ${goal.reviewComments ? `
                            <div class="border-t pt-4">
                                <p class="text-sm font-medium text-gray-900 mb-2">${i18n.t('performance.reviewComments')}</p>
                                <p class="p-3 bg-gray-50 rounded-lg text-sm">${goal.reviewComments}</p>
                            </div>
                        ` : ''}
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        /**
         * Open progress update modal
         * @param {string} goalId
         */
        openProgressUpdate(goalId) {
            const goal = goals.find(g => g.id === goalId);
            if (!goal) return;

            const isThai = i18n.isThai();
            const name = isThai ? (goal.name.th || goal.name.en) : goal.name.en;

            let inputType = 'number';
            let inputMin = 0;
            let inputMax = null;
            let inputStep = 1;

            switch (goal.metric) {
                case 'percentage':
                    inputMax = 100;
                    break;
                case 'rating':
                    inputMax = 5;
                    inputStep = 0.1;
                    break;
                case 'yesno':
                    inputMax = 1;
                    break;
            }

            ModalComponent.open({
                title: i18n.t('performance.updateProgress'),
                size: 'md',
                content: `
                    <form id="progress-form" class="space-y-4">
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <h4 class="font-medium text-gray-900">${name}</h4>
                            <p class="text-sm text-gray-500 mt-1">
                                ${i18n.t('performance.target')}: ${goal.target} |
                                ${i18n.t('performance.actual')}: ${goal.actual} |
                                ${i18n.t('performance.progress')}: ${goal.progress}%
                            </p>
                        </div>

                        ${goal.metric === 'yesno' ? `
                            ${FormFieldComponent.select({
                                name: 'actual',
                                label: i18n.t('performance.actualValue'),
                                required: true,
                                value: goal.actual.toString(),
                                options: [
                                    { value: '0', label: isThai ? 'ยังไม่สำเร็จ' : 'Not Completed' },
                                    { value: '1', label: isThai ? 'สำเร็จ' : 'Completed' }
                                ]
                            })}
                        ` : `
                            ${FormFieldComponent.number({
                                name: 'actual',
                                label: i18n.t('performance.actualValue'),
                                required: true,
                                min: inputMin,
                                max: inputMax,
                                step: inputStep,
                                value: goal.actual
                            })}
                        `}

                        ${FormFieldComponent.textarea({
                            name: 'comment',
                            label: i18n.t('performance.addComment'),
                            rows: 3,
                            placeholder: isThai ? 'เพิ่มความคิดเห็นหรือหมายเหตุ...' : 'Add a comment or note...'
                        })}

                        <input type="hidden" name="goalId" value="${goalId}">
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'PerformancePage.saveProgress()' }
                ]
            });
        },

        /**
         * Save progress update
         */
        async saveProgress() {
            const formData = FormFieldComponent.getFormData('progress-form');

            if (formData.actual === '' || formData.actual === undefined) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            try {
                await API.updateGoalProgress(formData.goalId, {
                    actual: parseFloat(formData.actual),
                    comment: formData.comment
                });

                ToastComponent.success(i18n.t('performance.progressSaved'));
                ModalComponent.close();
                await this.loadData();
                Router.refresh();
            } catch (error) {
                console.error('Update progress error:', error);
                ToastComponent.error(error.message || i18n.t('error.generic'));
            }
        },

        // ========================================
        // Evaluation Tab Methods
        // ========================================

        /**
         * Render evaluation tab
         * @returns {string}
         */
        renderEvaluationTab() {
            const isThai = i18n.isThai();

            return `
                <div class="space-y-6">
                    <!-- Period Selector -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <span class="material-icons text-cg-red">assessment</span>
                                <h2 class="text-lg font-medium text-gray-900">${i18n.t('evaluation.title')}</h2>
                            </div>
                            <select onchange="PerformancePage.selectEvaluationPeriod(this.value)"
                                    class="px-4 py-2 border rounded-lg text-sm">
                                <option value="2025" ${selectedPeriod === '2025' ? 'selected' : ''}>2025</option>
                                <option value="2024" ${selectedPeriod === '2024' ? 'selected' : ''}>2024</option>
                            </select>
                        </div>
                    </div>

                    ${currentEvaluation ? this.renderCurrentEvaluation() : this.renderNoEvaluation()}

                    <!-- Evaluation History -->
                    ${this.renderEvaluationHistory()}
                </div>
            `;
        },

        /**
         * Render no active evaluation state
         * @returns {string}
         */
        renderNoEvaluation() {
            const isThai = i18n.isThai();
            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <span class="material-icons text-5xl text-gray-400 mb-4">assignment</span>
                    <p class="text-lg text-gray-600 mb-4">${i18n.t('evaluation.noActiveEvaluation')}</p>
                    <button onclick="PerformancePage.createEvaluation()"
                            class="inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                        <span class="material-icons text-sm">add</span>
                        ${i18n.t('evaluation.createEvaluation')}
                    </button>
                </div>
            `;
        },

        /**
         * Render current evaluation
         * @returns {string}
         */
        renderCurrentEvaluation() {
            const isThai = i18n.isThai();
            const evaluation = currentEvaluation;
            const statusConfig = this.getEvaluationStatusConfig(evaluation.status);

            return `
                <div class="space-y-6">
                    <!-- Evaluation Status Card -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                            <div>
                                <h3 class="text-xl font-medium text-gray-900">
                                    ${isThai ? evaluation.periodLabel?.th : evaluation.periodLabel?.en}
                                </h3>
                                <div class="flex items-center gap-2 mt-2">
                                    <span class="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${statusConfig.class}">
                                        <span class="material-icons text-sm">${statusConfig.icon}</span>
                                        ${i18n.t(`evaluation.status.${evaluation.status}`)}
                                    </span>
                                    <span class="text-sm text-gray-500">
                                        ${i18n.t('common.updated')}: ${DateUtils.format(evaluation.updatedAt, 'medium')}
                                    </span>
                                </div>
                            </div>
                            ${this.renderEvaluationActions(evaluation)}
                        </div>

                        <!-- Workflow Progress -->
                        ${this.renderWorkflowProgress(evaluation)}
                    </div>

                    <!-- Evaluation Sections based on status -->
                    ${this.renderEvaluationSections(evaluation)}
                </div>
            `;
        },

        /**
         * Get evaluation status configuration
         * @param {string} status
         * @returns {object}
         */
        getEvaluationStatusConfig(status) {
            const configs = {
                self_assessment: { class: 'bg-blue-100 text-blue-800', icon: 'person' },
                manager_review: { class: 'bg-orange-100 text-orange-800', icon: 'supervisor_account' },
                calibration: { class: 'bg-purple-100 text-purple-800', icon: 'tune' },
                confirmed: { class: 'bg-teal-100 text-teal-800', icon: 'verified' },
                acknowledged: { class: 'bg-green-100 text-green-800', icon: 'check_circle' }
            };
            return configs[status] || configs.self_assessment;
        },

        /**
         * Render evaluation action buttons
         * @param {object} evaluation
         * @returns {string}
         */
        renderEvaluationActions(evaluation) {
            const isThai = i18n.isThai();
            let actions = [];

            switch (evaluation.status) {
                case 'self_assessment':
                    actions.push(`
                        <button onclick="PerformancePage.saveSelfAssessment()"
                                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                            ${i18n.t('evaluation.action.save')}
                        </button>
                        <button onclick="PerformancePage.submitSelfAssessment()"
                                class="px-4 py-2 text-sm bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                            ${i18n.t('evaluation.action.submitSelfAssessment')}
                        </button>
                    `);
                    break;
                case 'confirmed':
                    actions.push(`
                        <button onclick="PerformancePage.acknowledgeEvaluation()"
                                class="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                            ${i18n.t('evaluation.action.acknowledgeEvaluation')}
                        </button>
                    `);
                    break;
                case 'acknowledged':
                    actions.push(`
                        <button onclick="PerformancePage.exportEvaluationPdf()"
                                class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                            <span class="material-icons text-sm align-middle mr-1">download</span>
                            ${i18n.t('evaluation.action.export')}
                        </button>
                    `);
                    break;
            }

            return actions.length > 0 ? `<div class="flex gap-2">${actions.join('')}</div>` : '';
        },

        /**
         * Render workflow progress indicator
         * @param {object} evaluation
         * @returns {string}
         */
        renderWorkflowProgress(evaluation) {
            const isThai = i18n.isThai();
            const steps = [
                { id: 'self_assessment', label: i18n.t('evaluation.workflow.selfAssessment'), icon: 'person' },
                { id: 'manager_review', label: i18n.t('evaluation.workflow.managerReview'), icon: 'supervisor_account' },
                { id: 'calibration', label: i18n.t('evaluation.workflow.calibration'), icon: 'tune' },
                { id: 'confirmed', label: i18n.t('evaluation.workflow.confirmation'), icon: 'verified' },
                { id: 'acknowledged', label: i18n.t('evaluation.workflow.acknowledgment'), icon: 'check_circle' }
            ];

            const statusOrder = ['self_assessment', 'manager_review', 'calibration', 'confirmed', 'acknowledged'];
            const currentIndex = statusOrder.indexOf(evaluation.status);

            return `
                <div class="flex flex-wrap items-center justify-between gap-2 pt-4 border-t">
                    ${steps.map((step, index) => {
                        const isCompleted = index < currentIndex;
                        const isCurrent = index === currentIndex;
                        const isPending = index > currentIndex;

                        return `
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full flex items-center justify-center
                                    ${isCompleted ? 'bg-green-500 text-white' :
                                      isCurrent ? 'bg-cg-red text-white' :
                                      'bg-gray-200 text-gray-400'}">
                                    <span class="material-icons text-sm">${isCompleted ? 'check' : step.icon}</span>
                                </div>
                                <span class="text-xs ${isCurrent ? 'font-medium text-gray-900' : 'text-gray-500'} hidden sm:inline">
                                    ${step.label}
                                </span>
                                ${index < steps.length - 1 ? `
                                    <div class="w-4 sm:w-8 h-0.5 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}"></div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        },

        /**
         * Render evaluation sections based on status
         * @param {object} evaluation
         * @returns {string}
         */
        renderEvaluationSections(evaluation) {
            return `
                <div class="space-y-6">
                    <!-- Section 1: KPI Results -->
                    ${this.renderKpiSection(evaluation)}

                    <!-- Section 2: G-BEST Ratings -->
                    ${this.renderGbestSection(evaluation)}

                    <!-- Section 3: Attendance Score -->
                    ${this.renderAttendanceSection(evaluation)}

                    <!-- Section 4: Manager Assessment (read-only for employee) -->
                    ${evaluation.managerAssessment ? this.renderManagerSection(evaluation) : ''}

                    <!-- Section 5: Strengths & Areas -->
                    ${evaluation.strengths || evaluation.areasForImprovement ? this.renderStrengthsSection(evaluation) : ''}

                    <!-- Section 6: Final Rating -->
                    ${evaluation.finalRating ? this.renderFinalRatingSection(evaluation) : ''}
                </div>
            `;
        },

        /**
         * Render KPI Results section
         * @param {object} evaluation
         * @returns {string}
         */
        renderKpiSection(evaluation) {
            const isThai = i18n.isThai();
            const kpiScore = evaluation.kpiScore || {};

            // Get KPI goals for this period
            const kpiGoals = goals.filter(g =>
                g.category === 'kpi' &&
                g.period.includes(evaluation.period)
            );

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-4 bg-blue-50 border-b flex items-center gap-3">
                        <span class="material-icons text-blue-600">bar_chart</span>
                        <h3 class="font-medium text-gray-900">${i18n.t('evaluation.section.kpiResults')}</h3>
                        <span class="ml-auto text-sm text-gray-500">${i18n.t('evaluation.weight.kpi')}: ${evaluationWeights.kpi}%</span>
                    </div>
                    <div class="p-4">
                        <!-- KPI Summary -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <p class="text-2xl font-bold text-blue-600">${kpiGoals.length}</p>
                                <p class="text-xs text-gray-500">${i18n.t('evaluation.kpi.totalGoals')}</p>
                            </div>
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <p class="text-2xl font-bold text-green-600">${kpiGoals.filter(g => g.status === 'completed').length}</p>
                                <p class="text-xs text-gray-500">${i18n.t('evaluation.kpi.completedGoals')}</p>
                            </div>
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <p class="text-2xl font-bold text-gray-700">
                                    ${kpiGoals.length > 0 ? Math.round(kpiGoals.reduce((s, g) => s + g.progress, 0) / kpiGoals.length) : 0}%
                                </p>
                                <p class="text-xs text-gray-500">${i18n.t('evaluation.kpi.averageProgress')}</p>
                            </div>
                            <div class="text-center p-3 bg-blue-100 rounded-lg">
                                <p class="text-2xl font-bold text-blue-700">${kpiScore.weightedScore || '-'}</p>
                                <p class="text-xs text-gray-500">${i18n.t('evaluation.kpi.weightedScore')}</p>
                            </div>
                        </div>

                        <!-- KPI Goals Table -->
                        ${kpiGoals.length > 0 ? `
                            <div class="overflow-x-auto">
                                <table class="w-full text-sm">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 text-left font-medium text-gray-600">${i18n.t('evaluation.kpi.goal')}</th>
                                            <th class="px-4 py-2 text-center font-medium text-gray-600">${i18n.t('evaluation.kpi.weight')}</th>
                                            <th class="px-4 py-2 text-center font-medium text-gray-600">${i18n.t('evaluation.kpi.progress')}</th>
                                            <th class="px-4 py-2 text-center font-medium text-gray-600">${i18n.t('evaluation.kpi.score')}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y">
                                        ${kpiGoals.map(goal => `
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-4 py-3">
                                                    <p class="font-medium text-gray-900">${isThai ? (goal.name.th || goal.name.en) : goal.name.en}</p>
                                                </td>
                                                <td class="px-4 py-3 text-center">${goal.weight}%</td>
                                                <td class="px-4 py-3">
                                                    <div class="flex items-center gap-2">
                                                        <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div class="h-full ${goal.progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}"
                                                                 style="width: ${Math.min(goal.progress, 100)}%"></div>
                                                        </div>
                                                        <span class="text-xs">${goal.progress}%</span>
                                                    </div>
                                                </td>
                                                <td class="px-4 py-3 text-center">
                                                    ${goal.status === 'completed'
                                                        ? this.renderRatingBadge(Math.round(goal.progress / 20))
                                                        : '<span class="text-gray-400">-</span>'}
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : `
                            <p class="text-center text-gray-500 py-4">${i18n.t('performance.noGoals')}</p>
                        `}

                        <p class="text-xs text-gray-400 mt-4 text-center">
                            <span class="material-icons text-xs align-middle">info</span>
                            ${i18n.t('evaluation.kpi.autoCalculated')}
                        </p>
                    </div>
                </div>
            `;
        },

        /**
         * Render G-BEST competency ratings section
         * @param {object} evaluation
         * @returns {string}
         */
        renderGbestSection(evaluation) {
            const isThai = i18n.isThai();
            const gbestRatings = evaluation.gbestRatings || {};
            const selfAssessment = gbestRatings.selfAssessment || selfAssessmentDraft;
            const managerAssessment = gbestRatings.managerAssessment;
            const canEdit = evaluation.status === 'self_assessment';

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-4 bg-purple-50 border-b flex items-center gap-3">
                        <span class="material-icons text-purple-600">psychology</span>
                        <h3 class="font-medium text-gray-900">${i18n.t('evaluation.section.gbestRatings')}</h3>
                        <span class="ml-auto text-sm text-gray-500">${i18n.t('evaluation.weight.gbest')}: ${evaluationWeights.gbest}%</span>
                    </div>
                    <div class="p-4">
                        <!-- Rating Scale Legend -->
                        <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                            <p class="text-xs font-medium text-gray-600 mb-2">${i18n.t('evaluation.rating.scale')}:</p>
                            <div class="flex flex-wrap gap-2">
                                ${[5, 4, 3, 2, 1].map(r => `
                                    <span class="text-xs px-2 py-1 rounded ${this.getRatingBadgeClass(r)}">
                                        ${r} = ${i18n.t(`evaluation.rating.${r}`)}
                                    </span>
                                `).join('')}
                            </div>
                        </div>

                        <!-- G-BEST Ratings Table -->
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-2 text-left font-medium text-gray-600">${i18n.t('evaluation.gbest.competency')}</th>
                                        <th class="px-4 py-2 text-center font-medium text-gray-600">${i18n.t('evaluation.gbest.selfRating')}</th>
                                        ${managerAssessment ? `
                                            <th class="px-4 py-2 text-center font-medium text-gray-600">${i18n.t('evaluation.gbest.managerRating')}</th>
                                        ` : ''}
                                        <th class="px-4 py-2 text-left font-medium text-gray-600">${i18n.t('evaluation.gbest.comment')}</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y">
                                    ${gbestCompetencies.map(comp => {
                                        const selfRating = selfAssessment[comp.code];
                                        const managerRating = managerAssessment ? managerAssessment[comp.code] : null;

                                        return `
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-4 py-3">
                                                    <div class="flex items-center gap-2">
                                                        <span class="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                                                            ${comp.code}
                                                        </span>
                                                        <div>
                                                            <p class="font-medium text-gray-900">${isThai ? comp.nameTh : comp.nameEn}</p>
                                                            <p class="text-xs text-gray-500">${isThai ? comp.descriptionTh : comp.descriptionEn}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-4 py-3 text-center">
                                                    ${canEdit ? `
                                                        <select onchange="PerformancePage.updateSelfAssessment('${comp.code}', 'score', this.value)"
                                                                class="w-16 px-2 py-1 border rounded text-center text-sm">
                                                            <option value="">-</option>
                                                            ${[5, 4, 3, 2, 1].map(r => `
                                                                <option value="${r}" ${selfRating?.score == r ? 'selected' : ''}>${r}</option>
                                                            `).join('')}
                                                        </select>
                                                    ` : `
                                                        ${selfRating?.score ? this.renderRatingBadge(selfRating.score) : '-'}
                                                    `}
                                                </td>
                                                ${managerAssessment ? `
                                                    <td class="px-4 py-3 text-center">
                                                        ${managerRating?.score ? this.renderRatingBadge(managerRating.score) : '-'}
                                                    </td>
                                                ` : ''}
                                                <td class="px-4 py-3">
                                                    ${canEdit ? `
                                                        <input type="text"
                                                               value="${selfRating?.comment ? (isThai ? selfRating.comment.th || '' : selfRating.comment.en || '') : ''}"
                                                               onchange="PerformancePage.updateSelfAssessment('${comp.code}', 'comment', this.value)"
                                                               placeholder="${i18n.t('evaluation.gbest.addComment')}"
                                                               class="w-full px-2 py-1 border rounded text-sm">
                                                    ` : `
                                                        <span class="text-gray-600 text-sm">
                                                            ${selfRating?.comment ? (isThai ? selfRating.comment.th || selfRating.comment.en : selfRating.comment.en) : '-'}
                                                        </span>
                                                    `}
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>

                        <!-- Average Score -->
                        ${gbestRatings.averageScore ? `
                            <div class="mt-4 p-4 bg-purple-50 rounded-lg text-center">
                                <p class="text-sm text-gray-600">${i18n.t('evaluation.gbest.averageScore')}</p>
                                <p class="text-3xl font-bold text-purple-700">${gbestRatings.averageScore}</p>
                            </div>
                        ` : ''}

                        <!-- Rating Comparison (if both exist) -->
                        ${selfAssessment && managerAssessment ? this.renderRatingComparison(selfAssessment, managerAssessment) : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Render rating comparison chart
         * @param {object} selfRatings
         * @param {object} managerRatings
         * @returns {string}
         */
        renderRatingComparison(selfRatings, managerRatings) {
            const isThai = i18n.isThai();
            const codes = ['G', 'B', 'E', 'S', 'T'];

            let hasDiscrepancy = false;
            codes.forEach(code => {
                const self = selfRatings[code]?.score || 0;
                const manager = managerRatings[code]?.score || 0;
                if (Math.abs(self - manager) >= 2) hasDiscrepancy = true;
            });

            return `
                <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-4">${i18n.t('evaluation.comparison.title')}</h4>
                    <div class="space-y-3">
                        ${codes.map(code => {
                            const self = selfRatings[code]?.score || 0;
                            const manager = managerRatings[code]?.score || 0;
                            const diff = self - manager;
                            const comp = gbestCompetencies.find(c => c.code === code);

                            return `
                                <div class="flex items-center gap-3">
                                    <span class="w-8 text-sm font-medium text-gray-600">${code}</span>
                                    <div class="flex-1 flex items-center gap-2">
                                        <!-- Self rating bar -->
                                        <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden relative">
                                            <div class="absolute inset-y-0 left-0 bg-blue-500 rounded-full"
                                                 style="width: ${(self / 5) * 100}%"></div>
                                        </div>
                                        <span class="text-xs text-blue-600 w-4">${self}</span>
                                        <!-- Manager rating bar -->
                                        <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden relative">
                                            <div class="absolute inset-y-0 left-0 bg-orange-500 rounded-full"
                                                 style="width: ${(manager / 5) * 100}%"></div>
                                        </div>
                                        <span class="text-xs text-orange-600 w-4">${manager}</span>
                                        ${Math.abs(diff) >= 2 ? `
                                            <span class="material-icons text-red-500 text-sm" title="${i18n.t('evaluation.comparison.discrepancy')}">warning</span>
                                        ` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    <div class="flex gap-4 mt-4 text-xs">
                        <span class="flex items-center gap-1"><span class="w-3 h-3 bg-blue-500 rounded"></span> ${i18n.t('evaluation.rating.yourRating')}</span>
                        <span class="flex items-center gap-1"><span class="w-3 h-3 bg-orange-500 rounded"></span> ${i18n.t('evaluation.rating.managerRating')}</span>
                    </div>
                    ${hasDiscrepancy ? `
                        <p class="mt-3 text-sm text-red-600">
                            <span class="material-icons text-sm align-middle">info</span>
                            ${i18n.t('evaluation.comparison.discrepancyNote')}
                        </p>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render attendance section
         * @param {object} evaluation
         * @returns {string}
         */
        renderAttendanceSection(evaluation) {
            const isThai = i18n.isThai();
            const attendance = evaluation.attendanceScore || attendanceData || {};

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-4 bg-teal-50 border-b flex items-center gap-3">
                        <span class="material-icons text-teal-600">schedule</span>
                        <h3 class="font-medium text-gray-900">${i18n.t('evaluation.section.attendanceScore')}</h3>
                        <span class="ml-auto text-sm text-gray-500">${i18n.t('evaluation.weight.attendance')}: ${evaluationWeights.attendance}%</span>
                    </div>
                    <div class="p-4">
                        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <p class="text-2xl font-bold text-gray-700">${attendance.workDays || '-'}</p>
                                <p class="text-xs text-gray-500">${i18n.t('evaluation.attendance.workDays')}</p>
                            </div>
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <p class="text-2xl font-bold text-green-600">${attendance.attendedDays || '-'}</p>
                                <p class="text-xs text-gray-500">${i18n.t('evaluation.attendance.attendedDays')}</p>
                            </div>
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <p class="text-2xl font-bold text-yellow-600">${attendance.lateDays || '-'}</p>
                                <p class="text-xs text-gray-500">${i18n.t('evaluation.attendance.lateDays')}</p>
                            </div>
                            <div class="text-center p-3 bg-gray-50 rounded-lg">
                                <p class="text-2xl font-bold text-red-600">${attendance.absentDays || '-'}</p>
                                <p class="text-xs text-gray-500">${i18n.t('evaluation.attendance.absentDays')}</p>
                            </div>
                            <div class="text-center p-3 bg-teal-100 rounded-lg">
                                <p class="text-2xl font-bold text-teal-700">${attendance.score || '-'}</p>
                                <p class="text-xs text-gray-500">${i18n.t('evaluation.attendance.score')}</p>
                            </div>
                        </div>
                        <p class="text-xs text-gray-400 mt-4 text-center">
                            <span class="material-icons text-xs align-middle">info</span>
                            ${i18n.t('evaluation.attendance.autoCalculated')}
                        </p>
                    </div>
                </div>
            `;
        },

        /**
         * Render manager assessment section (read-only for employee)
         * @param {object} evaluation
         * @returns {string}
         */
        renderManagerSection(evaluation) {
            const isThai = i18n.isThai();
            const managerAssessment = evaluation.managerAssessment;

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-4 bg-orange-50 border-b flex items-center gap-3">
                        <span class="material-icons text-orange-600">supervisor_account</span>
                        <h3 class="font-medium text-gray-900">${i18n.t('evaluation.section.managerAssessment')}</h3>
                        <span class="ml-auto text-sm text-gray-500">${i18n.t('evaluation.weight.manager')}: ${evaluationWeights.manager}%</span>
                    </div>
                    <div class="p-4">
                        <div class="flex items-center gap-6">
                            <div class="text-center">
                                <p class="text-sm text-gray-500 mb-2">${i18n.t('evaluation.manager.overallRating')}</p>
                                ${this.renderRatingBadge(managerAssessment.score, 'lg')}
                                <p class="text-sm font-medium text-gray-700 mt-1">
                                    ${i18n.t(`evaluation.rating.${managerAssessment.score}`)}
                                </p>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm text-gray-500 mb-2">${i18n.t('evaluation.manager.comments')}</p>
                                <p class="text-gray-700 p-3 bg-gray-50 rounded-lg">
                                    ${managerAssessment.comment
                                        ? (isThai ? managerAssessment.comment.th || managerAssessment.comment.en : managerAssessment.comment.en)
                                        : '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render strengths and areas for improvement section
         * @param {object} evaluation
         * @returns {string}
         */
        renderStrengthsSection(evaluation) {
            const isThai = i18n.isThai();

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-4 bg-gray-50 border-b flex items-center gap-3">
                        <span class="material-icons text-gray-600">stars</span>
                        <h3 class="font-medium text-gray-900">${i18n.t('evaluation.section.strengthsAreas')}</h3>
                    </div>
                    <div class="p-4 grid md:grid-cols-2 gap-6">
                        <!-- Strengths -->
                        <div>
                            <h4 class="flex items-center gap-2 font-medium text-green-700 mb-3">
                                <span class="material-icons text-sm">thumb_up</span>
                                ${i18n.t('evaluation.strengthsAreas.strengths')}
                            </h4>
                            <div class="p-4 bg-green-50 rounded-lg text-sm text-gray-700 whitespace-pre-line">
                                ${evaluation.strengths
                                    ? (isThai ? evaluation.strengths.th || evaluation.strengths.en : evaluation.strengths.en)
                                    : '-'}
                            </div>
                        </div>
                        <!-- Areas for Improvement -->
                        <div>
                            <h4 class="flex items-center gap-2 font-medium text-amber-700 mb-3">
                                <span class="material-icons text-sm">trending_up</span>
                                ${i18n.t('evaluation.strengthsAreas.areasForImprovement')}
                            </h4>
                            <div class="p-4 bg-amber-50 rounded-lg text-sm text-gray-700 whitespace-pre-line">
                                ${evaluation.areasForImprovement
                                    ? (isThai ? evaluation.areasForImprovement.th || evaluation.areasForImprovement.en : evaluation.areasForImprovement.en)
                                    : '-'}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render final rating section
         * @param {object} evaluation
         * @returns {string}
         */
        renderFinalRatingSection(evaluation) {
            const isThai = i18n.isThai();
            const finalRating = evaluation.finalRating;
            const breakdown = finalRating.breakdown || {};

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-4 bg-gradient-to-r from-cg-red to-red-600 text-white flex items-center gap-3">
                        <span class="material-icons">emoji_events</span>
                        <h3 class="font-medium">${i18n.t('evaluation.section.finalRating')}</h3>
                    </div>
                    <div class="p-6">
                        <!-- Final Rating Display -->
                        <div class="text-center mb-6">
                            <div class="inline-flex items-center justify-center w-24 h-24 rounded-full ${this.getFinalRatingBgClass(finalRating.rating)}">
                                <span class="text-4xl font-bold text-white">${finalRating.rating}</span>
                            </div>
                            <p class="text-xl font-medium text-gray-900 mt-3">
                                ${isThai ? finalRating.ratingLabel?.th : finalRating.ratingLabel?.en}
                            </p>
                            <p class="text-sm text-gray-500">
                                ${i18n.t('evaluation.final.weightedScore')}: ${finalRating.weightedScore}
                            </p>
                        </div>

                        <!-- Score Breakdown -->
                        <div class="border-t pt-6">
                            <h4 class="font-medium text-gray-900 mb-4">${i18n.t('evaluation.final.breakdown')}</h4>
                            <div class="overflow-x-auto">
                                <table class="w-full text-sm">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 text-left font-medium text-gray-600">${i18n.t('evaluation.final.component')}</th>
                                            <th class="px-4 py-2 text-center font-medium text-gray-600">${i18n.t('evaluation.final.weight')}</th>
                                            <th class="px-4 py-2 text-center font-medium text-gray-600">${i18n.t('evaluation.final.score')}</th>
                                            <th class="px-4 py-2 text-center font-medium text-gray-600">${i18n.t('evaluation.final.weighted')}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y">
                                        ${Object.entries(breakdown).map(([key, data]) => `
                                            <tr>
                                                <td class="px-4 py-3 font-medium">${i18n.t(`evaluation.weight.${key}`)}</td>
                                                <td class="px-4 py-3 text-center">${data.weight}%</td>
                                                <td class="px-4 py-3 text-center">${data.score ? data.score.toFixed(1) : '-'}</td>
                                                <td class="px-4 py-3 text-center font-medium">${data.weighted ? data.weighted.toFixed(1) : '-'}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                    <tfoot class="bg-gray-50">
                                        <tr>
                                            <td class="px-4 py-3 font-bold" colspan="3">${i18n.t('evaluation.final.totalWeightedScore')}</td>
                                            <td class="px-4 py-3 text-center font-bold text-cg-red">${finalRating.weightedScore}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        <!-- Final Comment -->
                        ${finalRating.finalComment ? `
                            <div class="mt-6 pt-6 border-t">
                                <h4 class="font-medium text-gray-900 mb-3">${i18n.t('evaluation.final.finalComment')}</h4>
                                <p class="p-4 bg-gray-50 rounded-lg text-gray-700">
                                    ${isThai ? finalRating.finalComment.th || finalRating.finalComment.en : finalRating.finalComment.en}
                                </p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Render evaluation history
         * @returns {string}
         */
        renderEvaluationHistory() {
            const isThai = i18n.isThai();

            // Filter out current evaluation from history
            const historyItems = evaluations.filter(e =>
                !currentEvaluation || e.id !== currentEvaluation.id
            );

            if (historyItems.length === 0) return '';

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-4 bg-gray-50 border-b flex items-center gap-3">
                        <span class="material-icons text-gray-600">history</span>
                        <h3 class="font-medium text-gray-900">${i18n.t('evaluation.history.title')}</h3>
                    </div>
                    <div class="divide-y">
                        ${historyItems.map(evaluation => {
                            const statusConfig = this.getEvaluationStatusConfig(evaluation.status);
                            return `
                                <div class="p-4 hover:bg-gray-50 flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900">
                                            ${isThai ? evaluation.periodLabel?.th : evaluation.periodLabel?.en}
                                        </p>
                                        <div class="flex items-center gap-2 mt-1">
                                            <span class="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${statusConfig.class}">
                                                <span class="material-icons text-xs">${statusConfig.icon}</span>
                                                ${i18n.t(`evaluation.status.${evaluation.status}`)}
                                            </span>
                                            ${evaluation.finalRating ? `
                                                <span class="text-sm text-gray-600">
                                                    ${i18n.t('evaluation.history.finalRating')}: ${this.renderRatingBadge(evaluation.finalRating.rating, 'sm')}
                                                </span>
                                            ` : ''}
                                        </div>
                                    </div>
                                    <button onclick="PerformancePage.viewEvaluationDetails('${evaluation.id}')"
                                            class="px-3 py-1.5 text-sm text-cg-info hover:bg-blue-50 rounded-lg transition">
                                        ${i18n.t('evaluation.history.viewDetails')}
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Render rating badge
         * @param {number} rating
         * @param {string} size
         * @returns {string}
         */
        renderRatingBadge(rating, size = 'md') {
            const sizeClasses = {
                sm: 'w-6 h-6 text-xs',
                md: 'w-8 h-8 text-sm',
                lg: 'w-12 h-12 text-lg'
            };

            return `
                <span class="inline-flex items-center justify-center ${sizeClasses[size]} rounded-full ${this.getRatingBadgeClass(rating)} font-bold">
                    ${rating}
                </span>
            `;
        },

        /**
         * Get rating badge class
         * @param {number} rating
         * @returns {string}
         */
        getRatingBadgeClass(rating) {
            const classes = {
                5: 'bg-emerald-100 text-emerald-800',
                4: 'bg-green-100 text-green-800',
                3: 'bg-blue-100 text-blue-800',
                2: 'bg-amber-100 text-amber-800',
                1: 'bg-red-100 text-red-800'
            };
            return classes[rating] || 'bg-gray-100 text-gray-800';
        },

        /**
         * Get final rating background class
         * @param {number} rating
         * @returns {string}
         */
        getFinalRatingBgClass(rating) {
            const classes = {
                5: 'bg-emerald-500',
                4: 'bg-green-500',
                3: 'bg-blue-500',
                2: 'bg-amber-500',
                1: 'bg-red-500'
            };
            return classes[rating] || 'bg-gray-500';
        },

        // ========================================
        // Evaluation Actions
        // ========================================

        /**
         * Select evaluation period
         * @param {string} period
         */
        async selectEvaluationPeriod(period) {
            selectedPeriod = period;
            await this.loadEvaluationData();
            Router.refresh();
        },

        /**
         * Create new evaluation
         */
        async createEvaluation() {
            try {
                const result = await API.createEvaluation({ period: selectedPeriod });
                if (result.success) {
                    currentEvaluation = result.data;
                    ToastComponent.success(i18n.t('evaluation.message.saveSuccess'));
                    Router.refresh();
                }
            } catch (error) {
                console.error('Create evaluation error:', error);
                ToastComponent.error(error.message || i18n.t('evaluation.message.saveError'));
            }
        },

        /**
         * Update self-assessment draft
         * @param {string} competencyCode
         * @param {string} field
         * @param {string} value
         */
        updateSelfAssessment(competencyCode, field, value) {
            if (!selfAssessmentDraft[competencyCode]) {
                selfAssessmentDraft[competencyCode] = {};
            }

            if (field === 'score') {
                selfAssessmentDraft[competencyCode].score = parseInt(value) || null;
            } else if (field === 'comment') {
                const isThai = i18n.isThai();
                if (!selfAssessmentDraft[competencyCode].comment) {
                    selfAssessmentDraft[competencyCode].comment = { en: '', th: '' };
                }
                if (isThai) {
                    selfAssessmentDraft[competencyCode].comment.th = value;
                } else {
                    selfAssessmentDraft[competencyCode].comment.en = value;
                }
            }
        },

        /**
         * Save self-assessment progress
         */
        async saveSelfAssessment() {
            if (!currentEvaluation) return;

            try {
                await API.saveSelfAssessment(currentEvaluation.id, selfAssessmentDraft);
                ToastComponent.success(i18n.t('evaluation.message.saveSuccess'));
            } catch (error) {
                console.error('Save self-assessment error:', error);
                ToastComponent.error(error.message || i18n.t('evaluation.message.saveError'));
            }
        },

        /**
         * Submit self-assessment
         */
        async submitSelfAssessment() {
            if (!currentEvaluation) return;

            // Validate all competencies have ratings
            const allRated = gbestCompetencies.every(c => selfAssessmentDraft[c.code]?.score);
            if (!allRated) {
                ToastComponent.error(i18n.t('evaluation.validation.ratingRequired'));
                return;
            }

            const confirmed = await ModalComponent.confirm({
                title: i18n.t('evaluation.action.submitSelfAssessment'),
                message: i18n.t('evaluation.message.confirmSubmit'),
                confirmText: i18n.t('common.submit'),
                icon: 'send'
            });

            if (!confirmed) return;

            try {
                // First save the assessment
                await API.saveSelfAssessment(currentEvaluation.id, selfAssessmentDraft);
                // Then submit
                const result = await API.submitSelfAssessment(currentEvaluation.id);
                if (result.success) {
                    currentEvaluation = result.data;
                    ToastComponent.success(i18n.t('evaluation.message.submitSuccess'));
                    Router.refresh();
                }
            } catch (error) {
                console.error('Submit self-assessment error:', error);
                ToastComponent.error(error.message || i18n.t('evaluation.message.submitError'));
            }
        },

        /**
         * Acknowledge evaluation
         */
        async acknowledgeEvaluation() {
            if (!currentEvaluation) return;

            const confirmed = await ModalComponent.confirm({
                title: i18n.t('evaluation.action.acknowledgeEvaluation'),
                message: i18n.t('evaluation.message.confirmAcknowledge'),
                confirmText: i18n.t('evaluation.action.acknowledgeEvaluation'),
                icon: 'check_circle'
            });

            if (!confirmed) return;

            try {
                const result = await API.acknowledgeEvaluation(currentEvaluation.id);
                if (result.success) {
                    currentEvaluation = result.data;
                    ToastComponent.success(i18n.t('evaluation.message.acknowledgeSuccess'));
                    Router.refresh();
                }
            } catch (error) {
                console.error('Acknowledge evaluation error:', error);
                ToastComponent.error(error.message || i18n.t('error.generic'));
            }
        },

        /**
         * View evaluation details
         * @param {string} evaluationId
         */
        async viewEvaluationDetails(evaluationId) {
            try {
                const evaluation = await API.getEvaluation(evaluationId);
                currentEvaluation = evaluation;
                selectedPeriod = evaluation.period;
                Router.refresh();
            } catch (error) {
                console.error('View evaluation details error:', error);
                ToastComponent.error(i18n.t('evaluation.message.loadError'));
            }
        },

        /**
         * Export evaluation as PDF
         */
        exportEvaluationPdf() {
            ToastComponent.info('PDF export coming soon');
        },

        /**
         * Load evaluation data
         */
        async loadEvaluationData() {
            try {
                const employee = AppState.get('currentEmployee');
                if (!employee) return;

                // Load evaluation weights
                evaluationWeights = await API.getEvaluationWeights();

                // Load attendance data
                attendanceData = await API.getAttendanceData(employee.employeeId, selectedPeriod);

                // Load all evaluations for history
                evaluations = await API.getEvaluations(employee.employeeId);

                // Get current evaluation for selected period
                currentEvaluation = await API.getCurrentEvaluation(employee.employeeId, selectedPeriod);

                // Initialize self-assessment draft if in self_assessment status
                if (currentEvaluation && currentEvaluation.status === 'self_assessment') {
                    selfAssessmentDraft = currentEvaluation.gbestRatings?.selfAssessment || {};
                }

            } catch (error) {
                console.error('Error loading evaluation data:', error);
            }
        },

        /**
         * Load performance data
         */
        async loadData() {
            try {
                const employee = AppState.get('currentEmployee');
                if (!employee) return;

                // Load G-BEST competencies
                gbestCompetencies = await API.getGbestCompetencies();

                // Load goals
                goals = await API.getGoals(employee.employeeId);

                // Load evaluation data
                await this.loadEvaluationData();

            } catch (error) {
                console.error('Error loading performance data:', error);
                ToastComponent.error(i18n.t('error.loadFailed'));
            }
        },

        /**
         * Initialize page
         */
        async init() {
            activeTab = 'goals';
            selectedPeriod = '2025';
            selectedCategory = 'all';
            selectedStatus = 'all';
            await this.loadData();
            const content = document.getElementById('main-content');
            if (content) {
                content.innerHTML = this.render();
            }
        },

        /**
         * Render skeleton
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="skeleton shimmer" style="width: 200px; height: 32px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 80px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 48px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="space-y-4">
                        ${[1, 2, 3].map(() => `
                            <div class="skeleton shimmer" style="height: 180px; border-radius: 8px;"></div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformancePage;
}
