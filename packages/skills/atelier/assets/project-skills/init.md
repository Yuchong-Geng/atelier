---
name: init
description: Use when starting Atelier in a new project, creating `.atelier/`, recovering a missing control plane, or preparing a repo or coordination folder for Atelier use.
---

# Init

## Purpose

Create the project-local Atelier control plane.

Init creates `.atelier/` from the installed template tree, fills the stable manifest, copies skills, and leaves the project ready for `orient.md`.

Use `atelier init` when it is available. Manual copying is a fallback for unusual installations.

Init does not frame the research project, create claims, create evidence, launch work, or start experiments.

## Read First

- the current working directory
- the template source for the current installation
- the project-skill source for the current installation
- existing `.atelier/` if present
- existing agent instruction files such as `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md` if instruction updates are requested

## Source Map

When running from a source checkout, use:

- `templates/atelier/`
- `skills/*.md`
- `templates/adapters/`

When running from the installed skill package, use:

- `scripts/cli.mjs`
- `scripts/init.mjs`
- `assets/templates/atelier/`
- `assets/project-skills/*.md`
- `assets/templates/adapters/`

## Safety Rules

Never overwrite existing files silently.

If `.atelier/` already exists, inspect it and ask whether the user wants to stop, inspect status, or perform a careful update. Do not merge templates into an existing control plane without explicit confirmation.

Create only the selected `.atelier/` control plane and optional agent instructions. Do not auto-discover or mutate multiple repos.

Do not permanently delete files. Do not edit `.gitignore` automatically.

Agent instruction updates require explicit confirmation when an instruction file already exists. If the file already points to `.atelier/ATELIER.md`, treat it as configured. If it exists without Atelier instructions, offer a minimal appended block rather than replacing the file.

## Init Questions

Ask only for information that is missing after inspecting the folder. Prefer one concise question at a time.

Required decisions:

- target location. Current repo or coordination folder.
- active manager platform. Default to the platform running init when clear.
- project mode. `scholar` or `builder`.

Optional decisions:

- second-opinion critic. Whether enabled, and which platforms are available.
- known resources. Code repos, paper repos, artifact roots, papers, baseline repos, datasets, internal resources, and compute platforms.
- git tracking preference. Whether `.atelier/` should be tracked, partly ignored, or kept local.
- agent instructions. Whether to create or update instruction entrypoints such as `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`.

If the user requests quick init, still ask for project mode unless the surrounding request already makes the mode clear.

## Init Defaults

For "initialize here," use the current directory as the target.

Default the active manager to the current platform when clear.

Disable critics unless the user requests second opinions or names available critic platforms.

Default agent instructions to the active manager when the platform has a known instruction file. For Codex, use `AGENTS.md`. For Claude, use `CLAUDE.md`.

Do not edit `.gitignore`.

Derive `project.id` and `project.name` from the target folder when the user does not provide a name.

## Create The Control Plane

Preferred path:

```bash
atelier init
```

Run the command from the target folder or pass `--target <folder>`. The helper is interactive by default. Use flags only for automation or tests.

If the shell command is unavailable but the installed skill path is known, run:

```bash
node <installed-skill>/scripts/cli.mjs init
```

Fallback manual path:

1. Choose the target folder.
2. Create `.atelier/` under the target folder.
3. Copy the selected Atelier template tree into `.atelier/` without overwriting existing files. Legacy template trees may contain `RESEARCH_AGENT.md`. In that case, copy it as `ATELIER.md`.
4. Create empty queue directories if the package format did not preserve them.
5. Copy the selected project skills into `.atelier/skills/`.
6. Fill `.atelier/project.yaml`.
7. Register known resources in `.atelier/resources/index.md`.
8. Add compute platform names to `project.yaml` when provided. Put operating details in `.atelier/ops/compute.md`.
9. Create or update agent instruction entrypoints according to the selected manager and explicit user choices.
10. Print git and privacy guidance.
11. Recommend starting with `.atelier/skills/orient.md`.

Copying `init.md` into `.atelier/skills/` is acceptable for audit or future update. Operational project work begins with `orient.md`.

## Fill `project.yaml`

Use the current date for `created`.

Set:

- `project.id`
- `project.name`
- `project.mode`
- `manager.current_owner`
- `critics.enabled`
- `critics.platforms`
- `repos`
- `artifact_roots`
- `compute.platforms`
- `adapters.root_entrypoints`

Do not add `default_owner`.

Keep live compute status, host load, queue state, run health, and job IDs out of `project.yaml`.

## Agent Instruction Shape

Use a short block when creating or appending agent instructions.

Prefer the pointer snippets from the selected adapter template source when available.

```markdown
## Atelier

This project uses `.atelier/` as canonical Atelier state.

Read `.atelier/ATELIER.md` before acting as manager, worker, or critic.
```

If the root file has existing instructions, preserve them.

## Git And Privacy Guidance

After setup, print guidance rather than editing ignore rules.

Mention:

- raw artifacts should stay in their natural output roots, not inside `.atelier/`
- reports and logs may include private paths, internal resource names, or unpublished results
- public repos may need a narrower tracking policy
- private projects can usually track `.atelier/` except large artifacts and sensitive material

## Completion Output

Report:

- `.atelier/` location
- manager owner
- project mode
- second-opinion status
- registered resources
- agent instructions created, already configured, updated, or skipped
- git and privacy guidance
- next recommended step

The next recommended step is to run orient through `.atelier/skills/orient.md`.

## Do Not

- Do not launch experiments.
- Do not create claims or evidence.
- Do not fill the full project brief beyond obvious initialization notes.
- Do not overwrite existing agent instructions.
- Do not assume every supported platform needs an agent instruction file.
- Do not hide uncertainty about project mode, manager owner, or tracking policy.
- Do not hand-copy template files when the CLI or packaged init helper is available.
