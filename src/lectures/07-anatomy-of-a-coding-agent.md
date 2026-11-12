---
title: Anatomy of a Coding Agent
description: Guest session on building AutoSE with LLMs, decision-driven architecture, and designing for an agent you don't fully trust.
order: 7
module: Code Generation and Maintenance
classDate: 22 October 2026
---

## Overview

This guest session, "Forged, not typed," walks through building AutoSE with LLMs, where more effort went into designing, testing and redesigning than coding. It covers the autonomy dial, decision-record driven development, architectural practices that keep generated code in shape, a worked feature example, and lessons from evaluating and upgrading the agent's architecture.

## Class materials

- [View the lecture slides (PDF)](/assets/lectures/07-anatomy-of-a-coding-agent.pdf)

## Why this matters

As agents take on more of the implementation work, the engineering effort shifts from writing code to deciding what should exist: recording intent, constraining agents with structure rather than prompts, enforcing rules with tests, and designing for an agent you don't fully trust.

## In class

- A quick poll on how autonomous your own AI-assisted workflow already is.
- Walkthrough of two build rounds: fast but memory-less, versus decide-first-then-generate.
- Four practices for keeping agent-generated code in shape: decision records, structural constraints, enforced architecture tests, and tactics for distrust.
- A single feature traced end to end, showing how "one arrow" on paper becomes six decisions in practice.
- Two real evaluation case studies (a blackboard turned chat log, and memory with no rule for what lives where) and how each was diagnosed, mapped to research, and fixed.

## Reading

1. Nygard, M. (2011). *Documenting Architecture Decisions*.
2. Bass, L., Clements, P. and Kazman, R. *Software Architecture in Practice*.
3. Ford, N., Parsons, R. and Kua, P. (2017). *Building Evolutionary Architectures*.
4. Yao, S. et al. (2023). "ReAct: Synergizing Reasoning and Acting in Language Models."
5. Sumers, T. et al. (2024). "Cognitive Architectures for Language Agents."
6. Packer, C. et al. (2023). "MemGPT: Towards LLMs as Operating Systems."
7. Liu, N. et al. (2024). "Lost in the Middle: How Language Models Use Long Contexts."
8. Saltzer, J. and Schroeder, M. (1975). "The Protection of Information in Computer Systems."
9. Parasuraman, R., Sheridan, T. and Wickens, C. (2000). "A Model for Types and Levels of Human Interaction with Automation."
10. Amershi, S. et al. (2019). "Guidelines for Human-AI Interaction."

## After class

Start a decisions folder for your own project: write one architecture decision record today, including the alternatives you rejected, and point your agent's instruction file at it.
