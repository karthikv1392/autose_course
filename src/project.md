---
layout: assignment.njk
title: Build Your Own Harness
eyebrow: Course Project
due: "2026-11-30T23:59:59+05:30"
dueLabel: 30th November 23:59:59 IST
permalink: /projects/
---

## Overview

The course project provides an opportunity to explore how autonomous and agentic systems can address meaningful challenges in software engineering. The project is open-ended, as long as it is related to autonomous software engineering. The emphasis is on identifying a well-defined problem, understanding existing approaches, designing an appropriate solution, and demonstrating its effectiveness through systematic evaluation. The use of local models is encouraged wherever feasible.

## Project Phases and Timeline

The project will proceed in three phases.

### Phase 1: Project Proposal

You need to submit a registered report style one page document, with the following contents:

1. **Problem statement and motivation:** What problem are you addressing, who experiences it, and why does it matter?
2. **Existing approaches:** How is the problem addressed today, and what limitations or opportunities for improvement have you identified?
3. **Objectives and scope:** What do you intend to achieve, and what is explicitly outside the scope of your project?
4. **Proposed direction:** At a high level, how do you envision addressing the problem, and why might an agentic approach be appropriate?
5. **Success & Quality Attributes:** Projects should define appropriate quality objectives and evaluation metrics, including resource efficiency and sustainability where relevant.

Proposals will be reviewed and may be approved, rejected, or returned for revision. Teams receiving feedback should address it and resubmit within the specified window. Full implementation should proceed after approval. We do not need the exact code-level details of your project in the proposal. The architectural overview is the right amount of detail.

The timeline for the phase is follows:

| **Milestone** | **Deadline (all 23:59 of that day)** |
| --- | --- |
| **Initial Project Proposal Submission** | **16th October** |
| **Initial Reviews Out** | **18th October** |
| **Final Proposal Submission** | **21st October** |
| **Final Approvals** | **23rd October** |

**Submission:** A singular 1-page PDF outlining the proposal is expected as the submission.

### Phase 2: Initial Build and Mid-Submission

The mid-submission is intended to assess progress, identify problems early, and provide feedback before the final submission.

By this stage, teams should have:

- A working prototype demonstrating the core idea, or a meaningful implementation of the most important components.
- A reasonably stable architecture and a clear implementation plan.
- An initial demonstration using representative tasks or inputs.
- Preliminary testing or evaluation results, including known failures and limitations.
- A clear account of remaining work and any changes to the original proposal.

A polished, feature-complete system is not expected at this stage. However, the submission should demonstrate tangible progress beyond a proposal, mock-up, or architectural description alone.

Feedback from this phase should inform the remaining implementation and evaluation work.

The timeline for the phase is follows:

| **Milestone** | **Deadline (all 23:59 of that day)** |
| --- | --- |
| **Mid-Submission** | **6th November** |
| **Feedbacks Out** | **8th November** |

**Submission:** A single, comprehensive 4-page progress report outlining the work completed and milestones achieved to date. The report must include a link to the project's GitHub repository, demonstrating substantial progress through multiple meaningful commits that reflect the project's development over time.

### Phase 3: Final Submission and Evaluation

The final submission should demonstrate a complete, integrated implementation of the proposed project, incorporating feedback from earlier phases and addressing the project's stated objectives.

The submission must include the source code, configuration, relevant tests, setup and execution documentation, and an evaluation report covering the experimental setup, results, relevant comparisons, and analysis of failures and limitations. Teams must also provide a reproducible demonstration using representative tasks or inputs and a link to the project's GitHub repository. The final report should document the technical contribution, justify key design decisions, and support claims about the system's effectiveness with evidence.

The final evaluation will involve all Teaching Assistants and the Professor, and will consider the significance of the problem, technical quality, meaningful use of agentic capabilities, engineering practices, and rigor of the evaluation. Teams should demonstrate not only what their system can do, but also how reliably it performs, where it fails, and what the evaluation reveals about its limitations.

**Deadline:** The final submission is due on 30th November at 23:59 IST. Following submission, teams will participate in evaluations involving a live demonstration of their system and a viva-style discussion covering the problem, architecture, implementation, design decisions, experimental results, and limitations. Further details regarding the evaluation schedule and format will be communicated separately.

**Submission:** Teams must submit a final report of at most 8 pages summarizing the project, its implementation, and its evaluation. Preparing a presentation for the final evaluation is highly encouraged. It should be in the ACM format. It should look like it belongs in an A-level Software Engineering conference at least, such as ICSE Tools Track.

