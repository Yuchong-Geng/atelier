# Sources

## AI4Research Workshop

Source: https://ai4research-icml-workshop.github.io/

Observed on 2026-05-12.

Relevant facts:

- The workshop focuses on helping researchers integrate AI into core research workflows.
- The call welcomes workflows for research problem formulation, experiment design, verification, iterative loops, and other research-centered tasks.
- Submissions should describe a reproducible workflow that can be used by researchers in a few hours.
- Submissions should explain how correctness was verified.
- Review criteria are accessibility, reproducibility, and correctness.
- Main paper limit is four pages excluding references.
- Deadline listed on the page is May 13, 2026 AoE.

## NeuroGolf

Official Kaggle page: https://www.kaggle.com/competitions/neurogolf-2026/overview

The official page did not expose crawlable text in this session.

Accessible summary used for task construction: https://www.competehub.dev/en/competitions/kaggleneurogolf-2026

Observed on 2026-05-12.

Relevant facts from the accessible summary:

- The task is to design small neural networks for ARC-AGI image transformations.
- Submissions are ONNX files, at most one per task.
- Networks must use statically defined tensor and parameter shapes.
- Some ONNX operations are disallowed.
- The ONNX file size limit is 1.44 MB.
- Scoring combines functional correctness and cost, where cost includes parameters, memory footprint, and multiply-accumulate operations.
- Validation is described as including ARC-AGI tasks, ARC-GEN-100K, and a private benchmark suite.

Because the official Kaggle page was not text-readable here, NeuroGolf facts should be treated as source-backed but not fully rule-audited. Any real competition work must re-check the official rules manually.

## Internal Project Evidence

Source: `docs/dogfood-report-2026-05-12.md`

Relevant facts:

- Previous dogfood was a protocol smoke test, not a real research-topic evaluation.
- The live critic test found that raw extraction quality, manager acceptance, recovery quality, and workflow overhead must be separated before making correctness claims.
- Remaining gaps include an init helper, validator, manager walkthrough, and real no-GPU pilot.
