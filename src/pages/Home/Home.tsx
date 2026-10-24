import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { MCButton } from '../../components/ui/MCButton';
import { Panel } from '../../components/ui/Panel';
import { ServerStatusPill } from '../../components/ui/ServerStatusPill';
import { CopyIP } from '../../components/ui/CopyIP';
import { PlayerHeadWithName } from '../../components/ui/PlayerHead';
import { useServerStatus, usePlayers } from '../../hooks/useServerStatus';
import { dataProvider } from '../../data';
import { formatNumber, formatPlaytime } from '../../lib/utils';
import styles from './Home.module.css';

// SVG Icons - defined first to avoid temporal dead zone
const SurvivalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureSvg}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const EconomyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureSvg}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v12M6 12h12" />
  </svg>
);

const ClaimsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureSvg}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
  </svg>
);

const EventsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureSvg}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <circle cx="18" cy="18" r="3" fill="currentColor" />
  </svg>
);

const CommunityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureSvg}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CustomIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureSvg}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const PlayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.statSvg}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PlaytimeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.statSvg}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.statSvg}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CrownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.statSvg}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const MouseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.mouseIcon}>
    <path d="M12 2a2 2 0 0 1 2 2v16a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2z" />
    <circle cx="12" cy="10" r="1" fill="currentColor" />
  </svg>
);

const PotatoMascot = ({ size }: { size: 'large' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    className={clsx(styles.mascot, size === 'large' && styles.mascotLarge)}
    aria-hidden="true"
  >
    <ellipse cx="100" cy="130" rx="65" ry="55" fill="#d4a574" stroke="#8b6b3a" strokeWidth="3" />
    <ellipse cx="78" cy="115" rx="8" ry="10" fill="#8b6b3a" opacity="0.6" />
    <ellipse cx="122" cy="115" rx="8" ry="10" fill="#8b6b3a" opacity="0.6" />
    <ellipse cx="90" cy="145" rx="10" ry="5" fill="#8b6b3a" opacity="0.4" />
    <ellipse cx="110" cy="145" rx="10" ry="5" fill="#8b6b3a" opacity="0.4" />
    <path d="M100 90 Q100 70 120 70 Q140 70 140 95" stroke="#8b6b3a" strokeWidth="6" fill="none" strokeLinecap="round" />
    <circle cx="138" cy="68" r="8" fill="#7fc95e" />
  </svg>
);

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    icon: <SurvivalIcon />,
    title: 'Pure Survival',
    desc: 'Vanilla-style gameplay with quality-of-life improvements. No pay-to-win, just pure Minecraft.',
  },
  {
    icon: <EconomyIcon />,
    title: 'Player Economy',
    desc: 'Shops, auctions, jobs, and a balanced economy. Build your potato empire.',
  },
  {
    icon: <ClaimsIcon />,
    title: 'Land Claims',
    desc: 'Protect your builds with intuitive chunk claiming. No griefing, no stress.',
  },
  {
    icon: <EventsIcon />,
    title: 'Weekly Events',
    desc: 'Build battles, scavenger hunts, PvP tournaments, and seasonal celebrations.',
  },
  {
    icon: <CommunityIcon />,
    title: 'Friendly Community',
    desc: 'Active Discord, helpful staff, and a welcoming atmosphere for all players.',
  },
  {
    icon: <CustomIcon />,
    title: 'Custom Features',
    desc: 'Unique items, custom enchantments, player warps, and more surprises.',
  },
];

const RANK_PREVIEW = ['sprout', 'baked', 'golden', 'legendary'] as const;

