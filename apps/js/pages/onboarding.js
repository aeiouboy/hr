/**
 * Onboarding Page
 * New hire onboarding workflow with pre-boarding, day-one, orientation, and probation setup
 */

const OnboardingPage = (function() {
    let activeTab = 'preboarding';
    let onboardingData = null;
    let selectedMentor = null;

    return {
        /**
         * Render the onboarding page
         * @returns {string}
         */
        render() {
            const isLoading = AppState.get('isLoading');

            if (isLoading && !onboardingData) {
                return this.renderSkeleton();
            }

            const isThai = i18n.isThai();
            const data = onboardingData || MockOnboardingData;
            const currentOnboarding = data.currentOnboarding;

            // Define tabs
            const tabs = [
                { id: 'preboarding', icon: 'fact_check', label: i18n.t('onboarding.preboarding') },
                { id: 'dayone', icon: 'today', label: i18n.t('onboarding.dayOne') },
                { id: 'employeeid', icon: 'badge', label: i18n.t('onboarding.employeeId') },
                { id: 'orientation', icon: 'school', label: i18n.t('onboarding.orientation') },
                { id: 'probation', icon: 'assessment', label: i18n.t('onboarding.probation') }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('onboarding.title')}</h1>
                        <p class="text-gray-600 mt-1">${i18n.t('onboarding.subtitle')}</p>
                    </div>

                    <!-- New Hire Summary Card -->
                    ${this.renderNewHireSummary(currentOnboarding)}

                    <!-- Progress Overview -->
                    ${this.renderProgressOverview(data)}

                    <!-- Tabs Navigation -->
                    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto" role="tablist" aria-label="${i18n.t('onboarding.tabsLabel')}">
                        ${tabs.map(tab => `
                            <button onclick="OnboardingPage.switchTab('${tab.id}')"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition whitespace-nowrap min-h-[44px]
                                        ${activeTab === tab.id ? 'bg-white text-cg-red shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                                    role="tab"
                                    aria-selected="${activeTab === tab.id}"
                                    aria-controls="${tab.id}-panel"
                                    id="${tab.id}-tab">
                                <span class="material-icons text-sm">${tab.icon}</span>
                                <span class="hidden sm:inline">${tab.label}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Tab Content -->
                    <div id="onboarding-tab-content" role="tabpanel" aria-labelledby="${activeTab}-tab">
                        ${this.renderTabContent(data)}
                    </div>
                </div>
            `;
        },

        /**
         * Render new hire summary card
         * @param {object} onboarding
         * @returns {string}
         */
        renderNewHireSummary(onboarding) {
            const isThai = i18n.isThai();
            const statusColors = {
                'pre_boarding': 'bg-blue-100 text-blue-800',
                'day_one': 'bg-yellow-100 text-yellow-800',
                'orientation': 'bg-purple-100 text-purple-800',
                'probation': 'bg-green-100 text-green-800',
                'completed': 'bg-gray-100 text-gray-800'
            };

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-16 rounded-full bg-cg-red text-white flex items-center justify-center text-xl font-bold">
                                ${(isThai ? onboarding.candidateNameTh : onboarding.candidateName).charAt(0)}
                            </div>
                            <div>
                                <h2 class="text-xl font-semibold text-gray-900">
                                    ${isThai ? onboarding.candidateNameTh : onboarding.candidateName}
                                </h2>
                                <p class="text-gray-600">
                                    ${isThai ? onboarding.positionTh : onboarding.position} - ${isThai ? onboarding.departmentTh : onboarding.department}
                                </p>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="material-icons text-sm text-gray-400">calendar_today</span>
                                    <span class="text-sm text-gray-500">
                                        ${i18n.t('onboarding.startDate')}: ${DateUtils.format(onboarding.startDate, 'long')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[onboarding.status] || statusColors.pre_boarding}">
                                ${i18n.t(`onboarding.status.${onboarding.status}`)}
                            </span>
                            <span class="text-sm text-gray-500">
                                ${i18n.t('onboarding.hrCoordinator')}: ${onboarding.hrCoordinator}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render progress overview
         * @param {object} data
         * @returns {string}
         */
        renderProgressOverview(data) {
            const preboardingItems = data.preboardingChecklist.flatMap(cat => cat.items);
            const preboardingCompleted = preboardingItems.filter(item => item.status === 'completed').length;
            const preboardingTotal = preboardingItems.filter(item => item.status !== 'not_applicable').length;
            const preboardingPercent = preboardingTotal > 0 ? Math.round((preboardingCompleted / preboardingTotal) * 100) : 0;

            const dayOneItems = data.dayOneChecklist.flatMap(cat => cat.items);
            const dayOneCompleted = dayOneItems.filter(item => item.status === 'completed').length;
            const dayOneTotal = dayOneItems.filter(item => item.status !== 'not_applicable').length;
            const dayOnePercent = dayOneTotal > 0 ? Math.round((dayOneCompleted / dayOneTotal) * 100) : 0;

            const orientationItems = data.orientationProgram.flatMap(cat => cat.items);
            const orientationCompleted = orientationItems.filter(item => item.status === 'completed').length;
            const orientationTotal = orientationItems.filter(item => item.mandatory).length;
            const orientationPercent = orientationTotal > 0 ? Math.round((orientationCompleted / orientationTotal) * 100) : 0;

            const steps = [
                { label: i18n.t('onboarding.preboarding'), percent: preboardingPercent, icon: 'fact_check' },
                { label: i18n.t('onboarding.dayOne'), percent: dayOnePercent, icon: 'today' },
                { label: i18n.t('onboarding.orientation'), percent: orientationPercent, icon: 'school' },
                { label: i18n.t('onboarding.probation'), percent: 0, icon: 'assessment' }
            ];

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('onboarding.overallProgress')}</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        ${steps.map(step => `
                            <div class="text-center">
                                <div class="relative inline-flex items-center justify-center w-16 h-16 mb-2">
                                    <svg class="w-16 h-16 transform -rotate-90">
                                        <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" stroke-width="4"/>
                                        <circle cx="32" cy="32" r="28" fill="none" stroke="#D91E32" stroke-width="4"
                                                stroke-dasharray="${step.percent * 1.76} 176"
                                                stroke-linecap="round"/>
                                    </svg>
                                    <span class="absolute text-sm font-bold text-gray-900">${step.percent}%</span>
                                </div>
                                <p class="text-sm text-gray-600">${step.label}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Render active tab content
         * @param {object} data
         * @returns {string}
         */
        renderTabContent(data) {
            switch (activeTab) {
                case 'preboarding':
                    return this.renderPreboardingTab(data);
                case 'dayone':
                    return this.renderDayOneTab(data);
                case 'employeeid':
                    return this.renderEmployeeIdTab(data);
                case 'orientation':
                    return this.renderOrientationTab(data);
                case 'probation':
                    return this.renderProbationTab(data);
                default:
                    return this.renderPreboardingTab(data);
            }
        },

        /**
         * Render pre-boarding checklist tab
         * @param {object} data
         * @returns {string}
         */
        renderPreboardingTab(data) {
            const isThai = i18n.isThai();
            const categories = data.preboardingChecklist;

            return `
                <div class="space-y-6">
                    ${categories.map(category => `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div class="bg-gray-50 px-6 py-4 border-b">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    ${isThai ? category.categoryTh : category.categoryEn}
                                </h3>
                            </div>
                            <div class="divide-y">
                                ${category.items.map(item => this.renderChecklistItem(item, 'preboarding')).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        /**
         * Render day-one checklist tab
         * @param {object} data
         * @returns {string}
         */
        renderDayOneTab(data) {
            const isThai = i18n.isThai();
            const categories = data.dayOneChecklist;

            return `
                <div class="space-y-6">
                    <!-- Day-One Timeline -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('onboarding.dayOneSchedule')}</h3>
                        <p class="text-gray-600 mb-4">${i18n.t('onboarding.dayOneScheduleDesc')}</p>
                    </div>

                    ${categories.map(category => `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div class="bg-gray-50 px-6 py-4 border-b">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    ${isThai ? category.categoryTh : category.categoryEn}
                                </h3>
                            </div>
                            <div class="divide-y">
                                ${category.items.map(item => this.renderDayOneItem(item)).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        },

        /**
         * Render employee ID generation tab
         * @param {object} data
         * @returns {string}
         */
        renderEmployeeIdTab(data) {
            const isThai = i18n.isThai();
            const generatedId = data.generatedEmployeeId;
            const config = data.employeeIdConfig;

            return `
                <div class="space-y-6">
                    <!-- Employee ID Generation Card -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <span class="material-icons text-blue-600">badge</span>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">${i18n.t('onboarding.employeeIdGeneration')}</h3>
                                <p class="text-gray-600">${i18n.t('onboarding.employeeIdDesc')}</p>
                            </div>
                        </div>

                        <!-- Generated ID Display -->
                        <div class="bg-gray-50 rounded-lg p-6 text-center mb-6">
                            <p class="text-sm text-gray-500 mb-2">${i18n.t('onboarding.generatedEmployeeId')}</p>
                            <p class="text-3xl font-bold text-cg-red">${generatedId.employeeId}</p>
                            <p class="text-sm text-gray-500 mt-2">
                                ${i18n.t('onboarding.format')}: ${config.format}
                            </p>
                        </div>

                        <!-- Status Indicators -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div class="p-4 rounded-lg border ${generatedId.status === 'confirmed' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}">
                                <div class="flex items-center gap-2">
                                    <span class="material-icons text-sm ${generatedId.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}">
                                        ${generatedId.status === 'confirmed' ? 'check_circle' : 'pending'}
                                    </span>
                                    <span class="font-medium">${i18n.t('onboarding.idStatus')}</span>
                                </div>
                                <p class="text-sm text-gray-600 mt-1">${i18n.t(`onboarding.idStatus_${generatedId.status}`)}</p>
                            </div>

                            <div class="p-4 rounded-lg border ${generatedId.idCardRequested ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}">
                                <div class="flex items-center gap-2">
                                    <span class="material-icons text-sm ${generatedId.idCardRequested ? 'text-green-600' : 'text-gray-400'}">
                                        ${generatedId.idCardRequested ? 'check_circle' : 'credit_card'}
                                    </span>
                                    <span class="font-medium">${i18n.t('onboarding.idCardPrint')}</span>
                                </div>
                                <p class="text-sm text-gray-600 mt-1">
                                    ${generatedId.idCardRequested ? i18n.t('onboarding.requested') : i18n.t('onboarding.notRequested')}
                                </p>
                            </div>

                            <div class="p-4 rounded-lg border ${generatedId.userAccountCreated ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}">
                                <div class="flex items-center gap-2">
                                    <span class="material-icons text-sm ${generatedId.userAccountCreated ? 'text-green-600' : 'text-gray-400'}">
                                        ${generatedId.userAccountCreated ? 'check_circle' : 'person_add'}
                                    </span>
                                    <span class="font-medium">${i18n.t('onboarding.userAccount')}</span>
                                </div>
                                <p class="text-sm text-gray-600 mt-1">
                                    ${generatedId.userAccountCreated ? i18n.t('onboarding.created') : i18n.t('onboarding.notCreated')}
                                </p>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-wrap gap-3">
                            ${generatedId.status !== 'confirmed' ? `
                                <button onclick="OnboardingPage.confirmEmployeeId()"
                                        class="px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                                    <span class="material-icons text-sm">check</span>
                                    ${i18n.t('onboarding.confirmId')}
                                </button>
                            ` : ''}
                            ${!generatedId.idCardRequested ? `
                                <button onclick="OnboardingPage.requestIdCard()"
                                        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                                    <span class="material-icons text-sm">print</span>
                                    ${i18n.t('onboarding.requestIdCard')}
                                </button>
                            ` : ''}
                            ${!generatedId.userAccountCreated ? `
                                <button onclick="OnboardingPage.createUserAccount()"
                                        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                                    <span class="material-icons text-sm">person_add</span>
                                    ${i18n.t('onboarding.createUserAccount')}
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render orientation program tab
         * @param {object} data
         * @returns {string}
         */
        renderOrientationTab(data) {
            const isThai = i18n.isThai();
            const categories = data.orientationProgram;
            const mentors = data.availableMentors;

            return `
                <div class="space-y-6">
                    ${categories.map(category => `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div class="bg-gray-50 px-6 py-4 border-b">
                                <h3 class="text-lg font-semibold text-gray-900">
                                    ${isThai ? category.categoryTh : category.categoryEn}
                                </h3>
                            </div>
                            <div class="divide-y">
                                ${category.items.map(item => this.renderOrientationItem(item)).join('')}
                            </div>
                        </div>
                    `).join('')}

                    <!-- Mentor Selection Section -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('onboarding.selectMentor')}</h3>
                        <p class="text-gray-600 mb-4">${i18n.t('onboarding.selectMentorDesc')}</p>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${mentors.map(mentor => this.renderMentorCard(mentor)).join('')}
                        </div>

                        ${selectedMentor ? `
                            <div class="mt-4 flex justify-end">
                                <button onclick="OnboardingPage.assignMentor()"
                                        class="px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                                    <span class="material-icons text-sm">check</span>
                                    ${i18n.t('onboarding.assignMentor')}
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Render probation setup tab
         * @param {object} data
         * @returns {string}
         */
        renderProbationTab(data) {
            const isThai = i18n.isThai();
            const probation = data.probationSetup;

            return `
                <div class="space-y-6">
                    <!-- Probation Overview -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                <span class="material-icons text-purple-600">assessment</span>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">${i18n.t('onboarding.probationOverview')}</h3>
                                <p class="text-gray-600">${i18n.t('onboarding.probationOverviewDesc')}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <p class="text-sm text-gray-500">${i18n.t('onboarding.startDate')}</p>
                                <p class="text-lg font-semibold">${DateUtils.format(probation.startDate, 'medium')}</p>
                            </div>
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <p class="text-sm text-gray-500">${i18n.t('onboarding.endDate')}</p>
                                <p class="text-lg font-semibold">${DateUtils.format(probation.endDate, 'medium')}</p>
                            </div>
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <p class="text-sm text-gray-500">${i18n.t('onboarding.duration')}</p>
                                <p class="text-lg font-semibold">${probation.duration} ${i18n.t('common.days')}</p>
                            </div>
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <p class="text-sm text-gray-500">${i18n.t('workflow.status')}</p>
                                <p class="text-lg font-semibold">${i18n.t(`onboarding.probationStatus.${probation.status}`)}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Evaluation Schedule -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="bg-gray-50 px-6 py-4 border-b">
                            <h3 class="text-lg font-semibold text-gray-900">${i18n.t('onboarding.evaluationSchedule')}</h3>
                        </div>
                        <div class="divide-y">
                            ${probation.evaluationSchedule.map(evaluation => `
                                <div class="p-4 flex items-center justify-between">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-full ${evaluation.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center">
                                            <span class="material-icons ${evaluation.status === 'completed' ? 'text-green-600' : 'text-gray-400'}">
                                                ${evaluation.status === 'completed' ? 'check_circle' : 'schedule'}
                                            </span>
                                        </div>
                                        <div>
                                            <p class="font-medium text-gray-900">${isThai ? evaluation.titleTh : evaluation.titleEn}</p>
                                            <p class="text-sm text-gray-500">
                                                ${i18n.t('onboarding.dueDate')}: ${DateUtils.format(evaluation.dueDate, 'medium')}
                                            </p>
                                        </div>
                                    </div>
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${evaluation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                                        ${i18n.t(`onboarding.evalStatus.${evaluation.status}`)}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Probation Goals -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-gray-900">${i18n.t('onboarding.probationGoals')}</h3>
                            <button onclick="OnboardingPage.addProbationGoal()"
                                    class="px-3 py-1.5 text-sm border border-cg-red text-cg-red rounded-lg hover:bg-red-50 transition flex items-center gap-1">
                                <span class="material-icons text-sm">add</span>
                                ${i18n.t('common.add')}
                            </button>
                        </div>
                        <div class="divide-y">
                            ${probation.goals.map(goal => `
                                <div class="p-4">
                                    <div class="flex items-center justify-between mb-2">
                                        <p class="font-medium text-gray-900">${isThai ? goal.titleTh : goal.titleEn}</p>
                                        <span class="text-sm text-gray-500">${i18n.t('onboarding.weight')}: ${goal.weight}%</span>
                                    </div>
                                    <div class="flex items-center gap-4">
                                        <div class="flex-1">
                                            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div class="h-full bg-cg-red transition-all duration-300" style="width: ${goal.progress}%"></div>
                                            </div>
                                        </div>
                                        <span class="text-sm font-medium text-gray-900">${goal.progress}%</span>
                                    </div>
                                    <p class="text-sm text-gray-500 mt-2">
                                        ${i18n.t('onboarding.targetDate')}: ${DateUtils.format(goal.targetDate, 'medium')}
                                    </p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Reminder Notifications -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="bg-gray-50 px-6 py-4 border-b">
                            <h3 class="text-lg font-semibold text-gray-900">${i18n.t('onboarding.reminders')}</h3>
                        </div>
                        <div class="divide-y">
                            ${probation.reminders.map(reminder => `
                                <div class="p-4 flex items-center justify-between">
                                    <div class="flex items-center gap-4">
                                        <span class="material-icons ${reminder.sent ? 'text-green-500' : 'text-gray-400'}">
                                            ${reminder.sent ? 'notifications_active' : 'notifications'}
                                        </span>
                                        <div>
                                            <p class="font-medium text-gray-900">${isThai ? reminder.titleTh : reminder.titleEn}</p>
                                            <p class="text-sm text-gray-500">
                                                ${i18n.t('onboarding.triggerDate')}: ${DateUtils.format(reminder.triggerDate, 'medium')}
                                            </p>
                                        </div>
                                    </div>
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${reminder.sent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                                        ${reminder.sent ? i18n.t('onboarding.sent') : i18n.t('onboarding.scheduled')}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render a single checklist item
         * @param {object} item
         * @param {string} type
         * @returns {string}
         */
        renderChecklistItem(item, type) {
            const isThai = i18n.isThai();
            const statusConfig = {
                'completed': { icon: 'check_circle', class: 'text-green-600', bg: 'bg-green-100' },
                'in_progress': { icon: 'pending', class: 'text-yellow-600', bg: 'bg-yellow-100' },
                'pending': { icon: 'radio_button_unchecked', class: 'text-gray-400', bg: 'bg-gray-100' },
                'not_applicable': { icon: 'remove_circle_outline', class: 'text-gray-300', bg: 'bg-gray-50' }
            };
            const status = statusConfig[item.status] || statusConfig.pending;

            return `
                <div class="p-4 flex items-start gap-4 ${item.status === 'not_applicable' ? 'opacity-50' : ''}">
                    <button onclick="OnboardingPage.toggleChecklistItem('${item.id}')"
                            class="w-8 h-8 rounded-full ${status.bg} flex items-center justify-center flex-shrink-0 ${item.status === 'not_applicable' ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}"
                            ${item.status === 'not_applicable' ? 'disabled' : ''}
                            aria-label="${i18n.t(`onboarding.itemStatus.${item.status}`)}">
                        <span class="material-icons ${status.class}">${status.icon}</span>
                    </button>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <p class="font-medium text-gray-900">${isThai ? item.titleTh : item.titleEn}</p>
                            ${item.required ? `<span class="text-xs text-red-500">*</span>` : ''}
                        </div>
                        <p class="text-sm text-gray-600 mt-1">${isThai ? item.descriptionTh : item.descriptionEn}</p>
                        ${item.completedDate ? `
                            <p class="text-xs text-gray-400 mt-2">
                                ${i18n.t('onboarding.completedOn')}: ${DateUtils.format(item.completedDate, 'medium')}
                                ${item.completedBy ? ` - ${item.completedBy}` : ''}
                            </p>
                        ` : ''}
                        ${item.estimatedCompletion ? `
                            <p class="text-xs text-yellow-600 mt-2">
                                ${i18n.t('onboarding.estimatedCompletion')}: ${DateUtils.format(item.estimatedCompletion, 'medium')}
                            </p>
                        ` : ''}
                        ${item.appointmentDate ? `
                            <p class="text-xs text-blue-600 mt-2">
                                ${i18n.t('onboarding.appointmentDate')}: ${DateUtils.format(item.appointmentDate, 'medium')}
                                ${item.hospital ? ` @ ${item.hospital}` : ''}
                            </p>
                        ` : ''}
                    </div>
                    ${item.status !== 'completed' && item.status !== 'not_applicable' ? `
                        <button onclick="OnboardingPage.markAsComplete('${item.id}')"
                                class="px-3 py-1.5 text-sm border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition">
                            ${i18n.t('onboarding.markComplete')}
                        </button>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render a day-one item
         * @param {object} item
         * @returns {string}
         */
        renderDayOneItem(item) {
            const isThai = i18n.isThai();
            const statusConfig = {
                'completed': { icon: 'check_circle', class: 'text-green-600' },
                'pending': { icon: 'schedule', class: 'text-gray-400' },
                'not_applicable': { icon: 'remove_circle_outline', class: 'text-gray-300' }
            };
            const status = statusConfig[item.status] || statusConfig.pending;

            return `
                <div class="p-4 flex items-start gap-4 ${item.status === 'not_applicable' ? 'opacity-50' : ''}">
                    <div class="w-16 text-center flex-shrink-0">
                        <p class="text-sm font-semibold text-cg-red">${item.estimatedTime}</p>
                        ${item.duration ? `<p class="text-xs text-gray-400">${item.duration}</p>` : ''}
                    </div>
                    <div class="w-8 h-8 rounded-full ${item.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center flex-shrink-0">
                        <span class="material-icons ${status.class}">${status.icon}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900">${isThai ? item.titleTh : item.titleEn}</p>
                        <p class="text-sm text-gray-600 mt-1">${isThai ? item.descriptionTh : item.descriptionEn}</p>
                        <p class="text-xs text-gray-400 mt-2">
                            ${i18n.t('onboarding.assignedTo')}: ${item.assignedTo}
                        </p>
                    </div>
                </div>
            `;
        },

        /**
         * Render an orientation item
         * @param {object} item
         * @returns {string}
         */
        renderOrientationItem(item) {
            const isThai = i18n.isThai();
            const typeIcons = {
                'e-learning': 'laptop',
                'classroom': 'groups',
                'meeting': 'person',
                'document': 'description',
                'signature': 'draw'
            };
            const statusConfig = {
                'completed': { class: 'bg-green-100 text-green-800' },
                'in_progress': { class: 'bg-blue-100 text-blue-800' },
                'registered': { class: 'bg-purple-100 text-purple-800' },
                'scheduled': { class: 'bg-yellow-100 text-yellow-800' },
                'not_started': { class: 'bg-gray-100 text-gray-800' },
                'pending': { class: 'bg-gray-100 text-gray-800' }
            };
            const status = statusConfig[item.status] || statusConfig.pending;

            return `
                <div class="p-4 flex items-start gap-4">
                    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span class="material-icons text-gray-600">${typeIcons[item.type] || 'assignment'}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <p class="font-medium text-gray-900">${isThai ? item.titleTh : item.titleEn}</p>
                            ${item.mandatory ? `<span class="text-xs text-red-500">*</span>` : ''}
                        </div>
                        <p class="text-sm text-gray-600 mt-1">${isThai ? item.descriptionTh : item.descriptionEn}</p>
                        <div class="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
                            ${item.duration ? `<span class="flex items-center gap-1"><span class="material-icons text-xs">schedule</span>${item.duration}</span>` : ''}
                            ${item.dueDate ? `<span class="flex items-center gap-1"><span class="material-icons text-xs">event</span>${i18n.t('onboarding.dueDate')}: ${DateUtils.format(item.dueDate, 'short')}</span>` : ''}
                            ${item.scheduledDate ? `<span class="flex items-center gap-1"><span class="material-icons text-xs">event</span>${DateUtils.format(item.scheduledDate, 'short')} ${item.scheduledTime || ''}</span>` : ''}
                            ${item.location ? `<span class="flex items-center gap-1"><span class="material-icons text-xs">location_on</span>${item.location}</span>` : ''}
                            ${item.with ? `<span class="flex items-center gap-1"><span class="material-icons text-xs">person</span>${item.with}</span>` : ''}
                        </div>
                    </div>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.class}">
                        ${i18n.t(`onboarding.orientStatus.${item.status}`)}
                    </span>
                </div>
            `;
        },

        /**
         * Render mentor card
         * @param {object} mentor
         * @returns {string}
         */
        renderMentorCard(mentor) {
            const isThai = i18n.isThai();
            const isSelected = selectedMentor === mentor.id;
            const isAvailable = mentor.menteeCount < mentor.maxMentees;

            return `
                <div class="p-4 rounded-lg border-2 transition cursor-pointer ${isSelected ? 'border-cg-red bg-red-50' : 'border-gray-200 hover:border-gray-300'} ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}"
                     onclick="${isAvailable ? `OnboardingPage.selectMentor('${mentor.id}')` : ''}"
                     role="radio"
                     aria-checked="${isSelected}"
                     tabindex="0">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600">
                            ${(isThai ? mentor.nameTh : mentor.name).charAt(0)}
                        </div>
                        <div>
                            <p class="font-medium text-gray-900">${isThai ? mentor.nameTh : mentor.name}</p>
                            <p class="text-sm text-gray-600">${isThai ? mentor.positionTh : mentor.position}</p>
                        </div>
                    </div>
                    <div class="space-y-2 text-sm">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-500">${i18n.t('onboarding.yearsWithCompany')}</span>
                            <span class="font-medium">${mentor.yearsWithCompany} ${i18n.t('employment.years')}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-500">${i18n.t('onboarding.currentMentees')}</span>
                            <span class="font-medium">${mentor.menteeCount}/${mentor.maxMentees}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-500">${i18n.t('onboarding.rating')}</span>
                            <span class="font-medium flex items-center gap-1">
                                <span class="material-icons text-yellow-500 text-sm">star</span>
                                ${mentor.rating}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-1 mt-3">
                        ${mentor.skills.slice(0, 3).map(skill => `
                            <span class="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">${skill}</span>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Switch tab
         * @param {string} tabId
         */
        switchTab(tabId) {
            activeTab = tabId;
            const container = document.getElementById('onboarding-tab-content');
            if (container) {
                const data = onboardingData || MockOnboardingData;
                container.innerHTML = this.renderTabContent(data);
            }

            // Update tab buttons styling
            document.querySelectorAll('[role="tab"]').forEach(btn => {
                const btnTabId = btn.id.replace('-tab', '');
                const isActive = btnTabId === activeTab;
                btn.setAttribute('aria-selected', isActive.toString());
                btn.classList.toggle('bg-white', isActive);
                btn.classList.toggle('text-cg-red', isActive);
                btn.classList.toggle('shadow-sm', isActive);
                btn.classList.toggle('text-gray-600', !isActive);
            });
        },

        /**
         * Select a mentor
         * @param {string} mentorId
         */
        selectMentor(mentorId) {
            selectedMentor = selectedMentor === mentorId ? null : mentorId;
            const data = onboardingData || MockOnboardingData;
            const container = document.getElementById('onboarding-tab-content');
            if (container) {
                container.innerHTML = this.renderTabContent(data);
            }
        },

        /**
         * Assign selected mentor
         */
        async assignMentor() {
            if (!selectedMentor) return;

            const data = onboardingData || MockOnboardingData;
            const mentor = data.availableMentors.find(m => m.id === selectedMentor);
            const isThai = i18n.isThai();

            const confirmed = await ModalComponent.confirm({
                title: i18n.t('onboarding.confirmAssignMentor'),
                message: `${i18n.t('onboarding.assignMentorConfirmMsg')} ${isThai ? mentor.nameTh : mentor.name}?`,
                confirmText: i18n.t('onboarding.assignMentor'),
                icon: 'person_add'
            });

            if (confirmed) {
                ToastComponent.success(i18n.t('onboarding.mentorAssigned'));
                selectedMentor = null;
                Router.refresh();
            }
        },

        /**
         * Toggle checklist item status
         * @param {string} itemId
         */
        toggleChecklistItem(itemId) {
            console.log('Toggle item:', itemId);
            // In a real implementation, this would update the item status
        },

        /**
         * Mark item as complete
         * @param {string} itemId
         */
        async markAsComplete(itemId) {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('onboarding.markComplete'),
                message: i18n.t('onboarding.markCompleteConfirm'),
                confirmText: i18n.t('common.confirm'),
                icon: 'check_circle'
            });

            if (confirmed) {
                ToastComponent.success(i18n.t('onboarding.itemCompleted'));
                Router.refresh();
            }
        },

        /**
         * Confirm employee ID
         */
        async confirmEmployeeId() {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('onboarding.confirmId'),
                message: i18n.t('onboarding.confirmIdMsg'),
                confirmText: i18n.t('common.confirm'),
                icon: 'badge'
            });

            if (confirmed) {
                ToastComponent.success(i18n.t('onboarding.idConfirmed'));
                Router.refresh();
            }
        },

        /**
         * Request ID card printing
         */
        async requestIdCard() {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('onboarding.requestIdCard'),
                message: i18n.t('onboarding.requestIdCardMsg'),
                confirmText: i18n.t('common.confirm'),
                icon: 'print'
            });

            if (confirmed) {
                ToastComponent.success(i18n.t('onboarding.idCardRequested'));
                Router.refresh();
            }
        },

        /**
         * Create user account
         */
        async createUserAccount() {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('onboarding.createUserAccount'),
                message: i18n.t('onboarding.createUserAccountMsg'),
                confirmText: i18n.t('common.confirm'),
                icon: 'person_add'
            });

            if (confirmed) {
                ToastComponent.success(i18n.t('onboarding.userAccountCreated'));
                Router.refresh();
            }
        },

        /**
         * Add probation goal
         */
        addProbationGoal() {
            const isThai = i18n.isThai();

            ModalComponent.open({
                title: i18n.t('onboarding.addProbationGoal'),
                size: 'md',
                content: `
                    <form id="probation-goal-form" class="space-y-4">
                        ${FormFieldComponent.text({
                            name: 'titleEn',
                            label: i18n.t('onboarding.goalTitleEn'),
                            required: true,
                            placeholder: 'Enter goal title in English'
                        })}
                        ${FormFieldComponent.text({
                            name: 'titleTh',
                            label: i18n.t('onboarding.goalTitleTh'),
                            required: true,
                            placeholder: 'ระบุชื่อเป้าหมายเป็นภาษาไทย'
                        })}
                        ${FormFieldComponent.date({
                            name: 'targetDate',
                            label: i18n.t('onboarding.targetDate'),
                            required: true,
                            min: DateUtils.today()
                        })}
                        ${FormFieldComponent.select({
                            name: 'weight',
                            label: i18n.t('onboarding.weight'),
                            required: true,
                            options: [
                                { value: '10', label: '10%' },
                                { value: '20', label: '20%' },
                                { value: '30', label: '30%' },
                                { value: '40', label: '40%' },
                                { value: '50', label: '50%' }
                            ]
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'OnboardingPage.saveProbationGoal()' }
                ]
            });
        },

        /**
         * Save probation goal
         */
        async saveProbationGoal() {
            const formData = FormFieldComponent.getFormData('probation-goal-form');

            if (!formData.titleEn || !formData.titleTh || !formData.targetDate || !formData.weight) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            ToastComponent.success(i18n.t('onboarding.goalAdded'));
            ModalComponent.close();
            Router.refresh();
        },

        /**
         * Load onboarding data
         */
        async loadData() {
            try {
                // In a real implementation, this would fetch from API
                onboardingData = MockOnboardingData;
            } catch (error) {
                console.error('Error loading onboarding data:', error);
                ToastComponent.error(i18n.t('error.loadFailed'));
            }
        },

        /**
         * Initialize page
         */
        async init() {
            activeTab = 'preboarding';
            selectedMentor = null;
            await this.loadData();
        },

        /**
         * Render skeleton
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="skeleton shimmer" style="width: 300px; height: 32px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 120px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 140px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 48px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 400px; border-radius: 8px;"></div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OnboardingPage;
}
