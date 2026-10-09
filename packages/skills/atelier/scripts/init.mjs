#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import readline from "node:readline/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  ENTRYPOINT_FILE,
  LEGACY_ENTRYPOINT,
  LEGACY_ENTRYPOINT_FILE,
  PRIMARY_ENTRYPOINT,
  PRIMARY_STATE_DIR,
  PROJECT_NAME,
  STATE_DIRS,
} from "./protocol.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PACKAGE_ROOT = path.resolve(__dirname, "..");

export const AGENT_INSTRUCTION_FILES = {
  codex: "AGENTS.md",
  claude: "CLAUDE.md",
};

export async function initProject(options = {}) {
  const packageRoot = path.resolve(options.packageRoot ?? DEFAULT_PACKAGE_ROOT);
  const targetDir = path.resolve(options.targetDir ?? process.cwd());
  const root = path.join(targetDir, PRIMARY_STATE_DIR);
  const existingRoot = existingStateRoot(targetDir);

  if (existingRoot) {
    throw new Error(`Refusing to initialize because ${existingRoot} already exists.`);
  }

  const projectName = options.projectName ?? path.basename(targetDir);
  const projectId = options.projectId ?? slugify(projectName);
  const mode = validateMode(options.mode ?? "scholar");
  const manager = normalizeRequired(options.manager ?? "codex", "manager");
  const critics = normalizeList(options.critics ?? []);
  const agentInstructions = normalizeAgentInstructions(
    options.agentInstructions ?? options.rootPointers ?? "auto",
    { manager },
  );
  const appendAgentInstructions = normalizeAgentInstructionFiles(
    options.appendAgentInstructions ?? [],
  );
  const today = options.today ?? new Date().toISOString().slice(0, 10);

  const templateRoot = path.join(packageRoot, "assets/templates/atelier");
  const skillRoot = path.join(packageRoot, "assets/project-skills");
  const adapterTemplateRoot = path.join(packageRoot, "assets/templates/adapters");

  assertDirectory(templateRoot, "template root");
  assertDirectory(skillRoot, "project-skill root");

  fs.mkdirSync(root, { recursive: true });
  fs.cpSync(templateRoot, root, { recursive: true, errorOnExist: true, force: false });
  renameEntrypoint(root);
  copyProjectSkills(skillRoot, path.join(root, "skills"));

  const agentInstructionResult = createAgentInstructions({
    targetDir,
    adapterTemplateRoot,
    agentInstructions,
    appendAgentInstructions,
  });

  fs.writeFileSync(
    path.join(root, "project.yaml"),
    renderProjectYaml({
      projectId,
      projectName,
      mode,
      today,
      manager,
      critics,
      rootEntryPoints: agentInstructionResult.entrypoints,
    }),
  );
  fs.writeFileSync(
    path.join(root, "state/current.md"),
    renderCurrentState({ today, mode, manager, critics }),
  );
  fs.writeFileSync(
    path.join(root, "logs/research-log.md"),
    renderResearchLog({ today }),
  );

  return {
    created: true,
    root,
    projectId,
    projectName,
    mode,
    manager,
    critics,
    agentInstructionsCreated: agentInstructionResult.created,
    agentInstructionsConfigured: agentInstructionResult.configured,
    agentInstructionsUpdated: agentInstructionResult.updated,
    agentInstructionsSkipped: agentInstructionResult.skipped,
    rootPointersCreated: agentInstructionResult.created,
    rootPointersSkipped: agentInstructionResult.skipped,
  };
}

export async function main(argv = process.argv.slice(2), io = process) {
  const parsed = parseArgs(argv);
  if (parsed.help) {
    printHelp(io.stdout ?? process.stdout);
    return;
  }

  const interactive = io.stdin?.isTTY && !parsed.yes;
  let answers = {
    targetDir: parsed.targetDir ?? process.cwd(),
    mode: parsed.mode,
    manager: parsed.manager,
    critics: parsed.critics,
    agentInstructions: parsed.agentInstructions,
    projectName: parsed.projectName,
    projectId: parsed.projectId,
  };

  if (interactive) {
    answers = await promptInteractively(answers, io);
  }

  const result = await initProject(answers);
  printSummary(result, io.stdout ?? process.stdout);
}

async function promptInteractively(answers, io) {
  const promptSet = io.prompts
    ? { ...io.prompts, output: io.stdout ?? process.stdout }
    : await loadTerminalPrompts(io);

  if (promptSet) {
    const { collectInitOptions } = await import("./init-tui.mjs");
    return collectInitOptions(answers, promptSet);
  }

  return promptForMissing(answers, io);
}

