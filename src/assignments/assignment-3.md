---
layout: assignment.njk
title: Architecting an Agentic SDLC Workflow
description: Build a GitHub Actions workflow in which agents turn an issue into a tested and reviewed pull request, and explain the reasoning behind its design.
order: 3
due: "2026-11-21T23:59:00+05:30"
dueLabel: 21st November 23:59 IST
permalink: /assignments/assignment-3/
---

## Issue In, Pull Request Out

In this assignment, you will build a GitHub Actions workflow that takes an issue and produces a pull request. A maintainer starts the workflow by adding a label to an issue or by posting a comment. From there, a set of agents writes the spec and the design, changes the code, tests it, opens a pull request, and has it checked by a separate reviewer agent.

Most of the marks are for your architecture. We want to see how you divide the work between agents, how the agents pass work to each other, and why you chose this design.

**The story so far.** In A1, you built an agent skill that turns a vague idea into a specification. In A2, you tested whether architecture documentation helps an agent change code written by someone else. Now the maintainers of your project would like to add a label to an issue and later find a tested and reviewed pull request waiting for them. Before they allow a bot into their repository, they want to understand how it is designed and why.

The assignment was released on Friday 13th November. The course extension policy applies, which allows 3 days in total across all assignments if you ask before the deadline.

## Your Mission, Should You Choose to Accept It

The workflow should be in `.github/workflows/`. The sketch below shows how the workflow is triggered.

```yaml
# .github/workflows/autose.yml  (a sketch, not a template)
on:
  issues:
    types: [labeled]        # e.g. a maintainer adds the label "autose"
  issue_comment:
    types: [created]        # e.g. "/autose" on an issue or an open PR
permissions:
  contents: write
  pull-requests: write
  issues: write
jobs:
  # your design: one job or several, one agent or many, chained how you choose
```

After the workflow starts, it should go through the six stages in the table below. The stages themselves are fixed, but you decide how your agents carry them out. Each stage should save its output as an artifact, as described in the table. A stage should hand over to the next one only after its check in the last column has passed.

| # | Stage | What the agent does | Artifact | Check before moving on |
| --- | --- | --- | --- | --- |
| 1 | Requirements | Writes a spec with acceptance criteria from the issue. Reuse your A1 skill. | `spec.md` | All acceptance criteria are testable. |
| 2 | Design | Plans the change and lists the files to edit. Use your A2 `ARCHITECTURE.md`. | `design.md` | The plan names the files and functions to change. |
| 3 | Implementation | Changes the code on a new branch, following the design. | `diff.patch` | The code builds. |
| 4 | Testing | Writes a test for each acceptance criterion and runs the full test suite. Goes back to stage 3 if tests fail. | `test_report.md` | All new and existing tests pass. |
| 5 | Release | Pushes the branch and opens a pull request. | `pr.md` + PR link | The pull request is open and CI passes. |
| 6 | Review | A separate reviewer agent reviews the pull request. Requested changes go back to the stage that needs fixing, at most twice. | `review.md` | The reviewer approves, or two review rounds are used up. |

If a stage cannot pass its check, it should explain why in its artifact and stop the run. A stage can also send work back to an earlier stage when needed. For example, if tests keep failing, the design may need to change, and if the reviewer disagrees with the approach, the workflow should return to the design stage.

**Keeping the reviewer independent.** The reviewer should only see the issue, the diff and the repository at the latest commit of the pull request, and it can run the code itself if it wants to. It should not see the implementer's conversation or reasoning. Give the reviewer its own prompt and permission to read and run code, but not to push. You can use a different model for the reviewer if you like, although this is not required. In your report, explain how you make sure the reviewer does not simply agree with the implementer.

## The Heart of It: Your Architecture and Why

We would rather see a workflow that only partly works but comes with a clear, evidence-based explanation of its design than one that works but cannot explain why it is built the way it is. The diagram below shows one possible design, for reference. You can use one agent or many, and a fixed pipeline or a planner that decides what to do next, as long as you can explain your choice.

Whatever design you choose, it must keep the six stages and their checks, use a reviewer that is independent of the other agents, and leave the final merge decision to a person.

