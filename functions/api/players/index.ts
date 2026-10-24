import type { Context, Bindings } from "../../_utils";
import { withCors, json } from "../../_utils";

/**
 * GET /api/players
 *
 * Online + offline roster. In `demo` mode it returns the bundled sample so the
 * frontend still renders without a live backend. When your stats plugin is
 * exposed (later step) it will feed this endpoint with real data.
 *
 * Query params:
 *   ?status=online   only online
 *   ?status=offline  only offline
 *   ?rank=golden     filter by rank id
 *   ?q=Notch         fuzzy name search
 *   ?sort=playtime   name | rank | playtime | lastSeen
 *   ?asc=true|false  direction
 *   ?limit=N&offset=M
 */
export const onRequestGet: Context["onRequest"] = async function onRequest({ request, env }) {
  if (request.method === "OPTIONS") return withCors(new Response(null, { status: 204 }), env);

  const params = new URL(request.url).searchParams;
  const q = (params.get("q") || "").toLowerCase();
  const status = params.get("status") as "online" | "offline" | null;
  const rank = params.get("rank");
  const sort = (params.get("sort") || "name") as string;
  const asc = params.get("asc") !== "false";
  const limit = Math.min(parseInt(params.get("limit") || "20", 10), 200);
  const offset = Math.max(parseInt(params.get("offset") || "0", 10), 0);

  // Pull from live provider if configured, otherwise fall back to demo.
  let players: Array<Record<string, unknown>>;
  const source: string = env.VITE_STATS_MODE === "demo" || !env.VITE_STATS_MODE ? "demo" : env.VITE_STATS_MODE;

  if (source !== "demo") {
    try {
      const base = env.VITE_STATS_API_URL || "";
      const res = await fetch(`${base}/players`, { headers: { Accept: "application/json" } });
      players = (await res.json()) as Array<Record<string, unknown>>;
    } catch {
      players = demoPlayers;
    }
  } else {
    players = demoPlayers;
  }

  let filtered = players.filter((p) => {
    if (q && !String(p.name).toLowerCase().includes(q)) return false;
    if (status === "online" && !p.online) return false;
    if (status === "offline" && p.online) return false;
    if (rank && p.rank !== rank) return false;
    return true;
  });

  filtered = filtered.sort((a, b) => {
    const av = a[sort];
    const bv = b[sort];
    if (av < bv) return asc ? -1 : 1;
    if (av > bv) return asc ? 1 : -1;
    return 0;
  });

  const total = filtered.length;
  const page = filtered.slice(offset, offset + limit);

  return json({ ok: true, total, offset, limit, source, data: page }, 200, env);
};

const demoPlayers = [
  { name: "Notch", uuid: "069a79f4-44e9-4726-a5be-fca90e38aaf5", online: true, rank: "legendary", firstJoin: 1609459200000, lastSeen: Date.now(), playtime: 125000 },
  { name: "PotatoKing", uuid: "123e4567-e89b-12d3-a456-426614174000", online: true, rank: "golden", firstJoin: 1640995200000, lastSeen: Date.now(), playtime: 89000 },
  { name: "SpudMaster", uuid: "123e4567-e89b-12d3-a456-426614174001", online: true, rank: "baked", firstJoin: 1650000000000, lastSeen: Date.now(), playtime: 67000 },
  { name: "TaterTot", uuid: "123e4567-e89b-12d3-a456-426614174002", online: false, rank: "sprout", firstJoin: 1660000000000, lastSeen: Date.now() - 86400000, playtime: 45000 },
  { name: "HashBrown", uuid: "123e4567-e89b-12d3-a456-426614174003", online: false, rank: "default", firstJoin: 1670000000000, lastSeen: Date.now() - 172800000, playtime: 23000 },
  { name: "MashPotato", uuid: "123e4567-e89b-12d3-a456-426614174004", online: false, rank: "default", firstJoin: 1675000000000, lastSeen: Date.now() - 604800000, playtime: 12000 },
  { name: "FrenchFry", uuid: "123e4567-e89b-12d3-a456-426614174005", online: false, rank: "baked", firstJoin: 1645000000000, lastSeen: Date.now() - 259200000, playtime: 78000 },
  { name: "PotatoWedge", uuid: "123e4567-e89b-12d3-a456-426614174006", online: false, rank: "sprout", firstJoin: 1665000000000, lastSeen: Date.now() - 43200000, playtime: 34000 },
  { name: "SweetPotato", uuid: "123e4567-e89b-12d3-a456-426614174007", online: true, rank: "legendary", firstJoin: 1630000000000, lastSeen: Date.now(), playtime: 156000 },
  { name: "YamYam", uuid: "123e4567-e89b-12d3-a456-426614174008", online: false, rank: "default", firstJoin: 1680000000000, lastSeen: Date.now() - 1209600000, playtime: 8000 },
];
