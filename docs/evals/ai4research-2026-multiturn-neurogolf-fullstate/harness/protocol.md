# Protocol

## Shared Starting Prompt

Use `harness/prompt.md` as the frozen user prompt and simulated user replies.

## Baseline Condition

The baseline receives the starting prompt, then the three simulated user replies. It writes exactly:

- `runs/baseline/transcript.md`
- `runs/baseline/final-plan.md`

The baseline must not create `.research-agent/` state.

## Research-Agent Condition

The research-agent manager operates inside:

`runs/research-agent/target-project/.research-agent/`

The manager starts from the initialized template state and must update at least:

- `project.yaml`
- `state/current.md`
- `briefs/project.md`
- one work packet
- one work report, after the harness launches the worker
- one work resolution
- one review packet
- one review report, after the harness launches the critic
- one review resolution
- `briefs/deliverable.md`

The manager may update indexes and logs as needed.

The harness launches worker and critic agents from manager-created packets. Worker and critic agents must write only their assigned report file and must not edit manager-owned state.

## Scoring

Use the same 20-point rubric as the prior multi-turn run, with the following recoverability requirement:

Full recoverability requires real `.research-agent/` canonical state. Prose-only final plans cannot receive full recoverability credit.

## Reporting

The digest should report whether the full-state protocol produces stronger evidence than the earlier lightweight simulation.
