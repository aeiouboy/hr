import type { Page } from '@playwright/test';

export interface RuntimeIssue {
  url: string;
  message: string;
}

export function collectRuntimeIssues(page: Page): RuntimeIssue[] {
  const issues: RuntimeIssue[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      issues.push({ url: page.url(), message: msg.text() });
    }
  });
  page.on('pageerror', (error) => {
    issues.push({ url: page.url(), message: error.message });
  });
  return issues;
}

export function filterKnownRuntimeNoise(issues: RuntimeIssue[]): RuntimeIssue[] {
  return issues.filter(
    (issue) =>
      !issue.message.includes('404 (Not Found)') &&
      !issue.message.includes("Performance': '") &&
      !issue.message.includes('cannot have a negative time stamp') &&
      !issue.message.includes('ERR_CONNECTION_REFUSED') &&
      !issue.message.includes('https://errors.authjs.dev#autherror'),
  );
}
