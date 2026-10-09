# Protocol

## Prompt

Use `harness/prompt.md` as the frozen user prompt and simulated user replies.

## Baseline Agent

The baseline agent writes:

- `runs/<variant>/baseline/transcript.md`
- `runs/<variant>/baseline/final-plan.md`

The baseline must not use or mention the research-agent protocol.

## Research-Agent Agent

The research-agent agent writes into:

`runs/<variant>/research-agent/target-project/.research-agent/`

It must update real canonical state and produce the expected packet, report, resolution, review, deliverable brief, transcript, and final plan artifacts.

The condition may write the worker report and critic report itself for this deadline sweep. Record that limitation in the transcript or metadata if no separate worker or critic subagent was launched.

## Scoring

Use the 20-point rubric copied into `rubric.md`.

Score artifact quality and recoverability. Record severe errors separately.

## Output

Each variant should include:

- `run-metadata.md`
- baseline files
- research-agent files

The aggregate sweep should include:

- `scores/score-table.csv`
- `scores/scoring-notes.md`
- `digest.md`
- `paper-notes.md`
