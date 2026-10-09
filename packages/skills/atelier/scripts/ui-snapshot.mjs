import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import yaml from "js-yaml";

import { findProjectStateRoot } from "./protocol.mjs";

const CLOSED_LIMIT = 6;
const ACTIVE_STALE_HOURS = 48;
const REPORTED_WAITING_HOURS = 24;

export function loadProjectSnapshot(options = {}) {
  const now = options.now ?? new Date();
  const projectRoot = findProjectStateRoot(options.targetDir ?? process.cwd());
  const projectDir = path.dirname(projectRoot);
  const warnings = [];
  const projectYaml = readRequiredYaml(path.join(projectRoot, "project.yaml"), "project.yaml");
  const currentFile = readMarkdown(projectRoot, "state/current.md", warnings);
  const briefFile = readMarkdown(projectRoot, "briefs/project.md", warnings);
  const workIndex = readIndex(projectRoot, "work/index.yaml", warnings);
  const reviewIndex = readIndex(projectRoot, "reviews/index.yaml", warnings);
  const evidenceIndex = readIndex(projectRoot, "evidence/index.yaml", warnings);
  const claimsIndex = readIndex(projectRoot, "claims/index.yaml", warnings);

  const workItems = enrichQueueItems({
    root: projectRoot,
    indexItems: workIndex,
    queueType: "work",
    now,
    warnings,
  });
  const reviewItems = enrichQueueItems({
    root: projectRoot,
    indexItems: reviewIndex,
    queueType: "reviews",
    now,
    warnings,
  });
  const evidenceItems = enrichIndexedRecords({
    root: projectRoot,
    indexItems: evidenceIndex,
    recordType: "evidence",
    warnings,
  });
  const claimItems = enrichIndexedRecords({
    root: projectRoot,
    indexItems: claimsIndex,
    recordType: "claims",
    warnings,
  });
  const artifacts = collectArtifacts({
    workItems,
    reviewItems,
    evidenceItems,
  });

  const current = currentFromMarkdown(currentFile);
  const work = groupQueueItems(workItems);
  const reviews = groupQueueItems(reviewItems);

  return {
    schemaVersion: 1,
    generatedAt: now.toISOString(),
    projectDir,
    projectStateRoot: projectRoot,
    researchAgentRoot: projectRoot,
    warnings,
    project: projectFromYaml(projectYaml),
    current,
    health: {
      activeWork: work.active.length,
      reportedWork: work.reported.length,
      pendingWork: work.pending.length,
      staleWork: work.active.filter((item) => item.stale).length,
      waitingResolution: work.reported.filter((item) => item.waitingForResolution).length,
      blockers: countMeaningfulLines(current.blockers),
      pendingReviews: reviews.pending.length,
      activeReviews: reviews.active.length,
      reportedReviews: reviews.reported.length,
      evidence: evidenceItems.length,
      claims: claimItems.length,
    },
    work,
    reviews,
    brief: {
      path: "briefs/project.md",
      sections: briefFile.sections,
    },
    evidence: evidenceItems,
    claims: claimItems,
    artifacts,
    logs: {
      researchLog: filePointer(projectRoot, "logs/research-log.md"),
      decisions: filePointer(projectRoot, "logs/decisions.md"),
    },
  };
}

export function findResearchAgentRoot(startDir) {
  return findProjectStateRoot(startDir);
}

function projectFromYaml(data) {
  const project = data.project ?? {};
  const critics = data.critics ?? {};
  const compute = data.compute ?? {};

  return {
    id: stringify(project.id),
    name: stringify(project.name),
    mode: stringify(project.mode),
    created: stringify(project.created),
    manager: stringify(data.manager?.current_owner),
    critics: {
      enabled: Boolean(critics.enabled),
      platforms: arrayOfStrings(critics.platforms),
    },
    repos: arrayOfStrings(data.repos),
    artifactRoots: arrayOfStrings(data.artifact_roots),
    compute: {
      platforms: arrayOfStrings(compute.platforms),
    },
    adapters: {
      rootEntrypoints: arrayOfStrings(data.adapters?.root_entrypoints),
    },
  };
}

