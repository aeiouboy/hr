# Research: Camunda Workflow Integration with MCP / CLI for HR Agents

**Branch:** `claude/camunda-mcp-workflow-research-socOU`
**Date:** 2026-04-22
**Scope:** RIS HR System — วิเคราะห์การนำ Camunda มาทำ Workflow Engine และให้ AI Agent เข้าใจ / สร้าง HR Workflow ได้
**หมายเหตุเรื่องคำศัพท์:** คำว่า *"COI"* ในคำถามต้นฉบับน่าจะเป็นการพิมพ์ผิดจาก *"CLI"* (ผู้ใช้ส่งข้อความ `cli` ตามมา) — เอกสารนี้ครอบคลุมทั้ง **MCP** และ **CLI (zbctl)** เป็นสองช่องทางให้ Agent โต้ตอบกับ Camunda

---

## 1. Executive Summary

ปัจจุบัน workflow ในระบบ HR (`apps/js/workflow/`) เป็น **in-browser state machine** ที่ hard-code กฎอนุมัติไว้ใน `rules.js` — ใช้งานเป็น prototype ได้ดี แต่ไม่เหมาะกับ production เพราะ:

- ไม่มี persistent process state (รีเฟรชก็หาย)
- ไม่มี audit trail ระดับ enterprise
- Rules ถูก hard-code — HR เปลี่ยนเองไม่ได้
- Agent ไม่สามารถ "มองเห็น" workflow ในรูปแบบ structured ได้

**ข้อเสนอ:** ย้าย workflow layer ไปที่ **Camunda 8** และเปิดสองช่องทางให้ Agent ใช้งาน:

1. **MCP (Model Context Protocol)** — ให้ Agent อ่าน/สั่ง/สร้าง BPMN แบบ semantic (production path)
2. **CLI (`zbctl`)** — ให้ Agent deploy / start / inspect process ผ่าน shell (dev & CI path)

ทั้งสองทางใช้ร่วมกันได้: MCP สำหรับ runtime reasoning, CLI สำหรับ deploy pipeline.

---

## 2. Background Concepts (สั้น ๆ)

### 2.1 Camunda 8 & BPMN

- **BPMN 2.0** = มาตรฐาน XML สำหรับอธิบาย business process (start → task → gateway → end)
- **Camunda 8 (Zeebe)** = workflow engine ที่ execute BPMN แบบ distributed + persistent
- **User Task** = งานที่รอคนกด approve/reject
- **Service Task** = งานที่เรียก API/connector อัตโนมัติ
- **Ad-hoc Subprocess** = subprocess ที่ไม่มี sequence flow คงที่ → **จุดสำคัญสำหรับ AI agent**

### 2.2 Model Context Protocol (MCP)

MCP คือ open standard ที่ Anthropic ผลักดัน ให้ LLM เรียก tool ภายนอกได้แบบ structured (tools = functions with JSON schema). Camunda รองรับ MCP ทั้งสองฝั่ง:

| Role | ความหมาย |
|------|---------|
| **Camunda as MCP Server** | expose BPMN processes & engine operations เป็น tools ให้ Agent ภายนอก (เช่น Claude) เรียกใช้ |
| **Camunda as MCP Client** | BPMN process ภายใน Camunda เรียก tools จาก external MCP server (เช่น Slack, GitHub, internal API) |

### 2.3 Camunda CLI (`zbctl`)

CLI client ของ Zeebe สำหรับ:
```bash
zbctl deploy resource leave-request.bpmn
zbctl create instance leave-request --variables '{"days":5,"employeeId":"EMP001"}'
zbctl activate jobs --type "send-notification" --maxJobsToActivate 1
zbctl status
```
เหมาะกับ agent ที่ทำงานผ่าน shell (เช่น Claude Code), CI/CD, หรือ ad-hoc troubleshooting.

---

## 3. Camunda ↔ MCP: รูปแบบการใช้งาน 3 แบบ

### Pattern A — Camunda เป็น MCP Server (Agent → Camunda)

Agent ภายนอก (Claude, Copilot, ฯลฯ) ต่อเข้า Camunda MCP Server แล้ว "เห็น" เครื่องมือ (tools) ดังนี้:

**Core tools (from `lepoco/mcp-camunda` + official `mcp/camunda`):**
- `list_definitions` — BPMN definitions ที่ deploy แล้ว
- `list_instances` / `count_instances` — process instances ที่กำลังรัน
- `list_variables` / `count_variables` — variables ของแต่ละ instance
- `list_user_tasks` / `count_user_tasks` — user tasks ที่รออนุมัติ
- `complete_user_task` — กด approve task
- `send_message` — ส่ง BPMN message event
- `list_incidents` / `count_incidents` / `resolve_incident` — จัดการ error
- `deploy` (บาง implementation) — deploy BPMN ใหม่

