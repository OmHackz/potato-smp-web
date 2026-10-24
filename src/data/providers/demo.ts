import type {
  ServerStatus,
  PlayerSummary,
  PlayerStats,
  Leaderboard,
  ServerTotals,
  Rank,
  ShopItem,
} from '../../types';

const DEMO_RANKS: Rank[] = [
  {
    id: 'default',
    name: 'Default',
    displayName: 'Potato',
    color: '#aaa',
    prefix: '[Potato]',
    perks: ['Basic survival access', 'Claim 1 chunk', '/home (1)', '/tpa'],
    order: 0,
  },
  {
    id: 'sprout',
    name: 'Sprout',
    displayName: 'Sprout',
    color: '#7fc95e',
    prefix: '[Sprout]',
    price: 4.99,
    currency: 'USD',
    perks: [
      'All Potato perks',
      'Claim 3 chunks',
      '/home (3)',
      '/back',
      'Colored chat',
      'Custom join message',
    ],
    featured: false,
    order: 1,
  },
  {
    id: 'baked',
    name: 'Baked',
    displayName: 'Baked Potato',
    color: '#e8c547',
    prefix: '[Baked]',
    price: 14.99,
    currency: 'USD',
    perks: [
      'All Sprout perks',
      'Claim 10 chunks',
      '/home (10)',
      '/fly (survival)',
      '/nick',
      'Particle effects',
      'Pet slot',
      'Monthly crate key',
    ],
    featured: true,
    order: 2,
  },
  {
    id: 'golden',
    name: 'Golden',
    displayName: 'Golden Potato',
    color: '#ffa500',
    prefix: '[Golden]',
    price: 29.99,
    currency: 'USD',
    perks: [
      'All Baked perks',
      'Claim 25 chunks',
      '/home (25)',
      '/fly (unrestricted)',
      '/hat',
      '/repair',
      '2 pet slots',
      'Weekly crate keys',
      'Priority queue',
      'Custom prefix color',
    ],
    featured: false,
    order: 3,
  },
  {
    id: 'legendary',
    name: 'Legendary',
    displayName: 'Legendary Spud',
    color: '#c06cff',
    prefix: '[Legendary]',
    price: 59.99,
    currency: 'USD',
    perks: [
      'All Golden perks',
      'Unlimited claims',
      '/home (unlimited)',
      '/god (survival)',
      '/enderchest',
      '/workbench',
      '/anvil',
      '5 pet slots',
      'Daily crate keys',
      'Custom join/quit messages',
      'Exclusive cosmetics',
      'Discord role',
    ],
    featured: false,
    order: 4,
  },
];

const DEMO_PLAYERS: PlayerSummary[] = [
  { name: 'Notch', uuid: '069a79f4-44e9-4726-a5be-fca90e38aaf5', online: true, rank: 'legendary', firstJoin: 1609459200000, lastSeen: Date.now(), playtime: 125000 },
  { name: 'PotatoKing', uuid: '123e4567-e89b-12d3-a456-426614174000', online: true, rank: 'golden', firstJoin: 1640995200000, lastSeen: Date.now(), playtime: 89000 },
  { name: 'SpudMaster', uuid: '123e4567-e89b-12d3-a456-426614174001', online: true, rank: 'baked', firstJoin: 1650000000000, lastSeen: Date.now(), playtime: 67000 },
  { name: 'TaterTot', uuid: '123e4567-e89b-12d3-a456-426614174002', online: false, rank: 'sprout', firstJoin: 1660000000000, lastSeen: Date.now() - 86400000, playtime: 45000 },
  { name: 'HashBrown', uuid: '123e4567-e89b-12d3-a456-426614174003', online: false, rank: 'default', firstJoin: 1670000000000, lastSeen: Date.now() - 172800000, playtime: 23000 },
  { name: 'MashPotato', uuid: '123e4567-e89b-12d3-a456-426614174004', online: false, rank: 'default', firstJoin: 1675000000000, lastSeen: Date.now() - 604800000, playtime: 12000 },
  { name: 'FrenchFry', uuid: '123e4567-e89b-12d3-a456-426614174005', online: false, rank: 'baked', firstJoin: 1645000000000, lastSeen: Date.now() - 259200000, playtime: 78000 },
  { name: 'PotatoWedge', uuid: '123e4567-e89b-12d3-a456-426614174006', online: false, rank: 'sprout', firstJoin: 1665000000000, lastSeen: Date.now() - 43200000, playtime: 34000 },
  { name: 'SweetPotato', uuid: '123e4567-e89b-12d3-a456-426614174007', online: true, rank: 'legendary', firstJoin: 1630000000000, lastSeen: Date.now(), playtime: 156000 },
  { name: 'YamYam', uuid: '123e4567-e89b-12d3-a456-426614174008', online: false, rank: 'default', firstJoin: 1680000000000, lastSeen: Date.now() - 1209600000, playtime: 8000 },
];

