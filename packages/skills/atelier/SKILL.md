---
name: atelier
description: Use when initializing or operating a reusable file-backed Atelier workflow, creating `.atelier/`, managing research work packets, evidence, claims, reviews, or cross-platform second opinions.
---

# Atelier

## Purpose

Atelier provides a project-local control plane for AI-assisted research across Codex, Claude, and other agents.

Use this skill when the user asks to initialize Atelier, continue an Atelier project, inspect research state, create packets, request second opinion, or manage claims, evidence, reviews, and deliverables.

## First Check

If the current project already has `.atelier/`, read:

- `.atelier/ATELIER.md`
- `.atelier/project.yaml`
- `.atelier/state/current.md`

Then follow the project-local instructions and skills.

If the current project does not have `.atelier/`, use `references/init.md` to initialize it.

## Packaged Resources

- `references/init.md`: setup workflow for creating `.atelier/`.
- `references/adapters/codex.md`: Codex handoff guidance.
- `references/adapters/claude.md`: Claude handoff guidance.
- `scripts/cli.mjs`: command dispatcher for `atelier`.
- `scripts/init.mjs`: deterministic interactive init helper.
- `assets/templates/atelier/`: files to copy into a new `.atelier/` tree.
- `assets/templates/adapters/`: optional agent instruction snippets.
- `assets/project-skills/`: skills to copy into `.atelier/skills/`.

## Init Rule

When initializing, prefer the formal CLI command `atelier init`. It creates the target `.atelier/` directory, copies the packaged templates and project skills, fills the manifest, and can create manager-selected agent instructions such as `AGENTS.md` or `CLAUDE.md`.

If the shell command is unavailable, run `node <installed-skill>/scripts/cli.mjs init`. If the helper is unavailable, copy `assets/templates/atelier/` into the target `.atelier/` directory and copy `assets/project-skills/*.md` into `.atelier/skills/`.

Do not overwrite existing project files silently. Do not edit root `AGENTS.md` or `CLAUDE.md` without explicit confirmation.

After init, start with `.atelier/skills/orient.md`.

## Operating Rule

Once `.atelier/` exists, project-local files are canonical. Platform memory, chat history, and this global skill are helpers only.

Use the manager, worker, critic, packet, report, resolution, evidence, and claim rules from `.atelier/ATELIER.md`.

## Do Not

- Do not treat the global package as project memory.
- Do not bypass `.atelier/` state.
- Do not paste full chat history into review packets.
- Do not let workers or critics update canonical state unless a packet explicitly grants that authority.
