/**
 * AC-2.2 (P1 Item 2) — false-affordance CTA/tile cut.
 *
 * PR-3 removes the Manager dead-end CTAs/tiles that lead into the /admin/**
 * barrier (or to non-existent manager-reachable views). REMOVE not HIDE.
 *
 *  - manager-dashboard/page.tsx: the `?scope=team` /admin/employees CTA Link.
 *  - QuickActionsTile: the all-roles "Directory" /admin/employees tile, the
 *    manager `/admin/employees?scope=team` tile, and the manager
 *    `/admin/positions?scope=team` tile.
 *  - KEEP: /org-chart?scope=team and /reports?scope=team (both reachable).
 */

import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import {
  QuickActionsTile,
  DEFAULT_ESS_ACTIONS,
  MANAGER_ACTIONS,
} from '@/components/humi/molecules/QuickActionsTile';

const FORBIDDEN = /\/admin\/(employees|positions)/;

describe('AC-2.2 — manager-dashboard has no /admin/employees CTA', () => {
  it('source contains no Link href into /admin/employees', () => {
    const src = fs.readFileSync(
      path.resolve(process.cwd(), 'src/app/[locale]/manager-dashboard/page.tsx'),
      'utf8',
    );
    expect(src).not.toMatch(/admin\/employees/);
  });
});

describe('AC-2.2 — QuickActionsTile has no false-affordance tiles', () => {
  it('exported action arrays carry no /admin/employees or /admin/positions href', () => {
    for (const action of [...DEFAULT_ESS_ACTIONS, ...MANAGER_ACTIONS]) {
      expect(action.href).not.toMatch(FORBIDDEN);
    }
  });

  it('rendered ESS tiles have no /admin/employees or /admin/positions link', () => {
    const { container } = render(<QuickActionsTile actions={DEFAULT_ESS_ACTIONS} />);
    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? '',
    );
    expect(hrefs.filter((h) => FORBIDDEN.test(h))).toEqual([]);
  });

  it('rendered Manager tiles have no /admin/employees or /admin/positions link', () => {
    const { container } = render(<QuickActionsTile actions={MANAGER_ACTIONS} />);
    const hrefs = Array.from(container.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? '',
    );
    expect(hrefs.filter((h) => FORBIDDEN.test(h))).toEqual([]);
  });

  it('keeps the reachable Manager tiles (org-chart + reports, scope=team)', () => {
    const hrefs = MANAGER_ACTIONS.map((a) => a.href);
    expect(hrefs).toContain('/th/org-chart?scope=team');
    expect(hrefs).toContain('/th/reports?scope=team');
  });
});