export const Home = () => {
  const { data: status, isLoading: loading, isError, refetch } = useServerStatus();
  const { data: playersData } = usePlayers();

  const onlinePlayers = playersData?.filter(p => p.online).slice(0, 6) || [];
  const topPlayers = playersData?.slice(0, 4) || [];

  const handleCopyIP = () => {
    // Toast shown by CopyIP component
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroBackground} aria-hidden="true">
          <PotatoMascot size="large" />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            <span>Server Online • Join the Adventure</span>
          </div>
          <h1 id="hero-title" className={styles.heroTitle}>
            Welcome to <span className={styles.highlight}>PotatoSMP</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A cozy survival community where everyone grows together.
            No pay-to-win, just pure Minecraft fun with friends.
          </p>
          <div className={styles.heroActions}>
            <MCButton size="xl" variant="primary" asChild>
              <Link to="/join">Join Now</Link>
            </MCButton>
            <MCButton size="xl" variant="secondary" asChild>
              <Link to="/players">View Players</Link>
            </MCButton>
          </div>
          <div className={styles.heroStatus}>
            <ServerStatusPill
              status={status ?? null}
              loading={loading}
              compact={false}
              showAddress={true}
              onCopyIP={handleCopyIP}
            />
            {isError && (
              <MCButton variant="ghost" size="sm" onClick={handleRetry}>
                Retry
              </MCButton>
            )}
          </div>
        </div>
        <div className={styles.heroScrollHint} aria-hidden="true">
          <MouseIcon />
        </div>
      </section>

      {/* Quick Stats */}
      <section className={styles.quickStats} aria-label="Server statistics">
        <div className={styles.statsGrid}>
          <StatCard
            icon={<PlayersIcon />}
            value={status?.players?.online?.toString() || '?'}
            label="Online Now"
            max={status?.players?.max}
          />
          <StatCard
            icon={<PlaytimeIcon />}
            value={playersData ? formatNumber(playersData.length) : '?'}
            label="Total Players"
          />
          <StatCard
            icon={<HeartIcon />}
            value={status?.players?.max?.toString() || '100'}
            label="Max Players"
          />
          <StatCard
            icon={<CrownIcon />}
            value={playersData ? RANK_PREVIEW.length.toString() : '4'}
            label="Ranks Available"
          />
        </div>
      </section>

      {/* Features */}
      <section className={styles.features} aria-labelledby="features-title">
        <div className={styles.sectionHeader}>
          <h2 id="features-title" className={styles.sectionTitle}>Why Play PotatoSMP?</h2>
          <p className={styles.sectionSubtitle}>Everything you need for the perfect survival experience</p>
        </div>
        <div className={styles.featuresGrid}>
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </section>

      {/* Top Players Preview */}
      {playersData && topPlayers.length > 0 && (
        <section className={styles.topPlayers} aria-labelledby="top-players-title">
          <div className={styles.sectionHeader}>
            <h2 id="top-players-title" className={styles.sectionTitle}>Top Players</h2>
            <MCButton variant="ghost" size="sm" asChild>
              <Link to="/players">View All →</Link>
            </MCButton>
          </div>
          <div className={styles.playersPreview}>
            {topPlayers.map((player, i) => (
              <PlayerPreviewCard key={player.uuid} player={player} rank={i + 1} />
            ))}
          </div>
        </section>
      )}

      {/* Online Now */}
      {onlinePlayers.length > 0 && (
        <section className={styles.onlineNow} aria-labelledby="online-title">
          <div className={styles.sectionHeader}>
            <h2 id="online-title" className={styles.sectionTitle}>Online Right Now</h2>
            <MCButton variant="ghost" size="sm" asChild>
              <Link to="/players">View All →</Link>
            </MCButton>
          </div>
          <div className={styles.onlineGrid}>
            {onlinePlayers.map((player) => (
              <OnlinePlayerCard key={player.uuid} player={player} />
            ))}
          </div>
        </section>
      )}

      {/* Rank Teaser */}
      <section className={styles.rankTeaser} aria-labelledby="ranks-title">
        <div className={styles.sectionHeader}>
          <h2 id="ranks-title" className={styles.sectionTitle}>Support the Server</h2>
          <p className={styles.sectionSubtitle}>Ranks help keep PotatoSMP running and unlock cool perks</p>
        </div>
        <div className={styles.rankCards}>
          {RANK_PREVIEW.map((rankId) => (
            <RankPreviewCard key={rankId} rankId={rankId} />
          ))}
        </div>
        <div className={styles.rankCTA}>
          <MCButton variant="gold" size="lg" asChild>
            <Link to="/shop">View All Ranks & Perks</Link>
          </MCButton>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.ctaContent}>
          <h2 id="cta-title" className={styles.ctaTitle}>Ready to Join?</h2>
          <p className={styles.ctaText}>
            Connect to <strong>play.potatosmp.net</strong> and start your adventure today!
          </p>
          <div className={styles.ctaActions}>
            <CopyIP
              address="play.potatosmp.net"
              label="Copy Server IP"
              variant="card"
              size="lg"
            />
            <MCButton variant="primary" size="xl" asChild>
              <Link to="/join">How to Join</Link>
            </MCButton>
          </div>
          <p className={styles.ctaNote}>
            Java & Bedrock supported • Version 1.20+ • Discord: <a href="https://discord.gg/potatosmp">discord.gg/potatosmp</a>
          </p>
        </div>
      </section>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  max?: number;
}

