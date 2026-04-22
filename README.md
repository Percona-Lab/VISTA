# VISTA

**Visualized Intelligence from Sources, Trends & Analysis**

A Claude plugin for Percona business and engineering metrics. Ask questions in natural language, get interactive dashboards with live data.

## What's live now

**Engineering Visibility** — cross-team visibility into what every product team is working on, powered by live Jira data.

| Report | Try this prompt |
|---|---|
| **Team Status Dashboard** | "What's the MySQL team working on?" |
| **Cross-Team Communication Feed** | "What shipped this week across Percona?" |
| **Workload & Capacity** | "How loaded is the MySQL team?" |
| **Cross-Team Dependencies** | "Where are teams waiting on each other?" |

**Telemetry & Download Analytics** — live ClickHouse + Elasticsearch data for product adoption and download trends (requires the vista-data MCP + VPN).

| Report | Try this prompt |
|---|---|
| **Active instance summary** | "How many active instances of each product do we have?" |
| **Version distribution** | "What MySQL versions are deployed in production?" |
| **Download trends** | "How are MySQL downloads trending month over month?" |
| **Geographic distribution** | "Which countries download the most MongoDB packages?" |

**Cascade KPI Tracker** — goal-tracking dashboard with status badge, on-track projection vs target, and supporting signals.

| Report | Try this prompt |
|---|---|
| **MySQL Cascade KPI** | "Show me the MySQL Cascade KPI" (PS anchor + PXC supporting panel) |

Each report includes summary cards, interactive charts (Recharts or Chart.js), key findings, and data source attribution. Say "generate html" for a shareable file you can email or open in a browser.

## Installation

### Step 1 — Enable workspace connectors (required)

VISTA is a reporting layer on top of **your workspace's connectors**. Enable these in Cowork (**Connectors** sidebar) or in your Claude Code MCP config **before installing VISTA**, or every report will return empty.

| Connector | Required? | Powers |
|---|---|---|
| **Atlassian (Jira)** | **Required** | Every engineering report — team status, workload, dependencies, what shipped |
| **Notion** | **Required** | Data catalog lookups, Jira sync fallback, weekly team status highlights |
| **Slack** | **Required** | Highlights, signal detection, team sentiment |
| **Google Drive** | Optional | Pulling linked docs referenced in reports |
| **percona-dk** | Optional | Verifying feature/component/extension names against Percona docs (without it, VISTA shows a warning banner on reports that filter on named features) |

### Step 2 — Install the VISTA plugin (required)

**Cowork (recommended)** — in Cowork, go to **Customize > Personal plugins > + > Add marketplace**, enter `Percona-Lab/claude-plugins`, click **Sync**, then enable **Vista**. You'll get auto-updates.

**Claude Code** — auto-installed from the `Percona-Lab/claude-plugins` marketplace.

