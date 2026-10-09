# Init Terminal UI Design

## Decision

`research-agent init` should gain a richer terminal wizard for interactive use. The wizard should keep the current file-generation contract intact. `initProject()` remains the single write path, while the terminal UI collects choices, previews the planned changes, and calls `initProject()` only after explicit confirmation.

Automation stays stable. Existing flags and `--yes` keep their current behavior for agents, tests, and scripted installs.

## Problem

The current helper uses plain readline prompts. The prompt flow works, but the user has to remember how choices relate to the generated project state. Existing instruction files also need clearer treatment before any append happens. Init is a first-contact experience for the protocol, so the interactive path should make state choices visible without changing the protocol model.

## Scope

The first richer UI covers only initialization. The wizard should ask for target folder, project name, project id, project mode, active manager, critic platforms, and root agent instructions. Known resources, compute details, and git tracking remain guidance or later orientation work unless a later design expands init.

The wizard should not launch orientation, create claims, create evidence, edit ignore rules, or infer multiple repositories.

## Architecture

The implementation should split input collection from project creation.

`initProject()` keeps responsibility for creating `.research-agent/`, copying templates, copying project skills, rendering `project.yaml`, writing current state, writing the research log, and creating or appending root instruction files.

A new terminal UI layer should own interactive questions. The layer should return the same options object that `initProject()` already accepts. A separate module such as `init-tui.mjs` is acceptable if the UI code would make `init.mjs` hard to scan.

The CLI dispatcher should route to the wizard only when stdin is a TTY and `--yes` is absent. Noninteractive invocations should keep the current parser and defaults.

## User Flow

The wizard should use a sectioned flow.

1. Target and project identity.
2. Project mode.
3. Manager platform.
4. Critic platforms.
5. Root agent instructions.
6. Final preview and confirmation.

Text fields should allow editing the target folder, project name, and project id. Single-choice prompts should handle `scholar` and `builder` mode. The manager prompt should offer common platforms while still allowing a custom platform value when needed. Critic and instruction prompts should support multiple choices.

The final preview should show the target `.research-agent/` path, the selected mode, the manager, enabled critics, requested root instruction files, existing instruction files already configured, existing instruction files needing append approval, and files skipped. The preview should let the user return to an earlier section before confirming. No local files should be written before the final confirmation.

## Dependency

Use `@inquirer/prompts` for the interactive wizard. The package provides terminal-native selection, multi-select, text input, and confirmation prompts without raw terminal control code. The dependency should be local to the package surface that runs the CLI.

If the dependency is unavailable at runtime, the CLI should fall back to the current readline prompt flow rather than failing before init can run. The fallback keeps source checkouts usable while package metadata catches up.

## Existing File Handling

The wizard should inspect selected root instruction files before preview. If an instruction file already contains `.research-agent/RESEARCH_AGENT.md`, the preview should mark the file as already configured.

If an instruction file exists without the pointer, the wizard should ask whether to append the standard Research Agent block. A declined append should become a skip. An accepted append should be passed through `appendAgentInstructions`, preserving the existing file body.

The wizard should refuse to proceed when `.research-agent/` already exists, matching the current safety behavior. A later update mode can be designed separately.

## Error Handling

Validation should happen before the final confirmation when possible. Invalid modes should be blocked in the picker. Empty manager values should be rejected in the prompt. Empty project ids should fall back to the slugified project name.

Filesystem errors should still come from `initProject()`. The summary should remain simple and should report the same created, configured, updated, and skipped categories as the current helper.

## Testing

Keep the current noninteractive tests for argument parsing and `initProject()` behavior. Add focused tests for the wizard boundary by mocking prompt answers and checking the resulting options object. The tests should cover the richer instruction-file cases, including already configured files, append approval, append decline, and no instruction files.

A smoke test should still run `research-agent init --yes --target <tmp>` and verify that the generated `.research-agent/` tree contains `project.yaml`, `state/current.md`, copied skills, and the expected root pointer behavior.

## Acceptance Criteria

Interactive `research-agent init` presents a sectioned terminal wizard when run in a TTY.

`research-agent init --yes` and flag-driven automation behave as before.

The richer wizard writes no files before final confirmation.

Existing root instruction files are never overwritten.

The generated `.research-agent/` tree matches the current init contract.
