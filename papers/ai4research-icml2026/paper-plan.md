# Paper Planning Note

## Central Theme

Atelier is a human-owned, file-backed protocol for turning vague research intent into bounded agent work, auditable evidence, claim updates, and reviewable decisions.

The paper should not frame the system as an autonomous scientist or as a benchmark winner. The paper should frame the system as a research control plane that keeps the researcher responsible for direction while making agent work inspectable.

## Standing Writing Rule

Before drafting or rewriting any section, first agree on that section's logic flow. The logic flow should record four things.

- Section question.
- Reader takeaway.
- Supporting evidence or mechanism.
- Claims to avoid.

Do not turn outline bullets directly into paper prose until the logic flow is settled.

## Candidate Positioning

- Primary frame. A human-owned research control plane.
- Secondary frame. A layered protocol for agent-assisted research.
- Mechanism frame. File-backed state, bounded packets, evidence records, manager resolution, and critic review.
- Contrast frame. Autonomous science agents, freeform prompting, and benchmark-only harnesses.

## Method Logic

### Settled Assumptions

#### Information-Flow Assumption

- Claim. Additional agent turns should be treated as processing of existing information unless the loop receives new human input, source material, computation output, experiment output, or other external observations.
- Formal hook. Let `Z` denote the scientific target and let `U` denote the agent's initial information, including model parameters, user context, and initially available sources. If later turns `T_{1:k}` are produced only from `U`, then `Z -> U -> T_{1:k}` is an information-processing chain, so the data processing inequality gives `I(Z; T_{1:k}) <= I(Z; U)`.
- Auto-research case. Agent-selected experiments are not evidence by themselves. The returned observation can be evidence because the observation introduces new information from an external process, artifact, benchmark, source, simulation, or experiment.
- Design implication. The protocol separates self-processing from evidence-producing interaction. `orient` records human framing, work packets scope evidence-gathering actions, reports preserve observations, and manager resolutions decide what becomes accepted evidence.
- Claim boundary. Do not claim that agents cannot make discoveries. Claim that self-directed turns alone should not be accepted as scientific evidence without new inputs or observations.

#### Bounded-Capability Assumption

- Claim. For many research-support subtasks, once an agent is above a task-specific competence threshold, a less capable or lower-budget model can match a stronger model on the assigned task when the harness, context, scope, and acceptance criteria are correct.
- Delegation hook. The relevant comparison is task-level acceptance, not general intelligence. A smaller or lower-budget agent may be enough when the manager supplies the right source context, expected output, stopping rule, and escalation criteria.
- Design implication. The protocol delegates bounded packets to workers and critics instead of asking every agent to hold the whole project state. The manager keeps broad research direction and canonical interpretation.
- Claim boundary. Do not claim that smaller agents match stronger agents on all tasks. The assumption only applies to bounded subtasks with enough context and a clear success condition.

#### Independent-Critique Assumption

- Claim. A fresh critic, especially one using a different model family, platform, prompt context, or tool surface, can reduce correlated failure modes in claim-sensitive research work.
- Critique hook. The goal is not to prevent hallucination by authority. The goal is to make unsupported assumptions, missing evidence, scope drift, and brittle reasoning more likely to surface before the manager accepts a claim.
- Design implication. The protocol uses bounded review packets for claim, evidence, experiment-design, math, code, paper, deliverable, and steering reviews. Critics write reports and stop. The manager resolves findings before any canonical update.
- Claim boundary. Do not claim that cross-platform critique guarantees correctness. A critic can hallucinate too. Treat critique as an error-detection channel whose findings still require manager resolution and evidence checks.

### Candidate Additional Assumptions

- State persistence. Research decisions need durable state because chat history is incomplete, platform-specific, and hard to audit.
- Authority separation. Reports and critiques should not become canonical until a manager resolves them.

### Design Principles

- Governed discovery over metric chasing. The workflow should keep research tied to problem framing, assumptions, falsification criteria, evidence, and claim scope. Metrics matter as evidence inside a research argument.
- Human-owned steering. The human remains responsible for research direction, problem framing, and final claim acceptance. The agent may propose, critique, run bounded work, and surface tradeoffs.
- Bounded agency with constructive dissent. The assistant should behave like a mature PhD researcher under a rigorous advisor. It may push back, propose alternatives, and identify weak evidence, but it acts through scoped packets, recorded reports, and manager resolution.

### Architecture Grouping

