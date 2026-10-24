import type { Context, Bindings } from "../../_utils";
import { withCors, json } from "../../_utils";

/**
 * POST /api/vote
 *
 * A vote provider (or your server) posts a cast here so the website can
 * credit the player's `votes` stat and show a live vote counter.
 *
 * Body: { "player": "Notch", "uuid": "...", "provider": "mc-voter" }
 *
 * If API_SECRET is set in your Pages vars, requests must include
 * `Authorization: Bearer <API_SECRET>` or they're rejected (401).
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

  const { player, uuid, provider } = body as { player?: string; uuid?: string; provider?: string };
  if (!player) return json({ ok: false, error: "missing 'player'" }, 400, env);

  // NOTE: persistence layer lands with the stats plugin. For now we ack
  // the vote so the client has something to show, and echo the payload back.
  const record = {
    ok: true,
    credited: 1,
    receivedAt: Date.now(),
    vote: { player, uuid: uuid || null, provider: provider || "unknown" },
  };

  return json(record, 200, env);
};
