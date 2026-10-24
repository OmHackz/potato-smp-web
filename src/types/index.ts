export interface ServerStatus {
  online: boolean;
  ip: string;
  port: number;
  hostname?: string;
  version?: string;
  protocol?: { version: number; name: string };
  motd?: {
    raw: string[];
    clean: string[];
    html: string[];
  };
  players?: {
    online: number;
    max: number;
    list?: Array<{
      name: string;
      uuid: string;
    }>;
  };
  icon?: string;
  software?: string;
  plugins?: Array<{ name: string; version: string }>;
  mods?: Array<{ name: string; version: string }>;
  debug?: {
    ping: boolean;
    query: boolean;
    bedrock: boolean;
    srv: boolean;
    cachehit: boolean;
    cachetime: number;
    cacheexpire: number;
  };
}

export interface PlayerSummary {
  name: string;
  uuid: string;
  online: boolean;
  rank: RankId;
  firstJoin: number;
  lastSeen: number;
  playtime: number;
}

export interface PlayerStats extends PlayerSummary {
  kills: number;
  deaths: number;
  kdRatio: number;
  blocksMined: number;
  blocksPlaced: number;
  mobKills: number;
  balance: number;
  votes: number;
  playtimeBreakdown?: {
    survival: number;
    creative: number;
    other: number;
  };
  recentActivity?: Array<{
    date: string;
    minutes: number;
  }>;
}

export type RankId =
  | 'default'
  | 'sprout'
  | 'baked'
  | 'golden'
  | 'legendary'
  | 'staff'
  | 'admin';

export interface Rank {
  id: RankId;
  name: string;
  displayName: string;
  color: string;
  prefix: string;
  price?: number;
  currency?: string;
  perks: string[];
  featured?: boolean;
  order: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  uuid: string;
  value: number;
  formattedValue: string;
}

export interface Leaderboard {
  type: LeaderboardType;
  entries: LeaderboardEntry[];
  updatedAt: number;
}

export type LeaderboardType =
  | 'playtime'
  | 'kills'
  | 'deaths'
  | 'kd'
  | 'blocksMined'
  | 'blocksPlaced'
  | 'mobKills'
  | 'balance'
  | 'votes';

export interface ServerTotals {
  uniquePlayers: number;
  peakPlayers: number;
  totalPlaytime: number;
  totalSessions: number;
  totalKills: number;
  totalDeaths: number;
  totalBlocksMined: number;
  totalBlocksPlaced: number;
  totalMobKills: number;
  economyBalance: number;
  updatedAt: number;
}

export interface MapConfig {
  url: string;
  embeddable: boolean;
  name: 'bluemap' | 'dynmap' | 'squaremap' | 'other';
}

export interface ShopItem {
  id: string;
  type: 'rank' | 'cosmetic' | 'key' | 'other';
  name: string;
  description: string;
  price: number;
  currency: string;
  image?: string;
  perks?: string[];
  featured?: boolean;
}

export interface PageSEO {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}