# System Blueprint

## Purpose

This project defines a reusable Atelier protocol for AI-assisted research work. The protocol should work across Codex, Claude, Gemini, company-approved agents, and future tools.

The core product is not a chat transcript or one platform's plugin. It is a project-local research control plane that keeps the research loop, evidence, claims, agent work, and human decisions readable and durable.

## Reading Order

This blueprint is organized in layers. It starts with philosophy and modes, then describes the project layout and durable artifacts, then defines communication, authority, worker, and critic contracts, then lists exact artifact templates. Initialization, global package boundaries, adapters, and v0 scope come after the core protocol.

## Design Philosophy

The system should guide agents through a valid path to scientific discovery. The target behavior resembles a mature PhD researcher working under a rigorous advisor. The agent may propose ideas, inspect evidence, run experiments, and revise the story, but each step must remain tied to explicit assumptions, falsification criteria, and recorded interpretation.

The goal is governed discovery, not mere autonomous experimentation. Unbounded autonomy can produce activity without a defensible research argument. Atelier should instead make the discovery process inspectable, principled, and accountable to the manager-owned state.

## Core Principles

- Keep the core agent-agnostic. Platform adapters may change how work is executed, but not what project state means.
- Keep one active manager. Critics and workers return reports; the manager updates canonical state.
- Prefer intent-first interaction. The user speaks in research intent, and the manager translates intent into protocol actions.
- Practice constructive dissent. The manager should offer second opinions and pushback when useful, especially when validity, evidence, complexity, claim scope, or cost materially affects the research path.
- Use Superpowers-style implementation discipline when available. Design gates, bounded subagents, escalation, self-review, and verification are execution practices, not canonical research state.
- Keep project state local and self-contained under `.atelier/`.
- Use Markdown with small frontmatter for reasoning artifacts. Use YAML only for small config and index files.
- Preserve history. Superseded claims, old experiments, and negative results should be marked, not deleted.
- Treat HTML as an optional generated view, not canonical state.

## Modes

V0 has two project modes.

`scholar` is for publishable or reviewer-facing research. It emphasizes problem framing, evaluation design, math or logic audits, claim scope, and deliverable-ready evidence.

`builder` is for applied, internship, or stakeholder-facing research. It emphasizes useful results, visible progress, demos, final reports, and team impact while still preserving honest evidence labels.

Both modes use the same lifecycle and file structure. The mode changes the bar for decisions, not the meaning of the protocol.

## Intent-First Interaction

The primary interface is research intent, not command recall. The user should be able to ask for a claim audit, a stronger experiment plan, a status read, or the next move in ordinary research language.

The manager translates user intent into protocol actions. A request may become a work packet, review packet, evidence update, claim revision, state update, or project-level decision. Commands remain useful shortcuts for repeatable actions, but commands are not the primary mental model.

The manager should act as a trusted advisor rather than a compliant executor. Pushback should be grounded in evidence, scope, cost, or validity. If the user understands the tradeoff and still chooses a path, the manager may proceed with the relevant assumption or risk recorded in the appropriate packet, resolution, claim, evidence record, or log.

## Lifecycle

The lifecycle is looped, not linear.

```text
orient
  -> frame problem
  -> map related work
  -> define evaluation frame
  -> develop method or artifact
  -> audit logic, math, or implementation plan
  -> plan experiment
  -> run or monitor
  -> evaluate evidence
  -> revise method, evaluation, or claim
  -> package deliverable
```

Any phase may loop back. Weak evidence may revise the method, unclear reviewer relevance may revise the problem frame, inadequate metrics may revise the evaluation frame, and implementation constraints may revise the method or experiment plan.

## Atelier Skills

Research lifecycle guidance lives in `.atelier/skills/`. These files are reusable Atelier skills, not rigid pipeline stages. The manager loads the skill that matches the user intent, current state, active bottleneck, or reported evidence.

`skills/init.md` is the pre-project setup skill. It should run `atelier init` or the packaged init helper when available. The helper creates `.atelier/` from templates, copies the project skills, fills `project.yaml`, and then hands off to `skills/orient.md`.

New projects should begin with `skills/orient.md`. Later requests may route to skills such as `steer.md`, `map_related_work.md`, `design_evaluation.md`, `develop_method.md`, `plan_experiment.md`, `resolve_report.md`, `evaluate_evidence.md`, `update_claim.md`, `bridge_deliverable.md`, or `second_opinion.md`.

