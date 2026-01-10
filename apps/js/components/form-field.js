/**
 * Form Field Components
 * Input, select, date picker, file upload
 */

const FormFieldComponent = (function() {
    return {
        /**
         * Render a text input field
         * @param {object} options
         * @returns {string}
         */
        text(options) {
            const {
                id,
                name,
                label,
                value = '',
                placeholder = '',
                required = false,
                disabled = false,
                readonly = false,
                error = '',
                hint = '',
                type = 'text',
                maxLength = '',
                minLength = '',
                pattern = '',
                autocomplete = '',
                className = ''
            } = options;

            const fieldId = id || name;

            return `
                <div class="form-group ${className}">
                    <label for="${fieldId}" class="block text-sm font-medium text-gray-700 mb-1">
                        ${label}
                        ${required ? '<span class="text-red-500">*</span>' : ''}
                    </label>
                    <input
                        type="${type}"
                        id="${fieldId}"
                        name="${name}"
                        value="${this.escapeHtml(value)}"
                        placeholder="${placeholder}"
                        ${required ? 'required aria-required="true"' : ''}
                        ${disabled ? 'disabled' : ''}
                        ${readonly ? 'readonly' : ''}
                        ${maxLength ? `maxlength="${maxLength}"` : ''}
                        ${minLength ? `minlength="${minLength}"` : ''}
                        ${pattern ? `pattern="${pattern}"` : ''}
                        ${autocomplete ? `autocomplete="${autocomplete}"` : ''}
                        class="w-full px-3 py-2 border rounded-lg form-input
                               ${error ? 'border-red-500 error' : 'border-gray-300'}
                               ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                               ${readonly ? 'bg-gray-50' : ''}
                               focus:outline-none focus:ring-2 focus:ring-cg-info/20 focus:border-cg-info"
                        aria-describedby="${[error ? `${fieldId}-error` : '', hint ? `${fieldId}-hint` : ''].filter(Boolean).join(' ').trim() || undefined}"
                        aria-invalid="${error ? 'true' : 'false'}"
                    >
                    ${hint && !error ? `<p id="${fieldId}-hint" class="mt-1 text-xs text-gray-500">${hint}</p>` : ''}
                    ${error ? `<p id="${fieldId}-error" class="mt-1 text-xs text-red-500" role="alert">${error}</p>` : ''}
                </div>
            `;
        },

        /**
         * Render a number input field
         * @param {object} options
         * @returns {string}
         */
        number(options) {
            const {
                id,
                name,
                label,
                value = '',
                placeholder = '',
                required = false,
                disabled = false,
                readonly = false,
                error = '',
                hint = '',
                min = '',
                max = '',
                step = '',
                className = ''
            } = options;

            const fieldId = id || name;

            return `
                <div class="form-group ${className}">
                    <label for="${fieldId}" class="block text-sm font-medium text-gray-700 mb-1">
                        ${label}
                        ${required ? '<span class="text-red-500">*</span>' : ''}
                    </label>
                    <input
                        type="number"
                        id="${fieldId}"
                        name="${name}"
                        value="${value}"
                        placeholder="${placeholder}"
                        ${required ? 'required aria-required="true"' : ''}
                        ${disabled ? 'disabled' : ''}
                        ${readonly ? 'readonly' : ''}
                        ${min !== '' ? `min="${min}"` : ''}
                        ${max !== '' ? `max="${max}"` : ''}
                        ${step !== '' ? `step="${step}"` : ''}
                        class="w-full px-3 py-2 border rounded-lg form-input
                               ${error ? 'border-red-500 error' : 'border-gray-300'}
                               ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                               ${readonly ? 'bg-gray-50' : ''}
                               focus:outline-none focus:ring-2 focus:ring-cg-info/20 focus:border-cg-info"
                        aria-describedby="${[error ? `${fieldId}-error` : '', hint ? `${fieldId}-hint` : ''].filter(Boolean).join(' ').trim() || undefined}"
                        aria-invalid="${error ? 'true' : 'false'}"
                    >
                    ${hint && !error ? `<p id="${fieldId}-hint" class="mt-1 text-xs text-gray-500">${hint}</p>` : ''}
                    ${error ? `<p id="${fieldId}-error" class="mt-1 text-xs text-red-500" role="alert">${error}</p>` : ''}
                </div>
            `;
        },

        /**
         * Render a textarea field
         * @param {object} options
         * @returns {string}
         */
        textarea(options) {
            const {
                id,
                name,
                label,
                value = '',
                placeholder = '',
                required = false,
                disabled = false,
                readonly = false,
                error = '',
                hint = '',
                rows = 3,
                maxLength = '',
                className = ''
            } = options;

            const fieldId = id || name;

            return `
                <div class="form-group ${className}">
                    <label for="${fieldId}" class="block text-sm font-medium text-gray-700 mb-1">
                        ${label}
                        ${required ? '<span class="text-red-500">*</span>' : ''}
                    </label>
                    <textarea
                        id="${fieldId}"
                        name="${name}"
                        placeholder="${placeholder}"
                        rows="${rows}"
                        ${required ? 'required aria-required="true"' : ''}
                        ${disabled ? 'disabled' : ''}
                        ${readonly ? 'readonly' : ''}
                        ${maxLength ? `maxlength="${maxLength}"` : ''}
                        class="w-full px-3 py-2 border rounded-lg form-input resize-none
                               ${error ? 'border-red-500 error' : 'border-gray-300'}
                               ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                               focus:outline-none focus:ring-2 focus:ring-cg-info/20 focus:border-cg-info"
                        aria-describedby="${[error ? `${fieldId}-error` : '', hint ? `${fieldId}-hint` : ''].filter(Boolean).join(' ').trim() || undefined}"
                        aria-invalid="${error ? 'true' : 'false'}"
                    >${this.escapeHtml(value)}</textarea>
                    ${hint && !error ? `<p id="${fieldId}-hint" class="mt-1 text-xs text-gray-500">${hint}</p>` : ''}
                    ${error ? `<p id="${fieldId}-error" class="mt-1 text-xs text-red-500" role="alert">${error}</p>` : ''}
                </div>
            `;
        },

        /**
         * Render a select dropdown
         * @param {object} options
         * @returns {string}
         */
        select(options) {
            const {
                id,
                name,
                label,
                value = '',
                options: selectOptions = [],
                placeholder = '',
                required = false,
                disabled = false,
                error = '',
                hint = '',
                className = ''
            } = options;

            const fieldId = id || name;

            return `
                <div class="form-group ${className}">
                    <label for="${fieldId}" class="block text-sm font-medium text-gray-700 mb-1">
                        ${label}
                        ${required ? '<span class="text-red-500">*</span>' : ''}
                    </label>
                    <select
                        id="${fieldId}"
                        name="${name}"
                        ${required ? 'required aria-required="true"' : ''}
                        ${disabled ? 'disabled' : ''}
                        class="w-full px-3 py-2 border rounded-lg form-input appearance-none bg-white
                               ${error ? 'border-red-500 error' : 'border-gray-300'}
                               ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                               focus:outline-none focus:ring-2 focus:ring-cg-info/20 focus:border-cg-info"
                        style="background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\"); background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 2.5rem;"
                        aria-describedby="${[error ? `${fieldId}-error` : '', hint ? `${fieldId}-hint` : ''].filter(Boolean).join(' ').trim() || undefined}"
                        aria-invalid="${error ? 'true' : 'false'}"
                    >
                        ${placeholder ? `<option value="">${placeholder}</option>` : ''}
                        ${selectOptions.map(opt => `
                            <option value="${opt.value}" ${opt.value === value ? 'selected' : ''}>
                                ${opt.label}
                            </option>
                        `).join('')}
                    </select>
                    ${hint && !error ? `<p id="${fieldId}-hint" class="mt-1 text-xs text-gray-500">${hint}</p>` : ''}
                    ${error ? `<p id="${fieldId}-error" class="mt-1 text-xs text-red-500" role="alert">${error}</p>` : ''}
                </div>
            `;
        },

        /**
         * Render a date picker
         * @param {object} options
         * @returns {string}
         */
        date(options) {
            const {
                id,
                name,
                label,
                value = '',
                required = false,
                disabled = false,
                error = '',
                hint = '',
                min = '',
                max = '',
                className = ''
            } = options;

            const fieldId = id || name;

            return `
                <div class="form-group ${className}">
                    <label for="${fieldId}" class="block text-sm font-medium text-gray-700 mb-1">
                        ${label}
                        ${required ? '<span class="text-red-500">*</span>' : ''}
                    </label>
                    <input
                        type="date"
                        id="${fieldId}"
                        name="${name}"
                        value="${value}"
                        ${required ? 'required aria-required="true"' : ''}
                        ${disabled ? 'disabled' : ''}
                        ${min ? `min="${min}"` : ''}
                        ${max ? `max="${max}"` : ''}
                        class="w-full px-3 py-2 border rounded-lg form-input
                               ${error ? 'border-red-500 error' : 'border-gray-300'}
                               ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
                               focus:outline-none focus:ring-2 focus:ring-cg-info/20 focus:border-cg-info"
                        aria-describedby="${[error ? `${fieldId}-error` : '', hint ? `${fieldId}-hint` : ''].filter(Boolean).join(' ').trim() || undefined}"
                        aria-invalid="${error ? 'true' : 'false'}"
                    >
                    ${hint && !error ? `<p id="${fieldId}-hint" class="mt-1 text-xs text-gray-500">${hint}</p>` : ''}
                    ${error ? `<p id="${fieldId}-error" class="mt-1 text-xs text-red-500" role="alert">${error}</p>` : ''}
                </div>
            `;
        },

        /**
         * Render a checkbox
         * @param {object} options
         * @returns {string}
         */
        checkbox(options) {
            const {
                id,
                name,
                label,
                checked = false,
                disabled = false,
                error = '',
                className = ''
            } = options;

            const fieldId = id || name;

            return `
                <div class="form-group ${className}">
                    <label class="flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}">
                        <input
                            type="checkbox"
                            id="${fieldId}"
                            name="${name}"
                            ${checked ? 'checked' : ''}
                            ${disabled ? 'disabled' : ''}
                            class="w-4 h-4 text-cg-red border-gray-300 rounded focus:ring-cg-red"
                        >
                        <span class="text-sm text-gray-700">${label}</span>
                    </label>
                    ${error ? `<p class="mt-1 text-xs text-red-500" role="alert">${error}</p>` : ''}
                </div>
            `;
        },

        /**
         * Render radio button group
         * @param {object} options
         * @returns {string}
         */
        radio(options) {
            const {
                name,
                label = '',
                options: radioOptions = [],
                value = '',
                disabled = false,
                inline = true,
                error = '',
                className = '',
                onChange = ''
            } = options;

            const optionsHtml = radioOptions.map(opt => `
                <label class="flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}">
                    <input
                        type="radio"
                        name="${name}"
                        value="${opt.value}"
                        ${opt.value === value ? 'checked' : ''}
                        ${disabled ? 'disabled' : ''}
                        ${onChange ? `onchange="${onChange}"` : ''}
                        class="w-4 h-4 text-cg-red border-gray-300 focus:ring-cg-red"
                    >
                    <span class="text-sm text-gray-700">${opt.label}</span>
                </label>
            `).join('');

            return `
                <div class="form-group ${className}">
                    ${label ? `<label class="block text-sm font-medium text-gray-700 mb-2">${label}</label>` : ''}
                    <div class="${inline ? 'flex items-center gap-4' : 'space-y-2'}">
                        ${optionsHtml}
                    </div>
                    ${error ? `<p class="mt-1 text-xs text-red-500" role="alert">${error}</p>` : ''}
                </div>
            `;
        },

        /**
         * Render a file upload field
         * @param {object} options
         * @returns {string}
         */
        file(options) {
            const {
                id,
                name,
                label,
                accept = '',
                required = false,
                multiple = false,
                error = '',
                hint = '',
                className = ''
            } = options;

            const fieldId = id || name;

            return `
                <div class="form-group ${className}">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        ${label}
                        ${required ? '<span class="text-red-500">*</span>' : ''}
                    </label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-cg-info transition cursor-pointer"
                         onclick="document.getElementById('${fieldId}').click()"
                         role="button"
                         tabindex="0"
                         aria-label="${i18n.t('accessibility.fileUploadZone')}"
                         onkeydown="if(event.key==='Enter'||event.key===' ') { event.preventDefault(); document.getElementById('${fieldId}').click(); }">
                        <input
                            type="file"
                            id="${fieldId}"
                            name="${name}"
                            ${accept ? `accept="${accept}"` : ''}
                            ${required ? 'required aria-required="true"' : ''}
                            ${multiple ? 'multiple' : ''}
                            class="hidden"
                            aria-describedby="${[error ? `${fieldId}-error` : '', hint ? `${fieldId}-hint` : ''].filter(Boolean).join(' ').trim() || undefined}"
                            onchange="FormFieldComponent.handleFileSelect(this, '${fieldId}-preview')"
                        >
                        <span class="material-icons text-3xl text-gray-400 mb-2" aria-hidden="true">cloud_upload</span>
                        <p class="text-sm text-gray-600">${i18n.t('common.dragDrop')}</p>
                        ${hint ? `<p id="${fieldId}-hint" class="text-xs text-gray-500 mt-1">${hint}</p>` : ''}
                    </div>
                    <div id="${fieldId}-preview" class="mt-2 space-y-2" aria-live="polite"></div>
                    ${error ? `<p id="${fieldId}-error" class="mt-1 text-xs text-red-500" role="alert">${error}</p>` : ''}
                </div>
            `;
        },

        /**
         * Handle file selection preview
         * @param {HTMLInputElement} input
         * @param {string} previewId
         */
        handleFileSelect(input, previewId) {
            const preview = document.getElementById(previewId);
            if (!preview) return;

            preview.innerHTML = '';

            if (input.files) {
                Array.from(input.files).forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'flex items-center gap-2 p-2 bg-gray-50 rounded';
                    fileItem.innerHTML = `
                        <span class="material-icons text-gray-500">attach_file</span>
                        <span class="flex-1 text-sm truncate">${file.name}</span>
                        <span class="text-xs text-gray-500">${this.formatFileSize(file.size)}</span>
                    `;
                    preview.appendChild(fileItem);
                });
            }
        },

        /**
         * Format file size
         * @param {number} bytes
         * @returns {string}
         */
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        /**
         * Escape HTML to prevent XSS
         * @param {string} str
         * @returns {string}
         */
        escapeHtml(str) {
            if (!str) return '';
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        },

        /**
         * Get form data as object
         * @param {string} formId
         * @returns {object}
         */
        getFormData(formId) {
            const form = document.getElementById(formId);
            if (!form) return {};

            const formData = new FormData(form);
            const data = {};

            formData.forEach((value, key) => {
                if (data[key]) {
                    if (!Array.isArray(data[key])) {
                        data[key] = [data[key]];
                    }
                    data[key].push(value);
                } else {
                    data[key] = value;
                }
            });

            return data;
        },

        /**
         * Set form field value
         * @param {string} fieldId
         * @param {*} value
         */
        setValue(fieldId, value) {
            const field = document.getElementById(fieldId);
            if (!field) return;

            if (field.type === 'checkbox') {
                field.checked = Boolean(value);
            } else {
                field.value = value || '';
            }
        },

        /**
         * Clear form errors
         * @param {string} formId
         */
        clearErrors(formId) {
            const form = document.getElementById(formId);
            if (!form) return;

            form.querySelectorAll('.error').forEach(el => {
                el.classList.remove('error', 'border-red-500');
                el.classList.add('border-gray-300');
            });

            form.querySelectorAll('[role="alert"]').forEach(el => {
                el.remove();
            });
        },

        /**
         * Display form errors
         * @param {object} errors - { fieldName: [errorMessages] }
         */
        showErrors(errors) {
            Object.entries(errors).forEach(([fieldName, messages]) => {
                const field = document.getElementById(fieldName);
                if (field) {
                    field.classList.add('error', 'border-red-500');
                    field.classList.remove('border-gray-300');

                    // Add error message
                    const existingError = field.parentElement.querySelector('[role="alert"]');
                    if (existingError) existingError.remove();

                    const errorEl = document.createElement('p');
                    errorEl.className = 'mt-1 text-xs text-red-500';
                    errorEl.setAttribute('role', 'alert');
                    errorEl.textContent = messages[0];
                    field.parentElement.appendChild(errorEl);
                }
            });
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormFieldComponent;
}
