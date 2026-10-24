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
 * Custom provider template - replace with your actual API calls
 * Set VITE_STATS_MODE=custom and VITE_STATS_API_URL in .env
 */

const API_BASE = import.meta.env.VITE_STATS_API_URL || '';

async function fetchJson<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    // Add credentials if your API needs cookies/auth
    // credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export const customProvider = {
  async getServerStatus(): Promise<ServerStatus> {
    return fetchJson<ServerStatus>('/server/status');
  },

  async getPlayers(): Promise<PlayerSummary[]> {
    return fetchJson<PlayerSummary[]>('/players');
  },

  async getPlayer(uuid: string): Promise<PlayerStats | null> {
    try {
      return await fetchJson<PlayerStats>(`/players/${uuid}`);
    } catch (e) {
      if (e instanceof Error && e.message.includes('404')) return null;
      throw e;
    }
  },

  async getLeaderboard(type: string): Promise<Leaderboard | null> {
    try {
      return await fetchJson<Leaderboard>(`/leaderboards/${type}`);
    } catch (e) {
      if (e instanceof Error && e.message.includes('404')) return null;
      throw e;
    }
  },

  async getServerTotals(): Promise<ServerTotals> {
    return fetchJson<ServerTotals>('/server/totals');
  },

  async getRanks(): Promise<Rank[]> {
    return fetchJson<Rank[]>('/shop/ranks');
  },

  async getShopItems(): Promise<ShopItem[]> {
    return fetchJson<ShopItem[]>('/shop/items');
  },
};

export type DataProvider = typeof customProvider;