`state/current.md` may record a prose Current Focus. The focus is a dominant lens rather than a lock. A paper-writing focus may still trigger experiment planning if the draft exposes an evidence gap.

## Project Layout

Initialized projects store Atelier state under `.atelier/`.

```text
.atelier/
  ATELIER.md
  project.yaml

  state/
    current.md

  resources/
    index.md

  briefs/
    project.md

  skills/
    init.md
    orient.md
    steer.md
    map_related_work.md
    design_evaluation.md
    develop_method.md
    plan_experiment.md
    resolve_report.md
    evaluate_evidence.md
    update_claim.md
    bridge_deliverable.md
    second_opinion.md

  ops/               optional
    compute.md

  claims/
    index.yaml
    C001.md

  work/
    index.yaml
    pending/
      W001/
        packet.md
    active/
      W002/
        packet.md
        progress.md
    reported/
      W003/
        packet.md
        progress.md
        report.md
    closed/
      2026-05/
        W004/
          packet.md
          progress.md
          report.md
          resolution.md

  evidence/
    E001.md
    index.yaml

  reviews/
    index.yaml
    pending/
      R001/
        packet.md
    active/
    reported/
      R002/
        packet.md
        report.md
    closed/
      2026-05/
        R003/
          packet.md
          report.md
          resolution.md

  logs/
    research-log.md
    decisions.md
```

The tree reflects research concepts, not supported agents. Agent-specific entrypoints such as `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` are optional thin adapters that point into `.atelier/`.

`briefs/` defaults to one project brief at `briefs/project.md`. Extra briefs should become active only when a project has a real separate audience or deliverable. V0 templates may include a blank `briefs/deliverable.md` placeholder, but managers should ignore it until deliverable planning begins.

`ops/compute.md` is optional. It exists only when the project uses external compute, managed servers, cluster queues, cloud instances, or other targets that need durable operating instructions. V0 templates may include a blank placeholder, but managers should leave it unused until compute instructions are needed.

## ATELIER.md Template

`.atelier/ATELIER.md` is the project-local entrypoint for any agent that joins the research loop. The template is agent-agnostic. Platform memory, agent memory, chat history, and model recall are hints only. The canonical record lives in `.atelier/`.

The template should remain operational rather than architectural. It should tell an agent how to boot, how to identify the active manager, how to act as manager, worker, or critic, and when to stop.

The settled template is:

````markdown
# Atelier Instructions

## Source Of Truth

Use `.atelier/` files as canonical project state. Do not rely on chat history as project memory.

Read `project.yaml` and `state/current.md` before acting as manager. Read `briefs/project.md` when the task affects project direction, claims, evidence, evaluation, or deliverables.

## External Memory

Use platform memory, agent memory, chat history, and model recall only as hints.

If external memory and project files disagree, trust project files. If external memory suggests useful context missing from project files, mention the gap and ask whether to update the relevant `.atelier/` artifact.

Do not silently write memory-derived facts into claims, evidence, briefs, or decisions.

## Role Selection

If this platform matches `manager.current_owner`, act as manager.

If this platform does not match `manager.current_owner`, ask before taking manager authority. You may still act as a bounded worker or critic when assigned a packet.

If assigned one work or review packet, follow that packet and do not act as manager.

## Manager Charter

The manager owns canonical state, work queues, review queues, claims, evidence, resolutions, current focus, and user communication.

Translate research intent into protocol actions. When the task matches an Atelier skill, load the relevant file from `.atelier/skills/` and follow it.

Ask questions when missing context would make the next action risky, direction-changing, expensive, or hard to undo. Otherwise prefer bounded progress and record assumptions.

Offer second opinions and pushback when useful. Surface concerns about validity, evidence, complexity, claim scope, or cost when those concerns materially affect the research path.

If the user chooses a path after seeing the tradeoff, proceed and record the relevant assumption or risk in the packet, resolution, claim, evidence record, or log.

## Research Skills

Reusable Atelier skills live in `.atelier/skills/`.

Load the skill that matches your role, user intent, packet instructions, current state, active bottleneck, or reported evidence.

New projects begin with `skills/orient.md`.

