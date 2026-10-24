import { clsx } from 'clsx';
import { MCButton } from '../../components/ui/MCButton';
import { Panel } from '../../components/ui/Panel';
import { RankBadge } from '../../lib/rankColors';
import { useRanks, useShopItems } from '../../hooks/useServerStatus';
import { formatNumber } from '../../lib/utils';
import styles from './Shop.module.css';

type PerkName = typeof PERKS_COMPARISON[number];

const PERKS_COMPARISON = [
  'Chunk Claims',
  'Homes (/home)',
  'Flight (/fly)',
  'Nickname (/nick)',
  'Particle Effects',
  'Pet Slots',
  'Crate Keys',
  'Priority Queue',
  'Custom Prefix',
  '/back Command',
  '/hat Command',
  '/repair Command',
  '/enderchest Command',
  '/workbench Command',
  '/anvil Command',
  '/god Command',
  'Join/Quit Messages',
  'Exclusive Cosmetics',
  'Discord Role',
] as const;

const RANK_PERKS: Record<string, Record<string, boolean | string>> = {
  default: {
    'Chunk Claims': '1',
    'Homes (/home)': '1',
    'Flight (/fly)': false,
    'Nickname (/nick)': false,
    'Particle Effects': false,
    'Pet Slots': '0',
    'Crate Keys': '0',
    'Priority Queue': false,
    'Custom Prefix': false,
    '/back Command': false,
    '/hat Command': false,
    '/repair Command': false,
    '/enderchest Command': false,
    '/workbench Command': false,
    '/anvil Command': false,
    '/god Command': false,
    'Join/Quit Messages': false,
    'Exclusive Cosmetics': false,
    'Discord Role': false,
  },
  sprout: {
    'Chunk Claims': '3',
    'Homes (/home)': '3',
    'Flight (/fly)': false,
    'Nickname (/nick)': false,
    'Particle Effects': 'Colored Chat',
    'Pet Slots': '0',
    'Crate Keys': '0',
    'Priority Queue': false,
    'Custom Prefix': false,
    '/back Command': true,
    '/hat Command': false,
    '/repair Command': false,
    '/enderchest Command': false,
    '/workbench Command': false,
    '/anvil Command': false,
    '/god Command': false,
    'Join/Quit Messages': 'Custom Join',
    'Exclusive Cosmetics': false,
    'Discord Role': false,
  },
  baked: {
    'Chunk Claims': '10',
    'Homes (/home)': '10',
    'Flight (/fly)': 'Survival',
    'Nickname (/nick)': true,
    'Particle Effects': true,
    'Pet Slots': '1',
    'Crate Keys': 'Monthly',
    'Priority Queue': false,
    'Custom Prefix': false,
    '/back Command': true,
    '/hat Command': true,
    '/repair Command': true,
    '/enderchest Command': false,
    '/workbench Command': false,
    '/anvil Command': false,
    '/god Command': false,
    'Join/Quit Messages': 'Custom Join',
    'Exclusive Cosmetics': false,
    'Discord Role': false,
  },
  golden: {
    'Chunk Claims': '25',
    'Homes (/home)': '25',
    'Flight (/fly)': 'Unrestricted',
    'Nickname (/nick)': true,
    'Particle Effects': true,
    'Pet Slots': '2',
    'Crate Keys': 'Weekly',
    'Priority Queue': true,
    'Custom Prefix': 'Color',
    '/back Command': true,
    '/hat Command': true,
    '/repair Command': true,
    '/enderchest Command': true,
    '/workbench Command': true,
    '/anvil Command': true,
    '/god Command': false,
    'Join/Quit Messages': 'Custom Both',
    'Exclusive Cosmetics': 'Some',
    'Discord Role': false,
  },
  legendary: {
    'Chunk Claims': 'Unlimited',
    'Homes (/home)': 'Unlimited',
    'Flight (/fly)': 'Unrestricted',
    'Nickname (/nick)': true,
    'Particle Effects': true,
    'Pet Slots': '5',
    'Crate Keys': 'Daily',
    'Priority Queue': true,
    'Custom Prefix': 'Full',
    '/back Command': true,
    '/hat Command': true,
    '/repair Command': true,
    '/enderchest Command': true,
    '/workbench Command': true,
    '/anvil Command': true,
    '/god Command': 'Survival',
    'Join/Quit Messages': 'Full Custom',
    'Exclusive Cosmetics': 'All',
    'Discord Role': true,
  },
};

