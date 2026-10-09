# Init Terminal UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain interactive `research-agent init` path with a richer terminal wizard while preserving noninteractive init behavior.

**Architecture:** Keep `initProject()` as the only function that writes files. Add `init-tui.mjs` as an input-collection layer that dynamically loads `@inquirer/prompts`, falls back to the existing readline flow when unavailable, previews the plan, and returns the existing options object shape.

**Tech Stack:** Node ESM, `node:test`, `@inquirer/prompts`.

---

### Task 1: Add Wizard Planning Boundary

**Files:**
- Modify: `packages/skills/atelier/scripts/init.mjs`
- Create: `packages/skills/atelier/scripts/init-tui.mjs`
- Test: `packages/skills/atelier/scripts/init.test.mjs`

- [ ] **Step 1: Write failing tests**

Add tests that import `collectInitOptions` and verify no project files are created while collecting answers.

```js
test("collectInitOptions previews choices without creating files", async () => {
  const targetDir = makeTempProject("tui-preview");
  const answers = await collectInitOptions({
    targetDir,
    manager: "codex",
  }, {
    input: async () => targetDir,
    select: async ({ message }) => message.includes("mode") ? "builder" : "codex",
    checkbox: async () => [],
    confirm: async () => true,
    output: { write() {} },
  });

  assert.equal(answers.targetDir, targetDir);
  assert.equal(answers.mode, "builder");
  assert.equal(answers.manager, "codex");
  assert.equal(fs.existsSync(path.join(targetDir, ".research-agent")), false);
});
```

- [ ] **Step 2: Verify failure**

Run: `node --test packages/skills/atelier/scripts/init.test.mjs`

Expected: fail because `collectInitOptions` does not exist.

- [ ] **Step 3: Implement boundary**

Create `init-tui.mjs` with `collectInitOptions(initial, prompts)` and export `inspectAgentInstructionPlan` helpers from `init.mjs` as needed.

- [ ] **Step 4: Verify pass**

Run: `node --test packages/skills/atelier/scripts/init.test.mjs`

Expected: pass.

### Task 2: Add Inquirer Runtime And Fallback

**Files:**
- Modify: `packages/skills/atelier/scripts/init.mjs`
- Modify: `packages/skills/atelier/scripts/init-tui.mjs`
- Create: `packages/skills/atelier/package.json`
- Create: `packages/skills/atelier/package-lock.json`
- Test: `packages/skills/atelier/scripts/cli.test.mjs`

- [ ] **Step 1: Write failing tests**

Add CLI tests that use a fake TTY and injected prompts. Verify `runCli(["init"], io)` initializes from collected wizard answers.

- [ ] **Step 2: Verify failure**

Run: `node --test packages/skills/atelier/scripts/cli.test.mjs`

Expected: fail because the CLI still routes TTY init to the old readline path.

- [ ] **Step 3: Implement routing**

Route interactive init through `runInitWizard()`. Load `@inquirer/prompts` dynamically. If loading fails, call the existing readline prompt flow.

- [ ] **Step 4: Add package metadata**

Add `packages/skills/atelier/package.json` with dependency `@inquirer/prompts` pinned by `package-lock.json`.

- [ ] **Step 5: Verify pass**

Run: `node --test packages/skills/atelier/scripts/cli.test.mjs`

Expected: pass.

### Task 3: Verify Init Contract

**Files:**
- Modify: `packages/skills/atelier/scripts/init.test.mjs`
- Modify: `packages/skills/atelier/scripts/cli.test.mjs`
- Modify: `docs/install.md`

- [ ] **Step 1: Add smoke coverage**

Ensure `research-agent init --yes --target <tmp>` still creates `.research-agent/project.yaml`, `.research-agent/state/current.md`, copied skills, and root pointer behavior.

- [ ] **Step 2: Document dependency install**

Update install docs to mention running `npm install` inside `packages/skills/atelier` when the richer TUI dependency is desired. The fallback path remains available.

- [ ] **Step 3: Run full script tests**

Run: `node --test packages/skills/atelier/scripts/*.test.mjs`

Expected: all tests pass.