## Worker Charter

A worker reads one work packet, stays inside scope, performs bounded work, writes `report.md`, and stops.

Do not update canonical state. Do not guess when requirements, design, approval, data access, or scope are unclear.

Use `needs_context`, `blocked`, `failed`, or `completed_with_concerns` when appropriate.

Create or update `progress.md` when the work becomes long-running, external, costly, operationally stateful, or hard to recover from chat alone.

## Critic Charter

A critic reads one review packet, reviews the bounded target with fresh context, writes findings in `report.md`, and stops.

Do not fix issues. Do not update canonical state. Do not act as co-manager.

## Approval Policy

`autonomous` means the worker may complete bounded work without interrupting the user.

`manager_review` means the worker may act, but the manager must inspect before canonical acceptance.

`human_design_gate` means the manager must discuss design with the user before implementation.

`human_run_gate` means the manager must ask for explicit user approval before expensive, external, destructive, or public action. Platform full-access mode does not waive this protocol gate. Adapters may use native confirmation UI when available. Plain-text approval is acceptable when native options are unavailable.

## Work And Review Loop

Use the durable loop.

```text
packet.md -> optional progress.md -> report.md -> resolution.md -> canonical update
```

The manager creates packets. Workers and critics write reports. The manager writes resolutions and updates canonical state.

## Evidence And Claims

Evidence is the accepted manager read of a concrete artifact or result.

Claims are higher-level interpretations supported, weakened, refuted, or qualified by evidence.

Preserve negative results. Mark stale work as historical or superseded rather than deleting it.

## File Authority

Only the manager updates canonical state by default.

Canonical state includes `state/current.md`, `briefs/project.md`, `claims/`, `evidence/`, queue indexes, `resolution.md`, and logs.

Workers and critics may write reports and explicitly allowed draft outputs.

## Adapter Boundary

Core files define meaning. Adapters define launch mechanics.

Different platforms may spawn workers or critics differently. The project state semantics remain the same.

## Superpowers Guidance

Use Superpowers when available for implementation work that needs design discipline, debugging, TDD, or review.

Superpowers is an execution discipline. It does not define canonical research state.
````

The manager contract covers orchestration, but orchestration is not the whole role. The manager also judges evidence, records accepted interpretations, scopes claims, resolves reports, maintains current focus, and communicates with the user.

The worker and critic charters should keep the bounded-packet rule explicit. A worker or critic may propose an evidence record, claim edit, queue update, or state change in `report.md`. The manager decides whether the proposal becomes canonical in `resolution.md` and the later canonical update.

## Durable Artifacts

`project.yaml` is the stable project manifest. It records project identity, mode, active manager, optional critic configuration, known resource roots, and small indexes that rarely change. It includes the current manager only. It does not include a `default_owner`.

`manager.current_owner` is a soft semaphore for canonical state authority. If a platform does not match `current_owner`, the agent should ask before taking manager authority. Routine platform handoff is operational history, not a project decision.

`project.yaml` may include a minimal compute registry for platforms and targets. Detailed operating procedures belong in `ops/compute.md`. Live compute status, queue state, host load, and current run health do not belong in `project.yaml`.

`state/current.md` is the canonical live snapshot for manager session recovery. The file is a compact dashboard, not a database and not a mirror of `claims/`, `evidence/`, `work/`, or `reviews/`. It contains pointers and current reads. Full arguments live in claims, evidence, briefs, work, reviews, and logs.

The file keeps frontmatter minimal.

```yaml
---
type: current_state
updated: YYYY-MM-DD
---
```

V0 has no hand-maintained `current.yaml`. Generated JSON or YAML views may be added later, but `state/current.md` remains the source of truth in v0. The file records Current Focus as prose rather than an `active_focus` field.

Use this v0 section spine.

```markdown
# Current State

## Current Focus

## Snapshot

## Working Position

## Queue Snapshot

## Blockers And Risks

## Next Moves

## Recent Updates
```

Current Focus names the dominant lens for the manager. The focus is not a lock. Snapshot gives the compact status read needed for recovery. Working Position records live research questions, tentative reads, and unresolved assumptions that currently shape the project. It should link to claims, evidence, work, reviews, briefs, or logs when a pointer is needed.