function currentFromMarkdown(file) {
  const sections = file.sections;
  return {
    path: "state/current.md",
    updated: stringify(file.frontmatter.updated),
    focus: firstParagraph(sections["Current Focus"]),
    snapshot: sectionText(sections.Snapshot),
    workingPosition: sectionText(sections["Working Position"]),
    queueSnapshot: sectionText(sections["Queue Snapshot"]),
    blockers: sectionText(sections["Blockers And Risks"]),
    nextMoves: listItems(sections["Next Moves"]),
    recentUpdates: listItems(sections["Recent Updates"]),
    sections,
  };
}

function enrichQueueItems({ root, indexItems, queueType, now, warnings }) {
  return indexItems.map((indexItem) => {
    const itemPath = stringify(indexItem.path) || fallbackQueuePath(queueType, indexItem);
    const absolutePath = path.join(root, itemPath);
    const packet = readMarkdown(root, path.join(itemPath, "packet.md"), warnings, { optional: true });
    const progress = readMarkdown(root, path.join(itemPath, "progress.md"), warnings, { optional: true });
    const report = readMarkdown(root, path.join(itemPath, "report.md"), warnings, { optional: true });
    const resolution = readMarkdown(root, path.join(itemPath, "resolution.md"), warnings, { optional: true });
    const packetData = packet.exists ? packet.frontmatter : {};
    const merged = {
      ...indexItem,
      ...packetData,
    };
    const status = stringify(merged.status) || statusFromPath(itemPath);
    const reportedAt = dateFromValue(report.frontmatter.reported)
      ?? dateFromValue(merged.reported)
      ?? fileModifiedDate(report.absolutePath)
      ?? dateFromValue(merged.updated);
    const stale = status === "active" && isActiveStale({ absolutePath, progress, now });
    const waitingForResolution = status === "reported"
      && !resolution.exists
      && olderThan(reportedAt, now, REPORTED_WAITING_HOURS);

    return {
      id: stringify(merged.id),
      title: stringify(merged.title) || stringify(indexItem.title) || stringify(merged.id),
      status,
      kind: stringify(merged.kind ?? merged.review_type),
      priority: stringify(merged.priority),
      owner: stringify(merged.owner),
      path: itemPath,
      updated: stringify(merged.updated),
      stale,
      waitingForResolution,
      progress: progress.exists ? {
        path: path.join(itemPath, "progress.md"),
        updated: stringify(progress.frontmatter.updated),
        runStatus: stringify(progress.frontmatter.run_status),
        eta: stringify(progress.frontmatter.eta),
        summary: firstParagraph(progress.sections["Current State"]),
      } : null,
      report: report.exists ? {
        path: path.join(itemPath, "report.md"),
        outcome: stringify(report.frontmatter.outcome),
        reported: stringify(report.frontmatter.reported),
        summary: firstParagraph(report.sections.Summary),
      } : null,
      resolution: resolution.exists ? {
        path: path.join(itemPath, "resolution.md"),
        updated: stringify(resolution.frontmatter.updated),
        summary: firstParagraph(resolution.sections.Summary ?? resolution.sections["Accepted Read"]),
      } : null,
      artifacts: [
        ...artifactPointersFromMarkdown(progress, { sourceType: queueType, sourceId: stringify(merged.id), sourcePath: path.join(itemPath, "progress.md") }),
        ...artifactPointersFromMarkdown(report, { sourceType: queueType, sourceId: stringify(merged.id), sourcePath: path.join(itemPath, "report.md") }),
        ...artifactPointersFromMarkdown(resolution, { sourceType: queueType, sourceId: stringify(merged.id), sourcePath: path.join(itemPath, "resolution.md") }),
      ],
    };
  });
}

function enrichIndexedRecords({ root, indexItems, recordType, warnings }) {
  return indexItems.map((indexItem) => {
    const itemPath = stringify(indexItem.path) || `${recordType}/${stringify(indexItem.id)}.md`;
    const file = readMarkdown(root, itemPath, warnings, { optional: true });
    const merged = file.exists ? { ...indexItem, ...file.frontmatter } : indexItem;

    return {
      id: stringify(merged.id),
      title: stringify(merged.title) || stringify(merged.id),
      status: stringify(merged.status),
      path: itemPath,
      updated: stringify(merged.updated),
      claimKind: stringify(merged.claim_kind),
      supportLevel: stringify(merged.support_level),
      evidenceKind: stringify(merged.evidence_kind),
      strength: stringify(merged.strength),
      deliverableUse: stringify(merged.deliverable_use),
      evidenceLinks: arrayOfStrings(merged.evidence_links),
      claimLinks: arrayOfStrings(merged.claim_links),
      sourceWork: stringify(merged.source_work),
      artifacts: artifactPointersFromMarkdown(file, {
        sourceType: recordType,
        sourceId: stringify(merged.id),
        sourcePath: itemPath,
      }),
    };
  });
}

