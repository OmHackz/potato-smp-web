# Task: Build the `PotatoStats` Paper 26.3 plugin

You are building a Minecraft Paper plugin for the **PotatoSMP** server. The plugin's job is to **collect server/player events and push them to the website's REST API**, so the site (`potato-smp.pages.dev`) can show live stats without the browser ever talking to the game server directly.

Read the context below, then implement the plugin. Work autonomously; verify it compiles against the Paper 26.3 API before you finish.

---

## 1. Target platform (verified — use these exact values)

| Concern | Value |
|---|---|
| Minecraft version | **26.3** |
| Server software | **Paper** (build on Paper, not Spigot/Bukkit-generic) |
| Java | **25** (Paper 26.1+ requires Java 25; use Temurin JDK 25) |
| `plugin.yml` / `paper-plugin.yml` | `api-version: '26.3'` |
| Paper Maven repo | `https://repo.papermc.io/repository/maven-public/` |
| Paper artifact | `io.papermc.paper:paper-api` (version range `26.3.build,)` for latest, or pin `26.3.build.143-beta`) |
| Build tool | Gradle (Kotlin DSL) recommended; Maven works too |

> Sanity check: `java -version` must report 25+. If the agent environment has an older JDK, that's the first thing to fix — the 26.3 API will not compile against Java < 25.

---

## 2. What the plugin must do

The plugin is a **pusher**, not a web server. It listens to Bukkit/Paper events, keeps an in-memory rolling buffer of stat events, and on a short interval **POSTs batches** to the website API. (An optional lightweight read-only HTTP endpoint is a stretch goal — see §6.)

Events to capture (use the matching Bukkit/Paper event; all are public API, no NMS):

