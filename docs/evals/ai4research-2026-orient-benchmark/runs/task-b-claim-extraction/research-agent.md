# Claim Extraction

## Supported Claims

- Research-agent can be presented as a reproducible workflow protocol for AI-assisted research management.
  The supported evidence is the dogfood pass that exercised init, orient, work packets, reports, manager resolution, evidence records, claim updates, second-opinion review, revised experiment planning, and deliverable bridging.
  The honest scope is protocol mechanics, not research quality on real scientific targets.

- The project supports a manager-owned research loop with bounded delegation.
  The supported evidence is the exercised packet to report to resolution path, plus second-opinion review and manager resolution.
  The paper-safe claim is that the workflow structures delegation and review.
  It should not claim that the manager reliably chooses correct scientific conclusions yet.

- The workflow makes verification obligations explicit.
  The supported evidence is that the live critic identified a required separation between raw answer quality, manager acceptance, recovery quality, and workflow overhead.
  The stronger claim is not yet proven.
  Current evidence supports saying the protocol exposes these verification categories and forced the pilot design to improve.

- The project has already found and corrected practical workflow issues through dogfooding.
  The supported evidence is that source and package template issues were found and fixed.
  This supports an engineering-maturity claim about the workflow surfacing integration defects.
  It does not support a claim about scientific validity.

- The project fits the AI4Research workshop framing if the paper is written as a reproducible workflow paper.
  The workflow touches problem formulation, experiment design, verification, iterative loops, and deliverable preparation.
  A reader should be able to reproduce the core mechanics in a few hours if the paper includes a compact walkthrough and artifact pack.

## Weak Claims

- Research-agent improves correctness in AI-assisted research.
  This is plausible, but current evidence only shows that correctness checkpoints exist and that a critic found evaluation design flaws.
  The claim needs a real task comparison or gold-labeled audit.

- Research-agent improves answer quality over a normal assistant.
  Current dogfood did not compare against a baseline helpful model on the same tasks.
  This claim needs paired trials.

- Research-agent improves recovery across sessions or agents.
  The protocol has durable artifacts and manager resolution, but the provided facts do not show a recovery benchmark.
  This claim needs recovery questions with gold answers and fresh-context agents.

- Research-agent reduces overhead enough to be practical.
  The workshop values accessibility, but current facts do not quantify time, token cost, or artifact burden.
  The claim needs overhead logs from a reproducible run.

- Research-agent supports real research workflows beyond toy targets.
  The architecture is intended for research workflows, and the dogfood covered many workflow mechanics.
  The prior pass did not test actual papers, datasets, labels, or final benchmark performance.

## Unsupported Claims

- Research-agent has been validated on a real scientific research topic.
  The dogfood used synthetic and throwaway targets.

- Research-agent improves final benchmark performance.
  No final benchmark performance was tested.

- Research-agent can autonomously conduct research.
  The supported project claim is a manager-controlled workflow protocol, not autonomous discovery.

- Research-agent guarantees correctness.
  Current evidence supports explicit correctness checks and critic review, not guarantees.

- Research-agent outperforms Codex, Claude, or any baseline agent.
  No baseline comparison is given.

- Research-agent has demonstrated correctness on actual papers, datasets, or gold labels.
  The provided facts explicitly say this was not tested.

## Needed Evidence

- A compact real-topic case study using actual papers, data, or gold labels.
  The case study can stay small, but it must avoid being another synthetic protocol tour.

- A paired baseline comparison between a normal helpful model workflow and the research-agent workflow.
  The same task packet should be used for both conditions.

- Separate scores for raw answer quality, manager acceptance quality, recovery quality, and workflow overhead.
  The critic already identified this separation as necessary.

- A reproducibility bundle that includes setup steps, task packets, expected artifacts, scoring rubrics, and time or token logs.
  This directly addresses accessibility, reproducibility, and correctness.

- Independent review of accepted claims.
  The review should check whether each claim is supported by evidence artifacts, not whether the prose sounds plausible.

- A package and template smoke test from a clean checkout.
  Since template issues were already found and fixed, the paper should show that the install path now works.

## Deliverable Risks

- The four-page limit will not support the whole architecture.
  The paper should focus on one reproducible workflow trace and a small claim audit.

- The strongest story can be weakened by overclaiming.
  The safe framing is workflow feasibility and explicit verification structure.
  Claims about scientific accuracy or research performance need new evidence.

- The dogfood evidence may look like an internal engineering demo.
  The paper should label the dogfood as protocol validation and pair it with a small real-task evaluation plan or result.

- The overhead question can become a reviewer concern.
  The submission should report setup time, run time, tokens, number of artifacts, and points where a human had to decide.

- Correctness criteria must be concrete.
  The paper should avoid saying that correctness was verified in general.
  It should state exactly what was checked, who checked it, and which claims remained unverified.

- Accessibility depends on packaging clarity.
  If a reviewer cannot reproduce the few-hour workflow from a clean checkout, the submission will miss one of the workshop's stated criteria.

## Recommended Claim Set For The Paper

- We present research-agent, a project-local protocol for evidence-governed AI-assisted research workflows.

- The protocol organizes work around manager-owned state, bounded work and review packets, evidence records, claim records, and deliverable bridges.

- In an initial dogfood pass, the protocol exercised the mechanics needed for init, orientation, delegation, review, resolution, evidence tracking, claim extraction, experiment planning, and deliverable preparation.

- The dogfood pass surfaced both packaging defects and evaluation-design defects, including the need to separate raw answer quality, manager acceptance, recovery quality, and overhead.

- The current evidence supports workflow feasibility and auditability claims.
  It does not yet support claims about improved scientific correctness, real-task performance, or autonomous research capability.
