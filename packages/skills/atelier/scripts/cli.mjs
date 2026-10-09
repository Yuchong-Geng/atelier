#!/usr/bin/env node

import process from "node:process";
import { pathToFileURL } from "node:url";

import { main as initMain } from "./init.mjs";
import { main as uiMain } from "./ui.mjs";

export async function runCli(argv = process.argv.slice(2), io = process) {
  const [command, ...rest] = argv;

  if (!command || command === "--help" || command === "-h") {
    printHelp(io.stdout ?? process.stdout);
    return;
  }

  if (command === "init") {
    await initMain(rest, io);
    return;
  }

  if (command === "ui") {
    await uiMain(rest, io);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

function printHelp(stream) {
  stream.write(`Usage: atelier <command> [options]

Commands:
  atelier init     Initialize .atelier/ in a project.
  atelier ui       View a read-only project dashboard.

Run "atelier init --help" or "atelier ui --help" for command options.
`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch((error) => {
    process.stderr.write(`atelier failed: ${error.message}\n`);
    process.exit(1);
  });
}
