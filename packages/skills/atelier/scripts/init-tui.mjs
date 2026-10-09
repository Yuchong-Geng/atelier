#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import {
  AGENT_INSTRUCTION_FILES,
  hasResearchAgentEntrypoint,
  normalizeAgentInstructions,
  slugify,
  unmanagedExistingAgentInstructionFiles,
} from "./init.mjs";
import { PRIMARY_STATE_DIR, STATE_DIRS } from "./protocol.mjs";

const COMMON_PLATFORMS = ["codex", "claude"];

export async function collectInitOptions(initial = {}, prompts) {
  let current = {
    targetDir: initial.targetDir ?? process.cwd(),
    mode: initial.mode,
    manager: initial.manager ?? "codex",
    critics: initial.critics ?? [],
    agentInstructions: initial.agentInstructions,
    projectName: initial.projectName,
    projectId: initial.projectId,
    appendAgentInstructions: initial.appendAgentInstructions ?? [],
  };

  while (true) {
    current = await collectSections(current, prompts);
    const preview = renderPreview(current);
    prompts.output?.write(`${preview}\n`);

    const action = await prompts.select({
      message: "Final preview",
      choices: [
        { name: `Create ${PRIMARY_STATE_DIR}/`, value: "confirm" },
        { name: "Edit answers", value: "edit" },
        { name: "Cancel", value: "cancel" },
      ],
      default: "confirm",
    });

    if (action === "confirm") {
      return current;
    }
    if (action === "cancel") {
      throw new Error("Initialization cancelled.");
    }
  }
}

async function collectSections(current, prompts) {
  const targetDefault = current.targetDir ?? process.cwd();
  const targetDir = path.resolve(await prompts.input({
    message: "Target folder",
    default: targetDefault,
  }));
  const inferredName = current.projectName ?? path.basename(targetDir);
  const projectName = await prompts.input({
    message: "Project name",
    default: inferredName,
  });
  const projectId = await prompts.input({
    message: "Project id",
    default: current.projectId ?? slugify(projectName),
  });
  const mode = await prompts.select({
    message: "Project mode",
    choices: [
      { name: "scholar", value: "scholar" },
      { name: "builder", value: "builder" },
    ],
    default: current.mode ?? "scholar",
  });
  const manager = await selectPlatform(prompts, {
    message: "Manager platform",
    defaultValue: current.manager ?? "codex",
  });
  const critics = await prompts.checkbox({
    message: "Critic platforms",
    choices: platformChoices(current.critics ?? []),
  });
  const agentInstructions = normalizeAgentInstructions(await prompts.checkbox({
    message: "Root agent instructions",
    choices: instructionChoices(current.agentInstructions, manager),
  }), { manager });
  const appendAgentInstructions = [];

  for (const fileName of unmanagedExistingAgentInstructionFiles(targetDir, agentInstructions)) {
    const append = await prompts.confirm({
      message: `${fileName} exists without Atelier instructions. Append the standard block?`,
      default: false,
    });
    if (append) {
      appendAgentInstructions.push(fileName);
    }
  }

  return {
    ...current,
    targetDir,
    projectName,
    projectId: projectId.trim() || slugify(projectName),
    mode,
    manager,
    critics,
    agentInstructions,
    appendAgentInstructions,
  };
}

async function selectPlatform(prompts, { message, defaultValue }) {
  const value = await prompts.select({
    message,
    choices: [
      ...COMMON_PLATFORMS.map((platform) => ({ name: platform, value: platform })),
      { name: "Custom", value: "__custom__" },
    ],
    default: COMMON_PLATFORMS.includes(defaultValue) ? defaultValue : "__custom__",
  });

  if (value !== "__custom__") {
    return value;
  }

  const custom = await prompts.input({
    message: "Custom manager platform",
    default: defaultValue && !COMMON_PLATFORMS.includes(defaultValue) ? defaultValue : "",
  });
  const normalized = custom.trim().toLowerCase();
  if (!normalized) {
    throw new Error("manager is required.");
  }
  return normalized;
}

function platformChoices(selected) {
  const selectedSet = new Set(selected ?? []);
  return COMMON_PLATFORMS.map((platform) => ({
    name: platform,
    value: platform,
    checked: selectedSet.has(platform),
  }));
}

function instructionChoices(selected, manager) {
  const normalized = selected == null
    ? normalizeAgentInstructions("auto", { manager })
    : normalizeAgentInstructions(selected, { manager });
  const selectedSet = new Set(normalized);
  return COMMON_PLATFORMS.map((platform) => ({
    name: platform,
    value: platform,
    checked: selectedSet.has(platform),
  }));
}

export function renderPreview(options) {
  const root = path.join(options.targetDir, PRIMARY_STATE_DIR);
  const existingRoot = existingStateRoot(options.targetDir);
  const requestedFiles = requestedInstructionFiles(options.agentInstructions ?? []);
  const configured = requestedFiles.filter((fileName) => {
    const filePath = path.join(options.targetDir, fileName);
    return fs.existsSync(filePath)
      && hasResearchAgentEntrypoint(fs.readFileSync(filePath, "utf8"));
  });
  const unmanaged = unmanagedExistingAgentInstructionFiles(
    options.targetDir,
    options.agentInstructions ?? [],
  );
  const appendSet = new Set(options.appendAgentInstructions ?? []);
  const skipped = unmanaged.filter((fileName) => !appendSet.has(fileName));
  const create = requestedFiles.filter((fileName) => {
    const filePath = path.join(options.targetDir, fileName);
    return !fs.existsSync(filePath);
  });

  return [
    "",
    "Final preview",
    `  ${PRIMARY_STATE_DIR}/: ${root}`,
    `  Project: ${options.projectName} (${options.projectId})`,
    `  Mode: ${options.mode}`,
    `  Manager: ${options.manager}`,
    `  Critics: ${options.critics?.length ? options.critics.join(", ") : "none"}`,
    `  Root instruction files: ${requestedFiles.length ? requestedFiles.join(", ") : "none"}`,
    `  Files to create: ${create.length ? create.join(", ") : "none"}`,
    `  Already configured: ${configured.length ? configured.join(", ") : "none"}`,
    `  Existing files to append: ${options.appendAgentInstructions?.length ? options.appendAgentInstructions.join(", ") : "none"}`,
    `  Existing files to skip: ${skipped.length ? skipped.join(", ") : "none"}`,
    existingRoot
      ? `  Status: ${path.basename(existingRoot)}/ already exists. Init will refuse to overwrite it.`
      : "  Status: ready to create.",
  ].join("\n");
}

function requestedInstructionFiles(agentInstructions) {
  return agentInstructions
    .map((instruction) => AGENT_INSTRUCTION_FILES[instruction])
    .filter(Boolean);
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
