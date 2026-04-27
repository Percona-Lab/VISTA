# VISTA — Beta Channel (v2.0 beta.1)

> **This branch is the beta channel of the VISTA Claude plugin.** Stable Vista lives on `main`. This branch ships as a separate plugin (`vista-beta`) so it can be installed alongside stable Vista in the same Claude Desktop instance.

VISTA — Visualized Intelligence from Sources, Trends & Analysis — is a Claude plugin that runs cross-functional business analysis reports for Percona teams. The beta channel adds:

- **Percona-branded HTML artifact pipeline.** Every report renders with the Percona wordmark in the header, dark-theme tokens, the four-color product-accent system (mysql / postgresql / mongodb / kubernetes / valkey / pmm / redis), and a consistent shell across every report type.
- **Six chart primitives** — `Vista.renderTrendLine`, `Vista.renderStackedHBar`, `Vista.renderDonut`, `Vista.renderVersionBars`, `Vista.renderFunnel`, `Vista.renderHeatmap` — all hand-rolled SVG with hover tooltips, theme-aware colors, and re-render-on-theme-flip.
- **Print-friendly PDF export.** Print stylesheet keeps cards intact across page breaks, forces dark backgrounds to print correctly, and clips chart overflow so axis labels can't bleed into adjacent elements.
- **Cowork artifact mechanism.** Reports are delivered as type-`text/html` artifacts via Cowork's artifact tool, producing pinnable + downloadable Live Artifacts in the right pane.
- **Sticky theme + accent preference** — `Vista.setTheme(theme, accent)` flips both with chart re-render in one frame; preference persists via `pack memory_update` (key `vista_beta_theme_preference`).

## Installation

In Claude Desktop / Cowork:

```
/plugin install Percona-Lab/VISTA@v2-beta
```

Or via the claude-plugins marketplace once `vista-beta` is listed:

```
/plugin install vista-beta
```

Then restart Claude Desktop.

## Coexistence with stable Vista

If you have the stable `vista` plugin installed, **both can run side by side**. The beta plugin is registered as `vista-beta` with skill name `vista-beta`, so:

- `/vista` — runs stable Vista (current production reports).
- `/vista-beta` — runs the beta pipeline.

State is kept separate:
- Memory: `vista_theme_preference` (stable) vs `vista_beta_theme_preference` (beta).
- Artifact identifiers: `vista-{slug}` vs `vista-beta-{slug}`.
- MCP connectors (Atlassian, Notion, Slack, ClickHouse, Elasticsearch, ServiceNow, Clari) are user-level and shared by both plugins — no duplication needed.

## Quick start

After install + Desktop restart, in Cowork:

```
/vista-beta Show me the MySQL Cascade report
/vista-beta What's the MySQL team working on?
/vista-beta How are MySQL downloads trending month over month?
```

The first response pins a Percona-branded HTML artifact in the right pane with pin + download icons. Hover any chart to see tooltips; the download icon supports "Save as PDF" with a print-friendly stylesheet.

## What's in this repo (beta branch)

```
.claude-plugin/plugin.json             ← Plugin manifest, name=vista-beta
skills/vista-beta/SKILL.md             ← Skill entry point
skills/vista-beta/references/
  brand.md                             ← Token catalog, accent table, render contract
  vista-primitives.html                ← Canonical HTML primitives (the design system)
  vista-primitives.jsx                 ← JSX twin (reference / direct consumption only)
  chart-templates.md                   ← Chart selection + per-report quick reference
  engineering-visibility.md            ← Team Status / Sprint / Comms layouts
  cascade-kpi-mysql.md                 ← MySQL Cascade Report definition (anchor + 3 supporting)
  vista-data-dictionary.md             ← ClickHouse + Elasticsearch schema reference
  data-catalog-schema.md               ← Notion data catalog schema
```

## Marketplace submission

To list `vista-beta` in the claude-plugins marketplace, add a single entry to the marketplace's `plugins[]` array (PR against your marketplace repo):

```json
{
  "name": "vista-beta",
  "displayName": "VISTA Beta",
  "description": "VISTA Beta — Percona-branded business analysis reports with full HTML artifact pipeline. Coexists with stable Vista.",
  "repository": "https://github.com/Percona-Lab/VISTA",
  "branch": "v2-beta",
  "version": "2.0.0-beta.1",
  "author": "Percona Lab",
  "tags": ["analytics", "percona", "beta"]
}
```

## Reporting issues

File issues against this repo and tag with `v2-beta`. Or ping Dennis Kittrell directly.

## Roadmap to v2 stable

- **v2.0.0-beta.1** — initial release (this commit).
- **v2.0.0-beta.N** — bug fixes, additional chart primitives as needed.
- **v2.0.0** — graduation. At graduation, stable `vista` bumps to 2.0.0 with this codebase, and `vista-beta` either retires or stays as a perma-beta channel for future experiments.

## License

MIT (same as stable Vista).
