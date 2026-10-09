import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { initProject } from "./init.mjs";
import { collectInitOptions } from "./init-tui.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");

function makeTempProject(name = "predictive-video") {
  return fs.mkdtempSync(path.join(os.tmpdir(), `${name}-`));
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function makePromptHarness(answers) {
  const calls = [];
  return {
    calls,
    prompts: {
      async input(question) {
        calls.push(["input", question.message]);
        return answers.input.shift();
      },
      async select(question) {
        calls.push(["select", question.message]);
        return answers.select.shift();
      },
      async checkbox(question) {
        calls.push(["checkbox", question.message]);
        return answers.checkbox.shift();
      },
      async confirm(question) {
        calls.push(["confirm", question.message]);
        return answers.confirm.shift();
      },
      output: {
        write(text) {
          calls.push(["write", text]);
        },
      },
    },
  };
}

test("collectInitOptions previews choices without creating files", async () => {
  const targetDir = makeTempProject("tui-preview");
  const harness = makePromptHarness({
    input: [targetDir, "Terminal UI Project", "terminal-ui-project"],
    select: ["builder", "codex", "confirm"],
    checkbox: [[], ["codex"]],
    confirm: [],
  });

  const result = await collectInitOptions({
    targetDir,
    manager: "codex",
  }, harness.prompts);

  assert.equal(result.targetDir, targetDir);
  assert.equal(result.projectName, "Terminal UI Project");
  assert.equal(result.projectId, "terminal-ui-project");
  assert.equal(result.mode, "builder");
  assert.equal(result.manager, "codex");
  assert.deepEqual(result.critics, []);
  assert.deepEqual(result.agentInstructions, ["codex"]);
  assert.deepEqual(result.appendAgentInstructions, []);
  assert.equal(fs.existsSync(path.join(targetDir, ".atelier")), false);
  assert.ok(harness.calls.some(([kind, text]) => kind === "write" && text.includes("Final preview")));
});

test("collectInitOptions marks existing configured instruction files in preview", async () => {
  const targetDir = makeTempProject("tui-configured");
  fs.writeFileSync(
    path.join(targetDir, "AGENTS.md"),
    "Existing rules\n\nRead `.atelier/ATELIER.md` before research work.\n",
  );
  const harness = makePromptHarness({
    input: [targetDir, "Configured Project", "configured-project"],
    select: ["scholar", "codex", "confirm"],
    checkbox: [[], ["codex"]],
    confirm: [],
  });

  const result = await collectInitOptions({}, harness.prompts);
  const preview = harness.calls
    .filter(([kind]) => kind === "write")
    .map(([, text]) => text)
    .join("\n");

  assert.deepEqual(result.agentInstructions, ["codex"]);
  assert.deepEqual(result.appendAgentInstructions, []);
  assert.match(preview, /Already configured: AGENTS\.md/);
  assert.equal(fs.existsSync(path.join(targetDir, ".atelier")), false);
});

test("collectInitOptions allows empty root instruction selection", async () => {
  const targetDir = makeTempProject("tui-no-instructions");
  const harness = makePromptHarness({
    input: [targetDir, "No Instructions Project", "no-instructions-project"],
    select: ["scholar", "codex", "confirm"],
    checkbox: [[], []],
    confirm: [],
  });

  const result = await collectInitOptions({}, harness.prompts);

  assert.deepEqual(result.agentInstructions, []);
  assert.equal(fs.existsSync(path.join(targetDir, ".atelier")), false);
});

test("initProject creates a project-local control plane from packaged assets", async () => {
  const targetDir = makeTempProject();

  const result = await initProject({
    targetDir,
    mode: "scholar",
    manager: "codex",
    critics: ["codex"],
    packageRoot,
    today: "2026-05-12",
  });

  const root = path.join(targetDir, ".atelier");
  const projectYaml = readText(path.join(root, "project.yaml"));
  const currentState = readText(path.join(root, "state/current.md"));
  const researchLog = readText(path.join(root, "logs/research-log.md"));
  const orientSkill = readText(path.join(root, "skills/orient.md"));

  assert.equal(result.created, true);
  assert.equal(result.root, root);
  assert.match(projectYaml, /id: predictive-video-/);
  assert.match(projectYaml, /mode: scholar/);
  assert.match(projectYaml, /created: 2026-05-12/);
  assert.match(projectYaml, /current_owner: codex/);
  assert.match(projectYaml, /enabled: true/);
  assert.match(projectYaml, /- codex/);
  assert.match(projectYaml, /platforms: \[\]/);
  assert.match(projectYaml, /root_entrypoints:\n  - AGENTS\.md/);
  assert.match(currentState, /updated: 2026-05-12/);
  assert.match(currentState, /Atelier was initialized for this project in scholar mode\./);
  assert.match(researchLog, /## 2026-05-12/);
  assert.match(orientSkill, /## Write Approval Gate/);
  assert.match(orientSkill, /substantive provisional frame/);
  assert.doesNotMatch(orientSkill, /## Confirmation Gate/);
  assert.ok(fs.existsSync(path.join(targetDir, "AGENTS.md")));
  assert.ok(fs.existsSync(path.join(root, "ATELIER.md")));
  assert.equal(fs.existsSync(path.join(root, "RESEARCH_AGENT.md")), false);
  assert.ok(fs.existsSync(path.join(root, "work/pending/.gitkeep")));
  assert.ok(fs.existsSync(path.join(root, "reviews/pending/.gitkeep")));
});

test("initProject refuses to overwrite an existing control plane", async () => {
  const targetDir = makeTempProject("existing-control-plane");
  const existingRoot = path.join(targetDir, ".atelier");
  fs.mkdirSync(existingRoot);
  fs.writeFileSync(path.join(existingRoot, "README.md"), "keep me\n");

  await assert.rejects(
    () => initProject({
      targetDir,
      mode: "builder",
      manager: "codex",
      packageRoot,
      today: "2026-05-12",
    }),
    /already exists/,
  );

  assert.equal(readText(path.join(existingRoot, "README.md")), "keep me\n");
});

test("initProject refuses to initialize over a legacy research-agent control plane", async () => {
  const targetDir = makeTempProject("legacy-control-plane");
  const existingRoot = path.join(targetDir, ".research-agent");
  fs.mkdirSync(existingRoot);
  fs.writeFileSync(path.join(existingRoot, "README.md"), "legacy state\n");

  await assert.rejects(
    () => initProject({
      targetDir,
      mode: "builder",
      manager: "codex",
      packageRoot,
      today: "2026-05-12",
    }),
    /already exists/,
  );

  assert.equal(readText(path.join(existingRoot, "README.md")), "legacy state\n");
});

test("initProject can create requested Codex agent instructions", async () => {
  const targetDir = makeTempProject("codex-instructions");

  const result = await initProject({
    targetDir,
    mode: "builder",
    manager: "codex",
    packageRoot,
    agentInstructions: ["codex"],
    today: "2026-05-12",
  });

  const projectYaml = readText(path.join(targetDir, ".atelier/project.yaml"));
  const agentsPointer = readText(path.join(targetDir, "AGENTS.md"));

  assert.deepEqual(result.agentInstructionsCreated, ["AGENTS.md"]);
  assert.match(projectYaml, /root_entrypoints:\n  - AGENTS\.md/);
  assert.match(agentsPointer, /Read `.atelier\/ATELIER.md`/);
});

test("initProject auto-selects Claude agent instructions for a Claude manager", async () => {
  const targetDir = makeTempProject("claude-instructions");

  const result = await initProject({
    targetDir,
    mode: "builder",
    manager: "claude",
    packageRoot,
    today: "2026-05-12",
  });

  const projectYaml = readText(path.join(targetDir, ".atelier/project.yaml"));

  assert.deepEqual(result.agentInstructionsCreated, ["CLAUDE.md"]);
  assert.match(projectYaml, /root_entrypoints:\n  - CLAUDE\.md/);
  assert.ok(fs.existsSync(path.join(targetDir, "CLAUDE.md")));
  assert.equal(fs.existsSync(path.join(targetDir, "AGENTS.md")), false);
});

test("initProject treats existing Atelier instructions as configured", async () => {
  const targetDir = makeTempProject("configured-instructions");
  const existing = "Existing rules\n\nRead `.atelier/ATELIER.md` before research work.\n";
  fs.writeFileSync(path.join(targetDir, "AGENTS.md"), existing);

  const result = await initProject({
    targetDir,
    mode: "scholar",
    manager: "codex",
    packageRoot,
    today: "2026-05-12",
  });

  const projectYaml = readText(path.join(targetDir, ".atelier/project.yaml"));

  assert.deepEqual(result.agentInstructionsConfigured, ["AGENTS.md"]);
  assert.match(projectYaml, /root_entrypoints:\n  - AGENTS\.md/);
  assert.equal(readText(path.join(targetDir, "AGENTS.md")), existing);
});

test("initProject treats existing legacy research-agent instructions as configured", async () => {
  const targetDir = makeTempProject("legacy-configured-instructions");
  const existing = "Existing rules\n\nRead `.research-agent/RESEARCH_AGENT.md` before research work.\n";
  fs.writeFileSync(path.join(targetDir, "AGENTS.md"), existing);

  const result = await initProject({
    targetDir,
    mode: "scholar",
    manager: "codex",
    packageRoot,
    today: "2026-05-12",
  });

  const projectYaml = readText(path.join(targetDir, ".atelier/project.yaml"));

  assert.deepEqual(result.agentInstructionsConfigured, ["AGENTS.md"]);
  assert.match(projectYaml, /root_entrypoints:\n  - AGENTS\.md/);
  assert.equal(readText(path.join(targetDir, "AGENTS.md")), existing);
});

test("initProject skips unmanaged existing instruction files without overwriting", async () => {
  const targetDir = makeTempProject("unmanaged-instructions");
  const existing = "# Existing Agent Instructions\n\nKeep this file unchanged.\n";
  fs.writeFileSync(path.join(targetDir, "AGENTS.md"), existing);

  const result = await initProject({
    targetDir,
    mode: "scholar",
    manager: "codex",
    packageRoot,
    today: "2026-05-12",
  });

  const projectYaml = readText(path.join(targetDir, ".atelier/project.yaml"));

  assert.deepEqual(result.agentInstructionsSkipped, ["AGENTS.md"]);
  assert.match(projectYaml, /root_entrypoints: \[\]/);
  assert.equal(readText(path.join(targetDir, "AGENTS.md")), existing);
});

test("initProject appends approved Atelier instructions to existing files", async () => {
  const targetDir = makeTempProject("append-instructions");
  const existing = "# Existing Agent Instructions\n\nKeep this file.\n";
  fs.writeFileSync(path.join(targetDir, "AGENTS.md"), existing);

  const result = await initProject({
    targetDir,
    mode: "scholar",
    manager: "codex",
    packageRoot,
    appendAgentInstructions: ["codex"],
    today: "2026-05-12",
  });

  const projectYaml = readText(path.join(targetDir, ".atelier/project.yaml"));
  const agents = readText(path.join(targetDir, "AGENTS.md"));

  assert.deepEqual(result.agentInstructionsUpdated, ["AGENTS.md"]);
  assert.match(projectYaml, /root_entrypoints:\n  - AGENTS\.md/);
  assert.match(agents, /^# Existing Agent Instructions/);
  assert.match(agents, /Read `.atelier\/ATELIER.md`/);
});

test("initProject can disable agent instructions explicitly", async () => {
  const targetDir = makeTempProject("no-instructions");

  const result = await initProject({
    targetDir,
    mode: "scholar",
    manager: "codex",
    packageRoot,
    agentInstructions: ["none"],
    today: "2026-05-12",
  });

  const projectYaml = readText(path.join(targetDir, ".atelier/project.yaml"));

  assert.deepEqual(result.agentInstructionsCreated, []);
  assert.match(projectYaml, /root_entrypoints: \[\]/);
  assert.equal(fs.existsSync(path.join(targetDir, "AGENTS.md")), false);
});

test("initProject treats an explicit empty agent instruction list as disabled", async () => {
  const targetDir = makeTempProject("empty-instructions");

  const result = await initProject({
    targetDir,
    mode: "scholar",
    manager: "codex",
    packageRoot,
    agentInstructions: [],
    today: "2026-05-12",
  });

  const projectYaml = readText(path.join(targetDir, ".atelier/project.yaml"));

  assert.deepEqual(result.agentInstructionsCreated, []);
  assert.match(projectYaml, /root_entrypoints: \[\]/);
  assert.equal(fs.existsSync(path.join(targetDir, "AGENTS.md")), false);
});
