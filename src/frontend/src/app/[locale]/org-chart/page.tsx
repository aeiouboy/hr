'use client';

import { useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Users } from 'lucide-react';
import { Avatar, Button, Card, CardEyebrow, CardTitle } from '@/components/humi';
import { cn } from '@/lib/utils';

// ════════════════════════════════════════════════════════════
// Org Chart — /org-chart
// Split layout: 2/3 tree (left) + 1/3 detail panel (right).
// Tree = nested <ul role="tree"> with hairline connectors +
// expand/collapse via <button aria-expanded>. Keyboard: Enter/Space
// on node = toggle expand; click = select.
// ════════════════════════════════════════════════════════════

type Tone = 'teal' | 'sage' | 'butter' | 'ink';

interface OrgNode {
  id: string;
  name: string;
  role: string;
  head?: string;
  tone: Tone;
  children?: OrgNode[];
}

// Mock org — matches Employee Detail persons where possible.
const ROOT: OrgNode = {
  id: 'hq',
  name: 'สำนักงานใหญ่',
  role: 'บริษัท เซ็นทรัล กรุ๊ป',
  head: 'ประเสริฐ เจริญศักดิ์',
  tone: 'ink',
  children: [
    {
      id: 'dept-hr',
      name: 'ฝ่ายบุคคล',
      role: 'HR & People Operations',
      head: 'ปิยะ ชัยวัฒน์',
      tone: 'teal',
      children: [
        {
          id: 'team-talent',
          name: 'ทีมสรรหาบุคลากร',
          role: 'Talent Acquisition',
          head: 'กุลธิดา วงศ์สกุล',
          tone: 'teal',
          children: [
            { id: 'E-0214', name: 'กุลธิดา วงศ์สกุล', role: 'ผู้จัดการฝ่ายสรรหาบุคลากร', tone: 'teal' },
            { id: 'E-0218', name: 'ชญานิษฐ์ ศรีประเสริฐ', role: 'นักสรรหาอาวุโส', tone: 'sage' },
            { id: 'E-0222', name: 'วีระศักดิ์ มาลัย', role: 'นักสรรหา', tone: 'butter' },
          ],
        },
        {
          id: 'team-people-ops',
          name: 'ทีม People Ops',
          role: 'Payroll & Benefits',
          head: 'อัจฉรา ธนกิจ',
          tone: 'butter',
          children: [
            { id: 'E-0412', name: 'อัจฉรา ธนกิจ', role: 'นักวิเคราะห์การเงินอาวุโส', tone: 'butter' },
            { id: 'E-0418', name: 'สุรชัย ภักดี', role: 'เจ้าหน้าที่เงินเดือน', tone: 'sage' },
          ],
        },
      ],
    },
    {
      id: 'dept-ops',
      name: 'ฝ่ายปฏิบัติการ',
      role: 'Retail & Mall Operations',
      head: 'พรทิพย์ เจริญสุข',
      tone: 'sage',
      children: [
        {
          id: 'team-mall-bkk',
          name: 'ปฏิบัติการศูนย์การค้า กทม.',
          role: 'Mall Ops – Bangkok',
          head: 'ณัฐพล ศรีสุวรรณ',
          tone: 'sage',
          children: [
            { id: 'E-0331', name: 'ณัฐพล ศรีสุวรรณ', role: 'หัวหน้างานปฏิบัติการ', tone: 'sage' },
            { id: 'E-0335', name: 'กนกวรรณ แสงทอง', role: 'เจ้าหน้าที่ปฏิบัติการอาวุโส', tone: 'teal' },
          ],
        },
        {
          id: 'team-warehouse',
          name: 'คลังสินค้าบางนา',
          role: 'Warehouse Ops',
          head: 'ธีรภัทร จิรายุ',
          tone: 'teal',
          children: [
            { id: 'E-0527', name: 'ธีรภัทร จิรายุ', role: 'เจ้าหน้าที่คลังสินค้า', tone: 'teal' },
            { id: 'E-0533', name: 'อนุชา พิทักษ์', role: 'หัวหน้ากะคลัง', tone: 'butter' },
          ],
        },
        {
          id: 'team-region-north',
          name: 'เขตภาคเหนือ',
          role: 'Northern Region',
          head: 'พรทิพย์ เจริญสุข',
          tone: 'sage',
          children: [
            { id: 'E-0643', name: 'พรทิพย์ เจริญสุข', role: 'ผู้จัดการเขตภาคเหนือ', tone: 'sage' },
          ],
        },
      ],
    },
    {
      id: 'dept-tech',
      name: 'ฝ่ายเทคโนโลยี',
      role: 'Product & Technology',
      head: 'ฤทธิรงค์ อำนวยโสภณ',
      tone: 'butter',
      children: [
        {
          id: 'team-platform',
          name: 'ทีม Platform',
          role: 'Core Platform Engineering',
          head: 'ชลสิทธิ์ ตระกูลวัฒน์',
          tone: 'butter',
        },
        {
          id: 'team-data',
          name: 'ทีม Data',
          role: 'Data & Analytics',
          head: 'มาลินี กล้าหาญ',
          tone: 'teal',
        },
      ],
    },
  ],
};

