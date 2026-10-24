<div align="center">

# 🥔 PotatoSMP — Website + API

</div>

<div align="center">

A Minecraft-style website for the **PotatoSMP** server, paired with a Cloudflare Pages Functions REST backend that the site — and a future stats plugin — talk to.

<br>

</div>

<div align="center">

<img src="public/og-image.svg" alt="PotatoSMP" width="100%" />

</div>

<div align="center">

<!-- shields.io -->
[![GitHub repo](https://img.shields.io/badge/Repo-OmHackz/potato-smp-web-blueviolet?logo=github&logoColor=white&style=flat-square)](https://github.com/OmHackz/potato-smp-web)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/OmHackz/potato-smp-web?style=flat-square)](https://github.com/OmHackz/potato-smp-web/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/OmHackz/potato-smp-web?style=flat-square)](https://github.com/OmHackz/potato-smp-web/forks)
[![GitHub issues](https://img.shields.io/github/issues/OmHackz/potato-smp-web?style=flat-square)](https://github.com/OmHackz/potato-smp-web/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/OmHackz/potato-smp-web?style=flat-square)](https://github.com/OmHackz/potato-smp-web/pulls)

[![Deploy: Cloudflare Pages](https://img.shields.io/badge/Deploy-CF%20Pages-00C5FF?logo=cloudflare&logoColor=00C5FF&style=flat-square)](https://potato-smp.pages.dev)
[![GitHub Actions: Deploy](https://img.shields.io/github/actions/workflow/status/OmHackz/potato-smp-web/deploy.yml?label=CI%20·%20Cloudflare&style=flat-square)](https://github.com/OmHackz/potato-smp-web/actions/workflows/deploy.yml)

[![Frontend: React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&style=flat-square)](https://react.dev)
[![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=646CFF&style=flat-square)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&style=flat-square)](https://typescriptlang.org)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5-FF4154?style=flat-square)](https://tanstack.com/query)
[![Node 22](https://img.shields.io/badge/Node.js-22-3C873A?logo=nodedotjs&style=flat-square)](https://nodejs.org)
[![Paper 26.3 · Java 25](https://img.shields.io/badge/PaperMC-26.3%20·%20Java%2025-00A8FF?logo=java&style=flat-square)](https://papermc.io)

</div>

---

## ✨ Features

- **Minecraft UI design system** — Ore UI–inspired tokens, self-hosted Minecraft Ten/Five fonts, blocky buttons, panels, and status pills.
- **Pages** — Home, Join, Players (online/offline), Player Profile, Map, Stats (leaderboards), Shop (ranks), and a 404.
- **Live server status** — polls the site's API and renders a pulsing online/offline pill with a copyable IP.
- **Data provider abstraction** — `demo` (default) / `plan` / `custom` modes via `VITE_STATS_MODE` + `VITE_STATS_API_URL`.
- **REST API (Cloudflare Pages Functions)** — `GET /api/server`, `/api/players`, `/api/players/:uuid`, `/api/stats`, `/api/stats/leaderboard/:type`, `/api/ranks`; `POST /api/vote`, `POST /api/collect` gated by `API_SECRET`.
- **Stats plugin contract** — designed so the `PotatoStats` Paper 26.3 plugin pushes batched events to `POST /api/collect` (see [`PotatoStats-PLUGIN-PROMPT.md`](./PotatoStats-PLUGIN-PROMPT.md)).

## 🚀 Quick start

```bash
# 1. install deps
npm install

# 2. local secrets (the site + local API read these)
cp .dev.vars.example .dev.vars   # or copy .env.example

# 3. run frontend + local API together
npm run dev:all

# 4. production build
npm run build
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run dev:api` | `wrangler pages dev` on :8788 |
| `npm run dev:all` | Vite + wrangler (wait-on) |
| `npm run build` | `tsc -b` + `vite build` → `dist/` |
| `npm run deploy` | `wrangler pages deploy dist` |
| `npm run typecheck` | `tsc --noEmit` |

## 📁 Project layout

```
PotatoSMP/
├── src/
│   ├── App.tsx                  # router tree (all 7 pages + 404)
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, Layout
│   │   └── ui/                 # MCButton, Panel, Tabs, Toast, Tooltip, CopyIP…
│   ├── pages/                  # Home, Join, Players, PlayerProfile, Map, Stats, Shop, NotFound
│   ├── data/                   # provider selection + demo/plan/custom providers
│   ├── hooks/                  # useServerStatus + stat hooks
│   ├── lib/                    # api.ts, utils.ts, rankColors.tsx
│   ├── styles/tokens.css       # Minecraft-inspired design tokens
│   └── types/                  # shared interfaces + env declarations
├── functions/                  # Cloudflare Pages Functions (the REST API)
│   ├── _middleware.ts          # global Pages handler
│   ├── _utils.ts               # withCors / json helpers + Bindings type
│   └── api/                    # /api/server, /api/players, /api/stats, /api/ranks, /api/vote, /api/collect
├── public/fonts/               # self-hosted WOFF2 Minecraft fonts
├── .github/workflows/deploy.yml
├── wrangler.jsonc              # Cloudflare Pages config
└── PotatoStats-PLUGIN-PROMPT.md
```

## ☁️ Deployment (Cloudflare Pages)

- **Framework:** Cloudflare Pages — build output `dist/` (configured in [`wrangler.jsonc`](./wrangler.jsonc)).
- **CI:** [`deploy.yml`](./.github/workflows/deploy.yml) runs `npm ci`, type-checks, builds, and uploads the Pages artifact on every push to `main`.
- **Required secrets** (Cloudflare → account → account details / Pages):
  - `CLOUDFLARE_API_TOKEN` — an API token with **Account Pages: Edit**
  - `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account id

> Live: <https://potato-smp.pages.dev>

## 🧩 Stats plugin (Paper 26.3)

The site ships with a **REST contract** so a Paper plugin can push stats. The build prompt lives in [`PotatoStats-PLUGIN-PROMPT.md`](./PotatoStats-PLUGIN-PROMPT.md) and targets **Paper 26.3** (`api-version: '26.3'`, Java 25). It pushes batched events to `POST /api/collect` with `Authorization: Bearer <API_SECRET>`.

## 🔐 Configuration

| Variable | Where | Purpose |
|---|---|---|
| `API_SECRET` | Cloudflare Pages env + `.dev.vars` | Bearer token for `POST /api/collect`, `/api/vote` |
| `VITE_STATS_MODE` | env | `demo` (default) / `plan` / `custom` |
| `VITE_STATS_API_URL` | env | Live stats endpoint for `custom` mode |
| `SERVER_ADDRESS` | Cloudflare Pages env | Server IP shown by the status pill |
| `SERVER_EDITION` | Cloudflare Pages env | `java` / `bedrock` |

## 📄 License

[MIT](./LICENSE) — see the [license file](./LICENSE).

<div align="center">

_🥔 Built for the PotatoSMP community._

</div>
