/**
 * Recruitment Page
 * Job postings, internal job board, application form, and application tracking
 */

const RecruitmentPage = (function() {
    let currentTab = 'jobs';
    let currentFilters = {
        location: '',
        department: '',
        jobFamily: '',
        search: ''
    };
    let selectedJob = null;

    return {
        /**
         * Render the recruitment page
         * @returns {string}
         */
        render() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <!-- Page Header -->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('recruitment.title')}</h1>
                        <p class="text-gray-500 mt-1">${i18n.t('recruitment.subtitle')}</p>
                    </div>

                    <!-- Tabs -->
                    <div class="mb-6">
                        <nav class="flex space-x-4 border-b border-gray-200" role="tablist" aria-label="${i18n.t('recruitment.title')}">
                            ${this.renderTab('jobs', 'work', i18n.t('recruitment.jobBoard'))}
                            ${this.renderTab('applications', 'assignment', i18n.t('recruitment.myApplications'))}
                            ${RBAC.hasPermission('manage_recruitment') ? this.renderTab('manage', 'admin_panel_settings', i18n.t('recruitment.manage')) : ''}
                        </nav>
                    </div>

                    <!-- Tab Content -->
                    <div id="recruitment-content" role="tabpanel">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Render a single tab
         * @param {string} tabId
         * @param {string} icon
         * @param {string} label
         * @returns {string}
         */
        renderTab(tabId, icon, label) {
            const isActive = currentTab === tabId;
            return `
                <button
                    id="tab-${tabId}"
                    role="tab"
                    aria-selected="${isActive}"
                    aria-controls="panel-${tabId}"
                    class="flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                           ${isActive
                               ? 'border-cg-red text-cg-red'
                               : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                    onclick="RecruitmentPage.switchTab('${tabId}')">
                    <span class="material-icons text-lg">${icon}</span>
                    ${label}
                </button>
            `;
        },

        /**
         * Switch between tabs
         * @param {string} tabId
         */
        switchTab(tabId) {
            currentTab = tabId;
            selectedJob = null;
            const contentEl = document.getElementById('recruitment-content');
            if (contentEl) {
                contentEl.innerHTML = this.renderTabContent();
                this.init();
            }
            // Update tab styling
            document.querySelectorAll('[role="tab"]').forEach(tab => {
                const isActive = tab.id === `tab-${tabId}`;
                tab.setAttribute('aria-selected', isActive);
                tab.className = `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
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
                case 'jobs':
                    return this.renderJobBoard();
                case 'applications':
                    return this.renderMyApplications();
                case 'manage':
                    return this.renderManageRecruitment();
                default:
                    return this.renderJobBoard();
            }
        },

        /**
         * Initialize page
         */
        init() {
            // Add event listeners for filters
            const searchInput = document.getElementById('job-search');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    currentFilters.search = e.target.value;
                    this.filterJobs();
                });
            }
        },

        /**
         * Render Job Board (Internal)
         * @returns {string}
         */
        renderJobBoard() {
            const jobs = MockRecruitmentData.jobPostings.filter(job =>
                job.status === 'open' && job.isInternal
            );

            return `
                <div class="space-y-6">
                    <!-- Filters -->
                    ${this.renderFilters()}

                    <!-- Job Listings -->
                    <div id="job-listings" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        ${this.renderJobCards(jobs)}
                    </div>

                    <!-- Empty State -->
                    ${jobs.length === 0 ? `
                        <div class="text-center py-12">
                            <span class="material-icons text-5xl text-gray-300">work_off</span>
                            <p class="mt-4 text-gray-500">${i18n.t('recruitment.noOpenPositions')}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render filters section
         * @returns {string}
         */
        renderFilters() {
            const locations = MockRecruitmentData.locations;
            const departments = MockRecruitmentData.departments;
            const jobFamilies = MockRecruitmentData.jobFamilies;
            const isThai = i18n.isThai();

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <!-- Search -->
                        <div class="md:col-span-2">
                            <label for="job-search" class="block text-sm font-medium text-gray-700 mb-1">
                                ${i18n.t('common.search')}
                            </label>
                            <div class="relative">
                                <span class="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-gray-400 text-lg">search</span>
                                <input
                                    type="text"
                                    id="job-search"
                                    placeholder="${i18n.t('recruitment.searchPlaceholder')}"
                                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red"
                                    value="${currentFilters.search}"
                                >
                            </div>
                        </div>

                        <!-- Location Filter -->
                        <div>
                            <label for="filter-location" class="block text-sm font-medium text-gray-700 mb-1">
                                ${i18n.t('recruitment.location')}
                            </label>
                            <select
                                id="filter-location"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red"
                                onchange="RecruitmentPage.setFilter('location', this.value)">
                                <option value="">${i18n.t('common.all')}</option>
                                ${locations.map(loc => `
                                    <option value="${loc.value}" ${currentFilters.location === loc.value ? 'selected' : ''}>
                                        ${isThai ? loc.labelTh : loc.labelEn}
                                    </option>
                                `).join('')}
                            </select>
                        </div>

                        <!-- Department Filter -->
                        <div>
                            <label for="filter-department" class="block text-sm font-medium text-gray-700 mb-1">
                                ${i18n.t('recruitment.department')}
                            </label>
                            <select
                                id="filter-department"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red"
                                onchange="RecruitmentPage.setFilter('department', this.value)">
                                <option value="">${i18n.t('common.all')}</option>
                                ${departments.map(dept => `
                                    <option value="${dept.value}" ${currentFilters.department === dept.value ? 'selected' : ''}>
                                        ${isThai ? dept.labelTh : dept.labelEn}
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Set filter value and refresh job listings
         * @param {string} filterName
         * @param {string} value
         */
        setFilter(filterName, value) {
            currentFilters[filterName] = value;
            this.filterJobs();
        },

        /**
         * Filter jobs based on current filters
         */
        filterJobs() {
            const jobs = MockRecruitmentData.jobPostings.filter(job => {
                if (job.status !== 'open' || !job.isInternal) return false;

                // Search filter
                if (currentFilters.search) {
                    const search = currentFilters.search.toLowerCase();
                    const matchesSearch =
                        job.positionTitle.toLowerCase().includes(search) ||
                        job.positionTitleTh.toLowerCase().includes(search) ||
                        job.department.toLowerCase().includes(search) ||
                        job.departmentTh.toLowerCase().includes(search);
                    if (!matchesSearch) return false;
                }

                // Location filter
                if (currentFilters.location && job.location !== currentFilters.location) {
                    return false;
                }

                // Department filter
                if (currentFilters.department && job.department !== currentFilters.department) {
                    return false;
                }

                // Job family filter
                if (currentFilters.jobFamily && job.jobFamily !== currentFilters.jobFamily) {
                    return false;
                }

                return true;
            });

            const listingsEl = document.getElementById('job-listings');
            if (listingsEl) {
                listingsEl.innerHTML = this.renderJobCards(jobs);
            }
        },

        /**
         * Render job cards
         * @param {Array} jobs
         * @returns {string}
         */
        renderJobCards(jobs) {
            if (jobs.length === 0) {
                return `
                    <div class="col-span-2 text-center py-12">
                        <span class="material-icons text-5xl text-gray-300">search_off</span>
                        <p class="mt-4 text-gray-500">${i18n.t('common.noResults')}</p>
                    </div>
                `;
            }

            const isThai = i18n.isThai();

            return jobs.map(job => {
                const daysRemaining = Math.ceil((new Date(job.closingDate) - new Date()) / (1000 * 60 * 60 * 24));
                const isUrgent = daysRemaining <= 7 && daysRemaining > 0;

                return `
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <h3 class="font-semibold text-gray-900 text-lg">
                                    ${isThai ? job.positionTitleTh : job.positionTitle}
                                </h3>
                                <p class="text-sm text-gray-600">${job.company}</p>
                            </div>
                            ${isUrgent ? `
                                <span class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                    ${i18n.t('recruitment.urgent')}
                                </span>
                            ` : ''}
                        </div>

                        <div class="space-y-2 mb-4">
                            <div class="flex items-center gap-2 text-sm text-gray-500">
                                <span class="material-icons text-base">location_on</span>
                                ${isThai ? job.locationTh : job.location}
                            </div>
                            <div class="flex items-center gap-2 text-sm text-gray-500">
                                <span class="material-icons text-base">business</span>
                                ${isThai ? job.departmentTh : job.department}
                            </div>
                            <div class="flex items-center gap-2 text-sm text-gray-500">
                                <span class="material-icons text-base">category</span>
                                ${isThai ? job.jobFamilyTh : job.jobFamily}
                            </div>
                            <div class="flex items-center gap-2 text-sm text-gray-500">
                                <span class="material-icons text-base">event</span>
                                ${i18n.t('recruitment.closingDate')}: ${DateUtils.format(job.closingDate, 'medium')}
                            </div>
                        </div>

                        <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span class="text-sm text-gray-500">
                                ${job.headcount - job.filledCount} ${i18n.t('recruitment.openings')}
                            </span>
                            <button
                                class="px-4 py-2 bg-cg-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cg-red/50"
                                onclick="RecruitmentPage.viewJobDetails('${job.id}')">
                                ${i18n.t('recruitment.viewDetails')}
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        },

        /**
         * View job details
         * @param {string} jobId
         */
        viewJobDetails(jobId) {
            const job = MockRecruitmentData.jobPostings.find(j => j.id === jobId);
            if (!job) return;

            selectedJob = job;
            const isThai = i18n.isThai();

            ModalComponent.open({
                title: isThai ? job.positionTitleTh : job.positionTitle,
                size: 'lg',
                content: `
                    <div class="space-y-6">
                        <!-- Job Info -->
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span class="text-gray-500">${i18n.t('recruitment.company')}:</span>
                                <span class="ml-2 text-gray-900">${job.company}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">${i18n.t('recruitment.location')}:</span>
                                <span class="ml-2 text-gray-900">${isThai ? job.locationTh : job.location}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">${i18n.t('recruitment.department')}:</span>
                                <span class="ml-2 text-gray-900">${isThai ? job.departmentTh : job.department}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">${i18n.t('recruitment.employmentType')}:</span>
                                <span class="ml-2 text-gray-900">${this.getEmploymentTypeLabel(job.employmentType)}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">${i18n.t('recruitment.salaryRange')}:</span>
                                <span class="ml-2 text-gray-900">${job.salaryRangeMin.toLocaleString()} - ${job.salaryRangeMax.toLocaleString()} ${job.currency}</span>
                            </div>
                            <div>
                                <span class="text-gray-500">${i18n.t('recruitment.closingDate')}:</span>
                                <span class="ml-2 text-gray-900">${DateUtils.format(job.closingDate, 'long')}</span>
                            </div>
                        </div>

                        <!-- Description -->
                        <div>
                            <h4 class="font-medium text-gray-900 mb-2">${i18n.t('recruitment.jobDescription')}</h4>
                            <p class="text-gray-600 text-sm">${isThai ? job.descriptionTh : job.description}</p>
                        </div>

                        <!-- Requirements -->
                        <div>
                            <h4 class="font-medium text-gray-900 mb-2">${i18n.t('recruitment.requirements')}</h4>
                            <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                                ${(isThai ? job.requirementsTh : job.requirements).map(req => `
                                    <li>${req}</li>
                                `).join('')}
                            </ul>
                        </div>

                        <!-- Benefits -->
                        ${(job.benefits && job.benefits.length > 0) ? `
                            <div>
                                <h4 class="font-medium text-gray-900 mb-2">${i18n.t('recruitment.benefits')}</h4>
                                <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                                    ${(isThai ? job.benefitsTh : job.benefits).map(benefit => `
                                        <li>${benefit}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}

                        <!-- JD Attachment -->
                        ${job.jdAttachment ? `
                            <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <span class="material-icons text-gray-500">description</span>
                                <span class="text-sm text-gray-700">${i18n.t('recruitment.jdAttachment')}</span>
                                <a href="${job.jdAttachment}"
                                   class="ml-auto text-sm text-cg-red hover:text-red-700 flex items-center gap-1"
                                   download>
                                    <span class="material-icons text-base">download</span>
                                    ${i18n.t('common.download')}
                                </a>
                            </div>
                        ` : ''}
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('recruitment.apply'), primary: true, onclick: `RecruitmentPage.openApplicationForm('${job.id}')` }
                ]
            });
        },

        /**
         * Get employment type label
         * @param {string} type
         * @returns {string}
         */
        getEmploymentTypeLabel(type) {
            const empType = MockRecruitmentData.employmentTypes.find(t => t.value === type);
            if (!empType) return type;
            return i18n.isThai() ? empType.labelTh : empType.labelEn;
        },

        /**
         * Open application form
         * @param {string} jobId
         */
        openApplicationForm(jobId) {
            const job = MockRecruitmentData.jobPostings.find(j => j.id === jobId);
            if (!job) return;

            // Close the details modal first
            ModalComponent.close();

            // Open application form modal after a short delay
            setTimeout(() => {
                const isThai = i18n.isThai();
                const currentUser = AppState.get('currentUser');
                const employee = AppState.get('currentEmployee');

                ModalComponent.open({
                    title: i18n.t('recruitment.applicationForm'),
                    size: 'lg',
                    content: `
                        <form id="application-form" class="space-y-6">
                            <input type="hidden" name="jobId" value="${jobId}">

                            <!-- Position Info -->
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <p class="text-sm text-gray-500">${i18n.t('recruitment.applyingFor')}</p>
                                <p class="font-medium text-gray-900">${isThai ? job.positionTitleTh : job.positionTitle}</p>
                                <p class="text-sm text-gray-600">${job.company} - ${isThai ? job.locationTh : job.location}</p>
                            </div>

                            <!-- Personal Information -->
                            <div>
                                <h4 class="font-medium text-gray-900 mb-4 flex items-center gap-2">
                                    <span class="material-icons text-lg">person</span>
                                    ${i18n.t('recruitment.personalInfo')}
                                </h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    ${FormFieldComponent.text({
                                        name: 'firstName',
                                        label: i18n.t('personal.firstName'),
                                        value: employee?.personalInfo?.firstNameEn || '',
                                        required: true
                                    })}
                                    ${FormFieldComponent.text({
                                        name: 'lastName',
                                        label: i18n.t('personal.lastName'),
                                        value: employee?.personalInfo?.lastNameEn || '',
                                        required: true
                                    })}
                                    ${FormFieldComponent.text({
                                        name: 'email',
                                        label: i18n.t('personal.personalEmail'),
                                        type: 'email',
                                        value: employee?.contactInfo?.personalEmail || '',
                                        required: true
                                    })}
                                    ${FormFieldComponent.text({
                                        name: 'phone',
                                        label: i18n.t('personal.personalMobile'),
                                        type: 'tel',
                                        value: employee?.contactInfo?.personalMobile || '',
                                        required: true
                                    })}
                                </div>
                            </div>

                            <!-- Education -->
                            <div>
                                <h4 class="font-medium text-gray-900 mb-4 flex items-center gap-2">
                                    <span class="material-icons text-lg">school</span>
                                    ${i18n.t('recruitment.education')}
                                </h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    ${FormFieldComponent.select({
                                        name: 'degree',
                                        label: i18n.t('profileDetails.degree'),
                                        required: true,
                                        placeholder: i18n.t('common.select'),
                                        options: MockLookupData.degrees.map(d => ({
                                            value: d.value,
                                            label: isThai ? d.labelTh : d.labelEn
                                        }))
                                    })}
                                    ${FormFieldComponent.text({
                                        name: 'institution',
                                        label: i18n.t('profileDetails.institution'),
                                        required: true
                                    })}
                                    ${FormFieldComponent.text({
                                        name: 'major',
                                        label: i18n.t('profileDetails.major'),
                                        required: true
                                    })}
                                    ${FormFieldComponent.number({
                                        name: 'graduationYear',
                                        label: i18n.t('profileDetails.graduationYear'),
                                        min: 1970,
                                        max: new Date().getFullYear() + 5,
                                        required: true
                                    })}
                                </div>
                            </div>

                            <!-- Work Experience -->
                            <div>
                                <h4 class="font-medium text-gray-900 mb-4 flex items-center gap-2">
                                    <span class="material-icons text-lg">work</span>
                                    ${i18n.t('recruitment.workExperience')}
                                </h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    ${FormFieldComponent.text({
                                        name: 'currentCompany',
                                        label: i18n.t('profileDetails.companyName'),
                                        value: ''
                                    })}
                                    ${FormFieldComponent.text({
                                        name: 'currentPosition',
                                        label: i18n.t('employment.position'),
                                        value: ''
                                    })}
                                    ${FormFieldComponent.number({
                                        name: 'yearsOfExperience',
                                        label: i18n.t('recruitment.yearsOfExperience'),
                                        min: 0,
                                        max: 50
                                    })}
                                </div>
                            </div>

                            <!-- Documents -->
                            <div>
                                <h4 class="font-medium text-gray-900 mb-4 flex items-center gap-2">
                                    <span class="material-icons text-lg">attach_file</span>
                                    ${i18n.t('recruitment.documents')}
                                </h4>
                                <div class="space-y-4">
                                    ${FormFieldComponent.file({
                                        name: 'cvFile',
                                        label: i18n.t('recruitment.cvResume'),
                                        required: true,
                                        accept: '.pdf,.doc,.docx',
                                        hint: isThai ? 'รองรับ PDF, DOC, DOCX (ไม่เกิน 5MB)' : 'Accepts PDF, DOC, DOCX (max 5MB)'
                                    })}
                                    ${FormFieldComponent.textarea({
                                        name: 'coverLetter',
                                        label: i18n.t('recruitment.coverLetter'),
                                        rows: 4,
                                        placeholder: isThai ? 'เขียนจดหมายสมัครงานของคุณที่นี่...' : 'Write your cover letter here...'
                                    })}
                                </div>
                            </div>
                        </form>
                    `,
                    actions: [
                        { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                        { label: i18n.t('recruitment.submitApplication'), primary: true, onclick: 'RecruitmentPage.submitApplication()' }
                    ]
                });
            }, 300);
        },

        /**
         * Submit application
         */
        async submitApplication() {
            const formData = FormFieldComponent.getFormData('application-form');

            // Validate required fields
            const validation = ValidationUtils.validateForm(formData, {
                firstName: { required: true, minLength: 2 },
                lastName: { required: true, minLength: 2 },
                email: { required: true, email: true },
                phone: { required: true },
                degree: { required: true },
                institution: { required: true },
                major: { required: true },
                graduationYear: { required: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                ToastComponent.error(i18n.t('error.validationFailed'));
                return;
            }

            // Check for CV file
            const cvInput = document.querySelector('input[name="cvFile"]');
            if (!cvInput || !cvInput.files || cvInput.files.length === 0) {
                ToastComponent.error(i18n.t('recruitment.cvRequired'));
                return;
            }

            try {
                // Simulate API call
                AppState.setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));

                ToastComponent.success(i18n.t('recruitment.applicationSubmitted'));
                ModalComponent.close();

                // Refresh applications tab
                if (currentTab === 'applications') {
                    this.switchTab('applications');
                }
            } catch (error) {
                ToastComponent.error(i18n.t('error.saveFailed'));
            } finally {
                AppState.setLoading(false);
            }
        },

        /**
         * Render My Applications
         * @returns {string}
         */
        renderMyApplications() {
            const currentUser = AppState.get('currentUser');
            // For demo purposes, show some applications
            const applications = MockRecruitmentData.applications.slice(0, 3);

            if (applications.length === 0) {
                return `
                    <div class="text-center py-12">
                        <span class="material-icons text-5xl text-gray-300">assignment</span>
                        <p class="mt-4 text-gray-500">${i18n.t('recruitment.noApplications')}</p>
                        <button
                            class="mt-4 px-6 py-2 bg-cg-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                            onclick="RecruitmentPage.switchTab('jobs')">
                            ${i18n.t('recruitment.browseJobs')}
                        </button>
                    </div>
                `;
            }

            return `
                <div class="space-y-4">
                    ${applications.map(app => this.renderApplicationCard(app)).join('')}
                </div>
            `;
        },

        /**
         * Render application card
         * @param {object} application
         * @returns {string}
         */
        renderApplicationCard(application) {
            const job = MockRecruitmentData.jobPostings.find(j => j.id === application.jobId);
            const candidate = MockRecruitmentData.candidates.find(c => c.id === application.candidateId);
            const statusConfig = MockRecruitmentData.applicationStatuses.find(s => s.value === application.status);
            const isThai = i18n.isThai();

            if (!job) return '';

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-900">
                                ${isThai ? job.positionTitleTh : job.positionTitle}
                            </h3>
                            <p class="text-sm text-gray-600">${job.company}</p>
                            <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span class="flex items-center gap-1">
                                    <span class="material-icons text-base">calendar_today</span>
                                    ${i18n.t('recruitment.appliedOn')}: ${DateUtils.format(application.appliedDate, 'medium')}
                                </span>
                            </div>
                        </div>
                        <span class="px-3 py-1 text-sm font-medium rounded-full ${statusConfig?.color || 'bg-gray-100 text-gray-800'}">
                            ${isThai ? statusConfig?.labelTh : statusConfig?.labelEn}
                        </span>
                    </div>

                    <!-- Status Timeline -->
                    <div class="mt-4 pt-4 border-t border-gray-100">
                        <button
                            class="text-sm text-cg-red hover:text-red-700 flex items-center gap-1"
                            onclick="RecruitmentPage.viewApplicationStatus('${application.id}')">
                            <span class="material-icons text-base">timeline</span>
                            ${i18n.t('recruitment.viewStatusHistory')}
                        </button>
                    </div>
                </div>
            `;
        },

        /**
         * View application status history
         * @param {string} applicationId
         */
        viewApplicationStatus(applicationId) {
            const application = MockRecruitmentData.applications.find(a => a.id === applicationId);
            if (!application) return;

            const job = MockRecruitmentData.jobPostings.find(j => j.id === application.jobId);
            const isThai = i18n.isThai();

            ModalComponent.open({
                title: i18n.t('recruitment.applicationStatus'),
                size: 'md',
                content: `
                    <div class="space-y-4">
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <p class="font-medium text-gray-900">${isThai ? job?.positionTitleTh : job?.positionTitle}</p>
                            <p class="text-sm text-gray-600">${job?.company}</p>
                        </div>

                        <!-- Timeline -->
                        <div class="relative">
                            ${application.statusHistory.map((item, index) => {
                                const statusConfig = MockRecruitmentData.applicationStatuses.find(s => s.value === item.status);
                                const isLast = index === application.statusHistory.length - 1;
                                return `
                                    <div class="flex gap-4 pb-4 ${!isLast ? 'border-l-2 border-gray-200 ml-3' : 'ml-3'}">
                                        <div class="absolute -left-0.5 w-4 h-4 rounded-full ${isLast ? 'bg-cg-red' : 'bg-gray-300'}" style="margin-top: 2px;"></div>
                                        <div class="ml-6">
                                            <p class="font-medium text-gray-900">
                                                ${isThai ? statusConfig?.labelTh : statusConfig?.labelEn}
                                            </p>
                                            <p class="text-sm text-gray-500">${DateUtils.format(item.date, 'long')}</p>
                                            ${item.notes ? `<p class="text-sm text-gray-600 mt-1">${item.notes}</p>` : ''}
                                            <p class="text-xs text-gray-400 mt-1">${i18n.t('recruitment.updatedBy')}: ${item.updatedBy}</p>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                        <!-- Interview Schedule -->
                        ${application.interviewSchedule && application.interviewSchedule.length > 0 ? `
                            <div class="mt-4 pt-4 border-t border-gray-200">
                                <h4 class="font-medium text-gray-900 mb-3">${i18n.t('recruitment.interviewSchedule')}</h4>
                                ${application.interviewSchedule.map(interview => {
                                    const interviewType = MockRecruitmentData.interviewTypes.find(t => t.value === interview.type);
                                    return `
                                        <div class="p-3 bg-blue-50 rounded-lg mb-2">
                                            <div class="flex items-center justify-between">
                                                <span class="font-medium text-gray-900">
                                                    ${isThai ? interviewType?.labelTh : interviewType?.labelEn}
                                                </span>
                                                <span class="px-2 py-0.5 text-xs rounded-full ${interview.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                                                    ${interview.status === 'completed' ? i18n.t('recruitment.completed') : i18n.t('recruitment.scheduled')}
                                                </span>
                                            </div>
                                            <p class="text-sm text-gray-600 mt-1">
                                                <span class="material-icons text-sm align-middle">event</span>
                                                ${DateUtils.format(interview.date, 'long')} ${interview.time}
                                            </p>
                                            <p class="text-sm text-gray-600">
                                                <span class="material-icons text-sm align-middle">location_on</span>
                                                ${interview.location}
                                            </p>
                                        </div>
                                    `;
                                }).join('')}
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
         * Render Manage Recruitment (HR/Recruiters)
         * @returns {string}
         */
        renderManageRecruitment() {
            const allApplications = MockRecruitmentData.applications;
            const jobPostings = MockRecruitmentData.jobPostings;
            const isThai = i18n.isThai();

            // Summary stats
            const stats = {
                totalApplications: allApplications.length,
                newApplications: allApplications.filter(a => a.status === 'new').length,
                inInterview: allApplications.filter(a => a.status === 'interview').length,
                offers: allApplications.filter(a => a.status === 'offer').length,
                openPositions: jobPostings.filter(j => j.status === 'open').length
            };

            return `
                <div class="space-y-6">
                    <!-- Summary Cards -->
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                            <p class="text-3xl font-bold text-blue-600">${stats.openPositions}</p>
                            <p class="text-sm text-gray-600">${i18n.t('recruitment.openPositions')}</p>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                            <p class="text-3xl font-bold text-gray-600">${stats.totalApplications}</p>
                            <p class="text-sm text-gray-600">${i18n.t('recruitment.totalApplications')}</p>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                            <p class="text-3xl font-bold text-yellow-600">${stats.newApplications}</p>
                            <p class="text-sm text-gray-600">${i18n.t('recruitment.newApplications')}</p>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                            <p class="text-3xl font-bold text-purple-600">${stats.inInterview}</p>
                            <p class="text-sm text-gray-600">${i18n.t('recruitment.inInterview')}</p>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                            <p class="text-3xl font-bold text-green-600">${stats.offers}</p>
                            <p class="text-sm text-gray-600">${i18n.t('recruitment.pendingOffers')}</p>
                        </div>
                    </div>

                    <!-- Applications Table -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                            <h3 class="font-medium text-gray-900">${i18n.t('recruitment.allApplications')}</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full" role="grid">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('recruitment.candidate')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('recruitment.position')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('recruitment.appliedDate')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('recruitment.source')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('recruitment.status')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('common.actions')}</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    ${allApplications.map(app => {
                                        const candidate = MockRecruitmentData.candidates.find(c => c.id === app.candidateId);
                                        const job = MockRecruitmentData.jobPostings.find(j => j.id === app.jobId);
                                        const statusConfig = MockRecruitmentData.applicationStatuses.find(s => s.value === app.status);
                                        const sourceConfig = MockRecruitmentData.applicationSources.find(s => s.value === app.source);

                                        return `
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-4 py-3">
                                                    <p class="font-medium text-gray-900">${candidate?.firstName} ${candidate?.lastName}</p>
                                                    <p class="text-sm text-gray-500">${candidate?.email}</p>
                                                </td>
                                                <td class="px-4 py-3">
                                                    <p class="text-sm text-gray-900">${isThai ? job?.positionTitleTh : job?.positionTitle}</p>
                                                    <p class="text-xs text-gray-500">${job?.company}</p>
                                                </td>
                                                <td class="px-4 py-3 text-sm text-gray-600">
                                                    ${DateUtils.format(app.appliedDate, 'medium')}
                                                </td>
                                                <td class="px-4 py-3 text-sm text-gray-600">
                                                    ${isThai ? sourceConfig?.labelTh : sourceConfig?.labelEn}
                                                </td>
                                                <td class="px-4 py-3">
                                                    <span class="px-2 py-1 text-xs font-medium rounded-full ${statusConfig?.color}">
                                                        ${isThai ? statusConfig?.labelTh : statusConfig?.labelEn}
                                                    </span>
                                                </td>
                                                <td class="px-4 py-3">
                                                    <button
                                                        class="text-cg-red hover:text-red-700 text-sm font-medium"
                                                        onclick="RecruitmentPage.viewApplicationDetails('${app.id}')">
                                                        ${i18n.t('recruitment.viewDetails')}
                                                    </button>
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * View application details (for recruiters)
         * @param {string} applicationId
         */
        viewApplicationDetails(applicationId) {
            const application = MockRecruitmentData.applications.find(a => a.id === applicationId);
            if (!application) return;

            const candidate = MockRecruitmentData.candidates.find(c => c.id === application.candidateId);
            const job = MockRecruitmentData.jobPostings.find(j => j.id === application.jobId);
            const statusConfig = MockRecruitmentData.applicationStatuses.find(s => s.value === application.status);
            const isThai = i18n.isThai();

            ModalComponent.open({
                title: i18n.t('recruitment.applicationDetails'),
                size: 'lg',
                content: `
                    <div class="space-y-6">
                        <!-- Candidate Info -->
                        <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div class="w-12 h-12 bg-cg-red rounded-full flex items-center justify-center text-white font-bold text-lg">
                                ${candidate?.firstName?.charAt(0)}${candidate?.lastName?.charAt(0)}
                            </div>
                            <div class="flex-1">
                                <h4 class="font-medium text-gray-900">${candidate?.firstName} ${candidate?.lastName}</h4>
                                <p class="text-sm text-gray-600">${candidate?.email}</p>
                                <p class="text-sm text-gray-600">${candidate?.phone}</p>
                                ${candidate?.isInternal ? `
                                    <span class="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                        <span class="material-icons text-xs">badge</span>
                                        ${i18n.t('recruitment.internalCandidate')}
                                    </span>
                                ` : ''}
                            </div>
                            <span class="px-3 py-1 text-sm font-medium rounded-full ${statusConfig?.color}">
                                ${isThai ? statusConfig?.labelTh : statusConfig?.labelEn}
                            </span>
                        </div>

                        <!-- Position Applied -->
                        <div>
                            <h4 class="font-medium text-gray-900 mb-2">${i18n.t('recruitment.positionApplied')}</h4>
                            <p class="text-gray-600">${isThai ? job?.positionTitleTh : job?.positionTitle}</p>
                            <p class="text-sm text-gray-500">${job?.company} - ${isThai ? job?.locationTh : job?.location}</p>
                        </div>

                        <!-- Experience -->
                        <div>
                            <h4 class="font-medium text-gray-900 mb-2">${i18n.t('recruitment.experience')}</h4>
                            <p class="text-gray-600">${candidate?.yearsOfExperience || 0} ${i18n.t('recruitment.yearsOfExperience')}</p>
                            ${candidate?.currentCompany ? `
                                <p class="text-sm text-gray-500">${i18n.t('recruitment.currentPosition')}: ${candidate?.currentPosition} @ ${candidate?.currentCompany}</p>
                            ` : ''}
                        </div>

                        <!-- Skills -->
                        ${candidate?.skills && candidate.skills.length > 0 ? `
                            <div>
                                <h4 class="font-medium text-gray-900 mb-2">${i18n.t('recruitment.skills')}</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${candidate.skills.map(skill => `
                                        <span class="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded">${skill}</span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Cover Letter -->
                        ${application.coverLetter ? `
                            <div>
                                <h4 class="font-medium text-gray-900 mb-2">${i18n.t('recruitment.coverLetter')}</h4>
                                <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">${application.coverLetter}</p>
                            </div>
                        ` : ''}

                        <!-- Notes -->
                        ${application.notes ? `
                            <div>
                                <h4 class="font-medium text-gray-900 mb-2">${i18n.t('recruitment.notes')}</h4>
                                <p class="text-sm text-gray-600">${application.notes}</p>
                            </div>
                        ` : ''}

                        <!-- Update Status -->
                        <div class="pt-4 border-t border-gray-200">
                            <h4 class="font-medium text-gray-900 mb-3">${i18n.t('recruitment.updateStatus')}</h4>
                            <div class="flex flex-wrap gap-2">
                                ${MockRecruitmentData.applicationStatuses.map(status => `
                                    <button
                                        class="px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors
                                               ${application.status === status.value
                                                   ? 'bg-cg-red text-white border-cg-red'
                                                   : 'bg-white text-gray-700 border-gray-300 hover:border-cg-red hover:text-cg-red'}"
                                        onclick="RecruitmentPage.updateApplicationStatus('${application.id}', '${status.value}')"
                                        ${application.status === status.value ? 'disabled' : ''}>
                                        ${isThai ? status.labelTh : status.labelEn}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), onclick: 'ModalComponent.close()' },
                    {
                        label: i18n.t('recruitment.downloadCV'),
                        onclick: `window.open('${application.cvAttachment}', '_blank')`
                    }
                ]
            });
        },

        /**
         * Update application status
         * @param {string} applicationId
         * @param {string} newStatus
         */
        async updateApplicationStatus(applicationId, newStatus) {
            try {
                AppState.setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));

                // Update in mock data
                const application = MockRecruitmentData.applications.find(a => a.id === applicationId);
                if (application) {
                    application.status = newStatus;
                    application.statusHistory.push({
                        status: newStatus,
                        date: new Date().toISOString().split('T')[0],
                        updatedBy: AppState.get('currentUser')?.name || 'HR',
                        notes: ''
                    });
                }

                ToastComponent.success(i18n.t('recruitment.statusUpdated'));
                ModalComponent.close();

                // Refresh the manage tab
                const contentEl = document.getElementById('recruitment-content');
                if (contentEl) {
                    contentEl.innerHTML = this.renderManageRecruitment();
                }
            } catch (error) {
                ToastComponent.error(i18n.t('error.saveFailed'));
            } finally {
                AppState.setLoading(false);
            }
        },

        /**
         * Render skeleton loading state
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div class="space-y-6">
                        ${SkeletonComponent.renderCardSkeleton({ lines: 3 })}
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            ${SkeletonComponent.renderCardSkeleton({ lines: 4 })}
                            ${SkeletonComponent.renderCardSkeleton({ lines: 4 })}
                        </div>
                    </div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecruitmentPage;
}
