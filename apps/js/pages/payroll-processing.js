/**
 * Payroll Processing Page
 * Monthly payroll processing with wizard, calculations, and approval workflow
 */

const PayrollProcessingPage = (function() {
    // State
    let currentStep = 1;
    let selectedPeriod = null;
    let payrollRun = null;
    let employees = [];
    let calculationResults = [];
    let variances = [];
    let isProcessing = false;

    // Thai tax brackets for 2024 (progressive rates)
    const THAI_TAX_BRACKETS = [
        { min: 0, max: 150000, rate: 0 },
        { min: 150001, max: 300000, rate: 0.05 },
        { min: 300001, max: 500000, rate: 0.10 },
        { min: 500001, max: 750000, rate: 0.15 },
        { min: 750001, max: 1000000, rate: 0.20 },
        { min: 1000001, max: 2000000, rate: 0.25 },
        { min: 2000001, max: 5000000, rate: 0.30 },
        { min: 5000001, max: Infinity, rate: 0.35 }
    ];

    // Social security constants (2024)
    const SOCIAL_SECURITY_RATE = 0.05; // 5%
    const SOCIAL_SECURITY_CEILING = 750; // Max 750 THB per month
    const SOCIAL_SECURITY_WAGE_CEILING = 15000; // Wage ceiling for SS calculation

    // Wizard steps
    const WIZARD_STEPS = [
        { id: 1, key: 'period', icon: 'calendar_month' },
        { id: 2, key: 'calculate', icon: 'calculate' },
        { id: 3, key: 'review', icon: 'preview' },
        { id: 4, key: 'approve', icon: 'check_circle' }
    ];

    return {
        /**
         * Render the payroll processing page
         * @returns {string}
         */
        render() {
            const isThai = i18n.isThai();
            const isHRManager = RBAC.hasRole('hr_manager');
            const isHRAdmin = RBAC.hasRole('hr_admin');

            if (!isHRManager && !isHRAdmin) {
                return this.renderUnauthorized();
            }

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">${i18n.t('payroll.title')}</h1>
                            <p class="text-sm text-gray-500 mt-1">${i18n.t('payroll.subtitle')}</p>
                        </div>
                        ${payrollRun?.status === 'completed' ? `
                            <button onclick="PayrollProcessingPage.exportPayroll()"
                                    class="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-cg-info text-white rounded-lg hover:bg-blue-600 transition">
                                <span class="material-icons text-sm">download</span>
                                ${i18n.t('payroll.exportPayroll')}
                            </button>
                        ` : ''}
                    </div>

                    <!-- Wizard Progress -->
                    ${this.renderWizardProgress()}

                    <!-- Step Content -->
                    <div id="wizard-content" class="mt-6">
                        ${this.renderStepContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Render wizard progress bar
         * @returns {string}
         */
        renderWizardProgress() {
            const isThai = i18n.isThai();

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div class="flex items-center justify-between">
                        ${WIZARD_STEPS.map((step, index) => `
                            <div class="flex items-center ${index < WIZARD_STEPS.length - 1 ? 'flex-1' : ''}">
                                <div class="flex items-center">
                                    <div class="w-10 h-10 rounded-full flex items-center justify-center
                                                ${currentStep > step.id ? 'bg-cg-success text-white' :
                                                  currentStep === step.id ? 'bg-cg-red text-white' :
                                                  'bg-gray-200 text-gray-500'}">
                                        ${currentStep > step.id ?
                                            '<span class="material-icons text-sm">check</span>' :
                                            `<span class="material-icons text-sm">${step.icon}</span>`
                                        }
                                    </div>
                                    <span class="ml-3 text-sm font-medium hidden sm:inline
                                                ${currentStep === step.id ? 'text-cg-red' : 'text-gray-500'}">
                                        ${i18n.t(`payroll.step.${step.key}`)}
                                    </span>
                                </div>
                                ${index < WIZARD_STEPS.length - 1 ? `
                                    <div class="flex-1 mx-4 h-0.5 ${currentStep > step.id ? 'bg-cg-success' : 'bg-gray-200'}"></div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Render current step content
         * @returns {string}
         */
        renderStepContent() {
            switch (currentStep) {
                case 1:
                    return this.renderPeriodSelection();
                case 2:
                    return this.renderCalculationStep();
                case 3:
                    return this.renderReviewStep();
                case 4:
                    return this.renderApprovalStep();
                default:
                    return this.renderPeriodSelection();
            }
        },

        /**
         * Render period selection step
         * @returns {string}
         */
        renderPeriodSelection() {
            const isThai = i18n.isThai();
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            // Generate months for selection (last 12 months + next 2 months)
            const months = [];
            for (let i = -11; i <= 2; i++) {
                const date = new Date(currentYear, currentMonth - 1 + i, 1);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const thaiYear = year + 543;

                months.push({
                    value: `${year}-${String(month).padStart(2, '0')}`,
                    labelEn: `${date.toLocaleString('en', { month: 'long' })} ${year}`,
                    labelTh: `${date.toLocaleString('th-TH', { month: 'long' })} ${thaiYear}`,
                    isCurrent: year === currentYear && month === currentMonth,
                    isPast: date < new Date(currentYear, currentMonth - 1, 1)
                });
            }

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('payroll.selectPeriod')}</h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Month Selection -->
                        <div>
                            ${FormFieldComponent.select({
                                name: 'payrollMonth',
                                label: i18n.t('payroll.payrollPeriod'),
                                required: true,
                                value: selectedPeriod || `${currentYear}-${String(currentMonth).padStart(2, '0')}`,
                                options: months.map(m => ({
                                    value: m.value,
                                    label: `${isThai ? m.labelTh : m.labelEn}${m.isCurrent ? ` (${i18n.t('payroll.currentMonth')})` : ''}`
                                })),
                                onChange: 'PayrollProcessingPage.onPeriodChange(this.value)'
                            })}
                        </div>

                        <!-- Department Filter (optional) -->
                        <div>
                            ${FormFieldComponent.select({
                                name: 'department',
                                label: i18n.t('payroll.department'),
                                required: false,
                                placeholder: isThai ? 'ทั้งหมด' : 'All Departments',
                                options: [
                                    { value: 'all', label: isThai ? 'ทั้งหมด' : 'All Departments' },
                                    { value: 'IT', label: 'IT' },
                                    { value: 'HR', label: 'HR' },
                                    { value: 'Finance', label: 'Finance' },
                                    { value: 'Operations', label: 'Operations' }
                                ]
                            })}
                        </div>
                    </div>

                    <!-- Previous Payroll Runs -->
                    <div class="mt-8">
                        <h3 class="text-md font-medium text-gray-700 mb-3">${i18n.t('payroll.recentRuns')}</h3>
                        ${this.renderRecentPayrollRuns()}
                    </div>

                    <!-- Navigation -->
                    <div class="mt-6 pt-6 border-t flex justify-end">
                        <button onclick="PayrollProcessingPage.nextStep()"
                                class="px-6 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                            ${i18n.t('payroll.startProcessing')}
                            <span class="material-icons ml-1 text-sm align-middle">arrow_forward</span>
                        </button>
                    </div>
                </div>
            `;
        },

        /**
         * Render recent payroll runs
         * @returns {string}
         */
        renderRecentPayrollRuns() {
            const isThai = i18n.isThai();
            const recentRuns = MockEmployeeData.payrollRuns || [];

            if (recentRuns.length === 0) {
                return `
                    <div class="text-center py-8 text-gray-500">
                        <span class="material-icons text-4xl mb-2">history</span>
                        <p>${i18n.t('payroll.noRecentRuns')}</p>
                    </div>
                `;
            }

            return `
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.period')}</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.employees')}</th>
                                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.totalGross')}</th>
                                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.totalNet')}</th>
                                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('workflow.status')}</th>
                                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${recentRuns.map(run => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-3 text-sm text-gray-900">${isThai ? run.periodTh : run.periodEn}</td>
                                    <td class="px-4 py-3 text-sm text-gray-600">${run.employeeCount}</td>
                                    <td class="px-4 py-3 text-sm text-gray-900 text-right">${this.formatCurrency(run.totalGross)}</td>
                                    <td class="px-4 py-3 text-sm text-gray-900 text-right">${this.formatCurrency(run.totalNet)}</td>
                                    <td class="px-4 py-3 text-center">
                                        <span class="px-2 py-1 text-xs rounded-full ${this.getStatusColor(run.status)}">
                                            ${i18n.t(`payroll.status.${run.status}`)}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3 text-center">
                                        <button onclick="PayrollProcessingPage.viewRun('${run.id}')"
                                                class="text-cg-info hover:underline text-sm">
                                            ${i18n.t('common.viewMore')}
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        },

        /**
         * Render calculation step
         * @returns {string}
         */
        renderCalculationStep() {
            const isThai = i18n.isThai();

            if (isProcessing) {
                return this.renderProcessingIndicator();
            }

            if (calculationResults.length === 0) {
                return `
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('payroll.calculatePayroll')}</h2>

                        <div class="text-center py-12">
                            <span class="material-icons text-6xl text-gray-300 mb-4">calculate</span>
                            <p class="text-gray-600 mb-6">${i18n.t('payroll.readyToCalculate')}</p>

                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto mb-6 text-left">
                                <h4 class="font-medium text-blue-800 mb-2">${i18n.t('payroll.calculationIncludes')}</h4>
                                <ul class="text-sm text-blue-700 space-y-1">
                                    <li class="flex items-center gap-2">
                                        <span class="material-icons text-sm">check</span>
                                        ${i18n.t('payroll.grossPayCalc')}
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="material-icons text-sm">check</span>
                                        ${i18n.t('payroll.taxWithholding')}
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="material-icons text-sm">check</span>
                                        ${i18n.t('payroll.socialSecurity')}
                                    </li>
                                    <li class="flex items-center gap-2">
                                        <span class="material-icons text-sm">check</span>
                                        ${i18n.t('payroll.providentFund')}
                                    </li>
                                </ul>
                            </div>

                            <button onclick="PayrollProcessingPage.runCalculation()"
                                    class="px-6 py-3 bg-cg-red text-white rounded-lg hover:bg-red-700 transition inline-flex items-center gap-2">
                                <span class="material-icons">play_arrow</span>
                                ${i18n.t('payroll.runCalculation')}
                            </button>
                        </div>

                        <!-- Navigation -->
                        <div class="mt-6 pt-6 border-t flex justify-between">
                            <button onclick="PayrollProcessingPage.prevStep()"
                                    class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                                <span class="material-icons mr-1 text-sm align-middle">arrow_back</span>
                                ${i18n.t('common.cancel')}
                            </button>
                        </div>
                    </div>
                `;
            }

            return this.renderCalculationResults();
        },

        /**
         * Render calculation results
         * @returns {string}
         */
        renderCalculationResults() {
            const isThai = i18n.isThai();
            const summary = this.calculateSummary();

            return `
                <div class="space-y-6">
                    <!-- Summary Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span class="material-icons text-blue-600">people</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('payroll.employees')}</p>
                                    <p class="text-xl font-bold text-gray-900">${summary.employeeCount}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <span class="material-icons text-green-600">payments</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('payroll.totalGross')}</p>
                                    <p class="text-xl font-bold text-gray-900">${this.formatCurrency(summary.totalGross)}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                    <span class="material-icons text-orange-600">remove_circle</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('payroll.totalDeductions')}</p>
                                    <p class="text-xl font-bold text-gray-900">${this.formatCurrency(summary.totalDeductions)}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span class="material-icons text-purple-600">account_balance_wallet</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('payroll.totalNet')}</p>
                                    <p class="text-xl font-bold text-gray-900">${this.formatCurrency(summary.totalNet)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Results Table -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b bg-gray-50 flex items-center justify-between">
                            <h3 class="font-medium text-gray-900">${i18n.t('payroll.calculationPreview')}</h3>
                            <div class="flex gap-2">
                                <input type="text"
                                       id="search-employees"
                                       placeholder="${i18n.t('common.search')}..."
                                       onkeyup="PayrollProcessingPage.filterResults(this.value)"
                                       class="px-3 py-1.5 border rounded-lg text-sm">
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200" id="calculation-results-table">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.employeeId')}</th>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.employeeName')}</th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payslip.grossPay')}</th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payslip.incomeTax')}</th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payslip.socialSecurity')}</th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payslip.providentFund')}</th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payslip.netPay')}</th>
                                        <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.variance')}</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    ${calculationResults.map(result => this.renderResultRow(result)).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <div class="flex justify-between">
                        <button onclick="PayrollProcessingPage.prevStep()"
                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                            <span class="material-icons mr-1 text-sm align-middle">arrow_back</span>
                            ${i18n.t('common.cancel')}
                        </button>
                        <button onclick="PayrollProcessingPage.nextStep()"
                                class="px-6 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                            ${i18n.t('payroll.reviewResults')}
                            <span class="material-icons ml-1 text-sm align-middle">arrow_forward</span>
                        </button>
                    </div>
                </div>
            `;
        },

        /**
         * Render a single result row
         * @param {object} result
         * @returns {string}
         */
        renderResultRow(result) {
            const hasVariance = result.variancePercent !== 0 && Math.abs(result.variancePercent) >= 10;
            const varianceClass = hasVariance ? (result.variancePercent > 0 ? 'text-green-600' : 'text-red-600') : 'text-gray-500';

            return `
                <tr class="hover:bg-gray-50 ${hasVariance ? 'bg-yellow-50' : ''}">
                    <td class="px-4 py-3 text-sm text-gray-600">${result.employeeId}</td>
                    <td class="px-4 py-3 text-sm font-medium text-gray-900">${result.employeeName}</td>
                    <td class="px-4 py-3 text-sm text-right text-gray-900">${this.formatCurrency(result.gross)}</td>
                    <td class="px-4 py-3 text-sm text-right text-gray-600">${this.formatCurrency(result.tax)}</td>
                    <td class="px-4 py-3 text-sm text-right text-gray-600">${this.formatCurrency(result.socialSecurity)}</td>
                    <td class="px-4 py-3 text-sm text-right text-gray-600">${this.formatCurrency(result.providentFund)}</td>
                    <td class="px-4 py-3 text-sm text-right font-medium text-gray-900">${this.formatCurrency(result.net)}</td>
                    <td class="px-4 py-3 text-sm text-center ${varianceClass}">
                        ${hasVariance ? `
                            <span class="inline-flex items-center gap-1">
                                <span class="material-icons text-sm">${result.variancePercent > 0 ? 'arrow_upward' : 'arrow_downward'}</span>
                                ${Math.abs(result.variancePercent).toFixed(1)}%
                            </span>
                        ` : '-'}
                    </td>
                </tr>
            `;
        },

        /**
         * Render review step
         * @returns {string}
         */
        renderReviewStep() {
            const isThai = i18n.isThai();
            const summary = this.calculateSummary();
            const departmentTotals = this.calculateDepartmentTotals();
            const exceptions = this.getExceptions();

            return `
                <div class="space-y-6">
                    <!-- Department Summary -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('payroll.departmentSummary')}</h3>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('employment.department')}</th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.employees')}</th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.totalGross')}</th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.totalDeductions')}</th>
                                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.totalNet')}</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    ${departmentTotals.map(dept => `
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-3 text-sm font-medium text-gray-900">${dept.name}</td>
                                            <td class="px-4 py-3 text-sm text-right text-gray-600">${dept.count}</td>
                                            <td class="px-4 py-3 text-sm text-right text-gray-900">${this.formatCurrency(dept.gross)}</td>
                                            <td class="px-4 py-3 text-sm text-right text-orange-600">${this.formatCurrency(dept.deductions)}</td>
                                            <td class="px-4 py-3 text-sm text-right font-medium text-gray-900">${this.formatCurrency(dept.net)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                                <tfoot class="bg-gray-100">
                                    <tr>
                                        <td class="px-4 py-3 text-sm font-bold text-gray-900">${i18n.t('payroll.grandTotal')}</td>
                                        <td class="px-4 py-3 text-sm text-right font-bold text-gray-900">${summary.employeeCount}</td>
                                        <td class="px-4 py-3 text-sm text-right font-bold text-gray-900">${this.formatCurrency(summary.totalGross)}</td>
                                        <td class="px-4 py-3 text-sm text-right font-bold text-orange-600">${this.formatCurrency(summary.totalDeductions)}</td>
                                        <td class="px-4 py-3 text-sm text-right font-bold text-gray-900">${this.formatCurrency(summary.totalNet)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <!-- Variance Exceptions -->
                    ${exceptions.length > 0 ? `
                        <div class="bg-white rounded-lg shadow-sm border border-yellow-300 p-6">
                            <h3 class="text-lg font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                                <span class="material-icons">warning</span>
                                ${i18n.t('payroll.varianceExceptions')} (${exceptions.length})
                            </h3>
                            <p class="text-sm text-yellow-700 mb-4">${i18n.t('payroll.varianceExceptionsDesc')}</p>
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-yellow-50">
                                        <tr>
                                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.employeeName')}</th>
                                            <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.previousNet')}</th>
                                            <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.currentNet')}</th>
                                            <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.variance')}</th>
                                            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('payroll.reason')}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        ${exceptions.map(ex => `
                                            <tr class="hover:bg-gray-50">
                                                <td class="px-4 py-3 text-sm font-medium text-gray-900">${ex.employeeName}</td>
                                                <td class="px-4 py-3 text-sm text-right text-gray-600">${this.formatCurrency(ex.previousNet)}</td>
                                                <td class="px-4 py-3 text-sm text-right text-gray-900">${this.formatCurrency(ex.currentNet)}</td>
                                                <td class="px-4 py-3 text-sm text-center ${ex.variancePercent > 0 ? 'text-green-600' : 'text-red-600'}">
                                                    ${ex.variancePercent > 0 ? '+' : ''}${ex.variancePercent.toFixed(1)}%
                                                </td>
                                                <td class="px-4 py-3 text-sm text-gray-600">${ex.reason || '-'}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ` : `
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                            <span class="material-icons text-green-600">check_circle</span>
                            <p class="text-green-700">${i18n.t('payroll.noVarianceExceptions')}</p>
                        </div>
                    `}

                    <!-- Navigation -->
                    <div class="flex justify-between">
                        <button onclick="PayrollProcessingPage.prevStep()"
                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                            <span class="material-icons mr-1 text-sm align-middle">arrow_back</span>
                            ${i18n.t('common.cancel')}
                        </button>
                        <button onclick="PayrollProcessingPage.nextStep()"
                                class="px-6 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                            ${i18n.t('payroll.proceedToApproval')}
                            <span class="material-icons ml-1 text-sm align-middle">arrow_forward</span>
                        </button>
                    </div>
                </div>
            `;
        },

        /**
         * Render approval step
         * @returns {string}
         */
        renderApprovalStep() {
            const isThai = i18n.isThai();
            const summary = this.calculateSummary();

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('payroll.submitForApproval')}</h2>

                    <!-- Summary -->
                    <div class="bg-gray-50 rounded-lg p-6 mb-6">
                        <h3 class="font-medium text-gray-700 mb-4">${i18n.t('payroll.payrollSummary')}</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('payroll.period')}</p>
                                <p class="font-medium">${selectedPeriod || '-'}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('payroll.employees')}</p>
                                <p class="font-medium">${summary.employeeCount}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('payroll.totalGross')}</p>
                                <p class="font-medium">${this.formatCurrency(summary.totalGross)}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">${i18n.t('payroll.totalNet')}</p>
                                <p class="font-medium">${this.formatCurrency(summary.totalNet)}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Comments -->
                    ${FormFieldComponent.textarea({
                        name: 'approvalComments',
                        label: i18n.t('payroll.comments'),
                        placeholder: isThai ? 'หมายเหตุเพิ่มเติม (ไม่บังคับ)' : 'Additional comments (optional)',
                        rows: 3
                    })}

                    <!-- Approver Chain -->
                    <div class="mt-6">
                        <h4 class="font-medium text-gray-700 mb-3">${i18n.t('payroll.approvalChain')}</h4>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span class="material-icons text-blue-600 text-sm">person</span>
                                </div>
                                <div>
                                    <p class="text-sm font-medium">HR Manager</p>
                                    <p class="text-xs text-gray-500">${i18n.t('payroll.level1Approval')}</p>
                                </div>
                            </div>
                            <div class="h-0.5 w-8 bg-gray-300"></div>
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span class="material-icons text-purple-600 text-sm">verified_user</span>
                                </div>
                                <div>
                                    <p class="text-sm font-medium">Finance Director</p>
                                    <p class="text-xs text-gray-500">${i18n.t('payroll.level2Approval')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <div class="mt-6 pt-6 border-t flex justify-between">
                        <button onclick="PayrollProcessingPage.prevStep()"
                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                            <span class="material-icons mr-1 text-sm align-middle">arrow_back</span>
                            ${i18n.t('common.cancel')}
                        </button>
                        <div class="flex gap-3">
                            <button onclick="PayrollProcessingPage.saveAsDraft()"
                                    class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                                ${i18n.t('payroll.saveAsDraft')}
                            </button>
                            <button onclick="PayrollProcessingPage.submitForApproval()"
                                    class="px-6 py-2 bg-cg-success text-white rounded-lg hover:bg-green-600 transition inline-flex items-center gap-2">
                                <span class="material-icons text-sm">send</span>
                                ${i18n.t('payroll.submitForApproval')}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render processing indicator
         * @returns {string}
         */
        renderProcessingIndicator() {
            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <div class="w-16 h-16 border-4 border-cg-red border-t-transparent rounded-full spinner mx-auto mb-4"></div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">${i18n.t('payroll.processing')}</h3>
                    <p class="text-gray-500">${i18n.t('payroll.processingDesc')}</p>
                </div>
            `;
        },

        /**
         * Render unauthorized message
         * @returns {string}
         */
        renderUnauthorized() {
            const isThai = i18n.isThai();

            return `
                <div class="max-w-md mx-auto mt-20 text-center">
                    <span class="material-icons text-6xl text-red-300 mb-4">lock</span>
                    <h2 class="text-xl font-bold text-gray-700 mb-2">${i18n.t('error.unauthorized')}</h2>
                    <p class="text-gray-500 mb-6">${isThai ? 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้' : 'You do not have permission to access this page'}</p>
                    <a href="#/" class="text-cg-info hover:underline">${i18n.t('common.backToHome')}</a>
                </div>
            `;
        },

        // ===========================
        // Calculation Methods
        // ===========================

        /**
         * Calculate Thai progressive income tax
         * @param {number} annualIncome - Annual taxable income
         * @returns {number} Annual tax amount
         */
        calculateThaiTax(annualIncome) {
            let tax = 0;
            let remainingIncome = annualIncome;

            for (const bracket of THAI_TAX_BRACKETS) {
                if (remainingIncome <= 0) break;

                const bracketMax = bracket.max === Infinity ? remainingIncome : bracket.max - bracket.min + 1;
                const taxableInBracket = Math.min(remainingIncome, bracketMax);

                if (annualIncome > bracket.min) {
                    tax += taxableInBracket * bracket.rate;
                    remainingIncome -= taxableInBracket;
                }
            }

            return Math.round(tax);
        },

        /**
         * Calculate monthly tax withholding
         * @param {number} monthlyGross - Monthly gross income
         * @param {number} monthOfYear - Current month (1-12)
         * @returns {number} Monthly tax withholding
         */
        calculateMonthlyTax(monthlyGross, monthOfYear) {
            // Estimate annual income
            const annualIncome = monthlyGross * 12;

            // Standard deduction (150,000 THB)
            const standardDeduction = 150000;

            // Calculate taxable income
            const taxableIncome = Math.max(0, annualIncome - standardDeduction);

            // Calculate annual tax
            const annualTax = this.calculateThaiTax(taxableIncome);

            // Return monthly portion
            return Math.round(annualTax / 12);
        },

        /**
         * Calculate social security contribution
         * @param {number} monthlyGross
         * @returns {number}
         */
        calculateSocialSecurity(monthlyGross) {
            const contributionBase = Math.min(monthlyGross, SOCIAL_SECURITY_WAGE_CEILING);
            const contribution = contributionBase * SOCIAL_SECURITY_RATE;
            return Math.min(contribution, SOCIAL_SECURITY_CEILING);
        },

        /**
         * Calculate provident fund deduction
         * @param {number} monthlyGross
         * @param {number} rate - Employee contribution rate (e.g., 0.05 for 5%)
         * @returns {number}
         */
        calculateProvidentFund(monthlyGross, rate = 0.05) {
            return Math.round(monthlyGross * rate);
        },

        /**
         * Calculate payroll for an employee
         * @param {object} employee
         * @param {number} month
         * @returns {object}
         */
        calculateEmployeePayroll(employee, month) {
            const earnings = employee.earnings || {};
            const gross = (earnings.baseSalary || 0) +
                         (earnings.positionAllowance || 0) +
                         (earnings.colAllowance || 0) +
                         (earnings.overtime || 0) +
                         (earnings.otherEarnings || 0);

            const tax = this.calculateMonthlyTax(gross, month);
            const socialSecurity = this.calculateSocialSecurity(gross);
            const providentFund = this.calculateProvidentFund(gross, employee.providentFundRate || 0.05);
            const otherDeductions = earnings.loans || 0;

            const totalDeductions = tax + socialSecurity + providentFund + otherDeductions;
            const net = gross - totalDeductions;

            // Calculate variance from previous month
            const previousNet = employee.previousNet || net;
            const varianceAmount = net - previousNet;
            const variancePercent = previousNet > 0 ? (varianceAmount / previousNet) * 100 : 0;

            return {
                employeeId: employee.employeeId,
                employeeName: employee.name,
                department: employee.department || 'General',
                gross,
                earnings,
                tax,
                socialSecurity,
                providentFund,
                otherDeductions,
                totalDeductions,
                net,
                previousNet,
                varianceAmount,
                variancePercent
            };
        },

        /**
         * Run payroll calculation for all employees
         */
        async runCalculation() {
            isProcessing = true;
            this.refresh();

            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Get period month
                const [year, month] = (selectedPeriod || '').split('-').map(Number);

                // Mock employee data for calculation
                const mockEmployees = [
                    { employeeId: 'EMP001', name: 'Chatchai Tangsiri', department: 'IT', earnings: { baseSalary: 95000, positionAllowance: 15000, colAllowance: 5000, overtime: 5000 }, providentFundRate: 0.05, previousNet: 92000 },
                    { employeeId: 'EMP002', name: 'Somchai Prasert', department: 'HR', earnings: { baseSalary: 75000, positionAllowance: 10000, colAllowance: 3000, overtime: 2000 }, providentFundRate: 0.03, previousNet: 70000 },
                    { employeeId: 'EMP003', name: 'Nattaya Sriporn', department: 'Finance', earnings: { baseSalary: 85000, positionAllowance: 12000, colAllowance: 4000, overtime: 3000 }, providentFundRate: 0.05, previousNet: 78000 },
                    { employeeId: 'EMP004', name: 'Prawit Wongsuwan', department: 'IT', earnings: { baseSalary: 120000, positionAllowance: 20000, colAllowance: 6000, overtime: 0 }, providentFundRate: 0.05, previousNet: 105000 },
                    { employeeId: 'EMP005', name: 'Siriporn Kaewdee', department: 'Operations', earnings: { baseSalary: 55000, positionAllowance: 5000, colAllowance: 2000, overtime: 8000 }, providentFundRate: 0.03, previousNet: 52000 },
                    { employeeId: 'EMP006', name: 'Worachai Limpakit', department: 'Operations', earnings: { baseSalary: 65000, positionAllowance: 8000, colAllowance: 3000, overtime: 10000 }, providentFundRate: 0.03, previousNet: 85000 }, // Will show variance
                    { employeeId: 'EMP007', name: 'Natthapong Chai', department: 'IT', earnings: { baseSalary: 70000, positionAllowance: 8000, colAllowance: 3000, overtime: 2000 }, providentFundRate: 0.05, previousNet: 65000 }
                ];

                // Calculate for each employee
                calculationResults = mockEmployees.map(emp => this.calculateEmployeePayroll(emp, month || new Date().getMonth() + 1));

                isProcessing = false;
                this.refresh();

                ToastComponent.success(i18n.t('payroll.calculationComplete'));

            } catch (error) {
                isProcessing = false;
                console.error('Calculation error:', error);
                ToastComponent.error(i18n.t('error.generic'));
                this.refresh();
            }
        },

        /**
         * Calculate summary totals
         * @returns {object}
         */
        calculateSummary() {
            if (calculationResults.length === 0) {
                return { employeeCount: 0, totalGross: 0, totalDeductions: 0, totalNet: 0 };
            }

            return {
                employeeCount: calculationResults.length,
                totalGross: calculationResults.reduce((sum, r) => sum + r.gross, 0),
                totalDeductions: calculationResults.reduce((sum, r) => sum + r.totalDeductions, 0),
                totalNet: calculationResults.reduce((sum, r) => sum + r.net, 0)
            };
        },

        /**
         * Calculate department totals
         * @returns {array}
         */
        calculateDepartmentTotals() {
            const deptMap = {};

            calculationResults.forEach(result => {
                const dept = result.department || 'Other';
                if (!deptMap[dept]) {
                    deptMap[dept] = { name: dept, count: 0, gross: 0, deductions: 0, net: 0 };
                }
                deptMap[dept].count++;
                deptMap[dept].gross += result.gross;
                deptMap[dept].deductions += result.totalDeductions;
                deptMap[dept].net += result.net;
            });

            return Object.values(deptMap).sort((a, b) => b.net - a.net);
        },

        /**
         * Get variance exceptions (>10% change)
         * @returns {array}
         */
        getExceptions() {
            return calculationResults
                .filter(r => Math.abs(r.variancePercent) >= 10)
                .map(r => ({
                    employeeId: r.employeeId,
                    employeeName: r.employeeName,
                    previousNet: r.previousNet,
                    currentNet: r.net,
                    variancePercent: r.variancePercent,
                    reason: r.variancePercent > 0 ? 'Overtime increase' : 'Position change'
                }));
        },

        // ===========================
        // Navigation & Actions
        // ===========================

        /**
         * Go to next step
         */
        nextStep() {
            if (currentStep < 4) {
                if (currentStep === 1 && !selectedPeriod) {
                    selectedPeriod = document.querySelector('[name="payrollMonth"]')?.value;
                }
                currentStep++;
                this.refresh();
            }
        },

        /**
         * Go to previous step
         */
        prevStep() {
            if (currentStep > 1) {
                currentStep--;
                this.refresh();
            }
        },

        /**
         * Handle period change
         * @param {string} value
         */
        onPeriodChange(value) {
            selectedPeriod = value;
        },

        /**
         * Filter results by search
         * @param {string} query
         */
        filterResults(query) {
            const rows = document.querySelectorAll('#calculation-results-table tbody tr');
            const lowerQuery = query.toLowerCase();

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(lowerQuery) ? '' : 'none';
            });
        },

        /**
         * Submit for approval
         */
        async submitForApproval() {
            const isThai = i18n.isThai();
            const comments = document.querySelector('[name="approvalComments"]')?.value || '';

            const confirmed = await ModalComponent.confirm({
                title: i18n.t('payroll.confirmSubmit'),
                message: i18n.t('payroll.confirmSubmitDesc'),
                confirmText: i18n.t('payroll.submit'),
                icon: 'send'
            });

            if (!confirmed) return;

            try {
                // Create workflow request
                const employee = AppState.get('currentEmployee');
                const summary = this.calculateSummary();

                await WorkflowEngine.createRequest({
                    type: 'payroll_run',
                    section: 'Payroll Processing',
                    oldValues: {},
                    newValues: {
                        period: selectedPeriod,
                        employeeCount: summary.employeeCount,
                        totalGross: summary.totalGross,
                        totalNet: summary.totalNet,
                        comments
                    },
                    effectiveDate: new Date().toISOString()
                });

                ToastComponent.success(i18n.t('payroll.submitSuccess'));

                // Reset and go back to step 1
                this.reset();
                Router.navigate('#/payroll-processing');

            } catch (error) {
                console.error('Submit error:', error);
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Save as draft
         */
        async saveAsDraft() {
            const comments = document.querySelector('[name="approvalComments"]')?.value || '';

            // Save to mock data
            payrollRun = {
                id: 'PR' + Date.now(),
                period: selectedPeriod,
                status: 'draft',
                results: calculationResults,
                comments,
                savedAt: new Date().toISOString()
            };

            ToastComponent.success(i18n.t('payroll.draftSaved'));
        },

        /**
         * Export payroll
         */
        async exportPayroll() {
            ToastComponent.info(i18n.t('toast.downloadStarted'));
            // Mock export - in real app would generate Excel/PDF
        },

        /**
         * View payroll run details
         * @param {string} runId
         */
        viewRun(runId) {
            // Load run details and show in modal
            ModalComponent.open({
                title: i18n.t('payroll.runDetails'),
                size: 'lg',
                content: `<p>${i18n.t('payroll.loadingRunDetails')}</p>`,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        // ===========================
        // Utility Methods
        // ===========================

        /**
         * Format currency
         * @param {number} amount
         * @returns {string}
         */
        formatCurrency(amount) {
            return new Intl.NumberFormat('th-TH', {
                style: 'currency',
                currency: 'THB',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        },

        /**
         * Get status color class
         * @param {string} status
         * @returns {string}
         */
        getStatusColor(status) {
            const colors = {
                draft: 'bg-gray-100 text-gray-800',
                pending: 'bg-yellow-100 text-yellow-800',
                approved: 'bg-green-100 text-green-800',
                rejected: 'bg-red-100 text-red-800',
                completed: 'bg-blue-100 text-blue-800'
            };
            return colors[status] || colors.draft;
        },

        /**
         * Refresh page content
         */
        refresh() {
            const content = document.getElementById('main-content');
            if (content) {
                content.innerHTML = this.render();
            }
        },

        /**
         * Reset state
         */
        reset() {
            currentStep = 1;
            selectedPeriod = null;
            payrollRun = null;
            calculationResults = [];
            variances = [];
            isProcessing = false;
        },

        /**
         * Initialize page
         */
        async init() {
            this.reset();
            // Re-render after data is loaded
            const content = document.getElementById('main-content');
            if (content) {
                content.innerHTML = this.render();
            }
        },

        /**
         * Render skeleton
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="skeleton shimmer" style="width: 250px; height: 32px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 80px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 400px; border-radius: 8px;"></div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PayrollProcessingPage;
}