<figure class="flow-diagram">
<div class="flow-diagram-scroll">
<svg viewBox="0 0 1000 380" role="img" aria-labelledby="a3-flow-title a3-flow-desc">
<title id="a3-flow-title">One possible shape of the agentic SDLC workflow</title>
<desc id="a3-flow-desc">Requirements, design, implement and test run in a row. Failing tests retry implementation within budget. When all tests pass, release opens a PR and CI runs. An independent review with fresh context and no push rights follows. An approach issue sends work back to design and a code issue back to implementation, for at most two review rounds. On approval, or once the rounds are used up, a human decides to merge or close.</desc>
<defs>
<marker id="a3-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 1 L9 5 L0 9 z" class="flow-head"/></marker>
</defs>
<g class="flow-edges" marker-end="url(#a3-arrow)">
<path d="M210 115 H258"/>
<path d="M460 115 H508"/>
<path d="M710 115 H788"/>
<path d="M890 80 V40 H610 V78"/>
<path d="M890 150 V288"/>
<path d="M790 325 H732"/>
<path d="M490 325 H212"/>
<path d="M690 290 V152"/>
<path d="M560 290 V225 H360 V152"/>
</g>
<g class="flow-labels">
<text x="750" y="30" text-anchor="middle">tests fail: retry within budget</text>
<text x="904" y="225">all pass</text>
<text x="350" y="313" text-anchor="middle">approve, or rounds used up</text>
<text x="704" y="225">code issue</text>
<text x="374" y="214">approach issue</text>
<text x="374" y="248">max 2 review rounds</text>
</g>
<g class="flow-box"><rect x="10" y="80" width="200" height="70"/><text x="110" y="108" class="flow-title">1 Requirements</text><text x="110" y="136">issue to spec.md</text></g>
<g class="flow-box"><rect x="260" y="80" width="200" height="70"/><text x="360" y="108" class="flow-title">2 Design</text><text x="360" y="136">plan in design.md</text></g>
<g class="flow-box"><rect x="510" y="80" width="200" height="70"/><text x="610" y="108" class="flow-title">3 Implement</text><text x="610" y="136">edit on new branch</text></g>
<g class="flow-box"><rect x="790" y="80" width="200" height="70"/><text x="890" y="108" class="flow-title">4 Test</text><text x="890" y="136">old + new tests</text></g>
<g class="flow-box"><rect x="10" y="290" width="200" height="70"/><text x="110" y="318" class="flow-title">Human decides</text><text x="110" y="346">merge or close</text></g>
<g class="flow-box flow-accent"><rect x="490" y="290" width="240" height="70"/><text x="610" y="318" class="flow-title">6 Independent review</text><text x="610" y="346">fresh context, no push</text></g>
<g class="flow-box"><rect x="790" y="290" width="200" height="70"/><text x="890" y="318" class="flow-title">5 Release</text><text x="890" y="346">open PR, CI</text></g>
</svg>
</div>
<figcaption>The system runs every SDLC stage itself; a human only decides at the end.</figcaption>
</figure>

### Decisions to Justify

Write an ADR for at least 8 of the following 10 decisions.

| # | Decision | Questions to answer (these are the bare minimum, and we expect you to go beyond them) |
| --- | --- | --- |
| D1 | Splitting the work | How many agents do you use, and which stages does each one handle? Why is this better than using one agent for everything or one agent per stage? |
| D2 | Control flow | How is the workflow controlled, for example as a fixed pipeline, an orchestrator with workers, a state machine, or separate Actions jobs that trigger each other? Who decides when to go back to an earlier stage? |
| D3 | Hand-offs | What information does each agent receive, such as full artifacts, summaries or access to the repository? What do you deliberately leave out, and why? |
| D4 | State | Where do you store information between stages and between runs, for example in files on the branch, PR comments, workflow artifacts or the cache? What happens if a run is restarted? |
| D5 | Tools | Which tools does each agent have, and how are they provided (an MCP server, the `gh` CLI or the REST API)? How do you make sure each agent can only do what it needs to? |
| D6 | Models | Which model do you use for each role, and why? Consider ability, cost, speed and the value of using different models. |
| D7 | Checks | How is each stage's check carried out, for example with tests, static analysis, an LLM judge or a mix? Who makes the final pass or fail decision? |
| D8 | Reviewer independence | How do you keep the reviewer separate, for example through its own job, model, prompt or permissions? How do you stop it from approving everything? |
| D9 | Safety and failures | How do you handle budgets, timeouts, GitHub Actions limits and stages that get stuck? Since anyone can write an issue, how do you protect against prompt injection? |
| D10 | Triggers | Which events start the workflow, and who is allowed to start it? What happens if two runs start at the same time? |

**ADR format.** Follow the Nygard ADR format from A2.

**Architecture views.** Along with the ADRs, include a component view showing the agents, their tools and how they call each other, a sequence view showing one real run from the trigger to the review, and a table that lists the agent, artifact and check for each stage.

## What to Do

### Part 1: Set Up Your Repository

- Fork a repository, pin it to a specific commit and write down the commit hash. You can use one of the A2 repositories (tinydb `edff96a`, mistune `f7ec702`, structlog `19c4f21`, Python-Markdown `3f2c551`) or any other repository whose tests run in under five minutes.
- Open five issues in your fork and write them the way real users would. Two should be bug reports, two should be small feature requests, and one should be vague. For each issue, write two to four hidden acceptance tests and keep them outside the repository, as you did in A2.
- Store your model API keys as repository secrets, and protect the `main` branch so that nobody can push to it directly.