**Manual** — download `vista-plugin.zip` from the [latest release](https://github.com/Percona-Lab/VISTA/releases/latest) and upload via **Plugins > Personal > + > Upload plugin**.

> Plugins are not available in Claude Desktop Chat mode. Use Cowork or Claude Code.

### Step 3 — Install the data MCP (optional — only for telemetry/download reports, VPN required)

Skip this step unless you need ClickHouse/Elasticsearch data. Download `vista-data.mcpb` from the [latest release](https://github.com/Percona-Lab/VISTA/releases/latest) and open it. Works in both **Cowork** and **Claude Desktop**.

### Step 4 — Install the ServiceNow MCP (optional, prototype — only for support/SLA reports)

Skip this step unless you need support ticket or SLA data. Download `prototype-SN.mcpb` from the [latest release](https://github.com/Percona-Lab/VISTA/releases/latest) and open it. You'll be prompted for your Percona ServiceNow username and password (stored securely in the OS keychain). Works in both **Cowork** and **Claude Desktop**.

> This connector is an early prototype — the hostname is hardcoded to `perconadev.service-now.com` and tool coverage is limited to incidents, problems, change requests, service requests, and knowledge articles.

### Verify

Reopen VISTA and run a sanity query (e.g., "what is the MySQL team working on?").

## Data Sources

| Source | Status | Powers |
|---|---|---|
| Jira | **Live** | Engineering Visibility reports (team status, workload, dependencies, completions) |
| Notion Data Catalog | **Live** | Metric definitions, formulas, ownership, segmentation |
| Slack | **Live** | Signal detection, team sentiment |
| Google Drive | **Live** | Reports, shared analysis |
| Salesforce | Planned (v2) | Pipeline, bookings, renewals |
| ServiceNow | **Live** (optional MCP) | Support tickets, incidents, change requests, SLAs |
| Clickhouse | **Live** (optional MCP) | Download stats, telemetry |
| PostHog | Planned (v2) | Docs analytics |

## Roadmap

**v1 — Engineering Visibility** (live)
4 reports from live Jira data. Team status, workload, dependencies, cross-team feed.

**v1.5 — Telemetry & Download Analytics** (live)
ClickHouse + Elasticsearch via the vista-data MCP. Product adoption, version distribution, download trends, geographic breakdown.

**v1.6 — Cascade KPI Tracker** (live)
Goal-tracking dashboard. MySQL Cascade KPI ships with PS anchor + PXC supporting panel.

**v1.7 — ServiceNow integration** (prototype)
Optional MCP for support tickets, incidents, and change requests.

**v2 — Business Analytics**
22 additional report types across Sales, Customer Success, Product, Delivery Ops, and Cross-Functional. ClickHouse and ServiceNow MCPs are live; waiting on the Salesforce connector.

**v2.1 — Plugin Auto-Update** (planned)
Marketplace plugins currently require a manual resync to pick up new versions. Need auto-update or at least an update notification. Affects all Alpine Toolkit plugins.

**v3 — Customer Telemetry Portal**
Public-facing branch with read-only access to anonymized ClickHouse telemetry. Customers query download trends, version adoption, feature usage, and deployment patterns in natural language. No internal data exposed.

## Report Catalog

### Engineering Visibility (live)
Team Status Dashboard, Cross-Team Dependencies, Workload & Capacity, Cross-Team Communication Feed

### Product & Engineering — Telemetry (live)
Active Instance Summary, Version Distribution, Deployment Method Breakdown, Cloud Provider Distribution, CPU Architecture Split, Geographic Distribution, Instances-per-Host

### Product & Engineering — Downloads (live)
Downloads by Product, Downloads by Package Type, Version Adoption (downloads), Geographic Distribution, OS/Arch Breakdown, EOL Package Tracking, Monthly Trend

### Cascade KPI Tracker (live)
MySQL Cascade KPI (PS anchor + PXC supporting panel)

### Sales & Revenue (v2 — planned, waiting on Salesforce MCP)
Pipeline Snapshot, Bookings Trend, Win/Loss Analysis, Renewal Forecast, ACV Distribution, SAL Conversion

### Customer Success (v2 — partially live via ServiceNow prototype)
Churn Risk Dashboard, NPS Trend, Support Load, Customer Health Score, TAM Utilization

### Product & Engineering — Business Analytics (v2)
Feature Demand, Engineering Velocity

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
      SKILL.md                        # Main skill logic (report layouts, triggers)
      references/
        engineering-visibility.md     # JQL patterns, team/project mapping, layouts
        vista-data-dictionary.md      # ClickHouse + Elasticsearch schema + query templates
        cascade-kpi-mysql.md          # MySQL Cascade KPI queries + GSM framework
        chart-templates.md            # React + HTML chart templates
        data-catalog-schema.md        # Notion catalog schema snapshot
  README.md
  CLAUDE.md
  .gitignore
```

## Part of the Alpine Toolkit

IBEX | PACK | MYNAH | BINER | SHERPA | **VISTA** | CAIRN | ECHO