V0 has no separate `questions/` artifact. Questions are handled implicitly but visibly through brief framing, Working Position, work packets, review packets, evidence records, and claims.

Queue Snapshot should mention active, reported, blocking, or otherwise decision-relevant work and reviews only. Full queue details live in queue indexes and item folders.

`resources/index.md` records relevant codebases, papers, datasets, internal docs, benchmark suites, team constraints, and prior implementations.

`briefs/project.md` records the project frame. The brief should cover the problem and landscape, proposed direction and rationale, evaluation frame, data and benchmark availability, success and falsification criteria, deliverable frame, constraints and preferences, and open strategic questions. The evaluation frame should include standard evaluations and gap-exposing evaluations.

`claims/` contains a lightweight argument layer. Claims are optional for exploratory work and required before conclusions can be labeled `deliverable_ready`. A claim synthesizes multiple evidence records when the project needs a defensible method, result, or deliverable story. Claims are flat by default, with optional `parent` and `depends_on` links when a claim graph is useful. `claims/index.yaml` is a compact lookup aid.

`work/` contains the unified work queue. Work orders use `kind` to distinguish experiment, implementation, literature, math, ops, writing, and analysis work. `kind: experiment` means the expected output is evidence about a research question, claim, method, metric, model, dataset, or baseline. Other work kinds support research, but do not directly create evidence. Work packets use `priority` and `effort` instead of a generic risk field.

Each work item is a directory. `packet.md` preserves the manager's intent. `progress.md`, when present, preserves live operational state. `report.md` preserves the worker output. `resolution.md` preserves the manager interpretation after the report is read. Resolution decisions use `accepted`, `partially_accepted`, `rejected`, `invalid`, or `superseded`. `index.yaml` gives compact lookup across queue states. Closed work is sharded by date, such as `closed/2026-05/`.

`evidence/` contains readable evidence records that capture a specific read of a result or artifact. Raw artifacts remain in their natural output locations. Evidence records include the result read, claim links, limitations, deliverable use, and recommended follow-up. The manager turns recommended follow-up into work, reviews, or claim updates.

`reviews/` contains critique and second-opinion packets. Reviews remain separate from `work/` because review is the cross-platform criticism gateway. Each review item follows the same packet, report, and resolution split as work. For reviews, `resolution.md` may accept and reject individual findings by finding ID. `index.yaml` gives compact lookup, and closed reviews are sharded by date.

`logs/research-log.md` is the chronological project journal.

`logs/decisions.md` records larger project-level decisions only. Per-item decisions belong in the item's `resolution.md`.

## Communication Model

Agents communicate through files, not hidden chat history.

```text
packet.md -> optional progress.md -> report.md -> resolution.md -> canonical update
```

The manager creates packets. Workers and critics read bounded context and write reports. Reports are not edited after submission. If the manager disagrees, the disagreement is recorded in the item's `resolution.md`.

`packet.md` expresses manager intent. The adapter maps that intent to launch mechanics, prompts, tool calls, terminal commands, or manual handoff. `progress.md` records volatile operational state such as run status, ETA, host, session, job ID, logs, artifacts, blockers, and next check. `report.md` records observed outputs, blockers, proposed interpretation, and optional runtime notes. `resolution.md` records the accepted manager interpretation and any canonical update.

The manager may read `progress.md` for recovery and monitoring, but not as accepted evidence or claim interpretation. `progress.md` is optional for short work and expected for long-running, external, costly, or hard-to-recover work. It is frozen, not purged, once `report.md` is submitted.

A manager can recover context in a new session by reading `project.yaml`, `state/current.md`, queue indexes, active or recent `packet.md` files, submitted `report.md` files, and closed-item `resolution.md` files.

Work and review queues use four states:

```text
pending -> active -> reported -> closed
```

`pending` means created but unclaimed. `active` means claimed or in progress. `reported` means the worker or critic has submitted a report and awaits manager resolution. `closed` means `resolution.md` is recorded.

Work packets include priority and effort.

```text
priority = low | medium | high
effort = low | medium | high
```

Priority controls work scheduling. `high` is enough for work that blocks a claim, deliverable, decision, expensive run, or near-term presentation. Time-sensitive deadlines belong in the packet body. Effort controls time, reasoning depth, and model or agent choice. Review packets omit priority in v0 and use effort plus `blocking`.

