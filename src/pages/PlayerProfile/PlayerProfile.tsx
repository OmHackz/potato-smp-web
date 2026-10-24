import { useParams, Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { MCButton } from '../../components/ui/MCButton';
import { Panel } from '../../components/ui/Panel';
import { PlayerHead } from '../../components/ui/PlayerHead';
import { RankBadge, getRankColor } from '../../lib/rankColors';
import { usePlayer } from '../../hooks/useServerStatus';
import { formatPlaytime, formatTimestamp, formatNumber } from '../../lib/utils';
import styles from './PlayerProfile.module.css';

// Icons - defined first
const SwordIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 3.5" />
    <path d="M14 17l-3 3 3-3" />
  </svg>
);

const SkullIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" className={className}>
    <path d="M12 2a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a5 5 0 0 1 10 0z" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
  </svg>
);

const RatioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M5 12h14M5 6h14M5 18h14" />
  </svg>
);

const PickaxeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const BlockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const MobIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M14 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z" />
    <path d="M8 13h2M14 13h2" />
    <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

const CoinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12M6 12h12" />
  </svg>
);

const VoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M12 16v-8" />
    <path d="M12 12h.01" />
  </svg>
);

type StatKey = 'kills' | 'deaths' | 'kdRatio' | 'blocksMined' | 'blocksPlaced' | 'mobKills' | 'balance' | 'votes';

interface StatConfig {
  key: StatKey;
  label: string;
  icon: React.ReactNode;
  color: string;
  format?: (v: number) => string;
}

const STATS_CONFIG: StatConfig[] = [
  { key: 'kills', label: 'Kills', icon: <SwordIcon />, color: '#ff5555' },
  { key: 'deaths', label: 'Deaths', icon: <SkullIcon />, color: '#aa0000' },
  { key: 'kdRatio', label: 'K/D Ratio', icon: <RatioIcon />, color: '#e8c547', format: (v: number) => v.toFixed(2) },
  { key: 'blocksMined', label: 'Blocks Mined', icon: <PickaxeIcon />, color: '#5aa642', format: formatNumber },
  { key: 'blocksPlaced', label: 'Blocks Placed', icon: <BlockIcon />, color: '#4a9038', format: formatNumber },
  { key: 'mobKills', label: 'Mob Kills', icon: <MobIcon />, color: '#c06cff', format: formatNumber },
  { key: 'balance', label: 'Balance', icon: <CoinIcon />, color: '#e8c547', format: (v: number) => '$' + formatNumber(v) },
  { key: 'votes', label: 'Votes', icon: <VoteIcon />, color: '#55ffff', format: formatNumber },
] as const;

