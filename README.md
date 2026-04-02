# VISTA

**Visualized Intelligence from Sources, Trends & Analysis**

A Claude plugin that turns Percona's data catalog into interactive business analysis reports with visual charts. Cross-functional coverage for Product, Sales, Customer Success, Engineering, Delivery Ops, and more.

## What it does

- Reads Percona's data catalog from Notion to understand what metrics exist and where they come from
- Queries live MCP connectors (Jira, Slack, Google Drive today; Salesforce, ServiceNow, Clickhouse planned) for real-time data
- Generates 22+ standard report types with interactive React charts (Cowork) or HTML charts (shareable)
- Natural language queries: "How's our pipeline looking?" or "Show me MySQL download trends"

## Installation

### One-liner (Claude Code / Cowork)
```
Install this plugin: https://github.com/Percona-Lab/VISTA
```

### Manual
```bash
git clone https://github.com/Percona-Lab/VISTA.git
cp -r VISTA/.claude-plugin ~/.claude/plugins/vista/
cp -r VISTA/skills ~/.claude/plugins/vista/
```

## Data Sources

VISTA reads the Notion data catalog as its primary source of truth for what metrics exist. As MCP connectors are added, VISTA queries upstream systems directly:

| Source System | Status | Data |
|---|---|---|
| Notion | Live | Catalog metadata, page content |
| Jira | Live | Engineering velocity, bugs, sprints |
| Slack | Live | Signal detection, team sentiment |
| Google Drive | Live | Reports, shared analysis |
| Salesforce | Planned | Pipeline, bookings, renewals |
| ServiceNow | Planned | Support tickets, SLAs |
| Clickhouse | Planned | Download stats, telemetry |
| PostHog | Planned | Docs analytics |

## Report Catalog

### Sales & Revenue
Pipeline Snapshot, Bookings Trend, Win/Loss Analysis, Renewal Forecast, ACV Distribution, SAL Conversion

### Customer Success
Churn Risk Dashboard, NPS Trend, Support Load, Customer Health Score, TAM Utilization

### Product & Engineering
Feature Demand, Download Trends, Telemetry Adoption, Engineering Velocity, Version Adoption

### Delivery Ops
Resource Utilization, Project Status, Time Tracking

### Cross-Functional
Executive Summary, Regional Performance, Product Line P&L

## Plugin Structure

```
VISTA/
  .claude-plugin/
    plugin.json
  skills/
    vista/
      SKILL.md              # Main skill logic
      references/
        data-catalog-schema.md  # Notion catalog schema snapshot
        chart-templates.md      # React + HTML chart templates
  README.md
  CLAUDE.md                 # Claude Code instructions
  .gitignore
```

## Part of the Alpine Toolkit

IBEX | PACK | MYNAH | BINER | SHERPA | **VISTA** | CAIRN
