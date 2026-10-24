<div align="center">

<!-- ═══════════════════════════════════════════════════════════════ -->

<!-- HERO -->

<!-- ═══════════════════════════════════════════════════════════════ -->

<picture>
<source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/header/graph.svg?title=PotatoSMP&subtitle=YOUR%20NEXT%20ADVENTURE%20STARTS%20HERE&mode=light&size=lg&align=center" />
<source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/header/graph.svg?title=PotatoSMP&subtitle=YOUR%20NEXT%20ADVENTURE%20STARTS%20HERE&mode=dark&size=lg&align=center" />
<img src="https://shieldcn.dev/header/graph.svg?title=PotatoSMP&subtitle=YOUR%20NEXT%20ADVENTURE%20STARTS%20HERE&mode=dark&size=lg&align=center" alt="PotatoSMP — Your next adventure starts here" width="100%" />
</picture>

<br />

🥔 PotatoSMP
The ultimate hub for your Minecraft survival community.

A Minecraft-inspired web experience powered by React, TypeScript, and Cloudflare Pages — with a REST API designed to connect your website, server statistics, and future Paper plugin.

🌐 Visit Website · 📦 Source Code · 🐛 Report a Bug · ✨ Request a Feature

<br />

<picture>
<source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/group/github/stars/OmHackz/potato-smp-web+github/forks/OmHackz/potato-smp-web+github/watchers/OmHackz/potato-smp-web+github/license/OmHackz/potato-smp-web.svg?variant=secondary&mode=light" />
<source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/group/github/stars/OmHackz/potato-smp-web+github/forks/OmHackz/potato-smp-web+github/watchers/OmHackz/potato-smp-web+github/license/OmHackz/potato-smp-web.svg?variant=secondary&mode=dark" />
<img src="https://shieldcn.dev/group/github/stars/OmHackz/potato-smp-web+github/forks/OmHackz/potato-smp-web+github/watchers/OmHackz/potato-smp-web+github/license/OmHackz/potato-smp-web.svg?variant=secondary" alt="GitHub stars, forks, watchers, and license" />
</picture>

<br />

<picture>
<source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/group/github/ci/OmHackz/potato-smp-web+badge/Deploy·Cloudflare%20Pages-live-00C5FF+badge/Live%20Site-potato--smp.pages.dev-00C5FF.svg?variant=branded&mode=light" />
<source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/group/github/ci/OmHackz/potato-smp-web+badge/Deploy·Cloudflare%20Pages-live-00C5FF+badge/Live%20Site-potato--smp.pages.dev-00C5FF.svg?variant=branded&mode=dark" />
<img src="https://shieldcn.dev/group/github/ci/OmHackz/potato-smp-web+badge/Deploy·Cloudflare%20Pages-live-00C5FF+badge/Live%20Site-potato--smp.pages.dev-00C5FF.svg?variant=branded" alt="Build status and Cloudflare Pages deployment" />
</picture>

<br /><br />

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare" />

<br /><br />

Built for players. Designed for performance. Ready to expand.

</div>

📚 Table of Contents
✨ Features
🏗️ Architecture
🚀 Getting Started
📁 Project Structure
🔌 REST API
☁️ Deployment
🧩 PotatoStats Plugin
⚙️ Configuration
🛠️ Development Commands
📊 Repository Activity
🤝 Contributing
📄 License
✨ Features

A complete Minecraft community website with a frontend and a server-side API, designed to grow alongside the PotatoSMP server.

<table>
<tr>
<td width="50%">
<h3>🎮 Minecraft-Inspired UI</h3>
<p>Blocky buttons, pixel-style typography, themed panels, reusable design tokens, status indicators, tooltips, and toast notifications.</p>
</td>
<td width="50%">
<h3>🌍 Community Pages</h3>
<p>Home, Join, Players, Player Profiles, Map, Stats, Shop, and a custom 404 page.</p>
</td>
</tr>
<tr>
<td width="50%">
<h3>🟢 Live Server Status</h3>
<p>API-powered online/offline status, periodic polling, and a convenient copyable server address.</p>
</td>
<td width="50%">
<h3>📈 Player Statistics</h3>
<p>Player information, statistics, leaderboards, and a provider system that supports demo, Plan, and custom data sources.</p>
</td>
</tr>
<tr>
<td width="50%">
<h3>⚡ Serverless REST API</h3>
<p>Cloudflare Pages Functions handle server data, player lookups, leaderboards, ranks, voting, and stat collection.</p>
</td>
<td width="50%">
<h3>🔗 Plugin-Ready Backend</h3>
<p>A defined integration contract for a future Paper plugin to send batched server statistics to the API.</p>
</td>
</tr>
</table>

