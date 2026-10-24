import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { MCButton } from '../ui/MCButton';
import { ServerStatusPill } from '../ui/ServerStatusPill';
import { CopyIP } from '../ui/CopyIP';
import { PlayerHead } from '../ui/PlayerHead';
import { useServerStatus } from '../../hooks/useServerStatus';
import { useToast } from '../ui/Toast';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/players', label: 'Players' },
  { path: '/join', label: 'Join' },
  { path: '/map', label: 'Map' },
  { path: '/stats', label: 'Stats' },
  { path: '/shop', label: 'Shop' },
] as const;

export const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: status, isLoading: loading } = useServerStatus();
const serverStatus = status ?? null;
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyIP = () => {
    showToast({
      type: 'success',
      title: 'Server IP Copied',
      message: 'Paste it in Minecraft multiplayer',
      duration: 3000,
    });
  };

  return (
    <header className={clsx(styles.navbar, scrolled && styles.scrolled)} role="banner">
      <div className={styles.container}>
        {/* Logo */}
        <NavLink to="/" className={styles.logo} aria-label="PotatoSMP Home">
          <span className={styles.logoIcon} aria-hidden="true">
            <PotatoIcon />
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoMain}>Potato</span>
            <span className={styles.logoSub}>SMP</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className={styles.navDesktop} aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(styles.navLink, isActive && styles.active)
                  }
                  end={item.path === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side: Status + Copy IP */}
        <div className={styles.navActions}>
          <ServerStatusPill
            status={serverStatus}
            loading={loading}
            compact={false}
            showAddress={true}
            onCopyIP={handleCopyIP}
          />
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className={styles.mobileMenu}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className={styles.mobileContent}>
            <nav>
              <ul className={styles.mobileNavList}>
                {NAV_ITEMS.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        clsx(styles.mobileNavLink, isActive && styles.active)
                      }
                      end={item.path === '/'}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.mobileStatus}>
              <ServerStatusPill
                status={serverStatus}
                loading={loading}
                compact={false}
                showAddress={true}
                onCopyIP={handleCopyIP}
              />
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

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

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={clsx(styles.menuIcon, open && styles.open)}
  >
    {!open && <path d="M3 12h18M3 6h18M3 18h18" />}
    {open && <path d="M18 6L6 18M6 6l12 12" />}
  </svg>
);