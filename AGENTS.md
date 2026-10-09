# AGENTS.md

## Project Intent

This project designs a reusable Atelier architecture for AI-assisted research workflows across Codex, Claude, and project-specific repositories.

## Working Style

- Keep design and implementation separated. Do not scaffold code until the architecture is agreed.
- Prefer project-agnostic core abstractions with project-specific adapters.
- Treat Rational-Model + dcdm_nips_2026 as the first concrete benchmark, not as the whole product scope.
- Preserve cross-platform portability: avoid building core behavior around one platform's private UI feature.
- Use structured files as the canonical state layer.

## Writing Guidelines

- Follow the full project style guide in `docs/writing-style.md` for design docs and argumentative prose.
- Write concise design docs and avoid repeating the same point in multiple sections.
- Before writing, settle the logic flow. Know what problem the section answers, what decision it records, and how the section connects to the rest of the architecture.
- Do not use colons, semicolons, or em dashes as sentence connectors in narrative prose. Split or recast the sentence.
- Avoid standalone demonstratives and ambiguous pronouns. Name the referent.
- Cut throat-clearing, meta-commentary, filler transitions, empty intensifiers, and AI-tell vocabulary.
- Do not label results as important, interesting, surprising, or novel. Let the substance carry the judgment.
- Keep uncertainty consistent. Do not hedge in one sentence and overclaim in the next.
- Prefer prose for arguments. Use bullets only for genuinely parallel items.
- Structured formats, templates, schemas, checklists, and formal mathematical derivations may use the punctuation or inference markers their form requires.

## Design Priorities

- Evidence-first research loops.
- Honest math and explicit assumptions before experiments.
- Experiment protocols with clear falsification criteria.
- Manager-owned canonical state.
- Bounded subagent or second-opinion packets.
- Cross-platform review between Codex and Claude.

## Safety

- Do not delete local files permanently.
- If cleanup is needed, move files to a trash folder or ask first.

## Disposable Human Test Reset

When resetting the disposable `research-agent-human-test` workspace, keep the reset-isolation block in that folder's `AGENTS.md` persistent.

Prefer a soft reset. Keep `AGENTS.md`, `.research-agent/project.yaml`, `.research-agent/RESEARCH_AGENT.md`, `.research-agent/skills/`, and `.research-agent/templates/` in place. Reset only mutable research state and history, such as `.research-agent/state/current.md`, briefs, logs, resources, claims, evidence, work packets, review packets, and queue indexes.

Soft reset also includes quarantining prior Codex chat history for this workspace. Move matching `~/.codex/sessions/**/*.jsonl` files whose `cwd` or content references `research-agent-human-test` into the same Trash or quarantine folder, except for the currently active reset thread if it is still being written.

Move old mutable state and history to Trash or another quarantine folder rather than deleting them permanently. If a reset must recreate the whole folder, restore the `AGENTS.md` reset-isolation block before starting a new Codex chat there. The block should forbid reading, searching, citing, or inferring from `~/.codex/memories`, quarantined rollout summaries, previous Codex sessions, or prior `research-agent-human-test` chats.
