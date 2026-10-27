---
layout: assignment.njk
title: The Code Is There. Does the Agent Understand It?
order: 2
due: "2026-11-05T23:59:00+05:30"
dueLabel: 5th November 23:59 IST
permalink: /assignments/assignment-2/
---

Your team has inherited a software project from another team. The project has a working codebase, a GitHub repository, and a collection of features that need to be implemented or modified. The original developers are unavailable, and there is no guarantee that the architectural decisions behind the system have been documented.

Your team decides to delegate some of this work to an autonomous coding agent.

The agent can inspect files, search the repository, modify code, run tests, and use other development tools. But there is a catch: understanding an existing software system is not the same as writing new code. The agent must identify the relevant components, understand their relationships, recognise existing design constraints, and avoid breaking behaviour elsewhere in the system.

You now have two options. You could give the agent access to the source code alone, or you could also provide it with architecture documentation describing the system's design and the reasoning behind its major decisions.

**Does architecture documentation actually help an autonomous agent perform software engineering tasks better?** Or can the agent recover enough information directly from the code, making the additional documentation unnecessary?

Your task is to investigate this question through a controlled empirical study.

## Your Mission, Should You Choose to Accept It

In this assignment you run a small, controlled experiment. You give a coding agent the same three tasks on the same repository twice, once with only the code and once with a short architecture document as well, and then compare how it did.

In short, you want to find out whether architecture documentation helps an autonomous coding agent change an existing system correctly. If it turns out that the documentation makes no difference, or even makes things worse, that is a perfectly good result as long as the setup was fair and the evidence backs it up.

You don't need to build an agent. Use one that already exists, such as Claude Code, Codex CLI, Aider or Cursor's agent mode, and put your time into setting up a fair comparison and evaluating the results carefully.

The research questions are fixed, and your report has to answer each of them.

1. RQ1 (correctness). Does the agent finish tasks correctly more often when it has the architecture document?
2. RQ2 (design fit). Does the document help the agent avoid breaking existing tests and keep to the project's existing design?
3. RQ3 (effort). Does the document change how long the agent takes or how many tool calls it makes?

Before you run anything, write down what you expect for each question and why. One sentence per question is enough, and these sentences are your hypotheses.

## Part 1: Prepare the project

Choose one repository from the shortlist below. You can also use a different one. Whatever repository you use needs a test suite that runs in under five minutes and at least four modules with separate jobs.