function groupQueueItems(items) {
  const pending = [];
  const active = [];
  const reported = [];
  const closed = [];

  for (const item of items) {
    if (item.status === "active") {
      active.push(item);
    } else if (item.status === "reported") {
      reported.push(item);
    } else if (item.status === "closed") {
      closed.push(item);
    } else {
      pending.push(item);
    }
  }

  return {
    pending: sortByUpdatedDesc(pending),
    active: sortByUpdatedDesc(active),
    reported: sortByUpdatedDesc(reported),
    closedRecent: sortByUpdatedDesc(closed).slice(0, CLOSED_LIMIT),
    all: sortByUpdatedDesc(items),
  };
}

function collectArtifacts({ workItems, reviewItems, evidenceItems }) {
  const seen = new Set();
  const artifacts = [];
  for (const item of [...workItems, ...reviewItems, ...evidenceItems]) {
    for (const artifact of item.artifacts ?? []) {
      const key = `${artifact.sourcePath}:${artifact.path}`;
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      artifacts.push({
        ...artifact,
        sourceTitle: item.title,
      });
    }
  }
  return artifacts.slice(0, 24);
}

function artifactPointersFromMarkdown(file, source) {
  if (!file.exists) {
    return [];
  }
  const values = [
    ...frontmatterArtifactValues(file.frontmatter),
    ...textArtifactValues(file.body),
  ];
  return unique(values).map((artifactPath) => ({
    path: artifactPath,
    ...source,
  }));
}

function frontmatterArtifactValues(frontmatter) {
  const keys = [
    "artifact",
    "artifacts",
    "artifact_path",
    "artifact_paths",
    "source_artifact",
    "source_artifacts",
    "expected_artifacts",
  ];
  return keys.flatMap((key) => arrayOfStrings(frontmatter[key]));
}

