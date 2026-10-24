import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { CopyIP } from '../ui/CopyIP';
import { ServerStatusPill } from '../ui/ServerStatusPill';
import { useServerStatus } from '../../hooks/useServerStatus';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  navigate: [
    { path: '/', label: 'Home' },
    { path: '/players', label: 'Players' },
    { path: '/join', label: 'Join' },
    { path: '/map', label: 'Map' },
    { path: '/stats', label: 'Stats' },
    { path: '/shop', label: 'Shop' },
  ],
  community: [
    { href: 'https://discord.gg/potatosmp', label: 'Discord', external: true },
    { href: 'https://store.potatosmp.net', label: 'Store', external: true },
    { href: 'https://twitter.com/potatosmp', label: 'Twitter', external: true },
    { href: 'https://youtube.com/@potatosmp', label: 'YouTube', external: true },
  ],
  legal: [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/rules', label: 'Server Rules' },
  ],
};

// Icons defined first
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.675 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 1 .076-.04c.52 0 1.003.143 1.402.397a.077.077 0 0 0 .085-.028 13.107 13.107 0 0 0 1.187-1.91.077.077 0 0 1 .08-.028c.398.254.88.397 1.4.397a.077.077 0 0 1 .077.04c.037.14.058.282.073.427a15.297 15.297 0 0 0 1.173 1.844.075.075 0 0 0 .083.027 19.839 19.839 0 0 0 6.028-3.073.076.076 0 0 0 .026-.051c.431-4.668-.364-9.234-1.674-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const ExternalIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M5 11h11v-11M16 4l-7 7" />
  </svg>
);

const PotatoIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className={styles.potatoIcon}>
    <path
      d="M16 2C10.5 2 6 6.5 6 12c0 3.5 2 6.5 5 8.5 1.5 1 3.5 1.5 5.5 1.5s4-.5 5.5-1.5c3-2 5-5 5-8.5C26 6.5 21.5 2 16 2z"
      fill="#d4a574"
      stroke="#8b6b3a"
      strokeWidth="1.5"
    />
    <ellipse cx="11" cy="11" rx="1.5" ry="2" fill="#8b6b3a" opacity="0.6" />
    <ellipse cx="21" cy="11" rx="1.5" ry="2" fill="#8b6b3a" opacity="0.6" />
    <ellipse cx="14" cy="16" rx="2" ry="1" fill="#8b6b3a" opacity="0.4" />
    <ellipse cx="18" cy="16" rx="2" ry="1" fill="#8b6b3a" opacity="0.4" />
  </svg>
);

const SOCIAL_ICONS = {
  discord: <DiscordIcon />,
  twitter: <TwitterIcon />,
  youtube: <YouTubeIcon />,
};

export const Footer = () => {
  const { data: status } = useServerStatus();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <NavLink to="/" className={styles.logo} aria-label="PotatoSMP Home">
              <span className={styles.logoIcon} aria-hidden="true"><PotatoIcon /></span>
              <span className={styles.logoText}>
                <span className={styles.logoMain}>Potato</span>
                <span className={styles.logoSub}>SMP</span>
              </span>
            </NavLink>
            <p className={styles.tagline}>
              A cozy survival community where everyone grows together.
            </p>
            <div className={styles.social}>
              {Object.entries(SOCIAL_ICONS).map(([key, icon]) => (
                <a
                  key={key}
                  href={`https://${key}.com/potatosmp`}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className={styles.navSection} aria-label="Site navigation">
            <h3 className={styles.sectionTitle}>Navigate</h3>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.navigate.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path} className={styles.link} end={item.path === '/'}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Community */}
          <nav className={styles.navSection} aria-label="Community links">
            <h3 className={styles.sectionTitle}>Community</h3>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.community.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                    <ExternalIcon className={styles.externalIcon} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Server Info */}
          <div className={styles.serverInfo}>
            <h3 className={styles.sectionTitle}>Server</h3>
            <div className={styles.serverStatus}>
              <ServerStatusPill
                status={status ?? null}
                compact={true}
                showAddress={false}
              />
            </div>
            <CopyIP
              address="play.potatosmp.net"
              label="Server Address"
              variant="card"
              size="md"
            />
            <div className={styles.version}>
              <span className={styles.versionLabel}>Version</span>
              <span className={styles.versionValue}>
                {status?.version || '1.20.4'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} PotatoSMP. Not affiliated with Mojang Studios.
          </p>
          <nav className={styles.legalLinks} aria-label="Legal links">
            {FOOTER_LINKS.legal.map((item) => (
              <NavLink key={item.path} to={item.path} className={styles.legalLink}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};