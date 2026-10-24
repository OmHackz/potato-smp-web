import type { Context, Bindings } from "../../_utils";
import { withCors, json } from "../../_utils";

/**
 * GET /api/ranks
 *
 * Rank catalog the Shop page renders. Prices/perks are source-of-truth here;
 * your store (Tebex/etc.) stays the actual checkout.
 */
export const onRequestGet: Context["onRequest"] = async function onRequest({ request, env }) {
  if (request.method === "OPTIONS") return withCors(new Response(null, { status: 204 }), env);

  const ranks = [
    {
      id: "default",
      name: "Default",
      displayName: "Potato",
      color: "#aaa",
      prefix: "[Potato]",
      perks: ["Basic survival access", "Claim 1 chunk", "/home (1)", "/tpa"],
      order: 0,
    },
    {
      id: "sprout",
      name: "Sprout",
      displayName: "Sprout",
      color: "#7fc95e",
      prefix: "[Sprout]",
      price: 4.99,
      currency: "USD",
      perks: ["All Potato perks", "Claim 3 chunks", "/home (3)", "/back", "Colored chat", "Custom join message"],
      order: 1,
    },
    {
      id: "baked",
      name: "Baked",
      displayName: "Baked Potato",
      color: "#e8c547",
      prefix: "[Baked]",
      price: 14.99,
      currency: "USD",
      featured: true,
      perks: ["All Sprout perks", "Claim 10 chunks", "/home (10)", "/fly (survival)", "/nick", "Particle effects", "Pet slot", "Monthly crate key"],
      order: 2,
    },
    {
      id: "golden",
      name: "Golden",
      displayName: "Golden Potato",
      color: "#ffa500",
      prefix: "[Golden]",
      price: 29.99,
      currency: "USD",
      perks: ["All Baked perks", "Claim 25 chunks", "/home (25)", "/fly (unrestricted)", "/hat", "/repair", "2 pet slots", "Weekly crate keys", "Priority queue", "Custom prefix color"],
      order: 3,
    },
    {
      id: "legendary",
      name: "Legendary",
      displayName: "Legendary Spud",
      color: "#c06cff",
      prefix: "[Legendary]",
      price: 59.99,
      currency: "USD",
      perks: ["All Golden perks", "Unlimited claims", "/home (unlimited)", "/god (survival)", "/enderchest", "/workbench", "/anvil", "5 pet slots", "Daily crate keys", "Custom join/quit messages", "Exclusive cosmetics", "Discord role"],
      order: 4,
    },
  ];

  return json({ ok: true, source: "demo", data: ranks }, 200, env);
};
