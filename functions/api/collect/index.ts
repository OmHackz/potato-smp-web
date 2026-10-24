import type { Context, Bindings } from "../../_utils";
import { withCors, json } from "../../_utils";

/**
 * POST /api/collect
 *
 * Where your future stats plugin pushes batches of server events
 * (join/leave, block mined, kill, death, economy delta, etc.) so the
 * website can aggregate live stats without the browser ever talking to the
 * server directly.
 *
 * Body: { "serverId": "potatosmp", "events": [ {type, player, value, at} ] }
 *
 * Auth: gated by API_SECRET (same Bearer scheme as /api/vote).
 * Persistence: TODO — wire to KV / D1 when the plugin lands.
 */
export const onRequestPost: Context["onRequest"] = async function onRequest({ request, env }) {
  if (request.method === "OPTIONS") return withCors(new Response(null, { status: 204 }), env);

  if (env.API_SECRET) {
    const auth = request.headers.get("Authorization");
    if (auth !== `Bearer ${env.API_SECRET}`) {
      return json({ ok: false, error: "unauthorized" }, 401, env);
    }
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid JSON body" }, 400, env);
  }

  const { serverId, events } = body as { serverId?: string; events?: Array<Record<string, unknown>> };
  if (!Array.isArray(events)) {
    return json({ ok: false, error: "'events' must be an array" }, 400, env);
  }

  // Stubbed persistence. Swap this block for KV/D1 writes when the
  // stats plugin contract is finalized.
  const accepted = events.length;

  return json(
    { ok: true, serverId: serverId || "unknown", accepted, receivedAt: Date.now() },
    200,
    env,
  );
};
