# Initial Design

## Problem

Research workflows are split across ideas, math, code, experiments, remote operation, evaluation, paper writing, and review. Existing agent skill libraries help with parts of this, but they do not fully preserve the contract between claims, assumptions, implementation, evidence, and manuscript language.

The desired system is a reusable research-agent architecture that can be installed globally and initialized per project.

## Core Loop

```text
1. Ideate
2. Formalize claim and assumptions
3. Audit math honestly
4. Plan an experiment with falsification criteria
5. Run and monitor the experiment
6. Evaluate outputs against the claim
7. Revise idea, math, or implementation based on evidence
8. Bridge supported claims into paper artifacts
9. Repeat until the contribution is stable
```

## Layering

### Global Package

Installed once into Codex, Claude, or another coding-agent environment.

Expected contents:

- `research-manager` skill
- role skills or command docs
- schemas for claims, experiments, evidence, reviews, and project manifests
- CLI helpers for status, init, packet creation, and validation
- platform adapters for Codex and Claude

### Project-Local Setup

Created by a setup/init command inside a project or project group.

Expected layout:

```text
.research-agent/
  project.yaml
  state/
    ideas.yaml
    claims.yaml
    math.yaml
    experiments.yaml
    evidence.yaml
    paper_bridge.yaml
  reviews/
  packets/
  adapters/
```

### Project Adapters

Adapters encode local reality:

- repository paths
- run commands
- eval commands
- artifact conventions
- remote compute hosts
- paper build commands
- safety rules

For Rational-Model + DCDM, this means coordinating a code repo, a paper repo, AWS hosts, eval scripts, checkpoint conventions, and LaTeX compilation.

## Manager and Subagent Strategy

The manager owns canonical state and final decisions.

Subagents should be bounded specialists. They receive task packets, inspect a scoped context slice, and return structured reports. They should not update canonical state directly unless explicitly delegated by the manager.

Recommended roles:

- Ideator
- Formalizer
- Math Critic
- Experiment Planner
- Operator
- Evidence Auditor
- Paper Bridge
- Reproducibility Reviewer
- Second-Opinion Reviewer

The stable primitive is the task or review packet, not a specific platform's subagent runtime.

## Cross-Platform Review

Codex and Claude should be able to review each other's work through structured packets on disk.

Example flow:

```text
Codex manager creates review packet
Claude adapter runs a bounded review
Claude writes structured response
Codex manager reads and decides what to merge
```

This allows independent critique without sharing whole chat histories or letting both platforms mutate the same state.

## First Benchmark

Use Rational-Model + dcdm_nips_2026 to test whether the architecture handles:

- code and paper split across repos
- remote experiment operation
- checkpoint and TensorBoard evidence
- eval artifact visibility
- paper-safe metric selection
- math and notation audits against source code
- cross-platform second opinions
