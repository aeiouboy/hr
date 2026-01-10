/**
 * Government Reports Page
 * Generate and download Thai government tax and social security reports
 */

const GovernmentReportsPage = (function() {
    let selectedReportType = 'pnd1';
    let selectedMonth = new Date().getMonth() + 1;
    let selectedYear = new Date().getFullYear();
    let selectedCompany = 'all';
    let companies = [];
    let isGenerating = false;
    let generatedReports = [];

    // Thai government report types
    const REPORT_TYPES = {
        pnd1: {
            id: 'pnd1',
            code: 'PND1',
            nameTh: 'ภ.ง.ด.1',
            nameEn: 'PND.1',
            descriptionTh: 'แบบยื่นรายการภาษีเงินได้หัก ณ ที่จ่าย (รายเดือน)',
            descriptionEn: 'Monthly Withholding Tax Return',
            frequency: 'monthly',
            formats: ['excel', 'pdf']
        },
        pnd1k: {
            id: 'pnd1k',
            code: 'PND1K',
            nameTh: 'ภ.ง.ด.1ก',
            nameEn: 'PND.1K',
            descriptionTh: 'แบบยื่นรายการภาษีเงินได้หัก ณ ที่จ่าย (ประจำปี)',
            descriptionEn: 'Annual Withholding Tax Summary',
            frequency: 'annual',
            formats: ['excel', 'pdf']
        },
        cert50tawi: {
            id: 'cert50tawi',
            code: '50TAWI',
            nameTh: '50 ทวิ',
            nameEn: '50 Tawi',
            descriptionTh: 'หนังสือรับรองการหักภาษี ณ ที่จ่าย',
            descriptionEn: 'Withholding Tax Certificate',
            frequency: 'annual',
            formats: ['pdf']
        },
        sps110: {
            id: 'sps110',
            code: 'SPS1-10',
            nameTh: 'สปส. 1-10',
            nameEn: 'SSO 1-10',
            descriptionTh: 'แบบรายการส่งเงินสมทบประกันสังคม (รายเดือน)',
            descriptionEn: 'Monthly Social Security Contribution Report',
            frequency: 'monthly',
            formats: ['excel', 'pdf']
        }
    };

    return {
        /**
         * Render the government reports page
         * @param {object} params - Route parameters
         * @returns {string}
         */
        render(params = {}) {
            const isLoading = AppState.get('isLoading');

            if (isLoading && companies.length === 0) {
                return this.renderSkeleton();
            }

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">${i18n.t('govReports.title')}</h1>
                            <p class="text-sm text-gray-500 mt-1">${i18n.t('govReports.subtitle')}</p>
                        </div>
                    </div>

                    <!-- Report Selection Card -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="material-icons text-cg-red">description</span>
                            ${i18n.t('govReports.selectReport')}
                        </h2>

                        <!-- Report Type Grid -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            ${Object.values(REPORT_TYPES).map(report => this.renderReportTypeCard(report)).join('')}
                        </div>

                        <!-- Filters Section -->
                        <div class="border-t border-gray-200 pt-6">
                            <h3 class="text-sm font-medium text-gray-700 mb-4">${i18n.t('govReports.reportParameters')}</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                ${this.renderPeriodFilters()}
                                ${this.renderCompanyFilter()}
                            </div>
                        </div>

                        <!-- Generate Button -->
                        <div class="mt-6 flex flex-col sm:flex-row gap-3">
                            <button onclick="GovernmentReportsPage.generateReport('excel')"
                                    class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    ${isGenerating ? 'disabled' : ''}
                                    ${!this.supportsExcel() ? 'disabled title="' + i18n.t('govReports.excelNotSupported') + '"' : ''}>
                                <span class="material-icons text-sm">table_chart</span>
                                ${i18n.t('govReports.generateExcel')}
                            </button>
                            <button onclick="GovernmentReportsPage.generateReport('pdf')"
                                    class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cg-red text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    ${isGenerating ? 'disabled' : ''}>
                                <span class="material-icons text-sm">picture_as_pdf</span>
                                ${i18n.t('govReports.generatePdf')}
                            </button>
                        </div>
                    </div>

                    <!-- Report Info Section -->
                    ${this.renderReportInfo()}

                    <!-- Generated Reports History -->
                    ${this.renderGeneratedReportsHistory()}
                </div>
            `;
        },

        /**
         * Render a report type card
         * @param {object} report
         * @returns {string}
         */
        renderReportTypeCard(report) {
            const isThai = i18n.isThai();
            const name = isThai ? report.nameTh : report.nameEn;
            const description = isThai ? report.descriptionTh : report.descriptionEn;
            const isSelected = selectedReportType === report.id;
            const frequencyLabel = report.frequency === 'monthly'
                ? i18n.t('govReports.monthly')
                : i18n.t('govReports.annual');

            return `
                <div class="relative cursor-pointer rounded-lg border-2 p-4 transition
                            ${isSelected ? 'border-cg-red bg-red-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}"
                     onclick="GovernmentReportsPage.selectReportType('${report.id}')"
                     role="radio"
                     aria-checked="${isSelected}"
                     tabindex="0"
                     onkeydown="if(event.key==='Enter'||event.key===' ') { event.preventDefault(); GovernmentReportsPage.selectReportType('${report.id}'); }">
                    <div class="flex items-start gap-3">
                        <div class="w-10 h-10 rounded-full ${isSelected ? 'bg-cg-red text-white' : 'bg-gray-100 text-gray-600'} flex items-center justify-center flex-shrink-0">
                            <span class="material-icons text-sm">
                                ${report.id === 'cert50tawi' ? 'card_membership' : 'article'}
                            </span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <h4 class="text-base font-bold ${isSelected ? 'text-cg-red' : 'text-gray-900'}">${name}</h4>
                            <p class="text-xs text-gray-500 mt-1 line-clamp-2">${description}</p>
                            <span class="inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${report.frequency === 'monthly' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}">
                                ${frequencyLabel}
                            </span>
                        </div>
                    </div>
                    ${isSelected ? `
                        <div class="absolute top-2 right-2">
                            <span class="material-icons text-cg-red">check_circle</span>
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render period filter dropdowns
         * @returns {string}
         */
        renderPeriodFilters() {
            const currentReport = REPORT_TYPES[selectedReportType];
            const isMonthly = currentReport.frequency === 'monthly';

            // Generate month options
            const months = [];
            for (let i = 1; i <= 12; i++) {
                const monthKey = `govReports.months.${i}`;
                months.push({ value: i, label: i18n.t(monthKey) });
            }

            // Generate year options (current year and 2 previous years)
            const currentYear = new Date().getFullYear();
            const years = [];
            for (let i = currentYear; i >= currentYear - 2; i--) {
                years.push({ value: i, label: i.toString() });
            }

            let html = '';

            // Month selector (only for monthly reports)
            if (isMonthly) {
                html += `
                    <div class="form-group">
                        <label for="report-month" class="block text-sm font-medium text-gray-700 mb-1">
                            ${i18n.t('govReports.month')}
                        </label>
                        <select id="report-month"
                                onchange="GovernmentReportsPage.setMonth(this.value)"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red">
                            ${months.map(m => `
                                <option value="${m.value}" ${m.value === selectedMonth ? 'selected' : ''}>
                                    ${m.label}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                `;
            }

            // Year selector
            html += `
                <div class="form-group">
                    <label for="report-year" class="block text-sm font-medium text-gray-700 mb-1">
                        ${i18n.t('govReports.year')}
                    </label>
                    <select id="report-year"
                            onchange="GovernmentReportsPage.setYear(this.value)"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red">
                        ${years.map(y => `
                            <option value="${y.value}" ${y.value === selectedYear ? 'selected' : ''}>
                                ${y.label}
                            </option>
                        `).join('')}
                    </select>
                </div>
            `;

            return html;
        },

        /**
         * Render company filter dropdown
         * @returns {string}
         */
        renderCompanyFilter() {
            const companyOptions = [
                { value: 'all', label: i18n.t('govReports.allCompanies') },
                ...companies.map(c => ({ value: c.id, label: c.name }))
            ];

            return `
                <div class="form-group">
                    <label for="report-company" class="block text-sm font-medium text-gray-700 mb-1">
                        ${i18n.t('govReports.company')}
                    </label>
                    <select id="report-company"
                            onchange="GovernmentReportsPage.setCompany(this.value)"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red/20 focus:border-cg-red">
                        ${companyOptions.map(c => `
                            <option value="${c.value}" ${c.value === selectedCompany ? 'selected' : ''}>
                                ${c.label}
                            </option>
                        `).join('')}
                    </select>
                </div>
            `;
        },

        /**
         * Render report information section
         * @returns {string}
         */
        renderReportInfo() {
            const currentReport = REPORT_TYPES[selectedReportType];
            const isThai = i18n.isThai();
            const name = isThai ? currentReport.nameTh : currentReport.nameEn;
            const description = isThai ? currentReport.descriptionTh : currentReport.descriptionEn;

            // Report-specific information
            const reportInfo = this.getReportSpecificInfo(selectedReportType);

            return `
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 class="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <span class="material-icons">info</span>
                        ${i18n.t('govReports.aboutReport')}: ${name}
                    </h3>
                    <p class="text-sm text-blue-800 mb-4">${description}</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 class="text-sm font-medium text-blue-900 mb-2">${i18n.t('govReports.submissionDeadline')}</h4>
                            <p class="text-sm text-blue-700">${reportInfo.deadline}</p>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-blue-900 mb-2">${i18n.t('govReports.submittedTo')}</h4>
                            <p class="text-sm text-blue-700">${reportInfo.submittedTo}</p>
                        </div>
                    </div>

                    <div class="mt-4 pt-4 border-t border-blue-200">
                        <h4 class="text-sm font-medium text-blue-900 mb-2">${i18n.t('govReports.includedData')}</h4>
                        <ul class="text-sm text-blue-700 list-disc list-inside space-y-1">
                            ${reportInfo.includedData.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        },

        /**
         * Get report-specific information
         * @param {string} reportType
         * @returns {object}
         */
        getReportSpecificInfo(reportType) {
            const isThai = i18n.isThai();

            const info = {
                pnd1: {
                    deadline: isThai
                        ? 'ภายในวันที่ 7 ของเดือนถัดไป (หรือวันที่ 15 หากยื่นผ่านระบบอิเล็กทรอนิกส์)'
                        : 'By the 7th of the following month (or 15th for e-filing)',
                    submittedTo: isThai ? 'กรมสรรพากร' : 'Revenue Department',
                    includedData: isThai
                        ? [
                            'รายชื่อพนักงานที่ถูกหักภาษี',
                            'เงินได้พึงประเมินรายเดือน',
                            'ภาษีหัก ณ ที่จ่าย',
                            'เลขประจำตัวผู้เสียภาษี'
                        ]
                        : [
                            'Employee list with tax deductions',
                            'Monthly assessable income',
                            'Withholding tax amounts',
                            'Tax identification numbers'
                        ]
                },
                pnd1k: {
                    deadline: isThai
                        ? 'ภายในเดือนกุมภาพันธ์ของปีถัดไป'
                        : 'By February of the following year',
                    submittedTo: isThai ? 'กรมสรรพากร' : 'Revenue Department',
                    includedData: isThai
                        ? [
                            'สรุปรายได้และภาษีประจำปีของพนักงานทุกคน',
                            'ยอดรวมภาษีหัก ณ ที่จ่ายทั้งปี',
                            'เลขประจำตัวผู้เสียภาษีของพนักงานและบริษัท',
                            'รายละเอียดการนำส่งภาษีรายเดือน'
                        ]
                        : [
                            'Annual income and tax summary for all employees',
                            'Total withholding tax for the year',
                            'Tax ID numbers for employees and company',
                            'Monthly tax submission details'
                        ]
                },
                cert50tawi: {
                    deadline: isThai
                        ? 'ออกให้พนักงานภายในวันที่ 15 กุมภาพันธ์ของปีถัดไป'
                        : 'Issue to employees by February 15 of the following year',
                    submittedTo: isThai ? 'มอบให้พนักงานแต่ละคน' : 'Given to each employee',
                    includedData: isThai
                        ? [
                            'ข้อมูลนายจ้างและลูกจ้าง',
                            'เงินได้พึงประเมินประจำปี',
                            'ภาษีหัก ณ ที่จ่ายทั้งปี',
                            'เลขที่หนังสือรับรอง'
                        ]
                        : [
                            'Employer and employee information',
                            'Annual assessable income',
                            'Total tax withheld for the year',
                            'Certificate reference number'
                        ]
                },
                sps110: {
                    deadline: isThai
                        ? 'ภายในวันที่ 15 ของเดือนถัดไป'
                        : 'By the 15th of the following month',
                    submittedTo: isThai ? 'สำนักงานประกันสังคม' : 'Social Security Office',
                    includedData: isThai
                        ? [
                            'รายชื่อผู้ประกันตนทั้งหมด',
                            'ค่าจ้างที่ใช้คำนวณเงินสมทบ',
                            'เงินสมทบของลูกจ้างและนายจ้าง',
                            'เลขประจำตัวประกันสังคม'
                        ]
                        : [
                            'List of all insured employees',
                            'Wages used for contribution calculation',
                            'Employee and employer contribution amounts',
                            'Social security ID numbers'
                        ]
                }
            };

            return info[reportType] || info.pnd1;
        },

        /**
         * Render generated reports history
         * @returns {string}
         */
        renderGeneratedReportsHistory() {
            if (generatedReports.length === 0) {
                return `
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <span class="material-icons text-gray-500">history</span>
                            ${i18n.t('govReports.recentReports')}
                        </h3>
                        <div class="text-center py-8 text-gray-500">
                            <span class="material-icons text-4xl mb-2">folder_open</span>
                            <p>${i18n.t('govReports.noReportsGenerated')}</p>
                        </div>
                    </div>
                `;
            }

            const isThai = i18n.isThai();

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <span class="material-icons text-gray-500">history</span>
                            ${i18n.t('govReports.recentReports')}
                        </h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('govReports.reportType')}
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('govReports.period')}
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('govReports.generatedAt')}
                                    </th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('govReports.format')}
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('common.actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${generatedReports.map(report => {
                                    const reportType = REPORT_TYPES[report.type];
                                    const name = isThai ? reportType.nameTh : reportType.nameEn;
                                    const generatedDate = DateUtils.format(report.generatedAt, 'short');

                                    return `
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="flex items-center">
                                                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                                        <span class="material-icons text-gray-600 text-sm">description</span>
                                                    </div>
                                                    <span class="text-sm font-medium text-gray-900">${name}</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${report.period}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${generatedDate}
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.format === 'excel' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                                    ${report.format.toUpperCase()}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onclick="GovernmentReportsPage.downloadReport('${report.id}')"
                                                        class="text-cg-red hover:text-red-700">
                                                    <span class="material-icons">download</span>
                                                </button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        /**
         * Check if current report supports Excel format
         * @returns {boolean}
         */
        supportsExcel() {
            const currentReport = REPORT_TYPES[selectedReportType];
            return currentReport.formats.includes('excel');
        },

        /**
         * Select report type
         * @param {string} type
         */
        selectReportType(type) {
            selectedReportType = type;
            this.rerender();
        },

        /**
         * Set month filter
         * @param {string} month
         */
        setMonth(month) {
            selectedMonth = parseInt(month);
        },

        /**
         * Set year filter
         * @param {string} year
         */
        setYear(year) {
            selectedYear = parseInt(year);
        },

        /**
         * Set company filter
         * @param {string} company
         */
        setCompany(company) {
            selectedCompany = company;
        },

        /**
         * Generate report
         * @param {string} format - 'excel' or 'pdf'
         */
        async generateReport(format) {
            try {
                isGenerating = true;
                this.rerender();

                ToastComponent.info(i18n.t('govReports.generating'));

                const currentReport = REPORT_TYPES[selectedReportType];
                const isThai = i18n.isThai();
                const reportName = isThai ? currentReport.nameTh : currentReport.nameEn;

                // Build period string
                let period;
                if (currentReport.frequency === 'monthly') {
                    const monthName = i18n.t(`govReports.months.${selectedMonth}`);
                    period = `${monthName} ${selectedYear}`;
                } else {
                    period = selectedYear.toString();
                }

                // Simulate API call to generate report
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Create mock generated report
                const generatedReport = {
                    id: `report_${Date.now()}`,
                    type: selectedReportType,
                    period: period,
                    company: selectedCompany,
                    format: format,
                    generatedAt: new Date().toISOString(),
                    downloadUrl: '#'
                };

                // Add to history
                generatedReports.unshift(generatedReport);
                if (generatedReports.length > 10) {
                    generatedReports.pop();
                }

                // Trigger download
                this.downloadGeneratedReport(generatedReport, reportName, format);

                ToastComponent.success(i18n.t('govReports.generateSuccess'));

            } catch (error) {
                console.error('Error generating report:', error);
                ToastComponent.error(i18n.t('govReports.generateError'));
            } finally {
                isGenerating = false;
                this.rerender();
            }
        },

        /**
         * Download generated report
         * @param {object} report
         * @param {string} reportName
         * @param {string} format
         */
        downloadGeneratedReport(report, reportName, format) {
            // Create filename
            const sanitizedName = reportName.replace(/\s+/g, '_');
            const sanitizedPeriod = report.period.replace(/\s+/g, '_');
            const filename = `${sanitizedName}_${sanitizedPeriod}.${format === 'excel' ? 'xlsx' : 'pdf'}`;

            // In a real implementation, this would download the actual file from the server
            // For now, we'll create a mock download
            ToastComponent.info(i18n.t('toast.downloadStarted'));

            // Log the download for audit purposes
            const employee = AppState.get('currentEmployee');
            if (employee) {
                API.logDocumentAccess(employee.employeeId, 'government_report', report.id, 'download');
            }
        },

        /**
         * Download a previously generated report
         * @param {string} reportId
         */
        downloadReport(reportId) {
            const report = generatedReports.find(r => r.id === reportId);
            if (report) {
                const reportType = REPORT_TYPES[report.type];
                const isThai = i18n.isThai();
                const reportName = isThai ? reportType.nameTh : reportType.nameEn;
                this.downloadGeneratedReport(report, reportName, report.format);
            }
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
                // Load company list for multi-company filter
                const companyData = await API.getCompanies();
                companies = companyData || [
                    { id: 'central', name: 'Central Group' },
                    { id: 'robinson', name: 'Robinson' },
                    { id: 'central-food-retail', name: 'Central Food Retail' }
                ];

                // Load recent generated reports (mock data)
                generatedReports = [];

            } catch (error) {
                console.error('Error loading government reports data:', error);
                // Use default mock data
                companies = [
                    { id: 'central', name: 'Central Group' },
                    { id: 'robinson', name: 'Robinson' },
                    { id: 'central-food-retail', name: 'Central Food Retail' }
                ];
            }
        },

        /**
         * Initialize page
         * @param {object} params - Route parameters
         */
        async init(params = {}) {
            // Reset state
            selectedReportType = 'pnd1';
            selectedMonth = new Date().getMonth() + 1;
            selectedYear = new Date().getFullYear();
            selectedCompany = 'all';
            isGenerating = false;

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
                    <div class="skeleton shimmer" style="width: 300px; height: 32px; margin-bottom: 8px;"></div>
                    <div class="skeleton shimmer" style="width: 200px; height: 20px; margin-bottom: 24px;"></div>

                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div class="skeleton shimmer" style="width: 200px; height: 24px; margin-bottom: 16px;"></div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            ${[1, 2, 3, 4].map(() => `
                                <div class="skeleton shimmer" style="width: 100%; height: 120px; border-radius: 8px;"></div>
                            `).join('')}
                        </div>
                        <div class="skeleton shimmer" style="width: 100%; height: 80px; border-radius: 8px;"></div>
                    </div>

                    <div class="skeleton shimmer" style="width: 100%; height: 200px; border-radius: 8px;"></div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GovernmentReportsPage;
}
