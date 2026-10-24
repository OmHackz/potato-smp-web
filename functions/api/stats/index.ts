import type { Context, Bindings } from "../../_utils";
import { withCors, json } from "../../_utils";

/**
 * GET /api/stats
 *
 * Aggregate server totals (unique players, peak online, playtime, sessions,
 * economy balance). Mirrors `ServerTotals` shape.
 */
export const onRequestGet: Context["onRequest"] = async function onRequest({ request, env }) {
  if (request.method === "OPTIONS") return withCors(new Response(null, { status: 204 }), env);

  const totals = {
    uniquePlayers: 1247,
    peakPlayers: 89,
    totalPlaytime: 2847500,
    totalSessions: 15600,
    totalKills: 482391,
    totalDeaths: 234567,
    totalBlocksMined: 12890000,
    totalBlocksPlaced: 8945000,
    totalMobKills: 567890,
    economyBalance: 45230000,
    updatedAt: Date.now(),
  };

  return json({ ok: true, source: "demo", data: totals }, 200, env);
};
