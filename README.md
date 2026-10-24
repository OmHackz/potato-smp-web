<div align="center">

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/header/graph.svg?title=PotatoSMP&subtitle=MINECRAFT%20COMMUNITY%20%7C%20WEB%20PLATFORM%20%7C%20REST%20API&mode=light&size=lg&align=center" />
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/header/graph.svg?title=PotatoSMP&subtitle=MINECRAFT%20COMMUNITY%20%7C%20WEB%20PLATFORM%20%7C%20REST%20API&mode=dark&size=lg&align=center" />
  <img src="https://shieldcn.dev/header/graph.svg?title=PotatoSMP&subtitle=MINECRAFT%20COMMUNITY%20%7C%20WEB%20PLATFORM%20%7C%20REST%20API&mode=dark&size=lg&align=center" alt="PotatoSMP" width="100%" />
</picture>

<br />

# 🥔 PotatoSMP

### Your Minecraft world. Connected.

A Minecraft-inspired community platform built with **React, TypeScript, and Cloudflare Pages**. Featuring a custom website, server information, player statistics, leaderboards, and a REST API designed for future server integrations.

<br />

[**🌐 Live Website**](https://potato-smp.pages.dev) · [**📦 GitHub Repository**](https://github.com/OmHackz/potato-smp-web) · [**🐛 Issues**](https://github.com/OmHackz/potato-smp-web/issues)

<br />

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/group/github/stars/OmHackz/potato-smp-web+github/forks/OmHackz/potato-smp-web+github/license/OmHackz/potato-smp-web.svg?variant=secondary&mode=light" />
  <source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/group/github/stars/OmHackz/potato-smp-web+github/forks/OmHackz/potato-smp-web+github/license/OmHackz/potato-smp-web.svg?variant=secondary&mode=dark" />
  <img src="https://shieldcn.dev/group/github/stars/OmHackz/potato-smp-web+github/forks/OmHackz/potato-smp-web+github/license/OmHackz/potato-smp-web.svg?variant=secondary" alt="GitHub repository statistics" />
</picture>

<br />

<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Pages" />
<img src="https://img.shields.io/badge/REST_API-00A98F?style=flat-square" alt="REST API" />

<br /><br />

**Explore. Survive. Build. Repeat.**

</div>

---

## ✨ Overview

PotatoSMP brings your Minecraft server community together through a dedicated website and a serverless API.

The project combines a Minecraft-inspired design system with player information, server status, statistics, and a flexible data-provider architecture.

- 🎮 **Minecraft-inspired interface** — Block-style buttons, themed panels, pixel fonts, status indicators, and reusable UI components.
- 🌐 **Community website** — Dedicated pages for the homepage, joining the server, players, player profiles, maps, statistics, and ranks.
- 🟢 **Server status** — API-powered status indicators and a copyable server address.
- 👥 **Player directory** — Player listings and individual player profiles.
- 📊 **Statistics and leaderboards** — A foundation for displaying player and server statistics.
- 🛍️ **Rank shop** — A dedicated page for server ranks.
- ⚡ **Serverless REST API** — Cloudflare Pages Functions for server data, players, statistics, ranks, voting, and data collection.
- 🔌 **Extensible architecture** — Support for demo, Plan, and custom statistics providers.
- ☁️ **Automated deployment** — GitHub Actions integration for Cloudflare Pages.

## 🧱 Technology Stack

| Technology | Role |
|---|---|
| React 19 | User interface |
| TypeScript | Type safety |
| Vite | Development and production builds |
| TanStack Query | Server-state management |
| Node.js 22 | JavaScript tooling |
| Cloudflare Pages | Hosting and serverless functions |
| Wrangler | Local development and deployment |
| Paper / Java | Target platform for the planned statistics plugin |

## 🏗️ Architecture

```mermaid
flowchart TD
    Player["🎮 Players"]
    Web["🌐 PotatoSMP Website<br/>React + TypeScript"]
    API["⚡ REST API<br/>Cloudflare Pages Functions"]
    Data[("📊 Statistics Data")]
    Plugin["🧩 PotatoStats Plugin"]
    Providers["🔌 Data Providers<br/>Demo / Plan / Custom"]

    Player --> Web
    Web --> API
    API <--> Data
    Plugin -->|"Authenticated batches"| API
    Providers --> Web
````

The website consumes data through the API and configured statistics providers. A planned Paper plugin will send authenticated batches of server statistics to the collection endpoint.

The diagram represents the intended integration architecture; actual data storage and plugin connectivity depend on their respective implementations.

## 📁 Project Structure

text

```
potato-smp-web/
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
│   └── fonts/                       # Minecraft fonts
│
├── src/
│   ├── components/
│   │   ├── layout/                  # Navbar, Footer, Layout
│   │   └── ui/                      # Buttons, panels, tabs, tooltips
│   ├── pages/                       # Website pages
│   ├── data/                        # Statistics providers
│   ├── hooks/                       # Server status and stats hooks
│   ├── lib/                          # API client and utilities
│   ├── styles/
│   │   └── tokens.css               # Design-system tokens
│   ├── types/                        # Shared TypeScript types
│   └── App.tsx                       # Application routes
│
├── functions/
│   ├── api/
│   │   ├── players/
│   │   │   └── [uuid].ts            # Player profile
│   │   ├── stats/
│   │   │   └── leaderboard/
│   │   │       └── [type].ts        # Leaderboards
│   │   ├── server.ts                # Server information
│   │   ├── players.ts               # Player listing
│   │   ├── stats.ts                 # Server statistics
│   │   ├── ranks.ts                 # Rank information
│   │   ├── vote.ts                  # Voting
│   │   └── collect.ts               # Statistics collection
│   ├── _middleware.ts               # Request middleware
│   └── _utils.ts                    # Shared API utilities
│
├── .env.example                     # Environment template
├── .dev.vars                        # Local secrets
├── wrangler.jsonc                   # Cloudflare configuration
├── package.json                     # Dependencies and scripts
├── package-lock.json                # Locked dependencies
├── PotatoStats-PLUGIN-PROMPT.md     # Plugin specification
└── README.md
```

## 🔌 REST API

All documented endpoints are organized under `/api`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/server` | Server information and status |
| `GET` | `/api/players` | Player listing |
| `GET` | `/api/players/:uuid` | Individual player information |
| `GET` | `/api/stats` | Server statistics |
| `GET` | `/api/stats/leaderboard/:type` | Statistics leaderboard |
| `GET` | `/api/ranks` | Available ranks |
| `POST` | `/api/vote` | Vote-related requests |
| `POST` | `/api/collect` | Statistics ingestion |

### Example Requests

bash

```
curl https://potato-smp.pages.dev/api/server
curl https://potato-smp.pages.dev/api/players
curl https://potato-smp.pages.dev/api/stats
curl https://potato-smp.pages.dev/api/ranks
```

### Authentication

The statistics collection endpoint is designed for authenticated server-side integrations.

http

```
POST /api/collect
Authorization: Bearer YOUR_API_SECRET
Content-Type: application/json
```

The exact request schema and accepted event formats are defined by the API implementation.

Security: Keep `API_SECRET` server-side. Never expose private credentials through frontend environment variables or browser code.

## 📈 Statistics Providers

The frontend supports three documented provider modes.

| Provider | Purpose |
| --- | --- |
| `demo` | Demonstration and development data |
| `plan` | Plan-based statistics integration |
| `custom` | Configurable external statistics API |

Configuration:

dotenv

```
VITE_STATS_MODE=demo
VITE_STATS_API_URL=https://api.example.com
```

`VITE_STATS_API_URL` is intended for the custom provider. Values prefixed with `VITE_` are exposed to client-side code and must never contain secrets.

## 🧩 PotatoStats Plugin

The planned PotatoStats plugin is intended to connect a Paper server to the REST API and submit batched statistics.

| Component | Target |
| --- | --- |
| Platform | Paper |
| API target | `26.3` |
| Java target | Java 25 |
| Collection endpoint | `POST /api/collect` |
| Authentication | Bearer token |

The plugin specification is available in `PotatoStats-PLUGIN-PROMPT.md`.

The listed versions describe the project's intended targets; verify compatibility and implementation status independently.

## ☁️ Infrastructure & Deployment

| Setting | Value |
| --- | --- |
| Hosting | Cloudflare Pages |
| Build command | `npm run build` |
| Output directory | `dist` |
| Cloudflare configuration | `wrangler.jsonc` |
| Deployment workflow | `.github/workflows/deploy.yml` |
| Production site | [potato-smp.pages.dev](<https://potato-smp.pages.dev?utm_source=chatgpt.com>) |

### GitHub Actions Secrets

Configure the following under Repository → Settings → Secrets and variables → Actions.

| Secret | Purpose |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Authorized deployment token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier |

Production environment variables and any required storage bindings must also be configured in Cloudflare Pages.

## ⚙️ Environment Variables

| Variable | Scope | Purpose |
| --- | --- | --- |
| `API_SECRET` | Server-side | Authenticates protected API requests |
| `VITE_STATS_MODE` | Frontend | Selects the statistics provider |
| `VITE_STATS_API_URL` | Frontend | Configures the custom statistics API |
| `SERVER_ADDRESS` | Server-side | Minecraft server address |
| `SERVER_EDITION` | Server-side | Server edition, such as `java` or `bedrock` |

Local development secrets belong in `.dev.vars`. Use `.env.example` as the environment template and configure production values in Cloudflare Pages.

## 🛠️ Development Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run dev:api` | Start the local Pages API |
| `npm run dev:all` | Run frontend and API together |
| `npm run build` | Type-check and build the application |
| `npm run deploy` | Deploy the production build |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Run Oxlint |

## 📊 Repository Activity

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome.

- Report bugs through [GitHub Issues](<https://github.com/OmHackz/potato-smp-web/issues?utm_source=chatgpt.com>).
- Submit focused pull requests with clear descriptions.
- Keep documentation aligned with actual implementation.
- Never commit secrets, local environment files, or generated build artifacts.

## 📄 License

Released under the MIT License.
