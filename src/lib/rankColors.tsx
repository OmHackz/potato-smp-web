import { clsx } from 'clsx';

const RANK_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  default: { bg: 'rgba(170,170,170,0.15)', text: '#aaa', border: 'rgba(170,170,170,0.3)' },
  sprout: { bg: 'rgba(127,201,94,0.15)', text: '#7fc95e', border: 'rgba(127,201,94,0.3)' },
  baked: { bg: 'rgba(232,197,71,0.15)', text: '#e8c547', border: 'rgba(232,197,71,0.3)' },
  golden: { bg: 'rgba(255,165,0,0.15)', text: '#ffa500', border: 'rgba(255,165,0,0.3)' },
  legendary: { bg: 'rgba(192,108,255,0.15)', text: '#c06cff', border: 'rgba(192,108,255,0.3)' },
  staff: { bg: 'rgba(255,85,85,0.15)', text: '#ff5555', border: 'rgba(255,85,85,0.3)' },
  admin: { bg: 'rgba(255,0,0,0.15)', text: '#ff0000', border: 'rgba(255,0,0,0.3)' },
};

const RANK_COLORS: Record<string, string> = {
  default: '#aaa',
  sprout: '#7fc95e',
  baked: '#e8c547',
  golden: '#ffa500',
  legendary: '#c06cff',
  staff: '#ff5555',
  admin: '#ff0000',
};

const RANK_NAMES: Record<string, string> = {
  default: 'Potato',
  sprout: 'Sprout',
  baked: 'Baked',
  golden: 'Golden',
  legendary: 'Legendary',
  staff: 'Staff',
  admin: 'Admin',
};

export function getRankStyles(rankId: string) {
  return RANK_STYLES[rankId] || RANK_STYLES.default;
}

export function getRankColor(rankId: string): string {
  return RANK_COLORS[rankId] || RANK_COLORS.default;
}

export function getRankDisplayName(rankId: string): string {
  return RANK_NAMES[rankId] || rankId;
}

export function RankBadge({ rankId, size = 'md', showIcon = false }: {
  rankId: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}) {
  const { bg, text, border } = getRankStyles(rankId);
  const displayName = getRankDisplayName(rankId);

  const sizeStyles = {
    sm: { px: '6px', py: '2px', fontSize: '9px', gap: '4px' },
    md: { px: '8px', py: '3px', fontSize: '10px', gap: '5px' },
    lg: { px: '10px', py: '4px', fontSize: '11px', gap: '6px' },
  }[size];

  const icons: Record<string, string> = {
    sprout: '🌱',
    baked: '🥔',
    golden: '✨',
    legendary: '👑',
    staff: '⚡',
    admin: '👑',
  };

  return (
    <span
      className="rank-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: sizeStyles.gap,
        padding: `${sizeStyles.py} ${sizeStyles.px}`,
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: sizeStyles.fontSize,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: text,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 'var(--radius-pill)',
        whiteSpace: 'nowrap',
      } as React.CSSProperties}
    >
      {showIcon && icons[rankId] && <span aria-hidden="true">{icons[rankId]}</span>}
      {displayName}
    </span>
  );
}