### Part 2: Design Before You Build

- Commit your component view and your first ADRs before you write any agent code, so that the git history shows that the design came first.
- If a run shows that one of your ADRs was wrong, leave the old ADR in place and mark it *Superseded*. Then add a new ADR that explains what you learned.

### Part 3: Build the Workflow

- Write the workflow and the agent code it calls. You can use any agent SDK or framework, such as the Claude Agent SDK, the OpenAI Agents SDK, LangGraph or mini-swe-agent. You may also use a ready-made "fix this issue" action as one step, as long as the design around it and its ADR are your own.
- Give each job only the permissions it needs, and treat the text of issues and comments as untrusted input.
- Make sure that anyone can follow a run on GitHub by looking at its artifacts, the pull request and the review.

## What to Submit

**Report** (`report.pdf`, at most 8 pages plus appendices)

1. Architecture (2 pages). Your three views, and which agent handles each stage.
2. Design decisions (2.5 pages). A table that summarises all your ADRs, showing for each one the decision, the option you chose, the main option you rejected, the main reason and the status. After the table, discuss the three decisions that mattered most. The full ADRs go in `decisions/`.
3. Decision experiments (1.5 pages). The two ADRs you tested, their results side by side, and what you changed in your design as a result.
4. Results (1 page). The pass rate for each stage, the results of the hidden tests, and what the reviewer caught and where it was wrong.
5. Hindsight (half a page). If you started again tomorrow, which decision would you change first, and why?
6. Limitations and threats to validity (at least three).

**Demo video** (at most 5 minutes). Show one complete run, from the issue page to the posted review. Brownie points for engaging and insightful videos.

**Submission.** Submit a file named `roll_number_a3_AutoSE.txt` that contains only the GitHub link to your repository.

Your repository should be organised as follows.

```
README.md            # fork URL + commit, models, how to trigger the workflow
report.pdf
demo.mp4             # or a link in README.md
architecture/
  views/             # component view, sequence view, stage map
  decisions/         # ADR-001.md ... one per decision, superseded ones kept
workflow/            # copy of .github/workflows/ and all agent code + prompts
experiment/
  issues/            # the 5 issue texts
  hidden_tests/
  seeded_prs/        # the 5 reviewer-check PRs (diffs + labels)
  variants.md        # what each decision-experiment variant changes
results/
  results.csv
  runs.md            # links to every Actions run, PR and review
```

Please keep your fork public until grades are released, or add the TAs as collaborators, so that we can open every link in `runs.md`.

Experiments that give negative results earn as many marks as those that give positive results.

## Rules

- **Your fork only.** The workflow may push, comment and open pull requests only in repositories that your team owns, and never in the original upstream project.
- **Never merge.** The workflow ends after the review, and a person decides whether to merge.
- **Secrets.** Keep your API keys in repository secrets and never put them in code, logs or prompts. Keep in mind that workflows triggered from forks do not receive secrets.
- **Cost.** Set a hard spending limit with your model provider before your first run, and report the total number of tokens you used.
- **AI use.** You may use coding agents to help you build the workflow. Following the course policy, mention any substantial AI help in your README and review everything the AI generated. The ADRs and the reasoning behind them must be your own.
- **Honesty.** All runs, pull requests and results must be real and linkable. A fabricated run receives zero marks.

## Resources

- Lecture 6, Agentic Architecting, and your A2 ADR format
- [AutoSE coding-agent pattern repository](https://karthikv1392.github.io/autose-agent-patterns/) (Lecture 8)
- Anthropic, [Harness Design for Long-running Application Development](https://www.anthropic.com/research/harness-design-long-running-apps) (Lecture 7)
- Yao et al., [ReAct](https://arxiv.org/abs/2210.03629) (Lecture 7)
- [mini-swe-agent](https://github.com/swe-agent/mini-swe-agent) and [SWE-bench](https://www.swebench.com/) (Lecture 9)
- SE Radio EP 730, Harness Engineering for AI Agents (Lecture 9)
- [GitHub Actions documentation](https://docs.github.com/en/actions), including events that trigger workflows and `GITHUB_TOKEN` permissions
- [GitHub MCP server](https://github.com/github/github-mcp-server) and the [GitHub CLI](https://cli.github.com/)

## One Last Thing…

Connecting a model to a button that opens pull requests is easy. The real engineering lies in deciding what each agent knows, what it is allowed to do, and who checks its work.

**Show us the choices you made, and show us that you understand why you made them.**