export const Shop = () => {
  const { data: ranks, isLoading: ranksLoading } = useRanks();
  const { data: shopItems, isLoading: itemsLoading } = useShopItems();
  const storeUrl = import.meta.env.VITE_STORE_URL || 'https://store.potatosmp.net';

  const purchasableRanks = ranks?.filter(r => r.id !== 'default') || [];

  if (ranksLoading) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Shop</h1>
          <p className={styles.subtitle}>Support the server and unlock perks</p>
        </header>
        <div className={styles.loading}>
          <LoadingSpinner />
          <p>Loading shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Shop</h1>
          <p className={styles.subtitle}>Support PotatoSMP and unlock awesome perks</p>
        </div>
        <MCButton variant="primary" size="lg" asChild>
          <a href={storeUrl} target="_blank" rel="noopener noreferrer">
            View Full Store
            <ExternalIcon />
          </a>
        </MCButton>
      </header>

      {/* Ranks */}
      <section className={styles.ranksSection} aria-labelledby="ranks-title">
        <h2 id="ranks-title" className={styles.sectionTitle}>Ranks</h2>
        <p className={styles.sectionSubtitle}>One-time purchase, permanent perks</p>
        <div className={styles.ranksGrid}>
          {purchasableRanks.map((rank) => (
            <RankCard key={rank.id} rank={rank} storeUrl={storeUrl} />
          ))}
          {purchasableRanks.length === 0 && (
            <Panel variant="outlined" className={styles.comingSoon}>
              <PackageIcon />
              <h3>Ranks Coming Soon</h3>
              <p>Rank configuration is not set up yet.</p>
              <MCButton variant="primary" asChild>
                <a href={storeUrl} target="_blank" rel="noopener noreferrer">
                  Check Store
                  <ExternalIcon />
                </a>
              </MCButton>
            </Panel>
          )}
        </div>
      </section>

      {/* Perks Comparison */}
      <section className={styles.comparisonSection} aria-labelledby="comparison-title">
        <h2 id="comparison-title" className={styles.sectionTitle}>Perks Comparison</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.comparisonTable} role="table">
            <thead>
              <tr>
                <th scope="col" className={styles.comparePerk}>Perk</th>
                {(['default', 'sprout', 'baked', 'golden', 'legendary'] as const).map((rankId) => {
                  const rank = ranks?.find(r => r.id === rankId);
                  if (!rank && rankId !== 'default') return null;
                  return (
                    <th key={rankId} scope="col" className={clsx(styles.compareRank, rank?.featured && styles.featured)}>
                      <RankBadge rankId={rankId} size="sm" showIcon />
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {PERKS_COMPARISON.map((perk: PerkName) => (
                <tr key={perk} className={styles.compareRow}>
                  <td className={styles.comparePerk}>{perk}</td>
                  {(['default', 'sprout', 'baked', 'golden', 'legendary'] as const).map((rankId) => {
                    const rank = ranks?.find(r => r.id === rankId);
                    if (!rank && rankId !== 'default') return <td key={rankId} className={styles.compareCell} />;
                    const value = RANK_PERKS[rankId]?.[perk];
                    return (
                      <td key={rankId} className={clsx(styles.compareCell, rank?.featured && styles.featuredCell)}>
                        {typeof value === 'boolean' ? (
                          value ? <CheckIcon /> : <XIcon />
                        ) : (
                          <span>{value || '—'}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Additional Items */}
      {shopItems && shopItems.length > 0 && (
        <section className={styles.itemsSection} aria-labelledby="items-title">
          <h2 id="items-title" className={styles.sectionTitle}>Cosmetics & Extras</h2>
          <div className={styles.itemsGrid}>
            {shopItems
              .filter(item => item.type !== 'rank')
              .map((item) => (
                <ItemCard key={item.id} item={item} storeUrl={storeUrl} />
              ))}
          </div>
        </section>
      )}

      {/* Footer Note */}
      <Panel variant="outlined" className={styles.note}>
        <InfoIcon />
        <div>
          <h3>Secure Checkout</h3>
          <p>
            All purchases are processed through our secure payment partner. Ranks and items are delivered automatically in-game.
            <br />
            <strong>Not affiliated with Mojang Studios.</strong> This is not an official Minecraft product.
          </p>
        </div>
      </Panel>
    </div>
  );
};

const RankCard = ({ rank, storeUrl }: { rank: any; storeUrl: string }) => {
  const rankColor = rank.color || '#aaa';

  return (
    <Panel
      variant={rank.featured ? 'elevated' : 'outlined'}
      className={clsx(styles.rankCard, rank.featured && styles.featured)}
      style={{
        ...(rank.featured && {
          borderColor: rankColor,
          boxShadow: `var(--shadow-lg), 0 0 24px ${rankColor}40`,
        }),
      } as React.CSSProperties}
    >
      {rank.featured && (
        <div className={styles.featuredBadge} style={{ background: rankColor }}>
          MOST POPULAR
        </div>
      )}
      <div className={styles.rankHeader}>
        <div className={styles.rankIcon} style={{ color: rankColor }}>
          <RankBadge rankId={rank.id} size="lg" showIcon />
        </div>
        <h3 className={styles.rankName} style={{ color: rankColor }}>{rank.displayName}</h3>
        <div className={styles.rankPrice}>
          ${rank.price?.toFixed(2) || '0.00'} <span className={styles.currency}>/ one-time</span>
        </div>
      </div>
      <ul className={styles.perksList}>
        {rank.perks.slice(0, 6).map((perk: string, i: number) => (
          <li key={i}>
            <CheckIcon className={styles.perkCheck} />
            {perk}
          </li>
        ))}
        {rank.perks.length > 6 && (
          <li className={styles.morePerks}>
            +{rank.perks.length - 6} more perks
          </li>
        )}
      </ul>
      <MCButton
        variant={rank.featured ? 'gold' : 'primary'}
        size="lg"
        fullWidth
        onClick={() => window.open(`${storeUrl}?rank=${rank.id}`, '_blank', 'noopener,noreferrer')}
      >
        Buy {rank.displayName}
        <ExternalIcon />
      </MCButton>
    </Panel>
  );
};

const ItemCard = ({ item, storeUrl }: { item: any; storeUrl: string }) => (
  <Panel variant="default" className={styles.itemCard}>
    <div className={styles.itemIcon}>
      {item.image ? (
        <img src={item.image} alt={item.name} loading="lazy" />
      ) : (
        <PackageIcon />
      )}
    </div>
    <h3 className={styles.itemName}>{item.name}</h3>
    <p className={styles.itemDesc}>{item.description}</p>
    <div className={styles.itemPrice}>
      ${item.price?.toFixed(2) || '0.00'} {item.currency || 'USD'}
    </div>
    <MCButton
      variant="secondary"
      size="md"
      fullWidth
      onClick={() => window.open(`${storeUrl}?item=${item.id}`, '_blank', 'noopener,noreferrer')}
    >
      View Details
      <ExternalIcon />
    </MCButton>
  </Panel>
);

const LoadingSpinner = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.spinner}>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" className={className}>
    <path d="M13 5L6 12l-3-3" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" opacity="0.4">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

const ExternalIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" className={className}>
    <path d="M5 11h11v-11M16 4l-7 7" />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="M3.27 6.96L12 12.01l8.73-5.05" />
    <path d="M12 22.08V12" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);