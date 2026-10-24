import type { Context, Bindings } from "../../../_utils";
import { withCors, json } from "../../../_utils";

const LEADERBOARDS: Record<string, Array<{ uuid: string; name: string; value: number }>> = {
  playtime: [
    { uuid: "069a79f4-44e9-4726-a5be-fca90e38aaf5", name: "Notch", value: 125000 },
    { uuid: "123e4567-e89b-12d3-a456-426614174007", name: "SweetPotato", value: 156000 },
    { uuid: "123e4567-e89b-12d3-a456-426614174000", name: "PotatoKing", value: 89000 },
    { uuid: "123e4567-e89b-12d3-a456-426614174005", name: "FrenchFry", value: 78000 },
    { uuid: "123e4567-e89b-12d3-a456-426614174001", name: "SpudMaster", value: 67000 },
  ],
};

export const onRequestGet: Context["onRequest"] = async function onRequest({ request, env, context }) {
  if (request.method === "OPTIONS") return withCors(new Response(null, { status: 204 }), env);

  const type = context.params.type;
  if (!type) return json({ ok: false, error: "missing type" }, 400, env);

  const entries = LEADERBOARDS[type];
  if (!entries) return json({ ok: true, type, entries: [], updatedAt: Date.now() }, 200, env);

  return json(
    {
      ok: true,
      type,
      updatedAt: Date.now(),
      entries: entries.map((e, i) => ({
        rank: i + 1,
        uuid: e.uuid,
        name: e.name,
        value: e.value,
        formattedValue: formatByType(type, e.value),
      })),
    },
    200,
    env,
  );
};

function formatByType(type: string, value: number): string {
  switch (type) {
    case "playtime":
      return `${Math.floor(value / 60)}h`;
    case "balance":
      return `$${value.toLocaleString()}`;
    case "kd":
      return (value / 100).toFixed(2);
    default:
      return value.toLocaleString();
  }
}