| Repository | What it is | Why it fits | Commit |
| --- | --- | --- | --- |
| [msiemens/tinydb](https://github.com/msiemens/tinydb) | Small document-oriented database | Table, query, storage and middleware layers with pluggable storages | [`edff96a`](https://github.com/msiemens/tinydb/tree/edff96aeb2616402e9489d46e90a592c05565621) |
| [lepture/mistune](https://github.com/lepture/mistune) | Markdown parser | Block and inline parsers, renderers, plugins and directives | [`f7ec702`](https://github.com/lepture/mistune/tree/f7ec702edfc1ad5579a76f881238841af266d93c) |
| [hynek/structlog](https://github.com/hynek/structlog) | Structured logging library | Processor pipeline with config, output, dev and stdlib layers | [`19c4f21`](https://github.com/hynek/structlog/tree/19c4f21059e853114efa7a93b6e675d93bf7934e) |
| [Python-Markdown/markdown](https://github.com/Python-Markdown/markdown) | Markdown-to-HTML converter | Processor pipeline and extension API | [`3f2c551`](https://github.com/Python-Markdown/markdown/tree/3f2c5510bd8d64a73ec18342f740371bcde9b20c) |

To prepare the repository, follow these steps.

1. Fork or clone the repository and check out the commit listed in the table. If you use a different repository, pin it to one commit and write down the hash.
2. Delete the existing design docs, ADRs and any long explanatory documentation, such as a `docs/` folder. You can keep the README if it is short and only explains usage. Otherwise delete it as well. Keep a list of everything you removed.
3. Run the test suite once and record how many tests pass, fail and are skipped. This is your baseline.
4. Make two copies of the prepared repository. The copy in `cond-A/` has only the code, and the copy in `cond-B/` has the same code plus your `ARCHITECTURE.md`. Nothing else should differ between them.

Then write exactly three tasks, one of each type in the table below.

| Type | What it looks like | Example (tinydb) |
| --- | --- | --- |
| T1 Bug fix | You inject or find a small bug; the agent must find and fix it | Break an edge case in a query such as `one_of` and ask the agent to fix the failing behaviour |
| T2 Local feature | Add a feature that lives mostly in one module but must follow its conventions | Add a new query test, such as checking that a value lies between two bounds |
| T3 Cross-component change | Requires touching 2 or more modules and respecting how they connect | Add a new storage, such as compressed JSON, that plugs in through `TinyDB(storage=...)` like the existing ones and works with `CachingMiddleware` |

Each task needs a short spec of five to ten lines that describes the behaviour you want without saying how to implement it. Before you run the agent, also write two to four acceptance tests for each task, and keep them hidden from the agent in both conditions. If a task can be solved by changing one line without looking at the rest of the code, it is too easy and you should pick another one.

## Part 2: Write one architecture document

Write a single `ARCHITECTURE.md` of about two to four pages. You may (and we know you will) use an LLM to draft it, as long as you check what it says against the code. The document has three sections.

1. An overview of the four to eight main components, saying what each one does and which ones call which. Include one simple diagram, either in Mermaid or as an image.
2. Three ADRs. Each one gives the context, the decision, the alternatives that were considered and the consequences. Each ADR also has a status line that says Verified if you found evidence for the decision (a commit message, an issue or a code comment) or Inferred if it is your own reasoning from the code.
3. Five constraints, which are rules a developer should not break when changing the code. Examples are "new storages must subclass `Storage`" and "`queries.py` must not import `table.py`". For each one, give the file where the rule can be seen.

To check the document, pick ten factual claims from it and look each one up in the code. Record the results in a table like this one.

| # | Claim | Where you checked it (file:line) | Correct? | Fix made |
| --- | --- | --- | --- | --- |
| 1 | *e.g. Storages subclass the abstract `Storage` class* | `tinydb/storages.py:36` | Yes | None |

Correct any wrong claims before you start the experiment. In the report, write one paragraph on how you produced the document, including the tools and prompts you used and how long it took.

## Part 3: Run the experiment

You will do 12 runs in total, since there are three tasks, two conditions and two runs of each. Every run starts from a fresh copy of the prepared repository.

The agent and its version, the model, settings such as temperature or effort level, the task text and the machine must be the same in every run. Write these down once in `config.md`.

Both conditions get the same prompt.

```
[Task spec]
When you are done, make sure the existing tests still pass.
```

In Condition B, add this sentence to the end of the prompt: `Read ARCHITECTURE.md before you start.`

While a run is going, follow these rules.

- Don't help, give hints or correct anything. If the agent asks a question, answer "Use your best judgement." in both conditions.
- Stop the run when the agent says it is done or after 30 minutes, whichever comes first.
- Save the full agent log and the final `git diff` for every run.

If a run crashes for a reason that has nothing to do with the task, such as an API or network error, run it again and note that you did.

## Part 4: Evaluate each run

Score every run in the same way and add one row per run to `results.csv`. The metrics are already defined, so you don't need to design your own.

| Metric | How to measure it | RQ |
| --- | --- | --- |
| Outcome | Complete if all your acceptance tests pass, Partial if some pass, Failed if none pass or the agent made no change | RQ1 |
| Regressions | The number of baseline tests that passed before the run and fail after it | RQ2 |
| Design fit (0 to 3) | One point for each yes/no check you wrote for the task (see below) | RQ2 |
| Time (min) | Minutes from sending the prompt until the agent finishes | RQ3 |
| Tool calls | The number of file reads, edits and commands in the agent log | RQ3 |
| Tokens or cost | Only if the agent reports them, otherwise leave it blank | RQ3 |

The design-fit checks are questions you can answer by reading the diff. For a task that adds a new storage, you might ask whether it subclasses `Storage` the same way as the existing ones, whether the agent avoided adding a new third-party dependency, and whether the code went into the module that the architecture expects. Write these checks for each task before you do any runs, so that what you see in the runs doesn't shape them.

The results file has these columns.

```csv
run_id,task,condition,trial,outcome,acceptance_passed,acceptance_total,regressions,design_fit,time_min,tool_calls,tokens
T1-A-1,T1,A,1,Complete,3,3,0,3,6.5,24,
```

For the qualitative part, choose one run that went well and one that went badly, ideally from different conditions. For each one, write a short paragraph on what the agent did and why you think it did that, using steps or quotes from the log. If the architecture document clearly helped, was ignored or led the agent astray at some point, say where that happened.

## Part 5: Write the report

The report can be up to eight pages, not counting appendices, and should have the following sections.

1. Hypotheses (half a page), giving your expected answer to each RQ and the reason for it.
2. Setup (one page), covering the repository and commit, the tasks, the agent, model and settings, and what you removed from the repository.
3. Architecture document (one page), covering how you made it, how long it took, and the table of checked claims.
4. Results (two pages), with a table that has one row per run and a summary table for each condition. The summary shows the complete rate and the mean regressions, design fit, time and tool calls. A chart is welcome but not required.
5. Analysis (two pages), where you answer the RQs one at a time and then describe the two runs you picked. Say where the document helped, where it made no difference and where it made things worse.
6. Limitations (half a page). Give at least three, for example that there were only two runs per task, that you wrote both the tasks and the document, and that the agent behaves differently from one run to the next.
7. Conclusion (half a page).

With only 12 runs you don't need statistical tests. Describe the differences you see, and be careful not to claim more than the numbers can support.

## Side Quest: Is More Documentation Always Better?

You can add a third condition for extra credit. In Condition C the agent gets only the overview section of `ARCHITECTURE.md`, without the ADRs or constraints. Run T3 twice under this condition and compare the results with A and B in half a page. This tells you whether the ADRs and constraints add anything beyond the overview.

## Deliverables

Submit a single zip file named `RollNo_AutoSE_A2.zip`, laid out as follows.

```
RollNo_AutoSE_A2/
  README.md            # repo URL + commit, agent + model, how to rerun one task
  report.pdf
  ARCHITECTURE.md
  experiment/
    config.md          # agent, model, settings, prompt template
    removed_files.txt
    tasks/T1.md T2.md T3.md        # spec + design-fit checks
    acceptance_tests/             # your hidden tests
  results/
    results.csv
    baseline_tests.txt
    runs/<run_id>/log.txt, diff.patch, test_output.txt
```

## One Last Thing…

The question is not whether an autonomous coding agent can modify a repository (we know it can), but what makes it more likely to do so correctly.

To answer that, the study needs to compare conditions fairly, evaluate the resulting software, and examine where the agent fails. Documentation may help, make little difference, or even get in the way. The results should determine which of these conclusions the evidence supports.

**Code tells you what a system does. Architecture can help explain how its parts fit together and why certain constraints matter. Your job is to find out whether that distinction makes a measurable difference when the developer is an agent.**

Confidence is good. Confidence backed by experiments is better.
