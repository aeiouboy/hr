import { writeFileSync } from "node:fs";

const outExcalidraw = "docs/diagrams/camunda-hr-platform-presentation.excalidraw";
const outSvg = "docs/diagrams/camunda-hr-platform-presentation.svg";

let seed = 1000;
const elements = [];

const fontFamily = 2;
const ink = "#1e1e1e";
const muted = "#5f6368";
const line = "#ced4da";
const panelBg = "#f8f9fa";
const colors = {
  info: "#a5d8ff",
  success: "#b2f2bb",
  config: "#ffec99",
  decision: "#ffc9c9",
  system: "#d0bfff",
  neutral: "#e9ecef",
  white: "#ffffff",
};

function base(id, type, x, y, width, height) {
  return {
    id,
    type,
    x,
    y,
    width,
    height,
    angle: 0,
    strokeColor: ink,
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: seed++,
    version: 1,
    versionNonce: seed++,
    isDeleted: false,
    boundElements: null,
    updated: 1,
    link: null,
    locked: false,
  };
}

function rect(id, x, y, w, h, bg = colors.white, stroke = line, opts = {}) {
  elements.push({
    ...base(id, "rectangle", x, y, w, h),
    strokeColor: stroke,
    backgroundColor: bg,
    fillStyle: opts.fillStyle ?? "solid",
    strokeWidth: opts.strokeWidth ?? 2,
    roughness: opts.roughness ?? 0,
  });
}

function diamond(id, x, y, w, h, bg = colors.decision) {
  elements.push({
    ...base(id, "diamond", x, y, w, h),
    strokeColor: "#c92a2a",
    backgroundColor: bg,
    fillStyle: "solid",
  });
}

function ellipse(id, x, y, w, h, bg = colors.info) {
  elements.push({
    ...base(id, "ellipse", x, y, w, h),
    strokeColor: "#1864ab",
    backgroundColor: bg,
    fillStyle: "solid",
  });
}

function text(id, x, y, value, size = 18, color = ink, opts = {}) {
  const lines = value.split("\n");
  const width = opts.width ?? Math.max(...lines.map((line) => line.length)) * size * 0.56;
  const height = opts.height ?? lines.length * size * 1.25;
  elements.push({
    ...base(id, "text", x, y, width, height),
    strokeColor: color,
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 1,
    text: value,
    fontSize: size,
    fontFamily,
    textAlign: opts.align ?? "left",
    verticalAlign: opts.verticalAlign ?? "top",
    containerId: null,
    originalText: value,
    lineHeight: 1.25,
  });
}

function label(id, x, y, value, size = 17, color = ink, opts = {}) {
  text(id, x, y, value, size, color, { ...opts, align: opts.align ?? "center" });
}

function arrow(id, x1, y1, x2, y2, labelText) {
  elements.push({
    ...base(id, "arrow", x1, y1, x2 - x1, y2 - y1),
    strokeColor: "#495057",
    backgroundColor: "transparent",
    points: [
      [0, 0],
      [x2 - x1, y2 - y1],
    ],
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: "arrow",
  });
  if (labelText) {
    text(`${id}_label`, (x1 + x2) / 2 - 45, (y1 + y2) / 2 - 24, labelText, 14, muted, {
      width: 110,
      align: "center",
    });
  }
}

function panel(id, x, y, title, subtitle) {
  rect(`${id}_panel`, x, y, 1450, 900, panelBg, "#dee2e6");
  text(`${id}_title`, x + 34, y + 26, title, 30, ink);
  text(`${id}_subtitle`, x + 36, y + 70, subtitle, 17, muted);
  arrow(`${id}_divider`, x + 34, y + 112, x + 1416, y + 112);
}

