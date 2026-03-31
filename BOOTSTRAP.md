# ATLAS Bootstrap Instructions

Run these steps to publish and install the ATLAS plugin.

## 1. Create the GitHub repo and push

```bash
gh repo create Percona-Lab/ATLAS --private --description "ATLAS — Analysis Toolkit for Leveraging All Sources. Claude plugin for cross-functional business analysis reports with visual charts."
git init
git add -A
git commit -m "feat: initial ATLAS plugin scaffolding

Notion data catalog integration, 22 report types, Recharts + Chart.js
chart templates, Percona brand palette."
git remote add origin git@github.com:Percona-Lab/ATLAS.git
git branch -M main
git push -u origin main
```

## 2. Install locally

```bash
mkdir -p ~/.claude/plugins/atlas
cp -r .claude-plugin/* ~/.claude/plugins/atlas/
cp -r skills ~/.claude/plugins/atlas/
```

## 3. Test

Restart Claude Code, then try:
- "show me what reports ATLAS can generate"
- "how's our pipeline looking?"
- "show me MySQL download trends"
