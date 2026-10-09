# Source Repo Read: Orchestra AI-research-SKILLs

Repository inspected:

- URL: `https://github.com/Orchestra-Research/AI-research-SKILLs`
- Local path: `references/AI-research-SKILLs`
- HEAD during inspection: `28f2d29236f2bade2eb92cadb2585189589a5828`

## Read

The repo is a large skills library for coding agents, especially Claude Code. It provides many domain-specific `SKILL.md` folders and an `autoresearch` orchestration skill.

Its intended workflow is:

```text
install skills -> load autoresearch -> bootstrap literature/hypotheses
-> run inner experiment loops -> synthesize in outer loops -> write paper
```

## Useful Ideas

- Treat research as a loop rather than a one-shot coding task.
- Keep state files such as `research-state.yaml`, `research-log.md`, and `findings.md`.
- Route domain-specific work to skills.
- Use progress reports and paper writing as part of the same lifecycle.

## Limits for Our Use

- The repo is LLM-heavy.
- The orchestration strategy is mostly single-agent skill routing, not explicit subagent packet workflows.
- Claude Code is the most first-class platform.
- Codex support is claimed through installer targets but less deeply integrated.
- Some repo metadata is stale or inconsistent with the actual 98 `SKILL.md` files.

## Design Takeaway

Use the repo as a reference, not as the full architecture. Our system should add:

- project-agnostic schemas
- project-local adapters
- manager-owned canonical state
- bounded subagent packets
- cross-platform second-opinion review
