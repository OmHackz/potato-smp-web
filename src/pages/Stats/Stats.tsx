import { useMemo } from 'react';
import { clsx } from 'clsx';
import { Panel } from '../../components/ui/Panel';
import { Tabs, TabPanels } from '../../components/ui/Tabs';
import { PlayerHeadWithName } from '../../components/ui/PlayerHead';
import { RankBadge } from '../../lib/rankColors';
import { useServerTotals, useLeaderboard } from '../../hooks/useServerStatus';
import { formatNumber, formatPlaytime } from '../../lib/utils';
import styles from './Stats.module.css';

// Icons - defined first
const PlayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PeakIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" />
  </svg>
);

const PlaytimeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const SessionsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const KillsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 3.5" />
  </svg>
);

const DeathsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M12 2a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a5 5 0 0 1 10 0z" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
  </svg>
);

const BlocksIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const EconomyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12M6 12h12" />
  </svg>
);

const GoldIcon = () => (
  <svg viewBox="0 0 16 16" fill="#ffd700" className={styles.podiumIcon}>
    <path d="M8 2L14 8H2z" />
  </svg>
);

const SilverIcon = () => (
  <svg viewBox="0 0 16 16" fill="#c0c0c0" className={styles.podiumIcon}>
    <path d="M8 2L14 8H2z" />
  </svg>
);

const BronzeIcon = () => (
  <svg viewBox="0 0 16 16" fill="#cd7f32" className={styles.podiumIcon}>
    <path d="M8 2L14 8H2z" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
    <path d="M6 9l6 6 6-6" />
    <path d="M12 3v18M4 9h16" />
  </svg>
);

const LoadingSpinner = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.spinner}>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);

const Skeleton = ({ width, height, rounded, className }: { width?: number | string; height?: number | string; rounded?: boolean; className?: string }) => (
  <div
    className={clsx(styles.skeleton, className)}
    style={{
      width,
      height,
      borderRadius: rounded ? '50%' : 'var(--radius-sm)',
    } as React.CSSProperties}
  />
);

const LEADERBOARD_TYPES = [
  { id: 'playtime', label: 'Playtime', format: formatPlaytime },
  { id: 'kills', label: 'Kills', format: formatNumber },
  { id: 'deaths', label: 'Deaths', format: formatNumber },
  { id: 'kd', label: 'K/D Ratio', format: (v: number) => (v / 100).toFixed(2) },
  { id: 'blocksMined', label: 'Blocks Mined', format: formatNumber },
  { id: 'blocksPlaced', label: 'Blocks Placed', format: formatNumber },
  { id: 'mobKills', label: 'Mob Kills', format: formatNumber },
  { id: 'balance', label: 'Balance', format: (v: number) => '$' + formatNumber(v) },
  { id: 'votes', label: 'Votes', format: formatNumber },
] as const;

const TOTALS_CONFIG = [
  { key: 'uniquePlayers', label: 'Unique Players', icon: <PlayersIcon />, format: formatNumber },
  { key: 'peakPlayers', label: 'Peak Online', icon: <PeakIcon />, format: (v: number) => v.toString() },
  { key: 'totalPlaytime', label: 'Total Playtime', icon: <PlaytimeIcon />, format: formatPlaytime },
  { key: 'totalSessions', label: 'Total Sessions', icon: <SessionsIcon />, format: formatNumber },
  { key: 'totalKills', label: 'Total Kills', icon: <KillsIcon />, format: formatNumber },
  { key: 'totalDeaths', label: 'Total Deaths', icon: <DeathsIcon />, format: formatNumber },
  { key: 'totalBlocksMined', label: 'Blocks Mined', icon: <BlocksIcon />, format: formatNumber },
  { key: 'economyBalance', label: 'Economy Balance', icon: <EconomyIcon />, format: (v: number) => '$' + formatNumber(v) },
] as const;

