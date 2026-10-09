# Decision Log

## 2026-05-09

### D001: Build a reusable Atelier architecture

The project should not be limited to Rational-Model. Rational-Model + dcdm_nips_2026 will serve as the concrete benchmark for real workflow complexity.

### D002: Use a global package plus project-local setup

The system should install globally into Codex/Claude, then initialize per project with `.atelier/` state and adapters.

### D003: Preserve structured project state on disk

Project state should not live primarily in chat history. The durable layer should be files, including manifests, claims, work packets, evidence records, paper bridges, and review packets.

### D004: Manager owns canonical state

The manager coordinates the research loop, owns canonical state, and decides what becomes canonical. Subagents and second-opinion reviewers return bounded reports or proposed edits.

### D005: Support Codex and Claude from the start

Cross-platform support is a core requirement. The design should allow Codex to ask Claude for a second opinion and Claude to ask Codex for the same.

### D006: Use packet-based cross-platform review

Second-opinion workflows should pass bounded review packets through project-local files rather than relying on full chat context or uncontrolled repo-wide review.

### D007: Treat Orchestra AI-research-SKILLs as reference material

The Orchestra repo is useful as a skill-pack and orchestration reference, but its strategy is mostly single-agent skill routing. This project should add explicit packet-based subagent and cross-platform review support.

### D008: Make the core agent-agnostic

The core protocol should live in project-local files and not depend on Codex, Claude, Gemini, or any one agent runtime. Platform-specific adapters may change execution mechanics, but not canonical state semantics.

### D009: Use one active manager with bounded workers and critics

Each project has one active manager that owns canonical state. Workers and critics process bounded packets and return reports. The manager records decisions and updates state.

### D010: Use `scholar` and `builder` as v0 modes

`scholar` is for publishable or reviewer-facing research. `builder` is for applied, internship, or stakeholder-facing work. Modes change decision thresholds and emphasis, not the lifecycle or file semantics.

### D011: Keep project state under `.atelier/`

Atelier artifacts should not be mixed into project code. Project state, logs, briefs, claims, work, evidence, and reviews live under `.atelier/`. Root agent files are optional thin adapters.

### D012: Prefer Markdown with small frontmatter

Human-facing reasoning belongs in Markdown. Small YAML frontmatter may hold IDs, status, labels, and links. Standalone YAML should be limited to config and indexes.

### D013: Treat the global package as a toolbox, not a runtime dependency

The global package may provide templates, skills, CLI helpers, validators, and renderers. After initialization, a project should remain usable from local `.atelier/` files alone.

### D014: Use one work queue and one review queue

The project should use `.atelier/work/` as the unified queue for experiment, implementation, literature, math, ops, writing, and analysis work. Work orders carry `kind`. `kind: experiment` marks work whose expected output is evidence about a research question, claim, method, metric, model, dataset, or baseline. Other work kinds support research without directly creating evidence.

`.atelier/reviews/` stays separate as the cross-platform criticism gateway. Work and review queues use pending, active, reported, and closed states. Closed items are sharded by date. Each queue has `index.yaml` for compact lookup, and each item directory preserves `packet.md` for intent and `report.md` for result.

## 2026-05-10

### D015: Store per-item manager resolutions inside item directories

Per-item manager interpretation belongs in `resolution.md` inside the work or review item directory. `report.md` is the worker or critic output. `resolution.md` is the manager interpretation.

Resolution decisions use the small set `accepted`, `partially_accepted`, `rejected`, `invalid`, and `superseded`. Review resolutions may accept or reject findings by finding ID.

`logs/decisions.md` remains for larger project-level decisions only.

### D016: Use intent-first interaction as the primary interface

The user should speak in research intent. The manager translates that intent into protocol actions such as work packets, review packets, evidence updates, claim revisions, state updates, and project-level decisions.

Commands are shortcuts for repeatable actions. Commands are not the primary mental model.

### D017: Add a manager steering routine

The manager should be able to answer `what next?` by reading durable state, resolving reported work and reviews, updating evidence, claims, and current state, identifying bottlenecks, and recommending the next one to three moves.

### D018: Treat `current_owner` as a soft semaphore

`manager.current_owner` marks which platform currently owns canonical manager state. It is a coordination signal, not a security lock. A non-owner platform should ask before taking manager authority.

Routine platform handoff is operational history, not a project decision. Record handoff in `logs/research-log.md` only when useful. Use `logs/decisions.md` only when platform choice changes project policy.

### D019: Use approval policy as the permission gate

Work packets should use `approval_policy` rather than separate sensitivity labels. The v0 values are `autonomous`, `manager_review`, `human_design_gate`, and `human_run_gate`.

