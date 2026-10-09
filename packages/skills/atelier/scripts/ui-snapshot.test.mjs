import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { findProjectStateRoot } from "./protocol.mjs";
import { loadProjectSnapshot } from "./ui-snapshot.mjs";

function makeTempProject() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "atelier-ui-"));
}

function writeFile(filePath, text) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, text);
}

function touchOld(filePath, isoTime) {
  const date = new Date(isoTime);
  fs.utimesSync(filePath, date, date);
}

function makeProjectFixture() {
  const projectDir = makeTempProject();
  const root = path.join(projectDir, ".research-agent");

  writeFile(path.join(root, "project.yaml"), `project:
  id: visual-pib
  name: Visual PIB
  mode: scholar
  created: 2026-05-01

manager:
  current_owner: codex

critics:
  enabled: true
  platforms:
    - claude

resources:
  index: resources/index.md

repos:
  - /tmp/visual-pib

artifact_roots:
  - outputs

compute:
  platforms:
    - aws-ts

adapters:
  root_entrypoints:
    - AGENTS.md
`);

  writeFile(path.join(root, "state/current.md"), `---
type: current_state
updated: 2026-05-15
---

# Current State

## Current Focus

Validate the dashboard contract against packet artifacts.

## Snapshot

The project is testing whether the protocol can expose concise status.

## Working Position

The manager expects a compact cockpit view, not a full file dump.

## Queue Snapshot

W-20260515-001 is running. W-20260514-002 is reported.

## Blockers And Risks

One reported item needs manager resolution.

## Next Moves

1. Resolve W-20260514-002.
2. Inspect active run artifacts.

## Recent Updates

2026-05-15: Added dashboard UI fixture.
`);

  writeFile(path.join(root, "briefs/project.md"), `# Project Brief

## Problem And Landscape

The project needs a readable research status view.

## Proposed Direction

Render a cockpit from canonical state.
`);

  writeFile(path.join(root, "work/index.yaml"), `items:
  - id: W-20260515-001
    title: Active visual run
    status: active
    kind: experiment
    priority: high
    owner: codex
    path: work/active/W-20260515-001
    updated: 2026-05-12
  - id: W-20260514-002
    title: Reported artifact review
    status: reported
    kind: analysis
    priority: medium
    owner: claude
    path: work/reported/W-20260514-002
    updated: 2026-05-13
  - id: W-20260510-003
    title: Closed baseline check
    status: closed
    kind: analysis
    priority: low
    owner: codex
    path: work/closed/2026-05/W-20260510-003
    updated: 2026-05-15
`);

  writeFile(path.join(root, "work/active/W-20260515-001/packet.md"), `---
type: work_packet
id: W-20260515-001
title: Active visual run
status: active
kind: experiment
priority: high
owner: codex
updated: 2026-05-12
---

# Active visual run
`);
  writeFile(path.join(root, "work/active/W-20260515-001/progress.md"), `---
type: work_progress
updated: 2026-05-10 09:00
run_status: running
eta: unknown
---

# Progress

## Current State

The run is still active.

## External Handles

- outputs/runs/active-log.txt
`);

  writeFile(path.join(root, "work/reported/W-20260514-002/packet.md"), `---
type: work_packet
id: W-20260514-002
title: Reported artifact review
status: reported
kind: analysis
priority: medium
owner: claude
updated: 2026-05-13
---

# Reported artifact review
`);
  writeFile(path.join(root, "work/reported/W-20260514-002/report.md"), `---
type: work_report
id: W-20260514-002
title: Reported artifact review
outcome: completed_with_concerns
reported: 2026-05-13
reported_by: claude
---

# Report

## Summary

The report found one useful artifact.

## Artifacts And Pointers

- outputs/figures/report-plot.png
- logs/report.log
- .atelier/skills/orient.md
- .research-agent/skills/orient.md
`);

  writeFile(path.join(root, "work/closed/2026-05/W-20260510-003/packet.md"), `---
type: work_packet
id: W-20260510-003
title: Closed baseline check
status: closed
kind: analysis
priority: low
owner: codex
updated: 2026-05-10
---

# Closed baseline check
`);
  writeFile(path.join(root, "work/closed/2026-05/W-20260510-003/report.md"), `---
type: work_report
id: W-20260510-003
title: Closed baseline check
outcome: completed
reported: 2026-05-10
reported_by: codex
---

# Report

## Artifacts And Pointers

- outputs/baseline/table.csv
`);
  writeFile(path.join(root, "work/closed/2026-05/W-20260510-003/resolution.md"), `---
type: resolution
id: W-20260510-003
updated: 2026-05-11
---

# Resolution

## Accepted Artifacts

- outputs/baseline/accepted-summary.md
`);

  writeFile(path.join(root, "evidence/index.yaml"), `items:
  - id: E001
    title: Dashboard evidence
    status: active
    evidence_kind: experiment
    strength: weak
    deliverable_use: maybe
    claim_links:
      - C001
    source_work: W-20260514-002
    path: evidence/E001.md
    updated: 2026-05-15
`);
  writeFile(path.join(root, "evidence/E001.md"), `---
type: evidence
id: E001
title: Dashboard evidence
status: active
strength: weak
source_artifacts:
  - outputs/evidence/e001.json
updated: 2026-05-15
---

# E001

## Source

- outputs/evidence/e001-extra.png
`);

  writeFile(path.join(root, "claims/index.yaml"), `items:
  - id: C001
    title: Dashboard is useful
    status: active
    claim_kind: method
    support_level: weak
    evidence_links:
      - E001
    path: claims/C001.md
    updated: 2026-05-15
`);

  writeFile(path.join(root, "reviews/index.yaml"), `items:
  - id: R-20260515-001
    title: Review cockpit density
    status: pending
    review_type: steering
    blocking: false
    owner: claude
    path: reviews/pending/R-20260515-001
    updated: 2026-05-15
`);

  touchOld(path.join(root, "work/active/W-20260515-001/progress.md"), "2026-05-10T09:00:00Z");
  touchOld(path.join(root, "work/active/W-20260515-001"), "2026-05-10T09:00:00Z");
  touchOld(path.join(root, "work/reported/W-20260514-002/report.md"), "2026-05-13T09:00:00Z");
  touchOld(path.join(root, "work/reported/W-20260514-002"), "2026-05-13T09:00:00Z");

  return projectDir;
}