🧱 Built with
Technology	Purpose
React 19	Component-based user interface
TypeScript	Type-safe application development
Vite	Development server and production builds
TanStack Query	Server-state and data-fetching infrastructure
Node.js 22	JavaScript tooling and development environment
Cloudflare Pages	Website hosting and serverless API
Wrangler	Local Cloudflare development and deployment
Paper / Java	Target platform for the planned stats plugin
Note: The frontend and API are separate layers. The website consumes the API, and a future stats plugin will send data to it. The API does not depend on the frontend.
🏗️ Architecture
mermaid
flowchart TD
    Player["🎮 Minecraft Player"]
    Website["🌐 PotatoSMP Website<br/>React + TypeScript"]
    API["⚡ Cloudflare Pages Functions<br/>REST API"]
    Store[("🗄️ Persistent Data Layer")]
    Plugin["🧩 PotatoStats<br/>Paper Plugin"]
    Plan["📊 Plan Integration"]
    Demo["🧪 Demo Data Provider"]

    Player --> Website
    Website --> API
    API <--> Store
    Plugin -->|"Authenticated batch uploads"| API
    Plan --> Website
    Demo --> Website


Data flow at a glance

Players visit the website and browse server information.
The frontend requests data from the REST API or its configured statistics provider.
The API processes requests and accesses its configured storage or bindings.
The planned Paper plugin sends authenticated, batched statistics to the collection endpoint.

The diagram shows the intended architecture. Actual storage configuration and plugin connectivity depend on the deployed implementation.

🚀 Getting Started

Get the project running locally in a few minutes.

Prerequisites

Install the following before you begin:

Node.js — use a compatible version for the project.
npm — included with Node.js.
Git — to clone the repository.
A Cloudflare account is only needed for deployment, not ordinary local frontend development.
1. Clone the repository
bash
git clone https://github.com/OmHackz/potato-smp-web.git
cd potato-smp-web

2. Install dependencies
bash
npm install

3. Configure local environment variables

Create your local Wrangler secrets file from the example:

bash
cp .env.example .dev.vars


Edit .dev.vars and configure the values required by your local API.

For example:

dotenv
API_SECRET=replace-with-a-long-random-secret
SERVER_ADDRESS=play.example.com
SERVER_EDITION=java


Replace the example server address with your actual Minecraft server address.

Security: Never commit .dev.vars, production secrets, or real API tokens. Keep frontend variables separate from server-only secrets.

4. Start the development environment

To run the frontend and local API together:

bash
npm run dev:all


Alternatively, start them separately:

bash
# Terminal 1 — frontend
npm run dev

# Terminal 2 — Cloudflare Pages Functions
npm run dev:api

5. Build for production
bash
npm run build


The production frontend build is generated in dist/.

📁 Project Structure
text
potato-smp-web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI and Cloudflare deployment
│
├── public/
│   └── fonts/                  # Self-hosted Minecraft fonts
│
├── src/
│   ├── components/
│   │   ├── layout/              # Navbar, Footer, Layout
│   │   └── ui/                  # Reusable UI components
│   │
│   ├── data/                    # Demo, Plan, and custom providers
│   ├── hooks/                   # Server status and stats hooks
│   ├── lib/                     # API client and utilities
│   ├── pages/                   # Website pages
│   ├── styles/
│   │   └── tokens.css           # Design-system tokens
│   ├── types/                   # Shared TypeScript definitions
│   └── App.tsx                  # Application routing
│
├── functions/
│   ├── _middleware.ts           # Shared request middleware
│   ├── _utils.ts                # JSON, CORS, and bindings helpers
│   └── api/
│       ├── server.ts            # Server information
│       ├── players.ts           # Player listing
│       ├── players/
│       │   └── [uuid].ts        # Individual player lookup
│       ├── stats.ts             # Statistics
│       ├── stats/
│       │   └── leaderboard/
│       │       └── [type].ts    # Typed leaderboard
│       ├── ranks.ts             # Rank information
│       ├── vote.ts              # Voting endpoint
│       └── collect.ts           # Statistics ingestion
│
├── .env.example
├── .dev.vars                    # Local secrets; do not commit
├── wrangler.jsonc               # Cloudflare configuration
├── package.json
├── package-lock.json
├── PotatoStats-PLUGIN-PROMPT.md
└── README.md

