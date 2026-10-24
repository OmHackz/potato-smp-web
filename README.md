<div align="center">

<!-- ===== HEADER BANNER ===== -->
<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/header/graph.svg?title=PotatoSMP&subtitle=Minecraft%20Server%20Website%20%2B%20Cloudflare%20Pages%20API&mode=light&size=lg&align=center" />
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/header/graph.svg?title=PotatoSMP&subtitle=Minecraft%20Server%20Website%20%2B%20Cloudflare%20Pages%20API&mode=dark&size=lg&align=center" />
  <img src="https://shieldcn.dev/header/graph.svg?title=PotatoSMP&subtitle=Minecraft%20Server%20Website%20%2B%20Cloudflare%20Pages%20API&mode=dark&size=lg&align=center" alt="PotatoSMP header" width="100%" />
</picture>

<br />

# 🥔 PotatoSMP — Website + REST API

**A Minecraft-style website for the PotatoSMP server, paired with a Cloudflare Pages Functions REST backend.**

The site, and a future stats plugin, talk to the API — never the other way around.

<br />

<!-- ===== REPO STATS BADGES (adaptive) ===== -->
<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/group/github/stars/OmHackz/potato-smp-web+github/forks/OmHackz/potato-smp-web+github/watchers/OmHackz/potato-smp-web+github/license/OmHackz/potato-smp-web.svg?variant=secondary&mode=light" />
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/group/github/stars/OmHackz/potato-smp-web+github/forks/OmHackz/potato-smp-web+github/watchers/OmHackz/potato-smp-web+github/license/OmHackz/potato-smp-web.svg?variant=secondary&mode=dark" />
  <img src="https://shieldcn.dev/group/github/stars/OmHackz/potato-smp-web+github/forks/OmHackz/potato-smp-web+github/watchers/OmHackz/potato-smp-web+github/license/OmHackz/potato-smp-web.svg?variant=secondary" alt="GitHub stats" />
</picture>

<br />

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/group/github/issues/OmHackz/potato-smp-web+github/prs/OmHackz/potato-smp-web+github/last-commit/OmHackz/potato-smp-web.svg?variant=outline&mode=light" />
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/group/github/issues/OmHackz/potato-smp-web+github/prs/OmHackz/potato-smp-web+github/last-commit/OmHackz/potato-smp-web.svg?variant=outline&mode=dark" />
  <img src="https://shieldcn.dev/group/github/issues/OmHackz/potato-smp-web+github/prs/OmHackz/potato-smp-web+github/last-commit/OmHackz/potato-smp-web.svg?variant=outline" alt="Issues, PRs, last commit" />
</picture>

<br />

<!-- ===== CI + DEPLOY + LIVE SITE ===== -->
<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/group/github/ci/OmHackz/potato-smp-web+badge/Deploy·Cloudflare%20Pages-live-00C5FF+badge/Live%20Site-potato--smp.pages.dev-00C5FF.svg?variant=branded&mode=light" />
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/group/github/ci/OmHackz/potato-smp-web+badge/Deploy·Cloudflare%20Pages-live-00C5FF+badge/Live%20Site-potato--smp.pages.dev-00C5FF.svg?variant=branded&mode=dark" />
  <img src="https://shieldcn.dev/group/github/ci/OmHackz/potato-smp-web+badge/Deploy·Cloudflare%20Pages-live-00C5FF+badge/Live%20Site-potato--smp.pages.dev-00C5FF.svg?variant=branded" alt="CI, deploy, live site" />
</picture>

<br />

<!-- ===== TECH STACK ===== -->
<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/group/badge/React%2019-frontend-61DAFB+badge/Vite%208-bundler-646CFF+badge/TypeScript-6-3178C6+badge/TanStack%20Query-5-F84D44+badge/Node.js-22-3C873A+badge/Paper%2026.3·Java%2025-plugin-00A8FF.svg?variant=branded&mode=light" />
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/group/badge/React%2019-frontend-61DAFB+badge/Vite%208-bundler-646CFF+badge/TypeScript-6-3178C6+badge/TanStack%20Query-5-F84D44+badge/Node.js-22-3C873A+badge/Paper%2026.3·Java%2025-plugin-00A8FF.svg?variant=branded&mode=dark" />
  <img src="https://shieldcn.dev/group/badge/React%2019-frontend-61DAFB+badge/Vite%208-bundler-646CFF+badge/TypeScript-6-3178C6+badge/TanStack%20Query-5-F84D44+badge/Node.js-22-3C873A+badge/Paper%2026.3·Java%2025-plugin-00A8FF.svg?variant=branded" alt="Tech stack" />
</picture>

<br /><br />

