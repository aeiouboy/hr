/**
 * Scorecard Page
 * Performance assessment, competencies, career development, and 9-Box Matrix
 */

const ScorecardPage = (function() {
    return {
        /**
         * Render scorecard tab
         * @param {object} employee
         * @returns {string}
         */
        render(employee) {
            if (!employee) return CardComponent.emptyState(i18n.t('common.noData'));

            const scorecard = employee.scorecard || {};

            return `
                <div class="space-y-6">
                    <!-- CG Competency -->
                    ${this.renderCompetenciesSection(scorecard.competencies)}

                    <!-- Personal Assessment History -->
                    ${this.renderAssessmentHistorySection(scorecard.assessmentHistory)}

                    <!-- Personal Assessment Summary -->
                    ${this.renderAssessmentSummarySection(scorecard.assessmentSummary)}

                    <!-- Key Successes -->
                    ${this.renderKeySuccessesSection(scorecard.keySuccesses)}

                    <!-- Top Strengths & Development Areas -->
                    ${this.renderStrengthsSection(scorecard.strengths, scorecard.developmentAreas)}

                    <!-- Career Aspirations -->
                    ${this.renderCareerAspirationsSection(scorecard.careerAspirations)}

                    <!-- Development Objectives -->
                    ${this.renderDevelopmentObjectivesSection(scorecard.developmentObjectives)}

                    <!-- Talent Reference -->
                    ${this.renderTalentReferenceSection(scorecard.talentReference)}

                    <!-- Performance-Potential Matrix -->
                    ${this.renderPerformancePotentialMatrixSection(scorecard.performancePotentialMatrix)}

                    <!-- Overall Final Calibration -->
                    ${this.renderFinalCalibrationSection(scorecard.finalCalibration)}
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
         * Render CG Competencies section
         */
        renderCompetenciesSection(competencies) {
            const content = competencies && competencies.length > 0
                ? competencies.map(comp => `
                    <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div class="p-2 bg-purple-100 rounded-lg">
                            <span class="material-icons text-purple-600">assessment</span>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-start justify-between">
                                <div>
                                    <h4 class="font-medium text-gray-900">${i18n.isThai() ? comp.nameTh : comp.name}</h4>
                                    <p class="text-sm text-gray-600 mt-1">${comp.description}</p>
                                </div>
                                <div class="ml-4">
                                    ${this.renderRatingBadge(comp.rating)}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')
                : CardComponent.emptyState(i18n.t('scorecard.noCompetencies'));

            return CardComponent.render({
                id: 'competencies-card',
                title: i18n.t('scorecard.cgCompetency'),
                icon: 'assessment',
                iconColor: 'purple',
                collapsible: true,
                content: `<div class="space-y-3">${content}</div>`
            });
        },

        /**
         * Render rating badge (1-5 scale)
         */
        renderRatingBadge(rating) {
            const colors = {
                5: 'bg-green-100 text-green-800',
                4: 'bg-blue-100 text-blue-800',
                3: 'bg-yellow-100 text-yellow-800',
                2: 'bg-orange-100 text-orange-800',
                1: 'bg-red-100 text-red-800'
            };
            const color = colors[rating] || colors[3];

            return `
                <div class="flex items-center gap-1 px-3 py-1 ${color} rounded-full">
                    <span class="material-icons text-sm">star</span>
                    <span class="text-sm font-semibold">${rating}/5</span>
                </div>
            `;
        },

        /**
         * Render Assessment History section
         */
        renderAssessmentHistorySection(assessments) {
            const content = assessments && assessments.length > 0
                ? `
                    <div class="space-y-3">
                        ${assessments.map(assessment => `
                            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div class="p-2 bg-indigo-100 rounded-lg">
                                    <span class="material-icons text-indigo-600">history</span>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-medium text-gray-900">${i18n.isThai() ? assessment.programTh : assessment.program}</h4>
                                    <p class="text-sm text-gray-600">${i18n.t('scorecard.assessor')}: ${assessment.assessor}</p>
                                    <p class="text-xs text-gray-500 mt-1">${DateUtils.format(assessment.assessmentDate, 'full')}</p>
                                </div>
                                <div>
                                    <span class="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        ${i18n.t('scorecard.completed')}
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `
                : CardComponent.emptyState(i18n.t('scorecard.noAssessments'));

            return CardComponent.render({
                id: 'assessment-history-card',
                title: i18n.t('scorecard.personalAssessmentHistory'),
                icon: 'history',
                iconColor: 'indigo',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render Assessment Summary section
         */
        renderAssessmentSummarySection(summary) {
            const content = summary
                ? `
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                            <div>
                                <p class="text-sm text-gray-600">${i18n.t('scorecard.overallRating')}</p>
                                <p class="text-3xl font-bold text-indigo-600">${summary.overallRating.toFixed(1)}/5.0</p>
                                <p class="text-sm font-medium text-gray-900 mt-1">${i18n.isThai() ? summary.ratingLabelTh : summary.ratingLabel}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-gray-600">${i18n.t('scorecard.ratingPeriod')}</p>
                                <p class="text-lg font-semibold text-gray-900">${summary.period}</p>
                            </div>
                        </div>
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <p class="text-sm text-gray-700">${summary.summary}</p>
                        </div>
                    </div>
                `
                : CardComponent.emptyState(i18n.t('scorecard.noSummary'));

            return CardComponent.render({
                id: 'assessment-summary-card',
                title: i18n.t('scorecard.personalAssessmentSummary'),
                icon: 'summarize',
                iconColor: 'blue',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render Key Successes section
         */
        renderKeySuccessesSection(successes) {
            const content = successes && successes.length > 0
                ? successes.map(success => `
                    <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div class="p-2 bg-amber-100 rounded-lg">
                            <span class="material-icons text-amber-600">emoji_events</span>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-start justify-between">
                                <div>
                                    <h4 class="font-medium text-gray-900">${i18n.isThai() ? success.titleTh : success.title}</h4>
                                    <p class="text-sm text-gray-600 mt-1">${success.description}</p>
                                    <p class="text-xs text-gray-500 mt-2">${DateUtils.format(success.date, 'full')}</p>
                                </div>
                                <div class="ml-4">
                                    ${this.renderImpactBadge(success.impact)}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')
                : CardComponent.emptyState(i18n.t('scorecard.noSuccesses'));

            return CardComponent.render({
                id: 'key-successes-card',
                title: i18n.t('scorecard.keySuccesses'),
                icon: 'emoji_events',
                iconColor: 'amber',
                collapsible: true,
                content: `<div class="space-y-3">${content}</div>`
            });
        },

        /**
         * Render impact badge
         */
        renderImpactBadge(impact) {
            const impactLevels = {
                'High': { color: 'bg-red-100 text-red-800', label: i18n.t('scorecard.impactHigh') },
                'Medium': { color: 'bg-yellow-100 text-yellow-800', label: i18n.t('scorecard.impactMedium') },
                'Low': { color: 'bg-blue-100 text-blue-800', label: i18n.t('scorecard.impactLow') }
            };
            const impactData = impactLevels[impact] || impactLevels['Medium'];

            return `<span class="px-3 py-1 text-xs font-medium ${impactData.color} rounded-full">${impactData.label}</span>`;
        },

        /**
         * Render Strengths and Development Areas section
         */
        renderStrengthsSection(strengths, developmentAreas) {
            const strengthsContent = strengths && strengths.length > 0
                ? strengths.map(strength => `
                    <div class="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <span class="material-icons text-green-600 text-sm mt-0.5">check_circle</span>
                        <div class="flex-1">
                            <h5 class="text-sm font-medium text-gray-900">${i18n.isThai() ? strength.areaTh : strength.area}</h5>
                            <p class="text-xs text-gray-600 mt-1">${strength.description}</p>
                        </div>
                    </div>
                `).join('')
                : `<p class="text-sm text-gray-500 text-center py-4">${i18n.t('scorecard.noStrengths')}</p>`;

            const developmentContent = developmentAreas && developmentAreas.length > 0
                ? developmentAreas.map(area => `
                    <div class="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                        <span class="material-icons text-orange-600 text-sm mt-0.5">trending_up</span>
                        <div class="flex-1">
                            <div class="flex items-start justify-between">
                                <div>
                                    <h5 class="text-sm font-medium text-gray-900">${i18n.isThai() ? area.areaTh : area.area}</h5>
                                    <p class="text-xs text-gray-600 mt-1">${area.description}</p>
                                </div>
                                ${area.priority ? `<span class="ml-2 px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-800 rounded">${area.priority}</span>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')
                : `<p class="text-sm text-gray-500 text-center py-4">${i18n.t('scorecard.noDevelopmentAreas')}</p>`;

            const content = `
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <span class="material-icons text-green-600 text-base">thumb_up</span>
                            ${i18n.t('scorecard.strengths')}
                        </h3>
                        <div class="space-y-2">
                            ${strengthsContent}
                        </div>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <span class="material-icons text-orange-600 text-base">insights</span>
                            ${i18n.t('scorecard.developmentAreas')}
                        </h3>
                        <div class="space-y-2">
                            ${developmentContent}
                        </div>
                    </div>
                </div>
            `;

            return CardComponent.render({
                id: 'strengths-development-card',
                title: i18n.t('scorecard.topStrengths'),
                icon: 'psychology',
                iconColor: 'teal',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render Career Aspirations section
         */
        renderCareerAspirationsSection(aspirations) {
            const content = aspirations
                ? `
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <div class="flex items-center gap-2 mb-3">
                                <span class="material-icons text-blue-600">near_me</span>
                                <h3 class="font-semibold text-gray-900">${i18n.t('scorecard.shortTerm')}</h3>
                            </div>
                            <p class="text-lg font-medium text-blue-900">${i18n.isThai() ? aspirations.shortTerm.goalTh : aspirations.shortTerm.goal}</p>
                            <p class="text-sm text-gray-600 mt-2">${aspirations.shortTerm.description}</p>
                            <p class="text-xs text-gray-500 mt-3">${i18n.t('scorecard.timeframe')}: ${aspirations.shortTerm.timeframe}</p>
                        </div>
                        <div class="p-4 bg-purple-50 rounded-lg">
                            <div class="flex items-center gap-2 mb-3">
                                <span class="material-icons text-purple-600">stars</span>
                                <h3 class="font-semibold text-gray-900">${i18n.t('scorecard.longTerm')}</h3>
                            </div>
                            <p class="text-lg font-medium text-purple-900">${i18n.isThai() ? aspirations.longTerm.goalTh : aspirations.longTerm.goal}</p>
                            <p class="text-sm text-gray-600 mt-2">${aspirations.longTerm.description}</p>
                            <p class="text-xs text-gray-500 mt-3">${i18n.t('scorecard.timeframe')}: ${aspirations.longTerm.timeframe}</p>
                        </div>
                    </div>
                `
                : CardComponent.emptyState(i18n.t('scorecard.noCareerGoals'));

            return CardComponent.render({
                id: 'career-aspirations-card',
                title: i18n.t('scorecard.careerAspirations'),
                icon: 'rocket_launch',
                iconColor: 'indigo',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render Development Objectives section
         */
        renderDevelopmentObjectivesSection(objectives) {
            const content = objectives && objectives.length > 0
                ? objectives.map(obj => `
                    <div class="p-4 bg-gray-50 rounded-lg">
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex-1">
                                <h4 class="font-medium text-gray-900">${i18n.isThai() ? obj.objectiveTh : obj.objective}</h4>
                                <p class="text-sm text-gray-600 mt-1">${obj.description}</p>
                            </div>
                            <span class="ml-4 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                ${i18n.t('scorecard.inProgress')}
                            </span>
                        </div>
                        <div class="flex items-center gap-4 mt-3">
                            <div class="flex-1">
                                <div class="flex items-center justify-between text-xs text-gray-600 mb-1">
                                    <span>${i18n.t('scorecard.progress')}</span>
                                    <span>${obj.progress}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full transition-all" style="width: ${obj.progress}%"></div>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-xs text-gray-500">${i18n.t('scorecard.targetDate')}</p>
                                <p class="text-sm font-medium text-gray-900">${DateUtils.format(obj.targetDate, 'monthYearShort')}</p>
                            </div>
                        </div>
                    </div>
                `).join('')
                : CardComponent.emptyState(i18n.t('scorecard.noObjectives'));

            return CardComponent.render({
                id: 'development-objectives-card',
                title: i18n.t('scorecard.developmentObjectives'),
                icon: 'flag',
                iconColor: 'green',
                collapsible: true,
                content: `<div class="space-y-3">${content}</div>`
            });
        },

        /**
         * Render Talent Reference section
         */
        renderTalentReferenceSection(talent) {
            const content = talent
                ? `
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="p-4 bg-purple-50 rounded-lg">
                            <p class="text-xs text-gray-600 mb-1">${i18n.t('scorecard.talentPool')}</p>
                            <p class="text-lg font-semibold text-purple-900">${i18n.isThai() ? talent.talentPoolTh : talent.talentPool}</p>
                        </div>
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <p class="text-xs text-gray-600 mb-1">${i18n.t('scorecard.potentialRating')}</p>
                            <p class="text-lg font-semibold text-blue-900">${talent.potentialRating}</p>
                        </div>
                        <div class="p-4 bg-green-50 rounded-lg">
                            <p class="text-xs text-gray-600 mb-1">${i18n.t('scorecard.readinessForPromotion')}</p>
                            <p class="text-lg font-semibold text-green-900">${i18n.isThai() ? talent.readinessForPromotionTh : talent.readinessForPromotion}</p>
                        </div>
                        <div class="p-4 bg-indigo-50 rounded-lg">
                            <p class="text-xs text-gray-600 mb-1">${i18n.t('scorecard.successionPosition')}</p>
                            <p class="text-lg font-semibold text-indigo-900">${talent.successionPosition}</p>
                        </div>
                    </div>
                    ${talent.notes ? `
                        <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p class="text-xs text-gray-600 mb-1">${i18n.t('scorecard.notes')}</p>
                            <p class="text-sm text-gray-700">${talent.notes}</p>
                        </div>
                    ` : ''}
                `
                : CardComponent.emptyState(i18n.t('scorecard.noTalentData'));

            return CardComponent.render({
                id: 'talent-reference-card',
                title: i18n.t('scorecard.talentReference'),
                icon: 'workspace_premium',
                iconColor: 'purple',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render Performance-Potential Matrix (9-Box Grid) section
         */
        renderPerformancePotentialMatrixSection(matrix) {
            const content = matrix
                ? `
                    <div class="space-y-4">
                        <div class="text-center mb-4">
                            <h3 class="text-lg font-semibold text-gray-900">${i18n.t('scorecard.matrixTitle')}</h3>
                            <p class="text-sm text-gray-600 mt-1">${i18n.t('scorecard.yourPosition')}: <span class="font-semibold text-indigo-600">${i18n.isThai() ? matrix.boxLabelTh : matrix.boxLabel}</span></p>
                        </div>

                        <div class="flex items-center justify-center">
                            <div class="relative">
                                <!-- Y-axis label (Potential) -->
                                <div class="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90">
                                    <p class="text-sm font-semibold text-gray-700 whitespace-nowrap">${i18n.t('scorecard.potentialAxis')}</p>
                                </div>

                                <!-- 9-Box Grid -->
                                <div class="grid grid-cols-3 gap-1 bg-gray-300 p-1 rounded-lg">
                                    ${this.render9BoxGrid(matrix)}
                                </div>

                                <!-- X-axis label (Performance) -->
                                <div class="text-center mt-4">
                                    <p class="text-sm font-semibold text-gray-700">${i18n.t('scorecard.performanceAxis')}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Legend -->
                        <div class="mt-6 grid grid-cols-3 gap-2 text-xs">
                            <div class="text-center p-2 bg-red-50 rounded">
                                <span class="font-medium text-red-800">${i18n.t('scorecard.potentialLow')}</span>
                            </div>
                            <div class="text-center p-2 bg-yellow-50 rounded">
                                <span class="font-medium text-yellow-800">${i18n.t('scorecard.potentialMedium')}</span>
                            </div>
                            <div class="text-center p-2 bg-green-50 rounded">
                                <span class="font-medium text-green-800">${i18n.t('scorecard.potentialHigh')}</span>
                            </div>
                        </div>
                    </div>
                `
                : CardComponent.emptyState(i18n.t('scorecard.noMatrixData'));

            return CardComponent.render({
                id: 'performance-potential-matrix-card',
                title: i18n.t('scorecard.performancePotentialMatrix'),
                icon: 'grid_on',
                iconColor: 'pink',
                collapsible: true,
                content: content
            });
        },

        /**
         * Render 9-Box Grid cells
         */
        render9BoxGrid(matrix) {
            const boxes = [
                // Row 3 (High Potential)
                { pos: 7, label: 'enigma', color: 'bg-yellow-200', potential: 3, performance: 1 },
                { pos: 8, label: 'futureLeader', color: 'bg-green-200', potential: 3, performance: 2 },
                { pos: 9, label: 'stars', color: 'bg-green-400', potential: 3, performance: 3 },
                // Row 2 (Medium Potential)
                { pos: 4, label: 'growthEmployee', color: 'bg-yellow-100', potential: 2, performance: 1 },
                { pos: 5, label: 'core', color: 'bg-yellow-200', potential: 2, performance: 2 },
                { pos: 6, label: 'highProfessional', color: 'bg-green-200', potential: 2, performance: 3 },
                // Row 1 (Low Potential)
                { pos: 1, label: 'questionable', color: 'bg-red-200', potential: 1, performance: 1 },
                { pos: 2, label: 'lowPerformer', color: 'bg-orange-200', potential: 1, performance: 2 },
                { pos: 3, label: 'underPerformer', color: 'bg-yellow-100', potential: 1, performance: 3 },
            ];

            return boxes.map(box => {
                const isCurrentPosition = matrix.performance === box.performance && matrix.potential === box.potential;
                const borderClass = isCurrentPosition ? 'ring-4 ring-indigo-600 ring-offset-2' : '';

                return `
                    <div class="relative w-24 h-24 ${box.color} ${borderClass} rounded-lg flex items-center justify-center p-2 transition-all hover:scale-105">
                        <p class="text-xs font-medium text-gray-800 text-center leading-tight">
                            ${i18n.t(`scorecard.boxLabels.${box.label}`)}
                        </p>
                        ${isCurrentPosition ? `
                            <div class="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                                <span class="material-icons text-white text-sm">person</span>
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('');
        },

        /**
         * Render Final Calibration section
         */
        renderFinalCalibrationSection(calibration) {
            const content = calibration
                ? `
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                            <div>
                                <p class="text-sm text-gray-600">${i18n.t('scorecard.overallRating')}</p>
                                <p class="text-3xl font-bold text-indigo-600">${calibration.overallRating.toFixed(1)}/5.0</p>
                                <p class="text-sm font-medium text-gray-900 mt-1">${i18n.isThai() ? calibration.ratingLabelTh : calibration.ratingLabel}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-gray-600">${i18n.t('scorecard.calibrationDate')}</p>
                                <p class="text-lg font-semibold text-gray-900">${DateUtils.format(calibration.calibrationDate, 'full')}</p>
                            </div>
                        </div>

                        <div class="p-4 bg-gray-50 rounded-lg">
                            <p class="text-xs text-gray-600 mb-1">${i18n.t('scorecard.calibratedBy')}</p>
                            <p class="text-sm font-medium text-gray-900">${calibration.calibratedBy} <span class="text-gray-600">(${calibration.calibratedByTitle})</span></p>
                        </div>

                        ${calibration.comments ? `
                            <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                <p class="text-xs text-blue-900 font-medium mb-2">${i18n.t('scorecard.comments')}</p>
                                <p class="text-sm text-gray-700">${calibration.comments}</p>
                            </div>
                        ` : ''}
                    </div>
                `
                : CardComponent.emptyState(i18n.t('scorecard.noCalibration'));

            return CardComponent.render({
                id: 'final-calibration-card',
                title: i18n.t('scorecard.overallFinalCalibration'),
                icon: 'verified',
                iconColor: 'indigo',
                collapsible: true,
                content: content
            });
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScorecardPage;
}
