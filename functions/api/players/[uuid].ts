import type { Context, Bindings } from "../../_utils";
import { withCors, json } from "../../_utils";

/**
 * GET /api/players/:uuid
 *
 * Full stat block for one player (kills, deaths, K/D, blocks mined, balance,
 * 14-day activity, rank). Mirrors the `PlayerStats` shape the frontend
 * consumes.
 */
export const onRequestGet: Context["onRequest"] = async function onRequest({ request, env, context }) {
  if (request.method === "OPTIONS") return withCors(new Response(null, { status: 204 }), env);

  const uuid = context.params.uuid;
  if (!uuid) return json({ ok: false, error: "missing uuid" }, 400, env);

  const demo = demoStats[uuid];
  if (!demo) return json({ ok: false, error: "player not found" }, 404, env);

  // If a live stats API is configured, prefer it and merge.
  if (env.VITE_STATS_MODE && env.VITE_STATS_MODE !== "demo" && env.VITE_STATS_API_URL) {
    try {
      const res = await fetch(`${env.VITE_STATS_API_URL}/players/${uuid}`, {
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        const live = await res.json();
        return json({ ok: true, source: env.VITE_STATS_MODE, data: { ...demo, ...live } }, 200, env);
      }
    } catch {
      /* fall through to demo */
    }
  }

  return json({ ok: true, source: "demo", data: demo }, 200, env);
};

const demoStats: Record<string, Record<string, unknown>> = {
  "069a79f4-44e9-4726-a5be-fca90e38aaf5": {
    name: "Notch",
    uuid: "069a79f4-44e9-4726-a5be-fca90e38aaf5",
    online: true,
    rank: "legendary",
    firstJoin: 1609459200000,
    lastSeen: Date.now(),
    playtime: 125000,
    kills: 12403,
    deaths: 3410,
    kdRatio: 3.64,
    blocksMined: 482100,
    blocksPlaced: 310400,
    mobKills: 56210,
    balance: 482300,
    votes: 1000,
    playtimeBreakdown: { survival: 87500, creative: 25000, other: 12500 },
    recentActivity: Array.from({ length: 14 }, (_, i) => ({
      date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
      minutes: 240 + ((i * 53) % 360),
    })).reverse(),
  },
};
