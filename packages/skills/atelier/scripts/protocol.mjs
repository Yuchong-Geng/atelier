import fs from "node:fs";
import path from "node:path";

export const PROJECT_NAME = "Atelier";
export const PRIMARY_STATE_DIR = ".atelier";
export const LEGACY_STATE_DIR = ".research-agent";
export const ENTRYPOINT_FILE = "ATELIER.md";
export const LEGACY_ENTRYPOINT_FILE = "RESEARCH_AGENT.md";
export const PRIMARY_ENTRYPOINT = `${PRIMARY_STATE_DIR}/${ENTRYPOINT_FILE}`;
export const LEGACY_ENTRYPOINT = `${LEGACY_STATE_DIR}/${LEGACY_ENTRYPOINT_FILE}`;
export const STATE_DIRS = [PRIMARY_STATE_DIR, LEGACY_STATE_DIR];

export function findProjectStateRoot(startDir) {
  let current = path.resolve(startDir);
  if (STATE_DIRS.includes(path.basename(current)) && isDirectory(current)) {
    return current;
  }

  while (true) {
    for (const stateDir of STATE_DIRS) {
      const candidate = path.join(current, stateDir);
      if (isDirectory(candidate)) {
        return candidate;
      }
    }
    const parent = path.dirname(current);
    if (parent === current) {
      throw new Error(`No ${PRIMARY_STATE_DIR}/ or ${LEGACY_STATE_DIR}/ directory found from ${path.resolve(startDir)}.`);
    }
    current = parent;
  }
}

function isDirectory(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();
}
