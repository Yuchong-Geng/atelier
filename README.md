# Atelier

Atelier is a file-backed protocol for AI-assisted research workflows. It keeps the human researcher in charge while giving agents a durable state layer for orientation, work packets, reviews, evidence, claims, and deliverable planning.

Atelier is designed for Codex, Claude, and project-specific research repositories. The core protocol is project-local. Initialized projects remain usable from `.atelier/` files even when the global package is unavailable.

## What Atelier Provides

- Durable research state under `.atelier/`.
- Human-readable briefs, claims, experiments, evidence, logs, and decisions.
- Bounded packets for workers, experiment owners, and second-opinion critics.
- One active manager that owns canonical state.
- Thin Codex and Claude adapters that point into the same project state.

The durable primitive is structured project state on disk, not a chat transcript or one platform's private feature.

## Paper

Atelier was accepted to the [ICML 2026 Workshop AI4Research](https://ai4research-icml-workshop.github.io/). The accepted paper is on [OpenReview](https://openreview.net/forum?id=9h3ZudPP3G). The project page is [Atelier: A Human-Owned Protocol for Auditable AI-Assisted Research](https://yuchong-geng.github.io/project-page/atelier.html), and the LaTeX source lives in `papers/ai4research-icml2026/`.

If you use Atelier, please cite:

```bibtex
@inproceedings{
geng2026atelier,
title={Atelier: A Human-Owned Protocol for Auditable {AI}-Assisted Research},
author={Yuchong Geng and YUCHEN LU},
booktitle={ICML 2026 Workshop: AI as a Tool for Mathematics, Computer Science, and Machine Learning},
year={2026},
url={https://openreview.net/forum?id=9h3ZudPP3G}
}
```

## Quick Start

```bash
git clone https://github.com/Yuchong-Geng/atelier.git
cd atelier
npm install --prefix packages/skills/atelier
ln -sfn "$PWD/bin/atelier" /opt/homebrew/bin/atelier
atelier --help
```

Initialize a target research project from inside that project:

```bash
atelier init
```

Then start with:

```text
.atelier/skills/orient.md
```

Use `atelier` for new installs and scripts. The repository keeps a `research-agent` wrapper only as a legacy alias for existing local setups.

## Repository Map

- `packages/skills/atelier/`: installable Atelier skill package.
- `bin/atelier`: primary shell wrapper.
- `templates/atelier/`: source template tree copied into new `.atelier/` projects.
- `skills/`: source project skills copied into initialized projects.
- `adapters/`: Codex and Claude handoff guidance.
- `docs/system-blueprint.md`: architecture snapshot.
- `docs/install.md`: installation notes.
- `docs/evals/`: pilot evaluations and scoring notes.
- `papers/ai4research-icml2026/`: accepted workshop paper source and supporting material.
- `bin/research-agent`: legacy shell wrapper retained for old local setups.

## Status

Atelier is a v0 research prototype. The first concrete benchmark is the Rational-Model and DCDM NeurIPS workflow, but the protocol is intended to be project-agnostic.

New projects use `.atelier/`. Existing `.research-agent/` projects remain readable through compatibility discovery.