export const Stats = () => {
  const { data: totals, isLoading: totalsLoading } = useServerTotals();
  const leaderboards = LEADERBOARD_TYPES.map(({ id }) => useLeaderboard(id));

  const allLoading = totalsLoading || leaderboards.some(l => l.isLoading);
  const anyError = leaderboards.some(l => l.isError);

  if (allLoading) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Statistics</h1>
          <p className={styles.subtitle}>Server-wide statistics and leaderboards</p>
        </header>
        <div className={styles.loading}>
          <LoadingSpinner />
          <p>Loading statistics...</p>
        </div>
      </div>
    );
  }

  const tabs: Array<{ id: string; label: string; count?: number }> = LEADERBOARD_TYPES.map((type, i) => ({
    id: type.id,
    label: type.label,
    count: leaderboards[i].data?.entries.length,
  }));

  const activeTab = LEADERBOARD_TYPES[0].id;

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Statistics</h1>
          <p className={styles.subtitle}>Server-wide statistics and leaderboards</p>
        </div>
      </header>

      {/* Server Totals */}
      {totals && (
        <section className={styles.totals} aria-label="Server totals">
          <div className={styles.totalsGrid}>
            {TOTALS_CONFIG.map(({ key, label, icon, format }) => (
              <Panel key={key} variant="default" className={styles.totalCard}>
                <div className={styles.totalIcon}>{icon}</div>
                <div className={styles.totalValue}>{format(totals[key as keyof typeof totals] as number)}</div>
                <div className={styles.totalLabel}>{label}</div>
              </Panel>
            ))}
          </div>
        </section>
      )}

      {/* Leaderboards */}
      <section className={styles.leaderboards} aria-label="Leaderboards">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={() => {}}
          variant="underline"
          fullWidth
        />
        <TabPanels tabs={tabs} activeTab={activeTab}>
          {(tabId) => {
            const typeConfig = LEADERBOARD_TYPES.find(t => t.id === tabId);
            const lb = leaderboards.find((_, i) => LEADERBOARD_TYPES[i].id === tabId);
            const data = lb?.data;

            if (lb?.isLoading) {
              return <LeaderboardSkeleton />;
            }

            if (lb?.isError || !data) {
              return (
                <Panel variant="outlined" className={styles.errorPanel}>
                  <ErrorIcon />
                  <p>Failed to load leaderboard</p>
                </Panel>
              );
            }

            if (!data.entries.length) {
              return (
                <Panel variant="outlined" className={styles.emptyPanel}>
                  <TrophyIcon />
                  <p>No data available yet</p>
                </Panel>
              );
            }

            return (
              <div className={styles.tableWrapper}>
                <table className={styles.table} role="table">
                  <thead>
                    <tr>
                      <th scope="col" className={styles.colRank}>#</th>
                      <th scope="col" className={styles.colPlayer}>Player</th>
                      <th scope="col" className={styles.colValue}>{typeConfig?.label || 'Value'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.entries.map((entry) => (
                      <tr key={entry.uuid} className={styles.row}>
                        <td className={clsx(styles.colRank, entry.rank <= 3 && styles.podium)}>
                          {entry.rank === 1 && <GoldIcon />}
                          {entry.rank === 2 && <SilverIcon />}
                          {entry.rank === 3 && <BronzeIcon />}
                          <span>{entry.rank}</span>
                        </td>
                        <td className={styles.colPlayer}>
                          <PlayerHeadWithName
                            username={entry.name}
                            uuid={entry.uuid}
                            size="sm"
                            showName={true}
                          />
                        </td>
                        <td className={styles.colValue}>
                          {typeConfig?.format ? typeConfig.format(entry.value) : entry.formattedValue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }}
        </TabPanels>
      </section>
    </div>
  );
};

const LeaderboardSkeleton = () => (
  <div className={styles.tableWrapper}>
    <table className={styles.table} role="table">
      <thead>
        <tr>
          <th scope="col" className={styles.colRank}>#</th>
          <th scope="col" className={styles.colPlayer}>Player</th>
          <th scope="col" className={styles.colValue}>Value</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 8 }).map((_, i) => (
          <tr key={i} className={styles.skeletonRow}>
            <td className={styles.colRank}><Skeleton width="30" /></td>
            <td className={styles.colPlayer}>
              <div className={styles.skeletonPlayer}>
                <Skeleton className={styles.skeletonAvatar} width="32" height="32" rounded />
                <Skeleton width="100" height="14" />
              </div>
            </td>
            <td className={styles.colValue}><Skeleton width="80" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);