Permission gates are expressed through `approval_policy`.

```text
approval_policy = autonomous | manager_review | human_design_gate | human_run_gate
```

`autonomous` allows the worker to complete bounded work without interrupting the user. `manager_review` allows the worker to act, but the manager must inspect the result before canonical acceptance. `human_design_gate` requires manager-user design discussion before implementation. `human_run_gate` requires user approval before expensive, external, destructive, or public action.

When `human_design_gate` applies to implementation work, the manager should use Superpowers-style design dialogue when Superpowers is available. The manager discusses logic, inputs, outputs, assumptions, file scope, and verification before delegating bounded implementation.

## Authority Model

The canonical role name is manager. Orchestration is one responsibility of the manager, covering packet creation, assignment, and queue tracking. The same role also advises on research direction, judges evidence, stewards claim scope, owns canonical state, and translates user intent into protocol actions.

The active manager owns:

- canonical state
- current focus
- work and review queues
- claims
- evidence
- resolutions
- deliverable readiness
- user communication

Workers and critics may:

- inspect allowed context
- execute allowed commands
- write reports
- draft evidence
- propose state changes

Workers and critics may not, by default:

- edit canonical claims or briefs
- mark evidence as deliverable-ready
- change project mode
- mutate project code
- launch expensive or externally visible work beyond the packet

Code modification is separate explicit work. When available, implementation-heavy work may use Superpowers-style software engineering workflows for planning, debugging, TDD, and verification.

## Worker Contract

A worker is a bounded executor. A worker receives one active work packet, reads the worker charter in `ATELIER.md`, reads `packet.md`, performs only the scoped work, writes `report.md`, and stops.

Workers should escalate instead of guessing. A worker may answer routine execution questions from available context, but should not make method, metric, objective, claim, expensive-run, or public-output decisions without manager approval. The manager may involve the user when the packet requires `human_design_gate` or `human_run_gate`.

Worker reports use a small outcome set.

```text
completed
completed_with_concerns
needs_context
blocked
failed
```

`completed` means the assigned work was done. `completed_with_concerns` means output exists but the worker flags uncertainty. `needs_context` means the packet lacked required context. `blocked` means an external condition stopped progress. `failed` means attempted execution was invalid or unsuccessful.

Experiment work may also include a research read.

```text
supports
weakens
refutes
qualifies
inconclusive
not_applicable
```

A completed experiment can weaken or refute a claim. A failed experiment means the run was broken, invalid, or not interpretable.

Reports may include a small runtime section when known.

```text
Platform
Model
Effort
```

Runtime is optional in v0. It is useful for interpreting second opinions and weak reports, but it is not a telemetry system.

## Critic Contract

A critic is a bounded reviewer. A critic receives one active review packet, reads the critic charter in `ATELIER.md`, reads `packet.md`, reviews the bounded target, writes `report.md`, and stops.

Critics do not fix issues, update canonical state, or act as co-managers. The critic produces findings. The manager resolves findings in `resolution.md`.

Review packets use two modes.

```text
review_mode = standard | adversarial
```

`standard` checks correctness, completeness, and readiness. `adversarial` challenges assumptions, scope, evidence, failure modes, and whether the current direction should be trusted.

Review packets use a small type set.

```text
review_type = claim | evidence | experiment_design | math | code | paper | deliverable_plan | steering
```

Claim review audits whether a higher-level interpretation is honest, scoped, and supported by evidence. Evidence review audits a concrete result read. Experiment-design review audits whether a planned experiment can answer the stated question. Steering review critiques the manager's proposed next move.

Review reports use the shared report structure. Findings should be concrete and grounded. Each finding should include severity, confidence, target, issue, evidence, and recommendation. Severity uses `critical`, `high`, `medium`, and `low`.

Second opinion means a fresh bounded critic pass. A different platform is preferred when available, but same-platform review is valid when only one platform is available. Fresh bounded context is the default and does not need a separate packet field.

Review should be triggered selectively. Defaults include deliverable-ready claims, blocking experiment designs, core implementation reports, evidence that contradicts an active claim, major steering pivots, and paper-facing strong claims. Routine plotting, status updates, exploratory scratch results, and non-blocking summaries do not need automatic review by default.

## Claims, Experiments, And Evidence

