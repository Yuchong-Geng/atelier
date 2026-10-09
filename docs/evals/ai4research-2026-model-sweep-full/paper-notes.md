# Paper Notes

## Candidate Result Sentence

Across four model and effort settings, the full role-separated research-agent protocol improved manual rubric scores from 16.5 to 20 out of 20 on average, with no severe content errors.

## Safer Result Sentence

In a small role-separated sweep, research-agent outputs were consistently more recoverable and critique-aware than freeform baselines, with manual rubric improvements of 2 to 4 points out of 20.

## Recommended Main Table

| Setting | Baseline | Research-agent | Notes |
| --- | ---: | ---: | --- |
| default medium | 16 | 20 | reference full-state run, manager recovered from durable state |
| default low | 16 | 20 | full role separation, final plan blocks implementation until contract work |
| GPT-5.4-Mini medium | 18 | 20 | strong baseline, protocol still adds state and critique resolution |
| GPT-5.2 medium | 16 | 20 | synthesis drift preserved as explicit uncertainty |

## Recommended Artifact Table

| Artifact | Baseline | Research-agent |
| --- | --- | --- |
| transcript | yes | yes |
| final plan | yes | yes |
| project config | no | yes |
| project brief | no | yes |
| current state | no | yes |
| work packet | no | yes |
| worker report | no | yes |
| work resolution | no | yes |
| review packet | no | yes |
| critic report | no | yes |
| review resolution | no | yes |
| deliverable brief | no | yes |

## Main Read

The result is not that research-agent has better raw ideas than the baseline in every case. The GPT-5.4-Mini baseline was already strong.

The result is that research-agent makes the research process inspectable. It records the project frame, the delegation boundary, the report, the manager's accepted interpretation, the critique, and the final revision.

## Operational Caveat

Report operational incidents transparently.

- Reference default-medium: manager stalls, recovered from durable state.
- GPT-5.4-Mini full sweep: wrong-path critic output, preserved and rerun.

These incidents support a secondary observation: file-backed state made recovery possible. They do not support a claim of fully autonomous reliability.

## Claim Boundary

This eval supports a process claim:

> The protocol improves recoverability and validity repair in early research steering.

It does not support outcome claims:

- better final experiments
- faster implementation
- better ARC performance
- correctness guarantees
- autonomous discovery