| Stat key | Source event / signal | Notes |
|---|---|---|
| `player_join` | `PlayerJoinEvent` | one event per join; payload `player`, `uuid`, `firstTime` (bool — check `getTotalPlayTime` == 0 or a player file that didn't exist) |
| `player_leave` | `PlayerQuitEvent` | includes `playtime_minutes` this session (track join timestamp in the listener) |
| `block_mined` | `PlayerBlockBreakEvent` or `BlockBreakEvent` | throttle: don't push every single block — batch counts (see §4) |
| `kill` | `PlayerKillEvent` (Paper) / `EntityDeathEvent` where `getLastDamageCause` is a `EntityDamageByEntityEvent` | payload `victim`, `killer` when player |
| `death` | `PlayerDeathEvent` | payload `player` |
| `mob_kill` | `EntityDeathEvent` for hostile/neutral mobs | tag `mob` type |
| `block_placed` | `BlockPlaceEvent` | same throttling as mined |
| `stat` | `PlayerStatisticIncrementEvent` (Paper) | **the** canonical per-player vanilla stat source: playtime, distance, mob_kills, items_mined/placed, etc. Use this as the authoritative feed for the leaderboard stats, rather than re-deriving from raw events |
| `vote` (optional) | If a vote plugin (e.g. mVotifier) is present, mirror its callback; otherwise the website's `/api/vote` endpoint is the source of truth and the plugin does nothing here | — |

Persist per-player counters to disk (YAML or JSON under `plugins/PotatoStats/data/`) so restarts don't lose data, and so the "offline roster + last seen" can be answered. On `PlayerQuitEvent` and on a 5-minute timer, flush counters to disk.

---

## 3. What to push and where

**Endpoint:** `POST https://potato-smp.pages.dev/api/collect`
**Auth:** `Authorization: Bearer <secret>` where `<secret>` is the `API_SECRET` shared with the website. In dev it's `change-me`; in production it's set in the Cloudflare Pages vars. Read it from `config.yml`.

**Body (JSON):**
```json
{
  "serverId": "potatosmp",
  "sentAt": "2026-10-24T12:00:00Z",
  "events": [
    { "type": "player_join",   "player": "Notch",  "uuid": "069a...", "at": "2026-10-24T11:59:00Z" },
    { "type": "block_mined",   "player": "Notch",  "value": 42,      "at": "2026-10-24T11:59:10Z" },
    { "type": "death",         "player": "Notch",  "at": "2026-10-24T11:58:30Z" },
    { "type": "stat",          "player": "Notch",  "stat": "minecraft.stat.type.deaths", "value": 1, "at": "..." }
  ]
}
```

- The website's `/api/collect` handler (in `functions/api/collect/index.ts`) currently **acks** the batch with `{"ok":true,"accepted":N}` and stubs persistence — it will be wired to KV/D1 later. The plugin just needs to send well-formed batches and handle non-2xx gracefully (retry with backoff, never crash, never block the main thread).
- Also a **GET** endpoint the website will use to pull the *full roster + per-player totals* on refresh: the plugin optionally serves `GET /v1/players`, `GET /v1/players/{uuid}`, `GET /v1/stats/leaderboard/{type}` on a configurable port (default `8790`) so the website's `VITE_STATS_API_URL` can point at it. See §6.

**CORS / same-origin note:** the website and the plugin are different origins. The website talks to the **plugin** only if you enable the read HTTP server; it talks to the **CF Pages API** for pushes. Keep those two paths separate and don't leak `API_SECRET` in any GET response.

---

## 4. Batching & threading rules (important — don't lag the server)

- Keep a `LinkedHashMap` or simple ring buffer of pending events; **coalesce** `block_mined`/`block_placed`/`stat` increments per player between flushes (store counts, not individual events) so a miner spamming blocks doesn't blow up the buffer.
- Flush to HTTP on a `BukkitRunnable` at `task = 20 * 30` (30s) ticks — **off the main thread** (`runTaskAsynchronously` or a dedicated single-thread `Executor`). Never do blocking I/O on the main thread.
- Cap the buffer (e.g. 10,000 coalesced entries). If it overflows, drop oldest, log a warning.
- Backoff: on connection failure wait 30s, 60s, 120s, cap at 5min. Never busy-loop.
- The HTTP client: use **Java 11+ `java.net.http.HttpClient`** (no extra deps) — it's available on Java 25 and is fine for async POSTs. Do not pull in OkHttp/RestTemplate.

---

## 5. Configuration (`config.yml`)

```yaml
# PotatoStats config
server-id: "potatosmp"
push:
  enabled: true
  url: "https://potato-smp.pages.dev/api/collect"
  secret: "change-me"        # matches Cloudflare API_SECRET
  interval-seconds: 30
  flush-max-events: 1000
http:
  enabled: false            # stretch goal (§6) — default off
  port: 8790
data:
  dir: "plugins/PotatoStats/data"
```

---

## 6. Stretch goal: read HTTP endpoint

If time permits, add a tiny embedded HTTP server (use `com.sun.net.httpserver.HttpServer` — JDK-bundled, zero deps) that exposes:
- `GET /v1/players` → `{ "players": [ {name, uuid, online, rank, firstJoin, lastSeen, playtime} ] }`
- `GET /v1/players/{uuid}` → full stat block
- `GET /v1/stats/leaderboard/{type}` → ranked list

This lets the website set `VITE_STATS_API_URL=http://<server>:8790` and `VITE_STATS_MODE=plan`-style live mode (the website's `custom` provider already points at `VITE_STATS_API_URL` — align the response shapes to what `functions/api/players/index.ts` expects). Bind on `0.0.0.0:8790` only if `http.enabled` is true; don't expose it publicly without the server admin knowing.

---

## 7. Project scaffold

Create a Gradle Kotlin DSL project:

```
potato-stats-plugin/
  build.gradle.kts
  settings.gradle.kts
  gradle.properties          # plugin.version=1.0.0
  src/main/java/dev/potatosmp/potato_stats/
    PotatoStatsPlugin.java    // main class, extends JavaPlugin
    config/ConfigManager.java
    listeners/JoinListener.java, LeaveListener.java, BlockListener.java,
              DeathListener.java, StatListener.java, MobListener.java
    net/StatsPusher.java      // HttpClient POST + backoff + batching
    net/EventBuffer.java      // coalescing buffer
    data/PlayerData.java, DataStore.java
    http/HttpApi.java         // optional read server (§6)
  src/main/resources/
    plugin.yml               // legacy Bukkit (fine on Paper 26.3) OR
    paper-plugin.yml         // modern Paper plugin system
```

**`plugin.yml`** (simplest path — valid on Paper 26.3):
```yaml
name: PotatoStats
version: '${version}'
main: dev.potatosmp.potato_stats.PotatoStatsPlugin
api-version: '26.3'
description: Collects server stats and pushes to the PotatoSMP website API.
author: potato-smp
```

**`build.gradle.kts`** key bits:
```kotlin
repositories {
    maven("https://repo.papermc.io/repository/maven-public/")
}
dependencies {
    compileOnly("io.papermc.paper:paper-api:26.3.build,)")   // use a real pinned build if `)` range fails in your repo mirror
}
java { toolchain { languageVersion = JavaLanguageVersion.of(25) } }
tasks {
    shadowJar { archiveBaseName.set("potato-stats") }   // if using shadow; otherwise `jar` is fine (no deps to shade)
}
```
Since we only use JDK-bundled `HttpClient` + YAML (SnakeYAML is on the classpath via Paper), a plain `jar` task with **no** shaded deps is cleanest — don't shade Bukkit/Paper into the jar.

---

## 8. Acceptance checklist

Before declaring done:
1. `./gradlew build` succeeds on **JDK 25** against `paper-api:26.3`.
2. `plugin.yml` has `api-version: '26.3'`.
3. All six event listeners compile and are registered in `onEnable`.
4. `StatsPusher` POSTs a coalesced batch to `config.yml`'s `push.url` with the Bearer secret on a 30s async schedule; retries on failure; caps the buffer.
5. Per-player counters persist to `data/` and survive restart.
6. (Optional) `/v1/players` HTTP endpoint compiles and returns JSON matching `functions/api/players/index.ts`'s expected shape.
7. No NMS / CraftBukkit imports. Public API only.

**Do NOT** modify the website repo — this task is the plugin only. If you discover the API contract in §3 needs a change, note it in your final report instead of editing the website.

---

## 9. Final report (append to your response)

When done, report:
- Exact `paper-api` build version you compiled against
- The list of events wired up and which are coalesced
- The buffer/backoff behavior (intervals, caps)
- Any API-contract deltas the website's `/api/collect` handler needs to know
- The plugin JAR path + how to install it on the 26.3 server
- Open questions for the server admin (secret rotation, port exposure, vote-plugin dependency)