**Use cases:**
- HR ถาม Claude: *"มี leave request ของ EMP042 ค้างอยู่กี่ใบ?"* → Agent call `list_user_tasks`
- Manager: *"อนุมัติ task TID-123 ให้หน่อย"* → `complete_user_task`
- Dev: *"หา incident ที่ค้างเกิน 1 วัน"* → `list_incidents` + filter

### Pattern B — Camunda เป็น MCP Client (Process → External tools)

ใน Camunda 8.8+ มี **AI Agent Connector** + **MCP Client Connector** ที่วางใน ad-hoc subprocess:

```
[Start] → [AI Agent (Claude/GPT)] → [Ad-hoc subprocess: {MCP tool 1, MCP tool 2, User task}] → [End]
```
- Agent ได้รับ prompt + system prompt + tool descriptions
- LLM เลือกว่าจะเรียก tool ไหน → Camunda execute activity นั้นใน ad-hoc subprocess
- Tools ถูก expose ผ่าน **gateway tool definitions** (discover dynamically)
- Human-in-the-loop: confirm ก่อน sensitive tool call

**Use case HR:** Agent รับคำถาม *"ฉันอยากลาพักร้อน 3 วันเดือนหน้า"* → เรียก tool `check_leave_balance` → `create_leave_request` → รอ manager approve → `notify_slack`.

### Pattern C — Agent สร้าง BPMN ใหม่ (Authoring)

เป็น pattern ที่ต้องการสำหรับ "ให้ Agent สร้าง Workflow สำหรับงาน HR":

1. **Prompt-to-BPMN** — Agent รับ natural language spec จาก HR → gen BPMN XML → deploy ผ่าน MCP/CLI
2. **Tools ที่ใช้:**
   - Camunda **BPMN Copilot** (open-source, integrated in Camunda Modeler)
   - **Nala2BPMN** (Bonitasoft)
   - Custom prompting ด้วย Claude + schema validation
3. **Prompting techniques ที่ papers แนะนำ:**
   - Role prompting: *"You are a BPMN 2.0 expert for HR processes."*
   - Chain-of-thought: บังคับให้ LLM อธิบาย step ก่อน gen XML
   - Few-shot: ใส่ BPMN ของ leave-request เป็นตัวอย่าง
   - Negative prompting: แสดง XML ที่ invalid เป็น counter-example
4. **Validation loop:** gen → validate กับ BPMN schema → ถ้า invalid ส่ง error กลับให้ LLM แก้ → deploy

---

## 4. Mapping: HR Workflow ปัจจุบัน → BPMN

อ้างอิง `apps/js/workflow/rules.js`:

| Rule ปัจจุบัน | BPMN Equivalent | Approval Pattern |
|--------------|-----------------|------------------|
| `selfService` (email, mobile, emergency contact) | Service task เดียว, ไม่มี user task | **No-approval fast path** |
| `managerApproval` (nickname, business phone) | 1 × User Task (Manager) | **Single approver** |
| `managerAndHRApproval` (personal info, address, dependents, work permit) | 2 × User Task แบบ sequential | **2-step approval** |
| `fullApproval` (bank account, national ID, compensation) | 3 × User Task → Service Task (apply change) | **3-step approval** |
| `payrollApproval` (payroll run) | HR Manager User Task → Finance Director User Task → Service Task | **Cross-functional** |
| `internalTransfer` | 3 User Tasks (current mgr, target mgr, HR) | **Multi-party** |
| `intercompanyTransfer` / `crossbg` | 4 User Tasks + Parallel Gateway for source/target HR | **Dual-company** |
| `secondmentTransfer` | 3 User Tasks + Timer boundary event (end date) | **Temporary assignment** |

**Key insight:** 8 rule groups ใน rules.js แทบจะ 1-to-1 กับ 8 BPMN templates — ย้ายได้ตรง ๆ

### 4.1 ตัวอย่าง BPMN: Full Approval (bank account change)

```xml
<bpmn:process id="BankAccountChange" isExecutable="true">
  <bpmn:startEvent id="Start_SubmitRequest"/>
  <bpmn:userTask id="Task_ManagerApprove"
    name="Manager Approve"
    camunda:candidateGroups="manager"/>
  <bpmn:userTask id="Task_HRAdminApprove"
    name="HR Admin Approve"
    camunda:candidateGroups="hr_admin"/>
  <bpmn:userTask id="Task_HRManagerApprove"
    name="HR Manager Approve"
    camunda:candidateGroups="hr_manager"/>
  <bpmn:serviceTask id="Task_ApplyChange"
    name="Apply Change to HRIS"
    camunda:type="external" camunda:topic="apply-bank-change"/>
  <bpmn:endEvent id="End_Done"/>
  <!-- sequence flows: Start → Manager → HRAdmin → HRManager → Apply → End -->
</bpmn:process>
```
ทุกขั้นต่อ reject/sendBack ด้วย boundary error event → กลับไปที่ requester (equivalent กับ `sendBack()` ใน `engine.js`).

