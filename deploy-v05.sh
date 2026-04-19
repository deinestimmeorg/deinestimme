#!/usr/bin/env bash
# Deploy DeineStimme v0.5 → main → Vercel
# Ausführung: bash /Users/home/Projects/deinestimme/deploy-v05.sh
# oder:       cd /Users/home/Projects/deinestimme && bash deploy-v05.sh

set -e
cd "$(dirname "$0")" 2>/dev/null || cd /Users/home/Projects/deinestimme

echo "→ Repo: $(pwd)"
echo "→ Branch: $(git rev-parse --abbrev-ref HEAD)"

# 1) Stale lock aus abgebrochener Session
if [ -f .git/index.lock ]; then
  echo "→ Entferne stale .git/index.lock"
  rm -f .git/index.lock
fi

# 2) Vite temp cruft vorher vom Platten werfen (sind eh in .gitignore ab jetzt)
rm -f vite.config.js.timestamp-*.mjs 2>/dev/null || true

# 3) Alles stagen (respektiert .gitignore)
echo "→ Stage Änderungen"
git add -A

# 4) Sicherheits-Check: zeig was committed wird
echo ""
echo "── Staged für Commit ──────────────────────────"
git status --short
echo "───────────────────────────────────────────────"
echo ""

# 5) Commit
git commit -m "v0.5: Zustaendigkeits-Engine + /engine/ Landing + Fahrplan-Tab entfernt

- packages/zustaendigkeit/: neuer Mono-Repo Package (11/11 Tests grün)
- public/engine/: Technische Architektur Landing (Spec/Addendum/Mapping Downloads)
- specs/: Source-of-Truth Artefakte v0.5 (Spec, Addendum, Mapping, v0.4 historisch)
- Footer Landing: 'Technische Architektur' → /engine/
- Tab 'Fahrplan' (timeline) aus Plattform-Nav entfernt
- vite.config.js.timestamp-* + dist-*/ in .gitignore
- Repo: github.com/deinestimmeorg/deinestimme"

# 6) Push → löst Vercel Deploy aus
echo ""
echo "→ Push → origin/main"
git push origin main

echo ""
echo "✓ Deployed. Vercel baut jetzt automatisch."
echo "  → Status: https://vercel.com/dashboard"
echo "  → Live:   https://deinestimme.org"
