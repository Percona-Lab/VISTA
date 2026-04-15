# VISTA

**Visualized Intelligence from Sources, Trends & Analysis**

A Claude plugin for Percona business and engineering metrics. Ask questions in natural language, get interactive dashboards with live data.

## What's live now (v1)

**Engineering Visibility** — cross-team visibility into what every product team is working on, powered by live Jira data. No dashboards to build, no Jira filters to maintain. Just ask.

| Report | Try this prompt |
|---|---|
| **Team Status Dashboard** | "What's the MySQL team working on?" |
| **Cross-Team Communication Feed** | "What shipped this week across Percona?" |
| **Workload & Capacity** | "How loaded is the MySQL team?" |
| **Cross-Team Dependencies** | "Where are teams waiting on each other?" |

Each report includes summary cards, interactive charts (Recharts or Chart.js), key findings, and data source attribution. Say "generate html" for a shareable file you can email or open in a browser.

## Installation

VISTA has two components — a **plugin** (skill + report logic) and a **data MCP** (telemetry + download access) — plus it relies on your workspace connectors for Jira, Notion, and Slack data. Install all three layers:

### 1. Install the plugin

**Cowork (recommended)** — download `vista-plugin.zip` from the [latest release](https://github.com/Percona-Lab/VISTA/releases/latest), then go to **Plugins > Personal > + > Upload plugin**.

**Claude Code** — auto-installed from the percona-lab marketplace.

> **Note:** Plugins are not available in Claude Desktop Chat mode. Use Cowork or Claude Code.

### 2. Install the data MCP (for telemetry + downloads)

Download `vista-data.mcpb` from the [latest release](https://github.com/Percona-Lab/VISTA/releases/latest) and open it. Works in both **Cowork** and **Claude Desktop**. Requires the Percona VPN for the default (remote) mode. If you skip this step, Jira / Notion / Slack reports still work, but ClickHouse and Elasticsearch queries will not.

### 3. Enable workspace connectors

VISTA depends on live connectors for most of its reports. Enable these in your workspace settings **before using VISTA**, or reports will return empty or stop with a "connector not available" message:

| Connector | Required for | Where to enable |
|---|---|---|
| **Atlassian (Jira)** | Engineering Visibility reports — team status, workload, dependencies, what shipped | Cowork: **Connectors > Atlassian** (log into `perconadev.atlassian.net`). Claude Code: Atlassian MCP. |
| **Notion** | Data catalog lookups, Jira sync fallback, weekly team status highlights | Cowork: **Connectors > Notion** (log into the Percona workspace). Claude Code: Notion MCP. |
| **Slack** | Signal detection, team sentiment, highlight summaries | Cowork: **Connectors > Slack** (log into the Percona workspace). Claude Code: Slack MCP. |
| **Google Drive** (optional) | Pulling linked docs and shared analysis referenced in reports | Cowork: **Connectors > Google Drive**. |
| **percona-dk** (optional) | Verifying feature/component/extension names against Percona docs | Install the `percona-dk` MCP — without it, VISTA shows a warning banner on reports that filter on named features. |

After enabling connectors, reopen VISTA and run a quick sanity query (e.g., "what is the MySQL team working on?") to confirm everything is wired up.

## Data Sources

| Source | Status | Powers |
|---|---|---|
| Jira | **Live** | Engineering Visibility reports (team status, workload, dependencies, completions) |
| Notion Data Catalog | **Live** | Metric definitions, formulas, ownership, segmentation |
| Slack | **Live** | Signal detection, team sentiment |
| Google Drive | **Live** | Reports, shared analysis |
| Salesforce | Planned (v2) | Pipeline, bookings, renewals |
| ServiceNow | Planned (v2) | Support tickets, SLAs |
| Clickhouse | Planned (v2) | Download stats, telemetry |
| PostHog | Planned (v2) | Docs analytics |

## Roadmap

**v1 — Engineering Visibility** (live)
4 reports from live Jira data. Team status, workload, dependencies, cross-team feed.

**v2 — Business Analytics**
22 additional report types across Sales, Customer Success, Product, Delivery Ops, and Cross-Functional. Waiting on Salesforce, ServiceNow, and Clickhouse MCP connectors.

**v3 — Customer Telemetry Portal**
Public-facing branch with read-only access to anonymized Clickhouse telemetry. Customers query download trends, version adoption, feature usage, and deployment patterns in natural language. No internal data exposed.

## Report Catalog (26 total)

### Engineering Visibility (v1 — live)
Team Status Dashboard, Cross-Team Dependencies, Workload & Capacity, Cross-Team Communication Feed

### Sales & Revenue (v2)
Pipeline Snapshot, Bookings Trend, Win/Loss Analysis, Renewal Forecast, ACV Distribution, SAL Conversion

### Customer Success (v2)
Churn Risk Dashboard, NPS Trend, Support Load, Customer Health Score, TAM Utilization

### Product & Engineering (v2)
Feature Demand, Download Trends, Telemetry Adoption, Engineering Velocity, Version Adoption

### Delivery Ops (v2)
Resource Utilization, Project Status, Time Tracking

### Cross-Functional (v2)
Executive Summary, Regional Performance, Product Line P&L

## Plugin Structure

```
VISTA/
  .claude-plugin/
    plugin.json
  skills/
    vista/
      SKILL.md                        # Main skill logic
      references/
        engineering-visibility.md     # JQL patterns, layouts, data processing
        data-catalog-schema.md        # Notion catalog schema snapshot
        chart-templates.md            # React + HTML chart templates
  README.md
  CLAUDE.md
  .gitignore
```

## Part of the Alpine Toolkit

IBEX | PACK | MYNAH | BINER | SHERPA | **VISTA** | CAIRN | ECHO