Claims are higher-level interpretations. They state what must be true for the method, result, or deliverable story to hold.

Experiments are work orders with `kind: experiment`. An experiment tests or explores a research question, claim, method, metric, model, dataset, or baseline. Implementation, literature, math, ops, writing, and analysis work can support research, but those work kinds do not directly create evidence.

Evidence records preserve the accepted read of concrete artifacts or results. Each record is a specific interpretation of a result, not a dump of raw output.

The relation is many-to-many:

```text
one claim may need many evidence records
one evidence record may support, weaken, refute, or qualify many claims
```

Evidence should distinguish valid negative results from invalid or bugged runs. Old work should be marked `historical` or `superseded`, not erased.

The initial shared label pool is intentionally small:

```text
exploratory
confirmatory
diagnostic_only
deliverable_ready
historical
post_evidence_change
negative_result
supported
weakened
refuted
```

Labels are interpretations. Status is lifecycle state.

## Artifact Templates

`project.yaml` is the stable manifest created by init. It should stay small.

```yaml
project:
  id: project-slug
  name: Project Name
  mode: scholar | builder
  created: YYYY-MM-DD

manager:
  current_owner: platform-name

critics:
  enabled: false
  platforms: []

resources:
  index: resources/index.md

repos: []

artifact_roots: []

compute:
  platforms: []

adapters:
  root_entrypoints: []
```

`project.yaml` does not include `default_owner`. It may register compute platforms, but detailed compute procedures, live status, host load, current run health, and queue state belong in `ops/compute.md`, `progress.md`, queue indexes, or reports.

Claim files should keep lifecycle and support separate.

```yaml
---
type: claim
id: C001
title: Short claim title
status: draft | active | deliverable_ready | historical | superseded | refuted
claim_kind: method | result | theory | evaluation | positioning | implementation
support_level: unsupported | weak | moderate | strong | mixed | refuted
evidence_links: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

The body should include Claim, Scope, Rationale, Evidence, Limitations, Deliverable Readiness, Review State, and Next Revision. Status says where the claim is in the lifecycle. Support Level says how strong the current evidence is.

Work packets should be parseable enough for agents and status views. The v0 work artifact should include the following fields.

```yaml
---
type: work_packet
id: W-YYYYMMDD-001
title: Short work title
status: pending
kind: experiment | implementation | literature | math | ops | writing | analysis
priority: low | medium | high
effort: low | medium | high
approval_policy: autonomous | manager_review | human_design_gate | human_run_gate
owner: unassigned
compute_kind: none | cpu | gpu | unknown
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

The body should include Objective, Context, Scope, Inputs, Expected Output, Success Criteria, Execution Notes, Escalation Rules, and Required Report. Experiment work should add an Experiment Frame with research question, result read, method or setup, metrics, comparisons or reference points, execution path, code readiness, outcome mapping, expected artifacts, and claim links.

`packet.md` stays at the intent layer. Detailed compute targets, host names, GPU IDs, job IDs, launched commands, logs, live artifact paths, ETA, retry counts, cost notes, quota notes, and sync notes belong in `progress.md` when needed.

`edit_scope` defaults to `none`. Scoped edits may be allowed for glue code, config, or evaluation paths named in `allowed_paths`. Core method changes require separate work with explicit manager approval.

Work progress uses a small optional template.

```yaml
---
type: work_progress
updated: YYYY-MM-DD HH:MM
run_status: none | not_started | running | blocked | completed | failed | unknown
eta: unknown
---
```

The body should include Current State, Last Observed, External Handles, ETA, Next Check, and any blocker, retry, cost, quota, or sync note. A worker creates or updates `progress.md` when the work becomes long-running, external, costly, operationally stateful, or hard to recover from chat alone.

Reports share one base shape across worker and critic reports.

```yaml
---
type: work_report | review_report
id: W-YYYYMMDD-001 | R-YYYYMMDD-001
title: Short title
outcome: completed | completed_with_concerns | needs_context | blocked | failed
reported: YYYY-MM-DD
reported_by: agent-or-worker-name
---
```

The body should include Summary, Scope Check, Work Performed, Findings, Artifacts And Pointers, Validity And Limitations, and Suggested Follow-Up. Suggested Follow-Up is a worker or critic suggestion, not a manager instruction.

