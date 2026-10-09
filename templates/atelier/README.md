# Atelier Control Plane

This directory is the project-local `.atelier/` control plane.

Project state in this directory is canonical for Atelier work in this project.

`skills/` contains the project-local Atelier skills. After initialization, these local files are enough to operate the project even when the global package is unavailable.

`templates/` contains item templates for files that managers create later, such as claims, work packets, reports, resolutions, review packets, and evidence records.

These queue directories should exist even when empty:

- `claims/`
- `work/pending/`
- `work/active/`
- `work/reported/`
- `work/closed/`
- `reviews/pending/`
- `reviews/active/`
- `reviews/reported/`
- `reviews/closed/`
