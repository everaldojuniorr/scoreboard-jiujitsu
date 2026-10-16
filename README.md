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

## Observação sobre regras

Este app registra o placar visualmente. Regras oficiais (IBJJF/CBJJ) sobre punições cumulativas, desempate por vantagem etc. ficam a cargo da mesa diretora — o sistema não aplica penalidades automáticas no adversário.
