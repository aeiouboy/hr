/**
 * Payroll Setup Page
 * Payroll master configuration for earning types, deduction types, tax settings, and bank information
 */

const PayrollSetupPage = (function() {
    let activeTab = 'earnings';
    let earningTypes = [];
    let deductionTypes = [];
    let taxBrackets = {};
    let banks = [];
    let companySettings = {};
    let isDataLoading = false;

    return {
        /**
         * Render the payroll setup page
         * @returns {string}
         */
        render() {
            // Check if data has been loaded (not relying on isLoading flag to avoid race condition)
            const hasData = earningTypes.length > 0 || deductionTypes.length > 0 || banks.length > 0;

            if (!hasData) {
                // If no data yet, trigger load and show skeleton
                if (!isDataLoading) {
                    isDataLoading = true;
                    this.loadData().then(() => {
                        isDataLoading = false;
                        Router.refresh();
                    });
                }
                return this.renderSkeleton();
            }

            const isThai = i18n.isThai();

            // Define tabs
            const tabs = [
                { id: 'earnings', icon: 'add_circle', label: i18n.t('payrollSetup.tabs.earnings') },
                { id: 'deductions', icon: 'remove_circle', label: i18n.t('payrollSetup.tabs.deductions') },
                { id: 'tax', icon: 'account_balance', label: i18n.t('payrollSetup.tabs.tax') },
                { id: 'banks', icon: 'business', label: i18n.t('payrollSetup.tabs.banks') }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">${i18n.t('payrollSetup.title')}</h1>
                            <p class="text-sm text-gray-500 mt-1">${i18n.t('payrollSetup.subtitle')}</p>
                        </div>
                        ${this.renderCompanyInfo()}
                    </div>

                    <!-- Tabs Navigation -->
                    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto" role="tablist" aria-label="${i18n.t('payrollSetup.tabsLabel')}">
                        ${tabs.map(tab => `
                            <button onclick="PayrollSetupPage.switchTab('${tab.id}')"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition whitespace-nowrap min-h-[44px]
                                        ${activeTab === tab.id ? 'bg-white text-cg-red shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                                    role="tab"
                                    id="tab-${tab.id}"
                                    aria-selected="${activeTab === tab.id}"
                                    aria-controls="panel-${tab.id}">
                                <span class="material-icons text-sm" aria-hidden="true">${tab.icon}</span>
                                <span class="hidden sm:inline">${tab.label}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Tab Content -->
                    <div id="payroll-tab-content" role="tabpanel" aria-labelledby="tab-${activeTab}">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Render company info badge
         * @returns {string}
         */
        renderCompanyInfo() {
            const isThai = i18n.isThai();
            const companyName = isThai ? companySettings.companyNameTh : companySettings.companyName;

            return `
                <div class="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <span class="material-icons text-gray-500" aria-hidden="true">business</span>
                    <div class="text-sm">
                        <span class="text-gray-500">${i18n.t('payrollSetup.company')}:</span>
                        <span class="font-medium text-gray-900 ml-1">${companyName || 'RIS'}</span>
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
                case 'earnings':
                    return this.renderEarningsTab();
                case 'deductions':
                    return this.renderDeductionsTab();
                case 'tax':
                    return this.renderTaxTab();
                case 'banks':
                    return this.renderBanksTab();
                default:
                    return this.renderEarningsTab();
            }
        },

        /**
         * Render earnings tab
         * @returns {string}
         */
        renderEarningsTab() {
            const isThai = i18n.isThai();
            const categories = MockPayrollData.earningCategories || [];

            // Group earnings by category
            const groupedEarnings = {};
            categories.forEach(cat => {
                groupedEarnings[cat.code] = earningTypes.filter(e => e.category === cat.code);
            });

            return `
                <div class="space-y-6">
                    <!-- Summary Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        ${this.renderSummaryCard(
                            'payments',
                            i18n.t('payrollSetup.earnings.totalTypes'),
                            earningTypes.length,
                            'text-green-600 bg-green-100'
                        )}
                        ${this.renderSummaryCard(
                            'check_circle',
                            i18n.t('payrollSetup.earnings.active'),
                            earningTypes.filter(e => e.isActive).length,
                            'text-blue-600 bg-blue-100'
                        )}
                        ${this.renderSummaryCard(
                            'receipt',
                            i18n.t('payrollSetup.earnings.taxable'),
                            earningTypes.filter(e => e.taxable).length,
                            'text-orange-600 bg-orange-100'
                        )}
                        ${this.renderSummaryCard(
                            'security',
                            i18n.t('payrollSetup.earnings.socialSecurityIncluded'),
                            earningTypes.filter(e => e.includeInSocialSecurity).length,
                            'text-purple-600 bg-purple-100'
                        )}
                    </div>

                    <!-- Earning Types List by Category -->
                    ${categories.map(cat => {
                        const items = groupedEarnings[cat.code] || [];
                        if (items.length === 0) return '';

                        return `
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                    <h2 class="text-lg font-semibold text-gray-900">
                                        ${isThai ? cat.nameTh : cat.nameEn}
                                        <span class="ml-2 text-sm font-normal text-gray-500">(${items.length})</span>
                                    </h2>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="min-w-full divide-y divide-gray-200" role="table" aria-label="${isThai ? cat.nameTh : cat.nameEn}">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.earnings.code')}
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.earnings.name')}
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.earnings.taxable')}
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.earnings.sso')}
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.earnings.pvd')}
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.status')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            ${items.map(item => this.renderEarningRow(item)).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        },

        /**
         * Render earning row
         * @param {object} item
         * @returns {string}
         */
        renderEarningRow(item) {
            const isThai = i18n.isThai();
            const name = isThai ? item.nameTh : item.nameEn;
            const description = isThai ? item.descriptionTh : item.description;

            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono">${item.code}</code>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm font-medium text-gray-900">${name}</div>
                        <div class="text-xs text-gray-500">${description || ''}</div>
                    </td>
                    <td class="px-6 py-4 text-center">
                        ${this.renderBooleanBadge(item.taxable)}
                    </td>
                    <td class="px-6 py-4 text-center">
                        ${this.renderBooleanBadge(item.includeInSocialSecurity)}
                    </td>
                    <td class="px-6 py-4 text-center">
                        ${this.renderBooleanBadge(item.includeInProvidentFund)}
                    </td>
                    <td class="px-6 py-4 text-center">
                        ${item.isActive
                            ? `<span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">${i18n.t('payrollSetup.active')}</span>`
                            : `<span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">${i18n.t('payrollSetup.inactive')}</span>`
                        }
                    </td>
                </tr>
            `;
        },

        /**
         * Render deductions tab
         * @returns {string}
         */
        renderDeductionsTab() {
            const isThai = i18n.isThai();
            const categories = MockPayrollData.deductionCategories || [];

            // Group deductions by category
            const groupedDeductions = {};
            categories.forEach(cat => {
                groupedDeductions[cat.code] = deductionTypes.filter(d => d.category === cat.code);
            });

            return `
                <div class="space-y-6">
                    <!-- Summary Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        ${this.renderSummaryCard(
                            'remove_circle',
                            i18n.t('payrollSetup.deductions.totalTypes'),
                            deductionTypes.length,
                            'text-red-600 bg-red-100'
                        )}
                        ${this.renderSummaryCard(
                            'gavel',
                            i18n.t('payrollSetup.deductions.mandatory'),
                            deductionTypes.filter(d => d.mandatory).length,
                            'text-orange-600 bg-orange-100'
                        )}
                        ${this.renderSummaryCard(
                            'check_circle',
                            i18n.t('payrollSetup.deductions.active'),
                            deductionTypes.filter(d => d.isActive).length,
                            'text-blue-600 bg-blue-100'
                        )}
                        ${this.renderSummaryCard(
                            'account_balance',
                            i18n.t('payrollSetup.deductions.loanTypes'),
                            deductionTypes.filter(d => d.category === 'loan').length,
                            'text-purple-600 bg-purple-100'
                        )}
                    </div>

                    <!-- Deduction Types List by Category -->
                    ${categories.map(cat => {
                        const items = groupedDeductions[cat.code] || [];
                        if (items.length === 0) return '';

                        return `
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                    <h2 class="text-lg font-semibold text-gray-900">
                                        ${isThai ? cat.nameTh : cat.nameEn}
                                        <span class="ml-2 text-sm font-normal text-gray-500">(${items.length})</span>
                                    </h2>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="min-w-full divide-y divide-gray-200" role="table" aria-label="${isThai ? cat.nameTh : cat.nameEn}">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.deductions.code')}
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.deductions.name')}
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.deductions.calcType')}
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.deductions.rate')}
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.deductions.mandatory')}
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ${i18n.t('payrollSetup.status')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            ${items.map(item => this.renderDeductionRow(item)).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        },

        /**
         * Render deduction row
         * @param {object} item
         * @returns {string}
         */
        renderDeductionRow(item) {
            const isThai = i18n.isThai();
            const name = isThai ? item.nameTh : item.nameEn;
            const description = isThai ? item.descriptionTh : item.description;
            const calcTypeLabel = i18n.t(`payrollSetup.calcTypes.${item.calculationType}`) || item.calculationType;

            let rateDisplay = '-';
            if (item.rate !== undefined) {
                rateDisplay = `${item.rate}%`;
                if (item.maxAmount) {
                    rateDisplay += ` (${i18n.t('payrollSetup.max')}: ${this.formatCurrency(item.maxAmount)})`;
                }
            }

            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <code class="px-2 py-1 bg-gray-100 rounded text-sm font-mono">${item.code}</code>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm font-medium text-gray-900">${name}</div>
                        <div class="text-xs text-gray-500">${description || ''}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        ${calcTypeLabel}
                    </td>
                    <td class="px-6 py-4 text-center text-sm text-gray-600">
                        ${rateDisplay}
                    </td>
                    <td class="px-6 py-4 text-center">
                        ${this.renderBooleanBadge(item.mandatory, i18n.t('payrollSetup.yes'), i18n.t('payrollSetup.no'))}
                    </td>
                    <td class="px-6 py-4 text-center">
                        ${item.isActive
                            ? `<span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">${i18n.t('payrollSetup.active')}</span>`
                            : `<span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">${i18n.t('payrollSetup.inactive')}</span>`
                        }
                    </td>
                </tr>
            `;
        },

        /**
         * Render tax tab
         * @returns {string}
         */
        renderTaxTab() {
            const isThai = i18n.isThai();
            const brackets = taxBrackets.brackets || [];
            const deductions = taxBrackets.standardDeductions || {};
            const ssoConfig = MockPayrollData.socialSecurityConfig || {};
            const pvdConfig = MockPayrollData.providentFundConfig || {};

            return `
                <div class="space-y-6">
                    <!-- Tax Year Header -->
                    <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
                        <div class="flex items-center gap-3">
                            <span class="material-icons text-3xl" aria-hidden="true">account_balance</span>
                            <div>
                                <h2 class="text-xl font-bold">${i18n.t('payrollSetup.tax.title')}</h2>
                                <p class="text-blue-100">${isThai ? taxBrackets.descriptionTh : taxBrackets.description}</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Tax Brackets -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="text-lg font-semibold text-gray-900">${i18n.t('payrollSetup.tax.brackets')}</h3>
                                <p class="text-sm text-gray-500">${i18n.t('payrollSetup.tax.progressiveRates')}</p>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200" role="table" aria-label="${i18n.t('payrollSetup.tax.brackets')}">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ${i18n.t('payrollSetup.tax.incomeRange')}
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                ${i18n.t('payrollSetup.tax.rate')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        ${brackets.map((bracket, index) => `
                                            <tr class="hover:bg-gray-50 ${bracket.rate === 0 ? 'bg-green-50' : ''}">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    ${this.formatCurrency(bracket.minIncome)} - ${bracket.maxIncome ? this.formatCurrency(bracket.maxIncome) : i18n.t('payrollSetup.tax.andAbove')}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-right">
                                                    ${bracket.rate === 0
                                                        ? `<span class="text-green-600 font-medium">${isThai ? bracket.labelTh : bracket.label}</span>`
                                                        : `<span class="font-medium">${bracket.rate}%</span>`
                                                    }
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Standard Deductions -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="text-lg font-semibold text-gray-900">${i18n.t('payrollSetup.tax.deductions')}</h3>
                                <p class="text-sm text-gray-500">${i18n.t('payrollSetup.tax.allowableDeductions')}</p>
                            </div>
                            <div class="p-6">
                                <dl class="space-y-4">
                                    ${this.renderDeductionItem(i18n.t('payrollSetup.tax.personalAllowance'), deductions.personal)}
                                    ${this.renderDeductionItem(i18n.t('payrollSetup.tax.spouseAllowance'), deductions.spouse)}
                                    ${this.renderDeductionItem(i18n.t('payrollSetup.tax.childAllowance'), deductions.childPerPerson, i18n.t('payrollSetup.tax.perPerson'))}
                                    ${this.renderDeductionItem(i18n.t('payrollSetup.tax.parentAllowance'), deductions.parentPerPerson, i18n.t('payrollSetup.tax.perPerson'))}
                                    ${this.renderDeductionItem(i18n.t('payrollSetup.tax.lifeInsurance'), deductions.lifeInsuranceMax, i18n.t('payrollSetup.tax.max'))}
                                    ${this.renderDeductionItem(i18n.t('payrollSetup.tax.healthInsurance'), deductions.healthInsuranceMax, i18n.t('payrollSetup.tax.max'))}
                                    ${this.renderDeductionItem(i18n.t('payrollSetup.tax.providentFund'), deductions.providentFundMax, i18n.t('payrollSetup.tax.max'))}
                                    ${this.renderDeductionItem(i18n.t('payrollSetup.tax.socialSecurity'), deductions.socialSecurityMax, i18n.t('payrollSetup.tax.max'))}
                                    ${this.renderDeductionItem(i18n.t('payrollSetup.tax.homeLoanInterest'), deductions.homeLoanInterestMax, i18n.t('payrollSetup.tax.max'))}
                                </dl>
                            </div>
                        </div>
                    </div>

                    <!-- Social Security & Provident Fund -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Social Security Config -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div class="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span class="material-icons text-blue-600" aria-hidden="true">security</span>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">${i18n.t('payrollSetup.tax.socialSecurity')}</h3>
                                    <p class="text-sm text-gray-500">${isThai ? ssoConfig.descriptionTh : ssoConfig.description}</p>
                                </div>
                            </div>
                            <div class="p-6">
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <p class="text-sm text-gray-500">${i18n.t('payrollSetup.tax.employeeRate')}</p>
                                        <p class="text-2xl font-bold text-gray-900">${ssoConfig.employeeRate}%</p>
                                    </div>
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <p class="text-sm text-gray-500">${i18n.t('payrollSetup.tax.employerRate')}</p>
                                        <p class="text-2xl font-bold text-gray-900">${ssoConfig.employerRate}%</p>
                                    </div>
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <p class="text-sm text-gray-500">${i18n.t('payrollSetup.tax.maxWage')}</p>
                                        <p class="text-lg font-bold text-gray-900">${this.formatCurrency(ssoConfig.maxWageBase)}</p>
                                    </div>
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <p class="text-sm text-gray-500">${i18n.t('payrollSetup.tax.maxContribution')}</p>
                                        <p class="text-lg font-bold text-gray-900">${this.formatCurrency(ssoConfig.maxContribution)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Provident Fund Config -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div class="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span class="material-icons text-purple-600" aria-hidden="true">savings</span>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">${i18n.t('payrollSetup.tax.providentFund')}</h3>
                                    <p class="text-sm text-gray-500">${isThai ? pvdConfig.fundNameTh : pvdConfig.fundName}</p>
                                </div>
                            </div>
                            <div class="p-6">
                                <div class="grid grid-cols-2 gap-4 mb-4">
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <p class="text-sm text-gray-500">${i18n.t('payrollSetup.tax.employeeContribution')}</p>
                                        <p class="text-lg font-bold text-gray-900">${pvdConfig.minEmployeeRate}% - ${pvdConfig.maxEmployeeRate}%</p>
                                    </div>
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <p class="text-sm text-gray-500">${i18n.t('payrollSetup.tax.employerContribution')}</p>
                                        <p class="text-lg font-bold text-gray-900">${pvdConfig.minEmployerRate}% - ${pvdConfig.maxEmployerRate}%</p>
                                    </div>
                                </div>

                                <!-- Vesting Schedule -->
                                <div>
                                    <h4 class="text-sm font-medium text-gray-700 mb-2">${i18n.t('payrollSetup.tax.vestingSchedule')}</h4>
                                    <div class="flex items-center gap-1">
                                        ${(pvdConfig.vestingSchedule || []).map((v, idx) => `
                                            <div class="flex-1 text-center">
                                                <div class="h-2 rounded ${v.percentage === 100 ? 'bg-green-500' : v.percentage > 0 ? 'bg-blue-500' : 'bg-gray-200'}"></div>
                                                <p class="text-xs mt-1">${v.years}${i18n.t('payrollSetup.tax.year')}</p>
                                                <p class="text-xs font-medium ${v.percentage === 100 ? 'text-green-600' : 'text-gray-600'}">${v.percentage}%</p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tax Notes -->
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div class="flex items-start gap-3">
                            <span class="material-icons text-yellow-600" aria-hidden="true">info</span>
                            <div>
                                <h4 class="font-medium text-yellow-800">${i18n.t('payrollSetup.tax.notes')}</h4>
                                <ul class="mt-2 space-y-1 text-sm text-yellow-700">
                                    ${(isThai ? taxBrackets.notesTh : taxBrackets.notes || []).map(note =>
                                        `<li>- ${note}</li>`
                                    ).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render tax deduction item
         * @param {string} label
         * @param {number} value
         * @param {string} suffix
         * @returns {string}
         */
        renderDeductionItem(label, value, suffix = '') {
            if (!value) return '';
            return `
                <div class="flex justify-between items-center py-2 border-b border-gray-100">
                    <dt class="text-sm text-gray-600">${label}</dt>
                    <dd class="text-sm font-medium text-gray-900">
                        ${this.formatCurrency(value)}
                        ${suffix ? `<span class="text-gray-500 text-xs">(${suffix})</span>` : ''}
                    </dd>
                </div>
            `;
        },

        /**
         * Render banks tab
         * @returns {string}
         */
        renderBanksTab() {
            const isThai = i18n.isThai();
            const activeBanks = banks.filter(b => b.isActive);

            return `
                <div class="space-y-6">
                    <!-- Summary -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        ${this.renderSummaryCard(
                            'business',
                            i18n.t('payrollSetup.banks.totalBanks'),
                            banks.length,
                            'text-blue-600 bg-blue-100'
                        )}
                        ${this.renderSummaryCard(
                            'check_circle',
                            i18n.t('payrollSetup.banks.active'),
                            activeBanks.length,
                            'text-green-600 bg-green-100'
                        )}
                        ${this.renderSummaryCard(
                            'credit_card',
                            i18n.t('payrollSetup.banks.paymentMethods'),
                            MockPayrollData.paymentMethods.length,
                            'text-purple-600 bg-purple-100'
                        )}
                    </div>

                    <!-- Banks List -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-lg font-semibold text-gray-900">${i18n.t('payrollSetup.banks.supportedBanks')}</h2>
                            <p class="text-sm text-gray-500">${i18n.t('payrollSetup.banks.bankListDesc')}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                            ${banks.map(bank => this.renderBankCard(bank)).join('')}
                        </div>
                    </div>

                    <!-- Payment Methods -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-lg font-semibold text-gray-900">${i18n.t('payrollSetup.banks.paymentMethods')}</h2>
                        </div>
                        <div class="p-6">
                            <div class="flex flex-wrap gap-3">
                                ${MockPayrollData.paymentMethods.map(method => `
                                    <div class="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                                        <span class="material-icons text-gray-500" aria-hidden="true">
                                            ${method.code === 'bank_transfer' ? 'account_balance' : method.code === 'cheque' ? 'receipt' : 'payments'}
                                        </span>
                                        <span class="text-sm font-medium text-gray-700">${isThai ? method.nameTh : method.nameEn}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Pay Frequencies -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-lg font-semibold text-gray-900">${i18n.t('payrollSetup.banks.payFrequencies')}</h2>
                        </div>
                        <div class="p-6">
                            <div class="flex flex-wrap gap-3">
                                ${MockPayrollData.payFrequencies.map(freq => `
                                    <div class="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg ${freq.code === companySettings.defaultPayFrequency ? 'border-2 border-cg-red bg-red-50' : ''}">
                                        <span class="material-icons text-gray-500" aria-hidden="true">schedule</span>
                                        <span class="text-sm font-medium text-gray-700">${isThai ? freq.nameTh : freq.nameEn}</span>
                                        ${freq.code === companySettings.defaultPayFrequency ?
                                            `<span class="text-xs bg-cg-red text-white px-2 py-0.5 rounded">${i18n.t('payrollSetup.default')}</span>`
                                            : ''
                                        }
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render bank card
         * @param {object} bank
         * @returns {string}
         */
        renderBankCard(bank) {
            const isThai = i18n.isThai();
            const name = isThai ? bank.nameTh : bank.nameEn;

            return `
                <div class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span class="text-lg font-bold text-blue-600">${bank.shortName.substring(0, 2)}</span>
                    </div>
                    <div class="min-w-0 flex-1">
                        <p class="font-medium text-gray-900 truncate">${name}</p>
                        <p class="text-xs text-gray-500">${bank.swiftCode}</p>
                    </div>
                    ${bank.isActive
                        ? `<span class="w-2 h-2 bg-green-500 rounded-full" title="${i18n.t('payrollSetup.active')}" aria-label="${i18n.t('payrollSetup.active')}"></span>`
                        : `<span class="w-2 h-2 bg-gray-300 rounded-full" title="${i18n.t('payrollSetup.inactive')}" aria-label="${i18n.t('payrollSetup.inactive')}"></span>`
                    }
                </div>
            `;
        },

        /**
         * Render summary card
         * @param {string} icon
         * @param {string} label
         * @param {number} value
         * @param {string} colorClass
         * @returns {string}
         */
        renderSummaryCard(icon, label, value, colorClass) {
            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full ${colorClass} flex items-center justify-center">
                            <span class="material-icons" aria-hidden="true">${icon}</span>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">${label}</p>
                            <p class="text-2xl font-bold text-gray-900">${value}</p>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render boolean badge
         * @param {boolean} value
         * @param {string} trueLabel
         * @param {string} falseLabel
         * @returns {string}
         */
        renderBooleanBadge(value, trueLabel, falseLabel) {
            if (value) {
                return `<span class="material-icons text-green-500 text-lg" aria-label="${trueLabel || i18n.t('common.yes')}">check_circle</span>`;
            }
            return `<span class="material-icons text-gray-300 text-lg" aria-label="${falseLabel || i18n.t('common.no')}">cancel</span>`;
        },

        /**
         * Format currency
         * @param {number} value
         * @returns {string}
         */
        formatCurrency(value) {
            if (!value && value !== 0) return '-';
            const isThai = i18n.isThai();
            return new Intl.NumberFormat(isThai ? 'th-TH' : 'en-US', {
                style: 'currency',
                currency: 'THB',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        },

        /**
         * Switch tab
         * @param {string} tabId
         */
        switchTab(tabId) {
            activeTab = tabId;
            Router.refresh();
        },

        /**
         * Load payroll data
         */
        async loadData() {
            try {
                // Load from mock data
                earningTypes = MockPayrollData.earningTypes || [];
                deductionTypes = MockPayrollData.deductionTypes || [];
                taxBrackets = MockPayrollData.taxBrackets || {};
                banks = MockPayrollData.banks || [];
                companySettings = MockPayrollData.companySettings || {};

            } catch (error) {
                console.error('Error loading payroll data:', error);
                ToastComponent.error(i18n.t('error.loadFailed'));
            }
        },

        /**
         * Initialize page
         */
        async init() {
            activeTab = 'earnings';
            await this.loadData();
        },

        /**
         * Render skeleton
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="skeleton shimmer" style="width: 250px; height: 32px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 48px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        ${[1, 2, 3, 4].map(() => `
                            <div class="skeleton shimmer" style="height: 80px; border-radius: 8px;"></div>
                        `).join('')}
                    </div>
                    <div class="skeleton shimmer" style="height: 400px; border-radius: 8px;"></div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PayrollSetupPage;
}
