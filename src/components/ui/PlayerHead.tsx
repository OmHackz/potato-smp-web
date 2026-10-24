import { clsx } from 'clsx';
import styles from './PlayerHead.module.css';

export type PlayerHeadSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const SIZE_MAP: Record<PlayerHeadSize, number> = {
  xs: 20,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

interface PlayerHeadProps {
  username: string;
  uuid?: string;
  size?: PlayerHeadSize;
  className?: string;
  title?: string;
  fallback?: 'steve' | 'alex';
}

export const PlayerHead = ({
  username,
  uuid,
  size = 'md',
  className,
  title,
  fallback = 'steve',
}: PlayerHeadProps) => {
  const dimension = SIZE_MAP[size];
  const seed = uuid || username;

  // Use Crafatar for heads (supports UUID and username)
  const src = uuid
    ? `https://crafatar.com/avatars/${uuid}?size=${dimension}&overlay&default=${fallback}`
    : `https://crafatar.com/avatars/${encodeURIComponent(username)}?size=${dimension}&overlay&default=${fallback}`;

  return (
    <span
      className={clsx(styles.wrapper, styles[size], className)}
      style={{ width: dimension, height: dimension } as React.CSSProperties}
    >
      <img
        src={src}
        alt={title || username}
        loading="lazy"
        className={styles.image}
        width={dimension}
        height={dimension}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (!target.dataset.fallback) {
            target.dataset.fallback = 'true';
            target.src = `https://crafatar.com/avatars/${fallback}?size=${dimension}&overlay`;
          }
        }}
      />
      <span className={styles.overlay} aria-hidden="true" />
    </span>
  );
};

interface PlayerHeadWithNameProps extends PlayerHeadProps {
  showName?: boolean;
  nameClassName?: string;
  linkTo?: string;
}

export const PlayerHeadWithName = ({
  username,
  uuid,
  size = 'md',
  showName = true,
  nameClassName,
  linkTo,
  className,
  title,
  fallback,
}: PlayerHeadWithNameProps) => {
  const head = (
    <PlayerHead username={username} uuid={uuid} size={size} title={title} fallback={fallback} />
  );

  const content = (
    <>
      {head}
      {showName && (
        <span className={clsx(styles.name, nameClassName)}>{username}</span>
      )}
    </>
  );

  if (linkTo) {
    return (
      <a href={linkTo} className={clsx(styles.linkWrapper, className)}>
        {content}
      </a>
    );
  }

  return <span className={clsx(styles.inline, className)}>{content}</span>;
};