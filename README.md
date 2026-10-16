# Placar Jiu-Jitsu

Placar para tatame no estilo competição: **branco à esquerda** e **azul à direita**, com os mesmos controles dos dois lados.

## Funcionalidades

- Pontuação **2**, **3** e **4** pontos por atleta
- **Vantagem (ADV)** e **Punição (PUN)** independentes em cada lado
- Placar grande, pensado para celular, tablet e telão
- **Desfazer** última ação e **Zerar luta**

## Como rodar

```bash
npm install
npm run dev -- -p 43123
```

Abra [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Stack

- Next.js (App Router)
- React 19
- Tailwind CSS 4

## GitHub e deploy na VPS

Repositório GitHub: https://github.com/everaldojuniorr/scoreboard-jiujitsu

### Enviar código para o GitHub

Na sua máquina (com [GitHub CLI](https://cli.github.com/) autenticado):

```bash
git clone https://origin.cursor.com/everaldo-junior/scoreboard-jiu-jitsu.git
cd scoreboard-jiu-jitsu
git remote add github https://github.com/everaldojuniorr/scoreboard-jiujitsu.git
git push github main
```

Ou use um token:

```bash
export GH_TOKEN=seu_token_com_escopo_repo
./scripts/push-to-github.sh main
```

Depois, em **cursor.com/codebase**, você pode usar **Sync from GitHub** para manter Origin e GitHub alinhados.

### GitHub Actions

- `ci.yml` — lint, build Next.js e build da imagem Docker
- `deploy-vps.yml` — envia a imagem para a VPS (secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`)

## Observação sobre regras

Este app registra o placar visualmente. Regras oficiais (IBJJF/CBJJ) sobre punições cumulativas, desempate por vantagem etc. ficam a cargo da mesa diretora — o sistema não aplica penalidades automáticas no adversário.
