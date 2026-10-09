# Codex Adapter

## Purpose

This adapter explains how Codex joins an Atelier project.

Codex launch mechanics may change. The stable contract is the project-local `.atelier/` protocol.

## Root Entrypoint

Use `AGENTS.md` as the Codex-facing agent instruction file when the project owner wants one.

The root file should stay thin. It should point Codex to `.atelier/ATELIER.md` rather than duplicating the protocol.

## Manager Boot

When Codex starts in an Atelier project:

1. Read `.atelier/ATELIER.md`.
2. Read `.atelier/project.yaml`.
3. Read `.atelier/state/current.md`.
4. If `manager.current_owner` is `codex`, act as manager.
5. If `manager.current_owner` is another platform, ask before taking manager authority.

If Codex is asked to initialize a project, use `skills/init.md` from the installed package or source repo.

## Confirmation Mechanics

When a project skill requires explicit user confirmation, use Codex's native structured-choice or user-input UI when the current surface exposes one. Otherwise ask a plain-text question and end the turn.

For material canonical updates, ask a direct write question. Do not use "I will update unless you object." Do not treat discussion approval as write approval.

## Worker Launch

Codex may run a worker as a background subagent, a new Codex session, or a manual handoff. The adapter choice does not change the packet contract.

The worker prompt should include:

```text
Read .atelier/ATELIER.md.
Then read <work-packet-path>.
Act as a bounded worker.
Stay inside the packet scope.
Write report.md in the work item directory.
Do not update canonical state.
Stop after the report.
```

For long-running, external, costly, operationally stateful, or hard-to-recover work, tell the worker to create or update `progress.md`.

## Critic Launch

Codex may run a critic as a background subagent, a new Codex session, or a manual handoff.

The critic prompt should include:

```text
Read .atelier/ATELIER.md.
Then read <review-packet-path>.
Act as a bounded critic.
Review only the target and context in the packet.
Write report.md in the review item directory.
Do not fix issues.
Do not update canonical state.
Stop after the report.
```

## Second Opinion To Claude

Use `skills/second_opinion.md` to create a review packet under `.atelier/reviews/pending/`.

Then hand Claude this prompt:

```text
This project uses Atelier state under .atelier/.

Read .atelier/ATELIER.md.
Then read <review-packet-path>.
Act as a bounded critic, not manager.
Write report.md in the review item directory.
Do not edit code, claims, evidence, briefs, queue indexes, or state.
Stop after the report.
```

After Claude writes `report.md`, Codex as manager should move or mark the review as reported, update `reviews/index.yaml`, and resolve it with `skills/resolve_report.md`.

## Effort Mapping

Use packet `effort` as launch guidance.

- `low`: routine work or review.
- `medium`: default reasoning depth.
- `high`: central claims, blocking reviews, difficult math, core implementation, or expensive decisions.

If Codex exposes model or reasoning controls, map effort to the closest available setting. If the control surface is unavailable or unclear, preserve the requested effort in the launch prompt.

## Manager Handoff

When Codex takes manager authority from another platform:

1. Ask the user before changing ownership unless the user already requested the handoff.
2. Update `manager.current_owner` in `.atelier/project.yaml`.
3. Record a short note in `.atelier/logs/research-log.md` when the handoff matters for recovery.

Do not record routine platform handoff in `logs/decisions.md` unless the platform choice changes project policy.

## Report Collection

When a worker or critic returns:

1. Read the item packet.
2. Read `report.md`.
3. Read `progress.md` if present.
4. Update the relevant queue index.
5. Use `skills/resolve_report.md`.

Reports are worker or critic outputs. The manager's accepted interpretation belongs in `resolution.md`.

## Do Not

- Do not redefine Atelier state semantics in Codex-specific instructions.
- Do not make Codex-specific subagent features required for project portability.
- Do not paste full chat history into review packets.
- Do not let a Codex worker or critic update canonical state unless the packet explicitly grants that authority.
