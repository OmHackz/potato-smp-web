import type { APIRouteContext } from "@cloudflare/workers-types/entries";

export type Context = APIRouteContext;

export type Bindings = {
  SERVER_ADDRESS?: string;
  SERVER_EDITION?: string;
  VITE_STATS_MODE?: string;
  VITE_STATS_API_URL?: string;
  CORS_ORIGIN?: string;
  API_SECRET?: string;
};

/**
 * Adds standard CORS headers to a Response so the frontend
 * (potato-smp.pages.dev) can call /api/* from the browser.
 */
export function withCors(response: Response, env: Bindings): Response {
  const origin = env.CORS_ORIGIN || "*";
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Max-Age", "86400");
  return new Response(response.body, {
    status: response.status,
    headers,
  });
}

/**
 * Build a JSON response with CORS.
 */
export function json(body: unknown, status = 200, env?: Bindings): Response {
  const response = Response.json(body, { status });
  return env ? withCors(response, env) : response;
}
