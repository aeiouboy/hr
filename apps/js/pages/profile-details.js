/**
 * Profile Details Page
 * Education, previous employment, languages, certifications, awards, mobility
 */

const ProfileDetailsPage = (function() {
    return {
        /**
         * Render profile details tab
         * @param {object} employee
         * @returns {string}
         */
        render(employee) {
            // Show skeleton only if employee data is not available
            if (!employee) {
                return this.renderSkeleton();
            }

            const details = employee.profileDetails || {};

            return `
                <div class="space-y-6">
                    <!-- Education -->
                    ${this.renderEducationSection(details.education)}

                    <!-- Previous Employment -->
                    ${this.renderPreviousEmploymentSection(details.previousEmployment)}

                    <!-- Language Skills -->
                    ${this.renderLanguagesSection(details.languages)}

                    <!-- Certifications -->
                    ${this.renderCertificationsSection(details.certifications)}

                    <!-- E-Letter -->
                    ${this.renderELetterSection(details.eLetters)}

                    <!-- Learning History -->
                    ${this.renderLearningHistorySection(details.learningHistory)}

                    <!-- OHS Certificate -->
                    ${this.renderOHSCertificateSection(details.ohsCertificates)}

                    <!-- OHS Document -->
                    ${this.renderOHSDocumentSection(details.ohsDocuments)}

                    <!-- Awards -->
                    ${this.renderAwardsSection(details.awards)}

                    <!-- Mobility -->
                    ${this.renderMobilitySection(details.mobility)}

                    <!-- Individual Documents -->
                    ${this.renderIndividualDocumentsSection(details.individualDocuments)}
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
         * Render Education section
         */
        renderEducationSection(education) {
            const content = education && education.length > 0
                ? education.map(edu => `
                    <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div class="p-2 bg-blue-100 rounded-lg">
                            <span class="material-icons text-blue-600">school</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-medium text-gray-900">${edu.degree}</h4>
                            <p class="text-sm text-gray-600">${edu.institution}</p>
                            <p class="text-sm text-gray-500">${edu.major}</p>
                            <p class="text-xs text-gray-400 mt-1">${i18n.t('profileDetails.graduationYear')}: ${edu.graduationYear}</p>
                        </div>
                    </div>
                `).join('')
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีข้อมูลการศึกษา' : 'No education records');

            return CardComponent.render({
                id: 'education-card',
                title: i18n.t('profileDetails.education'),
                icon: 'school',
                collapsible: true,
                content: `<div class="space-y-3">${content}</div>`
            });
        },

        /**
         * Render Previous Employment section
         */
        renderPreviousEmploymentSection(employment) {
            const content = employment && employment.length > 0
                ? employment.map(job => `
                    <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div class="p-2 bg-green-100 rounded-lg">
                            <span class="material-icons text-green-600">work_history</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-medium text-gray-900">${job.jobTitle}</h4>
                            <p class="text-sm text-gray-600">${job.companyName}</p>
                            <p class="text-xs text-gray-500 mt-1">
                                ${DateUtils.format(job.startDate, 'monthYearShort')} - ${job.endDate ? DateUtils.format(job.endDate, 'monthYearShort') : i18n.isThai() ? 'ปัจจุบัน' : 'Present'}
                            </p>
                        </div>
                    </div>
                `).join('')
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีประวัติการทำงาน' : 'No employment history');

            return CardComponent.render({
                id: 'previous-employment-card',
                title: i18n.t('profileDetails.previousEmployment'),
                icon: 'work_history',
                collapsible: true,
                content: `<div class="space-y-3">${content}</div>`
            });
        },

        /**
         * Render Languages section
         */
        renderLanguagesSection(languages) {
            const content = languages && languages.length > 0
                ? `
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.language')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.speaking')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.reading')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.writing')}</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${languages.map(lang => `
                                    <tr>
                                        <td class="px-4 py-3 text-sm font-medium text-gray-900">${lang.language}</td>
                                        <td class="px-4 py-3 text-center">${this.renderProficiencyBadge(lang.speaking)}</td>
                                        <td class="px-4 py-3 text-center">${this.renderProficiencyBadge(lang.reading)}</td>
                                        <td class="px-4 py-3 text-center">${this.renderProficiencyBadge(lang.writing)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีข้อมูลทักษะภาษา' : 'No language skills');

            return CardComponent.render({
                id: 'languages-card',
                title: i18n.t('profileDetails.languages'),
                icon: 'translate',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render proficiency badge
         */
        renderProficiencyBadge(level) {
            const config = {
                'Native': { class: 'bg-green-100 text-green-800', stars: 5 },
                'Fluent': { class: 'bg-blue-100 text-blue-800', stars: 4 },
                'Advanced': { class: 'bg-indigo-100 text-indigo-800', stars: 3 },
                'Intermediate': { class: 'bg-yellow-100 text-yellow-800', stars: 2 },
                'Basic': { class: 'bg-gray-100 text-gray-800', stars: 1 }
            };

            const c = config[level] || config['Basic'];
            return `<span class="px-2 py-1 text-xs font-medium rounded-full ${c.class}">${level}</span>`;
        },

        /**
         * Render Certifications section
         */
        renderCertificationsSection(certifications) {
            const content = certifications && certifications.length > 0
                ? certifications.map(cert => {
                    const isExpired = cert.expiryDate && DateUtils.isPast(cert.expiryDate);
                    const isExpiringSoon = cert.expiryDate && !isExpired &&
                        DateUtils.parse(cert.expiryDate) < DateUtils.addDays(new Date(), 90);

                    return `
                        <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div class="p-2 ${isExpired ? 'bg-red-100' : 'bg-purple-100'} rounded-lg">
                                <span class="material-icons ${isExpired ? 'text-red-600' : 'text-purple-600'}">verified</span>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-2">
                                    <h4 class="font-medium text-gray-900">${cert.name}</h4>
                                    ${isExpired ? `<span class="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">${i18n.isThai() ? 'หมดอายุ' : 'Expired'}</span>` : ''}
                                    ${isExpiringSoon ? `<span class="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">${i18n.isThai() ? 'ใกล้หมดอายุ' : 'Expiring Soon'}</span>` : ''}
                                </div>
                                <p class="text-sm text-gray-600">${cert.issuer}</p>
                                <p class="text-xs text-gray-500 mt-1">
                                    ${i18n.t('profileDetails.issueDate')}: ${DateUtils.format(cert.issueDate, 'medium')}
                                    ${cert.expiryDate ? ` | ${i18n.t('profileDetails.expiryDate')}: ${DateUtils.format(cert.expiryDate, 'medium')}` : ''}
                                </p>
                            </div>
                        </div>
                    `;
                }).join('')
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีใบรับรอง' : 'No certifications');

            return CardComponent.render({
                id: 'certifications-card',
                title: i18n.t('profileDetails.certifications'),
                icon: 'verified',
                collapsible: true,
                content: `<div class="space-y-3">${content}</div>`
            });
        },

        /**
         * Render Awards section
         */
        renderAwardsSection(awards) {
            const content = awards && awards.length > 0
                ? awards.map(award => `
                    <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div class="p-2 bg-yellow-100 rounded-lg">
                            <span class="material-icons text-yellow-600">emoji_events</span>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-medium text-gray-900">${award.name}</h4>
                            <p class="text-sm text-gray-600">${award.issuer}</p>
                            <p class="text-xs text-gray-500 mt-1">${DateUtils.format(award.date, 'long')}</p>
                        </div>
                    </div>
                `).join('')
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีรางวัล' : 'No awards');

            return CardComponent.render({
                id: 'awards-card',
                title: i18n.t('profileDetails.awards'),
                icon: 'emoji_events',
                collapsible: true,
                content: `<div class="space-y-3">${content}</div>`
            });
        },

        /**
         * Render E-Letter section
         */
        renderELetterSection(eLetters) {
            const content = eLetters && eLetters.length > 0
                ? `
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.letterType')}</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.title')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.fiscalYear')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.issueDate')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('common.actions')}</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${eLetters.map(letter => {
                                    const letterTypeLabel = letter.letterType === 'annual_bonus'
                                        ? i18n.t('profileDetails.annualBonusLetter')
                                        : i18n.t('profileDetails.meritIncrementLetter');
                                    return `
                                        <tr>
                                            <td class="px-4 py-3 text-sm text-gray-900">${letterTypeLabel}</td>
                                            <td class="px-4 py-3 text-sm text-gray-900">${letter.title}</td>
                                            <td class="px-4 py-3 text-center text-sm text-gray-900">${letter.fiscalYear}</td>
                                            <td class="px-4 py-3 text-center text-sm text-gray-500">${DateUtils.format(letter.issueDate, 'medium')}</td>
                                            <td class="px-4 py-3 text-center">
                                                <button
                                                    class="inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                                    onclick="ProfileDetailsPage.downloadELetter('${letter.id}')"
                                                    title="${i18n.t('profileDetails.downloadLetter')}">
                                                    <span class="material-icons text-sm text-cg-info">download</span>
                                                </button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                `
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มี E-Letter' : 'No E-Letters available');

            return CardComponent.render({
                id: 'eletter-card',
                title: i18n.t('profileDetails.eLetter'),
                icon: 'mail',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render Learning History section
         */
        renderLearningHistorySection(learningHistory) {
            const statusConfig = {
                'completed': { class: 'bg-green-100 text-green-800', label: i18n.t('profileDetails.completed') },
                'in_progress': { class: 'bg-blue-100 text-blue-800', label: i18n.t('profileDetails.inProgress') },
                'registered': { class: 'bg-yellow-100 text-yellow-800', label: i18n.t('profileDetails.registered') }
            };

            const content = learningHistory && learningHistory.length > 0
                ? `
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.courseName')}</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.provider')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.completionDate')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('benefits.status')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('common.actions')}</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${learningHistory.map(course => {
                                    const statusConf = statusConfig[course.status] || statusConfig['registered'];
                                    return `
                                        <tr>
                                            <td class="px-4 py-3">
                                                <div class="text-sm font-medium text-gray-900">${course.courseName}</div>
                                                <div class="text-xs text-gray-500">${course.courseCode} • ${course.credits} ${i18n.t('profileDetails.credits')}</div>
                                            </td>
                                            <td class="px-4 py-3 text-sm text-gray-900">${course.provider}</td>
                                            <td class="px-4 py-3 text-center text-sm text-gray-500">
                                                ${course.completionDate ? DateUtils.format(course.completionDate, 'medium') : '-'}
                                            </td>
                                            <td class="px-4 py-3 text-center">
                                                <span class="px-2 py-1 text-xs font-medium rounded-full ${statusConf.class}">
                                                    ${statusConf.label}
                                                </span>
                                            </td>
                                            <td class="px-4 py-3 text-center">
                                                ${course.status === 'completed' && course.certificateUrl ? `
                                                    <button
                                                        class="inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                                        onclick="ProfileDetailsPage.downloadCertificate('${course.id}')"
                                                        title="${i18n.t('profileDetails.downloadCertificate')}">
                                                        <span class="material-icons text-sm text-cg-info">download</span>
                                                    </button>
                                                ` : '-'}
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                `
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีประวัติการอบรม' : 'No learning history');

            return CardComponent.render({
                id: 'learning-history-card',
                title: i18n.t('profileDetails.learningHistory'),
                icon: 'school',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render OHS Certificate section
         */
        renderOHSCertificateSection(ohsCertificates) {
            const content = ohsCertificates && ohsCertificates.length > 0
                ? ohsCertificates.map(cert => {
                    const statusConfig = {
                        'active': { class: 'bg-green-100 text-green-800', icon: 'check_circle', iconClass: 'text-green-600' },
                        'expired': { class: 'bg-red-100 text-red-800', icon: 'cancel', iconClass: 'text-red-600' },
                        'expiring_soon': { class: 'bg-yellow-100 text-yellow-800', icon: 'warning', iconClass: 'text-yellow-600' }
                    };
                    const statusConf = statusConfig[cert.status] || statusConfig['active'];

                    return `
                        <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div class="p-2 ${cert.status === 'expired' ? 'bg-red-100' : cert.status === 'expiring_soon' ? 'bg-yellow-100' : 'bg-green-100'} rounded-lg">
                                <span class="material-icons ${statusConf.iconClass}">health_and_safety</span>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-2">
                                    <h4 class="font-medium text-gray-900">${cert.certificateName}</h4>
                                    <span class="px-2 py-0.5 text-xs font-medium rounded-full ${statusConf.class}">
                                        ${i18n.t('profileDetails.' + cert.status.replace(/_([a-z])/g, (_, c) => c.toUpperCase()))}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-600 mt-1">${i18n.t('profileDetails.certificateNumber')}: ${cert.certificateNumber}</p>
                                <p class="text-sm text-gray-600">${i18n.t('profileDetails.issuer')}: ${cert.issuer}</p>
                                <p class="text-xs text-gray-500 mt-1">
                                    ${i18n.t('profileDetails.issueDate')}: ${DateUtils.format(cert.issueDate, 'medium')} |
                                    ${i18n.t('profileDetails.expiryDate')}: ${DateUtils.format(cert.expiryDate, 'medium')}
                                </p>
                            </div>
                        </div>
                    `;
                }).join('')
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีใบรับรอง OHS' : 'No OHS certificates');

            return CardComponent.render({
                id: 'ohs-certificate-card',
                title: i18n.t('profileDetails.ohsCertificate'),
                icon: 'health_and_safety',
                collapsible: true,
                content: `<div class="space-y-3">${content}</div>`
            });
        },

        /**
         * Render OHS Document section
         */
        renderOHSDocumentSection(ohsDocuments) {
            const content = ohsDocuments && ohsDocuments.length > 0
                ? `
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.documentName')}</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.documentType')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.issueDate')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('common.actions')}</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${ohsDocuments.map(doc => `
                                    <tr>
                                        <td class="px-4 py-3">
                                            <div class="text-sm font-medium text-gray-900">${doc.documentName}</div>
                                            ${doc.description ? `<div class="text-xs text-gray-500 mt-1">${doc.description}</div>` : ''}
                                        </td>
                                        <td class="px-4 py-3 text-sm text-gray-900">${doc.documentType}</td>
                                        <td class="px-4 py-3 text-center text-sm text-gray-500">${DateUtils.format(doc.issueDate, 'medium')}</td>
                                        <td class="px-4 py-3 text-center">
                                            <button
                                                class="inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                                onclick="ProfileDetailsPage.downloadOHSDocument('${doc.id}')"
                                                title="${i18n.t('common.download')}">
                                                <span class="material-icons text-sm text-cg-info">download</span>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีเอกสาร OHS' : 'No OHS documents');

            return CardComponent.render({
                id: 'ohs-document-card',
                title: i18n.t('profileDetails.ohsDocument'),
                icon: 'description',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render Individual Documents section
         */
        renderIndividualDocumentsSection(individualDocuments) {
            const formatFileSize = (bytes) => {
                const kb = bytes / 1024;
                if (kb < 1024) return `${kb.toFixed(0)} KB`;
                return `${(kb / 1024).toFixed(1)} MB`;
            };

            const content = individualDocuments && individualDocuments.length > 0
                ? `
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.documentName')}</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.documentType')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.uploadDate')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.fileSize')}</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('profileDetails.uploadedBy')}</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('common.actions')}</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${individualDocuments.map(doc => `
                                    <tr>
                                        <td class="px-4 py-3 text-sm font-medium text-gray-900">${doc.documentName}</td>
                                        <td class="px-4 py-3 text-sm text-gray-900">${doc.documentType}</td>
                                        <td class="px-4 py-3 text-center text-sm text-gray-500">${DateUtils.format(doc.uploadDate, 'medium')}</td>
                                        <td class="px-4 py-3 text-center text-sm text-gray-500">${formatFileSize(doc.fileSize)}</td>
                                        <td class="px-4 py-3 text-sm text-gray-500">${doc.uploadedBy}</td>
                                        <td class="px-4 py-3 text-center">
                                            <button
                                                class="inline-flex items-center justify-center p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                                onclick="ProfileDetailsPage.downloadIndividualDocument('${doc.id}')"
                                                title="${i18n.t('common.download')}">
                                                <span class="material-icons text-sm text-cg-info">download</span>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button
                            class="inline-flex items-center gap-2 px-4 py-2 bg-cg-info text-white rounded-lg hover:bg-cg-info-dark transition-colors"
                            onclick="ProfileDetailsPage.uploadDocument()">
                            <span class="material-icons text-sm">upload</span>
                            ${i18n.t('profileDetails.uploadDocument')}
                        </button>
                    </div>
                `
                : `
                    ${CardComponent.emptyState(i18n.t('profileDetails.noDocuments'))}
                    <div class="mt-4 flex justify-center">
                        <button
                            class="inline-flex items-center gap-2 px-4 py-2 bg-cg-info text-white rounded-lg hover:bg-cg-info-dark transition-colors"
                            onclick="ProfileDetailsPage.uploadDocument()">
                            <span class="material-icons text-sm">upload</span>
                            ${i18n.t('profileDetails.uploadDocument')}
                        </button>
                    </div>
                `;

            return CardComponent.render({
                id: 'individual-documents-card',
                title: i18n.t('profileDetails.individualDocuments'),
                icon: 'folder',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render Mobility section
         */
        renderMobilitySection(mobility) {
            if (!mobility) {
                return CardComponent.render({
                    id: 'mobility-card',
                    title: i18n.t('profileDetails.mobility'),
                    icon: 'flight_takeoff',
                    collapsible: true,
                    content: CardComponent.emptyState(i18n.isThai() ? 'ไม่มีข้อมูลความพร้อมในการย้าย' : 'No mobility preferences')
                });
            }

            const items = [
                {
                    label: i18n.t('profileDetails.willingToRelocate'),
                    value: mobility.willingToRelocate
                        ? `<span class="text-green-600 flex items-center gap-1"><span class="material-icons text-sm">check_circle</span>${i18n.t('common.yes')}</span>`
                        : `<span class="text-red-600 flex items-center gap-1"><span class="material-icons text-sm">cancel</span>${i18n.t('common.no')}</span>`
                },
                {
                    label: i18n.t('profileDetails.preferredLocations'),
                    value: mobility.preferredLocations?.length > 0
                        ? mobility.preferredLocations.map(loc =>
                            `<span class="inline-block px-2 py-1 text-xs bg-gray-100 rounded mr-1 mb-1">${loc}</span>`
                        ).join('')
                        : '-'
                }
            ];

            return CardComponent.render({
                id: 'mobility-card',
                title: i18n.t('profileDetails.mobility'),
                icon: 'flight_takeoff',
                collapsible: true,
                content: CardComponent.dataGrid(items, 1)
            });
        },

        /**
         * Download E-Letter
         * @param {string} letterId
         */
        async downloadELetter(letterId) {
            try {
                ToastComponent.info(i18n.t('toast.downloadStarted'));
                const employee = AppState.get('currentEmployee');
                const blob = await API.downloadELetter(employee.employeeId, letterId);

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `eletter_${letterId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Download Certificate
         * @param {string} courseId
         */
        async downloadCertificate(courseId) {
            try {
                ToastComponent.info(i18n.t('toast.downloadStarted'));
                const employee = AppState.get('currentEmployee');
                const blob = await API.downloadCertificate(employee.employeeId, courseId);

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `certificate_${courseId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Download OHS Document
         * @param {string} docId
         */
        async downloadOHSDocument(docId) {
            try {
                ToastComponent.info(i18n.t('toast.downloadStarted'));
                const employee = AppState.get('currentEmployee');
                const blob = await API.downloadOHSDocument(employee.employeeId, docId);

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `ohs_document_${docId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Download Individual Document
         * @param {string} docId
         */
        async downloadIndividualDocument(docId) {
            try {
                ToastComponent.info(i18n.t('toast.downloadStarted'));
                const employee = AppState.get('currentEmployee');
                const blob = await API.downloadIndividualDocument(employee.employeeId, docId);

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `document_${docId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Upload Document (placeholder)
         */
        uploadDocument() {
            ToastComponent.info(i18n.isThai() ? 'ฟังก์ชันอัปโหลดกำลังพัฒนา' : 'Upload functionality coming soon');
        },

        /**
         * Render skeleton loading state
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="space-y-6">
                    ${SkeletonComponent.renderCardSkeleton({ lines: 3 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 3 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 4 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 3 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 3 })}
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileDetailsPage;
}
