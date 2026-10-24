import { Link } from 'react-router-dom';
import { MCButton } from '../../components/ui/MCButton';
import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.deathScreen}>
          <div className={styles.deathHeader}>
            <div className={styles.youDied}>You died!</div>
            <div className={styles.respawnTimer}>Respawning in <span>3</span>...</div>
          </div>
          <div className={styles.deathMessage}>
            <p>You got lost in the void...</p>
            <p className={styles.subMessage}>The page you're looking for doesn't exist.</p>
          </div>
          <div className={styles.deathStats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Score</span>
              <span className={styles.statValue}>0</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Distance</span>
              <span className={styles.statValue}>∞ blocks</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Cause</span>
              <span className={styles.statValue}>404 Not Found</span>
            </div>
          </div>
          <MCButton variant="primary" size="xl" asChild className={styles.respawnBtn}>
            <Link to="/">Respawn</Link>
          </MCButton>
          <p className={styles.hint}>Or press <kbd>Escape</kbd> to return to the main menu</p>
        </div>

        <div className={styles.particles} aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Particle = ({ index }: { index: number }) => {
  const delay = (index * 0.15) % 3;
  const duration = 2 + (index % 3) * 0.5;
  const size = 4 + (index % 4) * 2;
  const left = 10 + (index * 7) % 80;
  const colorIndex = index % 3;

  return (
    <div
      className={styles.particle}
      style={{
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--size': `${size}px`,
        '--left': `${left}%`,
        '--color': colorIndex === 0 ? 'var(--color-primary)' : colorIndex === 1 ? 'var(--color-gold)' : 'var(--color-cyan)',
      } as React.CSSProperties}
    />
  );
};