This is a representative layout based on the documented routes and files. Keep the tree synchronized with the actual repository if filenames or directories differ.
🔌 REST API

The API lives under /api and is implemented with Cloudflare Pages Functions.

Endpoint reference
Method	Endpoint	Purpose
GET	/api/server	Retrieve server information and status
GET	/api/players	Retrieve the player listing
GET	/api/players/:uuid	Retrieve an individual player's information
GET	/api/stats	Retrieve server statistics
GET	/api/stats/leaderboard/:type	Retrieve a leaderboard by statistic type
GET	/api/ranks	Retrieve available ranks
POST	/api/vote	Submit a vote-related request
POST	/api/collect	Submit a statistics collection batch

The precise response schemas, validation rules, and supported leaderboard types are defined by the endpoint implementations.

Example requests

Retrieve server information:

bash
curl https://potato-smp.pages.dev/api/server


Retrieve players:

bash
curl https://potato-smp.pages.dev/api/players


Retrieve server statistics:

bash
curl https://potato-smp.pages.dev/api/stats


Retrieve ranks:

bash
curl https://potato-smp.pages.dev/api/ranks


These examples illustrate the documented route structure. They assume the corresponding endpoints are deployed and publicly accessible.

Authenticated collection

The collection endpoint is designed for trusted server-side integrations.

http
POST /api/collect
Authorization: Bearer YOUR_API_SECRET
Content-Type: application/json


Example request shape:

json
{
  "events": []
}


The empty events array is illustrative, not a complete event schema. Use the actual payload contract implemented by the API and documented in PotatoStats-PLUGIN-PROMPT.md.

Important: Protect authenticated endpoints with server-side secret validation. Do not expose API_SECRET through a VITE_ environment variable or include it in browser requests.

☁️ Deployment

PotatoSMP is designed to deploy to Cloudflare Pages.

Deployment configuration
Setting	Value
Hosting platform	Cloudflare Pages
Build command	npm run build
Build output directory	dist
Cloudflare configuration	wrangler.jsonc
CI workflow	.github/workflows/deploy.yml
Production website	potato-smp.pages.dev
1. Create a Cloudflare API token

Open the Cloudflare dashboard and create an API token with the permissions required to deploy to Pages.

Use the minimum permissions necessary for your account and deployment workflow.

2. Add GitHub Actions secrets

Navigate to:

GitHub repository → Settings → Secrets and variables → Actions

Add the following repository secrets:

Secret	Description
CLOUDFLARE_API_TOKEN	Token authorized to deploy the Pages project
CLOUDFLARE_ACCOUNT_ID	Cloudflare account identifier
3. Configure production environment variables

In the Cloudflare Pages project settings, configure the server-side environment variables required by the application.

At minimum, review:

API_SECRET
SERVER_ADDRESS
SERVER_EDITION

Set any additional bindings or storage configuration required by the implementation.

4. Deploy

If your package scripts are configured as documented:

bash
npm run build
npm run deploy


Or push to the configured deployment branch and allow GitHub Actions to run.

Before your first production deployment: Verify that the workflow's branch filters, Cloudflare project name, Wrangler configuration, secrets, and required bindings match your actual setup.

🧩 PotatoStats Plugin
Connecting Paper to the website

The planned PotatoStats plugin is intended to connect a Minecraft Paper server to the PotatoSMP REST API.

Its integration contract is documented in:

PotatoStats-PLUGIN-PROMPT.md