panel(
  "p1",
  80,
  80,
  "Camunda 7 Positioning In HR Platform",
  "Camunda orchestrates approvals and long-running process state; the HR platform owns employee data."
);
rect("p1_ui", 150, 250, 240, 110, colors.info, "#1864ab");
label("p1_ui_t", 180, 286, "HRMS UI\nNext.js", 20);
rect("p1_api", 500, 250, 270, 110, colors.config, "#e67700");
label("p1_api_t", 535, 286, "Workflow API\nAuth + HR rules", 20);
rect("p1_camunda", 900, 230, 300, 150, colors.system, "#7048e8");
label("p1_camunda_t", 935, 270, "Camunda 7\nBPMN + Tasks + DMN", 20);
rect("p1_db", 910, 500, 280, 120, colors.success, "#2b8a3e");
label("p1_db_t", 950, 536, "HR Domain DB\nSource of truth", 20);
rect("p1_workers", 535, 520, 270, 120, colors.neutral, "#495057");
label("p1_workers_t", 568, 556, "External Workers\nPayroll, docs, notify", 20);
arrow("p1_a1", 390, 305, 500, 305, "REST");
arrow("p1_a2", 770, 305, 900, 305, "engine REST");
arrow("p1_a3", 1040, 380, 1040, 500, "state refs");
arrow("p1_a4", 900, 570, 805, 570, "topics");
arrow("p1_a5", 535, 570, 390, 350, "status");
text(
  "p1_note",
  150,
  690,
  "Design rule: do not expose Camunda directly to the browser. Keep permissions, PII masking, and HR audit in the backend.",
  22,
  ink,
  { width: 1160 }
);

panel(
  "p2",
  1650,
  80,
  "HR Modules Mapped To Workflow Topics",
  "Each module gets focused BPMN processes, reusable DMN routing rules, and external task topics."
);
const modules = [
  ["Employee Central", "profile change\nbank info\nfamily data", colors.info],
  ["Hire / Onboarding", "new hire\ndocs\nIT + payroll setup", colors.success],
  ["Job Information", "transfer\npromotion\nposition change", colors.config],
  ["Time Off", "leave\ncancel leave\nbalance adjustment", colors.decision],
  ["Attendance", "time correction\novertime\nshift change", colors.neutral],
  ["Compensation", "salary change\nallowance\nbonus", colors.system],
  ["Benefits", "claims\ndependents\neligibility", colors.info],
  ["Offboarding", "resignation\ntermination\nasset return", colors.decision],
];
modules.forEach(([name, body, color], i) => {
  const col = i % 4;
  const row = Math.floor(i / 4);
  const x = 1720 + col * 335;
  const y = 250 + row * 255;
  rect(`p2_m_${i}`, x, y, 285, 165, color, "#495057");
  text(`p2_m_${i}_h`, x + 22, y + 22, name, 21, ink, { width: 240 });
  text(`p2_m_${i}_b`, x + 22, y + 62, body, 17, muted, { width: 240 });
});
text(
  "p2_bottom",
  1720,
  760,
  "SuccessFactors replacement boundary: Camunda replaces workflow orchestration, not HR master data, security, payroll, documents, or reporting.",
  22,
  ink,
  { width: 1200 }
);

panel(
  "p3",
  3220,
  80,
  "Pilot Workflow: Leave With Document",
  "A compact process proving user tasks, DMN routing, external task automation, and HR audit."
);
ellipse("p3_start", 3320, 240, 180, 80, colors.info);
label("p3_start_t", 3356, 266, "Submit\nLeave", 18);
rect("p3_dmn", 3650, 230, 240, 100, colors.config, "#e67700");
label("p3_dmn_t", 3680, 260, "DMN Route\nRequired approvers", 18);
rect("p3_mgr", 4040, 230, 240, 100, colors.info, "#1864ab");
label("p3_mgr_t", 4075, 260, "Manager\nUser Task", 18);
diamond("p3_doc", 4410, 220, 180, 120, colors.decision);
label("p3_doc_t", 4442, 255, "Document\nRequired?", 17);
rect("p3_hrbp", 4770, 160, 240, 100, colors.info, "#1864ab");
label("p3_hrbp_t", 4805, 190, "HRBP\nUser Task", 18);
rect("p3_update", 4770, 370, 240, 100, colors.neutral, "#495057");
label("p3_update_t", 4800, 400, "External Task\nUpdate balance", 18);
ellipse("p3_end", 5150, 310, 180, 80, colors.success);
label("p3_end_t", 5192, 336, "Closed\nAudited", 18);
arrow("p3_a1", 3500, 280, 3650, 280);
arrow("p3_a2", 3890, 280, 4040, 280);
arrow("p3_a3", 4280, 280, 4410, 280);
arrow("p3_a4", 4590, 250, 4770, 210, "yes");
arrow("p3_a5", 4590, 310, 4770, 420, "no");
arrow("p3_a6", 5010, 210, 5150, 340);
arrow("p3_a7", 5010, 420, 5150, 350);
text("p3_keys", 3330, 610, "Variables to Camunda: requestId, employeeId, leaveType, hasDocument, managerGroup, hrbpGroup.", 21, ink, { width: 1180 });
text("p3_keys2", 3330, 680, "Sensitive employee data stays in HRMS. Camunda stores routing state and references.", 21, muted, { width: 1180 });