- Research lifecycle. The user-facing loop moves from orientation to problem framing, related work, evaluation design, method development, experiment planning, evidence evaluation, claim update, and deliverable packaging.
- Authority and role layer. The protocol separates human, manager, worker, and critic authority. Roles are logical rather than platform-bound. A manager can act as a worker only inside a bounded packet and does not update canonical state while acting in that role.
- File-based communication protocol. Agents communicate through `packet.md -> progress.md -> report.md -> resolution.md -> canonical update`. The same path gives humans an inspectable audit trail.
- Evidence and claim layer. Reports, experiment outputs, and critic findings are not accepted evidence by default. Manager resolution decides what becomes evidence. Claims summarize accepted evidence with explicit scope.
- Adapter boundary. Codex, Claude, Gemini, local scripts, and future agents are execution adapters. The file protocol defines meaning. Adapters define launch mechanics.

## Section Logic Ledger

### Abstract

- Section question. What is Atelier and what claim does the paper make?
- Reader takeaway. Atelier is a workflow protocol for auditable AI-assisted research, not an autonomous discovery system.
- Supporting evidence or mechanism. File-backed state, bounded task packets, evidence-first claim updates, and a small reproducible pilot.
- Claims to avoid. Do not claim broad productivity gains, final benchmark gains, or autonomous discovery.

### Introduction

- Section question. Why do research agents need a protocol layer when strong models can already answer research prompts?
- Reader takeaway. Vague research intent fails when agent work is freeform, because assumptions, evidence, decisions, and claims become hard to inspect.
- Supporting evidence or mechanism. The system separates orienting, delegation, evidence records, claim updates, and review into explicit artifacts.
- Claims to avoid. Do not imply that human oversight alone solves correctness. The claim is that protocol structure makes oversight tractable.

### Related Work

- Section question. How does Atelier differ from autonomous science agents, literature agents, agent benchmarks, and agent frameworks?
- Reader takeaway. The project occupies the protocol layer between freeform model use and fully autonomous science systems.
- Supporting evidence or mechanism. Compare against autonomous scientist systems, literature QA and ideation tools, scientific agent benchmarks, and general multi-agent frameworks.
- Claims to avoid. Do not claim the related systems lack human oversight. The distinction is where the paper places the researcher's control and where persistent state lives.

### System

- Section question. What concrete workflow does the protocol impose?
- Reader takeaway. The workflow turns vague intent into bounded work units and reviewable state transitions.
- Supporting evidence or mechanism. Use the sequence `orient -> packet -> report -> resolution -> evidence -> claim -> review -> next packet`.
- Claims to avoid. Do not overdescribe platform glue. Keep Codex and Claude as adapters around a file-backed protocol.

### Design Principles

- Section question. Why are the protocol choices shaped the way they are?
- Reader takeaway. The system is designed around human ownership, bounded delegation, persistent state, evidence before claims, and explicit review for claim-sensitive work.
- Supporting evidence or mechanism. Tie each principle to a failure mode in research assistance.
- Claims to avoid. Do not present the principles as universal laws. Present the principles as design commitments for correctness-oriented research workflows.

### Evaluation

- Section question. Does Atelier improve the workflow quality of early research steering compared with freeform prompting?
- Reader takeaway. The pilot shows stronger orientation, critique integration, and recoverable state across single-turn and role-separated multi-turn tasks.
- Supporting evidence or mechanism. Use the three-task orientation pilot, the role-separated model sweep, manual rubric scores, severe-error counts, operational recovery notes, appendix rubrics, and appendix artifact table.
- Claims to avoid. Do not lead with unsupported negatives. Do not claim statistical significance, guaranteed correctness, final research quality, or time savings.

### Discussion

- Section question. What does this framing enable and where does it fall short?
- Reader takeaway. Atelier makes agent-assisted research work inspectable, but the current evidence is a small pilot and the workflow still depends on human judgment.
- Supporting evidence or mechanism. Discuss portability, critic use, manager ownership, and limits of the pilot.
- Claims to avoid. Do not convert limitations into feature claims.

### Reproducibility

- Section question. How can a reviewer inspect or replay the work?
- Reader takeaway. The paper is backed by frozen prompts, raw outputs, scoring rules, score tables, and source notes.
- Supporting evidence or mechanism. Point to the repository artifacts and describe the expected replay path.
- Claims to avoid. Do not imply that reproducibility of the pilot proves broad system reliability.
