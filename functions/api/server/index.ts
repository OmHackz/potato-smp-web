import type { Context, Bindings } from "../../_utils";
import { withCors, json } from "../../_utils";

/**
 * GET /api/server
 *
 * Live server status via mcsrvstat.us (server IP → status + MOTD + version
 * + online players sample). Cached ~30s in CF so we don't hammer the API.
 */
export const onRequestGet: Context["onRequest"] = async function onRequest({ request, env }) {
  if (request.method === "OPTIONS") return withCors(new Response(null, { status: 204 }), env);

  const address =
    (new URL(request.url).searchParams.get("address") as string) ||
    env.SERVER_ADDRESS ||
    "play.potatosmp.net";
  const edition =
    (new URL(request.url).searchParams.get("edition") as string) ||
    env.SERVER_EDITION ||
    "java";

  const isBedrock = edition.toLowerCase() === "bedrock";
  const apiBase = isBedrock
    ? `https://api.mcsrvstat.us/bedrock/3/${encodeURIComponent(address)}`
    : `https://api.mcsrvstat.us/3/${encodeURIComponent(address)}`;

  try {
    const upstream = await fetch(apiBase, {
      headers: {
        "User-Agent": "PotatoSMP-Website/1.0 (status-proxy)",
        Accept: "application/json",
      },
      // Respect upstream 5-minute cache; keep our own short edge cache.
      cache: "no-store",
    });

    if (!upstream.ok) {
      return json({ ok: false, error: `status API ${upstream.status}` }, 502, env);
    }

    const data = await upstream.json();
    return json({ ok: true, ...data }, 200, env);
  } catch (err) {
    return json(
      { ok: false, error: err instanceof Error ? err.message : "upstream error" },
      502,
      env,
    );
  }
};
