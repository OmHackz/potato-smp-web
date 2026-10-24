import type {
  ServerStatus,
  PlayerSummary,
  PlayerStats,
  Leaderboard,
  ServerTotals,
  Rank,
  ShopItem,
} from '../../types';

/**
 * Plan Player Analytics provider
 * Plan exposes a JSON API at /api/v1/... on its built-in webserver
 * Configure VITE_STATS_API_URL to point to your Plan webserver (e.g., http://localhost:8080)
 */

const API_BASE = import.meta.env.VITE_STATS_API_URL || '';

async function fetchJson<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}/api/v1${endpoint}`, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    if (res.status === 404) return null as T;
    throw new Error(`Plan API error: ${res.status}`);
  }

  return res.json();
}

export const planProvider = {
  async getServerStatus(): Promise<ServerStatus> {
    // Plan doesn't provide server ping status, use mcsrvstat.us instead
    // This is a placeholder - the hook will use mcsrvstat for status
    return {
      online: true,
      ip: '',
      port: 25565,
      players: { online: 0, max: 0 },
    };
  },

  async getPlayers(): Promise<PlayerSummary[]> {
    // Plan's /api/v1/players returns paginated list
    const data = await fetchJson<{ players: PlayerSummary[] }>('/players');
    return data?.players || [];
  },

  async getPlayer(uuid: string): Promise<PlayerStats | null> {
    return fetchJson<PlayerStats>(`/players/${uuid}`);
  },

  async getLeaderboard(type: string): Promise<Leaderboard | null> {
    // Map our types to Plan's endpoints
    const endpointMap: Record<string, string> = {
      playtime: '/leaderboards/playtime',
      kills: '/leaderboards/kills',
      deaths: '/leaderboards/deaths',
      kd: '/leaderboards/kd',
      blocksMined: '/leaderboards/blocks_mined',
      blocksPlaced: '/leaderboards/blocks_placed',
      mobKills: '/leaderboards/mob_kills',
      balance: '/leaderboards/balance',
      votes: '/leaderboards/votes',
    };
    const endpoint = endpointMap[type];
    if (!endpoint) return null;
    return fetchJson<Leaderboard>(endpoint);
  },

  async getServerTotals(): Promise<ServerTotals> {
    return fetchJson<ServerTotals>('/server/totals');
  },

  async getRanks(): Promise<Rank[]> {
    // Plan doesn't have ranks - return empty, use local config
    return [];
  },

  async getShopItems(): Promise<ShopItem[]> {
    // Plan doesn't have shop - return empty, use local config
    return [];
  },
};

export type DataProvider = typeof planProvider;