const DEMO_STATS: Record<string, PlayerStats> = {};
DEMO_PLAYERS.forEach((p) => {
  DEMO_STATS[p.uuid] = {
    ...p,
    kills: Math.floor(Math.random() * 5000) + 100,
    deaths: Math.floor(Math.random() * 2000) + 50,
    kdRatio: 0,
    blocksMined: Math.floor(Math.random() * 500000) + 10000,
    blocksPlaced: Math.floor(Math.random() * 300000) + 5000,
    mobKills: Math.floor(Math.random() * 10000) + 200,
    balance: Math.floor(Math.random() * 1000000) + 1000,
    votes: Math.floor(Math.random() * 500),
    playtimeBreakdown: {
      survival: Math.floor(p.playtime * 0.7),
      creative: Math.floor(p.playtime * 0.2),
      other: Math.floor(p.playtime * 0.1),
    },
    recentActivity: Array.from({ length: 14 }, (_, i) => ({
      date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      minutes: Math.floor(Math.random() * 180) + 10,
    })).reverse(),
  };
  DEMO_STATS[p.uuid].kdRatio = parseFloat((DEMO_STATS[p.uuid].kills / Math.max(1, DEMO_STATS[p.uuid].deaths)).toFixed(2));
});

const DEMO_LEADERBOARDS: Record<string, Leaderboard> = {
  playtime: {
    type: 'playtime',
    entries: [...DEMO_PLAYERS].sort((a, b) => b.playtime - a.playtime).slice(0, 50).map((p, i) => ({
      rank: i + 1,
      name: p.name,
      uuid: p.uuid,
      value: p.playtime,
      formattedValue: formatPlaytime(p.playtime),
    })),
    updatedAt: Date.now(),
  },
  kills: {
    type: 'kills',
    entries: Object.values(DEMO_STATS).sort((a, b) => b.kills - a.kills).slice(0, 50).map((p, i) => ({
      rank: i + 1,
      name: p.name,
      uuid: p.uuid,
      value: p.kills,
      formattedValue: formatNumber(p.kills),
    })),
    updatedAt: Date.now(),
  },
  balance: {
    type: 'balance',
    entries: Object.values(DEMO_STATS).sort((a, b) => b.balance - a.balance).slice(0, 50).map((p, i) => ({
      rank: i + 1,
      name: p.name,
      uuid: p.uuid,
      value: p.balance,
      formattedValue: '$' + formatNumber(p.balance),
    })),
    updatedAt: Date.now(),
  },
  kd: {
    type: 'kd',
    entries: Object.values(DEMO_STATS)
      .filter((p) => p.deaths > 50)
      .sort((a, b) => b.kdRatio - a.kdRatio)
      .slice(0, 50)
      .map((p, i) => ({
        rank: i + 1,
        name: p.name,
        uuid: p.uuid,
        value: Math.round(p.kdRatio * 100),
        formattedValue: p.kdRatio.toFixed(2),
      })),
    updatedAt: Date.now(),
  },
  blocksMined: {
    type: 'blocksMined',
    entries: Object.values(DEMO_STATS).sort((a, b) => b.blocksMined - a.blocksMined).slice(0, 50).map((p, i) => ({
      rank: i + 1,
      name: p.name,
      uuid: p.uuid,
      value: p.blocksMined,
      formattedValue: formatNumber(p.blocksMined),
    })),
    updatedAt: Date.now(),
  },
};

