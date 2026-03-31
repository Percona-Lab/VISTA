# ATLAS -- Claude Code Instructions

This is the ATLAS plugin repo: Analysis Toolkit for Leveraging All Sources.

## Project Context
- **Repo**: Percona-Lab/ATLAS (private)
- **Purpose**: Claude plugin for cross-functional business analysis reports with visual charts
- **Plugin structure**: `.claude-plugin/plugin.json` + `skills/atlas/SKILL.md` + `skills/atlas/references/`
- **Data**: Notion data catalog (live source of truth), MCP connectors for upstream systems

## Development Guidelines
- This is a Claude plugin, not a traditional application. The "code" is mostly SKILL.md (prompt engineering) and reference docs.
- Changes to SKILL.md should be tested by running sample queries in Cowork or Claude Code.
- Chart templates in `references/chart-templates.md` should use Recharts (React) and Chart.js (HTML).
- Percona brand colors: `#1A4D2E` (dark green primary), `#FF6B35` (orange accent).
- The Notion data catalog is the source of truth for what metrics exist: `28c674d091f3801f8bc3d35d85caa322`

## File Structure
```
.claude-plugin/plugin.json    -- Plugin metadata
skills/atlas/SKILL.md         -- Main skill (report generation logic)
skills/atlas/references/      -- Schema snapshots, chart templates
README.md                     -- GitHub-facing docs
CLAUDE.md                     -- This file (Claude Code instructions)
.gitignore                    -- Excludes data/ CSVs
```

## Commit Style
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`
- Commit and push after each change
- Keep PRs focused on one concern