async function loadTerminalPrompts(io) {
  try {
    const prompts = await import("@inquirer/prompts");
    return {
      input: prompts.input,
      select: prompts.select,
      checkbox: prompts.checkbox,
      confirm: prompts.confirm,
      output: io.stdout ?? process.stdout,
    };
  } catch (error) {
    if (isMissingInquirerError(error)) {
      return null;
    }
    throw error;
  }
}

function isMissingInquirerError(error) {
  return error?.code === "ERR_MODULE_NOT_FOUND"
    && String(error.message).includes("@inquirer/prompts");
}

export function parseArgs(argv) {
  const parsed = {
    critics: undefined,
    agentInstructions: undefined,
    yes: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--yes" || arg === "-y") {
      parsed.yes = true;
    } else if (arg === "--target") {
      parsed.targetDir = requireValue(argv, ++i, arg);
    } else if (arg === "--mode") {
      parsed.mode = requireValue(argv, ++i, arg);
    } else if (arg === "--manager") {
      parsed.manager = requireValue(argv, ++i, arg);
    } else if (arg === "--critic" || arg === "--critics") {
      parsed.critics = splitList(requireValue(argv, ++i, arg));
    } else if (arg === "--agent-instructions" || arg === "--agent-instruction") {
      parsed.agentInstructions = splitChoiceList(requireValue(argv, ++i, arg));
    } else if (arg === "--root-pointer" || arg === "--root-pointers") {
      parsed.agentInstructions = splitChoiceList(requireValue(argv, ++i, arg));
    } else if (arg === "--project-name") {
      parsed.projectName = requireValue(argv, ++i, arg);
    } else if (arg === "--project-id") {
      parsed.projectId = requireValue(argv, ++i, arg);
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return parsed;
}

function copyProjectSkills(skillRoot, targetSkillDir) {
  fs.mkdirSync(targetSkillDir, { recursive: true });
  for (const entry of fs.readdirSync(skillRoot, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) {
      continue;
    }
    fs.copyFileSync(
      path.join(skillRoot, entry.name),
      path.join(targetSkillDir, entry.name),
      fs.constants.COPYFILE_EXCL,
    );
  }
}

function createAgentInstructions({
  targetDir,
  adapterTemplateRoot,
  agentInstructions,
  appendAgentInstructions,
}) {
  const created = [];
  const configured = [];
  const updated = [];
  const skipped = [];
  const entrypoints = [];
  const appendFiles = new Set(appendAgentInstructions);

  for (const instruction of agentInstructions) {
    const fileName = AGENT_INSTRUCTION_FILES[instruction];
    if (!fileName) {
      throw new Error(`Unsupported agent instructions: ${instruction}`);
    }

    const targetPath = path.join(targetDir, fileName);
    if (fs.existsSync(targetPath)) {
      const existing = fs.readFileSync(targetPath, "utf8");
      if (hasResearchAgentEntrypoint(existing)) {
        configured.push(fileName);
        entrypoints.push(fileName);
      } else if (appendFiles.has(fileName)) {
        fs.appendFileSync(targetPath, formatAppendBlock(defaultPointerText()));
        updated.push(fileName);
        entrypoints.push(fileName);
      } else {
        skipped.push(fileName);
      }
      continue;
    }

    const templateName = `${fileName.replace(".md", "")}.pointer.md`;
    const templatePath = path.join(adapterTemplateRoot, templateName);
    const text = fs.existsSync(templatePath)
      ? fs.readFileSync(templatePath, "utf8")
      : defaultPointerText();

    fs.writeFileSync(targetPath, text);
    created.push(fileName);
    entrypoints.push(fileName);
  }

  return { created, configured, updated, skipped, entrypoints };
}

function renderProjectYaml({
  projectId,
  projectName,
  mode,
  today,
  manager,
  critics,
  rootEntryPoints,
}) {
  return [
    "project:",
    `  id: ${yamlScalar(projectId)}`,
    `  name: ${yamlScalar(projectName)}`,
    `  mode: ${yamlScalar(mode)}`,
    `  created: ${yamlScalar(today)}`,
    "",
    "manager:",
    `  current_owner: ${yamlScalar(manager)}`,
    "",
    "critics:",
    `  enabled: ${critics.length > 0 ? "true" : "false"}`,
    renderYamlList("  platforms", critics),
    "",
    "resources:",
    "  index: resources/index.md",
    "",
    "repos: []",
    "",
    "artifact_roots: []",
    "",
    "compute:",
    "  platforms: []",
    "",
    "adapters:",
    renderYamlList("  root_entrypoints", rootEntryPoints),
    "",
  ].join("\n");
}

function renderCurrentState({ today, mode, manager, critics }) {
  const criticText = critics.length > 0
    ? `Critic platforms enabled: ${critics.join(", ")}.`
    : "No critic platform is enabled yet.";

  return `---
type: current_state
updated: ${today}
---

# Current State

## Current Focus

orientation

## Snapshot

Atelier was initialized for this project in ${mode} mode. ${manager} is the active manager platform. ${criticText}

## Working Position

The research problem, resources, evaluation frame, and deliverable target have not been defined yet.

## Queue Snapshot

No active work packets or review packets.

## Blockers And Risks

None recorded during init.

## Next Moves

1. Run orientation with \`${PRIMARY_STATE_DIR}/skills/orient.md\`.
2. Fill the project brief enough to define the research question, resources, and initial evaluation frame.

## Recent Updates

${today}: Initialized \`${PRIMARY_STATE_DIR}/\` in ${mode} mode with ${manager} as manager.
`;
}

function renderResearchLog({ today }) {
  return `# Research Log

## ${today}

- Initial Atelier control plane created.
`;
}

async function promptForMissing(answers, io) {
  const rl = readline.createInterface({
    input: io.stdin,
    output: io.stdout,
  });

  try {
    const targetDefault = answers.targetDir ?? process.cwd();
    const targetDir = await ask(rl, `Target folder [${targetDefault}]: `, targetDefault);
    const inferredName = answers.projectName ?? path.basename(path.resolve(targetDir));
    const projectName = await ask(rl, `Project name [${inferredName}]: `, inferredName);
    const projectId = await ask(rl, `Project id [${slugify(projectName)}]: `, slugify(projectName));
    const mode = await ask(rl, `Mode scholar/builder [${answers.mode ?? "scholar"}]: `, answers.mode ?? "scholar");
    const manager = normalizeRequired(
      await ask(rl, `Manager platform [${answers.manager ?? "codex"}]: `, answers.manager ?? "codex"),
      "manager",
    );
    const criticDefault = normalizeList(answers.critics ?? []).join(",");
    const criticInput = await ask(rl, `Critic platforms, comma-separated [${criticDefault || "none"}]: `, criticDefault);
    const agentInstructionInput = await ask(
      rl,
      `Agent instructions auto/codex/claude/both/none [${answers.agentInstructions ? normalizeList(answers.agentInstructions).join(",") : "auto"}]: `,
      answers.agentInstructions ? normalizeList(answers.agentInstructions).join(",") : "auto",
    );
    const agentInstructions = normalizeAgentInstructions(splitChoiceList(agentInstructionInput), { manager });
    const appendAgentInstructions = [];

    for (const fileName of unmanagedExistingAgentInstructionFiles(targetDir, agentInstructions)) {
      const answer = await ask(
        rl,
        `${fileName} exists without Atelier instructions. Append an Atelier block? yes/no [no]: `,
        "no",
      );
      if (["y", "yes"].includes(answer.trim().toLowerCase())) {
        appendAgentInstructions.push(fileName);
      }
    }

    return {
      ...answers,
      targetDir,
      projectName,
      projectId,
      mode,
      manager,
      critics: normalizeList(criticInput),
      agentInstructions,
      appendAgentInstructions,
    };
  } finally {
    rl.close();
  }
}

async function ask(rl, prompt, fallback) {
  const answer = await rl.question(prompt);
  return answer.trim() || fallback;
}

function printSummary(result, stream) {
  stream.write(`Initialized ${PROJECT_NAME} at ${result.root}\n`);
  stream.write(`Mode: ${result.mode}\n`);
  stream.write(`Manager: ${result.manager}\n`);
  stream.write(`Critics: ${result.critics.length ? result.critics.join(", ") : "none"}\n`);
  stream.write(`Agent instructions created: ${result.agentInstructionsCreated.length ? result.agentInstructionsCreated.join(", ") : "none"}\n`);
  if (result.agentInstructionsConfigured.length) {
    stream.write(`Agent instructions already configured: ${result.agentInstructionsConfigured.join(", ")}\n`);
  }
  if (result.agentInstructionsUpdated.length) {
    stream.write(`Agent instructions updated: ${result.agentInstructionsUpdated.join(", ")}\n`);
  }
  if (result.agentInstructionsSkipped.length) {
    stream.write(`Agent instructions skipped because files already exist without Atelier instructions: ${result.agentInstructionsSkipped.join(", ")}\n`);
  }
  stream.write(`Next: run orientation with ${PRIMARY_STATE_DIR}/skills/orient.md\n`);
  stream.write(`Note: review git/privacy policy before tracking ${PRIMARY_STATE_DIR}/ in public repos.\n`);
}

export function printHelp(stream) {
  stream.write(`Usage: atelier init [options]

Interactive by default. Flags are optional for automation.

Options:
  --target <path>             Target folder. Default: current directory.
  --mode <scholar|builder>    Project mode.
  --manager <platform>        Manager platform. Default: codex.
  --critic <list>             Comma-separated critic platforms.
  --agent-instructions <list> auto, none, codex, claude, or both. Default: auto.
  --project-name <name>       Project display name.
  --project-id <id>           Project id.
  --yes, -y                   Use defaults for omitted answers.
  --help, -h                  Show this help.
`);
}

export function normalizeAgentInstructions(values, { manager }) {
  if (Array.isArray(values) && values.length === 0) {
    return [];
  }
  const list = normalizeChoiceList(values);
  if (list.includes("none")) {
    return [];
  }
  const expanded = list.length ? list : ["auto"];
  return unique(expanded.flatMap((value) => {
    if (value === "auto") {
      return AGENT_INSTRUCTION_FILES[manager] ? [manager] : [];
    }
    return value === "both" ? ["codex", "claude"] : [value];
  }));
}

export function normalizeAgentInstructionFiles(values) {
  return unique(normalizeList(values).map((value) => AGENT_INSTRUCTION_FILES[value] ?? value));
}

export function unmanagedExistingAgentInstructionFiles(targetDir, agentInstructions) {
  return agentInstructions
    .map((instruction) => AGENT_INSTRUCTION_FILES[instruction])
    .filter(Boolean)
    .filter((fileName) => {
      const targetPath = path.join(targetDir, fileName);
      return fs.existsSync(targetPath)
        && !hasResearchAgentEntrypoint(fs.readFileSync(targetPath, "utf8"));
    });
}

export function hasResearchAgentEntrypoint(text) {
  return text.includes(PRIMARY_ENTRYPOINT) || text.includes(LEGACY_ENTRYPOINT);
}

function formatAppendBlock(text) {
  return `\n\n${text.trim()}\n`;
}

function unique(values) {
  return [...new Set(values)];
}

function normalizeList(values) {
  if (values == null) {
    return [];
  }
  if (Array.isArray(values)) {
    return values.flatMap((value) => splitList(String(value)));
  }
  return splitList(String(values));
}

function splitList(value) {
  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .filter((item) => item !== "none");
}

function normalizeChoiceList(values) {
  if (values == null) {
    return [];
  }
  if (Array.isArray(values)) {
    return values.flatMap((value) => splitChoiceList(String(value)));
  }
  return splitChoiceList(String(values));
}

function splitChoiceList(value) {
  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function validateMode(mode) {
  const normalized = String(mode).trim().toLowerCase();
  if (!["scholar", "builder"].includes(normalized)) {
    throw new Error(`Mode must be "scholar" or "builder", got "${mode}".`);
  }
  return normalized;
}

function normalizeRequired(value, label) {
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) {
    throw new Error(`${label} is required.`);
  }
  return normalized;
}

export function slugify(value) {
  const slug = String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "atelier-project";
}

function renderYamlList(key, values) {
  if (!values.length) {
    return `${key}: []`;
  }
  return [key + ":", ...values.map((value) => `  - ${yamlScalar(value)}`)].join("\n");
}

function yamlScalar(value) {
  const text = String(value);
  if (/^[a-zA-Z0-9_./-]+$/.test(text)) {
    return text;
  }
  return JSON.stringify(text);
}

function assertDirectory(dir, label) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new Error(`Missing ${label}: ${dir}`);
  }
}

function requireValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

function defaultPointerText() {
  return `## ${PROJECT_NAME}

This project uses \`${PRIMARY_STATE_DIR}/\` as canonical Atelier state.

Read \`${PRIMARY_ENTRYPOINT}\` before acting as manager, worker, or critic.
`;
}

function existingStateRoot(targetDir) {
  for (const stateDir of STATE_DIRS) {
    const candidate = path.join(targetDir, stateDir);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function renameEntrypoint(root) {
  const legacyPath = path.join(root, LEGACY_ENTRYPOINT_FILE);
  const primaryPath = path.join(root, ENTRYPOINT_FILE);
  if (fs.existsSync(legacyPath) && !fs.existsSync(primaryPath)) {
    fs.renameSync(legacyPath, primaryPath);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    process.stderr.write(`atelier init failed: ${error.message}\n`);
    process.exit(1);
  });
}
