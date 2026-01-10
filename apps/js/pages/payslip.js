/**
 * Payslip & Tax Documents Page
 * Employee self-service payslip and tax document access
 */

const PayslipPage = (function() {
    let activeTab = 'payslips';
    let payslips = [];
    let taxDocuments = [];
    let showAmounts = false;
    let selectedYear = 'all';
    let selectedPayslip = null;
    let viewMode = 'list'; // 'list' or 'detail'

    return {
        /**
         * Render the payslip page
         * @param {object} params - Route parameters
         * @returns {string}
         */
        render(params = {}) {
            const isLoading = AppState.get('isLoading');
            const hasData = payslips.length > 0;

            if (isLoading && !hasData) {
                return this.renderSkeleton();
            }

            // Define tabs
            const tabs = [
                { id: 'payslips', icon: 'receipt_long', label: i18n.t('payslip.payslipList') },
                { id: 'tax', icon: 'description', label: i18n.t('payslip.taxDocuments') }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('payslip.title')}</h1>
                        ${this.renderAmountToggle()}
                    </div>

                    <!-- Tabs Navigation -->
                    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto" role="tablist">
                        ${tabs.map(tab => `
                            <button onclick="PayslipPage.switchTab('${tab.id}')"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition whitespace-nowrap min-h-[44px]
                                        ${activeTab === tab.id ? 'bg-white text-cg-red shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                                    role="tab"
                                    aria-selected="${activeTab === tab.id}">
                                <span class="material-icons text-sm">${tab.icon}</span>
                                <span class="hidden sm:inline">${tab.label}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Year Filter -->
                    ${this.renderYearFilter()}

                    <!-- Tab Content -->
                    <div id="payslip-tab-content">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Render amount visibility toggle button
         * @returns {string}
         */
        renderAmountToggle() {
            const buttonText = showAmounts ? i18n.t('payslip.hideAmounts') : i18n.t('payslip.showAmounts');
            const icon = showAmounts ? 'visibility_off' : 'visibility';

            return `
                <button onclick="PayslipPage.toggleAmountVisibility()"
                        class="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 ${showAmounts ? 'bg-gray-100 text-gray-700' : 'bg-cg-red text-white'} rounded-lg hover:opacity-90 transition">
                    <span class="material-icons text-sm">${icon}</span>
                    ${buttonText}
                </button>
            `;
        },

        /**
         * Render year filter dropdown
         * @returns {string}
         */
        renderYearFilter() {
            // Get unique years from payslips and tax documents
            const years = new Set();
            payslips.forEach(p => years.add(p.period.year));
            taxDocuments.forEach(d => years.add(d.taxYear));
            const sortedYears = Array.from(years).sort((a, b) => b - a);

            return `
                <div class="flex items-center gap-2 mb-6">
                    <label class="text-sm font-medium text-gray-700">${i18n.t('payslip.filterByYear')}:</label>
                    <select onchange="PayslipPage.filterByYear(this.value)"
                            class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cg-red focus:border-transparent">
                        <option value="all" ${selectedYear === 'all' ? 'selected' : ''}>${i18n.t('payslip.allYears')}</option>
                        ${sortedYears.map(year => `
                            <option value="${year}" ${selectedYear == year ? 'selected' : ''}>${year}</option>
                        `).join('')}
                    </select>
                </div>
            `;
        },

        /**
         * Render active tab content
         * @returns {string}
         */
        renderTabContent() {
            if (activeTab === 'payslips') {
                return viewMode === 'detail' && selectedPayslip
                    ? this.renderPayslipDetail()
                    : this.renderPayslipList();
            } else {
                return this.renderTaxDocuments();
            }
        },

        /**
         * Render payslip list
         * @returns {string}
         */
        renderPayslipList() {
            const isThai = i18n.isThai();
            let filteredPayslips = payslips;

            // Apply year filter
            if (selectedYear && selectedYear !== 'all') {
                filteredPayslips = payslips.filter(p => p.period.year === parseInt(selectedYear));
            }

            if (filteredPayslips.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <span class="material-icons text-5xl mb-4">receipt_long</span>
                        <p class="text-lg">${i18n.t('payslip.noPayslips')}</p>
                    </div>
                `;
            }

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('payslip.period')}
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('payslip.payDate')}
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('payslip.grossPay')}
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('payslip.netPay')}
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('common.actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${filteredPayslips.map(payslip => this.renderPayslipRow(payslip)).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        /**
         * Render a single payslip row
         * @param {object} payslip
         * @returns {string}
         */
        renderPayslipRow(payslip) {
            const isThai = i18n.isThai();
            const periodLabel = isThai ? payslip.period.labelTh : payslip.period.label;
            const payDate = DateUtils.format(payslip.payDate, 'short');
            const grossAmount = this.formatAmount(payslip.earnings.total);
            const netAmount = this.formatAmount(payslip.netPay);

            return `
                <tr class="hover:bg-gray-50 transition cursor-pointer" onclick="PayslipPage.viewPayslipDetail('${payslip.id}')">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                                <span class="material-icons text-blue-600">receipt_long</span>
                            </div>
                            <div>
                                <div class="text-sm font-medium text-gray-900">${periodLabel}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${payDate}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${showAmounts ? 'text-gray-900' : 'text-gray-400'}">
                        ${grossAmount}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${showAmounts ? 'text-green-600' : 'text-gray-400'}">
                        ${netAmount}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onclick="event.stopPropagation(); PayslipPage.downloadPayslip('${payslip.id}')"
                                class="text-cg-red hover:text-red-700 mr-2" title="${i18n.t('payslip.downloadPdf')}">
                            <span class="material-icons">download</span>
                        </button>
                        <button onclick="event.stopPropagation(); PayslipPage.viewPayslipDetail('${payslip.id}')"
                                class="text-blue-600 hover:text-blue-800" title="${i18n.t('payslip.viewDetails')}">
                            <span class="material-icons">visibility</span>
                        </button>
                    </td>
                </tr>
            `;
        },

        /**
         * Render payslip detail view
         * @returns {string}
         */
        renderPayslipDetail() {
            if (!selectedPayslip) {
                return this.renderPayslipList();
            }

            const isThai = i18n.isThai();
            const periodLabel = isThai ? selectedPayslip.period.labelTh : selectedPayslip.period.label;
            const payDate = DateUtils.format(selectedPayslip.payDate, 'short');

            return `
                <div class="space-y-6">
                    <!-- Back Button -->
                    <button onclick="PayslipPage.backToList()"
                            class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                        <span class="material-icons">arrow_back</span>
                        ${i18n.t('payslip.backToList')}
                    </button>

                    <!-- Payslip Header -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                            <div>
                                <h2 class="text-xl font-bold text-gray-900">${periodLabel}</h2>
                                <p class="text-sm text-gray-500">${i18n.t('payslip.payDate')}: ${payDate}</p>
                            </div>
                            <button onclick="PayslipPage.downloadPayslip('${selectedPayslip.id}')"
                                    class="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                                <span class="material-icons text-sm">download</span>
                                ${i18n.t('payslip.downloadPdf')}
                            </button>
                        </div>

                        <!-- Earnings & Deductions Grid -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            ${this.renderEarningsSection(selectedPayslip.earnings)}
                            ${this.renderDeductionsSection(selectedPayslip.deductions)}
                        </div>

                        <!-- Net Pay -->
                        <div class="mt-6 pt-6 border-t border-gray-200">
                            <div class="flex justify-between items-center">
                                <span class="text-lg font-bold text-gray-900">${i18n.t('payslip.netPay')}</span>
                                <span class="text-2xl font-bold ${showAmounts ? 'text-green-600' : 'text-gray-400'}">
                                    ${this.formatAmount(selectedPayslip.netPay)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- YTD Section -->
                    ${this.renderYTDSection(selectedPayslip.ytd)}
                </div>
            `;
        },

        /**
         * Render earnings section
         * @param {object} earnings
         * @returns {string}
         */
        renderEarningsSection(earnings) {
            return `
                <div class="bg-green-50 rounded-lg p-4">
                    <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
                        <span class="material-icons">add_circle</span>
                        ${i18n.t('payslip.earnings')}
                    </h3>
                    <div class="space-y-3">
                        ${this.renderLineItem(i18n.t('payslip.baseSalary'), earnings.baseSalary)}
                        ${this.renderLineItem(i18n.t('payslip.positionAllowance'), earnings.positionAllowance)}
                        ${this.renderLineItem(i18n.t('payslip.colAllowance'), earnings.colAllowance)}
                        ${this.renderLineItem(i18n.t('payslip.overtime'), earnings.overtime)}
                        ${earnings.otherEarnings > 0 ? this.renderLineItem(i18n.t('payslip.otherEarnings'), earnings.otherEarnings) : ''}
                        <div class="pt-3 border-t border-green-200">
                            ${this.renderLineItem(i18n.t('payslip.totalEarnings'), earnings.total, true, 'text-green-800')}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render deductions section
         * @param {object} deductions
         * @returns {string}
         */
        renderDeductionsSection(deductions) {
            return `
                <div class="bg-red-50 rounded-lg p-4">
                    <h3 class="text-lg font-semibold text-red-800 mb-4 flex items-center gap-2">
                        <span class="material-icons">remove_circle</span>
                        ${i18n.t('payslip.deductions')}
                    </h3>
                    <div class="space-y-3">
                        ${this.renderLineItem(i18n.t('payslip.incomeTax'), deductions.tax)}
                        ${this.renderLineItem(i18n.t('payslip.socialSecurity'), deductions.socialSecurity)}
                        ${this.renderLineItem(i18n.t('payslip.providentFund'), deductions.providentFund)}
                        ${deductions.loans > 0 ? this.renderLineItem(i18n.t('payslip.loans'), deductions.loans) : ''}
                        ${deductions.otherDeductions > 0 ? this.renderLineItem(i18n.t('payslip.otherDeductions'), deductions.otherDeductions) : ''}
                        <div class="pt-3 border-t border-red-200">
                            ${this.renderLineItem(i18n.t('payslip.totalDeductions'), deductions.total, true, 'text-red-800')}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render YTD section
         * @param {object} ytd
         * @returns {string}
         */
        renderYTDSection(ytd) {
            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span class="material-icons">trending_up</span>
                        ${i18n.t('payslip.ytd')}
                    </h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <p class="text-sm text-gray-500 mb-1">${i18n.t('payslip.ytdGross')}</p>
                            <p class="text-lg font-bold ${showAmounts ? 'text-gray-900' : 'text-gray-400'}">
                                ${this.formatAmount(ytd.grossPay)}
                            </p>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <p class="text-sm text-gray-500 mb-1">${i18n.t('payslip.ytdTax')}</p>
                            <p class="text-lg font-bold ${showAmounts ? 'text-red-600' : 'text-gray-400'}">
                                ${this.formatAmount(ytd.tax)}
                            </p>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <p class="text-sm text-gray-500 mb-1">${i18n.t('payslip.ytdSocialSecurity')}</p>
                            <p class="text-lg font-bold ${showAmounts ? 'text-blue-600' : 'text-gray-400'}">
                                ${this.formatAmount(ytd.socialSecurity)}
                            </p>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg">
                            <p class="text-sm text-gray-500 mb-1">${i18n.t('payslip.providentFund')}</p>
                            <p class="text-lg font-bold ${showAmounts ? 'text-purple-600' : 'text-gray-400'}">
                                ${this.formatAmount(ytd.providentFund)}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render a single line item
         * @param {string} label
         * @param {number} amount
         * @param {boolean} isBold
         * @param {string} colorClass
         * @returns {string}
         */
        renderLineItem(label, amount, isBold = false, colorClass = '') {
            const amountClass = showAmounts ? (colorClass || 'text-gray-900') : 'text-gray-400';
            const fontClass = isBold ? 'font-bold' : 'font-medium';

            return `
                <div class="flex justify-between items-center">
                    <span class="${isBold ? 'font-semibold' : ''} text-gray-700">${label}</span>
                    <span class="${fontClass} ${amountClass}">${this.formatAmount(amount)}</span>
                </div>
            `;
        },

        /**
         * Render tax documents list
         * @returns {string}
         */
        renderTaxDocuments() {
            const isThai = i18n.isThai();
            let filteredDocs = taxDocuments;

            // Apply year filter
            if (selectedYear && selectedYear !== 'all') {
                filteredDocs = taxDocuments.filter(d => d.taxYear === parseInt(selectedYear));
            }

            if (filteredDocs.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <span class="material-icons text-5xl mb-4">description</span>
                        <p class="text-lg">${i18n.t('payslip.noTaxDocuments')}</p>
                    </div>
                `;
            }

            // Group by year
            const groupedByYear = filteredDocs.reduce((acc, doc) => {
                if (!acc[doc.taxYear]) {
                    acc[doc.taxYear] = [];
                }
                acc[doc.taxYear].push(doc);
                return acc;
            }, {});

            return `
                <div class="space-y-6">
                    ${Object.keys(groupedByYear).sort((a, b) => b - a).map(year => `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
                                <h3 class="text-lg font-semibold text-gray-900">${i18n.t('payslip.year')}: ${year}</h3>
                            </div>
                            <div class="divide-y divide-gray-200">
                                ${groupedByYear[year].map(doc => this.renderTaxDocumentRow(doc)).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Audit Note -->
                <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p class="text-sm text-yellow-800 flex items-center gap-2">
                        <span class="material-icons text-sm">info</span>
                        ${i18n.t('payslip.downloadAuditNote')}
                    </p>
                </div>
            `;
        },

        /**
         * Render a single tax document row
         * @param {object} doc
         * @returns {string}
         */
        renderTaxDocumentRow(doc) {
            const isThai = i18n.isThai();
            const docName = isThai ? doc.typeNameTh : doc.typeNameEn;
            const issueDate = DateUtils.format(doc.issueDate, 'short');

            // Get icon based on type
            let icon = 'description';
            if (doc.type === 'withholding_cert') icon = 'receipt';
            else if (doc.type === 'social_security') icon = 'health_and_safety';
            else if (doc.type === 'provident_fund') icon = 'savings';

            return `
                <div class="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                            <span class="material-icons text-blue-600">${icon}</span>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">${docName}</p>
                            <p class="text-xs text-gray-500">${i18n.t('payslip.issueDate')}: ${issueDate}</p>
                        </div>
                    </div>
                    <button onclick="PayslipPage.downloadTaxDocument('${doc.id}')"
                            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cg-red bg-red-50 rounded-lg hover:bg-red-100 transition">
                        <span class="material-icons text-sm">download</span>
                        ${i18n.t('payslip.downloadPdf')}
                    </button>
                </div>
            `;
        },

        /**
         * Format amount based on visibility setting
         * @param {number} amount
         * @returns {string}
         */
        formatAmount(amount) {
            if (showAmounts) {
                return MaskUtils.currency(amount);
            } else {
                return MaskUtils.salary(amount, true);
            }
        },

        /**
         * Toggle amount visibility
         */
        toggleAmountVisibility() {
            if (!showAmounts) {
                // Show confirmation before revealing amounts
                this.confirmShowAmounts();
            } else {
                // Hide amounts directly
                showAmounts = false;
                this.rerender();
            }
        },

        /**
         * Show confirmation modal before revealing amounts
         */
        confirmShowAmounts() {
            ModalComponent.confirm({
                title: i18n.t('payslip.showAmounts'),
                message: i18n.t('payslip.confirmShowAmounts'),
                confirmText: i18n.t('payslip.showAmounts'),
                cancelText: i18n.t('common.cancel'),
                onConfirm: () => {
                    showAmounts = true;

                    // Log document access (viewing amounts)
                    const employee = AppState.get('currentEmployee');
                    if (employee) {
                        API.logDocumentAccess(employee.employeeId, 'payslip_amounts', 'all', 'view');
                    }

                    this.rerender();
                }
            });
        },

        /**
         * Filter by year
         * @param {string} year
         */
        filterByYear(year) {
            selectedYear = year;
            this.rerender();
        },

        /**
         * Switch tab
         * @param {string} tab
         */
        switchTab(tab) {
            activeTab = tab;
            viewMode = 'list';
            selectedPayslip = null;
            this.rerender();
        },

        /**
         * View payslip detail
         * @param {string} payslipId
         */
        async viewPayslipDetail(payslipId) {
            try {
                const employee = AppState.get('currentEmployee');
                selectedPayslip = await API.getPayslipDetail(employee.employeeId, payslipId);
                viewMode = 'detail';
                this.rerender();
            } catch (error) {
                console.error('Error loading payslip detail:', error);
                ToastComponent.error(i18n.t('error.loadFailed'));
            }
        },

        /**
         * Go back to list view
         */
        backToList() {
            viewMode = 'list';
            selectedPayslip = null;
            this.rerender();
        },

        /**
         * Download payslip PDF
         * @param {string} payslipId
         */
        async downloadPayslip(payslipId) {
            try {
                const employee = AppState.get('currentEmployee');

                // Show toast about download
                ToastComponent.info(i18n.t('toast.downloadStarted'));

                // Get the blob from API
                const blob = await API.downloadPayslipPdf(employee.employeeId, payslipId);

                // Find payslip for filename
                const payslip = payslips.find(p => p.id === payslipId);
                const filename = payslip
                    ? `payslip_${payslip.period.year}_${String(payslip.period.month).padStart(2, '0')}.pdf`
                    : `payslip_${payslipId}.pdf`;

                // Trigger download
                this.triggerDownload(blob, filename);
            } catch (error) {
                console.error('Error downloading payslip:', error);
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Download tax document PDF
         * @param {string} docId
         */
        async downloadTaxDocument(docId) {
            try {
                const employee = AppState.get('currentEmployee');

                // Show toast about download
                ToastComponent.info(i18n.t('toast.downloadStarted'));

                // Get the blob from API
                const blob = await API.downloadTaxDocumentPdf(employee.employeeId, docId);

                // Find document for filename
                const doc = taxDocuments.find(d => d.id === docId);
                const filename = doc
                    ? `${doc.type}_${doc.taxYear}.pdf`
                    : `tax_document_${docId}.pdf`;

                // Trigger download
                this.triggerDownload(blob, filename);
            } catch (error) {
                console.error('Error downloading tax document:', error);
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Trigger file download
         * @param {Blob} blob
         * @param {string} filename
         */
        triggerDownload(blob, filename) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },

        /**
         * Re-render the page content
         */
        rerender() {
            const content = document.getElementById('main-content');
            if (content) {
                content.innerHTML = this.render();
            }
        },

        /**
         * Load data from API
         */
        async loadData() {
            try {
                const employee = AppState.get('currentEmployee');
                if (!employee) return;

                // Load payslips and tax documents in parallel
                const [payslipData, taxDocData] = await Promise.all([
                    API.getPayslipList(employee.employeeId),
                    API.getTaxDocuments(employee.employeeId)
                ]);

                payslips = payslipData || [];
                taxDocuments = taxDocData || [];
            } catch (error) {
                console.error('Error loading payslip data:', error);
                ToastComponent.error(i18n.t('error.loadFailed'));
            }
        },

        /**
         * Initialize page
         * @param {object} params - Route parameters
         */
        async init(params = {}) {
            // Reset state
            activeTab = 'payslips';
            viewMode = 'list';
            selectedPayslip = null;
            showAmounts = false;
            selectedYear = 'all';

            // Check if viewing a specific month
            if (params && params.month) {
                const [year, month] = params.month.split('-');
                if (year && month) {
                    const payslipId = `ps_${year}${month.padStart(2, '0')}`;
                    selectedYear = year;
                    await this.loadData();
                    await this.viewPayslipDetail(payslipId);
                    return;
                }
            }

            // Load data
            await this.loadData();

            // Re-render the page content after data is loaded
            const content = document.getElementById('main-content');
            if (content) {
                content.innerHTML = this.render();
            }
        },

        /**
         * Render skeleton loading state
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="skeleton shimmer" style="width: 250px; height: 32px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 48px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 200px; height: 40px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        ${[1, 2, 3, 4, 5, 6].map(() => `
                            <div class="px-6 py-4 border-b border-gray-200">
                                <div class="skeleton shimmer" style="width: 100%; height: 48px;"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PayslipPage;
}
