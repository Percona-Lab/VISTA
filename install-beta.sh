#!/usr/bin/env bash
# install-beta.sh — one-shot installer for the VISTA Beta plugin.
#
#   curl -fsSL https://raw.githubusercontent.com/Percona-Lab/VISTA/v2-beta/install-beta.sh | bash
#
# What it does:
#   1. Ensures `~/.claude/plugins/marketplaces/percona-lab/` exists and is up
#      to date (clones fresh, or git-pulls if already present).
#   2. Adds `extraKnownMarketplaces.percona-lab` to ~/.claude/settings.json
#      if missing.
#   3. Adds `vista-beta@percona-lab: true` to enabledPlugins (and keeps any
#      existing `vista@percona-lab` enabled — both can coexist).
#   4. Tells you to quit & relaunch Claude Desktop.
#
# Idempotent — safe to re-run. Edits settings.json with `python3` for safe
# JSON manipulation (no blind string substitution).

set -euo pipefail

MARKETPLACE_REPO="https://github.com/Percona-Lab/claude-plugins.git"
MARKETPLACE_DIR="$HOME/.claude/plugins/marketplaces/percona-lab"
SETTINGS="$HOME/.claude/settings.json"

c_green=$'\e[32m'
c_yellow=$'\e[33m'
c_red=$'\e[31m'
c_reset=$'\e[0m'
say()   { printf '%s%s%s\n' "$c_green" "→ $*" "$c_reset"; }
warn()  { printf '%s%s%s\n' "$c_yellow" "! $*" "$c_reset"; }
fail()  { printf '%s%s%s\n' "$c_red"   "✗ $*" "$c_reset"; exit 1; }

# --- 1. Ensure prerequisites ------------------------------------------------
command -v git     >/dev/null || fail "git is required but not in PATH"
command -v python3 >/dev/null || fail "python3 is required but not in PATH"

# --- 2. Marketplace clone or refresh ---------------------------------------
mkdir -p "$(dirname "$MARKETPLACE_DIR")"
if [ -d "$MARKETPLACE_DIR/.git" ]; then
  say "Refreshing percona-lab marketplace"
  if ! git -C "$MARKETPLACE_DIR" pull --ff-only --quiet; then
    warn "git pull failed (uncommitted local edits?). Trying stash + pull."
    git -C "$MARKETPLACE_DIR" stash --include-untracked --quiet || true
    git -C "$MARKETPLACE_DIR" pull --ff-only --quiet \
      || fail "Could not refresh marketplace at $MARKETPLACE_DIR"
  fi
elif [ -e "$MARKETPLACE_DIR" ]; then
  fail "$MARKETPLACE_DIR exists but is not a git checkout. Move it aside and rerun."
else
  say "Cloning percona-lab marketplace"
  git clone --quiet "$MARKETPLACE_REPO" "$MARKETPLACE_DIR" \
    || fail "git clone failed"
fi

# Verify vista-beta is in the marketplace
if ! grep -q '"name": "vista-beta"' "$MARKETPLACE_DIR/.claude-plugin/marketplace.json" 2>/dev/null; then
  fail "vista-beta entry not found in $MARKETPLACE_DIR/.claude-plugin/marketplace.json. Refresh failed."
fi

# --- 3. Update ~/.claude/settings.json --------------------------------------
mkdir -p "$(dirname "$SETTINGS")"
[ -f "$SETTINGS" ] || echo '{}' > "$SETTINGS"

python3 - "$SETTINGS" <<'PY'
import json, sys, pathlib
path = pathlib.Path(sys.argv[1])
try:
    data = json.loads(path.read_text())
except json.JSONDecodeError as e:
    sys.exit(f"could not parse {path}: {e}")

# Ensure marketplace registration
data.setdefault("extraKnownMarketplaces", {})
if "percona-lab" not in data["extraKnownMarketplaces"]:
    data["extraKnownMarketplaces"]["percona-lab"] = {
        "source": {
            "source": "git",
            "url": "https://github.com/Percona-Lab/claude-plugins.git"
        }
    }
    print("→ Added percona-lab to extraKnownMarketplaces")
else:
    print("→ percona-lab marketplace already registered")

# Enable vista-beta (and keep any existing vista enabled)
data.setdefault("enabledPlugins", {})
if data["enabledPlugins"].get("vista-beta@percona-lab") is True:
    print("→ vista-beta@percona-lab already enabled")
else:
    data["enabledPlugins"]["vista-beta@percona-lab"] = True
    print("→ Enabled vista-beta@percona-lab")

# Atomic write
tmp = path.with_suffix(".json.tmp")
tmp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
tmp.replace(path)
PY

# --- 4. Done ----------------------------------------------------------------
echo ""
say "VISTA Beta installed."
echo ""
echo "Next steps:"
echo "  1. Quit Claude Desktop completely (Cmd-Q on macOS)."
echo "  2. Reopen it. Both /vista (stable) and /vista-beta should now appear."
echo "  3. Try a beta report:"
echo "       /vista-beta Show me the MySQL Cascade report"
echo ""
echo "If /vista-beta isn't recognized after a relaunch, check that this line"
echo "exists in $SETTINGS under enabledPlugins:"
echo '       "vista-beta@percona-lab": true'