test("findProjectStateRoot prefers .atelier over legacy .research-agent", () => {
  const projectDir = makeTempProject();
  fs.mkdirSync(path.join(projectDir, ".research-agent"));
  fs.mkdirSync(path.join(projectDir, ".atelier"));

  assert.equal(findProjectStateRoot(projectDir), path.join(projectDir, ".atelier"));
});

test("findProjectStateRoot discovers legacy .research-agent projects", () => {
  const projectDir = makeTempProject();
  const legacyRoot = path.join(projectDir, ".research-agent");
  fs.mkdirSync(legacyRoot);

  assert.equal(findProjectStateRoot(projectDir), legacyRoot);
});

test("loadProjectSnapshot extracts cockpit state from one project", () => {
  const projectDir = makeProjectFixture();

  const snapshot = loadProjectSnapshot({
    targetDir: projectDir,
    now: new Date("2026-05-15T20:00:00Z"),
  });

  assert.equal(snapshot.project.id, "visual-pib");
  assert.equal(snapshot.project.name, "Visual PIB");
  assert.equal(snapshot.project.mode, "scholar");
  assert.equal(snapshot.project.manager, "codex");
  assert.deepEqual(snapshot.project.critics.platforms, ["claude"]);
  assert.deepEqual(snapshot.project.compute.platforms, ["aws-ts"]);
  assert.equal(snapshot.current.focus, "Validate the dashboard contract against packet artifacts.");
  assert.deepEqual(snapshot.current.nextMoves, [
    "Resolve W-20260514-002.",
    "Inspect active run artifacts.",
  ]);
  assert.match(snapshot.current.blockers, /needs manager resolution/);

  assert.equal(snapshot.health.activeWork, 1);
  assert.equal(snapshot.health.reportedWork, 1);
  assert.equal(snapshot.health.pendingReviews, 1);
  assert.equal(snapshot.health.evidence, 1);
  assert.equal(snapshot.health.claims, 1);
  assert.equal(snapshot.health.staleWork, 1);
  assert.equal(snapshot.health.waitingResolution, 1);

  assert.equal(snapshot.work.active[0].id, "W-20260515-001");
  assert.equal(snapshot.work.active[0].stale, true);
  assert.equal(snapshot.work.active[0].progress.runStatus, "running");
  assert.equal(snapshot.work.reported[0].id, "W-20260514-002");
  assert.equal(snapshot.work.reported[0].waitingForResolution, true);
  assert.equal(snapshot.work.closedRecent[0].id, "W-20260510-003");

  const artifactPaths = snapshot.artifacts.map((artifact) => artifact.path);
  assert.ok(artifactPaths.includes("outputs/runs/active-log.txt"));
  assert.ok(artifactPaths.includes("outputs/figures/report-plot.png"));
  assert.ok(artifactPaths.includes("outputs/evidence/e001.json"));
  assert.ok(artifactPaths.includes("outputs/evidence/e001-extra.png"));
  assert.ok(!artifactPaths.includes("outputs/not-mentioned.png"));
  assert.ok(!artifactPaths.includes(".atelier/skills/orient.md"));
  assert.ok(!artifactPaths.includes(".research-agent/skills/orient.md"));
});
