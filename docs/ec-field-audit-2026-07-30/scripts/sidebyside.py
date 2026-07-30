#!/usr/bin/env python3
"""Build the side-by-side evidence report: screen capture next to the BA field checklist."""
import csv, os, html, collections

HERE = os.path.dirname(os.path.abspath(__file__))
DEST = os.environ.get('DEST', HERE)
rows = list(csv.DictReader(open(os.path.join(HERE, 'EC-field-vs-UI-employee-file.csv'), encoding='utf-8-sig')))

BADGE = {'FOUND': 'ok', 'PARTIAL': 'warn', 'MISSING': 'gap'}

# group by the screen section, so each capture sits next to every BA field routed to it
groups = collections.OrderedDict()
for r in rows:
    k = r['Screen section (EN)'] or '(not on the Employee File screen)'
    groups.setdefault(k, {'shot': r['Evidence screenshot'], 'rows': []})['rows'].append(r)

# on-screen sections first, then the not-on-screen bucket
ordered = [(k, v) for k, v in groups.items() if k != '(not on the Employee File screen)']
if '(not on the Employee File screen)' in groups:
    ordered.append(('(not on the Employee File screen)', groups['(not on the Employee File screen)']))

tot = collections.Counter(r['Status'] for r in rows)
n = len(rows)

parts = ["""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>EC field list vs Employee File screen — side-by-side evidence</title>
<style>
:root{--canvas:#F6F1E8;--surface:#fff;--ink:#0E1B2C;--muted:#5c6675;--line:#e6ded1;
--accent:#1FA8A0;--indigo:#5B6CE0;--pumpkin:#FB923C}
*{box-sizing:border-box}
body{margin:0;background:var(--canvas);color:var(--ink);
font:15px/1.55 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
.wrap{max-width:1500px;margin:0 auto;padding:28px 20px 80px}
h1{font-size:26px;margin:0 0 6px}
h2{font-size:19px;margin:0}
.lede{color:var(--muted);max-width:80ch;margin:0 0 22px}
.kpis{display:flex;flex-wrap:wrap;gap:12px;margin:0 0 26px}
.kpi{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:12px 18px;min-width:130px}
.kpi b{display:block;font-size:24px;line-height:1.2}
.kpi span{font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:var(--muted)}
.sec{background:var(--surface);border:1px solid var(--line);border-radius:18px;
padding:18px;margin:0 0 22px;box-shadow:0 1px 2px rgba(14,27,44,.04)}
.sechead{display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;justify-content:space-between;margin-bottom:14px}
.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px;align-items:start}
@media(max-width:1080px){.grid{grid-template-columns:1fr}}
.shot{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--canvas);position:sticky;top:14px}
.shot img{display:block;width:100%;height:auto}
.cap{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);padding:7px 10px;border-bottom:1px solid var(--line)}
.tblwrap{overflow-x:auto}
table{border-collapse:collapse;width:100%;font-size:13.5px}
th,td{text-align:left;padding:7px 9px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-size:10.5px;letter-spacing:.07em;text-transform:uppercase;color:var(--muted);white-space:nowrap}
tbody tr:last-child td{border-bottom:0}
.b{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.05em;
padding:2px 8px;border-radius:999px;white-space:nowrap}
.b.ok{background:rgba(31,168,160,.14);color:#137e78}
.b.warn{background:rgba(91,108,224,.14);color:#3f4dad}
.b.gap{background:rgba(251,146,60,.18);color:#b45c0d}
.mini{color:var(--muted);font-size:12px}
.grp{font-weight:600;background:var(--canvas)}
.legend{display:flex;gap:16px;flex-wrap:wrap;margin:0 0 24px;font-size:13px;color:var(--muted)}
.count{font-size:12.5px;color:var(--muted);white-space:nowrap}
</style></head><body><div class="wrap">"""]

parts.append(f"""<h1>EC list of fields (BA, 30 Jul) &nbsp;vs&nbsp; Employee File screen</h1>
<p class="lede">Every field in the BA sheet checked against what the admin Employee File screen
actually renders. Each screen capture sits beside the BA fields routed to it. Captured signed in
as <code>admin@humi.test</code> (hr_admin + hr_manager + spd, so no section is RBAC-hidden), all
collapsibles expanded.</p>
<div class="kpis">
<div class="kpi"><b>{n}</b><span>BA fields</span></div>
<div class="kpi"><b>{tot['FOUND']}</b><span>Found ({tot['FOUND']*100//n}%)</span></div>
<div class="kpi"><b>{tot['PARTIAL']}</b><span>Partial ({tot['PARTIAL']*100//n}%)</span></div>
<div class="kpi"><b>{tot['MISSING']}</b><span>Missing ({tot['MISSING']*100//n}%)</span></div>
<div class="kpi"><b>21</b><span>Screen sections</span></div>
</div>
<div class="legend">
<span><span class="b ok">FOUND</span> labelled field rendered on screen</span>
<span><span class="b warn">PARTIAL</span> value on screen but not as its own labelled field</span>
<span><span class="b gap">MISSING</span> not on the screen at all</span>
</div>""")

for title, g in ordered:
    rs = g['rows']
    c = collections.Counter(r['Status'] for r in rs)
    on_screen = title != '(not on the Employee File screen)'
    parts.append('<section class="sec">')
    parts.append(f'<div class="sechead"><h2>{html.escape(title)}</h2>'
                 f'<span class="count">{len(rs)} BA fields &middot; '
                 f'<span class="b ok">{c["FOUND"]}</span> '
                 f'<span class="b warn">{c["PARTIAL"]}</span> '
                 f'<span class="b gap">{c["MISSING"]}</span></span></div>')
    parts.append('<div class="grid">')
    if on_screen:
        parts.append(f'<div class="shot"><div class="cap">Screen capture &mdash; {html.escape(title)}</div>'
                     f'<img src="{html.escape(g["shot"])}" alt="{html.escape(title)}" loading="lazy"></div>')
    else:
        parts.append('<div class="shot"><div class="cap">No capture &mdash; nothing on the screen '
                     'carries these BA groups</div><img src="shots/en-EMP-0002-full.png" '
                     'alt="Full screen for reference" loading="lazy"></div>')
    parts.append('<div class="tblwrap"><table><thead><tr>'
                 '<th>BA section / sub-section</th><th>BA UI field</th><th>Mand.</th>'
                 '<th>Status</th><th>On screen as</th></tr></thead><tbody>')
    last = None
    for r in rs:
        grp = r['BA Section'] + (f" › {r['BA Sub-section']}" if r['BA Sub-section'] else '')
        if grp != last:
            parts.append(f'<tr><td class="grp" colspan="5">{html.escape(grp)}</td></tr>')
            last = grp
        shown = r['Matched UI label on screen'] or r['Note']
        parts.append(
            f'<tr><td class="mini">{html.escape(r["Menu"])} / {html.escape(r["Process"])}</td>'
            f'<td>{html.escape(r["BA UI Field"])}</td>'
            f'<td class="mini">{html.escape(r["BA Mandatory"])}</td>'
            f'<td><span class="b {BADGE[r["Status"]]}">{r["Status"]}</span></td>'
            f'<td class="mini">{html.escape(shown)}</td></tr>')
    parts.append('</tbody></table></div></div></section>')

parts.append('</div></body></html>')
out = os.path.join(DEST, 'side-by-side.html')
open(out, 'w', encoding='utf-8').write('\n'.join(parts))
print('wrote', out, os.path.getsize(out), 'bytes')
