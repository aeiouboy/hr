/**
 * Skeleton Component
 * Provides loading skeleton screens for better UX during data fetching
 */

const SkeletonComponent = (function() {
  'use strict';

  /**
   * Render a text line placeholder
   * @param {string} width - Width of the line (e.g., '100%', '80%', '200px')
   * @returns {string} HTML string for text line skeleton
   */
  function renderTextLine(width = '100%') {
    return `<div class="skeleton shimmer" style="width: ${width}; height: 16px; border-radius: 4px; margin-bottom: 8px;"></div>`;
  }

  /**
   * Render a circle placeholder (for avatars, icons)
   * @param {string} size - Size of the circle (e.g., '48px', '64px')
   * @returns {string} HTML string for circle skeleton
   */
  function renderCircle(size = '48px') {
    return `<div class="skeleton shimmer" style="width: ${size}; height: ${size}; border-radius: 50%;"></div>`;
  }

  /**
   * Render a card skeleton
   * @param {Object} options - Configuration options
   * @param {number} options.lines - Number of text lines (default: 3)
   * @param {boolean} options.hasHeader - Whether to include header section (default: true)
   * @returns {string} HTML string for card skeleton
   */
  function renderCardSkeleton(options = {}) {
    const { lines = 3, hasHeader = true } = options;

    let headerHtml = '';
    if (hasHeader) {
      headerHtml = `
        <div style="margin-bottom: 16px;">
          ${renderTextLine('40%')}
        </div>
      `;
    }

    let linesHtml = '';
    for (let i = 0; i < lines; i++) {
      const width = i === lines - 1 ? '60%' : '100%';
      linesHtml += renderTextLine(width);
    }

    return `
      <div class="card" style="padding: 20px;">
        ${headerHtml}
        ${linesHtml}
      </div>
    `;
  }

  /**
   * Render a table skeleton
   * @param {number} rows - Number of table rows (default: 5)
   * @param {number} cols - Number of table columns (default: 4)
   * @returns {string} HTML string for table skeleton
   */
  function renderTableSkeleton(rows = 5, cols = 4) {
    let headerHtml = '<tr>';
    for (let i = 0; i < cols; i++) {
      headerHtml += `<th style="padding: 12px;">${renderTextLine('80%')}</th>`;
    }
    headerHtml += '</tr>';

    let rowsHtml = '';
    for (let i = 0; i < rows; i++) {
      rowsHtml += '<tr>';
      for (let j = 0; j < cols; j++) {
        const width = j === 0 ? '90%' : '70%';
        rowsHtml += `<td style="padding: 12px;">${renderTextLine(width)}</td>`;
      }
      rowsHtml += '</tr>';
    }

    return `
      <table class="table" style="width: 100%; border-collapse: collapse;">
        <thead>${headerHtml}</thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  }

  /**
   * Render a profile header skeleton
   * @returns {string} HTML string for profile header skeleton
   */
  function renderProfileHeaderSkeleton() {
    return `
      <div class="card" style="padding: 24px;">
        <div style="display: flex; align-items: center; gap: 20px;">
          ${renderCircle('80px')}
          <div style="flex: 1;">
            ${renderTextLine('200px')}
            ${renderTextLine('150px')}
            ${renderTextLine('180px')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render a form skeleton
   * @param {number} fields - Number of form fields (default: 4)
   * @returns {string} HTML string for form skeleton
   */
  function renderFormSkeleton(fields = 4) {
    let fieldsHtml = '';
    for (let i = 0; i < fields; i++) {
      fieldsHtml += `
        <div style="margin-bottom: 20px;">
          ${renderTextLine('120px')}
          <div class="skeleton shimmer" style="width: 100%; height: 40px; border-radius: 4px; margin-top: 8px;"></div>
        </div>
      `;
    }

    return `
      <div class="card" style="padding: 20px;">
        ${fieldsHtml}
        <div style="margin-top: 24px;">
          <div class="skeleton shimmer" style="width: 120px; height: 40px; border-radius: 4px;"></div>
        </div>
      </div>
    `;
  }

  /**
   * Render a list skeleton
   * @param {number} items - Number of list items (default: 5)
   * @returns {string} HTML string for list skeleton
   */
  function renderListSkeleton(items = 5) {
    let itemsHtml = '';
    for (let i = 0; i < items; i++) {
      itemsHtml += `
        <div style="padding: 16px; border-bottom: 1px solid #e5e7eb;">
          <div style="display: flex; align-items: center; gap: 12px;">
            ${renderCircle('40px')}
            <div style="flex: 1;">
              ${renderTextLine('70%')}
              ${renderTextLine('50%')}
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="card">
        ${itemsHtml}
      </div>
    `;
  }

  /**
   * Render a button spinner (inline spinner for loading state in buttons)
   * @returns {string} HTML string for button spinner
   */
  function renderButtonSpinner() {
    return `
      <svg class="button-spinner" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle;">
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="32" stroke-dashoffset="10" opacity="0.25"/>
        <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="32" stroke-dashoffset="10" opacity="1">
          <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="1s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
  }

  /**
   * Render quick action cards skeleton for home page
   * @returns {string} HTML string for quick action cards skeleton
   */
  function renderQuickActionsSkeletons() {
    let cardsHtml = '';
    for (let i = 0; i < 3; i++) {
      cardsHtml += `
        <div class="col-md-4 mb-3">
          ${renderCardSkeleton({ lines: 2, hasHeader: true })}
        </div>
      `;
    }
    return `<div class="row">${cardsHtml}</div>`;
  }

  /**
   * Render "For You Today" section skeleton
   * @returns {string} HTML string for for you today skeleton
   */
  function renderForYouTodaySkeletons() {
    return renderListSkeleton(3);
  }

  /**
   * Render team summary skeleton (for managers)
   * @returns {string} HTML string for team summary skeleton
   */
  function renderTeamSummarySkeleton() {
    return `
      <div class="card" style="padding: 20px;">
        ${renderTextLine('150px')}
        <div style="margin-top: 20px;">
          ${renderTextLine('100%')}
          ${renderTextLine('100%')}
          ${renderTextLine('80%')}
        </div>
      </div>
    `;
  }

  // Public API
  return {
    renderTextLine,
    renderCircle,
    renderCardSkeleton,
    renderTableSkeleton,
    renderProfileHeaderSkeleton,
    renderFormSkeleton,
    renderListSkeleton,
    renderButtonSpinner,
    renderQuickActionsSkeletons,
    renderForYouTodaySkeletons,
    renderTeamSummarySkeleton
  };
})();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SkeletonComponent;
}
