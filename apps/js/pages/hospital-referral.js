/**
 * Hospital Referral Page
 * Employee self-service hospital referral request functionality
 */

const HospitalReferralPage = (function() {
    let activeTab = 'new-request';
    let referralRequests = [];
    let isSubmitting = false;

    // Mock hospital data
    const HOSPITALS = [
        { id: 'BH001', name: 'Bangkok Hospital', nameEn: 'Bangkok Hospital', nameTh: 'โรงพยาบาลกรุงเทพ' },
        { id: 'BH002', name: 'Bumrungrad International Hospital', nameEn: 'Bumrungrad International Hospital', nameTh: 'โรงพยาบาลบำรุงราษฎร์' },
        { id: 'BH003', name: 'Samitivej Hospital', nameEn: 'Samitivej Hospital', nameTh: 'โรงพยาบาลสมิติเวช' },
        { id: 'BH004', name: 'Praram 9 Hospital', nameEn: 'Praram 9 Hospital', nameTh: 'โรงพยาบาลพระรามเก้า' },
        { id: 'BH005', name: 'Phyathai Hospital', nameEn: 'Phyathai Hospital', nameTh: 'โรงพยาบาลพยาไท' },
        { id: 'BH006', name: 'Vejthani Hospital', nameEn: 'Vejthani Hospital', nameTh: 'โรงพยาบาลเวชธานี' }
    ];

    // Mock referral data
    const MOCK_REFERRALS = [
        {
            id: 'REF-2026-001',
            hospitalId: 'BH001',
            hospitalName: 'Bangkok Hospital',
            reason: 'Annual health checkup',
            preferredDate: '2026-02-15',
            urgency: 'routine',
            status: 'approved',
            submittedOn: '2026-02-01',
            notes: ''
        },
        {
            id: 'REF-2026-002',
            hospitalId: 'BH002',
            hospitalName: 'Bumrungrad International Hospital',
            reason: 'Specialist consultation for back pain',
            preferredDate: '2026-03-10',
            urgency: 'urgent',
            status: 'pending',
            submittedOn: '2026-02-20',
            notes: 'Chronic lower back pain for 3 months'
        }
    ];

    return {
        /**
         * Render the hospital referral page
         * @returns {string}
         */
        render() {
            const isThai = i18n.isThai();

            const tabs = [
                { id: 'new-request', icon: 'add_circle', label: i18n.t('hospitalReferral.newRequest') },
                { id: 'my-referrals', icon: 'history', label: i18n.t('hospitalReferral.myReferrals') }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('hospitalReferral.title')}</h1>
                    </div>

                    <!-- Tabs Navigation -->
                    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto" role="tablist" aria-label="${i18n.t('hospitalReferral.title')}">
                        ${tabs.map(tab => `
                            <button onclick="HospitalReferralPage.switchTab('${tab.id}')"
                                    id="tab-btn-${tab.id}"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition whitespace-nowrap min-h-[44px]
                                        ${activeTab === tab.id ? 'bg-white text-cg-red shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                                    role="tab"
                                    aria-selected="${activeTab === tab.id}">
                                <span class="material-icons text-sm">${tab.icon}</span>
                                <span>${tab.label}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Tab Content -->
                    <div id="referral-tab-content">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Render active tab content
         * @returns {string}
         */
        renderTabContent() {
            switch (activeTab) {
                case 'new-request':
                    return this.renderNewRequestTab();
                case 'my-referrals':
                    return this.renderMyReferralsTab();
                default:
                    return this.renderNewRequestTab();
            }
        },

        /**
         * Render the new referral request form
         * @returns {string}
         */
        renderNewRequestTab() {
            const isThai = i18n.isThai();
            const hospitalOptions = HOSPITALS.map(h => `
                <option value="${h.id}">${isThai ? h.nameTh : h.nameEn}</option>
            `).join('');

            return `
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-6">
                        <span class="material-icons text-cg-red mr-2 align-middle">local_hospital</span>
                        ${i18n.t('hospitalReferral.newRequest')}
                    </h2>

                    <form id="referral-form" onsubmit="HospitalReferralPage.submitReferral(event)" novalidate>
                        <div class="space-y-5">
                            <!-- Hospital Selection -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="referral-hospital">
                                    ${i18n.t('hospitalReferral.selectHospital')}
                                    <span class="text-red-500 ml-1">*</span>
                                </label>
                                <select id="referral-hospital"
                                        name="hospital"
                                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cg-red focus:border-transparent"
                                        required>
                                    <option value="">${isThai ? '-- เลือกโรงพยาบาล --' : '-- Select Hospital --'}</option>
                                    ${hospitalOptions}
                                </select>
                                <p id="hospital-error" class="mt-1 text-sm text-red-600 hidden">${i18n.t('hospitalReferral.errorRequired')}</p>
                            </div>

                            <!-- Reason for Visit -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="referral-reason">
                                    ${i18n.t('hospitalReferral.reasonForVisit')}
                                    <span class="text-red-500 ml-1">*</span>
                                </label>
                                <textarea id="referral-reason"
                                          name="reason"
                                          rows="3"
                                          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cg-red focus:border-transparent"
                                          placeholder="${isThai ? 'อธิบายอาการหรือเหตุผลในการพบแพทย์...' : 'Describe your symptoms or reason for the visit...'}"
                                          required></textarea>
                                <p id="reason-error" class="mt-1 text-sm text-red-600 hidden">${i18n.t('hospitalReferral.errorRequired')}</p>
                            </div>

                            <!-- Preferred Date -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="referral-date">
                                    ${i18n.t('hospitalReferral.preferredDate')}
                                    <span class="text-red-500 ml-1">*</span>
                                </label>
                                <input id="referral-date"
                                       type="date"
                                       name="preferredDate"
                                       class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cg-red focus:border-transparent"
                                       min="${new Date().toISOString().split('T')[0]}"
                                       required>
                                <p id="date-error" class="mt-1 text-sm text-red-600 hidden">${i18n.t('hospitalReferral.errorRequired')}</p>
                            </div>

                            <!-- Urgency Level -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="referral-urgency">
                                    ${i18n.t('hospitalReferral.urgencyLevel')}
                                </label>
                                <div class="flex gap-3 flex-wrap">
                                    ${['routine', 'urgent', 'emergency'].map(level => `
                                        <label class="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="urgency" value="${level}"
                                                   ${level === 'routine' ? 'checked' : ''}
                                                   class="text-cg-red focus:ring-cg-red">
                                            <span class="text-sm text-gray-700">${i18n.t('hospitalReferral.urgency.' + level)}</span>
                                        </label>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Additional Notes -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1" for="referral-notes">
                                    ${i18n.t('hospitalReferral.additionalNotes')}
                                </label>
                                <textarea id="referral-notes"
                                          name="notes"
                                          rows="2"
                                          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cg-red focus:border-transparent"
                                          placeholder="${isThai ? 'ข้อมูลเพิ่มเติม (ไม่บังคับ)' : 'Additional information (optional)'}"></textarea>
                            </div>
                        </div>

                        <!-- Form Actions -->
                        <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                            <button type="button"
                                    onclick="HospitalReferralPage.resetForm()"
                                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                ${isThai ? 'ล้างข้อมูล' : 'Clear'}
                            </button>
                            <button type="submit"
                                    id="submit-referral-btn"
                                    class="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-cg-red border border-transparent rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                                <span class="material-icons text-sm">send</span>
                                ${i18n.t('hospitalReferral.submitRequest')}
                            </button>
                        </div>
                    </form>

                    <!-- Success Message (hidden by default) -->
                    <div id="referral-success" class="hidden mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <span class="material-icons text-green-600">check_circle</span>
                        <p class="text-sm text-green-800">${i18n.t('hospitalReferral.successMessage')}</p>
                    </div>
                </div>
            `;
        },

        /**
         * Render referral history tab
         * @returns {string}
         */
        renderMyReferralsTab() {
            const isThai = i18n.isThai();
            const allReferrals = [...MOCK_REFERRALS, ...referralRequests];

            if (allReferrals.length === 0) {
                return `
                    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <span class="material-icons text-6xl text-gray-300 mb-4 block">local_hospital</span>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">${i18n.t('hospitalReferral.noReferrals')}</h3>
                        <p class="text-sm text-gray-500 mb-6">${i18n.t('hospitalReferral.createFirst')}</p>
                        <button onclick="HospitalReferralPage.switchTab('new-request')"
                                class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cg-red rounded-lg hover:bg-red-700 transition">
                            <span class="material-icons text-sm">add</span>
                            ${i18n.t('hospitalReferral.newRequest')}
                        </button>
                    </div>
                `;
            }

            const statusBadge = (status) => {
                const configs = {
                    pending: 'bg-yellow-100 text-yellow-800',
                    approved: 'bg-green-100 text-green-800',
                    rejected: 'bg-red-100 text-red-800',
                    completed: 'bg-blue-100 text-blue-800'
                };
                return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${configs[status] || 'bg-gray-100 text-gray-800'}">
                    ${i18n.t('hospitalReferral.status.' + status) || status}
                </span>`;
            };

            return `
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="p-4 border-b border-gray-100">
                        <h2 class="text-lg font-semibold text-gray-900">
                            <span class="material-icons text-cg-red mr-2 align-middle">history</span>
                            ${i18n.t('hospitalReferral.myReferrals')}
                        </h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200" id="referrals-table">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('hospitalReferral.referralId')}</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('hospitalReferral.hospital')}</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('hospitalReferral.preferredDate')}</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('hospitalReferral.urgencyLevel')}</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${isThai ? 'สถานะ' : 'Status'}</th>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('hospitalReferral.submittedOn')}</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${allReferrals.map(ref => `
                                    <tr class="hover:bg-gray-50 cursor-pointer" onclick="HospitalReferralPage.viewReferral('${ref.id}')">
                                        <td class="px-4 py-3 text-sm font-medium text-cg-red">${ref.id}</td>
                                        <td class="px-4 py-3 text-sm text-gray-900">${ref.hospitalName}</td>
                                        <td class="px-4 py-3 text-sm text-gray-600">${ref.preferredDate}</td>
                                        <td class="px-4 py-3 text-sm text-gray-600">${i18n.t('hospitalReferral.urgency.' + ref.urgency)}</td>
                                        <td class="px-4 py-3">${statusBadge(ref.status)}</td>
                                        <td class="px-4 py-3 text-sm text-gray-600">${ref.submittedOn}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        /**
         * Switch between tabs
         * @param {string} tabId
         */
        switchTab(tabId) {
            activeTab = tabId;
            const container = document.getElementById('referral-tab-content');
            if (container) {
                container.innerHTML = this.renderTabContent();
            }

            // Update tab button styles
            ['new-request', 'my-referrals'].forEach(id => {
                const btn = document.getElementById('tab-btn-' + id);
                if (btn) {
                    if (id === tabId) {
                        btn.className = btn.className.replace('text-gray-600 hover:text-gray-900', 'bg-white text-cg-red shadow-sm');
                        btn.setAttribute('aria-selected', 'true');
                    } else {
                        btn.className = btn.className.replace('bg-white text-cg-red shadow-sm', 'text-gray-600 hover:text-gray-900');
                        btn.setAttribute('aria-selected', 'false');
                    }
                }
            });
        },

        /**
         * Submit the referral request form
         * @param {Event} event
         */
        submitReferral(event) {
            event.preventDefault();
            if (isSubmitting) return;

            const form = document.getElementById('referral-form');
            const hospitalEl = document.getElementById('referral-hospital');
            const reasonEl = document.getElementById('referral-reason');
            const dateEl = document.getElementById('referral-date');

            // Validate
            let hasError = false;

            if (!hospitalEl.value) {
                document.getElementById('hospital-error').classList.remove('hidden');
                hasError = true;
            } else {
                document.getElementById('hospital-error').classList.add('hidden');
            }

            if (!reasonEl.value.trim()) {
                document.getElementById('reason-error').classList.remove('hidden');
                hasError = true;
            } else {
                document.getElementById('reason-error').classList.add('hidden');
            }

            if (!dateEl.value) {
                document.getElementById('date-error').classList.remove('hidden');
                hasError = true;
            } else {
                document.getElementById('date-error').classList.add('hidden');
            }

            if (hasError) return;

            // Get selected hospital name
            const selectedHospital = HOSPITALS.find(h => h.id === hospitalEl.value);
            const urgencyEl = form.querySelector('input[name="urgency"]:checked');
            const notesEl = document.getElementById('referral-notes');

            // Create new referral
            const newReferral = {
                id: 'REF-' + new Date().getFullYear() + '-' + String(referralRequests.length + MOCK_REFERRALS.length + 1).padStart(3, '0'),
                hospitalId: hospitalEl.value,
                hospitalName: selectedHospital ? (i18n.isThai() ? selectedHospital.nameTh : selectedHospital.nameEn) : hospitalEl.value,
                reason: reasonEl.value.trim(),
                preferredDate: dateEl.value,
                urgency: urgencyEl ? urgencyEl.value : 'routine',
                status: 'pending',
                submittedOn: new Date().toISOString().split('T')[0],
                notes: notesEl ? notesEl.value.trim() : ''
            };

            referralRequests.push(newReferral);

            // Show success
            form.classList.add('hidden');
            const successEl = document.getElementById('referral-success');
            if (successEl) {
                successEl.classList.remove('hidden');
            }

            // Reset after delay
            setTimeout(() => {
                isSubmitting = false;
                form.classList.remove('hidden');
                if (successEl) successEl.classList.add('hidden');
                form.reset();
                this.switchTab('my-referrals');
            }, 2000);

            isSubmitting = true;
        },

        /**
         * Reset the form
         */
        resetForm() {
            const form = document.getElementById('referral-form');
            if (form) form.reset();
            ['hospital-error', 'reason-error', 'date-error'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.add('hidden');
            });
        },

        /**
         * View referral detail
         * @param {string} referralId
         */
        viewReferral(referralId) {
            const allReferrals = [...MOCK_REFERRALS, ...referralRequests];
            const referral = allReferrals.find(r => r.id === referralId);
            if (!referral) return;

            const isThai = i18n.isThai();
            const statusColors = {
                pending: 'bg-yellow-100 text-yellow-800',
                approved: 'bg-green-100 text-green-800',
                rejected: 'bg-red-100 text-red-800',
                completed: 'bg-blue-100 text-blue-800'
            };

            const content = `
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-xs text-gray-500">${i18n.t('hospitalReferral.referralId')}</p>
                            <p class="text-sm font-medium text-gray-900">${referral.id}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">${isThai ? 'สถานะ' : 'Status'}</p>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[referral.status] || 'bg-gray-100 text-gray-800'}">
                                ${i18n.t('hospitalReferral.status.' + referral.status)}
                            </span>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">${i18n.t('hospitalReferral.hospital')}</p>
                            <p class="text-sm font-medium text-gray-900">${referral.hospitalName}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">${i18n.t('hospitalReferral.preferredDate')}</p>
                            <p class="text-sm font-medium text-gray-900">${referral.preferredDate}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">${i18n.t('hospitalReferral.urgencyLevel')}</p>
                            <p class="text-sm font-medium text-gray-900">${i18n.t('hospitalReferral.urgency.' + referral.urgency)}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">${i18n.t('hospitalReferral.submittedOn')}</p>
                            <p class="text-sm font-medium text-gray-900">${referral.submittedOn}</p>
                        </div>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">${i18n.t('hospitalReferral.reasonForVisit')}</p>
                        <p class="text-sm text-gray-900 mt-1">${referral.reason}</p>
                    </div>
                    ${referral.notes ? `
                        <div>
                            <p class="text-xs text-gray-500">${i18n.t('hospitalReferral.notes')}</p>
                            <p class="text-sm text-gray-900 mt-1">${referral.notes}</p>
                        </div>
                    ` : ''}
                </div>
            `;

            if (typeof ModalComponent !== 'undefined') {
                ModalComponent.show({
                    title: i18n.t('hospitalReferral.viewDetails') + ': ' + referral.id,
                    content,
                    size: 'md'
                });
            }
        },

        /**
         * Initialize page
         */
        init() {
            activeTab = 'new-request';
        }
    };
})();

// Module export guard for test compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HospitalReferralPage;
}