panel(
  "p4",
  80,
  1100,
  "BPMN, DMN, External Tasks: Clear Responsibilities",
  "Separate process state, rules, and system side effects so the platform can scale module by module."
);
rect("p4_bpmn", 180, 1280, 330, 190, colors.system, "#7048e8");
text("p4_bpmn_t", 215, 1320, "BPMN", 28, ink);
text("p4_bpmn_b", 215, 1370, "Long-running process\nUser task sequence\nEscalation points\nAudit path", 18, muted);
rect("p4_dmn", 600, 1280, 330, 190, colors.config, "#e67700");
text("p4_dmn_t", 635, 1320, "DMN", 28, ink);
text("p4_dmn_b", 635, 1370, "Approval routing\nEligibility checks\nThreshold rules\nPolicy tables", 18, muted);
rect("p4_ext", 1020, 1280, 330, 190, colors.neutral, "#495057");
text("p4_ext_t", 1055, 1320, "External Tasks", 28, ink);
text("p4_ext_b", 1055, 1370, "Notifications\nPayroll sync\nDocument checks\nRecord updates", 18, muted);
arrow("p4_a1", 510, 1375, 600, 1375);
arrow("p4_a2", 930, 1375, 1020, 1375);
text("p4_bottom", 180, 1640, "Implementation stance: REST task completion from backend; external workers subscribe by topic and complete service work.", 23, ink, { width: 1120 });

panel(
  "p5",
  1650,
  1100,
  "SuccessFactors Replacement Scope",
  "Use Camunda as the workflow layer inside a broader HR product architecture."
);
rect("p5_camunda", 1740, 1270, 360, 420, colors.system, "#7048e8");
text("p5_c_t", 1780, 1310, "Camunda Owns", 27, ink);
text("p5_c_b", 1780, 1370, "Process instances\nApproval tasks\nRouting decisions\nEscalations\nWorkflow history", 20, muted);
rect("p5_hr", 2240, 1270, 620, 420, colors.success, "#2b8a3e");
text("p5_h_t", 2280, 1310, "HR Platform Owns", 27, ink);
text("p5_h_b", 2280, 1370, "Employee master data\nOrg structure and permissions\nPayroll and compensation records\nDocuments and PII masking\nReports, dashboards, UX", 20, muted);
arrow("p5_a", 2100, 1480, 2240, 1480, "refs only");
text("p5_bottom", 1740, 1770, "Keep Camunda replaceable: wrap it behind an HR workflow API and store domain state in HR services.", 22, ink, { width: 1120 });

panel(
  "p6",
  3220,
  1100,
  "Implementation Roadmap",
  "Build the platform pattern with four workflows, then generalize templates and admin tools."
);
const steps = [
  ["1", "Leave With Document", "DMN route + manager + HRBP + balance update"],
  ["2", "Profile Change", "Employee edit + HR verification + record update"],
  ["3", "Transfer Request", "Current manager + new manager + HR admin"],
  ["4", "New Hire Onboarding", "HR + manager + IT + payroll checklist"],
  ["5", "Workflow Admin", "Template catalog, approver groups, SLA rules"],
];
steps.forEach(([num, title, body], i) => {
  const y = 1250 + i * 110;
  ellipse(`p6_num_${i}`, 3330, y, 70, 70, i < 4 ? colors.success : colors.config);
  label(`p6_num_${i}_t`, 3355, y + 21, num, 23);
  rect(`p6_step_${i}`, 3450, y - 8, 1040, 86, colors.white, "#adb5bd");
  text(`p6_step_${i}_t`, 3485, y + 6, title, 22, ink);
  text(`p6_step_${i}_b`, 3770, y + 10, body, 18, muted, { width: 650 });
  if (i < steps.length - 1) arrow(`p6_a_${i}`, 3365, y + 70, 3365, y + 102);
});

