# Install

Atelier v0 installs as a filesystem skill. The project-local `.atelier/` folder remains the source of truth after initialization.

## Clone

Clone the repo first.

```bash
git clone https://github.com/Yuchong-Geng/atelier.git
cd atelier
```

Install the shell command by symlinking the repo wrapper into a directory on `PATH`.

```bash
npm install --prefix packages/skills/atelier
ln -sfn "$PWD/bin/atelier" /opt/homebrew/bin/atelier
atelier --help
```

The `npm install` step enables the richer interactive terminal wizard for `atelier init`. If the dependency is unavailable, the helper falls back to a plain prompt flow.

Use `atelier` for new installs and scripts. `research-agent` remains only as a legacy command alias for existing local setups.

## Codex

Use the repo root as a local Codex plugin. The root `.codex-plugin/plugin.json` points Codex to `packages/skills/`.

The installed skill is:

```text
packages/skills/atelier/
```

If using direct skill installation instead of plugin installation, copy that folder into the local Codex skills directory as `atelier`.

## Claude

Claude Code can use the same filesystem skill:

```text
packages/skills/atelier/
```

Install it by copying that folder into the Claude skills location used by the target environment, such as a project or user `.claude/skills/atelier/` directory.

The repo also includes `.claude-plugin/marketplace.json`, modeled after the reference AI research skills repo, for plugin-style Claude setups that support that manifest.

## After Install

In a target research project, ask:

```text
Initialize Atelier here.
```

The installed skill should run the packaged helper and create:

```text
.atelier/
```

It may also create or offer to update thin agent instruction files such as `AGENTS.md` or `CLAUDE.md`.

You can also run the helper directly from the target folder:

```bash
atelier init
```

## Manual Fallback

Without global install, point the agent at this repo and ask it to use:

```text
packages/skills/atelier/SKILL.md
```

Then run:

```text
packages/skills/atelier/scripts/cli.mjs init
```

If the helper is unavailable, initialize the target project from:

```text
packages/skills/atelier/assets/templates/atelier/
packages/skills/atelier/assets/project-skills/
packages/skills/atelier/assets/templates/adapters/
```
