'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, FileCode, Info } from 'lucide-react';
import { CardEyebrow } from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  BENEFIT_RULES_REGISTRY,
  RULE_BASE_OBJECTS,
  getRulesByBaseObject,
  type BenefitRule,
  type BenefitRuleBaseObject,
} from '@/data/benefits/rules-registry';

// ── Types ────────────────────────────────────────────────────────────────────

interface BenefitRulesViewerProps {
  highlightRuleId?: string;
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
    groupBenefitEmployeeClaim: string;
    groupBenefitInsurancePlan: string;
    groupBenefit: string;
    groupSpecialPrivilege: string;
    groupExceptionDetails: string;
    colCode: string;
    colDescription: string;
    colLastModified: string;
    detailCode: string;
    detailDescription: string;
    detailScenario: string;
    detailLastModified: string;
    detailBaseObject: string;
    viewDsl: string;
    hideDsl: string;
    noRules: string;
    eligibilityRule: string;
    viewRule: string;
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function groupLabel(baseObject: BenefitRuleBaseObject, t: BenefitRulesViewerProps['t']): string {
  const map: Record<BenefitRuleBaseObject, string> = {
    BenefitEmployeeClaim:               t.groupBenefitEmployeeClaim,
    BenefitInsurancePlan:               t.groupBenefitInsurancePlan,
    Benefit:                            t.groupBenefit,
    cust_BE_BenefitSpecialPrivilegeDetail: t.groupSpecialPrivilege,
    BenefitExceptionDetails:            t.groupExceptionDetails,
  };
  return map[baseObject];
}

// ── Expandable rule row ───────────────────────────────────────────────────────

function RuleRow({ rule, highlight, t }: { rule: BenefitRule; highlight: boolean; t: BenefitRulesViewerProps['t'] }) {
  const [dslOpen, setDslOpen] = useState(false);

  return (
    <>
      <tr
        id={`rule-${rule.id}`}
        className={cn(
          'group border-b border-hairline transition-colors',
          highlight ? 'bg-accent-soft' : 'hover:bg-canvas-soft',
        )}
      >
        {/* Description — primary */}
        <td className="px-4 py-3 align-top">
          <p className="text-small font-medium text-ink leading-snug">{rule.description}</p>
          {rule.scenario && (
            <p className="mt-0.5 text-[11px] text-ink-muted leading-snug">{rule.scenario}</p>
          )}
        </td>

        {/* Code */}
        <td className="px-3 py-3 align-top max-w-[220px]">
          <p className="font-mono text-[10px] text-ink-muted break-all leading-relaxed">{rule.id}</p>
        </td>

        {/* Last modified */}
        <td className="whitespace-nowrap px-3 py-3 align-top text-small text-ink-muted tabular-nums">
          {rule.lastModified}
        </td>

        {/* DSL toggle */}
        <td className="whitespace-nowrap px-3 py-3 align-top">
          <button
            type="button"
            onClick={() => setDslOpen((v) => !v)}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <FileCode size={12} aria-hidden />
            {dslOpen ? t.hideDsl : t.viewDsl}
          </button>
        </td>
      </tr>

      {/* Expandable DSL row */}
      {dslOpen && (
        <tr className="border-b border-hairline bg-canvas-soft">
          <td colSpan={4} className="px-4 pb-3 pt-0">
            <pre className="overflow-x-auto rounded-md bg-canvas p-3 text-[10px] leading-relaxed text-ink-muted whitespace-pre-wrap break-all border border-hairline">
              {rule.dslBody}
            </pre>
          </td>
        </tr>
      )}
    </>
  );
}

// ── Group section ─────────────────────────────────────────────────────────────

function RuleGroupTable({
  baseObject,
  rules,
  highlightRuleId,
  t,
  defaultOpen,
}: {
  baseObject: BenefitRuleBaseObject;
  rules: BenefitRule[];
  highlightRuleId: string | null;
  t: BenefitRulesViewerProps['t'];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const label = groupLabel(baseObject, t);

  return (
    <div className="rounded-lg border border-hairline overflow-hidden">
      {/* Section header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 bg-canvas-soft px-4 py-3 text-left hover:bg-canvas transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
      >
        <span className="flex items-center gap-2">
          <span className="text-small font-semibold text-ink">{label}</span>
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
            {rules.length}
          </span>
          <span className="font-mono text-[10px] text-ink-faint">({baseObject})</span>
        </span>
        {open
          ? <ChevronDown  size={16} className="text-ink-muted shrink-0" aria-hidden />
          : <ChevronRight size={16} className="text-ink-muted shrink-0" aria-hidden />}
      </button>

      {open && (
        rules.length === 0 ? (
          <p className="px-4 py-3 text-small text-ink-muted">{t.noRules}</p>
        ) : (
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-hairline bg-surface">
                <th className="px-4 py-2 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                  {t.colDescription}
                </th>
                <th className="px-3 py-2 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                  {t.colCode}
                </th>
                <th className="whitespace-nowrap px-3 py-2 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                  {t.colLastModified}
                </th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <RuleRow
                  key={rule.id}
                  rule={rule}
                  highlight={rule.id === highlightRuleId}
                  t={t}
                />
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}

// ── Main viewer ───────────────────────────────────────────────────────────────

export function BenefitRulesViewer({ highlightRuleId, t }: BenefitRulesViewerProps) {
  return (
    <div className="space-y-6">
      <header>
        <CardEyebrow>{t.eyebrow}</CardEyebrow>
        <h1 className="font-display text-[28px] font-semibold text-ink">{t.title}</h1>
        <p className="mt-2 text-small text-ink-muted">{t.subtitle}</p>
      </header>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-3">
        {RULE_BASE_OBJECTS.map((obj) => {
          const count = getRulesByBaseObject(obj).length;
          return (
            <div key={obj} className="flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-3 py-1.5">
              <span className="font-mono text-[length:var(--text-eyebrow)] text-ink-muted">{obj}</span>
              <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[length:var(--text-eyebrow)] font-semibold text-accent">{count}</span>
            </div>
          );
        })}
        <div className="flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-3 py-1.5 ml-auto">
          <Info size={13} className="text-ink-muted" aria-hidden />
          <span className="text-small text-ink-muted">{BENEFIT_RULES_REGISTRY.length} total</span>
        </div>
      </div>

      {/* Table sections */}
      <div className="space-y-3">
        {RULE_BASE_OBJECTS.map((obj, i) => (
          <RuleGroupTable
            key={obj}
            baseObject={obj}
            rules={getRulesByBaseObject(obj)}
            highlightRuleId={highlightRuleId ?? null}
            t={t}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </div>
  );
}