export const PlayerProfile = () => {
  const { name } = useParams<{ name: string }>();
  const { data: player, isLoading, isError } = usePlayer(name);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <LoadingSpinner />
          <p>Loading player...</p>
        </div>
      </div>
    );
  }

  if (isError || !player) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <SkullIcon className={styles.bigIcon} />
          <h1>Player Not Found</h1>
          <p>No player named <strong>{name}</strong> exists on PotatoSMP.</p>
          <MCButton variant="primary" onClick={() => window.location.href = '/players'}>
            Browse Players
          </MCButton>
        </div>
      </div>
    );
  }

  const rankColor = getRankColor(player.rank);
  const isOnline = player.online;

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <PlayerHead
            username={player.name}
            uuid={player.uuid}
            size="xl"
            title={player.name}
          />
          <div className={styles.headerInfo}>
            <div className={styles.nameRow}>
              <h1 className={styles.playerName}>{player.name}</h1>
              <RankBadge rankId={player.rank} size="lg" showIcon />
            </div>
            <div className={styles.meta}>
              <span className={clsx(styles.status, isOnline && styles.online)}>
                {isOnline ? '● Online now' : `Last seen ${formatTimestamp(player.lastSeen)}`}
              </span>
              <span>Joined {formatTimestamp(player.firstJoin)}</span>
              <span>{formatPlaytime(player.playtime)} total playtime</span>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <MCButton variant="secondary" asChild>
            <Link to="/players">← Back to Players</Link>
          </MCButton>
        </div>
      </header>

      {/* Stats Grid */}
      <section className={styles.statsSection} aria-labelledby="stats-title">
        <h2 id="stats-title" className={styles.sectionTitle}>Statistics</h2>
        <div className={styles.statsGrid}>
          {STATS_CONFIG.map((stat) => {
            const value = player[stat.key] as number;
            const formatted = stat.format ? stat.format(value) : value;
            return (
              <Panel key={stat.key} variant="default" className={styles.statCard}>
                <div className={styles.statHeader}>
                  <div className={styles.statIcon} style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
                <div className={styles.statValue} style={{ color: stat.color }}>
                  {formatted}
                </div>
              </Panel>
            );
          })}
        </div>
      </section>

      {/* Activity Chart */}
      {player.recentActivity && player.recentActivity.length > 0 && (
        <section className={styles.activitySection} aria-labelledby="activity-title">
          <h2 id="activity-title" className={styles.sectionTitle}>Recent Activity</h2>
          <Panel variant="default" className={styles.activityPanel}>
            <ActivityChart data={player.recentActivity} />
          </Panel>
        </section>
      )}

      {/* Playtime Breakdown */}
      {player.playtimeBreakdown && (
        <section className={styles.breakdownSection} aria-labelledby="breakdown-title">
          <h2 id="breakdown-title" className={styles.sectionTitle}>Playtime Breakdown</h2>
          <div className={styles.breakdownGrid}>
            {Object.entries(player.playtimeBreakdown).map(([mode, minutes]) => (
              <Panel key={mode} variant="outlined" className={styles.breakdownCard}>
                <div className={styles.breakdownLabel}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </div>
                <div className={styles.breakdownValue}>{formatPlaytime(minutes)}</div>
                <div className={styles.breakdownBar}>
                  <div
                    className={styles.breakdownFill}
                    style={{
                      width: `${(minutes / player.playtime) * 100}%`,
                      background: rankColor,
                    } as React.CSSProperties}
                  />
                </div>
              </Panel>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const ActivityChart = ({ data }: { data: Array<{ date: string; minutes: number }> }) => {
  const maxMinutes = Math.max(...data.map(d => d.minutes), 1);
  const width = 100 / data.length;

  const areaPath = data.map((d, i) => {
    const x = i * width + width / 2;
    const y = 55 - (d.minutes / maxMinutes) * 50;
    return `${i === 0 ? 'M' : 'L'}${x} ${y}`;
  }).join(' ') + ' L100 55 L0 55 Z';

  const linePath = data.map((d, i) => {
    const x = i * width + width / 2;
    const y = 55 - (d.minutes / maxMinutes) * 50;
    return `${i === 0 ? 'M' : 'L'}${x} ${y}`;
  }).join(' ');

  return (
    <div className={styles.chart} role="img" aria-label="Playtime activity chart">
      <svg viewBox="0 0 100 60" className={styles.chartSvg} preserveAspectRatio="none">
        <defs>
          <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={getRankColor('legendary')} stopOpacity="0.4" />
            <stop offset="100%" stopColor={getRankColor('legendary')} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area */}
        <path
          d={areaPath}
          fill="url(#activityGradient)"
        />
        {/* Line */}
        <path
          d={linePath}
          stroke={getRankColor('legendary')}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Points */}
        {data.map((d, i) => {
          const x = i * width + width / 2;
          const y = 55 - (d.minutes / maxMinutes) * 50;
          return (
            <circle
              key={d.date}
              cx={x}
              cy={y}
              r="3"
              fill={getRankColor('legendary')}
              className={styles.chartPoint}
            />
          );
        })}
      </svg>
      <div className={styles.chartLabels}>
        {data.map((d, i) => (
          <span key={d.date} style={{ left: `${i * width}%`, width: `${width}%` }}>
            {new Date(d.date).getDate()}
          </span>
        ))}
      </div>
      <div className={styles.chartTooltip}>
        Hover a day to see playtime
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.spinner}>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);