`human_design_gate` requires manager-user design discussion before implementation. `human_run_gate` requires user approval before expensive, external, destructive, or public action.

### D020: Define bounded worker and critic contracts

Workers execute one work packet and write `report.md`. Critics review one review packet and write `report.md`. Neither role updates canonical state by default.

Workers should escalate through `needs_context`, `blocked`, `failed`, or `completed_with_concerns` instead of guessing. Critics produce grounded findings and do not fix issues. The manager resolves work reports and review findings in `resolution.md`.

### D021: Keep review modes minimal

Review packets should use `review_mode: standard` or `review_mode: adversarial`. Review type carries the target class, such as claim, evidence, experiment design, math, code, paper, or steering.

Second opinion means a fresh bounded critic pass. A different platform is preferred when available, but same-platform review is valid.

### D022: Use selective review triggers

The manager should create reviews selectively rather than running blanket scheduled review. Default triggers include deliverable-ready claims, blocking experiment designs, core implementation reports, evidence that contradicts an active claim, major steering pivots, and paper-facing strong claims.

Routine plotting, status updates, exploratory scratch results, and non-blocking summaries do not need automatic review by default.

### D023: Use constructive dissent and proven workflow patterns

The manager should act as a trusted research advisor rather than a compliant executor. It should offer second opinions and pushback when useful, especially when validity, evidence, complexity, claim scope, or cost materially affects the research path.

Atelier should borrow proven workflow patterns from Superpowers where those patterns fit, including design gates, bounded subagents, escalation instead of guessing, self-review, and verification. Superpowers remains an execution discipline, not the canonical research state layer.

### D024: Use Atelier skills rather than rigid phase files

Lifecycle guidance should live under `.atelier/skills/`. These files are reusable Atelier skills. The manager loads skills by user intent, current state, active bottleneck, or reported evidence.

`state/current.md` may record a prose Current Focus, but Current Focus is a dominant lens rather than a lock. New projects start with `skills/orient.md`.

### D025: Keep manager as the canonical role name

The canonical role name remains manager. Orchestration is one responsibility of the manager, not the whole role. The manager also acts as advisor, evidence judge, claim steward, state owner, and translator from research intent into protocol actions.

## 2026-05-11

### D026: Settle the `ATELIER.md` template contract

`.atelier/ATELIER.md` is the project-local and agent-agnostic entrypoint for agents joining the research loop. `.atelier/` files are canonical. Platform memory, agent memory, chat history, and model recall are hints only.

`manager.current_owner` identifies the active manager. The manager owns canonical state, current focus, work and review queues, claims, evidence, resolutions, and user communication.

Workers and critics operate from bounded packets, write `report.md`, and stop. Workers create or update `progress.md` when the work becomes long-running, external, costly, operationally stateful, or hard to recover from chat alone. Workers and critics do not update canonical state by default. The durable loop is `packet.md -> optional progress.md -> report.md -> resolution.md -> canonical update`.

### D027: Use `state/current.md` as the compact live dashboard

`state/current.md` is the canonical live snapshot for manager session recovery. It is a compact dashboard, not a database or mirror of claims, evidence, work, reviews, briefs, or logs.

V0 has no hand-maintained `current.yaml`. Generated views may come later. The Markdown file remains the v0 source of truth.

The file uses minimal frontmatter with `type: current_state` and `updated: YYYY-MM-DD`. Current Focus is prose, not an `active_focus` field.

Working Position holds live research questions, tentative reads, and unresolved assumptions that currently shape the project. V0 has no separate `questions/` artifact. Queue Snapshot includes only active, reported, blocking, or otherwise decision-relevant work and reviews.

### D028: Use three-level work priority

Work priority uses `low`, `medium`, and `high`. V0 does not use `urgent`.

`high` covers work that blocks a claim, deliverable, decision, expensive run, or near-term presentation. Time-sensitive deadlines belong in the packet body rather than a fourth priority label.

### D029: Settle the packet, progress, report, and resolution layers

Work packets stay at the intent layer. Their frontmatter includes `type`, `id`, `title`, `status`, `kind`, `priority`, `effort`, `approval_policy`, `owner`, `compute_kind`, `created`, and `updated`.

`progress.md` is optional but expected for long-running, external, costly, operationally stateful, or hard-to-recover work. It records volatile execution state such as run status, ETA, host, session, job ID, logs, artifacts, blockers, retry notes, cost notes, quota notes, and sync notes. The manager may use it for recovery and monitoring, but not as accepted evidence or claim interpretation.