Experiment work may add an Experiment Read section with `supports`, `weakens`, `refutes`, `qualifies`, `inconclusive`, or `not_applicable`. Review reports may add a Finding List with finding IDs, severity, confidence, target, issue, evidence, and recommendation.

Resolutions share one base shape across work and review items.

```yaml
---
type: work_resolution | review_resolution
id: W-YYYYMMDD-001
title: Short title
decision: accepted | partially_accepted | rejected | invalid | superseded
resolved: YYYY-MM-DD
updates: []
---
```

The body should include Decision, Manager Read, Accepted, Not Accepted Or Limited, Canonical Updates, and Follow-Up. Work resolutions may add Claim And Evidence Impact. Review resolutions may add Finding Decisions, where each critic finding is accepted, partially accepted, or rejected.

Review packets should be bounded critic assignments.

```yaml
---
type: review_packet
id: R-YYYYMMDD-001
title: Short review title
status: pending
review_type: claim | evidence | experiment_design | math | code | paper | deliverable_plan | steering
review_mode: standard | adversarial
target: artifact-id-or-path
effort: low | medium | high
blocking: false
owner: unassigned
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

The body should include Review Objective, Target, Context, Questions To Answer, and Required Report. Context is the bounded review context. It may include background, materials to inspect, relevant assumptions, the manager's current read, and links to claims, evidence, work, reports, resolutions, paper sections, code paths, artifacts, logs, or plots.

Anything outside the packet is out of scope unless the packet explicitly permits limited extra inspection. Review is read-only by default, so v0 does not include separate allowed-action, forbidden-action, allowed-context, or forbidden-context fields.

Review reports use the shared report template. Review findings live in Markdown, not in a large frontmatter block.

Evidence records should be lightweight accepted reads of concrete results or artifacts.

```yaml
---
type: evidence
id: E001
title: Short evidence title
status: active | historical | superseded | invalid
evidence_kind: experiment | analysis | literature | math | code | human_judgment
strength: strong | moderate | weak | inconclusive
deliverable_use: yes | no | maybe
claim_links: []
source_work: W-YYYYMMDD-001
source_report: work/closed/2026-05/W-YYYYMMDD-001/report.md
source_resolution: work/closed/2026-05/W-YYYYMMDD-001/resolution.md
source_artifacts: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

The body should include Result Read, Source, Claim Impact, Strength, Limitations, Deliverable Use, and Follow-Up. Result Read records what the manager accepts from the source. Claim Impact records whether the evidence supports, weakens, refutes, or qualifies linked claims. Deliverable Use explains whether the evidence can be used in a paper, report, demo, presentation, or decision, and what is missing if not.

The manager decides whether a recommended follow-up becomes new work, review, or claim update.

Queue indexes are compact lookup aids, not canonical content. Item folders remain the source of truth. If an index and item file disagree, item files win.

`work/index.yaml` uses routing fields plus approval and compute fields needed for safe steering.

```yaml
items:
  - id: W-YYYYMMDD-001
    title: Short work title
    status: pending | active | reported | closed
    kind: experiment | implementation | literature | math | ops | writing | analysis
    priority: low | medium | high
    effort: low | medium | high
    approval_policy: autonomous | manager_review | human_design_gate | human_run_gate
    compute_kind: none | cpu | gpu | unknown
    owner: unassigned
    path: work/pending/W-YYYYMMDD-001
    updated: YYYY-MM-DD
```

`reviews/index.yaml` follows the same lookup pattern.

```yaml
items:
  - id: R-YYYYMMDD-001
    title: Short review title
    status: pending | active | reported | closed
    review_type: claim | evidence | experiment_design | math | code | paper | deliverable_plan | steering
    review_mode: standard | adversarial
    target: artifact-id-or-path
    blocking: false
    owner: unassigned
    path: reviews/pending/R-YYYYMMDD-001
    updated: YYYY-MM-DD
```

`claims/index.yaml` follows the same compact lookup pattern.

```yaml
items:
  - id: C001
    title: Short claim title
    status: active | draft | deliverable_ready | historical | superseded | refuted
    claim_kind: method | result | theory | evaluation | positioning | implementation
    support_level: unsupported | weak | moderate | strong | mixed | refuted
    evidence_links: []
    path: claims/C001.md
    updated: YYYY-MM-DD
```

