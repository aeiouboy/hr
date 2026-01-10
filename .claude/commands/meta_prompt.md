# Meta Prompt – Universal Task Specification Generator

description: Generate comprehensive, structured task specifications with clear, testable outputs
argument-hint: [task description, requirements, or spec input]

Generate a **comprehensive, structured task specification** for:  
`$ARGUMENTS`

---

## Output Structure

### 1. Task Overview
- **Objective**: Clear, measurable goal of the task  
- **Scope**: Boundaries, inclusions, and exclusions  
- **Success Criteria**: Specific, verifiable outcomes (SMART where possible)  
- **Stakeholders**: Key roles (Owner, Contributors, Reviewers, Approvers)  

### 2. Requirements Analysis
- **Functional Requirements**: Core capabilities that must be delivered  
- **Non-Functional Requirements**: Performance, security, usability, compliance standards  
- **Constraints**: Technical, resource, time, regulatory, or environmental limitations  
- **Assumptions**: Conditions expected to hold true  
- **Dependencies**: Systems, teams, or services relied upon  

### 3. Technical Specification
- **Architecture Overview**: High-level design and approach  
- **Components & Modules**: Major parts of the solution, mapped to functions  
- **Interfaces & APIs**: External or internal integration points  
- **Data Structures & Models**: Key schemas, tables, payloads  
- **Tools & Technologies**: Frameworks, libraries, environments to be used  

### 4. Implementation Plan
- **Phase Breakdown** (with milestones):
  - *Phase 1*: Foundation & setup  
  - *Phase 2*: Core feature implementation  
  - *Phase 3*: Integration & optimization  
  - *Phase 4*: Testing, hardening, deployment  

- **Task Breakdown by Area (within each phase):**
  - **Backend**: APIs, services, data handling  
  - **Frontend/UI**: Components, user flows, design integration  
  - **Infrastructure/DevOps**: Environments, CI/CD, monitoring  
  - **Data/DB**: Schemas, migrations, data pipelines  
  - **QA/Testing**: Test case creation, automation, validation  
  - **Documentation**: User guides, runbooks, API docs  
  - **Security/Compliance**: Authentication, authorization, audits  

- **Tasks & Responsibilities**: Assign owner per area  
- **Time Estimates**: Duration/effort per area in each phase  
- **Iteration Strategy**: Agile sprints, waterfall stages, or hybrid  

### 5. Quality Assurance
- **Testing Strategy**: Unit, integration, E2E, UAT  
- **Validation Methods**: Requirement-to-test traceability, acceptance criteria  
- **Performance Metrics**: KPIs (e.g., latency, throughput, accuracy)  
- **Monitoring & Logging**: Observability considerations  
- **Test-Driven Development (TDD)**: Write tests before code to ensure specifications drive implementation and maintain high coverage  

### 6. Risk Assessment
- **Technical Risks**: Implementation challenges  
- **Business Risks**: Impact of failure, missed deadlines, misalignment  
- **Mitigation Strategies**: Preventive actions  
- **Fallback/Contingency Plans**: Recovery or alternative approaches  

### 7. Documentation Requirements
- **User Documentation**: Manuals, tutorials, help content  
- **Technical Documentation**: Architecture diagrams, deployment steps, API docs  
- **Code Documentation**: Comments, docstrings, inline explanations  
- **Knowledge Transfer**: Handover notes, runbooks, training materials  

### 8. Deliverables
- **Primary Deliverables**: Core outputs (code, system, document, report)  
- **Supporting Materials**: Configurations, scripts, test cases, data sets  
- **Acceptance Criteria**: How deliverables are validated and approved  
- **Review & Sign-Off**: Who approves and under what conditions  

### 9. Governance & Compliance
- **Standards & Best Practices**: Industry frameworks (ISO, OWASP, Agile, ITIL, etc.)  
- **Compliance Requirements**: Legal, security, or audit obligations  
- **Change Management**: How updates and scope changes are handled  

---

## Generation Instructions

1. **Create a `spec-task` folder** if it does not already exist.  
2. Place the generated specification inside the `spec-task` folder, with a descriptive filename.  
3. Analyze the provided requirements thoroughly.  
4. Break down complex tasks into manageable, modular components.  
5. Identify potential challenges, risks, and edge cases.  
6. Propose **concrete, actionable steps** with owners/responsibilities.  
7. Recommend specific tools, technologies, and methods where applicable.  
8. Provide **measurable success metrics** and validation methods.  
9. Apply **Test-Driven Development (TDD)** principles when defining test cases and acceptance criteria.  
10. Consider **scalability, maintainability, performance, and compliance**.  
11. Suggest an **iterative delivery approach** unless waterfall is required.  
12. Break down implementation tasks **by development cycle stage and area (backend, frontend, infra, QA, docs, security)**.  
13. Include **examples, diagrams, or pseudo-code** where helpful.  

---

## Format Guidelines

- Use **clear, concise language**  
- Organize information hierarchically with headings and bullet points  
- Highlight **critical requirements and dependencies**  
- Provide **examples, pseudo-code, or diagrams** where clarification is needed  
- Include **time/effort estimates** when feasible  
- Reference **best practices and standards**  
- Ensure the spec is **implementation-ready but adaptable** for refinement  

---

🔑 **Goal:** Generate a specification detailed enough for immediate implementation, organized in a `spec-task` folder, while remaining flexible for iterative refinement and stakeholder feedback.  
