# Project Dashboard UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the read-only one-project research-agent dashboard UI.

**Architecture:** Add a snapshot reader that turns `.research-agent/` Markdown and YAML into JSON. Add a no-build frontend that renders that snapshot. Add `research-agent ui` for a local live server and `research-agent ui build` for a static export.

**Tech Stack:** Node.js ESM, built-in `node:test`, `js-yaml`, plain HTML, CSS, and JavaScript.

---

### Task 1: Snapshot Reader

**Files:**
- Create: `packages/skills/atelier/scripts/ui-snapshot.mjs`
- Test: `packages/skills/atelier/scripts/ui-snapshot.test.mjs`

- [x] Write a failing test that creates a temporary `.research-agent/` tree with `project.yaml`, `state/current.md`, work items, evidence index entries, and explicit artifact links.
- [x] Run `npm test -- ui-snapshot.test.mjs` from `packages/skills/atelier` and confirm the test fails because the reader does not exist.
- [x] Implement the snapshot reader with project discovery, frontmatter parsing, section extraction, YAML index parsing, queue enrichment, explicit artifact extraction, and staleness hints.
- [x] Run the snapshot test and confirm it passes.

### Task 2: Static Frontend Assets

**Files:**
- Create: `packages/skills/atelier/assets/ui/index.html`
- Create: `packages/skills/atelier/assets/ui/styles.css`
- Create: `packages/skills/atelier/assets/ui/app.js`

- [x] Build the no-build frontend around the Operating Cockpit layout.
- [x] Render header, health strip, current focus, next moves, active and reported work, blockers, recent artifacts, and secondary tabs.
- [x] Support both live mode through `/snapshot.json` and static mode through `window.__RESEARCH_AGENT_SNAPSHOT__`.

### Task 3: UI Command

**Files:**
- Create: `packages/skills/atelier/scripts/ui.mjs`
- Modify: `packages/skills/atelier/scripts/cli.mjs`
- Modify: `packages/skills/atelier/package.json`
- Modify: `packages/skills/atelier/package-lock.json`
- Test: `packages/skills/atelier/scripts/cli.test.mjs`

- [x] Write a failing CLI test for `research-agent ui build --target <tmp> --out <file>`.
- [x] Run `npm test -- cli.test.mjs` and confirm the new test fails because `ui` is unknown.
- [x] Implement `ui build`, local asset loading, static HTML embedding, and CLI dispatch.
- [x] Implement `ui` live server with `/`, static asset routes, and `/snapshot.json`.
- [x] Add `js-yaml` to package dependencies.
- [x] Run the CLI test and confirm it passes.

### Task 4: Visual Verification

**Files:**
- Modify as needed based on browser findings.

- [x] Run the package test suite.
- [x] Generate or use a sample `.research-agent/` tree with enough active work, reported work, blockers, artifacts, claims, and evidence to exercise the layout.
- [x] Start `research-agent ui --target <sample> --port <port>`.
- [x] Open the local URL in the browser.
- [x] Inspect desktop and narrow viewports.
- [x] Adjust CSS or rendering when text overlaps, sections feel too sparse, important status is buried, or the first screen is visually noisy.
- [x] Re-run tests after adjustments.

### Self-Review Checklist

- [x] The UI remains read-only.
- [x] The dashboard handles one project only.
- [x] Artifacts come only from explicit protocol references.
- [x] Staleness hints are calculated without writing state.
- [x] Missing optional files degrade gracefully.
- [x] The frontend uses no build step.
- [x] Static export works without a server.
