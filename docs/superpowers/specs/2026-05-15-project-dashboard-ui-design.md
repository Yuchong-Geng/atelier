# Project Dashboard UI Design

## Decision

Research-agent should add a read-only project dashboard for one initialized project. The dashboard is an HTML view over `.research-agent/` files. Markdown and YAML remain the canonical project state. The manager remains the only normal writer.

The first screen should use an operating cockpit layout. The page should help a user quickly answer what the project is focused on, what work is active or waiting, what blockers matter, what artifacts changed recently, and what the next manager moves are.

## Scope

V0 covers one local project only. The UI should find the nearest `.research-agent/` tree from the target directory and render that project. It should not list multiple projects, index other repositories, or merge state across projects.

The UI is read-only. It must not edit project files, queue indexes, packets, reports, resolutions, claims, evidence, briefs, logs, or compute notes. Any state update belongs to the manager workflow.

V0 includes two commands.

```text
research-agent ui
research-agent ui build
```

`research-agent ui` starts a local server for active work. The server parses project files into a snapshot and serves a no-build frontend. The frontend refreshes from the local snapshot endpoint while the command is running. The live command writes no project files.

`research-agent ui build` writes a static HTML snapshot and exits. The static output is for archive, sharing, or quick inspection. It is not the daily live mode. This command writes only the generated export file.

## Architecture

The implementation should keep protocol parsing separate from visual rendering.

```text
.research-agent/
  -> project state reader
  -> normalized snapshot JSON
  -> local read-only server or static export
  -> HTML dashboard
```

The project state reader owns filesystem discovery, Markdown frontmatter parsing, YAML index parsing, section extraction, queue summarization, artifact pointer collection, and UI hint calculation. The frontend renders only the normalized snapshot. The frontend should not know how to interpret packet folders or protocol files.

The frontend should be no-build HTML, CSS, and JavaScript. V0 should not add React, Vite, or a bundled app pipeline. Plain assets are easier for agents to inspect, easier to package with the existing skill helper, and sufficient for a read-only dashboard.

## Snapshot Shape

The snapshot should include these top-level groups.

- `project`: project id, name, mode, creation date, manager owner, critic settings, repository roots, artifact roots, and compute platform names when available.
- `current`: current focus, snapshot summary, working position, queue snapshot, blockers and risks, next moves, recent updates, and updated date from `state/current.md`.
- `health`: counts and warnings for active work, reported work, blockers, evidence, claims, and reviews.
- `work`: active, reported, pending, and recently closed work items with id, title, status, kind, priority, owner, path, updated date, stale hints, progress state, report pointer, resolution pointer, and artifact pointers.
- `reviews`: pending, active, reported, and recently closed review items with the same compact fields where available.
- `brief`: project brief sections for secondary tab rendering.
- `claims`: compact claim index entries and support labels.
- `evidence`: compact evidence index entries, strength labels, deliverable use labels, source work, and source artifacts.
- `artifacts`: recent explicitly referenced artifacts grouped by source item.
- `logs`: compact pointers to research log and decisions log.

The snapshot should prefer index files for compact listing, then enrich each item from its packet, progress, report, and resolution files when those files exist. If an index and item file disagree, item files win for title, status, updated date, and frontmatter fields.

## First Screen

The default view is the Operating Cockpit.

The header shows project name, mode, manager owner, and refresh time. The health strip shows active work, reported work, blockers, evidence, and reviews.

The main content has four areas.

- Current Focus and Next Moves.
- Active and Reported Work.
- Blockers and Risks.
- Recent Artifacts.

Secondary tabs show Brief, Work, Evidence, Claims, Reviews, and Logs. These tabs can expose more detail without dumping every file onto the first screen.

## Artifact Rules

The UI should show artifacts only when they are explicitly referenced by protocol files. Accepted sources are `report.md`, `resolution.md`, `evidence.md`, `progress.md`, and compact indexes. The reader should not recursively scan output directories or artifact roots.

The goal is curated visibility, not file discovery. If an artifact matters, the manager or worker should point to it in the protocol state.

## Staleness Rules

Staleness is a UI hint only. It must not write back to canonical files.

Active work is stale when neither `progress.md` nor the item folder changed in the last 48 hours. Reported work is waiting for resolution when it has been reported for more than 24 hours and no `resolution.md` exists.

The UI should present these hints quietly. The hints should help the manager decide where to look. They should not imply that the underlying work failed.

## Server Behavior

`research-agent ui` should print the local URL and keep running until interrupted. It should serve the dashboard HTML, CSS, JavaScript, and `/snapshot.json`.

The server may refresh by polling file metadata or by filesystem watch with a polling fallback. The important v0 behavior is that the browser sees recent project file changes without rerunning the command.

The server should bind to `127.0.0.1` by default. It should accept `--host` and `--port` for local development and remote tunnel cases. If no port is requested, the command should use an available local port. If an explicit port is unavailable, the command should fail with a clear message rather than silently choosing a different port.

## Static Build Behavior

`research-agent ui build` should produce a single HTML file with the current snapshot embedded. The command should accept `--out`. If `--out` is omitted, it should write under `.research-agent/ui/dashboard.html`. That path is generated output, not canonical protocol state.

The static file should not require the local server. It should render the same dashboard from the embedded snapshot.

## Error Handling

If no `.research-agent/` directory can be found, the command should fail with a clear message that names the target directory.

If optional files are missing, the snapshot should degrade gracefully. Empty indexes, missing logs, missing claims, missing evidence, and missing compute notes are valid for young projects.

If a Markdown or YAML file is malformed, the snapshot should include a warning and continue when possible. A malformed `project.yaml` should still produce a useful error because the project identity is central to the UI.

## Testing

Tests should cover snapshot extraction, explicit artifact collection, staleness hints, static build output, and CLI routing.

The first test should construct a temporary `.research-agent/` tree with active, reported, and closed work. It should verify that the reader extracts project identity, current focus, next moves, health counts, explicit artifacts, and staleness hints.

A build test should verify that `research-agent ui build --target <tmp> --out <file>` writes a standalone HTML file with an embedded snapshot.

Existing init tests should continue to pass.

## Acceptance Criteria

`research-agent ui` serves a visually polished local dashboard for one project.

`research-agent ui build` writes a standalone HTML dashboard snapshot.

The dashboard is read-only and does not mutate `.research-agent/`.

The first screen follows the Operating Cockpit layout.

Artifacts appear only from explicit protocol references.

Active stale and reported waiting-for-resolution hints are visible in the UI.

The package test suite passes.