`evidence/index.yaml` follows the same compact lookup pattern.

```yaml
items:
  - id: E001
    title: Short evidence title
    status: active | historical | superseded | invalid
    evidence_kind: experiment | analysis | literature | math | code | human_judgment
    strength: strong | moderate | weak | inconclusive
    deliverable_use: yes | no | maybe
    claim_links: []
    source_work: W-YYYYMMDD-001
    source_resolution: work/closed/2026-05/W-YYYYMMDD-001/resolution.md
    path: evidence/E001.md
    updated: YYYY-MM-DD
```

Deliverable briefs should be lightweight but structured enough for status views.

```yaml
---
type: deliverable_brief
target: paper | technical_report | presentation | demo | poster | memo | blog | other
status: draft | active | ready | historical
updated: YYYY-MM-DD
lead_claims: []
evidence_links: []
---
```

The manager updates indexes when moving items between queue states or changing evidence state. Closed items stay indexed. Old closed entries may later be sharded or summarized if the index grows too large.

## Steering Routine

The manager should be able to answer `what next?` from durable state. The routine reads `state/current.md`, queue indexes, reported work, reported reviews, evidence, claims, and recent project decisions.

The manager then resolves pending reports, updates evidence, claims, and current state, identifies blockers or bottlenecks, and recommends the next one to three moves. A move may be a work packet, review packet, evidence read, claim audit, experiment decision, writing pass, or user question.

## Initialization

The packaged init helper should ask only what is needed to create the project-local control plane:

1. Where should `.atelier/` live: current repo or coordination folder?
2. What project name and id should be recorded?
3. Which mode should the project use: `scholar` or `builder`?
4. Which platform is the active manager?
5. Should a second-opinion critic be configured?
6. Should root agent entrypoints be created?

V0 init may create `.atelier/` in the current repo or in a coordination folder. It should not auto-discover or mutate multiple repos. Known code repos, paper repos, artifact roots, datasets, papers, baselines, internal docs, and compute platforms are registered later in `resources/index.md` or `ops/compute.md`.

V0 init should print suggested git tracking policy rather than editing `.gitignore` automatically. The default guidance should keep raw artifacts out of `.atelier/` and treat reports or logs with private paths carefully.

By default, init creates `.atelier/` only. Root files such as `AGENTS.md`, `CLAUDE.md`, and `GEMINI.md` require confirmation and should remain thin adapter pointers. Init must not overwrite existing root files.

After init, the manager should start with `skills/orient.md`. Init creates the control plane. Orient gathers the research-specific frame.

## Global Package Boundary

The global package is an installer and toolbox, not a runtime dependency.

It may provide:

- templates
- skill or plugin installation
- CLI helpers
- validators
- status commands
- packet creation helpers
- optional HTML renderers
- adapter setup

After init, a project should be usable from local files alone. This keeps the protocol portable to company laptops, restricted environments, and future agents.

V0 packages this as one shared filesystem skill at `packages/skills/atelier/`. Codex exposes the skill through `.codex-plugin/plugin.json`. Claude can use the same filesystem skill directly, with `.claude-plugin/marketplace.json` included for plugin-style setups.

## Adapter Boundary

The generic core defines state meaning, lifecycle, packets, reports, and authority.

Adapters define launch mechanics only.

- where entrypoint instructions are placed
- how a manager, worker, or critic session starts
- how a packet handoff starts
- how a submitted report is collected

Adapters may change execution mechanics. They may not redefine canonical state or research semantics.

V0 ships manual adapter guidance for Codex and Claude:

- `adapters/codex.md`
- `adapters/claude.md`

Root adapter entrypoints such as `AGENTS.md` and `CLAUDE.md` should remain thin pointers to `.atelier/ATELIER.md`.

## V0 Scope

V0 should deliver the protocol, templates, and manual workflow first.

In scope:

- project-local `.atelier/` skeleton
- `scholar` and `builder` mode definitions
- lifecycle and authority docs
- Markdown/frontmatter templates
- manual packet/report workflow
- unified work queue with separate review queue
- Codex and Claude adapter guidance

Post-v0:

- automatic cross-agent invocation
- strict schema validation
- HTML dashboards
- MCP or app integrations
- autonomous research loops
- richer CLI automation