const StatCard = ({ icon, value, label, max }: StatCardProps) => (
  <div className={styles.statCard}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statValue}>
      {value}
      {max && <span className={styles.statMax}>/{max}</span>}
    </div>
    <div className={styles.statLabel}>{label}</div>
  </div>
);

interface FeatureCardProps {
  feature: typeof FEATURES[0];
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => (
  <Panel variant="default" className={clsx(styles.featureCard, index >= 3 && styles.featureCardAlt)}>
    <div className={styles.featureIcon}>{feature.icon}</div>
    <h3 className={styles.featureTitle}>{feature.title}</h3>
    <p className={styles.featureDesc}>{feature.desc}</p>
  </Panel>
);

interface PlayerPreviewCardProps {
  player: { name: string; uuid: string; rank: string; playtime: number };
  rank: number;
}

const PlayerPreviewCard = ({ player, rank }: PlayerPreviewCardProps) => (
  <Link to={`/players/${player.name}`} className={styles.playerPreviewCard}>
    <span className={clsx(styles.rankNumber, `rank-${rank}`)}>{rank}</span>
    <PlayerHeadWithName
      username={player.name}
      uuid={player.uuid}
      size="md"
      showName={true}
    />
    <div className={styles.previewInfo}>
      <div className={styles.previewStats}>
        <span>{formatPlaytime(player.playtime)} played</span>
      </div>
    </div>
  </Link>
);

interface OnlinePlayerCardProps {
  player: { name: string; uuid: string; rank: string };
}

const OnlinePlayerCard = ({ player }: OnlinePlayerCardProps) => (
  <Link to={`/players/${player.name}`} className={styles.onlineCard}>
    <PlayerHeadWithName username={player.name} uuid={player.uuid} size="sm" />
    <span className={styles.onlineDot} aria-hidden="true" />
  </Link>
);

interface RankPreviewCardProps {
  rankId: string;
}

const RankPreviewCard = ({ rankId }: RankPreviewCardProps) => {
  const rankData = {
    sprout: { name: 'Sprout', price: '$4.99', color: '#7fc95e', perk: '3 claims, /back, colored chat' },
    baked: { name: 'Baked Potato', price: '$14.99', color: '#e8c547', perk: '10 claims, /fly, /nick, pets' },
    golden: { name: 'Golden Potato', price: '$29.99', color: '#ffa500', perk: '25 claims, /fly, /repair, priority' },
    legendary: { name: 'Legendary Spud', price: '$59.99', color: '#c06cff', perk: 'Unlimited claims, /god, exclusive cosmetics' },
  }[rankId];

  if (!rankData) return null;

  return (
    <Panel variant="outlined" className={styles.rankPreviewCard}>
      <div className={styles.rankPreviewHeader} style={{ borderColor: rankData.color }}>
        <span className={styles.rankPreviewName} style={{ color: rankData.color }}>
          {rankData.name}
        </span>
        <span className={styles.rankPreviewPrice}>{rankData.price}</span>
      </div>
      <p className={styles.rankPreviewPerk}>{rankData.perk}</p>
    </Panel>
  );
};