function textArtifactValues(text) {
  const values = [];
  const markdownLinkPattern = /\[[^\]]*]\(([^)\s]+)\)/g;
  const backtickPattern = /`([^`]+)`/g;
  const pathPattern = /(?:^|[\s([{])((?:\.{1,2}\/|[A-Za-z0-9_.@=-]+\/)[A-Za-z0-9_./@=:+-]*[A-Za-z0-9_@=:+-](?:\.[A-Za-z0-9]+)?)/g;

  for (const match of text.matchAll(markdownLinkPattern)) {
    values.push(cleanArtifactValue(match[1]));
  }
  for (const match of text.matchAll(backtickPattern)) {
    if (looksLikeArtifactPath(match[1])) {
      values.push(cleanArtifactValue(match[1]));
    }
  }
  for (const match of text.matchAll(pathPattern)) {
    values.push(cleanArtifactValue(match[1]));
  }
  return values.filter(looksLikeArtifactPath);
}

function cleanArtifactValue(value) {
  return String(value)
    .trim()
    .replace(/[),.;:]+$/g, "");
}

function looksLikeArtifactPath(value) {
  if (!value) {
    return false;
  }
  if (/^https?:\/\//.test(value)) {
    return true;
  }
  if (!value.includes("/")) {
    return false;
  }
  return !value.startsWith(".atelier/skills/")
    && !value.startsWith(".research-agent/skills/");
}

function readRequiredYaml(filePath, label) {
  try {
    return yaml.load(fs.readFileSync(filePath, "utf8")) ?? {};
  } catch (error) {
    throw new Error(`Could not read ${label}: ${error.message}`);
  }
}

function readIndex(root, relativePath, warnings) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    return [];
  }
  try {
    const parsed = yaml.load(fs.readFileSync(absolutePath, "utf8")) ?? {};
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch (error) {
    warnings.push(`Could not parse ${relativePath}: ${error.message}`);
    return [];
  }
}

function readMarkdown(root, relativePath, warnings, options = {}) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    if (!options.optional) {
      warnings.push(`Missing ${relativePath}.`);
    }
    return emptyMarkdown(relativePath, absolutePath);
  }

  const text = fs.readFileSync(absolutePath, "utf8");
  const { frontmatter, body } = parseFrontmatter(text, relativePath, warnings);
  return {
    exists: true,
    relativePath,
    absolutePath,
    frontmatter,
    body,
    sections: extractSections(body),
  };
}

function parseFrontmatter(text, relativePath, warnings) {
  if (!text.startsWith("---\n")) {
    return { frontmatter: {}, body: text };
  }
  const end = text.indexOf("\n---", 4);
  if (end === -1) {
    warnings.push(`Could not parse frontmatter in ${relativePath}: closing marker missing.`);
    return { frontmatter: {}, body: text };
  }
  const raw = text.slice(4, end);
  try {
    return {
      frontmatter: yaml.load(raw) ?? {},
      body: text.slice(end + 4).replace(/^\n/, ""),
    };
  } catch (error) {
    warnings.push(`Could not parse frontmatter in ${relativePath}: ${error.message}`);
    return { frontmatter: {}, body: text.slice(end + 4).replace(/^\n/, "") };
  }
}

function extractSections(body) {
  const sections = {};
  let currentTitle = null;
  let currentLines = [];

  for (const line of body.split(/\r?\n/)) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      if (currentTitle) {
        sections[currentTitle] = currentLines.join("\n").trim();
      }
      currentTitle = match[1].trim();
      currentLines = [];
    } else if (currentTitle) {
      currentLines.push(line);
    }
  }

  if (currentTitle) {
    sections[currentTitle] = currentLines.join("\n").trim();
  }
  return sections;
}

function emptyMarkdown(relativePath, absolutePath) {
  return {
    exists: false,
    relativePath,
    absolutePath,
    frontmatter: {},
    body: "",
    sections: {},
  };
}

function isActiveStale({ absolutePath, progress, now }) {
  const progressDate = progress.exists ? fileModifiedDate(progress.absolutePath) : null;
  const folderDate = fileModifiedDate(absolutePath);
  const latest = maxDate([progressDate, folderDate]);
  return olderThan(latest, now, ACTIVE_STALE_HOURS);
}

function olderThan(date, now, hours) {
  if (!date) {
    return false;
  }
  return now.getTime() - date.getTime() > hours * 60 * 60 * 1000;
}

function maxDate(dates) {
  const valid = dates.filter(Boolean);
  if (!valid.length) {
    return null;
  }
  return new Date(Math.max(...valid.map((date) => date.getTime())));
}

function fileModifiedDate(filePath) {
  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }
  return fs.statSync(filePath).mtime;
}

function dateFromValue(value) {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function sortByUpdatedDesc(items) {
  return [...items].sort((left, right) => {
    const leftTime = dateFromValue(left.updated)?.getTime() ?? 0;
    const rightTime = dateFromValue(right.updated)?.getTime() ?? 0;
    return rightTime - leftTime;
  });
}

function filePointer(root, relativePath) {
  return fs.existsSync(path.join(root, relativePath)) ? relativePath : null;
}

function fallbackQueuePath(queueType, item) {
  const status = stringify(item.status) || "pending";
  return `${queueType}/${status}/${stringify(item.id)}`;
}

function statusFromPath(itemPath) {
  if (itemPath.includes("/active/")) {
    return "active";
  }
  if (itemPath.includes("/reported/")) {
    return "reported";
  }
  if (itemPath.includes("/closed/")) {
    return "closed";
  }
  return "pending";
}

function firstParagraph(text) {
  return sectionText(text).split(/\n\s*\n/).map((line) => line.trim()).filter(Boolean)[0] ?? "";
}

function sectionText(text) {
  return String(text ?? "").trim();
}

function listItems(text) {
  return sectionText(text)
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, ""))
    .filter(Boolean);
}

function countMeaningfulLines(text) {
  const normalized = sectionText(text);
  if (!normalized || /^none\b/i.test(normalized)) {
    return 0;
  }
  return Math.max(1, listItems(normalized).length);
}

function arrayOfStrings(value) {
  if (value == null) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.map(stringify).filter(Boolean);
  }
  return [stringify(value)].filter(Boolean);
}

function stringify(value) {
  if (value == null) {
    return "";
  }
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
