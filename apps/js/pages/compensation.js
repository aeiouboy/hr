/**
 * Compensation Page
 * Payment info, payroll, payslips
 */

const CompensationPage = (function() {
    return {
        /**
         * Render compensation tab
         * @param {object} employee
         * @returns {string}
         */
        render(employee) {
            // Show skeleton only if employee data is not available
            if (!employee) {
                return this.renderSkeleton();
            }

            const compensation = employee.compensation || {};
            const payslips = employee.payslips || [];
            const taxDocuments = employee.taxDocuments || [];

            return `
                <div class="space-y-6">
                    <!-- Payment Information -->
                    ${this.renderPaymentInfoSection(compensation.paymentInfo)}

                    <!-- Payroll Information -->
                    ${this.renderPayrollSection(compensation.payroll)}

                    <!-- Payslips -->
                    ${this.renderPayslipsSection(payslips)}

                    <!-- Tax Documents -->
                    ${this.renderTaxDocumentsSection(taxDocuments)}
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
         * Render Payment Information section
         */
        renderPaymentInfoSection(paymentInfo) {
            if (!paymentInfo) return '';

            const items = [
                { label: i18n.t('compensation.jobCountry'), value: paymentInfo.jobCountry },
                { label: i18n.t('compensation.paymentMethod'), value: paymentInfo.paymentMethod },
                { label: i18n.t('compensation.payType'), value: paymentInfo.payType },
                { label: i18n.t('compensation.bank'), value: paymentInfo.bank },
                {
                    label: i18n.t('compensation.accountNumber'),
                    value: MaskUtils.bankAccount(paymentInfo.accountNumber),
                    options: { masked: true }
                }
            ];

            return CardComponent.render({
                id: 'payment-info-card',
                title: i18n.t('compensation.paymentInfo'),
                icon: 'account_balance',
                content: CardComponent.dataGrid(items)
            });
        },

        /**
         * Render Payroll Information section
         */
        renderPayrollSection(payroll) {
            if (!payroll) return '';

            // Hide salary section entirely for users without permission
            const showSalary = RBAC.hasPermission('view_salary_details');

            // Don't show payroll section if user doesn't have permission
            if (!showSalary) {
                return '';
            }

            return CardComponent.render({
                id: 'payroll-info-card',
                title: i18n.t('compensation.payroll'),
                icon: 'payments',
                content: `
                    <div class="text-center py-6">
                        <p class="text-sm text-gray-500 mb-2">${i18n.t('compensation.grossAmount')}</p>
                        <p class="text-3xl font-bold text-gray-900">
                            ${MaskUtils.currency(payroll.grossAmount, payroll.currency)}
                        </p>
                        <p class="text-sm text-gray-500 mt-2">
                            ${i18n.isThai() ? 'ต่อเดือน' : 'per month'}
                        </p>
                    </div>
                `
            });
        },

        /**
         * Render Payslips section
         */
        renderPayslipsSection(payslips) {
            if (!payslips || payslips.length === 0) {
                return CardComponent.render({
                    id: 'payslips-card',
                    title: i18n.t('compensation.payslips'),
                    icon: 'receipt_long',
                    content: CardComponent.emptyState(i18n.isThai() ? 'ไม่มีสลิปเงินเดือน' : 'No payslips available')
                });
            }

            // Hide salary columns entirely for users without permission
            const showSalary = RBAC.hasPermission('view_salary_details');

            const tableContent = `
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('compensation.period')}</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('compensation.payDate')}</th>
                                ${showSalary ? `<th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('compensation.grossAmount')}</th>` : ''}
                                ${showSalary ? `<th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('compensation.netAmount')}</th>` : ''}
                                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${payslips.map(slip => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-3 text-sm text-gray-900">${slip.period}</td>
                                    <td class="px-4 py-3 text-sm text-gray-500">${DateUtils.format(slip.payDate, 'medium')}</td>
                                    ${showSalary ? `<td class="px-4 py-3 text-sm text-gray-900 text-right">${MaskUtils.currency(slip.grossAmount)}</td>` : ''}
                                    ${showSalary ? `<td class="px-4 py-3 text-sm text-gray-900 text-right">${MaskUtils.currency(slip.netAmount)}</td>` : ''}
                                    <td class="px-4 py-3 text-center">
                                        <button class="p-1.5 hover:bg-gray-100 rounded transition"
                                                onclick="CompensationPage.downloadPayslip('${slip.id}')"
                                                title="${i18n.t('compensation.downloadPayslip')}">
                                            <span class="material-icons text-sm text-cg-info">download</span>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            return CardComponent.render({
                id: 'payslips-card',
                title: i18n.t('compensation.payslips'),
                icon: 'receipt_long',
                content: tableContent
            });
        },

        /**
         * Render tax documents section
         * @param {array} taxDocuments
         * @returns {string} HTML
         */
        renderTaxDocumentsSection(taxDocuments) {
            if (!taxDocuments || taxDocuments.length === 0) {
                return CardComponent.render({
                    id: 'tax-documents-card',
                    title: i18n.t('compensation.taxDocuments'),
                    icon: 'description',
                    content: CardComponent.emptyState(i18n.isThai() ? 'ไม่มีเอกสารภาษี' : 'No tax documents available')
                });
            }

            const tableContent = `
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.isThai() ? 'ประเภทเอกสาร' : 'Document Type'}</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('compensation.taxYear')}</th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.isThai() ? 'วันที่ออก' : 'Issue Date'}</th>
                                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">${i18n.t('common.actions')}</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${taxDocuments.map(doc => `
                                <tr class="hover:bg-gray-50">
                                    <td class="px-4 py-3 text-sm text-gray-900">${doc.documentType}</td>
                                    <td class="px-4 py-3 text-sm text-gray-900">${doc.taxYear}</td>
                                    <td class="px-4 py-3 text-sm text-gray-500">${DateUtils.format(doc.issueDate, 'medium')}</td>
                                    <td class="px-4 py-3 text-center">
                                        <button class="p-1.5 hover:bg-gray-100 rounded transition"
                                                onclick="CompensationPage.downloadTaxDocument('${doc.id}')"
                                                title="${i18n.t('compensation.downloadTaxDocument')}">
                                            <span class="material-icons text-sm text-cg-info">download</span>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;

            return CardComponent.render({
                id: 'tax-documents-card',
                title: i18n.t('compensation.taxDocuments'),
                icon: 'description',
                content: tableContent
            });
        },

        /**
         * Download payslip
         * @param {string} payslipId
         */
        async downloadPayslip(payslipId) {
            try {
                ToastComponent.info(i18n.t('toast.downloadStarted'));
                const employee = AppState.get('currentEmployee');
                const blob = await API.downloadPayslip(employee.employeeId, payslipId);

                // Create download link
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `payslip_${payslipId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Download tax document
         * @param {string} taxDocId
         */
        async downloadTaxDocument(taxDocId) {
            try {
                ToastComponent.info(i18n.t('toast.downloadStarted'));
                const employee = AppState.get('currentEmployee');
                const blob = await API.downloadTaxDocument(employee.employeeId, taxDocId);

                // Create download link
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `tax_document_${taxDocId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Render skeleton loading state
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="space-y-6">
                    ${SkeletonComponent.renderCardSkeleton({ lines: 4 })}
                    ${SkeletonComponent.renderTableSkeleton(5, 4)}
                    ${SkeletonComponent.renderTableSkeleton(3, 3)}
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CompensationPage;
}
