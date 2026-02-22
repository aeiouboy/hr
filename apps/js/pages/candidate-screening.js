/**
 * Candidate Screening Page
 * Auto-screening, Interview scheduling, Evaluation, Comparison, Offer management
 */

const CandidateScreeningPage = (function() {
    // Mock data for candidates
    const mockCandidates = [
        {
            id: 'CAND-001',
            firstName: 'Somchai',
            lastName: 'Jaidee',
            firstNameTh: 'สมชาย',
            lastNameTh: 'ใจดี',
            email: 'somchai.j@email.com',
            phone: '081-234-5678',
            position: 'Senior Software Engineer',
            positionId: 'POS-001',
            appliedDate: '2025-12-15',
            source: 'linkedin',
            status: 'screening',
            matchScore: 92,
            experience: 8,
            education: 'Master of Computer Science',
            currentCompany: 'ABC Tech Co.',
            currentSalary: 85000,
            expectedSalary: 120000,
            skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
            resume: '/documents/somchai_resume.pdf',
            photo: null,
            screeningResult: {
                education: { score: 95, match: true, notes: 'Exceeds requirements' },
                experience: { score: 90, match: true, notes: 'Meets 5+ years requirement' },
                skills: { score: 88, match: true, notes: '4 of 5 required skills matched' },
                language: { score: 85, match: true, notes: 'TOEIC 780' }
            }
        },
        {
            id: 'CAND-002',
            firstName: 'Napaporn',
            lastName: 'Sriwong',
            firstNameTh: 'นภาพร',
            lastNameTh: 'ศรีวงศ์',
            email: 'napaporn.s@email.com',
            phone: '089-456-7890',
            position: 'Senior Software Engineer',
            positionId: 'POS-001',
            appliedDate: '2025-12-18',
            source: 'jobsdb',
            status: 'interview_scheduled',
            matchScore: 78,
            experience: 5,
            education: 'Bachelor of Information Technology',
            currentCompany: 'XYZ Solutions',
            currentSalary: 65000,
            expectedSalary: 95000,
            skills: ['JavaScript', 'Vue.js', 'Java', 'MySQL'],
            resume: '/documents/napaporn_resume.pdf',
            photo: null,
            screeningResult: {
                education: { score: 80, match: true, notes: 'Meets requirements' },
                experience: { score: 75, match: true, notes: 'Meets minimum requirement' },
                skills: { score: 72, match: true, notes: '3 of 5 required skills matched' },
                language: { score: 70, match: true, notes: 'TOEIC 650' }
            }
        },
        {
            id: 'CAND-003',
            firstName: 'Wichai',
            lastName: 'Boonmee',
            firstNameTh: 'วิชัย',
            lastNameTh: 'บุญมี',
            email: 'wichai.b@email.com',
            phone: '082-345-6789',
            position: 'Product Manager',
            positionId: 'POS-002',
            appliedDate: '2025-12-20',
            source: 'referral',
            status: 'evaluated',
            matchScore: 88,
            experience: 10,
            education: 'MBA',
            currentCompany: 'Tech Startup Inc.',
            currentSalary: 120000,
            expectedSalary: 180000,
            skills: ['Product Strategy', 'Agile', 'Scrum', 'Data Analysis', 'Stakeholder Management'],
            resume: '/documents/wichai_resume.pdf',
            photo: null,
            screeningResult: {
                education: { score: 95, match: true, notes: 'Exceeds requirements' },
                experience: { score: 92, match: true, notes: 'Exceeds 7+ years requirement' },
                skills: { score: 85, match: true, notes: 'All required skills matched' },
                language: { score: 80, match: true, notes: 'Fluent English' }
            },
            interviews: [
                {
                    id: 'INT-001',
                    round: 1,
                    type: 'technical',
                    date: '2025-12-22',
                    time: '10:00',
                    duration: 60,
                    location: 'Meeting Room A',
                    status: 'completed',
                    panelists: ['John Smith', 'Jane Doe'],
                    evaluation: {
                        overallRating: 4.2,
                        technicalSkills: 4,
                        communication: 4.5,
                        problemSolving: 4,
                        cultureFit: 4.5,
                        recommendation: 'hire',
                        notes: 'Strong candidate with excellent communication skills'
                    }
                }
            ]
        },
        {
            id: 'CAND-004',
            firstName: 'Siriporn',
            lastName: 'Chantrasakul',
            firstNameTh: 'ศิริพร',
            lastNameTh: 'จันทรสกุล',
            email: 'siriporn.c@email.com',
            phone: '091-234-5678',
            position: 'Senior Software Engineer',
            positionId: 'POS-001',
            appliedDate: '2025-12-10',
            source: 'career_site',
            status: 'offer_sent',
            matchScore: 95,
            experience: 7,
            education: 'Master of Computer Engineering',
            currentCompany: 'Global Tech Ltd.',
            currentSalary: 95000,
            expectedSalary: 130000,
            skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
            resume: '/documents/siriporn_resume.pdf',
            photo: null,
            offer: {
                id: 'OFF-001',
                position: 'Senior Software Engineer',
                salary: 125000,
                startDate: '2026-02-01',
                status: 'pending',
                sentDate: '2026-01-05',
                expiryDate: '2026-01-20',
                benefits: ['Health Insurance', 'Annual Bonus', 'Flexible Hours'],
                approvals: [
                    { step: 'Hiring Manager', status: 'approved', date: '2026-01-03', approver: 'John Smith' },
                    { step: 'HR Director', status: 'approved', date: '2026-01-04', approver: 'Mary Johnson' },
                    { step: 'Finance', status: 'approved', date: '2026-01-05', approver: 'Bob Wilson' }
                ]
            }
        }
    ];

    // Mock interview rooms
    const mockRooms = [
        { id: 'ROOM-A', name: 'Meeting Room A', capacity: 6, floor: '5F', facilities: ['Projector', 'Whiteboard'] },
        { id: 'ROOM-B', name: 'Meeting Room B', capacity: 8, floor: '5F', facilities: ['Video Conference', 'Whiteboard'] },
        { id: 'ROOM-C', name: 'Interview Room 1', capacity: 4, floor: '3F', facilities: ['Video Conference'] },
        { id: 'ROOM-D', name: 'Interview Room 2', capacity: 4, floor: '3F', facilities: [] }
    ];

    // Mock positions for screening
    const mockPositions = [
        { id: 'POS-001', title: 'Senior Software Engineer', department: 'IT', headcount: 2 },
        { id: 'POS-002', title: 'Product Manager', department: 'Product', headcount: 1 },
        { id: 'POS-003', title: 'Business Analyst', department: 'Business', headcount: 1 }
    ];

    // Current state
    let currentTab = 'screening';
    let selectedCandidates = [];
    let filters = {
        status: '',
        position: '',
        search: ''
    };

    return {
        /**
         * Render the page
         * @returns {string}
         */
        render() {
            const employee = AppState.get('currentEmployee');
            if (!employee) {
                return this.renderSkeleton();
            }

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <!-- Page Header -->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('candidateScreening.title')}</h1>
                        <p class="text-sm text-gray-500 mt-1">${i18n.t('candidateScreening.subtitle')}</p>
                    </div>

                    <!-- Tab Navigation -->
                    <div class="mb-6" role="tablist" aria-label="${i18n.t('candidateScreening.title')}">
                        <nav class="flex border-b border-gray-200 overflow-x-auto">
                            ${this.renderTab('screening', 'filter_list', i18n.t('candidateScreening.tabs.screening'))}
                            ${this.renderTab('interviews', 'event', i18n.t('candidateScreening.tabs.interviews'))}
                            ${this.renderTab('evaluation', 'assessment', i18n.t('candidateScreening.tabs.evaluation'))}
                            ${this.renderTab('comparison', 'compare', i18n.t('candidateScreening.tabs.comparison'))}
                            ${this.renderTab('offers', 'description', i18n.t('candidateScreening.tabs.offers'))}
                        </nav>
                    </div>

                    <!-- Tab Content -->
                    <div id="tab-content" role="tabpanel" aria-labelledby="tab-${currentTab}">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Render a tab button
         */
        renderTab(id, icon, label) {
            const isActive = currentTab === id;
            return `
                <button
                    id="tab-${id}"
                    role="tab"
                    aria-selected="${isActive}"
                    aria-controls="tab-content"
                    tabindex="${isActive ? '0' : '-1'}"
                    onclick="CandidateScreeningPage.switchTab('${id}')"
                    class="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-cg-red focus:ring-offset-2 ${isActive ? 'border-cg-red text-cg-red' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                >
                    <span class="material-icons text-lg">${icon}</span>
                    ${label}
                </button>
            `;
        },

        /**
         * Render tab content based on current tab
         */
        renderTabContent() {
            switch (currentTab) {
                case 'screening':
                    return this.renderScreeningTab();
                case 'interviews':
                    return this.renderInterviewsTab();
                case 'evaluation':
                    return this.renderEvaluationTab();
                case 'comparison':
                    return this.renderComparisonTab();
                case 'offers':
                    return this.renderOffersTab();
                default:
                    return this.renderScreeningTab();
            }
        },

        /**
         * Render Screening Tab
         */
        renderScreeningTab() {
            const candidates = this.filterCandidates(mockCandidates);

            return `
                <div class="space-y-6">
                    <!-- Filters and Actions -->
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="flex flex-col md:flex-row gap-4">
                            <!-- Search -->
                            <div class="flex-1">
                                <div class="relative">
                                    <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                    <input
                                        type="text"
                                        id="search-candidates"
                                        placeholder="${i18n.t('candidateScreening.searchPlaceholder')}"
                                        value="${filters.search}"
                                        onkeyup="CandidateScreeningPage.updateFilter('search', this.value)"
                                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red"
                                        aria-label="${i18n.t('common.search')}"
                                    >
                                </div>
                            </div>

                            <!-- Status Filter -->
                            <div class="w-full md:w-48">
                                <select
                                    id="filter-status"
                                    onchange="CandidateScreeningPage.updateFilter('status', this.value)"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red"
                                    aria-label="${i18n.t('candidateScreening.filterByStatus')}"
                                >
                                    <option value="">${i18n.t('candidateScreening.allStatuses')}</option>
                                    <option value="screening" ${filters.status === 'screening' ? 'selected' : ''}>${i18n.t('candidateScreening.status.screening')}</option>
                                    <option value="shortlisted" ${filters.status === 'shortlisted' ? 'selected' : ''}>${i18n.t('candidateScreening.status.shortlisted')}</option>
                                    <option value="interview_scheduled" ${filters.status === 'interview_scheduled' ? 'selected' : ''}>${i18n.t('candidateScreening.status.interviewScheduled')}</option>
                                    <option value="evaluated" ${filters.status === 'evaluated' ? 'selected' : ''}>${i18n.t('candidateScreening.status.evaluated')}</option>
                                    <option value="offer_sent" ${filters.status === 'offer_sent' ? 'selected' : ''}>${i18n.t('candidateScreening.status.offerSent')}</option>
                                    <option value="rejected" ${filters.status === 'rejected' ? 'selected' : ''}>${i18n.t('candidateScreening.status.rejected')}</option>
                                </select>
                            </div>

                            <!-- Position Filter -->
                            <div class="w-full md:w-48">
                                <select
                                    id="filter-position"
                                    onchange="CandidateScreeningPage.updateFilter('position', this.value)"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red"
                                    aria-label="${i18n.t('candidateScreening.filterByPosition')}"
                                >
                                    <option value="">${i18n.t('candidateScreening.allPositions')}</option>
                                    ${mockPositions.map(p => `
                                        <option value="${p.id}" ${filters.position === p.id ? 'selected' : ''}>${p.title}</option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>

                        <!-- Bulk Actions -->
                        ${selectedCandidates.length > 0 ? `
                            <div class="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2">
                                <span class="text-sm text-gray-600">${selectedCandidates.length} ${i18n.t('candidateScreening.selected')}</span>
                                <button
                                    onclick="CandidateScreeningPage.bulkAction('shortlist')"
                                    class="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                                >
                                    <span class="material-icons text-sm align-middle mr-1">check</span>
                                    ${i18n.t('candidateScreening.shortlist')}
                                </button>
                                <button
                                    onclick="CandidateScreeningPage.bulkAction('reject')"
                                    class="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                >
                                    <span class="material-icons text-sm align-middle mr-1">close</span>
                                    ${i18n.t('candidateScreening.reject')}
                                </button>
                                <button
                                    onclick="CandidateScreeningPage.bulkAction('schedule_interview')"
                                    class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                                >
                                    <span class="material-icons text-sm align-middle mr-1">event</span>
                                    ${i18n.t('candidateScreening.scheduleInterview')}
                                </button>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Candidates List -->
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        ${candidates.length > 0 ? `
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200" role="grid" aria-label="${i18n.t('candidateScreening.candidatesList')}">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-3 text-left">
                                                <input
                                                    type="checkbox"
                                                    id="select-all-candidates"
                                                    onchange="CandidateScreeningPage.toggleSelectAll(this.checked)"
                                                    class="rounded border-gray-300 text-cg-red focus:ring-cg-red"
                                                    aria-label="${i18n.t('accessibility.selectAll')}"
                                                >
                                            </th>
                                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('candidateScreening.candidate')}</th>
                                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('candidateScreening.position')}</th>
                                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('candidateScreening.matchScore')}</th>
                                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('candidateScreening.status.label')}</th>
                                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('candidateScreening.appliedDate')}</th>
                                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('common.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        ${candidates.map(c => this.renderCandidateRow(c)).join('')}
                                    </tbody>
                                </table>
                            </div>
                        ` : `
                            <div class="p-8 text-center text-gray-500">
                                <span class="material-icons text-4xl text-gray-300 mb-2">person_search</span>
                                <p>${i18n.t('candidateScreening.noCandidates')}</p>
                            </div>
                        `}
                    </div>
                </div>
            `;
        },

        /**
         * Render a candidate row
         */
        renderCandidateRow(candidate) {
            const isSelected = selectedCandidates.includes(candidate.id);
            const isThai = i18n.isThai();
            const name = isThai ? `${candidate.firstNameTh} ${candidate.lastNameTh}` : `${candidate.firstName} ${candidate.lastName}`;

            return `
                <tr class="hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}">
                    <td class="px-4 py-3">
                        <input
                            type="checkbox"
                            id="select-candidate-${candidate.id}"
                            ${isSelected ? 'checked' : ''}
                            onchange="CandidateScreeningPage.toggleCandidate('${candidate.id}')"
                            class="rounded border-gray-300 text-cg-red focus:ring-cg-red"
                            aria-label="${i18n.t('common.select')} ${name}"
                        >
                    </td>
                    <td class="px-4 py-3">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-cg-red/10 flex items-center justify-center text-cg-red font-medium">
                                ${candidate.firstName.charAt(0)}${candidate.lastName.charAt(0)}
                            </div>
                            <div>
                                <div class="font-medium text-gray-900">${name}</div>
                                <div class="text-sm text-gray-500">${candidate.email}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">${candidate.position}</td>
                    <td class="px-4 py-3">
                        ${this.renderMatchScore(candidate.matchScore)}
                    </td>
                    <td class="px-4 py-3">
                        ${this.renderStatusBadge(candidate.status)}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700">${DateUtils.format(candidate.appliedDate, 'medium')}</td>
                    <td class="px-4 py-3">
                        <div class="flex gap-1">
                            <button
                                onclick="CandidateScreeningPage.viewCandidateDetails('${candidate.id}')"
                                class="p-1 text-gray-500 hover:text-cg-red rounded hover:bg-gray-100 transition"
                                title="${i18n.t('common.viewMore')}"
                                aria-label="${i18n.t('common.viewMore')}"
                            >
                                <span class="material-icons text-lg">visibility</span>
                            </button>
                            <button
                                onclick="CandidateScreeningPage.scheduleInterview('${candidate.id}')"
                                class="p-1 text-gray-500 hover:text-blue-600 rounded hover:bg-gray-100 transition"
                                title="${i18n.t('candidateScreening.scheduleInterview')}"
                                aria-label="${i18n.t('candidateScreening.scheduleInterview')}"
                            >
                                <span class="material-icons text-lg">event</span>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        },

        /**
         * Render match score with visual indicator
         */
        renderMatchScore(score) {
            let colorClass = 'bg-red-100 text-red-700';
            if (score >= 80) {
                colorClass = 'bg-green-100 text-green-700';
            } else if (score >= 60) {
                colorClass = 'bg-yellow-100 text-yellow-700';
            }

            return `
                <div class="flex items-center gap-2">
                    <div class="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}" style="width: ${score}%"></div>
                    </div>
                    <span class="text-sm font-medium ${colorClass} px-2 py-0.5 rounded">${score}%</span>
                </div>
            `;
        },

        /**
         * Render status badge
         */
        renderStatusBadge(status) {
            const statusConfig = {
                screening: { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'filter_list' },
                shortlisted: { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'check_circle' },
                interview_scheduled: { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'event' },
                evaluated: { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'assessment' },
                offer_sent: { bg: 'bg-green-100', text: 'text-green-700', icon: 'send' },
                hired: { bg: 'bg-green-500', text: 'text-white', icon: 'person_add' },
                rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: 'cancel' }
            };

            const config = statusConfig[status] || statusConfig.screening;
            const statusKey = `candidateScreening.status.${status.replace('_', '')}`;

            return `
                <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}">
                    <span class="material-icons text-xs">${config.icon}</span>
                    ${i18n.t(`candidateScreening.status.${this.camelCase(status)}`)}
                </span>
            `;
        },

        /**
         * Render Interviews Tab
         */
        renderInterviewsTab() {
            const scheduledInterviews = this.getScheduledInterviews();

            return `
                <div class="space-y-6">
                    <!-- Calendar View Toggle -->
                    <div class="bg-white rounded-lg shadow p-4">
                        <div class="flex flex-col md:flex-row justify-between gap-4">
                            <div class="flex gap-2">
                                <button
                                    onclick="CandidateScreeningPage.setInterviewView('list')"
                                    class="px-4 py-2 text-sm font-medium rounded-lg bg-cg-red text-white"
                                    aria-pressed="true"
                                >
                                    <span class="material-icons text-sm align-middle mr-1">list</span>
                                    ${i18n.t('candidateScreening.listView')}
                                </button>
                                <button
                                    onclick="CandidateScreeningPage.setInterviewView('calendar')"
                                    class="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    aria-pressed="false"
                                >
                                    <span class="material-icons text-sm align-middle mr-1">calendar_month</span>
                                    ${i18n.t('candidateScreening.calendarView')}
                                </button>
                            </div>
                            <button
                                onclick="CandidateScreeningPage.openScheduleModal()"
                                class="px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                            >
                                <span class="material-icons text-lg">add</span>
                                ${i18n.t('candidateScreening.scheduleNew')}
                            </button>
                        </div>
                    </div>

                    <!-- Interview List -->
                    <div class="bg-white rounded-lg shadow overflow-hidden">
                        ${scheduledInterviews.length > 0 ? `
                            <div class="divide-y divide-gray-200">
                                ${scheduledInterviews.map(interview => this.renderInterviewCard(interview)).join('')}
                            </div>
                        ` : `
                            <div class="p-8 text-center text-gray-500">
                                <span class="material-icons text-4xl text-gray-300 mb-2">event_busy</span>
                                <p>${i18n.t('candidateScreening.noInterviews')}</p>
                            </div>
                        `}
                    </div>
                </div>
            `;
        },

        /**
         * Render interview card
         */
        renderInterviewCard(interview) {
            const candidate = mockCandidates.find(c => c.id === interview.candidateId);
            if (!candidate) return '';

            const isThai = i18n.isThai();
            const name = isThai ? `${candidate.firstNameTh} ${candidate.lastNameTh}` : `${candidate.firstName} ${candidate.lastName}`;

            return `
                <div class="p-4 hover:bg-gray-50 transition">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <span class="material-icons">event</span>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900">${name}</h4>
                                <p class="text-sm text-gray-500">${candidate.position}</p>
                                <div class="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">calendar_today</span>
                                        ${DateUtils.format(interview.date, 'long')}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">schedule</span>
                                        ${interview.time}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">meeting_room</span>
                                        ${interview.room}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                                ${i18n.t(`candidateScreening.interviewType.${interview.type}`)}
                            </span>
                            <button
                                onclick="CandidateScreeningPage.editInterview('${interview.id}')"
                                class="p-2 text-gray-500 hover:text-cg-red rounded-lg hover:bg-gray-100"
                                title="${i18n.t('common.edit')}"
                            >
                                <span class="material-icons">edit</span>
                            </button>
                            <button
                                onclick="CandidateScreeningPage.sendInterviewNotification('${interview.id}')"
                                class="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100"
                                title="${i18n.t('candidateScreening.sendNotification')}"
                            >
                                <span class="material-icons">email</span>
                            </button>
                        </div>
                    </div>
                    <!-- Panelists -->
                    <div class="mt-4 flex flex-wrap gap-2">
                        <span class="text-sm text-gray-500">${i18n.t('candidateScreening.panelists')}:</span>
                        ${(interview.panelists || []).map(p => `
                            <span class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">${p}</span>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Render Evaluation Tab
         */
        renderEvaluationTab() {
            const candidatesWithEvaluations = mockCandidates.filter(c => c.interviews && c.interviews.some(i => i.evaluation));

            return `
                <div class="space-y-6">
                    <!-- Quick Stats -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="bg-white rounded-lg shadow p-4">
                            <div class="flex items-center gap-3">
                                <div class="p-3 bg-blue-100 rounded-lg">
                                    <span class="material-icons text-blue-600">people</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${mockCandidates.length}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('candidateScreening.totalCandidates')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4">
                            <div class="flex items-center gap-3">
                                <div class="p-3 bg-green-100 rounded-lg">
                                    <span class="material-icons text-green-600">thumb_up</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${candidatesWithEvaluations.filter(c => c.interviews?.some(i => i.evaluation?.recommendation === 'hire')).length}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('candidateScreening.recommendHire')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4">
                            <div class="flex items-center gap-3">
                                <div class="p-3 bg-yellow-100 rounded-lg">
                                    <span class="material-icons text-yellow-600">pause_circle</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${candidatesWithEvaluations.filter(c => c.interviews?.some(i => i.evaluation?.recommendation === 'hold')).length}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('candidateScreening.recommendHold')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4">
                            <div class="flex items-center gap-3">
                                <div class="p-3 bg-red-100 rounded-lg">
                                    <span class="material-icons text-red-600">thumb_down</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${candidatesWithEvaluations.filter(c => c.interviews?.some(i => i.evaluation?.recommendation === 'no_hire')).length}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('candidateScreening.recommendNoHire')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Pending Evaluations -->
                    <div class="bg-white rounded-lg shadow">
                        <div class="p-4 border-b border-gray-200">
                            <h3 class="font-semibold text-gray-900">${i18n.t('candidateScreening.pendingEvaluations')}</h3>
                        </div>
                        <div class="divide-y divide-gray-200">
                            ${candidatesWithEvaluations.length > 0 ? candidatesWithEvaluations.map(c => this.renderEvaluationCard(c)).join('') : `
                                <div class="p-8 text-center text-gray-500">
                                    <span class="material-icons text-4xl text-gray-300 mb-2">assessment</span>
                                    <p>${i18n.t('candidateScreening.noEvaluations')}</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render evaluation card
         */
        renderEvaluationCard(candidate) {
            const latestInterview = candidate.interviews?.[candidate.interviews.length - 1];
            if (!latestInterview?.evaluation) return '';

            const eval_ = latestInterview.evaluation;
            const isThai = i18n.isThai();
            const name = isThai ? `${candidate.firstNameTh} ${candidate.lastNameTh}` : `${candidate.firstName} ${candidate.lastName}`;

            const recommendationConfig = {
                hire: { bg: 'bg-green-100', text: 'text-green-700', icon: 'thumb_up' },
                no_hire: { bg: 'bg-red-100', text: 'text-red-700', icon: 'thumb_down' },
                hold: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: 'pause_circle' }
            };

            const rec = recommendationConfig[eval_.recommendation] || recommendationConfig.hold;

            return `
                <div class="p-4 hover:bg-gray-50 transition">
                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full bg-cg-red/10 flex items-center justify-center text-cg-red font-medium">
                                ${candidate.firstName.charAt(0)}${candidate.lastName.charAt(0)}
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900">${name}</h4>
                                <p class="text-sm text-gray-500">${candidate.position}</p>
                                <div class="flex items-center gap-2 mt-2">
                                    <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${rec.bg} ${rec.text}">
                                        <span class="material-icons text-xs">${rec.icon}</span>
                                        ${i18n.t(`candidateScreening.recommendation.${eval_.recommendation}`)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex-shrink-0">
                            <!-- Rating Stars -->
                            <div class="text-center">
                                <div class="text-3xl font-bold text-cg-red">${eval_.overallRating.toFixed(1)}</div>
                                <div class="flex gap-1 justify-center mt-1">
                                    ${this.renderStars(eval_.overallRating)}
                                </div>
                                <p class="text-xs text-gray-500 mt-1">${i18n.t('candidateScreening.overallRating')}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Competency Scores -->
                    <div class="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
                        ${this.renderCompetencyScore(i18n.t('candidateScreening.competency.technical'), eval_.technicalSkills)}
                        ${this.renderCompetencyScore(i18n.t('candidateScreening.competency.communication'), eval_.communication)}
                        ${this.renderCompetencyScore(i18n.t('candidateScreening.competency.problemSolving'), eval_.problemSolving)}
                        ${this.renderCompetencyScore(i18n.t('candidateScreening.competency.cultureFit'), eval_.cultureFit)}
                        <div class="flex items-center gap-2">
                            <button
                                onclick="CandidateScreeningPage.viewFullEvaluation('${candidate.id}')"
                                class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                            >
                                ${i18n.t('common.viewMore')}
                            </button>
                        </div>
                    </div>

                    <!-- Notes -->
                    ${eval_.notes ? `
                        <div class="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                            <span class="material-icons text-sm align-middle mr-1">notes</span>
                            ${eval_.notes}
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render competency score
         */
        renderCompetencyScore(label, score) {
            return `
                <div class="text-center">
                    <div class="text-lg font-semibold text-gray-900">${score.toFixed(1)}</div>
                    <p class="text-xs text-gray-500">${label}</p>
                </div>
            `;
        },

        /**
         * Render star rating
         */
        renderStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalf = rating - fullStars >= 0.5;
            let html = '';

            for (let i = 0; i < 5; i++) {
                if (i < fullStars) {
                    html += '<span class="material-icons text-yellow-400 text-sm">star</span>';
                } else if (i === fullStars && hasHalf) {
                    html += '<span class="material-icons text-yellow-400 text-sm">star_half</span>';
                } else {
                    html += '<span class="material-icons text-gray-300 text-sm">star_outline</span>';
                }
            }

            return html;
        },

        /**
         * Render Comparison Tab
         */
        renderComparisonTab() {
            const evaluatedCandidates = mockCandidates.filter(c => c.interviews?.some(i => i.evaluation));

            return `
                <div class="space-y-6">
                    <!-- Candidate Selection -->
                    <div class="bg-white rounded-lg shadow p-4">
                        <h3 class="font-medium text-gray-900 mb-4">${i18n.t('candidateScreening.selectToCompare')}</h3>
                        <div class="flex flex-wrap gap-3">
                            ${evaluatedCandidates.map(c => {
                                const isThai = i18n.isThai();
                                const name = isThai ? `${c.firstNameTh} ${c.lastNameTh}` : `${c.firstName} ${c.lastName}`;
                                const isSelected = selectedCandidates.includes(c.id);
                                return `
                                    <button
                                        onclick="CandidateScreeningPage.toggleCompareCandidate('${c.id}')"
                                        class="px-4 py-2 rounded-lg border transition ${isSelected ? 'bg-cg-red text-white border-cg-red' : 'bg-white text-gray-700 border-gray-300 hover:border-cg-red'}"
                                    >
                                        ${name}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Comparison Table -->
                    ${selectedCandidates.length >= 2 ? this.renderComparisonTable() : `
                        <div class="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                            <span class="material-icons text-4xl text-gray-300 mb-2">compare_arrows</span>
                            <p>${i18n.t('candidateScreening.selectAtLeastTwo')}</p>
                        </div>
                    `}
                </div>
            `;
        },

        /**
         * Render comparison table
         */
        renderComparisonTable() {
            const candidates = mockCandidates.filter(c => selectedCandidates.includes(c.id));
            const isThai = i18n.isThai();

            const getLatestEval = (c) => c.interviews?.[c.interviews.length - 1]?.evaluation || {};

            return `
                <div class="bg-white rounded-lg shadow overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('candidateScreening.criteria')}</th>
                                ${candidates.map(c => {
                                    const name = isThai ? `${c.firstNameTh} ${c.lastNameTh}` : `${c.firstName} ${c.lastName}`;
                                    return `<th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${name}</th>`;
                                }).join('')}
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr>
                                <td class="px-4 py-3 font-medium text-gray-900">${i18n.t('candidateScreening.matchScore')}</td>
                                ${candidates.map(c => `<td class="px-4 py-3 text-center">${this.renderMatchScore(c.matchScore)}</td>`).join('')}
                            </tr>
                            <tr class="bg-gray-50">
                                <td class="px-4 py-3 font-medium text-gray-900">${i18n.t('candidateScreening.experience')}</td>
                                ${candidates.map(c => `<td class="px-4 py-3 text-center">${c.experience} ${i18n.t('employment.years')}</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-medium text-gray-900">${i18n.t('candidateScreening.education')}</td>
                                ${candidates.map(c => `<td class="px-4 py-3 text-center text-sm">${c.education}</td>`).join('')}
                            </tr>
                            <tr class="bg-gray-50">
                                <td class="px-4 py-3 font-medium text-gray-900">${i18n.t('candidateScreening.expectedSalary')}</td>
                                ${candidates.map(c => `<td class="px-4 py-3 text-center">${c.expectedSalary.toLocaleString()} THB</td>`).join('')}
                            </tr>
                            <tr>
                                <td class="px-4 py-3 font-medium text-gray-900">${i18n.t('candidateScreening.overallRating')}</td>
                                ${candidates.map(c => {
                                    const eval_ = getLatestEval(c);
                                    return `<td class="px-4 py-3 text-center">${eval_.overallRating ? `<span class="text-lg font-bold text-cg-red">${eval_.overallRating.toFixed(1)}</span>` : '-'}</td>`;
                                }).join('')}
                            </tr>
                            <tr class="bg-gray-50">
                                <td class="px-4 py-3 font-medium text-gray-900">${i18n.t('candidateScreening.recommendation.label')}</td>
                                ${candidates.map(c => {
                                    const eval_ = getLatestEval(c);
                                    return `<td class="px-4 py-3 text-center">${eval_.recommendation ? i18n.t(`candidateScreening.recommendation.${eval_.recommendation}`) : '-'}</td>`;
                                }).join('')}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Panel Consensus -->
                <div class="bg-white rounded-lg shadow p-4 mt-6">
                    <h3 class="font-semibold text-gray-900 mb-4">${i18n.t('candidateScreening.panelConsensus')}</h3>
                    <div class="grid grid-cols-1 md:grid-cols-${candidates.length} gap-4">
                        ${candidates.map(c => {
                            const name = isThai ? `${c.firstNameTh} ${c.lastNameTh}` : `${c.firstName} ${c.lastName}`;
                            return `
                                <div class="p-4 border border-gray-200 rounded-lg">
                                    <h4 class="font-medium text-gray-900 mb-2">${name}</h4>
                                    <button
                                        onclick="CandidateScreeningPage.addPanelVote('${c.id}')"
                                        class="w-full px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        ${i18n.t('candidateScreening.addVote')}
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Render Offers Tab
         */
        renderOffersTab() {
            const candidatesWithOffers = mockCandidates.filter(c => c.offer);

            return `
                <div class="space-y-6">
                    <!-- Quick Stats -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="bg-white rounded-lg shadow p-4">
                            <div class="flex items-center gap-3">
                                <div class="p-3 bg-blue-100 rounded-lg">
                                    <span class="material-icons text-blue-600">description</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${candidatesWithOffers.length}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('candidateScreening.totalOffers')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4">
                            <div class="flex items-center gap-3">
                                <div class="p-3 bg-yellow-100 rounded-lg">
                                    <span class="material-icons text-yellow-600">pending</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${candidatesWithOffers.filter(c => c.offer.status === 'pending').length}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('candidateScreening.offerStatus.pending')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4">
                            <div class="flex items-center gap-3">
                                <div class="p-3 bg-green-100 rounded-lg">
                                    <span class="material-icons text-green-600">check_circle</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${candidatesWithOffers.filter(c => c.offer.status === 'accepted').length}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('candidateScreening.offerStatus.accepted')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow p-4">
                            <div class="flex items-center gap-3">
                                <div class="p-3 bg-red-100 rounded-lg">
                                    <span class="material-icons text-red-600">cancel</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${candidatesWithOffers.filter(c => c.offer.status === 'declined').length}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('candidateScreening.offerStatus.declined')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Offers List -->
                    <div class="bg-white rounded-lg shadow">
                        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 class="font-semibold text-gray-900">${i18n.t('candidateScreening.offersList')}</h3>
                            <button
                                onclick="CandidateScreeningPage.createOffer()"
                                class="px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                            >
                                <span class="material-icons text-lg">add</span>
                                ${i18n.t('candidateScreening.createOffer')}
                            </button>
                        </div>
                        <div class="divide-y divide-gray-200">
                            ${candidatesWithOffers.length > 0 ? candidatesWithOffers.map(c => this.renderOfferCard(c)).join('') : `
                                <div class="p-8 text-center text-gray-500">
                                    <span class="material-icons text-4xl text-gray-300 mb-2">description</span>
                                    <p>${i18n.t('candidateScreening.noOffers')}</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render offer card
         */
        renderOfferCard(candidate) {
            const offer = candidate.offer;
            const isThai = i18n.isThai();
            const name = isThai ? `${candidate.firstNameTh} ${candidate.lastNameTh}` : `${candidate.firstName} ${candidate.lastName}`;

            const statusConfig = {
                pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: 'pending' },
                accepted: { bg: 'bg-green-100', text: 'text-green-700', icon: 'check_circle' },
                declined: { bg: 'bg-red-100', text: 'text-red-700', icon: 'cancel' },
                expired: { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'timer_off' }
            };

            const config = statusConfig[offer.status] || statusConfig.pending;

            return `
                <div class="p-4 hover:bg-gray-50 transition">
                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full bg-cg-red/10 flex items-center justify-center text-cg-red font-medium">
                                ${candidate.firstName.charAt(0)}${candidate.lastName.charAt(0)}
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900">${name}</h4>
                                <p class="text-sm text-gray-500">${offer.position}</p>
                                <div class="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">payments</span>
                                        ${offer.salary.toLocaleString()} THB
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">event</span>
                                        ${i18n.t('candidateScreening.startDate')}: ${DateUtils.format(offer.startDate, 'medium')}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${config.bg} ${config.text}">
                                <span class="material-icons text-sm">${config.icon}</span>
                                ${i18n.t(`candidateScreening.offerStatus.${offer.status}`)}
                            </span>
                            <button
                                onclick="CandidateScreeningPage.viewOfferDetails('${candidate.id}')"
                                class="p-2 text-gray-500 hover:text-cg-red rounded-lg hover:bg-gray-100"
                                title="${i18n.t('common.viewMore')}"
                            >
                                <span class="material-icons">visibility</span>
                            </button>
                            <button
                                onclick="CandidateScreeningPage.downloadOfferLetter('${candidate.id}')"
                                class="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100"
                                title="${i18n.t('common.download')}"
                            >
                                <span class="material-icons">download</span>
                            </button>
                        </div>
                    </div>

                    <!-- Approval Chain -->
                    <div class="mt-4">
                        <p class="text-sm font-medium text-gray-700 mb-2">${i18n.t('candidateScreening.approvalChain')}</p>
                        <div class="flex flex-wrap gap-2">
                            ${(offer.approvals || []).map(a => {
                                const statusIcon = a.status === 'approved' ? 'check_circle' : a.status === 'pending' ? 'pending' : 'cancel';
                                const statusColor = a.status === 'approved' ? 'text-green-600' : a.status === 'pending' ? 'text-yellow-600' : 'text-red-600';
                                return `
                                    <div class="flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg text-sm">
                                        <span class="material-icons text-sm ${statusColor}">${statusIcon}</span>
                                        <span>${a.step}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Expiry Warning -->
                    ${offer.status === 'pending' && offer.expiryDate ? `
                        <div class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                            <span class="material-icons text-sm align-middle mr-1">warning</span>
                            ${i18n.t('candidateScreening.offerExpiresOn')}: ${DateUtils.format(offer.expiryDate, 'long')}
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Initialize page
         */
        init() {
            currentTab = 'screening';
            selectedCandidates = [];
            filters = { status: '', position: '', search: '' };
        },

        /**
         * Switch tabs
         */
        switchTab(tab) {
            currentTab = tab;
            if (tab !== 'comparison') {
                selectedCandidates = [];
            }
            Router.refresh();
        },

        /**
         * Update filter
         */
        updateFilter(key, value) {
            filters[key] = value;
            Router.refresh();
        },

        /**
         * Filter candidates
         */
        filterCandidates(candidates) {
            return candidates.filter(c => {
                if (filters.status && c.status !== filters.status) return false;
                if (filters.position && c.positionId !== filters.position) return false;
                if (filters.search) {
                    const searchLower = filters.search.toLowerCase();
                    const matchName = `${c.firstName} ${c.lastName} ${c.firstNameTh} ${c.lastNameTh}`.toLowerCase().includes(searchLower);
                    const matchEmail = c.email.toLowerCase().includes(searchLower);
                    const matchPosition = c.position.toLowerCase().includes(searchLower);
                    if (!matchName && !matchEmail && !matchPosition) return false;
                }
                return true;
            });
        },

        /**
         * Toggle select all candidates
         */
        toggleSelectAll(checked) {
            const candidates = this.filterCandidates(mockCandidates);
            if (checked) {
                selectedCandidates = candidates.map(c => c.id);
            } else {
                selectedCandidates = [];
            }
            Router.refresh();
        },

        /**
         * Toggle single candidate selection
         */
        toggleCandidate(candidateId) {
            const index = selectedCandidates.indexOf(candidateId);
            if (index > -1) {
                selectedCandidates.splice(index, 1);
            } else {
                selectedCandidates.push(candidateId);
            }
            Router.refresh();
        },

        /**
         * Toggle candidate for comparison
         */
        toggleCompareCandidate(candidateId) {
            const index = selectedCandidates.indexOf(candidateId);
            if (index > -1) {
                selectedCandidates.splice(index, 1);
            } else {
                if (selectedCandidates.length < 4) {
                    selectedCandidates.push(candidateId);
                } else {
                    ToastComponent.warning(i18n.t('candidateScreening.maxCompare'));
                    return;
                }
            }
            Router.refresh();
        },

        /**
         * Bulk action on selected candidates
         */
        async bulkAction(action) {
            if (selectedCandidates.length === 0) {
                ToastComponent.warning(i18n.t('candidateScreening.noSelection'));
                return;
            }

            switch (action) {
                case 'shortlist':
                    ToastComponent.success(i18n.t('candidateScreening.shortlistSuccess').replace('{count}', selectedCandidates.length));
                    break;
                case 'reject':
                    const confirmed = await ModalComponent.confirm({
                        title: i18n.t('candidateScreening.confirmReject'),
                        message: i18n.t('candidateScreening.confirmRejectMessage').replace('{count}', selectedCandidates.length),
                        confirmText: i18n.t('candidateScreening.reject'),
                        icon: 'warning'
                    });
                    if (confirmed) {
                        ToastComponent.success(i18n.t('candidateScreening.rejectSuccess').replace('{count}', selectedCandidates.length));
                    }
                    break;
                case 'schedule_interview':
                    this.openScheduleModal(selectedCandidates);
                    break;
            }

            selectedCandidates = [];
            Router.refresh();
        },

        /**
         * View candidate details
         */
        viewCandidateDetails(candidateId) {
            const candidate = mockCandidates.find(c => c.id === candidateId);
            if (!candidate) return;

            const isThai = i18n.isThai();
            const name = isThai ? `${candidate.firstNameTh} ${candidate.lastNameTh}` : `${candidate.firstName} ${candidate.lastName}`;

            ModalComponent.open({
                title: name,
                size: 'lg',
                content: `
                    <div class="space-y-6">
                        <!-- Contact Info -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('candidateScreening.email')}</p>
                                <p class="font-medium">${candidate.email}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('candidateScreening.phone')}</p>
                                <p class="font-medium">${candidate.phone}</p>
                            </div>
                        </div>

                        <!-- Position & Experience -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('candidateScreening.position')}</p>
                                <p class="font-medium">${candidate.position}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('candidateScreening.experience')}</p>
                                <p class="font-medium">${candidate.experience} ${i18n.t('employment.years')}</p>
                            </div>
                        </div>

                        <!-- Education -->
                        <div>
                            <p class="text-sm text-gray-500">${i18n.t('candidateScreening.education')}</p>
                            <p class="font-medium">${candidate.education}</p>
                        </div>

                        <!-- Skills -->
                        <div>
                            <p class="text-sm text-gray-500 mb-2">${i18n.t('candidateScreening.skills')}</p>
                            <div class="flex flex-wrap gap-2">
                                ${candidate.skills.map(s => `
                                    <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">${s}</span>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Screening Results -->
                        <div>
                            <h4 class="font-medium text-gray-900 mb-3">${i18n.t('candidateScreening.screeningResults')}</h4>
                            <div class="space-y-3">
                                ${Object.entries(candidate.screeningResult || {}).map(([key, value]) => `
                                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div class="flex items-center gap-2">
                                            <span class="material-icons text-sm ${value.match ? 'text-green-600' : 'text-red-600'}">
                                                ${value.match ? 'check_circle' : 'cancel'}
                                            </span>
                                            <span class="font-medium capitalize">${i18n.t(`candidateScreening.criteria.${key}`)}</span>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <span class="text-sm text-gray-500">${value.notes}</span>
                                            <span class="px-2 py-1 text-sm font-medium ${value.score >= 80 ? 'bg-green-100 text-green-700' : value.score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'} rounded">${value.score}%</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Salary Info -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('candidateScreening.currentSalary')}</p>
                                <p class="font-medium">${candidate.currentSalary.toLocaleString()} THB</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('candidateScreening.expectedSalary')}</p>
                                <p class="font-medium">${candidate.expectedSalary.toLocaleString()} THB</p>
                            </div>
                        </div>
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('candidateScreening.scheduleInterview'), primary: true, onclick: `CandidateScreeningPage.scheduleInterview('${candidateId}'); ModalComponent.close();` }
                ]
            });
        },

        /**
         * Schedule interview modal
         */
        scheduleInterview(candidateId) {
            const candidate = mockCandidates.find(c => c.id === candidateId);
            if (!candidate) return;

            const isThai = i18n.isThai();
            const name = isThai ? `${candidate.firstNameTh} ${candidate.lastNameTh}` : `${candidate.firstName} ${candidate.lastName}`;

            ModalComponent.open({
                title: i18n.t('candidateScreening.scheduleInterview'),
                size: 'lg',
                content: `
                    <form id="schedule-interview-form" class="space-y-4">
                        <input type="hidden" name="candidateId" value="${candidateId}">

                        <div class="p-4 bg-gray-50 rounded-lg mb-4">
                            <p class="text-sm text-gray-500">${i18n.t('candidateScreening.candidate')}</p>
                            <p class="font-medium">${name}</p>
                            <p class="text-sm text-gray-500">${candidate.position}</p>
                        </div>

                        ${FormFieldComponent.select({
                            name: 'interviewType',
                            label: i18n.t('candidateScreening.interviewType.label'),
                            required: true,
                            options: [
                                { value: 'technical', label: i18n.t('candidateScreening.interviewType.technical') },
                                { value: 'hr', label: i18n.t('candidateScreening.interviewType.hr') },
                                { value: 'manager', label: i18n.t('candidateScreening.interviewType.manager') },
                                { value: 'final', label: i18n.t('candidateScreening.interviewType.final') }
                            ]
                        })}

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${FormFieldComponent.date({
                                name: 'interviewDate',
                                label: i18n.t('candidateScreening.interviewDate'),
                                required: true,
                                min: DateUtils.today()
                            })}

                            ${FormFieldComponent.text({
                                name: 'interviewTime',
                                label: i18n.t('candidateScreening.interviewTime'),
                                type: 'time',
                                required: true
                            })}
                        </div>

                        ${FormFieldComponent.number({
                            name: 'duration',
                            label: i18n.t('candidateScreening.duration'),
                            value: 60,
                            min: 15,
                            max: 180,
                            step: 15,
                            hint: i18n.t('candidateScreening.durationHint')
                        })}

                        ${FormFieldComponent.select({
                            name: 'room',
                            label: i18n.t('candidateScreening.room'),
                            required: true,
                            options: mockRooms.map(r => ({
                                value: r.id,
                                label: `${r.name} (${r.floor}, ${i18n.t('candidateScreening.capacity')}: ${r.capacity})`
                            }))
                        })}

                        ${FormFieldComponent.textarea({
                            name: 'panelists',
                            label: i18n.t('candidateScreening.panelists'),
                            rows: 2,
                            hint: i18n.t('candidateScreening.panelistsHint')
                        })}

                        ${FormFieldComponent.textarea({
                            name: 'notes',
                            label: i18n.t('candidateScreening.notes'),
                            rows: 2
                        })}

                        ${FormFieldComponent.checkbox({
                            name: 'sendNotification',
                            label: i18n.t('candidateScreening.sendNotificationToCandidate'),
                            checked: true
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('candidateScreening.schedule'), primary: true, onclick: 'CandidateScreeningPage.saveInterview()' }
                ]
            });
        },

        /**
         * Save interview
         */
        async saveInterview() {
            const formData = FormFieldComponent.getFormData('schedule-interview-form');

            const validation = ValidationUtils.validateForm(formData, {
                interviewType: { required: true },
                interviewDate: { required: true },
                interviewTime: { required: true },
                room: { required: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                ToastComponent.error(i18n.t('error.validationFailed'));
                return;
            }

            // Simulate saving
            ToastComponent.success(i18n.t('candidateScreening.interviewScheduled'));
            ModalComponent.close();
            Router.refresh();
        },

        /**
         * Open evaluation form
         */
        openEvaluationForm(candidateId) {
            const candidate = mockCandidates.find(c => c.id === candidateId);
            if (!candidate) return;

            const isThai = i18n.isThai();
            const name = isThai ? `${candidate.firstNameTh} ${candidate.lastNameTh}` : `${candidate.firstName} ${candidate.lastName}`;

            ModalComponent.open({
                title: i18n.t('candidateScreening.evaluateCandidate'),
                size: 'lg',
                content: `
                    <form id="evaluation-form" class="space-y-4">
                        <input type="hidden" name="candidateId" value="${candidateId}">

                        <div class="p-4 bg-gray-50 rounded-lg mb-4">
                            <p class="font-medium">${name}</p>
                            <p class="text-sm text-gray-500">${candidate.position}</p>
                        </div>

                        <!-- Rating Fields -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${this.renderRatingField('technicalSkills', i18n.t('candidateScreening.competency.technical'))}
                            ${this.renderRatingField('communication', i18n.t('candidateScreening.competency.communication'))}
                            ${this.renderRatingField('problemSolving', i18n.t('candidateScreening.competency.problemSolving'))}
                            ${this.renderRatingField('cultureFit', i18n.t('candidateScreening.competency.cultureFit'))}
                        </div>

                        ${FormFieldComponent.select({
                            name: 'recommendation',
                            label: i18n.t('candidateScreening.recommendation.label'),
                            required: true,
                            options: [
                                { value: 'hire', label: i18n.t('candidateScreening.recommendation.hire') },
                                { value: 'hold', label: i18n.t('candidateScreening.recommendation.hold') },
                                { value: 'no_hire', label: i18n.t('candidateScreening.recommendation.no_hire') }
                            ]
                        })}

                        ${FormFieldComponent.textarea({
                            name: 'notes',
                            label: i18n.t('candidateScreening.evaluationNotes'),
                            rows: 4,
                            required: true
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'CandidateScreeningPage.saveEvaluation()' }
                ]
            });
        },

        /**
         * Render rating field
         */
        renderRatingField(name, label) {
            return `
                <div class="form-group">
                    <label class="block text-sm font-medium text-gray-700 mb-2">${label}</label>
                    <div class="flex gap-2">
                        ${[1, 2, 3, 4, 5].map(n => `
                            <label class="flex-1">
                                <input type="radio" name="${name}" value="${n}" class="sr-only peer">
                                <div class="p-2 text-center border rounded cursor-pointer peer-checked:bg-cg-red peer-checked:text-white peer-checked:border-cg-red hover:border-cg-red transition">
                                    ${n}
                                </div>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Save evaluation
         */
        async saveEvaluation() {
            const formData = FormFieldComponent.getFormData('evaluation-form');

            const validation = ValidationUtils.validateForm(formData, {
                recommendation: { required: true },
                notes: { required: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                ToastComponent.error(i18n.t('error.validationFailed'));
                return;
            }

            ToastComponent.success(i18n.t('candidateScreening.evaluationSaved'));
            ModalComponent.close();
            Router.refresh();
        },

        /**
         * Create offer modal
         */
        createOffer(candidateId) {
            const candidates = candidateId
                ? mockCandidates.filter(c => c.id === candidateId)
                : mockCandidates.filter(c => c.status === 'evaluated' && c.interviews?.some(i => i.evaluation?.recommendation === 'hire'));

            if (candidates.length === 0) {
                ToastComponent.warning(i18n.t('candidateScreening.noEligibleCandidates'));
                return;
            }

            ModalComponent.open({
                title: i18n.t('candidateScreening.createOffer'),
                size: 'lg',
                content: `
                    <form id="offer-form" class="space-y-4">
                        ${FormFieldComponent.select({
                            name: 'candidateId',
                            label: i18n.t('candidateScreening.candidate'),
                            required: true,
                            value: candidateId || '',
                            options: candidates.map(c => ({
                                value: c.id,
                                label: i18n.isThai() ? `${c.firstNameTh} ${c.lastNameTh}` : `${c.firstName} ${c.lastName}`
                            }))
                        })}

                        ${FormFieldComponent.number({
                            name: 'salary',
                            label: i18n.t('candidateScreening.offeredSalary'),
                            required: true,
                            min: 0,
                            step: 1000,
                            hint: 'THB'
                        })}

                        ${FormFieldComponent.date({
                            name: 'startDate',
                            label: i18n.t('candidateScreening.startDate'),
                            required: true,
                            min: DateUtils.today()
                        })}

                        ${FormFieldComponent.date({
                            name: 'expiryDate',
                            label: i18n.t('candidateScreening.offerExpiryDate'),
                            required: true,
                            min: DateUtils.today()
                        })}

                        ${FormFieldComponent.textarea({
                            name: 'benefits',
                            label: i18n.t('candidateScreening.benefits'),
                            rows: 3,
                            hint: i18n.t('candidateScreening.benefitsHint')
                        })}

                        ${FormFieldComponent.textarea({
                            name: 'notes',
                            label: i18n.t('candidateScreening.notes'),
                            rows: 2
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('candidateScreening.createOffer'), primary: true, onclick: 'CandidateScreeningPage.saveOffer()' }
                ]
            });
        },

        /**
         * Save offer
         */
        async saveOffer() {
            const formData = FormFieldComponent.getFormData('offer-form');

            const validation = ValidationUtils.validateForm(formData, {
                candidateId: { required: true },
                salary: { required: true },
                startDate: { required: true },
                expiryDate: { required: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                ToastComponent.error(i18n.t('error.validationFailed'));
                return;
            }

            ToastComponent.success(i18n.t('candidateScreening.offerCreated'));
            ModalComponent.close();
            Router.refresh();
        },

        /**
         * Get scheduled interviews
         */
        getScheduledInterviews() {
            return [
                {
                    id: 'INT-002',
                    candidateId: 'CAND-002',
                    type: 'technical',
                    date: '2026-01-15',
                    time: '14:00',
                    duration: 60,
                    room: 'Meeting Room B',
                    status: 'scheduled',
                    panelists: ['Mike Chen', 'Lisa Wong']
                },
                {
                    id: 'INT-003',
                    candidateId: 'CAND-001',
                    type: 'hr',
                    date: '2026-01-16',
                    time: '10:00',
                    duration: 45,
                    room: 'Interview Room 1',
                    status: 'scheduled',
                    panelists: ['Sarah Brown']
                }
            ];
        },

        /**
         * Helper: Convert snake_case to camelCase
         */
        camelCase(str) {
            return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        },

        /**
         * Open schedule modal for bulk scheduling
         */
        openScheduleModal(candidateIds) {
            if (Array.isArray(candidateIds) && candidateIds.length > 0) {
                ToastComponent.info(i18n.t('candidateScreening.bulkScheduleInfo').replace('{count}', candidateIds.length));
            }
            this.scheduleInterview(Array.isArray(candidateIds) ? candidateIds[0] : candidateIds);
        },

        /**
         * View full evaluation
         */
        viewFullEvaluation(candidateId) {
            this.viewCandidateDetails(candidateId);
        },

        /**
         * Edit interview
         */
        editInterview(interviewId) {
            ToastComponent.info(i18n.t('candidateScreening.editInterviewInfo'));
        },

        /**
         * Send interview notification
         */
        sendInterviewNotification(interviewId) {
            ToastComponent.success(i18n.t('candidateScreening.notificationSent'));
        },

        /**
         * Add panel vote
         */
        addPanelVote(candidateId) {
            ToastComponent.info(i18n.t('candidateScreening.voteRecorded'));
        },

        /**
         * View offer details
         */
        viewOfferDetails(candidateId) {
            const candidate = mockCandidates.find(c => c.id === candidateId);
            if (!candidate || !candidate.offer) return;

            const offer = candidate.offer;
            const isThai = i18n.isThai();
            const name = isThai ? `${candidate.firstNameTh} ${candidate.lastNameTh}` : `${candidate.firstName} ${candidate.lastName}`;

            ModalComponent.open({
                title: i18n.t('candidateScreening.offerDetails'),
                size: 'lg',
                content: `
                    <div class="space-y-4">
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <p class="font-medium text-lg">${name}</p>
                            <p class="text-gray-500">${offer.position}</p>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('candidateScreening.offeredSalary')}</p>
                                <p class="text-lg font-semibold">${offer.salary.toLocaleString()} THB</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('candidateScreening.startDate')}</p>
                                <p class="font-medium">${DateUtils.format(offer.startDate, 'long')}</p>
                            </div>
                        </div>

                        <div>
                            <p class="text-sm text-gray-500 mb-2">${i18n.t('candidateScreening.benefits')}</p>
                            <div class="flex flex-wrap gap-2">
                                ${(offer.benefits || []).map(b => `
                                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">${b}</span>
                                `).join('')}
                            </div>
                        </div>

                        <div>
                            <p class="text-sm text-gray-500 mb-2">${i18n.t('candidateScreening.approvalChain')}</p>
                            <div class="space-y-2">
                                ${(offer.approvals || []).map(a => `
                                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div class="flex items-center gap-2">
                                            <span class="material-icons text-sm ${a.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}">
                                                ${a.status === 'approved' ? 'check_circle' : 'pending'}
                                            </span>
                                            <span>${a.step}</span>
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            ${a.approver ? `${a.approver} - ${DateUtils.format(a.date, 'medium')}` : i18n.t('workflow.pending')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), onclick: 'ModalComponent.close()' }
                ]
            });
        },

        /**
         * Download offer letter
         */
        downloadOfferLetter(candidateId) {
            ToastComponent.success(i18n.t('toast.downloadStarted'));
        },

        /**
         * Set interview view (list/calendar)
         */
        setInterviewView(view) {
            ToastComponent.info(i18n.t('candidateScreening.viewChanged').replace('{view}', view));
        },

        /**
         * Render skeleton loading state
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    ${SkeletonComponent.renderCardSkeleton({ lines: 2 })}
                    <div class="mt-6">
                        ${SkeletonComponent.renderTableSkeleton(5, 6)}
                    </div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CandidateScreeningPage;
}