---

## 5. Proposed Architecture

```
┌──────────────────────────────┐    ┌────────────────────────────────┐
│   RIS HR Frontend (current)  │    │   HR Admin / Claude Desktop    │
│   apps/js/workflow/engine.js │    │   ─── MCP client ───────────── │
│   (keep as thin UI adapter)  │    │                                │
└──────────────┬───────────────┘    └──────────────┬─────────────────┘
               │ REST/gRPC                          │ MCP (stdio/HTTP+SSE)
               ▼                                    ▼
        ┌──────────────────────────────────────────────────────┐
        │         Camunda 8 (Zeebe + Operate + Tasklist)        │
        │  BPMN processes: leave, transfer, bank-change, etc.  │
        └─────────────┬────────────────────────────┬────────────┘
                      │ MCP Client connector        │ zbctl CLI
                      ▼                              ▼
        ┌──────────────────────────┐   ┌────────────────────────────┐
        │  External MCP tools      │   │  CI/CD & agent-ops         │
        │  (Slack, email, IDP,     │   │  (deploy BPMN, smoke test)  │
        │   internal HR API)       │   │                            │
        └──────────────────────────┘   └────────────────────────────┘
```

### 5.1 Agent Capabilities ที่ได้

| Capability | ช่องทาง | ตัวอย่างคำสั่ง |
|-----------|---------|-----------------|
| **อ่าน** process status | MCP `list_instances` | *"leave requests ของทีมฉันที่ค้างอยู่มีอะไรบ้าง?"* |
| **อนุมัติ** task | MCP `complete_user_task` | *"อนุมัติ TASK-4421 comment='ok'"* |
| **สั่งเริ่ม** process | MCP `start_instance` | *"ยื่นลาพักร้อนให้ EMP042, 3 วัน, 2026-05-01"* |
| **สร้าง** BPMN ใหม่ | Prompt-to-BPMN + `zbctl deploy` | *"สร้าง workflow สำหรับ overtime approval"* |
| **แก้ incident** | MCP `resolve_incident` | *"incident ที่ค้างเพราะ missing variable ให้เติม และ resolve"* |
| **ตรวจสอบ** audit | MCP `list_variables` + Operate API | *"เปลี่ยน bank account ของ EMP001 ผ่าน path ไหนบ้าง?"* |

---

## 6. Implementation Roadmap

### Phase 0 — Spike (1 สัปดาห์)
- ตั้ง Camunda 8 self-managed (docker-compose) หรือ SaaS trial
- Deploy 1 BPMN (leave-request) ผ่าน `zbctl`
- ต่อ Claude Desktop → `mcp/camunda` Docker image → ทดลอง 5 tools

### Phase 1 — Pilot 2 workflows (2-3 สัปดาห์)
- Port `leave_request` และ `managerAndHRApproval` (personal info) จาก `rules.js` → BPMN
- สร้าง external worker (Node.js) สำหรับ apply-change service tasks → เรียก REST ของ HR API ปัจจุบัน
- Wire `apps/js/workflow/engine.js` ให้เรียก Zeebe REST แทน mock data (keep UI เดิม)

### Phase 2 — Agent Authoring (2 สัปดาห์)
- เขียน prompt template (role + few-shot + schema) ให้ Claude gen BPMN XML
- Validation pipeline: `bpmn-moddle` parse → ถ้า invalid ส่ง error loop
- Auto-deploy หลัง human review (diff view ใน Modeler)

### Phase 3 — Full rollout (4-6 สัปดาห์)
- Port 8 rule groups ที่เหลือ (transfer variants, payroll, ฯลฯ)
- เพิ่ม MCP Client connector สำหรับ Slack/email notification
- เปิด MCP server ให้ HR Admin ใช้ Claude Desktop ทำ ops ประจำวัน
- Migrate `MockWorkflowData` → Operate API (read-only view)

### Phase 4 — Continuous improvement
- Process mining บน Operate data → แนะนำ bottleneck ให้ Agent refactor BPMN
- เปิด ad-hoc subprocess ให้ HR Agent ทำ multi-step HR tasks (e.g., full onboarding)

---

