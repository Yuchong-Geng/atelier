# Publish Checklist

Use this checklist when making Atelier public.

## Local Verification

- Run `npm test` in `packages/skills/atelier`.
- Run `node bin/atelier --help`.
- Run `node bin/research-agent --help` to verify the legacy alias.
- Run a publish-candidate scan for placeholders, credentials, local absolute paths, and personal identifiers.

## GitHub Setup

- Rename or create the public repository as `Yuchong-Geng/atelier`.
- Confirm `docs/install.md` points to the actual public clone URL.
- Push the prepared branch.
- Open a pull request or merge into the public default branch.

## Public Metadata

- Confirm the repository description says: `File-backed protocol for AI-assisted research workflows`.
- Add GitHub topics such as `research`, `agents`, `codex`, `claude`, `evidence`, and `workflow`.
- Confirm the MIT license is visible on GitHub.

## Smoke Test

After publishing, clone a fresh copy and run:

```bash
npm install --prefix packages/skills/atelier
node bin/atelier --help
```

Then initialize a temporary project and verify `.atelier/project.yaml` and `.atelier/ATELIER.md` are created.
