# VISTA Bootstrap Instructions

Run these steps to publish and install the VISTA plugin.

## 1. Create the GitHub repo and push

```bash
gh repo create Percona-Lab/VISTA --private --description "VISTA — Visualized Intelligence from Sources, Trends & Analysis. Claude plugin for cross-functional business analysis reports with visual charts."
git init
git add -A
git commit -m "feat: initial VISTA plugin scaffolding

Notion data catalog integration, 22 report types, Recharts + Chart.js
chart templates, Percona brand palette."
git remote add origin git@github.com:Percona-Lab/VISTA.git
git branch -M main
git push -u origin main
```

## 2. Install locally

```bash
mkdir -p ~/.claude/plugins/vista
cp -r .claude-plugin/* ~/.claude/plugins/vista/
cp -r skills ~/.claude/plugins/vista/
```

## 3. Test

Restart Claude Code, then try:
- "show me what reports VISTA can generate"
- "how's our pipeline looking?"
- "show me MySQL download trends"