const DEMO_TOTALS: ServerTotals = {
  uniquePlayers: 1247,
  peakPlayers: 89,
  totalPlaytime: 2847500,
  totalSessions: 15600,
  totalKills: 482391,
  totalDeaths: 234567,
  totalBlocksMined: 12890000,
  totalBlocksPlaced: 8945000,
  totalMobKills: 567890,
  economyBalance: 45230000,
  updatedAt: Date.now(),
};

const DEMO_SHOP_ITEMS: ShopItem[] = [
  ...DEMO_RANKS.filter(r => r.id !== 'default').map(r => ({
    id: `rank-${r.id}`,
    type: 'rank' as const,
    name: r.displayName,
    description: r.perks.join(', '),
    price: r.price || 0,
    currency: r.currency || 'USD',
    perks: r.perks,
    featured: r.featured,
  })),
  {
    id: 'cosmetic-particles',
    type: 'cosmetic',
    name: 'Particle Trails',
    description: 'Unlock 15 unique particle trails for your player',
    price: 4.99,
    currency: 'USD',
    featured: false,
  },
  {
    id: 'cosmetic-pets',
    type: 'cosmetic',
    name: 'Pet Bundle',
    description: 'All 12 pets + 3 exclusive legendary pets',
    price: 9.99,
    currency: 'USD',
    featured: true,
  },
  {
    id: 'key-crate-monthly',
    type: 'key',
    name: 'Monthly Crate Key',
    description: 'One key for the monthly exclusive crate',
    price: 2.99,
    currency: 'USD',
  },
];

function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  if (hours >= 1000) return `${(hours / 1000).toFixed(1)}k hrs`;
  return `${hours} hrs`;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

export const demoProvider = {
  async getServerStatus(): Promise<ServerStatus> {
    await new Promise(r => setTimeout(r, 100));
    return {
      online: true,
      ip: 'play.potatosmp.net',
      port: 25565,
      hostname: 'play.potatosmp.net',
      version: '1.20.4',
      protocol: { version: 765, name: '1.20.4' },
      motd: {
        raw: ['§aWelcome to §6Potato§eSMP§a!', '§7play.potatosmp.net'],
        clean: ['Welcome to PotatoSMP!', 'play.potatosmp.net'],
        html: ['<span style="color:#55FF55">Welcome to <span style="color:#FFAA00">Potato<span style="color:#FFFF55">SMP</span></span>!', '<span style="color:#AAAAAA">play.potatosmp.net</span>'],
      },
      players: {
        online: DEMO_PLAYERS.filter(p => p.online).length,
        max: 100,
        list: DEMO_PLAYERS.filter(p => p.online).slice(0, 12).map(p => ({ name: p.name, uuid: p.uuid })),
      },
      icon: '',
      debug: { ping: true, query: true, bedrock: false, srv: true, cachehit: false, cachetime: Date.now(), cacheexpire: Date.now() + 300000 },
    };
  },

  async getPlayers(): Promise<PlayerSummary[]> {
    await new Promise(r => setTimeout(r, 150));
    return DEMO_PLAYERS;
  },

  async getPlayer(uuid: string): Promise<PlayerStats | null> {
    await new Promise(r => setTimeout(r, 100));
    return DEMO_STATS[uuid] || null;
  },

  async getLeaderboard(type: string): Promise<Leaderboard | null> {
    await new Promise(r => setTimeout(r, 100));
    return DEMO_LEADERBOARDS[type] || null;
  },

  async getServerTotals(): Promise<ServerTotals> {
    await new Promise(r => setTimeout(r, 100));
    return DEMO_TOTALS;
  },

  async getRanks(): Promise<Rank[]> {
    await new Promise(r => setTimeout(r, 50));
    return DEMO_RANKS;
  },

  async getShopItems(): Promise<ShopItem[]> {
    await new Promise(r => setTimeout(r, 100));
    return DEMO_SHOP_ITEMS;
  },
};

export type DataProvider = typeof demoProvider;