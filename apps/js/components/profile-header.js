/**
 * Profile Header Component
 * Photo, name, title, employee ID, action buttons
 */

const ProfileHeaderComponent = (function() {
    return {
        /**
         * Render profile header
         * @param {object} employee
         * @returns {string}
         */
        render(employee) {
            if (!employee) {
                return '<div class="bg-gray-200 h-48"></div>';
            }

            const isThai = i18n.isThai();
            const personal = employee.personalInfo || {};
            const employment = employee.employmentInfo || {};

            const fullName = isThai
                ? `${personal.firstNameTh || personal.firstNameEn} ${personal.lastNameTh || personal.lastNameEn}`
                : `${personal.firstNameEn} ${personal.lastNameEn}`;

            const title = employment.organization?.position?.split(' (')[0] || '';
            const location = employment.organization?.workLocation?.split(' (')[0] || '';
            const company = employment.organization?.company?.split(' (')[0] || '';

            return `
                <div class="profile-gradient text-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                        <!-- Action Buttons -->
                        <div class="flex flex-wrap justify-end gap-2 sm:gap-4 mb-4">
                            <div class="relative">
                                <button class="flex items-center gap-1 hover:bg-white/20 px-3 py-1.5 rounded transition text-sm"
                                        onclick="ProfileHeaderComponent.toggleActionsMenu()">
                                    <span class="material-icons text-sm">more_vert</span>
                                    <span class="hidden sm:inline">${i18n.t('common.actions')}</span>
                                </button>
                                <div id="profile-actions-menu" class="dropdown-menu absolute right-0 top-full mt-1 w-56 bg-white text-gray-700 rounded-lg shadow-lg border py-1 z-10">
                                    <a href="javascript:void(0)" onclick="ProfileHeaderComponent.exportProfile()" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                                        <span class="material-icons text-sm text-gray-500">download</span>
                                        <span>Export Profile (PDF)</span>
                                    </a>
                                    <a href="#/workflows" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                                        <span class="material-icons text-sm text-gray-500">assignment</span>
                                        <span>View My Pending Requests</span>
                                    </a>
                                    <hr class="my-1">
                                    <a href="javascript:void(0)" onclick="ProfileHeaderComponent.showEmploymentDetails()" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                                        <span class="material-icons text-sm text-gray-500">work</span>
                                        <span>Employment Details</span>
                                    </a>
                                </div>
                            </div>
                            <button class="flex items-center gap-1 hover:bg-white/20 px-3 py-1.5 rounded transition text-sm"
                                    onclick="ProfileHeaderComponent.editHeader()">
                                <span class="material-icons text-sm">edit</span>
                                <span class="hidden sm:inline">${i18n.t('profile.header')}</span>
                            </button>
                            <button class="flex items-center gap-1 hover:bg-white/20 px-3 py-1.5 rounded transition text-sm"
                                    onclick="ProfileHeaderComponent.showAsOfDate()">
                                <span class="material-icons text-sm">calendar_today</span>
                                <span class="hidden sm:inline">${i18n.t('profile.asOfToday')}</span>
                            </button>
                        </div>

                        <!-- Profile Info -->
                        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                            <!-- Photo -->
                            <div class="relative">
                                <div class="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img src="${employee.photo || 'https://via.placeholder.com/150'}"
                                         alt="${fullName}"
                                         class="w-full h-full object-cover"
                                         onerror="this.src='https://via.placeholder.com/150?text=${encodeURIComponent(fullName.charAt(0))}'">
                                </div>
                                <button class="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition"
                                        onclick="ProfileHeaderComponent.changePhoto()"
                                        title="Change photo">
                                    <span class="material-icons text-sm text-gray-600">photo_camera</span>
                                </button>
                            </div>

                            <!-- Info -->
                            <div class="flex-1 text-center sm:text-left">
                                <h1 class="text-xl sm:text-2xl font-bold mb-1">${fullName}</h1>
                                <p class="text-white/90 mb-2">${title}</p>
                                <div class="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-white/80">
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">badge</span>
                                        ${employee.employeeId}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">business</span>
                                        ${company}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <span class="material-icons text-sm">location_on</span>
                                        ${location}
                                    </span>
                                </div>
                            </div>

                            <!-- Quick Stats (Desktop) -->
                            <div class="hidden lg:flex gap-6 text-center">
                                <div class="bg-white/10 rounded-lg px-4 py-2">
                                    <p class="text-2xl font-bold">${employment.details?.yearsOfService?.split(' ')[0] || '-'}</p>
                                    <p class="text-xs text-white/80">${i18n.t('employment.yearsOfService')}</p>
                                </div>
                                <div class="bg-white/10 rounded-lg px-4 py-2">
                                    <p class="text-2xl font-bold">${employee.orgChart?.directReports?.length || 0}</p>
                                    <p class="text-xs text-white/80">${i18n.t('home.directReports')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Toggle actions menu
         */
        toggleActionsMenu() {
            const menu = document.getElementById('profile-actions-menu');
            if (menu) {
                menu.classList.toggle('open');
            }
        },

        /**
         * Edit header
         */
        editHeader() {
            ToastComponent.info(i18n.isThai() ? 'ฟังก์ชันแก้ไขส่วนหัว' : 'Edit header function');
        },

        /**
         * Show as-of date picker
         */
        showAsOfDate() {
            ModalComponent.open({
                title: i18n.t('profile.asOfToday'),
                size: 'sm',
                content: `
                    <div class="space-y-4">
                        <p class="text-sm text-gray-600">
                            ${i18n.isThai() ? 'เลือกวันที่เพื่อดูข้อมูล ณ วันนั้น' : 'Select a date to view data as of that date'}
                        </p>
                        ${FormFieldComponent.date({
                            name: 'asOfDate',
                            label: i18n.t('common.effectiveDate'),
                            value: DateUtils.today(),
                            max: DateUtils.today()
                        })}
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.confirm'), primary: true, onclick: 'ProfileHeaderComponent.applyAsOfDate()' }
                ]
            });
        },

        /**
         * Apply as-of date
         */
        applyAsOfDate() {
            const dateInput = document.getElementById('asOfDate');
            if (dateInput?.value) {
                ToastComponent.info(`Viewing data as of ${DateUtils.format(dateInput.value)}`);
            }
            ModalComponent.close();
        },

        /**
         * Change photo
         */
        changePhoto() {
            ModalComponent.open({
                title: i18n.isThai() ? 'เปลี่ยนรูปโปรไฟล์' : 'Change Profile Photo',
                size: 'sm',
                content: `
                    <div class="space-y-4">
                        ${FormFieldComponent.file({
                            name: 'photo',
                            label: i18n.isThai() ? 'เลือกรูปภาพ' : 'Select Photo',
                            accept: 'image/*',
                            hint: i18n.isThai() ? 'รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB' : 'JPG, PNG up to 5MB'
                        })}
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.upload'), primary: true, onclick: 'ProfileHeaderComponent.uploadPhoto()' }
                ]
            });
        },

        /**
         * Upload photo
         */
        uploadPhoto() {
            const fileInput = document.getElementById('photo');
            if (fileInput?.files?.length > 0) {
                ToastComponent.success(i18n.t('toast.uploadSuccess'));
            } else {
                ToastComponent.warning(i18n.isThai() ? 'กรุณาเลือกรูปภาพ' : 'Please select an image');
            }
            ModalComponent.close();
        },

        /**
         * Export profile
         */
        exportProfile() {
            ToastComponent.info(i18n.t('toast.downloadStarted'));
            // In real app, trigger PDF generation
        },

        /**
         * Show employment details
         */
        showEmploymentDetails() {
            Router.navigate('profile', { tab: 'employment' });
            this.toggleActionsMenu();
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileHeaderComponent;
}