**[Live site → potato-smp.pages.dev](https://potato-smp.pages.dev)**

</div>

---

## 📖 Table of contents

- [✨ Features](#-features)
- [🚀 Quick start](#-quick-start)
- [📁 Project layout](#-project-layout)
- [☁️ Deployment](#-deployment-cloudflare-pages)
- [🧩 Stats plugin](#-stats-plugin-paper-263)
- [🔐 Configuration](#-configuration)
- [📈 Repo activity](#-repo-activity)
- [📄 License](#-license)

---

## ✨ Features

- **Minecraft UI design system** — Ore UI–inspired tokens, self-hosted Minecraft Ten/Five fonts, blocky buttons, panels, status pills, and toast notifications.
- **Seven pages + 404** — Home, Join, Players (online/offline), Player Profile, Map, Stats (leaderboards), Shop (ranks).
- **Live server status** — polls the site's API and renders a pulsing online/offline pill with a copyable server IP.
- **Data provider abstraction** — `demo` (default) / `plan` / `custom` modes via `VITE_STATS_MODE` + `VITE_STATS_API_URL`.
- **REST API (Cloudflare Pages Functions)** — `GET /api/server`, `/api/players`, `/api/players/:uuid`, `/api/stats`, `/api/stats/leaderboard/:type`, `/api/ranks`; `POST /api/vote`, `POST /api/collect` gated by `API_SECRET`.
- **Stats plugin contract** — designed so the `PotatoStats` Paper 26.3 plugin pushes batched events to `POST /api/collect` (see [`PotatoStats-PLUGIN-PROMPT.md`](./PotatoStats-PLUGIN-PROMPT.md)).

---

## 🚀 Quick start

```bash
# 1. install deps
npm install

# 2. local secrets (the site + local API read these)
cp .env.example .dev.vars

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
| `npm run lint` | `oxlint` |

---

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

---

## ☁️ Deployment (Cloudflare Pages)

- **Framework:** Cloudflare Pages — build output `dist/` (configured in [`wrangler.jsonc`](./wrangler.jsonc)).
- **CI:** [`deploy.yml`](./.github/workflows/deploy.yml) runs `npm ci`, type-checks, builds, and uploads the Pages artifact on every push to `main`.
- **Required secrets** (GitHub → Settings → Secrets and variables → Actions):
  - `CLOUDFLARE_API_TOKEN` — an API token with **Account Pages: Edit**
  - `CLOUDFLARE_ACCOUNT_ID` — the Cloudflare account id

> Live: <https://potato-smp.pages.dev>

---

## 🧩 Stats plugin (Paper 26.3)

The site ships with a **REST contract** so a Paper plugin can push stats. The build prompt lives in [`PotatoStats-PLUGIN-PROMPT.md`](./PotatoStats-PLUGIN-PROMPT.md) and targets **Paper 26.3** (`api-version: '26.3'`, Java 25). It pushes batched events to `POST /api/collect` with `Authorization: Bearer <API_SECRET>`.

---

## 🔐 Configuration

| Variable | Where | Purpose |
|---|---|---|
| `API_SECRET` | Cloudflare Pages env + `.dev.vars` | Bearer token for `POST /api/collect`, `/api/vote` |
| `VITE_STATS_MODE` | env | `demo` (default) / `plan` / `custom` |
| `VITE_STATS_API_URL` | env | Live stats endpoint for `custom` mode |
| `SERVER_ADDRESS` | Cloudflare Pages env | Server IP shown by the status pill |
| `SERVER_EDITION` | Cloudflare Pages env | `java` / `bedrock` |

---

## 📈 Repo activity

<div align="center">

### Star history

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/chart/github/stars/OmHackz/potato-smp-web.svg?mode=light&width=720&height=200" />
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/chart/github/stars/OmHackz/potato-smp-web.svg?mode=dark&width=720&height=200" />
  <img src="https://shieldcn.dev/chart/github/stars/OmHackz/potato-smp-web.svg?width=720&height=200" alt="Star history" width="100%" />
</picture>

### Issues over time

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/chart/github/issues/OmHackz/potato-smp-web.svg?mode=light&width=720&height=200" />
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/chart/github/issues/OmHackz/potato-smp-web.svg?mode=dark&width=720&height=200" />
  <img src="https://shieldcn.dev/chart/github/issues/OmHackz/potato-smp-web.svg?width=720&height=200" alt="Issues over time" width="100%" />
</picture>

</div>

---

## 📄 License

<div align="center">

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/github/license/OmHackz/potato-smp-web.svg?variant=default&mode=light" />
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/github/license/OmHackz/potato-smp-web.svg?variant=default&mode=dark" />
  <img src="https://shieldcn.dev/github/license/OmHackz/potato-smp-web.svg?variant=default" alt="MIT License" />
</picture>

<br />

[MIT](./LICENSE) — see the [license file](./LICENSE).

</div>

---

<div align="center">

_🥔 Built for the PotatoSMP community._

_Badges, charts, and header rendered by [shieldcn.dev](https://shieldcn.dev) — shadcn/ui-styled README badges._

</div>
