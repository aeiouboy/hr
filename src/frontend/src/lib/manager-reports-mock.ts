// STA-28 PR-E — manager-reports-mock.ts
// Deterministic mock helpers for the 4 manager benefits reports.
// All values are hash-based — stable across renders. No real API.

/** djb2 hash — stable numeric key from a string */
function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h) ^ s.charCodeAt(i);
    h = h >>> 0;
  }
  return h;
}

// ── M-RP-03: Approval Throughput ─────────────────────────────────────────────

export interface ThroughputStats {
  avgHoursToDecide: number;
  rejectionRatePct: number;
  totalDecisions: number;
}

/**
 * Returns throughput stats for a given period (in days).
 * Deterministic based on periodDays.
 */
export function getThroughputStats(periodDays: number): ThroughputStats {
  const h = hashStr(`throughput:${periodDays}`);
  // avg hours: 4–72 h range
  const avgHoursToDecide = 4 + (h % 69);
  // rejection rate: 2–18%
  const rejectionRatePct = 2 + (h % 17);
  // total decisions: 5–50
  const totalDecisions = 5 + ((h >>> 8) % 46);
  return { avgHoursToDecide, rejectionRatePct, totalDecisions };
}

// ── M-RP-01: Team Spend ───────────────────────────────────────────────────────

export interface EmployeeSpend {
  employeeId: string;
  totalThb: number;
}

/**
 * Returns per-employee spend for a month offset (0 = current, -1 = last month, etc.).
 * Caller passes the list of employee IDs.
 */
export function getMonthlySpendByReport(
  employeeIds: string[],
  monthOffset: number,
): EmployeeSpend[] {
  return employeeIds.map((id) => {
    const h = hashStr(`${id}:spend:${monthOffset}`);
    // Range 0..25,000 in 500-step increments
    const totalThb = (h % 51) * 500;
    return { employeeId: id, totalThb };
  });
}

// ── CSV export helper ─────────────────────────────────────────────────────────

/**
 * Creates a CSV Blob from rows and triggers a browser download.
 * Sync — no library needed.
 */
export function csvExport(
  filename: string,
  rows: Array<Record<string, string | number>>,
): void {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const lines = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const v = String(row[h] ?? '');
          // Quote cells that contain commas or quotes
          return v.includes(',') || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v;
        })
        .join(','),
    ),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
