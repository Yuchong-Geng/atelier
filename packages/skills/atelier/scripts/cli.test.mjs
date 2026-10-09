import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Writable } from "node:stream";
import test from "node:test";

import { runCli } from "./cli.mjs";

function makeTempProject(name = "Atelier-cli") {
  return fs.mkdtempSync(path.join(os.tmpdir(), `${name}-`));
}

function captureStream() {
  let text = "";
  return {
    stream: new Writable({
      write(chunk, _encoding, callback) {
        text += chunk.toString();
        callback();
      },
    }),
    text: () => text,
  };
}

function makePromptHarness(targetDir) {
  return {
    async input(question) {
      if (question.message === "Target folder") {
        return targetDir;
      }
      if (question.message === "Project name") {
        return "TTY Init Project";
      }
      if (question.message === "Project id") {
        return "tty-init-project";
      }
      return "";
    },
    async select(question) {
      if (question.message === "Project mode") {
        return "builder";
      }
      if (question.message === "Manager platform") {
        return "codex";
      }
      if (question.message === "Final preview") {
        return "confirm";
      }
      return "codex";
    },
    async checkbox(question) {
      if (question.message === "Critic platforms") {
        return ["claude"];
      }
      if (question.message === "Root agent instructions") {
        return ["codex"];
      }
      return [];
    },
    async confirm() {
      return false;
    },
  };
}

test("runCli dispatches atelier init", async () => {
  const targetDir = makeTempProject();
  const stdout = captureStream();

  await runCli(["init", "--target", targetDir, "--mode", "builder", "--yes"], {
    stdout: stdout.stream,
    stderr: captureStream().stream,
    stdin: { isTTY: false },
    cwd: process.cwd(),
  });

  assert.ok(fs.existsSync(path.join(targetDir, ".atelier/project.yaml")));
  assert.ok(fs.existsSync(path.join(targetDir, "AGENTS.md")));
  assert.match(stdout.text(), /Initialized Atelier/);
  assert.match(stdout.text(), /Agent instructions created: AGENTS\.md/);
});

test("runCli builds a static Atelier dashboard", async () => {
  const targetDir = makeTempProject("ui-build");
  const outFile = path.join(targetDir, "dashboard.html");
  const stdout = captureStream();

  await runCli(["init", "--target", targetDir, "--project-name", "UI Build Project", "--yes"], {
    stdout: captureStream().stream,
    stderr: captureStream().stream,
    stdin: { isTTY: false },
    cwd: process.cwd(),
  });
  await runCli(["ui", "build", "--target", targetDir, "--out", outFile], {
    stdout: stdout.stream,
    stderr: captureStream().stream,
    stdin: { isTTY: false },
    cwd: process.cwd(),
  });

  const html = fs.readFileSync(outFile, "utf8");

  assert.match(stdout.text(), /Wrote dashboard snapshot/);
  assert.match(html, /window\.__ATELIER_SNAPSHOT__/);
  assert.match(html, /UI Build Project/);
  assert.match(html, /atelier-dashboard/);
});

test("runCli routes TTY init through the terminal wizard", async () => {
  const targetDir = makeTempProject("tty-init");
  const stdout = captureStream();

  await runCli(["init"], {
    stdout: stdout.stream,
    stderr: captureStream().stream,
    stdin: { isTTY: true },
    prompts: makePromptHarness(targetDir),
  });

  const projectYaml = fs.readFileSync(path.join(targetDir, ".atelier/project.yaml"), "utf8");

  assert.match(projectYaml, /name: "TTY Init Project"/);
  assert.match(projectYaml, /id: tty-init-project/);
  assert.match(projectYaml, /mode: builder/);
  assert.match(projectYaml, /current_owner: codex/);
  assert.match(projectYaml, /- claude/);
  assert.ok(fs.existsSync(path.join(targetDir, "AGENTS.md")));
  assert.match(stdout.text(), /Final preview/);
  assert.match(stdout.text(), /Initialized Atelier/);
});

test("runCli prints top-level help", async () => {
  const stdout = captureStream();

  await runCli(["--help"], {
    stdout: stdout.stream,
    stderr: captureStream().stream,
    stdin: { isTTY: false },
    cwd: process.cwd(),
  });

  assert.match(stdout.text(), /Usage: atelier <command>/);
  assert.match(stdout.text(), /atelier init/);
  assert.match(stdout.text(), /atelier ui/);
});

test("runCli rejects unknown subcommands", async () => {
  await assert.rejects(
    () => runCli(["doctor"], {
      stdout: captureStream().stream,
      stderr: captureStream().stream,
      stdin: { isTTY: false },
      cwd: process.cwd(),
    }),
    /Unknown command: doctor/,
  );
});
