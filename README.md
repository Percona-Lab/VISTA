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

### Cowork / Claude Desktop
VISTA is in the **percona-lab** plugin marketplace. Go to **Plugins** > find VISTA under percona-lab > Install.

Alternatively, download `vista-plugin.zip` from the [latest release](https://github.com/Percona-Lab/VISTA/releases/latest) and upload via **Plugins > Personal > Upload plugin**.

### Claude Code
Auto-installed from the percona-lab marketplace. Start asking questions.

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