## Some Possible Project Directions

The following examples illustrate some problems that teams could investigate by building their own agentic harnesses. These are only examples. Please do not force your agent to implement these only.

1. **Context Engineering for Large Repositories:** Investigate how an agent should select, summarize, and maintain repository context when working with large codebases. Compare approaches such as targeted file retrieval, dependency-graph traversal, and persistent summaries, measuring task success, context consumption, and execution cost.
2. **Self-Correcting Software Engineering Agents:** Develop a harness that uses compiler errors, test failures, static-analysis findings, and runtime feedback to iteratively repair generated changes. Evaluate whether structured feedback loops outperform one-shot code generation and identify when repeated repair attempts become counterproductive.
3. **Adaptive Model and Tool Selection:** Build a harness that selects models, tools, and reasoning strategies according to task complexity, observed failures, and execution cost. Compare fixed configurations against adaptive strategies using task completion, latency, and resource consumption.
4. **Autonomous Refactoring with Behavioural Guarantees:** Develop a harness that identifies architectural or design problems, proposes refactorings, and verifies behavioural preservation through tests and static analysis. Evaluate the trade-offs between improvements in maintainability metrics and the risk of introducing regressions.
5. **Harness Design for Autonomous Issue Resolution:** Build a harness around an existing coding agent, such as OpenCode or Claude Code, to resolve real repository issues. Investigate how task decomposition, repository context, iterative testing, and recovery strategies affect resolution rates on a benchmark such as SWE-bench Verified.
6. **Agentic Software Architecture and Design:** Investigate how autonomous agents can understand, assess, and improve software architecture in large repositories. Possible tasks include detecting architectural violations, identifying dependency cycles, evaluating modularity and coupling, and proposing architecture-preserving changes. Compare agent-driven approaches with conventional static-analysis tools using architectural conformance, maintainability, and regression risk as evaluation criteria.
7. **Autonomous Operations and Self-Healing Systems:** Develop agents that monitor application behaviour, diagnose incidents, identify root causes, and propose or execute corrective actions. Evaluate their effectiveness on controlled failures or realistic incident scenarios, considering recovery time, diagnostic accuracy, service reliability, and the safety of autonomous interventions.
8. **Formal Verification of Agent-Generated Software:** Investigate how coding agents can use formal methods and verification tools, such as Lean, to establish correctness properties for generated code. Explore workflows that translate specifications into proofs, use proof failures to guide code revisions, or combine formal verification with testing. Evaluate proof success, specification coverage, verification effort, and the extent to which verified properties translate into reliable software.
9. **Sustainable and Energy-Efficient Software Engineering Agents:** Develop a harness that explicitly optimizes the sustainability of software development and the resulting code. Investigate principles such as energy-efficient code generation, computationally efficient algorithms, reduced resource consumption, and energy-aware model and tool selection. Compare approaches using functional correctness, execution time, energy consumption, and resource usage, while examining trade-offs with maintainability and software quality. Sustainability should be treated as a core optimization objective alongside correctness, reliability, and maintainability, rather than as an optional secondary metric.

Teams may use existing agentic coding tools, orchestration frameworks, and evaluation benchmarks as foundations, but should clearly identify their own technical contribution. A strong project should investigate a specific hypothesis, compare meaningful alternatives, and provide reproducible evidence rather than merely demonstrating that an agent can complete a task. Novel directions are equally welcome.

## Final Note

We encourage you to identify a meaningful software engineering problem, explore possible approaches, and build a system that addresses it.

A few things to keep in mind:

- Start with the problem, not the technology. Understand what needs to be solved before deciding how to solve it.
- Make the agentic component meaningful. Consider why an agentic approach is appropriate, rather than simply wrapping an LLM in an interface.
- Think about evaluation early. Define what success looks like and how you will demonstrate it. A half-baked demo alone is not enough.

Build something useful, justify your approach, and demonstrate what you have learned.

**Use of AI Tools:** The use of AI tools is permitted for this project. However, the use of local models is encouraged wherever feasible. Any substantial use of AI tools must be clearly disclosed and appropriately documented, including the tools used, the prompts provided, the outputs generated, and how the outputs were verified or modified. Teams must be able to explain their implementation and demonstrate a clear understanding of the work submitted. Failure to appropriately acknowledge and document AI usage may result in penalties.

No doubts will be resolved after 20th November, and 48 hours before any phase’s deadline.

Finally, remember the course is about learning, grading follooooows!
