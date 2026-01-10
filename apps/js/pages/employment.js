/**
 * Employment Information Page
 * Employment details, organization info, job info (read-only for employees)
 */

const EmploymentPage = (function() {
    return {
        /**
         * Render employment tab
         * @param {object} employee
         * @returns {string}
         */
        render(employee) {
            // Show skeleton only if employee data is not available
            if (!employee) {
                return this.renderSkeleton();
            }

            const employment = employee.employmentInfo || {};
            const orgChart = employee.orgChart;
            const jobRelationships = employment.jobRelationships || null;

            return `
                <div class="space-y-6">
                    <!-- Organization Chart -->
                    ${this.renderOrgChartSection(orgChart)}

                    <!-- Employment Details -->
                    ${this.renderEmploymentDetailsSection(employment.details)}

                    <!-- Organization Information -->
                    ${this.renderOrganizationSection(employment.organization)}

                    <!-- Job Information -->
                    ${this.renderJobSection(employment.job)}

                    <!-- Job Relationships Section -->
                    ${this.renderJobRelationshipsSection(jobRelationships)}
                </div>
            `;
        },

        /**
         * Initialize page
         */
        init() {
            // Any initialization logic
        },

        /**
         * Render Organization Chart section
         */
        renderOrgChartSection(orgChart) {
            return CardComponent.render({
                id: 'org-chart-card',
                title: i18n.t('employment.orgChart'),
                icon: 'account_tree',
                collapsible: true,
                content: OrgChartComponent.render(orgChart)
            });
        },

        /**
         * Render Employment Details section
         */
        renderEmploymentDetailsSection(details) {
            if (!details) return '';

            const items = [
                { label: i18n.t('employment.hireDate'), value: DateUtils.format(details.hireDate, 'long') },
                { label: i18n.t('employment.originalStartDate'), value: DateUtils.format(details.originalStartDate, 'long') },
                { label: i18n.t('employment.seniorityStartDate'), value: DateUtils.format(details.seniorityStartDate, 'long') },
                { label: i18n.t('employment.yearsOfService'), value: details.yearsOfService },
                { label: i18n.t('employment.passProbationDate'), value: DateUtils.format(details.passProbationDate, 'long') },
                { label: i18n.t('employment.currentJobEffectiveDate'), value: DateUtils.format(details.currentJobEffectiveDate, 'long') },
                { label: i18n.t('employment.currentYearsInJob'), value: details.currentYearsInJob },
                { label: i18n.t('employment.currentPositionEffective'), value: DateUtils.format(details.currentPositionEffectiveDate, 'long') },
                { label: i18n.t('employment.currentYearsInPosition'), value: details.currentYearsInPosition }
            ];

            return CardComponent.render({
                id: 'employment-details-card',
                title: i18n.t('employment.details'),
                icon: 'badge',
                content: CardComponent.dataGrid(items)
            });
        },

        /**
         * Render Organization Information section
         */
        renderOrganizationSection(org) {
            if (!org) return '';

            const items = [
                { label: i18n.t('employment.company'), value: org.company },
                { label: i18n.t('employment.position'), value: org.position },
                { label: i18n.t('employment.group'), value: org.group },
                { label: i18n.t('employment.businessUnit'), value: org.businessUnit },
                { label: i18n.t('employment.function'), value: org.function },
                { label: i18n.t('employment.department'), value: org.department },
                { label: i18n.t('employment.storeBranchCode'), value: org.storeBranchCode },
                { label: i18n.t('employment.hrDistrict'), value: org.hrDistrict },
                { label: i18n.t('employment.costCenter'), value: org.costCenter },
                { label: i18n.t('employment.workLocation'), value: org.workLocation }
            ];

            return CardComponent.render({
                id: 'org-info-card',
                title: i18n.t('employment.organization'),
                icon: 'business',
                content: CardComponent.dataGrid(items)
            });
        },

        /**
         * Render Job Information section
         */
        renderJobSection(job) {
            if (!job) return '';

            // Get supervisor info from org chart for display
            const employee = AppState.get('currentEmployee');
            const supervisor = employee?.orgChart?.supervisor;

            const items = [
                { label: i18n.t('employment.employeeStatus'), value: this.renderStatusBadge(job.employeeStatus) },
                {
                    label: i18n.t('employment.supervisor'),
                    value: supervisor ? `
                        <div class="flex items-center gap-2">
                            <img src="${supervisor.photo}" alt="${supervisor.name}" class="w-6 h-6 rounded-full">
                            <span>${supervisor.name}</span>
                        </div>
                    ` : '-'
                },
                { label: i18n.t('employment.country'), value: job.country },
                { label: i18n.t('employment.jobFamily'), value: job.jobFamily },
                { label: i18n.t('employment.jobCode'), value: job.jobCode },
                { label: i18n.t('employment.jobRole'), value: job.jobRole },
                { label: i18n.t('employment.jobType'), value: job.jobType },
                { label: i18n.t('employment.employeeGroup'), value: job.employeeGroup },
                { label: i18n.t('employment.contractType'), value: job.contractType },
                { label: i18n.t('employment.contractEndDate'), value: job.contractEndDate ? DateUtils.format(job.contractEndDate, 'long') : '-' }
            ];

            return CardComponent.render({
                id: 'job-info-card',
                title: i18n.t('employment.job'),
                icon: 'work',
                content: CardComponent.dataGrid(items)
            });
        },

        /**
         * Render job relationships section
         * @param {object} jobRelationships
         * @returns {string}
         */
        renderJobRelationshipsSection(jobRelationships) {
            // Handle empty state
            if (!jobRelationships || (!jobRelationships.dottedLineManagers?.length &&
                !jobRelationships.matrixManagers?.length &&
                !jobRelationships.hrBusinessPartners?.length &&
                !jobRelationships.administrativeAssistants?.length)) {
                return CardComponent.render({
                    id: 'job-relationships-card',
                    title: i18n.t('employment.jobRelationships'),
                    icon: 'people',
                    content: CardComponent.emptyState(i18n.t('employment.noJobRelationships'))
                });
            }

            // Helper function to render a single relationship card
            const renderRelationshipCard = (person, relationshipType) => {
                const currentLang = i18n.getLanguage();
                const displayName = currentLang === 'th' && person.nameTh ? person.nameTh : person.name;

                return `
                    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div class="flex gap-4">
                            <!-- Photo -->
                            <img
                                src="${person.photo || 'https://via.placeholder.com/64'}"
                                alt="${displayName}"
                                class="w-16 h-16 rounded-full border-2 border-gray-200 flex-shrink-0"
                                onerror="this.src='https://via.placeholder.com/64'"
                            />

                            <!-- Info -->
                            <div class="flex flex-col gap-1 flex-1">
                                <!-- Name (clickable) -->
                                <a
                                    href="#/profile/${person.id}"
                                    class="text-primary-600 hover:text-primary-700 font-medium cursor-pointer transition-colors text-base"
                                    onclick="event.preventDefault(); Router.navigate('/profile/${person.id}');"
                                >
                                    ${displayName}
                                </a>

                                <!-- Relationship Type Badge -->
                                <span class="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 w-fit">
                                    ${i18n.t(relationshipType)}
                                </span>

                                <!-- Job Title -->
                                <p class="text-sm text-gray-700 font-medium">${person.title}</p>

                                <!-- Contact Info -->
                                <div class="flex flex-col gap-1 mt-1">
                                    <a
                                        href="mailto:${person.email}"
                                        class="text-sm text-gray-600 hover:text-primary-600 flex items-center gap-1 transition-colors"
                                    >
                                        <span class="material-icons text-base">email</span>
                                        ${person.email}
                                    </a>
                                    <a
                                        href="tel:${person.phone}"
                                        class="text-sm text-gray-600 hover:text-primary-600 flex items-center gap-1 transition-colors"
                                    >
                                        <span class="material-icons text-base">phone</span>
                                        ${person.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            };

            // Build content sections
            let content = '<div class="space-y-6">';

            // Dotted-line Managers
            if (jobRelationships.dottedLineManagers?.length) {
                content += `
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700 mb-3">${i18n.t('employment.dottedLineManager')}</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${jobRelationships.dottedLineManagers.map(person =>
                                renderRelationshipCard(person, 'employment.dottedLineManager')
                            ).join('')}
                        </div>
                    </div>
                `;
            }

            // Matrix Managers
            if (jobRelationships.matrixManagers?.length) {
                content += `
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700 mb-3">${i18n.t('employment.matrixManager')}</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${jobRelationships.matrixManagers.map(person =>
                                renderRelationshipCard(person, 'employment.matrixManager')
                            ).join('')}
                        </div>
                    </div>
                `;
            }

            // HR Business Partners
            if (jobRelationships.hrBusinessPartners?.length) {
                content += `
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700 mb-3">${i18n.t('employment.hrBusinessPartner')}</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${jobRelationships.hrBusinessPartners.map(person =>
                                renderRelationshipCard(person, 'employment.hrBusinessPartner')
                            ).join('')}
                        </div>
                    </div>
                `;
            }

            // Administrative Assistants
            if (jobRelationships.administrativeAssistants?.length) {
                content += `
                    <div>
                        <h4 class="text-sm font-semibold text-gray-700 mb-3">${i18n.t('employment.administrativeAssistant')}</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${jobRelationships.administrativeAssistants.map(person =>
                                renderRelationshipCard(person, 'employment.administrativeAssistant')
                            ).join('')}
                        </div>
                    </div>
                `;
            }

            content += '</div>';

            return CardComponent.render({
                id: 'job-relationships-card',
                title: i18n.t('employment.jobRelationships'),
                icon: 'people',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render status badge
         * @param {string} status
         * @returns {string}
         */
        renderStatusBadge(status) {
            const statusConfig = {
                'Active': { class: 'bg-green-100 text-green-800', label: 'Active' },
                'On Leave': { class: 'bg-yellow-100 text-yellow-800', label: 'On Leave' },
                'Probation': { class: 'bg-blue-100 text-blue-800', label: 'Probation' },
                'Terminated': { class: 'bg-red-100 text-red-800', label: 'Terminated' }
            };

            const config = statusConfig[status] || { class: 'bg-gray-100 text-gray-800', label: status };

            return `<span class="px-2 py-1 text-xs font-medium rounded-full ${config.class}">${config.label}</span>`;
        },

        /**
         * Render skeleton loading state
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="space-y-6">
                    ${SkeletonComponent.renderCardSkeleton({ lines: 6 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 5 })}
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmploymentPage;
}
