# Atelier Publication Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Make Atelier the public project identity while keeping compatibility with existing research-agent installs and preparing the repository for publication review.

**Architecture:** Keep the current package layout for a scoped first pass, but introduce Atelier as the primary product, command, state directory, and user-facing copy. New projects initialize into `.atelier/`. Existing `.research-agent/` projects keep working through compatibility discovery and the `research-agent` command alias.

**Tech Stack:** Node.js ESM scripts, `node:test`, Markdown project templates, Codex and Claude adapter docs, git hygiene checks.

---

### Task 1: Protocol Naming Constants And Discovery

**Files:**
- Create: `packages/skills/atelier/scripts/protocol.mjs`
- Modify: `packages/skills/atelier/scripts/ui-snapshot.mjs`
- Test: `packages/skills/atelier/scripts/ui-snapshot.test.mjs`

- [x] Add a failing test that `findProjectStateRoot()` prefers `.atelier/` and still discovers `.research-agent/`.
- [x] Add `protocol.mjs` with `PROJECT_NAME`, `PRIMARY_STATE_DIR`, `LEGACY_STATE_DIR`, `ENTRYPOINT_FILE`, `PRIMARY_ENTRYPOINT`, `LEGACY_ENTRYPOINT`, and `findProjectStateRoot()`.
- [x] Replace `findResearchAgentRoot()` calls in the UI snapshot reader with `findProjectStateRoot()`.
- [x] Keep legacy snapshots working by accepting `.research-agent/`.
- [x] Run `npm test -- scripts/ui-snapshot.test.mjs`.

### Task 2: Init Creates Atelier Projects

**Files:**
- Modify: `packages/skills/atelier/scripts/init.mjs`
- Modify: `packages/skills/atelier/scripts/init-tui.mjs`
- Modify: `packages/skills/atelier/scripts/init.test.mjs`
- Modify: `packages/skills/atelier/scripts/cli.test.mjs`
- Modify: `packages/skills/atelier/assets/templates/atelier/RESEARCH_AGENT.md`
- Modify: `packages/skills/atelier/assets/templates/atelier/README.md`
- Modify: `packages/skills/atelier/assets/templates/adapters/AGENTS.pointer.md`
- Modify: `packages/skills/atelier/assets/templates/adapters/CLAUDE.pointer.md`

- [x] Add failing tests that `initProject()` creates `.atelier/`, writes `.atelier/ATELIER.md`, creates root pointers to `.atelier/ATELIER.md`, and refuses to initialize when either `.atelier/` or `.research-agent/` already exists.
- [x] Update init constants and summary/help text to say Atelier.
- [x] Copy the existing template tree into `.atelier/` and rename `RESEARCH_AGENT.md` to `ATELIER.md` after copy.
- [x] Treat existing `.atelier/ATELIER.md` and legacy `.research-agent/RESEARCH_AGENT.md` pointers as configured.
- [x] Update generated current state and research log prose to use Atelier.
- [x] Run `npm test -- scripts/init.test.mjs scripts/cli.test.mjs`.

### Task 3: Primary Atelier CLI Alias

**Files:**
- Create: `bin/atelier`
- Modify: `bin/research-agent`
- Modify: `packages/skills/atelier/scripts/cli.mjs`
- Modify: `packages/skills/atelier/scripts/ui.mjs`
- Modify: `packages/skills/atelier/package.json`
- Modify: `packages/skills/atelier/package-lock.json`
- Test: `packages/skills/atelier/scripts/cli.test.mjs`

- [x] Add failing tests that top-level help shows `atelier <command>`, `atelier init`, and `atelier ui`.
- [x] Add `bin/atelier` as the primary wrapper.
- [x] Keep `bin/research-agent` as a compatibility wrapper.
- [x] Update package metadata and CLI help/error text to Atelier while preserving command dispatch.
- [x] Run `npm test -- scripts/cli.test.mjs`.

### Task 4: Docs, Skills, And Manifests

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `.codex-plugin/plugin.json`
- Modify: `.claude-plugin/marketplace.json`
- Modify: `docs/install.md`
- Modify: `docs/system-blueprint.md`
- Modify: `docs/decision-log.md`
- Modify: `docs/open-questions.md`
- Modify: `adapters/codex.md`
- Modify: `adapters/claude.md`
- Modify: `packages/skills/atelier/SKILL.md`
- Modify: `packages/skills/atelier/references/init.md`
- Modify: `packages/skills/atelier/references/adapters/codex.md`
- Modify: `packages/skills/atelier/references/adapters/claude.md`
- Modify: root `skills/*.md`
- Modify: `packages/skills/atelier/assets/project-skills/*.md`

- [x] Make Atelier the public name in repository docs, package docs, adapter docs, and skill metadata.
- [x] Use `research-agent` only for compatibility notes, legacy aliases, historical eval labels, or generic category wording.
- [x] Update state paths in operational docs from `.research-agent/` to `.atelier/`.
- [x] Keep legacy migration language explicit where old projects are discussed.
- [x] Run targeted `rg` checks for stale user-facing references.

### Task 5: Publication Hygiene

**Files:**
- Modify: `.gitignore`
- Modify: publication docs as needed

- [x] Inspect untracked directories and confirm `node_modules`, generated PDFs, logs, and cache outputs are ignored or absent from tracked candidates.
- [x] Run `git status --short` and `git diff --stat`.
- [x] Run full package tests with `npm test` in `packages/skills/atelier`.
- [x] Run a publication scan for placeholders, credentials, local absolute paths, and personal identifiers across publish-candidate files.
- [x] Report any remaining blockers before staging or committing.
