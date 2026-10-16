#!/bin/sh
set -eu

ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

HOST_PORT=43123

echo "[deploy] Build da imagem scoreboard-jiujitsu…"
docker compose build app

echo "[deploy] Subindo container em 127.0.0.1:${HOST_PORT}…"
docker compose up -d --wait app

i=0
while [ "$i" -lt 30 ]; do
  if command -v curl >/dev/null 2>&1; then
    if curl -fsS -o /dev/null --max-time 10 "http://127.0.0.1:${HOST_PORT}/"; then
      echo "[deploy] Placar respondendo em http://127.0.0.1:${HOST_PORT}/"
      docker image prune -f
      echo "[deploy] Concluído."
      exit 0
    fi
  fi
  i=$((i + 1))
  sleep 2
done

echo "[deploy] Falha: placar não respondeu após o deploy."
docker compose logs --tail 80 app || true
exit 1