## 7. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| BPMN ที่ agent gen invalid / unsafe | Schema validation + human review gate ก่อน deploy |
| Agent ทำ destructive ops โดยไม่ตั้งใจ | Human-in-the-loop connector pattern, MCP permissions per-tool |
| Latency ของ MCP stdio (agent ต่อจาก cloud) | ใช้ remote MCP (HTTP + SSE) แทน stdio สำหรับ production |
| Vendor lock-in | BPMN เป็นมาตรฐาน ISO/IEC 19510 — ถ้าต้องย้าย engine ก็ไม่ต้อง rewrite process |
| Data residency (ไทย) | Camunda 8 self-managed บน Azure Thailand / on-prem |
| HR reject เพราะ "UI ต่างไป" | Keep existing UI; เปลี่ยนแค่ backend (engine.js → Zeebe adapter) |

---

## 8. Key Questions ที่ต้องถามทีม HR & IT ก่อนเริ่ม

1. **Hosting model:** Camunda 8 SaaS, self-managed บน Azure, หรือ on-prem?
2. **SSO:** Identity provider ปัจจุบัน (Azure AD?) — Camunda Identity รองรับ OIDC
3. **API ของ HRIS:** มี REST ให้ service task เรียกไหม หรือต้องสร้าง wrapper?
4. **Agent permissions:** ให้ Agent approve ได้เองไหม หรือ advisory เท่านั้น?
5. **Thai compliance:** PDPA audit log, BE date format ใน task forms → ต้องกำหนดใน form schema
6. **Process owner:** ใครดูแล BPMN versioning & changelog (HR Admin, Dev, หรือ BPMN Center of Excellence)?

---

## 9. Appendix: Useful Commands / Snippets

### 9.1 Setup MCP server ให้ Claude Desktop
```json
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "camunda": {
      "command": "docker",
      "args": ["run", "--rm", "-i",
               "-e", "CAMUNDA_BASE_URL=http://localhost:8080/engine-rest",
               "mcp/camunda"]
    }
  }
}
```

### 9.2 zbctl quick reference
```bash
# Auth (Camunda 8 SaaS)
export ZEEBE_ADDRESS=...; export ZEEBE_CLIENT_ID=...; export ZEEBE_CLIENT_SECRET=...

# Deploy
zbctl deploy resource leave-request.bpmn

# Start instance
zbctl create instance leave-request --variables '{"employeeId":"EMP001","days":5}'

# Inspect
zbctl status
```

### 9.3 Prompt skeleton (Prompt-to-BPMN)
```
System: You are a BPMN 2.0 expert designing executable processes for Camunda 8.
Always return valid XML conforming to Zeebe namespace. Use camunda:candidateGroups
for user tasks. Assume external workers for service tasks.

Few-shot example: <<leave-request.bpmn>>

User request: {{ HR spec in Thai or English }}

Respond with:
1. Bullet list of steps (chain-of-thought)
2. BPMN XML in ```xml block
3. Assumptions and open questions
```

---

## 10. Sources

- [Camunda MCP Client — Camunda 8 Docs](https://docs.camunda.io/docs/components/early-access/alpha/mcp-client/)
- [Camunda and the Model Context Protocol: A Practical Overview](https://camunda.com/blog/2025/09/camunda-model-context-protocol-practical-overview/)
- [MCP Remote Client connector — Camunda 8 Docs](https://docs.camunda.io/docs/next/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-remote-client-connector/)
- [AI Agent connector — Camunda 8 Docs](https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent/)
- [AI Agent Sub-process connector — Camunda 8 Docs](https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess/)
- [Build your first AI agent — Camunda 8 Docs](https://docs.camunda.io/docs/guides/getting-started-agentic-orchestration/)
- [lepoco/mcp-camunda (GitHub)](https://github.com/lepoco/mcp-camunda)
- [mcp/camunda — Docker Hub](https://hub.docker.com/r/mcp/camunda)
- [Agentic AI: Exposing processes as MCP tools (GitHub issue #48486)](https://github.com/camunda/camunda/issues/48486)
- [Camunda 8 CLI client (`zbctl`) docs](https://docs.camunda.io/docs/8.5/apis-tools/cli-client/)
- [zbctl command reference — zeebe-client-go](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/cmd/zbctl/zbctl.md)
- [Process Modeling With Large Language Models (arXiv)](https://arxiv.org/html/2403.07541v1)
- [BPMN Assistant: An LLM-Based Approach (arXiv)](https://arxiv.org/html/2509.24592v1)
- [Do LLMs Speak BPMN? (Preprints.org)](https://www.preprints.org/manuscript/202509.2350)
- [Absence Request blueprint — Camunda Marketplace](https://marketplace.camunda.com/en-US/apps/437160/absence-request)
- [AI Agent Chat with MCP Tools blueprint — Camunda Marketplace](https://marketplace.camunda.com/en-US/apps/682919/ai-agent-chat-with-mcp-tools)
- [Orchestrate Human Workflows — Camunda](https://camunda.com/solutions/human-workflow/)
- [The 2026 MCP Roadmap — Model Context Protocol Blog](https://blog.modelcontextprotocol.io/posts/2026-mcp-roadmap/)
