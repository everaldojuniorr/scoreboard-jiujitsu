#!/usr/bin/env bash
set -euo pipefail

REPO="everaldojuniorr/scoreboard-jiujitsu"
BRANCH="${1:-main}"

if [[ -z "${GH_TOKEN:-}" ]]; then
  echo "Erro: defina GH_TOKEN (Personal Access Token com escopo 'repo')."
  echo "Exemplo: export GH_TOKEN=ghp_..."
  exit 1
fi

git push "https://x-access-token:${GH_TOKEN}@github.com/${REPO}.git" "${BRANCH}"

echo "Push concluído: https://github.com/${REPO}"
