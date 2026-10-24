import { useQuery } from '@tanstack/react-query';
import { dataProvider } from '../data';

const STATUS_CACHE_KEY = 'serverStatus';
const STATUS_STALE_TIME = 60 * 1000; // 60 seconds
const STATUS_REFETCH_INTERVAL = 60 * 1000; // 60 seconds

export function useServerStatus() {
  return useQuery({
    queryKey: [STATUS_CACHE_KEY],
    queryFn: async () => {
      try {
        // Try mcsrvstat.us first for reliable server ping
        const address = import.meta.env.VITE_SERVER_ADDRESS || 'play.potatosmp.net';
        const edition = import.meta.env.VITE_SERVER_EDITION || 'java';
        const apiUrl = edition === 'bedrock'
          ? `https://api.mcsrvstat.us/bedrock/3/${address}`
          : `https://api.mcsrvstat.us/3/${address}`;

        const res = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'PotatoSMP-Website/1.0',
          },
        });

        if (!res.ok) {
          throw new Error(`Status API error: ${res.status}`);
        }

        const data = await res.json();
        return data as import('../types').ServerStatus;
      } catch (error) {
        console.warn('mcsrvstat.us failed, falling back to data provider:', error);
        // Fallback to custom provider if configured
        return dataProvider.getServerStatus();
      }
    },
    staleTime: STATUS_STALE_TIME,
    refetchInterval: STATUS_REFETCH_INTERVAL,
    retry: 2,
    retryDelay: 2000,
  });
}

export function usePlayers() {
  return useQuery({
    queryKey: ['players'],
    queryFn: () => dataProvider.getPlayers(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePlayer(uuid: string | undefined) {
  return useQuery({
    queryKey: ['player', uuid],
    queryFn: () => dataProvider.getPlayer(uuid!),
    enabled: !!uuid,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLeaderboard(type: string) {
  return useQuery({
    queryKey: ['leaderboard', type],
    queryFn: () => dataProvider.getLeaderboard(type),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
}

export function useServerTotals() {
  return useQuery({
    queryKey: ['serverTotals'],
    queryFn: () => dataProvider.getServerTotals(),
    staleTime: 10 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
  });
}

export function useRanks() {
  return useQuery({
    queryKey: ['ranks'],
    queryFn: () => dataProvider.getRanks(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useShopItems() {
  return useQuery({
    queryKey: ['shopItems'],
    queryFn: () => dataProvider.getShopItems(),
    staleTime: 30 * 60 * 1000,
  });
}