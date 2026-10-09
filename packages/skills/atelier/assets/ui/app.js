(function () {
  const app = document.getElementById("atelier-dashboard");
  const staticSnapshot = window.__ATELIER_SNAPSHOT__ || window.__RESEARCH_AGENT_SNAPSHOT__;
  const state = {
    snapshot: staticSnapshot || null,
    tab: "brief",
    lastError: null,
  };

  const tabLabels = [
    ["brief", "Brief"],
    ["work", "Work"],
    ["evidence", "Evidence"],
    ["claims", "Claims"],
    ["reviews", "Reviews"],
    ["logs", "Logs"],
  ];

  function create(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    if (text != null) {
      element.textContent = text;
    }
    return element;
  }

  function append(parent, ...children) {
    for (const child of children) {
      if (child == null) {
        continue;
      }
      parent.append(child);
    }
    return parent;
  }

  function render() {
    app.replaceChildren();
    if (state.lastError && !state.snapshot) {
      append(app, create("div", "error-state", state.lastError));
      return;
    }
    if (!state.snapshot) {
      append(app, create("div", "loading", "Loading dashboard..."));
      return;
    }

    const shell = create("div", "shell");
    append(shell, renderHeader(state.snapshot));
    append(shell, renderHealthStrip(state.snapshot));
    append(shell, renderCockpit(state.snapshot));
    append(shell, renderTabs(state.snapshot));
    append(shell, renderFooter(state.snapshot));
    app.append(shell);
  }

  function renderHeader(snapshot) {
    const topbar = create("section", "topbar");
    const title = create("div", "project-title");
    append(title, create("h1", null, snapshot.project.name || "Research Project"));
    append(title, create("p", null, snapshot.current.focus || "No current focus recorded."));

    const meta = create("div", "meta-row");
    append(meta, metaPill(snapshot.project.mode || "mode unknown"));
    append(meta, metaPill(`manager ${snapshot.project.manager || "unknown"}`));
    append(meta, metaPill(`refreshed ${formatDateTime(snapshot.generatedAt)}`));
    if (snapshot.warnings && snapshot.warnings.length) {
      append(meta, metaPill(`${snapshot.warnings.length} warning${snapshot.warnings.length === 1 ? "" : "s"}`));
    }

    append(topbar, title, meta);
    return topbar;
  }

  function metaPill(text) {
    return create("span", "meta-pill", text);
  }

  function renderHealthStrip(snapshot) {
    const health = snapshot.health || {};
    const strip = create("section", "health-strip");
    append(strip,
      metric("Active", health.activeWork, "running or assigned", "is-blue"),
      metric("Reported", health.reportedWork, "awaiting manager read", health.waitingResolution ? "is-amber" : ""),
      metric("Blockers", health.blockers, "from current state", health.blockers ? "is-red" : ""),
      metric("Stale", health.staleWork, "active over 48h", health.staleWork ? "is-red" : ""),
      metric("Reviews", health.pendingReviews + health.activeReviews + health.reportedReviews, "open review items", ""),
      metric("Evidence", health.evidence, "indexed records", "is-green"),
      metric("Claims", health.claims, "indexed claims", ""),
    );
    return strip;
  }

  function metric(label, value, note, tone) {
    const box = create("div", `metric ${tone || ""}`.trim());
    append(box, create("div", "metric-label", label));
    append(box, create("span", "metric-value", String(value ?? 0)));
    append(box, create("div", "metric-note", note));
    return box;
  }

  function renderCockpit(snapshot) {
    const grid = create("section", "cockpit-grid");

    const left = create("div", "stack");
    append(left,
      panel("Current Focus", "from state/current.md", paragraph(snapshot.current.focus)),
      panel("Next Moves", "manager recommendation", orderedList(snapshot.current.nextMoves)),
    );

    const middle = create("div", "stack");
    append(middle, panel(
      "Active And Reported Work",
      `${snapshot.health.activeWork || 0} active · ${snapshot.health.reportedWork || 0} reported`,
      workList([...snapshot.work.active, ...snapshot.work.reported], { limit: 7 }),
    ));

    const right = create("div", "stack");
    append(right,
      panel("Blockers And Risks", "current state", paragraph(snapshot.current.blockers || "No blockers recorded.")),
      panel("Recent Artifacts", "explicit references only", artifactList(snapshot.artifacts, { limit: 5 }), "is-artifacts"),
    );

    append(grid, left, middle, right);
    return grid;
  }

  function panel(title, subtitle, body, extraClass) {
    const section = create("section", `panel ${extraClass || ""}`.trim());
    const header = create("div", "panel-header");
    append(header, create("h2", "panel-title", title));
    if (subtitle) {
      append(header, create("span", "panel-subtitle", subtitle));
    }
    append(section, header);
    append(section, append(create("div", "panel-body"), body));
    return section;
  }

  function paragraph(text) {
    if (!text) {
      return create("div", "empty", "No content recorded.");
    }
    return create("div", "prose", text);
  }

  function orderedList(items) {
    if (!items || !items.length) {
      return create("div", "empty", "No next moves recorded.");
    }
    const list = create("div", "list");
    items.forEach((item, index) => {
      const row = create("div", "list-item");
      append(row, create("div", "list-item-title", `${index + 1}. ${item}`));
      list.append(row);
    });
    return list;
  }

  function workList(items, options = {}) {
    const source = items || [];
    const visible = source.slice(0, options.limit || source.length);
    if (!visible.length) {
      return create("div", "empty", "No active or reported work.");
    }
    const list = create("div", "list");
    visible.forEach((item) => list.append(workItem(item)));
    return list;
  }

  function workItem(item) {
    const row = create("article", "list-item");
    const title = create("div", "list-item-title");
    append(title, create("span", null, `${item.id || "item"} · ${item.title || "Untitled"}`));
    append(title, statusPill(item));
    append(row, title);
    const details = [
      item.kind,
      item.owner && `owner ${item.owner}`,
      item.progress?.runStatus && `run ${item.progress.runStatus}`,
      item.waitingForResolution && "waiting for resolution",
      item.stale && "stale",
    ].filter(Boolean).join(" · ");
    append(row, create("div", "list-item-meta", details || item.path || ""));
    return row;
  }

  function statusPill(item) {
    if (item.stale) {
      return create("span", "status-pill is-stale", "stale");
    }
    if (item.waitingForResolution) {
      return create("span", "status-pill is-waiting", "waiting");
    }
    return create("span", `status-pill is-${item.status || "pending"}`, item.status || "pending");
  }

  function artifactList(artifacts, options = {}) {
    const source = artifacts || [];
    const visible = source.slice(0, options.limit || source.length);
    if (!visible.length) {
      return create("div", "empty", "No explicit artifacts referenced yet.");
    }
    const list = create("div", "list");
    visible.forEach((artifact) => {
      const row = create("div", "list-item");
      append(row, create("div", "list-item-title", artifact.path));
      append(row, create("div", "list-item-meta", `${artifact.sourceId || "source"} · ${artifact.sourceTitle || artifact.sourcePath || ""}`));
      list.append(row);
    });
    return list;
  }

  function renderTabs(snapshot) {
    const tabs = create("section", "tabs");
    const tabbar = create("div", "tabbar");
    tabLabels.forEach(([id, label]) => {
      const button = create("button", `tab-button ${state.tab === id ? "is-active" : ""}`.trim(), label);
      button.type = "button";
      button.addEventListener("click", () => {
        state.tab = id;
        render();
      });
      tabbar.append(button);
    });
    append(tabs, tabbar, append(create("div", "tab-panel"), renderTabPanel(snapshot)));
    return tabs;
  }

  function renderTabPanel(snapshot) {
    if (state.tab === "brief") {
      return sectionGrid(snapshot.brief?.sections || {});
    }
    if (state.tab === "work") {
      return append(create("div", "two-column"),
        sectionBlock("Pending", workList(snapshot.work.pending)),
        sectionBlock("Active", workList(snapshot.work.active)),
        sectionBlock("Reported", workList(snapshot.work.reported)),
        sectionBlock("Recently Closed", workList(snapshot.work.closedRecent)),
      );
    }
    if (state.tab === "evidence") {
      return recordList(snapshot.evidence, "strength", "deliverableUse");
    }
    if (state.tab === "claims") {
      return recordList(snapshot.claims, "supportLevel", "claimKind");
    }
    if (state.tab === "reviews") {
      return append(create("div", "two-column"),
        sectionBlock("Pending", workList(snapshot.reviews.pending)),
        sectionBlock("Active", workList(snapshot.reviews.active)),
        sectionBlock("Reported", workList(snapshot.reviews.reported)),
        sectionBlock("Recently Closed", workList(snapshot.reviews.closedRecent)),
      );
    }
    return sectionGrid({
      "Research Log": snapshot.logs?.researchLog || "No research log found.",
      "Decision Log": snapshot.logs?.decisions || "No decision log found.",
      Warnings: snapshot.warnings?.length ? snapshot.warnings.join("\n") : "No snapshot warnings.",
    });
  }

  function sectionGrid(sections) {
    const entries = Object.entries(sections || {});
    if (!entries.length) {
      return create("div", "empty", "No content recorded.");
    }
    const grid = create("div", "two-column");
    entries.forEach(([title, text]) => {
      append(grid, sectionBlock(title, create("div", "prose is-muted", text || "No content recorded.")));
    });
    return grid;
  }

  function sectionBlock(title, child) {
    const block = create("section", "section-block");
    append(block, create("h3", null, title), child);
    return block;
  }

  function recordList(items, primaryKey, secondaryKey) {
    if (!items || !items.length) {
      return create("div", "empty", "No records indexed.");
    }
    const list = create("div", "list");
    items.forEach((item) => {
      const row = create("article", "list-item");
      append(row, create("div", "list-item-title", `${item.id || "record"} · ${item.title || "Untitled"}`));
      append(row, create("div", "list-item-meta", [
        item.status,
        item[primaryKey],
        item[secondaryKey],
        item.path,
      ].filter(Boolean).join(" · ")));
      list.append(row);
    });
    return list;
  }

  function renderFooter(snapshot) {
    const footer = create("div", "footer-row");
    append(footer, create("span", null, snapshot.researchAgentRoot || ""));
    if (state.lastError) {
      append(footer, create("span", null, state.lastError));
    }
    return footer;
  }

  async function refreshSnapshot() {
    try {
      const response = await fetch("/snapshot.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Snapshot request failed with ${response.status}`);
      }
      state.snapshot = await response.json();
      state.lastError = null;
      render();
    } catch (error) {
      state.lastError = error.message;
      render();
    }
  }

  function formatDateTime(value) {
    if (!value) {
      return "unknown";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  render();
  if (!staticSnapshot) {
    refreshSnapshot();
    window.setInterval(refreshSnapshot, 3000);
  }
}());
