/**
 * Learning Page
 * Training catalog, enrollment, roadmap, and calendar
 */

const LearningPage = (function() {
    // Current state
    let currentTab = 'catalog';
    let filters = {
        category: '',
        level: '',
        deliveryMethod: '',
        search: ''
    };
    let selectedCourse = null;
    let calendarMonth = new Date().getMonth();
    let calendarYear = new Date().getFullYear();

    return {
        /**
         * Render learning page
         * @returns {string}
         */
        render() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <!-- Page Header -->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900" id="page-title">
                            ${i18n.t('learning.title')}
                        </h1>
                        <p class="text-sm text-gray-500 mt-1">
                            ${i18n.t('learning.subtitle')}
                        </p>
                    </div>

                    <!-- Quick Stats -->
                    ${this.renderQuickStats()}

                    <!-- Tab Navigation -->
                    <div class="mb-6 border-b border-gray-200" role="tablist" aria-label="${i18n.t('learning.tabsLabel')}">
                        <nav class="-mb-px flex space-x-8 overflow-x-auto">
                            ${this.renderTab('catalog', 'menu_book', i18n.t('learning.catalog'))}
                            ${this.renderTab('roadmap', 'route', i18n.t('learning.roadmap'))}
                            ${this.renderTab('myLearning', 'school', i18n.t('learning.myLearning'))}
                            ${this.renderTab('calendar', 'calendar_month', i18n.t('learning.calendar'))}
                        </nav>
                    </div>

                    <!-- Tab Content -->
                    <div id="learning-tab-content" role="tabpanel" aria-labelledby="tab-${currentTab}">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Initialize page
         */
        init() {
            // Set initial tab based on URL hash or default to catalog
            const hash = window.location.hash;
            if (hash.includes('tab=')) {
                const tabMatch = hash.match(/tab=(\w+)/);
                if (tabMatch) {
                    currentTab = tabMatch[1];
                }
            }
        },

        /**
         * Render tab button
         */
        renderTab(tabId, icon, label) {
            const isActive = currentTab === tabId;
            return `
                <button
                    id="tab-${tabId}"
                    class="flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition ${
                        isActive
                            ? 'border-cg-red text-cg-red'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }"
                    onclick="LearningPage.switchTab('${tabId}')"
                    role="tab"
                    aria-selected="${isActive}"
                    aria-controls="learning-tab-content"
                >
                    <span class="material-icons text-lg">${icon}</span>
                    ${label}
                </button>
            `;
        },

        /**
         * Switch tab
         */
        switchTab(tabId) {
            currentTab = tabId;
            const content = document.getElementById('learning-tab-content');
            if (content) {
                content.innerHTML = this.renderTabContent();
            }
            // Update tab buttons
            document.querySelectorAll('[role="tab"]').forEach(tab => {
                const isActive = tab.id === `tab-${tabId}`;
                tab.classList.toggle('border-cg-red', isActive);
                tab.classList.toggle('text-cg-red', isActive);
                tab.classList.toggle('border-transparent', !isActive);
                tab.classList.toggle('text-gray-500', !isActive);
                tab.setAttribute('aria-selected', isActive);
            });
        },

        /**
         * Render tab content based on current tab
         */
        renderTabContent() {
            switch (currentTab) {
                case 'catalog':
                    return this.renderCatalog();
                case 'roadmap':
                    return this.renderRoadmap();
                case 'myLearning':
                    return this.renderMyLearning();
                case 'calendar':
                    return this.renderCalendar();
                default:
                    return this.renderCatalog();
            }
        },

        /**
         * Render quick stats
         */
        renderQuickStats() {
            const enrollments = MockTrainingData.myEnrollments || [];
            const completed = enrollments.filter(e => e.status === 'completed').length;
            const inProgress = enrollments.filter(e => e.status === 'in_progress' || e.status === 'enrolled').length;
            const totalCredits = enrollments
                .filter(e => e.status === 'completed')
                .reduce((sum, e) => {
                    const course = MockTrainingData.getCourseById(e.courseId);
                    return sum + (course?.credits || 0);
                }, 0);

            return `
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-green-100 rounded-lg">
                                <span class="material-icons text-green-600">task_alt</span>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-gray-900">${completed}</p>
                                <p class="text-xs text-gray-500">${i18n.t('learning.completedCourses')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-blue-100 rounded-lg">
                                <span class="material-icons text-blue-600">play_circle</span>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-gray-900">${inProgress}</p>
                                <p class="text-xs text-gray-500">${i18n.t('learning.inProgress')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-purple-100 rounded-lg">
                                <span class="material-icons text-purple-600">stars</span>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-gray-900">${totalCredits}</p>
                                <p class="text-xs text-gray-500">${i18n.t('learning.creditsEarned')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-orange-100 rounded-lg">
                                <span class="material-icons text-orange-600">workspace_premium</span>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-gray-900">${completed}</p>
                                <p class="text-xs text-gray-500">${i18n.t('learning.certificates')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render course catalog
         */
        renderCatalog() {
            const categories = MockTrainingData.categories || [];
            const courses = this.getFilteredCourses();

            return `
                <div class="space-y-6">
                    <!-- Filters -->
                    <div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <!-- Search -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="course-search">
                                    ${i18n.t('common.search')}
                                </label>
                                <div class="relative">
                                    <input
                                        type="text"
                                        id="course-search"
                                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red"
                                        placeholder="${i18n.t('learning.searchCourses')}"
                                        value="${filters.search}"
                                        oninput="LearningPage.updateFilter('search', this.value)"
                                    >
                                    <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                                </div>
                            </div>
                            <!-- Category Filter -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="filter-category">
                                    ${i18n.t('learning.category')}
                                </label>
                                <select
                                    id="filter-category"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red"
                                    onchange="LearningPage.updateFilter('category', this.value)"
                                >
                                    <option value="">${i18n.t('common.all')}</option>
                                    ${categories.map(cat => `
                                        <option value="${cat.id}" ${filters.category === cat.id ? 'selected' : ''}>
                                            ${i18n.isThai() ? cat.nameTh : cat.nameEn}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                            <!-- Level Filter -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="filter-level">
                                    ${i18n.t('learning.level')}
                                </label>
                                <select
                                    id="filter-level"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red"
                                    onchange="LearningPage.updateFilter('level', this.value)"
                                >
                                    <option value="">${i18n.t('common.all')}</option>
                                    ${MockTrainingData.courseLevels.map(level => `
                                        <option value="${level.value}" ${filters.level === level.value ? 'selected' : ''}>
                                            ${i18n.isThai() ? level.labelTh : level.labelEn}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                            <!-- Delivery Method Filter -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="filter-delivery">
                                    ${i18n.t('learning.deliveryMethod')}
                                </label>
                                <select
                                    id="filter-delivery"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red"
                                    onchange="LearningPage.updateFilter('deliveryMethod', this.value)"
                                >
                                    <option value="">${i18n.t('common.all')}</option>
                                    ${MockTrainingData.deliveryMethods.map(method => `
                                        <option value="${method.value}" ${filters.deliveryMethod === method.value ? 'selected' : ''}>
                                            ${i18n.isThai() ? method.labelTh : method.labelEn}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Course Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${courses.length > 0 ? courses.map(course => this.renderCourseCard(course)).join('') : `
                            <div class="col-span-full text-center py-12">
                                <span class="material-icons text-6xl text-gray-300">search_off</span>
                                <p class="text-gray-500 mt-4">${i18n.t('learning.noCoursesFound')}</p>
                            </div>
                        `}
                    </div>
                </div>
            `;
        },

        /**
         * Get filtered courses
         */
        getFilteredCourses() {
            let courses = [...(MockTrainingData.courses || [])];

            if (filters.category) {
                courses = courses.filter(c => c.categoryId === filters.category);
            }
            if (filters.level) {
                courses = courses.filter(c => c.level === filters.level);
            }
            if (filters.deliveryMethod) {
                courses = courses.filter(c => c.deliveryMethod === filters.deliveryMethod);
            }
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                courses = courses.filter(c =>
                    c.nameEn.toLowerCase().includes(searchLower) ||
                    c.nameTh.toLowerCase().includes(searchLower) ||
                    c.code.toLowerCase().includes(searchLower)
                );
            }

            return courses;
        },

        /**
         * Update filter and refresh
         */
        updateFilter(filterName, value) {
            filters[filterName] = value;
            const content = document.getElementById('learning-tab-content');
            if (content) {
                content.innerHTML = this.renderCatalog();
            }
        },

        /**
         * Render course card
         */
        renderCourseCard(course) {
            const category = MockTrainingData.getCategoryById(course.categoryId);
            const enrollment = MockTrainingData.getEnrollmentStatus(course.id);
            const schedules = MockTrainingData.getSchedulesByCourse(course.id);
            const deliveryMethod = MockTrainingData.deliveryMethods.find(m => m.value === course.deliveryMethod);
            const levelConfig = MockTrainingData.courseLevels.find(l => l.value === course.level);

            let statusBadge = '';
            if (enrollment) {
                const statusConfig = MockTrainingData.enrollmentStatuses.find(s => s.value === enrollment.status);
                if (statusConfig) {
                    statusBadge = `
                        <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${statusConfig.color}-100 text-${statusConfig.color}-800">
                            <span class="material-icons text-xs">${statusConfig.icon}</span>
                            ${i18n.isThai() ? statusConfig.labelTh : statusConfig.labelEn}
                        </span>
                    `;
                }
            }

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition overflow-hidden">
                    <!-- Course Header -->
                    <div class="p-4 border-b border-gray-100">
                        <div class="flex items-start justify-between gap-2 mb-2">
                            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${category?.color || 'gray'}-100 text-${category?.color || 'gray'}-800">
                                <span class="material-icons text-xs">${category?.icon || 'school'}</span>
                                ${i18n.isThai() ? category?.nameTh : category?.nameEn}
                            </span>
                            ${course.mandatory ? `
                                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    <span class="material-icons text-xs">priority_high</span>
                                    ${i18n.t('learning.mandatory')}
                                </span>
                            ` : ''}
                        </div>
                        <h3 class="font-semibold text-gray-900 line-clamp-2">
                            ${i18n.isThai() ? course.nameTh : course.nameEn}
                        </h3>
                        <p class="text-xs text-gray-500 mt-1">${course.code}</p>
                    </div>

                    <!-- Course Body -->
                    <div class="p-4">
                        <p class="text-sm text-gray-600 line-clamp-2 mb-4">
                            ${i18n.isThai() ? course.descriptionTh : course.descriptionEn}
                        </p>

                        <!-- Course Meta -->
                        <div class="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                            <span class="flex items-center gap-1">
                                <span class="material-icons text-sm">schedule</span>
                                ${course.duration} ${i18n.t('learning.hours')}
                            </span>
                            <span class="flex items-center gap-1">
                                <span class="material-icons text-sm">${deliveryMethod?.icon || 'school'}</span>
                                ${i18n.isThai() ? deliveryMethod?.labelTh : deliveryMethod?.labelEn}
                            </span>
                            <span class="flex items-center gap-1 px-2 py-0.5 rounded bg-${levelConfig?.color || 'gray'}-50 text-${levelConfig?.color || 'gray'}-700">
                                ${i18n.isThai() ? levelConfig?.labelTh : levelConfig?.labelEn}
                            </span>
                        </div>

                        <!-- Rating -->
                        <div class="flex items-center gap-2 mb-4">
                            <div class="flex items-center text-yellow-400">
                                ${this.renderStars(course.rating)}
                            </div>
                            <span class="text-sm text-gray-600">${course.rating}</span>
                            <span class="text-xs text-gray-400">(${course.reviewCount} ${i18n.t('learning.reviews')})</span>
                        </div>

                        ${statusBadge ? `<div class="mb-4">${statusBadge}</div>` : ''}

                        <!-- Available Classes -->
                        ${schedules.length > 0 ? `
                            <p class="text-xs text-green-600 mb-4">
                                <span class="material-icons text-sm align-middle">event_available</span>
                                ${schedules.length} ${i18n.t('learning.classesAvailable')}
                            </p>
                        ` : ''}
                    </div>

                    <!-- Course Footer -->
                    <div class="px-4 py-3 bg-gray-50 border-t border-gray-100">
                        <button
                            class="w-full py-2 px-4 bg-cg-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-cg-red focus:ring-offset-2"
                            onclick="LearningPage.viewCourseDetails('${course.id}')"
                        >
                            ${i18n.t('learning.viewDetails')}
                        </button>
                    </div>
                </div>
            `;
        },

        /**
         * Render star rating
         */
        renderStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalf = rating % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

            let html = '';
            for (let i = 0; i < fullStars; i++) {
                html += '<span class="material-icons text-sm">star</span>';
            }
            if (hasHalf) {
                html += '<span class="material-icons text-sm">star_half</span>';
            }
            for (let i = 0; i < emptyStars; i++) {
                html += '<span class="material-icons text-sm text-gray-300">star_border</span>';
            }
            return html;
        },

        /**
         * View course details
         */
        viewCourseDetails(courseId) {
            const course = MockTrainingData.getCourseById(courseId);
            if (!course) return;

            const category = MockTrainingData.getCategoryById(course.categoryId);
            const schedules = MockTrainingData.getSchedulesByCourse(course.id);
            const enrollment = MockTrainingData.getEnrollmentStatus(course.id);
            const deliveryMethod = MockTrainingData.deliveryMethods.find(m => m.value === course.deliveryMethod);
            const levelConfig = MockTrainingData.courseLevels.find(l => l.value === course.level);

            // Get prerequisite courses
            const prerequisites = course.prerequisites.map(prereqId => MockTrainingData.getCourseById(prereqId)).filter(Boolean);

            // Get instructors
            const instructors = course.instructorIds.map(id => MockTrainingData.getInstructorById(id)).filter(Boolean);

            ModalComponent.open({
                title: i18n.isThai() ? course.nameTh : course.nameEn,
                size: 'xl',
                content: `
                    <div class="space-y-6">
                        <!-- Course Header -->
                        <div class="flex flex-wrap gap-2">
                            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${category?.color || 'gray'}-100 text-${category?.color || 'gray'}-800">
                                <span class="material-icons text-xs">${category?.icon || 'school'}</span>
                                ${i18n.isThai() ? category?.nameTh : category?.nameEn}
                            </span>
                            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${levelConfig?.color || 'gray'}-100 text-${levelConfig?.color || 'gray'}-800">
                                ${i18n.isThai() ? levelConfig?.labelTh : levelConfig?.labelEn}
                            </span>
                            ${course.mandatory ? `
                                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    ${i18n.t('learning.mandatory')}
                                </span>
                            ` : ''}
                        </div>

                        <!-- Course Info -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div class="text-center">
                                <span class="material-icons text-cg-red">schedule</span>
                                <p class="text-lg font-bold text-gray-900">${course.duration}</p>
                                <p class="text-xs text-gray-500">${i18n.t('learning.hours')}</p>
                            </div>
                            <div class="text-center">
                                <span class="material-icons text-cg-red">stars</span>
                                <p class="text-lg font-bold text-gray-900">${course.credits}</p>
                                <p class="text-xs text-gray-500">${i18n.t('learning.credits')}</p>
                            </div>
                            <div class="text-center">
                                <span class="material-icons text-cg-red">${deliveryMethod?.icon || 'school'}</span>
                                <p class="text-sm font-medium text-gray-900">${i18n.isThai() ? deliveryMethod?.labelTh : deliveryMethod?.labelEn}</p>
                                <p class="text-xs text-gray-500">${i18n.t('learning.deliveryMethod')}</p>
                            </div>
                            <div class="text-center">
                                <span class="material-icons text-cg-red">group</span>
                                <p class="text-lg font-bold text-gray-900">${course.maxParticipants}</p>
                                <p class="text-xs text-gray-500">${i18n.t('learning.maxParticipants')}</p>
                            </div>
                        </div>

                        <!-- Description -->
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-2">${i18n.t('learning.description')}</h4>
                            <p class="text-sm text-gray-600">${i18n.isThai() ? course.descriptionTh : course.descriptionEn}</p>
                        </div>

                        <!-- Learning Objectives -->
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-2">${i18n.t('learning.objectives')}</h4>
                            <ul class="space-y-2">
                                ${course.objectives.map(obj => `
                                    <li class="flex items-start gap-2 text-sm text-gray-600">
                                        <span class="material-icons text-green-500 text-sm mt-0.5">check_circle</span>
                                        ${i18n.isThai() ? obj.th : obj.en}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <!-- Prerequisites -->
                        ${prerequisites.length > 0 ? `
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">${i18n.t('learning.prerequisites')}</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${prerequisites.map(prereq => {
                                        const prereqEnrollment = MockTrainingData.getEnrollmentStatus(prereq.id);
                                        const isCompleted = prereqEnrollment?.status === 'completed';
                                        return `
                                            <span class="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                                                <span class="material-icons text-sm">${isCompleted ? 'check_circle' : 'warning'}</span>
                                                ${i18n.isThai() ? prereq.nameTh : prereq.nameEn}
                                            </span>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Instructors -->
                        ${instructors.length > 0 ? `
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">${i18n.t('learning.instructors')}</h4>
                                <div class="flex flex-wrap gap-4">
                                    ${instructors.map(inst => `
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span class="material-icons text-gray-400">person</span>
                                            </div>
                                            <div>
                                                <p class="font-medium text-gray-900">${i18n.isThai() ? inst.nameTh : inst.nameEn}</p>
                                                <p class="text-xs text-gray-500">${inst.title}</p>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Materials -->
                        ${course.materials?.length > 0 ? `
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">${i18n.t('learning.materials')}</h4>
                                <ul class="space-y-2">
                                    ${course.materials.map(mat => `
                                        <li class="flex items-center gap-2 text-sm text-gray-600">
                                            <span class="material-icons text-gray-400">${mat.type === 'pdf' ? 'picture_as_pdf' : 'description'}</span>
                                            ${mat.name}
                                            <span class="text-xs text-gray-400">(${mat.size})</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}

                        <!-- Available Classes -->
                        ${schedules.length > 0 ? `
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-2">${i18n.t('learning.availableClasses')}</h4>
                                <div class="space-y-3">
                                    ${schedules.map(schedule => {
                                        const location = MockTrainingData.getLocationById(schedule.locationId);
                                        const isFull = schedule.currentParticipants >= schedule.maxParticipants;
                                        return `
                                            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg ${isFull ? 'bg-gray-50' : 'hover:bg-gray-50'}">
                                                <div>
                                                    <p class="font-medium text-gray-900">
                                                        ${DateUtils.format(schedule.startDate, 'long')}
                                                        ${schedule.startDate !== schedule.endDate ? ` - ${DateUtils.format(schedule.endDate, 'long')}` : ''}
                                                    </p>
                                                    <p class="text-sm text-gray-500">
                                                        ${schedule.startTime !== '00:00' ? `${schedule.startTime} - ${schedule.endTime} | ` : ''}
                                                        ${i18n.isThai() ? location?.nameTh : location?.nameEn}
                                                    </p>
                                                    <p class="text-xs text-gray-400 mt-1">
                                                        ${schedule.currentParticipants}/${schedule.maxParticipants} ${i18n.t('learning.enrolled')}
                                                    </p>
                                                </div>
                                                ${isFull ? `
                                                    <button
                                                        class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
                                                        onclick="LearningPage.joinWaitlist('${schedule.id}')"
                                                    >
                                                        ${i18n.t('learning.joinWaitlist')}
                                                    </button>
                                                ` : `
                                                    <button
                                                        class="px-4 py-2 bg-cg-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
                                                        onclick="LearningPage.enrollInClass('${course.id}', '${schedule.id}')"
                                                    >
                                                        ${i18n.t('learning.enroll')}
                                                    </button>
                                                `}
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        ` : `
                            <div class="p-4 bg-yellow-50 rounded-lg">
                                <p class="text-sm text-yellow-700">
                                    <span class="material-icons text-sm align-middle">info</span>
                                    ${i18n.t('learning.noClassesAvailable')}
                                </p>
                            </div>
                        `}
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), onclick: 'ModalComponent.close()' }
                ]
            });
        },

        /**
         * Enroll in class
         */
        async enrollInClass(courseId, scheduleId) {
            const course = MockTrainingData.getCourseById(courseId);
            if (!course) return;

            // Check prerequisites
            const unmetPrereqs = course.prerequisites.filter(prereqId => {
                const enrollment = MockTrainingData.getEnrollmentStatus(prereqId);
                return !enrollment || enrollment.status !== 'completed';
            });

            if (unmetPrereqs.length > 0) {
                ToastComponent.error(i18n.t('learning.prerequisitesNotMet'));
                return;
            }

            const confirmed = await ModalComponent.confirm({
                title: i18n.t('learning.confirmEnrollment'),
                message: i18n.t('learning.confirmEnrollmentMessage').replace('{course}', i18n.isThai() ? course.nameTh : course.nameEn),
                confirmText: i18n.t('learning.enroll'),
                icon: 'school'
            });

            if (confirmed) {
                // Mock enrollment
                ToastComponent.success(i18n.t('learning.enrollmentSuccess'));
                ModalComponent.close();
                // Refresh the page
                const content = document.getElementById('learning-tab-content');
                if (content) {
                    content.innerHTML = this.renderTabContent();
                }
            }
        },

        /**
         * Join waitlist
         */
        async joinWaitlist(scheduleId) {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('learning.joinWaitlist'),
                message: i18n.t('learning.joinWaitlistMessage'),
                confirmText: i18n.t('learning.join'),
                icon: 'schedule'
            });

            if (confirmed) {
                ToastComponent.success(i18n.t('learning.waitlistSuccess'));
                ModalComponent.close();
            }
        },

        /**
         * Render training roadmap
         */
        renderRoadmap() {
            const employee = AppState.get('currentEmployee');
            const jobFamily = employee?.employment?.jobFamily || 'Retail';
            const level = employee?.employment?.jobLevel || 'Staff';

            // Get appropriate roadmap
            const roadmap = MockTrainingData.getMyRoadmap(jobFamily, level);

            if (!roadmap) {
                return `
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <span class="material-icons text-6xl text-gray-300">route</span>
                        <h3 class="text-lg font-medium text-gray-900 mt-4">${i18n.t('learning.noRoadmap')}</h3>
                        <p class="text-sm text-gray-500 mt-2">${i18n.t('learning.noRoadmapDesc')}</p>
                    </div>
                `;
            }

            return `
                <div class="space-y-6">
                    <!-- Roadmap Header -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="p-3 bg-purple-100 rounded-lg">
                                <span class="material-icons text-2xl text-purple-600">route</span>
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-gray-900">
                                    ${i18n.isThai() ? roadmap.nameTh : roadmap.nameEn}
                                </h2>
                                <p class="text-sm text-gray-500">
                                    ${roadmap.jobFamily} - ${roadmap.level}
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="flex-1 bg-gray-200 rounded-full h-2">
                                <div class="bg-green-500 h-2 rounded-full" style="width: ${this.getRoadmapProgress(roadmap)}%"></div>
                            </div>
                            <span class="text-sm font-medium text-gray-700">${this.getRoadmapProgress(roadmap)}%</span>
                        </div>
                    </div>

                    <!-- Roadmap Timeline -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="font-semibold text-gray-900 mb-6">${i18n.t('learning.trainingPath')}</h3>
                        <div class="relative">
                            ${roadmap.courses.map((item, index) => {
                                const course = MockTrainingData.getCourseById(item.courseId);
                                const enrollment = MockTrainingData.getEnrollmentStatus(item.courseId);
                                const isCompleted = enrollment?.status === 'completed';
                                const isInProgress = enrollment?.status === 'in_progress' || enrollment?.status === 'enrolled';

                                return `
                                    <div class="flex gap-4 ${index < roadmap.courses.length - 1 ? 'pb-8' : ''}">
                                        <!-- Timeline Marker -->
                                        <div class="flex flex-col items-center">
                                            <div class="w-10 h-10 rounded-full flex items-center justify-center ${
                                                isCompleted ? 'bg-green-500' :
                                                isInProgress ? 'bg-blue-500' :
                                                'bg-gray-200'
                                            }">
                                                <span class="material-icons text-white text-lg">
                                                    ${isCompleted ? 'check' : isInProgress ? 'play_arrow' : 'lock'}
                                                </span>
                                            </div>
                                            ${index < roadmap.courses.length - 1 ? `
                                                <div class="w-0.5 flex-1 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}"></div>
                                            ` : ''}
                                        </div>

                                        <!-- Course Card -->
                                        <div class="flex-1 pb-4">
                                            <div class="flex items-start justify-between gap-4">
                                                <div>
                                                    <div class="flex items-center gap-2 mb-1">
                                                        <h4 class="font-medium text-gray-900">
                                                            ${i18n.isThai() ? course?.nameTh : course?.nameEn}
                                                        </h4>
                                                        ${item.mandatory ? `
                                                            <span class="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
                                                                ${i18n.t('learning.mandatory')}
                                                            </span>
                                                        ` : ''}
                                                    </div>
                                                    <p class="text-sm text-gray-500">${item.timeframe}</p>
                                                    ${enrollment?.completionDate ? `
                                                        <p class="text-xs text-green-600 mt-1">
                                                            ${i18n.t('learning.completedOn')} ${DateUtils.format(enrollment.completionDate, 'medium')}
                                                        </p>
                                                    ` : ''}
                                                </div>
                                                ${!isCompleted ? `
                                                    <button
                                                        class="px-3 py-1.5 text-sm font-medium rounded-lg transition ${
                                                            isInProgress
                                                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }"
                                                        onclick="LearningPage.viewCourseDetails('${course?.id}')"
                                                    >
                                                        ${isInProgress ? i18n.t('learning.continue') : i18n.t('learning.viewDetails')}
                                                    </button>
                                                ` : `
                                                    <span class="flex items-center gap-1 text-sm text-green-600">
                                                        <span class="material-icons text-sm">verified</span>
                                                        ${i18n.t('learning.completed')}
                                                    </span>
                                                `}
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Calculate roadmap progress
         */
        getRoadmapProgress(roadmap) {
            if (!roadmap?.courses?.length) return 0;
            const completed = roadmap.courses.filter(item => {
                const enrollment = MockTrainingData.getEnrollmentStatus(item.courseId);
                return enrollment?.status === 'completed';
            }).length;
            return Math.round((completed / roadmap.courses.length) * 100);
        },

        /**
         * Render my learning
         */
        renderMyLearning() {
            const enrollments = MockTrainingData.myEnrollments || [];

            // Group by status
            const inProgress = enrollments.filter(e => e.status === 'in_progress' || e.status === 'enrolled');
            const completed = enrollments.filter(e => e.status === 'completed');
            const waitlist = MockTrainingData.waitlist || [];

            return `
                <div class="space-y-6">
                    <!-- In Progress -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-blue-500">play_circle</span>
                                ${i18n.t('learning.inProgress')} (${inProgress.length})
                            </h3>
                        </div>
                        <div class="p-6">
                            ${inProgress.length > 0 ? `
                                <div class="space-y-4">
                                    ${inProgress.map(enrollment => this.renderEnrollmentCard(enrollment)).join('')}
                                </div>
                            ` : `
                                <p class="text-center text-gray-500 py-4">${i18n.t('learning.noInProgress')}</p>
                            `}
                        </div>
                    </div>

                    <!-- Waitlist -->
                    ${waitlist.length > 0 ? `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                    <span class="material-icons text-purple-500">schedule</span>
                                    ${i18n.t('learning.waitlist')} (${waitlist.length})
                                </h3>
                            </div>
                            <div class="p-6">
                                <div class="space-y-4">
                                    ${waitlist.map(item => {
                                        const course = MockTrainingData.getCourseById(item.courseId);
                                        return `
                                            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <h4 class="font-medium text-gray-900">${i18n.isThai() ? course?.nameTh : course?.nameEn}</h4>
                                                    <p class="text-sm text-gray-500">${i18n.t('learning.waitlistPosition')}: #${item.position}</p>
                                                </div>
                                                <button
                                                    class="text-sm text-red-600 hover:text-red-800"
                                                    onclick="LearningPage.cancelWaitlist('${item.id}')"
                                                >
                                                    ${i18n.t('common.cancel')}
                                                </button>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Completed -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-green-500">task_alt</span>
                                ${i18n.t('learning.completed')} (${completed.length})
                            </h3>
                        </div>
                        <div class="p-6">
                            ${completed.length > 0 ? `
                                <div class="space-y-4">
                                    ${completed.map(enrollment => this.renderCompletedCard(enrollment)).join('')}
                                </div>
                            ` : `
                                <p class="text-center text-gray-500 py-4">${i18n.t('learning.noCompleted')}</p>
                            `}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render enrollment card
         */
        renderEnrollmentCard(enrollment) {
            const course = MockTrainingData.getCourseById(enrollment.courseId);
            const schedule = enrollment.scheduleId ? MockTrainingData.classSchedules.find(s => s.id === enrollment.scheduleId) : null;

            return `
                <div class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition">
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-900">${i18n.isThai() ? course?.nameTh : course?.nameEn}</h4>
                        ${schedule ? `
                            <p class="text-sm text-gray-500 mt-1">
                                <span class="material-icons text-sm align-middle">event</span>
                                ${DateUtils.format(schedule.startDate, 'medium')}
                            </p>
                        ` : enrollment.progress !== undefined ? `
                            <div class="mt-2">
                                <div class="flex items-center gap-2">
                                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-500 h-2 rounded-full" style="width: ${enrollment.progress}%"></div>
                                    </div>
                                    <span class="text-xs text-gray-500">${enrollment.progress}%</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    <button
                        class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                        onclick="LearningPage.continueLearning('${enrollment.id}')"
                    >
                        ${i18n.t('learning.continue')}
                    </button>
                </div>
            `;
        },

        /**
         * Render completed card
         */
        renderCompletedCard(enrollment) {
            const course = MockTrainingData.getCourseById(enrollment.courseId);

            return `
                <div class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div class="p-3 bg-green-100 rounded-lg">
                        <span class="material-icons text-green-600">workspace_premium</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-900">${i18n.isThai() ? course?.nameTh : course?.nameEn}</h4>
                        <p class="text-sm text-gray-500">
                            ${i18n.t('learning.completedOn')} ${DateUtils.format(enrollment.completionDate, 'medium')}
                            ${enrollment.score ? ` | ${i18n.t('learning.score')}: ${enrollment.score}%` : ''}
                        </p>
                    </div>
                    ${enrollment.certificateUrl ? `
                        <button
                            class="flex items-center gap-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                            onclick="LearningPage.downloadCertificate('${enrollment.id}')"
                        >
                            <span class="material-icons text-sm">download</span>
                            ${i18n.t('learning.certificate')}
                        </button>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Continue learning
         */
        continueLearning(enrollmentId) {
            ToastComponent.info(i18n.t('learning.openingCourse'));
            // In real app, would redirect to LMS
        },

        /**
         * Download certificate
         */
        downloadCertificate(enrollmentId) {
            ToastComponent.success(i18n.t('toast.downloadStarted'));
            // In real app, would download certificate
        },

        /**
         * Cancel waitlist
         */
        async cancelWaitlist(waitlistId) {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('learning.cancelWaitlist'),
                message: i18n.t('learning.cancelWaitlistMessage'),
                confirmText: i18n.t('common.yes'),
                icon: 'warning'
            });

            if (confirmed) {
                ToastComponent.success(i18n.t('learning.waitlistCancelled'));
                // Refresh
                const content = document.getElementById('learning-tab-content');
                if (content) {
                    content.innerHTML = this.renderMyLearning();
                }
            }
        },

        /**
         * Render training calendar
         */
        renderCalendar() {
            const schedules = MockTrainingData.getUpcomingSchedules();
            const myEnrollments = MockTrainingData.myEnrollments?.filter(e => e.status === 'enrolled') || [];
            const myScheduleIds = new Set(myEnrollments.map(e => e.scheduleId));

            // Generate calendar days
            const firstDay = new Date(calendarYear, calendarMonth, 1);
            const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
            const startPadding = firstDay.getDay();
            const daysInMonth = lastDay.getDate();

            const monthNames = i18n.isThai()
                ? ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
                : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            const dayNames = i18n.isThai()
                ? ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
                : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            // Build calendar grid
            const calendarDays = [];
            for (let i = 0; i < startPadding; i++) {
                calendarDays.push({ day: null, schedules: [] });
            }
            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const daySchedules = schedules.filter(s => s.startDate === dateStr || (s.startDate <= dateStr && s.endDate >= dateStr));
                calendarDays.push({ day, date: dateStr, schedules: daySchedules });
            }

            const today = new Date().toISOString().split('T')[0];

            return `
                <div class="space-y-6">
                    <!-- Calendar Header -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex items-center justify-between mb-4">
                            <button
                                class="p-2 hover:bg-gray-100 rounded-lg"
                                onclick="LearningPage.changeMonth(-1)"
                                aria-label="${i18n.t('accessibility.previousPage')}"
                            >
                                <span class="material-icons">chevron_left</span>
                            </button>
                            <h3 class="text-lg font-semibold text-gray-900">
                                ${monthNames[calendarMonth]} ${calendarYear}
                            </h3>
                            <button
                                class="p-2 hover:bg-gray-100 rounded-lg"
                                onclick="LearningPage.changeMonth(1)"
                                aria-label="${i18n.t('accessibility.nextPage')}"
                            >
                                <span class="material-icons">chevron_right</span>
                            </button>
                        </div>

                        <!-- Calendar Grid -->
                        <div class="grid grid-cols-7 gap-1">
                            <!-- Day Headers -->
                            ${dayNames.map(day => `
                                <div class="text-center text-xs font-medium text-gray-500 py-2">${day}</div>
                            `).join('')}

                            <!-- Calendar Days -->
                            ${calendarDays.map(({ day, date, schedules: daySchedules }) => {
                                if (!day) {
                                    return '<div class="h-24 bg-gray-50 rounded"></div>';
                                }

                                const isToday = date === today;
                                const hasMySchedule = daySchedules.some(s => myScheduleIds.has(s.id));

                                return `
                                    <div class="h-24 border border-gray-100 rounded p-1 ${isToday ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'} ${daySchedules.length > 0 ? 'cursor-pointer' : ''}"
                                         ${daySchedules.length > 0 ? `onclick="LearningPage.showDaySchedules('${date}')"` : ''}>
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm ${isToday ? 'font-bold text-blue-600' : 'text-gray-700'}">${day}</span>
                                            ${hasMySchedule ? '<span class="w-2 h-2 bg-green-500 rounded-full"></span>' : ''}
                                        </div>
                                        ${daySchedules.length > 0 ? `
                                            <div class="mt-1 space-y-1">
                                                ${daySchedules.slice(0, 2).map(schedule => {
                                                    const course = MockTrainingData.getCourseById(schedule.courseId);
                                                    const isEnrolled = myScheduleIds.has(schedule.id);
                                                    return `
                                                        <div class="text-xs p-1 rounded ${isEnrolled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'} truncate">
                                                            ${course?.code}
                                                        </div>
                                                    `;
                                                }).join('')}
                                                ${daySchedules.length > 2 ? `
                                                    <div class="text-xs text-gray-500">+${daySchedules.length - 2} ${i18n.t('learning.more')}</div>
                                                ` : ''}
                                            </div>
                                        ` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Legend -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <h4 class="font-medium text-gray-900 mb-3">${i18n.t('learning.legend')}</h4>
                        <div class="flex flex-wrap gap-4 text-sm">
                            <span class="flex items-center gap-2">
                                <span class="w-3 h-3 bg-green-100 rounded"></span>
                                ${i18n.t('learning.myEnrollments')}
                            </span>
                            <span class="flex items-center gap-2">
                                <span class="w-3 h-3 bg-gray-100 rounded"></span>
                                ${i18n.t('learning.availableClasses')}
                            </span>
                            <span class="flex items-center gap-2">
                                <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                                ${i18n.t('learning.enrolledDay')}
                            </span>
                        </div>
                    </div>

                    <!-- Upcoming Classes List -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h3 class="font-semibold text-gray-900">
                                ${i18n.t('learning.upcomingClasses')}
                            </h3>
                        </div>
                        <div class="divide-y divide-gray-100">
                            ${schedules.slice(0, 5).map(schedule => {
                                const course = MockTrainingData.getCourseById(schedule.courseId);
                                const location = MockTrainingData.getLocationById(schedule.locationId);
                                const isEnrolled = myScheduleIds.has(schedule.id);

                                return `
                                    <div class="px-6 py-4 flex items-center gap-4">
                                        <div class="text-center min-w-[60px]">
                                            <p class="text-2xl font-bold text-cg-red">${new Date(schedule.startDate).getDate()}</p>
                                            <p class="text-xs text-gray-500">${monthNames[new Date(schedule.startDate).getMonth()].slice(0, 3)}</p>
                                        </div>
                                        <div class="flex-1">
                                            <div class="flex items-center gap-2">
                                                <h4 class="font-medium text-gray-900">${i18n.isThai() ? course?.nameTh : course?.nameEn}</h4>
                                                ${isEnrolled ? '<span class="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">' + i18n.t('learning.enrolled') + '</span>' : ''}
                                            </div>
                                            <p class="text-sm text-gray-500">
                                                ${schedule.startTime !== '00:00' ? schedule.startTime + ' | ' : ''}
                                                ${i18n.isThai() ? location?.nameTh : location?.nameEn}
                                            </p>
                                        </div>
                                        <button
                                            class="px-3 py-1.5 text-sm font-medium rounded-lg ${isEnrolled ? 'bg-gray-100 text-gray-700' : 'bg-cg-red text-white hover:bg-red-700'} transition"
                                            onclick="LearningPage.viewCourseDetails('${course?.id}')"
                                        >
                                            ${isEnrolled ? i18n.t('learning.viewDetails') : i18n.t('learning.enroll')}
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Change calendar month
         */
        changeMonth(delta) {
            calendarMonth += delta;
            if (calendarMonth > 11) {
                calendarMonth = 0;
                calendarYear++;
            } else if (calendarMonth < 0) {
                calendarMonth = 11;
                calendarYear--;
            }
            const content = document.getElementById('learning-tab-content');
            if (content) {
                content.innerHTML = this.renderCalendar();
            }
        },

        /**
         * Show schedules for a specific day
         */
        showDaySchedules(dateStr) {
            const schedules = MockTrainingData.classSchedules.filter(s =>
                s.startDate === dateStr || (s.startDate <= dateStr && s.endDate >= dateStr)
            );

            if (schedules.length === 0) return;

            const content = schedules.map(schedule => {
                const course = MockTrainingData.getCourseById(schedule.courseId);
                const location = MockTrainingData.getLocationById(schedule.locationId);
                return `
                    <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3">
                        <div>
                            <h4 class="font-medium text-gray-900">${i18n.isThai() ? course?.nameTh : course?.nameEn}</h4>
                            <p class="text-sm text-gray-500">
                                ${schedule.startTime !== '00:00' ? schedule.startTime + ' - ' + schedule.endTime + ' | ' : ''}
                                ${i18n.isThai() ? location?.nameTh : location?.nameEn}
                            </p>
                            <p class="text-xs text-gray-400 mt-1">
                                ${schedule.currentParticipants}/${schedule.maxParticipants} ${i18n.t('learning.enrolled')}
                            </p>
                        </div>
                        <button
                            class="px-3 py-1.5 bg-cg-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
                            onclick="ModalComponent.close(); LearningPage.viewCourseDetails('${course?.id}')"
                        >
                            ${i18n.t('learning.viewDetails')}
                        </button>
                    </div>
                `;
            }).join('');

            ModalComponent.open({
                title: DateUtils.format(dateStr, 'long'),
                size: 'md',
                content: content,
                actions: [
                    { label: i18n.t('common.close'), onclick: 'ModalComponent.close()' }
                ]
            });
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LearningPage;
}