Reports use one shared base shape for workers and critics. Reports may suggest follow-up, evidence, claim edits, or review needs, but do not canonize those suggestions.

Resolutions use one shared base shape for work and reviews. Only the manager writes `resolution.md`. The resolution records the accepted manager interpretation and any canonical update.

### D030: Keep review packets compact and context-bounded

Review packets use frontmatter for `type`, `id`, `title`, `status`, `review_type`, `review_mode`, `target`, `effort`, `blocking`, `owner`, `created`, and `updated`.

The body uses Review Objective, Target, Context, Questions To Answer, and Required Report. Context is the bounded review context and may include both background and concrete materials. Review is read-only by default, so v0 does not include separate allowed-action, forbidden-action, allowed-context, or forbidden-context fields.

### D031: Use lightweight evidence records with deliverable filtering

Evidence records are accepted manager reads of concrete results or artifacts. They are not raw artifact dumps and not unreviewed worker interpretations.

Evidence frontmatter includes `type`, `id`, `title`, `status`, `evidence_kind`, `strength`, `deliverable_use`, `claim_links`, `source_work`, `source_report`, `source_artifacts`, `created`, and `updated`.

`deliverable_use` uses `yes`, `no`, or `maybe` for coarse filtering. V0 does not include `deliverable_targets`.

### D032: Keep claim lifecycle separate from support strength

Claims use frontmatter for `type`, `id`, `title`, `status`, `claim_kind`, `support_level`, `evidence_links`, `created`, and `updated`.

Claim status uses `draft`, `active`, `deliverable_ready`, `historical`, `superseded`, and `refuted`. It answers where the claim is in the lifecycle. Support level uses `unsupported`, `weak`, `moderate`, `strong`, `mixed`, and `refuted`. It answers how strong the current evidence is.

Claims do not use `deliverable_use` frontmatter. `deliverable_ready` covers whether the claim can be used in a paper, report, demo, presentation, or decision.

### D033: Keep queue indexes as lookup aids

`work/index.yaml` and `reviews/index.yaml` duplicate only routing fields needed for status views and recovery. Item folders remain the source of truth.

If an index and item file disagree, item files win. The manager updates indexes when moving items between queue states. Closed items stay indexed, with later sharding or summarization allowed if the index grows too large.

### D034: Keep init minimal and non-invasive

`research init` creates the project-local control plane. It may create `.atelier/` in the current repo or a coordination folder, but v0 should not auto-discover or mutate multiple repos.

Known repos, artifacts, datasets, papers, baselines, internal docs, and compute platforms are registered in project files. V0 init prints suggested git tracking policy rather than editing `.gitignore` automatically.

Init never overwrites root adapter files such as `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`. It may offer to create or append thin pointers only after explicit confirmation.

After init, the manager starts with `skills/orient.md`.

### D035: Keep `project.yaml` as a stable manifest

Init creates `project.yaml` as the stable project manifest. It records project identity, mode, active manager, critic availability, resource index path, repos, artifact roots, compute platform registry, and root adapter entrypoints.

`project.yaml` does not include `default_owner`. Detailed compute procedures, live status, host load, current run health, and queue state belong outside the manifest.

### D036: Implement init with a deterministic helper

V0 should use `atelier init` as the primary setup path, backed by a packaged helper. A user can ask an agent to initialize Atelier in a repo or coordination folder, and the agent runs the helper to create `.atelier/`, copy templates and skills, fill `project.yaml`, and create or offer to update agent instruction files.

`skills/init.md` remains the agent-facing guidance. Manual copying is a fallback for unusual installations where the CLI and helper are unavailable.

### D037: Ship manual Codex and Claude adapters first

V0 adapter support should be documentation-first. `adapters/codex.md` and `adapters/claude.md` define manager boot, worker launch, critic launch, second-opinion handoff, effort mapping, manager handoff, and report collection.

Root files such as `AGENTS.md` and `CLAUDE.md` are optional thin pointers. The shared contract remains `.atelier/ATELIER.md`.

Automatic cross-agent invocation can come later. Manual packet handoff is enough for v0.

### D038: Package one shared global skill for Codex and Claude

Global support should start with one installable `atelier` skill. The global skill contains setup instructions, templates, project-local skills, and adapter references.

Codex support uses a root `.codex-plugin/plugin.json` that points to `packages/skills/`. Claude support uses the same filesystem skill at `packages/skills/atelier/`, with `.claude-plugin/marketplace.json` added for plugin-style setups.

The global package is still a bootstrapper and toolbox. After init, project-local `.atelier/` files remain canonical.
