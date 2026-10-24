/**
 * Thin fetch wrapper for the Cloudflare Pages Functions backend.
 *
 * In production the site and API share an origin (potato-smp.pages.dev),
 * so `/api/...` resolves directly. In local `vite dev` we proxy `/api`
 * to `wrangler pages dev` (see `dev:api` script) so the same relative
 * paths work everywhere.
 *
 * Every call falls back gracefully when the API is unreachable, so the UI
 * never hard-breaks — it just shows demo/empty state.
 */

const BASE = ""; // same origin; set to "https://api.potato-smp.dev" if you split it out

async function get<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T | null> {
  try {
    const qs = new URLSearchParams();
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== "") qs.set(k, String(v));
      }
    }
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    const res = await fetch(`${BASE}/api${path}${suffix}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.ok ? json.data ?? json : null) as T;
  } catch {
    return null;
  }
}

async function post<T>(path: string, body: unknown): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}/api${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const api = {
  get,
  post,
};