// Default-expanded = root + immediate children (first 2 levels).
const DEFAULT_EXPANDED = new Set<string>([
  'hq',
  'dept-hr',
  'dept-ops',
  'dept-tech',
]);

type ViewMode = 'tree' | 'list';

export default function OrgChartPage() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';

  const [expanded, setExpanded] = useState<Set<string>>(DEFAULT_EXPANDED);
  const [selectedId, setSelectedId] = useState<string>('dept-hr');
  const [view, setView] = useState<ViewMode>('tree');

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selected = findNode(ROOT, selectedId) ?? ROOT;

  return (
    <div className="min-h-screen bg-canvas">
      <main className="mx-auto w-full max-w-[var(--max-width-page)] px-6 py-8">
        {/* Page header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)] font-semibold tracking-tight text-ink whitespace-nowrap">
              แผนผังองค์กร
            </h1>
            <p className="mt-1 text-small text-ink-muted">
              สายบังคับบัญชาและโครงสร้างทีมทั้งหมด
            </p>
          </div>
          <div
            role="radiogroup"
            aria-label="เลือกมุมมอง"
            className="inline-flex rounded-md border border-hairline bg-surface p-1"
          >
            {(['tree', 'list'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                role="radio"
                aria-checked={view === mode}
                onClick={() => setView(mode)}
                className={cn(
                  'rounded-sm px-3 py-1.5 text-small font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
                  view === mode
                    ? 'bg-accent-soft text-accent-ink'
                    : 'text-ink-muted hover:text-ink-soft'
                )}
              >
                {mode === 'tree' ? 'มุมมองผัง' : 'มุมมองรายการ'}
              </button>
            ))}
          </div>
        </div>

        {/* Split grid: 2fr tree + 1fr detail */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* LEFT — Tree (2/3) */}
          <div className="lg:col-span-2">
            <Card size="lg" className="overflow-hidden">
              <CardEyebrow>สายบังคับบัญชา</CardEyebrow>
              <CardTitle className="mt-2 mb-5">
                {view === 'tree'
                  ? 'ผังโครงสร้างทั้งองค์กร'
                  : 'รายการแผนกและทีม'}
              </CardTitle>
              {view === 'tree' ? (
                <ul role="tree" className="text-body">
                  <TreeNode
                    node={ROOT}
                    depth={0}
                    expanded={expanded}
                    selectedId={selectedId}
                    onToggle={toggle}
                    onSelect={setSelectedId}
                  />
                </ul>
              ) : (
                <FlatList
                  node={ROOT}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              )}
            </Card>
          </div>

          {/* RIGHT — Detail panel (1/3) */}
          <div>
            <Card size="lg" className="lg:sticky lg:top-6">
              <div className="flex items-start gap-4">
                <Avatar name={selected.name} size="lg" tone={selected.tone} />
                <div className="min-w-0 flex-1">
                  <CardEyebrow>{selected.role}</CardEyebrow>
                  <CardTitle className="mt-1.5">{selected.name}</CardTitle>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-4">
                <DetailRow
                  label="หัวหน้าสายงาน"
                  value={selected.head ?? '—'}
                />
                <DetailRow
                  label="จำนวนพนักงาน"
                  value={`${countEmployees(selected)} คน`}
                />
                <div>
                  <dt className="text-small text-ink-muted">ทีมย่อย</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {selected.children && selected.children.length > 0 ? (
                      selected.children.map((child) => (
                        <span
                          key={child.id}
                          className="inline-flex items-center rounded-full bg-canvas-soft px-2.5 py-1 text-small text-ink-soft"
                        >
                          {child.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-small text-ink-muted">
                        ไม่มีทีมย่อย
                      </span>
                    )}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href={`/${locale}/employees`}
                  className="inline-flex"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    leadingIcon={<Users className="h-4 w-4" />}
                  >
                    ดูพนักงานทั้งหมด
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Tree node (recursive) ──────────────────────────────────

interface TreeNodeProps {
  node: OrgNode;
  depth: number;
  expanded: Set<string>;
  selectedId: string;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}

function TreeNode({
  node,
  depth,
  expanded,
  selectedId,
  onToggle,
  onSelect,
}: TreeNodeProps) {
  const hasChildren = !!node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (hasChildren) onToggle(node.id);
      onSelect(node.id);
    }
  };

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      className={cn(
        depth > 0 &&
          'border-l border-hairline pl-4 ml-[11px] relative'
      )}
    >
      <button
        type="button"
        onClick={() => {
          if (hasChildren) onToggle(node.id);
          onSelect(node.id);
        }}
        onKeyDown={onKeyDown}
        className={cn(
          'group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
          isSelected
            ? 'bg-accent-soft ring-1 ring-accent/40'
            : 'hover:bg-canvas-soft'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex h-5 w-5 shrink-0 items-center justify-center text-ink-muted transition-transform',
            hasChildren ? 'opacity-100' : 'opacity-0',
            isExpanded && 'rotate-90'
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </span>
        <Avatar name={node.name} size="sm" tone={node.tone} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-body font-medium text-ink">
            {node.name}
          </span>
          <span className="block truncate text-small text-ink-muted">
            {node.role}
            {node.head && ` · ${node.head}`}
          </span>
        </span>
        {hasChildren && (
          <span className="shrink-0 rounded-full bg-canvas-soft px-2 py-0.5 text-small text-ink-muted">
            {node.children!.length}
          </span>
        )}
      </button>

      {hasChildren && isExpanded && (
        <ul role="group" className="mt-1.5 space-y-0.5">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ── Flat list view (stub) ──────────────────────────────────

function FlatList({
  node,
  selectedId,
  onSelect,
}: {
  node: OrgNode;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const flat: { node: OrgNode; depth: number }[] = [];
  const walk = (n: OrgNode, d: number) => {
    flat.push({ node: n, depth: d });
    n.children?.forEach((c) => walk(c, d + 1));
  };
  walk(node, 0);

  return (
    <ul className="divide-y divide-hairline-soft">
      {flat.map(({ node: n, depth }) => {
        const isSelected = selectedId === n.id;
        return (
          <li key={n.id}>
            <button
              type="button"
              onClick={() => onSelect(n.id)}
              className={cn(
                'flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
                isSelected
                  ? 'bg-accent-soft'
                  : 'hover:bg-canvas-soft'
              )}
              style={{ paddingLeft: `${12 + depth * 16}px` }}
            >
              <Avatar name={n.name} size="sm" tone={n.tone} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-body font-medium text-ink">
                  {n.name}
                </span>
                <span className="block truncate text-small text-ink-muted">
                  {n.role}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-hairline-soft pb-3 last:border-b-0">
      <dt className="text-small text-ink-muted">{label}</dt>
      <dd className="mt-0.5 text-body font-medium text-ink">{value}</dd>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────

function findNode(root: OrgNode, id: string): OrgNode | null {
  if (root.id === id) return root;
  for (const child of root.children ?? []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

function countEmployees(node: OrgNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return node.children.reduce((sum, c) => sum + countEmployees(c), 0);
}
