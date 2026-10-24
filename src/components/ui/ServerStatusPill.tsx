import { clsx } from 'clsx';
import styles from './ServerStatusPill.module.css';

export interface ServerStatus {
  online: boolean;
  players?: { online: number; max: number; list?: Array<{ name: string; uuid: string }> };
  version?: string;
  motd?: { clean: string[]; html: string[] };
  icon?: string;
  hostname?: string;
  ip?: string;
  port?: number;
}

interface ServerStatusPillProps {
  status: ServerStatus | null;
  loading?: boolean;
  compact?: boolean;
  showAddress?: boolean;
  onCopyIP?: () => void;
}

export const ServerStatusPill = ({
  status,
  loading = false,
  compact = false,
  showAddress = true,
  onCopyIP,
}: ServerStatusPillProps) => {
  if (loading) {
    return (
      <div className={clsx(styles.pill, styles.loading, compact && styles.compact)}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.text}>Checking...</span>
      </div>
    );
  }

  if (!status) {
    return (
      <div className={clsx(styles.pill, styles.unknown, compact && styles.compact)}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.text}>Unknown</span>
      </div>
    );
  }

  const { online, players, version, hostname, ip, port } = status;
  const address = hostname || `${ip}:${port || 25565}`;

  return (
    <div className={clsx(styles.pill, online ? styles.online : styles.offline, compact && styles.compact)}>
      <span className={clsx(styles.dot, online && styles.pulse)} aria-hidden="true" />
      {!compact && (
        <>
          <span className={styles.statusText}>
            {online ? 'Online' : 'Offline'}
          </span>
          {players && (
            <span className={styles.players} aria-label={`${players.online} of ${players.max} players online`}>
              {players.online}/{players.max}
            </span>
          )}
        </>
      )}
      {compact && players && (
        <span className={styles.playersCompact} aria-label={`${players.online} of ${players.max} players online`}>
          {players.online}/{players.max}
        </span>
      )}
      {showAddress && !compact && (
        <>
          <span className={styles.separator} aria-hidden="true">|</span>
          <span className={styles.address} title={address}>
            {version ? `${version} • ` : ''}
            {address.length > 30 ? address.slice(0, 27) + '...' : address}
          </span>
        </>
      )}
      {onCopyIP && !compact && (
        <button
          className={styles.copyBtn}
          onClick={onCopyIP}
          aria-label="Copy server address"
          title="Copy IP"
        >
          <CopyIcon />
        </button>
      )}
    </div>
  );
};

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.copyIcon}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);