import { createPagesFunctionsHandler } from "@cloudflare/workers-types";

/**
 * Cloudflare Pages Functions entry point.
 * Runs in the same directory context as the Pages build output,
 * which gives us access to /api/* routes alongside the static site.
 */
const handleRequest = createPagesFunctionsHandler();

export default {
  fetch: (request: Request, env: Bindings, ctx: ExecutionContext) =>
    handleRequest(request, env, ctx),
};

type Bindings = {
  SERVER_ADDRESS?: string;
  SERVER_EDITION?: string;
  MCSTATS_PROXY_ENABLED?: string;
  CORS_ORIGIN?: string;
  API_SECRET?: string;
};