const file = {
  type: "excalidraw",
  version: 2,
  source: "https://excalidraw.com",
  elements,
  appState: {
    gridSize: null,
    viewBackgroundColor: "#ffffff",
    currentItemFontFamily: fontFamily,
  },
  files: {},
};

writeFileSync(outExcalidraw, `${JSON.stringify(file, null, 2)}\n`);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1200" viewBox="0 0 4800 3200">
  <rect width="4800" height="3200" fill="#ffffff"/>
  <style>
    text { font-family: Inter, Arial, sans-serif; fill: #1e1e1e; }
    .muted { fill: #5f6368; }
    .title { font-size: 54px; font-weight: 700; }
    .panel-title { font-size: 34px; font-weight: 700; }
    .body { font-size: 24px; }
    .small { font-size: 20px; }
    .panel { fill: #f8f9fa; stroke: #dee2e6; stroke-width: 3; rx: 8; }
    .box { stroke: #495057; stroke-width: 3; rx: 6; }
    .arrow { stroke: #495057; stroke-width: 5; marker-end: url(#arrow); fill: none; }
  </style>
  <defs>
    <marker id="arrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
      <path d="M2,2 L10,6 L2,10" fill="none" stroke="#495057" stroke-width="2"/>
    </marker>
  </defs>
  <text x="120" y="90" class="title">Camunda 7 For HR Platform Replacement Strategy</text>
  <text x="120" y="135" class="body muted">Workflow layer for approvals, routing, automation, and audit while HRMS remains the system of record.</text>

  <rect x="120" y="220" width="1450" height="760" class="panel"/>
  <text x="170" y="290" class="panel-title">Reference Architecture</text>
  <rect x="190" y="390" width="240" height="110" fill="#a5d8ff" class="box"/><text x="245" y="435" class="body">HRMS UI</text><text x="250" y="468" class="small muted">Next.js</text>
  <rect x="570" y="390" width="280" height="110" fill="#ffec99" class="box"/><text x="625" y="435" class="body">Workflow API</text><text x="612" y="468" class="small muted">Auth + HR rules</text>
  <rect x="990" y="370" width="320" height="150" fill="#d0bfff" class="box"/><text x="1042" y="430" class="body">Camunda 7</text><text x="1020" y="463" class="small muted">BPMN + DMN + Tasks</text>
  <rect x="990" y="650" width="320" height="120" fill="#b2f2bb" class="box"/><text x="1035" y="705" class="body">HR Domain DB</text><text x="1040" y="738" class="small muted">Source of truth</text>
  <rect x="570" y="650" width="280" height="120" fill="#e9ecef" class="box"/><text x="608" y="705" class="body">External Workers</text><text x="615" y="738" class="small muted">Payroll, docs, notify</text>
  <path d="M430 445 H570" class="arrow"/><path d="M850 445 H990" class="arrow"/><path d="M1150 520 V650" class="arrow"/><path d="M990 710 H850" class="arrow"/>

  <rect x="1690" y="220" width="1450" height="760" class="panel"/>
  <text x="1740" y="290" class="panel-title">Module Workflow Topics</text>
  ${modules.map(([name, body, color], i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 1760 + col * 330;
    const y = 380 + row * 220;
    return `<rect x="${x}" y="${y}" width="280" height="150" fill="${color}" class="box"/><text x="${x + 24}" y="${y + 45}" class="body">${name}</text><text x="${x + 24}" y="${y + 85}" class="small muted">${body.split("\n")[0]}</text><text x="${x + 24}" y="${y + 115}" class="small muted">${body.split("\n")[1] ?? ""}</text>`;
  }).join("\n  ")}

  <rect x="3260" y="220" width="1450" height="760" class="panel"/>
  <text x="3310" y="290" class="panel-title">Pilot: Leave With Document</text>
  <ellipse cx="3410" cy="445" rx="100" ry="55" fill="#a5d8ff" stroke="#1864ab" stroke-width="3"/><text x="3360" y="455" class="body">Submit</text>
  <rect x="3630" y="390" width="230" height="110" fill="#ffec99" class="box"/><text x="3680" y="455" class="body">DMN Route</text>
  <rect x="4000" y="390" width="230" height="110" fill="#a5d8ff" class="box"/><text x="4040" y="455" class="body">Manager</text>
  <polygon points="4380,445 4480,365 4580,445 4480,525" fill="#ffc9c9" stroke="#c92a2a" stroke-width="3"/><text x="4435" y="440" class="small">Docs?</text>
  <rect x="4730" y="320" width="230" height="110" fill="#a5d8ff" class="box"/><text x="4780" y="385" class="body">HRBP</text>
  <rect x="4730" y="560" width="230" height="110" fill="#e9ecef" class="box"/><text x="4762" y="625" class="body">Update DB</text>
  <path d="M3510 445 H3630 M3860 445 H4000 M4230 445 H4380 M4580 420 L4730 375 M4580 475 L4730 615" class="arrow"/>

  <rect x="120" y="1100" width="1450" height="760" class="panel"/>
  <text x="170" y="1170" class="panel-title">Responsibility Split</text>
  <rect x="220" y="1290" width="330" height="190" fill="#d0bfff" class="box"/><text x="270" y="1350" class="body">BPMN</text><text x="270" y="1390" class="small muted">Process state</text><text x="270" y="1420" class="small muted">User task sequence</text>
  <rect x="650" y="1290" width="330" height="190" fill="#ffec99" class="box"/><text x="700" y="1350" class="body">DMN</text><text x="700" y="1390" class="small muted">Routing rules</text><text x="700" y="1420" class="small muted">Eligibility</text>
  <rect x="1080" y="1290" width="330" height="190" fill="#e9ecef" class="box"/><text x="1130" y="1350" class="body">External Tasks</text><text x="1130" y="1390" class="small muted">Side effects</text><text x="1130" y="1420" class="small muted">Integrations</text>

  <rect x="1690" y="1100" width="1450" height="760" class="panel"/>
  <text x="1740" y="1170" class="panel-title">SuccessFactors Replacement Boundary</text>
  <rect x="1780" y="1290" width="420" height="350" fill="#d0bfff" class="box"/><text x="1840" y="1360" class="body">Camunda Owns</text><text x="1840" y="1410" class="small muted">Approvals</text><text x="1840" y="1445" class="small muted">Routing</text><text x="1840" y="1480" class="small muted">Workflow audit</text>
  <rect x="2330" y="1290" width="620" height="350" fill="#b2f2bb" class="box"/><text x="2390" y="1360" class="body">HR Platform Owns</text><text x="2390" y="1410" class="small muted">Employee data, org structure, payroll, documents, reports, UX</text>
  <path d="M2200 1465 H2330" class="arrow"/>

  <rect x="3260" y="1100" width="1450" height="760" class="panel"/>
  <text x="3310" y="1170" class="panel-title">Implementation Roadmap</text>
  ${steps.map(([num, title, body], i) => {
    const y = 1280 + i * 105;
    return `<circle cx="3380" cy="${y}" r="38" fill="${i < 4 ? "#b2f2bb" : "#ffec99"}" stroke="#495057" stroke-width="3"/><text x="3368" y="${y + 9}" class="body">${num}</text><rect x="3460" y="${y - 45}" width="1040" height="82" fill="#ffffff" class="box"/><text x="3500" y="${y - 8}" class="body">${title}</text><text x="3820" y="${y - 8}" class="small muted">${body}</text>`;
  }).join("\n  ")}
</svg>
`;

writeFileSync(outSvg, svg);

console.log(outExcalidraw);
console.log(outSvg);