Intended integration flow
The plugin collects supported server and player statistics.
Events are batched to reduce unnecessary HTTP requests.
The plugin sends batches to POST /api/collect.
The API authenticates and validates incoming requests.
Accepted data becomes available to the configured statistics system.
Target environment
Component	Target
Server platform	Paper
Paper API target	26.3
Java target	Java 25
Collection endpoint	POST /api/collect
Authentication	Bearer token using API_SECRET

These are the target versions specified by the project documentation, not a guarantee of compatibility with every server distribution.

Plugin status: The website and collection contract are documented here; the plugin's implementation and successful end-to-end integration should be verified separately.

⚙️ Configuration
Environment variables
Variable	Location	Description
API_SECRET	.dev.vars and Cloudflare server environment	Secret used to authenticate protected API requests
VITE_STATS_MODE	Frontend build environment	Selects the statistics provider
VITE_STATS_API_URL	Frontend build environment	API URL used by the custom provider
SERVER_ADDRESS	Cloudflare environment	Minecraft server address displayed by the site
SERVER_EDITION	Cloudflare environment	Server edition, such as java or bedrock
Statistics providers

The frontend supports three documented provider modes:

Mode	Purpose
demo	Uses demo data for development and previews
plan	Integrates with a Plan-based statistics source
custom	Uses a configurable statistics API

Configure the selected mode in the frontend environment:

dotenv
VITE_STATS_MODE=demo
VITE_STATS_API_URL=https://api.example.com


VITE_STATS_API_URL is relevant when using the custom provider.

Security note: Vite exposes VITE_ variables to client-side code. Only use them for public configuration. Never put private credentials, bearer tokens, or database secrets in these variables.
🛠️ Development Commands
Command	Description
npm run dev	Start the Vite development server
npm run dev:api	Start the local Cloudflare Pages API on port 8788
npm run dev:all	Run the frontend and local API together
npm run build	Run TypeScript project builds and create the production bundle
npm run deploy	Deploy the dist/ directory using Wrangler
npm run typecheck	Run the TypeScript type check
npm run lint	Run Oxlint
Recommended pre-deployment checks

Run the checks before opening a pull request or deploying:

bash
npm run typecheck
npm run lint
npm run build


This helps catch type errors, lint issues, and production build failures before deployment.

📊 Repository Activity

<div align="center">

⭐ Star History

<picture>
<source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/chart/github/stars/OmHackz/potato-smp-web.svg?mode=light&width=720&height=200" />
<source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/chart/github/stars/OmHackz/potato-smp-web.svg?mode=dark&width=720&height=200" />
<img src="https://shieldcn.dev/chart/github/stars/OmHackz/potato-smp-web.svg?width=720&height=200" alt="PotatoSMP GitHub star history" width="100%" />
</picture>

🐛 Issue History

<picture>
<source media="(prefers-color-scheme: light)" srcset="https://shieldcn.dev/chart/github/issues/OmHackz/potato-smp-web.svg?mode=light&width=720&height=200" />
<source media="(prefers-color-scheme: dark)" srcset="https://shieldcn.dev/chart/github/issues/OmHackz/potato-smp-web.svg?mode=dark&width=720&height=200" />
<img src="https://shieldcn.dev/chart/github/issues/OmHackz/potato-smp-web.svg?width=720&height=200" alt="PotatoSMP GitHub issue history" width="100%" />
</picture>

</div>

🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome.

Fork the repository.
Create a feature branch.
Make your changes and run the relevant checks.
Open a pull request with a clear description of your changes.

For bugs or suggestions, use the GitHub Issues page.

Please avoid committing generated build output, local secrets, or unrelated changes.

📄 License

<div align="center">

<a href="./LICENSE">
<img src="https://img.shields.io/github/license/OmHackz/potato-smp-web?style=for-the-badge&label=License" alt="Project license" />
</a>

MIT License

See the LICENSE file for the full terms.

</div>

<div align="center">

🥔 Made for the PotatoSMP community.

Explore. Survive. Build. Repeat.

🌐 Website · ⭐ Star on GitHub · 💬 Issues & Ideas

<br />

Crafted with ❤️, TypeScript, React, and Cloudflare.

</div>
