/**
 * Training Records Page
 * Complete training history, evaluations, certificates, reports, and competency links
 */

const TrainingRecordsPage = (function() {
    let currentTab = 'records';
    let selectedYear = new Date().getFullYear().toString();
    let selectedCategory = 'all';
    let selectedStatus = 'all';

    return {
        /**
         * Initialize page
         */
        init() {
            currentTab = 'records';
            selectedYear = new Date().getFullYear().toString();
            selectedCategory = 'all';
            selectedStatus = 'all';
        },

        /**
         * Render training records page
         * @returns {string}
         */
        render() {
            const employee = AppState.get('currentEmployee');

            if (!employee) {
                return this.renderSkeleton();
            }

            return `
                <div class="container mx-auto px-4 py-6 max-w-7xl">
                    <!-- Page Header -->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('training.title')}</h1>
                        <p class="text-gray-600 mt-1">${i18n.t('training.subtitle')}</p>
                    </div>

                    <!-- Summary Cards -->
                    ${this.renderSummaryCards()}

                    <!-- Tabs -->
                    <div class="mb-6">
                        <div class="border-b border-gray-200" role="tablist" aria-label="${i18n.t('training.title')}">
                            <nav class="-mb-px flex space-x-8 overflow-x-auto">
                                ${this.renderTab('records', 'school', i18n.t('training.records'))}
                                ${this.renderTab('evaluations', 'assessment', i18n.t('training.evaluations'))}
                                ${this.renderTab('certificates', 'workspace_premium', i18n.t('training.certificates'))}
                                ${this.renderTab('reports', 'analytics', i18n.t('training.reports'))}
                                ${this.renderTab('competencies', 'psychology', i18n.t('training.competencyLink'))}
                            </nav>
                        </div>
                    </div>

                    <!-- Tab Content -->
                    <div id="tab-content" role="tabpanel" aria-labelledby="${currentTab}-tab">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Render tab button
         * @param {string} tabId
         * @param {string} icon
         * @param {string} label
         * @returns {string}
         */
        renderTab(tabId, icon, label) {
            const isActive = currentTab === tabId;
            return `
                <button
                    id="${tabId}-tab"
                    type="button"
                    role="tab"
                    aria-selected="${isActive}"
                    aria-controls="${tabId}-panel"
                    onclick="TrainingRecordsPage.switchTab('${tabId}')"
                    class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                        isActive
                            ? 'border-cg-red text-cg-red'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }">
                    <span class="material-icons text-lg">${icon}</span>
                    ${label}
                </button>
            `;
        },

        /**
         * Switch tab
         * @param {string} tabId
         */
        switchTab(tabId) {
            currentTab = tabId;
            const tabContent = document.getElementById('tab-content');
            if (tabContent) {
                tabContent.innerHTML = this.renderTabContent();
                tabContent.setAttribute('aria-labelledby', `${tabId}-tab`);
            }
            // Update tab buttons
            document.querySelectorAll('[role="tab"]').forEach(btn => {
                const isActive = btn.id === `${tabId}-tab`;
                btn.setAttribute('aria-selected', isActive);
                btn.className = `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    isActive
                        ? 'border-cg-red text-cg-red'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`;
            });
        },

        /**
         * Render tab content based on current tab
         * @returns {string}
         */
        renderTabContent() {
            switch (currentTab) {
                case 'records':
                    return this.renderTrainingRecords();
                case 'evaluations':
                    return this.renderEvaluations();
                case 'certificates':
                    return this.renderCertificates();
                case 'reports':
                    return this.renderReports();
                case 'competencies':
                    return this.renderCompetencyLinks();
                default:
                    return this.renderTrainingRecords();
            }
        },

        /**
         * Render summary cards
         * @returns {string}
         */
        renderSummaryCards() {
            const summary = MockTrainingRecords.trainingSummary;

            return `
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('training.totalHours')}</p>
                                <p class="text-2xl font-bold text-gray-900">${summary.totalHours}</p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded-full">
                                <span class="material-icons text-blue-600">schedule</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('training.completedCourses')}</p>
                                <p class="text-2xl font-bold text-green-600">${summary.completedCourses}</p>
                            </div>
                            <div class="p-3 bg-green-100 rounded-full">
                                <span class="material-icons text-green-600">check_circle</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('training.inProgress')}</p>
                                <p class="text-2xl font-bold text-orange-600">${summary.inProgressCourses}</p>
                            </div>
                            <div class="p-3 bg-orange-100 rounded-full">
                                <span class="material-icons text-orange-600">pending</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('training.certificates')}</p>
                                <p class="text-2xl font-bold text-purple-600">${MockTrainingRecords.certificates.length}</p>
                            </div>
                            <div class="p-3 bg-purple-100 rounded-full">
                                <span class="material-icons text-purple-600">workspace_premium</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render training records tab
         * @returns {string}
         */
        renderTrainingRecords() {
            const records = MockTrainingRecords.trainingRecords;
            const categories = MockTrainingRecords.trainingCategories;
            const statuses = MockTrainingRecords.trainingStatuses;

            // Filter records
            let filteredRecords = records;
            if (selectedCategory !== 'all') {
                filteredRecords = filteredRecords.filter(r => r.category === selectedCategory);
            }
            if (selectedStatus !== 'all') {
                filteredRecords = filteredRecords.filter(r => r.status === selectedStatus);
            }
            if (selectedYear !== 'all') {
                filteredRecords = filteredRecords.filter(r => r.startDate.startsWith(selectedYear));
            }

            return `
                <!-- Filters -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('training.filterByYear')}</label>
                            <select onchange="TrainingRecordsPage.filterByYear(this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red">
                                <option value="all" ${selectedYear === 'all' ? 'selected' : ''}>${i18n.t('common.all')}</option>
                                <option value="2025" ${selectedYear === '2025' ? 'selected' : ''}>2025</option>
                                <option value="2024" ${selectedYear === '2024' ? 'selected' : ''}>2024</option>
                                <option value="2023" ${selectedYear === '2023' ? 'selected' : ''}>2023</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('training.filterByCategory')}</label>
                            <select onchange="TrainingRecordsPage.filterByCategory(this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red">
                                <option value="all" ${selectedCategory === 'all' ? 'selected' : ''}>${i18n.t('common.all')}</option>
                                ${categories.map(c => `
                                    <option value="${c.value}" ${selectedCategory === c.value ? 'selected' : ''}>
                                        ${i18n.isThai() ? c.labelTh : c.labelEn}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">${i18n.t('training.filterByStatus')}</label>
                            <select onchange="TrainingRecordsPage.filterByStatus(this.value)" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red">
                                <option value="all" ${selectedStatus === 'all' ? 'selected' : ''}>${i18n.t('common.all')}</option>
                                ${statuses.map(s => `
                                    <option value="${s.value}" ${selectedStatus === s.value ? 'selected' : ''}>
                                        ${i18n.isThai() ? s.labelTh : s.labelEn}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="flex items-end">
                            <button onclick="TrainingRecordsPage.clearFilters()" class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                ${i18n.t('training.clearFilters')}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Training Records List -->
                <div class="space-y-4">
                    ${filteredRecords.length > 0 ? filteredRecords.map(record => this.renderTrainingRecordCard(record)).join('') : `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                            <span class="material-icons text-4xl text-gray-400 mb-2">school</span>
                            <p class="text-gray-500">${i18n.t('training.noRecords')}</p>
                        </div>
                    `}
                </div>
            `;
        },

        /**
         * Render single training record card
         * @param {object} record
         * @returns {string}
         */
        renderTrainingRecordCard(record) {
            const category = MockTrainingRecords.trainingCategories.find(c => c.value === record.category);
            const status = MockTrainingRecords.trainingStatuses.find(s => s.value === record.status);
            const type = MockTrainingRecords.trainingTypes.find(t => t.value === record.trainingType);

            const statusColors = {
                completed: 'bg-green-100 text-green-800',
                in_progress: 'bg-orange-100 text-orange-800',
                registered: 'bg-blue-100 text-blue-800',
                planned: 'bg-gray-100 text-gray-800',
                cancelled: 'bg-red-100 text-red-800',
                failed: 'bg-red-100 text-red-800'
            };

            const categoryColors = {
                leadership: 'bg-purple-100 text-purple-800',
                technical: 'bg-blue-100 text-blue-800',
                soft_skills: 'bg-green-100 text-green-800',
                compliance: 'bg-orange-100 text-orange-800',
                professional: 'bg-teal-100 text-teal-800',
                safety: 'bg-red-100 text-red-800'
            };

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-4">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[record.category] || 'bg-gray-100 text-gray-800'}">
                                        ${i18n.isThai() && category ? category.labelTh : (category?.labelEn || record.category)}
                                    </span>
                                    <span class="px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[record.status] || 'bg-gray-100 text-gray-800'}">
                                        ${i18n.isThai() && status ? status.labelTh : (status?.labelEn || record.status)}
                                    </span>
                                    ${record.trainingType === 'mandatory' ? `
                                        <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
                                            ${i18n.t('training.mandatory')}
                                        </span>
                                    ` : ''}
                                </div>
                                <h3 class="text-lg font-medium text-gray-900 mb-1">
                                    ${i18n.isThai() ? record.courseNameTh : record.courseNameEn}
                                </h3>
                                <p class="text-sm text-gray-500 mb-2">
                                    ${record.courseCode} | ${i18n.isThai() && type ? type.labelTh : (type?.labelEn || record.trainingType)}
                                </p>
                                <p class="text-sm text-gray-600 line-clamp-2 mb-3">
                                    ${i18n.isThai() ? record.descriptionTh : record.descriptionEn}
                                </p>
                                <div class="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">business</span>
                                        ${record.provider}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">schedule</span>
                                        ${record.duration} ${i18n.t('training.hours')}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">event</span>
                                        ${DateUtils.format(record.startDate, 'medium')} - ${DateUtils.format(record.endDate, 'medium')}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">location_on</span>
                                        ${record.location}
                                    </span>
                                </div>
                            </div>
                            <div class="ml-4">
                                <button onclick="TrainingRecordsPage.viewRecordDetails('${record.id}')"
                                    class="px-4 py-2 text-sm font-medium text-cg-red border border-cg-red rounded-lg hover:bg-red-50 transition">
                                    ${i18n.t('common.viewMore')}
                                </button>
                            </div>
                        </div>

                        ${record.status === 'completed' && record.postAssessmentScore !== null ? `
                            <div class="mt-4 pt-4 border-t border-gray-100">
                                <div class="flex items-center gap-6">
                                    ${record.preAssessmentScore !== null ? `
                                        <div>
                                            <span class="text-sm text-gray-500">${i18n.t('training.preAssessment')}</span>
                                            <span class="ml-2 font-medium">${record.preAssessmentScore}%</span>
                                        </div>
                                    ` : ''}
                                    <div>
                                        <span class="text-sm text-gray-500">${i18n.t('training.postAssessment')}</span>
                                        <span class="ml-2 font-medium text-green-600">${record.postAssessmentScore}%</span>
                                    </div>
                                    ${record.preAssessmentScore !== null ? `
                                        <div>
                                            <span class="text-sm text-gray-500">${i18n.t('training.improvement')}</span>
                                            <span class="ml-2 font-medium text-blue-600">+${record.postAssessmentScore - record.preAssessmentScore}%</span>
                                        </div>
                                    ` : ''}
                                    ${record.certificateId ? `
                                        <button onclick="TrainingRecordsPage.downloadCertificate('${record.certificateId}')"
                                            class="ml-auto flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                                            <span class="material-icons text-sm">download</span>
                                            ${i18n.t('training.downloadCertificate')}
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Render evaluations tab
         * @returns {string}
         */
        renderEvaluations() {
            const records = MockTrainingRecords.trainingRecords.filter(r => r.status === 'completed');
            const kirkpatrick = MockTrainingRecords.kirkpatrickLevels;

            return `
                <div class="space-y-6">
                    <!-- Kirkpatrick Model Overview -->
                    ${CardComponent.render({
                        id: 'kirkpatrick-overview',
                        title: i18n.t('training.kirkpatrickModel'),
                        icon: 'assessment',
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                ${kirkpatrick.map(level => `
                                    <div class="p-4 bg-gray-50 rounded-lg text-center">
                                        <div class="text-3xl font-bold text-cg-red mb-1">${level.level}</div>
                                        <div class="font-medium text-gray-900 mb-1">${i18n.isThai() ? level.labelTh : level.labelEn}</div>
                                        <p class="text-xs text-gray-500">${i18n.isThai() ? level.descriptionTh : level.descriptionEn}</p>
                                    </div>
                                `).join('')}
                            </div>
                        `
                    })}

                    <!-- Training Evaluations List -->
                    ${CardComponent.render({
                        id: 'evaluations-list',
                        title: i18n.t('training.completedEvaluations'),
                        icon: 'fact_check',
                        content: records.length > 0 ? `
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('training.courseName')}</th>
                                            <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('training.reaction')}</th>
                                            <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('training.learning')}</th>
                                            <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('training.behavior')}</th>
                                            <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('training.results')}</th>
                                            <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('training.instructorRating')}</th>
                                            <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('common.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        ${records.map(record => `
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-4 py-3">
                                                    <div class="text-sm font-medium text-gray-900">${i18n.isThai() ? record.courseNameTh : record.courseNameEn}</div>
                                                    <div class="text-xs text-gray-500">${record.courseCode}</div>
                                                </td>
                                                <td class="px-4 py-3 text-center">${this.renderRatingBadge(record.evaluations.reaction)}</td>
                                                <td class="px-4 py-3 text-center">${this.renderRatingBadge(record.evaluations.learning)}</td>
                                                <td class="px-4 py-3 text-center">${this.renderRatingBadge(record.evaluations.behavior)}</td>
                                                <td class="px-4 py-3 text-center">${this.renderRatingBadge(record.evaluations.results)}</td>
                                                <td class="px-4 py-3 text-center">${this.renderRatingBadge(record.instructorRating)}</td>
                                                <td class="px-4 py-3 text-center">
                                                    <button onclick="TrainingRecordsPage.viewEvaluationDetails('${record.id}')"
                                                        class="text-cg-red hover:text-red-700 text-sm">
                                                        ${i18n.t('common.viewMore')}
                                                    </button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : CardComponent.emptyState(i18n.t('training.noEvaluations'))
                    })}
                </div>
            `;
        },

        /**
         * Render rating badge
         * @param {number|null} rating
         * @returns {string}
         */
        renderRatingBadge(rating) {
            if (rating === null || rating === undefined) {
                return `<span class="text-gray-400">-</span>`;
            }
            const color = rating >= 4.5 ? 'bg-green-100 text-green-800' :
                         rating >= 3.5 ? 'bg-blue-100 text-blue-800' :
                         rating >= 2.5 ? 'bg-yellow-100 text-yellow-800' :
                         'bg-red-100 text-red-800';
            return `<span class="px-2 py-1 text-xs font-medium rounded-full ${color}">${rating.toFixed(1)}</span>`;
        },

        /**
         * Render certificates tab
         * @returns {string}
         */
        renderCertificates() {
            const certificates = MockTrainingRecords.certificates;
            const now = new Date();

            // Separate active and expiring certificates
            const activeCerts = certificates.filter(c => !c.expiryDate || new Date(c.expiryDate) > now);
            const expiringCerts = certificates.filter(c => {
                if (!c.expiryDate) return false;
                const expiry = new Date(c.expiryDate);
                const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
                return daysUntilExpiry > 0 && daysUntilExpiry <= 90;
            });

            return `
                <div class="space-y-6">
                    ${expiringCerts.length > 0 ? `
                        <!-- Expiring Soon Alert -->
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div class="flex items-start gap-3">
                                <span class="material-icons text-yellow-600">warning</span>
                                <div>
                                    <h4 class="font-medium text-yellow-800">${i18n.t('training.certificatesExpiring')}</h4>
                                    <p class="text-sm text-yellow-700 mt-1">
                                        ${i18n.t('training.certificatesExpiringDesc').replace('{count}', expiringCerts.length)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Certificates Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${certificates.map(cert => this.renderCertificateCard(cert)).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Render certificate card
         * @param {object} cert
         * @returns {string}
         */
        renderCertificateCard(cert) {
            const now = new Date();
            const expiry = cert.expiryDate ? new Date(cert.expiryDate) : null;
            const daysUntilExpiry = expiry ? Math.ceil((expiry - now) / (1000 * 60 * 60 * 24)) : null;

            let statusBadge = '';
            let statusColor = 'bg-green-100 text-green-800';
            if (expiry) {
                if (daysUntilExpiry < 0) {
                    statusBadge = i18n.t('training.expired');
                    statusColor = 'bg-red-100 text-red-800';
                } else if (daysUntilExpiry <= 90) {
                    statusBadge = `${i18n.t('training.expiresIn')} ${daysUntilExpiry} ${i18n.t('training.days')}`;
                    statusColor = 'bg-yellow-100 text-yellow-800';
                } else {
                    statusBadge = i18n.t('training.active');
                }
            } else {
                statusBadge = i18n.t('training.noExpiry');
            }

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-4 border-b border-gray-100 bg-gradient-to-r from-cg-red to-red-600">
                        <div class="flex items-center justify-between">
                            <span class="material-icons text-white text-3xl">workspace_premium</span>
                            <span class="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white">
                                ${statusBadge}
                            </span>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="font-medium text-gray-900 mb-1">${i18n.isThai() ? cert.courseNameTh : cert.courseNameEn}</h3>
                        <p class="text-sm text-gray-500 mb-3">${cert.certificateNumber}</p>

                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500">${i18n.t('training.issuedBy')}</span>
                                <span class="text-gray-900">${cert.issuedBy}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">${i18n.t('training.issueDate')}</span>
                                <span class="text-gray-900">${DateUtils.format(cert.issueDate, 'medium')}</span>
                            </div>
                            ${cert.expiryDate ? `
                                <div class="flex justify-between">
                                    <span class="text-gray-500">${i18n.t('training.expiryDate')}</span>
                                    <span class="text-gray-900 ${daysUntilExpiry <= 90 && daysUntilExpiry > 0 ? 'text-yellow-600 font-medium' : ''} ${daysUntilExpiry < 0 ? 'text-red-600 font-medium' : ''}">${DateUtils.format(cert.expiryDate, 'medium')}</span>
                                </div>
                            ` : ''}
                        </div>

                        <div class="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                            <button onclick="TrainingRecordsPage.downloadCertificate('${cert.id}')"
                                class="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-white bg-cg-red rounded-lg hover:bg-red-700 transition">
                                <span class="material-icons text-sm">download</span>
                                ${i18n.t('common.download')}
                            </button>
                            <button onclick="TrainingRecordsPage.verifyCertificate('${cert.id}')"
                                class="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                                title="${i18n.t('training.qrVerification')}">
                                <span class="material-icons text-sm">qr_code_2</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render reports tab
         * @returns {string}
         */
        renderReports() {
            const summary = MockTrainingRecords.trainingSummary;
            const deptReport = MockTrainingRecords.departmentReport;

            return `
                <div class="space-y-6">
                    <!-- Individual Transcript -->
                    ${CardComponent.render({
                        id: 'training-transcript',
                        title: i18n.t('training.transcript'),
                        icon: 'description',
                        actions: [{
                            icon: 'download',
                            label: i18n.t('training.downloadTranscript'),
                            onclick: "TrainingRecordsPage.downloadTranscript()"
                        }],
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Hours by Category -->
                                <div>
                                    <h4 class="text-sm font-medium text-gray-700 mb-3">${i18n.t('training.hoursByCategory')}</h4>
                                    <div class="space-y-3">
                                        ${Object.entries(summary.byCategory).map(([cat, data]) => {
                                            const category = MockTrainingRecords.trainingCategories.find(c => c.value === cat);
                                            const percentage = (data.hours / summary.totalHours * 100).toFixed(0);
                                            return `
                                                <div>
                                                    <div class="flex justify-between text-sm mb-1">
                                                        <span class="text-gray-600">${i18n.isThai() && category ? category.labelTh : (category?.labelEn || cat)}</span>
                                                        <span class="font-medium">${data.hours} ${i18n.t('training.hours')}</span>
                                                    </div>
                                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                                        <div class="bg-cg-red h-2 rounded-full" style="width: ${percentage}%"></div>
                                                    </div>
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>
                                </div>

                                <!-- Training by Year -->
                                <div>
                                    <h4 class="text-sm font-medium text-gray-700 mb-3">${i18n.t('training.trainingByYear')}</h4>
                                    <div class="space-y-4">
                                        ${Object.entries(summary.byYear).map(([year, data]) => `
                                            <div class="p-4 bg-gray-50 rounded-lg">
                                                <div class="flex justify-between items-center mb-2">
                                                    <span class="font-medium text-gray-900">${year}</span>
                                                    <span class="text-sm text-gray-500">${data.courses} ${i18n.t('training.courses')}</span>
                                                </div>
                                                <div class="flex justify-between text-sm">
                                                    <span class="text-gray-500">${data.hours} ${i18n.t('training.hours')}</span>
                                                    <span class="text-gray-500">${NumberUtils.formatCurrency(data.cost, 'THB')}</span>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `
                    })}

                    <!-- Department Summary -->
                    ${CardComponent.render({
                        id: 'department-summary',
                        title: i18n.t('training.departmentSummary'),
                        icon: 'business',
                        content: `
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div class="text-center p-4 bg-blue-50 rounded-lg">
                                    <div class="text-2xl font-bold text-blue-600">${deptReport.participationRate}%</div>
                                    <div class="text-sm text-gray-600">${i18n.t('training.participationRate')}</div>
                                </div>
                                <div class="text-center p-4 bg-green-50 rounded-lg">
                                    <div class="text-2xl font-bold text-green-600">${deptReport.averageHoursPerEmployee}</div>
                                    <div class="text-sm text-gray-600">${i18n.t('training.avgHoursPerEmployee')}</div>
                                </div>
                                <div class="text-center p-4 bg-purple-50 rounded-lg">
                                    <div class="text-2xl font-bold text-purple-600">${deptReport.budgetUtilization}%</div>
                                    <div class="text-sm text-gray-600">${i18n.t('training.budgetUtilization')}</div>
                                </div>
                                <div class="text-center p-4 bg-orange-50 rounded-lg">
                                    <div class="text-2xl font-bold text-orange-600">${deptReport.completionRates.mandatory}%</div>
                                    <div class="text-sm text-gray-600">${i18n.t('training.mandatoryCompletion')}</div>
                                </div>
                            </div>

                            <!-- Budget vs Actual -->
                            <div class="mb-6">
                                <h4 class="text-sm font-medium text-gray-700 mb-3">${i18n.t('training.budgetVsActual')}</h4>
                                <div class="flex items-center gap-4">
                                    <div class="flex-1">
                                        <div class="flex justify-between text-sm mb-1">
                                            <span class="text-gray-600">${i18n.t('training.budget')}: ${NumberUtils.formatCurrency(deptReport.totalBudget, 'THB')}</span>
                                            <span class="text-gray-600">${i18n.t('training.actual')}: ${NumberUtils.formatCurrency(deptReport.actualSpend, 'THB')}</span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-4">
                                            <div class="bg-cg-red h-4 rounded-full" style="width: ${deptReport.budgetUtilization}%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Top Courses -->
                            <div>
                                <h4 class="text-sm font-medium text-gray-700 mb-3">${i18n.t('training.topCourses')}</h4>
                                <div class="space-y-2">
                                    ${deptReport.topCourses.map((course, index) => `
                                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div class="flex items-center gap-3">
                                                <span class="w-6 h-6 flex items-center justify-center text-sm font-bold text-white bg-cg-red rounded-full">${index + 1}</span>
                                                <span class="text-gray-900">${course.courseName}</span>
                                            </div>
                                            <span class="text-sm text-gray-500">${course.participants} ${i18n.t('training.participants')}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `
                    })}
                </div>
            `;
        },

        /**
         * Render competency links tab
         * @returns {string}
         */
        renderCompetencyLinks() {
            const competencies = MockTrainingRecords.competencyLinks;
            const idpProgress = MockTrainingRecords.idpProgress;
            const skillMatrix = MockTrainingRecords.skillMatrix;

            return `
                <div class="space-y-6">
                    <!-- Competency Progress -->
                    ${CardComponent.render({
                        id: 'competency-progress',
                        title: i18n.t('training.competencyProgress'),
                        icon: 'psychology',
                        content: `
                            <div class="space-y-4">
                                ${competencies.map(comp => `
                                    <div class="p-4 border border-gray-200 rounded-lg">
                                        <div class="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 class="font-medium text-gray-900">${i18n.isThai() ? comp.competencyNameTh : comp.competencyNameEn}</h4>
                                                <p class="text-sm text-gray-500">
                                                    ${i18n.t('training.level')}: ${comp.currentLevel} / ${comp.targetLevel}
                                                </p>
                                            </div>
                                            <div class="text-right">
                                                <span class="text-2xl font-bold ${comp.progressPercentage >= 100 ? 'text-green-600' : 'text-cg-red'}">${comp.progressPercentage}%</span>
                                            </div>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-2">
                                            <div class="${comp.progressPercentage >= 100 ? 'bg-green-600' : 'bg-cg-red'} h-2 rounded-full transition-all" style="width: ${Math.min(comp.progressPercentage, 100)}%"></div>
                                        </div>
                                        <p class="text-xs text-gray-500 mt-2">
                                            ${i18n.t('common.updated')}: ${DateUtils.format(comp.lastUpdated, 'medium')}
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                        `
                    })}

                    <!-- IDP Progress -->
                    ${CardComponent.render({
                        id: 'idp-progress',
                        title: i18n.t('training.idpProgress'),
                        icon: 'trending_up',
                        content: `
                            <div class="space-y-4">
                                ${idpProgress.map(goal => `
                                    <div class="p-4 border border-gray-200 rounded-lg">
                                        <div class="flex items-center justify-between mb-2">
                                            <div>
                                                <h4 class="font-medium text-gray-900">${i18n.isThai() ? goal.goalNameTh : goal.goalNameEn}</h4>
                                                <p class="text-sm text-gray-500">
                                                    ${i18n.t('training.targetDate')}: ${DateUtils.format(goal.targetDate, 'medium')}
                                                </p>
                                            </div>
                                            <span class="px-2 py-1 text-xs font-medium rounded-full ${goal.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">
                                                ${goal.completedActions}/${goal.totalActions} ${i18n.t('training.actions')}
                                            </span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-2">
                                            <div class="bg-blue-600 h-2 rounded-full transition-all" style="width: ${goal.progress}%"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `
                    })}

                    <!-- Skill Matrix -->
                    ${CardComponent.render({
                        id: 'skill-matrix',
                        title: i18n.t('training.skillMatrix'),
                        icon: 'grid_on',
                        subtitle: i18n.isThai() ? skillMatrix.departmentNameTh : skillMatrix.departmentNameEn,
                        content: `
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('training.skill')}</th>
                                            <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('training.required')}</th>
                                            <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('training.current')}</th>
                                            <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('training.gap')}</th>
                                            <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('training.status')}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        ${skillMatrix.skills.map(skill => {
                                            const gapColor = skill.gap > 0 ? 'text-red-600' : skill.gap < 0 ? 'text-green-600' : 'text-gray-600';
                                            const statusIcon = skill.gap > 0 ? 'arrow_upward' : skill.gap < 0 ? 'check_circle' : 'remove';
                                            const statusColor = skill.gap > 0 ? 'bg-red-100 text-red-800' : skill.gap < 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
                                            return `
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3">
                                                        <div class="text-sm font-medium text-gray-900">${i18n.isThai() ? skill.skillNameTh : skill.skillNameEn}</div>
                                                    </td>
                                                    <td class="px-4 py-3 text-center text-sm text-gray-900">${skill.requiredLevel}</td>
                                                    <td class="px-4 py-3 text-center text-sm text-gray-900">${skill.currentLevel}</td>
                                                    <td class="px-4 py-3 text-center text-sm font-medium ${gapColor}">${skill.gap > 0 ? '+' : ''}${skill.gap}</td>
                                                    <td class="px-4 py-3 text-center">
                                                        <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusColor}">
                                                            <span class="material-icons text-xs">${statusIcon}</span>
                                                            ${skill.gap > 0 ? i18n.t('training.needsDevelopment') : skill.gap < 0 ? i18n.t('training.exceeds') : i18n.t('training.meets')}
                                                        </span>
                                                    </td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `
                    })}
                </div>
            `;
        },

        // Filter methods
        filterByYear(year) {
            selectedYear = year;
            this.switchTab('records');
        },

        filterByCategory(category) {
            selectedCategory = category;
            this.switchTab('records');
        },

        filterByStatus(status) {
            selectedStatus = status;
            this.switchTab('records');
        },

        clearFilters() {
            selectedYear = 'all';
            selectedCategory = 'all';
            selectedStatus = 'all';
            this.switchTab('records');
        },

        // Action methods
        viewRecordDetails(recordId) {
            const record = MockTrainingRecords.trainingRecords.find(r => r.id === recordId);
            if (!record) return;

            const category = MockTrainingRecords.trainingCategories.find(c => c.value === record.category);
            const status = MockTrainingRecords.trainingStatuses.find(s => s.value === record.status);
            const type = MockTrainingRecords.trainingTypes.find(t => t.value === record.trainingType);

            ModalComponent.open({
                title: i18n.isThai() ? record.courseNameTh : record.courseNameEn,
                size: 'lg',
                content: `
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.courseCode')}</label>
                                <p class="font-medium">${record.courseCode}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.type')}</label>
                                <p class="font-medium">${i18n.isThai() && type ? type.labelTh : (type?.labelEn || record.trainingType)}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.category')}</label>
                                <p class="font-medium">${i18n.isThai() && category ? category.labelTh : (category?.labelEn || record.category)}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.status')}</label>
                                <p class="font-medium">${i18n.isThai() && status ? status.labelTh : (status?.labelEn || record.status)}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.provider')}</label>
                                <p class="font-medium">${record.provider}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.instructor')}</label>
                                <p class="font-medium">${record.instructorName}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.duration')}</label>
                                <p class="font-medium">${record.duration} ${i18n.t('training.hours')}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.location')}</label>
                                <p class="font-medium">${record.location}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.dates')}</label>
                                <p class="font-medium">${DateUtils.format(record.startDate, 'medium')} - ${DateUtils.format(record.endDate, 'medium')}</p>
                            </div>
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.cost')}</label>
                                <p class="font-medium">${NumberUtils.formatCurrency(record.cost, record.currency)}</p>
                            </div>
                        </div>

                        ${record.status === 'completed' ? `
                            <hr>
                            <h4 class="font-medium text-gray-900">${i18n.t('training.assessmentResults')}</h4>
                            <div class="grid grid-cols-3 gap-4">
                                ${record.preAssessmentScore !== null ? `
                                    <div class="p-3 bg-gray-50 rounded-lg text-center">
                                        <p class="text-2xl font-bold text-gray-600">${record.preAssessmentScore}%</p>
                                        <p class="text-sm text-gray-500">${i18n.t('training.preAssessment')}</p>
                                    </div>
                                ` : ''}
                                ${record.postAssessmentScore !== null ? `
                                    <div class="p-3 bg-green-50 rounded-lg text-center">
                                        <p class="text-2xl font-bold text-green-600">${record.postAssessmentScore}%</p>
                                        <p class="text-sm text-gray-500">${i18n.t('training.postAssessment')}</p>
                                    </div>
                                ` : ''}
                                ${record.preAssessmentScore !== null && record.postAssessmentScore !== null ? `
                                    <div class="p-3 bg-blue-50 rounded-lg text-center">
                                        <p class="text-2xl font-bold text-blue-600">+${record.postAssessmentScore - record.preAssessmentScore}%</p>
                                        <p class="text-sm text-gray-500">${i18n.t('training.improvement')}</p>
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}

                        ${record.feedback ? `
                            <hr>
                            <div>
                                <label class="text-sm text-gray-500">${i18n.t('training.feedback')}</label>
                                <p class="mt-1 text-gray-900">${record.feedback}</p>
                            </div>
                        ` : ''}
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        viewEvaluationDetails(recordId) {
            this.viewRecordDetails(recordId);
        },

        downloadCertificate(certId) {
            const cert = MockTrainingRecords.certificates.find(c => c.id === certId);
            if (cert) {
                ToastComponent.success(i18n.t('toast.downloadStarted'));
                console.log('Downloading certificate:', cert.downloadUrl);
            }
        },

        verifyCertificate(certId) {
            const cert = MockTrainingRecords.certificates.find(c => c.id === certId);
            if (!cert) return;

            ModalComponent.open({
                title: i18n.t('training.qrVerification'),
                size: 'sm',
                content: `
                    <div class="text-center">
                        <div class="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="material-icons text-6xl text-gray-400">qr_code_2</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">${i18n.t('training.scanToVerify')}</p>
                        <p class="text-xs text-gray-500">${cert.verificationCode}</p>
                        <a href="${cert.qrCode}" target="_blank" class="mt-4 inline-block text-sm text-cg-red hover:text-red-700">
                            ${i18n.t('training.verifyOnline')}
                        </a>
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        downloadTranscript() {
            ToastComponent.success(i18n.t('toast.downloadStarted'));
            console.log('Downloading training transcript');
        },

        /**
         * Render skeleton loading state
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="container mx-auto px-4 py-6 max-w-7xl">
                    <div class="mb-6">
                        <div class="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div class="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        ${[1,2,3,4].map(() => `
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <div class="h-16 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="space-y-4">
                        ${[1,2,3].map(() => `
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div class="h-24 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    };
})();

// Utility for formatting numbers
const NumberUtils = {
    formatCurrency(amount, currency = 'THB') {
        if (amount === null || amount === undefined) return '-';
        return new Intl.NumberFormat(i18n.isThai() ? 'th-TH' : 'en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrainingRecordsPage;
}
