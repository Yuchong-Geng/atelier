#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

import { findProjectStateRoot } from "./protocol.mjs";
import { loadProjectSnapshot } from "./ui-snapshot.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PACKAGE_ROOT = path.resolve(__dirname, "..");
const DEFAULT_HOST = "127.0.0.1";

export async function main(argv = process.argv.slice(2), io = process) {
  const parsed = parseArgs(argv);
  const stream = io.stdout ?? process.stdout;

  if (parsed.help) {
    printHelp(stream);
    return;
  }

  if (parsed.command === "build") {
    const outFile = buildDashboard({
      targetDir: parsed.targetDir ?? process.cwd(),
      outFile: parsed.outFile,
      packageRoot: parsed.packageRoot ?? DEFAULT_PACKAGE_ROOT,
    });
    stream.write(`Wrote dashboard snapshot to ${outFile}\n`);
    return;
  }

  const server = await startServer({
    targetDir: parsed.targetDir ?? process.cwd(),
    host: parsed.host ?? DEFAULT_HOST,
    port: parsed.port,
    packageRoot: parsed.packageRoot ?? DEFAULT_PACKAGE_ROOT,
  });
  const address = server.address();
  const hostForUrl = address.address === "0.0.0.0" ? "localhost" : address.address;
  stream.write(`Atelier dashboard: http://${hostForUrl}:${address.port}\n`);
  stream.write("Press Ctrl+C to stop.\n");
}

export function buildDashboard({ targetDir = process.cwd(), outFile, packageRoot = DEFAULT_PACKAGE_ROOT } = {}) {
  const root = findProjectStateRoot(targetDir);
  const outputPath = path.resolve(outFile ?? path.join(root, "ui/dashboard.html"));
  const snapshot = loadProjectSnapshot({ targetDir });
  const html = renderStaticDashboard(snapshot, { packageRoot });

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, html);
  return outputPath;
}

export async function startServer({
  targetDir = process.cwd(),
  host = DEFAULT_HOST,
  port,
  packageRoot = DEFAULT_PACKAGE_ROOT,
} = {}) {
  findProjectStateRoot(targetDir);
  const assets = loadAssets(packageRoot);
  const explicitPort = port != null;
  const listenPort = explicitPort ? Number(port) : 0;

  const server = http.createServer((request, response) => {
    try {
      serveRequest({ request, response, targetDir, assets });
    } catch (error) {
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end(error.message);
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", (error) => {
      const suffix = explicitPort ? ` on ${host}:${listenPort}` : "";
      reject(new Error(`Could not start dashboard server${suffix}: ${error.message}`));
    });
    server.listen(listenPort, host, () => resolve(server));
  });
}

function serveRequest({ request, response, targetDir, assets }) {
  const url = new URL(request.url, "http://localhost");
  if (url.pathname === "/" || url.pathname === "/index.html") {
    send(response, 200, "text/html; charset=utf-8", assets.index);
    return;
  }
  if (url.pathname === "/styles.css") {
    send(response, 200, "text/css; charset=utf-8", assets.css);
    return;
  }
  if (url.pathname === "/app.js") {
    send(response, 200, "text/javascript; charset=utf-8", assets.js);
    return;
  }
  if (url.pathname === "/snapshot.json") {
    const snapshot = loadProjectSnapshot({ targetDir });
    send(response, 200, "application/json; charset=utf-8", JSON.stringify(snapshot, null, 2));
    return;
  }
  if (url.pathname === "/favicon.ico") {
    response.writeHead(204, { "cache-control": "public, max-age=86400" });
    response.end();
    return;
  }
  send(response, 404, "text/plain; charset=utf-8", "Not found\n");
}

function send(response, status, contentType, body) {
  response.writeHead(status, {
    "content-type": contentType,
    "cache-control": "no-store",
  });
  response.end(body);
}

function renderStaticDashboard(snapshot, { packageRoot }) {
  const assets = loadAssets(packageRoot);
  const snapshotJson = JSON.stringify(snapshot).replace(/<\/script/gi, "<\\/script");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Atelier Dashboard</title>
    <link rel="icon" href="data:,">
    <style>
${assets.css}
    </style>
  </head>
  <body>
    <main id="atelier-dashboard" aria-live="polite">
      <div class="loading">Loading dashboard...</div>
    </main>
    <script>window.__ATELIER_SNAPSHOT__ = ${snapshotJson};</script>
    <script>
${assets.js}
    </script>
  </body>
</html>
`;
}

function loadAssets(packageRoot) {
  const uiRoot = path.join(packageRoot, "assets/ui");
  return {
    index: fs.readFileSync(path.join(uiRoot, "index.html"), "utf8"),
    css: fs.readFileSync(path.join(uiRoot, "styles.css"), "utf8"),
    js: fs.readFileSync(path.join(uiRoot, "app.js"), "utf8"),
  };
}

function parseArgs(argv) {
  const parsed = {
    command: "serve",
  };
  let index = 0;

  if (argv[index] === "build") {
    parsed.command = "build";
    index += 1;
  }

  for (; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--target") {
      parsed.targetDir = requireValue(argv, ++index, arg);
    } else if (arg === "--out") {
      parsed.outFile = requireValue(argv, ++index, arg);
    } else if (arg === "--host") {
      parsed.host = requireValue(argv, ++index, arg);
    } else if (arg === "--port") {
      parsed.port = Number(requireValue(argv, ++index, arg));
      if (!Number.isInteger(parsed.port) || parsed.port < 0) {
        throw new Error("--port must be a non-negative integer.");
      }
    } else if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else {
      throw new Error(`Unknown ui argument: ${arg}`);
    }
  }

  return parsed;
}

function requireValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }
  return value;
}

export function printHelp(stream) {
  stream.write(`Usage: atelier ui [options]
       atelier ui build [options]

Options:
  --target <path>   Project folder. Default: current directory.
  --host <host>     Host for live server. Default: 127.0.0.1.
  --port <port>     Port for live server. Default: any available port.
  --out <path>      Static build output path.
  --help, -h        Show this help.
`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    process.stderr.write(`atelier ui failed: ${error.message}\n`);
    process.exit(1);
  });
}
