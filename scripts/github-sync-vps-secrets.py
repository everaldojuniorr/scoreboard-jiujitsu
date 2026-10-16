#!/usr/bin/env python3
"""Copia VPS_* do runner (via env) para secrets do repo scoreboard-jiujitsu."""

from __future__ import annotations

import base64
import json
import os
import sys
import urllib.error
import urllib.request

from nacl import encoding, public


def api(method: str, path: str, token: str, body: dict | None = None) -> dict:
    data = None
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if body is not None:
        data = json.dumps(body).encode()
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(
        f"https://api.github.com{path}", data=data, headers=headers, method=method
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode())


def encrypt_secret(public_key_b64: str, secret_value: str) -> str:
    pk = public.PublicKey(public_key_b64.encode(), encoding.Base64Encoder)
    sealed = public.SealedBox(pk).encrypt(secret_value.encode("utf-8"))
    return base64.b64encode(sealed).decode("utf-8")


def set_repo_secret(token: str, owner: str, repo: str, name: str, value: str) -> None:
    key = api("GET", f"/repos/{owner}/{repo}/actions/secrets/public-key", token)
    encrypted = encrypt_secret(key["key"], value)
    api(
        "PUT",
        f"/repos/{owner}/{repo}/actions/secrets/{name}",
        token,
        {"encrypted_value": encrypted, "key_id": key["key_id"]},
    )


def main() -> int:
    pat = os.environ.get("GH_PAT") or os.environ.get("GITHUB_TOKEN")
    if not pat:
        print("GH_PAT ou GITHUB_TOKEN obrigatório", file=sys.stderr)
        return 1

    mapping = {
        "VPS_HOST": os.environ.get("VPS_HOST", ""),
        "VPS_USER": os.environ.get("VPS_USER", ""),
        "VPS_SSH_KEY": os.environ.get("VPS_SSH_KEY", ""),
        "VPS_PORT": os.environ.get("VPS_PORT", "22"),
    }
    missing = [k for k, v in mapping.items() if k != "VPS_PORT" and not v.strip()]
    if missing:
        print("Faltam variáveis:", ", ".join(missing), file=sys.stderr)
        return 1

    owner, repo = "everaldojuniorr", "scoreboard-jiujitsu"
    for name, value in mapping.items():
        set_repo_secret(pat, owner, repo, name, value.strip())
        print(f"ok: {name}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
